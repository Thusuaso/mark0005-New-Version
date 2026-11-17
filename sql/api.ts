import mssql from "mssql";

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Eksik ortam değişkeni: ${key}`);
  }
  return value;
};

const config: mssql.config = {
  user: required("DB_USER"),
  password: required("DB_PASSWORD"),
  database: required("DB_NAME"),
  server: required("DB_SERVER"),
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

/**
 * Veritabani havuzu.
 *
 * --- Neden tek satir degil ---
 * Onceden `const api = mssql.connect(config)` idi: havuz modul
 * yuklenirken BIR KEZ kuruluyor ve o promise sonsuza kadar
 * saklaniyordu. Baglanti bir kez koptugunda (uzak sunucu uzak, zaman
 * asimi gorulebiliyor) promise coktan cozulmus oldugu icin kimse
 * yeniden baglanmiyordu: o andan itibaren urun, kategori ve arama
 * iceren HER sayfa 500 donuyordu ve ancak surec yeniden
 * baslatilinca duzeliyordu. Gelistirme sirasinda bir kez tam olarak
 * bu yasandi ("Failed to connect to ...:1433 in 15000ms").
 *
 * Simdi: havuz saklaniyor ama SAGLIGI kontrol ediliyor. Baglanti
 * dusmusse ya da kurulum basarisiz olmussa saklanan deger atiliyor ve
 * bir sonraki istek yeni havuz kuruyor. Yani bir kopma tek bir istegi
 * etkiliyor, sureci degil.
 *
 * --- Cagiranlar degismiyor ---
 * Butun uclar `await api` ya da `(await api).query(...)` yaziyor. Bu
 * yuzden disari verilen sey yine `await` edilebilir bir sey: `then`
 * tasiyan bir nesne (thenable). Boylece 30'u askin dosyaya dokunmadan
 * yeniden baglanma eklenebildi.
 */
let pooled: Promise<mssql.ConnectionPool> | null = null;

function connect(): Promise<mssql.ConnectionPool> {
  const pool = new mssql.ConnectionPool(config);

  /* `current` asagida atanıyor; iki geri cagrim da ancak bu
     fonksiyon dondukten SONRA calisiyor, yani o an doludur. Amac
     "saklanan havuz hala BU mu" kontrolu: arada baskasi yeni havuz
     kurduysa onunkini silmemek icin. */
  let current: Promise<mssql.ConnectionPool>;

  const drop = () => {
    if (pooled === current) pooled = null;
  };

  /* Havuz calisirken kopan baglanti burada haber veriliyor. Dinleyici
     olmazsa mssql bunu yakalanmamis hata olarak firlatiyor. */
  pool.on("error", drop);

  /* Kurulum basarisizsa saklama: yoksa ilk basarisiz deneme kalici
     hale gelir ve sonraki istekler de ayni hatayi alir. */
  current = pool.connect().catch((error) => {
    drop();
    throw error;
  });

  return current;
}

function getPool(): Promise<mssql.ConnectionPool> {
  /* `connected` dusmusse (uzaktan kapanma, ag kesintisi) yeniden kur. */
  if (pooled) {
    return pooled.then((pool) =>
      pool.connected || pool.connecting ? pool : (pooled = connect()),
    );
  }
  return (pooled = connect());
}

const api: PromiseLike<mssql.ConnectionPool> = {
  then(onfulfilled, onrejected) {
    return getPool().then(onfulfilled, onrejected);
  },
};

export default api;
