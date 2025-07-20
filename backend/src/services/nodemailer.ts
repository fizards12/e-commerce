// src/Mailer.ts
import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class Mailer {
  private static instance: Mailer;
  private transporter: Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        pool: true,
        maxConnections: 5,
      } as nodemailer.TransportOptions,
      {
        from: process.env.EMAIL_FROM,
      }
    );

    // Verify on start (optional, can comment out)
    this.transporter.verify().then(() => {
      console.log('Mailer transporter is ready');
    }).catch((err) => {
      console.error('Mailer transporter failed to verify:', err);
    });
  }

  // Static method to get the singleton instance
  public static getInstance(): Mailer {
    if (!Mailer.instance) {
      Mailer.instance = new Mailer();
    }
    return Mailer.instance;
  }

  public async sendMail(options: Omit<SendMailOptions, 'from'>): Promise<SentMessageInfo> {
    return this.transporter.sendMail(options);
  }
}

export default Mailer;
