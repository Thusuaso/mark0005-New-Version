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
  { heading: string; lede: string; cta: string; aria: string }
> = {
  en: {
    heading: "Natural stone from our own factories",
    lede: "Marble, travertine and limestone — quarried, cut and finished by us.",
    cta: "Get a quote",
    aria: "Scenes from our quarries, factories and warehouse",
  },
  fr: {
    heading: "Pierre naturelle de nos propres usines",
    lede: "Marbre, travertin et pierre calcaire — extraits, taillés et finis par nos soins.",
    cta: "Demander un devis",
    aria: "Scènes de nos carrières, usines et entrepôt",
  },
  es: {
    heading: "Piedra natural de nuestras propias fábricas",
    lede: "Mármol, travertino y piedra caliza: extraídos, cortados y pulidos por nosotros.",
    cta: "Solicitar presupuesto",
    aria: "Escenas de nuestras canteras, fábricas y almacén",
  },
  ru: {
    heading: "Натуральный камень с наших заводов",
    lede: "Мрамор, травертин и известняк — добываем, распиливаем и обрабатываем сами.",
    cta: "Запросить расчёт",
    aria: "Кадры с наших карьеров, заводов и склада",
  },
  ar: {
    heading: "حجر طبيعي من مصانعنا الخاصة",
    lede: "رخام وترافرتين وحجر جيري — نستخرجه ونقطعه ونصقله بأنفسنا.",
    cta: "اطلب عرض سعر",
    aria: "مشاهد من محاجرنا ومصانعنا ومستودعنا",
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

/* Baslik silindikten sonra gorunurlukten de cikariliyor (bkz. .hr--said).
   Hareket kapaliyken p dogrudan 1 oluyor, o yuzden still disarida tutuldu:
   yoksa reduced-motion kullanicisi basligi hic gormezdi. */
const said = computed(() => !still.value && p.value > 0.62);

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
    :class="{ 'hr--still': still, 'hr--said': said }"
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
        <!-- Baslik ekranda GORUNUR olmak zorunda: ilk ekran ziyaretcinin ilk
             sorusunu buyuk puntoyla cevaplamali. Onceden .hr__sr-only ile
             gizleniyordu (fotograflarin uzerini kapatmasin diye) ama o
             haliyle sayfanin ilk uc ekraninda sirketin ne yaptigi hicbir
             yerde yazmiyordu.

             Fotograflari kapatma itirazi --p ile cozuluyor: metin tek
             fotografin ekrani kapladigi anda (p=0) tam opak, kolaj
             toplandikca siliniyor. Yani once soz, sonra resim. -->
        <div class="hr__say">
          <h1 class="hr__title">{{ t.heading }}</h1>
          <p class="hr__lede">{{ t.lede }}</p>
        </div>

        <div class="hr__row">
          <UiBtn :label="t.cta" :to="contactLink" variant="blur" />
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

/* Basligin okunmasi gereken an p=0: tek fotograf ekrani kapliyor ve
   altta hr__scrim zaten %78'e kadar koyu. Kolaj toplandikca (p -> 1)
   metin siliniyor, fotograflar sahneyi devraliyor.

   1.9 carpani: p=0.53 civarinda tamamen kayboluyor, yani kolaj daha
   yerine oturmadan yoldan cekilmis oluyor. */
.hr__say {
  opacity: clamp(0, calc(1 - var(--p) * 1.9), 1);
  transition: opacity 0.12s linear;
}

/* Metin silindikten sonra DOM'dan da cekilmeli: opacity:0 bir baslik hala
   "fotograflarin uzerinde suruklenen sabit metin" olarak olculuyor (ve
   ekran okuyucuya hala okunuyordu). Esik p=0.62, yani opacity zaten
   0'a indikten sonra. */
.hr--said .hr__say {
  display: none;
}

/* Hareket kapaliyken pist yok ve p dogrudan 1 — yukaridaki formul metni
   gizlerdi. Reduced motion kullanicisi basligi tam gormeli. */
.hr--still .hr__say {
  opacity: 1;
}

.hr__title {
  margin: 0;
  font-family: var(--mk-ff-display);
  /* Bolum basliklarindan (--mk-title-xl) kasitli olarak kucuk: bu metin
     fotografin uzerinde duruyor, orada ayni punto resmi yutuyor. */
  font-size: clamp(2rem, 5.2vw, 4.25rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--mk-cream);
  text-wrap: balance;
  /* ch, bu elemanin KENDI puntosuna gore cozuluyor; olcu .hr__say uzerinde
     verilirse govde puntosuna gore cozulur ve baslik dorde kirilir. */
  max-width: 20ch;
}

.hr__lede {
  margin: clamp(1rem, 2.2vh, 2rem) 0 0;
  /* 46ch bu cumle icin dardi: son satira tek kelime ("by us.") dusuyordu.
     56ch'te kirilma iki dengeli satira bolunuyor ve satir basina karakter
     hala okunur aralikta (45-75). */
  max-width: 56ch;
  text-wrap: pretty;
  font-size: clamp(1rem, 1.35vw, 1.1875rem);
  line-height: 1.6;
  color: rgba(247, 243, 233, 0.86);
}

/* Dar ekranda saga sabitlenmis paylas/WhatsApp butonlari (58px + 20px
   kenar bosluklu, position: fixed) metnin uzerine biniyordu. */
/* Dar ekranda saga sabitlenmis paylas/WhatsApp butonlari yalnizca alt
   serite denk geliyor; yer ayirmasi gereken destek cumlesi, baslik degil.
   Baslik da daraltilirsa uc satira kiriliyordu. */
@media (max-width: 36rem) {
  .hr__lede {
    padding-inline-end: 4.5rem;
  }
}

.hr__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: clamp(1rem, 2.5vh, 1.5rem);
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
}
</style>
