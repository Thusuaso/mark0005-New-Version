<script setup lang="ts">
/**
 * HowItWorks.vue — kompakt surum
 *
 * mekmar.com Shopify temasindaki "How It Works" bolumunun Nuxt 3 karsiligi.
 * Disa bagimlilik yok.
 *
 * Yuksekligi tek noktadan ayarlamak icin .hiw uzerindeki --hiw-pad
 * degiskenini degistir.
 */

import { onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "~/store/index";

type Stat = { value: number; suffix: string; label: string };
type Step = { title: string; summary: string };
type Lang = "en" | "fr" | "es" | "ru" | "ar";

const props = withDefaults(
  defineProps<{
    /* Verilmezse metinler sitenin diline gore secilir */
    heading?: string;
    stats?: Stat[];
    steps?: Step[];
    /** Otomatik gecis araligi (ms). 0 verirsen otomatik gecis kapanir. */
    interval?: number;
  }>(),
  { interval: 5000 },
);

/* Sayilar tum dillerde ayni */
const STAT_VALUES = [
  { value: 4046, suffix: "+" },
  { value: 71174, suffix: "+" },
  { value: 972, suffix: "+" },
  { value: 2, suffix: "M+" },
];

const texts: Record<Lang, { heading: string; stats: string[]; steps: Step[]; rail: string }> = {
  en: {
    heading: "Direct from Turkey. Delivered worldwide.",
    stats: ["Containers shipped", "Pallets delivered", "Samples sent", "Square metres produced"],
    steps: [
      { title: "Plan & mix products", summary: "Multiple SKUs in one container" },
      { title: "Request samples", summary: "Fast DHL air express" },
      { title: "Approve production", summary: "Documented at every stage" },
      { title: "Ocean freight", summary: "Quality-checked and sealed" },
      { title: "Delivery", summary: "Delivered to your door" },
    ],
    rail: "Ordering process",
  },
  fr: {
    heading: "Directement de Turquie. Livré dans le monde entier.",
    stats: ["Conteneurs expédiés", "Palettes livrées", "Échantillons envoyés", "Mètres carrés produits"],
    steps: [
      { title: "Planifiez vos produits", summary: "Plusieurs références dans un conteneur" },
      { title: "Demandez des échantillons", summary: "Envoi express par DHL" },
      { title: "Validez la production", summary: "Documentée à chaque étape" },
      { title: "Fret maritime", summary: "Contrôlé et scellé" },
      { title: "Livraison", summary: "Livré à votre porte" },
    ],
    rail: "Processus de commande",
  },
  es: {
    heading: "Directo desde Turquía. Entregado en todo el mundo.",
    stats: ["Contenedores enviados", "Palés entregados", "Muestras enviadas", "Metros cuadrados producidos"],
    steps: [
      { title: "Planifique sus productos", summary: "Varias referencias en un contenedor" },
      { title: "Solicite muestras", summary: "Envío urgente por DHL" },
      { title: "Apruebe la producción", summary: "Documentada en cada etapa" },
      { title: "Flete marítimo", summary: "Revisado y precintado" },
      { title: "Entrega", summary: "Entregado en su puerta" },
    ],
    rail: "Proceso de pedido",
  },
  ru: {
    heading: "Напрямую из Турции. Доставка по всему миру.",
    stats: ["Контейнеров отправлено", "Паллет доставлено", "Образцов отправлено", "Квадратных метров произведено"],
    steps: [
      { title: "Подбор продукции", summary: "Несколько позиций в одном контейнере" },
      { title: "Запрос образцов", summary: "Экспресс-доставка DHL" },
      { title: "Утверждение производства", summary: "Фотоотчёт на каждом этапе" },
      { title: "Морская перевозка", summary: "Проверено и опломбировано" },
      { title: "Доставка", summary: "Прямо до вашего адреса" },
    ],
    rail: "Процесс заказа",
  },
  ar: {
    heading: "مباشرة من تركيا. نوصل إلى جميع أنحاء العالم.",
    stats: ["حاوية تم شحنها", "منصة تم تسليمها", "عينة تم إرسالها", "متر مربع تم إنتاجه"],
    steps: [
      { title: "خطط منتجاتك", summary: "عدة منتجات في حاوية واحدة" },
      { title: "اطلب العينات", summary: "شحن سريع عبر DHL" },
      { title: "اعتمد الإنتاج", summary: "موثق في كل مرحلة" },
      { title: "الشحن البحري", summary: "مفحوص ومختوم" },
      { title: "التسليم", summary: "حتى باب منزلك" },
    ],
    rail: "مراحل الطلب",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? store.getLang : "en") as Lang;
const T = texts[lang];

const headingText = props.heading ?? T.heading;
const statList: Stat[] = props.stats ?? STAT_VALUES.map((s, i) => ({ ...s, label: T.stats[i] }));
const stepList: Step[] = props.steps ?? T.steps;
const railLabel = T.rail;

const active = ref(0);
const paused = ref(false);
const revealed = ref(false);
const root = ref<HTMLElement | null>(null);

let timer: ReturnType<typeof setInterval> | undefined;
let observer: IntersectionObserver | undefined;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function select(index: number) {
  active.value = index;
  paused.value = true;
  stopTimer();
}

function onKeydown(event: KeyboardEvent) {
  const last = stepList.length - 1;
  let next: number | null = null;

  if (event.key === "ArrowRight" || event.key === "ArrowDown")
    next = active.value === last ? 0 : active.value + 1;
  if (event.key === "ArrowLeft" || event.key === "ArrowUp")
    next = active.value === 0 ? last : active.value - 1;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = last;

  if (next !== null) {
    event.preventDefault();
    select(next);
    const tabs = root.value?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs?.[next]?.focus();
  }
}

function startTimer() {
  if (!props.interval || paused.value || reducedMotion()) return;
  stopTimer();
  timer = setInterval(() => {
    active.value = (active.value + 1) % stepList.length;
  }, props.interval);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
  }
}

const counters = ref<number[]>(statList.map(() => 0));

function runCounters() {
  if (reducedMotion()) {
    counters.value = statList.map((s) => s.value);
    return;
  }
  const duration = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counters.value = statList.map((s) => Math.round(s.value * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

onMounted(() => {
  if (!root.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !revealed.value) {
          revealed.value = true;
          runCounters();
          startTimer();
          observer?.disconnect();
        }
      }
    },
    { threshold: 0.2 },
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  stopTimer();
  observer?.disconnect();
});

const formatted = (index: number) =>
  counters.value[index]?.toLocaleString("en-US") ?? "0";
</script>

<template>
  <section ref="root" class="hiw" aria-labelledby="hiw-heading" :dir="lang === 'ar' ? 'rtl' : undefined">
    <div class="hiw__inner">
      <!-- Baslik + istatistikler yan yana -->
      <div class="hiw__top">
        <h2 id="hiw-heading" class="hiw__heading">{{ headingText }}</h2>

        <dl class="hiw__stats">
          <div v-for="(stat, i) in statList" :key="stat.label" class="hiw__stat">
            <dt class="hiw__stat-value">{{ formatted(i) }}{{ stat.suffix }}</dt>
            <dd class="hiw__stat-label">{{ stat.label }}</dd>
          </div>
        </dl>
      </div>

      <!-- Adimlar -->
      <div
        class="hiw__rail"
        role="tablist"
        :aria-label="railLabel"
        @keydown="onKeydown"
        @mouseenter="stopTimer"
        @mouseleave="startTimer"
      >
        <button
          v-for="(step, i) in stepList"
          :id="`hiw-tab-${i}`"
          :key="step.title"
          class="hiw__step"
          :class="{ 'is-active': i === active }"
          role="tab"
          type="button"
          :aria-selected="i === active"
          :tabindex="i === active ? 0 : -1"
          @click="select(i)"
        >
          <span class="hiw__marker" aria-hidden="true">{{
            String(i + 1).padStart(2, "0")
          }}</span>
          <span class="hiw__step-text">
            <span class="hiw__step-title">{{ step.title }}</span>
            <span class="hiw__step-summary">{{ step.summary }}</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hiw {
  /* Yuksekligi buradan ayarla */
  --hiw-pad: clamp(1.5rem, 3vw, 2.5rem);

  --hiw-ink: #22201d;
  --hiw-muted: #6f6a63;
  --hiw-line: #ddd7cf;
  --hiw-surface: #faf8f5;
  --hiw-accent: #7d6a4f;
  --hiw-accent-soft: #efe9df;
  margin-bottom: 2rem;
  padding: var(--hiw-pad) 1.25rem;
  background: var(--hiw-surface);
  color: var(--hiw-ink);
}

.hiw__inner {
  max-width: 72rem;
  margin-inline: auto;
}

/* --- Ust satir --- */
.hiw__top {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.hiw__heading {
  margin: 0;
  font-family: inherit;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
  text-transform: none;
  color: var(--hiw-ink);
}

.hiw__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem 0.5rem;
  margin: 0;
}

.hiw__stat {
  text-align: center;
}

.hiw__stat-value {
  font-size: clamp(1rem, 2vw, 1.375rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  line-height: 1.15;
}

.hiw__stat-label {
  margin: 0.125rem 0 0;
  font-size: 0.6875rem;
  line-height: 1.3;
  color: var(--hiw-muted);
}

/* --- Adim rayi --- */
.hiw__rail {
  display: grid;
  gap: 0.5rem;
}

.hiw__step {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  text-align: start;
  background: transparent;
  border: 1px solid var(--hiw-line);
  border-radius: 2px;
  cursor: pointer;
  color: inherit;
  font: inherit;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.hiw__step:hover {
  border-color: var(--hiw-accent);
}

.hiw__step:focus-visible {
  outline: 2px solid var(--hiw-accent);
  outline-offset: 2px;
}

.hiw__step.is-active {
  background: var(--hiw-accent-soft);
  border-color: var(--hiw-accent);
}

.hiw__marker {
  flex: none;
  font-size: 0.75rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--hiw-muted);
}

.hiw__step.is-active .hiw__marker {
  color: var(--hiw-accent);
}

.hiw__step-text {
  display: block;
  min-width: 0;
}

.hiw__step-title {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.25;
}

.hiw__step-summary {
  display: block;
  font-size: 0.6875rem;
  color: var(--hiw-muted);
  line-height: 1.3;
}

/* --- Genis ekran --- */
@media (min-width: 62rem) {
  .hiw__top {
    grid-template-columns: minmax(0, 18rem) 1fr;
    align-items: center;
    gap: 2rem;
  }

  .hiw__stat {
    text-align: start;
  }

  .hiw__rail {
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    border: 1px solid var(--hiw-line);
    border-radius: 2px;
  }

  .hiw__step {
    border: 0;
    border-inline-end: 1px solid var(--hiw-line);
    border-radius: 0;
  }

  .hiw__step:last-child {
    border-inline-end: 0;
  }

  .hiw__step.is-active {
    box-shadow: inset 0 2px 0 var(--hiw-accent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hiw__step {
    transition: none;
  }
}
</style>
