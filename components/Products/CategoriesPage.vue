<script setup lang="ts">
/**
 * components/Products/CategoriesPage.vue
 *
 * Tum kategorilerin listelendigi sayfa (/products). Onceden boyle bir sayfa
 * yoktu: ust menudeki PRODUCTS yalnizca bir acilir menu tetikleyicisiydi ve
 * ana sayfadaki "View all products" butonu ilk kategoriye gidiyordu.
 *
 * Izgara ana sayfadaki Home/Categories.vue ile ayni dilde (cerceve yok,
 * kategori adi fotografin SOL ALT kosesinde, baslikta hover'da acilan
 * alt cizgi) ama burada bolum slogani degil sayfanin kendi basligi var.
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
            <!-- <img> DEGIL <NuxtImg>: kategori fotograflari
                 public/image/categories altinda 180-642 KB ve bu
                 sayfada on iki tanesi birden var (~5 MB). Izgara dar
                 ekranda iki, genis ekranda uc kolon (bkz.
                 grid-template-columns), sizes bundan tureiyor.

                 Ayni degisiklik ana sayfadaki kategori izgarasinda
                 zaten yapilmisti (Home/Categories.vue); burasi
                 atlanmisti. -->
            <NuxtImg
              class="card__img"
              :src="category.image"
              :alt="category.name"
              sizes="xs:50vw sm:50vw md:33vw lg:33vw xl:400px xxl:400px"
              :loading="i < 3 ? 'eager' : 'lazy'"
              decoding="async"
            />

            <!-- KATEGORI ADI KADRAJIN ICINDE, SOL ALTTA.
                 Ana sayfadaki iki izgarayla ayni dil (bkz.
                 Home/Categories.vue ve Home/BestSellers.vue). Ad artik
                 .card'in degil .card__frame'in cocugu: kadrajin icinde
                 mutlak konumlanabilmesi icin gerekli.

                 Perde (gradient) adin kendi zemini: kategori
                 fotograflarinin bir kismi cok acik (beyaz mermer, acik
                 traverten, mozaik panosu) ve ciplak beyaz yazi orada
                 kayboluyor. -->
            <div class="card__row">
              <h2 class="card__name"><span class="card__line">{{ category.name }}</span></h2>
            </div>
          </div>
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

/* position: relative — ad artik kadrajin ICINDE, mutlak konumlu. */
.card__frame {
  position: relative;
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

/* --- Ad: kadrajin sol alt kosesi ---
   ONCESI: kare + ALTINDA baslik (padding-top: 1rem).

   `inset-inline-start` / `text-align: start` kullaniliyor, `left`
   degil: sayfa Arapca'da dir="rtl" aliyor ve ad o zaman kendiliginden
   sag alta geciyor.

   Ust dolgu bilerek buyuk: perdenin fotografa sinmesi icin gereken
   mesafe o, yoksa kadrajin uzerinde kesik bir cizgi olusuyor. */
.card__row {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: clamp(2.5rem, 6vw, 4rem) clamp(0.875rem, 1.8vw, 1.375rem)
    clamp(0.625rem, 1.4vw, 1.0625rem);
  background: linear-gradient(
    to top,
    rgb(12 12 12 / 72%) 0%,
    rgb(12 12 12 / 46%) 38%,
    rgb(12 12 12 / 0%) 100%
  );
  text-align: start;
  pointer-events: none;
}

/* text-shadow soluk fotograflar icin ikinci guvence: perde tek basina
   acik traverten uzerinde sinirda kaliyordu. */
.card__name {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: var(--mk-ff-display);
  font-size: clamp(0.875rem, 1.4vw, 1.125rem);
  font-weight: 500;
  line-height: 1.3;
  color: #fff;
  text-shadow: 0 1px 3px rgb(0 0 0 / 45%);
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
