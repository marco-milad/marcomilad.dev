/**
 * WCAG 2.x contrast math.
 *
 * Two jobs: proving token pairs on the design specimen before they are locked,
 * and deriving a readable ink from each product's own brand colour at build
 * time, which is the only part of this that reaches a public page.
 */

/**
 * Mirrors the tokens in globals.css. Duplicated rather than imported because
 * these are CSS custom properties, and the derivation below has to happen in
 * TypeScript — a browser cannot tell you the contrast of a color-mix().
 */
const PAPER = "#f7f3ea";
const INK = "#161513";

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const value = Number.parseInt(full, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

/** Contrast ratio between two hex colors, 1–21. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

/** Mix two hex colours in sRGB — what color-mix(in srgb, …) does, in TS. */
export function mix(a: string, b: string, weightA: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const channel = (x: number, y: number) =>
    Math.round(x * weightA + y * (1 - weightA));
  return `#${[channel(ar, br), channel(ag, bg), channel(ab, bb)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")}`;
}

/** The 7% tint a case-study hero puts behind itself. */
export function brandTint(brand: string): string {
  return mix(brand, PAPER, 0.07);
}

/**
 * A readable ink derived from a product's brand colour.
 *
 * This used to be a flat `color-mix(brand 72%, ink)`, which worked only
 * because every brand on the site happened to be dark. The first light one —
 * Brand Key's gold — produced a mix that was still too pale to read, and axe
 * caught it on three routes at once.
 *
 * So the ratio is measured rather than assumed: start at the 72% that keeps
 * the dark brands looking exactly as they did, and step the brand back toward
 * ink until the result actually clears the target against the surface it sits
 * on. Build-time arithmetic, no runtime cost.
 */
export function brandInk(
  brand: string,
  background: string = PAPER,
  target = 4.5,
): string {
  for (let weight = 72; weight > 0; weight -= 4) {
    const candidate = mix(brand, INK, weight / 100);
    if (contrastRatio(candidate, background) >= target) return candidate;
  }
  return INK;
}

export type ContrastVerdict = {
  ratio: number;
  /** 4.5:1 — body text. */
  normalAA: boolean;
  /** 3:1 — text ≥ 24px, or ≥ 19px bold. */
  largeAA: boolean;
  /** 3:1 — borders, icons, focus rings. */
  nonTextAA: boolean;
};

export function checkContrast(
  foreground: string,
  background: string,
): ContrastVerdict {
  const ratio = contrastRatio(foreground, background);
  return {
    ratio,
    normalAA: ratio >= 4.5,
    largeAA: ratio >= 3,
    nonTextAA: ratio >= 3,
  };
}
