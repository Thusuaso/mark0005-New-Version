import api from "~/sql/api";

/* 2. adim: e-postadaki kodu dogrular; dogruysa "user" cerezini sunucu tarafinda yazar. */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; code?: string }>(event);
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const code = String(body?.code ?? "").trim();
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 100 ||
    !/^\d{6}$/.test(code)
  ) {
    return { ok: false, error: "invalid" };
  }

  const status = verifyLoginCode(event, email, code);
  if (status !== "ok") {
    return { ok: false, error: status };
  }

  const rows = await findCustomerRows(await api, email, "top 1 FirmaAdi, Ulke");
  const customer = rows[0];
  if (!customer) {
    return { ok: false, error: "invalid" };
  }

  // Imzali httpOnly oturum cerezi + arayuz icin okunabilir "user" cerezi
  startSession(event, email);

  // Eski login akisindaki gibi bilgi islem'e giris bildirimi (hata girisi engellemez)
  const cell = (v: unknown) =>
    `<td style="border:1px solid gray;padding:4px;">${escapeHtml(String(v ?? ""))}</td>`;
  mailTransporter
    .sendMail({
      from: MAIL_FROM,
      to: "bilgiislem@mekmar.com",
      subject: "Mekmar.com Logged In",
      html: `<table style="border:1px solid gray;border-collapse:collapse;">
        <tr><th style="border:1px solid gray;">Company</th><th style="border:1px solid gray;">Country</th><th style="border:1px solid gray;">Email</th></tr>
        <tr>${cell(customer.FirmaAdi)}${cell(customer.Ulke)}${cell(email)}</tr>
      </table>`,
    })
    .catch((err: unknown) => console.error("Login notify mail failed:", err));

  return { ok: true };
});
