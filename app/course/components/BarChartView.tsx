"use client";

import * as React from "react";
import type { BarChartDiagram, StatChartColor } from "../../../lib/lessons/types";
import { axisTicks, mathLabel } from "./plotUtils";

const statColorHex: Record<StatChartColor, string> = {
  blue: "#2563eb",
  teal: "#0d9488",
  violet: "#7c3aed",
  amber: "#d97706",
  green: "#059669",
  red: "#dc2626",
};

const width = 440;
const height = 300;

export function BarChartView({
  diagram,
  className,
}: {
  diagram: BarChartDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const horizontal = diagram.orientation === "horizontal";
  const bars = diagram.bars;
  const dataMax = bars.reduce((m, b) => Math.max(m, b.value), 0);
  const { ticks, axisMax } = axisTicks(diagram.valueMax ?? dataMax, diagram.valueStep);

  const padding = horizontal
    ? { top: 18, right: 24, bottom: 42, left: 96 }
    : { top: 18, right: 20, bottom: 54, left: 48 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const slot = (horizontal ? plotHeight : plotWidth) / Math.max(bars.length, 1);
  const barThickness = slot * 0.62;

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[320px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>

        {/* Value-axis gridlines + ticks */}
        {ticks.map((t) => {
          if (horizontal) {
            const x = padding.left + (t / axisMax) * plotWidth;
            return (
              <g key={`vtick-${t}`}>
                <line x1={x} y1={padding.top} x2={x} y2={padding.top + plotHeight} stroke="#e2e8f0" />
                <text x={x} y={padding.top + plotHeight + 16} textAnchor="middle" className="fill-slate-600 text-xs">{t}</text>
              </g>
            );
          }
          const y = padding.top + plotHeight - (t / axisMax) * plotHeight;
          return (
            <g key={`vtick-${t}`}>
              <line x1={padding.left} y1={y} x2={padding.left + plotWidth} y2={y} stroke="#e2e8f0" />
              <text x={padding.left - 8} y={y} textAnchor="end" dominantBaseline="central" className="fill-slate-600 text-xs">{t}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />
        <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />

        {/* Bars */}
        {bars.map((bar, i) => {
          const fill = statColorHex[bar.color ?? "teal"];
          if (horizontal) {
            const y = padding.top + slot * i + (slot - barThickness) / 2;
            const w = (bar.value / axisMax) * plotWidth;
            return (
              <g key={`bar-${i}`}>
                <rect x={padding.left} y={y} width={Math.max(w, 0)} height={barThickness} fill={fill} rx={2} />
                <text x={padding.left - 8} y={y + barThickness / 2} textAnchor="end" dominantBaseline="central" className="fill-slate-700 text-xs">{mathLabel(bar.label)}</text>
              </g>
            );
          }
          const x = padding.left + slot * i + (slot - barThickness) / 2;
          const h = (bar.value / axisMax) * plotHeight;
          return (
            <g key={`bar-${i}`}>
              <rect x={x} y={padding.top + plotHeight - h} width={barThickness} height={Math.max(h, 0)} fill={fill} rx={2} />
              <text x={x + barThickness / 2} y={padding.top + plotHeight + 16} textAnchor="middle" className="fill-slate-700 text-xs">{mathLabel(bar.label)}</text>
            </g>
          );
        })}

        {/* Axis labels */}
        {diagram.valueAxisLabel && (
          <text
            x={horizontal ? padding.left + plotWidth / 2 : 14}
            y={horizontal ? height - 6 : padding.top - 6}
            textAnchor={horizontal ? "middle" : "start"}
            className="fill-slate-800 text-xs font-semibold"
          >
            {mathLabel(diagram.valueAxisLabel)}
          </text>
        )}
        {diagram.categoryAxisLabel && (
          <text
            x={horizontal ? 12 : padding.left + plotWidth / 2}
            y={horizontal ? padding.top - 6 : height - 4}
            textAnchor={horizontal ? "start" : "middle"}
            className="fill-slate-800 text-xs font-semibold"
          >
            {mathLabel(diagram.categoryAxisLabel)}
          </text>
        )}
      </svg>
    </div>
  );
}
