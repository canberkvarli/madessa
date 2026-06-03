import type { Product } from "@/data/products";
import { mapFeed, type ShopifyProduct } from "@/lib/catalog-shared";

// Official Shopify Storefront API sync. Reliable from any server (no IP block,
// no throttling). Activates automatically when these env vars are present:
//   NEXT_PUBLIC_SHOPIFY_DOMAIN          e.g. madessa.myshopify.com
//   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN  (public Storefront API access token)
const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2024-10";

export const storefrontConfigured = Boolean(DOMAIN && TOKEN);

const QUERY = `
  query AllProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          handle
          title
          descriptionHtml
          productType
          tags
          featuredImage { url }
          images(first: 1) { edges { node { url } } }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                price { amount }
                compareAtPrice { amount }
              }
            }
          }
        }
      }
    }
  }
`;

type GqlNode = {
  handle: string;
  title: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  featuredImage: { url: string } | null;
  images: { edges: { node: { url: string } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        availableForSale: boolean;
        price: { amount: string };
        compareAtPrice: { amount: string } | null;
      };
    }[];
  };
};

const numericId = (gid: string) => gid.split("/").pop() ?? gid;

function toShopifyShape(node: GqlNode): ShopifyProduct {
  const v = node.variants.edges[0]?.node;
  const img = node.featuredImage?.url ?? node.images.edges[0]?.node.url ?? "";
  return {
    id: 0,
    title: node.title,
    handle: node.handle,
    body_html: node.descriptionHtml,
    product_type: node.productType,
    tags: node.tags,
    images: img ? [{ src: img }] : [],
    variants: v
      ? [
          {
            id: Number(numericId(v.id)),
            price: v.price.amount,
            compare_at_price: v.compareAtPrice?.amount ?? null,
            available: v.availableForSale,
          },
        ]
      : [],
  };
}

export async function getStorefrontProducts(): Promise<Product[] | null> {
  if (!storefrontConfigured) return null;
  try {
    const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN as string,
      },
      body: JSON.stringify({ query: QUERY, variables: { first: 100 } }),
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error(`storefront ${res.status}`);
    const json = (await res.json()) as {
      data?: { products?: { edges: { node: GqlNode }[] } };
    };
    const edges = json.data?.products?.edges ?? [];
    if (!edges.length) return null;
    return mapFeed(edges.map((e) => toShopifyShape(e.node)));
  } catch {
    return null;
  }
}
