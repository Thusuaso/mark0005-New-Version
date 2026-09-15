<template>
  <div class="faq" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- Baslik -->
    <header class="faq_hero">
      <span class="faq_eyebrow"><i class="bi-question-circle" aria-hidden="true"></i>{{ c.eyebrow }}</span>
      <h1 class="faq_title">{{ c.title }}</h1>
      <p class="faq_subtitle">{{ c.subtitle }}</p>

      <div class="faq_search">
        <i class="bi-search" aria-hidden="true"></i>
        <input
          v-model="query"
          type="search"
          class="faq_search_input"
          :placeholder="c.search_placeholder"
          :aria-label="c.search_placeholder"
        />
        <button v-if="query" type="button" class="faq_search_clear" :aria-label="c.clear_search" @click="query = ''">
          <i class="bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>
    </header>

    <!-- Kategoriler -->
    <nav class="faq_chips" aria-label="FAQ categories">
      <button
        type="button"
        class="faq_chip"
        :class="{ 'faq_chip--active': activeGroup === 'all' }"
        @click="activeGroup = 'all'"
      >
        {{ c.all }}
        <span class="faq_chip_count">{{ totalCount }}</span>
      </button>
      <button
        v-for="g in c.groups"
        :key="g.id"
        type="button"
        class="faq_chip"
        :class="{ 'faq_chip--active': activeGroup === g.id }"
        @click="activeGroup = g.id"
      >
        <i :class="g.icon" aria-hidden="true"></i>{{ g.title }}
        <span class="faq_chip_count">{{ g.items.length }}</span>
      </button>
    </nav>

    <!-- Sorular -->
    <section class="faq_list">
      <div v-for="g in visibleGroups" :key="g.id" class="faq_group">
        <div class="faq_group_head">
          <span class="faq_group_icon" aria-hidden="true"><i :class="g.icon"></i></span>
          <h2 class="faq_group_title">{{ g.title }}</h2>
          <span class="faq_group_count">{{ c.questions(g.items.length) }}</span>
        </div>

        <div class="faq_items">
          <div
            v-for="item in g.items"
            :key="item.key"
            class="faq_item"
            :class="{ 'faq_item--open': openKeys.has(item.key) }"
          >
            <h3 class="faq_q">
              <button
                :id="`faq_btn_${item.key}`"
                type="button"
                class="faq_q_btn"
                :aria-expanded="openKeys.has(item.key)"
                :aria-controls="`faq_panel_${item.key}`"
                @click="toggle(item.key)"
              >
                <span>{{ item.q }}</span>
                <span class="faq_q_icon" aria-hidden="true"><i class="bi-plus-lg"></i></span>
              </button>
            </h3>
            <div
              :id="`faq_panel_${item.key}`"
              class="faq_a"
              role="region"
              :aria-labelledby="`faq_btn_${item.key}`"
            >
              <div class="faq_a_inner">
                <p v-if="item.a.length === 1 && !item.a[0].term" class="faq_a_text">{{ item.a[0].text }}</p>
                <ul v-else class="faq_a_list">
                  <li v-for="(line, i) in item.a" :key="i">
                    <strong v-if="line.term">{{ line.term }}:</strong> {{ line.text }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!visibleGroups.length" class="faq_empty">
        <i class="bi-search" aria-hidden="true"></i>
        <p>{{ c.no_results }}</p>
        <button type="button" class="faq_btn faq_btn--ghost" @click="resetFilters">{{ c.clear_search }}</button>
      </div>
    </section>

    <!-- Videolar -->
    <section v-if="videoList.length" class="faq_videos">
      <div class="faq_section_head">
        <h2 class="faq_section_title"><i class="bi-play-circle" aria-hidden="true"></i>{{ c.videos_title }}</h2>
        <p class="faq_section_text">{{ c.videos_subtitle }}</p>
      </div>
      <div class="faq_video_grid">
        <article v-for="vid in videoList" :key="vid.id" class="faq_video">
          <div class="faq_video_frame">
            <iframe
              v-if="playing === vid.id"
              :src="`https://www.youtube.com/embed/${vid.url}?autoplay=1&rel=0`"
              :title="vid.title"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <button v-else type="button" class="faq_video_thumb" :aria-label="vid.title" @click="playing = vid.id">
              <img :src="`https://i.ytimg.com/vi/${vid.url}/hqdefault.jpg`" :alt="vid.title" loading="lazy" />
              <span class="faq_video_play" aria-hidden="true"><i class="bi-play-fill"></i></span>
            </button>
          </div>
          <h3 class="faq_video_title">{{ vid.title }}</h3>
        </article>
      </div>
    </section>

    <!-- Iletisim cagrisi -->
    <section class="faq_cta">
      <div class="faq_cta_icon" aria-hidden="true"><i class="bi-chat-dots"></i></div>
      <div class="faq_cta_body">
        <h2 class="faq_cta_title">{{ c.cta_title }}</h2>
        <p class="faq_cta_text">{{ c.cta_text }}</p>
      </div>
      <NuxtLink :to="contactLink" class="faq_btn">
        {{ c.cta_button }}<i :class="isRtl ? 'bi-arrow-left' : 'bi-arrow-right'" aria-hidden="true"></i>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { FaqContent } from "~/assets/data/faq/types";
import en from "~/assets/data/faq/en";
import fr from "~/assets/data/faq/fr";
import es from "~/assets/data/faq/es";
import ru from "~/assets/data/faq/ru";
import ar from "~/assets/data/faq/ar";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const props = defineProps<{ lang: Lang }>();

const contents: Record<Lang, FaqContent> = { en, fr, es, ru, ar };
const c = contents[props.lang] ?? en;
const isRtl = props.lang === "ar";
const contactLink = props.lang === "en" ? "/contact" : `/${props.lang}/contact`;

/* Her soruya sabit bir anahtar ver (grup + sira) */
const groups = c.groups.map((g) => ({
  ...g,
  items: g.items.map((item, i) => ({ ...item, key: `${g.id}_${i}` })),
}));
const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0);

