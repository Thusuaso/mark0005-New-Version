<template>
  <div class="fab" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- Baslik -->
    <header class="fab_hero">
      <span class="fab_eyebrow"><i class="bi-gear-wide-connected" aria-hidden="true"></i>{{ t.eyebrow }}</span>
      <h1 class="fab_title">{{ t.title }}</h1>
      <p class="fab_subtitle">{{ t.subtitle }}</p>

      <ul class="fab_stats">
        <li v-for="s in t.stats" :key="s.label" class="fab_stat">
          <span class="fab_stat_icon" aria-hidden="true"><i :class="s.icon"></i></span>
          <span>
            <strong class="fab_stat_value">{{ s.value }}</strong>
            <span class="fab_stat_label">{{ s.label }}</span>
          </span>
        </li>
      </ul>
    </header>

    <!-- Surec: ocak -> fabrika -> depo -->
    <nav class="fab_steps" aria-label="Fabrication process">
      <a
        v-for="(sec, i) in sections"
        :key="sec.id"
        :href="`#section-${sec.key}`"
        class="fab_step"
        @click.prevent="scrollToSection(sec.key)"
      >
        <span class="fab_step_no">{{ String(i + 1).padStart(2, "0") }}</span>
        <span class="fab_step_icon" aria-hidden="true"><i :class="sec.icon"></i></span>
        <span class="fab_step_body">
          <strong>{{ sec.title }}</strong>
          <span>{{ sec.short }}</span>
        </span>
        <i v-if="i < sections.length - 1" class="fab_step_arrow" :class="isRtl ? 'bi-chevron-left' : 'bi-chevron-right'" aria-hidden="true"></i>
      </a>
    </nav>

    <!-- Bolumler -->
    <SharedFancybox :options="{ Carousel: { transition: 'slide' } }">
      <section v-for="(sec, i) in sections" :id="`section-${sec.key}`" :key="sec.id" class="fab_section">
        <div class="fab_section_head">
          <span class="fab_section_no">{{ String(i + 1).padStart(2, "0") }}</span>
          <div>
            <h2 class="fab_section_title">{{ sec.title }}</h2>
            <p class="fab_section_text">{{ sec.text }}</p>
          </div>
        </div>

        <div class="fab_gallery">
          <a
            v-for="img in sec.images"
            :key="img.id"
            :href="img.image"
            class="fab_photo"
            :data-fancybox="`fab_${sec.key}`"
            :data-caption="img.title"
          >
            <img :src="img.image" :alt="img.title" loading="lazy" />
            <span class="fab_photo_zoom" aria-hidden="true"><i class="bi-arrows-fullscreen"></i></span>
            <span class="fab_photo_caption">{{ img.title }}</span>
          </a>
        </div>
      </section>
    </SharedFancybox>

    <!-- Iletisim cagrisi -->
    <section class="fab_cta">
      <div class="fab_cta_icon" aria-hidden="true"><i class="bi-rulers"></i></div>
      <div class="fab_cta_body">
        <h2 class="fab_cta_title">{{ t.cta_title }}</h2>
        <p class="fab_cta_text">{{ t.cta_text }}</p>
      </div>
      <NuxtLink :to="contactLink" class="fab_btn">
        {{ t.cta_button }}<i :class="isRtl ? 'bi-arrow-left' : 'bi-arrow-right'" aria-hidden="true"></i>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";
type SectionKey = "quarries" | "factories" | "warehouse";
type SectionText = { title: string; short: string; text: string };

const texts: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: { icon: string; value: string; label: string }[];
    sections: Record<SectionKey, SectionText>;
    cta_title: string;
    cta_text: string;
    cta_button: string;
  }
