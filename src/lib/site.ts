export const site = {
  name: "PunjKash Travel & Tourism",
  legalName: "PunjKash Travel & Tourism (Private) Limited",
  tagline: "where every journey leads further",
  url: "https://www.punjkash.com",
  email: "hello@punjkash.com",
  address: "12 Commercial, Sector G, DHA Phase 1, Lahore, Pakistan",
  ntn: "J899985",
  partners: [
    { name: "Dr Aasim Munir Dad", role: "Co-Founder & Director", phone: "0300 9395444", wa: "923009395444" },
    { name: "Ghulam Mustafa", role: "Co-Founder & CEO", phone: "0324 4948850", wa: "923244948850" },
  ],
  nav: [
    { href: "/flights", label: "Flights" },
    { href: "/holidays", label: "Holidays" },
    { href: "/umrah", label: "Umrah & Hajj" },
    { href: "/tours", label: "Tours" },
    { href: "/hotels", label: "Hotels" },
    { href: "/visas", label: "Visas" },
    { href: "/offers", label: "Special offers" },
  ],
};

export const waLink = (text: string, who = 0) =>
  `https://wa.me/${site.partners[who].wa}?text=${encodeURIComponent(text)}`;

export const pkr = (n: number) => "PKR " + n.toLocaleString("en-PK");

export const fmtDate = (d: string | Date) =>
  new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });

export const monthLabel = (d: string | Date) =>
  new Date(d).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
