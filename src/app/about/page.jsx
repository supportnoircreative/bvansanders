import { AboutSection } from "@/components/sections/AboutSection";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { ARTIST_BIO } from "@/data/about";
import { seoConfig, absoluteUrl } from "@/config/seo";

export const metadata = {
  title: "About B. Van Sanders | Abstract & Pop Artist",
  description:
    "The story of B. Van Sanders — abstract and pop-art painter, 15+ years a graphic and fashion designer, creating bold acrylic paintings inspired by pop culture.",
  keywords: [
    "B. Van Sanders",
    "B. Van Sanders artist",
    "abstract artist",
    "pop art artist",
    "acrylic painter",
    "pop culture artist",
    "contemporary painter",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About B. Van Sanders | Abstract & Pop Artist",
    description:
      "The story of B. Van Sanders — abstract and pop-art painter creating bold acrylic paintings inspired by pop culture.",
    type: "profile",
    url: absoluteUrl("/about"),
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
    title: "About B. Van Sanders | Abstract & Pop Artist",
    description:
      "The story of B. Van Sanders — abstract and pop-art painter creating bold acrylic paintings inspired by pop culture.",
    images: [absoluteUrl(seoConfig.og.defaultImage)],
  },
};

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seoConfig.artistName,
    alternateName: seoConfig.artistFullName,
    jobTitle: "Artist",
    image: absoluteUrl(seoConfig.portraitUrl),
    url: absoluteUrl("/"),
    email: `mailto:${seoConfig.contactEmail}`,
    knowsAbout: [
      "Abstract art",
      "Pop art",
      "Acrylic painting",
      "Graphic design",
      "Fashion design",
    ],
    description: ARTIST_BIO.map(({ text }) => text).join(" "),
  };
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Container>
        <div className="py-11 pb-16 md:py-[70px] md:pb-24">
          <AboutSection />
        </div>
      </Container>
    </>
  );
}
