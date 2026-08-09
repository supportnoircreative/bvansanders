"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { DesktopMenu } from "@/components/navigation/DesktopMenu";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { CartButton } from "@/components/navigation/CartButton";
import { AccountButton } from "@/components/navigation/AccountButton";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.04] bg-[linear-gradient(to_bottom,rgba(250,250,247,0.92)_0%,rgba(250,250,247,0.62)_55%,rgba(250,250,247,0.06)_100%)] backdrop-blur-xl">
      <div className="relative flex h-[15vh] min-h-[72px] items-center justify-between px-5 py-2 lg:h-auto lg:min-h-0 lg:px-10 lg:py-3">
        <div className="flex min-w-0 items-center gap-2 lg:gap-8">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="cursor-pointer rounded-lg border border-line bg-transparent p-2.5 text-inked lg:p-2 lg:hidden"
          >
            {menuOpen ? (
              <X className="size-[22px] lg:size-[18px]" />
            ) : (
              <Menu className="size-[22px] lg:size-[18px]" />
            )}
          </button>
          <Logo variant="desktop" className="hidden lg:flex" />
          <DesktopMenu />
        </div>

        <Logo variant="mobile" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden" />

        <div className="flex shrink-0 items-center gap-2 lg:gap-1.5">
          <AccountButton />
          <CartButton />
        </div>
      </div>

      <MobileMenu open={menuOpen} onNavigate={() => setMenuOpen(false)} />
    </header>
  );
}

export default Navbar;