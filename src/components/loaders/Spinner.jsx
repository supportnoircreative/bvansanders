import { cn } from "@/lib/cn";

/**
 * Loading spinner with configurable size (px) and color (any CSS color value,
 * e.g. "#141414", "currentColor" or "var(--color-inked)").
 */
export function Spinner({ size = 20, color = "currentColor", className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-block animate-spin rounded-full", className)}
      style={{
        width: size,
        height: size,
        borderWidth: Math.max(2, Math.round(size / 8)),
        borderStyle: "solid",
        borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
        borderTopColor: color,
      }}
    />
  );
}

export default Spinner;