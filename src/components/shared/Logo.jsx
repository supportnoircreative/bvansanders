import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import siteConfig from "@/config/site";

const VARIANTS = {
  desktop: {
    width: 40,
    height: 61,
    text: "text-[12px]",
    gap: "gap-1",
    pad: "py-1.5",
    imgClass: "md:max-h-[61px]",
  },
  mobile: {
    width: 40,
    height: 61,
    text: "text-[13px]",
    gap: "gap-1",
    pad: "py-1",
    imgClass: "max-h-[52px] sm:max-h-[61px]",
  },
};

/**
 * Brand lockup: logo mark + wordmark, linked to the home page.
 * "desktop" is the primary (left) lockup; "mobile" is the centered variant,
 * drawn larger to fill the taller mobile header.
 */
export function Logo({ variant = "desktop", className, ...props }) {
  const { width, height, text, gap, pad, imgClass } = VARIANTS[variant];

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
        className={cn("block h-auto w-auto flex-shrink-0", imgClass)}
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