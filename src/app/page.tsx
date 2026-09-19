export default function Home() {
  return (
    <main className="mx-auto w-full max-w-content px-gutter py-section">
      <p className="font-mono text-meta uppercase text-ink-3">Phase 1</p>
      <h1 className="mt-4 text-display">Foundation in place.</h1>
      <p className="mt-6 max-w-prose text-lead text-ink-2">
        The real home page is built in Phase 6. Review the tokens, type scale
        and Arabic pairing on{" "}
        <a
          href="/specimen"
          className="text-accent-text underline underline-offset-4"
        >
          /specimen
        </a>
        .
      </p>
    </main>
  );
}
