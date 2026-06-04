// Central site configuration. Hand this file to Yaren to edit copy, contact info & the offer.
// Product data + Shopify checkout live in products.ts and on Shopify respectively.

export const site = {
  name: "Madessa",
  tagline: "Handmade details. Natural fabrics. Made by a family, for yours.",
  shopUrl: "https://madessa.co",

  // Real contact info from madessa.co. (No public phone yet — add one here when ready.)
  contact: {
    email: "hello@madessa.co",
    location: "Made with love in the Netherlands",
  },

  socials: {
    instagram: "https://instagram.com/madessaco",
    instagramHandle: "@madessaco",
  },

  //  Issue #4: the attract-customers offer. Free shipping is real (Shopify policy: >€50).
  offer: {
    announcements: [
      "✿  Free shipping on orders over €50  ✿",
      "✿  10% off your first order · join the family below  ✿",
      "✿  Handmade in small batches, shipped worldwide  ✿",
    ],
    heroBadge: "Free shipping over €50",
    newsletterPerk: "10% off your first order",
    freeShipThreshold: 50,
  },

  // Hero image: the real 3840px Madessa banner, art-directed so it is never cropped wrong on desktop.
  heroImage:
    "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/9AE826E0-F7F1-4638-9319-5749E2460641.png?v=1778184439&width=3840",

  // Full-bleed lifestyle break image.
  lifestyleImage:
    "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/MD_2228.jpg?width=2400",
};

// Real lifestyle photography for the Instagram / gallery band.
const G = "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/";
export const gallery = [
  `${G}MD_2228.jpg?width=900`,
  `${G}MD_0303.jpg?width=900`,
  `${G}MD_2267.jpg?width=900`,
  `${G}MD_2266.jpg?width=900`,
  `${G}MD_0402_de16e372-a847-4b47-9960-652e02e31775.jpg?width=900`,
  `${G}MD_2122.jpg?width=900`,
  `${G}MD_2153.jpg?width=900`,
  `${G}MD_0329_38343a45-63f8-48d7-b5b9-895df2ec22dc.jpg?width=900`,
  `${G}MD_2067.jpg?width=900`,
  `${G}MD_2084_copy.jpg?width=900`,
  `${G}MD_0878.jpg?width=900`,
  `${G}FullSizeRender_b60c3b0c-68e9-4532-8d0d-da6b6bf94a86.jpg?width=900`,
];

// `key` resolves to a translation in i18n.ts; `label` is the English fallback.
export const nav = [
  { key: "nav.shop", label: "Shop", href: "/#shop" },
  { key: "nav.story", label: "Our Story", href: "/#story" },
  { key: "nav.loved", label: "Loved by", href: "/#community" },
  { key: "nav.contact", label: "Contact", href: "/contact" },
];

// Secondary links used in the footer.
export const helpNav = [
  { key: "nav.about", label: "About", href: "/about" },
  { key: "nav.sustainability", label: "Materials & Care", href: "/sustainability" },
  { key: "nav.journal", label: "Journal", href: "/journal" },
  { key: "nav.shipping", label: "Shipping & Returns", href: "/shipping" },
  { key: "nav.faq", label: "FAQ", href: "/faq" },
  { key: "nav.contact", label: "Contact", href: "/contact" },
];
