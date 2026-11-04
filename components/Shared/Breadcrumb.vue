<script setup lang="ts">
/**
 * components/Shared/Breadcrumb.vue
 *
 * Sayfanin katalogdaki yerini gosteren iz. Cagiran sayfa izi hazir verir:
 *
 *   <SharedBreadcrumb :items="[
 *     { label: 'Marble', to: '/product/marble/1' },
 *     { label: 'Farmer Sink Model 105' },
 *   ]" />
 *
 * "Ana sayfa" basamagi burada, store'dan (dil + link) kendiliginden
 * ekleniyor; cagiran yalnizca kendi dalini veriyor. Son basamagin `to`
 * alani olmaz: bulundugunuz sayfa baglanti degildir.
 *
 * --- Neden store'daki eski mekanizma degil ---
 * store.setBreadcrumb bir diziye push ediyordu, yani iz gezinme gecmisine
 * gore birikiyordu: ayni urune iki farkli yoldan girince ya da geri tusuyla
 * donunce iz yanlis cikiyordu. Buradaki iz yalnizca sayfanin kendi
 * verisinden tureiyor, gecmisten bagimsiz.
 *
 * --- SEO ---
 * Gorsel izin yani sira schema.org BreadcrumbList (JSON-LD) basiliyor;
 * arama sonuclarinda sitenin yapisi bu sayede gorunuyor. Mutlak adresler
 * nuxt.config'deki site.url uzerinden kuruluyor.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";

const props = defineProps<{
  /** Ana sayfadan SONRAKI basamaklar. Sonuncusu baglantisiz birakilir. */
  items: { label: string; to?: string }[];
}>();

const store = useStore();
const lang = String(store.getLang || "en");
const isRtl = lang === "ar";

const navbar = (store.getNavbar as Record<string, string>) ?? {};
const links = (store.getNavbarLinks as Record<string, string>) ?? {};

const HOME_LABEL: Record<string, string> = {
  en: "Home",
  fr: "Accueil",
  es: "Inicio",
  ru: "Главная",
  ar: "الرئيسية",
};

const ARIA: Record<string, string> = {
  en: "Breadcrumb",
  fr: "Fil d'Ariane",
  es: "Ruta de navegación",
  ru: "Навигационная цепочка",
  ar: "مسار التنقل",
};

/* Veriden gelen basliklar yer yer TUM BUYUK HARF (ornegin kategori
   adlari); iz kucuk puntoda ve cumle duzeninde okunuyor, o yuzden caps
   olanlar yumusatiliyor. Kisaltmalar (CNC, 3D, USA) bozulmasin diye
   yalnizca tamami buyuk harf olan COK HARFLI kelimeler donusturuluyor. */
function soften(text: string): string {
  return String(text ?? "")
    .split(" ")
    .map((w) =>
      w.length > 3 && w === w.toLocaleUpperCase(lang) && /[a-zA-ZÀ-ɏЀ-ӿ]/.test(w)
        ? w.charAt(0) + w.slice(1).toLocaleLowerCase(lang)
        : w,
    )
    .join(" ");
}

const trail = computed(() => [
  { label: HOME_LABEL[lang] ?? HOME_LABEL.en, to: links.home ?? "/" },
  ...props.items
    .filter((i) => i && i.label)
    .map((i) => ({ label: soften(i.label), to: i.to })),
]);

/* schema.org BreadcrumbList */
const SITE = "https://www.mekmar.com";
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.value.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.to ? { item: SITE + item.to } : {}),
        })),
      }),
    },
  ],
});
</script>

<template>
  <nav
    v-if="trail.length > 1"
    class="bc"
    :dir="isRtl ? 'rtl' : undefined"
    :aria-label="ARIA[lang] ?? ARIA.en"
  >
    <ol class="bc__list">
      <li v-for="(item, i) in trail" :key="i" class="bc__item">
        <NuxtLink v-if="item.to && i < trail.length - 1" class="bc__link" :to="item.to">
          {{ item.label }}
        </NuxtLink>
        <span v-else class="bc__current" aria-current="page">{{ item.label }}</span>

        <span v-if="i < trail.length - 1" class="bc__sep" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.bc {
  font-family: var(--mk-ff-body);
}

.bc__list {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.bc__item {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
}

.bc__link {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--mk-body);
  text-decoration: none;
  transition: color 0.25s ease;
}

.bc__link:hover,
.bc__link:focus-visible {
  color: var(--mk-ink);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.bc__current {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--mk-ink);
}

.bc__sep {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--mk-line-strong);
}

@media (prefers-reduced-motion: reduce) {
  .bc__link {
    transition: none;
  }
}
</style>
