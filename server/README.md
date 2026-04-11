# Backend Server - OTP Email Verification

This is the backend server for the Folio portfolio with OTP-based email verification.

## 📋 Requirements

- Node.js 16+
- npm or yarn
- Valid SMTP credentials (Gmail or custom SMTP)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure SMTP

Update the `.env` file in the **project root** with your SMTP credentials:

```env
VITE_SMTP_SERVICE=gmail
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@gmail.com
VITE_SMTP_PASSWORD=your-app-password
VITE_SMTP_FROM_EMAIL=noreply@yourdomain.com
VITE_SMTP_FROM_NAME=Divyansh Patel

VITE_SERVER_PORT=5000
VITE_API_URL=http://localhost:5000/api
```

### 3. For Gmail Users

If using Gmail:

1. Enable 2-Factor Authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in `VITE_SMTP_PASSWORD`

### 4. Run Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### 5. Verify Server is Running

Open your browser and visit:

```
http://localhost:5000/api/health
```

You should see:

```json
{ "status": "Server is running" }
```

## 📝 API Endpoints

### Send OTP

**POST** `/api/send-otp`

```json
{
  "email": "user@example.com",
  "userName": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "OTP sent to user@example.com...",
  "expiryTime": 120000
}
```

### Verify OTP

**POST** `/api/verify-otp`

```json
{
  "email": "user@example.com",
  "otp": "1234"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email verified successfully!"
}
```

## 🔒 Security Notes

- OTP stores in-memory (development only)
- For production, use Redis or MongoDB
- OTP expires after 2 minutes
- Never share OTP with users outside email
- Use HTTPS in production

## 📦 Project Structure

```
server/
├── index.ts              # Main server file
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── routes/
│   └── otpRoutes.ts      # OTP API endpoints
├── services/
│   └── otpService.ts     # OTP logic
└── templates/
    └── emailTemplate.ts  # Email HTML/Text templates
```

## 🛠️ Build for Production

```bash
npm run build
npm start
```

## 📞 Support

For issues or questions, refer to the main project README.
