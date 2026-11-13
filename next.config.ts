import type { NextConfig } from "next";

/**
 * Static export configuration for GitHub Pages deployment.
 *
 * `output: 'export'` tells Next.js to generate a fully static site
 * (HTML + CSS + JS) into the `out/` directory at build time. No server,
 * no API routes, no database — perfect for GitHub Pages.
 *
 * The dev server (`bun run dev`) is unaffected by this setting — it
 * still runs in dynamic mode for local development.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Next.js Image optimization requires a server — disable for static export
  images: { unoptimized: true },
  // GitHub Pages serves files at paths like /about/ (with trailing slash)
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  // Allow dev-mode cross-origin requests from the sandbox preview + future domains
  allowedDevOrigins: [
    "preview-chat-1189ebaf-3a8f-4c5d-8711-0e3789291638.space-z.ai",
    "santubiswas.github.io",
    "santubiswas.bd",
  ],
};

export default nextConfig;
