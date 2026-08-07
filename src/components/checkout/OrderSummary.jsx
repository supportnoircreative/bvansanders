import { CartItemRow } from "@/components/cart/CartItemRow";
import { formatUSD } from "@/utils/format";
import { CHECKOUT } from "@/constants/navigation";

export function OrderSummary({ items, subtotal }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-line bg-surface">
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-display text-base uppercase tracking-wide">
          Order summary
          <span className="ml-2 font-mono text-[11px] normal-case text-ink-soft">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </h2>
      </div>

      <ul className="max-h-[320px] space-y-3 overflow-y-auto px-5 py-4">
        {items.map((item, index) => (
          <CartItemRow
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            readOnly
          />
        ))}
      </ul>

      <dl className="space-y-2 border-t border-line px-5 py-4 font-mono text-[13px]">
        <div className="flex items-center justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="font-semibold">{formatUSD(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-soft">Shipping</dt>
          <dd className="font-semibold">Free</dd>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3 text-[15px]">
          <dt className="font-semibold text-ink">Total</dt>
          <dd className="font-bold">{formatUSD(subtotal)}</dd>
        </div>
      </dl>

      <p className="border-t border-line px-5 py-3 text-[11.5px] text-ink-soft">
        {CHECKOUT.shipping} · {CHECKOUT.note}
      </p>
    </div>
  );
}

export default OrderSummary;