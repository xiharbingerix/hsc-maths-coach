"use client";

import * as React from "react";
import type {
  CircleGeometryArc,
  CircleGeometryDiagram,
  GeometryDiagramAngle,
  GeometryDiagramPoint,
  GeometryDiagramSegment,
  LineAngleDiagram,
} from "../../../lib/lessons/types";
import { mathLabel } from "./plotUtils";

type PointMap = Map<string, GeometryDiagramPoint>;
type FigureDiagram = LineAngleDiagram | CircleGeometryDiagram;

const TAU = Math.PI * 2;

function normaliseAngle(angle: number): number {
  return ((angle % TAU) + TAU) % TAU;
}

function validPoint(point: GeometryDiagramPoint | undefined): point is GeometryDiagramPoint {
  return Boolean(point && Number.isFinite(point.x) && Number.isFinite(point.y));
}

function unitVector(from: GeometryDiagramPoint, to: GeometryDiagramPoint) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  if (length === 0) return null;
  return { x: dx / length, y: dy / length };
}

function segmentMarkerLines(
  segment: GeometryDiagramSegment,
  points: PointMap
): Array<{ x1: number; y1: number; x2: number; y2: number }> {
  const from = points.get(segment.from);
  const to = points.get(segment.to);
  if (!validPoint(from) || !validPoint(to) || !segment.ticks) return [];
  const unit = unitVector(from, to);
  if (!unit) return [];
  const normal = { x: -unit.y, y: unit.x };
  const midpoint = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };

  return Array.from({ length: segment.ticks }, (_, index) => {
    const along = (index - (segment.ticks! - 1) / 2) * 11;
    const centre = {
      x: midpoint.x + unit.x * along,
      y: midpoint.y + unit.y * along,
    };
    return {
      x1: centre.x - normal.x * 7,
      y1: centre.y - normal.y * 7,
      x2: centre.x + normal.x * 7,
      y2: centre.y + normal.y * 7,
    };
  });
}

function parallelMarkerPaths(segment: GeometryDiagramSegment, points: PointMap): string[] {
  const from = points.get(segment.from);
  const to = points.get(segment.to);
  if (!validPoint(from) || !validPoint(to) || !segment.parallelMarks) return [];
  const unit = unitVector(from, to);
  if (!unit) return [];
  const normal = { x: -unit.y, y: unit.x };
  const midpoint = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };

  return Array.from({ length: segment.parallelMarks }, (_, index) => {
    const along = (index - (segment.parallelMarks! - 1) / 2) * 18;
    const centre = {
      x: midpoint.x + unit.x * along,
      y: midpoint.y + unit.y * along,
    };
    const back = { x: centre.x - unit.x * 7, y: centre.y - unit.y * 7 };
    const tip = { x: centre.x + unit.x * 4, y: centre.y + unit.y * 4 };
    return `M ${back.x - normal.x * 6} ${back.y - normal.y * 6} L ${tip.x} ${tip.y} L ${back.x + normal.x * 6} ${back.y + normal.y * 6}`;
  });
}

function segmentLabelPosition(segment: GeometryDiagramSegment, points: PointMap) {
  const from = points.get(segment.from);
  const to = points.get(segment.to);
  if (!validPoint(from) || !validPoint(to)) return null;
  const unit = unitVector(from, to);
  if (!unit) return null;
  const normal = { x: -unit.y, y: unit.x };
  const offset = segment.labelOffset ?? { x: normal.x * 16, y: normal.y * 16 };
  return {
    x: (from.x + to.x) / 2 + offset.x,
    y: (from.y + to.y) / 2 + offset.y,
  };
}

