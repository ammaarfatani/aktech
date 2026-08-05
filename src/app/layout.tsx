import type { Metadata } from "next";
import { fontSans, fontHeading } from "@/styles/fonts";
import { Navbar } from "@/components/shared/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Footer } from "@/components/shared/Footer";
import { AIChatBot } from "@/components/AIChatBot";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@aktech",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-[#060816] text-[#F9FAFB] antialiased selection:bg-blue-500/30 selection:text-blue-300 flex flex-col",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <AIChatBot />
      </body>
    </html>
  );
}
