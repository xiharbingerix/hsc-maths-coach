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
  directInverseVariationChallenge,
} from "./year11Advanced";
import {
  simpleInterestChallenge,
  speedDistanceTimeChallenge,
  fiveNumberSummaryChallenge,
  summaryStatsDisplaysChallenge,
  outlierEffectChallenge,
  groupedDataChallenge,
  boxPlotChallenge,
  stemLeafChallenge,
  timeSeriesChallenge,
  dataExamChallenge,
  samplingMethodsChallenge,
  dataRevisionChallenge,
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
  proofContradictionChallenge,
  proofContrapositiveChallenge,
  proofInequalitiesChallenge,
  proofInductionChallenge,
} from "./year12Extension2Proof";
import {
  calcReductionChallenge,
  calcPartialFractionsChallenge,
  calcSymmetryChallenge,
  calcTSubstitutionChallenge,
  calcVolumeChallenge,
  calcCompletingSquareChallenge,
} from "./year12Extension2Calculus";
import {
  mechForcesChallenge,
  mechRectilinearChallenge,
  mechShmChallenge,
  mechCircularChallenge,
  mechResistedChallenge,
  mechProjectileChallenge,
} from "./year12Extension2Mechanics";
import {
  vec3dMagnitudeChallenge,
  vec3dPerpendicularChallenge,
  vec3dLineChallenge,
  vec3dProjectionChallenge,
  vec3dSphereChallenge,
  vec3dProofChallenge,
} from "./year12Extension2Vectors3D";
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
import {
  trigParamChallenge,
  trigDoubleAngleChallenge,
  trigIdentityChallenge,
  trigExistenceChallenge,
  trigBehaviourChallenge,
  trigQuadrantChallenge,
} from "./year12AdvancedTrigIdentities";
import {
  trigEqCountChallenge,
  trigEqStructureChallenge,
} from "./year12AdvancedTrigEquations";
import { trigMeasureChallenge } from "./year12AdvancedTrigMeasure";
import {
  vectorsCollinearityChallenge,
  vectorsGeometryChallenge,
  vectorsDotProductChallenge,
  vectorsProjectionChallenge,
} from "./year12Extension1Vectors";
import {
  integersNumberLineChallenge,
  addingSubtractingIntegersChallenge,
  multiplyingDividingIntegersChallenge,
  orderOfOperationsIntegersChallenge,
  integersProblemSolvingChallenge,
} from "./year7Integers";
import {
  perimeterOfPolygonsChallenge,
  perimeterCompositeShapesChallenge,
  perimeterProblemSolvingChallenge,
  areaRectanglesTrianglesChallenge,
  areaParallelogramsTrapezoidsChallenge,
  areaCompositeShapesChallenge,
  areaProblemSolvingChallenge,
  volumeOfPrismsChallenge,
  volumeOfCylindersChallenge,
} from "./year7Measurement";
import {
  calcAppsGrowthChallenge,
  calcAppsShmChallenge,
  calcAppsRatesChallenge,
  calcAppsExamChallenge,
} from "./year12Extension1CalculusApplications";
import {
  fcalcTrigChallenge,
  fcalcSubstitutionChallenge,
  fcalcPartsChallenge,
  fcalcExamChallenge,
} from "./year12Extension1FurtherCalculus";
import {
  kinVelocityAccelChallenge,
  kinDisplacementChallenge,
  kinMotionAnalysisChallenge,
  kinExamChallenge,
} from "./year12Extension1Kinematics";
import {
  bdMeanVarianceChallenge,
  bdSamplingChallenge,
  bdProbabilitiesChallenge,
  bdExamChallenge,
} from "./year12Extension1BinomialDistribution";
import {
  itPrincipalChallenge,
  itTangentChallenge,
  itDifferentiatingChallenge,
  itPropertiesChallenge,
} from "./year12Extension1InverseTrig";
import {
  factorsMultiplesHcfLcmChallenge,
  primesPrimeFactorisationChallenge,
  squaresCubesIndexNotationChallenge,
  indexLawsProductQuotientPowerChallenge,
  zeroIndexMixedIndicesChallenge,
  oneStepEquationsChallenge,
  twoStepEquationsChallenge,
  equationsWordedProblemsChallenge,
  quadraticAx2EqualsCChallenge,
} from "./year7Algebra";
import {
  fractionsTypesEquivalenceChallenge,
  comparingOrderingFractionsChallenge,
  addingSubtractingFractionsChallenge as y7AddingSubtractingFractionsChallenge,
  multiplyingDividingFractionsChallenge,
  fractionsDecimalsConversionChallenge,
  decimalsOperationsChallenge,
  convertingFractionsDecimalsPercentagesChallenge,
  percentageOfQuantityChallenge,
  percentageIncreaseDecreaseChallenge,
  percentageApplicationsChallenge,
} from "./year7Numbers";
import {
  angleTypesRelationshipsChallenge,
  anglesInTrianglesChallenge,
  anglesInQuadrilateralsChallenge,
  parallelLinesTransversalsChallenge,
  angleRelationshipsProblemSolvingChallenge,
  introductionToRatiosChallenge,
  dividingQuantitiesInRatioChallenge,
  ratesUnitRatesChallenge,
  speedDistanceTimeChallenge as y7SpeedDistanceTimeChallenge,
  scaleDrawingsChallenge,
} from "./year7AnglesRatios";
import {
  dataTypesCollectionChallenge,
  frequencyTablesChallenge as y7FrequencyTablesChallenge,
  dotPlotsStemLeafChallenge,
  columnBarLineGraphsChallenge,
  choosingInterpretingDisplaysChallenge,
  probabilityLanguageScaleChallenge,
  simpleProbabilityChallenge,
  twoStepChanceExperimentsChallenge,
  relativeFrequencyChallenge,
  expectedOutcomesChallenge,
} from "./year7DataProbability";
import {
  numberPatternsRulesChallenge as y8NumberPatternsRulesChallenge,
  coordinatesPointsChallenge as y8CoordinatesPointsChallenge,
  tablesOfValuesChallenge as y8TablesOfValuesChallenge,
  graphingLinearRelationshipsChallenge as y8GraphingLinearChallenge,
  gradientRateOfChangeChallenge as y8GradientRateChallenge,
  interpretingLinearGraphsChallenge as y8InterpretingLinearChallenge,
  rightAngledTrianglesPythagorasChallenge as y8RightAngledPythagChallenge,
  findingHypotenuseChallenge as y8FindingHypotenuseChallenge,
  findingShorterSideChallenge as y8FindingShorterSideChallenge,
  pythagorasRealContextsChallenge as y8PythagRealContextsChallenge,
  pythagoreanTriplesChallenge as y8PythagoreanTriplesChallenge,
  distanceBetweenPointsChallenge as y8DistanceBetweenPointsChallenge,
} from "./year8LinearPythagoras";
import {
  anglesTrianglesQuadrilateralsChallenge as y8AnglesTriQuadChallenge,
  propertiesOfPolygonsChallenge as y8PropertiesOfPolygonsChallenge,
  congruentTrianglesChallenge as y8CongruentTrianglesChallenge,
  geometricReasoningChallenge as y8GeometricReasoningChallenge,
  quadrilateralPropertiesChallenge as y8QuadrilateralPropertiesChallenge,
  surfaceAreaPrismsChallenge as y8SurfaceAreaPrismsChallenge,
  surfaceAreaCylindersChallenge as y8SurfaceAreaCylindersChallenge,
  surfaceAreaCompositeSolidsChallenge as y8SurfaceAreaCompositeChallenge,
  volumeOfPrismsY8Challenge,
  volumeOfCylindersY8Challenge,
  volumeOfCompositeSolidsChallenge as y8VolumeCompositeChallenge,
} from "./year8GeometryMeasurement";
import {
  algebraicFractionsChallenge as y8AlgebraicFractionsChallenge,
  expandingExpressionsChallenge as y8ExpandingExpressionsChallenge,
  binomialProductsChallenge as y8BinomialProductsChallenge,
  equivalentExpressionsChallenge as y8EquivalentExpressionsChallenge,
  negativeIndicesChallenge as y8NegativeIndicesChallenge,
  scientificNotationLargeChallenge as y8SciNotationLargeChallenge,
  scientificNotationSmallChallenge as y8SciNotationSmallChallenge,
  significantFiguresChallenge as y8SignificantFiguresChallenge,
  operationsScientificNotationChallenge as y8OpsSciNotationChallenge,
  advancedIndexManipulationChallenge as y8AdvancedIndexChallenge,
  algebraicBasesChallenge as y8AlgebraicBasesChallenge,
  indicialEquationsChallenge as y8IndicialEquationsChallenge,
} from "./year8AlgebraIndices";
import {
  meanMedianModeRangeChallenge as y8MeanMedianModeRangeChallenge,
  comparingDataDisplaysChallenge as y8ComparingDataDisplaysChallenge,
  stemAndLeafPlotsChallenge as y8StemAndLeafPlotsChallenge,
  quartilesIqrChallenge as y8QuartilesIqrChallenge,
  outliersInterpretationChallenge as y8OutliersInterpretationChallenge,
  boxPlotsChallenge as y8BoxPlotsChallenge,
  comparingBoxPlotsChallenge as y8ComparingBoxPlotsChallenge,
  shapeOfDistributionsChallenge as y8ShapeOfDistributionsChallenge,
} from "./year8Data";
import {
  networkFundamentalsChallenge as y8NetworkFundamentalsChallenge,
  pathsCircuitsChallenge as y8PathsCircuitsChallenge,
  eulerianTrailsCircuitsChallenge as y8EulerianTrailsChallenge,
  planarGraphsChallenge as y8PlanarGraphsChallenge,
  networkApplicationsChallenge as y8NetworkApplicationsChallenge,
  simpleInterestIntroChallenge as y8SimpleInterestIntroChallenge,
  wagesSalaryChallenge as y8WagesSalaryChallenge,
  incomeTaxBasicsChallenge as y8IncomeTaxBasicsChallenge,
  budgetingMoneyManagementChallenge as y8BudgetingChallenge,
  creditDebitChallenge as y8CreditDebitChallenge,
  statisticalQuestionsChallenge as y8StatisticalQuestionsChallenge,
  dataCollectionChallenge as y8DataCollectionChallenge,
  statisticalAnalysisChallenge as y8StatisticalAnalysisChallenge,
  communicatingFindingsChallenge as y8CommunicatingFindingsChallenge,
} from "./year8NetworksFinanceData";
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
  linearEquationsFractionsY9Challenge,
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
import {
  reviewProbY9Challenge,
  vennY9Challenge,
  setNotationY9Challenge,
  arraysY9Challenge,
  treeY9Challenge,
  relFreqY9Challenge,
  samplingY9Challenge,
  meanMedianY9Challenge,
  stemLeafY9Challenge,
  groupingY9Challenge,
  iqrY9Challenge,
  boxPlotY9Challenge,
  interpretingDataY9Challenge,
} from "./year9Chapter8";
import {
  ebpY9Challenge,
  psdY9Challenge,
  faeY9Challenge,
  fdsY9Challenge,
  fbgY9Challenge,
  fmtY9Challenge,
  fntY9Challenge,
  afmdY9Challenge,
  afasY9Challenge,
  fafsY9Challenge,
  eafY9Challenge,
} from "./year9Chapter9";
import {
  qeY9Challenge,
  sqfbY9Challenge,
  sqfY9Challenge,
  qepY9Challenge,
  parY9Challenge,
  sdrY9Challenge,
  strY9Challenge,
  spiY9Challenge,
} from "./year9Chapter10";

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
  // Year 12 Extension 1 — Vectors high-difficulty pool (per-lesson, ≤2 each)
  "vectors-scalars-notation": vectorsCollinearityChallenge,
  "vector-addition-subtraction": vectorsGeometryChallenge,
  "dot-product": vectorsDotProductChallenge,
  "vector-projections-applications": vectorsProjectionChallenge,
  // Year 12 Extension 1 — Calculus Applications high-difficulty pool (per-lesson, ≤2 each)
  "newtons-law-cooling-growth-decay": calcAppsGrowthChallenge,
  "simple-harmonic-motion-intro": calcAppsShmChallenge,
  "related-rates-of-change": calcAppsRatesChallenge,
  "calculus-applications-exam-practice": calcAppsExamChallenge,
  // Year 12 Extension 1 — Further Calculus (integration) high-difficulty pool (per-lesson, ≤2 each)
  "trig-integrals": fcalcTrigChallenge,
  "simple-substitution": fcalcSubstitutionChallenge,
  "integration-by-parts": fcalcPartsChallenge,
  "further-calculus-exam-practice": fcalcExamChallenge,
  // Year 12 Extension 1 — Kinematics (calculus-based motion) high-difficulty pool (per-lesson, ≤2 each)
  "kinematics-velocity-acceleration": kinVelocityAccelChallenge,
  "kinematics-displacement-from-velocity": kinDisplacementChallenge,
  "kinematics-motion-analysis": kinMotionAnalysisChallenge,
  "kinematics-exam-practice": kinExamChallenge,
  // Year 12 Extension 1 — Binomial Distribution high-difficulty pool (per-lesson, ≤2 each)
  "mean-and-variance": bdMeanVarianceChallenge,
  "sampling-distribution-mean": bdSamplingChallenge,
  "binomial-probabilities": bdProbabilitiesChallenge,
  "binomial-exam-practice": bdExamChallenge,
  // Year 12 Extension 1 — Inverse Trigonometric Functions high-difficulty pool (per-lesson, ≤2 each)
  "inverse-sine-cosine": itPrincipalChallenge,
  "inverse-tangent": itTangentChallenge,
  "differentiating-inverse-trig": itDifferentiatingChallenge,
  "inverse-trig-properties": itPropertiesChallenge,
  // Year 12 Standard 2
  "investment-compound-interest": compoundInterestChallenge,
  "sine-rule-cosine-rule-area-triangle": sineCosineRuleChallenge,
  "normal-distribution-z-scores": zScoresChallenge,
  // Year 11 Advanced
  "quadratic-equations-discriminant": discriminantChallenge,
  "completing-the-square": completingSquareChallenge,
  "year-11-advanced/direct-inverse-variation": directInverseVariationChallenge,
  // Y10 restructure: algebraic-techniques unit dissolved; surds/indices challenge now keyed
  // to the live surds lesson it best matches (simplify/combine surds + fractional indices).
  "adding-subtracting-surds": surdsIndicesChallenge,
  // Year 11 Standard
  "simple-interest": simpleInterestChallenge,
  "speed-distance-time": speedDistanceTimeChallenge,
  "box-plots-five-number-summary": fiveNumberSummaryChallenge,
  // Year 11 Standard — Data Analysis high-difficulty pools. Course-scoped keys so shared lesson
  // slugs (e.g. data-displays-summary-statistics, also used by Year 12 Standard 1) stay separate.
  "year-11-standard/data-displays-summary-statistics": summaryStatsDisplaysChallenge,
  "year-11-standard/interpreting-data-outliers": outlierEffectChallenge,
  "year-11-standard/grouped-data-frequency-tables": groupedDataChallenge,
  "year-11-standard/box-plots-five-number-summary": boxPlotChallenge,
  "year-11-standard/stem-leaf-plots": stemLeafChallenge,
  "year-11-standard/time-series-trend-lines": timeSeriesChallenge,
  "year-11-standard/data-analysis-exam-practice": dataExamChallenge,
  "year-11-standard/data-collection-sampling-methods": samplingMethodsChallenge,
  "year-11-standard/data-analysis-revision": dataRevisionChallenge,
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
  // Year 12 Extension 2 — Proof high-difficulty pool (per-lesson, ≤2 each)
  "proof-by-contradiction": proofContradictionChallenge,
  "proof-by-contrapositive": proofContrapositiveChallenge,
  "inequalities-algebraic-proof": proofInequalitiesChallenge,
  "proof-by-mathematical-induction": proofInductionChallenge,
  // Year 12 Extension 2 — Calculus (integration) single-answer D6 pool (per-lesson)
  "reduction-formulae-introduction": calcReductionChallenge,
  "partial-fractions-integration": calcPartialFractionsChallenge,
  "trig-identity-integration": calcSymmetryChallenge,
  "t-substitution-weierstrass": calcTSubstitutionChallenge,
  "volumes-of-revolution": calcVolumeChallenge,
  "completing-square-integration": calcCompletingSquareChallenge,
  // Year 12 Extension 2 — Mechanics single-answer D6 pool (per-lesson)
  "forces-inclined-planes": mechForcesChallenge,
  "rectilinear-motion-calculus": mechRectilinearChallenge,
  "simple-harmonic-motion-extended": mechShmChallenge,
  "circular-motion-uniform": mechCircularChallenge,
  "resisted-motion": mechResistedChallenge,
  "projectile-motion-resistance": mechProjectileChallenge,
  // Year 12 Extension 2 — Vectors in 3D single-answer D6 pool (per-lesson)
  "vectors-and-points-3d": vec3dMagnitudeChallenge,
  "dot-product-and-angle": vec3dPerpendicularChallenge,
  "equations-of-lines-3d": vec3dLineChallenge,
  "vector-applications-exam-practice": vec3dProjectionChallenge,
  "vector-curves-circles-spheres": vec3dSphereChallenge,
  "geometric-proofs-vectors": vec3dProofChallenge,
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
  // Year 12 Advanced — Trig Functions & Identities (ma-t2; trig-equations D6 live in year12AdvancedMore)
  "amplitude-period-phase-vertical-shift": trigParamChallenge,
  "double-angle-formulas": trigDoubleAngleChallenge,
  "trigonometric-identities-simplification": trigIdentityChallenge,
  "graphs-sine-cosine-tangent": trigExistenceChallenge,
  "modelling-periodic-phenomena": trigBehaviourChallenge,
  "mixed-trigonometric-functions-exam-practice": trigQuadrantChallenge,
  // Year 12 Advanced — Trigonometric Equations (ma-t3)
  "further-trig-equations-identities": trigEqCountChallenge,
  "further-trigonometry-exam-practice": trigEqStructureChallenge,
  // Year 12 Advanced — Trigonometry and Measure of Angles (ma-t1)
  "radians-exact-values-unit-circle": trigMeasureChallenge,
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
  // Year 9 Core conformance — net-new core section 3F (all 3 courses)
  "year-9-mathematics/linear-equations-involving-fractions": linearEquationsFractionsY9Challenge,
  "year-9-mathematics-core/linear-equations-involving-fractions": linearEquationsFractionsY9Challenge,
  "year-9-mathematics-advanced/linear-equations-involving-fractions": linearEquationsFractionsY9Challenge,
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
  // Year 9 Wave 9 — Chapter 8 (Probability & Single-Variable Data). consolidating → Core only;
  // core → all 3; path → base + advanced; extending (grouping-data-into-classes) → Advanced only.
  "year-9-mathematics-core/review-of-probability": reviewProbY9Challenge,
  "year-9-mathematics/venn-diagrams-two-way-tables": vennY9Challenge,
  "year-9-mathematics-advanced/venn-diagrams-two-way-tables": vennY9Challenge,
  "year-9-mathematics/using-set-notation": setNotationY9Challenge,
  "year-9-mathematics-advanced/using-set-notation": setNotationY9Challenge,
  "year-9-mathematics/arrays-two-step-experiments": arraysY9Challenge,
  "year-9-mathematics-core/arrays-two-step-experiments": arraysY9Challenge,
  "year-9-mathematics-advanced/arrays-two-step-experiments": arraysY9Challenge,
  "year-9-mathematics/tree-diagrams": treeY9Challenge,
  "year-9-mathematics-core/tree-diagrams": treeY9Challenge,
  "year-9-mathematics-advanced/tree-diagrams": treeY9Challenge,
  "year-9-mathematics/relative-frequencies": relFreqY9Challenge,
  "year-9-mathematics-core/relative-frequencies": relFreqY9Challenge,
  "year-9-mathematics-advanced/relative-frequencies": relFreqY9Challenge,
  "year-9-mathematics/data-and-sampling": samplingY9Challenge,
  "year-9-mathematics-advanced/data-and-sampling": samplingY9Challenge,
  "year-9-mathematics-core/mean-median-mode": meanMedianY9Challenge,
  "year-9-mathematics-core/stem-and-leaf-plots": stemLeafY9Challenge,
  "year-9-mathematics-advanced/grouping-data-into-classes": groupingY9Challenge,
  "year-9-mathematics/range-interquartile-range": iqrY9Challenge,
  "year-9-mathematics-core/range-interquartile-range": iqrY9Challenge,
  "year-9-mathematics-advanced/range-interquartile-range": iqrY9Challenge,
  "year-9-mathematics/box-plots": boxPlotY9Challenge,
  "year-9-mathematics-core/box-plots": boxPlotY9Challenge,
  "year-9-mathematics-advanced/box-plots": boxPlotY9Challenge,
  // Year 9 Core conformance — net-new core section 10G (all 3 courses)
  "year-9-mathematics/interpreting-data-from-tables-and-graphs": interpretingDataY9Challenge,
  "year-9-mathematics-core/interpreting-data-from-tables-and-graphs": interpretingDataY9Challenge,
  "year-9-mathematics-advanced/interpreting-data-from-tables-and-graphs": interpretingDataY9Challenge,
  // Year 9 Wave 10 — Chapter 9 (Quadratic Expressions & Algebraic Techniques). All 11 sections are
  // path-tagged → base + advanced only.
  "year-9-mathematics/expanding-binomial-products": ebpY9Challenge,
  "year-9-mathematics-advanced/expanding-binomial-products": ebpY9Challenge,
  "year-9-mathematics/perfect-squares-difference-of-squares": psdY9Challenge,
  "year-9-mathematics-advanced/perfect-squares-difference-of-squares": psdY9Challenge,
  "year-9-mathematics/factorising-algebraic-expressions": faeY9Challenge,
  "year-9-mathematics-advanced/factorising-algebraic-expressions": faeY9Challenge,
  "year-9-mathematics/factorising-difference-of-squares": fdsY9Challenge,
  "year-9-mathematics-advanced/factorising-difference-of-squares": fdsY9Challenge,
  "year-9-mathematics/factorising-by-grouping": fbgY9Challenge,
  "year-9-mathematics-advanced/factorising-by-grouping": fbgY9Challenge,
  "year-9-mathematics/factorising-monic-trinomials": fmtY9Challenge,
  "year-9-mathematics-advanced/factorising-monic-trinomials": fmtY9Challenge,
  "year-9-mathematics/factorising-non-monic-trinomials": fntY9Challenge,
  "year-9-mathematics-advanced/factorising-non-monic-trinomials": fntY9Challenge,
  "year-9-mathematics/simplifying-algebraic-fractions-multiply-divide": afmdY9Challenge,
  "year-9-mathematics-advanced/simplifying-algebraic-fractions-multiply-divide": afmdY9Challenge,
  "year-9-mathematics/simplifying-algebraic-fractions-add-subtract": afasY9Challenge,
  "year-9-mathematics-advanced/simplifying-algebraic-fractions-add-subtract": afasY9Challenge,
  "year-9-mathematics/further-add-subtract-algebraic-fractions": fafsY9Challenge,
  "year-9-mathematics-advanced/further-add-subtract-algebraic-fractions": fafsY9Challenge,
  "year-9-mathematics/equations-with-algebraic-fractions": eafY9Challenge,
  "year-9-mathematics-advanced/equations-with-algebraic-fractions": eafY9Challenge,
  // Year 9 Wave 11 — Chapter 10 (Quadratic Equations & Parabolas). All 8 sections path → base + advanced.
  "year-9-mathematics/quadratic-equations": qeY9Challenge,
  "year-9-mathematics-advanced/quadratic-equations": qeY9Challenge,
  "year-9-mathematics/solving-quadratics-factorising-basic": sqfbY9Challenge,
  "year-9-mathematics-advanced/solving-quadratics-factorising-basic": sqfbY9Challenge,
  "year-9-mathematics/solving-quadratics-factorising": sqfY9Challenge,
  "year-9-mathematics-advanced/solving-quadratics-factorising": sqfY9Challenge,
  "year-9-mathematics/quadratic-equations-problems": qepY9Challenge,
  "year-9-mathematics-advanced/quadratic-equations-problems": qepY9Challenge,
  "year-9-mathematics/the-parabola": parY9Challenge,
  "year-9-mathematics-advanced/the-parabola": parY9Challenge,
  "year-9-mathematics/sketching-dilations-reflections": sdrY9Challenge,
  "year-9-mathematics-advanced/sketching-dilations-reflections": sdrY9Challenge,
  "year-9-mathematics/sketching-translations": strY9Challenge,
  "year-9-mathematics-advanced/sketching-translations": strY9Challenge,
  "year-9-mathematics/sketching-parabolas-intercept-form": spiY9Challenge,
  "year-9-mathematics-advanced/sketching-parabolas-intercept-form": spiY9Challenge,
  // Year 7 — Wave 0 pilot (single course; D6 12/section, course-scoped).
  "year-7-mathematics/integers-number-line": integersNumberLineChallenge,
  "year-7-mathematics/adding-subtracting-integers": addingSubtractingIntegersChallenge,
  "year-7-mathematics/multiplying-dividing-integers": multiplyingDividingIntegersChallenge,
  "year-7-mathematics/order-of-operations-integers": orderOfOperationsIntegersChallenge,
  "year-7-mathematics/integers-problem-solving": integersProblemSolvingChallenge,
  // Year 7 — Wave 1 measurement cluster (perimeter, area, volume).
  "year-7-mathematics/perimeter-of-polygons": perimeterOfPolygonsChallenge,
  "year-7-mathematics/perimeter-composite-shapes": perimeterCompositeShapesChallenge,
  "year-7-mathematics/perimeter-problem-solving": perimeterProblemSolvingChallenge,
  "year-7-mathematics/area-rectangles-triangles": areaRectanglesTrianglesChallenge,
  "year-7-mathematics/area-parallelograms-trapezoids": areaParallelogramsTrapezoidsChallenge,
  "year-7-mathematics/area-composite-shapes": areaCompositeShapesChallenge,
  "year-7-mathematics/area-problem-solving": areaProblemSolvingChallenge,
  "year-7-mathematics/volume-of-prisms": volumeOfPrismsChallenge,
  "year-7-mathematics/volume-of-cylinders": volumeOfCylindersChallenge,
  // Year 7 — Wave 2 algebra cluster (indices, equations, algebraic-techniques).
  "year-7-mathematics/factors-multiples-hcf-lcm": factorsMultiplesHcfLcmChallenge,
  "year-7-mathematics/primes-and-prime-factorisation": primesPrimeFactorisationChallenge,
  "year-7-mathematics/squares-cubes-index-notation": squaresCubesIndexNotationChallenge,
  "year-7-mathematics/index-laws-product-quotient-power": indexLawsProductQuotientPowerChallenge,
  "year-7-mathematics/zero-index-and-mixed-indices": zeroIndexMixedIndicesChallenge,
  "year-7-mathematics/one-step-equations": oneStepEquationsChallenge,
  "year-7-mathematics/two-step-equations": twoStepEquationsChallenge,
  "year-7-mathematics/equations-worded-problems": equationsWordedProblemsChallenge,
  "year-7-mathematics/quadratic-equations-ax2-equals-c": quadraticAx2EqualsCChallenge,
  // Year 7 — Wave 3 number cluster (fractions, percentages).
  "year-7-mathematics/fractions-types-and-equivalence": fractionsTypesEquivalenceChallenge,
  "year-7-mathematics/comparing-ordering-fractions": comparingOrderingFractionsChallenge,
  "year-7-mathematics/adding-subtracting-fractions": y7AddingSubtractingFractionsChallenge,
  "year-7-mathematics/multiplying-dividing-fractions": multiplyingDividingFractionsChallenge,
  "year-7-mathematics/fractions-decimals-conversion": fractionsDecimalsConversionChallenge,
  "year-7-mathematics/decimals-operations": decimalsOperationsChallenge,
  "year-7-mathematics/converting-fractions-decimals-percentages": convertingFractionsDecimalsPercentagesChallenge,
  "year-7-mathematics/percentage-of-quantity": percentageOfQuantityChallenge,
  "year-7-mathematics/percentage-increase-decrease": percentageIncreaseDecreaseChallenge,
  "year-7-mathematics/percentage-applications": percentageApplicationsChallenge,
  // Year 7 — Wave 4 (angles, ratios-and-rates).
  "year-7-mathematics/angle-types-and-relationships": angleTypesRelationshipsChallenge,
  "year-7-mathematics/angles-in-triangles": anglesInTrianglesChallenge,
  "year-7-mathematics/angles-in-quadrilaterals": anglesInQuadrilateralsChallenge,
  "year-7-mathematics/parallel-lines-and-transversals": parallelLinesTransversalsChallenge,
  "year-7-mathematics/angle-relationships-problem-solving": angleRelationshipsProblemSolvingChallenge,
  "year-7-mathematics/introduction-to-ratios": introductionToRatiosChallenge,
  "year-7-mathematics/dividing-quantities-in-ratio": dividingQuantitiesInRatioChallenge,
  "year-7-mathematics/rates-and-unit-rates": ratesUnitRatesChallenge,
  "year-7-mathematics/speed-distance-time": y7SpeedDistanceTimeChallenge,
  "year-7-mathematics/scale-drawings": scaleDrawingsChallenge,
  // Year 7 — Wave 5 (data, probability-and-chance) — completes Year 7.
  "year-7-mathematics/data-types-and-collection": dataTypesCollectionChallenge,
  "year-7-mathematics/frequency-tables": y7FrequencyTablesChallenge,
  "year-7-mathematics/dot-plots-stem-and-leaf": dotPlotsStemLeafChallenge,
  "year-7-mathematics/column-bar-line-graphs": columnBarLineGraphsChallenge,
  "year-7-mathematics/choosing-and-interpreting-displays": choosingInterpretingDisplaysChallenge,
  "year-7-mathematics/probability-language-and-scale": probabilityLanguageScaleChallenge,
  "year-7-mathematics/simple-probability": simpleProbabilityChallenge,
  "year-7-mathematics/two-step-chance-experiments": twoStepChanceExperimentsChallenge,
  "year-7-mathematics/relative-frequency": relativeFrequencyChallenge,
  "year-7-mathematics/expected-outcomes": expectedOutcomesChallenge,
  // Year 8 — Wave 1 (linear-relationships, pythagoras-theorem).
  "year-8-mathematics/number-patterns-and-rules": y8NumberPatternsRulesChallenge,
  "year-8-mathematics/coordinates-and-points": y8CoordinatesPointsChallenge,
  "year-8-mathematics/tables-of-values": y8TablesOfValuesChallenge,
  "year-8-mathematics/graphing-linear-relationships": y8GraphingLinearChallenge,
  "year-8-mathematics/gradient-as-rate-of-change": y8GradientRateChallenge,
  "year-8-mathematics/interpreting-linear-graphs": y8InterpretingLinearChallenge,
  "year-8-mathematics/right-angled-triangles-pythagoras": y8RightAngledPythagChallenge,
  "year-8-mathematics/finding-the-hypotenuse": y8FindingHypotenuseChallenge,
  "year-8-mathematics/finding-a-shorter-side": y8FindingShorterSideChallenge,
  "year-8-mathematics/pythagoras-real-contexts": y8PythagRealContextsChallenge,
  "year-8-mathematics/pythagorean-triples": y8PythagoreanTriplesChallenge,
  "year-8-mathematics/distance-between-two-points": y8DistanceBetweenPointsChallenge,
  // Year 8 — Wave 2 (geometry-angles, surface-area-of-solids, volume-of-composite-solids).
  "year-8-mathematics/angles-triangles-quadrilaterals": y8AnglesTriQuadChallenge,
  "year-8-mathematics/properties-of-polygons": y8PropertiesOfPolygonsChallenge,
  "year-8-mathematics/congruent-triangles": y8CongruentTrianglesChallenge,
  "year-8-mathematics/geometric-reasoning": y8GeometricReasoningChallenge,
  "year-8-mathematics/quadrilateral-properties": y8QuadrilateralPropertiesChallenge,
  "year-8-mathematics/surface-area-of-prisms": y8SurfaceAreaPrismsChallenge,
  "year-8-mathematics/surface-area-of-cylinders": y8SurfaceAreaCylindersChallenge,
  "year-8-mathematics/surface-area-of-composite-solids": y8SurfaceAreaCompositeChallenge,
  "year-8-mathematics/volume-of-prisms": volumeOfPrismsY8Challenge,
  "year-8-mathematics/volume-of-cylinders": volumeOfCylindersY8Challenge,
  "year-8-mathematics/volume-of-composite-solids": y8VolumeCompositeChallenge,
  // Year 8 — Wave 3 (algebraic-techniques-stage5, index-laws-extension, indices-b).
  "year-8-mathematics/algebraic-fractions": y8AlgebraicFractionsChallenge,
  "year-8-mathematics/expanding-expressions": y8ExpandingExpressionsChallenge,
  "year-8-mathematics/binomial-products": y8BinomialProductsChallenge,
  "year-8-mathematics/equivalent-expressions": y8EquivalentExpressionsChallenge,
  "year-8-mathematics/negative-indices": y8NegativeIndicesChallenge,
  "year-8-mathematics/scientific-notation-large-numbers": y8SciNotationLargeChallenge,
  "year-8-mathematics/scientific-notation-small-numbers": y8SciNotationSmallChallenge,
  "year-8-mathematics/significant-figures": y8SignificantFiguresChallenge,
  "year-8-mathematics/operations-with-scientific-notation": y8OpsSciNotationChallenge,
  "year-8-mathematics/advanced-index-manipulation": y8AdvancedIndexChallenge,
  "year-8-mathematics/algebraic-bases": y8AlgebraicBasesChallenge,
  "year-8-mathematics/indicial-equations": y8IndicialEquationsChallenge,
  // Year 8 — Wave 4 (data-and-graphs).
  "year-8-mathematics/mean-median-mode-range": y8MeanMedianModeRangeChallenge,
  "year-8-mathematics/comparing-data-displays": y8ComparingDataDisplaysChallenge,
  "year-8-mathematics/stem-and-leaf-plots": y8StemAndLeafPlotsChallenge,
  "year-8-mathematics/quartiles-and-iqr": y8QuartilesIqrChallenge,
  "year-8-mathematics/outliers-and-interpretation": y8OutliersInterpretationChallenge,
  "year-8-mathematics/box-plots": y8BoxPlotsChallenge,
  "year-8-mathematics/comparing-data-with-box-plots": y8ComparingBoxPlotsChallenge,
  "year-8-mathematics/shape-of-distributions": y8ShapeOfDistributionsChallenge,
  // Year 8 — Wave 5 closeout (networks, financial maths, data investigation).
  "year-8-mathematics/network-fundamentals": y8NetworkFundamentalsChallenge,
  "year-8-mathematics/paths-and-circuits": y8PathsCircuitsChallenge,
  "year-8-mathematics/eulerian-trails-circuits": y8EulerianTrailsChallenge,
  "year-8-mathematics/planar-graphs": y8PlanarGraphsChallenge,
  "year-8-mathematics/network-applications": y8NetworkApplicationsChallenge,
  "year-8-mathematics/simple-interest-introduction": y8SimpleInterestIntroChallenge,
  "year-8-mathematics/wages-and-salary": y8WagesSalaryChallenge,
  "year-8-mathematics/income-tax-basics": y8IncomeTaxBasicsChallenge,
  "year-8-mathematics/budgeting-and-money-management": y8BudgetingChallenge,
  "year-8-mathematics/credit-and-debit": y8CreditDebitChallenge,
  "year-8-mathematics/statistical-questions": y8StatisticalQuestionsChallenge,
  "year-8-mathematics/data-collection": y8DataCollectionChallenge,
  "year-8-mathematics/statistical-analysis": y8StatisticalAnalysisChallenge,
  "year-8-mathematics/communicating-findings": y8CommunicatingFindingsChallenge,
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
