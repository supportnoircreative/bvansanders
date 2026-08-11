import { Suspense } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { Container } from "@/components/ui/Container";
import { seoConfig, absoluteUrl } from "@/config/seo";

export const metadata = {
  title: "Contact & Art Commissions",
  description:
    "Buy an original or print, commission a custom piece, or ask a question — reach B. Van Sanders' studio.",
  keywords: [
    "art commissions",
    "commission an artist",
    "commission a painting",
    "buy original artwork",
    "buy art prints",
    "contact B. Van Sanders",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Art Commissions | B. Van Sanders",
    description:
      "Buy an original or print, commission a custom piece, or ask a question — reach B. Van Sanders' studio.",
    type: "website",
    url: absoluteUrl("/contact"),
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
    title: "Contact & Art Commissions | B. Van Sanders",
    description:
      "Buy an original or print, commission a custom piece, or ask a question — reach B. Van Sanders' studio.",
    images: [absoluteUrl(seoConfig.og.defaultImage)],
  },
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-11 pb-[70px] md:py-[70px] md:pb-28">
        <Eyebrow>Get in touch</Eyebrow>
        <h1 className="font-display mb-6 text-[36px] uppercase leading-none">
          Contact
        </h1>

        <div className="grid gap-10 md:grid-cols-2 md:gap-[60px]">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
          <ContactInfo />
        </div>
      </div>
    </Container>
  );
}