/* Seeds the PunjKash register as of 15 Oct 2026. Prices are customer prices in PKR per person. */
import { db, schema } from "./index";
import { sql } from "drizzle-orm";

const { suppliers, hotels, packages, priceTiers } = schema;

type Tiers = { sharing?: number; quad?: number; triple?: number; double?: number };
type Pkg = {
  code: string; sup: string; ref?: string; city: string; iata: string; airline: string;
  out?: string; back?: string; depart: string; ret?: string; days: number; nm: number; nd: number;
  hm: string; hd: string; seats?: number; status?: "open" | "few" | "sold" | "closed";
  priceType?: "gross" | "net" | "face"; markup?: number; tiers: Tiers; transport?: string;
  child?: number; childBed?: string; infant?: number; luggage?: string; note?: string;
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const today = "2026-10-15";

const supplierRows = [
  { codeLetter: "K", name: "Ukasha", defaultPriceType: "gross" as const },
  { codeLetter: "S", name: "UpSky Group of Travels", portalUrl: "https://upsky.pk", website: "https://upsky.pk", defaultPriceType: "gross" as const, contacts: [{ phone: "0300 7075085" }], notes: "Monthly commission built in: Nov 2026 Islamabad ~30,000, Lahore ~20,000 (to confirm)" },
  { codeLetter: "Q", name: "QFC", defaultPriceType: "gross" as const },
  { codeLetter: "M", name: "Meezab Group", defaultPriceType: "net" as const, defaultMarkupPct: "5", notes: "Flyer rates are PunjKash cost from MU11 onward; add 5%, round up to 100" },
  { codeLetter: "N", name: "New World Group of Companies", website: "https://www.nwg.com.pk", defaultPriceType: "gross" as const, contacts: [{ name: "Sohail Nakrawala", phone: "0321-8280726" }, { name: "Muhammad Bilal", phone: "0321-9282929" }, { email: "support@nwg.com.pk" }] },
  { codeLetter: "F", name: "Mavens Fly Travel and Tours", website: "https://www.mavensflytravel.com", defaultPriceType: "face" as const, contacts: [{ phone: "0325-7359610" }] },
  { codeLetter: "I", name: "Ibrar Anjum Travel & Tours", defaultPriceType: "face" as const, contacts: [{ phone: "0304-5244124" }], notes: "Air ticketing" },
  { codeLetter: "B", name: "Nazal Bhutta Group", defaultPriceType: "net" as const },
  { codeLetter: "H", name: "Binham Group", website: "https://www.binhamtravels.pk", defaultPriceType: "gross" as const },
  { codeLetter: "D", name: "Dar Al Maqaam Travel & Tours (Pvt) Ltd", defaultPriceType: "net" as const, defaultMarkupPct: "5", notes: "Custom packages quoted as cost" },
];

const hotelRows: { name: string; city: "makkah" | "madinah"; distanceM?: number; distanceLabel?: string; distanceSource?: string; aliases?: string[] }[] = [
  { name: "Blora Moazan", city: "makkah", distanceM: 350, distanceSource: "UpSky portal UPV244" },
  { name: "Rou Taiba", city: "madinah", distanceM: 200, distanceSource: "UpSky portal UPV244", aliases: ["Rou Taibah"] },
  { name: "Jadda Al Khalil", city: "makkah", distanceM: 1200, distanceSource: "UpSky portal UPV244" },
  { name: "Safeer Sakni 2 x Firdous 4", city: "madinah", distanceM: 700, distanceSource: "UpSky portal UPV244" },
  { name: "Jafria", city: "makkah", distanceM: 600, distanceSource: "UpSky portal UPV244" },
  { name: "Ansar Plus", city: "madinah", distanceM: 600, distanceSource: "UpSky portal UPV244" },
  { name: "Lolo Toheed", city: "makkah", distanceM: 900, distanceSource: "UpSky portal UPV244" },
  { name: "Safeer Sakni 1 x Salam Palace", city: "madinah", distanceM: 500, distanceSource: "UpSky portal UPV244" },
  { name: "Multiqa Ibadat", city: "makkah" },
  { name: "Dar Ajyal", city: "madinah" },
  { name: "Qila Ajyad", city: "makkah", distanceLabel: "Shuttle" },
  { name: "Kinan Madina", city: "madinah", distanceM: 1000, distanceSource: "UpSky flyer 2 Oct 2026" },
  { name: "Mather Al Jewar", city: "makkah" },
  { name: "Rou Khair", city: "madinah" },
  { name: "Mukaram Hijra", city: "makkah" },
  { name: "Abraj Taiba Silver", city: "madinah" },
  { name: "Maidan Al Bait 2", city: "makkah", distanceLabel: "Shuttle (Old Areek)", distanceSource: "Binham flyer 13 Oct 2026" },
  { name: "Maidan Bait Madina", city: "madinah", distanceM: 800, distanceSource: "Binham flyer 13 Oct 2026" },
  { name: "Snood Hotel", city: "makkah", distanceLabel: "Shuttle" },
  { name: "Hala Taibah", city: "madinah", distanceLabel: "Shuttle" },
  { name: "Masarat Masmara", city: "makkah", distanceLabel: "Shuttle" },
  { name: "Abraj Al Diyafah", city: "madinah", distanceLabel: "Shuttle" },
  { name: "Nawarts Shams 3", city: "makkah", distanceM: 350, distanceSource: "Nazal Bhutta rate table" },
  { name: "Rehab Harmony", city: "madinah", distanceM: 150, distanceSource: "Nazal Bhutta rate table" },
  { name: "Bullorah Al Durrah", city: "makkah", distanceLabel: "About 10 min walk", distanceSource: "Verified walking distance, 25 Sep 2026" },
  { name: "Wassam International", city: "madinah", distanceLabel: "About 5 min walk", distanceSource: "Verified walking distance, 25 Sep 2026" },
  { name: "VOCO", city: "makkah", distanceLabel: "Shuttle" },
  { name: "Swiss International", city: "madinah" },
];

const pkgs: Pkg[] = [
  // UpSky 15-day Saudia ISB flyer, 14 Oct 2026 (all 8 built)
  { code: "SU19", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-08", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  { code: "SU20", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-08", days: 15, nm: 8, nd: 6, hm: "Blora Moazan", hd: "Rou Khair", tiers: { sharing: 306900, quad: 311900, triple: 334400, double: 380900 }, status: "open" },
  { code: "SU21", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-14", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  { code: "SU22", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-14", days: 15, nm: 8, nd: 6, hm: "Mukaram Hijra", hd: "Abraj Taiba Silver", tiers: { sharing: 303900, quad: 315900, triple: 340600, double: 390000 }, status: "open" },
  { code: "SU23", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-22", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Taiba", tiers: { sharing: 311300, quad: 320300, triple: 345700, double: 397600 }, status: "open" },
  { code: "SU24", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-22", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  { code: "SU25", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-28", days: 15, nm: 8, nd: 6, hm: "Blora Moazan", hd: "Rou Khair", tiers: { sharing: 306900, quad: 311900, triple: 334400, double: 380900 }, status: "open" },
  { code: "SU26", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-28", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  // Binham 15-day Saudia ISB, Package 1
  { code: "HU1", sup: "H", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-08", ret: "2026-11-22", days: 15, nm: 8, nd: 6, hm: "Maidan Al Bait 2", hd: "Maidan Bait Madina", tiers: { sharing: 256500, quad: 262100, triple: 270200, double: 288000 }, status: "open" },
  { code: "HU2", sup: "H", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-15", ret: "2026-11-29", days: 15, nm: 8, nd: 6, hm: "Maidan Al Bait 2", hd: "Maidan Bait Madina", tiers: { sharing: 256500, quad: 262100, triple: 270200, double: 288000 }, status: "open" },
  { code: "HU3", sup: "H", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-29", ret: "2026-12-13", days: 15, nm: 8, nd: 6, hm: "Maidan Al Bait 2", hd: "Maidan Bait Madina", tiers: { sharing: 256500, quad: 262100, triple: 270200, double: 288000 }, status: "open" },
  // UpSky Multan 21-day Saudia, package 06 across three dates
  { code: "SU16", sup: "S", city: "Multan", iata: "MUX", airline: "Saudia", depart: "2026-10-07", ret: "2026-10-27", days: 21, nm: 12, nd: 8, hm: "Qila Ajyad", hd: "Kinan Madina", tiers: { sharing: 260500, quad: 267800, triple: 277800, double: 300900 }, status: "closed" },
  { code: "SU17", sup: "S", city: "Multan", iata: "MUX", airline: "Saudia", depart: "2026-10-14", ret: "2026-11-03", days: 21, nm: 12, nd: 8, hm: "Qila Ajyad", hd: "Kinan Madina", tiers: { sharing: 260500, quad: 267800, triple: 277800, double: 300900 }, status: "closed" },
  { code: "SU18", sup: "S", city: "Multan", iata: "MUX", airline: "Saudia", depart: "2026-10-21", ret: "2026-11-10", days: 21, nm: 12, nd: 8, hm: "Qila Ajyad", hd: "Kinan Madina", tiers: { sharing: 260500, quad: 267800, triple: 277800, double: 300900 }, status: "open" },
  // UpSky Islamabad 21-day
  { code: "SU10", sup: "S", ref: "UPV273", city: "Islamabad", iata: "ISB", airline: "Airblue", depart: "2026-10-25", ret: "2026-11-14", days: 21, nm: 12, nd: 8, hm: "Multiqa Ibadat", hd: "Safeer Sakni 2 x Firdous 4", seats: 14, tiers: { sharing: 267700, quad: 275600, triple: 290900, double: 323300 }, status: "open" },
  { code: "SU12", sup: "S", ref: "UPV335", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-10-26", ret: "2026-11-15", days: 21, nm: 12, nd: 8, hm: "Multiqa Ibadat", hd: "Dar Ajyal", seats: 30, tiers: { sharing: 274400, quad: 284100, triple: 300200, double: 332700 }, status: "open" },
  // UpSky 5-star LHE
  { code: "SU13", sup: "S", city: "Lahore", iata: "LHE", airline: "Saudia", out: "SV735", back: "SV738", depart: "2026-10-18", ret: "2026-11-01", days: 15, nm: 8, nd: 6, hm: "VOCO", hd: "Swiss International", tiers: { quad: 323700, triple: 350700, double: 404600 }, status: "open" },
  { code: "SU14", sup: "S", city: "Lahore", iata: "LHE", airline: "Saudia", out: "SV735", back: "SV738", depart: "2026-10-25", ret: "2026-11-08", days: 15, nm: 8, nd: 6, hm: "VOCO", hd: "Swiss International", tiers: { quad: 323700, triple: 350700, double: 404600 }, status: "open" },
  // Meezab MU10A, MU11A (net +5%)
  { code: "MU10A", sup: "M", ref: "UG-100507", city: "Lahore", iata: "LHE", airline: "Saudia", depart: "2026-10-25", ret: "2026-11-14", days: 21, nm: 12, nd: 8, hm: "Snood Hotel", hd: "Hala Taibah", tiers: { sharing: 261000, quad: 268500, triple: 280500, double: 304000 }, infant: 68000, child: 193000, childBed: "Adult minus 20,000", status: "open", priceType: "gross" },
  { code: "MU11A", sup: "M", ref: "UG-100528", city: "Karachi", iata: "KHI", airline: "FlyJinnah", out: "9P 600", back: "9P 601", depart: "2026-10-11", ret: "2026-10-31", days: 21, nm: 12, nd: 8, hm: "Snood Hotel", hd: "Hala Taibah", tiers: { sharing: 229500, quad: 236300, triple: 247800, double: 269400 }, infant: 93000, child: 194000, childBed: "Same as adult", status: "closed", priceType: "net", markup: 5 },
  // Mavens Fly FU2-FU5 (face value)
  { code: "FU2", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-07", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215000, quad: 220000, triple: 225000, double: 235000 }, infant: 75000, child: 175000, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  { code: "FU3", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-08", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215000, quad: 220000, triple: 225000, double: 235000 }, infant: 75000, child: 175000, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  { code: "FU4", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-09", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215000, quad: 220000, triple: 225000, double: 235000 }, infant: 75000, child: 175000, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  { code: "FU5", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-11", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215000, quad: 220000, triple: 225000, double: 235000 }, infant: 75000, child: 175000, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  // Nazal Bhutta
  { code: "BU1", sup: "B", ref: "H1", city: "Lahore", iata: "LHE", airline: "Air Sial", depart: "2026-10-18", ret: "2026-11-01", days: 14, nm: 8, nd: 6, hm: "Nawarts Shams 3", hd: "Rehab Harmony", transport: "Private transport", tiers: { quad: 363000 }, status: "open", priceType: "net" },
  { code: "BU2", sup: "B", city: "Lahore", iata: "LHE", airline: "Air Sial", depart: "2026-10-18", ret: "2026-11-01", days: 14, nm: 8, nd: 6, hm: "Bullorah Al Durrah", hd: "Wassam International", transport: "Private transport", tiers: { quad: 325000 }, status: "open", priceType: "net", note: "Route and dates assumed from BU1; cost 302,000 quad" },
];

async function main() {
  await db.execute(sql`truncate price_tiers, packages, hotels, suppliers restart identity cascade`);
  const sups = await db.insert(suppliers).values(supplierRows).returning();
  const supId = Object.fromEntries(sups.map((s) => [s.codeLetter, s.id]));
  const hs = await db.insert(hotels).values(hotelRows).returning();
  const hotelId = (name: string, city: "makkah" | "madinah") => {
    const h = hs.find((x) => x.name === name && x.city === city);
    if (!h) throw new Error("hotel missing " + name);
    return h.id;
  };
  for (const p of pkgs) {
    const title = `${p.days} Days Umrah from ${p.city} · ${p.airline} · ${p.depart.slice(8, 10)} ${new Date(p.depart).toLocaleString("en", { month: "short" })}`;
    const [row] = await db.insert(packages).values({
      code: p.code, supplierId: supId[p.sup], supplierRef: p.ref, product: "U", title,
      slug: slug(`${p.code}-${p.days}-days-umrah-${p.city}-${p.depart}`),
      departureCity: p.city, departureIata: p.iata, airline: p.airline, flightOut: p.out, flightBack: p.back,
      departDate: p.depart, returnDate: p.ret, days: p.days, nightsMakkah: p.nm, nightsMadinah: p.nd,
      hotelMakkahId: hotelId(p.hm, "makkah"), hotelMadinahId: hotelId(p.hd, "madinah"),
      transport: p.transport ?? "Transport",
      inclusions: ["Umrah visa", "Return air ticket", "Makkah hotel", "Madinah hotel", p.transport ?? "Transport", "Ziyarat"],
      luggage: p.luggage, seats: p.seats,
      status: p.depart < today ? "closed" : (p.status ?? "open"),
      priceType: p.priceType ?? "gross", markupPct: String(p.markup ?? 0),
      childWithoutBed: p.child, childWithBedRule: p.childBed, infant: p.infant, sourceNote: p.note,
      publishedAt: new Date(), approvedBy: "seed",
    }).returning();
    const tiers = (Object.entries(p.tiers) as [keyof Tiers, number][]).map(([tier, price]) => ({ packageId: row.id, tier, customerPrice: price }));
    await db.insert(priceTiers).values(tiers);
  }
  console.log(`seeded ${sups.length} suppliers, ${hs.length} hotels, ${pkgs.length} packages`);
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
