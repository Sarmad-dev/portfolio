"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { profile } from "@/data/portfolio";
import Signature from "./Signature";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        markIntroDone();
        setGone(true);
        return;
      }

      window.__lenis?.stop();
      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>(".pl-count")!;

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => setGone(true),
      });
      tl.from(".sig-path", { drawSVG: "0%", duration: 1.4, stagger: 0.25, ease: "power2.inOut" }, 0)
        .to(counter, {
          v: 100,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, "0")),
        }, 0)
        .from(".pl-name", { yPercent: 110, duration: 0.9, ease: "power4.out" }, 0.3)
        .to(".pl-bar", { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
        .to(".pl-inner", { opacity: 0, y: -30, duration: 0.6 }, "+=0.15")
        .add(() => {
          window.__lenis?.start();
          markIntroDone();
        }, "-=0.2")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.05, ease: "expo.inOut" }, "-=0.3");
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[80] flex items-center justify-center bg-bg"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div className="pl-inner flex w-[min(80vw,360px)] flex-col items-center gap-6">
        <Signature className="w-40 sm:w-52" strokeWidth={3.2} />
        <div className="overflow-hidden">
          <p className="pl-name eyebrow">{profile.name}</p>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-white/10">
            <div className="pl-bar bg-accent h-px origin-left scale-x-0" />
          </div>
          <span className="pl-count font-mono text-xs tabular-nums text-muted">000</span>
        </div>
      </div>
    </div>
  );
}
