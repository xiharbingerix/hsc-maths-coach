"use client";

import * as React from "react";
import type { Vector3DDiagram, Vector3DPoint } from "../../../lib/lessons/types";

const width = 420;
const height = 320;
const origin = { x: 190, y: 205 };
const scale = 34;

function project(point: Vector3DPoint) {
  return {
    x: origin.x + (point.x - point.y) * scale * 0.78,
    y: origin.y - point.z * scale + (point.x + point.y) * scale * 0.32,
  };
}

function add(a: Vector3DPoint, b: Vector3DPoint): Vector3DPoint {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function multiply(point: Vector3DPoint, scalar: number): Vector3DPoint {
  return { x: point.x * scalar, y: point.y * scalar, z: point.z * scalar };
}

function pointText(point: Vector3DPoint) {
  return point.label ?? `(${point.x}, ${point.y}, ${point.z})`;
}

export function Vector3DDiagramView({
  diagram,
  className,
}: {
  diagram: Vector3DDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const markerId = `${reactId}-arrow`;
  const lineMarkerId = `${reactId}-line-arrow`;
  const axisLength = diagram.axisLength ?? 4;
  const axes = [
    { label: "x", to: { x: axisLength, y: 0, z: 0 } },
    { label: "y", to: { x: 0, y: axisLength, z: 0 } },
    { label: "z", to: { x: 0, y: 0, z: axisLength } },
  ];

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
          <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" />
          </marker>
          <marker id={lineMarkerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
          </marker>
        </defs>
        <rect x="18" y="18" width={width - 36} height={height - 36} rx="10" fill="#ffffff" stroke="#cbd5e1" />

        {axes.map((axis) => {
          const to = project(axis.to);
          return (
            <g key={axis.label}>
              <line x1={origin.x} y1={origin.y} x2={to.x} y2={to.y} stroke="#475569" strokeWidth={2.5} markerEnd={`url(#${lineMarkerId})`} />
              <text x={to.x + 8} y={to.y - 6} className="fill-slate-800 text-sm font-semibold">
                {axis.label}
              </text>
            </g>
          );
        })}

        {diagram.lines?.map((line, index) => {
          const tMin = line.tMin ?? -1.8;
          const tMax = line.tMax ?? 1.8;
          const from = project(add(line.point, multiply(line.direction, tMin)));
          const to = project(add(line.point, multiply(line.direction, tMax)));
          return (
            <g key={`line-${index}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#2563eb" strokeWidth={3} strokeLinecap="round" strokeDasharray="8 6" markerEnd={`url(#${lineMarkerId})`} />
              {line.label ? (
                <text x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 8} className="fill-blue-700 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                  {line.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {diagram.vectors?.map((vector, index) => {
          const fromPoint = vector.from ?? { x: 0, y: 0, z: 0 };
          const from = project(fromPoint);
          const to = project(vector.to);
          return (
            <g key={`vector-${index}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#0f766e" strokeWidth={3} strokeLinecap="round" markerEnd={`url(#${markerId})`} />
              {vector.label ? (
                <text x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 8} className="fill-teal-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                  {vector.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {(diagram.points ?? []).map((point, index) => {
          const projected = project(point);
          return (
            <g key={`point-${index}`}>
              <circle cx={projected.x} cy={projected.y} r={5} fill="#7c3aed" stroke="#ffffff" strokeWidth={2} />
              <text x={projected.x + 8} y={projected.y - 9} className="fill-slate-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                {pointText(point)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
