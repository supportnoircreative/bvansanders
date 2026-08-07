"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/buttons";
import { Field } from "@/components/forms/Field";
import { INPUT_CLASSES } from "@/components/forms/fieldClasses";
import { notifyAdminAuthChange } from "@/hooks/useAdminAuth";
import { ADMIN_PASSCODE, ADMIN_SESSION_KEY } from "@/constants/admin";

export function AdminGate() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      notifyAdminAuthChange();
    } else {
      setError(true);
    }
  };

  return (
    <div className="mx-auto max-w-[420px] rounded-[10px] border border-line bg-surface px-6 py-10 text-center sm:px-10">
      <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-chalk text-inked">
        <Lock size={20} strokeWidth={1.8} />
      </span>
      <h2 className="font-display mb-2 text-[26px] uppercase leading-none">
        Admin access
      </h2>
      <p className="mb-7 text-sm text-ink-soft">
        Enter the studio passcode to manage products and orders.
      </p>

      <form onSubmit={handleSubmit} aria-label="Admin sign in">
        <Field label="Passcode" htmlFor="admin-passcode">
          <input
            id="admin-passcode"
            type="password"
            required
            autoFocus
            placeholder="••••••••"
            className={INPUT_CLASSES}
            value={passcode}
            onChange={(event) => {
              setPasscode(event.target.value);
              setError(false);
            }}
          />
        </Field>
        {error && (
          <p className="mb-4 text-[12.5px] font-semibold text-orange">
            Incorrect passcode — try again.
          </p>
        )}
        <Button type="submit" className="w-full">
          Enter studio
        </Button>
      </form>
    </div>
  );
}

export default AdminGate;