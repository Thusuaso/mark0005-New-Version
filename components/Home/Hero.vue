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
 * Merkez fotografin KUTUSU ilerliyor: p=0'da sahnenin tamami, p=1'de
 * kolajdaki yeri (--c-x / --c-y / --c-w / --c-h). Fotograf buyutulmuyor —
 * olcek (transform) yok, boylece hicbir karede upscale edilmiyor.
 * Uydular p=0'da `--dx/--dy` kadar disarida ve saydam, p=1'de yerinde.
 *
 * Kolaj alani ustten `--hr-safe` kadar iceri aliniyor: sabit ust menunun
 * yuksekligi. Yoksa kolaj acildiginda ust iki fotograf menunun altinda
 * kaliyor.
 *
 * Sag altta `hr__hint`: rayda akan isik + "Scroll" metni. Ilk ekran tek
 * fotograftan ibaret oldugu icin kaydirilacak bir sey oldugu belli
 * olmuyordu; kaydirma baslayinca isaret siliniyor.
 *
 * --- Gorsel kaynagi ---
 * Birincil kaynak asagidaki `SLIDER` listesi: public/image/slider altindaki
 * dosyalar. Listenin ilki merkez (ekrani kaplayan) kare, kalanlar uydu
 * yerlerine gidiyor. Bu liste bes fotografa dolmadigi surece geri kalan
 * yerler `fabrication.items` fotograflariyla tamamlaniyor (1545x1240 px,
 * ocak / fabrika / depo sahneleri).
 *
 * ONEMLI: store'daki `slides` verisi KULLANILMIYOR. slide1/slide2
 * fotograflari 300x230 px (eski kucuk carousel'in thumbnail'lari) ve tam
 * ekranda agir sekilde pikselleniyorlar.
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

/* Kolajdaki yerler. Merkez ilk sirada. */
const SLOTS = ["c", "tl", "tr", "bl", "br"] as const;

type Slot = (typeof SLOTS)[number];

type Shot = { id: string; slot: Slot; image: string; title: string };

/* Ilk ekrani kaplayan fotograflar: public/image/slider altindaki dosyalar.
   Dizi DEGIL, yere gore esleme — cunku istek "merkez + sag ust" gibi tek
   tek yerler uzerinden geliyor; sirali bir listede araya bosluk
   birakilamiyordu.

   Yerler:
     c   merkez — sayfa en ustte acildiginda ekrani kaplayan kare
     tl  sol ust      tr  sag ust
     bl  sol alt      br  sag alt

   Bos birakilan yerler asagidaki fabrication fotograflariyla
   tamamlaniyor, yani kolaj her zaman bes kareli duruyor. Yeni fotograf
   eklenince buraya tek satir giriliyor. */
const SLIDER: Partial<Record<Slot, string>> = {
  c: "/image/slider/johnson_project_pool_slider_photo.webp",
  tl: "/image/slider/cream_marble_limestone_slider_photo.webp",
  tr: "/image/slider/classic_vein_cut_first_slider_photo.webp",
  bl: "/image/slider/turkish_lilac_sink_slider_photo.webp",
  br: "/image/slider/modern_travertine_mosaic_slider.webp",
};

/* Marka slogani ilk ekranin h1'i.

   Daha once Home/Categories.vue'nun bolum basligiydi (oraya 4a2f54e'de,
   "Stone that / builds places" yerine konmustu). Ayni sayfada iki kez
   gorunmemesi icin oradan alindi; Categories artik kendi bolumunu
   tanimlayan bir baslik tasiyor. Buradaki ceviriler o bolumden AYNEN
   tasindi — yeniden yazilmadi, cunku bes dildeki karsiliklari zaten
   onaylanmis ve yayindaydi.

   Slogan h1'i devraldigi icin eski baslikta duran bilgi (kendi
   fabrikalarimiz + hangi taslar) alt cumleye tasindi: slogan ne
   oldugumuzu soyluyor, alt cumle ne yaptigimizi. Ikisinden biri eksik
   olsa ilk ekran ya bos bir slogandan ya da sloganini soylemeyen bir
   tanitimdan ibaret kalirdi.

   NOT: Nedim bey'in sloganla birlikte gelecek kisa metni buraya,
   `lede`'nin altina ikinci bir cumle olarak girecek (bkz. sablondaki
   hr__say). Metin elimize gecene kadar yer tutucu KONMUYOR — yayinda
   olan bir sayfada "lorem ipsum" gorunmesin. */
