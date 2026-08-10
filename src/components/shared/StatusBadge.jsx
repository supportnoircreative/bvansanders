import { cn } from "@/lib/cn";

const BADGE_STYLES = {
  custom: "bg-orange text-white",
  processing: "bg-yellow text-inked",
  soldout: "bg-inked text-white",
  pending: "bg-chalk text-ink-soft",
  paid: "bg-cream text-inked",
  shipped: "bg-blue text-white",
  completed: "bg-inked text-bg",
};

export function StatusBadge({ value, className }) {
  if (!value) return null;
  const style = BADGE_STYLES[value] ?? "bg-chalk text-ink-soft";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
        style,
        className
      )}
    >
      {value}
    </span>
  );
}

export default StatusBadge;