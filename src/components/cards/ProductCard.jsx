import Link from "next/link";
import { ProductArtwork } from "./ProductArtwork";
import { ProductPrice } from "./ProductPrice";
import { ProductActions } from "./ProductActions";

export function ProductCard({ product, index = 0 }) {
  const href = `/product/${product.id}`;

  return (
    <article className="flex flex-col">
      <Link
        href={href}
        aria-label={`View ${product.title}`}
        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
      >
        <ProductArtwork
          product={product}
          index={index}
          label={product.frameLabel}
        />
      </Link>
      <h3 className="mb-0.5 text-[15.5px] font-bold">
        <Link
          href={href}
          className="hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        >
          {product.title}
        </Link>
      </h3>
      <p className="mb-2 font-mono text-[12.5px] text-ink-soft">
        {product.size}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ProductPrice price={product.price} sold={product.sold} />
        <ProductActions product={product} />
      </div>
    </article>
  );
}

export default ProductCard;