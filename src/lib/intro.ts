"use client";

/** Tiny pub/sub so sections can wait for the preloader to finish. */
let done = false;
const listeners = new Set<() => void>();

export function onIntroDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}
