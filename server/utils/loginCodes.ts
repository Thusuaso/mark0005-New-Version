import { createHash, randomInt, timingSafeEqual } from "node:crypto";

/* Giris kodlari bellekte tutulur (tek node-server sureci icin yeterli).
   Sunucu yeniden baslarsa bekleyen kodlar gecersiz olur; musteri yeni kod ister. */

const CODE_TTL_MS = 10 * 60 * 1000; // kod 10 dakika gecerli
const RESEND_COOLDOWN_MS = 60 * 1000; // ayni kullaniciya 60 sn'de bir kod
const MAX_ATTEMPTS = 5; // yanlis deneme hakki

type Entry = {
  hash: string;
  expiresAt: number;
  sentAt: number;
  attempts: number;
};

const codes = new Map<string, Entry>();

const key = (username: string) => username.trim().toLowerCase();
const hashCode = (code: string) =>
  createHash("sha256").update(code).digest("hex");

function purgeExpired() {
  const now = Date.now();
  for (const [k, v] of codes) {
    if (v.expiresAt < now) codes.delete(k);
  }
}

/** Yeni kod uretir. Bekleme suresi dolmadiysa kalan saniyeyi dondurur. */
export function createLoginCode(
  username: string,
): { code: string } | { retryAfter: number } {
  purgeExpired();
  const k = key(username);
  const existing = codes.get(k);
  const now = Date.now();
  if (existing && now - existing.sentAt < RESEND_COOLDOWN_MS) {
    return {
      retryAfter: Math.ceil(
        (RESEND_COOLDOWN_MS - (now - existing.sentAt)) / 1000,
      ),
    };
  }
  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  codes.set(k, {
    hash: hashCode(code),
    expiresAt: now + CODE_TTL_MS,
    sentAt: now,
    attempts: 0,
  });
  return { code };
}

export type VerifyResult = "ok" | "invalid" | "expired" | "too_many";

export function verifyLoginCode(username: string, code: string): VerifyResult {
  const k = key(username);
  const entry = codes.get(k);
  if (!entry || entry.expiresAt < Date.now()) {
    codes.delete(k);
    return "expired";
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    codes.delete(k);
    return "too_many";
  }
  entry.attempts++;
  const a = Buffer.from(entry.hash, "hex");
  const b = Buffer.from(hashCode(code.trim()), "hex");
  if (a.length === b.length && timingSafeEqual(a, b)) {
    codes.delete(k);
    return "ok";
  }
  return "invalid";
}

export const LOGIN_CODE_TTL_MINUTES = CODE_TTL_MS / 60000;
