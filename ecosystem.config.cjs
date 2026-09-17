module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '3000',
      /* "Get Price" giris kodlari surec belleginde tutuluyor (server/utils/loginCodes.ts).
         Birden fazla instance'ta kod bir surecte uretilip digerinde dogrulanamaz,
         bu yuzden tek surec calistiriyoruz. */
      exec_mode: 'fork',
      instances: 1,
      script: './.output/server/index.mjs'
    }
  ]
}
