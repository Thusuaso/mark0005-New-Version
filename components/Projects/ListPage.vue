<template>
  <div class="pl" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- Baslik -->
    <header class="pl_hero">
      <span class="pl_eyebrow"><i class="bi-buildings" aria-hidden="true"></i>{{ t.eyebrow }}</span>
      <h1 class="pl_title">{{ t.title }}</h1>
      <p class="pl_subtitle">{{ t.subtitle }}</p>

      <ul class="pl_stats">
        <li class="pl_stat">
          <strong>{{ projects.length }}</strong><span>{{ t.stat_projects }}</span>
        </li>
        <li class="pl_stat">
          <strong>{{ countries.length }}</strong><span>{{ t.stat_countries }}</span>
        </li>
        <li class="pl_stat">
          <strong>{{ years }}+</strong><span>{{ t.stat_years }}</span>
        </li>
      </ul>
    </header>

    <!-- Filtreler -->
    <div class="pl_filters">
      <div class="pl_search">
        <i class="bi-search" aria-hidden="true"></i>
        <input
          v-model="query"
          type="search"
          class="pl_input"
          :placeholder="t.search_placeholder"
          :aria-label="t.search_placeholder"
        />
      </div>
      <div class="pl_select">
        <i class="bi-geo-alt" aria-hidden="true"></i>
        <select v-model="country" class="pl_input" :aria-label="t.all_countries">
          <option value="">{{ t.all_countries }}</option>
          <option v-for="c in countries" :key="c.name" :value="c.name">{{ c.name }} ({{ c.count }})</option>
        </select>
        <i class="bi-chevron-down pl_select_caret" aria-hidden="true"></i>
      </div>
      <span class="pl_count">{{ t.results(filtered.length) }}</span>
    </div>

    <!-- Izgara -->
    <div v-if="filtered.length" class="pl_grid">
      <ProjectsTile
        v-for="p in visible"
        :key="p.ID"
        :link="p.link"
        :image="p.Image"
        :name="p.name"
        :country="p.country"
        :cta="t.view_project"
        :rtl="isRtl"
      />
    </div>

    <div v-else class="pl_empty">
      <i class="bi-search" aria-hidden="true"></i>
      <p>{{ t.no_results }}</p>
      <button type="button" class="pl_btn pl_btn--ghost" @click="resetFilters">{{ t.clear }}</button>
    </div>

    <div v-if="filtered.length > limit" class="pl_more">
      <button type="button" class="pl_btn pl_btn--ghost" @click="limit += PAGE">
        <i class="bi-plus-lg" aria-hidden="true"></i>{{ t.results(filtered.length - limit) }}
      </button>
    </div>

    <!-- Iletisim -->
    <section class="pl_cta">
      <div class="pl_cta_icon" aria-hidden="true"><i class="bi-compass"></i></div>
      <div class="pl_cta_body">
        <h2 class="pl_cta_title">{{ t.cta_title }}</h2>
        <p class="pl_cta_text">{{ t.cta_text }}</p>
      </div>
      <NuxtLink :to="contactLink" class="pl_btn">
        {{ t.cta_button }}<i :class="isRtl ? 'bi-arrow-left' : 'bi-arrow-right'" aria-hidden="true"></i>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "~/store/index";
import { useProjectTexts } from "~/assets/data/projects/texts";

const PAGE = 12;

const store = useStore();
const { lang, t, isRtl, contactLink } = useProjectTexts(store.getLang);

store.setLoading(ref(true));
const list = await $fetch<any[]>("/api/projects/list").catch(() => []);
store.setProjects(Array.isArray(list) ? list : []);
store.setLoading(ref(false));

const projects = (store.getProjects as any[]).filter((p) => p?.name);
const years = new Date().getFullYear() - 2002;

