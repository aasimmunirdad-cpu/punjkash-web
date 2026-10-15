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