function angleGeometry(angle: GeometryDiagramAngle, points: PointMap, radius: number) {
  const vertex = points.get(angle.vertex);
  const from = points.get(angle.from);
  const to = points.get(angle.to);
  if (!validPoint(vertex) || !validPoint(from) || !validPoint(to)) return null;
  const fromUnit = unitVector(vertex, from);
  const toUnit = unitVector(vertex, to);
  if (!fromUnit || !toUnit) return null;

  const firstAngle = Math.atan2(fromUnit.y, fromUnit.x);
  const secondAngle = Math.atan2(toUnit.y, toUnit.x);
  const clockwiseDelta = normaliseAngle(secondAngle - firstAngle);
  const useClockwiseFromFirst = angle.reflex ? clockwiseDelta >= Math.PI : clockwiseDelta <= Math.PI;
  const startAngle = useClockwiseFromFirst ? firstAngle : secondAngle;
  const sweepAngle = useClockwiseFromFirst ? clockwiseDelta : TAU - clockwiseDelta;
  const start = {
    x: vertex.x + Math.cos(startAngle) * radius,
    y: vertex.y + Math.sin(startAngle) * radius,
  };
  const endAngle = startAngle + sweepAngle;
  const end = {
    x: vertex.x + Math.cos(endAngle) * radius,
    y: vertex.y + Math.sin(endAngle) * radius,
  };
  const labelAngle = startAngle + sweepAngle / 2;
  const labelRadius = radius + 17;

  return {
    vertex,
    fromUnit,
    toUnit,
    path: `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${sweepAngle > Math.PI ? 1 : 0} 1 ${end.x} ${end.y}`,
    labelPosition: {
      x: vertex.x + Math.cos(labelAngle) * labelRadius + (angle.labelOffset?.x ?? 0),
      y: vertex.y + Math.sin(labelAngle) * labelRadius + (angle.labelOffset?.y ?? 0),
    },
  };
}

function rightAnglePath(angle: GeometryDiagramAngle, points: PointMap): string | null {
  const geometry = angleGeometry(angle, points, angle.radius ?? 18);
  if (!geometry) return null;
  const size = angle.radius ?? 18;
  const first = {
    x: geometry.vertex.x + geometry.fromUnit.x * size,
    y: geometry.vertex.y + geometry.fromUnit.y * size,
  };
  const corner = {
    x: first.x + geometry.toUnit.x * size,
    y: first.y + geometry.toUnit.y * size,
  };
  const second = {
    x: geometry.vertex.x + geometry.toUnit.x * size,
    y: geometry.vertex.y + geometry.toUnit.y * size,
  };
  return `M ${first.x} ${first.y} L ${corner.x} ${corner.y} L ${second.x} ${second.y}`;
}

function circleArcGeometry(
  arc: CircleGeometryArc,
  diagram: CircleGeometryDiagram,
  points: PointMap
) {
  const centre = points.get(diagram.circle.center);
  const from = points.get(arc.from);
  const to = points.get(arc.to);
  if (!validPoint(centre) || !validPoint(from) || !validPoint(to)) return null;
  const radius = diagram.circle.radius;
  if (!Number.isFinite(radius) || radius <= 0) return null;

  const startAngle = Math.atan2(from.y - centre.y, from.x - centre.x);
  const endAngle = Math.atan2(to.y - centre.y, to.x - centre.x);
  const clockwiseDelta = normaliseAngle(endAngle - startAngle);
  const counterDelta = TAU - clockwiseDelta;
  let sweepFlag: 0 | 1;
  let sweepAngle: number;

  if (arc.clockwise === true) {
    sweepFlag = 1;
    sweepAngle = clockwiseDelta;
  } else if (arc.clockwise === false) {
    sweepFlag = 0;
    sweepAngle = counterDelta;
  } else {
    const clockwiseMatches = arc.largeArc ? clockwiseDelta >= Math.PI : clockwiseDelta <= Math.PI;
    sweepFlag = clockwiseMatches ? 1 : 0;
    sweepAngle = clockwiseMatches ? clockwiseDelta : counterDelta;
  }

  const actualStart = {
    x: centre.x + Math.cos(startAngle) * radius,
    y: centre.y + Math.sin(startAngle) * radius,
  };
  const actualEnd = {
    x: centre.x + Math.cos(endAngle) * radius,
    y: centre.y + Math.sin(endAngle) * radius,
  };
  const labelAngle = startAngle + (sweepFlag === 1 ? 1 : -1) * sweepAngle / 2;
  const labelRadius = radius + (arc.labelOffset ?? 18);

  return {
    path: `M ${actualStart.x} ${actualStart.y} A ${radius} ${radius} 0 ${sweepAngle > Math.PI ? 1 : 0} ${sweepFlag} ${actualEnd.x} ${actualEnd.y}`,
    labelPosition: {
      x: centre.x + Math.cos(labelAngle) * labelRadius,
      y: centre.y + Math.sin(labelAngle) * labelRadius,
    },
  };
}

