import Stripe from "stripe";
import { verifyIdToken, fetchProductsById } from "@/services/firebase/rest";
import { CHECKOUT } from "@/constants/navigation";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe is not configured yet.");
  }
  return new Stripe(secretKey);
}

function toCents(price) {
  return Math.round((Number(price) || 0) * 100);
}

function itemDescription(item) {
  const parts = [];
  if (item.size) parts.push(String(item.size));
  if (item.sizeValue != null && item.sizeUnit) {
    parts.push(`${item.sizeValue} ${item.sizeUnit}`);
  }
  if (item.frameLabel) parts.push(String(item.frameLabel));
  if (item.kind) parts.push(String(item.kind));
  else if (item.category) parts.push(String(item.category));
  return parts.filter(Boolean).join(" · ");
}

function jsonError(message, status) {
  return Response.json({ error: message }, { status });
}

/**
 * Create a Stripe Checkout Session for a pending order. The Firebase ID
 * token is verified server-side, and catalog prices are re-checked so a
 * client can't tamper with what it pays.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  const { orderId, items, customer, userId, idToken } = body ?? {};

  const uid = await verifyIdToken(idToken);
  if (!uid || uid !== userId) {
    return jsonError("You must be signed in to check out.", 401);
  }
  if (!orderId) {
    return jsonError("Order reference is missing.", 400);
  }
  if (!Array.isArray(items) || items.length === 0) {
    return jsonError("Your cart is empty.", 400);
  }
  if (!customer?.name || !customer?.email || !customer?.address) {
    return jsonError("Shipping details are required.", 400);
  }

  const catalog = await fetchProductsById(items.map((item) => item.id));
  for (const item of items) {
    const catalogItem = catalog.get(item.id);
    if (catalogItem && catalogItem.price !== (Number(item.price) || 0)) {
      return jsonError(
        "Some prices changed — please refresh your cart and try again.",
        409
      );
    }
  }

  const origin = new URL(request.url).origin;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: toCents(item.price),
          product_data: {
            name: item.title || "Artwork",
            description: itemDescription(item),
            ...(item.image ? { images: [item.image] } : {}),
          },
        },
      })),
      metadata: {
        orderId,
        userId,
        email: customer.email,
        name: customer.name,
      },
      customer_email: customer.email,
      client_reference_id: orderId,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: CHECKOUT.shipping,
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return Response.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("[stripe checkout]", error?.message ?? error);
    return jsonError("We couldn't start payment — please try again.", 500);
  }
}