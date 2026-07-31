import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import type { CartesianGraph } from "../types";

export type SequencesSeriesTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

export type SequencesSeriesQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: SequencesSeriesTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type CommonQuestion = {
  id: string;
  prompt: string;
  latex: string;
  hint: string;
  explanation: string;
  diagnosticIntent: string;
  taskType: SequencesSeriesTaskType;
  difficulty: 3 | 4 | 5;
  cartesianGraph?: CartesianGraph;
};

export function richAnswer(
  question: CommonQuestion & { answer: string; acceptedAnswers: string[] },
): SequencesSeriesQualityQuestion {
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
): SequencesSeriesQualityQuestion {
  return {
    ...question,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(question.choices[index]),
    })),
  };
}

export function sequencePlot(
  description: string,
  points: NonNullable<CartesianGraph["points"]>,
): CartesianGraph {
  const xValues = points.map(({ x }) => x);
  const yValues = points.map(({ y }) => y);
  return {
    description,
    xMin: Math.min(...xValues) - 1,
    xMax: Math.max(...xValues) + 1,
    yMin: Math.min(0, ...yValues) - 2,
    yMax: Math.max(...yValues) + 2,
    xStep: 1,
    showGrid: true,
    showAxisLabels: true,
    xAxisLabel: "n",
    yAxisLabel: "T_n",
    points,
  };
}

export type SequencesSeriesMasteryMap = Record<
  string,
  SequencesSeriesQualityQuestion[]
>;
