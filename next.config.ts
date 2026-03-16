import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// GitHub Pages (project pages) are hosted under: https://<user>.github.io/<repo>/
// To make assets + routes work there, we use basePath and assetPrefix.
// Locally, keep BASE_PATH empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function nextConfig(phase: string): NextConfig {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Only enable static export for production builds.
    // In `next dev`, `output: "export"` can cause missing-manifest errors.
    ...(isDevServer ? {} : { output: "export" }),
    // Needed for static export on GitHub Pages (Next/Image optimization requires a server).
    images: { unoptimized: true },
    basePath,
    assetPrefix: basePath,
    trailingSlash: true,
  };
}
