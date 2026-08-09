"use client";

import { motion } from "framer-motion";
import { getArtGradient } from "@/utils/artwork";
import { FrameLabel } from "./FrameLabel";
import { SoldBadge } from "./SoldBadge";

/**
 * Product artwork. Renders the full uploaded image (Firebase Storage) —
 * never cropped — on top of the procedural gradient backdrop when the
 * image's aspect ratio doesn't match the artwork frame. Falls back to the
 * gradient alone when there is no image.
 */
export function ProductArtwork({ product, index = 0, label }) {
  const hasImage = Boolean(product.image);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      role="img"
      aria-label={`${product.title}, ${product.kind}${hasImage ? "" : " artwork placeholder"}`}
      className="relative mb-3.5 aspect-4/5 cursor-pointer overflow-hidden rounded-[4px] border border-line"
      style={{ background: getArtGradient(index) }}
    >
      {hasImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
      <FrameLabel>{label}</FrameLabel>
      {product.sold && <SoldBadge />}
    </motion.div>
  );
}

export default ProductArtwork;