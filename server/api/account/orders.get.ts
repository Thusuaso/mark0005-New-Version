import mssql from "mssql";
import api from "~/sql/api";

/**
 * Giris yapmis musterinin siparis gecmisi.
 *
 * Zincir: imzali oturum cerezi -> MusterilerTB.MailAdresi -> MusterilerTB.ID
 *         -> SiparislerTB.MusteriID -> SiparisUrunTB.SiparisNo
 *         -> UrunKartTB -> UrunlerTB / KategoriTB / YuzeyKenarTB / OlculerTB
 *
 * Guvenlik notlari:
 * - E-posta YALNIZCA imzali httpOnly cerezden okunur (bkz. server/utils/session.ts).
 *   Istemciden gelen hicbir parametre musteri secmek icin kullanilmaz.
 * - Tum sorgular parametreli; musteri ID'leri de parametre olarak baglanir.
 * - Ic bilgiler (AlisFiyati, UretimAciklama, Notlar, MekmarNot alanlari, komisyon,
 *   navlun vb.) bilerek secilmiyor; yalnizca musterinin kendi siparisine dair
 *   gorebilecegi alanlar donuyor.
 * - Fiyat alanlari (SatisFiyati, SatisToplam) da panelde gosterilmedigi icin
 *   bilerek secilmiyor ve yanita hic konmuyor.
 * - MusterilerTB'de MailAdresi alani "@", "null", "-" gibi bozuk degerler iceren
 *   kayitlar var (biri 48, biri 38 musteriye bagli). Oturumdaki e-posta giris
 *   akisinda gecerli e-posta formatindan geciyor, bu yuzden bu bozuk kayitlarla
 *   asla esitlenemez. Yine de burada da format kontrolu yapiliyor.
 * - Ayni e-posta birden fazla musteri kaydina bagliysa (ornegin ayni firmanin iki
 *   kaydi) hepsinin siparisleri birlestirilerek gosterilir.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ORDERS = 200;

export default defineEventHandler(async (event) => {
  const email = sessionEmail(event);
  if (!email || !EMAIL_RE.test(email)) {
    setResponseStatus(event, 401);
    return { ok: false, error: "unauthorized" };
  }

  const pool = await api;

  /* 1) Oturumdaki mail hangi musteri kayitlarina ait? (yetki dahil) */
  const rows = await findCustomerRows(pool, email, "ID, FirmaAdi");
  const ids: number[] = rows.map((r: any) => Number(r.ID));
  if (!ids.length) {
    /* Musteri kaydi yok veya MekmarSite = 0: veri gosterilmez. Yetkisi
       sonradan kapatilan musterinin elindeki oturum da buraya duser. */
    setResponseStatus(event, 403);
    return { ok: false, error: "no_access" };
  }

  const company = String(rows[0]?.FirmaAdi ?? "").trim();

  /* 2) Bu musterilerin siparisleri */
  const orderReq = pool.request();
  const idParams = ids.map((id, i) => {
    orderReq.input(`c${i}`, mssql.Int, id);
    return `@c${i}`;
  });

  const orders = await orderReq.query(
    `select top ${MAX_ORDERS}
            s.SiparisNo, s.SiparisTarihi, s.ProjeAdi, s.YuklemeTarihi,
            s.Eta, s.KonteynerNo, s.ToplamPalet, sd.Durum
       from SiparislerTB s
       left join SiparisDurumTB sd on sd.ID = s.SiparisDurumID
      where s.MusteriID in (${idParams.join(",")})
      order by s.SiparisTarihi desc, s.SiparisNo desc`,
  );

  if (!orders.recordset.length) {
    return { ok: true, company, orders: [] };
  }

  /* 3) Bu siparislerin urun satirlari */
  const orderNos: string[] = orders.recordset.map((r: any) =>
    String(r.SiparisNo),
  );
  const itemReq = pool.request();
  const noParams = orderNos.map((no, i) => {
    itemReq.input(`o${i}`, mssql.VarChar(100), no);
    return `@o${i}`;
  });

  const items = await itemReq.query(
    `select su.SiparisNo, su.SiraNo,
            u.UrunAdi, k.KategoriAdi, y.YuzeyIslemAdi,
            o.En, o.Boy, o.Kenar,
            su.UrunBirimID, b.BirimAdi, su.Miktar, su.KasaOlcusu
       from SiparisUrunTB su
       left join UrunKartTB uk on uk.ID = su.UrunKartID
       left join UrunlerTB u on u.ID = uk.UrunID
       left join KategoriTB k on k.ID = uk.KategoriID
       left join YuzeyKenarTB y on y.ID = uk.YuzeyID
       left join OlculerTB o on o.ID = uk.OlcuID
       left join UrunBirimTB b on b.ID = su.UrunBirimID
      where su.SiparisNo in (${noParams.join(",")})
      order by su.SiparisNo, su.SiraNo, su.ID`,
  );

  /* 4) Satirlari siparislere dagit */
  const num = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };
  const text = (v: unknown) => String(v ?? "").trim();
  const iso = (v: unknown) =>
    v instanceof Date && !Number.isNaN(v.valueOf())
      ? v.toISOString().slice(0, 10)
      : null;

  // "60,0" x "120,0" x "2,0" -> "60 x 120 x 2 cm"
  const size = (en: unknown, boy: unknown, kenar: unknown) => {
    const part = (v: unknown) => {
      const s = text(v).replace(",", ".");
      if (!s) return "";
      const n = Number(s);
      return Number.isFinite(n) ? String(Number(n.toFixed(2))) : s;
    };
    const parts = [part(en), part(boy), part(kenar)].filter(Boolean);
    return parts.length ? parts.join(" x ") + " cm" : "";
  };

  const byOrder = new Map<string, any[]>();
  for (const r of items.recordset as any[]) {
    const key = String(r.SiparisNo);
    if (!byOrder.has(key)) byOrder.set(key, []);
    byOrder.get(key)!.push({
      name: text(r.UrunAdi),
      category: text(r.KategoriAdi),
      finish: text(r.YuzeyIslemAdi),
      size: size(r.En, r.Boy, r.Kenar),
      crate: text(r.KasaOlcusu),
      /* UrunBirimTB: 1 Sqm, 2 Pcs, 3 Mt, 4 Ton, 5 Sqft. Miktar birime gore
         anlam degistirdigi icin arayuz dogru kolona yazabilsin diye ID de
         doniyor. Adet kolonu bilerek kullanilmiyor. */
      unit_id: num(r.UrunBirimID),
      unit: text(r.BirimAdi),
      quantity: num(r.Miktar),
    });
  }

  const list = (orders.recordset as any[]).map((r) => {
    const lines = byOrder.get(String(r.SiparisNo)) ?? [];
    return {
      order_no: text(r.SiparisNo),
      date: iso(r.SiparisTarihi),
      status: text(r.Durum),
      project: text(r.ProjeAdi),
      shipped_at: iso(r.YuklemeTarihi),
      eta: iso(r.Eta),
      container: text(r.KonteynerNo),
      pallets: num(r.ToplamPalet),
      items: lines,
    };
  });

  return { ok: true, company, orders: list };
});
