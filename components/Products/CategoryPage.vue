<script setup lang="ts">
/**
 * components/Products/CategoryPage.vue
 *
 * Kategori urun listesi + zincirlenebilir filtreler.
 *
 * Bes dilin kategori sayfasi da bunu kullaniyor; her sayfa yalnizca kendi
 * ceviri metinlerini `intro` slot'unda tasiyor. Onceden ingilizce sayfa
 * yenilenmis ama diger dort dil eski surumde kalmisti (uzun
 * `category_id == 1 || category_id == 2 || ...` zincirleri) — ortak bilesene
 * tasinarak o ayrisma da kapandi.
 *
 * --- Filtreleme ---
 * Filtreler URL sorgu dizesinde birikiyor:
 *   /product/marble/1?color=8&finish=polished
 * Boyutlar arasinda VE, boyut icinde VEYA. Bir filtreye basmak digerlerini
 * KORUYOR — eski surumde her filtre ayri bir sayfaya gidiyor ve oncekini
 * siliyordu, bu yuzden "marble + blue" secmek mumkun degildi.
 *
 * Hangi kategoride hangi boyutun gorunecegi utils/productFilters.ts icinde
 * (tek kaynak; sunucu da ayni dosyayi kullaniyor).
 *
 * Yanlardaki sayilar faceted: her sayi, o boyut haric diger filtreler
 * uygulandiginda kac urun kalacagini gosteriyor.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import control from "~/lang/control";
import {
  availableFilters,
  countFilters,
  readFilters,
  toQuery,
  toggleFilter,
  type FilterKey,
} from "~/utils/productFilters";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<
  Lang,
  {
    results: (n: number) => string;
    active: string;
    clear: string;
    empty: string;
    emptyHint: string;
    filters: string;
  }
> = {
  en: {
    results: (n) => `${n} ${n === 1 ? "product" : "products"}`,
    active: "Selected filters",
    clear: "Clear all",
    empty: "No products match these filters.",
    emptyHint: "Try removing one of the selected filters.",
    filters: "Filters",
  },
  fr: {
    results: (n) => `${n} ${n === 1 ? "produit" : "produits"}`,
    active: "Filtres sélectionnés",
    clear: "Tout effacer",
    empty: "Aucun produit ne correspond à ces filtres.",
    emptyHint: "Essayez de retirer un des filtres sélectionnés.",
    filters: "Filtres",
  },
  es: {
    results: (n) => `${n} ${n === 1 ? "producto" : "productos"}`,
    active: "Filtros seleccionados",
    clear: "Borrar todo",
    empty: "Ningún producto coincide con estos filtros.",
    emptyHint: "Pruebe a quitar uno de los filtros seleccionados.",
    filters: "Filtros",
  },
  ru: {
    results: (n) => `${n} ${n === 1 ? "товар" : "товаров"}`,
    active: "Выбранные фильтры",
    clear: "Очистить всё",
    empty: "Нет товаров, соответствующих этим фильтрам.",
    emptyHint: "Попробуйте снять один из выбранных фильтров.",
    filters: "Фильтры",
  },
  ar: {
    results: (n) => `${n} ${n === 1 ? "منتج" : "منتجات"}`,
    active: "الفلاتر المحددة",
    clear: "مسح الكل",
    empty: "لا توجد منتجات تطابق هذه الفلاتر.",
    emptyHint: "جرّب إزالة أحد الفلاتر المحددة.",
    filters: "الفلاتر",
  },
};

const route = useRoute();
const store = useStore();

const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = computed(() => lang === "ar");

const categoryId = computed(() => Number(route.params.id));

/* Grup basliklari dil dosyalarindan (filtered_header). */
const headers = computed(
  () => (store.getFilteredHeader as Record<string, string>) ?? {},
);

/* Secili filtreler URL'den okunuyor; kategoride gecerli olmayanlar
   ayikliyor (biri elle ?edge=3 yazsa bile marble'da edge yok). */
const active = computed(() => readFilters(route.query, categoryId.value));
const activeCount = computed(() => countFilters(active.value));

/* Veri sorgu dizesi degistikce yeniden cekiliyor. useAsyncData sunucuda
   cekileni istemciye tasiyor, ikinci istek atilmiyor. */
const { data, pending } = await useAsyncData(
  () => `category-filtered-${route.params.id}-${JSON.stringify(route.query)}`,
  () =>
    $fetch("/api/products/filtered", {
      query: { category: route.params.id, ...toQuery(active.value) },
    }),
  { watch: [() => route.params.id, () => route.query] },
);

/* Breadcrumb: adres cubugundaki kategori adindan tureiyor (store'daki
   eski push tabanli iz yerine — bkz. Shared/Breadcrumb.vue). Store
   cagrilari geriye donuk uyumluluk icin duruyor. */
