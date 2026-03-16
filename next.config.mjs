import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function nextConfig(phase) {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    ...(isDevServer ? {} : { output: "export" }),
    images: { unoptimized: true },
    basePath,
    assetPrefix: basePath,
    trailingSlash: true,
  };
}
