/* eslint-disable @typescript-eslint/no-var-requires */
const nodemailer = require('nodemailer');

export const transporter =  nodemailer.createTransport({
    pool: process.env.MAIL_POOL,
    host: String(process.env.MAIL_HOST),
    port: String(process.env.MAIL_PORT),
    secureConnection: process.env.MAIL_SECURE,
    requireTLS: process.env.MAIL_TLS,
    // service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
}, { from: process.env.EMAIL_SENDER})