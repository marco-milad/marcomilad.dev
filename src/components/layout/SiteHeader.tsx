import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MainNav } from "./MainNav";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Wordmark className="text-small sm:text-body" />

          <div className="flex items-center gap-6">
            <MainNav />
            {/* Wrapper, not `hidden md:inline-flex` on the Button: the button
                already sets inline-flex, and two display utilities on one
                element are resolved by stylesheet order, not class order —
                which showed the CTA at phone width. */}
            <div className="hidden md:block">
              <Button href={site.cta.href} size="md">
                {site.cta.label.en}
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
