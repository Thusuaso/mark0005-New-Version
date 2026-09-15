import mssql from "mssql";
import api from "~/sql/api";

const LANGS = ["en", "fr", "es", "ru", "ar"];
const CATEGORY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 18];
const LIMIT = 6;

/* LIKE icinde % _ [ karakterleri joker gorevi goruyor; kullanicinin yazdigi
   metin desen degil duz metin olarak aranmali. */
const escapeLike = (value: string) => value.replace(/[[%_]/g, (c) => `[${c}]`);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const term = typeof query.q === "string" ? query.q.trim() : "";
  if (term.length < 2) {
    return { products: [] };
  }

  const lang = LANGS.includes(String(query.lang)) ? String(query.lang) : "en";
  const nameCol = `mp.urunadi_${lang}`;
  const keywordCol = `mp.anahtarlar_${lang}`;
  const langPrefix = lang === "en" ? "" : `/${lang}`;

  /* "classic vein" gibi coklu kelimede tam ifade araman sonuc vermiyor —
     kelimeler urun adinda dagilmis olabiliyor. Her kelime ayri ayri aranip
     AND ile birlestiriliyor. */
  const tokens = term.split(/\s+/).filter(Boolean).slice(0, 4);
  const conditions = tokens
    .map((_, i) => `(${nameCol} like @t${i} or ${keywordCol} like @t${i})`)
    .join(" and ");

  const sql = `
    select top (@limit)
      mp.urunid as id,
      ${nameCol} as name,
      (select top 1 mf.imagePath from MekmarCom_Fotolar mf
        where mf.urunid = mp.urunid order by mf.sira) as image,
      TRIM('/product/detail/'
        + TRIM(REPLACE(REPLACE(LOWER(mp.urunadi_en),' ','-'),'ı','i'))
        + '/' + TRIM(STR(mp.urunid))) as link
    from MekmarCom_Products mp
    where mp.yayinla = 1
      and mp.kategori_id in (${CATEGORY_IDS.join(",")})
      and ${conditions}
    order by
      case when ${nameCol} like @starts then 0 else 1 end,
      ${nameCol}
  `;

  const request = (await api).request();
  request.input("limit", mssql.Int, LIMIT);
  request.input("starts", mssql.NVarChar, `${escapeLike(term)}%`);
  tokens.forEach((token, i) => {
    request.input(`t${i}`, mssql.NVarChar, `%${escapeLike(token)}%`);
  });

  const result = await request.query(sql);

  return {
    products: (result.recordset ?? []).map((row: any) => ({
      id: row.id,
      name: row.name,
      image: row.image,
      link: langPrefix + row.link,
    })),
  };
});
