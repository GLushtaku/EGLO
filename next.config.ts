import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./next-intl.config.ts");

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    API_URL: process.env.NEXT_API_URL,
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_API_URL;
    
    // Only add rewrite if NEXT_API_URL is set
    if (!apiUrl) {
      console.warn('⚠️ NEXT_API_URL is not set, skipping API rewrite');
      return [];
    }

    // Ensure the URL doesn't end with a slash
    const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    
    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
