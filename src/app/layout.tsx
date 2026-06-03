import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/cart/Providers";
import { getCatalog } from "@/lib/shopify";
import { Analytics } from "@vercel/analytics/next";

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
    type: "website",
    siteName: "Madessa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madessa — Made by a family, for yours",
    description:
      "Handmade details. Natural fabrics. Soft, sustainable clothing for little ones and mamas. Free shipping over €50.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { products, categories, deal, live } = await getCatalog();
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${hanken.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Providers
          products={products}
          categories={categories}
          deal={deal}
          live={live}
        >
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
