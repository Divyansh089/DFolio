import { Request, Response } from "express";
import { generateOTP, storeOTP, verifyOTP } from "../services/otpService.js";
import { generateOTPEmailHTML, generateOTPPlainText } from "../templates/emailTemplate.js";
import { sendEmail } from "../services/emailService.js";

export const sendOTPEmail = async (req: Request, res: Response) => {
  try {
    const { email, userName = "Friend" } = req.body;

    // Validate email
    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Generate OTP
    const otp = generateOTP(4);
    const expiryTime = parseInt(process.env.OTP_EXPIRY_TIME as string) || 120000;

    // Store OTP
    storeOTP(email, otp, expiryTime);

    // Email content
    const htmlContent = generateOTPEmailHTML(userName, otp);
    const plainTextContent = generateOTPPlainText(userName, otp);

    // Send email via Brevo
    const emailResult = await sendEmail({
      to: email,
      subject: "Email Verification - OTP Code",
      html: htmlContent,
      text: plainTextContent,
    });

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
        error: emailResult.error,
      });
    }

    return res.json({
      success: true,
      message: `OTP sent to ${email}. Check your email (also check spam folder).`,
      expiryTime,
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
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