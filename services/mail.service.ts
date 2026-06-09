import nodemailer from 'nodemailer';
import chalk from 'chalk';

/**
 * Interface for email options
 */
export interface MailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

/**
 * Mail Service
 * Handles sending emails using Nodemailer
 */
class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Initialize the transporter with environment variables
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Defaulting to gmail, can be made configurable
            auth: {
                user: process.env.mail_name,
                pass: process.env.mail_pass,
            },
        });

        // Verify connection configuration
        this.verifyConnection();
    }

    /**
     * Verifies the SMTP connection
     */
    private async verifyConnection() {
        try {
            await this.transporter.verify();
            console.log(chalk.green('Mail service is ready to take messages'));
        } catch (error) {
            console.error(chalk.red('Mail service connection error:'), error);
        }
    }

    /**
     * Sends an email
     * @param options - Recipient, subject, and content
     */
    public async sendMail(options: MailOptions): Promise<void> {
        const fromEmail = process.env.mail_name || 'support@mifl.edu';
        try {
            console.log(chalk.blue(`[Mail] Attempting to send email to: ${options.to} (Subject: ${options.subject})`));
            
            const info = await this.transporter.sendMail({
                from: `"MIFL Support" <${fromEmail}>`,
                ...options,
            });
            
            console.log(chalk.green(`[Mail] Email sent successfully! MessageId: ${info.messageId}`));
        } catch (error: any) {
            console.error(chalk.red(`[Mail] Failed to send email to ${options.to}:`), error.message);
            // Log more details if available
            if (error.response) console.error(chalk.red(`[Mail] SMTP Response: ${error.response}`));
            throw error;
        }
    }

    /**
     * Sends a welcome email (Example template method)
     * @param to - Recipient email
     * @param name - User name
     */
    public async sendWelcomeEmail(to: string, name: string): Promise<void> {
        const html = `
            <h1>Welcome to MIFL, ${name}!</h1>
            <p>We're glad to have you on board.</p>
        `;
        await this.sendMail({ to, subject: 'Welcome to MIFL', html });
    }
}

export const mailService = new MailService();
