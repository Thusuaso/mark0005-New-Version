<script setup lang="ts">
/**
 * Ana sayfada kategorilerin altindaki "Best Sellers" bolumu.
 *
 * Urun listesi server/api/products/bestsellers.get.ts icinde elle seciliyor;
 * isim/gorsel/link veritabanindan geliyor. Kart gorunumu kategorilerle ayni
 * olsun diye CategoriesCard yeniden kullaniliyor.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { heading: string; description: string }> = {
  en: {
    heading: "Best Sellers",
    description: "The models our customers order most, ready to ship.",
  },
  fr: {
    heading: "Meilleures ventes",
    description: "Les modèles les plus commandés, prêts à être expédiés.",
  },
  es: {
    heading: "Más vendidos",
    description: "Los modelos más pedidos por nuestros clientes, listos para enviar.",
  },
  ru: {
    heading: "Хиты продаж",
    description: "Модели, которые заказывают чаще всего — готовы к отправке.",
  },
  ar: {
    heading: "الأكثر مبيعاً",
    description: "الموديلات الأكثر طلباً من عملائنا، جاهزة للشحن.",
  },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];

const { data } = await useFetch<{ products: any[] }>(
  "/api/products/bestsellers",
  { query: { lang }, key: `bestsellers-${lang}` },
);

const products = computed(() => data.value?.products ?? []);
</script>

<template>
  <section v-if="products.length" class="bestsellers" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
    <div class="bestsellers__head">
      <h2 class="bestsellers__title">{{ t.heading }}</h2>
      <p class="bestsellers__desc">{{ t.description }}</p>
    </div>

    <div class="row m-auto">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-6 col-sm-4 mb-4"
      >
        <CategoriesCard
          :link="product.link"
          :image="product.image"
          :text="product.name"
          ratio="1/1"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bestsellers {
  margin: 2.5rem 0 1rem;
}

.bestsellers__head {
  margin-bottom: 1.5rem;
  text-align: center;
}

.bestsellers__title {
  margin: 0;
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #22201d;
}

/* Baslik altindaki ince cizgi — kategori kartlarindaki detayla ayni dil. */
.bestsellers__title::after {
  content: "";
  display: block;
  width: 3.5rem;
  height: 2px;
  margin: 0.75rem auto 0;
  background: #1357bc;
}

.bestsellers__desc {
  margin: 0.75rem 0 0;
  font-size: 0.9375rem;
  color: #6f6a63;
}

@media (max-width: 575.98px) {
  .bestsellers {
    margin-top: 1.75rem;
  }

  .bestsellers__desc {
    font-size: 0.875rem;
  }
}
</style>