const texts: Record<
  Lang,
  { slogan: string; lede: string; cta: string; aria: string; scroll: string }
> = {
  en: {
    slogan: "Sustained by Nature, Crafted for Life",
    lede: "Natural stone from our own factories — marble, travertine and limestone, quarried, cut and finished by us.",
    cta: "Get a quote",
    aria: "Scenes from our quarries, factories and warehouse",
    scroll: "Scroll",
  },
  fr: {
    slogan: "Soutenus par la nature, façonnés pour la vie",
    lede: "Pierre naturelle de nos propres usines — marbre, travertin et pierre calcaire, extraits, taillés et finis par nos soins.",
    cta: "Demander un devis",
    aria: "Scènes de nos carrières, usines et entrepôt",
    scroll: "Défiler",
  },
  es: {
    slogan: "Sostenidos por la naturaleza, creados para la vida",
    lede: "Piedra natural de nuestras propias fábricas: mármol, travertino y piedra caliza, extraídos, cortados y pulidos por nosotros.",
    cta: "Solicitar presupuesto",
    aria: "Escenas de nuestras canteras, fábricas y almacén",
    scroll: "Desliza",
  },
  ru: {
    slogan: "Рождено природой, создано для жизни",
    lede: "Натуральный камень с наших заводов — мрамор, травертин и известняк: добываем, распиливаем и обрабатываем сами.",
    cta: "Запросить расчёт",
    aria: "Кадры с наших карьеров, заводов и склада",
    scroll: "Прокрутите",
  },
  ar: {
    slogan: "مستمد من الطبيعة، مصنوع للحياة",
    lede: "حجر طبيعي من مصانعنا الخاصة — رخام وترافرتين وحجر جيري، نستخرجه ونقطعه ونصقله بأنفسنا.",
    cta: "اطلب عرض سعر",
    aria: "مشاهد من محاجرنا ومصانعنا ومستودعنا",
    scroll: "مرّر",
  },
};

