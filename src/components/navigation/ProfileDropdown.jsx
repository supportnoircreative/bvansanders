"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { User, LogOut, Package, ChevronDown, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";
import { ACCOUNT_MESSAGES } from "@/constants/navigation";

export function ProfileDropdown() {
  const { user, profile, logout, isAuthenticated, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const displayName = profile?.name || user?.email?.split("@")[0] || "Account";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Trigger Button ───────────────────────────────────────── */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={isAuthenticated ? "Account menu" : "Sign in"}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "group relative flex shrink-0 items-center gap-2 rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
          isAuthenticated
            ? "border-line bg-surface p-1 pl-1.5 pr-2.5 hover:border-inked hover:shadow-sm"
            : "size-11 items-center justify-center border-line text-inked hover:border-inked hover:bg-chalk lg:size-9"
        )}
      >
        {isAuthenticated ? (
          <>
            {/* Avatar Pill */}
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-inked font-mono text-[12px] font-bold text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
              {userInitial}
            </span>
            <span className="hidden font-sans text-[12.5px] font-semibold text-inked lg:inline-block truncate max-w-[90px]">
              {displayName}
            </span>
            <ChevronDown
              className={cn(
                "size-3.5 text-ink-soft stroke-[2.5] transition-transform duration-200",
                open && "rotate-180 text-inked"
              )}
            />
          </>
        ) : (
          <User className="size-[22px] lg:size-[18px]" strokeWidth={1.8} />
        )}
      </button>

      {/* ── Dropdown Menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-50 mt-2.5 w-72 origin-top-right rounded-2xl border border-line bg-surface/98 p-2 shadow-2xl shadow-black/10 ring-1 ring-black/[0.03] backdrop-blur-xl"
            role="menu"
          >
            {isAuthenticated ? (
              <div className="space-y-1">
                {/* User Header Info Card */}
                <div className="rounded-xl bg-bg p-3 border border-line/60">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-inked font-mono text-sm font-bold text-white shadow-xs">
                      {userInitial}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-[14px] text-inked leading-snug">
                        {displayName}
                      </p>
                      {user?.email && (
                        <p className="truncate font-mono text-[11px] text-ink-soft">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-chalk px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                      {isAdmin ? (
                        <>
                          <ShieldCheck className="size-3 text-orange" />
                          Admin Studio
                        </>
                      ) : (
                        "Customer Account"
                      )}
                    </span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="py-1">
                  <Link
                    href="/orders"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-inked transition-all duration-150 hover:bg-chalk hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-chalk text-inked transition-colors group-hover:bg-inked group-hover:text-white">
                        <Package size={16} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="font-semibold text-[13.5px]">My Orders</p>
                        <p className="text-[11px] text-ink-soft">Track & view purchases</p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-ink-soft opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-inked transition-all duration-150 hover:bg-chalk hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                          <ShieldCheck size={16} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="font-semibold text-[13.5px]">Admin Dashboard</p>
                          <p className="text-[11px] text-ink-soft">Manage catalog & orders</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-ink-soft opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>

                <div className="border-t border-line/60 pt-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-ink-soft transition-colors duration-150 hover:bg-orange/10 hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-chalk text-ink-soft transition-colors group-hover:bg-orange group-hover:text-white">
                      <LogOut size={15} strokeWidth={2} />
                    </span>
                    <span className="font-semibold text-[13.5px]">{ACCOUNT_MESSAGES.logout}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Signed-out state */
              <div className="p-3 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-chalk text-inked">
                  <User size={22} strokeWidth={1.8} />
                </div>
                <p className="font-bold text-[15px] text-inked">Welcome to Studio</p>
                <p className="mt-1 text-[12px] text-ink-soft leading-snug">
                  Sign in to track your artwork orders and save shipping preferences.
                </p>
                <Link
                  href="/login"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-inked py-2.5 font-sans text-[13px] font-bold text-white transition-colors duration-150 hover:bg-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  Log in or Register
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileDropdown;