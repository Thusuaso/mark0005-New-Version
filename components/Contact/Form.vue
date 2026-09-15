<template>
  <form class="cf" @submit.prevent="sendMail" novalidate>
    <div class="cf_row">
      <div class="cf_group">
        <label :for="`${uid}_name`" class="cf_label">{{ form.name }}</label>
        <div class="cf_field">
          <i class="bi-person" aria-hidden="true"></i>
          <input
            :id="`${uid}_name`"
            type="text"
            class="cf_input"
            :class="{ 'cf_input--invalid': showError('name') }"
            autocomplete="name"
            v-model="model.name"
            @blur="touched.name = true"
          />
        </div>
        <p v-if="showError('name')" class="cf_error">{{ form.field_1 }}</p>
      </div>

      <div class="cf_group">
        <label :for="`${uid}_email`" class="cf_label">{{ form.email }}</label>
        <div class="cf_field">
          <i class="bi-envelope" aria-hidden="true"></i>
          <input
            :id="`${uid}_email`"
            type="email"
            inputmode="email"
            class="cf_input"
            :class="{ 'cf_input--invalid': showError('email') }"
            autocomplete="email"
            dir="ltr"
            v-model="model.email"
            @input="mailControl(model.email)"
            @blur="touched.email = true"
            @paste.prevent="onPaste"
          />
        </div>
        <p v-if="showError('email')" class="cf_error">{{ form.field_2 }}</p>
      </div>
    </div>

    <div class="cf_group">
      <label class="cf_label">{{ form.phone }}</label>
      <MazPhoneNumberInput
        class="cf_phone"
        dir="ltr"
        block
        orientation="row"
        v-model="phoneNumber"
        v-model:country-code="countryCode"
        show-code-on-list
        :preferred-countries="['FR', 'BE', 'DE', 'US', 'GB']"
        :ignored-countries="['AC']"
        @update="inputPhoneNumber($event)"
        :translations="translation"
        color="primary"
        :countrySelectorDisplayName="false"
      >
        <template #country-list-flag="{ countryCode }">
          <MazBadge size="0.8rem" style="margin-inline-end: 10px; width: 26px">
            {{ countryCode }}
          </MazBadge>
        </template>
      </MazPhoneNumberInput>
    </div>

    <div class="cf_group">
      <label :for="`${uid}_message`" class="cf_label">{{ form.message }}</label>
      <textarea
        :id="`${uid}_message`"
        class="cf_input cf_textarea"
        :class="{ 'cf_input--invalid': showError('description') }"
        rows="5"
        v-model="model.description"
        @blur="touched.description = true"
      ></textarea>
    </div>

    <button type="submit" class="cf_btn" :disabled="sending">
      <span
        v-if="sending"
        class="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <i v-else class="bi-send" aria-hidden="true"></i>
      {{ form.send }}
    </button>
  </form>
</template>
<script lang="ts" setup>
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import "maz-ui/styles";
import { ref, reactive, useId } from "vue";
import { useStore } from "~/store/index";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  /* Urun detayindaki "Get Price" modalindan geliyorsa: { name, code, size, unit } */
  product: {
    type: Object,
    default: null,
  },
});
const { form } = props;
const uid = useId();
const { $toast } = useNuxtApp();
const store = useStore();

