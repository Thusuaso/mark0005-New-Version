/* Emekliye ayrilan kategoriler: artik satilmiyor, sayfalari
   server/data/retired.json ile baska bir kategoriye yonlendiriliyor.
   Ama urunleri veritabaninda hala `yayinla=1` oldugu icin filtre
   sorgusu (GROUP BY ... where mp.yayinla=1) onlari saymaya devam
   ediyordu — yani filtre, tiklandiginda baska yere yonlenen bir
   kategori gosteriyordu.

   18 = Plasterboard (alcipan), 5 urun.

   Kalici cozum veritabaninda: o bes urunun `yayinla` alanini 0 yapmak.
   O zaman kategori filtreden, aramadan ve sayac toplamlarindan
   kendiliginden duser ve buradaki listeye gerek kalmaz. */
const RETIRED_CATEGORY_IDS = [18];

/* Kategori filtresi satirlarinin linki `/product/<slug>/<id>` seklinde.
   Renk/finis/kenar filtreleri daha uzun (`/product/filter/category/...`),
   bu yuzden asagidaki kalip yalnizca kategori satirlarini yakaliyor —
   diger filtre listeleri etkilenmiyor. */
const CATEGORY_LINK = /^\/product\/[^/]+\/(\d+)$/;

function isRetiredCategory(row: any): boolean {
  const id = CATEGORY_LINK.exec(String(row?.link ?? ""))?.[1];
  return !!id && RETIRED_CATEGORY_IDS.includes(Number(id));
}

/* SQL Server'in LOWER()'i Turkce siralama (collation) altinda 'I' harfini
   NOKTASIZ 'ı' yapiyor. Kategori linkleri `LOWER(mk.kategori_link)` ile
   uretildigi icin "Installation-Materials" -> "ınstallation-materials"
   oluyordu; tarayicida `/product/%C4%B1nstallation-materials/11` diye
   gorunuyor.

   Sayfa yine aciliyor (yol eslesmesini sondaki id yapiyor, slug degil)
   ama ayni sayfaya iki ayri adres olusuyor: ana sayfa ve site haritasi
   noktali "installation-materials" kullaniyor, filtre noktasizini. Arama
   motoru acisindan bu kopya icerik.

   Urun adlari icin ayni sorun SQL tarafinda `REPLACE(...,'ı','i')` ile
   cozulmus; kategori linki sorgusunda unutulmus ve o sorgu 16 ayri
   dosyada tekrar ediyor. Burada tek yerden duzeltiliyor. */
function fixTurkishSlug(link: string): string {
  return link.replace(/ı/g, "i").replace(/İ/g, "i");
}

