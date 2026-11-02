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

       Geri acmak icin: asagidaki satiri geri getirin ve css dizisindeki
       transitions.css yorumunu kaldirin. Kalici cozum, ust duzey
       `await $fetch(...)` cagrilarini useAsyncData'ya cevirip sayfalari
       Suspense'e bagimli olmaktan cikarmak. */
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

        /* Tema yazi tipi: Libre Baskerville — assets/css/tokens.css
           icindeki --mk-ff-*.

           Yaninda iki tamamlayici: Libre Baskerville YALNIZCA latin ve
           latin-ext alt kumelerini iceriyor, Kiril ve Arapca glifi YOK.
           /ru ve /ar bu yuzden Georgia'ya dusuyor ve digerlerinden farkli
           gorunuyordu. PT Serif Kiril'i, Noto Naskh Arabic Arapca'yi
           tasiyor; ikisi de serif, ayni dilde duruyorlar.

           Ekstra indirme maliyeti yok: Google Fonts her kesimi
           unicode-range ile sunuyor, tarayici yalnizca sayfada gecen
           karakterlerin alt kumesini indiriyor. Ingilizce bir sayfa
           Kiril veya Arapca dosyalarina hic dokunmuyor.

           preconnect'ler el yazimi: Google Fonts'un CSS'i ile .woff2
           dosyalari iki ayri hosttan geliyor, ikisi de baglanti kurulumunu
           beklemesin diye.

           display=swap: font inene kadar metin sistem yazi tipiyle gorunur,
           gorunmez metin (FOIT) olmaz. Font hic inmezse tokendeki
           Georgia/"Times New Roman" zinciri devrede kalir. */
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;700&family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap",
        },
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
  ],
  /* plugins/ dizini Nuxt tarafindan zaten otomatik taraniyor; ms_tag.client.ts
     buradan ayrica listelenmiyor ki iki kez kaydedilmesin. */

  css: [
    /* Tasarim tokenlari (sadece :root degiskenleri, ~1 KB). Yeni bolumler
       bunlari kullaniyor; default.css'ten ONCE yuklenmesi gerekmiyor ama
       burada durmasi her sayfada hazir olmasini sagliyor. */
    "~/assets/css/tokens.css",
    /* Sayfa gecis siniflari (.page-enter-*, .page-leave-*). Yukaridaki
       pageTransition kapali oldugu icin su an kullanilmiyor; dosya
       geri acilmak istenirse diye duruyor.
    "~/assets/css/transitions.css", */

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
