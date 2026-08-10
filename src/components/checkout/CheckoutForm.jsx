"use client";

import { useState } from "react";
import { Button } from "@/components/buttons";
import { Field } from "@/components/forms/Field";
import { INPUT_CLASSES } from "@/components/forms/fieldClasses";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { OrderService, StripeService } from "@/services";
import { CHECKOUT, ACCOUNT_MESSAGES } from "@/constants/navigation";
import { formatUSD } from "@/utils/format";
import { OrderSummary } from "./OrderSummary";

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

export function CheckoutForm() {
  const { items } = useCart();
  const { showToast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleChange = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const customer = {
        name: values.fullName,
        email: values.email,
        address: values.address,
        city: values.city,
        state: values.state,
        zip: values.zip,
      };
      const order = await OrderService.createOrder({ items, customer, userId: user.uid });
      const session = await StripeService.createCheckoutSession({
        orderId: order.id,
        items,
        customer,
        userId: user.uid,
      });
      window.location.assign(session.url);
    } catch (error) {
      showToast(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
      <div>
        {items.length === 0 ? (
          <div className="rounded-[10px] border border-line bg-surface px-6 py-12 text-center">
            <p className="font-display mb-2 text-2xl uppercase">
              {CHECKOUT.empty}
            </p>
            <p className="mx-auto mb-6 max-w-[34ch] text-sm text-ink-soft">
              {CHECKOUT.emptyNote}
            </p>
            <Button href="/originals">Browse originals</Button>
          </div>
        ) : authLoading ? (
          <div className="h-[60vh]" aria-hidden="true" />
        ) : !user ? (
          <div className="rounded-[10px] border border-line bg-surface px-6 py-12 text-center">
            <p className="font-display mb-2 text-2xl uppercase">
              {ACCOUNT_MESSAGES.loginPrompt}
            </p>
            <p className="mx-auto mb-6 max-w-[38ch] text-sm text-ink-soft">
              {ACCOUNT_MESSAGES.loginPromptNote}
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Button href="/login">Log in or sign up</Button>
              <Button href="/originals" variant="ghost">
                Keep browsing
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} aria-label="Checkout">
            <section className="mb-8">
              <h2 className="font-mono mb-4 text-xs uppercase tracking-[0.15em] text-orange">
                Contact & shipping
              </h2>
              <div className="rounded-[10px] border border-line bg-surface p-5 sm:p-6">
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="checkout-name">
                    <input
                      id="checkout-name"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className={INPUT_CLASSES}
                      value={values.fullName}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="Email" htmlFor="checkout-email">
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className={INPUT_CLASSES}
                      value={values.email}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
                <Field label="Street address" htmlFor="checkout-address">
                  <input
                    id="checkout-address"
                    name="address"
                    type="text"
                    required
                    placeholder="123 Studio Lane"
                    className={INPUT_CLASSES}
                    value={values.address}
                    onChange={handleChange}
                  />
                </Field>
                <div className="grid gap-x-5 sm:grid-cols-3">
                  <Field label="City" htmlFor="checkout-city">
                    <input
                      id="checkout-city"
                      name="city"
                      type="text"
                      required
                      placeholder="Denver"
                      className={INPUT_CLASSES}
                      value={values.city}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="State" htmlFor="checkout-state">
                    <input
                      id="checkout-state"
                      name="state"
                      type="text"
                      required
                      placeholder="CO"
                      className={INPUT_CLASSES}
                      value={values.state}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="ZIP" htmlFor="checkout-zip">
                    <input
                      id="checkout-zip"
                      name="zip"
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder="80201"
                      className={INPUT_CLASSES}
                      value={values.zip}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-mono mb-4 text-xs uppercase tracking-[0.15em] text-orange">
                Payment
              </h2>
              <div className="rounded-[10px] border border-line bg-surface p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-ink-soft">
                  {CHECKOUT.paymentNote}
                </p>
              </div>
            </section>

            <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
              {submitting
                ? "Redirecting to secure payment..."
                : `Pay with card · ${formatUSD(subtotal)}`}
            </Button>
          </form>
        )}
      </div>

      {items.length > 0 && (
        <aside className="self-start lg:sticky lg:top-24">
          <OrderSummary items={items} subtotal={subtotal} />
        </aside>
      )}
    </div>
  );
}

export default CheckoutForm;