<template>
  <div class="auth_form">
    <!-- 1. adim: mail adresi -->
    <form v-if="step === 'email'" @submit.prevent="requestCode" novalidate>
      <label :for="`${uid}_email`" class="auth_label">{{ t.email_label }}</label>
      <div class="auth_field">
        <i class="bi-envelope" aria-hidden="true"></i>
        <input
          :id="`${uid}_email`"
          type="email"
          inputmode="email"
          class="auth_input"
          autocomplete="email"
          placeholder="name@company.com"
          dir="ltr"
          v-model="auth_email"
          :disabled="loading"
          required
        />
      </div>
      <button type="submit" class="auth_btn" :disabled="loading">
        <span
          v-if="loading"
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <i v-else class="bi-send" aria-hidden="true"></i>
        {{ t.send_code }}
      </button>
    </form>

    <!-- 2. adim: e-postaya gelen kod -->
    <form v-else @submit.prevent="verifyCode" novalidate>
      <div class="auth_sent">
        <i class="bi-check-circle-fill" aria-hidden="true"></i>
        <span>
          {{ t.code_sent }}
          <strong dir="ltr">{{ auth_email.trim() }}</strong>
        </span>
      </div>
      <label :for="`${uid}_code`" class="auth_label">{{ t.code_label }}</label>
      <input
        :id="`${uid}_code`"
        type="text"
        class="auth_input auth_code"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="6"
        placeholder="000000"
        dir="ltr"
        v-model="auth_code"
        @input="auth_code = auth_code.replace(/\D/g, '')"
        :disabled="loading"
        required
      />
      <button
        type="submit"
        class="auth_btn"
        :disabled="loading || auth_code.length !== 6"
      >
        <span
          v-if="loading"
          class="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <i v-else class="bi-unlock" aria-hidden="true"></i>
        {{ t.verify }}
      </button>
      <div class="auth_links">
        <button type="button" class="auth_link" @click="reset">
          <i class="bi-arrow-left" aria-hidden="true"></i>{{ t.change_email }}
        </button>
        <button
          type="button"
          class="auth_link"
          :disabled="loading || cooldown > 0"
          @click="requestCode"
        >
          {{ cooldown > 0 ? `${t.resend} (${cooldown})` : t.resend }}
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, useId, onBeforeUnmount } from "vue";
import { useStore } from "~/store/index";
const store = useStore();
defineProps({
  status: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["login_form_dialog_closed"]);
const uid = useId();

const messages = {
  en: {
    send_code: "Send Code",
    code_sent: "We sent a 6-digit code to",
    code_label: "Verification Code",
    verify: "Verify & See Prices",
    resend: "Resend code",
    email_label: "Email Address",
    change_email: "Change email",
    invalid_email: "Please enter a valid email address.",
    not_found: "This email address is not registered. Please contact us.",
    cooldown: "Please wait before requesting a new code.",
    mail_failed: "The email could not be sent. Please try again.",
    invalid: "The code is incorrect.",
    expired: "The code has expired. Please request a new one.",
    too_many: "Too many attempts. Please request a new code.",
    success: "Welcome! Prices are now visible.",
    error: "Something went wrong.",
  },
  fr: {
    send_code: "Envoyer le code",
    code_sent: "Nous avons envoyé un code à 6 chiffres à",
    code_label: "Code de vérification",
    verify: "Vérifier et voir les prix",
    resend: "Renvoyer le code",
    email_label: "Adresse e-mail",
    change_email: "Changer d'adresse",
    invalid_email: "Veuillez saisir une adresse e-mail valide.",
    not_found: "Cette adresse e-mail n'est pas enregistrée. Veuillez nous contacter.",
    cooldown: "Veuillez patienter avant de demander un nouveau code.",
    mail_failed: "L'e-mail n'a pas pu être envoyé. Veuillez réessayer.",
    invalid: "Le code est incorrect.",
    expired: "Le code a expiré. Veuillez en demander un nouveau.",
    too_many: "Trop de tentatives. Veuillez demander un nouveau code.",
    success: "Bienvenue ! Les prix sont maintenant visibles.",
    error: "Une erreur s'est produite.",
  },
  es: {
    send_code: "Enviar código",
    code_sent: "Hemos enviado un código de 6 dígitos a",
    code_label: "Código de verificación",
    verify: "Verificar y ver precios",
    resend: "Reenviar código",
    email_label: "Correo electrónico",
    change_email: "Cambiar correo",
    invalid_email: "Introduzca un correo electrónico válido.",
    not_found: "Este correo no está registrado. Por favor, contáctenos.",
    cooldown: "Espere antes de solicitar un nuevo código.",
    mail_failed: "No se pudo enviar el correo. Inténtelo de nuevo.",
    invalid: "El código es incorrecto.",
    expired: "El código ha caducado. Solicite uno nuevo.",
    too_many: "Demasiados intentos. Solicite un nuevo código.",
    success: "¡Bienvenido! Los precios ya están visibles.",
    error: "Algo salió mal.",
  },
  ru: {
    send_code: "Отправить код",
    code_sent: "Мы отправили 6-значный код на",
    code_label: "Код подтверждения",
    verify: "Подтвердить и увидеть цены",
    resend: "Отправить снова",
    email_label: "Электронная почта",
    change_email: "Изменить адрес",
    invalid_email: "Введите корректный адрес электронной почты.",
    not_found: "Этот адрес не зарегистрирован. Свяжитесь с нами.",
    cooldown: "Подождите перед повторным запросом кода.",
    mail_failed: "Не удалось отправить письмо. Попробуйте снова.",
    invalid: "Неверный код.",
    expired: "Срок действия кода истёк. Запросите новый.",
    too_many: "Слишком много попыток. Запросите новый код.",
    success: "Добро пожаловать! Цены теперь доступны.",
    error: "Что-то пошло не так.",
  },
  ar: {
    send_code: "إرسال الرمز",
    code_sent: "أرسلنا رمزاً مكوناً من 6 أرقام إلى",
    code_label: "رمز التحقق",
    verify: "تحقق واعرض الأسعار",
    resend: "إعادة إرسال الرمز",
    email_label: "البريد الإلكتروني",
    change_email: "تغيير البريد الإلكتروني",
    invalid_email: "يرجى إدخال بريد إلكتروني صالح.",
    not_found: "هذا البريد الإلكتروني غير مسجل. يرجى التواصل معنا.",
    cooldown: "يرجى الانتظار قبل طلب رمز جديد.",
    mail_failed: "تعذر إرسال البريد الإلكتروني. حاول مرة أخرى.",
    invalid: "الرمز غير صحيح.",
    expired: "انتهت صلاحية الرمز. يرجى طلب رمز جديد.",
    too_many: "محاولات كثيرة جداً. يرجى طلب رمز جديد.",
    success: "مرحباً! الأسعار ظاهرة الآن.",
    error: "حدث خطأ ما.",
  },
};
type Lang = keyof typeof messages;
const lang = (store.getLang in messages ? store.getLang : "en") as Lang;
const t = messages[lang];

const step = ref<"email" | "code">("email");
const auth_email = ref("");
const auth_code = ref("");
const loading = ref(false);
const cooldown = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

function startCooldown(seconds: number) {
  cooldown.value = seconds;
  clearInterval(timer);
  timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) clearInterval(timer);
  }, 1000);
}
onBeforeUnmount(() => clearInterval(timer));

