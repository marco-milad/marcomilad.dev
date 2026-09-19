import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Screenshots are the bulk of this site's payload; AVIF first.
    formats: ["image/avif", "image/webp"],
  },
  // The dev overlay sits on top of the page and lands in checkpoint
  // screenshots. Dev-only setting; production is unaffected.
  devIndicators: false,
};

export default nextConfig;
