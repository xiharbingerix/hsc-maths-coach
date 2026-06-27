import type { BoxPlotDiagram, DotPlotDiagram, StemAndLeafDiagram } from "../types";

export type DataDisplayQuestionVisual = {
  prompt: string;
  boxPlotDiagram?: BoxPlotDiagram;
  dotPlotDiagram?: DotPlotDiagram;
  stemAndLeafDiagram?: StemAndLeafDiagram;
};

export const dataDisplayQuestionVisuals: Record<string, DataDisplayQuestionVisual> = {
  "y8-dat-stm-g2": {
    prompt: "How many data values are represented in the ordered stem-and-leaf plot?",
    stemAndLeafDiagram: {
      description:
        "Ordered stem-and-leaf plot representing the values 23, 25, 28, 31, 34 and 39.",
      rows: [
        { stem: 2, leaves: [3, 5, 8] },
        { stem: 3, leaves: [1, 4, 9] },
      ],
      keyText: "2 | 3 = 23",
    },
  },
  "y8-dat-stm-g3": {
    prompt: "Use the ordered stem-and-leaf plot to find the range.",
    stemAndLeafDiagram: {
      description:
        "Ordered stem-and-leaf plot representing the values 13, 16, 19, 20 and 24.",
      rows: [
        { stem: 1, leaves: [3, 6, 9] },
        { stem: 2, leaves: [0, 4] },
      ],
      keyText: "1 | 3 = 13",
    },
  },
  "y8-dat-stm-i2": {
    prompt: "Use the ordered stem-and-leaf plot to find the median.",
    stemAndLeafDiagram: {
      description:
        "Ordered stem-and-leaf plot representing the eight values 12, 15, 17, 20, 23, 28, 31 and 36.",
      rows: [
        { stem: 1, leaves: [2, 5, 7] },
        { stem: 2, leaves: [0, 3, 8] },
        { stem: 3, leaves: [1, 6] },
      ],
      keyText: "1 | 2 = 12",
    },
  },
  "y8-dat-stm-i4": {
    prompt: "How many values in the ordered stem-and-leaf plot are greater than 40?",
    stemAndLeafDiagram: {
      description:
        "Ordered stem-and-leaf plot representing the values 32, 34, 37, 41, 43 and 48.",
      rows: [
        { stem: 3, leaves: [2, 4, 7] },
        { stem: 4, leaves: [1, 3, 8] },
      ],
      keyText: "3 | 2 = 32",
    },
  },
  "y8-dat-stm-i5": {
    prompt: "Use the ordered stem-and-leaf plot to find the mode.",
    stemAndLeafDiagram: {
      description:
        "Ordered stem-and-leaf plot representing the values 13, 16, 24, 24, 29, 30 and 38.",
      rows: [
        { stem: 1, leaves: [3, 6] },
        { stem: 2, leaves: [4, 4, 9] },
        { stem: 3, leaves: [0, 8] },
      ],
      keyText: "1 | 3 = 13",
    },
  },
  "y8-dat-stm-m7": {
    prompt: "Use the ordered stem-and-leaf plot to find the median.",
    stemAndLeafDiagram: {
      description:
        "Ordered stem-and-leaf plot representing the eight values 42, 45, 48, 51, 53, 60, 64 and 67.",
      rows: [
        { stem: 4, leaves: [2, 5, 8] },
        { stem: 5, leaves: [1, 3] },
        { stem: 6, leaves: [0, 4, 7] },
      ],
      keyText: "4 | 2 = 42",
    },
  },
  "y8-dat-stm-mp1": {
    prompt: "The ordered stem-and-leaf plot shows seven test scores.",
    stemAndLeafDiagram: {
      description:
        "Ordered stem-and-leaf plot of the seven test scores 42, 46, 51, 53, 58, 60 and 64.",
      rows: [
        { stem: 4, leaves: [2, 6] },
        { stem: 5, leaves: [1, 3, 8] },
        { stem: 6, leaves: [0, 4] },
      ],
      keyText: "4 | 2 = 42",
      rightLabel: "Test score",
    },
  },
  "y8-dat-bxp-g4": {
    prompt: "Use the box plot shown to find the range.",
    boxPlotDiagram: {
      description:
        "Box plot with minimum 5, lower quartile 9, median 13, upper quartile 17 and maximum 21.",
      plots: [{ label: "Data", min: 5, q1: 9, median: 13, q3: 17, max: 21 }],
      axisLabel: "Value",
      xMin: 0,
      xMax: 25,
      showValueLabels: true,
    },
  },
  "y8-dat-bxp-i5": {
    prompt: "Use the box plot shown to find the IQR and the range.",
    boxPlotDiagram: {
      description:
        "Box plot with minimum 10, lower quartile 14, median 18, upper quartile 22 and maximum 26.",
      plots: [{ label: "Data", min: 10, q1: 14, median: 18, q3: 22, max: 26 }],
      axisLabel: "Value",
      xMin: 5,
      xMax: 30,
      showValueLabels: true,
    },
  },
  "y8-dat-bxp-m1": {
    prompt: "Use the box plot shown to find the IQR.",
    boxPlotDiagram: {
      description:
        "Box plot with minimum 3, lower quartile 7, median 11, upper quartile 16 and maximum 20.",
      plots: [{ label: "Data", min: 3, q1: 7, median: 11, q3: 16, max: 20 }],
      axisLabel: "Value",
      xMin: 0,
      xMax: 25,
      showValueLabels: true,
    },
  },
  "y8-dat-bxp-m6": {
    prompt: "Use the box plot shown to find the length of the right whisker.",
    boxPlotDiagram: {
      description:
        "Box plot with minimum 2, lower quartile 6, median 10, upper quartile 14 and maximum 30.",
      plots: [{ label: "Data", min: 2, q1: 6, median: 10, q3: 14, max: 30 }],
      axisLabel: "Value",
      xMin: 0,
      xMax: 32,
      showValueLabels: true,
    },
  },
  "y8-dat-bxp-m7": {
    prompt: "Use the box plot shown to find the length of the left whisker.",
    boxPlotDiagram: {
      description:
        "Box plot with minimum 2, lower quartile 6, median 10, upper quartile 14 and maximum 30.",
      plots: [{ label: "Data", min: 2, q1: 6, median: 10, q3: 14, max: 30 }],
      axisLabel: "Value",
      xMin: 0,
      xMax: 32,
      showValueLabels: true,
    },
  },
  "y8-dat-cmpbxp-i5": {
    prompt: "Use the side-by-side box plots to decide which group has the larger IQR.",
    boxPlotDiagram: {
      description:
        "Side-by-side box plots. Group A has five-number summary 4, 10, 18, 22, 28. Group B has five-number summary 4, 8, 12, 24, 28.",
      plots: [
        { label: "Group A", min: 4, q1: 10, median: 18, q3: 22, max: 28 },
        { label: "Group B", min: 4, q1: 8, median: 12, q3: 24, max: 28 },
      ],
      axisLabel: "Value",
      xMin: 0,
      xMax: 32,
      showValueLabels: true,
    },
  },
  "y8-dat-cmpbxp-m9": {
    prompt: "Use the side-by-side box plots to decide which group has the larger IQR.",
    boxPlotDiagram: {
      description:
        "Side-by-side box plots. Group A has five-number summary 10, 20, 30, 45, 50. Group B has five-number summary 10, 15, 20, 35, 50.",
      plots: [
        { label: "Group A", min: 10, q1: 20, median: 30, q3: 45, max: 50 },
        { label: "Group B", min: 10, q1: 15, median: 20, q3: 35, max: 50 },
      ],
      axisLabel: "Value",
      xMin: 5,
      xMax: 55,
      showValueLabels: true,
    },
  },
  "y8-dat-cmpbxp-m10": {
    prompt:
      "Use the side-by-side box plots to identify the higher median and find the difference between the medians.",
    boxPlotDiagram: {
      description:
        "Side-by-side box plots. Group A has five-number summary 10, 20, 30, 40, 50. Group B has five-number summary 10, 15, 20, 35, 50.",
      plots: [
        { label: "Group A", min: 10, q1: 20, median: 30, q3: 40, max: 50 },
        { label: "Group B", min: 10, q1: 15, median: 20, q3: 35, max: 50 },
      ],
      axisLabel: "Value",
      xMin: 5,
      xMax: 55,
      showValueLabels: true,
    },
  },
  "y8-dat-cmpbxp-mp1": {
    prompt: "The side-by-side box plots compare the test marks of Class A and Class B.",
    boxPlotDiagram: {
      description:
        "Side-by-side test-mark box plots. Class A has five-number summary 30, 50, 60, 72, 90. Class B has five-number summary 30, 44, 54, 66, 90.",
      plots: [
        { label: "Class A", min: 30, q1: 50, median: 60, q3: 72, max: 90 },
        { label: "Class B", min: 30, q1: 44, median: 54, q3: 66, max: 90 },
      ],
      axisLabel: "Test mark",
      xMin: 25,
      xMax: 95,
      showValueLabels: true,
    },
  },
  "y8-dat-cmp-mp1": {
    prompt:
      "The back-to-back stem-and-leaf plot compares the points scored by two basketball players across five games.",
    stemAndLeafDiagram: {
      description:
        "Back-to-back stem-and-leaf plot. Player A scored 8, 12, 14, 16 and 20 points. Player B scored 2, 10, 14, 18 and 26 points.",
      rows: [
        { stem: 0, leftLeaves: [8], leaves: [2] },
        { stem: 1, leftLeaves: [2, 4, 6], leaves: [0, 4, 8] },
        { stem: 2, leftLeaves: [0], leaves: [6] },
      ],
      keyText: "1 | 4 = 14 points for either player",
      leftLabel: "Player A",
      rightLabel: "Player B",
    },
  },
  "y8-dai-sa-g1": {
    prompt: "Use the dot plot to find the mean of the four values.",
    dotPlotDiagram: {
      description: "Dot plot representing the four values 2, 4, 5 and 9.",
      min: 2,
      max: 9,
      values: [2, 4, 9, 5],
      axisLabel: "Value",
    },
  },
  "y8-dai-sa-i3": {
    prompt: "Use the dot plot shown to identify the mode of the data.",
    dotPlotDiagram: {
      description: "Dot plot representing the seven values 3, 7, 7, 2, 7, 5 and 2.",
      min: 2,
      max: 7,
      values: [3, 7, 7, 2, 7, 5, 2],
      axisLabel: "Value",
    },
  },
  "y8-dai-sa-mp1": {
    prompt: "The dot plot shows the goals scored by a player in five games.",
    dotPlotDiagram: {
      description: "Dot plot of goals scored across five games: 1, 3, 2, 4 and 5 goals.",
      min: 1,
      max: 5,
      values: [1, 3, 2, 4, 5],
      axisLabel: "Goals",
    },
  },
};
