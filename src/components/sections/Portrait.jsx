import Image from "next/image";
import siteConfig from "@/config/site";

export function Portrait({ caption = "B. Van Sanders" }) {
  return (
    <figure className="relative m-0 flex aspect-4/5 items-end overflow-hidden rounded-md border border-line">
      <Image
        src={siteConfig.portrait.src}
        alt={siteConfig.portrait.alt}
        fill
        sizes="(max-width: 860px) 100vw, 42vw"
        priority
        className="object-cover"
      />
      <figcaption className="font-display absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent px-5 pb-4 pt-8 text-[18px] uppercase tracking-[0.03em] text-inked">
        {caption}
      </figcaption>
    </figure>
  );
}

export default Portrait;