export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

interface BrevoResponse {
  messageId?: string;
  message?: string;
}

/**
 * Sends an email using Brevo REST API
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
    console.log("🔑 [emailService] Checking BREVO_API_KEY...");
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not configured");
    }
    console.log("✅ [emailService] BREVO_API_KEY found");

    const fromEmail = process.env.SMTP_FROM_EMAIL;
    const fromName = process.env.SMTP_FROM_NAME || "Folio";

    console.log("📬 [emailService] From config:", { fromEmail, fromName });

    if (!fromEmail) {
      throw new Error("SMTP_FROM_EMAIL is not configured");
    }

    console.log("🚀 [emailService] Sending email via Brevo...");

    const emailPayload: Record<string, unknown> = {
      sender: {
        name: fromName,
        email: fromEmail,
      },
      to: [
        {
          email: options.to,
        },
      ],
      subject: options.subject,
      htmlContent: options.html,
      textContent: options.text,
    };

    // Add replyTo if provided
    if (options.replyTo) {
      emailPayload.replyTo = {
        email: options.replyTo,
      };
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = (await response.json()) as BrevoResponse;
    console.log("📮 [emailService] Brevo response:", responseData);

    if (!response.ok) {
      console.error("❌ [emailService] Brevo error:", responseData);
      throw new Error(
        responseData.message || `Brevo API error: ${response.status}`
      );
    }

    if (responseData.messageId) {
      console.log(
        "✅ [emailService] Email sent successfully, ID:",
        responseData.messageId
      );
      return {
        success: true,
        message: "Email sent successfully",
      };
    } else {
      throw new Error("No message ID returned from Brevo");
    }
  } catch (error) {
    console.error("❌ [emailService] Catch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: "Email service error",
      error: errorMessage,
    };
  }
};
