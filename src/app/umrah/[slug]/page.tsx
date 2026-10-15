import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackage, listPackages, TIERS } from "@/lib/packages";
import PackageRow from "@/components/PackageRow";
import LeadForm from "@/components/LeadForm";
import { fmtDate, pkr, site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

const dist = (m: number | null, l: string | null) => (m ? `${m} m from the Haram` : l ?? "Distance on request");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pk = await getPackage((await params).slug);
  if (!pk) return {};
  const from = TIERS.map((t) => pk.tiers[t]).filter(Boolean)[0];
  return {
    title: `${pk.p.days} Days Umrah from ${pk.p.departureCity}, ${fmtDate(pk.p.departDate)}, from ${pkr(from ?? 0)} (${pk.p.code})`,
    description: `${pk.p.airline ?? ""} ${pk.p.departureCity} to Jeddah. Makkah: ${pk.mName} (${dist(pk.mDist, pk.mLabel)}). Madinah: ${pk.dName} (${dist(pk.dDist, pk.dLabel)}). Sharing, Quad, Triple, Double prices. Book with PunjKash on WhatsApp.`,
  };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pk = await getPackage(slug);
  if (!pk) notFound();
  const p = pk.p;
  const tiers = TIERS.filter((t) => pk.tiers[t] != null);
  const from = pk.tiers[tiers[0]]!;
  const related = (await listPackages({ city: p.departureCity }, 20)).filter((r) => r.code !== p.code).slice(0, 3);
  const closed = p.status === "sold" || p.status === "closed" || p.departDate < new Date().toISOString().slice(0, 10);
  const waText = `Assalam o Alaikum, I am interested in Umrah package ${p.code} (${p.departureCity}, ${fmtDate(p.departDate)}, ${p.days} days). Travellers: __ Room: __`;
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.title, sku: p.code, brand: { "@type": "Brand", name: "PunjKash" },
    description: `Umrah package from ${p.departureCity}, ${p.days} days, ${pk.mName} and ${pk.dName}.`,
    offers: tiers.map((t) => ({ "@type": "Offer", name: `${t} room, per person`, priceCurrency: "PKR", price: pk.tiers[t], availability: closed ? "https://schema.org/SoldOut" : "https://schema.org/InStock", url: `${site.url}/umrah/${p.slug}`, validFrom: new Date().toISOString().slice(0, 10) })),
  };
  return (
    <div className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 28 }}>
      <nav className="faint" style={{ fontSize: 14 }}><Link href="/">Home</Link> › <Link href="/umrah">Umrah</Link> › <Link href={`/umrah?city=${p.departureCity}`}>{p.departureCity}</Link> › {p.code}</nav>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: 28 }} className="grid g2">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><span className="tag">Ref {p.code}</span><span className="tag tag-gold">{p.days} days</span>{p.seats != null && <span className="tag tag-few">{p.seats} seats available</span>}{closed && <span className="tag tag-few">Departed or sold out</span>}</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,42px)" }}>{p.days} Days Umrah from {p.departureCity}{p.airline ? `, ${p.airline}` : ""}</h1>
          <div className="photo" style={{ height: 300 }}>Photo: {pk.mName}, real photograph to be added</div>

          <div className="card" style={{ gap: 0 }}>
            <table className="tiers"><thead><tr><th>Room type</th><th>Per person</th><th></th></tr></thead><tbody>
              {tiers.map((t) => <tr key={t}><td style={{ textTransform: "capitalize", fontWeight: 600 }}>{t}</td><td className="price" style={{ fontSize: 22 }}>{pkr(pk.tiers[t]!)}</td><td style={{ textAlign: "right" }}><a className="btn btn-wa btn-sm" href={waLink(waText.replace("Room: __", `Room: ${t}`))}>Book {t}</a></td></tr>)}
              {p.childWithoutBed && <tr><td>Child without bed</td><td className="price" style={{ fontSize: 22 }}>{pkr(p.childWithoutBed)}</td><td></td></tr>}
              {p.childWithBedRule && <tr><td>Child with bed</td><td>{p.childWithBedRule}</td><td></td></tr>}
              {p.infant && <tr><td>Infant</td><td className="price" style={{ fontSize: 22 }}>{pkr(p.infant)}</td><td></td></tr>}
            </tbody></table>
            {p.discountBadge && <div className="notice" style={{ marginTop: 12 }}>A discount is available on this package when you book by phone. Ask for it.</div>}
          </div>

          <div className="grid g2">
            <div className="card"><span className="faint" style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" }}>Makkah hotel</span><h3>{pk.mName}</h3><span className="muted">{dist(pk.mDist, pk.mLabel)}{p.nightsMakkah ? ` · ${p.nightsMakkah} nights` : ""}</span></div>
            <div className="card"><span className="faint" style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" }}>Madinah hotel</span><h3>{pk.dName}</h3><span className="muted">{dist(pk.dDist, pk.dLabel)}{p.nightsMadinah ? ` · ${p.nightsMadinah} nights` : ""}</span></div>
          </div>

          <div className="card" style={{ gap: 12 }}>
            <h3>Flights and dates</h3>
            <div className="grid g2" style={{ gap: 10 }}>
              <div><span className="faint" style={{ fontSize: 13 }}>Departure</span><div style={{ fontWeight: 600 }}>{fmtDate(p.departDate)}{p.flightOut ? ` · ${p.flightOut}` : ""}</div><div className="muted">{p.departureCity} to Jeddah{p.airline ? `, ${p.airline}` : ""}</div></div>
              <div><span className="faint" style={{ fontSize: 13 }}>Return</span><div style={{ fontWeight: 600 }}>{p.returnDate ? fmtDate(p.returnDate) : `After ${p.days} days`}{p.flightBack ? ` · ${p.flightBack}` : ""}</div><div className="muted">Jeddah to {p.departureCity}</div></div>
            </div>
            {p.luggage && <div className="muted">Luggage: {p.luggage}</div>}
          </div>

          <div className="card" style={{ gap: 10 }}>
            <h3>What is included</h3>
            <ul className="muted" style={{ margin: 0, paddingLeft: 20, columns: 2, gap: 24 }}>{(p.inclusions ?? []).map((i) => <li key={i}>{i}</li>)}</ul>
            <p className="faint" style={{ margin: 0, fontSize: 14 }}>Hotels are as named or similar in the same category. Prices are per person in PKR and hold for 7 days from a written quotation. Supplier cancellation rules apply and are stated on the quotation.</p>
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 16, alignSelf: "start", position: "sticky", top: 90 }}>
          <div className="card" style={{ gap: 14, borderColor: "var(--gold)" }}>
            <div><span className="faint" style={{ fontSize: 13 }}>From, {tiers[0]} room, per person</span><div className="price" style={{ fontSize: 32 }}>{pkr(from)}</div></div>
            <a className="btn btn-wa" href={waLink(waText)}>Get this quote on WhatsApp</a>
            <a className="btn btn-line" href={`tel:+${site.partners[0].wa}`}>Call {site.partners[0].phone}</a>
            <span className="faint" style={{ fontSize: 14 }}>Quote the reference {p.code}. {site.partners[0].name} or {site.partners[1].name} will answer.</span>
          </div>
          <div className="card" style={{ gap: 12 }}>
            <h3 style={{ fontSize: 18 }}>Or send an enquiry</h3>
            <LeadForm code={p.code} pagePath={`/umrah/${p.slug}`} />
          </div>
        </aside>
      </div>

      {related.length > 0 && <section style={{ display: "flex", flexDirection: "column", gap: 12 }}><h2>Other departures from {p.departureCity}</h2>{related.map((r) => <PackageRow key={r.id} p={r} />)}</section>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
