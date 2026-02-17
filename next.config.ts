import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],

    qualities: [75, 90, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '**',
      },

      {
        protocol: 'https',
        hostname: 'sessionize.com',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

export default nextConfig;
