"use client";

import * as React from "react";
import type { ArgandDiagram, ArgandPoint } from "../../../lib/lessons/types";

const width = 420;
const height = 320;
const padding = { top: 24, right: 32, bottom: 40, left: 48 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

function ticks(min: number, max: number, step: number) {
  if (step <= 0) return [];
  const first = Math.ceil(min / step) * step;
  const values: number[] = [];
  for (let value = first; value <= max + step / 1000; value += step) {
    values.push(Number(value.toFixed(10)));
  }
  return values;
}

function format(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function pointLabel(point: ArgandPoint) {
  if (point.label) return point.label;
  const sign = point.im >= 0 ? "+" : "-";
  return `${point.re} ${sign} ${Math.abs(point.im)}i`;
}

export function ArgandDiagramView({
  diagram,
  className,
}: {
  diagram: ArgandDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const markerId = `${reactId}-arrow`;
  const realMin = diagram.realMin ?? -5;
  const realMax = diagram.realMax ?? 5;
  const imaginaryMin = diagram.imaginaryMin ?? -5;
  const imaginaryMax = diagram.imaginaryMax ?? 5;
  const realStep = diagram.realStep ?? 1;
  const imaginaryStep = diagram.imaginaryStep ?? 1;
  const xAxisY = imaginaryMin <= 0 && imaginaryMax >= 0 ? 0 : imaginaryMin;
  const yAxisX = realMin <= 0 && realMax >= 0 ? 0 : realMin;
  const realTicks = ticks(realMin, realMax, realStep);
  const imaginaryTicks = ticks(imaginaryMin, imaginaryMax, imaginaryStep);

  const toSvg = React.useCallback(
    (point: ArgandPoint) => ({
      x: padding.left + ((point.re - realMin) / (realMax - realMin)) * plotWidth,
      y:
        padding.top +
        ((imaginaryMax - point.im) / (imaginaryMax - imaginaryMin)) * plotHeight,
    }),
    [imaginaryMax, imaginaryMin, realMax, realMin]
  );

  const allPoints = diagram.points ?? [];
  const conjugatePoints = diagram.showConjugates
    ? allPoints
        .filter((point) => point.im !== 0)
        .map((point) => ({
          re: point.re,
          im: -point.im,
          label: point.label ? `${point.label} conjugate` : undefined,
        }))
    : [];

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[360px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" />
          </marker>
        </defs>
        <rect x={padding.left} y={padding.top} width={plotWidth} height={plotHeight} fill="#ffffff" stroke="#cbd5e1" />

        {realTicks.map((value) => {
          const point = toSvg({ re: value, im: 0 });
          return <line key={`real-grid-${value}`} x1={point.x} y1={padding.top} x2={point.x} y2={padding.top + plotHeight} stroke="#e2e8f0" />;
        })}
        {imaginaryTicks.map((value) => {
          const point = toSvg({ re: 0, im: value });
          return <line key={`imag-grid-${value}`} x1={padding.left} y1={point.y} x2={padding.left + plotWidth} y2={point.y} stroke="#e2e8f0" />;
        })}

        {diagram.modulusCircles?.map((circle, index) => {
          if (!Number.isFinite(circle.radius) || circle.radius <= 0) return null;
          const centre = toSvg({ re: 0, im: 0 });
          return (
            <g key={`circle-${index}`}>
              <ellipse
                cx={centre.x}
                cy={centre.y}
                rx={(circle.radius / (realMax - realMin)) * plotWidth}
                ry={(circle.radius / (imaginaryMax - imaginaryMin)) * plotHeight}
                fill="none"
                stroke="#d97706"
                strokeWidth={2.5}
                strokeDasharray="7 5"
              />
              {circle.label ? (
                <text x={centre.x + (circle.radius / (realMax - realMin)) * plotWidth + 8} y={centre.y - 8} className="fill-amber-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                  {circle.label}
                </text>
              ) : null}
            </g>
          );
        })}

        <line x1={padding.left} y1={toSvg({ re: 0, im: xAxisY }).y} x2={padding.left + plotWidth} y2={toSvg({ re: 0, im: xAxisY }).y} stroke="#475569" strokeWidth={2} />
        <line x1={toSvg({ re: yAxisX, im: 0 }).x} y1={padding.top} x2={toSvg({ re: yAxisX, im: 0 }).x} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />

        {diagram.segments?.map((segment, index) => {
          const from = toSvg(segment.from);
          const to = toSvg(segment.to);
          return (
            <g key={`segment-${index}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#2563eb" strokeWidth={3} strokeLinecap="round" strokeDasharray={segment.dashed ? "7 5" : undefined} />
              {segment.label ? (
                <text x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 8} className="fill-blue-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                  {segment.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {diagram.vectorsFromOrigin?.map((vector, index) => {
          const origin = toSvg({ re: 0, im: 0 });
          const to = toSvg(vector.to);
          return (
            <g key={`vector-${index}`}>
              <line x1={origin.x} y1={origin.y} x2={to.x} y2={to.y} stroke="#0f766e" strokeWidth={3} strokeLinecap="round" strokeDasharray={vector.dashed ? "7 5" : undefined} markerEnd={`url(#${markerId})`} />
              {vector.label ? (
                <text x={(origin.x + to.x) / 2 + 8} y={(origin.y + to.y) / 2 - 8} className="fill-teal-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                  {vector.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {[...allPoints, ...conjugatePoints].map((point, index) => {
          const svgPoint = toSvg(point);
          const isConjugate = index >= allPoints.length;
          return (
            <g key={`point-${index}`}>
              <circle cx={svgPoint.x} cy={svgPoint.y} r={4.5} fill={isConjugate ? "#f59e0b" : "#0f766e"} stroke="#ffffff" strokeWidth={2} />
              <text x={svgPoint.x + 8} y={svgPoint.y - 9} className="fill-slate-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                {pointLabel(point)}
              </text>
            </g>
          );
        })}

        {realTicks.map((value) => {
          const point = toSvg({ re: value, im: xAxisY });
          return value === 0 ? null : (
            <text key={`real-tick-${value}`} x={point.x} y={padding.top + plotHeight + 18} textAnchor="middle" className="fill-slate-600 text-xs">
              {format(value)}
            </text>
          );
        })}
        {imaginaryTicks.map((value) => {
          const point = toSvg({ re: yAxisX, im: value });
          return value === 0 ? null : (
            <text key={`imag-tick-${value}`} x={padding.left - 10} y={point.y} textAnchor="end" dominantBaseline="central" className="fill-slate-600 text-xs">
              {format(value)}
            </text>
          );
        })}
        <text x={padding.left + plotWidth} y={height - 8} textAnchor="end" className="fill-slate-800 text-sm font-semibold">
          Re
        </text>
        <text x={14} y={padding.top + 2} className="fill-slate-800 text-sm font-semibold">
          Im
        </text>
      </svg>
    </div>
  );
}
