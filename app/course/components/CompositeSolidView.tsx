"use client";

import * as React from "react";
import type {
  CompositeSolidDiagram,
  StatChartColor,
} from "../../../lib/lessons/types";

const colorHex: Record<StatChartColor, string> = {
  blue: "#2563eb",
  teal: "#0d9488",
  violet: "#7c3aed",
  amber: "#d97706",
  green: "#059669",
  red: "#dc2626",
};

const EDGE = "#334155";
const HIDDEN = "#94a3b8";
const VOID = "#d97706";
const W = 320;
const H = 250;

type Point = { x: number; y: number };

function points(values: Point[]): string {
  return values.map((point) => `${point.x},${point.y}`).join(" ");
}

function shifted(point: Point, dx: number, dy: number): Point {
  return { x: point.x + dx, y: point.y + dy };
}

function ellipseArc(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  start: number,
  end: number
): string {
  const steps = 24;
  return Array.from({ length: steps + 1 }, (_, index) => {
    const angle = ((start + ((end - start) * index) / steps) * Math.PI) / 180;
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);
    return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}

export function CompositeSolidView({
  diagram,
  className,
}: {
  diagram: CompositeSolidDiagram;
  className?: string;
}): React.ReactElement {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const stroke = colorHex[diagram.color ?? "blue"];
  const unit = diagram.unit;
  const face = { fill: stroke, fillOpacity: 0.12 };
  const edge = {
    fill: "none",
    stroke: EDGE,
    strokeWidth: 2.2,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  const hidden = {
    fill: "none",
    stroke: HIDDEN,
    strokeWidth: 1.5,
    strokeDasharray: "5 4",
  };
  const halo = { stroke: "#ffffff", strokeWidth: 4, paintOrder: "stroke" as const };

  function label(
    x: number,
    y: number,
    text: string,
    anchor: "start" | "middle" | "end" = "middle",
    accent = false
  ) {
    return (
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        dominantBaseline="central"
        className={accent ? "fill-amber-700 text-xs font-semibold" : "fill-slate-800 text-xs font-semibold"}
        {...halo}
      >
        {text}
      </text>
    );
  }

  function dimension(value: number): string {
    return `${value} ${unit}`;
  }

  const body = (() => {
    switch (diagram.kind) {
      case "stackedRectangularPrisms": {
        const dx = 42;
        const dy = -25;
        const lowerFront = {
          a: { x: 38, y: 145 },
          b: { x: 232, y: 145 },
          c: { x: 232, y: 205 },
          d: { x: 38, y: 205 },
        };
        const upperWidth = 112;
        const upperX = diagram.placement === "centred" ? 79 : 38;
        const upperFront = {
          a: { x: upperX, y: 93 },
          b: { x: upperX + upperWidth, y: 93 },
          c: { x: upperX + upperWidth, y: 145 },
          d: { x: upperX, y: 145 },
        };
        const back = (point: Point) => shifted(point, dx, dy);

        return (
          <>
            <polygon points={points(Object.values(lowerFront))} {...face} />
            <polygon points={points([lowerFront.a, lowerFront.b, back(lowerFront.b), back(lowerFront.a)])} {...face} />
            <polygon points={points([lowerFront.b, lowerFront.c, back(lowerFront.c), back(lowerFront.b)])} {...face} />
            <path
              d={`M ${back(lowerFront.a).x} ${back(lowerFront.a).y} L ${back(lowerFront.d).x} ${back(lowerFront.d).y} L ${back(lowerFront.c).x} ${back(lowerFront.c).y}`}
              {...hidden}
            />
            <polygon points={points(Object.values(lowerFront))} {...edge} />
            <path
              d={`M ${lowerFront.a.x} ${lowerFront.a.y} L ${back(lowerFront.a).x} ${back(lowerFront.a).y} L ${back(lowerFront.b).x} ${back(lowerFront.b).y} L ${lowerFront.b.x} ${lowerFront.b.y}`}
              {...edge}
            />
            <path
              d={`M ${back(lowerFront.b).x} ${back(lowerFront.b).y} L ${back(lowerFront.c).x} ${back(lowerFront.c).y} L ${lowerFront.c.x} ${lowerFront.c.y}`}
              {...edge}
            />

            <polygon points={points(Object.values(upperFront))} {...face} />
            <polygon points={points([upperFront.a, upperFront.b, back(upperFront.b), back(upperFront.a)])} {...face} />
            <polygon points={points([upperFront.b, upperFront.c, back(upperFront.c), back(upperFront.b)])} {...face} />
            <path
              d={`M ${back(upperFront.a).x} ${back(upperFront.a).y} L ${back(upperFront.d).x} ${back(upperFront.d).y}`}
              {...hidden}
            />
            <polygon points={points(Object.values(upperFront))} {...edge} />
            <path
              d={`M ${upperFront.a.x} ${upperFront.a.y} L ${back(upperFront.a).x} ${back(upperFront.a).y} L ${back(upperFront.b).x} ${back(upperFront.b).y} L ${upperFront.b.x} ${upperFront.b.y}`}
              {...edge}
            />
            <path
              d={`M ${back(upperFront.b).x} ${back(upperFront.b).y} L ${back(upperFront.c).x} ${back(upperFront.c).y} L ${upperFront.c.x} ${upperFront.c.y}`}
              {...edge}
            />

            {label(135, 226, dimension(diagram.lower.length))}
            {label(25, 176, dimension(diagram.lower.height), "end")}
            {label(259, 125, dimension(diagram.lower.width), "start")}
            {label(upperX + upperWidth / 2, 82, dimension(diagram.upper.length))}
            {label(upperX + upperWidth + 11, 119, dimension(diagram.upper.height), "start")}
            {label(upperX + upperWidth + 28, 72, dimension(diagram.upper.width), "start")}
          </>
        );
      }

      case "housePrism": {
        const dx = 42;
        const dy = -24;
        const front = [
          { x: 48, y: 205 },
          { x: 225, y: 205 },
          { x: 225, y: 132 },
          { x: 136.5, y: 58 },
          { x: 48, y: 132 },
        ];
        const back = front.map((point) => shifted(point, dx, dy));
        const roofFoot = { x: 136.5, y: 132 };

        return (
          <>
            <polygon points={points(front)} {...face} />
            <polygon points={points([front[2], front[3], back[3], back[2]])} {...face} />
            <polygon points={points([front[1], front[2], back[2], back[1]])} {...face} />
            <path d={`M ${back[0].x} ${back[0].y} L ${back[4].x} ${back[4].y} L ${back[3].x} ${back[3].y}`} {...hidden} />
            <path d={`M ${back[0].x} ${back[0].y} L ${back[1].x} ${back[1].y}`} {...hidden} />
            <polygon points={points(front)} {...edge} />
            <path d={`M ${front[1].x} ${front[1].y} L ${back[1].x} ${back[1].y} L ${back[2].x} ${back[2].y} L ${front[2].x} ${front[2].y}`} {...edge} />
            <path d={`M ${front[2].x} ${front[2].y} L ${back[2].x} ${back[2].y} L ${back[3].x} ${back[3].y} L ${front[3].x} ${front[3].y}`} {...edge} />
            <line x1={front[3].x} y1={front[3].y} x2={roofFoot.x} y2={roofFoot.y} {...hidden} />
            <path d={`M ${roofFoot.x} ${roofFoot.y - 9} h 9 v 9`} {...hidden} strokeDasharray="none" />

            {label(136, 226, dimension(diagram.roof.crossSectionBase))}
            {label(35, 168, dimension(diagram.base.height), "end")}
            {label(127, 96, dimension(diagram.roof.crossSectionHeight), "end")}
            {label(254, 194, dimension(diagram.roof.length), "start")}
            {diagram.roof.slant
              ? label(190, 88, dimension(diagram.roof.slant), "start")
              : null}
          </>
        );
      }

      case "rectangularPrismWithVoid": {
        const dx = 42;
        const dy = -25;
        const a = { x: 42, y: 76 };
        const b = { x: 230, y: 76 };
        const c = { x: 230, y: 205 };
        const d = { x: 42, y: 205 };
        const a2 = shifted(a, dx, dy);
        const b2 = shifted(b, dx, dy);
        const c2 = shifted(c, dx, dy);
        const d2 = shifted(d, dx, dy);
        const voidText = `${diagram.void.length} x ${diagram.void.width} x ${diagram.void.height} ${unit}`;

        if (diagram.voidStyle === "throughHole") {
          const hole = { x: 112, y: 112, width: 58, height: 48 };
          return (
            <>
              <polygon points={points([a, b, c, d])} {...face} />
              <polygon points={points([a, b, b2, a2])} {...face} />
              <polygon points={points([b, c, c2, b2])} {...face} />
              <path d={`M ${a2.x} ${a2.y} L ${d2.x} ${d2.y} L ${c2.x} ${c2.y}`} {...hidden} />
              <polygon points={points([a, b, c, d])} {...edge} />
              <path d={`M ${a.x} ${a.y} L ${a2.x} ${a2.y} L ${b2.x} ${b2.y} L ${b.x} ${b.y}`} {...edge} />
              <path d={`M ${b2.x} ${b2.y} L ${c2.x} ${c2.y} L ${c.x} ${c.y}`} {...edge} />
              <rect x={hole.x} y={hole.y} width={hole.width} height={hole.height} fill="white" stroke={VOID} strokeWidth={2.2} />
              <path d={`M ${hole.x} ${hole.y} l ${dx} ${dy} h ${hole.width} v ${hole.height} l ${-dx} ${-dy}`} fill="none" stroke={VOID} strokeWidth={1.6} strokeDasharray="5 4" />
              {label(136, 226, dimension(diagram.outer.length))}
              {label(29, 140, dimension(diagram.outer.height), "end")}
              {label(251, 65, dimension(diagram.outer.width), "start")}
              {label(141, 178, `hole ${voidText}`, "middle", true)}
            </>
          );
        }

        const notch = [
          { x: 165, y: 76 },
          { x: 165, y: 126 },
          { x: 230, y: 126 },
        ];
        return (
          <>
            <polygon points={points([a, notch[0], notch[1], notch[2], c, d])} {...face} />
            <polygon points={points([a, notch[0], shifted(notch[0], dx, dy), a2])} {...face} />
            <polygon points={points([notch[1], notch[2], shifted(notch[2], dx, dy), shifted(notch[1], dx, dy)])} {...face} />
            <polygon points={points([notch[2], c, c2, shifted(notch[2], dx, dy)])} {...face} />
            <path d={`M ${a2.x} ${a2.y} L ${d2.x} ${d2.y} L ${c2.x} ${c2.y}`} {...hidden} />
            <path d={`M ${shifted(notch[0], dx, dy).x} ${shifted(notch[0], dx, dy).y} V ${shifted(notch[1], dx, dy).y} H ${shifted(notch[2], dx, dy).x}`} fill="none" stroke={VOID} strokeWidth={1.8} strokeDasharray="5 4" />
            <polygon points={points([a, notch[0], notch[1], notch[2], c, d])} {...edge} />
            <path d={`M ${a.x} ${a.y} L ${a2.x} ${a2.y} L ${shifted(notch[0], dx, dy).x} ${shifted(notch[0], dx, dy).y} L ${notch[0].x} ${notch[0].y}`} {...edge} />
            <path d={`M ${notch[2].x} ${notch[2].y} L ${shifted(notch[2], dx, dy).x} ${shifted(notch[2], dx, dy).y} L ${c2.x} ${c2.y} L ${c.x} ${c.y}`} {...edge} />
            {label(136, 226, dimension(diagram.outer.length))}
            {label(29, 140, dimension(diagram.outer.height), "end")}
            {label(253, 65, dimension(diagram.outer.width), "start")}
            {label(193, 113, `removed ${voidText}`, "middle", true)}
          </>
        );
      }

      case "hollowCylinder": {
        const frontX = 66;
        const backX = 250;
        const cy = 132;
        const outerRx = 20;
        const outerRy = 62;
        const innerRx = 10;
        const innerRy = 31;

        return (
          <>
            <path d={`M ${frontX} ${cy - outerRy} H ${backX} V ${cy + outerRy} H ${frontX} Z`} {...face} />
            <ellipse cx={backX} cy={cy} rx={outerRx} ry={outerRy} {...face} />
            <path d={ellipseArc(backX, cy, outerRx, outerRy, 90, 270)} {...hidden} />
            <path d={ellipseArc(backX, cy, outerRx, outerRy, -90, 90)} {...edge} />
            <line x1={frontX} y1={cy - outerRy} x2={backX} y2={cy - outerRy} {...edge} />
            <line x1={frontX} y1={cy + outerRy} x2={backX} y2={cy + outerRy} {...edge} />
            <ellipse cx={frontX} cy={cy} rx={outerRx} ry={outerRy} fill={stroke} fillOpacity={0.18} stroke={EDGE} strokeWidth={2.2} />
            <ellipse cx={frontX} cy={cy} rx={innerRx} ry={innerRy} fill="white" stroke={VOID} strokeWidth={2.2} />
            <line x1={frontX} y1={cy} x2={frontX} y2={cy - outerRy} stroke={EDGE} strokeWidth={1.5} />
            <line x1={frontX} y1={cy} x2={frontX} y2={cy - innerRy} stroke={VOID} strokeWidth={1.5} />
            {label((frontX + backX) / 2, 53, dimension(diagram.length))}
            {label(51, 87, `R = ${dimension(diagram.outerRadius)}`, "end")}
            {label(51, 116, `r = ${dimension(diagram.innerRadius)}`, "end", true)}
          </>
        );
      }
    }
  })();

  return (
    <div className={`my-3 overflow-x-auto ${className ?? ""}`}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-h-[280px] min-w-[300px]"
      >
        <title id={titleId}>{diagram.description}</title>
        {body}
      </svg>
    </div>
  );
}
