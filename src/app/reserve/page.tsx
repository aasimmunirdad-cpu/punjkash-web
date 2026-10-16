import Link from "next/link";
import ReserveForm from "@/components/ReserveForm";
import { resolveQuote } from "@/lib/bookings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reserve", robots: { index: false } };
type SP = Record<string, string | undefined>;

export default async function Reserve({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = await resolveQuote(sp);
  if (!q) return <div className="wrap section" style={{ maxWidth: 680, paddingBottom: 60 }}><div className="card card-body"><h1 style={{ fontSize: 26 }}>{sp.error === "form" ? "Please check the form" : "We could not find that item"}</h1><p className="muted">{sp.error === "form" ? "A name and WhatsApp number are needed. Go back and try again." : "It may have been sold out or taken down. Pick another from the list."}</p><Link className="btn btn-navy" href="/umrah" style={{ justifySelf: "start" }}>Browse packages</Link></div></div>;
  const [a, c, i] = (sp.pax ?? "2-0-0").split("-").map((x) => Math.max(0, Number(x) || 0));
  const qs = new URLSearchParams(Object.entries(sp).filter(([k, v]) => v && k !== "pax" && k !== "error") as [string, string][]).toString();
  return (
    <div className="wrap section" style={{ display: "grid", gap: 20, paddingBottom: 48 }}>
      <nav className="small faint"><Link href="/">Home</Link> › <Link href={q.pagePath}>{q.title}</Link> › Reserve</nav>
      <div className="steps" style={{ gridTemplateColumns: "repeat(3,auto)", justifyContent: "start", gap: 20 }}><div><b>Travellers</b></div><div style={{ opacity: .5 }}><b>Deposit</b></div><div style={{ opacity: .5 }}><b>Reference</b></div></div>
      <div className="card" style={{ display: "grid", gridTemplateColumns: "96px 1fr", alignItems: "center" }}><img src={q.img} alt="" style={{ width: 96, height: 72, objectFit: "cover" }} /><div style={{ padding: "8px 14px" }}><b>{q.title}</b><div className="small muted">{q.sub}</div></div></div>
      <ReserveForm q={{ unit: q.unit, unitLabel: q.unitLabel, childPrice: q.childPrice, infantPrice: q.infantPrice, depositRule: q.depositRule, onRequest: q.onRequest }} qs={qs} defaults={{ a: Math.max(1, a), c, i }} />
    </div>
  );
}
