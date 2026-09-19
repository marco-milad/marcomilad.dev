import { cn } from "@/lib/cn";

type BadgeVariant =
  /** Live product. Carries a dot. */
  | "status"
  /** Platforms, languages, stack items. */
  | "neutral"
  /** Disclosure the reader must see: sample data, NDA, permissions. */
  | "note";

const VARIANTS: Record<BadgeVariant, string> = {
  status: "border-rule text-ink-2",
  neutral: "border-rule text-ink-2",
  note: "border-accent/40 text-accent-text",
};

const BAND_VARIANTS: Record<BadgeVariant, string> = {
  status: "border-band-rule text-band-muted",
  neutral: "border-band-rule text-band-muted",
  note: "border-accent-on-band/40 text-accent-on-band",
};

export function Badge({
  variant = "neutral",
  tone = "paper",
  className,
  children,
}: {
  variant?: BadgeVariant;
  tone?: "paper" | "band";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1",
        "font-mono text-meta uppercase",
        tone === "band" ? BAND_VARIANTS[variant] : VARIANTS[variant],
        className,
      )}
    >
      {variant === "status" ? (
        <span aria-hidden="true" className="text-accent">
          ●
        </span>
      ) : null}
      {children}
    </span>
  );
}
