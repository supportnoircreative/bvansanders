import { useCallback, useEffect, useRef, useState } from "react";
import { ProductService } from "@/services";

/**
 * Product list hook. Consumes ProductService and exposes UI-friendly state:
 * products, loading, error and refresh. Usage:
 *   useProducts()                     — all products
 *   useProducts({ kind: "original" }) — products of one kind
 *   useProducts({ featured: true })   — featured products
 */
export function useProducts({ kind = null, featured = false } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const active = useRef(true);

  const fetchProducts = useCallback(async () => {
    if (featured) return ProductService.getFeaturedProducts();
    if (kind) return ProductService.getProductsByCategory(kind);
    return ProductService.getProducts();
  }, [kind, featured]);

  const fetchProductsWithState = useCallback(
    (fizzle) =>
      fetchProducts()
        .then((items) => {
          if (fizzle()) return;
          setProducts(items);
          setError(null);
        })
        .catch((err) => {
          if (fizzle()) return;
          setError(err);
        })
        .finally(() => {
          if (fizzle()) return;
          setLoading(false);
        }),
    [fetchProducts]
  );

  useEffect(() => {
    active.current = true;
    const isActive = () => !active.current;
    fetchProductsWithState(isActive);
    return () => {
      active.current = false;
    };
  }, [fetchProductsWithState]);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    return fetchProductsWithState(() => false);
  }, [fetchProductsWithState]);

  return { products, loading, error, refresh };
}

export default useProducts;