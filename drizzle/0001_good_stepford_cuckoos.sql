CREATE TYPE "public"."booking_status" AS ENUM('reserved', 'deposit_pending', 'deposit_received', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."pay_method" AS ENUM('bank', 'jazzcash', 'easypaisa', 'card', 'cash');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"ref" text NOT NULL,
	"product" text NOT NULL,
	"item_code" text NOT NULL,
	"title" text NOT NULL,
	"package_id" integer,
	"room" text,
	"adults" integer DEFAULT 1 NOT NULL,
	"children" integer DEFAULT 0 NOT NULL,
	"infants" integer DEFAULT 0 NOT NULL,
	"travellers" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"lead_name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"city" text,
	"travel_date" text,
	"details" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"deposit" integer DEFAULT 0 NOT NULL,
	"paid" integer DEFAULT 0 NOT NULL,
	"pay_method" "pay_method",
	"pay_ref" text,
	"status" "booking_status" DEFAULT 'reserved' NOT NULL,
	"notes" text,
	"page_path" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_ref_unique" UNIQUE("ref")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookings_phone" ON "bookings" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "bookings_created" ON "bookings" USING btree ("created_at");