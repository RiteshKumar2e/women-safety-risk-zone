import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email service error:', error.message);
    } else {
        console.log('✅ Email service ready');
    }
});

// Send OTP email
export const sendOTPEmail = async (email, otp, name) => {
    try {
        const mailOptions = {
            from: `"SafeZone AI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email - SafeZone AI',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #0f172a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
            .otp-box { background: #f8fafc; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0; }
            .otp-code { font-size: 32px; font-weight: 700; color: #2563eb; letter-spacing: 8px; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛡️ SafeZone AI</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Thank you for registering with SafeZone AI. To complete your registration, please verify your email address using the OTP below:</p>
              
              <div class="otp-box">
                <p style="margin: 0; font-size: 14px; color: #475569;">Your OTP Code</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">Valid for 10 minutes</p>
              </div>
              
              <p>If you didn't request this verification, please ignore this email.</p>
              
              <div class="footer">
                <p>© 2024 SafeZone AI. All rights reserved.</p>
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Send OTP email error:', error.message);
        throw error;
    }
};

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: `"SafeZone AI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to SafeZone AI',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #0f172a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛡️ Welcome to SafeZone AI</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Your account has been successfully verified!</p>
              <p>You can now access all features of SafeZone AI including:</p>
              <ul>
                <li>Real-time safety risk analysis</li>
                <li>Incident reporting and tracking</li>
                <li>Safe route recommendations</li>
                <li>Community safety insights</li>
              </ul>
              <p>Thank you for joining us in making our communities safer.</p>
            </div>
          </div>
        </body>
        </html>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Send welcome email error:', error.message);
        throw error;
    }
};

export default { sendOTPEmail, sendWelcomeEmail };
