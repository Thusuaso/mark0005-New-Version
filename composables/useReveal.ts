/**
 * useReveal — asagi inildikce bolumleri gorunur kilan IntersectionObserver.
 *
 * Donen `el`'i bir elemana ref olarak bagla, `shown`'i da sinif olarak:
 *
 *   const { el, shown } = useReveal();
 *   <div ref="el" :class="{ 'is-in': shown }">
 *
 * Neden hazir bir kutuphane degil: tek IntersectionObserver'lik is, ve
 * bolumlerin cogu zaten `hydrate-on-visible` ile tembel hidrate ediliyor —
 * ekstra bir runtime bagimliligi tasimanin anlami yok.
 *
 * prefers-reduced-motion acikken animasyon beklemeden `shown` dogrudan true
 * baslar; SSR'da da true doner, boylece JS kapaliyken icerik gizli kalmaz.
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

export function useReveal(options: {
  /** Gorunurlugun yuzde kaci tetiklesin. */
  threshold?: number;
  /** Gorus alanina girmeden kac px once tetiklesin. */
  rootMargin?: string;
  /** Birden fazla cocuk icin kademeli gecikme (ms). */
  delay?: number;
} = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -8% 0px", delay = 0 } = options;

  const el = ref<HTMLElement | null>(null);
  /* SSR'da true: JS calismadan da icerik gorunur olmali. */
  const shown = ref(!import.meta.client);

  let observer: IntersectionObserver | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  onMounted(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !el.value || !("IntersectionObserver" in window)) {
      shown.value = true;
      return;
    }

    shown.value = false;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          /* Tek yonlu: bir kez gorundukten sonra geri saklanmiyor. */
          if (delay > 0) {
            timer = setTimeout(() => (shown.value = true), delay);
          } else {
            shown.value = true;
          }
          observer?.disconnect();
          observer = undefined;
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    if (timer) clearTimeout(timer);
  });

  return { el, shown };
}
