"use client";

import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";
import { CatalogProvider } from "@/components/catalog/CatalogContext";
import SearchCommand from "@/components/SearchCommand";
import type { Product } from "@/data/products";

export default function Providers({
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
  return (
    <CatalogProvider
      products={products}
      categories={categories}
      deal={deal}
      live={live}
    >
      <CartProvider>
        {children}
        <CartDrawer />
        <SearchCommand />
      </CartProvider>
    </CatalogProvider>
  );
}
