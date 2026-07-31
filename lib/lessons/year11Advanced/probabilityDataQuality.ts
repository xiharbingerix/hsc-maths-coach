import type { PracticeQuestion } from "../differentialCalculus";
import { probabilityDataQualityAdvanced } from "./probabilityDataQualityAdvanced";
import { probabilityDataQualityApplied } from "./probabilityDataQualityApplied";
import { probabilityDataQualityCore } from "./probabilityDataQualityCore";

const masteryBySlug = {
  ...probabilityDataQualityCore,
  ...probabilityDataQualityAdvanced,
  ...probabilityDataQualityApplied,
};

const retainedAnswerVariants: Record<string, string[]> = {
  "y11adv-pd-sets-g2": ["n(A union B)=11"],
  "y11adv-pd-sets-g3": ["n(outside A union B)=9"],
  "y11adv-pd-sets-i2": ["n(A union B)=14"],
  "y11adv-pd-sets-i3": ["n(outside A union B)=16"],
};

export const PROBABILITY_DATA_QUALITY_SLUGS = Object.freeze(
  Object.keys(masteryBySlug),
);

export function getProbabilityDataQualityMastery(
  lessonSlug: string,
): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceProbabilityDataRetainedPractice(
  questions: PracticeQuestion[],
): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    acceptedAnswers: question.choices
      ? question.acceptedAnswers
      : Array.from(
          new Set([
            question.answer,
            ...(question.acceptedAnswers ?? []),
            ...(retainedAnswerVariants[question.id] ?? []),
          ]),
        ),
  }));
}
