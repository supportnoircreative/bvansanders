import api from "./api";
import { getCurrentUser } from "@/services/firebase/auth";

async function getIdToken() {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("You must be signed in to check out.");
  }
  return user.getIdToken();
}

/**
 * StripeService — Stripe Checkout from the client. Sessions are created
 * and verified by server routes (/api/stripe/*); the secret key never
 * reaches the browser.
 */
export const StripeService = {
  async createCheckoutSession({ orderId, items, customer, userId }) {
    return api.post("/api/stripe/checkout", {
      orderId,
      items,
      customer,
      userId,
      idToken: await getIdToken(),
    });
  },

  async getSessionStatus({ sessionId }) {
    return api.post("/api/stripe/session", {
      sessionId,
      idToken: await getIdToken(),
    });
  },
};

export default StripeService;