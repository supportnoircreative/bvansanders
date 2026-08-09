"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/buttons";
import { Field } from "./Field";
import { INPUT_CLASSES } from "./fieldClasses";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { FORGOT_PASSWORD } from "@/constants/navigation";

export function ForgotPasswordForm() {
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (error) {
      showToast(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full max-w-[420px] rounded-[10px] border border-line bg-surface px-5 py-10 text-center sm:px-10">
        <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-inked text-bg">
          <Check size={20} strokeWidth={2.5} />
        </span>
        <h2 className="font-display mb-3 text-[26px] uppercase leading-none">
          Check your inbox
        </h2>
        <p className="mb-7 text-sm leading-relaxed text-ink-soft">
          {FORGOT_PASSWORD.success}
        </p>
        <Button href="/login" variant="ghost" className="w-full">
          {FORGOT_PASSWORD.back}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] rounded-[10px] border border-line bg-surface px-5 py-8 sm:px-10">
      <p className="font-mono mb-2 text-xs uppercase tracking-[0.15em] text-orange">
        Account
      </p>
      <h2 className="font-display mb-4 text-[28px] uppercase leading-none">
        {FORGOT_PASSWORD.heading}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-ink-soft">
        Enter the email you signed up with and we&apos;ll send you a link to
        choose a new password.
      </p>

      <form onSubmit={handleSubmit} aria-label={FORGOT_PASSWORD.heading}>
        <Field label="Email" htmlFor="forgot-email">
          <input
            id="forgot-email"
            type="email"
            required
            autoFocus
            placeholder="you@email.com"
            className={INPUT_CLASSES}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Sending..." : FORGOT_PASSWORD.submit}
        </Button>
      </form>

      <p className="mt-5 text-center text-[13.5px] text-ink-soft">
        <Link
          href="/login"
          className="font-semibold text-orange hover:underline"
        >
          {FORGOT_PASSWORD.back}
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;