function pointLabelPosition(
  point: GeometryDiagramPoint,
  origin: { x: number; y: number }
) {
  if (point.labelOffset) {
    return { x: point.x + point.labelOffset.x, y: point.y + point.labelOffset.y };
  }
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const length = Math.hypot(dx, dy);
  if (length < 1) return { x: point.x + 14, y: point.y - 14 };
  return { x: point.x + (dx / length) * 18, y: point.y + (dy / length) * 18 };
}

export function GeometryFigureView({
  diagram,
  className,
}: {
  diagram: FigureDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const sourcePoints = diagram.points.filter(validPoint);
  const xs = sourcePoints.map((point) => point.x);
  const ys = sourcePoints.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const dataWidth = maxX - minX;
  const dataHeight = maxY - minY;
  const usesModelCoordinates =
    !("circle" in diagram) &&
    Math.max(dataWidth, dataHeight) <= 20;
  const validPoints = usesModelCoordinates
    ? sourcePoints.map((point) => ({
        ...point,
        x: 55 + ((point.x - minX) / (dataWidth || 1)) * 290,
        y: 45 + ((point.y - minY) / (dataHeight || 1)) * 210,
      }))
    : sourcePoints;
  const displayDiagram = usesModelCoordinates
    ? { ...diagram, points: validPoints, viewBox: undefined }
    : diagram;
  const points = new Map(validPoints.map((point) => [point.id, point]));
  const circleDiagram = "circle" in displayDiagram ? displayDiagram : null;
  const circleCentre = circleDiagram ? points.get(circleDiagram.circle.center) : undefined;
  const origin = validPoint(circleCentre)
    ? circleCentre
    : {
        x: validPoints.reduce((sum, point) => sum + point.x, 0) / Math.max(1, validPoints.length),
        y: validPoints.reduce((sum, point) => sum + point.y, 0) / Math.max(1, validPoints.length),
      };

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={displayDiagram.viewBox ?? "0 0 400 300"}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[360px] min-w-[320px]"
      >
        <title id={titleId}>{displayDiagram.description}</title>

        {circleDiagram && validPoint(circleCentre) && circleDiagram.circle.radius > 0 ? (
          <>
            <circle
              cx={circleCentre.x}
              cy={circleCentre.y}
              r={circleDiagram.circle.radius}
              fill="#eff6ff"
              fillOpacity={0.45}
              stroke={circleDiagram.circle.highlighted ? "#d97706" : "#475569"}
              strokeWidth={circleDiagram.circle.highlighted ? 4 : 3}
            />
            {circleDiagram.circle.label ? (
              <text
                x={circleCentre.x}
                y={circleCentre.y - circleDiagram.circle.radius - 15}
                textAnchor="middle"
                className="fill-slate-700 text-sm font-semibold"
              >
                {mathLabel(circleDiagram.circle.label)}
              </text>
            ) : null}
          </>
        ) : null}

        {circleDiagram?.arcs?.map((arc, index) => {
          const geometry = circleArcGeometry(arc, circleDiagram, points);
          if (!geometry) return null;
          return (
            <g key={`arc-${arc.from}-${arc.to}-${index}`}>
              <path
                d={geometry.path}
                fill="none"
                stroke={arc.highlighted ? "#d97706" : "#2563eb"}
                strokeWidth={arc.highlighted ? 6 : 4}
                strokeLinecap="round"
              />
              {arc.label ? (
                <text
                  x={geometry.labelPosition.x}
                  y={geometry.labelPosition.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-blue-700 text-sm font-semibold"
                  stroke="#ffffff"
                  strokeWidth={4}
                  paintOrder="stroke"
                >
                  {mathLabel(arc.label)}
                </text>
              ) : null}
            </g>
          );
        })}

        {displayDiagram.segments.map((segment, index) => {
          const from = points.get(segment.from);
          const to = points.get(segment.to);
          if (!validPoint(from) || !validPoint(to)) return null;
          return (
            <line
              key={`segment-${segment.from}-${segment.to}-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={segment.highlighted ? "#d97706" : "#475569"}
              strokeWidth={segment.highlighted ? 5 : 3}
              strokeLinecap="round"
              strokeDasharray={segment.dashed ? "8 6" : undefined}
            />
          );
        })}

        {displayDiagram.segments.flatMap((segment, segmentIndex) =>
          segmentMarkerLines(segment, points).map((marker, markerIndex) => (
            <line
              key={`ticks-${segmentIndex}-${markerIndex}`}
              {...marker}
              stroke="#0f172a"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          ))
        )}

        {displayDiagram.segments.flatMap((segment, segmentIndex) =>
          parallelMarkerPaths(segment, points).map((path, markerIndex) => (
            <path
              key={`parallel-${segmentIndex}-${markerIndex}`}
              d={path}
              fill="none"
              stroke="#0f172a"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))
        )}

        {displayDiagram.angles?.flatMap((angle, angleIndex) => {
          if (angle.rightAngle) {
            const path = rightAnglePath(angle, points);
            return path ? [
              <path
                key={`right-angle-${angleIndex}`}
                d={path}
                fill="none"
                stroke={angle.highlighted ? "#d97706" : "#0f172a"}
                strokeWidth={2.5}
                strokeLinejoin="round"
              />,
            ] : [];
          }
          const markCount = angle.marks ?? 1;
          return Array.from({ length: markCount }, (_, markIndex) => {
            const geometry = angleGeometry(angle, points, (angle.radius ?? 24) + markIndex * 7);
            return geometry ? (
              <path
                key={`angle-${angleIndex}-${markIndex}`}
                d={geometry.path}
                fill="none"
                stroke={angle.highlighted ? "#d97706" : "#2563eb"}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            ) : null;
          });
        })}

        {displayDiagram.segments.map((segment, index) => {
          if (!segment.label) return null;
          const position = segmentLabelPosition(segment, points);
          return position ? (
            <text
              key={`segment-label-${index}`}
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-800 text-sm font-semibold"
              stroke="#ffffff"
              strokeWidth={5}
              paintOrder="stroke"
            >
              {mathLabel(segment.label)}
            </text>
          ) : null;
        })}

        {displayDiagram.angles?.map((angle, index) => {
          if (!angle.label) return null;
          const geometry = angleGeometry(angle, points, angle.radius ?? 24);
          return geometry ? (
            <text
              key={`angle-label-${index}`}
              x={geometry.labelPosition.x}
              y={geometry.labelPosition.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-amber-700 text-sm font-bold"
              stroke="#ffffff"
              strokeWidth={5}
              paintOrder="stroke"
            >
              {mathLabel(angle.label)}
            </text>
          ) : null;
        })}

        {validPoints.map((point) => {
          const labelPosition = pointLabelPosition(point, origin);
          return (
            <g key={`point-${point.id}`}>
              {point.showDot !== false ? <circle cx={point.x} cy={point.y} r={4} fill="#0f172a" /> : null}
              {point.showLabel !== false ? (
                <text
                  x={labelPosition.x}
                  y={labelPosition.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-slate-900 text-sm font-bold"
                  stroke="#ffffff"
                  strokeWidth={5}
                  paintOrder="stroke"
                >
                  {mathLabel(point.label ?? point.id)}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
