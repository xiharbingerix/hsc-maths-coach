import type { PracticeQuestion } from "../differentialCalculus";
import { continuousProbabilityQualityApplied } from "./continuousProbabilityQualityApplied";
import { continuousProbabilityQualityCore } from "./continuousProbabilityQualityCore";

const masteryBySlug = { ...continuousProbabilityQualityCore, ...continuousProbabilityQualityApplied };

const retainedExplanations: Record<string, string> = {
  "y11adv-cp-crv-g2": "A uniform density on [0,5] has rectangular area 5c. Setting total area to one gives 5c=1, so c=1/5; it is nonnegative on the full support.",
  "y11adv-cp-crv-g4": "The function is nonnegative on [-1,1]. Its total area is (3/4)[x-x³/3] from -1 to 1=(3/4)(4/3)=1, so it satisfies both pdf conditions.",
  "y11adv-cp-crv-i1": "Normalisation gives ∫₀³kx² dx=k[x³/3]₀³=9k=1. Therefore k=1/9, and the density is nonnegative on [0,3].",
  "y11adv-cp-crv-i3": "Integrate over the requested interval: P(0≤X≤1)=∫₀¹x/2 dx=[x²/4]₀¹=1/4. Including the endpoints does not change a continuous probability.",
  "y11adv-cp-crv-i5": "For a uniform distribution, probability is interval length divided by total support length. Thus P(3<X<7)=(7-3)/(10-0)=4/10=0.4=2/5.",
  "y11adv-cp-nd-g2": "The empirical rule places about 68% within one standard deviation of the mean. Here 100±15 gives the interval 85 to 115.",
  "y11adv-cp-nd-g4": "The cutoffs 52 and 92 are 72±2(10). About 95% lies between them, leaving 5% in the two outside tails combined.",
  "y11adv-cp-nd-i1": "The bounds 42 and 58 equal 50±2(4). By the empirical rule, approximately 95% of a normal distribution lies within two standard deviations of its mean.",
  "y11adv-cp-nd-i3": "The middle 99.7% lies approximately within μ±3σ. Here 600±3(80)=600±240, giving 360 mm to 840 mm.",
  "y11adv-cp-zs-g1": "Standardise with z=(45-50)/5=-1. The score is one standard deviation below the mean, which agrees with the negative sign.",
  "y11adv-cp-zs-g3": "Rearrange to X=μ+zσ. Substitution gives X=100+(-2)(15)=70, two standard deviations below the mean.",
  "y11adv-cp-zs-i1": "The standardised score is z=(245-200)/30=45/30=1.5, so 245 lies 1.5 standard deviations above the mean.",
  "y11adv-cp-zs-i3": "Using μ=175 and σ=7 gives z=(189-175)/7=14/7=2. The height is two standard deviations above the mean.",
  "y11adv-cp-zs-i5": "Test A gives z=(75-60)/10=1.5, while Test B gives z=(92-80)/6=2. Test B is therefore the stronger performance relative to its own class.",
  "y11adv-cp-nt-g2": "The table gives Φ(1.5)=0.9332 and Φ(0)=0.5. Subtracting cumulative areas gives P(0<Z<1.5)=0.9332-0.5=0.4332.",
  "y11adv-cp-nt-g4": "The cutoff standardises to z=(50-68)/9=-2. From the standard normal table, P(Z<-2)=0.0228, or approximately 2.28%.",
  "y11adv-cp-nt-i1": "The cumulative table entry Φ(2.05)=0.9798 means approximately 97.98% of standard-normal values lie below z=2.05.",
  "y11adv-cp-nt-i3": "The bounds standardise to -1 and 1. Therefore P(85<X<115)=Φ(1)-Φ(-1)=0.8413-0.1587=0.6826, about 68%.",
  "y11adv-cp-nt-i5": "The top 10% begins at the 90th percentile, z≈1.28. Back-transforming gives X=65+1.28(12)=80.36, or approximately 80.4.",
  "y11adv-cp-ex-g2": "The bounds 33 and 57 equal 45±2(6). The empirical rule therefore places approximately 95% of observations between them.",
  "y11adv-cp-ex-g3": "Standardising gives z=(65-80)/10=-15/10=-1.5. The negative sign means the value is 1.5 standard deviations below the mean.",
  "y11adv-cp-ex-i1": "Total area is k∫₀²(2x-x²)dx=k(4/3)=1, so k=3/4. Then P(0<X<1)=(3/4)[x²-x³/3]₀¹=(3/4)(2/3)=1/2.",
  "y11adv-cp-ex-i3": "For X=81, z=(81-72)/9=1. For Y=60, z=(60-50)/5=2. Since |2|>|1|, Y=60 is more extreme relative to its distribution.",
  "y11adv-cp-ex-i4": "Subtract the lower cumulative boundary from the upper one: P(-2<Z<1)=Φ(1)-Φ(-2)=0.8413-0.0228=0.8185, so option C is correct.",
  "y11adv-cp-ex-i5": "The cutoff 290 has z=(290-250)/20=2. Hence P(X>290)=1-Φ(2)=1-0.9772=0.0228, or 2.28%.",
};

const retainedAnswerVariants: Record<string, string[]> = {
  "y11adv-cp-nd-i1": ["0.95", "approximately 95 percent"],
  "y11adv-cp-nt-g2": ["43.32%", "P=0.4332"],
  "y11adv-cp-ex-g2": ["0.95", "approximately 95 percent"],
};

export const CONTINUOUS_PROBABILITY_QUALITY_SLUGS = Object.freeze(Object.keys(masteryBySlug));

export function getContinuousProbabilityQualityMastery(lessonSlug: string): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceContinuousProbabilityRetainedPractice(questions: PracticeQuestion[]): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    explanation: retainedExplanations[question.id] ?? question.explanation,
    acceptedAnswers: question.choices ? question.acceptedAnswers : Array.from(new Set([question.answer, ...(question.acceptedAnswers ?? []), ...(retainedAnswerVariants[question.id] ?? [])])),
  }));
}
