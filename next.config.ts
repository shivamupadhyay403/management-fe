import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
    experimental: {
    optimizePackageImports: [
      '@hugeicons/react',
      '@tanstack/react-query',
    ],
  },
};

export default nextConfig;