const query = ref("");
const activeGroup = ref<string>("all");
const openKeys = ref(new Set<string>([groups[0]?.items[0]?.key].filter(Boolean) as string[]));

const normalize = (s: string) =>
  s.toLocaleLowerCase(props.lang).normalize("NFD").replace(/[̀-ͯ]/g, "");

const visibleGroups = computed(() => {
  const q = normalize(query.value.trim());
  return groups
    .filter((g) => q || activeGroup.value === "all" || g.id === activeGroup.value)
    .map((g) => ({
      ...g,
      items: q
        ? g.items.filter((item) =>
            normalize([item.q, ...item.a.map((l) => `${l.term ?? ""} ${l.text}`)].join(" ")).includes(q),
          )
        : g.items,
    }))
    .filter((g) => g.items.length);
});

function toggle(key: string) {
  const next = new Set(openKeys.value);
  next.has(key) ? next.delete(key) : next.add(key);
  openKeys.value = next;
}

function resetFilters() {
  query.value = "";
  activeGroup.value = "all";
}

/* Videolar (veritabanindan) */
const titleKey = { en: "Title_En", fr: "Title_Fr", es: "Title_Es", ru: "Title_Ru", ar: "Title_Ar" }[props.lang];
const { data: videos } = await useFetch<any[] | false>("/api/faq_videos");
const videoList = computed(() =>
  (Array.isArray(videos.value) ? videos.value : [])
    .filter((v) => v?.Url)
    .map((v) => ({ id: v.ID, url: v.Url, title: v[titleKey] || v.Title_En || "" })),
);
const playing = ref<number | null>(null);

/* Google icin FAQ yapisal verisi */
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: groups.flatMap((g) =>
          g.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a.map((l) => (l.term ? `${l.term}: ${l.text}` : l.text)).join(" "),
            },
          })),
        ),
      }),
    },
  ],
});
</script>

