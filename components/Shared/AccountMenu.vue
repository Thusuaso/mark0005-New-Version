<template>
  <div ref="root" class="am" :dir="isRtl ? 'rtl' : 'ltr'">
    <button
      type="button"
      class="am_btn"
      :class="{ 'am_btn--on': authed }"
      :aria-label="t.account"
      :aria-expanded="open"
      @click="toggle"
    >
      <i
        :class="authed ? 'bi-person-check-fill' : 'bi-person'"
        aria-hidden="true"
      ></i>
    </button>

    <div v-if="open" class="am_pop">
      <!-- Giris yapilmis: panel baglantilari -->
      <template v-if="authed">
        <p class="am_who">
          <span class="am_who_label">{{ t.signed_in }}</span>
          <span class="am_who_mail" dir="ltr">{{ email }}</span>
        </p>
        <NuxtLink :to="panelLink" class="am_item" @click="open = false">
          <i class="bi-speedometer2" aria-hidden="true"></i>{{ t.panel }}
        </NuxtLink>
        <NuxtLink :to="ordersLink" class="am_item" @click="open = false">
          <i class="bi-box-seam" aria-hidden="true"></i>{{ t.orders }}
        </NuxtLink>
        <button type="button" class="am_item am_item--muted" @click="logout">
          <i class="bi-box-arrow-right" aria-hidden="true"></i>{{ t.logout }}
        </button>
      </template>

      <!-- Giris formu -->
      <form v-else class="am_form" @submit.prevent="submit">
        <h3 class="am_title">
          {{ step === "email" ? t.title : t.code_title }}
        </h3>
        <p class="am_text">
          {{ step === "email" ? t.text : t.code_text }}
        </p>

        <template v-if="step === 'email'">
          <input
            v-model="email"
            type="email"
            class="am_input"
            :placeholder="t.email_ph"
            autocomplete="email"
            dir="ltr"
            required
          />
        </template>
        <template v-else>
          <input
            v-model="code"
            type="text"
            class="am_input am_input--code"
            :placeholder="t.code_ph"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            dir="ltr"
            required
          />
        </template>

        <p v-if="error" class="am_err">{{ error }}</p>

        <button type="submit" class="am_submit" :disabled="busy">
          {{ busy ? t.wait : step === "email" ? t.send : t.verify }}
        </button>

        <button
          v-if="step === 'code'"
          type="button"
          class="am_back"
          @click="backToEmail"
        >
          {{ t.change_email }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<
  Lang,
  {
    account: string;
    title: string;
    text: string;
    email_ph: string;
    send: string;
    code_title: string;
    code_text: string;
    code_ph: string;
    verify: string;
    change_email: string;
    wait: string;
    signed_in: string;
    panel: string;
    orders: string;
    logout: string;
    err_email: string;
    err_not_found: string;
    err_code: string;
    err_expired: string;
    err_many: string;
    err_mail: string;
    err_general: string;
    err_cooldown: (s: number) => string;
  }
> = {
  en: {
    account: "My account",
    title: "Customer sign in",
    text: "Enter your e-mail address and we will send you a 6-digit code.",
    email_ph: "you@company.com",
    send: "Send code",
    code_title: "Enter the code",
    code_text: "We sent a 6-digit code to your e-mail address.",
    code_ph: "000000",
    verify: "Sign in",
    change_email: "Use a different e-mail",
    wait: "Please wait…",
    signed_in: "Signed in as",
    panel: "My panel",
    orders: "Order history",
    logout: "Sign out",
    err_email: "Please enter a valid e-mail address.",
    err_not_found: "This e-mail address is not registered as a customer.",
    err_code: "The code is incorrect.",
    err_expired: "The code has expired. Please request a new one.",
    err_many: "Too many attempts. Please request a new code.",
    err_mail: "We could not send the e-mail. Please try again.",
    err_general: "Something went wrong. Please try again.",
    err_cooldown: (s) => `Please wait ${s} seconds before requesting again.`,
  },
  fr: {
    account: "Mon compte",
    title: "Connexion client",
    text: "Saisissez votre adresse e-mail, nous vous enverrons un code à 6 chiffres.",
    email_ph: "vous@societe.com",
    send: "Envoyer le code",
    code_title: "Saisissez le code",
    code_text: "Nous avons envoyé un code à 6 chiffres à votre adresse e-mail.",
    code_ph: "000000",
    verify: "Se connecter",
    change_email: "Utiliser une autre adresse",
    wait: "Veuillez patienter…",
    signed_in: "Connecté en tant que",
    panel: "Mon espace",
    orders: "Historique des commandes",
    logout: "Se déconnecter",
    err_email: "Veuillez saisir une adresse e-mail valide.",
    err_not_found: "Cette adresse e-mail n'est pas enregistrée comme client.",
    err_code: "Le code est incorrect.",
    err_expired: "Le code a expiré. Veuillez en demander un nouveau.",
    err_many: "Trop de tentatives. Veuillez demander un nouveau code.",
    err_mail: "Impossible d'envoyer l'e-mail. Veuillez réessayer.",
    err_general: "Une erreur est survenue. Veuillez réessayer.",
    err_cooldown: (s) => `Veuillez attendre ${s} secondes avant de redemander.`,
  },
  es: {
    account: "Mi cuenta",
    title: "Acceso de clientes",
    text: "Introduzca su correo y le enviaremos un código de 6 dígitos.",
    email_ph: "usted@empresa.com",
    send: "Enviar código",
    code_title: "Introduzca el código",
    code_text: "Enviamos un código de 6 dígitos a su correo.",
    code_ph: "000000",
    verify: "Iniciar sesión",
    change_email: "Usar otro correo",
    wait: "Espere…",
    signed_in: "Sesión iniciada como",
    panel: "Mi panel",
    orders: "Historial de pedidos",
    logout: "Cerrar sesión",
    err_email: "Introduzca un correo electrónico válido.",
    err_not_found: "Este correo no está registrado como cliente.",
    err_code: "El código es incorrecto.",
    err_expired: "El código ha caducado. Solicite uno nuevo.",
    err_many: "Demasiados intentos. Solicite un código nuevo.",
    err_mail: "No pudimos enviar el correo. Inténtelo de nuevo.",
    err_general: "Algo salió mal. Inténtelo de nuevo.",
    err_cooldown: (s) => `Espere ${s} segundos antes de volver a solicitarlo.`,
  },
  ru: {
    account: "Мой аккаунт",
    title: "Вход для клиентов",
    text: "Введитеe-mail, и мы отправим вам 6-значный код.",
    email_ph: "vy@company.com",
    send: "Отправить код",
    code_title: "Введите код",
    code_text: "Мы отправили 6-значный код на вашу почту.",
    code_ph: "000000",
    verify: "Войти",
    change_email: "Другой адрес",
    wait: "Подождите…",
    signed_in: "Вы вошли как",
    panel: "Мой кабинет",
    orders: "История заказов",
    logout: "Выйти",
    err_email: "Введите корректный адрес e-mail.",
    err_not_found: "Этот адрес не зарегистрирован как клиент.",
    err_code: "Неверный код.",
    err_expired: "Код истёк. Запросите новый.",
    err_many: "Слишком много попыток. Запросите новый код.",
    err_mail: "Не удалось отправить письмо. Попробуйте снова.",
    err_general: "Что-то пошло не так. Попробуйте снова.",
    err_cooldown: (s) => `Подождите ${s} секунд перед повторным запросом.`,
  },
  ar: {
    account: "حسابي",
    title: "تسجيل دخول العملاء",
    text: "أدخل بريدك الإلكتروني وسنرسل لك رمزًا من 6 أرقام.",
    email_ph: "you@company.com",
    send: "إرسال الرمز",
    code_title: "أدخل الرمز",
    code_text: "أرسلنا رمزًا من 6 أرقام إلى بريدك الإلكتروني.",
    code_ph: "000000",
    verify: "تسجيل الدخول",
    change_email: "استخدام بريد آخر",
    wait: "يرجى الانتظار…",
    signed_in: "تم تسجيل الدخول بـ",
    panel: "لوحتي",
    orders: "سجل الطلبات",
    logout: "تسجيل الخروج",
    err_email: "يرجى إدخال بريد إلكتروني صحيح.",
    err_not_found: "هذا البريد غير مسجل كعميل.",
    err_code: "الرمز غير صحيح.",
    err_expired: "انتهت صلاحية الرمز. يرجى طلب رمز جديد.",
    err_many: "محاولات كثيرة. يرجى طلب رمز جديد.",
    err_mail: "لم نتمكن من إرسال البريد. حاول مرة أخرى.",
    err_general: "حدث خطأ ما. حاول مرة أخرى.",
    err_cooldown: (s) => `يرجى الانتظار ${s} ثانية قبل الطلب مرة أخرى.`,
  },
};

const store = useStore();
const lang = computed(
  () => (store.getLang in texts ? store.getLang : "en") as Lang,
);
const t = computed(() => texts[lang.value]);
const isRtl = computed(() => lang.value === "ar");
const prefix = computed(() => (lang.value === "en" ? "" : `/${lang.value}`));
const panelLink = computed(() => `${prefix.value}/account`);
const ordersLink = computed(() => `${prefix.value}/account/orders`);

/* Okunabilir "user" cerezi yalnizca arayuz durumu icin; sunucu ona guvenmiyor
   (yetki her zaman imzali mk_session cerezinden geliyor). */
const userCookie = useCookie<string | null>("user", { path: "/" });

const open = ref(false);
const step = ref<"email" | "code">("email");
const email = ref(userCookie.value ?? "");
const code = ref("");
const busy = ref(false);
const error = ref("");
const root = ref<HTMLElement | null>(null);

const authed = computed(() => Boolean(userCookie.value));

function toggle() {
  open.value = !open.value;
  if (open.value) {
    error.value = "";
    if (!authed.value) {
      step.value = "email";
      code.value = "";
    }
  }
}

function backToEmail() {
  step.value = "email";
  code.value = "";
  error.value = "";
}

function message(err: string | undefined, retryAfter?: number) {
  const x = t.value;
  switch (err) {
    case "invalid_email":
      return x.err_email;
    case "not_found":
      return x.err_not_found;
    case "invalid":
      return x.err_code;
    case "expired":
      return x.err_expired;
    case "too_many":
      return x.err_many;
    case "mail_failed":
      return x.err_mail;
    case "cooldown":
      return x.err_cooldown(retryAfter ?? 60);
    default:
      return x.err_general;
  }
}

async function submit() {
  busy.value = true;
  error.value = "";
  try {
    if (step.value === "email") {
      const res = await $fetch<{
        ok: boolean;
        error?: string;
        retryAfter?: number;
      }>("/api/auth/request-code", {
        method: "POST",
        body: { email: email.value.trim(), lang: lang.value },
      });
      if (res.ok) step.value = "code";
      else error.value = message(res.error, res.retryAfter);
    } else {
      const res = await $fetch<{ ok: boolean; error?: string }>(
        "/api/auth/verify-code",
        {
          method: "POST",
          body: { email: email.value.trim(), code: code.value.trim() },
        },
      );
      if (res.ok) {
        /* Sunucu cerezleri yazdi; useCookie onbellegini de esitle ki
           arayuz yenilemeye gerek kalmadan giris yapilmis gorunsun. */
        userCookie.value = email.value.trim().toLowerCase();
        store.setAuthStatus(ref(true));
        open.value = false;
        code.value = "";
        await navigateTo(panelLink.value);
      } else {
        if (res.error === "expired" || res.error === "too_many")
          code.value = "";
        error.value = message(res.error);
      }
    }
  } catch {
    error.value = t.value.err_general;
  } finally {
    busy.value = false;
  }
}

async function logout() {
  try {
    await $fetch("/api/auth/logout", { method: "POST" });
  } catch {
    /* cerezler yine de temizlenecek */
  }
  userCookie.value = null;
  store.setAuthStatus(ref(false));
  open.value = false;
  step.value = "email";
  email.value = "";
  await navigateTo(prefix.value || "/");
}

/* Disari tiklayinca / Esc ile kapat */
function onDocClick(e: MouseEvent) {
  if (!open.value) return;
  if (root.value && !root.value.contains(e.target as Node)) open.value = false;
}
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") open.value = false;
}

