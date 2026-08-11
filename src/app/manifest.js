import siteConfig from "@/config/site";

export default function manifest() {
  return {
    name: "B. Van Sanders",
    short_name: "BVS",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#FAFAF7",
    icons: [
      {
        src: "/assets/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}