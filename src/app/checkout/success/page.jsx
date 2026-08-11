import { Suspense } from "react";
import { CheckoutSuccess } from "@/components/checkout/CheckoutSuccess";

export const metadata = {
  title: "Payment Complete",
  description:
    "Your payment was received — thank you for your order from B. Van Sanders.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="h-[60vh]" aria-hidden="true" />}>
      <CheckoutSuccess />
    </Suspense>
  );
}