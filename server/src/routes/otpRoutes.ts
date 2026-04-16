import { Request, Response } from "express";
import { generateOTP, storeOTP, verifyOTP } from "../services/otpService.js";
import { generateOTPEmailHTML, generateOTPPlainText } from "../templates/emailTemplate.js";
import { sendEmail } from "../services/emailService.js";

export const sendOTPEmail = async (req: Request, res: Response) => {
  console.log("📬 [otpRoutes] POST /send-otp called");
  console.log("📋 [otpRoutes] Request body:", req.body);

  try {
    const { email, userName = "Friend" } = req.body;
    console.log("✉️ [otpRoutes] Extracted email:", email, "userName:", userName);

    // Validate email
    if (!email || !email.includes("@")) {
      console.warn("⚠️ [otpRoutes] Invalid email:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Generate OTP
    console.log("🎲 [otpRoutes] Generating OTP...");
    const otp = generateOTP(4);
    console.log("✅ [otpRoutes] OTP generated:", otp);

    const expiryTime = parseInt(process.env.OTP_EXPIRY_TIME as string) || 120000;
    console.log("⏱️ [otpRoutes] Expiry time:", expiryTime, "ms");

    // Store OTP
    console.log("💾 [otpRoutes] Storing OTP...");
    storeOTP(email, otp, expiryTime);
    console.log("✅ [otpRoutes] OTP stored successfully");

    // Email content
    console.log("📄 [otpRoutes] Generating email content...");
    const htmlContent = generateOTPEmailHTML(userName, otp);
    const plainTextContent = generateOTPPlainText(userName, otp);
    console.log("✅ [otpRoutes] Email content generated");

    // Send email via Resend
    console.log("📧 [otpRoutes] Calling sendEmail service...");
    const emailResult = await sendEmail({
      to: email,
      subject: "Email Verification - OTP Code",
      html: htmlContent,
      text: plainTextContent,
    });
    console.log("📬 [otpRoutes] sendEmail result:", emailResult);

    if (!emailResult.success) {
      console.error("❌ [otpRoutes] Email send failed:", emailResult);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
        error: emailResult.error,
      });
    }

    console.log("✅ [otpRoutes] OTP email sent successfully to:", email);
    return res.json({
      success: true,
      message: `OTP sent to ${email}. Check your email (also check spam folder).`,
      expiryTime,
    });

  } catch (error) {
    console.error("❌ [otpRoutes] Catch error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const verifyOTPEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Verify OTP
    const isValid = verifyOTP(email, otp);

    if (isValid) {
      return res.json({
        success: true,
        message: "Email verified successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please try again.",
      });
    }

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Verification failed. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};