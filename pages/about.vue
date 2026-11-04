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
      <br />
      <!-- Sosyal hesaplar: her ikon kendi marka renginde, uzerine
           gelindiginde o renk daireyi dolduruyor. Onceden hepsi tek bir
           maviydi (satir ici #1357bc), Bootstrap col-2 ile ekrana
           yayiliyordu ve baglantilarin erisilebilir adi yoktu. -->
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
</script>

<style scoped>
/* --- Sosyal hesaplar --- */
.soc {
  display: flex;
  flex-wrap: wrap;
  /* Ustundeki metin sola hizali; ortalanmis bir ikon siraasi oradan
     kopuk duruyordu. */
  justify-content: flex-start;
  gap: 0.75rem;
  margin: 0;
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
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  /* Dinlenirken: zemin notr, ikon markanin kendi renginde. */
  background: var(--mk-cream-2, #efeadc);
  color: var(--brand);
  font-size: 1.25rem;
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
