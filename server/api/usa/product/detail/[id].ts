import api from "~/sql/api";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const detailSql = `
        Select 
			 k.ID,
			 u.Fiyat,
			 u.MaxStock,
            (select ms.StockSqft from MekmarCom_StockListYeni ms where ms.SkuNo = k.SkuNo) Stok_Sqft,
            k.SkuNo,
            u.Size,           
            u.TurkiyeStock,
			u.urunadi_en,
			u.aciklama_en,
			u.anahtarlar_en,
			u.renk_en,
			u.kutudetay_en,
			u.kasadetay_en,
			u.surface_en,
			u.edge_en,
			u.urunadi_fr,
			u.aciklama_fr,
			u.anahtarlar_fr,
			u.renk_fr,
			u.kutudetay_fr,
			u.kasadetay_fr,
			u.surface_fr,
			u.edge_fr,
            u.urunadi_es,
			u.aciklama_es,
			u.anahtarlar_es,
			u.renk_es,
			u.kutudetay_es,
			u.kasadetay_es,
			u.surface_es,
			u.edge_es,
			u.Surface,
			u.Edge,
			u.hashtags,
			u.hashtags_fr,
			u.hashtags_es

            from DepoUrunKartTB k,DepoUrunKart_MekmarSiteTB u
			where MekmarSite=1 and u.UrunId=k.ID and k.ID='${id}'
    `;
  const photosSql = `
        select ('https://cdn.mekmarimage.com/usa-products/' + dum.Image) as image,
        ('https://cdn.mekmarimage.com/usa-products/' + dum.Webp) as webp,
		dum.Sira
        from DepoUrunKart_MekmarFotolarTB dum
        where dum.UrunId='${id}'
		order by dum.Sira
    `;
  return new Promise(async (resolve, reject) => {
    (await api).query(detailSql, async (err, detail) => {
      (await api).query(photosSql, (err, photos) => {
        const data = {
          detail: detail?.recordset[0],
          photos: photos?.recordset,
        };
        resolve(data);
      });
    });
  });
});
