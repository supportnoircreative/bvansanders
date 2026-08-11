import { Eyebrow } from "@/components/ui/Eyebrow";
import { Portrait } from "./Portrait";
import { StatRow } from "@/components/cards/StatRow";
import { ARTIST_BIO, ARTIST_STATS } from "@/data/about";

export function AboutSection() {
  return (
    <div className="grid items-start gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-10 lg:gap-[60px]">
      <div>
        <Portrait />
      </div>
      <div>
        <Eyebrow>About the Artist</Eyebrow>
        <h1 className="font-display mb-6 text-[clamp(30px,4vw,48px)] uppercase leading-[1.02]">
          B. Van Sanders
        </h1>
<div>
          {ARTIST_BIO.map(({ highlight, text }, index) => (
            <p
              key={index}
              className="mb-4 text-base leading-[1.75] text-[#333]"
            >
              {highlight ? <strong>{highlight} </strong> : null}
              {text}
            </p>
          ))}
        </div>
        <StatRow stats={ARTIST_STATS} />
      </div>
    </div>
  );
}

export default AboutSection;