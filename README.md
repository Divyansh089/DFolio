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

## 🚀 Getting Started

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

## 🎮 Running the Project

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

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Divyansh Patel**

- 🔗 [GitHub](https://github.com/Divyansh089)
- 🌐 [Portfolio](https://dfolio-portfolio.vercel.app)
