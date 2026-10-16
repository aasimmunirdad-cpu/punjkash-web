import Link from "next/link";
import SearchCard from "@/components/SearchCard";
import Rail from "@/components/Rail";
import HeroSlides, { type Slide } from "@/components/HeroSlides";
import PackageRow from "@/components/PackageRow";
import { I } from "@/components/Icons";
import { listPackages } from "@/lib/packages";
import { destinations, flightRoutes, holidays, tours, SAMPLE } from "@/lib/catalog";
import { pkr, site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

const SLIDES: Slide[] = [
  { img: "/img/maldives.webp", alt: "Maldives lagoon", place: "Maldives", line: "Honeymoon, 4 nights from 385,000", href: "/holidays/maldives-4-nights" },
  { img: "/img/dubai.webp", alt: "Dubai skyline", place: "Dubai", line: "Flights from 72,900 return", href: "/flights?from=LHE&to=Dubai" },
  { img: "/img/makkah.webp", alt: "Masjid al-Haram, Makkah", place: "Makkah", line: "Umrah from PKR 260,500", href: "/umrah" },
  { img: "/img/hunza.webp", alt: "Hunza valley", place: "Hunza", line: "7 days in the north from 98,000", href: "/tours/hunza-7-days" },
  { img: "/img/istanbul.webp", alt: "Istanbul at sunset", place: "Istanbul", line: "5 nights from 245,000", href: "/holidays/istanbul-5-nights" },
  { img: "/img/skardu.webp", alt: "Skardu", place: "Skardu", line: "6 days from 112,000", href: "/tours/skardu-6-days" },
  { img: "/img/madinah.webp", alt: "Al-Masjid an-Nabawi, Madinah", place: "Madinah", line: "Ramadan 2027 is open", href: "/umrah?month=2027-03" },
  { img: "/img/baku.webp", alt: "Baku at night", place: "Baku", line: "5 nights from 215,000", href: "/holidays/baku-5-nights" },
];

const IMG: Record<string, string> = { dubai: "dubai", istanbul: "istanbul", baku: "baku", kl: "kl", bangkok: "bangkok", maldives: "maldives", srilanka: "srilanka", egypt: "egypt", georgia: "georgia", london: "london", turkey: "turkey" };
const holidayImg = (slug: string) => { const k = Object.keys(IMG).find((k) => slug.startsWith(k) || (k === "kl" && slug.startsWith("kuala")) || (k === "srilanka" && slug.startsWith("sri")) || (k === "turkey" && slug.startsWith("turkey"))); return `/img/${k ?? "dubai"}-800.webp`; };
const tourImg = (slug: string) => { const k = ["hunza", "neelum", "skardu", "lahore", "swat", "naran", "murree"].find((k) => slug.startsWith(k)); return `/img/${k ?? "hunza"}-800.webp`; };

export default async function Home() {
  const pkgs = await listPackages({}, 4);
  const deals = [...flightRoutes].filter((f) => f.cabin === "Economy" && !["ISB", "KHI", "LHE", "KDU", "GIL"].includes(f.toIata)).sort((a, b) => a.fare - b.fare).slice(0, 6);
  return (
    <>
      <section className="hero">
        <HeroSlides slides={SLIDES} />
        <div className="wrap">
          <h1>Every journey, one honest price.</h1>
          <p>Flights, Umrah, holidays, honeymoons, tours, hotels and visas. Every trip from Lahore, priced in full and reserved online in three steps.</p>
        </div>
      </section>

      <div className="wrap search-wrap">
        <SearchCard />
        <div className="trust">
          <div><I.shield /> Reserve online, pay a deposit</div>
          <div><I.check /> Hotel and distance on every package</div>
          <div><I.doc /> Instant booking reference</div>
          <div><I.phone /> A real person on the phone, 7 days</div>
        </div>
      </div>

      <section className="section wrap">
        <div className="section-head"><div><h2>Where next?</h2><p>Pick a place, see what it costs.</p></div><Link className="more" href="/holidays">All destinations</Link></div>
        <Rail label="Destinations">
          {destinations.map((d) => (
            <Link key={d.name} href={d.href} className="tile"><img src={`/img/${d.img}-800.webp`} alt={d.name} loading="lazy" width={800} height={600} /><div><b>{d.name}</b><span>{d.tag}</span></div></Link>
          ))}
        </Rail>
      </section>

      <section className="section wrap">
        <div className="section-head"><div><h2>Umrah departing soon</h2><p>Named hotels, measured distances, four room types priced.</p></div><Link className="more" href="/umrah">All {" "}departures</Link></div>
        <div style={{ display: "grid", gap: 12 }}>{pkgs.map((p, i) => <PackageRow key={p.id} p={p} photo={i % 2 ? "/img/madinah-800.webp" : "/img/makkah-800.webp"} />)}</div>
      </section>

      <section className="section wrap">
        <div className="promo"><img src="/img/madinah.webp" alt="" loading="lazy" />
          <div style={{ maxWidth: 560 }}><h2 style={{ color: "#fff" }}>Ramadan 2027 Umrah is open</h2><p style={{ opacity: .92, marginTop: 6 }}>Last ten nights fill first. Hold your room with a deposit today; the balance is due 45 days before departure.</p></div>
          <Link className="btn btn-gold" href="/umrah?month=2027-03">See Ramadan packages</Link>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head"><div><h2>Flight deals</h2><p>Return, per adult, taxes included.</p></div><Link className="more" href="/flights">All routes</Link></div>
        <div className="grid g3">
          {deals.map((f) => (
            <Link key={f.fromIata + f.toIata + f.airline} href={`/flights?from=${f.fromIata}&to=${f.to}`} className="card" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", gap: 12 }}>
              <div><div style={{ fontWeight: 700, fontSize: 17 }}>{f.from} <span className="faint">→</span> {f.to}</div><div className="small muted">{f.airline} · {f.stops}</div></div>
              <div className="price" style={{ fontSize: 20 }}><small>PKR</small> {f.fare.toLocaleString("en-PK")}</div>
            </Link>
          ))}
        </div>
        {SAMPLE && <p className="tiny faint" style={{ marginTop: 8 }}>Sample fares shown for preview. Live fares at launch.</p>}
      </section>

      <section className="section wrap">
        <div className="section-head"><div><h2>Holidays abroad</h2><p>Flights, hotel, transfers and visa in one price.</p></div><Link className="more" href="/holidays">All holidays</Link></div>
        <Rail label="Holidays abroad">
          {holidays.slice(0, 8).map((h) => (
            <Link key={h.slug} href={`/holidays/${h.slug}`} className="card"><div className="card-photo"><img src={holidayImg(h.slug)} alt={h.city} loading="lazy" width={800} height={600} /></div>
              <div className="card-body"><span className="chip" style={{ alignSelf: "flex-start" }}>{h.nights} nights · {h.stars}</span><h3>{h.title}</h3><span className="small muted">{h.highlight}</span><div className="price" style={{ fontSize: 20, marginTop: "auto" }}><small>from PKR</small> {h.from.toLocaleString("en-PK")}</div></div></Link>
          ))}
        </Rail>
      </section>

      <section className="section wrap">
        <div className="section-head"><div><h2>Pakistan, properly</h2><p>Punjab, Kashmir and the north. Private cars or small groups.</p></div><Link className="more" href="/tours">All tours</Link></div>
        <Rail label="Tours of Pakistan">
          {tours.map((t) => (
            <Link key={t.slug} href={`/tours/${t.slug}`} className="card"><div className="card-photo"><img src={tourImg(t.slug)} alt={t.title} loading="lazy" width={800} height={600} /></div>
              <div className="card-body"><span className="chip" style={{ alignSelf: "flex-start" }}>{t.days} days · {t.type}</span><h3>{t.title}</h3><span className="small muted">{t.region} · {t.season}</span><div className="price" style={{ fontSize: 20, marginTop: "auto" }}><small>from PKR</small> {t.from.toLocaleString("en-PK")}</div></div></Link>
          ))}
        </Rail>
      </section>

      <section className="section wrap">
        <div className="grid g3">
          <div className="card card-body"><I.kaaba /><h3>Hajj 2027</h3><p className="small muted">Registration opens with the Saudi announcement. Join the list and we call you first.</p><Link className="more" href="/hajj" style={{ alignSelf: "flex-start" }}>Join the Hajj list</Link></div>
          <div className="card card-body"><I.passport /><h3>Visas done right</h3><p className="small muted">Checklists, fees and filing for UAE, Turkey, Malaysia, Thailand, Azerbaijan, UK and Schengen.</p><Link className="more" href="/visas" style={{ alignSelf: "flex-start" }}>Check a visa</Link></div>
          <div className="card card-body"><I.user /><h3>Groups and families</h3><p className="small muted">Ten or more travellers, a family Umrah, a company retreat. One quote, one person handling it.</p><a className="more" href={waLink("Assalam o Alaikum, I want a group quote.")} style={{ alignSelf: "flex-start" }}>Ask for a group quote</a></div>
        </div>
      </section>

      <section className="wrap" style={{ textAlign: "center", padding: "20px 16px 8px" }}>
        <p lang="ur" dir="rtl" style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontWeight: 700, color: "var(--gold)", fontSize: "clamp(44px,9vw,80px)", lineHeight: 1.7, margin: 0 }}>پنج کاش</p>
      </section>

      <section className="section wrap" style={{ paddingBottom: 48 }}>
        <div className="steps">
          <div><b>Choose</b><span>Search, compare hotels and prices, pick a room type.</span></div>
          <div><b>Reserve</b><span>Enter travellers, pay a deposit by bank, JazzCash or Easypaisa.</span></div>
          <div><b>Travel</b><span>Get your PK reference at once, vouchers and tickets before you fly.</span></div>
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>{site.legalName}, Lahore. Prefer a conversation? {site.partners[0].name} answers on {site.partners[0].phone}.</p>
      </section>
    </>
  );
}
