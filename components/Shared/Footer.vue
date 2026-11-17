<script lang="ts" setup>
/**
 * Footer.
 *
 * Gorunum referans temanin koyu footer'i (--mk-ink zemin, buyuk logo,
 * widget kolonlari, altta ayri bir telif seridi). Icerik tamamen mevcut
 * verilerden — yeni bir metin kaynagi tanimlanmadi:
 *
 *   footer.about       -> baslik, aciklama, dort madde, sosyal hesaplar
 *   footer.news.items  -> alttaki foto seridi (Galleria ile buyutuluyor)
 *   footer.personal[0] -> e-posta(lar), telefon, WhatsApp
 *   navbar_link        -> gezinme kolonu (store'dan, dil onekli)
 *
 * Eski surum stillerini assets/css/default.css'teki FOOTER bolumunden
 * aliyordu (.footer-col, .footer-contact-*, .about-description-<lang> ...).
 * Yeni surum kendi scoped stilleriyle geliyor; o eski kurallar artik bu
 * bilesen tarafindan kullanilmiyor ama `.header` gibi bazi siniflar diger
 * sayfalarda da gectigi icin default.css'e dokunulmadi.
 *
 * Zarf/WhatsApp/konum ikonlari inline SVG (Font Awesome surumune bagli
 * degil). Sosyal ikonlar veriden geliyor (social.icon, bootstrap-icons).
 */

import { computed, ref } from "vue";
import { useStore } from "~/store/index";
/* Navbar ile ayni logo varligi. assets/ altinda oldugu icin Vite hash'leyip
   /_nuxt/'a koyuyor; footer'da koyu zemin uzerinde beyaza cevriliyor
   (bkz. .ft__logo-img filter). */
import logoSrc from "~/assets/image/mekmar-logo.webp";

const props = defineProps<{
  footer: Record<string, any>;
  lang: string;
}>();

const store = useStore();
const links = computed(
  () => (store.getNavbarLinks as Record<string, any>) ?? {},
);
const navbar = computed(
  () => (store.getNavbar as Record<string, string>) ?? {},
);

const isRtl = computed(() => props.lang === "ar");

/* --- Foto seridi (Galleria ile tam ekran) --- */
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

/* --- Iletisim --- */
const MAP_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=37.8124962,29.1526394";

type FooterText = {
  contact: string;
  address_label: string;
  /* Adres iki parca: sokak satiri her dilde ayni (ozel ad), alt satirda
     posta kodu/ilce ve ulke adi yerellesiyor. Tek dize olsaydi dar
     footer sutununda rastgele yerden kirilirdi. */
  address: string;
  address_city: string;
  nav: string;
  follow: string;
  gallery: string;
  rights: string;
  cta_primary: string;
  cta_secondary: string;
};

const texts: Record<string, FooterText> = {
  en: {
    contact: "Contact",
    address_label: "Head office",
    address: "Akhan, Cafer Sadık Abalıoğlu Blv. No: 119",
    address_city: "20180 Pamukkale / Denizli · Türkiye",
    nav: "Navigation",
    follow: "Follow us on our social media",
    gallery: "Gallery",
    rights: "All rights reserved.",
    cta_primary: "Get in touch",
    cta_secondary: "Download catalogue",
  },
  fr: {
    contact: "Contact",
    address_label: "Siège social",
    address: "Akhan, Cafer Sadık Abalıoğlu Blv. No: 119",
    address_city: "20180 Pamukkale / Denizli · Turquie",
    nav: "Navigation",
    follow: "Suivez-nous sur nos réseaux sociaux",
    gallery: "Galerie",
    rights: "Tous droits réservés.",
    cta_primary: "Nous contacter",
    cta_secondary: "Télécharger le catalogue",
  },
  es: {
    contact: "Contacto",
    address_label: "Oficina central",
    address: "Akhan, Cafer Sadık Abalıoğlu Blv. No: 119",
    address_city: "20180 Pamukkale / Denizli · Turquía",
    nav: "Navegación",
    follow: "Síganos en nuestras redes sociales",
    gallery: "Galería",
    rights: "Todos los derechos reservados.",
    cta_primary: "Contáctenos",
    cta_secondary: "Descargar catálogo",
  },
  ru: {
    contact: "Контакты",
    address_label: "Головной офис",
    address: "Akhan, Cafer Sadık Abalıoğlu Blv. No: 119",
    address_city: "20180 Памуккале / Денизли · Турция",
    nav: "Навигация",
    follow: "Мы в социальных сетях",
    gallery: "Галерея",
    rights: "Все права защищены.",
    cta_primary: "Связаться с нами",
    cta_secondary: "Скачать каталог",
  },
  ar: {
    contact: "اتصل بنا",
    address_label: "المكتب الرئيسي",
    address: "Akhan, Cafer Sadık Abalıoğlu Blv. No: 119",
    address_city: "20180 باموكالي / دنيزلي · تركيا",
    nav: "التنقل",
    follow: "تابعنا على وسائل التواصل الاجتماعي",
    gallery: "المعرض",
    rights: "جميع الحقوق محفوظة.",
    cta_primary: "تواصل معنا",
    cta_secondary: "تحميل الكتالوج",
  },
};

