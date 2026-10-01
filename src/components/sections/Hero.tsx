"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { links, profile } from "@/data/portfolio";
import HeroCanvas from "@/components/three/HeroCanvas";
import Button from "@/components/ui/Button";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const name = SplitText.create(".hero-first", { type: "chars", mask: "chars" });
        // Gradient must live on the split element itself so background-clip:text survives.
        const last = SplitText.create(".hero-last", { type: "words", mask: "words", wordsClass: "text-gradient pr-[0.08em]" });
        const role = SplitText.create(".hero-role", { type: "words", mask: "words" });
        const tag = SplitText.create(".hero-tagline", { type: "lines", mask: "lines" });

        gsap.set(name.chars, { yPercent: 115 });
        gsap.set(last.words, { yPercent: 115 });
        gsap.set([role.words, tag.lines], { yPercent: 110 });
        gsap.set(".hero-fade", { opacity: 0, y: 20 });
        gsap.set(".hero-rule", { scaleX: 0 });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .to(name.chars, { yPercent: 0, duration: 1.4, stagger: 0.035 }, 0)
          .to(last.words, { yPercent: 0, duration: 1.6 }, 0.25)
          .to(".hero-rule", { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.3)
          .to(role.words, { yPercent: 0, duration: 1.1, stagger: 0.06 }, 0.5)
          .to(tag.lines, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 0.7)
          .to(".hero-fade", { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.9);
        const off = onIntroDone(() => intro.play());

        // Scroll: feed the 3D scene + layered parallax.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => (progress.current = self.progress),
          },
        });
        tl.to(".hero-content", { yPercent: -18, opacity: 0.1, ease: "none" }, 0)
          .to(".px-grid", { yPercent: 25, ease: "none" }, 0)
          .to(".px-glow", { yPercent: 45, scale: 1.2, ease: "none" }, 0)
          .to(".px-mono", { yPercent: 70, ease: "none" }, 0)
          .to(".px-canvas", { yPercent: 20, ease: "none" }, 0);

        return () => {
          off();
          name.revert();
          last.revert();
          role.revert();
          tag.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden">
      {/* Parallax layers */}
      <div aria-hidden className="px-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div aria-hidden className="px-glow pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[10%] h-[50vw] w-[50vw] rounded-full bg-accent-1/20 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[0%] h-[40vw] w-[40vw] rounded-full bg-accent-3/10 blur-[120px]" />
      </div>
      <div aria-hidden className="px-mono font-display text-outline pointer-events-none absolute -bottom-[6vw] right-[-2vw] select-none text-[42vw] leading-none md:text-[32vw]">
        {profile.initials}
      </div>
      <div className="px-canvas absolute inset-0">
        <HeroCanvas progress={progress} container={root} />
      </div>

      {/* Content */}
      <div className="hero-content container-x relative z-10 flex flex-1 flex-col justify-end pb-8 pt-28 md:pb-12">
        <p className="hero-fade eyebrow mb-6 flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-3" />
          {profile.availability} · {profile.location}
        </p>
        <h1 className="font-display text-[clamp(3.6rem,15vw,13.5rem)] leading-[0.86]">
          <span className="hero-first block">{profile.firstName}</span>
          <span className="hero-last block pl-[8vw] italic">
            <span className="text-gradient pr-[0.08em]">{profile.lastName}</span>
          </span>
        </h1>
        <div className="hero-rule mt-8 h-px w-full origin-left bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
        <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
          <p className="hero-role font-display text-2xl italic text-fg/90 md:col-span-4 md:text-3xl">{profile.role}</p>
          <p className="hero-tagline max-w-md text-sm leading-relaxed text-muted md:col-span-4 md:text-base">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-3 md:col-span-4 md:justify-end">
            <div className="hero-fade">
              <Button href="#work" cursor="View">See the work</Button>
            </div>
            <div className="hero-fade">
              <Button href={links.github} variant="ghost" external cursor="Open">
                GitHub
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-fade mt-10 hidden items-center gap-3 md:flex">
          <span className="relative block h-10 w-[1px] overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-fg motion-reduce:animate-none" />
          </span>
          <span className="eyebrow">Scroll</span>
        </div>
      </div>
    </section>
  );
}
