import {
  pgTable, serial, text, integer, date, timestamp, boolean, jsonb, pgEnum, numeric, index, uniqueIndex,
} from "drizzle-orm/pg-core";

export const priceType = pgEnum("price_type", ["gross", "net", "face"]);
export const productType = pgEnum("product_type", ["U", "H", "T", "V", "A"]);
export const packageStatus = pgEnum("package_status", ["draft", "open", "few", "sold", "closed", "hidden"]);
export const tierName = pgEnum("tier_name", ["sharing", "quad", "triple", "double"]);
export const leadStatus = pgEnum("lead_status", ["new", "contacted", "quoted", "deposit", "booked", "lost"]);
export const cityName = pgEnum("city_name", ["makkah", "madinah"]);

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  codeLetter: text("code_letter").notNull().unique(),
  name: text("name").notNull(),
  portalUrl: text("portal_url"),
  website: text("website"),
  contacts: jsonb("contacts").$type<{ name?: string; phone?: string; email?: string }[]>().default([]),
  defaultPriceType: priceType("default_price_type").notNull().default("gross"),
  defaultMarkupPct: numeric("default_markup_pct", { precision: 5, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: cityName("city").notNull(),
  distanceM: integer("distance_m"),
  distanceLabel: text("distance_label"),
  distanceSource: text("distance_source"),
  aliases: jsonb("aliases").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => [uniqueIndex("hotels_name_city").on(t.name, t.city)]);

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  supplierId: integer("supplier_id").references(() => suppliers.id).notNull(),
  supplierRef: text("supplier_ref"),
  product: productType("product").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  departureCity: text("departure_city").notNull(),
  departureIata: text("departure_iata"),
  airline: text("airline"),
  flightOut: text("flight_out"),
  flightBack: text("flight_back"),
  departDate: date("depart_date").notNull(),
  returnDate: date("return_date"),
  days: integer("days").notNull(),
  nightsMakkah: integer("nights_makkah"),
  nightsMadinah: integer("nights_madinah"),
  hotelMakkahId: integer("hotel_makkah_id").references(() => hotels.id),
  hotelMadinahId: integer("hotel_madinah_id").references(() => hotels.id),
  transport: text("transport").default("Transport"),
  inclusions: jsonb("inclusions").$type<string[]>().default([]),
  exclusions: jsonb("exclusions").$type<string[]>().default([]),
  luggage: text("luggage"),
  seats: integer("seats"),
  status: packageStatus("status").notNull().default("draft"),
  priceType: priceType("price_type").notNull().default("gross"),
  markupPct: numeric("markup_pct", { precision: 5, scale: 2 }).default("0"),
  discountBadge: boolean("discount_badge").default(false),
  childWithoutBed: integer("child_without_bed"),
  childWithBedRule: text("child_with_bed_rule"),
  infant: integer("infant"),
  sourceNote: text("source_note"),
  posterVersion: text("poster_version"),
  publishedAt: timestamp("published_at"),
  approvedBy: text("approved_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [index("packages_depart").on(t.departDate), index("packages_city").on(t.departureCity)]);

export const priceTiers = pgTable("price_tiers", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  tier: tierName("tier").notNull(),
  supplierRate: integer("supplier_rate"),
  customerPrice: integer("customer_price").notNull(),
}, (t) => [uniqueIndex("price_tiers_pkg_tier").on(t.packageId, t.tier)]);

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  packageCode: text("package_code"),
  name: text("name"),
  phone: text("phone"),
  city: text("city"),
  travellers: text("travellers"),
  room: text("room"),
  message: text("message"),
  source: text("source").default("web"),
  pagePath: text("page_path"),
  status: leadStatus("status").notNull().default("new"),
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
