<script lang="ts" setup>
/**
 * Footer bolumu.
 *
 * Stiller global.css icindeki FOOTER bolumunde. Burada scoped stil yok —
 * ikisi arasinda kural tekrari olmasin diye.
 *
 * Zarf ve WhatsApp ikonlari inline SVG; Font Awesome surumune bagli degil.
 * Sosyal ikonlar veriden geldigi icin (social.icon) oldugu gibi birakildi.
 */

import { computed, ref } from "vue";

const props = defineProps<{
  footer: Record<string, any>;
  lang: string;
}>();

/* Dil eki tek yerden uretiliyor; ic ice ternary zincirine gerek yok. */
const descriptionClass = computed(() => `about-description-${props.lang}`);
const valueClass = computed(() => `about-value-${props.lang}`);

/* Rusca'da degerler liste yerine paragraf olarak diziliyor. */
const valuesAsParagraphs = computed(() => props.lang === "ru");

const activeIndex = ref(0);
const displayCustom = ref(false);

const responsiveOptions = ref([
  { breakpoint: "1024px", numVisible: 5 },
  { breakpoint: "768px", numVisible: 3 },
  { breakpoint: "560px", numVisible: 1 },
]);

const imageClick = (index: number) => {
  activeIndex.value = index;
  displayCustom.value = true;
};

/* Iletisim sutunu: adres + e-posta + telefon.
   E-posta ve telefon veriden (footer.personal.items[0]) geliyor; personel
   adi/fotografi/unvani artik gosterilmiyor. */
const MAP_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=37.8124962,29.1526394";

type ContactText = {
  header: string;
  address_label: string;
  address: string;
  email_label: string;
  phone_label: string;
};

const contactTexts: Record<string, ContactText> = {
  en: {
    header: "Contact",
    address_label: "Head office",
    address: "Denizli, Turkey",
    email_label: "Email",
    phone_label: "Phone",
  },
  fr: {
    header: "Contact",
    address_label: "Siège social",
    address: "Denizli, Turquie",
    email_label: "E-mail",
    phone_label: "Téléphone",
  },
  es: {
    header: "Contacto",
    address_label: "Oficina central",
    address: "Denizli, Turquía",
    email_label: "Correo",
    phone_label: "Teléfono",
  },
  ru: {
    header: "Контакты",
    address_label: "Головной офис",
    address: "Денизли, Турция",
    email_label: "Эл. почта",
    phone_label: "Телефон",
  },
  ar: {
    header: "اتصل بنا",
    address_label: "المكتب الرئيسي",
    address: "دنيزلي، تركيا",
    email_label: "البريد الإلكتروني",
    phone_label: "الهاتف",
  },
};

const contactText = computed(
  () => contactTexts[props.lang] ?? contactTexts.en
);

const contactPerson = computed<Record<string, any>>(
  () => props.footer?.personal?.items?.[0] ?? {}
);

const mails = computed(
  () =>
    [contactPerson.value.email, contactPerson.value.email2].filter(
      Boolean
    ) as string[]
);

const phone = computed(() => contactPerson.value.whatsapp as string | undefined);

const phoneDigits = computed(() =>
  String(phone.value ?? "").replace(/[^\d+]/g, "")
);

const whatsappLink = computed(() => {
  const digits = String(phone.value ?? "").replace(/\D/g, "");
  return digits
    ? `https://wa.me/${digits}`
    : (contactPerson.value.watsappLink as string | undefined);
});
</script>

<template>
  <div class="container">
    <div class="row m-auto">
      <!-- Hakkimizda -->
      <div class="col-sm-4 footer-col">
        <h3 class="header">{{ footer.about.header }}</h3>

        <p :class="descriptionClass">{{ footer.about.description }}</p>

        <ul v-if="!valuesAsParagraphs" class="footer-values">
          <li
            v-for="item of footer.about.items"
            :key="item.id"
            :class="valueClass"
          >
            {{ item.value }}
          </li>
        </ul>

        <div v-else>
          <p
            v-for="item of footer.about.items"
            :key="item.id"
            class="about-value-ru"
          >
            {{ item.value }}
          </p>
        </div>

        <ul class="footer-socials">
          <li v-for="social of footer.about.socials" :key="social.link">
            <a
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name || 'Social link'"
            >
              <i :class="social.icon" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>

      <!-- Haberler / galeri -->
      <div class="col-sm-4 footer-col">
        <h3 class="header">{{ footer.news.header }}</h3>

        <Galleria
          v-model:activeIndex="activeIndex"
          v-model:visible="displayCustom"
          :value="footer.news.items"
          :responsive-options="responsiveOptions"
          :num-visible="7"
          container-style="max-width: 850px"
          :circular="true"
          :full-screen="true"
          :show-item-navigators="true"
          :show-thumbnails="false"
        >
          <template #item="slotProps">
            <img
              :src="slotProps.item.image"
              :alt="slotProps.item.name"
              class="galleria-img"
            />
          </template>
          <template #thumbnail="slotProps">
            <img
              :src="slotProps.item.image"
              :alt="slotProps.item.name"
              style="display: block"
            />
          </template>
        </Galleria>

        <div v-if="footer.news.items" class="footer-news-grid">
          <button
            v-for="(image, index) of footer.news.items"
            :key="image.image"
            type="button"
            class="footer-news-btn"
            :aria-label="`Open ${image.name}`"
            @click="imageClick(index)"
          >
            <img
              :src="image.image"
              :alt="image.name"
              class="footer-news-img"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </div>

      <!-- Iletisim: adres, e-posta, telefon -->
      <div class="col-sm-4 footer-col">
        <h3 class="header">{{ contactText.header }}</h3>

        <ul class="footer-contact">
          <li class="footer-contact-item">
            <a
              :href="MAP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-contact-link"
            >
              <span class="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span class="footer-contact-body">
                <span class="footer-contact-label">{{ contactText.address_label }}</span>
                <span class="footer-contact-value">{{ contactText.address }}</span>
              </span>
            </a>
          </li>

          <li v-for="mail of mails" :key="mail" class="footer-contact-item">
            <a :href="`mailto:${mail}`" class="footer-contact-link">
              <span class="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
              </span>
              <span class="footer-contact-body">
                <span class="footer-contact-label">{{ contactText.email_label }}</span>
                <span class="footer-contact-value" dir="ltr">{{ mail }}</span>
              </span>
            </a>
          </li>

          <li v-if="phone" class="footer-contact-item">
            <a :href="`tel:${phoneDigits}`" class="footer-contact-link">
              <span class="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6.5 3h3l1.5 4.5-2 1.2a12 12 0 0 0 5.3 5.3l1.2-2L20 13.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
                </svg>
              </span>
              <span class="footer-contact-body">
                <span class="footer-contact-label">{{ contactText.phone_label }}</span>
                <span class="footer-contact-value" dir="ltr">{{ phone }}</span>
              </span>
            </a>
          </li>

          <li v-if="whatsappLink" class="footer-contact-item">
            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-contact-link footer-contact-link--wa"
            >
              <span class="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z"
                  />
                </svg>
              </span>
              <span class="footer-contact-body">
                <span class="footer-contact-label">WhatsApp</span>
                <span class="footer-contact-value" dir="ltr">{{ phone }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
