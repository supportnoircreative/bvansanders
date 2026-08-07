"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatUSD } from "@/utils/format";
import { Button } from "@/components/buttons";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const { items, count, isOpen, clearCart, closeCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            key="cart-backdrop"
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] cursor-default bg-inked/30 backdrop-blur-sm"
          />
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col border-l border-line bg-bg shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-lg uppercase tracking-wide">
                Your cart{" "}
                <span className="ml-1 font-mono text-[11px] normal-case text-ink-soft">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              </h2>
              <div className="flex items-center gap-1.5">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="cursor-pointer rounded-full px-3 py-1.5 font-mono text-[11px] text-ink-soft transition-colors duration-150 hover:bg-chalk hover:text-inked focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line text-inked transition-all duration-150 hover:border-inked hover:bg-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingCart size={36} strokeWidth={1.5} className="text-ink-soft" />
                <p className="font-display text-lg uppercase">Your cart is empty</p>
                <p className="max-w-[26ch] text-sm text-ink-soft">
                  Prints and originals you add will appear here.
                </p>
                <Button variant="ghost" onClick={closeCart}>
                  Continue browsing
                </Button>
              </div>
            ) : (
              <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {items.map((item, index) => (
                  <CartItemRow key={`${item.id}-${index}`} item={item} index={index} />
                ))}
              </ul>
            )}

            {items.length > 0 && (
              <footer className="border-t border-line px-5 py-4">
                <div className="mb-1 flex items-center justify-between font-mono text-sm">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="font-semibold">{formatUSD(subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-ink-soft">
                  Shipping calculated at checkout (prototype).
                </p>
                <Button className="w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;