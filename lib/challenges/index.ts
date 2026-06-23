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
import {
  algebraicExpressionsY9Challenge,
  simplifyingY9Challenge,
  expandingY9Challenge,
  usingFormulasY9Challenge,
  linearOneSideY9Challenge,
  linearBothSidesY9Challenge,
  wordProblemsY9Challenge,
  inequalitiesY9Challenge,
  substitutionY9Challenge,
  eliminationY9Challenge,
  simProblemsY9Challenge,
  quadraticAx2cY9Challenge,
} from "./year9Chapter2";
import {
  pythTheoremY9Challenge,
  pythShorterY9Challenge,
  pyth2dY9Challenge,
  pyth3dY9Challenge,
  trigRatiosY9Challenge,
  findSidesY9Challenge,
  solveDenomY9Challenge,
  findAnglesY9Challenge,
  trigAppsY9Challenge,
  bearingsY9Challenge,
} from "./year9Chapter3";
import {
  introLinearY9Challenge,
  interceptsY9Challenge,
  linesOneInterceptY9Challenge,
  directPropY9Challenge,
  gradInterceptY9Challenge,
  findEqnY9Challenge,
  linearModelY9Challenge,
  midpointY9Challenge,
  perpParallelY9Challenge,
  graphSimY9Challenge,
} from "./year9Chapter4";
import {
  perimeterY9Challenge,
  areaY9Challenge,
  compositeY9Challenge,
  saPrismsY9Challenge,
  saCylindersY9Challenge,
  volPrismsY9Challenge,
  volCylindersY9Challenge,
} from "./year9Chapter5";
import {
  indexNotationY9Challenge,
  indexMultDivY9Challenge,
  zeroPowerY9Challenge,
  indexExtY9Challenge,
  negIndicesY9Challenge,
  sciNotationY9Challenge,
  sciNotationSfY9Challenge,
  fracIndicesY9Challenge,
  surdsOpsY9Challenge,
} from "./year9Chapter6";
import {
  anglesTriY9Challenge,
  parallelLinesY9Challenge,
  polygonsY9Challenge,
  congruentY9Challenge,
  congProofY9Challenge,
  enlargementY9Challenge,
  similarTriY9Challenge,
  provingSimilarY9Challenge,
} from "./year9Chapter7";

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
  // Year 9 Wave 3 — Chapter 2 (Expressions, Equations & Inequalities). consolidating → Core only;
  // core → all three derived courses; path → base + advanced (not Core).
  "year-9-mathematics-core/algebraic-expressions": algebraicExpressionsY9Challenge,
  "year-9-mathematics-core/simplifying-algebraic-expressions": simplifyingY9Challenge,
  "year-9-mathematics/expanding-algebraic-expressions": expandingY9Challenge,
  "year-9-mathematics-core/expanding-algebraic-expressions": expandingY9Challenge,
  "year-9-mathematics-advanced/expanding-algebraic-expressions": expandingY9Challenge,
  "year-9-mathematics/using-formulas": usingFormulasY9Challenge,
  "year-9-mathematics-core/using-formulas": usingFormulasY9Challenge,
  "year-9-mathematics-advanced/using-formulas": usingFormulasY9Challenge,
  "year-9-mathematics/linear-equations-one-side": linearOneSideY9Challenge,
  "year-9-mathematics-core/linear-equations-one-side": linearOneSideY9Challenge,
  "year-9-mathematics-advanced/linear-equations-one-side": linearOneSideY9Challenge,
  "year-9-mathematics/linear-equations-both-sides": linearBothSidesY9Challenge,
  "year-9-mathematics-core/linear-equations-both-sides": linearBothSidesY9Challenge,
  "year-9-mathematics-advanced/linear-equations-both-sides": linearBothSidesY9Challenge,
  "year-9-mathematics/solving-word-problems": wordProblemsY9Challenge,
  "year-9-mathematics-core/solving-word-problems": wordProblemsY9Challenge,
  "year-9-mathematics-advanced/solving-word-problems": wordProblemsY9Challenge,
  "year-9-mathematics/linear-inequalities": inequalitiesY9Challenge,
  "year-9-mathematics-advanced/linear-inequalities": inequalitiesY9Challenge,
  "year-9-mathematics/simultaneous-substitution": substitutionY9Challenge,
  "year-9-mathematics-advanced/simultaneous-substitution": substitutionY9Challenge,
  "year-9-mathematics/simultaneous-elimination": eliminationY9Challenge,
  "year-9-mathematics-advanced/simultaneous-elimination": eliminationY9Challenge,
  "year-9-mathematics/simultaneous-equations-problems": simProblemsY9Challenge,
  "year-9-mathematics-advanced/simultaneous-equations-problems": simProblemsY9Challenge,
  "year-9-mathematics/quadratic-equations-ax2-c": quadraticAx2cY9Challenge,
  "year-9-mathematics-advanced/quadratic-equations-ax2-c": quadraticAx2cY9Challenge,
  // Year 9 Wave 4 — Chapter 3 (Pythagoras & Trigonometry). consolidating → Core only;
  // path (pythagoras-3d-problems) → base + advanced; core → all three derived courses.
  "year-9-mathematics-core/pythagoras-theorem": pythTheoremY9Challenge,
  "year-9-mathematics-core/pythagoras-shorter-sides": pythShorterY9Challenge,
  "year-9-mathematics-core/pythagoras-2d-problems": pyth2dY9Challenge,
  "year-9-mathematics/pythagoras-3d-problems": pyth3dY9Challenge,
  "year-9-mathematics-advanced/pythagoras-3d-problems": pyth3dY9Challenge,
  "year-9-mathematics/introducing-trigonometric-ratios": trigRatiosY9Challenge,
  "year-9-mathematics-core/introducing-trigonometric-ratios": trigRatiosY9Challenge,
  "year-9-mathematics-advanced/introducing-trigonometric-ratios": trigRatiosY9Challenge,
  "year-9-mathematics/finding-unknown-side-lengths": findSidesY9Challenge,
  "year-9-mathematics-core/finding-unknown-side-lengths": findSidesY9Challenge,
  "year-9-mathematics-advanced/finding-unknown-side-lengths": findSidesY9Challenge,
  "year-9-mathematics/solving-for-the-denominator": solveDenomY9Challenge,
  "year-9-mathematics-core/solving-for-the-denominator": solveDenomY9Challenge,
  "year-9-mathematics-advanced/solving-for-the-denominator": solveDenomY9Challenge,
  "year-9-mathematics/finding-unknown-angles": findAnglesY9Challenge,
  "year-9-mathematics-core/finding-unknown-angles": findAnglesY9Challenge,
  "year-9-mathematics-advanced/finding-unknown-angles": findAnglesY9Challenge,
  "year-9-mathematics/trigonometry-applications": trigAppsY9Challenge,
  "year-9-mathematics-core/trigonometry-applications": trigAppsY9Challenge,
  "year-9-mathematics-advanced/trigonometry-applications": trigAppsY9Challenge,
  "year-9-mathematics/bearings": bearingsY9Challenge,
  "year-9-mathematics-core/bearings": bearingsY9Challenge,
  "year-9-mathematics-advanced/bearings": bearingsY9Challenge,
  // Year 9 Wave 5 — Chapter 4 (Linear Relationships). consolidating → Core only; path → base +
  // advanced; core → all three. (gradient itself is registered in the Wave 1 block.)
  "year-9-mathematics-core/introducing-linear-relationships": introLinearY9Challenge,
  "year-9-mathematics/graphing-lines-using-intercepts": interceptsY9Challenge,
  "year-9-mathematics-advanced/graphing-lines-using-intercepts": interceptsY9Challenge,
  "year-9-mathematics/lines-with-one-intercept": linesOneInterceptY9Challenge,
  "year-9-mathematics-core/lines-with-one-intercept": linesOneInterceptY9Challenge,
  "year-9-mathematics-advanced/lines-with-one-intercept": linesOneInterceptY9Challenge,
  "year-9-mathematics/gradient-direct-proportion": directPropY9Challenge,
  "year-9-mathematics-advanced/gradient-direct-proportion": directPropY9Challenge,
  "year-9-mathematics/gradient-intercept-form": gradInterceptY9Challenge,
  "year-9-mathematics-core/gradient-intercept-form": gradInterceptY9Challenge,
  "year-9-mathematics-advanced/gradient-intercept-form": gradInterceptY9Challenge,
  "year-9-mathematics/finding-equation-of-a-line": findEqnY9Challenge,
  "year-9-mathematics-core/finding-equation-of-a-line": findEqnY9Challenge,
  "year-9-mathematics-advanced/finding-equation-of-a-line": findEqnY9Challenge,
  "year-9-mathematics/linear-modelling": linearModelY9Challenge,
  "year-9-mathematics-core/linear-modelling": linearModelY9Challenge,
  "year-9-mathematics-advanced/linear-modelling": linearModelY9Challenge,
  "year-9-mathematics/midpoint-length-segment": midpointY9Challenge,
  "year-9-mathematics-core/midpoint-length-segment": midpointY9Challenge,
  "year-9-mathematics-advanced/midpoint-length-segment": midpointY9Challenge,
  "year-9-mathematics/perpendicular-parallel-lines": perpParallelY9Challenge,
  "year-9-mathematics-advanced/perpendicular-parallel-lines": perpParallelY9Challenge,
  "year-9-mathematics/graphical-solutions-simultaneous": graphSimY9Challenge,
  "year-9-mathematics-advanced/graphical-solutions-simultaneous": graphSimY9Challenge,
  // Year 9 Wave 6 — Chapter 5 (Length, Area, Surface Area & Volume). consolidating → Core only;
  // path (surface-area-prisms-pyramids) → base + advanced; core → all 3. (circle is Wave 1.)
  "year-9-mathematics-core/length-and-perimeter": perimeterY9Challenge,
  "year-9-mathematics-core/area": areaY9Challenge,
  "year-9-mathematics/composite-shapes-perimeter-area": compositeY9Challenge,
  "year-9-mathematics-core/composite-shapes-perimeter-area": compositeY9Challenge,
  "year-9-mathematics-advanced/composite-shapes-perimeter-area": compositeY9Challenge,
  "year-9-mathematics/surface-area-prisms-pyramids": saPrismsY9Challenge,
  "year-9-mathematics-advanced/surface-area-prisms-pyramids": saPrismsY9Challenge,
  "year-9-mathematics/surface-area-cylinders": saCylindersY9Challenge,
  "year-9-mathematics-core/surface-area-cylinders": saCylindersY9Challenge,
  "year-9-mathematics-advanced/surface-area-cylinders": saCylindersY9Challenge,
  "year-9-mathematics/volume-prisms": volPrismsY9Challenge,
  "year-9-mathematics-core/volume-prisms": volPrismsY9Challenge,
  "year-9-mathematics-advanced/volume-prisms": volPrismsY9Challenge,
  "year-9-mathematics/volume-cylinders": volCylindersY9Challenge,
  "year-9-mathematics-core/volume-cylinders": volCylindersY9Challenge,
  "year-9-mathematics-advanced/volume-cylinders": volCylindersY9Challenge,
  // Year 9 Wave 7 — Chapter 6 (Indices & Surds). core → all 3; path → base + advanced.
  "year-9-mathematics/index-notation": indexNotationY9Challenge,
  "year-9-mathematics-core/index-notation": indexNotationY9Challenge,
  "year-9-mathematics-advanced/index-notation": indexNotationY9Challenge,
  "year-9-mathematics/index-laws-multiplying-dividing": indexMultDivY9Challenge,
  "year-9-mathematics-core/index-laws-multiplying-dividing": indexMultDivY9Challenge,
  "year-9-mathematics-advanced/index-laws-multiplying-dividing": indexMultDivY9Challenge,
  "year-9-mathematics/zero-index-power-of-power": zeroPowerY9Challenge,
  "year-9-mathematics-core/zero-index-power-of-power": zeroPowerY9Challenge,
  "year-9-mathematics-advanced/zero-index-power-of-power": zeroPowerY9Challenge,
  "year-9-mathematics/index-laws-extended": indexExtY9Challenge,
  "year-9-mathematics-advanced/index-laws-extended": indexExtY9Challenge,
  "year-9-mathematics/negative-indices": negIndicesY9Challenge,
  "year-9-mathematics-advanced/negative-indices": negIndicesY9Challenge,
  "year-9-mathematics/scientific-notation": sciNotationY9Challenge,
  "year-9-mathematics-core/scientific-notation": sciNotationY9Challenge,
  "year-9-mathematics-advanced/scientific-notation": sciNotationY9Challenge,
  "year-9-mathematics/scientific-notation-significant-figures": sciNotationSfY9Challenge,
  "year-9-mathematics-core/scientific-notation-significant-figures": sciNotationSfY9Challenge,
  "year-9-mathematics-advanced/scientific-notation-significant-figures": sciNotationSfY9Challenge,
  "year-9-mathematics/fractional-indices-surds": fracIndicesY9Challenge,
  "year-9-mathematics-advanced/fractional-indices-surds": fracIndicesY9Challenge,
  "year-9-mathematics/operations-with-surds": surdsOpsY9Challenge,
  "year-9-mathematics-advanced/operations-with-surds": surdsOpsY9Challenge,
  // Year 9 Wave 8 — Chapter 7 (Properties of Geometrical Figures). consolidating → Core only;
  // core → all 3; path → base + advanced.
  "year-9-mathematics-core/angles-and-triangles": anglesTriY9Challenge,
  "year-9-mathematics-core/parallel-lines": parallelLinesY9Challenge,
  "year-9-mathematics/quadrilaterals-polygons": polygonsY9Challenge,
  "year-9-mathematics-advanced/quadrilaterals-polygons": polygonsY9Challenge,
  "year-9-mathematics/congruent-triangles": congruentY9Challenge,
  "year-9-mathematics-advanced/congruent-triangles": congruentY9Challenge,
  "year-9-mathematics/congruence-in-proof": congProofY9Challenge,
  "year-9-mathematics-advanced/congruence-in-proof": congProofY9Challenge,
  "year-9-mathematics/enlargement-similar-figures": enlargementY9Challenge,
  "year-9-mathematics-core/enlargement-similar-figures": enlargementY9Challenge,
  "year-9-mathematics-advanced/enlargement-similar-figures": enlargementY9Challenge,
  "year-9-mathematics/similar-triangles": similarTriY9Challenge,
  "year-9-mathematics-core/similar-triangles": similarTriY9Challenge,
  "year-9-mathematics-advanced/similar-triangles": similarTriY9Challenge,
  "year-9-mathematics/proving-similar-triangles": provingSimilarY9Challenge,
  "year-9-mathematics-advanced/proving-similar-triangles": provingSimilarY9Challenge,
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
