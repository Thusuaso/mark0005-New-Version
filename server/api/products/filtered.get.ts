import mssql from "mssql";
import api from "~/sql/api";
import {
  FILTER_KEYS,
  availableFilters,
  readFilters,
  type ActiveFilters,
  type FilterKey,
} from "~/utils/productFilters";

/**
 * Birlesik (zincirlenebilir) urun filtreleme.
 *
 *   /api/products/filtered?category=1&color=5,9&finish=polished
 *
 * Boyutlar ARASINDA VE, boyut ICINDE VEYA calisiyor:
 *   marble + (blue YA DA beige) + polished
 *
 * Eski uclar (/api/products/filter/[category]/color/[color] vb.) tek bir
 * boyut uygulayabiliyordu; ikinci bir filtre secmek oncekini siliyordu.
 * Bu uc hepsini birlikte uyguluyor.
 *
 * --- Faceted sayimlar ---
 * Her boyutun yanindaki sayi, O BOYUT HARIC diger tum filtreler
 * uygulandiginda kac urun kalacagini gosteriyor. Boylece "blue'ya basarsam
 * ne kadar urun kalir" sorusu dogru cevaplaniyor. Secili boyutun kendi
 * secimi sayima dahil edilmezse liste tiklanamaz hale gelirdi (her secim
 * digerlerini 0 gosterirdi).
 *
 * --- Guvenlik ---
 * Butun kullanici girdileri mssql parametresi olarak baglaniyor
 * (request.input). Projedeki eski filtre uclari degerleri SQL metnine
 * dogrudan gomuyordu (`where mur.RenkId='${color}'`); buraya ayni deseni
 * tasimadik.
 */

/* Her boyut icin: hangi tabloda, hangi kolonlar.
   `match` urun id'sini donduren alt sorgu; `valueType` parametre tipi. */
const DIMENSIONS: Record<
  FilterKey,
  {
    /* Secili degerlere gore urun id'si donduren alt sorgu. */
    subquery: (placeholders: string) => string;
    valueType: mssql.ISqlType | (() => mssql.ISqlType);
    /* Boyutun secenek listesini + sayimlarini uretir. */
    options: (whereExtra: string) => string;
  }
