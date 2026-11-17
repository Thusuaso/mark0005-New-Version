<script setup lang="ts">
/**
 * components/Home/Projects.vue
 *
 * Referans projeleri vitrini: SOLDA tek buyuk onizleme, SAGDA alti
 * projenin indeksi (thumb + ad + ulke). Indeks satirina fare gelince ya
 * da satir klavyeyle odaklanilinca onizleme o projeye geciyor.
 *
 * Oncesinde iki kolonlu esit bir kart izgarasiydi; neden degistigi
 * asagidaki ".pj__layout" basligindaki notta duruyor.
 *
 * Veri /api/projects/list — gercek referans projeleri (isim her dilde,
 * gorsel CDN'den, link SQL'de uretiliyor). Ana sayfada ilk ALTI tanesi
 * gosteriliyor; tamami /projects sayfasinda.
 *
 * Not: liste `Queue` alanina gore sirali geliyor, yani vitrine cikacak
 * projeler veritabanindan yonetiliyor — burada sabit id yok.
 */

import { computed, ref } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<
  Lang,
  { title: string; all: string }
> = {
  en: {
    title: "Featured Projects",
    all: "View all projects",
  },
  fr: {
    title: "Projets en vedette",
    all: "Voir tous les projets",
  },
  es: {
    title: "Proyectos destacados",
    all: "Ver todos los proyectos",
  },
  ru: {
    title: "Избранные проекты",
    all: "Все проекты",
  },
  ar: {
    title: "مشاريع مميزة",
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
    /* Vitrinde 6 proje. Sayi artik izgara satirina gore degil indeksin
       okunurluguna gore: alti satir, solundaki 3/2 onizlemeyle kabaca
       ayni yuksekligi tutuyor. Daha uzun bir liste onizlemeden tasip
       iki kolonu hizasiz birakiyor. */
    .slice(0, 6)
    .map((row) => ({
      id: row.ID,
      name: String(row[`ProjectName${suffix}`] || row.ProjectName || "").trim(),
      country: String(row[`CountryName${suffix}`] || row.CountryName || "").trim(),
      image: row.Image,
      link: `${prefix}${row.Link}`,
    }));
});

/* Vitrin iki parcaya ayriliyor: solda tek buyuk ONIZLEME, sagda alti
   projenin referans indeksi. Esit alti kart yerine bu dizilimin
   gerekcesi bolumun isi — mimara "nereye is yaptik" kanitini vermek.
   Esit izgarada alti proje de ayni sesle konusuyor ve en ayirt edici
   veri olan ULKE kartin alt satirinda ikincil bir not olarak
   kaliyordu; indekste ulke kendi hizali kolonunu aliyor.

   active: onizlemede hangi projenin gorundugu. Indeks satirina fare
   gelince ya da satir klavyeyle odaklanilinca degisiyor — yani
   etkilesim kullanicinin eylemine CEVAP veriyor, kendiliginden
   oynayan bir animasyon degil.

   Fare listeden ayrilinca SIFIRLANMIYOR: son bakilan proje ekranda
   kaliyor. Sifirlamak, kullanici okumaya calisirken gorseli geri
   atlatiyor ve huzursuz bir his veriyor. */
const active = ref(0);

