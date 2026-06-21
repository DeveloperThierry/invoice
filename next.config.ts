import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move it out of experimental and put it right here:
  allowedDevOrigins: [
    "3000-firebase-invoicegit-1781854882503.cluster-lrhkgnsygfb7ovnbvdt2fflxme.cloudworkstations.dev","*"
  ],

  /* Your other config options here (if any) */
};

export default nextConfig;
