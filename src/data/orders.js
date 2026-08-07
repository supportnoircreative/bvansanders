import PRODUCTS from "@/data/products";

function item(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function buildOrder({ id, daysAgo: days, status, customer, itemIds }) {
  const items = itemIds.map(item);
  const subtotal = items.reduce((sum, product) => sum + product.price, 0);
  return {
    id,
    items,
    customer,
    status,
    createdAt: daysAgo(days),
    subtotal,
    total: subtotal,
  };
}

/**
 * Seed orders shown in the admin panel until real checkout orders arrive.
 * Mirror the exact shape CheckoutForm persists so the order detail view
 * renders identically for both.
 */
export const SEED_ORDERS = [
  buildOrder({
    id: "ORD-2026-0041",
    daysAgo: 1,
    status: "pending",
    customer: {
      name: "Maya Chen",
      email: "maya.chen@example.com",
      address: "4120 Larimer Street, Apt 5B",
      city: "Denver",
      state: "CO",
      zip: "80205",
    },
    itemIds: ["static-bloom-original", "rerun-culture-print"],
  }),
  buildOrder({
    id: "ORD-2026-0040",
    daysAgo: 3,
    status: "processing",
    customer: {
      name: "Diego Ramírez",
      email: "diego.ramirez@example.com",
      address: "88 Market Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
    },
    itemIds: ["after-the-signal-print", "channel-bleed-print"],
  }),
  buildOrder({
    id: "ORD-2026-0039",
    daysAgo: 6,
    status: "shipped",
    customer: {
      name: "Sophie Lindqvist",
      email: "sophie.l@example.com",
      address: "12 Camden High Street",
      city: "London",
      state: "",
      zip: "NW1 0JH",
    },
    itemIds: ["neon-overload-print"],
  }),
  buildOrder({
    id: "ORD-2026-0038",
    daysAgo: 10,
    status: "completed",
    customer: {
      name: "James Okafor",
      email: "j.okafor@example.com",
      address: "450 West 15th Street",
      city: "New York",
      state: "NY",
      zip: "10011",
    },
    itemIds: ["corner-store-icon-original"],
  }),
  buildOrder({
    id: "ORD-2026-0037",
    daysAgo: 14,
    status: "completed",
    customer: {
      name: "Elena Petrova",
      email: "elena.petrova@example.com",
      address: "21 Arbat Street",
      city: "Moscow",
      state: "",
      zip: "119019",
    },
    itemIds: ["static-bloom-print", "neon-overload-print", "channel-bleed-print"],
  }),
];

export default SEED_ORDERS;