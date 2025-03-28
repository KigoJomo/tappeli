import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: '*static.wixstatic.com',
        pathname: '/**/*',
      },
    ]
  }
};

export default nextConfig;
