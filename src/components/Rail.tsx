"use client";
import { useEffect, useRef, useState } from "react";

export default function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [can, setCan] = useState({ l: false, r: true });
  const update = () => {
    const el = ref.current; if (!el) return;
    setCan({ l: el.scrollLeft > 8, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 8 });
  };
  useEffect(() => { update(); const el = ref.current; if (!el) return; const ro = new ResizeObserver(update); ro.observe(el); return () => ro.disconnect(); }, []);
  const go = (d: number) => { const el = ref.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.85, behavior: "smooth" }); };
  // mouse drag for desktop
  const drag = useRef<{ x: number; s: number } | null>(null);
  return (
    <div className="rail-wrap">
      <div className="rail" ref={ref} onScroll={update} role="region" aria-label={label} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
        onMouseDown={(e) => { drag.current = { x: e.clientX, s: ref.current!.scrollLeft }; }}
        onMouseMove={(e) => { if (drag.current && ref.current) { ref.current.scrollLeft = drag.current.s - (e.clientX - drag.current.x); } }}
        onMouseUp={() => { drag.current = null; }} onMouseLeave={() => { drag.current = null; }}>
        {children}
      </div>
      {can.l && <button type="button" className="rail-btn l" aria-label={`${label}: previous`} onClick={() => go(-1)}>‹</button>}
      {can.r && <button type="button" className="rail-btn r" aria-label={`${label}: next`} onClick={() => go(1)}>›</button>}
    </div>
  );
}
