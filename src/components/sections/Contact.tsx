"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { links, profile } from "@/data/portfolio";
import RevealText from "@/components/ui/RevealText";
import Button from "@/components/ui/Button";

const SHAPES = [
  "M421,317Q396,384,331,410Q266,436,196,420Q126,404,91,342Q56,280,76,206Q96,132,166,96Q236,60,310,82Q384,104,415,177Q446,250,421,317Z",
  "M402,330Q385,410,307,422Q229,434,160,405Q91,376,73,303Q55,230,96,163Q137,96,215,78Q293,60,355,108Q417,156,418,203Q419,250,402,330Z",
  "M437,318Q385,386,320,428Q255,470,182,433Q109,396,77,323Q45,250,92,188Q139,126,203,82Q267,38,330,90Q393,142,441,196Q489,250,437,318Z",
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 4, ease: "sine.inOut" } })
          .to(".ct-blob", { morphSVG: SHAPES[1] })
          .to(".ct-blob", { morphSVG: SHAPES[2] });
        gsap.to(".ct-blob-wrap", { rotate: 360, duration: 60, repeat: -1, ease: "none" });
        gsap.fromTo(".ct-blob-wrap", { yPercent: 20 }, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(".ct-ring", {
          drawSVG: "0%",
          duration: 2,
          stagger: 0.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        gsap.from(".ct-fade", {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-actions", start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const contactLinks = [
    { label: "Email", href: links.email ? `mailto:${links.email}` : "" },
    { label: "LinkedIn", href: links.linkedin },
    { label: "GitHub", href: links.github },
    { label: "Résumé", href: links.resume },
  ].filter((l) => l.href);

  return (
    <section ref={root} id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="ct-blob-wrap relative h-[110vw] w-[110vw] max-h-[900px] max-w-[900px] opacity-50 md:h-[70vw] md:w-[70vw]">
          <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full blur-3xl">
            <defs>
              <linearGradient id="ct-grad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a78bfa" stopOpacity=".55" />
                <stop offset=".5" stopColor="#60a5fa" stopOpacity=".35" />
                <stop offset="1" stopColor="#5eead4" stopOpacity=".45" />
              </linearGradient>
            </defs>
            <path className="ct-blob" d={SHAPES[0]} fill="url(#ct-grad)" />
          </svg>
          <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" fill="none">
            <circle className="ct-ring" cx="250" cy="250" r="200" stroke="rgba(255,255,255,.08)" />
            <circle className="ct-ring" cx="250" cy="250" r="150" stroke="rgba(255,255,255,.06)" strokeDasharray="2 6" />
          </svg>
        </div>
      </div>

      <div className="container-x relative text-center">
        <p className="eyebrow mb-8">(05) — Contact</p>
        <RevealText as="h2" type="chars" className="font-display mx-auto max-w-5xl text-[clamp(3rem,10vw,9.5rem)] leading-[1]">
          Let&apos;s build something remarkable.
        </RevealText>
        <p className="ct-fade mx-auto mt-8 max-w-md text-sm leading-relaxed text-fg/65 md:text-base">
          {/* TODO: replace */}
          Have a project, a role, or a hard problem in mind? I&apos;d love to hear about it.
        </p>
        <div className="ct-actions mt-12 flex flex-wrap items-center justify-center gap-3">
          {contactLinks.map((l, i) => (
            <div key={l.label} className="ct-fade">
              <Button
                href={l.href}
                variant={i === 0 ? "primary" : "ghost"}
                external={!l.href.startsWith("mailto:")}
                cursor="Open"
              >
                {l.label}
              </Button>
            </div>
          ))}
        </div>
        <p className="ct-fade eyebrow mt-10">{profile.location}</p>
      </div>
    </section>
  );
}
