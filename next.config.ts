import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "gsap",
      "three",
      "@react-three/drei",
      "@react-three/fiber",
    ],
  },
};

export default nextConfig;
