import { CatalogView } from "@/components/sections/CatalogView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Prints",
  description:
    "Museum-quality giclée prints on archival paper, available in limited runs.",
};

export default function PrintsPage() {
  return (
    <Container>
      <Section>
        <CatalogView
          kind="print"
          title="Prints"
          note="Museum-quality giclée prints on archival paper, available in limited runs."
        />
      </Section>
    </Container>
  );
}