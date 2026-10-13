import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { H3Event } from "h3";

/* Oturum, HMAC ile imzalanmis httpOnly bir cerezde tutulur.
   Onceki durumda giris sonrasi yalnizca duz metin "user" cerezi yaziliyordu;
   tarayici konsolundan user=baskasi@firma.com yazan biri o musteri gibi
   gorunebiliyordu. Siparis gecmisi gibi musteriye ozel veriler eklenince bu
   dogrudan baska musterinin verisini sizdirirdi, bu yuzden sunucu artik
   yalnizca bu imzali cereze guveniyor.

   Cerez: "<email>|<issuedAt>.<hmac(email|issuedAt)>"
   Duz metin "user" cerezi arayuzun giris durumunu bilmesi icin korunuyor
   (okunabilir olmasi gerekiyor) ama sunucu tarafinda hicbir yetki icin
   kullanilmiyor. */

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 gun
export const SESSION_COOKIE = "mk_session";
export const UI_COOKIE = "user";

const SECRET =
  process.env.SESSION_SECRET ||
  process.env.LOGIN_CODE_SECRET ||
  // Ayri bir gizli anahtar tanimlanmadiysa mevcut gizli degerlerden turet
  createHash("sha256")
    .update(
      `session|${process.env.DB_PASSWORD ?? ""}|${process.env.MAIL_PASSWORD ?? ""}`,
    )
    .digest("hex");

const sign = (email: string, issuedAt: number) =>
  createHmac("sha256", SECRET).update(`${email}|${issuedAt}`).digest("hex");

/** Giris dogrulandiktan sonra imzali oturum cerezini ve arayuz cerezini yazar. */
export function startSession(event: H3Event, email: string) {
  const mail = email.trim().toLowerCase();
  const issuedAt = Date.now();
  const secure =
    getRequestProtocol(event, { xForwardedProto: true }) === "https";

  setCookie(
    event,
    SESSION_COOKIE,
    `${mail}|${issuedAt}.${sign(mail, issuedAt)}`,
    {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure,
      maxAge: SESSION_TTL_MS / 1000,
    },
  );

  // Arayuzun giris durumunu gormesi icin; sunucu buna guvenmiyor.
  setCookie(event, UI_COOKIE, mail, {
    path: "/",
    sameSite: "lax",
    secure,
    maxAge: SESSION_TTL_MS / 1000,
  });
}

/** Imzali cerezden dogrulanmis e-postayi dondurur; gecersiz/suresi gecmisse null. */
export function sessionEmail(event: H3Event): string | null {
  const raw = getCookie(event, SESSION_COOKIE);
  if (!raw) return null;

  const dot = raw.lastIndexOf(".");
  if (dot < 1) return null;
  const payload = raw.slice(0, dot);
  const mac = raw.slice(dot + 1);

  const sep = payload.lastIndexOf("|");
  if (sep < 1) return null;
  const email = payload.slice(0, sep);
  const issuedAt = Number(payload.slice(sep + 1));
  if (!email || !Number.isFinite(issuedAt)) return null;
  if (Date.now() - issuedAt > SESSION_TTL_MS) return null;

  const a = Buffer.from(mac, "hex");
  const b = Buffer.from(sign(email, issuedAt), "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  return email;
}

/** Cikis: iki cerezi de siler. */
export function endSession(event: H3Event) {
  deleteCookie(event, SESSION_COOKIE, { path: "/" });
  deleteCookie(event, UI_COOKIE, { path: "/" });
}