<style scoped>
.faq {
  --faq-accent: #1e58c4;
  --faq-accent-soft: rgba(30, 88, 196, 0.08);
  --faq-ink: #111827;
  --faq-muted: #6b7280;
  --faq-line: #e5e7eb;
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  color: var(--faq-ink);
  text-align: start;
}

/* ---------- Baslik ---------- */
.faq_hero {
  padding: 2.5rem 1.5rem 2rem;
  border-radius: 20px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(30, 88, 196, 0.12), transparent 55%),
    linear-gradient(180deg, #f5f8ff, #ffffff);
  border: 1px solid #e6ecf7;
  text-align: center;
}

.faq_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--faq-accent-soft);
  color: var(--faq-accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.faq_title {
  margin: 0.9rem 0 0.6rem;
  font-size: clamp(1.6rem, 3.5vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--faq-ink);
}

.faq_subtitle {
  max-width: 620px;
  margin: 0 auto;
  color: var(--faq-muted);
  font-size: 15px;
  line-height: 1.6;
}

.faq_search {
  position: relative;
  max-width: 520px;
  margin: 1.5rem auto 0;
}

.faq_search > .bi-search {
  position: absolute;
  top: 50%;
  inset-inline-start: 1.1rem;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.faq_search_input {
  width: 100%;
  height: 52px;
  padding: 0 3rem;
  border: 1px solid #dfe3e8;
  border-radius: 999px;
  background: #fff;
  color: var(--faq-ink);
  font-size: 15px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.faq_search_input::-webkit-search-cancel-button {
  display: none;
}

.faq_search_input:focus {
  outline: 0;
  border-color: var(--faq-accent);
  box-shadow: 0 0 0 4px rgba(30, 88, 196, 0.12);
}

.faq_search_clear {
  position: absolute;
  top: 50%;
  inset-inline-end: 0.6rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #f3f4f6;
  color: var(--faq-muted);
}

/* ---------- Kategoriler ---------- */
.faq_chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.75rem 0 2rem;
}

.faq_chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  border: 1px solid var(--faq-line);
  border-radius: 999px;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.faq_chip:hover {
  border-color: var(--faq-accent);
  color: var(--faq-accent);
}

.faq_chip_count {
  min-width: 22px;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  background: #f3f4f6;
  color: var(--faq-muted);
  font-size: 11px;
  text-align: center;
}

.faq_chip--active,
.faq_chip--active:hover {
  border-color: var(--faq-accent);
  background: var(--faq-accent);
  color: #fff;
}

.faq_chip--active .faq_chip_count {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
}

/* ---------- Sorular ---------- */
.faq_group + .faq_group {
  margin-top: 2.25rem;
}

.faq_group_head {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.9rem;
}

.faq_group_icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--faq-accent-soft);
  color: var(--faq-accent);
  font-size: 1.05rem;
}

.faq_group_title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--faq-ink);
}

.faq_group_count {
  margin-inline-start: auto;
  color: var(--faq-muted);
  font-size: 13px;
}

.faq_items {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.faq_item {
  border: 1px solid var(--faq-line);
  border-radius: 14px;
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.faq_item:hover {
  border-color: #cfd6e1;
}

.faq_item--open {
  border-color: rgba(30, 88, 196, 0.35);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.07);
}

.faq_q {
  margin: 0;
  font-size: inherit;
}

.faq_q_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.05rem 1.25rem;
  border: 0;
  background: transparent;
  color: var(--faq-ink);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.45;
  text-align: start;
}

.faq_q_btn:focus-visible {
  outline: 2px solid var(--faq-accent);
  outline-offset: -2px;
  border-radius: 14px;
}

.faq_item--open .faq_q_btn {
  color: var(--faq-accent);
}

.faq_q_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #4b5563;
  transition: transform 0.25s ease, background-color 0.2s ease, color 0.2s ease;
}

.faq_item--open .faq_q_icon {
  transform: rotate(45deg);
  background: var(--faq-accent);
  color: #fff;
}

/* Yumusak acilma: icerik DOM'da kalir (SEO), yukseklik grid ile animasyonlu */
.faq_a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s ease;
}

.faq_item--open .faq_a {
  grid-template-rows: 1fr;
}

