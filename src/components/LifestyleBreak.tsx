"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/data/site";
import { useT } from "./i18n/LocaleContext";
import { BLUR } from "@/lib/blur";

export default function LifestyleBreak() {
  const { t } = useT();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="px-4 py-6 lg:px-6">
      <div
        ref={ref}
        className="relative mx-auto aspect-[4/5] w-full max-w-[1500px] overflow-hidden rounded-[2rem] sm:aspect-[16/10] lg:aspect-[21/9]"
      >
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
          <Image
            src={site.lifestyleImage}
            alt="A little one in a handmade Madessa dress"
            fill
            placeholder="blur"
            blurDataURL={BLUR}
            sizes="100vw"
            className="scale-110 object-cover object-[50%_30%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-7 text-paper sm:flex-row sm:items-end sm:justify-between sm:p-12"
        >
          <h2 className="max-w-xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {t("lifestyle.line")}
          </h2>
          <a
            href="/#shop"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm tracking-wide text-ink transition-all duration-300 hover:bg-clay hover:text-paper"
          >
            {t("lifestyle.cta")} <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
