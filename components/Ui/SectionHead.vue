<script setup lang="ts">
/**
 * components/Ui/SectionHead.vue
 *
 * Bolum basligi: saga kaydirilmis dev display baslik. Temada ikinci satir
 * `pl-265` ile belirgin sekilde iceri aliniyor — `line2` verilirse ayni
 * kirilim burada da uygulaniyor.
 *
 * Ustteki kucuk uppercase etiket (eyebrow) kaldirildi: bes bolumun besinde de
 * ayni kalipta duruyordu ("MATERIALS" / "PROJECTS" / "FACILITIES" / "BEST
 * SELLERS" / "NEXT STEP") ve hicbiri basligin soylemedigi bir sey
 * soylemiyordu. Etiketin tasidigi bilgi varsa basligin ya da altindaki
 * cumlenin icine yazilir.
 *
 * Boyutlar:
 *   xl — ~144px (ana bolumler)
 *   lg — ~120px
 *   md — ~60px (yan kolon basliklari, FAQ)
 */

withDefaults(
  defineProps<{
    /** Basligin ilk satiri. */
    title: string;
    /** Ikinci satir — verilirse iceri kaydirilmis olarak alta gelir. */
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
  line-height: 1.06;
  letter-spacing: -0.02em;
  text-transform: none;
  color: var(--mk-ink);
  /* Dev puntolarda kelimeler tasabiliyor; tasma yerine kirilsin. */
  overflow-wrap: break-word;
}

.head--invert .head__title {
  color: var(--mk-cream);
}

.head__title--xl {
  font-size: var(--mk-title-xl);
}

.head__title--lg {
  font-size: var(--mk-title-lg);
  font-weight: 500;
  line-height: 0.9;
}

.head__title--md {
  font-size: var(--mk-title-md);
}

/* Temadaki `pl-265`: ikinci satir belirgin sekilde iceri aliniyor.
   Kucuk ekranda kaydirma yok — dev puntoda zaten yer kalmiyor.

   Girinti 16.5rem'den 10rem'e cekildi. Olculdugunde eski deger 1920px'te
   264px yer kapliyordu ve "builds places" icin geriye 936px kaliyordu —
   metnin tam genisligi de 937px, yani baslik bir pikselle ucuncu satira
   kiriliyordu. Ispanyolca ve Rusca her genislikte kiriliyordu, Rusca
   1920px'te 25px tasiyordu. Yeni degerle ucu de rahatliyor. */
.head__line2 {
  display: inline-block;
}

@media (min-width: 62rem) {
  .head__line2 {
    margin-inline-start: clamp(3rem, 10vw, 10rem);
  }
}
</style>