store.setResetBreadcrumb();
store.setNowBreadCrumb({
  label: route.params.name,
  route: route.fullPath,
});

const crumbs = computed(() => {
  /* Ad verideki kategori listesinden; adres cubugundaki slug ("3d-cnc-design")
     izde kotu okunuyordu. Bulunamazsa slug'a dusuyor. */
  const match = ((store.getCategories as any[]) ?? []).find(
    (c) => String(c?.link ?? "").endsWith("/" + categoryId.value),
  );
  const label =
    match?.name || String(route.params.name ?? "").replace(/-/g, " ").trim();
  return label ? [{ label }] : [];
});

const products = computed(() =>
  control.lang_category_products((data.value as any)?.products ?? [], lang),
);

const total = computed(() => (data.value as any)?.total ?? 0);

/* Kategori listesi: SQL'den link ile geliyor, control dil onekini ekliyor.
   Kategori degistirmek filtreleri sifirliyor (link sorgu dizesi tasimiyor). */
const categories = computed(() =>
  control.lang_filter((data.value as any)?.category_f ?? [], lang),
);

/* Filtre seceneklerinin adi: control.lang_filter `link` bekliyor, facet
   satirlarinda link yok (linkler artik sorgu dizesinden uretiliyor), bu
   yuzden adi burada seciyoruz. */
const nameFor = (row: any) =>
  row[`name_${lang}`] ?? row.name_en ?? String(row.value ?? "");

/* Kategoride gosterilecek gruplar; bos gelen grup gizleniyor. */
const groups = computed(() => {
  const rows = data.value as any;
  if (!rows) return [];

  return availableFilters(categoryId.value)
    .map((key) => ({
      key,
      header: headers.value[key] ?? key,
      items: (rows[`${key}_f`] ?? []) as any[],
    }))
    .filter((g) => g.items.length);
});

/** Bir filtre degerinin hedef adresi (digerlerini koruyarak ac/kapat). */
function linkFor(key: FilterKey, value: string | number) {
  return {
    path: route.path,
    query: toggleFilter(active.value, key, String(value)),
  };
}

function isOn(key: FilterKey, value: string | number) {
  return (active.value[key] ?? []).includes(String(value));
}

/** Secili filtre rozetleri: hangi boyut, hangi deger, adi ne. */
const chips = computed(() => {
  const rows = data.value as any;
  if (!rows) return [];

  const out: { key: FilterKey; value: string; label: string }[] = [];
  for (const group of groups.value) {
    for (const value of active.value[group.key] ?? []) {
      const row = group.items.find((i) => String(i.value) === value);
      out.push({
        key: group.key,
        value,
        /* Secim listede yoksa (ornegin digerleriyle birlikte 0 urun
           veriyorsa) ham deger gosteriliyor, rozet kaybolmuyor. */
        label: row ? nameFor(row) : value,
      });
    }
  }
  return out;
});

/* "Tumunu temizle": sorgu dizesi olmadan ayni sayfa. */
const clearLink = computed(() => ({ path: route.path, query: {} }));
</script>

<template>
  <div class="cp" :dir="isRtl ? 'rtl' : undefined">
    <SharedBreadcrumb class="cp__crumbs" :items="crumbs" />

    <div class="cp__grid">
      <!-- Filtreler -->
      <aside class="cp__side" :aria-label="t.filters">
        <!-- Kategoriler: secim filtreleri sifirlar -->
        <section v-if="categories.length" class="fg">
          <h2 class="fg__header">{{ headers.category }}</h2>
          <ul class="fg__list">
            <li v-for="item of categories" :key="item.value ?? item.Id">
              <NuxtLink
                class="fo"
                :class="{ 'is-on': Number(item.value) === categoryId }"
                :to="item.link"
              >
                <span class="fo__name">{{ item.name }}</span>
                <span class="fo__count">{{ item.Filtered }}</span>
              </NuxtLink>
            </li>
          </ul>
        </section>

        <!-- Zincirlenebilir boyutlar -->
        <section v-for="group of groups" :key="group.key" class="fg">
          <h2 class="fg__header">{{ group.header }}</h2>
          <ul class="fg__list">
            <li v-for="item of group.items" :key="`${group.key}-${item.value}`">
              <NuxtLink
                class="fo"
                :class="{
                  'is-on': isOn(group.key, item.value),
                  'is-empty': !item.Filtered,
                }"
                :to="linkFor(group.key, item.value)"
              >
                <span class="fo__box" aria-hidden="true"></span>
                <span class="fo__name">{{ nameFor(item) }}</span>
                <span class="fo__count">{{ item.Filtered }}</span>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </aside>

      <!-- Urunler -->
      <div class="cp__main">
        <div class="cp__bar">
          <p class="cp__total">{{ t.results(total) }}</p>

          <div v-if="activeCount" class="cp__chips">
            <span class="cp__chips-label">{{ t.active }}</span>

            <NuxtLink
              v-for="chip of chips"
              :key="`${chip.key}-${chip.value}`"
              class="chip"
              :to="linkFor(chip.key, chip.value)"
            >
              <span>{{ chip.label }}</span>
              <span class="chip__x" aria-hidden="true">&times;</span>
            </NuxtLink>

            <NuxtLink class="cp__clear" :to="clearLink">{{ t.clear }}</NuxtLink>
          </div>
        </div>

        <!-- Sonuc yoksa: hangi filtreyi kaldiracagini soyle -->
        <p v-if="!pending && !products.length" class="cp__empty">
          <strong>{{ t.empty }}</strong>
          <span v-if="activeCount">{{ t.emptyHint }}</span>
        </p>

        <div v-else class="cp__products" :class="{ 'is-loading': pending }">
          <div
            v-for="(product, i) of products"
            :key="product.urunid ?? product.Id"
            class="cp__cell"
          >
            <ProductsCard
              :text="product.name"
              :image="product.image"
              :link="product.link"
              :loading="i < 6 ? 'eager' : 'lazy'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Kategori tanitim metni: her dil sayfasi kendi cevirisini veriyor -->
    <slot name="intro" />
  </div>
