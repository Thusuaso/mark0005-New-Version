import api from "~/sql/api";
export default defineEventHandler(async (event) => {
  let name = getRouterParam(event, "name");
  const productsSql = `
                               Select
			 k.ID,
			 u.Fiyat,
			 u.MaxStock,
             ms.StockSqft as Stok_Sqft,
            u.Size,
            u.Sira,
			u.urunadi_en as name_en,
			u.aciklama_en,
			u.urunadi_fr as name_fr,
			u.aciklama_fr,
            u.urunadi_es as name_es,
            u.aciklama_es,
            'https://cdn.mekmarimage.com/usa-products/' + (select TOP 1 dmf.Image from DepoUrunKart_MekmarFotolarTB dmf where dmf.UrunId = k.ID order by dmf.Sira) as image,
            '/usa/stock/product/detail/' + TRIM(STR(k.ID)) as link

            from DepoUrunKartTB k,DepoUrunKart_MekmarSiteTB u,MekmarCom_StockListYeni ms
			where MekmarSite=1 and u.UrunId=k.ID and u.TurkiyeStock=0 and ms.SkuNo = k.SkuNo 
            and u.Yayinla=1 and u.LinkSize='${name}' and ms.StockSqft >0
            order by ms.StockSqft desc
    `;
  const usageAreaSql = `
                   select
			k.Id,
			k.kullanim_en as name_en,
			k.kullanim_fr as name_fr,
            k.kullanim_es as name_es,
			count(*) as products,
			TRIM('/usa/filter/area/' + TRIM(STR(k.Id)) + '/' + REPLACE(k.kullanim_en,' ','-')) as link
            from
            DepoUrunKart_Urun_KullanimTB u,DepoUrunKart_UsaKullanimAlanTB k,MekmarCom_StockListYeni ms,
			DepoUrunKartTB depo, DepoUrunKart_MekmarSiteTB dm
			where
			u.KullanimId=k.Id and u.UrunId = depo.ID and depo.ID = dm.UrunId and depo.SkuNo = ms.SkuNo and ms.StockSqft >0 and depo.MekmarSite=1 and dm.Yayinla=1
			group by k.Id,k.kullanim_en,kullanim_fr,kullanim_es
			order by count(*) desc
    `;
  const categorySql = `
        select
            dbo.Get_KategoriAdi(d.UrunKartID) as name_en,
            count(*) as products,
			'/usa/filter/category/' + REPLACE(dbo.Get_KategoriAdi(d.UrunKartID),' ','-') as link
            from
            DepoUrunKartTB d,DepoUrunKart_MekmarSiteTB m,MekmarCom_StockListYeni ms
            where
            d.MekmarSite=1 and m.Yayinla=1 and d.SkuNo = ms.SkuNo and ms.StockSqft >0 and m.UrunId = d.ID
            group by dbo.Get_KategoriAdi(d.UrunKartID)
            order by count(*) desc
    `;
  const colorSql = `
                select
            k.renk_en as name_en,
			k.renk_fr as name_fr,
            k.renk_es as name_es,
            count(*) as products,
			'/usa/filter/color/' + k.renk_en as link
            from
            DepoUrunKartTB d,DepoUrunKart_MekmarSiteTB k,MekmarCom_StockListYeni ms
            where
            d.MekmarSite=1 and k.UrunId = d.ID
            and k.Yayinla=1 and k.TurkiyeStock = 0 and d.SkuNo = ms.SkuNo and ms.StockSqft >0
            group by k.renk_en,k.renk_fr,k.renk_es
            order by count(*) desc
    `;
  const sizeSql = `
                select
            m.Size as name_en,
            '/usa/filter/size/' + m.LinkSize as link,
            count(*) as products
            from
            DepoUrunKartTB d,DepoUrunKart_MekmarSiteTB m,MekmarCom_StockListYeni ms
            where
            d.MekmarSite=1 and m.UrunId = d.ID
            and MosaicSize=0 and m.Yayinla=1 and d.SkuNo = ms.SkuNo and ms.StockSqft >0
            group by m.Size,m.LinkSize 
            order by count(*) desc
    `;
  const mosaicSizeSql = `
select
            m.Size as name_en,
            '/usa/filter/mosaic/size/' + m.LinkSize as link,
            count(*) as products
            from
            DepoUrunKartTB d,DepoUrunKart_MekmarSiteTB m ,MekmarCom_StockListYeni ms
            where
            d.MekmarSite=1 and m.UrunId = d.ID
            and MosaicSize=1 and m.Yayinla=1 and d.SkuNo = ms.SkuNo and ms.StockSqft >0
            group by m.Size,m.LinkSize
            order by count(*) desc
    `;
  return new Promise(async (resolve, reject) => {
    (await api).query(productsSql, async (err, products) => {
      (await api).query(usageAreaSql, async (err, usage) => {
        (await api).query(categorySql, async (err, category) => {
          (await api).query(colorSql, async (err, color) => {
            (await api).query(sizeSql, async (err, size) => {
              (await api).query(mosaicSizeSql, async (err, mosaic) => {
                const data = {
                  products: products?.recordset,
                  usage: usage?.recordset,
                  category: category?.recordset,
                  color: color?.recordset,
                  size: size?.recordset,
                  mosaic: mosaic?.recordset,
                };
                resolve(data);
              });
            });
          });
        });
      });
    });
  });
});