/* Bildirim metinleri */
const toast_texts = {
  en: {
    missing_title: "Please complete the form",
    missing_text: (fields: string) => `The following fields are missing or invalid: ${fields}.`,
    success_title: "Your message has been sent",
    success_text: (name: string) =>
      `Thank you${name ? `, ${name}` : ""}! Our sales team will get back to you by email as soon as possible.`,
    success_product: (name: string, product: string) =>
      `Thank you${name ? `, ${name}` : ""}! We received your price request for ${product}. Our sales team will send you a quote by email shortly.`,
    error_title: "Your message could not be sent",
    error_text:
      'Please try again in a moment, or email us directly at <a href="mailto:export@mekmar.com">export@mekmar.com</a>.',
    blocked_title: "This email address can't be used",
    blocked_text: "Please enter your own email address so we can reply to you.",
    paste_title: "Please type your email address",
    paste_text: "Pasting is disabled in this field to make sure your address is entered correctly.",
  },
  fr: {
    missing_title: "Veuillez compléter le formulaire",
    missing_text: (fields: string) => `Les champs suivants sont manquants ou invalides : ${fields}.`,
    success_title: "Votre message a été envoyé",
    success_text: (name: string) =>
      `Merci${name ? `, ${name}` : ""} ! Notre équipe commerciale vous répondra par e-mail dans les plus brefs délais.`,
    success_product: (name: string, product: string) =>
      `Merci${name ? `, ${name}` : ""} ! Nous avons bien reçu votre demande de prix pour ${product}. Notre équipe commerciale vous enverra un devis par e-mail très bientôt.`,
    error_title: "Votre message n'a pas pu être envoyé",
    error_text:
      'Veuillez réessayer dans un instant ou écrivez-nous directement à <a href="mailto:export@mekmar.com">export@mekmar.com</a>.',
    blocked_title: "Cette adresse e-mail ne peut pas être utilisée",
    blocked_text: "Veuillez saisir votre propre adresse e-mail afin que nous puissions vous répondre.",
    paste_title: "Veuillez saisir votre adresse e-mail",
    paste_text: "Le collage est désactivé dans ce champ pour garantir une adresse correcte.",
  },
  es: {
    missing_title: "Complete el formulario",
    missing_text: (fields: string) => `Los siguientes campos faltan o no son válidos: ${fields}.`,
    success_title: "Su mensaje ha sido enviado",
    success_text: (name: string) =>
      `¡Gracias${name ? `, ${name}` : ""}! Nuestro equipo de ventas le responderá por correo lo antes posible.`,
    success_product: (name: string, product: string) =>
      `¡Gracias${name ? `, ${name}` : ""}! Hemos recibido su solicitud de precio para ${product}. Nuestro equipo de ventas le enviará un presupuesto por correo en breve.`,
    error_title: "No se pudo enviar su mensaje",
    error_text:
      'Inténtelo de nuevo en unos momentos o escríbanos directamente a <a href="mailto:export@mekmar.com">export@mekmar.com</a>.',
    blocked_title: "No se puede usar esta dirección de correo",
    blocked_text: "Introduzca su propia dirección de correo para que podamos responderle.",
    paste_title: "Escriba su dirección de correo",
    paste_text: "Pegar está desactivado en este campo para asegurar que la dirección sea correcta.",
  },
  ru: {
    missing_title: "Пожалуйста, заполните форму",
    missing_text: (fields: string) => `Не заполнены или заполнены неверно: ${fields}.`,
    success_title: "Ваше сообщение отправлено",
    success_text: (name: string) =>
      `Спасибо${name ? `, ${name}` : ""}! Наш отдел продаж ответит вам по электронной почте в ближайшее время.`,
    success_product: (name: string, product: string) =>
      `Спасибо${name ? `, ${name}` : ""}! Мы получили ваш запрос цены на ${product}. Наш отдел продаж скоро пришлёт вам предложение по электронной почте.`,
    error_title: "Не удалось отправить сообщение",
    error_text:
      'Попробуйте ещё раз чуть позже или напишите нам напрямую: <a href="mailto:export@mekmar.com">export@mekmar.com</a>.',
    blocked_title: "Этот адрес нельзя использовать",
    blocked_text: "Пожалуйста, укажите свой адрес электронной почты, чтобы мы могли вам ответить.",
    paste_title: "Введите адрес электронной почты вручную",
    paste_text: "Вставка в это поле отключена, чтобы адрес был указан правильно.",
  },
  ar: {
    missing_title: "يرجى إكمال النموذج",
    missing_text: (fields: string) => `الحقول التالية فارغة أو غير صحيحة: ${fields}.`,
    success_title: "تم إرسال رسالتك",
    success_text: (name: string) =>
      `شكراً${name ? ` ${name}` : ""}! سيتواصل معك فريق المبيعات عبر البريد الإلكتروني في أقرب وقت.`,
    success_product: (name: string, product: string) =>
      `شكراً${name ? ` ${name}` : ""}! استلمنا طلب السعر الخاص بـ ${product}. سيرسل لك فريق المبيعات عرض السعر عبر البريد الإلكتروني قريباً.`,
    error_title: "تعذّر إرسال رسالتك",
    error_text:
      'يرجى المحاولة مرة أخرى بعد قليل، أو راسلنا مباشرة على <a href="mailto:export@mekmar.com">export@mekmar.com</a>.',
    blocked_title: "لا يمكن استخدام هذا البريد الإلكتروني",
    blocked_text: "يرجى إدخال بريدك الإلكتروني الخاص حتى نتمكن من الرد عليك.",
    paste_title: "يرجى كتابة بريدك الإلكتروني",
    paste_text: "تم تعطيل اللصق في هذا الحقل لضمان إدخال العنوان بشكل صحيح.",
  },
};
const lang = store.getLang as string;
const tt = toast_texts[(lang in toast_texts ? lang : "en") as keyof typeof toast_texts];

/* Kullanicinin yazdigi ad bildirimde HTML olarak basilmasin */
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const phoneNumber = ref("");
const countryCode = ref("FR");
const translation = ref({
  countrySelector: {
    placeholder: form.country,
    error: form.choose_country,
    searchPlaceholder: form.search_country,
  },
  phoneInput: {
    placeholder: form.phone,
    example: form.example,
  },
});

