import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import type { DataTableDiagram, ScatterPlotDiagram } from "../types";

export type BivariateTaskType = "procedural" | "problem-solving" | "analytical" | "investigative" | "synthesis";
export type BivariateQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: BivariateTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type Common = {
  id: string; prompt: string; latex: string; hint: string; explanation: string;
  diagnosticIntent: string; taskType: BivariateTaskType; difficulty: 3 | 4 | 5;
  scatterPlotDiagram?: ScatterPlotDiagram; dataTableDiagram?: DataTableDiagram;
};

export function answer(question: Common & { answer: string; acceptedAnswers: string[] }): BivariateQualityQuestion {
  return { ...question, acceptedAnswers: Array.from(new Set([question.answer, ...question.acceptedAnswers])) };
}

export function choice(question: Common & { answer: "A" | "B" | "C" | "D"; choices: [string, string, string, string]; distractorMisconceptions: Partial<Record<"A" | "B" | "C" | "D", string>> }): BivariateQualityQuestion {
  return { ...question, choices: (["A", "B", "C", "D"] as const).map((label, index) => ({ label, text: formatChoiceText(question.choices[index]) })) };
}

export function scatter(description: string, points: { x: number; y: number; label?: string }[], xAxisLabel: string, yAxisLabel: string, lineOfBestFit?: "auto" | { m: number; b: number }): ScatterPlotDiagram {
  return { description, points, xAxisLabel, yAxisLabel, lineOfBestFit };
}

export function table(description: string, columnHeaders: string[], values: (string | number)[][]): DataTableDiagram {
  return { description, columnHeaders, values };
}

export type BivariateMasteryMap = Record<string, BivariateQualityQuestion[]>;
