import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import type { DataTableDiagram, NormalDistributionDiagram } from "../types";

export type ContinuousProbabilityTaskType = "procedural" | "problem-solving" | "analytical" | "investigative" | "synthesis";
export type ContinuousProbabilityQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: ContinuousProbabilityTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type Common = {
  id: string; prompt: string; latex: string; hint: string; explanation: string;
  diagnosticIntent: string; taskType: ContinuousProbabilityTaskType; difficulty: 3 | 4 | 5;
  dataTableDiagram?: DataTableDiagram; normalDistributionDiagram?: NormalDistributionDiagram;
};

export function answer(question: Common & { answer: string; acceptedAnswers: string[] }): ContinuousProbabilityQualityQuestion {
  return { ...question, acceptedAnswers: Array.from(new Set([question.answer, ...question.acceptedAnswers])) };
}

export function choice(question: Common & { answer: "A" | "B" | "C" | "D"; choices: [string, string, string, string]; distractorMisconceptions: Partial<Record<"A" | "B" | "C" | "D", string>> }): ContinuousProbabilityQualityQuestion {
  return { ...question, choices: (["A", "B", "C", "D"] as const).map((label, index) => ({ label, text: formatChoiceText(question.choices[index]) })) };
}

export function table(description: string, columnHeaders: string[], values: (string | number)[][]): DataTableDiagram {
  return { description, columnHeaders, values };
}

export function normal(description: string, mean: number, standardDeviation: number, markers?: NormalDistributionDiagram["markers"], shadedBands?: NormalDistributionDiagram["shadedBands"]): NormalDistributionDiagram {
  return { description, mean, standardDeviation, axisLabel: "X", showStandardDeviationLabels: true, markers, shadedBands };
}

export type ContinuousProbabilityMasteryMap = Record<string, ContinuousProbabilityQualityQuestion[]>;
