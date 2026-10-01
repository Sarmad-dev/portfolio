"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: "p" | "h2" | "h3" | "div";
  children: ReactNode;
  className?: string;
  type?: "lines" | "words" | "chars";
  start?: string;
  delay?: number;
};

/** Masked split-text reveal tied to ScrollTrigger. */
export default function RevealText({
  as: Tag = "p",
  children,
  className = "",
  type = "lines",
  start = "top 85%",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(ref.current!, {
          type: type === "chars" ? "words,chars" : type === "words" ? "words" : "lines",
          mask: type === "chars" ? "words" : type,
          autoSplit: true,
          onSplit(self) {
            const targets = type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
            return gsap.from(targets, {
              yPercent: 110,
              rotate: type === "lines" ? 2 : 0,
              duration: type === "chars" ? 0.9 : 1.1,
              stagger: type === "chars" ? 0.02 : 0.08,
              ease: "expo.out",
              delay,
              scrollTrigger: { trigger: ref.current, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  // All allowed tags share HTMLElement behaviour; typed as div for the ref.
  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
