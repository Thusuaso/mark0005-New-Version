<script setup lang="ts">
/**
 * components/Ui/SectionHead.vue
 *
 * Bolum basligi: iki satira kadar, SOLA HIZALI.
 *
 * Temada ikinci satir `pl-265` ile iceri aliniyordu ve bu girinti
 * buraya da tasinmisti. Referans www.gammastone.com'da basliklar duz
 * sola hizali (h1 ve h2'nin ikinci satiri ilkiyle ayni hatta basliyor),
 * o yuzden girinti kaldirildi. `line2` artik yalnizca kirilma yerini
 * belirliyor.
 *
 * Ustteki kucuk uppercase etiket (eyebrow) kaldirildi: bes bolumun besinde de
 * ayni kalipta duruyordu ("MATERIALS" / "PROJECTS" / "FACILITIES" / "BEST
 * SELLERS" / "NEXT STEP") ve hicbiri basligin soylemedigi bir sey
 * soylemiyordu. Etiketin tasidigi bilgi varsa basligin ya da altindaki
 * cumlenin icine yazilir.
 *
 * Boyutlar (tokenlardan; bkz. assets/css/tokens.css --mk-title-*):
 *   xl — 28 -> 35px  (ana bolumler; referansin h1'i)
 *   lg — 26 -> 32px  (referansin h2'si)
 *   md — 20 -> 24px  (yan kolon basliklari, FAQ)
 *
 * Olcek www.gammastone.com'dan olculdu. Oncesinde once 144/120/60px,
 * sonra yanlis referanstan (stone.gamastone.com) turetilen 44/32/33px
 * kullaniliyordu.
 */

withDefaults(
  defineProps<{
    /** Basligin ilk satiri. */
    title: string;
    /** Ikinci satir — verilirse alta gelir, ilk satirla ayni hizada. */
    line2?: string;
    size?: "xl" | "lg" | "md";
    /** Baslik seviyesi: sayfada tek h1 kalsin diye ayarlanabilir. */
    as?: "h1" | "h2" | "h3";
    /** Koyu zemin uzerinde beyaz metin. */
    invert?: boolean;
  }>(),
  { line2: "", size: "xl", as: "h2", invert: false },
);
</script>

<template>
  <div class="head" :class="{ 'head--invert': invert }">
    <component :is="as" class="head__title" :class="`head__title--${size}`">
      {{ title }}
      <template v-if="line2">
        <br />
        <span class="head__line2">{{ line2 }}</span>
      </template>
    </component>
  </div>
</template>

<style scoped>
.head {
  font-family: var(--mk-ff-body);
}

.head__title {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-weight: 700;
  /* Referansta h1 35.2/38.72 = 1.1, h2 32/35.2 = 1.1. */
  line-height: 1.1;
  /* Referansta harf araligi `normal`: 35px'lik bir baslikta negatif
     tracking harfleri sikistirmaktan baska bir sey yapmiyor. */
  letter-spacing: normal;
  text-transform: none;
  /* Referansta baslik rengi saf siyah. */
  color: var(--mk-heading, #000);
  /* Uzun kelimeler tasabiliyor; tasma yerine kirilsin. */
  overflow-wrap: break-word;
}

.head--invert .head__title {
  color: var(--mk-cream);
}

/* `xl` BUYUK HARF, diger boyutlar degil.

   Bu boyut yalnizca ana sayfanin dort bolum basliginda kullaniliyor
   (Categories, Projects, Facilities, BestSellers); `lg` ve `md`'yi
   ic sayfalar okuyor ve onlar cumle duzeninde kaliyor. Kural bu
   yuzden temel .head__title'a degil sadece bu varyanta yaziliyor —
   oraya yazilsa tum site basliklari birden buyuk harfe donerdi.

   Hero'nun h1'i de disarida: o SectionHead degil kendi .hr__title'i
   (bkz. Home/Hero.vue) ve bir slogan, bolum basligi degil.

   Arapcada buyuk-kucuk harf kavrami yok; `uppercase` orada hicbir
   sey yapmiyor, ayrica bir dal acmaya gerek kalmiyor. */
.head__title--xl {
  font-size: var(--mk-title-xl);
  text-transform: uppercase;
  /* 700 -> 500 (istek uzerine).

     ISTENEN "semi-bold" IDI AMA BU FONTTA YOK, bu yuzden not:
     Latin yuzu sistem yigini (Helvetica Neue / Helvetica / Arial /
     Liberation Sans) ve bu ailelerin yalnizca Regular ile Bold kesimi
     var. Tarayicida olculdu (48px, "OUR MATERIALS"): 400 ve 500 ayni
     genislikte (388.5px), 600 ve 700 ayni genislikte (396.43px). Yani
     600 yazmak hicbir sey degistirmezdi; 500 ise Regular'a dusuyor ve
     gercek bir incelme sagliyor. Tercih bilerek bu yonde yapildi.

     Gercek bir ara agirlik istenirse 600 kesimi olan bir aile
     yuklenmesi gerekir (@nuxt/fonts zaten kurulu, bkz. nuxt.config). */
  font-weight: 500;
}

/* lg'nin kendi satir yuksekligi (0.9) ve agirligi (500) 120px icin
   ayarlanmisti: o puntoda 0.9 satirlar arasini kapatiyor, 500 ise dev
   harflerin agirligini kiriyordu. 46px'te ikisi de ters calisiyor —
   satirlar ust uste biniyor ve baslik govdeden ayirt edilemiyor.
   Artik yalnizca punto farki kaliyor, digerleri .head__title'dan geliyor. */
.head__title--lg {
  font-size: var(--mk-title-lg);
}

.head__title--md {
  font-size: var(--mk-title-md);
}

/* Ikinci satirin girintisi KALDIRILDI.

   Temadaki `pl-265` once 16.5rem, sonra 10rem, sonra clamp(1.5rem, 5vw,
   5rem) olarak kuculerek tasinmisti — her adimda punto dustukce girinti
   basligi iki ayri parcaya bolup okunurlugu dusurdugu icin. Referans
   www.gammastone.com'da boyle bir kayma hic yok, basliklar duz sola
   hizali. 35px'lik bir baslikta girintinin tasarim degeri de kalmiyor.

   Eleman duruyor: `line2` metnin NEREDE kirilacagini belirliyor, bu da
   bes dilde satir sonlarinin elle kontrol edilmesini sagliyor. */
.head__line2 {
  display: inline-block;
}
</style>
