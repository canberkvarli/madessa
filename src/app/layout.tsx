import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Providers from "@/components/cart/Providers";
import { getCatalog } from "@/lib/shopify";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madessa · Handmade clothing for little ones & mamas",
  description:
    "Handmade details. Natural fabrics. Made by a family, for yours. Soft cotton dresses, knit sets, baby & maternity wear. Free shipping over €50.",
  metadataBase: new URL("https://madessa.co"),
  openGraph: {
    title: "Madessa · Made by a family, for yours",
    description:
      "Handmade details. Natural fabrics. Soft, sustainable clothing for little ones and mamas. Free shipping over €50.",
    images: [site.heroImage],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { products, categories, deal, live } = await getCatalog();
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${hanken.variable} antialiased`}>
        <Providers
          products={products}
          categories={categories}
          deal={deal}
          live={live}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
