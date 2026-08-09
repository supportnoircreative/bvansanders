import { cn } from "@/lib/cn";

/**
 * Round bordered icon button used in the navbar. Scales up on smaller
 * devices to suit the taller header; compact at lg+.
 */
export function IconButton({
  label,
  onClick,
  className,
  children,
  badge,
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-inked transition-all duration-150 hover:border-inked hover:bg-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange lg:size-9",
        className
      )}
      {...props}
    >
      {children}
      {badge}
    </button>
  );
}

export default IconButton;