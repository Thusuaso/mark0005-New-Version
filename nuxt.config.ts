// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  app: {
    /* Sayfa gecis animasyonu. Siniflarin tanimi
       assets/css/transitions.css icinde (global olmasi sart).
       mode "out-in": iki sayfa ust uste binmiyor, boylece yukseklik
       ziplamasi ve ayni anda iki h1 bulunmasi olmuyor. */
    /* Sayfa gecisi KAPALI.

       `{ name: "page", mode: "out-in" }` idi. Sayfalarin cogu
       <script setup> icinde ust duzey `await` kullaniyor; bu onlari async
       bilesen yapiyor ve Nuxt onlari <Suspense> ile sariyor.
       <Transition mode="out-in"> + <Suspense> birlesimi Vue'nun cikan
       dali tasirken dustugu bilinen bir hataya giriyor:

         NotFoundError: Failed to execute 'insertBefore' on 'Node'
           at activeBranch.transition.afterLeave

       Her gezinmede yakalanmamis bir istisna uretiyordu ve ayni mekanizma
       bazi sayfalarin tiklandiginda bos gelmesine yol aciyordu. Gecis
       gorsel bir ayrinti, bu ise dogruluk sorunu — gecis kapatildi.

       Gecis hissi yine var ama Vue'nun <Transition>'i olmadan: app.vue
       icindeki sarmalayici `:key="route.path"` tasiyor ve her rota
       degisiminde assets/css/transitions.css icindeki .page-fade
       animasyonu bastan calisiyor. Suspense ile hicbir etkilesimi yok.

       Burayi geri acmak icin kalici cozum, ust duzey `await $fetch(...)`
       cagrilarini useAsyncData'ya cevirip sayfalari Suspense'e bagimli
       olmaktan cikarmak. O yapilana kadar asagidaki satir false kalmali. */
    pageTransition: false,

    head: {
      title: "Mekmar | High-Quality Marble and Natural Stone Solutions",
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "yandex-verification", content: "4bb391314627b52d" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Mekmar offers reliable solutions in construction and design with premium marble and natural stone products. Discover modern design and durability combined.",
        },
        // { name:'google-site-verification',content:'-2spBZ_-lBKXZMQ9r5jpKUNxQ_KOI1Gf_CVKyn7URHA' },
        {
          name: "keywords",
          content:
            "marble, natural stone, marble supplier, natural stone products, building materials, durable natural stone cladding, modern marble designs, marble kitchen countertops",
        },
      ],

      script: [
        // {src:'https://kit.fontawesome.com/0867affd7d.js'},
        // {src:'https://www.googletagmanager.com/gtag/js?id=G-1VBK9JFP48'},
        // { src: "//code.jivosite.com/widget/Q7sfPesDSN", async: true },
      ],

      link: [
        // {rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"},
        {
          rel: "icon",
          href: "https://cdn.mekmarimage.com/logo/mekmar-up-icon.png",
        },

        /* Site genelinde TEK yazi tipi: Helvetica / Arial — yani SISTEM
           yazi tipi (bkz. assets/css/tokens.css --mk-ff-body). Referans
           www.gammastone.com da web fontu kullanmiyor.

           Bu yuzden buradan Roboto istegi KALKTI: latin ve kiril icin
           artik hicbir .woff2 indirilmiyor. Oncesinde Roboto'nun 6 kesimi
           isteniyordu (300/400/500/700 + iki italik).

           Geriye yalnizca Noto Sans Arabic kaliyor ve o YEDEK DEGIL,
           kapsama tamamlamasi: Helvetica/Arial'da Arapca glifi yok,
           tarayici karakter bazinda ilerledigi icin /ar sayfasinda
           Arapca harfler oradan cozuluyor. Olmadan o sayfa rastgele bir
           sistem Arapca yazi tipine dusuyor ve digerlerinden farkli
           gorunuyordu. Ingilizce bir sayfa unicode-range sayesinde bu
           dosyalara hic dokunmuyor, yani maliyeti yalnizca /ar'da.

           O FONT ARTIK BURADAN ISTENMIYOR: @nuxt/fonts devraldi (asagidaki
           `fonts` blogu). Burada duran uc satir silindi —

             preconnect https://fonts.googleapis.com
             preconnect https://fonts.gstatic.com
             stylesheet .../css2?family=Noto+Sans+Arabic:wght@400;500;700

           cunku ucu birlikte her sayfaya bir render-blocking CSS istegi ve
           iki baglanti kurulumu ekliyordu; oysa font yalnizca /ar'da
           gerekiyor. @nuxt/fonts ayni fontu build sirasinda indirip kendi
           domaininden servis ediyor, @font-face'i unicode-range'i ile
           birlikte kendisi uretiyor ve display:swap'i varsayilan olarak
           veriyor — yani yukaridaki gerekcelerin hepsi korunuyor, Google'a
           ucuncu taraf istegi kalmiyor. */
        // {rel:"canonical",href:'https://www.mekmar.com'}
      ],
      style: [],
    },
  },

  nitro: {
    preset: process.env.VERCEL ? undefined : "node-server",
    prerender: {
      routes: ["/"],
      failOnError: false,
    },
  },

  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "maz-ui/nuxt",
    "@primevue/nuxt-module",
    "@vee-validate/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-lazytube",
    "@nuxt/fonts",
    "@nuxt/image",
    "nuxt-schema-org",
    /* nuxt-og-image BILEREK YOK: Nuxt 3 ile uyumlu son surumu (5.1.13)
       Nuxt 3.21'in zorunlu island hash dogrulamasina takiliyor ve
       gorsel endpointi 400 donuyor. Ayrintili gerekce app.vue'nun
       script blogunun sonunda. */
  ],

  /* ========================================================================
     SURUM NOTU — dortu de kasitli olarak son surum DEGIL
     ------------------------------------------------------------------------
     @nuxt/fonts, @nuxt/image, nuxt-schema-org ve nuxt-og-image belirli bir
     surumden sonra Nuxt 4/5 istiyor (@nuxt/kit ^4). Proje Nuxt 3.21'de
     oldugu icin her birinin Nuxt 3 ile uyumlu SON surumu sabitlendi:

       @nuxt/fonts     0.11.4   (0.12+ -> kit ^4.2)
       @nuxt/image     1.11.2   (2.x   -> kit ^4.6)
       nuxt-schema-org 5.0.10   (6.x   -> kit ^4.4)
       nuxt-og-image   5.1.13   (6.x   -> kit ^4.3)

     package.json'da bunlari yukseltmek Nuxt 4'e gecmeden ISE YARAMAZ —
     `npm update` ile kendiliginden atlamasin diye not burada duruyor.
     ======================================================================== */

  /* ------------------------------------------------------------------------
     @nuxt/fonts — Noto Sans Arabic'i kendi domainimizden servis et
     ------------------------------------------------------------------------
     processCSSVariables ZORUNLU, varsayilani false. Modul normalde CSS'teki
     `font-family:` kurallarini tariyor; bizde ise font adi bir DEGISKENIN
     icinde duruyor (assets/css/tokens.css --mk-ff-body). O bayrak olmadan
     "Noto Sans Arabic" hic bulunmuyor, hicbir @font-face uretilmiyor ve
     /ar sayfasi sessizce rastgele bir sistem Arapca fontuna dusuyor —
     yani tam olarak eskiden duzeltilmis olan hataya geri donuyor.

     subsets yalnizca arabic: latin/kiril kesimleri indirilmiyor, cunku
     govde yazi tipi sistem fontu (Helvetica/Arial) ve latin glifleri ondan
     cozuluyor. unicode-range korundugu icin ingilizce bir sayfa bu
     dosyalara hic dokunmuyor.

     weights Google'dan istenen uc kesimle ayni (400/500/700); italik yok,
     cunku tasarimda hic kullanilmiyor. */
  fonts: {
    /* UST SEVIYE, `experimental` ALTINDA DEGIL. 0.11.4'te
       experimental.processCSSVariables deprecated; ustelik modulun dosya
       atlama kontrolu (dist/module.mjs icinde "!options.processCSSVariables
       && !code.includes('font-family:')") ust seviyedeki degeri okuyor, yani
       experimental altinda verildiginde tokens.css hic taranmayabiliyor —
       o dosyada duz bir `font-family:` kurali yok, sadece degisken var.

       Varsayilan deger "font-prefixed-only": SADECE --font* ile baslayan
       degiskenlere bakiyor. Bizim degisken --mk-ff-body, yani varsayilanla
       hic bulunamaz. `true` tum --* degiskenlerini tariyor. */
    processCSSVariables: true,

    /* Tek tek `families` kaydi, `defaults` DEGIL: defaults.subsets ile
       denendiginde alt kume kisitlamasi tutmadi — agirlik basina arabic
       YANINDA latin, latin-ext ve sembol yuzleri de uretildi (olculdu).
       Burada saglayici ve alt kume fontun kendisine baglaniyor.

       weights Google'dan eskiden istenen uc kesimle ayni (400/500/700).
       Italik yok: tasarimda hic kullanilmiyor. */
    families: [
      {
        name: "Noto Sans Arabic",
        provider: "google",
        weights: [400, 500, 700],
        styles: ["normal"],
        subsets: ["arabic"],
      },
    ],
  },

  /* ------------------------------------------------------------------------
     @nuxt/image — YALNIZCA yerel gorseller (public/image, ~83 MB)
     ------------------------------------------------------------------------
     cdn.mekmarimage.com bu ise dahil DEGIL ve bu bir eksiklik degil, olcum
     sonucu: CDN duz Cloudflare static servis yapiyor, `?w=` ve `?width=`
     parametrelerini yok sayip ayni baytlari donduruyor (dogrulandi). Oradaki
     gorsellerin boyut varyantlari URL yoluna elle gomulu (orn.
     /personel/250x250/...). Dolayisiyla CDN tarafinda srcset uretilemez;
     oradaki kazanc width/height + loading="lazy" ile sinirli ve o da
     <NuxtImg> gerektirmiyor, duz <img> ile yapiliyor.

     screens: Bootstrap 5'in kirilma noktalariyla ayni tutuldu
     (bootstrap.custom.scss ile ayni esikler), yoksa srcset esikleri
     duzenin kirilma noktalarindan kayiyor ve tarayici yanlis boyutu
     seciyor. */
  image: {
    quality: 80,
    format: ["webp"],

    /* UZAK GORSELLER — IPX bunlari cekip sunucuda kucultuyor.
       ------------------------------------------------------------------
       Onceki degerlendirmem "CDN kapsam disi" idi; gerekcesi CDN'in
       kendisinin boyutlandirma yapmamasiydi (dogru: ?w= / ?width=
       yok sayiliyor, yol icine gomulu /250x250/ gibi elle uretilmis
       varyantlar var). Ama bu kapsam disi BIRAKMAYI gerektirmiyor:
       IPX uzak adresi indirip kendisi olcekliyor, tek kosul domainin
       burada izinli olmasi.

       Olculen gerekce: /api/projects/list gorselleri 881 KB - 1.4 MB
       arasinda ve ana sayfada altisi birlikte ~6 MB ediyor. Bir kismi
       .jpg, yani webp'e de cevrilmemis.

       Iki ayri host var: eski cdn.mekmarimage.com ve projelerin
       durdugu DigitalOcean Spaces. Ikisi de listede. */
    domains: ["cdn.mekmarimage.com", "mekmar-image.fra1.cdn.digitaloceanspaces.com"],
    screens: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  /* plugins/ dizini Nuxt tarafindan zaten otomatik taraniyor; ms_tag.client.ts
     buradan ayrica listelenmiyor ki iki kez kaydedilmesin. */

  css: [
    /* Tasarim tokenlari (sadece :root degiskenleri, ~1 KB). Yeni bolumler
       bunlari kullaniyor; default.css'ten ONCE yuklenmesi gerekmiyor ama
       burada durmasi her sayfada hazir olmasini sagliyor. */
    "~/assets/css/tokens.css",
    /* Sayfa gecisi (.page-fade). Vue'nun <Transition>'ini DEGIL, app.vue
       icindeki `:key="route.path"` sarmalayicisi uzerinde calisan saf bir
       CSS animasyonunu tanimliyor — yukaridaki pageTransition neden kapali
       kaldi, bkz. dosyanin kendi basligi. Global olmasi sart: app.vue'nun
       <style scoped>'u sarmalayiciya scoped nitelik veriyor olsa da
       animasyonun @keyframes'i ile birlikte tek yerde durmasi okunurlugu
       artiriyor ve ayni sinif ileride baska bir kabukta da kullanilabilir. */
    "~/assets/css/transitions.css",

    "~/assets/css/default.css",

    "~/assets/css/bootstrap.custom.scss",
    /* Fancybox CSS'i (25 KB) burada global degil: tum kullanimi
       components/Shared/Fancybox.vue sarmalayicisindan geciyor, o da yalnizca
       galeri olan 4 sayfada render ediliyor. Global oldugu surece ana sayfa
       dahil her HTML yanitina inline ediliyordu. */
    "~/assets/icons/font/bootstrap-icons.subset.css",
    // "~/assets/css/tailwind.css",
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
    /* Onceden yalnizca `exclude` vardi; modulde `include: undefined` "hepsini
       kaydet" anlamina geliyor, yani 123 bilesenin tamami kaydediliyordu.
       Kullanilmayanlarin taban CSS'i de her sayfaya giriyordu: olculdugunde
       DataTable'in 16 KB'i HTML'de duruyordu ama uygulamada hic kullanilmiyor.
       Asagidaki liste kaynak taramasiyla cikarildi (PascalCase etiketler;
       `<button>`/`<select>` gibi duz HTML etiketleri ayiklandi).

       YENI BIR PrimeVue BILESENI KULLANIRSAN buraya eklemen gerekir, yoksa
       bilesen cozulemez. Form kasitli olarak yok: `Form` etiketini
       @vee-validate/nuxt sagliyor. */
    components: {
      include: [
        "Breadcrumb",
        "Button",
        "Carousel",
        "Galleria",
        "InputText",
        "ProgressBar",
        "Select",
        "Tabs",
        "TabList",
        "Tab",
        "TabPanels",
        "TabPanel",
      ],
    },
  },

  /* Stiller artik HTML'e gomulmuyor, ayri .css dosyalarindan geliyor.
     Varsayilan (true) ile olculdugunde HTML'in %72'si (643 KB) inline
     <style> bloguydu; cache'lenemedigi icin her gezinmede yeniden geliyor ve
     kritik istek zincirinin kokunu yavaslatiyordu. Dis dosya olarak bir kez
     inip cache'lenebiliyor.
     Takas: ilk yuklemede bir render-blocking CSS istegi ekleniyor. */
  features: {
    inlineStyles: false,
  },

  compatibilityDate: "2024-07-16",
  site: {
    url: "https://www.mekmar.com",
    trailingSlash: true,

    /* `name` EKLENDI — eksikligi gorunur bir hataya yol aciyordu:
       nuxt-schema-org site adini bulamayinca package.json'daki paket
       adina dusuyor ve yayina cikan JSON-LD'de

         "@type": "WebSite", "name": "nuxt-app"

       yaziyordu (olculdu). Yani arama motorlarina sitenin adi
       "nuxt-app" olarak bildiriliyordu. */
    name: "Mekmar",
  },

  /* ------------------------------------------------------------------------
     nuxt-schema-org — kurumsal kimlik
     ------------------------------------------------------------------------
     identity tek basina WebSite/WebPage'in otesinde bir Organization
     dugumu ekliyor; sitenin arama sonuclarinda sirket olarak taninmasi
     icin gereken asgari sey bu.

     logo kasitli olarak favicon ile ayni dosya (app.head.link'teki
     mekmar-up-icon.png): CDN'de bulunan tek logo varligi o. Schema.org
     logo icin en az 112x112 ve tercihen genis bir kurumsal logo istiyor,
     dolayisiyla ELDEN GECIRILMESI GEREKEN BIR NOKTA — uygun bir logo
     yuklendiginde burasi guncellenmeli. */
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Mekmar",
      url: "https://www.mekmar.com",
      logo: "https://cdn.mekmarimage.com/logo/mekmar-up-icon.png",
    },
  },
  sitemap: {
    sources: ["/api/sitemap"],
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: "weekly",
    },
    cacheMaxAgeSeconds: 3600,
  },
  runtimeConfig: {
    public: {
      gtagId: "G-1VBK9JFP48",
      adsId: "AW-18344097723",
      yandexMetricaId: "89814958",
    },
  },
  // vite: {
  //   server: {
  //     headers: {
  //       "Cache-Control": "max-age=50000000",
  //     },
  //   },
  // },
  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    disallow: [
      "/search/*",
      "/fr/search/*",
      "/es/search/*",
      "/ru/search/*",
      "/ar/search/*",
    ],
    sitemap: "https://mekmar.com/sitemap.xml",
  },
  static: {
    prefix: false,
  },
  mazUi: {
    injectUseToast: false,
  },
});
