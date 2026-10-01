"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Animated line-art divider that draws itself as it scrolls into view. */
export default function Divider({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 45%", scrub: 0.8 },
        });
        tl.from(".dv-line", { drawSVG: "50% 50%", ease: "none" })
          .from(".dv-wave", { drawSVG: "0%", ease: "none" }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="container-x" aria-hidden>
      <div className="flex items-center gap-4">
        {label && <span className="eyebrow shrink-0">{label}</span>}
        <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="h-6 w-full" fill="none">
          <path className="dv-line" d="M0 12 H1200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <path
            className="dv-wave"
            d="M520 12 C540 2 560 22 580 12 C600 2 620 22 640 12 C660 2 680 22 700 12"
            stroke="url(#dv-grad)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="dv-grad" x1="520" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#5eead4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
