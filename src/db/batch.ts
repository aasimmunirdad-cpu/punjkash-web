/* Additive, idempotent import of supplier flyers received 17 Oct 2026. Safe to run on every deploy. Prices are customer prices in PKR per person (face value). */
import { db, schema } from "./index";
import { eq } from "drizzle-orm";

const { suppliers, hotels, packages, priceTiers } = schema;
type T = { sharing?: number; quad?: number; triple?: number; double?: number };
type H = { name: string; m?: number; label?: string };
type P = {
  code: string; sup: string; ref?: string; out?: string; back?: string; airline: string;
  depart: string; ret: string; days: number; nm?: number; nd?: number; hm: H; hd: H; tiers: T;
  transport?: string; infant?: number; child?: number; childBed?: string; note?: string;
};
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const SH = "Shuttle";
const meezab = { sup: "M", airline: "Saudia", infant: 68000, child: 198000, childBed: "Adult price less 20,000", transport: "Transport" };
const mz = (code: string, ref: string, out: string, back: string, depart: string, ret: string, days: number, nm: number, nd: number, hm: H, hd: H, t: number[], note?: string): P =>
  ({ ...meezab, code, ref, out, back, depart, ret, days, nm, nd, hm, hd, tiers: { sharing: t[0], quad: t[1], triple: t[2], double: t[3] }, note: `Meezab flyer revised 16 Oct 2026, ${ref}. Face value.${note ? " " + note : ""}` });
const rh = (code: string, ref: string, out: string, back: string, airline: string, depart: string, ret: string, days: number, hm: H, hd: H, t: number[], nm?: number, nd?: number, note?: string): P =>
  ({ code, sup: "R", ref, out, back, airline, depart, ret, days, nm, nd, hm, hd, tiers: { sharing: t[0], quad: t[1], triple: t[2], double: t[3] }, transport: "Transport", note: `Unnamed flyer filed under Rahimia Group (assumed, confirm). Face value.${note ? " " + note : ""}` });

const Z: H = { name: "Arafat Zahbi / Fakhir Al Azizia", label: SH }, HT: H = { name: "Hala Taibah", label: SH };
const TF: H = { name: "Taj Fiddi Hotel", m: 750 }, DS: H = { name: "Diyar Al Safa", m: 700 };
const RZ: H = { name: "Rukan Al Zawia", m: 750 }, EK: H = { name: "Essa Karim Hotel", m: 600 };
const AZ: H = { name: "Areej Al Zahbi", m: 475 }, BM: H = { name: "Burj Mukhtara", m: 350 };
const SZ: H = { name: "Shams Al Zahbi", m: 375 }, QA: H = { name: "Qila Ajyad", label: SH }, MM: H = { name: "Manazil Marjan", label: SH };
const RA: H = { name: "Rawafed Al Asmiah", label: SH }, MJ: H = { name: "Manazil Al Marjhaan", label: SH };
const AJ: H = { name: "Al Juhani Ajyad / Shabab Delma 2", m: 525 }, AK: H = { name: "Alkeram Aljadid / Alkiram Alfidi", m: 375 };
const SN: H = { name: "Shuqaq Falah Awali / Nozol Falah Awali", m: 550 }, EG: H = { name: "Emaar Al Khair Golden Hotel", m: 800 };

