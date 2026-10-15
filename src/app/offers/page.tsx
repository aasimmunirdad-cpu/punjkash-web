import Link from "next/link";
import PackageRow from "@/components/PackageRow";
import { listPackages } from "@/lib/packages";
export const dynamic = "force-dynamic";
export const metadata = { title: "Special offers and last seats", description: "Umrah departures within 30 days, last seats and packages with a discount available on call." };
export default async function Page() {
  const all = await listPackages({}, 100);
  const cutoff = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
  const offers = all.filter((p) => p.departDate <= cutoff || p.discountBadge || (p.seats != null && p.seats <= 10));
  return <div className="wrap" style={{ padding: "40px 0", display: "flex", flexDirection: "column", gap: 14 }}><h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Special offers and last seats</h1><p className="muted">Departures within 30 days, packages with only a few seats, and packages where a discount is available on call.</p>{offers.map((p) => <PackageRow key={p.id} p={p} />)}{!offers.length && <p className="muted">No offers right now. <Link href="/umrah">See all departures.</Link></p>}</div>;
}
