<script setup lang="ts">
/**
 * components/Home/About.vue
 *
 * Temadaki about bolumunun karsiligi: solda fotograf, sagda iri giris
 * cumlesi + govde metni + CTA, altinda "Our mission / Our vision"
 * sekmeleri.
 *
 * Icerik store'daki `about` verisinden: header, title_1 (OUR MISSION),
 * title_2 (OUR VISION) ve items_1 / items_2 listeleri. Yani sekmelerin
 * basliklari ve maddeleri her dilde hazir, burada ayri metin tanimlanmiyor —
 * tanimlananlar yalnizca temanin kendi kalip cumleleri (etiket + CTA).
 *
 * Sekme gecisi PrimeVue Tabs ile degil elle: PrimeVue'nun tema CSS'i bu
 * minimal gorunumle catisiyor ve iki sekme icin tam bir bilesen agirligi
 * tasimanin anlami yok.
 */

import { computed, ref } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

type Item = { id: number | string; value: string };

const texts: Record<Lang, { lede: string; cta: string }> = {
  en: {
    lede: "Quarry-to-door natural stone for builders and brands. Turning raw blocks into finished, fitted surfaces.",
    cta: "More about us",
  },
  fr: {
    lede: "Pierre naturelle de la carrière à votre porte, pour constructeurs et marques. Du bloc brut à la surface finie et posée.",
    cta: "En savoir plus",
  },
  es: {
    lede: "Piedra natural desde la cantera hasta su puerta, para constructores y marcas. Del bloque bruto a la superficie acabada.",
    cta: "Más sobre nosotros",
  },
  ru: {
    lede: "Натуральный камень от карьера до объекта — для застройщиков и брендов. От сырого блока до готовой поверхности.",
    cta: "Подробнее о нас",
  },
  ar: {
    lede: "حجر طبيعي من المحجر إلى بابك، للمقاولين والعلامات. من الكتلة الخام إلى السطح الجاهز.",
    cta: "المزيد عنا",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const about = computed(
  () =>
    (store.getAbout as {
      header?: string;
      title_1?: string;
      title_2?: string;
      items_1?: Item[];
      items_2?: Item[];
    }) ?? {},
);

const links = store.getNavbarLinks as Record<string, string>;

/* Sekmeler: veride olanlardan kuruluyor, biri eksikse sessizce dusuyor. */
const tabs = computed(() =>
  [
    { title: about.value.title_1, items: about.value.items_1 },
    { title: about.value.title_2, items: about.value.items_2 },
  ].filter((tab) => tab.title && tab.items?.length),
);

const activeTab = ref(0);

/* Bolum gorseli: ocak fotograflarindan biri.
   `slides` verisi KULLANILMIYOR — slide1/slide2 fotograflari 300x230 px
   (eski kucuk carousel'in thumbnail'lari) ve bu boyutta pikselleniyorlar.
   fabrication fotograflari 1545x1240; ikinci grup ("ocaklar") bu bolume
   icerik olarak da daha uygun. Grup yoksa ilk gruba dusuyor. */
const image = computed(() => {
  const fab = store.getFabrication as
    | { items?: { images?: { image: string }[] }[] }
    | undefined;
  const items = fab?.items ?? [];
  return items[1]?.images?.[0]?.image ?? items[0]?.images?.[0]?.image ?? "";
});

const { el, shown } = useReveal();
</script>

<template>
  <section
    ref="el"
    class="ab"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="ab-eyebrow"
  >
    <div class="ab__inner">
      <p id="ab-eyebrow" class="ab__eyebrow">
        {{ about.header || "About us" }}
      </p>

      <div class="ab__grid">
        <figure v-if="image" class="ab__figure">
          <img
            class="ab__img"
            :src="image"
            :alt="about.header || 'Mekmar'"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div class="ab__body">
          <p class="ab__lede">{{ t.lede }}</p>

          <div class="ab__action">
            <UiBtn :label="t.cta" :to="links.about ?? '/about'" variant="black" />
          </div>

          <!-- Mission / Vision sekmeleri -->
          <div v-if="tabs.length" class="ab__tabs">
            <div class="ab__tablist" role="tablist" aria-label="Mission & vision">
              <button
                v-for="(tab, i) of tabs"
                :id="`ab-tab-${i}`"
                :key="tab.title"
                class="ab__tab"
                :class="{ 'is-active': activeTab === i }"
                type="button"
                role="tab"
                :aria-selected="activeTab === i"
                :aria-controls="`ab-panel-${i}`"
                :tabindex="activeTab === i ? 0 : -1"
                @click="activeTab = i"
              >
                {{ tab.title }}
              </button>
            </div>

            <div
              v-for="(tab, i) of tabs"
              v-show="activeTab === i"
              :id="`ab-panel-${i}`"
              :key="`panel-${tab.title}`"
              class="ab__panel"
              role="tabpanel"
              :aria-labelledby="`ab-tab-${i}`"
            >
              <ul class="ab__list">
                <li v-for="item of tab.items" :key="item.id" class="ab__li">
                  {{ item.value }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ab {
  font-family: var(--mk-ff-body);
  /* Temada bu bolumun zemini #f5f5f5; kenardan kenara seriliyor. */
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
  color: var(--mk-body);
}

.ab__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

.ab__eyebrow {
  margin: 0 0 clamp(1.5rem, 4vw, 2.5rem);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--mk-ink);
}

.ab__grid {
  display: grid;
  gap: clamp(1.75rem, 5vw, 4rem);
  align-items: start;
}

@media (min-width: 62rem) {
  .ab__grid {
    /* Temadaki col-xl-4 + offset-xl-1 + col-xl-7 oranina yakin. */
    grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
  }
}

/* --- Fotograf --- */
.ab__figure {
  margin: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.8s var(--mk-ease),
    transform 0.8s var(--mk-ease);
}

.ab.is-in .ab__figure {
  opacity: 1;
  transform: none;
}

.ab__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

/* --- Sag kolon --- */
.ab__body {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.8s 0.15s var(--mk-ease),
    transform 0.8s 0.15s var(--mk-ease);
}

.ab.is-in .ab__body {
  opacity: 1;
  transform: none;
}

/* Temadaki iri giris cumlesi. */
.ab__lede {
  margin: 0 0 clamp(1.5rem, 3vw, 2.25rem);
  font-family: var(--mk-ff-display);
  font-size: clamp(1.25rem, 2.6vw, 2.125rem);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--mk-ink);
  text-wrap: balance;
}

.ab__action {
  margin-bottom: clamp(2rem, 5vw, 3.125rem);
}

/* --- Sekmeler --- */
.ab__tablist {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 3vw, 2.5rem);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--mk-border);
}

