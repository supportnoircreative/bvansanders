"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/useAuth";
import NAV_LINKS from "@/constants/navigation";

export function NavLinks({ className, linkClassName, onNavigate }) {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const links = NAV_LINKS.filter(({ href }) => href !== "/admin" || isAdmin);

  return (
    <nav aria-label="Primary" className={className}>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-2 text-[12.5px] font-semibold uppercase tracking-widest text-ink-soft transition-colors duration-150 hover:bg-chalk hover:text-inked focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
              isActive && "bg-inked text-white hover:bg-inked hover:text-white",
              linkClassName
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavLinks;