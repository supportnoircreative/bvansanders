/**
 * Order lifecycle. Backend-ready: components call these functions and
 * receive a resolved order once the API is wired in.
 */
export const orderService = {
  async createOrder({ items, customer }) {
    return {
      id: `ORD-${Date.now()}`,
      items,
      customer,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  },

  async cancelOrder(id) {
    return { id, status: "cancelled" };
  },

  async trackOrder(id) {
    return { id, status: "processing" };
  },

  async getOrders(userId) {
    return [];
  },
};

export default orderService;