const store = useStore();
const lang = (
  String(store.getLang) in texts ? String(store.getLang) : "en"
) as Lang;
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
        items?: {
          id: any;
          images?: { id: any; image: string; title: string }[];
        }[];
      }
    | undefined;

  const groups = (fab?.items ?? []).map((g) =>
    (g.images ?? []).map((photo) => ({
      id: `${g.id}-${photo.id}`,
      image: photo.image,
      title: photo.title,
    })),
  );

  /* Gruplar arasinda sirayla gez: g0[0], g1[0], g2[0], g0[1], g1[1], ...
     Boylece bos yerler tek bir grubun fotograflariyla dolmuyor. */
  const spare: { id: string; image: string; title: string }[] = [];
  const depth = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < depth && spare.length < SLOTS.length; i++) {
    for (const g of groups) {
      if (g[i] && spare.length < SLOTS.length) spare.push(g[i]);
    }
  }

  /* Her yer once SLIDER'dan, orada tanimli degilse fabrication'dan.
     Hicbiri yoksa o yer kolajdan dusuyor (dizi kisaliyor). */
  const picked: Shot[] = [];
  for (const slot of SLOTS) {
    const src = SLIDER[slot];
    if (src) {
      picked.push({ id: `slider-${slot}`, slot, image: src, title: "" });
      continue;
    }
    const next = spare.shift();
    if (next) picked.push({ ...next, slot });
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
          v-for="shot of shots"
          :key="shot.id"
          class="hr__item"
          :class="`hr__item--${shot.slot}`"
        >
          <!-- <img> DEGIL <NuxtImg>: merkez kare sayfanin LCP'si ve
               kaynak dosya 511 KB; telefonda da ayni dosya iniyordu.
               Besi birden ~1.5 MB ediyordu.

               sizes iki duruma gore: merkez p=0'da ekrani kapliyor
               (100vw), uydular sahnenin dortte biri kadar (bkz.
               --s-w: 24%). Merkez icin 100vw her iki ucu da dogru
               karsiliyor, cunku kolaj toplandiginda da en buyuk kare o.

               HER DEGER EKRAN ON EKLI yaziliyor (xs:/sm:/...). On eksiz
               `sizes="100vw"` denendi ve @nuxt/image bunu 1w/2w olarak
               ayristirdi: srcset tek basina 1 ve 2 PIKSELLIK iki aday
               iceriyordu, yani sayfanin LCP gorseli 2x2 iniyordu.
               Ekran on ekli yazimda dogru cozuluyor. -->
          <NuxtImg
            class="hr__img"
            :src="shot.image"
            alt=""
            :sizes="
              shot.slot === 'c'
                ? 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw'
                : 'xs:40vw sm:40vw md:25vw lg:25vw xl:25vw xxl:25vw'
            "
            :loading="shot.slot === 'c' ? 'eager' : 'lazy'"
            :fetchpriority="shot.slot === 'c' ? 'high' : undefined"
            :preload="shot.slot === 'c'"
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
          <!-- Slogan sayfanin h1'i: ilk ekranda en buyuk puntoda duran
               metin markanin kendi cumlesi olmali. -->
          <h1 class="hr__title">{{ t.slogan }}</h1>
          <p class="hr__lede">{{ t.lede }}</p>
        </div>

        <div class="hr__row">
          <UiBtn :label="t.cta" :to="contactLink" variant="blur" />
        </div>

        <!-- Kaydirma ipucu. Ilk ekran tek bir fotograftan ibaret oldugu
             icin burada kaydirilacak bir sey oldugu belli olmuyordu:
             ziyaretci bir resme bakip sayfanin bittigini sanabiliyor.
             Ray boyunca asagi akan isik bunu soyluyor; kaydirma baslayinca
             (p birkac yuzde ilerler ilerlemez) kendini siliyor.

             Metin yatay — Rusca/Arapca dikey yazim kotu kiriliyor, bu
             yuzden writing-mode denenmedi. -->
        <div class="hr__hint" aria-hidden="true">
          <span class="hr__hint-text">{{ t.scroll }}</span>
          <span class="hr__hint-rail"></span>
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

  /* Karelerin kose yaricapi. Kolaj acildikca --p ile buyuyor (bkz.
     .hr__item): p=0'da sifir, p=1'de tam. */
  --hr-radius: clamp(8px, 1vw, 16px);

  /* Ustte sabit menu icin ayrilan serit. Kolaj bu kadar asagidan
     basliyor, boylece acildiginda fotograflar menunun altina girmiyor.
     Menu yuksekligi + bir tutam bosluk. */
  --hr-safe: calc(var(--mk-header-h, 5.375rem) + clamp(0.75rem, 2.5vh, 2rem));

  /* --- Merkezin acilisi ---
     ONCESI: kutu kolajdaki olcusunde duruyor (40% x 56%) ve p=0'da
     `transform: scale()` ile ekrani kaplayacak kadar buyutuluyordu —
     max(100/40, 100/56) * 1.25 = 3.1 kat. Transform fotografi de
     buyutuyor, yani ilk ekranda her fotograf 3.1 kat upscale ediliyordu:
     1400px genislikteki bir kare 1920px ekranda ~4400px'e cikiyor ve
     bulanik gorunuyor. Ustelik cover kirpmasi o olcekte fotografin
     ortasindan kucuk bir parca gosteriyor, yani kare "bozuk" duruyor.
     Eklenen her fotografta ayni sonucu veriyordu, cunku sebep fotograf
     degil olcekti.

     SIMDI: olcek yok. Kutunun KENDI olculeri ve konumu --p ile
     ilerliyor; p=0'da kutu sahnenin tamami (100% + ust menu serdi),
     p=1'de kolajdaki yeri. Fotograf her karede gercek layout boyutunda
     cizildigi icin hicbir yerde upscale edilmiyor ve p=0'da fotografin
     tamami cover ile normal sekilde gorunuyor.

     Takas: transform yerine genislik/yukseklik degistigi icin her karede
     yerlesim hesabi yapiliyor. Tek bir absolute eleman oldugu ve zaten
     requestAnimationFrame ile surdugu icin pratikte fark edilmiyor. */
  --c-left: calc(var(--c-x) * var(--p));
  --c-top: calc(var(--c-y) * var(--p) - var(--hr-safe) * (1 - var(--p)));
  --c-wid: calc(100% * (1 - var(--p)) + var(--c-w) * 1% * var(--p));
  --c-hei: calc(
    (100% + var(--hr-safe)) * (1 - var(--p)) + var(--c-h) * 1% * var(--p)
  );

  /* Uydularin giris ilerlemesi: ilk %18'de hareketsiz bekliyorlar ki
     merkez kucultmeye baslamadan ortaya cikmasinlar. */
  --s-p: clamp(0, calc((var(--p) - 0.18) / 0.62), 1);

  /* Ilk ekranin yuksekligi.
     DENENDI ve GERI ALINDI: 86svh. Sahne `position: sticky` ile ekranin
     tepesine yapisiyor; ekrandan KISA olursa altinda bolumun kendi koyu
     zemini serit halinde goruniyor (754px ekranda 105px'lik bos bant).
     Yani sahne ekrandan kisa olamaz — 100svh disindaki her deger ayni
     bosluğu birakir. Fotograflarin bozuk gorunmesinin sebebi zaten
     yukseklik degil, kaldirilan 3.1 kat upscale'di. */
  --hr-stage-h: 100svh;

  position: relative;
  /* Kaydirma pisti: sabit sahne + 1.3 ekran hareket payi. */
  height: calc(var(--hr-stage-h) + 130vh);
  background: var(--mk-ink);
  color: var(--mk-cream);
}

