import type { ProjectInput } from "../schema";
import { mmBags } from "./mm-bags";

/**
 * The project registry. Adding a project is: a folder, its index.ts, its
 * images, and one line here.
 *
 * Order is display order. Ray Lab, the Gold & Jewelry ERP and The Intern are
 * modelled in Phase 5.
 */
export const projectRegistry: ProjectInput[] = [mmBags];