const emptyModel = () => ({ email: "", name: "", phone: "", description: "" });
const model = ref(emptyModel());
const touched = reactive({ name: false, email: false, description: false });
const sending = ref(false);

const isFilled = (value: string) => value.trim() !== "";
const isMail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/* Hatalar ancak alana dokunulduktan (veya gonder'e basildiktan) sonra gosterilir */
function showError(field: "name" | "email" | "description") {
  if (!touched[field]) return false;
  const value = model.value[field];
  return field === "email" ? !isMail(value) : !isFilled(value);
}

const inputPhoneNumber = (event: any) => {
  if (!event.isValid) {
    model.value.phone = "Herhangi bir telefon numarası girilmemiştir.";
  } else {
    model.value.phone = event.countryCode + " " + event.formatInternational;
  }
};

async function sendMail() {
  touched.name = touched.email = touched.description = true;
  const missing = [
    !isFilled(model.value.name) && form.name,
    !isMail(model.value.email) && form.email,
    !isFilled(model.value.description) && form.message,
  ].filter(Boolean) as string[];
  if (missing.length) {
    $toast.warning({
      title: tt.missing_title,
      text: tt.missing_text(missing.map((f) => `<strong>${f}</strong>`).join(", ")),
    });
    return;
  }

  sending.value = true;
  try {
    const body = props.product
      ? { ...model.value, product: { ...props.product, url: window.location.href } }
      : model.value;
    await $fetch("/api/sendMail", { method: "POST", body });
    const name = escapeHtml(model.value.name.trim().split(/\s+/)[0] || "");
    const productLabel = props.product
      ? escapeHtml([props.product.name, props.product.size].filter(Boolean).join(" · "))
      : "";
    $toast.success({
      title: tt.success_title,
      text: productLabel
        ? tt.success_product(name, `<strong>${productLabel}</strong>`)
        : tt.success_text(name),
    });
    model.value = emptyModel();
    phoneNumber.value = "";
    touched.name = touched.email = touched.description = false;
  } catch {
    $toast.error({ title: tt.error_title, text: tt.error_text });
  } finally {
    sending.value = false;
  }
}

const blockedMails = [
  "export@mekmar.com",
  "export1@mekmar.com",
  "export2@mekmar.com",
  "export@mekmar.co",
  "export1@mekmar.co",
  "export2@mekmar.co",
  "export@mekmar",
  "export1@mekmar",
  "export2@mekmar",
];
function mailControl(value: string) {
  if (blockedMails.includes(value.trim().toLowerCase())) {
    model.value.email = "";
    $toast.error({ title: tt.blocked_title, text: tt.blocked_text });
  }
}
function onPaste() {
  $toast.info({ title: tt.paste_title, text: tt.paste_text });
  model.value.email = "";
}
</script>
<style scoped>
.cf {
  text-align: start;
}

.cf_row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 0.875rem;
}

.cf_group {
  margin-bottom: 0.875rem;
}

.cf_label {
  display: block;
  margin-bottom: 0.375rem;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
}

.cf_field {
  position: relative;
}

.cf_field i {
  position: absolute;
  top: 50%;
  inset-inline-start: 0.875rem;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.cf_input {
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

.cf_field .cf_input {
  padding-inline-start: 2.5rem;
}

.cf_input:focus {
  outline: 0;
  border-color: #1e58c4;
  box-shadow: 0 0 0 4px rgba(30, 88, 196, 0.12);
}

.cf_input--invalid,
.cf_input--invalid:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08);
}

.cf_textarea {
  height: auto;
  min-height: 130px;
  padding: 0.75rem 0.875rem;
  line-height: 1.5;
  resize: vertical;
}

.cf_error {
  margin: 0.3rem 0 0;
  color: #dc2626;
  font-size: 12px;
}

/* Maz telefon alani: diger inputlarla ayni yukseklik ve kose */
.cf_phone {
  width: 100%;
  color: #212529;
  --maz-color-primary: #1e58c4;
  --maz-color-primary-alpha: rgba(30, 88, 196, 0.6);
  --maz-color-primary-alpha-05: rgba(30, 88, 196, 0.05);
  --maz-border-radius: 10px;
  --maz-border-color: #dfe3e8;
}

/* Dar kutularda tasmasin: ulke secici sabit, numara alani kalan yeri doldursun */
.cf_phone :deep(.m-country-selector) {
  flex: 0 0 8.5rem;
  min-width: 0;
}

.cf_phone :deep(.m-phone-input) {
  flex: 1 1 auto;
  min-width: 0;
}

.cf_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 48px;
  margin-top: 0.25rem;
  border: 0;
  border-radius: 10px;
  background: #212529;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.cf_btn:hover:not(:disabled) {
  background: #1e58c4;
}

.cf_btn:active:not(:disabled) {
  transform: translateY(1px);
}

.cf_btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
