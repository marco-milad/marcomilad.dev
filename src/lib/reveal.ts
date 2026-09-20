import type { CSSProperties } from "react";

/**
 * Entrance motion, decided at render time.
 *
 * `reveal(i)` returns the attributes that opt an element into the site-wide
 * cascade: a `data-reveal` flag for the observer to pick up, and a delay so a
 * group arrives one beat after another instead of all at once. The delay ships
 * in the HTML as an inline custom property, so the stagger itself costs no
 * JavaScript — the client only decides *when* a group starts.
 *
 * `revealNow(i)` is the same cadence for content above the fold, started by
 * the stylesheet rather than by the observer. See globals.css for why.
 *
 * One rule when using these: the element that carries them must not also carry
 * a hover transform. The entrance animation holds `transform: none` when it
 * finishes, and a finished animation outranks a transition, so the hover would
 * be ignored. Put the hover on a child — which is where `group-hover` wants it
 * anyway.
 */

/** One beat. Slow enough to read as a sequence, fast enough to stay out of the way. */
const STEP_MS = 70;

/**
 * A list of twenty would otherwise put its last item 1.4s behind its first,
 * which reads as a stall rather than a cascade. After this many beats the
 * stagger flattens.
 */
const MAX_STEPS = 7;

type RevealOptions = {
  /** Override the beat — a tighter one suits dense rows. */
  step?: number;
  /** Vertical travel in px. Smaller for meta text, larger for full blocks. */
  shift?: number;
  /**
   * Horizontal travel in px, for the few things that should arrive from the
   * side rather than from below — the hero watermark drifts in from the edge
   * it sits on. Positive is to the right.
   */
  shiftX?: number;
  /** Merged in, so an element that already carries a brand colour keeps it. */
  style?: CSSProperties;
  /**
   * Set false to move without fading.
   *
   * This exists for one reason: Chrome does not count an element that paints
   * at opacity 0 as a Largest Contentful Paint candidate, and does not go back
   * and reconsider it once it fades in. A faded-in headline therefore drops
   * out of the metric while the reader genuinely waits longer for it — the
   * number improves and the experience does not. Anything that is or could be
   * the LCP element moves only, so the measurement stays honest.
   */
  fade?: boolean;
};

type RevealProps = {
  "data-reveal": "";
  "data-reveal-solid"?: "";
  style?: CSSProperties;
};
type RevealNowProps = {
  "data-reveal-now": "";
  "data-reveal-solid"?: "";
  style?: CSSProperties;
};

function revealStyle(
  index: number,
  { step = STEP_MS, shift, shiftX, style }: RevealOptions,
): CSSProperties | undefined {
  const delay = Math.min(Math.max(index, 0), MAX_STEPS) * step;
  const custom: Record<string, string> = {};

  if (delay > 0) custom["--reveal-delay"] = `${delay}ms`;
  if (shift !== undefined) custom["--reveal-shift"] = `${shift}px`;
  if (shiftX !== undefined) custom["--reveal-shift-x"] = `${shiftX}px`;

  const merged = { ...style, ...custom } as CSSProperties;
  return Object.keys(merged).length > 0 ? merged : undefined;
}

/** Scroll-triggered. The default for everything below the fold. */
export function reveal(index = 0, options: RevealOptions = {}): RevealProps {
  const style = revealStyle(index, options);
  return {
    "data-reveal": "",
    ...(options.fade === false ? { "data-reveal-solid": "" as const } : {}),
    ...(style ? { style } : {}),
  };
}

/**
 * Fires on load instead of on scroll. For the first screen only — an element
 * that is already visible should not be waiting on the bundle, least of all
 * the one the browser is going to call LCP.
 */
export function revealNow(
  index = 0,
  options: RevealOptions = {},
): RevealNowProps {
  const style = revealStyle(index, options);
  return {
    "data-reveal-now": "",
    ...(options.fade === false ? { "data-reveal-solid": "" as const } : {}),
    ...(style ? { style } : {}),
  };
}
