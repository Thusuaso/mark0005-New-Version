<template>
  <div
    class="social_float"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <!-- Kapaliyken visibility:hidden — tab sirasina girmesin. -->
    <ul
      class="social_float_list"
      :class="{ 'is-open': open }"
      :style="{ '--total': socials.length }"
    >
      <li
        v-for="(social, i) of socials"
        :key="social.link"
        :style="{ '--i': i, '--brand': brandColor(social.name) }"
      >
        <a
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.name || 'Social link'"
        >
          <i :class="social.icon" aria-hidden="true"></i>
        </a>
      </li>
    </ul>

    <button
      type="button"
      class="social_float_btn"
      :aria-label="t.label"
      :aria-expanded="open"
      @click="open = !open"
    >
      <!-- Ikon yerine sosyal medya logolarinin 2x2 kucuk onizlemesi;
           ilk dort sosyal hesap veriden geliyor. Renk CSS'ten (beyaz) —
           marka renkleri acilan listede. -->
      <span class="social_float_grid" aria-hidden="true">
        <i
          v-for="social of previewSocials"
          :key="social.link"
          :class="social.icon"
        ></i>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { label: string }> = {
  en: { label: "Follow us on social media" },
  fr: { label: "Suivez-nous sur les reseaux sociaux" },
  es: { label: "Siguenos en redes sociales" },
  ru: { label: "Мы в социальных сетях" },
  ar: { label: "تابعنا على وسائل التواصل الاجتماعي" },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? String(store.getLang) : "en") as Lang;
const t = texts[lang];

/* Sosyal linkler footer verisinden; WhatsApp zaten ayri float butonda. */
const socials = computed(() => {
  const list = (store.getFooter as any)?.about?.socials ?? [];
  return list.filter((s: any) => String(s?.name).toLowerCase() !== "whatsapp");
});

const BRANDS: Record<string, string> = {
  facebook: "#1877f2",
  twitter: "#000000",
  x: "#000000",
  youtube: "#ff0000",
  instagram: "#e4405f",
  pinterest: "#bd081c",
  linkedin: "#0a66c2",
  whatsapp: "#25d366",
  telegram: "#229ed9",
};

/* Butonun uzerindeki mini logo izgarasi: ilk dort hesap. */
const previewSocials = computed(() => socials.value.slice(0, 4));

const brandColor = (name?: string) =>
  BRANDS[String(name).toLowerCase()] ?? "#1357bc";

const open = ref(false);
</script>

<style scoped>
/* WhatsApp butonunun hemen ustunde duruyor: 20px taban + 58px buton + 12px
   bosluk. WhatsappFloat.vue'daki olculer degisirse burayi da guncelle. */
.social_float {
  position: fixed;
  right: calc(20px + env(safe-area-inset-right, 0px));
  bottom: calc(90px + env(safe-area-inset-bottom, 0px));
  z-index: 1040;
  display: flex;
  align-items: center;
}

/* WhatsApp butonuyla ayni olcu (58px) — ikisi dikey eksende hizali duruyor. */
.social_float_btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: linear-gradient(145deg, #3b86e8 0%, #1357bc 55%, #0c3f8f 100%);
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 10px 26px rgba(19, 87, 188, 0.4),
    0 2px 6px rgba(15, 23, 42, 0.18);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

/* Ust kenarda yumusak parlama — cam hissi. */
.social_float_btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    120% 80% at 30% 10%,
    rgba(255, 255, 255, 0.38),
    rgba(255, 255, 255, 0) 62%
  );
  pointer-events: none;
}

/* Mini logolar 2x2 — buton tek basina "sosyal medya" oldugunu anlatsin. */
.social_float_grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
  place-items: center;
  line-height: 1;
  color: #fff;
}

.social_float_grid i {
  font-size: 15px;
}

.social_float:hover .social_float_btn,
.social_float:focus-within .social_float_btn {
  transform: scale(1.06);
  box-shadow:
    0 14px 32px rgba(19, 87, 188, 0.5),
    0 2px 6px rgba(15, 23, 42, 0.18);
}

.social_float_btn:focus-visible {
  outline: 3px solid #0c3f8f;
  outline-offset: 3px;
}

/* Liste akista yer kaplamasin diye absolute — butonun soluna aciliyor. */
.social_float_list {
  position: absolute;
  right: calc(100% + 10px);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.social_float_list li {
  visibility: hidden;
  opacity: 0;
  transform: translateX(14px) scale(0.75);
  transition:
    opacity 0.22s ease,
    transform 0.22s ease,
    visibility 0.22s linear;
  /* Saga en yakin ikon ilk acilir: --i ters sirayla gecikir. */
  transition-delay: calc((var(--total, 6) - 1 - var(--i, 0)) * 35ms);
}

.social_float_list.is-open li {
  visibility: visible;
  opacity: 1;
  transform: translateX(0) scale(1);
  transition-delay: calc(var(--i, 0) * 45ms);
}

.social_float_list a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 50%;
  background: #fff;
  color: var(--brand, #1357bc);
  font-size: 19px;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.16);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.social_float_list a:hover {
  background: var(--brand, #1357bc);
  border-color: var(--brand, #1357bc);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.24);
}

.social_float_list a:focus-visible {
  outline: 3px solid var(--brand, #1357bc);
  outline-offset: 2px;
}

@media (max-width: 767.98px) {
  /* Mobilde WhatsApp butonu 52px ve taban 14px. */
  .social_float {
    right: calc(14px + env(safe-area-inset-right, 0px));
    bottom: calc(76px + env(safe-area-inset-bottom, 0px));
  }

  .social_float_btn {
    width: 52px;
    height: 52px;
  }

  .social_float_grid i {
    font-size: 13px;
  }

  .social_float_list {
    gap: 6px;
  }

  .social_float_list a {
    width: 36px;
    height: 36px;
    font-size: 17px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .social_float_btn,
  .social_float_list li,
  .social_float_list a {
    transition-duration: 0.01ms;
    transition-delay: 0ms;
  }

  .social_float:hover .social_float_btn,
  .social_float:focus-within .social_float_btn {
    transform: none;
  }

  .social_float_list a:hover {
    transform: none;
  }
}
</style>
