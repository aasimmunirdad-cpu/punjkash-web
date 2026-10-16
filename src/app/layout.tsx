import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/source-sans-3";
import Link from "next/link";
import "./globals.css";
import { site, waLink } from "@/lib/site";
import { I } from "@/components/Icons";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Flights, Holidays, Umrah & Hajj from Pakistan · ${site.partners[0].phone}`, template: `%s · PunjKash` },
  description: "Flights, holidays, Umrah and Hajj packages, tours of Pakistan, hotels and visa support. Every hotel named, every price per room type, reserve online with a deposit. Lahore, Pakistan.",
  openGraph: { siteName: site.name, type: "website", locale: "en_PK", images: ["/img/makkah.webp"] },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "PunjKash", statusBarStyle: "default" },
  icons: { icon: "/icon-192.png", apple: "/icon-180.png" },
};
export const viewport: Viewport = { themeColor: "#FBFAF7", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = { "@context": "https://schema.org", "@type": "TravelAgency", name: site.legalName, alternateName: ["PunjKash", "Punj Kash", "PunjKash Travel", "پنج کاش"], url: site.url, email: site.email, telephone: "+92 300 9395444", address: { "@type": "PostalAddress", streetAddress: "12 Commercial, Sector G, DHA Phase 1", addressLocality: "Lahore", addressCountry: "PK" }, taxID: site.ntn, areaServed: "PK" };
  return (
    <html lang="en">
      <body>
        <header className="site">
          <div className="wrap row">
            <Link href="/" aria-label="PunjKash home"><img src="/logo-navy.png" alt="PunjKash" style={{ height: 40, width: "auto" }} /></Link>
            <nav>{site.nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
            <div className="right">
              <a className="phone" href={`tel:+${site.partners[0].wa}`}>{site.partners[0].phone}</a>
              <a className="btn btn-navy btn-sm" href={waLink("Assalam o Alaikum, I want to plan a trip with PunjKash.")}><I.wa /> WhatsApp</a>
              <a className="menu-btn" href="#menu" aria-label="Open menu"><I.menu /></a>
            </div>
          </div>
        </header>
        <div id="menu" className="menu-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0 12px" }}><img src="/logo-navy.png" alt="PunjKash" style={{ height: 40, width: "auto" }} /><a className="menu-btn" href="#" aria-label="Close menu"><I.close /></a></div>
          {site.nav.map((n) => <a key={n.href} className="item" href={n.href}>{n.label}<span className="faint">›</span></a>)}
          <a className="item" href="/bookings">My bookings<span className="faint">›</span></a>
          <a className="item" href="/about">About PunjKash<span className="faint">›</span></a>
          <img src="/urdu-gold.png" alt="پنج کاش" style={{ height: 30, width: "auto", margin: "14px 0 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 18 }}>
            {site.partners.map((p) => <a key={p.wa} className="btn btn-line" href={`tel:+${p.wa}`}><I.phone /> {p.name} · {p.phone}</a>)}
          </div>
        </div>
        <main>{children}</main>
        <footer className="site">
          <div className="wrap cols">
            <div><img src="/logo-white.png" alt="PunjKash" style={{ height: 40, width: "auto", alignSelf: "flex-start" }} /><img src="/urdu-gold.png" alt="پنج کاش" style={{ height: 34, width: "auto", alignSelf: "flex-start", margin: "4px 0 2px" }} /><span>{site.legalName}<br />{site.address}<br />NTN {site.ntn}</span></div>
            <div><strong>Travel</strong>{site.nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</div>
            <div><strong>Talk to us</strong>{site.partners.map((p) => <a key={p.wa} href={`tel:+${p.wa}`}>{p.name} · {p.phone}</a>)}<a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><strong>Company</strong><Link href="/about">About</Link><Link href="/how-to-book">How to book and pay</Link><Link href="/policies">Policies</Link><Link href="/contact">Contact</Link><Link href="/credits">Photo credits</Link></div>
          </div>
        </footer>
        <a className="wa-float" href={waLink("Assalam o Alaikum, I have a question about a PunjKash package.")} aria-label="Chat on WhatsApp"><I.wa /> WhatsApp</a>
        <BottomNav />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </body>
    </html>
  );
}
