"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { about } from "@/data/portfolio";
import RevealText from "@/components/ui/RevealText";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Pinned statement: words light up as you scroll.
        const split = SplitText.create(".about-statement", { type: "words" });
        gsap.set(split.words, { opacity: 0.14 });
        gsap.to(split.words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-pin",
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
          },
        });

        // Background parallax orbs
        gsap.to(".about-orb-a", {
          yPercent: -60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.to(".about-orb-b", {
          yPercent: 80,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        gsap.from(".about-stat", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 85%", once: true },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="relative overflow-hidden">
      <div aria-hidden className="about-orb-a pointer-events-none absolute left-[-15%] top-[30%] h-[45vw] w-[45vw] rounded-full bg-accent-2/10 blur-[120px]" />
      <div aria-hidden className="about-orb-b pointer-events-none absolute right-[-10%] top-[0%] h-[35vw] w-[35vw] rounded-full bg-accent-1/10 blur-[120px]" />

      <div className="about-pin relative flex min-h-[100svh] items-center">
        <div className="container-x">
          <p className="eyebrow mb-8">(01) — About</p>
          <p className="about-statement font-display max-w-6xl text-[clamp(2rem,5.6vw,5.25rem)] leading-[1.05]">
            {about.statement}
          </p>
        </div>
      </div>

      <div className="container-x grid gap-16 pb-32 pt-8 md:grid-cols-12 md:pt-16">
        <div className="space-y-6 md:col-span-6 md:col-start-2">
          {about.paragraphs.map((p) => (
            <RevealText key={p} className="text-base leading-relaxed text-fg/70 md:text-lg">
              {p}
            </RevealText>
          ))}
        </div>
        <dl className="about-stats grid grid-cols-3 gap-4 self-end md:col-span-4 md:col-start-9 md:grid-cols-1 md:gap-8">
          {about.stats.map((s) => (
            <div key={s.label} className="about-stat border-t border-white/10 pt-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-gradient text-5xl md:text-6xl">{s.value}</dd>
              <dd className="mt-1 text-xs text-muted md:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
