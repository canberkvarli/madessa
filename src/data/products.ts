// Real product data sourced from madessa.co (Shopify). Prices in EUR.
// Edit here to change what appears on the site; "Shop" links go to the live Shopify product page.
export type Product = {
  slug: string; title: string; category: string;
  price: number; compareAt: number | null; image: string; blurb: string; variantId: string;
  available?: boolean; images?: string[];
};

// NOTE: individual product pages on madessa.co are currently 404ing (stale
// handles / possible store-domain change). Until the Storefront API provides
// canonical product URLs, route every product click to the shop's all-products
// page so nothing dead-ends on a 404. Pass-through slug kept for easy restore.
const SHOP = "https://madessa.co";
export const productUrl = (_slug?: string) => `${SHOP}/collections/all`;

export const products: Product[] = [
  {
    "slug": "the-little-muse-dress-cotton-tulle",
    "variantId": "55772200534390",
    "title": "Little Muse Dress",
    "category": "Dresses",
    "price": 48,
    "compareAt": 95,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/515595139_742684715115649_8159463199544968301_n.jpg?v=1778175433&width=1946",
    "blurb": "Soft cotton bodice, multi-layer tulle skirt. A real, structured bow, never glued.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/515595139_742684715115649_8159463199544968301_n.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/FullSizeRender_d6b8f9e3-876f-41ad-9da0-31586859305f.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/websitee.png?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/FullSizeRender_cdfd3335-eb19-4a9e-9e64-3a1cfe0728a8.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/FullSizeRender.jpg?width=900"]
  },
  {
    "slug": "little-lounge-set-1",
    "variantId": "55772251226486",
    "title": "Little Lounge Set",
    "category": "Sets",
    "price": 54,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/2F4D9AC7-4E24-40AB-A75D-67050EA952A9.jpg?v=1749718485&width=1946",
    "blurb": "The everyday set. Buttery cotton, made for play and naps alike.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/2F4D9AC7-4E24-40AB-A75D-67050EA952A9.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/C7F6556B-99A3-42E4-88F8-55E114BBB09A.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/5CD1AA1C-F853-443E-A0E8-28DFF69BDA7C.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/BF0F925A-EE6C-4F36-9DC2-A371129EA276.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/EC756155-1436-43E4-8117-B2682C5E3692.jpg?width=900"]
  },
  {
    "slug": "playdate-set",
    "variantId": "55772217213302",
    "title": "Playdate Set",
    "category": "Sets",
    "price": 66,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/FullSizeRender_b60c3b0c-68e9-4532-8d0d-da6b6bf94a86.jpg?v=1749717900&width=1946",
    "blurb": "Mix-and-match comfort for busy little days out.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/FullSizeRender_b60c3b0c-68e9-4532-8d0d-da6b6bf94a86.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/FullSizeRender_a09ce33c-a721-4af7-89c1-1d28b099c3b3.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/FullSizeRender_ef9f36dd-5fc9-48a8-934e-e7b507959c23.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/IMG-5393.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/729162C9-0470-454E-8263-974200FD40F8.jpg?width=900"]
  },
  {
    "slug": "mini-explorer-jumpsuit",
    "variantId": "55745151861110",
    "title": "Mini Explorer Jumpsuit",
    "category": "Baby",
    "price": 72,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0878.jpg?v=1749227491&width=1946",
    "blurb": "One-piece freedom for crawlers and first-steppers.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0878.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0817.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0920.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0914_bac33ab3-f58a-41ac-aef6-3c4b9782239b.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_2202.jpg?width=900"]
  },
  {
    "slug": "little-gentle-set",
    "variantId": "55809083441526",
    "title": "Little Gentle Set",
    "category": "Sets",
    "price": 83,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0075.jpg?v=1748339585&width=1946",
    "blurb": "Gentle on new skin, our softest knit-and-cotton pairing.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0075.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0091.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0070.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_2204.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_2207.jpg?width=900"]
  },
  {
    "slug": "little-stripe-dress",
    "variantId": "55809084031350",
    "title": "Little Stripe Dress",
    "category": "Dresses",
    "price": 72,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0235.jpg?v=1748339152&width=1946",
    "blurb": "Breezy striped cotton that moves with her. Sizes 1Y-4Y.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0235.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_2210.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0032.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_0329.jpg?width=900"]
  },
  {
    "slug": "argyle-knit-sweater",
    "variantId": "56374593749366",
    "title": "Argyle Knit Sweater",
    "category": "Knitwear",
    "price": 54,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/f5d134c5-a1d6-4ff7-8d89-4cab0696179f.png?v=1769095360&width=500",
    "blurb": "Hand-finished argyle in a heritage knit. Warm without the weight.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/f5d134c5-a1d6-4ff7-8d89-4cab0696179f.png?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Madessa-RB-1I2A5525.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Screenshot2025-12-09at11.20.35.png?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Madessa-RB-1I2A5311.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Madessa-RB-1I2A5472.jpg?width=900"]
  },
  {
    "slug": "baby-white-shirt",
    "variantId": "55867932574070",
    "title": "Baby White Shirt",
    "category": "Baby",
    "price": 19,
    "compareAt": 36,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/whiteshirt.png?v=1769096157&width=500",
    "blurb": "A crisp little staple in pure breathable cotton.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/whiteshirt.png?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/IMG-6615.jpg?width=900"]
  },
  {
    "slug": "brown-cotton-pants-set",
    "variantId": "56475077443958",
    "title": "Brown Cotton Pants Set",
    "category": "Sets",
    "price": 72,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/brownset.png?v=1769092929&width=500",
    "blurb": "Earthy tones, straight-leg cotton. Cozy from morning to night.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/brownset.png?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Madessa-RB-Madessa0245.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Madessa-RB-Madessa0230.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/IMG_2246.heic?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/IMG_2247.heic?width=900"]
  },
  {
    "slug": "cloud-knit-sweater",
    "variantId": "56375216439670",
    "title": "Cloud Knit Sweater",
    "category": "Knitwear",
    "price": 48,
    "compareAt": null,
    "image": "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/cloudsweater.png?v=1769092823&width=500",
    "blurb": "Like a hug. Airy cloud knit in undyed natural cotton.",
    "images": ["https://cdn.shopify.com/s/files/1/0918/7780/2358/files/cloudsweater.png?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Madessa-RB-Madessa0165.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/Madessa-RB-Madessa0106.jpg?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/IMG_1379.heic?width=900","https://cdn.shopify.com/s/files/1/0918/7780/2358/files/IMG_1380.heic?width=900"]
  }
];

export const categories = ["Dresses", "Sets", "Knitwear", "Baby"] as const;
