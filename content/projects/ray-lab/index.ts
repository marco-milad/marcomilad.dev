import { ar } from "../../types";
import type { ProjectInput } from "../../schema";
import brands from "./images/brands.png";
import investors from "./images/investors.png";
import mHome from "./images/m-home.png";
import mPhysicians from "./images/m-physicians.png";
import map from "./images/map.png";
import networkHero from "./images/network-hero.png";
import partners from "./images/partners.png";
import physicians from "./images/physicians.png";
import reach from "./images/reach.png";
import roadmap from "./images/roadmap.png";

/**
 * Sources for every claim below:
 * - the ray-group-nexus repository (routes, data modules, commit history)
 * - the verified screenshots in Portfolio-assets/Ray Lab
 * - live check 2026-09-19: raylab.health responds 200 from Microsoft-IIS,
 *   which is consistent with the static build on the client's own hosting.
 *   raylabgroup.com does not resolve, so it is not used anywhere.
 *
 * Locked with Marco: the hosting story is the static SPA forced by the
 * client's DNS blocking Cloudflare Workers routes. Branch count is 78+, the
 * figure the client publishes. The brand-distribution and per-year charts are
 * deliberately not shown: their totals disagree with 78+.
 * brand-detail.png is excluded — it shows identifiable patients and staff.
 */
