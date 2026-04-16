import { Resend } from "resend";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * Sends an email using Resend API
 * @param options - Email configuration object
 * @returns Success status and message
 */
export const sendEmail = async (options: EmailOptions): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> => {
  console.log("📧 [emailService] sendEmail called with options:", {
    to: options.to,
    subject: options.subject,
    hasHtml: !!options.html,
    hasText: !!options.text,
    replyTo: options.replyTo,
  });

  try {
    console.log("🔑 [emailService] Checking RESEND_API_KEY...");
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    console.log("✅ [emailService] RESEND_API_KEY found");

    console.log("📝 [emailService] Creating Resend instance...");
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const fromEmail = process.env.SMTP_FROM_EMAIL;
    const fromName = process.env.SMTP_FROM_NAME || "Folio";

    console.log("📬 [emailService] From config:", { fromEmail, fromName });

    if (!fromEmail) {
      throw new Error("SMTP_FROM_EMAIL is not configured");
    }

    console.log("🚀 [emailService] Sending email via Resend...");
    const response = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      ...(options.replyTo && { replyTo: options.replyTo }),
    });

    console.log("📮 [emailService] Resend response:", response);

    if (response.error) {
      console.error("❌ [emailService] Resend error:", response.error);
      return {
        success: false,
        message: "Failed to send email",
        error: response.error.message,
      };
    }

    console.log("✅ [emailService] Email sent successfully, ID:", response.id);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("❌ [emailService] Catch error:", error);
    return {
      success: false,
      message: "Email service error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
