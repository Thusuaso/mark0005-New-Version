<template>
  <div class="vid" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- Baslik -->
    <header class="vid_hero">
      <span class="vid_eyebrow"><i class="bi-play-btn" aria-hidden="true"></i>{{ t.eyebrow }}</span>
      <h1 class="vid_title">{{ t.title }}</h1>
      <p class="vid_subtitle">{{ t.subtitle }}</p>

      <div class="vid_search">
        <i class="bi-search" aria-hidden="true"></i>
        <input
          v-model="query"
          type="search"
          class="vid_search_input"
          :placeholder="t.search_placeholder"
          :aria-label="t.search_placeholder"
        />
        <button v-if="query" type="button" class="vid_search_clear" :aria-label="t.clear" @click="query = ''">
          <i class="bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>
    </header>

    <!-- Kategoriler -->
    <nav class="vid_tabs" role="tablist" aria-label="Video categories">
      <button
        v-for="cat in categories"
        :key="cat.key"
        type="button"
        role="tab"
        class="vid_tab"
        :class="{ 'vid_tab--active': !query && active === cat.key }"
        :aria-selected="!query && active === cat.key"
        @click="selectCategory(cat.key)"
      >
        <i :class="cat.icon" aria-hidden="true"></i>
        <span>{{ cat.title }}</span>
        <span class="vid_tab_count">{{ cat.videos.length }}</span>
      </button>
    </nav>

    <!-- One cikan oynatici -->
    <section v-if="current" ref="playerEl" class="vid_player">
      <div class="vid_player_frame">
        <iframe
          v-if="playing"
          :key="current.videoId"
          :src="`https://www.youtube.com/embed/${current.videoId}?autoplay=1&rel=0`"
          :title="current.name"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <button v-else type="button" class="vid_player_thumb" :aria-label="`${t.play}: ${current.name}`" @click="playing = true">
          <img :src="thumb(current.videoId, 'max')" :alt="current.name" @error="onThumbError" />
          <span class="vid_play vid_play--lg" aria-hidden="true"><i class="bi-play-fill"></i></span>
        </button>
      </div>
      <div class="vid_player_info">
        <span class="vid_player_badge"><i :class="current.icon" aria-hidden="true"></i>{{ current.category }}</span>
        <h2 class="vid_player_title">{{ current.name }}</h2>
        <a
          :href="`https://www.youtube.com/watch?v=${current.videoId}`"
          target="_blank"
          rel="noopener"
          class="vid_player_link"
        >
          <i class="bi-youtube" aria-hidden="true"></i>{{ t.watch_on_youtube }}
        </a>
      </div>
    </section>

    <!-- Liste -->
    <section class="vid_list">
      <div class="vid_list_head">
        <h2 class="vid_list_title">{{ query ? t.results : activeCategory?.title }}</h2>
        <span class="vid_list_count">{{ t.count(filtered.length) }}</span>
      </div>

      <div v-if="filtered.length" class="vid_grid">
        <button
          v-for="v in visible"
          :key="`${v.catKey}_${v.videoId}_${v.index}`"
          type="button"
          class="vid_card"
          :class="{ 'vid_card--current': current && current.videoId === v.videoId }"
          @click="select(v)"
        >
          <span class="vid_card_thumb">
            <img :src="thumb(v.videoId)" :alt="v.name" loading="lazy" />
            <span class="vid_play" aria-hidden="true"><i class="bi-play-fill"></i></span>
            <span v-if="playing && current && current.videoId === v.videoId" class="vid_card_now">
              <i class="bi-soundwave" aria-hidden="true"></i>{{ t.now_playing }}
            </span>
          </span>
          <span class="vid_card_body">
            <span v-if="query" class="vid_card_cat">{{ v.category }}</span>
            <span class="vid_card_title">{{ v.name }}</span>
          </span>
        </button>
      </div>

      <div v-else class="vid_empty">
        <i class="bi-camera-video-off" aria-hidden="true"></i>
        <p>{{ t.no_results }}</p>
        <button type="button" class="vid_btn vid_btn--ghost" @click="query = ''">{{ t.clear }}</button>
      </div>

      <div v-if="filtered.length > limit" class="vid_more">
        <button type="button" class="vid_btn vid_btn--ghost" @click="limit += PAGE">
          {{ t.show_more }} <span class="vid_more_count">({{ filtered.length - limit }})</span>
        </button>
      </div>
    </section>

    <!-- YouTube kanali -->
    <section class="vid_cta">
      <div class="vid_cta_icon" aria-hidden="true"><i class="bi-youtube"></i></div>
      <div class="vid_cta_body">
        <h2 class="vid_cta_title">{{ t.cta_title }}</h2>
        <p class="vid_cta_text">{{ t.cta_text }}</p>
      </div>
      <a :href="CHANNEL" target="_blank" rel="noopener" class="vid_btn">
        {{ t.cta_button }}<i class="bi-box-arrow-up-right" aria-hidden="true"></i>
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";
type CatKey = "projects" | "production" | "informative";

