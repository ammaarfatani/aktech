import type { Metadata, Viewport } from "next";
import { fontSans, fontHeading } from "@/styles/fonts";
import { Navbar } from "@/components/shared/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { OrganizationJsonLd, WebSiteJsonLd, ProfessionalServiceJsonLd } from "@/components/shared/JsonLd";
import { Analytics } from "@/components/shared/Analytics";

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "AKTECH Digital Solutions | Web, Software & AI Development Agency",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "AKTECH Digital Solutions | Web, Software & AI Development Agency",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AKTECH Digital Solutions — Enterprise Web & AI Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKTECH Digital Solutions | Web, Software & AI Development Agency",
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "500x500" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/logo.png", sizes: "500x500", type: "image/png" },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <Analytics />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ProfessionalServiceJsonLd />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white text-[#111111] antialiased selection:bg-[#E0000B]/20 selection:text-[#E0000B] flex flex-col",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
