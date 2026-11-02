<script setup lang="ts">
/**
 * components/Ui/SectionHead.vue
 *
 * Temanin bolum basligi deseni: solda dar kolonda kucuk uppercase etiket,
 * altinda saga kaydirilmis dev display baslik. Temada ikinci satir
 * `pl-265` ile belirgin sekilde iceri aliniyor — `line2` verilirse ayni
 * kirilim burada da uygulaniyor.
 *
 * Boyutlar:
 *   xl — ~144px (ana bolumler)
 *   lg — ~120px
 *   md — ~60px (yan kolon basliklari, FAQ)
 */

withDefaults(
  defineProps<{
    /** Ustteki kucuk uppercase etiket. */
    eyebrow?: string;
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
  { eyebrow: "", line2: "", size: "xl", as: "h2", invert: false },
);
</script>

<template>
  <div class="head" :class="{ 'head--invert': invert }">
    <p v-if="eyebrow" class="head__eyebrow">{{ eyebrow }}</p>

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

.head__eyebrow {
  margin: 0 0 clamp(1.25rem, 3vw, 2.5rem);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--mk-ink);
}

.head--invert .head__eyebrow {
  color: rgba(247, 243, 233, 0.7);
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
   Kucuk ekranda kaydirma yok — dev puntoda zaten yer kalmiyor. */
.head__line2 {
  display: inline-block;
}

@media (min-width: 62rem) {
  .head__line2 {
    margin-inline-start: clamp(4rem, 16vw, 16.5rem);
  }
}
</style>
