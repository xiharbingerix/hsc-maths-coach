"use client";

import * as React from "react";
import type { NetDiagram, StatChartColor } from "../../../lib/lessons/types";

const colorHex: Record<StatChartColor, string> = {
  blue: "#2563eb",
  teal: "#0d9488",
  violet: "#7c3aed",
  amber: "#d97706",
  green: "#059669",
  red: "#dc2626",
};

const W = 300;
const H = 250;

export function NetView({
  diagram,
  className,
}: {
  diagram: NetDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const stroke = colorHex[diagram.color ?? "blue"];
  const labels = diagram.labels ?? {};

  const faceProps = { fill: stroke, fillOpacity: 0.13, stroke: "#1e293b", strokeWidth: 1.75 };
  const labelClass = "fill-slate-800 text-xs font-semibold";
  const halo = { stroke: "#ffffff", strokeWidth: 3, paintOrder: "stroke" as const };

  const rect = (x: number, y: number, w: number, h: number, key: string) => (
    <rect key={key} x={x} y={y} width={w} height={h} {...faceProps} />
  );
  const lbl = (x: number, y: number, text?: string, anchor: "start" | "middle" | "end" = "middle") =>
    text ? (
      <text key={`l-${x}-${y}`} x={x} y={y} textAnchor={anchor} dominantBaseline="central" className={labelClass} {...halo}>
        {text}
      </text>
    ) : null;

  const body = (() => {
    switch (diagram.solid) {
      case "cube": {
        const s = 52;
        const ox = 60;
        const oy = 38;
        const cell = (c: number, r: number, k: string) => rect(ox + c * s, oy + r * s, s, s, k);
        return (
          <>
            {cell(1, 0, "t")}
            {cell(0, 1, "l")}
            {cell(1, 1, "f")}
            {cell(2, 1, "r")}
            {cell(3, 1, "bk")}
            {cell(1, 2, "bo")}
            {lbl(ox + 1.5 * s, oy + 2 * s + 14, labels.base ?? labels.length)}
          </>
        );
      }
      case "rectangularPrism": {
        const l = 92;
        const w = 34;
        const h = 58;
        const x0 = 26;
        const y0 = 18;
        return (
          <>
            {rect(x0, y0 + w, w, h, "left")}
            {rect(x0 + w, y0 + w, l, h, "front")}
            {rect(x0 + w + l, y0 + w, w, h, "right")}
            {rect(x0 + w, y0, l, w, "top")}
            {rect(x0 + w, y0 + w + h, l, w, "bottom")}
            {rect(x0 + w, y0 + w + h + w, l, h, "back")}
            {lbl(x0 + w + l / 2, y0 + w / 2, labels.length)}
            {lbl(x0 + w / 2, y0 + w + h / 2, labels.width)}
            {lbl(x0 + w + l + w / 2, y0 + w + h / 2, labels.height)}
          </>
        );
      }
      case "cylinder": {
        const Wr = 150;
        const Hr = 74;
        const r = 26;
        const x0 = 46;
        const y0 = 14;
        const cxr = x0 + Wr / 2;
        return (
          <>
            <circle cx={cxr} cy={y0 + r} r={r} {...faceProps} />
            {rect(x0, y0 + 2 * r, Wr, Hr, "body")}
            <circle cx={cxr} cy={y0 + 2 * r + Hr + r} r={r} {...faceProps} />
            {labels.radius ? (
              <line
                x1={cxr}
                y1={y0 + r}
                x2={cxr + r}
                y2={y0 + r}
                stroke="#64748b"
                strokeWidth={1.4}
              />
            ) : null}
            {lbl(cxr + r / 2, y0 + r - 9, labels.radius)}
            {lbl(x0 + Wr + 12, y0 + 2 * r + Hr / 2, labels.height, "start")}
            {lbl(cxr, y0 + 2 * r - 8, labels.length)}
          </>
        );
      }
      case "squarePyramid": {
        const s = 64;
        const slant = 46;
        const cx = 150;
        const cy = 122;
        const x = cx - s / 2;
        const y = cy - s / 2;
        return (
          <>
            {rect(x, y, s, s, "base")}
            <polygon points={`${x},${y} ${x + s},${y} ${cx},${y - slant}`} {...faceProps} />
            <polygon points={`${x + s},${y} ${x + s},${y + s} ${x + s + slant},${cy}`} {...faceProps} />
            <polygon points={`${x},${y + s} ${x + s},${y + s} ${cx},${y + s + slant}`} {...faceProps} />
            <polygon points={`${x},${y} ${x},${y + s} ${x - slant},${cy}`} {...faceProps} />
            {lbl(cx, y + s / 2, labels.base)}
            {lbl(cx, y - slant + 14, labels.slant)}
          </>
        );
      }
      case "cone": {
        const apex = { x: 150, y: 30 };
        const Rs = 96;
        const ha = 58;
        const toEnd = (deg: number) => ({
          x: apex.x + Rs * Math.cos((deg * Math.PI) / 180),
          y: apex.y + Rs * Math.sin((deg * Math.PI) / 180),
        });
        const pL = toEnd(90 + ha);
        const pR = toEnd(90 - ha);
        const r = 24;
        return (
          <>
            <path
              d={`M ${apex.x} ${apex.y} L ${pL.x.toFixed(1)} ${pL.y.toFixed(1)} A ${Rs} ${Rs} 0 0 1 ${pR.x.toFixed(1)} ${pR.y.toFixed(1)} Z`}
              {...faceProps}
            />
            <circle cx={56} cy={186} r={r} {...faceProps} />
            {lbl(apex.x - 40, apex.y + Rs / 2, labels.slant, "end")}
            {lbl(56, 186, labels.radius)}
          </>
        );
      }
      case "triangularPrism":
      default: {
        const L = 70;
        const p = 50;
        const q = 58;
        const rr = 50;
        const x0 = 30;
        const y0 = 70;
        const triH = 42;
        return (
          <>
            {rect(x0, y0, p, L, "r1")}
            {rect(x0 + p, y0, q, L, "r2")}
            {rect(x0 + p + q, y0, rr, L, "r3")}
            <polygon points={`${x0},${y0} ${x0 + p},${y0} ${x0 + p / 2},${y0 - triH}`} {...faceProps} />
            <polygon points={`${x0},${y0 + L} ${x0 + p},${y0 + L} ${x0 + p / 2},${y0 + L + triH}`} {...faceProps} />
            {lbl(x0 + p / 2, y0 - triH + 16, labels.base)}
            {lbl(x0 + p + q + rr + 12, y0 + L / 2, labels.length, "start")}
            {lbl(x0 + p / 2, y0 + L / 2, labels.height)}
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
        className="max-h-[260px] min-w-[260px]"
      >
        <title id={titleId}>{diagram.description}</title>
        {body}
      </svg>
    </div>
  );
}