const CHANNEL = "https://www.youtube.com/channel/UCYz9dfb0A44hUzNiMwNQQFA";
const PAGE = 12;

const texts: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    search_placeholder: string;
    clear: string;
    results: string;
    count: (n: number) => string;
    no_results: string;
    show_more: string;
    play: string;
    now_playing: string;
    watch_on_youtube: string;
    categories: Record<CatKey, string>;
    cta_title: string;
    cta_text: string;
    cta_button: string;
  }
> = {
  en: {
    eyebrow: "Video Library",
    title: "Mekmar Videos",
    subtitle: "Explore our projects around the world, see our production up close and learn more about natural stone.",
    search_placeholder: "Search videos…",
    clear: "Clear search",
    results: "Search results",
    count: (n) => `${n} ${n === 1 ? "video" : "videos"}`,
    no_results: "No videos match your search.",
    show_more: "Show more",
    play: "Play",
    now_playing: "Now playing",
    watch_on_youtube: "Watch on YouTube",
    categories: { projects: "Projects", production: "Production", informative: "Informative" },
    cta_title: "Subscribe to our YouTube channel",
    cta_text: "Be the first to see new projects, production videos and natural stone guides.",
    cta_button: "Visit Channel",
  },
  fr: {
    eyebrow: "Vidéothèque",
    title: "Vidéos Mekmar",
    subtitle: "Découvrez nos projets dans le monde entier, notre production de près et tout sur la pierre naturelle.",
    search_placeholder: "Rechercher une vidéo…",
    clear: "Effacer la recherche",
    results: "Résultats de recherche",
    count: (n) => `${n} ${n <= 1 ? "vidéo" : "vidéos"}`,
    no_results: "Aucune vidéo ne correspond à votre recherche.",
    show_more: "Voir plus",
    play: "Lire",
    now_playing: "En lecture",
    watch_on_youtube: "Voir sur YouTube",
    categories: { projects: "Projets", production: "Production", informative: "Informatives" },
    cta_title: "Abonnez-vous à notre chaîne YouTube",
    cta_text: "Soyez les premiers à découvrir nos nouveaux projets, vidéos de production et guides sur la pierre naturelle.",
    cta_button: "Voir la chaîne",
  },
  es: {
    eyebrow: "Videoteca",
    title: "Vídeos de Mekmar",
    subtitle: "Descubra nuestros proyectos en todo el mundo, vea nuestra producción de cerca y aprenda más sobre la piedra natural.",
    search_placeholder: "Buscar vídeos…",
    clear: "Borrar búsqueda",
    results: "Resultados de búsqueda",
    count: (n) => `${n} ${n === 1 ? "vídeo" : "vídeos"}`,
    no_results: "Ningún vídeo coincide con su búsqueda.",
    show_more: "Ver más",
    play: "Reproducir",
    now_playing: "Reproduciendo",
    watch_on_youtube: "Ver en YouTube",
    categories: { projects: "Proyectos", production: "Producción", informative: "Informativos" },
    cta_title: "Suscríbase a nuestro canal de YouTube",
    cta_text: "Sea el primero en ver nuevos proyectos, vídeos de producción y guías sobre piedra natural.",
    cta_button: "Ver canal",
  },
  ru: {
    eyebrow: "Видеотека",
    title: "Видео Mekmar",
    subtitle: "Наши проекты по всему миру, производство крупным планом и полезные материалы о натуральном камне.",
    search_placeholder: "Поиск видео…",
    clear: "Очистить поиск",
    results: "Результаты поиска",
    count: (n) => `${n} видео`,
    no_results: "По вашему запросу видео не найдено.",
    show_more: "Показать ещё",
    play: "Смотреть",
    now_playing: "Сейчас играет",
    watch_on_youtube: "Смотреть на YouTube",
    categories: { projects: "Проекты", production: "Производство", informative: "Полезное" },
    cta_title: "Подпишитесь на наш YouTube-канал",
    cta_text: "Первыми смотрите новые проекты, видео с производства и гиды по натуральному камню.",
    cta_button: "Перейти на канал",
  },
  ar: {
    eyebrow: "مكتبة الفيديو",
    title: "فيديوهات ميكمار",
    subtitle: "استكشف مشاريعنا حول العالم، وشاهد الإنتاج عن قرب، وتعرّف أكثر على الحجر الطبيعي.",
    search_placeholder: "ابحث عن فيديو…",
    clear: "مسح البحث",
    results: "نتائج البحث",
    count: (n) => `${n} فيديو`,
    no_results: "لا توجد فيديوهات مطابقة لبحثك.",
    show_more: "عرض المزيد",
    play: "تشغيل",
    now_playing: "قيد التشغيل",
    watch_on_youtube: "شاهد على يوتيوب",
    categories: { projects: "المشاريع", production: "الإنتاج", informative: "فيديوهات تعليمية" },
    cta_title: "اشترك في قناتنا على يوتيوب",
    cta_text: "كن أول من يشاهد المشاريع الجديدة وفيديوهات الإنتاج وأدلة الحجر الطبيعي.",
    cta_button: "زيارة القناة",
  },
};

