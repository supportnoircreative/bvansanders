import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatUSD } from "@/utils/format";
import { defaultMedium, defaultEdition } from "@/constants/products";
import {
  ProductArtwork,
  ProductPrice,
  ProductActions,
  ProductCard,
} from "@/components/cards";

export function ProductDetail({ product, index = 0, related = [] }) {
  const collectionHref = product.kind === "print" ? "/prints" : "/originals";
  const collectionLabel =
    product.kind === "print" ? "Prints" : "Original Paintings";
  const medium = product.medium?.trim() || defaultMedium(product.kind);
  const edition = product.edition?.trim() || defaultEdition(product.kind);
  const availability = product.sold ? "Sold" : "Available";

  return (
    <Container>
      <Section className="pb-6 pt-8 md:pb-8 md:pt-10">
        <Link
          href={collectionHref}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors duration-150 hover:text-inked focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          {collectionLabel}
        </Link>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div className="self-start md:sticky md:top-24">
            <ProductArtwork
              product={product}
              index={index}
              label={product.frameLabel}
            />
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
              {product.frameLabel}
            </p>
            <h1 className="m-0 mt-3 font-display text-[clamp(32px,5vw,52px)] uppercase leading-none">
              {product.title}
            </h1>
            <p className="mt-3 font-mono text-[13px] text-ink-soft">
              {product.size}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <span className="font-mono text-[26px] font-semibold">
                {formatUSD(product.price)}
              </span>
            </div>

            <p className="mt-6 border-t border-line pt-6 text-[15px] leading-relaxed text-ink">
              {product.description}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 font-mono text-[12px]">
              <div>
                <dt className="text-ink-soft">Medium</dt>
                <dd className="mt-0.5 font-semibold">{medium}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Dimensions</dt>
                <dd className="mt-0.5 font-semibold">{product.dimensions}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Edition</dt>
                <dd className="mt-0.5 font-semibold">{edition}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Availability</dt>
                <dd className="mt-0.5 font-semibold">{availability}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ProductActions product={product} size="lg" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-inked px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-150 hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                Ask a question
              </Link>
            </div>

            <p className="mt-5 text-xs text-ink-soft">
              Ships worldwide, carefully packed and insured. Commissions and
              installation notes available on request.
            </p>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <SectionHeader
            title="More in this collection"
            note="Continue exploring originals and prints from the studio."
          />
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 min-[900px]:grid-cols-3 sm:gap-x-7 sm:gap-y-8">
            {related.map((item, i) => (
              <ProductCard key={item.id} product={item} index={index + i + 1} />
            ))}
          </div>
        </Section>
      )}
    </Container>
  );
}

export default ProductDetail;