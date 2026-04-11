import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root directory
const envPath = path.resolve(__dirname, "../.env");
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn(" Error loading .env:", result.error);
} else if (result.parsed) {
  // Explicitly set parsed variables to process.env
  Object.assign(process.env, result.parsed);
}

// Initialize app after env vars are loaded
(async () => {
  const { sendOTPEmail, verifyOTPEmail } = await import("./routes/otpRoutes.js");

  const app = express();
  const PORT = process.env.SERVER_PORT || process.env.VITE_SERVER_PORT || 5000;
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";

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

  // 404 Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Endpoint not found" });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Frontend URL: ${FRONTEND_URL}`);
    console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
  });
})();
