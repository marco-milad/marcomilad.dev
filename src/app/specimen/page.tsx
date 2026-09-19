import { notFound } from "next/navigation";
import { Ar } from "@/components/ui/Ar";
import { checkContrast } from "@/lib/contrast";

export const metadata = {
  title: "Design specimen",
  robots: { index: false, follow: false },
};

/**
 * Dev-only specimen. Fonts, colors and the Arabic pairing get signed off here
 * before any real page is built. It must never ship.
 */
const TOKENS = {
  paper: "#f5f2ec",
  paperRaised: "#fbf9f5",
  paperSunk: "#ece7df",
  ink: "#161513",
  ink2: "#4a4843",
  ink3: "#6f6c65",
  rule: "#d9d3c8",
  ruleStrong: "#8d857a",
  accent: "#b3432b",
  accentText: "#983622",
  band: "#141311",
  bandFg: "#f2eee7",
  bandMuted: "#a6a198",
  bandRule: "#2b2925",
  accentOnBand: "#e2785c",
} as const;

type Need = "normal" | "large" | "nonText" | "decorative";

const PAIRS: Array<{
  label: string;
  fg: string;
  bg: string;
  usage: string;
  need: Need;
}> = [
  { label: "ink / paper", fg: TOKENS.ink, bg: TOKENS.paper, usage: "Body text", need: "normal" },
  { label: "ink-2 / paper", fg: TOKENS.ink2, bg: TOKENS.paper, usage: "Secondary text", need: "normal" },
  { label: "ink-3 / paper", fg: TOKENS.ink3, bg: TOKENS.paper, usage: "Meta, captions", need: "normal" },
  { label: "accent / paper", fg: TOKENS.accent, bg: TOKENS.paper, usage: "Large type, rules", need: "large" },
  { label: "accent-text / paper", fg: TOKENS.accentText, bg: TOKENS.paper, usage: "Small accent text", need: "normal" },
  { label: "rule / paper", fg: TOKENS.rule, bg: TOKENS.paper, usage: "Decorative hairlines", need: "decorative" },
  { label: "rule-strong / paper", fg: TOKENS.ruleStrong, bg: TOKENS.paper, usage: "Button + input borders", need: "nonText" },
  { label: "ink / paper-sunk", fg: TOKENS.ink, bg: TOKENS.paperSunk, usage: "Text on figure plates", need: "normal" },
  { label: "ink-3 / paper-raised", fg: TOKENS.ink3, bg: TOKENS.paperRaised, usage: "Card meta", need: "normal" },
  { label: "band-fg / band", fg: TOKENS.bandFg, bg: TOKENS.band, usage: "Ink-section body", need: "normal" },
  { label: "band-muted / band", fg: TOKENS.bandMuted, bg: TOKENS.band, usage: "Ink-section meta", need: "normal" },
  { label: "accent-on-band / band", fg: TOKENS.accentOnBand, bg: TOKENS.band, usage: "Ink-section accent + focus", need: "normal" },
  { label: "band-rule / band", fg: TOKENS.bandRule, bg: TOKENS.band, usage: "Ink-section decorative hairlines", need: "decorative" },
];

const TYPE_SCALE: Array<{
  token: string;
  cls: string;
  sample: string;
  ar: string;
  /** Display sizes need the smaller Arabic factor. */
  arDisplay?: boolean;
}> = [
  { token: "display-xl", cls: "text-display-xl", sample: "Idea to production", ar: "من الفكرة للإنتاج", arDisplay: true },
  { token: "display", cls: "text-display", sample: "Selected work", ar: "أعمال مختارة", arDisplay: true },
  { token: "h2", cls: "text-h2", sample: "Engineering decisions", ar: "قرارات هندسية", arDisplay: true },
  { token: "h3", cls: "text-h3", sample: "Technical architecture", ar: "البنية التقنية" },
  { token: "lead", cls: "text-lead", sample: "A product engineer who ships, then keeps improving.", ar: "مهندس منتجات يبني ويطوّر" },
  { token: "body", cls: "text-body", sample: "The same data model serves the storefront and the shop counter.", ar: "نفس نموذج البيانات يخدم المتجر والمحل" },
  { token: "small", cls: "text-small", sample: "Measured on the deployed preview, mobile profile.", ar: "مقاسة على النسخة المنشورة" },
];

const VERBS: Array<{ en: string; ar: string }> = [
  { en: "Understand", ar: "أفهم" },
  { en: "Structure", ar: "أنظّم" },
  { en: "Engineer", ar: "أبني" },
  { en: "Ship", ar: "أُطلق" },
  { en: "Improve", ar: "أطوّر" },
];

function Section({
  index,
  label,
  ar,
  children,
  tone = "paper",
}: {
  index: string;
  label: string;
  ar: string;
  children: React.ReactNode;
  tone?: "paper" | "band";
}) {
  return (
    <section className={tone === "band" ? "band py-section" : "py-section"}>
      <div className="mx-auto w-full max-w-content px-gutter">
        <p
          className={
            tone === "band"
              ? "mb-block font-mono text-meta uppercase text-band-muted"
              : "mb-block font-mono text-meta uppercase text-ink-3"
          }
        >
          {index} — {label} <span aria-hidden="true">·</span>{" "}
          <Ar decorative>{ar}</Ar>
        </p>
        {children}
      </div>
    </section>
  );
}

