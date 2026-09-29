import { useStore } from "~/store/index";

import { ref } from "vue";

/**
 * Dil verileri dinamik import ile yukleniyor.
 *
 * Onceden bes JSON da (en+fr+es+ru+ar = 280 KB) statik import ediliyordu.
 * Bu middleware global oldugu icin hepsi entry chunk'ina giriyor, yani her
 * ziyaretci tek dil kullanmasina ragmen bes dilin tamamini indirip parse
 * ediyordu; olculdugunde 810 KB'lik entry chunk'in ~%35'i buydu ve dogrudan
 * main-thread'deki "Script Evaluation" suresine biniyordu.
 *
 * Dinamik import ile her dil kendi chunk'ina ayriliyor ve yalnizca istenen
 * dil yukleniyor. Ilk yuklemede bu middleware sunucuda kosuyor, istemci
 * durumu Nuxt payload'undan aldigi icin tarayici bu chunk'lardan hicbirini
 * istemiyor; yalnizca uygulama icinde dil degistiren gezinmelerde ilgili
 * chunk bir kez cekiliyor.
 */
const langLoaders = {
  en: () => import("~/assets/data/en.json"),
  fr: () => import("~/assets/data/fr.json"),
  es: () => import("~/assets/data/es.json"),
  ru: () => import("~/assets/data/ru.json"),
  ar: () => import("~/assets/data/ar.json"),
} as const;

type LangKey = keyof typeof langLoaders;

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useStore();

  const langs = to.path.split("/")[1];

  const cookie = useCookie("language");
  const cookieUser = useCookie("user");

  if (
    cookieUser.value == null ||
    cookieUser.value == undefined ||
    cookieUser.value == "" ||
    cookieUser.value == " "
  ) {
    store.setAuthStatus(ref(false));
  } else {
    store.setAuthStatus(ref(true));
  }

  /* Bilinmeyen/bos ilk segment (ornegin "/", "/about", "/usa") ingilizce demek;
     onceki if/else zincirinin varsayilani da buydu. */
  const lang: LangKey = langs in langLoaders ? (langs as LangKey) : "en";

  cookie.value = lang;
  const data = await langLoaders[lang]();
  await store.setMainStorage(data.default ?? data);
  await store.setLang(lang);
});
