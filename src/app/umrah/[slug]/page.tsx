import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackage, listPackages, TIERS } from "@/lib/packages";
import PackageRow from "@/components/PackageRow";
import { I } from "@/components/Icons";
import { fmtDate, pkr, site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

const dist = (m: number | null, l: string | null) => (m ? `${m} m from the Haram` : l ?? "Distance on request");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pk = await getPackage((await params).slug);
  if (!pk) return {};
  const from = TIERS.map((t) => pk.tiers[t]).filter(Boolean)[0];
  return {
    title: `${pk.p.days} Days Umrah from ${pk.p.departureCity}, ${fmtDate(pk.p.departDate)}, from ${pkr(from ?? 0)} (${pk.p.code})`,
    description: `${pk.p.airline ?? ""} ${pk.p.departureCity} to Jeddah. Makkah: ${pk.mName} (${dist(pk.mDist, pk.mLabel)}). Madinah: ${pk.dName} (${dist(pk.dDist, pk.dLabel)}). Sharing, Quad, Triple, Double prices. Reserve online with PunjKash.`,
    openGraph: { images: ["/img/makkah.webp"] },
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
  const waText = `Assalam o Alaikum, I am interested in Umrah package ${p.code} (${p.departureCity}, ${fmtDate(p.departDate)}, ${p.days} days).`;
  const reserve = (room?: string) => `/reserve?pkg=${p.code}${room ? `&room=${room}` : ""}`;
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.title, sku: p.code, brand: { "@type": "Brand", name: "PunjKash" }, image: `${site.url}/img/makkah.webp`,
    description: `Umrah package from ${p.departureCity}, ${p.days} days, ${pk.mName} and ${pk.dName}.`,
    offers: tiers.map((t) => ({ "@type": "Offer", name: `${t} room, per person`, priceCurrency: "PKR", price: pk.tiers[t], availability: closed ? "https://schema.org/SoldOut" : "https://schema.org/InStock", url: `${site.url}/umrah/${p.slug}` })),
  };
  const Fact = ({ k, v }: { k: string; v: React.ReactNode }) => <div><div className="tiny muted">{k}</div><div style={{ fontWeight: 600 }}>{v}</div></div>;
  return (
    <div className="wrap" style={{ padding: "16px 16px 48px", display: "grid", gap: 24 }}>
      <nav className="small faint"><Link href="/">Home</Link> › <Link href="/umrah">Umrah</Link> › <Link href={`/umrah?city=${p.departureCity}`}>{p.departureCity}</Link> › {p.code}</nav>

      <div className="gallery">
        <img src="/img/makkah.webp" alt="Masjid al-Haram, Makkah" />
        <img src="/img/madinah-800.webp" alt="Al-Masjid an-Nabawi, Madinah" loading="lazy" />
        <img src="/img/makkah-800.webp" alt="Pilgrims at the Kaaba" loading="lazy" />
      </div>

      <div className="product">
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><span className="chip">{p.days} days</span><span className="chip">{p.nightsMakkah ?? 0}N Makkah · {p.nightsMadinah ?? 0}N Madinah</span>{p.seats != null && p.seats <= 10 && <span className="chip chip-hot">Only {p.seats} seats left</span>}{p.discountBadge && <span className="chip chip-gold">Discount on call</span>}{closed && <span className="chip chip-hot">Departed or sold out</span>}</div>
            <h1 style={{ fontSize: "clamp(26px,3.6vw,40px)" }}>{p.days} Days Umrah from {p.departureCity}{p.airline ? ` with ${p.airline}` : ""}</h1>
            <p className="muted">Departs {fmtDate(p.departDate)}{p.returnDate ? `, returns ${fmtDate(p.returnDate)}` : ""}. Reference {p.code}.</p>
          </div>

          <div className="card"><div className="card-body" style={{ gap: 0 }}>
            <h3 style={{ marginBottom: 6 }}>Price per person</h3>
            <table className="tiers-t"><thead><tr><th>Room</th><th>Per person</th><th></th></tr></thead><tbody>
              {tiers.map((t) => <tr key={t}><td style={{ fontWeight: 600 }}><span style={{ textTransform: "capitalize" }}>{t}</span><div className="tiny muted" style={{ fontWeight: 400 }}>{{ sharing: "5 to a room", quad: "4 to a room", triple: "3 to a room", double: "2 to a room" }[t]}</div></td><td className="price" style={{ fontSize: 20 }}><small>PKR</small> {pk.tiers[t]!.toLocaleString("en-PK")}</td><td style={{ textAlign: "right" }}>{!closed && <Link className="btn btn-gold btn-sm" href={reserve(t)}>Reserve</Link>}</td></tr>)}
              {p.childWithoutBed && <tr><td>Child without bed<div className="tiny muted">2 to 11 years</div></td><td className="price" style={{ fontSize: 20 }}><small>PKR</small> {p.childWithoutBed.toLocaleString("en-PK")}</td><td></td></tr>}
              {p.childWithBedRule && <tr><td>Child with bed</td><td className="small">{p.childWithBedRule}</td><td></td></tr>}
              {p.infant && <tr><td>Infant<div className="tiny muted">Under 2</div></td><td className="price" style={{ fontSize: 20 }}><small>PKR</small> {p.infant.toLocaleString("en-PK")}</td><td></td></tr>}
            </tbody></table>
            {p.discountBadge && <div className="notice" style={{ marginTop: 12 }}>A further discount is available on this package when you confirm by phone. Ask for it.</div>}
          </div></div>

          <div className="grid g2">
            <div className="card card-body"><div className="tiny muted">Makkah hotel · {p.nightsMakkah ?? 0} nights</div><h3>{pk.mName}</h3><span className="muted small">{dist(pk.mDist, pk.mLabel)}</span></div>
            <div className="card card-body"><div className="tiny muted">Madinah hotel · {p.nightsMadinah ?? 0} nights</div><h3>{pk.dName}</h3><span className="muted small">{dist(pk.dDist, pk.dLabel)}</span></div>
          </div>

          <div className="card card-body">
            <h3>Flights and transport</h3>
            <div className="grid g2" style={{ gap: 14 }}>
              <Fact k="Outbound" v={<>{fmtDate(p.departDate)}{p.flightOut ? ` · ${p.flightOut}` : ""}<div className="small muted" style={{ fontWeight: 400 }}>{p.departureCity} to Jeddah{p.airline ? `, ${p.airline}` : ""}</div></>} />
              <Fact k="Return" v={<>{p.returnDate ? fmtDate(p.returnDate) : `After ${p.days} days`}{p.flightBack ? ` · ${p.flightBack}` : ""}<div className="small muted" style={{ fontWeight: 400 }}>Jeddah to {p.departureCity}</div></>} />
              <Fact k="Ground transport" v={p.transport ?? "Included between airport, Makkah and Madinah"} />
              <Fact k="Luggage" v={p.luggage ?? "As per airline"} />
            </div>
          </div>

          <div className="card card-body">
            <h3>What is included</h3>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 6 }}>{(p.inclusions ?? []).map((i) => <li key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--green)", flex: "none" }}><I.check /></span>{i}</li>)}</ul>
            {(p.exclusions ?? []).length > 0 && <><h3 style={{ fontSize: 16, marginTop: 8 }}>Not included</h3><ul className="muted small" style={{ margin: 0, paddingLeft: 18 }}>{(p.exclusions ?? []).map((i) => <li key={i}>{i}</li>)}</ul></>}
            <p className="tiny faint">Hotels are as named or similar in the same category. Prices are per person in PKR and are held once your deposit is received. Supplier cancellation rules apply and are stated on your booking confirmation.</p>
          </div>

          <div className="card card-body"><h3>How reserving works</h3><div className="steps"><div><b>Reserve</b><span>Choose a room type, enter traveller names as on passports.</span></div><div><b>Deposit</b><span>Pay PKR 50,000 per person by bank transfer, JazzCash or Easypaisa and upload the receipt. Your PK reference is issued at once.</span></div><div><b>Balance</b><span>Due 45 days before departure. Vouchers and tickets follow.</span></div></div></div>
        </div>

        <aside className="sticky-side" style={{ display: "grid", gap: 14 }}>
          <div className="card card-body" style={{ borderColor: "var(--gold)", gap: 12 }}>
            <div><div className="tiny muted">From, {tiers[0]} room, per person</div><div className="price" style={{ fontSize: 32 }}><small>PKR</small> {from.toLocaleString("en-PK")}</div></div>
            {!closed ? <Link className="btn btn-gold btn-block" href={reserve()}>Reserve this package</Link> : <span className="notice">This departure has closed. See the other dates below.</span>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><a className="btn btn-wa btn-sm" href={waLink(waText)}><I.wa /> WhatsApp</a><a className="btn btn-line btn-sm" href={`tel:+${site.partners[0].wa}`}><I.phone /> Call</a></div>
            <span className="tiny muted">Deposit PKR 50,000 per person. Balance 45 days before departure. {site.partners[0].name} answers on {site.partners[0].phone}.</span>
          </div>
          <div className="card card-body small muted" style={{ gap: 6 }}><b style={{ color: "var(--ink)" }}>Why people book with PunjKash</b><span><I.check /> Hotel and distance named before you pay</span><span><I.check /> Written confirmation with a PK reference</span><span><I.check /> Two directors you can call by name</span></div>
        </aside>
      </div>

      {related.length > 0 && <section style={{ display: "grid", gap: 12 }}><h2>Other departures from {p.departureCity}</h2>{related.map((r, i) => <PackageRow key={r.id} p={r} photo={i % 2 ? "/img/madinah-800.webp" : "/img/makkah-800.webp"} />)}</section>}

      {!closed && <div className="action-bar"><div><div className="tiny muted">From, per person</div><div className="price" style={{ fontSize: 20 }}><small>PKR</small> {from.toLocaleString("en-PK")}</div></div><div style={{ display: "flex", gap: 8 }}><a className="btn btn-wa btn-sm" href={waLink(waText)} aria-label="WhatsApp"><I.wa /></a><Link className="btn btn-gold btn-sm" href={reserve()}>Reserve</Link></div></div>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
