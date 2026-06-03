import Image from "next/image";
import Reveal from "./Reveal";
import { products } from "@/data/products";

export default function Story() {
  return (
    <section id="story" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* image cluster */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-[2.5rem] rounded-bl-[6rem] shadow-2xl ring-1 ring-ink/10">
            <Image
              src={products[4].image}
              alt="Handmade Madessa pieces"
              fill
              sizes="(max-width: 1024px) 70vw, 360px"
              className="object-cover"
            />
          </div>
          <div className="animate-float absolute -bottom-6 right-0 aspect-square w-[46%] overflow-hidden rounded-[2rem] shadow-xl ring-4 ring-paper">
            <Image
              src={products[1].image}
              alt="A little Madessa set"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          <span className="absolute left-2 top-4 font-display text-7xl text-clay/20">
            ✿
          </span>
        </Reveal>

        {/* copy */}
        <Reveal delay={0.1}>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
            Our story
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            It started with a dress
            <br />
            and a little muse
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              “When I was little I had this birthday dress. Purple, with bows.
              I never forgot how it made me feel.” Madessa began in a home, with
              a family who wanted to make pieces that hold that same kind of
              memory.
            </p>
            <p>
              Today we still cut, stitch and finish in small batches. Soft
              cotton so she can move freely. Voluminous tulle that survives the
              spins. Real, structured bows. Made by a family, for yours.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: "100%", l: "natural fabrics" },
              { v: "Small", l: "batch & handmade" },
              { v: "1-2 days", l: "shipping in NL" },
            ].map((s) => (
              <div key={s.l} className="border-l border-ink/15 pl-4">
                <p className="font-display text-2xl">{s.v}</p>
                <p className="text-xs text-ink-soft">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
