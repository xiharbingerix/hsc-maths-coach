"use client";

import * as React from "react";
import type { DotPlotDiagram } from "../../../lib/lessons/types";
import { formatTick, mathLabel, ticksBetween } from "./plotUtils";

const width = 440;
const marginX = 30;
const topPadding = 16;
const dotRadius = 4.5;
const dotGap = 12;
const plotWidth = width - 2 * marginX;

/** Resolve `values`/`counts` into one ordered list of {value, count}. */
function resolveCounts(diagram: DotPlotDiagram): { value: number; count: number }[] {
  if (diagram.counts?.length) return diagram.counts;
  const tally = new Map<number, number>();
  for (const v of diagram.values ?? []) {
    tally.set(v, (tally.get(v) ?? 0) + 1);
  }
  return [...tally.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value - b.value);
}

export function DotPlotView({
  diagram,
  className,
}: {
  diagram: DotPlotDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;

  const min = diagram.min;
  const max = diagram.max > diagram.min ? diagram.max : diagram.min + 1;
  const step = diagram.step && diagram.step > 0 ? diagram.step : 1;
  const ticks = ticksBetween(min, max, step);
  const counts = resolveCounts(diagram);
  const maxCount = counts.reduce((m, c) => Math.max(m, c.count), 0);

  const axisY = topPadding + Math.max(maxCount, 1) * dotGap;
  const height = axisY + 34;

  const toX = (value: number) =>
    marginX + ((value - min) / (max - min)) * plotWidth;

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="min-w-[320px]"
        style={{ maxHeight: Math.min(height, 280) }}
      >
        <title id={titleId}>{diagram.description}</title>

        <line
          x1={marginX}
          y1={axisY}
          x2={width - marginX}
          y2={axisY}
          stroke="#475569"
          strokeWidth={2}
        />

        {ticks.map((value) => {
          const x = toX(value);
          return (
            <g key={`tick-${value}`}>
              <line x1={x} y1={axisY} x2={x} y2={axisY + 5} stroke="#475569" strokeWidth={1.5} />
              <text x={x} y={axisY + 19} textAnchor="middle" className="fill-slate-600 text-xs">
                {formatTick(value)}
              </text>
            </g>
          );
        })}

        {counts.map(({ value, count }) =>
          Array.from({ length: count }, (_, i) => (
            <circle
              key={`dot-${value}-${i}`}
              cx={toX(value)}
              cy={axisY - dotGap * i - dotGap / 2}
              r={dotRadius}
              fill="#0f766e"
              stroke="#ffffff"
              strokeWidth={1.5}
            />
          ))
        )}

        {diagram.axisLabel && (
          <text
            x={width - marginX}
            y={axisY + 19}
            textAnchor="end"
            className="fill-slate-800 text-sm font-semibold"
          >
            {mathLabel(diagram.axisLabel)}
          </text>
        )}
      </svg>
    </div>
  );
}
