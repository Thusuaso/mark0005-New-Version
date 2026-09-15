<template>
  <div class="pd" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- Geri + baslik -->
    <NuxtLink :to="projectsLink" class="pd_back">
      <i :class="isRtl ? 'bi-arrow-right' : 'bi-arrow-left'" aria-hidden="true"></i>{{ t.all_projects }}
    </NuxtLink>

    <header class="pd_head">
      <span v-if="country" class="pd_country"><i class="bi-geo-alt-fill" aria-hidden="true"></i>{{ country }}</span>
      <h1 class="pd_title">{{ name }}</h1>
      <ul class="pd_meta">
        <li v-if="photos.length"><i class="bi-images" aria-hidden="true"></i>{{ t.photos(photos.length) }}</li>
        <li v-if="videoId"><i class="bi-play-circle" aria-hidden="true"></i>{{ t.video }}</li>
        <li v-if="stones.length"><i class="bi-gem" aria-hidden="true"></i>{{ stones.length }} {{ t.stones_used.toLocaleLowerCase(lang) }}</li>
      </ul>
    </header>

    <!-- Video / kapak + aciklama -->
    <section class="pd_top" :class="{ 'pd_top--single': !description }">
      <div class="pd_media">
        <template v-if="videoId">
          <iframe
            v-if="playing"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`"
            :title="name"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <button v-else type="button" class="pd_media_btn" :aria-label="`${t.video}: ${name}`" @click="playing = true">
            <img :src="cover" :alt="name" @error="onCoverError" />
            <span class="pd_play" aria-hidden="true"><i class="bi-play-fill"></i></span>
          </button>
        </template>
        <img v-else-if="cover" :src="cover" :alt="name" class="pd_media_img" />
      </div>

      <article v-if="description" class="pd_about">
        <h2 class="pd_h2">{{ t.about }}</h2>
        <div class="pd_about_text" :class="{ 'pd_about_text--clamped': isLong && !expanded }">
          <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
        </div>
        <button v-if="isLong" type="button" class="pd_link" @click="expanded = !expanded">
          {{ expanded ? t.read_less : t.read_more }}
          <i :class="expanded ? 'bi-chevron-up' : 'bi-chevron-down'" aria-hidden="true"></i>
        </button>

        <div v-if="stones.length" class="pd_stones">
          <h3 class="pd_h3">{{ t.stones_used }}</h3>
          <ul>
            <li v-for="s in stones" :key="s"><i class="bi-gem" aria-hidden="true"></i>{{ s }}</li>
          </ul>
        </div>
      </article>
    </section>

    <!-- Galeri -->
    <section v-if="photos.length" class="pd_section">
      <div class="pd_section_head">
        <h2 class="pd_h2">{{ t.gallery }}</h2>
        <span class="pd_section_count">{{ t.photos(photos.length) }}</span>
      </div>
      <SharedFancybox :options="{ Carousel: { transition: 'slide' } }">
        <div class="pd_gallery">
          <a
            v-for="(img, i) in photos"
            :key="img.ID ?? i"
            :href="img.ImageLink"
            class="pd_photo"
            data-fancybox="project"
            :data-caption="img.name || name"
          >
            <img :src="img.ImageLink" :alt="img.name || name" loading="lazy" />
            <span class="pd_photo_zoom" aria-hidden="true"><i class="bi-arrows-fullscreen"></i></span>
            <span v-if="img.name" class="pd_photo_caption">{{ img.name }}</span>
          </a>
        </div>
      </SharedFancybox>
    </section>

    <!-- Benzer projeler -->
    <section v-if="suggested.length" class="pd_section">
      <div class="pd_section_head">
        <h2 class="pd_h2">{{ t.suggested }}</h2>
      </div>
      <div class="pd_suggested">
        <ProjectsTile
          v-for="s in suggested"
          :key="s.SuggestedId ?? s.ID"
          :link="s.link"
          :image="s.Image"
          :name="s.name"
          :country="s.country"
          :cta="t.view_project"
          :rtl="isRtl"
        />
      </div>
    </section>

    <!-- Iletisim -->
    <section class="pd_cta">
      <div class="pd_cta_icon" aria-hidden="true"><i class="bi-compass"></i></div>
      <div class="pd_cta_body">
        <h2 class="pd_cta_title">{{ t.cta_title }}</h2>
        <p class="pd_cta_text">{{ t.cta_text }}</p>
      </div>
      <NuxtLink :to="contactLink" class="pd_btn">
        {{ t.cta_button }}<i :class="isRtl ? 'bi-arrow-left' : 'bi-arrow-right'" aria-hidden="true"></i>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "~/store/index";
import control from "~/lang/control";
import { useProjectTexts } from "~/assets/data/projects/texts";

const store = useStore();
const route = useRoute();
const { lang, t, isRtl, contactLink, projectsLink } = useProjectTexts(store.getLang);

const detail = await $fetch<any>(`/api/projects/detail/${route.params.id}`).catch(() => null);
store.setProjectDetail(detail ?? { photos: [], video: [], description: [], suggested: [] });

const data = store.getProjectDetail as any;
const info = data?.description?.[0] ?? null;

/* Dil alanlari (ProjectName_Fr ...) */
const sfx = lang === "en" ? "" : `_${lang[0].toUpperCase()}${lang[1]}`;
const pick = (obj: any, key: string) => (obj?.[`${key}${sfx}`] || obj?.[key] || "").toString().trim();

const name = pick(info, "ProjectName") || String(route.params.name ?? "").replace(/-/g, " ");
const country = pick(info, "CountryName");
const description = info ? String(control.lang_project_desc(info, lang) || info.ProjectInformation || "").trim() : "";

const paragraphs = description
  .split(/\n+/)
  .map((p) => p.trim())
  .filter(Boolean);
const isLong = description.length > 700;
const expanded = ref(false);

const photos = control.lang_project_detail_photos(data?.photos ?? [], lang) as any[];
const stones = [...new Set(photos.map((p) => String(p.name ?? "").trim()).filter(Boolean))];
const suggested = control.lang_project(data?.suggested ?? [], lang) as any[];

/* Video: embed linkinden YouTube kimligini cikar */
const rawVideo = String(data?.video?.[0]?.VideosLink ?? "");
const videoId = rawVideo.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{6,})/)?.[1] ?? "";
const playing = ref(false);

const cover = ref(videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : photos[0]?.ImageLink ?? "");
function onCoverError() {
  if (cover.value.includes("maxresdefault")) cover.value = cover.value.replace("maxresdefault", "hqdefault");
}

useHead({ title: country ? `${name} - ${country} | Mekmar` : `${name} | Mekmar` });
if (description) useSeoMeta({ description: description.slice(0, 160) });
</script>

<style scoped>
.pd {
  --pd-accent: #1e58c4;
  --pd-accent-soft: rgba(30, 88, 196, 0.08);
  --pd-ink: #111827;
  --pd-muted: #6b7280;
  --pd-line: #e5e7eb;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1rem 3rem;
  color: var(--pd-ink);
  text-align: start;
}

.pd_back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--pd-muted);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.pd_back:hover {
  color: var(--pd-accent);
}

/* Baslik */
.pd_head {
  margin: 0.9rem 0 1.5rem;
}

.pd_country {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: var(--pd-accent-soft);
  color: var(--pd-accent);
  font-size: 12.5px;
  font-weight: 600;
}

.pd_title {
  margin: 0.6rem 0 0.5rem;
  color: var(--pd-ink);
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 700;
  line-height: 1.2;
}

.pd_meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  margin: 0;
  padding: 0;
  color: var(--pd-muted);
  font-size: 13.5px;
  list-style: none;
}

.pd_meta li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.pd_meta i {
  color: var(--pd-accent);
}

/* Video + aciklama */
.pd_top {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.pd_top--single {
  grid-template-columns: minmax(0, 1fr);
}

.pd_media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  background: #0f172a;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.16);
}

.pd_media iframe,
.pd_media_btn,
.pd_media_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.pd_media_btn {
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.pd_media_btn img,
.pd_media_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pd_media_btn img {
  opacity: 0.92;
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.pd_media_btn:hover img {
  opacity: 1;
  transform: scale(1.03);
}

.pd_play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: var(--pd-accent);
  font-size: 2.4rem;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.pd_play i {
  margin-left: 4px;
}

.pd_media_btn:hover .pd_play {
  transform: translate(-50%, -50%) scale(1.08);
  background: var(--pd-accent);
  color: #fff;
}

.pd_about {
  padding: 1.5rem;
  border: 1px solid var(--pd-line);
  border-radius: 16px;
  background: #fff;
}

.pd_h2 {
  margin: 0;
  color: var(--pd-ink);
  font-size: 1.25rem;
  font-weight: 700;
}

.pd_h3 {
  margin: 0 0 0.6rem;
  color: var(--pd-ink);
  font-size: 0.95rem;
  font-weight: 700;
}

.pd_about_text {
  position: relative;
  margin-top: 0.75rem;
  color: #4b5563;
  font-size: 14.5px;
  line-height: 1.75;
}

.pd_about_text p {
  margin: 0 0 0.75rem;
}

.pd_about_text p:last-child {
  margin-bottom: 0;
}

.pd_about_text--clamped {
  max-height: 15.5em;
  overflow: hidden;
}

.pd_about_text--clamped::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 4.5em;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff);
}

.pd_link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.6rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--pd-accent);
  font-size: 14px;
  font-weight: 600;
}

.pd_stones {
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--pd-line);
}

.pd_stones ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pd_stones li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid #dbe4f5;
  border-radius: 999px;
  background: #f5f8ff;
  color: #1f2937;
  font-size: 13px;
  font-weight: 600;
}

.pd_stones li i {
  color: var(--pd-accent);
  font-size: 11px;
}

/* Bolumler */
.pd_section {
  margin-top: 3rem;
}

.pd_section_head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.pd_section_count {
  color: var(--pd-muted);
  font-size: 13px;
}

.pd_gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: 220px;
  gap: 0.75rem;
}

.pd_photo {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 14px;
  background: #e5e7eb;
  color: #fff;
  text-decoration: none;
}

.pd_photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.pd_photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(10, 15, 30, 0.7));
}

.pd_photo:hover img {
  transform: scale(1.05);
}

.pd_photo:focus-visible {
  outline: 3px solid var(--pd-accent);
  outline-offset: 2px;
}

.pd_photo_caption {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  z-index: 1;
  padding: 0.75rem 0.9rem;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.pd_photo_zoom {
  position: absolute;
  top: 0.65rem;
  inset-inline-end: 0.65rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--pd-accent);
  font-size: 12px;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.pd_photo:hover .pd_photo_zoom,
.pd_photo:focus-visible .pd_photo_zoom {
  opacity: 1;
  transform: scale(1);
}

.pd_suggested {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.1rem;
}

/* CTA */
.pd_btn {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.3rem;
  border-radius: 10px;
  background: #fff;
  color: var(--pd-accent);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.pd_btn:hover {
  color: var(--pd-accent);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.pd_cta {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-top: 3.5rem;
  padding: 1.6rem 1.75rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #1e3a8a, #1e58c4);
  color: #fff;
}

.pd_cta_icon {
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

.pd_cta_body {
  flex: 1 1 auto;
  min-width: 0;
}

.pd_cta_title {
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.pd_cta_text {
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
}

@media (max-width: 991.98px) {
  .pd_top {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 767.98px) {
  .pd_about {
    padding: 1.1rem;
  }

  .pd_play {
    width: 60px;
    height: 60px;
    font-size: 1.9rem;
  }

  .pd_gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 150px;
    gap: 0.5rem;
  }

  .pd_photo_caption {
    padding: 0.5rem 0.6rem;
    font-size: 12.5px;
  }

  .pd_photo_zoom {
    opacity: 1;
    transform: scale(1);
    width: 26px;
    height: 26px;
  }

  .pd_suggested {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .pd_cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.4rem;
  }
}

@media (max-width: 420px) {
  .pd_suggested {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pd_photo img,
  .pd_media_btn img,
  .pd_play,
  .pd_photo_zoom {
    transition: none;
  }
}
</style>
