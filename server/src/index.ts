import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";


if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// Initialize app after env vars are loaded
(async () => {
  try {
    console.log("🚀 [Server] Starting application...");
    console.log("🌍 [Server] Environment:", process.env.NODE_ENV || "development");
    console.log("🔑 [Server] API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("📬 [Server] From Email:", process.env.SMTP_FROM_EMAIL);

    console.log("📥 [Server] Importing route handlers...");
    const { sendOTPEmail, verifyOTPEmail } = await import("./routes/otpRoutes.js");
    const { sendContactMessage } = await import("./routes/messageRoute.js");
    console.log("✅ [Server] Routes imported successfully");

    const app = express();
    const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";

    console.log("⚙️ [Server] Configuration:", { PORT, FRONTEND_URL });

    // CORS Configuration
    const corsOptions = {
      origin: FRONTEND_URL,
      credentials: true,
      optionsSuccessStatus: 200,
    };

    console.log("🔒 [Server] CORS options:", corsOptions);

    // Middleware
    app.use(cors(corsOptions));
    app.use(express.json());
    console.log("✅ [Server] Middleware configured");

    // Health check endpoint
    app.get("/api/health", (req: Request, res: Response) => {
      console.log("💚 [Server] Health check called");
      res.json({ status: "Server is running", environment: process.env.NODE_ENV || "development" });
    });

    // OTP Endpoints
    console.log("📝 [Server] Registering OTP endpoints...");
    app.post("/api/send-otp", sendOTPEmail);
    app.post("/api/verify-otp", verifyOTPEmail);
    console.log("✅ [Server] OTP endpoints registered");

    // Contact Message Endpoint
    console.log("📝 [Server] Registering contact message endpoint...");
    app.post("/api/send-contact-message", sendContactMessage);
    console.log("✅ [Server] Contact message endpoint registered");

    // 404 Handler
    app.use((req: Request, res: Response) => {
      console.warn("⚠️ [Server] 404 - Endpoint not found:", req.method, req.path);
      res.status(404).json({ error: "Endpoint not found" });
    });

    // Start server
    app.listen(PORT, () => {
      const serverUrl = process.env.NODE_ENV === 'production' 
        ? 'https://dfolio.onrender.com'
        : `http://localhost:${PORT}`;
      console.log("═══════════════════════════════════════════");
      console.log("✅ Server is running on port", PORT);
      console.log("🌐 Server URL:", serverUrl);
      console.log("📱 Frontend URL:", FRONTEND_URL);
      console.log("🛠️  Environment:", process.env.NODE_ENV || "development");
      console.log("═══════════════════════════════════════════");
    });
  } catch (error) {
    console.error("❌ [Server] Failed to initialize server:", error);
    process.exit(1);
  }
})();
