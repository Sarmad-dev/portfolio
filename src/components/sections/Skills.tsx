"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { marquee, skills, type SkillGroup } from "@/data/portfolio";
import RevealText from "@/components/ui/RevealText";

const ICONS: Record<SkillGroup["icon"], string[]> = {
  systems: [
    "M14 14h20v20H14z",
    "M19 19h10v10H19z",
    "M19 8v6M24 8v6M29 8v6M19 34v6M24 34v6M29 34v6M8 19h6M8 24h6M8 29h6M34 19h6M34 24h6M34 29h6",
  ],
  web: [
    "M9 10h30a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z",
    "M6 17h36",
    "M20 23l-5 5 5 5M28 23l5 5-5 5",
  ],
  mobile: [
    "M19 5h10a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z",
    "M21 37h6",
    "M20 16l4 4 4-4M24 20v8",
  ],
  core: [
    "M10 8h28a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z",
    "M10 28h28a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z",
    "M14 14h2M14 34h2M24 20v8",
  ],
};

function Icon({ name }: { name: SkillGroup["icon"] }) {
  return (
    <svg viewBox="0 0 48 48" className="skill-icon h-12 w-12" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`ig-${name}`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#5eead4" />
        </linearGradient>
      </defs>
      {ICONS[name].map((d) => (
        <path key={d} d={d} stroke={`url(#ig-${name})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".skill-card", {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ".skill-grid", start: "top 80%", once: true },
        });
        gsap.from(".skill-icon path", {
          drawSVG: "0%",
          duration: 1.6,
          stagger: 0.08,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".skill-grid", start: "top 75%", once: true },
        });
        gsap.to(".skills-marquee", {
          xPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        // Redraw icon on hover + spotlight position
        const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
        const cleanups = cards.map((card) => {
          const enter = contextSafe!(() => {
            gsap.fromTo(card.querySelectorAll(".skill-icon path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, stagger: 0.06, ease: "power2.out", overwrite: true });
          });
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
          };
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointermove", move);
          return () => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointermove", move);
          };
        });
        return () => cleanups.forEach((c) => c());
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="skills" className="relative overflow-hidden py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">(02) — Skills</p>
          <RevealText as="h2" className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] md:col-span-9">
            A toolkit that spans the engine room and the storefront.
          </RevealText>
        </div>

        <div className="skill-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <article
              key={group.title}
              className="skill-card sheen group rounded-3xl bg-white/[0.02] p-7 transition-colors duration-500 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <Icon name={group.icon} />
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-xl font-medium">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 transition-colors duration-300 group-hover:text-fg/80">
                    <span className="h-px w-3 bg-white/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-32" aria-hidden>
        <div className="skills-marquee">
          <div className="marquee-track flex w-max">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {marquee.map((m) => (
                  <span key={m} className="font-display flex items-center gap-10 pr-10 text-[clamp(3rem,8vw,7rem)] italic text-white/[0.08] transition-colors hover:text-white/40">
                    {m}
                    <span className="text-gradient not-italic text-[0.4em]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
