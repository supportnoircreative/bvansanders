/**
 * Contact/commission inquiries. Backend-ready stub.
 */
export const contactService = {
  async submit({ name, email, interest, message }) {
    return { name, email, interest, message, receivedAt: Date.now() };
  },
};

export default contactService;