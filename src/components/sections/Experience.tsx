"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/data/portfolio";
import RevealText from "@/components/ui/RevealText";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".xp-line", {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: { trigger: ".xp-list", start: "top 70%", end: "bottom 60%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 75%", once: true } });
          tl.from(item.querySelector(".xp-dot"), { scale: 0, duration: 0.6, ease: "back.out(3)" })
            .from(item.querySelectorAll(".xp-fade"), { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.05);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="relative py-28 md:py-40">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="eyebrow mb-4">(04) — Experience</p>
            <RevealText as="h2" className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">
              Where I&apos;ve been
            </RevealText>
          </div>
        </div>

        <div className="xp-list relative md:col-span-7 md:col-start-6">
          <svg aria-hidden className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-[2px] overflow-visible" viewBox="0 0 2 100" preserveAspectRatio="none" fill="none">
            <path d="M1 0V100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path className="xp-line" d="M1 0V100" stroke="url(#xp-grad)" strokeWidth="2" />
            <defs>
              <linearGradient id="xp-grad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a78bfa" />
                <stop offset=".5" stopColor="#60a5fa" />
                <stop offset="1" stopColor="#5eead4" />
              </linearGradient>
            </defs>
          </svg>
          <ol className="space-y-14 md:space-y-20">
            {experience.map((xp) => (
              <li key={xp.role + xp.period} className="xp-item group relative pl-10 md:pl-14">
                <span className="xp-dot bg-accent absolute left-0 top-2 block h-3 w-3 rounded-full ring-4 ring-bg" />
                <p className="xp-fade font-mono text-xs text-muted">{xp.period}</p>
                <h3 className="xp-fade font-display mt-2 text-3xl transition-colors duration-300 md:text-4xl">
                  {xp.role}
                </h3>
                <p className="xp-fade mt-1 text-sm text-fg/80">{xp.company}</p>
                <p className="xp-fade mt-4 max-w-xl text-sm leading-relaxed text-fg/60 md:text-base">{xp.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
