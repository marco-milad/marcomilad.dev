import { cn } from "@/lib/cn";

/**
 * Screenshot treatments. Each one has a job:
 *
 * - BrowserFrame  — web products, establishes "this runs in a browser"
 * - PhoneFrame    — mobile surfaces, drawn in CSS (no device mockup images)
 * - Plate         — admin/dense UI, sits on a tinted plate with breathing room
 * - DocumentFrame — printable artefacts (receipts, statements, PDFs)
 *
 * They take children rather than an image so Phase 4 can drop next/image in
 * without touching the frames.
 */

export function BrowserFrame({
  url,
  tone = "paper",
  className,
  children,
}: {
  /** Shown as plain text in the chrome. No fake traffic lights. */
  url?: string;
  tone?: "paper" | "band";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-figure border",
        tone === "band" ? "border-band-rule" : "border-rule",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-9 items-center border-b px-4 font-mono text-meta",
          tone === "band"
            ? "border-band-rule bg-band text-band-muted"
            : // ink-2, not ink-3: the sunk plate is darker than paper, and
              // ink-3 falls under 4.5:1 against it.
              "border-rule bg-paper-sunk text-ink-2",
        )}
      >
        {url ? <span className="truncate">{url}</span> : null}
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({
  tone = "paper",
  className,
  children,
}: {
  tone?: "paper" | "band";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.75rem] border-4 p-1",
        tone === "band" ? "border-band-rule" : "border-rule",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[1.4rem]">{children}</div>
    </div>
  );
}

export function Plate({
  tone = "paper",
  className,
  children,
}: {
  tone?: "paper" | "band";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-figure p-4 sm:p-8",
        tone === "band" ? "bg-band-rule/40" : "bg-paper-sunk",
        className,
      )}
    >
      <div className="overflow-hidden rounded-figure">{children}</div>
    </div>
  );
}

export function DocumentFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl", className)}>
      <div className="overflow-hidden rounded-xs bg-paper-raised shadow-[0_1px_2px_rgba(20,19,17,0.10),0_12px_28px_-12px_rgba(20,19,17,0.35)]">
        {children}
      </div>
    </div>
  );
}
