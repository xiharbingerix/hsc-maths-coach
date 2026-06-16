"use client";

import * as React from "react";
import type { SlopeFieldDE, SlopeFieldDiagram } from "../../../lib/lessons/types";

const W = 420;
const H = 320;
const PAD = { top: 24, right: 30, bottom: 42, left: 50 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

function evalDE(de: SlopeFieldDE, x: number, y: number): number {
  if (de.kind === "linear") {
    return (de.a ?? 0) * x + (de.b ?? 0) * y + (de.c ?? 0);
  }
  // x-squared
  return (de.k ?? 1) * x * x;
}

function rk4Step(de: SlopeFieldDE, x: number, y: number, h: number): number {
  const f = (xi: number, yi: number) => evalDE(de, xi, yi);
  const k1 = f(x, y);
  const k2 = f(x + h / 2, y + (h / 2) * k1);
  const k3 = f(x + h / 2, y + (h / 2) * k2);
  const k4 = f(x + h, y + h * k3);
  return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
}

export function SlopeFieldView({ diagram }: { diagram: SlopeFieldDiagram }) {
  const {
    de,
    xMin = -3, xMax = 3, yMin = -3, yMax = 3,
    gridSpacing = 0.5,
    solutionCurves = [],
    equilibriumY,
    xAxisLabel = "x",
    yAxisLabel = "y",
  } = diagram;

  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  const scaleX = PW / xRange;
  const scaleY = PH / yRange;

  const toSvgX = (x: number) => PAD.left + (x - xMin) * scaleX;
  const toSvgY = (y: number) => PAD.top + (yMax - y) * scaleY;

  // Arrow half-length in SVG pixels (40 % of grid cell, capped at 14 px)
  const arrowHalfLen = Math.min(14, Math.min(scaleX, scaleY) * gridSpacing * 0.40);

  // Build grid points
  const gxs: number[] = [];
  for (let x = xMin; x <= xMax + 1e-9; x = +(x + gridSpacing).toFixed(10)) gxs.push(x);
  const gys: number[] = [];
  for (let y = yMin; y <= yMax + 1e-9; y = +(y + gridSpacing).toFixed(10)) gys.push(y);

  const segments = gxs.flatMap((gx, gi) =>
    gys.map((gy, gyi) => {
      const raw = evalDE(de, gx, gy);
      const slope = Math.max(-50, Math.min(50, raw));
      if (!isFinite(slope)) return null;
      const cx = toSvgX(gx);
      const cy = toSvgY(gy);
      // Direction in SVG: rightward + (flipped) upward
      const svgDx = scaleX;
      const svgDy = -slope * scaleY;
      const len = Math.sqrt(svgDx * svgDx + svgDy * svgDy) || 1;
      const nx = (svgDx / len) * arrowHalfLen;
      const ny = (svgDy / len) * arrowHalfLen;
      return (
        <line
          key={`${gi}-${gyi}`}
          x1={+(cx - nx).toFixed(2)} y1={+(cy - ny).toFixed(2)}
          x2={+(cx + nx).toFixed(2)} y2={+(cy + ny).toFixed(2)}
          stroke="#6b7280"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      );
    })
  );

  // Trace a solution curve from (x0, y0) via RK4 in both directions
  const curvePaths = solutionCurves.map(({ x0, y0, label }, ci) => {
    const nFwd = Math.ceil((xMax - x0) / (xRange / 300));
    const nBwd = Math.ceil((x0 - xMin) / (xRange / 300));
    const h = xRange / 300;

    const trace = (startY: number, step: number, steps: number): [number, number][] => {
      const pts: [number, number][] = [];
      let x = x0, y = startY;
      for (let i = 0; i <= steps; i++) {
        pts.push([x, y]);
        if (!isFinite(y) || Math.abs(y - (yMin + yRange / 2)) > yRange * 4) break;
        y = rk4Step(de, x, y, step);
        x += step;
      }
      return pts;
    };

    const fwd = trace(y0, h, nFwd);
    const bwd = trace(y0, -h, nBwd).reverse();

    const all = [...bwd, ...fwd.slice(1)];
    let d = "";
    let pen = true;
    for (const [x, y] of all) {
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      if (sy < PAD.top - 5 || sy > H - PAD.bottom + 5) { pen = true; continue; }
      d += pen ? `M${sx.toFixed(1)},${sy.toFixed(1)}` : ` L${sx.toFixed(1)},${sy.toFixed(1)}`;
      pen = false;
    }

    return { d, x0, y0, label, ci };
  });

  // Axis ticks
  const xTicks: number[] = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) xTicks.push(x);
  const yTicks: number[] = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) yTicks.push(y);

  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const clipId = `${reactId}-clip`;

  return (
    <svg
      role="img"
      aria-labelledby={titleId}
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ maxWidth: "100%", display: "block", margin: "12px auto" }}
    >
      <title id={titleId}>{diagram.description}</title>
      <defs>
        <clipPath id={clipId}>
          <rect x={PAD.left} y={PAD.top} width={PW} height={PH} />
        </clipPath>
      </defs>

      {/* Grid */}
      {xTicks.map(x => (
        <line key={`xg${x}`} x1={toSvgX(x)} y1={PAD.top} x2={toSvgX(x)} y2={H - PAD.bottom} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {yTicks.map(y => (
        <line key={`yg${y}`} x1={PAD.left} y1={toSvgY(y)} x2={W - PAD.right} y2={toSvgY(y)} stroke="#e5e7eb" strokeWidth="1" />
      ))}

      {/* Dashed zero-lines if in range */}
      {xMin < 0 && xMax > 0 && (
        <line x1={toSvgX(0)} y1={PAD.top} x2={toSvgX(0)} y2={H - PAD.bottom} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,3" />
      )}
      {yMin < 0 && yMax > 0 && (
        <line x1={PAD.left} y1={toSvgY(0)} x2={W - PAD.right} y2={toSvgY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,3" />
      )}

      {/* Equilibrium line */}
      {equilibriumY !== undefined && equilibriumY > yMin && equilibriumY < yMax && (
        <>
          <line
            x1={PAD.left} y1={toSvgY(equilibriumY)}
            x2={W - PAD.right} y2={toSvgY(equilibriumY)}
            stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,3"
          />
          <text x={W - PAD.right + 3} y={toSvgY(equilibriumY) + 4} fontSize="10" fill="#ef4444">
            y={equilibriumY}
          </text>
        </>
      )}

      {/* Slope field (clipped) */}
      <g clipPath={`url(#${clipId})`}>{segments}</g>

      {/* Solution curves */}
      {curvePaths.map(({ d, x0, y0, label, ci }) => (
        <g key={ci} clipPath={`url(#${clipId})`}>
          <path d={d} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
          {label && (
            <text x={toSvgX(x0) + 6} y={toSvgY(y0) - 5} fontSize="11" fill="#2563eb">{label}</text>
          )}
        </g>
      ))}

      {/* Boundary box */}
      <rect x={PAD.left} y={PAD.top} width={PW} height={PH} fill="none" stroke="#d1d5db" strokeWidth="1" />

      {/* Tick labels */}
      {xTicks.filter(x => x !== 0 || (xMin >= 0 || xMax <= 0)).map(x => (
        <text key={`xl${x}`} x={toSvgX(x)} y={H - PAD.bottom + 14} textAnchor="middle" fontSize="11" fill="#6b7280">{x}</text>
      ))}
      {yTicks.filter(y => y !== 0 || (yMin >= 0 || yMax <= 0)).map(y => (
        <text key={`yl${y}`} x={PAD.left - 6} y={toSvgY(y) + 4} textAnchor="end" fontSize="11" fill="#6b7280">{y}</text>
      ))}
      {xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0 && (
        <text x={PAD.left - 6} y={H - PAD.bottom + 14} textAnchor="end" fontSize="11" fill="#9ca3af">0</text>
      )}

      {/* Axis labels */}
      <text x={W - PAD.right} y={H - PAD.bottom + 30} textAnchor="middle" fontSize="12" fill="#374151">{xAxisLabel}</text>
      <text x={PAD.left} y={PAD.top - 10} textAnchor="middle" fontSize="12" fill="#374151">{yAxisLabel}</text>
    </svg>
  );
}
