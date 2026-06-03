import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "madessa.co", pathname: "/cdn/shop/**" },
    ],
  },
};

export default nextConfig;
