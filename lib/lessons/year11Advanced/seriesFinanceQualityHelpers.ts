import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import type { CartesianGraph, DataTableDiagram } from "../types";

export type SeriesFinanceTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

export type SeriesFinanceQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: SeriesFinanceTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type Common = {
  id: string;
  prompt: string;
  latex: string;
  hint: string;
  explanation: string;
  diagnosticIntent: string;
  taskType: SeriesFinanceTaskType;
  difficulty: 3 | 4 | 5;
  dataTableDiagram?: DataTableDiagram;
  cartesianGraph?: CartesianGraph;
};

export function answer(
  question: Common & { answer: string; acceptedAnswers: string[] },
): SeriesFinanceQualityQuestion {
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
): SeriesFinanceQualityQuestion {
  return {
    ...question,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(question.choices[index]),
    })),
  };
}

export function financeTable(
  description: string,
  columnHeaders: string[],
  values: (number | string)[][],
  rowHeaders?: string[],
): DataTableDiagram {
  return { description, columnHeaders, values, rowHeaders };
}

export type SeriesFinanceMasteryMap = Record<string, SeriesFinanceQualityQuestion[]>;
