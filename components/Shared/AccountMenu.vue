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
.am {
  position: relative;
  display: inline-flex;
}

.am_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
  color: #374151;
  font-size: 17px;
  cursor: pointer;
}

.am_btn:hover {
  border-color: #1e58c4;
  color: #1e58c4;
}

.am_btn--on {
  border-color: #1e58c4;
  background: rgba(30, 88, 196, 0.08);
  color: #1e58c4;
}

.am_pop {
  position: absolute;
  top: calc(100% + 0.5rem);
  inset-inline-end: 0;
  z-index: 60;
  width: min(20rem, calc(100vw - 2rem));
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
  text-align: start;
}

.am_title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

.am_text {
  margin: 0.35rem 0 0.75rem;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.45;
}

.am_input {
  width: 100%;
  padding: 0.55rem 0.7rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  /* Tarayici koyu modunda arka plan karariyordu; acik temaya sabitliyoruz. */
  color-scheme: light;
  background: #fff;
  color: #111827;
}

.am_input::placeholder {
  color: #9ca3af;
}

.am_input:focus {
  outline: none;
  border-color: #1e58c4;
  box-shadow: 0 0 0 3px rgba(30, 88, 196, 0.12);
}

.am_input--code {
  letter-spacing: 0.4em;
  text-align: center;
  font-weight: 700;
}

.am_submit {
  width: 100%;
  margin-top: 0.6rem;
  padding: 0.55rem 0.8rem;
  border: 0;
  border-radius: 10px;
  background: #1e58c4;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.am_submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.am_back {
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.3rem;
  border: 0;
  background: none;
  color: #6b7280;
  font-size: 12.5px;
  text-decoration: underline;
  cursor: pointer;
}

.am_err {
  margin: 0.5rem 0 0;
  color: #b42318;
  font-size: 12.5px;
  line-height: 1.4;
}

.am_who {
  margin: 0 0 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #e5e7eb;
}

.am_who_label {
  display: block;
  color: #6b7280;
  font-size: 12px;
}

.am_who_mail {
  display: block;
  color: #111827;
  font-size: 13.5px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}

.am_item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.4rem;
  border: 0;
  border-radius: 8px;
  background: none;
  color: #111827;
  font-size: 14px;
  text-align: start;
  text-decoration: none;
  cursor: pointer;
}

.am_item:hover {
  background: #f3f6fc;
  color: #1e58c4;
}

.am_item--muted {
  color: #6b7280;
}
</style>
