<template>
  <ClientOnly>
    <SharedPageLoader />
  </ClientOnly>
  <!-- Hangi ust menunun gorunecegi JS ile DEGIL medya sorgusuyla
       belirleniyor. Oncesinde `v-if="isMobile"` vardi; isMobile yalnizca
       istemcide (window.innerWidth) hesaplandigi icin sunucu HER ZAMAN
       masaustu menuyu gonderiyor, tarayici da onu atip mobil olani
       kuruyordu: her mobil acilista "Hydration node mismatch" hatasi,
       bosa giden HTML ve telefonda bir an masaustu menunun gorunmesi.
       Ayrica pencere yeniden boyutlandirilinca menu degismiyordu.

       Iki menu de sunucuda uretiliyor, gorunen tek olani CSS seciyor:
       sunucu ile istemci ayni ciktiyi veriyor ve boyut degisimi aninda
       calisiyor. Sarmalayici div'ler gerekli cunku Navbarmobile'in
       sablonu bes dil icin bes kok dugume sahip (fragment) ve Vue
       fragment'lere sinif aktarmiyor. Her iki menu de position:fixed
       oldugu icin bu div'lerin yerlesime etkisi yok. -->
  <div class="nav-slot nav-slot--desktop">
    <SharedNavbar :navbar="navbar" :navbar_link="navbar_link" />
  </div>
  <div class="nav-slot nav-slot--mobile">
    <SharedNavbarmobile :navbar="navbar" :navbar_link="navbar_link" />
  </div>

  <!-- Ana sayfa: Bootstrap container'i YOK. Bolumler kendi zeminlerini
       kenardan kenara seriyor ve ic genisligi kendileri sinirliyor; araya
       container girerse hem yanlarda bosluk kaliyor hem de her bolumun
       `100vw` ile o boslugu asmasi gerekiyordu (bu da dikey kaydirma
       cubugu kadar yatay tasma uretiyor).

       Masaustu ust menu position:fixed oldugu icin hero kasitli olarak
       altina giriyor, bu yuzden burada ara bosluk da konmuyor. -->
  <template v-if="isHome">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </template>

  <!-- Ic sayfalar: eskisi gibi container icinde. Sabit menunun altinda
       kalmamalari icin menu yuksekliginde ara bosluk. -->
  <template v-else>
    <!-- Her iki ust menu de position:fixed; ic sayfalarda icerik menunun
         altinda kalmasin diye menu yuksekliginde ara bosluk. -->
    <div class="header-spacer" aria-hidden="true"></div>

    <!-- Tek container: eskiden masaustu/mobil icin iki ayri dal vardi ve
         ikisi de NuxtPage render ediyordu. Aradaki tek fark ust bosluktu,
         o da artik CSS'te.

         Urun detayi container'SIZ: ana sayfa gibi bolumleri kendi zeminini
         kenardan kenara seriyor ve ic genisligi kendi sinirliyor. Container
         icinde kalsa zeminler sayfanin ortasinda yuzen bloklar gibi
         gorunuyordu. Ust bosluk yine var (ana sayfadan farki: menunun
         altina giren tam ekran bir hero'su yok). -->
    <div :class="isWide ? 'page-wide' : 'container page-container'">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </template>
  <!-- Eskiden burada bir <hr> vardi: footer acik zeminliydi ve icerikten
       ayrilmasi gerekiyordu. Yeni footer koyu (#0d0d0d) bir blok, kendi
       sinirini zaten ciziyor — cizgi gereksizdi. -->
  <!-- Footer her sayfada ve her zaman fold altinda. `Lazy` onekiyle kendi
       chunk'inda kaliyor, yani ilk yuk hala bolunuyor.

       hydrate-on-visible KALDIRILDI: footer icindeki NuxtLink'ler bulundugu
       rotaya gore `router-link-active` sinifi aliyor. Hydration gorunur
       alana girene kadar ertelendiginde, kullanici o ana kadar baska bir
       sayfaya gectigi icin sunucunun urettigi sinif ile istemcinin bekledigi
       sinif tutmuyordu ve her gezinmede "Hydration completed but contains
       mismatches" hatasi aliniyordu. Ertelenen hydration, rotaya bagli
       cikti ureten bir bilesen icin uygun degil. -->
  <LazySharedFooter :footer="footer" :lang="lang" />
</template>
<script lang="ts" setup>
import { useStore } from "~/store/index";
import { reactive, computed } from "vue";
const store = useStore();
const navbar = store.getNavbar;
const navbar_link = store.getNavbarLinks;
const footer = store.getFooter;
const lang = store.getLang;
/* Ana sayfa yollari: "/", "/fr", "/es", "/ru", "/ar". site.trailingSlash
   acik oldugu icin sondaki "/" kirpiliyor. Navbar ayni listeyi seffaf mod
   icin kullaniyor. */
const route = useRoute();
const HOME_PATHS = new Set(["", "/fr", "/es", "/ru", "/ar"]);
const isHome = computed(() => HOME_PATHS.has(route.path.replace(/\/+$/, "")));

/* Container'siz (tam genislikte) render edilen ic sayfalar. Simdilik urun
   detayi: bolumleri ana sayfadaki gibi kendi zeminini kenardan kenara
   seriyor. Yeni bir sayfa bu dile gecirildiginde desenine buraya eklenir. */
const WIDE_PATH = /^(\/(fr|es|ru|ar))?\/product\/detail\//;
const isWide = computed(() => WIDE_PATH.test(route.path));
</script>
<style scoped>
/* Sabit ust menunun yuksekligi. Navbar'daki dolgu (0.75rem x2) + logo
   yuksekligi (46px) toplamiyla ayni tutuluyor; Hero de bu degiskeni
   okuyarak ust boslugunu hesapliyor (bkz. components/Home/Hero.vue). */
.header-spacer {
  height: var(--mk-header-h, 5.375rem);
}

/* --- Masaustu / mobil ayrimi: TEK kaynak, yalnizca CSS ---
   Esik 1150px: masaustu ust menuye logo + 7 baslik + arama + hesap + dil
   ancak bundan sonra sigiyor. JS ile yapilsaydi sunucu viewport'u
   bilemedigi icin hydration uyusmazligi olurdu (bkz. sablondaki not). */
.nav-slot {
  display: contents;
}

@media (max-width: 1150px) {
  .nav-slot--desktop {
    display: none;
  }

  .header-spacer {
    height: var(--mk-header-h-mobile, 3.5rem);
  }
}

@media (min-width: 1150.02px) {
  .nav-slot--mobile {
    display: none;
  }
}

/* Ic sayfa container'inin ust boslugu (eskiden masaustunde .mt-2,
   mobilde satir ici -5px idi). */
.page-container {
  margin-top: 0.5rem;
}

/* Container'siz dal: genislik sinirlamasi ve yan dolgu yok, bolumler
   zeminlerini kendileri seriyor. */
.page-wide {
  width: 100%;
}

@media (max-width: 1150px) {
  .page-container {
    margin-top: -5px;
  }
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
