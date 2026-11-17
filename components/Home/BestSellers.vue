<script setup lang="ts">
/**
 * components/Home/BestSellers.vue
 *
 * Urun izgarasi: 12 urun, 2 / 3 (48rem) / 4 (62rem) kolon. Her hucre
 * 4/3 kadraj, urun adi kadrajin SOL ALT kosesinde, kareler arasinda
 * gercek oluk. Karelerin
 * zemini --mk-cream-2, cunku katalog fotograflarinin cogu soluk ve
 * beyaz uzerinde beyaz fotograf sinirsiz kaliyor.
 *
 * Veri /api/products/bestsellers — urun id'leri sunucuda elle secili,
 * isim/gorsel veritabanindan geliyor.
 *
 * ONCESINDE PrimeVue Carousel ile kaydirilabilir bir seritti (4/3/2
 * gorunur). Neden izgaraya cevrildigi template icindeki notta.
 *
 * Gorunum temanin kart dili: cerceve yok, gorsel + uzerinde baslik,
 * baslikta hover'da acilan alt cizgi.
 *
 * useFetch SSR'da kosuyor; bolum Home/Page.vue'da hydrate-on-visible ile
 * tembel hidrate ediliyor, yani HTML hazir gelir ama JS gorunur olana
 * kadar beklemez.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { title: string }> = {
  en: {
    title: "Best sellers of 2026",
  },
  fr: {
    title: "Meilleures ventes de 2026",
  },
  es: {
    title: "Más vendidos de 2026",
  },
  ru: {
    title: "Хиты продаж 2026 года",
  },
  ar: {
    title: "الأكثر مبيعاً لعام 2026",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const { data } = await useFetch<{ products: any[] }>(
  "/api/products/bestsellers",
  { query: { lang }, key: `bestsellers-${lang}` },
);

/* 12'de kesiliyor. Serit yerine izgaraya gecildigi icin bu sinir artik
   gerekli: carousel'de urun sayisinin artmasi bolumu uzatmiyordu, cunku
   fazlasi saga kayiyordu. Izgarada ise her yeni urun bolume bir satir
   daha ekler. 12 = masaustunde tam uc satir (4 kolon), dar ekranda alti
   satir (2 kolon). API su an 12 donuyor; sunucuda secim buyurse bolumun
   yuksekligi kendiliginden sismeyecek. */
/* 9'da kesiliyor ve bu sayi dizilimden geliyor, keyfi degil:
   masaustunde izgara 4 kolon x 3 satir = 12 hucre; ilk urun 2 kolon x
   2 satir kapliyor (4 hucre), geriye 8 tekli hucre kaliyor. 1 + 8 = 9.
   Baska bir sayi son satiri yarim birakir.

   Dar ekranda (48rem alti) genisletme kapali, 9 urun 2 kolonda bes
   satir ediyor; son satirda tek hucre kaliyor ki bu dar ekranda sorun
   degil, ustelik listenin devami oldugunu ima etmiyor. */
const products = computed<any[]>(() =>
  (data.value?.products ?? []).slice(0, 9),
);

/* PrimeVue Carousel'in `responsiveOptions` dizisi kaldirildi (genis
   ekranda 4 / tablette 3 / telefonda 2 gorunur). Kirilim noktalari artik
   CSS'te, .board izgarasinda. */

const { el, shown } = useReveal();
</script>

