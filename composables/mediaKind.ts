/**
 * composables/mediaKind.ts
 *
 * Bir urun medyasinin fotograf mi video mu oldugunu soyler.
 *
 * NEDEN GEREKLI: urun medyalari `MekmarCom_Fotolar` tablosunda tek bir
 * listede duruyor ve icinde video da var — olculdugunde 91 satir .mp4,
 * 83 ayri urunde. Tablonun adi "Fotolar" ama icerigi artik karisik.
 * Galeri bilesenleri hepsini <img> olarak basiyordu, yani video satirlari
 * bos/kirik kare olarak goruniyordu.
 *
 * NEDEN `uzanti` KOLONUNA BAKILMIYOR: tabloda o alan guvenilir degil.
 * Gercek degerlerin dagilimi: ".jpg" (1575), "jpg" (1709, noktasiz),
 * "com-1" (514), "com-2" (504), "com- 7", "com-1 (1)"... yani cogu satirda
 * uzanti degil, dosya adinin son parcasi yazilmis. URL'in kendisi tek
 * guvenilir kaynak.
 *
 * Sorgu dizesi ve cengel (#...) kirpiliyor: CDN linklerinde
 * `...mp4?v=123` gibi surum parametreleri olabiliyor.
 */

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)(?:[?#]|$)/i;

export function isVideoPath(path?: string | null): boolean {
  return !!path && VIDEO_EXT.test(String(path));
}
