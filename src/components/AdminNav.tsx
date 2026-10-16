"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AdminNav({ items }: { items: [string, string][] }) {
  const path = usePathname();
  return <>{items.map(([h, l]) => <Link key={h} className={`btn btn-sm ${(h === "/admin" ? path === h : path.startsWith(h)) ? "btn-navy" : "btn-line"}`} href={h}>{l}</Link>)}</>;
}
