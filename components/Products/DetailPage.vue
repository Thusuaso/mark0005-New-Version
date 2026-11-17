<script setup lang="ts">
/**
 * components/Products/DetailPage.vue
 *
 * Urun detay sayfasinin tamami. Bes dilin
 * pages/<lang>/product/detail/[productName]/[productId].vue dosyasi da
 * sadece bunu render ediyor — onceden ayni sablon bes kez kopyalanmisti ve
 * aralarinda surukleneme farklari olusmustu (birinde yorum satirina alinmis
 * breadcrumb, otekinde fazladan bir `.first` sinifi, ucuncusunde baska bir
 * margin). Ana sayfada Home/Page.vue ile ayni cozum uygulandi.
 *
 * Dil secimi bu dosyada YOK: metinler store.getLang'e gore
 * assets/data/<lang>.json icinden geliyor (projenin mevcut deseni).
 *
 * --- Neden sekmeler kaldirildi ---
 * Onceden sayfa uc sekmeye bolunmustu: DETAIL / APPLICATION / SIZE&PRICE.
 * Sayfanin ticari aksiyonu ("fiyat sorun" butonlari) ucuncu sekmenin
 * arkasindaydi, yani ziyaretcinin en cok merak ettigi sey (hangi ebatlar var,
 * ne kadar) tiklamadan gorunmuyordu. Her sekme artik kendi basligi olan bir
 * bolum; ebat listesi kendi seridinde ve ilk ekranin hemen altinda.
 *
 * --- Hashtagler ---
 * 40+ etiket onceden aciklamanin hemen altindaydi ve ilk ekranin buyuk
 * kismini kapliyordu. Icerik olarak SEO'ya ait, musteriye degil; sayfada ve
 * HTML'de duruyorlar ama en alta, sessiz bir seride alindilar.
 */

import { computed, ref } from "vue";
import { useStore } from "~/store/index";
import { useReveal } from "~/composables/useReveal";
import control from "~/lang/control";

const store = useStore();
const route = useRoute();

store.setLoading(ref(true));
const res = await $fetch<any>("/api/products/detail/" + route.params.productId);
if (res) {
  await store.setProductDetail(res);
  await store.setLoading(ref(false));
}

const detail = control.product_detail(
  store.getProductDetail.detail[0],
  store.getLang,
);

const photos = store.getProductDetail.photos;
const except_photo = store.getProductDetail.except;
const sizes = store.getProductDetail.sizes;
const product = store.getProduct;
const similar = store.getSimilar;
const suggested = control.lang_category_products(
  store.getProductDetail.suggested,
  store.getLang,
);

const variation = control.lang_project_variation(
  store.getVariation,
  detail?.kategori_id,
);
const application = control.lang_application(
  store.getApplication,
  detail?.kategori_id,
);
const specification = control.lang_specification(
  store.getSpecification,
  detail?.kategori_id,
);

const isRtl = store.getLang === "ar";

/* Breadcrumb: urunun kategorisi detay verisinden geliyor (kategori adi
   dile gore, id ise kategori sayfasinin adresini bulmak icin). Kategori
   listesindeki link zaten dil onekli ve "/<id>" ile bitiyor. */
const categoryCrumb = computed(() => {
  const name = String(detail?.category ?? "").trim();
  if (!name) return null;
  const id = detail?.kategori_id;
  const match = ((store.getCategories as any[]) ?? []).find(
    (c) => String(c?.link ?? "").endsWith("/" + id),
  );
  return { label: name, to: match?.link };
});

const crumbs = computed(() =>
  [categoryCrumb.value, { label: String(detail?.name ?? "") }].filter(
    Boolean,
  ) as { label: string; to?: string }[],
);

/* Kunye satirlari: degeri bos olan satir hic basilmiyor — onceden bos bir
   deger "CODE —" gibi yarim bir satir birakiyordu. */
const upper = (v: any) => (v ? String(v).toUpperCase() : "");

const specs = computed(() =>
  [
    { label: product?.tab_1_code, value: upper(detail?.urunkod) },
    { label: product?.tab_1_stonetype, value: upper(detail?.stone) },
    { label: product?.tab_1_country, value: "Türkiye" },
    { label: product?.tab_1_varitaion, value: upper(variation) },
  ].filter((row) => row.label && row.value),
);