function show(i: number) {
  active.value = i;
}

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
        size="xl"
        as="h2"
      />

      <div class="pj__layout">
        <!-- ONIZLEME: alti gorsel ust uste duruyor, gorunen olani
             opacity seciyor. src degistirmek yerine ust uste yigmanin
             nedeni: hepsi bolum ekrana girdiginde inmis oluyor, boylece
             satirdan satira geciste bos kare ya da gecikme olmuyor.

             BAGLANTI DEGIL, bilerek: aktif projeye giden link sagdaki
             satirin kendisi. Burasi da link olsaydi ayni hedefe iki
             baglanti olur, klavyeyle gezinen biri her projeyi iki kez
             gecmek zorunda kalirdi.

             aria-hidden + alt="": bu bir sunum katmani; proje adi ve
             ulkesi sagdaki listede zaten metin olarak var. -->
        <div class="pv" aria-hidden="true">
          <!-- <img> DEGIL <NuxtImg>: bu gorseller CDN'de 881 KB - 1.4 MB
               arasinda duruyor ve altisi birlikte ~6 MB ediyordu, bir
               kismi .jpg olarak. Iki CDN domaini nuxt.config.ts
               image.domains icinde izinli, bu yuzden IPX uzak dosyayi
               cekip olcekliyor ve webp'e ceviriyor. Olculdu: 1.459 KB
               -> 303 KB (1400w) / 36 KB (480w). -->
          <NuxtImg
            v-for="(project, i) of projects"
            :key="project.id"
            class="pv__img"
            :class="{ 'is-on': i === active }"
            :src="project.image"
            alt=""
            sizes="xs:100vw sm:100vw md:60vw lg:60vw xl:720px xxl:720px"
            loading="lazy"
            decoding="async"
          />
        </div>

        <!-- INDEKS: alti projenin tamami. Satirlar arasindaki cizgiler
             sus degil, kayitlari birbirinden ayiran yapisal bilgi. Sira
             numarasi YOK: icerik bir sira ya da asama degil. -->
        <ul class="idx">
          <li
            v-for="(project, i) of projects"
            :key="project.id"
            class="idx__item"
          >
            <NuxtLink
              class="idx__link"
              :class="{ 'is-active': i === active }"
              :to="project.link"
              target="_blank"
              rel="noopener"
              @mouseenter="show(i)"
              @focus="show(i)"
            >
              <!-- Thumb masaustunde kucuk bir tutamak, DAR EKRANDA ise
                   gorselin kendisi: onizleme 48rem altinda gizleniyor
                   (fare yok, hover calismaz), o yuzden thumb orada
                   buyuyor ve alti projenin gorseli yine gorunuyor. -->
              <span class="idx__thumb">
                <NuxtImg
                  class="idx__img"
                  :src="project.image"
                  alt=""
                  sizes="xs:96px sm:112px md:64px lg:64px xl:64px xxl:64px"
                  densities="1x 2x"
                  loading="lazy"
                  decoding="async"
                />
              </span>

              <span class="idx__name">
                <span class="idx__line">{{ project.name }}</span>
              </span>

              <span v-if="project.country" class="idx__country">{{
                project.country
              }}</span>
            </NuxtLink>
          </li>
        </ul>

        <!-- Buton izgaranin ICINDE ve SON cocuk — ikisi de bilerek.
             Masaustunde CSS onu birinci kolonun ikinci satirina, yani
             onizlemenin hemen altina koyuyor; o bos alan zaten indeks
             kolonundan daha kisa olan gorsel yuzunden olusuyordu.

             Son cocuk olmasinin sebebi dar ekran: orada izgara tek
             kolon ve onizleme gizli (.pv display:none). Buton DOM'da
             onizlemeden hemen sonra gelseydi, dar ekranda indeksin
             USTUNDE kalir, yani liste gorulmeden "hepsini gor" denmis
             olurdu. Son cocuk olunca her iki dizilimde de dogru yere
             dusuyor. -->
        <div class="pj__action">
          <UiBtn :label="t.all" :to="projectsLink" variant="black" />
        </div>
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

/* Baslik ile icerigi arasindaki bosluk. Basliklar 64 -> 48px'e inince
   96px'lik ayrim basligi kendi bolumunden kopuk gosteriyordu: bosluk
   basligin kendi yuksekliginden iki kat buyuktu. */
.pj__head {
  margin-bottom: clamp(1.75rem, 4.5vw, 4rem);
}

/* --- Dizilim: lead + indeks ---
   TARIHCE: once 12 kolonluk kademeli bir dizilim vardi (dagilmistı,
   kartlar ayni hatta oturmuyordu), sonra esit iki kolonlu bir izgaraya
   cevrildi. O izgara hizaliydi ama alti projeyi de ayni sesle
   konusturuyordu: bolumun isi "nereye is yaptik" kanitini sunmak ve en
   ayirt edici veri olan ULKE kartin alt satirinda ikincil bir not
   olarak kaliyordu. Ayrica esit kart izgarasi Categories ile ayni
   yapisal kaliba donuyordu.

   SIMDI asimetrik: ilk proje tek buyuk gorsel (lead), kalan bes proje
   ince cizgilerle ayrilmis bir referans indeksi — ulke orada kendi
   hizali kolonunda. Ayrisma kart dilinden degil HIYERARSIDEN geliyor:
   Categories esit uc kolon, burada bir iri eleman + bir liste. Oran
   karsitligi da bunu destekliyor: lead 3/2, thumb 1/1.

   Dar ekranda tek kolon (lead ustte, indeks altinda), 48rem ustunde iki
   kolon. Lead kolonu daha genis (1.45fr): bolumun tek iri elemani o.
   align-items: start, yoksa kisa indeks lead'in yuksekligine kadar
   gerilip satir araliklari aciliyor. */
