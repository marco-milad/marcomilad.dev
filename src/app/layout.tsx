import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans_Arabic,
  Reem_Kufi,
} from "next/font/google";
import { site } from "@content/site";
import { Reveals } from "@/components/motion/Reveals";
import { RevealScript } from "@/components/motion/RevealScript";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SocialRail } from "@/components/layout/SocialRail";
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
  // 400 only: measured on the built site, every Arabic run computes to 400 or
  // 500, and 500 resolves down to 400 when no 500 face exists. The 600 file
  // was being downloaded and never drawn.
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});

/**
 * Display Arabic, chosen over Noto Kufi at the specimen for having more
 * personality at size. Decorative use only — reading Arabic stays in Plex.
 *
 * preload stays off: every use of it is either below the fold or absolutely
 * positioned, so a late swap cannot move layout, and the hero LCP is not made
 * to wait on a font that draws a watermark.
 */
const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Marco Milad — Product Engineer (React, Next.js, TypeScript)",
    template: "%s — Marco Milad",
  },
  description:
    "Product engineer taking digital products from idea to production. React, Next.js and TypeScript, full-stack on Postgres.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  // Single-language document: Arabic appears as tagged islands, not as an
  // alternate version of the site, so there is no hreflang here.
  openGraph: {
    type: "website",
    locale: "en",
    siteName: `${site.displayName} · ${site.nameAr.text}`,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${plexArabic.variable} ${reemKufi.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        {/* First thing in the body: it arms the entrance cascade while the
            rest of the document is still being parsed, so nothing is ever
            painted and then pulled away. */}
        <RevealScript />
        <SkipLink />
        <SiteHeader />
        <SocialRail />
        {/* tabIndex -1 so both the skip link and the rail's back-to-top can
            put the keyboard here. */}
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <Reveals />
      </body>
    </html>
  );
}