const pkgs: P[] = [
  // Meezab 21 days, 30 Nov
  mz("MU12A", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, Z, HT, [261000, 271000, 282500, 305500], "PNR 92XJ36."),
  mz("MU12B", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, TF, DS, [277500, 284000, 300000, 332000]),
  mz("MU12C", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, RZ, EK, [295000, 304000, 326500, 371500]),
  mz("MU12D", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, AZ, BM, [324500, 338000, 372000, 440000]),
  // Meezab 21 days, 27 Nov
  mz("MU13A", "UG-100542", "SV733", "SV734", "2026-11-27", "2026-12-17", 21, 13, 7, Z, HT, [257500, 267000, 277000, 297500], "PNR 9KHBIB. Makkah nights 8+5."),
  mz("MU13B", "UG-100542", "SV733", "SV734", "2026-11-27", "2026-12-17", 21, 13, 7, QA, MM, [266000, 272000, 284000, 308000]),
  mz("MU13C", "UG-100542", "SV733", "SV734", "2026-11-27", "2026-12-17", 21, 13, 7, RZ, EK, [292000, 301000, 322000, 365000]),
  // Meezab 21 days, 24 Nov (1am departure)
  mz("MU14A", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, Z, HT, [255500, 265000, 274000, 293000], "PNR 934M2Y. Nights as printed (8+5 Makkah, 8 Madinah) add to one more than the dates; confirm."),
  mz("MU14B", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, TF, DS, [273500, 280000, 294500, 323500]),
  mz("MU14C", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, RZ, EK, [292500, 300500, 322000, 365000]),
  mz("MU14D", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, SZ, BM, [335500, 351000, 389500, 466000]),
  // Meezab 21 days, 24 Nov (midday departure)
  mz("MU15A", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, Z, HT, [255000, 264000, 273000, 291000], "PNR 92ZPKF."),
  mz("MU15B", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, TF, DS, [272000, 279000, 293000, 321000]),
  mz("MU15C", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, RZ, EK, [290000, 298000, 318500, 359500]),
  mz("MU15D", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, SZ, BM, [331000, 346000, 383000, 456000]),
  // Meezab 16 days, 22 Nov
  mz("MU16A", "UG-100541", "SV735", "SV734", "2026-11-22", "2026-12-07", 16, 9, 6, Z, HT, [249000, 255000, 261500, 274000], "PNR 7IXMV9. Makkah nights 4+5."),
  mz("MU16B", "UG-100541", "SV735", "SV734", "2026-11-22", "2026-12-07", 16, 9, 6, QA, MM, [254000, 258000, 265000, 279500]),
  mz("MU16C", "UG-100541", "SV735", "SV734", "2026-11-22", "2026-12-07", 16, 9, 6, { name: "Diwan Al Bait", m: 550 }, { name: "Abraj Alam Al Najoom", m: 550 }, [284500, 292000, 310500, 347500]),
  // Rahimia (assumed): PIA flyer 24 Oct, 21 days
  rh("RU1", "PIA PK759/760 pkg 1", "PK 759", "PK 760", "PIA", "2026-10-24", "2026-11-13", 21, RA, MJ, [253999, 257999, 266999, 280999]),
  rh("RU2", "PIA PK759/760 pkg 2", "PK 759", "PK 760", "PIA", "2026-10-24", "2026-11-13", 21, EG, SN, [298999, 313999, 338999, 388999], undefined, undefined, "Hotel distances 800-900 m and 550-750 m per flyer."),
  // Rahimia (assumed): Fly Jinnah 20/21 days
  rh("RU3", "FJ pkg 1", "9P 586", "9P 587", "FlyJinnah", "2026-10-26", "2026-11-14", 20, RA, MJ, [248999, 252999, 259999, 274999], undefined, undefined, "Flyer listed this date twice."),
  rh("RU4", "FJ pkg 2", "9P 586", "9P 587", "FlyJinnah", "2026-10-30", "2026-11-19", 21, { name: "Anwar Al Rayan", m: 1200 }, MJ, [271999, 280999, 295999, 325999]),
  rh("RU5", "FJ pkg 2", "9P 586", "9P 587", "FlyJinnah", "2026-11-02", "2026-11-21", 21, { name: "Anwar Al Rayan", m: 1200 }, MJ, [271999, 280999, 295999, 325999]),
  rh("RU6", "FJ pkg 2", "9P 586", "9P 587", "FlyJinnah", "2026-11-05", "2026-11-24", 21, { name: "Anwar Al Rayan", m: 1200 }, MJ, [271999, 280999, 295999, 325999]),
  rh("RU7", "FJ pkg 3", "9P 586", "9P 587", "FlyJinnah", "2026-11-05", "2026-11-24", 21, AJ, AK, [291999, 305999, 328999, 375999]),
  rh("RU8", "FJ pkg 3", "9P 586", "9P 587", "FlyJinnah", "2026-11-09", "2026-11-28", 21, AJ, AK, [291999, 305999, 328999, 375999]),
  rh("RU9", "FJ pkg 4", "9P 586", "9P 587", "FlyJinnah", "2026-11-06", "2026-11-26", 21, AJ, SN, [289999, 302999, 324999, 369999]),
  rh("RU10", "FJ pkg 4", "9P 586", "9P 587", "FlyJinnah", "2026-11-10", "2026-11-30", 21, AJ, SN, [289999, 302999, 324999, 369999]),
  rh("RU11", "FJ pkg 5", "9P 586", "9P 587", "FlyJinnah", "2026-11-12", "2026-12-01", 21, EG, { name: "Diyar Safa Madina", m: 725 }, [287999, 299999, 321999, 363999]),
  rh("RU12", "FJ pkg 5", "9P 586", "9P 587", "FlyJinnah", "2026-11-16", "2026-12-05", 21, EG, { name: "Diyar Safa Madina", m: 725 }, [287999, 299999, 321999, 363999]),
  rh("RU13", "FJ pkg 6", "9P 586", "9P 587", "FlyJinnah", "2026-10-26", "2026-11-14", 21, { name: "Mather Al Jewar", m: 525 }, { name: "Arjwan Al Madinah / similar Markazia", m: 275 }, [320999, 342999, 377999, 448999]),
  // Rahimia (assumed): Saudia PKG #702
  { ...rh("RU14", "PKG#702", "SV 733", "SV 732", "Saudia", "2026-11-02", "2026-11-16", 15, { name: "VOCO Makkah", label: SH }, { name: "Nusk Medina Hotel" }, [0, 314999, 344999, 389999], 8, 6, "Flyer shows VOCO and Nusk Medina; star ratings not verified."), tiers: { quad: 314999, triple: 344999, double: 389999 } },
];

