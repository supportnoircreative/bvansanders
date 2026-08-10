import { Resend } from "resend";
import { OrderConfirmationEmail, getOrderConfirmationText } from "@/emails/templates/OrderConfirmationEmail";
import { OrderStatusEmail, getOrderStatusText } from "@/emails/templates/OrderStatusEmail";
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

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

/**
 * EmailService — Centralized, server-side transactional email service using Resend.
 * Keeps API keys and Resend instance strictly on the server.
 */
export const EmailService = {
  /**
   * Generic email sender wrapper.
   */
  async sendEmail({ to, subject, react, text }) {
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
   * Send Order Confirmation email after successful payment.
   */
  async sendOrderConfirmation(order) {
    if (!order) {
      return { success: false, error: "Order object is required." };
    }

    const recipientEmail = order.customer?.email;
    if (!recipientEmail) {
      console.warn(`[EmailService] Order ${order.id} has no customer email.`);
      return { success: false, error: "Customer email is missing." };
    }

    const appUrl = getAppUrl();
    const subject = `Order Confirmed — #${order.id} | B. Van Sanders`;

    return this.sendEmail({
      to: recipientEmail,
      subject,
      react: OrderConfirmationEmail({ order, appUrl }),
      text: getOrderConfirmationText(order, appUrl),
    });
  },

  /**
   * Send Order Status Update email.
   */
  async sendStatusUpdate(order, newStatus) {
    if (!order) {
      return { success: false, error: "Order object is required." };
    }

    const recipientEmail = order.customer?.email;
    if (!recipientEmail) {
      return { success: false, error: "Customer email is missing." };
    }

    const appUrl = getAppUrl();
    const statusFormatted = (newStatus || order.status || "processing").toUpperCase();
    const subject = `Order Update: ${statusFormatted} — #${order.id} | B. Van Sanders`;

    return this.sendEmail({
      to: recipientEmail,
      subject,
      react: OrderStatusEmail({ order, status: newStatus, appUrl }),
      text: getOrderStatusText(order, newStatus, appUrl),
    });
  },

  /**
   * Send Contact Inquiry notification to studio & auto-reply to customer.
   */
  async sendContactInquiry({ name, email, interest, message, item, itemSize }) {
    if (!email || !name) {
      return { success: false, error: "Name and email are required." };
    }

    const studioEmail = process.env.CONTACT_EMAIL || "bvansanders@gmail.com";
    const itemLabel = item ? (itemSize ? `${item} — ${itemSize}` : item) : null;

    // 1. Send Notification Email to Studio Owner
    const studioResult = await this.sendEmail({
      to: studioEmail,
      subject: `New Inquiry: ${interest}${itemLabel ? ` — ${itemLabel}` : ""} — ${name}`,
      react: ContactInquiryEmail({ name, email, interest, message, item, itemSize, isNotification: true }),
      text: getContactInquiryText({ name, email, interest, message, item, itemSize, isNotification: true }),
    });

    // 2. Send Auto-Confirmation Email to Customer
    const customerResult = await this.sendEmail({
      to: email,
      subject: `We've received your inquiry — B. Van Sanders`,
      react: ContactInquiryEmail({ name, email, interest, message, item, itemSize, isNotification: false }),
      text: getContactInquiryText({ name, email, interest, message, item, itemSize, isNotification: false }),
    });

    return {
      success: studioResult.success || customerResult.success,
      studioEmailId: studioResult.id,
      customerEmailId: customerResult.id,
    };
  },

  /**
   * Development helper to send a test email.
   */
  async sendTestEmail({ to, type = "confirmation" }) {
    const sampleOrder = {
      id: "TEST-1024",
      createdAt: new Date().toISOString(),
      customer: {
        name: "Test Customer",
        email: to,
        address: "123 Studio Gallery Way",
        city: "Denver",
        state: "CO",
        zip: "80202",
      },
      items: [
        {
          id: "p1",
          title: "Neon Dreams Original Painting",
          price: 1200,
          size: '24" × 36"',
          frameLabel: "Original Painting",
        },
        {
          id: "p2",
          title: "Churros Pop Culture Print",
          price: 350,
          size: '12" × 18"',
          frameLabel: "Archival Print",
        },
      ],
      subtotal: 1550,
      shipping: 0,
      total: 1550,
      paymentStatus: "paid",
      status: "pending",
    };

    if (type === "status") {
      return this.sendStatusUpdate(sampleOrder, "shipped");
    }
    return this.sendOrderConfirmation(sampleOrder);
  },
};

export default EmailService;
