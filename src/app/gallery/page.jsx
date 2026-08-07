import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryItem } from "@/components/cards";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import GALLERY_ITEMS from "@/data/gallery";

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
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 min-[900px]:grid-cols-3 sm:gap-x-7 sm:gap-y-8">
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryItem
              key={item.id}
              caption={item.caption}
              index={index}
            />
          ))}
        </div>
      </Section>
    </Container>
  );
}