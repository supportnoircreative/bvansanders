import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }) {
  return (
    <p
      className={cn(
        "mb-4 font-mono text-xs uppercase tracking-[0.15em] text-orange sm:mb-[18px]",
        className
      )}
    >
      {children}
    </p>
  );
}

export default Eyebrow;