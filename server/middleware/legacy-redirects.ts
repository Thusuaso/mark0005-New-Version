// server/middleware/legacy-redirects.ts
//
// mekmar.com Shopify'dayken uretilen URL'ler icin 301 yonlendirme.
// Harita server/data/redirects.json icinde: Shopify yolu -> eski Nuxt yolu.
//
// Anahtarlar percent-decode + kucuk harf + sondaki slash atilmis halde
// tutuluyor; gelen istek de ayni sekilde normalize ediliyor.

import redirects from '../data/redirects.json'
import retired from '../data/retired.json'

const MAP = redirects as Record<string, string>

// Siteden cikarilan ama veritabaninda duran sayfalar (alcipan kategorisi ve
// urunleri). Menuden, izgaradan ve sitemap'ten kaldirildilar; adresleri hala
// calisiyordu ve disaridan link/arama sonucu geliyordu.
//
// Shopify haritasindan AYRI tutuluyor: asagidaki desen filtresi yalnizca
// /products, /collections, /pages, /blogs yollarina bakiyor, bunlar ise
// sitenin kendi yollari ve o filtreye hic takilmiyorlar.
const RETIRED = retired as Record<string, string>

// Shopify'in dil onekleri (/en-tr/products/... gibi) ve /collections/x/products/y
// formu icin ikinci bir deneme yapiyoruz.
const SHOPIFY_LOCALE = /^\/[a-z]{2}(-[a-z]{2})?(?=\/)/i
const COLLECTION_PRODUCT = /^\/collections\/[^/]+(\/products\/.+)$/

function normalize(path: string): string {
  let p = path.split('?')[0].split('#')[0]
  try {
    p = decodeURIComponent(p)
  } catch {
    // bozuk encoding — ham haliyle devam
  }
  p = p.toLowerCase().replace(/\/+$/, '')
  return p || '/'
}

function lookup(path: string): string | undefined {
  const direct = MAP[path]
  if (direct) return direct

  const withoutLocale = path.replace(SHOPIFY_LOCALE, '')
  if (withoutLocale !== path && MAP[withoutLocale]) return MAP[withoutLocale]

  const m = COLLECTION_PRODUCT.exec(withoutLocale)
  if (m && MAP[m[1]]) return MAP[m[1]]

  return undefined
}

export default defineEventHandler((event) => {
  const path = normalize(event.path)

  // Once siteden cikarilan sayfalar.
  const retiredTarget = RETIRED[path]
  if (retiredTarget) {
    return sendRedirect(event, retiredTarget, 301)
  }

  // Sadece Shopify'dan miras kalan yol desenlerine bakiyoruz; geri kalan
  // istekler (asset, /api, normal sayfalar) hic map'e ugramadan geciyor.
  if (!/^\/(products|collections|pages|blogs)(\/|$)/.test(path.replace(SHOPIFY_LOCALE, ''))) {
    return
  }

  const target = lookup(path)
  if (target) {
    return sendRedirect(event, target, 301)
  }
})
