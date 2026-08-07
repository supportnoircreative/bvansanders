import { Hero } from "@/components/sections/Hero";
import { CatalogView } from "@/components/sections/CatalogView";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container>
        <Section>
          <CatalogView
            title="Recently added"
            note="A few current pieces from the studio: originals and open-edition prints."
          />
        </Section>
      </Container>
    </>
  );
}