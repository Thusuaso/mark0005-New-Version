import Clarity from "@microsoft/clarity";

/**
 * Microsoft Clarity.
 *
 * Eskiden bu plugin hem sunucuda hem istemcide, hydration sirasinda hemen
 * calisiyordu. Sunucuda injectScript() window'a dokundugu icin zaten sessizce
 * hata yutuyordu; istemcide ise clarity.ms'e giden istegi ilk boyama ile
 * yaristiriyordu.
 *
 * Artik .client eki ile yalnizca tarayicida, onNuxtReady ile de hydration
 * bittikten sonra calisiyor. Clarity'nin kendi script'i zaten async.
 */
export default defineNuxtPlugin(() => {
  onNuxtReady(() => {
    Clarity.init("rqnl9u3tud");
  });
});