.pj__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 2.75rem);
}

@media (min-width: 48rem) {
  .pj__layout {
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    column-gap: clamp(1.5rem, 3vw, 3rem);
    align-items: start;
  }

  /* Iki satir: ustte gorsel, altinda buton. Satir olculeri
     `auto 1fr` — bu kisim onemli.

     Indeks (sag kolon) HER IKI satira yayiliyor. Boyle olmasaydi
     birinci satirin yuksekligini o belirlerdi: indeks gorselden uzun
     oldugu icin buton, fotografin degil LISTENIN altina duserdi ve
     aralarinda bir ekranin dortte biri kadar bosluk kalirdi (once
     oyle oldu).

     Yayilan ogenin fazla yuksekligi `1fr` olan ikinci satira
     gidiyor, birinci satir fotografin kendi yuksekliginde kaliyor;
     `align-self: start` ile de buton o satirin tepesine, yani
     fotografin hemen altina oturuyor. */
  .pj__layout {
    grid-template-rows: auto 1fr;
    /* Temel kuraldaki `gap` dar ekrandaki dikey yigin icin; burada
       satir araligi butonu fotograftan 44px daha uzaklastiriyordu
       (butonun kendi ust bosluguyla birlikte 64px). Aralik artik
       yalnizca .pj__action'in margin'inden geliyor. */
    row-gap: 0;
  }

  .pj__layout > .pv {
    grid-column: 1;
    grid-row: 1;
  }

  .pj__layout > .idx {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  .pj__layout > .pj__action {
    grid-column: 1;
    grid-row: 2;
    align-self: start;
  }
}

/* Giris hareketi TEK: oncesinde her hucre `--i * 90ms` gecikmeyle tek
   tek kayarak giriyordu. Alti ayri kayma, bolumu olusturan parcalari
   birbirinden kopariyor ve sitedeki diger alti bolumle birlikte ayni
   efektin yedinci tekrari oluyordu. Simdi bolum tek parca halinde bir
   kez beliriyor. */
.pj__layout {
  opacity: 0;
  transform: translateY(1.25rem);
  transition:
    opacity 0.7s var(--mk-ease),
    transform 0.7s var(--mk-ease);
}

.pj.is-in .pj__layout {
  opacity: 1;
  transform: none;
}

/* --- Onizleme ---
   Alti gorsel ayni kareyi paylasiyor: ilki normal akista durup kareye
   yuksekligini veriyor, digerleri uzerine absolute biniyor. Konteynere
   aspect-ratio verildigi icin hicbiri yuklenmeden de kare yerini
   ayiriyor, yani gorsel inince sayfa kaymiyor (CLS).

   Dar ekranda GIZLI: fare yok, hover ile proje degistirmek mumkun
   degil; orada gorselleri indeksin thumb'lari tasiyor. display: none
   oldugu icin o boyutlarda bu alti dosya hic indirilmiyor. */
.pv {
  display: none;
}

@media (min-width: 48rem) {
  .pv {
    position: relative;
    display: block;
    overflow: hidden;
    aspect-ratio: 3 / 2;
    background: var(--mk-cream-2);
  }
}

.pv__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.45s var(--mk-ease);
}

/* Ilki disindakiler akistan cikiyor; ilki kareyi "doldurma" gorevini
   surduruyor. */
.pv__img:not(:first-child) {
  position: absolute;
  inset: 0;
}

.pv__img.is-on {
  opacity: 1;
}

/* --- Indeks --- */
.idx {
  margin: 0;
  padding: 0;
  list-style: none;
  /* Ilk satirin ust cizgisi; geri kalani .idx__item tasiyor. */
  border-block-start: 1px solid var(--mk-border);
}

.idx__item {
  border-block-end: 1px solid var(--mk-border);
}

/* auto | 1fr | auto : thumb, isim, ulke. Ulke kendi kolonunda ve satir
   sonuna hizali — ayirt edici veri oldugu icin artik ismin altinda
   ikincil bir satir degil, okunabilir bir kolon. Logical property'ler
   /ar sayfasinda yonun kendiliginden donmesi icin. */
.idx__link {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
  padding-block: clamp(0.75rem, 1.4vw, 1rem);
  text-decoration: none;
  color: var(--mk-ink);
}

.idx__link:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 4px;
}

