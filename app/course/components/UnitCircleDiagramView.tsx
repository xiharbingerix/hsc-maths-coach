"use client";

import * as React from "react";
import type { UnitCircleDiagram, UnitCirclePoint } from "../../../lib/lessons/types";
import { parseSymbolicNumber } from "./unitCircleMath";

const width = 420;
const height = 340;
const centre = { x: 210, y: 160 };
const radius = 105;

function pointFromUnit(point: { x: number; y: number }) {
  return {
    x: centre.x + point.x * radius,
    y: centre.y - point.y * radius,
  };
}

function parseUnitPoint(point: UnitCirclePoint | undefined, fallbackAngle: number | null) {
  const x = parseSymbolicNumber(point?.x);
  const y = parseSymbolicNumber(point?.y);
  if (x !== null && y !== null) return { x, y };
  if (fallbackAngle !== null) return { x: Math.cos(fallbackAngle), y: Math.sin(fallbackAngle) };
  return { x: 1, y: 0 };
}

function angleLabel(diagram: UnitCircleDiagram) {
  return diagram.angleRadians ?? diagram.angleDegrees ?? "";
}

export function UnitCircleDiagramView({
  diagram,
  className,
}: {
  diagram: UnitCircleDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const markerId = `${reactId}-arrow`;
  const terminalAngle = parseSymbolicNumber(diagram.angleRadians);
  const terminalPoint = parseUnitPoint(diagram.terminalPoint, terminalAngle);
  const terminalSvg = pointFromUnit(terminalPoint);
  const projection = pointFromUnit({ x: terminalPoint.x, y: 0 });
  const arcEndAngle = terminalAngle ?? Math.atan2(terminalPoint.y, terminalPoint.x);
  const arcRadius = 42;
  const arcEnd = {
    x: centre.x + Math.cos(arcEndAngle) * arcRadius,
    y: centre.y - Math.sin(arcEndAngle) * arcRadius,
  };
  const largeArc = Math.abs(arcEndAngle) > Math.PI ? 1 : 0;
  const sweep = arcEndAngle >= 0 ? 0 : 1;
  const labelAngle = arcEndAngle / 2;
  const angleLabelPoint = {
    x: centre.x + Math.cos(labelAngle) * 62,
    y: centre.y - Math.sin(labelAngle) * 62,
  };

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[380px] min-w-[320px]"
      >
        <title id={titleId}>{diagram.description}</title>
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" />
          </marker>
        </defs>
        <rect x="18" y="18" width={width - 36} height={height - 52} rx="10" fill="#ffffff" stroke="#cbd5e1" />
        <circle cx={centre.x} cy={centre.y} r={radius} fill="#f8fafc" stroke="#334155" strokeWidth={2.5} />
        <line x1={centre.x - radius - 24} y1={centre.y} x2={centre.x + radius + 24} y2={centre.y} stroke="#64748b" strokeWidth={2} />
        <line x1={centre.x} y1={centre.y + radius + 24} x2={centre.x} y2={centre.y - radius - 24} stroke="#64748b" strokeWidth={2} />
        <text x={centre.x + radius + 30} y={centre.y + 5} className="fill-slate-700 text-sm font-semibold">x</text>
        <text x={centre.x + 7} y={centre.y - radius - 27} className="fill-slate-700 text-sm font-semibold">y</text>

        <path
          d={`M ${centre.x + arcRadius} ${centre.y} A ${arcRadius} ${arcRadius} 0 ${largeArc} ${sweep} ${arcEnd.x} ${arcEnd.y}`}
          fill="none"
          stroke="#db2777"
          strokeWidth={3}
          strokeLinecap="round"
          markerEnd={`url(#${markerId})`}
        />
        {angleLabel(diagram) ? (
          <text x={angleLabelPoint.x} y={angleLabelPoint.y} textAnchor="middle" className="fill-pink-700 text-sm font-bold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
            {angleLabel(diagram)}
          </text>
        ) : null}

        {diagram.highlightRadius !== false ? (
          <line x1={centre.x} y1={centre.y} x2={terminalSvg.x} y2={terminalSvg.y} stroke="#0f766e" strokeWidth={3.5} strokeLinecap="round" />
        ) : null}

        {diagram.showReferenceTriangle ? (
          <g stroke="#2563eb" strokeWidth={2.5} strokeDasharray="7 5">
            <line x1={terminalSvg.x} y1={terminalSvg.y} x2={projection.x} y2={projection.y} />
            <line x1={centre.x} y1={centre.y} x2={projection.x} y2={projection.y} />
          </g>
        ) : null}

        {(diagram.symmetryPoints ?? []).map((point, index) => {
          const parsed = parseUnitPoint(point, null);
          const svgPoint = pointFromUnit(parsed);
          return (
            <g key={`symmetry-${index}`}>
              <circle cx={svgPoint.x} cy={svgPoint.y} r={4.5} fill="#f59e0b" stroke="#ffffff" strokeWidth={2} />
              <text x={svgPoint.x + 8} y={svgPoint.y - 8} className="fill-amber-800 text-xs font-semibold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
                {point.label ?? `(${point.x}, ${point.y})`}
              </text>
            </g>
          );
        })}

        <circle cx={terminalSvg.x} cy={terminalSvg.y} r={5.5} fill="#0f766e" stroke="#ffffff" strokeWidth={2} />
        <text x={terminalSvg.x + 9} y={terminalSvg.y - 10} className="fill-slate-900 text-xs font-bold" stroke="#ffffff" strokeWidth={4} paintOrder="stroke">
          {diagram.terminalPoint?.label ?? `(${diagram.terminalPoint?.x ?? terminalPoint.x.toFixed(2)}, ${diagram.terminalPoint?.y ?? terminalPoint.y.toFixed(2)})`}
        </text>

        {diagram.referenceAngle ? (
          <text x="30" y="300" className="fill-slate-700 text-xs font-semibold">
            Reference angle: {diagram.referenceAngle}
          </text>
        ) : null}
        {diagram.quadrant ? (
          <text x="250" y="300" className="fill-slate-700 text-xs font-semibold">
            Quadrant: {diagram.quadrant}
          </text>
        ) : null}
        {(diagram.notes ?? []).slice(0, 2).map((note, index) => (
          <text key={`note-${index}`} x="30" y={318 + index * 14} className="fill-slate-500 text-xs">
            {note}
          </text>
        ))}
      </svg>
    </div>
  );
}