.ab__tab {
  position: relative;
  padding: 0 0 0.875rem;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--mk-grey-2);
  background: none;
  border: 0;
  cursor: pointer;
  transition: color 0.25s ease;
}

.ab__tab::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: -1px;
  height: 2px;
  background: var(--mk-ink);
  transform: scaleX(0);
  transform-origin: inline-start;
  transition: transform 0.3s var(--mk-ease);
}

.ab__tab:hover {
  color: var(--mk-ink);
}

.ab__tab.is-active {
  color: var(--mk-ink);
}

.ab__tab.is-active::after {
  transform: scaleX(1);
}

.ab__tab:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 3px;
}

/* --- Maddeler --- */
.ab__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.875rem;
}

.ab__li {
  position: relative;
  padding-inline-start: 1.5rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--mk-body);
}

/* Madde isareti: temanin cizgi dilinde kisa bir tire. */
.ab__li::before {
  content: "";
  position: absolute;
  top: 0.8125rem;
  inset-inline-start: 0;
  width: 0.75rem;
  height: 1px;
  background: var(--mk-accent);
}

@media (prefers-reduced-motion: reduce) {
  .ab__figure,
  .ab__body,
  .ab__tab,
  .ab__tab::after {
    transition: none;
  }

  .ab__figure,
  .ab__body {
    opacity: 1;
    transform: none;
  }
}
</style>
