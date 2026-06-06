import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  async headers() {
    return [
      {
        source: "/:all*(webp|png|jpg|jpeg|svg|ico|woff2|woff|ttf|js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
