import type { TriangleDiagram, TriangleSideKey } from "./types";

export type Year9TrigSideVisual = {
  prompt: string;
  triangleDiagram: TriangleDiagram;
};

type KnownSide = "adjacent" | "hypotenuse";
type UnknownSide = "adjacent" | "opposite";

type VisualOptions = {
  theta: number;
  knownSide: KnownSide;
  knownValue: number;
  unknownSide: UnknownSide;
  unit?: string;
  context?: "ramp";
};

const sideKey: Record<KnownSide | UnknownSide, TriangleSideKey> = {
  adjacent: "AB",
  opposite: "BC",
  hypotenuse: "AC",
};

function visual(options: VisualOptions): Year9TrigSideVisual {
  const { theta, knownSide, knownValue, unknownSide, unit = "", context } = options;
  const radians = (theta * Math.PI) / 180;
  const hypotenusePixels = 240;
  const suffix = unit ? ` ${unit}` : "";
  const knownLabel = `${knownValue}${suffix}`;
  const sideLabels: Partial<Record<TriangleSideKey, string>> = {
    [sideKey[knownSide]]: knownLabel,
    [sideKey[unknownSide]]: `x${suffix}`,
  };
  const knownName = knownSide === "hypotenuse" ? "hypotenuse" : "adjacent side";
  const unknownName = unknownSide === "opposite" ? "opposite side" : "adjacent side";
  const contextText = context === "ramp" ? "The hypotenuse represents the ramp." : "";

  return {
    prompt: `Use the right-triangle diagram to find x${suffix}. Round as indicated if necessary.`,
    triangleDiagram: {
      description:
        `Right triangle with angle theta equal to ${theta} degrees, ${knownName} ` +
        `${knownLabel}, and unknown ${unknownName} x${suffix}. ${contextText}`.trim(),
      vertices: {
        A: { x: 70, y: 250 },
        B: {
          x: 70 + hypotenusePixels * Math.cos(radians),
          y: 250,
        },
        C: {
          x: 70 + hypotenusePixels * Math.cos(radians),
          y: 250 - hypotenusePixels * Math.sin(radians),
        },
      },
      vertexLabels: { A: "", B: "", C: "" },
      sideLabels,
      angleLabels: { A: `${theta}°` },
      rightAngleAt: "B",
      highlightedSides: [sideKey[unknownSide]],
      viewBox: "0 0 390 300",
    },
  };
}

export const year9TrigSideVisuals: Record<string, Year9TrigSideVisual> = {
  "y9-fus-p1": visual({ theta: 60, knownSide: "hypotenuse", knownValue: 10, unknownSide: "opposite" }),
  "y9-fus-p2": visual({ theta: 30, knownSide: "hypotenuse", knownValue: 20, unknownSide: "adjacent" }),
  "y9-fus-p3": visual({ theta: 45, knownSide: "hypotenuse", knownValue: 10, unknownSide: "opposite" }),
  "y9-fus-p4": visual({ theta: 30, knownSide: "adjacent", knownValue: 6, unknownSide: "opposite" }),
  "y9-fus-p5": visual({ theta: 60, knownSide: "adjacent", knownValue: 5, unknownSide: "opposite" }),
  "y9-fus-p6": visual({ theta: 45, knownSide: "hypotenuse", knownValue: 16, unknownSide: "adjacent" }),
  "y9-fus-p7": visual({ theta: 30, knownSide: "hypotenuse", knownValue: 25, unknownSide: "opposite" }),
  "y9-fus-p8": visual({ theta: 30, knownSide: "hypotenuse", knownValue: 12, unknownSide: "adjacent" }),
  "y9-fus-p9": visual({ theta: 60, knownSide: "hypotenuse", knownValue: 18, unknownSide: "opposite" }),
  "y9-fus-p10": visual({ theta: 30, knownSide: "hypotenuse", knownValue: 10, unknownSide: "opposite", unit: "m", context: "ramp" }),
  "y9c-fus-1": visual({ theta: 60, knownSide: "hypotenuse", knownValue: 30, unknownSide: "opposite" }),
  "y9c-fus-2": visual({ theta: 30, knownSide: "hypotenuse", knownValue: 24, unknownSide: "opposite" }),
  "y9c-fus-3": visual({ theta: 30, knownSide: "adjacent", knownValue: 10, unknownSide: "opposite" }),
  "y9c-fus-4": visual({ theta: 45, knownSide: "hypotenuse", knownValue: 50, unknownSide: "opposite" }),
  "y9c-fus-5": visual({ theta: 60, knownSide: "adjacent", knownValue: 8, unknownSide: "opposite" }),
  "y9c-fus-6": visual({ theta: 60, knownSide: "hypotenuse", knownValue: 18, unknownSide: "adjacent" }),
  "y9c-fus-7": visual({ theta: 30, knownSide: "hypotenuse", knownValue: 40, unknownSide: "adjacent" }),
  "y9c-fus-8": visual({ theta: 45, knownSide: "adjacent", knownValue: 12, unknownSide: "opposite" }),
  "y9c-fus-9": visual({ theta: 60, knownSide: "hypotenuse", knownValue: 100, unknownSide: "opposite" }),
  "y9c-fus-10": visual({ theta: 30, knownSide: "hypotenuse", knownValue: 14, unknownSide: "opposite" }),
  "y9c-fus-11": visual({ theta: 30, knownSide: "adjacent", knownValue: 15, unknownSide: "opposite" }),
  "y9c-fus-12": visual({ theta: 60, knownSide: "hypotenuse", knownValue: 22, unknownSide: "adjacent" }),
};
