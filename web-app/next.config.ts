import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true, // Ensures relative paths
  images: {
    unoptimized: true, // Ensures images work in static mode
  },
};

export default nextConfig;
