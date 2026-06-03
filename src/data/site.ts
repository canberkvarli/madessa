// Central site configuration. Hand this file to Yaren to edit copy, contact info & the offer.
// Product data + Shopify checkout live in products.ts and on Shopify respectively.

export const site = {
  name: "Madessa",
  tagline: "Handmade details. Natural fabrics. Made by a family, for yours.",
  shopUrl: "https://madessa.co",

  //  Issue #3: contact info shown in the header & footer.
  // TODO(Yaren): confirm the public email / phone. Placeholders below are safe to launch.
  contact: {
    email: "hello@madessa.co",
    phone: "+31 6 12 34 56 78",
    phoneHref: "tel:+31612345678",
    whatsapp: "https://wa.me/31612345678",
    location: "Made with love in the Netherlands",
  },

  socials: {
    instagram: "https://instagram.com/madessa",
    instagramHandle: "@madessa",
    tiktok: "https://www.tiktok.com/@madessa",
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
};

// `key` resolves to a translation in i18n.ts; `label` is the English fallback.
export const nav = [
  { key: "nav.shop", label: "Shop", href: "/#shop" },
  { key: "nav.story", label: "Our Story", href: "/#story" },
  { key: "nav.loved", label: "Loved by", href: "/#reviews" },
  { key: "nav.contact", label: "Contact", href: "/contact" },
];

// Secondary links used in the footer.
export const helpNav = [
  { key: "nav.about", label: "About", href: "/about" },
  { key: "nav.shipping", label: "Shipping & Returns", href: "/shipping" },
  { key: "nav.faq", label: "FAQ", href: "/faq" },
  { key: "nav.contact", label: "Contact", href: "/contact" },
];
