import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import type {
  BoxPlotDiagram,
  DataTableDiagram,
  TwoWayTableDiagram,
  VennDiagram,
} from "../types";

export type ProbabilityDataTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

export type ProbabilityDataQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: ProbabilityDataTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type CommonQuestion = {
  id: string;
  prompt: string;
  latex: string;
  hint: string;
  explanation: string;
  diagnosticIntent: string;
  taskType: ProbabilityDataTaskType;
  difficulty: 3 | 4 | 5;
  boxPlotDiagram?: BoxPlotDiagram;
  dataTableDiagram?: DataTableDiagram;
  twoWayTableDiagram?: TwoWayTableDiagram;
  vennDiagram?: VennDiagram;
};

export function richAnswer(
  question: CommonQuestion & { answer: string; acceptedAnswers: string[] },
): ProbabilityDataQualityQuestion {
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
): ProbabilityDataQualityQuestion {
  return {
    ...question,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(question.choices[index]),
    })),
  };
}

export function dataTable(
  description: string,
  columnHeaders: string[],
  values: (number | string)[][],
  rowHeaders?: string[],
): DataTableDiagram {
  return { description, columnHeaders, values, rowHeaders };
}

export function twoWayTable(
  description: string,
  rowLabels: string[],
  columnLabels: string[],
  values: (number | string)[][],
  rowTotals: (number | string)[],
  columnTotals: (number | string)[],
  grandTotal: number | string,
  highlight?: TwoWayTableDiagram["highlight"],
): TwoWayTableDiagram {
  return {
    description,
    rowLabels,
    columnLabels,
    values,
    rowTotals,
    columnTotals,
    grandTotal,
    highlight,
  };
}

export type ProbabilityDataMasteryMap = Record<
  string,
  ProbabilityDataQualityQuestion[]
>;
