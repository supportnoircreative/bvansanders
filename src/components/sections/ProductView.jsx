"use client";

import { Button } from "@/components/buttons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "./ProductDetail";
import { useProduct } from "@/hooks/useProduct";
import { Skeleton } from "@/components/loaders/Skeleton";

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

function ProductLoadError({ onRetry }) {
  return (
    <Container>
      <div className="flex min-h-[50vh] flex-col items-start justify-center py-20">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="font-display mb-6 text-[clamp(32px,5vw,52px)] uppercase leading-[0.96]">
          We couldn&apos;t load this piece.
        </h1>
        <p className="mb-8 max-w-md text-base leading-relaxed text-ink-soft">
          Check your connection and give it another try.
        </p>
        <Button onClick={onRetry}>Try again</Button>
      </div>
    </Container>
  );
}

export function ProductView({ id }) {
  const { product, related, status, retry } = useProduct(id);

  if (status === "missing") return <ProductNotFound />;
  if (status === "error") return <ProductLoadError onRetry={retry} />;
  if (status !== "ready" || !product) {
    return (
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
          <Skeleton className="aspect-[3/4] w-full rounded-[6px]" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-10 w-64 rounded-[6px]" />
            <Skeleton className="h-10 w-40 rounded-[6px]" />
            <Skeleton className="h-24 w-full rounded-[6px]" />
          </div>
        </div>
      </Container>
    );
  }

  return <ProductDetail product={product} index={0} related={related} />;
}

export default ProductView;