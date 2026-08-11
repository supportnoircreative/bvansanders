import { CatalogView } from "@/components/sections/CatalogView";
import { CommissionBanner } from "@/components/sections/CommissionBanner";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { seoConfig, absoluteUrl } from "@/config/seo";

export const metadata = {
  title: "Original Acrylic Paintings",
  description:
    "Shop original acrylic on canvas paintings by B. Van Sanders. Bold, one-of-a-kind pop-art originals — signed by the artist, once it's sold it's gone.",
  keywords: [
    "original acrylic paintings",
    "acrylic paintings for sale",
    "original paintings for sale",
    "original abstract paintings",
    "pop art paintings",
    "pop art paintings for sale",
    "buy original artwork",
  ],
  alternates: {
    canonical: "/originals",
  },
  openGraph: {
    title: "Original Acrylic Paintings | B. Van Sanders",
    description:
      "Shop original acrylic on canvas paintings by B. Van Sanders — bold, one-of-a-kind pop-art originals.",
    type: "website",
    url: absoluteUrl("/originals"),
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
    title: "Original Acrylic Paintings | B. Van Sanders",
    description:
      "Shop original acrylic on canvas paintings by B. Van Sanders — bold, one-of-a-kind pop-art originals.",
    images: [absoluteUrl(seoConfig.og.defaultImage)],
  },
};

export default function OriginalsPage() {
  return (
    <Container>
      <div className="pt-11 md:pt-[70px]">
        <Eyebrow>One of one</Eyebrow>
        <h1 className="font-display mb-4 text-[clamp(30px,4.5vw,44px)] uppercase leading-none">
          Original Paintings
        </h1>
        <p className="mb-0 max-w-[540px] text-[15px] leading-relaxed text-ink-soft">
          One-of-a-kind acrylic on canvas originals, signed by the artist.
          Once it&apos;s sold, it&apos;s gone.
        </p>
      </div>
      <Section>
        <CatalogView
          kind="original"
          title="Available originals"
          cta={<CommissionBanner />}
        />
      </Section>
    </Container>
  );
}