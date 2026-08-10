"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatUSD } from "@/utils/format";
import { Spinner } from "@/components/loaders/Spinner";
import { StatusBadge } from "./StatusBadge";
import { ORDER_STATUSES } from "@/constants/orders";
import { cn } from "@/lib/cn";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function AdminOrderList({ orders, loading, onStatusChange }) {
  const [expandedId, setExpandedId] = useState(null);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[10px] border border-dashed border-line bg-surface">
        <Spinner size={28} color="var(--color-inked)" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-[10px] border border-dashed border-line bg-surface px-6 py-12 text-center">
        <p className="font-display mb-2 text-xl uppercase">No orders yet</p>
        <p className="text-sm text-ink-soft">
          Orders placed at checkout will appear here with full detail.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {orders.map((order) => {
        const isExpanded = expandedId === order.id;
        return (
          <li
            key={order.id}
            className="overflow-hidden rounded-[10px] border border-line bg-surface"
          >
            <button
              type="button"
              aria-expanded={isExpanded}
              onClick={() =>
                setExpandedId(isExpanded ? null : order.id)
              }
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12px] font-semibold">
                    {order.id}
                  </span>
                  <StatusBadge value={order.status} />
                  {order.paymentStatus && (
                    <StatusBadge value={order.paymentStatus} />
                  )}
                </div>
                <p className="mt-0.5 truncate text-[12.5px] text-ink-soft">
                  {order.customer?.name ?? "Guest"} · {order.customer?.email} ·{" "}
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <span className="font-mono text-[13.5px] font-bold">
                {formatUSD(order.total ?? order.subtotal ?? 0)}
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={cn(
                  "shrink-0 text-ink-soft transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {isExpanded && (
              <div className="border-t border-line px-4 py-4">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="font-mono mb-2 text-[10.5px] uppercase tracking-[0.15em] text-ink-soft">
                      Customer
                    </p>
                    <dl className="space-y-1 text-[13px]">
                      <dt className="font-semibold">
                        {order.customer?.name}
                      </dt>
                      <dd className="text-ink-soft">{order.customer?.email}</dd>
                      <dd className="pt-2 text-ink-soft">
                        {order.customer?.address}
                        <br />
                        {order.customer?.city}
                        {order.customer?.state ? `, ${order.customer.state}` : ""}{" "}
                        {order.customer?.zip}
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <p className="font-mono mb-2 text-[10.5px] uppercase tracking-[0.15em] text-ink-soft">
                      Items
                    </p>
                    <ul className="space-y-1.5">
                      {order.items?.map((item, index) => (
                        <li
                          key={`${order.id}-${item.id}-${index}`}
                          className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[13px]"
                        >
                          <span className="min-w-0">
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-ink-soft">
                              {" "}
                              · {item.sizeValue ? `${item.sizeValue} ${item.sizeUnit}` : item.size} ·{" "}
                              {item.kind ?? item.category}
                            </span>
                          </span>
                          <span className="shrink-0 font-mono font-semibold">
                            {formatUSD(item.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-4">
                  <div>
                    <p className="font-mono mb-1.5 text-[10.5px] uppercase tracking-[0.15em] text-ink-soft">
                      Status
                    </p>
                    <select
                      aria-label="Update order status"
                      value={order.status}
                      onChange={(event) =>
                        onStatusChange(order.id, event.target.value)
                      }
                      className="cursor-pointer rounded-md border-[1.5px] border-line bg-surface px-3 py-2 font-mono text-[12px] text-inked transition-colors focus:border-orange focus:outline-2 focus:outline-offset-1 focus:outline-orange"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <dl className="space-y-1 font-mono text-[13px]">
                    <div className="flex items-center justify-between gap-8">
                      <dt className="text-ink-soft">Subtotal</dt>
                      <dd className="font-semibold">
                        {formatUSD(order.subtotal ?? 0)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                      <dt className="text-ink-soft">Shipping</dt>
                      <dd className="font-semibold">Free</dd>
                    </div>
                    <div className="flex items-center justify-between gap-8 text-[15px]">
                      <dt className="font-bold text-ink">Total</dt>
                      <dd className="font-bold">
                        {formatUSD(order.total ?? order.subtotal ?? 0)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default AdminOrderList;