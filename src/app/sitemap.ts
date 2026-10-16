import type { MetadataRoute } from "next";
import { allSlugs, facets } from "@/lib/packages";
import { site } from "@/lib/site";
import { holidays, tours } from "@/lib/catalog";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, f] = await Promise.all([allSlugs(), facets()]);
  const fixed = ["", "/umrah", "/hajj", "/flights", "/holidays", "/tours", "/hotels", "/visas", "/offers", "/about", "/contact", "/how-to-book", "/policies"].map((p) => ({ url: site.url + p, lastModified: new Date() }));
  const cities = f.cities.map((c) => ({ url: `${site.url}/umrah?city=${encodeURIComponent(c)}`, lastModified: new Date() }));
  const months = f.months.map((m) => ({ url: `${site.url}/umrah?month=${m}`, lastModified: new Date() }));
  const pages = [...holidays.map((h) => ({ url: `${site.url}/holidays/${h.slug}`, lastModified: new Date() })), ...tours.map((t) => ({ url: `${site.url}/tours/${t.slug}`, lastModified: new Date() }))];
  return [...fixed, ...pages, ...cities, ...months, ...slugs.map((s) => ({ url: `${site.url}/umrah/${s.slug}`, lastModified: s.updatedAt }))];
}