const store = useStore();
const lang = (store.getLang in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const ICONS: Record<CatKey, string> = {
  projects: "bi-buildings",
  production: "bi-gear-wide-connected",
  informative: "bi-lightbulb",
};

const data = store.getVideos as Record<string, any>;
const categories = (["projects", "production", "informative"] as CatKey[]).map((key) => ({
  key,
  icon: ICONS[key],
  title: t.categories[key],
  videos: (Array.isArray(data?.[key]) ? data[key] : [])
    .filter((v: any) => v?.videoId)
    .map((v: any, index: number) => ({
      videoId: String(v.videoId),
      name: String(v.name ?? ""),
      index,
      catKey: key,
      category: t.categories[key],
      icon: ICONS[key],
    })),
}));
type Video = (typeof categories)[number]["videos"][number];

const active = ref<CatKey>(categories.find((c) => c.videos.length)?.key ?? "projects");
const activeCategory = computed(() => categories.find((c) => c.key === active.value));
const query = ref("");
const limit = ref(PAGE);

const normalize = (s: string) => s.toLocaleLowerCase(lang).normalize("NFD").replace(/[̀-ͯ]/g, "");

const filtered = computed<Video[]>(() => {
  const q = normalize(query.value.trim());
  if (!q) return activeCategory.value?.videos ?? [];
  return categories.flatMap((c) => c.videos).filter((v) => normalize(v.name).includes(q));
});
const visible = computed(() => filtered.value.slice(0, limit.value));

watch([active, query], () => {
  limit.value = PAGE;
});

/* Oynatici */
const current = ref<Video | null>(activeCategory.value?.videos[0] ?? null);
const playing = ref(false);
const playerEl = ref<HTMLElement | null>(null);

function selectCategory(key: CatKey) {
  query.value = "";
  active.value = key;
}

async function select(v: Video) {
  current.value = v;
  playing.value = true;
  await nextTick();
  const el = playerEl.value;
  if (el && el.getBoundingClientRect().top < 0) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const thumb = (id: string, size: "hq" | "max" = "hq") =>
  `https://i.ytimg.com/vi/${id}/${size === "max" ? "maxresdefault" : "hqdefault"}.jpg`;

/* Her videonun buyuk kapak resmi olmayabiliyor; o zaman hq'ya dus */
function onThumbError(e: Event) {
  const img = e.target as HTMLImageElement;
  if (img.src.includes("maxresdefault")) img.src = img.src.replace("maxresdefault", "hqdefault");
}
</script>

<style scoped>
.vid {
  --vid-accent: #1e58c4;
  --vid-accent-soft: rgba(30, 88, 196, 0.08);
  --vid-ink: #111827;
  --vid-muted: #6b7280;
  --vid-line: #e5e7eb;
  max-width: 1140px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  color: var(--vid-ink);
  text-align: start;
}

/* ---------- Baslik ---------- */
.vid_hero {
  padding: 2.5rem 1.5rem 2rem;
  border: 1px solid #e6ecf7;
  border-radius: 20px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(30, 88, 196, 0.12), transparent 55%),
    linear-gradient(180deg, #f5f8ff, #ffffff);
  text-align: center;
}

.vid_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--vid-accent-soft);
  color: var(--vid-accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.vid_title {
  margin: 0.9rem 0 0.6rem;
  color: var(--vid-ink);
  font-size: clamp(1.6rem, 3.5vw, 2.35rem);
  font-weight: 700;
  line-height: 1.2;
}

.vid_subtitle {
  max-width: 640px;
  margin: 0 auto;
  color: var(--vid-muted);
  font-size: 15px;
  line-height: 1.6;
}

.vid_search {
  position: relative;
  max-width: 520px;
  margin: 1.5rem auto 0;
}

.vid_search > .bi-search {
  position: absolute;
  top: 50%;
  inset-inline-start: 1.1rem;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.vid_search_input {
  width: 100%;
  height: 52px;
  padding: 0 3rem;
  border: 1px solid #dfe3e8;
  border-radius: 999px;
  background: #fff;
  color: var(--vid-ink);
  font-size: 15px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.vid_search_input::-webkit-search-cancel-button {
  display: none;
}

.vid_search_input:focus {
  outline: 0;
  border-color: var(--vid-accent);
  box-shadow: 0 0 0 4px rgba(30, 88, 196, 0.12);
}

.vid_search_clear {
  position: absolute;
  top: 50%;
  inset-inline-end: 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #f3f4f6;
  color: var(--vid-muted);
  transform: translateY(-50%);
}

/* ---------- Sekmeler ---------- */
.vid_tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.75rem 0;
}

.vid_tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--vid-line);
  border-radius: 999px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.vid_tab:hover {
  border-color: var(--vid-accent);
  color: var(--vid-accent);
}

.vid_tab_count {
  min-width: 24px;
  padding: 0.05rem 0.45rem;
  border-radius: 999px;
  background: #f3f4f6;
  color: var(--vid-muted);
  font-size: 11.5px;
  text-align: center;
}

.vid_tab--active,
.vid_tab--active:hover {
  border-color: var(--vid-accent);
  background: var(--vid-accent);
  color: #fff;
}

.vid_tab--active .vid_tab_count {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
}

/* ---------- Oynatici ---------- */
.vid_player {
  display: grid;
  grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr);
  overflow: hidden;
  border-radius: 18px;
  background: #0f172a;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
  scroll-margin-top: 90px;
}

.vid_player_frame {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
}

.vid_player_frame iframe,
.vid_player_thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.vid_player_thumb {
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.vid_player_thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.vid_player_thumb:hover img {
  opacity: 1;
}

.vid_player_info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.75rem;
  color: #fff;
}

.vid_player_badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #c7d2fe;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.vid_player_title {
  margin: 0;
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.35;
}

