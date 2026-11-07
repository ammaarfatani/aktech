import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async headers() {
    // Apply to every response, including legacy pages with their own metadata.
    // Never use NODE_ENV here: preview deployments also use production builds.
    return process.env.VERCEL_ENV === "preview"
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }]
      : [];
  },
  async redirects() {
    return [{ source: "/:path*", has: [{ type: "host", value: "www.aktech.tech" }], destination: "https://aktech.tech/:path*", permanent: true }];
  },
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
};

export default nextConfig;
