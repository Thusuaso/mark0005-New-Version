<script setup lang="ts">
/**
 * components/Home/Categories.vue
 *
 * Temadaki "service" bolumunun karsiligi: dev iki satirli baslik, altinda
 * kategori izgarasi. Veri store'daki `categories`
 * (assets/data/<lang>.json) — eski ana sayfadaki listeyle ayni.
 *
 * Kart gorunumu: cerceve yok, baslikta hover'da acilan alt cizgi. Kartlarin
 * 01/02/03 numaralari kaldirildi (bilgi tasimiyorlardi) ve alttaki
 * "View all products" butonu da kaldirildi — izgaranin kendisi zaten tum
 * kategorileri gosteriyor.
 *
 * Ilk uc gorsel eager (fold'a yakin olabiliyor), gerisi lazy. Bolumun
 * kendisi Home/Page.vue tarafindan hydrate-on-visible ile tembel hidrate
 * ediliyor.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<
  Lang,
  { title: string; line2: string }
> = {
  en: {
    title: "Sustained by Nature,",
    line2: "Crafted for Life",
  },
  fr: {
    title: "Soutenus par la nature,",
    line2: "façonnés pour la vie",
  },
  es: {
    title: "Sostenidos por la naturaleza,",
    line2: "creados para la vida",
  },
  ru: {
    title: "Рождено природой,",
    line2: "создано для жизни",
  },
  ar: {
    title: "مستمد من الطبيعة،",
    line2: "مصنوع للحياة",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const categories = computed<any[]>(() => (store.getCategories as any[]) ?? []);
const { el, shown } = useReveal();
</script>

<template>
  <section
    v-if="categories.length"
    ref="el"
    class="ct"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="ct-title"
  >
    <div class="ct__inner">
      <UiSectionHead
        class="ct__head"
        :title="t.title"
        :line2="t.line2"
        size="xl"
        as="h2"
      />

      <ul class="ct__grid">
        <li
          v-for="(category, i) of categories"
          :key="category.id"
          class="ct__cell"
          :style="{ '--i': i }"
        >
          <NuxtLink
            class="card"
            :to="category.link"
            target="_blank"
            rel="noopener"
          >
            <div class="card__frame">
              <img
                class="card__img"
                :src="category.image"
                :alt="category.name"
                :loading="i < 3 ? 'eager' : 'lazy'"
                decoding="async"
              />
            </div>

            <div class="card__row">
              <h3 class="card__name"><span class="card__line">{{ category.name }}</span></h3>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Zemin kenardan kenara; ic genislik diger bolumlerle ayni kalipta
   (bkz. Projects/Stats/Facilities) ki basliklar hizali olsun. */
.ct {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream-2);
}

.ct__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

/* Baslik --mk-title-xl (1920'de 144px) ile iki satira sigmiyor: bu bolumun
   basligi artik kisa bir tanim degil, bir slogan. Olculdugunde en uzun
   satir Ispanyolca "Sostenidos por la naturaleza," (29 karakter) ve 144px'te
   1300px yer istiyor — kaba 1200px. Punto bu cumleye gore kuculdu, boylece
   bes dilde de "Sustained by Nature," / "Crafted for Life" iki satirda
   kaliyor. */
.ct__head :deep(.head__title) {
  font-size: clamp(1.5rem, 4.6vw, 5rem);
}

.ct__head {
  margin-bottom: clamp(2.5rem, 7vw, 6rem);
}

/* --- Izgara --- */
.ct__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 1.875rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .ct__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* --- Kademeli giris --- */
.ct__cell {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.7s var(--mk-ease),
    transform 0.7s var(--mk-ease);
  /* 9'dan sonra sabitleniyor ki listenin sonu bekletmesin. */
  transition-delay: calc(min(var(--i), 9) * 70ms);
}

.ct.is-in .ct__cell {
  opacity: 1;
  transform: none;
}

/* --- Kart --- */
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
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.card:hover .card__img,
.card:focus-visible .card__img {
  transform: scale(1.05);
}

.card:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 4px;
}

.card__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
}

.card__name {
  margin: 0;
  /* Flex ogesinin varsayilan min-width:auto'su uzun kategori adlarinin
     kucuilmesini engelleyip yanindaki sira numarasini kartin disina
     itiyordu (320px'te sayfaya yatay kaydirma). */
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: var(--mk-ff-display);
  font-size: clamp(0.9375rem, 1.6vw, 1.25rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--mk-ink);
}

/* Temadaki .border-line: hover'da soldan saga acilan alt cizgi. */
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
  .ct__cell,
  .card__img,
  .card__line::after {
    transition: none;
  }

  .ct__cell {
    opacity: 1;
    transform: none;
  }

  .card:hover .card__img,
  .card:focus-visible .card__img {
    transform: none;
  }
}
</style>
