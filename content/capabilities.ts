import { ar, type Label } from "./types";

/**
 * "What I build" — capability tied to the project that proves it.
 * Each category must name a real shipped product; no category exists here
 * without one.
 */
export type Capability = {
  label: Label;
  body: string;
  /** The project that proves it. */
  proof: string;
};

export const capabilities: Capability[] = [
  {
    label: {
      en: "E-commerce & retail operations",
      ar: ar("تجارة وتشغيل"),
    },
    body: "A storefront and the system that runs the shop behind it — stock, point of sale, suppliers, returns and reporting reading from one source.",
    proof: "mm-bags",
  },
  {
    label: {
      en: "ERP & POS for real-world trade",
      ar: ar("إدارة وتشغيل"),
    },
    body: "Operations software for businesses whose rules are not generic: pricing that changes daily, inventory tracked per physical piece, ledgers that have to reconcile.",
    proof: "gold-jewelry-erp",
  },
  {
    label: {
      en: "Enterprise corporate platforms",
      ar: ar("منصات مؤسسية"),
    },
    body: "Multi-brand platforms that carry several identities and several audiences at once, and still rank — including under infrastructure I do not control.",
    proof: "ray-lab",
  },
  {
    label: {
      en: "AI products across web & mobile",
      ar: ar("منتجات ذكاء اصطناعي"),
    },
    body: "Products whose content is generated, shipped to web and both app stores — where the interesting work is what happens when the model, the network or the store says no.",
    proof: "the-intern",
  },
];
