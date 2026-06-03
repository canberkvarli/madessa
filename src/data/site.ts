// Central site configuration — hand this file to Yaren to edit copy, contact info & the offer.
// Product data + Shopify checkout live in products.ts and on Shopify respectively.

export const site = {
  name: "Madessa",
  tagline: "Handmade details. Natural fabrics. Made by a family, for yours.",
  shopUrl: "https://madessa.co",

  // ── Issue #3: contact info shown in the header & footer.
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

  // ── Issue #4: the attract-customers offer. Free shipping is real (Shopify policy: >€50).
  offer: {
    announcements: [
      "✿  Free shipping on orders over €50  ✿",
      "✿  10% off your first order — join the family below  ✿",
      "✿  Handmade in small batches, shipped worldwide  ✿",
    ],
    heroBadge: "Free shipping over €50",
    newsletterPerk: "10% off your first order",
  },

  // Hero image — the real 3840px Madessa banner, art-directed so it is never cropped wrong on desktop.
  heroImage:
    "https://madessa.co/cdn/shop/files/9AE826E0-F7F1-4638-9319-5749E2460641.png?v=1778184439&width=3840",
};

export const nav = [
  { label: "Shop", href: "#shop" },
  { label: "Our Story", href: "#story" },
  { label: "Loved by", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];