</template>

<style scoped>
.cp {
  font-family: var(--mk-ff-body);
}

.cp__grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  align-items: start;
}

@media (min-width: 62rem) {
  .cp__grid {
    grid-template-columns: minmax(0, 16rem) minmax(0, 1fr);
  }
}

/* --- Filtre paneli --- */
.fg {
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--mk-border);
}

.fg:last-child {
  border-bottom: 0;
}

.fg__header {
  margin: 0 0 0.75rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: start;
  color: var(--mk-grey-2);
}

.fg__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* --- Filtre secenegi --- */
.fo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0;
  font-size: 0.8125rem;
  line-height: 1.35;
  text-decoration: none;
  color: var(--mk-ink, var(--mk-body));
  transition: color 0.2s ease;
}

.fo:hover {
  color: var(--mk-ink);
}

.fo:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 2px;
}

/* Secili: kutu dolu + yazi siyah */
.fo.is-on {
  font-weight: 600;
  color: var(--mk-ink);
}

/* 0 urun verecek secenek: soluk ama tiklanabilir (geri alinabilsin) */
.fo.is-empty:not(.is-on) {
  opacity: 0.45;
}

/* Cok secimli oldugu icin onay kutusu formu: tiklayinca digerleri
   kaybolmuyor, bu da gorsel olarak anlasilsin. */
.fo__box {
  position: relative;
  flex: none;
  width: 0.875rem;
  height: 0.875rem;
  border: 1px solid var(--mk-line-strong, #cfc6b9);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.fo:hover .fo__box {
  border-color: var(--mk-ink);
}

.fo.is-on .fo__box {
  background: var(--mk-ink);
  border-color: var(--mk-ink);
}

.fo.is-on .fo__box::after {
  content: "";
  position: absolute;
  top: 0.125rem;
  left: 0.25rem;
  width: 0.25rem;
  height: 0.4375rem;
  border-inline-end: 1.5px solid var(--mk-cream);
  border-bottom: 1.5px solid var(--mk-cream);
  transform: rotate(45deg);
}

.fo__name {
  flex: 1 1 auto;
  min-width: 0;
  text-align: start;
}

.fo__count {
  flex: none;
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
  color: var(--mk-grey-2);
}

/* --- Ust serit --- */
.cp__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--mk-border);
}

.cp__total {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--mk-ink);
}

.cp__chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.cp__chips-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mk-grey-2);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--mk-cream);
  background: var(--mk-ink);
  border-radius: var(--mk-radius-pill, 30px);
  transition: opacity 0.2s ease;
}

.chip:hover {
  opacity: 0.8;
}

.chip__x {
  font-size: 0.9375rem;
  line-height: 1;
}

.cp__clear {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: underline;
  color: var(--mk-grey-2);
}

.cp__clear:hover {
  color: var(--mk-ink);
}

/* --- Urun izgarasi --- */
.cp__products {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
  transition: opacity 0.2s ease;
}

@media (min-width: 48rem) {
  .cp__products {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Yeni filtre yuklenirken listeyi soluklastir: eski sonuclar bir an
   dogru sanilmasin. */
.cp__products.is-loading {
  opacity: 0.45;
}

.cp__empty {
  display: grid;
  gap: 0.375rem;
  margin: 2rem 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--mk-body);
}

.cp__empty strong {
  font-weight: 600;
  color: var(--mk-ink);
}

@media (prefers-reduced-motion: reduce) {
  .fo,
  .fo__box,
  .chip,
  .cp__products {
    transition: none;
  }
}
</style>