const project = {
    lang_project(payload: any, lang: any) {
        let data: { name: any; country: any;link:any }[] = [];
        if (lang == 'en') {
            payload.forEach((x: { ProjectName: any; CountryName: any;Link:any }) => {
                data.push({  ...x,'name': x.ProjectName, 'country': x.CountryName,'link':x.Link });  
            });
        } else if (lang == 'fr') {
                        payload.forEach((x: { ProjectName_Fr: any; CountryName_Fr: any;Link:any }) => {
                data.push({  ...x,'name': x.ProjectName_Fr, 'country': x.CountryName_Fr, 'link':'/fr'+x.Link });  
            });
        }
        else if (lang == 'es') {
                        payload.forEach((x: { ProjectName_Es: any; CountryName_Es: any;Link:any }) => {
                data.push({  ...x,'name': x.ProjectName_Es, 'country': x.CountryName_Es, 'link':'/es' +x.Link  });  
            });
        }
        else if (lang == 'ru') {
                        payload.forEach((x: { ProjectName_Ru: any; CountryName_Ru: any;Link:any }) => {
                data.push({  ...x,'name': x.ProjectName_Ru, 'country': x.CountryName_Ru, 'link':'/ru'+x.Link  });  
            });
        }
        else if (lang == 'ar') {
            payload.forEach((x: { ProjectName_Ar: any; CountryName_Ar: any;Link:any }) => {
    data.push({  ...x,'name': x.ProjectName_Ar, 'country': x.CountryName_Ar, 'link':'/ar'+x.Link  });  
});
}
        return data;

    },
    lang_project_desc(payload: any, lang: any) {
        let desc = '';
        if (lang == 'en') {
            desc = payload.ProjectInformation;
        } else if (lang == "fr") {
            desc = payload.ProjectInformation_Fr;
        }else if (lang == "es") {
            desc = payload.ProjectInformation_Es;
        }else if (lang == "ru") {
            desc = payload.ProjectInformation_Ru;
        }else if (lang == "ar") {
            desc = payload.ProjectInformation_Ar;
        }

        return desc;
    },
    lang_project_detail_name(payload: any, lang: any) {
        let name = '';
        if (lang == 'en') {
            name = payload.ProjectName + ' - ' + payload.CountryName;
        }else if (lang == 'fr') {
            name = payload.ProjectName_Fr + ' - ' + payload.CountryName_Fr;
        }else if (lang == 'es') {
            name = payload.ProjectName_Es+ ' - ' + payload.CountryName_Es;
        }else if (lang == 'ru') {
            name = payload.ProjectName_Ru + ' - ' + payload.CountryName_Ru;
        }else if (lang == 'ar') {
            name = payload.ProjectName_Ar + ' - ' + payload.CountryName_Ar;
        };

        
        return name;
    },
    lang_category_products(payload: any, lang: any) {
        let data: { name: any;link:any }[] = [];
        if (lang == 'en') {
            payload.forEach((x: { name_en: any;link:any }) => {
                data.push({...x, 'name': x.name_en,'link':x.link  });
            });
        }       else if (lang == 'fr') {
            payload.forEach((x: { name_fr: any;link:any }) => {
                data.push({...x, 'name': x.name_fr,'link':'/fr' +x.link  });
            });
        }else if (lang == 'es') {
            payload.forEach((x: { name_es: any;link:any }) => {
                data.push({...x, 'name': x.name_es,'link':'/es'+x.link  });
            });
        }else if (lang == 'ru') {
            payload.forEach((x: { name_ru: any;link:any }) => {
                data.push({...x, 'name': x.name_ru,'link':'/ru'+x.link  });
            });
        }else if (lang == 'ar') {
            payload.forEach((x: { name_ar: any;link:any }) => {
                data.push({...x, 'name': x.name_ar,'link':'/ar'+x.link  });
            });
        };

        return data;
    },
    lang_filter(payload: any, lang: any) {
        let data: any[] = [];
        /* Butun filtre listeleri (kategori, renk, finis, kenar, malzeme,
           stil, tip) bu fonksiyondan geciyor — emekli kategoriyi tek
           yerden eleyebilmemizin sebebi bu. Dil oneki eklenmeden ONCE
           suzuluyor, cunku kalip oneksiz linke gore yazildi. */
        payload = (payload ?? [])
            .filter((x: any) => !isRetiredCategory(x))
            .map((x: any) => ({ ...x, link: fixTurkishSlug(String(x?.link ?? "")) }));
        if (lang == 'en') {
            payload.forEach((x: any) => {
                data.push({...x, 'name': x.name_en, 'link':x.link });
            });
        }        else if (lang == 'fr') {
            payload.forEach((x: any) => {
                data.push({...x, 'name': x.name_fr, 'link':'/fr' + x.link});
            });
        }        else if (lang == 'es') {
            payload.forEach((x: any) => {
                                data.push({...x, 'name': x.name_es, 'link':'/es' + x.link});

            });
        }        else if (lang == 'ru') {
            payload.forEach((x: any) => {
                                                data.push({...x, 'name': x.name_ru, 'link':'/ru' + x.link});

            });
        }else if (lang == 'ar') {
            payload.forEach((x: any) => {
                                                data.push({...x, 'name': x.name_ar, 'link':'/ar' + x.link});

            });
        };
        return data;
    },
    product_detail(payload: any, lang: any) {
        let data = {};
        if (lang == 'en') {
            data = { 'name': payload.urunadi_en, 'desc': payload.aciklama_en, 'keys': payload.anahtarlar_en, 'hash': payload.keywords_en, 'category': payload.kategori_en, 'stone': payload.stone_type_en, ...payload };
        }        else if (lang == 'fr') {
            data = { 'name': payload.urunadi_fr, 'desc': payload.aciklama_fr, 'keys': payload.anahtarlar_fr, 'hash': payload.keywords_fr, 'category': payload.kategori_fr, 'stone': payload.stone_type_fr, ...payload };
        } else if (lang == 'es') {
            data = { 'name': payload.urunadi_es, 'desc': payload.aciklama_es, 'keys': payload.anahtarlar_es, 'hash': payload.keywords_es, 'category': payload.kategori_es, 'stone': payload.stone_type_es, ...payload };
        }else if (lang == 'ru') {
            data = { 'name': payload.urunadi_ru, 'desc': payload.aciklama_ru, 'keys': payload.anahtarlar_ru, 'hash': payload.keywords_ru, 'category': payload.kategori_ru, 'stone': payload.stone_type_ru, ...payload };
        }else if (lang == 'ar') {
            data = { 'name': payload.urunadi_ar, 'desc': payload.aciklama_ar, 'keys': payload.anahtarlar_ar, 'hash': payload.keywords_ar, 'category': payload.kategori_ar, 'stone': payload.stone_type_ar, ...payload };
        };
        return data;
    },
    lang_project_variation(payload: any, category: any) {
        let variation = '';
        if (category == 1) {
            variation = payload.var_1;
        } else if (category == 2) {
            variation = payload.var_2;
        }
        else if (category == 3) {
            variation = payload.var_1;
        }
                else if (category == 4) {
            variation = payload.var_1;
        }else if (category == 5) {
            variation = payload.var_1;
        }
        else if (category ==6) {
            variation = payload.var_1;
        }
        else if (category ==7) {
            variation = payload.var_1;
        }else if (category ==8) {
            variation = payload.var_1;
        }else if (category ==11) {
            variation = payload.var_1;
        }
        return variation;
    },
    lang_application(payload: any, category: any) {
        if (category == 1) {
            return payload.marble;
        } else if (category == 2) {
            return payload.travertine;
        } else if (category == 3) {
            return payload.limestone;
        } else if (category == 4) {
            return payload.mosaic;
        } else if (category == 7) {
            return payload.slab;
        } else if (category == 8) {
            return payload.quartz
        }else if (category == 5) {
            return payload.outdoor
        } else if (category == 9) {
            return payload.byproducts;
        } else if (category == 11) {
            return payload.installation;
        }
    },
    lang_specification(payload: any, category: any) {
        if (category == 1) {
            return payload.marble;
        } else if (category == 2) {
            return payload.travertine;
        } else if (category == 3) {
            return payload.limestone;
        } else if (category == 4) {
            return payload.mosaic;
        } else if (category == 7) {
            return payload.slab;
        } else if (category == 8) {
            return payload.quartz
        }else if (category == 5) {
            return payload.outdoor
        } else if (category == 6) {
            return payload.bath;
        }
    },
    lang_usa_product(payload:any,lang:any){

        let data = [];
        if(lang=='en'){
            payload.forEach(x=>{
                data.push({...x,'name':x.name_en,'link':x.link});
            });
        }        else if(lang=='fr'){
            payload.forEach(x=>{
                data.push({...x,'name':x.name_fr,'link':'/fr'+ x.link});
            });
        } else if(lang=='es'){
            payload.forEach(x=>{
                data.push({...x,'name':x.name_es,'link':'/es'+x.link});
            });
        }else if(lang=='ru'){
            payload.forEach(x=>{
                data.push({...x,'name':x.name_en,'link':x.link});

            });
        }else if(lang=='ar'){
            payload.forEach(x=>{
                data.push({...x,'name':x.name_en,'link':x.link});

            });
        };
        return data;
    },
    lang_usa_filter(payload:any,lang:any){


        let data = [];
        if(lang == 'en'){
            payload.forEach(x=>{
                data.push({"name":x.name_en,...x});
            });
        }else if (lang=="fr"){
            payload.forEach(x=>{
                data.push({"name":x.name_fr,...x});
            });
        }else if (lang == "es"){
            payload.forEach(x=>{
                data.push({"name":x.name_es,...x});
            })
        }else{
            payload.forEach(x=>{
                data.push({"name":x.name_en,...x});
            });

        }
        
        return data;
    },
    lang_usa_detail_product(payload:any,lang:any){
        let data = {};
        if(lang=='en'){
            data = {'name':payload.urunadi_en,'description':payload.aciklama_en,
                    'renk':payload.renk_en,
                    'box_detail':payload.kutudetay_en,
                    'crate_detail':payload.kasadetay_en,
                    'hashtags':payload.hashtags,
                ...payload};

        } else if(lang=='fr'){
            data = {'name':payload.urunadi_fr,'description':payload.aciklama_fr,
                'renk':payload.renk_fr,
                'box_detail':payload.kutudetay_fr,
                'crate_detail':payload.kasadetay_fr,
                'hashtags':payload.hashtags_fr,

                
                ...payload};

        }else if(lang=='es'){
            data = {'name':payload.urunadi_es,'description':payload.aciklama_es,
                'renk':payload.renk_es,
                'box_detail':payload.kutudetay_es,
                'crate_detail':payload.kasadetay_es,
                'hashtags':payload.hashtags_es,

                ...payload};

        }else{
            data = {'name':payload.urunadi_en,'description':payload.aciklama_en,
                'renk':payload.renk_en,
                'box_detail':payload.kutudetay_en,
                'crate_detail':payload.kasadetay_en,
                ...payload};

        }
        return data;
    },
    lang_project_detail_photos(payload:any,lang:any){
        const data = [];
        if(lang=="en"){
            payload.forEach(x=>{
                data.push({'name':x.ProductName,...x});
            });
        }        else if(lang=="fr"){
            payload.forEach(x=>{
                data.push({'name':x.ProductName_Fr,...x});
            });
        }else if(lang=="es"){
            payload.forEach(x=>{
                data.push({'name':x.ProductName_Es,...x});
            });
        }else if(lang=="ru"){
            payload.forEach(x=>{
                data.push({'name':x.ProductName_Ru,...x});
            });
        }else if(lang=="ar"){
            payload.forEach(x=>{
                data.push({'name':x.ProductName_Ar,...x});
            });
        };
        return data;

    }

}
export default project;