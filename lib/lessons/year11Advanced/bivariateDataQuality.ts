import type { PracticeQuestion } from "../differentialCalculus";
import { bivariateDataQualityApplied } from "./bivariateDataQualityApplied";
import { bivariateDataQualityCore } from "./bivariateDataQualityCore";

const masteryBySlug = {
  ...bivariateDataQualityCore,
  ...bivariateDataQualityApplied,
};

const retainedExplanations: Record<string, string> = {
  "y11adv-bd-sc-g2": "The sign is positive, so the variables tend to increase together. Since |r|=0.15 is close to zero, the linear association is weak. Therefore it is a weak positive linear association.",
  "y11adv-bd-sc-g4": "Height is the plausible input used to explain or predict shoe size, so it is placed on the horizontal axis as the explanatory variable. Shoe size is the response variable in this study.",
  "y11adv-bd-sc-i2": "A clear curved pattern is non-linear because the points do not follow an approximate straight line. The association may still be strong even though a linear correlation coefficient does not describe it well.",
  "y11adv-bd-sc-i4": "The negative sign gives the direction. Since |r|=0.78 is relatively close to one, the linear association is strong. Thus the data show a strong negative linear association.",
  "y11adv-bd-lf-g1": "The regression slope is b=r(sᵧ/sₓ)=0.6(10/4)=1.5. Correlation alone is not the slope because the standard-deviation ratio converts it into response units per explanatory unit.",
  "y11adv-bd-lf-g3": "The least-squares line passes through (x̄,ȳ). Therefore a=ȳ-bx̄=30-2.5(8)=10, so the y-intercept is 10.",
  "y11adv-bd-lf-i1": "First b=-0.75(8/5)=-1.2. Then a=20-(-1.2)(10)=32. Hence the fitted equation is ŷ=32-1.2x.",
  "y11adv-bd-lf-i3": "A slope of -3 response units per hour means that each additional hour of sleep is associated with three fewer predicted errors on average. It describes association, not causal proof.",
  "y11adv-bd-lf-i5": "The slope is b=0.9(6/2)=2.7. The centroid gives a=14-2.7(5)=0.5, so the fitted equation is ŷ=0.5+2.7x.",
  "y11adv-bd-ie-g2": "At x=5 the fitted value is ŷ=4+3(5)=19. Residual equals actual minus fitted, so e=22-19=3; the observation lies three units above the line.",
  "y11adv-bd-ie-g4": "The model was fitted only through 2020. A prediction for 2035 lies beyond that explanatory-variable range, so it is extrapolation and assumes the earlier pattern continues.",
  "y11adv-bd-ie-i1": "Substituting x=6 gives ŷ=20-1.5(6)=20-9=11. This is a fitted response; its reliability would also depend on whether 6 lies in the observed x-range.",
  "y11adv-bd-ie-i3": "At x=10 the line predicts ŷ=8+2(10)=28. The residual is 25-28=-3, so the actual point is three units below the fitted line and the model over-predicts it.",
  "y11adv-bd-ie-i5": "A regression line summarises a trend rather than reproducing every observation. Natural random variation and the model's approximate form leave nonzero vertical differences, even when the residuals are small and patternless overall.",
  "y11adv-bd-dt-g2": "Exponentiating both sides with base 10 gives $y=10^{1.2+0.5x}$. Equivalently, $y=10^{1.2}(10^{0.5})^x$, an exponential original-scale model.",
  "y11adv-bd-dt-g4": "At x=4, log₁₀ŷ=0.8+0.3(4)=2. Back-transforming gives ŷ=10²=100 in the original response units.",
  "y11adv-bd-dt-i2": "At x=10, log₁₀ŷ=2+0.1(10)=3. The required original-scale prediction is therefore ŷ=10³=1000.",
  "y11adv-bd-dt-i4": "At x=0, log₁₀ŷ=1.5. Hence $\\hat y=10^{1.5}\\approx31.62$, which rounds to about 31.6 in the original response units.",
  "y11adv-bd-ex-g2": "The slope is b=0.80(5/2)=2. The intercept is a=18-2(6)=6, so the regression equation is ŷ=6+2x.",
  "y11adv-bd-ex-g4": "The strong correlation does not establish causation. Hot weather is a plausible lurking variable because it can increase both swimming exposure and ice-cream purchases, producing the observed association.",
  "y11adv-bd-ex-i2": "The slope is b=-0.88(6/1.5)=-3.52. The intercept is a=18-(-3.52)(4)=32.08, so the line is ŷ=32.08-3.52x.",
  "y11adv-bd-ex-i4": "Since 12 is outside the fitted range [1,10], the prediction is extrapolation. Substitution gives ŷ=40+4(12)=88, but the linear pattern may not continue beyond 10 hours.",
};

export const BIVARIATE_DATA_QUALITY_SLUGS = Object.freeze(Object.keys(masteryBySlug));

export function getBivariateDataQualityMastery(lessonSlug: string): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceBivariateDataRetainedPractice(questions: PracticeQuestion[]): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    explanation: retainedExplanations[question.id] ?? question.explanation,
    acceptedAnswers: question.choices
      ? question.acceptedAnswers
      : Array.from(new Set([question.answer, ...(question.acceptedAnswers ?? [])])),
  }));
}
