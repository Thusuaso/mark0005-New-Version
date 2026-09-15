<script setup lang="ts">
/**
 * Kategori urun listesi sayfasi.
 *
 * Tanitim metinleri simdilik asagidaki CATEGORY_INTROS nesnesinde duruyor.
 * Dil dosyalarina tasimak icin:
 *   1. Nesneyi oldugu gibi en.json'a "category_intros" anahtari altina koy
 *   2. store'a getFilteredHeader ile ayni desende bir getCategoryIntros ekle
 *   3. Buradaki sabiti sil, yerine: const CATEGORY_INTROS = store.getCategoryIntros
 * Anahtarlar string oldugu icin erisimde String() kullaniliyor — JSON'a
 * tasindiginda da ayni sekilde calisir.
 */

import { computed } from "vue";
import { useStore } from "~/store/index";
import control from "~/lang/control";

type CategoryIntro = { heading: string; body: string };

const CATEGORY_INTROS: Record<string, CategoryIntro> = {
  "1": {
    heading: "What is marble?",
    body: "<strong>Marble tiles</strong> are <strong>natural stone</strong> tiles made from marble, a metamorphic rock formed when limestone undergoes extreme pressure and heat. Known for their unique veining and rich color variations, each marble tile is distinct and visually stunning. Their crystalline structure allows them to be polished to a high gloss, adding to their luxurious appeal in both interior and exterior designs. Available in finishes like polished, honed, tumbled, sandblasted and bushhammered, marble tiles offer versatility in design. They are widely used in <strong>flooring</strong>, <strong>wall cladding</strong>, <strong>countertops</strong> and <strong>bathrooms</strong>, adding elegance to residential and commercial spaces. Marble tiles are heat-resistant, making them suitable for kitchens, fireplaces and outdoor applications. Proper sealing and maintenance help protect them from stains and etching. Their timeless beauty and durability make them a long-term investment in any project. As a natural, eco-friendly material, marble is a sustainable choice for enhancing the aesthetics and value of your space.",
  },
  "2": {
    heading: "What is travertine?",
    body: "<strong>Travertine</strong> is a natural stone formed through the rapid precipitation of calcium carbonate in mineral springs, particularly hot springs. It is a type of limestone with a porous structure, often characterized by its warm, earthy tones like beige, cream, tan and rust. Travertine's unique texture and natural pits give it a rustic charm, though these can be filled for a smoother finish. Available in finishes such as honed, polished, brushed or tumbled, travertine is versatile across architectural styles. It is commonly used in <strong>flooring</strong>, <strong>wall cladding</strong>, <strong>patios</strong>, <strong>pool surrounds</strong> and <strong>bathroom surfaces</strong> due to its slip-resistant properties. Travertine tiles are durable and withstand weathering, making them ideal for both indoor and outdoor applications. Proper sealing is essential to protect travertine from staining and moisture absorption. Its timeless appeal and natural warmth make travertine a popular choice for classic, elegant interiors and exteriors.",
  },
  "3": {
    heading: "What is limestone?",
    body: "<strong>Limestone tiles</strong> are crafted from a sedimentary rock that forms over millions of years from the accumulation of organic materials such as shells and marine sediments. Renowned for their soft, neutral colors like cream, beige, gray and white, limestone tiles create a calming and natural aesthetic. Their subtle patterns and smooth textures make them a versatile choice for both modern and classic architectural designs. Limestone tiles are commonly used for <strong>flooring</strong>, <strong>wall cladding</strong> and <strong>outdoor paving</strong>, offering a blend of beauty and functionality. They are particularly valued for staying cool underfoot, making them ideal for warm climates and outdoor areas. Available in honed, brushed, tumbled, sandblasted and bushhammered finishes, limestone suits a wide range of projects, and its slip resistance makes it well suited to patios, pool surrounds and bathrooms. Although softer than other natural stones, limestone is durable enough for residential and commercial applications when properly maintained. Regular sealing is recommended to protect it from moisture and staining.",
  },
  "4": {
    heading: "What is natural stone mosaic?",
    body: "<strong>Marble</strong>, <strong>travertine</strong> and <strong>limestone mosaics</strong> are decorative tiles crafted from natural stone to add sophistication to interior and exterior designs. These mosaics are meticulously designed by arranging small pieces of stone into intricate patterns or shapes, making them a popular choice for adding elegance to architectural decoration. Marble mosaics are prized for their polished finish, durability and luxurious appeal, often showcasing timeless veining in shades of white, gray or black. Travertine and limestone mosaics offer a more rustic charm with their earthy tones and characteristic porous texture, creating a warm and natural ambiance. Ideal for <strong>backsplashes</strong>, <strong>bathrooms</strong>, <strong>kitchens</strong> and <strong>feature walls</strong>, natural stone mosaics combine style with functionality, and suit both residential and commercial projects.",
  },
  "5": {
    heading: "What are outdoor stone products?",
    body: "<strong>Outdoor stone products</strong> are natural or manufactured stone materials designed specifically for exterior applications. They are crafted to withstand varying weather conditions — rain, sun exposure, frost and heavy foot traffic — making them durable, versatile solutions for outdoor spaces. Common products include <strong>pavers</strong>, <strong>tiles</strong>, <strong>coping</strong>, <strong>cladding</strong> and <strong>landscaping stones</strong>, made from travertine, marble, granite, limestone and slate. They are frequently used for patios, pathways, pool surrounds, garden walls and facades. Marble offers a luxurious, polished look, perfect for sophisticated patios and garden pathways. Travertine, with its rustic texture and slip-resistant surface, is ideal for pool surrounds, walkways and outdoor staircases, ensuring safety without compromising style. Both materials are naturally resistant to heat, making them an excellent choice for sunny environments. When properly sealed and maintained, these products last for decades.",
  },
  "6": {
    heading: "What are bath & kitchen products?",
    body: "<strong>Bath</strong> and <strong>kitchen</strong> spaces are the most popular areas to decorate with natural stone. Transform them with the timeless beauty and durability of products crafted from marble, travertine and limestone. Marble, with its elegant veining and polished finish, adds a luxurious touch to <strong>countertops</strong>, <strong>backsplashes</strong>, <strong>vanities</strong> and <strong>shower trays</strong>; its unique patterns ensure no two pieces are alike. Travertine, known for its earthy tones and textured surface, provides a rustic yet refined charm — ideal for sinks, bathtubs, wall cladding and flooring. Limestone has subtle textures that shine in shower trays, sinks and kitchen islands, complementing both modern and traditional designs. Durable, heat-resistant countertops make cooking a pleasure, while elegant stone sinks and bathtubs turn daily routines into luxurious experiences.",
  },
  "7": {
    heading: "What is a natural stone slab?",
    body: "<strong>Natural stone slabs</strong> made from marble, travertine and limestone are among the best choices for stunning surfaces. They are ideal for luxurious <strong>kitchen countertops</strong>, elegant <strong>bathroom vanities</strong>, durable <strong>flooring</strong> and striking <strong>wall cladding</strong>. Whether designing sleek shower walls, custom furniture tops or outdoor patio surfaces, natural stone slabs provide timeless beauty and unmatched versatility. Each slab is carefully selected for its unique patterns, colors and textures. Marble offers polished sophistication, travertine adds rustic charm, and limestone creates a subtle, refined look. These slabs suit both residential and commercial spaces, transforming kitchens, bathrooms, living rooms, offices and outdoor areas.",
  },
  "8": {
    heading: "What are quartz products?",
    body: "<strong>Quartz slabs</strong> are a blend of natural beauty and engineered durability, making them a versatile choice for residential and commercial applications. Composed of over 90% natural quartz crystals combined with resins and pigments, these slabs offer exceptional strength and non-porous surfaces that resist staining, scratching and heat. Available in a wide range of colors, patterns and finishes, quartz slabs can mimic the look of natural stone while providing enhanced consistency and minimal maintenance. Whether used for <strong>kitchen countertops</strong>, <strong>bathroom vanities</strong>, <strong>wall cladding</strong>, backsplashes or tabletops, quartz delivers a sophisticated, polished appearance. The choice of edge profiles and finishes — polished, matte or textured — ensures they integrate seamlessly into any design style.",
  },
  "9": {
    heading: "What are by-products?",
    body: "<strong>Natural stone</strong> brings a sense of luxury and timeless beauty to living rooms, bathrooms, kitchens and gardens in both commercial and residential projects. Crafted by nature, materials like travertine, marble, limestone and granite offer unmatched durability, elegance and character. Each piece features distinct patterns, veins and textures. Natural stone boulders can be carved to design indoor and outdoor places with elegance. Products like <strong>stairs</strong>, <strong>moldings</strong>, <strong>baseboards</strong> and <strong>fireplaces</strong> suit homeowners, designers and builders seeking high-quality interior solutions. <strong>Fountains</strong>, <strong>balustrades</strong> and <strong>flower pots</strong> elevate gardens, patios, pools and terraces.",
  },
  "11": {
    heading: "What are installation materials?",
    body: "<strong>Installation materials</strong> for natural stone and tile projects include <strong>adhesives</strong>, <strong>sealers</strong> and <strong>grouts</strong>. Premium adhesives ensure a strong and lasting bond for all types of stone and tile surfaces, making them ideal for walls, floors and outdoor applications. Advanced stone sealers safeguard against stains, moisture and wear while preserving the natural beauty of the surface. Durable, color-matched grouts provide a polished finish and long-lasting performance. These materials are designed to handle the unique challenges of natural stone, ensuring a flawless finish that lasts. With easy application and professional-grade results, they simplify installation for both professionals and DIY enthusiasts.",
  },
  "18": {
    heading: "What is plasterboard?",
    body: "<strong>Plasterboard</strong>, also known as <strong>drywall</strong> or <strong>gypsum board</strong>, is a lightweight, versatile building material used to create smooth interior walls and ceilings. Made from a core of gypsum sandwiched between layers of durable paper, plasterboard is known for its easy installation, cost-effectiveness and fire-resistant properties. It is available in moisture-resistant, fire-resistant and soundproof options, making it suitable for residential, commercial and industrial projects. Once installed, it can be painted, wallpapered or tiled. It offers excellent thermal and acoustic insulation, enhancing energy efficiency and noise reduction. Its ability to be easily cut and shaped allows for creative designs, making it an essential material for modern construction and renovation.",
  },
};