function toastError(key?: string) {
  const { $toast } = useNuxtApp();
  $toast.error((key && (t as Record<string, string>)[key]) || t.error);
}

async function requestCode() {
  if (!auth_email.value.trim()) return;
  loading.value = true;
  try {
    const res = await $fetch<{
      ok: boolean;
      error?: string;
      retryAfter?: number;
    }>("/api/auth/request-code", {
      method: "POST",
      body: { email: auth_email.value.trim(), lang },
    });
    if (res.ok) {
      auth_code.value = "";
      step.value = "code";
      startCooldown(60);
    } else {
      if (res.error === "cooldown" && res.retryAfter) {
        startCooldown(res.retryAfter);
        // Kod zaten gonderilmis; musteri kod adimina gecebilsin
        if (step.value === "email") step.value = "code";
      }
      toastError(res.error);
    }
  } catch {
    toastError();
  } finally {
    loading.value = false;
  }
}

async function verifyCode() {
  loading.value = true;
  try {
    const res = await $fetch<{ ok: boolean; error?: string }>(
      "/api/auth/verify-code",
      {
        method: "POST",
        body: { email: auth_email.value.trim(), code: auth_code.value },
      },
    );
    if (res.ok) {
      const { $toast } = useNuxtApp();
      $toast.success(t.success);
      // Cerez sunucuda yazildi; istemci tarafindaki useCookie ile de esitle
      useCookie("user", {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      }).value = auth_email.value.trim().toLowerCase();
      store.setAuthStatus(ref(true));
      emit("login_form_dialog_closed");
      reset();
    } else {
      if (res.error === "expired" || res.error === "too_many") {
        auth_code.value = "";
      }
      toastError(res.error);
    }
  } catch {
    toastError();
  } finally {
    loading.value = false;
  }
}

function reset() {
  step.value = "email";
  auth_code.value = "";
}
</script>
<style scoped>
.auth_form {
  text-align: start;
}

.auth_label {
  display: block;
  margin-bottom: 0.375rem;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
}

.auth_field {
  position: relative;
}

.auth_field i {
  position: absolute;
  top: 50%;
  inset-inline-start: 0.875rem;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.auth_input {
  display: block;
  width: 100%;
  height: 48px;
  padding: 0 0.875rem;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  background: #fff;
  color: #212529;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.auth_field .auth_input {
  padding-inline-start: 2.5rem;
}

.auth_input::placeholder {
  color: #b6bcc4;
}

.auth_input:focus {
  outline: 0;
  border-color: #1e58c4;
  box-shadow: 0 0 0 4px rgba(30, 88, 196, 0.12);
}

.auth_input:disabled {
  background: #f7f8fa;
}

.auth_code {
  height: 56px;
  text-align: center;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.45em;
  padding-inline-start: 1.3rem;
}

.auth_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 48px;
  margin-top: 0.875rem;
  border: 0;
  border-radius: 10px;
  background: #1e58c4;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.auth_btn:hover:not(:disabled) {
  background: #17479f;
}

.auth_btn:active:not(:disabled) {
  transform: translateY(1px);
}

.auth_btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.auth_sent {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.625rem 0.75rem;
  border-radius: 10px;
  background: #ecfdf3;
  color: #166534;
  font-size: 13px;
  line-height: 1.45;
  word-break: break-word;
}

.auth_sent i {
  margin-top: 1px;
}

.auth_links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.auth_link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0;
  border: 0;
  background: none;
  color: #1e58c4;
  font-size: 13px;
}

.auth_link:hover:not(:disabled) {
  text-decoration: underline;
}

.auth_link:disabled {
  color: #9ca3af;
}

[dir="rtl"] .auth_link i {
  transform: scaleX(-1);
}
</style>
