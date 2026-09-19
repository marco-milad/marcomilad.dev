"use server";

import { Resend } from "resend";
import { site } from "@content/site";
import {
  contactSchema,
  type ContactState,
} from "@/lib/contact-schema";

/**
 * Contact form handler.
 *
 * This file may only export async functions — the schema and types live in
 * contact-schema.ts for that reason.
 *
 * Spam handling is deliberately low-tech: a honeypot field plus a minimum
 * time-on-page. No captcha, no third-party script on the page.
 */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
    elapsed: formData.get("elapsed") ?? 0,
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "message") {
        fieldErrors[field] ??= issue.message;
      }
      // A filled honeypot is a bot: accept silently rather than explain.
      if (field === "company") {
        return { status: "success", message: "Thanks — message received." };
      }
    }
    return {
      status: "error",
      message: "Please check the fields below.",
      fieldErrors,
    };
  }

  const { name, email, message, elapsed } = parsed.data;

  // Nobody reads and writes a real message in under three seconds.
  if (typeof elapsed === "number" && elapsed > 0 && elapsed < 3000) {
    return { status: "success", message: "Thanks — message received." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      status: "error",
      message: `The form is not connected yet — please email me directly at ${site.email}.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: site.email,
      replyTo: email,
      subject: `Portfolio enquiry — ${name}`,
      text: [
        `From: ${name} <${email}>`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      return {
        status: "error",
        message: `That did not send. Please email me at ${site.email}.`,
      };
    }

    return {
      status: "success",
      message: "Thanks — that reached me. I usually reply within a day or two.",
    };
  } catch {
    return {
      status: "error",
      message: `That did not send. Please email me at ${site.email}.`,
    };
  }
}
