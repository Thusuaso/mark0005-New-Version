// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  app: {
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
