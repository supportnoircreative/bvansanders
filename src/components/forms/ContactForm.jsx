"use client";

import { useState } from "react";
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
};

export function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

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