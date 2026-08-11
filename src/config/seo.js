import siteConfig from "@/config/site";

/**
 * Central SEO configuration for the B. Van Sanders website.
 *
 * All metadata (titles, descriptions, canonicals, Open Graph, Twitter,
 * sitemap, robots, JSON-LD) is derived from this module so the site stays
 * consistent. Production URL is read from NEXT_PUBLIC_APP_URL — set it to
 * the deployed domain (e.g. https://www.bvansanders.com) in production.
 */

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");

/** Resolve a path (e.g. "/about") to an absolute URL. */
export function absoluteUrl(path = "/") {
  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return siteUrl;
  }
}

/** Human label for a product kind, used in titles, alt text and schema. */
export function kindLabel(kind) {
  switch (kind) {
    case "print":
      return "Giclée Print";
    case "gallery":
      return "Gallery Artwork";
    case "original":
    default:
      return "Original Acrylic Painting";
  }
}

/** Descriptive phrase for alt text / image descriptions. */
export function kindAltPhrase(kind) {
  switch (kind) {
    case "print":
      return "giclée art print";
    case "gallery":
      return "gallery artwork";
    case "original":
    default:
      return "original acrylic painting";
  }
}

export const seoConfig = {
  // Identity
  siteName: siteConfig.name,
  artistName: siteConfig.name,
  artistFullName: "Brett Van Sanders",
  legalName: siteConfig.legalName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  publisher: siteConfig.poweredBy,
  contactEmail: siteConfig.contact.email,

  // URL / canonicals
  siteUrl,
  logoUrl: siteConfig.logo.src,
  portraitUrl: siteConfig.portrait.src,

  // Location — intentionally global for now (no city-specific targeting)
  location: null,

  // Titles
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: "B. Van Sanders | Abstract & Pop Art Painter",

  // Root keywords (short, real terms — never stuffed)
  keywords: [
    "B. Van Sanders",
    "abstract artist",
    "pop art artist",
    "abstract paintings",
    "acrylic paintings",
    "original paintings for sale",
    "giclée art prints",
    "pop culture art",
    "contemporary art",
    "acrylic on canvas",
  ],

  // Open Graph / Twitter
  og: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    defaultImage: siteConfig.portrait.src,
    defaultAlt: siteConfig.portrait.alt,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default seoConfig;
