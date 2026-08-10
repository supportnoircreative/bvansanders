import { getArtGradient } from "@/utils/artwork";
import { formatUSD } from "@/utils/format";

/**
 * A single product line-item inside an OrderCard.
 * Mirrors the existing CartItemRow pattern — uses a plain <img> tag
 * (not next/image) so Firebase Storage URLs work without domain config.
 */
export function OrderItem({ item, index = 0 }) {
  const label = [item.frameLabel, item.size].filter(Boolean).join(" · ");

  return (
    <li className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
      {/* Thumbnail */}
      <span
        aria-hidden="true"
        className="relative size-12 shrink-0 overflow-hidden rounded-[4px] border border-line sm:size-14"
        style={{ background: getArtGradient(index) }}
      >
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </span>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold leading-snug">
          {item.title}
        </p>
        {label && (
          <p className="mt-0.5 truncate font-mono text-[11px] text-ink-soft">
            {label}
          </p>
        )}
      </div>

      {/* Price — always visible, never truncated */}
      <p className="shrink-0 font-mono text-[13px] font-semibold tabular-nums">
        {formatUSD(item.price ?? 0)}
      </p>
    </li>
  );
}

export default OrderItem;
