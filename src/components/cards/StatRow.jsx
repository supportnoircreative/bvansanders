import { cn } from "@/lib/cn";
import { Stat } from "./Stat";

export function StatRow({ stats, className }) {
  return (
    <div
      className={cn(
        "mt-8 flex flex-wrap gap-x-6 gap-y-5 sm:gap-x-[34px]",
        className
      )}
    >
      {stats.map(({ number, label }) => (
        <Stat key={label} number={number} label={label} />
      ))}
    </div>
  );
}

export default StatRow;