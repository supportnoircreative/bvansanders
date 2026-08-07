import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import siteConfig from "@/config/site";

const VARIANTS = {
  desktop: {
    width: 47,
    height: 72,
    text: "text-[13px]",
    gap: "gap-1",
    pad: "py-1.5",
  },
  mobile: {
    width: 24,
    height: 37,
    text: "text-[11.5px]",
    gap: "gap-0.5",
    pad: "py-0.5",
  },
};

/**
 * Brand lockup: logo mark + wordmark, linked to the home page.
 * "desktop" is the primary (left) lockup; "mobile" is the centered variant.
 */
export function Logo({ variant = "desktop", className, ...props }) {
  const { width, height, text, gap, pad } = VARIANTS[variant];

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "flex shrink-0 flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
        gap,
        pad,
        className
      )}
      {...props}
    >
      <Image
        src={siteConfig.logo.src}
        alt={siteConfig.logo.alt}
        width={width}
        height={height}
        priority={variant === "desktop"}
        className="block h-auto max-h-[37px] w-auto md:max-h-[72px] flex-shrink-0"
      />
      <span
        className={cn(
          "font-display whitespace-nowrap lowercase leading-none tracking-[0.3px]",
          text
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}

export default Logo;