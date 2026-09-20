import { lexicon } from "./lexicon";
import { ar, type NavItem } from "./types";

/**
 * Identity, contact points and navigation. Edited here, never in components.
 */
export const site = {
  /** Legal/SEO name. */
  name: "Marco Milad",
  /** How the wordmark reads on screen. */
  displayName: "Eng. Marco Milad",
  /** Arabic name — meaningful, so it is NOT hidden from screen readers. */
  nameAr: ar("ماركو ميلاد", { decorative: false }),
  role: "Product Engineer",
  location: { en: "Cairo, Egypt", ar: ar("القاهرة") },

  url: "https://marcomilad.dev",

  email: "miladmarco68@gmail.com",

  links: {
    // Given by Marco 2026-09-19. LinkedIn answers bots with 999/403, so this
    // one cannot be machine-verified — note the CV PDF still links to the older
    // /in/marco-milad-194286328 slug, which should be updated to match.
    linkedin: "https://www.linkedin.com/in/marco-milad-engineer",
    // Confirmed: taken from the CV's own hyperlink, and resolves (200).
    github: "https://github.com/marco-milad",
    // The CV's own number, in wa.me form (country code, no + and no spaces).
    whatsapp: "https://wa.me/201229749608",
  },

  cv: {
    href: "/cv/marco-milad-cv.pdf",
    label: lexicon.resume.en,
    note: "PDF",
  },

  cta: {
    label: lexicon.letsStart,
    href: "/contact",
  },
} as const;

/** Primary navigation. Contact is the CTA, so it is not repeated here. */
export const primaryNav: NavItem[] = [
  { label: lexicon.work, href: "/work" },
  { label: lexicon.about, href: "/about" },
  {
    label: lexicon.resume,
    href: site.cv.href,
    external: true,
    fileNote: site.cv.note,
  },
];

/** Footer navigation adds Contact back, since the CTA is not in the footer. */
export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: lexicon.contact, href: "/contact" },
];
