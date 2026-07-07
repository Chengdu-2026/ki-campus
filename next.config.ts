import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Native/dynamische Pakete nicht in den Server-Bundle packen
  serverExternalPackages: ["@prisma/adapter-libsql", "@libsql/client", "libsql", "@prisma/client"],
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