<template>
  <section
    v-if="products.length"
    ref="el"
    class="bs"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="bs-title"
  >
    <div class="bs__inner">
      <UiSectionHead
        class="bs__head"
        :title="t.title"
        size="xl"
        as="h2"
      />

      <!-- CAROUSEL DEGIL IZGARA.
           ------------------------------------------------------------
           Oncesinde PrimeVue Carousel vardi (4/3/2 gorunur, dairesel,
           oklarla). Iki gerekcesi yazilmisti: urun sayisi artabilir ve
           dar ekranda kartlarin alt alta dizilmesi bolumu uzatiyordu.
           Birincisi script'teki 12'lik sinirla karsilandi.

           Ikincisi icin takas bilincli: serit, 12 urunun 8'ini
           etkilesim arkasinda tutuyordu. Bir mimar ya da ithalatci
           icin bu bolumun isi "bu yil piyasanin sectigi tas seti"ni
           TARAMAK; yatay kaydirma taramayi yavaslatiyor, dikey
           kaydirma telefonda zaten dogal hareket.

           Dizilim sakin ve esit: her hucre 4/3 kadraj, urun adi
           kadrajin icinde, aralarinda gercek oluk. Hiyerarsi yok cunku icerik de
           hiyerarsik degil — bunlar bir yil icinde en cok satan on iki
           urun, biri digerinden onemli degil. Sira numarasi da yok:
           API sirasi editoryal bir secim, gercek bir satis siralamasi
           degil; numaralamak veriye dayanmayan bir iddia olurdu. -->
      <ul class="board">
        <li
          v-for="(product, i) of products"
          :key="product.link"
          class="board__cell"
          :class="{ 'is-wide': i === 0 }"
        >
          <NuxtLink
            class="pc"
            :to="product.link"
            target="_blank"
            rel="noopener"
          >
            <div class="pc__frame">
              <!-- <img> DEGIL <NuxtImg>: gerekce Home/Categories.vue
                   icindeki ile ayni — kaynak dosyalar tek ve cok buyuk
                   boyutta duruyor, NuxtImg olcekli surumleri uretiyor.

                   width/height YOK: .pc__frame'in aspect-ratio: 1/1'i
                   yer ayirmayi zaten yapiyor.

                   sizes .board izgarasindan turetildi: dar ekranda 2
                   kolon (50vw), 48rem ustunde 3, 62rem ustunde 4.
                   Konteyner 75rem'de durdugu icin kare en genis ekranda
                   1200/4 = 300 px'i gecmiyor. -->
              <NuxtImg
                class="pc__img"
                :src="product.image"
                :alt="product.name"
                :sizes="
                  i === 0
                    ? 'xs:50vw sm:50vw md:66vw lg:50vw xl:600px xxl:600px'
                    : 'xs:50vw sm:50vw md:33vw lg:25vw xl:300px xxl:300px'
                "
                loading="lazy"
                decoding="async"
              />

              <!-- URUN ADI KARENIN ALTINDA DEGIL ICINDE.
                   ----------------------------------------------------
                   Ad artik fotografin SOL ALT kosesinde duruyor. Iki
                   kazanci var: her hucre tek bir nesne olarak okunuyor
                   (fotograf + etiket, altinda ayri bir satir yok) ve
                   izgara satirlari kisaliyor, bolum toparlaniyor.

                   Riski okunabilirlik: katalogdaki fotograflarin bir
                   kismi cok acik (bej travertenli banyo, beyaz mermer
                   lavabo). Bu yuzden ad, cikplak sekilde fotografin
                   uzerine yazilmiyor; .pc__row kendi uzerinde asagidan
                   yukari sonen bir perde tasiyor. Perde fotografin
                   yalnizca alt seridini koyulastiriyor, kadrajin geri
                   kalanina dokunmuyor. -->
              <div class="pc__row">
                <h3 class="pc__name">
                  <span class="pc__line">{{ product.name }}</span>
                </h3>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.bs {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
  opacity: 0;
  transition: opacity 0.7s var(--mk-ease);
}

.bs.is-in {
  opacity: 1;
}

.bs__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

/* Baslik ile icerigi arasindaki bosluk. Basliklar 64 -> 48px'e inince
   96px'lik ayrim basligi kendi bolumunden kopuk gosteriyordu: bosluk
   basligin kendi yuksekliginden iki kat buyuktu. */
.bs__head {
  margin-bottom: clamp(1.75rem, 4.5vw, 3.5rem);
}

