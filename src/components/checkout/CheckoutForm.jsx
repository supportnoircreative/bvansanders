"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/buttons";
import { Field } from "@/components/forms/Field";
import { INPUT_CLASSES } from "@/components/forms/fieldClasses";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { adminService, orderService } from "@/services";
import { CHECKOUT } from "@/constants/navigation";
import { formatUSD } from "@/utils/format";
import { OrderSummary } from "./OrderSummary";

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

export function CheckoutForm() {
  const { items, clearCart } = useCart();
  const { showToast } = useToast();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const handleChange = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const order = await orderService.createOrder({
        items,
        customer: {
          name: values.fullName,
          email: values.email,
          address: values.address,
          city: values.city,
          state: values.state,
          zip: values.zip,
        },
      });
      await adminService.saveOrder({ ...order, items, subtotal, total: subtotal });
      setPlacedOrder(order);
      clearCart();
      showToast(CHECKOUT.success, 2600);
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="mx-auto max-w-[560px] rounded-[10px] border border-line bg-surface px-6 py-12 text-center sm:px-12">
        <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-inked text-bg">
          <Check size={26} strokeWidth={2.5} />
        </span>
        <p className="font-mono mb-2 text-xs uppercase tracking-[0.15em] text-orange">
          Order {placedOrder.id}
        </p>
        <h2 className="font-display mb-4 text-[clamp(26px,4vw,36px)] uppercase leading-none">
          Thank you
        </h2>
        <p className="mb-7 text-sm leading-relaxed text-ink-soft">
          {CHECKOUT.successNote}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href="/">Continue shopping</Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
      </div>
    );
  }

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
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Field label="Name on card" htmlFor="checkout-card-name">
                    <input
                      id="checkout-card-name"
                      name="cardName"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className={INPUT_CLASSES}
                      value={values.cardName}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="Card number" htmlFor="checkout-card-number">
                    <input
                      id="checkout-card-number"
                      name="cardNumber"
                      type="text"
                      required
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="4242 4242 4242 4242"
                      className={INPUT_CLASSES}
                      value={values.cardNumber}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
                <div className="grid gap-x-5 sm:grid-cols-2">
                  <Field label="Expiry" htmlFor="checkout-expiry">
                    <input
                      id="checkout-expiry"
                      name="expiry"
                      type="text"
                      required
                      placeholder="MM / YY"
                      className={INPUT_CLASSES}
                      value={values.expiry}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label="CVC" htmlFor="checkout-cvc">
                    <input
                      id="checkout-cvc"
                      name="cvc"
                      type="text"
                      required
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="123"
                      className={INPUT_CLASSES}
                      value={values.cvc}
                      onChange={handleChange}
                    />
                  </Field>
                </div>
                <p className="text-[11.5px] leading-relaxed text-ink-soft">
                  {CHECKOUT.note}
                </p>
              </div>
            </section>

            <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
              {submitting ? "Placing order..." : `Place order · ${formatUSD(subtotal)}`}
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