"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { links, nav, profile } from "@/data/portfolio";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ft-giant", {
          yPercent: 60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const year = new Date().getFullYear();

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-white/5 pt-16">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl">{profile.name}</p>
          <p className="mt-2 text-sm text-muted">{profile.role}</p>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm md:col-span-4">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="link-underline text-fg/60 hover:text-fg">{n.label}</a>
            </li>
          ))}
          <li>
            <a href={links.github} target="_blank" rel="noreferrer noopener" className="link-underline text-fg/60 hover:text-fg">GitHub</a>
          </li>
        </ul>
        <div className="flex md:col-span-3 md:justify-end">
          <Magnetic>
            <a href="#top" aria-label="Back to top" data-cursor="Top" className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-bg">
              ↑
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-wrap justify-between gap-2 text-xs text-muted">
        <span>© {year} {profile.name}</span>
        <span>Built with Next.js, GSAP & Three.js</span>
      </div>
      <div aria-hidden className="ft-giant font-display pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[27vw] leading-[0.78] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]">
        {profile.lastName}
      </div>
    </footer>
  );
}
