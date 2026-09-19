/**
 * Shared content types. Kept dependency-free so both content modules and
 * components can import them. Zod schemas arrive in Phase 3 and will be built
 * on top of these shapes.
 */

export type ArRegister = "msa" | "egyptian";

export type ArText = {
  text: string;
  /**
   * Structural labels are Modern Standard Arabic. Egyptian is reserved for the
   * two or three personal moments (final CTA, footer sign-off).
   */
  register: ArRegister;
  /**
   * True when the Arabic only duplicates English already on screen, so it is
   * hidden from screen readers. False when it carries its own meaning.
   */
  decorative: boolean;
};

/** An English label, optionally paired with its Arabic twin. */
export type Label = {
  en: string;
  ar?: ArText;
};

export type NavItem = {
  label: Label;
  href: string;
  /** External or downloadable targets open in a new tab and say so. */
  external?: boolean;
  fileNote?: string;
};

/** Convenience builder so content files stay readable. */
export function ar(
  text: string,
  options: { register?: ArRegister; decorative?: boolean } = {},
): ArText {
  return {
    text,
    register: options.register ?? "msa",
    decorative: options.decorative ?? true,
  };
}
