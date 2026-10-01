"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { nav, profile } from "@/data/portfolio";
import Signature from "./Signature";
import Magnetic from "./Magnetic";

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Resolve targets now: the intro callback fires from another component's context.
        const items = gsap.utils.toArray<HTMLElement>(".nav-item", root.current);
        const sig = gsap.utils.toArray<SVGPathElement>(".nav-logo .sig-path", root.current);
        gsap.set(items, { yPercent: -120, opacity: 0 });
        gsap.set(sig, { drawSVG: "0%" });
        const off = onIntroDone(() => {
          gsap.to(items, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.5 });
          gsap.to(sig, { drawSVG: "100%", duration: 1.4, stagger: 0.2, ease: "power2.inOut", delay: 0.5 });
        });

        // Hide on scroll down, reveal on scroll up.
        const st = ScrollTrigger.create({
          start: 120,
          end: "max",
          onUpdate: (self) => {
            gsap.to(root.current, { yPercent: self.direction === 1 ? -110 : 0, duration: 0.45, ease: "power3.out", overwrite: true });
          },
          onLeaveBack: () => gsap.to(root.current, { yPercent: 0, duration: 0.45, overwrite: true }),
        });
        return () => {
          off();
          st.kill();
        };
      });
      ScrollTrigger.create({
        start: 40,
        end: "max",
        toggleClass: { targets: root.current, className: "nav-scrolled" },
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!menu.current) return;
      if (open) {
        window.__lenis?.stop();
        gsap.timeline()
          .set(menu.current, { display: "flex" })
          .fromTo(menu.current, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "expo.inOut" })
          .from(".menu-link", { yPercent: 110, duration: 0.8, stagger: 0.06, ease: "expo.out" }, "-=0.35");
      } else {
        window.__lenis?.start();
        gsap.to(menu.current, {
          clipPath: "circle(0% at 100% 0%)",
          duration: 0.6,
          ease: "expo.inOut",
          onComplete: () => {
            if (menu.current) menu.current.style.display = "none";
          },
        });
      }
    },
    { dependencies: [open], scope: menu },
  );

  return (
    <>
      <header
        ref={root}
        className="group/nav fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 [&.nav-scrolled]:border-b [&.nav-scrolled]:border-white/5 [&.nav-scrolled]:bg-bg/60 [&.nav-scrolled]:backdrop-blur-xl"
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-20">
          <a href="#top" className="nav-logo nav-item flex items-center gap-3" aria-label={`${profile.name} — home`}>
            <Signature className="h-8 w-auto md:h-9" strokeWidth={5} />
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href} className="nav-item">
                <a href={item.href} className="link-underline text-sm text-fg/70 transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-item hidden md:block">
            <Magnetic>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors hover:border-white/40 hover:bg-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-3 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-3" />
                </span>
                Let&apos;s talk
              </a>
            </Magnetic>
          </div>
          <button
            type="button"
            className="nav-item relative z-[60] flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>
      <div
        ref={menu}
        id="mobile-menu"
        className="fixed inset-0 z-[45] hidden flex-col justify-between bg-bg-elev px-[var(--gutter)] pb-10 pt-28 md:hidden"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <ul className="flex flex-col gap-2">
          {nav.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  // Let Lenis restart before scrolling.
                  requestAnimationFrame(() => {
                    const target = document.querySelector<HTMLElement>(item.href);
                    if (!target) return;
                    if (window.__lenis) window.__lenis.scrollTo(target);
                    else target.scrollIntoView();
                  });
                }}
                className="menu-link font-display flex items-baseline gap-4 text-5xl"
              >
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="eyebrow">{profile.name} — {profile.role}</p>
      </div>
    </>
  );
}
