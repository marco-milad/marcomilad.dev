import Link from "next/link";
import { footerNav, site } from "@content/site";
import { lexicon } from "@content/lexicon";
import { reveal } from "@/lib/reveal";
import { Ar } from "@/components/ui/Ar";
import { Container } from "@/components/ui/Container";

/**
 * Sits on the ink band, continuous with the final CTA.
 * The colophon is a quiet engineering signal: it says how the site is built.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    // data-reveal-flush: when the footer comes into view the page has run out
    // of room below, so the observer releases anything still waiting. It is the
    // backstop for content that a viewport-edge trigger could never reach.
    <footer className="band" data-reveal-flush="">
      <Container>
        <div className="py-block">
          <div className="flex flex-col gap-block border-t border-band-rule pt-block md:flex-row md:justify-between">
            <div {...reveal(0)}>
              <Wordmarkish />
              <p className="mt-4 max-w-prose text-small text-band-muted">
                {site.role} in {site.location.en}. Available for product
                engineering roles and selected client work.
              </p>
            </div>

            <div
              className="flex flex-col gap-8 sm:flex-row sm:gap-16"
              {...reveal(1)}
            >
              <nav aria-label="Footer">
                <ul className="flex flex-col gap-3 text-small">
                  {footerNav.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-band-muted transition-[color,transform] duration-200 ease-editorial hover:translate-x-1 hover:text-band-fg"
                        >
                          {item.label.en}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="inline-block text-band-muted transition-[color,transform] duration-200 ease-editorial hover:translate-x-1 hover:text-band-fg"
                        >
                          {item.label.en}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <ul className="flex flex-col gap-3 text-small">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-block font-mono text-meta break-all text-band-muted transition-[color,transform] duration-200 ease-editorial hover:translate-x-1 hover:text-band-fg"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-band-muted transition-[color,transform] duration-200 ease-editorial hover:translate-x-1 hover:text-band-fg"
                  >
                    LinkedIn
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-band-muted transition-[color,transform] duration-200 ease-editorial hover:translate-x-1 hover:text-band-fg"
                  >
                    GitHub
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-block flex flex-col gap-4 border-t border-band-rule pt-8 font-mono text-meta text-band-muted sm:flex-row sm:items-center sm:justify-between"
            {...reveal(2)}
          >
            <p>
              {lexicon.madeInCairo.en}{" "}
              <span aria-hidden="true">·</span>{" "}
              <Ar decorative>{lexicon.madeInCairo.ar?.text}</Ar>
            </p>
            <p>
              Next.js · statically rendered · set in Geist and IBM Plex Sans
              Arabic
            </p>
            <p>
              © {year} {site.name}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/** Footer wordmark: same pair, sized for the band. */
function Wordmarkish() {
  return (
    <p className="text-h3">
      {site.displayName}
      <span aria-hidden="true" className="mx-2 text-band-muted">
        ·
      </span>
      <Ar decorative={site.nameAr.decorative} className="ar-display">
        {site.nameAr.text}
      </Ar>
    </p>
  );
}
