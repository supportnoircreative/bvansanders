export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  COMPLETED: "completed",
};

export const ORDER_STATUSES = Object.values(ORDER_STATUS).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
};