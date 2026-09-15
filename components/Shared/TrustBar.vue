<script setup lang="ts">
/**
 * components/Shared/TrustBar.vue
 *
 * mekmar.com'daki guven seridi. Ikonlar inline SVG — disa bagimlilik yok.
 * Sinif adlari "trustbar" onekiyle; Bootstrap ile cakismaz.
 *
 * Kullanim:
 *   <SharedTrustBar />
 *
 * Kendi listesini vermek istersen:
 *   <SharedTrustBar :items="[{ icon: 'truck', label: '...', color: '#...' }]" />
 */

import { useStore } from "~/store/index";

type IconName = "shield" | "package" | "headset" | "truck" | "factory";
type Item = { icon: IconName; label: string; color: string };
type Lang = "en" | "fr" | "es" | "ru" | "ar";

const props = defineProps<{
  /* Verilmezse metinler sitenin diline gore secilir */
  items?: Item[];
}>();

const ICONS: { icon: IconName; color: string }[] = [
  { icon: "factory", color: "#ea580c" },
  { icon: "shield", color: "#1f9d55" },
  { icon: "package", color: "#8b5cf6" },
  { icon: "headset", color: "#0d9488" },
  { icon: "truck", color: "#2563eb" },
];

const labels: Record<Lang, { aria: string; items: string[] }> = {
  en: {
    aria: "Why work with us",
    items: [
      "Direct from our factories",
      "Quality control at every stage",
      "Samples by DHL express",
      "Dedicated sales specialist",
      "Worldwide shipping",
    ],
  },
  fr: {
    aria: "Pourquoi travailler avec nous",
    items: [
      "Direct de nos usines",
      "Contrôle qualité à chaque étape",
      "Échantillons par DHL express",
      "Un conseiller commercial dédié",
      "Livraison dans le monde entier",
    ],
  },
  es: {
    aria: "Por qué trabajar con nosotros",
    items: [
      "Directo de nuestras fábricas",
      "Control de calidad en cada etapa",
      "Muestras por DHL express",
      "Especialista de ventas dedicado",
      "Envíos a todo el mundo",
    ],
  },
  ru: {
    aria: "Почему выбирают нас",
    items: [
      "Напрямую с наших заводов",
      "Контроль качества на каждом этапе",
      "Образцы экспресс-почтой DHL",
      "Персональный менеджер",
      "Доставка по всему миру",
    ],
  },
  ar: {
    aria: "لماذا تعمل معنا",
    items: [
      "مباشرة من مصانعنا",
      "فحص الجودة في كل مرحلة",
      "عينات عبر DHL السريع",
      "أخصائي مبيعات مخصص لك",
      "شحن إلى جميع أنحاء العالم",
    ],
  },
};

const store = useStore();
const lang = (String(store.getLang) in labels ? store.getLang : "en") as Lang;
const L = labels[lang];
const itemList: Item[] = props.items ?? ICONS.map((x, i) => ({ ...x, label: L.items[i] }));
</script>

<template>
  <section class="trustbar" :aria-label="L.aria" :dir="lang === 'ar' ? 'rtl' : undefined">
    <ul class="trustbar__list">
      <li v-for="item in itemList" :key="item.label" class="trustbar__item">
        <span
          class="trustbar__icon"
          :style="{ color: item.color }"
          aria-hidden="true"
        >
          <!-- Kalkan -->
          <svg
            v-if="item.icon === 'shield'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          </svg>

          <!-- Paket -->
          <svg
            v-else-if="item.icon === 'package'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
            <path d="M3 8l9 5 9-5" />
            <path d="M12 13v8" />
            <path d="m7.5 5.5 9 5" />
          </svg>

          <!-- Kulaklik -->
          <svg
            v-else-if="item.icon === 'headset'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
            <rect x="2" y="14" width="4" height="6" rx="1.5" />
            <rect x="18" y="14" width="4" height="6" rx="1.5" />
          </svg>

          <!-- Kamyon -->
          <svg
            v-else-if="item.icon === 'truck'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 6h12v10H1z" />
            <path d="M13 9h4l4 4v3h-8z" />
            <circle cx="6" cy="18.5" r="1.75" />
            <circle cx="17.5" cy="18.5" r="1.75" />
          </svg>

          <!-- Fabrika -->
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 20V9l6 4V9l6 4V4h6v16z" />
          </svg>
        </span>

        <span class="trustbar__label">{{ item.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.trustbar {
  --tb-ink: #22201d;
  --tb-line: #e6e1da;

  padding: 0.875rem 1rem;
  border-top: 1px solid var(--tb-line);
  border-bottom: 1px solid var(--tb-line);
  background: #fff;
  margin-bottom: 2rem;
}

.trustbar__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem 2rem;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.trustbar__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.trustbar__icon {
  flex: none;
  display: inline-flex;
}

.trustbar__icon svg {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
}

.trustbar__label {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0;
  text-transform: none;
  color: var(--tb-ink);
  white-space: nowrap;
}

/* Dar ekranda iki sutuna dus, yatay kaydirma olmasin */
@media (max-width: 47.9375rem) {
  .trustbar__list {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    gap: 0.75rem 1.5rem;
  }

  .trustbar__label {
    font-size: 0.8125rem;
    white-space: normal;
  }
}
</style>
