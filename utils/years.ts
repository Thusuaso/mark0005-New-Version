/**
 * Kurulustan bu yana gecen yil sayisi tek yerden hesaplaniyor.
 *
 * Dil dosyalarinda yil sayisi elle yazilmiyor; metne {years} yaziliyor ve
 * middleware/main.global.ts icindeki fillYears() bunu calisma aninda gercek
 * sayiyla degistiriyor. Boylece 2027 oldugunda metinler kendiliginden 25
 * oluyor, hicbir JSON'a dokunmak gerekmiyor.
 *
 * Rusca'da sayi ile "yil" kelimesinin cekimi degistigi icin (24 goda,
 * 25 let, 31 god) ru.json'da sayidan sonra {years_unit} kullaniliyor.
 */

export const FOUNDED_YEAR = 2002;

/** Kurulustan bu yana tam yil sayisi. */
export function yearsSince(founded = FOUNDED_YEAR): number {
  return new Date().getFullYear() - founded;
}

/** Rusca'da "yil" kelimesinin sayiya gore dogru cekimi. */
function russianYearWord(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "лет";
  const mod10 = n % 10;
  if (mod10 === 1) return "год";
  if (mod10 >= 2 && mod10 <= 4) return "года";
  return "лет";
}

/** {years_unit} tokeninin dile gore karsiligi. */
function yearsUnit(lang: string, n: number): string {
  if (lang === "ru") return russianYearWord(n);
  if (lang === "ar") return "عامًا";
  if (lang === "fr") return "ans";
  if (lang === "es") return "años";
  return n === 1 ? "year" : "years";
}

/**
 * Verilen yapiyi kopyalayarak icindeki {years} / {years_unit} tokenlerini
 * doldurur. Girdi (dinamik import edilen JSON modulu) degistirilmez.
 */
export function fillYears<T>(value: T, lang: string, years = yearsSince()): T {
  const unit = yearsUnit(lang, years);

  const walk = (node: any): any => {
    if (typeof node === "string") {
      return node.includes("{years")
        ? node
            .replace(/\{years_unit\}/g, unit)
            .replace(/\{years\}/g, String(years))
        : node;
    }
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === "object") {
      const out: Record<string, any> = {};
      for (const key in node) out[key] = walk(node[key]);
      return out;
    }
    return node;
  };

  return walk(value) as T;
}
