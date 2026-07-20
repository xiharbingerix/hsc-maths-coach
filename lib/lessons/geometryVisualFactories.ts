import type {
  LineAngleDiagram,
  PlaneShapeDiagram,
  TrianglePairDiagram,
} from "./types";

export function scaleLengthDiagram({
  description,
  label,
  startLabel = "A",
  endLabel = "B",
}: {
  description: string;
  label: string;
  startLabel?: string;
  endLabel?: string;
}): LineAngleDiagram {
  return {
    description,
    viewBox: "0 0 420 160",
    points: [
      { id: "A", x: 55, y: 80, label: startLabel },
      { id: "B", x: 365, y: 80, label: endLabel },
    ],
    segments: [{ from: "A", to: "B", label, highlighted: true }],
  };
}

export function scaleRectangleDiagram({
  description,
  width,
  height,
  widthLabel,
  heightLabel,
}: {
  description: string;
  width: number;
  height: number;
  widthLabel: string;
  heightLabel: string;
}): PlaneShapeDiagram {
  return {
    description,
    vertices: [
      { x: 0, y: 0, rightAngle: true },
      { x: width, y: 0, rightAngle: true },
      { x: width, y: height, rightAngle: true },
      { x: 0, y: height, rightAngle: true },
    ],
    edges: [{ label: widthLabel }, { label: heightLabel }, {}, {}],
  };
}

export function similarTrianglePairDiagram({
  description,
  smallSideLabel,
  largeSideLabel,
  relationLabel,
  leftCaption = "Original",
  rightCaption = "Image",
}: {
  description: string;
  smallSideLabel?: string;
  largeSideLabel?: string;
  relationLabel: string;
  leftCaption?: string;
  rightCaption?: string;
}): TrianglePairDiagram {
  return {
    description,
    leftCaption,
    rightCaption,
    relationLabel,
    left: {
      description: `${leftCaption} right triangle${smallSideLabel ? ` with a corresponding side labelled ${smallSideLabel}` : ""}.`,
      vertices: {
        A: { x: 55, y: 245 },
        B: { x: 330, y: 245 },
        C: { x: 55, y: 65 },
      },
      sideLabels: smallSideLabel ? { AB: smallSideLabel } : undefined,
      rightAngleAt: "A",
    },
    right: {
      description: `${rightCaption} right triangle${largeSideLabel ? ` with the matching side labelled ${largeSideLabel}` : ""}.`,
      vertices: {
        A: { x: 55, y: 245 },
        B: { x: 330, y: 245 },
        C: { x: 55, y: 65 },
      },
      sideLabels: largeSideLabel ? { AB: largeSideLabel } : undefined,
      rightAngleAt: "A",
    },
  };
}

export function trapezoidDiagram({
  description,
  bottom,
  top,
  height,
  bottomLabel = String(bottom),
  topLabel = String(top),
  heightLabel = String(height),
  angleLabels,
  rightTrapezoid = true,
}: {
  description: string;
  bottom: number;
  top: number;
  height: number;
  bottomLabel?: string;
  topLabel?: string;
  heightLabel?: string;
  angleLabels?: [string, string, string, string];
  rightTrapezoid?: boolean;
}): PlaneShapeDiagram {
  const inset = rightTrapezoid ? 0 : Math.max(0.8, (bottom - top) / 2);
  return {
    description,
    vertices: [
      { x: 0, y: 0, label: "A", angleLabel: angleLabels?.[0], rightAngle: rightTrapezoid },
      { x: bottom, y: 0, label: "B", angleLabel: angleLabels?.[1] },
      { x: inset + top, y: height, label: "C", angleLabel: angleLabels?.[2] },
      { x: inset, y: height, label: "D", angleLabel: angleLabels?.[3], rightAngle: rightTrapezoid },
    ],
    edges: [
      { label: bottomLabel, arrows: 1 },
      {},
      { label: topLabel, arrows: 1 },
      { label: heightLabel },
    ],
    fill: "blue",
    showVertexDots: true,
  };
}
