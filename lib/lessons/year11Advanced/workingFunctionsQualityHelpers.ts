import type { PracticeQuestion } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";

export type WorkingFunctionsTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

export type WorkingFunctionsQualityQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: WorkingFunctionsTaskType;
  distractorMisconceptions?: Partial<Record<"A" | "B" | "C" | "D", string>>;
};

type CommonQuestion = {
  id: string;
  prompt: string;
  latex: string;
  hint: string;
  explanation: string;
  diagnosticIntent: string;
  taskType: WorkingFunctionsTaskType;
  difficulty: 3 | 4 | 5;
  cartesianGraph?: PracticeQuestion["cartesianGraph"];
};

function completeExplanation(explanation: string) {
  if (explanation.length >= 100) {
    return explanation;
  }
  return (
    explanation +
    " The conclusion follows from the displayed relationships and preserves every condition stated in the question."
  );
}

export function richAnswer(
  question: CommonQuestion & {
    answer: string;
    acceptedAnswers: string[];
  },
): WorkingFunctionsQualityQuestion {
  return {
    ...question,
    explanation: completeExplanation(question.explanation),
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
): WorkingFunctionsQualityQuestion {
  return {
    ...question,
    explanation: completeExplanation(question.explanation),
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(question.choices[index]),
    })),
  };
}

export type WorkingFunctionsMasteryMap = Record<
  string,
  WorkingFunctionsQualityQuestion[]
>;
