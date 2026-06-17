import type { PracticeQuestion } from "../lessons/differentialCalculus";
import { year12AdvancedOptimisationChallenge } from "./year12AdvancedOptimisation";
import {
  differentiatingPolynomialFunctionsChallenge,
  tangentsAndNormalsChallenge,
  stationaryPointsChallenge,
} from "./year12AdvancedDifferentialCalculus";
import {
  areaBetweenCurvesChallenge,
  trigonometricEquationsChallenge,
  futureValueAnnuitiesChallenge,
  normalDistributionChallenge,
} from "./year12AdvancedMore";
import {
  inverseTrigChallenge,
  vectorsChallenge,
  inductionChallenge,
} from "./year12Extension1";
import {
  compoundInterestChallenge,
  sineCosineRuleChallenge,
  zScoresChallenge,
} from "./year12Standard2";
import {
  discriminantChallenge,
  completingSquareChallenge,
  surdsIndicesChallenge,
} from "./year11Advanced";
import {
  simpleInterestChallenge,
  speedDistanceTimeChallenge,
  fiveNumberSummaryChallenge,
} from "./year11Standard";

/**
 * Skill Map V2 — Level-6 challenge layer.
 *
 * Optional, harder (D6 / synoptic) questions unlocked AFTER a student passes a
 * lesson's mastery quiz. Keyed by lesson slug and kept separate from the lesson
 * catalog so they're additive (no churn to the ~13k-question bank). Rendered and
 * CAS-marked with the same practice card as ordinary practice.
 */
const REGISTRY: Record<string, PracticeQuestion[]> = {
  optimisation: year12AdvancedOptimisationChallenge,
  "differentiating-polynomial-functions":
    differentiatingPolynomialFunctionsChallenge,
  "tangents-and-normals": tangentsAndNormalsChallenge,
  "stationary-points": stationaryPointsChallenge,
  "area-between-two-curves": areaBetweenCurvesChallenge,
  "trigonometric-equations": trigonometricEquationsChallenge,
  "future-value-annuities": futureValueAnnuitiesChallenge,
  "normal-distribution-empirical-rule": normalDistributionChallenge,
  // Year 12 Extension 1
  "inverse-trig": inverseTrigChallenge,
  vectors: vectorsChallenge,
  "intro-to-mathematical-induction": inductionChallenge,
  // Year 12 Standard 2
  "investment-compound-interest": compoundInterestChallenge,
  "sine-rule-cosine-rule-area-triangle": sineCosineRuleChallenge,
  "normal-distribution-z-scores": zScoresChallenge,
  // Year 11 Advanced
  "quadratic-equations-discriminant": discriminantChallenge,
  "completing-the-square": completingSquareChallenge,
  "algebraic-techniques": surdsIndicesChallenge,
  // Year 11 Standard
  "simple-interest": simpleInterestChallenge,
  "speed-distance-time": speedDistanceTimeChallenge,
  "box-plots-five-number-summary": fiveNumberSummaryChallenge,
};

export function getChallengeQuestions(lessonSlug: string): PracticeQuestion[] {
  return REGISTRY[lessonSlug] ?? [];
}

export function hasChallenge(lessonSlug: string): boolean {
  return (REGISTRY[lessonSlug]?.length ?? 0) > 0;
}
