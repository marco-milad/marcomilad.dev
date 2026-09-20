import type { Label } from "@content/types";
import { cn } from "@/lib/cn";
import { Ar } from "./Ar";
import type { SectionTone } from "./Section";

/**
 * The bilingual section marker: `02 — Selected work · أعمال مختارة`.
 * Uppercase + tracking apply to the Latin only; `.ar` resets both, because
 * letter-spacing breaks Arabic cursive joins.
 */
export function Eyebrow({
  index,
  label,
  tone = "paper",
  className,
  // Passes reveal attributes (and anything else a <p> takes) straight
  // through, so callers can put the eyebrow in a cascade.
  ...rest
}: {
  index?: string;
  label: Label;
  tone?: SectionTone;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"p">, "children">) {
  return (
    <p
      {...rest}
      className={cn(
        "font-mono text-meta uppercase",
        tone === "band" ? "text-band-muted" : "text-ink-3",
        className,
      )}
    >
      {index ? `${index} — ` : null}
      {label.en}
      {label.ar ? (
        <>
          {" "}
          <span aria-hidden="true">·</span>{" "}
          <Ar decorative={label.ar.decorative}>{label.ar.text}</Ar>
        </>
      ) : null}
    </p>
  );
}
