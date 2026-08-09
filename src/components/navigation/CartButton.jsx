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
            "absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-0.5 font-mono text-[11px] font-semibold leading-none text-white lg:-right-1.5 lg:-top-1.5 lg:h-4 lg:min-w-4 lg:text-[10px]",
            count === 0 && "hidden"
          )}
        >
          {count}
        </span>
      }
    >
      <ShoppingCart className="size-[22px] lg:size-[18px]" strokeWidth={1.8} />
    </IconButton>
  );
}

export default CartButton;