export const generateOTPEmailHTML = (userName: string, otp: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px 20px;
        }
        .greeting {
          font-size: 16px;
          margin-bottom: 20px;
          color: #333;
        }
        .otp-section {
          background-color: #f9f9f9;
          border: 2px solid #667eea;
          border-radius: 8px;
          padding: 25px;
          text-align: center;
          margin: 25px 0;
        }
        .otp-title {
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        .otp-code {
          font-size: 36px;
          font-weight: 700;
          color: #667eea;
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
          margin: 15px 0;
        }
        .otp-expiry {
          font-size: 12px;
          color: #999;
          margin-top: 15px;
        }
        .description {
          font-size: 14px;
          color: #666;
          margin: 15px 0;
          line-height: 1.8;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #999;
          border-top: 1px solid #eee;
        }
        .warning {
          color: #e74c3c;
          font-size: 12px;
          margin-top: 15px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
        </div>
        <div class="content">
          <div class="greeting">
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Thank you for reaching out! To verify your email address and continue with your message, please use the verification code below:</p>
          </div>
          
          <div class="otp-section">
            <div class="otp-title">Your Verification Code</div>
            <div class="otp-code">${otp.split("").join(" ")}</div>
            <div class="otp-expiry">This code will expire in 2 minutes</div>
          </div>

          <div class="description">
            <p>If you didn't request this verification code, please ignore this email. Your account remains secure.</p>
          </div>

          <div class="warning">
            ⚠️ Never share this code with anyone. We will never ask for it.
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2025 Divyansh Patel Portfolio. All rights reserved.</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateOTPPlainText = (userName: string, otp: string): string => {
  return `
Hello ${userName},

Thank you for reaching out! To verify your email address and continue with your message, please use the verification code below:

Verification Code: ${otp}

This code will expire in 2 minutes.

If you didn't request this verification code, please ignore this email.

---
This is an automated message, please do not reply to this email.
© 2025 Divyansh Patel Portfolio. All rights reserved.
  `.trim();
};
