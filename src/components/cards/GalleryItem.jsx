"use client";

import { motion } from "framer-motion";
import { getArtGradient } from "@/utils/artwork";

/**
 * Gallery tile for an admin-created gallery product. Image is the only
 * required field, so the caption falls back to the title and finally to
 * "Untitled piece".
 */
export function GalleryItem({ item, index = 0 }) {
  const caption = item.caption || item.title || "Untitled piece";
  const hasImage = Boolean(item.image);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="m-0 flex flex-col overflow-hidden rounded-[4px] border border-line"
    >
      <span
        aria-hidden={hasImage ? "false" : "true"}
        className="relative block aspect-4/5 w-full overflow-hidden"
        style={{ background: getArtGradient(index) }}
      >
        {hasImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={caption}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </span>
    </motion.figure>
  );
}

export default GalleryItem;