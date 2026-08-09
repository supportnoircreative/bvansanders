"use client";

import { CART } from "@/constants/navigation";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Button, MiniButton } from "@/components/buttons";

const INQUIRY_HREF = "/contact";

/**
 * Whether a product asks customers to inquire rather than add to cart:
 * processing or sold-out pieces (or legacy sold flags).
 */
function shouldInquire(product) {
  return (
    product.sold ||
    product.tag === "processing" ||
    product.tag === "soldout"
  );
}

/**
 * Primary action on a product card. Processing/sold-out pieces show an
 * "Inquire" link to the contact page; everything else adds to cart.
 * `size="lg"` renders a large primary CTA for the product detail page.
 */
export function ProductActions({ product, size = "md" }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  if (shouldInquire(product)) {
    const label = "Inquire";
    return size === "lg" ? (
      <Button href={INQUIRY_HREF}>{label}</Button>
    ) : (
      <MiniButton href={INQUIRY_HREF}>{label}</MiniButton>
    );
  }

  const handleAction = () => {
    addItem(product);
    showToast(`${product.title}${CART.added}`);
  };

  if (size === "lg") {
    return (
      <Button type="button" onClick={handleAction}>
        Add to Cart
      </Button>
    );
  }

  return (
    <MiniButton type="button" onClick={handleAction}>
      Add to Cart
    </MiniButton>
  );
}

export default ProductActions;