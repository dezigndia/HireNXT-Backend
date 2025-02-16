export interface IMail {
    subject: string;
    templateName: string;
    toMail: string;
    data: any;
    text?: string;
    html?: string;
    cc?: string;
    bcc?: string;
    fromMail?: string;
    attachment?: any;
}