const t = computed(() => texts[props.lang] ?? texts.en);

/* E-posta ve telefon veriden (footer.personal.items[0]); personel
   adi/fotografi/unvani gosterilmiyor. */
const contactPerson = computed<Record<string, any>>(
  () => props.footer?.personal?.items?.[0] ?? {},
);

const mails = computed(
  () =>
    [contactPerson.value.email, contactPerson.value.email2].filter(
      Boolean,
    ) as string[],
);

const phone = computed(
  () => contactPerson.value.whatsapp as string | undefined,
);

const phoneDigits = computed(() =>
  String(phone.value ?? "").replace(/[^\d+]/g, ""),
);

const whatsappLink = computed(() => {
  const digits = String(phone.value ?? "").replace(/\D/g, "");
  return digits
    ? `https://wa.me/${digits}`
    : (contactPerson.value.watsappLink as string | undefined);
});

/* --- Gezinme kolonu --- */
/* navbar_link'teki hazir yollar; etiketler de navbar verisinden, yani
   footer icin ayri ceviri tutulmuyor. Olmayan bir anahtar sessizce
   listeden dusuyor. */
const navItems = computed(() =>
  (
    [
      ["home", links.value.home],
      ["about", links.value.about],
      ["fabrication", links.value.fabrication],
      ["project", links.value.project],
      ["videos", links.value.videos],
      ["faq", links.value.faq],
      ["contact", links.value.contact],
    ] as [string, string | undefined][]
  )
    .filter(([key, href]) => href && navbar.value[key])
    .map(([key, href]) => ({ key, href: href as string, label: navbar.value[key] })),
);

const catalogLink = computed(() => links.value.catalog as string | undefined);
const contactLink = computed(() => (links.value.contact as string) ?? "/contact");

const year = new Date().getFullYear();
</script>

