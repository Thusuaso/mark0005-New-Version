<script setup lang="ts">
/**
 * components/Ui/Btn.vue
 *
 * Temanin imza butonu (.oit-btn-border karsiligi): pill formu, uppercase
 * etiket, sagda daire icinde capraz ok.
 *
 * Iki animasyon birlikte calisiyor:
 *   · Etiket dikeyde takla atiyor — ayni metin iki kez basiliyor, biri
 *     yukari kayip cikiyor, digeri alttan gelip yerine oturuyor.
 *   · Daire icindeki ok capraz kayip cikiyor, ikinci bir ok alt-soldan
 *     gelip yerini aliyor.
 *
 * Variantlar:
 *   blur   — koyu/foto zemin uzerinde: yari seffaf + blur (hero, navbar)
 *   black  — acik zemin uzerinde dolu siyah
 *   white  — koyu zemin uzerinde dolu beyaz
 *   plain  — zeminsiz, sadece gri pill (kucuk ikincil kullanim)
 *
 * `to` verilirse NuxtLink, `href` verilirse <a>, hicbiri yoksa <button>.
 */

import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    to?: string;
    href?: string;
    variant?: "blur" | "black" | "white" | "plain";
    /** Daha yuksek dolgu (temadaki .btn-large). */
    large?: boolean;
    /** Dis linki yeni sekmede ac. */
    newTab?: boolean;
  }>(),
  { variant: "black", large: false, newTab: false },
);

const isExternal = computed(
  () => !!props.href && /^(https?:)?\/\/|^mailto:|^tel:/i.test(props.href),
);

/* NuxtLink ic gezinme, <a> dis adres/PDF, <button> ise form-ici kullanim. */
const tag = computed(() => {
  if (props.to) return resolveComponent("NuxtLink");
  if (props.href) return "a";
  return "button";
});

const opensNewTab = computed(() => props.newTab || isExternal.value);
</script>

<template>
  <component
    :is="tag"
    class="btn"
    :class="[`btn--${variant}`, { 'btn--lg': large }]"
    :to="to || undefined"
    :href="href || undefined"
    :target="opensNewTab ? '_blank' : undefined"
    :rel="opensNewTab ? 'noopener noreferrer' : undefined"
    :type="!to && !href ? 'button' : undefined"
  >
    <!-- Etiket iki kez: biri cikan, biri gelen. Ikisi de gorunur metin
         oldugundan okuyucuya tekrar etmesin diye ikincisi aria-hidden. -->
    <span class="btn__label">
      <span class="btn__t1">{{ label }}</span>
      <span class="btn__t2" aria-hidden="true">{{ label }}</span>
    </span>

    <span class="btn__icon" aria-hidden="true">
      <span class="btn__icon-box">
        <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4801 6.10132e-06L12.4381 0.99062L12.3305 1.09859C9.55759 4.01224 9.66053 7.97757 11.492 9.87138L10.5199 10.8562C9.01152 9.29621 8.47367 6.87412 9.01459 4.46212L0.955362 12.6371L-0.000299374 11.6476L8.06131 3.46911C5.69918 4.00199 3.33666 3.42959 1.82692 1.86845L2.799 0.882416C4.65351 2.80007 8.59851 2.92281 11.4801 6.10132e-06Z"
            fill="currentcolor"
          />
        </svg>
        <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4801 6.10132e-06L12.4381 0.99062L12.3305 1.09859C9.55759 4.01224 9.66053 7.97757 11.492 9.87138L10.5199 10.8562C9.01152 9.29621 8.47367 6.87412 9.01459 4.46212L0.955362 12.6371L-0.000299374 11.6476L8.06131 3.46911C5.69918 4.00199 3.33666 3.42959 1.82692 1.86845L2.799 0.882416C4.65351 2.80007 8.59851 2.92281 11.4801 6.10132e-06Z"
            fill="currentcolor"
          />
        </svg>
      </span>
    </span>
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 22px 8px 8px;
  /* Yon bagimsiz: RTL'de dolgu kendiliginden yer degistiriyor. */
  padding-inline: 22px 8px;
  font-family: var(--mk-ff-body);
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  max-width: 100%;
  border: 1px solid transparent;
  border-radius: var(--mk-radius-pill);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.btn--lg {
  padding-block: 15px;
}

/* 320-360px'te "DOWNLOAD CATALOGUE" gibi uzun etiketler nowrap oldugu
   icin butonu 304px'e cikariyor, kapsayici 265px olmasina ragmen grid
   sutununu genisletip sayfaya yatay kaydirma ekliyordu. Sinir o donemde
   govde fontu Libre Baskerville (genis bir serif) oldugu icin asiliyordu;
   site Helvetica/Arial'e gectikten sonra etiketler daralsa da kural duruyor —
   uzun ceviriler (ru/es) ayni tasmayi yeniden uretebilir. */
