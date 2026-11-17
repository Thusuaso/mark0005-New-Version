<template>
  <div class="lg">
    <button
      id="languageDropdown"
      class="lg__btn"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      :aria-label="`Language: ${selected.label}`"
    >
      <img
        :src="selected.flag"
        :alt="selected.code"
        class="lg__flag"
        width="70"
        height="70"
      />
      <span class="lg__code">{{ selected.code }}</span>
      <span class="lg__chev" aria-hidden="true"></span>
    </button>

    <ul class="dropdown-menu lg__menu" aria-labelledby="languageDropdown">
      <li v-for="lang in languages" :key="lang.code">
        <a
          class="lg__item"
          :class="{ 'is-on': lang.code === selected.code }"
          :href="lang.link"
          @click="selectLanguage(lang)"
        >
          <img
            :src="lang.flag"
            :alt="''"
            class="lg__flag"
            width="70"
            height="70"
            loading="lazy"
          />
          <span class="lg__label">{{ lang.label }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
/**
 * Dil secici.
 *
 * Eskiden Bootstrap'in `btn btn-light dropdown-toggle` sinifiyla geliyordu:
 * acik gri bir dugme + Bootstrap'in kendi caret'i, ve menude yalnizca
 * bayrak vardi (hangi dil oldugu okunmuyordu). Yeni tasarimin mono diline
 * uymadigi icin dugme ve menu bastan yazildi; bayraklarin yanina dil adi
 * da eklendi.
 *
 * Bootstrap'in dropdown data-API'si korundu (plugins/bootstrap.client.ts
 * yalnizca collapse/dropdown/modal import ediyor).
 */
import { computed } from "vue";
import { useStore } from "~/store/index";
/* Bayraklar 512x512 png'ydi (ar 920x920), toplam 137 KB, ama 20px
   gosteriliyorlar. 70x70 webp'ye indirildi (3.5x DPR'a kadar yeterli),
   toplam 10 KB. public/ yerine assets/ altindalar: her biri 4 KB'nin
   altinda oldugu icin Vite bunlari base64 olarak bundle'a gomuyor, yani
   5 ayri istek yerine hash'li JS chunk'i ile birlikte cache'leniyorlar. */
import flagEn from "~/assets/flags/en.webp";
import flagFr from "~/assets/flags/fr.webp";
import flagEs from "~/assets/flags/es.webp";
import flagRu from "~/assets/flags/ru.webp";
import flagAr from "~/assets/flags/ar.webp";

const store = useStore();
const cookie = useCookie("language");
const languages = [
  { code: "en", label: "English", flag: flagEn, link: "/" },
  { code: "fr", label: "Français", flag: flagFr, link: "/fr" },
  { code: "es", label: "Español", flag: flagEs, link: "/es" },
  { code: "ru", label: "Русский", flag: flagRu, link: "/ru" },
  { code: "ar", label: "العربية", flag: flagAr, link: "/ar" },
];
/* Secili dil store'dan okunuyor, cerezden DEGIL.
   Neden: cerezi middleware/main.global.ts URL'deki dilden yaziyor, ama
   ziyaretci /ru adresine ilk kez geldiginde cerez henuz yok ve bu bilesen
   "en" gosteriyordu. store.getLang ayni middleware tarafindan URL'den
   ayarlaniyor ve bilesen setup'indan once kosuyor, yani dogru kaynak o.
   Cerez yalnizca yedek; ikisi de taninmazsa en'e dusuluyor (aksi halde
   find() undefined donup template'teki selected.flag SSR'i 500'e
   dusuruyordu). */
const selected = computed(
  () =>
    languages.find((x) => x.code === String(store.getLang)) ??
    languages.find((x) => x.code === cookie.value) ??
    languages[0],
);

function selectLanguage(lang) {
  /* Tam sayfa gezinmesi oldugu icin asil isi cerez yapiyor; store yeni
     sayfada middleware tarafindan zaten dogru kuruluyor. */
  cookie.value = lang.code;
}
</script>

<style scoped>
.lg {
  position: relative;
  display: inline-flex;
}

/* --- Tetikleyici --- */
/* Zemin ve metin rengi `currentColor`'dan geliyor: Navbar seffaf modda
   kendi :deep() kuraliyla beyaza cevirince bu dugme de kendiliginden
   beyaza donuyor. */
.lg__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 2.375rem;
  padding-inline: 0.5rem 0.625rem;
  font-family: var(--mk-ff-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: inherit;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: var(--mk-radius-pill);
  cursor: pointer;
  /* Cerceve rengi metinle ayni oldugu icin tam opak durursa agir
     gorunuyor; hafifletiliyor, hover'da tam opaklasiyor. */
  opacity: 0.65;
  transition: opacity 0.25s ease;
}

.lg__btn:hover,
.lg__btn:focus-visible,
.lg:has(.dropdown-menu.show) .lg__btn {
  opacity: 1;
}

.lg__btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.lg__flag {
  flex: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  object-fit: cover;
}

.lg__code {
  line-height: 1;
}

/* Kucuk asagi ok — Bootstrap'in caret'i yerine. */
.lg__chev {
  flex: none;
  width: 0.3rem;
  height: 0.3rem;
  margin-inline-start: 0.0625rem;
  border-inline-end: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 0.3s ease;
}

.lg:has(.dropdown-menu.show) .lg__chev {
  transform: translateY(1px) rotate(225deg);
}

/* --- Menu --- */
.lg__menu {
  min-width: 11rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  /* Menu her zaman acik zeminde duruyor (seffaf navbar'in altina da
     beyaz panel olarak aciliyor), bu yuzden renkleri sabit. */
  color: var(--mk-ink);
  background: var(--mk-cream);
  border: 1px solid rgba(48, 48, 47, 0.1);
  border-radius: var(--mk-radius);
  box-shadow:
    0 1px 2px 1px rgba(3, 11, 30, 0.06),
    0 1px 1px 0 rgba(3, 11, 30, 0.1);
}

.lg__item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  font-family: var(--mk-ff-body);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--mk-grey-2);
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.lg__item:hover,
.lg__item:focus-visible {
  color: var(--mk-ink);
  background: var(--mk-cream-2);
}

.lg__item.is-on {
  color: var(--mk-ink);
}

/* Secili dilin yaninda ince bir isaret. */
.lg__item.is-on .lg__label::after {
  content: "";
  display: inline-block;
  width: 0.75rem;
  height: 1px;
  margin-inline-start: 0.5rem;
  vertical-align: middle;
  background: var(--mk-accent);
}

.lg__label {
  line-height: 1.3;
}

@media (prefers-reduced-motion: reduce) {
  .lg__btn,
  .lg__chev,
  .lg__item {
    transition: none;
  }
}
</style>
