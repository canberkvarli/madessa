"use client";

import { createContext, useContext, useMemo } from "react";
import type { Product } from "@/data/products";

export type CatalogValue = {
  products: Product[];
  categories: string[];
  deal: Product;
  live: boolean;
  bySlug: Map<string, Product>;
};

const CatalogContext = createContext<CatalogValue | null>(null);

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
  const value = useMemo<CatalogValue>(
    () => ({
      products,
      categories,
      deal,
      live,
      bySlug: new Map(products.map((p) => [p.slug, p])),
    }),
    [products, categories, deal, live],
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
