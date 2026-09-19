import type { Label } from "@content/types";
import { cn } from "@/lib/cn";
import { Ar } from "./Ar";

/**
 * An English word with its Arabic twin beside or beneath it.
 *
 * `stacked` is used where there is vertical room (mobile menu, verb chain);
 * `inline` puts them on one line separated by a middle dot.
 */
export function Twin({
  label,
  layout = "inline",
  arClassName,
  className,
}: {
  label: Label;
  layout?: "inline" | "stacked";
  arClassName?: string;
  className?: string;
}) {
  if (!label.ar) {
    return <span className={className}>{label.en}</span>;
  }

  if (layout === "stacked") {
    return (
      <span className={cn("flex flex-col", className)}>
        <span>{label.en}</span>
        <Ar decorative={label.ar.decorative} className={arClassName}>
          {label.ar.text}
        </Ar>
      </span>
    );
  }

  return (
    <span className={className}>
      {label.en} <span aria-hidden="true">·</span>{" "}
      <Ar decorative={label.ar.decorative} className={arClassName}>
        {label.ar.text}
      </Ar>
    </span>
  );
}
