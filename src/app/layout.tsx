import type { Metadata } from "next";
import { Geist_Mono, Qahiri, Readex_Pro } from "next/font/google";
import { site } from "@content/site";
import { Reveals } from "@/components/motion/Reveals";
import { RevealScript } from "@/components/motion/RevealScript";
import { HeaderScroll } from "@/components/layout/HeaderScroll";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SocialRail } from "@/components/layout/SocialRail";
import "./globals.css";

/**
 * One family for both scripts.
 *
 * Readex Pro draws Latin and Arabic in the same design, so an English word and
 * its Arabic twin sit at the same weight and optical size without being tuned
 * against each other. That is the whole reason for the switch: the previous
 * pairing needed the Arabic bumped 12% just to stop it looking small beside
 * Geist, and any change to one side meant re-checking the other.
 *
 * The fallback list matters here. next/font's metric-matched fallback is built
 * on a Latin face with no Arabic glyphs, so without these the Arabic runs
 * would flash in a serif before the real font lands.
 */
const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin", "arabic"],
  display: "swap",
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});

/**
 * Meta voice: eyebrows, indices, figure numbers, fact-sheet labels. Kept as
 * it was — a monospace is a different job from the text face, and Readex Pro
 * has no mono to hand it to.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display Arabic: the hero watermark, the verb chain, the large twins.
 * Decorative only — reading Arabic stays in Readex Pro.
 *
 * preload stays off: every use of it is either below the fold or absolutely
 * positioned, so a late swap cannot move layout, and the hero LCP is not made
 * to wait on a font that draws a watermark.
 */
const qahiri = Qahiri({
  variable: "--font-qahiri",
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
});

/**
 * Where this build is actually being served.
 *
 * The share card's URL is built from this, so it has to be a host that
 * answers. Hardcoding marcomilad.dev meant every link preview asked a domain
 * that does not resolve yet for its image, and got nothing back — the card
 * existed and nobody could see it.
 *
 * On Vercel, VERCEL_PROJECT_PRODUCTION_URL is the project's production domain:
 * the vercel.app address today, and marcomilad.dev by itself the moment that
 * domain is attached — no change needed here when it goes live. Anywhere else
 * the variable is absent and this falls back to site.url as before.
 */
const deployedUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : site.url;

export const metadata: Metadata = {
  metadataBase: new URL(deployedUrl),
  title: {
    default: "Marco Milad — Software Engineer (React, Next.js, TypeScript)",
    template: "%s — Marco Milad",
  },
  description:
    "Software engineer taking digital products from idea to production. React, Next.js and TypeScript, full-stack on Postgres.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  // Single-language document: Arabic appears as tagged islands, not as an
  // alternate version of the site, so there is no hreflang here.
  openGraph: {
    type: "website",
    locale: "en",
    siteName: `${site.displayName} · ${site.nameAr.text}`,
    // Relative, so it resolves against metadataBase like the image does.
    // LinkedIn and Facebook follow og:url to scrape the preview; an absolute
    // URL on a domain that is not live yet sends them to nothing.
    url: "/",
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
      className={`${readex.variable} ${geistMono.variable} ${qahiri.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        {/* First thing in the body: it arms the entrance cascade while the
            rest of the document is still being parsed, so nothing is ever
            painted and then pulled away. */}
        <RevealScript />
        {/* Sits above the header in the document so it can tell when the page
            has scrolled; inside the sticky header it would never move. */}
        <HeaderScroll />
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
