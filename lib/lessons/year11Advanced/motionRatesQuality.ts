import type { PracticeQuestion } from "../differentialCalculus";
import { motionRatesQualityApplied } from "./motionRatesQualityApplied";
import { motionRatesQualityCore } from "./motionRatesQualityCore";

const masteryBySlug = { ...motionRatesQualityCore, ...motionRatesQualityApplied };

const retainedExplanations: Record<string, string> = {
  "y11adv-mot-da-g1": "Differentiate x=t^2+3t to obtain v=2t+3. Substituting t=2 gives v(2)=4+3=7 m/s; position itself should not be substituted as though it were velocity.",
  "y11adv-mot-da-g3": "Differentiate twice: v=6t^2-6t and then a=12t-6. The second derivative, rather than the first derivative, is the acceleration requested.",
  "y11adv-mot-da-g4": "Differentiate to obtain v=2t-4. Setting this velocity equal to zero gives 2t-4=0, so the particle is momentarily at rest at t=2.",
  "y11adv-mot-da-i1": "The first derivative of x=t^3-6t+1 is v=3t^2-6. Differentiating this velocity once more gives a=6t; the constant position term disappears.",
  "y11adv-mot-da-i3": "At the origin x=0, so solve t^2-4t=t(t-4)=0. The two times are t=0 and t=4; this condition concerns position, not velocity.",
  "y11adv-mot-da-i5": "Velocity is v=dx/dt=4-2t. Setting v=0 gives 4-2t=0 and hence t=2 seconds, the instant at which the particle is momentarily at rest.",
  "y11adv-mot-fd-g1": "Integrating v=4t-2 gives x=2t^2-2t+C. The condition x(0)=3 makes C=3, so the unique position function is x=2t^2-2t+3.",
  "y11adv-mot-fd-g3": "An antiderivative of 6t^2 is 2t^3, so x=2t^3+C. Using x(1)=4 gives 2+C=4 and C=2; therefore x=2t^3+2.",
  "y11adv-mot-fd-i1": "Integration gives x=t^2+5t+C. Since the particle starts at the origin, x(0)=0 and C=0, leaving x=t^2+5t.",
  "y11adv-mot-fd-i2": "Integrating gives x=2t^3-2t^2+C. The condition x(2)=10 yields 16-8+C=10, so C=2 and x=2t^3-2t^2+2.",
  "y11adv-mot-fd-i4": "Integrate acceleration to get v=6t+C_1; v(0)=2 gives C_1=2. Then x=3t^2+2t+C_2, and x(0)=1 gives C_2=1.",
  "y11adv-mot-ma-g2": "Velocity is 2t-6, so the particle reverses at t=3. Positions are x(0)=0, x(3)=-9 and x(6)=0; total distance is 9+9=18 m.",
  "y11adv-mot-ma-g4": "The velocity changes sign at t=3. Integrating with x(0)=0 gives x=t^2/2-3t, so x(0)=0, x(3)=-9/2 and x(6)=0; total distance is 9 m.",
  "y11adv-mot-ma-i1": "Here v=3(t-1)(t+1), so the relevant reversal is t=1. Positions are x(0)=0, x(1)=-2 and x(3)=18; the path length is 2+20=22 m.",
  "y11adv-mot-ma-i4": "For positive time the velocity roots are t=4 only, because t=0 is excluded. The factor 3t is positive and t-4 changes sign, so the particle reverses at t=4.",
  "y11adv-mot-rc-g1": "Differentiate V=200-4t^2 to get dV/dt=-8t. At t=3 this is -24 volume units per time; the negative sign means the volume is decreasing.",
  "y11adv-mot-rc-g3": "The height rate is dh/dt=30-10t. At t=2 this equals 10 m/s, so the projectile is still rising at an instantaneous speed of 10 m/s.",
  "y11adv-mot-rc-i1": "Differentiating r=2t+1 with respect to time gives dr/dt=2. Thus the radius increases at a constant rate of 2 length units per unit time.",
  "y11adv-mot-rc-i3": "Differentiation multiplies the displayed population model by 0.1. At t=0 its exponential factor is 1, so the initial growth rate is 200 per unit time.",
  "y11adv-mot-rc-i5": "Differentiate area with respect to radius: dA/dr=2pi r. At r=5 this is 10pi, meaning area changes by about 10pi square units per additional radius unit.",
  "y11adv-mot-ex-g1": "From x=t^3-3t^2+1, v=3t^2-6t and a=6t-6. Acceleration is zero at t=1, when v(1)=3-6=-3 m/s.",
  "y11adv-mot-ex-g3": "Velocity changes sign at t=3. With x(0)=0, x=t^2-6t; the positions 0, -9 and -5 at times 0, 3 and 5 give distance 9+4=13 m.",
  "y11adv-mot-ex-g4": "Differentiate V=100-5t^2 to obtain dV/dt=-10t. At t=4 the rate is -40 L/min, so the volume is decreasing at 40 litres per minute.",
  "y11adv-mot-ex-i1": "Velocity factors as v=6(t-1)(t-2). It is positive before 1, negative between 1 and 2, and positive after 2, so both rest times are genuine direction changes.",
  "y11adv-mot-ex-i3": "The height rate is dh/dt=20-10t, which vanishes at t=2. Substitution gives h(2)=-20+40=20 m, and the negative second derivative confirms a maximum.",
  "y11adv-mot-ex-i5": "The cooling rate is negative six times the model's exponential factor. A rate of -3 makes that factor one half, so T=60(1/2)+20=50 degrees Celsius.",
};

export const MOTION_RATES_QUALITY_SLUGS = Object.freeze(Object.keys(masteryBySlug));

export function getMotionRatesQualityMastery(lessonSlug: string): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceMotionRatesRetainedPractice(questions: PracticeQuestion[]): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    explanation: retainedExplanations[question.id] ?? question.explanation,
    acceptedAnswers: question.choices
      ? question.acceptedAnswers
      : Array.from(new Set([question.answer, ...(question.acceptedAnswers ?? [])])),
  }));
}
