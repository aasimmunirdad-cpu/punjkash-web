import { db, schema } from "@/db";
import { and, asc, eq, gte, inArray, lte, ne, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

const { packages, priceTiers, hotels, suppliers } = schema;
const hm = alias(hotels, "hm");
const hd = alias(hotels, "hd");

export type Tier = "sharing" | "quad" | "triple" | "double";
export const TIERS: Tier[] = ["sharing", "quad", "triple", "double"];

export type Filters = {
  city?: string; month?: string; days?: string; room?: Tier; distance?: string; budget?: string; sort?: string; airline?: string;
};

export type PackageCard = {
  id: number; code: string; slug: string; title: string; departureCity: string; airline: string | null;
  departDate: string; returnDate: string | null; days: number; nightsMakkah: number | null; nightsMadinah: number | null;
  seats: number | null; status: string; discountBadge: boolean | null; transport: string | null;
  makkah: { name: string; distanceM: number | null; distanceLabel: string | null } | null;
  madinah: { name: string; distanceM: number | null; distanceLabel: string | null } | null;
  tiers: Partial<Record<Tier, number>>;
  fromPrice: number; fromTier: Tier;
};

function tierMap(rows: { tier: Tier; customerPrice: number }[]) {
  const t: Partial<Record<Tier, number>> = {};
  for (const r of rows) t[r.tier] = r.customerPrice;
  return t;
}

export async function listPackages(f: Filters = {}, limit = 60): Promise<PackageCard[]> {
  const today = new Date().toISOString().slice(0, 10);
  const conds = [inArray(packages.status, ["open", "few"]), gte(packages.departDate, today), eq(packages.product, "U")];
  if (f.city) conds.push(eq(packages.departureCity, f.city));
  if (f.airline) conds.push(eq(packages.airline, f.airline));
  if (f.month && /^\d{4}-\d{2}$/.test(f.month)) {
    const [y, m] = f.month.split("-").map(Number);
    const start = `${f.month}-01`;
    const end = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    conds.push(gte(packages.departDate, start), lte(packages.departDate, end));
  }
  if (f.days === "15") conds.push(lte(packages.days, 16));
  else if (f.days === "21") conds.push(and(gte(packages.days, 18), lte(packages.days, 22))!);
  else if (f.days === "28") conds.push(gte(packages.days, 25));

  const rows = await db.select({
    p: packages,
    mName: hm.name, mDist: hm.distanceM, mLabel: hm.distanceLabel,
    dName: hd.name, dDist: hd.distanceM, dLabel: hd.distanceLabel,
  }).from(packages)
    .leftJoin(hm, eq(packages.hotelMakkahId, hm.id))
    .leftJoin(hd, eq(packages.hotelMadinahId, hd.id))
    .where(and(...conds)).orderBy(asc(packages.departDate)).limit(limit);

  if (!rows.length) return [];
  const tiers = await db.select().from(priceTiers).where(inArray(priceTiers.packageId, rows.map((r) => r.p.id)));
  const byPkg = new Map<number, { tier: Tier; customerPrice: number }[]>();
  for (const t of tiers) byPkg.set(t.packageId, [...(byPkg.get(t.packageId) ?? []), { tier: t.tier, customerPrice: t.customerPrice }]);

  let cards: PackageCard[] = rows.map((r) => {
    const tm = tierMap(byPkg.get(r.p.id) ?? []);
    const fromTier = (f.room && tm[f.room] != null ? f.room : TIERS.find((t) => tm[t] != null)) as Tier;
    return {
      id: r.p.id, code: r.p.code, slug: r.p.slug, title: r.p.title, departureCity: r.p.departureCity, airline: r.p.airline,
      departDate: r.p.departDate, returnDate: r.p.returnDate, days: r.p.days, nightsMakkah: r.p.nightsMakkah, nightsMadinah: r.p.nightsMadinah,
      seats: r.p.seats, status: r.p.status, discountBadge: r.p.discountBadge, transport: r.p.transport,
      makkah: r.mName ? { name: r.mName, distanceM: r.mDist, distanceLabel: r.mLabel } : null,
      madinah: r.dName ? { name: r.dName, distanceM: r.dDist, distanceLabel: r.dLabel } : null,
      tiers: tm, fromPrice: tm[fromTier] ?? 0, fromTier,
    };
  });

  if (f.room) cards = cards.filter((c) => c.tiers[f.room!] != null);
  if (f.budget) { const b = Number(f.budget); if (b > 0) cards = cards.filter((c) => c.fromPrice <= b); }
  if (f.distance === "500") cards = cards.filter((c) => (c.makkah?.distanceM ?? 9999) <= 500);
  if (f.distance === "shuttle") cards = cards.filter((c) => /shuttle/i.test(c.makkah?.distanceLabel ?? ""));
  if (f.sort === "price") cards.sort((a, b) => a.fromPrice - b.fromPrice);
  if (f.sort === "distance") cards.sort((a, b) => (a.makkah?.distanceM ?? 9999) - (b.makkah?.distanceM ?? 9999));
  return cards;
}

export async function getPackage(slug: string) {
  const [r] = await db.select({
    p: packages, supplierName: suppliers.name,
    mName: hm.name, mDist: hm.distanceM, mLabel: hm.distanceLabel,
    dName: hd.name, dDist: hd.distanceM, dLabel: hd.distanceLabel,
  }).from(packages)
    .leftJoin(suppliers, eq(packages.supplierId, suppliers.id))
    .leftJoin(hm, eq(packages.hotelMakkahId, hm.id))
    .leftJoin(hd, eq(packages.hotelMadinahId, hd.id))
    .where(and(eq(packages.slug, slug), ne(packages.status, "hidden"), ne(packages.status, "draft")));
  if (!r) return null;
  const tiers = await db.select().from(priceTiers).where(eq(priceTiers.packageId, r.p.id));
  return { ...r, tiers: tierMap(tiers.map((t) => ({ tier: t.tier, customerPrice: t.customerPrice }))) };
}

export async function facets() {
  const today = new Date().toISOString().slice(0, 10);
  const cities = await db.select({ c: packages.departureCity, n: sql<number>`count(*)` }).from(packages)
    .where(and(inArray(packages.status, ["open", "few"]), gte(packages.departDate, today))).groupBy(packages.departureCity).orderBy(asc(packages.departureCity));
  const months = await db.select({ m: sql<string>`to_char(depart_date, 'YYYY-MM')` }).from(packages)
    .where(and(inArray(packages.status, ["open", "few"]), gte(packages.departDate, today))).groupBy(sql`to_char(depart_date, 'YYYY-MM')`).orderBy(sql`to_char(depart_date, 'YYYY-MM')`);
  const airlines = await db.selectDistinct({ a: packages.airline }).from(packages)
    .where(and(inArray(packages.status, ["open", "few"]), gte(packages.departDate, today)));
  return { cities: cities.map((c) => c.c), months: months.map((m) => m.m), airlines: airlines.map((a) => a.a).filter(Boolean) as string[] };
}

export async function allSlugs() {
  return db.select({ slug: packages.slug, updatedAt: packages.updatedAt }).from(packages).where(inArray(packages.status, ["open", "few", "sold"]));
}
