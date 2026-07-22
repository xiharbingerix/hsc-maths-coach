"use client";

import * as React from "react";
import type {
  CartesianCurveColor,
  Vector2DDiagram,
  Vector2DPoint,
} from "../../../lib/lessons/types";
import { mathLabel, ticksBetween } from "./plotUtils";

const width = 420;
const height = 320;
const padding = { top: 26, right: 30, bottom: 40, left: 46 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

const colors: Record<CartesianCurveColor, string> = {
  blue: "#2563eb",
  violet: "#7c3aed",
  teal: "#0d9488",
  pink: "#db2777",
  amber: "#d97706",
  green: "#059669",
  red: "#dc2626",
};

function unit(from: Vector2DPoint, to: Vector2DPoint) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  return { x: dx / length, y: dy / length };
}

export function Vector2DDiagramView({
  diagram,
  className,
}: {
  diagram: Vector2DDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const xMin = diagram.xMin ?? -1;
  const xMax = diagram.xMax ?? 8;
  const yMin = diagram.yMin ?? -3;
  const yMax = diagram.yMax ?? 6;
  const xStep = diagram.xStep ?? 1;
  const yStep = diagram.yStep ?? 1;
  const showAxes = diagram.showAxes ?? true;
  const showGrid = diagram.showGrid ?? true;
  const toSvg = (point: Vector2DPoint) => ({
    x: padding.left + ((point.x - xMin) / (xMax - xMin)) * plotWidth,
    y: padding.top + ((yMax - point.y) / (yMax - yMin)) * plotHeight,
  });
  const xAxisY = toSvg({ x: 0, y: Math.min(yMax, Math.max(yMin, 0)) }).y;
  const yAxisX = toSvg({ x: Math.min(xMax, Math.max(xMin, 0)), y: 0 }).x;

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
          {(Object.keys(colors) as CartesianCurveColor[]).map((color) => (
            <marker key={color} id={`${reactId}-${color}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={colors[color]} />
            </marker>
          ))}
        </defs>
        <rect x={padding.left} y={padding.top} width={plotWidth} height={plotHeight} fill="#fff" stroke="#cbd5e1" />

        {showGrid && ticksBetween(xMin, xMax, xStep).map((value) => {
          const x = toSvg({ x: value, y: 0 }).x;
          return <line key={`xg-${value}`} x1={x} y1={padding.top} x2={x} y2={padding.top + plotHeight} stroke="#e2e8f0" />;
        })}
        {showGrid && ticksBetween(yMin, yMax, yStep).map((value) => {
          const y = toSvg({ x: 0, y: value }).y;
          return <line key={`yg-${value}`} x1={padding.left} y1={y} x2={padding.left + plotWidth} y2={y} stroke="#e2e8f0" />;
        })}

        {showAxes ? (
          <>
            <line x1={padding.left} y1={xAxisY} x2={padding.left + plotWidth} y2={xAxisY} stroke="#475569" strokeWidth={1.8} />
            <line x1={yAxisX} y1={padding.top} x2={yAxisX} y2={padding.top + plotHeight} stroke="#475569" strokeWidth={1.8} />
            <text x={padding.left + plotWidth} y={height - 9} textAnchor="end" className="fill-slate-700 text-xs font-semibold">{mathLabel(diagram.xAxisLabel ?? "x")}</text>
            <text x={14} y={padding.top - 7} className="fill-slate-700 text-xs font-semibold">{mathLabel(diagram.yAxisLabel ?? "y")}</text>
          </>
        ) : null}

        {(diagram.segments ?? []).map((segment, index) => {
          const from = toSvg(segment.from);
          const to = toSvg(segment.to);
          const color = colors[segment.color ?? "blue"];
          return (
            <g key={`segment-${index}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={color} strokeWidth={2.4} strokeDasharray={segment.dashed ? "7 5" : undefined} />
              {segment.label ? <text x={(from.x + to.x) / 2 + 6} y={(from.y + to.y) / 2 - 7} className="fill-slate-800 text-xs font-semibold" stroke="#fff" strokeWidth={4} paintOrder="stroke">{mathLabel(segment.label)}</text> : null}
            </g>
          );
        })}

        {(diagram.vectors ?? []).map((vector, index) => {
          const colorName = vector.color ?? "teal";
          const from = toSvg(vector.from ?? { x: 0, y: 0 });
          const to = toSvg(vector.to);
          return (
            <g key={`vector-${index}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={colors[colorName]} strokeWidth={3} strokeLinecap="round" strokeDasharray={vector.dashed ? "7 5" : undefined} markerEnd={`url(#${reactId}-${colorName}-arrow)`} />
              {vector.label ? <text x={(from.x + to.x) / 2 + 7} y={(from.y + to.y) / 2 - 8} className="fill-slate-900 text-xs font-semibold" stroke="#fff" strokeWidth={4} paintOrder="stroke">{mathLabel(vector.label)}</text> : null}
            </g>
          );
        })}

        {(diagram.angles ?? []).map((angle, index) => {
          const vertex = toSvg(angle.vertex);
          const fromUnit = unit(angle.vertex, angle.from);
          const toUnit = unit(angle.vertex, angle.to);
          const radius = angle.radius ?? 0.45;
          const xScale = plotWidth / (xMax - xMin);
          const yScale = plotHeight / (yMax - yMin);
          const first = { x: vertex.x + fromUnit.x * radius * xScale, y: vertex.y - fromUnit.y * radius * yScale };
          const second = { x: vertex.x + toUnit.x * radius * xScale, y: vertex.y - toUnit.y * radius * yScale };
          const corner = { x: first.x + (second.x - vertex.x), y: first.y + (second.y - vertex.y) };
          const d = angle.rightAngle
            ? `M ${first.x} ${first.y} L ${corner.x} ${corner.y} L ${second.x} ${second.y}`
            : `M ${first.x} ${first.y} Q ${vertex.x} ${vertex.y} ${second.x} ${second.y}`;
          return <g key={`angle-${index}`}><path d={d} fill="none" stroke="#d97706" strokeWidth={2} />{angle.label ? <text x={corner.x + 5} y={corner.y - 5} className="fill-amber-700 text-xs font-semibold">{mathLabel(angle.label)}</text> : null}</g>;
        })}

        {(diagram.points ?? []).map((point, index) => {
          const p = toSvg(point);
          return <g key={`point-${index}`}><circle cx={p.x} cy={p.y} r={4.5} fill="#7c3aed" stroke="#fff" strokeWidth={2} />{point.label ? <text x={p.x + 7} y={p.y - 8} className="fill-slate-900 text-xs font-semibold" stroke="#fff" strokeWidth={4} paintOrder="stroke">{mathLabel(point.label)}</text> : null}</g>;
        })}
      </svg>
    </div>
  );
}
