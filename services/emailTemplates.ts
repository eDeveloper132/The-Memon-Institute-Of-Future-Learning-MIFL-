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
    .field-label { font-weight: bold; color: ${lightTextColor}; font-size: 12px; text-transform: uppercase; margin-top: 10px; display: block; }
    .field-value { font-weight: bold; color: ${textColor}; font-size: 16px; margin-bottom: 5px; }
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
     * Academic Updates (Assignments, Materials, etc.)
     */
    academicUpdate: (type: string, data: any) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>MIFL Academic</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">${type}</h2>
                    <p>Hello, a new academic update has been posted in your portal.</p>
                    
                    <span class="field-label">Title</span>
                    <div class="field-value">${data.title}</div>
                    
                    ${data.course ? `
                        <span class="field-label">Course</span>
                        <div class="field-value">${data.course}</div>
                    ` : ''}

                    ${data.dueDate ? `
                        <span class="field-label">Due Date</span>
                        <div class="field-value">${new Date(data.dueDate).toLocaleDateString()}</div>
                    ` : ''}

                    <div style="text-align: center;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/protected/index.html" class="button">View in Dashboard</a>
                    </div>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Attendance Alert
     */
    attendanceAlert: (childName: string, date: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header" style="background-color: #ef4444;">
                    <h1>MIFL Attendance</h1>
                </div>
                <div class="content">
                    <h2 style="color: #ef4444;">Absence Alert</h2>
                    <p>This is to inform you that <strong>${childName}</strong> was marked <strong>Absent</strong> for the session on <strong>${new Date(date).toLocaleDateString()}</strong>.</p>
                    
                    <p>If you have any questions or have already provided a justification, please ignore this alert.</p>

                    <div style="text-align: center;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/protected/parent/index.html" class="button" style="background-color: #ef4444;">View Records</a>
                    </div>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Finance Alert (Fees)
     */
    financeAlert: (type: string, data: any) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header" style="background-color: #f59e0b;">
                    <h1>MIFL Finance</h1>
                </div>
                <div class="content">
                    <h2 style="color: #f59e0b;">${type}</h2>
                    <p>A new financial transaction or update has been recorded on your account.</p>
                    
                    <span class="field-label">Description</span>
                    <div class="field-value">${data.description}</div>
                    
                    <span class="field-label">Amount</span>
                    <div class="field-value">PKR ${data.amount.toLocaleString()}</div>

                    ${data.dueDate ? `
                        <span class="field-label">Due Date</span>
                        <div class="field-value" style="color: #ef4444;">${new Date(data.dueDate).toLocaleDateString()}</div>
                    ` : ''}

                    <div style="text-align: center;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/protected/index.html" class="button" style="background-color: #f59e0b;">Manage Billing</a>
                    </div>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Offline Message Notification
     */
    offlineMessage: (senderName: string, preview: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header" style="background-color: #8b5cf6;">
                    <h1>MIFL Chat</h1>
                </div>
                <div class="content">
                    <h2 style="color: #8b5cf6;">New Message</h2>
                    <p>You received a new message from <strong>${senderName}</strong> while you were offline.</p>
                    
                    <div class="info-box" style="border-left-color: #8b5cf6; background-color: #f5f3ff; font-style: italic;">
                        "${preview}"
                    </div>

                    <div style="text-align: center;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/protected/messages.html" class="button" style="background-color: #8b5cf6;">Reply Now</a>
                    </div>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Admin System Alert
     */
    adminAlert: (title: string, content: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>MIFL Admin</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">System Alert</h2>
                    <p><strong>${title}</strong></p>
                    <p>${content}</p>
                    <div style="text-align: center;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/protected/admin/index.html" class="button">Go to Admin Panel</a>
                    </div>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Email Change Intent (Sent to old email)
     */
    emailChangeIntent: (url: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>MIFL Security</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">Email Change Request</h2>
                    <p>We received a request to change the email address for your MIFL account.</p>
                    <p>To proceed with this change, please click the button below to verify your current access:</p>
                    <div style="text-align: center;">
                        <a href="${url}" class="button">Verify Old Email</a>
                    </div>
                    <div class="info-box">
                        <p>If you did not request this change, please secure your account immediately by changing your password.</p>
                    </div>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `,

    /**
     * Email Change Verify (Sent to new email)
     */
    emailChangeVerify: (url: string) => `
        <!DOCTYPE html>
        <html>
        <head><style>${baseStyles}</style></head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>MIFL Verification</h1>
                </div>
                <div class="content">
                    <h2 style="color: ${primaryColor};">Verify Your New Email</h2>
                    <p>You are receiving this because this email was provided as the new address for an MIFL account.</p>
                    <p>Please click the button below to confirm this address and complete the update:</p>
                    <div style="text-align: center;">
                        <a href="${url}" class="button">Confirm New Email</a>
                    </div>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} MIFL System. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `
};
