import SearchCard from "./SearchCard";

type Tab = "umrah" | "flights" | "holidays" | "hotels" | "tours" | "visas";
export default function PageHero({ img, alt, title, intro, tab }: { img: string; alt: string; title: string; intro?: string; tab?: Tab }) {
  return (
    <>
      <section className="hero" style={{ minHeight: tab ? 280 : 220 }}>
        <img className="bg" src={`/img/${img}.webp`} srcSet={`/img/${img}-800.webp 800w, /img/${img}.webp 1600w`} sizes="100vw" alt={alt} fetchPriority="high" />
        <div className="wrap" style={{ paddingBottom: tab ? 90 : 28 }}><h1 style={{ fontSize: "clamp(26px,4vw,40px)" }}>{title}</h1>{intro && <p>{intro}</p>}</div>
      </section>
      {tab && <div className="wrap search-wrap" style={{ marginTop: -70 }}><SearchCard initial={tab} /></div>}
    </>
  );
}
