<script setup lang="ts">
/**
 * components/Products/CategoriesPage.vue
 *
 * Tum kategorilerin listelendigi sayfa (/products). Onceden boyle bir sayfa
 * yoktu: ust menudeki PRODUCTS yalnizca bir acilir menu tetikleyicisiydi ve
 * ana sayfadaki "View all products" butonu ilk kategoriye gidiyordu.
 *
 * Izgara ana sayfadaki Home/Categories.vue ile ayni dilde (cerceve yok,
 * baslikta hover'da acilan alt cizgi) ama burada bolum slogani degil
 * sayfanin kendi basligi var.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { lede: string }> = {
  en: { lede: "Every material we quarry, cut and ship — choose one to see the range." },
  fr: { lede: "Chaque matériau que nous extrayons, taillons et expédions — choisissez-en un pour voir la gamme." },
  es: { lede: "Cada material que extraemos, cortamos y enviamos: elija uno para ver la gama." },
  ru: { lede: "Все материалы, которые мы добываем, обрабатываем и отгружаем — выберите один, чтобы увидеть ассортимент." },
  ar: { lede: "كل مادة نستخرجها ونقطعها ونشحنها — اختر واحدة لعرض المجموعة." },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const navbar = (store.getNavbar as Record<string, string>) ?? {};
const title = computed(() => navbar.product || "Products");

const categories = computed<any[]>(() => (store.getCategories as any[]) ?? []);
const { el, shown } = useReveal();
</script>

<template>
  <div class="cl" :dir="isRtl ? 'rtl' : undefined">
    <SharedBreadcrumb class="cl__crumbs" :items="[{ label: title }]" />

    <header class="cl__head">
      <h1 class="cl__title">{{ title }}</h1>
      <p class="cl__lede">{{ t.lede }}</p>
    </header>

    <ul
      v-if="categories.length"
      ref="el"
      class="cl__grid"
      :class="{ 'is-in': shown }"
    >
      <li
        v-for="(category, i) of categories"
        :key="category.id"
        class="cl__cell"
        :style="{ '--i': i }"
      >
        <NuxtLink class="card" :to="category.link" target="_blank" rel="noopener">
          <div class="card__frame">
            <img
              class="card__img"
              :src="category.image"
              :alt="category.name"
              :loading="i < 3 ? 'eager' : 'lazy'"
              decoding="async"
            />
          </div>
          <h2 class="card__name"><span class="card__line">{{ category.name }}</span></h2>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cl {
  font-family: var(--mk-ff-body);
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.cl__crumbs {
  margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
}

.cl__head {
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.cl__title {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-size: var(--mk-title-md);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--mk-ink);
}

.cl__lede {
  margin: clamp(0.75rem, 1.5vw, 1.25rem) 0 0;
  max-width: 56ch;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--mk-body);
}

.cl__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 1.875rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .cl__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.cl__cell {
  opacity: 0;
  transform: translateY(1.25rem);
  transition:
    opacity 0.6s var(--mk-ease),
    transform 0.6s var(--mk-ease);
  transition-delay: calc(var(--i, 0) * 60ms);
}

.cl__grid.is-in .cl__cell {
  opacity: 1;
  transform: none;
}

.card {
  display: block;
  text-decoration: none;
  color: var(--mk-ink);
}

.card__frame {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--mk-cream-2);
}

.card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--mk-ease);
}

.card:hover .card__img,
.card:focus-visible .card__img {
  transform: scale(1.04);
}

.card:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 4px;
}

.card__name {
  margin: 0;
  padding-top: 1rem;
  font-family: var(--mk-ff-display);
  font-size: clamp(0.9375rem, 1.6vw, 1.25rem);
  font-weight: 500;
  line-height: 1.3;
  color: var(--mk-ink);
}

.card__line {
  position: relative;
  display: inline-block;
}

.card__line::after {
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

.card:hover .card__line::after,
.card:focus-visible .card__line::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .cl__cell,
  .card__img,
  .card__line::after {
    transition: none;
  }

  .cl__cell {
    opacity: 1;
    transform: none;
  }

  .card:hover .card__img {
    transform: none;
  }
}
</style>
