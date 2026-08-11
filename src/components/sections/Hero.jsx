"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/buttons";
import siteConfig from "@/config/site";

const EASE = { duration: 0.6, ease: "easeOut" };

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-11 pt-14 md:px-10 md:pb-[70px] md:pt-[90px]">
      <Image
        src={siteConfig.logo.src}
        alt=""
        aria-hidden="true"
        width={200}
        height={280}
        className="pointer-events-none absolute right-[6%] bottom-0 z-0 h-[130px] w-auto max-w-[40%] opacity-50 sm:h-[170px] sm:top-5 md:h-[240px] md:top-8 lg:h-[340px] lg:top-10"
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={EASE}
          className="font-mono mb-4 text-xs uppercase tracking-[0.15em] text-orange sm:mb-[18px]"
        >
          Acrylic on canvas · by B. Van Sanders
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...EASE, delay: 0.08 }}
          className="font-display max-w-[900px] text-[clamp(38px,7vw,92px)] leading-[0.96] uppercase"
        >
          Pop culture,
          <br />
          reimagined in
          <br />
          <span className="text-orange">bold acrylic.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...EASE, delay: 0.16 }}
          className="mb-8 max-w-[520px] text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-[1.6] md:mb-[34px]"
        >
          B. Van Sanders turns iconic symbols of contemporary media into
          vivid, incisive paintings. Shop originals and prints, or commission
          a piece of your own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...EASE, delay: 0.24 }}
          className="flex flex-wrap gap-3.5"
        >
          <Button href="/originals">Shop Original Paintings</Button>
          <Button href="/gallery" variant="ghost">
            View Gallery
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;