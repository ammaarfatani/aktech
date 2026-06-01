import { Inter, Space_Grotesk } from "next/font/google";

/**
 * Primary Font - Inter
 * Used for body text, paragraphs, and general UI components.
 * Clean, modern, and highly legible.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Heading Font - Space Grotesk
 * Used for all headings (H1-H6), display text, and numbers.
 * Provides a futuristic, technical, and premium feel.
 */
export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
