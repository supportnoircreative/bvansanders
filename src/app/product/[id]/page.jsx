import PRODUCTS from "@/data/products";
import { ProductView } from "@/components/sections/ProductView";
import { fetchProductMetadata } from "@/services/firebase/rest";

// Statically pre-render the seeded catalog slugs. Dynamic products created
// in the admin panel are rendered on demand. Firestore is never touched
// from this server component — ProductView fetches client-side.
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  // Fast path: seeded slugs ship metadata from the static catalog.
  const seeded = PRODUCTS.find((item) => item.id === id);
  if (seeded) {
    return {
      title: seeded.title,
      description: seeded.description,
    };
  }

  // Admin-created products only exist in Firestore: fetch their title and
  // description server-side via the REST API (nothing sensitive).
  const product = await fetchProductMetadata(id);
  if (product) {
    return {
      title: product.title,
      ...(product.description
        ? { description: product.description }
        : {}),
    };
  }

  return {
    title: "Product not found",
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  return <ProductView key={id} id={id} />;
}