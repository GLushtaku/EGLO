import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./next-intl.config.ts");

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    API_URL: process.env.NEXT_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_API_URL}/api/:path*`, // <- use the HTTP port from launchSettings.json
      },
    ];
  },
};

export default withNextIntl(nextConfig);
