/**
 * The verb chain expanded.
 *
 * Every stage cites one real artifact from a case study — the process is
 * evidenced rather than described. If a stage cannot point at something built,
 * it does not belong here.
 */
export type ProcessStage = {
  /** Matches a verbChain key in lexicon.ts. */
  key: "understand" | "structure" | "engineer" | "ship" | "improve";
  body: string;
  artifact: { text: string; project: string };
};

export const processStages: ProcessStage[] = [
  {
    key: "understand",
    body: "Learn the business before the software. What actually makes money here, what breaks, and which constraint is not negotiable.",
    artifact: {
      text: "A gold shop's price changes every morning — so nothing in the system stores a price.",
      project: "gold-jewelry-erp",
    },
  },
  {
    key: "structure",
    body: "Decide the model and the flows on paper. Most of the expensive mistakes are made here, not in the code.",
    artifact: {
      text: "One row per physical piece, and a single field telling two product worlds apart.",
      project: "gold-jewelry-erp",
    },
  },
  {
    key: "engineer",
    body: "Build it, and make the guarantees structural rather than careful — the kind of correctness that does not depend on remembering.",
    artifact: {
      text: "Arabic search normalised on both sides, so the shop stops looking empty when someone spells a word differently.",
      project: "mm-bags",
    },
  },
  {
    key: "ship",
    body: "Get it into production, including when the constraints belong to someone else's infrastructure.",
    artifact: {
      text: "Four deployment shapes under a client's DNS rules, ending with a static build their own hosting serves.",
      project: "ray-lab",
    },
  },
  {
    key: "improve",
    body: "Measure, then fix the cause. An intermittent failure is an argument until someone turns it into a number.",
    artifact: {
      text: "A reproduction varying only worker count: six failures out of eight, against zero out of eight.",
      project: "the-intern",
    },
  },
];
