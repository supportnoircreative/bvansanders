import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/loaders/Skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="pt-14 md:pt-[70px]">
        <SectionHeader title="Loading..." note="Bringing pieces out of the studio." />
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 min-[900px]:grid-cols-3 sm:gap-x-7 sm:gap-y-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="aspect-4/5 w-full" />
              <Skeleton className="mt-3 h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/2" />
              <Skeleton className="mt-4 h-8 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}