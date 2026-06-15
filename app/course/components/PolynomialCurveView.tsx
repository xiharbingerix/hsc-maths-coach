"use client";

import * as React from "react";
import type { PolynomialCurveDiagram } from "../../../lib/lessons/types";

const width = 420;
const height = 320;
const padding = { top: 24, right: 30, bottom: 42, left: 50 };
const plotWidth = width - padding.left - padding.right;
const plotHeight = height - padding.top - padding.bottom;

function evaluatePoly(roots: PolynomialCurveDiagram["roots"], k: number, x: number): number {
  let result = k;
  for (const root of roots) {
    result *= Math.pow(x - root.value, root.multiplicity);
  }
  return result;
}

function formatTick(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(1)));
}

function valuesBetween(min: number, max: number, step: number) {
  if (step <= 0) return [];
  const first = Math.ceil(min / step) * step;
  const values: number[] = [];
  for (let v = first; v <= max + step / 1000; v += step) {
    values.push(Number(v.toFixed(10)));
  }
  return values;
}

export function PolynomialCurveView({
  diagram,
  className,
}: {
  diagram: PolynomialCurveDiagram;
  className?: string;
}): React.ReactElement | null {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descId = `${reactId}-desc`;

  const k = diagram.leadingCoefficient ?? 1;

  if (!diagram.roots.length) return null;

  const rootValues = diagram.roots.map((r) => r.value);
  const defaultXPad = 1.5;
  const xMin = diagram.xMin ?? Math.min(...rootValues) - defaultXPad;
  const xMax = diagram.xMax ?? Math.max(...rootValues) + defaultXPad;
  if (xMin >= xMax) return null;

  const SAMPLES = 300;
  const ys: number[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const x = xMin + ((xMax - xMin) * i) / SAMPLES;
    ys.push(evaluatePoly(diagram.roots, k, x));
  }

  const finiteYs = ys.filter(Number.isFinite);
  if (!finiteYs.length) return null;

  const rawYMin = Math.min(...finiteYs);
  const rawYMax = Math.max(...finiteYs);
  const yPad = Math.max((rawYMax - rawYMin) * 0.15, 0.5);
  const yMin = diagram.yMin ?? rawYMin - yPad;
  const yMax = diagram.yMax ?? rawYMax + yPad;
  if (yMin >= yMax) return null;

  const xStep = diagram.xStep ?? Math.ceil((xMax - xMin) / 8);
  const yStep = diagram.yStep ?? Math.ceil((yMax - yMin) / 6);

  const toSvgX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const toSvgY = (y: number) => padding.top + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;

  const zeroSvgX = toSvgX(0);
  const zeroSvgY = toSvgY(0);
  const axisX = Math.max(padding.left, Math.min(padding.left + plotWidth, zeroSvgX));
  const axisY = Math.max(padding.top, Math.min(padding.top + plotHeight, zeroSvgY));

  // Build clipped polyline path
  const pathSegments: string[] = [];
  let started = false;
  let penUp = true;

  for (let i = 0; i <= SAMPLES; i++) {
    const x = xMin + ((xMax - xMin) * i) / SAMPLES;
    const y = ys[i];
    const isVisible = Number.isFinite(y) && y >= yMin - (yMax - yMin) * 0.05 && y <= yMax + (yMax - yMin) * 0.05;
    if (isVisible) {
      const sx = toSvgX(x);
      const sy = toSvgY(Math.max(yMin, Math.min(yMax, y)));
      if (!started || penUp) {
        pathSegments.push(`M ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        started = true;
        penUp = false;
      } else {
        pathSegments.push(`L ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      }
    } else {
      penUp = true;
    }
  }

  const xTicks = valuesBetween(xMin, xMax, xStep);
  const yTicks = valuesBetween(yMin, yMax, yStep);

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[360px] min-w-[340px]"
      >
        <title id={titleId}>Polynomial curve diagram</title>
        <desc id={descId}>{diagram.description}</desc>

        {/* grid */}
        {xTicks.map((v) => (
          <line
            key={`gx-${v}`}
            x1={toSvgX(v)}
            y1={padding.top}
            x2={toSvgX(v)}
            y2={padding.top + plotHeight}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        ))}
        {yTicks.map((v) => (
          <line
            key={`gy-${v}`}
            x1={padding.left}
            y1={toSvgY(v)}
            x2={padding.left + plotWidth}
            y2={toSvgY(v)}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        ))}

        {/* axes */}
        <line x1={padding.left} y1={axisY} x2={padding.left + plotWidth} y2={axisY} stroke="#64748b" strokeWidth={2} />
        <line x1={axisX} y1={padding.top} x2={axisX} y2={padding.top + plotHeight} stroke="#64748b" strokeWidth={2} />

        {/* x ticks + labels */}
        {xTicks.map((v) => (
          <g key={`xt-${v}`}>
            <line x1={toSvgX(v)} y1={axisY - 4} x2={toSvgX(v)} y2={axisY + 4} stroke="#64748b" strokeWidth={1.5} />
            {v !== 0 && (
              <text x={toSvgX(v)} y={axisY + 17} textAnchor="middle" className="fill-slate-600 text-xs">
                {formatTick(v)}
              </text>
            )}
          </g>
        ))}

        {/* y ticks + labels */}
        {yTicks.map((v) => (
          <g key={`yt-${v}`}>
            <line x1={axisX - 4} y1={toSvgY(v)} x2={axisX + 4} y2={toSvgY(v)} stroke="#64748b" strokeWidth={1.5} />
            {v !== 0 && (
              <text x={axisX - 8} y={toSvgY(v) + 4} textAnchor="end" className="fill-slate-600 text-xs">
                {formatTick(v)}
              </text>
            )}
          </g>
        ))}

        {/* 0 label at origin */}
        {zeroSvgX >= padding.left && zeroSvgX <= padding.left + plotWidth &&
          zeroSvgY >= padding.top && zeroSvgY <= padding.top + plotHeight && (
          <text x={axisX - 7} y={axisY + 15} textAnchor="end" className="fill-slate-500 text-xs">
            0
          </text>
        )}

        {/* polynomial curve */}
        <path
          d={pathSegments.join(" ")}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* x-intercept markers */}
        {diagram.roots.map((root) => {
          const sx = toSvgX(root.value);
          const sy = axisY;
          if (sx < padding.left || sx > padding.left + plotWidth) return null;
          const isTouchOrInflection = root.multiplicity >= 2;
          return (
            <g key={`root-${root.value}`}>
              {isTouchOrInflection ? (
                // filled circle for even-mult (touch) or odd ≥3 (inflection)
                <circle cx={sx} cy={sy} r={5} fill={root.multiplicity % 2 === 0 ? "#dc2626" : "#f59e0b"} stroke="white" strokeWidth={1.5} />
              ) : (
                // open circle for simple crossing
                <circle cx={sx} cy={sy} r={4} fill="white" stroke="#1d4ed8" strokeWidth={2} />
              )}
              <text x={sx} y={sy + 17} textAnchor="middle" className="fill-slate-700 text-xs font-semibold">
                {formatTick(root.value)}
              </text>
            </g>
          );
        })}

        {/* curve label */}
        {diagram.label && (
          <text
            x={padding.left + plotWidth - 4}
            y={padding.top + 16}
            textAnchor="end"
            className="fill-blue-700 text-xs font-semibold"
          >
            {diagram.label}
          </text>
        )}

        {/* legend for markers */}
        <g transform={`translate(${padding.left + 4}, ${padding.top + plotHeight - 42})`}>
          <circle cx={7} cy={7} r={4} fill="white" stroke="#1d4ed8" strokeWidth={2} />
          <text x={16} y={11} className="fill-slate-600 text-[10px]">crosses (mult 1)</text>
          <circle cx={7} cy={22} r={5} fill="#dc2626" stroke="white" strokeWidth={1.5} />
          <text x={16} y={26} className="fill-slate-600 text-[10px]">touches (even mult)</text>
          <circle cx={7} cy={37} r={5} fill="#f59e0b" stroke="white" strokeWidth={1.5} />
          <text x={16} y={41} className="fill-slate-600 text-[10px]">inflection (odd mult ≥3)</text>
        </g>
      </svg>
    </div>
  );
}
