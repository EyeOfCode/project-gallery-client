import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};

export default nextConfig;
