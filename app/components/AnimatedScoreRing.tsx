"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

type Band = { ring: string; text: string };

// Colour the ring by overall score so the result reads at a glance.
function bandFor(pct: number): Band {
  if (pct >= 80) return { ring: "#10b981", text: "text-emerald-600" }; // emerald-500
  if (pct >= 50) return { ring: "#f59e0b", text: "text-amber-600" }; // amber-500
  return { ring: "#ef4444", text: "text-red-600" }; // red-500
}

/**
 * A self-contained SVG progress ring that animates its sweep and counts the
 * percentage up from zero on mount. No animation libraries; honours
 * prefers-reduced-motion by snapping straight to the final value.
 */
export function AnimatedScoreRing({
  percent,
  correct,
  total,
  size = 150,
  stroke = 12,
}: {
  percent: number;
  correct: number;
  total: number;
  size?: number;
  stroke?: number;
}) {
  const target = Math.max(0, Math.min(100, Math.round(percent)));
  const band = bandFor(target);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const [display, setDisplay] = useState(0);
  const [swept, setSwept] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(target);
      setSwept(true);
      return;
    }

    // Trigger the ring sweep on the next frame so the CSS transition runs.
    const kickoff = requestAnimationFrame(() => setSwept(true));

    const duration = 900;
    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      // easeOutCubic for a lively-then-settling count.
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(kickoff);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  const offset = swept ? circumference * (1 - target / 100) : circumference;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Score ${target} percent, ${correct} of ${total} correct`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0" /* slate-200 track */
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={band.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-bold tabular-nums ${band.text}`}>
          {display}%
        </span>
        <span className="mt-0.5 text-xs font-medium text-slate-500 tabular-nums">
          {correct} / {total}
        </span>
      </div>
    </div>
  );
}
