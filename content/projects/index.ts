import type { ProjectInput } from "../schema";
import { goldErp } from "./gold-erp";
import { mmBags } from "./mm-bags";
import { rayLab } from "./ray-lab";

/**
 * The project registry. Adding a project is: a folder, its index.ts, its
 * images, and one line here.
 *
 * Order is display order. Ray Lab and The Intern follow.
 */
export const projectRegistry: ProjectInput[] = [mmBags, goldErp, rayLab];

