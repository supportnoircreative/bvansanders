"use client";

import { GalleryItem } from "@/components/cards";
import { useProducts } from "@/hooks/useProducts";

/**
 * Client gallery grid. Shows admin-created gallery products only — there
 * is no mock fallback. Every piece (image, caption, Inquire button) is
 * managed from the admin panel.
 */
export function GalleryView() {
  const { products, loading, error } = useProducts({ kind: "gallery" });

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 min-[900px]:grid-cols-3 sm:gap-x-7 sm:gap-y-8">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="aspect-4/5 animate-pulse rounded-[4px] border border-line bg-chalk"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[10px] border border-dashed border-line bg-surface px-6 py-12 text-center">
        <p className="font-display mb-2 text-xl uppercase">Gallery unavailable</p>
        <p className="text-sm text-ink-soft">{error.message}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[10px] border border-dashed border-line bg-surface px-6 py-12 text-center">
        <p className="font-display mb-2 text-xl uppercase">
          Nothing in the gallery yet
        </p>
        <p className="text-sm text-ink-soft">
          Gallery pieces added from the admin panel appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-5 min-[900px]:grid-cols-3 sm:gap-x-7 sm:gap-y-8">
      {products.map((item, index) => (
        <GalleryItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

export default GalleryView;