const countries = Object.entries(
  projects.reduce<Record<string, number>>((acc, p) => {
    const c = String(p.country ?? "").trim();
    if (c) acc[c] = (acc[c] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, lang));

const query = ref("");
const country = ref("");
const limit = ref(PAGE);

const normalize = (s: string) => s.toLocaleLowerCase(lang).normalize("NFD").replace(/[̀-ͯ]/g, "");

const filtered = computed(() => {
  const q = normalize(query.value.trim());
  return projects.filter(
    (p) =>
      (!country.value || p.country === country.value) &&
      (!q || normalize(`${p.name} ${p.country ?? ""}`).includes(q)),
  );
});
const visible = computed(() => filtered.value.slice(0, limit.value));

watch([query, country], () => {
  limit.value = PAGE;
});

function resetFilters() {
  query.value = "";
  country.value = "";
}
</script>

<style scoped>
.pl {
  --pl-accent: #1e58c4;
  --pl-accent-soft: rgba(30, 88, 196, 0.08);
  --pl-ink: #111827;
  --pl-muted: #6b7280;
  --pl-line: #e5e7eb;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  color: var(--pl-ink);
  text-align: start;
}

.pl_hero {
  padding: 2.5rem 1.5rem 2rem;
  border: 1px solid #e6ecf7;
  border-radius: 20px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(30, 88, 196, 0.12), transparent 55%),
    linear-gradient(180deg, #f5f8ff, #ffffff);
  text-align: center;
}

.pl_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--pl-accent-soft);
  color: var(--pl-accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pl_title {
  margin: 0.9rem 0 0.6rem;
  color: var(--pl-ink);
  font-size: clamp(1.6rem, 3.5vw, 2.35rem);
  font-weight: 700;
  line-height: 1.2;
}

.pl_subtitle {
  max-width: 640px;
  margin: 0 auto;
  color: var(--pl-muted);
  font-size: 15px;
  line-height: 1.6;
}

.pl_stats {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.6rem 0 0;
  padding: 0;
  list-style: none;
}

.pl_stat {
  display: flex;
  flex-direction: column;
  min-width: 130px;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--pl-line);
  border-radius: 14px;
  background: #fff;
}

.pl_stat strong {
  color: var(--pl-accent);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
}

.pl_stat span {
  margin-top: 0.15rem;
  color: var(--pl-muted);
  font-size: 12.5px;
}

/* Filtreler */
.pl_filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin: 1.75rem 0 1.25rem;
}

.pl_search,
.pl_select {
  position: relative;
}

.pl_search {
  flex: 1 1 280px;
}

.pl_select {
  flex: 0 1 260px;
}

.pl_search > i,
.pl_select > i:first-child {
  position: absolute;
  top: 50%;
  inset-inline-start: 1rem;
  z-index: 1;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.pl_select_caret {
  position: absolute;
  top: 50%;
  inset-inline-end: 1rem;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 12px;
  pointer-events: none;
}

.pl_input {
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  padding-inline-start: 2.6rem;
  border: 1px solid #dfe3e8;
  border-radius: 12px;
  background: #fff;
  color: var(--pl-ink);
  font-size: 14.5px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

select.pl_input {
  padding-inline-end: 2.4rem;
  appearance: none;
  cursor: pointer;
}

.pl_input::-webkit-search-cancel-button {
  cursor: pointer;
}

.pl_input:focus {
  outline: 0;
  border-color: var(--pl-accent);
  box-shadow: 0 0 0 4px rgba(30, 88, 196, 0.12);
}

.pl_count {
  margin-inline-start: auto;
  color: var(--pl-muted);
  font-size: 13.5px;
  white-space: nowrap;
}

/* Izgara */
.pl_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.1rem;
}

.pl_more {
  margin-top: 1.75rem;
  text-align: center;
}

.pl_empty {
  padding: 3rem 1rem;
  border: 1px dashed #d8dde3;
  border-radius: 14px;
  color: var(--pl-muted);
  text-align: center;
}

.pl_empty > i {
  color: #c0c6cf;
  font-size: 1.75rem;
}

.pl_empty p {
  margin: 0.6rem 0 1rem;
}

/* Buton + CTA */
.pl_btn {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.3rem;
  border: 0;
  border-radius: 10px;
  background: #fff;
  color: var(--pl-accent);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.pl_btn:hover {
  color: var(--pl-accent);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
}

.pl_btn--ghost {
  border: 1px solid var(--pl-line);
}

.pl_btn--ghost:hover {
  border-color: var(--pl-accent);
  box-shadow: none;
}

.pl_cta {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-top: 3.5rem;
  padding: 1.6rem 1.75rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #1e3a8a, #1e58c4);
  color: #fff;
}

.pl_cta_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 1.5rem;
}

.pl_cta_body {
  flex: 1 1 auto;
  min-width: 0;
}

.pl_cta_title {
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.pl_cta_text {
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
}

@media (max-width: 767.98px) {
  .pl_hero {
    padding: 1.75rem 1rem 1.5rem;
  }

  .pl_stats {
    gap: 0.5rem;
  }

  .pl_stat {
    flex: 1 1 0;
    min-width: 0;
    padding: 0.7rem 0.5rem;
  }

  .pl_stat strong {
    font-size: 1.3rem;
  }

  .pl_search,
  .pl_select {
    flex: 1 1 100%;
  }

  .pl_count {
    margin-inline-start: 0;
  }

  .pl_grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .pl_cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.4rem;
  }
}

@media (max-width: 420px) {
  .pl_grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
