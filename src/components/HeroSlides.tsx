"use client";
import { useEffect, useState } from "react";

export type Slide = { img: string; alt: string; place: string; line: string; href: string };

export default function HeroSlides({ slides, interval = 5500 }: { slides: Slide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval, paused]);
  return (
    <div className="slides" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, k) => (
        <img key={s.img} src={s.img} alt={s.alt} className={k === i ? "on" : ""} fetchPriority={k === 0 ? "high" : "low"} loading={k === 0 ? "eager" : "lazy"} decoding="async" />
      ))}
      <a className="slide-tag" href={slides[i].href} key={slides[i].place}><b>{slides[i].place}</b><span>{slides[i].line}</span></a>
      <div className="slide-dots" role="tablist" aria-label="Destinations">{slides.map((s, k) => <button key={s.img} type="button" role="tab" aria-selected={k === i} aria-label={s.place} onClick={() => setI(k)} />)}</div>
    </div>
  );
}
