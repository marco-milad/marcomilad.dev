import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Screenshots are the bulk of this site's payload; AVIF first.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
