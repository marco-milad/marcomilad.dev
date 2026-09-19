/**
 * Visible only on keyboard focus. First tab stop on every page.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-100 focus:rounded-figure focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
    >
      Skip to content
    </a>
  );
}
