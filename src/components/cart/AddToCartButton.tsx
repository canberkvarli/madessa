"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  slug: string;
  className?: string;
  label?: string;
  added?: string;
};

export default function AddToCartButton({
  slug,
  className = "",
  label = "Add to bag",
  added = "Added ✓",
}: Props) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(slug);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1200);
      }}
      className={className}
    >
      {justAdded ? added : label}
    </button>
  );
}
