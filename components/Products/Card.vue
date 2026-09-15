<script lang="ts" setup>
/**
 * components/Products/Card.vue
 *
 * Urun karti. Baslik gorselin uzerinde — sitenin mevcut gorunumu korundu,
 * duz gri serit yerine alttan yukari acilan gradyan kullanildi.
 *
 * Sinif adlari "pcard" onekiyle: Bootstrap'in .card, .card-title, .card-body
 * siniflari global oldugu icin o adlar kullanilamaz.
 */

import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    link: string;
    image: string;
    text: string;
    /** Gorsel en-boy orani. Ornek: '1/1', '4/3', '16/9'. */
    ratio?: string;
    /** Ekranin ustundeki ilk kartlarda 'eager' ver. */
    loading?: "lazy" | "eager";
  }>(),
  {
    ratio: "1/1",
    loading: "lazy",
  },
);

const isExternal = computed(
  () => /^https?:\/\//i.test(props.link) || props.link.startsWith("//"),
);
</script>

<template>
  <NuxtLink
    :to="link"
    :external="isExternal"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="pcard"
  >
    <div class="pcard__frame" :style="{ aspectRatio: ratio }">
      <img
        class="pcard__image"
        :src="image"
        :alt="text"
        :loading="loading"
        decoding="async"
      />
      <span class="pcard__title">{{ text }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.pcard {
  display: block;
  margin-bottom: 1.5rem;
  color: inherit;
  text-decoration: none;
}

.pcard__frame {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: #f1ede8;
  /* Eski kartta 8px'lik sert siyah golge vardi; daha yumusak ve yayvan */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.14);
  transition: box-shadow 0.3s ease;
}

.pcard:hover .pcard__frame,
.pcard:focus-visible .pcard__frame {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}

.pcard:focus-visible {
  outline: 2px solid #1e58c4;
  outline-offset: 3px;
  border-radius: 3px;
}

.pcard__image {
  width: 100%;
  height: 100%;
  display: block;
  /* object-fit: fill gorselleri eziyordu */
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.3, 1);
}

.pcard:hover .pcard__image,
.pcard:focus-visible .pcard__image {
  transform: scale(1.05);
}

.pcard__title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: block;
  padding: 2.5rem 0.75rem 0.625rem;

  /* Duz yari saydam gri serit yerine gradyan: gorselin alti kararir,
     yazi her zaman okunur, kart da kesilmis gibi gorunmez. */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.45) 45%,
    rgba(0, 0, 0, 0) 100%
  );

  color: #fff;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.35;
  text-align: center;
  /* Gradyan okunurlugu zaten sagliyor, golge gereksizdi */
  text-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .pcard__frame,
  .pcard__image {
    transition: none;
  }

  .pcard:hover .pcard__image,
  .pcard:focus-visible .pcard__image {
    transform: none;
  }
}
</style>
