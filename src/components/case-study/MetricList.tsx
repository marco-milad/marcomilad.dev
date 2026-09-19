import type { Metric } from "@content/schema";
import { cn } from "@/lib/cn";

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
    <dl className={cn("grid gap-px overflow-hidden border", rule, band ? "bg-band-rule" : "bg-rule")}>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={cn(
            "flex flex-col gap-4 p-6 md:flex-row md:items-baseline md:justify-between md:gap-8",
            band ? "bg-band" : "bg-paper-raised",
          )}
        >
          <div className="md:w-2/5">
            <dt className="text-h3">{metric.label}</dt>
            <p className={cn("mt-2 text-small", muted)}>{metric.method}.</p>
            <p
              className={cn(
                "mt-2 font-mono text-meta uppercase",
                band ? "text-band-muted" : "text-ink-3",
              )}
            >
              {VERIFICATION_LABEL[metric.verification]}
            </p>
          </div>

          <dd className="flex items-baseline gap-4 md:justify-end">
            {metric.before ? (
              <>
                <span
                  className={cn(
                    "text-h3 line-through decoration-1",
                    muted,
                  )}
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
          </dd>
        </div>
      ))}
    </dl>
  );
}
