import Link from "next/link";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { I } from "@/components/Icons";
import { waLink } from "@/lib/site";
export const metadata = { title: "Hajj 2027 (1448 H) packages", description: "Hajj 2027 from Pakistan with PunjKash: Maktab C, sharing basis, 18 to 20 days, visa, flights, accommodation, all meals, transport, Ziyarat and Qurbani." };
export default function Page() {
  const points = ["Visa, return flights and accommodation in Makkah and Madinah", "All meals, air-conditioned transport and Ziyarat", "Qurbani and group guidance throughout", "Written quotation and payment schedule before any deposit"];
  return (
    <>
      <PageHero img="makkah" alt="Masjid al-Haram" title="Hajj 2027 (1448 H), bookings open" intro="Maktab C, sharing basis, 18 to 20 days. Sharing from PKR 1,750,000 per person; triple add 100,000; double add 200,000." />
      <div className="wrap section product" style={{ paddingBottom: 48 }}>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="notice">Flight schedule to be announced with the Saudi calendar. Hajj bookings are non-refundable once confirmed; we explain this before you pay.</div>
          <div className="card card-body"><h3>What is included</h3><ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 6 }}>{points.map((i) => <li key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--green)", flex: "none" }}><I.check /></span>{i}</li>)}</ul></div>
          <div className="card card-body"><h3>Price per person</h3><table className="tiers-t"><tbody><tr><td>Sharing</td><td className="price" style={{ fontSize: 20 }}><small>PKR</small> 1,750,000</td></tr><tr><td>Triple</td><td className="price" style={{ fontSize: 20 }}><small>PKR</small> 1,850,000</td></tr><tr><td>Double</td><td className="price" style={{ fontSize: 20 }}><small>PKR</small> 1,950,000</td></tr></tbody></table></div>
          <Link className="more" href="/umrah" style={{ justifySelf: "start" }}>Looking for Umrah instead?</Link>
        </div>
        <aside className="sticky-side card card-body" style={{ borderColor: "var(--gold)" }}><h3>Join the Hajj 2027 list</h3><p className="small muted">We call in order of registration when seats are released.</p><LeadForm code="HAJJ-2027" pagePath="/hajj" /><a className="btn btn-wa" href={waLink("Assalam o Alaikum, I want details for Hajj 2027.")}><I.wa /> Ask on WhatsApp</a></aside>
      </div>
    </>
  );
}
