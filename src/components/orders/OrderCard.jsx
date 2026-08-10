import { formatUSD } from "@/utils/format";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { OrderItem } from "./OrderItem";

function formatOrderDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Fully-expanded order card — no "View Details" navigation.
 * All order information is shown inline:
 *   • Order ID + date + status
 *   • All purchased items (image, title, size, price)
 *   • Divider line
 *   • Subtotal / shipping / total
 *   • Customer delivery information
 */
export function OrderCard({ order }) {
  const items = order.items ?? [];
  const total = order.total ?? order.subtotal ?? 0;
  const hasCustomer = Boolean(order.customer?.name || order.customer?.address);

  return (
    <article
      className="rounded-[10px] border border-line bg-surface overflow-hidden"
      aria-label={`Order ${order.id}`}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5 border-b border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        {/* Left: ID + date */}
        <div className="min-w-0">
          <p className="font-mono text-[11.5px] font-semibold uppercase tracking-wider text-ink-soft">
            Order
          </p>
          <p className="mt-0.5 truncate font-mono text-[13px] font-bold">
            {order.id}
          </p>
          <p className="mt-0.5 font-mono text-[11.5px] text-ink-soft">
            {formatOrderDate(order.createdAt)}
          </p>
        </div>

        {/* Right: status badges */}
        <div className="flex flex-wrap items-center gap-2">
          {order.status && <StatusBadge value={order.status} />}
          {order.paymentStatus && (
            <StatusBadge value={order.paymentStatus} />
          )}
        </div>
      </div>

      {/* ── Items ──────────────────────────────────────────────── */}
      {items.length > 0 && (
        <div className="px-4 py-4 sm:px-5">
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-soft">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
          <ul className="divide-y divide-line" role="list">
            {items.map((item, idx) => (
              <OrderItem key={`${order.id}-${idx}`} item={item} index={idx} />
            ))}
          </ul>
        </div>
      )}

      {/* ── Totals ─────────────────────────────────────────────── */}
      <div className="border-t border-line px-4 py-4 sm:px-5">
        <dl className="space-y-1.5 font-mono text-[12.5px]">
          {order.subtotal != null && order.shipping != null && (
            <>
              <div className="flex items-center justify-between text-ink-soft">
                <dt>Subtotal</dt>
                <dd className="font-semibold tabular-nums">
                  {formatUSD(order.subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between text-ink-soft">
                <dt>Shipping</dt>
                <dd className="font-semibold">
                  {order.shipping === 0 ? "Free" : formatUSD(order.shipping)}
                </dd>
              </div>
            </>
          )}
          <div className="flex items-center justify-between border-t border-line pt-2.5 text-[14px]">
            <dt className="font-bold">Total</dt>
            <dd className="font-bold tabular-nums">{formatUSD(total)}</dd>
          </div>
        </dl>
      </div>

      {/* ── Delivery info (optional) ────────────────────────────── */}
      {hasCustomer && (
        <div className="border-t border-dashed border-line px-4 py-3.5 sm:px-5">
          <p className="mb-1 font-mono text-[10.5px] uppercase tracking-widest text-ink-soft">
            Delivery
          </p>
          <p className="text-[12.5px] leading-relaxed text-ink-soft">
            {[
              order.customer.name,
              order.customer.address,
              [order.customer.city, order.customer.state, order.customer.zip]
                .filter(Boolean)
                .join(", "),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      )}
    </article>
  );
}

export default OrderCard;
