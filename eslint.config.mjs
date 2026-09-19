import nextConfig from "eslint-config-next";

// eslint-config-next ships flat config; normalize to an array either way.
const next = Array.isArray(nextConfig) ? nextConfig : [nextConfig];

const config = [
  ...next,
  {
    ignores: [".next/**", "out/**", "node_modules/**", "Portfolio-assets/**"],
  },
];

export default config;
