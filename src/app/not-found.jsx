import Link from "next/link";
import { Button } from "@/components/buttons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-start justify-center py-20">
        <Eyebrow>404 — Page not found</Eyebrow>
        <h1 className="font-display mb-6 text-[clamp(40px,6vw,64px)] uppercase leading-[0.96]">
          This page
          <br />
          doesn&apos;t exist.
        </h1>
        <p className="mb-8 max-w-md text-lg leading-relaxed text-ink-soft">
          The page you&apos;re looking for was moved, sold, or never hung on this
          wall. Head back to the studio to keep browsing.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Button href="/">Back to Home</Button>
          <Button href="/gallery" variant="ghost">
            View Gallery
          </Button>
        </div>
      </div>
    </Container>
  );
}