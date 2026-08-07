import { cn } from "@/lib/cn";
import { LABEL_CLASSES } from "./fieldClasses";

export function Field({ label, htmlFor, children, className }) {
  return (
    <div className={cn("mb-5", className)}>
      <label htmlFor={htmlFor} className={LABEL_CLASSES}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default Field;