> = {
  en: {
    eyebrow: "Fabrication",
    title: "From Quarry to Your Project",
    subtitle:
      "We work hand in hand with selected quarries and factories in Turkey, and keep ready stock in the USA — so every stone is sourced, cut and delivered under our control.",
    stats: [
      { icon: "bi-calendar-check", value: "Since 2002", label: "Natural stone experience" },
      { icon: "bi-patch-check", value: "30,000 m²", label: "Quality-controlled monthly" },
      { icon: "bi-globe2", value: "Worldwide", label: "Shipping & ready stock in Atlanta" },
    ],
    sections: {
      quarries: {
        title: "Quarries We Work With",
        short: "Selected blocks",
        text: "Marble and travertine blocks are selected directly at the source for consistent colour, veining and quality.",
      },
      factories: {
        title: "Factories We Work With",
        short: "Precision processing",
        text: "Modern production lines — epoxy, CNC cutting and custom processing — turn raw blocks into finished products.",
      },
      warehouse: {
        title: "Our USA Warehouse",
        short: "Ready stock",
        text: "Samples, available stock and special orders ready to ship from our warehouse in the United States.",
      },
    },
    cta_title: "Have a custom project in mind?",
    cta_text: "Tell us your sizes and finishes — our team will prepare a tailored fabrication offer.",
    cta_button: "Contact Us",
  },
  fr: {
    eyebrow: "Fabrication",
    title: "De la carrière à votre projet",
    subtitle:
      "Nous travaillons main dans la main avec des carrières et des usines sélectionnées en Turquie, et disposons d'un stock aux États-Unis — chaque pierre est extraite, taillée et livrée sous notre contrôle.",
    stats: [
      { icon: "bi-calendar-check", value: "Depuis 2002", label: "D'expérience en pierre naturelle" },
      { icon: "bi-patch-check", value: "30 000 m²", label: "Contrôlés chaque mois" },
      { icon: "bi-globe2", value: "Monde entier", label: "Expédition et stock à Atlanta" },
    ],
    sections: {
      quarries: {
        title: "Nos carrières partenaires",
        short: "Blocs sélectionnés",
        text: "Les blocs de marbre et de travertin sont sélectionnés directement à la source pour une couleur, un veinage et une qualité constants.",
      },
      factories: {
        title: "Nos usines partenaires",
        short: "Transformation précise",
        text: "Des lignes de production modernes — époxy, découpe CNC et façonnage sur mesure — transforment les blocs bruts en produits finis.",
      },
      warehouse: {
        title: "Notre entrepôt aux États-Unis",
        short: "Stock disponible",
        text: "Échantillons, stock disponible et commandes spéciales prêts à être expédiés depuis notre entrepôt aux États-Unis.",
      },
    },
    cta_title: "Vous avez un projet sur mesure ?",
    cta_text: "Indiquez-nous vos dimensions et finitions — notre équipe préparera une offre de fabrication adaptée.",
    cta_button: "Contactez-nous",
  },
  es: {
    eyebrow: "Fabricación",
    title: "De la cantera a su proyecto",
    subtitle:
      "Trabajamos de la mano con canteras y fábricas seleccionadas en Turquía y mantenemos stock en EE. UU., para que cada piedra se extraiga, corte y entregue bajo nuestro control.",
    stats: [
      { icon: "bi-calendar-check", value: "Desde 2002", label: "De experiencia en piedra natural" },
      { icon: "bi-patch-check", value: "30.000 m²", label: "Controlados cada mes" },
      { icon: "bi-globe2", value: "Todo el mundo", label: "Envíos y stock en Atlanta" },
    ],
    sections: {
      quarries: {
        title: "Canteras con las que trabajamos",
        short: "Bloques seleccionados",
        text: "Los bloques de mármol y travertino se seleccionan directamente en origen para garantizar color, veteado y calidad uniformes.",
      },
      factories: {
        title: "Fábricas con las que trabajamos",
        short: "Procesado de precisión",
        text: "Líneas de producción modernas — epoxi, corte CNC y procesado a medida — convierten los bloques en productos terminados.",
      },
      warehouse: {
        title: "Nuestro almacén en EE. UU.",
        short: "Stock disponible",
        text: "Muestras, stock disponible y pedidos especiales listos para enviar desde nuestro almacén en Estados Unidos.",
      },
    },
    cta_title: "¿Tiene un proyecto a medida?",
    cta_text: "Indíquenos medidas y acabados; nuestro equipo preparará una oferta de fabricación personalizada.",
    cta_button: "Contáctenos",
  },
  ru: {
    eyebrow: "Производство",
    title: "От карьера до вашего проекта",
    subtitle:
      "Мы работаем с отобранными карьерами и заводами в Турции и держим склад в США — каждый камень добывается, обрабатывается и доставляется под нашим контролем.",
    stats: [
      { icon: "bi-calendar-check", value: "С 2002 года", label: "Опыт работы с натуральным камнем" },
      { icon: "bi-patch-check", value: "30 000 м²", label: "Контроль качества ежемесячно" },
      { icon: "bi-globe2", value: "По всему миру", label: "Доставка и склад в Атланте" },
    ],
    sections: {
      quarries: {
        title: "Карьеры, с которыми мы работаем",
        short: "Отобранные блоки",
        text: "Блоки мрамора и травертина отбираются прямо на месте добычи — для стабильного цвета, рисунка и качества.",
      },
      factories: {
        title: "Заводы, с которыми мы работаем",
        short: "Точная обработка",
        text: "Современные производственные линии — эпоксидная обработка, резка на ЧПУ и индивидуальная обработка — превращают блоки в готовую продукцию.",
      },
      warehouse: {
        title: "Наш склад в США",
        short: "Товар в наличии",
        text: "Образцы, товар в наличии и специальные заказы готовы к отправке с нашего склада в США.",
      },
    },
    cta_title: "Есть индивидуальный проект?",
    cta_text: "Сообщите размеры и виды обработки — наша команда подготовит персональное предложение.",
    cta_button: "Связаться с нами",
  },
  ar: {
    eyebrow: "التصنيع",
    title: "من المحجر إلى مشروعك",
    subtitle:
      "نعمل جنبًا إلى جنب مع محاجر ومصانع مختارة في تركيا، ونحتفظ بمخزون جاهز في الولايات المتحدة — ليتم استخراج كل حجر وتقطيعه وتسليمه تحت إشرافنا.",
    stats: [
      { icon: "bi-calendar-check", value: "منذ 2002", label: "خبرة في الحجر الطبيعي" },
      { icon: "bi-patch-check", value: "30,000 م²", label: "فحص جودة شهريًا" },
      { icon: "bi-globe2", value: "حول العالم", label: "شحن ومخزون جاهز في أتلانتا" },
    ],
    sections: {
      quarries: {
        title: "المحاجر التي نعمل معها",
        short: "كتل مختارة",
        text: "يتم اختيار كتل الرخام والترافرتين مباشرة من المصدر لضمان ثبات اللون والعروق والجودة.",
      },
      factories: {
        title: "المصانع التي نعمل معها",
        short: "معالجة دقيقة",
        text: "خطوط إنتاج حديثة — الإيبوكسي والقص بالـ CNC والمعالجة حسب الطلب — تحوّل الكتل الخام إلى منتجات نهائية.",
      },
      warehouse: {
        title: "مستودعنا في الولايات المتحدة",
        short: "مخزون جاهز",
        text: "عينات ومخزون متوفر وطلبات خاصة جاهزة للشحن من مستودعنا في الولايات المتحدة.",
      },
    },
    cta_title: "هل لديك مشروع حسب الطلب؟",
    cta_text: "أخبرنا بالمقاسات والتشطيبات — وسيُعدّ فريقنا عرض تصنيع مخصصًا لك.",
    cta_button: "تواصل معنا",
  },
};

