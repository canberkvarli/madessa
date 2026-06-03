import Image from "next/image";
import { type Product, productUrl } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAt != null;
  const off = onSale
    ? Math.round((1 - product.price / (product.compareAt as number)) * 100)
    : 0;

  return (
    <a
      href={productUrl(product.slug)}
      target="_blank"
      rel="noopener"
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-paper">
            −{off}%
          </span>
        )}
        <span className="absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-paper/95 py-2.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink opacity-0 backdrop-blur transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          View on shop →
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft/70">
            {product.category}
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
      </div>
    </a>
  );
}
