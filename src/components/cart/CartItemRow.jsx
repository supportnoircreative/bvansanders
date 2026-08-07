"use client";

import { X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { getArtGradient } from "@/utils/artwork";
import { formatUSD } from "@/utils/format";

export function CartItemRow({ item, index = 0, readOnly = false }) {
  const { removeItem } = useCart();

  return (
    <li className="flex items-center gap-3.5 rounded-lg border border-line bg-surface p-3">
      <span
        aria-hidden="true"
        className="size-14 shrink-0 rounded-[4px] border border-line"
        style={{ background: getArtGradient(index) }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{item.title}</p>
        <p className="truncate font-mono text-[11.5px] text-ink-soft">
          {item.frameLabel} · {item.size}
        </p>
        <p className="mt-0.5 font-mono text-[12.5px] font-semibold">
          {formatUSD(item.price)}
        </p>
      </div>
      {!readOnly && (
        <button
          type="button"
          aria-label={`Remove ${item.title} from cart`}
          onClick={() => removeItem(item.id)}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-150 hover:border-inked hover:bg-chalk hover:text-inked focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        >
          <X size={15} strokeWidth={2} />
        </button>
      )}
    </li>
  );
}

export default CartItemRow;