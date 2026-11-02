<script setup lang="ts">
/**
 * components/Home/Projects.vue
 *
 * Temadaki "Selected Works" bolumunun karsiligi: iki kolonlu buyuk gorsel
 * izgarasi, her kartta baslik + ulke ve altinda etiketler.
 *
 * Veri /api/projects/list — gercek referans projeleri (isim her dilde,
 * gorsel CDN'den, link SQL'de uretiliyor). Ana sayfada ilk dort tanesi
 * gosteriliyor; tamami /projects sayfasinda.
 *
 * Not: liste `Queue` alanina gore sirali geliyor, yani vitrine cikacak
 * projeler veritabanindan yonetiliyor — burada sabit id yok.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<
  Lang,
  { eyebrow: string; title: string; line2: string; all: string }
> = {
  en: {
    eyebrow: "Projects",
    title: "Selected works",
    line2: "worldwide ©",
    all: "View all projects",
  },
  fr: {
    eyebrow: "Projets",
    title: "Travaux choisis",
    line2: "dans le monde ©",
    all: "Voir tous les projets",
  },
  es: {
    eyebrow: "Proyectos",
    title: "Obras escogidas",
    line2: "en todo el mundo ©",
    all: "Ver todos los proyectos",
  },
  ru: {
    eyebrow: "Проекты",
    title: "Избранные работы",
    line2: "по всему миру ©",
    all: "Все проекты",
  },
  ar: {
    eyebrow: "المشاريع",
    title: "أعمال مختارة",
    line2: "حول العالم ©",
    all: "كل المشاريع",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const links = store.getNavbarLinks as Record<string, string>;
const projectsLink = computed(() => links.project ?? "/projects");

/* Dil oneki: link alani SQL'de ingilizce yol olarak uretiliyor. */
const prefix = lang === "en" ? "" : `/${lang}`;

const { data } = await useFetch<any[]>("/api/projects/list", {
  key: "home-projects",
});

/* Ad/ulke alanlari dil basina ayri kolonlarda; burada tek sekle indiriliyor.
   Veritabani bir dilde bos birakilmissa ingilizcesine dusuyor. */
const projects = computed(() => {
  const rows = data.value ?? [];
  const suffix = lang === "en" ? "" : `_${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;

  return rows
    .filter((row) => row?.Image)
    .slice(0, 4)
    .map((row) => ({
      id: row.ID,
      name: String(row[`ProjectName${suffix}`] || row.ProjectName || "").trim(),
      country: String(row[`CountryName${suffix}`] || row.CountryName || "").trim(),
      image: row.Image,
      link: `${prefix}${row.Link}`,
    }));
});

const { el, shown } = useReveal();
</script>

<template>
  <section
    v-if="projects.length"
    ref="el"
    class="pj"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="pj-title"
  >
    <div class="pj__inner">
      <UiSectionHead
        class="pj__head"
        :eyebrow="t.eyebrow"
        :title="t.title"
        :line2="t.line2"
        size="xl"
        as="h2"
      />

      <ul class="pj__grid">
        <li
          v-for="(project, i) of projects"
          :key="project.id"
          class="pj__cell"
          :style="{ '--i': i }"
        >
          <NuxtLink class="work" :to="project.link">
            <div class="work__frame">
              <img
                class="work__img"
                :src="project.image"
                :alt="project.name"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="work__row">
              <h3 class="work__name">
                <span class="work__line">{{ project.name }}</span>
              </h3>
              <span v-if="project.country" class="work__country">{{
                project.country
              }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <div class="pj__action">
        <UiBtn :label="t.all" :to="projectsLink" variant="black" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pj {
  font-family: var(--mk-ff-body);
  /* Temada bu bolumun zemini #f5f5f5; kenardan kenara seriliyor. */
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
}

.pj__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

.pj__head {
  margin-bottom: clamp(2.5rem, 7vw, 6rem);
}

/* --- Izgara: temada iki kolon --- */
.pj__grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 1.875rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .pj__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.pj__cell {
  opacity: 0;
  transform: translateY(1.75rem);
  transition:
    opacity 0.7s var(--mk-ease),
    transform 0.7s var(--mk-ease);
  transition-delay: calc(var(--i) * 90ms);
}

.pj.is-in .pj__cell {
  opacity: 1;
  transform: none;
}

/* --- Kart --- */
.work {
  display: block;
  text-decoration: none;
  color: var(--mk-ink);
}

.work__frame {
  overflow: hidden;
  aspect-ratio: 3 / 2;
  background: var(--mk-cream-2);
}

.work__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.work:hover .work__img,
.work:focus-visible .work__img {
  transform: scale(1.04);
}

.work:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 4px;
}

.work__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.125rem;
}

.work__name {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-size: clamp(1.0625rem, 2vw, 1.5rem);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--mk-ink);
}

.work__line {
  position: relative;
  display: inline-block;
}

.work__line::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: inline-start;
  transition: transform 0.4s var(--mk-ease);
}

.work:hover .work__line::after,
.work:focus-visible .work__line::after {
  transform: scaleX(1);
}

.work__country {
  flex: none;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--mk-grey-2);
}

.pj__action {
  margin-top: clamp(2.5rem, 6vw, 4.375rem);
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .pj__cell,
  .work__img,
  .work__line::after {
    transition: none;
  }

  .pj__cell {
    opacity: 1;
    transform: none;
  }

  .work:hover .work__img,
  .work:focus-visible .work__img {
    transform: none;
  }
}
</style>