@media (max-width: 22.5rem) {
  .btn {
    font-size: 0.75rem;
    padding-inline: 16px 6px;
  }
}

.btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

/* --- Variantlar --- */
.btn--blur {
  color: var(--mk-cream);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(var(--mk-blur-chip));
  -webkit-backdrop-filter: blur(var(--mk-blur-chip));
}

.btn--blur:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.45);
}

.btn--black {
  color: var(--mk-cream);
  background: var(--mk-ink);
  border-color: var(--mk-ink);
}

.btn--white {
  color: var(--mk-ink);
  background: var(--mk-cream);
  border-color: var(--mk-cream);
}

.btn--plain {
  padding-block: 4px;
  color: var(--mk-grey-2);
  background: var(--mk-cream-2);
  border-color: transparent;
}

.btn--plain:hover {
  color: var(--mk-cream);
  background: var(--mk-ink);
}

/* --- Etiket taklasi --- */
.btn__label {
  position: relative;
  z-index: 1;
  display: inline-block;
  overflow: hidden;
  /* Optik hizalama (eskiden t1/t2 uzerindeydi) artik kirpilan kutunun
     kendisinde. Nudge t1/t2'de kaldiginda alttaki ikinci kopya da 1px
     yukari kayiyor ve ust piksel satiri kutunun icinde kaliyordu: Libre
     Baskerville'in harfleri 15px'lik satir kutusunda daha yukari ciktigi
     icin bu satirda murekkep vardi ve etiketin altinda kelime aralarinda
     kesilen bir cizgi gorunuyordu. */
  transform: translateY(-1px);
}

.btn__t1,
.btn__t2 {
  display: block;
  transition: transform 0.3s var(--mk-ease), top 0.3s var(--mk-ease);
}

.btn__t2 {
  position: absolute;
  top: 100%;
  inset-inline-start: 0;
}

.btn:hover .btn__t1 {
  transform: translateY(-150%);
}

.btn:hover .btn__t2 {
  top: 50%;
  transform: translateY(-50%);
}

/* --- Daire ok --- */
.btn__icon {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: var(--mk-ink);
  background: var(--mk-cream);
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
}

.btn--lg .btn__icon {
  width: 42px;
  height: 42px;
}

.btn--white .btn__icon,
.btn--plain .btn__icon {
  color: var(--mk-cream);
  background: var(--mk-ink);
}

.btn__icon-box {
  position: relative;
  display: inline-flex;
  width: 14px;
  height: 14px;
  overflow: hidden;
}

.btn__icon-box svg {
  position: absolute;
  width: 13px;
  height: 13px;
  transition: all 0.25s ease-out;
}

/* Ilk ok yerinde, ikincisi alt-solda gizli bekliyor. */
.btn__icon-box svg:first-child {
  inset-inline-start: 1px;
  bottom: 0;
}

.btn__icon-box svg:last-child {
  inset-inline-start: -12px;
  bottom: -12px;
  opacity: 0;
}

/* Hover: ilk ok sag-ustten cikar, ikincisi yerine oturur. */
.btn:hover .btn__icon-box svg:first-child {
  transform: translate(12px, -12px);
  opacity: 0;
}

.btn:hover .btn__icon-box svg:last-child {
  inset-inline-start: 1px;
  bottom: 0;
  opacity: 1;
}

/* RTL: ok yonu aynalaniyor, capraz hareket de ters yone. */
[dir="rtl"] .btn__icon-box svg {
  transform: scaleX(-1);
}

[dir="rtl"] .btn:hover .btn__icon-box svg:first-child {
  transform: scaleX(-1) translate(12px, -12px);
}

[dir="rtl"] .btn:hover .btn__icon-box svg:last-child {
  transform: scaleX(-1);
}

@media (prefers-reduced-motion: reduce) {
  .btn,
  .btn__t1,
  .btn__t2,
  .btn__icon,
  .btn__icon-box svg {
    transition: none;
  }

  /* Takla yerine sade renk degisimi kalsin. */
  .btn:hover .btn__t1,
  .btn:hover .btn__t2,
  .btn:hover .btn__icon-box svg:first-child,
  .btn:hover .btn__icon-box svg:last-child {
    transform: none;
  }

  .btn:hover .btn__t1 {
    transform: translateY(-1px);
  }

  .btn:hover .btn__t2 {
    opacity: 0;
  }

  .btn:hover .btn__icon-box svg:first-child {
    opacity: 1;
  }

  .btn:hover .btn__icon-box svg:last-child {
    opacity: 0;
  }
}
</style>
