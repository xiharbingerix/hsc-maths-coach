"use client";

import * as React from "react";
import type { TriangleDiagram } from "../../../lib/lessons/types";

type VertexKey = "A" | "B" | "C";
type SideKey = "AB" | "BC" | "AC";

const sides: { key: SideKey; from: VertexKey; to: VertexKey }[] = [
  { key: "AB", from: "A", to: "B" },
  { key: "BC", from: "B", to: "C" },
  { key: "AC", from: "A", to: "C" },
];

function sideLabelPosition(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const unitX = dx / length;
  const unitY = dy / length;

  return {
    x: (from.x + to.x) / 2 - unitY * 18,
    y: (from.y + to.y) / 2 + unitX * 18,
  };
}

function labelPosition(
  point: { x: number; y: number },
  centre: { x: number; y: number },
  distance: number
) {
  const dx = point.x - centre.x;
  const dy = point.y - centre.y;
  const length = Math.hypot(dx, dy) || 1;

  return {
    x: point.x + (dx / length) * distance,
    y: point.y + (dy / length) * distance,
  };
}

function rightAnglePath(
  diagram: TriangleDiagram,
  vertexKey: VertexKey
): string | null {
  const vertices = diagram.vertices;
  const point = vertices[vertexKey];
  const adjacent = (["A", "B", "C"] as VertexKey[]).filter(
    (key) => key !== vertexKey
  );
  const first = vertices[adjacent[0]];
  const second = vertices[adjacent[1]];
  const size = 18;

  const firstLength = Math.hypot(first.x - point.x, first.y - point.y);
  const secondLength = Math.hypot(second.x - point.x, second.y - point.y);

  if (firstLength === 0 || secondLength === 0) {
    return null;
  }

  const firstUnit = {
    x: (first.x - point.x) / firstLength,
    y: (first.y - point.y) / firstLength,
  };
  const secondUnit = {
    x: (second.x - point.x) / secondLength,
    y: (second.y - point.y) / secondLength,
  };

  const p1 = {
    x: point.x + firstUnit.x * size,
    y: point.y + firstUnit.y * size,
  };
  const corner = {
    x: p1.x + secondUnit.x * size,
    y: p1.y + secondUnit.y * size,
  };
  const p2 = {
    x: point.x + secondUnit.x * size,
    y: point.y + secondUnit.y * size,
  };

  return `M ${p1.x} ${p1.y} L ${corner.x} ${corner.y} L ${p2.x} ${p2.y}`;
}

export function TriangleDiagramView({
  diagram,
  className,
}: {
  diagram: TriangleDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const vertices = diagram.vertices;
  const centre = {
    x: (vertices.A.x + vertices.B.x + vertices.C.x) / 3,
    y: (vertices.A.y + vertices.B.y + vertices.C.y) / 3,
  };
  const highlightedSides = new Set(diagram.highlightedSides ?? []);

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={diagram.viewBox ?? "0 0 400 280"}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[320px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>

        {sides.map((side) => {
          const from = vertices[side.from];
          const to = vertices[side.to];
          const isHighlighted = highlightedSides.has(side.key);

          return (
            <line
              key={side.key}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isHighlighted ? "#d97706" : "#475569"}
              strokeWidth={isHighlighted ? 5 : 3}
              strokeLinecap="round"
            />
          );
        })}

        {diagram.rightAngleAt &&
          (() => {
            const path = rightAnglePath(diagram, diagram.rightAngleAt);

            return path ? (
              <path
                d={path}
                fill="none"
                stroke="#0f172a"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
            ) : null;
          })()}

        {sides.map((side) => {
          const label = diagram.sideLabels?.[side.key];

          if (!label) {
            return null;
          }

          const position = sideLabelPosition(vertices[side.from], vertices[side.to]);

          return (
            <text
              key={`${side.key}-label`}
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-800 text-sm font-semibold"
              stroke="#ffffff"
              strokeWidth={5}
              paintOrder="stroke"
            >
              {label}
            </text>
          );
        })}

        {(Object.keys(vertices) as VertexKey[]).map((key) => {
          const point = vertices[key];
          const position = labelPosition(point, centre, 24);

          return (
            <text
              key={`${key}-vertex-label`}
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-900 text-base font-bold"
              stroke="#ffffff"
              strokeWidth={5}
              paintOrder="stroke"
            >
              {diagram.vertexLabels?.[key] ?? key}
            </text>
          );
        })}

        {(Object.keys(vertices) as VertexKey[]).map((key) => {
          const label = diagram.angleLabels?.[key];

          if (!label) {
            return null;
          }

          const point = vertices[key];
          const position = {
            x: point.x + (centre.x - point.x) * 0.22,
            y: point.y + (centre.y - point.y) * 0.22,
          };

          return (
            <text
              key={`${key}-angle-label`}
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-amber-700 text-sm font-bold"
              stroke="#ffffff"
              strokeWidth={5}
              paintOrder="stroke"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
