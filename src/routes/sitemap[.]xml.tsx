import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://envirobiotics.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/how-it-works", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions", changefreq: "monthly", priority: "0.8" },
  { path: "/shop", changefreq: "weekly", priority: "0.9" },
  { path: "/hvac", changefreq: "monthly", priority: "0.8" },
  { path: "/hvac-applications", changefreq: "monthly", priority: "0.7" },
  { path: "/safety", changefreq: "monthly", priority: "0.8" },
  { path: "/education", changefreq: "weekly", priority: "0.8" },
  { path: "/probiotic-air-purification", changefreq: "monthly", priority: "0.8" },
  { path: "/probiotic-vs-chemical", changefreq: "monthly", priority: "0.7" },
  { path: "/competitive-exclusion", changefreq: "monthly", priority: "0.7" },
  { path: "/fda-gras-status", changefreq: "monthly", priority: "0.7" },
  { path: "/indoor-microbiome", changefreq: "monthly", priority: "0.7" },
  { path: "/hygiene-hypothesis", changefreq: "monthly", priority: "0.6" },
  { path: "/mold-and-allergens", changefreq: "monthly", priority: "0.7" },
  { path: "/mold-indoors", changefreq: "monthly", priority: "0.7" },
  { path: "/pet-dander", changefreq: "monthly", priority: "0.7" },
  { path: "/dust-mite-allergens", changefreq: "monthly", priority: "0.7" },
  { path: "/health-benefits", changefreq: "monthly", priority: "0.7" },
  { path: "/research", changefreq: "monthly", priority: "0.7" },
  { path: "/glossary", changefreq: "monthly", priority: "0.5" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/videos", changefreq: "monthly", priority: "0.6" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.7" },
  { path: "/proof-and-trust", changefreq: "monthly", priority: "0.7" },
  { path: "/product-use-cases", changefreq: "monthly", priority: "0.6" },
  { path: "/compare/hepa", changefreq: "monthly", priority: "0.6" },
  { path: "/compare/uvc", changefreq: "monthly", priority: "0.6" },
  { path: "/compare/chemical-fresheners", changefreq: "monthly", priority: "0.6" },
  { path: "/compare/bio-healing", changefreq: "monthly", priority: "0.6" },
  { path: "/dorm", changefreq: "monthly", priority: "0.5" },
  { path: "/nursery", changefreq: "monthly", priority: "0.5" },
  { path: "/support", changefreq: "monthly", priority: "0.5" },
  { path: "/warranty-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ENTRIES.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
