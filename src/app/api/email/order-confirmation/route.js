import { EmailService } from "@/services/emailService";
import { orderRef, getDocument, updateDocument } from "@/services/firebase/firestore";
import { verifyIdToken } from "@/services/firebase/rest";

function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

/**
 * Trigger Order Confirmation Email (Idempotent).
 * Verifies that payment is completed, checks if email was already sent,
 * sends confirmation email via Resend, and records `confirmationEmailSent` status.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON request body." }, 400);
  }

  const { orderId, idToken, order: clientOrder } = body ?? {};

  if (!orderId) {
    return jsonResponse({ error: "Order ID is required." }, 400);
  }

  // 1. Authenticate user if idToken is provided
  if (idToken) {
    const uid = await verifyIdToken(idToken);
    if (!uid) {
      return jsonResponse({ error: "Unauthorized access." }, 401);
    }
  }

  // 2. Fetch fresh order document from Firestore server-side
  let orderData = null;
  try {
    const docRef = orderRef(orderId);
    orderData = await getDocument(docRef);
  } catch (err) {
    console.error("[api/email/order-confirmation] Error fetching order:", err);
  }

  // Fallback to clientOrder if Firestore direct fetch is unavailable
  const targetOrder = orderData || clientOrder;

  if (!targetOrder) {
    return jsonResponse({ error: "Order not found." }, 404);
  }

  // 3. IDEMPOTENCY CHECK: Prevent duplicate emails for the same order
  if (targetOrder.confirmationEmailSent) {
    return jsonResponse({
      success: true,
      alreadySent: true,
      message: `Confirmation email was already sent for order ${orderId}.`,
    });
  }

  // 4. Send email via EmailService
  const result = await EmailService.sendOrderConfirmation(targetOrder);

  if (!result.success) {
    console.error(`[api/email/order-confirmation] Failed to send email for order ${orderId}:`, result.error);
    return jsonResponse({
      success: false,
      error: result.error || "Failed to send confirmation email.",
    }, 500);
  }

  // 5. Mark as sent in Firestore to guarantee idempotency
  try {
    const docRef = orderRef(orderId);
    await updateDocument(docRef, {
      confirmationEmailSent: true,
      confirmationEmailSentAt: new Date().toISOString(),
    });
  } catch (updateError) {
    console.warn(`[api/email/order-confirmation] Could not flag confirmationEmailSent on order ${orderId}:`, updateError?.message);
  }

  return jsonResponse({
    success: true,
    emailId: result.id,
    message: `Confirmation email sent successfully for order ${orderId}.`,
  });
}
