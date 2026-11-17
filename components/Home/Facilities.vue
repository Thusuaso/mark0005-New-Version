<script setup lang="ts">
/**
 * components/Home/Facilities.vue
 *
 * Uretim zinciri vitrini: fabrikalar / ocaklar / ABD deposu. Uc asama uc
 * BANT halinde, hepsi birden gorunur — masaustunde solda asama adi, foto
 * sayisi ve kaydirma oklari, sagda yatay bir fotograf seridi; bantlar
 * arasinda yatay cizgi.
 *
 * Veri store'daki `fabrication.items` — her dilde basliklari ve foto
 * setleri hazir, ayri icerik girilmiyor. Set boyutlari ESIT DEGIL
 * (16 / 7 / 4) ve bolum bunu varsaymiyor: serit kaydirildigi icin
 * asama sayisi ne olursa olsun bant yuksekligi ayni kaliyor.
 *
 * ONCESINDE AKORDEONDU (tek panel acik, sagda donen + / − isareti,
 * `grid-template-rows: 0fr → 1fr` ile acilma). Neden kaldirildigi
 * asagidaki "AKORDEON KALDIRILDI" notunda.
 *
 * Fotolara tiklanirsa Fancybox'ta aciliyor (@fancyapps/ui). Fancybox CSS'i
 * SharedFancybox sarmalayicisindan geliyor, yani yalnizca bu bolum render
 * edildiginde yukleniyor.
 */

import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

type Photo = { id: number | string; title: string; image: string };
type Group = { id: number | string; header: string; images: Photo[] };

const texts: Record<
  Lang,
  {
    title: string;
    count: (n: number) => string;
    prev: string;
    next: string;
  }
