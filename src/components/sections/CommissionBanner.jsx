import { Button } from "@/components/buttons";

export function CommissionBanner() {
  return (
    <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-lg border border-line bg-gradient-to-br from-surface from-60% to-cream p-6 sm:p-7 md:mt-[60px] md:flex-row md:items-center md:gap-8 md:px-10 md:py-12">
      <div>
        <h3 className="font-display mb-2 text-xl uppercase md:text-2xl">
          Don&apos;t see the one?
        </h3>
        <p className="m-0 max-w-[420px] text-[14.5px] leading-relaxed text-ink-soft">
          Commission a custom original built around your favorite icon,
          palette, or moment in culture.
        </p>
      </div>
      <Button href="/contact" className="w-full md:w-auto">
        Start a Commission
      </Button>
    </div>
  );
}

export default CommissionBanner;