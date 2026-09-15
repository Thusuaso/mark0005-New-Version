<script setup lang="ts">
/**
 * components/Products/Filter.vue
 *
 * Filtre satiri: solda ad, sagda urun sayisi rozeti.
 * Kendi stilini tasiyor — Bootstrap'in list-group siniflarina bagli degil.
 */

import { computed } from "vue";

const props = defineProps<{
  link: string;
  name: string;
  value: number;
}>();

const route = useRoute();

/* Su an bu filtrede miyiz? Sorgu dizesi ve sondaki slash dikkate alinmiyor. */
const isActive = computed(() => {
  const clean = (p: string) => p.split("?")[0].replace(/\/+$/, "");
  return clean(route.path) === clean(props.link);
});
</script>

<template>
  <NuxtLink
    :to="link"
    class="pfilter"
    :class="{ 'is-active': isActive }"
    :aria-current="isActive ? 'page' : undefined"
  >
    <span class="pfilter__name">{{ name }}</span>
    <span class="pfilter__count">{{ value }}</span>
  </NuxtLink>
</template>

<style scoped>
.pfilter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;

  padding: 0.5rem 0.125rem;
  color: #2b2b2b;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.35;

  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
}

.pfilter:hover {
  color: #1e58c4;
  border-left-color: #c9d6ee;
}

.pfilter:focus-visible {
  outline: 2px solid #1e58c4;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Aktif filtre: solda mavi cizgi, kalin yazi */
.pfilter.is-active {
  color: #1e58c4;
  font-weight: bold;
  border-left-color: #1e58c4;
}

.pfilter__name {
  min-width: 0;
}

.pfilter__count {
  flex: none;
  min-width: 1.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  background: #eef1f5;
  color: #6b7076;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  font-variant-numeric: tabular-nums;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.pfilter.is-active .pfilter__count {
  background: #1e58c4;
  color: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .pfilter,
  .pfilter__count {
    transition: none;
  }
}
</style>
