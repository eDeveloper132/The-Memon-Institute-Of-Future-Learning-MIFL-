/**
 * Professional HTML Email Templates for MIFL
 */

const primaryColor = '#2563eb';
const secondaryColor = '#1e40af';
const backgroundColor = '#f8fafc';
const textColor = '#1e293b';
const lightTextColor = '#64748b';

const baseStyles = `
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: ${textColor}; background-color: ${backgroundColor}; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background-color: ${primaryColor}; padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; }
    .content { padding: 40px; }
    .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: ${lightTextColor}; }
    .button { display: inline-block; padding: 14px 28px; background-color: ${primaryColor}; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; transition: background-color 0.3s; }
    .button:hover { background-color: ${secondaryColor}; }
    .info-box { background-color: #f0f9ff; border-left: 4px solid ${primaryColor}; padding: 15px; margin: 20px 0; font-size: 14px; }
`;

export const emailTemplates = {
    /**
     * Signup Verification Email
     */
    verification: (name: string, url: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>MIFL System</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">Welcome, ${name}!</h2>
                    <p>Thank you for joining the <strong>MIFL Educational Management System</strong>. We're excited to have you on board!</p>
                    <p>To complete your registration and secure your account, please verify your email address by clicking the button below:</p>
                    <div style="text-align: center;">
                        <a href="${url}" class="button">Verify Email Address</a>
                    </div>
                    <div class="info-box">
                        <p><strong>Security Note:</strong> This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
                    </div>
                    <p>Best regards,<br>The MIFL Team</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.<br>
                    This is an automated message, please do not reply.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Password Reset Email
     */
    passwordReset: (url: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>MIFL Security</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">Reset Your Password</h2>
                    <p>We received a request to reset the password for your MIFL account.</p>
                    <p>Click the button below to choose a new password:</p>
                    <div style="text-align: center;">
                        <a href="${url}" class="button">Reset Password</a>
                    </div>
                    <div class="info-box" style="border-left-color: #ef4444; background-color: #fef2f2;">
                        <p><strong>Warning:</strong> This link is valid for 1 hour only. If you did not request this, please ignore this email or contact support if you have concerns.</p>
                    </div>
                    <p>For your security, never share this link with anyone.</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Email Change - Intent Confirmation (Current Email)
     */
    emailChangeIntent: (url: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Account Security</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">Confirm Email Change Request</h2>
                    <p>A request has been made to change the email address associated with your MIFL account.</p>
                    <p>To protect your account, we need you to confirm this intent from your current email address:</p>
                    <div style="text-align: center;">
                        <a href="${url}" class="button">Confirm Change Request</a>
                    </div>
                    <p>If you did not initiate this change, please change your password immediately.</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Email Change - Verification (New Email)
     */
    emailChangeVerify: (url: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">Verify Your New Email</h2>
                    <p>You're almost there! Please verify this new email address to complete the update for your MIFL account.</p>
                    <div style="text-align: center;">
                        <a href="${url}" class="button">Verify New Email</a>
                    </div>
                    <p>Once verified, this will become your primary login email.</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `
};
