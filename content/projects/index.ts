import type { ProjectInput } from "../schema";
import { goldErp } from "./gold-erp";
import { mmBags } from "./mm-bags";
import { ojosStudio } from "./ojos-studio";
import { rayLab } from "./ray-lab";
import { theIntern } from "./the-intern";

/**
 * The project registry. Adding a project is: a folder, its index.ts, its
 * images, and one line here.
 *
 * Order is display order. Copy that counts projects is derived from this
 * array, so adding one here updates the pages rather than going stale.
 */
export const projectRegistry: ProjectInput[] = [
  mmBags,
  goldErp,
  rayLab,
  theIntern,
  ojosStudio,
];

