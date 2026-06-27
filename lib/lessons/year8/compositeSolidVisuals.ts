import type { CompositeSolidDiagram } from "../types";

export type CompositeSolidQuestionVisual = {
  prompt: string;
  compositeSolidDiagram: CompositeSolidDiagram;
};

export const compositeSolidQuestionVisuals: Record<
  string,
  CompositeSolidQuestionVisual
> = {
  "y8-vsa-cv-g2": {
    prompt: "The two rectangular prisms shown are joined. Find their total volume.",
    compositeSolidDiagram: {
      description:
        "Composite solid with a 10 cm by 4 cm by 2 cm lower rectangular prism and a 6 cm by 4 cm by 3 cm upper rectangular prism joined at one end.",
      kind: "stackedRectangularPrisms",
      unit: "cm",
      lower: { length: 10, width: 4, height: 2 },
      upper: { length: 6, width: 4, height: 3 },
      placement: "end",
      color: "blue",
    },
  },
  "y8-vsa-cv-g3": {
    prompt:
      "A rectangular block has been removed from the corner of the prism shown. Find the remaining volume.",
    compositeSolidDiagram: {
      description:
        "Rectangular prism measuring 8 cm by 6 cm by 4 cm with a 3 cm by 2 cm by 4 cm rectangular block removed from one corner.",
      kind: "rectangularPrismWithVoid",
      unit: "cm",
      outer: { length: 8, width: 6, height: 4 },
      void: { length: 3, width: 2, height: 4 },
      voidStyle: "cornerCutout",
      color: "amber",
    },
  },
  "y8-vsa-cv-g4": {
    prompt:
      "The doorstop shown combines a rectangular prism and a triangular prism. Find its total volume.",
    compositeSolidDiagram: {
      description:
        "House-shaped doorstop with a 10 cm by 4 cm by 3 cm rectangular base and a triangular-prism top whose cross-section has base 4 cm and height 2 cm and whose length is 10 cm.",
      kind: "housePrism",
      unit: "cm",
      base: { length: 4, width: 10, height: 3 },
      roof: { crossSectionBase: 4, crossSectionHeight: 2, length: 10 },
      color: "teal",
    },
  },
  "y8-vsa-cv-i2": {
    prompt:
      "The L-shaped solid shown consists of two rectangular prisms. Find its total volume.",
    compositeSolidDiagram: {
      description:
        "L-shaped composite solid with a 15 cm by 5 cm by 4 cm lower rectangular prism and a 5 cm by 5 cm by 6 cm upper prism at one end.",
      kind: "stackedRectangularPrisms",
      unit: "cm",
      lower: { length: 15, width: 5, height: 4 },
      upper: { length: 5, width: 5, height: 6 },
      placement: "end",
      color: "violet",
    },
  },
  "y8-vsa-cv-i4": {
    prompt:
      "The rectangular hole shown is cut all the way through the outer prism. Find the remaining volume.",
    compositeSolidDiagram: {
      description:
        "Outer rectangular prism measuring 10 cm by 8 cm by 5 cm with a 4 cm by 2 cm by 5 cm rectangular hole cut completely through it.",
      kind: "rectangularPrismWithVoid",
      unit: "cm",
      outer: { length: 10, width: 8, height: 5 },
      void: { length: 4, width: 2, height: 5 },
      voidStyle: "throughHole",
      color: "red",
    },
  },
  "y8-vsa-cv-m3": {
    prompt:
      "Which expression gives the total volume of the rectangular base and triangular-prism roof shown?",
    compositeSolidDiagram: {
      description:
        "House-shaped solid with an 8 cm by 6 cm by 4 cm rectangular base and a triangular-prism roof with cross-section base 8 cm, height 5 cm and length 6 cm.",
      kind: "housePrism",
      unit: "cm",
      base: { length: 8, width: 6, height: 4 },
      roof: { crossSectionBase: 8, crossSectionHeight: 5, length: 6 },
      color: "blue",
    },
  },
  "y8-vsa-cv-m7": {
    prompt:
      "The upper rectangular prism sits on one end of the lower prism. Find the total volume of the composite solid.",
    compositeSolidDiagram: {
      description:
        "Stepped solid with a 14 cm by 6 cm by 3 cm lower rectangular prism and an 8 cm by 6 cm by 4 cm upper prism placed on one end.",
      kind: "stackedRectangularPrisms",
      unit: "cm",
      lower: { length: 14, width: 6, height: 3 },
      upper: { length: 8, width: 6, height: 4 },
      placement: "end",
      color: "green",
    },
  },
  "y8-vsa-cv-m9": {
    prompt:
      "Use the labelled outer and inner radii to find the exact volume of material in the hollow pipe.",
    compositeSolidDiagram: {
      description:
        "Hollow cylindrical pipe with outer radius 5 cm, inner radius 3 cm and length 20 cm.",
      kind: "hollowCylinder",
      unit: "cm",
      outerRadius: 5,
      innerRadius: 3,
      length: 20,
      color: "violet",
    },
  },
  "y8-vsa-cv-mp1": {
    prompt:
      "The house-shaped solid has the labelled rectangular base and triangular-prism roof. Answer each part.",
    compositeSolidDiagram: {
      description:
        "House-shaped solid with a 12 cm by 6 cm by 5 cm rectangular base and a triangular-prism roof with cross-section base 12 cm, height 4 cm and length 6 cm.",
      kind: "housePrism",
      unit: "cm",
      base: { length: 12, width: 6, height: 5 },
      roof: { crossSectionBase: 12, crossSectionHeight: 4, length: 6 },
      color: "amber",
    },
  },
  "y8-vsa-cs-g2": {
    prompt:
      "The small prism sits on the large prism with the labelled dimensions. Find the total outer surface area.",
    compositeSolidDiagram: {
      description:
        "Centred stack with a 10 cm by 6 cm by 4 cm lower rectangular prism and a 6 cm by 4 cm by 3 cm upper prism; their joint is 6 cm by 4 cm.",
      kind: "stackedRectangularPrisms",
      unit: "cm",
      lower: { length: 10, width: 6, height: 4 },
      upper: { length: 6, width: 4, height: 3 },
      placement: "centred",
      color: "blue",
    },
  },
  "y8-vsa-cs-g4": {
    prompt:
      "Find the total outer surface area of the house-shaped solid shown, excluding the internal roof joint.",
    compositeSolidDiagram: {
      description:
        "House-shaped solid with an 8 cm by 5 cm by 4 cm rectangular base and a triangular-prism roof with cross-section base 8 cm, height 3 cm, slant sides 5 cm and length 5 cm.",
      kind: "housePrism",
      unit: "cm",
      base: { length: 8, width: 5, height: 4 },
      roof: { crossSectionBase: 8, crossSectionHeight: 3, length: 5, slant: 5 },
      color: "teal",
    },
  },
  "y8-vsa-cs-i4": {
    prompt:
      "The small prism is joined to the top of the large prism. Find the composite outer surface area.",
    compositeSolidDiagram: {
      description:
        "Centred stack with a 12 cm by 8 cm by 4 cm lower rectangular prism and an 8 cm by 5 cm by 3 cm upper prism; their joint is 8 cm by 5 cm.",
      kind: "stackedRectangularPrisms",
      unit: "cm",
      lower: { length: 12, width: 8, height: 4 },
      upper: { length: 8, width: 5, height: 3 },
      placement: "centred",
      color: "green",
    },
  },
  "y8-vsa-cs-mp1": {
    prompt:
      "The labelled small rectangular prism is centred on the large prism. Answer each surface-area part.",
    compositeSolidDiagram: {
      description:
        "Centred stack with a 10 cm by 8 cm by 5 cm lower rectangular prism and a 6 cm by 4 cm by 3 cm upper prism; their joint is 6 cm by 4 cm.",
      kind: "stackedRectangularPrisms",
      unit: "cm",
      lower: { length: 10, width: 8, height: 5 },
      upper: { length: 6, width: 4, height: 3 },
      placement: "centred",
      color: "violet",
    },
  },
};
