import { CatalogView } from "@/components/sections/CatalogView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { seoConfig, absoluteUrl } from "@/config/seo";

export const metadata = {
  title: "Fine Art Prints",
  description:
    "Museum-quality fine art prints on gloss cover stock and issued in limited, hand signed editions.",
  keywords: [
    "giclée art prints",
    "giclée prints for sale",
    "fine art prints",
    "signed art prints",
    "limited edition art prints",
    "archival prints",
    "buy art prints",
  ],
  alternates: {
    canonical: "/prints",
  },
  openGraph: {
    title: "Fine Art Prints | B. Van Sanders",
    description:
      "Museum-quality fine art prints on gloss cover stock and issued in limited, hand signed editions.",
    type: "website",
    url: absoluteUrl("/prints"),
    siteName: seoConfig.og.siteName,
    locale: seoConfig.og.locale,
    images: [
      {
        url: absoluteUrl(seoConfig.og.defaultImage),
        alt: seoConfig.og.defaultAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fine Art Prints | B. Van Sanders",
    description:
      "Museum-quality fine art prints on gloss cover stock and issued in limited, hand signed editions.",
    images: [absoluteUrl(seoConfig.og.defaultImage)],
  },
};

export default function PrintsPage() {
  return (
    <Container>
      <div className="pt-11 md:pt-[70px]">
        <Eyebrow>Signed</Eyebrow>
        <h1 className="font-display mb-4 text-[clamp(30px,4.5vw,44px)] uppercase leading-none">
          Fine Art Prints
        </h1>
        <p className="mb-0 max-w-[540px] text-[15px] leading-relaxed text-ink-soft">
          Museum-quality fine art prints on gloss cover stock and issued in
          limited, hand signed editions.
        </p>
      </div>
      <Section>
        <CatalogView
          kind="print"
          title="Available fine art prints"
        />
      </Section>
    </Container>
  );
}