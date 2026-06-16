"use client";

import * as React from "react";
import type { Solid3DDiagram, StatChartColor } from "../../../lib/lessons/types";

const colorHex: Record<StatChartColor, string> = {
  blue: "#2563eb",
  teal: "#0d9488",
  violet: "#7c3aed",
  amber: "#d97706",
  green: "#059669",
  red: "#dc2626",
};

const W = 240;
const H = 220;
const EDGE = "#1e293b";

/** Sampled elliptical arc, t in degrees: 0=right, 90=bottom, 180=left, 270=top. */
function arc(cx: number, cy: number, rx: number, ry: number, t0: number, t1: number) {
  const steps = 24;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = ((t0 + ((t1 - t0) * i) / steps) * Math.PI) / 180;
    const x = cx + rx * Math.cos(t);
    const y = cy + ry * Math.sin(t);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}

export function Solid3DView({
  diagram,
  className,
}: {
  diagram: Solid3DDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const stroke = colorHex[diagram.color ?? "blue"];
  const labels = diagram.labels ?? {};

  const face = { fill: stroke, fillOpacity: 0.13 };
  const solid = { fill: "none", stroke: EDGE, strokeWidth: 2, strokeLinejoin: "round" as const };
  const hidden = { fill: "none", stroke: "#94a3b8", strokeWidth: 1.4, strokeDasharray: "4 3" };
  const labelClass = "fill-slate-800 text-xs font-semibold";
  const halo = { stroke: "#ffffff", strokeWidth: 3, paintOrder: "stroke" as const };

  function lbl(x: number, y: number, text?: string, anchor: "start" | "middle" | "end" = "middle") {
    if (!text) return null;
    return (
      <text x={x} y={y} textAnchor={anchor} dominantBaseline="central" className={labelClass} {...halo}>
        {text}
      </text>
    );
  }

  const body = (() => {
    switch (diagram.solid) {
      case "rectangularPrism":
      case "cube": {
        const isCube = diagram.solid === "cube";
        const fw = isCube ? 96 : 116;
        const fh = isCube ? 96 : 86;
        const dx = 34;
        const dy = -26;
        const x = 46;
        const y = 74;
        const A = { x, y }, B = { x: x + fw, y }, C = { x: x + fw, y: y + fh }, D = { x, y: y + fh };
        const A2 = { x: A.x + dx, y: A.y + dy }, B2 = { x: B.x + dx, y: B.y + dy };
        const C2 = { x: C.x + dx, y: C.y + dy }, D2 = { x: D.x + dx, y: D.y + dy };
        const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");
        return (
          <>
            <polygon points={poly([A, B, C, D])} {...face} />
            <polygon points={poly([A, B, B2, A2])} {...face} />
            <polygon points={poly([B, C, C2, B2])} {...face} />
            {/* hidden back edges */}
            <path d={`M ${A2.x} ${A2.y} L ${D2.x} ${D2.y} L ${C2.x} ${C2.y}`} {...hidden} />
            <path d={`M ${D.x} ${D.y} L ${D2.x} ${D2.y}`} {...hidden} />
            {/* visible edges */}
            <polygon points={poly([A, B, C, D])} {...solid} />
            <path d={`M ${A.x} ${A.y} L ${A2.x} ${A2.y} L ${B2.x} ${B2.y} L ${B.x} ${B.y}`} {...solid} />
            <path d={`M ${B2.x} ${B2.y} L ${C2.x} ${C2.y} L ${C.x} ${C.y}`} {...solid} />
            {lbl((D.x + C.x) / 2, D.y + 15, isCube ? labels.length ?? labels.base : labels.length)}
            {lbl(C.x + 14, (B.y + C.y) / 2, labels.height, "start")}
            {lbl((B.x + B2.x) / 2 + 8, (B.y + B2.y) / 2 - 8, labels.width, "start")}
          </>
        );
      }
      case "cylinder": {
        const cxc = 116;
        const rx = 46;
        const ry = 15;
        const top = 60;
        const bot = 168;
        return (
          <>
            <rect x={cxc - rx} y={top} width={rx * 2} height={bot - top} {...face} />
            <ellipse cx={cxc} cy={top} rx={rx} ry={ry} {...face} />
            {/* hidden back half of bottom ellipse */}
            <path d={arc(cxc, bot, rx, ry, 180, 360)} {...hidden} />
            {/* visible: sides, top ellipse, front of bottom */}
            <line x1={cxc - rx} y1={top} x2={cxc - rx} y2={bot} {...solid} />
            <line x1={cxc + rx} y1={top} x2={cxc + rx} y2={bot} {...solid} />
            <ellipse cx={cxc} cy={top} rx={rx} ry={ry} {...solid} />
            <path d={arc(cxc, bot, rx, ry, 0, 180)} {...solid} />
            <line x1={cxc} y1={top} x2={cxc + rx} y2={top} {...hidden} />
            {lbl(cxc + rx / 2, top - 6, labels.radius)}
            {lbl(cxc + rx + 12, (top + bot) / 2, labels.height, "start")}
          </>
        );
      }
      case "cone": {
        const cxc = 116;
        const rx = 46;
        const ry = 14;
        const by = 168;
        const ay = 52;
        return (
          <>
            <polygon points={`${cxc - rx},${by} ${cxc},${ay} ${cxc + rx},${by}`} {...face} />
            <path d={arc(cxc, by, rx, ry, 180, 360)} {...hidden} />
            <line x1={cxc} y1={ay} x2={cxc} y2={by} {...hidden} />
            <line x1={cxc - rx} y1={by} x2={cxc} y2={ay} {...solid} />
            <line x1={cxc + rx} y1={by} x2={cxc} y2={ay} {...solid} />
            <path d={arc(cxc, by, rx, ry, 0, 180)} {...solid} />
            {lbl(cxc + rx / 2, by - 6, labels.radius)}
            {lbl(cxc - 10, (ay + by) / 2, labels.height, "end")}
            {lbl((cxc + rx) / 2 + cxc / 2 + 8, (ay + by) / 2, labels.slant, "start")}
          </>
        );
      }
      case "squarePyramid": {
        const P1 = { x: 56, y: 168 };
        const P2 = { x: 156, y: 168 };
        const dx = 30, dy = -22;
        const P3 = { x: P2.x + dx, y: P2.y + dy };
        const P4 = { x: P1.x + dx, y: P1.y + dy };
        const center = { x: (P1.x + P3.x) / 2, y: (P1.y + P3.y) / 2 };
        const apex = { x: center.x, y: 50 };
        return (
          <>
            <polygon points={`${P1.x},${P1.y} ${P2.x},${P2.y} ${apex.x},${apex.y}`} {...face} />
            <polygon points={`${P2.x},${P2.y} ${P3.x},${P3.y} ${apex.x},${apex.y}`} {...face} />
            {/* hidden: back base edges + back apex edge + altitude */}
            <path d={`M ${P3.x} ${P3.y} L ${P4.x} ${P4.y} L ${P1.x} ${P1.y}`} {...hidden} />
            <line x1={apex.x} y1={apex.y} x2={P4.x} y2={P4.y} {...hidden} />
            <line x1={apex.x} y1={apex.y} x2={center.x} y2={center.y} {...hidden} />
            {/* visible base + apex edges */}
            <path d={`M ${P1.x} ${P1.y} L ${P2.x} ${P2.y} L ${P3.x} ${P3.y}`} {...solid} />
            <line x1={apex.x} y1={apex.y} x2={P1.x} y2={P1.y} {...solid} />
            <line x1={apex.x} y1={apex.y} x2={P2.x} y2={P2.y} {...solid} />
            <line x1={apex.x} y1={apex.y} x2={P3.x} y2={P3.y} {...solid} />
            {lbl((P1.x + P2.x) / 2, P1.y + 15, labels.base ?? labels.length)}
            {lbl(center.x - 8, (apex.y + center.y) / 2, labels.height, "end")}
            {lbl((apex.x + P2.x) / 2 + 8, (apex.y + P2.y) / 2, labels.slant, "start")}
          </>
        );
      }
      case "triangularPrism": {
        const T1 = { x: 56, y: 156 };
        const T2 = { x: 148, y: 156 };
        const T3 = { x: 102, y: 80 };
        const dx = 36, dy = -26;
        const t = (p: { x: number; y: number }) => ({ x: p.x + dx, y: p.y + dy });
        const T1b = t(T1), T2b = t(T2), T3b = t(T3);
        const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");
        return (
          <>
            <polygon points={poly([T1, T2, T3])} {...face} />
            <polygon points={poly([T2, T3, T3b, T2b])} {...face} />
            {/* hidden back triangle */}
            <path d={`M ${T1b.x} ${T1b.y} L ${T2b.x} ${T2b.y} L ${T3b.x} ${T3b.y} Z`} {...hidden} />
            <line x1={T1.x} y1={T1.y} x2={T1b.x} y2={T1b.y} {...hidden} />
            {/* visible */}
            <polygon points={poly([T1, T2, T3])} {...solid} />
            <line x1={T2.x} y1={T2.y} x2={T2b.x} y2={T2b.y} {...solid} />
            <line x1={T3.x} y1={T3.y} x2={T3b.x} y2={T3b.y} {...solid} />
            {lbl((T1.x + T2.x) / 2, T1.y + 15, labels.base)}
            {lbl(T3.x - 12, (T3.y + T1.y) / 2, labels.height, "end")}
            {lbl((T2.x + T2b.x) / 2 + 8, (T2.y + T2b.y) / 2 - 6, labels.length, "start")}
          </>
        );
      }
      case "sphere":
      default: {
        const cxc = 120;
        const cyc = 110;
        const r = 66;
        return (
          <>
            <circle cx={cxc} cy={cyc} r={r} {...face} />
            <circle cx={cxc} cy={cyc} r={r} {...solid} />
            <path d={arc(cxc, cyc, r, 18, 0, 180)} {...solid} />
            <path d={arc(cxc, cyc, r, 18, 180, 360)} {...hidden} />
            <line x1={cxc} y1={cyc} x2={cxc + r} y2={cyc} {...hidden} />
            {lbl(cxc + r / 2, cyc - 7, labels.radius)}
          </>
        );
      }
    }
  })();

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[240px] min-w-[220px]"
      >
        <title id={titleId}>{diagram.description}</title>
        {body}
      </svg>
    </div>
  );
}
