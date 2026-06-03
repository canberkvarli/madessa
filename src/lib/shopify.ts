import { cache } from "react";
import { products as fallbackProducts } from "@/data/products";
import { site } from "@/data/site";
import {
  buildCatalog,
  mapFeed,
  type Catalog,
  type ShopifyProduct,
} from "@/lib/catalog-shared";

export type { Catalog };

// Server-side product sync from Shopify's public feed. Shopify often blocks
// cloud/datacenter IPs (so this returns the fallback on Vercel), but the
// browser-side sync in CatalogContext picks up the full live catalog from the
// visitor's own connection. This server pass keeps SSR/SEO sensible meanwhile.
export const FEED_URL = (page: number) =>
  `${site.shopUrl}/products.json?page=${page}`;
export const PAGE_SIZE = 30;
const MAX_PAGES = 12;
const REVALIDATE_SECONDS = 600;
export const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(page: number, attempts: number): Promise<ShopifyProduct[] | null> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const res = await fetch(FEED_URL(page), {
        headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as { products: ShopifyProduct[] };
      return data.products ?? [];
    } catch {
      if (attempt < attempts - 1) await sleep(300 * (attempt + 1));
    }
  }
  return null;
}

export const getCatalog = cache(async (): Promise<Catalog> => {
  try {
    const all: ShopifyProduct[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const batch = await fetchPage(page, page === 1 ? 3 : 2);
      if (batch === null) break;
      all.push(...batch);
      if (batch.length < PAGE_SIZE) break;
    }
    const mapped = mapFeed(all);
    if (mapped.length < 6) throw new Error(`too few products: ${mapped.length}`);
    return buildCatalog(mapped, true);
  } catch {
    return buildCatalog(fallbackProducts, false);
  }
});
