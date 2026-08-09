import {
  ordersCollection,
  orderRef,
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  sortByNewest,
} from "@/services/firebase/firestore";
import { toFriendlyError, logError } from "@/services/firebase/errors";
import { ORDER_STATUS, ORDER_STATUSES, PAYMENT_STATUS } from "@/constants/orders";

const ORDER_FIELD = "createdAt";

function buildOrderData({ items, customer, userId }) {
  const orderItems = items.map((item) => ({
    productId: item.id,
    title: item.title,
    price: item.price,
    size: item.size ?? "",
    sizeValue: item.sizeValue ?? null,
    sizeUnit: item.sizeUnit ?? null,
    kind: item.kind ?? null,
    category: item.category ?? null,
    frameLabel: item.frameLabel ?? null,
    image: item.image ?? "",
  }));
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price || 0), 0);
  return {
    userId,
    customer: {
      name: customer.name,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
    },
    items: orderItems,
    subtotal,
    shipping: 0,
    total: subtotal,
    paymentStatus: PAYMENT_STATUS.PENDING,
    status: ORDER_STATUS.PENDING,
  };
}

function assertValidStatus(status) {
  if (!ORDER_STATUSES.some((option) => option.value === status)) {
    throw new Error(`Invalid order status: ${status}`);
  }
}

/**
 * OrderService — order lifecycle. Checkout writes orders here; the admin
 * panel reads and manages them. Ownership and privileged actions are
 * enforced by Firestore security rules, not by this code.
 */
export const OrderService = {
  async createOrder({ items, customer, userId }) {
    if (!userId) {
      throw new Error("You must be signed in to place an order.");
    }
    try {
      return await createDocument(
        ordersCollection,
        buildOrderData({ items, customer, userId })
      );
    } catch (error) {
      logError("OrderService.createOrder", error);
      throw toFriendlyError(error, "We couldn't place your order — please try again.");
    }
  },

  async getOrder(orderId) {
    try {
      return await getDocument(orderRef(orderId));
    } catch (error) {
      logError("OrderService.getOrder", error);
      throw toFriendlyError(error, "We couldn't load that order.");
    }
  },

  async getOrders() {
    try {
      return await getDocuments(ordersCollection, {
        orderByField: "createdAt",
        direction: "desc",
      });
    } catch (error) {
      logError("OrderService.getOrders", error);
      throw toFriendlyError(error, "We couldn't load orders.");
    }
  },

  async getOrdersByUser(userId) {
    try {
      const orders = await getDocuments(ordersCollection, {
        whereField: "userId",
        whereValue: userId,
      });
      return sortByNewest(orders);
    } catch (error) {
      logError("OrderService.getOrdersByUser", error);
      throw toFriendlyError(error, "We couldn't load your orders.");
    }
  },

  async updateOrderStatus(orderId, status) {
    assertValidStatus(status);
    try {
      return await updateDocument(orderRef(orderId), { status });
    } catch (error) {
      logError("OrderService.updateOrderStatus", error);
      throw toFriendlyError(error, "We couldn't update the order.");
    }
  },

  async deleteOrder(orderId) {
    try {
      await deleteDocument(orderRef(orderId));
    } catch (error) {
      logError("OrderService.deleteOrder", error);
      throw toFriendlyError(error, "We couldn't delete the order.");
    }
  },
};

export default OrderService;