const store = useStore();
const lang = (store.getLang in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";
const contactLink = lang === "en" ? "/contact" : `/${lang}/contact`;

/* Dil dosyasindaki bolumler: id 1 = fabrikalar, 2 = ocaklar, 3 = ABD deposu.
   Surec sirasiyla gosteriyoruz: ocak -> fabrika -> depo */
const meta: Record<number, { key: SectionKey; icon: string; order: number }> = {
  2: { key: "quarries", icon: "bi-minecart-loaded", order: 1 },
  1: { key: "factories", icon: "bi-building-gear", order: 2 },
  3: { key: "warehouse", icon: "bi-box-seam", order: 3 },
};

const fabrication = store.getFabrication as { items?: any[] };
const sections = (fabrication?.items ?? [])
  .filter((item) => meta[item.id])
  .map((item) => ({
    id: item.id,
    ...meta[item.id],
    ...t.sections[meta[item.id].key],
    images: item.images ?? [],
  }))
  .sort((a, b) => a.order - b.order);

/* Adres cubuguna #hash yazmadan kaydir (Fancybox hash ile galeri acmasin) */
function scrollToSection(key: string) {
  document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
.fab {
  --fab-accent: #1e58c4;
  --fab-accent-soft: rgba(30, 88, 196, 0.08);
  --fab-ink: #111827;
  --fab-muted: #6b7280;
  --fab-line: #e5e7eb;
  max-width: 1140px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  color: var(--fab-ink);
  text-align: start;
}

/* ---------- Baslik ---------- */
.fab_hero {
  padding: 2.75rem 1.5rem 2rem;
  border: 1px solid #e6ecf7;
  border-radius: 20px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(30, 88, 196, 0.12), transparent 55%),
    linear-gradient(180deg, #f5f8ff, #ffffff);
  text-align: center;
}

.fab_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--fab-accent-soft);
  color: var(--fab-accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.fab_title {
  margin: 0.9rem 0 0.6rem;
  color: var(--fab-ink);
  font-size: clamp(1.6rem, 3.5vw, 2.35rem);
  font-weight: 700;
  line-height: 1.2;
}

.fab_subtitle {
  max-width: 680px;
  margin: 0 auto;
  color: var(--fab-muted);
  font-size: 15px;
  line-height: 1.65;
}

.fab_stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  max-width: 860px;
  margin: 1.75rem auto 0;
  padding: 0;
  list-style: none;
}

.fab_stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--fab-line);
  border-radius: 14px;
  background: #fff;
  text-align: start;
}

