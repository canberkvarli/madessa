// Real product data sourced from madessa.co (Shopify). Prices in EUR.
// Edit here to change what appears on the site; "Shop" links go to the live Shopify product page.
export type Product = {
  slug: string; title: string; category: string;
  price: number; compareAt: number | null; image: string; blurb: string; variantId: string;
  available?: boolean;
};

export const productUrl = (slug: string) => `https://madessa.co/products/${slug}`;

export const products: Product[] = [
  {
    "slug": "the-little-muse-dress-cotton-tulle",
    "variantId": "55772200534390",
    "title": "Little Muse Dress",
    "category": "Dresses",
    "price": 48,
    "compareAt": 95,
    "image": "https://madessa.co/cdn/shop/files/515595139_742684715115649_8159463199544968301_n.jpg?v=1778175433&width=1946",
    "blurb": "Soft cotton bodice, multi-layer tulle skirt. A real, structured bow, never glued."
  },
  {
    "slug": "little-lounge-set-1",
    "variantId": "55772251226486",
    "title": "Little Lounge Set",
    "category": "Sets",
    "price": 54,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/2F4D9AC7-4E24-40AB-A75D-67050EA952A9.jpg?v=1749718485&width=1946",
    "blurb": "The everyday set. Buttery cotton, made for play and naps alike."
  },
  {
    "slug": "playdate-set",
    "variantId": "55772217213302",
    "title": "Playdate Set",
    "category": "Sets",
    "price": 66,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/FullSizeRender_b60c3b0c-68e9-4532-8d0d-da6b6bf94a86.jpg?v=1749717900&width=1946",
    "blurb": "Mix-and-match comfort for busy little days out."
  },
  {
    "slug": "mini-explorer-jumpsuit",
    "variantId": "55745151861110",
    "title": "Mini Explorer Jumpsuit",
    "category": "Baby",
    "price": 72,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/MD_0878.jpg?v=1749227491&width=1946",
    "blurb": "One-piece freedom for crawlers and first-steppers."
  },
  {
    "slug": "little-gentle-set",
    "variantId": "55809083441526",
    "title": "Little Gentle Set",
    "category": "Sets",
    "price": 83,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/MD_0075.jpg?v=1748339585&width=1946",
    "blurb": "Gentle on new skin, our softest knit-and-cotton pairing."
  },
  {
    "slug": "little-stripe-dress",
    "variantId": "55809084031350",
    "title": "Little Stripe Dress",
    "category": "Dresses",
    "price": 72,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/MD_0235.jpg?v=1748339152&width=1946",
    "blurb": "Breezy striped cotton that moves with her. Sizes 1Y-4Y."
  },
  {
    "slug": "argyle-knit-sweater",
    "variantId": "56374593749366",
    "title": "Argyle Knit Sweater",
    "category": "Knitwear",
    "price": 54,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/f5d134c5-a1d6-4ff7-8d89-4cab0696179f.png?v=1769095360&width=500",
    "blurb": "Hand-finished argyle in a heritage knit. Warm without the weight."
  },
  {
    "slug": "baby-white-shirt",
    "variantId": "55867932574070",
    "title": "Baby White Shirt",
    "category": "Baby",
    "price": 19,
    "compareAt": 36,
    "image": "https://madessa.co/cdn/shop/files/whiteshirt.png?v=1769096157&width=500",
    "blurb": "A crisp little staple in pure breathable cotton."
  },
  {
    "slug": "brown-cotton-pants-set",
    "variantId": "56475077443958",
    "title": "Brown Cotton Pants Set",
    "category": "Sets",
    "price": 72,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/brownset.png?v=1769092929&width=500",
    "blurb": "Earthy tones, straight-leg cotton. Cozy from morning to night."
  },
  {
    "slug": "cloud-knit-sweater",
    "variantId": "56375216439670",
    "title": "Cloud Knit Sweater",
    "category": "Knitwear",
    "price": 48,
    "compareAt": null,
    "image": "https://madessa.co/cdn/shop/files/cloudsweater.png?v=1769092823&width=500",
    "blurb": "Like a hug. Airy cloud knit in undyed natural cotton."
  }
];

export const categories = ["Dresses", "Sets", "Knitwear", "Baby"] as const;
