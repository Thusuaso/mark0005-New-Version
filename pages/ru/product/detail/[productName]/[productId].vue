<template>
  <div class="page-root">
    <!-- Urun detayinin tamami components/Products/DetailPage.vue'da. Bes
         dilin bu dosyasi da ayni bileseni render ediyor; metinler
         store.getLang'e gore bolumlerin icinde seciliyor. Dile ozel bir fark
         gerekirse DetailPage.vue'ya prop eklenir, bu dosyalar yine kopya
         kalmaz. -->
    <ProductsDetailPage />
  </div>
</template>
