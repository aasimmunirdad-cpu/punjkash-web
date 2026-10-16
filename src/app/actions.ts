"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";

const Lead = z.object({
  packageCode: z.string().max(20).optional(),
  pagePath: z.string().max(200).optional(),
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  city: z.string().max(40).optional(),
  travellers: z.string().max(20).optional(),
  room: z.string().max(10).optional(),
  message: z.string().max(600).optional(),
});

export async function createLead(formData: FormData) {
  const parsed = Lead.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) redirect("/enquiry/sent?error=1");
  const d = parsed.data;
  await db.insert(schema.leads).values({ ...d, packageCode: d.packageCode || null, source: "web" });
  redirect(`/enquiry/sent?code=${encodeURIComponent(d.packageCode ?? "")}`);
}

const Reserve = z.object({
  q: z.string().max(400), adults: z.coerce.number().int().min(1).max(20), children: z.coerce.number().int().min(0).max(10), infants: z.coerce.number().int().min(0).max(10),
  leadName: z.string().min(2).max(80), phone: z.string().min(7).max(20), email: z.string().email().max(120).optional().or(z.literal("")), city: z.string().max(40).optional(), notes: z.string().max(600).optional(),
});

export async function createBooking(formData: FormData) {
  const { resolveQuote, priceQuote, nextRef } = await import("@/lib/bookings");
  const parsed = Reserve.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) redirect("/reserve?error=form");
  const d = parsed.data;
  const sp = Object.fromEntries(new URLSearchParams(d.q).entries());
  const q = await resolveQuote(sp);
  if (!q) redirect("/reserve?error=item");
  const names: { name: string; type: string }[] = [];
  for (let i = 0; i < d.adults; i++) names.push({ name: String(formData.get(`a${i}`) ?? "").trim().slice(0, 80), type: "adult" });
  for (let i = 0; i < d.children; i++) names.push({ name: String(formData.get(`c${i}`) ?? "").trim().slice(0, 80), type: "child" });
  for (let i = 0; i < d.infants; i++) names.push({ name: String(formData.get(`i${i}`) ?? "").trim().slice(0, 80), type: "infant" });
  const { total, deposit } = priceQuote(q, d.adults, d.children, d.infants);
  const ref = await nextRef(q.product);
  await db.insert(schema.bookings).values({
    ref, product: q.product, itemCode: q.itemCode, title: q.title, packageId: q.packageId ?? null, room: q.room ?? null,
    adults: d.adults, children: d.children, infants: d.infants, travellers: names, leadName: d.leadName, phone: d.phone, email: d.email || null, city: d.city || null,
    travelDate: q.travelDate ?? null, details: { ...q.details, sub: q.sub }, total, deposit, status: "reserved", notes: d.notes || null, pagePath: q.pagePath,
  });
  redirect(`/reserve/${ref}/pay`);
}

const Pay = z.object({ ref: z.string().max(20), payMethod: z.enum(["bank", "jazzcash", "easypaisa"]), payRef: z.string().min(3).max(60), amount: z.coerce.number().int().min(100) });

export async function reportPayment(formData: FormData) {
  const { eq } = await import("drizzle-orm");
  const parsed = Pay.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) redirect(`/reserve/${formData.get("ref")}/pay?error=1`);
  const d = parsed.data;
  await db.update(schema.bookings).set({ payMethod: d.payMethod, payRef: d.payRef, paid: d.amount, status: "deposit_pending", updatedAt: new Date() }).where(eq(schema.bookings.ref, d.ref));
  redirect(`/reserve/${d.ref}/done`);
}
