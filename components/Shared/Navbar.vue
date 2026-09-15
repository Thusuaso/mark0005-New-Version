<template>
  <header class="site_header">
    <nav class="navbar navbar-expand-lg container site_header_inner">
      <NuxtLink
        class="navbar-brand site_logo"
        :to="selectedLang.link"
        aria-label="Mekmar"
      >
        <img class="logo_mekmar" :src="logo_src" alt="mekmar-logo" />
      </NuxtLink>

      <button
        class="navbar-toggler site_toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse site_nav_wrap" id="mainNav">
        <div class="site_nav" :class="`site_nav--${selectedLang.status}`">
          <NuxtLink class="site_nav_link" :to="navbar_link.home">{{
            navbar.home
          }}</NuxtLink>

          <div class="dropdown">
            <a
              class="site_nav_link site_nav_link--toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >{{ navbar.product }}</a
            >
            <!-- Eskiden .dropdown-menu (ul) icine div ve onun icine li konuyordu —
                 gecersiz HTML'di. Simdi div menu + bolum basina kendi listesi. -->
            <div class="dropdown-menu site_mega">
              <section class="site_mega_col">
                <h3 class="site_mega_title">{{ navbar.categories }}</h3>
                <ul>
                  <li v-for="item in navbar_link.categories" :key="item.id">
                    <NuxtLink class="site_mega_link" :to="item.link">{{
                      item.title
                    }}</NuxtLink>
                  </li>
                </ul>
              </section>
              <section class="site_mega_col">
                <h3 class="site_mega_title">{{ navbar.colors }}</h3>
                <ul>
                  <li v-for="item in navbar_link.colors" :key="item.id">
                    <NuxtLink class="site_mega_link" :to="item.link">{{
                      item.title
                    }}</NuxtLink>
                  </li>
                </ul>
              </section>
              <section class="site_mega_col">
                <h3 class="site_mega_title">{{ navbar.areas }}</h3>
                <ul>
                  <li v-for="item in navbar_link.areas" :key="item.id">
                    <NuxtLink class="site_mega_link" :to="item.link">{{
                      item.title
                    }}</NuxtLink>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <div class="dropdown">
            <a
              class="site_nav_link site_nav_link--toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >{{ navbar.info }}</a
            >
            <ul class="dropdown-menu site_menu">
              <li>
                <NuxtLink class="site_menu_link" :to="navbar_link.about">{{
                  navbar.about
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink class="site_menu_link" :to="navbar_link.faq">{{
                  navbar.faq
                }}</NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="site_menu_link"
                  :to="navbar_link.catalog"
                  target="_blank"
                  >{{ navbar.catalog }}</NuxtLink
                >
              </li>
            </ul>
          </div>

          <NuxtLink class="site_nav_link" :to="navbar_link.fabrication">{{
            navbar.fabrication
          }}</NuxtLink>
          <NuxtLink class="site_nav_link" :to="navbar_link.videos">{{
            navbar.videos
          }}</NuxtLink>
          <NuxtLink class="site_nav_link" :to="navbar_link.project">{{
            navbar.project
          }}</NuxtLink>
          <NuxtLink class="site_nav_link" :to="navbar_link.contact">{{
            navbar.contact
          }}</NuxtLink>
        </div>

        <div class="site_tools">
          <SharedSearchBox
            :key="String(usa_link_status)"
            :usa="usa_link_status"
          />
          <SharedLangDropdown />
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "~/store/index";

defineProps<{
  navbar: Record<string, string>;
  navbar_link: Record<string, any>;
}>();

const langs = [
  { name: "English", link: "/", status: "en" },
  { name: "France", link: "/fr", status: "fr" },
  { name: "Spanish", link: "/es", status: "es" },
  { name: "Russian", link: "/ru", status: "ru" },
  { name: "Arabic", link: "/ar", status: "ar" },
];
const store = useStore();
/* Eskiden dil bulunamazsa selectedLang bos kaliyor ve hicbir navbar
   render edilmiyordu; artik en'e dusuyor. */
const selectedLang = computed(
  () => langs.find((x) => x.status === store.getLang) ?? langs[0],
);
const logo_src = computed(() =>
  selectedLang.value.status === "en"
    ? "/image/mekmar-logo.png"
    : "https://cdn.mekmarimage.com/logo/Mekmar-Logo-b%C3%BCy%C3%BCk-yaz%C4%B1l%C4%B1-01.webp",
);

/* /usa altinda arama farkli bir kaynaktan besleniyor; SearchBox buna gore
   yer tutucu, hedef link ve oneri davranisini degistiriyor. */
const router = useRouter();
const usa_link_status = computed(
  () => router.currentRoute.value.fullPath.split("/")[1] === "usa",
);
</script>
