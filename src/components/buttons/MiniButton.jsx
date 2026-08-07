import { cn } from "@/lib/cn";
import { Button } from "./Button";

/**
 * Compact pill action used inside product cards and gallery rows.
 */
export function MiniButton({ disabled, className, ...props }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "border-[1.5px] px-3.5 py-1.5 text-[11.5px] font-bold disabled:cursor-not-allowed disabled:border-line disabled:text-ink-soft disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-ink-soft",
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}

export default MiniButton;