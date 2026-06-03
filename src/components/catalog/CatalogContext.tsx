"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";
import { site } from "@/data/site";
import {
  buildCatalog,
  mapFeed,
  type Catalog,
  type ShopifyProduct,
} from "@/lib/catalog-shared";

export type CatalogValue = Catalog & {
  bySlug: Map<string, Product>;
};

const CatalogContext = createContext<CatalogValue | null>(null);

const PAGE_SIZE = 30;
const MAX_PAGES = 8;

// Fetch the live catalog straight from the visitor's browser. Shopify allows
// CORS (*) and doesn't block residential IPs, so this gets the full, current
// catalog even when the server-side pass was rate-limited on a cloud IP.
async function fetchLiveCatalog(): Promise<Catalog | null> {
  try {
    const all: ShopifyProduct[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetch(`${site.shopUrl}/products.json?page=${page}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) break;
      const data = (await res.json()) as { products: ShopifyProduct[] };
      const batch = data.products ?? [];
      all.push(...batch);
      if (batch.length < PAGE_SIZE) break;
    }
    const mapped = mapFeed(all);
    if (mapped.length < 6) return null;
    return buildCatalog(mapped, true);
  } catch {
    return null;
  }
}

export function CatalogProvider({
  products,
  categories,
  deal,
  live,
  children,
}: {
  products: Product[];
  categories: string[];
  deal: Product;
  live: boolean;
  children: React.ReactNode;
}) {
  const [catalog, setCatalog] = useState<Catalog>({
    products,
    categories,
    deal,
    live,
  });

  useEffect(() => {
    let cancelled = false;
    fetchLiveCatalog().then((live) => {
      if (live && !cancelled) setCatalog(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<CatalogValue>(
    () => ({
      ...catalog,
      bySlug: new Map(catalog.products.map((p) => [p.slug, p])),
    }),
    [catalog],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
