import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://henriquemonteiro.dev";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
