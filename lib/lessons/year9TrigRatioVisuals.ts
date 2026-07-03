import type { TriangleDiagram, TriangleSideKey } from "./types";

// Diagrams for the Year 9 introducing-trigonometric-ratios questions. The whole
// skill in this lesson is identifying opposite/adjacent/hypotenuse relative to θ
// and forming the ratio — so naming the sides in the prompt ("Opposite 6,
// hypotenuse 10") does the identification step for the student. These visuals
// move the given side lengths onto a labelled right triangle and reword the
// prompt so the student must read the sides off the figure themselves.
//
// Diagram-selection rule (matches the sweep convention used across Y9 trig):
// only questions that state SIDE LENGTHS get a diagram. Questions whose given
// is a ratio value (sin θ = 0.5) or a special-angle recall stay worded —
// constructing the triangle from a ratio is the skill being tested there, and
// a diagram would do that setup for the student.

export type Year9TrigRatioVisual = {
  prompt: string;
  triangleDiagram: TriangleDiagram;
};

type Sides = {
  adjacent?: number;
  hypotenuse?: number;
  opposite?: number;
};

const sideKey: Record<keyof Sides, TriangleSideKey> = {
  adjacent: "AB",
  opposite: "BC",
  hypotenuse: "AC",
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

function visual(
  ratio: "sin" | "cos" | "tan",
  sides: Sides,
  opts: { dp?: number } = {}
): Year9TrigRatioVisual {
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
  ]
    .filter(Boolean)
    .join(", ");
  const rounding = opts.dp ? ` (${opts.dp} d.p.)` : "";

  return {
    prompt: `Use the right-triangle diagram to find ${ratio} θ${rounding}.`,
    triangleDiagram: {
      description:
        `Right triangle with the angle theta marked at one vertex and labelled sides: ${labelledSides}. ` +
        `Relative to theta these are the sides used to form the ${ratio} ratio or reach it via Pythagoras.`,
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

export const year9TrigRatioVisuals: Record<string, Year9TrigRatioVisual> = {
  // introducing-trigonometric-ratios — guided
  "y9-trr-g1": visual("sin", { opposite: 6, hypotenuse: 10 }),
  "y9-trr-g2": visual("cos", { adjacent: 8, hypotenuse: 10 }),
  "y9-trr-g3": visual("tan", { opposite: 5, adjacent: 12 }, { dp: 2 }),
  // independent
  "y9-trr-i1": visual("sin", { opposite: 8, hypotenuse: 17 }, { dp: 2 }),
  "y9-trr-i2": visual("cos", { adjacent: 15, hypotenuse: 17 }, { dp: 2 }),
  "y9-trr-i3": visual("tan", { opposite: 24, adjacent: 7 }, { dp: 2 }),
  "y9-trr-i5": visual("sin", { opposite: 7, hypotenuse: 25 }),
  // mastery
  "y9-trr-m1": visual("sin", { opposite: 3, hypotenuse: 5 }),
  "y9-trr-m2": visual("cos", { adjacent: 4, hypotenuse: 5 }),
  "y9-trr-m3": visual("tan", { opposite: 3, adjacent: 4 }),
  "y9-trr-m5": visual("sin", { opposite: 12, hypotenuse: 13 }, { dp: 2 }),
  "y9-trr-m6": visual("cos", { adjacent: 5, hypotenuse: 13 }, { dp: 2 }),
  "y9-trr-m7": visual("tan", { opposite: 8, adjacent: 15 }, { dp: 2 }),
  "y9-trr-m9": visual("sin", { opposite: 9, hypotenuse: 15 }),
  // mastery pool — only the side-given items; ratio-given and special-angle
  // items stay worded (see the selection rule above).
  "y9-trr-p4": visual("sin", { opposite: 8, adjacent: 6 }),
  "y9-trr-p7": visual("cos", { opposite: 5, adjacent: 12 }, { dp: 2 }),
  "y9-trr-p10": visual("cos", { opposite: 24, hypotenuse: 25 }),
  // challenge (lib/challenges/year9Chapter3.ts) — Pythagorean-triple triangles
  // with every stated side labelled; picking the two relevant sides off the
  // figure is the identification work the question is testing.
  "y9c-trr-1": visual("sin", { opposite: 5, adjacent: 12, hypotenuse: 13 }, { dp: 2 }),
  "y9c-trr-2": visual("cos", { opposite: 7, adjacent: 24, hypotenuse: 25 }),
  "y9c-trr-4": visual("cos", { opposite: 20, adjacent: 21, hypotenuse: 29 }, { dp: 2 }),
  "y9c-trr-5": visual("tan", { opposite: 8, adjacent: 15 }, { dp: 2 }),
  "y9c-trr-7": visual("tan", { opposite: 4, adjacent: 3, hypotenuse: 5 }, { dp: 2 }),
  "y9c-trr-8": visual("sin", { opposite: 9, adjacent: 40, hypotenuse: 41 }, { dp: 2 }),
  "y9c-trr-10": visual("cos", { opposite: 24, hypotenuse: 25 }),
  "y9c-trr-11": visual("tan", { opposite: 12, adjacent: 5, hypotenuse: 13 }),
};
