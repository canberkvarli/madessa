"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "motion/react";
import { useCart } from "./CartContext";

export default function CartButton() {
  const { count, open } = useCart();
  const controls = useAnimationControls();
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) {
      controls.start({
        scale: [1, 1.25, 0.92, 1],
        transition: { duration: 0.45, ease: "easeOut" },
      });
    }
    prev.current = count;
  }, [count, controls]);

  return (
    <motion.button
      id="cart-button"
      animate={controls}
      onClick={open}
      aria-label={`Open bag, ${count} items`}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-paper/50 backdrop-blur transition-colors hover:border-ink/40"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[0.65rem] font-medium text-paper"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
