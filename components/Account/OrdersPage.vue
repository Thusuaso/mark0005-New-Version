<template>
  <div class="or" :dir="isRtl ? 'rtl' : 'ltr'">
    <header class="or_hero">
      <span class="or_eyebrow"
        ><i class="bi-box-seam" aria-hidden="true"></i>{{ t.eyebrow }}</span
      >
      <h1 class="or_title">{{ t.title }}</h1>
      <p v-if="company" class="or_company">{{ company }}</p>
      <p v-else class="or_subtitle">{{ t.subtitle }}</p>
    </header>

    <!-- Giris yapilmamis -->
    <section v-if="state === 'guest'" class="or_card or_empty">
      <i class="bi-lock" aria-hidden="true"></i>
      <h2 class="or_h2">{{ t.login_title }}</h2>
      <p class="or_text">{{ t.login_text }}</p>
    </section>

    <!-- Siparis yok -->
    <section v-else-if="!orders.length" class="or_card or_empty">
      <i class="bi-inbox" aria-hidden="true"></i>
      <h2 class="or_h2">{{ t.none_title }}</h2>
      <p class="or_text">{{ t.none_text }}</p>
      <NuxtLink :to="contactLink" class="or_btn">{{ t.contact }}</NuxtLink>
    </section>

    <template v-else>
      <ul class="or_stats">
        <li>
          <strong>{{ orders.length }}</strong
          ><span>{{ t.stat_orders }}</span>
        </li>
        <li>
          <strong>{{ totalItems }}</strong
          ><span>{{ t.stat_items }}</span>
        </li>
        <li>
          <strong>{{ orders[0].date ? fmtDate(orders[0].date) : "—" }}</strong
          ><span>{{ t.stat_last }}</span>
        </li>
      </ul>

      <ul class="or_list">
        <li v-for="o in orders" :key="o.order_no" class="or_card">
          <button
            type="button"
            class="or_head"
            :aria-expanded="open.has(o.order_no)"
            @click="toggle(o.order_no)"
          >
            <span class="or_head_main">
              <span class="or_no">{{ o.order_no }}</span>
              <span v-if="o.project" class="or_project">{{ o.project }}</span>
            </span>
            <span class="or_head_meta">
              <span class="or_date"
                ><i class="bi-calendar3" aria-hidden="true"></i
                >{{ o.date ? fmtDate(o.date) : "—" }}</span
              >
              <span v-if="o.status" class="or_badge">{{ o.status }}</span>
              <i
                class="or_caret"
                :class="
                  open.has(o.order_no) ? 'bi-chevron-up' : 'bi-chevron-down'
                "
                aria-hidden="true"
              ></i>
            </span>
          </button>

          <div v-if="open.has(o.order_no)" class="or_body">
            <dl class="or_facts">
              <div v-if="o.shipped_at">
                <dt>{{ t.shipped }}</dt>
                <dd>{{ fmtDate(o.shipped_at) }}</dd>
              </div>
              <div v-if="o.eta">
                <dt>{{ t.eta }}</dt>
                <dd>{{ fmtDate(o.eta) }}</dd>
              </div>
              <div v-if="o.container">
                <dt>{{ t.container }}</dt>
                <dd dir="ltr">{{ o.container }}</dd>
              </div>
              <div v-if="o.pallets">
                <dt>{{ t.pallets }}</dt>
                <dd>{{ o.pallets }}</dd>
              </div>
            </dl>

            <div class="or_table_wrap">
              <table class="or_table">
                <thead>
                  <tr>
                    <th>{{ t.col_product }}</th>
                    <th>{{ t.col_size }}</th>
                    <th class="or_num">{{ t.col_qty }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(it, i) in o.items" :key="i">
                    <td>
                      <strong>{{ it.name || "—" }}</strong>
                      <span v-if="it.category || it.finish" class="or_sub">
                        {{
                          [it.category, it.finish].filter(Boolean).join(" · ")
                        }}
                      </span>
                    </td>
                    <td>{{ it.size || "—" }}</td>
                    <td class="or_num">
                      {{ fmtNum(it.quantity) }}
                      <span v-if="it.unit" class="or_unit">{{ it.unit }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

type Item = {
  name: string;
  category: string;
  finish: string;
  size: string;
  unit: string;
  quantity: number;
  pieces: number;
};
type Order = {
  order_no: string;
  date: string | null;
  status: string;
  project: string;
  shipped_at: string | null;
  eta: string | null;
  container: string;
  pallets: number;
  items: Item[];
};

const texts: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    login_title: string;
    login_text: string;
    none_title: string;
    none_text: string;
    contact: string;
    stat_orders: string;
    stat_items: string;
    stat_last: string;
    shipped: string;
    eta: string;
    container: string;
    pallets: string;
    col_product: string;
    col_size: string;
    col_qty: string;
  }
> = {
  en: {
    eyebrow: "My account",
    title: "Order history",
    subtitle: "Every order you have placed with Mekmar.",
    login_title: "Please sign in",
    login_text: "Sign in with your e-mail address to see your order history.",
    none_title: "No orders yet",
    none_text: "We could not find any order linked to your e-mail address.",
    contact: "Contact us",
    stat_orders: "Orders",
    stat_items: "Product lines",
    stat_last: "Latest order",
    shipped: "Loading date",
    eta: "ETA",
    container: "Container",
    pallets: "Pallets",
    col_product: "Product",
    col_size: "Size",
    col_qty: "Quantity",
  },
  fr: {
    eyebrow: "Mon compte",
    title: "Historique des commandes",
    subtitle: "Toutes vos commandes passées chez Mekmar.",
    login_title: "Veuillez vous connecter",
    login_text:
      "Connectez-vous avec votre adresse e-mail pour voir l'historique de vos commandes.",
    none_title: "Aucune commande",
    none_text:
      "Nous n'avons trouvé aucune commande liée à votre adresse e-mail.",
    contact: "Contactez-nous",
    stat_orders: "Commandes",
    stat_items: "Lignes de produits",
    stat_last: "Dernière commande",
    shipped: "Date de chargement",
    eta: "ETA",
    container: "Conteneur",
    pallets: "Palettes",
    col_product: "Produit",
    col_size: "Dimensions",
    col_qty: "Quantité",
  },
  es: {
    eyebrow: "Mi cuenta",
    title: "Historial de pedidos",
    subtitle: "Todos los pedidos que ha realizado con Mekmar.",
    login_title: "Inicie sesión",
    login_text:
      "Inicie sesión con su dirección de correo para ver su historial de pedidos.",
    none_title: "Aún no hay pedidos",
    none_text:
      "No encontramos ningún pedido vinculado a su dirección de correo.",
    contact: "Contáctenos",
    stat_orders: "Pedidos",
    stat_items: "Líneas de producto",
    stat_last: "Último pedido",
    shipped: "Fecha de carga",
    eta: "ETA",
    container: "Contenedor",
    pallets: "Palés",
    col_product: "Producto",
    col_size: "Medidas",
    col_qty: "Cantidad",
  },
  ru: {
    eyebrow: "Мой аккаунт",
    title: "История заказов",
    subtitle: "Все ваши заказы в Mekmar.",
    login_title: "Войдите в аккаунт",
    login_text:
      "Войдите с помощью своего e-mail, чтобы увидеть историю заказов.",
    none_title: "Заказов пока нет",
    none_text: "Мы не нашли заказов, связанных с вашим адресом e-mail.",
    contact: "Связаться с нами",
    stat_orders: "Заказы",
    stat_items: "Позиции",
    stat_last: "Последний заказ",
    shipped: "Дата загрузки",
    eta: "ETA",
    container: "Контейнер",
    pallets: "Паллеты",
    col_product: "Товар",
    col_size: "Размер",
    col_qty: "Количество",
  },
  ar: {
    eyebrow: "حسابي",
    title: "سجل الطلبات",
    subtitle: "جميع الطلبات التي قدمتها لدى ميكمار.",
    login_title: "يرجى تسجيل الدخول",
    login_text: "سجّل الدخول ببريدك الإلكتروني لعرض سجل طلباتك.",
    none_title: "لا توجد طلبات بعد",
    none_text: "لم نجد أي طلب مرتبط بعنوان بريدك الإلكتروني.",
    contact: "اتصل بنا",
    stat_orders: "الطلبات",
    stat_items: "بنود المنتجات",
    stat_last: "أحدث طلب",
    shipped: "تاريخ التحميل",
    eta: "الوصول المتوقع",
    container: "الحاوية",
    pallets: "الطبليات",
    col_product: "المنتج",
    col_size: "المقاس",
    col_qty: "الكمية",
  },
};

const store = useStore();
const lang = (store.getLang in texts ? store.getLang : "en") as Lang;
const t = texts[lang];
const isRtl = lang === "ar";
const contactLink = lang === "en" ? "/contact" : `/${lang}/contact`;

const orders = ref<Order[]>([]);
const company = ref("");
const state = ref<"guest" | "ready">("ready");
const open = ref(new Set<string>());

store.setLoading(ref(true));
try {
  /* useRequestFetch, SSR sirasinda gelen istegin cerezlerini dahili API'ye
     iletir; duz $fetch iletmedigi icin sunucuda her zaman 401 donuyordu. */
  const request = useRequestFetch();
  const res = await request<{
    ok: boolean;
    company?: string;
    orders?: Order[];
  }>("/api/account/orders");
  orders.value = res?.orders ?? [];
  company.value = String(res?.company ?? "");
} catch (err: any) {
  // 401: oturum yok veya gecersiz -> giris davetiyesi gosterilir
  if (err?.statusCode === 401 || err?.response?.status === 401) {
    state.value = "guest";
  }
}
store.setLoading(ref(false));

// Tek siparis varsa acik baslasin
if (orders.value.length === 1) open.value.add(orders.value[0].order_no);

const totalItems = computed(() =>
  orders.value.reduce((n, o) => n + o.items.length, 0),
);

function toggle(no: string) {
  const next = new Set(open.value);
  if (next.has(no)) next.delete(no);
  else next.add(no);
  open.value = next;
}

const locales: Record<Lang, string> = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
  ru: "ru-RU",
  ar: "ar",
};

function fmtDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.valueOf())) return iso;
  return d.toLocaleDateString(locales[lang], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

const fmtNum = (n: number) =>
  n.toLocaleString(locales[lang], { maximumFractionDigits: 2 });
</script>

<style scoped>
.or {
  --or-accent: #1e58c4;
  --or-ink: #111827;
  --or-muted: #6b7280;
  --or-line: #e5e7eb;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  color: var(--or-ink);
  text-align: start;
}

.or_hero {
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

.or_eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--or-line);
  color: var(--or-accent);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.or_title {
  margin: 0.8rem 0 0;
  font-size: clamp(1.6rem, 4vw, 2.3rem);
  font-weight: 700;
}

.or_company {
  margin: 0.5rem 0 0;
  color: var(--or-accent);
  font-weight: 600;
}

.or_subtitle {
  margin: 0.5rem auto 0;
  max-width: 60ch;
  color: var(--or-muted);
}

.or_stats {
  display: flex;
  gap: 0.75rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.or_stats li {
  flex: 1 1 0;
  min-width: 0;
  padding: 0.85rem 0.75rem;
  border: 1px solid var(--or-line);
  border-radius: 14px;
  background: #fff;
  text-align: center;
}

.or_stats strong {
  display: block;
  font-size: 1.15rem;
}

.or_stats span {
  color: var(--or-muted);
  font-size: 12.5px;
}

.or_list {
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.or_card {
  border: 1px solid var(--or-line);
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
}

.or_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.1rem;
  border: 0;
  background: none;
  cursor: pointer;
  text-align: start;
  font: inherit;
  color: inherit;
}

.or_head:hover {
  background: #f8fafc;
}

.or_head_main {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.or_no {
  font-weight: 700;
}

.or_project {
  color: var(--or-muted);
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.or_head_meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: none;
}

.or_date {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--or-muted);
  font-size: 13px;
  white-space: nowrap;
}

.or_badge {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(30, 88, 196, 0.08);
  color: var(--or-accent);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.or_caret {
  color: var(--or-muted);
}

.or_body {
  padding: 0 1.1rem 1.1rem;
  border-top: 1px solid var(--or-line);
}

.or_facts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 1rem 0;
}

.or_facts dt {
  color: var(--or-muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.or_facts dd {
  margin: 0.15rem 0 0;
  font-weight: 600;
}

.or_table_wrap {
  overflow-x: auto;
}

.or_table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.or_table th,
.or_table td {
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid var(--or-line);
  text-align: start;
  vertical-align: top;
}

.or_table th {
  color: var(--or-muted);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.or_num {
  text-align: end;
  white-space: nowrap;
}

.or_sub {
  display: block;
  color: var(--or-muted);
  font-size: 12.5px;
}

.or_unit {
  color: var(--or-muted);
  font-size: 12px;
}

.or_empty {
  margin-top: 1.25rem;
  padding: 2.5rem 1.25rem;
  text-align: center;
}

.or_empty > i {
  font-size: 2rem;
  color: var(--or-accent);
}

.or_h2 {
  margin: 0.75rem 0 0;
  font-size: 1.2rem;
}

.or_text {
  margin: 0.4rem auto 0;
  max-width: 50ch;
  color: var(--or-muted);
}

.or_btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  background: var(--or-accent);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 720px) {
  .or_hero {
    padding: 1.75rem 1rem 1.5rem;
  }

  .or_stats {
    gap: 0.5rem;
  }

  .or_stats li {
    padding: 0.7rem 0.5rem;
  }

  .or_head {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  .or_head_meta {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
