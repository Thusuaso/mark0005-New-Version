<template>
  <!-- Ustte ince ilerleme cubugu: her sayfa gecisinde -->
  <NuxtLoadingIndicator color="linear-gradient(90deg, #1e58c4, #63b32e)" :height="3" :throttle="100" />

  <!-- Gecis uzun surerse ortada gorunen perde -->
  <Transition name="pl_fade">
    <div v-if="visible" class="pgl" role="status" aria-live="polite" :dir="isRtl ? 'rtl' : 'ltr'">
      <div class="pgl_stack">
        <!-- MARKA ISARETI, YAZILI LOGO DEGIL.
             public/image/logo_loading.png yalnizca sembol (lacivert
             elmas + mavi yay + yesil yaprak); ust menudeki yazili logo
             (mekmar-logo.webp) burada kullanilmiyor cunku perde zaten
             sitenin ustunde duruyor, marka adi bir satir asagida ikinci
             kez okunmasi gereken bir bilgi degil.

             <img> ve width/height yazili: bu bilesen ClientOnly icinde,
             yani dosya ilk gecise kadar istenmeyebilir; olculer
             verilmezse perde acilirken isaret bir an yer kaplamayip
             yazinin ziplamasina yol aciyor. 500x657 kaynagin orani
             korunuyor. -->
        <span class="pgl_mark" aria-hidden="true">
          <img
            class="pgl_mark_img"
            src="/image/logo_loading.png"
            alt=""
            width="500"
            height="657"
            decoding="async"
          />
          <!-- Isaretin uzerinden asagi-yukari akan renk. Nasil
               kuruldugu ve neden boyle kuruldugu stil bolumunde
               (.pgl_band ve onu acan @supports dali). -->
          <span class="pgl_band"></span>
        </span>

        <!-- HAREKETIN TASIYICISI BURASI, ISARET DEGIL.
             Oncesinde donen bir cember (border-top-color + rotate) vardi
             — her sitede bulunan genel bir bilesen. Onun yerine 1px'lik
             bir hat ve ustunde gidip gelen kisa bir parca var; parcanin
             rengi logonun kendi uc rengi (lacivert -> mavi -> yesil).

             Isaretin kendisi neredeyse hic kipirdamiyor (cok hafif bir
             nefes). Logoyu dondurmek ya da yanip sondurmek markayi bir
             spinner'a cevirir; hareketi ayri bir ogeye vermek perdeyi
             sakin tutuyor. -->
        <span class="pgl_rule" aria-hidden="true"></span>

        <span class="pgl_text">{{ searching ? t.searching : t.loading }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { loading: string; searching: string }> = {
  en: { loading: "Loading", searching: "Searching products" },
  fr: { loading: "Chargement", searching: "Recherche de produits" },
  es: { loading: "Cargando", searching: "Buscando productos" },
  ru: { loading: "Загрузка", searching: "Поиск товаров" },
  ar: { loading: "جارٍ التحميل", searching: "جارٍ البحث عن المنتجات" },
};

/* Kisa gecislerde perde yanip sonmesin diye gecikmeli gosteriyoruz */
const SHOW_DELAY = 350;
const MAX_VISIBLE = 20000;

const store = useStore();
const lang = (String(store.getLang) in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const visible = ref(false);
const searching = ref(false);

let showTimer: ReturnType<typeof setTimeout> | undefined;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;

function start(isSearch: boolean) {
  searching.value = isSearch;
  clearTimeout(showTimer);
  clearTimeout(safetyTimer);
  showTimer = setTimeout(() => (visible.value = true), SHOW_DELAY);
  safetyTimer = setTimeout(finish, MAX_VISIBLE);
}

function finish() {
  clearTimeout(showTimer);
  clearTimeout(safetyTimer);
  visible.value = false;
}

const nuxtApp = useNuxtApp();
const router = useRouter();

const removeBefore = router.beforeEach((to, from) => {
  if (to.path !== from.path) start(/\/search\//.test(to.path));
});
const removeError = router.onError(finish);
const offFinish = nuxtApp.hook("page:finish", finish);
const offError = nuxtApp.hook("vue:error", finish);
/* Ayni sayfaya geri donuste page:finish gelmeyebilir */
const removeAfter = router.afterEach((to, from, failure) => {
  if (failure || to.path === from.path) finish();
});

onBeforeUnmount(() => {
  finish();
  removeBefore();
  removeError();
  removeAfter();
  offFinish();
  offError();
});
</script>

<style scoped>
/* Perde neredeyse opak (0.95) ve bulanik. Oncesinde 0.55 idi ve altindaki
   sayfa okunuyordu: beklerken goz eski icerige takiliyor, ustelik
   isaretin arkasindaki rastgele fotograflar logonun uc rengini bozuyordu.
   Tamamen opak da degil — gecisin bir perde oldugu, sayfanin gitmedigi
   hissi kalsin. */
.pgl {
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(255 255 255 / 95%);
  backdrop-filter: blur(6px);
  pointer-events: none;
}

/* KUTU YOK. Oncesinde beyaz bir kart vardi (kenarlik + 14px radius +
   buyuk golge) — sitenin geri kalani cerceve ve golge kullanmiyor
   (bkz. Home/Categories.vue, Products/Card.vue notlari), perde de
   kullanmamali. Ogeler dogrudan beyazin uzerinde, ortalanmis bir
   kolon olarak duruyor. */
.pgl_stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

/* Yukseklikten olculuyor, genislikten degil: kaynak dikey (500x657) ve
   sabit genislik verilince isaret ekranda oldugundan buyuk duruyor.
   aspect-ratio kaynagin orani; maske `contain` ile yerlesecegi icin
   kutunun orani dosyayla birebir olmali, yoksa maske ile altindaki
   <img> birbirinden kayiyor. */
.pgl_mark {
  position: relative;
  display: block;
  overflow: hidden;
  height: clamp(4rem, 8vw, 5.5rem);
  aspect-ratio: 500 / 657;
  animation: pgl_breathe 2.6s var(--mk-ease, ease-in-out) infinite;
}

.pgl_mark_img {
  display: block;
  width: 100%;
  height: 100%;
}

/* VARSAYILAN: band YOK, logo oldugu gibi duruyor.
   Band yalnizca asagidaki @supports dalinda aciliyor; maske
   desteklenmeyen bir tarayicida acik kalsaydi isaretin yerinde renkli
   bir DIKDORTGEN gorunurdu. */
.pgl_band {
  display: none;
}

/* --- Logonun uzerinden akan renk ---
   Sarmalayiciya logonun kendi PNG'si maske olarak veriliyor; icerideki
   band yalnizca isaretin konturu icinde gorunuyor. Dosya RGBA ve zemini
   saydam oldugu icin ayri bir SVG yoluna gerek yok.

   Band konturu HER AN tamamen dolduruyor — oncesinde kisa, iki ucu
   saydam bir parcaydi ve dongunun bir bolumunde isaretin uzerinde hic
   renk kalmiyordu: logo o anlarda neredeyse kayboluyordu. Simdi
   kaybolma yok, yalnizca renkler kayiyor.

   Altindaki <img> soluk kaliyor (0.18): bandin koyu lacivert bolumu
   isaretin ince uclarinda kenar yumusatmayi zayiflatiyordu, soluk
   siluet o kenarlari tutuyor. */
@supports (mask-image: url("/image/logo_loading.png")) or
  (-webkit-mask-image: url("/image/logo_loading.png")) {
  .pgl_mark {
    mask: url("/image/logo_loading.png") no-repeat center / contain;
    -webkit-mask: url("/image/logo_loading.png") no-repeat center / contain;
  }

  .pgl_mark_img {
    opacity: 0.18;
  }

  .pgl_band {
    display: block;
    position: absolute;
    inset-inline: 0;
    top: -200%;
    height: 300%;
    /* Desen simetrik (lacivert -> mavi -> yesil -> mavi -> lacivert) ve
       %33.33'te bir tekrarliyor; bu yuzden kaydirinca eki belli olmuyor.
       Renkler logonun kendi ucu, disaridan vurgu rengi getirilmedi. */
    background: linear-gradient(
      180deg,
      #26357f 0%,
      #1e58c4 8.33%,
      #63b32e 16.66%,
      #1e58c4 25%,
      #26357f 33.33%,
      #1e58c4 41.66%,
      #63b32e 50%,
      #1e58c4 58.33%,
      #26357f 66.66%,
      #1e58c4 75%,
      #63b32e 83.33%,
      #1e58c4 91.66%,
      #26357f 100%
    );
    animation: pgl_flow 3.4s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
  }
}

/* 1px'lik hat + ustunde gidip gelen kisa parca. Hat gorunur duruyor
   (--mk-border) ki parca "nereden nereye" gittigi belli olsun; parcasiz
   bir hat bekleme suresini gostermez, sadece bir cizgi olur. */
.pgl_rule {
  position: relative;
  display: block;
  overflow: hidden;
  width: clamp(5rem, 14vw, 7.5rem);
  height: 1px;
  background: var(--mk-border, #d8d8d8);
}

/* Parcanin renkleri logonun kendi ucu: lacivert elmas, mavi yay, yesil
   yaprak. Markanin disindan bir vurgu rengi getirilmedi. */
.pgl_rule::after {
  content: "";
  position: absolute;
  inset-block: 0;
  left: 0;
  width: 40%;
  background: linear-gradient(90deg, #26357f, #1e58c4, #63b32e);
  animation: pgl_sweep 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.pgl_text {
  font-family: var(--mk-ff-display, inherit);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mk-body, #141414);
  opacity: 0.55;
}

/* Arapca kucuk puntoda harf araligi kelimeyi dagitiyor ve buyuk harf
   kavrami yok; o dilde ikisi de kapali. */
.pgl[dir="rtl"] .pgl_text {
  letter-spacing: normal;
  text-transform: none;
  font-size: 0.8125rem;
}

/* Cok hafif: 1.00 -> 1.03. Asil hareket artik akan band oldugu icin
   nefes daha da kisildi; ikisi birlikte fazla geliyordu. */
@keyframes pgl_breathe {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.03);
  }
}

/* Band isaretin UC KATI yuksekliginde ve gradyanin periyodu tam olarak
   bu yuksekligin ucte biri, yani isaretin kendi boyu. translateY 0 ->
   %66.67 (bandin kendi yuksekliginin ucte ikisi = isaretin iki boyu)
   iki tam periyot kaydiriyor; basla bitis ayni deseni gosterdigi icin
   dongude atlama olmuyor.

   `alternate`: renk once asagi, sonra yukari akiyor. */
@keyframes pgl_flow {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(66.667%);
  }
}

/* Basa donerken geri kaymiyor, sagdan cikip soldan giriyor: dongu
   gorunmez oluyor. */
@keyframes pgl_sweep {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(250%);
  }
}

.pl_fade-enter-active,
.pl_fade-leave-active {
  transition: opacity 0.25s var(--mk-ease, ease);
}

.pl_fade-enter-from,
.pl_fade-leave-to {
  opacity: 0;
}

/* Hareket kisitliyken isaret tamamen duruyor; bekleme bilgisi yine de
   gerekli oldugu icin hat kalıyor ama hizi yarilaniyor. */
/* Hareket kisitliyken akis duruyor. Band durdurulunca isaret soluk
   bir siluet olarak kalirdi, bu yuzden <img> tam opakliga donuyor ve
   band tamamen kaldiriliyor: logo oldugu gibi gorunuyor. */
@media (prefers-reduced-motion: reduce) {
  .pgl_mark {
    animation: none;
  }

  /* Maske dali opacity'yi 0.18'e indiriyor; burada geri aliniyor
     cunku band kaldirilinca isaretin kendisi gorunur olmali. */
  .pgl_mark_img {
    opacity: 1;
  }

  .pgl_band {
    display: none;
  }

  .pgl_rule::after {
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
  }
}
</style>
