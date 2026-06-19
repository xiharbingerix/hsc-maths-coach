"use client";

import * as React from "react";
import type { AngleFigureDiagram, AngleFigurePos } from "../../../lib/lessons/types";

const rad = (deg: number) => (deg * Math.PI) / 180;
// Screen vector for a math angle (0 = east, CCW positive); SVG y points down.
const vec = (deg: number) => ({ x: Math.cos(rad(deg)), y: -Math.sin(rad(deg)) });
const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

const LINE = "#475569";
const ACCENT = "#d97706";
const INK = "#0f172a";

function arcPath(
  cx: number,
  cy: number,
  fromDeg: number,
  toDeg: number,
  r: number
): string {
  const span = norm360(toDeg - fromDeg);
  const a = vec(fromDeg);
  const b = vec(toDeg);
  const start = { x: cx + a.x * r, y: cy + a.y * r };
  const end = { x: cx + b.x * r, y: cy + b.y * r };
  // CCW in math space is clockwise on screen (y flipped) → sweep-flag 0.
  const large = span > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

function rightAngleMark(cx: number, cy: number, aDeg: number, bDeg: number, s = 14) {
  const a = vec(aDeg);
  const b = vec(bDeg);
  const p1 = { x: cx + a.x * s, y: cy + a.y * s };
  const corner = { x: cx + (a.x + b.x) * s, y: cy + (a.y + b.y) * s };
  const p2 = { x: cx + b.x * s, y: cy + b.y * s };
  return `M ${p1.x} ${p1.y} L ${corner.x} ${corner.y} L ${p2.x} ${p2.y}`;
}

function Label({
  x,
  y,
  children,
  className,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className={className}
      stroke="#ffffff"
      strokeWidth={5}
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

/** Rays from a single point: angles on a line, at a point, intersecting lines. */
function RaysFigure({ diagram }: { diagram: AngleFigureDiagram }) {
  const cx = 180;
  const cy = 150;
  const R = 120;
  const rays = diagram.rays ?? [];

  return (
    <>
      {rays.map((deg, i) => {
        const v = vec(deg);
        return (
          <line
            key={`ray-${i}`}
            x1={cx}
            y1={cy}
            x2={cx + v.x * R}
            y2={cy + v.y * R}
            stroke={LINE}
            strokeWidth={3}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={3.5} fill={INK} />

      {(diagram.sectorLabels ?? []).map((s, i) => {
        const [from, to] = s.between;
        const mid = from + norm360(to - from) / 2;
        const v = vec(mid);
        if (s.right) {
          return (
            <path
              key={`sec-${i}`}
              d={rightAngleMark(cx, cy, from, to)}
              fill="none"
              stroke={INK}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          );
        }
        return (
          <g key={`sec-${i}`}>
            <path
              d={arcPath(cx, cy, from, to, 30)}
              fill="none"
              stroke={ACCENT}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <Label
              x={cx + v.x * 50}
              y={cy + v.y * 50}
              className="fill-amber-700 text-sm font-bold"
            >
              {s.label}
            </Label>
          </g>
        );
      })}

      {(diagram.rayLabels ?? []).map((label, i) => {
        if (!label || rays[i] === undefined) return null;
        const v = vec(rays[i]);
        return (
          <Label
            key={`rl-${i}`}
            x={cx + v.x * (R + 14)}
            y={cy + v.y * (R + 14)}
            className="fill-slate-900 text-sm font-semibold"
          >
            {label}
          </Label>
        );
      })}
    </>
  );
}

/** Classify a bisector screen-vector into one of the four corner positions. */
function posFor(v: { x: number; y: number }): AngleFigurePos {
  const top = v.y < 0; // screen y up
  const left = v.x < 0;
  if (top && left) return "TL";
  if (top && !left) return "TR";
  if (!top && left) return "BL";
  return "BR";
}

/** Four labelled angles around an intersection of two lines through a point. */
function FourAngles({
  cx,
  cy,
  transMathDeg,
  labels,
}: {
  cx: number;
  cy: number;
  transMathDeg: number;
  labels?: Partial<Record<AngleFigurePos, string>>;
}) {
  if (!labels) return null;
  const dirs = [0, 180, transMathDeg, transMathDeg + 180]
    .map(norm360)
    .sort((a, b) => a - b);
  const out: React.ReactElement[] = [];
  for (let i = 0; i < dirs.length; i++) {
    const from = dirs[i];
    const to = dirs[(i + 1) % dirs.length];
    const mid = from + norm360(to - from) / 2;
    const v = vec(mid);
    const label = labels[posFor(v)];
    if (!label) continue;
    out.push(
      <g key={`fa-${cx}-${cy}-${i}`}>
        <path
          d={arcPath(cx, cy, from, to, 22)}
          fill="none"
          stroke={ACCENT}
          strokeWidth={2.25}
          strokeLinecap="round"
        />
        <Label
          x={cx + v.x * 40}
          y={cy + v.y * 40}
          className="fill-amber-700 text-sm font-bold"
        >
          {label}
        </Label>
      </g>
    );
  }
  return <>{out}</>;
}

function chevrons(x: number, y: number, n: number) {
  const marks: React.ReactElement[] = [];
  for (let k = 0; k < n; k++) {
    const ox = x + k * 7;
    marks.push(
      <path
        key={`chev-${x}-${y}-${k}`}
        d={`M ${ox - 4} ${y - 5} L ${ox + 2} ${y} L ${ox - 4} ${y + 5}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  return marks;
}

/** Two parallel lines cut by a transversal. */
function TransversalFigure({ diagram }: { diagram: AngleFigureDiagram }) {
  const x0 = 40;
  const x1 = 320;
  const yTop = 95;
  const yBottom = 205;
  const theta = diagram.transversalDeg ?? 60;
  // Transversal slopes down to the right: screen direction (cos, sin) with sin>0.
  const t = rad(theta);
  const Tx = 150;
  const Bx = Tx + (yBottom - yTop) / Math.tan(t);
  const u = { x: Math.cos(t), y: Math.sin(t) };
  const len = 70;
  // Math angle of the transversal pointing down-right (screen y down → negate).
  const transMathDeg = norm360((Math.atan2(-u.y, u.x) * 180) / Math.PI);
  const [labA, labB] = diagram.parallelLabels ?? ["", ""];

  return (
    <>
      {/* parallel lines */}
      <line x1={x0} y1={yTop} x2={x1} y2={yTop} stroke={LINE} strokeWidth={3} strokeLinecap="round" />
      <line x1={x0} y1={yBottom} x2={x1} y2={yBottom} stroke={LINE} strokeWidth={3} strokeLinecap="round" />
      {chevrons(282, yTop, 1)}
      {chevrons(282, yBottom, 1)}
      {labA ? (
        <Label x={x1 + 14} y={yTop} className="fill-slate-900 text-sm font-semibold">
          {labA}
        </Label>
      ) : null}
      {labB ? (
        <Label x={x1 + 14} y={yBottom} className="fill-slate-900 text-sm font-semibold">
          {labB}
        </Label>
      ) : null}

      {/* transversal */}
      <line
        x1={Tx - u.x * len}
        y1={yTop - u.y * len}
        x2={Bx + u.x * len}
        y2={yBottom + u.y * len}
        stroke={LINE}
        strokeWidth={3}
        strokeLinecap="round"
      />

      <FourAngles cx={Tx} cy={yTop} transMathDeg={transMathDeg} labels={diagram.topAngles} />
      <FourAngles cx={Bx} cy={yBottom} transMathDeg={transMathDeg} labels={diagram.bottomAngles} />
    </>
  );
}

export function AngleFigureView({
  diagram,
  className,
}: {
  diagram: AngleFigureDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={diagram.viewBox ?? "0 0 360 300"}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[320px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>
        {diagram.kind === "transversal" ? (
          <TransversalFigure diagram={diagram} />
        ) : (
          <RaysFigure diagram={diagram} />
        )}
      </svg>
    </div>
  );
}
