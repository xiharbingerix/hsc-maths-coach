import type { PracticeQuestion } from "../differentialCalculus";
import { sequencesSeriesQualityApplied } from "./sequencesSeriesQualityApplied";
import { sequencesSeriesQualityCore } from "./sequencesSeriesQualityCore";

const masteryBySlug = {
  ...sequencesSeriesQualityCore,
  ...sequencesSeriesQualityApplied,
};

const retainedExplanations: Record<string, string> = {
  "y11adv-seq-geo-i3":
    "The first differences are 3, 5, and 7, so they are not constant; the ratios are also not constant. Therefore the sequence is neither arithmetic nor geometric.",
  "y11adv-seq-gseries-g4":
    "A limiting sum requires the absolute value of the common ratio to be less than one. The selected ratio fails this condition, so its terms do not shrink to zero.",
  "y11adv-seq-exam-g1":
    "The consecutive differences are all 6, so the sequence is arithmetic with common difference 6. Its ratios are not constant, so it is not geometric.",
};

export const SEQUENCES_SERIES_QUALITY_SLUGS = Object.freeze(
  Object.keys(masteryBySlug),
);

export function getSequencesSeriesQualityMastery(
  lessonSlug: string,
): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceSequencesSeriesRetainedPractice(
  questions: PracticeQuestion[],
): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    explanation: retainedExplanations[question.id] ?? question.explanation,
    acceptedAnswers: question.choices
      ? question.acceptedAnswers
      : Array.from(
          new Set([question.answer, ...(question.acceptedAnswers ?? [])]),
        ),
  }));
}
