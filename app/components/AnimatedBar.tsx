"use client";

import { useEffect, useState } from "react";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

/**
 * A thin progress bar that grows from 0 to its target width on mount so a page
 * of results visibly "fills in" rather than appearing static. Snaps to the
 * final width when reduced motion is requested.
 */
export function AnimatedBar({
  percent,
  colorClass,
  delayMs = 0,
  className = "",
}: {
  percent: number;
  colorClass: string;
  delayMs?: number;
  className?: string;
}) {
  const target = Math.max(0, Math.min(100, Math.round(percent)));
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setWidth(target);
      return;
    }
    const id = requestAnimationFrame(() => setWidth(target));
    return () => cancelAnimationFrame(id);
  }, [target]);

  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-slate-100 ${className}`}
    >
      <div
        className={`h-full rounded-full ${colorClass}`}
        style={{
          width: `${width}%`,
          transition: "width 800ms cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: `${delayMs}ms`,
        }}
      />
    </div>
  );
}
