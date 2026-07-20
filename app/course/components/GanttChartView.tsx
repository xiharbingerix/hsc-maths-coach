"use client";

import * as React from "react";
import type { GanttChartDiagram } from "../../../lib/lessons/types";

const width = 620;
const left = 130;
const right = 24;
const top = 36;
const rowHeight = 42;

export function GanttChartView({
  diagram,
  className,
}: {
  diagram: GanttChartDiagram;
  className?: string;
}): React.ReactElement | null {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const activities = Array.isArray(diagram.activities) ? diagram.activities : [];
  const valid = activities.length > 0 && activities.every(
    (activity) =>
      typeof activity.label === "string" &&
      activity.label.trim().length > 0 &&
      Number.isFinite(activity.start) &&
      Number.isFinite(activity.duration) &&
      activity.duration > 0 &&
      (activity.float === undefined || (Number.isFinite(activity.float) && activity.float >= 0))
  );
  if (typeof diagram.description !== "string" || !diagram.description.trim() || !valid) return null;

  const dataMin = Math.min(...activities.map((activity) => activity.start));
  const dataMax = Math.max(
    ...activities.map((activity) => activity.start + activity.duration + (activity.float ?? 0))
  );
  const timeMin = diagram.timeMin ?? Math.min(0, dataMin);
  const timeMax = diagram.timeMax ?? dataMax;
  const step = diagram.timeStep && diagram.timeStep > 0 ? diagram.timeStep : 1;
  if (timeMax <= timeMin) return null;

  const plotWidth = width - left - right;
  const height = top + activities.length * rowHeight + 42;
  const x = (value: number) => left + ((value - timeMin) / (timeMax - timeMin)) * plotWidth;
  const ticks: number[] = [];
  for (let value = timeMin; value <= timeMax + step / 100; value += step) ticks.push(value);

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="min-w-[520px]"
      >
        <title id={titleId}>{diagram.description}</title>
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={x(tick)} y1={top - 8} x2={x(tick)} y2={height - 34} stroke="#e2e8f0" />
            <text x={x(tick)} y={height - 14} textAnchor="middle" className="fill-slate-600 text-xs">
              {tick}
            </text>
          </g>
        ))}
        {activities.map((activity, index) => {
          const y = top + index * rowHeight;
          const end = activity.start + activity.duration;
          return (
            <g key={`${activity.label}-${index}`}>
              <text x={left - 10} y={y + 12} textAnchor="end" className="fill-slate-800 text-xs font-semibold">
                {activity.label}
              </text>
              {activity.resource && (
                <text x={left - 10} y={y + 27} textAnchor="end" className="fill-slate-500 text-[10px]">
                  {activity.resource}
                </text>
              )}
              <rect
                x={x(activity.start)}
                y={y}
                width={Math.max(x(end) - x(activity.start), 2)}
                height={22}
                rx={3}
                fill={activity.critical ? "#dc2626" : "#2563eb"}
              />
              {(activity.float ?? 0) > 0 && (
                <line
                  x1={x(end)}
                  y1={y + 11}
                  x2={x(end + (activity.float ?? 0))}
                  y2={y + 11}
                  stroke="#d97706"
                  strokeWidth={4}
                  strokeDasharray="6 4"
                />
              )}
            </g>
          );
        })}
        <text x={left + plotWidth / 2} y={height - 1} textAnchor="middle" className="fill-slate-800 text-xs font-semibold">
          Time{diagram.timeUnit ? ` (${diagram.timeUnit})` : ""}
        </text>
      </svg>
    </div>
  );
}
