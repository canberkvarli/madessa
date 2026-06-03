"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "madessa-wishlist-v1";

type WishlistState = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const WishlistContext = createContext<WishlistState | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(slugs));
  }, [slugs, hydrated]);

  const value = useMemo<WishlistState>(
    () => ({
      slugs,
      has: (slug) => slugs.includes(slug),
      toggle: (slug) =>
        setSlugs((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev],
        ),
      remove: (slug) => setSlugs((prev) => prev.filter((s) => s !== slug)),
      count: slugs.length,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [slugs, isOpen],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
