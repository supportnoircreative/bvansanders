import { Hero } from "@/components/sections/Hero";
import { CatalogView } from "@/components/sections/CatalogView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/buttons";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoConfig, absoluteUrl } from "@/config/seo";

export const metadata = {
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    type: "website",
    url: absoluteUrl("/"),
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
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [absoluteUrl(seoConfig.og.defaultImage)],
  },
};

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: absoluteUrl("/"),
    description: seoConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: seoConfig.legalName,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <Container>
        <Section>
          <CatalogView
            title="Recently added"
            note="A few current pieces from the studio: originals and open-edition prints."
            cta={
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Button href="/originals" variant="ghost">
                  Browse original paintings
                </Button>
                <Button href="/prints" variant="ghost">
                  Browse giclée prints
                </Button>
                <Button href="/about" variant="ghost">
                  About the artist
                </Button>
              </div>
            }
          />
        </Section>
      </Container>
    </>
  );
}
