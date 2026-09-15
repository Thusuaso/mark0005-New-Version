<template>
  <div ref="root" class="site_search">
    <span v-if="loading" class="site_search_icon ss_spinner" aria-hidden="true"></span>
    <i v-else class="bi-search site_search_icon" aria-hidden="true"></i>
    <InputText
      v-model="term"
      :placeholder="placeholder"
      autocomplete="off"
      :aria-busy="loading"
      @focus="open = true"
      @keydown.enter.prevent="onEnter"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.esc="close"
    />

    <div v-if="showPanel" class="site_suggest" :dir="isRtl ? 'rtl' : 'ltr'" aria-live="polite">
      <!-- Aranirken iskelet satirlar -->
      <template v-if="loading && !products.length">
        <p class="site_suggest_group ss_status">
          <span class="ss_spinner ss_spinner--sm" aria-hidden="true"></span>{{ t.searching }}
        </p>
        <div v-for="n in 3" :key="n" class="ss_skeleton" aria-hidden="true">
          <span class="ss_skeleton_img"></span>
          <span class="ss_skeleton_line"></span>
        </div>
      </template>

      <template v-else-if="products.length">
        <p class="site_suggest_group">{{ groupLabel }}</p>
        <NuxtLink
          v-for="(product, index) in products"
          :key="product.id"
          class="site_suggest_item"
          :class="{ 'site_suggest_item--active': index === active, 'ss_dim': loading }"
          :to="product.link"
          @click="close"
        >
          <img :src="product.image" :alt="product.name" loading="lazy" />
          <span>{{ product.name }}</span>
        </NuxtLink>
      </template>

      <p v-else-if="searched" class="ss_empty">
        <i class="bi-search" aria-hidden="true"></i>{{ t.no_results }}
      </p>

      <button type="button" class="site_suggest_all" @click="goToSearch">
        <i class="bi-arrow-return-left" aria-hidden="true"></i>{{ t.see_all(term.trim()) }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "~/store/index";

type Suggestion = { id: number; name: string; image: string; link: string };

const props = defineProps<{ usa?: boolean }>();

const store = useStore();
const router = useRouter();

const placeholder = computed(() =>
  props.usa ? store.getUsaSearch.usa_search : store.getSearch
);
const searchLink = computed(() =>
  props.usa ? store.getUsaSearch.usa_search_link : store.getSearchLink
);
const emptyTarget = computed(() => (props.usa ? "/usa/stock" : "/"));
const groupLabel = computed(() => (store.getNavbar as Record<string, string>).product);

type Lang = "en" | "fr" | "es" | "ru" | "ar";
const texts: Record<Lang, { searching: string; no_results: string; see_all: (q: string) => string }> = {
  en: { searching: "Searching…", no_results: "No matching products", see_all: (q) => `See all results for “${q}”` },
  fr: { searching: "Recherche…", no_results: "Aucun produit trouvé", see_all: (q) => `Voir tous les résultats pour « ${q} »` },
  es: { searching: "Buscando…", no_results: "No se encontraron productos", see_all: (q) => `Ver todos los resultados de “${q}”` },
  ru: { searching: "Ищем…", no_results: "Товары не найдены", see_all: (q) => `Все результаты по запросу «${q}»` },
  ar: { searching: "جارٍ البحث…", no_results: "لا توجد منتجات مطابقة", see_all: (q) => `عرض كل النتائج لـ «${q}»` },
};
const lang = (String(store.getLang) in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const root = ref<HTMLElement | null>(null);
const term = ref("");
const products = ref<Suggestion[]>([]);
const active = ref(-1);
const open = ref(false);
const loading = ref(false);
/* Son yazilan terim icin istek tamamlandi mi (bos sonuc mesaji icin) */
const searched = ref(false);

const showPanel = computed(
  () => open.value && !props.usa && term.value.trim().length >= 2 && (loading.value || searched.value),
);

let timer: ReturnType<typeof setTimeout> | undefined;
/* Gec donen bir istek, daha yeni bir istegin sonucunu ezmesin */
let requestId = 0;

const fetchSuggestions = async (value: string) => {
  const id = ++requestId;
  try {
    const data = await $fetch<{ products: Suggestion[] }>("/api/search/suggest", {
      query: { q: value, lang: store.getLang },
    });
    if (id === requestId) {
      products.value = data.products;
      active.value = -1;
    }
  } catch {
    if (id === requestId) {
      products.value = [];
    }
  } finally {
    if (id === requestId) {
      loading.value = false;
      searched.value = true;
    }
  }
};

watch(term, (value) => {
  clearTimeout(timer);
  active.value = -1;
  searched.value = false;
  // USA aramasi ayri tablolardan besleniyor, oneri sadece urun aramasinda
  if (props.usa || value.trim().length < 2) {
    requestId++;
    products.value = [];
    loading.value = false;
    return;
  }
  open.value = true;
  loading.value = true;
  timer = setTimeout(() => fetchSuggestions(value.trim()), 250);
});

const close = () => {
  open.value = false;
  active.value = -1;
};

const goToSearch = () => {
  const value = term.value.trim();
  close();
  if (!value) {
    router.push(emptyTarget.value);
  } else {
    router.push(searchLink.value + value.replaceAll(" ", "_"));
  }
};

const onEnter = () => {
  const highlighted = products.value[active.value];
  if (highlighted) {
    close();
    router.push(highlighted.link);
  } else {
    goToSearch();
  }
};

/* -1 = hicbiri secili degil; bu durumda Enter tam arama sayfasina gider */
const move = (step: number) => {
  const count = products.value.length;
  if (!count) return;
  open.value = true;
  const next = active.value + step;
  active.value = next < -1 ? count - 1 : next >= count ? -1 : next;
};

const onDocumentClick = (event: MouseEvent) => {
  if (root.value && !root.value.contains(event.target as Node)) {
    close();
  }
};

onMounted(() => document.addEventListener("click", onDocumentClick));
onBeforeUnmount(() => {
  clearTimeout(timer);
  document.removeEventListener("click", onDocumentClick);
});
</script>
<style scoped>
/* Yukleniyor simgesi (arama ikonunun yerine) */
.ss_spinner {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(30, 88, 196, 0.2);
  border-top-color: #1e58c4;
  border-radius: 50%;
  animation: ss_spin 0.7s linear infinite;
}

.ss_spinner--sm {
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-inline-end: 0.4rem;
  vertical-align: -1px;
}

.ss_status {
  display: flex;
  align-items: center;
}

.ss_skeleton {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.625rem;
}

.ss_skeleton_img,
.ss_skeleton_line {
  border-radius: 6px;
  background: linear-gradient(90deg, #eef1f5 25%, #f7f9fb 50%, #eef1f5 75%);
  background-size: 200% 100%;
  animation: ss_shimmer 1.2s ease-in-out infinite;
}

.ss_skeleton_img {
  flex: none;
  width: 36px;
  height: 36px;
}

.ss_skeleton_line {
  flex: 1 1 auto;
  height: 10px;
}

.ss_skeleton:nth-child(3) .ss_skeleton_line {
  flex-basis: 70%;
  flex-grow: 0;
}

.ss_dim {
  opacity: 0.55;
}

.ss_empty {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  padding: 0.7rem 0.625rem;
  color: #6b7280;
  font-size: 12.5px;
}

.site_suggest_all {
  text-align: start;
}

@keyframes ss_spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ss_shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ss_spinner {
    animation-duration: 1.6s;
  }

  .ss_skeleton_img,
  .ss_skeleton_line {
    animation: none;
  }
}
</style>