.faq_a_inner {
  overflow: hidden;
  padding: 0 1.25rem;
  color: #4b5563;
  font-size: 14.5px;
  line-height: 1.7;
  visibility: hidden;
  transition: padding 0.28s ease, visibility 0.28s;
}

.faq_item--open .faq_a_inner {
  padding: 0 1.25rem 1.15rem;
  visibility: visible;
}

.faq_a_text {
  margin: 0;
}

.faq_a_list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.faq_a_list li {
  position: relative;
  padding-inline-start: 1.1rem;
}

.faq_a_list li + li {
  margin-top: 0.35rem;
}

.faq_a_list li::before {
  content: "";
  position: absolute;
  top: 0.7em;
  inset-inline-start: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--faq-accent);
  opacity: 0.6;
}

.faq_a_list strong {
  color: var(--faq-ink);
}

.faq_empty {
  padding: 3rem 1rem;
  border: 1px dashed #d8dde3;
  border-radius: 14px;
  color: var(--faq-muted);
  text-align: center;
}

.faq_empty > i {
  font-size: 1.75rem;
  color: #c0c6cf;
}

.faq_empty p {
  margin: 0.6rem 0 1rem;
}

/* ---------- Videolar ---------- */
.faq_videos {
  margin-top: 3.5rem;
}

.faq_section_head {
  margin-bottom: 1.25rem;
  text-align: center;
}

.faq_section_title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--faq-ink);
}

.faq_section_title i {
  color: var(--faq-accent);
}

.faq_section_text {
  margin: 0.35rem 0 0;
  color: var(--faq-muted);
  font-size: 14px;
}

.faq_video_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.1rem;
}

.faq_video {
  overflow: hidden;
  border: 1px solid var(--faq-line);
  border-radius: 14px;
  background: #fff;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.faq_video:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.09);
}

.faq_video_frame {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #111827;
}

.faq_video_frame iframe,
.faq_video_thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.faq_video_thumb {
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.faq_video_thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease, opacity 0.2s ease;
}

.faq_video_thumb:hover img {
  transform: scale(1.04);
  opacity: 0.9;
}

.faq_video_play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: var(--faq-accent);
  font-size: 1.8rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
}

.faq_video_thumb:hover .faq_video_play {
  transform: translate(-50%, -50%) scale(1.08);
}

.faq_video_play i {
  margin-inline-start: 3px;
}

.faq_video_title {
  margin: 0;
  padding: 0.85rem 1rem 1rem;
  color: var(--faq-ink);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
}

/* ---------- Iletisim ---------- */
.faq_cta {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-top: 3.5rem;
  padding: 1.6rem 1.75rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #1e3a8a, #1e58c4);
  color: #fff;
}

.faq_cta_icon {
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

.faq_cta_body {
  flex: 1 1 auto;
  min-width: 0;
}

.faq_cta_title {
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.faq_cta_text {
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
}

.faq_btn {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.3rem;
  border: 0;
  border-radius: 10px;
  background: #fff;
  color: var(--faq-accent);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.faq_btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  color: var(--faq-accent);
}

.faq_btn--ghost {
  border: 1px solid var(--faq-line);
  box-shadow: none;
}

@media (max-width: 640px) {
  .faq {
    padding-top: 1rem;
  }

  .faq_hero {
    padding: 1.75rem 1rem 1.5rem;
  }

  .faq_chips {
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin-inline: -1rem;
    padding: 0 1rem 0.25rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .faq_chips::-webkit-scrollbar {
    display: none;
  }

  .faq_chip {
    flex: none;
  }

  .faq_group_count {
    display: none;
  }

  .faq_q_btn {
    padding: 0.95rem 1rem;
    font-size: 14.5px;
  }

  .faq_a_inner,
  .faq_item--open .faq_a_inner {
    padding-inline: 1rem;
  }

  .faq_cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq_a,
  .faq_a_inner,
  .faq_q_icon,
  .faq_video,
  .faq_video_thumb img {
    transition: none;
  }
}
</style>
