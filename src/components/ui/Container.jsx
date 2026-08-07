import { cn } from "@/lib/cn";

export function Container({ className, ...props }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1180px] px-5 min-[700px]:px-10",
        className
      )}
      {...props}
    />
  );
}

export default Container;