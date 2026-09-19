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

  // TODO(marco): confirm both handles before launch — taken from the previous
  // portfolio repo, not from the CV (its links are compressed in the PDF).
  links: {
    linkedin: "https://www.linkedin.com/in/marco-milad194286328/",
    github: "https://github.com/marco-milad",
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
