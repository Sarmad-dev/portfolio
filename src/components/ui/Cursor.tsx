"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Dot + trailing ring. Grows over interactive elements; shows a label for [data-cursor]. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      const text = target?.dataset.cursor ?? "";
      if (label.current) label.current.textContent = text;
      gsap.to(ring.current, {
        scale: target ? (text ? 2.6 : 1.8) : 1,
        backgroundColor: text ? "rgba(237,237,240,0.95)" : "rgba(237,237,240,0)",
        borderColor: target ? "rgba(237,237,240,0.6)" : "rgba(237,237,240,0.35)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25 });
    };

    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 }).then(() => (shown = false));

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-fg opacity-0" />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-fg/35 opacity-0"
      >
        <span ref={label} className="text-[5px] font-medium uppercase tracking-[0.15em] text-bg" />
      </div>
    </div>
  );
}
