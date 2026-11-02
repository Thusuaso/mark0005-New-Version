<script setup lang="ts">
/**
 * components/Home/Cta.vue
 *
 * Ana sayfanin kapanis bandi. Temanin koyu bolum dili (--mk-ink zemin),
 * dev display baslik, iki pill buton.
 *
 * Linkler store'daki `navbar_links`'ten geliyor, yani dil oneki ve katalog
 * PDF'inin adresi tek yerden yonetiliyor.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<
  Lang,
  { eyebrow: string; title: string; line2: string; lede: string; primary: string; secondary: string }
> = {
  en: {
    eyebrow: "Next step",
    title: "Let's talk",
    line2: "about stone",
    lede: "Send a drawing, a reference photo or just a material name. We quote within one business day.",
    primary: "Get in touch",
    secondary: "Download catalogue",
  },
  fr: {
    eyebrow: "Prochaine étape",
    title: "Parlons",
    line2: "de la pierre",
    lede: "Envoyez un plan, une photo de référence ou simplement un nom de matériau. Devis en un jour ouvré.",
    primary: "Nous contacter",
    secondary: "Télécharger le catalogue",
  },
  es: {
    eyebrow: "Siguiente paso",
    title: "Hablemos",
    line2: "de piedra",
    lede: "Envíe un plano, una foto de referencia o solo el nombre de un material. Cotizamos en un día laborable.",
    primary: "Contáctenos",
    secondary: "Descargar catálogo",
  },
  ru: {
    eyebrow: "Следующий шаг",
    title: "Поговорим",
    line2: "о камне",
    lede: "Пришлите чертёж, референс или просто название материала. Расчёт в течение рабочего дня.",
    primary: "Связаться с нами",
    secondary: "Скачать каталог",
  },
  ar: {
    eyebrow: "الخطوة التالية",
    title: "لنتحدث",
    line2: "عن الحجر",
    lede: "أرسل مخططاً أو صورة مرجعية أو اسم المادة فقط. نرسل العرض خلال يوم عمل واحد.",
    primary: "تواصل معنا",
    secondary: "تنزيل الكتالوج",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const links = store.getNavbarLinks as Record<string, string>;
const contactLink = computed(() => links.contact ?? "/contact");
const catalogLink = computed(() => links.catalog ?? "/catalog");

const { el, shown } = useReveal();
</script>

<template>
  <section
    ref="el"
    class="cta"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="cta-title"
  >
    <div class="cta__inner">
      <UiSectionHead
        class="cta__head"
        :eyebrow="t.eyebrow"
        :title="t.title"
        :line2="t.line2"
        size="lg"
        as="h2"
        invert
      />

      <div class="cta__foot">
        <p class="cta__lede">{{ t.lede }}</p>

        <div class="cta__actions">
          <UiBtn :label="t.primary" :to="contactLink" variant="white" />
          <!-- Katalog bir PDF (cdn.mekmarimage.com); ic yonlendirici ile
               degil dogrudan acilmasi gerekiyor — UiBtn `href` verildiginde
               <a> uretiyor ve dis adresi yeni sekmede aciyor. -->
          <UiBtn :label="t.secondary" :href="catalogLink" variant="blur" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-ink);
  color: var(--mk-cream);
  opacity: 0;
  transition: opacity 0.8s var(--mk-ease);
}

.cta.is-in {
  opacity: 1;
}

.cta__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

.cta__head {
  margin-bottom: clamp(2rem, 5vw, 3.75rem);
}

.cta__foot {
  display: grid;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: end;
}

@media (min-width: 56rem) {
  .cta__foot {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}

.cta__lede {
  max-width: 34rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(247, 243, 233, 0.7);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .cta {
    transition: none;
    opacity: 1;
  }
}
</style>
