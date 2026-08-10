import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryView } from "@/components/sections/GalleryView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Gallery",
  description:
    "A look through the studio: process shots, finished works, and installations.",
};

export default function GalleryPage() {
  return (
    <Container>
      <Section>
        <SectionHeader
          title="Gallery"
          note="A look through the studio: process shots, finished works, and installations."
        />
        <GalleryView />
      </Section>
    </Container>
  );
}