.fab_stat_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--fab-accent-soft);
  color: var(--fab-accent);
  font-size: 1.1rem;
}

.fab_stat_value {
  display: block;
  color: var(--fab-ink);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
}

.fab_stat_label {
  display: block;
  color: var(--fab-muted);
  font-size: 12.5px;
  line-height: 1.35;
}

/* ---------- Surec ---------- */
.fab_steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1.75rem 0 1rem;
}

.fab_step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--fab-line);
  border-radius: 14px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.fab_step:hover {
  border-color: rgba(30, 88, 196, 0.4);
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
  transform: translateY(-2px);
  color: inherit;
}

.fab_step_no {
  position: absolute;
  top: 0.55rem;
  inset-inline-end: 0.8rem;
  color: #d1d5db;
  font-size: 12px;
  font-weight: 700;
}

.fab_step_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--fab-accent);
  color: #fff;
  font-size: 1.2rem;
}

.fab_step_body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.fab_step_body strong {
  color: var(--fab-ink);
  font-size: 14px;
  line-height: 1.3;
}

.fab_step_body span {
  color: var(--fab-muted);
  font-size: 12.5px;
}

.fab_step_arrow {
  position: absolute;
  top: 50%;
  inset-inline-end: -0.85rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid var(--fab-line);
  border-radius: 50%;
  background: #fff;
  color: var(--fab-accent);
  font-size: 12px;
  transform: translateY(-50%);
}

