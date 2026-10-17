"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/db/index.ts
var import_postgres_js = require("drizzle-orm/postgres-js");
var import_postgres = __toESM(require("postgres"));

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  bookingStatus: () => bookingStatus,
  bookings: () => bookings,
  cityName: () => cityName,
  hotels: () => hotels,
  leadStatus: () => leadStatus,
  leads: () => leads,
  packageStatus: () => packageStatus,
  packages: () => packages,
  payMethod: () => payMethod,
  priceTiers: () => priceTiers,
  priceType: () => priceType,
  productType: () => productType,
  suppliers: () => suppliers,
  tierName: () => tierName
});
var import_pg_core = require("drizzle-orm/pg-core");
var priceType = (0, import_pg_core.pgEnum)("price_type", ["gross", "net", "face"]);
var productType = (0, import_pg_core.pgEnum)("product_type", ["U", "H", "T", "V", "A"]);
var packageStatus = (0, import_pg_core.pgEnum)("package_status", ["draft", "open", "few", "sold", "closed", "hidden"]);
var tierName = (0, import_pg_core.pgEnum)("tier_name", ["sharing", "quad", "triple", "double"]);
var leadStatus = (0, import_pg_core.pgEnum)("lead_status", ["new", "contacted", "quoted", "deposit", "booked", "lost"]);
var cityName = (0, import_pg_core.pgEnum)("city_name", ["makkah", "madinah"]);
var suppliers = (0, import_pg_core.pgTable)("suppliers", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  codeLetter: (0, import_pg_core.text)("code_letter").notNull().unique(),
  name: (0, import_pg_core.text)("name").notNull(),
  portalUrl: (0, import_pg_core.text)("portal_url"),
  website: (0, import_pg_core.text)("website"),
  contacts: (0, import_pg_core.jsonb)("contacts").$type().default([]),
  defaultPriceType: priceType("default_price_type").notNull().default("gross"),
  defaultMarkupPct: (0, import_pg_core.numeric)("default_markup_pct", { precision: 5, scale: 2 }).default("0"),
  notes: (0, import_pg_core.text)("notes"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var hotels = (0, import_pg_core.pgTable)("hotels", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  name: (0, import_pg_core.text)("name").notNull(),
  city: cityName("city").notNull(),
  distanceM: (0, import_pg_core.integer)("distance_m"),
  distanceLabel: (0, import_pg_core.text)("distance_label"),
  distanceSource: (0, import_pg_core.text)("distance_source"),
  aliases: (0, import_pg_core.jsonb)("aliases").$type().default([]),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
}, (t) => [(0, import_pg_core.uniqueIndex)("hotels_name_city").on(t.name, t.city)]);
var packages = (0, import_pg_core.pgTable)("packages", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  code: (0, import_pg_core.text)("code").notNull().unique(),
  supplierId: (0, import_pg_core.integer)("supplier_id").references(() => suppliers.id).notNull(),
  supplierRef: (0, import_pg_core.text)("supplier_ref"),
  product: productType("product").notNull(),
  title: (0, import_pg_core.text)("title").notNull(),
  slug: (0, import_pg_core.text)("slug").notNull().unique(),
  departureCity: (0, import_pg_core.text)("departure_city").notNull(),
  departureIata: (0, import_pg_core.text)("departure_iata"),
  airline: (0, import_pg_core.text)("airline"),
  flightOut: (0, import_pg_core.text)("flight_out"),
  flightBack: (0, import_pg_core.text)("flight_back"),
  departDate: (0, import_pg_core.date)("depart_date").notNull(),
  returnDate: (0, import_pg_core.date)("return_date"),
  days: (0, import_pg_core.integer)("days").notNull(),
  nightsMakkah: (0, import_pg_core.integer)("nights_makkah"),
  nightsMadinah: (0, import_pg_core.integer)("nights_madinah"),
  hotelMakkahId: (0, import_pg_core.integer)("hotel_makkah_id").references(() => hotels.id),
  hotelMadinahId: (0, import_pg_core.integer)("hotel_madinah_id").references(() => hotels.id),
  transport: (0, import_pg_core.text)("transport").default("Transport"),
  inclusions: (0, import_pg_core.jsonb)("inclusions").$type().default([]),
  exclusions: (0, import_pg_core.jsonb)("exclusions").$type().default([]),
  luggage: (0, import_pg_core.text)("luggage"),
  seats: (0, import_pg_core.integer)("seats"),
  status: packageStatus("status").notNull().default("draft"),
  priceType: priceType("price_type").notNull().default("gross"),
  markupPct: (0, import_pg_core.numeric)("markup_pct", { precision: 5, scale: 2 }).default("0"),
  discountBadge: (0, import_pg_core.boolean)("discount_badge").default(false),
  childWithoutBed: (0, import_pg_core.integer)("child_without_bed"),
  childWithBedRule: (0, import_pg_core.text)("child_with_bed_rule"),
  infant: (0, import_pg_core.integer)("infant"),
  sourceNote: (0, import_pg_core.text)("source_note"),
  posterVersion: (0, import_pg_core.text)("poster_version"),
  publishedAt: (0, import_pg_core.timestamp)("published_at"),
  approvedBy: (0, import_pg_core.text)("approved_by"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow().notNull()
}, (t) => [(0, import_pg_core.index)("packages_depart").on(t.departDate), (0, import_pg_core.index)("packages_city").on(t.departureCity)]);
var priceTiers = (0, import_pg_core.pgTable)("price_tiers", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  packageId: (0, import_pg_core.integer)("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  tier: tierName("tier").notNull(),
  supplierRate: (0, import_pg_core.integer)("supplier_rate"),
  customerPrice: (0, import_pg_core.integer)("customer_price").notNull()
}, (t) => [(0, import_pg_core.uniqueIndex)("price_tiers_pkg_tier").on(t.packageId, t.tier)]);
var leads = (0, import_pg_core.pgTable)("leads", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  packageCode: (0, import_pg_core.text)("package_code"),
  name: (0, import_pg_core.text)("name"),
  phone: (0, import_pg_core.text)("phone"),
  city: (0, import_pg_core.text)("city"),
  travellers: (0, import_pg_core.text)("travellers"),
  room: (0, import_pg_core.text)("room"),
  message: (0, import_pg_core.text)("message"),
  source: (0, import_pg_core.text)("source").default("web"),
  pagePath: (0, import_pg_core.text)("page_path"),
  status: leadStatus("status").notNull().default("new"),
  assignedTo: (0, import_pg_core.text)("assigned_to"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull()
});
var bookingStatus = (0, import_pg_core.pgEnum)("booking_status", ["reserved", "deposit_pending", "deposit_received", "confirmed", "cancelled"]);
var payMethod = (0, import_pg_core.pgEnum)("pay_method", ["bank", "jazzcash", "easypaisa", "card", "cash"]);
var bookings = (0, import_pg_core.pgTable)("bookings", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  ref: (0, import_pg_core.text)("ref").notNull().unique(),
  product: (0, import_pg_core.text)("product").notNull(),
  // U H T V A F HT
  itemCode: (0, import_pg_core.text)("item_code").notNull(),
  title: (0, import_pg_core.text)("title").notNull(),
  packageId: (0, import_pg_core.integer)("package_id").references(() => packages.id, { onDelete: "set null" }),
  room: (0, import_pg_core.text)("room"),
  adults: (0, import_pg_core.integer)("adults").notNull().default(1),
  children: (0, import_pg_core.integer)("children").notNull().default(0),
  infants: (0, import_pg_core.integer)("infants").notNull().default(0),
  travellers: (0, import_pg_core.jsonb)("travellers").$type().notNull().default([]),
  leadName: (0, import_pg_core.text)("lead_name").notNull(),
  phone: (0, import_pg_core.text)("phone").notNull(),
  email: (0, import_pg_core.text)("email"),
  city: (0, import_pg_core.text)("city"),
  travelDate: (0, import_pg_core.text)("travel_date"),
  details: (0, import_pg_core.jsonb)("details").$type().notNull().default({}),
  total: (0, import_pg_core.integer)("total").notNull().default(0),
  deposit: (0, import_pg_core.integer)("deposit").notNull().default(0),
  paid: (0, import_pg_core.integer)("paid").notNull().default(0),
  payMethod: payMethod("pay_method"),
  payRef: (0, import_pg_core.text)("pay_ref"),
  status: bookingStatus("status").notNull().default("reserved"),
  notes: (0, import_pg_core.text)("notes"),
  pagePath: (0, import_pg_core.text)("page_path"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow().notNull(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow().notNull()
}, (t) => [(0, import_pg_core.index)("bookings_phone").on(t.phone), (0, import_pg_core.index)("bookings_created").on(t.createdAt)]);

// src/db/index.ts
var url = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/punjkash";
var globalForDb = globalThis;
var client = globalForDb.pgClient ?? (0, import_postgres.default)(url, { max: 5, prepare: false });
if (process.env.NODE_ENV !== "production") globalForDb.pgClient = client;
var db = (0, import_postgres_js.drizzle)(client, { schema: schema_exports });

// src/db/batch.ts
var import_drizzle_orm = require("drizzle-orm");
var { suppliers: suppliers2, hotels: hotels2, packages: packages2, priceTiers: priceTiers2 } = schema_exports;
var slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
var SH = "Shuttle";
var meezab = { sup: "M", airline: "Saudia", infant: 68e3, child: 198e3, childBed: "Adult price less 20,000", transport: "Transport" };
var mz = (code, ref, out, back, depart, ret, days, nm, nd, hm, hd, t, note) => ({ ...meezab, code, ref, out, back, depart, ret, days, nm, nd, hm, hd, tiers: { sharing: t[0], quad: t[1], triple: t[2], double: t[3] }, note: `Meezab flyer revised 16 Oct 2026, ${ref}. Face value.${note ? " " + note : ""}` });
var rh = (code, ref, out, back, airline, depart, ret, days, hm, hd, t, nm, nd, note) => ({ code, sup: "R", ref, out, back, airline, depart, ret, days, nm, nd, hm, hd, tiers: { sharing: t[0], quad: t[1], triple: t[2], double: t[3] }, transport: "Transport", note: `Unnamed flyer filed under Rahimia Group (assumed, confirm). Face value.${note ? " " + note : ""}` });
var Z = { name: "Arafat Zahbi / Fakhir Al Azizia", label: SH };
var HT = { name: "Hala Taibah", label: SH };
var TF = { name: "Taj Fiddi Hotel", m: 750 };
var DS = { name: "Diyar Al Safa", m: 700 };
var RZ = { name: "Rukan Al Zawia", m: 750 };
var EK = { name: "Essa Karim Hotel", m: 600 };
var AZ = { name: "Areej Al Zahbi", m: 475 };
var BM = { name: "Burj Mukhtara", m: 350 };
var SZ = { name: "Shams Al Zahbi", m: 375 };
var QA = { name: "Qila Ajyad", label: SH };
var MM = { name: "Manazil Marjan", label: SH };
var RA = { name: "Rawafed Al Asmiah", label: SH };
var MJ = { name: "Manazil Al Marjhaan", label: SH };
var AJ = { name: "Al Juhani Ajyad / Shabab Delma 2", m: 525 };
var AK = { name: "Alkeram Aljadid / Alkiram Alfidi", m: 375 };
var SN = { name: "Shuqaq Falah Awali / Nozol Falah Awali", m: 550 };
var EG = { name: "Emaar Al Khair Golden Hotel", m: 800 };
var pkgs = [
  // Meezab 21 days, 30 Nov
  mz("MU12A", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, Z, HT, [261e3, 271e3, 282500, 305500], "PNR 92XJ36."),
  mz("MU12B", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, TF, DS, [277500, 284e3, 3e5, 332e3]),
  mz("MU12C", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, RZ, EK, [295e3, 304e3, 326500, 371500]),
  mz("MU12D", "UG-100464", "SV735", "SV738", "2026-11-30", "2026-12-20", 21, 12, 8, AZ, BM, [324500, 338e3, 372e3, 44e4]),
  // Meezab 21 days, 27 Nov
  mz("MU13A", "UG-100542", "SV733", "SV734", "2026-11-27", "2026-12-17", 21, 13, 7, Z, HT, [257500, 267e3, 277e3, 297500], "PNR 9KHBIB. Makkah nights 8+5."),
  mz("MU13B", "UG-100542", "SV733", "SV734", "2026-11-27", "2026-12-17", 21, 13, 7, QA, MM, [266e3, 272e3, 284e3, 308e3]),
  mz("MU13C", "UG-100542", "SV733", "SV734", "2026-11-27", "2026-12-17", 21, 13, 7, RZ, EK, [292e3, 301e3, 322e3, 365e3]),
  // Meezab 21 days, 24 Nov (1am departure)
  mz("MU14A", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, Z, HT, [255500, 265e3, 274e3, 293e3], "PNR 934M2Y. Nights as printed (8+5 Makkah, 8 Madinah) add to one more than the dates; confirm."),
  mz("MU14B", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, TF, DS, [273500, 28e4, 294500, 323500]),
  mz("MU14C", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, RZ, EK, [292500, 300500, 322e3, 365e3]),
  mz("MU14D", "UG-100463", "SV739", "SV734", "2026-11-24", "2026-12-14", 21, 13, 8, SZ, BM, [335500, 351e3, 389500, 466e3]),
  // Meezab 21 days, 24 Nov (midday departure)
  mz("MU15A", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, Z, HT, [255e3, 264e3, 273e3, 291e3], "PNR 92ZPKF."),
  mz("MU15B", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, TF, DS, [272e3, 279e3, 293e3, 321e3]),
  mz("MU15C", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, RZ, EK, [29e4, 298e3, 318500, 359500]),
  mz("MU15D", "UG-100462", "SV735", "SV732", "2026-11-24", "2026-12-14", 21, 12, 8, SZ, BM, [331e3, 346e3, 383e3, 456e3]),
  // Meezab 16 days, 22 Nov
  mz("MU16A", "UG-100541", "SV735", "SV734", "2026-11-22", "2026-12-07", 16, 9, 6, Z, HT, [249e3, 255e3, 261500, 274e3], "PNR 7IXMV9. Makkah nights 4+5."),
  mz("MU16B", "UG-100541", "SV735", "SV734", "2026-11-22", "2026-12-07", 16, 9, 6, QA, MM, [254e3, 258e3, 265e3, 279500]),
  mz("MU16C", "UG-100541", "SV735", "SV734", "2026-11-22", "2026-12-07", 16, 9, 6, { name: "Diwan Al Bait", m: 550 }, { name: "Abraj Alam Al Najoom", m: 550 }, [284500, 292e3, 310500, 347500]),
  // Rahimia (assumed): PIA flyer 24 Oct, 21 days
  rh("RU1", "PIA PK759/760 pkg 1", "PK 759", "PK 760", "PIA", "2026-10-24", "2026-11-13", 21, RA, MJ, [253999, 257999, 266999, 280999]),
  rh("RU2", "PIA PK759/760 pkg 2", "PK 759", "PK 760", "PIA", "2026-10-24", "2026-11-13", 21, EG, SN, [298999, 313999, 338999, 388999], void 0, void 0, "Hotel distances 800-900 m and 550-750 m per flyer."),
  // Rahimia (assumed): Fly Jinnah 20/21 days
  rh("RU3", "FJ pkg 1", "9P 586", "9P 587", "FlyJinnah", "2026-10-26", "2026-11-14", 20, RA, MJ, [248999, 252999, 259999, 274999], void 0, void 0, "Flyer listed this date twice."),
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
  { ...rh("RU14", "PKG#702", "SV 733", "SV 732", "Saudia", "2026-11-02", "2026-11-16", 15, { name: "VOCO Makkah", label: SH }, { name: "Nusk Medina Hotel" }, [0, 314999, 344999, 389999], 8, 6, "Flyer shows VOCO and Nusk Medina; star ratings not verified."), tiers: { quad: 314999, triple: 344999, double: 389999 } }
];
async function main() {
  let [rahimia] = await db.select().from(suppliers2).where((0, import_drizzle_orm.eq)(suppliers2.codeLetter, "R"));
  if (!rahimia) {
    [rahimia] = await db.insert(suppliers2).values({ codeLetter: "R", name: "Rahimia Group", defaultPriceType: "face", notes: "Sahiwal head office; Lahore 0311-1155219 / 0311-1155217; Islamabad 0300-7241418. Hotel + visa per-night rate sheets 05 Oct and 16 Oct 2026 (visa SR 570 / 560 / 510 with private transport, hotel rates per night in SR). Unnamed PIA, FlyJinnah and Saudia VOCO flyers of 17 Oct filed here by assumption." }).returning();
  }
  const sup = { R: rahimia.id };
  const [meez] = await db.select().from(suppliers2).where((0, import_drizzle_orm.eq)(suppliers2.codeLetter, "M"));
  sup.M = meez.id;
  const hotelId = async (h, city) => {
    await db.insert(hotels2).values({ name: h.name, city, distanceM: h.m, distanceLabel: h.label, distanceSource: "Supplier flyer 16-17 Oct 2026" }).onConflictDoNothing();
    const rows = await db.select().from(hotels2);
    return rows.find((x) => x.name === h.name && x.city === city).id;
  };
  let added = 0, updated = 0;
  for (const p of pkgs) {
    const title = `${p.days} Days Umrah from Lahore \xB7 ${p.airline} \xB7 ${p.depart.slice(8, 10)} ${new Date(p.depart).toLocaleString("en", { month: "short" })}`;
    const values = {
      code: p.code,
      supplierId: sup[p.sup],
      supplierRef: p.ref,
      product: "U",
      title,
      slug: slug(`${p.code}-${p.days}-days-umrah-lahore-${p.depart}`),
      departureCity: "Lahore",
      departureIata: "LHE",
      airline: p.airline,
      flightOut: p.out,
      flightBack: p.back,
      departDate: p.depart,
      returnDate: p.ret,
      days: p.days,
      nightsMakkah: p.nm ?? null,
      nightsMadinah: p.nd ?? null,
      hotelMakkahId: await hotelId(p.hm, "makkah"),
      hotelMadinahId: await hotelId(p.hd, "madinah"),
      transport: p.transport ?? "Transport",
      inclusions: ["Umrah visa", "Return air ticket", "Makkah hotel", "Madinah hotel", p.transport ?? "Transport", "Ziyarat"],
      status: "open",
      priceType: "face",
      markupPct: "0",
      childWithoutBed: p.child,
      childWithBedRule: p.childBed,
      infant: p.infant,
      sourceNote: p.note,
      publishedAt: /* @__PURE__ */ new Date(),
      approvedBy: "import-2026-10-17",
      updatedAt: /* @__PURE__ */ new Date()
    };
    const [existing] = await db.select().from(packages2).where((0, import_drizzle_orm.eq)(packages2.code, p.code));
    let id;
    if (existing) {
      await db.update(packages2).set(values).where((0, import_drizzle_orm.eq)(packages2.id, existing.id));
      id = existing.id;
      updated++;
    } else {
      const [r] = await db.insert(packages2).values(values).returning();
      id = r.id;
      added++;
    }
    await db.delete(priceTiers2).where((0, import_drizzle_orm.eq)(priceTiers2.packageId, id));
    const tiers = Object.entries(p.tiers).filter(([, v]) => v > 0).map(([tier, v]) => ({ packageId: id, tier, customerPrice: v }));
    await db.insert(priceTiers2).values(tiers);
  }
  console.log(`batch 2026-10-17: ${added} added, ${updated} updated`);
}
main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
