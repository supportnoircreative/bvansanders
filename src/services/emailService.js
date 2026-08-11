import { Resend } from "resend";
import { ContactInquiryEmail, getContactInquiryText } from "@/emails/templates/ContactInquiryEmail";

let resendInstance = null;

function getResendInstance() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[EmailService] RESEND_API_KEY is missing. Email sending will be skipped.");
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || "B. Van Sanders <onboarding@resend.dev>";
}

/**
 * EmailService — Centralized, server-side email service using Resend.
 * Keeps API keys and Resend instance strictly on the server.
 */
export const EmailService = {
  /**
   * Generic email sender wrapper.
   */
  async sendEmail({ to, replyTo, subject, react, text }) {
    const resend = getResendInstance();
    if (!resend) {
      return { success: false, error: "Resend API key is not configured." };
    }

    if (!to) {
      return { success: false, error: "Recipient email is required." };
    }

    try {
      const from = getFromEmail();
      const payload = {
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        react,
        text,
      };

      if (replyTo) {
        payload.reply_to = replyTo;
      }

      const result = await resend.emails.send(payload);

      if (result.error) {
        console.error("[EmailService] Resend API error:", result.error.message);
        return { success: false, error: result.error.message };
      }

      console.log(`[EmailService] Email sent successfully to ${to} (ID: ${result.data?.id})`);
      return { success: true, id: result.data?.id };
    } catch (err) {
      console.error("[EmailService] Exception during email send:", err?.message ?? err);
      return { success: false, error: "Failed to send email." };
    }
  },

  /**
   * Send Contact Inquiry notification to studio with reply-to set to the
   * visitor's email so replies reach them directly.
   */
  async sendContactInquiry({ name, email, interest, message, item, itemSize }) {
    if (!email || !name) {
      return { success: false, error: "Name and email are required." };
    }

    const studioEmail = process.env.CONTACT_EMAIL || "bvansanders@gmail.com";
    const itemLabel = item ? (itemSize ? `${item} — ${itemSize}` : item) : null;

    const result = await this.sendEmail({
      to: studioEmail,
      replyTo: email,
      subject: `New Inquiry: ${interest}${itemLabel ? ` — ${itemLabel}` : ""} — ${name}`,
      react: ContactInquiryEmail({ name, email, interest, message, item, itemSize, isNotification: true }),
      text: getContactInquiryText({ name, email, interest, message, item, itemSize, isNotification: true }),
    });

    return {
      success: result.success,
      studioEmailId: result.id,
      error: result.error,
    };
  },
};

export default EmailService;