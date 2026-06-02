"use client";

import * as React from "react";
import type { VennDiagram } from "../../../lib/lessons/types";

const width = 560;
const height = 340;
const leftCircle = { cx: 236, cy: 174, rx: 118, ry: 94 };
const rightCircle = { cx: 324, cy: 174, rx: 118, ry: 94 };

function displayValue(value: number | string | undefined) {
  return value === undefined ? null : String(value);
}

export function VennDiagramView({
  diagram,
  className,
}: {
  diagram: VennDiagram;
  className?: string;
}): React.ReactElement | null {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;

  if (
    typeof diagram.description !== "string" ||
    !diagram.description.trim() ||
    typeof diagram.setALabel !== "string" ||
    !diagram.setALabel.trim() ||
    typeof diagram.setBLabel !== "string" ||
    !diagram.setBLabel.trim()
  ) {
    return null;
  }

  const showCounts = diagram.showCounts ?? true;
  const aOnly = displayValue(diagram.aOnly);
  const intersection = displayValue(diagram.intersection);
  const bOnly = displayValue(diagram.bOnly);
  const neither = displayValue(diagram.neither);
  const total = displayValue(diagram.total);

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[390px] min-w-[380px]"
      >
        <title id={titleId}>Venn diagram</title>
        <desc id={descriptionId}>{diagram.description}</desc>

        <rect
          x={28}
          y={24}
          width={width - 56}
          height={height - 54}
          rx={16}
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth={2}
        />
        <ellipse
          cx={leftCircle.cx}
          cy={leftCircle.cy}
          rx={leftCircle.rx}
          ry={leftCircle.ry}
          fill="#bfdbfe"
          fillOpacity={0.62}
          stroke="#2563eb"
          strokeWidth={3}
        />
        <ellipse
          cx={rightCircle.cx}
          cy={rightCircle.cy}
          rx={rightCircle.rx}
          ry={rightCircle.ry}
          fill="#bbf7d0"
          fillOpacity={0.62}
          stroke="#16a34a"
          strokeWidth={3}
        />

        <text x={158} y={86} textAnchor="middle" className="fill-blue-800 text-base font-semibold">
          {diagram.setALabel}
        </text>
        <text x={402} y={86} textAnchor="middle" className="fill-green-800 text-base font-semibold">
          {diagram.setBLabel}
        </text>

        {showCounts && aOnly !== null && (
          <text x={190} y={180} textAnchor="middle" className="fill-slate-900 text-xl font-semibold">
            {aOnly}
          </text>
        )}
        {showCounts && intersection !== null && (
          <text x={280} y={180} textAnchor="middle" className="fill-slate-900 text-xl font-semibold">
            {intersection}
          </text>
        )}
        {showCounts && bOnly !== null && (
          <text x={370} y={180} textAnchor="middle" className="fill-slate-900 text-xl font-semibold">
            {bOnly}
          </text>
        )}
        {showCounts && neither !== null && (
          <>
            <text x={76} y={278} className="fill-slate-600 text-xs font-semibold">
              neither
            </text>
            <text x={76} y={299} className="fill-slate-900 text-lg font-semibold">
              {neither}
            </text>
          </>
        )}
        {showCounts && total !== null && (
          <text x={484} y={299} textAnchor="end" className="fill-slate-600 text-xs font-semibold">
            total: {total}
          </text>
        )}
      </svg>
    </div>
  );
}
