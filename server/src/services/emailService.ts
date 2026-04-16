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
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not configured");
    }

    const fromEmail = process.env.SMTP_FROM_EMAIL;
    const fromName = process.env.SMTP_FROM_NAME || "Folio";

    if (!fromEmail) {
      throw new Error("SMTP_FROM_EMAIL is not configured");
    }

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

    if (!response.ok) {
      throw new Error(
        responseData.message || `Brevo API error: ${response.status}`
      );
    }

    if (responseData.messageId) {
      return {
        success: true,
        message: "Email sent successfully",
      };
    } else {
      throw new Error("No message ID returned from Brevo");
    }
  } catch (error) {
    console.error("❌ [emailService] Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: "Email service error",
      error: errorMessage,
    };
  }
};