/* --- Urun izgarasi ---
   ONCESI: PrimeVue Carousel kabugu (temanin kutusu sifirlanmis, iki
   yuvarlak ok butonu). Serit yerine izgaraya gecildi; neden, template
   icindeki notta.

   ARA DENEME — BASARISIZ, tekrarlanmasin: kareler birbirine dayali,
   `gap: 1px` ve izgara zemini --mk-border idi; amac araliklarin cizgi
   gibi okunup "doseli tek bir yuzey" / tas numune panosu hissi
   vermesiydi. Pratikte TABLO KENARLIGI gibi gorundu ve iki sorunu
   birlikte uretti:

     1. Butun hava yok oldu. Carousel'de kartlar arasinda
        clamp(0.31rem, 0.9vw, 0.94rem) dolgu vardi; 1px onun yerini
        tutmuyor.
     2. Urun fotograflarinin cogu soluk (beyaz/bej mermer, beyaz
        zeminde lavabo). Beyaz bolumde beyaz hucrede soluk kare,
        sinirsiz bir alana donusuyor — 12 tanesi yan yana gelince
        odak noktasi olmayan bir yuzey.

   SIMDI: gercek oluklu bir izgara. Ayrim cizgiyle degil BOSLUKLA
   kuruluyor; her fotograf kendi nesnesi olarak okunuyor. */
.board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(0.75rem, 2vw, 1.75rem);
  row-gap: clamp(1.5rem, 3.5vw, 2.75rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .board {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 62rem) {
  .board {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Hucreler satir icinde esit yukseklige geriliyor, boylece uzun urun
   adlari (ornek: "Classic Vein Cut Travertine Honed") iki satira
   tasidiginda o satirin butun kareleri ayni hatta kaliyor. Ayri bir
   zemin YOK: ayrim artik boslukla kuruluyor. */
.board__cell {
  display: flex;
}

/* --- Ilk urun iki kolon ---
   Bu bolumun esas sorunu oran degil YAPIYDI: esit izgara + 4/3 fotograf
   + altinda ad, Home/Categories.vue ile birebir ayni kalip. Sayfa
   Categories, Projects, Facilities ve burasiyla birlikte ust uste
   dort fotograf izgarasi gibi okunuyordu.

   Ilk urunu iki kolona yaymak bolume kendi ritmini ve bir odak noktasi
   veriyor. Genis kadraj ayrica bu katalogun fotograflarina uyuyor:
   bunlar urun cekimi degil, yerinde kullanim sahneleri (banyo, salon,
   cephe) ve genis kutuda malzeme kadrajin icinde kaliyor.

   IKI KOLON VE IKI SATIR birlikte: yalnizca kolon yayilsaydi genis
   hucre komsularinin iki kati yukseklikte olur, satir hizasi bozulur
   ve yaninda bos bir sutun kalirdi. Iki satira da yayilinca yuksekligi
   komsu iki satirin toplamina esitleniyor, blok kapali duruyor.

   Yalnizca 48rem ustunde: dar ekranda zaten 2 kolon var, genisletme
   bir urunu tum satira yayip digerlerinden kopartirdi. */
@media (min-width: 48rem) {
  .board__cell.is-wide {
    grid-column: span 2;
    grid-row: span 2;
  }

  /* Genis hucrede kare ORANI degil, hucrenin kendi yuksekligini
     dolduruyor: yukseklik iki satirdan geldigi icin sabit bir oran
     vermek kutuyu komsularla uyumsuz yapardi. */
  .board__cell.is-wide .pc {
    display: flex;
    flex-direction: column;
  }

  .board__cell.is-wide .pc__frame {
    flex: 1;
    aspect-ratio: auto;
  }
}

/* --- Urun karti --- */
/* width: 100% — hucre artik flex konteyner, onsuz kart icerik
   genisliginde kaliyor ve karenin sagi bos duruyor. */
.pc {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: var(--mk-ink);
}

/* Zemin --mk-cream-2 (#e8e8e8), bolumun beyazi DEGIL. Katalogdaki
   fotograflarin cogu soluk — beyaz/bej mermer, beyaz zeminde lavabo —
   ve beyaz bir karede beyaz bir fotograf sinirsiz kaliyor. Acik gri
   tabak, fotografin nerede bittigini renk kullanmadan soyluyor; ayrica
   fotograf inene kadar karenin yerini gorunur kiliyor. */
/* ORAN 1/1 DEGIL 4/3 — ekranda bakilarak degistirildi.

   Bu katalogdaki fotograflar urun cekimi degil YERINDE KULLANIM
   fotograflari: banyo, salon, tezgah, bina cephesi. Hepsi genis
   kadrajli ve 1/1'e sikistirilinca merkezden kirpiliyordu; sonucta
   "Perla Limestone" karesinde bina cephesinin alt serisi ve bahce
   hortumu, "Classic Vein Cut Travertine Honed" karesinde yemek masasi
   kaliyor, asil malzeme kadrajin disinda kaliyordu.

   4/3 hem bu fotograflarin kendi orani, hem de sitenin geri kalaniyla
   ayni dil: Categories 4/3, Facilities 4/3, Projects 3/2. 1/1 tek
   istisnaydi.

   Yan fayda: kare yuksekligi 279 -> ~209 px'e indigi icin 12 urunluk
   bolum de kisaliyor. */
/* position: relative — ad artik karenin ICINDE, mutlak konumlu. */
.pc__frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--mk-cream-2);
}

.pc__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.pc:hover .pc__img,
.pc:focus-visible .pc__img {
  transform: scale(1.05);
}

/* Pozitif offset'e donuldu: hucreler artik birbirine dayali degil,
   aralarinda gercek bosluk var, yani halka komsu kareyi kirpmiyor. */
.pc:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 3px;
}

