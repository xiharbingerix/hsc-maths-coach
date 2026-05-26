"use client";

import * as React from "react";
import type { NetworkDiagram, NetworkEdge } from "../../../lib/lessons/types";

const vertexRadius = 20;

function highlightedEdge(diagram: NetworkDiagram, edge: NetworkEdge) {
  if (edge.highlighted) {
    return true;
  }

  return diagram.highlightedEdges?.some(
    ([from, to]) =>
      (from === edge.from && to === edge.to) ||
      (!edge.directed && from === edge.to && to === edge.from)
  );
}

function edgePoints(
  from: { x: number; y: number },
  to: { x: number; y: number },
  directed?: boolean
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return null;
  }

  const unitX = dx / length;
  const unitY = dy / length;
  const endOffset = directed ? vertexRadius + 10 : vertexRadius;

  return {
    x1: from.x + unitX * vertexRadius,
    y1: from.y + unitY * vertexRadius,
    x2: to.x - unitX * endOffset,
    y2: to.y - unitY * endOffset,
    labelX: (from.x + to.x) / 2 - unitY * 14,
    labelY: (from.y + to.y) / 2 + unitX * 14,
  };
}

export function NetworkDiagramView({
  diagram,
  className,
}: {
  diagram: NetworkDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const markerId = `${reactId}-arrow`;
  const highlightedMarkerId = `${reactId}-arrow-highlighted`;
  const vertexById = new Map(
    diagram.vertices.map((vertex) => [vertex.id, vertex])
  );

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={diagram.viewBox ?? "0 0 400 300"}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[320px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
          </marker>
          <marker
            id={highlightedMarkerId}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" />
          </marker>
        </defs>

        {diagram.edges.map((edge, index) => {
          const from = vertexById.get(edge.from);
          const to = vertexById.get(edge.to);

          if (!from || !to) {
            return null;
          }

          const points = edgePoints(from, to, edge.directed);

          if (!points) {
            return null;
          }

          const isHighlighted = highlightedEdge(diagram, edge);

          return (
            <line
              key={`${edge.from}-${edge.to}-${index}`}
              x1={points.x1}
              y1={points.y1}
              x2={points.x2}
              y2={points.y2}
              stroke={isHighlighted ? "#d97706" : "#475569"}
              strokeWidth={isHighlighted ? 4 : 3}
              strokeLinecap="round"
              strokeDasharray={edge.dashed ? "8 7" : undefined}
              markerEnd={
                edge.directed
                  ? `url(#${isHighlighted ? highlightedMarkerId : markerId})`
                  : undefined
              }
            />
          );
        })}

        {diagram.edges.map((edge, index) => {
          if (edge.weight === undefined) {
            return null;
          }

          const from = vertexById.get(edge.from);
          const to = vertexById.get(edge.to);

          if (!from || !to) {
            return null;
          }

          const points = edgePoints(from, to, edge.directed);

          if (!points) {
            return null;
          }

          return (
            <text
              key={`${edge.from}-${edge.to}-${index}-weight`}
              x={points.labelX}
              y={points.labelY}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-800 text-sm font-semibold"
              stroke="#ffffff"
              strokeWidth={5}
              paintOrder="stroke"
            >
              {edge.weight}
            </text>
          );
        })}

        {diagram.vertices.map((vertex) => {
          const isHighlighted =
            vertex.highlighted ||
            diagram.highlightedVertices?.includes(vertex.id);

          return (
            <circle
              key={vertex.id}
              cx={vertex.x}
              cy={vertex.y}
              r={vertexRadius}
              fill={isHighlighted ? "#fef3c7" : "#f8fafc"}
              stroke={isHighlighted ? "#d97706" : "#334155"}
              strokeWidth={isHighlighted ? 4 : 3}
            />
          );
        })}

        {diagram.vertices.map((vertex) => (
          <text
            key={`${vertex.id}-label`}
            x={vertex.x}
            y={vertex.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-slate-900 text-base font-bold"
          >
            {vertex.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
