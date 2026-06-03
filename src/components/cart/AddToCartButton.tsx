"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { useT } from "@/components/i18n/LocaleContext";

type Props = {
  slug: string;
  className?: string;
  label?: string;
  added?: string;
};

export default function AddToCartButton({
  slug,
  className = "",
  label,
  added,
}: Props) {
  const { add } = useCart();
  const { t } = useT();
  const [justAdded, setJustAdded] = useState(false);
  const labelText = label ?? t("cart.add");
  const addedText = added ?? t("cart.added");

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
      {justAdded ? addedText : labelText}
    </button>
  );
}
