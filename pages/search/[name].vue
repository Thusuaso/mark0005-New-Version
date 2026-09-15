<template>
  <div class="row m-auto text-center">
    <div class="col-sm-3 customFilter">
      <h1 class="header mt-3">CATEGORIES</h1>

      <ol class="list-group list-group-numbered">
        <div
          class="list-group-div"
          v-for="category in categories_f"
          :key="category.Id"
        >
          <ProductsFilter
            :name="category.name"
            :value="category.Filtered"
            :link="category.link"
          />
        </div>
      </ol>
    </div>
    <div class="col-sm-9">
      <div class="row m-auto text-align" v-if="products.length > 0">
        <div class="col-sm-4" v-for="product in products" :key="product.Id">
          <LazyProductsCard
            :text="product.name"
            :image="product.image"
            :link="product.link"
          />
        </div>
      </div>
      <div v-else>No Result</div>
    </div>
  </div>
  <div></div>
</template>
<script setup lang="ts">
const { start, set, clear } = useLoadingIndicator();
start();
set(20);

import { useStore } from "~/store/index";
import control from "~/lang/control";
const store = useStore();
const router = useRouter();
await $fetch("/api/search/" + router.currentRoute._value.params.name).then(
  async (res) => {
    await store.setSearchProductList(res);
  },
);
const usa = await $fetch(
  `/api/usa/search/${router.currentRoute._value.params.name}`,
);

const products = control.lang_category_products(
  store.getSearchProducts.products,
  store.getLang,
);
const categories_f = control.lang_filter(
  store.getSearchProducts.categories_f,
  store.getLang,
);
set(100);
clear();
</script>

<style scoped>
@media screen and (max-width: 576px) {
  .customFilter {
    display: none;
  }
}
</style>
