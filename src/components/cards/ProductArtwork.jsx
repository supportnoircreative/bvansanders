"use client";

import { motion } from "framer-motion";
import { getArtGradient } from "@/utils/artwork";
import { FrameLabel } from "./FrameLabel";
import { SoldBadge } from "./SoldBadge";

/**
 * Procedural artwork placeholder (mirrors the prototype's gradient bursts)
 * with the corner frame label and a sold-out ribbon when applicable.
 */
export function ProductArtwork({ product, index = 0, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      role="img"
      aria-label={`${product.title}, ${product.kind} artwork placeholder`}
      className="relative mb-3.5 aspect-4/5 cursor-pointer overflow-hidden rounded-[4px] border border-line"
      style={{ background: getArtGradient(index) }}
    >
      <span className="absolute inset-0" aria-hidden="true" />
      <FrameLabel>{label}</FrameLabel>
      {product.sold && <SoldBadge />}
    </motion.div>
  );
}

export default ProductArtwork;