import type { PlaneShapeDiagram } from "./types";

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
