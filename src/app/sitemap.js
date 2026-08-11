import PRODUCTS from "@/data/products";
import { fetchAllProducts } from "@/services/firebase/rest";
import { seoConfig } from "@/config/seo";

export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/originals", changeFrequency: "weekly", priority: 0.9 },
  { path: "/prints", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap() {
  // Merge the seeded catalog with admin-created products from Firestore
  // (products are publicly readable). Network failures fall back to the
  // seeded catalog so the sitemap always generates.
  let remoteProducts = [];
  try {
    remoteProducts = await fetchAllProducts();
  } catch {
    remoteProducts = [];
  }

  const productsById = new Map();
  for (const product of PRODUCTS) productsById.set(product.id, product);
  for (const product of remoteProducts) {
    if (product?.id && !productsById.has(product.id)) {
      productsById.set(product.id, product);
    }
  }

  const productUrls = [...productsById.values()].map((product) => ({
    url: `${seoConfig.siteUrl}/product/${product.id}`,
    lastModified: product.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticUrls = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${seoConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...staticUrls, ...productUrls];
}