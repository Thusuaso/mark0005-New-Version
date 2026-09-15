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

const api = mssql.connect(config);

export default api;