.vid_player_link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.25rem;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.vid_player_link:hover {
  color: #fff;
  opacity: 1;
}

.vid_player_link i {
  color: #ff4d4d;
  font-size: 1.1rem;
}

/* Oynat dugmesi (ortak) */
.vid_play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: var(--vid-accent);
  font-size: 1.5rem;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.vid_play i {
  margin-left: 3px;
}

.vid_play--lg {
  width: 76px;
  height: 76px;
  font-size: 2.4rem;
}

.vid_player_thumb:hover .vid_play {
  transform: translate(-50%, -50%) scale(1.08);
  background: var(--vid-accent);
  color: #fff;
}

/* ---------- Liste ---------- */
.vid_list {
  margin-top: 2.5rem;
}

.vid_list_head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.vid_list_title {
  margin: 0;
  color: var(--vid-ink);
  font-size: 1.3rem;
  font-weight: 700;
}

.vid_list_count {
  color: var(--vid-muted);
  font-size: 13px;
}

.vid_grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.vid_card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  border: 1px solid var(--vid-line);
  border-radius: 14px;
  background: #fff;
  color: inherit;
  text-align: start;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.vid_card:hover {
  border-color: #cfd6e1;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.09);
  transform: translateY(-2px);
}

.vid_card:focus-visible {
  outline: 3px solid var(--vid-accent);
  outline-offset: 2px;
}

