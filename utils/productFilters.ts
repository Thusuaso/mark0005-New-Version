/**
 * utils/productFilters.ts
 *
 * Urun filtrelerinin tek kaynagi: hangi boyutlar var, hangi kategoride
 * hangisi gorunur, ve URL sorgu dizesi nasil okunup yaziliyor.
 *
 * Hem sunucu (server/api/products/filtered.get.ts) hem istemci
 * (components/Products/CategoryPage.vue) bunu kullaniyor; boylece "bu
 * kategoride edge filtresi var mi?" sorusunun cevabi iki yerde ayri ayri
 * tutulmuyor.
 *
 * --- Filtreleme mantigi ---
 * Boyutlar ARASINDA VE: marble + blue  -> hem marble hem blue olanlar.
 * Boyut ICINDE VEYA:    blue + beige   -> mavi YA DA bej olanlar.
 * Standart faceted filtreleme davranisi.
 */

export type FilterKey =
  | "color"
  | "finish"
  | "edge"
  | "material"
  | "style"
  | "type";

export const FILTER_KEYS: readonly FilterKey[] = [
  "color",
  "finish",
  "edge",
  "material",
  "style",
  "type",
] as const;

/**
 * Hangi filtre hangi kategorilerde gosterilir.
 *
 * pages/product/[name]/[id].vue icindeki `showFor` haritasindan tasindi
 * (digerinde de diger dillerin sayfalarindaki uzun
 * `category_id == 1 || category_id == 2 || ...` zincirlerinden).
 * null = her kategoride gorunur.
 *
 * Kategori id'leri: 1 marble, 2 travertine, 3 limestone, 4 mosaic,
 * 5 outdoor, 6 bath & kitchen, 7 slabs, 8 quartz, 9 by-products,
 * 11 installation materials, 18 plasterboard.
 *
 * NOT: Bu liste editoryal bir kisit. Bir kategoride ilgili veri hic yoksa
 * grup zaten bos gelip gizleniyor; buradaki liste "veri olsa bile
 * gostermeyelim" durumlari icin. Ornegin color listesinde 18
 * (plasterboard) yok.
 */
export const FILTER_AVAILABILITY: Record<FilterKey, number[] | null> = {
  color: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  finish: [1, 2, 3, 4, 8],
  edge: [2],
  material: [4, 7],
  style: [2],
  type: [5, 6, 9, 11, 18],
};

/** Bu kategoride bu filtre gosterilmeli mi? */
export function isFilterAvailable(
  key: FilterKey,
  categoryId: number,
): boolean {
  const allowed = FILTER_AVAILABILITY[key];
  return allowed === null || allowed.includes(categoryId);
}

/** Kategoride gosterilecek filtre boyutlari, tanimli sirayla. */
export function availableFilters(categoryId: number): FilterKey[] {
  return FILTER_KEYS.filter((key) => isFilterAvailable(key, categoryId));
}

/**
 * Secili filtreler: boyut -> deger listesi.
 *
 * Degerler string tutuluyor cunku `finish` numerik id'ye sahip degil
 * (MekmarCom_Finish tablosunda id yok, isim slug'i ile filtreleniyor);
 * digerleri numerik id ama URL'den string geliyor.
 */
export type ActiveFilters = Partial<Record<FilterKey, string[]>>;

/** Tek bir sorgu parametresini deger listesine cevirir. */
function parseValues(raw: unknown): string[] {
  const parts = Array.isArray(raw) ? raw : [raw];
  return parts
    .flatMap((part) => String(part ?? "").split(","))
    .map((v) => v.trim())
    .filter(Boolean)
    /* Ayni deger iki kez gelmesin (ornegin ?color=5&color=5). */
    .filter((v, i, all) => all.indexOf(v) === i)
    /* Ust sinir: URL'den gelen veri, SQL'e parametre sayisi olarak
       yansiyor — sinirsiz birakilmasin. */
    .slice(0, 20);
}

/**
 * URL sorgu dizesinden secili filtreleri okur.
 *
 * Kategoride gecerli olmayan boyutlar atiliyor: biri elle
 * `?edge=3` yazsa bile marble'da edge filtresi yok.
 */
export function readFilters(
  query: Record<string, any>,
  categoryId: number,
): ActiveFilters {
  const active: ActiveFilters = {};
  for (const key of FILTER_KEYS) {
    if (!isFilterAvailable(key, categoryId)) continue;
    const values = parseValues(query[key]);
    if (values.length) active[key] = values;
  }
  return active;
}

/** Secili filtrelerdeki toplam deger sayisi (rozet / "temizle" icin). */
export function countFilters(active: ActiveFilters): number {
  return FILTER_KEYS.reduce((sum, key) => sum + (active[key]?.length ?? 0), 0);
}

/**
 * Bir degeri acip kapatir ve yeni sorgu nesnesini dondurur.
 *
 * Digerleri korunuyor — "marble sectim, sonra blue sectim" akisinin
 * calismasi bununla saglaniyor.
 */
export function toggleFilter(
  active: ActiveFilters,
  key: FilterKey,
  value: string,
): Record<string, string> {
  const current = active[key] ?? [];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];

  const merged: ActiveFilters = { ...active, [key]: next };
  return toQuery(merged);
}

/** Secili filtreleri `?color=5,9&finish=polished` bicimine cevirir. */
export function toQuery(active: ActiveFilters): Record<string, string> {
  const query: Record<string, string> = {};
  for (const key of FILTER_KEYS) {
    const values = active[key];
    if (values?.length) query[key] = values.join(",");
  }
  return query;
}
