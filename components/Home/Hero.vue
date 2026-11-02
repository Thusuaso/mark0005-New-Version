<script setup lang="ts">
/**
 * components/Home/Hero.vue
 *
 * Kaydirma ile acilan fotograf kolaji.
 *
 * Davranis: sayfa en ustte tek bir fotograf ekrani kapliyor. Asagi
 * inildikce o fotograf kuculup kolajdaki yerine oturuyor, ayni anda
 * etrafindaki dort fotograf disaridan icine dogru kayip beliriyor —
 * bes fotograf birlesmis gibi duruyor.
 *
 * --- Nasil calisiyor ---
 * Bolum ekrandan uzun (kaydirma pisti). Icindeki sahne `position: sticky`
 * ile ekranda sabit duruyor; kaydirma ilerledikce JS tek bir sayi
 * hesapliyor: `--p` (0 → 1). Butun hareket CSS tarafinda bu degiskenden
 * `calc()` ile tureiyor, yani her karede DOM'a tek bir ozellik yaziliyor.
 *
 * Merkez fotograf p=0'da `--c-zoom` kadar buyutulmus (ekrani kapliyor),
 * p=1'de olcek 1 (kolajdaki gercek boyutu). Uydular p=0'da `--dx/--dy`
 * kadar disarida ve saydam, p=1'de yerinde.
 *
 * `--c-zoom` elle hesap degil: merkezin kolajdaki olculeri stage'in yuzde
 * kaci ise (--c-w / --c-h), iki eksenin de kaplanmasi icin gereken olcek
 * max(100/--c-w, 100/--c-h). Yuzdeleri degistirirsen zoom kendiliginden
 * uyar.
 *
 * Kolaj alani ustten `--hr-safe` kadar iceri aliniyor: sabit ust menunun
 * yuksekligi. Yoksa kolaj acildiginda ust iki fotograf menunun altinda
 * kaliyor.
 *
 * --- Gorsel kaynagi ---
 * ONEMLI: store'daki `slides` verisi KULLANILMIYOR. slide1/slide2
 * fotograflari 300x230 px (eski kucuk carousel'in thumbnail'lari) ve tam
 * ekranda agir sekilde pikselleniyorlar. Bunun yerine `fabrication.items`
 * fotograflari: 1545x1240 px, ocak / fabrika / depo sahneleri.
 *
 * --- Erisilebilirlik ---
 * prefers-reduced-motion acikken pist kaldiriliyor (bolum tek ekran
 * yuksekligine iniyor) ve kolaj dogrudan son halinde gosteriliyor; kullanici
 * bos bir alanda kaydirmak zorunda kalmiyor.
 */

import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "~/store/index";
import { useHeroOverlay } from "~/composables/useHeroOverlay";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

type Shot = { id: string; image: string; title: string };

/* Kolajdaki yerler. Merkez ilk sirada. */
const SLOTS = ["c", "tl", "tr", "bl", "br"] as const;

const texts: Record<
  Lang,
  { eyebrow: string; heading: string; cta: string; aria: string; hint: string }
