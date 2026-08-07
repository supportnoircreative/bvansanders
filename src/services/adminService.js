import PRODUCTS, { FEATURED_PRODUCTS } from "@/data/products";
import SEED_ORDERS from "@/data/orders";

const ADDED_KEY = "bvs-admin-products";
const EDITS_KEY = "bvs-admin-edits";
const DELETED_KEY = "bvs-admin-deleted";
const ORDERS_KEY = "bvs-admin-orders";

const SEED_IDS = new Set(PRODUCTS.map((product) => product.id));
const SEED_FEATURED_IDS = new Set(
  FEATURED_PRODUCTS.map((product) => product.id)
);

function read(key, fallback = []) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function mock(value, ms = 60) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * Unified mock catalog store. The static fixtures (data/products.js) are
 * the seed; admin edits, additions and deletions live in localStorage as
 * overrides layered on top. Both the admin panel and the frontend catalog
 * read the same effective product list, so changes are reflected on both
 * sides. Swap read/write for API calls when a backend lands.
 */
export const adminService = {
  getEffectiveProducts() {
    const added = read(ADDED_KEY, []);
    const edits = read(EDITS_KEY, {});
    const deleted = read(DELETED_KEY, []);
    const seed = PRODUCTS.filter(
      (product) => !deleted.includes(product.id)
    ).map((product) => edits[product.id] ?? product);
    return [...added, ...seed];
  },

  getEffectiveFeatured() {
    const all = this.getEffectiveProducts();
    const flagged = all.filter((product) => product.featured);
    const flaggedIds = new Set(flagged.map((product) => product.id));
    const seedFeatured = all.filter(
      (product) =>
        SEED_FEATURED_IDS.has(product.id) && !flaggedIds.has(product.id)
    );
    return [...flagged, ...seedFeatured];
  },

  async getProducts() {
    return mock(this.getEffectiveProducts());
  },

  async saveProduct(product) {
    if (SEED_IDS.has(product.id)) {
      const edits = read(EDITS_KEY, {});
      edits[product.id] = product;
      write(EDITS_KEY, edits);
    } else {
      const added = read(ADDED_KEY, []);
      const index = added.findIndex((item) => item.id === product.id);
      if (index === -1) {
        added.unshift(product);
      } else {
        added[index] = product;
      }
      write(ADDED_KEY, added);
    }
    return mock(product);
  },

  async deleteProduct(id) {
    if (SEED_IDS.has(id)) {
      const deleted = read(DELETED_KEY, []);
      write(DELETED_KEY, [...new Set([...deleted, id])]);
      const edits = read(EDITS_KEY, {});
      delete edits[id];
      write(EDITS_KEY, edits);
    } else {
      write(
        ADDED_KEY,
        read(ADDED_KEY).filter((item) => item.id !== id)
      );
    }
    return mock(true);
  },

  async getOrders() {
    return mock(this.getEffectiveOrders());
  },

  getEffectiveOrders() {
    return [...read(ORDERS_KEY, []), ...SEED_ORDERS];
  },

  async saveOrder(order) {
    const orders = read(ORDERS_KEY);
    orders.unshift(order);
    write(ORDERS_KEY, orders);
    return mock(order);
  },

  async updateOrderStatus(id, status) {
    const orders = read(ORDERS_KEY).map((order) =>
      order.id === id ? { ...order, status } : order
    );
    write(ORDERS_KEY, orders);
    return mock(true);
  },
};

export default adminService;