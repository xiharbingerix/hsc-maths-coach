import type { TriangleDiagram, TriangleSideKey } from "./types";

export type Year9TrigApplicationVisual = {
  prompt: string;
  triangleDiagram: TriangleDiagram;
};

type Side = "adjacent" | "hypotenuse" | "opposite";
type Context = "building" | "cliff" | "flagpole" | "hill" | "kite" | "ladder" | "plane" | "pole" | "ramp" | "road" | "slide" | "tower" | "tree" | "wire";

type SideQuestion = {
  angle: number;
  context: Context;
  knownSide: Side;
  knownValue: number;
  unknownSide: Side;
};

type AngleQuestion = {
  context: Context;
  firstSide: Side;
  firstValue: number;
  secondSide: Side;
  secondValue: number;
};

const sideKey: Record<Side, TriangleSideKey> = {
  adjacent: "AB",
  hypotenuse: "AC",
  opposite: "BC",
};

function contextDescription(context: Context): string {
  const descriptions: Record<Context, string> = {
    building: "The vertical side is the building and the horizontal side is the ground distance.",
    cliff: "The vertical side is the cliff and the horizontal side is the distance to the boat.",
    flagpole: "The vertical side is the flagpole and the horizontal side is its shadow.",
    hill: "The vertical side is the rise and the horizontal side is the run of the hill.",
    kite: "The vertical side is the kite's height and the hypotenuse is the string.",
    ladder: "The vertical side is the wall and the hypotenuse is the ladder.",
    plane: "The vertical side is altitude and the horizontal side is ground distance.",
    pole: "The vertical side is the pole and the hypotenuse is the supporting line.",
    ramp: "The vertical side is the rise and the hypotenuse is the ramp.",
    road: "The vertical side is height gained and the hypotenuse is road distance.",
    slide: "The vertical side is the height and the hypotenuse is the slide.",
    tower: "The vertical side is the tower and the horizontal side is observer distance.",
    tree: "The vertical side is the tree and the horizontal side is observer distance.",
    wire: "The vertical side is the pole and the hypotenuse is the wire.",
  };
  return descriptions[context];
}

function triangle(
  angle: number,
  sideLabels: TriangleDiagram["sideLabels"],
  angleLabel: string,
  description: string,
  highlightedSides: TriangleSideKey[] = []
): TriangleDiagram {
  const radians = (angle * Math.PI) / 180;
  const hypotenusePixels = 240;
  return {
    description,
    vertices: {
      A: { x: 70, y: 250 },
      B: { x: 70 + hypotenusePixels * Math.cos(radians), y: 250 },
      C: {
        x: 70 + hypotenusePixels * Math.cos(radians),
        y: 250 - hypotenusePixels * Math.sin(radians),
      },
    },
    vertexLabels: { A: "", B: "", C: "" },
    sideLabels,
    angleLabels: { A: angleLabel },
    angleMarks: { A: 1 },
    rightAngleAt: "B",
    highlightedSides,
    viewBox: "0 0 390 300",
  };
}

function sideVisual(options: SideQuestion): Year9TrigApplicationVisual {
  const { angle, context, knownSide, knownValue, unknownSide } = options;
  const labels: TriangleDiagram["sideLabels"] = {
    [sideKey[knownSide]]: `${knownValue} m`,
    [sideKey[unknownSide]]: "x m",
  };
  return {
    prompt: "Use the labelled diagram to find x in metres, rounded to 1 decimal place if necessary.",
    triangleDiagram: triangle(
      angle,
      labels,
      `${angle}°`,
      `${contextDescription(context)} The known ${knownSide} is ${knownValue} metres and the unknown ${unknownSide} is x.`,
      [sideKey[unknownSide]]
    ),
  };
}