export const rayLab: ProjectInput = {
  slug: "ray-lab",
  title: "Ray Lab Group",
  positioning: "Enterprise healthcare corporate platform",
  summary:
    "A corporate platform for a multinational diagnostic healthcare group: eight brands across three countries, an investor section with its own data, and an interactive map of the branch network — shipped without a server.",
  category: { en: "Enterprise healthcare", ar: ar("رعاية صحية") },
  year: "2026",
  duration: "April – May 2026",
  status: "production",
  role: "Front-end engineer and architect",
  platforms: ["web"],
  languages: ["en"],
  stack: ["tanstackStart", "react", "typescript", "vite", "tailwind", "maplibre"],
  links: {
    live: "https://raylab.health",
  },
  confidentiality: "limited",
  depth: "case-study",
  featured: true,
  order: 3,
  updatedAt: "2026-09-19",

  cover: {
    src: networkHero,
    alt: "Ray Lab Group network page headed 'Diagnostic coverage across MENA', with cards showing 78+ branches, 3 countries and 6 brands",
    treatment: "browser",
    url: "raylab.health",
    dir: "ltr",
    locale: "en",
  },

  seo: {
    title: "Ray Lab Group — enterprise healthcare corporate platform",
    description:
      "Eight healthcare brands, three countries and an interactive branch map — a corporate platform shipped as a static site under client DNS constraints.",
  },

  sections: [
    {
      type: "overview",
      body: [
        "Ray Lab Group is a multinational diagnostic healthcare group headquartered in Malta, operating across Egypt, Saudi Arabia and Jordan. It is not one business with one voice: it is eight diagnostic and clinical platforms, each with its own name, colour, market and history, sitting under one group.",
        "The corporate platform had to carry all of that at once — and then send three very different visitors somewhere useful. An investor wants governance, growth and shareholders. A referring physician wants to know how a referral works and what comes back. A supplier or partner wants to know who they would be dealing with.",
        "It was delivered through Triple Vision Agency, and I was the engineer on it.",
      ],
    },
    {
      type: "role",
      title: "My role",
      ownership: {
        owned: [
          "Front-end architecture and the component system",
          "Content modelling: brands, branches and investor data as typed modules",
          "The investors section and its data-driven tabs",
          "The interactive branch map",
          "SEO architecture — metadata, structured data and the build-time sitemap",
          "The deployment path, through every hosting change the client's infrastructure forced",
        ],
        team: "Delivered for Ray Lab Group through Triple Vision Agency.",
      },
      body: [
        "Design direction and brand assets came from the client and the agency. The engineering decisions below were mine.",
      ],
    },
    {
      type: "challenge",
      title: "Three audiences, eight brands, and someone else's infrastructure",
      body: [
        "The content problem was breadth. Eight brands, each with a different country, colour and founding story. Dozens of branches across three markets, which somebody is trying to find while standing in a street. An investor section that had to hold real numbers rather than a brochure paragraph.",
        "The engineering problem arrived later, and it was not technical in origin. The site needed server-side rendering for SEO — but the client's domain sits with an external DNS provider that blocks the routing the hosting platform needs, and the client would not move their nameservers. That constraint, not a preference, decided the architecture.",
      ],
    },
    {
      type: "requirements",
      title: "What the group needed, and what each need decided",
      items: [
        {
          requirement:
            "Three audiences with almost nothing in common must each land somewhere relevant.",
          decision:
            "Audience routing on the home page: investors, physicians and partners each get their own entry point and journey rather than one generic 'about us'.",
        },
        {
          requirement:
            "Eight brands, each with its own identity, under one group.",
          decision:
            "A brand system driven by data: each brand carries its own colour, market and description, and the same components render all of them.",
        },
        {
          requirement:
            "Patients and physicians need to find a specific branch.",
          decision:
            "A real interactive map with per-brand filtering and directions, not a list of addresses.",
        },
        {
          requirement: "Investors expect substance, not marketing.",
          decision:
            "A dedicated section with data-driven tabs covering thesis, performance, shareholders, strategy, expansion, governance, risk and press.",
        },
        {
          requirement:
            "The site must rank, but the client's DNS rules out server-rendered hosting.",
          decision:
            "Move the SEO work to build time — prerendered HTML, generated sitemap and structured data — so no server is needed at runtime.",
        },
      ],
    },
    {
      type: "approach",
      title: "Content as typed data, not a CMS",
      body: [
        "With no server to run, a content management system was off the table anyway — but it was also the wrong tool. This content is highly structured and changes rarely: eight brands, a list of branches, a fixed set of investor tabs.",
        "So content lives in typed modules the compiler checks. A brand is an object with a colour, a market and a description. A branch is a record with coordinates. Adding one is a data change, and a missing key is caught while developing rather than rendering as a blank space.",
      ],
    },
    {
      type: "solution",
      title: "One group, eight brands",
      body: [
        "Each platform keeps its own identity — its colour, its market, the year it was founded — while the page treats them as one system.",
      ],
      figure: {
        src: brands,
        alt: "Directory grid of eight healthcare brand cards, each with a coloured top border, logo, country, branch count and founding year",
        treatment: "plate",
        dir: "ltr",
        locale: "en",
        caption:
          "Eight platforms rendered from one component and eight data records.",
      },
    },
    {
      type: "features",
      title: "What the platform does",
      items: [
        {
          title: "Audience routing",
          body: "Investors, physicians and partners each get a tailored path from the home page rather than a single undifferentiated story.",
          figure: {
            src: physicians,
            alt: "Physicians section showing a four-step referral flow: refer, match, report, deliver",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
        },
        {
          title: "Investor relations",
          body: "A dedicated section with tabs for thesis, performance, shareholders, strategy, expansion, governance, risk and press — each reading from its own data.",
          figure: {
            src: investors,
            alt: "Investor relations landing section with headline statistics and a row of tabs",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
        },
        {
          title: "Expansion roadmap",
          body: "A staged timeline of the group's growth plan, rendered from data rather than drawn as an image.",
          figure: {
            src: roadmap,
            alt: "Expansion roadmap timeline showing staged growth milestones with status markers",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
        },
        {
          title: "Partner network",
          body: "The diagnostic equipment vendors behind the group's imaging capability.",
          figure: {
            src: partners,
            alt: "Technology partners section listing major diagnostic equipment manufacturers",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
          },
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
            "Typed modules for brands, branches, investors",
            "Key-based copy lookup with fallbacks",
            "No CMS, no database",
          ],
          note: "Adding a brand or a branch is a data change the compiler checks.",
        },
        {
          name: "Application",
          items: [
            "TanStack Start + Router",
            "Shared component system",
            "Per-brand theming from data",
          ],
        },
        {
          name: "Discovery",
          items: [
            "Metadata and canonical links",
            "Structured data per page, brand and branch",
            "Sitemap generated before every build",
          ],
          note: "All of it produced at build time, because there is no server.",
        },
        {
          name: "Delivery",
          items: [
            "Prerendered static output",
            "Client's own hosting",
            "Caching and security headers in the host config",
          ],
        },
      ],
    },
    {
      type: "decisions",
      title: "Engineering decisions",
      stories: [
        {
          title: "The architecture was decided by the client's DNS",
          tags: ["deployment", "product"],
          problem: [
            "The site needed server-side rendering so that search engines would see complete pages. Every attempt to deploy it that way ran into the same wall.",
          ],
          rootCause: [
            "The group's domain is managed by an external DNS provider that blocks the custom-domain and route configuration the hosting platform requires, and the client would not move their nameservers to a different provider. No amount of application code changes that.",
          ],
          constraints: [
            "The client's nameservers could not move",
            "The DNS provider blocks the hosting platform's routing",
            "SEO was a primary goal, not a nice-to-have",
          ],
          options: [
            {
              option: "Keep the edge-rendered deployment",
              whyNot:
                "Its routing depends on DNS configuration the client's provider blocks.",
            },
            {
              option: "Run a Node server on the client's own hosting",
              whyNot:
                "It worked, but it made the client responsible for running a process they have no one to maintain.",
            },
            {
              option: "Render everything at build time and serve static files",
              whyNot:
                "Chosen — it removes the runtime dependency entirely, at the cost of doing the SEO work up front.",
            },
          ],
          decision: [
            "Stop requiring a server at all. Do the work that server-side rendering was for — complete HTML, a sitemap, structured data — during the build instead, and ship files the client's existing hosting can serve.",
          ],
          implementation: [
            "The site moved through four deployment shapes before settling: an edge-rendered deployment, a Node process on the client's hosting, a prerendering pass, and finally a static build. A sync step verified that every route had actually produced real HTML before anything was published.",
            "The pieces that had assumed a server were replaced rather than dropped: the contact form moved from a server function to a hosted form endpoint, and the host configuration took over single-page routing, long-lived caching for fingerprinted assets, no-cache for HTML, and the security headers.",
          ],
          result: [
            "The platform runs on the client's own infrastructure with nothing to maintain, and the search-engine work survived the move because it happens at build time. The live site still serves from that hosting today.",
          ],
        },
        {
          title: "A branch network you can actually search",
          tags: ["ux", "product"],
          problem: [
            "Dozens of branches across three countries. A list of addresses is not how anyone finds a clinic, and one undifferentiated map pin cloud does not tell you which of the group's brands you are looking at.",
          ],
          decision: [
            "Build a real interactive map, coloured by brand, filterable, with directions out to the user's own maps app.",
          ],
          implementation: [
            "Branch records carry coordinates and their brand, so markers take the brand's colour and the filter tabs narrow the map to one platform at a time. Popups link straight out to directions, and any text coming from data is escaped before it reaches the popup.",
          ],
          result: [
            "The network reads as a network — which brand is where, and how to get to the nearest one.",
          ],
          figure: {
            src: map,
            alt: "Interactive map of Egypt with clustered teal branch markers and a row of brand filter tabs above it",
            treatment: "plate",
            dir: "ltr",
            locale: "en",
            caption: "Filterable by brand, with directions from each pin.",
          },
        },
        {
          title: "Measuring the right element",
          tags: ["performance"],
          problem: [
            "The page opened behind a preloading overlay. Because that overlay wrapped the content, the browser's largest-contentful-paint measurement was describing the overlay rather than the hero a visitor actually waits for — so the number being optimised was not the number a user experiences.",
          ],
          decision: [
            "Remove the wrapper so the real hero is what gets measured, and treat the entrance animation as an enhancement rather than a gate on content.",
          ],
          implementation: [
            "The opacity wrapper came out of the paint path. The same pass added a skip link and honoured the reduced-motion preference, so the introduction animation can be switched off by the visitor's own setting.",
          ],
          result: [
            "Performance work now targets what the visitor is actually waiting for, and the entrance is no longer mandatory.",
          ],
        },
      ],
    },
    {
      type: "rtlNote",
      title: "Arabic data inside an English interface",
      body: [
        "The interface is English, but the branch records are not: names and street addresses are stored in Arabic, because that is how they are written on the buildings and how someone searching will recognise them.",
        "That means Arabic strings render inside an English left-to-right layout — in map popups, in cards, in directions links — and each one has to be isolated so the surrounding punctuation and numbers do not flip around it. It is the same discipline as the bilingual work elsewhere, applied to data rather than to the interface.",
      ],
    },
    {
      type: "quality",
      title: "Discovery without a server",
      body: [
        "With rendering moved to build time, everything a search engine needs has to be produced before deployment rather than on request.",
      ],
      security: [
        "Structured data generated per page, per brand and per branch, including geographic coordinates for the network",
        "Canonical links and metadata produced from one shared helper rather than hand-written per page",
        "A sitemap regenerated before every build, so it cannot drift from the routes",
        "Caching, content-type and framing headers set in the host configuration",
        "A skip link and reduced-motion support in the same pass as the paint fix",
      ],
      metrics: [
        {
          label: "Diagnostic and clinical platforms",
          after: "8",
          method: "Brand records in the content modules, matching the public directory",
          verification: "observed",
        },
        {
          label: "Branches across three countries",
          after: "78+",
          method: "The figure Ray Lab Group publishes on the live site",
          verification: "observed",
        },
        {
          label: "Investor tabs, each data-driven",
          after: "9",
          method: "Tab components in the investors section",
          verification: "observed",
        },
      ],
    },
    {
      type: "outcome",
      title: "Outcome",
      body: [
        "The group has one platform that speaks to investors, physicians and partners without flattening eight brands into one voice, and a branch network that can be explored rather than read.",
        "It is live on the client's own hosting with no server to maintain, and the search-engine work survived four changes of deployment because none of it depends on runtime rendering.",
      ],
      figure: {
        src: reach,
        alt: "Network summary cards showing 78+ branches, 6 brands, 3 operating markets and 1.6M+ annual exams",
        treatment: "plate",
        dir: "ltr",
        locale: "en",
        caption: "Group figures as published by the client.",
      },
    },
    {
      type: "lessons",
      title: "What I would carry forward",
      body: [
        "Infrastructure you do not control is a requirement, not an obstacle to route around. Had I asked about the client's DNS on day one, the build would have targeted static output from the start and saved three deployment attempts.",
        "Moving the SEO work to build time turned out to cost very little. What server rendering was protecting — complete HTML, a correct sitemap, structured data — can all be produced ahead of time when content changes on deploy rather than per request.",
      ],
    },
    {
      type: "gallery",
      title: "On a phone",
      figures: [
        {
          src: mHome,
          alt: "Ray Lab Group home page on a phone, with the group headline and audience entry points",
          treatment: "phone",
          dir: "ltr",
          locale: "en",
        },
        {
          src: mPhysicians,
          alt: "Physician referral steps on a phone, stacked as individual cards",
          treatment: "phone",
          dir: "ltr",
          locale: "en",
          caption: "The referral flow stacks rather than shrinking.",
        },
      ],
    },
  ],
};
