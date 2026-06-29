import type { TriangleDiagram } from "./types";

export type Year9TrigAngleVisual = {
  prompt: string;
  triangleDiagram: TriangleDiagram;
};

type Sides = {
  adjacent?: number;
  hypotenuse?: number;
  opposite?: number;
};

function angleFromSides(sides: Sides): number {
  if (sides.opposite !== undefined && sides.adjacent !== undefined) {
    return Math.atan(sides.opposite / sides.adjacent);
  }
  if (sides.opposite !== undefined && sides.hypotenuse !== undefined) {
    return Math.asin(sides.opposite / sides.hypotenuse);
  }
  if (sides.adjacent !== undefined && sides.hypotenuse !== undefined) {
    return Math.acos(sides.adjacent / sides.hypotenuse);
  }
  throw new Error("Two compatible side lengths are required.");
}

function visual(sides: Sides, context?: "ramp"): Year9TrigAngleVisual {
  const angle = angleFromSides(sides);
  const hypotenusePixels = 240;
  const sideLabels: TriangleDiagram["sideLabels"] = {};
  if (sides.adjacent !== undefined) sideLabels.AB = String(sides.adjacent);
  if (sides.opposite !== undefined) sideLabels.BC = String(sides.opposite);
  if (sides.hypotenuse !== undefined) sideLabels.AC = String(sides.hypotenuse);
  const labelledSides = [
    sides.opposite !== undefined ? `opposite side ${sides.opposite}` : "",
    sides.adjacent !== undefined ? `adjacent side ${sides.adjacent}` : "",
    sides.hypotenuse !== undefined ? `hypotenuse ${sides.hypotenuse}` : "",
  ].filter(Boolean).join(" and ");
  const contextText = context === "ramp"
    ? "The opposite side is the vertical rise and the hypotenuse is the ramp."
    : "";

  return {
    prompt: "Use the right-triangle diagram to find θ, rounded to 1 decimal place.",
    triangleDiagram: {
      description:
        `Right triangle with unknown angle theta, ${labelledSides}. ` + contextText,
      vertices: {
        A: { x: 70, y: 250 },
        B: {
          x: 70 + hypotenusePixels * Math.cos(angle),
          y: 250,
        },
        C: {
          x: 70 + hypotenusePixels * Math.cos(angle),
          y: 250 - hypotenusePixels * Math.sin(angle),
        },
      },
      vertexLabels: { A: "", B: "", C: "" },
      sideLabels,
      angleLabels: { A: "θ" },
      angleMarks: { A: 1 },
      rightAngleAt: "B",
      viewBox: "0 0 390 300",
    },
  };
}

export const year9TrigAngleVisuals: Record<string, Year9TrigAngleVisual> = {
  "y9-fua-p1": visual({ opposite: 5, adjacent: 12 }),
  "y9-fua-p2": visual({ opposite: 6, hypotenuse: 10 }),
  "y9-fua-p3": visual({ adjacent: 8, hypotenuse: 10 }),
  "y9-fua-p4": visual({ opposite: 8, adjacent: 15 }),
  "y9-fua-p5": visual({ opposite: 7, hypotenuse: 25 }),
  "y9-fua-p6": visual({ adjacent: 24, hypotenuse: 25 }),
  "y9-fua-p7": visual({ opposite: 10, adjacent: 5 }),
  "y9-fua-p8": visual({ opposite: 9, adjacent: 12 }),
  "y9-fua-p9": visual({ opposite: 1, hypotenuse: 4 }),
  "y9-fua-p10": visual({ opposite: 3, hypotenuse: 5 }, "ramp"),
  "y9c-fua-1": visual({ opposite: 11, adjacent: 60 }),
  "y9c-fua-2": visual({ opposite: 7, adjacent: 24 }),
  "y9c-fua-3": visual({ opposite: 20, hypotenuse: 29 }),
  "y9c-fua-4": visual({ adjacent: 9, hypotenuse: 41 }),
  "y9c-fua-5": visual({ opposite: 12, adjacent: 5 }),
  "y9c-fua-6": visual({ opposite: 28, adjacent: 45 }),
  "y9c-fua-7": visual({ opposite: 4, hypotenuse: 5 }),
  "y9c-fua-8": visual({ adjacent: 7, hypotenuse: 25 }),
  "y9c-fua-9": visual({ opposite: 33, adjacent: 56 }),
  "y9c-fua-10": visual({ opposite: 24, hypotenuse: 25 }),
  "y9c-fua-11": visual({ opposite: 1, adjacent: 2 }),
  "y9c-fua-12": visual({ opposite: 16, adjacent: 30 }),
};
