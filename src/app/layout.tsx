import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/source-sans-3";
import Link from "next/link";
import "./globals.css";
import { site, waLink } from "@/lib/site";


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Flights, Holidays, Umrah & Hajj from Pakistan · ${site.partners[0].phone}`, template: `%s · PunjKash` },
  description: "Flights, holidays, Umrah and Hajj packages, tours of Pakistan, hotels and visa support. Every hotel named, every price per room type, written quotation before you pay. Lahore, Pakistan.",
  openGraph: { siteName: site.name, type: "website", locale: "en_PK" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org", "@type": "TravelAgency", name: site.legalName, url: site.url, email: site.email,
    telephone: "+92 300 9395444", address: { "@type": "PostalAddress", streetAddress: "12 Commercial, Sector G, DHA Phase 1", addressLocality: "Lahore", addressCountry: "PK" },
    taxID: site.ntn, areaServed: "PK",
  };
  return (
    <html lang="en">
      <body>
        <header className="site">
          <div className="wrap row">
            <Link href="/" aria-label="PunjKash home"><img src="/logo-navy.png" alt="PunjKash, where every journey leads further" style={{ height: 48, width: "auto" }} /></Link>
            <nav>{site.nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <a href={`tel:+${site.partners[0].wa}`} style={{ fontWeight: 600 }}>{site.partners[0].phone}</a>
              <a className="btn btn-navy btn-sm" href={waLink("Assalam o Alaikum, I want to plan a trip with PunjKash.")}>WhatsApp us</a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site">
          <div className="wrap cols">
            <div><img src="/logo-navy.png" alt="PunjKash" style={{ height: 42, width: "auto" }} /><span>{site.legalName}<br />{site.address}<br />NTN {site.ntn}</span></div>
            <div><strong>Services</strong>{site.nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</div>
            <div><strong>Talk to us</strong>{site.partners.map((p) => <a key={p.wa} href={`tel:+${p.wa}`}>{p.name} · {p.phone}</a>)}<a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><strong>Company</strong><Link href="/about">About</Link><Link href="/how-to-book">How to book and pay</Link><Link href="/policies">Policies</Link><Link href="/contact">Contact</Link></div>
          </div>
        </footer>
        <a className="wa-float" href={waLink("Assalam o Alaikum, I have a question about a PunjKash package.")} aria-label="Chat on WhatsApp">WhatsApp</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </body>
    </html>
  );
}
