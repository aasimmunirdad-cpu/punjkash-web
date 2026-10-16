import { db, schema } from "@/db";
import { and, desc, eq, sql } from "drizzle-orm";
import { getPackageByCode } from "./packages";
import { holidays, tours, visas, hotelOffers, flightRoutes } from "./catalog";
import { fmtDate } from "./site";

const { bookings } = schema;

export type Quote = {
  product: string; itemCode: string; title: string; sub: string; img: string; packageId?: number; room?: string;
  unit: number; unitLabel: string; childPrice?: number; infantPrice?: number; depositRule: "umrah" | "quarter" | "full";
  travelDate?: string; details: Record<string, string>; pagePath: string; onRequest?: boolean;
};

export const DEPOSIT_UMRAH = 50000;

export function priceQuote(q: Quote, adults: number, children: number, infants: number) {
  const total = q.unit * adults + (q.childPrice ?? Math.round(q.unit * 0.75)) * children + (q.infantPrice ?? Math.round(q.unit * 0.2)) * infants;
  const persons = adults + children;
  let deposit = q.depositRule === "umrah" ? DEPOSIT_UMRAH * persons : q.depositRule === "full" ? total : Math.round(total * 0.25);
  if (deposit > total) deposit = total;
  deposit = Math.ceil(deposit / 100) * 100;
  return { total, deposit, balance: total - deposit };
}

/** Build a quote from URL params: pkg=CODE&room=quad, or item=HOL-slug|TOUR-slug|HTL-name|VISA-country|FLT-a-b-airline with price */
export async function resolveQuote(sp: Record<string, string | undefined>): Promise<Quote | null> {
  if (sp.pkg) {
    const pk = await getPackageByCode(sp.pkg);
    if (!pk) return null;
    const tiers = pk.tiers; const room = sp.room && tiers[sp.room as keyof typeof tiers] ? sp.room : (Object.keys(tiers)[0] ?? "quad");
    const unit = tiers[room as keyof typeof tiers] ?? 0;
    return { product: "U", itemCode: pk.p.code, title: `${pk.p.days} days Umrah from ${pk.p.departureCity}`, sub: `${pk.mName} · ${pk.dName} · departs ${fmtDate(pk.p.departDate)}`, img: "/img/makkah-800.webp", packageId: pk.p.id, room, unit, unitLabel: `${room} room, per person`, childPrice: pk.p.childWithoutBed ?? undefined, infantPrice: pk.p.infant ?? undefined, depositRule: "umrah", travelDate: pk.p.departDate, details: { airline: pk.p.airline ?? "", makkah: pk.mName ?? "", madinah: pk.dName ?? "" }, pagePath: `/umrah/${pk.p.slug}` };
  }
  const item = sp.item ?? ""; const price = Number(sp.price ?? 0) || 0;
  if (item.startsWith("HOL-")) { const h = holidays.find((x) => x.slug === item.slice(4)); if (!h) return null; return { product: "H", itemCode: item, title: h.title, sub: `${h.city}, ${h.nights} nights, ${h.hotel}`, img: "/img/dubai-800.webp", unit: h.from, unitLabel: "per person, twin sharing", depositRule: "quarter", details: { country: h.country }, pagePath: `/holidays/${h.slug}` }; }
  if (item.startsWith("TOUR-")) { const t = tours.find((x) => x.slug === item.slice(5)); if (!t) return null; return { product: "T", itemCode: item, title: t.title, sub: `${t.region}, ${t.days} days, ${t.type.toLowerCase()} tour`, img: "/img/hunza-800.webp", unit: t.from, unitLabel: "per person", depositRule: "quarter", details: {}, pagePath: `/tours/${t.slug}` }; }
  if (item.startsWith("HTL-")) { const name = decodeURIComponent(item.slice(4)); const h = hotelOffers.find((x) => x.name === name); return { product: "HT", itemCode: item, title: h ? h.name : `Hotel in ${name}`, sub: h ? `${h.city}, ${h.distance}, ${h.type}` : "We confirm the property within the day", img: "/img/madinah-800.webp", unit: price, unitLabel: `per room, ${sp.in && sp.out ? `${sp.in} to ${sp.out}` : "stay"}`, childPrice: 0, infantPrice: 0, depositRule: "quarter", travelDate: sp.in, details: { checkIn: sp.in ?? "", checkOut: sp.out ?? "", rooms: sp.rooms ?? "1" }, pagePath: "/hotels", onRequest: !h || !price }; }
  if (item.startsWith("VISA-")) { const c = decodeURIComponent(item.slice(5)); const v = visas.find((x) => x.country === c); return { product: "V", itemCode: item, title: `${c} visa`, sub: v ? `${v.type}, ${v.days}` : "Checklist sent within the day", img: "/img/london-800.webp", unit: price, unitLabel: "per applicant, embassy and service fee", childPrice: price, infantPrice: price, depositRule: "full", details: {}, pagePath: "/visas", onRequest: !v }; }
  if (item.startsWith("FLT-")) { const [, a, b, air] = item.split("-"); const r = flightRoutes.find((x) => x.fromIata === a && x.toIata === b && x.airline === decodeURIComponent(air ?? "")); return { product: "A", itemCode: item, title: r ? `${r.from} to ${r.to} return` : `Flight ${a} to ${b}`, sub: r ? `${r.airline}, ${r.stops}, ${r.cabin}${sp.depart ? `, ${sp.depart}` : ""}${sp.return ? ` to ${sp.return}` : ""}` : "Fare confirmed within the day", img: "/img/dubai-800.webp", unit: price, unitLabel: "per adult, return, taxes included", childPrice: Math.round(price * 0.75), infantPrice: Math.round(price * 0.1), depositRule: "quarter", travelDate: sp.depart, details: { depart: sp.depart ?? "", return: sp.return ?? "" }, pagePath: "/flights", onRequest: !r }; }
  return null;
}

export async function nextRef(product: string) {
  const d = new Date(); const ym = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}`;
  const prefix = `PK-${product[0]}${ym}-`;
  const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(bookings).where(sql`${bookings.ref} like ${prefix + "%"}`);
  return `${prefix}${String(1000 + n + 1).slice(1)}`;
}

export async function getBooking(ref: string, phone?: string) {
  const r = ref.trim().toUpperCase();
  const [b] = await db.select().from(bookings).where(phone ? and(eq(bookings.ref, r), sql`regexp_replace(${bookings.phone}, '[^0-9]', '', 'g') like ${"%" + phone.replace(/\D/g, "").slice(-9)}`) : eq(bookings.ref, r));
  return b ?? null;
}

export async function bookingsByPhone(phone: string) {
  const tail = phone.replace(/\D/g, "").slice(-9);
  if (tail.length < 9) return [];
  return db.select().from(bookings).where(sql`regexp_replace(${bookings.phone}, '[^0-9]', '', 'g') like ${"%" + tail}`).orderBy(desc(bookings.createdAt));
}

export const BANK = { bank: "Company bank account", title: "PunjKash Travel & Tourism (Private) Limited", iban: "Shown on your confirmation once the company account opens; until then use JazzCash or Easypaisa below", jazzcash: "0300 9395444", easypaisa: "0324 4948850" };
