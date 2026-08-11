import PRODUCTS from "@/data/products";
import { ProductView } from "@/components/sections/ProductView";
import { fetchProductMetadata } from "@/services/firebase/rest";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoConfig, absoluteUrl, kindLabel } from "@/config/seo";

// Statically pre-render the seeded catalog slugs. Dynamic products created
// in the admin panel are rendered on demand. Firestore is never touched
// from this server component — ProductView fetches client-side.
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

function collectionPath(kind) {
  return kind === "print" ? "/prints" : "/originals";
}

function collectionName(kind) {
  return kind === "print" ? "Prints" : "Original Paintings";
}

function productKeywords(product) {
  const kind = product.kind === "print" ? "print" : "painting";
  const terms = [
    seoConfig.artistName,
    `${product.title} ${kind}`,
    product.kind === "print"
      ? "giclée art print"
      : "original acrylic painting",
    "acrylic paintings for sale",
    "pop art",
    "contemporary art",
  ];
  if (product.kind !== "print") terms.push("abstract painting");
  return terms;
}

async function getProduct(id) {
  const seeded = PRODUCTS.find((item) => item.id === id);
  if (seeded) return seeded;
  return fetchProductMetadata(id);
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) {
    return {
      title: "Product not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = absoluteUrl(`/product/${id}`);
  const title = `${product.title} ${kindLabel(product.kind)} | ${seoConfig.artistName}`;
  const description =
    product.description ||
    `${product.title} — ${product.kind === "print" ? "a giclée art print" : "an original acrylic painting"} by artist ${seoConfig.artistName}.`;
  const image = product.image || seoConfig.og.defaultImage;

  return {
    title,
    description,
    keywords: productKeywords(product),
    alternates: {
      canonical: `/product/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      siteName: seoConfig.og.siteName,
      locale: seoConfig.og.locale,
      images: [
        {
          url: absoluteUrl(image),
          alt: `${product.title} by ${seoConfig.artistName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

function productJsonLd(product, id) {
  const pageUrl = absoluteUrl(`/product/${id}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || undefined,
    sku: product.id || id,
    category: kindLabel(product.kind),
    brand: {
      "@type": "Brand",
      name: seoConfig.artistName,
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "USD",
      price: typeof product.price === "number" ? product.price : undefined,
      availability: product.sold
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: seoConfig.legalName,
      },
    },
  };
  if (product.image) schema.image = [absoluteUrl(product.image)];
  return schema;
}

function breadcrumbJsonLd(product, id) {
  const kind = product.kind === "print" ? "print" : "original";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: collectionName(kind),
        item: absoluteUrl(collectionPath(kind)),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: absoluteUrl(`/product/${id}`),
      },
    ],
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      {product && (
        <>
          <JsonLd data={productJsonLd(product, id)} />
          <JsonLd data={breadcrumbJsonLd(product, id)} />
        </>
      )}
      <ProductView key={id} id={id} />
    </>
  );
}
