"use client";

import * as React from "react";
import type {
  NumberLineColor,
  NumberLineDiagram,
} from "../../../lib/lessons/types";

const colorHex: Record<NumberLineColor, string> = {
  blue: "#2563eb",
  red: "#ef4444",
  green: "#10b981",
  amber: "#d97706",
};

const width = 460;
const height = 104;
const marginX = 30;
const axisY = 60;
const plotWidth = width - 2 * marginX;

function ticksBetween(min: number, max: number, step: number) {
  if (step <= 0 || max <= min) return [];
  const first = Math.ceil(min / step) * step;
  const values: number[] = [];
  for (let v = first; v <= max + step / 1000; v += step) {
    values.push(Number(v.toFixed(10)));
  }
  return values;
}

function formatTick(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

export function NumberLineView({
  diagram,
  className,
}: {
  diagram: NumberLineDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;

  const min = diagram.min;
  const max = diagram.max > diagram.min ? diagram.max : diagram.min + 1;
  const step = diagram.step && diagram.step > 0 ? diagram.step : 1;
  const ticks = ticksBetween(min, max, step);

  const toX = React.useCallback(
    (value: number) => marginX + ((value - min) / (max - min)) * plotWidth,
    [min, max]
  );

  const clampX = (x: number) => Math.max(marginX, Math.min(width - marginX, x));

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[120px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>

        {/* Main axis with arrowheads at both ends */}
        <line
          x1={marginX}
          y1={axisY}
          x2={width - marginX}
          y2={axisY}
          stroke="#475569"
          strokeWidth={2}
        />
        <polygon
          points={`${marginX},${axisY} ${marginX + 9},${axisY - 4} ${marginX + 9},${axisY + 4}`}
          fill="#475569"
        />
        <polygon
          points={`${width - marginX},${axisY} ${width - marginX - 9},${axisY - 4} ${width - marginX - 9},${axisY + 4}`}
          fill="#475569"
        />

        {/* Ticks and labels */}
        {ticks.map((value) => {
          const x = toX(value);
          return (
            <g key={`tick-${value}`}>
              <line x1={x} y1={axisY - 5} x2={x} y2={axisY + 5} stroke="#475569" strokeWidth={1.5} />
              <text
                x={x}
                y={axisY + 22}
                textAnchor="middle"
                className="fill-slate-600 text-xs"
              >
                {formatTick(value)}
              </text>
            </g>
          );
        })}

        {/* Shaded intervals / rays */}
        {diagram.intervals?.map((interval, index) => {
          const stroke = colorHex[interval.color ?? "blue"];
          const fromInf = interval.from === "-inf";
          const toInf = interval.to === "inf";
          const startX = fromInf ? marginX : clampX(toX(interval.from as number));
          const endX = toInf ? width - marginX : clampX(toX(interval.to as number));
          if (endX < startX) return null;

          return (
            <g key={`interval-${index}`}>
              <line
                x1={startX}
                y1={axisY}
                x2={endX}
                y2={axisY}
                stroke={stroke}
                strokeWidth={4}
                strokeLinecap="round"
              />
              {toInf && (
                <polygon
                  points={`${width - marginX},${axisY} ${width - marginX - 10},${axisY - 5} ${width - marginX - 10},${axisY + 5}`}
                  fill={stroke}
                />
              )}
              {fromInf && (
                <polygon
                  points={`${marginX},${axisY} ${marginX + 10},${axisY - 5} ${marginX + 10},${axisY + 5}`}
                  fill={stroke}
                />
              )}
              {!fromInf && (
                <circle
                  cx={startX}
                  cy={axisY}
                  r={5.5}
                  fill={interval.fromOpen ? "#ffffff" : stroke}
                  stroke={stroke}
                  strokeWidth={2}
                />
              )}
              {!toInf && (
                <circle
                  cx={endX}
                  cy={axisY}
                  r={5.5}
                  fill={interval.toOpen ? "#ffffff" : stroke}
                  stroke={stroke}
                  strokeWidth={2}
                />
              )}
              {interval.label && (
                <text
                  x={(startX + endX) / 2}
                  y={axisY - 14}
                  textAnchor="middle"
                  className="fill-slate-700 text-xs font-semibold"
                  stroke="#ffffff"
                  strokeWidth={4}
                  paintOrder="stroke"
                >
                  {interval.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Individual marked points */}
        {diagram.points?.map((point, index) => {
          const stroke = colorHex[point.color ?? "blue"];
          const x = clampX(toX(point.value));
          const label = point.label ?? formatTick(point.value);
          return (
            <g key={`point-${index}`}>
              <circle
                cx={x}
                cy={axisY}
                r={5.5}
                fill={point.open ? "#ffffff" : stroke}
                stroke={stroke}
                strokeWidth={2}
              />
              {label && (
                <text
                  x={x}
                  y={axisY - 14}
                  textAnchor="middle"
                  className="fill-slate-800 text-xs font-semibold"
                  stroke="#ffffff"
                  strokeWidth={4}
                  paintOrder="stroke"
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}

        {diagram.axisLabel && (
          <text
            x={width - marginX}
            y={axisY - 16}
            textAnchor="end"
            className="fill-slate-800 text-sm font-semibold"
          >
            {diagram.axisLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
