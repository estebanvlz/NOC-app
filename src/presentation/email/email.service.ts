// Import the nodemailer library for sending emails
import nodemailer from 'nodemailer';
// Import the 'envs' object from the specified file containing environment variables
import { envs } from '../../config/plugins/envs.plugins';
// Import necessary classes and types from the domain layer
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

// Define the structure of options expected when sending an email
interface SendMailOptions {
    to: string | string[],     // The recipient email address or addresses
    subject: string,           // The subject of the email
    htmlBody: string,          // The HTML body content of the email
    attachments?: Attachment[],// Optional attachments for the email
}

// Define the structure of an email attachment
interface Attachment {
    filename: string,   // The filename of the attachment
    path: string,       // The file path of the attachment
}

// Todo: Attachments

// Define a class 'EmailService' responsible for sending emails
export class EmailService {

    // Create a nodemailer transporter with the provided email service, email, and secret key
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    // Asynchronously send an email using the provided options
    async sendEmail(options: SendMailOptions): Promise<boolean> {

        // Destructure the options object to extract 'to', 'subject', and 'htmlBody'
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            // Attempt to send the email using the transporter
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            // Create a log entity for a successful email sending operation
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email Sent',
                origin: 'email.service.ts',
            });

            // If the email is sent successfully, return true
            return true;
            
        } catch (error) {
            // Create a log entity for a failed email sending operation
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            });

            // If an error occurs during the email sending process, return false
            return false;
        }
    }

    // Asynchronously send an email with attachments containing system logs
    async sendEmailWithFileSystemLogs(to: string | string[]) {

        // Define the subject and HTML body of the email
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Revisa los logs verga</p>
            <p>Ver logs</p>
        `;

        // Define an array of attachments for the email, each with a filename and path
        const attachments: Attachment[] = [
            {filename: 'logs.all.log', path: './logs/logs-all.log'},
            {filename: 'logs.medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs.high.log', path: './logs/logs-high.log'},
        ];

        // Use the 'sendEmail' method to send the email with attachments
        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}
