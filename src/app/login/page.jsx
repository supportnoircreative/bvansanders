import { AuthForm } from "@/components/forms/AuthForm";

export const metadata = {
  title: "Account",
};

export default function LoginPage() {
  return (
    <div className="flex justify-center py-11 pb-[110px] md:py-[70px]">
      <AuthForm />
    </div>
  );
}