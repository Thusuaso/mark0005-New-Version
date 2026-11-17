<script lang="ts" setup>
/**
 * components/Products/Card.vue
 *
 * Urun karti. Baslik gorselin uzerinde — sitenin mevcut gorunumu korundu,
 * duz gri serit yerine alttan yukari acilan gradyan kullanildi.
 *
 * Sinif adlari "pcard" onekiyle: Bootstrap'in .card, .card-title, .card-body
 * siniflari global oldugu icin o adlar kullanilamaz.
 */

import { computed } from "vue";

/* --- Kart gorselini tek tipe indirgemek ---
 *
 * Kartin kutusu her zaman ayni (asagidaki .pcard__frame, sabit en-boy
 * orani). Esit GORUNMEMELERININ sebebi kutu degil, icine konan dosya:
 * urun fotograflarinin bir kismi kare, bir kismi 1.25 / 1.5 / 2.04 gibi
 * yatay oranlarda. object-fit: cover bunlarin kenarlarini kirpiyor ve
 * her fotografta farkli oranda kirptigi icin urun kimi kartta yakin,
 * kimi kartta uzak duruyor.
 *
 * Shopify CDN sunucu tarafinda kirpabiliyor: ?width=&height=&crop=center
 * verilince dosyayi tam istenen olcude, MERKEZDEN kirpilmis halde
 * donduruyor. Boylece tarayiciya ulasan her gorsel zaten dogru oranda
 * oluyor — kirpma artik fotografa gore degismiyor, hepsinde ayni.
 *
 * Ayni parametre ikinci bir sorunu da cozuyor: katalogdaki dosyalar
 * 400x400 ile 5311x3741 arasinda degisiyordu, yani ayni 315 px'lik
 * kutuya kimi zaman 5 MP'lik bir dosya iniyordu. Artik kutunun
 * boyutuna gore olcekli (srcset) isteniyor.
 *
 * cdn.mekmarimage.com (katalogun eski, filigranli fotograflari) bu
 * parametreleri desteklemiyor — denendi, aynen orijinali donuyor. O
 * dosyalara dokunulmuyor; hepsi zaten ayni 1.25 oraninda oldugu icin
 * kendi aralarinda tutarli kirpiliyorlar. Onlarin duzelmesi fotograflarin
 * yenilenmesine bagli, kod ile cozulemez.
 */
const CROPPABLE_HOSTS = ["cdn.shopify.com"];

/* Kartin ekranda alabilecegi genislikler (2 ve 3 kolonlu izgara,
   1x ve 2x ekranlar). En buyugu 960: 3 kolonlu genis ekranda kart
   ~480 px, retinada iki kati. */
const WIDTHS = [320, 480, 640, 960];

/** "4/3" -> 1.333. Bozuk deger gelirse 1 (kare). */
function ratioValue(ratio: string): number {
  const [w, h] = ratio.split("/").map((n) => Number(n.trim()));
  return w > 0 && h > 0 ? w / h : 1;
}

/**
 * Gorseli verilen genislikte, kart oranina gore MERKEZDEN kirpilmis
 * olarak ister. Desteklemeyen bir adres (yerel dosya, eski CDN) gelirse
 * null doner ve cagiran taraf orijinali kullanir.
 */
function croppedUrl(src: string, width: number, ratio: number): string | null {
  try {
    /* Gorece yollar da ayristirilabilsin diye taban adres veriliyor;
       host eslesmedigi icin zaten null donuyorlar. */
    const url = new URL(src, "https://relative.invalid");
    if (!CROPPABLE_HOSTS.includes(url.hostname)) return null;
    url.searchParams.set("width", String(width));
    url.searchParams.set("height", String(Math.round(width / ratio)));
    url.searchParams.set("crop", "center");
    return url.toString();
  } catch {
    return null;
  }
}

const props = withDefaults(
  defineProps<{
    link: string;
    image: string;
    text: string;
    /** Gorsel en-boy orani. Ornek: '1/1', '4/3', '16/9'. */
    ratio?: string;
    /** Ekranin ustundeki ilk kartlarda 'eager' ver. */
    loading?: "lazy" | "eager";
  }>(),
  {
    ratio: "1/1",
    loading: "lazy",
  },
);

const isExternal = computed(
  () => /^https?:\/\//i.test(props.link) || props.link.startsWith("//"),
);

const ratioNum = computed(() => ratioValue(props.ratio));

/* Kirpilabilen adreslerde orta boy (640) varsayilan src, geri kalani
   srcset. Kirpilamayanlarda ikisi de bos birakilip orijinal veriliyor. */
const srcset = computed(() => {
  const parts = WIDTHS.map((w) => {
    const url = croppedUrl(props.image, w, ratioNum.value);
    return url ? `${url} ${w}w` : null;
  }).filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
});

const src = computed(
  () => croppedUrl(props.image, 640, ratioNum.value) ?? props.image,
);

/* Izgara: 48rem altinda 2 kolon, ustunde 3. Kenar bosluklariyla birlikte
   kabaca viewport'un yarisi / ucte biri; 480 px'te duruyor cunku kart
   konteynerden daha genis buyumuyor. */
const SIZES = "(min-width: 48rem) min(33vw, 480px), 50vw";
</script>

<template>
  <NuxtLink
    :to="link"
    :external="isExternal"
    target="_blank"
    :rel="isExternal ? 'noopener noreferrer' : 'noopener'"
    class="pcard"
  >
    <div class="pcard__frame" :style="{ aspectRatio: ratio }">
      <img
        class="pcard__image"
        :src="src"
        :srcset="srcset"
        :sizes="srcset ? SIZES : undefined"
        :alt="text"
        :loading="loading"
        decoding="async"
      />
      <span class="pcard__title">{{ text }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.pcard {
  display: block;
  margin-bottom: 1.5rem;
  color: inherit;
  text-decoration: none;
}

/* Golge kaldirildi: kart zeminden ton farkiyla ayriliyor, kutu olarak
   degil. Sitenin geri kalani (ana sayfa kartlari, urun detay fotograflari)
   da ayni dili kullaniyor. Hover geri bildirimi artik golge buyutmek degil,
   gorselin hafifce yakinlasmasi (.pcard__image). */
.pcard__frame {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: var(--mk-cream-2, #e8e8e8);
}

.pcard:focus-visible {
  outline: 2px solid #1e58c4;
  outline-offset: 3px;
  border-radius: 3px;
}

.pcard__image {
  width: 100%;
  height: 100%;
  display: block;
  /* object-fit: fill gorselleri eziyordu */
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.3, 1);
}

.pcard:hover .pcard__image,
.pcard:focus-visible .pcard__image {
  transform: scale(1.05);
}

.pcard__title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: block;
  padding: 2.5rem 0.75rem 0.625rem;

  /* Duz yari saydam gri serit yerine gradyan: gorselin alti kararir,
     yazi her zaman okunur, kart da kesilmis gibi gorunmez. */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.45) 45%,
    rgba(0, 0, 0, 0) 100%
  );

  color: #fff;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.35;
  text-align: center;
  /* Gradyan okunurlugu zaten sagliyor, golge gereksizdi */
  text-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .pcard__frame,
  .pcard__image {
    transition: none;
  }

  .pcard:hover .pcard__image,
  .pcard:focus-visible .pcard__image {
    transform: none;
  }
}
</style>
