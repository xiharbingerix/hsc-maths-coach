import type {
  CompositeSolidDiagram,
  RectangularPrismDimensions,
  StatChartColor,
} from "../types";
import type { CompositeSolidQuestionVisual } from "./compositeSolidVisuals";

type Unit = CompositeSolidDiagram["unit"];

function stacked(
  prompt: string,
  description: string,
  lower: RectangularPrismDimensions,
  upper: RectangularPrismDimensions,
  placement: "end" | "centred",
  color: StatChartColor,
  unit: Unit = "cm"
): CompositeSolidQuestionVisual {
  return {
    prompt,
    compositeSolidDiagram: {
      description,
      kind: "stackedRectangularPrisms",
      unit,
      lower,
      upper,
      placement,
      color,
    },
  };
}

function house(
  prompt: string,
  description: string,
  base: RectangularPrismDimensions,
  roof: {
    crossSectionBase: number;
    crossSectionHeight: number;
    length: number;
    slant?: number;
  },
  color: StatChartColor
): CompositeSolidQuestionVisual {
  return {
    prompt,
    compositeSolidDiagram: {
      description,
      kind: "housePrism",
      unit: "cm",
      base,
      roof,
      color,
    },
  };
}

function rectangularVoid(
  prompt: string,
  description: string,
  outer: RectangularPrismDimensions,
  voidDimensions: RectangularPrismDimensions,
  voidStyle: "cornerCutout" | "throughHole",
  color: StatChartColor
): CompositeSolidQuestionVisual {
  return {
    prompt,
    compositeSolidDiagram: {
      description,
      kind: "rectangularPrismWithVoid",
      unit: "cm",
      outer,
      void: voidDimensions,
      voidStyle,
      color,
    },
  };
}

function pipe(
  prompt: string,
  description: string,
  outerRadius: number,
  innerRadius: number,
  length: number,
  color: StatChartColor
): CompositeSolidQuestionVisual {
  return {
    prompt,
    compositeSolidDiagram: {
      description,
      kind: "hollowCylinder",
      unit: "cm",
      outerRadius,
      innerRadius,
      length,
      color,
    },
  };
}

