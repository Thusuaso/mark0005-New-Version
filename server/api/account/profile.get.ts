import mssql from "mssql";
import api from "~/sql/api";

/**
 * Panel verisi: musteri bilgileri + yil bazinda urun ozeti.
 *
 * Fiyat alani BILEREK donmuyor (ne SatisFiyati ne SatisToplam): panelde fiyat
 * gosterilmeyecek. Ic alanlar (AlisFiyati, Notlar, UretimAciklama vb.) da yok.
 *
 * "name" alani MusterilerTB.Unvan kolonundan geliyor ve oldugu gibi donuyor.
 * Bu kolon kayitlara gore kisi adi da ticari unvan da tasiyabildigi icin
 * ad/soyad diye bolunmuyor (bkz. server/utils/profileFields.ts).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event) => {
  const email = sessionEmail(event);
  if (!email || !EMAIL_RE.test(email)) {
    setResponseStatus(event, 401);
    return { ok: false, error: "unauthorized" };
  }

  const pool = await api;

  const rows = await findCustomerRows(
    pool,
    email,
    "ID, FirmaAdi, Unvan, Adres, Ulke, MailAdresi, Telefon, MusteriYeri",
  );
  if (!rows.length) {
    setResponseStatus(event, 403);
    return { ok: false, error: "no_customer" };
  }

  const text = (v: unknown) => String(v ?? "").trim();

  const profile = {
    company: text(rows[0].FirmaAdi),
    name: text(rows[0].Unvan),
    email: text(rows[0].MailAdresi),
    phone: text(rows[0].Telefon),
    address: text(rows[0].Adres),
    country: text(rows[0].Ulke),
    // Ayni mail birden fazla musteri kaydina bagliysa arayuz bunu bilsin
    records: rows.length,
  };

  /* Yil bazinda urun ozeti - fiyat yok */
  const sumReq = pool.request();
  const idParams = rows.map((r, i) => {
    sumReq.input(`c${i}`, mssql.Int, Number(r.ID));
    return `@c${i}`;
  });

  const summary = await sumReq.query(
    `select year(s.SiparisTarihi) as yil,
            u.UrunAdi, k.KategoriAdi, y.YuzeyIslemAdi,
            su.UrunBirimID, b.BirimAdi,
            sum(isnull(su.Miktar, 0)) as miktar,
            count(distinct s.SiparisNo) as siparis
       from SiparisUrunTB su
       join SiparislerTB s on s.SiparisNo = su.SiparisNo
       left join UrunKartTB uk on uk.ID = su.UrunKartID
       left join UrunlerTB u on u.ID = uk.UrunID
       left join KategoriTB k on k.ID = uk.KategoriID
       left join YuzeyKenarTB y on y.ID = uk.YuzeyID
       left join UrunBirimTB b on b.ID = su.UrunBirimID
      where s.MusteriID in (${idParams.join(",")})
        and s.SiparisTarihi is not null
      group by year(s.SiparisTarihi), u.UrunAdi, k.KategoriAdi,
               y.YuzeyIslemAdi, su.UrunBirimID, b.BirimAdi
      order by yil desc, sum(isnull(su.Miktar, 0)) desc`,
  );

  const num = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  /* Yillara grupla */
  const years = new Map<number, any>();
  for (const r of summary.recordset as any[]) {
    const yil = num(r.yil);
    if (!years.has(yil)) years.set(yil, { year: yil, items: [], orders: 0 });
    years.get(yil).items.push({
      name: text(r.UrunAdi),
      category: text(r.KategoriAdi),
      finish: text(r.YuzeyIslemAdi),
      /* UrunBirimTB: 1 Sqm, 2 Pcs, 3 Mt, 4 Ton, 5 Sqft. Panel miktari bu
         kimlige gore dogru kolona yaziyor, bu yuzden ad degil ID donuyor. */
      unit_id: num(r.UrunBirimID),
      unit: text(r.BirimAdi),
      quantity: num(r.miktar),
      orders: num(r.siparis),
    });
  }

  /* Yildaki tekil siparis sayisi, satir toplami degil */
  const orderCounts = await (async () => {
    const req = pool.request();
    const p = rows.map((r, i) => {
      req.input(`d${i}`, mssql.Int, Number(r.ID));
      return `@d${i}`;
    });
    const res = await req.query(
      `select year(SiparisTarihi) as yil, count(*) as siparis
         from SiparislerTB
        where MusteriID in (${p.join(",")}) and SiparisTarihi is not null
        group by year(SiparisTarihi)`,
    );
    const map = new Map<number, number>();
    for (const r of res.recordset as any[]) map.set(num(r.yil), num(r.siparis));
    return map;
  })();

  const list = [...years.values()]
    .map((y) => ({ ...y, orders: orderCounts.get(y.year) ?? 0 }))
    .sort((a, b) => b.year - a.year);

  return { ok: true, profile, years: list };
});