> = {
  color: {
    subquery: (ph) =>
      `select mur.UrunId from MekmarCom_UrunlerRenkList mur where mur.RenkId in (${ph})`,
    valueType: mssql.Int,
    options: (whereExtra) => `
      select
        count(distinct mp.urunid) as Filtered,
        mpc.renk_en as name_en, mpc.renk_fr as name_fr, mpc.renk_es as name_es,
        mpc.renk_ru as name_ru, mpc.renk_ar as name_ar,
        mpc.ID as value
      from MekmarCom_ProductsColor mpc
      inner join MekmarCom_UrunlerRenkList mur on mur.RenkId = mpc.ID
      inner join MekmarCom_Products mp on mp.urunid = mur.UrunId
      where mp.yayinla = 1 and mp.kategori_id = @cat ${whereExtra}
      group by mpc.renk_en, mpc.renk_fr, mpc.renk_es, mpc.renk_ru, mpc.renk_ar, mpc.ID
      order by count(distinct mp.urunid) desc`,
  },

  /* finish tablosunda id yok; isim slug'i (bosluklar tire) deger olarak
     kullaniliyor — eski /finish/[finishName] ucu da boyle yapiyordu. */
  finish: {
    subquery: (ph) =>
      `select mfi.urunid from MekmarCom_Finish mfi
         where lower(replace(ltrim(rtrim(mfi.finish_en)), ' ', '-')) in (${ph})`,
    valueType: mssql.NVarChar,
    options: (whereExtra) => `
      select
        count(distinct mp.urunid) as Filtered,
        mfi.finish_en as name_en, mfi.finish_fr as name_fr, mfi.finish_es as name_es,
        mfi.finish_ru as name_ru, mfi.finish_ar as name_ar,
        lower(replace(ltrim(rtrim(mfi.finish_en)), ' ', '-')) as value
      from MekmarCom_Finish mfi
      inner join MekmarCom_Products mp on mp.urunid = mfi.urunid
      where mp.yayinla = 1 and mp.kategori_id = @cat ${whereExtra}
      group by mfi.finish_en, mfi.finish_fr, mfi.finish_es, mfi.finish_ru, mfi.finish_ar
      order by count(distinct mp.urunid) desc`,
  },

  edge: {
    subquery: (ph) =>
      `select mkf.UrunId from MekmarCom_KenarFiltered mkf where mkf.KenarId in (${ph})`,
    valueType: mssql.Int,
    options: (whereExtra) => `
      select
        count(distinct mp.urunid) as Filtered,
        mkl.KenarEn as name_en, mkl.KenarFr as name_fr, mkl.KenarEs as name_es,
        mkl.KenarRu as name_ru, mkl.KenarAr as name_ar,
        mkl.ID as value
      from MekmarCom_KenarList mkl
      inner join MekmarCom_KenarFiltered mkf on mkf.KenarId = mkl.ID
      inner join MekmarCom_Products mp on mp.urunid = mkf.UrunId
      where mp.yayinla = 1 and mp.kategori_id = @cat ${whereExtra}
      group by mkl.KenarEn, mkl.KenarFr, mkl.KenarEs, mkl.KenarRu, mkl.KenarAr, mkl.ID
      order by count(distinct mp.urunid) desc`,
  },

  material: {
    subquery: (ph) =>
      `select mmf.UrunId from MekmarCom_MateryalFiltered mmf where mmf.MateryalId in (${ph})`,
    valueType: mssql.Int,
    options: (whereExtra) => `
      select
        count(distinct mp.urunid) as Filtered,
        mml.MateryalEn as name_en, mml.MateryalFr as name_fr, mml.MateryalEs as name_es,
        mml.MateryalRu as name_ru, mml.MateryalAr as name_ar,
        mml.ID as value
      from MekmarCom_MateryalList mml
      inner join MekmarCom_MateryalFiltered mmf on mmf.MateryalId = mml.ID
      inner join MekmarCom_Products mp on mp.urunid = mmf.UrunId
      where mp.yayinla = 1 and mp.kategori_id = @cat ${whereExtra}
      group by mml.MateryalEn, mml.MateryalFr, mml.MateryalEs, mml.MateryalRu, mml.MateryalAr, mml.ID
      order by count(distinct mp.urunid) desc`,
  },

  style: {
    subquery: (ph) =>
      `select msf.UrunId from MekmarCom_StilFiltered msf where msf.StilId in (${ph})`,
    valueType: mssql.Int,
    options: (whereExtra) => `
      select
        count(distinct mp.urunid) as Filtered,
        msl.StilEn as name_en, msl.StilFr as name_fr, msl.StilEs as name_es,
        msl.StilRu as name_ru, msl.StilAr as name_ar,
        msl.ID as value
      from MekmarCom_StilList msl
      inner join MekmarCom_StilFiltered msf on msf.StilId = msl.ID
      inner join MekmarCom_Products mp on mp.urunid = msf.UrunId
      where mp.yayinla = 1 and mp.kategori_id = @cat ${whereExtra}
      group by msl.StilEn, msl.StilFr, msl.StilEs, msl.StilRu, msl.StilAr, msl.ID
      order by count(distinct mp.urunid) desc`,
  },

  type: {
    subquery: (ph) =>
      `select mtf.UrunId from MekmarCom_TurFiltered mtf where mtf.TurId in (${ph})`,
    valueType: mssql.Int,
    options: (whereExtra) => `
      select
        count(distinct mp.urunid) as Filtered,
        mtl.TurEn as name_en, mtl.TurFr as name_fr, mtl.TurEs as name_es,
        mtl.TurRu as name_ru, mtl.TurAr as name_ar,
        mtl.ID as value
      from MekmarCom_TurList mtl
      inner join MekmarCom_TurFiltered mtf on mtf.TurId = mtl.ID
      inner join MekmarCom_Products mp on mp.urunid = mtf.UrunId
      where mp.yayinla = 1 and mp.kategori_id = @cat ${whereExtra}
      group by mtl.TurEn, mtl.TurFr, mtl.TurEs, mtl.TurRu, mtl.TurAr, mtl.ID
      order by count(distinct mp.urunid) desc`,
  },
};

/**
 * Secili filtrelerden `and mp.urunid in (...)` parcalari uretir.
 * `skip` verilen boyut atlanir (faceted sayim icin).
 *
 * Parametreler `binds`'e toplaniyor; cagiran taraf request.input ile
 * bagliyor.
 */