/* Ana sayfa bolumleriyle ayni giris: kaydirinca beliriyor. Her bolum kendi
   gozlemcisini tasiyor, prefers-reduced-motion'da dogrudan gorunur. */
const { el: topEl, shown: topShown } = useReveal();
const { el: sizeEl, shown: sizeShown } = useReveal();
const { el: appEl, shown: appShown } = useReveal();
const { el: photoEl, shown: photoShown } = useReveal();
const { el: simEl, shown: simShown } = useReveal();
const { el: sugEl, shown: sugShown } = useReveal();

const hashtags = computed<string[]>(() =>
  String(detail?.hash ?? "")
    .split("#")
    .map((tag) => tag.trim())
    .filter(Boolean),
);
</script>

<template>
  <article class="pd" :dir="isRtl ? 'rtl' : undefined">
    <!-- Ust blok: solda buyuk gorsel, sagda ad + kunye + aciklama -->
    <section
      ref="topEl"
      class="pd__top"
      :class="{ 'is-in': topShown }"
    >
      <div class="pd__top-inner">
        <SharedBreadcrumb class="pd__crumbs" :items="crumbs" />

        <div class="pd__shot">
          <ProductsDetailGalleries :photos="photos" />
        </div>

        <div class="pd__say">
          <h1 class="pd__name">{{ detail.name }}</h1>

          <dl v-if="specs.length" class="pd__specs">
            <div v-for="row of specs" :key="row.label" class="pd__spec">
              <dt class="pd__spec-label">{{ row.label }}</dt>
              <dd class="pd__spec-value">{{ row.value }}</dd>
            </div>
          </dl>

          <div v-if="detail.desc" class="pd__desc">
            <h2 class="pd__sub">{{ product.description }}</h2>
            <p class="pd__desc-text">{{ detail.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ebatlar ve fiyat: sayfanin aksiyonu, artik sekme arkasinda degil -->
    <section
      v-if="sizes?.length"
      id="sizes"
      ref="sizeEl"
      class="pd__sizes"
      :class="{ 'is-in': sizeShown }"
    >
      <div class="pd__inner">
        <h2 class="pd__head">{{ product.tab_3 }}</h2>
        <ul class="pd__size-list">
          <li
            v-for="(size, i) of sizes"
            :key="size.ebat"
            class="pd__size-row"
            :style="{ '--i': i }"
          >
            <ProductsDetailSize
              :size="size.ebat"
              :unit="detail.birim"
              :price="size.fiyat"
            />
          </li>
        </ul>
      </div>
    </section>

    <!-- Kullanim alanlari / teknik -->
    <section
      v-if="application?.length || specification?.length || detail?.testrapor"
      ref="appEl"
      class="pd__app"
      :class="{ 'is-in': appShown }"
    >
      <div class="pd__inner">
        <h2 class="pd__head">{{ product.tab_2 }}</h2>
        <ProductsDetailApplication
          :application="application"
          :specification="specification"
          :specification_header="product?.specification"
          :test_report_header="product?.tab_2_test_report"
          :test_report="detail?.testrapor"
        />
      </div>
    </section>

    <!-- Diger fotograflar -->
    <section
      v-if="except_photo?.length"
      ref="photoEl"
      class="pd__photos"
      :class="{ 'is-in': photoShown }"
    >
      <div class="pd__inner">
        <ProductsDetailPhotos :photos="photos" :except_photo="except_photo" />
      </div>
    </section>

    <!-- Ilgili urunler -->
    <section
      v-if="similar?.length"
      ref="simEl"
      class="pd__related"
      :class="{ 'is-in': simShown }"
    >
      <div class="pd__inner">
        <h2 class="pd__head">{{ product.benzerurun_title }}</h2>
        <ul class="pd__cards">
          <li
            v-for="(sim, i) of similar"
            :key="sim.id"
            class="pd__card-cell"
            :style="{ '--i': i }"
          >
            <ProductsCard :link="sim.link" :image="sim.image" :text="sim.name" />
          </li>
        </ul>
      </div>
    </section>

    <section
      v-if="suggested?.length"
      ref="sugEl"
      class="pd__related pd__related--alt"
      :class="{ 'is-in': sugShown }"
    >
      <div class="pd__inner">
        <h2 class="pd__head">{{ product.onerilenurun_title }}</h2>
        <ul class="pd__cards">
          <li
            v-for="(sug, i) of suggested"
            :key="sug.id"
            class="pd__card-cell"
            :style="{ '--i': i }"
          >
            <ProductsCard :link="sug.link" :image="sug.image" :text="sug.name" />
          </li>
        </ul>
      </div>
    </section>

    <!-- Etiketler: sayfanin en altinda, sessiz -->
    <section v-if="hashtags.length" class="pd__tags">
      <div class="pd__inner">
        <h2 class="pd__tags-head">{{ product.hastags }}</h2>
        <ul class="pd__tag-list">
          <li v-for="tag of hashtags" :key="tag" class="pd__tag">#{{ tag }}</li>
        </ul>
      </div>
    </section>
  </article>
</template>

<style scoped>
/* Bolumler zeminlerini kenardan kenara seriyor; ic genislik her bolumde ayni
   kalipta (ana sayfadaki --mk-container deseni) ki basliklar hizali olsun. */
.pd {
  font-family: var(--mk-ff-body);
  color: var(--mk-ink);
}

/* --- Giris hareketi ---
   Ana sayfa bolumleriyle ayni dil: gorus alanina girince yukari dogru
   beliriyor. Yalnizca transform + opacity. */
.pd__top,
.pd__sizes,
.pd__app,
.pd__photos {
  opacity: 0;
  transform: translateY(1.25rem);
  transition:
    opacity 0.7s var(--mk-ease),
    transform 0.7s var(--mk-ease);
}

.pd__top.is-in,
.pd__sizes.is-in,
.pd__app.is-in,
.pd__photos.is-in {
  opacity: 1;
  transform: none;
}

/* Bolum icindeki parcalar tek tek beliriyor: --i sirayi, gecikme de
   ritmi veriyor (ana sayfadaki Categories/Projects deseniyle ayni). */
.pd__size-row,
.pd__card-cell {
  opacity: 0;
  transform: translateY(1rem);
  transition:
    opacity 0.6s var(--mk-ease),
    transform 0.6s var(--mk-ease);
  transition-delay: calc(var(--i, 0) * 80ms);
}

.pd__sizes.is-in .pd__size-row,
.pd__related.is-in .pd__card-cell {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .pd__top,
  .pd__sizes,
  .pd__app,
  .pd__photos,
  .pd__size-row,
  .pd__card-cell {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

.pd__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
}

/* Ust blok daha genis bir kaba oturuyor: urun sayfasinda fotograf urunun
   kendisi ve ilk ekranda baskin olmasi gerekiyor. 75rem'lik kapta gorsel
   ekranin ancak dortte birini tutuyordu. */
.pd__top-inner {
  width: min(var(--mk-container-wide), 100%);
  margin-inline: auto;
}

/* --- Ust blok --- */
.pd__top {
  padding: clamp(2rem, 4vw, 3.5rem) clamp(1.25rem, 5vw, 3rem)
    clamp(3rem, 6vw, 5rem);
  background: var(--mk-cream);
}

.pd__top-inner {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
}

/* Iz iki kolonun da ustunde, tam genislikte. */
.pd__crumbs {
  margin-bottom: clamp(1rem, 2vw, 1.75rem);
}

@media (min-width: 62rem) {
  .pd__top-inner {
    /* Gorsel baskin: urun sayfasinda fotograf urunun kendisi. */
    grid-template-columns: minmax(0, 8fr) minmax(0, 5fr);
    align-items: start;
  }

  .pd__crumbs {
    grid-column: 1 / -1;
  }
}

/* Urun adi sayfanin en buyuk seyi. Onceden 17px, mavi ve ortalanmisti. */
.pd__name {
  margin: 0 0 clamp(1.5rem, 3vw, 2.25rem);
  font-family: var(--mk-ff-display);
  font-size: clamp(1.75rem, 4.4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--mk-ink);
  text-wrap: balance;
}

/* --- Kunye --- */
/* Onceden her satirin altinda 1px cizgi ve 12px harf arasi acilmis bir
   etiket vardi. Ayrim artik bosluk ve ton farkindan geliyor. */
.pd__specs {
  margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.pd__spec {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1.5rem;
}

.pd__spec-label {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--mk-body);
}

.pd__spec-value {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  text-align: end;
  color: var(--mk-ink);
}

/* --- Aciklama --- */
.pd__sub {
  margin: 0 0 0.75rem;
  font-family: var(--mk-ff-display);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0;
  color: var(--mk-ink);
}

.pd__desc-text {
  margin: 0;
  /* ch, "0" rakaminin genisligi; Helvetica'da ortalama kucuk harften genis
     oldugu icin 50ch satira ~65 karakter veriyor — okunur aralikta
     (45-75). Olcu Libre Baskerville doneminde konmustu (~70 karakter);
     Helvetica daha dar oldugu icin sayi biraz dustu, sinir yine gecerli. */
  max-width: 50ch;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--mk-body);
}

/* --- Ebatlar ve fiyat --- */
/* --- Ebatlar ve fiyat: sayfanin koyu bandi ---
   Alti bolum de krem tonlarinda olunca sayfa duz bir serit yigini gibi
   okunuyordu. Ana sayfanin kapanis bandi (Home/Cta.vue) gibi burasi koyu:
   hem sayfaya omurga veriyor hem de ticari aksiyonun oldugu yeri isaret
   ediyor. */
.pd__sizes {
  padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-ink);
}

.pd__sizes .pd__head {
  color: var(--mk-cream);
}

/* Satirlar koyu zeminde: dolgulu yuzey bir ton acik. */
.pd__sizes :deep(.product_size) {
  background-color: rgba(255, 255, 255, 0.07);
}

.pd__sizes :deep(.product_size_label) {
  color: var(--mk-cream);
}

/* Buton koyu zeminde ters cevriliyor: krem dolgu, koyu metin. */
.pd__sizes :deep(.product_size_cta) {
  background-color: var(--mk-cream);
  color: var(--mk-ink);
}

.pd__sizes :deep(.product_size_cta:hover),
.pd__sizes :deep(.product_size_cta:focus-visible) {
  background-color: var(--mk-accent);
  color: var(--mk-cream);
}

.pd__sizes :deep(.product_size_cta:focus-visible) {
  outline-color: var(--mk-cream);
}

/* Bolum basliklari --mk-title-md (1440'ta 60px) degil: bu sayfadaki
   basliklar veriden TUM BUYUK HARF geliyor ("SIZE&PRICE", "APPLICATION")
   ve o puntoda bagiriyorlar. Ana sayfadaki cumle duzenli basliklar kadar
   buyuk olmalari da gerekmiyor — orada baslik bolumun kendisi, burada
   icerik asil is. */
.pd__head {
  margin: 0 0 clamp(1.5rem, 3vw, 2.25rem);
  font-family: var(--mk-ff-display);
  font-size: clamp(1.5rem, 2.6vw, 2.25rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--mk-ink);
  overflow-wrap: break-word;
}

.pd__size-list {
  display: grid;
  gap: 0.625rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* --- Kullanim alanlari --- */
.pd__app {
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
}

/* --- Fotograflar --- */
.pd__photos {
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream-2);
}

/* --- Ilgili urunler --- */
.pd__related {
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
}

.pd__related--alt {
  background: var(--mk-cream-2);
}

.pd__cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 1.875rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 48rem) {
  .pd__cards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* --- Etiketler --- */
.pd__tags {
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem);
  background: var(--mk-cream);
}

.pd__tags-head {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--mk-body);
}

.pd__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Onceden mavi cerceveli, italik, 12px pill'lerdi. Simdi duz metin:
   bilgi degerleri dusuk, sayfanin sonunda sessizce duruyorlar. */
.pd__tag {
  font-size: 0.9375rem;
  color: var(--mk-grey-2);
  white-space: nowrap;
}
</style>
