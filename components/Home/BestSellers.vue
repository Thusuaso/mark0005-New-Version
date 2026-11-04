<script setup lang="ts">
/**
 * components/Home/BestSellers.vue
 *
 * Kaydirilabilir urun seridi. Veri /api/products/bestsellers — urun id'leri
 * sunucuda elle secili, isim/gorsel veritabanindan geliyor.
 *
 * Serit PrimeVue Carousel ile: urun sayisi artabilir ve dar ekranda
 * kartlarin alt alta dizilmesi bolumu gereksiz uzatiyordu. Bir sonraki
 * kartin kenari gorundugu icin kaydirilabilir oldugu kendiliginden
 * anlasiliyor.
 *
 * Gorunum temanin kart dili: cerceve yok, gorsel + altinda baslik satiri,
 * baslikta hover'da acilan alt cizgi.
 *
 * useFetch SSR'da kosuyor; bolum Home/Page.vue'da hydrate-on-visible ile
 * tembel hidrate ediliyor, yani HTML hazir gelir ama JS gorunur olana
 * kadar beklemez.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { title: string; line2: string }> = {
  en: {
    title: "Best sellers",
    line2: "of 2026",
  },
  fr: {
    title: "Meilleures ventes",
    line2: "de 2026",
  },
  es: {
    title: "Más vendidos",
    line2: "de 2026",
  },
  ru: {
    title: "Хиты продаж",
    line2: "2026 года",
  },
  ar: {
    title: "الأكثر مبيعاً",
    line2: "لعام 2026",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const { data } = await useFetch<{ products: any[] }>(
  "/api/products/bestsellers",
  { query: { lang }, key: `bestsellers-${lang}` },
);

const products = computed<any[]>(() => data.value?.products ?? []);

/* Kirilim noktalari: genis ekranda 4, tablette 3, telefonda 2. Kaydirma
   adimi 1 birakildi ki bir sonraki kartin kenari her zaman gorunsun. */
const responsive = [
  { breakpoint: "1200px", numVisible: 4, numScroll: 1 },
  { breakpoint: "992px", numVisible: 3, numScroll: 1 },
  { breakpoint: "768px", numVisible: 2, numScroll: 1 },
  { breakpoint: "480px", numVisible: 2, numScroll: 1 },
];

const { el, shown } = useReveal();
</script>

<template>
  <section
    v-if="products.length"
    ref="el"
    class="bs"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="bs-title"
  >
    <div class="bs__inner">
      <UiSectionHead
        class="bs__head"
        :title="t.title"
        :line2="t.line2"
        size="xl"
        as="h2"
      />

      <Carousel
        class="bs__rail"
        :value="products"
        :numVisible="4"
        :numScroll="1"
        :responsiveOptions="responsive"
        :circular="true"
        :showIndicators="false"
        :showNavigators="true"
      >
        <template #item="{ data: product }">
          <NuxtLink class="pc" :to="product.link">
            <div class="pc__frame">
              <img
                class="pc__img"
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="pc__row">
              <h3 class="pc__name">
                <span class="pc__line">{{ product.name }}</span>
              </h3>
            </div>
          </NuxtLink>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
.bs {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
  opacity: 0;
  transition: opacity 0.7s var(--mk-ease);
}

.bs.is-in {
  opacity: 1;
}

.bs__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

.bs__head {
  margin-bottom: clamp(2.5rem, 7vw, 5rem);
}

/* --- Carousel kabugu --- */
/* PrimeVue'nun tema kutusunu sifirla: cerceve/dolgu bolume ait degil. */
.bs__rail :deep(.p-carousel-content-container),
.bs__rail :deep(.p-carousel-content),
.bs__rail :deep(.p-carousel-viewport) {
  background: transparent;
  border: 0;
  padding: 0;
}

/* Kartlar arasi bosluk: item-list'e gap vermek kart genisligini bozuyor,
   bu yuzden boslugu item'in ic dolgusundan veriyoruz. */
.bs__rail :deep(.p-carousel-item) {
  padding-inline: clamp(0.3125rem, 0.9vw, 0.9375rem);
}

/* Oklar: temanin pill butonundaki daire dili. */
.bs__rail :deep(.p-carousel-prev-button),
.bs__rail :deep(.p-carousel-next-button) {
  width: 2.75rem;
  height: 2.75rem;
  margin: 0;
  color: var(--mk-ink);
  background: var(--mk-cream);
  border: 1px solid var(--mk-border);
  border-radius: 50%;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.bs__rail :deep(.p-carousel-prev-button:hover),
.bs__rail :deep(.p-carousel-next-button:hover) {
  color: var(--mk-cream);
  background: var(--mk-ink);
  border-color: var(--mk-ink);
}

.bs__rail :deep(.p-carousel-prev-button:focus-visible),
.bs__rail :deep(.p-carousel-next-button:focus-visible) {
  outline: 2px solid var(--mk-ink);
  outline-offset: 2px;
}

/* --- Urun karti --- */
.pc {
  display: block;
  height: 100%;
  text-decoration: none;
  color: var(--mk-ink);
}

.pc__frame {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: var(--mk-cream);
}

.pc__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.pc:hover .pc__img,
.pc:focus-visible .pc__img {
  transform: scale(1.05);
}

.pc:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 4px;
}

.pc__row {
  padding-top: 1rem;
}

.pc__name {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-size: clamp(0.875rem, 1.4vw, 1.0625rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--mk-ink);
}

.pc__line {
  position: relative;
  display: inline-block;
}

.pc__line::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: inline-start;
  transition: transform 0.4s var(--mk-ease);
}

.pc:hover .pc__line::after,
.pc:focus-visible .pc__line::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .bs,
  .pc__img,
  .pc__line::after {
    transition: none;
  }

  .bs {
    opacity: 1;
  }

  .pc:hover .pc__img,
  .pc:focus-visible .pc__img {
    transform: none;
  }
}
</style>