.vid_card--current {
  border-color: var(--vid-accent);
  box-shadow: 0 0 0 3px rgba(30, 88, 196, 0.15);
}

.vid_card_thumb {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #e5e7eb;
}

.vid_card_thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.vid_card:hover .vid_card_thumb img {
  transform: scale(1.05);
}

.vid_card .vid_play {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.85);
}

.vid_card:hover .vid_play,
.vid_card:focus-visible .vid_play {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.vid_card_now {
  position: absolute;
  bottom: 0.5rem;
  inset-inline-start: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--vid-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
}

.vid_card_body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem 0.9rem 0.9rem;
}

.vid_card_cat {
  color: var(--vid-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.vid_card_title {
  display: -webkit-box;
  overflow: hidden;
  color: var(--vid-ink);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.vid_more {
  margin-top: 1.5rem;
  text-align: center;
}

.vid_more_count {
  color: var(--vid-muted);
  font-weight: 500;
}

.vid_empty {
  padding: 3rem 1rem;
  border: 1px dashed #d8dde3;
  border-radius: 14px;
  color: var(--vid-muted);
  text-align: center;
}

.vid_empty > i {
  color: #c0c6cf;
  font-size: 1.75rem;
}

.vid_empty p {
  margin: 0.6rem 0 1rem;
}

/* ---------- Butonlar / CTA ---------- */
.vid_btn {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.3rem;
  border: 0;
  border-radius: 10px;
  background: #fff;
  color: var(--vid-accent);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.vid_btn:hover {
  color: var(--vid-accent);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
}

.vid_btn--ghost {
  border: 1px solid var(--vid-line);
}

.vid_btn--ghost:hover {
  border-color: var(--vid-accent);
  box-shadow: none;
}

.vid_cta {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-top: 3.5rem;
  padding: 1.6rem 1.75rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #1e3a8a, #1e58c4);
  color: #fff;
}

.vid_cta_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 1.6rem;
}

.vid_cta_body {
  flex: 1 1 auto;
  min-width: 0;
}

.vid_cta_title {
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.vid_cta_text {
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
}

/* ---------- Duyarli ---------- */
@media (max-width: 991.98px) {
  .vid_player {
    grid-template-columns: minmax(0, 1fr);
  }

  .vid_player_info {
    padding: 1.1rem 1.25rem 1.3rem;
  }

  .vid_player_title {
    font-size: 1.15rem;
  }

  .vid_grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767.98px) {
  .vid_grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .vid_card_body {
    padding: 0.6rem 0.7rem 0.75rem;
  }

  .vid_card_title {
    font-size: 13px;
  }

  .vid_card .vid_play {
    width: 38px;
    height: 38px;
    font-size: 1.2rem;
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  .vid_play--lg {
    width: 60px;
    height: 60px;
    font-size: 1.9rem;
  }

  .vid_cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.4rem;
  }
}

@media (max-width: 640px) {
  .vid {
    padding-top: 1rem;
  }

  .vid_hero {
    padding: 1.75rem 1rem 1.5rem;
  }

  .vid_tabs {
    justify-content: flex-start;
    margin-inline: -1rem;
    padding: 0 1rem 0.25rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .vid_tabs::-webkit-scrollbar {
    display: none;
  }

  .vid_tab {
    flex: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vid_card,
  .vid_card_thumb img,
  .vid_play {
    transition: none;
  }
}
</style>
