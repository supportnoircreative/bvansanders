/**
 * Newsletter service. Backend-ready stub.
 */
export const newsletterService = {
  async subscribe({ email }) {
    return { email, subscribed: true };
  },

  async unsubscribe({ email }) {
    return { email, unsubscribed: true };
  },
};

export default newsletterService;