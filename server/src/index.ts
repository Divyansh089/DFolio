import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";


if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// Initialize app after env vars are loaded
(async () => {
  try {
    const { sendOTPEmail, verifyOTPEmail } = await import("./routes/otpRoutes.js");
    const { sendContactMessage } = await import("./routes/messageRoute.js");

    const app = express();
    const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;
    const FRONTEND_URL = (process.env.FRONTEND_URL || "http://localhost:8080").replace(/\/$/, "");

    // CORS Configuration
    const corsOptions = {
      origin: FRONTEND_URL,
      credentials: true,
      optionsSuccessStatus: 200,
    };

    // Middleware
    app.use(cors(corsOptions));
    app.use(express.json());

    // Health check endpoint
    app.get("/api/health", (req: Request, res: Response) => {
      res.json({ status: "Server is running", environment: process.env.NODE_ENV || "development" });
    });

    // OTP Endpoints
    app.post("/api/send-otp", sendOTPEmail);
    app.post("/api/verify-otp", verifyOTPEmail);

    // Contact Message Endpoint
    app.post("/api/send-contact-message", sendContactMessage);

    // 404 Handler
    app.use((req: Request, res: Response) => {
      res.status(404).json({ error: "Endpoint not found" });
    });

    // Start server
    app.listen(PORT, () => {
      const serverUrl = process.env.NODE_ENV === 'production' 
        ? 'https://dfolio.onrender.com'
        : `http://localhost:${PORT}`;
      console.log(" Server is running on port", PORT);
      console.log(" Server URL:", serverUrl);
      console.log(" Frontend URL:", FRONTEND_URL);
      console.log("  Environment:", process.env.NODE_ENV || "development");
      
    });
  } catch (error) {
    console.error(" [Server] Failed to initialize server:", error);
    process.exit(1);
  }
})();
