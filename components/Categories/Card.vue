<script lang="ts" setup>
/**
 * components/Categories/Card.vue
 *
 * DIKKAT: sinif adlari "stonecard" onekiyle. Bootstrap'in .card, .card-title,
 * .card-body siniflari global oldugu icin bu adlar kullanilamaz — scoped stil
 * kendi kurallarini sinirlar ama Bootstrap'inkileri engellemez.
 */

import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    link: string;
    image: string;
    text: string;
    /** Baslik altinda gorunen ikinci satir. */
    caption?: string;
    /** Gorsel en-boy orani. Ornek: '1/1', '4/5', '16/9'. */
    ratio?: string;
    /** Ilk ekranda gorunen kartlarda 'eager' ver, digerlerinde birak. */
    loading?: "lazy" | "eager";
    /** Ic link olsa bile yeni sekmede ac. */
    newTab?: boolean;
  }>(),
  {
    caption: "",
    ratio: "1/1",
    loading: "lazy",
    newTab: false,
  },
);

const isExternal = computed(
  () => /^https?:\/\//i.test(props.link) || props.link.startsWith("//"),
);

const opensNewTab = computed(() => props.newTab || isExternal.value);
</script>

<template>
  <NuxtLink
    :to="link"
    :external="isExternal"
    :target="opensNewTab ? '_blank' : undefined"
    :rel="opensNewTab ? 'noopener noreferrer' : undefined"
    class="stonecard"
  >
    <div class="stonecard__frame" :style="{ aspectRatio: ratio }">
      <img
        class="stonecard__image"
        :src="image"
        :alt="text"
        :loading="loading"
        decoding="async"
      />
    </div>

    <div class="stonecard__body">
      <span class="stonecard__title">{{ text }}</span>
      <span v-if="caption" class="stonecard__caption">{{ caption }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.stonecard {
  --sc-ink: #22201d;
  --sc-muted: #6f6a63;
  --sc-line: #ddd7cf;

  /* Tema/Bootstrap miraslarini sifirla */
  display: block;
  background: none;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  margin: 0;

  color: var(--sc-ink);
  text-decoration: none;
  isolation: isolate;
}

.stonecard__frame {
  position: relative;
  overflow: hidden;
  background: #f1ede8;
  border-radius: 2px;
  cursor: pointer;
}

.stonecard__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0;
  transform: scale(1);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.3, 1);
}

.stonecard:hover .stonecard__image,
.stonecard:focus-visible .stonecard__image {
  transform: scale(1.04);
}

.stonecard:focus-visible {
  outline: 2px solid var(--sc-ink);
  outline-offset: 3px;
}

.stonecard__body {
  display: block;
  padding: 0.875rem 0 0;
  background: none;
  border: 0;
}

.stonecard__title {
  display: block;
  /* Temanin global baslik stilini (serif / caps / renk) ezer */
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: 0.01em;
  text-transform: none;
  color: var(--sc-ink);
}

.stonecard__title::after {
  content: "";
  display: block;
  width: 1.5rem;
  height: 1px;
  margin-top: 0.5rem;
  background: var(--sc-line);
  transition:
    width 0.4s cubic-bezier(0.2, 0.8, 0.3, 1),
    background-color 0.3s ease;
}

.stonecard:hover .stonecard__title::after,
.stonecard:focus-visible .stonecard__title::after {
  width: 3.5rem;
  background: var(--sc-ink);
}

.stonecard__caption {
  display: block;
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--sc-muted);
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .stonecard__image,
  .stonecard__title::after {
    transition: none;
  }

  .stonecard:hover .stonecard__image,
  .stonecard:focus-visible .stonecard__image {
    transform: none;
  }
}
</style>
