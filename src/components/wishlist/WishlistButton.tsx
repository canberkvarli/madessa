"use client";

import { AnimatePresence, motion } from "motion/react";
import { useWishlist } from "./WishlistContext";

export default function WishlistButton() {
  const { count, open } = useWishlist();

  return (
    <button
      onClick={open}
      aria-label={`Open favourites, ${count} saved`}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-paper/50 backdrop-blur transition-colors hover:border-ink/40"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M12 20s-7-4.6-9.3-9A5 5 0 0 1 12 6.3 5 5 0 0 1 21.3 11c-2.3 4.4-9.3 9-9.3 9z" strokeLinejoin="round" />
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
    </button>
  );
}
