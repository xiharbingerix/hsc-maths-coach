import type { CompositeSolidDiagram } from "../types";
import type { CompositeSolidQuestionVisual } from "./compositeSolidVisuals";

function visual(
  prompt: string,
  compositeSolidDiagram: CompositeSolidDiagram
): CompositeSolidQuestionVisual {
  return { prompt, compositeSolidDiagram };
}

export const advancedCompositeSolidVisuals: Record<
  string,
  CompositeSolidQuestionVisual
> = {
  "y8-vsa-cv-i2": visual(
    "The two perpendicular rectangular-prism sections form the L-shaped solid shown. Find its total volume.",
    {
      description:
        "L-shaped solid made from perpendicular rectangular prisms A, measuring 15 cm by 5 cm by 4 cm, and B, measuring 5 cm by 5 cm by 6 cm.",
      kind: "lShapedPrism",
      unit: "cm",
      sections: [
        { length: 15, width: 5, height: 4 },
        { length: 5, width: 5, height: 6 },
      ],
      color: "violet",
    }
  ),
  "y8-vsa-cv-p9": visual(
    "The two perpendicular rectangular-prism sections form the L-shaped solid shown. Find its total volume.",
    {
      description:
        "L-shaped solid made from perpendicular rectangular prisms A, measuring 10 cm by 4 cm by 3 cm, and B, measuring 4 cm by 4 cm by 3 cm.",
      kind: "lShapedPrism",
      unit: "cm",
      sections: [
        { length: 10, width: 4, height: 3 },
        { length: 4, width: 4, height: 3 },
      ],
      color: "blue",
    }
  ),
  "y8-vsa-cv-p16": visual(
    "The L-shaped garden bed has two perpendicular sections of equal depth. Find the soil volume.",
    {
      description:
        "L-shaped garden bed made from perpendicular rectangular sections A, measuring 5 m by 2 m by 0.4 m, and B, measuring 3 m by 2 m by 0.4 m.",
      kind: "lShapedPrism",
      unit: "m",
      sections: [
        { length: 5, width: 2, height: 0.4 },
        { length: 3, width: 2, height: 0.4 },
      ],
      color: "green",
    }
  ),
  "y8-vsa-cv-p21": visual(
    "The staircase is formed from the three labelled rectangular prisms. Find its total volume.",
    {
      description:
        "Three-level staircase with rectangular prisms P1 measuring 12 cm by 8 cm by 2 cm, P2 measuring 8 cm by 8 cm by 2 cm, and P3 measuring 4 cm by 8 cm by 2 cm.",
      kind: "threeStepRectangularPrisms",
      unit: "cm",
      levels: [
        { length: 12, width: 8, height: 2 },
        { length: 8, width: 8, height: 2 },
        { length: 4, width: 8, height: 2 },
      ],
      color: "teal",
    }
  ),
  "y8-vsa-cs-p17": visual(
    "Find the exposed surface area of the three-prism staircase using the labelled joint areas.",
    {
      description:
        "Three-level staircase with prisms P1 measuring 12 cm by 6 cm by 2 cm, P2 measuring 8 cm by 6 cm by 2 cm and P3 measuring 4 cm by 6 cm by 2 cm; joint areas are 48 and 24 square centimetres.",
      kind: "threeStepRectangularPrisms",
      unit: "cm",
      levels: [
        { length: 12, width: 6, height: 2 },
        { length: 8, width: 6, height: 2 },
        { length: 4, width: 6, height: 2 },
      ],
      jointAreas: [48, 24],
      color: "amber",
    }
  ),
  "y8-vsa-cs-p22": visual(
    "Find the exposed surface area of the three stacked prisms using both labelled joint areas.",
    {
      description:
        "Three stacked prisms P1 measuring 12 cm by 10 cm by 3 cm, P2 measuring 8 cm by 6 cm by 4 cm and P3 measuring 4 cm by 3 cm by 5 cm; joint areas are 48 and 12 square centimetres.",
      kind: "threeStepRectangularPrisms",
      unit: "cm",
      levels: [
        { length: 12, width: 10, height: 3 },
        { length: 8, width: 6, height: 4 },
        { length: 4, width: 3, height: 5 },
      ],
      jointAreas: [48, 12],
      color: "red",
    }
  ),
  "y8-vsa-cs-p15": visual(
    "The two closed cylinders share the smaller circular face. Find the exact exposed surface area.",
    {
      description:
        "Stacked closed cylinders with a lower cylinder of radius 4 cm and height 6 cm and an upper cylinder of radius 2 cm and height 3 cm.",
      kind: "stackedCylinders",
      unit: "cm",
      lower: { radius: 4, height: 6 },
      upper: { radius: 2, height: 3 },
      color: "blue",
    }
  ),
  "y8-vsa-cs-p23": visual(
    "The two closed cylinders share the smaller circular face. Find the exact exposed surface area.",
    {
      description:
        "Stacked closed cylinders with a lower cylinder of radius 6 cm and height 10 cm and an upper cylinder of radius 3 cm and height 5 cm.",
      kind: "stackedCylinders",
      unit: "cm",
      lower: { radius: 6, height: 10 },
      upper: { radius: 3, height: 5 },
      color: "violet",
    }
  ),
};
