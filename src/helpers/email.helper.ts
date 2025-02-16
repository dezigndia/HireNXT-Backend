import { IMail } from "@models";
import { transporter } from "config/email.config";
import {renderFile} from 'ejs';
import nodemailer, {SendMailOptions} from 'nodemailer';
import { join } from 'path';

export class MailHelper {
    private static instance: MailHelper;
    private emailDir: string = join(__dirname, '/../views');

    public static getInstance() {
        if (!MailHelper.instance) {
            MailHelper.instance = new MailHelper();
        }
        return MailHelper.instance;
    }

    
    //SEND MAIL
    public async sendMail(options: IMail): Promise<any> {
            options.data = options.data === undefined ? {} : options.data;
            options.data.domain_name = process.env.DOMAIN_NAME;
            options.data.DOMAIN_URL = process.env.APP_URL;
            options.data.LOGO = `${process.env.BASE_URL}/assets/logo.png`;
    
            options.html = await renderFile(`${this.emailDir}/${options.templateName}.ejs`, options.data);
    
            const mainOptions: SendMailOptions = {
                from: `"Sub prime connect" ${process.env.EMAIL_SENDER}`,
                to: options.toMail,
                subject: options.subject,
                html: options.html,
                cc: options.cc || [],
                bcc: options.bcc || [],
                attachments: options.attachment || []
            };
            const result = await transporter.sendMail(mainOptions);
            if(result) {
                console.log('Mail Sent: %s', result.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
            } else {
                console.log('mail error');
            }
            return result;
    }

    //VERIFY CONNECTION
    async verifyConnection() {
        return transporter.verify();
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return transporter;
    }
}