import mssql from "mssql";
import api from "~/sql/api";

/**
 * Profil degisikligi 2. adim: eski mail adresine giden kod dogrulanirsa
 * MusterilerTB guncellenir.
 *
 * - Kod, degisiklik setinin hash'ine bagli imzalandigi icin kod alindiktan
 *   sonra govde degistirilemez.
 * - "name" alani Unvan kolonuna oldugu gibi yaziliyor; ad/soyad bolunmesi yok.
 * - Ayni mail birden fazla musteri kaydina bagliysa hepsi guncellenir; aksi
 *   halde mail degisiminden sonra eski kayit hala eski adresle kalir ve
 *   panelde yarim veri gorunur.
 * - Mail degistiyse oturum yeni adresle yeniden imzalanir, yoksa kullanici
 *   kendi oturumundan dusardi.
 * - Degisiklik bilgi islem'e mail olarak bildirilir (ERP ana kaydi degisiyor).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event) => {
  const current = sessionEmail(event);
  if (!current || !EMAIL_RE.test(current)) {
    setResponseStatus(event, 401);
    return { ok: false, error: "unauthorized" };
  }

  const body = await readBody(event);
  const code = String(body?.code ?? "").trim();
  if (!/^\d{6}$/.test(code)) {
    return { ok: false, error: "invalid" };
  }

  const input = normalizeProfile(body);
  const bad = validateProfile(input);
  if (bad) {
    return { ok: false, error: "invalid_field", field: bad };
  }

  /* Kod + degisiklik seti birlikte dogrulanir */
  const status = verifyProfileCode(
    event,
    current,
    code,
    profilePayloadHash(input),
  );
  if (status !== "ok") {
    return { ok: false, error: status };
  }

  const pool = await api;

  /* Guncellenecek kayitlar (yetki dahil) */
  const rows = await findCustomerRows(
    pool,
    current,
    "ID, FirmaAdi, Unvan, Adres, MailAdresi, Telefon",
  );
  if (!rows.length) {
    setResponseStatus(event, 403);
    return { ok: false, error: "no_customer" };
  }

  /* Mail degisiyorsa son bir kez daha cakisma kontrolu (kod beklerken baska
     bir kayit o adresi almis olabilir) */
  if (input.email !== current) {
    /* Bilerek MekmarSite kosulu YOK: yetkisi kapali bir kayit da o adresi
       tutuyorsa cakisma var sayilmali, yoksa iki kayit ayni adrese duser. */
    const taken = await pool
      .request()
      .input("email", mssql.VarChar(100), input.email)
      .input("current", mssql.VarChar(100), current)
      .query(
        `select top 1 ID from MusterilerTB
          where lower(ltrim(rtrim(MailAdresi))) = @email
            and lower(ltrim(rtrim(MailAdresi))) <> @current`,
      );
    if (taken.recordset.length) {
      return { ok: false, error: "email_taken" };
    }
  }

  const req = pool.request();
  const idParams = rows.map((r, i) => {
    req.input(`c${i}`, mssql.Int, Number(r.ID));
    return `@c${i}`;
  });

  await req
    .input("company", mssql.VarChar(PROFILE_LIMITS.company), input.company)
    .input("unvan", mssql.VarChar(PROFILE_LIMITS.name), input.name)
    .input("address", mssql.VarChar(PROFILE_LIMITS.address), input.address)
    .input("email", mssql.VarChar(PROFILE_LIMITS.email), input.email)
    .input("phone", mssql.VarChar(PROFILE_LIMITS.phone), input.phone)
    .query(
      `update MusterilerTB
          set FirmaAdi = @company,
              Unvan = @unvan,
              Adres = @address,
              MailAdresi = @email,
              Telefon = @phone
        where ID in (${idParams.join(",")})`,
    );

  /* Mail degistiyse oturumu yeni adresle yenile */
  if (input.email !== current) {
    startSession(event, input.email);
  }

  /* Bilgi islem bildirimi - ERP ana kaydi degisti (hata yaniti engellemez) */
  const cell = (v: unknown) =>
    `<td style="border:1px solid gray;padding:4px;">${escapeHtml(String(v ?? ""))}</td>`;
  const before = rows[0];
  mailTransporter
    .sendMail({
      from: MAIL_FROM,
      to: "bilgiislem@mekmar.com",
      subject: "Mekmar.com Profile Updated",
      html: `<p>Musteri kendi panelinden bilgilerini guncelledi.
        Guncellenen kayit ID: ${escapeHtml(rows.map((r) => r.ID).join(", "))}</p>
        <table style="border:1px solid gray;border-collapse:collapse;">
        <tr><th style="border:1px solid gray;">Alan</th>
            <th style="border:1px solid gray;">Eski</th>
            <th style="border:1px solid gray;">Yeni</th></tr>
        <tr>${cell("FirmaAdi")}${cell(before.FirmaAdi)}${cell(input.company)}</tr>
        <tr>${cell("Unvan")}${cell(before.Unvan)}${cell(input.name)}</tr>
        <tr>${cell("MailAdresi")}${cell(before.MailAdresi)}${cell(input.email)}</tr>
        <tr>${cell("Telefon")}${cell(before.Telefon)}${cell(input.phone)}</tr>
        <tr>${cell("Adres")}${cell(before.Adres)}${cell(input.address)}</tr>
      </table>`,
    })
    .catch((err: unknown) =>
      console.error("Profile update notify mail failed:", err),
    );

  return { ok: true, email_changed: input.email !== current };
});
