// Pure catalog helpers shared by the server fetch (shopify.ts) and the
// client-side live sync (CatalogContext). No server-only imports here.
import type { Product } from "@/data/products";

export type ShopifyVariant = {
  id: number;
  price: string;
  compare_at_price: string | null;
  available: boolean;
};
export type ShopifyImage = { src: string };
export type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  product_type: string;
  tags: string[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
};

export const CATEGORY_ORDER = [
  "Dresses",
  "Sets",
  "Knitwear",
  "Baby",
  "Maternity",
  "Pieces",
];

const CATEGORY_RULES: [RegExp, string][] = [
  [/maternity|mama|nursing|pregnan/i, "Maternity"],
  [/dress|muse|tulle/i, "Dresses"],
  [/knit|sweater|cardigan|wool|cloud|argyle/i, "Knitwear"],
  [/body|romper|jumpsuit|newborn|\bbaby\b|onesie|bib/i, "Baby"],
  [/set|lounge|playdate|starter|wrap|gentle|pants|vest|top|shirt|blazer/i, "Sets"],
];

function categorize(p: ShopifyProduct): string {
  const hay = `${p.product_type} ${p.tags?.join(" ") ?? ""} ${p.title}`;
  for (const [re, cat] of CATEGORY_RULES) if (re.test(hay)) return cat;
  return "Pieces";
}

function blurbFrom(html: string): string {
  const text = (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  const cut = text.slice(0, 120);
  const end = cut.lastIndexOf(".");
  return (end > 50 ? cut.slice(0, end + 1) : cut).trim();
}

function mapProduct(p: ShopifyProduct): Product | null {
  const v = p.variants?.find((x) => x.available) ?? p.variants?.[0];
  const img = p.images?.[0]?.src;
  if (!v || !img) return null;
  const price = Math.round(parseFloat(v.price));
  const compareRaw = v.compare_at_price ? parseFloat(v.compare_at_price) : 0;
  const compareAt = compareRaw > price ? Math.round(compareRaw) : null;
  return {
    slug: p.handle,
    title: p.title,
    category: categorize(p),
    price,
    compareAt,
    image: img,
    images: (p.images ?? []).map((i) => i.src).slice(0, 5),
    blurb: blurbFrom(p.body_html),
    variantId: String(v.id),
    available: p.variants?.some((x) => x.available) ?? true,
  };
}

export function mapFeed(products: ShopifyProduct[]): Product[] {
  const mapped = products
    .map(mapProduct)
    .filter((p): p is Product => p !== null);
  mapped.sort((a, b) => {
    if (a.available !== b.available) return a.available ? -1 : 1;
    return (
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
    );
  });
  return mapped;
}

export type Catalog = {
  products: Product[];
  categories: string[];
  deal: Product;
  live: boolean;
};

export function buildCatalog(products: Product[], live: boolean): Catalog {
  const categories = CATEGORY_ORDER.filter((c) =>
    products.some((p) => p.category === c),
  );
  const deal =
    [...products]
      .filter((p) => p.compareAt)
      .sort(
        (a, b) =>
          (b.compareAt! - b.price) / b.compareAt! -
          (a.compareAt! - a.price) / a.compareAt!,
      )[0] ?? products[0];
  return { products, categories, deal, live };
}
