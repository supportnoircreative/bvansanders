import { EmailService } from "@/services/emailService";
import { orderRef, getDocument } from "@/services/firebase/firestore";
import { verifyIdToken } from "@/services/firebase/rest";

function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

/**
 * Trigger Order Status Update Email.
 * Accepts orderId, new status, and authentication token.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON request body." }, 400);
  }

  const { orderId, status, idToken, order: clientOrder } = body ?? {};

  if (!orderId || !status) {
    return jsonResponse({ error: "Order ID and status are required." }, 400);
  }

  if (idToken) {
    const uid = await verifyIdToken(idToken);
    if (!uid) {
      return jsonResponse({ error: "Unauthorized access." }, 401);
    }
  }

  let orderData = null;
  try {
    const docRef = orderRef(orderId);
    orderData = await getDocument(docRef);
  } catch (err) {
    console.error("[api/email/status-update] Error fetching order:", err);
  }

  const targetOrder = orderData || clientOrder;
  if (!targetOrder) {
    return jsonResponse({ error: "Order not found." }, 404);
  }

  const result = await EmailService.sendStatusUpdate(targetOrder, status);

  if (!result.success) {
    return jsonResponse({
      success: false,
      error: result.error || "Failed to send status email.",
    }, 500);
  }

  return jsonResponse({
    success: true,
    emailId: result.id,
    message: `Status update email (${status}) sent for order ${orderId}.`,
  });
}
