"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Product } from "@/data/products";
import { site } from "@/data/site";
import { useCatalog } from "@/components/catalog/CatalogContext";

const STORAGE_KEY = "madessa-cart-v1";

export type CartLine = { product: Product; qty: number };

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  checkoutUrl: string;
  freeShipThreshold: number;
  remainingForFreeShip: number;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { bySlug } = useCatalog();
  const [items, setItems] = useState<Record<string, number>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => ({ ...prev, [slug]: (prev[slug] ?? 0) + qty }));
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[slug];
      else next[slug] = qty;
      return next;
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[slug];
      return next;
    });
  }, []);

  const lines = useMemo<CartLine[]>(
    () =>
      Object.entries(items)
        .map(([slug, qty]) => {
          const product = bySlug.get(slug);
          return product ? { product, qty } : null;
        })
        .filter(Boolean) as CartLine[],
    [items, bySlug],
  );

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [lines],
  );

  // Shopify cart permalink → hands the whole basket to Shopify's secure checkout.
  const checkoutUrl = useMemo(() => {
    if (!lines.length) return site.shopUrl;
    const parts = lines.map((l) => `${l.product.variantId}:${l.qty}`).join(",");
    return `${site.shopUrl}/cart/${parts}`;
  }, [lines]);

  const threshold = site.offer.freeShipThreshold;
  const remainingForFreeShip = Math.max(0, threshold - subtotal);

  const value: CartState = {
    lines,
    count,
    subtotal,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add,
    setQty,
    remove,
    checkoutUrl,
    freeShipThreshold: threshold,
    remainingForFreeShip,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
