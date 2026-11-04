<script setup lang="ts">
/**
 * components/Home/Page.vue
 *
 * Ana sayfanin tamami. Bes dilin index.vue dosyasi da sadece bunu render
 * ediyor — onceden ayni sablon bes kez kopyalanmisti ve bir degisiklik bes
 * dosyaya elle islenmek zorundaydi.
 *
 * Bolum sirasi:
 *   hero → stats(rakamlar) → materials(kategoriler) → about → projects
 *   → facilities(akordeon) → best sellers
 *
 * Kapanis bandi (Home/Cta.vue) kaldirildi: basligi ve alt cumlesi istek
 * uzerine silinince geriye yalnizca iki buton kaliyordu; onlar da footer'a,
 * logonun altina tasindi (components/Shared/Footer.vue .ft__cta). Cta.vue
 * dosyasi duruyor ama hicbir yerde render edilmiyor.
 *
 * Temanin kendi sirasi about → service → projects → funfact idi; rakamlar
 * ve malzemeler istek uzerine hero'nun hemen altina alindi.
 * Temadaki team / testimonial / blog bolumleri atlandi: projede bu
 * icerikler yok, bos doldurmak yerine cikarildi.
 *
 * Metinler bolumlerin icinde store.getLang'e gore seciliyor (projenin
 * mevcut deseni), bu yuzden burada dile ozel hicbir sey yok.
 *
 * --- Tembel yukleme ---
 * Fold ustundeki Hero normal yukleniyor. Geri kalan her bolum `Lazy` oneki +
 * `hydrate-on-visible` ile:
 *   · SSR HTML'i aynen uretiliyor (SEO ve JS'siz goruntuleme etkilenmiyor),
 *   · bolumun JS'i ancak gorunur alana girince indirilip hidrate ediliyor.
 * Ayrica her bolum kendi icinde useReveal ile scroll'da beliriyor, gorseller
 * de loading="lazy".
 */
</script>

<template>
  <div class="home">
    <!-- Fold ustu: tembel degil. Sabit ust menu bunun uzerinde cam gibi duruyor. -->
    <HomeHero />

    <!-- Hero'nun hemen altinda rakamlar: ziyaretci once olcegi goruyor. -->
    <LazyHomeStats hydrate-on-visible />

    <!-- Sonra malzemeler (kategoriler): asil gezinme noktasi. -->
    <LazyHomeCategories hydrate-on-visible />

    <!-- "About us" bolumu ana sayfadan cikarildi (istek uzerine).
         components/Home/About.vue silinmedi: /about sayfasina ya da buraya
         geri koymak istenirse hazir duruyor, su an hicbir yerde render
         edilmiyor. -->

    <LazyHomeProjects hydrate-on-visible />

    <LazyHomeFacilities hydrate-on-visible />

    <LazyHomeBestSellers hydrate-on-visible />

    <SharedWhatsappFloat />
    <SharedSocialFloat />
  </div>
</template>

<style scoped>
/* Ana sayfa app.vue'da Bootstrap container'i ile SARILMIYOR, bu yuzden
   bolumler zeminlerini kendiliginden kenardan kenara seriyor — `100vw` +
   negatif margin hilesine gerek yok (o hile dikey kaydirma cubugu kadar
   yatay tasma uretiyordu).

   Her bolum yan boslugunu kendi padding'inden, ic genisligini de
   `min(--mk-container, 100%)` ile veriyor; boylece zemin tam ekran,
   metin ise okunur genislikte ve tum bolumlerde hizali kaliyor.

   Burada overflow kurali YOK: Hero'nun sahnesi `position: sticky` ile
   calisiyor ve sticky, kaydirma kabi olusturan bir ata altinda kiriliyor.
   Tasma riski de kalmadi (yukaridaki 100vw hilesi gitti). */
.home {
  /* Bos birakildi — bkz. yukaridaki not. */
}
</style>
