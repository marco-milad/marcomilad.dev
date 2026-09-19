import { ar, type Label } from "./types";

/**
 * Every approved Arabic term lives here, so one word is used consistently
 * across the whole site and a native reviewer only has to read one file.
 *
 * Rules:
 * - Structural labels are MSA and decorative (English says the same thing).
 * - Egyptian register is used only for personal moments; those are marked.
 * - Job titles and product names are never translated.
 *
 * Verb chain approved 2026-09-19: أفهم · أنظّم · أبني · أُطلق · أطوّر
 */
export const lexicon = {
  // --- Navigation ---
  work: { en: "Work", ar: ar("أعمال") },
  about: { en: "About", ar: ar("من أنا") },
  resume: { en: "Résumé", ar: ar("السيرة الذاتية") },
  contact: { en: "Contact", ar: ar("تواصل") },

  // --- Section labels ---
  selectedWork: { en: "Selected work", ar: ar("أعمال مختارة") },
  whatIBuild: { en: "What I build", ar: ar("ما أبنيه") },
  process: { en: "Process", ar: ar("المنهج") },
  stack: { en: "Stack", ar: ar("الأدوات") },
  experience: { en: "Experience", ar: ar("الخبرة") },
  background: { en: "Background", ar: ar("الخلفية") },
  caseStudy: { en: "Case study", ar: ar("دراسة حالة") },
  nextProject: { en: "Next project", ar: ar("المشروع التالي") },

  // --- Personal moments (Egyptian register, used sparingly) ---
  letsStart: {
    en: "Let's work together",
    ar: ar("يلا نبدأ", { register: "egyptian" }),
  },
  madeInCairo: {
    en: "Made in Cairo",
    ar: ar("اتعمل في القاهرة", { register: "egyptian" }),
  },
} satisfies Record<string, Label>;

/**
 * The verb chain. It is the spine of the site: hero, process section, and the
 * chapter markers inside every case study all read from this one array.
 */
export const verbChain = [
  { en: "Understand", ar: ar("أفهم"), key: "understand" },
  { en: "Structure", ar: ar("أنظّم"), key: "structure" },
  { en: "Engineer", ar: ar("أبني"), key: "engineer" },
  { en: "Ship", ar: ar("أُطلق"), key: "ship" },
  { en: "Improve", ar: ar("أطوّر"), key: "improve" },
] as const;

export type ChapterKey = (typeof verbChain)[number]["key"];
