import { useCallback, useEffect, useRef, useState } from "react";
import { ProductService } from "@/services";

/**
 * Single-product hook for product detail pages. Also loads up to 3
 * related products from the same collection.
 * status: "loading" | "ready" | "missing" | "error"
 */
export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");
  const active = useRef(true);

  const loadProduct = useCallback(async () => {
    const found = await ProductService.getProduct(productId);
    if (!found) return null;
    const all = await ProductService.getProductsByCategory(found.kind);
    return {
      product: found,
      related: all.filter((item) => item.id !== found.id).slice(0, 3),
    };
  }, [productId]);

  const settle = useCallback(
    (fizzle, resolved) => {
      if (fizzle()) return;
      setProduct(resolved ? resolved.product : null);
      setRelated(resolved ? resolved.related : []);
      setStatus(resolved ? "ready" : "missing");
    },
    []
  );

  const load = useCallback(
    (fizzle) =>
      loadProduct()
        .then((resolved) => settle(fizzle, resolved))
        .catch(() => {
          if (fizzle()) return;
          setStatus("error");
        }),
    [loadProduct, settle]
  );

  useEffect(() => {
    active.current = true;
    const isActive = () => !active.current;
    load(isActive);
    return () => {
      active.current = false;
    };
  }, [load]);

  const retry = useCallback(() => {
    setStatus("loading");
    load(() => false);
  }, [load]);

  return { product, related, status, retry };
}

export default useProduct;