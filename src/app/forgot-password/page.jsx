import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export const metadata = {
  title: "Reset password",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex justify-center py-11 pb-[110px] md:py-[70px]">
      <ForgotPasswordForm />
    </div>
  );
}