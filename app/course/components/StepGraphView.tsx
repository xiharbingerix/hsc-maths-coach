"use client";

import * as React from "react";
import type { StepGraphDiagram } from "../../../lib/lessons/types";

const width = 420;
const height = 300;
const padding = { top: 20, right: 24, bottom: 44, left: 52 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;
const ACCENT = "#0f766e";

function ticksBetween(min: number, max: number, step: number) {
  if (step <= 0 || max <= min) return [];
  const first = Math.ceil(min / step) * step;
  const out: number[] = [];
  for (let v = first; v <= max + step / 1000; v += step) out.push(Number(v.toFixed(10)));
  return out;
}

function formatTick(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

export function StepGraphView({
  diagram,
  className,
}: {
  diagram: StepGraphDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const segments = diagram.segments ?? [];

  const xsAll = segments.flatMap((s) => [s.xStart, s.xEnd]);
  const ysAll = segments.map((s) => s.y);
  const xMin = diagram.xMin ?? Math.min(0, ...xsAll);
  const xMax = diagram.xMax ?? Math.max(1, ...xsAll);
  const yMin = diagram.yMin ?? 0;
  const yMax = diagram.yMax ?? Math.max(1, ...ysAll) * 1.15;
  const xStep = diagram.xStep && diagram.xStep > 0 ? diagram.xStep : Math.max(1, Math.ceil((xMax - xMin) / 6));
  const yStep = diagram.yStep && diagram.yStep > 0 ? diagram.yStep : Math.max(1, Math.ceil((yMax - yMin) / 6));

  const toSvg = (x: number, y: number) => ({
    x: padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth,
    y: padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight,
  });

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

        {segments.map((seg, i) => {
          const a = toSvg(seg.xStart, seg.y);
          const b = toSvg(seg.xEnd, seg.y);
          const closedStart = seg.closedStart ?? true;
          const closedEnd = seg.closedEnd ?? false;
          return (
            <g key={`seg-${i}`}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
              <circle cx={a.x} cy={a.y} r={4.5} fill={closedStart ? ACCENT : "#ffffff"} stroke={ACCENT} strokeWidth={2} />
              <circle cx={b.x} cy={b.y} r={4.5} fill={closedEnd ? ACCENT : "#ffffff"} stroke={ACCENT} strokeWidth={2} />
            </g>
          );
        })}

        <text x={padding.left + plotWidth} y={height - 6} textAnchor="end" className="fill-slate-800 text-sm font-semibold">{diagram.xAxisLabel ?? "x"}</text>
        <text x={14} y={padding.top - 6} className="fill-slate-800 text-sm font-semibold">{diagram.yAxisLabel ?? "y"}</text>
      </svg>
    </div>
  );
}
