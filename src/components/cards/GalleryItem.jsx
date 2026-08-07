"use client";

import { motion } from "framer-motion";
import { getArtGradient } from "@/utils/artwork";

export function GalleryItem({ caption, index = 0 }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="m-0 flex flex-col overflow-hidden rounded-[4px] border border-line"
    >
      <span
        aria-hidden="true"
        className="aspect-4/5 w-full"
        style={{ background: getArtGradient(index) }}
      />
      <figcaption className="bg-surface px-3 py-2.5 font-mono text-[11px] text-ink-soft">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

export default GalleryItem;