<template>
  <footer class="ft" :dir="isRtl ? 'rtl' : undefined">
    <div class="ft__inner">
      <!-- Ust blok: logo + tanitim -->
      <div class="ft__top">
        <div class="ft__brand">
          <NuxtLink class="ft__logo" :to="links.home ?? '/'" aria-label="Mekmar">
            <img
              class="ft__logo-img"
              :src="logoSrc"
              alt="mekmar-logo"
              width="600"
              height="110"
              loading="lazy"
              decoding="async"
            />
          </NuxtLink>

          <!-- Ana sayfanin kapanis bandindaki iki buton buraya alindi:
               "Let's talk about stone" basligi ve altindaki cumle istek
               uzerine kaldirildi, geriye sadece eylemler kalinca onlari
               ayri bir bolum olarak tutmanin anlami yoktu. Footer'da her
               sayfadan erisilebiliyorlar. -->
          <div class="ft__cta">
            <UiBtn :label="t.cta_primary" :to="contactLink" variant="white" />
            <!-- Katalog bir PDF (cdn.mekmarimage.com); ic yonlendirici ile
                 degil dogrudan acilmasi gerekiyor. -->
            <UiBtn :label="t.cta_secondary" :href="catalogLink" variant="blur" />
          </div>
        </div>

        <div class="ft__intro">
          <h2 class="ft__intro-title">{{ footer.about.header }}</h2>
          <p class="ft__intro-text">{{ footer.about.description }}</p>

          <ul class="ft__points">
            <li
              v-for="item of footer.about.items"
              :key="item.id"
              class="ft__point"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Widget kolonlari -->
      <div class="ft__cols">
        <!-- Gezinme -->
        <section class="ft__col">
          <h3 class="ft__col-title">{{ t.nav }}</h3>
          <ul class="ft__menu">
            <li v-for="item of navItems" :key="item.key">
              <NuxtLink class="ft__link" :to="item.href">{{
                item.label
              }}</NuxtLink>
            </li>
            <li v-if="catalogLink">
              <!-- Katalog bir PDF (cdn.mekmarimage.com); ic yonlendirici ile
                   degil dogrudan acilmasi gerekiyor. -->
              <a
                class="ft__link"
                :href="catalogLink"
                target="_blank"
                rel="noopener noreferrer"
                >{{ navbar.catalog }}</a
              >
            </li>
          </ul>
        </section>

        <!-- Iletisim -->
        <section class="ft__col">
          <h3 class="ft__col-title">{{ t.contact }}</h3>

          <ul class="ft__contact">
            <li>
              <a
                class="ft__contact-link"
                :href="MAP_LINK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="ft__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span class="ft__contact-body">
                  <span class="ft__contact-label">{{ t.address_label }}</span>
                  <span class="ft__contact-value">
                    <span class="ft__contact-line">{{ t.address }}</span>
                    <span class="ft__contact-line">{{ t.address_city }}</span>
                  </span>
                </span>
              </a>
            </li>

            <li v-for="mail of mails" :key="mail">
              <a class="ft__contact-link" :href="`mailto:${mail}`">
                <span class="ft__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                </span>
                <span class="ft__contact-body">
                  <span class="ft__contact-label">E-mail</span>
                  <span class="ft__contact-value" dir="ltr">{{ mail }}</span>
                </span>
              </a>
            </li>

            <li v-if="phone">
              <a class="ft__contact-link" :href="`tel:${phoneDigits}`">
                <span class="ft__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6.5 3h3l1.5 4.5-2 1.2a12 12 0 0 0 5.3 5.3l1.2-2L20 13.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
                  </svg>
                </span>
                <span class="ft__contact-body">
                  <span class="ft__contact-label">Tel</span>
                  <span class="ft__contact-value" dir="ltr">{{ phone }}</span>
                </span>
              </a>
            </li>

            <li v-if="whatsappLink">
              <a
                class="ft__contact-link"
                :href="whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="ft__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z" />
                  </svg>
                </span>
                <span class="ft__contact-body">
                  <span class="ft__contact-label">WhatsApp</span>
                  <span class="ft__contact-value" dir="ltr">{{ phone }}</span>
                </span>
              </a>
            </li>
          </ul>
        </section>

        <!-- Sosyal + galeri -->
        <section class="ft__col">
          <h3 class="ft__col-title">{{ t.follow }}</h3>

          <ul class="ft__socials">
            <li v-for="social of footer.about.socials" :key="social.link">
              <a
                class="ft__social"
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.name || 'Social link'"
              >
                <i :class="social.icon" aria-hidden="true"></i>
              </a>
            </li>
          </ul>

          <template v-if="footer.news?.items?.length">
            <h3 class="ft__col-title ft__col-title--gap">
              {{ footer.news.header || t.gallery }}
            </h3>

            <div class="ft__shots">
              <button
                v-for="(image, index) of footer.news.items"
                :key="image.image"
                type="button"
                class="ft__shot"
                :aria-label="`Open ${image.name}`"
                @click="imageClick(index)"
              >
                <!-- <img> DEGIL <NuxtImg>: bu kareler .ft__shots'ta
                     3.5rem (56 px) genisliginde, ama kaynak dosyalar
                     public/image/news altinda 0.1-3.7 MB. Ham <img> ile
                     15 fotograf HER SAYFANIN footer'inda tam boyutta
                     iniyordu (~14 MB). NuxtImg 72 px'lik (2x icin 144)
                     varyant uretiyor.

                     width/height veriliyor: .ft__shot zaten
                     aspect-ratio: 1/1 ile yer ayiriyor, ama oran
                     bilgisi img'de de olunca tarayici yer ayirmayi
                     CSS'i beklemeden yapiyor. -->
                <NuxtImg
                  :src="image.image"
                  :alt="image.name"
                  width="72"
                  height="72"
                  fit="cover"
                  sizes="72px"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
          </template>
        </section>
      </div>
    </div>

    <!-- Telif seridi -->
    <div class="ft__bar">
      <div class="ft__bar-inner">
        <p class="ft__copy">© {{ year }} Mekmar. {{ t.rights }}</p>
        <p class="ft__made">Denizli · Türkiye</p>
      </div>
    </div>

    <!-- Foto seridine tiklanınca acilan tam ekran galeri -->
    <Galleria
      v-model:activeIndex="activeIndex"
      v-model:visible="displayCustom"
      :value="footer.news?.items ?? []"
      :responsive-options="responsiveOptions"
      :num-visible="7"
      container-style="max-width: 850px"
      :circular="true"
      :full-screen="true"
      :show-item-navigators="true"
      :show-thumbnails="false"
    >
      <!-- Tam ekran gorsel de olceklenmis: kaynagin 3.7 MB olmasi
           lightbox'ta da gerekmiyor, kutu en fazla 850 px genisliginde
           (container-style). -->
      <template #item="slotProps">
        <NuxtImg
          :src="slotProps.item.image"
          :alt="slotProps.item.name"
          sizes="xs:90vw sm:90vw md:850px lg:850px xl:850px xxl:850px"
          loading="lazy"
          decoding="async"
          class="ft__galleria-img"
        />
      </template>
      <template #thumbnail="slotProps">
        <NuxtImg
          :src="slotProps.item.image"
          :alt="slotProps.item.name"
          width="96"
          height="96"
          fit="cover"
          sizes="96px"
          loading="lazy"
          decoding="async"
          style="display: block"
        />
      </template>
    </Galleria>
  </footer>
