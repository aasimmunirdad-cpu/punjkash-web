import Link from "next/link";
import { bookingsByPhone, getBooking } from "@/lib/bookings";
import { fmtDate } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "My bookings", description: "Open your PunjKash booking with your reference and WhatsApp number." };
const STATUS: Record<string, [string, string]> = { reserved: ["Reserved, deposit due", "chip-gold"], deposit_pending: ["Deposit being checked", "chip-gold"], deposit_received: ["Deposit received", "chip-green"], confirmed: ["Confirmed", "chip-green"], cancelled: ["Cancelled", "chip-hot"] };

export default async function Bookings({ searchParams }: { searchParams: Promise<{ ref?: string; phone?: string }> }) {
  const { ref, phone } = await searchParams;
  const one = ref && phone ? await getBooking(ref, phone) : null;
  const list = !ref && phone ? await bookingsByPhone(phone) : one ? [one] : [];
  const searched = Boolean(phone);
  return (
    <div className="wrap section" style={{ maxWidth: 760, display: "grid", gap: 16, paddingBottom: 60 }}>
      <h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>My bookings</h1>
      <form className="card card-body" method="get" style={{ gap: 10 }}>
        <p className="small muted">No password. Enter the WhatsApp number you booked with; add the reference to open one booking directly.</p>
        <div className="grid g2" style={{ gap: 10 }}><div className="field"><label htmlFor="phone">WhatsApp number</label><input id="phone" name="phone" inputMode="tel" required defaultValue={phone ?? ""} placeholder="03xx xxxxxxx" /></div><div className="field"><label htmlFor="ref">Reference (optional)</label><input id="ref" name="ref" defaultValue={ref ?? ""} placeholder="PK-U2610-001" style={{ textTransform: "uppercase" }} /></div></div>
        <button className="btn btn-navy" type="submit" style={{ justifySelf: "start" }}>Find my bookings</button>
      </form>
      {list.map((b) => <Link key={b.ref} href={`/bookings/${b.ref}?phone=${encodeURIComponent(phone ?? "")}`} className="card card-body" style={{ gap: 6 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}><b>{b.ref}</b><span className={`chip ${STATUS[b.status]?.[1] ?? ""}`}>{STATUS[b.status]?.[0] ?? b.status}</span></div><span>{b.title}</span><span className="small muted">{b.travelDate ? `Travel ${fmtDate(b.travelDate)} · ` : ""}Total PKR {b.total.toLocaleString("en-PK")} · Paid {b.paid.toLocaleString("en-PK")}</span></Link>)}
      {searched && !list.length && <div className="notice">No booking found for that number{ref ? " and reference" : ""}. Check the number you used when reserving, or message us and we will find it.</div>}
    </div>
  );
}
