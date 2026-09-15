import nodemailer from "nodemailer";

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Eksik ortam değişkeni: ${key}`);
  }
  return value;
};

export const MAIL_FROM = required("MAIL_USER");

export const mailTransporter = nodemailer.createTransport({
  host: "mail.mekmar.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_FROM,
    pass: required("MAIL_PASSWORD"),
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
