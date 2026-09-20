import { cn } from "@/lib/cn";
import { Container, type ContainerWidth } from "./Container";

export type SectionTone = "paper" | "band";

/**
 * A full-bleed band of page. `tone="band"` is the dark treatment reserved for
 * process, engineering chapters and the final CTA — at most two per page.
 */
export function Section({
  tone = "paper",
  width = "content",
  id,
  className,
  children,
}: {
  tone?: SectionTone;
  width?: ContainerWidth;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      // The section itself does not enter — its contents do. Fading a whole
      // band in and then cascading its children inside it means watching an
      // empty box arrive first; revealing the parts directly reads better and
      // gives each one its own trigger point.
      className={cn(tone === "band" && "band", "py-section", className)}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
