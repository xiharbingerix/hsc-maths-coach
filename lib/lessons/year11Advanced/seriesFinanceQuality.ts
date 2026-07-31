import type { PracticeQuestion } from "../differentialCalculus";
import { seriesFinanceQualityApplied } from "./seriesFinanceQualityApplied";
import { seriesFinanceQualityCore } from "./seriesFinanceQualityCore";

const masteryBySlug = { ...seriesFinanceQualityCore, ...seriesFinanceQualityApplied };

const retainedExplanations: Record<string, string> = {
  "y11adv-sf-ci-g1": "Annual compounding gives A=2000(1.05)³=$2315.25. The exponent is three because interest is credited once in each of the three years.",
  "y11adv-sf-ci-g3": "The monthly rate is 0.03/12=0.0025 and there are 24 months. Therefore A=6000(1.0025)²⁴=$6370.54 to the nearest cent.",
  "y11adv-sf-ci-i1": "Use five annual growth factors: A=10000(1.08)⁵=$14693.28. This is the final balance, including both principal and accumulated interest.",
  "y11adv-sf-ci-i2": "The half-year rate is 3% and there are eight half-years. The balance is 4000(1.03)⁸=$5067.08, so interest earned is $1067.08.",
  "y11adv-sf-ci-i4": "Solving (1.07)ⁿ≥2 gives a boundary near n=10.24. Annual crediting requires a whole number of periods, so 10 years is insufficient and 11 years is first.",
  "y11adv-sf-rf-g1": "An arithmetic recurrence adds the common difference: T₁=3 and Tₙ=Tₙ₋₁+7. Four updates give T₅=3+4(7)=31.",
  "y11adv-sf-rf-g3": "Interest is applied before repayment: A₁=10000(1.01)-200=10100-200=$9900. The repayment reduces the interest-adjusted balance.",
  "y11adv-sf-rf-i1": "Apply the multiplier twice from T₁: T₂=0.9(100)=90 and T₃=0.9(90)=81. The 10% decrease compounds rather than subtracting a fixed amount.",
  "y11adv-sf-rf-i3": "The investment recurrence is A₀=5000 and Aₙ=1.02Aₙ₋₁. Iterating gives A₁=5100 and A₂=1.02(5100)=$5202.",
  "y11adv-sf-rf-i5": "Starting from zero, A₁=1.01(0)+200=200. The next update adds interest before the deposit: A₂=1.01(200)+200=402.",
  "y11adv-sf-sup-g1": "Use monthly rate 0.005 and 60 deposits. The ordinary-annuity value is 200[(1.005)⁶⁰−1]/0.005=$13954.01.",
  "y11adv-sf-sup-g3": "Ten end-of-year deposits accumulate through the annuity factor: FV=1000[(1.05)¹⁰−1]/0.05=$12577.89.",
  "y11adv-sf-sup-i1": "The quarterly rate is 1% and eight years gives 32 deposits. FV=400[(1.01)³²−1]/0.01=$14997.63.",
  "y11adv-sf-sup-i3": "The monthly rate is 0.004 and there are 180 deposits. Substitution gives FV=250[(1.004)¹⁸⁰−1]/0.004=$65717.80.",
  "y11adv-sf-sup-i5": "Rearrange the annuity formula: M=50000(0.05/12)/[(1+0.05/12)¹²⁰−1]. This gives approximately $321.99 per month.",
  "y11adv-sf-ln-g1": "Use monthly rate 0.005 and 48 repayments. The repayment formula gives M=15000(0.005)/[1−(1.005)⁻⁴⁸]=$352.28.",
  "y11adv-sf-ln-g3": "At monthly rate 0.006 over 60 months, the unrounded repayment is about $397.91. Total repayments minus $20000 principal gives about $3874.83 interest.",
  "y11adv-sf-ln-i1": "The monthly rate is 0.084/12=0.007 and n=60. Substitution in the repayment formula gives M=$511.71 to the nearest cent.",
  "y11adv-sf-ln-i3": "With monthly rate 0.004 and 36 repayments, M is about $896.44. The unrounded total repayments exceed $30000 by approximately $2271.68.",
  "y11adv-sf-ln-i5": "Discount 240 monthly repayments at rate 0.05/12: PV=500[1−(1+0.05/12)⁻²⁴⁰]/(0.05/12)=$75762.66 approximately.",
  "y11adv-sf-ex-g1": "This is one lump sum, so A=6000(1.05)⁶=$8040.57. No annuity factor is needed because there are no regular deposits.",
  "y11adv-sf-ex-g3": "Use rate 0.005 and 36 payments: M≈$547.59. Using the unrounded repayment, total interest is 36M−18000≈$1713.42.",
  "y11adv-sf-ex-i1": "The logarithmic boundary is ln(6000/4000)/ln(1.05)≈8.31. Because interest is credited annually, the first complete period meeting the target is year 9.",
  "y11adv-sf-ex-i3": "The lump sum grows to 10000(1.005)²⁴⁰≈$33102. The deposits accumulate to 200[(1.005)²⁴⁰−1]/0.005≈$92408, so monthly saving wins.",
  "y11adv-sf-ex-i5": "Rearrange the future-value formula with monthly rate 0.006 and 360 deposits. The required payment is 500000(0.006)/[(1.006)³⁶⁰−1]≈$393.94.",
};

export const SERIES_FINANCE_QUALITY_SLUGS = Object.freeze(Object.keys(masteryBySlug));

export function getSeriesFinanceQualityMastery(lessonSlug: string): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceSeriesFinanceRetainedPractice(questions: PracticeQuestion[]): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    explanation: retainedExplanations[question.id] ?? question.explanation,
    acceptedAnswers: question.choices
      ? question.acceptedAnswers
      : Array.from(new Set([question.answer, ...(question.acceptedAnswers ?? [])])),
  }));
}
