import type { MetadataRoute } from "next";
import { allSlugs, facets } from "@/lib/packages";
import { site } from "@/lib/site";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, f] = await Promise.all([allSlugs(), facets()]);
  const fixed = ["", "/umrah", "/hajj", "/flights", "/holidays", "/tours", "/hotels", "/visas", "/offers", "/about", "/contact", "/how-to-book", "/policies"].map((p) => ({ url: site.url + p, lastModified: new Date() }));
  const cities = f.cities.map((c) => ({ url: `${site.url}/umrah?city=${encodeURIComponent(c)}`, lastModified: new Date() }));
  const months = f.months.map((m) => ({ url: `${site.url}/umrah?month=${m}`, lastModified: new Date() }));
  return [...fixed, ...cities, ...months, ...slugs.map((s) => ({ url: `${site.url}/umrah/${s.slug}`, lastModified: s.updatedAt }))];
}
