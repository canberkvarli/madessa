"use client";

import { useWishlist } from "./WishlistContext";

export default function HeartButton({ slug }: { slug: string }) {
  const { has, toggle } = useWishlist();
  const active = has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label={active ? "Remove from favourites" : "Save to favourites"}
      aria-pressed={active}
      className="grid h-9 w-9 place-items-center rounded-full bg-paper/85 backdrop-blur transition-all duration-300 hover:scale-110"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4.5 w-4.5 transition-colors ${active ? "fill-clay stroke-clay" : "fill-none stroke-ink/70"}`}
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <path d="M12 20s-7-4.6-9.3-9A5 5 0 0 1 12 6.3 5 5 0 0 1 21.3 11c-2.3 4.4-9.3 9-9.3 9z" />
      </svg>
    </button>
  );
}
