"use client";

import { useEffect, useState } from "react";
import { Package, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/buttons";
import { Spinner } from "@/components/loaders/Spinner";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrdersSkeleton } from "@/components/orders/OrdersSkeleton";

// ─── Sub-views ──────────────────────────────────────────────────────────────

function SignInPrompt() {
  return (
    <div className="mx-auto max-w-[480px] rounded-[10px] border border-line bg-surface px-6 py-14 text-center">
      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-chalk text-ink-soft">
        <Package size={26} strokeWidth={1.8} />
      </span>
      <h1 className="font-display mb-3 text-2xl uppercase tracking-tight">
        Sign in to view orders
      </h1>
      <p className="mx-auto mb-7 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
        Orders are attached to your account so you and the studio can track them.
      </p>
      <Button href="/login">Log in or create an account</Button>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="mx-auto max-w-[480px] rounded-[10px] border border-dashed border-line bg-surface px-6 py-14 text-center">
      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-chalk text-ink-soft">
        <Package size={26} strokeWidth={1.8} />
      </span>
      <p className="font-display mb-2 text-xl uppercase tracking-tight">
        No orders yet
      </p>
      <p className="mx-auto mb-7 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
        When you place an order it will appear here with full details and status
        updates.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/originals">Browse originals</Button>
        <Button href="/prints" variant="ghost">
          Browse prints
        </Button>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-[480px] rounded-[10px] border border-dashed border-line bg-surface px-6 py-14 text-center">
      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-chalk text-ink-soft">
        <RefreshCw size={22} strokeWidth={1.8} />
      </span>
      <p className="font-display mb-2 text-xl uppercase tracking-tight">
        Something went wrong
      </p>
      <p className="mx-auto mb-7 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
        {message || "We couldn't load your orders right now."}
      </p>
      <Button onClick={onRetry}>Try again</Button>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const { orders, loading, error, refresh } = useOrders({
    userId: user?.uid ?? null,
  });

  // Prevent SSR/hydration mismatch — auth state is client-only.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ── Container shell is always rendered so the layout stays stable ─────────
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      {/* Page header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          My Orders
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Track and manage your purchases from B. Van Sanders.
        </p>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}

      {/* 1. Not mounted yet — show a minimal spinner to avoid flash */}
      {!mounted && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner size={28} color="var(--color-inked)" />
        </div>
      )}

      {/* 2. Auth still loading */}
      {mounted && authLoading && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner size={28} color="var(--color-inked)" />
        </div>
      )}

      {/* 3. Not signed in */}
      {mounted && !authLoading && !user && <SignInPrompt />}

      {/* 4. Signed in — orders section */}
      {mounted && !authLoading && user && (
        <>
          {/* 4a. Loading skeleton */}
          {loading && <OrdersSkeleton count={3} />}

          {/* 4b. Error state */}
          {!loading && error && (
            <ErrorState message={error.message} onRetry={refresh} />
          )}

          {/* 4c. Empty state */}
          {!loading && !error && orders.length === 0 && <EmptyOrders />}

          {/* 4d. Orders list */}
          {!loading && !error && orders.length > 0 && (
            <>
              {/* Order count pill */}
              <p className="mb-4 font-mono text-[11.5px] text-ink-soft">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>

              <ul className="space-y-4" role="list" aria-label="Your orders">
                {orders.map((order) => (
                  <li key={order.id}>
                    <OrderCard order={order} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}