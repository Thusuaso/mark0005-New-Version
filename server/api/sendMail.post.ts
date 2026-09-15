/* Iletisim formu bildirimi -> export@mekmar.com. Tablo tabanli, satir ici stiller:
   Outlook / Gmail / Apple Mail'de tutarli gorunmesi icin. */

const CONTACT_TO = "export@mekmar.com";

const clean = (v: unknown) => escapeHtml(String(v ?? "").trim());

function buildContactEmail(body: any) {
  const name = clean(body?.name);
  const email = clean(body?.email);
  const rawPhone = String(body?.phone ?? "").trim();
  const phone =
    rawPhone && !rawPhone.startsWith("Herhangi") ? clean(rawPhone) : "";
  const message = clean(body?.description).replace(/\r?\n/g, "<br />");
  const sentAt = new Date().toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    dateStyle: "long",
    timeStyle: "short",
  });

  const label = (text: string) =>
    `<td width="110" valign="top" style="padding:12px 0;border-bottom:1px solid #eef0f3;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">${text}</td>`;
  const value = (html: string) =>
    `<td valign="top" style="padding:12px 0;border-bottom:1px solid #eef0f3;color:#111827;font-size:15px;">${html}</td>`;
  const empty = `<span style="color:#9ca3af;">Not provided</span>`;

  /* Urun detayindaki "Get Price" modalindan gonderildiyse urun bilgisi */
  const p = body?.product;
  const productName = clean(p?.name);
  const productCode = clean(p?.code);
  const productSize = clean(p?.size);
  const productUnit = clean(p?.unit);
  const rawUrl = String(p?.url ?? "").trim();
  const productUrl = /^https?:\/\//i.test(rawUrl) ? clean(rawUrl) : "";
  const hasProduct = Boolean(productName || productCode || productSize);
  const productRow = (text: string, html: string) =>
    html
      ? `<tr><td width="110" valign="top" style="padding:4px 0;color:#6b7280;font-size:13px;">${text}</td><td valign="top" style="padding:4px 0;color:#111827;font-size:14px;font-weight:600;">${html}</td></tr>`
      : "";
  const productBlock = hasProduct
    ? `<tr>
              <td style="padding:16px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef4ff;border:1px solid #c7d7f5;border-radius:10px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <div style="color:#1e58c4;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Price request for product</div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${productRow("Product", productName)}
                        ${productRow("Code", productCode)}
                        ${productRow("Size", productSize ? `${productSize}${productUnit ? ` <span style="color:#6b7280;font-weight:400;">(${productUnit})</span>` : ""}` : "")}
                      </table>
                      ${productUrl ? `<a href="${productUrl}" style="display:inline-block;margin-top:10px;color:#1e58c4;font-size:13px;font-weight:600;text-decoration:none;">View product page &rarr;</a>` : ""}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New contact message</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Segoe UI,Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">New message from ${name} via mekmar.com</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#212529;padding:24px 32px;">
                <div style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.08em;">MEKMAR</div>
                <div style="color:#c7d2fe;font-size:13px;margin-top:4px;">Website contact form</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <div style="color:#111827;font-size:18px;font-weight:600;">New message from ${name}</div>
                <div style="color:#6b7280;font-size:13px;margin-top:4px;">${sentAt} (Istanbul)</div>
              </td>
            </tr>
            ${productBlock}
            <tr>
              <td style="padding:8px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>${label("Name")}${value(name || empty)}</tr>
                  <tr>${label("Email")}${value(
                    email
                      ? `<a href="mailto:${email}" style="color:#1e58c4;text-decoration:none;">${email}</a>`
                      : empty,
                  )}</tr>
                  <tr>${label("Phone")}${value(
                    phone
                      ? `<a href="tel:${phone.replace(/[^\d+]/g, "")}" style="color:#1e58c4;text-decoration:none;">${phone}</a>`
                      : empty,
                  )}</tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <div style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:10px;">Message</div>
                <div style="background:#f9fafb;border-left:4px solid #1e58c4;border-radius:6px;padding:16px 18px;color:#111827;font-size:15px;line-height:1.6;">${message || empty}</div>
              </td>
            </tr>
            ${
              email
                ? `<tr>
              <td style="padding:20px 32px 28px;">
                <a href="mailto:${email}?subject=${encodeURIComponent("Re: Your message to Mekmar")}" style="display:inline-block;background:#1e58c4;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 22px;border-radius:8px;">Reply to ${name || email}</a>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px;">
                This message was sent from the contact form on mekmar.com.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New message from the mekmar.com contact form",
    `Date: ${sentAt} (Istanbul)`,
    "",
    `Name: ${String(body?.name ?? "").trim() || "-"}`,
    `Email: ${String(body?.email ?? "").trim() || "-"}`,
    `Phone: ${phone ? rawPhone : "-"}`,
    ...(hasProduct
      ? [
          "",
          "Price request for product:",
          `Product: ${String(p?.name ?? "").trim() || "-"}`,
          `Code: ${String(p?.code ?? "").trim() || "-"}`,
          `Size: ${String(p?.size ?? "").trim() || "-"} ${String(p?.unit ?? "").trim()}`.trim(),
          ...(productUrl ? [`Page: ${rawUrl}`] : []),
        ]
      : []),
    "",
    "Message:",
    String(body?.description ?? "").trim() || "-",
  ].join("\n");

  return {
    html,
    text,
    name: String(body?.name ?? "").trim(),
    productName: hasProduct ? String(p?.name || p?.code || "").trim() : "",
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const mail = buildContactEmail(body);
  const replyTo = String(body?.email ?? "").trim();

  try {
    await mailTransporter.sendMail({
      from: `"Mekmar.com" <${MAIL_FROM}>`,
      to: CONTACT_TO,
      replyTo: replyTo || undefined,
      subject: mail.productName
        ? `Mekmar.com Price Request – ${mail.productName}${mail.name ? ` – ${mail.name}` : ""}`
        : `Mekmar.com Contact${mail.name ? ` – ${mail.name}` : ""}`,
      html: mail.html,
      text: mail.text,
    });
    return true;
  } catch (err) {
    console.error("Contact mail failed:", err);
    throw createError({ statusCode: 500, statusMessage: "Mail could not be sent" });
  }
});
