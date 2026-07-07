import type { MetadataRoute } from "next";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/schulung", priority: 0.9 },
    { path: "/features", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/faq", priority: 0.8 },
    { path: "/register", priority: 0.7 },
    { path: "/login", priority: 0.3 },
    { path: "/legal-disclaimer", priority: 0.3 },
    { path: "/ki-transparenz", priority: 0.3 },
    { path: "/impressum", priority: 0.2 },
    { path: "/datenschutz", priority: 0.2 },
    { path: "/agb", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${APP_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
