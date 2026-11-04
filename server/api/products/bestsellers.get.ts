import mssql from "mssql";
import api from "~/sql/api";

/**
 * Ana sayfadaki "Best Sellers" bolumu.
 *
 * Veritabaninda "best seller" isareti yok; liste elle secildigi icin urun
 * id'leri burada duruyor. Isim/gorsel/link yine veritabanindan geliyor —
 * urun adi degisirse bolum de kendiliginde guncellenir.
 *
 * Siralama BEST_SELLER_IDS dizisindeki sira; SQL'in dondurdugu sira degil.
 */
/* Sira kasitli olarak karisik: ayni aileden iki urun (lavabo, traverten,
   mermer...) arka arkaya gelmiyor, boylece serit tek bir kategoriden
   olusuyormus gibi gorunmuyor.

   Her istekte yeniden karistirmak YANLIS olurdu: sunucu ile istemci farkli
   sira uretir ve hidrasyon uyusmazligi cikar. Bu yuzden sira sabit ama
   dagitilmis. */
const BEST_SELLER_IDS = [
  663, //  Farmer Sink Model 105           — lavabo
  451, //  Emperador Light Marble          — mermer
  33, //   Classic Travertine              — traverten
  279, //  Toros Black Marble              — mermer
  802, //  Vessel Sink Model 115           — lavabo
  787, //  Perla Limestone                 — kirectasi
  229, //  Bianco Ibiza Marble             — mermer
  41, //   Classic Vein Cut Travertine Honed — traverten
  1012, // Bathtub Model 107               — kuvet
  244, //  Tundra Grey Marble              — mermer
  537, //  Bluestone                       — bazalt
  395, //  Turkish Lilac Marble            — mermer
];

const LANGS = ["en", "fr", "es", "ru", "ar"];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const lang = LANGS.includes(String(query.lang)) ? String(query.lang) : "en";
  const nameCol = `mp.urunadi_${lang}`;
  const langPrefix = lang === "en" ? "" : `/${lang}`;

  const idParams = BEST_SELLER_IDS.map((_, i) => `@id${i}`).join(",");

  const sql = `
    select
      mp.urunid as id,
      ${nameCol} as name,
      (select top 1 mf.imagePath from MekmarCom_Fotolar mf
        where mf.urunid = mp.urunid order by mf.sira) as image,
      TRIM('/product/detail/'
        + TRIM(REPLACE(REPLACE(LOWER(mp.urunadi_en),' ','-'),'ı','i'))
        + '/' + TRIM(STR(mp.urunid))) as link
    from MekmarCom_Products mp
    where mp.yayinla = 1 and mp.urunid in (${idParams})
  `;

  const request = (await api).request();
  BEST_SELLER_IDS.forEach((id, i) => {
    request.input(`id${i}`, mssql.Int, id);
  });

  const result = await request.query(sql);
  const rows: any[] = result.recordset ?? [];

  /* Yayindan kaldirilan urun sessizce listeden duser. */
  const products = BEST_SELLER_IDS.map((id) =>
    rows.find((row) => row.id === id),
  )
    .filter(Boolean)
    .map((row: any) => ({
      id: row.id,
      name: String(row.name ?? "").trim(),
      image: row.image,
      link: langPrefix + row.link,
    }));

  return { products };
});