onMounted(() => {
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
  document.removeEventListener("keydown", onKey);
});
</script>

<style scoped>
/* Gorunum yeni tasarimin mono diline cevrildi: eskiden marka mavisi
   (#1e58c4) ve yuvarlak (10-14px) kartlar vardi, temanin siyah/beyaz
   paletiyle catisiyordu. Mantik degismedi.

   Dugmenin rengi `currentColor`'dan geliyor: Navbar seffaf modda kendi
   :deep() kuraliyla beyaza cevirince bu ikon da kendiliginden beyaza
   donuyor. Panel ise her zaman acik zeminde durdugu icin sabit renkli. */

.am {
  position: relative;
  display: inline-flex;
}

/* --- Tetikleyici ikon --- */
.am_btn {
  /* Giris durumu noktasi (.am_btn--on::after) buna gore konumlaniyor. */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  padding: 0;
  font-size: 1.0625rem;
  color: inherit;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 50%;
  cursor: pointer;
  /* Cerceve metinle ayni renkte oldugu icin tam opak agir duruyor. */
  opacity: 0.65;
  transition: opacity 0.25s ease;
}

.am_btn:hover,
.am_btn:focus-visible {
  opacity: 1;
}

.am_btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Giris yapilmisken dolu daire: durum bir renkle degil kontrastla
   anlatiliyor, boylece seffaf/beyaz iki modda da okunuyor. */
