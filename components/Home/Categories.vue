<script setup lang="ts">
/**
 * components/Home/Categories.vue
 *
 * Temadaki "service" bolumunun karsiligi: dev iki satirli baslik, altinda
 * kategori izgarasi. Veri store'daki `categories`
 * (assets/data/<lang>.json) — eski ana sayfadaki listeyle ayni.
 *
 * Kart gorunumu: cerceve yok, kategori adi fotografin SOL ALT kosesinde
 * (Best sellers ile ayni dil), baslikta hover'da acilan alt cizgi. Kartlarin
 * 01/02/03 numaralari kaldirildi (bilgi tasimiyorlardi) ve alttaki
 * "View all products" butonu da kaldirildi — izgaranin kendisi zaten tum
 * kategorileri gosteriyor.
 *
 * Ilk uc gorsel eager (fold'a yakin olabiliyor), gerisi lazy. Bolumun
 * kendisi Home/Page.vue tarafindan hydrate-on-visible ile tembel hidrate
 * ediliyor.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

/* Bolum basligi, bolumun ne oldugunu soyluyor: altinda malzeme
   kategorilerinin izgarasi var.

   Oncesinde burada marka slogani ("Sustained by Nature, Crafted for
   Life") duruyordu; o slogan ilk ekrana, sayfanin h1'ine tasindi
   (bkz. Home/Hero.vue) ve ceviriler oradan devam ediyor. Ayni cumle
   ayni sayfada iki kez gorunmemeli: slogan ilk ekranda markanin
   imzasiyken burada bir bolum etiketi gibi okunuyordu ve iki yerde de
   gecince ikisinin agirligi birden dusuyordu.

   Daha oncesinde (3e7a584) basligin ustunde "MATERIALS" diye kucuk bir
   etiket vardi ve basligin kendisi "Stone that / builds places" idi —
   yani etiket bolumu, baslik ise markayi anlatiyordu. Etiket
   SectionHead'den kaldirilirken tasidigi bilginin basligin icine
   yazilmasi gerekiyordu; burada o yapiliyor. Tek satir, `line2` yok. */
const texts: Record<Lang, { title: string }> = {
  en: { title: "Our materials" },
  fr: { title: "Nos matériaux" },
  es: { title: "Nuestros materiales" },
  ru: { title: "Наши материалы" },
  ar: { title: "موادنا" },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const categories = computed<any[]>(() => (store.getCategories as any[]) ?? []);
const { el, shown } = useReveal();
</script>

<template>
  <section
    v-if="categories.length"
    ref="el"
    class="ct"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="ct-title"
  >
    <div class="ct__inner">
      <UiSectionHead class="ct__head" :title="t.title" size="xl" as="h2" />

      <ul class="ct__grid">
        <li
          v-for="(category, i) of categories"
          :key="category.id"
          class="ct__cell"
          :style="{ '--i': i }"
        >
          <NuxtLink
            class="card"
            :to="category.link"
            target="_blank"
            rel="noopener"
          >
            <div class="card__frame">
              <!-- <img> DEGIL <NuxtImg>: kaynak dosyalar public/image
                   altinda tek boyutta duruyordu (katalogda 400x400 ile
                   5311x3741 arasi), yani 315 px'lik bir kutuya kimi
                   zaman 5 MP'lik dosya iniyordu. NuxtImg ayni dosyadan
                   olcekli surumler uretip srcset olarak veriyor.

                   width/height YOK, bilerek: CLS'i .card__frame'in
                   aspect-ratio: 4/3'u zaten onluyor, nitelik eklemek
                   object-fit duzenini bozmadan bir sey kazandirmiyor.

                   sizes izgaranin kendisinden turetildi: 48rem altinda
                   2 kolon (50vw), ustunde 3 kolon (33vw); konteyner
                   75rem'de durdugu icin en genis ekranda kart
                   1200/3 = 400 px'i gecmiyor.

                   loading HEPSINDE "lazy". Oncesinde ilk uc kart
                   `i < 3 ? 'eager' : 'lazy'` ile eager isteniyordu;
                   kaldirildi cunku bu bolum fold'un ALTINDA: ana sayfa
                   sirasi Hero -> Stats -> Categories ve Hero tek basina
                   `calc(--hr-stage-h + 130vh)` yuksekliginde. Yani o uc
                   gorsel hicbir zaman ilk ekranda gorunmuyor ama LCP
                   adayi olan hero fotografiyla ayni anda indiriliyor ve
                   bant genisligi icin onunla yarisiyordu.

                   Olculdu: ana sayfada fetchpriority="high" tasiyan iki
                   kaynak var (logo + hero slider) ve ikisi de yerinde;
                   sorun bu uc eager istekti. Fold altindaki normal
                   gorseller icin "lazy" tek basina yeterli, ayrica
                   fetchpriority="low" EKLENMEMELI — kullanici oraya
                   kaydirinca normal oncelikle inmeleri gerekiyor. -->
              <NuxtImg
                class="card__img"
                :src="category.image"
                :alt="category.name"
                sizes="xs:50vw sm:50vw md:33vw lg:33vw xl:400px xxl:400px"
                loading="lazy"
                decoding="async"
              />

              <!-- KATEGORI ADI KADRAJIN ICINDE, SOL ALTTA.
                   Best sellers bolumuyle ayni dil (bkz.
                   Home/BestSellers.vue): ayni sayfada iki fotograf
                   izgarasi var ve birinde ad kadrajin icinde digerinde
                   altinda olursa ikisi iki ayri kart sistemi gibi
                   okunuyor.

                   Perde (gradient) adin kendi zemini: kategori
                   fotograflarinin bir kismi cok acik (beyaz mermer,
                   acik traverten) ve ciplak beyaz yazi orada
                   kayboluyor. -->
              <div class="card__row">
                <h3 class="card__name"><span class="card__line">{{ category.name }}</span></h3>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Zemin kenardan kenara; ic genislik diger bolumlerle ayni kalipta
   (bkz. Projects/Stats/Facilities) ki basliklar hizali olsun. */
.ct {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream-2);
}

