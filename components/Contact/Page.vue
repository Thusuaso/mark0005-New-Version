<template>
  <div class="ct" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- Baslik -->
    <header class="ct_hero">
      <span class="ct_eyebrow"><i class="bi-chat-dots" aria-hidden="true"></i>{{ contact.header || t.eyebrow }}</span>
      <h1 class="ct_title">{{ t.title }}</h1>
      <p class="ct_subtitle">{{ t.subtitle }}</p>

      <div class="ct_quick">
        <a v-for="mail in EMAILS" :key="mail" :href="`mailto:${mail}`" class="ct_quick_btn">
          <span class="ct_quick_icon"><i class="bi-envelope" aria-hidden="true"></i></span>
          <span class="ct_quick_body">
            <span class="ct_quick_label">{{ t.email_us }}</span>
            <span class="ct_quick_value" dir="ltr">{{ mail }}</span>
          </span>
        </a>
        <a v-if="primary" :href="waLink(primary)" target="_blank" rel="noopener" class="ct_quick_btn ct_quick_btn--wa">
          <span class="ct_quick_icon"><i class="bi-whatsapp" aria-hidden="true"></i></span>
          <span class="ct_quick_body">
            <span class="ct_quick_label">WhatsApp</span>
            <span class="ct_quick_value" dir="ltr">{{ primary.whatsapp }}</span>
          </span>
        </a>
      </div>
    </header>

    <div class="ct_grid">
      <!-- Form -->
      <section class="ct_card ct_form">
        <div class="ct_card_head">
          <span class="ct_card_icon" aria-hidden="true"><i class="bi-send"></i></span>
          <div>
            <h2 class="ct_h2">{{ t.form_title }}</h2>
            <p class="ct_card_text">{{ t.form_text }}</p>
          </div>
        </div>
        <ContactForm :form="contact.form" />
      </section>

      <!-- Ofis -->
      <aside class="ct_side">
        <section class="ct_card ct_office">
          <div class="ct_map">
            <iframe
              :src="MAP_EMBED"
              :title="t.office_title"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>
          <div class="ct_office_body">
            <div>
              <h2 class="ct_h2 ct_h2--sm">{{ t.office_title }}</h2>
              <p class="ct_card_text"><i class="bi-geo-alt-fill" aria-hidden="true"></i>{{ t.office_location }}</p>
            </div>
            <a :href="MAP_DIRECTIONS" target="_blank" rel="noopener" class="ct_btn ct_btn--ghost">
              <i class="bi-sign-turn-right" aria-hidden="true"></i>{{ t.directions }}
            </a>
          </div>
        </section>
      </aside>
    </div>

    <!-- ABD -->
    <NuxtLink :to="usaLink" class="ct_usa">
      <span class="ct_usa_icon" aria-hidden="true"><i class="bi-truck"></i></span>
      <span class="ct_usa_body">
        <strong>{{ t.usa_title }}</strong>
        <span>{{ t.usa_text }}</span>
      </span>
      <i class="ct_usa_arrow" :class="isRtl ? 'bi-arrow-left' : 'bi-arrow-right'" aria-hidden="true"></i>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const EMAILS = ["export@mekmar.com", "export1@mekmar.com"];
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.041530640287!2d29.152639399999998!3d37.8124962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c7166da9d086c3%3A0x18ebec808bb03a9!2sMekmar!5e0!3m2!1str!2str!4v1766650735033!5m2!1str!2str";
const MAP_DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=37.8124962,29.1526394";

const texts: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    email_us: string;
    form_title: string;
    form_text: string;
    office_title: string;
    office_location: string;
    directions: string;
    usa_title: string;
    usa_text: string;
  }
