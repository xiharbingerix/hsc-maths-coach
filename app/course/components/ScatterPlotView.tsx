"use client";

import * as React from "react";
import type { ScatterPlotDiagram, ScatterPoint } from "../../../lib/lessons/types";
import { formatTick, mathLabel, ticksBetween } from "./plotUtils";

const width = 440;
const height = 320;
const padding = { top: 20, right: 24, bottom: 44, left: 48 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

/** Least-squares regression line through the points, or null if undefined. */
function leastSquares(points: ScatterPoint[]): { m: number; b: number } | null {
  const n = points.length;
  if (n < 2) return null;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
  const denom = n * sumXX - sumX * sumX;
  if (Math.abs(denom) < 1e-9) return null;
  const m = (n * sumXY - sumX * sumY) / denom;
  const b = (sumY - m * sumX) / n;
  return { m, b };
}

/** A rounded [min, max] spanning the data with ~10% margin. */
function autoBounds(values: number[], givenMin?: number, givenMax?: number) {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  const min = givenMin ?? Math.floor(lo - span * 0.1);
  const max = givenMax ?? Math.ceil(hi + span * 0.1);
  return { min, max: max > min ? max : min + 1 };
}

export function ScatterPlotView({
  diagram,
  className,
}: {
  diagram: ScatterPlotDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const clipId = `${reactId}-clip`;

  const points = diagram.points ?? [];
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const { min: xMin, max: xMax } = autoBounds(xs.length ? xs : [0, 1], diagram.xMin, diagram.xMax);
  const { min: yMin, max: yMax } = autoBounds(ys.length ? ys : [0, 1], diagram.yMin, diagram.yMax);
  const xStep = diagram.xStep && diagram.xStep > 0 ? diagram.xStep : Math.max(1, Math.ceil((xMax - xMin) / 6));
  const yStep = diagram.yStep && diagram.yStep > 0 ? diagram.yStep : Math.max(1, Math.ceil((yMax - yMin) / 6));

  const toSvg = (x: number, y: number) => ({
    x: padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth,
    y: padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight,
  });

  const fit =
    diagram.lineOfBestFit === "auto"
      ? leastSquares(points)
      : diagram.lineOfBestFit ?? null;

  // Clip the fitted line to the plot's x-range.
  const fitLine = fit
    ? [
        { x: xMin, y: fit.m * xMin + fit.b },
        { x: xMax, y: fit.m * xMax + fit.b },
      ].map((p) => toSvg(p.x, p.y))
    : null;

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[340px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>
        <defs>
          <clipPath id={clipId}>
            <rect x={padding.left} y={padding.top} width={plotWidth} height={plotHeight} />
          </clipPath>
        </defs>

        <rect x={padding.left} y={padding.top} width={plotWidth} height={plotHeight} fill="#ffffff" stroke="#cbd5e1" />

        {ticksBetween(xMin, xMax, xStep).map((v) => {
          const p = toSvg(v, yMin);
          return (
            <g key={`xt-${v}`}>
              <line x1={p.x} y1={padding.top} x2={p.x} y2={padding.top + plotHeight} stroke="#eef2f6" />
              <text x={p.x} y={padding.top + plotHeight + 16} textAnchor="middle" className="fill-slate-600 text-xs">{formatTick(v)}</text>
            </g>
          );
        })}
        {ticksBetween(yMin, yMax, yStep).map((v) => {
          const p = toSvg(xMin, v);
          return (
            <g key={`yt-${v}`}>
              <line x1={padding.left} y1={p.y} x2={padding.left + plotWidth} y2={p.y} stroke="#eef2f6" />
              <text x={padding.left - 8} y={p.y} textAnchor="end" dominantBaseline="central" className="fill-slate-600 text-xs">{formatTick(v)}</text>
            </g>
          );
        })}

        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />
        <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />

        {fitLine && (
          <line
            x1={fitLine[0].x}
            y1={fitLine[0].y}
            x2={fitLine[1].x}
            y2={fitLine[1].y}
            stroke="#2563eb"
            strokeWidth={2.5}
            clipPath={`url(#${clipId})`}
          />
        )}

        <g clipPath={`url(#${clipId})`}>
          {points.map((p, i) => {
            const sp = toSvg(p.x, p.y);
            return <circle key={`pt-${i}`} cx={sp.x} cy={sp.y} r={4} fill="#0f766e" stroke="#ffffff" strokeWidth={1.5} />;
          })}
        </g>

        {diagram.correlationLabel && (
          <text x={padding.left + plotWidth - 6} y={padding.top + 14} textAnchor="end" className="fill-blue-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
            {mathLabel(diagram.correlationLabel)}
          </text>
        )}

        <text x={padding.left + plotWidth} y={height - 6} textAnchor="end" className="fill-slate-800 text-sm font-semibold">{mathLabel(diagram.xAxisLabel ?? "x")}</text>
        <text x={14} y={padding.top - 6} className="fill-slate-800 text-sm font-semibold">{mathLabel(diagram.yAxisLabel ?? "y")}</text>
      </svg>
    </div>
  );
}
