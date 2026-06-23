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
  simpleInterestY9Challenge,
  gradientY9Challenge,
  circleY9Challenge,
} from "./year9Wave1";
import {
  integersY9Challenge,
  rationalY9Challenge,
  fractionsY9Challenge,
  ratiosY9Challenge,
  percentagesY9Challenge,
  incDecY9Challenge,
  profitsY9Challenge,
  roundingY9Challenge,
  incomeY9Challenge,
  taxY9Challenge,
  compoundDepY9Challenge,
  compoundFormulaY9Challenge,
} from "./year9Chapter1";

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
  // Year 9 Wave 1 (ADR-Y9-001): COURSE-SCOPED keys ("<course>/<lesson>"). The registry is now
  // course-aware (see getChallengeQuestions), so Year 9 slugs that collide with another course
  // (e.g. `simple-interest` ↔ Year 11 Standard) stay separate without clobbering. Keyed by each
  // derived Y9 course slug the section appears in (core-tagged → all three; consolidating → core).
  "year-9-mathematics/simple-interest": simpleInterestY9Challenge,
  "year-9-mathematics-core/simple-interest": simpleInterestY9Challenge,
  "year-9-mathematics-advanced/simple-interest": simpleInterestY9Challenge,
  "year-9-mathematics/gradient": gradientY9Challenge,
  "year-9-mathematics-core/gradient": gradientY9Challenge,
  "year-9-mathematics-advanced/gradient": gradientY9Challenge,
  "year-9-mathematics-core/circle-circumference-sector-perimeter": circleY9Challenge,
  // Year 9 Wave 2 — Chapter 1 (Computation & Financial Maths). Core-tagged sections appear in all
  // three derived courses; consolidating sections appear only in the Core pathway.
  "year-9-mathematics/decimal-places-significant-figures": roundingY9Challenge,
  "year-9-mathematics-core/decimal-places-significant-figures": roundingY9Challenge,
  "year-9-mathematics-advanced/decimal-places-significant-figures": roundingY9Challenge,
  "year-9-mathematics/income": incomeY9Challenge,
  "year-9-mathematics-core/income": incomeY9Challenge,
  "year-9-mathematics-advanced/income": incomeY9Challenge,
  "year-9-mathematics/payg-income-tax": taxY9Challenge,
  "year-9-mathematics-core/payg-income-tax": taxY9Challenge,
  "year-9-mathematics-advanced/payg-income-tax": taxY9Challenge,
  "year-9-mathematics/compound-interest-depreciation": compoundDepY9Challenge,
  "year-9-mathematics-core/compound-interest-depreciation": compoundDepY9Challenge,
  "year-9-mathematics-advanced/compound-interest-depreciation": compoundDepY9Challenge,
  "year-9-mathematics/compound-interest-formula": compoundFormulaY9Challenge,
  "year-9-mathematics-core/compound-interest-formula": compoundFormulaY9Challenge,
  "year-9-mathematics-advanced/compound-interest-formula": compoundFormulaY9Challenge,
  "year-9-mathematics-core/computations-with-integers": integersY9Challenge,
  "year-9-mathematics-core/rational-numbers": rationalY9Challenge,
  "year-9-mathematics-core/computation-with-fractions": fractionsY9Challenge,
  "year-9-mathematics-core/ratios-rates-best-buys": ratiosY9Challenge,
  "year-9-mathematics-core/percentages-and-money": percentagesY9Challenge,
  "year-9-mathematics-core/percentage-increase-decrease": incDecY9Challenge,
  "year-9-mathematics-core/profits-and-discounts": profitsY9Challenge,
};

// Look up a lesson's Level-6 challenge set. Prefers a COURSE-SCOPED key ("<course>/<lesson>") so
// the same lesson slug can carry different challenges in different courses; falls back to the
// legacy lesson-only key for the existing (pre-course-scoping) challenge sets. Backwards compatible:
// callers that omit courseSlug get the legacy behaviour unchanged.
export function getChallengeQuestions(lessonSlug: string, courseSlug?: string): PracticeQuestion[] {
  if (courseSlug) {
    const scoped = REGISTRY[`${courseSlug}/${lessonSlug}`];
    if (scoped) return scoped;
  }
  return REGISTRY[lessonSlug] ?? [];
}

export function hasChallenge(lessonSlug: string, courseSlug?: string): boolean {
  return getChallengeQuestions(lessonSlug, courseSlug).length > 0;
}
