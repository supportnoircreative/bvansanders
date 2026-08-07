import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/cards";

export function ProductGrid({ products, title, note, cta }) {
  return (
    <section>
      <SectionHeader title={title} note={note} />
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 min-[900px]:grid-cols-3 sm:gap-x-7 sm:gap-y-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      {cta}
    </section>
  );
}

export default ProductGrid;