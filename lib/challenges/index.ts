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
  functionsParamChallenge,
  functionsTransformChallenge,
  functionsModellingChallenge,
  functionsReciprocalChallenge,
} from "./year12AdvancedFunctions";
import {
  functionsAsymptoteChallenge,
  functionsExpLogChallenge,
  functionsInverseChallenge,
  functionsAbsoluteChallenge,
} from "./year12AdvancedFunctionsGraphing";
import {
  polynomialsVietaChallenge,
  polynomialsFactorChallenge,
  polynomialsGraphChallenge,
} from "./year11ExtensionPolynomials";
import {
  statsCentreChallenge,
  statsSdChallenge,
  statsRegressionChallenge,
  statsSpreadChallenge,
} from "./year12AdvancedStatistics";
import {
  probabilityBayesChallenge,
  probabilityIndependenceChallenge,
  probabilityExamChallenge,
} from "./year12AdvancedProbability";

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
  "roots-and-coefficients": [
    ...rootsCoefficientsChallenge,
    ...polynomialsVietaChallenge,
  ],
  // Year 11 Extension — Polynomials top-up
  "factor-theorem-factorisation": polynomialsFactorChallenge,
  "polynomial-graphs": polynomialsGraphChallenge,
  "double-angle-formulae": doubleAngleChallenge,
  // Year 12 Standard 1 (shared slugs add depth to Standard 2 / Year 11 too)
  "right-angle-trig-applications": rightAngleTrigAppliedChallenge,
  "data-displays-summary-statistics": summaryStatsChallenge,
  "depreciation-loans": depreciationChallenge,
  // Year 12 Extension 2
  "complex-number-arithmetic": complexArithmeticChallenge,
  "modulus-argument-conjugate": modulusArgumentChallenge,
  "polar-form-de-moivre": polarDeMoivreChallenge,
  // Year 12 Advanced — Working with Functions (ma-f1); spread across lessons so the
  // D6 items carry distinct subtopic slugs.
  "intercepts-key-features": functionsParamChallenge,
  "graph-transformations": functionsTransformChallenge,
  "modelling-with-functions": functionsModellingChallenge,
  "solving-equations-inequalities-graphically": functionsReciprocalChallenge,
  // Year 12 Advanced — Graphing techniques (ma-f2)
  "asymptotes-reciprocal-graphs": functionsAsymptoteChallenge,
  "exponential-logarithmic-graphs": functionsExpLogChallenge,
  "inverse-functions": functionsInverseChallenge,
  "absolute-value-functions": functionsAbsoluteChallenge,
  // Year 12 Advanced — Descriptive statistics & bivariate data (ma-s2)
  "data-displays-measures-of-centre": statsCentreChallenge,
  "standard-deviation-z-scores-standardised-values": statsSdChallenge,
  "correlation-least-squares-regression": statsRegressionChallenge,
  "spread-iqr-box-plots-outliers": statsSpreadChallenge,
  // Year 12 Advanced — Probability (ma-s1; ma-s3 owns distribution/E[X]/Var)
  "conditional-probability-tree-diagrams": probabilityBayesChallenge,
  "independence-multiplication-rule": probabilityIndependenceChallenge,
  "probability-exam-practice": probabilityExamChallenge,
};

export function getChallengeQuestions(lessonSlug: string): PracticeQuestion[] {
  return REGISTRY[lessonSlug] ?? [];
}

export function hasChallenge(lessonSlug: string): boolean {
  return (REGISTRY[lessonSlug]?.length ?? 0) > 0;
}
