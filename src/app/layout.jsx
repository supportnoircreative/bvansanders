import { Archivo_Black, IBM_Plex_Mono, Inter, Geist } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import siteConfig from "@/config/site";
import { seoConfig } from "@/config/seo";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(seoConfig.siteUrl),

  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },

  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.artistName }],
  creator: seoConfig.artistName,
  publisher: seoConfig.legalName,
  category: "art",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: siteConfig.logo.src,
  },

  manifest: "/manifest.webmanifest",

  openGraph: {
    type: "website",
    siteName: seoConfig.og.siteName,
    locale: seoConfig.og.locale,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    url: seoConfig.siteUrl,
    images: [
      {
        url: seoConfig.og.defaultImage,
        alt: seoConfig.og.defaultAlt,
      },
    ],
  },

  twitter: {
    card: seoConfig.twitter.card,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [seoConfig.og.defaultImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF7",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn("h-full", inter.variable, archivoBlack.variable, plexMono.variable, "font-sans", geist.variable)}
    >
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}