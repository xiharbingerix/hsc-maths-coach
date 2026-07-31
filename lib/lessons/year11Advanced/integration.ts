import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";
import {
  addTrapezoidalQuestionVisual,
  addTrapezoidalWorkedVisual,
} from "./integrationVisuals";

type QualityTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

type QualityPracticeQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions?: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
};

function numericFormatVariants(answer: string): string[] {
  const value = answer.trim();
  if (/^-?\d+$/.test(value)) return [`${value}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(value)) return [`${value}0`];
  return [];
}

function integrationFeedback(prompt: string, latex: string, answer: string) {
  if (prompt.includes("primitive") || prompt.includes("antiderivative")) {
    return `Apply the relevant reverse-derivative rule term by term to ${latex || "the displayed function"}. This gives ${answer}; differentiating the result checks that the original integrand is recovered.`;
  }
  if (prompt.includes("area") || prompt.includes("Area")) {
    return `Identify the required bounded region and evaluate the relevant definite integral from the displayed data. The resulting geometric area is ${answer}, with negative signed contributions converted appropriately when area is requested.`;
  }
  if (prompt.includes("trapezoid") || prompt.includes("estimate")) {
    return `Use the stated interval width and the trapezoidal weighting of the endpoint and interior ordinates. Substitution of the displayed values gives the estimate ${answer}.`;
  }
  if (prompt.includes("Solve") || prompt.includes("Find")) {
    return `Apply the integration rule indicated by the displayed expression, then use any stated bounds or condition to determine the required value. The resulting answer is ${answer}.`;
  }
  return `Use the defining integration relationship shown in ${latex || "the stimulus"} and check the result by differentiation or substitution. This gives ${answer}.`;
}

function fa(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(
      new Set([answer, ...numericFormatVariants(answer), ...acceptedAnswers]),
    ),
    hint:
      "Identify the relevant reverse-derivative or definite-integral rule before simplifying.",
    explanation: integrationFeedback(prompt, latex, answer),
  };
}

function mc(
  id: string,
  prompt: string,
  answer: string,
  choices: { label: string; text: string }[],
  explanation: string,
  latex?: string
): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

function qualityAnswer({
  id,
  prompt,
  latex,
  answer,
  acceptedAnswers,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: string;
  acceptedAnswers: string[];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
  };
}

function qualityChoice({
  id,
  prompt,
  latex,
  answer,
  choices,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
  distractorMisconceptions,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: "A" | "B" | "C" | "D";
  choices: [string, string, string, string];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
    distractorMisconceptions,
  };
}

// ─── L1: Primitives and Antidifferentiation ──────────────────────────────────

const primWorked: WorkedExample[] = [
  {
    title: "Find a primitive using the reverse power rule",
    questionLatex: "\\int 6x^2\\,dx",
    steps: [
      { explanation: "The power is 2. Increase it by one to get 3.", latex: "x^{2+1}=x^3" },
      { explanation: "Divide the coefficient by the new power.", latex: "\\frac{6}{3}x^3=2x^3" },
      { explanation: "Add the constant of integration.", latex: "2x^3+C" },
      { explanation: "Check by differentiating.", latex: "\\frac{d}{dx}(2x^3+C)=6x^2\\checkmark" },
    ],
    finalAnswerLatex: "2x^3+C",
  },
  {
    title: "Find a primitive for a polynomial",
    questionLatex: "\\int (3x^2-4x+5)\\,dx",
    steps: [
      { explanation: "Integrate term by term.", latex: "" },
      { explanation: "Antidifferentiate 3x².", latex: "\\frac{3}{3}x^3=x^3" },
      { explanation: "Antidifferentiate −4x.", latex: "\\frac{-4}{2}x^2=-2x^2" },
      { explanation: "Antidifferentiate the constant 5.", latex: "5x" },
      { explanation: "Combine and add a single +C.", latex: "x^3-2x^2+5x+C" },
    ],
    finalAnswerLatex: "x^3-2x^2+5x+C",
  },
  {
    title: "Integrate a negative power",
    questionLatex: "\\int 4x^{-3}\\,dx",
    steps: [
      { explanation: "Increase the power from −3 to −2.", latex: "x^{-3+1}=x^{-2}" },
      { explanation: "Divide the coefficient by the new power.", latex: "\\frac{4}{-2}x^{-2}=-2x^{-2}" },
      { explanation: "Add the constant of integration.", latex: "-2x^{-2}+C" },
    ],
    finalAnswerLatex: "-2x^{-2}+C",
  },
];

const primGuided: PracticeQuestion[] = [
  fa("y11adv-intg-prim-g1", "Find the primitive.", "\\int 8x^3\\,dx", "2x^4+C", ["2x^4 + C"]),
  mc("y11adv-intg-prim-g2", "What is the new power when integrating x⁵?", "B",
    [{ label: "A", text: "5" }, { label: "B", text: "6" }, { label: "C", text: "4" }, { label: "D", text: "10" }],
    "Integrating increases the power by one: 5 + 1 = 6.", "\\int x^5\\,dx"),
  fa("y11adv-intg-prim-g3", "Find the primitive.", "\\int (2x+3)\\,dx", "x^2+3x+C", ["x^2 + 3x + C"]),
  mc("y11adv-intg-prim-g4", "Which function is an antiderivative of 4x³?", "C",
    [{ label: "A", text: "$12x^2$" }, { label: "B", text: "$4x^4$" }, { label: "C", text: "$x^4$" }, { label: "D", text: "$x^4+7$" }],
    "Both x⁴ and x⁴+7 differentiate to 4x³, but only x⁴ alone is listed in options A–C as a primitive.", ""),
];

const primIndep: PracticeQuestion[] = [
  fa("y11adv-intg-prim-i1", "Find the primitive.", "\\int 10x^4\\,dx", "2x^5+C", ["2x^5 + C"]),
  fa("y11adv-intg-prim-i2", "Find the primitive.", "\\int -6x^2\\,dx", "-2x^3+C", ["-2x^3 + C"]),
  fa("y11adv-intg-prim-i3", "Find the primitive.", "\\int (x^2+2x-1)\\,dx", "x^3/3+x^2-x+C", ["(1/3)x^3+x^2-x+C"]),
  fa("y11adv-intg-prim-i4", "Find the primitive.", "\\int x^7\\,dx", "x^8/8+C", ["(1/8)x^8+C"]),
  mc("y11adv-intg-prim-i5", "What does the constant of integration C represent?", "A",
    [{ label: "A", text: "A family of parallel curves, each a valid antiderivative" }, { label: "B", text: "An error in the calculation" }, { label: "C", text: "The area under the curve" }, { label: "D", text: "The derivative of the function" }],
    "Because d/dx(C) = 0, any constant added to a primitive still differentiates to the original expression. All such curves are valid antiderivatives.", ""),
];

const primMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-prim-qm1",
    prompt:
      "Find the complete family of primitives, writing the negative-power term with a positive denominator if possible.",
    latex: "\\int\\left(6x^2-4x^{-2}\\right)\\,dx",
    answer: "2x^3+4/x+C",
    acceptedAnswers: [
      "2x^3+4x^(-1)+C",
      "2x^3+4x^{-1}+C",
      "2x^3 + 4/x + C",
    ],
    hint:
      "Apply the reverse power rule separately to each term, then include one arbitrary constant.",
    explanation:
      "For each power other than negative one, increase the exponent by one and divide by the new exponent. Thus 6x^2 becomes 2x^3, while -4x^(-2) becomes 4x^(-1), since differentiating 4x^(-1) gives -4x^(-2). Therefore the family is 2x^3+4/x+C.",
    difficulty: 3,
    diagnosticIntent:
      "Checks term-by-term antidifferentiation, sign control with negative powers, and inclusion of the arbitrary constant.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-prim-qm2",
    prompt:
      "A student writes the result below. Which critique most precisely identifies the mathematical issue?",
    latex: "\\int 8x^3\\,dx=2x^4",
    answer: "C",
    choices: [
      "The coefficient should be 32 because differentiation multiplies by the power.",
      "The exponent should remain 3 because integration does not change powers.",
      "The antiderivative term is correct, but +C is required to represent every primitive.",
      "The term should be 2x^3+C because only the coefficient changes.",
    ],
    hint:
      "Differentiate the proposed expression, then decide whether it represents one function or the whole family.",
    explanation:
      "Differentiating 2x^4 gives 8x^3, so the power and coefficient are correct. However, an indefinite integral represents every function with that derivative. Since constants disappear under differentiation, the complete result is 2x^4+C, making C the precise critique.",
    difficulty: 3,
    diagnosticIntent:
      "Distinguishes a correct particular antiderivative from the complete family required by an indefinite integral.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Confuses differentiation with antidifferentiation and multiplies instead of reversing the power rule.",
      B: "Treats integration as a coefficient-only operation and leaves the exponent unchanged.",
      D: "Divides the coefficient but fails to increase the exponent.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-prim-qm3",
    prompt:
      "The function shown is a primitive of the displayed derivative for every real x. Determine the value of a.",
    latex: "F(x)=ax^4+3x,\\qquad F'(x)=12x^3+3",
    answer: "a=3",
    acceptedAnswers: ["3", "a = 3", "3.0"],
    hint:
      "Differentiate ax^4+3x and equate the coefficient of x cubed with the stated derivative.",
    explanation:
      "Differentiating gives F'(x)=4ax^3+3. For this to equal 12x^3+3 for every x, corresponding coefficients must match, so 4a=12. Hence a=3. This uses differentiation to verify and recover the coefficient in a proposed primitive.",
    difficulty: 3,
    diagnosticIntent:
      "Checks whether students can reverse-check a proposed primitive and compare polynomial coefficients correctly.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-prim-qm4",
    prompt:
      "A student claims the following power-rule calculation is complete. Which correction is required?",
    latex: "\\int x^5\\,dx=x^6+C",
    answer: "B",
    choices: [
      "Replace x^6 by 5x^4 because integration lowers the power.",
      "Divide by the new exponent: the result is x^6/6+C.",
      "Keep x^6 but replace +C with +6.",
      "The calculation is already correct because the exponent increased by one.",
    ],
    hint:
      "Differentiate x^6 and compare the coefficient obtained with the original integrand x^5.",
    explanation:
      "Increasing the exponent is only the first part of the reverse power rule. Since the derivative of x^6 is 6x^5, the coefficient must be divided by 6. Therefore the correct primitive is x^6/6+C, so option B identifies the missing step.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses the common incomplete power rule in which the exponent is increased without dividing by it.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Applies the differentiation power rule instead of reversing it.",
      C: "Treats the divisor as a replacement for the arbitrary constant.",
      D: "Recognises the exponent change but omits the necessary coefficient adjustment.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-prim-qm5",
    prompt:
      "The proposed function is a primitive of the displayed polynomial. Determine the value of k.",
    latex: "F(x)=2x^3+kx^2+x,\\qquad F'(x)=6x^2-8x+1",
    answer: "k=-4",
    acceptedAnswers: ["-4", "k = -4", "-4.0"],
    hint:
      "Differentiate the proposed primitive and match the coefficient of the linear term.",
    explanation:
      "Differentiating the proposal gives F'(x)=6x^2+2kx+1. Matching this with 6x^2-8x+1 requires 2k=-8, so k=-4. The other coefficients already agree, confirming that this value makes the equality true for all x.",
    difficulty: 4,
    diagnosticIntent:
      "Tests reverse use of differentiation and coefficient matching inside a parameterised primitive.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-prim-qm6",
    prompt:
      "The two functions below are primitives of the same derivative. Find the constant vertical separation G(x)-F(x).",
    latex: "F(x)=x^2-3x+1,\\qquad G(x)=x^2-3x+8",
    answer: "7",
    acceptedAnswers: ["7.0", "G(x)-F(x)=7", "G-F=7"],
    hint:
      "Subtract the functions and observe which non-constant terms cancel.",
    explanation:
      "Subtracting gives G(x)-F(x)=(x^2-3x+8)-(x^2-3x+1)=7. Their derivatives are both 2x-3 because the constants vanish. This illustrates why all primitives of a given function differ only by an arbitrary constant.",
    difficulty: 4,
    diagnosticIntent:
      "Checks conceptual understanding that primitives of one function form a family differing by constants.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-prim-qm7",
    prompt:
      "For integer n from -4 to 4, excluding n=-1, count the values for which a primitive of x^n is a polynomial.",
    latex: "\\int x^n\\,dx,\\qquad n\\in\\{-4,-3,-2,0,1,2,3,4\\}",
    answer: "5",
    acceptedAnswers: ["5.0", "five", "n=0,1,2,3,4"],
    hint:
      "Apply the reverse power rule and decide when the new exponent n+1 is a non-negative integer.",
    explanation:
      "For n not equal to -1, a primitive is x^(n+1)/(n+1)+C. It is polynomial when n+1 is a non-negative integer, which here occurs for n=0,1,2,3,4. The negative choices produce negative powers, so exactly five listed values work.",
    difficulty: 4,
    diagnosticIntent:
      "Probes generalisation of the reverse power rule and classification of when its result is polynomial.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-prim-qm8",
    prompt:
      "A student applies the power rule directly to the outer square as shown. Which response gives a valid method?",
    latex: "\\int (x^2+1)^2\\,dx\\overset{?}{=}\\frac{(x^2+1)^3}{3}+C",
    answer: "D",
    choices: [
      "The working is valid because every squared expression integrates by increasing its outer power.",
      "Replace the denominator 3 by 2, leaving the rest unchanged.",
      "Differentiate x^2+1 first, so the answer is 2x(x^2+1)+C.",
      "Expand to x^4+2x^2+1, then integrate each term separately.",
    ],
    hint:
      "Check by differentiating the proposed answer, and consider whether the integrand can first be written as a polynomial.",
    explanation:
      "The direct outer power rule is invalid because differentiating (x^2+1)^3/3 introduces an extra factor 2x. Here the reliable method is to expand (x^2+1)^2=x^4+2x^2+1 and integrate term by term, giving x^5/5+2x^3/3+x+C.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses inappropriate transfer of the simple power rule to a composite expression without a matching inner derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Assumes the power rule applies unchanged to any composite expression.",
      B: "Adjusts only the divisor without accounting for the inner function and its derivative.",
      C: "Differentiates the integrand instead of finding an antiderivative.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-prim-qm9",
    prompt:
      "Expand the product and hence find the complete family of primitives.",
    latex: "\\int (x-1)^2(x+2)\\,dx",
    answer: "x^4/4-3x^2/2+2x+C",
    acceptedAnswers: [
      "(1/4)x^4-(3/2)x^2+2x+C",
      "0.25x^4-1.5x^2+2x+C",
      "x^4/4+(-3/2)x^2+2x+C",
    ],
    hint:
      "First expand (x-1)^2(x+2) completely; the cubic and quadratic terms simplify before integration.",
    explanation:
      "Expanding gives (x^2-2x+1)(x+2)=x^3-3x+2 because the x^2 terms cancel. Integrating term by term then gives x^4/4-3x^2/2+2x+C. Differentiating this result recovers x^3-3x+2 and hence the original product.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses synthesis of algebraic expansion, simplification, antidifferentiation, and derivative-based checking.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-prim-qm10",
    prompt:
      "The proposed function is a primitive of the displayed expression for x not equal to zero. Find a+b.",
    latex: "F(x)=ax^4+bx^{-2},\\qquad F'(x)=8x^3-6x^{-3}",
    answer: "5",
    acceptedAnswers: ["5.0", "a+b=5", "a = 2, b = 3"],
    hint:
      "Differentiate both terms in F, then match the coefficients of x cubed and x to the power negative three.",
    explanation:
      "Differentiating gives F'(x)=4ax^3-2bx^(-3). Coefficient matching with 8x^3-6x^(-3) gives 4a=8 and -2b=-6, so a=2 and b=3. Therefore a+b=5. Both powers and signs must be matched independently.",
    difficulty: 5,
    diagnosticIntent:
      "Combines negative-power differentiation with two simultaneous coefficient comparisons in a reverse primitive problem.",
    taskType: "synthesis",
  }),
];

// ─── L2: Standard Antiderivatives ────────────────────────────────────────────

const stdWorked: WorkedExample[] = [
  {
    title: "Integrate a sum involving exponential and polynomial",
    questionLatex: "\\int (e^x + 2x)\\,dx",
    steps: [
      { explanation: "The antiderivative of eˣ is eˣ.", latex: "\\int e^x\\,dx = e^x" },
      { explanation: "The antiderivative of 2x is x².", latex: "\\int 2x\\,dx = x^2" },
      { explanation: "Combine with one constant of integration.", latex: "e^x+x^2+C" },
    ],
    finalAnswerLatex: "e^x+x^2+C",
  },
  {
    title: "Integrate a trigonometric expression",
    questionLatex: "\\int (3\\cos x - 2\\sin x)\\,dx",
    steps: [
      { explanation: "The antiderivative of cos x is sin x.", latex: "\\int 3\\cos x\\,dx = 3\\sin x" },
      { explanation: "The antiderivative of sin x is −cos x.", latex: "\\int -2\\sin x\\,dx = 2\\cos x" },
      { explanation: "Combine with +C.", latex: "3\\sin x+2\\cos x+C" },
    ],
    finalAnswerLatex: "3\\sin x+2\\cos x+C",
  },
  {
    title: "Integrate a reciprocal function",
    questionLatex: "\\int \\frac{4}{x}\\,dx",
    steps: [
      { explanation: "The antiderivative of 1/x is ln|x|.", latex: "\\int \\frac{1}{x}\\,dx=\\ln|x|" },
      { explanation: "Multiply by the constant 4.", latex: "4\\ln|x|+C" },
    ],
    finalAnswerLatex: "4\\ln|x|+C",
  },
];

const stdGuided: PracticeQuestion[] = [
  fa("y11adv-intg-std-g1", "Find the primitive.", "\\int e^x\\,dx", "e^x+C", ["e^x + C"]),
  mc("y11adv-intg-std-g2", "What is the antiderivative of cos x?", "A",
    [{ label: "A", text: "$\\sin x+C$" }, { label: "B", text: "$-\\sin x+C$" }, { label: "C", text: "$\\cos x+C$" }, { label: "D", text: "$-\\cos x+C$" }],
    "Since d/dx(sin x) = cos x, the antiderivative of cos x is sin x + C.", "\\int \\cos x\\,dx"),
  fa("y11adv-intg-std-g3", "Find the primitive.", "\\int (e^x + \\cos x)\\,dx", "e^x+sin x+C", ["e^x + sinx + C", "e^x+\\sin x+C"]),
  mc("y11adv-intg-std-g4", "Which is the antiderivative of sin x?", "B",
    [{ label: "A", text: "$\\cos x+C$" }, { label: "B", text: "$-\\cos x+C$" }, { label: "C", text: "$\\sin x+C$" }, { label: "D", text: "$-\\sin x+C$" }],
    "Since d/dx(−cos x) = sin x, the antiderivative of sin x is −cos x + C.", "\\int \\sin x\\,dx"),
];

const stdIndep: PracticeQuestion[] = [
  fa("y11adv-intg-std-i1", "Find the primitive.", "\\int 5e^x\\,dx", "5e^x+C", ["5e^x + C"]),
  fa("y11adv-intg-std-i2", "Find the primitive.", "\\int 3\\cos x\\,dx", "3sin x+C", ["3\\sin x+C", "3sinx+C"]),
  fa("y11adv-intg-std-i3", "Find the primitive.", "\\int \\frac{2}{x}\\,dx", "2ln|x|+C", ["2\\ln|x|+C", "2ln|x|+C"]),
  fa("y11adv-intg-std-i4", "Find the primitive.", "\\int (2\\sin x + e^x)\\,dx", "-2cos x+e^x+C", ["-2\\cos x+e^x+C"]),
  fa("y11adv-intg-std-i5", "Find the primitive.", "\\int (x^2 + 3e^x - \\sin x)\\,dx", "x^3/3+3e^x+cos x+C", ["(1/3)x^3+3e^x+\\cos x+C"]),
];

const stdMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-std-qm1",
    prompt:
      "Find the complete family of primitives using the standard exponential and trigonometric antiderivatives.",
    latex: "\\int\\left(3e^x-4\\cos x\\right)\\,dx",
    answer: "3e^x-4sin x+C",
    acceptedAnswers: [
      "3e^x-4\\sin x+C",
      "3e^x - 4sin(x) + C",
      "3exp(x)-4sin(x)+C",
    ],
    hint:
      "Recall that e to the x is its own derivative and that the derivative of sin x is cos x.",
    explanation:
      "Integrate term by term. Since the derivative of e^x is e^x, the first term remains 3e^x. Since the derivative of sin x is cos x, -4cos x has primitive -4sin x. Including the arbitrary constant gives 3e^x-4sin x+C.",
    difficulty: 3,
    diagnosticIntent:
      "Checks accurate recall and combination of the standard exponential and cosine antiderivatives.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-std-qm2",
    prompt:
      "A student gives the following antiderivative. Which correction is mathematically valid?",
    latex: "\\int \\sin x\\,dx=\\cos x+C",
    answer: "A",
    choices: [
      "Change the result to -cos x+C because the derivative of cos x is -sin x.",
      "Change the result to sin x+C because sine is unchanged by integration.",
      "Change the result to -sin x+C because integration only changes the sign.",
      "Keep cos x+C because differentiation and integration use the same sign.",
    ],
    hint:
      "Differentiate the student's proposed cosine term and compare it with positive sin x.",
    explanation:
      "Differentiating cos x gives -sin x, the opposite of the required integrand. Differentiating -cos x instead gives sin x, so the correct family is -cos x+C. Option A fixes the sign by using the derivative relationship rather than a memorised pattern alone.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses the frequent sign error when reversing the derivative relationship between sine and cosine.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Assumes sine is its own antiderivative in the same way as e to the x.",
      C: "Changes a sign without changing to the complementary trigonometric function.",
      D: "Forgets that differentiating cosine introduces a negative sign.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-std-qm3",
    prompt:
      "The proposed function has the displayed derivative for every real x. Determine a+b.",
    latex: "F(x)=ae^x+b\\sin x,\\qquad F'(x)=5e^x+6\\cos x",
    answer: "11",
    acceptedAnswers: ["11.0", "a+b=11", "a = 5, b = 6"],
    hint:
      "Differentiate each term in F and match the exponential and cosine coefficients separately.",
    explanation:
      "Differentiating gives F'(x)=ae^x+bcos x. Equality for every x requires the independent coefficients to match: a=5 and b=6. Therefore a+b=11. This also checks that sin x, rather than -sin x, is the primitive associated with cos x.",
    difficulty: 3,
    diagnosticIntent:
      "Checks reverse verification of standard primitives and coefficient matching across two function families.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-std-qm4",
    prompt:
      "A student is working only on the interval x<0 and writes the result below. Which evaluation is correct?",
    latex: "\\int\\frac{1}{x}\\,dx=\\ln x+C",
    answer: "B",
    choices: [
      "It is correct because the derivative of ln x is 1/x for every non-zero x.",
      "It is not real-valued there; ln|x|+C, equivalently ln(-x)+C on this interval, is required.",
      "It should be xln x+C because the integrand contains a reciprocal.",
      "No real primitive of 1/x exists on any negative interval.",
    ],
    hint:
      "Check the real domain of ln x, then differentiate ln(-x) for negative x.",
    explanation:
      "For x<0, ln x is not a real-valued function, so it cannot be the required real primitive. However, ln|x|=ln(-x) on this interval, and its derivative is (1/(-x))(-1)=1/x. Thus option B gives both the domain correction and a valid equivalent form.",
    difficulty: 3,
    diagnosticIntent:
      "Tests whether students connect the absolute value in the reciprocal antiderivative with its real domain.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Extends the positive-domain derivative formula for ln x across zero without checking its real domain.",
      C: "Invents a product resembling integration by parts rather than using the standard reciprocal primitive.",
      D: "Mistakes the failure of ln x on negative inputs for non-existence of any local primitive.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-std-qm5",
    prompt:
      "The proposed function is a primitive of the displayed expression on any interval not containing zero. Find k.",
    latex:
      "F(x)=ke^x+3\\cos x+2\\ln|x|,\\qquad F'(x)=4e^x-3\\sin x+\\frac{2}{x}",
    answer: "k=4",
    acceptedAnswers: ["4", "k = 4", "4.0"],
    hint:
      "Differentiate the proposal and compare the coefficient of e to the x; the other two terms provide checks.",
    explanation:
      "Differentiating F gives ke^x-3sin x+2/x. The sine and reciprocal terms already match the target derivative. Matching the exponential coefficient requires k=4. Substitution then confirms every term of the derivative is correct.",
    difficulty: 4,
    diagnosticIntent:
      "Assesses coefficient matching while coordinating exponential, trigonometric, and reciprocal derivative pairs.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-std-qm6",
    prompt:
      "On the interval x<0, decide whether H is a primitive of 1/x and give the derivative-based conclusion.",
    latex: "H(x)=\\ln(-x)",
    answer: "Yes, H'(x)=1/x",
    acceptedAnswers: [
      "yes",
      "H'(x)=1/x",
      "yes because d/dx ln(-x)=1/x",
    ],
    hint:
      "Differentiate ln(-x) with the chain rule and simplify the two negative factors.",
    explanation:
      "On x<0 the quantity -x is positive, so H is real-valued. By the chain rule, H'(x)=(1/(-x))(-1)=1/x. Therefore H is a valid primitive of 1/x on that interval, consistent with ln|x| because |x|=-x there.",
    difficulty: 4,
    diagnosticIntent:
      "Investigates how domain and the chain rule justify an equivalent reciprocal primitive on a negative interval.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-std-qm7",
    prompt:
      "Find all real a and b for which the trigonometric function shown is its own derivative for every x.",
    latex: "H(x)=a\\sin x+b\\cos x,\\qquad H'(x)=H(x)",
    answer: "a=0,b=0",
    acceptedAnswers: [
      "a = 0, b = 0",
      "(a,b)=(0,0)",
      "a and b are both zero",
    ],
    hint:
      "Differentiate H, then equate the separate sine and cosine coefficients.",
    explanation:
      "Differentiation gives H'(x)=acos x-bsin x. Matching sine coefficients with H requires -b=a, while matching cosine coefficients requires a=b. Together these give a=-a, hence a=0 and then b=0. Only the zero trigonometric combination is its own derivative.",
    difficulty: 4,
    diagnosticIntent:
      "Probes structural understanding of sine-cosine differentiation through a coefficient system rather than direct recall.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-std-qm8",
    prompt:
      "A student claims the following standard exponential rule applies unchanged. Which diagnosis is correct?",
    latex: "\\int e^{2x}\\,dx=e^{2x}+C",
    answer: "C",
    choices: [
      "The result is correct because every exponential function is its own derivative.",
      "The exponent should increase, giving e^(2x+1)/(2x+1)+C.",
      "A factor of one half is needed because differentiating e^(2x) produces an extra factor 2.",
      "The result should be 2e^x+C because the exponent coefficient moves outside.",
    ],
    hint:
      "Differentiate e to the 2x and identify the constant factor introduced by the chain rule.",
    explanation:
      "The chain rule gives d/dx(e^(2x))=2e^(2x), so e^(2x) alone differentiates to twice the integrand. Multiplying by one half compensates for that factor: the correct primitive is (1/2)e^(2x)+C. Therefore C is the valid diagnosis.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses overgeneralisation of the e-to-the-x primitive when a non-unit linear inner derivative is present.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Ignores the chain-rule factor created by the inner function 2x.",
      B: "Misapplies the algebraic reverse power rule to an exponential expression.",
      D: "Moves the inner coefficient while also incorrectly changing the exponential argument.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-std-qm9",
    prompt:
      "Simplify the integrand into standard terms and hence find the complete family of primitives.",
    latex: "\\int\\frac{(e^x+1)^2}{e^x}\\,dx",
    answer: "e^x+2x-e^(-x)+C",
    acceptedAnswers: [
      "e^x+2x-e^{-x}+C",
      "e^x+2x-1/e^x+C",
      "exp(x)+2x-exp(-x)+C",
    ],
    hint:
      "Expand the numerator and divide every term by e to the x before integrating.",
    explanation:
      "Expanding and dividing gives (e^(2x)+2e^x+1)/e^x=e^x+2+e^(-x). The primitives are e^x, 2x, and -e^(-x), since differentiating -e^(-x) gives e^(-x). Thus the result is e^x+2x-e^(-x)+C.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses synthesis of exponential algebra, standard primitives, sign control, and derivative checking.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-std-qm10",
    prompt:
      "The proposed function is a primitive of the displayed expression for x not equal to zero. Determine a+b+c.",
    latex:
      "F(x)=ae^{2x}+b\\cos(3x)+c\\ln|x|,\\qquad F'(x)=8e^{2x}+6\\sin(3x)-\\frac{5}{x}",
    answer: "-3",
    acceptedAnswers: ["-3.0", "a+b+c=-3", "a=4,b=-2,c=-5"],
    hint:
      "Differentiate all three terms, retaining each inner-derivative factor, then match coefficients.",
    explanation:
      "Differentiating gives F'(x)=2ae^(2x)-3bsin(3x)+c/x. Matching coefficients yields 2a=8, -3b=6 and c=-5, so a=4, b=-2 and c=-5. Their sum is 4-2-5=-3. The inner factors 2 and 3 are essential.",
    difficulty: 5,
    diagnosticIntent:
      "Combines three standard primitive families with chain-rule coefficient reversal and multi-step synthesis.",
    taskType: "synthesis",
  }),
];

// ─── L3: Initial-Value Problems ───────────────────────────────────────────────

const ivWorked: WorkedExample[] = [
  {
    title: "Find the particular primitive given a point",
    questionLatex: "f'(x)=2x+3,\\quad f(1)=7",
    steps: [
      { explanation: "Integrate the derivative to get the family of primitives.", latex: "f(x)=x^2+3x+C" },
      { explanation: "Substitute the known point (1, 7) to find C.", latex: "7=1+3+C\\Rightarrow C=3" },
      { explanation: "Write the particular primitive.", latex: "f(x)=x^2+3x+3" },
    ],
    finalAnswerLatex: "f(x)=x^2+3x+3",
  },
  {
    title: "Reconstruct a function from its derivative",
    questionLatex: "y'=6x^2-4,\\quad y=10\\text{ when }x=2",
    steps: [
      { explanation: "Antidifferentiate to get the general solution.", latex: "y=2x^3-4x+C" },
      { explanation: "Substitute x = 2, y = 10.", latex: "10=2(8)-4(2)+C=16-8+C\\Rightarrow C=2" },
      { explanation: "Write the equation of the curve.", latex: "y=2x^3-4x+2" },
    ],
    finalAnswerLatex: "y=2x^3-4x+2",
  },
];

const ivGuided: PracticeQuestion[] = [
  fa("y11adv-intg-iv-g1", "Find C given f'(x) = 4x and f(0) = 5.", "", "5", ["C=5"]),
  fa("y11adv-intg-iv-g2", "Find f(x) given f'(x) = 3x² and f(1) = 4.", "f'(x)=3x^2,\\quad f(1)=4", "x^3+3", ["f(x)=x^3+3"]),
  mc("y11adv-intg-iv-g3", "What does finding C from an initial condition do?", "B",
    [{ label: "A", text: "Removes the need for +C in all future integrals" }, { label: "B", text: "Selects one particular curve from the family of primitives" }, { label: "C", text: "Differentiates the primitive again" }, { label: "D", text: "Gives the area under the curve" }],
    "Each value of C corresponds to a different vertical shift of the same curve. An initial condition pins down which one passes through the given point.", ""),
  fa("y11adv-intg-iv-g4", "Find f(x) given f'(x) = 2x − 1 and f(3) = 6.", "f'(x)=2x-1,\\quad f(3)=6", "x^2-x+0", ["x^2-x", "f(x)=x^2-x"]),
];

const ivIndep: PracticeQuestion[] = [
  fa("y11adv-intg-iv-i1", "Find f(x) given f'(x) = 6x + 2 and f(0) = −3.", "f'(x)=6x+2,\\quad f(0)=-3", "3x^2+2x-3", ["f(x)=3x^2+2x-3"]),
  fa("y11adv-intg-iv-i2", "Find y given dy/dx = 4x³ and y = 8 when x = 1.", "\\frac{dy}{dx}=4x^3,\\quad (1,8)", "x^4+7", ["y=x^4+7"]),
  fa("y11adv-intg-iv-i3", "Find f(x) given f'(x) = e^x and f(0) = 2.", "f'(x)=e^x,\\quad f(0)=2", "e^x+1", ["f(x)=e^x+1"]),
  mc("y11adv-intg-iv-i4", "The family y = x² + C contains which of the following curves?", "D",
    [{ label: "A", text: "Only the curve through the origin" }, { label: "B", text: "Only curves with a positive y-intercept" }, { label: "C", text: "Only the curve with y-intercept 3" }, { label: "D", text: "All curves with gradient function 2x" }],
    "All members of y = x² + C have derivative 2x. They are parallel curves, all shifted vertically by different amounts of C.", ""),
  fa("y11adv-intg-iv-i5", "Find y given y' = cos x and y = 1 when x = 0.", "y'=\\cos x,\\quad y(0)=1", "sin x+1", ["y=\\sin x+1", "\\sin x+1"]),
];

const ivMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-iv-qm1",
    prompt:
      "Find the particular function satisfying the derivative and initial condition.",
    latex: "f'(x)=6x^2-4x,\\qquad f(1)=5",
    answer: "f(x)=2x^3-2x^2+5",
    acceptedAnswers: [
      "2x^3-2x^2+5",
      "f(x) = 2x^3 - 2x^2 + 5",
      "y=2x^3-2x^2+5",
    ],
    hint:
      "Antidifferentiate the gradient first, retaining +C, and only then substitute x=1 and f(1)=5.",
    explanation:
      "Antidifferentiating term by term gives f(x)=2x^3-2x^2+C. The condition f(1)=5 gives 5=2-2+C, so C=5. Therefore f(x)=2x^3-2x^2+5. Differentiating the result recovers 6x^2-4x and confirms the model.",
    difficulty: 3,
    diagnosticIntent:
      "Checks the complete initial-value sequence: antidifferentiate, retain the constant, substitute, and verify.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-iv-qm2",
    prompt:
      "A student substitutes the point directly into the derivative as shown. Which critique identifies the error?",
    latex: "f'(x)=4x,\quad f(2)=10;\qquad 10=4(2)+C",
    answer: "D",
    choices: [
      "The substitution is valid, but the constant should be multiplied by x.",
      "The point should be substituted into f'(x) before any integration and no constant is needed.",
      "The derivative should be differentiated again before the point is used.",
      "The point lies on f, not f'; first find f(x)=2x^2+C, then substitute f(2)=10.",
    ],
    hint:
      "Decide whether the y-coordinate 10 is a function value or a gradient value.",
    explanation:
      "The condition f(2)=10 gives a point on the original curve, not on its gradient function. First integrate f'(x)=4x to obtain f(x)=2x^2+C. Then 10=2(2^2)+C gives C=2. Option D correctly separates derivative information from function information.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses substitution of an initial function value into the derivative rather than into its primitive.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Accepts the incorrect equation and changes only the treatment of the constant.",
      B: "Confuses the supplied function value with a value of the derivative.",
      C: "Moves in the wrong calculus direction by differentiating the known gradient.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-iv-qm3",
    prompt:
      "A curve has the displayed gradient and passes through the stated point. Determine f(2).",
    latex: "f'(x)=3x^2+2,\qquad f(0)=-4",
    answer: "8",
    acceptedAnswers: ["8.0", "f(2)=8", "f(2) = 8"],
    hint:
      "Recover f(x), use the value at zero to determine C, and then evaluate the resulting function at two.",
    explanation:
      "Integrating gives f(x)=x^3+2x+C. The condition f(0)=-4 immediately gives C=-4, so f(x)=x^3+2x-4. Evaluating at x=2 gives f(2)=8+4-4=8. The point determines the vertical member of the primitive family.",
    difficulty: 3,
    diagnosticIntent:
      "Checks whether students can reconstruct a function from its gradient and then use it to predict another value.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-iv-qm4",
    prompt:
      "Which function satisfies both the differential equation and the value at pi?",
    latex: "y'=\\sin x,\\qquad y(\\pi)=2",
    answer: "B",
    choices: [
      "y=cos x+3",
      "y=-cos x+1",
      "y=-cos x+3",
      "y=sin x+2",
    ],
    hint:
      "Start with the primitive of positive sine, then use cos pi equals negative one.",
    explanation:
      "A primitive of sin x is -cos x, so y=-cos x+C. At x=pi, -cos(pi)=1, and the condition 2=1+C gives C=1. Hence y=-cos x+1, which also differentiates to positive sin x. Option B satisfies both requirements.",
    difficulty: 3,
    diagnosticIntent:
      "Tests sign control in trigonometric antidifferentiation together with substitution of an exact initial value.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses cosine with the wrong derivative sign and adjusts the constant to fit the point.",
      C: "Finds the correct primitive form but substitutes cos pi with the wrong sign when solving for C.",
      D: "Treats sine as its own antiderivative and uses the initial value as a constant.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-iv-qm5",
    prompt:
      "A single function satisfies the derivative and both conditions. Determine the parameter k.",
    latex: "f'(x)=2x+k,\qquad f(0)=1,\qquad f(2)=9",
    answer: "k=2",
    acceptedAnswers: ["2", "k = 2", "2.0"],
    hint:
      "Integrate with k treated as a constant; the condition at zero fixes C before the second condition is used.",
    explanation:
      "Integrating gives f(x)=x^2+kx+C. From f(0)=1, C=1. Then f(2)=9 gives 4+2k+1=9, so 2k=4 and k=2. Substituting this value produces f(x)=x^2+2x+1, which meets both conditions.",
    difficulty: 4,
    diagnosticIntent:
      "Assesses coordinated use of two conditions to determine both an integration constant and a model parameter.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-iv-qm6",
    prompt:
      "Investigate whether one function can satisfy all three statements, and state the conclusion.",
    latex: "f'(x)=2x,\qquad f(1)=3,\qquad f(-1)=5",
    answer: "No such function exists",
    acceptedAnswers: [
      "no solution",
      "impossible",
      "the conditions are inconsistent",
    ],
    hint:
      "Write the complete primitive family and compare its values at x=1 and x=-1.",
    explanation:
      "Every primitive of 2x has the form f(x)=x^2+C. Therefore f(1)=1+C and f(-1)=1+C must be equal. The stated values 3 and 5 are different, so no choice of C can satisfy both. The initial conditions are inconsistent with the given derivative.",
    difficulty: 4,
    diagnosticIntent:
      "Probes whether students test compatibility of multiple initial conditions instead of forcing a constant from each.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-iv-qm7",
    prompt:
      "The function has the given derivative and value at zero. Find the positive input t for which f(t)=0.",
    latex: "f'(x)=4x,\qquad f(0)=-8,\qquad t>0",
    answer: "t=2",
    acceptedAnswers: ["2", "t = 2", "2.0"],
    hint:
      "Recover the particular quadratic first, then solve its zero equation and apply the positive-input condition.",
    explanation:
      "Integrating gives f(x)=2x^2+C, and f(0)=-8 gives C=-8. Thus f(t)=0 means 2t^2-8=0, so t^2=4 and t=plus or minus 2. The restriction t>0 selects t=2. The initial condition must be used before solving for the input.",
    difficulty: 4,
    diagnosticIntent:
      "Investigates a reconstructed function and checks selection between algebraic roots using a stated restriction.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-iv-qm8",
    prompt:
      "A student claims the data determine f(x)=x^3+2. Which evaluation is correct?",
    latex: "f''(x)=6x,\qquad f(0)=2",
    answer: "C",
    choices: [
      "The claim is correct because one condition always determines one function.",
      "The claim is wrong only because the cubic coefficient should be 3.",
      "The data leave an undetermined linear term: f(x)=x^3+Ax+2.",
      "The data leave only an undetermined constant: f(x)=x^3+C.",
    ],
    hint:
      "Integrate twice and count how many independent constants appear before applying the one supplied condition.",
    explanation:
      "Integrating f''=6x once gives f'=3x^2+A, and integrating again gives f=x^3+Ax+B. The condition f(0)=2 fixes B=2 but provides no information about A. Thus an entire family f=x^3+Ax+2 remains, so option C is correct.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses underdetermination when a second derivative is supplied with too few independent initial conditions.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Counts conditions without accounting for the two constants introduced by two integrations.",
      B: "Misapplies the reverse power rule to the leading term.",
      D: "Introduces only one constant across two successive integrations.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-iv-qm9",
    prompt:
      "Use both initial conditions to reconstruct the function f.",
    latex: "f''(x)=6x-2,\qquad f'(0)=3,\qquad f(1)=4",
    answer: "f(x)=x^3-x^2+3x+1",
    acceptedAnswers: [
      "x^3-x^2+3x+1",
      "f(x) = x^3 - x^2 + 3x + 1",
      "y=x^3-x^2+3x+1",
    ],
    hint:
      "Integrate once and use f'(0), then integrate again and use f(1); keep the constants separate.",
    explanation:
      "First integrate to get f'(x)=3x^2-2x+A. Since f'(0)=3, A=3. Integrating again gives f(x)=x^3-x^2+3x+B. The condition f(1)=4 gives 1-1+3+B=4, so B=1 and f(x)=x^3-x^2+3x+1.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses two-stage antidifferentiation with separate constants and conditions attached to different derivative levels.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-iv-qm10",
    prompt:
      "A tank's volume V litres changes at the stated rate. Find the first positive time when the volume reaches 82 litres.",
    latex: "V'(t)=12-2t,\qquad V(0)=50,\qquad V(t)=82",
    answer: "4 hours",
    acceptedAnswers: ["4", "t=4", "t = 4 hours", "4 h"],
    hint:
      "Integrate the rate, use the initial volume, then solve the resulting quadratic and choose the earlier positive root.",
    explanation:
      "Integrating gives V(t)=12t-t^2+C, and V(0)=50 sets C=50. Solving 12t-t^2+50=82 gives t^2-12t+32=0, so t=4 or t=8. The question asks for the first positive time, hence the required answer is 4 hours.",
    difficulty: 5,
    diagnosticIntent:
      "Combines reconstruction from a rate, quadratic solving, and contextual selection when the target occurs twice.",
    taskType: "synthesis",
  }),
];

// ─── L4: Definite Integrals ───────────────────────────────────────────────────

const defWorked: WorkedExample[] = [
  {
    title: "Evaluate a definite integral",
    questionLatex: "\\int_1^4 (2x+1)\\,dx",
    steps: [
      { explanation: "Find the primitive.", latex: "F(x)=x^2+x" },
      { explanation: "Evaluate F(4) − F(1).", latex: "F(4)=(16+4)=20,\\quad F(1)=(1+1)=2" },
      { explanation: "Subtract.", latex: "20-2=18" },
    ],
    finalAnswerLatex: "18",
  },
  {
    title: "Evaluate using bracket notation",
    questionLatex: "\\int_0^3 x^2\\,dx",
    steps: [
      { explanation: "Find the primitive and write in brackets.", latex: "\\left[\\frac{x^3}{3}\\right]_0^3" },
      { explanation: "Substitute the upper limit.", latex: "\\frac{27}{3}=9" },
      { explanation: "Subtract the lower limit value.", latex: "9-0=9" },
    ],
    finalAnswerLatex: "9",
  },
];

const defGuided: PracticeQuestion[] = [
  fa("y11adv-intg-def-g1", "Evaluate the definite integral.", "\\int_0^2 3x^2\\,dx", "8", []),
  fa("y11adv-intg-def-g2", "Evaluate the definite integral.", "\\int_1^3 2x\\,dx", "8", []),
  mc("y11adv-intg-def-g3", "In ∫₁⁴ f(x) dx, what do 1 and 4 represent?", "B",
    [{ label: "A", text: "The coefficient and power" }, { label: "B", text: "The lower and upper limits of integration" }, { label: "C", text: "The values of f at the endpoints" }, { label: "D", text: "The area height" }],
    "The numbers at the bottom and top of the integral sign are the limits of integration: 1 is the lower limit and 4 is the upper limit.", "\\int_1^4 f(x)\\,dx"),
  fa("y11adv-intg-def-g4", "Evaluate the definite integral.", "\\int_2^5 (x+1)\\,dx", "16.5", ["33/2", "16½"]),
];

const defIndep: PracticeQuestion[] = [
  fa("y11adv-intg-def-i1", "Evaluate the definite integral.", "\\int_0^3 (x^2+2)\\,dx", "15", []),
  fa("y11adv-intg-def-i2", "Evaluate the definite integral.", "\\int_1^4 (3x^2-2x)\\,dx", "57", []),
  fa("y11adv-intg-def-i3", "Evaluate the definite integral.", "\\int_0^{\\pi/2} \\cos x\\,dx", "1", []),
  mc("y11adv-intg-def-i4", "∫₂⁵ f(x) dx is negative. What does this mean?", "C",
    [{ label: "A", text: "An error has occurred; definite integrals are always positive" }, { label: "B", text: "The function has no antiderivative" }, { label: "C", text: "The curve lies below the x-axis between x = 2 and x = 5" }, { label: "D", text: "The limits must be reversed" }],
    "A negative definite integral means the signed area between the curve and x-axis is below the axis on that interval. This is not an error.", ""),
  fa("y11adv-intg-def-i5", "Evaluate the definite integral.", "\\int_0^1 e^x\\,dx", "e-1", ["e − 1"]),
];

const defMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-def-qm1",
    prompt:
      "Evaluate the definite integral exactly, showing the upper-minus-lower substitution in your working.",
    latex: "\\int_{-1}^{2}\\left(3x^2-2x\\right)\\,dx",
    answer: "6",
    acceptedAnswers: ["6.0", "6 units", "[x^3-x^2]_-1^2=6"],
    hint:
      "Use the primitive x cubed minus x squared, then subtract its value at negative one from its value at two.",
    explanation:
      "A primitive of 3x^2-2x is F(x)=x^3-x^2. At the upper limit F(2)=8-4=4, while at the lower limit F(-1)=-1-1=-2. Therefore the integral is F(2)-F(-1)=4-(-2)=6.",
    difficulty: 3,
    diagnosticIntent:
      "Checks routine definite integration while exposing sign errors caused by substituting a negative lower limit.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-def-qm2",
    prompt:
      "A student evaluates the integral using the line below. Which statement pinpoints the error?",
    latex: "\\int_1^4 2x\\,dx=F(1)-F(4),\\qquad F(x)=x^2",
    answer: "B",
    choices: [
      "The primitive should be 2x^2, but the order of substitution is correct.",
      "The primitive is correct, but the value must be F(4)-F(1), not lower minus upper.",
      "Both endpoint values should be added because the interval has positive length.",
      "The constant of integration must be found before a definite integral can be evaluated.",
    ],
    hint:
      "Recall the order in the Fundamental Theorem: primitive at the upper endpoint minus primitive at the lower endpoint.",
    explanation:
      "The primitive F(x)=x^2 is correct because F'(x)=2x. For limits from 1 to 4, the Fundamental Theorem requires F(4)-F(1)=16-1=15. The student's reversed subtraction would give -15, so option B isolates the error without changing the primitive.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses reversal of upper and lower endpoint values while preserving a correctly found primitive.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Carries the integrand coefficient into the primitive without dividing by the new power.",
      C: "Treats endpoint evaluation as addition rather than an oriented difference.",
      D: "Assumes the arbitrary constant is needed even though it cancels in definite integration.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-def-qm3",
    prompt:
      "Given the positive restriction on k, determine the upper limit that makes the integral equal to 16.",
    latex: "\\int_0^k 2x\\,dx=16,\qquad k>0",
    answer: "k=4",
    acceptedAnswers: ["4", "k = 4", "4.0"],
    hint:
      "Evaluate the integral in terms of k, solve the resulting square equation, and then use k>0.",
    explanation:
      "Using the primitive x^2 gives [x^2]_0^k=k^2. Hence k^2=16, so algebraically k=plus or minus 4. The stated restriction k>0 selects k=4. The limit is an unknown in the endpoint evaluation, not an integration constant.",
    difficulty: 3,
    diagnosticIntent:
      "Checks whether students can reverse a definite integral to find a limit and apply a sign restriction.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-def-qm4",
    prompt:
      "Without performing a full endpoint calculation, which conclusion about the integral is correct?",
    latex: "\\int_{-2}^{2}\\left(3x^3-x\\right)\\,dx",
    answer: "D",
    choices: [
      "It is positive because the upper limit is positive.",
      "It is negative because the integrand is negative for some x.",
      "It equals twice the integral from 0 to 2 because every polynomial is even.",
      "It equals zero because the integrand is odd and the interval is symmetric.",
    ],
    hint:
      "Compare f(-x) with f(x) for f(x)=3x cubed minus x.",
    explanation:
      "For f(x)=3x^3-x, replacing x by -x gives f(-x)=-3x^3+x=-f(x), so f is odd. On the symmetric interval [-2,2], the signed contribution to the left of zero cancels the contribution to the right. Therefore the integral is zero.",
    difficulty: 3,
    diagnosticIntent:
      "Tests recognition of odd symmetry as a reason for cancellation in a definite integral.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Infers the sign of an integral from the upper limit rather than the integrand's accumulated values.",
      B: "Assumes any negative part forces the entire signed accumulation to be negative.",
      C: "Applies the even-function doubling rule without checking parity.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-def-qm5",
    prompt:
      "The definite integral equals 8. Determine the parameter a.",
    latex: "\\int_0^2(ax+1)\\,dx=8",
    answer: "a=3",
    acceptedAnswers: ["3", "a = 3", "3.0"],
    hint:
      "Integrate with a treated as a constant, evaluate at two and zero, and solve the resulting linear equation.",
    explanation:
      "A primitive is ax^2/2+x. Evaluating from 0 to 2 gives 2a+2. Setting this equal to 8 yields 2a=6, so a=3. Substitution checks the result: the integrand becomes 3x+1 and its integral is 6+2=8.",
    difficulty: 4,
    diagnosticIntent:
      "Assesses parameter recovery from a definite integral rather than direct evaluation with fixed coefficients.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-def-qm6",
    prompt:
      "Use interval additivity to determine the signed accumulation over the combined interval.",
    latex:
      "\\int_0^2 f(x)\\,dx=5,\qquad \\int_2^5 f(x)\\,dx=-1",
    answer: "4",
    acceptedAnswers: ["4.0", "integral from 0 to 5 = 4", "∫_0^5 f(x)dx=4"],
    hint:
      "Adjacent definite integrals add when the end of the first interval is the start of the second.",
    explanation:
      "Definite integrals are additive across adjacent intervals: the accumulation from 0 to 5 equals the accumulation from 0 to 2 plus that from 2 to 5. Therefore ∫_0^5 f(x)dx=5+(-1)=4. The negative second contribution reduces the total.",
    difficulty: 4,
    diagnosticIntent:
      "Checks structural use of interval additivity and interpretation of a negative contribution to total accumulation.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-def-qm7",
    prompt:
      "Use symmetry to evaluate the integral efficiently, explaining which term cancels.",
    latex: "\\int_{-3}^{3}\\left(2x^5+4x^2\\right)\\,dx",
    answer: "72",
    acceptedAnswers: ["72.0", "72 units", "4∫_-3^3 x^2 dx=72"],
    hint:
      "Separate the odd fifth-power term from the even squared term before integrating.",
    explanation:
      "The term 2x^5 is odd, so its integral over [-3,3] is zero. The term 4x^2 is even, so its contribution is 8∫_0^3 x^2dx=8[x^3/3]_0^3=8(9)=72. Hence the complete definite integral equals 72.",
    difficulty: 4,
    diagnosticIntent:
      "Probes decomposition of a mixed-parity integrand and strategic use of symmetry before calculation.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-def-qm8",
    prompt:
      "A student obtains a negative result and concludes that the calculation must be wrong. Which response is valid?",
    latex: "\\int_1^4 f(x)\\,dx=-7",
    answer: "A",
    choices: [
      "A negative value is possible: below-axis signed contributions exceed above-axis contributions on the interval.",
      "A definite integral is geometric area, so it must always be non-negative.",
      "The negative sign proves that the limits were written in the wrong order.",
      "The value means f(x) is negative at every point from 1 to 4.",
    ],
    hint:
      "Distinguish signed accumulation from total geometric area and avoid inferring pointwise behaviour from one net value.",
    explanation:
      "A definite integral records signed accumulation: regions below the x-axis contribute negatively and regions above contribute positively. A total of -7 means the negative contribution dominates, not that an error occurred or that f must be negative everywhere. Thus option A is the justified interpretation.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses confusion between signed definite integrals, non-negative geometric area, and pointwise function signs.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Equates a signed integral with total geometric area.",
      C: "Assumes a negative result can only arise from reversed limits.",
      D: "Infers the sign at every point from a negative net accumulation.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-def-qm9",
    prompt:
      "Evaluate the absolute-value integral exactly by identifying where the integrand changes form.",
    latex: "\\int_{-2}^{3}|x-1|\\,dx",
    answer: "13/2",
    acceptedAnswers: ["6.5", "6.50", "13/2 units"],
    hint:
      "Split the interval at x=1: use 1-x to the left and x-1 to the right.",
    explanation:
      "The expression changes sign at x=1. Thus the integral is ∫_-2^1(1-x)dx+∫_1^3(x-1)dx. The first part is 9/2 and the second is 2, so the total is 9/2+4/2=13/2. Splitting prevents negative signed cancellation inside the absolute value.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses synthesis of piecewise reasoning, exact endpoint evaluation, and the meaning of an absolute-value integrand.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-def-qm10",
    prompt:
      "Find the value of a in the stated interval that divides the signed accumulation into two equal parts.",
    latex:
      "\\int_0^a(6x-2)\\,dx=\\int_a^4(6x-2)\\,dx,\qquad 0<a<4",
    answer: "a=(1+sqrt(61))/3",
    acceptedAnswers: [
      "(1+√61)/3",
      "a=(1+\\sqrt{61})/3",
      "a ≈ 2.94",
    ],
    hint:
      "The total integral from zero to four is 40, so the left-hand integral must equal 20.",
    explanation:
      "The total accumulation is [3x^2-2x]_0^4=40, so equality requires ∫_0^a(6x-2)dx=20. Hence 3a^2-2a-20=0, giving a=(1±sqrt(61))/3. Only the positive root lies between 0 and 4, so a=(1+sqrt(61))/3.",
    difficulty: 5,
    diagnosticIntent:
      "Combines interval additivity, parameterised endpoint evaluation, quadratic solving, and domain-based root selection.",
    taskType: "synthesis",
  }),
];

// ─── L5: Fundamental Theorem of Calculus ──────────────────────────────────────

const ftcWorked: WorkedExample[] = [
  {
    title: "Use the FTC to evaluate a definite integral",
    questionLatex: "\\int_1^4 \\sqrt{x}\\,dx",
    steps: [
      { explanation: "Write √x as x^(1/2) and find the primitive.", latex: "\\int x^{1/2}\\,dx=\\frac{x^{3/2}}{3/2}=\\frac{2}{3}x^{3/2}" },
      { explanation: "Evaluate at the upper limit.", latex: "\\frac{2}{3}(4)^{3/2}=\\frac{2}{3}\\cdot8=\\frac{16}{3}" },
      { explanation: "Evaluate at the lower limit.", latex: "\\frac{2}{3}(1)^{3/2}=\\frac{2}{3}" },
      { explanation: "Subtract.", latex: "\\frac{16}{3}-\\frac{2}{3}=\\frac{14}{3}" },
    ],
    finalAnswerLatex: "\\dfrac{14}{3}",
  },
  {
    title: "Verify the FTC connection",
    questionLatex: "\\text{If }F(x)=\\int_0^x t^2\\,dt,\\text{ find }F'(x).",
    steps: [
      { explanation: "The FTC states that F'(x) = f(x) where f is the integrand.", latex: "F'(x)=x^2" },
    ],
    finalAnswerLatex: "F'(x)=x^2",
  },
];

const ftcGuided: PracticeQuestion[] = [
  fa("y11adv-intg-ftc-g1", "Evaluate using the FTC.", "\\int_0^4 \\sqrt{x}\\,dx", "16/3", ["5.333", "5⅓"]),
  mc("y11adv-intg-ftc-g2", "The FTC says d/dx ∫₀ˣ f(t) dt = ?", "C",
    [{ label: "A", text: "$\\int_0^x f'(t)\\,dt$" }, { label: "B", text: "$f(0)$" }, { label: "C", text: "$f(x)$" }, { label: "D", text: "$F(x)-F(0)$" }],
    "The FTC: differentiating an accumulation function returns the original integrand evaluated at the upper variable limit x.", "\\frac{d}{dx}\\int_0^x f(t)\\,dt"),
  fa("y11adv-intg-ftc-g3", "Use the FTC to evaluate.", "\\int_0^2 e^x\\,dx", "e^2-1", ["e² − 1"]),
  mc("y11adv-intg-ftc-g4", "What is the key insight of the FTC?", "A",
    [{ label: "A", text: "Differentiation and integration are inverse operations" }, { label: "B", text: "Every definite integral equals zero" }, { label: "C", text: "The constant C disappears in definite integrals" }, { label: "D", text: "Area is always positive" }],
    "The FTC connects the two main operations of calculus: integration undoes differentiation and vice versa.", ""),
];

const ftcIndep: PracticeQuestion[] = [
  fa("y11adv-intg-ftc-i1", "Evaluate using the FTC.", "\\int_1^9 \\sqrt{x}\\,dx", "52/3", ["17.333"]),
  fa("y11adv-intg-ftc-i2", "Evaluate using the FTC.", "\\int_0^{\\pi/2} \\sin x\\,dx", "1", []),
  fa("y11adv-intg-ftc-i3", "Evaluate using the FTC.", "\\int_1^e \\frac{1}{x}\\,dx", "1", []),
  mc("y11adv-intg-ftc-i4", "If F(x) = ∫₀ˣ (t² + 1) dt, what is F'(x)?", "B",
    [{ label: "A", text: "$2t$" }, { label: "B", text: "$x^2+1$" }, { label: "C", text: "$\\frac{x^3}{3}+x$" }, { label: "D", text: "$0$" }],
    "By the FTC, F'(x) = f(x) where f is the integrand, so F'(x) = x² + 1.", "F(x)=\\int_0^x(t^2+1)\\,dt"),
  fa("y11adv-intg-ftc-i5", "Evaluate using the FTC.", "\\int_{-2}^{2} (x^3+x)\\,dx", "0", []),
];

const ftcMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-ftc-qm1",
    prompt:
      "Use a primitive and the Fundamental Theorem to evaluate the definite integral exactly.",
    latex: "\\int_1^4\\left(\\sqrt{x}+\\frac{1}{x}\\right)\\,dx",
    answer: "14/3+ln(4)",
    acceptedAnswers: [
      "14/3+\\ln 4",
      "14/3+2ln2",
      "14/3+2\\ln(2)",
    ],
    hint:
      "Rewrite the square root as x to the one half, then use upper minus lower for both primitive terms.",
    explanation:
      "A primitive is (2/3)x^(3/2)+ln|x|. At x=4 this is 16/3+ln4, and at x=1 it is 2/3+0. Subtracting lower from upper gives 14/3+ln4. No arbitrary constant is needed because it would cancel.",
    difficulty: 3,
    diagnosticIntent:
      "Checks exact endpoint evaluation using both a power primitive and the logarithmic reciprocal primitive.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-ftc-qm2",
    prompt:
      "A student uses the endpoint values of the integrand as shown. Which correction accurately applies the theorem?",
    latex: "\\int_a^b f(x)\\,dx=f(b)-f(a)",
    answer: "C",
    choices: [
      "Replace subtraction with addition: f(b)+f(a).",
      "Differentiate f first and use f'(b)-f'(a).",
      "Use F(b)-F(a), where F is any primitive satisfying F'=f.",
      "The statement is correct for every continuous function f.",
    ],
    hint:
      "The theorem evaluates an antiderivative at the endpoints, not the original integrand.",
    explanation:
      "The Fundamental Theorem states that ∫_a^b f(x)dx=F(b)-F(a), where F'=f. The student's expression uses values of f itself and generally gives a different quantity. Option C corrects both the function being evaluated and retains the upper-minus-lower order.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses confusion between endpoint values of an integrand and endpoint values of its primitive.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Keeps the wrong function and changes only the endpoint operation.",
      B: "Moves to the derivative of the integrand rather than to its primitive.",
      D: "Assumes the theorem evaluates the original function directly.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-ftc-qm3",
    prompt:
      "The function G records accumulation from 2 to x. Determine the instantaneous rate G'(3).",
    latex: "G(x)=\\int_2^x(t^2+1)\\,dt",
    answer: "10",
    acceptedAnswers: ["10.0", "G'(3)=10", "G'(3) = 10"],
    hint:
      "Use the differentiation form of the Fundamental Theorem before substituting x=3.",
    explanation:
      "By the Fundamental Theorem, differentiating an accumulation function with upper limit x recovers the integrand at x: G'(x)=x^2+1. Therefore G'(3)=3^2+1=10. There is no need to first evaluate the full integral.",
    difficulty: 3,
    diagnosticIntent:
      "Checks interpretation of the Fundamental Theorem as a rate-of-accumulation result rather than only an evaluation rule.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-ftc-qm4",
    prompt:
      "Which derivative correctly accounts for the variable upper limit?",
    latex: "H(x)=\\int_0^{x^2}\\cos t\\,dt",
    answer: "D",
    choices: [
      "H'(x)=cos x",
      "H'(x)=cos(x^2)",
      "H'(x)=-sin(x^2)",
      "H'(x)=2xcos(x^2)",
    ],
    hint:
      "Evaluate the integrand at x squared, then multiply by the derivative of the upper limit.",
    explanation:
      "For an upper limit g(x), d/dx ∫_0^(g(x)) f(t)dt=f(g(x))g'(x). Here f(t)=cos t and g(x)=x^2, so H'(x)=cos(x^2)(2x)=2xcos(x^2). Option D includes both substitution and the chain-rule factor.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses omission of the chain-rule factor when differentiating an integral with a composite upper limit.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Ignores both the composite upper limit and its derivative.",
      B: "Substitutes the upper limit correctly but omits its derivative factor.",
      C: "Differentiates the integrand itself instead of the accumulation function.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-ftc-qm5",
    prompt:
      "Determine the lower limit a from the accumulation value and the stated interval restriction.",
    latex:
      "\\int_a^2(3t^2-1)\\,dt=6,\qquad 0<a<2",
    answer: "a=1",
    acceptedAnswers: ["1", "a = 1", "1.0"],
    hint:
      "Use the primitive t cubed minus t and solve the resulting cubic expression with the interval restriction.",
    explanation:
      "A primitive is t^3-t, so the integral equals (8-2)-(a^3-a)=6-a^3+a. Setting this equal to 6 gives a^3-a=0, or a(a-1)(a+1)=0. Of the roots -1, 0 and 1, only a=1 satisfies 0<a<2.",
    difficulty: 4,
    diagnosticIntent:
      "Assesses recovery of an unknown integration limit and selection among multiple roots using a domain restriction.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-ftc-qm6",
    prompt:
      "Differentiate the moving-window accumulation and then determine its rate of change at x=2.",
    latex: "A(x)=\\int_x^{x+1}t^2\\,dt",
    answer: "A'(2)=5",
    acceptedAnswers: ["5", "5.0", "A'(2) = 5"],
    hint:
      "The upper-limit contribution is positive and the lower-limit contribution is subtracted.",
    explanation:
      "For variable bounds, A'(x)=(x+1)^2(1)-x^2(1)=2x+1. The lower limit contributes with a minus sign. Substituting x=2 gives A'(2)=2(2)+1=5. This is the rate at which the one-unit accumulation window changes.",
    difficulty: 4,
    diagnosticIntent:
      "Investigates how simultaneous movement of both bounds affects the derivative of an accumulation function.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-ftc-qm7",
    prompt:
      "Classify the interior stationary point of the accumulation function on 0≤x≤3.",
    latex: "A(x)=\\int_0^x t(t-2)\\,dt",
    answer: "local minimum at x=2",
    acceptedAnswers: [
      "minimum at x=2",
      "x=2 is a local minimum",
      "A has a minimum at 2",
    ],
    hint:
      "Use A'(x)=x(x-2) and inspect its sign immediately before and after the interior zero.",
    explanation:
      "The Fundamental Theorem gives A'(x)=x(x-2). Inside the interval, the stationary point is x=2. For 0<x<2 the derivative is negative, while for 2<x≤3 it is positive. Therefore A decreases then increases, so x=2 is a local minimum.",
    difficulty: 4,
    diagnosticIntent:
      "Connects the sign of an integrand with increasing and decreasing behaviour of its accumulation function.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-ftc-qm8",
    prompt:
      "A student differentiates the moving-bound integral but omits all bound derivatives. Which result is correct?",
    latex: "J(x)=\\int_x^{3x}f(t)\\,dt",
    answer: "B",
    choices: [
      "J'(x)=f(3x)-f(x)",
      "J'(x)=3f(3x)-f(x)",
      "J'(x)=3f(3x)+f(x)",
      "J'(x)=f'(3x)-f'(x)",
    ],
    hint:
      "Apply the upper contribution times the derivative of 3x, then subtract the lower contribution times the derivative of x.",
    explanation:
      "With upper bound u=3x and lower bound l=x, Leibniz's rule gives J'=f(u)u'-f(l)l'. Hence J'(x)=3f(3x)-f(x). Option A substitutes both bounds but misses the factor 3 from differentiating the upper bound.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses missing chain-rule multipliers and sign structure when both limits depend on x.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Evaluates at both bounds but omits the derivative of the upper limit.",
      C: "Uses the upper multiplier but adds rather than subtracting the lower-limit contribution.",
      D: "Differentiates the integrand function instead of applying the Fundamental Theorem at the bounds.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-ftc-qm9",
    prompt:
      "Differentiate the accumulation with two composite bounds and evaluate the result at x=1.",
    latex: "H(x)=\\int_{x^2}^{x^3}(1+t^2)\\,dt",
    answer: "2",
    acceptedAnswers: ["2.0", "H'(1)=2", "H'(1) = 2"],
    hint:
      "Use upper integrand times 3x squared minus lower integrand times 2x before substituting one.",
    explanation:
      "Leibniz's rule gives H'(x)=(1+x^6)(3x^2)-(1+x^4)(2x). At x=1, both integrand factors equal 2, so H'(1)=2(3)-2(2)=6-4=2. Both composite-bound derivatives and the lower-bound subtraction are required.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses synthesis of the Fundamental Theorem, two chain-rule factors, substitution, and lower-bound orientation.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-ftc-qm10",
    prompt:
      "The derivative condition determines a. Use it and the integral definition to find H(1).",
    latex:
      "H(x)=\\int_x^{2x}(t^2+a)\\,dt,\qquad H'(1)=10",
    answer: "16/3",
    acceptedAnswers: ["5⅓", "5.333", "H(1)=16/3"],
    hint:
      "First use H'(x)=2((2x)^2+a)-(x^2+a) to determine a, then evaluate the definite integral.",
    explanation:
      "Differentiating gives H'(x)=2(4x^2+a)-(x^2+a)=7x^2+a. Since H'(1)=10, a=3. Then H(1)=∫_1^2(t^2+3)dt=[t^3/3+3t]_1^2=7/3+3=16/3.",
    difficulty: 5,
    diagnosticIntent:
      "Combines variable-bound differentiation, parameter recovery, and subsequent exact evaluation of the original accumulation.",
    taskType: "synthesis",
  }),
];

// ─── L6: Areas Under and Between Curves ───────────────────────────────────────

const areaWorked: WorkedExample[] = [
  {
    title: "Find the area under a curve",
    questionLatex: "\\text{Area between }y=x^2\\text{ and the }x\\text{-axis for }0\\le x\\le 3",
    steps: [
      { explanation: "Set up the definite integral (curve is above x-axis on [0,3]).", latex: "A=\\int_0^3 x^2\\,dx" },
      { explanation: "Evaluate.", latex: "\\left[\\frac{x^3}{3}\\right]_0^3=9-0=9" },
    ],
    finalAnswerLatex: "9\\text{ square units}",
  },
  {
    title: "Area when the curve is below the x-axis",
    questionLatex: "\\text{Area between }y=x^2-4\\text{ and the }x\\text{-axis for }0\\le x\\le 2",
    steps: [
      { explanation: "Check: on [0,2], y = x²−4 ≤ 0 (below the axis), so the integral gives a negative value.", latex: "\\int_0^2(x^2-4)\\,dx=\\left[\\frac{x^3}{3}-4x\\right]_0^2=\\frac{8}{3}-8=-\\frac{16}{3}" },
      { explanation: "Area = absolute value of the integral.", latex: "A=\\left|-\\frac{16}{3}\\right|=\\frac{16}{3}" },
    ],
    finalAnswerLatex: "\\dfrac{16}{3}\\text{ square units}",
  },
  {
    title: "Area between two curves",
    questionLatex: "\\text{Area between }y=x^2\\text{ and }y=x\\text{ for }0\\le x\\le 1",
    steps: [
      { explanation: "On [0,1]: x ≥ x², so the upper curve is y = x.", latex: "A=\\int_0^1(x-x^2)\\,dx" },
      { explanation: "Evaluate.", latex: "\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1=\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}" },
    ],
    finalAnswerLatex: "\\dfrac{1}{6}\\text{ square units}",
  },
];

const areaGuided: PracticeQuestion[] = [
  fa("y11adv-intg-area-g1", "Find the area under the curve above the x-axis.", "y=3x^2,\\;0\\le x\\le 2", "8", ["8 sq units"]),
  mc("y11adv-intg-area-g2", "If ∫ₐᵇ f(x) dx = −5, what is the area?", "B",
    [{ label: "A", text: "$-5$ square units" }, { label: "B", text: "$5$ square units" }, { label: "C", text: "$10$ square units" }, { label: "D", text: "Cannot be determined" }],
    "Area is always positive. When the integral is negative, the curve is below the x-axis on that interval. The area is the absolute value: |−5| = 5.", ""),
  fa("y11adv-intg-area-g3", "Find the area between the curves.", "y=x^2\\text{ and }y=x,\\;0\\le x\\le 1", "1/6", ["0.167", "⅙"]),
  mc("y11adv-intg-area-g4", "Which setup gives the area between y = x² and y = x for 0 ≤ x ≤ 1?", "C",
    [{ label: "A", text: "$\\int_0^1 x^2\\,dx$" }, { label: "B", text: "$\\int_0^1 x\\,dx$" }, { label: "C", text: "$\\int_0^1 (x-x^2)\\,dx$" }, { label: "D", text: "$\\int_0^1 (x^2-x)\\,dx$" }],
    "Area between curves = ∫(upper − lower) dx. On [0,1] the line y = x lies above y = x².", ""),
];

const areaIndep: PracticeQuestion[] = [
  fa("y11adv-intg-area-i1", "Find the area under the curve above the x-axis.", "y=x^3,\\;0\\le x\\le 2", "4", ["4 sq units"]),
  fa("y11adv-intg-area-i2", "Find the area enclosed between the curve and the x-axis.", "y=x(x-3),\\;0\\le x\\le 3", "9/2", ["4.5", "4½"]),
  fa("y11adv-intg-area-i3", "Find the area between the two curves.", "y=x^2\\text{ and }y=4,\\;-2\\le x\\le 2", "32/3", ["10.667"]),
  mc("y11adv-intg-area-i4", "The graph crosses the x-axis at x = 2. What must you do to find the total area for 0 ≤ x ≤ 4?", "B",
    [{ label: "A", text: "Evaluate one integral from 0 to 4" }, { label: "B", text: "Split at x = 2 and add the absolute values of each part" }, { label: "C", text: "Subtract the integral from 0 to 4 from zero" }, { label: "D", text: "The area equals zero by symmetry" }],
    "When a curve crosses the x-axis, negative and positive parts cancel in a single integral. Split at the crossing point and add the absolute values to get the true area.", ""),
  fa("y11adv-intg-area-i5", "Find the area between y = 4 − x² and the x-axis.", "y=4-x^2,\\;-2\\le x\\le 2", "32/3", ["10.667"]),
];

const areaMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-area-qm1",
    prompt:
      "Find the exact area between the curve and the x-axis over the stated interval.",
    latex: "y=4x-x^2,\qquad 0\\le x\\le4",
    answer: "32/3 square units",
    acceptedAnswers: ["32/3", "10⅔", "10.667 square units"],
    hint:
      "The quadratic is non-negative between its zeros 0 and 4, so integrate it directly over that interval.",
    explanation:
      "Since 4x-x^2=x(4-x) is non-negative on [0,4], its definite integral equals the geometric area. Evaluating [2x^2-x^3/3]_0^4 gives 32-64/3=32/3. Therefore the area is 32/3 square units.",
    difficulty: 3,
    diagnosticIntent:
      "Checks direct area calculation after confirming that the integrand remains above the axis on the interval.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-area-qm2",
    prompt:
      "A student reports the signed integral as the geometric area. Which correction is valid?",
    latex:
      "y=x^2-4,\quad -2\\le x\\le2;\qquad \\int_{-2}^{2}(x^2-4)\\,dx=-\\frac{32}{3}",
    answer: "C",
    choices: [
      "The area is -32/3 square units because the curve is below the axis.",
      "The area is zero because the interval is symmetric.",
      "The area is 32/3 square units because geometric area is the magnitude of the below-axis integral.",
      "The area is 64/3 square units because every symmetric integral must be doubled after evaluation.",
    ],
    hint:
      "The curve is at or below the axis throughout the interval, while geometric area cannot be negative.",
    explanation:
      "On [-2,2], x^2-4≤0, so the definite integral is a negative signed accumulation. The geometric area is its magnitude: |-32/3|=32/3 square units. Symmetry is already included in the evaluated integral, so no further doubling is required.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses reporting a negative signed integral as geometric area and unnecessary extra use of symmetry.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Treats signed accumulation as geometric area despite its negative value.",
      B: "Assumes symmetry causes cancellation even though the integrand is even rather than odd.",
      D: "Double-counts symmetry after the integral over the full symmetric interval has already been evaluated.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-area-qm3",
    prompt:
      "Find the exact area between the two curves on the interval, first identifying which function is upper.",
    latex: "y=2x,\qquad y=x^2,\qquad 0\\le x\\le2",
    answer: "4/3 square units",
    acceptedAnswers: ["4/3", "1⅓", "1.333 square units"],
    hint:
      "On this interval 2x is at least x squared, so integrate line minus parabola.",
    explanation:
      "For 0≤x≤2, 2x-x^2=x(2-x) is non-negative, so the line is the upper curve. The area is ∫_0^2(2x-x^2)dx=[x^2-x^3/3]_0^2=4-8/3=4/3 square units.",
    difficulty: 3,
    diagnosticIntent:
      "Checks correct upper-minus-lower setup and exact evaluation for a line-parabola region.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-area-qm4",
    prompt:
      "Which integral correctly represents the area between the functions on the stated interval?",
    latex: "y=x+2,\qquad y=x^2,\qquad 0\\le x\\le2",
    answer: "A",
    choices: [
      "∫_0^2[(x+2)-x^2] dx",
      "∫_0^2[x^2-(x+2)] dx",
      "∫_0^2[x^2+x+2] dx",
      "∫_0^2|(x+2)+x^2| dx",
    ],
    hint:
      "Compare the values of the two functions within the interval and use upper minus lower.",
    explanation:
      "The difference (x+2)-x^2 is non-negative from x=0 to their meeting point x=2, so y=x+2 is the upper function throughout the interval. Area is therefore ∫_0^2[(x+2)-x^2]dx, which is option A.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses reversal of upper and lower curves and confusion between adding functions and finding their separation.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Subtracts upper from lower, producing a negative signed result.",
      C: "Adds the function heights rather than measuring their vertical separation.",
      D: "Uses an absolute value around a sum instead of the difference between curves.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-area-qm5",
    prompt:
      "The region under the line has the stated area. Determine the positive parameter k.",
    latex: "y=kx,\qquad 0\\le x\\le3,\qquad A=18",
    answer: "k=4",
    acceptedAnswers: ["4", "k = 4", "4.0"],
    hint:
      "Write the area as the definite integral of kx from zero to three and solve for k.",
    explanation:
      "Because k>0 is implied by the region under the line, the area is ∫_0^3 kx dx=k[x^2/2]_0^3=9k/2. Setting 9k/2=18 gives 9k=36 and hence k=4. The resulting triangle also has area one half times 3 times 12, confirming 18.",
    difficulty: 4,
    diagnosticIntent:
      "Assesses recovery of a model parameter from a geometric area condition using integration and verification.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-area-qm6",
    prompt:
      "Find the total geometric area between the curve and the x-axis, splitting wherever the sign changes.",
    latex: "y=x^2-1,\qquad -2\\le x\\le2",
    answer: "4 square units",
    acceptedAnswers: ["4", "4.0", "A=4"],
    hint:
      "Use symmetry and split at x=1 on the right half; the curve is below first and above second.",
    explanation:
      "The function is even and crosses the axis at x=±1. On [0,1] the area is ∫_0^1(1-x^2)dx=2/3; on [1,2] it is ∫_1^2(x^2-1)dx=4/3. Doubling the right-half total gives 2(2/3+4/3)=4 square units.",
    difficulty: 4,
    diagnosticIntent:
      "Investigates sign changes, symmetry, and piecewise absolute area for a curve crossing the axis twice.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-area-qm7",
    prompt:
      "Find the exact enclosed area by first deriving the intersection points and the upper function.",
    latex: "y=x^2,\qquad y=2-x^2",
    answer: "8/3 square units",
    acceptedAnswers: ["8/3", "2⅔", "2.667 square units"],
    hint:
      "Set the functions equal to obtain x=plus or minus one, then integrate upper minus lower.",
    explanation:
      "The intersections satisfy x^2=2-x^2, so x=±1. Between them, 2-x^2 is above x^2. The area is ∫_-1^1(2-2x^2)dx. Using even symmetry gives 2[2x-(2/3)x^3]_0^1=2(4/3)=8/3 square units.",
    difficulty: 4,
    diagnosticIntent:
      "Probes synthesis of intersection solving, upper-curve identification, symmetry, and exact area evaluation.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-area-qm8",
    prompt:
      "A student uses one signed integral for a curve that crosses the axis. Which method gives total geometric area?",
    latex: "y=x^2-1,\qquad -2\\le x\\le2",
    answer: "D",
    choices: [
      "Use ∫_-2^2(x^2-1)dx without any splitting.",
      "Use the absolute value of the function only at x=0.",
      "Set the area to zero because the curve has two x-intercepts.",
      "Split at x=-1 and x=1, then add the magnitudes of the three signed integrals.",
    ],
    hint:
      "Geometric area requires every region to contribute positively, so locate all zeros inside the interval.",
    explanation:
      "The curve changes sign at x=-1 and x=1. A single signed integral allows below-axis and above-axis contributions to offset one another. Total geometric area must instead split at both zeros and add the absolute value of each piece, exactly as option D states.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses failure to partition a total-area calculation at every axis crossing.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses net signed accumulation despite the requested total geometric area.",
      B: "Applies absolute value to one function value rather than to the regional integrals.",
      C: "Treats the existence of two intercepts as evidence of complete area cancellation.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-area-qm9",
    prompt:
      "Find the total enclosed area between the curve and the x-axis, using symmetry and sign information.",
    latex: "y=x^3-x,\qquad -1\\le x\\le1",
    answer: "1/2 square unit",
    acceptedAnswers: ["1/2", "0.5", "0.50 square units"],
    hint:
      "The function is odd, but total area does not cancel; double the magnitude of the region from zero to one.",
    explanation:
      "The curve is odd and changes sign at -1, 0 and 1. On [0,1], x^3-x≤0, so that region has area ∫_0^1(x-x^3)dx=[x^2/2-x^4/4]_0^1=1/4. Symmetry gives two equal regions, so total area is 2(1/4)=1/2 square unit.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses distinction between zero signed accumulation for an odd function and positive total geometric area.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-area-qm10",
    prompt:
      "The two curves enclose 36 square units. Determine the positive parameter k.",
    latex: "y=kx,\qquad y=x^2,\qquad k>0",
    answer: "k=6",
    acceptedAnswers: ["6", "k = 6", "6.0"],
    hint:
      "The curves meet at x=0 and x=k; integrate kx-x squared between those intersections.",
    explanation:
      "Solving kx=x^2 gives intersections x=0 and x=k. For k>0, the line is above the parabola between them. The enclosed area is ∫_0^k(kx-x^2)dx=k^3/2-k^3/3=k^3/6. Setting this to 36 gives k^3=216, so k=6.",
    difficulty: 5,
    diagnosticIntent:
      "Combines parameter-dependent intersections, upper-minus-lower integration, and inversion of an area formula.",
    taskType: "synthesis",
  }),
];

// ─── L7: Reverse Chain Rule ───────────────────────────────────────────────────

const rcrWorked: WorkedExample[] = [
  {
    title: "Integrate a linear function raised to a power",
    questionLatex: "\\int (2x+3)^4\\,dx",
    steps: [
      { explanation: "Identify the inner function u = 2x + 3 with du/dx = 2.", latex: "u=2x+3" },
      { explanation: "Apply the reverse chain rule: raise the power by 1, divide by the new power AND the inner derivative.", latex: "\\int(2x+3)^4\\,dx=\\frac{(2x+3)^5}{5\\times2}=\\frac{(2x+3)^5}{10}" },
      { explanation: "Add the constant.", latex: "\\frac{(2x+3)^5}{10}+C" },
      { explanation: "Check by differentiating: chain rule gives 5(2x+3)⁴×2/10 = (2x+3)⁴. ✓", latex: "" },
    ],
    finalAnswerLatex: "\\dfrac{(2x+3)^5}{10}+C",
  },
  {
    title: "Integrate a shifted exponential",
    questionLatex: "\\int e^{3x+1}\\,dx",
    steps: [
      { explanation: "The inner linear function has coefficient 3.", latex: "u=3x+1,\\quad \\frac{du}{dx}=3" },
      { explanation: "∫e^(3x+1) dx = e^(3x+1) divided by the inner coefficient.", latex: "\\frac{e^{3x+1}}{3}+C" },
    ],
    finalAnswerLatex: "\\dfrac{e^{3x+1}}{3}+C",
  },
  {
    title: "Integrate cos(ax + b)",
    questionLatex: "\\int \\cos(2x-1)\\,dx",
    steps: [
      { explanation: "The inner coefficient is 2.", latex: "u=2x-1,\\quad \\frac{du}{dx}=2" },
      { explanation: "∫cos(2x−1) dx = sin(2x−1) divided by 2.", latex: "\\frac{\\sin(2x-1)}{2}+C" },
    ],
    finalAnswerLatex: "\\dfrac{\\sin(2x-1)}{2}+C",
  },
];

const rcrGuided: PracticeQuestion[] = [
  fa("y11adv-intg-rcr-g1", "Integrate using the reverse chain rule.", "\\int (x+2)^5\\,dx", "(x+2)^6/6+C", ["\\frac{(x+2)^6}{6}+C"]),
  fa("y11adv-intg-rcr-g2", "Integrate using the reverse chain rule.", "\\int e^{2x}\\,dx", "e^{2x}/2+C", ["\\frac{e^{2x}}{2}+C"]),
  mc("y11adv-intg-rcr-g3", "Which is ∫(3x+1)³ dx?", "B",
    [{ label: "A", text: "$\\frac{(3x+1)^4}{4}+C$" }, { label: "B", text: "$\\frac{(3x+1)^4}{12}+C$" }, { label: "C", text: "$3(3x+1)^4+C$" }, { label: "D", text: "$\\frac{(3x+1)^2}{2}+C$" }],
    "Increase the power to 4, divide by 4, then divide again by the inner coefficient 3: (3x+1)⁴/(4×3) = (3x+1)⁴/12.", "\\int(3x+1)^3\\,dx"),
  fa("y11adv-intg-rcr-g4", "Integrate using the reverse chain rule.", "\\int \\sin(4x)\\,dx", "-cos(4x)/4+C", ["-\\frac{\\cos(4x)}{4}+C"]),
];

const rcrIndep: PracticeQuestion[] = [
  fa("y11adv-intg-rcr-i1", "Integrate.", "\\int (2x-1)^6\\,dx", "(2x-1)^7/14+C", ["\\frac{(2x-1)^7}{14}+C"]),
  fa("y11adv-intg-rcr-i2", "Integrate.", "\\int e^{-x}\\,dx", "-e^{-x}+C", ["-e^(-x)+C", "-\\exp(-x)+C"]),
  fa("y11adv-intg-rcr-i3", "Integrate.", "\\int \\cos(3x+2)\\,dx", "sin(3x+2)/3+C", ["\\frac{\\sin(3x+2)}{3}+C"]),
  fa("y11adv-intg-rcr-i4", "Integrate.", "\\int (5x+1)^2\\,dx", "(5x+1)^3/15+C", ["\\frac{(5x+1)^3}{15}+C"]),
  mc("y11adv-intg-rcr-i5", "The reverse chain rule requires the inner function to be:", "A",
    [{ label: "A", text: "Linear (of the form ax + b)" }, { label: "B", text: "Any polynomial" }, { label: "C", text: "A quadratic only" }, { label: "D", text: "A trig function" }],
    "At Cambridge Year 11 level, the reverse chain rule is applied only when the inner function is linear (ax + b). More general substitution is an Extension topic.", ""),
];

const rcrMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-rcr-qm1",
    prompt:
      "Use the reverse chain rule to find the complete family of primitives.",
    latex: "\\int(3x-2)^4\\,dx",
    answer: "(3x-2)^5/15+C",
    acceptedAnswers: [
      "\\frac{(3x-2)^5}{15}+C",
      "(1/15)(3x-2)^5+C",
      "((3x-2)^5)/15 + C",
    ],
    hint:
      "Increase the outer power to five, then divide by both five and the inner derivative three.",
    explanation:
      "Increasing the outer power gives (3x-2)^5/5, but differentiating this would introduce the inner factor 3. Dividing by 3 as well gives (3x-2)^5/15+C. Differentiation produces 5(3x-2)^4(3)/15=(3x-2)^4.",
    difficulty: 3,
    diagnosticIntent:
      "Checks routine reverse-chain integration of a linear expression raised to a power, including both divisors.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-rcr-qm2",
    prompt:
      "A student applies the e-to-the-x rule unchanged. Which correction explains the required coefficient?",
    latex: "\\int e^{5x}\\,dx=e^{5x}+C",
    answer: "B",
    choices: [
      "Multiply by 5 because the exponent contains 5x.",
      "Divide by 5 because differentiating e^(5x) introduces the inner factor 5.",
      "Increase the exponent to 5x+1 and divide by 5x+1.",
      "Replace e^(5x) by 5e^x because coefficients move outside exponents.",
    ],
    hint:
      "Differentiate e to the 5x and identify the constant factor that must be cancelled.",
    explanation:
      "The chain rule gives d/dx(e^(5x))=5e^(5x), which is five times the integrand. Multiplying by 1/5 compensates for that inner derivative, so the correct primitive is e^(5x)/5+C. Option B gives both the correction and its reason.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses omission of the reciprocal inner-derivative factor in a linear exponential primitive.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Uses the chain-rule multiplier in the same direction instead of reversing it.",
      C: "Misapplies the algebraic power rule to an exponential function.",
      D: "Separates an exponential argument using an invalid algebraic rule.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-rcr-qm3",
    prompt:
      "The proposed function is a primitive of the displayed integrand. Determine the constant a.",
    latex: "F(x)=\\frac{(2x+1)^5}{a},\qquad F'(x)=(2x+1)^4",
    answer: "a=10",
    acceptedAnswers: ["10", "a = 10", "10.0"],
    hint:
      "Differentiate the numerator with the chain rule and equate its overall coefficient to one.",
    explanation:
      "Differentiating gives F'(x)=(1/a)·5(2x+1)^4·2=(10/a)(2x+1)^4. For this to equal (2x+1)^4 for every x, 10/a=1, so a=10. The denominator combines the new outer power and inner derivative.",
    difficulty: 3,
    diagnosticIntent:
      "Checks reverse verification of the two coefficient factors created by differentiating a composite power.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-rcr-qm4",
    prompt:
      "Which primitive has the correct trigonometric sign and inner-derivative factor?",
    latex: "\\int\\cos(4-3x)\\,dx",
    answer: "D",
    choices: [
      "3sin(4-3x)+C",
      "sin(4-3x)/3+C",
      "-3sin(4-3x)+C",
      "-sin(4-3x)/3+C",
    ],
    hint:
      "Differentiate sin(4-3x): the inner derivative is negative three.",
    explanation:
      "Differentiating sin(4-3x) gives -3cos(4-3x). To recover positive cos(4-3x), multiply by -1/3. Hence the primitive is -sin(4-3x)/3+C, so option D has both the correct sign and reciprocal factor.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses sign and reciprocal-factor errors when the linear inner function has a negative derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Multiplies by the magnitude of the inner derivative and ignores its negative sign.",
      B: "Uses the reciprocal magnitude but omits the negative sign.",
      C: "Uses the correct sign but multiplies rather than divides by the inner derivative magnitude.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-rcr-qm5",
    prompt:
      "Determine k so that the stated antiderivative relationship is true for every real x.",
    latex: "\\int k(2x+1)^3\\,dx=(2x+1)^4+C",
    answer: "k=8",
    acceptedAnswers: ["8", "k = 8", "8.0"],
    hint:
      "Differentiate the proposed right-hand side and compare its coefficient with the integrand.",
    explanation:
      "Differentiating (2x+1)^4 gives 4(2x+1)^3·2=8(2x+1)^3. Therefore the integrand must have coefficient k=8. This reverses the usual question: the chain-rule coefficient is recovered from a proposed primitive.",
    difficulty: 4,
    diagnosticIntent:
      "Assesses reverse coefficient reasoning from a proposed composite primitive rather than direct integration.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-rcr-qm6",
    prompt:
      "For non-zero real a, determine all values for which the displayed primitive has the same amplitude as cos(ax).",
    latex: "F_a(x)=\\frac{\\sin(ax)}{a},\qquad F_a'(x)=\\cos(ax)",
    answer: "a=±1",
    acceptedAnswers: ["a=1 or a=-1", "a = ±1", "{-1,1}"],
    hint:
      "The amplitude of F sub a is the absolute value of one over a; set it equal to one.",
    explanation:
      "The cosine integrand has amplitude 1, while F_a has amplitude |1/a| because sine itself has amplitude 1. Equal amplitudes require |1/a|=1, so |a|=1 and a=±1. Both signs still differentiate correctly because the chain-rule factor a cancels the denominator.",
    difficulty: 4,
    diagnosticIntent:
      "Investigates how the inner frequency controls the amplitude of a trigonometric primitive through reciprocal scaling.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-rcr-qm7",
    prompt:
      "Compare the primitive amplitudes and find A2/A5 for the family shown.",
    latex:
      "\\int\\cos(kx)\\,dx=A_k\\sin(kx)+C,\qquad k>0",
    answer: "5/2",
    acceptedAnswers: ["2.5", "2.50", "A_2/A_5=5/2"],
    hint:
      "Use A sub k equals one over k, then form the requested ratio carefully.",
    explanation:
      "Reverse-chain integration gives A_k=1/k. Therefore A_2=1/2 and A_5=1/5. Their ratio is (1/2)/(1/5)=5/2. The lower-frequency cosine has the larger primitive amplitude because less reciprocal scaling is needed.",
    difficulty: 4,
    diagnosticIntent:
      "Probes generalisation of reciprocal inner-frequency scaling across a parameterised family of primitives.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-rcr-qm8",
    prompt:
      "A student tries to compensate for a non-constant inner derivative by dividing by 2x. Which diagnosis is valid?",
    latex:
      "\\int(x^2+1)^4\\,dx\\overset{?}{=}\\frac{(x^2+1)^5}{10x}+C",
    answer: "C",
    choices: [
      "The method is valid because every inner derivative can be placed in the denominator.",
      "Only the 10 should be changed to 5; the division by x is valid.",
      "The method is invalid: differentiating a quotient also differentiates 1/x, creating an extra term.",
      "The result is valid only when x is positive.",
    ],
    hint:
      "Differentiate the proposed quotient; a variable factor in the denominator cannot be treated as a constant.",
    explanation:
      "For a linear inner function, division is by a constant derivative. Here 2x varies with x. Writing 1/(10x) introduces a quotient or product factor whose derivative creates an additional term, so differentiating the proposal does not recover (x^2+1)^4. Option C identifies the structural failure.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses invalid extension of constant reverse-chain compensation to a variable inner derivative.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Treats a variable inner derivative as though it were a constant coefficient.",
      B: "Adjusts the numerical power factor but retains the invalid variable division.",
      D: "Mistakes a differentiation-rule failure for a domain restriction.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-rcr-qm9",
    prompt:
      "Find the complete family of primitives, coordinating all three linear inner functions.",
    latex:
      "\\int\\left(2(3x-1)^4-5e^{-2x}+6\\cos(3x)\\right)\\,dx",
    answer: "2(3x-1)^5/15+5e^(-2x)/2+2sin(3x)+C",
    acceptedAnswers: [
      "\\frac{2(3x-1)^5}{15}+\\frac{5e^{-2x}}{2}+2\\sin(3x)+C",
      "(2/15)(3x-1)^5+(5/2)e^(-2x)+2sin(3x)+C",
      "2(3x-1)^5/15+2.5e^(-2x)+2sin(3x)+C",
    ],
    hint:
      "Treat each term separately and divide by its own inner derivative, paying attention to the negative exponential coefficient.",
    explanation:
      "The composite power gives 2(3x-1)^5/(5·3). For -5e^(-2x), division by -2 gives +(5/2)e^(-2x). Finally, 6cos(3x) integrates to 2sin(3x). Combining these terms and +C gives the stated primitive.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses synthesis of power, exponential, and trigonometric reverse-chain rules with independent signs and factors.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-rcr-qm10",
    prompt:
      "The proposed function is a primitive of the displayed expression. Determine a+b+c.",
    latex:
      "F(x)=a(2x-1)^4+be^{-3x}+c\\sin(5x),\\quad F'(x)=8(2x-1)^3+6e^{-3x}+10\\cos(5x)",
    answer: "1",
    acceptedAnswers: ["1.0", "a+b+c=1", "a=1,b=-2,c=2"],
    hint:
      "Differentiate each composite term and match the three independent coefficients separately.",
    explanation:
      "Differentiating gives F'=8a(2x-1)^3-3be^(-3x)+5ccos(5x). Matching the target yields a=1, -3b=6 so b=-2, and 5c=10 so c=2. Therefore a+b+c=1-2+2=1.",
    difficulty: 5,
    diagnosticIntent:
      "Combines three chain-rule reversals with coefficient matching and sign control in a single synthesis task.",
    taskType: "synthesis",
  }),
];

// ─── L8: Trapezoidal Rule ─────────────────────────────────────────────────────

const trapWorked: WorkedExample[] = [
  {
    title: "Apply the trapezoidal rule with 3 strips",
    questionLatex: "\\text{Approximate }\\int_0^3 x^2\\,dx\\text{ using 3 strips.}",
    steps: [
      { explanation: "Width h = (3−0)/3 = 1. Function values at x = 0, 1, 2, 3.", latex: "f(0)=0,\\;f(1)=1,\\;f(2)=4,\\;f(3)=9" },
      { explanation: "Apply the rule: T = h/2 × (first + 2×middle + last).", latex: "T=\\frac{1}{2}(0+2\\cdot1+2\\cdot4+9)=\\frac{1}{2}(19)=9.5" },
      { explanation: "Compare with exact value ∫₀³ x² dx = 9.", latex: "\\text{Overestimate (curve is concave up)}" },
    ],
    finalAnswerLatex: "9.5",
  },
  {
    title: "Apply the trapezoidal rule with 4 strips from a table",
    questionLatex: "\\begin{array}{c|ccccc}x&1&2&3&4&5\\\\f(x)&3&5&4&6&2\\end{array}",
    steps: [
      { explanation: "h = 1, 4 strips, first = 3, last = 2, middle values = 5, 4, 6.", latex: "T=\\frac{1}{2}(3+2\\times5+2\\times4+2\\times6+2)=\\frac{1}{2}(2+12+8+12+3)" },
      { explanation: "Wait: h = 1, so T = h/2(f₀ + 2f₁ + 2f₂ + 2f₃ + f₄) = 1/2(3+10+8+12+2).", latex: "T=\\frac{1}{2}(35)=17.5" },
    ],
    finalAnswerLatex: "17.5",
  },
];

const trapGuided: PracticeQuestion[] = [
  fa("y11adv-intg-trap-g1", "Use the trapezoidal rule with 2 strips to approximate the integral.", "\\int_0^2 x^2\\,dx,\\;h=1", "3", ["T≈3"]),
  mc("y11adv-intg-trap-g2", "The trapezoidal rule gives an overestimate when the curve is:", "A",
    [{ label: "A", text: "Concave up (f'' > 0)" }, { label: "B", text: "Concave down (f'' < 0)" }, { label: "C", text: "Linear" }, { label: "D", text: "Decreasing" }],
    "When a curve is concave up, each trapezoid lies above the curve. This means the sum of trapezoid areas exceeds the true area — an overestimate.", ""),
  fa("y11adv-intg-trap-g3", "Use the trapezoidal rule to approximate.", "\\begin{array}{c|ccc}x&0&1&2\\\\f(x)&2&5&6\\end{array}", "9", ["T≈9"]),
  mc("y11adv-intg-trap-g4", "To improve a trapezoidal approximation, you should:", "B",
    [{ label: "A", text: "Use fewer strips" }, { label: "B", text: "Use more strips (smaller h)" }, { label: "C", text: "Square the function values" }, { label: "D", text: "Use only the endpoints" }],
    "More strips means thinner trapezoids that better approximate the curve, reducing the error.", ""),
];

const trapIndep: PracticeQuestion[] = [
  fa("y11adv-intg-trap-i1", "Use the trapezoidal rule with 4 strips to approximate.", "\\int_0^4 \\sqrt{x}\\,dx", "5.146", ["5.15", "5.1"]),
  fa("y11adv-intg-trap-i2", "Approximate the integral using the table.", "\\begin{array}{c|cccc}x&1&2&3&4\\\\f(x)&4&3&5&2\\end{array}", "11", ["T≈11"]),
  mc("y11adv-intg-trap-i3", "For a concave-down curve, the trapezoidal rule gives:", "B",
    [{ label: "A", text: "An exact answer" }, { label: "B", text: "An underestimate" }, { label: "C", text: "An overestimate" }, { label: "D", text: "Zero" }],
    "When concave down, each trapezoid lies below the curve. The sum of trapezoid areas is less than the true area — an underestimate.", ""),
  fa("y11adv-intg-trap-i4", "Use the trapezoidal rule with 3 strips to approximate.", "\\int_0^3 e^x\\,dx,\\;h=1", "20.65", ["20.6", "≈20.65"]),
  mc("y11adv-intg-trap-i5", "The trapezoidal rule formula for n strips of width h is:", "C",
    [{ label: "A", text: "$h(f_0+f_1+\\cdots+f_n)$" }, { label: "B", text: "$\\frac{h}{2}(f_0+f_n)$" }, { label: "C", text: "$\\frac{h}{2}(f_0+2f_1+\\cdots+2f_{n-1}+f_n)$" }, { label: "D", text: "$h(f_0+2f_1+f_n)$" }],
    "The full formula doubles all interior (middle) function values and uses the endpoint values once each, multiplied by h/2.", ""),
];

const trapMastery: PracticeQuestion[] = [
  qualityAnswer({
    id: "y11adv-intg-trap-qm1",
    prompt:
      "Use the four displayed ordinates and three unit-width strips to calculate the trapezoidal estimate.",
    latex: "x:0,1,2,3;\\qquad f(x):2,4,5,3",
    answer: "11.5",
    acceptedAnswers: ["11.50", "23/2", "T=11.5"],
    hint:
      "Use each endpoint once and double the two interior ordinates before multiplying by one half.",
    explanation:
      "With h=1 and ordinates 2, 4, 5 and 3, the trapezoidal rule gives T=(1/2)[2+2(4+5)+3]. The bracket is 2+18+3=23, so T=23/2=11.5. The interior values are doubled because each is shared by two adjacent strips.",
    difficulty: 3,
    diagnosticIntent:
      "Checks accurate substitution into the composite trapezoidal rule with correct endpoint and interior weights.",
    taskType: "procedural",
  }),
  qualityChoice({
    id: "y11adv-intg-trap-qm2",
    prompt:
      "A student weights the ordinates in reverse. Which correction gives the composite trapezoidal rule?",
    latex:
      "T\\overset{?}{=}\\frac{1}{2}\\left[2y_0+y_1+y_2+2y_3\\right]",
    answer: "A",
    choices: [
      "Use T=(1/2)[y_0+2y_1+2y_2+y_3].",
      "Use T=(1/2)[2y_0+2y_1+2y_2+2y_3].",
      "Use T=y_0+y_1+y_2+y_3.",
      "Use T=(1/2)[y_0+y_1+y_2+y_3].",
    ],
    hint:
      "Count how many adjacent trapezoids share each interior ordinate and each endpoint ordinate.",
    explanation:
      "Each endpoint belongs to one trapezoid, while every interior ordinate is a side of two adjacent trapezoids. Therefore endpoints receive weight 1 and interior values weight 2: T=(1/2)[y_0+2y_1+2y_2+y_3]. Option A reverses the student's incorrect weighting.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses reversal of endpoint and interior weights by connecting the formula to shared trapezoid sides.",
    taskType: "analytical",
    distractorMisconceptions: {
      B: "Doubles every ordinate without distinguishing endpoints from shared interior sides.",
      C: "Omits both the one-half factor and the repeated interior contributions.",
      D: "Uses the one-half factor but gives every ordinate equal weight.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-trap-qm3",
    prompt:
      "The three-strip trapezoidal estimate is 15. Determine the missing interior ordinate p.",
    latex:
      "x:0,1,2,3;\\qquad f(x):2,5,p,4;\\qquad h=1",
    answer: "p=7",
    acceptedAnswers: ["7", "p = 7", "7.0"],
    hint:
      "Substitute the known values into T=(1/2)[first+2(interiors)+last] and solve the linear equation.",
    explanation:
      "The rule gives 15=(1/2)[2+2(5+p)+4]. Simplifying the bracket gives 16+2p, so 15=8+p. Therefore p=7. The unknown is an interior ordinate and must receive weight 2 in the equation.",
    difficulty: 3,
    diagnosticIntent:
      "Checks reverse use of the trapezoidal formula to recover a missing shared ordinate from a known estimate.",
    taskType: "problem-solving",
  }),
  qualityChoice({
    id: "y11adv-intg-trap-qm4",
    prompt:
      "The displayed square-root curve is concave down. What does that imply about the trapezoidal estimate?",
    latex: "y=\\sqrt{x},\qquad 0\\le x\\le4",
    answer: "C",
    choices: [
      "It is always exact because the endpoints lie on the curve.",
      "It is an overestimate because every chord lies above a concave-down curve.",
      "It is an underestimate because the chords lie below a concave-down curve.",
      "Its error sign cannot be related to concavity.",
    ],
    hint:
      "Compare each straight chord joining adjacent sampled points with the concave-down arc between them.",
    explanation:
      "For a concave-down curve, each chord between sampled points lies below the curve. The trapezoids therefore omit some of the true under-curve area, producing an underestimate. Option C correctly connects the geometric chord position with the error direction.",
    difficulty: 3,
    diagnosticIntent:
      "Diagnoses reversal of the overestimate-underestimate rule by reasoning from chord position and concavity.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Assumes matching endpoint heights makes a curved strip exact.",
      B: "Uses the concave-up chord relationship for a concave-down function.",
      D: "Treats the error direction as unrelated to a known global concavity.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-trap-qm5",
    prompt:
      "For y=x² on [0,4], compare the two-strip and four-strip estimates. By what factor is the absolute error reduced?",
    latex:
      "T_2=24,\qquad T_4=22,\qquad \\int_0^4x^2\\,dx=\\frac{64}{3}",
    answer: "factor of 4",
    acceptedAnswers: ["4", "4.0", "the error is quartered"],
    hint:
      "Calculate |T2-exact| and |T4-exact| using thirds, then divide the larger error by the smaller.",
    explanation:
      "The two-strip error is |24-64/3|=|72/3-64/3|=8/3. The four-strip error is |22-64/3|=|66/3-64/3|=2/3. Their ratio is (8/3)/(2/3)=4, so doubling the strip count reduces the absolute error by a factor of 4 here.",
    difficulty: 4,
    diagnosticIntent:
      "Assesses quantitative comparison of approximation errors rather than the vague claim that more strips are better.",
    taskType: "problem-solving",
  }),
  qualityAnswer({
    id: "y11adv-intg-trap-qm6",
    prompt:
      "Investigate the displayed linear data: find the trapezoidal estimate and compare it with the exact integral of y=2x+1.",
    latex:
      "x:0,1,2,3;\\qquad y:1,3,5,7",
    answer: "12, exact",
    acceptedAnswers: [
      "T=12 and the error is 0",
      "12 with zero error",
      "exactly 12",
    ],
    hint:
      "Apply the rule with h=1, then integrate 2x+1 from zero to three for comparison.",
    explanation:
      "The trapezoidal estimate is (1/2)[1+2(3+5)+7]=(1/2)(24)=12. The exact integral is [x^2+x]_0^3=9+3=12. The values agree because straight chords reproduce a linear function exactly on every strip.",
    difficulty: 4,
    diagnosticIntent:
      "Investigates the exactness of the trapezoidal rule for linear functions through numerical and integral comparison.",
    taskType: "investigative",
  }),
  qualityAnswer({
    id: "y11adv-intg-trap-qm7",
    prompt:
      "The sample points are not equally spaced. Estimate the signed integral by calculating each trapezoid separately.",
    latex:
      "x:0,1,3,4;\\qquad f(x):2,4,8,6",
    answer: "22",
    acceptedAnswers: ["22.0", "T=22", "22 square units"],
    hint:
      "Use width times average endpoint height on each interval; the three widths are 1, 2 and 1.",
    explanation:
      "The three trapezoids have areas 1(2+4)/2=3, 2(4+8)/2=12, and 1(8+6)/2=7. Adding them gives 3+12+7=22. A single common h formula is inappropriate because the middle interval is twice as wide.",
    difficulty: 4,
    diagnosticIntent:
      "Probes adaptation of trapezoidal reasoning to unequal spacing rather than automatic use of one common strip width.",
    taskType: "investigative",
  }),
  qualityChoice({
    id: "y11adv-intg-trap-qm8",
    prompt:
      "Some sampled ordinates are negative. Which statement correctly estimates the signed integral?",
    latex:
      "x:0,1,2;\\qquad f(x):2,-1,-2;\\qquad h=1",
    answer: "D",
    choices: [
      "Replace all ordinates by their magnitudes, giving T=3 for the signed integral.",
      "Discard the negative ordinates because area cannot be negative.",
      "The trapezoidal rule cannot be used when sampled values cross the axis.",
      "Retain the signs: T=(1/2)[2+2(-1)+(-2)]=-1.",
    ],
    hint:
      "A definite integral is signed accumulation; negative ordinates must remain negative unless total geometric area is requested.",
    explanation:
      "For a signed integral, ordinates below the axis contribute negatively. The rule gives T=(1/2)[2-2-2]=-1, so option D is correct. Replacing values by magnitudes would attempt a different total-area calculation and would also ignore where crossings occur between samples.",
    difficulty: 5,
    diagnosticIntent:
      "Diagnoses inappropriate conversion of negative ordinates to positive values in a signed trapezoidal estimate.",
    taskType: "analytical",
    distractorMisconceptions: {
      A: "Confuses signed accumulation with a rough total-area calculation.",
      B: "Deletes below-axis contributions rather than retaining their negative sign.",
      C: "Assumes an axis crossing invalidates a method that supports signed ordinates.",
    },
  }),
  qualityAnswer({
    id: "y11adv-intg-trap-qm9",
    prompt:
      "A vehicle's speed is sampled at unequal time intervals. Use trapezoids to estimate the distance travelled.",
    latex:
      "t\\text{ (s)}:0,2,5,7;\\qquad v\\text{ (m/s)}:0,6,10,4",
    answer: "44 m",
    acceptedAnswers: ["44", "44 metres", "distance=44 m"],
    hint:
      "For each time interval, multiply its width by the average of the two endpoint speeds, then add.",
    explanation:
      "From 0 to 2 seconds the estimate is 2(0+6)/2=6 m. From 2 to 5 it is 3(6+10)/2=24 m, and from 5 to 7 it is 2(10+4)/2=14 m. The total estimated distance is 6+24+14=44 m.",
    difficulty: 5,
    diagnosticIntent:
      "Assesses synthesis of unequal interval widths, rate-to-amount interpretation, units, and cumulative estimation.",
    taskType: "synthesis",
  }),
  qualityAnswer({
    id: "y11adv-intg-trap-qm10",
    prompt:
      "The four-strip estimate is 20 and the missing interior ordinates satisfy b=a+2. Determine a and b.",
    latex:
      "x:0,1,2,3,4;\\qquad f(x):1,a,b,7,5;\\qquad h=1",
    answer: "a=4,b=6",
    acceptedAnswers: ["a = 4, b = 6", "(a,b)=(4,6)", "a=4 and b=6"],
    hint:
      "Substitute the ordinates into the weighted formula to obtain a+b=10, then combine it with b=a+2.",
    explanation:
      "The rule gives 20=(1/2)[1+2(a+b+7)+5]=(1/2)(20+2a+2b)=10+a+b, so a+b=10. With b=a+2, this becomes 2a+2=10, giving a=4 and b=6. Both missing values receive interior weight 2.",
    difficulty: 5,
    diagnosticIntent:
      "Combines reverse trapezoidal weighting with a simultaneous linear condition to reconstruct two missing data values.",
    taskType: "synthesis",
  }),
];

// ─── Main export ──────────────────────────────────────────────────────────────

export function year11AdvancedIntegrationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "integration") {
    return null;
  }

  const base = {
    syllabusArea: "Calculus",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "primitives-and-antidifferentiation") {
    return {
      ...base,
      description:
        "Understand antidifferentiation as the reverse of differentiation and apply the reverse power rule to find primitives.",
      learningIntention:
        "Learn to find antiderivatives using the reverse power rule and understand what the constant of integration represents.",
      successCriteria: [
        "Explain that a primitive F(x) satisfies F'(x) = f(x).",
        "Use integral notation ∫f(x) dx correctly.",
        "Apply the reverse power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1.",
        "Include the constant of integration +C in every indefinite integral.",
        "Check an antiderivative by differentiating it.",
        "Identify when the reverse power rule does not apply (n = −1 and non-polynomial functions).",
      ],
      teaching: {
        paragraphs: [
          "Antidifferentiation is the reverse of differentiation. If differentiating F(x) gives f(x), then antidifferentiating f(x) gives back F(x). This reverse process is called finding a primitive or an antiderivative.",
          "The reverse power rule is the mirror image of the power rule for derivatives. To differentiate xⁿ you multiply by n and reduce the power by one; to antidifferentiate xⁿ you increase the power by one and divide by the new power.",
          "Every antiderivative has a constant of integration +C added to it. This reflects the fact that differentiating any constant gives zero — so the original function could have had any constant term, and integration cannot recover it without extra information.",
          "The notation ∫f(x) dx is read as 'the indefinite integral of f(x) with respect to x'. The result is a family of functions, all differing only in the value of C.",
          "To check an antiderivative, differentiate your answer. If you recover the original function, the antiderivative is correct. This also confirms the correct coefficient and power.",
        ],
        latexBlocks: [
          "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C, \\quad n\\ne -1",
          "\\frac{d}{dx}\\left(\\frac{x^{n+1}}{n+1}+C\\right) = x^n \\checkmark",
          "\\int ax^n\\,dx = \\frac{a}{n+1}\\,x^{n+1}+C",
        ],
      },
      workedExamples: primWorked,
      guidedPractice: primGuided,
      independentPractice: primIndep,
      commonMistakes: [
        { mistake: "Forgetting to add +C to an indefinite integral.", fix: "Every indefinite integral must include +C. Omitting it is an error in HSC exams." },
        { mistake: "Multiplying by the power instead of dividing.", fix: "The reverse power rule divides by the new power, not multiplies. Differentiation multiplies; integration divides." },
        { mistake: "Applying the reverse power rule to xˉ¹.", fix: "The reverse power rule fails when n = −1 because dividing by (n+1) = 0 is undefined. The antiderivative of 1/x is ln|x|, not x⁰/0." },
      ],
      masteryQuiz: primMastery,
    };
  }

  if (lesson.slug === "standard-antiderivatives") {
    return {
      ...base,
      description:
        "Build a table of standard antiderivatives including exponential, trigonometric and reciprocal forms.",
      learningIntention:
        "Learn and use the standard antiderivatives for eˣ, sin x, cos x, and 1/x, and integrate sums of these forms.",
      successCriteria: [
        "State and use ∫eˣ dx = eˣ + C.",
        "State and use ∫sin x dx = −cos x + C.",
        "State and use ∫cos x dx = sin x + C.",
        "State and use ∫(1/x) dx = ln|x| + C.",
        "Integrate sums and differences involving these standard forms.",
        "Explain why the power rule does not apply to eˣ or trig functions.",
      ],
      teaching: {
        paragraphs: [
          "Standard antiderivatives extend the table of integration results beyond polynomials. Each result is derived by asking: which function differentiates to give this integrand?",
          "Since d/dx(eˣ) = eˣ, we have ∫eˣ dx = eˣ + C. The exponential function eˣ is its own derivative and its own antiderivative — a unique property.",
          "For trigonometric functions: d/dx(sin x) = cos x, so ∫cos x dx = sin x + C. Similarly d/dx(−cos x) = sin x, so ∫sin x dx = −cos x + C. Notice the sign pattern carefully.",
          "For the reciprocal: d/dx(ln|x|) = 1/x, so ∫(1/x) dx = ln|x| + C. The absolute value is needed because ln is only defined for positive arguments, yet 1/x is defined for all x ≠ 0.",
          "As with polynomials, integration is linear: ∫[af(x) + bg(x)] dx = a∫f(x) dx + b∫g(x) dx. This means you can integrate term by term and use a single +C.",
        ],
        latexBlocks: [
          "\\int e^x\\,dx = e^x+C \\qquad \\int \\cos x\\,dx = \\sin x+C \\qquad \\int \\sin x\\,dx = -\\cos x+C",
          "\\int \\frac{1}{x}\\,dx = \\ln|x|+C",
          "\\int [f(x)+g(x)]\\,dx = \\int f(x)\\,dx + \\int g(x)\\,dx",
        ],
      },
      workedExamples: stdWorked,
      guidedPractice: stdGuided,
      independentPractice: stdIndep,
      commonMistakes: [
        { mistake: "Writing ∫sin x dx = cos x + C (wrong sign).", fix: "Differentiating cos x gives −sin x, NOT sin x. So ∫sin x dx = −cos x + C. Memorise the sign carefully." },
        { mistake: "Applying the reverse power rule to eˣ.", fix: "eˣ is not xⁿ. Its antiderivative is eˣ, not eˣ⁺¹/(x+1)." },
        { mistake: "Writing ∫(1/x) dx = ln x + C without the absolute value.", fix: "ln is undefined for negative numbers, but 1/x is defined for x < 0. The correct answer is ln|x| + C." },
      ],
      masteryQuiz: stdMastery,
    };
  }

  if (lesson.slug === "initial-value-problems") {
    return {
      ...base,
      description:
        "Use a given point to determine the constant of integration and find the particular primitive.",
      learningIntention:
        "Find a specific antiderivative by substituting an initial condition to determine the constant of integration.",
      successCriteria: [
        "Find the general antiderivative F(x) + C from a given derivative.",
        "Substitute a given point to set up an equation for C.",
        "Solve for C and write the particular primitive.",
        "Interpret C geometrically as a vertical shift within a family of curves.",
        "Reconstruct a function from its derivative and one known value.",
      ],
      teaching: {
        paragraphs: [
          "When you integrate without limits, you get a family of curves F(x) + C. All members share the same shape and the same derivative, but each sits at a different height.",
          "An initial condition is a known point on the curve (an x-value and its corresponding y-value). Substituting this point into F(x) + C creates an equation that can be solved for C.",
          "Once C is found, you have the particular primitive — the unique curve from the family that passes through the given point.",
          "This process is exactly what happens when solving a differential equation: integrate to find the general solution, then apply the initial condition to pin down the particular solution.",
          "Always write the general form first, then substitute. Writing the answer before substituting leads to errors.",
        ],
        latexBlocks: [
          "\\text{General: } F(x)+C",
          "\\text{Particular: substitute }(x_0,y_0)\\Rightarrow y_0=F(x_0)+C\\Rightarrow C=y_0-F(x_0)",
        ],
      },
      workedExamples: ivWorked,
      guidedPractice: ivGuided,
      independentPractice: ivIndep,
      commonMistakes: [
        { mistake: "Substituting the point before integrating.", fix: "Always antidifferentiate first to get F(x) + C, then substitute the point to find C." },
        { mistake: "Forgetting +C when writing the general form.", fix: "Without C, you cannot accommodate the initial condition. The general form must include C." },
        { mistake: "Solving for C correctly but forgetting to write the final function.", fix: "The answer is f(x) = F(x) + [value of C], not just C." },
      ],
      masteryQuiz: ivMastery,
    };
  }

  if (lesson.slug === "definite-integrals") {
    return {
      ...base,
      description:
        "Evaluate definite integrals using the antiderivative notation, understand signed area, and interpret the geometric meaning.",
      learningIntention:
        "Use the definite integral to compute exact values using F(b) − F(a) and interpret the sign of the result.",
      successCriteria: [
        "Write and interpret the notation ∫ₐᵇ f(x) dx.",
        "Evaluate a definite integral using F(b) − F(a).",
        "Identify why +C cancels in a definite integral.",
        "Explain the meaning of a positive and a negative definite integral.",
        "Recognise that the definite integral gives signed area, not raw area.",
      ],
      teaching: {
        paragraphs: [
          "A definite integral ∫ₐᵇ f(x) dx has specific numbers (limits) at the top and bottom of the integral sign. The result is a single number, not a family of functions.",
          "To evaluate, find any antiderivative F(x) (no +C needed), then compute F(b) − F(a). This is written using bracket notation: [F(x)]ₐᵇ.",
          "The constant of integration always cancels: (F(b) + C) − (F(a) + C) = F(b) − F(a). This is why we do not write +C in definite integrals.",
          "If the curve lies above the x-axis on [a, b], the definite integral is positive and equals the enclosed area. If the curve lies below the x-axis, the integral is negative — it gives signed area, not absolute area.",
          "Swapping limits negates the result: ∫ₐᵇ f(x) dx = −∫ᵦₐ f(x) dx. The order of the limits determines the sign.",
        ],
        latexBlocks: [
          "\\int_a^b f(x)\\,dx = \\bigl[F(x)\\bigr]_a^b = F(b)-F(a)",
          "\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx",
        ],
      },
      workedExamples: defWorked,
      guidedPractice: defGuided,
      independentPractice: defIndep,
      commonMistakes: [
        { mistake: "Adding +C when evaluating a definite integral.", fix: "+C cancels when the limits are substituted. Do not include it in a definite integral." },
        { mistake: "Computing F(a) − F(b) instead of F(b) − F(a).", fix: "Subtract the lower-limit value FROM the upper-limit value. Upper minus lower." },
        { mistake: "Treating a negative integral as an error.", fix: "A negative result means the curve is below the x-axis. It is signed area, not raw area." },
      ],
      masteryQuiz: defMastery,
    };
  }

  if (lesson.slug === "fundamental-theorem-of-calculus") {
    return {
      ...base,
      description:
        "Understand the Fundamental Theorem of Calculus as the connection between differentiation and integration.",
      learningIntention:
        "Apply the FTC to evaluate definite integrals and understand the derivative of an accumulation function.",
      successCriteria: [
        "State the FTC: ∫ₐᵇ f(x) dx = F(b) − F(a) where F' = f.",
        "Evaluate definite integrals using the FTC, including expressions with roots and fractions.",
        "Use the FTC to find d/dx ∫₀ˣ f(t) dt = f(x).",
        "Explain why the FTC shows integration and differentiation are inverse operations.",
        "Recognise that the +C cancels and does not affect definite integral results.",
      ],
      teaching: {
        paragraphs: [
          "The Fundamental Theorem of Calculus (FTC) is the central theorem of calculus. It reveals that differentiation and integration are not separate operations — they are inverses of each other.",
          "The first part of the FTC says that if F is any antiderivative of f, then ∫ₐᵇ f(x) dx = F(b) − F(a). This is the formula used to evaluate every definite integral.",
          "The second part says that d/dx ∫₀ˣ f(t) dt = f(x). Differentiating an accumulation integral returns the original integrand at the variable upper limit.",
          "This theorem is why definite integrals can be calculated exactly from antiderivatives alone, without computing infinite sums of rectangles. The theorem bypasses the limit entirely.",
          "When evaluating, always substitute the upper limit first, then subtract the lower limit value. The constant C cancels in the subtraction.",
        ],
        latexBlocks: [
          "\\int_a^b f(x)\\,dx = F(b)-F(a), \\quad F'(x)=f(x)",
          "\\frac{d}{dx}\\int_0^x f(t)\\,dt = f(x)",
        ],
      },
      workedExamples: ftcWorked,
      guidedPractice: ftcGuided,
      independentPractice: ftcIndep,
      commonMistakes: [
        { mistake: "Differentiating rather than integrating when the FTC is being applied.", fix: "Read the question carefully. If it asks for ∫ₐᵇ, you integrate; if it asks for d/dx ∫₀ˣ, you return the integrand." },
        { mistake: "Including +C after evaluating a definite integral.", fix: "The +C always cancels because it is subtracted from itself. Never include +C in a definite integral evaluation." },
        { mistake: "Writing F(a) − F(b) instead of F(b) − F(a).", fix: "The FTC uses upper limit minus lower limit: F(b) − F(a)." },
      ],
      masteryQuiz: ftcMastery,
    };
  }

  if (lesson.slug === "areas-under-curves") {
    return {
      ...base,
      description:
        "Use definite integrals to calculate areas under curves, between curves, and identify when splitting is required.",
      learningIntention:
        "Calculate areas enclosed between curves and axes, handle curves below the x-axis, and find areas between two curves.",
      successCriteria: [
        "Set up and evaluate an integral to find area under a curve above the x-axis.",
        "Explain why a negative integral does not mean zero area.",
        "Use absolute value or negation to find area when a curve is below the x-axis.",
        "Split an integral at the x-intercept when the curve crosses the axis.",
        "Find the area between two curves using ∫(upper − lower) dx.",
      ],
      teaching: {
        paragraphs: [
          "The definite integral ∫ₐᵇ f(x) dx gives signed area. When f(x) ≥ 0 on [a, b], the integral equals the geometric area under the curve. When f(x) < 0, the integral is negative — the region is below the axis.",
          "To find the true geometric area when a curve dips below the axis, take the absolute value of the integral over that region, or negate it: Area = −∫ₐᵇ f(x) dx for the below-axis part.",
          "When a curve crosses the x-axis at some point c inside [a, b], you must split the integral: Area = ∫ₐ^c f(x) dx + |∫_c^b f(x) dx|. A single integral over the whole interval would partially cancel.",
          "To find the area between two curves y = f(x) (upper) and y = g(x) (lower) on [a, b]: Area = ∫ₐᵇ [f(x) − g(x)] dx. Check which curve is on top on the given interval before setting up.",
          "Finding intersection points is the key step before setting up an area-between-curves problem. Set f(x) = g(x) and solve to locate where the curves swap order. At this stage all intersection equations reduce to simple factoring — expect expressions like x² = x or x² = 4 that factor easily. Problems requiring more complex intersections are a Year 12 extension.",
        ],
        latexBlocks: [
          "\\text{Area above axis: }\\int_a^b f(x)\\,dx\\quad (f(x)\\ge0)",
          "\\text{Area below axis: }-\\int_a^b f(x)\\,dx\\quad (f(x)\\le0)",
          "\\text{Area between curves: }\\int_a^b[f(x)-g(x)]\\,dx\\quad (f(x)\\ge g(x))",
        ],
      },
      workedExamples: areaWorked,
      guidedPractice: areaGuided,
      independentPractice: areaIndep,
      commonMistakes: [
        { mistake: "Using a single integral when the curve crosses the x-axis.", fix: "A single integral cancels positive and negative areas. Split at every x-intercept and add absolute values." },
        { mistake: "Setting up ∫(lower − upper) for between-curve area.", fix: "Always subtract the lower curve from the upper curve. Reversing this gives a negative area." },
        { mistake: "Reporting a negative integral as the area.", fix: "Area is always positive. If the integral is negative, the actual area is its absolute value." },
      ],
      masteryQuiz: areaMastery,
    };
  }

  if (lesson.slug === "reverse-chain-rule-integration") {
    return {
      ...base,
      description:
        "Integrate composite functions of the form f(ax + b) by reversing the chain rule.",
      learningIntention:
        "Apply the reverse chain rule to integrate expressions of the form (ax+b)ⁿ, e^(ax+b), sin(ax+b), and cos(ax+b).",
      successCriteria: [
        "Recognise when the reverse chain rule applies (linear inner function).",
        "Integrate ∫(ax+b)ⁿ dx by increasing the power and dividing by (n+1)×a.",
        "Integrate ∫e^(ax+b) dx by dividing eˣ by the inner coefficient a.",
        "Integrate ∫sin(ax+b) dx and ∫cos(ax+b) dx by dividing by a.",
        "Check reverse-chain-rule integrals by differentiating the answer.",
        "Identify that a non-linear inner function requires Extension-level techniques.",
      ],
      teaching: {
        paragraphs: [
          "The chain rule for differentiation gives d/dx[f(ax+b)] = a·f'(ax+b). To reverse this, we integrate f'(ax+b) and divide by the inner coefficient a.",
          "For power functions: ∫(ax+b)ⁿ dx = (ax+b)ⁿ⁺¹ / [a(n+1)] + C. The denominator now has two factors: (n+1) from the power rule and a from the chain rule.",
          "For exponentials: ∫e^(ax+b) dx = e^(ax+b) / a + C. The function itself does not change; you only divide by the inner coefficient.",
          "For trigonometric functions: ∫sin(ax+b) dx = −cos(ax+b)/a + C and ∫cos(ax+b) dx = sin(ax+b)/a + C.",
          "The reverse chain rule only works cleanly when the inner function is linear (ax + b). When the inner function is quadratic or more complex, a substitution method is needed — that is an Extension topic.",
        ],
        latexBlocks: [
          "\\int (ax+b)^n\\,dx = \\frac{(ax+b)^{n+1}}{a(n+1)}+C",
          "\\int e^{ax+b}\\,dx = \\frac{e^{ax+b}}{a}+C",
          "\\int \\cos(ax+b)\\,dx = \\frac{\\sin(ax+b)}{a}+C \\qquad \\int \\sin(ax+b)\\,dx = -\\frac{\\cos(ax+b)}{a}+C",
        ],
      },
      workedExamples: rcrWorked,
      guidedPractice: rcrGuided,
      independentPractice: rcrIndep,
      commonMistakes: [
        { mistake: "Forgetting to divide by the inner coefficient a.", fix: "When using the reverse chain rule, you must divide by a in addition to dividing by (n+1). One factor for the power, one for the chain." },
        { mistake: "Applying the reverse chain rule to a non-linear inner function.", fix: "∫xe^(x²) dx requires substitution u = x². At Year 11 level, only linear inner functions (ax + b) are in scope." },
        { mistake: "Getting the sign wrong for ∫sin(ax+b) dx.", fix: "∫sin(ax+b) dx = −cos(ax+b)/a + C. The negative sign is there because d/dx(cos) = −sin." },
      ],
      masteryQuiz: rcrMastery,
    };
  }

  if (lesson.slug === "trapezoidal-rule") {
    return {
      ...base,
      description:
        "Use the trapezoidal rule to approximate definite integrals numerically and interpret the accuracy of the result.",
      learningIntention:
        "Apply the trapezoidal rule to approximate areas and understand when it over- or underestimates.",
      successCriteria: [
        "State the trapezoidal rule formula: T = (h/2)(f₀ + 2f₁ + 2f₂ + ⋯ + 2f_{n−1} + fₙ).",
        "Calculate the strip width h = (b − a)/n.",
        "Apply the rule from a table of function values.",
        "Identify whether the approximation is an overestimate or underestimate from the concavity.",
        "Explain how increasing the number of strips reduces error.",
        "Use the trapezoidal rule in modelling contexts.",
      ],
      teaching: {
        paragraphs: [
          "The trapezoidal rule approximates ∫ₐᵇ f(x) dx by dividing the interval [a, b] into n equal strips of width h = (b−a)/n, then using the area of trapezoids to estimate the total area.",
          "Each trapezoid has parallel sides at consecutive x-values. The interior values are counted twice (they are the shared edge of adjacent trapezoids), while the endpoints are counted once.",
          "The formula is T = (h/2)(f₀ + 2f₁ + 2f₂ + ⋯ + 2f_{n−1} + fₙ) where f_k = f(a + kh).",
          "When the curve is concave up (f'' > 0), each trapezoid lies above the curve, giving an overestimate. When the curve is concave down (f'' < 0), trapezoids lie below the curve, giving an underestimate. For linear curves, the approximation is exact.",
          "Increasing the number of strips n (decreasing h) always improves accuracy. The error is proportional to h², so halving h reduces error by a factor of 4.",
        ],
        latexBlocks: [
          "T = \\frac{h}{2}\\bigl(f_0+2f_1+2f_2+\\cdots+2f_{n-1}+f_n\\bigr)",
          "h = \\frac{b-a}{n}",
        ],
      },
      workedExamples: trapWorked.map(addTrapezoidalWorkedVisual),
      guidedPractice: trapGuided.map(addTrapezoidalQuestionVisual),
      independentPractice: trapIndep.map(addTrapezoidalQuestionVisual),
      commonMistakes: [
        { mistake: "Doubling all values including the endpoints.", fix: "The first and last values are NOT doubled. Only interior function values get the factor of 2." },
        { mistake: "Confusing n (number of strips) with the number of x-values.", fix: "n strips require n+1 function values: f₀, f₁, …, fₙ. The number of values is one more than the number of strips." },
        { mistake: "Forgetting the factor of h/2 outside the bracket.", fix: "The h/2 factor is always required. Omitting it gives a result that is off by a factor of h/2." },
      ],
      masteryQuiz: trapMastery.map(addTrapezoidalQuestionVisual),
    };
  }

  return null;
}
