<template>
  <div class="product_size">
    <span class="product_size_label">{{ size }}</span>
    <span v-if="store.getAuthStatus" class="product_size_price"
      >${{ price }}/{{ unit }}</span
    >
    <button
      v-else
      type="button"
      class="product_size_cta"
      data-bs-toggle="modal"
      :data-bs-target="`#${modal_id}`"
    >
      <i class="bi-tag" aria-hidden="true"></i>{{ get_price }}
    </button>
  </div>
  <div
    class="modal fade"
    :id="modal_id"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content price_modal" :dir="lang == 'ar' ? 'rtl' : 'ltr'">
        <button
          ref="my_close_button"
          type="button"
          class="btn-close price_modal_close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div class="price_modal_intro">
          <span class="price_modal_eyebrow">
            <i class="bi-tag" aria-hidden="true"></i>{{ size }}
          </span>
          <h2 class="price_modal_title">{{ t.title }}</h2>
        </div>
        <div class="price_modal_grid">
          <section class="price_modal_panel price_modal_panel--login">
            <div class="price_modal_panel_head">
              <span class="price_modal_icon" aria-hidden="true">
                <i class="bi-shield-lock"></i>
              </span>
              <div>
                <h3 class="price_modal_panel_title">{{ t.login_title }}</h3>
                <p class="price_modal_panel_text">{{ t.login_text }}</p>
              </div>
            </div>
            <LoginForm
              :status="login_status.status_1"
              @login_form_dialog_closed="dialog_closed"
            />
          </section>
          <div class="price_modal_or" aria-hidden="true">
            <span>{{ t.or }}</span>
          </div>
          <section class="price_modal_panel">
            <div class="price_modal_panel_head">
              <span class="price_modal_icon" aria-hidden="true">
                <i class="bi-chat-left-text"></i>
              </span>
              <div>
                <h3 class="price_modal_panel_title">{{ t.contact_title }}</h3>
                <p class="price_modal_panel_text">{{ t.contact_text }}</p>
              </div>
            </div>
            <ContactForm :form="contact.form" :product="product_info" />
          </section>
        </div>
      </div>
    </div>
  </div>
  <!--
    <MazDialog v-model="dialog_status" title="Login Or Contact" style="width:1200px;">
        <div class="row m-auto text-center">
            <div class="col-sm-5">
                <h3 class="header mb-3">{{ login_status.status_1 }}</h3>
                <LoginForm :status="login_status.status_1" :username="login_status.username"
                    @login_form_dialog_closed="dialog_closed" />
            </div>
            <div class="col-sm-2">
                OR
            </div>
            <div class="col-sm-5">
                <h3 class="header mb-3">{{ login_status.status_2 }}</h3>
                <ContactForm :form="contact.form" />
            </div>

        </div>



    </MazDialog> -->
</template>
<script setup lang="ts">
import { ref, useId, useTemplateRef } from "vue";
import { useStore } from "~/store/index";

