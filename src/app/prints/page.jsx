import { CatalogView } from "@/components/sections/CatalogView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { seoConfig, absoluteUrl } from "@/config/seo";

export const metadata = {
  title: "Giclée Art Prints",
  description:
    "Shop museum-quality giclée art prints by B. Van Sanders. Archival, hand-signed and numbered limited editions on heavyweight cotton paper.",
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
    title: "Giclée Art Prints | B. Van Sanders",
    description:
      "Museum-quality giclée art prints by B. Van Sanders — archival, hand-signed and numbered limited editions on heavyweight cotton paper.",
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
    title: "Giclée Art Prints | B. Van Sanders",
    description:
      "Museum-quality giclée art prints by B. Van Sanders — archival, hand-signed and numbered limited editions.",
    images: [absoluteUrl(seoConfig.og.defaultImage)],
  },
};

export default function PrintsPage() {
  return (
    <Container>
      <div className="pt-11 md:pt-[70px]">
        <Eyebrow>Signed & numbered</Eyebrow>
        <h1 className="font-display mb-4 text-[clamp(30px,4.5vw,44px)] uppercase leading-none">
          Giclée Art Prints
        </h1>
        <p className="mb-0 max-w-[540px] text-[15px] leading-relaxed text-ink-soft">
          Museum-quality giclée prints on archival cotton paper, color-matched
          in the studio and issued in limited, hand-signed editions.
        </p>
      </div>
      <Section>
        <CatalogView
          kind="print"
          title="Available prints"
        />
      </Section>
    </Container>
  );
}