import Link from "next/link";
import { cn } from "@/lib/cn";

const VARIANT_CLASSES = {
  primary:
    "bg-inked text-bg hover:bg-orange hover:border-orange hover:text-white",
  ghost: "bg-transparent text-inked hover:bg-inked hover:text-bg",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-inked px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

export function Button({ variant = "primary", href, className, children, ...props }) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;