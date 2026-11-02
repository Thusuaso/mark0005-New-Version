<script setup lang="ts">
/**
 * components/Home/Facilities.vue
 *
 * Acilip kapanan animasyonlu bolum: fabrikalar / ocaklar / ABD deposu.
 * Veri store'daki `fabrication.items` — her dilde basliklari ve 4'erli foto
 * setleri hazir, ayri icerik girilmiyor.
 *
 * Gorunum temanin FAQ akordeonu dilinde: cerceve yok, yalnizca ince yatay
 * cizgiler, iri display baslik ve sagda donen + / − isareti.
 *
 * Acilma animasyonu `grid-template-rows: 0fr → 1fr` ile; sabit bir
 * max-height tahmin etmek gerekmiyor, icerik ne kadar uzun olursa olsun
 * gecis puruzsuz kaliyor.
 *
 * Fotolara tiklanirsa Fancybox'ta aciliyor (@fancyapps/ui). Fancybox CSS'i
 * SharedFancybox sarmalayicisindan geliyor, yani yalnizca bu bolum render
 * edildiginde yukleniyor.
 */

import { computed, ref } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

type Photo = { id: number | string; title: string; image: string };
type Group = { id: number | string; header: string; images: Photo[] };

const texts: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    line2: string;
    count: (n: number) => string;
  }
> = {
  en: {
    eyebrow: "Facilities",
    title: "Quarried, cut",
    line2: "and stocked",
    count: (n) => `${n} photos`,
  },
  fr: {
    eyebrow: "Sites",
    title: "Extraite, taillée",
    line2: "et stockée",
    count: (n) => `${n} photos`,
  },
  es: {
    eyebrow: "Instalaciones",
    title: "Extraída, cortada",
    line2: "y almacenada",
    count: (n) => `${n} fotos`,
  },
  ru: {
    eyebrow: "Производство",
    title: "Добыча, обработка",
    line2: "и склад",
    count: (n) => `${n} фото`,
  },
  ar: {
    eyebrow: "المنشآت",
    title: "يُستخرج ويُقطع",
    line2: "ويُخزّن",
    count: (n) => `${n} صور`,
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const groups = computed<Group[]>(() => {
  const fab = store.getFabrication as { items?: Group[] } | undefined;
  return (fab?.items ?? []).filter((g) => g?.images?.length);
});

/* Tek seferde tek panel acik (klasik akordeon). Ilk panel baslangicta acik,
   boylece bolum bos bir liste olarak degil dolu gorunuyor. */
const open = ref<number>(0);

function toggle(index: number) {
  /* Acik olana tekrar basinca kapaniyor. */
  open.value = open.value === index ? -1 : index;
}

const { el, shown } = useReveal();
</script>

<template>
  <section
    v-if="groups.length"
    ref="el"
    class="fc"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="fc-title"
  >
    <div class="fc__inner">
      <UiSectionHead
        class="fc__head"
        :eyebrow="t.eyebrow"
        :title="t.title"
        :line2="t.line2"
        size="xl"
        as="h2"
      />

      <!-- Fancybox tum [data-fancybox] elemanlarini kendisi bagliyor;
           sadece sarmalamak yeterli. -->
      <SharedFancybox>
        <div class="fc__list">
          <article
            v-for="(group, gi) of groups"
            :key="group.id"
            class="pn"
            :class="{ 'is-open': open === gi }"
            :style="{ '--i': gi }"
          >
            <h3 class="pn__h">
              <button
                :id="`fc-trigger-${gi}`"
                class="pn__trigger"
                type="button"
                :aria-expanded="open === gi"
                :aria-controls="`fc-panel-${gi}`"
                @click="toggle(gi)"
              >
                <span class="pn__num" aria-hidden="true">
                  {{ String(gi + 1).padStart(2, "0") }}
                </span>

                <span class="pn__titles">
                  <span class="pn__title">{{ group.header }}</span>
                  <span class="pn__count">{{ t.count(group.images.length) }}</span>
                </span>

                <!-- + / − : yatay cizgi sabit, dikey olan acilista kayboluyor -->
                <span class="pn__sign" aria-hidden="true">
                  <span class="pn__sign-h"></span>
                  <span class="pn__sign-v"></span>
                </span>
              </button>
            </h3>

            <!-- grid 0fr → 1fr: icerik yuksekligi bilinmeden puruzsuz gecis -->
            <div
              :id="`fc-panel-${gi}`"
              class="pn__wrap"
              role="region"
              :aria-labelledby="`fc-trigger-${gi}`"
            >
              <div class="pn__inner">
                <ul class="shots">
                  <li
                    v-for="photo of group.images"
                    :key="photo.id"
                    class="shots__item"
                  >
                    <a
                      class="shot"
                      :href="photo.image"
                      data-fancybox="facilities"
                      :data-caption="photo.title"
                    >
                      <img
                        class="shot__img"
                        :src="photo.image"
                        :alt="photo.title"
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="shot__cap">{{ photo.title }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </SharedFancybox>
    </div>
  </section>
</template>

<style scoped>
.fc {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream-2);
}

.fc__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

.fc__head {
  margin-bottom: clamp(2.5rem, 7vw, 5rem);
}

/* --- Akordeon --- */
.fc__list {
  border-top: 1px solid var(--mk-border);
}

.pn {
  border-bottom: 1px solid var(--mk-border);
  opacity: 0;
  transform: translateY(0.875rem);
  transition:
    opacity 0.6s var(--mk-ease),
    transform 0.6s var(--mk-ease);
  transition-delay: calc(var(--i) * 90ms);
}

.fc.is-in .pn {
  opacity: 1;
  transform: none;
}

.pn__h {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

.pn__trigger {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
  width: 100%;
  padding: clamp(1.25rem, 3vw, 2rem) 0;
  text-align: start;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--mk-ink);
  font: inherit;
}

.pn__trigger:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 2px;
}

.pn__num {
  flex: none;
  font-size: 0.75rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  color: var(--mk-grey-2);
}

.pn__titles {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 1rem;
}

.pn__title {
  font-family: var(--mk-ff-display);
  /* Basliklar veride ALL CAPS ("QUARRIES THAT WE WORK"). text-transform ile
     cumle duzenine cevirmek "USA" gibi kisaltmalari bozardi, bu yuzden caps
     birakiliyor — punto dusurulup harf araligi aciliyor ki bilincli
     gorunsun. */
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.02em;
}

.pn__count {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--mk-grey-2);
}

