export const generateContactMessageEmailHTML = (
  senderName: string,
  senderEmail: string,
  senderLocation: string,
  message: string
): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 700px;
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
        .section-title {
          font-size: 14px;
          color: #667eea;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 25px;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .info-box {
          background-color: #f9f9f9;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 4px;
        }
        .info-label {
          font-size: 12px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .info-value {
          font-size: 15px;
          color: #333;
          font-weight: 500;
          word-break: break-all;
        }
        .message-box {
          background-color: #f0f4ff;
          border: 2px solid #667eea;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .message-content {
          font-size: 15px;
          color: #333;
          line-height: 1.8;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #999;
          border-top: 1px solid #eee;
        }
        .footer-note {
          font-size: 11px;
          color: #bbb;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📨 New Contact Message</h1>
        </div>
        <div class="content">
          <p style="font-size: 16px; margin: 0 0 20px 0;">You have received a new message from your portfolio contact form!</p>

          <div class="section-title">Sender Information</div>
          
          <div class="info-box">
            <div class="info-label">Name</div>
            <div class="info-value">${senderName}</div>
          </div>

          <div class="info-box">
            <div class="info-label">Email Address</div>
            <div class="info-value">${senderEmail}</div>
          </div>

          <div class="info-box">
            <div class="info-label">Location</div>
            <div class="info-value">${senderLocation || 'Not provided'}</div>
          </div>

          <div class="section-title">Message</div>
          <div class="message-box">
            <div class="message-content">${message}</div>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="font-size: 13px; color: #666; margin: 15px 0;">
            <strong>Quick Actions:</strong><br>
            Reply to this email to respond directly to ${senderName} (${senderEmail})
          </p>
        </div>
        <div class="footer">
          <p>&copy; 2025 Divyansh Patel Portfolio. All rights reserved.</p>
          <div class="footer-note">This is an automated notification from your portfolio contact form.</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateContactMessagePlainText = (
  senderName: string,
  senderEmail: string,
  senderLocation: string,
  message: string
): string => {
  return `
NEW CONTACT MESSAGE
===================

You have received a new message from your portfolio contact form!

SENDER INFORMATION
------------------
Name: ${senderName}
Email: ${senderEmail}
Location: ${senderLocation || 'Not provided'}

MESSAGE
-------
${message}

---
This is an automated notification from your portfolio contact form.
© 2025 Divyansh Patel Portfolio. All rights reserved.
  `.trim();
};
