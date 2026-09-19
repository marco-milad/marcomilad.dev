import { verbChain } from "@content/lexicon";
import { cn } from "@/lib/cn";
import { Ar } from "@/components/ui/Ar";

/**
 * The signature bilingual element.
 *
 * Desktop: one row, English above its Arabic twin.
 * Phone: five stacked rows with the English at the line start and the Arabic
 * at the line end — the row itself shows both directions, which is the point.
 */
export function VerbChain({
  tone = "paper",
  className,
}: {
  tone?: "paper" | "band";
  className?: string;
}) {
  const band = tone === "band";

  return (
    <ol className={cn("flex flex-col gap-3 md:flex-row md:gap-8", className)}>
      {verbChain.map((verb, index) => (
        <li
          key={verb.key}
          className={cn(
            "flex items-baseline justify-between gap-4 border-t pt-3",
            // Equal columns on desktop: content-width columns read ragged
            // because the verbs differ in length.
            "md:flex-1 md:flex-col md:items-start md:justify-start md:gap-1",
            band ? "border-band-rule" : "border-rule",
          )}
        >
          <span className="flex items-baseline gap-3">
            <span
              className={cn(
                "font-mono text-meta",
                band ? "text-band-muted" : "text-ink-3",
              )}
            >
              0{index + 1}
            </span>
            <span className="text-h3">{verb.en}</span>
          </span>
          <Ar
            decorative
            className={cn(
              "ar-display text-h3",
              band ? "text-accent-on-band" : "text-accent-text",
            )}
          >
            {verb.ar.text}
          </Ar>
        </li>
      ))}
    </ol>
  );
}
