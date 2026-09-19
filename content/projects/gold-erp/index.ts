import { ar } from "../../types";
import type { ProjectInput } from "../../schema";
import activity from "./images/activity.png";
import buyback from "./images/buyback.png";
import coins from "./images/coins.png";
import mPos from "./images/m-pos.png";
import mReceiving from "./images/m-receiving.png";
import prices from "./images/prices.png";
import reports from "./images/reports.png";
import saleReceipt from "./images/sale-receipt.png";
import statement from "./images/statement.png";
import suppliers from "./images/suppliers.png";

/**
 * Sources for every claim below:
 * - Portfolio-assets/gold-erp/documents/CASE-STUDY.md (written from the code)
 * - Portfolio-assets/gold-erp/documents/HANDOVER.md (limitations, go-live)
 * - the lotfy project repository (migrations, RPCs, commit history)
 * - the verified screenshots in Portfolio-assets/gold-erp
 *
 * Framing locked with Marco: "daily karat pricing with snapshot-at-sale" and
 * "admin-gated access with an audit trail" — never "full RBAC".
 * Screens show seeded sample data; the shop name is cleared for publication.
 */
export const goldErp: ProjectInput = {
  slug: "gold-jewelry-erp",
  title: "Mogohrat Al-Gabaly",
  positioning: "Production ERP and POS for a gold and jewelry retailer",
  summary:
    "A full operations system for a gold shop: daily karat pricing, serialized per-piece inventory, a point of sale that prices live, wholesale credit ledgers, buy-back of old gold, and Arabic documents that print correctly.",
  category: { en: "ERP & POS", ar: ar("إدارة وتشغيل") },
  year: "2026",
  duration: "June – July 2026",
  status: "production",
  role: "Sole engineer",
  platforms: ["admin"],
  languages: ["ar"],
  stack: [
    "nextjs",
    "react",
    "typescript",
    "tailwind",
    "supabase",
    "postgres",
    "serverActions",
    "zod",
    "puppeteer",
    "vercel",
  ],
  links: {
    live: "https://mogohrat-lotfy.vercel.app",
    note: "Staff login required — the system has no public side.",
  },
  confidentiality: "limited",
  depth: "case-study",
  featured: true,
  order: 2,
  updatedAt: "2026-09-19",

  cover: {
    src: prices,
    alt: "Daily gold pricing screen in Arabic showing buy and sell prices per gram for karats 24, 22, 21, 18 and 14, with the update form below",
    treatment: "browser",
    url: "mogohrat-lotfy.vercel.app",
    dir: "rtl",
    locale: "ar",
    sampleData: true,
  },

  seo: {
    title: "Gold & jewelry ERP — daily pricing, serialized stock, Arabic POS",
    description:
      "Building a gold shop's operations system: karat pricing that changes daily, per-piece inventory, atomic sales, credit ledgers and Arabic PDFs.",
  },

  sections: [
    {
      type: "overview",
      body: [
        "A gold and jewelry retailer runs its whole day on numbers that move. The price of a gram changes every morning, every ring has its own weight and making charge, and the shop's actual margin hides inside that making charge rather than in the headline price on the receipt.",
        "This is the system the shop runs on: an Arabic, right-to-left admin with no public side at all. It covers the full cycle of gold through the shop — supply, stock, retail and wholesale selling, returns, buying old gold back from customers, and melting or converting it into something sellable again. Every movement of weight is written to one ledger, and every operation is written to an audit log.",
        "It is twenty-two admin screens and five printable Arabic documents, over nine database migrations and twenty-three tables.",
      ],
    },
    {
      type: "role",
      title: "My role",
      ownership: {
        owned: [
          "Requirements with the shop owner, and the domain model",
          "All twenty-two admin screens, Arabic-only and right-to-left",
          "Pricing engine shared by the cart and the server",
          "Atomic sale and wholesale functions in PostgreSQL",
          "Reporting: daily closing, monthly, and profit analytics",
          "Arabic PDF documents rendered on serverless",
          "Audit log, access control and the handover documentation",
        ],
        team: "Built solo for the shop owner.",
      },
    },
    {
      type: "challenge",
      title: "Why a gold shop cannot use ordinary retail software",
      body: [
        "In normal retail a product has a price. Here it does not. A piece is worth its weight times today's rate for its karat, plus a making charge, and the shop's profit lives almost entirely in that making charge. An invoice of a hundred thousand pounds might be ninety percent gold value that simply passes through at the day's rate.",
        "Treat revenue as profit and every report lies. Discount against the gold value instead of the making charge and the shop can sell at a loss without noticing.",
        "On top of that, jewelry is unique per piece while bars and coins are standard products sold by count — two different inventory models that still have to share one ledger of grams. And the wholesale side of the business was being tracked in a paper notebook.",
      ],
    },
    {
      type: "requirements",
      title: "What the shop needed, and what each need decided",
      items: [
        {
          requirement: "The price of a gram changes every day, per karat.",
          decision:
            "Daily buy and sell entry per karat with history. No piece stores a price; it is computed, and the rate is snapshotted onto the sale at the moment it is made.",
        },
        {
          requirement: "Every ring and chain is unique.",
          decision:
            "Serialized inventory: one row per physical piece, with its own weight, making charge and lifecycle status.",
        },
        {
          requirement: "Bars and coins are standard products sold by count.",
          decision:
            "A typed catalogue of bullion. Received by type and quantity, sold by count, priced from the day's rate rather than typed in by hand.",
        },
        {
          requirement:
            "Wholesale traders take goods on credit and pay in instalments — tracked until now in a paper notebook.",
          decision:
            "A B2B ledger with a running balance, and an opening balance so the notebook's history could be carried over on day one.",
        },
        {
          requirement:
            "Suppliers are paid in parts, and sometimes give a discount on an invoice.",
          decision:
            "A purchase ledger with partial payments, and supplier discount allocated across the pieces so each one carries its true cost.",
        },
        {
          requirement: "Customers sell their old gold back to the shop.",
          decision:
            "Buy-back into a scrap pool per karat, which can be sold on for melting or converted into a new sellable piece.",
        },
        {
          requirement: "Several managers work at the same time.",
          decision:
            "Sales run as one all-or-nothing database function with row locks, so the same piece cannot be sold twice.",
        },
        {
          requirement: "The daily closing has to be exact to the piastre.",
          decision:
            "Returns netted the same way in every report, invoice discounts allocated across lines, and VAT charged on the making charge only.",
        },
      ],
    },
    {
      type: "glossary",
      title: "The vocabulary the system speaks",
      body: [
        "This is a business that thinks in Arabic. The words below are not translations chosen for a case study — they are the terms on the screens, the receipts and the ledger, and getting them right was part of getting the model right.",
      ],
      terms: [
        {
          ar: "عيار",
          en: "Karat",
          meaning:
            "Gold purity — 24, 22, 21, 18 or 14. Each carries its own buy and sell price per gram, entered daily.",
        },
        {
          ar: "مصنعية",
          en: "Making charge",
          meaning:
            "What the shop charges for craftsmanship, per gram, per piece or as a percentage. This is where the real margin lives.",
        },
        {
          ar: "كسر",
          en: "Scrap gold",
          meaning:
            "Old gold bought back from customers by weight. It accumulates as a pool per karat, to be sold for melting or converted into a new piece.",
        },
        {
          ar: "سبائك",
          en: "Bars",
          meaning:
            "Standard investment bullion, handled by type and count rather than as unique pieces.",
        },
        {
          ar: "جنيهات",
          en: "Gold coins",
          meaning:
            "Coins sold by count, priced from the day's rate for their karat plus a making charge.",
        },
      ],
    },
    {
      type: "approach",
      title: "Modelling the domain before the screens",
      body: [
        "The decision that shaped everything else was to keep one internal model and let a single field tell the two product worlds apart. A ring and a gold coin are both a row in the same table, with a serial number and a lifecycle status; what differs is how they are received, priced and printed.",
        "That keeps the ledger of grams honest — every gram is tracked the same way regardless of what it is attached to — while still letting the counter treat a coin as 'five of these' and a ring as 'this exact one'.",
        "Prices were the other early decision: nothing stores a computed price. The rate is entered once a day, the calculation is a pure function, and the number written onto a sale is a snapshot taken at that moment.",
      ],
    },
    {
      type: "solution",
      title: "The system in use",
      body: [
        "The day starts on this screen. Prices for each karat are entered once, they land in history, and every other calculation in the system reads from them.",
      ],
      figure: {
        src: prices,
        alt: "Gold price screen listing five karat cards with buy and sell rates per gram, above a form for updating each one",
        treatment: "plate",
        dir: "rtl",
        locale: "ar",
        sampleData: true,
        caption: "Today's rates. Entered once, read everywhere.",
      },
    },
    {
      type: "features",
      title: "What it covers",
      items: [
        {
          title: "Point of sale",
          body: "A cart that prices live from the day's rate, with an optional customer, a discount that is capped to the making charge, and a printable Arabic receipt.",
          figure: {
            src: saleReceipt,
            alt: "Sale detail screen in Arabic showing invoice lines, totals and a return action",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
            sampleData: true,
          },
        },
        {
          title: "Buy-back and scrap",
          body: "Old gold bought from customers by weight and karat, accumulating in a scrap pool that can be sold for melting or converted into a new sellable piece.",
          figure: {
            src: buyback,
            alt: "Buy-back screen in Arabic with a purchase form and cards showing the scrap pool held per karat",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
            sampleData: true,
          },
        },
        {
          title: "Wholesale on credit",
          body: "Traders withdraw stock against their account and pay over time, with a running balance and a printable statement.",
        },
        {
          title: "Suppliers and receiving",
          body: "Supply invoices with partial payments and discounts, and a receiving screen for entering jewelry per piece or bullion by type and count.",
          figure: {
            src: suppliers,
            alt: "Supplier ledger in Arabic showing totals purchased, paid and still owed",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
            sampleData: true,
          },
        },
        {
          title: "Bars and coins",
          body: "A typed catalogue with its own pricing pages, kept separate from jewelry because the two are bought and sold in completely different ways.",
          figure: {
            src: coins,
            alt: "Gold coin pricing screen in Arabic listing coin types with their karat, weight and price",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
            sampleData: true,
          },
        },
        {
          title: "Reports and audit",
          body: "Daily closing, a monthly report against the previous month, profit analytics that rank by profit rather than revenue, and an audit log of every operation.",
          figure: {
            src: activity,
            alt: "Audit log in Arabic listing operations with the user, action type and timestamp",
            treatment: "plate",
            dir: "rtl",
            locale: "ar",
            sampleData: true,
          },
        },
      ],
    },
    {
      type: "architecture",
      title: "How it fits together",
      layers: [
        {
          name: "Client",
          items: [
            "Arabic right-to-left admin",
            "Server Components for reads",
            "Small client islands for carts and forms",
          ],
          note: "No public surface at all; every route is behind a staff login.",
        },
        {
          name: "Application",
          items: [
            "Server Actions for every write",
            "requireAdmin() on each one",
            "Zod validation at the boundary",
            "Pure pricing function shared with the cart",
          ],
        },
        {
          name: "Data",
          items: [
            "PostgreSQL on Supabase, 23 tables",
            "Row-level security enabled with no policies",
            "Atomic sale and withdrawal functions",
            "One ledger of gold movements",
          ],
          note: "Deny-all by default: the browser can reach nothing directly.",
        },
        {
          name: "Documents",
          items: [
            "Five Arabic A4 documents",
            "Rendered by headless Chromium",
            "Same components as the screen",
          ],
        },
      ],
    },
    {
      type: "decisions",
      title: "Engineering decisions",
      stories: [
        {
          title: "Profit is the making margin, not the revenue",
          tags: ["product", "data-integrity"],
          problem: [
            "Because most of an invoice is gold value passing through at the day's rate, treating revenue as performance would make every report flattering and wrong. Allowing a discount to eat into the gold value would let the shop sell below cost without anyone noticing.",
          ],
          decision: [
            "Compute price from one pure function used by both the cart and the server, keep the making charge as its own line, and cap discounts to the making total unless a manager explicitly allows more.",
          ],
          implementation: [
            "Gold value is weight times the day's sell rate for that karat; the making charge is per gram, per piece or a percentage; VAT applies to the making charge only. The server recomputes every price from the database at the moment of sale, so what the cashier saw and what is recorded can never disagree.",
            "Profit in every report is the net line value minus the piece's stored cost, and the analytics rank products by profit rather than revenue. If a karat has no price for the day, or a bullion type has none, the sale is refused rather than completed at zero.",
          ],
          result: [
            "The reports describe the business the shop actually runs, and a discount cannot quietly cut into the metal.",
          ],
        },
        {
          title: "Two inventory models, one ledger of grams",
          tags: ["product", "data-integrity"],
          problem: [
            "A ring is unique: its weight and making charge belong to that piece alone. A gold coin is a standard product — a trader asks for five of them. Forcing both into one behaviour breaks either the counter or the stock count.",
          ],
          decision: [
            "Keep one internal representation — every physical item is a row with a serial and a status — and let a product-type field drive how it is received, priced, allocated and printed.",
          ],
          implementation: [
            "Jewelry is entered piece by piece with its own weight and making charge. Bullion is entered by type and quantity: the weight comes from the type and the cost is computed on the server from the buy rate at that moment. On a wholesale withdrawal the server allocates the oldest matching pieces first and writes one line per serial, while the printed document groups them back into a single readable line.",
          ],
          result: [
            "The counter can say 'five coins' and the ledger still knows exactly which five pieces left the shop, and at what cost.",
          ],
        },
        {
          title: "A piece cannot be sold twice",
          tags: ["data-integrity", "security"],
          problem: [
            "Three managers sell from different devices. If a sale were a sequence of separate queries — read the status, write the invoice, update the piece — two of them could sell the same ring, or a dropped connection could leave half an invoice behind.",
          ],
          decision: [
            "Move the whole sale into a single database function that either completes or does nothing.",
          ],
          implementation: [
            "The sale and the wholesale withdrawal are PostgreSQL functions that lock each piece's row before touching it. A concurrent attempt on the same piece waits, finds it already sold, and fails with a clear error instead of a duplicate. The invoice, its lines, the status change and the movement record all commit together, with a retry when two sales pick the same invoice number.",
            "Returns take the opposite guarantee without a function: the update only applies while the piece is still marked sold, so a second return affects zero rows and is rolled back.",
          ],
          result: [
            "Double selling and double returning are both structurally impossible, rather than prevented by being careful.",
          ],
        },
        {
          title: "Three reports that have to agree",
          tags: ["data-integrity", "product"],
          problem: [
            "The daily closing, the monthly report and the profit analytics all compute 'profit' from the same data. With invoice-level discounts, partial returns, supplier discounts and Cairo day boundaries in play, they can disagree — and a report that contradicts another is worse than no report.",
          ],
          decision: [
            "Define each rule once and apply it identically everywhere: how returns are netted, how a discount is spread, and where a day begins.",
          ],
          implementation: [
            "Returns are excluded from every aggregate on the same basis. An invoice-level discount is allocated across lines by each line's share of the original invoice, so a partial return does not hand the remaining lines the returned line's discount. A refund is capped at what the customer actually paid for the selected lines after that allocation. Supplier discounts are spread across the received pieces with the rounding difference going to the last one, so costs sum exactly. A piece whose cost is unknown counts as zero profit rather than pure profit. Day and month boundaries are computed on Cairo time, including daylight saving.",
            "Where a query could exceed its row limit, it raises an error rather than silently returning a smaller number.",
          ],
          result: [
            "The three reports reconcile, and when something is out of range the system says so instead of quietly under-reporting.",
          ],
        },
        {
          title: "Arabic documents that print correctly from serverless",
          tags: ["rtl", "deployment"],
          problem: [
            "Receipts, return slips, buy-back vouchers, withdrawal notes and account statements all have to print as proper Arabic: joined letters, right-to-left, correct numerals. Typical PDF libraries shape Arabic badly, and a serverless function has no browser.",
          ],
          decision: [
            "Let a real browser engine do the text shaping, and ship one with the function.",
          ],
          implementation: [
            "The same component that renders on screen is rendered to HTML, wrapped in an A4 page marked as Arabic and right-to-left with the Cairo typeface, and printed by headless Chromium. The renderer waits for the network to settle and for fonts to finish loading, so no glyph falls back to a box. On the platform, the Chromium binary has to be explicitly included in the function bundle because it is loaded through a path computed at runtime that the build cannot see. The browser instance is reused between requests, and the Arabic filename is encoded so it survives the download header.",
          ],
          result: [
            "Five Arabic documents print correctly from a serverless function, and the printed statement is the same component the manager sees on screen.",
          ],
          figure: {
            src: statement,
            alt: "Printable Arabic account statement showing the shop name, customer, a dated ledger with debit, credit and running balance columns, a closing balance and two signature lines",
            treatment: "document",
            dir: "rtl",
            locale: "ar",
            sampleData: true,
            caption:
              "A wholesale account statement, ready to print and sign.",
          },
        },
      ],
    },
    {
      type: "rtlNote",
      title: "Arabic as the only language",
      body: [
        "This system has no English mode and does not need one. Everyone who touches it works in Arabic, so the interface is right-to-left throughout, numbers and dates are formatted for Egypt, and the printed documents match what is on screen.",
        "That is a different discipline from a bilingual product. There is no fallback to hide behind: if a table clips, a number renders in the wrong direction, or a date lands on the wrong day because the server is not thinking in Cairo time, the shop notices the same day.",
      ],
    },
    {
      type: "quality",
      title: "Access, audit and honest limits",
      body: [
        "This is a system that holds a business's money, so access is narrow and everything is recorded.",
      ],
      security: [
        "Row-level security is enabled on every table with no policies at all: the browser can reach nothing directly, and all access runs server-side behind an admin check",
        "Admin status is read from the staff table, never from user-editable metadata",
        "Every privileged action and every PDF route validates its caller and its input",
        "An audit log records each operation, and is written so that a logging failure can never break a real sale",
        "Sample data is marked and removable, with a dry run by default, so it can be cleared before go-live",
      ],
      metrics: [
        {
          label: "Admin screens",
          after: "22",
          method: "Counted from the application routes",
          verification: "observed",
        },
        {
          label: "Printable Arabic documents",
          after: "5",
          method:
            "Sale receipt, return slip, buy-back voucher, withdrawal note, account statement",
          verification: "observed",
        },
        {
          label: "Database tables",
          after: "23",
          method: "Across nine migrations",
          verification: "observed",
        },
      ],
    },
    {
      type: "delivery",
      title: "Handover",
      body: [
        "The shop owns this system, so it was handed over rather than just deployed. It ships with a bilingual handover document: what runs where, which migrations are applied, how to add a manager, a go-live checklist covering key rotation and clearing the sample data, and — deliberately — a written list of the known limitations.",
        "One of those is honest about a trade-off: supplier and wholesale balance updates still read, modify and write without a row lock. With three managers the risk is small, and the atomic replacement is specified in the document rather than left for someone to discover.",
      ],
      figure: {
        src: reports,
        alt: "Daily closing report in Arabic with headline figures, cash drawer reconciliation, payment method breakdown and the day's sales",
        treatment: "plate",
        dir: "rtl",
        locale: "ar",
        sampleData: true,
        caption: "The daily closing the shop reconciles against.",
      },
    },
    {
      type: "outcome",
      title: "Outcome",
      body: [
        "The shop runs its day on this: prices in the morning, sales and buy-backs through the day, and a closing report that reconciles against the drawer at night. The wholesale notebook became a ledger with a running balance and a statement a trader can sign.",
        "What matters in it is not the number of screens. It is the guarantees: a piece cannot be sold twice, a price is always recomputed on the server, the reports agree with each other, and the Arabic documents print correctly from a serverless function.",
      ],
    },
    {
      type: "lessons",
      title: "What I would carry forward",
      body: [
        "Domain modelling did more work here than any framework decision. Getting 'price is computed, never stored' and 'one row per physical piece' right at the start is what made the reports reconcile months later.",
        "Writing the known limitations into the handover was uncomfortable and correct. A client who knows where the edges are can make decisions; one who finds out later cannot.",
      ],
    },
    {
      type: "gallery",
      title: "Built for the counter, not just the desk",
      figures: [
        {
          src: mReceiving,
          alt: "Receiving screen on a phone, where the wide desktop entry grid becomes one labelled card per piece",
          treatment: "phone",
          dir: "rtl",
          locale: "ar",
          sampleData: true,
          caption:
            "Receiving on a phone: the desktop entry grid becomes one card per piece rather than a table squeezed sideways.",
        },
        {
          src: mPos,
          alt: "Point of sale on a phone in Arabic, with search, cart, payment method and totals stacked vertically",
          treatment: "phone",
          dir: "rtl",
          locale: "ar",
          sampleData: true,
          caption: "The point of sale, stacked for a phone.",
        },
      ],
    },
  ],
};
