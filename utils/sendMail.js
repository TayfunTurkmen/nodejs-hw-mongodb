import nodemailer from 'nodemailer';
import { env } from './env.js';

export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port: env('SMTP_PORT'),
    auth: {
      user: env('SMTP_USER'),
      pass: env('SMTP_PASSWORD'),
    },
  });

  try {
    await transporter.verify();
    console.log('SMTP connection is valid');
  } catch (error) {
    console.log('SMTP connection is invalid', error);
    throw new Error('SMTP connection is invalid');
  }

  return await transporter.sendMail(options);
};
