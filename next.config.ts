import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
      ignoreDuringBuilds: true
  },
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
        hostname: 'cdn.pixabay.com', 
      },
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com', 
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', 
      }
    ]
  }
};

export default nextConfig;