> = {
  en: {
    eyebrow: "Marble · Travertine · Limestone",
    heading: "Natural stone from our own quarries",
    cta: "Get a quote",
    aria: "Scenes from our quarries, factories and warehouse",
    hint: "Scroll",
  },
  fr: {
    eyebrow: "Marbre · Travertin · Pierre calcaire",
    heading: "Pierre naturelle de nos propres carrières",
    cta: "Demander un devis",
    aria: "Scènes de nos carrières, usines et entrepôt",
    hint: "Défiler",
  },
  es: {
    eyebrow: "Mármol · Travertino · Piedra caliza",
    heading: "Piedra natural de nuestras propias canteras",
    cta: "Solicitar presupuesto",
    aria: "Escenas de nuestras canteras, fábricas y almacén",
    hint: "Desplazar",
  },
  ru: {
    eyebrow: "Мрамор · Травертин · Известняк",
    heading: "Натуральный камень с наших карьеров",
    cta: "Запросить расчёт",
    aria: "Кадры с наших карьеров, заводов и склада",
    hint: "Прокрутите",
  },
  ar: {
    eyebrow: "رخام · ترافرتين · حجر جيري",
    heading: "حجر طبيعي من محاجرنا الخاصة",
    cta: "اطلب عرض سعر",
    aria: "مشاهد من محاجرنا ومصانعنا ومستودعنا",
    hint: "مرّر",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const links = store.getNavbarLinks as Record<string, string>;
const contactLink = computed(() => links.contact ?? "/contact");

/* fabrication.items -> tek foto listesi, sonra kolaj icin 5 tane.
   Gruplar sirayla dolasilarak seciliyor (ocak/fabrika/depo karissin),
   yoksa hepsi ayni grubun fotografi olurdu. */
const shots = computed<Shot[]>(() => {
  const fab = store.getFabrication as
    | {
        items?: { id: any; images?: { id: any; image: string; title: string }[] }[];
      }
    | undefined;

  const groups = (fab?.items ?? []).map((g) =>
    (g.images ?? []).map((photo) => ({
      id: `${g.id}-${photo.id}`,
      image: photo.image,
      title: photo.title,
    })),
  );

  const picked: Shot[] = [];
  /* Gruplar arasinda sirayla gez: g0[0], g1[0], g2[0], g0[1], g1[1], ... */
  const depth = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < depth && picked.length < SLOTS.length; i++) {
    for (const g of groups) {
      if (g[i] && picked.length < SLOTS.length) picked.push(g[i]);
    }
  }
  return picked;
});

/* --- Kaydirma ilerlemesi --- */
const root = ref<HTMLElement | null>(null);
const p = ref(0);
/* Pist yalnizca hareket acikken var; kapaliysa bolum tek ekran yuksekliginde
   ve kolaj dogrudan son halinde. */
const still = ref(false);

const heroOverlay = useHeroOverlay();

let raf: number | undefined;
let detach: (() => void) | undefined;

/* Sabit ust menunun yuksekligi (--mk-header-h = 5.375rem = 86px).
   Menunun seffaf kalip kalmayacagi buna gore belirleniyor. */
const HEADER_PX = 86;

function measure() {
  raf = undefined;
  const el = root.value;
  if (!el) return;

  const rect = el.getBoundingClientRect();

  if (!still.value) {
    const runway = el.offsetHeight - window.innerHeight;
    const raw = runway > 0 ? -rect.top / runway : 1;
    p.value = Math.min(1, Math.max(0, raw));
  }

  /* Menu, bolumun alt kenari menunun altina gecene kadar seffaf. */
  heroOverlay.value = rect.bottom > HEADER_PX;
}

function onScroll() {
  /* Kare basina tek olcum: scroll olayi kareden sik tetiklenebiliyor. */
  if (raf === undefined) raf = requestAnimationFrame(measure);
}

onMounted(() => {
  still.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still.value) p.value = 1;

  /* Fotograf yoksa (veri gelmediyse) menu beyaz zeminde seffaf kalip
     okunmaz hale gelmesin. */
  if (!shots.value.length) {
    heroOverlay.value = false;
    return;
  }

  measure();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  detach = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
});

onBeforeUnmount(() => {
  detach?.();
  if (raf !== undefined) cancelAnimationFrame(raf);
  /* Baska sayfaya gecerken menu beyaz zemine donsun. */
  heroOverlay.value = false;
});
</script>

