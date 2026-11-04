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
  { title: string; line2: string; all: string }
> = {
  en: {
    title: "Featured",
    line2: "products",
    all: "View all projects",
  },
  fr: {
    title: "Produits",
    line2: "en vedette",
    all: "Voir tous les projets",
  },
  es: {
    title: "Productos",
    line2: "destacados",
    all: "Ver todos los proyectos",
  },
  ru: {
    title: "Избранные",
    line2: "товары",
    all: "Все проекты",
  },
  ar: {
    title: "منتجات",
    line2: "مميزة",
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
    /* Vitrinde 6 proje: asagidaki 12 kolonluk dizilim dortluk bir desen
       (genis-dar / dar-genis) ve 6'da ucuncu satir yine genis-dar olarak
       kapaniyor. 5 ya da 7'de son satir yarim kaliyor. */
    .slice(0, 6)
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
          <NuxtLink
            class="work"
            :to="project.link"
            target="_blank"
            rel="noopener"
          >
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

/* --- Dizilim ---
   Bir ustteki Categories bolumu zaten esit hucreli bir izgara (ayni boy
   kart, ayni oran, ayni alt baslik). Projeler de oyle dizilince iki bolum
   ust uste ayni sayfayi iki kez okutuyordu.

   Burada hucreler kasitli olarak esit DEGIL: genis yatay bir kare ile dar
   dikey bir kare donusumlu, ikincisi asagi kaydirilmis. Ayni icerik, baska
   bir ritim. 12 kolonluk izgara yalnizca masaustunde; dar ekranda tek
   kolona dusuyor, orada zaten kaydirma ritmi belirliyor. */
.pj__grid {
  display: grid;
  gap: clamp(2.5rem, 6vw, 4rem) clamp(1rem, 2.5vw, 1.875rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .pj__grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: clamp(1.5rem, 3vw, 3rem);
    row-gap: clamp(3rem, 7vw, 6rem);
  }

  /* Satir 1: genis sol + dar sag (asagi kaydirilmis) */
  .pj__cell:nth-child(4n + 1) {
    grid-column: 1 / span 7;
  }

  .pj__cell:nth-child(4n + 2) {
    grid-column: 9 / span 4;
    margin-top: clamp(3rem, 9vw, 8rem);
  }

  /* Satir 2: dar sol (kaydirilmis) + genis sag — ayna goruntusu */
  .pj__cell:nth-child(4n + 3) {
    grid-column: 2 / span 4;
    margin-top: clamp(1rem, 4vw, 3.5rem);
  }

  .pj__cell:nth-child(4n + 4) {
    grid-column: 7 / span 6;
  }

  /* Dar hucreler dikey, genisler yatay kadrajli. Oranin degismesi iki
     bolumu birbirinden ayiran en gorunur sey. */
  .pj__cell:nth-child(4n + 2) .work__frame,
  .pj__cell:nth-child(4n + 3) .work__frame {
    aspect-ratio: 3 / 4;
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

/* Isim artik gorselin altinda kucuk bir etiket degil, bolumun ikinci
   buyuk puntosu: kart ciftinin ritmini o tasiyor. */
.work__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 1rem;
  padding-top: clamp(1rem, 1.8vw, 1.5rem);
}

.work__name {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-size: clamp(1.375rem, 2.8vw, 2.25rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.015em;
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

/* Onceden 13px, harf arasi acilmis, TUM BUYUK HARF bir mikro-etiketti.
   Ulke adi gercek bir bilgi; okunur puntoda ve kendi yazimiyla duruyor. */
.work__country {
  flex: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--mk-body);
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