/* ---------- Bolumler ---------- */
.fab_section {
  margin-top: 3rem;
  scroll-margin-top: 90px;
}

.fab_section_head {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.fab_section_no {
  flex: none;
  color: var(--fab-accent);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.25;
}

.fab_section_title {
  margin: 0;
  color: var(--fab-ink);
  font-size: 1.45rem;
  font-weight: 700;
}

.fab_section_text {
  max-width: 680px;
  margin: 0.3rem 0 0;
  color: var(--fab-muted);
  font-size: 14.5px;
  line-height: 1.6;
}

/* Bento galeri: ilk fotograf buyuk, digerleri yaninda */
.fab_gallery {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 220px);
  gap: 0.75rem;
}

.fab_photo {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 14px;
  background: #e5e7eb;
  color: #fff;
  text-decoration: none;
}

.fab_photo:first-child {
  grid-row: span 2;
}

.fab_photo:nth-child(4) {
  grid-column: span 2;
}

.fab_photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.fab_photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(10, 15, 30, 0.72));
  transition: opacity 0.3s ease;
}

.fab_photo:hover img {
  transform: scale(1.05);
}

.fab_photo_caption {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  z-index: 1;
  padding: 0.9rem 1rem;
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.35;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.fab_photo:first-child .fab_photo_caption {
  padding: 1.2rem 1.3rem;
  font-size: 17px;
}

.fab_photo_zoom {
  position: absolute;
  top: 0.75rem;
  inset-inline-end: 0.75rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--fab-accent);
  font-size: 13px;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fab_photo:hover .fab_photo_zoom,
.fab_photo:focus-visible .fab_photo_zoom {
  opacity: 1;
  transform: scale(1);
}

.fab_photo:focus-visible {
  outline: 3px solid var(--fab-accent);
  outline-offset: 2px;
}

/* ---------- Iletisim ---------- */
.fab_cta {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-top: 3.5rem;
  padding: 1.6rem 1.75rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #1e3a8a, #1e58c4);
  color: #fff;
}

.fab_cta_icon {
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

.fab_cta_body {
  flex: 1 1 auto;
  min-width: 0;
}

.fab_cta_title {
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.fab_cta_text {
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
}

.fab_btn {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.3rem;
  border-radius: 10px;
  background: #fff;
  color: var(--fab-accent);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.fab_btn:hover {
  color: var(--fab-accent);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

/* ---------- Duyarli ---------- */
@media (max-width: 991.98px) {
  .fab_gallery {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 280px repeat(2, 180px);
  }

  .fab_photo:first-child {
    grid-column: span 2;
    grid-row: auto;
  }

  .fab_photo:nth-child(4) {
    grid-column: span 2;
  }
}

@media (max-width: 767.98px) {
  .fab_stats,
  .fab_steps {
    grid-template-columns: minmax(0, 1fr);
  }

  .fab_step_arrow {
    top: auto;
    bottom: -0.85rem;
    inset-inline-end: auto;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }

  .fab[dir="rtl"] .fab_step_arrow {
    transform: translateX(-50%) rotate(-90deg);
  }

  .fab_section {
    margin-top: 2.25rem;
  }

  .fab_section_no {
    font-size: 1.75rem;
  }

  .fab_section_title {
    font-size: 1.2rem;
  }

  .fab_gallery {
    grid-template-rows: 220px repeat(2, 140px);
    gap: 0.5rem;
  }

  .fab_photo_caption {
    padding: 0.6rem 0.7rem;
    font-size: 13px;
  }

  .fab_photo_zoom {
    opacity: 1;
    transform: scale(1);
    width: 28px;
    height: 28px;
  }

  .fab_cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.4rem;
  }
}

@media (max-width: 480px) {
  .fab_hero {
    padding: 1.75rem 1rem 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fab_photo img,
  .fab_step,
  .fab_photo_zoom {
    transition: none;
  }
}
</style>
