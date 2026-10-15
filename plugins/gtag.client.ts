// plugins/gtag.client.ts
export default defineNuxtPlugin(() => {
  const { gtagId, adsId } = useRuntimeConfig().public;

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
      },
    ],
  });

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // gtag.js özellikle `arguments` objesini bekliyor, spread çalışmaz
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gtagId);
  window.gtag("config", adsId);
});