/* --- + / − isareti --- */
.pn__sign {
  position: relative;
  flex: none;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--mk-border);
  border-radius: 50%;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.pn__trigger:hover .pn__sign {
  border-color: var(--mk-ink);
}

.pn.is-open .pn__sign {
  background: var(--mk-ink);
  border-color: var(--mk-ink);
}

.pn__sign-h,
.pn__sign-v {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.75rem;
  height: 1px;
  background: var(--mk-ink);
  transform: translate(-50%, -50%);
  transition:
    transform 0.4s var(--mk-ease),
    opacity 0.3s ease,
    background-color 0.3s ease;
}

.pn__sign-v {
  transform: translate(-50%, -50%) rotate(90deg);
}

.pn.is-open .pn__sign-h,
.pn.is-open .pn__sign-v {
  background: var(--mk-cream);
}

/* Acikken dikey cizgi yatayla hizalanip kayboluyor: + → − */
.pn.is-open .pn__sign-v {
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 0;
}

/* --- Acilan govde --- */
.pn__wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s var(--mk-ease);
}

.pn.is-open .pn__wrap {
  grid-template-rows: 1fr;
}

.pn__inner {
  overflow: hidden;
  /* Kapaliyken icerik klavye/okuyucu sirasina girmesin. */
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.4s var(--mk-ease),
    visibility 0.4s;
}

.pn.is-open .pn__inner {
  visibility: visible;
  opacity: 1;
}

/* --- Foto seridi --- */
.shots {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.5rem, 1.5vw, 1.25rem);
  margin: 0;
  padding: 0 0 clamp(1.5rem, 3vw, 2.5rem);
  list-style: none;
}

@media (min-width: 48rem) {
  .shots {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.shot {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--mk-cream-2);
  text-decoration: none;
}

.shot__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.shot:hover .shot__img,
.shot:focus-visible .shot__img {
  transform: scale(1.06);
}

.shot:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 3px;
}

.shot__cap {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 2.5rem 0.75rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.35;
  color: var(--mk-cream);
  background: linear-gradient(to top, rgba(28, 25, 23, 0.75) 0%, transparent 100%);
}

@media (prefers-reduced-motion: reduce) {
  .pn,
  .pn__wrap,
  .pn__inner,
  .pn__sign,
  .pn__sign-h,
  .pn__sign-v,
  .shot__img {
    transition: none;
  }

  .pn {
    opacity: 1;
    transform: none;
  }

  .shot:hover .shot__img,
  .shot:focus-visible .shot__img {
    transform: none;
  }
}
</style>
