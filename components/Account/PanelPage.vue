<template>
  <div class="pn" :dir="isRtl ? 'rtl' : 'ltr'">
    <header class="pn_hero">
      <span class="pn_eyebrow"
        ><i class="bi-speedometer2" aria-hidden="true"></i>{{ t.eyebrow }}</span
      >
      <h1 class="pn_title">{{ profile?.company || t.title }}</h1>
      <p class="pn_subtitle">{{ t.subtitle }}</p>
    </header>

    <!-- Giris yok -->
    <section v-if="state === 'guest'" class="pn_card pn_empty">
      <i class="bi-lock" aria-hidden="true"></i>
      <h2 class="pn_h2">{{ t.login_title }}</h2>
      <p class="pn_text">{{ t.login_text }}</p>
    </section>

    <!-- ERP'de musteri kaydi yok -->
    <section v-else-if="state === 'no_customer'" class="pn_card pn_empty">
      <i class="bi-person-x" aria-hidden="true"></i>
      <h2 class="pn_h2">{{ t.nocust_title }}</h2>
      <p class="pn_text">{{ t.nocust_text }}</p>
      <NuxtLink :to="contactLink" class="pn_btn">{{ t.contact }}</NuxtLink>
    </section>

    <template v-else>
      <!-- Bilgiler -->
      <section class="pn_card">
        <div class="pn_card_head">
          <div>
            <h2 class="pn_h2">{{ t.info_title }}</h2>
            <p class="pn_text">{{ t.info_text }}</p>
          </div>
          <button
            v-if="mode === 'view'"
            type="button"
            class="pn_btn pn_btn--ghost"
            @click="startEdit"
          >
            <i class="bi-pencil" aria-hidden="true"></i>{{ t.edit }}
          </button>
        </div>

        <!-- Goruntuleme -->
        <dl v-if="mode === 'view'" class="pn_facts">
          <div>
            <dt>{{ t.f_company }}</dt>
            <dd>{{ profile.company || "—" }}</dd>
          </div>
          <div>
            <dt>{{ t.f_name }}</dt>
            <dd>{{ profile.name || "—" }}</dd>
          </div>
          <div>
            <dt>{{ t.f_email }}</dt>
            <dd dir="ltr">{{ profile.email || "—" }}</dd>
          </div>
          <div>
            <dt>{{ t.f_phone }}</dt>
            <dd dir="ltr">{{ profile.phone || "—" }}</dd>
          </div>
          <div class="pn_facts_wide">
            <dt>{{ t.f_address }}</dt>
            <dd>{{ profile.address || "—" }}</dd>
          </div>
          <div v-if="profile.country">
            <dt>{{ t.f_country }}</dt>
            <dd>{{ profile.country }}</dd>
          </div>
        </dl>

        <!-- Duzenleme formu -->
        <form
          v-else-if="mode === 'edit'"
          class="pn_form"
          @submit.prevent="askCode"
        >
          <label class="pn_field">
            <span>{{ t.f_company }}</span>
            <input
              v-model="form.company"
              type="text"
              maxlength="200"
              required
            />
          </label>
          <label class="pn_field">
            <span>{{ t.f_name }}</span>
            <input v-model="form.name" type="text" maxlength="200" required />
          </label>
          <label class="pn_field">
            <span>{{ t.f_email }}</span>
            <input
              v-model="form.email"
              type="email"
              maxlength="100"
              dir="ltr"
              required
            />
          </label>
          <label class="pn_field">
            <span>{{ t.f_phone }}</span>
            <input
              v-model="form.phone"
              type="tel"
              maxlength="50"
              dir="ltr"
              required
            />
          </label>
          <label class="pn_field pn_field--wide">
            <span>{{ t.f_address }}</span>
            <textarea
              v-model="form.address"
              rows="3"
              maxlength="500"
            ></textarea>
          </label>

          <p class="pn_note">
            <i class="bi-shield-lock" aria-hidden="true"></i
            >{{ t.confirm_note(profile.email) }}
          </p>
          <p v-if="error" class="pn_err">{{ error }}</p>

          <div class="pn_actions">
            <button type="submit" class="pn_btn" :disabled="busy">
              {{ busy ? t.wait : t.send_code }}
            </button>
            <button type="button" class="pn_btn pn_btn--ghost" @click="cancel">
              {{ t.cancel }}
            </button>
          </div>
        </form>

        <!-- Kod onayi -->
        <form v-else class="pn_form pn_form--code" @submit.prevent="confirm">
          <p class="pn_text">{{ t.code_text(sentTo) }}</p>
          <input
            v-model="code"
            type="text"
            class="pn_code"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            placeholder="000000"
            dir="ltr"
            required
          />
          <p v-if="error" class="pn_err">{{ error }}</p>
          <div class="pn_actions">
            <button type="submit" class="pn_btn" :disabled="busy">
              {{ busy ? t.wait : t.confirm }}
            </button>
            <button
              type="button"
              class="pn_btn pn_btn--ghost"
              @click="mode = 'edit'"
            >
              {{ t.back }}
            </button>
          </div>
        </form>

        <p v-if="saved" class="pn_ok">
          <i class="bi-check-circle" aria-hidden="true"></i>{{ t.saved }}
        </p>
      </section>

      <!-- Yil bazinda urun ozeti -->
      <section class="pn_card">
        <div class="pn_card_head">
          <div>
            <h2 class="pn_h2">{{ t.sum_title }}</h2>
            <p class="pn_text">{{ t.sum_text }}</p>
          </div>
          <NuxtLink :to="ordersLink" class="pn_btn pn_btn--ghost">
            <i class="bi-box-seam" aria-hidden="true"></i>{{ t.orders }}
          </NuxtLink>
        </div>

        <p v-if="!years.length" class="pn_text">{{ t.sum_none }}</p>

        <div v-for="y in years" :key="y.year" class="pn_year">
          <button
            type="button"
            class="pn_year_head"
            :aria-expanded="openYears.has(y.year)"
            @click="toggleYear(y.year)"
          >
            <span class="pn_year_no">{{ y.year }}</span>
            <span class="pn_year_meta">
              <span>{{ t.n_orders(y.orders) }}</span>
              <span class="pn_dot">·</span>
              <span>{{ t.n_items(y.items.length) }}</span>
              <i
                :class="
                  openYears.has(y.year) ? 'bi-chevron-up' : 'bi-chevron-down'
                "
                aria-hidden="true"
              ></i>
            </span>
          </button>

          <div v-if="openYears.has(y.year)" class="pn_table_wrap">
            <table class="pn_table">
              <thead>
                <tr>
                  <th>{{ t.col_product }}</th>
                  <th class="pn_num">{{ t.col_qty }}</th>
                  <th class="pn_num">{{ t.col_pieces }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(it, i) in y.items" :key="i">
                  <td>
                    <strong>{{ it.name || "—" }}</strong>
                    <span v-if="it.category || it.finish" class="pn_sub">
                      {{ [it.category, it.finish].filter(Boolean).join(" · ") }}
                    </span>
                  </td>
                  <td class="pn_num">
                    {{ fmtNum(it.quantity) }}
                    <span v-if="it.unit" class="pn_unit">{{ it.unit }}</span>
                  </td>
                  <td class="pn_num">
                    {{ it.pieces ? fmtNum(it.pieces) : "—" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

type Profile = {
  company: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  records: number;
};
type SumItem = {
  name: string;
  category: string;
  finish: string;
  unit: string;
  quantity: number;
  pieces: number;
};
type YearRow = { year: number; orders: number; items: SumItem[] };

const texts: Record<Lang, any> = {
  en: {
    eyebrow: "My panel",
    title: "My account",
    subtitle: "Your details and what you have ordered, year by year.",
    login_title: "Please sign in",
    login_text: "Sign in with your e-mail address to open your panel.",
    nocust_title: "No customer record found",
    nocust_text:
      "We could not find a customer record linked to your e-mail address. Please contact our sales team.",
    contact: "Contact us",
    info_title: "My details",
    info_text: "Changes are confirmed with a code sent to your current e-mail.",
    edit: "Edit",
    f_company: "Company",
    f_name: "Company / name",
    f_email: "E-mail",
    f_phone: "Phone",
    f_address: "Address",
    f_country: "Country",
    confirm_note: (mail: string) =>
      `For security, we will send a 6-digit code to ${mail} — your current address — and apply the changes only after you enter it.`,
    send_code: "Send confirmation code",
    cancel: "Cancel",
    wait: "Please wait…",
    code_text: (mail: string) => `Enter the 6-digit code we sent to ${mail}.`,
    confirm: "Confirm and save",
    back: "Back",
    saved: "Your details have been updated.",
    sum_title: "What I ordered",
    sum_text: "Quantities per product, grouped by year.",
    sum_none: "There is nothing to show yet.",
    orders: "Order history",
    n_orders: (n: number) => `${n} ${n === 1 ? "order" : "orders"}`,
    n_items: (n: number) => `${n} ${n === 1 ? "product" : "products"}`,
    col_product: "Product",
    col_qty: "Quantity",
    col_pieces: "Pieces",
    err_email: "Please enter a valid e-mail address.",
    err_taken: "This e-mail address belongs to another customer record.",
    err_field: "Please fill in all required fields.",
    err_code: "The code is incorrect.",
    err_expired: "The code has expired. Please request a new one.",
    err_many: "Too many attempts. Please request a new code.",
    err_mail: "We could not send the e-mail. Please try again.",
    err_general: "Something went wrong. Please try again.",
    err_cooldown: (s: number) =>
      `Please wait ${s} seconds before trying again.`,
  },
  fr: {
    eyebrow: "Mon espace",
    title: "Mon compte",
    subtitle: "Vos informations et vos commandes, année par année.",
    login_title: "Veuillez vous connecter",
    login_text:
      "Connectez-vous avec votre adresse e-mail pour ouvrir votre espace.",
    nocust_title: "Aucune fiche client",
    nocust_text:
      "Nous n'avons trouvé aucune fiche client liée à votre adresse e-mail. Contactez notre équipe commerciale.",
    contact: "Contactez-nous",
    info_title: "Mes informations",
    info_text:
      "Les modifications sont confirmées par un code envoyé à votre adresse actuelle.",
    edit: "Modifier",
    f_company: "Société",
    f_name: "Société / nom",
    f_email: "E-mail",
    f_phone: "Téléphone",
    f_address: "Adresse",
    f_country: "Pays",
    confirm_note: (mail: string) =>
      `Par sécurité, nous enverrons un code à 6 chiffres à ${mail} — votre adresse actuelle — et appliquerons les modifications après sa saisie.`,
    send_code: "Envoyer le code",
    cancel: "Annuler",
    wait: "Veuillez patienter…",
    code_text: (mail: string) =>
      `Saisissez le code à 6 chiffres envoyé à ${mail}.`,
    confirm: "Confirmer et enregistrer",
    back: "Retour",
    saved: "Vos informations ont été mises à jour.",
    sum_title: "Mes commandes",
    sum_text: "Quantités par produit, regroupées par année.",
    sum_none: "Rien à afficher pour le moment.",
    orders: "Historique des commandes",
    n_orders: (n: number) => `${n} commande${n === 1 ? "" : "s"}`,
    n_items: (n: number) => `${n} produit${n === 1 ? "" : "s"}`,
    col_product: "Produit",
    col_qty: "Quantité",
    col_pieces: "Pièces",
    err_email: "Veuillez saisir une adresse e-mail valide.",
    err_taken: "Cette adresse e-mail appartient à une autre fiche client.",
    err_field: "Veuillez remplir tous les champs obligatoires.",
    err_code: "Le code est incorrect.",
    err_expired: "Le code a expiré. Veuillez en demander un nouveau.",
    err_many: "Trop de tentatives. Veuillez demander un nouveau code.",
    err_mail: "Impossible d'envoyer l'e-mail. Veuillez réessayer.",
    err_general: "Une erreur est survenue. Veuillez réessayer.",
    err_cooldown: (s: number) => `Veuillez attendre ${s} secondes.`,
  },
  es: {
    eyebrow: "Mi panel",
    title: "Mi cuenta",
    subtitle: "Sus datos y sus pedidos, año por año.",
    login_title: "Inicie sesión",
    login_text: "Inicie sesión con su correo para abrir su panel.",
    nocust_title: "No hay ficha de cliente",
    nocust_text:
      "No encontramos una ficha de cliente vinculada a su correo. Contacte con nuestro equipo de ventas.",
    contact: "Contáctenos",
    info_title: "Mis datos",
    info_text:
      "Los cambios se confirman con un código enviado a su correo actual.",
    edit: "Editar",
    f_company: "Empresa",
    f_name: "Empresa / nombre",
    f_email: "Correo",
    f_phone: "Teléfono",
    f_address: "Dirección",
    f_country: "País",
    confirm_note: (mail: string) =>
      `Por seguridad, enviaremos un código de 6 dígitos a ${mail} — su dirección actual — y aplicaremos los cambios tras introducirlo.`,
    send_code: "Enviar código",
    cancel: "Cancelar",
    wait: "Espere…",
    code_text: (mail: string) =>
      `Introduzca el código de 6 dígitos que enviamos a ${mail}.`,
    confirm: "Confirmar y guardar",
    back: "Atrás",
    saved: "Sus datos se han actualizado.",
    sum_title: "Lo que he pedido",
    sum_text: "Cantidades por producto, agrupadas por año.",
    sum_none: "Todavía no hay nada que mostrar.",
    orders: "Historial de pedidos",
    n_orders: (n: number) => `${n} pedido${n === 1 ? "" : "s"}`,
    n_items: (n: number) => `${n} producto${n === 1 ? "" : "s"}`,
    col_product: "Producto",
    col_qty: "Cantidad",
    col_pieces: "Piezas",
    err_email: "Introduzca un correo electrónico válido.",
    err_taken: "Este correo pertenece a otra ficha de cliente.",
    err_field: "Rellene todos los campos obligatorios.",
    err_code: "El código es incorrecto.",
    err_expired: "El código ha caducado. Solicite uno nuevo.",
    err_many: "Demasiados intentos. Solicite un código nuevo.",
    err_mail: "No pudimos enviar el correo. Inténtelo de nuevo.",
    err_general: "Algo salió mal. Inténtelo de nuevo.",
    err_cooldown: (s: number) => `Espere ${s} segundos.`,
  },
  ru: {
    eyebrow: "Мой кабинет",
    title: "Мой аккаунт",
    subtitle: "Ваши данные и заказы по годам.",
    login_title: "Войдите в аккаунт",
    login_text: "Войдите с помощью e-mail, чтобы открыть кабинет.",
    nocust_title: "Карточка клиента не найдена",
    nocust_text:
      "Мы не нашли карточку клиента, связанную с вашим e-mail. Свяжитесь с отделом продаж.",
    contact: "Связаться с нами",
    info_title: "Мои данные",
    info_text: "Изменения подтверждаются кодом на ваш текущий e-mail.",
    edit: "Изменить",
    f_company: "Компания",
    f_name: "Компания / имя",
    f_email: "E-mail",
    f_phone: "Телефон",
    f_address: "Адрес",
    f_country: "Страна",
    confirm_note: (mail: string) =>
      `В целях безопасности мы отправим 6-значный код на ${mail} — ваш текущий адрес — и применим изменения после его ввода.`,
    send_code: "Отправить код",
    cancel: "Отмена",
    wait: "Подождите…",
    code_text: (mail: string) =>
      `Введите 6-значный код, отправленный на ${mail}.`,
    confirm: "Подтвердить и сохранить",
    back: "Назад",
    saved: "Ваши данные обновлены.",
    sum_title: "Мои заказы",
    sum_text: "Количество по товарам, сгруппировано по годам.",
    sum_none: "Пока нечего показать.",
    orders: "История заказов",
    n_orders: (n: number) => `${n} заказ(ов)`,
    n_items: (n: number) => `${n} товар(ов)`,
    col_product: "Товар",
    col_qty: "Количество",
    col_pieces: "Штук",
    err_email: "Введите корректный адрес e-mail.",
    err_taken: "Этот адрес принадлежит другой карточке клиента.",
    err_field: "Заполните все обязательные поля.",
    err_code: "Неверный код.",
    err_expired: "Код истёк. Запросите новый.",
    err_many: "Слишком много попыток. Запросите новый код.",
    err_mail: "Не удалось отправить письмо. Попробуйте снова.",
    err_general: "Что-то пошло не так. Попробуйте снова.",
    err_cooldown: (s: number) => `Подождите ${s} секунд.`,
  },
  ar: {
    eyebrow: "لوحتي",
    title: "حسابي",
    subtitle: "بياناتك وما طلبته، سنة بسنة.",
    login_title: "يرجى تسجيل الدخول",
    login_text: "سجّل الدخول ببريدك الإلكتروني لفتح لوحتك.",
    nocust_title: "لا يوجد سجل عميل",
    nocust_text:
      "لم نجد سجل عميل مرتبطًا ببريدك الإلكتروني. يرجى التواصل مع فريق المبيعات.",
    contact: "اتصل بنا",
    info_title: "بياناتي",
    info_text: "يتم تأكيد التغييرات برمز يُرسل إلى بريدك الحالي.",
    edit: "تعديل",
    f_company: "الشركة",
    f_name: "الشركة / الاسم",
    f_email: "البريد الإلكتروني",
    f_phone: "الهاتف",
    f_address: "العنوان",
    f_country: "البلد",
    confirm_note: (mail: string) =>
      `للأمان، سنرسل رمزًا من 6 أرقام إلى ${mail} — عنوانك الحالي — وسنطبّق التغييرات بعد إدخاله.`,
    send_code: "إرسال رمز التأكيد",
    cancel: "إلغاء",
    wait: "يرجى الانتظار…",
    code_text: (mail: string) =>
      `أدخل الرمز المكوّن من 6 أرقام المُرسل إلى ${mail}.`,
    confirm: "تأكيد وحفظ",
    back: "رجوع",
    saved: "تم تحديث بياناتك.",
    sum_title: "ما طلبته",
    sum_text: "الكميات لكل منتج، مجمّعة حسب السنة.",
    sum_none: "لا يوجد شيء لعرضه بعد.",
    orders: "سجل الطلبات",
    n_orders: (n: number) => `${n} طلب`,
    n_items: (n: number) => `${n} منتج`,
    col_product: "المنتج",
    col_qty: "الكمية",
    col_pieces: "عدد القطع",
    err_email: "يرجى إدخال بريد إلكتروني صحيح.",
    err_taken: "هذا البريد يتبع سجل عميل آخر.",
    err_field: "يرجى تعبئة جميع الحقول المطلوبة.",
    err_code: "الرمز غير صحيح.",
    err_expired: "انتهت صلاحية الرمز. يرجى طلب رمز جديد.",
    err_many: "محاولات كثيرة. يرجى طلب رمز جديد.",
    err_mail: "لم نتمكن من إرسال البريد. حاول مرة أخرى.",
    err_general: "حدث خطأ ما. حاول مرة أخرى.",
    err_cooldown: (s: number) => `يرجى الانتظار ${s} ثانية.`,
  },
};

const store = useStore();
const lang = (store.getLang in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";
const prefix = lang === "en" ? "" : `/${lang}`;
const contactLink = `${prefix}/contact`;
const ordersLink = `${prefix}/account/orders`;

const state = ref<"ready" | "guest" | "no_customer">("ready");
const profile = ref<Profile>({
  company: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  records: 0,
});
const years = ref<YearRow[]>([]);
const openYears = ref(new Set<number>());

const mode = ref<"view" | "edit" | "code">("view");
const form = ref({
  company: "",
  name: "",
  email: "",
  phone: "",
  address: "",
});
const code = ref("");
const sentTo = ref("");
const busy = ref(false);
const error = ref("");
const saved = ref(false);

store.setLoading(ref(true));
try {
  /* useRequestFetch: SSR sirasinda gelen cerezleri dahili API'ye iletir */
  const request = useRequestFetch();
  const res = await request<{
    ok: boolean;
    profile?: Profile;
    years?: YearRow[];
  }>("/api/account/profile");
  if (res?.profile) profile.value = res.profile;
  years.value = res?.years ?? [];
} catch (err: any) {
  const code = err?.statusCode ?? err?.response?.status;
  if (code === 401) state.value = "guest";
  else if (code === 403) state.value = "no_customer";
}
store.setLoading(ref(false));

// En guncel yil acik baslasin
if (years.value.length) openYears.value.add(years.value[0].year);

function toggleYear(y: number) {
  const next = new Set(openYears.value);
  if (next.has(y)) next.delete(y);
  else next.add(y);
  openYears.value = next;
}

function startEdit() {
  form.value = {
    company: profile.value.company,
    name: profile.value.name,
    email: profile.value.email,
    phone: profile.value.phone,
    address: profile.value.address,
  };
  error.value = "";
  saved.value = false;
  mode.value = "edit";
}

function cancel() {
  mode.value = "view";
  error.value = "";
  code.value = "";
}

function message(err?: string, retryAfter?: number) {
  switch (err) {
    case "invalid_field":
      return t.err_field;
    case "email_taken":
      return t.err_taken;
    case "invalid":
      return t.err_code;
    case "expired":
      return t.err_expired;
    case "too_many":
      return t.err_many;
    case "mail_failed":
      return t.err_mail;
    case "cooldown":
      return t.err_cooldown(retryAfter ?? 60);
    default:
      return t.err_general;
  }
}

async function askCode() {
  busy.value = true;
  error.value = "";
  try {
    const res = await $fetch<{
      ok: boolean;
      error?: string;
      retryAfter?: number;
      sent_to?: string;
    }>("/api/account/profile-code", {
      method: "POST",
      body: { ...form.value, lang },
    });
    if (res.ok) {
      sentTo.value = res.sent_to ?? profile.value.email;
      code.value = "";
      mode.value = "code";
    } else {
      error.value = message(res.error, res.retryAfter);
    }
  } catch {
    error.value = t.err_general;
  } finally {
    busy.value = false;
  }
}

async function confirm() {
  busy.value = true;
  error.value = "";
  try {
    const res = await $fetch<{ ok: boolean; error?: string }>(
      "/api/account/profile",
      { method: "POST", body: { ...form.value, code: code.value.trim() } },
    );
    if (res.ok) {
      profile.value = {
        ...profile.value,
        company: form.value.company,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
      };
      // Arayuz cerezi yeni mail ile esitlensin (sunucu oturumu da yeniledi)
      useCookie<string | null>("user", { path: "/" }).value = form.value.email;
      mode.value = "view";
      saved.value = true;
      code.value = "";
    } else {
      if (res.error === "expired" || res.error === "too_many") code.value = "";
      error.value = message(res.error);
    }
  } catch {
    error.value = t.err_general;
  } finally {
    busy.value = false;
  }
}

const locales: Record<Lang, string> = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
  ru: "ru-RU",
  ar: "ar",
};
const fmtNum = (n: number) =>
  n.toLocaleString(locales[lang], { maximumFractionDigits: 2 });
</script>

<style scoped>
.pn {
  --pn-accent: #1e58c4;
  --pn-ink: #111827;
  --pn-muted: #6b7280;
  --pn-line: #e5e7eb;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  color: var(--pn-ink);
  text-align: start;
}

.pn_hero {
  padding: 2.5rem 1.5rem 2rem;
  border: 1px solid #e6ecf7;
  border-radius: 20px;
  background:
    radial-gradient(
      120% 140% at 100% 0%,
      rgba(30, 88, 196, 0.12),
      transparent 55%
    ),
    linear-gradient(180deg, #f5f8ff, #ffffff);
  text-align: center;
}

.pn_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--pn-line);
  color: var(--pn-accent);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pn_title {
  margin: 0.8rem 0 0;
  font-size: clamp(1.6rem, 4vw, 2.3rem);
  font-weight: 700;
}

.pn_subtitle {
  margin: 0.5rem auto 0;
  max-width: 60ch;
  color: var(--pn-muted);
}

.pn_card {
  margin-top: 1.25rem;
  padding: 1.25rem;
  border: 1px solid var(--pn-line);
  border-radius: 16px;
  background: #fff;
}

.pn_card_head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.pn_h2 {
  margin: 0;
  font-size: 1.15rem;
}

.pn_text {
  margin: 0.3rem 0 0;
  color: var(--pn-muted);
  font-size: 13.5px;
  line-height: 1.5;
}

.pn_facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem 1.5rem;
  margin: 1.25rem 0 0;
}

.pn_facts_wide {
  grid-column: 1 / -1;
}

.pn_facts dt {
  color: var(--pn-muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.pn_facts dd {
  margin: 0.2rem 0 0;
  font-weight: 600;
  white-space: pre-line;
}

.pn_form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem;
  margin-top: 1.25rem;
}

.pn_form--code {
  grid-template-columns: 1fr;
  max-width: 24rem;
}

.pn_field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.pn_field--wide {
  grid-column: 1 / -1;
}

.pn_field span {
  color: var(--pn-muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.pn_field input,
.pn_field textarea {
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--pn-line);
  border-radius: 10px;
  font: inherit;
  font-size: 14px;
  /* Projede koyu mod tanimi yok; arka plan verilmezse tarayicinin koyu mod
     varsayilani devreye giriyor ve koyu metin koyu zeminde kayboluyordu.
     color-scheme ile imlec/secim renkleri de acik temada kaliyor. */
  color-scheme: light;
  background: #fff;
  color: var(--pn-ink);
  resize: vertical;
}

.pn_field input::placeholder,
.pn_field textarea::placeholder {
  color: #9ca3af;
}

.pn_field input:focus,
.pn_field textarea:focus {
  outline: none;
  border-color: var(--pn-accent);
  box-shadow: 0 0 0 3px rgba(30, 88, 196, 0.12);
}

.pn_code {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid var(--pn-line);
  border-radius: 10px;
  color-scheme: light;
  background: #fff;
  color: var(--pn-ink);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.4em;
  text-align: center;
}

.pn_note {
  grid-column: 1 / -1;
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  margin: 0;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--pn-line);
  border-radius: 12px;
  background: #f8fafc;
  color: var(--pn-muted);
  font-size: 12.5px;
  line-height: 1.5;
}

.pn_note i {
  flex: none;
  color: var(--pn-accent);
}

.pn_actions {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pn_btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.1rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--pn-accent);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.pn_btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.pn_btn--ghost {
  border-color: var(--pn-line);
  background: #fff;
  color: var(--pn-ink);
}

.pn_btn--ghost:hover {
  border-color: var(--pn-accent);
  color: var(--pn-accent);
}

.pn_err {
  grid-column: 1 / -1;
  margin: 0;
  color: #b42318;
  font-size: 13px;
}

.pn_ok {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 1rem 0 0;
  color: #067647;
  font-size: 13.5px;
  font-weight: 600;
}

.pn_year {
  margin-top: 0.75rem;
  border: 1px solid var(--pn-line);
  border-radius: 12px;
  overflow: hidden;
}

.pn_year_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.8rem 1rem;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-align: start;
  cursor: pointer;
}

.pn_year_head:hover {
  background: #f8fafc;
}

.pn_year_no {
  font-size: 1.05rem;
  font-weight: 700;
}

.pn_year_meta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--pn-muted);
  font-size: 13px;
}

.pn_dot {
  opacity: 0.5;
}

.pn_table_wrap {
  overflow-x: auto;
  border-top: 1px solid var(--pn-line);
}

.pn_table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.pn_table th,
.pn_table td {
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--pn-line);
  text-align: start;
  vertical-align: top;
}

.pn_table th {
  color: var(--pn-muted);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.pn_table tr:last-child td {
  border-bottom: 0;
}

.pn_num {
  text-align: end;
  white-space: nowrap;
}

.pn_sub {
  display: block;
  color: var(--pn-muted);
  font-size: 12.5px;
}

.pn_unit {
  color: var(--pn-muted);
  font-size: 12px;
}

.pn_empty {
  text-align: center;
  padding: 2.5rem 1.25rem;
}

.pn_empty > i {
  font-size: 2rem;
  color: var(--pn-accent);
}

.pn_empty .pn_h2 {
  margin-top: 0.75rem;
}

.pn_empty .pn_text {
  margin-inline: auto;
  max-width: 50ch;
}

.pn_empty .pn_btn {
  margin-top: 1rem;
}

@media (max-width: 720px) {
  .pn_hero {
    padding: 1.75rem 1rem 1.5rem;
  }

  .pn_form {
    grid-template-columns: 1fr;
  }
}
</style>
