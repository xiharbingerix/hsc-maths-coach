import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import type { CartesianGraph } from "../types";

export type CurveSketchingTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

export type CurveSketchingQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: CurveSketchingTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type CommonQuestion = {
  id: string;
  prompt: string;
  latex: string;
  hint: string;
  explanation: string;
  diagnosticIntent: string;
  taskType: CurveSketchingTaskType;
  difficulty: 3 | 4 | 5;
  cartesianGraph?: CartesianGraph;
  solid3DDiagram?: PracticeQuestion["solid3DDiagram"];
};

export function richAnswer(
  question: CommonQuestion & { answer: string; acceptedAnswers: string[] },
): CurveSketchingQualityQuestion {
  return {
    ...question,
    acceptedAnswers: Array.from(
      new Set([question.answer, ...question.acceptedAnswers]),
    ),
  };
}

export function richChoice(
  question: CommonQuestion & {
    answer: "A" | "B" | "C" | "D";
    choices: [string, string, string, string];
    distractorMisconceptions: Partial<
      Record<"A" | "B" | "C" | "D", string>
    >;
  },
): CurveSketchingQualityQuestion {
  return {
    ...question,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(question.choices[index]),
    })),
  };
}

export function cubicGraph(
  coefficients: { a: number; b: number; c: number; d: number },
  options: {
    description: string;
    label?: string;
    points?: CartesianGraph["points"];
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
  },
): CartesianGraph {
  return {
    description: options.description,
    xMin: options.xMin ?? -4,
    xMax: options.xMax ?? 4,
    yMin: options.yMin ?? -8,
    yMax: options.yMax ?? 8,
    showGrid: true,
    showAxisLabels: true,
    curves: [
      {
        kind: "cubic",
        ...coefficients,
        label: options.label,
        color: "blue",
      },
    ],
    points: options.points,
  };
}

export function quadraticGraph(
  coefficients: { a: number; b: number; c: number },
  options: {
    description: string;
    label?: string;
    points?: CartesianGraph["points"];
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
  },
): CartesianGraph {
  return {
    description: options.description,
    xMin: options.xMin ?? -4,
    xMax: options.xMax ?? 4,
    yMin: options.yMin ?? -6,
    yMax: options.yMax ?? 6,
    showGrid: true,
    showAxisLabels: true,
    parabolas: [
      {
        kind: "quadratic",
        ...coefficients,
        label: options.label,
      },
    ],
    points: options.points,
  };
}

export function lineGraph(
  coefficients: { m: number; b: number },
  options: {
    description: string;
    label?: string;
    points?: CartesianGraph["points"];
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
  },
): CartesianGraph {
  return {
    description: options.description,
    xMin: options.xMin ?? -4,
    xMax: options.xMax ?? 4,
    yMin: options.yMin ?? -6,
    yMax: options.yMax ?? 6,
    showGrid: true,
    showAxisLabels: true,
    lines: [
      {
        kind: "linear",
        ...coefficients,
        label: options.label,
      },
    ],
    points: options.points,
  };
}

export type CurveSketchingMasteryMap = Record<
  string,
  CurveSketchingQualityQuestion[]
>;
