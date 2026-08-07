import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout",
  description:
    "Secure prototype checkout for prints and original paintings from B. Van Sanders.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-11 min-[700px]:px-10 md:py-[70px]">
      <p className="font-mono mb-3 text-xs uppercase tracking-[0.15em] text-orange">
        Secure ordering
      </p>
      <h1 className="font-display mb-9 text-[clamp(30px,4.5vw,44px)] uppercase leading-none md:mb-12">
        Checkout
      </h1>
      <CheckoutForm />
    </div>
  );
}