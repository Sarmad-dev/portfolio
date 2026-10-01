"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { links, projects, type Project } from "@/data/portfolio";
import RevealText from "@/components/ui/RevealText";

/** Abstract SVG artwork per card. The featured one hints at docs / sheets / slides. */
function Art({ index, featured }: { index: number; featured?: boolean }) {
  if (featured) {
    return (
      <svg viewBox="0 0 400 240" className="h-full w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id="fa" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset=".5" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        {/* Slide */}
        <g transform="translate(222 42) rotate(6)">
          <rect width="150" height="96" rx="8" fill="#101018" stroke="rgba(255,255,255,.12)" />
          <rect x="14" y="16" width="70" height="8" rx="4" fill="url(#fa)" />
          <circle cx="112" cy="58" r="22" stroke="url(#fa)" strokeWidth="1.5" />
          <rect x="14" y="36" width="50" height="4" rx="2" fill="rgba(255,255,255,.15)" />
          <rect x="14" y="46" width="40" height="4" rx="2" fill="rgba(255,255,255,.1)" />
        </g>
        {/* Sheet */}
        <g transform="translate(120 80) rotate(-3)">
          <rect width="170" height="120" rx="8" fill="#0d0d14" stroke="rgba(255,255,255,.12)" />
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <path key={`r${r}`} d={`M0 ${20 + r * 17}H170`} stroke="rgba(255,255,255,.07)" />
          ))}
          {[0, 1, 2, 3].map((c) => (
            <path key={`c${c}`} d={`M${34 + c * 34} 0V120`} stroke="rgba(255,255,255,.07)" />
          ))}
          <path d="M14 104 L48 84 L82 92 L116 60 L150 40" stroke="url(#fa)" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Doc */}
        <g transform="translate(30 30) rotate(-8)">
          <rect width="120" height="160" rx="8" fill="#12121b" stroke="rgba(255,255,255,.14)" />
          <rect x="14" y="18" width="60" height="7" rx="3.5" fill="url(#fa)" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((l) => (
            <rect key={l} x="14" y={38 + l * 13} width={l % 3 === 2 ? 56 : 92} height="4" rx="2" fill="rgba(255,255,255,.12)" />
          ))}
        </g>
      </svg>
    );
  }
  const variants = [
    <g key="a">
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx="200" cy="120" r={30 + i * 22} stroke="url(#pa)" strokeOpacity={1 - i * 0.18} />
      ))}
    </g>,
    <g key="b">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M0 ${70 + i * 18} C100 ${20 + i * 18} 300 ${140 + i * 18} 400 ${80 + i * 18}`} stroke="url(#pa)" strokeOpacity={1 - i * 0.14} />
      ))}
    </g>,
    <g key="c">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={140 - i * 20} y={60 - i * 14} width={120 + i * 40} height={120 + i * 28} rx="16" stroke="url(#pa)" strokeOpacity={1 - i * 0.22} transform={`rotate(${i * 6} 200 120)`} />
      ))}
    </g>,
  ];
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="pa" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#5eead4" />
        </linearGradient>
      </defs>
      {variants[index % variants.length]}
    </svg>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  const width = project.featured
    ? "w-[86vw] sm:w-[min(80vw,820px)]"
    : "w-[78vw] sm:w-[min(60vw,440px)]";
  const Wrapper = project.href ? "a" : "div";
  return (
    <Wrapper
      {...(project.href ? { href: project.href, target: "_blank", rel: "noreferrer noopener", "data-cursor": "Open" } : {})}
      className={`work-card sheen group relative flex shrink-0 flex-col overflow-hidden rounded-3xl bg-bg-elev ${width} motion-reduce:w-full`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className={`relative overflow-hidden border-b border-white/5 ${project.featured ? "h-36 sm:h-56" : "h-40 sm:h-52"}`}>
        <div className="work-art absolute inset-[-10%] transition-transform duration-700 ease-out group-hover:scale-105">
          <Art index={index} featured={project.featured} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">{project.kicker}</span>
          <span className="font-mono text-xs text-muted">0{index + 1}</span>
        </div>
        <h3 className={`font-display mt-3 leading-none ${project.featured ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
          {project.title}
          {project.placeholder && <span className="ml-2 align-middle font-mono text-[10px] tracking-widest text-accent-1">TODO</span>}
        </h3>
        <p className={`mt-4 text-sm leading-relaxed text-fg/65 ${project.featured ? "line-clamp-4 sm:line-clamp-none" : ""}`}>
          {project.description}
        </p>
        {project.highlights && (
          <ul className="mt-5 hidden gap-x-6 gap-y-2 text-xs text-fg/80 sm:grid sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-gradient">✦</span>
                {h}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-fg/70">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".work-track")!;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: ".work-pin",
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(".work-progress", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".work-pin", start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
        });

        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          gsap.fromTo(card.querySelector(".work-art"), { xPercent: -6 }, {
            xPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          });
          gsap.from(card, {
            rotate: 3,
            y: 40,
            opacity: 0.3,
            ease: "power2.out",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 60%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="relative overflow-hidden">
      <div className="work-pin flex min-h-[100svh] flex-col justify-center gap-10 py-24 motion-reduce:min-h-0">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">(03) — Selected work</p>
            <RevealText as="h2" className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">
              Things I&apos;ve built
            </RevealText>
          </div>
          <div className="hidden w-48 items-center gap-3 md:flex motion-reduce:hidden">
            <span className="font-mono text-xs text-muted">Scroll</span>
            <div className="h-px flex-1 bg-white/10">
              <div className="work-progress bg-accent h-px origin-left" />
            </div>
          </div>
        </div>

        <div className="work-track flex w-max items-stretch gap-4 px-[var(--gutter)] sm:gap-6 motion-reduce:w-full motion-reduce:flex-col">
          {projects.map((p, i) => (
            <Card key={p.title} project={p} index={i} />
          ))}
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="Open"
            className="group flex w-[60vw] shrink-0 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/10 text-center transition-colors hover:border-white/30 sm:w-[300px] motion-reduce:w-full motion-reduce:py-16"
          >
            <span className="font-display text-3xl italic">More on GitHub</span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-bg">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
