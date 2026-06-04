"use client";

import Image from "next/image";
import { type Product } from "@/data/products";
import AddToCartButton from "./cart/AddToCartButton";
import HeartButton from "./wishlist/HeartButton";
import { useT } from "./i18n/LocaleContext";
import { BLUR } from "@/lib/blur";

function openQuickView(slug: string) {
  window.dispatchEvent(new CustomEvent("madessa:quickview", { detail: slug }));
}

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useT();
  const onSale = product.compareAt != null;
  const off = onSale
    ? Math.round((1 - product.price / (product.compareAt as number)) * 100)
    : 0;
  const altImage = product.images?.find((i) => i !== product.image);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5">
        <button
          onClick={() => openQuickView(product.slug)}
          className="absolute inset-0 cursor-pointer"
          aria-label={`Quick view ${product.title}`}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            placeholder="blur"
            blurDataURL={BLUR}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
          {altImage ? (
            <Image
              src={altImage}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
              className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          ) : (
            <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105" />
          )}
        </button>
        {onSale && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-ink">
            −{off}%
          </span>
        )}
        <div className="absolute right-3 top-3">
          <HeartButton slug={product.slug} />
        </div>
        <AddToCartButton
          slug={product.slug}
          className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-paper/95 py-2.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink opacity-0 backdrop-blur transition-all duration-300 ease-out hover:bg-ink hover:text-paper group-hover:translate-y-0 group-hover:opacity-100"
        />
      </div>
      <button
        onClick={() => openQuickView(product.slug)}
        className="mt-3 flex w-full items-baseline justify-between gap-2 text-left"
      >
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft/70">
            {t(`cat.${product.category}`)}
          </p>
          <h3 className="font-display text-lg leading-tight">{product.title}</h3>
        </div>
        <p className="shrink-0 font-display text-lg">
          €{product.price}
          {onSale && (
            <span className="ml-1 text-sm text-ink/35 line-through">
              €{product.compareAt}
            </span>
          )}
        </p>
      </button>
    </div>
  );
}
