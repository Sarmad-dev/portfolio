"use client";

import dynamic from "next/dynamic";
import { Component, useSyncExternalStore, type ReactNode, type RefObject } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

/** Static gradient orb used for reduced motion, no WebGL, or a crashed scene. */
export function OrbFallback() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[12vw]">
      <div className="relative h-[60vw] w-[60vw] max-h-[460px] max-w-[460px] rounded-full opacity-80 blur-[2px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #c4b5fd 0%, #7c3aed 22%, #1e1b4b 55%, transparent 72%), radial-gradient(circle at 70% 70%, #5eead4 0%, transparent 45%)",
        }}
      />
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("[hero] 3D scene disabled:", error);
  }
  render() {
    return this.state.failed ? <OrbFallback /> : this.props.children;
  }
}

let cached: boolean | undefined;
function canRender3D() {
  if (cached === undefined) cached = detect();
  return cached;
}
const noopSubscribe = () => () => {};

function detect() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroCanvas({
  progress,
  container,
}: {
  progress: RefObject<number>;
  container: RefObject<HTMLElement | null>;
}) {
  // null during SSR/hydration, then decided once on the client.
  const enabled = useSyncExternalStore(noopSubscribe, canRender3D, () => null);
  if (enabled === null) return null;
  if (!enabled) return <OrbFallback />;
  return (
    <SceneBoundary>
      <HeroScene progress={progress} container={container} />
    </SceneBoundary>
  );
}
