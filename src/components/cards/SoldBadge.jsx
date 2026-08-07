import { cn } from "@/lib/cn";

export function SoldBadge({ className }) {
  return (
    <div
      className={cn(
        "absolute -right-8 top-3.5 rotate-[35deg] bg-inked px-10 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-bg shadow-[0_2px_6px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      Sold Out
    </div>
  );
}

export default SoldBadge;