import { ar } from "../../types";
import type { ProjectInput } from "../../schema";
import casual from "./images/casual.jpg";
import events from "./images/events.jpg";
import film from "./images/film.jpg";
import home from "./images/home.jpg";
import mHome from "./images/m-home.jpg";
import portraits from "./images/portraits.jpg";

/**
 * Sources: the elegant-portfolio-studio repository (read, never copied), its
 * root documentation, and the verified screenshots in the OJOS asset pack.
 *
 * Honesty constraints applied here, all deliberate:
 * - English only. The site declares an Arabic hreflang but no Arabic build
 *   exists, so RTL is never claimed — it is listed as declared-not-shipped.
 * - SEO is static meta + JSON-LD on a client-rendered SPA. Never called SSR.
 * - No founding year: the code states 2012 in one place and 2018 in another.
 * - Placeholder videos, recycled reels, repeated testimonials and unverified
 *   award counts exist in the product. None are shown or described as work,
 *   and no screenshot here features them.
 * - The srcset helper in the codebase is dead code, so responsive srcset is
 *   not claimed. content-visibility ships without an intrinsic-size hint, so
 *   it is listed as an open risk rather than a CLS fix.
 */
export const ojosStudio: ProjectInput = {
  slug: "ojos-studio",
  title: "OJOS Studio",
  positioning: "Photography and media-production studio, Cairo",
  summary:
    "A media-heavy studio site where the imagery is the product: a Cloudinary-driven image pipeline, one route serving four different media experiences, and booking that works without a backend.",
  category: { en: "Media-heavy brand site", ar: ar("موقع بصري") },
  year: "2026",
  // From the repository's own history: 41 commits in Dec 2025, 58 in Jan 2026.
  // The lone 2025-01 commit is the scaffold's stamp, not work.
  duration: "December 2025 – January 2026",
  status: "delivered",
  role: "Product engineer, end to end",
  platforms: ["web"],
  languages: ["en"],
  stack: [
    "react",
    "vite",
    "typescript",
    "tailwind",
    "radix",
    "framerMotion",
    "reactRouter",
    "emailjs",
    "cloudinary",
    "vercel",
  ],
  brand: "#2f4b37",
  timeline: { start: "2025-12", end: "2026-01" },
  confidentiality: "limited",
  depth: "case-study",
  featured: true,
  order: 5,
  updatedAt: "2026-09-20",

  cover: {
    src: home,
    alt: "OJOS Studio home page with the headline 'It's more than a photo. It's art.' beside a bridal portrait",
    treatment: "browser",
    url: "ojosstudio.com",
    dir: "ltr",
    locale: "en",
  },

  seo: {
    title: "OJOS Studio — a media-heavy studio site built for speed",
    description:
      "Hundreds of photos and videos on a static site: CDN transforms, blur-up loading, four media modes on one route, and booking with no backend.",
  },

  sections: [
    {
      type: "overview",
      body: [
        "OJOS Studio is a photography and media-production studio in Cairo. Its site has one job — turn someone browsing into someone booking — and one complication: the thing it has to show off is also the heaviest thing on the page.",
        "The studio's differentiator is a dual identity. Mina Makaram leads the photography; Alber Makram, a film director trained at the French University in Egypt and a first-place winner at the Youssef Chahine Short Film Festival, leads the film side. A site that only showed photographs would have undersold half the business, and one that only showed films would have undersold the other.",
        "There is no backend, no CMS and no database. Every page is static, the content is modelled in code as typed constants, and all media is served from a CDN.",
      ],
    },
    {
      type: "role",
      title: "My role",
      ownership: {
        owned: [
          "Front-end architecture, from a Lovable scaffold to the delivered build",
          "The Cloudinary image and video pipeline",
          "The portfolio route and its four media experiences",
          "The reel carousel and its playback behaviour",
          "Booking: email fan-out plus WhatsApp deep links, with no backend",
          "Build configuration, caching and the two deployment targets",
        ],
        team: "Client work for OJOS Studio.",
      },
      body: [
        "The project started from a generated scaffold. Everything described below is what replaced it.",
      ],
    },
    {
      type: "challenge",
      title: "The product is the payload",
      body: [
        "On most sites, images are decoration you can compress until the complaints start. Here they are the argument. A studio that shows a soft, slow, badly cropped photograph has just told you what it thinks 'good' looks like.",
        "So the brief pulls in two directions at once: hundreds of high-resolution photographs and a wall of video, delivered to people in Cairo on phones, fast enough that nobody waits to be impressed — and all of it without a server to render or resize anything.",
      ],
    },
    {
      type: "requirements",
      title: "What the studio needed, and what each need decided",
      items: [
        {
          requirement:
            "Show hundreds of photographs at full quality without a slow site.",
          decision:
            "Media moves to a transforming CDN, and every image is requested at the size and format the visitor's device actually needs.",
        },
        {
          requirement:
            "Photography and film are different businesses under one brand.",
          decision:
            "One portfolio route that changes shape by category — a photo gallery, a reel wall, or a film view — rather than separate sites or a lowest-common-denominator grid.",
        },
        {
          requirement: "Short vertical clips have to feel like a feed.",
          decision:
            "A horizontal scroll-snap carousel with muted inline playback on hover, and video kept off the network until the row is in view.",
        },
        {
          requirement: "Clients book over WhatsApp, not through forms.",
          decision:
            "A booking form that sends email and opens a pre-filled WhatsApp message, so the visitor picks the channel they already use.",
        },
        {
          requirement: "No backend to run, and no one to maintain one.",
          decision:
            "A fully static build, deployable to two different hosts, with all dynamic behaviour happening in the browser.",
        },
      ],
    },
    {
      type: "approach",
      title: "Content modelled in code",
      body: [
        "With no CMS, the content had to live somewhere it could still be trusted. It is modelled as typed constants: each portfolio category declares its own media, copy and display mode, and the compiler checks the shape.",
        "That is the right trade for a site the studio does not edit daily. It costs a deploy to change a caption, and it buys no database, no admin to secure, no CMS bill, and no runtime that can fail while a client is looking at the work.",
      ],
    },
    {
      type: "solution",
      title: "One brand, two crafts",
      body: [
        "The home page has to carry both halves of the studio at once — the photography and the film work — and get to a booking prompt without making anyone scroll for it.",
      ],
      figure: {
        src: home,
        alt: "OJOS Studio home page: large studio wordmark, a bridal portrait, and calls to action to view the portfolio or book",
        treatment: "browser",
        url: "ojosstudio.com",
        dir: "ltr",
        locale: "en",
      },
    },
    {
      type: "features",
      title: "Four ways to show work",
      items: [
        {
          title: "Photo galleries",
          body: "Six of the nine categories render as a thumbnail grid that opens into a lightbox, where the full-resolution image is requested only once someone actually opens it.",
          figure: {
            src: portraits,
            alt: "Portraits category page with a header and a row of portrait thumbnails",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
        },
        {
          title: "Cinematic film",
          body: "The film category swaps the grid for a video-led layout, because a director's work does not read as a contact sheet.",
          figure: {
            src: film,
            alt: "Cinematic Film category page with a headline and a video player card",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
        },
        {
          title: "Vertical reels",
          body: "Short clips render as a horizontal scroll-snap row of vertical cards that play muted on hover and reset when the pointer leaves.",
        },
        {
          title: "Booking",
          body: "A packages page with real hourly tiers, and a booking form that reaches the studio by email and by WhatsApp at once.",
        },
      ],
    },
    {
      type: "architecture",
      title: "How it fits together",
      layers: [
        {
          name: "Content",
          items: [
            "Typed constants per category",
            "Media URLs, copy and display mode together",
            "No CMS, no database",
          ],
        },
        {
          name: "Application",
          items: [
            "Vite + React SPA",
            "One dynamic portfolio route",
            "Component library over accessible primitives",
          ],
        },
        {
          name: "Media",
          items: [
            "Cloudinary URL transforms",
            "Format and density negotiated per request",
            "Blur placeholders generated from the same source",
          ],
          note: "The whole image pipeline is URL construction — there is no SDK and nothing to run.",
        },
        {
          name: "Delivery",
          items: [
            "Static build, hash-named assets",
            "Two deploy targets",
            "Long-lived caching for assets, none for the shell",
          ],
        },
      ],
    },
    {
      type: "decisions",
      title: "Engineering decisions",
      stories: [
        {
          title: "Making a gallery feel instant when the gallery is the point",
          tags: ["performance", "ux"],
          problem: [
            "A studio site lives or dies on its imagery, and the imagery is exactly what makes it slow. Shipping full-resolution photographs into a grid would have meant megabytes per screen on a phone.",
          ],
          decision: [
            "Stop treating images as files in the repository and treat them as URLs that can be negotiated per request — then show something in the right shape immediately, rather than nothing until the photograph arrives.",
          ],
          implementation: [
            "Every image URL is built at render time with transforms that pick the format the browser supports, adapt to the screen's pixel density, and cap the delivered width — so the same source photograph is a small file on a phone and a large one on a retina desktop, with no manual exports.",
            "Each category generates its media three ways from one source: a large version for the lightbox, a light thumbnail for the grid, and a tiny blurred placeholder. The placeholder paints first and is swapped for the real image once it has decoded, so the layout is occupied from the first frame. The hero image is preloaded in the document head so the largest paint is not waiting on the JavaScript bundle.",
          ],
          result: [
            "The grid loads light, the full-resolution file is only ever fetched when someone opens a photograph, and the page fills in progressively instead of flashing from empty to heavy.",
          ],
          figure: {
            src: events,
            alt: "Events category page showing a header image and a grid of event photographs",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
        },
        {
          title: "One route, four media experiences",
          tags: ["ux", "product"],
          problem: [
            "Nine portfolio categories, but they are not the same kind of thing. Photographs want a grid and a lightbox. Vertical clips want a feed. A film wants a player. Building nine pages would have meant nine copies of the same layout, animation and metadata work — and nine places for them to drift apart.",
          ],
          decision: [
            "Keep one route and let the category decide the shape of the page, so every category keeps its own shareable URL while sharing one implementation.",
          ],
          implementation: [
            "The route reads the category from the URL and resolves it to one of four display modes — photo gallery, reel wall, media-production view, or cinematic film — with the photo gallery as the default for everything that is not one of the three special cases. An unknown category renders a friendly message instead of crashing.",
            "Two categories still use their original slugs from an earlier template rather than their display names, because changing them would have broken links already shared with clients.",
          ],
          result: [
            "Nine categories, twelve public pages, one implementation of the layout, the animation and the metadata.",
          ],
          figure: {
            src: casual,
            alt: "Casual category page with a black-and-white header image and a grid of photographs",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
        },
        {
          title: "Autoplaying reels without making the phone stutter",
          tags: ["performance", "ux"],
          problem: [
            "A wall of vertical clips is the most convincing way to show motion work and the most reliable way to ruin a page. Video elements that all begin buffering at once will saturate a mobile connection and stall scrolling.",
          ],
          decision: [
            "Nothing plays unless the visitor is looking at it, and nothing downloads more than it needs to draw its first frame.",
          ],
          implementation: [
            "Clips sit in a horizontal scroll-snap row so swiping lands cleanly on one card at a time. Each video is muted, loops, plays inline rather than going fullscreen on iOS, and is set to fetch only its metadata — enough for a poster frame, not the whole file. Playback starts on hover and resets to the beginning when the pointer leaves, so a half-watched clip does not stay half-watched. An intersection observer holds the carousel's second row back until the carousel itself comes into view.",
          ],
          result: [
            "The reel wall behaves like a feed rather than a download queue, and a visitor who never scrolls to it never pays for it.",
          ],
        },
        {
          title: "Taking bookings with no backend",
          tags: ["product", "ux"],
          problem: [
            "The site has no server, but it has to take booking requests — and in Egypt a client who wants a wedding photographer sends a WhatsApp message. A contact form alone would have been the polite way to lose enquiries.",
          ],
          decision: [
            "Send the enquiry through both channels from the browser, and let the client choose which conversation to continue in.",
          ],
          implementation: [
            "Submitting the booking form dispatches the enquiry to the studio's recipients in parallel rather than one after another, so one slow send does not hold up the rest. It then opens pre-filled WhatsApp messages, staggered rather than all at once, because browsers block a burst of simultaneous window opens.",
            "If the email service is not configured, the form detects it and falls back to WhatsApp alone instead of failing in front of the visitor. The email library itself is imported only at the moment of sending, so it is never part of the initial download.",
          ],
          result: [
            "Enquiries arrive by email for the record and by WhatsApp for the conversation, from a site with nothing running behind it.",
          ],
        },
        {
          title: "Two deploy targets, and caching that respects them",
          tags: ["deployment", "performance"],
          problem: [
            "The studio needed the site on its own hosting, and the project needed a fast preview target during development. Those are two different environments, and a client-routed single-page app breaks on both by default: any deep link returns a 404 because no file exists at that path.",
          ],
          decision: [
            "Support both hosts as first-class targets, each with its own rewrite rule and its own caching policy, so neither is an afterthought that breaks on the day it is needed.",
          ],
          implementation: [
            "One target takes the build directly with a catch-all rewrite to the app shell. The other is deployed by a workflow that installs, builds and then synchronises the built output to the studio's host over SSH on push, with an Apache rewrite doing the same job for deep links.",
            "The bundle is split by how often things change rather than by page — framework, interface library, forms and services each in their own chunk — so a copy change does not invalidate the framework in a returning visitor's cache. Assets are hash-named and cached for a year; the HTML shell is never cached, so a deploy is visible immediately.",
          ],
          result: [
            "The same build ships to either host, deep links work on both, and a content update re-downloads only what actually changed.",
          ],
        },
      ],
    },
    {
      type: "quality",
      title: "Discoverability on a client-rendered site",
      body: [
        "This is a single-page app with no server rendering, which is a genuine weakness for search. What it has instead is everything that can be done statically.",
      ],
      security: [
        "Structured data shipped in the HTML itself, describing the studio as a local business with its services and breadcrumbs",
        "Complete Open Graph and Twitter cards, so a shared link previews properly",
        "Per-route titles and descriptions updated as the visitor navigates",
        "Preconnect and DNS-prefetch to the media CDN and the font host, with the hero image preloaded",
        "A sitemap and robots file served as static files",
      ],
      metrics: [
        {
          label: "Portfolio categories from one route",
          after: "9",
          method: "Category slugs resolved by the single dynamic route",
          verification: "observed",
        },
        {
          label: "Public pages",
          after: "12",
          method: "Static routes plus the nine portfolio categories",
          verification: "observed",
        },
        {
          label: "Vendor bundles, split by change rate",
          after: "4",
          method: "Manual chunking in the build config",
          verification: "observed",
        },
      ],
    },
    {
      type: "outcome",
      title: "Outcome",
      body: [
        "A studio whose product is imagery has a site that shows it at full quality and still loads light, with both halves of the business — the photography and the film work — presented on their own terms.",
        "It runs as static files on the studio's own hosting, with no server, no database and no CMS bill, and a booking path that matches how its clients actually get in touch.",
      ],
    },
    {
      type: "lessons",
      title: "What I would do differently",
      body: [
        "The portfolio route is the clearest debt in the project. Serving four display modes from one file was the right call for consistency and the wrong one for size: at roughly 1,185 lines it is the thing I would split first, into a shared layout with one component per media type. The categories would keep their URLs; only the file structure would change.",
        "Rendering is the structural gap. Static metadata and structured data cover a lot, but a crawler that does not run JavaScript still sees an empty root element — a prerender step at build time is the fix, and it is the next thing I would add rather than something I would defend.",
        "Arabic is declared and not delivered. The document advertises an Arabic alternate, but there is no Arabic build behind it: no translation layer, no right-to-left pass. It is a plan sitting in the markup, and either it should ship or the declaration should come out.",
        "Three smaller things I would tidy with the same honesty: a responsive-images helper that was written but never wired up, a content-visibility rule applied to every image without an intrinsic size hint — which can cost layout stability rather than protect it — and the hero's parallax, which is the one scroll effect still running unthrottled and ignoring the reduced-motion preference that the rest of the page respects.",
        "And the service credentials for the booking form are committed in the source. They belong in environment variables with a domain allow-list on the provider, which is a configuration change rather than a rewrite.",
      ],
    },
    {
      type: "gallery",
      title: "On a phone",
      figures: [
        {
          src: mHome,
          alt: "OJOS Studio home page on a phone, with the studio name, a bridal portrait and the booking call to action",
          treatment: "phone",
          dir: "ltr",
          locale: "en",
          caption:
            "Most visitors arrive here from a phone, which is what the image pipeline is sized for.",
        },
      ],
    },
  ],
};
