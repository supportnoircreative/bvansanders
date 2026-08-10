"use client";

import { motion } from "framer-motion";
import { getArtGradient } from "@/utils/artwork";
import { MiniButton } from "@/components/buttons";
import { inquiryHref } from "@/utils/inquiry";

/**
 * Gallery tile for an admin-created gallery product. Image is the only
 * required field, so the caption falls back to the title and finally to
 * "Untitled piece". Every tile offers an Inquire button that carries the
 * item's details to the contact form.
 */
export function GalleryItem({ item, index = 0 }) {
  const reference = item.title || item.caption || "Untitled piece";
  const caption = item.caption || item.title || "Untitled piece";
  const hasImage = Boolean(item.image);
  const href = inquiryHref({
    item: reference,
    size: item.size || item.dimensions || "",
    kind: "gallery",
  });

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
            alt={reference}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </span>
      <div className="flex items-center justify-between gap-2 bg-surface px-3 py-2.5">
        <figcaption className="min-w-0 truncate font-mono text-[11px] text-ink-soft">
          {caption}
        </figcaption>
        <MiniButton href={href} className="shrink-0">
          Inquire
        </MiniButton>
      </div>
    </motion.figure>
  );
}

export default GalleryItem;