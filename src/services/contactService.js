import api from "./api";

/**
 * Contact/commission inquiries service. Sends message to backend /api/contact
 * which dispatches notification emails via Resend to studio & customer.
 */
export const contactService = {
  async submit({ name, email, interest, message }) {
    return api.post("/api/contact", { name, email, interest, message });
  },
};

export default contactService;