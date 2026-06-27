import type { CompositeSolidQuestionVisual } from "./compositeSolidVisuals";

export const specialCompositeSolidVisuals: Record<
  string,
  CompositeSolidQuestionVisual
> = {
  "y8-vsa-cv-p18": {
    prompt:
      "A cylindrical hole is drilled completely through the cube shown. Find the exact remaining volume.",
    compositeSolidDiagram: {
      description:
        "Cube measuring 10 cm by 10 cm by 10 cm with a cylindrical hole of radius 3 cm and depth 10 cm drilled completely through it.",
      kind: "rectangularPrismWithCylindricalHole",
      unit: "cm",
      outer: { length: 10, width: 10, height: 10 },
      hole: { radius: 3, depth: 10 },
      color: "red",
    },
  },
  "y8-vsa-cv-p22": {
    prompt:
      "The cylindrical concrete column stands on the rectangular base shown. Find the exact total volume.",
    compositeSolidDiagram: {
      description:
        "Concrete column formed by a cylinder of radius 20 cm and height 300 cm standing on a rectangular base measuring 80 cm by 80 cm by 30 cm.",
      kind: "cylinderOnRectangularPrism",
      unit: "cm",
      base: { length: 80, width: 80, height: 30 },
      cylinder: { radius: 20, height: 300 },
      color: "blue",
    },
  },
  "y8-vsa-cv-p24": {
    prompt:
      "A triangular-prism notch has been cut from the rectangular prism shown. Find the remaining volume.",
    compositeSolidDiagram: {
      description:
        "Rectangular prism measuring 15 cm by 10 cm by 8 cm with a triangular-prism notch whose triangular cross-section has base 6 cm and height 4 cm and whose length is 10 cm.",
      kind: "rectangularPrismWithTriangularNotch",
      unit: "cm",
      outer: { length: 15, width: 10, height: 8 },
      notch: { base: 6, height: 4, length: 10 },
      color: "amber",
    },
  },
  "y8-vsa-cv-p25": {
    prompt:
      "The pool has the labelled shallow and deep rectangular sections. Which total water volume is correct?",
    compositeSolidDiagram: {
      description:
        "Stepped swimming-pool cutaway with a shallow rectangular section measuring 10 m by 6 m by 1 m and a deep rectangular section measuring 10 m by 6 m by 2 m.",
      kind: "steppedPool",
      unit: "m",
      shallow: { length: 10, width: 6, height: 1 },
      deep: { length: 10, width: 6, height: 2 },
      color: "teal",
    },
  },
  "y8-vsa-cv-p26": {
    prompt:
      "The cylindrical pot hole is cut into the rectangular planter shown. Find the exact soil volume.",
    compositeSolidDiagram: {
      description:
        "Rectangular planter measuring 60 cm by 40 cm by 30 cm with a cylindrical pot hole of radius 10 cm and depth 30 cm.",
      kind: "rectangularPrismWithCylindricalHole",
      unit: "cm",
      outer: { length: 60, width: 40, height: 30 },
      hole: { radius: 10, depth: 30 },
      color: "green",
    },
  },
};
