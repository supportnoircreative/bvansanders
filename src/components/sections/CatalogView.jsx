"use client";

import { ProductGrid } from "@/components/sections/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

/**
 * Client catalog view. Loads products through ProductService (via
 * useProducts) so admin changes are reflected on the frontend. `kind`
 * filters the catalog; without it, featured items load.
 */
export function CatalogView({ kind = null, title, note, cta }) {
  const { products, loading, error } = useProducts(
    kind ? { kind } : { featured: true }
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 min-[900px]:grid-cols-3 sm:gap-x-7 sm:gap-y-8">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="aspect-[3/4] rounded-[6px] border border-line bg-chalk animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[10px] border border-dashed border-line bg-surface px-6 py-12 text-center">
        <p className="font-display mb-2 text-xl uppercase">Catalog unavailable</p>
        <p className="text-sm text-ink-soft">{error.message}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[10px] border border-dashed border-line bg-surface px-6 py-12 text-center">
        <p className="font-display mb-2 text-xl uppercase">Nothing on the wall yet</p>
        <p className="text-sm text-ink-soft">
          New pieces land here as soon as they come out of the studio.
        </p>
      </div>
    );
  }

  return <ProductGrid products={products} title={title} note={note} cta={cta} />;
}

export default CatalogView;