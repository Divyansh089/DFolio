import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { generateOTP, storeOTP, verifyOTP, deleteOTP } from "../services/otpService";
import { generateOTPEmailHTML, generateOTPPlainText } from "../templates/emailTemplate";

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.VITE_SMTP_SERVICE,
  host: process.env.VITE_SMTP_HOST,
  port: parseInt(process.env.VITE_SMTP_PORT as string) || 465,
  secure: true,
  auth: {
    user: process.env.VITE_SMTP_USER,
    pass: process.env.VITE_SMTP_PASSWORD,
  },
});

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
    const expiryTime = parseInt(process.env.VITE_OTP_EXPIRY_TIME as string) || 120000;

    // Store OTP
    storeOTP(email, otp, expiryTime);

    // Email content
    const htmlContent = generateOTPEmailHTML(userName, otp);
    const plainTextContent = generateOTPPlainText(userName, otp);

    // Send email
    await transporter.sendMail({
      from: `${process.env.VITE_SMTP_FROM_NAME} <${process.env.VITE_SMTP_FROM_EMAIL}>`,
      to: email,
      subject: "Email Verification - OTP Code",
      html: htmlContent,
      text: plainTextContent,
    });

    console.log(`✅ OTP sent to ${email}`);

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
      deleteOTP(email); // Clear OTP after successful verification
      console.log(`✅ OTP verified for ${email}`);
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
