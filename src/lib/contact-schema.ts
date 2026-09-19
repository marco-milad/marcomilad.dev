import { z } from "zod";

/**
 * Shared between the server action and the client form.
 *
 * Kept in its own module on purpose: a "use server" file may only export async
 * functions, so types and schemas cannot live beside the action.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please give me a name to reply to."),
  email: z.email("That email address does not look right."),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps me give you a useful answer."),
  /** Honeypot: must stay empty. Hidden from people, tempting to bots. */
  company: z.string().max(0).optional(),
  /** Milliseconds the form was on screen before submitting. */
  elapsed: z.coerce.number().optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialContactState: ContactState = { status: "idle" };
