import type { PracticeQuestion } from "../differentialCalculus";
import { graphsEquationsQualityApplied } from "./graphsEquationsQualityApplied";
import { graphsEquationsQualityCore } from "./graphsEquationsQualityCore";

const masteryBySlug = {
  ...graphsEquationsQualityCore,
  ...graphsEquationsQualityApplied,
};

const retainedExplanations: Record<string, string> = {
  "y11adv-ge-ft-g1": "For divisor x−1, the remainder theorem requires P(1). Substitution gives 1³+3(1)−5=−1, so the remainder is −1.",
  "y11adv-ge-ft-g3": "The factor x+2 corresponds to the input −2. Since P(−2)=−8−4+8+4=0, the factor theorem confirms that x+2 divides P exactly.",
  "y11adv-ge-ft-i1": "For division by x−2, evaluate P(2). The result is 2(2³)−3(2²)+2−6=16−12+2−6=0, so the remainder is zero.",
  "y11adv-ge-ft-i3": "P(1)=0, so x−1 is a factor. Division gives x²+x−2=(x−1)(x+2), hence P(x)=(x−1)²(x+2).",
  "y11adv-ge-ft-i5": "P(1)=0, so divide by x−1. The quotient is x²+5x+6=(x+2)(x+3), giving P(x)=(x−1)(x+2)(x+3).",
  "y11adv-ge-sp-g1": "For 2x²−7x+3=0, Vieta's formulas give sum −b/a=7/2 and product c/a=3/2. Individual roots are not required.",
  "y11adv-ge-sp-g3": "The monic quadratic with roots 4 and −3 is (x−4)(x+3)=0. Expanding gives x²−x−12=0.",
  "y11adv-ge-sp-i1": "A monic quadratic with root sum S and product P is x²−Sx+P=0. Substituting S=3 and P=−10 gives x²−3x−10=0.",
  "y11adv-ge-sp-i2": "Vieta gives α+β=6 and αβ=8. Therefore α²+β²=(α+β)²−2αβ=36−16=20, so option B is correct.",
  "y11adv-ge-sp-i3": "Vieta gives α+β=−3/4 and αβ=−1/4. Therefore 1/α+1/β=(α+β)/(αβ)=3.",
  "y11adv-ge-sp-i5": "Let the roots be r and 3r. Their sum gives 4r=5, so r=5/4. Their product is k=3r²=75/16.",
  "y11adv-ge-gp-g2": "The factor (x−2)² has even multiplicity, so it does not change sign through x=2. The graph touches the x-axis and turns there.",
  "y11adv-ge-gp-g4": "The y-intercept is P(0). Using either form gives P(0)=2, so the graph crosses the y-axis at (0,2).",
  "y11adv-ge-gp-i2": "The three simple roots are −2, 1 and 4, so the graph crosses at each. Its positive cubic leading term falls left and rises right, and P(0)=8.",
  "y11adv-ge-gp-i4": "The factor x² gives a double root at x=0, so the graph touches there. The factor x−3 gives a simple root at x=3, so it crosses there.",
  "y11adv-ge-sim-g1": "Equating x²=2x+3 gives x²−2x−3=(x−3)(x+1)=0. Substitution gives the points (3,9) and (−1,1).",
  "y11adv-ge-sim-g3": "Equating x²−4=3x gives x²−3x−4=(x−4)(x+1)=0. Thus the x-coordinates are 4 and −1.",
  "y11adv-ge-sim-i1": "Substitute y=2x into the circle: x²+4x²=25, so x=±√5. The corresponding points are (√5,2√5) and (−√5,−2√5).",
  "y11adv-ge-sim-i3": "Equating the curves gives x²−x+2−k=0. Tangency requires 1−4(2−k)=0, so 4k−7=0 and k=7/4.",
  "y11adv-ge-sim-i5": "Using y=5−2x in the circle gives x²+(5−2x)²=10, or x²−4x+3=0. The solutions are (1,3) and (3,−1).",
  "y11adv-ge-ex-g1": "P(4)=64−80+8+8=0, so x−4 is a factor. Division gives x²−x−2=(x−2)(x+1), hence the full factorisation.",
  "y11adv-ge-ex-g3": "The simple root −3 is a crossing and the double root 1 is a touch. P(0)=3, and the positive cubic falls left and rises right.",
  "y11adv-ge-ex-i1": "Testing x=2 gives a zero. Division produces 2x²+5x−3=(2x−1)(x+3), so the roots are 2, 1/2 and −3.",
  "y11adv-ge-ex-i3": "The simple roots −1 and 0 are crossings, while the double root 2 is a touch. P(0)=0 and the positive quartic rises at both ends.",
  "y11adv-ge-ex-i5": "Equating kx=x²+3x+4 gives x²+(3−k)x+4=0. Tangency requires (3−k)²−16=0, so k=7 or k=−1.",
};

export const GRAPHS_EQUATIONS_QUALITY_SLUGS = Object.freeze(
  Object.keys(masteryBySlug),
);

export function getGraphsEquationsQualityMastery(
  lessonSlug: string,
): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceGraphsEquationsRetainedPractice(
  questions: PracticeQuestion[],
): PracticeQuestion[] {
  return questions.map((question) => ({
    ...question,
    explanation: retainedExplanations[question.id] ?? question.explanation,
    acceptedAnswers: question.choices
      ? question.acceptedAnswers
      : Array.from(new Set([question.answer, ...(question.acceptedAnswers ?? [])])),
  }));
}