/* --- Ad: fotografin sol alt kosesi ---
   ONCESI: kare + ALTINDA ayri bir baslik satiri (yalnizca ust dolgu,
   yan dolgu yok, boylece ad karenin sol kenariyla hizaliydi).

   SIMDI ad kadrajin icinde. `inset-inline-start` / `text-align: start`
   kullaniliyor, `left` degil: bolum Arapca'da dir="rtl" aliyor ve ad o
   zaman kendiliginden sag alta geciyor.

   Perde (gradient) ADIN KENDI ZEMINI, karenin tamamina serilen ayri bir
   katman degil: tek bir elemanla hem konum hem kontrast cozuluyor.
   Ust ucu saydam bitiyor ki fotografin uzerinde kesik bir cizgi
   olusmasin; ust dolgu bilerek buyuk, perdenin sonme mesafesi o. */
.pc__row {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: clamp(2.5rem, 6vw, 4rem) clamp(0.75rem, 1.6vw, 1.25rem)
    clamp(0.625rem, 1.4vw, 1rem);
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
   beyaz mermer uzerinde sinirda kaliyordu. */
.pc__name {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-size: clamp(0.8125rem, 1.3vw, 1rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: normal;
  text-transform: none;
  color: #fff;
  text-shadow: 0 1px 3px rgb(0 0 0 / 45%);
}

/* Genis hucrenin kadraji iki kat buyuk; ayni punto orada etiket gibi
   kaliyordu. Bir basamak buyuk ve perdesi biraz daha derin. */
.board__cell.is-wide .pc__name {
  font-size: clamp(0.9375rem, 1.5vw, 1.1875rem);
}

@media (min-width: 48rem) {
  .board__cell.is-wide .pc__row {
    padding: clamp(3.5rem, 8vw, 6rem) clamp(1rem, 2vw, 1.75rem)
      clamp(0.875rem, 1.8vw, 1.375rem);
  }
}

.pc__line {
  position: relative;
  display: inline-block;
}

.pc__line::after {
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

.pc:hover .pc__line::after,
.pc:focus-visible .pc__line::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .bs,
  .pc__img,
  .pc__line::after {
    transition: none;
  }

  .bs {
    opacity: 1;
  }

  .pc:hover .pc__img,
  .pc:focus-visible .pc__img {
    transform: none;
  }
}
</style>
