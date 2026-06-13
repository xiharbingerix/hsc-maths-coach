"use client";

import * as React from "react";
import type { TrigGraphDiagram, TrigGraphPoint } from "../../../lib/lessons/types";
import { formatSymbolicPi, parseSymbolicNumber } from "./unitCircleMath";

const width = 460;
const height = 340;
const padding = { top: 26, right: 32, bottom: 50, left: 48 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

function toNumber(value: string | undefined, fallback: number) {
  return parseSymbolicNumber(value) ?? fallback;
}

function defaultBounds(functionType: TrigGraphDiagram["functionType"]) {
  if (functionType === "tan") {
    return { xMin: -Math.PI, xMax: Math.PI, yMin: -4, yMax: 4 };
  }
  return { xMin: -2 * Math.PI, xMax: 2 * Math.PI, yMin: -1.5, yMax: 1.5 };
}

function curveValue(functionType: TrigGraphDiagram["functionType"], x: number) {
  if (functionType === "sin") return Math.sin(x);
  if (functionType === "cos") return Math.cos(x);
  return Math.tan(x);
}

function parsePoint(point: TrigGraphPoint) {
  const x = parseSymbolicNumber(point.x);
  const y = parseSymbolicNumber(point.y);
  return x === null || y === null ? null : { x, y };
}

export function TrigGraphDiagramView({
  diagram,
  className,
}: {
  diagram: TrigGraphDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const bounds = defaultBounds(diagram.functionType);
  const xMin = toNumber(diagram.xMin, bounds.xMin);
  const xMax = toNumber(diagram.xMax, bounds.xMax);
  const yMin = diagram.yMin ?? bounds.yMin;
  const yMax = diagram.yMax ?? bounds.yMax;
  const xAxisY = yMin <= 0 && yMax >= 0 ? 0 : yMin;
  const yAxisX = xMin <= 0 && xMax >= 0 ? 0 : xMin;

  const toSvg = React.useCallback(
    (point: { x: number; y: number }) => ({
      x: padding.left + ((point.x - xMin) / (xMax - xMin)) * plotWidth,
      y: padding.top + ((yMax - point.y) / (yMax - yMin)) * plotHeight,
    }),
    [xMax, xMin, yMax, yMin]
  );

  const symbolicTicks = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]
    .map((multiple) => multiple * Math.PI)
    .filter((value) => value >= xMin - 1e-8 && value <= xMax + 1e-8);
  const yTicks = Array.from(
    { length: Math.floor(yMax - yMin) + 1 },
    (_, index) => Math.ceil(yMin) + index
  ).filter((value) => value >= yMin && value <= yMax);
  const asymptotes =
    diagram.asymptotes ??
    (diagram.functionType === "tan"
      ? [
          { x: "-pi/2", label: "x = -π/2" },
          { x: "pi/2", label: "x = π/2" },
        ]
      : []);

  let previousWasVisible = false;
  let previousY: number | null = null;
  const ySpan = yMax - yMin;
  const path = Array.from({ length: 520 }, (_, index) => {
    const x = xMin + ((xMax - xMin) * index) / 519;
    const y = curveValue(diagram.functionType, x);
    const cosine = Math.cos(x);
    const nearAsymptote = diagram.functionType === "tan" && Math.abs(cosine) < 0.025;
    const jumped =
      diagram.functionType === "tan" &&
      previousY !== null &&
      Math.abs(y - previousY) > ySpan * 0.8;
    previousY = y;
    const visible =
      Number.isFinite(y) &&
      y >= yMin - ySpan * 0.05 &&
      y <= yMax + ySpan * 0.05 &&
      !nearAsymptote &&
      !jumped;
    if (!visible) {
      previousWasVisible = false;
      return null;
    }
    const svgPoint = toSvg({ x, y });
    const command = previousWasVisible ? "L" : "M";
    previousWasVisible = true;
    return `${command} ${svgPoint.x} ${svgPoint.y}`;
  })
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[380px] min-w-[340px]"
      >
        <title id={titleId}>{diagram.description}</title>
        <rect x={padding.left} y={padding.top} width={plotWidth} height={plotHeight} fill="#ffffff" stroke="#cbd5e1" />

        {symbolicTicks.map((value) => {
          const point = toSvg({ x: value, y: 0 });
          return (
            <line key={`x-grid-${value}`} x1={point.x} y1={padding.top} x2={point.x} y2={padding.top + plotHeight} stroke="#e2e8f0" />
          );
        })}
        {yTicks.map((value) => {
          const point = toSvg({ x: 0, y: value });
          return (
            <line key={`y-grid-${value}`} x1={padding.left} y1={point.y} x2={padding.left + plotWidth} y2={point.y} stroke="#e2e8f0" />
          );
        })}

        {asymptotes.map((marker, index) => {
          const x = parseSymbolicNumber(marker.x);
          if (x === null || x < xMin || x > xMax) return null;
          const point = toSvg({ x, y: 0 });
          return (
            <g key={`asymptote-${index}`}>
              <line x1={point.x} y1={padding.top} x2={point.x} y2={padding.top + plotHeight} stroke="#dc2626" strokeWidth={2} strokeDasharray="7 5" />
              <text x={point.x + 5} y={padding.top + 14} className="fill-red-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                {marker.label ?? `x = ${marker.x}`}
              </text>
            </g>
          );
        })}

        <line x1={padding.left} y1={toSvg({ x: 0, y: xAxisY }).y} x2={padding.left + plotWidth} y2={toSvg({ x: 0, y: xAxisY }).y} stroke="#475569" strokeWidth={2} />
        <line x1={toSvg({ x: yAxisX, y: 0 }).x} y1={padding.top} x2={toSvg({ x: yAxisX, y: 0 }).x} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={2} />
        <path d={path} fill="none" stroke="#db2777" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

        {(diagram.periodMarkers ?? []).map((marker, index) => {
          const x = parseSymbolicNumber(marker.x);
          if (x === null || x < xMin || x > xMax) return null;
          const point = toSvg({ x, y: xAxisY });
          return (
            <g key={`period-${index}`}>
              <line x1={point.x} y1={point.y - 9} x2={point.x} y2={point.y + 9} stroke="#0f766e" strokeWidth={2.5} />
              {marker.label ? (
                <text x={point.x} y={point.y - 14} textAnchor="middle" className="fill-teal-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                  {marker.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {(diagram.keyPoints ?? []).map((point, index) => {
          const parsed = parsePoint(point);
          if (!parsed) return null;
          const svgPoint = toSvg(parsed);
          return (
            <g key={`point-${index}`}>
              <circle cx={svgPoint.x} cy={svgPoint.y} r={4.5} fill="#0f766e" stroke="#ffffff" strokeWidth={2} />
              <text x={svgPoint.x + 8} y={svgPoint.y - 9} className="fill-slate-900 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                {point.label ?? `(${point.x}, ${point.y})`}
              </text>
            </g>
          );
        })}

        {symbolicTicks.map((value) => {
          const point = toSvg({ x: value, y: xAxisY });
          return (
            <text key={`x-tick-${value}`} x={point.x} y={padding.top + plotHeight + 18} textAnchor="middle" className="fill-slate-600 text-xs">
              {formatSymbolicPi(value)}
            </text>
          );
        })}
        {yTicks.map((value) => {
          if (value === 0) return null;
          const point = toSvg({ x: yAxisX, y: value });
          return (
            <text key={`y-tick-${value}`} x={padding.left - 10} y={point.y} textAnchor="end" dominantBaseline="central" className="fill-slate-600 text-xs">
              {value}
            </text>
          );
        })}
        <text x={padding.left + plotWidth} y={height - 12} textAnchor="end" className="fill-slate-800 text-sm font-semibold">
          x
        </text>
        <text x={14} y={padding.top + 2} className="fill-slate-800 text-sm font-semibold">
          y
        </text>
        <text x={padding.left + 10} y={padding.top + 18} className="fill-pink-700 text-sm font-bold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
          {diagram.equationLabel ?? `y = ${diagram.functionType} x`}
        </text>
        {(diagram.notes ?? []).slice(0, 2).map((note, index) => (
          <text key={`note-${index}`} x={padding.left} y={height - 18 + index * 14} className="fill-slate-500 text-xs">
            {note}
          </text>
        ))}
      </svg>
    </div>
  );
}
