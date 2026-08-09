import Link from "next/link";
import { User } from "lucide-react";

export function AccountButton() {
  return (
    <Link
      href="/login"
      aria-label="Account"
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-inked transition-all duration-150 hover:border-inked hover:bg-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange lg:size-9"
    >
      <User className="size-[22px] lg:size-[18px]" strokeWidth={1.8} />
    </Link>
  );
}

export default AccountButton;