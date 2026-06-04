"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Fly = { id: number; image: string; x: number; y: number };

// Animates a small product thumbnail from the click point into the cart icon.
export default function FlyToBag() {
  const [flights, setFlights] = useState<Fly[]>([]);

  useEffect(() => {
    let n = 0;
    const onFly = (e: Event) => {
      const d = (e as CustomEvent<{ image: string; x: number; y: number }>).detail;
      if (!d?.image) return;
      const id = ++n;
      setFlights((f) => [...f, { id, ...d }]);
      setTimeout(() => setFlights((f) => f.filter((x) => x.id !== id)), 750);
    };
    window.addEventListener("madessa:flytobag", onFly);
    return () => window.removeEventListener("madessa:flytobag", onFly);
  }, []);

  const target = () => {
    const el = document.getElementById("cart-button");
    if (!el) return { x: window.innerWidth - 60, y: 40 };
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[140]">
      <AnimatePresence>
        {flights.map((f) => {
          const t = target();
          return (
            <motion.img
              key={f.id}
              src={f.image}
              alt=""
              initial={{ left: f.x - 32, top: f.y - 32, opacity: 1, scale: 1 }}
              animate={{
                left: t.x - 16,
                top: t.y - 16,
                width: 32,
                height: 32,
                opacity: 0.2,
                scale: 0.4,
              }}
              transition={{ duration: 0.7, ease: [0.5, 0, 0.75, 0] }}
              style={{ position: "fixed", width: 64, height: 64 }}
              className="rounded-full object-cover shadow-lg"
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
