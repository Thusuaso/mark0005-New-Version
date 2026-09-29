<template>
  <div class="dropdown">
    <button
      class="btn btn-light dropdown-toggle p-1"
      type="button"
      id="languageDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        :src="selected.flag"
        :alt="selected.code"
        class="flag-icon"
        width="70"
        height="70"
      />
    </button>
    <ul class="dropdown-menu lang-menu" aria-labelledby="languageDropdown">
      <li v-for="lang in languages" :key="lang.code">
        <a
          class="dropdown-item d-flex align-items-center lang-item"
          :href="lang.link"
          @click="selectLanguage(lang)"
        >
          <img
            :src="lang.flag"
            :alt="lang.code"
            class="flag-icon me-2"
            width="70"
            height="70"
            loading="lazy"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
/* Bayraklar 512x512 png'ydi (ar 920x920), toplam 137 KB, ama 20px
   gosteriliyorlar. 70x70 webp'ye indirildi (3.5x DPR'a kadar yeterli),
   toplam 10 KB. public/ yerine assets/ altindalar: her biri 4 KB'nin
   altinda oldugu icin Vite bunlari base64 olarak bundle'a gomuyor, yani
   5 ayri istek yerine hash'li JS chunk'i ile birlikte cache'leniyorlar. */
import flagEn from "~/assets/flags/en.webp";
import flagFr from "~/assets/flags/fr.webp";
import flagEs from "~/assets/flags/es.webp";
import flagRu from "~/assets/flags/ru.webp";
import flagAr from "~/assets/flags/ar.webp";

const cookie = useCookie("language");
const languages = [
  { code: "en", flag: flagEn, link: "/" },
  { code: "fr", flag: flagFr, link: "/fr" },
  { code: "es", flag: flagEs, link: "/es" },
  { code: "ru", flag: flagRu, link: "/ru" },
  { code: "ar", flag: flagAr, link: "/ar" },
];
/* Cerez yoksa ya da taninmayan bir dil kodu tutuyorsa find() undefined
   donuyordu ve template'teki selected.flag SSR'i 500'e dusuruyordu
   ("Cannot read properties of undefined"). Navbar.vue'daki selectedLang ile
   ayni sekilde en'e dusuyoruz. */
const selected = ref(
  languages.find((x) => x.code === cookie.value) ?? languages[0],
);

function selectLanguage(lang) {
  selected.value = lang;
  cookie.value = lang.code;
}
</script>

<style scoped>
.flag-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
/* Düğmeyi küçültelim */
.lang-toggle {
  padding: 4px 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-menu {
  width: 48px; /* Küçük ve dar açılır menü */
  padding: 4px;
  border-radius: 6px;
  min-width: unset !important; /* Bootstrap varsayılanını geçersiz kıl */
}

.lang-item {
  padding: 4px;
  display: flex;
  justify-content: center;
}
</style>
