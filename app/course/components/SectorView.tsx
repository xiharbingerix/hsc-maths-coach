"use client";

import * as React from "react";
import type { SectorDiagram, StatChartColor } from "../../../lib/lessons/types";

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
const cx = 116;
const cy = 110;
const R = 80;

export function SectorView({
  diagram,
  className,
}: {
  diagram: SectorDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;

  const sweep = Math.max(0, Math.min(360, diagram.angleDegrees));
  const stroke = colorHex[diagram.color ?? "blue"];

  const toXY = (deg: number) => {
    const r = (deg * Math.PI) / 180;
    return { x: cx + R * Math.cos(r), y: cy - R * Math.sin(r) };
  };
  const at = (deg: number, radius: number) => {
    const r = (deg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(r), y: cy - radius * Math.sin(r) };
  };

  const p0 = toXY(0);
  const p1 = toXY(sweep);
  const largeArc = sweep > 180 ? 1 : 0;
  const sectorPath =
    sweep >= 360
      ? `M ${cx - R} ${cy} A ${R} ${R} 0 1 0 ${cx + R} ${cy} A ${R} ${R} 0 1 0 ${cx - R} ${cy} Z`
      : `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${R} ${R} 0 ${largeArc} 0 ${p1.x} ${p1.y} Z`;

  const bisector = sweep / 2;
  const anglePos = at(bisector, R * 0.34);
  const arcPos = at(bisector, R * 1.16);
  const radiusPos = { x: cx + R * 0.5, y: cy + 14 };

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

        {diagram.showFullCircle && (
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="4 4" />
        )}

        <path d={sectorPath} fill={stroke} fillOpacity={0.18} stroke={stroke} strokeWidth={2} strokeLinejoin="round" />

        {diagram.radiusLabel && (
          <text x={radiusPos.x} y={radiusPos.y} textAnchor="middle" dominantBaseline="central" className="fill-slate-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {diagram.radiusLabel}
          </text>
        )}
        {diagram.angleLabel && (
          <text x={anglePos.x} y={anglePos.y} textAnchor="middle" dominantBaseline="central" className="fill-slate-700 text-xs font-semibold">
            {diagram.angleLabel}
          </text>
        )}
        {diagram.arcLabel && (
          <text x={arcPos.x} y={arcPos.y} textAnchor="middle" dominantBaseline="central" className="fill-slate-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {diagram.arcLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
