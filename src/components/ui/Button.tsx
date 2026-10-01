import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  cursor?: string;
  external?: boolean;
};

export default function Button({ href, children, variant = "primary", cursor, external }: Props) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-500";
  const styles =
    variant === "primary"
      ? "bg-fg text-bg"
      : "border border-white/15 text-fg hover:border-white/40";
  return (
    <Magnetic>
      <a
        href={href}
        data-cursor={cursor}
        className={`${base} ${styles}`}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        <span
          aria-hidden
          className="bg-accent absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
        />
        <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-[#0b0b10]">
          {children}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-500 group-hover:-rotate-45">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </Magnetic>
  );
}
