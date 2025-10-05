import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/about",
        "/contact",
        "/login",
        "/register",
        "/forgot-password",
        "/shop",
        "/career",
        "/privacy-policy",
        "/tnc",
        "/refund-policy",
        "/shipping-policy",
        "/products/*",
        "/categories/*",
        "/search",
        "/offers",
        "/faqs",
        "/sitemap.xml",
        "/sitemap-*.xml",
        "/robots.txt",
      ],
      disallow: ["/admin/*", "/profile/*", "/api/*", "/dashboard/*"],
    },
    sitemap: "https://eazika.com/sitemap.xml",
  };
}
