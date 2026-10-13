import {
  createHash,
  createHmac,
  randomInt,
  timingSafeEqual,
} from "node:crypto";
import type { H3Event } from "h3";

/* Profil degisikligi onay kodlari.
   loginCodes.ts ile ayni HMAC'li cerez yaklasimi, ama bilerek ayri bir cerez
   adi/yolu ve ayri bir imza alani var; boylece bir giris kodu profil
   degisikligini onaylayamaz, profil kodu da girise yaramaz.

   Ek olarak imzaya degisiklik setinin hash'i de giriyor. Yani kod yalnizca
   kullanicinin gordugu o degisiklikleri onaylar; kod alindiktan sonra istek
   govdesi degistirilirse (ornegin baska bir mail adresi yazilirsa) imza
   tutmaz. Kod her zaman MEVCUT (eski) mail adresine gonderilir. */

const CODE_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;
const COOKIE_NAME = "profile_code";
const COOKIE_PATH = "/api/account";

const SECRET =
  process.env.PROFILE_CODE_SECRET ||
  process.env.LOGIN_CODE_SECRET ||
  createHash("sha256")
    .update(
      `profile-code|${process.env.DB_PASSWORD ?? ""}|${process.env.MAIL_PASSWORD ?? ""}`,
    )
    .digest("hex");

const lastSent = new Map<string, number>();
const attempts = new Map<string, { count: number; expiresAt: number }>();

/** Degisiklik setini sirali ve normalize ederek hash'ler. */
export function profilePayloadHash(payload: Record<string, string>): string {
  const normalized = Object.keys(payload)
    .sort()
    .map((k) => `${k}=${String(payload[k] ?? "").trim()}`)
    .join("\n");
  return createHash("sha256").update(normalized).digest("hex");
}

const sign = (
  email: string,
  code: string,
  payloadHash: string,
  expiresAt: number,
) =>
  createHmac("sha256", SECRET)
    .update(`${email}|${code}|${payloadHash}|${expiresAt}`)
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

/** Belirli bir degisiklik seti icin kod uretir ve imzasini cereze yazar. */
export function createProfileCode(
  event: H3Event,
  email: string,
  payloadHash: string,
): { code: string } | { retryAfter: number } {
  purgeExpired();
  const key = email.trim().toLowerCase();
  const now = Date.now();
  const sentAt = lastSent.get(key);
  if (sentAt && now - sentAt < RESEND_COOLDOWN_MS) {
    return {
      retryAfter: Math.ceil((RESEND_COOLDOWN_MS - (now - sentAt)) / 1000),
    };
  }

  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = now + CODE_TTL_MS;
  lastSent.set(key, now);

  setCookie(
    event,
    COOKIE_NAME,
    `${expiresAt}.${sign(key, code, payloadHash, expiresAt)}`,
    {
      path: COOKIE_PATH,
      httpOnly: true,
      sameSite: "lax",
      secure: getRequestProtocol(event, { xForwardedProto: true }) === "https",
      maxAge: CODE_TTL_MS / 1000,
    },
  );

  return { code };
}

export type ProfileVerifyResult = "ok" | "invalid" | "expired" | "too_many";

/** Kodu ve degisiklik setini birlikte dogrular. */
export function verifyProfileCode(
  event: H3Event,
  email: string,
  code: string,
  payloadHash: string,
): ProfileVerifyResult {
  purgeExpired();
  const key = email.trim().toLowerCase();
  const [expRaw, mac] = String(getCookie(event, COOKIE_NAME) ?? "").split(".");
  const expiresAt = Number(expRaw);
  if (!mac || !Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    deleteCookie(event, COOKIE_NAME, { path: COOKIE_PATH });
    return "expired";
  }

  const tries = attempts.get(mac) ?? { count: 0, expiresAt };
  if (tries.count >= MAX_ATTEMPTS) {
    deleteCookie(event, COOKIE_NAME, { path: COOKIE_PATH });
    return "too_many";
  }
  tries.count++;
  attempts.set(mac, tries);

  const a = Buffer.from(mac, "hex");
  const b = Buffer.from(sign(key, code.trim(), payloadHash, expiresAt), "hex");
  if (a.length === b.length && timingSafeEqual(a, b)) {
    tries.count = MAX_ATTEMPTS; // ayni kod tekrar kullanilamaz
    deleteCookie(event, COOKIE_NAME, { path: COOKIE_PATH });
    return "ok";
  }
  return "invalid";
}

export const PROFILE_CODE_TTL_MINUTES = CODE_TTL_MS / 60000;
