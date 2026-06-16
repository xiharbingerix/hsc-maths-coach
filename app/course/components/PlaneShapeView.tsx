"use client";

import * as React from "react";
import type { PlaneShapeColor, PlaneShapeDiagram } from "../../../lib/lessons/types";

const fillHex: Record<PlaneShapeColor, string> = {
  blue: "#dbeafe",
  teal: "#ccfbf1",
  violet: "#ede9fe",
  amber: "#fef3c7",
  green: "#dcfce7",
  red: "#fee2e2",
  none: "none",
};

const W = 360;
const H = 280;
const pad = 34;

type Pt = { x: number; y: number };

const sub = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a: Pt, k: number): Pt => ({ x: a.x * k, y: a.y * k });
const len = (a: Pt) => Math.hypot(a.x, a.y) || 1;
const norm = (a: Pt): Pt => mul(a, 1 / len(a));

export function PlaneShapeView({
  diagram,
  className,
}: {
  diagram: PlaneShapeDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const verts = diagram.vertices;
  const n = verts.length;

  const xs = verts.map((v) => v.x);
  const ys = verts.map((v) => v.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const dataW = maxX - minX || 1;
  const dataH = maxY - minY || 1;
  const scale = Math.min((W - 2 * pad) / dataW, (H - 2 * pad) / dataH);
  const offX = (W - dataW * scale) / 2;
  const offY = (H - dataH * scale) / 2;

  const toPix = (v: { x: number; y: number }): Pt => ({
    x: offX + (v.x - minX) * scale,
    y: offY + (maxY - v.y) * scale,
  });

  const pix = verts.map(toPix);
  const centroid: Pt = pix.reduce((c, p) => add(c, mul(p, 1 / n)), { x: 0, y: 0 });
  const polygonPoints = pix.map((p) => `${p.x},${p.y}`).join(" ");

  // Minor-arc path between edge directions d1, d2 at vertex centre c.
  const arcPath = (c: Pt, d1: Pt, d2: Pt, r: number) => {
    const a1 = Math.atan2(d1.y, d1.x);
    let delta = Math.atan2(d2.y, d2.x) - a1;
    while (delta <= -Math.PI) delta += 2 * Math.PI;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    const steps = 10;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const a = a1 + (delta * i) / steps;
      const p = { x: c.x + r * Math.cos(a), y: c.y + r * Math.sin(a) };
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    }).join(" ");
  };

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[300px] min-w-[280px]"
      >
        <title id={titleId}>{diagram.description}</title>

        <polygon
          points={polygonPoints}
          fill={fillHex[diagram.fill ?? "blue"]}
          fillOpacity={diagram.fill === "none" ? 0 : 0.7}
          stroke="#1e293b"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Edge marks: labels, equal-length ticks, parallel chevrons */}
        {verts.map((_, i) => {
          const a = pix[i];
          const b = pix[(i + 1) % n];
          const edge = diagram.edges?.[i];
          if (!edge) return null;
          const mid = mul(add(a, b), 0.5);
          const dir = norm(sub(b, a));
          let perp = { x: -dir.y, y: dir.x };
          if (sub(mid, centroid).x * perp.x + sub(mid, centroid).y * perp.y < 0) perp = mul(perp, -1);

          return (
            <g key={`edge-${i}`}>
              {edge.label && (
                <text
                  x={mid.x + perp.x * 16}
                  y={mid.y + perp.y * 16}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-slate-800 text-xs font-semibold"
                  stroke="#ffffff"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {edge.label}
                </text>
              )}
              {Array.from({ length: edge.ticks ?? 0 }, (_, k) => {
                const off = (k - ((edge.ticks ?? 1) - 1) / 2) * 5;
                const c = add(mid, mul(dir, off));
                return (
                  <line
                    key={`tick-${i}-${k}`}
                    x1={c.x - perp.x * 5}
                    y1={c.y - perp.y * 5}
                    x2={c.x + perp.x * 5}
                    y2={c.y + perp.y * 5}
                    stroke="#1e293b"
                    strokeWidth={1.5}
                  />
                );
              })}
              {Array.from({ length: edge.arrows ?? 0 }, (_, k) => {
                const c = add(mid, mul(dir, (k - ((edge.arrows ?? 1) - 1) / 2) * 6));
                const back = mul(dir, -5);
                const wing = mul(perp, 4);
                const tail1 = add(add(c, back), wing);
                const tail2 = add(add(c, back), mul(wing, -1));
                return (
                  <path
                    key={`arrow-${i}-${k}`}
                    d={`M ${tail1.x} ${tail1.y} L ${c.x} ${c.y} L ${tail2.x} ${tail2.y}`}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth={1.5}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Vertex marks: right angle, angle arc/label, vertex label */}
        {verts.map((vertex, i) => {
          const v = pix[i];
          const prev = pix[(i - 1 + n) % n];
          const next = pix[(i + 1) % n];
          const d1 = norm(sub(prev, v));
          const d2 = norm(sub(next, v));
          const bis = norm(add(d1, d2));
          const out = norm(sub(v, centroid));

          return (
            <g key={`vertex-${i}`}>
              {vertex.rightAngle ? (
                <path
                  d={`M ${v.x + d1.x * 11} ${v.y + d1.y * 11} L ${v.x + (d1.x + d2.x) * 11} ${v.y + (d1.y + d2.y) * 11} L ${v.x + d2.x * 11} ${v.y + d2.y * 11}`}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth={1.5}
                />
              ) : (
                vertex.angleLabel && (
                  <path d={arcPath(v, d1, d2, 15)} fill="none" stroke="#7c3aed" strokeWidth={1.75} />
                )
              )}
              {vertex.angleLabel && (
                <text
                  x={v.x + bis.x * 27}
                  y={v.y + bis.y * 27}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-violet-700 text-xs font-semibold"
                  stroke="#ffffff"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {vertex.angleLabel}
                </text>
              )}
              {diagram.showVertexDots && (
                <circle cx={v.x} cy={v.y} r={2.5} fill="#1e293b" />
              )}
              {vertex.label && (
                <text
                  x={v.x + out.x * 15}
                  y={v.y + out.y * 15}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-slate-900 text-xs font-bold"
                  stroke="#ffffff"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {vertex.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