> = {
  en: {
    title: "Integrated Operations",
    count: (n) => `${n} photos`,
    prev: "Previous photos",
    next: "Next photos",
  },
  fr: {
    title: "Opérations intégrées",
    count: (n) => `${n} photos`,
    prev: "Photos précédentes",
    next: "Photos suivantes",
  },
  es: {
    title: "Operaciones integradas",
    count: (n) => `${n} fotos`,
    prev: "Fotos anteriores",
    next: "Fotos siguientes",
  },
  ru: {
    title: "Интегрированные операции",
    count: (n) => `${n} фото`,
    prev: "Предыдущие фото",
    next: "Следующие фото",
  },
  ar: {
    title: "عمليات متكاملة",
    count: (n) => `${n} صور`,
    prev: "الصور السابقة",
    next: "الصور التالية",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";

const groups = computed<Group[]>(() => {
  const fab = store.getFabrication as { items?: Group[] } | undefined;
  return (fab?.items ?? []).filter((g) => g?.images?.length);
});

/* AKORDEON KALDIRILDI — oncesinde tek seferde tek panel acikti (`open`
   / `toggle`) ve ilk panel baslangicta aciliyordu.

   Neden: akordeon bir ACIKLAMA kalibi, yani uzun metni katlayip yerden
   kazanmak icin var (temadaki FAQ bolumu bu yuzden boyle). Burada
   katlanan sey metin degil FOTOGRAF ve fotograflar bu bolumun butun
   degeri: 12 fotografin 8'i gizli kaliyordu. Ustelik adlari gercek
   bilgi tasiyor — "Bianco Ibiza Marble Quarry", "Turkish Calacatta
   Marble Quarry", "CNC Cutting Angled Stairs" — yani ziyaretci hangi
   mermerin hangi ocaktan geldigini okuyabiliyor ama ancak dogru paneli
   acmayi akil ederse.

   Simdi uc asama da ayni anda gorunuyor; sira yukaridan asagiya
   okunan bantlarla kuruluyor, 01/02/03 gibi numaralarla degil.

   NOT: Baslik "Quarried, cut and stocked" iken basligin KENDISI de
   bir sira vaat ediyordu ve bantlar o vaadi karsiliyordu. Baslik
   "Integrated Operations" olarak degisti — sirayi soyleyen tek sey
   artik bantlarin kendisi, bu yuzden uretim -> ocak -> depo duzeni
   bozulmamali. */

const { el, shown } = useReveal();

/* --- Seridi oklarla kaydirmak ---
 *
 * Dokunmatikte parmak, masaustunde kaydirma cubugu zaten var; oklar
 * UCUNCU bir yol degil, masaustunun ASIL yolu: fare tekerlegi yatay
 * kaydirmiyor ve ince bir cubugu surukletmek konforsuz.
 *
 * Her asamanin kendi seridi oldugu icin oklar da asama basina ayri
 * tutuluyor; durumlari (basta mi, sonda mi) grup id'sine gore bir
 * nesnede duruyor.
 */
const strips: Record<string, HTMLElement> = {};
const reach = ref<Record<string, { prev: boolean; next: boolean }>>({});

function bindStrip(id: string | number, node: unknown) {
  const key = String(id);
  if (node instanceof HTMLElement) {
    strips[key] = node;
    measure(id);
  } else {
    delete strips[key];
  }
}

/* Her grup icin TEK ve kalici bir ref fonksiyonu.

   Oncesinde sablonda satir ici `:ref="(node) => bindStrip(group.id, node)"`
   vardi. O ifade her render'da YENI bir fonksiyon uretiyor; Vue ref'in
   degistigini gorup her guncellemede once eskisini null ile, sonra
   yenisini elemanla cagiriyor. Yeni cagri measure() -> `reach` yazimi ->
   yeni render zincirini kapatiyordu ve sayfa "Maximum recursive updates
   exceeded" ile duruyordu. Hata <Fancybox> adina dusuyordu, cunku bu
   serit onun slot'u icinde render ediliyor ve bagimliliklar onun render
   effect'inde izleniyor — yani Fancybox'in kendi kusuru degildi.

   Fonksiyon grup basina bir kez uretilip saklaniyor, kimligi sabit
   kaliyor ve Vue onu yeniden cagirmiyor. */
const stripRefs: Record<string, (node: unknown) => void> = {};

function stripRef(id: string | number) {
  const key = String(id);
  return (stripRefs[key] ??= (node: unknown) => bindStrip(id, node));
}

/* RTL'de scrollLeft BASLANGICTA 0, sola gittikce NEGATIF oluyor
   (Chrome/Firefox/Safari'nin ortak davranisi). Bu yuzden "baslangictan
   uzaklik" icin mutlak deger aliniyor; boylece tek olcum iki yonde de
   dogru. */
function measure(id: string | number) {
  const node = strips[String(id)];
  if (!node) return;
  const max = node.scrollWidth - node.clientWidth;
  const at = Math.abs(node.scrollLeft);
  const prev = at > 1;
  const next = at < max - 1;

  /* Sonuc degismediyse YAZMIYOR. Oncesinde her olcum yeni bir nesne
     atiyordu; degerler ayni olsa bile `reach` degisti sayilip bagli
     sablon yeniden render ediliyordu. Olcum render sonrasi
     tetiklendigi icin (ref callback, scroll) bu tek basina sonsuz
     donguyu besleyebiliyor — kararli ref fonksiyonu olmasa da bu
     kontrol zinciri kiriyor. */
  const key = String(id);
  const now = reach.value[key];
  if (now && now.prev === prev && now.next === next) return;
  reach.value[key] = { prev, next };
}

function slide(id: string | number, dir: 1 | -1) {
  const node = strips[String(id)];
  if (!node) return;
  /* scrollBy'nin `left`i HER ZAMAN gorsel saga dogru pozitif. Okuma
     yonunde "ileri" RTL'de gorsel SOL demek, bu yuzden isaret
     ceviriliyor. */
  const rtl = getComputedStyle(node).direction === "rtl";
  node.scrollBy({
    left: dir * node.clientWidth * 0.8 * (rtl ? -1 : 1),
    behavior: "smooth",
  });
}

/* Olcum bir kez mount'ta, sonra her kaydirmada ve pencere boyu
   degisince. Fotograflar lazy ama oge genisligi CSS'ten sabit oldugu
   icin scrollWidth gorseller inmeden de dogru. */
function measureAll() {
  for (const g of groups.value) measure(g.id);
}

onMounted(() => {
  nextTick(measureAll);
  window.addEventListener("resize", measureAll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("resize", measureAll));
</script>

<template>
  <section
    v-if="groups.length"
    ref="el"
    class="fc"
    :class="{ 'is-in': shown }"
    :dir="isRtl ? 'rtl' : undefined"
    aria-labelledby="fc-title"
  >
    <div class="fc__inner">
      <UiSectionHead
        class="fc__head"
        :title="t.title"
        size="xl"
        as="h2"
      />

      <!-- Fancybox tum [data-fancybox] elemanlarini kendisi bagliyor;
           sadece sarmalamak yeterli. -->
      <SharedFancybox>
        <div class="fc__list">
          <!-- Her asama bir bant: solda adi ve foto sayisi, sagda dort
               fotograf. Bantlar arasindaki ince cizgi sus degil, bir
               asamanin nerede bitip digerinin nerede basladigini
               soyleyen yapisal bilgi. -->
          <section
            v-for="group of groups"
            :key="group.id"
            class="stage"
            :aria-labelledby="`fc-stage-${group.id}`"
          >
            <div class="stage__label">
              <h3 :id="`fc-stage-${group.id}`" class="stage__name">
                {{ group.header }}
              </h3>
              <p class="stage__count">{{ t.count(group.images.length) }}</p>

              <!-- Oklar ETIKET KOLONUNDA, seridin uzerinde degil:
                   seridin uzerine binen oklar iki fotografin kenarini
                   surekli kapatiyor ve bu bolumde fotograflar zeminden
                   cikan tek sey. Burada zaten bos duran bir kolon var.

                   Serit sigiyorsa (kaydirilacak yer yok) oklar hic
                   basilmiyor — islevsiz bir kontrol gostermemek icin. -->
              <div
                v-if="reach[String(group.id)]?.prev || reach[String(group.id)]?.next"
                class="stage__nav"
              >
                <button
                  type="button"
                  class="stage__arrow"
                  :aria-label="t.prev"
                  :disabled="!reach[String(group.id)]?.prev"
                  @click="slide(group.id, -1)"
                >
                  <i :class="isRtl ? 'bi-chevron-right' : 'bi-chevron-left'" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  class="stage__arrow"
                  :aria-label="t.next"
                  :disabled="!reach[String(group.id)]?.next"
                  @click="slide(group.id, 1)"
                >
                  <i :class="isRtl ? 'bi-chevron-left' : 'bi-chevron-right'" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <ul
              class="shots"
              :ref="stripRef(group.id)"
              @scroll.passive="measure(group.id)"
            >
              <li
                v-for="photo of group.images"
                :key="photo.id"
                class="shots__item"
              >
                <a
                  class="shot"
                  :href="photo.image"
                  data-fancybox="facilities"
                  :data-caption="photo.title"
                >
                  <!-- <img> DEGIL <NuxtImg>: fab_1'e 16 yeni fabrika
                       fotografi eklendi ve hepsi 4096x4096, 1-4.7 MB.
                       Olceklendirme artik tercih degil zorunluluk:
                       ham hallerinde bu bolum tek basina 45 MB indirirdi.

                       alt ARTIK DOLU. Oncesinde bilerek bos birakilmisti,
                       cunku fotografin adi ayni baglantinin icinde
                       .shot__cap olarak metin halinde duruyordu ve ekran
                       okuyucu ayni seyi iki kez okurdu. O yazi kaldirildi
                       (gerekcesi .shots notunda), yani adi tasiyan tek
                       yer artik alt.

                       sizes seritten turetildi: oge genisligi
                       clamp(13rem, 24vw, 17rem), yani en genis ekranda
                       272 px. 2x ekran icin 544'e yuvarlandi. -->
                  <NuxtImg
                    class="shot__img"
                    :src="photo.image"
                    :alt="photo.title"
                    sizes="xs:70vw sm:55vw md:30vw lg:280px xl:280px xxl:280px"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </SharedFancybox>
    </div>
  </section>
</template>

<style scoped>
.fc {
  font-family: var(--mk-ff-body);
  padding: var(--mk-section-y) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream-2);
}

.fc__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

/* Baslik ile icerigi arasindaki bosluk. Basliklar 64 -> 48px'e inince
   96px'lik ayrim basligi kendi bolumunden kopuk gosteriyordu: bosluk
   basligin kendi yuksekliginden iki kat buyuktu. */
.fc__head {
  margin-bottom: clamp(1.75rem, 4.5vw, 3.5rem);
}

/* --- Asama bantlari ---
   ONCESI: akordeon. Her satir kendi yuzeyi olan bir paneldi, arasinda
   ince bosluk, sagda donen + / - isareti ve `grid-template-rows: 0fr ->
   1fr` ile acilan panel. Kaldirilma gerekcesi script blogunun basinda.

   SIMDI: uc bant, hepsi acik. Masaustunde iki kolon — solda asama adi
   ve foto sayisi, sagda dort fotograf. Bantlar arasinda yatay cizgi.

   Zemin: bolumun kendisi --mk-cream-2 (#e8e8e8) uzerinde duruyor ve
   bantlara ayri bir yuzey VERILMIYOR. Akordeonda panellerin bir ton
   acik olmasi gerekiyordu cunku tiklanabilir bir yuzeydi; artik
   tiklanan sey fotograflarin kendisi, bant yalnizca bir gruplama.
   Boylece fotograflar zeminden tek cikinti olarak kaliyor. */
.fc__list {
  display: grid;
  gap: 0;

  /* Giris hareketi TEK: oncesinde her panel `--i * 90ms` gecikmeyle tek
     tek kayarak giriyordu. Uc ayri kayma, bolumu olusturan parcalari
     birbirinden kopariyor ve sitedeki diger bolumlerle birlikte ayni
     efektin tekrari oluyordu. Simdi bolum tek parca halinde bir kez
     beliriyor. */
  opacity: 0;
  transform: translateY(1rem);
  transition:
    opacity 0.7s var(--mk-ease),
    transform 0.7s var(--mk-ease);
}

.fc.is-in .fc__list {
  opacity: 1;
  transform: none;
}

.stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(0.875rem, 2vw, 1.25rem);
  padding-block: clamp(1.5rem, 3.5vw, 2.5rem);
  border-block-start: 1px solid var(--mk-line-strong);
}

/* Son bandin altina da cizgi: uc bant kapali bir blok olarak okunuyor,
   sonu havada kalmiyor. */
.stage:last-child {
  border-block-end: 1px solid var(--mk-line-strong);
}

@media (min-width: 48rem) {
  .stage {
    grid-template-columns: minmax(0, 13rem) minmax(0, 1fr);
    gap: clamp(1.5rem, 3vw, 2.5rem);
    align-items: start;
  }
}

/* Etiket kolonu. position: sticky YOK: bant yuksekligi bir ekrani
   gecmiyor, sticky yalnizca gereksiz bir hareket eklerdi. */
.stage__label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Punto bolum basligindan (48px) belirgin kucuk, foto adlarindan
   (15px) belirgin buyuk: uc kademeli bir hiyerarsi.

   text-transform YOK — veri zaten buyuk harfle geliyor ("SUB
   SUPPLIERS"). CSS ile kucultmek icerigi sunum katmaninda degistirmek
   olurdu; duzeltilecekse assets/data/*.json icinde duzeltilmeli. */
.stage__name {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-size: clamp(1.125rem, 1.7vw, 1.5rem);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: normal;
  color: var(--mk-ink);
}

.stage__count {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--mk-grey-2);
}

/* --- Yatay serit ---
   ONCESI: 2 (dar) / 4 (48rem) kolonlu izgara. Her asamada tam dort
   fotograf vardi ve izgara onlari tek satira siğdiriyordu.

   DEGISME SEBEBI: fab_1'e 16 fotograf eklendi. Izgarada o asama
   masaustunde dort SATIR olurdu; yanindaki QUARRIES ve WAREHOUSE
   bantlari tek satir kaldigi icin bolum tek bir asamanin altinda
   ezilirdi. Yatay seritte her asama kendi satirinda kaliyor, bant
   sayisi ne olursa olsun bolumun yuksekligi sabit.

   Kaydirma cubugu GIZLENMEDI. Dokunmatikte parmak zaten kaydirir ama
   masaustunde fare tekerlegi dikey calisir; gorunur bir cubuk olmazsa
   kullanici sagda devam eden fotograflari fark etmez. Ince ve tema
   renginde bir cubuk, "burada devam ediyor" bilgisini tasiyan tek
   isaret.

   scroll-snap: serit rastgele bir yerde durmuyor, fotograf kenarina
   oturuyor. `proximity` degil `mandatory` degil — ikisinin arasi
   istendigi icin `proximity`: kullanici serbest kaydirabilsin ama
   birakinca hizaya otursun. */
.shots {
  display: flex;
  gap: clamp(0.5rem, 1.5vw, 1.25rem);
  margin: 0;
  /* padding SIFIR: alt bosluk, serit akordeon panelinin icindeyken
     gerekiyordu. Artik .stage kendi padding-block'unu tasiyor; ikisi
     birlikte kalsa bantlar arasinda cifte bosluk olusuyordu.
     Alt dolgu ise kaydirma cubuguna yer aciyor. */
  padding: 0 0 0.75rem;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
  scrollbar-color: var(--mk-line-strong) transparent;
}

/* WebKit tarafi: Firefox'un `scrollbar-width`/`scrollbar-color`u
   karsiligi yok, iki tarafin da ayni inceligi gostermesi icin. */
.shots::-webkit-scrollbar {
  height: 4px;
}

.shots::-webkit-scrollbar-track {
  background: transparent;
}

.shots::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: var(--mk-line-strong);
}

/* Ogeler esnemiyor (flex: 0 0 auto): esneselerdi az fotografli bir
   asamada kutular gerilir, asamalar arasinda fotograf boyu degisirdi.
   Sabit genislik hepsini ayni olcude tutuyor. */
.shots__item {
  flex: 0 0 auto;
  width: clamp(13rem, 24vw, 17rem);
  scroll-snap-align: start;
}

/* Oklar sitenin dilinde: cerceve ve golge yok, 1px kenarlik ve
   zeminin kendisi. Dar ekranda GIZLI — orada parmakla kaydiriliyor ve
   etiket kolonu fotograflarin ustunde dar bir serit, oklar oraya
   sikisirdi. */
.stage__nav {
  display: none;
  gap: 0.5rem;
  margin-top: 0.875rem;
}

@media (min-width: 48rem) {
  .stage__nav {
    display: flex;
  }
}

.stage__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid var(--mk-line-strong);
  background: transparent;
  color: var(--mk-ink);
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background 0.3s var(--mk-ease),
    color 0.3s var(--mk-ease),
    opacity 0.3s var(--mk-ease);
}

