import { cn } from "@/lib/cn";

export function Section({ className, children }) {
  return (
    <section className={cn("py-12 md:py-[70px]", className)}>{children}</section>
  );
}

export default Section;