import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Arabic subset only — the Latin glyphs come from Geist.
// adjustFontFallback is off on purpose: next/font's synthetic fallback is
// metric-matched to a Latin face, which makes Arabic flash in a serif.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marcomilad.dev"),
  title: {
    default: "Eng. Marco Milad — Product Engineer",
    template: "%s — Marco Milad",
  },
  description:
    "Product engineer taking digital products from idea to production. React, Next.js and TypeScript, full-stack on Postgres.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${plexArabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
