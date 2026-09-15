<template>
  <!-- How It Works: tam genislik, row'un disinda -->

  <div class="row m-auto">
    <div class="col-sm-12">
      <SharedHowItWorks />
      <SharedTrustBar />
    </div>
    <div class="col-sm-3 mt-0 filter-custom">
      <div class="mb-3">
        <CategoriesCard
          :link="usastock.link"
          :image="usastock.img"
          :text="usastock.name"
          ratio="1/1"
          loading="eager"
        />
      </div>

      <div class="mb-3">
        <CategoriesCard
          link="/fr/catalog"
          image="/image/online-catalog-main-photo-mekmar.webp"
          text="CATALOGUE EN LIGNE"
          ratio="1/1"
          loading="eager"
          new-tab
        />
      </div>

      <CategoriesSlides :slides="slides.slide1" />
      <CategoriesSlides :slides="slides.slide2" />
    </div>

    <div class="col-sm-9">
      <div class="row m-auto">
        <div
          v-for="(category, i) of categories"
          :key="category.id"
          class="col-sm-4 mb-4"
        >
          <LazyCategoriesCard
            :link="category.link"
            :image="category.image"
            :text="category.name"
            :loading="i < 3 ? 'eager' : 'lazy'"
            ratio="1/1"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- <SharedPopUp v-show="isVisible" v-if="session != 'false' && !isMobile" />
  <SharedPopUpMobile v-show="isVisible" v-if="session != 'false' && isMobile" /> -->
  <SharedWhatsappFloat />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "~/store/index";

const store = useStore();
const categories = store.getCategories;
const slides = store.getSlides;
const usastock = store.getUsaStockMainMenu;

/* --- Pop-up durumu (su an template'te kapali) --- */
const isVisible = ref(true);
const isMobile = ref(false);

const closeModal = () => {
  isVisible.value = false;
  sessionStorage.setItem("modal_section_visible", "false");
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  // SSR ile istemci ciktisinin ayrismamasi icin mount sonrasina alindi.
  isMobile.value = window.innerWidth <= 768;
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>
