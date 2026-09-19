import { cn } from "@/lib/cn";

type ArProps = {
  children: React.ReactNode;
  /**
   * True when the Arabic is a pure visual twin of English text that is already
   * on screen. Decorative twins are hidden from screen readers so the page is
   * not read twice. Arabic that carries its own meaning (a name, a domain
   * term) must stay readable — leave this false.
   */
  decorative?: boolean;
  className?: string;
};

/**
 * An Arabic island inside an English page.
 *
 * lang + dir make the screen reader switch voice and isolate the bidi run, so
 * punctuation around it does not flip. Styling lives in the `.ar` class.
 */
export function Ar({ children, decorative = false, className }: ArProps) {
  return (
    <span
      lang="ar"
      dir="rtl"
      aria-hidden={decorative || undefined}
      className={cn("ar", className)}
    >
      {children}
    </span>
  );
}
