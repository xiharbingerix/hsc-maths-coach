"use client";

import * as React from "react";
import type { NormalDistributionDiagram } from "../../../lib/lessons/types";

const width = 560;
const height = 330;
const padding = { top: 34, right: 34, bottom: 62, left: 42 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;
const baselineY = padding.top + plotHeight;
const bandFill = {
  blue: "#93c5fd",
  green: "#86efac",
  amber: "#fcd34d",
};

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function bellHeight(z: number) {
  return Math.exp(-0.5 * z * z);
}

export function NormalDistributionView({
  diagram,
  className,
}: {
  diagram: NormalDistributionDiagram;
  className?: string;
}): React.ReactElement | null {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;
  const { mean, standardDeviation } = diagram;

  if (
    !Number.isFinite(mean) ||
    !Number.isFinite(standardDeviation) ||
    standardDeviation <= 0 ||
    diagram.markers?.some((marker) => !Number.isFinite(marker.value))
  ) {
    return null;
  }

  const markerValues = diagram.markers?.map((marker) => marker.value) ?? [];
  const xMin = diagram.xMin ?? Math.min(mean - 3.5 * standardDeviation, ...markerValues);
  const xMax = diagram.xMax ?? Math.max(mean + 3.5 * standardDeviation, ...markerValues);
  if (!Number.isFinite(xMin) || !Number.isFinite(xMax) || xMin >= xMax) return null;

  const toSvgX = (value: number) =>
    padding.left + ((value - xMin) / (xMax - xMin)) * plotWidth;
  const toSvgY = (value: number) => baselineY - value * plotHeight * 0.88;
  const samples = Array.from({ length: 241 }, (_, index) => {
    const value = xMin + ((xMax - xMin) * index) / 240;
    return { value, height: bellHeight((value - mean) / standardDeviation) };
  });
  const curvePath = samples
    .map((point, index) => `${index === 0 ? "M" : "L"} ${toSvgX(point.value)} ${toSvgY(point.height)}`)
    .join(" ");
  const bands = [...(diagram.shadedBands ?? [])].sort(
    (left, right) => right.standardDeviations - left.standardDeviations
  );

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[390px] min-w-[380px]"
      >
        <title id={titleId}>Normal distribution diagram</title>
        <desc id={descriptionId}>{diagram.description}</desc>

        {bands.map((band) => {
          const lower = Math.max(xMin, mean - band.standardDeviations * standardDeviation);
          const upper = Math.min(xMax, mean + band.standardDeviations * standardDeviation);
          const bandSamples = samples.filter((point) => point.value >= lower && point.value <= upper);
          const path = [
            `M ${toSvgX(lower)} ${baselineY}`,
            ...bandSamples.map((point) => `L ${toSvgX(point.value)} ${toSvgY(point.height)}`),
            `L ${toSvgX(upper)} ${baselineY}`,
            "Z",
          ].join(" ");
          return (
            <path
              key={`band-${band.standardDeviations}`}
              d={path}
              fill={bandFill[band.color ?? (band.standardDeviations === 1 ? "blue" : "green")]}
              fillOpacity={band.standardDeviations === 1 ? 0.62 : 0.38}
              stroke="none"
            />
          );
        })}

        <line x1={padding.left} y1={baselineY} x2={padding.left + plotWidth} y2={baselineY} stroke="#475569" strokeWidth={2} />
        <path d={curvePath} fill="none" stroke="#1d4ed8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

        {[-3, -2, -1, 0, 1, 2, 3].map((zScore) => {
          const value = mean + zScore * standardDeviation;
          if (value < xMin || value > xMax) return null;
          const x = toSvgX(value);
          return (
            <g key={`tick-${zScore}`}>
              <line x1={x} y1={baselineY - 4} x2={x} y2={baselineY + 5} stroke="#475569" />
              <text x={x} y={baselineY + 20} textAnchor="middle" className="fill-slate-600 text-xs">
                {formatValue(value)}
              </text>
              {diagram.showStandardDeviationLabels && (
                <text x={x} y={baselineY + 36} textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold">
                  {zScore === 0 ? "mean" : `${zScore > 0 ? "+" : ""}${zScore} SD`}
                </text>
              )}
            </g>
          );
        })}

        {bands.map((band, index) => (
          <text
            key={`band-label-${band.standardDeviations}`}
            x={padding.left + 8}
            y={padding.top + 16 + index * 16}
            className="fill-slate-700 text-xs font-semibold"
          >
            {band.label ?? `within ${band.standardDeviations} SD`}
          </text>
        ))}

        {diagram.markers?.map((marker, index) => {
          if (marker.value < xMin || marker.value > xMax) return null;
          const x = toSvgX(marker.value);
          return (
            <g key={`marker-${index}`}>
              <line x1={x} y1={baselineY} x2={x} y2={padding.top + 22} stroke="#dc2626" strokeWidth={2} strokeDasharray="6 5" />
              <circle cx={x} cy={baselineY} r={4} fill="#dc2626" />
              <text x={x + 7} y={padding.top + 18} className="fill-red-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                {marker.label ?? `x = ${formatValue(marker.value)}`}
                {marker.zScore !== undefined ? `, z = ${formatValue(marker.zScore)}` : ""}
              </text>
            </g>
          );
        })}

        <text x={padding.left + plotWidth} y={height - 8} textAnchor="end" className="fill-slate-800 text-sm font-semibold">
          {diagram.axisLabel ?? "value"}
        </text>
      </svg>
    </div>
  );
}
