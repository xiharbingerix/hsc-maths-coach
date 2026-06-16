"use client";

import * as React from "react";
import type { PieChartDiagram, StatChartColor } from "../../../lib/lessons/types";

const colorHex: Record<StatChartColor, string> = {
  blue: "#2563eb",
  teal: "#0d9488",
  violet: "#7c3aed",
  amber: "#d97706",
  green: "#059669",
  red: "#dc2626",
};

const palette = ["#2563eb", "#0d9488", "#7c3aed", "#d97706", "#059669", "#dc2626", "#0891b2", "#db2777"];

const W = 320;
const H = 210;
const cx = 108;
const cy = 105;
const R = 82;

export function PieChartView({
  diagram,
  className,
}: {
  diagram: PieChartDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;

  const slices = diagram.slices ?? [];
  const total = slices.reduce((s, sl) => s + sl.value, 0) || 1;

  const toXY = (deg: number, radius: number) => {
    const r = (deg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(r), y: cy - radius * Math.sin(r) };
  };

  const wedges = slices.map((slice, i) => {
    const before = slices.slice(0, i).reduce((a, b) => a + b.value, 0);
    const a0 = 90 - (before / total) * 360;
    const a1 = a0 - (slice.value / total) * 360;
    const fill = slice.color ? colorHex[slice.color] : palette[i % palette.length];
    const percent = Math.round((slice.value / total) * 100);
    return { slice, a0, a1, fill, percent };
  });

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[230px] min-w-[280px]"
      >
        <title id={titleId}>{diagram.description}</title>

        {wedges.map(({ a0, a1, fill }, i) => {
          const sliceDeg = a0 - a1;
          if (sliceDeg >= 359.999) {
            return <circle key={`slice-${i}`} cx={cx} cy={cy} r={R} fill={fill} stroke="#ffffff" strokeWidth={1.5} />;
          }
          const p0 = toXY(a0, R);
          const p1 = toXY(a1, R);
          const largeArc = sliceDeg > 180 ? 1 : 0;
          return (
            <path
              key={`slice-${i}`}
              d={`M ${cx} ${cy} L ${p0.x} ${p0.y} A ${R} ${R} 0 ${largeArc} 1 ${p1.x} ${p1.y} Z`}
              fill={fill}
              stroke="#ffffff"
              strokeWidth={1.5}
            />
          );
        })}

        {wedges.map(({ slice, a0, a1, percent }, i) => {
          const mid = (a0 + a1) / 2;
          const pos = toXY(mid, R * 1.18);
          const anchor = Math.cos((mid * Math.PI) / 180) >= 0 ? "start" : "end";
          const text = diagram.showPercentages ? `${slice.label} (${percent}%)` : slice.label;
          return (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y}
              textAnchor={anchor}
              dominantBaseline="central"
              className="fill-slate-700 text-xs"
            >
              {text}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
