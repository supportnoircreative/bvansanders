import Stripe from "stripe";
import { verifyIdToken } from "@/services/firebase/rest";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe is not configured yet.");
  }
  return new Stripe(secretKey);
}

function jsonError(message, status) {
  return Response.json({ error: message }, { status });
}

/**
 * Confirm a Checkout Session after the customer returns from Stripe.
 * Reports paid only when the session is genuinely paid and belongs to the
 * authenticated user, so the client can mark its order as paid.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  const { sessionId, idToken } = body ?? {};
  if (!sessionId || typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
    return jsonError("We couldn't verify your payment.", 400);
  }

  const uid = await verifyIdToken(idToken);
  if (!uid) {
    return jsonError("You must be signed in to verify payment.", 401);
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.metadata?.userId !== uid) {
      return jsonError("This payment doesn't belong to your account.", 403);
    }

    const paymentStatus = session.payment_status ?? "unpaid";
    return Response.json({
      paid: paymentStatus === "paid",
      paymentStatus,
      orderId: session.metadata?.orderId ?? null,
    });
  } catch (error) {
    console.error("[stripe session]", error?.message ?? error);
    return jsonError("We couldn't verify your payment — please try again.", 500);
  }
}