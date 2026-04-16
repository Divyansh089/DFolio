import { Request, Response } from "express";
import { generateContactMessageEmailHTML, generateContactMessagePlainText } from "../templates/messageTemplate.js";
import { sendEmail } from "../services/emailService.js";

export const sendContactMessage = async (req: Request, res: Response) => {
  console.log("📬 [messageRoute] POST /send-contact-message called");
  console.log("📋 [messageRoute] Request body:", req.body);

  try {
    const { name, email, location, message } = req.body;
    console.log("📝 [messageRoute] Extracted fields:", { name, email, location, messageLength: message?.length });

    // Validate inputs
    if (!name || !email || !message) {
      console.warn("⚠️ [messageRoute] Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields",
      });
    }

    if (!email.includes("@")) {
      console.warn("⚠️ [messageRoute] Invalid email format:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (message.trim().length === 0) {
      console.warn("⚠️ [messageRoute] Empty message content");
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const recipientEmail = process.env.SMTP_FROM_EMAIL;
    console.log("📬 [messageRoute] Recipient email:", recipientEmail);

    if (!recipientEmail) {
      console.error("❌ [messageRoute] SMTP_FROM_EMAIL not configured");
      return res.status(500).json({
        success: false,
        message: "Email service not configured properly",
      });
    }

    // Email content
    console.log("📄 [messageRoute] Generating email content...");
    const htmlContent = generateContactMessageEmailHTML(name, email, location || "", message);
    const plainTextContent = generateContactMessagePlainText(name, email, location || "", message);
    console.log("✅ [messageRoute] Email content generated");

    // Send email to portfolio owner via Resend
    console.log("📧 [messageRoute] Calling sendEmail service...");
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: `New Contact Message from ${name}`,
      html: htmlContent,
      text: plainTextContent,
      replyTo: email,
    });
    console.log("📬 [messageRoute] sendEmail result:", emailResult);

    if (!emailResult.success) {
      console.error("❌ [messageRoute] Email send failed:", emailResult);
      return res.status(500).json({
        success: false,
        message: "Failed to send message",
        error: emailResult.error,
      });
    }

    console.log("✅ [messageRoute] Contact message sent successfully to:", recipientEmail);
    return res.json({
      success: true,
      message: `Your message has been sent successfully! I'll get back to you soon.`,
    });

  } catch (error) {
    console.error("❌ [messageRoute] Catch error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
