import type { BoxPlotDiagram } from "./types";

export type Year9BoxPlotVisual = {
  prompt: string;
  boxPlotDiagram: BoxPlotDiagram;
};

type Summary = [min: number, q1: number, median: number, q3: number, max: number];

function visual(
  prompt: string,
  [min, q1, median, q3, max]: Summary
): Year9BoxPlotVisual {
  const padding = Math.max(2, Math.ceil((max - min) * 0.12));
  return {
    prompt,
    boxPlotDiagram: {
      description:
        `Box plot with minimum ${min}, lower quartile ${q1}, median ${median}, ` +
        `upper quartile ${q3} and maximum ${max}.`,
      plots: [{ label: "Data", min, q1, median, q3, max }],
      axisLabel: "Value",
      xMin: Math.max(0, min - padding),
      xMax: max + padding,
      showValueLabels: true,
    },
  };
}

const summaryA: Summary = [3, 7, 10, 15, 22];
const summaryB: Summary = [1, 4, 6, 10, 15];
const summaryC: Summary = [4, 9, 14, 21, 30];
const summaryD: Summary = [2, 6, 9, 14, 20];
const summaryE: Summary = [10, 18, 25, 34, 50];
const summaryF: Summary = [5, 9, 13, 17, 21];

export const year9BoxPlotVisuals: Record<string, Year9BoxPlotVisual> = {
  "y9-bp-i1": visual("Use the box plot shown to find the IQR.", summaryA),
  "y9-bp-i2": visual("Use the box plot shown to find the range.", summaryA),
  "y9-bp-m5": visual("Use the box plot shown to find the IQR.", summaryB),
  "y9-bp-m6": visual("Use the box plot shown to find the range.", summaryB),
  "y9-bp-p1": visual("Use the box plot shown to find the IQR.", summaryC),
  "y9-bp-p2": visual("Use the box plot shown to find the range.", summaryC),
  "y9-bp-p3": visual("Use the box plot shown to find the IQR.", summaryD),
  "y9-bp-p4": visual("Use the box plot shown to find the range.", summaryD),
  "y9-bp-p7": visual("Use the box plot shown to find the IQR.", summaryE),
  "y9-bp-p10": visual("Use the box plot shown to find the IQR.", summaryF),
  "y9c-bp-1": visual("Use the box plot shown to find the IQR.", summaryC),
  "y9c-bp-2": visual("Use the box plot shown to find the range.", summaryC),
  "y9c-bp-3": visual("Use the box plot shown to find the IQR.", summaryD),
  "y9c-bp-4": visual("Use the box plot shown to find the range.", summaryD),
  "y9c-bp-7": visual("Use the box plot shown to find the IQR.", summaryE),
  "y9c-bp-10": visual("Use the box plot shown to find the IQR.", summaryF),
};