const props = defineProps({
  size: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const { size, unit, price } = props;
/* Bu bilesen her ebat icin bir kez render ediliyor; modal id'si sabit
   "exampleModal" oldugu icin sayfada ayni id tekrarlaniyordu. */
const modal_id = `size_modal_${useId()}`;
const store = useStore();
let dialog_status = ref(false);
function login() {
  dialog_status.value = true;
}
const myEl = useTemplateRef("my_close_button");

function dialog_closed() {
  myEl?.value?.click();
  dialog_status.value = false;
  store.setLoginDialogStatus(false);
}
const login_status = store.getLogin;
const contact = store.getContact;

/* Fiyat modalindaki iletisim formu hangi urun/ebattan gonderildiyse mailde gorunsun */
const detail = store.getProductDetail?.detail?.[0] ?? {};
const product_info = {
  name: detail.urunadi_en || detail.urunadi_fr || "",
  code: detail.urunkod || "",
  size,
  unit,
};

let lang = "";
let get_price = ref("");
lang = store.getLang;
if (lang == "en") {
  get_price.value = "Get Price";
} else if (lang == "fr") {
  get_price.value = "Obtenir le prix";
} else if (lang == "es") {
  get_price.value = "Obtener precio";
} else if (lang == "ru") {
  get_price.value = "Получить цену";
} else if (lang == "ar") {
  get_price.value = "احصل على السعر";
}

const modal_texts = {
  en: {
    title: "See our prices",
    login_title: "Registered customer",
    login_text:
      "Enter your email address and we'll send you a one-time code to unlock prices.",
    contact_title: "New to Mekmar?",
    contact_text:
      "Send us a message and our sales team will get back to you with a quote.",
    or: "OR",
  },
  fr: {
    title: "Voir nos prix",
    login_title: "Client enregistré",
    login_text:
      "Saisissez votre adresse e-mail, nous vous enverrons un code unique pour afficher les prix.",
    contact_title: "Nouveau chez Mekmar ?",
    contact_text:
      "Envoyez-nous un message, notre équipe commerciale vous répondra avec un devis.",
    or: "OU",
  },
  es: {
    title: "Vea nuestros precios",
    login_title: "Cliente registrado",
    login_text:
      "Introduzca su correo y le enviaremos un código de un solo uso para ver los precios.",
    contact_title: "¿Nuevo en Mekmar?",
    contact_text:
      "Envíenos un mensaje y nuestro equipo de ventas le responderá con un presupuesto.",
    or: "O",
  },
  ru: {
    title: "Узнайте наши цены",
    login_title: "Зарегистрированный клиент",
    login_text:
      "Введите адрес электронной почты — мы отправим одноразовый код для доступа к ценам.",
    contact_title: "Впервые в Mekmar?",
    contact_text:
      "Напишите нам, и наш отдел продаж пришлёт вам коммерческое предложение.",
    or: "ИЛИ",
  },
  ar: {
    title: "اطلع على أسعارنا",
    login_title: "عميل مسجل",
    login_text:
      "أدخل بريدك الإلكتروني وسنرسل لك رمزاً لمرة واحدة لعرض الأسعار.",
    contact_title: "جديد في ميكمار؟",
    contact_text: "أرسل لنا رسالة وسيرد عليك فريق المبيعات بعرض سعر.",
    or: "أو",
  },
};
const t =
  modal_texts[(lang in modal_texts ? lang : "en") as keyof typeof modal_texts];
</script>
<style scoped>
.price_modal {
  position: relative;
  border: 0;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
}

.price_modal_close {
  position: absolute;
  top: 1rem;
  inset-inline-end: 1rem;
  z-index: 1;
}

.price_modal_intro {
  margin-bottom: 1.5rem;
  padding-inline-end: 2rem;
  text-align: start;
}

.price_modal_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(30, 88, 196, 0.08);
  color: #1e58c4;
  font-size: 12px;
  letter-spacing: 0.04em;
}

.price_modal_title {
  margin: 0.6rem 0 0;
  color: #212529;
  font-size: 1.5rem;
  font-weight: 700;
}

.price_modal_grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) auto minmax(0, 7fr);
  gap: 1.25rem;
  align-items: stretch;
}

.price_modal_panel {
  min-width: 0;
  padding: 1.5rem;
  border: 1px solid #edf0f3;
  border-radius: 12px;
  background: #fff;
  text-align: start;
}

.price_modal_panel--login {
  align-self: start;
  background: linear-gradient(180deg, rgba(30, 88, 196, 0.05), #fff 70%);
  border-color: rgba(30, 88, 196, 0.18);
}

.price_modal_panel_head {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.price_modal_icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #1e58c4;
  color: #fff;
  font-size: 1.1rem;
}

.price_modal_panel_title {
  margin: 0 0 0.25rem;
  color: #212529;
  font-size: 1rem;
  font-weight: 700;
}

.price_modal_panel_text {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.5;
}

.price_modal_or {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.price_modal_or::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 1px dashed #d8dde3;
}

.price_modal_or span {
  position: relative;
  padding: 0.35rem 0.5rem;
  border: 1px solid #edf0f3;
  border-radius: 999px;
  background: #fff;
  color: #9ca3af;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

@media (max-width: 767.98px) {
  .price_modal {
    padding: 1.25rem;
  }

  .price_modal_grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .price_modal_panel {
    padding: 1.125rem;
  }

  .price_modal_or::before {
    top: 50%;
    bottom: auto;
    left: 0;
    right: 0;
    border-left: 0;
    border-top: 1px dashed #d8dde3;
  }
}
</style>
