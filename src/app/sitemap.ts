import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://henriquemonteiro.dev";
  const locales = ["pt", "en"];
  const paths = ["", "/labs"];

  const routes = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.8,
    }))
  );

  return routes;
}
