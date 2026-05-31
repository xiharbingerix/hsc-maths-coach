"use client";

import * as React from "react";
import type { CartesianGraph, CartesianPoint } from "../../../lib/lessons/types";

const width = 420;
const height = 320;
const padding = { top: 24, right: 30, bottom: 38, left: 46 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

function valuesBetween(min: number, max: number, step: number) {
  if (step <= 0) return [];
  const first = Math.ceil(min / step) * step;
  const values: number[] = [];

  for (let value = first; value <= max + step / 1000; value += step) {
    values.push(Number(value.toFixed(10)));
  }

  return values;
}

function formatTick(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function lineBounds(
  m: number,
  b: number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number
) {
  const candidates = [
    { x: xMin, y: m * xMin + b },
    { x: xMax, y: m * xMax + b },
  ];

  if (m !== 0) {
    candidates.push(
      { x: (yMin - b) / m, y: yMin },
      { x: (yMax - b) / m, y: yMax }
    );
  }

  const visible = candidates.filter(
    (point) =>
      point.x >= xMin - 1e-8 &&
      point.x <= xMax + 1e-8 &&
      point.y >= yMin - 1e-8 &&
      point.y <= yMax + 1e-8
  );

  return visible.filter(
    (point, index) =>
      visible.findIndex(
        (candidate) =>
          Math.abs(candidate.x - point.x) < 1e-8 &&
          Math.abs(candidate.y - point.y) < 1e-8
      ) === index
  );
}

export function CartesianGraphView({
  graph,
  className,
}: {
  graph: CartesianGraph;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const clipId = `${reactId}-clip`;
  const xMin = graph.xMin ?? -5;
  const xMax = graph.xMax ?? 5;
  const yMin = graph.yMin ?? -5;
  const yMax = graph.yMax ?? 5;
  const xStep = graph.xStep ?? 1;
  const yStep = graph.yStep ?? 1;
  const xTicks = valuesBetween(xMin, xMax, xStep);
  const yTicks = valuesBetween(yMin, yMax, yStep);
  const xAxisY = yMin <= 0 && yMax >= 0 ? 0 : yMin;
  const yAxisX = xMin <= 0 && xMax >= 0 ? 0 : xMin;
  const showGrid = graph.showGrid ?? true;
  const showAxisLabels = graph.showAxisLabels ?? true;

  const toSvg = React.useCallback(
    (point: CartesianPoint) => ({
      x: padding.left + ((point.x - xMin) / (xMax - xMin)) * plotWidth,
      y: padding.top + ((yMax - point.y) / (yMax - yMin)) * plotHeight,
    }),
    [xMax, xMin, yMax, yMin]
  );

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
        <title id={titleId}>{graph.description}</title>
        <defs>
          <clipPath id={clipId}>
            <rect x={padding.left} y={padding.top} width={plotWidth} height={plotHeight} />
          </clipPath>
        </defs>

        <rect
          x={padding.left}
          y={padding.top}
          width={plotWidth}
          height={plotHeight}
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth={1}
        />

        {showGrid &&
          xTicks.map((value) => {
            const point = toSvg({ x: value, y: 0 });
            return (
              <line
                key={`x-grid-${value}`}
                x1={point.x}
                y1={padding.top}
                x2={point.x}
                y2={padding.top + plotHeight}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
            );
          })}
        {showGrid &&
          yTicks.map((value) => {
            const point = toSvg({ x: 0, y: value });
            return (
              <line
                key={`y-grid-${value}`}
                x1={padding.left}
                y1={point.y}
                x2={padding.left + plotWidth}
                y2={point.y}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
            );
          })}

        <g clipPath={`url(#${clipId})`}>
          <line
            x1={padding.left}
            y1={toSvg({ x: 0, y: xAxisY }).y}
            x2={padding.left + plotWidth}
            y2={toSvg({ x: 0, y: xAxisY }).y}
            stroke="#475569"
            strokeWidth={2}
          />
          <line
            x1={toSvg({ x: yAxisX, y: 0 }).x}
            y1={padding.top}
            x2={toSvg({ x: yAxisX, y: 0 }).x}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth={2}
          />

          {graph.lineSegments?.map((segment, index) => {
            const from = toSvg(segment.from);
            const to = toSvg(segment.to);
            return (
              <line
                key={`segment-${index}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#0f766e"
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}

          {graph.lines?.map((line, index) => {
            const bounds = lineBounds(
              line.m,
              line.b,
              Math.max(xMin, line.xMin ?? xMin),
              Math.min(xMax, line.xMax ?? xMax),
              yMin,
              yMax
            );
            if (bounds.length < 2) return null;
            const from = toSvg(bounds[0]);
            const to = toSvg(bounds[1]);
            return (
              <line
                key={`line-${index}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#2563eb"
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}

          {graph.parabolas?.map((parabola, index) => {
            const start = Math.max(xMin, parabola.xMin ?? xMin);
            const end = Math.min(xMax, parabola.xMax ?? xMax);
            const points = Array.from({ length: 121 }, (_, pointIndex) => {
              const x = start + ((end - start) * pointIndex) / 120;
              return { x, y: parabola.a * x * x + parabola.b * x + parabola.c };
            });
            const visiblePointCount = points.filter(
              (point) => point.y >= yMin - 1 && point.y <= yMax + 1
            ).length;
            if (visiblePointCount < 2) return null;
            let previousWasVisible = false;
            const path = points
              .map((point) => {
                const isVisible = point.y >= yMin - 1 && point.y <= yMax + 1;
                if (!isVisible) {
                  previousWasVisible = false;
                  return null;
                }
                const svgPoint = toSvg(point);
                const command = previousWasVisible ? "L" : "M";
                previousWasVisible = true;
                return `${command} ${svgPoint.x} ${svgPoint.y}`;
              })
              .filter(Boolean)
              .join(" ");
            return (
              <path
                key={`parabola-${index}`}
                d={path}
                fill="none"
                stroke="#7c3aed"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {graph.circles?.map((circle, index) => {
            const centre = toSvg({ x: circle.h, y: circle.k });
            return (
              <ellipse
                key={`circle-${index}`}
                cx={centre.x}
                cy={centre.y}
                rx={(circle.r / (xMax - xMin)) * plotWidth}
                ry={(circle.r / (yMax - yMin)) * plotHeight}
                fill="none"
                stroke="#d97706"
                strokeWidth={3}
              />
            );
          })}
        </g>

        {xTicks.map((value) => {
          const point = toSvg({ x: value, y: xAxisY });
          return (
            <g key={`x-tick-${value}`}>
              <line x1={point.x} y1={point.y - 4} x2={point.x} y2={point.y + 4} stroke="#475569" />
              {value !== 0 && (
                <text x={point.x} y={padding.top + plotHeight + 18} textAnchor="middle" className="fill-slate-600 text-xs">
                  {formatTick(value)}
                </text>
              )}
            </g>
          );
        })}
        {yTicks.map((value) => {
          const point = toSvg({ x: yAxisX, y: value });
          return (
            <g key={`y-tick-${value}`}>
              <line x1={point.x - 4} y1={point.y} x2={point.x + 4} y2={point.y} stroke="#475569" />
              {value !== 0 && (
                <text x={padding.left - 10} y={point.y} textAnchor="end" dominantBaseline="central" className="fill-slate-600 text-xs">
                  {formatTick(value)}
                </text>
              )}
            </g>
          );
        })}
        {xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0 && (
          <text x={toSvg({ x: 0, y: 0 }).x - 8} y={toSvg({ x: 0, y: 0 }).y + 17} className="fill-slate-600 text-xs">
            0
          </text>
        )}

        {showAxisLabels && (
          <>
            <text x={padding.left + plotWidth} y={height - 8} textAnchor="end" className="fill-slate-800 text-sm font-semibold">
              {graph.xAxisLabel ?? "x"}
            </text>
            <text x={14} y={padding.top + 2} className="fill-slate-800 text-sm font-semibold">
              {graph.yAxisLabel ?? "y"}
            </text>
          </>
        )}

        {graph.points?.map((point, index) => {
          const svgPoint = toSvg(point);
          return (
            <g key={`point-${index}`}>
              <circle cx={svgPoint.x} cy={svgPoint.y} r={4.5} fill="#0f766e" stroke="#ffffff" strokeWidth={2} />
              {point.label && (
                <text x={svgPoint.x + 8} y={svgPoint.y - 9} className="fill-slate-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                  {point.label}
                </text>
              )}
            </g>
          );
        })}

        {graph.lineSegments?.map((segment, index) => {
          if (!segment.label) return null;
          const from = toSvg(segment.from);
          const to = toSvg(segment.to);
          return (
            <text key={`segment-label-${index}`} x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 8} className="fill-teal-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
              {segment.label}
            </text>
          );
        })}
        {graph.lines?.map((line, index) => line.label ? (
          <text key={`line-label-${index}`} x={padding.left + plotWidth - 8} y={padding.top + 16 + index * 16} textAnchor="end" className="fill-blue-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
            {line.label}
          </text>
        ) : null)}
        {graph.parabolas?.map((parabola, index) => parabola.label ? (
          <text key={`parabola-label-${index}`} x={padding.left + 8} y={padding.top + 16 + index * 16} className="fill-violet-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
            {parabola.label}
          </text>
        ) : null)}
        {graph.circles?.map((circle, index) => circle.label ? (
          <text key={`circle-label-${index}`} x={toSvg({ x: circle.h + circle.r, y: circle.k }).x + 6} y={toSvg({ x: circle.h + circle.r, y: circle.k }).y - 6} className="fill-amber-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
            {circle.label}
          </text>
        ) : null)}
      </svg>
    </div>
  );
}
