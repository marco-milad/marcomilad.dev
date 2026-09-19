import type { StaticImageData } from "next/image";
import { z } from "zod";
import { stackIds } from "./stack";

/**
 * Content contract. Parsed at build time, so a case study cannot ship with a
 * missing alt text, an unsourced metric, or an empty ownership list.
 *
 * Prose is authored as an array of paragraphs rather than Markdown: the case
 * studies are structured, not free-form, and it keeps a Markdown parser out of
 * the dependency list entirely.
 */

export const proseSchema = z
  .array(z.string().min(1))
  .min(1, "write at least one paragraph");

const arTextSchema = z.object({
  text: z.string().min(1),
  register: z.enum(["msa", "egyptian"]),
  decorative: z.boolean(),
});

const labelSchema = z.object({
  en: z.string().min(1),
  ar: arTextSchema.optional(),
});

/** Screenshots come from the asset packs; treatment picks the frame. */
export const imageSchema = z.object({
  src: z.custom<StaticImageData>(
    (value) => typeof value === "object" && value !== null && "src" in value,
    "import the image so Next can read its dimensions",
  ),
  alt: z
    .string()
    .min(12, "alt text must describe what is on screen, not just name it"),
  treatment: z.enum(["browser", "phone", "plate", "document", "crop", "bare"]),
  /** Shown in the browser frame chrome. */
  url: z.string().optional(),
  dir: z.enum(["ltr", "rtl"]).optional(),
  locale: z.enum(["en", "ar", "fr"]).optional(),
  /** Seeded/demo numbers on screen. Rendered as a visible badge. */
  sampleData: z.boolean().default(false),
  caption: z.string().optional(),
});

/**
 * Every number on the site carries how it was measured. A metric without a
 * method does not build.
 */
export const metricSchema = z.object({
  label: z.string().min(1),
  before: z.string().optional(),
  after: z.string().min(1),
  method: z.string().min(8, "say how this was measured"),
  verification: z.enum([
    "measured-production",
    "measured-local",
    "observed",
    "estimated",
  ]),
});

export const decisionStorySchema = z.object({
  title: z.string().min(1),
  tags: z
    .array(
      z.enum([
        "performance",
        "security",
        "data-integrity",
        "rtl",
        "deployment",
        "ai-reliability",
        "ux",
        "product",
      ]),
    )
    .min(1),
  problem: proseSchema,
  rootCause: proseSchema.optional(),
  constraints: z.array(z.string()).optional(),
  options: z
    .array(z.object({ option: z.string(), whyNot: z.string() }))
    .optional(),
  decision: proseSchema,
  implementation: proseSchema,
  result: proseSchema,
  figure: imageSchema.optional(),
});

const base = { title: z.string().min(1).optional() };

