/**
 * Siparis gecmisi ozelligi icin gereken tablolarin kolonlarini listeler.
 *
 * Salt okunur: "where 1=0" ile hicbir satir cekilmez, yalnizca sorgu
 * sonucunun kolon metadata'si okunur. Hicbir yazma islemi yapilmaz.
 * (information_schema bu DB kullanicisina kapali oldugu icin bu yol secildi.)
 *
 * Kullanim:  node scripts/db-schema.cjs
 */
const fs = require("fs");
const path = require("path");
const mssql = require("mssql");

const TABLES = [
  "MusterilerTB",
  "SiparislerTB",
  "SiparisUrunTB",
  "SiparisUrunlerTB",
  "UrunKartTB",
  "UrunlerTB",
  "YuzeyIslemTB",
  "OlculerTB",
  "KategoriTB",
  "MekmarCom_Musteriler",
];

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

  for (const t of TABLES) {
    try {
      const r = await pool.request().query("select * from " + t + " where 1=0");
      const cols = Object.values(r.recordset.columns).sort(
        (a, b) => a.index - b.index,
      );
      const list = cols
        .map(
          (c) =>
            c.name +
            ":" +
            String(c.type && c.type.name).toLowerCase() +
            (c.length ? "(" + c.length + ")" : ""),
        )
        .join(", ");
      console.log("");
      console.log("=== " + t + " (" + cols.length + " kolon) ===");
      console.log(list);
    } catch (e) {
      console.log("");
      console.log(
        "=== " + t + " >>> OKUNAMADI: " + String(e.message).split("\n")[0],
      );
    }
  }

  await pool.close();
})().catch((e) => {
  console.error("HATA:", e.message);
  process.exit(1);
});