async function main() {
  let [rahimia] = await db.select().from(suppliers).where(eq(suppliers.codeLetter, "R"));
  if (!rahimia) {
    [rahimia] = await db.insert(suppliers).values({ codeLetter: "R", name: "Rahimia Group", defaultPriceType: "face", notes: "Sahiwal head office; Lahore 0311-1155219 / 0311-1155217; Islamabad 0300-7241418. Hotel + visa per-night rate sheets 05 Oct and 16 Oct 2026 (visa SR 570 / 560 / 510 with private transport, hotel rates per night in SR). Unnamed PIA, FlyJinnah and Saudia VOCO flyers of 17 Oct filed here by assumption." }).returning();
  }
  const sup: Record<string, number> = { R: rahimia.id };
  const [meez] = await db.select().from(suppliers).where(eq(suppliers.codeLetter, "M"));
  sup.M = meez.id;
  const hotelId = async (h: H, city: "makkah" | "madinah") => {
    await db.insert(hotels).values({ name: h.name, city, distanceM: h.m, distanceLabel: h.label, distanceSource: "Supplier flyer 16-17 Oct 2026" }).onConflictDoNothing();
    const rows = await db.select().from(hotels);
    return rows.find((x) => x.name === h.name && x.city === city)!.id;
  };
  let added = 0, updated = 0;
  for (const p of pkgs) {
    const title = `${p.days} Days Umrah from Lahore · ${p.airline} · ${p.depart.slice(8, 10)} ${new Date(p.depart).toLocaleString("en", { month: "short" })}`;
    const values = {
      code: p.code, supplierId: sup[p.sup], supplierRef: p.ref, product: "U" as const, title,
      slug: slug(`${p.code}-${p.days}-days-umrah-lahore-${p.depart}`), departureCity: "Lahore", departureIata: "LHE",
      airline: p.airline, flightOut: p.out, flightBack: p.back, departDate: p.depart, returnDate: p.ret, days: p.days,
      nightsMakkah: p.nm ?? null, nightsMadinah: p.nd ?? null,
      hotelMakkahId: await hotelId(p.hm, "makkah"), hotelMadinahId: await hotelId(p.hd, "madinah"),
      transport: p.transport ?? "Transport",
      inclusions: ["Umrah visa", "Return air ticket", "Makkah hotel", "Madinah hotel", p.transport ?? "Transport", "Ziyarat"],
      status: "open" as const, priceType: "face" as const, markupPct: "0",
      childWithoutBed: p.child, childWithBedRule: p.childBed, infant: p.infant, sourceNote: p.note,
      publishedAt: new Date(), approvedBy: "import-2026-10-17", updatedAt: new Date(),
    };
    const [existing] = await db.select().from(packages).where(eq(packages.code, p.code));
    let id: number;
    if (existing) { await db.update(packages).set(values).where(eq(packages.id, existing.id)); id = existing.id; updated++; }
    else { const [r] = await db.insert(packages).values(values).returning(); id = r.id; added++; }
    await db.delete(priceTiers).where(eq(priceTiers.packageId, id));
    const tiers = (Object.entries(p.tiers) as [keyof T, number][]).filter(([, v]) => v > 0).map(([tier, v]) => ({ packageId: id, tier, customerPrice: v }));
    await db.insert(priceTiers).values(tiers);
  }
  console.log(`batch 2026-10-17: ${added} added, ${updated} updated`);
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