/* AKTIF SATIR: onizlemede hangi projenin durdugunu gosteren tek
   isaret. Renk YOK (palet tek renkli) — ayrim KOYULUK ve satir
   basindaki ince cizgiyle kuruluyor. Pasif satirlarin adi ikincil
   griye dusuyor, aktif olan tam koyuya cikiyor.

   Cizgi border degil box-shadow: border eklemek satirin genisligini
   degistirip metni kaydiriyordu. */
.idx__name {
  transition: color 0.3s var(--mk-ease);
}

@media (min-width: 48rem) {
  .idx__link .idx__name {
    color: var(--mk-grey-2);
  }

  .idx__link.is-active .idx__name {
    color: var(--mk-ink);
  }

  .idx__link {
    transition: box-shadow 0.3s var(--mk-ease);
  }

  .idx__link.is-active {
    box-shadow: inset 2px 0 0 0 var(--mk-ink);
    padding-inline-start: 0.75rem;
  }
}

/* RTL: inset box-shadow yon bilmiyor, /ar sayfasinda cizgi yanlis
   tarafta kalirdi. Orada aynalaniyor. */
@media (min-width: 48rem) {
  [dir="rtl"] .idx__link.is-active {
    box-shadow: inset -2px 0 0 0 var(--mk-ink);
  }
}

/* Kare: onizlemenin 3/2 kadrajiyla oran karsitligi kuruyor, ikisi ayni
   seyin iki boyu gibi gorunmuyor. Dar ekranda onizleme gizli oldugu
   icin thumb buyuyor ve gorseli o tasiyor. */
.idx__thumb {
  display: block;
  inline-size: clamp(4.5rem, 22vw, 7rem);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--mk-cream-2);
}

@media (min-width: 48rem) {
  .idx__thumb {
    inline-size: clamp(3rem, 5vw, 4rem);
  }
}

.idx__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.idx__link:hover .idx__img,
.idx__link:focus-visible .idx__img {
  transform: scale(1.06);
}

.idx__name {
  font-family: var(--mk-ff-display);
  font-size: clamp(1rem, 1.3vw, 1.125rem);
  font-weight: 500;
  line-height: 1.3;
  color: var(--mk-ink);
}

.idx__country {
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--mk-grey-2);
  text-align: end;
  white-space: nowrap;
}

/* Proje adinin altindaki cizgi: uzerine gelince soldan saga aciliyor.
   Kartli dizilimden kalan tek hareket bu — orada `.work` sarmalayicisi
   tetikliyordu, simdi indeks satiri tetikliyor.

   transform-origin: inline-start — /ar sayfasinda cizgi sagdan
   acilsin. */
.idx__line {
  position: relative;
  display: inline-block;
}

.idx__line::after {
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

.idx__link:hover .idx__line::after,
.idx__link:focus-visible .idx__line::after {
  transform: scaleX(1);
}

/* Dar ekranda buton indeksin altinda, ortada: orada tek kolon var ve
   bolumu kapatan bir eylem. */
.pj__action {
  margin-top: clamp(2.5rem, 6vw, 4.375rem);
  text-align: center;
}

/* Masaustunde buton fotografin ALTINDA ve onun genisliginde ortali:
   birinci izgara kolonu zaten gorselin kendisi kadar genis, yani
   `center` butonu kadrajin ortasina hizaliyor.

   Ust bosluk kucuk (bolumun diger araliklarinin cok altinda): buton
   artik bolumu kapatan ayri bir satir degil, gorsele AIT bir eylem —
   aralik buyudukce ikisi birbirinden koptu. */
@media (min-width: 48rem) {
  .pj__action {
    margin-top: clamp(0.875rem, 1.5vw, 1.25rem);
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pj__layout,
  .idx__line::after,
  .idx__img,
  .idx__name,
  .idx__link,
  .pv__img {
    transition: none;
  }

  /* Giris hareketi kapaliyken bolum bastan gorunur olmali, yoksa
     opacity: 0 ile ekranda hic cikmaz. */
  .pj__layout {
    opacity: 1;
    transform: none;
  }

  .idx__link:hover .idx__img,
  .idx__link:focus-visible .idx__img {
    transform: none;
  }

  /* Onizleme gecisi kapali: gorsel aninda degisiyor, carpraz gecis
     yapmiyor. Etkilesim yine calisiyor, yalnizca hareket yok. */
  .pv__img {
    transition: none;
  }
}
</style>
