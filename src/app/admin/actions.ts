"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { ADMIN_COOKIE, adminToken, isAdmin } from "@/lib/admin";

export async function login(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD || pw !== process.env.ADMIN_PASSWORD) redirect("/admin/login?error=1");
  const c = await cookies();
  c.set(ADMIN_COOKIE, adminToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 14 });
  redirect("/admin");
}
export async function logout() { const c = await cookies(); c.delete(ADMIN_COOKIE); redirect("/admin/login"); }

const guard = async () => { if (!(await isAdmin())) redirect("/admin/login"); };
const num = (v: FormDataEntryValue | null) => { const n = Number(String(v ?? "").replace(/[^0-9.-]/g, "")); return Number.isFinite(n) ? n : 0; };

export async function updateBooking(formData: FormData) {
  await guard();
  const id = num(formData.get("id"));
  const status = String(formData.get("status")) as typeof schema.bookings.$inferInsert["status"];
  await db.update(schema.bookings).set({ status, paid: num(formData.get("paid")), notes: String(formData.get("notes") ?? "").slice(0, 2000) || null, updatedAt: new Date() }).where(eq(schema.bookings.id, id));
  revalidatePath("/admin/bookings"); redirect("/admin/bookings?saved=" + id);
}
export async function updateLead(formData: FormData) {
  await guard();
  const id = num(formData.get("id"));
  await db.update(schema.leads).set({ status: String(formData.get("status")) as typeof schema.leads.$inferInsert["status"], assignedTo: String(formData.get("assignedTo") ?? "") || null }).where(eq(schema.leads.id, id));
  revalidatePath("/admin/leads"); redirect("/admin/leads");
}
export async function updatePackage(formData: FormData) {
  await guard();
  const id = num(formData.get("id"));
  await db.update(schema.packages).set({
    status: String(formData.get("status")) as typeof schema.packages.$inferInsert["status"], seats: formData.get("seats") === "" ? null : num(formData.get("seats")),
    discountBadge: formData.get("discountBadge") === "on", airline: String(formData.get("airline") ?? "") || null, flightOut: String(formData.get("flightOut") ?? "") || null, flightBack: String(formData.get("flightBack") ?? "") || null,
    departDate: String(formData.get("departDate")), returnDate: String(formData.get("returnDate") ?? "") || null, days: num(formData.get("days")), nightsMakkah: num(formData.get("nightsMakkah")), nightsMadinah: num(formData.get("nightsMadinah")),
    hotelMakkahId: num(formData.get("hotelMakkahId")) || null, hotelMadinahId: num(formData.get("hotelMadinahId")) || null, transport: String(formData.get("transport") ?? "") || null, luggage: String(formData.get("luggage") ?? "") || null,
    childWithoutBed: num(formData.get("childWithoutBed")) || null, infant: num(formData.get("infant")) || null, sourceNote: String(formData.get("sourceNote") ?? "") || null,
    inclusions: String(formData.get("inclusions") ?? "").split("\n").map((s) => s.trim()).filter(Boolean), updatedAt: new Date(),
  }).where(eq(schema.packages.id, id));
  for (const t of ["sharing", "quad", "triple", "double"] as const) {
    const price = num(formData.get(`price_${t}`)); const rate = num(formData.get(`rate_${t}`));
    const [ex] = await db.select().from(schema.priceTiers).where(eq(schema.priceTiers.packageId, id)).then((r) => r.filter((x) => x.tier === t));
    if (price > 0) { if (ex) await db.update(schema.priceTiers).set({ customerPrice: price, supplierRate: rate || null }).where(eq(schema.priceTiers.id, ex.id)); else await db.insert(schema.priceTiers).values({ packageId: id, tier: t, customerPrice: price, supplierRate: rate || null }); }
    else if (ex) await db.delete(schema.priceTiers).where(eq(schema.priceTiers.id, ex.id));
  }
  revalidatePath("/umrah"); revalidatePath("/"); redirect(`/admin/packages/${id}?saved=1`);
}
export async function updateHotel(formData: FormData) {
  await guard();
  const id = num(formData.get("id"));
  await db.update(schema.hotels).set({ distanceM: num(formData.get("distanceM")) || null, distanceLabel: String(formData.get("distanceLabel") ?? "") || null, distanceSource: String(formData.get("distanceSource") ?? "") || null }).where(eq(schema.hotels.id, id));
  revalidatePath("/umrah"); redirect("/admin/hotels");
}
