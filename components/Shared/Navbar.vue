<template>
  <header
    class="nv"
    :class="{ 'nv--over': overlay, 'nv--solid': !overlay }"
  >
    <div class="nv__inner">
      <NuxtLink class="nv__logo" :to="selectedLang.link" aria-label="Mekmar">
        <!-- Logo LCP elemani; diger alt kaynaklarin arkasina kuyruklanmasin. -->
        <img
          class="logo_mekmar nv__logo-img"
          :src="logoSrc"
          alt="mekmar-logo"
          width="600"
          height="110"
          fetchpriority="high"
          decoding="sync"
        />
      </NuxtLink>

      <nav class="nv__nav" :class="`nv__nav--${selectedLang.status}`">
        <NuxtLink class="nv__link" :to="navbar_link.home">{{
          navbar.home
        }}</NuxtLink>

        <div class="dropdown nv__item">
          <a
            class="nv__link nv__link--toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >{{ navbar.product }}</a
          >
          <!-- div menu + bolum basina kendi listesi (ul icine div koymak
               gecersiz HTML'di). -->
          <!-- Iki bolge: solda gercek taksonomi (kategoriler), sagda ayni
               katalogu daraltan filtreler. Onceden ucu de ayni genislikte,
               ayni stilde kolonlardi ve "Beyaz" ile "Mermer" ayni seviyede
               duruyordu; oysa biri bir urun grubu, oteki o gruplarin
               filtrelenmis gorunumu. Liste = gidilecek yer, etiket = daraltma. -->
          <div class="dropdown-menu nv__mega">
            <section class="nv__mega-col nv__mega-col--primary">
              <h3 class="nv__mega-title">{{ navbar.categories }}</h3>
              <ul>
                <li v-for="item in navbar_link.categories" :key="item.id">
                  <NuxtLink class="nv__mega-link" :to="item.link">{{
                    item.title
                  }}</NuxtLink>
                </li>
              </ul>
            </section>

            <div class="nv__mega-filters">
              <section class="nv__mega-group">
                <h3 class="nv__mega-title nv__mega-title--filter">
                  {{ navbar.colors }}
                </h3>
                <ul class="nv__chips">
                  <li v-for="item in navbar_link.colors" :key="item.id">
                    <NuxtLink class="nv__chip" :to="item.link">{{
                      item.title
                    }}</NuxtLink>
                  </li>
                </ul>
              </section>

              <section class="nv__mega-group">
                <h3 class="nv__mega-title nv__mega-title--filter">
                  {{ navbar.areas }}
                </h3>
                <ul class="nv__chips">
                  <li v-for="item in navbar_link.areas" :key="item.id">
                    <NuxtLink class="nv__chip" :to="item.link">{{
                      item.title
                    }}</NuxtLink>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div class="dropdown nv__item">
          <a
            class="nv__link nv__link--toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >{{ navbar.info }}</a
          >
          <ul class="dropdown-menu nv__menu">
            <li>
              <NuxtLink class="nv__menu-link" :to="navbar_link.about">{{
                navbar.about
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink class="nv__menu-link" :to="navbar_link.faq">{{
                navbar.faq
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="nv__menu-link"
                :to="navbar_link.catalog"
                target="_blank"
                >{{ navbar.catalog }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <NuxtLink class="nv__link" :to="navbar_link.fabrication">{{
          navbar.fabrication
        }}</NuxtLink>
        <NuxtLink class="nv__link" :to="navbar_link.videos">{{
          navbar.videos
        }}</NuxtLink>
        <NuxtLink class="nv__link" :to="navbar_link.project">{{
          navbar.project
        }}</NuxtLink>
        <NuxtLink class="nv__link" :to="navbar_link.contact">{{
          navbar.contact
        }}</NuxtLink>
      </nav>

      <div class="nv__tools">
        <SharedSearchBox
          :key="String(usa_link_status)"
          :usa="usa_link_status"
        />
        <SharedAccountMenu />
        <SharedLangDropdown />

        <UiBtn
          class="nv__cta"
          :label="ctaLabel"
          :to="navbar_link.contact"
          :variant="overlay ? 'blur' : 'black'"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
/**
 * components/Shared/Navbar.vue — masaustu ust menu.
 *
 * Gorunum "Reak" temasina gore: hero uzerinde bulanik koyu cam + krem
 * yazilar, sayfa kaydirilinca krem zemine oturup koyuya donuyor. Islevlerin
 * tamami korundu — urun mega menusu, bilgi menusu, arama, hesap menusu,
 * dil secici — uzerine temanin pill CTA butonu eklendi.
 *
 * Seffaf (cam) mod yalnizca ana sayfada: hero'nun fotograf zemini altina
 * giriyor. Diger sayfalarda zemin yok, o yuzden bastan krem duruyor.
 *
 * Eski `site_*` siniflari assets/css/default.css'te duruyor — Navbarmobile
 * halen onlari kullaniyor, bu yuzden silinmedi. Buradaki `nv__*` siniflari
 * scoped, yani iki tasarim birbirine karismiyor.
 */
import { computed, watch } from "vue";
import { useStore } from "~/store/index";
import { useHeroOverlay } from "~/composables/useHeroOverlay";
/* Tek logo varligi: en/diger dil ayrimi kaldirilmisti, ikisi de bu 600x110
   webp'yi kullaniyor. assets/ altinda oldugu icin Vite hash'leyip /_nuxt/'a
   koyuyor, yani "public, max-age=31536000, immutable" ile servis ediliyor. */
import logoSrc from "~/assets/image/mekmar-logo.webp";

const props = defineProps<{
  navbar: Record<string, string>;
  navbar_link: Record<string, any>;
}>();

const langs = [
  { name: "English", link: "/", status: "en" },
  { name: "France", link: "/fr", status: "fr" },
  { name: "Spanish", link: "/es", status: "es" },
  { name: "Russian", link: "/ru", status: "ru" },
  { name: "Arabic", link: "/ar", status: "ar" },
];

const store = useStore();
/* Dil bulunamazsa en'e dusuyor; aksi halde navbar hic render edilmiyordu. */
const selectedLang = computed(
  () => langs.find((x) => x.status === store.getLang) ?? langs[0],
);

const CTA: Record<string, string> = {
  en: "Get a quote",
  fr: "Demander un devis",
  es: "Pedir presupuesto",
  ru: "Запросить расчёт",
  ar: "اطلب عرض سعر",
};
const ctaLabel = computed(() => CTA[selectedLang.value.status] ?? CTA.en);

const route = useRoute();
const router = useRouter();

/* /usa altinda arama farkli bir kaynaktan besleniyor; SearchBox buna gore
   yer tutucu, hedef link ve oneri davranisini degistiriyor. */
const usa_link_status = computed(
  () => router.currentRoute.value.fullPath.split("/")[1] === "usa",
);

/* --- Seffaf mod ---
   Ana sayfalarin yolu: "/", "/fr", "/es", "/ru", "/ar". site.trailingSlash
   acik oldugu icin sondaki "/" kirpiliyor. */
const HOME_PATHS = new Set(["", "/fr", "/es", "/ru", "/ar"]);
const isHome = computed(() =>
  HOME_PATHS.has(route.path.replace(/\/+$/, "")),
);

/* Karari Hero veriyor (bkz. composables/useHeroOverlay.ts): kendi alt kenari
   menunun altina gectigi an bunu false yapiyor.

   Burada kendi scroll dinleyicimiz YOK — eski "scrollY > 40" esigi, hero
   artik kaydirmayla acilan ~2.4 ekranlik bir bolum oldugu icin menuyu daha
   ilk tekerlek hareketinde beyaza ceviriyordu. */
const heroOverlay = useHeroOverlay();

/* SSR baslangic degeri: ana sayfada hero en ustte oldugu icin seffaf.
   Boylece sunucudan gelen HTML de seffaf basliyor, hydration'da
   beyaz->seffaf atlamasi gorunmuyor. */
if (isHome.value) heroOverlay.value = true;

/* Ic sayfadan ana sayfaya donuldugunde durum false kalmis olabiliyor
   (Hero yeniden mount olana kadar). Rota ana sayfaya girdigi an geri
   aciliyor. */
watch(isHome, (home) => {
  if (home) heroOverlay.value = true;
});

const overlay = computed(() => isHome.value && heroOverlay.value);
</script>

<style scoped>
.nv {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 99;
  font-family: var(--mk-ff-body);
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

/* Hero uzerinde: fotograf gorunur kalsin diye zemin yok, ama arkasi
   bulaniklastiriliyor — menu yazilari hareketli fotografin uzerinde
   okunur kalsin.

   Bulaniklik --mk-blur-nav (16px); uzerindeki ogeler (arama, ikonlar,
   CTA) --mk-blur-chip (40px) kullaniyor. KASITLI olarak farkli: ayni
   olsaydi ogeler menunun zeminine karisir ve ust uste iki cam katman
   oldugu okunmazdi. */
.nv--over {
  background: rgba(28, 25, 23, 0.18);
  backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  -webkit-backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  border-bottom: 1px solid rgba(247, 243, 233, 0.12);
}

/* Kaydirildiktan sonra / ic sayfalarda: krem zemin.
   Burada da hafif bulaniklik var — sayfa altindan gecerken krem tamamen
   opak durmasin, menunun bir katman oldugu belli olsun. */
.nv--solid {
  background: rgba(247, 243, 233, 0.88);
  backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  -webkit-backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  border-bottom: 1px solid var(--mk-border);
  box-shadow: 0 1px 2px rgba(28, 25, 23, 0.04);
}

/* backdrop-filter desteklenmiyorsa (eski tarayici) saydam zemin metni
   okunmaz hale getirir; o durumda opak zemine dusuluyor. */
@supports not (backdrop-filter: blur(1px)) {
  .nv--over {
    background: rgba(28, 25, 23, 0.55);
  }

  .nv--solid {
    background: var(--mk-cream);
  }
}

/* Bolum icerikleri --mk-container (1200px) ile sinirli ama ust menu daha
   genis: logo + 7 menu ogesi + arama + iki ikon + CTA o genislikte
   sikisiyordu. Yan dolgu da buyutuldu ki ogeler ekran kenarina
   dayanmasin. */
.nv__inner {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 1.8vw, 1.75rem);
  width: min(var(--mk-container-wide), 100%);
  margin-inline: auto;
  padding: 0.75rem clamp(1.25rem, 3.5vw, 3.5rem);
}

/* --- Logo --- */
.nv__logo {
  flex: none;
  display: block;
  padding: 0;
  margin: 0;
}

/* Logo iki durumda farkli gorunuyor:

   - Hero'nun uzerinde (.nv--over): fotografin uzerinde okunmasi icin krem.
     `brightness(0)` once tum renk bilgisini siliyor, invert(0.96) krem
     tonuna cikariyor.
   - Kaydirildiktan sonra (.nv--solid): FILTRE YOK. Acik zeminde markanin
     kendi renkleri (koyu lacivert-mavi) gorunuyor. Onceden burada da
     brightness(0) invert(0.11) vardi, yani logo siyaha yakin notr bir
     griye donuyordu ve marka rengi kayboluyordu. */
.nv__logo-img {
  width: auto;
  /* Sabit 46px logo 251px genislik demekti ve 1460px altindaki her
     masaustu genisliginde sag taraftaki araclari ekran disina itiyordu.
     Genislikle birlikte 32-46px arasinda olcekleniyor. */
  height: clamp(1.75rem, 3.2vw, 2.875rem);
  max-width: 100%;
  margin: 0;
  transition: filter 0.35s ease;
}

.nv--over .nv__logo-img {
  filter: brightness(0) invert(0.96);
}

.nv--solid .nv__logo-img {
  filter: none;
}

/* --- Menu --- */
/* nowrap: Libre Baskerville'e gecince satir genisligi arttigi icin son
   oge (CONTACT) alt satira kayiyordu. Sarma kapatildi; sigdirma isi
   punto/tracking/dolgu kisarak yapiliyor (asagida). */
.nv__nav {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0;
  flex: 1 1 auto;
}

/* Arapca ve Kiril daha buyuk/kucuk punto istiyor — tek degisken. */
.nv__nav--ar {
  --nv-font: 0.8125rem;
}

.nv__nav--fr,
.nv__nav--es,
.nv__nav--ru {
  --nv-font: 0.625rem;
}

.nv__item {
  position: static;
}

.nv__link {
  position: relative;
  display: block;
  padding: 0.5rem 0.375rem;
  font-size: var(--nv-font, 0.6875rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease, opacity 0.25s ease;
}

.nv--over .nv__link {
  color: var(--mk-cream);
}

.nv--solid .nv__link {
  color: var(--mk-ink);
}

/* Temadaki vurgu: alt cizgi yerine opaklik + ince alt isaret. */
.nv__link::after {
  content: "";
  position: absolute;
  inset-inline: 0.5rem;
  bottom: 0.1875rem;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: inline-start;
  transition: transform 0.25s var(--mk-ease);
}

.nv__link:hover::after,
.nv__link:focus-visible::after,
.nv__link.router-link-exact-active::after {
  transform: scaleX(1);
}

.nv__link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Acilir menu oku */
.nv__link--toggle {
  padding-inline-end: 1.125rem;
}

.nv__link--toggle::before {
  content: "";
  position: absolute;
  top: 50%;
  inset-inline-end: 0.375rem;
  width: 0.3rem;
  height: 0.3rem;
  border-inline-end: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-70%) rotate(45deg);
  transition: transform 0.3s ease;
}

.dropdown.show .nv__link--toggle::before {
  transform: translateY(-20%) rotate(225deg);
}

/* --- Acilir paneller --- */
/* Temadaki perspektif acilimi: panel ust kenarindan yatarak geliyor.
   Bootstrap gorunurlugu display ile yonettigi icin gecis .show uzerinden. */
.nv__menu,
.nv__mega {
  margin-top: 0.5rem;
  padding: 1.25rem 0;
  border: 1px solid rgba(48, 48, 47, 0.1);
  border-radius: var(--mk-radius);
  background: var(--mk-cream);
  box-shadow:
    0 1px 2px 1px rgba(3, 11, 30, 0.06),
    0 1px 1px 0 rgba(3, 11, 30, 0.1);
  transform-origin: top;
}

.nv__menu {
  min-width: 13rem;
}

.nv__menu li {
  list-style: none;
  padding-inline: 1.5rem;
}

.nv__menu li:not(:last-child) {
  margin-bottom: 0.3125rem;
}

.nv__menu-link,
.nv__mega-link {
  position: relative;
  display: inline-block;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.0125rem;
  text-align: start;
  text-decoration: none;
  color: var(--mk-ink);
  transition: padding-inline-start 0.3s ease-out;
}

/* Temadaki tire: hover'da soldan 15px'lik bir cizgi aciliyor ve
   metin onun kadar kayiyor. */
.nv__menu-link::before,
.nv__mega-link::before {
  content: "";
  position: absolute;
  top: 50%;
  inset-inline-start: 0;
  width: 0;
  height: 2px;
  opacity: 0;
  background: var(--mk-ink);
  transition: all 0.3s ease-out;
}

.nv__menu-link:hover,
.nv__menu-link:focus-visible,
.nv__mega-link:hover,
.nv__mega-link:focus-visible {
  padding-inline-start: 1.25rem;
  color: var(--mk-ink);
}

.nv__menu-link:hover::before,
.nv__menu-link:focus-visible::before,
.nv__mega-link:hover::before,
.nv__mega-link:focus-visible::before {
  width: 0.9375rem;
  opacity: 1;
}

/* Urun mega menusu. display yalnizca .show durumunda grid olmali:
   Bootstrap menuyu display:none ile gizliyor, kosulsuz bir grid onu ezip
   menuyu surekli acik birakirdi. Uc sinifla ozgullugu Bootstrap'in
   ustune cikariyoruz. */
.dropdown-menu.nv__mega.show {
  display: grid;
}

.nv__mega {
  /* Sol: kategoriler (asil taksonomi). Sag: filtreler. */
  grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
  gap: 0 1.5rem;
  /* Mega menu genis; ekrana sigmasi icin viewport'a gore sinirli. */
  width: min(48rem, 92vw);
  /* nv__item position:static oldugu icin panel .nv__inner'a gore
     hizalaniyor ve dar ekranda saga tasmiyor. */
  inset-inline-start: 50%;
  transform: translateX(-50%);
}

[dir="rtl"] .nv__mega {
  transform: translateX(50%);
}

.nv__mega-col {
  padding-inline: 1.5rem;
}

/* --- Filtre bolgesi ---
   Kategorilerden tonla ayriliyor: ayri bir yuzey, icinde iki grup. */
.nv__mega-filters {
  display: grid;
  gap: 1.25rem;
  padding: 1rem 1.5rem;
  margin-inline-end: 1.25rem;
  background: var(--mk-cream-2);
  border-radius: var(--mk-radius);
}

.nv__mega-group + .nv__mega-group {
  padding-top: 1rem;
  border-top: 1px solid var(--mk-border);
}

/* Filtre basligi kategoriler basligi kadar baskin degil: alt cizgisi yok,
   tonu bir adim soluk. */
.nv__mega-title--filter {
  padding-bottom: 0;
  border-bottom: 0;
  margin-bottom: 0.5rem;
}

/* Filtreler liste degil etiket: tiklanabilir birer daraltma. */
.nv__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nv__chip {
  display: inline-block;
  padding: 0.3125rem 0.6875rem;
  border-radius: var(--mk-radius-pill);
  background: var(--mk-cream);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: none;
  color: var(--mk-ink);
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.nv__chip:hover,
.nv__chip:focus-visible {
  background: var(--mk-ink);
  color: var(--mk-cream);
}

.nv__chip:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 2px;
}

.nv__mega-col ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nv__mega-title {
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--mk-border);
  font-family: var(--mk-ff-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: start;
  color: var(--mk-grey-2);
}

/* --- Sag taraf: arama / hesap / dil / CTA --- */
.nv__tools {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: none;
}

/* CTA ancak gercekten yer kalinca gorunsun: 78rem'de menuyu tasiriyordu. */
@media (max-width: 90rem) {
  .nv__cta {
    display: none;
  }
}

/* --- Alt bilesenlerin renk uyumu ---
   AccountMenu ve LangDropdown artik kendi stillerinde `color: inherit` +
   `border-color: currentColor` kullaniyor, yani buradan verilen renk ikisine
   de kendiliginden isliyor. Panelleri acik zeminde durdugu icin onlarin
   renkleri kendi dosyalarinda sabit. */
.nv--over .nv__tools {
  color: var(--mk-cream);
}

.nv--solid .nv__tools {
  color: var(--mk-ink);
}

/* Arama alani PrimeVue InputText + default.css'teki .site_search ile
   geliyor (o stiller Navbarmobile tarafindan da kullaniliyor, bu yuzden
   kendi dosyasina dokunmuyoruz). Burada ust menu baglaminda temanin pill
   formuna cevriliyor. */
/* Arama kutusu da sabit degil: dar masaustunde kuculup menuye yer
   aciyor, genis ekranda tam boyuna donuyor. */
.nv__tools :deep(.site_search),
.nv__tools :deep(.site_search input) {
  width: clamp(8rem, 12vw, 13.125rem);
}

.nv__tools :deep(.site_search input) {
  height: 2.375rem;
  padding-inline: 2.125rem 0.875rem;
  font-family: var(--mk-ff-body);
  font-size: 0.8125rem;
  border-radius: var(--mk-radius-pill);
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.nv__tools :deep(.site_search_icon) {
  inset-inline-start: 0.8125rem;
  font-size: 0.8125rem;
}

/* Seffaf modda fotograf uzerinde: yari seffaf krem + blur.
   Blur --mk-blur-chip (40px); menunun kendi zemini --mk-blur-nav (16px)
   kullaniyor. Ayni olsa bu ogeler menunun zeminine karisirdi. */
.nv--over :deep(.site_search input) {
  color: var(--mk-cream);
  background: rgba(247, 243, 233, 0.12);
  border: 1px solid rgba(247, 243, 233, 0.32);
  backdrop-filter: blur(var(--mk-blur-chip));
  -webkit-backdrop-filter: blur(var(--mk-blur-chip));
}

/* Profil ve dil butonlari da ayni cam dilinde: kendi dosyalarinda zemini
   saydam ve rengi `currentColor`, blur'u burada ekleniyor cunku yalnizca
   ust menu baglaminda gerekiyor (Navbarmobile'da fotograf zemini yok). */
.nv--over :deep(.am_btn),
.nv--over :deep(.lg__btn) {
  background: rgba(247, 243, 233, 0.12);
  border-color: rgba(247, 243, 233, 0.32);
  backdrop-filter: blur(var(--mk-blur-chip));
  -webkit-backdrop-filter: blur(var(--mk-blur-chip));
  /* Kendi dosyalarinda cerceve agir gorunmesin diye 0.65 opaklik var;
     cam zemin uzerinde tam opak daha okunur. */
  opacity: 1;
}

.nv--over :deep(.am_btn:hover),
.nv--over :deep(.lg__btn:hover) {
  background: rgba(247, 243, 233, 0.2);
  border-color: rgba(247, 243, 233, 0.6);
}

.nv--over :deep(.site_search input::placeholder) {
  color: rgba(247, 243, 233, 0.68);
}

.nv--over :deep(.site_search input:focus) {
  border-color: var(--mk-cream);
  box-shadow: none;
}

/* Beyaz zeminde: ince gri cerceve. */
.nv--solid :deep(.site_search input) {
  color: var(--mk-ink);
  background: var(--mk-cream);
  border: 1px solid var(--mk-border);
}

.nv--solid :deep(.site_search input::placeholder) {
  color: var(--mk-grey-2);
  opacity: 0.6;
}

.nv--solid :deep(.site_search input:focus) {
  border-color: var(--mk-ink);
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .nv,
  .nv__logo-img,
  .nv__link,
  .nv__link::after,
  .nv__link--toggle::before,
  .nv__menu-link,
  .nv__mega-link {
    transition: none;
  }
}
</style>
