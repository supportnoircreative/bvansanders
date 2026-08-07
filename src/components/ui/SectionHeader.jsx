import { cn } from "@/lib/cn";

/**
 * Section heading row with a large display title and an optional note,
 * separated by a hairline rule — mirrors the original section heads.
 */
export function SectionHeader({ title, note, children, className }) {
  return (
    <div
      className={cn(
        "mb-7 flex items-end flex-wrap justify-between gap-5 border-b border-line pb-5 md:mb-10 md:pb-[22px]",
        className
      )}
    >
      <h2 className="font-display m-0 text-[clamp(28px,4vw,44px)] leading-none uppercase">
        {title}
      </h2>
      {note ? (
        <p className="max-w-[360px] text-sm leading-relaxed text-ink-soft">
          {note}
        </p>
      ) : (
        children
      )}
    </div>
  );
}

export default SectionHeader;