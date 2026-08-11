import { seoConfig } from "@/config/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/checkout",
          "/orders",
          "/login",
          "/forgot-password",
        ],
      },
    ],
    sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
  };
}