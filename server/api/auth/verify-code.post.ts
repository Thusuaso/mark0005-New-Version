import mssql from "mssql";
import api from "~/sql/api";

/* 2. adim: e-postadaki kodu dogrular; dogruysa "user" cerezini sunucu tarafinda yazar. */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; code?: string }>(event);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const code = String(body?.code ?? "").trim();
  if (!email || !/^\d{6}$/.test(code)) {
    return { ok: false, error: "invalid" };
  }

  const status = verifyLoginCode(event, email, code);
  if (status !== "ok") {
    return { ok: false, error: status };
  }

  const result = await (await api)
    .request()
    .input("email", mssql.VarChar(100), email)
    .query(
      `select top 1 adi, kullaniciadi from MekmarCom_Musteriler
       where lower(ltrim(rtrim(mailadres))) = @email`,
    );
  const customer = result.recordset[0];
  if (!customer) {
    return { ok: false, error: "invalid" };
  }

  setCookie(event, "user", email, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: !import.meta.dev,
  });

  // Eski login akisindaki gibi bilgi islem'e giris bildirimi (hata girisi engellemez)
  const cell = (v: unknown) =>
    `<td style="border:1px solid gray;padding:4px;">${escapeHtml(String(v ?? ""))}</td>`;
  mailTransporter
    .sendMail({
      from: MAIL_FROM,
      to: "bilgiislem@mekmar.com",
      subject: "Mekmar.com Logged In",
      html: `<table style="border:1px solid gray;border-collapse:collapse;">
        <tr><th style="border:1px solid gray;">Name</th><th style="border:1px solid gray;">Username</th><th style="border:1px solid gray;">Email</th></tr>
        <tr>${cell(customer.adi)}${cell(customer.kullaniciadi)}${cell(email)}</tr>
      </table>`,
    })
    .catch((err: unknown) => console.error("Login notify mail failed:", err));

  return { ok: true };
});
