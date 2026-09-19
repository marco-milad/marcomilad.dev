import { ar } from "../../types";
import type { ProjectInput } from "../../schema";
import adminPos from "./images/admin-pos.png";
import adminProducts from "./images/admin-products.png";
import categories from "./images/categories.png";
import mCatalog from "./images/m-catalog.png";
import adminSearch from "./images/admin-search.png";
import mobileMenu from "./images/mobile-menu.png";
import storefrontAr from "./images/storefront-ar.png";
import storefrontEn from "./images/storefront-en.png";

/**
 * Sources for every claim below:
 * - Portfolio-assets/mm-bags/documents/CASE-STUDY.md
 * - Portfolio-assets/mm-bags/evidence/build-summary.md (route map, integrations)
 * - the mm-bags repository itself (migrations, RPCs, commit history)
 * - the verified screenshots in Portfolio-assets/mm-bags/screens + /mobile
 *
 * Numbers carry the method they were measured with. Nothing is estimated.
 */
export const mmBags: ProjectInput = {
  slug: "mm-bags",
  title: "M.M Bags",
  positioning: "Production e-commerce and retail operations platform",
  summary:
    "A bilingual storefront and the operations system behind it — inventory, POS, suppliers, purchase orders, returns and reporting — built for a luggage retailer selling in Egypt.",
  category: { en: "E-commerce & retail operations", ar: ar("تجارة وتشغيل") },
  year: "2026",
  duration: "May – September 2026",
  status: "production",
  role: "Sole engineer and designer",
  platforms: ["web", "admin"],
  languages: ["ar", "en"],
  stack: [
    "nextjs",
    "react",
    "typescript",
    "tailwind",
    "supabase",
    "postgres",
    "serverActions",
    "zod",
    "zustand",
    "recharts",
    "puppeteer",
    "resend",
    "twilio",
    "vercel",
  ],
  brand: "#1b2b4b",
  timeline: { start: "2026-05", end: "2026-09" },
  confidentiality: "public",
  depth: "case-study",
  featured: true,
  order: 1,
  updatedAt: "2026-09-19",

  cover: {
    src: storefrontAr,
    alt: "M.M Bags storefront home page in Arabic, right-to-left, with a navy hero and the headline 'travel smart, travel in style'",
    treatment: "browser",
    url: "mm-bags.vercel.app",
    dir: "rtl",
    locale: "ar",
  },

  seo: {
    title: "M.M Bags — production e-commerce and retail operations",
    description:
      "How I built a bilingual Arabic-first storefront and the POS, stock, supplier and reporting system behind it, on Next.js and Postgres.",
  },

  sections: [
    {
      type: "overview",
      body: [
        "M.M Bags is a luggage retailer established in 1998 with two branches in Upper Egypt, and no online presence before this project. It needed two things at once: a storefront customers would actually buy from, and a way to run the shop that did not depend on a paper notebook.",
        "So the platform is one system with two faces. The public side is Arabic-first and right-to-left, with an English version, designed mobile-first for Egyptian networks. The private side is an operations surface: products and collections, stock, a point of sale for the counter, returns, suppliers, purchase orders, orders, reports, analytics and the content of the home page itself.",
        "The hardest part was never the interface. It was payment: the way money actually moves in Egypt does not fit the checkout flow that e-commerce frameworks assume.",
      ],
    },
    {
      type: "role",
      title: "My role",
      ownership: {
        owned: [
          "Product scope and the data model",
          "Arabic-first bilingual UI, RTL and LTR from one codebase",
          "Storefront: catalog, product pages, cart, checkout, order tracking",
          "Operations: POS, stock, returns, suppliers, purchase orders, reports, analytics",
          "Payment flow, order state machine and the expiry job",
          "Database schema, row-level security and the atomic stock functions",
          "Deployment, scheduled jobs and the performance work",
        ],
      },
      body: [
        "I built this alone, end to end — requirements, data model, interface, backend and deployment.",
      ],
    },
    {
      type: "challenge",
      title: "The business problem",
      body: [
        "InstaPay is how a large share of Egyptians move money, and it has no merchant API. There is no callback that says an order was paid, so automatic confirmation is impossible. A checkout that assumes a payment gateway will simply be wrong here.",
        "At the same time, stock is physical and shared. The same bag can be sold online and taken off the shelf at the counter within the same minute. If the two channels keep separate counts, the shop oversells and someone has to apologise to a customer.",
      ],
    },
    {
      type: "requirements",
      title: "Requirements, and what each one decided",
      items: [
        {
          requirement:
            "Customers pay by InstaPay transfer or cash on delivery.",
          decision:
            "A guided manual payment path: clear transfer instructions, the order held as pending, and an admin who confirms. No fake automation.",
        },
        {
          requirement:
            "Pending unpaid orders must not hold stock hostage forever.",
          decision:
            "A scheduled job expires unpaid InstaPay orders and returns the reserved stock automatically.",
        },
        {
          requirement: "Customers read and search in Arabic.",
          decision:
            "Arabic is the default locale and the default direction; English is the alternate. Search normalises Arabic the way people actually type it.",
        },
        {
          requirement: "Staff sell from the counter too.",
          decision:
            "A point of sale inside the same admin, deducting from the same stock ledger as the website.",
        },
        {
          requirement: "Suppliers are paid over time, in instalments.",
          decision:
            "Purchase orders with a supplier ledger, and a branded PDF that can be sent to the supplier over WhatsApp.",
        },
        {
          requirement: "Egyptians expect updates on WhatsApp, not email.",
          decision:
            "Order lifecycle notifications over WhatsApp, with email kept for receipts and the newsletter.",
        },
      ],
    },
    {
      type: "approach",
      title: "The shape of the product",
      body: [
        "Two decisions came before any screen. The first was that this is one system, not a website plus an admin tool bought separately: the storefront and the shop counter read and write the same stock, because they are selling the same physical bags.",
        "The second was that Arabic is the default and English is the alternate — not a language toggle added at the end. The customer this shop actually serves reads Arabic on a phone, on a network that is not fast, so that is the case the design starts from and the English version mirrors.",
      ],
    },
    {
      type: "solution",
      title: "The storefront",
      body: [
        "Arabic-first means the default experience is right-to-left, not a translation bolted onto an English layout. Both directions render from one component tree; there is no forked UI.",
      ],
      figure: {
        src: storefrontAr,
        alt: "Arabic storefront home page with navy hero, product promise badges and two calls to action",
        treatment: "browser",
        url: "mm-bags.vercel.app/ar",
        dir: "rtl",
        locale: "ar",
        caption:
          "The default experience: Arabic, right-to-left, mobile-first.",
      },
    },
    {
      type: "features",
      title: "What the system runs",
      items: [
        {
          title: "Storefront",
          body: "Catalog with collections and filtering, product pages with variants, comparison, wishlist, cart, checkout, order confirmation, order tracking and a back-in-stock waitlist.",
        },
        {
          title: "Point of sale",
          body: "Counter sales against the same stock as the website, plus POS returns.",
          figure: {
            src: adminPos,
            alt: "Point of sale screen in Arabic with a payment panel on one side and a searchable product grid on the other",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
            caption: "The counter and the website draw down the same stock.",
          },
        },
        {
          title: "Catalogue management",
          body: "Products and variants with bilingual names, collection, price, stock and the flags that drive the storefront.",
          figure: {
            src: adminProducts,
            alt: "Products admin in Arabic listing items with thumbnails, prices, stock levels and active toggles",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
          },
        },
        {
          title: "Stock and suppliers",
          body: "A stock ledger, supplier records, purchase orders with a branded PDF, and a supplier account ledger.",
        },
        {
          title: "Orders and returns",
          body: "Order management with CSV export, a full returns flow, and atomic restock so a return cannot double-count inventory.",
        },
        {
          title: "Reports and analytics",
          body: "Daily and monthly reports, best sellers, stock value, supplier ledger and returns — exportable as CSV or PDF — plus first-party analytics with a nightly rollup.",
        },
        {
          title: "Content and staff",
          body: "Home-page merchandising controlled from the admin, reviews, a newsletter, and staff accounts across three roles.",
        },
      ],
    },
    {
      type: "architecture",
      title: "How it fits together",
      layers: [
        {
          name: "Clients",
          items: ["Arabic storefront (RTL)", "English storefront (LTR)", "Admin and POS"],
          note: "One Next.js application, one component tree, two directions.",
        },
        {
          name: "Application",
          items: [
            "Server Components for reads",
            "Server Actions for writes, each behind an admin check",
            "Zod validation at every boundary",
          ],
        },
        {
          name: "Data",
          items: [
            "PostgreSQL on Supabase",
            "Row-level security",
            "Atomic stock functions with row locks",
            "Stock movement ledger",
          ],
          note: "Stock changes go through database functions, never through a read-then-write in application code.",
        },
        {
          name: "Scheduled and external",
          items: [
            "Cron: expire unpaid InstaPay orders",
            "Cron: analytics rollup",
            "WhatsApp notifications",
            "Email and newsletter",
            "PDF rendering with headless Chromium",
          ],
        },
      ],
    },
    {
      type: "decisions",
      title: "Engineering decisions",
      stories: [
        {
          title: "Payment integrity when there is no merchant API",
          tags: ["product", "data-integrity", "security"],
          problem: [
            "The checkout offered a card option. An audit of the flow showed it confirmed orders without any money being captured — the order moved to paid on the customer's word alone.",
          ],
          rootCause: [
            "The card path had been wired to the order state machine without a payment provider actually authorising anything behind it. InstaPay, the method customers really use, has no merchant API to authorise against in the first place.",
          ],
          decision: [
            "Remove the card option rather than leave a path that could mark unpaid orders as paid, and make the manual reality explicit instead of pretending to automate it.",
          ],
          implementation: [
            "Checkout now offers cash on delivery or an InstaPay transfer. Choosing InstaPay shows transfer instructions and holds the order as pending payment; an admin confirms it after checking the receipt. The server rejects any payment method it does not recognise, so a forged value cannot re-enter the removed path.",
            "Because a pending order reserves stock, a scheduled job expires unpaid orders and releases what they were holding.",
          ],
          result: [
            "No order can be marked paid without a human confirming money arrived, and abandoned transfers release their stock on their own.",
          ],
        },
        {
          title: "An expiry window measured in business hours, not clock hours",
          tags: ["product", "data-integrity"],
          problem: [
            "The first version expired unpaid InstaPay orders after a fixed four hours. An order placed in the evening was cancelled overnight, before anyone had opened the shop to look at the receipt.",
          ],
          rootCause: [
            "The rule was written in wall-clock time, but confirmation depends on a person being at work. Four hours at 2am is not four hours of opportunity.",
          ],
          decision: [
            "Express the deadline in Cairo business hours, and compute it in the database rather than in application code, so every consumer of that deadline agrees.",
          ],
          implementation: [
            "The deadline became two business hours on Cairo time, calculated by database functions. The sweep takes row locks and skips rows another worker is already handling, so two overlapping runs cannot fight over the same order. The schedule was moved as well, because a 3am run could no longer do anything useful under the new rule.",
          ],
          result: [
            "Customers stopped losing orders overnight, and the sweep stays correct even if it overlaps with itself.",
          ],
        },
        {
          title: "Search that matches how Arabic is actually typed",
          tags: ["rtl", "ux"],
          problem: [
            "Arabic shoppers type the same word many ways. Alef appears bare or with a hamza, taa marbuta and haa get swapped, diacritics are usually omitted, and numbers may be Arabic-Indic or Western. A literal match returns nothing and the shop looks empty.",
          ],
          decision: [
            "Normalise both sides of the comparison — what is stored and what is typed — with the same function, and make the search index fuzzy rather than exact.",
          ],
          implementation: [
            "A normaliser modelled on Lucene's Arabic rules strips diacritics and tatweel, folds the alef variants, maps taa marbuta to haa and yaa/waw variants, and converts Arabic-Indic digits to Western. It builds the searchable text for each product and cleans the incoming query. Postgres trigram indexing backs the lookup.",
            "The analytics surface then records what people searched for and whether they found anything, so the gap is visible rather than guessed at.",
          ],
          result: [
            "Search survives the spelling variations real customers use, and zero-result searches became a number the shop can watch instead of an invisible loss.",
          ],
          figure: {
            src: adminSearch,
            alt: "Analytics screen in Arabic showing search counts, a zero-result percentage, and tables of terms customers searched for with and without results",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
            caption:
              "Searches that found nothing are tracked next to those that did, with a tool to link synonyms.",
          },
        },
        {
          title: "Arabic PDFs that render correctly on serverless",
          tags: ["rtl", "deployment"],
          problem: [
            "Purchase orders and reports have to print as proper Arabic documents. The PDF library in use broke Arabic: letters lost their joins and words came out in the wrong order.",
          ],
          rootCause: [
            "Arabic shaping — joining letters contextually and laying them out right-to-left — is genuinely hard, and the library did not do it. Patching around it meant reimplementing text shaping.",
          ],
          decision: [
            "Stop fighting the text layer and let a browser do what browsers already do correctly: render the same component to HTML and print it with headless Chromium.",
          ],
          implementation: [
            "Documents render as HTML in an Arabic right-to-left page and are printed by headless Chromium. Deploying that on serverless needed the Chromium binary explicitly included in the function bundle, because it is loaded through a path computed at runtime that the build's file tracer cannot see.",
          ],
          result: [
            "Arabic documents print with correct shaping and direction from a serverless function, using the same components that render on screen.",
          ],
        },
        {
          title: "Closing a privilege escalation in the admin",
          tags: ["security"],
          problem: [
            "A security pass over the admin found that a customer could give themselves an admin role, and that a number of server actions performed privileged work without checking who was calling them.",
          ],
          rootCause: [
            "Role was being read from user metadata that the account holder can edit, and authorisation had been applied per screen rather than at the action boundary. Several checks also failed open: when the auth lookup errored, the code continued.",
          ],
          decision: [
            "Treat the staff table as the only source of truth for who is an admin, and make every privileged action check for itself rather than trusting the surface that called it.",
          ],
          implementation: [
            "Role resolution moved to the staff table, an explicit admin check was added to the server actions that lacked one, and the failing-open checks were changed to deny when the lookup fails.",
          ],
          result: [
            "Self-promotion through editable metadata is no longer possible, and authorisation no longer depends on which screen the request came from.",
          ],
        },
      ],
    },
    {
      type: "mirror",
      title: "One codebase, both directions",
      body: [
        "The same page in Arabic and in English. Layout, navigation and reading order mirror; the component tree does not fork.",
      ],
      ltr: {
        src: storefrontEn,
        alt: "English storefront home page, left-to-right, with the headline 'travel smart, travel in style'",
        treatment: "browser",
        url: "mm-bags.vercel.app/en",
        dir: "ltr",
        locale: "en",
      },
      rtl: {
        src: storefrontAr,
        alt: "Arabic storefront home page, right-to-left, with the same hero and sections mirrored",
        treatment: "browser",
        url: "mm-bags.vercel.app/ar",
        dir: "rtl",
        locale: "ar",
      },
      notes: [
        "Direction comes from the locale, and spacing uses logical properties, so one rule set serves both.",
        "Arabic is the default: the English version is the alternate, not the other way round.",
      ],
    },
    {
      type: "quality",
      title: "Performance and security",
      body: [
        "Egyptian mobile networks are the real constraint, so the performance work targeted bytes and layout stability rather than benchmark scores for their own sake.",
      ],
      metrics: [
        {
          label: "Site-wide layout shift (CLS)",
          before: "0.045",
          after: "0.000",
          method:
            "Lighthouse mobile on a local production build, before and after rendering the promotional banner server-side",
          verification: "measured-local",
        },
        {
          label: "Checkout layout shift (CLS)",
          before: "0.105",
          after: "0.002",
          method: "Lighthouse mobile on a local production build",
          verification: "measured-local",
        },
        {
          label: "Catalog DOM nodes",
          before: "3,513",
          after: "1,412",
          method:
            "Node count on the catalog page after paginating to 24 products per page",
          verification: "observed",
        },
        {
          label: "Product image storage",
          before: "228 MB",
          after: "29 MB",
          method: "Re-encoding 373 stored images to WebP",
          verification: "observed",
        },
      ],
      security: [
        "Admin role resolved from the staff table, never from user-editable metadata",
        "Every privileged server action authorises for itself, and denies when the auth lookup fails",
        "Row-level security on customer-owned data; analytics and newsletter tables are unreachable from the browser",
        "Upload endpoints rate-limited, with file types verified by content rather than by extension",
        "Scheduled endpoints refuse to run without their secret",
        "Analytics cookies set only after consent, and search terms scrubbed of personal data",
      ],
    },
    {
      type: "delivery",
      title: "Production",
      body: [
        "Deployed on Vercel in the Frankfurt region, which is the closest region to the Supabase database — the network path from Egypt is the floor on every response, so the two are kept together.",
        "Two scheduled jobs run daily: expiring unpaid InstaPay orders, and rolling up analytics. A scripted catalog check runs against the database as a regression gate before shipping catalog changes.",
      ],
    },
    {
      type: "outcome",
      title: "Outcome",
      body: [
        "A shop that had no online presence now sells through a bilingual storefront and runs its counter, stock, suppliers and reporting from the same system, with one shared stock ledger behind both.",
        "The payment path reflects how money actually moves in Egypt: manual where it has to be, automatic where it can be, and never claiming an order is paid when it is not.",
      ],
    },
    {
      type: "lessons",
      title: "What I would carry forward",
      body: [
        "The interesting constraints were local, not technical. No merchant API, WhatsApp as the real notification channel, and Arabic spelling variation shaped more of this system than any framework choice did.",
        "Removing the card option was the right call and also the uncomfortable one: a checkout that looks more capable than it is costs more than one that is honest about needing a human.",
      ],
    },
    {
      type: "gallery",
      title: "More of the system",
      figures: [
        {
          src: mobileMenu,
          alt: "Mobile navigation sheet in Arabic showing collections with product counts and account links",
          treatment: "phone",
          dir: "rtl",
          locale: "ar",
          caption: "Mobile navigation — the design starts at this width.",
        },
        {
          src: mCatalog,
          alt: "Catalogue on a phone in Arabic, two products per row with prices",
          treatment: "phone",
          dir: "rtl",
          locale: "ar",
          caption: "The catalogue, where most customers actually browse.",
        },
        {
          src: categories,
          alt: "Collections landing page in Arabic with a dark hero and category cards",
          treatment: "plate",
          dir: "rtl",
          locale: "ar",
          caption: "Collections, merchandised from the admin.",
        },
      ],
    },
  ],
};
