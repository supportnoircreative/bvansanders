import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-11 min-[700px]:px-10 md:py-[70px]">
      <p className="font-mono mb-3 text-xs uppercase tracking-[0.15em] text-orange">
        Studio console
      </p>
      <h1 className="font-display mb-9 text-[clamp(30px,4.5vw,44px)] uppercase leading-none md:mb-12">
        Admin
      </h1>
      <AdminPanel />
    </div>
  );
}