function buildWhere(
  active: ActiveFilters,
  binds: { name: string; type: any; value: string | number }[],
  skip?: FilterKey,
): string {
  let sql = "";

  for (const key of FILTER_KEYS) {
    if (key === skip) continue;
    const values = active[key];
    if (!values?.length) continue;

    const dim = DIMENSIONS[key];
    const names: string[] = [];

    values.forEach((value, i) => {
      /* Parametre adi boyut + sira; skip farkli oldugu icin her sorguda
         yeniden uretiliyor, cakisma olmuyor. */
      const name = `${key}${i}`;
      names.push(`@${name}`);
      binds.push({
        name,
        type: dim.valueType,
        /* Numerik boyutlarda sayiya cevriliyor; gecersizse 0 kalip hicbir
           seyle eslesmiyor (sessizce bos sonuc, hata degil). */
        value: dim.valueType === mssql.Int ? Number(value) || 0 : value,
      });
    });

    sql += ` and mp.urunid in (${dim.subquery(names.join(","))})`;
  }

  return sql;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const categoryId = Number(query.category);

  if (!Number.isFinite(categoryId) || categoryId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "category parametresi gerekli",
    });
  }

  const active = readFilters(query as Record<string, any>, categoryId);
  const pool = await api;

  /* Yardimci: sorguyu parametrelerle kosar. */
  const run = async (
    sql: string,
    binds: { name: string; type: any; value: any }[],
  ) => {
    const request = pool.request();
    request.input("cat", mssql.Int, categoryId);
    for (const bind of binds) request.input(bind.name, bind.type, bind.value);
    const result = await request.query(sql);
    return result.recordset ?? [];
  };

  /* --- Urunler: tum filtreler uygulanmis --- */
  const productBinds: { name: string; type: any; value: any }[] = [];
  const productWhere = buildWhere(active, productBinds);

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
    where mp.yayinla = 1 and mp.kategori_id = @cat ${productWhere}
    order by mp.sira asc`;

  /* --- Kategori listesi: filtrelerden bagimsiz (her zaman tam liste) ---
     Kategori degistirmek filtreleri sifirliyor, o yuzden sayimlar da
     kategori bazinda. */
  const categorySql = `
    select
      count(mp.urunid) as Filtered,
      mk.kategoriadi_en as name_en, mk.kategoriadi_fr as name_fr,
      mk.kategoriadi_es as name_es, mk.kategoriadi_ru as name_ru,
      mk.kategoriadi_ar as name_ar,
      mk.Id as value,
      ('/product/' + TRIM(LOWER(mk.kategori_link))) + '/' + TRIM(LOWER(STR(mk.Id))) as link
    from MekmarCom_Products mp
    inner join MekmarCom_Kategoriler mk on mk.Id = mp.kategori_id
    where mp.yayinla = 1
    group by mk.kategoriadi_en, mk.kategoriadi_fr, mk.kategoriadi_es,
             mk.kategoriadi_ru, mk.kategoriadi_ar, mk.Id, mk.kategori_link
    order by mk.Id`;

  const [products, category_f] = await Promise.all([
    run(productsSql, productBinds),
    run(categorySql, []),
  ]);

  /* --- Her boyutun secenekleri: kendisi HARIC diger filtreler uygulanmis ---
     Yalnizca bu kategoride gosterilen boyutlar sorgulaniyor. Ornegin marble'da
     sadece color + finish var; edge/material/style/type listelerini cekmek
     bosa dort sorgu olurdu (sonuclari zaten render edilmiyor). */
  const shown = availableFilters(categoryId);

  const facetEntries = await Promise.all(
    shown.map(async (key) => {
      const binds: { name: string; type: any; value: any }[] = [];
      const where = buildWhere(active, binds, key);
      const rows = await run(DIMENSIONS[key].options(where), binds);
      return [key, rows] as const;
    }),
  );

  /* Gosterilmeyen boyutlar bos dizi olarak doner: istemci tarafi her zaman
     ayni sekli gorsun. */
  const facets = Object.fromEntries([
    ...FILTER_KEYS.map((key) => [key, [] as any[]]),
    ...facetEntries,
  ]) as Record<FilterKey, any[]>;

  return {
    categoryId,
    active,
    total: products.length,
    products,
    category_f,
    /* Eski alan adlariyla ayni kalsin diye <key>_f olarak da veriliyor. */
    color_f: facets.color,
    finish_f: facets.finish,
    edge_f: facets.edge,
    material_f: facets.material,
    style_f: facets.style,
    type_f: facets.type,
  };
});