.ct__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

/* Punto ezmesi KALDIRILDI. Buradaki clamp(1.5rem, 4.6vw, 5rem), baslik
   bir slogan oldugu ve --mk-title-xl de 144px oldugu donemde gerekliydi:
   o puntoda Ispanyolca "Sostenidos por la naturaleza," tek satira
   sigmiyordu. Simdi baslik iki kelime ("Our materials") ve --mk-title-xl
   zaten 64px — bolum basliklarinin ortak olcegi burada da dogru deger,
   ayrica ezilmesi bu bolumu digerlerinden farkli gosteriyordu. */

/* Baslik ile icerigi arasindaki bosluk. Basliklar 64 -> 48px'e inince
   96px'lik ayrim basligi kendi bolumunden kopuk gosteriyordu: bosluk
   basligin kendi yuksekliginden iki kat buyuktu. */
.ct__head {
  margin-bottom: clamp(1.75rem, 4.5vw, 4rem);
}

/* --- Izgara --- */
.ct__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 1.875rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .ct__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* --- Kademeli giris --- */
.ct__cell {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.7s var(--mk-ease),
    transform 0.7s var(--mk-ease);
  /* 9'dan sonra sabitleniyor ki listenin sonu bekletmesin. */
  transition-delay: calc(min(var(--i), 9) * 70ms);
}

.ct.is-in .ct__cell {
  opacity: 1;
  transform: none;
}

/* --- Kart --- */
.card {
  display: block;
  text-decoration: none;
  color: var(--mk-ink);
}

/* position: relative — ad artik kadrajin ICINDE, mutlak konumlu. */
.card__frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--mk-cream-2);
}

.card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.card:hover .card__img,
.card:focus-visible .card__img {
  transform: scale(1.05);
}

.card:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 4px;
}

/* --- Ad: kadrajin sol alt kosesi ---
   ONCESI: kare + ALTINDA baslik satiri (flex, cunku yaninda bir sira
   numarasi vardi; numara kaldirildiktan sonra flex de gereksiz kaldi).

   `inset-inline-start` / `text-align: start` kullaniliyor, `left`
   degil: bolum Arapca'da dir="rtl" aliyor ve ad o zaman kendiliginden
   sag alta geciyor.

   Ust dolgu bilerek buyuk: perdenin fotografa sinmesi icin gereken
   mesafe o, yoksa kadrajin uzerinde kesik bir cizgi olusuyor. */
.card__row {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: clamp(2.5rem, 6vw, 4rem) clamp(0.875rem, 1.8vw, 1.375rem)
    clamp(0.625rem, 1.4vw, 1.0625rem);
  background: linear-gradient(
    to top,
    rgb(12 12 12 / 72%) 0%,
    rgb(12 12 12 / 46%) 38%,
    rgb(12 12 12 / 0%) 100%
  );
  text-align: start;
  pointer-events: none;
}

/* text-shadow soluk fotograflar icin ikinci guvence: perde tek basina
   acik traverten uzerinde sinirda kaliyordu. */
.card__name {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: var(--mk-ff-display);
  font-size: clamp(0.875rem, 1.4vw, 1.125rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: normal;
  text-transform: none;
  color: #fff;
  text-shadow: 0 1px 3px rgb(0 0 0 / 45%);
}

/* Temadaki .border-line: hover'da soldan saga acilan alt cizgi. */
.card__line {
  position: relative;
  display: inline-block;
}

.card__line::after {
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

.card:hover .card__line::after,
.card:focus-visible .card__line::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .ct__cell,
  .card__img,
  .card__line::after {
    transition: none;
  }

  .ct__cell {
    opacity: 1;
    transform: none;
  }

  .card:hover .card__img,
  .card:focus-visible .card__img {
    transform: none;
  }
}
</style>
