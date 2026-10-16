import Link from "next/link";
import { notFound } from "next/navigation";
import { I } from "@/components/Icons";
import { getBooking } from "@/lib/bookings";
import { site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reservation received", robots: { index: false } };

export default async function Done({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params; const b = await getBooking(ref);
  if (!b) notFound();
  return (
    <div className="wrap section" style={{ maxWidth: 720, display: "grid", gap: 16, paddingBottom: 60 }}>
      <div className="steps" style={{ gridTemplateColumns: "repeat(3,auto)", justifyContent: "start", gap: 20 }}><div style={{ opacity: .5 }}><b>Travellers</b></div><div style={{ opacity: .5 }}><b>Deposit</b></div><div><b>Reference</b></div></div>
      <div className="card card-body" style={{ padding: 28, gap: 12 }}>
        <span style={{ color: "var(--green)" }}><I.check /></span>
        <h1 style={{ fontSize: 28 }}>Reserved. Your reference is {b.ref}.</h1>
        <p className="muted">We are checking your deposit of PKR {b.paid.toLocaleString("en-PK")} by {b.payMethod}. {site.partners[0].name} or {site.partners[1].name} will confirm on WhatsApp at {b.phone}, usually within the hour, and send the written confirmation with every price and inclusion.</p>
        <div className="small muted" style={{ display: "grid", gap: 4 }}><span><b style={{ color: "var(--ink)" }}>{b.title}</b></span><span>{String(b.details?.sub ?? "")}</span><span>{b.travellers.map((t) => t.name).filter(Boolean).join(", ") || `${b.adults + b.children + b.infants} travellers`}</span></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><Link className="btn btn-navy" href={`/bookings/${b.ref}`}>Open my booking</Link><a className="btn btn-wa" href={waLink(`Assalam o Alaikum, my reservation ${b.ref} is done, sending the receipt now.`)}><I.wa /> Send receipt</a></div>
        <span className="tiny faint">Save this reference. My bookings opens with your reference and WhatsApp number, no password.</span>
      </div>
    </div>
  );
}
