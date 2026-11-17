/**
 * useHeroOverlay — ust menunun seffaf mi duracagini tutan paylasimli durum.
 *
 * Neden gerekli: Navbar eskiden "scrollY > 40 ise beyaz zemine gec" diyordu.
 * Ana sayfanin hero'su artik kaydirma ile calisan bir bolum (yaklasik 2.4
 * ekran yuksekliginde) ve o sure boyunca menu hep fotograflarin uzerinde
 * duruyor; 40px esigi menuyu daha ilk tekerlek hareketinde beyaza
 * ceviriyordu.
 *
 * Artik karari Hero veriyor: kendi alt kenari menunun altina gectigi an
 * bunu false yapiyor. Navbar yalnizca okuyor.
 *
 * SSR'da baslangic degerini Navbar ana sayfadaysa true yapiyor, boylece
 * sunucudan gelen HTML de seffaf menuyle basliyor ve hydration'da
 * beyaz->seffaf gecisi (flash) olmuyor.
 */
export function useHeroOverlay() {
  return useState<boolean>("hero-overlay", () => false);
}
