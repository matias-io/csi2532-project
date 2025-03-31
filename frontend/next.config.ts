import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  WebpackConfigContext: {
    nextRuntime: 'nodejs', // Use Node.js runtime (not Edge runtime globally)
  },
};

export default nextConfig;
