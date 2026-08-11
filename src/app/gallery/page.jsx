import { GalleryView } from "@/components/sections/GalleryView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { seoConfig, absoluteUrl } from "@/config/seo";

export const metadata = {
  title: "Art Gallery & Studio Work",
  description:
    "A look through the studio of B. Van Sanders: finished works, process shots, and installations from an abstract and pop-art painter.",
  keywords: [
    "B. Van Sanders gallery",
    "art gallery",
    "abstract art",
    "contemporary art",
    "studio artwork",
    "pop culture art",
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Art Gallery & Studio Work | B. Van Sanders",
    description:
      "Finished works, process shots, and installations from the studio of B. Van Sanders, an abstract and pop-art painter.",
    type: "website",
    url: absoluteUrl("/gallery"),
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
    title: "Art Gallery & Studio Work | B. Van Sanders",
    description:
      "Finished works, process shots, and installations from the studio of B. Van Sanders.",
    images: [absoluteUrl(seoConfig.og.defaultImage)],
  },
};

export default function GalleryPage() {
  return (
    <Container>
      <div className="pt-11 md:pt-[70px]">
        <Eyebrow>From the studio</Eyebrow>
        <h1 className="font-display mb-4 text-[clamp(30px,4.5vw,44px)] uppercase leading-none">
          Gallery
        </h1>
        <p className="mb-0 max-w-[540px] text-[15px] leading-relaxed text-ink-soft">
          A look through the studio: process shots, finished works, and
          installations.
        </p>
      </div>
      <Section>
        <GalleryView />
      </Section>
    </Container>
  );
}