> = {
  en: {
    eyebrow: "Contact",
    title: "Let's talk about your project",
    subtitle: "Questions about products, prices, samples or shipping? Send us a message or reach our sales team directly.",
    email_us: "Email us",
    form_title: "Send us a message",
    form_text: "Fill in the form and our sales team will get back to you by email.",
    office_title: "Head office",
    office_location: "Denizli, Turkey",
    directions: "Get directions",
    usa_title: "Located in the USA?",
    usa_text: "Contact Mekmar USA for ready stock and fast delivery from our Atlanta warehouse.",
  },
  fr: {
    eyebrow: "Contact",
    title: "Parlons de votre projet",
    subtitle:
      "Des questions sur nos produits, prix, échantillons ou la livraison ? Envoyez-nous un message ou contactez directement notre équipe commerciale.",
    email_us: "Écrivez-nous",
    form_title: "Envoyez-nous un message",
    form_text: "Remplissez le formulaire, notre équipe commerciale vous répondra par e-mail.",
    office_title: "Siège social",
    office_location: "Denizli, Turquie",
    directions: "Itinéraire",
    usa_title: "Vous êtes aux États-Unis ?",
    usa_text: "Contactez Mekmar USA pour du stock disponible et une livraison rapide depuis notre entrepôt d'Atlanta.",
  },
  es: {
    eyebrow: "Contacto",
    title: "Hablemos de su proyecto",
    subtitle:
      "¿Preguntas sobre productos, precios, muestras o envíos? Envíenos un mensaje o contacte directamente con nuestro equipo de ventas.",
    email_us: "Escríbanos",
    form_title: "Envíenos un mensaje",
    form_text: "Complete el formulario y nuestro equipo de ventas le responderá por correo.",
    office_title: "Oficina central",
    office_location: "Denizli, Turquía",
    directions: "Cómo llegar",
    usa_title: "¿Está en EE. UU.?",
    usa_text: "Contacte con Mekmar USA para stock disponible y entrega rápida desde nuestro almacén de Atlanta.",
  },
  ru: {
    eyebrow: "Контакты",
    title: "Давайте обсудим ваш проект",
    subtitle:
      "Вопросы о продукции, ценах, образцах или доставке? Напишите нам или свяжитесь напрямую с отделом продаж.",
    email_us: "Напишите нам",
    form_title: "Отправьте сообщение",
    form_text: "Заполните форму, и наш отдел продаж ответит вам по электронной почте.",
    office_title: "Головной офис",
    office_location: "Денизли, Турция",
    directions: "Проложить маршрут",
    usa_title: "Вы в США?",
    usa_text: "Свяжитесь с Mekmar USA — товар в наличии и быстрая доставка со склада в Атланте.",
  },
  ar: {
    eyebrow: "اتصل بنا",
    title: "لنتحدث عن مشروعك",
    subtitle: "هل لديك أسئلة حول المنتجات أو الأسعار أو العينات أو الشحن؟ أرسل لنا رسالة أو تواصل مباشرة مع فريق المبيعات.",
    email_us: "راسلنا",
    form_title: "أرسل لنا رسالة",
    form_text: "املأ النموذج وسيرد عليك فريق المبيعات عبر البريد الإلكتروني.",
    office_title: "المكتب الرئيسي",
    office_location: "دنيزلي، تركيا",
    directions: "الاتجاهات",
    usa_title: "هل أنت في الولايات المتحدة؟",
    usa_text: "تواصل مع ميكمار USA للحصول على مخزون جاهز وتوصيل سريع من مستودعنا في أتلانتا.",
  },
};