<template>
  <section
    ref="root"
    class="hr"
    :class="{ 'hr--still': still }"
    :style="{ '--p': p }"
    :dir="isRtl ? 'rtl' : undefined"
    :aria-label="t.aria"
  >
    <div class="hr__stage">
      <!-- Kolaj -->
      <div class="hr__collage" aria-hidden="true">
        <figure
          v-for="(shot, i) of shots"
          :key="shot.id"
          class="hr__item"
          :class="`hr__item--${SLOTS[i]}`"
        >
          <img
            class="hr__img"
            :src="shot.image"
            alt=""
            :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : undefined"
            decoding="async"
            width="1545"
            height="1240"
          />
        </figure>
      </div>

      <!-- Metni okunur kilan karartma; kolaj aciliksa zemin zaten siyah,
           o yuzden p ilerledikce kayboluyor. -->
      <div class="hr__scrim" aria-hidden="true"></div>

      <!-- Metin katmani -->
      <div class="hr__ui">
        <!-- Baslik gorsel olarak kaldirildi (fotograflarin uzerini
             kapatiyordu) ama DOM'da duruyor: her sayfanin bir h1'i olmasi
             gerekiyor, arama motorlari ve ekran okuyucular bunu kullaniyor.
             .hr__sr-only ile yalnizca gozden saklaniyor. -->
        <h1 class="hr__sr-only">{{ t.heading }}</h1>

        <p class="hr__eyebrow">{{ t.eyebrow }}</p>

        <div class="hr__row">
          <UiBtn :label="t.cta" :to="contactLink" variant="blur" />

          <!-- Kaydirma ipucu: kolaj acildikca kayboluyor -->
          <p v-if="!still" class="hr__hint">
            <span>{{ t.hint }}</span>
            <span class="hr__hint-line" aria-hidden="true"></span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hr {
  /* --- Kolaj yerlesimi (stage'in yuzdesi) --- */
  /* Merkez. --c-w ve --c-h birimsiz sayi (yuzde olarak kullaniliyor):
     zoom hesabinda bolme yapilabilmesi icin birim tasimamalari gerek. */
  --c-x: 30%;
  --c-y: 10%;
  --c-w: 40;
  --c-h: 56;
  /* Uydular */
  --s-w: 24%;
  --s-h: 27%;

  /* Ustte sabit menu icin ayrilan serit. Kolaj bu kadar asagidan
     basliyor, boylece acildiginda fotograflar menunun altina girmiyor.
     Menu yuksekligi + bir tutam bosluk. */
  --hr-safe: calc(var(--mk-header-h, 5.375rem) + clamp(0.75rem, 2.5vh, 2rem));

  /* Merkezin p=0'da ekrani kaplamasi icin gereken olcek.
     Iki eksenin de kaplanmasi gerekiyor: genislikte 100/--c-w, yukseklikte
     100/--c-h. Onceden yalnizca genislige bakiliyordu; mobilde yuksekligin
     baskin oldugu oranlarda (--c-w 72 / --c-h 44) acilis karesi ekrani
     kaplamiyor, altta ve ustte koyu serit kaliyordu.

     1.25 pay: eleman sahnenin tam ortasinda degil (ust menu icin ayrilan
     serit ve --c-y kaydirmasi yuzunden), bu yuzden teorik orana biraz
     eklenmesi gerekiyor. Takasi acilis karesinin daha yakin plan
     gorunmesi. */
  --c-zoom: calc(
    max(100 / var(--c-w), 100 / var(--c-h)) * 1.25
  );

  /* Mevcut olcek: p=0'da --c-zoom, p=1'de 1 */
  --c-scale: calc(var(--c-zoom) - (var(--c-zoom) - 1) * var(--p));

  /* Uydularin giris ilerlemesi: ilk %18'de hareketsiz bekliyorlar ki
     merkez kucultmeye baslamadan ortaya cikmasinlar. */
  --s-p: clamp(0, calc((var(--p) - 0.18) / 0.62), 1);

  position: relative;
  /* Kaydirma pisti: 1 ekran sabit sahne + 1.4 ekran hareket payi. */
  height: 240vh;
  background: var(--mk-ink);
  color: var(--mk-cream);
}

/* Hareket kapaliysa pist yok: tek ekran, kolaj son halinde. */
.hr--still {
  height: auto;
  min-height: 100svh;
}

.hr__stage {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
  isolation: isolate;
}

.hr--still .hr__stage {
  position: static;
  height: auto;
  min-height: 100svh;
}

/* --- Kolaj --- */
/* Kolaj alani ustten sabit menu kadar iceri aliniyor.
   Onceden `inset: 0` idi: kolaj tum sahneyi kapliyor, bu yuzden ust iki
   fotograf (tl/tr) acildiginda menunun altinda kaliyordu.

   Merkez fotograf p=0'da yine tum ekrani kapliyor — olcegi (--c-zoom)
   kutunun yuzdesinden turedigi icin kutu kisalsa da tasma yukari dogru
   devam ediyor; yani hero'nun ilk hali degismiyor, yalnizca kolaj
   acildiginda fotograflar menunun altina girmiyor. */
.hr__collage {
  position: absolute;
  inset: var(--hr-safe) 0 0;
  z-index: 0;
}

.hr__item {
  position: absolute;
  margin: 0;
  overflow: hidden;
  /* Fotograf yuklenene kadar gorunen yer tutucu zemin. */
  background: var(--mk-ink);
}

.hr__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Merkez: p=0'da ekrani kapliyor, p=1'de kolajdaki yerinde. */
.hr__item--c {
  inset-inline-start: var(--c-x);
  top: var(--c-y);
  width: calc(var(--c-w) * 1%);
  height: calc(var(--c-h) * 1%);
  transform: scale(var(--c-scale));
  transform-origin: center;
  z-index: 2;
}

