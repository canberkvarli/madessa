"use client";

import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";
import { CatalogProvider } from "@/components/catalog/CatalogContext";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";
import WishlistDrawer from "@/components/wishlist/WishlistDrawer";
import SearchCommand from "@/components/SearchCommand";
import SizeGuide from "@/components/SizeGuide";
import QuickView from "@/components/QuickView";
import NewsletterPopup from "@/components/NewsletterPopup";
import { LocaleProvider } from "@/components/i18n/LocaleContext";
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
    <LocaleProvider>
      <CatalogProvider
        products={products}
        categories={categories}
        deal={deal}
        live={live}
      >
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
            <WishlistDrawer />
            <SearchCommand />
            <SizeGuide />
            <QuickView />
            <NewsletterPopup />
          </WishlistProvider>
        </CartProvider>
      </CatalogProvider>
    </LocaleProvider>
  );
}
