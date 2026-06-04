"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { useT } from "@/components/i18n/LocaleContext";
import { useCatalog } from "@/components/catalog/CatalogContext";

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
  const { bySlug } = useCatalog();
  const [justAdded, setJustAdded] = useState(false);
  const labelText = label ?? t("cart.add");
  const addedText = added ?? t("cart.added");

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const image = bySlug.get(slug)?.image;
        if (image) {
          window.dispatchEvent(
            new CustomEvent("madessa:flytobag", {
              detail: { image, x: r.left + r.width / 2, y: r.top + r.height / 2 },
            }),
          );
        }
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
