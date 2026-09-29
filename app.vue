<template>
  <ClientOnly>
    <SharedPageLoader />
  </ClientOnly>
  <SharedNavbar :navbar="navbar" :navbar_link="navbar_link" v-if="!isMobile" />
  <SharedNavbarmobile
    :navbar="navbar"
    :navbar_link="navbar_link"
    v-if="isMobile"
  />

  <div class="mt-2 container" v-if="!isMobile">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div
    class="container"
    v-if="isMobile"
    style="margin-top: -5px; padding-top: -5px"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <hr />
  <!-- Footer her sayfada ve her zaman fold altinda. hydrate-on-visible ile
       SSR ciktisi aynen kaliyor (SEO/icerik etkilenmiyor), sadece hydration
       gorunur alana girene kadar erteleniyor. -->
  <LazySharedFooter :footer="footer" :lang="lang" hydrate-on-visible />
</template>
<script lang="ts" setup>
import { useStore } from "~/store/index";
import { reactive, computed } from "vue";
const store = useStore();
const navbar = store.getNavbar;
const navbar_link = store.getNavbarLinks;
const footer = store.getFooter;
const lang = store.getLang;
let isMobile = ref(false);
if (process.client) {
  isMobile.value = window.innerWidth <= 768 ? true : false;
}
</script>
<style scoped>
.customBannerA {
  text-decoration: none;
}
.customBanner {
  width: 99%;
  background-color: red;
  color: white;
  text-decoration: none;
  animation: card_title_color_change 3s infinite alternate-reverse;
  border-radius: 3px;
}

.customBannerA:hover .customBanner {
  color: #990000;
}

@keyframes card_title_color_change {
  from {
    background-color: #0087cc;
  }
  to {
    background-color: #63b32e;
  }
}
</style>
