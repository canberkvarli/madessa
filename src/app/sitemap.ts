import type { MetadataRoute } from "next";

const BASE = "https://madessa-ten.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/shipping",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/returns",
  ];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date("2026-06-03"),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
