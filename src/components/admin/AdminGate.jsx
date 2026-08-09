"use client";

import { useState } from "react";
import { Lock, LogOut } from "lucide-react";
import { Button } from "@/components/buttons";
import { Field } from "@/components/forms/Field";
import { INPUT_CLASSES } from "@/components/forms/fieldClasses";
import { useAuth } from "@/hooks/useAuth";

const INITIAL_VALUES = { email: "", password: "" };

/**
 * Admin access gate. This is UX only — real authorization is enforced by
 * Firestore security rules against the `role` field in users/{uid}.
 */
export function AdminGate() {
  const { user, login, logout } = useAuth();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }));
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(values);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="mx-auto max-w-[420px] rounded-[10px] border border-line bg-surface px-6 py-10 text-center sm:px-10">
        <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-chalk text-inked">
          <Lock size={20} strokeWidth={1.8} />
        </span>
        <h2 className="font-display mb-2 text-[26px] uppercase leading-none">
          No admin access
        </h2>
        <p className="mb-7 text-sm leading-relaxed text-ink-soft">
          You&apos;re signed in as{" "}
          <span className="font-semibold">{user.email}</span>, but this account
          isn&apos;t authorized to manage the studio.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={logout}
        >
          <LogOut size={16} strokeWidth={2} />
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[420px] rounded-[10px] border border-line bg-surface px-6 py-10 text-center sm:px-10">
      <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-chalk text-inked">
        <Lock size={20} strokeWidth={1.8} />
      </span>
      <h2 className="font-display mb-2 text-[26px] uppercase leading-none">
        Admin access
      </h2>
      <p className="mb-7 text-sm text-ink-soft">
        Sign in with the studio account to manage products and orders.
      </p>

      <form onSubmit={handleSubmit} aria-label="Admin sign in" className="text-left">
        <Field label="Email" htmlFor="admin-email">
          <input
            id="admin-email"
            name="email"
            type="email"
            required
            autoFocus
            placeholder="studio@email.com"
            className={INPUT_CLASSES}
            value={values.email}
            onChange={handleChange}
          />
        </Field>
        <Field label="Password" htmlFor="admin-password">
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className={INPUT_CLASSES}
            value={values.password}
            onChange={handleChange}
          />
        </Field>
        {error && (
          <p className="mb-4 text-[12.5px] font-semibold text-orange">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in..." : "Enter studio"}
        </Button>
      </form>
    </div>
  );
}

export default AdminGate;