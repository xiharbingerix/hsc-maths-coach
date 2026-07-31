import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import type { CartesianGraph } from "../types";

export type MotionRatesTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

export type MotionRatesQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: MotionRatesTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type Common = {
  id: string;
  prompt: string;
  latex: string;
  hint: string;
  explanation: string;
  diagnosticIntent: string;
  taskType: MotionRatesTaskType;
  difficulty: 3 | 4 | 5;
  cartesianGraph?: CartesianGraph;
};

export function answer(
  question: Common & { answer: string; acceptedAnswers: string[] },
): MotionRatesQualityQuestion {
  return {
    ...question,
    acceptedAnswers: Array.from(new Set([question.answer, ...question.acceptedAnswers])),
  };
}

export function choice(
  question: Common & {
    answer: "A" | "B" | "C" | "D";
    choices: [string, string, string, string];
    distractorMisconceptions: Partial<Record<"A" | "B" | "C" | "D", string>>;
  },
): MotionRatesQualityQuestion {
  return {
    ...question,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(question.choices[index]),
    })),
  };
}

export function motionGraph(
  description: string,
  graph: Omit<CartesianGraph, "description">,
): CartesianGraph {
  return {
    description,
    xStep: 1,
    showGrid: true,
    showAxisLabels: true,
    xAxisLabel: "t",
    yAxisLabel: "value",
    ...graph,
  };
}

export type MotionRatesMasteryMap = Record<string, MotionRatesQualityQuestion[]>;
