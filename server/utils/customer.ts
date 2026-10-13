import mssql from "mssql";

/**
 * Siteye erisebilen musteriyi bulmanin TEK yeri.
 *
 * Kosullar birlikte calisiyor:
 * 1. MailAdresi oturumdaki adrese esit.
 * 2. MailAdresi gercek bir mail formatinda. MusterilerTB'de "@", "null", "-"
 *    gibi bozuk degerler tasiyan kayitlar var (biri 48, biri 38 musteriye
 *    bagli); bu bariyer olmasa tek adresle onlarca firmanin verisi gorunurdu.
 * 3. MekmarSite = 1. Yetki ERP'den elle veriliyor; kolonun varsayilani 0,
 *    yani yeni musteri kendiliginden giris yapamaz.
 *
 * Bu kosul giris, siparis gecmisi ve profil uclarinin HEPSINDE kullanilmali.
 * Yalnizca girise koymak yetmez: yetkisi sonradan 0'a cekilen bir musterinin
 * elindeki gecerli oturum cerezi ile veri okumaya devam etmesi gerekir.
 */
export const CUSTOMER_WHERE = `lower(ltrim(rtrim(MailAdresi))) = @email
      and ltrim(rtrim(MailAdresi)) like '%_@_%._%'
      and MekmarSite = 1`;

/**
 * Verilen mail adresine ait, siteye erisim yetkisi olan musteri kayitlari.
 * `columns` cagiran tarafindan verilen sabit bir kolon listesi; kullanici
 * girdisi buraya gelmiyor (mail her zaman parametre olarak baglaniyor).
 */
export async function findCustomerRows(
  pool: mssql.ConnectionPool,
  email: string,
  columns = "ID",
): Promise<any[]> {
  const res = await pool
    .request()
    .input("email", mssql.VarChar(100), email)
    .query(
      `select ${columns} from MusterilerTB
        where ${CUSTOMER_WHERE}
        order by ID`,
    );
  return res.recordset as any[];
}
