// Issue #6: customer reviews. Brand-voice placeholders. Replace with real quotes anytime.
export type Review = {
  quote: string;
  name: string;
  detail: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    quote:
      "The Little Muse Dress is the softest thing my daughter owns. The bow is real and structured, not glued-on satin like everything else out there. She refuses to take it off.",
    name: "Sofia M.",
    detail: "Amsterdam · Little Muse Dress",
    rating: 5,
  },
  {
    quote:
      "You can feel the care in every stitch. Natural fabrics, gentle on his skin, and it survived a hundred washes still looking new.",
    name: "Elif K.",
    detail: "Rotterdam · Little Lounge Set",
    rating: 5,
  },
  {
    quote:
      "Finally a small family brand that does it right. Real people, real quality, and the packaging felt like a gift. This is our go-to for baby showers now.",
    name: "Hannah V.",
    detail: "Berlin · The Madessa Starter Set",
    rating: 5,
  },
  {
    quote:
      "Ordered the knit cardigan and it arrived in two days. The colour is even prettier in person. You can tell it's made by hand, with love.",
    name: "Marie L.",
    detail: "Antwerp · Cloud Knit Sweater",
    rating: 5,
  },
  {
    quote:
      "Bought a set for my newborn and another as a gift. Both mums were obsessed. Sustainable, beautiful, and it lasts. Exactly what I want for my little one.",
    name: "Aylin D.",
    detail: "Utrecht · Little Gentle Set",
    rating: 5,
  },
];

export const stats = [
  { value: "5,000+", label: "little ones dressed" },
  { value: "4.9/5", label: "average rating" },
  { value: "100%", label: "natural fabrics" },
  { value: "1-2 days", label: "shipping in NL" },
];
