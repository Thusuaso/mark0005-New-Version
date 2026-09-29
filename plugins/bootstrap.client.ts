/**
 * Bootstrap'in JS'i.
 *
 * Eskiden bootstrap.bundle.min.js (80 KB) tamamen import ediliyor ve
 * nuxtApp.provide('bs', ...) ile saglaniyordu. Uygulamada $bs'e hicbir yerde
 * dokunulmuyor, yani provide olu koddu; bundle ise alert, carousel, offcanvas,
 * popover, scrollspy, tab, toast, tooltip gibi hic kullanilmayan bilesenleri
 * de tasiyordu.
 *
 * Sablonlarda yalnizca su uc data-API'si geciyor:
 *   data-bs-toggle="collapse"  (6)
 *   data-bs-toggle="dropdown" (18)
 *   data-bs-toggle="modal"     (1)
 *
 * Bu modulleri import etmek kendi data-API dinleyicilerini kurmalari icin
 * yeterli; ayrica bir baslatma gerekmiyor.
 */
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/modal";

export default defineNuxtPlugin(() => {});
