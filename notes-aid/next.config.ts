import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
};


const withPWA = require('next-pwa')({
  dest: 'public', // Output directory for service worker
  register: true, // Automatically register service worker
  skipWaiting: true, // Activate service worker immediately
  scope: '/app',
  sw: 'service-worker.js',
  disable: process.env.NODE_ENV === 'development', // Disable in development mode
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
});

export default nextConfig;
