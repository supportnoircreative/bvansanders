import { cn } from "@/lib/cn";
import { formatUSD } from "@/utils/format";

export function ProductPrice({ price, sold = false, className }) {
  return (
    <span
      className={cn(
        "font-mono text-[14.5px] font-semibold",
        sold && "text-ink-soft line-through",
        className
      )}
    >
      {formatUSD(price)}
    </span>
  );
}

export default ProductPrice;