</template>

<style scoped>
.ft {
  font-family: var(--mk-ff-body);
  background: var(--mk-ink);
  color: rgba(255, 255, 255, 0.72);
}

.ft__inner {
  width: min(var(--mk-container-wide), 100%);
  margin-inline: auto;
  padding: clamp(3rem, 7vw, 5.5rem) clamp(1.25rem, 3.5vw, 3.5rem)
    clamp(2rem, 4vw, 3rem);
}

/* --- Ust blok --- */
.ft__top {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  /* Alttaki 1px cizgi kaldirildi: koyu footer'da bolumler bosluklaa
     ayriliyor, cizgiyle degil. */
  padding-bottom: clamp(3.5rem, 7vw, 5.5rem);
}

@media (min-width: 62rem) {
  .ft__top {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: start;
  }
}

.ft__logo {
  display: inline-block;
}

/* Logonun hemen altinda, yan yana iki eylem. Dar ekranda alt alta
   geciyorlar (flex-wrap) ve butonlar kendi genisliklerini koruyor. */
.ft__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
}

.ft__logo-img {
  width: auto;
  /* Temada footer logosu buyuk. */
  height: clamp(3.25rem, 6vw, 4.75rem);
  max-width: 100%;
  margin: 0;
  /* Logo koyu lacivert/mavi; koyu zeminde kayboluyor, beyaza cevriliyor. */
  filter: brightness(0) invert(0.96);
}

.ft__intro-title {
  margin: 0 0 1rem;
  font-family: var(--mk-ff-display);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 600;
  /* Veri ALL CAPS geliyor ("ABOUT US"); cumle duzenine cevirmek "USA" gibi
     kisaltmalari bozacagi icin caps birakilip harf araligi aciliyor. */
  letter-spacing: 0.04em;
  text-transform: none;
  color: var(--mk-cream);
}

.ft__intro-text {
  margin: 0;
  /* 44rem + 14px, satir basina ~101 karakter ediyordu; okunur aralik 45-75.
     ch, "0" rakaminin genisligi ve ortalama kucuk harften genis, yani
     50ch olcusu satira ondan daha az karakter birakiyor — Helvetica'da
     ~65 karakter. */
  max-width: 50ch;
  font-size: 1rem;
  line-height: 1.7;
}

.ft__points {
  display: grid;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .ft__points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.625rem 1.5rem;
  }
}

.ft__point {
  position: relative;
  padding-inline-start: 1.375rem;
  font-size: 1rem;
  line-height: 1.6;
}

/* Madde isareti: temanin cizgi dili. */
.ft__point::before {
  content: "";
  position: absolute;
  top: 0.625rem;
  inset-inline-start: 0;
  width: 0.75rem;
  height: 1px;
  background: var(--mk-accent);
}

