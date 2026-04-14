import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { generateContactMessageEmailHTML, generateContactMessagePlainText } from "../templates/messageTemplate.js";

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, location, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const recipientEmail = process.env.SMTP_FROM_EMAIL;
    if (!recipientEmail) {
      return res.status(500).json({
        success: false,
        message: "Email service not configured properly",
      });
    }

    // Email content
    const htmlContent = generateContactMessageEmailHTML(name, email, location || "", message);
    const plainTextContent = generateContactMessagePlainText(name, email, location || "", message);

    // Send email to portfolio owner
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: htmlContent,
      text: plainTextContent,
    });

    console.log("Message sent successfully");
    return res.json({
      success: true,
      message: `Your message has been sent successfully! I'll get back to you soon.`,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
