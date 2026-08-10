import api from "./api";

/**
 * Contact/commission inquiries service. Sends message to backend /api/contact
 * which dispatches notification emails via Resend to studio & customer.
 */
export const contactService = {
  async submit({ name, email, interest, message, item, itemSize }) {
    return api.post("/api/contact", { name, email, interest, message, item, itemSize });
  },
};

export default contactService;