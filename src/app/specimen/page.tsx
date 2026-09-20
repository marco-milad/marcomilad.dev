import { notFound } from "next/navigation";
import { Ar } from "@/components/ui/Ar";
import { checkContrast } from "@/lib/contrast";

export const metadata = {
  title: "Design specimen",
  robots: { index: false, follow: false },
};

/**
 * Dev-only specimen. Fonts, colour and the Arabic pairing get signed off here
 * before anything rolls across the site. It must never ship.
 */
const TOKENS = {
  paper: "#f7f3ea",
  paperRaised: "#fcfaf6",
  paperSunk: "#ece6da",
  paperAccent: "#f6ece6",
  ink: "#161513",
  ink2: "#4a4843",
  ink3: "#6f6c65",
  rule: "#dcd5c7",
  ruleStrong: "#8d857a",
  accent: "#b3432b",
  accentText: "#983622",
  accentBright: "#c04a2d",
  band: "#141311",
  bandFg: "#f2eee7",
  bandMuted: "#a6a198",
  bandRule: "#2b2925",
  accentOnBand: "#e2785c",
} as const;

const BRANDS = [
  { name: "M.M Bags", slug: "mm-bags", color: "#1b2b4b", second: "#b8975a" },
  { name: "Gold ERP", slug: "gold", color: "#1e3a5f", second: "#c89b3c" },
  { name: "Ray Lab", slug: "ray-lab", color: "#4f9907", second: null },
  { name: "The Intern", slug: "the-intern", color: "#7f13ec", second: null },
  { name: "OJOS Studio", slug: "ojos", color: "#2f4b37", second: null },
] as const;

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
  { label: "accent-bright / paper", fg: TOKENS.accentBright, bg: TOKENS.paper, usage: "Hero display Arabic", need: "large" },
  { label: "accent-text / paper", fg: TOKENS.accentText, bg: TOKENS.paper, usage: "Small accent text, links", need: "normal" },
  { label: "accent-text / paper-accent", fg: TOKENS.accentText, bg: TOKENS.paperAccent, usage: "Links on tinted surface", need: "normal" },
  { label: "ink / paper-accent", fg: TOKENS.ink, bg: TOKENS.paperAccent, usage: "Text on tinted surface", need: "normal" },
  { label: "ink-2 / paper-sunk", fg: TOKENS.ink2, bg: TOKENS.paperSunk, usage: "Frame chrome", need: "normal" },
  { label: "rule / paper", fg: TOKENS.rule, bg: TOKENS.paper, usage: "Decorative hairlines", need: "decorative" },
  { label: "rule-strong / paper", fg: TOKENS.ruleStrong, bg: TOKENS.paper, usage: "Button + input borders", need: "nonText" },
  { label: "band-fg / band", fg: TOKENS.bandFg, bg: TOKENS.band, usage: "Ink-section body", need: "normal" },
  { label: "band-muted / band", fg: TOKENS.bandMuted, bg: TOKENS.band, usage: "Ink-section meta", need: "normal" },
  { label: "accent-on-band / band", fg: TOKENS.accentOnBand, bg: TOKENS.band, usage: "Ink-section accent", need: "normal" },
];

