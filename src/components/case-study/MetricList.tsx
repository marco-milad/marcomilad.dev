import type { Metric } from "@content/schema";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";

const VERIFICATION_LABEL: Record<Metric["verification"], string> = {
  "measured-production": "Measured in production",
  "measured-local": "Measured on a local production build",
  observed: "Observed",
  estimated: "Estimated",
};

/**
 * Metrics with their provenance attached. Every figure shows how it was
 * measured, so a reader can weigh it instead of trusting it — a lab number and
 * a production number should not look the same.
 *
 * Cards on a phone, a table from md up.
 */
export function MetricList({
  metrics,
  tone = "paper",
}: {
  metrics: Metric[];
  tone?: "paper" | "band";
}) {
  const band = tone === "band";
  const muted = band ? "text-band-muted" : "text-ink-3";
  const rule = band ? "border-band-rule" : "border-rule";

  return (
    // Plate first, rows sliding into it — see Capabilities for why the rows
    // rise instead of fading: the gap-px background would show as a slab.
    <dl
      className={cn("grid gap-px overflow-hidden border", rule, band ? "bg-band-rule" : "bg-rule")}
      {...reveal(0)}
    >
      {metrics.map((metric, index) => (
        // A dl group may contain only dt and dd as direct children, so the
        // method and provenance live inside the dd rather than beside the dt.
        <div
          key={metric.label}
          className={cn(
            "grid gap-4 p-6 md:grid-cols-[2fr_3fr] md:items-baseline md:gap-8",
            band ? "bg-band" : "bg-paper-raised",
          )}
          {...reveal(index + 1, { fade: false, shift: 8 })}
        >
          <dt className="text-h3">{metric.label}</dt>

          <dd className="flex flex-col gap-3">
            <span className="flex flex-wrap items-baseline gap-4">
              {metric.before ? (
                <>
                  <span
                    className={cn("text-h3 line-through decoration-1", muted)}
                  >
                    {metric.before}
                  </span>
                  <span aria-hidden="true" className={muted}>
                    →
                  </span>
                </>
              ) : null}
              <span
                className={cn(
                  "text-h2",
                  band ? "text-accent-on-band" : "text-accent-text",
                )}
              >
                {metric.after}
              </span>
            </span>

            <span className={cn("text-small", muted)}>{metric.method}.</span>
            <span className={cn("font-mono text-meta uppercase", muted)}>
              {VERIFICATION_LABEL[metric.verification]}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
