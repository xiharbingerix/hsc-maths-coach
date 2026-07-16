"use client";

import * as React from "react";
import type { TrapezoidalRuleDiagram } from "../../../lib/lessons/types";

const width = 520;
const height = 340;
const padding = { top: 46, right: 34, bottom: 52, left: 54 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

export function TrapezoidalRuleView({
  diagram,
  className,
}: {
  diagram: TrapezoidalRuleDiagram;
  className?: string;
}): React.ReactElement | null {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;
  const { xValues, yValues } = diagram;
  const curvePoints = diagram.curvePoints ?? [];
  const trapezoidCount = xValues.length - 1;
  const svgTitle = diagram.functionLabel
    ? `Trapezoidal rule for ${diagram.functionLabel}`
    : `Trapezoidal rule: ${trapezoidCount} trapezoid${trapezoidCount === 1 ? "" : "s"}`;

  if (
    xValues.length < 2 ||
    xValues.length !== yValues.length ||
    xValues.some((value) => !Number.isFinite(value)) ||
    yValues.some((value) => !Number.isFinite(value)) ||
    xValues.some((value, index) => index > 0 && value <= xValues[index - 1]) ||
    (diagram.ordinateLabels !== undefined &&
      diagram.ordinateLabels.length !== yValues.length) ||
    curvePoints.some(
      (point, index) =>
        !Number.isFinite(point.x) ||
        !Number.isFinite(point.y) ||
        (index > 0 && point.x <= curvePoints[index - 1].x)
    )
  ) {
    return null;
  }

  const xMin = Math.min(xValues[0], ...curvePoints.map((point) => point.x));
  const xMax = Math.max(xValues[xValues.length - 1], ...curvePoints.map((point) => point.x));
  const allYValues = [...yValues, ...curvePoints.map((point) => point.y)];
  const rawYMin = Math.min(0, ...allYValues);
  const rawYMax = Math.max(0, ...allYValues);
  const ySpan = rawYMax - rawYMin || 1;
  const yMargin = ySpan * 0.12;
  const yMin = rawYMin - (rawYMin < 0 ? yMargin : 0);
  const yMax = rawYMax + yMargin;

  const toSvg = (x: number, y: number) => ({
    x: padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth,
    y: padding.top + ((yMax - y) / (yMax - yMin)) * plotHeight,
  });
  const baselineY = toSvg(xMin, 0).y;
  const points = xValues.map((x, index) => toSvg(x, yValues[index]));
  const renderedCurvePoints = curvePoints.map((point) => toSvg(point.x, point.y));

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[380px] min-w-[360px]"
      >
        <title id={titleId}>{svgTitle}</title>
        <desc id={descriptionId}>{diagram.description}</desc>

        <rect
          x={padding.left}
          y={padding.top}
          width={plotWidth}
          height={plotHeight}
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth={1}
        />

        {points.slice(0, -1).map((point, index) => {
          const nextPoint = points[index + 1];
          const nextBaseline = toSvg(xValues[index + 1], 0);
          const currentBaseline = toSvg(xValues[index], 0);
          const path = [
            `M ${currentBaseline.x} ${currentBaseline.y}`,
            `L ${point.x} ${point.y}`,
            `L ${nextPoint.x} ${nextPoint.y}`,
            `L ${nextBaseline.x} ${nextBaseline.y}`,
            "Z",
          ].join(" ");

          return (
            <path
              key={`trapezoid-${index}`}
              d={path}
              fill="#0ea5e9"
              fillOpacity={0.18}
              stroke="#38bdf8"
              strokeWidth={1}
            />
          );
        })}

        {renderedCurvePoints.length >= 2 && (
          <polyline
            points={renderedCurvePoints.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="#e11d48"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        <line
          x1={padding.left}
          y1={baselineY}
          x2={padding.left + plotWidth}
          y2={baselineY}
          stroke="#475569"
          strokeWidth={2}
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + plotHeight}
          stroke="#475569"
          strokeWidth={2}
        />

        {points.map((point, index) => {
          const baseline = toSvg(xValues[index], 0);
          return (
            <g key={`ordinate-${index}`}>
              <line
                x1={point.x}
                y1={point.y}
                x2={baseline.x}
                y2={baseline.y}
                stroke="#0f766e"
                strokeWidth={2}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={4}
                fill="#0f766e"
                stroke="#ffffff"
                strokeWidth={2}
              />
              <line
                x1={baseline.x}
                y1={baseline.y - 4}
                x2={baseline.x}
                y2={baseline.y + 4}
                stroke="#475569"
              />
              <text
                x={baseline.x}
                y={baselineY + 20}
                textAnchor="middle"
                className="fill-slate-600 text-xs"
              >
                {formatValue(xValues[index])}
              </text>
              {diagram.showOrdinateLabels && (
                <text
                  x={point.x}
                  y={point.y - 12}
                  textAnchor="middle"
                  className="fill-teal-800 text-xs font-semibold"
                  stroke="#ffffff"
                  strokeWidth={4}
                  paintOrder="stroke"
                >
                  {diagram.ordinateLabels?.[index] ??
                    `y${index} = ${formatValue(yValues[index])}`}
                </text>
              )}
            </g>
          );
        })}

        <polyline
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
          fill="none"
          stroke="#0369a1"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {diagram.showTrapezoidLabels &&
          points.slice(0, -1).map((point, index) => {
            const nextPoint = points[index + 1];
            const labelY = (Math.max(point.y, nextPoint.y) + baselineY) / 2;
            return (
              <text
                key={`trapezoid-label-${index}`}
                x={(point.x + nextPoint.x) / 2}
                y={labelY}
                textAnchor="middle"
                className="fill-sky-800 text-xs font-semibold"
              >
                {`T${index + 1}`}
              </text>
            );
          })}

        <text
          x={padding.left + plotWidth}
          y={height - 10}
          textAnchor="end"
          className="fill-slate-800 text-sm font-semibold"
        >
          {diagram.xAxisLabel ?? "x"}
        </text>
        <text
          x={14}
          y={padding.top + 2}
          className="fill-slate-800 text-sm font-semibold"
        >
          {diagram.yAxisLabel ?? "y"}
        </text>
        {diagram.functionLabel && (
          <text
            x={padding.left + plotWidth - 8}
            y={padding.top + 18}
            textAnchor="end"
            className={`${renderedCurvePoints.length >= 2 ? "fill-rose-700" : "fill-sky-800"} text-xs font-semibold`}
            stroke="#ffffff"
            strokeWidth={4}
            paintOrder="stroke"
          >
            {diagram.functionLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
