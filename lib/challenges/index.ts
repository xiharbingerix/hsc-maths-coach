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
import {
  rvDiscreteChallenge,
  rvMixedChallenge,
} from "./year12AdvancedRandomVariables";
import {
  expLogParamChallenge,
  expLogExamChallenge,
  expLogIdentityChallenge,
  expLogGrowthChallenge,
  expLogExistenceChallenge,
} from "./year12AdvancedExpLog";
import {
  diffTechStandardChallenge,
  diffTechProductQuotientChallenge,
  diffTechApplicationsChallenge,
  diffTechExamChallenge,
} from "./year12AdvancedDifferentiationTechniques";
import {
  icReconstructionChallenge,
  icSignedAreaChallenge,
  icParameterChallenge,
  icAccumulationChallenge,
  icExamChallenge,
} from "./year12AdvancedIntegralCalculus";

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
  // Year 12 Advanced — Random Variables (ma-s3)
  "random-variables-probability-distributions": rvDiscreteChallenge,
  "mixed-statistical-analysis-exam-practice": rvMixedChallenge,
  // Year 12 Advanced — Exponential & Logarithmic Functions (ma-e1)
  "eulers-number-natural-logarithm": expLogParamChallenge,
  "exponential-logarithmic-exam-practice": expLogExamChallenge,
  "logarithm-laws-change-of-base": expLogIdentityChallenge,
  "exponential-growth-decay-modelling": expLogGrowthChallenge,
  "solving-equations-e-ln": expLogExistenceChallenge,
  // Year 12 Advanced — Differential Calculus / techniques (ma-c2)
  "standard-derivatives": diffTechStandardChallenge,
  "product-quotient-rules": diffTechProductQuotientChallenge,
  "applications-extended-differentiation": diffTechApplicationsChallenge,
  "differentiation-techniques-exam-practice": diffTechExamChallenge,
  // Year 12 Advanced — Integral Calculus (ma-c4; area-between-curves D6 live in year12AdvancedMore)
  "initial-conditions-particular-primitive": icReconstructionChallenge,
  "signed-area-total-area": icSignedAreaChallenge,
  "definite-integrals-fundamental-theorem": icParameterChallenge,
  "applications-total-change-motion": icAccumulationChallenge,
  "mixed-integral-calculus-exam-practice": icExamChallenge,
};

export function getChallengeQuestions(lessonSlug: string): PracticeQuestion[] {
  return REGISTRY[lessonSlug] ?? [];
}

export function hasChallenge(lessonSlug: string): boolean {
  return (REGISTRY[lessonSlug]?.length ?? 0) > 0;
}