/* Hareket kapaliysa pist yok: tek ekran, kolaj son halinde. */
.hr--still {
  height: auto;
  min-height: var(--hr-stage-h);
}

.hr__stage {
  position: sticky;
  top: 0;
  height: var(--hr-stage-h);
  overflow: hidden;
  isolation: isolate;
}

.hr--still .hr__stage {
  position: static;
  height: auto;
  min-height: var(--hr-stage-h);
}

/* --- Kolaj --- */
/* Kolaj alani ustten sabit menu kadar iceri aliniyor.
   Onceden `inset: 0` idi: kolaj tum sahneyi kapliyor, bu yuzden ust iki
   fotograf (tl/tr) acildiginda menunun altinda kaliyordu.

   Merkez fotograf p=0'da yine tum sahneyi kapliyor: kutusu --hr-safe
   kadar yukari tasiyor ve yuksekligine ayni kadar ekliyor (bkz. --c-top
   / --c-hei). Yani hero'nun ilk hali degismiyor, yalnizca kolaj
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
  /* Kose yaricapi --p ile buyuyor: p=0'da merkez kare ekrani kapliyor,
     orada yuvarlak kose ekranin kendi kosesini kirpik gosterirdi. Kolaj
     toplandikca kareler birer "parca" haline geliyor. */
  border-radius: calc(var(--p) * var(--hr-radius));
}

/* Karelerin kenari: koyu zeminde koyu bir fotografin nerede bittigi
   gorunmuyordu. Ice cizilen sac teli cizgi (inset) kareyi bir tik
   kaldiriyor; kenarlik yerine box-shadow cunku kenarlik layout'u
   buyutur ve kolaj yuzde hesabiyla yerlesiyor. */
