/**
 * MusterilerTB'ye MekmarSite bit kolonu ekler.
 *
 * Amac: siteye giris yetkisini ERP'den tek tek acabilmek. Varsayilan 0, yani
 * kolon eklendigi anda HICBIR musteri giris yapamaz; yetki verilecek musteri
 * ERP'de elle 1 yapilir.
 *
 * - Idempotent: kolon varsa hicbir sey yapmaz.
 * - Eklemeyi "not null default 0" ile yapar, boylece mevcut 645 satir da 0 olur.
 * - Kisitlama adlandirilmistir (DF_MusterilerTB_MekmarSite), geri almak icin:
 *     alter table MusterilerTB drop constraint DF_MusterilerTB_MekmarSite;
 *     alter table MusterilerTB drop column MekmarSite;
 *
 * Kullanim:  node scripts/db-add-mekmarsite.cjs
 */
const fs = require("fs");
const path = require("path");
const mssql = require("mssql");

const env = {};
for (const line of fs
  .readFileSync(path.join(__dirname, "..", ".env"), "utf8")
  .split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}

(async () => {
  const pool = await mssql.connect({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    server: env.DB_SERVER,
    options: { encrypt: false, trustServerCertificate: false },
  });

  const exists = await pool.request().query(`
    select count(*) as n from sys.columns
     where object_id = object_id('MusterilerTB') and name = 'MekmarSite'`);

  if (exists.recordset[0].n > 0) {
    console.log("MekmarSite kolonu zaten var, dokunulmadi.");
  } else {
    await pool.request().query(`
      alter table MusterilerTB
        add MekmarSite bit not null
            constraint DF_MusterilerTB_MekmarSite default 0`);
    console.log("MekmarSite kolonu eklendi (bit, not null, default 0).");
  }

  const after = await pool.request().query(`
    select
      count(*) as toplam,
      sum(case when MekmarSite = 1 then 1 else 0 end) as girebilen,
      sum(case when MekmarSite = 0 then 1 else 0 end) as giremeyen
    from MusterilerTB`);
  console.table(after.recordset);

  console.log(
    "\nYetki vermek icin ERP'de ilgili musterinin MekmarSite alanini 1 yap.",
  );

  await pool.close();
})().catch((e) => {
  console.error("HATA:", e.message);
  process.exit(1);
});
