import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";
import type { H3Event } from "h3";

/* Giris kodlari bellekte degil, HMAC ile imzalanmis httpOnly cerezde tutulur.
   Boylece kodu ureten surec ile dogrulayan surec farkli olsa da (Vercel serverless,
   pm2 cluster, yeniden baslatma) dogrulama calisir.
   Cerez: "<expiresAt>.<hmac(email|code|expiresAt)>" — kodun kendisi cerezde yok.
   Bekleme suresi ve yanlis deneme sayaci surec belleginde tutulur (en iyi caba). */

const CODE_TTL_MS = 10 * 60 * 1000; // kod 10 dakika gecerli
const RESEND_COOLDOWN_MS = 60 * 1000; // ayni kullaniciya 60 sn'de bir kod
const MAX_ATTEMPTS = 5; // yanlis deneme hakki
const COOKIE_NAME = "login_code";

const SECRET =
  process.env.LOGIN_CODE_SECRET ||
  // Ayri bir gizli anahtar tanimlanmadiysa mevcut gizli degerlerden turet
  createHash("sha256")
    .update(
      `login-code|${process.env.DB_PASSWORD ?? ""}|${process.env.MAIL_PASSWORD ?? ""}`,
    )
    .digest("hex");

const lastSent = new Map<string, number>();
const attempts = new Map<string, { count: number; expiresAt: number }>();

const key = (username: string) => username.trim().toLowerCase();
const sign = (email: string, code: string, expiresAt: number) =>
  createHmac("sha256", SECRET)
    .update(`${email}|${code}|${expiresAt}`)
    .digest("hex");

function purgeExpired() {
  const now = Date.now();
  for (const [k, sentAt] of lastSent) {
    if (now - sentAt >= RESEND_COOLDOWN_MS) lastSent.delete(k);
  }
  for (const [k, v] of attempts) {
    if (v.expiresAt < now) attempts.delete(k);
  }
}

/** Yeni kod uretir ve imzasini cereze yazar. Bekleme suresi dolmadiysa kalan saniyeyi dondurur. */
export function createLoginCode(
  event: H3Event,
  username: string,
): { code: string } | { retryAfter: number } {
  purgeExpired();
  const k = key(username);
  const now = Date.now();
  const sentAt = lastSent.get(k);
  if (sentAt && now - sentAt < RESEND_COOLDOWN_MS) {
    return {
      retryAfter: Math.ceil((RESEND_COOLDOWN_MS - (now - sentAt)) / 1000),
    };
  }
  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = now + CODE_TTL_MS;
  lastSent.set(k, now);
  setCookie(event, COOKIE_NAME, `${expiresAt}.${sign(k, code, expiresAt)}`, {
    path: "/api/auth",
    httpOnly: true,
    sameSite: "lax",
    // http uzerinden acilan sitede secure cerez tarayicida dusurulur ve kod hep "expired" olur
    secure: getRequestProtocol(event, { xForwardedProto: true }) === "https",
    maxAge: CODE_TTL_MS / 1000,
  });
  return { code };
}

export type VerifyResult = "ok" | "invalid" | "expired" | "too_many";

export function verifyLoginCode(
  event: H3Event,
  username: string,
  code: string,
): VerifyResult {
  purgeExpired();
  const k = key(username);
  const [expRaw, mac] = String(getCookie(event, COOKIE_NAME) ?? "").split(".");
  const expiresAt = Number(expRaw);
  if (!mac || !Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    deleteCookie(event, COOKIE_NAME, { path: "/api/auth" });
    return "expired";
  }

  const tries = attempts.get(mac) ?? { count: 0, expiresAt };
  if (tries.count >= MAX_ATTEMPTS) {
    deleteCookie(event, COOKIE_NAME, { path: "/api/auth" });
    return "too_many";
  }
  tries.count++;
  attempts.set(mac, tries);

  const a = Buffer.from(mac, "hex");
  const b = Buffer.from(sign(k, code.trim(), expiresAt), "hex");
  if (a.length === b.length && timingSafeEqual(a, b)) {
    // Ayni kodun tekrar kullanilmasini engelle
    tries.count = MAX_ATTEMPTS;
    deleteCookie(event, COOKIE_NAME, { path: "/api/auth" });
    return "ok";
  }
  return "invalid";
}

export const LOGIN_CODE_TTL_MINUTES = CODE_TTL_MS / 60000;