.am_btn--on {
  opacity: 1;
}

.am_btn--on::after {
  content: "";
  position: absolute;
  inset-inline-end: 0;
  bottom: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--mk-accent);
  box-shadow: 0 0 0 2px var(--mk-cream);
}

/* --- Panel --- */
.am_pop {
  position: absolute;
  top: calc(100% + 0.5rem);
  inset-inline-end: 0;
  z-index: 60;
  width: min(20rem, calc(100vw - 2rem));
  padding: 1.25rem;
  font-family: var(--mk-ff-body);
  color: var(--mk-body);
  background: var(--mk-cream);
  border: 1px solid rgba(48, 48, 47, 0.1);
  border-radius: var(--mk-radius);
  box-shadow:
    0 1px 2px 1px rgba(3, 11, 30, 0.06),
    0 10px 30px rgba(3, 11, 30, 0.12);
  text-align: start;
}

.am_title {
  margin: 0;
  font-family: var(--mk-ff-display);
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--mk-ink);
}

.am_text {
  margin: 0.4rem 0 0.9rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--mk-body);
}

/* --- Form --- */
.am_input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--mk-ink);
  background: var(--mk-cream);
  border: 1px solid var(--mk-border);
  border-radius: var(--mk-radius);
  /* Tarayici koyu modunda arka plan karariyordu; acik temaya sabitliyoruz. */
  color-scheme: light;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.am_input::placeholder {
  color: var(--mk-grey-2);
  opacity: 0.6;
}