const store = useStore();
const lang = (store.getLang in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";
const usaLink = lang === "en" ? "/usa/contact" : `/${lang}/usa/contact`;

const contact = store.getContact as { header?: string; items?: any[]; form: Record<string, string> };
const team = (contact?.items ?? []).filter((p) => p?.name);
const primary = team[0];

/* wa.me hem mobilde uygulamayi hem masaustunde web'i acar */
function waLink(p: any) {
  const digits = String(p?.whatsapp ?? "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : p?.watsappLink;
}
</script>

<style scoped>
.ct {
  --ct-accent: #1e58c4;
  --ct-accent-soft: rgba(30, 88, 196, 0.08);
  --ct-ink: #111827;
  --ct-muted: #6b7280;
  --ct-line: #e5e7eb;
  --ct-wa: #1da851;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  color: var(--ct-ink);
  text-align: start;
}

/* Baslik */
.ct_hero {
  padding: 2.5rem 1.5rem 2rem;
  border: 1px solid #e6ecf7;
  border-radius: 20px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(30, 88, 196, 0.12), transparent 55%),
    linear-gradient(180deg, #f5f8ff, #ffffff);
  text-align: center;
}

.ct_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--ct-accent-soft);
  color: var(--ct-accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ct_title {
  margin: 0.9rem 0 0.6rem;
  color: var(--ct-ink);
  font-size: clamp(1.6rem, 3.5vw, 2.35rem);
  font-weight: 700;
  line-height: 1.2;
}

.ct_subtitle {
  max-width: 640px;
  margin: 0 auto;
  color: var(--ct-muted);
  font-size: 15px;
  line-height: 1.6;
}

.ct_quick {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.ct_quick_btn {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 240px;
  padding: 0.7rem 1.1rem 0.7rem 0.75rem;
  border: 1px solid var(--ct-line);
  border-radius: 14px;
  background: #fff;
  color: var(--ct-ink);
  text-decoration: none;
  text-align: start;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.ct[dir="rtl"] .ct_quick_btn {
  padding: 0.7rem 0.75rem 0.7rem 1.1rem;
}

.ct_quick_btn:hover {
  border-color: rgba(30, 88, 196, 0.45);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  transform: translateY(-2px);
  color: var(--ct-ink);
}

.ct_quick_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--ct-accent);
  color: #fff;
  font-size: 1.15rem;
}

.ct_quick_btn--wa .ct_quick_icon {
  background: var(--ct-wa);
}

.ct_quick_btn--wa:hover {
  border-color: rgba(29, 168, 81, 0.5);
}

.ct_quick_body {
  display: flex;
  flex-direction: column;
}

.ct_quick_label {
  color: var(--ct-muted);
  font-size: 12px;
}

.ct_quick_value {
  color: var(--ct-ink);
  font-size: 14.5px;
  font-weight: 700;
}

/* Izgara */
.ct_grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
  margin-top: 1.75rem;
}

.ct_card {
  padding: 1.5rem;
  border: 1px solid var(--ct-line);
  border-radius: 16px;
  background: #fff;
}

.ct_form {
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

.ct_card_head {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.25rem;
}

.ct_card_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--ct-accent-soft);
  color: var(--ct-accent);
  font-size: 1.1rem;
}

.ct_h2 {
  margin: 0;
  color: var(--ct-ink);
  font-size: 1.2rem;
  font-weight: 700;
}

.ct_h2--sm {
  font-size: 1.05rem;
}

.ct_card_text {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.2rem 0 0;
  color: var(--ct-muted);
  font-size: 13.5px;
  line-height: 1.5;
}

.ct_card_text i {
  color: var(--ct-accent);
}

.ct_side {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Ofis */
.ct_office {
  overflow: hidden;
  padding: 0;
}

.ct_map {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #e5e7eb;
}

.ct_map iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.ct_office_body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.1rem 1.5rem 1.3rem;
}

.ct_btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  background: #fff;
  color: var(--ct-accent);
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.ct_btn--ghost {
  border: 1px solid var(--ct-line);
}

.ct_btn--ghost:hover {
  border-color: var(--ct-accent);
  background: var(--ct-accent);
  color: #fff;
}

/* ABD */
.ct_usa {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.75rem;
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #1e3a8a, #1e58c4);
  color: #fff;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ct_usa:hover {
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(30, 58, 138, 0.3);
}

.ct_usa_icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 1.4rem;
}

.ct_usa_body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
}

.ct_usa_body strong {
  font-size: 1.05rem;
}

.ct_usa_body span {
  color: rgba(255, 255, 255, 0.82);
  font-size: 13.5px;
}

.ct_usa_arrow {
  flex: none;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.ct_usa:hover .ct_usa_arrow {
  transform: translateX(4px);
}

.ct[dir="rtl"] .ct_usa:hover .ct_usa_arrow {
  transform: translateX(-4px);
}

@media (max-width: 991.98px) {
  .ct_grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 575.98px) {
  .ct_hero {
    padding: 1.75rem 1rem 1.5rem;
  }

  .ct_quick_btn {
    flex: 1 1 100%;
    min-width: 0;
  }

  .ct_card {
    padding: 1.15rem;
  }

  .ct_office {
    padding: 0;
  }

  .ct_office_body {
    padding: 1rem 1.15rem 1.15rem;
  }
}
</style>
