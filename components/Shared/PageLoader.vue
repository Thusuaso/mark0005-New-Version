<template>
  <!-- Ustte ince ilerleme cubugu: her sayfa gecisinde -->
  <NuxtLoadingIndicator color="linear-gradient(90deg, #1e58c4, #63b32e)" :height="3" :throttle="100" />

  <!-- Gecis uzun surerse ortada gorunen kart -->
  <Transition name="pl_fade">
    <div v-if="visible" class="pgl" role="status" aria-live="polite" :dir="isRtl ? 'rtl' : 'ltr'">
      <div class="pgl_card">
        <span class="pgl_spinner" aria-hidden="true"></span>
        <span class="pgl_text">{{ searching ? t.searching : t.loading }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { loading: string; searching: string }> = {
  en: { loading: "Loading…", searching: "Searching products…" },
  fr: { loading: "Chargement…", searching: "Recherche de produits…" },
  es: { loading: "Cargando…", searching: "Buscando productos…" },
  ru: { loading: "Загрузка…", searching: "Ищем товары…" },
  ar: { loading: "جارٍ التحميل…", searching: "جارٍ البحث عن المنتجات…" },
};

/* Kisa gecislerde kart yanip sonmesin diye gecikmeli gosteriyoruz */
const SHOW_DELAY = 350;
const MAX_VISIBLE = 20000;

const store = useStore();
const lang = (String(store.getLang) in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const visible = ref(false);
const searching = ref(false);

let showTimer: ReturnType<typeof setTimeout> | undefined;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;

function start(isSearch: boolean) {
  searching.value = isSearch;
  clearTimeout(showTimer);
  clearTimeout(safetyTimer);
  showTimer = setTimeout(() => (visible.value = true), SHOW_DELAY);
  safetyTimer = setTimeout(finish, MAX_VISIBLE);
}

function finish() {
  clearTimeout(showTimer);
  clearTimeout(safetyTimer);
  visible.value = false;
}

const nuxtApp = useNuxtApp();
const router = useRouter();

const removeBefore = router.beforeEach((to, from) => {
  if (to.path !== from.path) start(/\/search\//.test(to.path));
});
const removeError = router.onError(finish);
const offFinish = nuxtApp.hook("page:finish", finish);
const offError = nuxtApp.hook("vue:error", finish);
/* Ayni sayfaya geri donuste page:finish gelmeyebilir */
const removeAfter = router.afterEach((to, from, failure) => {
  if (failure || to.path === from.path) finish();
});

onBeforeUnmount(() => {
  finish();
  removeBefore();
  removeError();
  removeAfter();
  offFinish();
  offError();
});
</script>

<style scoped>
.pgl {
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(2px);
  pointer-events: none;
}

.pgl_card {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.3rem;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14);
}

.pgl_spinner {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(30, 88, 196, 0.18);
  border-top-color: #1e58c4;
  border-radius: 50%;
  animation: pgl_spin 0.7s linear infinite;
}

.pgl_text {
  color: #111827;
  font-size: 14.5px;
  font-weight: 600;
}

@keyframes pgl_spin {
  to {
    transform: rotate(360deg);
  }
}

.pl_fade-enter-active,
.pl_fade-leave-active {
  transition: opacity 0.2s ease;
}

.pl_fade-enter-from,
.pl_fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .pgl_spinner {
    animation-duration: 1.6s;
  }
}
</style>
