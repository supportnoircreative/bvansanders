import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export const metadata = {
  title: "Reset password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex justify-center py-11 pb-[110px] md:py-[70px]">
      <ForgotPasswordForm />
    </div>
  );
}