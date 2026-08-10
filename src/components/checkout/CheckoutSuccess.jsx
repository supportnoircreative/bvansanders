"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, TriangleAlert } from "lucide-react";
import { Button } from "@/components/buttons";
import { Spinner } from "@/components/loaders/Spinner";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { OrderService, StripeService } from "@/services";
import { CHECKOUT } from "@/constants/navigation";

const STATUS = {
  VERIFYING: "verifying",
  PAID: "paid",
  ERROR: "error",
};

function ConfirmationCard({ orderId, note }) {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-11 min-[700px]:px-10 md:py-[70px]">
      <div className="mx-auto max-w-[560px] rounded-[10px] border border-line bg-surface px-6 py-12 text-center sm:px-12">
        <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-inked text-bg">
          <Check size={26} strokeWidth={2.5} />
        </span>
        {orderId && (
          <p className="font-mono mb-2 text-xs uppercase tracking-[0.15em] text-orange">
            Order {orderId}
          </p>
        )}
        <h1 className="font-display mb-4 text-[clamp(26px,4vw,36px)] uppercase leading-none">
          Thank you
        </h1>
        <p className="mb-7 text-sm leading-relaxed text-ink-soft">
          {note}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href="/">Continue shopping</Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProblemCard({ title, note }) {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-11 min-[700px]:px-10 md:py-[70px]">
      <div className="mx-auto max-w-[560px] rounded-[10px] border border-line bg-surface px-6 py-12 text-center sm:px-12">
        <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-chalk text-ink-soft">
          <TriangleAlert size={24} strokeWidth={2.25} />
        </span>
        <h1 className="font-display mb-4 text-[clamp(26px,4vw,36px)] uppercase leading-none">
          {title}
        </h1>
        <p className="mb-7 text-sm leading-relaxed text-ink-soft">{note}</p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href="/contact">Contact us</Button>
          <Button href="/" variant="ghost">
            Back to store
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CheckoutSuccess() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState(STATUS.VERIFYING);
  const [orderId, setOrderId] = useState(null);
  const [deferredNote, setDeferredNote] = useState(false);
  const verified = useRef(false);
  const missingSession = !authLoading && !sessionId;

  useEffect(() => {
    if (verified.current || authLoading || !sessionId) return;
    verified.current = true;

    let cancelled = false;
    (async () => {
      try {
        const result = await StripeService.getSessionStatus({ sessionId });
        if (cancelled) return;
        if (!result?.paid) {
          setStatus(STATUS.ERROR);
          return;
        }
        clearCart();
        if (result.orderId && user) {
          try {
            await OrderService.markOrderAsPaid(result.orderId, sessionId);
          } catch {
            setDeferredNote(true);
          }
        } else {
          setDeferredNote(true);
        }
        setOrderId(result.orderId);
        setStatus(STATUS.PAID);
      } catch {
        if (!cancelled) setStatus(STATUS.ERROR);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId, user, authLoading, clearCart]);

  if (missingSession) {
    return (
      <ProblemCard
        title="Missing payment reference"
        note="We couldn't find the payment you returned from. If you completed payment, your order is safe with Stripe — get in touch and we'll sort it out."
      />
    );
  }

  if (status === STATUS.VERIFYING) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Spinner size={28} color="var(--color-inked)" />
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
          Confirming payment…
        </p>
      </div>
    );
  }

  if (status === STATUS.ERROR) {
    return (
      <ProblemCard
        title="Payment pending"
        note="We couldn't confirm your payment just now. If it went through, your order is safe — contact us and we'll verify it right away."
      />
    );
  }

  return (
    <ConfirmationCard
      orderId={orderId}
      note={deferredNote ? CHECKOUT.successPendingNote : CHECKOUT.successNote}
    />
  );
}

export default CheckoutSuccess;