import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
      },
      {
        protocol: 'https',
        hostname: "optilux.com.bd",
      },
      {
        protocol: 'https',
        hostname: "i.ibb.co.com",
      },
    ],
  },
};

export default nextConfig;