/* --- Kolonlar --- */
.ft__cols {
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
  padding-top: clamp(2.5rem, 5vw, 3.5rem);
}

@media (min-width: 48rem) {
  .ft__cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 62rem) {
  .ft__cols {
    grid-template-columns: minmax(0, 3fr) minmax(0, 4fr) minmax(0, 5fr);
  }
}

/* Onceden 11px, harf arasi 0.16em acilmis TUM BUYUK HARF bir mikro-etiketti.
   Kolonun gercek basligi; kendi yaziminda ve okunur puntoda duruyor. */
.ft__col-title {
  margin: 0 0 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  color: rgba(255, 255, 255, 0.78);
}

.ft__col-title--gap {
  margin-top: 2rem;
}

/* --- Gezinme --- */
.ft__menu {
  display: grid;
  gap: 0.625rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ft__link {
  position: relative;
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.78);
  transition:
    color 0.25s ease,
    padding-inline-start 0.3s ease-out;
}

/* Navbar menusundeki ayni tire hareketi. */
.ft__link::before {
  content: "";
  position: absolute;
  top: 50%;
  inset-inline-start: 0;
  width: 0;
  height: 1px;
  opacity: 0;
  background: var(--mk-cream);
  transition: all 0.3s ease-out;
}

.ft__link:hover,
.ft__link:focus-visible {
  padding-inline-start: 1.25rem;
  color: var(--mk-cream);
}

.ft__link:hover::before,
.ft__link:focus-visible::before {
  width: 0.9375rem;
  opacity: 1;
}

/* --- Iletisim --- */
.ft__contact {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ft__contact-link {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: color 0.25s ease;
}

.ft__contact-link:hover,
.ft__contact-link:focus-visible {
  color: var(--mk-cream);
}

.ft__ico {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  transition: border-color 0.25s ease;
}

.ft__contact-link:hover .ft__ico {
  border-color: rgba(255, 255, 255, 0.55);
}

.ft__ico svg {
  width: 0.9375rem;
  height: 0.9375rem;
}

.ft__contact-body {
  min-width: 0;
}

.ft__contact-label {
  display: block;
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  color: rgba(255, 255, 255, 0.6);
}

.ft__contact-value {
  display: block;
  margin-top: 0.125rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

/* Adresin iki satiri. Kendi satirinda duruyor ki sokak adi ile
   ilce/ulke birbirine karismasin; uzun sokak adi yine kendi icinde
   kirilabiliyor. */
.ft__contact-line {
  display: block;
}

/* --- Sosyal --- */
.ft__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ft__social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  text-decoration: none;
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.ft__social:hover,
.ft__social:focus-visible {
  color: var(--mk-ink);
  background: var(--mk-cream);
  border-color: var(--mk-cream);
}

/* --- Foto seridi --- */
.ft__shots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3.5rem, 1fr));
  gap: 0.375rem;
}

.ft__shot {
  padding: 0;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: rgba(255, 255, 255, 0.06);
  border: 0;
  cursor: pointer;
}

.ft__shot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.75;
  transform: scale(1);
  transition:
    opacity 0.3s ease,
    transform 0.5s var(--mk-ease);
}

.ft__shot:hover img,
.ft__shot:focus-visible img {
  opacity: 1;
  transform: scale(1.08);
}

.ft__shot:focus-visible {
  outline: 2px solid var(--mk-cream);
  outline-offset: 2px;
}

/* --- Telif seridi --- */
.ft__bar {
  /* Ustteki 1px cizgi yerine bir ton adimi: serit zeminden hafifce
     koyu, ayrim yine okunuyor. */
  background: rgba(0, 0, 0, 0.22);
}

.ft__bar-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  width: min(var(--mk-container-wide), 100%);
  margin-inline: auto;
  padding: 1.25rem clamp(1.25rem, 3.5vw, 3.5rem);
}

.ft__copy,
.ft__made {
  margin: 0;
  font-size: 0.875rem;
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.55);
}

.ft__galleria-img {
  display: block;
  width: 100%;
  height: auto;
}

@media (prefers-reduced-motion: reduce) {
  .ft__link,
  .ft__link::before,
  .ft__contact-link,
  .ft__ico,
  .ft__social,
  .ft__shot img {
    transition: none;
  }

  .ft__shot:hover img,
  .ft__shot:focus-visible img {
    transform: none;
  }
}
</style>
