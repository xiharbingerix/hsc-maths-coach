import type { PracticeQuestion } from "../differentialCalculus";
import { curveSketchingQualityApplied } from "./curveSketchingQualityApplied";
import { curveSketchingQualityCore } from "./curveSketchingQualityCore";
import { curveSketchingQualityGraphs } from "./curveSketchingQualityGraphs";

const masteryBySlug = {
  ...curveSketchingQualityCore,
  ...curveSketchingQualityGraphs,
  ...curveSketchingQualityApplied,
};

const retainedExplanations: Record<string, string> = {
  "y11adv-cs-sp-g1":
    "Differentiate to obtain $f'(x)=3x^2+6x-9=3(x+3)(x-1)$. Setting the derivative to zero gives the two stationary x-values $x=-3$ and $x=1$.",
  "y11adv-cs-sp-g3":
    "Since $f'(x)=3(x+3)(x-1)$, the derivative is negative between its roots and positive outside them. Therefore the function is decreasing precisely for $-3<x<1$.",
  "y11adv-cs-sp-i1":
    "The derivative is $3x^2-12=3(x-2)(x+2)$, so $x=\\pm2$. Substitution into $y=x^3-12x$ gives $(-2,16)$ and $(2,-16)$.",
  "y11adv-cs-sp-i3":
    "Differentiate to get $f'(x)=6x-3x^2=3x(2-x)$. The stationary x-values are $0$ and $2$, and substitution gives the points $(0,0)$ and $(2,4)$.",
  "y11adv-cs-sp-i5":
    "The derivative is $-3x^2+12x=-3x(x-4)$. It equals zero at $x=0$ and $x=4$, so these are exactly the stationary x-values.",
  "y11adv-cs-cls-g3":
    "$f'(x)=3(x-2)(x+2)$ gives stationary points $(-2,16)$ and $(2,-16)$. Since $f''(x)=6x$, the first is a local maximum and the second a local minimum.",
  "y11adv-cs-cls-i1":
    "$f'(x)=6x(x-1)$ gives points $(0,0)$ and $(1,-1)$. The second derivative $12x-6$ is negative at zero and positive at one, so they are a local maximum and minimum respectively.",
  "y11adv-cs-cls-i4":
    "$f'(x)=3(x+3)(x-1)$ and $f''(x)=6x+6$. The stationary points are $(-3,27)$ and $(1,-5)$; the second derivative classifies them as a local maximum and local minimum.",
  "y11adv-cs-cls-i5":
    "$f'(x)=3(1-x^2)$ vanishes at $x=\\pm1$. Because $f''(x)=-6x$, $(-1,-2)$ is a local minimum and $(1,2)$ is a local maximum.",
  "y11adv-cs-con-g2":
    "$f''(x)=6x$ changes from negative to positive at $x=0$, confirming an inflection. Since $f(0)=0$, the inflection point is $(0,0)$.",
  "y11adv-cs-con-g4":
    "For $y=2x^3-3x^2$, the second derivative is $12x-6$. Concavity is upward where $12x-6>0$, which simplifies to $x>1/2$.",
  "y11adv-cs-con-i1":
    "$f''(x)=12x-6$ changes sign at $x=1/2$. Substituting into $2x^3-3x^2$ gives $-1/2$, so the inflection point is $(1/2,-1/2)$.",
  "y11adv-cs-con-i3":
    "$f''(x)=6x-12=6(x-2)$. It is negative when $x<2$, so the graph is concave down on the interval $(-\\infty,2)$.",
  "y11adv-cs-con-i5":
    "$f''(x)=6x-12$ changes sign at $x=2$. Substitution gives $f(2)=8-24+24-5=3$, hence the inflection point is $(2,3)$.",
  "y11adv-cs-scs-g1":
    "Factorising gives $x^3-3x+2=(x+2)(x-1)^2$. Thus the curve crosses at $x=-2$ and touches the axis at the double root $x=1$.",
  "y11adv-cs-scs-g3":
    "$f'(x)=3(x-1)(x+1)$ gives a local maximum at $x=-1$. Substitution into $x^3-3x+2$ gives the local maximum y-value $4$.",
  "y11adv-cs-scs-i1":
    "$2x^3-3x^2=x^2(2x-3)$. The double root $x=0$ is a touching intercept, while the simple root $x=3/2$ is a crossing intercept.",
  "y11adv-cs-scs-i3":
    "$f'(x)=3(x+3)(x-1)$ gives a local maximum at $x=-3$. Evaluating the original cubic gives $f(-3)=-27+27+27+5=32$.",
  "y11adv-cs-scs-i5":
    "The leading term is $-2x^3$. Therefore as $x\\to\\infty$, $y\\to-\\infty$, while as $x\\to-\\infty$, $y\\to\\infty$.",
  "y11adv-cs-rd-g1":
    "The derivative graph crosses from negative to positive at $x=1$. Thus $f$ changes from decreasing to increasing and has a local minimum at $x=1$.",
  "y11adv-cs-rd-g2":
    "The graph of $f'$ lies below the x-axis between its intercepts $-1$ and $1$. Hence $f'(x)<0$ and $f$ is decreasing for $-1<x<1$.",
  "y11adv-cs-rd-g4":
    "The derivative graph has x-intercepts at $-1$ and $1$. It changes positive-to-negative at $-1$, giving a local maximum, and negative-to-positive at $1$, giving a local minimum.",
  "y11adv-cs-rd-i1":
    "The derivative graph is increasing for $x>0$. Its slope is $f''$, so $f''(x)>0$ there and the original function is concave up for $x>0$.",
  "y11adv-cs-rd-i2":
    "The line $f'(x)=2x-4$ crosses zero at $x=2$ from negative to positive. Therefore $f$ has a local minimum at $x=2$.",
  "y11adv-cs-rd-i4":
    "$f'(x)=-3x^2+3$ is positive between $-1$ and $1$ and negative outside. At $x=1$ it changes positive-to-negative, so $f$ has a local maximum there.",
  "y11adv-cs-opt-g1":
    "If the sides are $x$ and $y$, then $x+y=30$ and $A=x(30-x)$. The derivative $30-2x$ vanishes at $x=15$, giving the maximum-area square $15$ cm by $15$ cm.",
  "y11adv-cs-opt-g2":
    "The parabola has its stationary point at $x=3$, where $y=10$, and its negative leading coefficient confirms a maximum. The endpoint values are smaller, so the closed-interval maximum is $10$.",
  "y11adv-cs-opt-g4":
    "Critical points satisfy $3x^2-6=0$, so $x=\\pm\\sqrt2$. Comparing these values with both endpoints gives $f(-2)=5$ and $f(4)=41$; the largest value is therefore $41$ at $x=4$.",
  "y11adv-cs-opt-i1":
    "Let each perpendicular side be $x$ metres, so the wall-side length is $200-2x$. Then $A=x(200-2x)$ has its maximum at $x=50$, giving dimensions $50$ m by $100$ m and area $5000$ square metres.",
  "y11adv-cs-opt-i2":
    "$P'(x)=60-2x$ vanishes at $x=30$, and $P''=-2<0$ confirms a maximum. Substitution gives $P(30)=1800-900=900$.",
  "y11adv-cs-opt-i4":
    "The volume constraint gives $h=250/r^2$, so $S=2\\pi r^2+500\\pi/r$. Setting $S'=4\\pi r-500\\pi/r^2$ to zero gives $r^3=125$, hence $r=5$ cm; $S''>0$ confirms a minimum.",
  "y11adv-cs-opt-i5":
    "$P'(x)=-6(x-1)(x-5)$ gives stationary levels $1$ and $5$. Since $P''(5)=-24<0$, the profit-maximising production level is $x=5$.",
  "y11adv-cs-ex-g2":
    "Because the second derivative test confirms the minimum, the point is stationary with $f'(3)=0$ and is concave up there with $f''(3)>0$.",
  "y11adv-cs-ex-g4":
    "$f'(x)=3(x+3)(x-1)$ gives a local maximum $(-3,0)$ and local minimum $(1,-32)$. Also $f''(x)=6(x+1)$ changes sign at $x=-1$, where $f(-1)=-16$.",
  "y11adv-cs-ex-i1":
    "$f'(x)=-3(x-1)(x-3)$ gives a local minimum $(1,0)$ and local maximum $(3,4)$. Since $f''(x)=-6x+12$ changes sign at $x=2$, the inflection point is $(2,2)$.",
  "y11adv-cs-ex-i3":
    "For side lengths $x$ and $100/x$, the perimeter is $P=2x+200/x$. Its derivative vanishes at $x=10$, and $P''>0$, so the minimum perimeter is $40$ cm for a $10$ cm square.",
  "y11adv-cs-ex-i5":
    "$f'(x)=3x(x-2)$ and $f''(0)=-6<0$. Thus $(0,0)$ is a local maximum because the curve is concave down there; the fact that its y-coordinate is zero does not prevent a local maximum.",
};

const retainedVariants: Record<string, string[]> = {
  "y11adv-cs-ex-i1": [
    "minimum (1,0), maximum (3,4), inflection (2,2)",
  ],
  "y11adv-cs-ex-i5": [
    "f''(0)=-6<0, so (0,0) is a local maximum",
  ],
};

export const CURVE_SKETCHING_QUALITY_SLUGS = Object.freeze(
  Object.keys(masteryBySlug),
);

export function getCurveSketchingQualityMastery(
  lessonSlug: string,
): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}

export function enhanceCurveSketchingRetainedPractice(
  questions: PracticeQuestion[],
): PracticeQuestion[] {
  return questions.map((question) => {
    const explanation = question.explanation ?? retainedExplanations[question.id];
    const acceptedAnswers = question.choices
      ? question.acceptedAnswers
      : Array.from(
          new Set([
            question.answer,
            ...(question.acceptedAnswers ?? []),
            ...(retainedVariants[question.id] ?? []),
          ]),
        );

    return {
      ...question,
      explanation,
      acceptedAnswers,
    };
  });
}
