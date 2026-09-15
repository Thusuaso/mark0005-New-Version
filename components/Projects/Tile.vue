<template>
  <NuxtLink :to="link" class="pt">
    <span class="pt_media">
      <img :src="image" :alt="name" loading="lazy" />
      <span v-if="country" class="pt_country"><i class="bi-geo-alt-fill" aria-hidden="true"></i>{{ country }}</span>
    </span>
    <span class="pt_body">
      <span class="pt_name">{{ name }}</span>
      <span class="pt_more">
        {{ cta }}<i :class="rtl ? 'bi-arrow-left' : 'bi-arrow-right'" aria-hidden="true"></i>
      </span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  link: string;
  image: string;
  name: string;
  country?: string;
  cta: string;
  rtl?: boolean;
}>();
</script>

<style scoped>
.pt {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  color: #111827;
  text-decoration: none;
  text-align: start;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.pt:hover {
  border-color: #cfd6e1;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1);
  transform: translateY(-3px);
  color: #111827;
}

.pt:focus-visible {
  outline: 3px solid #1e58c4;
  outline-offset: 2px;
}

.pt_media {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: #e5e7eb;
}

.pt_media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.pt:hover .pt_media img {
  transform: scale(1.06);
}

.pt_country {
  position: absolute;
  top: 0.7rem;
  inset-inline-start: 0.7rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  color: #1f2937;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.pt_country i {
  color: #1e58c4;
}

.pt_body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.9rem 1rem 1rem;
}

.pt_name {
  color: #111827;
  font-size: 15.5px;
  font-weight: 700;
  line-height: 1.35;
}

.pt_more {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #1e58c4;
  font-size: 13px;
  font-weight: 600;
}

.pt_more i {
  transition: transform 0.2s ease;
}

.pt:hover .pt_more i {
  transform: translateX(3px);
}

[dir="rtl"] .pt:hover .pt_more i {
  transform: translateX(-3px);
}
</style>