.hr__item::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  /* p=0'da (tam ekran tek fotograf) cizgi ekranin kenarina yapisik bir
     cerceve gibi gorunurdu; kolaj acilirken geliyor. */
  opacity: var(--p);
  transition: box-shadow 0.3s ease;
}

.hr__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Merkez: p=0'da ekrani kapliyor, p=1'de kolajdaki yerinde.
   Dort deger de --p ile ilerliyor (bkz. .hr yukarisi) — olcek yok, yani
   fotograf buyutulmuyor. */
.hr__item--c {
  inset-inline-start: var(--c-left);
  top: var(--c-top);
  width: var(--c-wid);
  height: var(--c-hei);
  z-index: 2;
  /* Golge de --p ile geliyor: p=0'da kare ekrani kapliyor, golgenin
     dusecegi bir zemin yok. Toplandikca kolajin on katmani olarak
     diger dortten ayrisiyor. */
  box-shadow: 0 calc(var(--p) * 2.4rem) calc(var(--p) * 4.5rem)
    rgba(0, 0, 0, calc(var(--p) * 0.5));
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
  /* Yaricap burada --s-p'ye bagli: uydular p=0.18'de ortaya cikiyor,
     --p kullanilsa o anda kosesi henuz keskin olurdu. */
  border-radius: calc(var(--s-p) * var(--hr-radius));
  box-shadow: 0 1.25rem 2.75rem rgba(0, 0, 0, 0.45);
}

/* Uydunun ::after'i da --s-p ile: kare henuz yoksa cizgisi de olmamali. */
.hr__item--tl::after,
.hr__item--tr::after,
.hr__item--bl::after,
.hr__item--br::after {
  opacity: var(--s-p);
}

/* Imlec bir karenin uzerindeyken o kare one cikiyor: cizgi parliyor ve
   fotograf hafifce yakinlasiyor. Olcek FIGURE'e degil IMG'ye veriliyor —
   figure'un transform'u zaten kolajin giris hareketini tasiyor, uzerine
   yazilsa uydu yerinden kayardi. */
.hr__item--tl:hover::after,
.hr__item--tr:hover::after,
.hr__item--bl:hover::after,
.hr__item--br:hover::after {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.32),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.18);
}

.hr__item--tl:hover .hr__img,
.hr__item--tr:hover .hr__img,
.hr__item--bl:hover .hr__img,
.hr__item--br:hover .hr__img {
  transform: scale(1.05);
}

@media (prefers-reduced-motion: reduce) {
  .hr__item .hr__img {
    transition: none;
  }

  .hr__item--tl:hover .hr__img,
  .hr__item--tr:hover .hr__img,
  .hr__item--bl:hover .hr__img,
  .hr__item--br:hover .hr__img {
    transform: none;
  }
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
    linear-gradient(
      to top,
      rgba(20, 20, 20, 0.78) 0%,
      rgba(20, 20, 20, 0.1) 52%
    ),
    rgba(20, 20, 20, 0.18);
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
  /* Bolum basliklariyla AYNI olcek (--mk-title-xl, 28 -> 35px): tek
     baslik olcegi butun sayfada ayni ritmi veriyor. Olcu
     www.gammastone.com'un h1'inden geliyor. */
  font-size: var(--mk-title-xl);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: normal;
  color: var(--mk-cream);
  text-wrap: balance;
  /* ch, bu elemanin KENDI puntosuna gore cozuluyor; olcu .hr__say uzerinde
     verilirse govde puntosuna gore cozulur ve baslik dorde kirilir.

     20ch slogan icin dogru kirilma noktasi: "Sustained by Nature," /
     "Crafted for Life" — virgul satir sonuna denk geliyor. */
  max-width: 20ch;
}

