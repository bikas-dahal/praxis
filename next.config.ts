import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', 
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', 
      },
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com', 
      }
    ]
  }
};

export default nextConfig;
