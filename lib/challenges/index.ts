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
import {
  combinationsChallenge,
  rootsCoefficientsChallenge,
  doubleAngleChallenge,
} from "./year11Extension1";
import {
  rightAngleTrigAppliedChallenge,
  summaryStatsChallenge,
  depreciationChallenge,
} from "./year12Standard1";
import {
  complexArithmeticChallenge,
  modulusArgumentChallenge,
  polarDeMoivreChallenge,
} from "./year12Extension2";
import {
  gradientY9Challenge,
  circleY9Challenge,
} from "./year9Wave1";

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
  // Y10 restructure: algebraic-techniques unit dissolved; surds/indices challenge now keyed
  // to the live surds lesson it best matches (simplify/combine surds + fractional indices).
  "adding-subtracting-surds": surdsIndicesChallenge,
  // Year 11 Standard
  "simple-interest": simpleInterestChallenge,
  "speed-distance-time": speedDistanceTimeChallenge,
  "box-plots-five-number-summary": fiveNumberSummaryChallenge,
  // Year 11 Extension
  combinations: combinationsChallenge,
  "roots-and-coefficients": rootsCoefficientsChallenge,
  "double-angle-formulae": doubleAngleChallenge,
  // Year 12 Standard 1 (shared slugs add depth to Standard 2 / Year 11 too)
  "right-angle-trig-applications": rightAngleTrigAppliedChallenge,
  "data-displays-summary-statistics": summaryStatsChallenge,
  "depreciation-loans": depreciationChallenge,
  // Year 12 Extension 2
  "complex-number-arithmetic": complexArithmeticChallenge,
  "modulus-argument-conjugate": modulusArgumentChallenge,
  "polar-form-de-moivre": polarDeMoivreChallenge,
  // Year 9 Wave 1 validation sample (ADR-Y9-001). NOTE: the registry is keyed by lesson slug only
  // (not course-scoped), so the Y9 `simple-interest` D6 set is intentionally NOT registered here —
  // that slug already maps to the Year 11 Standard set and must not be clobbered. This slug
  // collision is a Wave 1 validation finding: course-scope the registry before scaling Y9 D6.
  "gradient": gradientY9Challenge,
  "circle-circumference-sector-perimeter": circleY9Challenge,
};

export function getChallengeQuestions(lessonSlug: string): PracticeQuestion[] {
  return REGISTRY[lessonSlug] ?? [];
}

export function hasChallenge(lessonSlug: string): boolean {
  return (REGISTRY[lessonSlug]?.length ?? 0) > 0;
}