/** Mix two hex colours in sRGB — mirrors what color-mix does at render time. */
function mix(a: string, b: string, weightA: number): string {
  const parse = (hex: string): [number, number, number] => {
    const v = Number.parseInt(hex.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const m = (x: number, y: number) => Math.round(x * weightA + y * (1 - weightA));
  return (
    "#" +
    [m(ar, br), m(ag, bg), m(ab, bb)]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
  );
}

const VERBS = [
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
          <span className="text-accent-text">{index}</span> — {label}{" "}
          <span aria-hidden="true">·</span> <Ar decorative>{ar}</Ar>
        </p>
        {children}
      </div>
    </section>
  );
}

export default function SpecimenPage() {
  if (process.env.NODE_ENV === "production" && process.env.SPECIMEN !== "1") {
    notFound();
  }

  return (
    <>
      {/* ---------- A. Hero direction: bold Arabic display ---------- */}
      <section className="relative overflow-hidden py-section">
        <div className="mx-auto w-full max-w-content px-gutter">
          <p className="font-mono text-meta uppercase text-ink-3">
            <span className="text-accent-text">00</span> — Hero direction{" "}
            <span aria-hidden="true">·</span> <Ar decorative>الواجهة</Ar>
          </p>

          <div className="relative mt-block">
            {/* The decorative Arabic moment, in Qahiri. */}
            <p
              aria-hidden="true"
              lang="ar"
              dir="rtl"
              className="ar-kufi pointer-events-none select-none text-[clamp(4rem,14vw,11rem)] leading-none text-accent-soft"
            >
              أبني
            </p>

            <h1 className="-mt-[0.35em] text-display-xl">
              Software engineer,
              <br />
              idea to <span className="text-accent">production</span>.
            </h1>
          </div>

          <p className="mt-block max-w-prose text-lead text-ink-2">
            The headline is Readex Pro, which draws Latin and Arabic in one
            design. The large Arabic behind it is Qahiri, an angular Kufi used
            only at display size.
          </p>

          <div className="mt-section flex flex-wrap items-baseline gap-8">
            <p
              aria-hidden="true"
              lang="ar"
              dir="rtl"
              className="ar-kufi text-[clamp(3rem,9vw,7rem)] leading-none text-accent"
            >
              ماركو ميلاد
            </p>
            <p className="font-mono text-meta uppercase text-ink-3">
              Qahiri · accent
            </p>
          </div>

          <div className="mt-block flex flex-wrap items-baseline gap-8">
            <p
              aria-hidden="true"
              lang="ar"
              dir="rtl"
              className="ar text-[clamp(3rem,9vw,7rem)] leading-none text-accent"
            >
              ماركو ميلاد
            </p>
            <p className="font-mono text-meta uppercase text-ink-3">
              Readex Pro · accent
            </p>
          </div>
        </div>
      </section>

      {/* ---------- B. The two Arabic faces, side by side ---------- */}
      <Section index="01" label="Arabic faces" ar="الخطوط">
        <div className="grid gap-block lg:grid-cols-3">
          {[
            { name: "Qahiri", cls: "ar-kufi", role: "Display only" },
            { name: "Readex Pro", cls: "ar", role: "Reading Arabic — and the Latin beside it" },
            { name: "Readex Pro", cls: "ar ar-display", role: "Display pairing (.ar-display)" },
          ].map((face) => (
            <div key={face.role} className="border-t border-rule pt-5">
              <p className="font-mono text-meta uppercase text-ink-3">
                {face.name} · {face.role}
              </p>
              <p
                lang="ar"
                dir="rtl"
                className={`${face.cls} mt-5 text-[3.5rem] leading-tight`}
              >
                أعمال مختارة
              </p>
              <p lang="ar" dir="rtl" className={`${face.cls} mt-4 text-h3`}>
                أفهم · أنظّم · أبني
              </p>
              <p lang="ar" dir="rtl" className={`${face.cls} mt-4 text-body`}>
                عيار · مصنعية · كسر · سبائك
              </p>
            </div>
          ))}
        </div>

        <p className="mt-block max-w-prose text-body text-ink-2">
          The bottom line in each column is the Gold ERP glossary — real
          reading text. It is there to show why Qahiri is kept to display
          sizes: it is built for scale, and the domain terms have to be read.
        </p>
      </Section>

      {/* ---------- C. Verb chain, bolder ---------- */}
      <Section index="02" label="Verb chain" ar="سلسلة الأفعال">
        <ol className="grid gap-8 md:grid-cols-5">
          {VERBS.map((verb, i) => (
            <li key={verb.en} className="border-t border-rule pt-4">
              <p className="font-mono text-meta text-accent-text">0{i + 1}</p>
              <p className="mt-2 text-h3">{verb.en}</p>
              <p
                aria-hidden="true"
                lang="ar"
                dir="rtl"
                className="ar-kufi mt-2 text-[2.25rem] leading-none text-accent"
              >
                {verb.ar}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- D. Base colour + contrast ---------- */}
      <Section index="03" label="Colour + contrast" ar="الألوان">
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

      {/* ---------- E. Per-project brand colour ---------- */}
      <Section index="04" label="Per-project colour" ar="ألوان المشاريع">
        <p className="mb-block max-w-prose text-body text-ink-2">
          Each case study gets a tinted hero band and its own rule, sampled
          from that product&rsquo;s own screenshots. Raw brand colour is never
          used for small text — a darkened mix is, and it is checked below.
        </p>

        <div className="flex flex-col gap-6">
          {BRANDS.map((brand) => {
            const tint = mix(brand.color, TOKENS.paper, 0.07);
            const brandInk = mix(brand.color, TOKENS.ink, 0.72);
            const onTint = checkContrast(TOKENS.ink, tint);
            const inkOnPaper = checkContrast(brandInk, TOKENS.paper);

            return (
              <div
                key={brand.slug}
                className="overflow-hidden rounded-figure border border-rule"
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-4 px-6 py-8"
                  style={{ background: tint }}
                >
                  <div>
                    <p
                      className="font-mono text-meta uppercase"
                      style={{ color: brandInk }}
                    >
                      Case study
                    </p>
                    <p className="mt-2 text-h2">{brand.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block h-10 w-10 rounded-full"
                      style={{ background: brand.color }}
                    />
                    {brand.second ? (
                      <span
                        className="inline-block h-10 w-10 rounded-full"
                        style={{ background: brand.second }}
                      />
                    ) : null}
                  </div>
                </div>
                <div
                  className="h-1"
                  style={{ background: brand.color }}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap gap-x-8 gap-y-2 px-6 py-4 font-mono text-meta text-ink-3">
                  <span>brand {brand.color}</span>
                  <span>tint {tint}</span>
                  <span>
                    ink-on-tint {onTint.ratio.toFixed(2)}{" "}
                    {onTint.normalAA ? "PASS" : "FAIL"}
                  </span>
                  <span>
                    brand-ink {brandInk} on paper {inkOnPaper.ratio.toFixed(2)}{" "}
                    {inkOnPaper.normalAA ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ---------- F. Motion ---------- */}
      <Section index="05" label="Motion" ar="الحركة" tone="band">
        <p className="max-w-prose text-lead text-band-muted">
          Entrances are scroll-driven CSS with no JavaScript. Hover states are
          plain transitions on shared duration and easing tokens. Everything
          below is switched off entirely under reduced motion.
        </p>

        <ul className="mt-block grid gap-6 md:grid-cols-3">
          {["Fade + rise on entry", "Staggered children", "Hover lift"].map(
            (item) => (
              <li
                key={item}
                className="rounded-figure border border-band-rule p-6 transition-transform duration-base ease-editorial hover:-translate-y-1"
              >
                <p className="text-h3">{item}</p>
                <p className="mt-2 text-small text-band-muted">
                  Scroll past this row to see it, then hover.
                </p>
              </li>
            ),
          )}
        </ul>
      </Section>
    </>
  );
}
