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

// src/db/seed.ts
var import_drizzle_orm = require("drizzle-orm");
var { suppliers: suppliers2, hotels: hotels2, packages: packages2, priceTiers: priceTiers2 } = schema_exports;
var slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
var today = "2026-10-15";
var supplierRows = [
  { codeLetter: "K", name: "Ukasha", defaultPriceType: "gross" },
  { codeLetter: "S", name: "UpSky Group of Travels", portalUrl: "https://upsky.pk", website: "https://upsky.pk", defaultPriceType: "gross", contacts: [{ phone: "0300 7075085" }], notes: "Monthly commission built in: Nov 2026 Islamabad ~30,000, Lahore ~20,000 (to confirm)" },
  { codeLetter: "Q", name: "QFC", defaultPriceType: "gross" },
  { codeLetter: "M", name: "Meezab Group", defaultPriceType: "net", defaultMarkupPct: "5", notes: "Flyer rates are PunjKash cost from MU11 onward; add 5%, round up to 100" },
  { codeLetter: "N", name: "New World Group of Companies", website: "https://www.nwg.com.pk", defaultPriceType: "gross", contacts: [{ name: "Sohail Nakrawala", phone: "0321-8280726" }, { name: "Muhammad Bilal", phone: "0321-9282929" }, { email: "support@nwg.com.pk" }] },
  { codeLetter: "F", name: "Mavens Fly Travel and Tours", website: "https://www.mavensflytravel.com", defaultPriceType: "face", contacts: [{ phone: "0325-7359610" }] },
  { codeLetter: "I", name: "Ibrar Anjum Travel & Tours", defaultPriceType: "face", contacts: [{ phone: "0304-5244124" }], notes: "Air ticketing" },
  { codeLetter: "B", name: "Nazal Bhutta Group", defaultPriceType: "net" },
  { codeLetter: "H", name: "Binham Group", website: "https://www.binhamtravels.pk", defaultPriceType: "gross" },
  { codeLetter: "D", name: "Dar Al Maqaam Travel & Tours (Pvt) Ltd", defaultPriceType: "net", defaultMarkupPct: "5", notes: "Custom packages quoted as cost" }
];
var hotelRows = [
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
  { name: "Kinan Madina", city: "madinah", distanceM: 1e3, distanceSource: "UpSky flyer 2 Oct 2026" },
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
  { name: "Swiss International", city: "madinah" }
];
var pkgs = [
  // UpSky 15-day Saudia ISB flyer, 14 Oct 2026 (all 8 built)
  { code: "SU19", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-08", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  { code: "SU20", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-08", days: 15, nm: 8, nd: 6, hm: "Blora Moazan", hd: "Rou Khair", tiers: { sharing: 306900, quad: 311900, triple: 334400, double: 380900 }, status: "open" },
  { code: "SU21", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-14", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  { code: "SU22", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-14", days: 15, nm: 8, nd: 6, hm: "Mukaram Hijra", hd: "Abraj Taiba Silver", tiers: { sharing: 303900, quad: 315900, triple: 340600, double: 39e4 }, status: "open" },
  { code: "SU23", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-22", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Taiba", tiers: { sharing: 311300, quad: 320300, triple: 345700, double: 397600 }, status: "open" },
  { code: "SU24", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-22", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  { code: "SU25", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-28", days: 15, nm: 8, nd: 6, hm: "Blora Moazan", hd: "Rou Khair", tiers: { sharing: 306900, quad: 311900, triple: 334400, double: 380900 }, status: "open" },
  { code: "SU26", sup: "S", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-28", days: 15, nm: 8, nd: 6, hm: "Mather Al Jewar", hd: "Rou Khair", tiers: { sharing: 300800, quad: 308900, triple: 330200, double: 374800 }, status: "open" },
  // Binham 15-day Saudia ISB, Package 1
  { code: "HU1", sup: "H", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-08", ret: "2026-11-22", days: 15, nm: 8, nd: 6, hm: "Maidan Al Bait 2", hd: "Maidan Bait Madina", tiers: { sharing: 256500, quad: 262100, triple: 270200, double: 288e3 }, status: "open" },
  { code: "HU2", sup: "H", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-15", ret: "2026-11-29", days: 15, nm: 8, nd: 6, hm: "Maidan Al Bait 2", hd: "Maidan Bait Madina", tiers: { sharing: 256500, quad: 262100, triple: 270200, double: 288e3 }, status: "open" },
  { code: "HU3", sup: "H", city: "Islamabad", iata: "ISB", airline: "Saudia", depart: "2026-11-29", ret: "2026-12-13", days: 15, nm: 8, nd: 6, hm: "Maidan Al Bait 2", hd: "Maidan Bait Madina", tiers: { sharing: 256500, quad: 262100, triple: 270200, double: 288e3 }, status: "open" },
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
  { code: "MU10A", sup: "M", ref: "UG-100507", city: "Lahore", iata: "LHE", airline: "Saudia", depart: "2026-10-25", ret: "2026-11-14", days: 21, nm: 12, nd: 8, hm: "Snood Hotel", hd: "Hala Taibah", tiers: { sharing: 261e3, quad: 268500, triple: 280500, double: 304e3 }, infant: 68e3, child: 193e3, childBed: "Adult minus 20,000", status: "open", priceType: "gross" },
  { code: "MU11A", sup: "M", ref: "UG-100528", city: "Karachi", iata: "KHI", airline: "FlyJinnah", out: "9P 600", back: "9P 601", depart: "2026-10-11", ret: "2026-10-31", days: 21, nm: 12, nd: 8, hm: "Snood Hotel", hd: "Hala Taibah", tiers: { sharing: 229500, quad: 236300, triple: 247800, double: 269400 }, infant: 93e3, child: 194e3, childBed: "Same as adult", status: "closed", priceType: "net", markup: 5 },
  // Mavens Fly FU2-FU5 (face value)
  { code: "FU2", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-07", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215e3, quad: 22e4, triple: 225e3, double: 235e3 }, infant: 75e3, child: 175e3, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  { code: "FU3", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-08", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215e3, quad: 22e4, triple: 225e3, double: 235e3 }, infant: 75e3, child: 175e3, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  { code: "FU4", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-09", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215e3, quad: 22e4, triple: 225e3, double: 235e3 }, infant: 75e3, child: 175e3, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  { code: "FU5", sup: "F", ref: "SEP-002", city: "Karachi", iata: "KHI", airline: "Air Sial", out: "PF 714", back: "PF 715", depart: "2026-10-11", days: 20, nm: 12, nd: 8, hm: "Masarat Masmara", hd: "Abraj Al Diyafah", tiers: { sharing: 215e3, quad: 22e4, triple: 225e3, double: 235e3 }, infant: 75e3, child: 175e3, childBed: "Same as adult", luggage: "20 kg + 30 kg + 7 kg hand carry", status: "closed", priceType: "face" },
  // Nazal Bhutta
  { code: "BU1", sup: "B", ref: "H1", city: "Lahore", iata: "LHE", airline: "Air Sial", depart: "2026-10-18", ret: "2026-11-01", days: 14, nm: 8, nd: 6, hm: "Nawarts Shams 3", hd: "Rehab Harmony", transport: "Private transport", tiers: { quad: 363e3 }, status: "open", priceType: "net" },
  { code: "BU2", sup: "B", city: "Lahore", iata: "LHE", airline: "Air Sial", depart: "2026-10-18", ret: "2026-11-01", days: 14, nm: 8, nd: 6, hm: "Bullorah Al Durrah", hd: "Wassam International", transport: "Private transport", tiers: { quad: 325e3 }, status: "open", priceType: "net", note: "Route and dates assumed from BU1; cost 302,000 quad" }
];
async function main() {
  await db.execute(import_drizzle_orm.sql`truncate price_tiers, packages, hotels, suppliers restart identity cascade`);
  const sups = await db.insert(suppliers2).values(supplierRows).returning();
  const supId = Object.fromEntries(sups.map((s) => [s.codeLetter, s.id]));
  const hs = await db.insert(hotels2).values(hotelRows).returning();
  const hotelId = (name, city) => {
    const h = hs.find((x) => x.name === name && x.city === city);
    if (!h) throw new Error("hotel missing " + name);
    return h.id;
  };
  for (const p of pkgs) {
    const title = `${p.days} Days Umrah from ${p.city} \xB7 ${p.airline} \xB7 ${p.depart.slice(8, 10)} ${new Date(p.depart).toLocaleString("en", { month: "short" })}`;
    const [row] = await db.insert(packages2).values({
      code: p.code,
      supplierId: supId[p.sup],
      supplierRef: p.ref,
      product: "U",
      title,
      slug: slug(`${p.code}-${p.days}-days-umrah-${p.city}-${p.depart}`),
      departureCity: p.city,
      departureIata: p.iata,
      airline: p.airline,
      flightOut: p.out,
      flightBack: p.back,
      departDate: p.depart,
      returnDate: p.ret,
      days: p.days,
      nightsMakkah: p.nm,
      nightsMadinah: p.nd,
      hotelMakkahId: hotelId(p.hm, "makkah"),
      hotelMadinahId: hotelId(p.hd, "madinah"),
      transport: p.transport ?? "Transport",
      inclusions: ["Umrah visa", "Return air ticket", "Makkah hotel", "Madinah hotel", p.transport ?? "Transport", "Ziyarat"],
      luggage: p.luggage,
      seats: p.seats,
      status: p.depart < today ? "closed" : p.status ?? "open",
      priceType: p.priceType ?? "gross",
      markupPct: String(p.markup ?? 0),
      childWithoutBed: p.child,
      childWithBedRule: p.childBed,
      infant: p.infant,
      sourceNote: p.note,
      publishedAt: /* @__PURE__ */ new Date(),
      approvedBy: "seed"
    }).returning();
    const tiers = Object.entries(p.tiers).map(([tier, price]) => ({ packageId: row.id, tier, customerPrice: price }));
    await db.insert(priceTiers2).values(tiers);
  }
  console.log(`seeded ${sups.length} suppliers, ${hs.length} hotels, ${pkgs.length} packages`);
  process.exit(0);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