.hr__lede {
  margin: clamp(1rem, 2.2vh, 2rem) 0 0;
  /* Cumle eski basligin icerigini de devraldigi icin uzadi; 56ch'te uc
     satira kiriliyordu. 64ch satir basina karakteri hala okunur
     aralikta tutuyor (45-75) ve iki dengeli satir veriyor. */
  max-width: 64ch;
  text-wrap: pretty;
  /* Govde olcegine gore bir tik buyuk: fotografin uzerinde 15px kayboluyor.
     Agirlik da 300'den 400'e cikiyor — koyu zeminde Light cok zayif
     duruyor (acik zeminde dogru olan deger burada ters calisiyor). */
  font-size: clamp(1rem, 1.35vw, 1.1875rem);
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.86);
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

/* --- Kaydirma ipucu --- */
/* Metin bloguyla ayni alt seride ama kars kenarda duruyor: CTA solda,
   ipucu sagda. `position: absolute` cunku .hr__ui akisinda yer alsa
   butonun altina duser ve seridi uzatirdi.

   Alt kenardan degil hr__ui'nin padding'inden hizalaniyor, boylece
   butonla ayni taban cizgisinde. */
.hr__hint {
  position: absolute;
  /* Sag kenar BOS DEGIL: paylas ve WhatsApp butonlari orada sabit
     duruyor (Shared/SocialFloat.vue — right 20px, buton 58px, en
     usttekinin tabani 208px). Ipucu once tam oraya konmustu ve yesil
     butonun altinda kaliyordu. Sutunun soluna aliniyor.

     RTL'de inset-inline-end sola donuyor, butonlar ise fiziksel olarak
     sagda kaliyor — o yuzden orada fazladan paya gerek yok. */
  inset-inline-end: calc(20px + 58px + 1.25rem);
  bottom: clamp(1.75rem, 5vh, 3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  /* Kaydirma baslayinca ipucu isini bitiriyor: p=0.08'de tamamen yok.
     Isaretin kendisi kaydirmayi anlatiyor, kaydiran kullaniciya
     gereksiz. */
  opacity: clamp(0, calc(1 - var(--p) * 12), 1);
  transition: opacity 0.2s linear;
  pointer-events: none;
}

.hr__hint-text {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  white-space: nowrap;
}

/* Arapcada harf arasi acmak kelimeyi kopariyor, buyuk harf de yok. */
[dir="rtl"] .hr__hint-text {
  letter-spacing: normal;
  text-transform: none;
  font-size: 0.8125rem;
}

/* Ray: sabit sac teli cizgi. Icinde akan isik ::after. */
.hr__hint-rail {
  position: relative;
  width: 1px;
  height: 3.5rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.22);
}

.hr__hint-rail::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 1.25rem;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.95)
  );
  animation: hr-hint-drop 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

/* Isik rayin ustunden girip altindan cikiyor: -100% ile tam disarida,
   350% ile rayin (3.5rem / 1.25rem) altina gecmis oluyor. */
@keyframes hr-hint-drop {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  22% {
    opacity: 1;
  }

  78% {
    opacity: 1;
  }

  100% {
    transform: translateY(350%);
    opacity: 0;
  }
}

[dir="rtl"] .hr__hint {
  inset-inline-end: clamp(1.25rem, 3.5vw, 3.5rem);
}

/* Hareket kapaliysa pist yok — kaydirilacak bir sey de yok. */
.hr--still .hr__hint {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .hr__hint-rail::after {
    animation: none;
    /* Hareket yoksa isin durdugu yer rayin ortasi olsun, tepesinde
       yarim kalmis gibi gorunmesin. */
    top: 1.125rem;
  }
}

/* Dar ekranda gizli: parmakla kaydirmak zaten ilk refleks, ustelik
   sagda sabit paylas/WhatsApp butonlari duruyor (bkz. .hr__lede). */
@media (max-width: 47.99rem) {
  .hr__hint {
    display: none;
  }
}

/* --- Kucuk ekran --- */
/* Dar ekranda bes fotograf yan yana sigmiyor: merkez buyutuluyor,
   uydular kucultulup kenarlara cekiliyor. Pist de kisaltiliyor. */
@media (max-width: 47.99rem) {
  .hr {
    height: calc(var(--hr-stage-h) + 100vh);
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
