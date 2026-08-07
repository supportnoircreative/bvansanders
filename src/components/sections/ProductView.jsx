"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/buttons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "./ProductDetail";
import { productService } from "@/services";

function ProductNotFound() {
  return (
    <Container>
      <div className="flex min-h-[50vh] flex-col items-start justify-center py-20">
        <Eyebrow>Product not found</Eyebrow>
        <h1 className="font-display mb-6 text-[clamp(32px,5vw,52px)] uppercase leading-[0.96]">
          This piece isn&apos;t on the wall.
        </h1>
        <p className="mb-8 max-w-md text-base leading-relaxed text-ink-soft">
          It may have been sold or removed. Browse the current collection to
          keep exploring.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Button href="/originals">Browse originals</Button>
          <Button href="/prints" variant="ghost">
            Browse prints
          </Button>
        </div>
      </div>
    </Container>
  );
}

export function ProductView({ id }) {
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let active = true;
    productService.getById(id).then((found) => {
      if (!active) return;
      if (!found) {
        setStatus("missing");
        return;
      }
      setProduct(found);
      productService.getByKind(found.kind).then((all) => {
        if (!active) return;
        const foundIndex = all.findIndex((item) => item.id === found.id);
        setIndex(Math.max(foundIndex, 0));
        setRelated(all.filter((item) => item.id !== found.id).slice(0, 3));
        setStatus("ready");
      });
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (status === "missing") return <ProductNotFound />;
  if (status !== "ready" || !product) {
    return <div className="h-[60vh]" aria-hidden="true" />;
  }

  return <ProductDetail product={product} index={index} related={related} />;
}

export default ProductView;