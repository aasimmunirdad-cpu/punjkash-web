"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { I } from "./Icons";
import { waLink } from "@/lib/site";

export default function BottomNav() {
  const path = usePathname();
  const is = (p: string) => (p === "/" ? path === "/" : path.startsWith(p));
  return (
    <nav className="bottom-nav" aria-label="Main">
      <Link href="/" aria-current={is("/") ? "page" : undefined}><I.home />Home</Link>
      <Link href="/umrah" aria-current={is("/umrah") ? "page" : undefined}><I.search />Search</Link>
      <Link href="/offers" aria-current={is("/offers") ? "page" : undefined}><I.tag />Offers</Link>
      <Link href="/bookings" aria-current={is("/bookings") ? "page" : undefined}><I.ticket />Bookings</Link>
      <a className="wa" href={waLink("Assalam o Alaikum")}><I.wa />WhatsApp</a>
    </nav>
  );
}
