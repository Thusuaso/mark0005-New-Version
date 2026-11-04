<template>
  <div class="page-root">
  <h1 class="header mb-3">{{ about.header }}</h1>
  <div class="container row m-auto text-center">
    <div class="col-sm-6">
      <h3 class="subheader">{{ about.title_1 }}</h3>
      <ul class="about-page-description">
        <li
          class="about-page-description"
          v-for="item in about.items_1"
          :key="item.id"
        >
          {{ item.value }}
        </li>
      </ul>
      <br />
      <h3 class="subheader">{{ about.title_2 }}</h3>
      <ul class="about-page-description">
        <li
          class="about-page-description"
          v-for="item in about.items_2"
          :key="item.id"
        >
          {{ item.value }}
        </li>
      </ul>
      <!-- Sosyal hesaplar: her ikon kendi marka renginde, uzerine
           gelindiginde o renk daireyi dolduruyor. Onceden hepsi tek bir
           maviydi (satir ici #1357bc), Bootstrap col-2 ile ekrana
           yayiliyordu ve baglantilarin erisilebilir adi yoktu. -->
      <h3 class="soc__head">{{ t.follow }}</h3>
      <ul class="soc">
        <li v-for="social of about?.socials" :key="social.link" class="soc__item">
          <a
            class="soc__link"
            :class="`soc__link--${social.name}`"
            :href="social.link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.name"
          >
            <i :class="social.icon" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="col-sm-6">
      <figure class="image is-16by9">
        <iframe
          class="has-ratio"
          src="https://www.youtube.com/embed/PqEfhqwvU_U?si=hhee2ExHZMgIkhLp"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="width: 100%; height: 450px"
        ></iframe>
      </figure>
    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/index";

const store = useStore();
const about = store.getAbout;

/* Ikon sirasinin ustundeki baslik. Oncesinde hicbir sey yoktu ve ikonlar
   madde listesinin altinda baglamsiz duruyordu. */
const FOLLOW: Record<string, string> = {
  en: "Follow us on our social media",
  fr: "Suivez-nous sur nos réseaux sociaux",
  es: "Síganos en nuestras redes sociales",
  ru: "Мы в социальных сетях",
  ar: "تابعنا على وسائل التواصل الاجتماعي",
};
const lang = String(store.getLang || "en");
const t = { follow: FOLLOW[lang] ?? FOLLOW.en };
</script>

<style scoped>
/* --- Sosyal hesaplar --- */
.soc__head {
  margin: clamp(2.5rem, 5vw, 3.5rem) 0 1rem;
  font-family: var(--mk-ff-display);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0;
  /* Sayfanin eski stilleri basliklari ortaliyor; burada ikon sirasiyla
     ayni hizada durmasi gerekiyor. */
  text-align: start;
  color: var(--mk-ink);
}

.soc {
  display: flex;
  flex-wrap: wrap;
  /* Ustundeki metin sola hizali; ortalanmis bir ikon sirasi oradan
     kopuk duruyordu. */
  justify-content: flex-start;
  gap: 0.625rem;
  /* Alttaki koyu footer'a yapismasin. */
  margin: 0 0 clamp(2.5rem, 5vw, 4rem);
  padding: 0;
  list-style: none;
}

.soc__item {
  list-style: none;
}

.soc__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  /* Zemin markanin kendi renginin cok acik tonu. Onceden krem
     (--mk-cream-2) kullaniliyordu; bu sayfanin zemini BEYAZ oldugu icin
     daireler camurlu bej lekeler gibi duruyordu. color-mix desteklenmeyen
     tarayicida saydam kaliyor, ikon yine kendi renginde okunuyor. */
  background: transparent;
  background: color-mix(in srgb, var(--brand) 12%, transparent);
  color: var(--brand);
  font-size: 1.375rem;
  line-height: 1;
  text-decoration: none;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

/* Uzerine gelindiginde marka rengi daireyi dolduruyor. */
.soc__link:hover,
.soc__link:focus-visible {
  background: var(--brand);
  color: #fff;
  transform: translateY(-2px);
}

.soc__link:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 3px;
}

/* Markalarin kendi renkleri. Instagram'inki tek renk degil; marka
   paletinin pembe-kirmizi orta tonu aliniyor. X'in siyahi krem zeminde
   cok sert durdugu icin bir tik yumusatildi. */
.soc__link--facebook {
  --brand: #1877f2;
}
.soc__link--twitter {
  --brand: #1c1917;
}
.soc__link--youtube {
  --brand: #ff0000;
}
.soc__link--instagram {
  --brand: #e4405f;
}
.soc__link--pinterest {
  --brand: #e60023;
}
.soc__link--linkedin {
  --brand: #0a66c2;
}

@media (prefers-reduced-motion: reduce) {
  .soc__link {
    transition: none;
  }

  .soc__link:hover,
  .soc__link:focus-visible {
    transform: none;
  }
}
</style>
