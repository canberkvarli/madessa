import { cache } from "react";
import {
  products as fallbackProducts,
  type Product,
} from "@/data/products";
import { site } from "@/data/site";

// Live product sync from Shopify's public products.json. No API token needed.
// Yaren manages everything in her Shopify admin; this keeps the site in step.
// This store 404s on ?limit=, but paginates fine with ?page=N (30 per page).
const FEED = (page: number) => `${site.shopUrl}/products.json?page=${page}`;
const PAGE_SIZE = 30;
const MAX_PAGES = 12; // safety cap (~360 products)
const REVALIDATE_SECONDS = 600; // refresh the catalog every 10 minutes
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

type ShopifyVariant = {
  id: number;
  price: string;
  compare_at_price: string | null;
  available: boolean;
};
type ShopifyImage = { src: string };
type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  product_type: string;
  tags: string[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
};

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

const CATEGORY_ORDER = ["Dresses", "Sets", "Knitwear", "Baby", "Maternity", "Pieces"];

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
    blurb: blurbFrom(p.body_html),
    variantId: String(v.id),
    available: p.variants?.some((x) => x.available) ?? true,
  };
}

export type Catalog = {
  products: Product[];
  categories: string[];
  /** Best current deal: largest percentage off. */
  deal: Product;
  live: boolean;
};

function buildCatalog(products: Product[], live: boolean): Catalog {
  const present = CATEGORY_ORDER.filter((c) =>
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
  return { products, categories: present, deal, live };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// The public feed is rate-limited and intermittently 404s; retry with backoff.
async function fetchPage(page: number, attempts: number): Promise<ShopifyProduct[] | null> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const res = await fetch(FEED(page), {
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
      // Page 1 is critical (it's our whole catalog if later pages flake), so try harder.
      const batch = await fetchPage(page, page === 1 ? 5 : 2);
      if (batch === null) break; // page failed; keep whatever we already have
      all.push(...batch);
      if (batch.length < PAGE_SIZE) break; // last page reached
    }
    const mapped = all
      .map(mapProduct)
      .filter((p): p is Product => p !== null);
    // Only fall back if we couldn't get a usable catalog at all.
    if (mapped.length < 6) throw new Error(`too few products: ${mapped.length}`);
    console.log(`[shopify] live catalog: ${mapped.length} products`);
    // Sort: in-stock first, then by category order, sale items lifted within.
    mapped.sort((a, b) => {
      if (a.available !== b.available) return a.available ? -1 : 1;
      return (
        CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
      );
    });
    return buildCatalog(mapped, true);
  } catch (err) {
    // Never break the page: fall back to the bundled snapshot.
    console.error("[shopify] feed failed, using fallback:", String(err));
    return buildCatalog(fallbackProducts, false);
  }
});