export default function SpecimenPage() {
  // Visible in dev, and in a local production build when SPECIMEN=1 is set.
  // Vercel never sets it, so the deployed site 404s this route.
  if (process.env.NODE_ENV === "production" && process.env.SPECIMEN !== "1") {
    notFound();
  }

  return (
    <main>
      <Section index="00" label="Specimen" ar="نموذج">
        <h1 className="text-display-xl">
          Eng. Marco Milad <span aria-hidden="true">·</span>{" "}
          <Ar decorative className="ar-display">
            ماركو ميلاد
          </Ar>
        </h1>
        <p className="mt-6 max-w-prose text-lead text-ink-2">
          Phase 1 sign-off: type scale, color contrast, and how Arabic sits
          beside English. This page is not part of the site.
        </p>
      </Section>

      <Section index="01" label="Color + contrast" ar="الألوان">
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl border-collapse text-small">
            <thead>
              <tr className="border-b border-rule font-mono text-meta uppercase text-ink-3">
                <th className="py-3 text-start font-normal">Pair</th>
                <th className="py-3 text-start font-normal">Usage</th>
                <th className="py-3 text-start font-normal">Sample</th>
                <th className="py-3 text-end font-normal">Ratio</th>
                <th className="py-3 text-end font-normal">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {PAIRS.map((pair) => {
                const result = checkContrast(pair.fg, pair.bg);
                const passes =
                  pair.need === "decorative"
                    ? true
                    : pair.need === "normal"
                      ? result.normalAA
                      : pair.need === "large"
                        ? result.largeAA
                        : result.nonTextAA;
                const threshold =
                  pair.need === "decorative"
                    ? "n/a"
                    : pair.need === "normal"
                      ? "4.5:1"
                      : "3:1";

                return (
                  <tr key={pair.label} className="border-b border-rule">
                    <td className="py-3 font-mono text-meta">{pair.label}</td>
                    <td className="py-3 text-ink-2">{pair.usage}</td>
                    <td className="py-3">
                      <span
                        className="inline-block rounded-figure px-3 py-1"
                        style={{ background: pair.bg, color: pair.fg }}
                      >
                        Ag — نص
                      </span>
                    </td>
                    <td className="py-3 text-end font-mono">
                      {result.ratio.toFixed(2)}
                    </td>
                    <td className="py-3 text-end font-mono text-meta">
                      {pair.need === "decorative" ? "—" : passes ? "PASS" : "FAIL"}{" "}
                      ({threshold})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section index="02" label="Type scale" ar="المقاسات">
        <div className="space-y-block">
          {TYPE_SCALE.map((step) => (
            <div key={step.token} className="border-t border-rule pt-5">
              <p className="mb-3 font-mono text-meta uppercase text-ink-3">
                {step.token}
              </p>
              <p className={step.cls}>{step.sample}</p>
              <p className={step.cls + " mt-2 text-ink-2"}>
                <Ar className={step.arDisplay ? "ar-display" : undefined}>
                  {step.ar}
                </Ar>
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="03" label="Verb chain" ar="سلسلة الأفعال" tone="band">
        <p className="max-w-prose text-lead text-band-muted">
          The core message as five bilingual verbs. It repeats in the hero, in
          the process section, and as chapter markers inside every case study.
        </p>
        <ol className="mt-block grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {VERBS.map((verb, i) => (
            <li key={verb.en}>
              <p className="font-mono text-meta text-band-muted">0{i + 1}</p>
              <p className="mt-2 text-h3">{verb.en}</p>
              <p className="mt-1 text-h3 text-accent-on-band">
                <Ar decorative>{verb.ar}</Ar>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="04" label="Components" ar="المكوّنات">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="inline-flex h-13 items-center rounded-figure bg-ink px-6 text-paper transition-colors duration-200 hover:bg-accent"
          >
            View selected work
          </a>
          <a
            href="#"
            className="inline-flex h-13 items-center rounded-figure border border-rule-strong px-6 transition-colors duration-200 hover:border-ink"
          >
            Get in touch
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-rule px-3 py-1 font-mono text-meta uppercase text-ink-2">
            <span aria-hidden="true">●</span> In production
          </span>
          <span className="inline-flex items-center rounded-full border border-rule px-3 py-1 font-mono text-meta uppercase text-ink-2">
            Web · iOS · Android
          </span>
        </div>
        <p className="mt-block max-w-prose text-body text-ink-2">
          A paragraph at reading width, with an{" "}
          <a
            href="#"
            className="text-accent-text underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            inline link
          </a>{" "}
          and a domain term that carries its own meaning: <Ar>مصنعية</Ar>{" "}
          (making charge). Tab through the page to check focus rings on both
          grounds.
        </p>
      </Section>
    </main>
  );
}
