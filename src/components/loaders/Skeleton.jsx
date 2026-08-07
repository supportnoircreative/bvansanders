import { cn } from "@/lib/cn";

/**
 * Animated placeholder block shown while async content streams in.
 */
export function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-[4px] bg-line/60", className)}
    />
  );
}

export default Skeleton;