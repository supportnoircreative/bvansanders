"use client";

import { ShoppingCart } from "lucide-react";
import { IconButton } from "@/components/buttons";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/cn";

export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <IconButton
      label="Open cart"
      onClick={openCart}
      badge={
        <span
          className={cn(
            "absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange px-0.5 font-mono text-[10px] font-semibold leading-none text-white",
            count === 0 && "hidden"
          )}
        >
          {count}
        </span>
      }
    >
      <ShoppingCart size={18} strokeWidth={1.8} />
    </IconButton>
  );
}

export default CartButton;