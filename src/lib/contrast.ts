/**
 * WCAG 2.x contrast math. Used by the design specimen to prove token pairs
 * before they are locked — not shipped on any public page.
 */

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
