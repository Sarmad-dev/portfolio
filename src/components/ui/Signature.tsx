import { forwardRef } from "react";

/** Monogram "MS" drawn as strokes so DrawSVGPlugin can "write" it. */
const Signature = forwardRef<SVGSVGElement, { className?: string; strokeWidth?: number }>(
  function Signature({ className = "", strokeWidth = 3 }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 200 104"
        fill="none"
        className={className}
        aria-label="Muhammad Sarmad signature"
        role="img"
      >
        <defs>
          <linearGradient id="sig-grad" x1="0" y1="0" x2="200" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="0.5" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        <g stroke="url(#sig-grad)" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path className="sig-path" d="M18 80 C20 60 22 40 24 22 C34 38 44 54 54 68 C64 52 74 36 86 20 C86 40 86 60 88 80" />
          <path className="sig-path" d="M152 30 C146 18 118 16 112 30 C106 46 150 46 154 64 C158 82 128 90 108 76" />
          <path className="sig-path" d="M10 94 C60 86 120 98 192 86" />
        </g>
      </svg>
    );
  },
);

export default Signature;
