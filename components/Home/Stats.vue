<script setup lang="ts">
/**
 * components/Home/Stats.vue
 *
 * Temadaki "Fun Facts" bolumunun karsiligi. Dort rakam, ince cizgilerle
 * ayrilmis TEK BIR SERIT halinde; her biri gorus alanina girince sayiyor.
 *
 * Onceden dort karttan olusuyordu (2. ve 4. kart koyu zeminli, sayilar
 * 60px) ve bolum ~400-500px yer kapliyordu. Istek uzerine kuculdu: hedef
 * masaustunde 100px'in altinda toplam yukseklik. Kartlar, koyu zeminler,
 * gorunur baslik ve buyuk bolum dolgusu bu yuzden gitti — olcu hesabi
 * stil blogunun basinda.
 *
 * Sayilar eski Shared/HowItWorks.vue'daki degerlerle ayni (konteyner,
 * palet, numune, m²) — o bolum ana sayfadan cikti, veriler buraya tasindi.
 * Etiketler her dilde burada.
 *
 * Sayac purecounter gibi bir eklenti yerine elle: tek requestAnimationFrame
 * dongusu, dis bagimlilik yok. prefers-reduced-motion acikken dogrudan
 * son degere atliyor.
 */

import { onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

/* Degerler tum dillerde ayni; yalnizca etiketler ceviriliyor. */
/* Sira: konteyner, palet, m², numune.

   `VALUES` ile asagidaki `labels` INDIS INDIS eslesiyor — birinde sira
   degisip digerinde degismezse rakam yanlis etiketle cikar. Numune
   (3000+) ile m² (2M+) yer degistirildiginde ikisi birlikte
   guncellendi. */
const VALUES = [
  { value: 4250, suffix: "+" },
  { value: 75000, suffix: "+" },
  { value: 2, suffix: "M+" },
  { value: 3000, suffix: "+" },
];

const texts: Record<Lang, { title: string; labels: string[] }> = {
  en: {
    title: "By the numbers",
    labels: [
      "Containers shipped",
      "Pallets delivered",
      "Square metres produced",
      "Samples sent",
    ],
  },
  fr: {
    title: "En chiffres",
    labels: [
      "Conteneurs expédiés",
      "Palettes livrées",
      "Mètres carrés produits",
      "Échantillons envoyés",
    ],
  },
  es: {
    title: "En cifras",
    labels: [
      "Contenedores enviados",
      "Palés entregados",
      "Metros cuadrados producidos",
      "Muestras enviadas",
    ],
  },
  ru: {
    title: "В цифрах",
    labels: [
      "Контейнеров отправлено",
      "Паллет доставлено",
      "Квадратных метров произведено",
      "Образцов отправлено",
    ],
  },
  ar: {
    title: "بالأرقام",
    labels: [
      "حاوية تم شحنها",
      "منصة تم تسليمها",
      "متر مربع تم إنتاجه",
      "عينة تم إرسالها",
    ],
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const root = ref<HTMLElement | null>(null);
const counters = ref<number[]>(VALUES.map(() => 0));
let observer: IntersectionObserver | undefined;
let frame: number | undefined;

function run() {
  const duration = 1400;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    /* easeOutCubic: hizli baslayip yavaslayarak son degere oturuyor. */
    const eased = 1 - Math.pow(1 - progress, 3);
    counters.value = VALUES.map((v) => Math.round(v.value * eased));
    if (progress < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
}

onMounted(() => {
  if (!root.value) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    counters.value = VALUES.map((v) => v.value);
    return;
  }

  /* threshold 0.3 yerine 0 + alttan %10 pay: bolume kaydirilarak degil
     SICRANARAK gelindiginde (kaydirma konumu geri yuklendi, bir cipaya
     atlandi, uzun sayfada hizli atlama) gozlemcinin tek olcumu bolumun
     %30'unu gormeyebiliyor ve sayaclar kalici olarak 0'da kaliyordu. */
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run();
        } else if (entry.boundingClientRect.bottom < 0) {
          /* Sayfa zaten bolumun altinda acildi: animasyon kacirildi,
             dogrudan son degere otur. */
          counters.value = VALUES.map((v) => v.value);
        } else {
          continue;
        }
        observer?.disconnect();
        observer = undefined;
        return;
      }
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (frame) cancelAnimationFrame(frame);
});

/* Binlik ayirici her dilde okunur olsun diye sabit en-US biciminde. */
const fmt = (i: number) => (counters.value[i] ?? 0).toLocaleString("en-US");
</script>

<template>
  <section
    ref="root"
    class="st"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="st-title"
  >
    <div class="st__inner">
      <!-- Baslik GORSEL OLARAK gizli, DOM'da duruyor.

           Istenen yukseklik butcesi 100px: gorunur bir baslik + alt
           boslugu tek basina bunun yarisini yiyordu. Metin yine de
           silinmedi — bolumun aria-labelledby bagi ona dayaniyor ve
           ekran okuyucuda bolumun adi olmadan dort sayi baglamsiz
           kalirdi. Zaten etiketler ("Containers shipped") basligin
           soylediginden fazlasini soyluyor. -->
      <h2 id="st-title" class="st__title">{{ t.title }}</h2>

      <dl class="st__grid">
        <div v-for="(v, i) of VALUES" :key="t.labels[i]" class="stat">
          <dt class="stat__value">
            <!-- Sayan deger; okuyucuya son hali bir kez verilsin diye
                 canli bolge degil. -->
            <span>{{ fmt(i) }}{{ v.suffix }}</span>
          </dt>
          <dd class="stat__label">{{ t.labels[i] }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
/* --- Olcu hedefi ---
   Bolum "insanlarin gozune sokar gibi" olmayacak: toplam yukseklik
   masaustunde 100px'in ALTINDA kalmali.

   Oncesi ~400-500px idi: dort kartin her biri min-height
   clamp(9rem, 18vw, 13rem) = 144-208px, ustune --mk-section-y (60-120px)
   dikey dolgu ve gorunur basligin 60px'e varan alt boslugu biniyordu.
   Ayrica 2. ve 4. kart koyu zeminliydi, yani bolum sayfanin en kontrastli
   seridiydi.

   Yeni butce (masaustu):
     dikey dolgu  22px x 2 = 44px
     sayi         22px / 1.15 ~ 25px
     ara                      4px
     etiket       13px / 1.3 ~ 17px
                            ------
                             90px
   Kartlar gitti; geriye ince cizgilerle ayrilmis tek bir serit kaldi. */
.st {
  font-family: var(--mk-ff-body);
  /* --mk-section-y (60-120px) DEGIL: o olcu kendi zeminini seren buyuk
     bolumler icin. Bu artik bir serit. */
  padding: clamp(1rem, 2vw, 1.375rem) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
  /* Kutlesi kalmadigi icin komsu bolumlerden cizgiyle ayriliyor;
     oncesinde bunu koyu kartlarin kontrasti yapiyordu. */
  border-block: 1px solid var(--mk-border);
}

.st__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

/* Gorsel olarak gizli ama ekran okuyucuda okunur. `display: none` ya da
   `visibility: hidden` OLMAZ — ikisi de elemani erisilebilirlik agacindan
   cikarir ve aria-labelledby bagi kopardi. */
.st__title {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.st__grid {
  display: grid;
  /* Dar ekranda dort uzun etiket tek siraya sigmiyor: "Square metres
     produced" 90px'lik bir sutunda uc satira kiriliyor ve punto okunur
     kalsin diye kucultulemiyor. Orada 2x2, serit biraz uzuyor (~130px).
     100px butcesi masaustu icin; dar ekranda okunurluk oncelikli. */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);
  margin: 0;
}

@media (min-width: 48rem) {
  .st__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
  }

  /* Kart zemini yerine ince dikey ayrac. Ilk ogede yok; RTL'de
     border-inline-start zaten saga doner. */
  .stat + .stat {
    border-inline-start: 1px solid var(--mk-border);
    padding-inline-start: clamp(1rem, 2.5vw, 2rem);
  }

  .stat {
    padding-inline-end: clamp(1rem, 2.5vw, 2rem);
  }
}

/* --- Tek oge --- */
/* Kart degil: zemin, cerceve, dolgu ve min-height yok. */
.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.stat__value {
  font-family: var(--mk-ff-display);
  /* 3.75rem (60px) -> 1.375rem (22px). Govde metninden hala belirgin
     olarak buyuk, ama sayfanin en iri ogesi degil. */
  font-size: clamp(1.125rem, 2.2vw, 1.375rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: normal;
  color: var(--mk-heading, #000);
  /* Sayarken genislik oynamasin. */
  font-variant-numeric: tabular-nums;
}

.stat__label {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.3;
  color: var(--mk-grey-2);
  /* opacity yerine dogrudan renk: opacity tabular-nums'li sayiyla birlikte
     kullanildiginda alt pikselde titreme uretebiliyordu ve ayrica
     --mk-grey-2 zaten bu is icin tanimli ikincil metin rengi. */
}
</style>
