import { CatalogView } from "@/components/sections/CatalogView";
import { CommissionBanner } from "@/components/sections/CommissionBanner";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Original Paintings",
  description:
    "One-of-a-kind acrylic originals, signed by the artist. Once it's sold, it's gone.",
};

export default function OriginalsPage() {
  return (
    <Container>
      <Section>
        <CatalogView
          kind="original"
          title="Original Paintings"
          note="One-of-a-kind acrylic originals, signed by the artist. Once it's sold, it's gone."
          cta={<CommissionBanner />}
        />
      </Section>
    </Container>
  );
}