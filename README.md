# DFolio - Professional Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, and GSAP animations. Features email verification, contact messaging, and blockchain development showcases.

**Repository**: [Divyansh089/DFolio](https://github.com/Divyansh089/DFolio)  
**Live Demo**: [DFolio Portfolio](https://dfolio-portfolio.vercel.app)

---

## 🎯 Project Overview

DFolio is a professional portfolio website for **Divyansh Patel**, a Computer Science undergraduate specializing in Blockchain Technology and Full-Stack Development. The site showcases projects, skills, experience, certifications, and includes an interactive contact system with OTP-based email verification.

### Key Highlights:

- ✨ **Smooth Animations**: GSAP-powered scroll triggers and transitions
- 🔐 **Email Verification**: OTP-based contact form security
- 💌 **Contact System**: Automated email notifications via SMTP
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎉 **Success Animations**: Confetti celebration effects on message send
- ⚡ **Performance**: Optimized builds with Vite

---

## 🏗️ Project Structure

```
folio/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Landing section with hero animation
│   │   ├── About.tsx             # About section with stats
│   │   ├── Skills.tsx            # Technical skills showcase
│   │   ├── Projects.tsx          # Project portfolio grid
│   │   ├── Experience.tsx        # Work experience timeline
│   │   ├── Certifications.tsx    # Certifications & achievements
│   │   ├── Contact.tsx           # Contact form with OTP verification
│   │   ├── Navbar.tsx            # Navigation header
│   │   ├── Footer.tsx            # Footer with social links & scroll-to-top
│   │   └── ui/                   # shadcn-ui components
│   ├── pages/
│   │   ├── Index.tsx             # Main portfolio page
│   │   └── NotFound.tsx          # 404 page
│   ├── data/
│   │   └── resumeData.ts         # Portfolio content (skills, projects, etc)
│   ├── hooks/
│   │   ├── useScrollAnimation.ts # Scroll trigger animations
│   │   ├── useTypingAnimation.ts # Typing effect hook
│   │   ├── useBlockchainAnimation.ts # Blockchain visual effects
│   │   └── use-mobile.tsx        # Mobile detection
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles
│
├── server/
│   ├── src/
│   │   ├── index.ts              # Express server entry
│   │   ├── routes/
│   │   │   ├── otpRoutes.ts      # OTP verification endpoints
│   │   │   └── messageRoute.ts   # Contact message endpoints
│   │   ├── services/
│   │   │   └── otpService.ts     # OTP generation & validation logic
│   │   └── templates/
│   │       ├── emailTemplate.ts  # OTP email templates
│   │       └── messageTemplate.ts# Contact email templates
│   ├── .env                      # Server environment variables
│   └── package.json              # Server dependencies
│
├── public/
│   ├── images/                   # Portfolio images
│   ├── svg/                      # SVG assets
│   └── certificate/              # Certificate images
│
├── vite.config.ts                # Vite build configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Frontend dependencies
```

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn-ui** - High-quality React components
- **GSAP** - Animation library for scroll effects & confetti
- **React Query** - Server state management
- **Zustand** - Client state management

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Nodemailer** - Email service
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Tools & Services

- **Gmail SMTP** - Email service provider
- **Vercel** - Frontend deployment
- **Git** - Version control

---

## ✨ Features

### 1. **Interactive Portfolio Sections**

- **Hero Section**: Eye-catching landing with tagline and social links
- **About Section**: Personal bio with competitive programming stats (LeetCode, Codeforces)
- **Skills Grid**: Categorized technical skills with icons and descriptions
- **Projects Showcase**: Featured blockchain and web development projects
- **Experience Timeline**: Professional work experience
- **Certifications**: Achievements and certifications display

### 2. **Contact System with OTP Verification**

- Email input with validation
- OTP-based verification (2-minute expiry)
- Auto-verify on 4-digit OTP entry
- Resend functionality after expiry
- Location auto-detection (with manual override)
- Smooth form state management

### 3. **Email Integration**

- **OTP Emails**: Beautifully styled HTML emails with OTP codes
- **Contact Messages**: Formatted email notifications sent to admin
- **Reply Configuration**: Set `replyTo` for direct email responses
- **Dual Format**: HTML and plain text fallbacks

### 4. **Animation Effects**

- **GSAP Scroll Triggers**: Fade-in animations as sections come into view
- **Confetti Celebration**: Colorful confetti burst on successful message send
- **Bouncing Success Message**: Large centered success notification
- **Smooth Transitions**: All UI interactions have fluid animations
- **Typing Effect**: Dynamic text animations in hero section

### 5. **User Experience**

- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode Compatible**: Themed with CSS variables
- **Scroll-to-Top**: Quick navigation button in footer
- **Form Validation**: Real-time error messages
- **Loading States**: Visual feedback during async operations
- **Success Feedback**: Celebratory animations and clear confirmations

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **bun**
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Divyansh089/DFolio.git
cd DFolio
```

2. **Install frontend dependencies**

```bash
npm install
# or
bun install
```

3. **Install backend dependencies**

```bash
cd server
npm install
# or
bun install
```

---

## 🔧 Environment Setup

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)

```env
# Server Configuration
NODE_ENV=development
SERVER_PORT=5000
FRONTEND_URL=http://localhost:8080

# SMTP Configuration (Gmail)
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM_NAME=Your Name
SMTP_FROM_EMAIL=your-email@gmail.com

# OTP Configuration
OTP_EXPIRY_TIME=120000
OTP_LENGTH=4
```

### Setting up Gmail SMTP

1. Enable 2-Step Verification in Google Account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Use the app password in `SMTP_PASSWORD`

---

## 🎮 Running the Project

### Development Mode

**Terminal 1 - Frontend**

```bash
npm run dev
# Running on http://localhost:8080
```

**Terminal 2 - Backend**

```bash
cd server
npm run dev
# Running on http://localhost:5000
```

### Production Build

**Frontend**

```bash
npm run build
npm run preview
```

**Backend**

```bash
cd server
npm run build
npm start
```

---

## 📡 API Endpoints

### OTP Verification

- **POST** `/api/send-otp`
  - Request: `{ email: string, userName: string }`
  - Response: `{ success: boolean, message: string, expiryTime: number }`

- **POST** `/api/verify-otp`
  - Request: `{ email: string, otp: string }`
  - Response: `{ success: boolean, message: string }`

### Contact Messages

- **POST** `/api/send-contact-message`
  - Request: `{ name: string, email: string, location: string, message: string }`
  - Response: `{ success: boolean, message: string }`

---

## 📦 Key Dependencies

### Frontend

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "gsap": "^3.x",
  "@tanstack/react-query": "^5.x",
  "zustand": "^4.x",
  "class-variance-authority": "^0.7.x",
  "tailwindcss": "^3.x"
}
```

### Backend

```json
{
  "express": "^4.18.2",
  "nodemailer": "^6.9.1",
  "cors": "^2.8.6",
  "dotenv": "^16.0.3",
  "typescript": "^5.0.0"
}
```

---

## 📋 Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Backend

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript

---

## 🎨 Customization

### Portfolio Content

Edit `src/data/resumeData.ts` to update:

- Personal information
- Skills and expertise
- Projects showcase
- Work experience
- Certifications
- Contact information

### Styling

- **Tailwind CSS**: Modify `tailwind.config.ts`
- **Colors**: Define in CSS variables
- **Animations**: Adjust GSAP timings in component files

### Email Templates

- OTP emails: `server/src/templates/emailTemplate.ts`
- Contact emails: `server/src/templates/messageTemplate.ts`

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Push to GitHub
git push origin main

# Deploy on Vercel
# Connect your GitHub repo to Vercel dashboard
# Set environment variables in Vercel settings
# Auto-deploys on push
```

### Backend (Render, Railway, or Heroku)

```bash
# Set environment variables
# Deploy the server/ directory
# Database (if needed) - configure in .env
```

---

## 📸 Features in Action

- **Contact Form**: Fill out name, email, location, message
- **OTP Verification**: Receive OTP via email, auto-verify on complete entry
- **Success Animation**: Confetti burst from both corners, success message display
- **Form Reset**: All fields cleared for next submission
- **Responsive**: Fully functional on mobile, tablet, and desktop

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Divyansh Patel**

- 🔗 [GitHub](https://github.com/Divyansh089)
- 💼 [LinkedIn](https://linkedin.com/in/divyansh-patel)
- 🌐 [Portfolio](https://dfolio-portfolio.vercel.app)

---

## 📞 Contact

For inquiries or feedback:

- 📧 Email: `your-email@example.com`
- 🐦 Use the contact form on the website
- 📱 Connect via social media links

---

## 🙏 Acknowledgments

- [shadcn-ui](https://ui.shadcn.com/) - Component library
- [GSAP](https://gsap.com/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool
- [Express.js](https://expressjs.com/) - Web framework
