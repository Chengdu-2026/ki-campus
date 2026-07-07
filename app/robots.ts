import type { MetadataRoute } from "next";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Interne/personenbezogene Bereiche nicht indexieren
        disallow: ["/admin", "/company", "/dashboard", "/exam", "/certificates", "/practice", "/settings", "/api/"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