export const compositeSolidPoolVisuals: Record<string, CompositeSolidQuestionVisual> = {
  "y8-vsa-cv-p5": stacked(
    "The two rectangular prisms shown are joined at one end. Find their total volume.",
    "Joined rectangular prisms measuring 6 cm by 4 cm by 2 cm and 4 cm by 4 cm by 3 cm, arranged as a stepped composite solid.",
    { length: 6, width: 4, height: 2 },
    { length: 4, width: 4, height: 3 },
    "end",
    "blue"
  ),
  "y8-vsa-cv-p6": rectangularVoid(
    "A rectangular block has been removed from the corner of the prism shown. Find the remaining volume.",
    "Rectangular prism measuring 6 cm by 5 cm by 4 cm with a 2 cm by 2 cm by 4 cm rectangular block removed from one corner.",
    { length: 6, width: 5, height: 4 },
    { length: 2, width: 2, height: 4 },
    "cornerCutout",
    "amber"
  ),
  "y8-vsa-cv-p7": house(
    "The doorstop combines a rectangular prism and triangular-prism top. Find its total volume.",
    "House-shaped doorstop with an 8 cm by 4 cm by 2 cm rectangular base and a triangular-prism top with cross-section base 4 cm, height 3 cm and length 8 cm.",
    { length: 4, width: 8, height: 2 },
    { crossSectionBase: 4, crossSectionHeight: 3, length: 8 },
    "teal"
  ),
  "y8-vsa-cv-p10": stacked(
    "The two labelled rectangular prisms form one composite solid. Find the total volume.",
    "Stepped composite solid formed from rectangular prisms measuring 14 cm by 6 cm by 4 cm and 6 cm by 6 cm by 5 cm.",
    { length: 14, width: 6, height: 4 },
    { length: 6, width: 6, height: 5 },
    "end",
    "green"
  ),
  "y8-vsa-cv-p11": rectangularVoid(
    "The rectangular hole shown passes completely through the outer prism. Find the remaining volume.",
    "Outer rectangular prism measuring 12 cm by 10 cm by 5 cm with a 4 cm by 3 cm by 5 cm rectangular hole cut completely through it.",
    { length: 12, width: 10, height: 5 },
    { length: 4, width: 3, height: 5 },
    "throughHole",
    "red"
  ),
  "y8-vsa-cv-p12": house(
    "Use the labelled rectangular base and triangular-prism roof to find the total volume.",
    "House-shaped solid with a 10 cm by 6 cm by 5 cm rectangular base and a triangular-prism roof with cross-section base 10 cm, height 4 cm and length 6 cm.",
    { length: 10, width: 6, height: 5 },
    { crossSectionBase: 10, crossSectionHeight: 4, length: 6 },
    "blue"
  ),
  "y8-vsa-cv-p13": pipe(
    "Use the labelled outer and inner radii to find the exact volume of material in the pipe.",
    "Hollow cylindrical pipe with outer radius 4 cm, inner radius 2 cm and length 30 cm.",
    4,
    2,
    30,
    "violet"
  ),
  "y8-vsa-cv-p17": stacked(
    "The smaller rectangular prism sits on the larger prism. Find the total composite volume.",
    "Centred stack with a 20 cm by 12 cm by 8 cm lower rectangular prism and an 8 cm by 6 cm by 8 cm upper rectangular prism.",
    { length: 20, width: 12, height: 8 },
    { length: 8, width: 6, height: 8 },
    "centred",
    "teal"
  ),
  "y8-vsa-cv-p19": house(
    "Find the total volume of the labelled house-shaped rectangular and triangular prisms.",
    "House-shaped solid with a 12 cm by 8 cm by 6 cm rectangular base and a triangular-prism roof with cross-section base 12 cm, height 5 cm and length 8 cm.",
    { length: 12, width: 8, height: 6 },
    { crossSectionBase: 12, crossSectionHeight: 5, length: 8 },
    "amber"
  ),

  "y8-vsa-cs-p9": stacked(
    "The small prism is joined to the large prism. Find the total exposed surface area.",
    "Centred stack with a 10 cm by 6 cm by 3 cm lower rectangular prism and a 6 cm by 4 cm by 2 cm upper prism; their joint is 6 cm by 4 cm.",
    { length: 10, width: 6, height: 3 },
    { length: 6, width: 4, height: 2 },
    "centred",
    "blue"
  ),
  "y8-vsa-cs-p10": stacked(
    "The small prism sits on the larger prism. Find the composite outer surface area.",
    "Centred stack with a 10 cm by 8 cm by 5 cm lower rectangular prism and an 8 cm by 4 cm by 3 cm upper prism; their joint is 8 cm by 4 cm.",
    { length: 10, width: 8, height: 5 },
    { length: 8, width: 4, height: 3 },
    "centred",
    "violet"
  ),
  "y8-vsa-cs-p11": house(
    "Find the exposed surface area of the house-shaped solid, excluding the roof joint.",
    "House-shaped solid with a 6 cm by 4 cm by 3 cm rectangular base and a triangular-prism roof with cross-section base 6 cm, height 4 cm, slant 5 cm and length 4 cm.",
    { length: 6, width: 4, height: 3 },
    { crossSectionBase: 6, crossSectionHeight: 4, length: 4, slant: 5 },
    "teal"
  ),
  "y8-vsa-cs-p12": stacked(
    "The centred small prism covers part of the larger prism. Find the exposed surface area.",
    "Centred stack with an 8 cm by 6 cm by 4 cm lower rectangular prism and a 4 cm by 4 cm by 2 cm upper prism; their joint is 4 cm by 4 cm.",
    { length: 8, width: 6, height: 4 },
    { length: 4, width: 4, height: 2 },
    "centred",
    "green"
  ),
  "y8-vsa-cs-p14": house(
    "Find the exposed surface area of the house-shaped solid, excluding the internal join.",
    "House-shaped solid with an 8 cm by 5 cm by 4 cm rectangular base and a triangular-prism roof with cross-section base 8 cm, height 3 cm, slant 5 cm and length 5 cm.",
    { length: 8, width: 5, height: 4 },
    { crossSectionBase: 8, crossSectionHeight: 3, length: 5, slant: 5 },
    "amber"
  ),
  "y8-vsa-cs-p16": stacked(
    "The small square prism is joined to the larger prism. Find the composite surface area.",
    "Centred stack with a 9 cm by 7 cm by 4 cm lower rectangular prism and a 5 cm by 5 cm by 2 cm upper prism; their joint is 5 cm by 5 cm.",
    { length: 9, width: 7, height: 4 },
    { length: 5, width: 5, height: 2 },
    "centred",
    "red"
  ),
  "y8-vsa-cs-p18": house(
    "Find the exposed surface area of the labelled house shape, excluding the roof base.",
    "House-shaped solid with a 12 cm by 6 cm by 4 cm rectangular base and a triangular-prism roof with cross-section base 12 cm, height 8 cm, slant 10 cm and length 6 cm.",
    { length: 12, width: 6, height: 4 },
    { crossSectionBase: 12, crossSectionHeight: 8, length: 6, slant: 10 },
    "blue"
  ),
  "y8-vsa-cs-p19": stacked(
    "The small prism is joined to the large prism. Find the total exposed surface area.",
    "Centred stack with a 12 cm by 8 cm by 4 cm lower rectangular prism and an 8 cm by 5 cm by 3 cm upper prism; their joint is 8 cm by 5 cm.",
    { length: 12, width: 8, height: 4 },
    { length: 8, width: 5, height: 3 },
    "centred",
    "teal"
  ),
  "y8-vsa-cs-p20": stacked(
    "The small cube is centred on one face of the larger cube. Which composite surface area is correct?",
    "Centred stack of a large cube with edge 4 cm and a small cube with edge 2 cm; the square joint is 2 cm by 2 cm.",
    { length: 4, width: 4, height: 4 },
    { length: 2, width: 2, height: 2 },
    "centred",
    "violet"
  ),
  "y8-vsa-cs-p21": stacked(
    "The upper prism sits on one end of the lower prism. Find the exposed surface area.",
    "Stepped solid with a 16 cm by 6 cm by 3 cm lower rectangular prism and a 10 cm by 6 cm by 3 cm upper prism; their joint is 10 cm by 6 cm.",
    { length: 16, width: 6, height: 3 },
    { length: 10, width: 6, height: 3 },
    "end",
    "green"
  ),
  "y8-vsa-cs-p24": house(
    "Find the exposed surface area of the labelled house shape, excluding the internal roof joint.",
    "House-shaped solid with a 10 cm by 6 cm by 5 cm rectangular base and a triangular-prism roof with cross-section base 10 cm, height 12 cm, slant 13 cm and length 6 cm.",
    { length: 10, width: 6, height: 5 },
    { crossSectionBase: 10, crossSectionHeight: 12, length: 6, slant: 13 },
    "amber"
  ),
  "y8-vsa-cs-p26": stacked(
    "The small cube is centred on the large cube. Find the composite outer surface area.",
    "Centred stack of a large cube with edge 6 cm and a small cube with edge 3 cm; the square joint is 3 cm by 3 cm.",
    { length: 6, width: 6, height: 6 },
    { length: 3, width: 3, height: 3 },
    "centred",
    "red"
  ),
};
