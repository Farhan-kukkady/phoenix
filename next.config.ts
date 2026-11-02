import type { NextConfig } from "next";
import redirectsData from "./redirects.json";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.digitalsetgo.com",
      },
    ],
  },
  async redirects() {
    return redirectsData as {
      source: string;
      destination: string;
      permanent: boolean;
    }[];
  },
};

export default nextConfig;
