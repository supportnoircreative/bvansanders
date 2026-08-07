import { cn } from "@/lib/cn";
import { PALETTE_SWATCHES } from "@/constants/colors";

const SWATCH_CLASSES = [
  "bg-orange",
  "bg-purple",
  "bg-yellow",
  "bg-blue",
  "bg-inked",
];

/**
 * Row of brand color swatches used in the contact block.
 */
export function SwatchLine({ className }) {
  return (
    <div className={cn("mt-5 flex gap-2", className)}>
      {PALETTE_SWATCHES.map((color, index) => (
        <span
          key={color}
          aria-hidden="true"
          className={cn(
            "size-[26px] rounded-full border border-black/10",
            SWATCH_CLASSES[index % SWATCH_CLASSES.length]
          )}
        />
      ))}
    </div>
  );
}

export default SwatchLine;