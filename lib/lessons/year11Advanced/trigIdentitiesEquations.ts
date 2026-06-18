import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

// Returns safe numeric formatting equivalents: integer "7" → ["7.0"],
// "0" → ["0.0"]. Returns [] for fractions, pi-expressions, and symbolic
// answers, so trig answers like "pi/6", "sinx", "sin^2x", "-1/3" are
// never touched.
function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^-?\d+$/.test(t)) return [`${t}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

// Targeted feedback for every formulaAnswer question in this unit.
// Keyed by question ID so explanations stay stable if prompts change.
const TRIG_EXPLANATIONS: Record<string, string> = {
  // ── Trig equations ────────────────────────────────────────────────────────
  "y11adv-trig-eq-g1":
    "Treat the equation like any linear equation: add 1 to both sides and divide by 2. Once the trig function is isolated you can move on to exact values.",
  "y11adv-trig-eq-g2":
    "sin(π/6) = 1/2 comes from the 30-60-90 triangle and is an exact value to memorise. The reference angle is always the positive acute angle that gives the right ratio.",
  "y11adv-trig-eq-i1":
    "Sine is positive in quadrants I and II. The quadrant I solution equals the reference angle directly: x = π/6.",
  "y11adv-trig-eq-i2":
    "The quadrant II solution mirrors the reference angle across the y-axis: x = π − π/6 = 5π/6.",
  "y11adv-trig-eq-i4":
    "Subtract 1 from both sides and divide by 3 to isolate cosine. The result −1/3 is not an exact value, but the isolation step is identical regardless.",
  "y11adv-trig-eq-m1":
    "Subtract 1 and divide by 2. The negative right-hand side tells you solutions lie in quadrants III and IV, where sine is negative.",
  "y11adv-trig-eq-m2":
    "cos(π/3) = 1/2 is an exact value from the 30-60-90 triangle. The reference angle is π/3.",
  "y11adv-trig-eq-m4":
    "Cosine is positive in quadrants I and IV. The quadrant I solution equals the reference angle: x = π/3.",
  "y11adv-trig-eq-m5":
    "The quadrant IV solution uses the full period: x = 2π − π/3 = 5π/3.",
  "y11adv-trig-eq-m9":
    "tan(π/4) = 1, so π/4 is the reference angle. Tangent is negative in quadrants II and IV; the smaller solution in [0, 2π] is π − π/4 = 3π/4.",

  // ── Trig identities ───────────────────────────────────────────────────────
  "y11adv-trig-id-g1":
    "This is the Pythagorean identity. Every point on the unit circle satisfies x² + y² = 1, which translates to sin²x + cos²x = 1 for all values of x.",
  "y11adv-trig-id-g2":
    "Tangent is the ratio of the opposite side to the adjacent side, which equals sine over cosine. The quotient identity tanx = sinx/cosx is valid wherever cosx ≠ 0.",
  "y11adv-trig-id-g3":
    "Rearrange sin²x + cos²x = 1 by subtracting cos²x from both sides. The left side becomes 1 − cos²x and the right side becomes sin²x.",
  "y11adv-trig-id-i1":
    "Recognise the core Pythagorean identity directly. The sum sin²x + cos²x equals 1 for every allowed value of x — you do not need to solve for particular solutions.",
  "y11adv-trig-id-i2":
    "Replace tanx with sinx/cosx using the quotient identity, then the cosx factors cancel. Cancellation is valid wherever cosx ≠ 0, leaving sinx.",
  "y11adv-trig-id-i3":
    "Rearrange the Pythagorean identity: subtract sin²x from both sides of sin²x + cos²x = 1 to get 1 − sin²x = cos²x.",
  "y11adv-trig-id-i4":
    "The quotient identity defines tanx = sinx/cosx. Recognising this ratio in the expression lets you name it tanx directly — with the restriction cosx ≠ 0.",
  "y11adv-trig-id-m1":
    "The Pythagorean identity is a fact about the unit circle, not an equation to solve. The sum equals 1 for all allowed x, which is what makes it an identity rather than an equation.",
  "y11adv-trig-id-m2":
    "Subtract sin²x from both sides of sin²x + cos²x = 1. The right side becomes 1 − sin²x and the left side is cos²x. The identity works in either direction.",
  "y11adv-trig-id-m3":
    "Subtract cos²x from both sides of sin²x + cos²x = 1. The left side becomes 1 − cos²x and the right side is sin²x.",
  "y11adv-trig-id-m4":
    "Write tanx as sinx/cosx using the quotient identity, then multiply by cosx. The cosx in the numerator and denominator cancel wherever cosx ≠ 0, leaving sinx.",
  "y11adv-trig-id-m9":
    "This is sinx/cosx multiplied by cosx. The cosx cancels wherever cosx ≠ 0, so the expression simplifies to sinx — the same step as the tanx·cosx pattern.",

  // ── Exam practice ─────────────────────────────────────────────────────────
  "y11adv-trig-mixed-g1":
    "Subtract 1 and divide by 2 to isolate cosine. A negative value tells you solutions lie in quadrants II and III, where cosine is negative.",
  "y11adv-trig-mixed-g2":
    "cos(π/3) = 1/2, so π/3 is the reference angle. The reference angle is always the positive acute angle, regardless of the sign in the original equation.",
  "y11adv-trig-mixed-g3":
    "The Pythagorean identity is a fundamental relationship from the unit circle. The sum sin²x + cos²x is always 1 — no working is needed, just recognition.",
  "y11adv-trig-mixed-i1":
    "With reference angle π/3 and cosine negative, solutions lie in quadrants II and III. The quadrant II solution is π − π/3 = 2π/3.",
  "y11adv-trig-mixed-i2":
    "The quadrant III solution is π + π/3 = 4π/3. Both solutions fall inside the stated domain [0, 2π].",
  "y11adv-trig-mixed-i4":
    "Recognise the rearranged Pythagorean identity: sin²x + cos²x = 1 rearranges to 1 − cos²x = sin²x. Write sin²x directly.",
  "y11adv-trig-mixed-i5":
    "Replace tanx with sinx/cosx using the quotient identity, then multiply by cosx. The denominators cancel to give sinx wherever cosx ≠ 0.",
  "y11adv-trig-mixed-m1":
    "Add 1 and divide by 2 to get sinx = 1/2. A positive value places solutions in quadrants I and II, where sine is positive.",
  "y11adv-trig-mixed-m2":
    "Rearrange sin²x + cos²x = 1 by subtracting sin²x from both sides. The result is the identity 1 − sin²x = cos²x.",
  "y11adv-trig-mixed-m3":
    "The quotient identity defines tanx = sinx/cosx. Replacing tanx with this ratio is the essential first step for simplifying any expression that contains tangent.",
  "y11adv-trig-mixed-m4":
    "sin(π/6) = 1/2 gives the reference angle π/6. Sine is negative in quadrants III and IV; the quadrant III solution is π + π/6 = 7π/6.",
  "y11adv-trig-mixed-m5":
    "The quadrant IV solution is 2π − π/6 = 11π/6. This is the larger of the two solutions in [0, 2π].",
};

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
) {
  const q = baseFormulaAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]);
  const explanation =
    TRIG_EXPLANATIONS[id] ??
    `Identify the method — isolating a trig function, using an exact value, or applying an identity — then follow the steps to get ${answer}.`;
  return { ...q, explanation };
}

function exactAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  hint = "Use the related angle, exact value, or stated interval before entering the final value."
) {
  const q = baseFormulaAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]);
  return { ...q, hint, explanation };
}

function conceptChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}",
  hint = "Use the quadrant sign, identity rule, or stated interval to eliminate the distractors."
) {
  const q = practicalChoice(id, prompt, answer, choices, explanation, latex);
  return { ...q, hint };
}

function piVariants(answer: string): string[] {
  const latexPi = answer.replace(/pi/g, "\\pi");
  const unicodePi = answer.replace(/pi/g, "\u03c0");
  return Array.from(new Set([latexPi, unicodePi]));
}

function trigExpressionVariants(answer: string): string[] {
  const sign = answer.startsWith("-") ? "-" : "";
  const body = sign ? answer.slice(1) : answer;
  const match = body.match(/^(sin|cos|tan)x$/);
  if (!match) return [];
  const fn = match[1];
  return [
    `${sign}${fn}(x)`,
    `${sign}\\${fn}x`,
    `${sign}\\${fn} x`,
    `${sign}\\${fn}(x)`,
  ];
}

function solutionSetVariants(values: string[]): string[] {
  const plain = values.join(",");
  const spaced = values.join(", ");
  const latex = values.map((value) => value.replace(/pi/g, "\\pi")).join(", ");
  const unicode = values.map((value) => value.replace(/pi/g, "\u03c0")).join(", ");
  return [
    spaced,
    `{${plain}}`,
    `{${spaced}}`,
    `x=${spaced}`,
    `x = ${spaced}`,
    latex,
    `{${latex}}`,
    unicode,
    `{${unicode}}`,
  ];
}

export function year11AdvancedTrigIdentitiesEquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "trigonometric-identities-equations"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "related-angle-identities") {
    const q2Sin: import("../types").UnitCircleDiagram = {
      description: "Unit circle showing pi - theta in quadrant II with sine positive and cosine negative.",
      angleRadians: "pi - theta",
      quadrant: 2,
      referenceAngle: "theta",
      terminalPoint: { x: "-cos(theta)", y: "sin(theta)", label: "(-cos theta, sin theta)" },
      symmetryPoints: [{ x: "cos(theta)", y: "sin(theta)", label: "Q1 related point" }],
      highlightRadius: true,
      showReferenceTriangle: true,
      notes: ["Reflecting a Q1 angle across the y-axis keeps sine the same and changes the sign of cosine."],
    };
    const q3Sin: import("../types").UnitCircleDiagram = {
      description: "Unit circle showing pi + theta in quadrant III with sine and cosine both negative.",
      angleRadians: "pi + theta",
      quadrant: 3,
      referenceAngle: "theta",
      terminalPoint: { x: "-cos(theta)", y: "-sin(theta)", label: "(-cos theta, -sin theta)" },
      symmetryPoints: [{ x: "cos(theta)", y: "sin(theta)", label: "Q1 related point" }],
      highlightRadius: true,
      showReferenceTriangle: true,
      notes: ["Moving to quadrant III changes the signs of both sine and cosine, while tangent stays positive."],
    };
    const q4Sin: import("../types").UnitCircleDiagram = {
      description: "Unit circle showing 2pi - theta in quadrant IV with sine negative and cosine positive.",
      angleRadians: "2pi - theta",
      quadrant: 4,
      referenceAngle: "theta",
      terminalPoint: { x: "cos(theta)", y: "-sin(theta)", label: "(cos theta, -sin theta)" },
      symmetryPoints: [{ x: "cos(theta)", y: "sin(theta)", label: "Q1 related point" }],
      highlightRadius: true,
      showReferenceTriangle: true,
      notes: ["Reflecting a Q1 angle across the x-axis keeps cosine the same and changes the sign of sine."],
    };

    return {
      ...base,
      description:
        "Use related-angle identities for pi - theta, pi + theta, and 2pi - theta to simplify expressions and evaluate exact trigonometric values.",
      learningIntention:
        "Learn how unit-circle symmetry gives related-angle identities for sine, cosine, and tangent, then use those identities without writing free-text proofs.",
      successCriteria: [
        "Choose the correct related-angle identity in quadrant II.",
        "Choose the correct related-angle identity in quadrants III and IV.",
        "Simplify a related-angle expression to a short sine, cosine, or tangent expression.",
        "Evaluate exact trigonometric values using a related-angle identity.",
        "Use MCQ or short canonical answers instead of proof-style responses.",
      ],
      teaching: {
        paragraphs: [
          "Related-angle identities come from reflecting a first-quadrant reference angle around the unit circle.",
          "For pi - theta in quadrant II, sine stays positive, cosine changes sign, and tangent changes sign.",
          "For pi + theta in quadrant III, sine and cosine are negative, so tangent is positive.",
          "For 2pi - theta in quadrant IV, cosine stays positive, sine changes sign, and tangent changes sign.",
          "In this lesson you choose identities, simplify short expressions, and evaluate exact values. You do not need to type proof working.",
        ],
        latexBlocks: [
          "\\sin(\\pi-\\theta)=\\sin\\theta,\\quad \\cos(\\pi-\\theta)=-\\cos\\theta,\\quad \\tan(\\pi-\\theta)=-\\tan\\theta",
          "\\sin(\\pi+\\theta)=-\\sin\\theta,\\quad \\cos(\\pi+\\theta)=-\\cos\\theta,\\quad \\tan(\\pi+\\theta)=\\tan\\theta",
          "\\sin(2\\pi-\\theta)=-\\sin\\theta,\\quad \\cos(2\\pi-\\theta)=\\cos\\theta,\\quad \\tan(2\\pi-\\theta)=-\\tan\\theta",
          "\\text{Q2: sine positive};\\quad \\text{Q3: tangent positive};\\quad \\text{Q4: cosine positive}",
        ],
      },
      workedExamples: [
        {
          title: "Use a quadrant II related angle",
          questionLatex: "\\sin(\\pi-\\theta),\\quad \\cos(\\pi-\\theta)",
          unitCircleDiagram: q2Sin,
          steps: [
            { explanation: "The angle pi - theta lies in quadrant II when theta is acute.", latex: "\\pi-\\theta\\in\\text{Q2}" },
            { explanation: "Sine is positive in quadrant II, so the y-coordinate stays the same.", latex: "\\sin(\\pi-\\theta)=\\sin\\theta" },
            { explanation: "Cosine is negative in quadrant II, so the x-coordinate changes sign.", latex: "\\cos(\\pi-\\theta)=-\\cos\\theta" },
          ],
          finalAnswerLatex: "\\sin(\\pi-\\theta)=\\sin\\theta,\\quad \\cos(\\pi-\\theta)=-\\cos\\theta",
        },
        {
          title: "Simplify a quadrant III expression",
          questionLatex: "\\tan(\\pi+\\theta)",
          unitCircleDiagram: q3Sin,
          steps: [
            { explanation: "The angle pi + theta lies in quadrant III.", latex: "\\pi+\\theta\\in\\text{Q3}" },
            { explanation: "Both sine and cosine are negative in quadrant III.", latex: "\\frac{-\\sin\\theta}{-\\cos\\theta}=\\frac{\\sin\\theta}{\\cos\\theta}" },
            { explanation: "The ratio is positive tangent.", latex: "\\tan(\\pi+\\theta)=\\tan\\theta" },
          ],
          finalAnswerLatex: "\\tan\\theta",
        },
        {
          title: "Evaluate an exact related angle",
          questionLatex: "\\cos\\left(\\frac{7\\pi}{6}\\right)",
          steps: [
            { explanation: "Write 7pi/6 as pi + pi/6.", latex: "\\frac{7\\pi}{6}=\\pi+\\frac{\\pi}{6}" },
            { explanation: "Use the quadrant III cosine identity.", latex: "\\cos(\\pi+\\theta)=-\\cos\\theta" },
            { explanation: "Substitute theta = pi/6 and use cos(pi/6) = sqrt(3)/2.", latex: "\\cos\\frac{7\\pi}{6}=-\\cos\\frac{\\pi}{6}=-\\frac{\\sqrt3}{2}" },
          ],
          finalAnswerLatex: "-\\frac{\\sqrt3}{2}",
        },
      ],
      guidedPractice: [
        conceptChoice("y11adv-relang-g1", "Choose the correct related-angle identity.", "A", ["$\\sin(\\pi-\\theta)=\\sin\\theta$", "$\\sin(\\pi-\\theta)=-\\sin\\theta$", "$\\sin(\\pi-\\theta)=\\cos\\theta$", "$\\sin(\\pi-\\theta)=-\\cos\\theta$"], "In quadrant II, sine stays positive and keeps the same reference-angle value.", "\\sin(\\pi-\\theta)"),
        exactAnswer("y11adv-relang-g2", "Simplify the related-angle expression.", "\\cos(\\pi-\\theta)", "-cosx", "The angle pi - theta is in quadrant II, where cosine is negative, so cos(pi - x) = -cos x.", trigExpressionVariants("-cosx")),
        exactAnswer("y11adv-relang-g3", "Evaluate using a related-angle identity.", "\\sin\\left(\\frac{5\\pi}{6}\\right)", "1/2", "Since 5pi/6 = pi - pi/6, sin(5pi/6) = sin(pi/6) = 1/2.", ["0.5"]),
        conceptChoice("y11adv-relang-g4", "Choose the correct tangent identity.", "C", ["$\\tan(\\pi+\\theta)=-\\tan\\theta$", "$\\tan(\\pi+\\theta)=\\sin\\theta$", "$\\tan(\\pi+\\theta)=\\tan\\theta$", "$\\tan(\\pi+\\theta)=\\cos\\theta$"], "In quadrant III, sine and cosine are both negative, so their ratio tangent is positive.", "\\tan(\\pi+\\theta)"),
      ],
      independentPractice: [
        exactAnswer("y11adv-relang-i1", "Simplify the related-angle expression.", "\\sin(\\pi+\\theta)", "-sinx", "The angle pi + theta is in quadrant III, where sine is negative, so sin(pi + x) = -sin x.", trigExpressionVariants("-sinx")),
        exactAnswer("y11adv-relang-i2", "Simplify the related-angle expression.", "\\cos(2\\pi-\\theta)", "cosx", "The angle 2pi - theta is in quadrant IV, where cosine is positive, so cos(2pi - x) = cos x.", trigExpressionVariants("cosx")),
        exactAnswer("y11adv-relang-i3", "Evaluate using a related-angle identity.", "\\cos\\left(\\frac{7\\pi}{6}\\right)", "-sqrt(3)/2", "Since 7pi/6 = pi + pi/6, cos(7pi/6) = -cos(pi/6) = -sqrt(3)/2.", ["-\\sqrt{3}/2", "-√3/2"]),
        conceptChoice("y11adv-relang-i4", "Which identity has a positive right-hand side?", "D", ["$\\tan(\\pi-\\theta)=-\\tan\\theta$", "$\\sin(\\pi+\\theta)=-\\sin\\theta$", "$\\cos(\\pi+\\theta)=-\\cos\\theta$", "$\\cos(2\\pi-\\theta)=\\cos\\theta$"], "Cosine is positive in quadrant IV, so cos(2pi - theta) keeps the positive cosine value.", "\\text{Related-angle signs}"),
        exactAnswer("y11adv-relang-i5", "Evaluate using a related-angle identity.", "\\tan\\left(\\frac{3\\pi}{4}\\right)", "-1", "Since 3pi/4 = pi - pi/4, tan(3pi/4) = -tan(pi/4) = -1.", ["−1"]),
      ],
      commonMistakes: [
        { mistake: "Changing every related angle to a negative value.", fix: "Use the quadrant sign: sine is positive in Q2, tangent is positive in Q3, cosine is positive in Q4." },
        { mistake: "Treating tangent like sine in quadrant III.", fix: "Tangent is sin divided by cos, so it is positive when both sin and cos are negative." },
        { mistake: "Typing a long proof into a marked answer.", fix: "Use the selected identity or the short expression requested." },
        { mistake: "Forgetting the reference angle.", fix: "First rewrite the angle as pi - theta, pi + theta, or 2pi - theta." },
      ],
      masteryQuiz: [
        exactAnswer("y11adv-relang-m1", "Simplify the related-angle expression.", "\\tan(\\pi-\\theta)", "-tanx", "The angle pi - theta is in quadrant II. Tangent is negative there, so tan(pi - x) = -tan x.", trigExpressionVariants("-tanx")),
        exactAnswer("y11adv-relang-m2", "Simplify the related-angle expression.", "\\cos(\\pi+\\theta)", "-cosx", "The angle pi + theta is in quadrant III. Cosine is negative there, so cos(pi + x) = -cos x.", trigExpressionVariants("-cosx")),
        exactAnswer("y11adv-relang-m3", "Simplify the related-angle expression.", "\\sin(2\\pi-\\theta)", "-sinx", "The angle 2pi - theta is in quadrant IV. Sine is negative there, so sin(2pi - x) = -sin x.", trigExpressionVariants("-sinx")),
        exactAnswer("y11adv-relang-m4", "Evaluate using a related-angle identity.", "\\sin\\left(\\frac{4\\pi}{3}\\right)", "-sqrt(3)/2", "Since 4pi/3 = pi + pi/3, sin(4pi/3) = -sin(pi/3) = -sqrt(3)/2.", ["-\\sqrt{3}/2", "-√3/2"]),
        {
          ...conceptChoice("y11adv-relang-m5", "Choose the identity that matches quadrant IV symmetry.", "B", ["$\\sin(2\\pi-\\theta)=\\sin\\theta$", "$\\sin(2\\pi-\\theta)=-\\sin\\theta$", "$\\cos(2\\pi-\\theta)=-\\cos\\theta$", "$\\tan(2\\pi-\\theta)=\\tan\\theta$"], "In quadrant IV, sine is negative while cosine is positive, so sin(2pi - theta) = -sin theta.", "\\sin(2\\pi-\\theta)"),
          unitCircleDiagram: q4Sin,
        },
        conceptChoice("y11adv-relang-m6", "A student writes $\\tan(\\pi+\\theta)=-\\tan\\theta$. Identify the error.", "C", ["Tangent is undefined in quadrant III", "The reference angle should be doubled", "Tangent is positive in quadrant III", "Sine is positive in quadrant III"], "In quadrant III, sine and cosine are both negative, so tangent is positive.", "\\tan(\\pi+\\theta)"),
        exactAnswer("y11adv-relang-m7", "Evaluate using a related-angle identity.", "\\cos\\left(\\frac{5\\pi}{6}\\right)", "-sqrt(3)/2", "Since 5pi/6 = pi - pi/6, cos(5pi/6) = -cos(pi/6) = -sqrt(3)/2.", ["-\\sqrt{3}/2", "-√3/2"]),
        exactAnswer("y11adv-relang-m8", "Evaluate using a related-angle identity.", "\\tan\\left(\\frac{7\\pi}{6}\\right)", "1/sqrt(3)", "Since 7pi/6 = pi + pi/6, tan(7pi/6) = tan(pi/6) = 1/sqrt(3).", ["sqrt(3)/3", "\\sqrt{3}/3", "√3/3"]),
        conceptChoice("y11adv-relang-m9", "Choose the expression equivalent to $\\sin(\\pi+\\theta)+\\sin\\theta$.", "A", ["$0$", "$2\\sin\\theta$", "$-2\\sin\\theta$", "$\\cos\\theta$"], "Use sin(pi + theta) = -sin theta, so the two terms cancel to zero.", "\\sin(\\pi+\\theta)+\\sin\\theta"),
        exactAnswer("y11adv-relang-m10", "Simplify the related-angle expression.", "\\tan(2\\pi-\\theta)", "-tanx", "The angle 2pi - theta is in quadrant IV, where tangent is negative, so tan(2pi - x) = -tan x.", trigExpressionVariants("-tanx")),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: name the basic related-angle identity ──────────────
        { id: "y11adv-relang-p1", prompt: "Choose the correct identity.", latex: "\\sin(\\pi-\\theta)", difficulty: 1, answer: "A", choices: [{ label: "A", text: "$\\sin\\theta$" }, { label: "B", text: "$-\\sin\\theta$" }, { label: "C", text: "$\\cos\\theta$" }, { label: "D", text: "$-\\cos\\theta$" }], hint: "Sine is positive in quadrant II.", explanation: "In quadrant II sine stays positive, so $\\sin(\\pi-\\theta)=\\sin\\theta$." },
        { id: "y11adv-relang-p2", prompt: "Choose the correct identity.", latex: "\\cos(2\\pi-\\theta)", difficulty: 1, answer: "C", choices: [{ label: "A", text: "$-\\cos\\theta$" }, { label: "B", text: "$\\sin\\theta$" }, { label: "C", text: "$\\cos\\theta$" }, { label: "D", text: "$-\\sin\\theta$" }], hint: "Cosine is positive in quadrant IV.", explanation: "In quadrant IV cosine is positive, so $\\cos(2\\pi-\\theta)=\\cos\\theta$." },
        { id: "y11adv-relang-p3", prompt: "Choose the correct identity.", latex: "\\sin(\\pi+\\theta)", difficulty: 1, answer: "B", choices: [{ label: "A", text: "$\\sin\\theta$" }, { label: "B", text: "$-\\sin\\theta$" }, { label: "C", text: "$\\cos\\theta$" }, { label: "D", text: "$-\\cos\\theta$" }], hint: "Sine is negative in quadrant III.", explanation: "In quadrant III sine is negative, so $\\sin(\\pi+\\theta)=-\\sin\\theta$." },
        // ── Difficulty 2: simplify a single related-angle expression ─────────
        { id: "y11adv-relang-p4", prompt: "Simplify the related-angle expression.", latex: "\\cos(\\pi-\\theta)", difficulty: 2, answer: "-cosx", acceptedAnswers: ["-cos(x)", "-\\cos x", "−cosx"], hint: "Quadrant II: cosine is negative.", explanation: "$\\cos(\\pi-x)=-\\cos x$." },
        { id: "y11adv-relang-p5", prompt: "Simplify the related-angle expression.", latex: "\\sin(2\\pi-\\theta)", difficulty: 2, answer: "-sinx", acceptedAnswers: ["-sin(x)", "-\\sin x", "−sinx"], hint: "Quadrant IV: sine is negative.", explanation: "$\\sin(2\\pi-x)=-\\sin x$." },
        { id: "y11adv-relang-p6", prompt: "Simplify the related-angle expression.", latex: "\\cos(\\pi+\\theta)", difficulty: 2, answer: "-cosx", acceptedAnswers: ["-cos(x)", "-\\cos x", "−cosx"], hint: "Quadrant III: cosine is negative.", explanation: "$\\cos(\\pi+x)=-\\cos x$." },
        { id: "y11adv-relang-p7", prompt: "Simplify the related-angle expression.", latex: "\\tan(\\pi+\\theta)", difficulty: 2, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x"], hint: "Quadrant III: both sine and cosine are negative.", explanation: "$\\tan(\\pi+x)=\\tan x$ because the two minus signs cancel." },
        // ── Difficulty 3: simplify (mixed) + identify sign rule ──────────────
        { id: "y11adv-relang-p8", prompt: "Simplify the related-angle expression.", latex: "\\tan(\\pi-\\theta)", difficulty: 3, answer: "-tanx", acceptedAnswers: ["-tan(x)", "-\\tan x", "−tanx"], hint: "Quadrant II: tangent is negative.", explanation: "$\\tan(\\pi-x)=-\\tan x$." },
        { id: "y11adv-relang-p9", prompt: "Simplify the related-angle expression.", latex: "\\tan(2\\pi-\\theta)", difficulty: 3, answer: "-tanx", acceptedAnswers: ["-tan(x)", "-\\tan x", "−tanx"], hint: "Quadrant IV: tangent is negative.", explanation: "$\\tan(2\\pi-x)=-\\tan x$." },
        { id: "y11adv-relang-p10", prompt: "Which identity has a positive right-hand side?", latex: "\\text{Choose one}", difficulty: 3, answer: "D", choices: [{ label: "A", text: "$\\sin(\\pi+\\theta)$" }, { label: "B", text: "$\\cos(\\pi-\\theta)$" }, { label: "C", text: "$\\tan(\\pi-\\theta)$" }, { label: "D", text: "$\\cos(2\\pi-\\theta)$" }], hint: "Look for the quadrant where the function keeps its sign.", explanation: "Cosine is positive in quadrant IV, so $\\cos(2\\pi-\\theta)=+\\cos\\theta$." },
        { id: "y11adv-relang-p11", prompt: "In which quadrant is tangent positive among the related angles?", latex: "\\text{Choose one}", difficulty: 3, answer: "C", choices: [{ label: "A", text: "Quadrant II" }, { label: "B", text: "Quadrant IV" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "None" }], hint: "Tangent is positive where sine and cosine share a sign.", explanation: "In quadrant III both sine and cosine are negative, so tangent is positive." },
        // ── Difficulty 3: evaluate a basic exact value ───────────────────────
        { id: "y11adv-relang-p12", prompt: "Evaluate using a related-angle identity.", latex: "\\sin\\!\\left(\\frac{5\\pi}{6}\\right)", difficulty: 3, answer: "1/2", acceptedAnswers: ["0.5"], hint: "$5\\pi/6=\\pi-\\pi/6$.", explanation: "$\\sin(5\\pi/6)=\\sin(\\pi/6)=1/2$." },
        { id: "y11adv-relang-p13", prompt: "Evaluate using a related-angle identity.", latex: "\\cos\\!\\left(\\frac{2\\pi}{3}\\right)", difficulty: 3, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "$2\\pi/3=\\pi-\\pi/3$.", explanation: "$\\cos(2\\pi/3)=-\\cos(\\pi/3)=-1/2$." },
        // ── Difficulty 4: exact values with surds ────────────────────────────
        { id: "y11adv-relang-p14", prompt: "Evaluate using a related-angle identity.", latex: "\\cos\\!\\left(\\frac{7\\pi}{6}\\right)", difficulty: 4, answer: "-sqrt(3)/2", acceptedAnswers: ["-\\sqrt{3}/2", "-√3/2", "−sqrt(3)/2"], hint: "$7\\pi/6=\\pi+\\pi/6$.", explanation: "$\\cos(7\\pi/6)=-\\cos(\\pi/6)=-\\sqrt3/2$." },
        { id: "y11adv-relang-p15", prompt: "Evaluate using a related-angle identity.", latex: "\\sin\\!\\left(\\frac{4\\pi}{3}\\right)", difficulty: 4, answer: "-sqrt(3)/2", acceptedAnswers: ["-\\sqrt{3}/2", "-√3/2", "−sqrt(3)/2"], hint: "$4\\pi/3=\\pi+\\pi/3$.", explanation: "$\\sin(4\\pi/3)=-\\sin(\\pi/3)=-\\sqrt3/2$." },
        { id: "y11adv-relang-p16", prompt: "Evaluate using a related-angle identity.", latex: "\\cos\\!\\left(\\frac{5\\pi}{6}\\right)", difficulty: 4, answer: "-sqrt(3)/2", acceptedAnswers: ["-\\sqrt{3}/2", "-√3/2", "−sqrt(3)/2"], hint: "$5\\pi/6=\\pi-\\pi/6$.", explanation: "$\\cos(5\\pi/6)=-\\cos(\\pi/6)=-\\sqrt3/2$." },
        { id: "y11adv-relang-p17", prompt: "Evaluate using a related-angle identity.", latex: "\\tan\\!\\left(\\frac{3\\pi}{4}\\right)", difficulty: 4, answer: "-1", acceptedAnswers: ["−1"], hint: "$3\\pi/4=\\pi-\\pi/4$.", explanation: "$\\tan(3\\pi/4)=-\\tan(\\pi/4)=-1$." },
        { id: "y11adv-relang-p18", prompt: "Evaluate using a related-angle identity.", latex: "\\sin\\!\\left(\\frac{7\\pi}{6}\\right)", difficulty: 4, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "$7\\pi/6=\\pi+\\pi/6$.", explanation: "$\\sin(7\\pi/6)=-\\sin(\\pi/6)=-1/2$." },
        { id: "y11adv-relang-p19", prompt: "Evaluate using a related-angle identity.", latex: "\\tan\\!\\left(\\frac{5\\pi}{6}\\right)", difficulty: 4, answer: "-1/sqrt(3)", acceptedAnswers: ["-\\sqrt{3}/3", "-1/√3", "−1/sqrt(3)", "-sqrt(3)/3"], hint: "$5\\pi/6=\\pi-\\pi/6$.", explanation: "$\\tan(5\\pi/6)=-\\tan(\\pi/6)=-1/\\sqrt3$." },
        { id: "y11adv-relang-p20", prompt: "Spot the student error. A student writes $\\tan(\\pi+\\theta)=-\\tan\\theta$.", latex: "\\tan(\\pi+\\theta)", difficulty: 4, answer: "C", choices: [{ label: "A", text: "Tangent is undefined in quadrant III" }, { label: "B", text: "The reference angle should be doubled" }, { label: "C", text: "Tangent is positive in quadrant III, so it should be $+\\tan\\theta$" }, { label: "D", text: "Sine is positive in quadrant III" }], hint: "Check the sign of tangent in quadrant III.", explanation: "Both sine and cosine are negative in quadrant III, so tangent is positive: $\\tan(\\pi+\\theta)=\\tan\\theta$." },
        // ── Difficulty 5: combine + non-routine ──────────────────────────────
        { id: "y11adv-relang-p21", prompt: "Simplify the expression to a single number.", latex: "\\sin(\\pi+\\theta)+\\sin\\theta", difficulty: 5, answer: "0", hint: "Use $\\sin(\\pi+\\theta)=-\\sin\\theta$.", explanation: "$-\\sin\\theta+\\sin\\theta=0$." },
        { id: "y11adv-relang-p22", prompt: "Simplify the expression to a single trig function.", latex: "\\cos(\\pi-\\theta)+\\cos(\\pi+\\theta)", difficulty: 5, answer: "-2cosx", acceptedAnswers: ["-2cos(x)", "-2\\cos x", "−2cosx"], hint: "Both terms equal $-\\cos\\theta$.", explanation: "$-\\cos\\theta+(-\\cos\\theta)=-2\\cos\\theta$." },
        { id: "y11adv-relang-p23", prompt: "Evaluate the sum exactly.", latex: "\\cos\\!\\left(\\frac{5\\pi}{6}\\right)+\\cos\\!\\left(\\frac{7\\pi}{6}\\right)", difficulty: 5, answer: "-sqrt(3)", acceptedAnswers: ["-\\sqrt{3}", "-√3", "−sqrt(3)"], hint: "Each cosine equals $-\\sqrt3/2$.", explanation: "$-\\sqrt3/2+(-\\sqrt3/2)=-\\sqrt3$." },
        { id: "y11adv-relang-p24", prompt: "Simplify the quotient to a single trig function.", latex: "\\frac{\\sin(\\pi-\\theta)}{\\cos(2\\pi-\\theta)}", difficulty: 5, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x"], hint: "Numerator $=\\sin\\theta$, denominator $=\\cos\\theta$.", explanation: "$\\sin(\\pi-\\theta)=\\sin\\theta$ and $\\cos(2\\pi-\\theta)=\\cos\\theta$, so the quotient is $\\tan\\theta$." },
        { id: "y11adv-relang-p25", prompt: "Evaluate the exact value.", latex: "\\sin\\!\\left(\\frac{11\\pi}{6}\\right)", difficulty: 5, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "$11\\pi/6=2\\pi-\\pi/6$.", explanation: "$\\sin(11\\pi/6)=-\\sin(\\pi/6)=-1/2$." },
        { id: "y11adv-relang-p26", prompt: "Simplify the product to a single trig function squared.", latex: "\\tan(\\pi-\\theta)\\cdot\\tan(\\pi+\\theta)", difficulty: 5, answer: "-tan^2x", acceptedAnswers: ["-tan^2(x)", "-\\tan^2 x", "−tan^2x"], hint: "$\\tan(\\pi-\\theta)=-\\tan\\theta$ and $\\tan(\\pi+\\theta)=\\tan\\theta$.", explanation: "$(-\\tan\\theta)(\\tan\\theta)=-\\tan^2\\theta$." },
        { id: "y11adv-relang-p27", prompt: "Evaluate the exact value.", latex: "\\cos\\!\\left(\\frac{4\\pi}{3}\\right)", difficulty: 5, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "$4\\pi/3=\\pi+\\pi/3$.", explanation: "$\\cos(4\\pi/3)=-\\cos(\\pi/3)=-1/2$." },
        { id: "y11adv-relang-p28", prompt: "Simplify the expression to a single number.", latex: "\\frac{\\cos(\\pi-\\theta)}{\\cos\\theta}", difficulty: 5, answer: "-1", acceptedAnswers: ["−1"], hint: "$\\cos(\\pi-\\theta)=-\\cos\\theta$.", explanation: "$\\dfrac{-\\cos\\theta}{\\cos\\theta}=-1$." },
        { id: "y11adv-relang-p29", prompt: "Evaluate the exact value.", latex: "\\tan\\!\\left(\\frac{7\\pi}{6}\\right)", difficulty: 5, answer: "1/sqrt(3)", acceptedAnswers: ["\\sqrt{3}/3", "1/√3", "sqrt(3)/3"], hint: "$7\\pi/6=\\pi+\\pi/6$ and tangent is positive in quadrant III.", explanation: "$\\tan(7\\pi/6)=\\tan(\\pi/6)=1/\\sqrt3$." },
        { id: "y11adv-relang-p30", prompt: "Simplify the sum to a single number.", latex: "\\sin\\!\\left(\\frac{5\\pi}{6}\\right)+\\sin\\!\\left(\\frac{7\\pi}{6}\\right)", difficulty: 5, answer: "0", hint: "The two sines are exact opposites.", explanation: "$\\sin(5\\pi/6)=1/2$ and $\\sin(7\\pi/6)=-1/2$, so the sum is $0$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-relang-mp1",
          prompt: "Let $\\theta=\\dfrac{\\pi}{6}$. Use related-angle identities to evaluate each expression exactly.",
          latex: "\\theta=\\frac{\\pi}{6}",
          answer: "1/2",
          hint: "Rewrite each angle as $\\pi-\\theta$, $\\pi+\\theta$, or $2\\pi-\\theta$ before evaluating.",
          explanation: "(a) $\\sin(\\pi-\\pi/6)=\\sin(\\pi/6)=1/2$. (b) $\\cos(\\pi+\\pi/6)=-\\cos(\\pi/6)=-\\sqrt3/2$. (c) $\\cos(5\\pi/6)+\\cos(7\\pi/6)=-\\sqrt3/2+(-\\sqrt3/2)=-\\sqrt3$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Evaluate sin(5pi/6).", latex: "\\sin\\!\\left(\\frac{5\\pi}{6}\\right)", marks: 1, answer: "1/2", acceptedAnswers: ["0.5"], hint: "$5\\pi/6=\\pi-\\pi/6$.", explanation: "$\\sin(5\\pi/6)=\\sin(\\pi/6)=1/2$." },
            { key: "b", label: "(b)", prompt: "Evaluate cos(7pi/6).", latex: "\\cos\\!\\left(\\frac{7\\pi}{6}\\right)", marks: 2, answer: "-sqrt(3)/2", acceptedAnswers: ["-\\sqrt{3}/2", "-√3/2", "−sqrt(3)/2"], hint: "$7\\pi/6=\\pi+\\pi/6$.", explanation: "$\\cos(7\\pi/6)=-\\cos(\\pi/6)=-\\sqrt3/2$." },
            { key: "c", label: "(c)", prompt: "Evaluate cos(5pi/6) + cos(7pi/6).", latex: "\\cos\\!\\left(\\frac{5\\pi}{6}\\right)+\\cos\\!\\left(\\frac{7\\pi}{6}\\right)", marks: 1, answer: "-sqrt(3)", acceptedAnswers: ["-\\sqrt{3}", "-√3", "−sqrt(3)"], hint: "Both cosines equal $-\\sqrt3/2$.", explanation: "$-\\sqrt3/2+(-\\sqrt3/2)=-\\sqrt3$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "trig-equations-basic") {
    const sineHalf: import("../types").UnitCircleDiagram = {
      description: "Unit circle showing the two solutions for sin x = 1/2 in the interval from 0 to 2pi.",
      angleRadians: "pi/6 and 5pi/6",
      quadrant: 1,
      referenceAngle: "pi/6",
      terminalPoint: { x: "sqrt(3)/2", y: "1/2", label: "sin x = 1/2" },
      symmetryPoints: [{ x: "-sqrt(3)/2", y: "1/2", label: "5pi/6" }],
      notes: ["Sine is positive in quadrants I and II."],
    };
    const cosineNegative: import("../types").UnitCircleDiagram = {
      description: "Unit circle showing the two solutions for cos x = -1/2 in the interval from 0 to 2pi.",
      angleRadians: "2pi/3 and 4pi/3",
      quadrant: 2,
      referenceAngle: "pi/3",
      terminalPoint: { x: "-1/2", y: "sqrt(3)/2", label: "2pi/3" },
      symmetryPoints: [{ x: "-1/2", y: "-sqrt(3)/2", label: "4pi/3" }],
      notes: ["Cosine is negative in quadrants II and III."],
    };

    return {
      ...base,
      description:
        "Solve basic sine, cosine, and tangent equations on finite radian or degree intervals using exact special angles and quadrant signs.",
      learningIntention:
        "Learn how to solve basic trigonometric equations on a stated finite interval by finding the reference angle and selecting all valid solutions.",
      successCriteria: [
        "Solve equations of the form sin x = a, cos x = a, and tan x = a.",
        "Use exact special angles to find the reference angle.",
        "Select all solutions in 0 <= x <= 2pi or 0 degrees <= x <= 360 degrees.",
        "Use tangent's period pi when choosing tangent solutions.",
        "Use MCQ or controlled exact-value answers for solution pairs.",
      ],
      teaching: {
        paragraphs: [
          "A trigonometric equation asks for the angle values that make a statement true in the given interval.",
          "First find the reference angle using exact values such as sin(pi/6) = 1/2, cos(pi/3) = 1/2, and tan(pi/4) = 1.",
          "Then use the sign of the right-hand side to choose the quadrants. For example, sin x = 1/2 has solutions in quadrants I and II.",
          "Always check the interval. In this lesson, solution sets are finite: usually 0 <= x <= 2pi or 0 degrees <= x <= 360 degrees.",
          "Tangent repeats every pi, so its two solutions in 0 <= x <= 2pi are one pi apart.",
        ],
        latexBlocks: [
          "\\sin x=\\frac12\\quad\\Rightarrow\\quad x=\\frac{\\pi}{6},\\frac{5\\pi}{6}\\quad(0\\le x\\le2\\pi)",
          "\\cos x=-\\frac12\\quad\\Rightarrow\\quad x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}\\quad(0\\le x\\le2\\pi)",
          "\\tan x=1\\quad\\Rightarrow\\quad x=\\frac{\\pi}{4},\\frac{5\\pi}{4}\\quad(0\\le x\\le2\\pi)",
          "\\text{Degree interval: }0^\\circ\\le x\\le360^\\circ",
        ],
      },
      workedExamples: [
        {
          title: "Solve a sine equation",
          questionLatex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi",
          unitCircleDiagram: sineHalf,
          steps: [
            { explanation: "The reference angle is pi/6 because sin(pi/6) = 1/2.", latex: "\\alpha=\\frac{\\pi}{6}" },
            { explanation: "Sine is positive in quadrants I and II.", latex: "\\text{Q1 and Q2}" },
            { explanation: "Write both solutions in the interval.", latex: "x=\\frac{\\pi}{6},\\quad x=\\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}" },
          ],
          finalAnswerLatex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6}",
        },
        {
          title: "Solve a cosine equation",
          questionLatex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi",
          unitCircleDiagram: cosineNegative,
          steps: [
            { explanation: "The reference angle is pi/3 because cos(pi/3) = 1/2.", latex: "\\alpha=\\frac{\\pi}{3}" },
            { explanation: "Cosine is negative in quadrants II and III.", latex: "\\text{Q2 and Q3}" },
            { explanation: "Use pi - alpha and pi + alpha.", latex: "x=\\frac{2\\pi}{3},\\quad x=\\frac{4\\pi}{3}" },
          ],
          finalAnswerLatex: "x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}",
        },
        {
          title: "Solve a tangent equation",
          questionLatex: "\\tan x=-1,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "The reference angle is pi/4 because tan(pi/4) = 1.", latex: "\\alpha=\\frac{\\pi}{4}" },
            { explanation: "Tangent is negative in quadrants II and IV.", latex: "\\text{Q2 and Q4}" },
            { explanation: "Use pi - alpha and 2pi - alpha.", latex: "x=\\frac{3\\pi}{4},\\quad x=\\frac{7\\pi}{4}" },
          ],
          finalAnswerLatex: "x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}",
        },
      ],
      guidedPractice: [
        exactAnswer("y11adv-trigeq-basic-g1", "Find the reference angle.", "\\sin x=\\frac12", "pi/6", "The special angle with sine equal to 1/2 is pi/6, so the reference angle is pi/6.", piVariants("pi/6")),
        conceptChoice("y11adv-trigeq-basic-g2", "Choose the solution pair.", "B", ["$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$", "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$"], "Sine is positive in quadrants I and II, so the solutions are pi/6 and 5pi/6.", "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trigeq-basic-g3", "Find the smaller solution.", "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", "pi/3", "Cosine is positive in quadrants I and IV. The smaller solution is the reference angle pi/3.", piVariants("pi/3")),
        conceptChoice("y11adv-trigeq-basic-g4", "Choose the correct period for tangent equations.", "A", ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$4\\pi$"], "Tangent repeats every pi, so the next tangent solution is one pi after the first.", "\\tan x=a"),
      ],
      independentPractice: [
        exactAnswer("y11adv-trigeq-basic-i1", "Find the larger solution.", "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", "5pi/3", "Cosine is positive in quadrants I and IV, so the larger solution is 2pi - pi/3 = 5pi/3.", piVariants("5pi/3")),
        conceptChoice("y11adv-trigeq-basic-i2", "Choose the solution pair.", "C", ["$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{3\\pi}{4},\\frac{5\\pi}{4}$"], "Cosine is negative in quadrants II and III, with reference angle pi/3.", "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trigeq-basic-i3", "Find the smaller solution.", "\\tan x=-1,\\quad 0\\le x\\le2\\pi", "3pi/4", "Tangent is negative in quadrants II and IV. The smaller solution is pi - pi/4 = 3pi/4.", piVariants("3pi/4")),
        exactAnswer("y11adv-trigeq-basic-i4", "Solve in degrees. Enter the smaller solution.", "\\sin x=\\frac12,\\quad 0^\\circ\\le x\\le360^\\circ", "30", "The reference angle is 30 degrees and sine is positive in quadrants I and II, so the smaller solution is 30.", ["30 degrees", "30deg"]),
        exactAnswer("y11adv-trigeq-basic-i5", "Enter both solutions as a comma-separated set.", "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", "pi/6,5pi/6", "Sine is positive in quadrants I and II, so the solution set is pi/6 and 5pi/6.", solutionSetVariants(["pi/6", "5pi/6"])),
      ],
      commonMistakes: [
        { mistake: "Giving only the reference angle.", fix: "Use quadrant signs to find every solution in the stated interval." },
        { mistake: "Using 2pi spacing for tangent solution pairs.", fix: "Tangent repeats every pi, so the second solution is one pi later." },
        { mistake: "Ignoring degree versus radian intervals.", fix: "Match the format of the interval: radians for pi intervals, degrees for 0 to 360 degrees." },
        { mistake: "Including values outside the interval.", fix: "Check each candidate against the stated lower and upper bounds." },
      ],
      masteryQuiz: [
        exactAnswer("y11adv-trigeq-basic-m1", "Find the reference angle.", "\\cos x=-\\frac12", "pi/3", "The reference angle uses the positive exact value cos(pi/3) = 1/2, so the reference angle is pi/3.", piVariants("pi/3")),
        exactAnswer("y11adv-trigeq-basic-m2", "Find the smaller solution.", "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", "7pi/6", "Sine is negative in quadrants III and IV, so the smaller solution is pi + pi/6 = 7pi/6.", piVariants("7pi/6")),
        exactAnswer("y11adv-trigeq-basic-m3", "Find the larger solution.", "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", "11pi/6", "Sine is negative in quadrants III and IV, so the larger solution is 2pi - pi/6 = 11pi/6.", piVariants("11pi/6")),
        conceptChoice("y11adv-trigeq-basic-m4", "Choose the solution pair.", "D", ["$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$", "$x=\\frac{\\pi}{4},\\frac{3\\pi}{4}$", "$x=\\frac{3\\pi}{4},\\frac{5\\pi}{4}$", "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$"], "Tangent is negative in quadrants II and IV, so tan x = -1 gives 3pi/4 and 7pi/4.", "\\tan x=-1,\\quad 0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trigeq-basic-m5", "Find the only solution in the interval.", "\\cos x=-1,\\quad 0\\le x\\le2\\pi", "pi", "Cosine equals -1 at the leftmost point of the unit circle, which occurs at x = pi.", piVariants("pi")),
        exactAnswer("y11adv-trigeq-basic-m6", "Solve in degrees. Enter the larger solution.", "\\cos x=-\\frac12,\\quad 0^\\circ\\le x\\le360^\\circ", "240", "The reference angle is 60 degrees and cosine is negative in quadrants II and III, giving 120 and 240 degrees.", ["240 degrees", "240deg"]),
        conceptChoice("y11adv-trigeq-basic-m7", "Which option identifies the error?", "B", ["The reference angle should be 90 degrees", "There should be two sine solutions in the interval", "Sine is never positive", "The interval should be ignored"], "For sin x = 1/2 from 0 to 360 degrees, sine is positive in quadrants I and II, so there are two solutions.", "\\sin x=\\frac12,\\quad 0^\\circ\\le x\\le360^\\circ"),
        exactAnswer("y11adv-trigeq-basic-m8", "Find the smaller solution.", "\\tan x=1,\\quad 0\\le x\\le2\\pi", "pi/4", "Tangent is positive in quadrants I and III. The smaller solution is the reference angle pi/4.", piVariants("pi/4")),
        exactAnswer("y11adv-trigeq-basic-m9", "Find the larger solution.", "\\tan x=1,\\quad 0\\le x\\le2\\pi", "5pi/4", "Tangent is positive in quadrants I and III. The larger solution is pi/4 + pi = 5pi/4.", piVariants("5pi/4")),
        conceptChoice("y11adv-trigeq-basic-m10", "Choose the complete solution set.", "A", ["$x=0,\\pi,2\\pi$", "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$", "$x=0,\\pi$", "$x=\\pi,2\\pi$"], "Sine is zero on the x-axis, so in the closed interval 0 to 2pi the solutions are 0, pi, and 2pi.", "\\sin x=0,\\quad 0\\le x\\le2\\pi"),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: reference angle from an exact value ────────────────
        { id: "y11adv-trigeq-basic-p1", prompt: "Find the reference angle.", latex: "\\sin x=\\frac12", difficulty: 1, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "Which special angle has sine $1/2$?", explanation: "$\\sin(\\pi/6)=1/2$, so the reference angle is $\\pi/6$." },
        { id: "y11adv-trigeq-basic-p2", prompt: "Find the reference angle.", latex: "\\cos x=\\frac12", difficulty: 1, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Which special angle has cosine $1/2$?", explanation: "$\\cos(\\pi/3)=1/2$, so the reference angle is $\\pi/3$." },
        { id: "y11adv-trigeq-basic-p3", prompt: "Find the reference angle.", latex: "\\tan x=1", difficulty: 1, answer: "pi/4", acceptedAnswers: ["\\pi/4", "π/4"], hint: "Which special angle has tangent $1$?", explanation: "$\\tan(\\pi/4)=1$, so the reference angle is $\\pi/4$." },
        { id: "y11adv-trigeq-basic-p4", prompt: "Choose the quadrants where sine is positive.", latex: "\\sin x>0", difficulty: 1, answer: "A", choices: [{ label: "A", text: "I and II" }, { label: "B", text: "III and IV" }, { label: "C", text: "I and IV" }, { label: "D", text: "II and III" }], hint: "Sine is the $y$-coordinate.", explanation: "Sine is positive above the $x$-axis: quadrants I and II." },
        // ── Difficulty 2: smaller/larger solution ────────────────────────────
        { id: "y11adv-trigeq-basic-p5", prompt: "Find the smaller solution.", latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 2, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "Quadrant I solution equals the reference angle.", explanation: "Sine is positive in I and II; the smaller solution is $\\pi/6$." },
        { id: "y11adv-trigeq-basic-p6", prompt: "Find the larger solution.", latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 2, answer: "5pi/6", acceptedAnswers: ["5\\pi/6", "5π/6"], hint: "Quadrant II: $\\pi-\\pi/6$.", explanation: "The larger solution is $\\pi-\\pi/6=5\\pi/6$." },
        { id: "y11adv-trigeq-basic-p7", prompt: "Find the smaller solution.", latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 2, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Quadrant I solution equals the reference angle.", explanation: "Cosine is positive in I and IV; the smaller solution is $\\pi/3$." },
        { id: "y11adv-trigeq-basic-p8", prompt: "Find the larger solution.", latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 2, answer: "5pi/3", acceptedAnswers: ["5\\pi/3", "5π/3"], hint: "Quadrant IV: $2\\pi-\\pi/3$.", explanation: "The larger solution is $2\\pi-\\pi/3=5\\pi/3$." },
        // ── Difficulty 3: negative RHS + solution pairs ──────────────────────
        { id: "y11adv-trigeq-basic-p9", prompt: "Find the smaller solution.", latex: "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "7pi/6", acceptedAnswers: ["7\\pi/6", "7π/6"], hint: "Sine is negative in III and IV.", explanation: "The smaller solution is $\\pi+\\pi/6=7\\pi/6$." },
        { id: "y11adv-trigeq-basic-p10", prompt: "Find the larger solution.", latex: "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "11pi/6", acceptedAnswers: ["11\\pi/6", "11π/6"], hint: "Quadrant IV: $2\\pi-\\pi/6$.", explanation: "The larger solution is $2\\pi-\\pi/6=11\\pi/6$." },
        { id: "y11adv-trigeq-basic-p11", prompt: "Choose the solution pair.", latex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "C", choices: [{ label: "A", text: "$\\frac{\\pi}{6},\\frac{5\\pi}{6}$" }, { label: "B", text: "$\\frac{\\pi}{3},\\frac{5\\pi}{3}$" }, { label: "C", text: "$\\frac{2\\pi}{3},\\frac{4\\pi}{3}$" }, { label: "D", text: "$\\frac{3\\pi}{4},\\frac{5\\pi}{4}$" }], hint: "Cosine negative in II and III, reference angle $\\pi/3$.", explanation: "$\\pi-\\pi/3=2\\pi/3$ and $\\pi+\\pi/3=4\\pi/3$." },
        { id: "y11adv-trigeq-basic-p12", prompt: "Find the smaller solution.", latex: "\\tan x=-1,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "3pi/4", acceptedAnswers: ["3\\pi/4", "3π/4"], hint: "Tangent negative in II and IV.", explanation: "The smaller solution is $\\pi-\\pi/4=3\\pi/4$." },
        { id: "y11adv-trigeq-basic-p13", prompt: "Find the larger solution.", latex: "\\tan x=1,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "5pi/4", acceptedAnswers: ["5\\pi/4", "5π/4"], hint: "Tangent repeats every $\\pi$.", explanation: "$\\pi/4+\\pi=5\\pi/4$." },
        // ── Difficulty 3: degree intervals ───────────────────────────────────
        { id: "y11adv-trigeq-basic-p14", prompt: "Solve in degrees. Enter the smaller solution.", latex: "\\sin x=\\frac12,\\quad 0^\\circ\\le x\\le360^\\circ", difficulty: 3, answer: "30", acceptedAnswers: ["30 degrees", "30deg"], hint: "Reference angle is $30^\\circ$.", explanation: "Sine positive in I and II; the smaller solution is $30^\\circ$." },
        { id: "y11adv-trigeq-basic-p15", prompt: "Solve in degrees. Enter the larger solution.", latex: "\\cos x=-\\frac12,\\quad 0^\\circ\\le x\\le360^\\circ", difficulty: 3, answer: "240", acceptedAnswers: ["240 degrees", "240deg"], hint: "Reference angle $60^\\circ$; cosine negative in II and III.", explanation: "The two solutions are $120^\\circ$ and $240^\\circ$; the larger is $240^\\circ$." },
        // ── Difficulty 4: boundary cases + harder reference angles ───────────
        { id: "y11adv-trigeq-basic-p16", prompt: "Find the only solution in the interval.", latex: "\\cos x=-1,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "pi", acceptedAnswers: ["\\pi", "π"], hint: "Cosine is $-1$ at the leftmost point.", explanation: "$\\cos x=-1$ at $x=\\pi$." },
        { id: "y11adv-trigeq-basic-p17", prompt: "Find the only solution in the interval.", latex: "\\sin x=1,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "pi/2", acceptedAnswers: ["\\pi/2", "π/2"], hint: "Sine is $1$ at the top of the circle.", explanation: "$\\sin x=1$ at $x=\\pi/2$." },
        { id: "y11adv-trigeq-basic-p18", prompt: "Find the larger solution.", latex: "\\tan x=-1,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "7pi/4", acceptedAnswers: ["7\\pi/4", "7π/4"], hint: "Quadrant IV: $2\\pi-\\pi/4$.", explanation: "Tangent negative in II and IV; the larger solution is $2\\pi-\\pi/4=7\\pi/4$." },
        { id: "y11adv-trigeq-basic-p19", prompt: "Find the smaller solution.", latex: "\\cos x=-\\frac{\\sqrt3}{2},\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "5pi/6", acceptedAnswers: ["5\\pi/6", "5π/6"], hint: "Reference angle $\\pi/6$; cosine negative in II and III.", explanation: "$\\pi-\\pi/6=5\\pi/6$ is the smaller solution." },
        { id: "y11adv-trigeq-basic-p20", prompt: "Solve in degrees. Enter the larger solution.", latex: "\\sin x=-\\frac{\\sqrt3}{2},\\quad 0^\\circ\\le x\\le360^\\circ", difficulty: 4, answer: "300", acceptedAnswers: ["300 degrees", "300deg"], hint: "Reference angle $60^\\circ$; sine negative in III and IV.", explanation: "Solutions are $240^\\circ$ and $300^\\circ$; the larger is $300^\\circ$." },
        { id: "y11adv-trigeq-basic-p21", prompt: "How many solutions does the equation have in the interval?", latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "B", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Cosine positive in two quadrants.", explanation: "Solutions $\\pi/3$ and $5\\pi/3$ — two in total." },
        // ── Difficulty 5: count solutions / non-routine ──────────────────────
        { id: "y11adv-trigeq-basic-p22", prompt: "How many solutions does the equation have in the interval?", latex: "\\sin x=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "C", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Sine is zero on the $x$-axis; include both endpoints.", explanation: "$\\sin x=0$ at $x=0,\\pi,2\\pi$ — three solutions in the closed interval." },
        { id: "y11adv-trigeq-basic-p23", prompt: "How many solutions does the equation have in the interval?", latex: "\\tan x=1,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "B", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Tangent repeats every $\\pi$.", explanation: "$x=\\pi/4$ and $x=5\\pi/4$ — two solutions." },
        { id: "y11adv-trigeq-basic-p24", prompt: "Find the largest solution.", latex: "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "11pi/6", acceptedAnswers: ["11\\pi/6", "11π/6"], hint: "Quadrants III and IV.", explanation: "Solutions $7\\pi/6$ and $11\\pi/6$; the largest is $11\\pi/6$." },
        { id: "y11adv-trigeq-basic-p25", prompt: "Find the smaller solution.", latex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "Isolate sine first: $\\sin x=1/2$.", explanation: "After isolating, $\\sin x=1/2$, so the smaller solution is $\\pi/6$." },
        { id: "y11adv-trigeq-basic-p26", prompt: "Find the larger solution.", latex: "2\\cos x+1=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "Isolate cosine: $\\cos x=-1/2$.", explanation: "$\\cos x=-1/2$ gives $2\\pi/3$ and $4\\pi/3$; the larger is $4\\pi/3$." },
        { id: "y11adv-trigeq-basic-p27", prompt: "How many solutions does the equation have in the interval?", latex: "\\cos x=2,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "A", choices: [{ label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "2" }, { label: "D", text: "infinitely many" }], hint: "What is the range of cosine?", explanation: "Cosine never exceeds $1$, so $\\cos x=2$ has no solutions." },
        { id: "y11adv-trigeq-basic-p28", prompt: "Find the smaller solution.", latex: "\\tan x=\\sqrt3,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Reference angle $\\pi/3$; tangent positive in I and III.", explanation: "The smaller solution is $\\pi/3$." },
        { id: "y11adv-trigeq-basic-p29", prompt: "Find the larger solution.", latex: "\\tan x=\\sqrt3,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "Add $\\pi$ to the reference angle.", explanation: "$\\pi/3+\\pi=4\\pi/3$ is the larger solution." },
        { id: "y11adv-trigeq-basic-p30", prompt: "Solve in degrees. Enter the smaller solution.", latex: "2\\cos x=\\sqrt3,\\quad 0^\\circ\\le x\\le360^\\circ", difficulty: 5, answer: "30", acceptedAnswers: ["30 degrees", "30deg"], hint: "$\\cos x=\\sqrt3/2$; cosine positive in I and IV.", explanation: "$\\cos x=\\sqrt3/2$ gives $30^\\circ$ and $330^\\circ$; the smaller is $30^\\circ$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trigeq-basic-mp1",
          prompt: "Solve $2\\sin x-1=0$ for $0\\le x\\le2\\pi$.",
          latex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
          answer: "1/2",
          hint: "Isolate sine, find the reference angle, then use the quadrants where sine is positive.",
          explanation: "(a) $\\sin x=1/2$. (b) reference angle $\\pi/6$. (c) smaller solution $\\pi/6$, larger solution $5\\pi/6$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Isolate sine: sin x = ?", latex: "2\\sin x-1=0", marks: 1, answer: "1/2", acceptedAnswers: ["0.5"], hint: "Add 1, divide by 2.", explanation: "$2\\sin x=1$, so $\\sin x=1/2$." },
            { key: "b", label: "(b)", prompt: "State the reference angle.", latex: "\\sin x=\\frac12", marks: 1, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "Special-angle sine $1/2$.", explanation: "$\\sin(\\pi/6)=1/2$." },
            { key: "c", label: "(c)", prompt: "State the larger solution in the interval.", latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", marks: 2, answer: "5pi/6", acceptedAnswers: ["5\\pi/6", "5π/6"], hint: "Quadrant II: $\\pi-\\pi/6$.", explanation: "Sine is positive in I and II; the larger solution is $\\pi-\\pi/6=5\\pi/6$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "trig-equations-advanced") {
    return {
      ...base,
      description:
        "Solve exam-style trigonometric equations that need an identity, factorising, or zero-product reasoning before using exact finite-domain solutions.",
      learningIntention:
        "Learn how to recognise the algebraic move needed before solving a trigonometric equation, then list all solutions in the stated Year 11 Advanced domain.",
      successCriteria: [
        "Use Pythagorean identities to rewrite an equation before solving.",
        "Factorise simple trigonometric equations and apply the zero-product rule.",
        "Solve equations involving sin^2 x, cos^2 x, or tan x after reducing to a basic equation.",
        "Choose complete solution sets in 0 <= x <= 2pi or 0 degrees <= x <= 360 degrees.",
        "Identify common exam errors such as losing a factor or giving only one branch of solutions.",
      ],
      teaching: {
        paragraphs: [
          "Some trigonometric equations are not ready for ASTC immediately. First decide whether the equation needs an identity, factorising, or both.",
          "If an equation contains both sin^2 x and cos^2 x, try the Pythagorean identity sin^2 x + cos^2 x = 1.",
          "If an equation is a product, use the zero-product rule. For example, sin x(2sin x - 1) = 0 gives sin x = 0 or sin x = 1/2.",
          "If the equation is quadratic in one trig function, factorise it like an algebraic quadratic, then solve each trig equation.",
          "The final step is still a finite-domain check: include every solution in the stated interval and no others.",
        ],
        latexBlocks: [
          "\\sin^2x+\\cos^2x=1",
          "\\sin x(2\\sin x-1)=0\\Rightarrow \\sin x=0\\text{ or }\\sin x=\\frac12",
          "2\\cos^2x-\cos x-1=0\\Rightarrow (2\\cos x+1)(\\cos x-1)=0",
          "0\\le x\\le2\\pi",
        ],
      },
      workedExamples: [
        {
          title: "Use an identity before solving",
          questionLatex: "1-\\cos^2x=\\frac14,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "Recognise the rearranged Pythagorean identity.", latex: "1-\\cos^2x=\\sin^2x" },
            { explanation: "The equation becomes sin squared equals one quarter.", latex: "\\sin^2x=\\frac14" },
            { explanation: "So sin x can be positive or negative one half.", latex: "\\sin x=\\frac12\\text{ or }\\sin x=-\\frac12" },
            { explanation: "List all four solutions in the interval.", latex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6},\\frac{7\\pi}{6},\\frac{11\\pi}{6}" },
          ],
          finalAnswerLatex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6},\\frac{7\\pi}{6},\\frac{11\\pi}{6}",
        },
        {
          title: "Factorise a product equation",
          questionLatex: "\\sin x(2\\sin x-1)=0,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "Use the zero-product rule.", latex: "\\sin x=0\\quad\\text{or}\\quad2\\sin x-1=0" },
            { explanation: "Solve each basic trigonometric equation.", latex: "\\sin x=0\\quad\\text{or}\\quad\\sin x=\\frac12" },
            { explanation: "Collect all solutions in the interval.", latex: "x=0,\\frac{\\pi}{6},\\frac{5\\pi}{6},\\pi,2\\pi" },
          ],
          finalAnswerLatex: "x=0,\\frac{\\pi}{6},\\frac{5\\pi}{6},\\pi,2\\pi",
        },
        {
          title: "Factorise a quadratic trig equation",
          questionLatex: "2\\cos^2x-\\cos x-1=0,\\quad0\\le x\\le2\\pi",
          steps: [
            { explanation: "Treat cos x like the variable in a quadratic.", latex: "(2\\cos x+1)(\\cos x-1)=0" },
            { explanation: "Use the zero-product rule.", latex: "\\cos x=-\\frac12\\quad\\text{or}\\quad\\cos x=1" },
            { explanation: "Solve both equations in the interval.", latex: "x=\\frac{2\\pi}{3},\\frac{4\\pi}{3},0,2\\pi" },
          ],
          finalAnswerLatex: "x=0,\\frac{2\\pi}{3},\\frac{4\\pi}{3},2\\pi",
        },
      ],
      guidedPractice: [
        conceptChoice("y11adv-trigeq-adv-g1", "Choose the useful first step.", "B", ["Take the square root of both sides immediately", "Replace $1-\\cos^2x$ with $\\sin^2x$", "Divide both sides by $\\cos x$", "Use tangent period"], "The left side matches the rearranged Pythagorean identity, so the equation becomes sin squared x equals one quarter.", "1-\\cos^2x=\\frac14"),
        exactAnswer("y11adv-trigeq-adv-g2", "Factorise the trig expression.", "2\\sin^2x-\\sin x", "sinx(2sinx-1)", "Take out the common factor sin x. This gives sin x times the bracket 2sin x - 1.", ["sin x(2sin x-1)", "\\sin x(2\\sin x-1)", "sinx(2sinx - 1)"], "Look for the common trigonometric factor first."),
        conceptChoice("y11adv-trigeq-adv-g3", "Choose the complete solution set.", "C", ["$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=0,\\pi,2\\pi$", "$x=0,\\frac{\\pi}{6},\\frac{5\\pi}{6},\\pi,2\\pi$", "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$"], "The factors give sin x = 0 or sin x = 1/2, so collect both sets of solutions.", "\\sin x(2\\sin x-1)=0,\\quad0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trigeq-adv-g4", "Solve the squared equation. Enter the smaller solution.", "\\cos^2x=\\frac14,\\quad0\\le x\\le2\\pi", "pi/3", "Cos squared equals one quarter, so cos x = 1/2 or -1/2. The smallest solution is pi/3.", piVariants("pi/3")),
      ],
      independentPractice: [
        exactAnswer("y11adv-trigeq-adv-i1", "Use an identity first. Enter the smaller solution.", "1-\\cos^2x=\\frac14,\\quad0\\le x\\le2\\pi", "pi/6", "Use 1 - cos squared x = sin squared x. Then sin squared x = 1/4, so the smallest solution is pi/6.", piVariants("pi/6")),
        conceptChoice("y11adv-trigeq-adv-i2", "Choose the complete solution set.", "D", ["$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=0,2\\pi$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=0,\\frac{2\\pi}{3},\\frac{4\\pi}{3},2\\pi$"], "Factorising gives cos x = 1 or cos x = -1/2, so include 0, 2pi, 2pi/3, and 4pi/3.", "2\\cos^2x-\\cos x-1=0"),
        exactAnswer("y11adv-trigeq-adv-i3", "Find the positive trig value after factorising.", "2\\sin^2x-\\sin x=0", "1/2", "Factorise to sin x(2sin x - 1) = 0. The non-zero branch gives sin x = 1/2.", ["0.5"]),
        conceptChoice("y11adv-trigeq-adv-i4", "Choose the solution pair from the non-zero branch.", "B", ["$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$", "$x=0,\\pi$"], "The non-zero branch is sin x = 1/2, so sine is positive in quadrants I and II.", "2\\sin^2x-\\sin x=0"),
        exactAnswer("y11adv-trigeq-adv-i5", "Solve in degrees. Enter the larger solution.", "\\tan x(\\tan x-1)=0,\\quad0^\\circ\\le x\\le360^\\circ", "225", "The factors give tan x = 0 or tan x = 1. The tan x = 1 branch gives 45 and 225 degrees; the larger of those is 225.", ["225 degrees", "225deg"]),
      ],
      commonMistakes: [
        { mistake: "Taking the square root and keeping only the positive branch.", fix: "If sin^2 x = 1/4 or cos^2 x = 1/4, use both positive and negative values." },
        { mistake: "Dividing by a trig factor that could be zero.", fix: "Factorise and use the zero-product rule instead, so zero solutions are not lost." },
        { mistake: "Solving the first factor but ignoring the second.", fix: "Every factor equal to zero gives a branch of solutions." },
        { mistake: "Adding general solution notation in a finite-domain question.", fix: "List only the values in the stated interval." },
      ],
      masteryQuiz: [
        conceptChoice("y11adv-trigeq-adv-m1", "Choose the equation after using the Pythagorean identity.", "A", ["$\\sin^2x=\\frac34$", "$\\cos^2x=\\frac34$", "$\\sin x=\\frac34$", "$\\tan^2x=\\frac34$"], "Use 1 - cos squared x = sin squared x, so the equation becomes sin squared x equals three quarters.", "1-\\cos^2x=\\frac34"),
        exactAnswer("y11adv-trigeq-adv-m2", "Find the reference angle after simplifying.", "\\sin^2x=\\frac34", "pi/3", "If sin squared x is three quarters, then sin x = plus or minus sqrt(3)/2, whose reference angle is pi/3.", piVariants("pi/3")),
        conceptChoice("y11adv-trigeq-adv-m3", "Choose the complete solution set.", "C", ["$x=\\frac{\\pi}{3},\\frac{2\\pi}{3}$", "$x=\\frac{4\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{\\pi}{3},\\frac{2\\pi}{3},\\frac{4\\pi}{3},\\frac{5\\pi}{3}$", "$x=0,\\pi,2\\pi$"], "Both positive and negative sine values are allowed, so all four quadrants with reference angle pi/3 are included.", "\\sin^2x=\\frac34,\\quad0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trigeq-adv-m4", "Factorise the trig quadratic.", "\\tan^2x-\\tan x", "tanx(tanx-1)", "Take out the common factor tan x, leaving tan x - 1 in the bracket.", ["tan x(tan x-1)", "\\tan x(\\tan x-1)", "tanx(tanx - 1)"]),
        conceptChoice("y11adv-trigeq-adv-m5", "Choose the complete solution set.", "A", ["$x=0,\\frac{\\pi}{4},\\pi,\\frac{5\\pi}{4},2\\pi$", "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$", "$x=0,\\pi,2\\pi$", "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$"], "The factors give tan x = 0 and tan x = 1, so include both branches in the closed interval.", "\\tan^2x-\\tan x=0,\\quad0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trigeq-adv-m6", "Find the excluded branch from this factorisation.", "\\cos x(2\\cos x+1)=0", "-1/2", "The second factor gives 2cos x + 1 = 0, so cos x = -1/2.", ["-0.5"]),
        conceptChoice("y11adv-trigeq-adv-m7", "Which option identifies the lost-solution error?", "D", ["The domain should be written in degrees", "The reference angle is impossible", "The equation has no solutions", "Dividing by cos x loses the branch cos x = 0"], "If a factor might be zero, dividing by it can remove valid solutions. Use the zero-product rule instead.", "\\cos x(\\sin x-1)=0"),
        exactAnswer("y11adv-trigeq-adv-m8", "Solve in degrees. Enter the smallest solution.", "\\cos x(2\\cos x+1)=0,\\quad0^\\circ\\le x\\le360^\\circ", "90", "The factors give cos x = 0 or cos x = -1/2. The smallest solution is 90 degrees.", ["90 degrees", "90deg"]),
        exactAnswer("y11adv-trigeq-adv-m9", "Solve in radians. Enter the largest solution.", "\\cos x(2\\cos x+1)=0,\\quad0\\le x\\le2\\pi", "3pi/2", "The solutions are pi/2, 3pi/2, 2pi/3, and 4pi/3. The largest is 3pi/2.", piVariants("3pi/2")),
        conceptChoice("y11adv-trigeq-adv-m10", "Choose the HSC-style next step.", "B", ["Set $\\sin x+\\cos x=0$", "Expand or factor so each branch can be solved", "Use only tangent period", "Replace every trig function with 1"], "Exam equations often need an algebraic step before ASTC. Factorising or rewriting creates basic trig equations that can be solved.", "\\text{Advanced trig equation strategy}"),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: identify the first move ────────────────────────────
        { id: "y11adv-trigeq-adv-p1", prompt: "Choose the useful first step.", latex: "1-\\cos^2x=\\frac14", difficulty: 1, answer: "B", choices: [{ label: "A", text: "Take the square root immediately" }, { label: "B", text: "Replace $1-\\cos^2x$ with $\\sin^2x$" }, { label: "C", text: "Divide by $\\cos x$" }, { label: "D", text: "Use tangent period" }], hint: "Recognise a rearranged Pythagorean identity.", explanation: "$1-\\cos^2x=\\sin^2x$, so the equation becomes $\\sin^2x=1/4$." },
        { id: "y11adv-trigeq-adv-p2", prompt: "Choose the useful first step.", latex: "\\sin x(2\\sin x-1)=0", difficulty: 1, answer: "C", choices: [{ label: "A", text: "Divide both sides by $\\sin x$" }, { label: "B", text: "Square both sides" }, { label: "C", text: "Set each factor to zero" }, { label: "D", text: "Use the cosine rule" }], hint: "A product equal to zero.", explanation: "The zero-product rule gives $\\sin x=0$ or $2\\sin x-1=0$." },
        { id: "y11adv-trigeq-adv-p3", prompt: "Rewrite using the Pythagorean identity.", latex: "1-\\sin^2x", difficulty: 1, answer: "cos^2x", acceptedAnswers: ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"], hint: "$\\sin^2x+\\cos^2x=1$.", explanation: "$1-\\sin^2x=\\cos^2x$." },
        // ── Difficulty 2: factorise / find branch values ─────────────────────
        { id: "y11adv-trigeq-adv-p4", prompt: "Factorise the trig expression.", latex: "2\\sin^2x-\\sin x", difficulty: 2, answer: "sinx(2sinx-1)", acceptedAnswers: ["sin x(2sin x-1)", "\\sin x(2\\sin x-1)", "sinx(2sinx - 1)"], hint: "Take out the common factor $\\sin x$.", explanation: "$2\\sin^2x-\\sin x=\\sin x(2\\sin x-1)$." },
        { id: "y11adv-trigeq-adv-p5", prompt: "Factorise the trig expression.", latex: "\\tan^2x-\\tan x", difficulty: 2, answer: "tanx(tanx-1)", acceptedAnswers: ["tan x(tan x-1)", "\\tan x(\\tan x-1)", "tanx(tanx - 1)"], hint: "Take out the common factor $\\tan x$.", explanation: "$\\tan^2x-\\tan x=\\tan x(\\tan x-1)$." },
        { id: "y11adv-trigeq-adv-p6", prompt: "Find the positive trig value from the non-zero branch.", latex: "2\\sin^2x-\\sin x=0", difficulty: 2, answer: "1/2", acceptedAnswers: ["0.5"], hint: "Factorise, then solve $2\\sin x-1=0$.", explanation: "The non-zero branch gives $\\sin x=1/2$." },
        { id: "y11adv-trigeq-adv-p7", prompt: "Find the value of cos x from the second factor.", latex: "\\cos x(2\\cos x+1)=0", difficulty: 2, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "Solve $2\\cos x+1=0$.", explanation: "$2\\cos x+1=0$ gives $\\cos x=-1/2$." },
        // ── Difficulty 3: reduce to basic + smaller solution ─────────────────
        { id: "y11adv-trigeq-adv-p8", prompt: "Use an identity first. Enter the smaller solution.", latex: "1-\\cos^2x=\\frac14,\\quad0\\le x\\le2\\pi", difficulty: 3, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "$\\sin^2x=1/4$, so $\\sin x=\\pm1/2$.", explanation: "Smallest solution of $\\sin x=\\pm1/2$ is $\\pi/6$." },
        { id: "y11adv-trigeq-adv-p9", prompt: "Solve the squared equation. Enter the smaller solution.", latex: "\\cos^2x=\\frac14,\\quad0\\le x\\le2\\pi", difficulty: 3, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "$\\cos x=\\pm1/2$.", explanation: "Smallest solution is $\\pi/3$." },
        { id: "y11adv-trigeq-adv-p10", prompt: "Find the reference angle after simplifying.", latex: "\\sin^2x=\\frac34", difficulty: 3, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "$\\sin x=\\pm\\sqrt3/2$.", explanation: "$\\sin x=\\pm\\sqrt3/2$ has reference angle $\\pi/3$." },
        { id: "y11adv-trigeq-adv-p11", prompt: "Choose the complete solution set.", latex: "\\sin x(2\\sin x-1)=0,\\quad0\\le x\\le2\\pi", difficulty: 3, answer: "C", choices: [{ label: "A", text: "$\\frac{\\pi}{6},\\frac{5\\pi}{6}$" }, { label: "B", text: "$0,\\pi,2\\pi$" }, { label: "C", text: "$0,\\frac{\\pi}{6},\\frac{5\\pi}{6},\\pi,2\\pi$" }, { label: "D", text: "$\\frac{7\\pi}{6},\\frac{11\\pi}{6}$" }], hint: "Combine both branches $\\sin x=0$ and $\\sin x=1/2$.", explanation: "$\\sin x=0$ gives $0,\\pi,2\\pi$; $\\sin x=1/2$ gives $\\pi/6,5\\pi/6$." },
        // ── Difficulty 4: count solutions / quadratic-in-trig ────────────────
        { id: "y11adv-trigeq-adv-p12", prompt: "How many solutions does the equation have in the interval?", latex: "\\sin^2x=\\frac34,\\quad0\\le x\\le2\\pi", difficulty: 4, answer: "D", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Both $+\\sqrt3/2$ and $-\\sqrt3/2$ give two solutions each.", explanation: "Reference angle $\\pi/3$ in all four quadrants: $\\pi/3,2\\pi/3,4\\pi/3,5\\pi/3$ — four solutions." },
        { id: "y11adv-trigeq-adv-p13", prompt: "How many solutions does the equation have in the interval?", latex: "2\\cos^2x-\\cos x-1=0,\\quad0\\le x\\le2\\pi", difficulty: 4, answer: "D", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Factorise to $(2\\cos x+1)(\\cos x-1)=0$.", explanation: "$\\cos x=-1/2$ gives $2\\pi/3,4\\pi/3$; $\\cos x=1$ gives $0,2\\pi$ — four solutions in the closed interval." },
        { id: "y11adv-trigeq-adv-p14", prompt: "Find the largest solution.", latex: "\\cos x(2\\cos x+1)=0,\\quad0\\le x\\le2\\pi", difficulty: 4, answer: "3pi/2", acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "$\\cos x=0$ or $\\cos x=-1/2$.", explanation: "Solutions $\\pi/2,2\\pi/3,4\\pi/3,3\\pi/2$; the largest is $3\\pi/2$." },
        { id: "y11adv-trigeq-adv-p15", prompt: "Find the smallest solution.", latex: "2\\cos^2x-\\cos x-1=0,\\quad0\\le x\\le2\\pi", difficulty: 4, answer: "0", hint: "$\\cos x=1$ gives the smallest solution.", explanation: "$\\cos x=1$ at $x=0$, the smallest solution." },
        { id: "y11adv-trigeq-adv-p16", prompt: "Solve in degrees. Enter the larger solution.", latex: "\\tan x(\\tan x-1)=0,\\quad0^\\circ\\le x\\le360^\\circ", difficulty: 4, answer: "225", acceptedAnswers: ["225 degrees", "225deg"], hint: "$\\tan x=0$ or $\\tan x=1$.", explanation: "$\\tan x=1$ gives $45^\\circ,225^\\circ$; the larger is $225^\\circ$." },
        { id: "y11adv-trigeq-adv-p17", prompt: "Which option identifies the lost-solution error?", latex: "\\cos x(\\sin x-1)=0", difficulty: 4, answer: "D", choices: [{ label: "A", text: "The domain should be in degrees" }, { label: "B", text: "The reference angle is impossible" }, { label: "C", text: "The equation has no solutions" }, { label: "D", text: "Dividing by $\\cos x$ loses the branch $\\cos x=0$" }], hint: "Never divide by something that could be zero.", explanation: "Dividing by $\\cos x$ removes the valid solutions where $\\cos x=0$." },
        // ── Difficulty 5: combine identity + factorise + count ───────────────
        { id: "y11adv-trigeq-adv-p18", prompt: "How many solutions does the equation have in the interval?", latex: "2\\sin^2x+\\sin x-1=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "C", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Factorise to $(2\\sin x-1)(\\sin x+1)=0$.", explanation: "$\\sin x=1/2$ gives $\\pi/6,5\\pi/6$; $\\sin x=-1$ gives $3\\pi/2$ — three solutions." },
        { id: "y11adv-trigeq-adv-p19", prompt: "Find the only solution from the repeated branch.", latex: "2\\sin^2x+\\sin x-1=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "3pi/2", acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "$\\sin x=-1$ gives a single solution.", explanation: "$\\sin x=-1$ at $x=3\\pi/2$." },
        { id: "y11adv-trigeq-adv-p20", prompt: "Use an identity first. How many solutions in the interval?", latex: "2\\cos^2x+\\sin x-1=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "C", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Replace $\\cos^2x$ with $1-\\sin^2x$, then factorise.", explanation: "$2(1-\\sin^2x)+\\sin x-1=0$ gives $2\\sin^2x-\\sin x-1=0=(2\\sin x+1)(\\sin x-1)$. $\\sin x=-1/2$ gives $7\\pi/6,11\\pi/6$; $\\sin x=1$ gives $\\pi/2$ — three solutions." },
        { id: "y11adv-trigeq-adv-p21", prompt: "After using an identity, find the smaller solution of the non-trivial branch.", latex: "2\\cos^2x+\\sin x-1=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "7pi/6", acceptedAnswers: ["7\\pi/6", "7π/6"], hint: "The branch $\\sin x=-1/2$ gives two solutions.", explanation: "$\\sin x=-1/2$ gives $7\\pi/6$ and $11\\pi/6$; the smaller is $7\\pi/6$." },
        { id: "y11adv-trigeq-adv-p22", prompt: "Find the smallest solution.", latex: "\\sin x=\\sqrt3\\cos x,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Divide by $\\cos x$ to get $\\tan x=\\sqrt3$.", explanation: "$\\tan x=\\sqrt3$ gives $\\pi/3$ and $4\\pi/3$; the smallest is $\\pi/3$." },
        { id: "y11adv-trigeq-adv-p23", prompt: "Find the larger solution of $\\tan x=\\sqrt3$.", latex: "\\sin x=\\sqrt3\\cos x,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "Add $\\pi$ to the reference angle.", explanation: "$\\tan x=\\sqrt3$ gives $\\pi/3+\\pi=4\\pi/3$." },
        { id: "y11adv-trigeq-adv-p24", prompt: "How many solutions does the equation have in the interval?", latex: "\\sin 2x=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "D", choices: [{ label: "A", text: "2" }, { label: "B", text: "3" }, { label: "C", text: "4" }, { label: "D", text: "5" }], hint: "Let $u=2x$ range over $0\\le u\\le4\\pi$; $\\sin u=0$ at multiples of $\\pi$.", explanation: "$2x=0,\\pi,2\\pi,3\\pi,4\\pi$ gives $x=0,\\pi/2,\\pi,3\\pi/2,2\\pi$ — five solutions." },
        { id: "y11adv-trigeq-adv-p25", prompt: "Find the second smallest solution.", latex: "\\sin 2x=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "pi/2", acceptedAnswers: ["\\pi/2", "π/2"], hint: "$2x=\\pi$ gives $x=\\pi/2$.", explanation: "After $x=0$, the next solution is $x=\\pi/2$." },
        { id: "y11adv-trigeq-adv-p26", prompt: "Find the smaller solution of the non-zero branch.", latex: "\\tan^2x-\\tan x=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "pi/4", acceptedAnswers: ["\\pi/4", "π/4"], hint: "$\\tan x=1$ branch.", explanation: "$\\tan x=1$ gives $\\pi/4$ and $5\\pi/4$; the smaller is $\\pi/4$." },
        { id: "y11adv-trigeq-adv-p27", prompt: "Choose the complete solution set.", latex: "\\tan^2x-\\tan x=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "A", choices: [{ label: "A", text: "$0,\\frac{\\pi}{4},\\pi,\\frac{5\\pi}{4},2\\pi$" }, { label: "B", text: "$\\frac{\\pi}{4},\\frac{5\\pi}{4}$" }, { label: "C", text: "$0,\\pi,2\\pi$" }, { label: "D", text: "$\\frac{3\\pi}{4},\\frac{7\\pi}{4}$" }], hint: "Combine $\\tan x=0$ and $\\tan x=1$.", explanation: "$\\tan x=0$ gives $0,\\pi,2\\pi$; $\\tan x=1$ gives $\\pi/4,5\\pi/4$." },
        { id: "y11adv-trigeq-adv-p28", prompt: "Find the value of sin x from the repeated factor.", latex: "\\sin^2x-2\\sin x+1=0", difficulty: 5, answer: "1", hint: "This is $(\\sin x-1)^2=0$.", explanation: "$(\\sin x-1)^2=0$ gives $\\sin x=1$." },
        { id: "y11adv-trigeq-adv-p29", prompt: "Find the only solution in the interval.", latex: "\\sin^2x-2\\sin x+1=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "pi/2", acceptedAnswers: ["\\pi/2", "π/2"], hint: "$\\sin x=1$ gives a single solution.", explanation: "$\\sin x=1$ at $x=\\pi/2$." },
        { id: "y11adv-trigeq-adv-p30", prompt: "How many solutions does the equation have in the interval?", latex: "4\\cos^2x-3=0,\\quad0\\le x\\le2\\pi", difficulty: 5, answer: "D", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "$\\cos x=\\pm\\sqrt3/2$, reference angle $\\pi/6$.", explanation: "$\\cos x=\\pm\\sqrt3/2$ gives $\\pi/6,5\\pi/6,7\\pi/6,11\\pi/6$ — four solutions." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trigeq-adv-mp1",
          prompt: "Solve $2\\cos^2x-\\cos x-1=0$ for $0\\le x\\le2\\pi$.",
          latex: "2\\cos^2x-\\cos x-1=0,\\quad 0\\le x\\le2\\pi",
          answer: "-1/2",
          hint: "Treat cos x like a variable, factorise the quadratic, then solve each branch.",
          explanation: "(a) $(2\\cos x+1)(\\cos x-1)=0$ gives $\\cos x=-1/2$ or $\\cos x=1$. (b) $\\cos x=-1/2$ gives $2\\pi/3,4\\pi/3$. (c) total of 4 solutions including $0$ and $2\\pi$.",
          parts: [
            { key: "a", label: "(a)", prompt: "From the factor 2cos x + 1 = 0, find cos x.", latex: "2\\cos x+1=0", marks: 1, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "Solve for cos x.", explanation: "$\\cos x=-1/2$." },
            { key: "b", label: "(b)", prompt: "State the smaller solution from the branch cos x = -1/2.", latex: "\\cos x=-\\frac12,\\quad0\\le x\\le2\\pi", marks: 2, answer: "2pi/3", acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "Cosine negative in II and III; reference angle $\\pi/3$.", explanation: "$\\pi-\\pi/3=2\\pi/3$ is the smaller solution." },
            { key: "c", label: "(c)", prompt: "How many solutions does the full equation have in the closed interval?", latex: "2\\cos^2x-\\cos x-1=0,\\quad0\\le x\\le2\\pi", marks: 2, answer: "4", hint: "Count both branches; $\\cos x=1$ gives the endpoints.", explanation: "$\\cos x=-1/2$ gives $2\\pi/3,4\\pi/3$ and $\\cos x=1$ gives $0,2\\pi$ — four solutions." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "trig-identities-proof-strategies") {
    return {
      ...base,
      description:
        "Build marking-safe proof strategy for trigonometric identities by selecting valid first steps, simplifying one side, and recognising useful algebraic structures.",
      learningIntention:
        "Learn how identity proofs are planned: choose one side, rewrite in sine and cosine where useful, apply Pythagorean identities, and simplify carefully.",
      successCriteria: [
        "Choose the side of an identity that is easier to simplify.",
        "Convert tangent expressions into sine and cosine when that reveals cancellation.",
        "Use Pythagorean identities to replace 1 - sin^2 x or 1 - cos^2 x.",
        "Recognise common algebraic structures such as a difference of squares or common denominator.",
        "Answer proof-strategy questions with MCQ or short simplified expressions, not free-text proof paragraphs.",
      ],
      teaching: {
        paragraphs: [
          "A trigonometric identity proof usually works best when you simplify one side until it matches the other side.",
          "Start with the more complicated side. Fractions, tangent, or a difference of squares usually signal the useful side to transform.",
          "Converting tangent to sin x over cos x often reveals cancellation or a common denominator.",
          "The Pythagorean identity and its rearrangements are the main replacements: 1 - sin^2 x = cos^2 x and 1 - cos^2 x = sin^2 x.",
          "In this app, marked questions focus on proof decisions and intermediate simplified forms. Full typed proof marking is intentionally avoided.",
        ],
        latexBlocks: [
          "\\tan x=\\frac{\\sin x}{\\cos x}",
          "\\sin^2x+\\cos^2x=1",
          "1-\\sin^2x=\\cos^2x,\\quad1-\\cos^2x=\\sin^2x",
          "(1-\\sin x)(1+\\sin x)=1-\\sin^2x",
        ],
      },
      workedExamples: [
        {
          title: "Simplify the more complicated side",
          questionLatex: "\\tan x\\cos x=\\sin x",
          steps: [
            { explanation: "Start with the side containing tangent.", latex: "\\tan x\\cos x" },
            { explanation: "Rewrite tangent as sine over cosine.", latex: "\\frac{\\sin x}{\\cos x}\\cos x" },
            { explanation: "Cancel the cosine factor where it is defined.", latex: "\\sin x" },
          ],
          finalAnswerLatex: "\\tan x\\cos x=\\sin x",
        },
        {
          title: "Use a Pythagorean rearrangement",
          questionLatex: "\\frac{1-\\sin^2x}{\\cos x}=\\cos x",
          steps: [
            { explanation: "Start with the numerator because it matches a rearranged Pythagorean identity.", latex: "1-\\sin^2x=\\cos^2x" },
            { explanation: "Substitute the identity into the fraction.", latex: "\\frac{\\cos^2x}{\\cos x}" },
            { explanation: "Cancel one factor of cosine where it is defined.", latex: "\\cos x" },
          ],
          finalAnswerLatex: "\\cos x",
        },
        {
          title: "Recognise a difference of squares",
          questionLatex: "(1-\\sin x)(1+\\sin x)",
          steps: [
            { explanation: "Use the algebra pattern (a - b)(a + b) = a squared minus b squared.", latex: "(1-\\sin x)(1+\\sin x)=1-\\sin^2x" },
            { explanation: "Use the Pythagorean rearrangement.", latex: "1-\\sin^2x=\\cos^2x" },
          ],
          finalAnswerLatex: "\\cos^2x",
        },
      ],
      guidedPractice: [
        conceptChoice("y11adv-trigproof-g1", "Choose the better side to simplify first.", "B", ["The right side, because it is already a single term", "The left side, because it contains tangent", "Both sides must be expanded immediately", "Neither side can be changed"], "The side with tangent is more complicated, and rewriting tangent as sine over cosine creates cancellation.", "\\tan x\\cos x=\\sin x"),
        exactAnswer("y11adv-trigproof-g2", "Rewrite tangent in terms of sine and cosine.", "\\tan x", "sinx/cosx", "The quotient identity is tan x = sin x divided by cos x.", ["sin(x)/cos(x)", "\\sin x/\\cos x", "\\frac{\\sin x}{\\cos x}"]),
        exactAnswer("y11adv-trigproof-g3", "Simplify the expression.", "\\tan x\\cos x", "sinx", "Rewrite tangent as sin x over cos x, then cancel the cos x factor to leave sin x.", trigExpressionVariants("sinx")),
        conceptChoice("y11adv-trigproof-g4", "Choose the identity that simplifies the numerator.", "A", ["$1-\\sin^2x=\\cos^2x$", "$1+\\sin^2x=\\cos^2x$", "$\\tan x=\\cos x/\\sin x$", "$\\sin x=1-\\cos x$"], "The numerator 1 - sin squared x is a rearranged Pythagorean identity equal to cos squared x.", "\\frac{1-\\sin^2x}{\\cos x}"),
      ],
      independentPractice: [
        exactAnswer("y11adv-trigproof-i1", "Simplify the numerator.", "1-\\cos^2x", "sin^2x", "Use the rearranged Pythagorean identity 1 - cos squared x = sin squared x.", ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"]),
        exactAnswer("y11adv-trigproof-i2", "Simplify the expression.", "\\frac{1-\\cos^2x}{\\sin x}", "sinx", "Replace the numerator with sin squared x, then cancel one factor of sin x.", trigExpressionVariants("sinx")),
        conceptChoice("y11adv-trigproof-i3", "Choose the algebra pattern.", "C", ["Common denominator", "Completing the square", "Difference of squares", "Null factor law"], "The product (1 - sin x)(1 + sin x) has the form (a - b)(a + b), a difference of squares.", "(1-\\sin x)(1+\\sin x)"),
        exactAnswer("y11adv-trigproof-i4", "Simplify the expression.", "(1-\\cos x)(1+\\cos x)", "sin^2x", "The product is 1 - cos squared x, which equals sin squared x by the Pythagorean identity.", ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"]),
        conceptChoice("y11adv-trigproof-i5", "Choose the valid first rewrite.", "D", ["Replace $\\sin x$ with $\\cos x$", "Set the expression equal to zero", "Cancel the 1 terms", "Rewrite $\\tan x$ as $\\frac{\\sin x}{\\cos x}$"], "When tangent appears in an identity task, rewriting it as sine over cosine is usually the safe first move.", "\\tan x\\sin x"),
      ],
      commonMistakes: [
        { mistake: "Changing both sides at once without a target.", fix: "Start from the more complicated side and simplify until it matches the other side." },
        { mistake: "Inventing identities such as 1 + sin^2 x = cos^2 x.", fix: "Use only valid Pythagorean rearrangements." },
        { mistake: "Cancelling across addition or subtraction.", fix: "Cancel common factors only after factorising or rewriting as multiplication." },
        { mistake: "Typing a full proof into a short-answer box.", fix: "Answer the specific marked step: identity choice, simplified form, or strategy selection." },
      ],
      masteryQuiz: [
        conceptChoice("y11adv-trigproof-m1", "Choose the best first step.", "A", ["Rewrite all tangent terms using sine and cosine", "Replace sine with one", "Use tangent period", "Take a square root"], "The expression contains tangent and cotangent-style structure, so sine/cosine form is the safest first step.", "\\tan x\\cos x"),
        exactAnswer("y11adv-trigproof-m2", "Simplify the expression.", "\\frac{\\sin x}{\\cos x}\\cos x", "sinx", "The cos x factor cancels with the denominator where cos x is not zero, leaving sin x.", trigExpressionVariants("sinx")),
        exactAnswer("y11adv-trigproof-m3", "Simplify the expression.", "\\frac{\\cos^2x}{\\cos x}", "cosx", "Cancel one factor of cos x from the numerator and denominator to get cos x.", trigExpressionVariants("cosx")),
        conceptChoice("y11adv-trigproof-m4", "Choose the expression equivalent to $1-\\sin^2x$.", "C", ["$\\sin^2x$", "$\\tan x$", "$\\cos^2x$", "$1+\\cos^2x$"], "Rearrange sin squared x plus cos squared x equals one to get 1 - sin squared x equals cos squared x.", "1-\\sin^2x"),
        exactAnswer("y11adv-trigproof-m5", "Simplify the expression.", "\\frac{1-\\sin^2x}{\\cos x}", "cosx", "Replace 1 - sin squared x with cos squared x, then cancel one factor of cos x.", trigExpressionVariants("cosx")),
        conceptChoice("y11adv-trigproof-m6", "Choose the invalid proof step.", "B", ["$\\tan x=\\frac{\\sin x}{\\cos x}$", "$1+\\sin^2x=\\cos^2x$", "$1-\\cos^2x=\\sin^2x$", "$(1-\\sin x)(1+\\sin x)=1-\\sin^2x$"], "The statement 1 + sin squared x = cos squared x is not a valid Pythagorean rearrangement.", "\\text{Identity steps}"),
        exactAnswer("y11adv-trigproof-m7", "Simplify the expression.", "(1-\\sin x)(1+\\sin x)", "cos^2x", "Use difference of squares to get 1 - sin squared x, then use the Pythagorean identity to get cos squared x.", ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"]),
        conceptChoice("y11adv-trigproof-m8", "Choose the missing middle expression.", "D", ["$\\sin x$", "$\\tan x$", "$1+\\sin^2x$", "$\\frac{\\cos^2x}{\\cos x}$"], "After replacing 1 - sin squared x with cos squared x, the fraction becomes cos squared x over cos x.", "\\frac{1-\\sin^2x}{\\cos x}=\\Box=\\cos x"),
        exactAnswer("y11adv-trigproof-m9", "Simplify the expression.", "\\frac{\\sin^2x}{\\sin x}", "sinx", "Cancel one factor of sin x from sin squared x over sin x, where sin x is not zero.", trigExpressionVariants("sinx")),
        conceptChoice("y11adv-trigproof-m10", "Which strategy is most appropriate for this identity task?", "A", ["Start with the left side and use the difference of squares", "Start with the right side and use tangent period", "Substitute x = 0 only", "Differentiate both sides"], "The left side has the factor pattern (1 - cos x)(1 + cos x), so difference of squares leads to 1 - cos squared x.", "(1-\\cos x)(1+\\cos x)=\\sin^2x"),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: name the rewrite / identity ────────────────────────
        { id: "y11adv-trigproof-p1", prompt: "Rewrite tangent in terms of sine and cosine.", latex: "\\tan x", difficulty: 1, answer: "sinx/cosx", acceptedAnswers: ["sin(x)/cos(x)", "\\sin x/\\cos x", "\\frac{\\sin x}{\\cos x}"], hint: "The quotient identity.", explanation: "$\\tan x=\\dfrac{\\sin x}{\\cos x}$." },
        { id: "y11adv-trigproof-p2", prompt: "Simplify using a Pythagorean identity.", latex: "1-\\sin^2x", difficulty: 1, answer: "cos^2x", acceptedAnswers: ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"], hint: "Rearrange $\\sin^2x+\\cos^2x=1$.", explanation: "$1-\\sin^2x=\\cos^2x$." },
        { id: "y11adv-trigproof-p3", prompt: "Simplify using a Pythagorean identity.", latex: "1-\\cos^2x", difficulty: 1, answer: "sin^2x", acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"], hint: "Rearrange $\\sin^2x+\\cos^2x=1$.", explanation: "$1-\\cos^2x=\\sin^2x$." },
        // ── Difficulty 2: simplify one-step expressions ──────────────────────
        { id: "y11adv-trigproof-p4", prompt: "Simplify the expression.", latex: "\\tan x\\cos x", difficulty: 2, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Rewrite $\\tan x$, then cancel $\\cos x$.", explanation: "$\\dfrac{\\sin x}{\\cos x}\\cos x=\\sin x$." },
        { id: "y11adv-trigproof-p5", prompt: "Simplify the expression.", latex: "\\frac{\\cos^2x}{\\cos x}", difficulty: 2, answer: "cosx", acceptedAnswers: ["cos(x)", "\\cos x", "\\cos(x)"], hint: "Cancel one factor of $\\cos x$.", explanation: "$\\dfrac{\\cos^2x}{\\cos x}=\\cos x$." },
        { id: "y11adv-trigproof-p6", prompt: "Simplify the expression.", latex: "\\frac{\\sin^2x}{\\sin x}", difficulty: 2, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Cancel one factor of $\\sin x$.", explanation: "$\\dfrac{\\sin^2x}{\\sin x}=\\sin x$." },
        // ── Difficulty 3: strategy choice + difference of squares ────────────
        { id: "y11adv-trigproof-p7", prompt: "Choose the better side to simplify first.", latex: "\\tan x\\cos x=\\sin x", difficulty: 3, answer: "B", choices: [{ label: "A", text: "Right side, already one term" }, { label: "B", text: "Left side, because it contains tangent" }, { label: "C", text: "Expand both immediately" }, { label: "D", text: "Neither side can change" }], hint: "Pick the more complicated side.", explanation: "Rewriting the tangent side creates cancellation." },
        { id: "y11adv-trigproof-p8", prompt: "Choose the algebra pattern.", latex: "(1-\\sin x)(1+\\sin x)", difficulty: 3, answer: "C", choices: [{ label: "A", text: "Common denominator" }, { label: "B", text: "Completing the square" }, { label: "C", text: "Difference of squares" }, { label: "D", text: "Null factor law" }], hint: "Form $(a-b)(a+b)$.", explanation: "$(1-\\sin x)(1+\\sin x)=1-\\sin^2x$." },
        { id: "y11adv-trigproof-p9", prompt: "Simplify the expression.", latex: "(1-\\sin x)(1+\\sin x)", difficulty: 3, answer: "cos^2x", acceptedAnswers: ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"], hint: "Difference of squares, then Pythagorean identity.", explanation: "$1-\\sin^2x=\\cos^2x$." },
        { id: "y11adv-trigproof-p10", prompt: "Simplify the expression.", latex: "(1-\\cos x)(1+\\cos x)", difficulty: 3, answer: "sin^2x", acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"], hint: "Difference of squares, then Pythagorean identity.", explanation: "$1-\\cos^2x=\\sin^2x$." },
        { id: "y11adv-trigproof-p11", prompt: "Simplify the expression.", latex: "\\frac{1-\\sin^2x}{\\cos x}", difficulty: 3, answer: "cosx", acceptedAnswers: ["cos(x)", "\\cos x", "\\cos(x)"], hint: "Replace the numerator with $\\cos^2x$.", explanation: "$\\dfrac{\\cos^2x}{\\cos x}=\\cos x$." },
        // ── Difficulty 4: two-step simplifications + invalid step ────────────
        { id: "y11adv-trigproof-p12", prompt: "Simplify the expression.", latex: "\\frac{1-\\cos^2x}{\\sin x}", difficulty: 4, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Numerator $=\\sin^2x$.", explanation: "$\\dfrac{\\sin^2x}{\\sin x}=\\sin x$." },
        { id: "y11adv-trigproof-p13", prompt: "Simplify the expression.", latex: "\\frac{\\tan x}{\\sin x}", difficulty: 4, answer: "1/cosx", acceptedAnswers: ["1/cos(x)", "\\frac{1}{\\cos x}", "secx", "\\sec x"], hint: "Rewrite $\\tan x=\\sin x/\\cos x$ first.", explanation: "$\\dfrac{\\sin x/\\cos x}{\\sin x}=\\dfrac{1}{\\cos x}$." },
        { id: "y11adv-trigproof-p14", prompt: "Choose the invalid proof step.", latex: "\\text{Identity steps}", difficulty: 4, answer: "B", choices: [{ label: "A", text: "$\\tan x=\\frac{\\sin x}{\\cos x}$" }, { label: "B", text: "$1+\\sin^2x=\\cos^2x$" }, { label: "C", text: "$1-\\cos^2x=\\sin^2x$" }, { label: "D", text: "$(1-\\sin x)(1+\\sin x)=1-\\sin^2x$" }], hint: "Check the sign in the Pythagorean rearrangement.", explanation: "$1+\\sin^2x=\\cos^2x$ is false; the valid form is $1-\\sin^2x=\\cos^2x$." },
        { id: "y11adv-trigproof-p15", prompt: "Simplify the expression.", latex: "\\sin x\\cot x", difficulty: 4, answer: "cosx", acceptedAnswers: ["cos(x)", "\\cos x", "\\cos(x)"], hint: "$\\cot x=\\cos x/\\sin x$.", explanation: "$\\sin x\\cdot\\dfrac{\\cos x}{\\sin x}=\\cos x$." },
        { id: "y11adv-trigproof-p16", prompt: "Simplify the expression.", latex: "\\cos x\\tan x", difficulty: 4, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Rewrite $\\tan x$ then cancel.", explanation: "$\\cos x\\cdot\\dfrac{\\sin x}{\\cos x}=\\sin x$." },
        { id: "y11adv-trigproof-p17", prompt: "Simplify the expression to a single number.", latex: "\\sin^2x+\\cos^2x", difficulty: 4, answer: "1", hint: "Pythagorean identity.", explanation: "$\\sin^2x+\\cos^2x=1$." },
        // ── Difficulty 5: combine multiple identities (Band-6) ───────────────
        { id: "y11adv-trigproof-p18", prompt: "Simplify the expression.", latex: "\\frac{\\sin x}{1+\\cos x}+\\frac{1+\\cos x}{\\sin x}", difficulty: 5, answer: "2/sinx", acceptedAnswers: ["2/sin(x)", "\\frac{2}{\\sin x}", "2cscx", "2\\csc x"], hint: "Common denominator $\\sin x(1+\\cos x)$; numerator becomes $\\sin^2x+(1+\\cos x)^2$.", explanation: "Numerator $=\\sin^2x+1+2\\cos x+\\cos^2x=2+2\\cos x=2(1+\\cos x)$, so the expression is $\\dfrac{2}{\\sin x}$." },
        { id: "y11adv-trigproof-p19", prompt: "Simplify the expression to a single number.", latex: "(\\sin x+\\cos x)^2+(\\sin x-\\cos x)^2", difficulty: 5, answer: "2", hint: "Expand both squares and add.", explanation: "$=2\\sin^2x+2\\cos^2x=2$." },
        { id: "y11adv-trigproof-p20", prompt: "Simplify the expression to a single trig function squared.", latex: "(\\sin x+\\cos x)^2-1", difficulty: 5, answer: "sin2x", acceptedAnswers: ["sin(2x)", "\\sin 2x", "2sinxcosx", "2\\sin x\\cos x"], hint: "Expand: $\\sin^2x+2\\sin x\\cos x+\\cos^2x-1$.", explanation: "$=1+2\\sin x\\cos x-1=2\\sin x\\cos x=\\sin 2x$." },
        { id: "y11adv-trigproof-p21", prompt: "Simplify the expression.", latex: "\\frac{1-\\cos^2x}{\\sin x\\cos x}", difficulty: 5, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x", "\\tan(x)"], hint: "Numerator $=\\sin^2x$.", explanation: "$\\dfrac{\\sin^2x}{\\sin x\\cos x}=\\dfrac{\\sin x}{\\cos x}=\\tan x$." },
        { id: "y11adv-trigproof-p22", prompt: "Simplify the expression.", latex: "\\frac{\\cos^2x-\\sin^2x}{\\cos x+\\sin x}", difficulty: 5, answer: "cosx-sinx", acceptedAnswers: ["cos(x)-sin(x)", "\\cos x-\\sin x", "−sinx+cosx", "-sinx+cosx"], hint: "Numerator is a difference of squares.", explanation: "$\\dfrac{(\\cos x-\\sin x)(\\cos x+\\sin x)}{\\cos x+\\sin x}=\\cos x-\\sin x$." },
        { id: "y11adv-trigproof-p23", prompt: "Simplify the expression to a single trig function.", latex: "\\tan x+\\cot x", difficulty: 5, answer: "1/(sinxcosx)", acceptedAnswers: ["\\frac{1}{\\sin x\\cos x}", "1/sinxcosx", "secxcscx", "\\sec x\\csc x"], hint: "Common denominator $\\sin x\\cos x$.", explanation: "$\\dfrac{\\sin^2x+\\cos^2x}{\\sin x\\cos x}=\\dfrac{1}{\\sin x\\cos x}$." },
        { id: "y11adv-trigproof-p24", prompt: "Simplify the expression.", latex: "\\frac{\\sin x}{\\cos x}\\cdot\\frac{\\cos x}{1}", difficulty: 5, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Cancel $\\cos x$.", explanation: "The cosines cancel, leaving $\\sin x$." },
        { id: "y11adv-trigproof-p25", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{1-\\cos x}{\\sin x}+\\frac{\\sin x}{1-\\cos x}", difficulty: 5, answer: "2/sinx", acceptedAnswers: ["2/sin(x)", "\\frac{2}{\\sin x}", "2cscx", "2\\csc x"], hint: "Common denominator; use $1-\\cos^2x=\\sin^2x$.", explanation: "Numerator $=(1-\\cos x)^2+\\sin^2x=1-2\\cos x+\\cos^2x+\\sin^2x=2-2\\cos x=2(1-\\cos x)$, so the result is $\\dfrac{2}{\\sin x}$." },
        { id: "y11adv-trigproof-p26", prompt: "Choose the correct first step.", latex: "\\frac{1}{1-\\sin x}+\\frac{1}{1+\\sin x}", difficulty: 5, answer: "A", choices: [{ label: "A", text: "Combine over the common denominator $1-\\sin^2x$" }, { label: "B", text: "Cancel the $1$ terms" }, { label: "C", text: "Set the expression to zero" }, { label: "D", text: "Differentiate" }], hint: "$(1-\\sin x)(1+\\sin x)=1-\\sin^2x$.", explanation: "Combining gives $\\dfrac{2}{1-\\sin^2x}=\\dfrac{2}{\\cos^2x}$." },
        { id: "y11adv-trigproof-p27", prompt: "Simplify the expression.", latex: "\\frac{1}{1-\\sin x}+\\frac{1}{1+\\sin x}", difficulty: 5, answer: "2/cos^2x", acceptedAnswers: ["2/cos^2(x)", "\\frac{2}{\\cos^2x}", "2sec^2x", "2\\sec^2x"], hint: "Common denominator $1-\\sin^2x=\\cos^2x$.", explanation: "$\\dfrac{(1+\\sin x)+(1-\\sin x)}{1-\\sin^2x}=\\dfrac{2}{\\cos^2x}$." },
        { id: "y11adv-trigproof-p28", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{\\cos x}{1-\\sin x}-\\tan x", difficulty: 5, answer: "1/cosx", acceptedAnswers: ["1/cos(x)", "\\frac{1}{\\cos x}", "secx", "\\sec x"], hint: "Write $\\tan x=\\sin x/\\cos x$ and use a common denominator $\\cos x(1-\\sin x)$.", explanation: "Numerator $=\\cos^2x-\\sin x(1-\\sin x)=\\cos^2x-\\sin x+\\sin^2x=1-\\sin x$, so the result is $\\dfrac{1-\\sin x}{\\cos x(1-\\sin x)}=\\dfrac{1}{\\cos x}$." },
        { id: "y11adv-trigproof-p29", prompt: "Simplify the expression to a single number.", latex: "\\sin^4x-\\cos^4x+\\cos^2x+\\cos^2x", difficulty: 5, answer: "1", hint: "$\\sin^4x-\\cos^4x=(\\sin^2x-\\cos^2x)(\\sin^2x+\\cos^2x)=\\sin^2x-\\cos^2x$.", explanation: "$\\sin^2x-\\cos^2x+2\\cos^2x=\\sin^2x+\\cos^2x=1$." },
        { id: "y11adv-trigproof-p30", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{\\sin^3x+\\sin x\\cos^2x}{\\cos x}", difficulty: 5, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x", "\\tan(x)"], hint: "Factor $\\sin x$ from the numerator.", explanation: "Numerator $=\\sin x(\\sin^2x+\\cos^2x)=\\sin x$, so the result is $\\dfrac{\\sin x}{\\cos x}=\\tan x$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trigproof-mp1",
          prompt: "Show the steps that prove the identity $\\dfrac{1-\\cos^2x}{\\sin x}=\\sin x$ by simplifying the left side.",
          latex: "\\frac{1-\\cos^2x}{\\sin x}",
          answer: "sin^2x",
          hint: "Replace the numerator with a Pythagorean rearrangement, then cancel.",
          explanation: "(a) $1-\\cos^2x=\\sin^2x$. (b) the fraction becomes $\\sin^2x/\\sin x$. (c) cancelling gives $\\sin x$, matching the right side.",
          parts: [
            { key: "a", label: "(a)", prompt: "Simplify the numerator 1 - cos^2 x.", latex: "1-\\cos^2x", marks: 1, answer: "sin^2x", acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"], hint: "Pythagorean rearrangement.", explanation: "$1-\\cos^2x=\\sin^2x$." },
            { key: "b", label: "(b)", prompt: "Write the fraction after substituting the numerator. Enter the simplified single-term result.", latex: "\\frac{\\sin^2x}{\\sin x}", marks: 2, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Cancel one factor of $\\sin x$.", explanation: "$\\dfrac{\\sin^2x}{\\sin x}=\\sin x$." },
            { key: "c", label: "(c)", prompt: "What restriction is needed for the cancellation to be valid? Enter the value of sin x that must be excluded.", latex: "\\sin x\\ne\\Box", marks: 1, answer: "0", hint: "You cannot divide by zero.", explanation: "Cancelling $\\sin x$ requires $\\sin x\\ne0$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "trigonometric-equations") {
    return {
      ...base,
      description:
        "Solve first-degree trigonometric equations over a stated domain using exact values, reference angles, ASTC signs, and periods.",
      learningIntention:
        "Learn how to solve first-degree trigonometric equations by isolating the function, finding a reference angle, and choosing solutions in the domain.",
      successCriteria: [
        "Isolate sine, cosine, or tangent before solving.",
        "Find reference angles using exact trigonometric values.",
        "Use ASTC signs to identify correct quadrants.",
        "List all solutions in a stated radian domain.",
        "Use period $2\\pi$ for sine and cosine equations.",
        "Use period $\\pi$ for tangent equations.",
      ],
      teaching: {
        paragraphs: [
          "Trigonometric equations often have more than one solution in a stated domain.",
          "First isolate the trigonometric function. For example, $2\\sin x-1=0$ becomes $\\sin x=\\frac12$.",
          "Next find the reference angle from exact values. The reference angle gives the size of the acute angle.",
          "Use ASTC quadrant signs to decide where the solutions lie. Sine, cosine, and tangent are positive in different quadrants.",
          "Sine and cosine repeat every $2\\pi$, while tangent repeats every $\\pi$.",
          "Boundary cases such as $\\sin x=1$, $\\cos x=-1$, and $\\tan x=0$ often have solutions on axes rather than in two quadrants.",
        ],
        latexBlocks: [
          "2\\sin x-1=0\\quad \\Rightarrow\\quad \\sin x=\\frac12",
          "\\sin x>0\\quad \\text{in quadrants I and II}",
          "\\cos x<0\\quad \\text{in quadrants II and III}",
          "\\tan x>0\\quad \\text{in quadrants I and III}",
          "0\\le x\\le2\\pi",
          "\\tan(x+\\pi)=\\tan x",
        ],
      },
      workedExamples: [
        {
          title: "Solve a sine equation",
          questionLatex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "Isolate sine.", latex: "2\\sin x=1\\quad \\Rightarrow\\quad \\sin x=\\frac12" },
            { explanation: "Find the reference angle.", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12" },
            { explanation: "Sine is positive in quadrants I and II.", latex: "x=\\frac{\\pi}{6},\\quad x=\\frac{5\\pi}{6}" },
          ],
          finalAnswerLatex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6}",
        },
        {
          title: "Solve a cosine equation",
          questionLatex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "Use the reference angle for one half.", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)=\\frac12" },
            { explanation: "Cosine is negative in quadrants II and III.", latex: "x=\\pi-\\frac{\\pi}{3},\\quad x=\\pi+\\frac{\\pi}{3}" },
            { explanation: "Simplify the solutions.", latex: "x=\\frac{2\\pi}{3},\\quad x=\\frac{4\\pi}{3}" },
          ],
          finalAnswerLatex: "x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}",
        },
        {
          title: "Solve a tangent equation",
          questionLatex: "\\tan x=1,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "Use the reference angle for tangent one.", latex: "\\tan\\left(\\frac{\\pi}{4}\\right)=1" },
            { explanation: "Tangent is positive in quadrants I and III.", latex: "x=\\frac{\\pi}{4},\\quad x=\\frac{5\\pi}{4}" },
          ],
          finalAnswerLatex: "x=\\frac{\\pi}{4},\\frac{5\\pi}{4}",
        },
        {
          title: "Solve after isolating cosine",
          questionLatex: "2\\cos x+1=0,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "Isolate cosine.", latex: "2\\cos x=-1\\quad \\Rightarrow\\quad \\cos x=-\\frac12" },
            { explanation: "Cosine is negative in quadrants II and III.", latex: "x=\\frac{2\\pi}{3},\\quad x=\\frac{4\\pi}{3}" },
          ],
          finalAnswerLatex: "x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-trig-eq-g1", "Isolate the trigonometric function.", "2\\sin x-1=0\\quad \\Rightarrow\\quad \\sin x=\\Box", "1/2", ["0.5"]),
        formulaAnswer("y11adv-trig-eq-g2", "Find the reference angle.", "\\sin x=\\frac12", "pi/6", ["\\pi/6", "π/6"]),
        practicalChoice("y11adv-trig-eq-g3", "Choose the quadrants where cosine is negative.", "B", ["Quadrants I and IV", "Quadrants II and III", "Quadrants I and III", "Quadrants II and IV"], "Cosine is the x-coordinate, so it is negative on the left side of the unit circle.", "\\cos x<0"),
        practicalChoice("y11adv-trig-eq-g4", "Choose the solution pair.", "C", ["$x=\\frac{\\pi}{4},\\frac{3\\pi}{4}$", "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$", "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$", "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$"], "Tangent is positive in quadrants I and III.", "\\tan x=1,\\quad 0\\le x\\le2\\pi"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-eq-i1", "Find the smaller solution.", "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", "pi/6", ["\\pi/6", "π/6"]),
        formulaAnswer("y11adv-trig-eq-i2", "Find the larger solution.", "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", "5pi/6", ["5\\pi/6", "5π/6"]),
        practicalChoice("y11adv-trig-eq-i3", "Choose the solution pair.", "B", ["$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{3\\pi}{4},\\frac{5\\pi}{4}$"], "Cosine is negative in quadrants II and III.", "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi"),
        formulaAnswer("y11adv-trig-eq-i4", "Isolate the trigonometric function.", "3\\cos x+1=0\\quad \\Rightarrow\\quad \\cos x=\\Box", "-1/3"),
        practicalChoice("y11adv-trig-eq-i5", "Choose the correct period for tangent equations.", "A", ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$4\\pi$"], "The tangent pattern repeats every pi.", "\\tan x=k"),
      ],
      commonMistakes: [
        { mistake: "Giving only one solution when two are in the domain.", fix: "Use ASTC and check all quadrants in the stated domain." },
        { mistake: "Ignoring the domain.", fix: "Only include solutions inside the interval shown in the question." },
        { mistake: "Using the wrong period for tangent.", fix: "Tangent repeats every $\\pi$, not every $2\\pi$." },
        { mistake: "Skipping the isolation step.", fix: "Solve algebraically for the trig function first, then use exact values and quadrants." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-trig-eq-m1", "Isolate the trigonometric function.", "2\\sin x+1=0\\quad \\Rightarrow\\quad \\sin x=\\Box", "-1/2", ["-0.5"]),
        formulaAnswer("y11adv-trig-eq-m2", "Find the reference angle.", "\\cos x=\\frac12", "pi/3", ["\\pi/3", "π/3"]),
        practicalChoice("y11adv-trig-eq-m3", "Choose the quadrants where sine is negative.", "C", ["Quadrants I and II", "Quadrants II and III", "Quadrants III and IV", "Quadrants I and IV"], "Sine is the y-coordinate, so it is negative below the x-axis.", "\\sin x<0"),
        formulaAnswer("y11adv-trig-eq-m4", "Find the smaller solution.", "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", "pi/3", ["\\pi/3", "π/3"]),
        formulaAnswer("y11adv-trig-eq-m5", "Find the larger solution.", "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", "5pi/3", ["5\\pi/3", "5π/3"]),
        practicalChoice("y11adv-trig-eq-m6", "Choose the solution pair.", "A", ["$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$"], "Sine is negative in quadrants III and IV.", "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi"),
        practicalChoice("y11adv-trig-eq-m7", "Which option identifies the common error?", "D", ["Tangent has no solutions", "The reference angle should be zero", "The domain should be ignored", "The second tangent solution is one period later"], "Tangent repeats every pi, so a second solution appears one pi after the first.", "\\tan x=1,\\quad 0\\le x\\le2\\pi"),
        practicalChoice("y11adv-trig-eq-m8", "Which boundary solution is correct?", "B", ["$x=0$", "$x=\\pi$", "$x=\\frac{\\pi}{2}$", "$x=2\\pi$"], "Cosine equals negative one at a half turn.", "\\cos x=-1,\\quad 0\\le x\\le2\\pi"),
        formulaAnswer("y11adv-trig-eq-m9", "Find the smaller solution.", "\\tan x=-1,\\quad 0\\le x\\le2\\pi", "3pi/4", ["3\\pi/4", "3π/4"]),
        practicalChoice("y11adv-trig-eq-m10", "Choose the solution pair after isolating cosine.", "C", ["$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{3\\pi}{4},\\frac{5\\pi}{4}$"], "First solve cos x = -1/2, then use quadrants II and III.", "2\\cos x+1=0,\\quad 0\\le x\\le2\\pi"),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: isolate / reference angle / sign ───────────────────
        { id: "y11adv-trig-eq-p1", prompt: "Isolate the trigonometric function. Enter the right-hand side.", latex: "2\\sin x-1=0\\;\\Rightarrow\\;\\sin x=\\Box", difficulty: 1, answer: "1/2", acceptedAnswers: ["0.5"], hint: "Add 1, divide by 2.", explanation: "$2\\sin x=1$, so $\\sin x=1/2$." },
        { id: "y11adv-trig-eq-p2", prompt: "Find the reference angle.", latex: "\\sin x=\\frac12", difficulty: 1, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "Special angle sine $1/2$.", explanation: "$\\sin(\\pi/6)=1/2$." },
        { id: "y11adv-trig-eq-p3", prompt: "Choose the quadrants where cosine is negative.", latex: "\\cos x<0", difficulty: 1, answer: "B", choices: [{ label: "A", text: "I and IV" }, { label: "B", text: "II and III" }, { label: "C", text: "I and III" }, { label: "D", text: "II and IV" }], hint: "Cosine is the $x$-coordinate.", explanation: "Cosine is negative on the left of the circle: II and III." },
        { id: "y11adv-trig-eq-p4", prompt: "Choose the period of tangent.", latex: "\\tan x=k", difficulty: 1, answer: "A", choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$4\\pi$" }], hint: "Tangent repeats faster than sine.", explanation: "Tangent has period $\\pi$." },
        // ── Difficulty 2: isolate harder / smaller solution ──────────────────
        { id: "y11adv-trig-eq-p5", prompt: "Isolate the trigonometric function. Enter the right-hand side.", latex: "2\\cos x+1=0\\;\\Rightarrow\\;\\cos x=\\Box", difficulty: 2, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "Subtract 1, divide by 2.", explanation: "$\\cos x=-1/2$." },
        { id: "y11adv-trig-eq-p6", prompt: "Isolate the trigonometric function. Enter the right-hand side.", latex: "3\\cos x+1=0\\;\\Rightarrow\\;\\cos x=\\Box", difficulty: 2, answer: "-1/3", acceptedAnswers: ["−1/3"], hint: "Subtract 1, divide by 3.", explanation: "$\\cos x=-1/3$." },
        { id: "y11adv-trig-eq-p7", prompt: "Find the smaller solution.", latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 2, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "Quadrant I.", explanation: "Smaller solution is $\\pi/6$." },
        { id: "y11adv-trig-eq-p8", prompt: "Find the larger solution.", latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 2, answer: "5pi/6", acceptedAnswers: ["5\\pi/6", "5π/6"], hint: "Quadrant II: $\\pi-\\pi/6$.", explanation: "Larger solution is $5\\pi/6$." },
        // ── Difficulty 3: solution pairs / negative RHS ──────────────────────
        { id: "y11adv-trig-eq-p9", prompt: "Choose the solution pair.", latex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "B", choices: [{ label: "A", text: "$\\frac{\\pi}{3},\\frac{5\\pi}{3}$" }, { label: "B", text: "$\\frac{2\\pi}{3},\\frac{4\\pi}{3}$" }, { label: "C", text: "$\\frac{\\pi}{6},\\frac{5\\pi}{6}$" }, { label: "D", text: "$\\frac{3\\pi}{4},\\frac{5\\pi}{4}$" }], hint: "Cosine negative in II and III.", explanation: "$2\\pi/3$ and $4\\pi/3$." },
        { id: "y11adv-trig-eq-p10", prompt: "Find the smaller solution.", latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Quadrant I.", explanation: "Smaller solution is $\\pi/3$." },
        { id: "y11adv-trig-eq-p11", prompt: "Find the larger solution.", latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "5pi/3", acceptedAnswers: ["5\\pi/3", "5π/3"], hint: "Quadrant IV: $2\\pi-\\pi/3$.", explanation: "Larger solution is $5\\pi/3$." },
        { id: "y11adv-trig-eq-p12", prompt: "Find the smaller solution.", latex: "\\tan x=-1,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "3pi/4", acceptedAnswers: ["3\\pi/4", "3π/4"], hint: "Tangent negative in II and IV.", explanation: "$\\pi-\\pi/4=3\\pi/4$." },
        { id: "y11adv-trig-eq-p13", prompt: "Choose the quadrants where sine is negative.", latex: "\\sin x<0", difficulty: 3, answer: "C", choices: [{ label: "A", text: "I and II" }, { label: "B", text: "II and III" }, { label: "C", text: "III and IV" }, { label: "D", text: "I and IV" }], hint: "Sine is the $y$-coordinate.", explanation: "Sine is negative below the $x$-axis: III and IV." },
        // ── Difficulty 4: boundary cases + isolate-then-solve ────────────────
        { id: "y11adv-trig-eq-p14", prompt: "Find the only solution in the interval.", latex: "\\cos x=-1,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "pi", acceptedAnswers: ["\\pi", "π"], hint: "Leftmost point of the circle.", explanation: "$\\cos x=-1$ at $x=\\pi$." },
        { id: "y11adv-trig-eq-p15", prompt: "Find the only solution in the interval.", latex: "\\sin x=1,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "pi/2", acceptedAnswers: ["\\pi/2", "π/2"], hint: "Top of the circle.", explanation: "$\\sin x=1$ at $x=\\pi/2$." },
        { id: "y11adv-trig-eq-p16", prompt: "Find the smaller solution after isolating cosine.", latex: "2\\cos x+1=0,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "2pi/3", acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "$\\cos x=-1/2$.", explanation: "Smaller solution is $2\\pi/3$." },
        { id: "y11adv-trig-eq-p17", prompt: "Find the larger solution.", latex: "\\tan x=1,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "5pi/4", acceptedAnswers: ["5\\pi/4", "5π/4"], hint: "Add $\\pi$ to the reference angle.", explanation: "$\\pi/4+\\pi=5\\pi/4$." },
        { id: "y11adv-trig-eq-p18", prompt: "How many solutions does the equation have in the interval?", latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "B", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Sine positive in two quadrants.", explanation: "$\\pi/6$ and $5\\pi/6$ — two solutions." },
        { id: "y11adv-trig-eq-p19", prompt: "Which option identifies the common tangent error?", latex: "\\tan x=1,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "D", choices: [{ label: "A", text: "Tangent has no solutions" }, { label: "B", text: "The reference angle is zero" }, { label: "C", text: "The domain should be ignored" }, { label: "D", text: "The second solution is one period $\\pi$ later" }], hint: "Tangent repeats every $\\pi$.", explanation: "A second solution appears one $\\pi$ after the first." },
        // ── Difficulty 5: isolate then count / non-routine ───────────────────
        { id: "y11adv-trig-eq-p20", prompt: "Find the smaller solution.", latex: "2\\sin x+\\sqrt3=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "$\\sin x=-\\sqrt3/2$; sine negative in III and IV.", explanation: "$\\sin x=-\\sqrt3/2$ gives $4\\pi/3$ and $5\\pi/3$; the smaller is $4\\pi/3$." },
        { id: "y11adv-trig-eq-p21", prompt: "Find the larger solution.", latex: "2\\sin x+\\sqrt3=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "5pi/3", acceptedAnswers: ["5\\pi/3", "5π/3"], hint: "$\\sin x=-\\sqrt3/2$.", explanation: "The larger solution is $5\\pi/3$." },
        { id: "y11adv-trig-eq-p22", prompt: "Find the smaller solution.", latex: "\\sqrt2\\cos x-1=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/4", acceptedAnswers: ["\\pi/4", "π/4"], hint: "$\\cos x=1/\\sqrt2$; cosine positive in I and IV.", explanation: "$\\cos x=1/\\sqrt2$ gives $\\pi/4$ and $7\\pi/4$; the smaller is $\\pi/4$." },
        { id: "y11adv-trig-eq-p23", prompt: "Find the larger solution.", latex: "\\sqrt2\\cos x-1=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "7pi/4", acceptedAnswers: ["7\\pi/4", "7π/4"], hint: "Quadrant IV: $2\\pi-\\pi/4$.", explanation: "The larger solution is $7\\pi/4$." },
        { id: "y11adv-trig-eq-p24", prompt: "How many solutions does the equation have in the interval?", latex: "\\tan x=\\sqrt3,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "B", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Tangent repeats every $\\pi$.", explanation: "$x=\\pi/3$ and $x=4\\pi/3$ — two solutions." },
        { id: "y11adv-trig-eq-p25", prompt: "Find the largest solution.", latex: "\\tan x=\\sqrt3,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "Add $\\pi$ to $\\pi/3$.", explanation: "$\\pi/3+\\pi=4\\pi/3$." },
        { id: "y11adv-trig-eq-p26", prompt: "How many solutions does the equation have in the interval?", latex: "\\sin x=2,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "A", choices: [{ label: "A", text: "0" }, { label: "B", text: "1" }, { label: "C", text: "2" }, { label: "D", text: "infinitely many" }], hint: "Range of sine is $[-1,1]$.", explanation: "$\\sin x$ never reaches $2$, so there are no solutions." },
        { id: "y11adv-trig-eq-p27", prompt: "Find the smaller solution.", latex: "3\\tan x-\\sqrt3=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "$\\tan x=\\sqrt3/3=1/\\sqrt3$.", explanation: "$\\tan x=1/\\sqrt3$ gives $\\pi/6$ and $7\\pi/6$; the smaller is $\\pi/6$." },
        { id: "y11adv-trig-eq-p28", prompt: "Find the larger solution.", latex: "3\\tan x-\\sqrt3=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "7pi/6", acceptedAnswers: ["7\\pi/6", "7π/6"], hint: "Tangent positive in I and III.", explanation: "$\\pi/6+\\pi=7\\pi/6$." },
        { id: "y11adv-trig-eq-p29", prompt: "Find the only solution in the interval.", latex: "\\tan x=0,\\quad 0<x<2\\pi", difficulty: 5, answer: "pi", acceptedAnswers: ["\\pi", "π"], hint: "Tangent is zero where sine is zero, excluding the endpoints.", explanation: "$\\tan x=0$ at $x=0,\\pi,2\\pi$; in the open interval only $x=\\pi$ qualifies." },
        { id: "y11adv-trig-eq-p30", prompt: "Find the smaller solution after isolating sine.", latex: "4\\sin x-2=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "$\\sin x=1/2$.", explanation: "$\\sin x=1/2$ gives $\\pi/6$ and $5\\pi/6$; the smaller is $\\pi/6$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trig-eq-mp1",
          prompt: "Solve $2\\cos x+1=0$ for $0\\le x\\le2\\pi$.",
          latex: "2\\cos x+1=0,\\quad 0\\le x\\le2\\pi",
          answer: "-1/2",
          hint: "Isolate cosine, find the reference angle, then use the quadrants where cosine is negative.",
          explanation: "(a) $\\cos x=-1/2$. (b) reference angle $\\pi/3$. (c) the two solutions are $2\\pi/3$ and $4\\pi/3$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Isolate cosine: cos x = ?", latex: "2\\cos x+1=0", marks: 1, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "Subtract 1, divide by 2.", explanation: "$\\cos x=-1/2$." },
            { key: "b", label: "(b)", prompt: "State the reference angle.", latex: "\\cos x=-\\frac12", marks: 1, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Cosine $1/2$ at which special angle?", explanation: "$\\cos(\\pi/3)=1/2$, so the reference angle is $\\pi/3$." },
            { key: "c", label: "(c)", prompt: "State the larger solution in the interval.", latex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", marks: 2, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "Quadrant III: $\\pi+\\pi/3$.", explanation: "Cosine negative in II and III; the larger solution is $\\pi+\\pi/3=4\\pi/3$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "trigonometric-identities") {
    return {
      ...base,
      description:
        "Use the Pythagorean and quotient trigonometric identities to simplify expressions and choose valid rewriting steps.",
      learningIntention:
        "Learn how core trigonometric identities simplify expressions and how identities differ from equations.",
      successCriteria: [
        "Recognise that an identity is true for all allowed values.",
        "Use $\\sin^2x+\\cos^2x=1$ directly.",
        "Use rearrangements of the Pythagorean identity.",
        "Use $\\tan x=\\frac{\\sin x}{\\cos x}$ where $\\cos x\\ne0$.",
        "Simplify expressions using the quotient identity.",
        "Choose useful first steps without writing long proofs.",
      ],
      teaching: {
        paragraphs: [
          "A trigonometric identity is true for all allowed values of the variable. A trigonometric equation usually has particular solutions.",
          "The key Pythagorean identity is $\\sin^2x+\\cos^2x=1$.",
          "Rearranging this identity gives $1-\\sin^2x=\\cos^2x$ and $1-\\cos^2x=\\sin^2x$.",
          "The quotient identity is $\\tan x=\\frac{\\sin x}{\\cos x}$, where $\\cos x\\ne0$.",
          "Simplifying identities usually means rewriting expressions in terms of sine and cosine, or replacing expressions using the Pythagorean identity.",
          "This lesson does not require typed proof working. Focus on choosing valid identities and giving short simplified expressions.",
        ],
        latexBlocks: [
          "\\sin^2x+\\cos^2x=1",
          "1-\\sin^2x=\\cos^2x",
          "1-\\cos^2x=\\sin^2x",
          "\\tan x=\\frac{\\sin x}{\\cos x},\\quad \\cos x\\ne0",
          "\\text{identity: true for all allowed }x\\quad \\text{equation: solve for particular }x",
        ],
      },
      workedExamples: [
        {
          title: "Use the Pythagorean identity directly",
          questionLatex: "\\sin^2x+\\cos^2x",
          steps: [
            { explanation: "Recognise the core identity.", latex: "\\sin^2x+\\cos^2x=1" },
          ],
          finalAnswerLatex: "1",
        },
        {
          title: "Simplify using the quotient identity",
          questionLatex: "\\tan x\\cdot\\cos x",
          steps: [
            { explanation: "Rewrite tangent as sine over cosine.", latex: "\\tan x\\cdot\\cos x=\\frac{\\sin x}{\\cos x}\\cdot\\cos x" },
            { explanation: "Cancel the cosine factor where it is allowed.", latex: "\\frac{\\sin x}{\\cos x}\\cdot\\cos x=\\sin x" },
          ],
          finalAnswerLatex: "\\sin x",
        },
        {
          title: "Use a rearranged Pythagorean identity",
          questionLatex: "1-\\cos^2x",
          steps: [
            { explanation: "Start with the Pythagorean identity.", latex: "\\sin^2x+\\cos^2x=1" },
            { explanation: "Rearrange to isolate one minus cosine squared.", latex: "1-\\cos^2x=\\sin^2x" },
          ],
          finalAnswerLatex: "\\sin^2x",
        },
        {
          title: "Choose the best first step",
          questionLatex: "\\tan x\\sin x",
          steps: [
            { explanation: "The expression contains tangent, so use the quotient identity first.", latex: "\\tan x=\\frac{\\sin x}{\\cos x}" },
            { explanation: "Then multiply by sine.", latex: "\\tan x\\sin x=\\frac{\\sin^2x}{\\cos x}" },
          ],
          finalAnswerLatex: "\\frac{\\sin^2x}{\\cos x}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-trig-id-g1", "Complete the identity.", "\\sin^2x+\\cos^2x=\\Box", "1"),
        formulaAnswer("y11adv-trig-id-g2", "Rewrite tangent in terms of sine and cosine.", "\\tan x=\\Box", "sinx/cosx", ["sin(x)/cos(x)", "\\sin x/\\cos x", "\\frac{\\sin x}{\\cos x}"]),
        formulaAnswer("y11adv-trig-id-g3", "Simplify the expression.", "1-\\cos^2x", "sin^2x", ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"]),
        practicalChoice("y11adv-trig-id-g4", "Choose the useful first identity.", "B", ["$\\sin^2x+\\cos^2x=1$", "$\\tan x=\\frac{\\sin x}{\\cos x}$", "$\\sin x=\\cos x$", "$\\cos x=1$"], "The expression contains tangent, so rewrite tangent first.", "\\tan x\\cos x"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-id-i1", "Simplify the expression.", "\\sin^2x+\\cos^2x", "1"),
        formulaAnswer("y11adv-trig-id-i2", "Simplify the expression.", "\\tan x\\cos x", "sinx", ["sin(x)", "\\sin x"]),
        formulaAnswer("y11adv-trig-id-i3", "Simplify the expression.", "1-\\sin^2x", "cos^2x", ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"]),
        formulaAnswer("y11adv-trig-id-i4", "Simplify the expression where it is defined.", "\\frac{\\sin x}{\\cos x}", "tanx", ["tan(x)", "\\tan x"]),
        practicalChoice("y11adv-trig-id-i5", "Which statement correctly distinguishes the two types?", "A", ["An identity is true for all allowed values; an equation has particular solutions", "An identity has only one solution", "An equation is always true for every value", "An identity cannot contain trigonometric functions"], "Identities are general relationships; equations are solved for particular values.", "\\text{Identity versus equation}"),
      ],
      commonMistakes: [
        { mistake: "Treating $\\sin^2x+\\cos^2x$ as 2.", fix: "The Pythagorean identity says the sum is 1." },
        { mistake: "Using identities as if they are single-solution equations.", fix: "An identity is true for all allowed values, not just selected solutions." },
        { mistake: "Forgetting the restriction in the tangent identity.", fix: "The quotient identity requires $\\cos x\\ne0$." },
        { mistake: "Cancelling trigonometric expressions without rewriting first.", fix: "Rewrite tangent in terms of sine and cosine, then cancel common factors only." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-trig-id-m1", "Complete the identity.", "\\sin^2x+\\cos^2x=\\Box", "1"),
        formulaAnswer("y11adv-trig-id-m2", "Simplify the expression.", "1-\\sin^2x", "cos^2x", ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"]),
        formulaAnswer("y11adv-trig-id-m3", "Simplify the expression.", "1-\\cos^2x", "sin^2x", ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"]),
        formulaAnswer("y11adv-trig-id-m4", "Simplify the expression.", "\\tan x\\cos x", "sinx", ["sin(x)", "\\sin x"]),
        practicalChoice("y11adv-trig-id-m5", "Choose the equivalent expression.", "D", ["$\\sin^2x$", "$1+\\sin^2x$", "$\\sin^2x-1$", "$1-\\sin^2x$"], "Rearrange the Pythagorean identity.", "\\cos^2x"),
        practicalChoice("y11adv-trig-id-m6", "Choose the best first step.", "A", ["Rewrite $\\tan x$ as $\\frac{\\sin x}{\\cos x}$", "Replace $\\tan x$ with 1", "Replace $\\sin x$ with $\\cos x$", "Set the expression equal to zero"], "The expression contains tangent, so use the quotient identity first.", "\\tan x\\sin x"),
        practicalChoice("y11adv-trig-id-m7", "Which statement identifies the restriction?", "C", ["Sine must be zero", "Cosine must be one", "Cosine must not be zero", "Tangent must be negative"], "Tangent is sine over cosine, so the denominator cannot be zero.", "\\tan x=\\frac{\\sin x}{\\cos x}"),
        practicalChoice("y11adv-trig-id-m8", "Which expression is not a valid identity from this lesson?", "B", ["$1-\\cos^2x=\\sin^2x$", "$1+\\sin^2x=\\cos^2x$", "$\\sin^2x+\\cos^2x=1$", "$\\tan x=\\frac{\\sin x}{\\cos x}$"], "The sign in the rearranged Pythagorean identity matters.", "\\text{Core identities}"),
        formulaAnswer("y11adv-trig-id-m9", "Simplify the expression where it is defined.", "\\frac{\\sin x}{\\cos x}\\cos x", "sinx", ["sin(x)", "\\sin x"]),
        practicalChoice("y11adv-trig-id-m10", "Choose the best simplification.", "A", ["$1$", "$\\tan x$", "$\\sin x$", "$\\cos x$"], "The sine-squared terms cancel.", "\\sin^2x+1-\\sin^2x"),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: core identities ────────────────────────────────────
        { id: "y11adv-trig-id-p1", prompt: "Complete the identity. Enter the right-hand side.", latex: "\\sin^2x+\\cos^2x=\\Box", difficulty: 1, answer: "1", hint: "The Pythagorean identity.", explanation: "$\\sin^2x+\\cos^2x=1$." },
        { id: "y11adv-trig-id-p2", prompt: "Simplify the expression.", latex: "1-\\sin^2x", difficulty: 1, answer: "cos^2x", acceptedAnswers: ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"], hint: "Rearrange the Pythagorean identity.", explanation: "$1-\\sin^2x=\\cos^2x$." },
        { id: "y11adv-trig-id-p3", prompt: "Simplify the expression.", latex: "1-\\cos^2x", difficulty: 1, answer: "sin^2x", acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"], hint: "Rearrange the Pythagorean identity.", explanation: "$1-\\cos^2x=\\sin^2x$." },
        { id: "y11adv-trig-id-p4", prompt: "Rewrite tangent in terms of sine and cosine.", latex: "\\tan x", difficulty: 1, answer: "sinx/cosx", acceptedAnswers: ["sin(x)/cos(x)", "\\sin x/\\cos x", "\\frac{\\sin x}{\\cos x}"], hint: "Quotient identity.", explanation: "$\\tan x=\\dfrac{\\sin x}{\\cos x}$." },
        // ── Difficulty 2: simplify single-step ───────────────────────────────
        { id: "y11adv-trig-id-p5", prompt: "Simplify the expression.", latex: "\\tan x\\cos x", difficulty: 2, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Rewrite $\\tan x$, then cancel.", explanation: "$\\dfrac{\\sin x}{\\cos x}\\cos x=\\sin x$." },
        { id: "y11adv-trig-id-p6", prompt: "Simplify the expression where it is defined.", latex: "\\frac{\\sin x}{\\cos x}\\cos x", difficulty: 2, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Cancel $\\cos x$.", explanation: "The cosines cancel, leaving $\\sin x$." },
        { id: "y11adv-trig-id-p7", prompt: "Simplify the expression to a single number.", latex: "\\sin^2x+1-\\sin^2x", difficulty: 2, answer: "1", hint: "The sine-squared terms cancel.", explanation: "$\\sin^2x-\\sin^2x+1=1$." },
        { id: "y11adv-trig-id-p8", prompt: "Choose the equivalent expression.", latex: "\\cos^2x", difficulty: 2, answer: "D", choices: [{ label: "A", text: "$\\sin^2x$" }, { label: "B", text: "$1+\\sin^2x$" }, { label: "C", text: "$\\sin^2x-1$" }, { label: "D", text: "$1-\\sin^2x$" }], hint: "Rearrange the Pythagorean identity.", explanation: "$\\cos^2x=1-\\sin^2x$." },
        // ── Difficulty 3: strategy + restriction ─────────────────────────────
        { id: "y11adv-trig-id-p9", prompt: "Choose the best first step.", latex: "\\tan x\\sin x", difficulty: 3, answer: "A", choices: [{ label: "A", text: "Rewrite $\\tan x$ as $\\frac{\\sin x}{\\cos x}$" }, { label: "B", text: "Replace $\\tan x$ with $1$" }, { label: "C", text: "Replace $\\sin x$ with $\\cos x$" }, { label: "D", text: "Set the expression to zero" }], hint: "Tangent appears, so use the quotient identity.", explanation: "Rewriting $\\tan x$ as $\\sin x/\\cos x$ is the safe first move." },
        { id: "y11adv-trig-id-p10", prompt: "Which statement gives the restriction on the quotient identity?", latex: "\\tan x=\\frac{\\sin x}{\\cos x}", difficulty: 3, answer: "C", choices: [{ label: "A", text: "Sine must be zero" }, { label: "B", text: "Cosine must be one" }, { label: "C", text: "Cosine must not be zero" }, { label: "D", text: "Tangent must be negative" }], hint: "Denominator cannot be zero.", explanation: "Since $\\tan x=\\sin x/\\cos x$, we need $\\cos x\\ne0$." },
        { id: "y11adv-trig-id-p11", prompt: "Which expression is NOT a valid identity?", latex: "\\text{Core identities}", difficulty: 3, answer: "B", choices: [{ label: "A", text: "$1-\\cos^2x=\\sin^2x$" }, { label: "B", text: "$1+\\sin^2x=\\cos^2x$" }, { label: "C", text: "$\\sin^2x+\\cos^2x=1$" }, { label: "D", text: "$\\tan x=\\frac{\\sin x}{\\cos x}$" }], hint: "Check the sign of the rearrangement.", explanation: "$1+\\sin^2x=\\cos^2x$ is false." },
        { id: "y11adv-trig-id-p12", prompt: "Simplify the expression.", latex: "\\cos x\\tan x", difficulty: 3, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Rewrite $\\tan x$ and cancel.", explanation: "$\\cos x\\cdot\\dfrac{\\sin x}{\\cos x}=\\sin x$." },
        // ── Difficulty 4: two-step simplifications ───────────────────────────
        { id: "y11adv-trig-id-p13", prompt: "Simplify the expression.", latex: "\\frac{1-\\sin^2x}{\\cos x}", difficulty: 4, answer: "cosx", acceptedAnswers: ["cos(x)", "\\cos x", "\\cos(x)"], hint: "Numerator $=\\cos^2x$.", explanation: "$\\dfrac{\\cos^2x}{\\cos x}=\\cos x$." },
        { id: "y11adv-trig-id-p14", prompt: "Simplify the expression.", latex: "\\frac{1-\\cos^2x}{\\sin x}", difficulty: 4, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Numerator $=\\sin^2x$.", explanation: "$\\dfrac{\\sin^2x}{\\sin x}=\\sin x$." },
        { id: "y11adv-trig-id-p15", prompt: "Simplify the expression to a single number.", latex: "\\cos^2x+\\sin^2x+\\cos^2x-\\cos^2x", difficulty: 4, answer: "1", hint: "Combine using the Pythagorean identity.", explanation: "$\\cos^2x+\\sin^2x=1$ and the extra terms cancel." },
        { id: "y11adv-trig-id-p16", prompt: "Simplify the expression.", latex: "(1-\\sin x)(1+\\sin x)", difficulty: 4, answer: "cos^2x", acceptedAnswers: ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"], hint: "Difference of squares, then Pythagorean identity.", explanation: "$1-\\sin^2x=\\cos^2x$." },
        { id: "y11adv-trig-id-p17", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{\\sin x}{\\tan x}", difficulty: 4, answer: "cosx", acceptedAnswers: ["cos(x)", "\\cos x", "\\cos(x)"], hint: "$\\tan x=\\sin x/\\cos x$.", explanation: "$\\dfrac{\\sin x}{\\sin x/\\cos x}=\\cos x$." },
        // ── Difficulty 5: combine identities (Band-6) ────────────────────────
        { id: "y11adv-trig-id-p18", prompt: "Simplify the expression to a single trig function.", latex: "\\tan x\\cos x+\\frac{\\cos^2x}{\\cos x}", difficulty: 5, answer: "sinx+cosx", acceptedAnswers: ["sin(x)+cos(x)", "\\sin x+\\cos x", "cosx+sinx"], hint: "Each term simplifies separately.", explanation: "$\\tan x\\cos x=\\sin x$ and $\\dfrac{\\cos^2x}{\\cos x}=\\cos x$, so the sum is $\\sin x+\\cos x$." },
        { id: "y11adv-trig-id-p19", prompt: "Simplify the expression to a single number.", latex: "(\\sin x+\\cos x)^2-2\\sin x\\cos x", difficulty: 5, answer: "1", hint: "Expand the square.", explanation: "$\\sin^2x+2\\sin x\\cos x+\\cos^2x-2\\sin x\\cos x=\\sin^2x+\\cos^2x=1$." },
        { id: "y11adv-trig-id-p20", prompt: "Simplify the expression.", latex: "\\frac{\\sin^2x}{1-\\cos x}", difficulty: 5, answer: "1+cosx", acceptedAnswers: ["1+cos(x)", "1+\\cos x", "cosx+1"], hint: "$\\sin^2x=1-\\cos^2x=(1-\\cos x)(1+\\cos x)$.", explanation: "$\\dfrac{(1-\\cos x)(1+\\cos x)}{1-\\cos x}=1+\\cos x$." },
        { id: "y11adv-trig-id-p21", prompt: "Simplify the expression.", latex: "\\frac{\\cos^2x}{1-\\sin x}", difficulty: 5, answer: "1+sinx", acceptedAnswers: ["1+sin(x)", "1+\\sin x", "sinx+1"], hint: "$\\cos^2x=(1-\\sin x)(1+\\sin x)$.", explanation: "$\\dfrac{(1-\\sin x)(1+\\sin x)}{1-\\sin x}=1+\\sin x$." },
        { id: "y11adv-trig-id-p22", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{1-\\cos^2x}{\\sin x\\cos x}", difficulty: 5, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x", "\\tan(x)"], hint: "Numerator $=\\sin^2x$.", explanation: "$\\dfrac{\\sin^2x}{\\sin x\\cos x}=\\tan x$." },
        { id: "y11adv-trig-id-p23", prompt: "Simplify the expression to a single number.", latex: "\\sin^2x\\cos^2x+\\cos^4x+\\sin^2x", difficulty: 5, answer: "1", hint: "Factor $\\cos^2x$ from the first two terms.", explanation: "$\\cos^2x(\\sin^2x+\\cos^2x)+\\sin^2x=\\cos^2x+\\sin^2x=1$." },
        { id: "y11adv-trig-id-p24", prompt: "Choose the simplest form.", latex: "\\frac{\\tan x}{\\sin x}", difficulty: 5, answer: "A", choices: [{ label: "A", text: "$\\frac{1}{\\cos x}$" }, { label: "B", text: "$\\cos x$" }, { label: "C", text: "$\\sin x$" }, { label: "D", text: "$1$" }], hint: "$\\tan x=\\sin x/\\cos x$.", explanation: "$\\dfrac{\\sin x/\\cos x}{\\sin x}=\\dfrac{1}{\\cos x}$." },
        { id: "y11adv-trig-id-p25", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{\\sin x\\cos x}{1-\\sin^2x}", difficulty: 5, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x", "\\tan(x)"], hint: "Denominator $=\\cos^2x$.", explanation: "$\\dfrac{\\sin x\\cos x}{\\cos^2x}=\\dfrac{\\sin x}{\\cos x}=\\tan x$." },
        { id: "y11adv-trig-id-p26", prompt: "Simplify the expression to a single number.", latex: "\\frac{\\sin^2x}{\\cos^2x}\\cos^2x+\\cos^2x", difficulty: 5, answer: "1", hint: "First term simplifies to $\\sin^2x$.", explanation: "$\\sin^2x+\\cos^2x=1$." },
        { id: "y11adv-trig-id-p27", prompt: "Simplify the expression.", latex: "(1+\\tan^2x)\\cos^2x", difficulty: 5, answer: "1", hint: "$1+\\tan^2x=\\dfrac{1}{\\cos^2x}$ (from dividing the Pythagorean identity by $\\cos^2x$).", explanation: "$\\dfrac{1}{\\cos^2x}\\cdot\\cos^2x=1$." },
        { id: "y11adv-trig-id-p28", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{\\cos^2x-\\sin^2x}{\\cos x-\\sin x}", difficulty: 5, answer: "cosx+sinx", acceptedAnswers: ["cos(x)+sin(x)", "\\cos x+\\sin x", "sinx+cosx"], hint: "Numerator is a difference of squares.", explanation: "$\\dfrac{(\\cos x-\\sin x)(\\cos x+\\sin x)}{\\cos x-\\sin x}=\\cos x+\\sin x$." },
        { id: "y11adv-trig-id-p29", prompt: "Which identity follows from dividing $\\sin^2x+\\cos^2x=1$ by $\\cos^2x$?", latex: "\\text{Divide by }\\cos^2x", difficulty: 5, answer: "B", choices: [{ label: "A", text: "$\\csc^2x=1+\\cot^2x$" }, { label: "B", text: "$\\tan^2x+1=\\sec^2x$" }, { label: "C", text: "$\\sin^2x=1-\\cos^2x$" }, { label: "D", text: "$\\cot^2x+1=\\csc^2x$" }], hint: "Each term divided by $\\cos^2x$.", explanation: "$\\dfrac{\\sin^2x}{\\cos^2x}+1=\\dfrac{1}{\\cos^2x}$ gives $\\tan^2x+1=\\sec^2x$." },
        { id: "y11adv-trig-id-p30", prompt: "Simplify the expression to a single trig function.", latex: "\\sin x+\\frac{\\cos^2x}{\\sin x}", difficulty: 5, answer: "1/sinx", acceptedAnswers: ["1/sin(x)", "\\frac{1}{\\sin x}", "cscx", "\\csc x"], hint: "Common denominator $\\sin x$.", explanation: "$\\dfrac{\\sin^2x+\\cos^2x}{\\sin x}=\\dfrac{1}{\\sin x}$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trig-id-mp1",
          prompt: "Use the core identities to simplify $\\dfrac{\\sin^2x}{1-\\cos x}$.",
          latex: "\\frac{\\sin^2x}{1-\\cos x}",
          answer: "1-cos^2x",
          hint: "Replace the numerator using the Pythagorean identity, then factorise and cancel.",
          explanation: "(a) $\\sin^2x=1-\\cos^2x$. (b) factorise to $(1-\\cos x)(1+\\cos x)$. (c) cancelling the $(1-\\cos x)$ factor gives $1+\\cos x$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Rewrite sin^2 x using the Pythagorean identity (in terms of cos x).", latex: "\\sin^2x", marks: 1, answer: "1-cos^2x", acceptedAnswers: ["1-cos^2(x)", "1-\\cos^2x", "1−cos^2x"], hint: "$\\sin^2x=1-\\cos^2x$.", explanation: "$\\sin^2x=1-\\cos^2x$." },
            { key: "b", label: "(b)", prompt: "Factorise 1 - cos^2 x as a product of two brackets.", latex: "1-\\cos^2x", marks: 2, answer: "(1-cosx)(1+cosx)", acceptedAnswers: ["(1-cos(x))(1+cos(x))", "(1-\\cos x)(1+\\cos x)", "(1+cosx)(1-cosx)"], hint: "Difference of squares.", explanation: "$1-\\cos^2x=(1-\\cos x)(1+\\cos x)$." },
            { key: "c", label: "(c)", prompt: "Simplify the full fraction to a single expression.", latex: "\\frac{(1-\\cos x)(1+\\cos x)}{1-\\cos x}", marks: 1, answer: "1+cosx", acceptedAnswers: ["1+cos(x)", "1+\\cos x", "cosx+1"], hint: "Cancel the common factor.", explanation: "$\\dfrac{(1-\\cos x)(1+\\cos x)}{1-\\cos x}=1+\\cos x$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "trigonometric-identities-equations-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed assessment-style questions involving first-degree trigonometric equations, exact solutions, and core identities.",
      learningIntention:
        "Apply first-degree trigonometric equation solving and core identity simplification to mixed assessment-style questions.",
      successCriteria: [
        "Isolate trigonometric functions in simple equations.",
        "Find reference angles from exact values.",
        "Use quadrant signs to choose solutions.",
        "Use solution-pair choices rather than fragile typed pairs.",
        "Simplify expressions using Pythagorean and quotient identities.",
        "Choose useful first steps for solving or simplifying.",
      ],
      teaching: {
        paragraphs: [
          "This mixed lesson combines the equation-solving and identity skills from the unit.",
          "For equations, isolate the trig function, find the reference angle, use ASTC, and check the stated domain.",
          "For two-solution questions, this course uses either separate smaller and larger solution questions or multiple-choice solution pairs.",
          "For identities, choose from the Pythagorean identity, its rearrangements, or the quotient identity.",
          "Do not write proof working in the answer box. Use short simplified expressions or labelled choices.",
        ],
        latexBlocks: [
          "2\\sin x-1=0\\Rightarrow \\sin x=\\frac12",
          "\\sin^2x+\\cos^2x=1",
          "1-\\sin^2x=\\cos^2x,\\quad 1-\\cos^2x=\\sin^2x",
          "\\tan x=\\frac{\\sin x}{\\cos x},\\quad \\cos x\\ne0",
          "0\\le x\\le2\\pi",
        ],
      },
      workedExamples: [
        {
          title: "Mixed equation setup",
          questionLatex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
          steps: [
            { explanation: "Isolate sine.", latex: "\\sin x=\\frac12" },
            { explanation: "The reference angle is pi over six.", latex: "\\frac{\\pi}{6}" },
            { explanation: "Sine is positive in quadrants I and II.", latex: "x=\\frac{\\pi}{6},\\quad \\frac{5\\pi}{6}" },
          ],
          finalAnswerLatex: "\\frac{\\pi}{6},\\quad \\frac{5\\pi}{6}",
        },
        {
          title: "Mixed identity simplification",
          questionLatex: "1-\\cos^2x",
          steps: [
            { explanation: "Use the rearranged Pythagorean identity.", latex: "1-\\cos^2x=\\sin^2x" },
          ],
          finalAnswerLatex: "\\sin^2x",
        },
        {
          title: "Quotient identity step",
          questionLatex: "\\tan x\\cos x",
          steps: [
            { explanation: "Rewrite tangent as sine over cosine.", latex: "\\tan x\\cos x=\\frac{\\sin x}{\\cos x}\\cos x" },
            { explanation: "Cancel the common factor where allowed.", latex: "\\sin x" },
          ],
          finalAnswerLatex: "\\sin x",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-trig-mixed-g1", "Isolate the trigonometric function.", "2\\cos x+1=0\\quad \\Rightarrow\\quad \\cos x=\\Box", "-1/2", ["-0.5"]),
        formulaAnswer("y11adv-trig-mixed-g2", "Find the reference angle.", "\\cos x=\\frac12", "pi/3", ["\\pi/3", "π/3"]),
        formulaAnswer("y11adv-trig-mixed-g3", "Complete the identity.", "\\sin^2x+\\cos^2x=\\Box", "1"),
        practicalChoice("y11adv-trig-mixed-g4", "Choose the best first step for the expression.", "B", ["Set it equal to zero", "Rewrite tangent in terms of sine and cosine", "Use the tangent period", "Use a reference angle"], "Use the quotient identity when tangent appears in an expression.", "\\tan x\\cos x"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-mixed-i1", "Find the smaller solution.", "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", "2pi/3", ["2\\pi/3", "2π/3"]),
        formulaAnswer("y11adv-trig-mixed-i2", "Find the larger solution.", "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", "4pi/3", ["4\\pi/3", "4π/3"]),
        practicalChoice("y11adv-trig-mixed-i3", "Choose the solution pair.", "D", ["$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$"], "Tangent is positive in quadrants I and III.", "\\tan x=1,\\quad 0\\le x\\le2\\pi"),
        formulaAnswer("y11adv-trig-mixed-i4", "Simplify the expression.", "1-\\cos^2x", "sin^2x", ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"]),
        formulaAnswer("y11adv-trig-mixed-i5", "Simplify the expression where it is defined.", "\\tan x\\cos x", "sinx", ["sin(x)", "\\sin x"]),
      ],
      commonMistakes: [
        { mistake: "Typing two radian solutions into one answer box.", fix: "Use separate smaller/larger solution questions or choose the labelled solution pair." },
        { mistake: "Forgetting to isolate the trig function before using exact values.", fix: "Rearrange the equation first." },
        { mistake: "Using identity simplification as though it proves a solution set.", fix: "Identities simplify expressions; equations need solutions in a domain." },
        { mistake: "Ignoring restrictions in quotient identities.", fix: "When using tangent as sine over cosine, remember $\\cos x\\ne0$." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-trig-mixed-m1", "Isolate the trigonometric function.", "2\\sin x-1=0\\quad \\Rightarrow\\quad \\sin x=\\Box", "1/2", ["0.5"]),
        formulaAnswer("y11adv-trig-mixed-m2", "Complete the identity.", "1-\\sin^2x=\\Box", "cos^2x", ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"]),
        formulaAnswer("y11adv-trig-mixed-m3", "Rewrite tangent in terms of sine and cosine.", "\\tan x=\\Box", "sinx/cosx", ["sin(x)/cos(x)", "\\sin x/\\cos x", "\\frac{\\sin x}{\\cos x}"]),
        formulaAnswer("y11adv-trig-mixed-m4", "Find the smaller solution.", "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", "7pi/6", ["7\\pi/6", "7π/6"]),
        formulaAnswer("y11adv-trig-mixed-m5", "Find the larger solution.", "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", "11pi/6", ["11\\pi/6", "11π/6"]),
        practicalChoice("y11adv-trig-mixed-m6", "Choose the solution pair.", "B", ["$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$"], "Cosine is positive in quadrants I and IV.", "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi"),
        practicalChoice("y11adv-trig-mixed-m7", "Which option identifies the equation-solving error?", "A", ["The trig function was not isolated first", "The identity is false", "The domain has no endpoint", "The answer must be typed as a proof"], "Isolate sine before finding reference angles.", "2\\sin x-1=0"),
        practicalChoice("y11adv-trig-mixed-m8", "Which expression is equivalent where it is defined?", "C", ["$\\cos x$", "$1$", "$\\sin x$", "$\\sin^2x$"], "Rewrite tangent as sine over cosine, then cancel cosine.", "\\tan x\\cos x"),
        practicalChoice("y11adv-trig-mixed-m9", "Choose the best first step.", "D", ["Use tangent period", "Find a reference angle", "Set the expression equal to zero", "Use the Pythagorean identity"], "The expression matches a rearrangement of the Pythagorean identity.", "1-\\sin^2x"),
        practicalChoice("y11adv-trig-mixed-m10", "Choose the solution pair after isolating the trigonometric function.", "A", ["$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$"], "The equation becomes cos x = -1/2, so use quadrants II and III.", "2\\cos x+1=0,\\quad 0\\le x\\le2\\pi"),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: isolate / identity / reference angle ───────────────
        { id: "y11adv-trig-mixed-p1", prompt: "Isolate the trigonometric function. Enter the right-hand side.", latex: "2\\sin x-1=0\\;\\Rightarrow\\;\\sin x=\\Box", difficulty: 1, answer: "1/2", acceptedAnswers: ["0.5"], hint: "Add 1, divide by 2.", explanation: "$\\sin x=1/2$." },
        { id: "y11adv-trig-mixed-p2", prompt: "Complete the identity. Enter the right-hand side.", latex: "\\sin^2x+\\cos^2x=\\Box", difficulty: 1, answer: "1", hint: "Pythagorean identity.", explanation: "$\\sin^2x+\\cos^2x=1$." },
        { id: "y11adv-trig-mixed-p3", prompt: "Find the reference angle.", latex: "\\cos x=\\frac12", difficulty: 1, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Special angle cosine $1/2$.", explanation: "$\\cos(\\pi/3)=1/2$." },
        { id: "y11adv-trig-mixed-p4", prompt: "Rewrite tangent in terms of sine and cosine.", latex: "\\tan x", difficulty: 1, answer: "sinx/cosx", acceptedAnswers: ["sin(x)/cos(x)", "\\sin x/\\cos x", "\\frac{\\sin x}{\\cos x}"], hint: "Quotient identity.", explanation: "$\\tan x=\\dfrac{\\sin x}{\\cos x}$." },
        // ── Difficulty 2: simplify / isolate ─────────────────────────────────
        { id: "y11adv-trig-mixed-p5", prompt: "Simplify the expression.", latex: "1-\\cos^2x", difficulty: 2, answer: "sin^2x", acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"], hint: "Rearrange the Pythagorean identity.", explanation: "$1-\\cos^2x=\\sin^2x$." },
        { id: "y11adv-trig-mixed-p6", prompt: "Simplify the expression.", latex: "1-\\sin^2x", difficulty: 2, answer: "cos^2x", acceptedAnswers: ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"], hint: "Rearrange the Pythagorean identity.", explanation: "$1-\\sin^2x=\\cos^2x$." },
        { id: "y11adv-trig-mixed-p7", prompt: "Simplify the expression where it is defined.", latex: "\\tan x\\cos x", difficulty: 2, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Rewrite $\\tan x$, then cancel.", explanation: "$\\dfrac{\\sin x}{\\cos x}\\cos x=\\sin x$." },
        { id: "y11adv-trig-mixed-p8", prompt: "Isolate the trigonometric function. Enter the right-hand side.", latex: "2\\cos x+1=0\\;\\Rightarrow\\;\\cos x=\\Box", difficulty: 2, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "Subtract 1, divide by 2.", explanation: "$\\cos x=-1/2$." },
        // ── Difficulty 3: smaller/larger solutions ───────────────────────────
        { id: "y11adv-trig-mixed-p9", prompt: "Find the smaller solution.", latex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "2pi/3", acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "Cosine negative in II and III.", explanation: "$\\pi-\\pi/3=2\\pi/3$." },
        { id: "y11adv-trig-mixed-p10", prompt: "Find the larger solution.", latex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "Quadrant III: $\\pi+\\pi/3$.", explanation: "$\\pi+\\pi/3=4\\pi/3$." },
        { id: "y11adv-trig-mixed-p11", prompt: "Find the smaller solution.", latex: "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "7pi/6", acceptedAnswers: ["7\\pi/6", "7π/6"], hint: "Sine negative in III and IV.", explanation: "$\\pi+\\pi/6=7\\pi/6$." },
        { id: "y11adv-trig-mixed-p12", prompt: "Choose the solution pair.", latex: "\\tan x=1,\\quad 0\\le x\\le2\\pi", difficulty: 3, answer: "D", choices: [{ label: "A", text: "$\\frac{\\pi}{6},\\frac{5\\pi}{6}$" }, { label: "B", text: "$\\frac{2\\pi}{3},\\frac{4\\pi}{3}$" }, { label: "C", text: "$\\frac{\\pi}{3},\\frac{5\\pi}{3}$" }, { label: "D", text: "$\\frac{\\pi}{4},\\frac{5\\pi}{4}$" }], hint: "Tangent positive in I and III.", explanation: "$\\pi/4$ and $5\\pi/4$." },
        // ── Difficulty 4: misconception + harder mixed ───────────────────────
        { id: "y11adv-trig-mixed-p13", prompt: "Which option identifies the equation-solving error?", latex: "2\\sin x-1=0", difficulty: 4, answer: "A", choices: [{ label: "A", text: "The trig function was not isolated first" }, { label: "B", text: "The identity is false" }, { label: "C", text: "The domain has no endpoint" }, { label: "D", text: "The answer must be a proof" }], hint: "What is the very first step?", explanation: "Isolate $\\sin x$ before using exact values." },
        { id: "y11adv-trig-mixed-p14", prompt: "Which expression is equivalent where it is defined?", latex: "\\tan x\\cos x", difficulty: 4, answer: "C", choices: [{ label: "A", text: "$\\cos x$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\sin x$" }, { label: "D", text: "$\\sin^2x$" }], hint: "Rewrite tangent and cancel.", explanation: "$\\tan x\\cos x=\\sin x$." },
        { id: "y11adv-trig-mixed-p15", prompt: "Find the smaller solution.", latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "Cosine positive in I and IV.", explanation: "Smaller solution is $\\pi/3$." },
        { id: "y11adv-trig-mixed-p16", prompt: "How many solutions does the equation have in the interval?", latex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 4, answer: "B", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Cosine negative in two quadrants.", explanation: "$2\\pi/3$ and $4\\pi/3$ — two solutions." },
        { id: "y11adv-trig-mixed-p17", prompt: "Simplify the expression to a single number.", latex: "\\sin^2x+1-\\sin^2x", difficulty: 4, answer: "1", hint: "The sine-squared terms cancel.", explanation: "$1$." },
        // ── Difficulty 5: combine equation + identity (Band-6) ───────────────
        { id: "y11adv-trig-mixed-p18", prompt: "Use an identity, then count solutions in the interval.", latex: "1-\\cos^2x=\\frac34,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "D", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "$\\sin^2x=3/4$, so $\\sin x=\\pm\\sqrt3/2$.", explanation: "Reference angle $\\pi/3$ in all four quadrants — four solutions." },
        { id: "y11adv-trig-mixed-p19", prompt: "Use an identity first. Enter the smaller solution.", latex: "1-\\cos^2x=\\frac14,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "$\\sin^2x=1/4$, $\\sin x=\\pm1/2$.", explanation: "Smallest solution is $\\pi/6$." },
        { id: "y11adv-trig-mixed-p20", prompt: "Find the smaller solution.", latex: "2\\sin^2x-\\sin x=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "0", hint: "Factorise: $\\sin x(2\\sin x-1)=0$.", explanation: "$\\sin x=0$ gives $x=0$, the smallest solution." },
        { id: "y11adv-trig-mixed-p21", prompt: "Find the smaller non-zero solution.", latex: "2\\sin^2x-\\sin x=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "The branch $\\sin x=1/2$.", explanation: "$\\sin x=1/2$ gives $\\pi/6$ and $5\\pi/6$; the smaller is $\\pi/6$." },
        { id: "y11adv-trig-mixed-p22", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{1-\\sin^2x}{\\cos x}", difficulty: 5, answer: "cosx", acceptedAnswers: ["cos(x)", "\\cos x", "\\cos(x)"], hint: "Numerator $=\\cos^2x$.", explanation: "$\\dfrac{\\cos^2x}{\\cos x}=\\cos x$." },
        { id: "y11adv-trig-mixed-p23", prompt: "Find the larger solution after isolating cosine.", latex: "2\\cos x+1=0,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "4pi/3", acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "$\\cos x=-1/2$.", explanation: "Larger solution is $4\\pi/3$." },
        { id: "y11adv-trig-mixed-p24", prompt: "How many solutions does the equation have in the interval?", latex: "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "B", choices: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "4" }], hint: "Sine negative in III and IV.", explanation: "$7\\pi/6$ and $11\\pi/6$ — two solutions." },
        { id: "y11adv-trig-mixed-p25", prompt: "Simplify the expression to a single number.", latex: "(\\sin x+\\cos x)^2-2\\sin x\\cos x", difficulty: 5, answer: "1", hint: "Expand the square.", explanation: "$\\sin^2x+\\cos^2x=1$." },
        { id: "y11adv-trig-mixed-p26", prompt: "Find the only solution in the interval.", latex: "\\sin x=1,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "pi/2", acceptedAnswers: ["\\pi/2", "π/2"], hint: "Top of the unit circle.", explanation: "$\\sin x=1$ at $x=\\pi/2$." },
        { id: "y11adv-trig-mixed-p27", prompt: "Find the larger solution.", latex: "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi", difficulty: 5, answer: "11pi/6", acceptedAnswers: ["11\\pi/6", "11π/6"], hint: "Quadrant IV: $2\\pi-\\pi/6$.", explanation: "Larger solution is $11\\pi/6$." },
        { id: "y11adv-trig-mixed-p28", prompt: "Simplify the expression to a single trig function.", latex: "\\frac{1-\\cos^2x}{\\sin x}", difficulty: 5, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Numerator $=\\sin^2x$.", explanation: "$\\dfrac{\\sin^2x}{\\sin x}=\\sin x$." },
        { id: "y11adv-trig-mixed-p29", prompt: "Choose the best first step.", latex: "1-\\sin^2x", difficulty: 5, answer: "D", choices: [{ label: "A", text: "Use tangent period" }, { label: "B", text: "Find a reference angle" }, { label: "C", text: "Set the expression to zero" }, { label: "D", text: "Use a Pythagorean rearrangement" }], hint: "The expression is a rearranged identity.", explanation: "$1-\\sin^2x=\\cos^2x$." },
        { id: "y11adv-trig-mixed-p30", prompt: "Solve in degrees. Enter the larger solution.", latex: "2\\sin x-1=0,\\quad 0^\\circ\\le x\\le360^\\circ", difficulty: 5, answer: "150", acceptedAnswers: ["150 degrees", "150deg"], hint: "$\\sin x=1/2$; reference angle $30^\\circ$.", explanation: "Solutions $30^\\circ$ and $150^\\circ$; the larger is $150^\\circ$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trig-mixed-mp1",
          prompt: "Solve $1-\\cos^2x=\\dfrac14$ for $0\\le x\\le2\\pi$ using a Pythagorean identity.",
          latex: "1-\\cos^2x=\\frac14,\\quad 0\\le x\\le2\\pi",
          answer: "sin^2x",
          hint: "Use the Pythagorean rearrangement first, then solve the resulting sine equation.",
          explanation: "(a) $1-\\cos^2x=\\sin^2x$. (b) $\\sin^2x=1/4$, so $\\sin x=\\pm1/2$. (c) the four solutions are $\\pi/6,5\\pi/6,7\\pi/6,11\\pi/6$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Rewrite the left side 1 - cos^2 x as a single trig term.", latex: "1-\\cos^2x", marks: 1, answer: "sin^2x", acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"], hint: "Pythagorean rearrangement.", explanation: "$1-\\cos^2x=\\sin^2x$." },
            { key: "b", label: "(b)", prompt: "Solve for the positive value of sin x.", latex: "\\sin^2x=\\frac14", marks: 1, answer: "1/2", acceptedAnswers: ["0.5"], hint: "Take the positive square root.", explanation: "$\\sin x=\\pm1/2$; the positive value is $1/2$." },
            { key: "c", label: "(c)", prompt: "How many solutions does the equation have in the interval?", latex: "\\sin^2x=\\frac14,\\quad 0\\le x\\le2\\pi", marks: 2, answer: "4", hint: "Both $+1/2$ and $-1/2$ give two solutions each.", explanation: "$\\sin x=1/2$ gives $\\pi/6,5\\pi/6$ and $\\sin x=-1/2$ gives $7\\pi/6,11\\pi/6$ — four solutions." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "reciprocal-trig-ratios") {
    return {
      ...base,
      description:
        "Define sec θ = 1/cos θ, csc θ = 1/sin θ, and cot θ = cos θ/sin θ; evaluate exact values at special angles; use the Pythagorean identities sec²θ = 1 + tan²θ and csc²θ = 1 + cot²θ.",
      learningIntention:
        "Learn the three reciprocal trigonometric ratios, their exact values at 30°, 45°, and 60°, and the two Pythagorean identities that extend from sin²θ + cos²θ = 1.",
      successCriteria: [
        "State the definitions sec θ = 1/cos θ, csc θ = 1/sin θ, and cot θ = cos θ/sin θ.",
        "Evaluate sec, csc, and cot exactly at 0°, 30°, 45°, 60°, 90°, and 180°.",
        "Identify where sec and csc are undefined.",
        "Apply the identity sec²θ = 1 + tan²θ.",
        "Apply the identity csc²θ = 1 + cot²θ.",
      ],
      teaching: {
        paragraphs: [
          "The three reciprocal ratios each flip one of the three primary ratios.",
          "Secant (sec) is the reciprocal of cosine: sec θ = 1/cos θ. It is undefined where cos θ = 0, for example at 90°.",
          "Cosecant (csc) is the reciprocal of sine: csc θ = 1/sin θ. It is undefined where sin θ = 0, for example at 0° and 180°.",
          "Cotangent (cot) is the reciprocal of tangent: cot θ = cos θ/sin θ. It is undefined where sin θ = 0.",
          "Dividing both sides of sin²θ + cos²θ = 1 by cos²θ gives sec²θ = 1 + tan²θ.",
          "Dividing both sides of sin²θ + cos²θ = 1 by sin²θ gives csc²θ = 1 + cot²θ.",
          "Exact values at 30°, 45°, and 60° follow directly from the special-angle triangles and the reciprocal definitions.",
        ],
        latexBlocks: [
          "\\sec\\theta=\\frac{1}{\\cos\\theta},\\quad \\csc\\theta=\\frac{1}{\\sin\\theta},\\quad \\cot\\theta=\\frac{\\cos\\theta}{\\sin\\theta}",
          "\\sec^2\\theta=1+\\tan^2\\theta",
          "\\csc^2\\theta=1+\\cot^2\\theta",
          "\\sec(60°)=2,\\quad \\csc(30°)=2,\\quad \\cot(45°)=1",
          "\\sec(45°)=\\csc(45°)=\\sqrt{2}",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate sec at a special angle",
          questionLatex: "\\sec(60°)",
          steps: [
            { explanation: "Apply the definition sec θ = 1/cos θ.", latex: "\\sec(60°)=\\frac{1}{\\cos(60°)}" },
            { explanation: "Recall cos(60°) = 1/2 from the 30-60-90 triangle.", latex: "\\cos(60°)=\\frac{1}{2}" },
            { explanation: "Divide 1 by 1/2.", latex: "\\sec(60°)=1\\div\\frac{1}{2}=2" },
          ],
          finalAnswerLatex: "\\sec(60°)=2",
        },
        {
          title: "Verify sec²θ = 1 + tan²θ at θ = 60°",
          questionLatex: "\\sec^2(60°)=1+\\tan^2(60°)",
          steps: [
            { explanation: "Find sec(60°) = 2, so sec²(60°) = 4.", latex: "\\sec^2(60°)=4" },
            { explanation: "Find tan(60°) = √3, so tan²(60°) = 3.", latex: "\\tan^2(60°)=(\\sqrt{3})^2=3" },
            { explanation: "Check: 1 + 3 = 4 = sec²(60°). The identity holds.", latex: "1+\\tan^2(60°)=1+3=4\\checkmark" },
          ],
          finalAnswerLatex: "1+\\tan^2(60°)=4=\\sec^2(60°)\\checkmark",
        },
        {
          title: "Evaluate csc and cot at 30°",
          questionLatex: "\\csc(30°),\\quad \\cot(30°)",
          steps: [
            { explanation: "csc(30°) = 1/sin(30°). Use sin(30°) = 1/2.", latex: "\\csc(30°)=\\frac{1}{1/2}=2" },
            { explanation: "cot(30°) = cos(30°)/sin(30°). Use cos(30°) = √3/2 and sin(30°) = 1/2.", latex: "\\cot(30°)=\\frac{\\sqrt{3}/2}{1/2}=\\sqrt{3}" },
          ],
          finalAnswerLatex: "\\csc(30°)=2,\\quad \\cot(30°)=\\sqrt{3}",
        },
      ],
      guidedPractice: [
        conceptChoice(
          "y11adv-sec-g1",
          "Choose the correct definition of sec θ.",
          "B",
          ["$\\dfrac{1}{\\sin\\theta}$", "$\\dfrac{1}{\\cos\\theta}$", "$\\dfrac{1}{\\tan\\theta}$", "$\\dfrac{\\cos\\theta}{\\sin\\theta}$"],
          "Secant is the reciprocal of cosine. Choice A defines csc, C defines cot by one form, and D also defines cot.",
          "\\sec\\theta=\\Box"
        ),
        exactAnswer("y11adv-sec-g2", "Evaluate the exact value.", "\\sec(60°)", "2",
          "sec(60°) = 1/cos(60°) = 1/(1/2) = 2.", [], "Use sec θ = 1/cos θ, then substitute the exact value of cos(60°)."),
        exactAnswer("y11adv-sec-g3", "Evaluate the exact value.", "\\csc(30°)", "2",
          "csc(30°) = 1/sin(30°) = 1/(1/2) = 2.", [], "Use csc θ = 1/sin θ, then substitute the exact value of sin(30°)."),
        exactAnswer("y11adv-sec-g4", "Evaluate the exact value.", "\\cot(45°)", "1",
          "cot(45°) = 1/tan(45°) = 1/1 = 1.", [], "Use cot θ = 1/tan θ, then substitute tan(45°) = 1."),
      ],
      independentPractice: [
        exactAnswer("y11adv-sec-i1", "Evaluate the exact value.", "\\csc(90°)", "1",
          "csc(90°) = 1/sin(90°) = 1/1 = 1.", [], "Use csc θ = 1/sin θ, then sin(90°) = 1."),
        exactAnswer("y11adv-sec-i2", "Evaluate the exact value.", "\\sec(180°)", "-1",
          "sec(180°) = 1/cos(180°) = 1/(−1) = −1.", ["-1", "−1"], "Use sec θ = 1/cos θ, then cos(180°) = −1."),
        exactAnswer("y11adv-sec-i3", "Evaluate the exact value.", "\\sec^2(60°)", "4",
          "sec(60°) = 2, so sec²(60°) = 4.", [], "Find sec(60°) first, then square it."),
        exactAnswer("y11adv-sec-i4", "Evaluate the expression.", "1+\\tan^2(60°)", "4",
          "tan(60°) = √3, so tan²(60°) = 3, and 1 + 3 = 4.", [], "Use tan(60°) = √3, square it, then add 1."),
        conceptChoice(
          "y11adv-sec-i5",
          "Complete the Pythagorean identity.",
          "C",
          ["$\\cot^2\\theta$", "$\\sin^2\\theta$", "$\\tan^2\\theta$", "$\\cos^2\\theta$"],
          "Dividing sin²θ + cos²θ = 1 through by cos²θ gives 1/cos²θ = 1 + sin²θ/cos²θ, which is sec²θ = 1 + tan²θ.",
          "\\sec^2\\theta=1+\\Box"
        ),
      ],
      commonMistakes: [
        { mistake: "Writing sec θ = 1/sin θ (confusing sec with csc).", fix: "Sec is the reciprocal of cosine, not sine. Memory aid: sec and cos share the letter c; csc and sin share the letter s." },
        { mistake: "Writing sec(90°) = 0 because cos(90°) = 0.", fix: "cos(90°) = 0 makes sec(90°) = 1/0, which is undefined — not zero." },
        { mistake: "Writing cot θ = sin θ/cos θ instead of cos θ/sin θ.", fix: "Cotangent flips the tangent ratio: cot θ = cos θ/sin θ. It is not the same as tangent." },
        { mistake: "Using the wrong sign in the identity: sec²θ = 1 − tan²θ.", fix: "The identity has a plus sign: sec²θ = 1 + tan²θ. It comes from dividing sin²θ + cos²θ = 1 by cos²θ." },
      ],
      masteryQuiz: [
        exactAnswer("y11adv-sec-m1", "Evaluate the exact value.", "\\csc^2(30°)", "4",
          "csc(30°) = 2, so csc²(30°) = 4.", [], "Find csc(30°) first, then square it."),
        exactAnswer("y11adv-sec-m2", "Evaluate the expression.", "1+\\cot^2(30°)", "4",
          "cot(30°) = √3, so cot²(30°) = 3, and 1 + 3 = 4. This confirms csc²(30°) = 1 + cot²(30°).", [], "Use cot(30°) = √3, square it, then add 1."),
        conceptChoice(
          "y11adv-sec-m3",
          "Which value is undefined?",
          "D",
          ["$\\sec(0°)$", "$\\csc(90°)$", "$\\cot(45°)$", "$\\sec(90°)$"],
          "cos(90°) = 0, so sec(90°) = 1/0 is undefined. The other three are all defined.",
          "\\text{Undefined values}"
        ),
        exactAnswer("y11adv-sec-m4", "Evaluate the exact value.", "\\csc(45°)", "sqrt(2)",
          "csc(45°) = 1/sin(45°) = 1/(1/√2) = √2.",
          ["√2", "\\sqrt{2}", "\\sqrt2"],
          "Use csc θ = 1/sin θ, then sin(45°) = 1/√2."),
        exactAnswer("y11adv-sec-m5", "Evaluate the expression.", "\\sec^2\\theta-\\tan^2\\theta", "1",
          "sec²θ = 1 + tan²θ rearranges to sec²θ − tan²θ = 1.", [], "Rearrange the identity sec²θ = 1 + tan²θ by subtracting tan²θ from both sides."),
        exactAnswer("y11adv-sec-m6", "Evaluate the expression.", "\\csc^2\\theta-\\cot^2\\theta", "1",
          "csc²θ = 1 + cot²θ rearranges to csc²θ − cot²θ = 1.", [], "Rearrange the identity csc²θ = 1 + cot²θ by subtracting cot²θ from both sides."),
        exactAnswer("y11adv-sec-m7", "Evaluate the exact value.", "\\sec(0°)", "1",
          "sec(0°) = 1/cos(0°) = 1/1 = 1.", [], "Use sec θ = 1/cos θ, then cos(0°) = 1."),
        conceptChoice(
          "y11adv-sec-m8",
          "Choose the correct definition of cot θ.",
          "C",
          ["$\\dfrac{\\sin\\theta}{\\cos\\theta}$", "$\\dfrac{1}{\\cos\\theta}$", "$\\dfrac{\\cos\\theta}{\\sin\\theta}$", "$\\dfrac{1}{\\sin\\theta}$"],
          "cot θ = cos θ/sin θ. Choice A is tan, B is sec, D is csc.",
          "\\cot\\theta=\\Box"
        ),
        exactAnswer("y11adv-sec-m9", "Evaluate the exact value.", "\\sec^2(45°)", "2",
          "sec(45°) = 1/cos(45°) = 1/(1/√2) = √2, so sec²(45°) = (√2)² = 2.", [], "Find sec(45°) = √2 first, then square it."),
        conceptChoice(
          "y11adv-sec-m10",
          "Which ratio is the reciprocal of sine?",
          "C",
          ["$\\sec\\theta$", "$\\cot\\theta$", "$\\csc\\theta$", "$\\tan\\theta$"],
          "cosecant csc θ = 1/sin θ, so it is the reciprocal of sine. Sec is the reciprocal of cos; cot is the reciprocal of tan.",
          "\\text{Reciprocal of }\\sin\\theta"
        ),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: definitions ────────────────────────────────────────
        { id: "y11adv-sec-p1", prompt: "Choose the correct definition of sec θ.", latex: "\\sec\\theta=\\Box", difficulty: 1, answer: "B", choices: [{ label: "A", text: "$\\frac{1}{\\sin\\theta}$" }, { label: "B", text: "$\\frac{1}{\\cos\\theta}$" }, { label: "C", text: "$\\frac{1}{\\tan\\theta}$" }, { label: "D", text: "$\\frac{\\cos\\theta}{\\sin\\theta}$" }], hint: "Sec shares the letter c with cos.", explanation: "$\\sec\\theta=\\dfrac{1}{\\cos\\theta}$." },
        { id: "y11adv-sec-p2", prompt: "Choose the correct definition of csc θ.", latex: "\\csc\\theta=\\Box", difficulty: 1, answer: "A", choices: [{ label: "A", text: "$\\frac{1}{\\sin\\theta}$" }, { label: "B", text: "$\\frac{1}{\\cos\\theta}$" }, { label: "C", text: "$\\frac{\\cos\\theta}{\\sin\\theta}$" }, { label: "D", text: "$\\frac{\\sin\\theta}{\\cos\\theta}$" }], hint: "Cosecant is the reciprocal of sine.", explanation: "$\\csc\\theta=\\dfrac{1}{\\sin\\theta}$." },
        { id: "y11adv-sec-p3", prompt: "Choose the correct definition of cot θ.", latex: "\\cot\\theta=\\Box", difficulty: 1, answer: "C", choices: [{ label: "A", text: "$\\frac{\\sin\\theta}{\\cos\\theta}$" }, { label: "B", text: "$\\frac{1}{\\cos\\theta}$" }, { label: "C", text: "$\\frac{\\cos\\theta}{\\sin\\theta}$" }, { label: "D", text: "$\\frac{1}{\\sin\\theta}$" }], hint: "Cotangent flips tangent.", explanation: "$\\cot\\theta=\\dfrac{\\cos\\theta}{\\sin\\theta}$." },
        // ── Difficulty 2: simple exact values ────────────────────────────────
        { id: "y11adv-sec-p4", prompt: "Evaluate the exact value.", latex: "\\sec(60°)", difficulty: 2, answer: "2", hint: "$\\sec\\theta=1/\\cos\\theta$ and $\\cos(60°)=1/2$.", explanation: "$\\sec(60°)=1/(1/2)=2$." },
        { id: "y11adv-sec-p5", prompt: "Evaluate the exact value.", latex: "\\csc(30°)", difficulty: 2, answer: "2", hint: "$\\csc\\theta=1/\\sin\\theta$ and $\\sin(30°)=1/2$.", explanation: "$\\csc(30°)=1/(1/2)=2$." },
        { id: "y11adv-sec-p6", prompt: "Evaluate the exact value.", latex: "\\cot(45°)", difficulty: 2, answer: "1", hint: "$\\cot(45°)=1/\\tan(45°)$ and $\\tan(45°)=1$.", explanation: "$\\cot(45°)=1$." },
        { id: "y11adv-sec-p7", prompt: "Evaluate the exact value.", latex: "\\sec(0°)", difficulty: 2, answer: "1", hint: "$\\cos(0°)=1$.", explanation: "$\\sec(0°)=1/1=1$." },
        // ── Difficulty 3: surds / negatives ──────────────────────────────────
        { id: "y11adv-sec-p8", prompt: "Evaluate the exact value.", latex: "\\sec(180°)", difficulty: 3, answer: "-1", acceptedAnswers: ["−1"], hint: "$\\cos(180°)=-1$.", explanation: "$\\sec(180°)=1/(-1)=-1$." },
        { id: "y11adv-sec-p9", prompt: "Evaluate the exact value.", latex: "\\csc(90°)", difficulty: 3, answer: "1", hint: "$\\sin(90°)=1$.", explanation: "$\\csc(90°)=1/1=1$." },
        { id: "y11adv-sec-p10", prompt: "Evaluate the exact value.", latex: "\\sec(45°)", difficulty: 3, answer: "sqrt(2)", acceptedAnswers: ["√2", "\\sqrt{2}", "\\sqrt2"], hint: "$\\cos(45°)=1/\\sqrt2$.", explanation: "$\\sec(45°)=1/(1/\\sqrt2)=\\sqrt2$." },
        { id: "y11adv-sec-p11", prompt: "Evaluate the exact value.", latex: "\\csc(45°)", difficulty: 3, answer: "sqrt(2)", acceptedAnswers: ["√2", "\\sqrt{2}", "\\sqrt2"], hint: "$\\sin(45°)=1/\\sqrt2$.", explanation: "$\\csc(45°)=\\sqrt2$." },
        { id: "y11adv-sec-p12", prompt: "Evaluate the exact value.", latex: "\\cot(30°)", difficulty: 3, answer: "sqrt(3)", acceptedAnswers: ["√3", "\\sqrt{3}", "\\sqrt3"], hint: "$\\cot(30°)=\\cos(30°)/\\sin(30°)$.", explanation: "$\\cot(30°)=(\\sqrt3/2)/(1/2)=\\sqrt3$." },
        // ── Difficulty 4: undefined + identity application ───────────────────
        { id: "y11adv-sec-p13", prompt: "Which value is undefined?", latex: "\\text{Undefined values}", difficulty: 4, answer: "D", choices: [{ label: "A", text: "$\\sec(0°)$" }, { label: "B", text: "$\\csc(90°)$" }, { label: "C", text: "$\\cot(45°)$" }, { label: "D", text: "$\\sec(90°)$" }], hint: "Sec is undefined where cos is zero.", explanation: "$\\cos(90°)=0$, so $\\sec(90°)$ is undefined." },
        { id: "y11adv-sec-p14", prompt: "Which value is undefined?", latex: "\\text{Undefined values}", difficulty: 4, answer: "A", choices: [{ label: "A", text: "$\\csc(180°)$" }, { label: "B", text: "$\\sec(60°)$" }, { label: "C", text: "$\\cot(45°)$" }, { label: "D", text: "$\\sec(0°)$" }], hint: "Csc is undefined where sin is zero.", explanation: "$\\sin(180°)=0$, so $\\csc(180°)$ is undefined." },
        { id: "y11adv-sec-p15", prompt: "Evaluate the expression.", latex: "\\sec^2(60°)", difficulty: 4, answer: "4", hint: "$\\sec(60°)=2$.", explanation: "$\\sec^2(60°)=2^2=4$." },
        { id: "y11adv-sec-p16", prompt: "Evaluate the expression.", latex: "1+\\tan^2(60°)", difficulty: 4, answer: "4", hint: "$\\tan(60°)=\\sqrt3$.", explanation: "$1+(\\sqrt3)^2=1+3=4$." },
        { id: "y11adv-sec-p17", prompt: "Complete the Pythagorean identity. Enter the missing term.", latex: "\\sec^2\\theta=1+\\Box", difficulty: 4, answer: "tan^2x", acceptedAnswers: ["tan^2(x)", "\\tan^2\\theta", "tan^2θ", "\\tan^2x", "tan^2(θ)"], hint: "Divide $\\sin^2\\theta+\\cos^2\\theta=1$ by $\\cos^2\\theta$.", explanation: "$\\sec^2\\theta=1+\\tan^2\\theta$." },
        { id: "y11adv-sec-p18", prompt: "Evaluate the expression.", latex: "\\sec^2\\theta-\\tan^2\\theta", difficulty: 4, answer: "1", hint: "Rearrange $\\sec^2\\theta=1+\\tan^2\\theta$.", explanation: "$\\sec^2\\theta-\\tan^2\\theta=1$." },
        { id: "y11adv-sec-p19", prompt: "Evaluate the expression.", latex: "\\csc^2\\theta-\\cot^2\\theta", difficulty: 4, answer: "1", hint: "Rearrange $\\csc^2\\theta=1+\\cot^2\\theta$.", explanation: "$\\csc^2\\theta-\\cot^2\\theta=1$." },
        // ── Difficulty 5: combine / verify (Band-6) ──────────────────────────
        { id: "y11adv-sec-p20", prompt: "Evaluate the expression.", latex: "\\csc^2(30°)", difficulty: 5, answer: "4", hint: "$\\csc(30°)=2$.", explanation: "$\\csc^2(30°)=2^2=4$." },
        { id: "y11adv-sec-p21", prompt: "Evaluate the expression.", latex: "1+\\cot^2(30°)", difficulty: 5, answer: "4", hint: "$\\cot(30°)=\\sqrt3$.", explanation: "$1+(\\sqrt3)^2=4$, confirming $\\csc^2(30°)=1+\\cot^2(30°)$." },
        { id: "y11adv-sec-p22", prompt: "Evaluate the expression.", latex: "\\sec^2(45°)", difficulty: 5, answer: "2", hint: "$\\sec(45°)=\\sqrt2$.", explanation: "$(\\sqrt2)^2=2$." },
        { id: "y11adv-sec-p23", prompt: "Evaluate the expression.", latex: "\\sec^2(45°)-\\tan^2(45°)", difficulty: 5, answer: "1", hint: "$\\sec^2(45°)=2$ and $\\tan^2(45°)=1$.", explanation: "$2-1=1$, confirming $\\sec^2\\theta-\\tan^2\\theta=1$." },
        { id: "y11adv-sec-p24", prompt: "Find sec²θ given tan θ = 2.", latex: "\\tan\\theta=2", difficulty: 5, answer: "5", hint: "$\\sec^2\\theta=1+\\tan^2\\theta$.", explanation: "$\\sec^2\\theta=1+2^2=5$." },
        { id: "y11adv-sec-p25", prompt: "Find csc²θ given cot θ = 3.", latex: "\\cot\\theta=3", difficulty: 5, answer: "10", hint: "$\\csc^2\\theta=1+\\cot^2\\theta$.", explanation: "$\\csc^2\\theta=1+3^2=10$." },
        { id: "y11adv-sec-p26", prompt: "Evaluate the expression.", latex: "\\sec^2(60°)-\\tan^2(60°)", difficulty: 5, answer: "1", hint: "$\\sec^2(60°)=4$ and $\\tan^2(60°)=3$.", explanation: "$4-3=1$." },
        { id: "y11adv-sec-p27", prompt: "Simplify the expression to a single number.", latex: "\\sec^2\\theta-\\tan^2\\theta+\\csc^2\\theta-\\cot^2\\theta", difficulty: 5, answer: "2", hint: "Each pair equals 1.", explanation: "$1+1=2$." },
        { id: "y11adv-sec-p28", prompt: "Which ratio is the reciprocal of sine?", latex: "\\text{Reciprocal of }\\sin\\theta", difficulty: 5, answer: "C", choices: [{ label: "A", text: "$\\sec\\theta$" }, { label: "B", text: "$\\cot\\theta$" }, { label: "C", text: "$\\csc\\theta$" }, { label: "D", text: "$\\tan\\theta$" }], hint: "Sine pairs with cosecant.", explanation: "$\\csc\\theta=1/\\sin\\theta$." },
        { id: "y11adv-sec-p29", prompt: "Spot the error. A student writes sec²θ = 1 − tan²θ.", latex: "\\sec^2\\theta=1-\\tan^2\\theta", difficulty: 5, answer: "B", choices: [{ label: "A", text: "Sec should be csc" }, { label: "B", text: "The sign is wrong: it should be $+\\tan^2\\theta$" }, { label: "C", text: "Tangent should be cotangent" }, { label: "D", text: "The identity holds only at $45°$" }], hint: "Dividing $\\sin^2+\\cos^2=1$ by $\\cos^2$ gives a plus sign.", explanation: "The correct identity is $\\sec^2\\theta=1+\\tan^2\\theta$." },
        { id: "y11adv-sec-p30", prompt: "Find sec²θ − tan²θ given sec θ = 5/3 and tan θ = 4/3.", latex: "\\sec\\theta=\\frac53,\\quad\\tan\\theta=\\frac43", difficulty: 5, answer: "1", hint: "$(5/3)^2-(4/3)^2$.", explanation: "$\\dfrac{25}{9}-\\dfrac{16}{9}=\\dfrac{9}{9}=1$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-sec-mp1",
          prompt: "Use θ = 60° to verify the identity sec²θ = 1 + tan²θ.",
          latex: "\\sec^2(60°)=1+\\tan^2(60°)",
          answer: "2",
          hint: "Find sec(60°) and tan(60°) using their exact values, then check both sides equal 4.",
          explanation: "(a) sec(60°) = 2. (b) tan(60°) = √3. (c) 1 + (√3)² = 1 + 3 = 4 = sec²(60°). The identity holds.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find sec(60°).",
              latex: "\\sec(60°)",
              marks: 1,
              answer: "2",
              hint: "sec(60°) = 1/cos(60°) = 1/(1/2).",
              explanation: "cos(60°) = 1/2, so sec(60°) = 1 ÷ (1/2) = 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find tan(60°).",
              latex: "\\tan(60°)",
              marks: 1,
              answer: "sqrt(3)",
              acceptedAnswers: ["√3", "\\sqrt{3}", "\\sqrt3"],
              hint: "tan(60°) = sin(60°)/cos(60°) = (√3/2)/(1/2).",
              explanation: "From the 30-60-90 triangle: tan(60°) = √3.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Evaluate 1 + tan²(60°) and confirm it equals sec²(60°).",
              latex: "1+\\tan^2(60°)",
              marks: 2,
              answer: "4",
              hint: "Square your answer from part (b), then add 1.",
              explanation: "tan²(60°) = (√3)² = 3, so 1 + 3 = 4 = sec²(60°). The identity sec²θ = 1 + tan²θ is verified.",
            },
          ],
        },
        {
          id: "y11adv-sec-mp2",
          prompt: "Use θ = 30° to verify the identity csc²θ = 1 + cot²θ.",
          latex: "\\csc^2(30°)=1+\\cot^2(30°)",
          answer: "2",
          hint: "Find csc(30°) and cot(30°) from the special-angle triangles, then check both sides equal 4.",
          explanation: "(a) csc(30°) = 2. (b) cot(30°) = √3. (c) csc²(30°) − cot²(30°) = 4 − 3 = 1, confirming csc²θ = 1 + cot²θ.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find csc(30°).",
              latex: "\\csc(30°)",
              marks: 1,
              answer: "2",
              hint: "csc(30°) = 1/sin(30°) = 1/(1/2).",
              explanation: "sin(30°) = 1/2, so csc(30°) = 1 ÷ (1/2) = 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find cot(30°).",
              latex: "\\cot(30°)",
              marks: 1,
              answer: "sqrt(3)",
              acceptedAnswers: ["√3", "\\sqrt{3}", "\\sqrt3"],
              hint: "cot(30°) = cos(30°)/sin(30°) = (√3/2)/(1/2).",
              explanation: "cos(30°) = √3/2 and sin(30°) = 1/2, so cot(30°) = √3.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find csc²(30°) − cot²(30°).",
              latex: "\\csc^2(30°)-\\cot^2(30°)",
              marks: 2,
              answer: "1",
              hint: "Square your answers from parts (a) and (b), then subtract.",
              explanation: "csc²(30°) = 4 and cot²(30°) = 3, so 4 − 3 = 1. This confirms csc²θ − cot²θ = 1 (equivalently csc²θ = 1 + cot²θ).",
            },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "complementary-angle-identities") {
    return {
      ...base,
      description:
        "Use sin(π/2−θ)=cosθ, cos(π/2−θ)=sinθ, and tan(π/2−θ)=cotθ to simplify expressions and evaluate exact values.",
      learningIntention:
        "Learn the complementary-angle identities and apply them to simplify trig expressions and evaluate exact values at special angles.",
      successCriteria: [
        "State sin(π/2−θ)=cosθ, cos(π/2−θ)=sinθ, and tan(π/2−θ)=cotθ from memory.",
        "Rewrite a complementary expression as a single trig function of θ.",
        "Evaluate exact values using a complementary identity and a known special-angle value.",
        "Simplify compound expressions involving complementary substitution.",
        "Distinguish complementary identities from supplementary related-angle identities.",
      ],
      teaching: {
        paragraphs: [
          "Two angles are complementary when they sum to 90° (or π/2 radians). In a right-angled triangle, the two acute angles are always complementary: the opposite side for one angle is the adjacent side for the other.",
          "That swapped perspective gives the co-function identities: sin(π/2 − θ) = cos θ and cos(π/2 − θ) = sin θ. The co- prefix in cosine, cotangent, and cosecant literally means complement.",
          "For tangent: tan(π/2 − θ) = sin(π/2 − θ)/cos(π/2 − θ) = cos θ/sin θ = cot θ. Complementary arguments swap the numerator and denominator of the tangent ratio.",
          "These identities do not change signs — unlike the supplementary identities for π − θ, the complementary identities only swap function names.",
          "Use the identities to evaluate angles that are easier as a complement. For example, sin(π/2 − π/3) = cos(π/3) = 1/2.",
        ],
        latexBlocks: [
          "\\sin\\!\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cos\\theta,\\quad \\cos\\!\\left(\\frac{\\pi}{2}-\\theta\\right)=\\sin\\theta",
          "\\tan\\!\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cot\\theta",
          "\\sin(90°-\\theta)=\\cos\\theta,\\quad \\cos(90°-\\theta)=\\sin\\theta",
        ],
      },
      workedExamples: [
        {
          title: "Simplify using the complementary identity",
          questionLatex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)",
          steps: [
            { explanation: "Identify this as a complementary-angle form.", latex: "\\frac{\\pi}{2}-x\\text{ is the complement of }x" },
            { explanation: "Apply the identity: sine of a complement equals cosine.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)=\\cos x" },
          ],
          finalAnswerLatex: "\\cos x",
        },
        {
          title: "Evaluate an exact value using a complementary identity",
          questionLatex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)",
          steps: [
            { explanation: "Apply the complementary sine identity.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)=\\cos\\frac{\\pi}{3}" },
            { explanation: "Recall the exact value of cos(π/3).", latex: "\\cos\\frac{\\pi}{3}=\\frac{1}{2}" },
          ],
          finalAnswerLatex: "\\frac{1}{2}",
        },
        {
          title: "Simplify a compound complementary expression",
          questionLatex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)\\cdot\\cos x+\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)\\cdot\\sin x",
          steps: [
            { explanation: "Apply both complementary identities.", latex: "\\cos x\\cdot\\cos x+\\sin x\\cdot\\sin x" },
            { explanation: "Recognise the Pythagorean identity.", latex: "\\cos^2 x+\\sin^2 x=1" },
          ],
          finalAnswerLatex: "1",
        },
      ],
      guidedPractice: [
        conceptChoice(
          "y11adv-cai-g1",
          "Which identity correctly gives the displayed expression?",
          "A",
          [
            "$\\cos\\theta$",
            "$\\sin\\theta$",
            "$-\\cos\\theta$",
            "$-\\sin\\theta$",
          ],
          "Complementary angles swap function names only — no sign change. sin(π/2 − θ) = cos θ.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-\\theta\\right)"
        ),
        exactAnswer(
          "y11adv-cai-g2",
          "Simplify the complementary expression.",
          "\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)",
          "sinx",
          "cos(π/2 − x) = sin x. The complement of x swaps cosine to sine, with no sign change.",
          trigExpressionVariants("sinx"),
          "Apply cos(π/2 − θ) = sin θ directly."
        ),
        exactAnswer(
          "y11adv-cai-g3",
          "Evaluate using a complementary identity.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)",
          "1/2",
          "sin(π/2 − π/3) = cos(π/3) = 1/2.",
          [],
          "Apply sin(π/2 − θ) = cos θ, then recall cos(π/3)."
        ),
        conceptChoice(
          "y11adv-cai-g4",
          "Which expression equals the displayed complementary tangent?",
          "B",
          [
            "$\\tan\\theta$",
            "$\\cot\\theta$",
            "$-\\tan\\theta$",
            "$\\sec\\theta$",
          ],
          "tan(π/2 − θ) = sin(π/2 − θ)/cos(π/2 − θ) = cos θ/sin θ = cot θ.",
          "\\tan\\!\\left(\\frac{\\pi}{2}-\\theta\\right)"
        ),
      ],
      independentPractice: [
        exactAnswer(
          "y11adv-cai-i1",
          "Simplify the complementary expression.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)",
          "cosx",
          "sin(π/2 − x) = cos x. The complement swaps sine to cosine.",
          trigExpressionVariants("cosx"),
          "Apply sin(π/2 − θ) = cos θ directly."
        ),
        conceptChoice(
          "y11adv-cai-i2",
          "Which identity is correct for the displayed expression?",
          "C",
          [
            "$\\cos\\theta$",
            "$-\\sin\\theta$",
            "$\\sin\\theta$",
            "$\\tan\\theta$",
          ],
          "cos(90° − θ) = sin θ — the complement swaps function names, no sign change.",
          "\\cos(90°-\\theta)"
        ),
        exactAnswer(
          "y11adv-cai-i3",
          "Evaluate using a complementary identity.",
          "\\cos(90°-30°)",
          "1/2",
          "cos(90° − 30°) = sin(30°) = 1/2.",
          [],
          "Apply cos(90° − θ) = sin θ, then recall sin(30°)."
        ),
        conceptChoice(
          "y11adv-cai-i4",
          "Which expression correctly simplifies the displayed product?",
          "B",
          [
            "$\\cos x\\cdot\\sin x$",
            "$\\sin x$",
            "$\\cos^2 x$",
            "$\\tan x$",
          ],
          "sin(π/2 − x) = cos x, so the product becomes cos x · tan x = cos x · sin x/cos x = sin x.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)\\cdot\\tan x"
        ),
        exactAnswer(
          "y11adv-cai-i5",
          "Evaluate using a complementary identity.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{6}\\right)",
          "sqrt(3)/2",
          "sin(π/2 − π/6) = cos(π/6) = √3/2.",
          ["√3/2", "\\sqrt{3}/2", "\\frac{\\sqrt{3}}{2}", "(sqrt(3))/2"],
          "Apply sin(π/2 − θ) = cos θ, then recall cos(π/6)."
        ),
      ],
      commonMistakes: [
        { mistake: "Writing sin(π/2 − θ) = sin θ.", fix: "The complement swaps function names: sin(π/2 − θ) = cos θ, not sin θ." },
        { mistake: "Adding a negative sign, e.g. sin(π/2 − θ) = −cos θ.", fix: "Complementary identities do not change signs; only the function name swaps. Sign changes occur in supplementary (π − θ) identities." },
        { mistake: "Confusing complementary (sum to 90°) with supplementary (sum to 180°).", fix: "Complementary angles sum to π/2; supplementary angles sum to π. The complementary identities use π/2 − θ, not π − θ." },
        { mistake: "Applying the identity only in degrees and not radians.", fix: "sin(π/2 − θ) = cos θ and sin(90° − θ) = cos θ are the same identity in different units." },
      ],
      masteryQuiz: [
        conceptChoice(
          "y11adv-cai-m1",
          "Which expression equals the displayed complementary sine?",
          "D",
          [
            "$-\\sin\\theta$",
            "$\\sin\\theta$",
            "$-\\cos\\theta$",
            "$\\cos\\theta$",
          ],
          "sin(π/2 − θ) = cos θ. No sign change; only the function name swaps.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-\\theta\\right)"
        ),
        exactAnswer(
          "y11adv-cai-m2",
          "Simplify the complementary expression.",
          "\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)",
          "sinx",
          "cos(π/2 − x) = sin x. The complement swaps cosine to sine.",
          trigExpressionVariants("sinx"),
          "Apply cos(π/2 − θ) = sin θ directly."
        ),
        conceptChoice(
          "y11adv-cai-m3",
          "Which option correctly evaluates the displayed expression?",
          "C",
          [
            "$\\frac{1}{2}$",
            "$1$",
            "$\\frac{\\sqrt{3}}{2}$",
            "$\\frac{\\sqrt{2}}{2}$",
          ],
          "cos(π/2 − π/3) = sin(π/3) = √3/2.",
          "\\cos\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)"
        ),
        exactAnswer(
          "y11adv-cai-m4",
          "Evaluate using a complementary identity.",
          "\\sin(90°-60°)",
          "1/2",
          "sin(90° − 60°) = cos(60°) = 1/2.",
          [],
          "Apply sin(90° − θ) = cos θ, then recall cos(60°)."
        ),
        conceptChoice(
          "y11adv-cai-m5",
          "Which reason correctly explains why tan(π/2 − θ) = cot θ?",
          "B",
          [
            "Tangent and cotangent are always equal",
            "The complement swaps sine and cosine in the ratio, inverting the tangent",
            "Both are positive in quadrant I",
            "$\\pi/2$ is the period of tangent",
          ],
          "tan = sin/cos; the complement turns it into cos/sin = cot θ.",
          "\\tan\\!\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cot\\theta"
        ),
        exactAnswer(
          "y11adv-cai-m6",
          "Simplify the complementary expression.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)",
          "cosx",
          "sin(π/2 − x) = cos x. This is the first complementary identity.",
          trigExpressionVariants("cosx"),
          "Apply sin(π/2 − θ) = cos θ directly."
        ),
        conceptChoice(
          "y11adv-cai-m7",
          "Which expression correctly simplifies the displayed quotient?",
          "B",
          [
            "$\\tan x$",
            "$\\cot x$",
            "$\\sec x$",
            "$1$",
          ],
          "sin(π/2 − x) = cos x, so the quotient is cos x/sin x = cot x.",
          "\\frac{\\sin(\\pi/2-x)}{\\sin x}"
        ),
        exactAnswer(
          "y11adv-cai-m8",
          "Evaluate using a complementary identity.",
          "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{4}\\right)",
          "sqrt(2)/2",
          "sin(π/2 − π/4) = cos(π/4) = √2/2.",
          ["√2/2", "\\sqrt{2}/2", "\\frac{\\sqrt{2}}{2}", "(sqrt(2))/2"],
          "Apply sin(π/2 − θ) = cos θ, then recall cos(π/4)."
        ),
        conceptChoice(
          "y11adv-cai-m9",
          "A student writes sin(π/2 − x) = sin x. Which option identifies the error?",
          "A",
          [
            "$\\sin(\\pi/2-x)=\\cos x$, not $\\sin x$",
            "The expression should equal $-\\cos x$",
            "Complementary identities apply only in degrees",
            "The identity only holds at $x=\\pi/6$",
          ],
          "The complementary identity swaps sine to cosine, not sine to sine.",
          "\\sin(\\pi/2-x)=\\sin x\\quad(\\text{student's claim})"
        ),
        exactAnswer(
          "y11adv-cai-m10",
          "Evaluate using a complementary identity.",
          "\\cos\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{6}\\right)",
          "1/2",
          "cos(π/2 − π/6) = sin(π/6) = 1/2.",
          [],
          "Apply cos(π/2 − θ) = sin θ, then recall sin(π/6)."
        ),
      ],
      // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
      masteryQuizPool: [
        // ── Difficulty 1: name the identity ──────────────────────────────────
        { id: "y11adv-cai-p1", prompt: "Which expression equals the displayed complementary sine?", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\theta\\right)", difficulty: 1, answer: "D", choices: [{ label: "A", text: "$-\\sin\\theta$" }, { label: "B", text: "$\\sin\\theta$" }, { label: "C", text: "$-\\cos\\theta$" }, { label: "D", text: "$\\cos\\theta$" }], hint: "Sine of a complement becomes cosine; no sign change.", explanation: "$\\sin(\\pi/2-\\theta)=\\cos\\theta$." },
        { id: "y11adv-cai-p2", prompt: "Which expression equals the displayed complementary cosine?", latex: "\\cos\\!\\left(\\frac{\\pi}{2}-\\theta\\right)", difficulty: 1, answer: "B", choices: [{ label: "A", text: "$\\cos\\theta$" }, { label: "B", text: "$\\sin\\theta$" }, { label: "C", text: "$-\\sin\\theta$" }, { label: "D", text: "$-\\cos\\theta$" }], hint: "Cosine of a complement becomes sine.", explanation: "$\\cos(\\pi/2-\\theta)=\\sin\\theta$." },
        { id: "y11adv-cai-p3", prompt: "Which expression equals the displayed complementary tangent?", latex: "\\tan\\!\\left(\\frac{\\pi}{2}-\\theta\\right)", difficulty: 1, answer: "C", choices: [{ label: "A", text: "$\\tan\\theta$" }, { label: "B", text: "$-\\tan\\theta$" }, { label: "C", text: "$\\cot\\theta$" }, { label: "D", text: "$-\\cot\\theta$" }], hint: "Tangent of a complement becomes cotangent.", explanation: "$\\tan(\\pi/2-\\theta)=\\cot\\theta$." },
        // ── Difficulty 2: simplify single expressions ────────────────────────
        { id: "y11adv-cai-p4", prompt: "Simplify the complementary expression.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)", difficulty: 2, answer: "cosx", acceptedAnswers: ["cos(x)", "\\cos x", "\\cos(x)"], hint: "First complementary identity.", explanation: "$\\sin(\\pi/2-x)=\\cos x$." },
        { id: "y11adv-cai-p5", prompt: "Simplify the complementary expression.", latex: "\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)", difficulty: 2, answer: "sinx", acceptedAnswers: ["sin(x)", "\\sin x", "\\sin(x)"], hint: "Second complementary identity.", explanation: "$\\cos(\\pi/2-x)=\\sin x$." },
        { id: "y11adv-cai-p6", prompt: "Simplify the complementary expression.", latex: "\\tan\\!\\left(\\frac{\\pi}{2}-x\\right)", difficulty: 2, answer: "cotx", acceptedAnswers: ["cot(x)", "\\cot x", "\\cot(x)"], hint: "Tangent of a complement is cotangent.", explanation: "$\\tan(\\pi/2-x)=\\cot x$." },
        // ── Difficulty 3: evaluate exact values ──────────────────────────────
        { id: "y11adv-cai-p7", prompt: "Evaluate using a complementary identity.", latex: "\\sin(90°-60°)", difficulty: 3, answer: "1/2", acceptedAnswers: ["0.5"], hint: "$\\sin(90°-\\theta)=\\cos\\theta$.", explanation: "$\\sin(30°)=\\cos(60°)=1/2$." },
        { id: "y11adv-cai-p8", prompt: "Evaluate using a complementary identity.", latex: "\\cos\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{6}\\right)", difficulty: 3, answer: "1/2", acceptedAnswers: ["0.5"], hint: "$\\cos(\\pi/2-\\theta)=\\sin\\theta$.", explanation: "$\\cos(\\pi/2-\\pi/6)=\\sin(\\pi/6)=1/2$." },
        { id: "y11adv-cai-p9", prompt: "Evaluate using a complementary identity.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{4}\\right)", difficulty: 3, answer: "sqrt(2)/2", acceptedAnswers: ["√2/2", "\\sqrt{2}/2", "\\frac{\\sqrt{2}}{2}", "(sqrt(2))/2"], hint: "$\\sin(\\pi/2-\\theta)=\\cos\\theta$.", explanation: "$\\sin(\\pi/2-\\pi/4)=\\cos(\\pi/4)=\\sqrt2/2$." },
        { id: "y11adv-cai-p10", prompt: "Evaluate using a complementary identity.", latex: "\\cos\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)", difficulty: 3, answer: "sqrt(3)/2", acceptedAnswers: ["√3/2", "\\sqrt{3}/2", "\\frac{\\sqrt{3}}{2}", "(sqrt(3))/2"], hint: "$\\cos(\\pi/2-\\theta)=\\sin\\theta$.", explanation: "$\\cos(\\pi/2-\\pi/3)=\\sin(\\pi/3)=\\sqrt3/2$." },
        { id: "y11adv-cai-p11", prompt: "Evaluate using a complementary identity.", latex: "\\cos(90°-30°)", difficulty: 3, answer: "1/2", acceptedAnswers: ["0.5"], hint: "$\\cos(90°-\\theta)=\\sin\\theta$.", explanation: "$\\cos(60°)=\\sin(30°)=1/2$." },
        { id: "y11adv-cai-p12", prompt: "Evaluate using a complementary identity.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)", difficulty: 3, answer: "1/2", acceptedAnswers: ["0.5"], hint: "$\\sin(\\pi/2-\\theta)=\\cos\\theta$.", explanation: "$\\sin(\\pi/2-\\pi/3)=\\cos(\\pi/3)=1/2$." },
        // ── Difficulty 4: compound simplification + reasoning ────────────────
        { id: "y11adv-cai-p13", prompt: "Simplify the quotient to a single trig function.", latex: "\\frac{\\sin(\\pi/2-x)}{\\sin x}", difficulty: 4, answer: "cotx", acceptedAnswers: ["cot(x)", "\\cot x", "\\cot(x)"], hint: "$\\sin(\\pi/2-x)=\\cos x$.", explanation: "$\\dfrac{\\cos x}{\\sin x}=\\cot x$." },
        { id: "y11adv-cai-p14", prompt: "Simplify the quotient to a single trig function.", latex: "\\frac{\\cos(\\pi/2-x)}{\\cos x}", difficulty: 4, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x", "\\tan(x)"], hint: "$\\cos(\\pi/2-x)=\\sin x$.", explanation: "$\\dfrac{\\sin x}{\\cos x}=\\tan x$." },
        { id: "y11adv-cai-p15", prompt: "Which reason explains why tan(π/2 − θ) = cot θ?", latex: "\\tan\\!\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cot\\theta", difficulty: 4, answer: "B", choices: [{ label: "A", text: "Tangent and cotangent are always equal" }, { label: "B", text: "The complement swaps sine and cosine, inverting the ratio" }, { label: "C", text: "Both are positive in quadrant I" }, { label: "D", text: "$\\pi/2$ is the period of tangent" }], hint: "Write tangent as $\\sin/\\cos$.", explanation: "$\\tan(\\pi/2-\\theta)=\\dfrac{\\cos\\theta}{\\sin\\theta}=\\cot\\theta$." },
        { id: "y11adv-cai-p16", prompt: "A student writes sin(π/2 − x) = sin x. Which option identifies the error?", latex: "\\sin(\\pi/2-x)=\\sin x", difficulty: 4, answer: "A", choices: [{ label: "A", text: "$\\sin(\\pi/2-x)=\\cos x$, not $\\sin x$" }, { label: "B", text: "It should equal $-\\cos x$" }, { label: "C", text: "Complementary identities apply only in degrees" }, { label: "D", text: "It holds only at $x=\\pi/6$" }], hint: "Complement swaps the function name.", explanation: "$\\sin(\\pi/2-x)=\\cos x$." },
        { id: "y11adv-cai-p17", prompt: "Which identity changes sign?", latex: "\\text{Complementary vs supplementary}", difficulty: 4, answer: "C", choices: [{ label: "A", text: "$\\sin(\\pi/2-\\theta)=\\cos\\theta$" }, { label: "B", text: "$\\cos(\\pi/2-\\theta)=\\sin\\theta$" }, { label: "C", text: "$\\cos(\\pi-\\theta)=-\\cos\\theta$" }, { label: "D", text: "$\\tan(\\pi/2-\\theta)=\\cot\\theta$" }], hint: "Supplementary ($\\pi-\\theta$) identities can change sign.", explanation: "Only the supplementary identity $\\cos(\\pi-\\theta)=-\\cos\\theta$ changes sign." },
        // ── Difficulty 5: combine (Band-6) ───────────────────────────────────
        { id: "y11adv-cai-p18", prompt: "Simplify the expression to a single number.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)\\cos x+\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)\\sin x", difficulty: 5, answer: "1", hint: "Each complementary term simplifies, then use the Pythagorean identity.", explanation: "$\\cos x\\cos x+\\sin x\\sin x=\\cos^2x+\\sin^2x=1$." },
        { id: "y11adv-cai-p19", prompt: "Simplify the expression to a single number.", latex: "\\sin^2\\!\\left(\\frac{\\pi}{2}-x\\right)+\\cos^2\\!\\left(\\frac{\\pi}{2}-x\\right)", difficulty: 5, answer: "1", hint: "Each square becomes the complement.", explanation: "$\\cos^2x+\\sin^2x=1$." },
        { id: "y11adv-cai-p20", prompt: "Simplify the expression to a single number.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)\\sec x", difficulty: 5, answer: "1", hint: "$\\sin(\\pi/2-x)=\\cos x$ and $\\sec x=1/\\cos x$.", explanation: "$\\cos x\\cdot\\dfrac{1}{\\cos x}=1$." },
        { id: "y11adv-cai-p21", prompt: "Simplify the expression to a single number.", latex: "\\tan\\!\\left(\\frac{\\pi}{2}-x\\right)\\tan x", difficulty: 5, answer: "1", hint: "$\\tan(\\pi/2-x)=\\cot x=1/\\tan x$.", explanation: "$\\cot x\\cdot\\tan x=1$." },
        { id: "y11adv-cai-p22", prompt: "Evaluate the sum exactly.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{6}\\right)+\\cos\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{6}\\right)", difficulty: 5, answer: "(sqrt(3)+1)/2", acceptedAnswers: ["(\\sqrt{3}+1)/2", "(√3+1)/2", "(1+sqrt(3))/2"], hint: "First term $=\\cos(\\pi/6)$, second $=\\sin(\\pi/6)$.", explanation: "$\\sqrt3/2+1/2=(\\sqrt3+1)/2$." },
        { id: "y11adv-cai-p23", prompt: "Simplify the expression to a single number.", latex: "\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)\\csc x", difficulty: 5, answer: "1", hint: "$\\cos(\\pi/2-x)=\\sin x$ and $\\csc x=1/\\sin x$.", explanation: "$\\sin x\\cdot\\dfrac{1}{\\sin x}=1$." },
        { id: "y11adv-cai-p24", prompt: "Simplify the quotient to a single trig function.", latex: "\\frac{\\cos(\\pi/2-x)}{\\sin(\\pi/2-x)}", difficulty: 5, answer: "tanx", acceptedAnswers: ["tan(x)", "\\tan x", "\\tan(x)"], hint: "Numerator $=\\sin x$, denominator $=\\cos x$.", explanation: "$\\dfrac{\\sin x}{\\cos x}=\\tan x$." },
        { id: "y11adv-cai-p25", prompt: "Evaluate the product exactly.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)\\cos\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)", difficulty: 5, answer: "sqrt(3)/4", acceptedAnswers: ["√3/4", "\\sqrt{3}/4", "\\frac{\\sqrt{3}}{4}", "(sqrt(3))/4"], hint: "First $=\\cos(\\pi/3)=1/2$, second $=\\sin(\\pi/3)=\\sqrt3/2$.", explanation: "$(1/2)(\\sqrt3/2)=\\sqrt3/4$." },
        { id: "y11adv-cai-p26", prompt: "Simplify the expression to a single number.", latex: "\\frac{\\sin(\\pi/2-x)}{\\cos x}", difficulty: 5, answer: "1", hint: "$\\sin(\\pi/2-x)=\\cos x$.", explanation: "$\\dfrac{\\cos x}{\\cos x}=1$." },
        { id: "y11adv-cai-p27", prompt: "Evaluate using a complementary identity.", latex: "\\tan\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{6}\\right)", difficulty: 5, answer: "sqrt(3)", acceptedAnswers: ["√3", "\\sqrt{3}", "\\sqrt3"], hint: "$\\tan(\\pi/2-\\theta)=\\cot\\theta$.", explanation: "$\\tan(\\pi/2-\\pi/6)=\\cot(\\pi/6)=\\sqrt3$." },
        { id: "y11adv-cai-p28", prompt: "Evaluate using a complementary identity.", latex: "\\tan\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)", difficulty: 5, answer: "1/sqrt(3)", acceptedAnswers: ["\\sqrt{3}/3", "1/√3", "sqrt(3)/3"], hint: "$\\tan(\\pi/2-\\theta)=\\cot\\theta$.", explanation: "$\\tan(\\pi/2-\\pi/3)=\\cot(\\pi/3)=1/\\sqrt3$." },
        { id: "y11adv-cai-p29", prompt: "Simplify the expression to a single number.", latex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)-\\cos x", difficulty: 5, answer: "0", hint: "$\\sin(\\pi/2-x)=\\cos x$.", explanation: "$\\cos x-\\cos x=0$." },
        { id: "y11adv-cai-p30", prompt: "Simplify the expression to a single trig function squared.", latex: "\\cos^2\\!\\left(\\frac{\\pi}{2}-x\\right)", difficulty: 5, answer: "sin^2x", acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"], hint: "$\\cos(\\pi/2-x)=\\sin x$, then square.", explanation: "$\\cos^2(\\pi/2-x)=\\sin^2x$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-cai-mp1",
          prompt: "Apply both complementary identities to simplify the expression sin(π/2 − x)·cos x + cos(π/2 − x)·sin x.",
          latex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)\\cos x+\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)\\sin x",
          answer: "1",
          hint: "Simplify each complementary expression first, then recognise the resulting identity.",
          explanation:
            "(a) sin(π/2 − x) = cos x. (b) cos(π/2 − x) = sin x. (c) The expression becomes cos²x + sin²x = 1.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Simplify sin(π/2 − x).",
              latex: "\\sin\\!\\left(\\frac{\\pi}{2}-x\\right)",
              marks: 1,
              answer: "cosx",
              acceptedAnswers: ["cos(x)", "\\cosx", "\\cos x", "\\cos(x)"],
              hint: "Apply the first complementary identity.",
              explanation: "sin(π/2 − x) = cos x.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Simplify cos(π/2 − x).",
              latex: "\\cos\\!\\left(\\frac{\\pi}{2}-x\\right)",
              marks: 1,
              answer: "sinx",
              acceptedAnswers: ["sin(x)", "\\sinx", "\\sin x", "\\sin(x)"],
              hint: "Apply the second complementary identity.",
              explanation: "cos(π/2 − x) = sin x.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Substitute and simplify the full expression.",
              latex: "\\cos x\\cdot\\cos x+\\sin x\\cdot\\sin x",
              marks: 2,
              answer: "1",
              hint: "Recognise cos²x + sin²x as the Pythagorean identity.",
              explanation: "cos²x + sin²x = 1 by the Pythagorean identity.",
            },
          ],
        },
        {
          id: "y11adv-cai-mp2",
          prompt: "Use θ = π/3 to verify the complementary identities.",
          latex: "\\theta=\\frac{\\pi}{3}",
          answer: "1/2",
          hint: "Substitute θ = π/3 into each identity and evaluate using exact values.",
          explanation:
            "(a) sin(π/2 − π/3) = cos(π/3) = 1/2. (b) cos(π/2 − π/3) = sin(π/3) = √3/2. (c) (1/2)² + (√3/2)² = 1/4 + 3/4 = 1, confirming sin²(π/3) + cos²(π/3) = 1.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Evaluate sin(π/2 − π/3) using the complementary identity.",
              latex: "\\sin\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)",
              marks: 1,
              answer: "1/2",
              hint: "Apply sin(π/2 − θ) = cos θ with θ = π/3.",
              explanation: "sin(π/2 − π/3) = cos(π/3) = 1/2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Evaluate cos(π/2 − π/3) using the complementary identity.",
              latex: "\\cos\\!\\left(\\frac{\\pi}{2}-\\frac{\\pi}{3}\\right)",
              marks: 1,
              answer: "sqrt(3)/2",
              acceptedAnswers: ["√3/2", "\\sqrt{3}/2", "\\frac{\\sqrt{3}}{2}", "(sqrt(3))/2"],
              hint: "Apply cos(π/2 − θ) = sin θ with θ = π/3.",
              explanation: "cos(π/2 − π/3) = sin(π/3) = √3/2.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find sin²(π/3) + cos²(π/3) using your answers from (a) and (b).",
              latex: "\\sin^2\\!\\left(\\frac{\\pi}{3}\\right)+\\cos^2\\!\\left(\\frac{\\pi}{3}\\right)",
              marks: 2,
              answer: "1",
              hint: "Square the values from parts (a) and (b) and add.",
              explanation: "(√3/2)² + (1/2)² = 3/4 + 1/4 = 1. The Pythagorean identity is confirmed.",
            },
          ],
        },
      ],
    };
  }

  return null;
}

