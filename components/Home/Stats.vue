<script setup lang="ts">
/**
 * components/Home/Stats.vue
 *
 * Temadaki "Fun Facts" bolumunun karsiligi: dort kart, beyaz ve koyu
 * (--mk-ink) donusumlu, her birinde gorus alanina girince sayan iri bir
 * sayi.
 *
 * Sayilar eski Shared/HowItWorks.vue'daki degerlerle ayni (konteyner,
 * palet, numune, m²) — o bolum ana sayfadan cikti, veriler buraya tasindi.
 * Etiketler her dilde burada.
 *
 * Sayac purecounter gibi bir eklenti yerine elle: tek requestAnimationFrame
 * dongusu, dis bagimlilik yok. prefers-reduced-motion acikken dogrudan
 * son degere atliyor.
 */

import { onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

/* Degerler tum dillerde ayni; yalnizca etiketler ceviriliyor. */
const VALUES = [
  { value: 4250, suffix: "+" },
  { value: 75000, suffix: "+" },
  { value: 3000, suffix: "+" },
  { value: 2, suffix: "M+" },
];

const texts: Record<Lang, { eyebrow: string; labels: string[] }> = {
  en: {
    eyebrow: "By the numbers",
    labels: [
      "Containers shipped",
      "Pallets delivered",
      "Samples sent",
      "Square metres produced",
    ],
  },
  fr: {
    eyebrow: "En chiffres",
    labels: [
      "Conteneurs expédiés",
      "Palettes livrées",
      "Échantillons envoyés",
      "Mètres carrés produits",
    ],
  },
  es: {
    eyebrow: "En cifras",
    labels: [
      "Contenedores enviados",
      "Palés entregados",
      "Muestras enviadas",
      "Metros cuadrados producidos",
    ],
  },
  ru: {
    eyebrow: "В цифрах",
    labels: [
      "Контейнеров отправлено",
      "Паллет доставлено",
      "Образцов отправлено",
      "Квадратных метров произведено",
    ],
  },
  ar: {
    eyebrow: "بالأرقام",
    labels: [
      "حاوية تم شحنها",
      "منصة تم تسليمها",
      "عينة تم إرسالها",
      "متر مربع تم إنتاجه",
    ],
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const root = ref<HTMLElement | null>(null);
const counters = ref<number[]>(VALUES.map(() => 0));
let observer: IntersectionObserver | undefined;
let frame: number | undefined;

function run() {
  const duration = 1400;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    /* easeOutCubic: hizli baslayip yavaslayarak son degere oturuyor. */
    const eased = 1 - Math.pow(1 - progress, 3);
    counters.value = VALUES.map((v) => Math.round(v.value * eased));
    if (progress < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
}

onMounted(() => {
  if (!root.value) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    counters.value = VALUES.map((v) => v.value);
    return;
  }

  /* threshold 0.3 yerine 0 + alttan %10 pay: bolume kaydirilarak degil
     SICRANARAK gelindiginde (kaydirma konumu geri yuklendi, bir cipaya
     atlandi, uzun sayfada hizli atlama) gozlemcinin tek olcumu bolumun
     %30'unu gormeyebiliyor ve sayaclar kalici olarak 0'da kaliyordu. */
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run();
        } else if (entry.boundingClientRect.bottom < 0) {
          /* Sayfa zaten bolumun altinda acildi: animasyon kacirildi,
             dogrudan son degere otur. */
          counters.value = VALUES.map((v) => v.value);
        } else {
          continue;
        }
        observer?.disconnect();
        observer = undefined;
        return;
      }
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (frame) cancelAnimationFrame(frame);
});

/* Binlik ayirici her dilde okunur olsun diye sabit en-US biciminde. */
const fmt = (i: number) => (counters.value[i] ?? 0).toLocaleString("en-US");
</script>

<template>
  <section
    ref="root"
    class="st"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="st-eyebrow"
  >
    <div class="st__inner">
      <p id="st-eyebrow" class="st__eyebrow">{{ t.eyebrow }}</p>

      <dl class="st__grid">
        <div
          v-for="(v, i) of VALUES"
          :key="t.labels[i]"
          class="stat"
          :class="{ 'stat--dark': i % 2 === 1 }"
        >
          <dt class="stat__value">
            <!-- Sayan deger; okuyucuya son hali bir kez verilsin diye
                 canli bolge degil. -->
            <span>{{ fmt(i) }}{{ v.suffix }}</span>
          </dt>
          <dd class="stat__label">{{ t.labels[i] }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.st {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
}

.st__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

.st__eyebrow {
  margin: 0 0 clamp(1.75rem, 5vw, 3.75rem);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--mk-ink);
}

.st__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.75rem, 2vw, 1.25rem);
  margin: 0;
}

@media (min-width: 62rem) {
  .st__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* --- Kart --- */
.stat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  padding: clamp(1.25rem, 3vw, 2rem);
  min-height: clamp(9rem, 18vw, 13rem);
  border: 1px solid var(--mk-border);
  background: var(--mk-cream);
  color: var(--mk-ink);
}

/* Temada 2. ve 4. kart koyu. */
.stat--dark {
  border-color: var(--mk-ink);
  background: var(--mk-ink);
  color: var(--mk-cream);
}

.stat__value {
  font-family: var(--mk-ff-display);
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.03em;
  /* Sayarken genislik oynamasin. */
  font-variant-numeric: tabular-nums;
}

.stat__label {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: inherit;
  opacity: 0.7;
}
</style>
