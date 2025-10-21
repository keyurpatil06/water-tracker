import type { NextConfig } from "next";
// @ts-ignore
import withPWA from "next-pwa"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // other Next.js config options
};

// Wrap with PWA
export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public", // service worker location
    register: true, // auto register service worker
    skipWaiting: true, // activate new SW immediately
  },
});
