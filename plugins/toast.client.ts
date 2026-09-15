import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import '~/assets/css/toast.css';

/* Bildirimler: $toast.success("metin") eskisi gibi calisir; baslik icin
   $toast.success({ title: "Baslik", text: "Aciklama" }) kullanilabilir. */
type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastInput = string | { title?: string; text?: string };

const ICONS: Record<ToastType, string> = {
  success: 'bi-check-lg',
  error: 'bi-x-lg',
  warning: 'bi-exclamation-lg',
  info: 'bi-info-lg',
};

const DURATIONS: Record<ToastType, number> = {
  success: 6000,
  error: 7000,
  warning: 6000,
  info: 5000,
};

function render(type: ToastType, input: ToastInput) {
  const { title, text } = typeof input === 'string' ? { title: '', text: input } : input;
  const dir = /^\/ar(\/|$)/.test(window.location.pathname) ? 'rtl' : 'ltr';
  return `<span class="mk-toast" dir="${dir}">
    <span class="mk-toast__icon"><i class="${ICONS[type]}"></i></span>
    <span class="mk-toast__body">
      ${title ? `<strong class="mk-toast__title">${title}</strong>` : ''}
      ${text ? `<span class="mk-toast__text">${text}</span>` : ''}
    </span>
    <span class="mk-toast__close" aria-hidden="true"><i class="bi-x"></i></span>
    <span class="mk-toast__progress" style="animation-duration:${DURATIONS[type]}ms"></span>
  </span>`;
}

export default defineNuxtPlugin(() => {
  const base = useToast({
    position: 'top-right',
    dismissible: true,
    pauseOnHover: true,
  });

  const show = (type: ToastType) => (input: ToastInput, options: Record<string, any> = {}) =>
    base.open({ type, message: render(type, input), duration: DURATIONS[type], ...options });

  const toast = {
    ...base,
    open: base.open,
    clear: base.clear,
    success: show('success'),
    error: show('error'),
    warning: show('warning'),
    info: show('info'),
  };

  return {
    provide: {
      toast,
    },
  };
});