.stage__arrow:hover:not(:disabled) {
  background: var(--mk-ink);
  color: var(--mk-cream);
}

/* Ucta: dugme duruyor ama soluk. Kaldirmak yerine soluklastirmak,
   diger okun yeri kaymasin diye. */
.stage__arrow:disabled {
  opacity: 0.3;
  cursor: default;
}

.stage__arrow:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 2px;
}

.shot {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--mk-cream-2);
  text-decoration: none;
}

.shot__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.8s var(--mk-ease);
}

.shot:hover .shot__img,
.shot:focus-visible .shot__img {
  transform: scale(1.06);
}

.shot:focus-visible {
  outline: 2px solid var(--mk-ink);
  outline-offset: 3px;
}

/* FOTOGRAF USTU YAZI KALDIRILDI (.shot__cap: mutlak konumlu, alttan
   yukari koyulasan gradyan uzerinde beyaz ad).

   Bu bolum bir URETIM ZINCIRI vitrini: anlatan sey asamanin kendisi,
   tek tek fotografin adi degil. Asama adi zaten solda, bandin
   etiketinde duruyor. Her karenin altinda ayrica bir ad bulunmasi
   16 fotografla birlikte seridi yazi serisine cevirdi.

   Adlar KAYBOLMADI: fotografa tiklaninca Fancybox'ta alt yazi olarak
   gorunuyor (data-caption) ve alt metninde ekran okuyucuya veriliyor.
   Yani bilgi duruyor, yalnizca kadrajin uzerinden cekildi. */

@media (prefers-reduced-motion: reduce) {
  .fc__list,
  .shot__img {
    transition: none;
  }

  /* Giris hareketi kapaliyken bolum bastan gorunur olmali, yoksa
     opacity: 0 ile ekranda hic cikmaz. */
  .fc__list {
    opacity: 1;
    transform: none;
  }

  .shot:hover .shot__img,
  .shot:focus-visible .shot__img {
    transform: none;
  }
}
</style>