/** Sections are optional by omission; the renderer groups them into chapters. */
export const sectionSchema = z.discriminatedUnion("type", [
  z.object({ ...base, type: z.literal("overview"), body: proseSchema }),
  z.object({
    ...base,
    type: z.literal("role"),
    body: proseSchema.optional(),
    ownership: z.object({
      owned: z.array(z.string()).min(1, "list what you personally owned"),
      contributed: z.array(z.string()).optional(),
      team: z.string().optional(),
    }),
  }),
  z.object({ ...base, type: z.literal("challenge"), body: proseSchema }),
  z.object({
    ...base,
    type: z.literal("requirements"),
    body: proseSchema.optional(),
    items: z
      .array(z.object({ requirement: z.string(), decision: z.string() }))
      .min(1),
  }),
  z.object({ ...base, type: z.literal("approach"), body: proseSchema }),
  z.object({
    ...base,
    type: z.literal("ux"),
    body: proseSchema.optional(),
    figures: z.array(imageSchema).min(1),
  }),
  z.object({
    ...base,
    type: z.literal("solution"),
    body: proseSchema,
    figure: imageSchema.optional(),
  }),
  z.object({
    ...base,
    type: z.literal("features"),
    items: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          figure: imageSchema.optional(),
        }),
      )
      .min(1),
  }),
  z.object({
    ...base,
    type: z.literal("architecture"),
    body: proseSchema.optional(),
    layers: z
      .array(
        z.object({
          name: z.string(),
          items: z.array(z.string()).min(1),
          note: z.string().optional(),
        }),
      )
      .min(2),
    figure: imageSchema.optional(),
  }),
  z.object({
    ...base,
    type: z.literal("highlights"),
    items: z.array(z.object({ title: z.string(), body: z.string() })).min(1),
  }),
  z.object({
    ...base,
    type: z.literal("decisions"),
    stories: z.array(decisionStorySchema).min(1),
  }),
  z.object({
    ...base,
    type: z.literal("quality"),
    body: proseSchema.optional(),
    metrics: z.array(metricSchema).optional(),
    security: z.array(z.string()).optional(),
  }),
  z.object({
    ...base,
    type: z.literal("delivery"),
    body: proseSchema,
    figure: imageSchema.optional(),
  }),
  z.object({
    ...base,
    type: z.literal("outcome"),
    body: proseSchema,
    figure: imageSchema.optional(),
  }),
  z.object({ ...base, type: z.literal("lessons"), body: proseSchema }),
  z.object({
    ...base,
    type: z.literal("gallery"),
    figures: z.array(imageSchema).min(1),
  }),
  z.object({
    ...base,
    type: z.literal("glossary"),
    body: proseSchema.optional(),
    terms: z
      .array(
        z.object({
          ar: z.string().min(1),
          translit: z.string().optional(),
          en: z.string().min(1),
          meaning: z.string().min(1),
        }),
      )
      .min(1),
  }),
  z.object({
    ...base,
    type: z.literal("mirror"),
    body: proseSchema.optional(),
    ltr: imageSchema,
    rtl: imageSchema,
    notes: z.array(z.string()).optional(),
  }),
  z.object({
    ...base,
    type: z.literal("rtlNote"),
    body: proseSchema,
  }),
]);

export type Section = z.infer<typeof sectionSchema>;
export type SectionType = Section["type"];

/** Which verb-chain chapter each section belongs to. Authors never set this. */
export const SECTION_CHAPTER: Record<
  SectionType,
  "intro" | "understand" | "structure" | "engineer" | "ship" | "improve"
> = {
  overview: "intro",
  role: "intro",
  challenge: "understand",
  requirements: "understand",
  approach: "structure",
  ux: "structure",
  glossary: "structure",
  solution: "engineer",
  features: "engineer",
  architecture: "engineer",
  highlights: "engineer",
  decisions: "engineer",
  rtlNote: "engineer",
  mirror: "engineer",
  quality: "ship",
  delivery: "ship",
  outcome: "improve",
  lessons: "improve",
  gallery: "improve",
};

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    /** One line under the title, e.g. "Production e-commerce & retail ops". */
    positioning: z.string().min(1),
    /** Card + meta description source. */
    summary: z.string().min(40),
    category: labelSchema,
    year: z.string().min(4),
    duration: z.string().optional(),
    status: z.enum(["production", "delivered", "in-progress"]),
    role: z.string().min(1),
    platforms: z.array(z.enum(["web", "admin", "ios", "android"])).min(1),
    languages: z.array(z.enum(["en", "ar", "fr"])).min(1),
    stack: z.array(z.enum(stackIds)).min(1),
    links: z
      .object({
        live: z.string().url().optional(),
        note: z.string().optional(),
      })
      .optional(),
    confidentiality: z.enum(["public", "anonymized", "limited"]),
    depth: z.enum(["case-study", "brief"]),
    featured: z.boolean(),
    order: z.number().int(),
    cover: imageSchema,
    seo: z.object({
      title: z.string().min(1),
      description: z.string().min(50).max(160),
    }),
    sections: z.array(sectionSchema).min(1),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .superRefine((project, ctx) => {
    if (project.depth !== "case-study") return;

    const types = new Set(project.sections.map((section) => section.type));
    for (const required of ["overview", "role", "challenge", "decisions"]) {
      if (!types.has(required as SectionType)) {
        ctx.addIssue({
          code: "custom",
          message: `case study "${project.slug}" is missing a required "${required}" section`,
        });
      }
    }
  });

export type Project = z.infer<typeof projectSchema>;
export type ProjectInput = z.input<typeof projectSchema>;
export type ImageAsset = z.infer<typeof imageSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type DecisionStory = z.infer<typeof decisionStorySchema>;