const route = useRoute();
const store = useStore();

const categoryId = computed(() => Number(route.params.id));

/* useAsyncData: sunucuda cekilen veri istemciye tasiniyor, ikinci istek
   atilmiyor. Duz "await $fetch" her iki tarafta da calisiyordu. */
const { data: detail } = await useAsyncData(
  () => `category-${route.params.id}`,
  () => $fetch(`/api/products/${route.params.id}`),
  { watch: [() => route.params.id] },
);

store.setCategoriesDetail(detail.value);
store.setResetBreadcrumb();
store.setNowBreadCrumb({
  label: route.params.name,
  route: route.fullPath,
});

const lang = store.getLang;
const detailData = store.getCategoriesDetail;
const headers = store.getFilteredHeader;

const products = control.lang_category_products(detailData.products, lang);

/*
  Filtre gruplari. showFor null ise grup her kategoride gorunur,
  doluysa yalnizca listedeki id'lerde.
  Eskiden her grup icin "category_id == 1 || category_id == 2 || ..."
  seklinde uzun zincirler vardi.
*/
const filterGroups = computed(() => {
  const groups = [
    {
      key: "category",
      header: headers.category,
      items: control.lang_filter(detailData.category_f, lang),
      showFor: null as number[] | null,
    },
    {
      key: "color",
      header: headers.color,
      items: control.lang_filter(detailData.color_f, lang),
      showFor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    {
      key: "finish",
      header: headers.finish,
      items: control.lang_filter(detailData.finish_f, lang),
      showFor: [1, 2, 3, 4, 8],
    },
    {
      key: "edge",
      header: headers.edge,
      items: control.lang_filter(detailData.edge_f, lang),
      showFor: [2],
    },
    {
      key: "material",
      header: headers.material,
      items: control.lang_filter(detailData.material_f, lang),
      showFor: [4, 7],
    },
    {
      key: "style",
      header: headers.style,
      items: control.lang_filter(detailData.style_f, lang),
      showFor: [2],
    },
    {
      key: "type",
      header: headers.type,
      items: control.lang_filter(detailData.type_f, lang),
      showFor: [5, 6, 9, 11, 18],
    },
  ];

  return groups.filter(
    (g) =>
      (g.showFor === null || g.showFor.includes(categoryId.value)) &&
      g.items?.length,
  );
});

const intro = computed(() => CATEGORY_INTROS[String(categoryId.value)] ?? null);

const isRtl = computed(() => lang === "ar");
</script>

<template>
  <div class="row m-auto">
    <!-- Filtreler -->
    <aside class="col-sm-3 filter-custom">
      <section
        v-for="group of filterGroups"
        :key="group.key"
        class="filter-group"
      >
        <h2 class="filter-group__header">{{ group.header }}</h2>

        <ol class="filter-group__list">
          <li v-for="item of group.items" :key="item.Id">
            <ProductsFilter
              :name="item.name"
              :value="item.Filtered"
              :link="item.link"
            />
          </li>
        </ol>
      </section>
    </aside>

    <!-- Urunler -->
    <div class="col-sm-9">
      <div class="row m-auto">
        <div
          v-for="(product, i) of products"
          :key="product.Id"
          class="col-sm-4 mb-4"
        >
          <ProductsCard
            :text="product.name"
            :image="product.image"
            :link="product.link"
            :loading="i < 3 ? 'eager' : 'lazy'"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Kategori tanitim metni -->
  <section v-if="intro" class="row m-auto">
    <div class="col-sm-12">
      <article class="category-intro" :class="{ 'is-rtl': isRtl }">
        <h2 class="category-intro__header">{{ intro.heading }}</h2>
        <!-- eslint-disable-next-line vue/no-v-html -- statik, kendi metnimiz -->
        <div class="category-intro__body" v-html="intro.body"></div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* --- Filtreler --- */

.filter-group {
  border: 1px solid #e3e6ea;
  border-radius: 4px;
  padding: 0.875rem 1rem 1rem;
  margin-bottom: 1rem;
  background: #fff;
}

.filter-group__header {
  font-size: 14px;
  font-weight: bold;
  color: #1e58c4;
  text-align: left;
  margin: 0 0 0.625rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eef1f4;
}

.filter-group__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.filter-group__list > li {
  padding: 0.25rem 0;
}

.filter-group__list > li + li {
  border-top: 1px solid #f4f6f8;
}

/* --- Tanitim metni --- */

.category-intro {
  max-width: 68ch;
  margin: 2.5rem auto 3.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid #e3e6ea;
}

.category-intro__header {
  font-size: 19px;
  font-weight: bold;
  color: #1e58c4;
  text-align: left;
  margin: 0 0 0.875rem;
}

.category-intro__body {
  font-size: 15px;
  line-height: 1.8;
  text-align: left;
  color: #2b2b2b;
}

/* Vurgular: eskiden italik + mavi idi, metin boyunca cok sik geciyor ve
   okumayi zorlastiriyordu. Sadece kalin biraktim. */
.category-intro :deep(strong) {
  font-weight: bold;
  font-style: normal;
  color: inherit;
}

/* --- Arapca --- */

.category-intro.is-rtl {
  direction: rtl;
}

.category-intro.is-rtl .category-intro__header,
.category-intro.is-rtl .category-intro__body {
  text-align: right;
}

.category-intro.is-rtl .category-intro__body {
  line-height: 2.1;
}
</style>
