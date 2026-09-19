"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage } from "@/lib/actions/contact";
import { initialContactState } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-13 items-center justify-center rounded-figure bg-ink px-6 font-medium text-paper transition-colors duration-200 hover:bg-accent disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

const fieldClasses =
  "mt-2 w-full rounded-figure border border-rule-strong bg-paper-raised px-4 py-3 text-body text-ink placeholder:text-ink-3";

export function ContactForm() {
  const [state, action] = useActionState(
    sendContactMessage,
    initialContactState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Clear the form once a message has actually gone through.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  // Stamp the elapsed time at submit. Reading the clock during render is
  // impure and would make the value drift on any re-render.
  function submit(formData: FormData) {
    const elapsed = mountedAt.current ? Date.now() - mountedAt.current : 0;
    formData.set("elapsed", String(elapsed));
    action(formData);
  }

  return (
    <form ref={formRef} action={submit} className="max-w-xl">
      {/* Honeypot: hidden from people, left in the DOM for bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="text-small text-ink-2">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            className={fieldClasses}
          />
          {state.fieldErrors?.name ? (
            <p id="name-error" className="mt-2 text-small text-accent-text">
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-small text-ink-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            className={fieldClasses}
          />
          {state.fieldErrors?.email ? (
            <p id="email-error" className="mt-2 text-small text-accent-text">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="message" className="text-small text-ink-2">
            What are you working on?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            aria-describedby={
              state.fieldErrors?.message ? "message-error" : undefined
            }
            aria-invalid={state.fieldErrors?.message ? true : undefined}
            className={cn(fieldClasses, "resize-y")}
          />
          {state.fieldErrors?.message ? (
            <p id="message-error" className="mt-2 text-small text-accent-text">
              {state.fieldErrors.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <SubmitButton />
          {/* Announced to screen readers as soon as it appears. */}
          <p
            aria-live="polite"
            className={cn(
              "text-small",
              state.status === "error" ? "text-accent-text" : "text-ink-2",
            )}
          >
            {state.message}
          </p>
        </div>
      </div>
    </form>
  );
}