/* Uydular: --dx/--dy kadar disaridan geliyor ve saydamdan cikiyor. */
.hr__item--tl,
.hr__item--tr,
.hr__item--bl,
.hr__item--br {
  width: var(--s-w);
  height: var(--s-h);
  opacity: var(--s-p);
  transform: translate(
      calc(var(--dx) * (1 - var(--s-p))),
      calc(var(--dy) * (1 - var(--s-p)))
    )
    scale(calc(0.82 + 0.18 * var(--s-p)));
  z-index: 1;
}

.hr__item--tl {
  inset-inline-start: 3%;
  top: 5%;
  --dx: -26vw;
  --dy: -14vh;
}

.hr__item--tr {
  inset-inline-start: 73%;
  top: 5%;
  --dx: 26vw;
  --dy: -14vh;
}

.hr__item--bl {
  inset-inline-start: 3%;
  top: 40%;
  --dx: -26vw;
  --dy: 14vh;
}

.hr__item--br {
  inset-inline-start: 73%;
  top: 40%;
  --dx: 26vw;
  --dy: 14vh;
}

/* RTL'de yatay kayma yonu aynalaniyor (inset-inline-start zaten donuyor). */
[dir="rtl"] .hr__item--tl,
[dir="rtl"] .hr__item--bl {
  --dx: 26vw;
}

[dir="rtl"] .hr__item--tr,
[dir="rtl"] .hr__item--br {
  --dx: -26vw;
}

/* --- Karartma --- */
.hr__scrim {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background:
    linear-gradient(to top, rgba(28, 25, 23, 0.78) 0%, rgba(28, 25, 23, 0.1) 52%),
    rgba(28, 25, 23, 0.18);
  /* Kolaj acildikca zemin siyaha donuyor, karartmaya gerek kalmiyor. */
  opacity: calc(1 - var(--p) * 0.75);
}

/* --- Metin --- */
.hr__ui {
  position: absolute;
  z-index: 4;
  inset-inline: 0;
  bottom: 0;
  width: min(var(--mk-container-wide), 100%);
  margin-inline: auto;
  padding: 0 clamp(1.25rem, 3.5vw, 3.5rem) clamp(1.75rem, 5vh, 3rem);
}

.hr--still .hr__ui {
  position: static;
  padding-top: clamp(2rem, 6vh, 4rem);
}

/* Gorunmez ama okunabilir: ekran okuyucu ve arama motorlari icin.
   display:none ya da visibility:hidden olmaz — ikisi de icerigi erisim
   agacindan tamamen cikarir. */
.hr__sr-only {
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

.hr__eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(247, 243, 233, 0.72);
}

/* Dar ekranda saga sabitlenmis paylas/WhatsApp butonlari (58px + 20px
   kenar bosluklu, position: fixed) satirin sonundaki kelimenin uzerine
   biniyordu — "LIMESTONE" yarim gorunuyordu. Metin o sutuna girmesin
   diye yer ayriliyor; sigmazsa alt satira geciyor. */
@media (max-width: 36rem) {
  .hr__eyebrow {
    padding-inline-end: 5.5rem;
  }
}

.hr__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: clamp(1rem, 2.5vh, 1.5rem);
}

/* --- Kaydirma ipucu --- */
.hr__hint {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(247, 243, 233, 0.6);
  /* Kolaj acilmaya baslayinca ipucu gereksizlesiyor. */
  opacity: calc(1 - var(--p) * 2.2);
  pointer-events: none;
}

.hr__hint-line {
  width: 2.5rem;
  height: 1px;
  background: currentColor;
  transform-origin: inline-start;
  animation: hint-slide 1.8s ease-in-out infinite;
}

@keyframes hint-slide {
  0%,
  100% {
    transform: scaleX(0.4);
    opacity: 0.5;
  }
  50% {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* --- Kucuk ekran --- */
/* Dar ekranda bes fotograf yan yana sigmiyor: merkez buyutuluyor,
   uydular kucultulup kenarlara cekiliyor. Pist de kisaltiliyor. */
@media (max-width: 47.99rem) {
  .hr {
    height: 200vh;
    --c-x: 14%;
    --c-y: 14%;
    --c-w: 72;
    --c-h: 44;
    --s-w: 34%;
    --s-h: 18%;
  }

  .hr__item--tl,
  .hr__item--tr {
    top: 2%;
  }

  .hr__item--bl,
  .hr__item--br {
    top: 60%;
  }

  .hr__item--tl,
  .hr__item--bl {
    inset-inline-start: 4%;
  }

  .hr__item--tr,
  .hr__item--br {
    inset-inline-start: 62%;
  }

  .hr__hint {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hr__hint-line {
    animation: none;
  }
}
</style>
