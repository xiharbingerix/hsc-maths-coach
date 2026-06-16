"use client";

import * as React from "react";
import type { BearingsDiagram, StatChartColor } from "../../../lib/lessons/types";

const colorHex: Record<StatChartColor, string> = {
  blue: "#2563eb",
  teal: "#0d9488",
  violet: "#7c3aed",
  amber: "#d97706",
  green: "#059669",
  red: "#dc2626",
};

const SIZE = 240;
const O = { x: 120, y: 120 };
const RADIUS = 92;

/** Unit direction for a true bearing (clockwise from North, up = −y). */
function dir(bearing: number) {
  const r = (bearing * Math.PI) / 180;
  return { x: Math.sin(r), y: -Math.cos(r) };
}

function formatBearing(b: number) {
  return `${String(Math.round(((b % 360) + 360) % 360)).padStart(3, "0")}°`;
}

export function BearingsView({
  diagram,
  className,
}: {
  diagram: BearingsDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const stroke = colorHex[diagram.color ?? "blue"];

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[260px] min-w-[240px]"
      >
        <title id={titleId}>{diagram.description}</title>

        {/* Compass reference */}
        <circle cx={O.x} cy={O.y} r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth={1} />
        <line x1={O.x} y1={O.y - RADIUS} x2={O.x} y2={O.y + RADIUS} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={O.x - RADIUS} y1={O.y} x2={O.x + RADIUS} y2={O.y} stroke="#cbd5e1" strokeWidth={1} />
        <text x={O.x} y={O.y - RADIUS - 6} textAnchor="middle" className="fill-slate-500 text-xs font-semibold">N</text>
        <text x={O.x} y={O.y + RADIUS + 12} textAnchor="middle" className="fill-slate-500 text-xs">S</text>
        <text x={O.x + RADIUS + 8} y={O.y} textAnchor="middle" dominantBaseline="central" className="fill-slate-500 text-xs">E</text>
        <text x={O.x - RADIUS - 8} y={O.y} textAnchor="middle" dominantBaseline="central" className="fill-slate-500 text-xs">W</text>

        {/* Bearing arcs (drawn first, behind rays) */}
        {diagram.rays.map((ray, i) => {
          if (!ray.showAngle) return null;
          const steps = 24;
          const ar = 30 + i * 10;
          const path = Array.from({ length: steps + 1 }, (_, k) => {
            const t = (ray.bearing * k) / steps;
            const d = dir(t);
            return `${k === 0 ? "M" : "L"} ${(O.x + ar * d.x).toFixed(2)} ${(O.y + ar * d.y).toFixed(2)}`;
          }).join(" ");
          const mid = dir(ray.bearing / 2);
          return (
            <g key={`arc-${i}`}>
              <path d={path} fill="none" stroke="#64748b" strokeWidth={1.25} />
              <text
                x={O.x + (ar + 12) * mid.x}
                y={O.y + (ar + 12) * mid.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-slate-700 text-xs font-semibold"
                stroke="#ffffff"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {formatBearing(ray.bearing)}
              </text>
            </g>
          );
        })}

        {/* Rays */}
        {diagram.rays.map((ray, i) => {
          const d = dir(ray.bearing);
          const L = RADIUS * Math.max(0.2, Math.min(1, ray.length ?? 1));
          const end = { x: O.x + L * d.x, y: O.y + L * d.y };
          const back = { x: end.x - 9 * d.x, y: end.y - 9 * d.y };
          const perp = { x: -d.y, y: d.x };
          return (
            <g key={`ray-${i}`}>
              <line x1={O.x} y1={O.y} x2={end.x} y2={end.y} stroke={stroke} strokeWidth={2.25} />
              <polygon
                points={`${end.x},${end.y} ${(back.x + perp.x * 4).toFixed(1)},${(back.y + perp.y * 4).toFixed(1)} ${(back.x - perp.x * 4).toFixed(1)},${(back.y - perp.y * 4).toFixed(1)}`}
                fill={stroke}
              />
              {ray.label && (
                <text
                  x={end.x + d.x * 12}
                  y={end.y + d.y * 12}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-slate-900 text-xs font-bold"
                  stroke="#ffffff"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {ray.label}
                </text>
              )}
            </g>
          );
        })}

        <circle cx={O.x} cy={O.y} r={3} fill="#1e293b" />
        {diagram.originLabel && (
          <text
            x={O.x - 10}
            y={O.y + 12}
            textAnchor="end"
            className="fill-slate-900 text-xs font-bold"
            stroke="#ffffff"
            strokeWidth={3}
            paintOrder="stroke"
          >
            {diagram.originLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
