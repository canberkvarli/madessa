import { cache } from "react";
import { products as fallbackProducts } from "@/data/products";
import { buildCatalog, type Catalog } from "@/lib/catalog-shared";
import { getStorefrontProducts, storefrontConfigured } from "@/lib/storefront";

export type { Catalog };

// Catalog source of truth:
//  1. Shopify Storefront API (reliable, clean data) when a token is configured
//     via NEXT_PUBLIC_SHOPIFY_DOMAIN + NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN.
//  2. Otherwise the curated bundled snapshot (src/data/products.ts).
// The public products.json feed is intentionally NOT used — it's blocked from
// cloud IPs, rate-limited, and has returned anomalous prices.
export const getCatalog = cache(async (): Promise<Catalog> => {
  if (storefrontConfigured) {
    const sf = await getStorefrontProducts();
    if (sf && sf.length >= 6) return buildCatalog(sf, true);
  }
  return buildCatalog(fallbackProducts, false);
});
