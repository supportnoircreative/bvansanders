import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Contact",
  description:
    "Buy originals and prints, or commission a custom piece from B. Van Sanders.",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-11 pb-[70px] md:py-[70px] md:pb-28">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="font-display mb-6 text-[36px] uppercase leading-none">
          Contact
        </h2>

        <div className="grid gap-10 md:grid-cols-2 md:gap-[60px]">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </Container>
  );
}