import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function pzChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Choose the best option.}",
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Think about whether a zero is a point of inflection (odd multiplicity ≥ 3), a touch (even multiplicity), or a simple crossing (multiplicity 1).",
    explanation,
  };
}

function pzTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Factorise fully and count how many times each root appears.",
    explanation,
  };
}

// ─── Lesson: Multiplicity of Zeroes of Polynomial Functions ─────────────────

const polynomialZeroes: Partial<ExplicitLesson> = {
  description:
    "Analyse the multiplicity of zeroes of polynomial functions and its effect on graph shape: simple crossings, turning points (touches), and stationary inflections.",
  learningIntention:
    "Determine the multiplicity of each zero of a polynomial, state its effect on the graph, and sketch polynomials in factored form by reading multiplicity and end behaviour.",
  successCriteria: [
    "Define the multiplicity of a zero: if (x − a)^k is a factor of P(x) but (x − a)^(k+1) is not, then a is a zero of multiplicity k.",
    "State the graph behaviour at each zero: multiplicity 1 → crosses axis; even multiplicity → touches and turns; odd multiplicity ≥ 3 → stationary inflection (crosses).",
    "Prove that a zero of multiplicity k of P(x) is a zero of multiplicity k−1 of P′(x).",
    "Use multiplicity to match a polynomial's factored form to a sketch, and to determine the equation of a polynomial from a graph.",
  ],
  teaching: {
    paragraphs: [
      "If P(x) = (x − a)^k · Q(x) where Q(a) ≠ 0, then a is a zero of multiplicity k. The exponent k tells us how 'flat' the graph is at x = a. When k = 1 the graph crosses the x-axis sharply. When k is even (2, 4, …) the graph touches the axis and bounces back. When k is odd and ≥ 3 (3, 5, …) the graph flattens out and still crosses — a stationary point of inflection.",
      "To prove the multiplicity result: write P(x) = (x − a)^k · Q(x) and differentiate using the product rule. P′(x) = k(x − a)^(k−1) Q(x) + (x − a)^k Q′(x) = (x − a)^(k−1) [kQ(x) + (x − a)Q′(x)]. The factor in brackets does not vanish at x = a (since kQ(a) ≠ 0), so a is a zero of P′ of multiplicity exactly k − 1.",
      "Consequences: a simple zero (k = 1) of P gives P′(a) ≠ 0 — no stationary point at x = a. A double zero (k = 2) gives P′(a) = 0 and P′′(a) ≠ 0 — a local turning point. A triple zero (k = 3) gives P′(a) = P′′(a) = 0 but P′′′(a) ≠ 0 — a stationary point of inflection.",
      "To sketch P(x) in factored form: (1) find all zeroes and their multiplicities from the factors; (2) determine end behaviour from the leading coefficient and degree; (3) plot the y-intercept; (4) draw, using the multiplicity rules at each zero.",
    ],
    latexBlocks: [
      "P(x) = (x-a)^k Q(x),\\; Q(a)\\ne 0 \\;\\Rightarrow\\; a\\text{ is a zero of multiplicity }k",
      "P'(x) = (x-a)^{k-1}\\bigl[kQ(x)+(x-a)Q'(x)\\bigr] \\;\\Rightarrow\\; a\\text{ is zero of }P'\\text{ of multiplicity }k-1",
      "k=1:\\text{ crosses}\\quad k=2:\\text{ touches and turns}\\quad k\\ge 3\\text{ (odd): stationary inflection}",
    ],
  },
  workedExamples: [
    {
      title: "Identify multiplicities and sketch behaviour",
      questionLatex:
        "P(x) = (x+2)^2(x-1)(x-3)^3.\\text{ State the multiplicity of each zero and describe the graph at each zero.}",
      steps: [
        {
          explanation: "Read off the zeroes from the factored form.",
          latex: "\\text{Zeroes: }x=-2\\text{ (mult 2)},\\;x=1\\text{ (mult 1)},\\;x=3\\text{ (mult 3)}",
        },
        {
          explanation: "Apply the multiplicity rules.",
          latex:
            "x=-2:\\text{ even mult }\\Rightarrow\\text{ touches and turns}\\quad x=1:\\text{ mult 1 }\\Rightarrow\\text{ crosses}\\quad x=3:\\text{ odd mult }\\ge 3\\Rightarrow\\text{ stationary inflection (crosses)}",
        },
        {
          explanation: "Degree = 2+1+3 = 6, leading coefficient positive → both ends go up.",
          latex: "\\text{As }x\\to\\pm\\infty,\\;P(x)\\to+\\infty",
        },
      ],
      finalAnswerLatex:
        "\\text{Touches at }x=-2,\\text{ crosses at }x=1,\\text{ stationary inflection at }x=3.",
    },
    {
      title: "Prove P′(a) = 0 when a is a double zero",
      questionLatex:
        "P(x) = (x-2)^2(x+1).\\text{ Show that }x=2\\text{ is a stationary point and }x=-1\\text{ is not.}",
      steps: [
        {
          explanation: "x = 2 has multiplicity 2, so by the multiplicity theorem it is a zero of P′ of multiplicity 1, i.e. P′(2) = 0.",
          latex: "P'(x) = 2(x-2)(x+1)+(x-2)^2 = (x-2)[2(x+1)+(x-2)] = (x-2)(3x)",
        },
        {
          explanation: "Confirm P′(2) = 0.",
          latex: "P'(2) = (0)(6) = 0 \\;\\checkmark",
        },
        {
          explanation: "x = −1 has multiplicity 1, so P′(−1) ≠ 0.",
          latex: "P'(-1) = (-3)(-3) = 9 \\ne 0 \\;\\checkmark",
        },
      ],
      finalAnswerLatex:
        "P'(2)=0\\text{ (double zero → stationary point)}\\quad P'(-1)=9\\ne 0\\text{ (simple zero → crossing)}",
    },
  ],
  guidedPractice: [
    pzChoice(
      "y12e1-pz-g1",
      "For P(x) = (x − 1)³(x + 2)², what is the multiplicity of the zero x = 1?",
      "C",
      ["1", "2", "3", "6"],
      "The factor (x − 1) appears 3 times, so x = 1 is a zero of multiplicity 3."
    ),
    pzChoice(
      "y12e1-pz-g2",
      "At a zero of multiplicity 2, what does the graph of the polynomial do?",
      "B",
      [
        "Crosses the x-axis at a non-zero gradient.",
        "Touches the x-axis and turns back without crossing.",
        "Has a stationary point of inflection.",
        "Does not reach the x-axis.",
      ],
      "Even multiplicity means the sign of (x − a)^k does not change, so the graph touches and turns."
    ),
    pzTyped(
      "y12e1-pz-g3",
      "P(x) = (x − 3)²(x + 1). Write down the multiplicity of x = 3 as a zero of P′(x).",
      "\\text{Zero of }P'\\text{ at }x=3\\text{ has mult }= k-1",
      "1",
      [],
      "x = 3 has multiplicity 2 in P, so it has multiplicity 2 − 1 = 1 in P′."
    ),
    pzChoice(
      "y12e1-pz-g4",
      "P(x) = x²(x − 4)³. Which description correctly matches the graph at x = 0?",
      "A",
      [
        "Touches the x-axis and turns (even multiplicity).",
        "Crosses the x-axis with a non-zero gradient.",
        "Has a stationary point of inflection.",
        "Does not touch the x-axis.",
      ],
      "x = 0 has multiplicity 2 (even), so the graph touches the axis there and turns back."
    ),
  ],
  independentPractice: [
    pzChoice(
      "y12e1-pz-i1",
      "For P(x) = (x + 5)(x − 2)²(x − 7)³, the zero x = −5 produces what behaviour on the graph?",
      "B",
      [
        "Touches the axis without crossing.",
        "Crosses the axis with a non-zero gradient.",
        "Has a stationary point of inflection.",
        "The graph does not reach x = −5.",
      ],
      "x = −5 has multiplicity 1 (simple zero), so the graph crosses with a non-zero gradient."
    ),
    pzTyped(
      "y12e1-pz-i2",
      "P(x) = (x − 1)⁴(x + 2). State the multiplicity of x = 1 as a zero of P′(x).",
      "\\text{mult of }x=1\\text{ in }P' = k-1",
      "3",
      [],
      "x = 1 has multiplicity 4 in P, so multiplicity 4 − 1 = 3 in P′."
    ),
    pzChoice(
      "y12e1-pz-i3",
      "A polynomial graph touches the x-axis at x = 2 and has a stationary inflection at x = −1. Which factored form is consistent with this?",
      "C",
      [
        "P(x) = (x − 2)(x + 1)³",
        "P(x) = (x − 2)³(x + 1)²",
        "P(x) = (x − 2)²(x + 1)³",
        "P(x) = (x − 2)²(x + 1)",
      ],
      "(x − 2)² gives a touch at x = 2 (even mult); (x + 1)³ gives a stationary inflection at x = −1 (odd mult ≥ 3)."
    ),
    pzTyped(
      "y12e1-pz-i4",
      "P(x) = x(x − 2)². How many stationary points does P(x) have? (Use the multiplicity theorem on P′.)",
      "P'(x) = (x-2)(3x-2)",
      "2",
      [],
      "x = 0 is simple (P′(0) ≠ 0) and x = 2 is a double zero of P, so x = 2 is a simple zero of P′. P′ = x(x−2)·3 + x²·... Factor P′ to find 2 roots."
    ),
    pzChoice(
      "y12e1-pz-i5",
      "The leading term of P(x) = −2(x − 1)²(x + 3) is:",
      "D",
      ["−2x²", "−2x³", "2x³", "−2x³"],
      "Expand the leading terms: (−2)(x²)(x) = −2x³. The polynomial is degree 3 with a negative leading coefficient."
    ),
  ],
  masteryQuiz: [
    pzChoice(
      "y12e1-pz-m1",
      "If a is a zero of multiplicity k of P(x), then a is a zero of multiplicity ____ of P′(x).",
      "B",
      ["k + 1", "k − 1", "k", "2k"],
      "The product-rule proof shows P′(x) = (x − a)^(k−1) · [kQ(x) + (x − a)Q′(x)], giving multiplicity k − 1 in P′."
    ),
    pzChoice(
      "y12e1-pz-m2",
      "At a zero of odd multiplicity ≥ 3, the graph of the polynomial:",
      "C",
      [
        "Does not touch the x-axis.",
        "Touches and turns at the x-axis.",
        "Passes through the x-axis with a stationary point of inflection.",
        "Crosses the x-axis with a non-zero gradient.",
      ],
      "Odd multiplicity ≥ 3 means the sign changes (so graph crosses) but the gradient is zero at the root (stationary inflection)."
    ),
    pzTyped(
      "y12e1-pz-m3",
      "P(x) = (x + 1)³(x − 4)². What is the degree of P(x)?",
      "\\deg P = 3+2",
      "5",
      [],
      "Sum the multiplicities: 3 + 2 = 5."
    ),
    pzChoice(
      "y12e1-pz-m4",
      "For P(x) = (x − 3)²(x + 1)³, the y-intercept is:",
      "A",
      ["−9", "9", "−27", "27"],
      "P(0) = (0 − 3)²(0 + 1)³ = 9 · 1 = 9. Wait — (−3)² = 9 and (1)³ = 1, so P(0) = 9."
    ),
    pzTyped(
      "y12e1-pz-m5",
      "P(x) = (x − 2)³(x + 1)². Find P(0).",
      "P(0) = (-2)^3(1)^2",
      "-8",
      [],
      "P(0) = (−2)³ · (1)² = −8 · 1 = −8."
    ),
    pzChoice(
      "y12e1-pz-m6",
      "A polynomial P(x) has a zero of multiplicity 3 at x = 5. What is true of P′(5)?",
      "C",
      [
        "P′(5) ≠ 0",
        "x = 5 is a zero of P′ of multiplicity 3.",
        "x = 5 is a zero of P′ of multiplicity 2.",
        "P′ has no real zero at x = 5.",
      ],
      "Multiplicity in P is 3, so multiplicity in P′ is 3 − 1 = 2."
    ),
    pzChoice(
      "y12e1-pz-m7",
      "P(x) = (x − 1)(x + 2)². The graph of P near x = −2 looks like:",
      "B",
      [
        "A straight line crossing the axis.",
        "A parabola vertex touching the axis.",
        "A cubic with a horizontal inflection.",
        "A vertical asymptote.",
      ],
      "Multiplicity 2 at x = −2 means the graph looks like a parabola touching the x-axis there."
    ),
    pzTyped(
      "y12e1-pz-m8",
      "Write the degree of the derivative of P(x) = (x − 1)²(x + 3)³.",
      "\\deg P = 5,\\quad \\deg P' = 5-1",
      "4",
      [],
      "P has degree 5, so P′ has degree 4."
    ),
    pzChoice(
      "y12e1-pz-m9",
      "P(x) = −3(x − 2)²(x + 1)³. What is the end behaviour as x → +∞?",
      "D",
      [
        "P(x) → +∞",
        "P(x) → 0",
        "P(x) → +∞ then −∞",
        "P(x) → −∞",
      ],
      "Degree 5, leading coefficient −3 (negative, odd degree): as x → +∞, P(x) → −∞."
    ),
    pzChoice(
      "y12e1-pz-m10",
      "Which of the following is the correct product-rule step when differentiating P(x) = (x − a)^k Q(x)?",
      "A",
      [
        "P′(x) = k(x − a)^(k−1)Q(x) + (x − a)^k Q′(x)",
        "P′(x) = k(x − a)^(k−1)Q′(x)",
        "P′(x) = (x − a)^k Q′(x)",
        "P′(x) = k(x − a)^(k−1)",
      ],
      "Product rule: derivative of (x − a)^k is k(x − a)^(k−1), times Q(x), plus (x − a)^k times Q′(x)."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Registry ────────────────────────────────────────────────────────────────

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "calculus-applications-polynomial-zeroes": polynomialZeroes,
};

export function year12Extension1PolynomialZeroesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "calculus-applications") return undefined;
  return lessons[lesson.slug];
}
