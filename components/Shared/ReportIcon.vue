<script setup lang="ts">
/**
 * components/Shared/ReportIcon.vue
 *
 * "Test raporu / teknik sartname" satirinin ikonu.
 *
 * --- Neden cizildi ---
 * Onceden orada firmanin kendi logosu duruyordu
 * (cdn.mekmarimage.com/logo/test-resport-logo.jpg, 287x222). Logo bir belge
 * ikonu degil: satirin ne oldugunu anlatmiyordu ve her urun satirinda
 * tekrarlandigi icin marka isareti olarak da bir sey katmiyordu.
 *
 * Cizim dili Shared/FinishIcon.vue ile ayni: 32x32 kutu, tek kalinlikta
 * kontur, `currentColor`. Boylece ayni bolumdeki yuzey ikonlariyla bir
 * aile olusturuyor.
 *
 * Motif: kose kivrimli bir belge + icinde iki satir + sag altta onay
 * isareti. Belge "sartname"yi, onay isareti "test edilmis"i soyluyor.
 */
</script>

<template>
  <svg
    class="rep"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- Belge, sag ust kosesi kivrik -->
    <path d="M8 6.5A1.5 1.5 0 0 1 9.5 5h8.7L24 10.8V25.5A1.5 1.5 0 0 1 22.5 27h-13A1.5 1.5 0 0 1 8 25.5Z" />
    <path d="M18 5v5.3h6" />

    <!-- Icerik satirlari. Ikincisi kisa: sag altta onay rozeti var. -->
    <path d="M11.5 14.5h8M11.5 18.5h4" />

    <!-- Onay rozeti: "test edilmis". Belgenin sag alt kosesine tasiyor,
         ici zemin rengiyle dolu ki altindaki kontur gorunmesin. -->
    <circle cx="22.5" cy="22.5" r="5" fill="var(--mk-cream, #ffffff)" />
    <path d="M20.2 22.6 21.8 24.2l3-3.2" stroke-width="1.6" />
  </svg>
</template>

<style scoped>
.rep {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
