<script setup lang="ts">
/**
 * components/Shared/FinishIcon.vue
 *
 * Tas yuzey islemleri icin ikon seti (honed / polished / brushed /
 * sandblasted / bushhammered).
 *
 * --- Neden cizildi ---
 * Onceden CDN'den 100x100 raster rozetler geliyordu
 * (cdn.mekmarimage.com/other/HONED.webp). Icerikleri soluk gri iki harflik
 * bir kisaltma ("HN") + kucuk bir glifti: kontrasti dusuk, yanindaki adin
 * tekrari ve her boyutta yumusak.
 *
 * Bunlar satir ici SVG: her boyutta net, `currentColor` ile temanin rengini
 * aliyor ve ag istegi gerektirmiyor.
 *
 * --- Tasarim ---
 * Besi de ayni dis cerceveyi paylasiyor (tas karosu), yalnizca icindeki
 * doku degisiyor. Boylece tek tek degil bir aile olarak okunuyorlar:
 *   honed        duz, esit cizgiler      — puruzsuz mat yuzey
 *   polished     capraz isik yansimasi   — parlak yuzey
 *   brushed      dalgali cizgiler        — tel firca izleri
 *   sandblasted  dagilmis ince noktalar  — kum taneciklerinin izi
 *   bushhammered duzenli baklava izgara  — murc ucunun biraktigi piramitler
 *
 * Anahtar, verideki gorsel dosya adindan tureiyor (HONED.webp -> honed);
 * urun adi dile gore degistigi icin ad uzerinden eslestirme yapilamazdi.
 * Taninmayan bir anahtar gelirse bilesen hicbir sey basmiyor, cagiran
 * tarafta eski <img> yedek olarak kaliyor.
 */

import { computed } from "vue";

const props = defineProps<{
  /** Verideki gorsel adresi ya da dogrudan anahtar. */
  source?: string;
}>();

const KEYS = ["honed", "polished", "brushed", "sandblasted", "bushhammered"] as const;
type Key = (typeof KEYS)[number];

const key = computed<Key | null>(() => {
  const file = String(props.source ?? "")
    .split("/")
    .pop()
    ?.split(".")[0]
    ?.toLowerCase()
    .replace(/[^a-z]/g, "");
  return (KEYS as readonly string[]).includes(file ?? "") ? (file as Key) : null;
});
</script>

<template>
  <svg
    v-if="key"
    class="fin"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- Ortak cerceve: tas karosu -->
    <rect x="4" y="4" width="24" height="24" rx="2.5" />

    <!-- Puruzsuz mat: duz, esit araliklarla cizgiler -->
    <template v-if="key === 'honed'">
      <path d="M8 13h16M8 18h16M8 23h10" />
    </template>

    <!-- Parlak: capraz isik yansimasi -->
    <template v-else-if="key === 'polished'">
      <path d="M10 24 24 10" stroke-width="2.2" />
      <path d="M17 24 24 17" stroke-width="1.2" />
    </template>

    <!-- Tel firca: dalgali izler -->
    <template v-else-if="key === 'brushed'">
      <path d="M8 13c2.7-2 5.3 2 8 0s5.3 2 8 0" />
      <path d="M8 18c2.7-2 5.3 2 8 0s5.3 2 8 0" />
      <path d="M8 23c2.7-2 5.3 2 8 0s5.3 2 8 0" />
    </template>

    <!-- Kumlama: dagilmis ince tanecikler -->
    <template v-else-if="key === 'sandblasted'">
      <g fill="currentColor" stroke="none">
        <circle cx="10.5" cy="11" r="1.05" />
        <circle cx="16" cy="13.5" r="0.85" />
        <circle cx="21.5" cy="10.5" r="1.05" />
        <circle cx="12.5" cy="17" r="0.85" />
        <circle cx="19" cy="18.5" r="1.05" />
        <circle cx="24" cy="15.5" r="0.85" />
        <circle cx="9.5" cy="21.5" r="1.05" />
        <circle cx="15.5" cy="23" r="0.85" />
        <circle cx="22" cy="23" r="1.05" />
      </g>
    </template>

    <!-- Murc: duzenli piramit uclari -->
    <template v-else>
      <g>
        <path d="M11 10.5 12.8 12.3 11 14.1 9.2 12.3Z" />
        <path d="M16 10.5 17.8 12.3 16 14.1 14.2 12.3Z" />
        <path d="M21 10.5 22.8 12.3 21 14.1 19.2 12.3Z" />
        <path d="M13.5 17 15.3 18.8 13.5 20.6 11.7 18.8Z" />
        <path d="M18.5 17 20.3 18.8 18.5 20.6 16.7 18.8Z" />
        <path d="M11 23 12.8 24.8 11 26.6 9.2 24.8Z" transform="translate(0,-1.5)" />
        <path d="M21 23 22.8 24.8 21 26.6 19.2 24.8Z" transform="translate(0,-1.5)" />
      </g>
    </template>
  </svg>
</template>

<style scoped>
.fin {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
