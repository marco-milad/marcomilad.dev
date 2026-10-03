import { ar } from "../../types";
import type { ProjectInput } from "../../schema";
import homeAr from "./images/home-ar.jpg";
import homeEn from "./images/home-en.jpg";
import mHome from "./images/m-home.jpg";
import printing from "./images/printing.jpg";
import project from "./images/project.jpg";
import services from "./images/services.jpg";
import work from "./images/work.jpg";

/**
 * Sources: the BrandKey.Sa repository (63 commits, 2026-09-01 → 2026-10-03),
 * its README, ASSET-AUDIT.md and the provenance header in data/projects.ts,
 * a production build run on 2026-10-04, and the live site itself.
 *
 * Honesty constraints applied here, all deliberate:
 * - Every count comes from the build or the live page, not from the repo's
 *   own docs. The README still says 27 projects and 47 files; the site now
 *   carries 84 jobs and 199 image files. The docs are a month behind.
 * - No client outcomes are claimed. There is no analytics, no enquiry count
 *   and no revenue figure, so none appears.
 * - The project photography belongs to the client and shows their delivered
 *   work. The figures here are screenshots of the site, which is public.
 * - brandkey.sa is not owned. The production URL is the vercel.app one, and
 *   that is what is published.
 */
export const brandkey: ProjectInput = {
  slug: "brandkey",
  title: "Brand Key Advertising",
  positioning: "Signage, facades, printing and fabrication — Jeddah",
  summary:
    "A bilingual, Arabic-first site for a Saudi signage company, built entirely from the company's own un-captioned photo archive — where the hard part was deciding what could honestly be said about each photograph.",
  category: { en: "Arabic-first marketing site", ar: ar("موقع عربي أولاً") },
  year: "2026",
  // From the repository's own history: first commit 2026-09-01, production
  // release and SEO finalisation 2026-10-03.
  duration: "September – October 2026",
  status: "production",
  role: "Sole engineer and designer",
  platforms: ["web"],
  languages: ["ar", "en"],
  stack: ["nextjs", "react", "typescript", "tailwind", "vercel"],
  brand: "#d4af37",
  timeline: { start: "2026-09", end: "2026-10" },
  confidentiality: "public",
  depth: "case-study",
  featured: true,
  order: 6,
  updatedAt: "2026-10-04",

  cover: {
    src: homeAr,
    alt: "Brand Key home page in Arabic, right-to-left, over a night photograph of an illuminated glass bank facade in Jeddah",
    treatment: "browser",
    url: "brandkey-sa.vercel.app/ar",
    dir: "rtl",
    locale: "ar",
  },

  seo: {
    title: "Brand Key Advertising — an Arabic-first site built from a photo archive",
    description:
      "A bilingual site for a Jeddah signage company, built from 72 un-captioned Instagram posts: 199 static pages, 103 kB of JS, and nothing invented.",
  },

  sections: [
    {
      type: "overview",
      title: "A portfolio with no captions to build it from",
      body: [
        "Brand Key Advertising makes signs: illuminated letters, shop facades, exhibition stands, cut acrylic, welded steel housings. They work in Jeddah, they sell in Arabic, and their customers find them on WhatsApp.",
        "What they had was an Instagram account. What they did not have was a logo file, a company email, a postal address, or a single caption on any of it — the Instagram API returned an empty description on all 72 posts. The entire evidence base for the site was 86 photographs and 11 clips with nothing written about any of them.",
        "So the engineering problem was not the site. It was deciding, photograph by photograph, what could honestly be said about work nobody had written down.",
      ],
    },

    {
      type: "role",
      title: "My role",
      body: [
        "Direct engagement with the business owner. No agency, no design handoff, no second engineer — the product decisions and the code are the same person's.",
      ],
      ownership: {
        owned: [
          "Product and information architecture — what the site claims, and what it refuses to claim",
          "The asset audit: every one of the 86 stills and 11 clips reviewed, not sampled",
          "Interface design and the whole front end",
          "Bilingual Arabic/English architecture, with Arabic as the default locale",
          "The Python tooling that pulls the archive, curates it and derives the logo",
          "The browser-side answering assistant and its Arabic matcher",
          "Build, deployment and SEO",
        ],
        team: "Sole engineer. The client supplied the photography and answered provenance questions.",
      },
    },

    {
      type: "challenge",
      title: "Everything that was missing was a decision waiting to be made",
      body: [
        "An archive with no captions means client names, locations, dates, scopes, materials and dimensions are genuinely unknown. The easy path is to write plausible ones. A sign company's portfolio reads perfectly well with invented project titles and confident dates, and nobody would check.",
        "There was more missing than captions. No original logo artwork existed beyond a 150-pixel Instagram avatar. There was no company email. There was no building number and no commercial registration number. Resolution across the archive was uneven: 63 stills were 1440 pixels on the long edge and the rest fell away to 320.",
        "The brief also listed services the photographs could not support, and the archive contained images that were not this company's work at all.",
      ],
    },

    {
      type: "requirements",
      title: "What the brief asked for, against what the assets could carry",
      body: [
        "Each of these was settled with the client rather than guessed at, and the resolution is recorded in the repository so the next person does not re-open it.",
      ],
      items: [
        {
          requirement: "Publish the full service list from the company's promo card",
          decision:
            "Published every line the photographs support. Vehicle wraps and stickers were on the list and have no usable first-party photograph in the archive, so no such category exists on the site.",
        },
        {
          requirement: "Use the company logo",
          decision:
            "No artwork exists beyond a 150px avatar. The mark was traced to vector from it; the header shows the wordmark at roughly 2× and the monogram alone below 640px, which is what that source supports.",
        },
        {
          requirement: "Show an address and contact details",
          decision:
            "The street and opening hours are published. The district alone is not an address, so no postal address is shown, and no registration number is claimed. WhatsApp and Instagram are the published channels because they are the real ones.",
        },
        {
          requirement: "Name clients and date the projects",
          decision:
            "Neither is known. Titles describe what the photograph shows, alt text describes the frame, and there are no dates and no client names anywhere in the portfolio data.",
        },
      ],
    },

    {
      type: "approach",
      title: "Content as data, so the site cannot drift from its own evidence",
      body: [
        "Nothing in the interface hardcodes an image path or a string. Projects, services, products, the FAQ and the site's own contact details are typed data; components are presentational. Adding a job is one entry.",
        "That is not tidiness for its own sake. It is what made the provenance rules enforceable: the file that holds the portfolio opens with the rule that nothing may be invented, every entry sits under it, and the one place to check a claim is the one place to change it.",
      ],
    },

    {
      type: "glossary",
      title: "The trade's own vocabulary",
      body: [
        "Signage in Saudi Arabia is sold in Arabic, in terms that do not translate cleanly. These are the category names on the site, and they are the words a customer actually uses on WhatsApp.",
      ],
      terms: [
        {
          ar: "حروف بارزة",
          en: "Channel letters",
          meaning:
            "Three-dimensional letters built as individual housings, usually lit from within — the standard shopfront sign.",
        },
        {
          ar: "واجهات كلادينج",
          en: "Cladding facades",
          meaning:
            "Re-facing a whole building front in composite panel, the largest job the workshop takes on.",
        },
        {
          ar: "أكريليك",
          en: "Acrylic",
          meaning:
            "Cut and formed sheet, used for awards, plaques and clinic signage where the question is whether a shape can be cut at all.",
        },
        {
          ar: "فلكس",
          en: "Flex banner",
          meaning:
            "Wide-format printed vinyl, the cheapest and fastest surface the shop prints on.",
        },
        {
          ar: "لوحات مشاريع",
          en: "Project boards",
          meaning:
            "The site hoarding a contractor puts up for the duration of a build.",
        },
      ],
    },

    {
      type: "architecture",
      title: "How it is put together",
      body: [
        "Next.js App Router with a locale segment that owns the document's language and direction, so Arabic is not a translation layer bolted onto an English page — it is the default, and the English build is the alternate.",
      ],
      layers: [
        {
          name: "Content",
          items: [
            "projects.ts — the portfolio, 84 jobs across 7 categories",
            "services.ts, servicePages.ts, products.ts",
            "faq.ts — the assistant's answers",
            "site.ts — name, city, WhatsApp, what is unavailable",
          ],
          note: "Typed, provenance-documented, the only source of claims.",
        },
        {
          name: "Routing",
          items: [
            "app/[locale] — ar | en, layout owns <html lang dir>",
            "work, work/[id], services, services/[id], printing, profile",
            "sitemap.ts and robots.ts generated from the data",
          ],
          note: "Every route statically prerendered; 199 pages at the last build.",
        },
        {
          name: "Interface",
          items: [
            "Presentational components only — no content, no image paths",
            "Reveal, TransitionLink, Counter — about 3 kB of motion in total",
            "AskChat — the browser-side answering assistant",
          ],
        },
        {
          name: "Tooling",
          items: [
            "scan.py — archive to posts.json",
            "curate.py — archive to the shipped subset",
            "make_logo.py — avatar to vector mark",
          ],
          note: "The archive stays out of the repository; only the curated subset ships.",
        },
      ],
    },

    {
      type: "decisions",
      title: "The decisions that shaped it",
      stories: [
        {
          title: "An archive that could not be trusted at face value",
          tags: ["data-integrity", "product"],
          problem: [
            "The company's Instagram account was the only record of its work, and it was going to be the entire portfolio. Treating it as a folder of the company's photographs would have been the obvious move.",
          ],
          rootCause: [
            "An Instagram account is not an archive of a company's own work. It is a feed, and feeds collect reposts. Reviewing all 86 stills and 11 clips rather than sampling them turned up images that belonged to other people: one carrying a dhgate.com marketplace watermark, one carrying a classifieds-site watermark, and a clip carrying a TikTok watermark for an entirely different account, complete with a burnt-in 'like, comment, share' overlay.",
            "A separate question was harder. The two most recent posts were a promo card for a differently-named business. That could have been a competitor's work sitting in the feed — or the same owner under another name.",
          ],
          constraints: [
            "No captions to cross-check against",
            "The brief itself had been written from the promo card in question",
          ],
          decision: [
            "Review every asset rather than sample, exclude anything whose provenance cannot be established, and take the identity question to the client rather than resolve it by assumption.",
          ],
          implementation: [
            "Every excluded asset is listed in ASSET-AUDIT.md with the reason — watermark, resolution, or 'not project work'. Two further stills were genuine but fell apart above thumbnail size and were dropped on quality alone.",
            "The client confirmed on 2026-09-01 that the other name is the same owner behind the same business, and supplied the WhatsApp number printed on the card. That made the number first-party and publishable. The district printed beside it was not published, because a district is not an address. The second, owner-side calligraphic mark was not placed anywhere either — whether the two identities should appear together is a branding decision, and it was not mine to make quietly.",
          ],
          result: [
            "Nothing on the site is another company's work. The exclusions are written down with their reasons, so the judgement can be checked rather than taken on trust.",
          ],
        },

        {
          title: "A photo dump is not a portfolio",
          tags: ["product", "ux"],
          problem: [
            "The first version put one card on the work page per photograph. It looked like a portfolio and behaved like a camera roll: the same job appeared three and four times, because a job that was photographed from four angles became four projects.",
          ],
          rootCause: [
            "The unit was wrong. A visitor scanning signage work is not asking 'how many photographs do you have' — they are asking 'have you done my kind of job'. Four cards of one shopfront answer that worse than one card does, because they crowd out the next job.",
          ],
          decision: [
            "Make the card a job, not a photograph. Every other frame of that job lives inside it.",
            "Then group the jobs by the decision behind them rather than by the customer's trade, because a cafe, a grill house and a hotel that all chose the same facade treatment are one answer to one question.",
          ],
          implementation: [
            "Worked through the categories in passes, each one collapsing a set: six cards looking at the same subject, four stands that were one idea shown four times, three neon cards that were one job and three examples of it, three printed canvases that were one story told as three.",
            "A card carrying extra frames shows the count, and reveals one of them on hover, so the depth is visible without being in the way.",
          ],
          result: [
            "84 jobs across 7 categories, each card a distinct piece of work, with the additional frames reachable from the job they belong to.",
          ],
          figure: {
            src: work,
            alt: "The work page in Arabic, showing category filters and a grid of project cards with badges reading plus two, plus four and plus nine extra frames",
            treatment: "browser",
            url: "brandkey-sa.vercel.app/ar/work",
            dir: "rtl",
            locale: "ar",
            caption:
              "One card per job. The badge is the number of further frames inside it.",
          },
        },

        {
          title: "An assistant that answers Arabic, with no model behind it",
          tags: ["ai-reliability", "rtl"],
          problem: [
            "Customers arrive asking one question — can you make this, do you print that, how much. The honest answer usually lives on the site already, but asking a sign company's website a question in Arabic and getting a useful answer is not something visitors expect to work.",
          ],
          constraints: [
            "A small business should not inherit a per-question API bill",
            "A confident wrong answer about what a workshop can fabricate is worse than no answer",
          ],
          options: [
            {
              option: "A hosted language model behind an API route",
              whyNot:
                "A running cost with no ceiling, on a site whose owner has no appetite for one — and a model will answer confidently whether or not it knows.",
            },
          ],
          decision: [
            "Answer from the site's own content, in the browser, with a keyword matcher. No model, no network, no running cost. When the match is weak, say so and hand the question to WhatsApp with it already typed.",
          ],
          implementation: [
            "Most of the matcher is about forgiving Arabic rather than matching it. Spelling is normalised — أ إ آ collapse to ا, ة to ه, ى to ي, diacritics and tatweel are dropped, Arabic-Indic digits read as digits. Every word is also tried with its prefixes and suffixes stripped, so a visitor typing والبنرات still reaches بنر. A word of five letters or more that matches nothing exactly is allowed to be one letter off. A word that appears in many entries counts for less than one that appears in a single entry.",
            "Below a confidence threshold the reply is 'I do not know — ask the team', with the question already in the WhatsApp message.",
          ],
          result: [
            "Visitors get an answer in their own language, the owner gets no bill, and the failure mode is a handoff to a human rather than a plausible invention.",
          ],
        },

        {
          title: "A hundred and seventy pages nobody could reach",
          tags: ["ux", "deployment"],
          problem: [
            "The work page carried every project's detail markup inside a container that was hidden, so the gallery could animate between them. The pages existed, were prerendered, and were in the document — inside a hidden div.",
          ],
          rootCause: [
            "Hiding a region hides it from everyone, not just from sight. Content in a hidden container is out of the accessibility tree and discounted by crawlers, so the entire portfolio — the one thing the site exists to show — was structurally invisible while looking perfectly fine on screen.",
          ],
          decision: [
            "Put the content back in the document's main landmark, and find another way to get the transition.",
          ],
          implementation: [
            "Each project became its own prerendered route under the main landmark, and the morph between the grid and the project is driven by the browser's own view-transition API against the clicked image rather than by hiding and revealing markup.",
          ],
          result: [
            "199 prerendered pages, all of them in the document where a reader, a screen reader and a crawler can reach them, and the transition survived the move.",
          ],
        },

        {
          title: "Four seconds of nothing, every time you tapped a link",
          tags: ["performance"],
          problem: [
            "Tapping a link froze the page. Not briefly — long enough that the tap felt ignored and people tapped again.",
          ],
          rootCause: [
            "The work page was doing too much on the main thread at exactly the moment it was asked to navigate, and six photographs were competing to be the largest paint instead of one being given priority.",
          ],
          decision: [
            "Give the intended largest paint a head start, stop the rest racing it, and take the main-thread work out of the navigation path.",
          ],
          implementation: [
            "The hero image is prioritised and the others are not, so the browser is not choosing between six candidates. The work page was also made to come off the CDN like every other route rather than being treated as dynamic.",
          ],
          result: [
            "Taps respond. Every route is static and served from the edge, and first-load JavaScript shared across the whole site is 103 kB.",
          ],
        },
      ],
    },

    {
      type: "quality",
      title: "What was measured",
      body: [
        "Both figures come from a production build of the repository run on 2026-10-04. They are build output, not field data: there is no analytics on this site, so no real-user numbers exist and none are quoted.",
      ],
      metrics: [
        {
          label: "Pages prerendered",
          after: "199",
          method:
            "next build route summary, production build of the repository on 2026-10-04",
          verification: "measured-local",
        },
        {
          label: "First-load JavaScript, shared by all routes",
          after: "103 kB",
          method:
            "next build route summary, same build. No UI library and no animation library",
          verification: "measured-local",
        },
      ],
      security: [
        "Next.js 15.5.4 → 15.5.25 and sharp → 0.35.4 on the first day of work, before any feature was built",
        "No database, no authentication, no user input stored — the contact path is WhatsApp, and the assistant runs entirely in the browser",
        "The SEO origin was corrected to a domain actually under our control rather than one assumed to be coming",
      ],
    },

    {
      type: "mirror",
      title: "Arabic first, English second",
      body: [
        "Arabic is the default locale and the x-default target. English is the alternate. The same page, in both directions — not a translated layer over an English layout.",
      ],
      ltr: {
        src: homeEn,
        alt: "The same Brand Key home page in English, left-to-right, with the headline and calls to action mirrored to the other side",
        treatment: "browser",
        url: "brandkey-sa.vercel.app/en",
        dir: "ltr",
        locale: "en",
      },
      rtl: {
        src: homeAr,
        alt: "The Brand Key home page in Arabic, right-to-left, over the illuminated facade photograph",
        treatment: "browser",
        url: "brandkey-sa.vercel.app/ar",
        dir: "rtl",
        locale: "ar",
      },
      notes: [
        "The locale segment owns <html lang> and <html dir>, so direction is a document property rather than a CSS afterthought.",
        "hreflang declares ar, en and x-default, and x-default points at Arabic — the language the customers actually use.",
        "The WhatsApp calls to action carry a different pre-written Arabic message per service, so the first thing the owner receives already says what the enquiry is about.",
      ],
    },

    {
      type: "gallery",
      title: "The rest of the site",
      figures: [
        {
          src: project,
          alt: "A project detail page in Arabic showing one signage job with its photographs and a description of the work",
          treatment: "browser",
          url: "brandkey-sa.vercel.app/ar/work/letters-on-glass",
          dir: "rtl",
          locale: "ar",
        },
        {
          src: services,
          alt: "The services page in Arabic listing the workshop's service groups with photographs",
          treatment: "browser",
          dir: "rtl",
          locale: "ar",
        },
        {
          src: printing,
          alt: "The printing catalogue page in Arabic, a grid of printed product cards each with an order button",
          treatment: "browser",
          dir: "rtl",
          locale: "ar",
        },
        {
          src: mHome,
          alt: "The Brand Key home page on a phone in Arabic, with the facade photograph and the quote request button",
          treatment: "phone",
          dir: "rtl",
          locale: "ar",
        },
      ],
    },

    {
      type: "outcome",
      title: "Where it landed",
      body: [
        "The site is live and in production, in Arabic and English, carrying 84 jobs across 7 categories on 199 statically prerendered pages.",
        "What it does not have is as deliberate as what it does. No invented client names. No dates nobody could verify. No service category the photographs could not support. No stock photography, and nothing in the portfolio that belongs to somebody else.",
        "What is still outstanding is written down rather than quietly left: the full workshop address, a company email, original logo artwork. If any of them arrives, the file that lists them says exactly what to change.",
      ],
    },

    {
      type: "lessons",
      title: "What I would carry forward",
      body: [
        "The hardest engineering on this project was editorial. Deciding that four photographs were one job, that a category the client asked for could not be published, and that a district is not an address — those took longer than anything in the code, and they are what makes the site worth trusting.",
        "Writing the exclusions down was worth more than making them. A decision nobody can check is indistinguishable from a guess six months later.",
      ],
    },
  ],
};
