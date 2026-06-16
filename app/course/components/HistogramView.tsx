"use client";

import * as React from "react";
import type { HistogramDiagram } from "../../../lib/lessons/types";
import { axisTicks, mathLabel } from "./plotUtils";

const width = 440;
const height = 300;
const padding = { top: 18, right: 20, bottom: 54, left: 48 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

/** Running totals [a, a+b, a+b+c, …] without mutating outer state. */
function cumulativeSums(values: number[]): number[] {
  return values.map((_, i) => values.slice(0, i + 1).reduce((sum, v) => sum + v, 0));
}

export function HistogramView({
  diagram,
  className,
}: {
  diagram: HistogramDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;

  const bins = diagram.bins;
  const rawFrequencies = bins.map((b) => b.frequency);
  const frequencies = diagram.cumulative ? cumulativeSums(rawFrequencies) : rawFrequencies;
  const dataMax = frequencies.reduce((m, f) => Math.max(m, f), 0);
  const { ticks, axisMax } = axisTicks(diagram.valueMax ?? dataMax, diagram.valueStep);
  const slot = plotWidth / Math.max(bins.length, 1);

  const toY = (f: number) => padding.top + plotHeight - (f / axisMax) * plotHeight;
  const polygonPoints = frequencies
    .map((f, i) => `${padding.left + slot * i + slot / 2},${toY(f)}`)
    .join(" ");

  const freqLabel =
    diagram.frequencyAxisLabel ?? (diagram.cumulative ? "Cumulative frequency" : "Frequency");

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

        {ticks.map((t) => {
          const y = toY(t);
          return (
            <g key={`tick-${t}`}>
              <line x1={padding.left} y1={y} x2={padding.left + plotWidth} y2={y} stroke="#e2e8f0" />
              <text x={padding.left - 8} y={y} textAnchor="end" dominantBaseline="central" className="fill-slate-600 text-xs">{t}</text>
            </g>
          );
        })}

        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />
        <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />

        {/* Adjacent bars */}
        {bins.map((bin, i) => {
          const f = frequencies[i];
          const h = (f / axisMax) * plotHeight;
          return (
            <g key={`bin-${i}`}>
              <rect
                x={padding.left + slot * i}
                y={padding.top + plotHeight - h}
                width={slot}
                height={Math.max(h, 0)}
                fill="#0d9488"
                fillOpacity={0.75}
                stroke="#ffffff"
                strokeWidth={1}
              />
              <text x={padding.left + slot * i + slot / 2} y={padding.top + plotHeight + 16} textAnchor="middle" className="fill-slate-700 text-xs">{mathLabel(bin.label)}</text>
            </g>
          );
        })}

        {/* Frequency polygon / ogive overlay */}
        {diagram.showFrequencyPolygon && bins.length > 1 && (
          <polyline points={polygonPoints} fill="none" stroke="#7c3aed" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        )}
        {diagram.showFrequencyPolygon &&
          frequencies.map((f, i) => (
            <circle key={`pt-${i}`} cx={padding.left + slot * i + slot / 2} cy={toY(f)} r={3} fill="#7c3aed" />
          ))}

        <text x={14} y={padding.top - 6} className="fill-slate-800 text-xs font-semibold">{freqLabel}</text>
        {diagram.axisLabel && (
          <text x={padding.left + plotWidth / 2} y={height - 4} textAnchor="middle" className="fill-slate-800 text-xs font-semibold">{mathLabel(diagram.axisLabel)}</text>
        )}
      </svg>
    </div>
  );
}
