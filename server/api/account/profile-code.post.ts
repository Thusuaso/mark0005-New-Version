import mssql from "mssql";
import api from "~/sql/api";

/**
 * Profil degisikligi 1. adim: kod HER ZAMAN mevcut (eski) mail adresine gider.
 * Boylece mail adresini degistirmek icin de eski adrese erisim gerekiyor.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event) => {
  const current = sessionEmail(event);
  if (!current || !EMAIL_RE.test(current)) {
    setResponseStatus(event, 401);
    return { ok: false, error: "unauthorized" };
  }

  const body = await readBody(event);
  const input = normalizeProfile(body);
  const bad = validateProfile(input);
  if (bad) {
    return { ok: false, error: "invalid_field", field: bad };
  }

  const pool = await api;

  /* Oturum sahibi gercekten yetkili musteri mi? */
  const owner = await findCustomerRows(pool, current, "top 1 FirmaAdi");
  if (!owner.length) {
    setResponseStatus(event, 403);
    return { ok: false, error: "no_customer" };
  }

  /* Yeni mail baska bir musteriye aitse degisiklige izin verme: aksi halde
     iki kayit ayni mail adresine duser ve iki musterinin siparisleri
     birbirine karisir. */
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

  const created = createProfileCode(event, current, profilePayloadHash(input));
  if ("retryAfter" in created) {
    return { ok: false, error: "cooldown", retryAfter: created.retryAfter };
  }

  const mail = buildLoginCodeEmail({
    name: input.name,
    code: created.code,
    lang: normalizeLang(body?.lang),
    ttlMinutes: PROFILE_CODE_TTL_MINUTES,
  });

  try {
    await mailTransporter.sendMail({
      from: `"Mekmar" <${MAIL_FROM}>`,
      to: current, // bilerek eski adres
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  } catch (err) {
    console.error("Profile code mail failed:", err);
    return { ok: false, error: "mail_failed" };
  }

  return { ok: true, sent_to: current };
});
