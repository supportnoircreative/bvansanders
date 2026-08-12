"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/buttons";
import { Field } from "./Field";
import { INPUT_CLASSES } from "./fieldClasses";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { AUTH_MESSAGES, ACCOUNT_MESSAGES } from "@/constants/navigation";
import { cn } from "@/lib/cn";

const INITIAL_VALUES = { name: "", email: "", password: "", confirm: "" };

function SignOutButton({ onLogout }) {
  return (
    <Button type="button" variant="ghost" className="w-full" onClick={onLogout}>
      <LogOut size={16} strokeWidth={2} />
      {ACCOUNT_MESSAGES.logout}
    </Button>
  );
}

export function AuthForm() {
  const {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";
  const copy = AUTH_MESSAGES[mode];

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setValues(INITIAL_VALUES);
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleChange = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignup && values.password !== values.confirm) {
      showToast("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      if (isSignup) {
        await register(values);
      } else {
        await login(values);
      }
      showToast(copy.success);
      setValues(INITIAL_VALUES);
    } catch (error) {
      showToast(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await loginWithGoogle();
      showToast(copy.success);
    } catch (error) {
      showToast(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="h-[60vh]" aria-hidden="true" />;
  }

  if (user) {
    return (
      <div className="w-full max-w-[420px] rounded-[10px] border border-line bg-surface px-5 py-8 text-center sm:px-10">
        <h2 className="font-display mb-2 text-[26px] uppercase leading-none">
          {ACCOUNT_MESSAGES.signedIn}
        </h2>
        <p className="mb-6 break-all text-sm text-ink-soft">{user.email}</p>
        <SignOutButton onLogout={logout} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] rounded-[10px] border border-line bg-surface px-5 py-7 sm:px-10 sm:py-10">
      <div className="flex gap-1 rounded-full bg-chalk p-1">
        {["login", "signup"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => switchMode(tab)}
            aria-pressed={mode === tab}
            className={cn(
              "flex-1 cursor-pointer rounded-full px-3.5 py-2 text-[12.5px] font-semibold uppercase tracking-wider transition-all duration-150",
              mode === tab
                ? "bg-inked text-bg"
                : "text-ink-soft hover:text-inked"
            )}
          >
            {tab === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>

      <p className="font-mono mb-2 mt-6 text-xs uppercase tracking-[0.15em] text-orange">
        Your account
      </p>
      <h2 className="font-display mb-6 text-[32px] uppercase leading-none">
        {copy.title}
      </h2>

      <form onSubmit={handleSubmit} aria-label={copy.title}>
        {isSignup && (
          <Field label="Name" htmlFor="auth-name">
            <input
              id="auth-name"
              name="name"
              type="text"
              required={isSignup}
              placeholder="Your name"
              className={INPUT_CLASSES}
              value={values.name}
              onChange={handleChange}
            />
          </Field>
        )}

        <Field label="Email" htmlFor="auth-email">
          <input
            id="auth-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={INPUT_CLASSES}
            value={values.email}
            onChange={handleChange}
          />
        </Field>

        <Field label="Password" htmlFor="auth-password">
          <input
            id="auth-password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className={INPUT_CLASSES}
            value={values.password}
            onChange={handleChange}
          />
        </Field>

        {isSignup && (
          <Field label="Confirm Password" htmlFor="auth-confirm">
            <input
              id="auth-confirm"
              name="confirm"
              type="password"
              required={isSignup}
              placeholder="••••••••"
              className={INPUT_CLASSES}
              value={values.confirm}
              onChange={handleChange}
            />
          </Field>
        )}

        {!isSignup && (
          <p className="mb-4 -mt-1 text-right">
            <Link
              href="/forgot-password"
              className="text-[12.5px] font-semibold text-orange hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        )}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Please wait..." : copy.submit}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink-soft">
          or
        </span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        disabled={submitting}
        onClick={handleGoogle}
      >
        Continue with Google
      </Button>

      <p className="mt-4 text-center text-[13.5px] text-ink-soft">
        {isSignup
          ? "Already have an account? "
          : "Don't have an account? "}
        <button
          type="button"
          onClick={() => switchMode(isSignup ? "login" : "signup")}
          className="cursor-pointer bg-transparent p-0 font-semibold text-orange hover:underline"
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;