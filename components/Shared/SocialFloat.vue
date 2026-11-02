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
      :class="{ 'is-open': open }"
      :aria-label="t.label"
      :aria-expanded="open"
      @click="open = !open"
    >
      <!-- Eskiden ilk dort hesabin logosu 2x2 sikisiyordu: 58px icinde dort
           marka ikonu okunmuyor, kalabalik duruyordu. Yerine tek bir
           "paylas" isareti — ucu nokta, ikisi cizgiyle bagli. Acikken X'e
           donusuyor, yani dugme ayni zamanda kapatma dugmesi oldugunu
           soyluyor. -->
      <span class="social_float_mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="5" r="2.6" />
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="18" cy="19" r="2.6" />
          <path d="M8.3 10.8 15.7 6.4M8.3 13.2l7.4 4.4" />
        </svg>
      </span>

      <span class="social_float_close" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round">
          <path d="M7 7l10 10M17 7 7 17" />
        </svg>
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
  /* X/Twitter siyahi paletin koyusuyla ayni tutuluyor. */
  twitter: "#1c1917",
  x: "#1c1917",
  youtube: "#ff0000",
  instagram: "#e4405f",
  pinterest: "#bd081c",
  linkedin: "#0a66c2",
  whatsapp: "#25d366",
  telegram: "#229ed9",
};

/* Taninmayan bir hesap gelirse marka rengi yerine temanin vurgu tonu. */
const brandColor = (name?: string) =>
  BRANDS[String(name).toLowerCase()] ?? "#8a7355";

const open = ref(false);
</script>

<style scoped>
/* Gorunum temaya cekildi: eskiden marka mavisi gradyan (#3b86e8 -> #0c3f8f)
   bir dugme ve acilan listede her hesabin kendi marka rengi vardi; krem +
   grafit paletle catisiyordu.

   Simdi dugme koyu grafit (--mk-ink) uzerine krem ikonlar, acilan ikonlar da
   krem zemin + grafit ikon. Marka renkleri yalnizca hover'da beliriyor —
   hangi hesaba bakildigi anlasiliyor ama durgun halde palet bozulmuyor. */

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

/* WhatsApp butonuyla ayni olcu (58px) — ikisi dikey eksende hizali. */
.social_float_btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  padding: 0;
  border: 1px solid rgba(247, 243, 233, 0.18);
  border-radius: 50%;
  background: var(--mk-ink);
  /* overflow: hidden YOK: cevredeki nabiz halkasi (::before) dugmenin
     disina dogru buyuyor, kirpilmamasi gerekiyor. Ic katmanlar kendi
     border-radius'lariyla zaten daire icinde kaliyor. */
  cursor: pointer;
  box-shadow:
    0 10px 26px rgba(28, 25, 23, 0.32),
    0 2px 6px rgba(28, 25, 23, 0.18);
  transition:
    transform 0.2s ease,
    background-color 0.25s ease,
    box-shadow 0.2s ease;
}

/* Ust kenarda cok hafif parlama — cam hissi, ama krem tonunda. */
.social_float_btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    120% 80% at 30% 10%,
    rgba(247, 243, 233, 0.16),
    rgba(247, 243, 233, 0) 62%
  );
  pointer-events: none;
}

/* --- Isaret --- */
/* Iki katman ust uste: paylas isareti ve X. Acikken yerlerini degistiriyorlar
   (biri doner-kaybolur, digeri doner-gelir), yani dugme hem acma hem kapatma
   oldugunu kendisi anlatiyor. */
.social_float_mark,
.social_float_close {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--mk-cream);
  transition:
    opacity 0.28s var(--mk-ease),
    transform 0.4s var(--mk-ease);
}

.social_float_mark svg,
.social_float_close svg {
  width: 21px;
  height: 21px;
}

.social_float_close {
  opacity: 0;
  transform: rotate(-90deg) scale(0.7);
}

.social_float_btn.is-open .social_float_mark {
  opacity: 0;
  transform: rotate(90deg) scale(0.7);
}

.social_float_btn.is-open .social_float_close {
  opacity: 1;
  transform: rotate(0) scale(1);
}

/* Dugmenin cevresinde ince bir halka: durgun halde nabiz gibi atiyor,
   dikkat ceksin ama rahatsiz etmesin. Acikken duruyor. */
.social_float_btn::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  border: 1px solid var(--mk-accent);
  opacity: 0;
  animation: sf-ring 3.2s var(--mk-ease) infinite;
  pointer-events: none;
}

.social_float_btn.is-open::before,
.social_float:hover .social_float_btn::before {
  animation: none;
  opacity: 0;
}

@keyframes sf-ring {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  70%,
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

.social_float:hover .social_float_btn,
.social_float:focus-within .social_float_btn {
  transform: scale(1.06);
  /* Acikken vurgu tonuna donuyor: liste acildi geri bildirimi. */
  background: var(--mk-accent);
  box-shadow:
    0 14px 32px rgba(28, 25, 23, 0.38),
    0 2px 6px rgba(28, 25, 23, 0.18);
}

.social_float_btn:focus-visible {
  outline: 3px solid var(--mk-accent);
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
  border: 1px solid var(--mk-border);
  border-radius: 50%;
  background: var(--mk-cream);
  color: var(--mk-ink);
  font-size: 19px;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(28, 25, 23, 0.16);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

/* Marka rengi yalnizca hover'da: durgun halde palet tek ses. */
.social_float_list a:hover {
  background: var(--brand, var(--mk-accent));
  border-color: var(--brand, var(--mk-accent));
  color: var(--mk-cream);
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(28, 25, 23, 0.24);
}

.social_float_list a:focus-visible {
  outline: 3px solid var(--brand, var(--mk-accent));
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

  .social_float_mark svg,
  .social_float_close svg {
    width: 19px;
    height: 19px;
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
  .social_float_btn::before {
    animation: none;
    opacity: 0;
  }

  .social_float_mark,
  .social_float_close,
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