.am_input:focus {
  outline: none;
  border-color: var(--mk-ink);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
}

.am_input--code {
  letter-spacing: 0.4em;
  text-align: center;
  font-weight: 700;
}

.am_submit {
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.65rem 0.9rem;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mk-cream);
  background: var(--mk-ink);
  border: 1px solid var(--mk-ink);
  border-radius: var(--mk-radius-pill);
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.am_submit:hover:not(:disabled) {
  color: var(--mk-ink);
  background: var(--mk-cream);
}

.am_submit:disabled {
  opacity: 0.45;
  cursor: default;
}

.am_back {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.35rem;
  font-family: inherit;
  font-size: 0.75rem;
  color: var(--mk-grey-2);
  background: none;
  border: 0;
  text-decoration: underline;
  cursor: pointer;
}

.am_back:hover {
  color: var(--mk-ink);
}

.am_err {
  margin: 0.6rem 0 0;
  font-size: 0.78125rem;
  line-height: 1.45;
  /* Hata tek renkli paletten sapiyor: kirmizi olmasa fark edilmez. */
  color: #b42318;
}

/* --- Giris yapilmis durum --- */
.am_who {
  margin: 0 0 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--mk-border);
}

.am_who_label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mk-grey-2);
}

.am_who_mail {
  display: block;
  margin-top: 0.125rem;
  font-size: 0.84375rem;
  font-weight: 600;
  color: var(--mk-ink);
  overflow: hidden;
  text-overflow: ellipsis;
}

.am_item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.55rem 0.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--mk-ink);
  background: none;
  border: 0;
  border-radius: var(--mk-radius);
  text-align: start;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.am_item:hover {
  background: var(--mk-cream-2);
}

.am_item--muted {
  color: var(--mk-grey-2);
}

@media (prefers-reduced-motion: reduce) {
  .am_btn,
  .am_input,
  .am_submit,
  .am_item {
    transition: none;
  }
}
</style>
