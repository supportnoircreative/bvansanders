"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/buttons";
import { Field } from "./Field";
import { INPUT_CLASSES } from "./fieldClasses";
import { contactService } from "@/services";
import { useToast } from "@/hooks/useToast";
import { CONTACT_OPTIONS, CONTACT_SUCCESS_MESSAGE } from "@/constants/navigation";

const INITIAL_VALUES = {
  name: "",
  email: "",
  interest: CONTACT_OPTIONS[0],
  message: "",
  item: "",
  itemSize: "",
};

const INTEREST_BY_KIND = {
  print: "Buying a print",
  original: "Buying an original painting",
  gallery: "Buying an original painting",
};

function initialFromQuery(searchParams) {
  const item = searchParams.get("item") ?? "";
  if (!item) return INITIAL_VALUES;

  const size = searchParams.get("size") ?? "";
  const kind = searchParams.get("kind") ?? "";
  const interest = INTEREST_BY_KIND[kind] ?? INITIAL_VALUES.interest;
  const message = `I'm interested in "${item}"${size ? ` (${size})` : ""}.`;

  return {
    ...INITIAL_VALUES,
    item,
    itemSize: size,
    interest: CONTACT_OPTIONS.includes(interest)
      ? interest
      : INITIAL_VALUES.interest,
    message,
  };
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState(() => initialFromQuery(searchParams));
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const requestedItem = searchParams.get("item") ?? "";
  const [lastRequestedItem, setLastRequestedItem] = useState(requestedItem);
  if (requestedItem !== lastRequestedItem) {
    setLastRequestedItem(requestedItem);
    if (requestedItem) setValues(initialFromQuery(searchParams));
  }

  const handleChange = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await contactService.submit(values);
      showToast(CONTACT_SUCCESS_MESSAGE, 2600);
      setValues(INITIAL_VALUES);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      {values.item && (
        <div className="mb-5 rounded-[8px] border border-dashed border-line bg-chalk px-4 py-3">
          <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
            Piece of interest
          </span>
          <p className="mt-0.5 text-[13.5px] font-bold text-inked">
            &ldquo;{values.item}&rdquo;
            {values.itemSize && (
              <span className="ml-1.5 font-mono text-[12px] font-semibold text-ink-soft">
                — {values.itemSize}
              </span>
            )}
          </p>
        </div>
      )}

      <Field label="Name" htmlFor="contact-name">
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={INPUT_CLASSES}
          value={values.name}
          onChange={handleChange}
        />
      </Field>

      <Field label="Email" htmlFor="contact-email">
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className={INPUT_CLASSES}
          value={values.email}
          onChange={handleChange}
        />
      </Field>

      <Field label="I'm interested in" htmlFor="contact-interest">
        <select
          id="contact-interest"
          name="interest"
          className={INPUT_CLASSES}
          value={values.interest}
          onChange={handleChange}
        >
          {CONTACT_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="Tell us what you're looking for..."
          className={INPUT_CLASSES + " min-h-[110px] resize-y"}
          value={values.message}
          onChange={handleChange}
        />
      </Field>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

export default ContactForm;