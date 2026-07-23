"use client";

import * as React from "react";
import type {
  TriangleDiagram,
  TriangleSideKey,
  TriangleVertexKey,
} from "../../../lib/lessons/types";

type VertexKey = TriangleVertexKey;
type SideKey = TriangleSideKey;

const sides: { key: SideKey; from: VertexKey; to: VertexKey }[] = [
  { key: "AB", from: "A", to: "B" },
  { key: "BC", from: "B", to: "C" },
  { key: "AC", from: "A", to: "C" },
];

function sideLabelPosition(
  from: { x: number; y: number },
  to: { x: number; y: number },
  centre: { x: number; y: number }
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const unitX = dx / length;
  const unitY = dy / length;
  const midpoint = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2,
  };
  const offset = 22;
  const first = {
    x: midpoint.x - unitY * offset,
    y: midpoint.y + unitX * offset,
  };
  const second = {
    x: midpoint.x + unitY * offset,
    y: midpoint.y - unitX * offset,
  };
  const firstDistance = Math.hypot(first.x - centre.x, first.y - centre.y);
  const secondDistance = Math.hypot(second.x - centre.x, second.y - centre.y);

  return firstDistance > secondDistance ? first : second;
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

function adjacentVertices(vertexKey: VertexKey): [VertexKey, VertexKey] {
  return (["A", "B", "C"] as VertexKey[]).filter(
    (key) => key !== vertexKey
  ) as [VertexKey, VertexKey];
}

function unitVector(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;

  return {
    x: dx / length,
    y: dy / length,
  };
}

function angleLabelPosition(
  diagram: TriangleDiagram,
  vertexKey: VertexKey,
  centre: { x: number; y: number }
) {
  const vertices = diagram.vertices;
  const point = vertices[vertexKey];
  const [firstKey, secondKey] = adjacentVertices(vertexKey);
  const firstUnit = unitVector(point, vertices[firstKey]);
  const secondUnit = unitVector(point, vertices[secondKey]);
  const bisector = {
    x: firstUnit.x + secondUnit.x,
    y: firstUnit.y + secondUnit.y,
  };
  const length = Math.hypot(bisector.x, bisector.y);

  if (length < 0.01) {
    return {
      x: point.x + (centre.x - point.x) * 0.25,
      y: point.y + (centre.y - point.y) * 0.25,
    };
  }

  return {
    x: point.x + (bisector.x / length) * 34,
    y: point.y + (bisector.y / length) * 34,
  };
}

function angleArcPath(
  diagram: TriangleDiagram,
  vertexKey: VertexKey,
  radius = 24
): string | null {
  const vertices = diagram.vertices;
  const point = vertices[vertexKey];
  const [firstKey, secondKey] = adjacentVertices(vertexKey);
  const firstUnit = unitVector(point, vertices[firstKey]);
  const secondUnit = unitVector(point, vertices[secondKey]);
  const start = {
    x: point.x + firstUnit.x * radius,
    y: point.y + firstUnit.y * radius,
  };
  const end = {
    x: point.x + secondUnit.x * radius,
    y: point.y + secondUnit.y * radius,
  };
  const cross = firstUnit.x * secondUnit.y - firstUnit.y * secondUnit.x;
  const sweepFlag = cross > 0 ? 1 : 0;

  if (Math.hypot(start.x - end.x, start.y - end.y) < 1) {
    return null;
  }

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 ${sweepFlag} ${end.x} ${end.y}`;
}

function sideTickPaths(
  diagram: TriangleDiagram,
  side: (typeof sides)[number],
  count: 1 | 2 | 3
) {
  const from = diagram.vertices[side.from];
  const to = diagram.vertices[side.to];
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  if (length === 0) return [];

  const unitX = dx / length;
  const unitY = dy / length;
  const normalX = -unitY;
  const normalY = unitX;
  const midpoint = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };

  return Array.from({ length: count }, (_, index) => {
    const along = (index - (count - 1) / 2) * 11;
    const centre = {
      x: midpoint.x + unitX * along,
      y: midpoint.y + unitY * along,
    };
    return {
      x1: centre.x - normalX * 7,
      y1: centre.y - normalY * 7,
      x2: centre.x + normalX * 7,
      y2: centre.y + normalY * 7,
    };
  });
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
  const sourceVertices = diagram.vertices;
  const xs = Object.values(sourceVertices).map((vertex) => vertex.x);
  const ys = Object.values(sourceVertices).map((vertex) => vertex.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const dataWidth = maxX - minX;
  const dataHeight = maxY - minY;
  const usesModelCoordinates =
    !diagram.viewBox && Math.max(dataWidth, dataHeight) <= 20;
  const vertices = usesModelCoordinates
    ? (Object.fromEntries(
        Object.entries(sourceVertices).map(([key, vertex]) => [
          key,
          {
            x: 55 + ((vertex.x - minX) / (dataWidth || 1)) * 290,
            y: 45 + ((vertex.y - minY) / (dataHeight || 1)) * 190,
          },
        ])
      ) as TriangleDiagram["vertices"])
    : sourceVertices;
  const displayDiagram = usesModelCoordinates
    ? { ...diagram, vertices }
    : diagram;
  const centre = {
    x: (vertices.A.x + vertices.B.x + vertices.C.x) / 3,
    y: (vertices.A.y + vertices.B.y + vertices.C.y) / 3,
  };
  const highlightedSides = new Set(displayDiagram.highlightedSides ?? []);

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={displayDiagram.viewBox ?? "0 0 400 280"}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[320px] min-w-[320px]"
      >
        <title id={titleId}>{displayDiagram.description}</title>

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

        {sides.flatMap((side) => {
          const count = displayDiagram.sideTicks?.[side.key];
          if (!count) return [];
          return sideTickPaths(displayDiagram, side, count).map((tick, index) => (
            <line
              key={`${side.key}-tick-${index}`}
              {...tick}
              stroke="#0f172a"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          ));
        })}

        {displayDiagram.rightAngleAt &&
          (() => {
            const path = rightAnglePath(
              displayDiagram,
              displayDiagram.rightAngleAt
            );

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
          const label = displayDiagram.sideLabels?.[side.key];

          if (!label) {
            return null;
          }

          const position = sideLabelPosition(
            vertices[side.from],
            vertices[side.to],
            centre
          );

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

        {(Object.keys(vertices) as VertexKey[]).flatMap((key) => {
          const markCount =
            displayDiagram.angleMarks?.[key] ??
            (displayDiagram.angleLabels?.[key] ? 1 : 0);
          return Array.from({ length: markCount }, (_, index) => {
            const path = angleArcPath(displayDiagram, key, 21 + index * 7);
            return path ? (
              <path
                key={`${key}-angle-arc-${index}`}
                d={path}
                fill="none"
                stroke="#d97706"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            ) : null;
          });
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
              {displayDiagram.vertexLabels?.[key] ?? key}
            </text>
          );
        })}

        {(Object.keys(vertices) as VertexKey[]).map((key) => {
          const label = displayDiagram.angleLabels?.[key];

          if (!label) {
            return null;
          }

          const position = angleLabelPosition(displayDiagram, key, centre);

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
