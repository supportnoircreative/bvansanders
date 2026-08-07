import { cn } from "@/lib/cn";

/**
 * Round bordered icon button (38x38) used in the navbar.
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
        "relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-inked transition-all duration-150 hover:border-inked hover:bg-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
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