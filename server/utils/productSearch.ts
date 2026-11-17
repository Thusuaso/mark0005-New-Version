import mssql from "mssql";
import api from "~/sql/api";

/**
 * Urun aramasinin tek kaynagi.
 *
 * Bes dilin arama ucu (server/api/search/[name].ts ve ar/es/fr/ru
 * altindakiler) ayni sorgunun kopyasiydi; aralarindaki TEK fark
 * aranan anahtar kolonuydu (anahtarlar_en / _fr / _es / _ru / _ar).
 * Ucu de burayi cagiriyor.
 *
 * --- Neden tasindi ---
 * Kopyalar ayni iki kusuru tasiyordu:
 *
 * 1) Aranan metin SQL'e DOGRUDAN gomuluyordu:
 *      like '%' + '${name.replaceAll('_',' ')}' + '%'
 *    Adres cubugundaki her sey sorgunun parcasi oluyordu. Artik
 *    mssql parametresi (@q) olarak baglaniyor.
 *
 * 2) Iki sorgu ic ice callback'lerle SIRAYLA kosuyordu; aralarinda
 *    bagimlilik yok. Promise.all ile paralel.
 */

/** Aramada taranacak kategoriler. */
const SEARCHABLE_CATEGORIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 18, 23, 24];

/** Dil -> MekmarCom_Products icindeki anahtar kelime kolonu. */
const KEYWORD_COLUMN = {
  en: "anahtarlar_en",
  fr: "anahtarlar_fr",
  es: "anahtarlar_es",
  ru: "anahtarlar_ru",
  ar: "anahtarlar_ar",
} as const;

export type SearchLang = keyof typeof KEYWORD_COLUMN;

export async function searchProducts(lang: SearchLang, rawName: string | undefined) {
  const column = KEYWORD_COLUMN[lang];

  /* Adresteki alt cizgiler bosluga donuyor: /search/beyaz_mermer. */
  const term = (rawName ?? "").replaceAll("_", " ").trim();

  const cats = SEARCHABLE_CATEGORIES.join(",");

  const productsSql = `
    select
      mp.Id, mp.urunid, mp.kategori_id,
      mp.urunadi_en as name_en, mp.urunadi_fr as name_fr, mp.urunadi_es as name_es,
      mp.urunadi_ru as name_ru, mp.urunadi_ar as name_ar,
      (select top 1 mf.imagePath from MekmarCom_Fotolar mf
        where mf.urunid = mp.urunid order by mf.sira) as image,
      TRIM('/product/detail/'
        + TRIM(REPLACE(REPLACE(LOWER(mp.urunadi_en), ' ', '-'), 'ı', 'i'))
        + '/' + TRIM(STR(mp.urunid))) as link
    from MekmarCom_Products mp
    where mp.yayinla = 1
      and mp.${column} like '%' + @q + '%'
      and mp.kategori_id in (${cats})
    order by mp.kategori_id`;

  const categorySql = `
    select
      COUNT(mk.kategoriadi_en) as Filtered,
      mk.kategoriadi_en as name_en, mk.kategoriadi_fr as name_fr,
      mk.kategoriadi_es as name_es, mk.kategoriadi_ru as name_ru,
      mk.kategoriadi_ar as name_ar,
      ('/product/' + TRIM(LOWER(mk.kategori_link))) + '/' + TRIM(LOWER(STR(mk.Id))) as link
    from MekmarCom_Products mp
    inner join MekmarCom_Kategoriler mk on mk.Id = mp.kategori_id
    where mp.yayinla = 1
    group by mk.kategoriadi_en, mk.kategoriadi_fr, mk.kategoriadi_es,
             mk.kategoriadi_ru, mk.kategoriadi_ar, mk.Id, mk.kategori_link
    order by mk.Id`;

  const pool = await api;

  const [products, categories_f] = await Promise.all([
    pool
      .request()
      .input("q", mssql.NVarChar, term)
      .query(productsSql)
      .then((r) => r.recordset ?? []),
    pool
      .request()
      .query(categorySql)
      .then((r) => r.recordset ?? []),
  ]);

  return { products, categories_f };
}
