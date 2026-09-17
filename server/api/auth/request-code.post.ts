import mssql from "mssql";
import api from "~/sql/api";

/* 1. adim: mail adresi kayitli bir musteriye aitse o adrese giris kodu gonderir. */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; lang?: string }>(event);
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100) {
    return { ok: false, error: "invalid_email" };
  }

  const result = await (await api)
    .request()
    .input("email", mssql.VarChar(100), email)
    .query(
      `select top 1 adi, kullaniciadi, mailadres from MekmarCom_Musteriler
       where lower(ltrim(rtrim(mailadres))) = @email`,
    );
  const customer = result.recordset[0];
  if (!customer) {
    return { ok: false, error: "not_found" };
  }

  const created = createLoginCode(event, email);
  if ("retryAfter" in created) {
    return { ok: false, error: "cooldown", retryAfter: created.retryAfter };
  }

  const mail = buildLoginCodeEmail({
    name: String(customer.adi || customer.kullaniciadi || "").trim(),
    code: created.code,
    lang: normalizeLang(body?.lang),
    ttlMinutes: LOGIN_CODE_TTL_MINUTES,
  });

  try {
    await mailTransporter.sendMail({
      from: `"Mekmar" <${MAIL_FROM}>`,
      to: email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  } catch (err) {
    console.error("Login code mail failed:", err);
    return { ok: false, error: "mail_failed" };
  }

  return { ok: true };
});