function angleVisual(options: AngleQuestion): Year9TrigApplicationVisual {
  const { context, firstSide, firstValue, secondSide, secondValue } = options;
  const values: Partial<Record<Side, number>> = {
    [firstSide]: firstValue,
    [secondSide]: secondValue,
  };
  const angle = values.opposite !== undefined && values.adjacent !== undefined
    ? Math.atan(values.opposite / values.adjacent)
    : values.opposite !== undefined
      ? Math.asin(values.opposite / values.hypotenuse!)
      : Math.acos(values.adjacent! / values.hypotenuse!);
  const labels: TriangleDiagram["sideLabels"] = {
    [sideKey[firstSide]]: `${firstValue} m`,
    [sideKey[secondSide]]: `${secondValue} m`,
  };
  return {
    prompt: "Use the labelled diagram to find θ, rounded to 1 decimal place.",
    triangleDiagram: triangle(
      (angle * 180) / Math.PI,
      labels,
      "θ",
      `${contextDescription(context)} The labelled sides are ${firstValue} metres and ${secondValue} metres; angle theta is unknown.`
    ),
  };
}

export const year9TrigApplicationVisuals: Record<string, Year9TrigApplicationVisual> = {
  "y9-tap-p1": angleVisual({ context: "building", firstSide: "opposite", firstValue: 30, secondSide: "adjacent", secondValue: 40 }),
  "y9-tap-p2": sideVisual({ angle: 60, context: "wire", knownSide: "hypotenuse", knownValue: 15, unknownSide: "opposite" }),
  "y9-tap-p3": sideVisual({ angle: 30, context: "cliff", knownSide: "opposite", knownValue: 50, unknownSide: "adjacent" }),
  "y9-tap-p4": sideVisual({ angle: 40, context: "kite", knownSide: "hypotenuse", knownValue: 50, unknownSide: "opposite" }),
  "y9-tap-p5": angleVisual({ context: "ladder", firstSide: "opposite", firstValue: 24, secondSide: "hypotenuse", secondValue: 25 }),
  "y9-tap-p6": sideVisual({ angle: 30, context: "tower", knownSide: "adjacent", knownValue: 100, unknownSide: "opposite" }),
  "y9-tap-p7": sideVisual({ angle: 5, context: "road", knownSide: "hypotenuse", knownValue: 2000, unknownSide: "opposite" }),
  "y9-tap-p8": angleVisual({ context: "ladder", firstSide: "adjacent", firstValue: 5, secondSide: "hypotenuse", secondValue: 12 }),
  "y9-tap-p9": sideVisual({ angle: 35, context: "tree", knownSide: "opposite", knownValue: 20, unknownSide: "adjacent" }),
  "y9-tap-p10": sideVisual({ angle: 3, context: "plane", knownSide: "hypotenuse", knownValue: 5000, unknownSide: "opposite" }),
  "y9c-tap-1": angleVisual({ context: "building", firstSide: "opposite", firstValue: 40, secondSide: "adjacent", secondValue: 30 }),
  "y9c-tap-2": sideVisual({ angle: 20, context: "ramp", knownSide: "hypotenuse", knownValue: 30, unknownSide: "opposite" }),
  "y9c-tap-3": sideVisual({ angle: 25, context: "cliff", knownSide: "opposite", knownValue: 80, unknownSide: "adjacent" }),
  "y9c-tap-4": sideVisual({ angle: 70, context: "ladder", knownSide: "hypotenuse", knownValue: 6, unknownSide: "opposite" }),
  "y9c-tap-5": sideVisual({ angle: 55, context: "tree", knownSide: "adjacent", knownValue: 14, unknownSide: "opposite" }),
  "y9c-tap-6": angleVisual({ context: "plane", firstSide: "opposite", firstValue: 1000, secondSide: "adjacent", secondValue: 4000 }),
  "y9c-tap-7": angleVisual({ context: "flagpole", firstSide: "opposite", firstValue: 12, secondSide: "adjacent", secondValue: 5 }),
  "y9c-tap-8": sideVisual({ angle: 40, context: "slide", knownSide: "hypotenuse", knownValue: 5, unknownSide: "opposite" }),
  "y9c-tap-9": sideVisual({ angle: 50, context: "wire", knownSide: "opposite", knownValue: 20, unknownSide: "hypotenuse" }),
  "y9c-tap-10": angleVisual({ context: "hill", firstSide: "opposite", firstValue: 100, secondSide: "adjacent", secondValue: 500 }),
  "y9c-tap-11": sideVisual({ angle: 30, context: "tower", knownSide: "opposite", knownValue: 45, unknownSide: "adjacent" }),
  "y9c-tap-12": angleVisual({ context: "ramp", firstSide: "opposite", firstValue: 2, secondSide: "hypotenuse", secondValue: 10 }),
};
