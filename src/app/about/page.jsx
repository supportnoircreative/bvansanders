import { AboutSection } from "@/components/sections/AboutSection";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "About the Artist",
};

export default function AboutPage() {
  return (
    <Container>
      <div className="py-11 pb-16 md:py-[70px] md:pb-24">
        <AboutSection />
      </div>
    </Container>
  );
}