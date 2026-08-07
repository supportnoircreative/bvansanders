"use client";

import { CART } from "@/constants/navigation";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Button, MiniButton } from "@/components/buttons";

/**
 * Primary action on a product card. Sold items are disabled.
 * Prints add to cart; originals open an inquiry. `size="lg"` renders a
 * large primary CTA for the product detail page. Backend-ready
 * order/cart flows hook in here via the cart context.
 */
export function ProductActions({ product, size = "md" }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  if (product.sold) {
    if (size === "lg") {
      return (
        <Button
          type="button"
          disabled
          className="disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-ink-soft disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-ink-soft"
        >
          Sold Out
        </Button>
      );
    }
    return (
      <MiniButton type="button" disabled>
        Sold Out
      </MiniButton>
    );
  }

  const handleAction = () => {
    addItem(product);
    showToast(`${product.title}${CART.added}`);
  };

  const label = product.kind === "print" ? "Add to Cart" : "Inquire";

  if (size === "lg") {
    return (
      <Button type="button" onClick={handleAction}>
        {label}
      </Button>
    );
  }

  return (
    <MiniButton type="button" onClick={handleAction}>
      {label}
    </MiniButton>
  );
}

export default ProductActions;