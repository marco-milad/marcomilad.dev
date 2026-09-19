import type { ProjectInput } from "../schema";
import { goldErp } from "./gold-erp";
import { mmBags } from "./mm-bags";
import { rayLab } from "./ray-lab";
import { theIntern } from "./the-intern";

/**
 * The project registry. Adding a project is: a folder, its index.ts, its
 * images, and one line here.
 *
 * Order is display order. All four V1 projects are modelled.
 */
export const projectRegistry: ProjectInput[] = [
  mmBags,
  goldErp,
  rayLab,
  theIntern,
];

