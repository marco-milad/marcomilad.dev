/**
 * The technology dictionary. Projects reference ids, so a name is spelled one
 * way everywhere and the home "stack" section can be derived from real usage
 * instead of being maintained by hand.
 */

export type StackGroup = "frontend" | "backend" | "mobile" | "delivery";

export const stack = {
  // --- frontend ---
  react: { name: "React", group: "frontend" },
  nextjs: { name: "Next.js", group: "frontend" },
  typescript: { name: "TypeScript", group: "frontend" },
  tailwind: { name: "Tailwind CSS", group: "frontend" },
  zustand: { name: "Zustand", group: "frontend" },
  recharts: { name: "Recharts", group: "frontend" },
  tanstackStart: { name: "TanStack Start", group: "frontend" },
  vite: { name: "Vite", group: "frontend" },
  maplibre: { name: "MapLibre GL", group: "frontend" },
  i18next: { name: "i18next", group: "frontend" },

  // --- backend & data ---
  supabase: { name: "Supabase", group: "backend" },
  postgres: { name: "PostgreSQL", group: "backend" },
  serverActions: { name: "Server Actions", group: "backend" },
  zod: { name: "Zod", group: "backend" },
  fastapi: { name: "FastAPI", group: "backend" },
  puppeteer: { name: "Puppeteer", group: "backend" },
  resend: { name: "Resend", group: "backend" },
  twilio: { name: "Twilio", group: "backend" },
  stripe: { name: "Stripe", group: "backend" },

  // --- mobile ---
  capacitor: { name: "Capacitor", group: "mobile" },
  reactNative: { name: "React Native", group: "mobile" },

  // --- delivery ---
  vercel: { name: "Vercel", group: "delivery" },
  cloudflareWorkers: { name: "Cloudflare Workers", group: "delivery" },
  gitlabCi: { name: "GitLab CI", group: "delivery" },
} satisfies Record<string, { name: string; group: StackGroup }>;

export type StackId = keyof typeof stack;

export const stackIds = Object.keys(stack) as [StackId, ...StackId[]];
