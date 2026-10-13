/**
 * !!! SADECE YEREL GELISTIRME !!!
 *
 * Bu script gecerli bir oturum cerezi URETIR, yani verilen e-posta adresine
 * sahip musteri gibi davranmaya izin verir. Calismak icin .env'deki gizli
 * degerlere ihtiyaci var (.env repoda degil), ama yine de sunucuya/canliya
 * KOPYALANMAMALI ve CI/deploy adimlarina girmemelidir.
 *
 * Amaci: siparis/panel uclarini mail kodu akisindan gecmeden test etmek.
 *
 * SADECE GELISTIRME TESTI: verilen e-posta icin gecerli bir mk_session cerez
 * degeri uretir, boylece siparis API'si mail kodu akisi olmadan denenebilir.
 * Imza mantigi server/utils/session.ts ile ayni.
 */
const fs = require("fs");
const path = require("path");
const { createHash, createHmac } = require("node:crypto");

const env = {};
for (const l of fs
  .readFileSync(path.join(__dirname, "..", ".env"), "utf8")
  .split(/\r?\n/)) {
  const m = l.match(/^([A-Za-z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}
const SECRET =
  env.SESSION_SECRET ||
  env.LOGIN_CODE_SECRET ||
  createHash("sha256")
    .update(`session|${env.DB_PASSWORD ?? ""}|${env.MAIL_PASSWORD ?? ""}`)
    .digest("hex");

const email = String(process.argv[2] || "")
  .trim()
  .toLowerCase();
if (!email) {
  console.error("kullanim: node scripts/dev-session-cookie.cjs <email>");
  process.exit(1);
}
const issuedAt = Date.now();
const mac = createHmac("sha256", SECRET)
  .update(`${email}|${issuedAt}`)
  .digest("hex");
console.log(`${email}|${issuedAt}.${mac}`);
