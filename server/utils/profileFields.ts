/* Profil formunun tek dogruluk kaynagi: hem kod isteme hem onay adimi ayni
   normalizasyonu kullanmali, yoksa imzadaki payload hash'i tutmaz.

   "name" alani MusterilerTB.Unvan kolonuna karsilik geliyor. Bu kolon kayitlara
   gore bazen kisi adi ("Hatice Doru"), bazen ticari unvan ("TOPLIGHT DOORS AND
   WINDOWS LIMITED") tasiyor; bu yuzden ad/soyad diye bolunmuyor, tek serbest
   metin alani olarak islem goruyor. */

export type ProfileInput = {
  company: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export const PROFILE_LIMITS: Record<keyof ProfileInput, number> = {
  company: 200,
  name: 200,
  email: 100,
  phone: 50,
  address: 500,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Govdeden gelen degerleri kirpar; imza da bu normalize haline baglanir. */
export function normalizeProfile(body: any): ProfileInput {
  const one = (v: unknown, max: number) =>
    String(v ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, max);

  return {
    company: one(body?.company, PROFILE_LIMITS.company),
    name: one(body?.name, PROFILE_LIMITS.name),
    email: one(body?.email, PROFILE_LIMITS.email).toLowerCase(),
    phone: one(body?.phone, PROFILE_LIMITS.phone),
    // Adres cok satirli olabilir: satir sonlarini koru, fazlasini kirp
    address: String(body?.address ?? "")
      .replace(/[ \t]+/g, " ")
      .replace(/\r\n/g, "\n")
      .trim()
      .slice(0, PROFILE_LIMITS.address),
  };
}

/** Bos/gecersiz alan varsa hangisi oldugunu dondurur. */
export function validateProfile(p: ProfileInput): string | null {
  if (!p.company) return "company";
  if (!p.name) return "name";
  if (!EMAIL_RE.test(p.email)) return "email";
  if (!p.phone) return "phone";
  return null;
}
