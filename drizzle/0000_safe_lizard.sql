CREATE TYPE "public"."city_name" AS ENUM('makkah', 'madinah');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'quoted', 'deposit', 'booked', 'lost');--> statement-breakpoint
CREATE TYPE "public"."package_status" AS ENUM('draft', 'open', 'few', 'sold', 'closed', 'hidden');--> statement-breakpoint
CREATE TYPE "public"."price_type" AS ENUM('gross', 'net', 'face');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('U', 'H', 'T', 'V', 'A');--> statement-breakpoint
CREATE TYPE "public"."tier_name" AS ENUM('sharing', 'quad', 'triple', 'double');--> statement-breakpoint
CREATE TABLE "hotels" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"city" "city_name" NOT NULL,
	"distance_m" integer,
	"distance_label" text,
	"distance_source" text,
	"aliases" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_code" text,
	"name" text,
	"phone" text,
	"city" text,
	"travellers" text,
	"room" text,
	"message" text,
	"source" text DEFAULT 'web',
	"page_path" text,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"assigned_to" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"supplier_id" integer NOT NULL,
	"supplier_ref" text,
	"product" "product_type" NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"departure_city" text NOT NULL,
	"departure_iata" text,
	"airline" text,
	"flight_out" text,
	"flight_back" text,
	"depart_date" date NOT NULL,
	"return_date" date,
	"days" integer NOT NULL,
	"nights_makkah" integer,
	"nights_madinah" integer,
	"hotel_makkah_id" integer,
	"hotel_madinah_id" integer,
	"transport" text DEFAULT 'Transport',
	"inclusions" jsonb DEFAULT '[]'::jsonb,
	"exclusions" jsonb DEFAULT '[]'::jsonb,
	"luggage" text,
	"seats" integer,
	"status" "package_status" DEFAULT 'draft' NOT NULL,
	"price_type" "price_type" DEFAULT 'gross' NOT NULL,
	"markup_pct" numeric(5, 2) DEFAULT '0',
	"discount_badge" boolean DEFAULT false,
	"child_without_bed" integer,
	"child_with_bed_rule" text,
	"infant" integer,
	"source_note" text,
	"poster_version" text,
	"published_at" timestamp,
	"approved_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "packages_code_unique" UNIQUE("code"),
	CONSTRAINT "packages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "price_tiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"package_id" integer NOT NULL,
	"tier" "tier_name" NOT NULL,
	"supplier_rate" integer,
	"customer_price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"code_letter" text NOT NULL,
	"name" text NOT NULL,
	"portal_url" text,
	"website" text,
	"contacts" jsonb DEFAULT '[]'::jsonb,
	"default_price_type" "price_type" DEFAULT 'gross' NOT NULL,
	"default_markup_pct" numeric(5, 2) DEFAULT '0',
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "suppliers_code_letter_unique" UNIQUE("code_letter")
);
--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_hotel_makkah_id_hotels_id_fk" FOREIGN KEY ("hotel_makkah_id") REFERENCES "public"."hotels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_hotel_madinah_id_hotels_id_fk" FOREIGN KEY ("hotel_madinah_id") REFERENCES "public"."hotels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_tiers" ADD CONSTRAINT "price_tiers_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "hotels_name_city" ON "hotels" USING btree ("name","city");--> statement-breakpoint
CREATE INDEX "packages_depart" ON "packages" USING btree ("depart_date");--> statement-breakpoint
CREATE INDEX "packages_city" ON "packages" USING btree ("departure_city");--> statement-breakpoint
CREATE UNIQUE INDEX "price_tiers_pkg_tier" ON "price_tiers" USING btree ("package_id","tier");