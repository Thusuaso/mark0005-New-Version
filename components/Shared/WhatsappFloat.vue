<template>
  <a
    :href="`https://wa.me/${PHONE}?text=${encodeURIComponent(t.message)}`"
    target="_blank"
    rel="noopener"
    class="wa_float"
    :aria-label="t.label"
  >
    <span class="wa_float_tip" :dir="isRtl ? 'rtl' : 'ltr'">{{ t.label }}</span>
    <span class="wa_float_btn">
      <i class="bi-whatsapp" aria-hidden="true"></i>
    </span>
  </a>
</template>

<script setup lang="ts">
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

/* Ozlem — satis */
const PHONE = "905426608085";

const texts: Record<Lang, { label: string; message: string }> = {
  en: { label: "Chat with us on WhatsApp", message: "Hello Mekmar, I would like to get information about your products." },
  fr: { label: "Discutez avec nous sur WhatsApp", message: "Bonjour Mekmar, je souhaite obtenir des informations sur vos produits." },
  es: { label: "Hable con nosotros por WhatsApp", message: "Hola Mekmar, me gustaría obtener información sobre sus productos." },
  ru: { label: "Напишите нам в WhatsApp", message: "Здравствуйте, Mekmar! Хотел(а) бы получить информацию о вашей продукции." },
  ar: { label: "تواصل معنا عبر واتساب", message: "مرحباً ميكمار، أود الحصول على معلومات حول منتجاتكم." },
};

const store = useStore();
const lang = (String(store.getLang) in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";
</script>

<style scoped>
.wa_float {
  position: fixed;
  right: calc(20px + env(safe-area-inset-right, 0px));
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  z-index: 1040;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.wa_float_btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  font-size: 1.85rem;
  box-shadow: 0 10px 26px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Dikkat ceken yumusak dalga */
.wa_float_btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25d366;
  opacity: 0.5;
  z-index: -1;
  animation: wa_pulse 2.4s ease-out infinite;
}

.wa_float:hover .wa_float_btn {
  transform: scale(1.07);
  box-shadow: 0 14px 32px rgba(37, 211, 102, 0.55), 0 2px 6px rgba(0, 0, 0, 0.15);
}

.wa_float_tip {
  padding: 0.5rem 0.85rem;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.14);
  opacity: 0;
  transform: translateX(8px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.wa_float:hover .wa_float_tip,
.wa_float:focus-visible .wa_float_tip {
  opacity: 1;
  transform: translateX(0);
}

.wa_float:focus-visible .wa_float_btn {
  outline: 3px solid #1e58c4;
  outline-offset: 3px;
}

@keyframes wa_pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  70%,
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

@media (max-width: 767.98px) {
  .wa_float {
    right: calc(14px + env(safe-area-inset-right, 0px));
    bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  }

  .wa_float_btn {
    width: 52px;
    height: 52px;
    font-size: 1.6rem;
  }

  .wa_float_tip {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wa_float_btn::before {
    animation: none;
  }
}
</style>
