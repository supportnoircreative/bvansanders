"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { productService } from "@/services";

/**
 * Client catalog view. Loads products from the unified mock store
 * (seed + admin overrides) so admin changes are reflected on the
 * frontend. `kind` filters the catalog; without it, featured items load.
 */
export function CatalogView({ kind = null, title, note, cta }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;
    const load = kind
      ? productService.getByKind(kind)
      : productService.getFeatured();
    load.then((items) => {
      if (active) setProducts(items);
    });
    return () => {
      active = false;
    };
  }, [kind]);

  return <ProductGrid products={products} title={title} note={note} cta={cta} />;
}

export default CatalogView;