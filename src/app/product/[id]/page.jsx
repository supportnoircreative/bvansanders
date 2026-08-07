import { ProductView } from "@/components/sections/ProductView";
import PRODUCTS from "@/data/products";
import { productService } from "@/services";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await productService.getById(id);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  return <ProductView key={id} id={id} />;
}