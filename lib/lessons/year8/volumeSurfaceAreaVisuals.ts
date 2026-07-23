import type { NetDiagram, Solid3DDiagram } from "../types";

export type VolumeSurfaceAreaQuestionVisual = {
  prompt: string;
  solid3DDiagram?: Solid3DDiagram;
  netDiagram?: NetDiagram;
};

export const volumeSurfaceAreaQuestionVisuals: Record<
  string,
  VolumeSurfaceAreaQuestionVisual
> = {
  "y8-vsa-vp-g2": {
    prompt: "Use the dimensions on the rectangular prism shown to find its volume.",
    solid3DDiagram: {
      description:
        "Rectangular prism with length 8 cm, width 5 cm and perpendicular height 3 cm.",
      solid: "rectangularPrism",
      labels: { length: "8 cm", width: "5 cm", height: "3 cm" },
      color: "blue",
    },
  },
  "y8-vsa-vp-g3": {
    prompt:
      "The triangular prism shown has a cross-section with base 6 cm and perpendicular height 4 cm. Find its volume.",
    solid3DDiagram: {
      description:
        "Triangular prism with cross-section base 6 cm, perpendicular cross-section height 4 cm and prism length 10 cm.",
      solid: "triangularPrism",
      labels: { base: "6 cm", height: "4 cm", length: "10 cm" },
      color: "teal",
    },
  },
  "y8-vsa-vp-i5": {
    prompt:
      "The rectangular prism shown has volume 120 cm\u00b3. Find its height h.",
    solid3DDiagram: {
      description:
        "Rectangular prism with length 5 cm, width 6 cm, unknown perpendicular height h and volume 120 cubic centimetres.",
      solid: "rectangularPrism",
      labels: { length: "5 cm", width: "6 cm", height: "h" },
      color: "green",
    },
  },
  "y8-vsa-vp-m9": {
    prompt:
      "The triangular prism shown has volume 360 cm\u00b3. Find h, the perpendicular height of its triangular cross-section.",
    solid3DDiagram: {
      description:
        "Triangular prism with cross-section base 10 cm, unknown perpendicular cross-section height h, prism length 12 cm and volume 360 cubic centimetres.",
      solid: "triangularPrism",
      labels: { base: "10 cm", height: "h", length: "12 cm" },
      color: "violet",
    },
  },
  "y8-vsa-sp-g1": {
    prompt: "The net shown folds into a rectangular prism. How many faces does it have?",
    netDiagram: {
      description:
        "Net of a rectangular prism showing all six rectangular faces: four side faces and two end faces.",
      solid: "rectangularPrism",
      color: "blue",
    },
  },
  "y8-vsa-sp-g2": {
    prompt: "Use the net shown to find the total surface area of the rectangular prism.",
    netDiagram: {
      description:
        "Net of a rectangular prism with length 5 cm, width 4 cm and height 3 cm, showing all six outer faces.",
      solid: "rectangularPrism",
      labels: { length: "5 cm", width: "4 cm", height: "3 cm" },
      color: "teal",
    },
  },
  "y8-vsa-sp-g3": {
    prompt:
      "The net shown is for a cube with side length 6 cm. Find its total surface area.",
    netDiagram: {
      description:
        "Net of a cube made from six equal square faces, each with side length 6 cm.",
      solid: "cube",
      labels: { base: "6 cm" },
      color: "amber",
    },
  },
  "y8-vsa-sp-i4": {
    prompt:
      "The net is for a rectangular prism with length 7 cm, height 2 cm and width w. Its total surface area is 100 cm\u00b2. Find w.",
    netDiagram: {
      description:
        "Net of a rectangular prism with length 7 cm, unknown width w and height 2 cm; its total surface area is 100 square centimetres.",
      solid: "rectangularPrism",
      labels: { length: "7 cm", width: "w", height: "2 cm" },
      color: "green",
    },
  },
  "y8-vsa-sp-p18": {
    prompt:
      "The right triangular prism shown has total surface area 240 cm\u00b2. Find its length l.",
    solid3DDiagram: {
      description:
        "Right triangular prism with perpendicular cross-section legs 5 cm and 12 cm, hypotenuse 13 cm, unknown prism length l and total surface area 240 square centimetres.",
      solid: "triangularPrism",
      labels: { base: "5 cm", height: "12 cm", slant: "13 cm", length: "l" },
      color: "violet",
    },
  },
  "y8-vsa-sp-mp1": {
    prompt:
      "The net represents a closed wooden box with length 20 cm, width 15 cm and height 10 cm. It will be painted on its outer faces.",
    netDiagram: {
      description:
        "Net of a closed rectangular wooden box with length 20 cm, width 15 cm and height 10 cm, showing all six outer faces.",
      solid: "rectangularPrism",
      labels: { length: "20 cm", width: "15 cm", height: "10 cm" },
      color: "amber",
    },
  },
  "y8-vsa-vc-g2": {
    prompt:
      "Use the dimensions on the cylinder shown to find its exact volume in terms of \u03c0.",
    solid3DDiagram: {
      description: "Closed cylinder with radius 5 cm and perpendicular height 8 cm.",
      solid: "cylinder",
      labels: { radius: "5 cm", height: "8 cm" },
      color: "blue",
    },
  },
  "y8-vsa-vc-i4": {
    prompt:
      "The cylinder shown has volume 100\u03c0 cm\u00b3. Find its height h.",
    solid3DDiagram: {
      description:
        "Cylinder with radius 5 cm, unknown perpendicular height h and volume 100 pi cubic centimetres.",
      solid: "cylinder",
      labels: { radius: "5 cm", height: "h" },
      color: "green",
    },
  },
  "y8-vsa-vc-i5": {
    prompt: "Find the exact volume of the cylindrical tin shown in terms of \u03c0.",
    solid3DDiagram: {
      description: "Closed cylindrical tin with radius 4 cm and height 12 cm.",
      solid: "cylinder",
      labels: { radius: "4 cm", height: "12 cm" },
      color: "teal",
    },
  },
  "y8-vsa-vc-mp1": {
    prompt:
      "The cylindrical water tank shown has radius 7 cm and height 20 cm. Use \u03c0 = 3.14 throughout and round as directed.",
    solid3DDiagram: {
      description: "Cylindrical water tank with radius 7 cm and height 20 cm.",
      solid: "cylinder",
      labels: { radius: "7 cm", height: "20 cm" },
      color: "violet",
    },
  },
  "y8-vsa-sc-g1": {
    prompt:
      "The net shown belongs to a closed cylinder. How many distinct surfaces does the cylinder have?",
    netDiagram: {
      description:
        "Net of a closed cylinder showing two circular ends and one rectangular curved surface.",
      solid: "cylinder",
      color: "blue",
    },
  },
  "y8-vsa-sc-g2": {
    prompt:
      "Use the cylinder net shown to find the exact total surface area in terms of \u03c0.",
    netDiagram: {
      description:
        "Net of a closed cylinder with two circular ends of radius 5 cm and a rectangular curved surface of height 8 cm.",
      solid: "cylinder",
      labels: { radius: "5 cm", height: "8 cm" },
      color: "teal",
    },
  },
  "y8-vsa-sc-i4": {
    prompt:
      "The closed cylinder represented by the net has radius 3 cm and total surface area 60\u03c0 cm\u00b2. Find its height h.",
    netDiagram: {
      description:
        "Net of a closed cylinder with circular ends of radius 3 cm, unknown rectangle height h and total surface area 60 pi square centimetres.",
      solid: "cylinder",
      labels: { radius: "3 cm", height: "h" },
      color: "green",
    },
  },
  "y8-vsa-sc-mp1": {
    prompt:
      "The net represents a closed cylindrical drink can with radius 3 cm and height 11 cm. Leave exact answers in terms of \u03c0 unless directed otherwise.",
    netDiagram: {
      description:
        "Net of a closed cylindrical drink can with two circular ends of radius 3 cm and a rectangular curved surface of height 11 cm.",
      solid: "cylinder",
      labels: { radius: "3 cm", height: "11 cm" },
      color: "amber",
    },
  },
};
