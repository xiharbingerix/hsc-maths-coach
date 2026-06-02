"use client";

import * as React from "react";
import type { BoxPlotDiagram } from "../../../lib/lessons/types";

const width = 560;
const rowHeight = 82;
const padding = { top: 24, right: 34, bottom: 52, left: 92 };
const plotWidth = width - padding.left - padding.right;

function resolvedWhiskers(plot: BoxPlotDiagram["plots"][number]) {
  return {
    lowerWhisker: plot.lowerWhisker ?? plot.min,
    upperWhisker: plot.upperWhisker ?? plot.max,
  };
}

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function valuesBetween(min: number, max: number, step: number) {
  const first = Math.ceil(min / step) * step;
  const values: number[] = [];
  for (let value = first; value <= max + step / 1000; value += step) {
    values.push(Number(value.toFixed(10)));
  }
  return values;
}

export function BoxPlotView({
  diagram,
  className,
}: {
  diagram: BoxPlotDiagram;
  className?: string;
}): React.ReactElement | null {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;

  if (
    diagram.plots.length === 0 ||
    diagram.plots.some(
      (plot) => {
        const { lowerWhisker, upperWhisker } = resolvedWhiskers(plot);
        return (
          !plot.label.trim() ||
          ![lowerWhisker, plot.q1, plot.median, plot.q3, upperWhisker].every(Number.isFinite) ||
          !(
            lowerWhisker !== undefined &&
            upperWhisker !== undefined &&
            lowerWhisker <= plot.q1 &&
            plot.q1 <= plot.median &&
            plot.median <= plot.q3 &&
            plot.q3 <= upperWhisker
          ) ||
          plot.outliers?.some((outlier) => !Number.isFinite(outlier))
        );
      }
    )
  ) {
    return null;
  }

  const allValues = diagram.plots.flatMap((plot) => {
    const { lowerWhisker, upperWhisker } = resolvedWhiskers(plot);
    return [
      lowerWhisker as number,
      plot.q1,
      plot.median,
      plot.q3,
      upperWhisker as number,
      ...(plot.outliers ?? []),
    ];
  });
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const dataSpan = dataMax - dataMin || 1;
  const xMin = diagram.xMin ?? dataMin - dataSpan * 0.08;
  const xMax = diagram.xMax ?? dataMax + dataSpan * 0.08;
  if (!Number.isFinite(xMin) || !Number.isFinite(xMax) || xMin >= xMax) return null;

  const height = padding.top + diagram.plots.length * rowHeight + padding.bottom;
  const axisY = height - padding.bottom + 10;
  const tickStep = (xMax - xMin) / 5;
  const ticks = valuesBetween(xMin, xMax, tickStep);
  const toSvgX = (value: number) =>
    padding.left + ((value - xMin) / (xMax - xMin)) * plotWidth;

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[440px] min-w-[380px]"
      >
        <title id={titleId}>Box plot diagram</title>
        <desc id={descriptionId}>{diagram.description}</desc>

        {diagram.plots.map((plot, index) => {
          const y = padding.top + index * rowHeight + rowHeight / 2;
          const { lowerWhisker, upperWhisker } = resolvedWhiskers(plot);
          if (lowerWhisker === undefined || upperWhisker === undefined) return null;
          const values = [
            { key: "lower whisker", value: lowerWhisker },
            { key: "Q1", value: plot.q1 },
            { key: "median", value: plot.median },
            { key: "Q3", value: plot.q3 },
            { key: "upper whisker", value: upperWhisker },
          ];

          return (
            <g key={`${plot.label}-${index}`}>
              <text x={padding.left - 14} y={y} textAnchor="end" dominantBaseline="central" className="fill-slate-800 text-sm font-semibold">
                {plot.label}
              </text>
              <line x1={toSvgX(lowerWhisker)} y1={y} x2={toSvgX(upperWhisker)} y2={y} stroke="#475569" strokeWidth={2} />
              <line x1={toSvgX(lowerWhisker)} y1={y - 13} x2={toSvgX(lowerWhisker)} y2={y + 13} stroke="#475569" strokeWidth={2} />
              <line x1={toSvgX(upperWhisker)} y1={y - 13} x2={toSvgX(upperWhisker)} y2={y + 13} stroke="#475569" strokeWidth={2} />
              <rect x={toSvgX(plot.q1)} y={y - 20} width={toSvgX(plot.q3) - toSvgX(plot.q1)} height={40} fill="#dbeafe" stroke="#2563eb" strokeWidth={2.5} />
              <line x1={toSvgX(plot.median)} y1={y - 20} x2={toSvgX(plot.median)} y2={y + 20} stroke="#1e3a8a" strokeWidth={3} />
              {plot.outliers?.map((outlier, outlierIndex) => (
                <circle key={`outlier-${outlierIndex}`} cx={toSvgX(outlier)} cy={y} r={4} fill="#ffffff" stroke="#dc2626" strokeWidth={2} />
              ))}
              {diagram.showValueLabels &&
                values.map(({ key, value }, valueIndex) => (
                  <text
                    key={`${key}-${valueIndex}`}
                    x={toSvgX(value)}
                    y={y + 36}
                    textAnchor="middle"
                    className="fill-slate-600 text-[10px] font-semibold"
                  >
                    {valueIndex === 2 ? `${key}: ${formatValue(value)}` : formatValue(value)}
                  </text>
                ))}
            </g>
          );
        })}

        <line x1={padding.left} y1={axisY} x2={padding.left + plotWidth} y2={axisY} stroke="#475569" strokeWidth={2} />
        {ticks.map((tick) => (
          <g key={`tick-${tick}`}>
            <line x1={toSvgX(tick)} y1={axisY - 4} x2={toSvgX(tick)} y2={axisY + 4} stroke="#475569" />
            <text x={toSvgX(tick)} y={axisY + 19} textAnchor="middle" className="fill-slate-600 text-xs">
              {formatValue(tick)}
            </text>
          </g>
        ))}
        <text x={padding.left + plotWidth} y={height - 8} textAnchor="end" className="fill-slate-800 text-sm font-semibold">
          {diagram.axisLabel ?? "value"}
        </text>
      </svg>
    </div>
  );
}
