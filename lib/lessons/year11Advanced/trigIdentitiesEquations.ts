import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import {
  formatChoiceText,
  practicalChoice,
  formulaAnswer as baseFormulaAnswer,
} from "../questionHelpers";

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
    const relatedTriangle: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing P at angle theta in quadrant I, Q at pi minus theta in quadrant II, and R at pi plus theta in quadrant III; horizontal segment PQ and vertical segment QR form a right angle at Q.",
      angleRadians: "theta, pi - theta, pi + theta",
      quadrant: 1,
      referenceAngle: "theta",
      terminalPoint: {
        x: "cos(theta)",
        y: "sin(theta)",
        label: "P",
      },
      symmetryPoints: [
        { x: "-cos(theta)", y: "sin(theta)", label: "Q" },
        { x: "-cos(theta)", y: "-sin(theta)", label: "R" },
      ],
      highlightRadius: true,
      notes: [
        "P and Q share a y-coordinate; Q and R share an x-coordinate.",
      ],
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
        {
          ...qualityChoice({
            id: "y11adv-relang-qm1",
            prompt:
              "A first-quadrant point has coordinates $(a,b)$. Which coordinates represent the related angle $\\pi-\\theta$?",
            latex: "(\\cos\\theta,\\sin\\theta)=(a,b)",
            answer: "C",
            choices: ["$(a,-b)$", "$(-a,-b)$", "$(-a,b)$", "$(b,-a)$"],
            hint: "Reflect the point across the y-axis and track which coordinate changes sign.",
            explanation:
              "The angle $\\pi-\\theta$ is the reflection of $\\theta$ across the y-axis. Its x-coordinate changes from $a$ to $-a$, while its y-coordinate remains $b$, giving $(-a,b)$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks whether the student connects the quadrant-II related-angle identities with the underlying coordinate reflection.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Reflects across the x-axis, producing the quadrant-IV point.",
              B: "Applies a half-turn and changes both coordinate signs.",
              D: "Swaps coordinates as though related angles were complementary angles.",
            },
          }),
          unitCircleDiagram: q2Sin,
        },
        qualityAnswer({
          id: "y11adv-relang-qm2",
          prompt: "Simplify the expression for acute $\\theta$.",
          latex: "\\cos(\\pi+\\theta)+\\cos\\theta",
          answer: "0",
          acceptedAnswers: ["0.0", "zero", "=0"],
          hint: "Replace the quadrant-III cosine before combining like terms.",
          explanation:
            "The related-angle identity is $\\cos(\\pi+\\theta)=-\\cos\\theta$. Therefore the two terms are opposites and their sum is $-\\cos\\theta+\\cos\\theta=0$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks direct use of a quadrant-III identity followed by symbolic cancellation.",
          taskType: "procedural",
        }),
        {
          ...qualityAnswer({
            id: "y11adv-relang-qm3",
            prompt: "Evaluate the expression exactly.",
            latex: "\\sin\\left(\\frac{11\\pi}{6}\\right)+\\cos\\left(\\frac{5\\pi}{6}\\right)",
            answer: "-(1+sqrt(3))/2",
            acceptedAnswers: [
              "(-1-sqrt(3))/2",
              "-(sqrt(3)+1)/2",
              "\\frac{-1-\\sqrt3}{2}",
              "-\\frac{1+\\sqrt3}{2}",
            ],
            hint: "Write each angle using its acute pi-over-six reference angle, including the quadrant sign.",
            explanation:
              "Since $11\\pi/6=2\\pi-\\pi/6$, its sine is $-1/2$. Since $5\\pi/6=\\pi-\\pi/6$, its cosine is $-\\sqrt3/2$. Their sum is $-(1+\\sqrt3)/2$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks whether the student can coordinate two different related-angle forms and combine their exact values.",
            taskType: "problem-solving",
          }),
          unitCircleDiagram: q4Sin,
        },
        {
          ...qualityChoice({
            id: "y11adv-relang-qm4",
            prompt:
              "A student writes $\\tan(\\pi+\\theta)=-\\tan\\theta$ because $\\pi+\\theta$ is beyond $\\pi$. Which diagnosis is correct?",
            latex: "",
            answer: "B",
            choices: [
              "The claim is correct because every ratio is negative beyond $\\pi$.",
              "Both sine and cosine change sign in quadrant III, so their ratio remains $\\tan\\theta$.",
              "Only cosine changes sign in quadrant III, so tangent is negative.",
              "Tangent becomes cotangent after a half-turn.",
            ],
            hint: "Express tangent as the ratio of the signed y- and x-coordinates.",
            explanation:
              "At $\\pi+\\theta$, both coordinates are negated: sine is $-\\sin\\theta$ and cosine is $-\\cos\\theta$. Their quotient is positive, so $\\tan(\\pi+\\theta)=\\tan\\theta$.",
            difficulty: 3,
            diagnosticIntent:
              "Targets sign reasoning that treats tangent as a single coordinate rather than a quotient of two signed coordinates.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Assigns one blanket sign to all ratios in the lower half-plane.",
              C: "Changes only the cosine sign and ignores the negative sine coordinate.",
              D: "Confuses half-turn symmetry with complementary-angle co-functions.",
            },
          }),
          unitCircleDiagram: q3Sin,
        },
        qualityAnswer({
          id: "y11adv-relang-qm5",
          prompt:
            "For acute $\\theta$, the given related-angle value is known. Find $\\cos(\\pi-\\theta)$.",
          latex: "\\sin(\\pi+\\theta)=-\\frac35",
          answer: "-4/5",
          acceptedAnswers: ["-0.8", "-\\frac45", "-\\frac{4}{5}", "-(4/5)"],
          hint: "Recover the positive first-quadrant sine and cosine values, then apply the quadrant-II cosine sign.",
          explanation:
            "Because $\\sin(\\pi+\\theta)=-\\sin\\theta$, we have $\\sin\\theta=3/5$. Acute $\\theta$ gives $\\cos\\theta=4/5$. Therefore $\\cos(\\pi-\\theta)=-\\cos\\theta=-4/5$.",
          difficulty: 4,
          diagnosticIntent:
            "Requires reversing one related-angle identity, recovering a missing exact coordinate, and applying a second symmetry.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-relang-qm6",
          prompt: "Simplify the expression for acute $\\theta$.",
          latex: "\\sin(\\pi-\\theta)+\\sin(2\\pi-\\theta)",
          answer: "0",
          acceptedAnswers: ["0.0", "zero", "=0"],
          hint: "Compare the sine signs produced by reflection in the y-axis and reflection in the x-axis.",
          explanation:
            "Quadrant-II reflection gives $\\sin(\\pi-\\theta)=\\sin\\theta$, while quadrant-IV reflection gives $\\sin(2\\pi-\\theta)=-\\sin\\theta$. The terms cancel, so the expression is 0.",
          difficulty: 4,
          diagnosticIntent:
            "Checks simultaneous comparison of two symmetry identities rather than isolated recall of one formula.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-relang-qm7",
          prompt:
            "For integers $0\\le n\\le6$ and acute $\\theta$, how many values of $n$ satisfy the identity shown?",
          latex: "\\cos(n\\pi+\\theta)=\\cos\\theta",
          answer: "4",
          acceptedAnswers: ["4 values", "n=0,2,4,6", "four", "4.0"],
          hint: "Test the effect of successive half-turns and look for an alternating sign pattern.",
          explanation:
            "Adding one $\\pi$ changes the cosine sign; adding a second restores it. Thus equality holds for the even values $n=0,2,4,6$ and fails for odd $n$. There are 4 valid values.",
          difficulty: 4,
          diagnosticIntent:
            "Uses bounded cases to generalise the alternating effect of repeated half-turns on cosine.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-relang-qm8",
          prompt:
            "For acute $\\theta$, a student claims $\\sin(\\pi-\\theta)=\\sin(\\pi+\\theta)$ because both angles have reference angle $\\theta$. Which assessment is correct?",
          latex: "",
          answer: "D",
          choices: [
            "The claim is correct because reference angles determine both magnitude and sign.",
            "The claim is correct only when $\\theta=\\pi/4$.",
            "The left side is negative and the right side is positive.",
            "The magnitudes agree, but the left side is positive and the right side is negative.",
          ],
          hint: "The reference angle fixes magnitude; use the quadrant of each related angle to fix sign.",
          explanation:
            "The angle $\\pi-\\theta$ is in quadrant II, so its sine is $+\\sin\\theta$. The angle $\\pi+\\theta$ is in quadrant III, so its sine is $-\\sin\\theta$. Their magnitudes match but their signs do not.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses the overgeneralisation that a common reference angle guarantees equal signed trigonometric values.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats a reference angle as determining sign as well as magnitude.",
            B: "Assumes a benchmark acute angle overrides the quadrant sign.",
            C: "Reverses the quadrant-II and quadrant-III sine signs.",
          },
        }),
        {
          ...qualityAnswer({
            id: "y11adv-relang-qm9",
            prompt:
              "Let $P$, $Q$, and $R$ be the unit-circle points at angles $\\theta$, $\\pi-\\theta$, and $\\pi+\\theta$. If $\\tan\\theta=3/4$ and $\\theta$ is acute, find the exact area of triangle $PQR$.",
            latex: "P=(\\cos\\theta,\\sin\\theta)",
            answer: "24/25",
            acceptedAnswers: ["0.96", "\\frac{24}{25}", "24÷25", "24/25 square units"],
            hint: "Use the related-angle coordinates; the triangle has perpendicular horizontal and vertical side lengths.",
            explanation:
              "From $\\tan\\theta=3/4$, $(\\cos\\theta,\\sin\\theta)=(4/5,3/5)$. Thus $Q=(-4/5,3/5)$ and $R=(-4/5,-3/5)$. The perpendicular side lengths are $8/5$ and $6/5$, so the area is $\\tfrac12(8/5)(6/5)=24/25$.",
            difficulty: 5,
            diagnosticIntent:
              "Synthesises a tangent ratio, exact unit-circle coordinates, two related-angle transformations, and coordinate geometry.",
            taskType: "synthesis",
          }),
          unitCircleDiagram: relatedTriangle,
        },
        qualityAnswer({
          id: "y11adv-relang-qm10",
          prompt:
            "The two statements are identities for every acute $\\theta$. Find $b$.",
          latex:
            "\\begin{aligned}a\\sin(\\pi-\\theta)+b\\sin(\\pi+\\theta)+c\\sin(2\\pi-\\theta)&=2\\sin\\theta,\\\\a\\cos(\\pi-\\theta)+b\\cos(\\pi+\\theta)+c\\cos(2\\pi-\\theta)&=4\\cos\\theta.\\end{aligned}",
          answer: "-3",
          acceptedAnswers: ["b=-3", "b = -3", "-3.0"],
          hint: "Replace every related angle, then add the two resulting coefficient equations.",
          explanation:
            "The sine identity gives $a-b-c=2$. The cosine signs give $-a-b+c=4$. Adding eliminates $a$ and $c$: $-2b=6$, so $b=-3$.",
          difficulty: 5,
          diagnosticIntent:
            "Requires coordinated sign substitution across all three related-angle families and elimination of nuisance parameters.",
          taskType: "synthesis",
        }),
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
        exactAnswer("y11adv-trigeq-basic-g1", "Find the reference angle in degrees.", "\\cos x=\\frac{\\sqrt3}{2}", "30", "The acute angle with cosine equal to square root three over two is 30 degrees, so the reference angle is 30 degrees.", ["30°", "30 degrees", "30deg"]),
        conceptChoice("y11adv-trigeq-basic-g2", "Choose the solution pair.", "B", ["$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$", "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$"], "Sine is positive in quadrants I and II, so the solutions are pi/6 and 5pi/6.", "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trigeq-basic-g3", "Find the smaller solution.", "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", "pi/3", "Cosine is positive in quadrants I and IV. The smaller solution is the reference angle pi/3.", piVariants("pi/3")),
        conceptChoice("y11adv-trigeq-basic-g4", "Choose the correct period for tangent equations.", "A", ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$4\\pi$"], "Tangent repeats every pi, so the next tangent solution is one pi after the first.", "\\tan x=a"),
      ],
      independentPractice: [
        exactAnswer("y11adv-trigeq-basic-i1", "Find the larger solution.", "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi", "5pi/3", "Cosine is positive in quadrants I and IV, so the larger solution is 2pi - pi/3 = 5pi/3.", piVariants("5pi/3")),
        conceptChoice("y11adv-trigeq-basic-i2", "Choose the solution pair.", "C", ["$x=\\frac{\\pi}{4},\\frac{3\\pi}{4}$", "$x=\\frac{3\\pi}{4},\\frac{5\\pi}{4}$", "$x=\\frac{5\\pi}{4},\\frac{7\\pi}{4}$", "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$"], "Sine is negative in quadrants III and IV, and the reference angle is pi over four, so the solutions are 5pi/4 and 7pi/4.", "\\sin x=-\\frac{\\sqrt2}{2},\\quad 0\\le x<2\\pi"),
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
        qualityChoice({
          id: "y11adv-trigeq-basic-qm1",
          prompt:
            "A student lists $x=0,\\pi$ for $\\sin x=0$ on $0\\le x\\le2\\pi$. Which correction is required?",
          latex: "",
          answer: "C",
          choices: [
            "Remove $x=0$ because it is an endpoint.",
            "Replace $x=\\pi$ with $x=\\pi/2$.",
            "Add $x=2\\pi$ because the upper endpoint is included.",
            "Add $x=3\\pi$ because sine has period $2\\pi$.",
          ],
          hint: "Check both inequality signs in the closed interval before rejecting or adding endpoint solutions.",
          explanation:
            "Sine is zero at integer multiples of $\\pi$. The closed interval includes $0$, $\\pi$, and $2\\pi$, so the missing solution is the included upper endpoint $2\\pi$.",
          difficulty: 3,
          diagnosticIntent:
            "Targets incomplete endpoint checking when a closed interval contains two representations of the same unit-circle position.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats a closed lower endpoint as excluded.",
            B: "Confuses a zero of sine with a maximum of sine.",
            D: "Adds a periodic solution without filtering it against the upper bound.",
          },
        }),
        {
          ...qualityAnswer({
            id: "y11adv-trigeq-basic-qm2",
            prompt:
              "Solve the equation in degrees. Enter the complete solution set.",
            latex: "\\cos x=-\\frac12,\\qquad 0^\\circ\\le x<360^\\circ",
            answer: "120,240",
            acceptedAnswers: [
              "120°,240°",
              "120 degrees, 240 degrees",
              "x=120,240",
              "{120,240}",
            ],
            hint: "Use a 60-degree reference angle and the two quadrants where cosine is negative.",
            explanation:
              "The reference angle is $60^\\circ$. Cosine is negative in quadrants II and III, giving $x=180^\\circ-60^\\circ=120^\\circ$ and $x=180^\\circ+60^\\circ=240^\\circ$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks complete degree-mode solution production with a half-open interval and correct quadrant selection.",
            taskType: "procedural",
          }),
          unitCircleDiagram: cosineNegative,
        },
        qualityAnswer({
          id: "y11adv-trigeq-basic-qm3",
          prompt:
            "Solve the tangent equation on the stated radian interval. Enter both solutions.",
          latex: "\\tan x=-\\sqrt3,\\qquad 0\\le x<2\\pi",
          answer: "2pi/3,5pi/3",
          acceptedAnswers: solutionSetVariants(["2pi/3", "5pi/3"]),
          hint: "Use a pi-over-three reference angle and tangent's negative quadrants.",
          explanation:
            "The reference angle is $\\pi/3$. Tangent is negative in quadrants II and IV, so the solutions are $\\pi-\\pi/3=2\\pi/3$ and $2\\pi-\\pi/3=5\\pi/3$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks exact tangent solutions using sign, reference angle, and a half-open radian domain.",
          taskType: "procedural",
        }),
        {
          ...qualityChoice({
            id: "y11adv-trigeq-basic-qm4",
            prompt:
              "A student solves the radian equation by writing $x=30,150$. Which diagnosis is correct?",
            latex: "\\sin x=\\frac12,\\qquad 0\\le x<2\\pi",
            answer: "B",
            choices: [
              "The two numbers are correct because angles have no units.",
              "The quadrants are correct, but the answers must be $\\pi/6$ and $5\\pi/6$ in this radian interval.",
              "Only $30$ should be retained because sine has one positive solution.",
              "The answers should be $\\pi/3$ and $2\\pi/3$ because the reference angle is 60 degrees.",
            ],
            hint: "Match the form of each answer to the units used by the interval.",
            explanation:
              "The student identified the correct degree angles but ignored the radian domain. Converting gives $30^\\circ=\\pi/6$ and $150^\\circ=5\\pi/6$, which are the required solutions.",
            difficulty: 3,
            diagnosticIntent:
              "Diagnoses a unit mismatch after otherwise correct reference-angle and quadrant reasoning.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Treats degree measures as interchangeable with radian numbers.",
              C: "Drops the quadrant-II solution.",
              D: "Uses the cosine value associated with a pi-over-three reference angle.",
            },
          }),
          unitCircleDiagram: sineHalf,
        },
        qualityAnswer({
          id: "y11adv-trigeq-basic-qm5",
          prompt:
            "The equation has exactly the displayed solution pair on $0\\le x<2\\pi$. Find the positive constant $k$.",
          latex: "k\\sin x=1,\\qquad x=\\frac{\\pi}{6},\\frac{5\\pi}{6}",
          answer: "2",
          acceptedAnswers: ["k=2", "k = 2", "2.0"],
          hint: "Substitute either stated solution and use its exact sine value.",
          explanation:
            "Both listed angles have sine $1/2$. Substitution gives $k(1/2)=1$, hence $k=2$. The resulting equation $\\sin x=1/2$ has exactly the stated pair on the half-open interval.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses direct equation solving by requiring inference of a coefficient from a complete solution set.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-trigeq-basic-qm6",
          prompt:
            "For each $k$ in the set, count the solutions of $\\cos x=k$ on $0\\le x\\le2\\pi$. Find the total across the three equations.",
          latex: "k\\in\\{-1,0,1\\}",
          answer: "5",
          acceptedAnswers: ["5 solutions", "1+2+2=5", "five", "5.0"],
          hint: "Treat the maximum value at both included endpoints separately from the minimum and the zeros.",
          explanation:
            "For $k=-1$ there is one solution, $x=\\pi$. For $k=0$ there are two, $\\pi/2$ and $3\\pi/2$. For $k=1$, both endpoints $0$ and $2\\pi$ are solutions. The total is $1+2+2=5$.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a bounded family while checking extrema, zeros, and distinct closed-interval endpoints.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-trigeq-basic-qm7",
          prompt:
            "A temperature model covers one 12-hour cycle. Find the two times when the temperature is $22.5^\\circ$.",
          latex: "T(t)=20+5\\cos\\left(\\frac{\\pi t}{6}\\right),\\qquad 0\\le t\\le12",
          answer: "2,10",
          acceptedAnswers: ["t=2,10", "2 hours, 10 hours", "{2,10}", "2 and 10"],
          hint: "Set the model equal to 22.5, isolate cosine, then convert the angle solutions back to time.",
          explanation:
            "Setting $T=22.5$ gives $\\cos(\\pi t/6)=1/2$. Over one cycle the angles are $\\pi/3$ and $5\\pi/3$. Therefore $t=2$ or $t=10$ hours.",
          difficulty: 4,
          diagnosticIntent:
            "Checks translation from a contextual threshold to a basic cosine equation and back to the model variable.",
          taskType: "synthesis",
        }),
        qualityChoice({
          id: "y11adv-trigeq-basic-qm8",
          prompt:
            "How many solutions does $\\tan x=1$ have on $0^\\circ\\le x\\le720^\\circ$?",
          latex: "",
          answer: "D",
          choices: ["1", "2", "3", "4"],
          hint: "Start at 45 degrees and keep adding tangent's 180-degree period while the domain allows it.",
          explanation:
            "The tangent family is $x=45^\\circ+180^\\circ n$. The values in the interval are $45^\\circ$, $225^\\circ$, $405^\\circ$, and $585^\\circ$, giving 4 solutions.",
          difficulty: 5,
          diagnosticIntent:
            "Tests systematic periodic searching on a domain longer than one revolution rather than a memorised two-solution rule.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Reports only the reference-angle solution.",
            B: "Searches only the first revolution.",
            C: "Stops one valid tangent period too early.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trigeq-basic-qm9",
          prompt:
            "Find the solution satisfying both conditions on the stated interval.",
          latex: "\\sin x=\\frac12,\\quad \\cos x>0,\\qquad 0\\le x<2\\pi",
          answer: "pi/6",
          acceptedAnswers: ["\\pi/6", "π/6", "x=pi/6", "30 degrees", "30°"],
          hint: "Generate both sine solutions, then use the cosine sign to keep the correct quadrant.",
          explanation:
            "The sine equation gives $x=\\pi/6$ or $5\\pi/6$. Cosine is positive in quadrant I and negative in quadrant II, so only $x=\\pi/6$ satisfies the second condition.",
          difficulty: 5,
          diagnosticIntent:
            "Requires complete solution generation followed by filtering with an independent sign constraint.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-trigeq-basic-qm10",
          prompt:
            "Find the sum of all solutions on the stated extended interval.",
          latex: "\\cos x=0,\\qquad -\\pi\\le x\\le3\\pi",
          answer: "4pi",
          acceptedAnswers: ["4\\pi", "4π", "$4\\pi$", "pi*4"],
          hint: "List the pi-over-two family across the whole interval, including negative angles, before adding.",
          explanation:
            "Cosine is zero at $x=\\pi/2+n\\pi$. The interval contains $-\\pi/2$, $\\pi/2$, $3\\pi/2$, and $5\\pi/2$. Their sum is $(-1+1+3+5)\\pi/2=4\\pi$.",
          difficulty: 5,
          diagnosticIntent:
            "Uses a nonstandard interval to test periodic family generation, boundary filtering, negative angles, and aggregation.",
          taskType: "investigative",
        }),
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
        qualityChoice({
          id: "y11adv-trigeq-adv-qm1",
          prompt:
            "A student divides both sides by $\\sin x$ before solving. Which diagnosis is correct?",
          latex:
            "\\sin x(2\\cos x-1)=0,\\qquad 0\\le x\\le2\\pi",
          answer: "C",
          choices: [
            "The division is valid because the right-hand side is zero.",
            "The division changes the equation into a Pythagorean identity.",
            "The division loses the branch $\\sin x=0$ and therefore loses valid solutions.",
            "The division creates an extra branch $\\cos x=0$.",
          ],
          hint:
            "Before cancelling a factor, ask whether that factor can itself equal zero.",
          explanation:
            "The zero-product rule gives $\\sin x=0$ or $2\\cos x-1=0$. Dividing by $\\sin x$ assumes it is non-zero, so the valid solutions $0$, $\\pi$, and $2\\pi$ from the first branch disappear.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses unsafe cancellation of a trigonometric factor and whether the learner protects the zero branch.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes cancellation is automatically reversible in a zero-product equation.",
            B: "Confuses algebraic factorisation with use of a trigonometric identity.",
            D: "Invents a cosine-zero branch that is not produced by either factor.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trigeq-adv-qm2",
          prompt:
            "Solve both zero-product branches and enter the number of distinct solutions in the closed interval.",
          latex:
            "\\sin x(2\\cos x-1)=0,\\qquad 0\\le x\\le2\\pi",
          answer: "5",
          acceptedAnswers: ["5 solutions", "five", "5.0"],
          hint:
            "Solve $\\sin x=0$ and $\\cos x=1/2$ separately, then combine their solution sets.",
          explanation:
            "The branch $\\sin x=0$ gives $x=0,\\pi,2\\pi$. The branch $\\cos x=1/2$ gives $x=\\pi/3,5\\pi/3$. None overlap, so the closed interval contains 5 distinct solutions.",
          difficulty: 3,
          diagnosticIntent:
            "Checks complete zero-product reasoning, exact-angle solving, endpoint inclusion, and distinct-solution counting.",
          taskType: "procedural",
        }),
        qualityAnswer({
          id: "y11adv-trigeq-adv-qm3",
          prompt:
            "Solve the squared equation using both square-root branches, then enter the sum of all solutions.",
          latex: "\\cos^2x=\\frac34,\\qquad 0\\le x<2\\pi",
          answer: "4pi",
          acceptedAnswers: ["4\\pi", "4π", "$4\\pi$", "pi*4"],
          hint:
            "Use $\\cos x=\\pm\\sqrt3/2$, list all four exact angles, and then add them.",
          explanation:
            "Taking square roots gives $\\cos x=\\sqrt3/2$ or $\\cos x=-\\sqrt3/2$. The four solutions are $\\pi/6,5\\pi/6,7\\pi/6,11\\pi/6$, whose sum is $24\\pi/6=4\\pi$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether both square-root signs are retained before exact quadrants are generated and aggregated.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-trigeq-adv-qm4",
          prompt:
            "Which factorisation is equivalent to the equation and keeps every solution branch?",
          latex: "2\\sin^2x+\\sin x-1=0",
          answer: "B",
          choices: [
            "$(2\\sin x+1)(\\sin x+1)=0$",
            "$(2\\sin x-1)(\\sin x+1)=0$",
            "$\\sin x(2\\sin x+1)=1$",
            "$(2\\sin x-1)(\\sin x-1)=0$",
          ],
          hint:
            "Expand each candidate mentally and check both the middle term and constant term.",
          explanation:
            "Expanding $(2\\sin x-1)(\\sin x+1)$ gives $2\\sin^2x+\\sin x-1$. It therefore preserves the two branches $\\sin x=1/2$ and $\\sin x=-1$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks algebraic factorisation of a quadratic in one trigonometric ratio before any angle solving begins.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Chooses factors whose middle and constant terms have the wrong signs.",
            C: "Extracts a factor without preserving equality to zero.",
            D: "Uses two negative constants and produces the wrong middle and constant terms.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trigeq-adv-qm5",
          prompt:
            "The displayed set is the complete solution set. Find the positive constant $k$.",
          latex:
            "\\sin x(\\sin x-k)=0,\\quad 0\\le x\\le2\\pi,\\qquad x=0,\\frac{\\pi}{3},\\frac{2\\pi}{3},\\pi,2\\pi",
          answer: "sqrt(3)/2",
          acceptedAnswers: [
            "\\sqrt3/2",
            "\\frac{\\sqrt3}{2}",
            "√3/2",
            "sqrt3/2",
            "k=sqrt(3)/2",
          ],
          hint:
            "The non-zero-factor branch must produce the two non-axis angles in the stated set.",
          explanation:
            "The factor $\\sin x=0$ accounts for $0,\\pi,2\\pi$. The remaining angles $\\pi/3$ and $2\\pi/3$ both have sine $\\sqrt3/2$, so the second branch requires $k=\\sqrt3/2$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses zero-product solving by asking the learner to infer a factor parameter from a complete solution set.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-trigeq-adv-qm6",
          prompt:
            "Student A divides by $\\cos x$ and solves only $\\sin x=1$. Student B uses the zero-product rule. How many distinct valid solutions does Student A lose?",
          latex:
            "\\cos x(\\sin x-1)=0,\\qquad 0\\le x<2\\pi",
          answer: "1",
          acceptedAnswers: ["1 solution", "one", "1.0"],
          hint:
            "Compare the union of both factor branches with the solution retained after division.",
          explanation:
            "The zero-product branches are $\\cos x=0$, giving $\\pi/2,3\\pi/2$, and $\\sin x=1$, giving $\\pi/2$. Student A retains $\\pi/2$ but loses the distinct solution $3\\pi/2$, so exactly 1 is lost.",
          difficulty: 4,
          diagnosticIntent:
            "Requires comparison of two solution methods while accounting for overlap between their resulting branches.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-trigeq-adv-qm7",
          prompt:
            "For each listed value of $k$, count the distinct solutions of the equation on the closed interval. Enter the total across all three equations.",
          latex:
            "(\\sin x-k)\\cos x=0,\qquad k\\in\\{-1,0,1\\},\qquad 0\\le x\\le2\\pi",
          answer: "9",
          acceptedAnswers: ["9 solutions", "2+5+2=9", "nine", "9.0"],
          hint:
            "For each value of $k$, take the union of $\\sin x=k$ and $\\cos x=0$ without double-counting overlaps.",
          explanation:
            "For $k=-1$, the sine solution overlaps a cosine zero, giving 2 distinct solutions. For $k=0$ there are 5. For $k=1$, the sine solution again overlaps, giving 2. Thus the total is $2+5+2=9$.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a parameter family and tests union counting when zero-product branches overlap at special values.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-trigeq-adv-qm8",
          prompt:
            "How many distinct solutions does the equation have on the extended closed interval?",
          latex:
            "\\tan x(\\tan x-1)=0,\\qquad 0\\le x\\le4\\pi",
          answer: "D",
          choices: ["4", "5", "8", "9"],
          hint:
            "Generate the $\\tan x=0$ and $\\tan x=1$ families separately, including both endpoints.",
          explanation:
            "The branch $\\tan x=0$ gives $0,\\pi,2\\pi,3\\pi,4\\pi$, or 5 values. The branch $\\tan x=1$ gives four values from $\\pi/4$ to $13\\pi/4$. They do not overlap, so there are 9 solutions.",
          difficulty: 5,
          diagnosticIntent:
            "Tests periodic branch generation beyond one revolution together with closed-endpoint and union counting.",
          taskType: "investigative",
          distractorMisconceptions: {
            A: "Counts only one of the two branches over two standard revolutions.",
            B: "Counts the tangent-zero family but ignores the tangent-one family.",
            C: "Treats the two included endpoints of the tangent-zero family as one angle.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trigeq-adv-qm9",
          prompt:
            "Use an identity, factorise the resulting equation, and enter the sum of all distinct solutions.",
          latex:
            "2(1-\\cos^2x)-\\sin x=0,\qquad 0\\le x\\le2\\pi",
          answer: "4pi",
          acceptedAnswers: ["4\\pi", "4π", "$4\\pi$", "pi*4"],
          hint:
            "Replace $1-\\cos^2x$ with $\\sin^2x$, then use the zero-product rule.",
          explanation:
            "The identity gives $2\\sin^2x-\\sin x=0$, so $\\sin x(2\\sin x-1)=0$. The solutions are $0,\\pi,2\\pi,\\pi/6,5\\pi/6$, and their sum is $4\\pi$.",
          difficulty: 5,
          diagnosticIntent:
            "Combines identity selection, algebraic factorisation, complete branch solving, endpoint control, and aggregation.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-trigeq-adv-qm10",
          prompt:
            "A quadratic trigonometric equation has exactly the two value branches shown and constant term $-1$. Determine the ordered pair $(a,b)$.",
          latex:
            "a\\sin^2x+b\\sin x-1=0,\qquad \\sin x=1\\text{ or }\\sin x=-\\frac12",
          answer: "2,-1",
          acceptedAnswers: [
            "(2,-1)",
            "a=2,b=-1",
            "a = 2, b = -1",
            "2; -1",
          ],
          hint:
            "Build a quadratic from the two roots, then scale it so that the constant term is minus one.",
          explanation:
            "With $u=\\sin x$, the roots give $(u-1)(u+1/2)=0$. Multiplying by 2 produces $2u^2-u-1=0$. Comparing coefficients shows $a=2$ and $b=-1$.",
          difficulty: 5,
          diagnosticIntent:
            "Reverses the entire factorisation process by synthesising a trig quadratic from prescribed value branches.",
          taskType: "synthesis",
        }),
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
        exactAnswer("y11adv-trigproof-g3", "Simplify after rewriting tangent.", "\\tan x\\cos^2x", "sinxcosx", "Rewrite tangent as sin x over cos x, then cancel one cosine factor. The remaining product is sin x cos x.", ["sin x cos x", "\\sin x\\cos x", "\\sin(x)\\cos(x)", "sinx*cosx"]),
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
        qualityChoice({
          id: "y11adv-trigproof-qm1",
          prompt:
            "Which first step most directly begins a proof by simplifying the left-hand side?",
          latex: "\\frac{1-\\cos^2x}{\\sin x}=\\sin x",
          answer: "B",
          choices: [
            "Replace $\\sin x$ in the denominator with $1-\\cos x$.",
            "Replace $1-\\cos^2x$ with $\\sin^2x$.",
            "Multiply both sides by $\\tan x$.",
            "Set both sides equal to zero.",
          ],
          hint:
            "Look for a complete numerator that matches a rearrangement of the Pythagorean identity.",
          explanation:
            "The numerator is exactly $1-\\cos^2x=\\sin^2x$. The left side then becomes $\\sin^2x/\\sin x=\\sin x$ wherever the original denominator is non-zero.",
          difficulty: 3,
          diagnosticIntent:
            "Checks selection of a productive identity rewrite rather than an unrelated operation or invented identity.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Invents a false linear relationship between sine and cosine.",
            C: "Applies an operation that increases complexity without targeting the right side.",
            D: "Treats an identity proof as though it were an equation-solving task.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trigproof-qm2",
          prompt:
            "Rewrite tangent in sine and cosine and simplify the expression.",
          latex: "\\tan x\\cos x",
          answer: "sinx",
          acceptedAnswers: trigExpressionVariants("sinx"),
          hint:
            "Use $\\tan x=\\sin x/\\cos x$ and cancel only the common multiplicative factor.",
          explanation:
            "Rewriting gives $(\\sin x/\\cos x)\\cos x$. The cosine factors cancel wherever $\\cos x\\ne0$, leaving $\\sin x$. This proves the equality on the original domain.",
          difficulty: 3,
          diagnosticIntent:
            "Checks a standard quotient-identity proof step while retaining awareness of the expression's original domain.",
          taskType: "procedural",
        }),
        qualityAnswer({
          id: "y11adv-trigproof-qm3",
          prompt:
            "Use difference of squares and a Pythagorean identity to simplify.",
          latex: "\\frac{(1-\\sin x)(1+\\sin x)}{\\cos x}",
          answer: "cosx",
          acceptedAnswers: trigExpressionVariants("cosx"),
          hint:
            "Multiply the conjugate factors first, then replace $1-\\sin^2x$.",
          explanation:
            "The numerator is $1-\\sin^2x$, which equals $\\cos^2x$. Thus the fraction is $\\cos^2x/\\cos x=\\cos x$ wherever the original denominator is non-zero.",
          difficulty: 3,
          diagnosticIntent:
            "Checks coordination of an algebraic factor pattern, a Pythagorean replacement, and valid factor cancellation.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-trigproof-qm4",
          prompt:
            "A student cancels the sine terms and claims the expression equals $1$. Which correction is valid?",
          latex: "\\frac{1+\\sin x}{\\sin x}",
          answer: "D",
          choices: [
            "The cancellation is valid whenever $\\sin x\\ne0$.",
            "The expression equals $\\cos x$ by the Pythagorean identity.",
            "The numerator should first be replaced by $\\sin^2x$.",
            "Split the fraction to obtain $\\frac1{\\sin x}+1$; terms cannot be cancelled across addition.",
          ],
          hint:
            "Cancellation applies to common factors of a product, not separate terms joined by addition.",
          explanation:
            "The numerator is a sum, so $\\sin x$ is not a factor of the entire numerator. Dividing each term by $\\sin x$ gives $1/\\sin x+1$, not $1$.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses illegal cancellation across addition and checks whether the learner can repair the algebraic step.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Believes a non-zero denominator makes cancellation across addition valid.",
            B: "Invokes a true identity in a place where its pattern is absent.",
            C: "Replaces a linear sum with an unrelated squared expression.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trigproof-qm5",
          prompt:
            "Two proof attempts are shown. Attempt A uses $1-\\cos^2x=\\sin^2x$ before cancelling. Attempt B cancels $\\cos^2x$ from $1-\\cos^2x$. Enter the letter of the valid attempt.",
          latex: "\\frac{1-\\cos^2x}{\\sin x}=\\sin x",
          answer: "A",
          acceptedAnswers: ["attempt A", "Attempt A", "a"],
          hint:
            "Decide whether the quantity being cancelled is a factor of the entire numerator.",
          explanation:
            "Attempt A is valid: replacing the complete numerator gives $\\sin^2x/\\sin x=\\sin x$. Attempt B tries to cancel a term across subtraction, but $\\cos^2x$ is not a common factor.",
          difficulty: 4,
          diagnosticIntent:
            "Requires comparison of two proof pathways and justification through the distinction between terms and factors.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-trigproof-qm6",
          prompt:
            "Test the proposed identity at both listed angles. Enter the sum of the two values of LHS minus RHS.",
          latex:
            "1+\\sin^2x=\\cos^2x,\qquad x\\in\\left\\{0,\\frac{\\pi}{2}\\right\\}",
          answer: "2",
          acceptedAnswers: ["2.0", "0+2", "2 units"],
          hint:
            "Evaluate the difference $1+\\sin^2x-\\cos^2x$ separately at each angle.",
          explanation:
            "At $x=0$, the difference is $1+0-1=0$. At $x=\\pi/2$, it is $1+1-0=2$. Their sum is 2, so a single counterexample already disproves the proposed identity.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a universal claim using exact test cases and distinguishes evidence of failure from a formal identity.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-trigproof-qm7",
          prompt:
            "Find $p+q$ so that the statement is an identity on its original domain.",
          latex:
            "\\frac{p-q\\sin^2x}{\\cos x}=3\\cos x",
          answer: "6",
          acceptedAnswers: ["p+q=6", "p = 3, q = 3", "3+3=6", "6.0"],
          hint:
            "Rewrite the right side over the common denominator and use $\\cos^2x=1-\\sin^2x$.",
          explanation:
            "Writing $3\\cos x$ as $3\\cos^2x/\\cos x$ gives numerator $3(1-\\sin^2x)=3-3\\sin^2x$. Therefore $p=3$, $q=3$, and $p+q=6$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses an identity proof by requiring coefficient matching after a Pythagorean transformation.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-trigproof-qm8",
          prompt:
            "Which statement describes the identity with full domain precision?",
          latex: "\\tan x\\cos x=\\sin x",
          answer: "C",
          choices: [
            "It is false because the two sides have different symbols.",
            "It is true for every real $x$, including $x=\\pi/2$.",
            "It is true wherever the left side is defined; at $x=\\pi/2+n\\pi$, tangent is undefined.",
            "It is true only when $\\sin x=0$.",
          ],
          hint:
            "Simplification cannot restore values excluded by an original tangent or denominator.",
          explanation:
            "Using $\\tan x=\\sin x/\\cos x$ simplifies the left side to $\\sin x$ when $\\cos x\\ne0$. At $x=\\pi/2+n\\pi$, tangent is undefined, so the original left side has no value.",
          difficulty: 5,
          diagnosticIntent:
            "Tests whether algebraic equivalence is stated on the original domain rather than after silently extending it.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Judges equality from surface form rather than valid transformations.",
            B: "Extends a simplified expression to points excluded from the original tangent.",
            D: "Confuses a convenient verification case with the full domain of an identity.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trigproof-qm9",
          prompt:
            "Coordinate difference of squares, a Pythagorean identity, and the quotient identity to simplify.",
          latex:
            "\\frac{(1-\\sin x)(1+\\sin x)}{\\cos x}+\\tan x\\sin x",
          answer: "1/cosx",
          acceptedAnswers: [
            "\\frac1{\\cos x}",
            "\\frac{1}{\\cos x}",
            "secx",
            "\\sec x",
            "sec(x)",
          ],
          hint:
            "Simplify each term, then combine them over a cosine denominator before using $\\sin^2x+\\cos^2x=1$.",
          explanation:
            "The first term becomes $\\cos x$, while the second is $\\sin^2x/\\cos x$. Combining gives $(\\cos^2x+\\sin^2x)/\\cos x=1/\\cos x$, on the original domain.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises several proof structures in sequence instead of cueing a single memorised substitution.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-trigproof-qm10",
          prompt:
            "A proof multiplies the left fraction by a conjugate form before applying the Pythagorean identity. Enter the excluded-angle family for the original identity.",
          latex:
            "\\frac{1-\\sin x}{\\cos x}=\\frac{\\cos x}{1+\\sin x}",
          answer: "pi/2+npi",
          acceptedAnswers: [
            "x=pi/2+npi",
            "\\pi/2+n\\pi",
            "x=\\frac{\\pi}{2}+n\\pi",
            "π/2+nπ",
            "90+180n degrees",
          ],
          hint:
            "Start with the original left denominator; its zeros also account for the apparent conjugate restriction.",
          explanation:
            "The original left side requires $\\cos x\\ne0$, excluding $x=\\pi/2+n\\pi$. Multiplying by $(1+\\sin x)/(1+\\sin x)$ is safe elsewhere; when $1+\\sin x=0$, cosine is already zero.",
          difficulty: 5,
          diagnosticIntent:
            "Combines conjugate proof strategy with domain analysis and recognition of overlapping restrictions.",
          taskType: "problem-solving",
        }),
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
        formulaAnswer("y11adv-trig-eq-g1", "Isolate the trigonometric function.", "2\\sin x-1=0", "1/2", ["0.5"]),
        formulaAnswer("y11adv-trig-eq-g2", "Find the reference angle.", "\\sin x=\\frac12", "pi/6", ["\\pi/6", "π/6"]),
        practicalChoice("y11adv-trig-eq-g3", "Choose the quadrants where cosine is negative.", "B", ["Quadrants I and IV", "Quadrants II and III", "Quadrants I and III", "Quadrants II and IV"], "Cosine is the x-coordinate, so it is negative on the left side of the unit circle.", "\\cos x<0"),
        practicalChoice("y11adv-trig-eq-g4", "Choose the solution pair.", "C", ["$x=\\frac{\\pi}{4},\\frac{3\\pi}{4}$", "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$", "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$", "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$"], "Tangent is positive in quadrants I and III.", "\\tan x=1,\\quad 0\\le x\\le2\\pi"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-eq-i1", "Find the smaller solution.", "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", "pi/6", ["\\pi/6", "π/6"]),
        formulaAnswer("y11adv-trig-eq-i2", "Find the larger solution.", "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi", "5pi/6", ["5\\pi/6", "5π/6"]),
        practicalChoice("y11adv-trig-eq-i3", "Choose the solution pair.", "B", ["$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$", "$x=\\frac{3\\pi}{4},\\frac{5\\pi}{4}$"], "Cosine is negative in quadrants II and III.", "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi"),
        formulaAnswer("y11adv-trig-eq-i4", "Isolate the trigonometric function.", "3\\cos x+1=0", "-1/3", ["-(1/3)", "-\\frac{1}{3}"]),
        practicalChoice("y11adv-trig-eq-i5", "Choose the correct period for tangent equations.", "A", ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$4\\pi$"], "Tangent repeats every $\\pi$, so its complete solution family advances by one pi at a time.", "\\tan x=k"),
      ],
      commonMistakes: [
        { mistake: "Giving only one solution when two are in the domain.", fix: "Use ASTC and check all quadrants in the stated domain." },
        { mistake: "Ignoring the domain.", fix: "Only include solutions inside the interval shown in the question." },
        { mistake: "Using the wrong period for tangent.", fix: "Tangent repeats every $\\pi$, not every $2\\pi$." },
        { mistake: "Skipping the isolation step.", fix: "Solve algebraically for the trig function first, then use exact values and quadrants." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-trig-eq-qm1",
          prompt:
            "A student solves $\\sin x=-\\frac12$ on $0\\le x\\le2\\pi$ and gives only $x=\\frac{7\\pi}{6}$. Which correction is required?",
          latex: "",
          answer: "C",
          choices: [
            "Replace the answer with $x=\\frac{5\\pi}{6}$",
            "Add $x=\\frac{\\pi}{6}$",
            "Add $x=\\frac{11\\pi}{6}$",
            "Add $x=\\frac{5\\pi}{3}$",
          ],
          hint: "Use the sign of sine to identify every relevant quadrant.",
          explanation:
            "Sine is negative in quadrants III and IV. The reference angle is $\\pi/6$, so the two solutions are $7\\pi/6$ and $11\\pi/6$. The missing solution is therefore $11\\pi/6$.",
          difficulty: 3,
          diagnosticIntent:
            "Reveals whether the student checks every quadrant in the stated domain instead of stopping after one solution.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses a quadrant-II angle where sine is positive.",
            B: "Uses the positive quadrant-I reference angle.",
            D: "Confuses the quadrant-IV construction with the cosine solution for a reference angle of pi over three.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-eq-qm2",
          prompt:
            "Solve the equation on the stated closed interval. Enter the complete solution set.",
          latex: "2\\sin x-\\sqrt3=0,\\qquad 0\\le x\\le2\\pi",
          answer: "pi/3,2pi/3",
          acceptedAnswers: solutionSetVariants(["pi/3", "2pi/3"]),
          hint: "Isolate sine, then use the exact value and both positive-sine quadrants.",
          explanation:
            "Isolating gives $\\sin x=\\sqrt3/2$, whose reference angle is $\\pi/3$. Sine is positive in quadrants I and II, so the complete solution set is $x=\\pi/3,2\\pi/3$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether the student can combine algebraic isolation, an exact value, quadrant signs, and a complete domain search.",
          taskType: "procedural",
        }),
        qualityAnswer({
          id: "y11adv-trig-eq-qm3",
          prompt:
            "Solve the tangent equation on the stated interval. Enter both solutions.",
          latex: "\\tan x=-1,\\qquad -\\frac{\\pi}{2}<x<\\frac{3\\pi}{2}",
          answer: "-pi/4,3pi/4",
          acceptedAnswers: solutionSetVariants(["-pi/4", "3pi/4"]),
          hint: "Start with one solution and use tangent's period rather than a two-quadrant sine rule.",
          explanation:
            "A principal solution is $x=-\\pi/4$. Tangent has period $\\pi$, so adding $\\pi$ gives $3\\pi/4$. Adding or subtracting another period leaves the stated interval, so these are the only solutions.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether the student uses tangent's pi period and filters the resulting family against a nonstandard interval.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-trig-eq-qm4",
          prompt:
            "A student claims that $\\cos x=-\\frac{\\sqrt2}{2}$ has solutions $x=\\frac{\\pi}{4},\\frac{7\\pi}{4}$ on $0\\le x<2\\pi$. Which solution set is correct?",
          latex: "",
          answer: "B",
          choices: [
            "$\\frac{\\pi}{4},\\frac{7\\pi}{4}$",
            "$\\frac{3\\pi}{4},\\frac{5\\pi}{4}$",
            "$\\frac{3\\pi}{4},\\frac{7\\pi}{4}$",
            "$\\frac{5\\pi}{4},\\frac{7\\pi}{4}$",
          ],
          hint: "The reference angle is correct; inspect the sign of cosine in each selected quadrant.",
          explanation:
            "The reference angle is $\\pi/4$, but cosine is negative on the left half of the unit circle, in quadrants II and III. Hence the correct solutions are $3\\pi/4$ and $5\\pi/4$.",
          difficulty: 3,
          diagnosticIntent:
            "Targets the error of retaining the positive-cosine quadrants after correctly finding the reference angle.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Keeps the original positive-cosine quadrants from the reference-angle equation.",
            C: "Corrects only the first quadrant choice and leaves the other positive-cosine quadrant.",
            D: "Includes quadrant III but pairs it with quadrant IV instead of quadrant II.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-eq-qm5",
          prompt:
            "The equation has exactly the displayed solution pair on $0\\le x\\le2\\pi$. Find the positive constant $a$.",
          latex: "a\\cos x+2=0,\\qquad x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}",
          answer: "4",
          acceptedAnswers: ["a=4", "a = 4", "4.0"],
          hint: "Substitute either stated solution into the equation and use its exact cosine value.",
          explanation:
            "At either listed angle, $\\cos x=-1/2$. Substitution gives $a(-1/2)+2=0$, so $a/2=2$ and $a=4$. This produces $\\cos x=-1/2$, whose two solutions are exactly the stated pair.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student can reverse the usual solving process and infer an equation parameter from its solution set.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-trig-eq-qm6",
          prompt:
            "For each $k$ in the set, count the solutions of $\\sin x=k$ on $0\\le x\\le2\\pi$. Find the total number of solutions across all five equations.",
          latex: "k\\in\\left\\{-1,-\\frac12,0,\\frac12,1\\right\\}",
          answer: "9",
          acceptedAnswers: ["9 solutions", "total 9", "9.0"],
          hint: "Treat the endpoint value zero and the maximum and minimum values separately.",
          explanation:
            "The counts are 1 for $k=-1$, 2 for $k=-1/2$, 3 for $k=0$ because both endpoints are included, 2 for $k=1/2$, and 1 for $k=1$. Their total is $1+2+3+2+1=9$.",
          difficulty: 4,
          diagnosticIntent:
            "Checks whether the student can investigate a bounded family and account correctly for extrema and duplicated closed-interval endpoints.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-trig-eq-qm7",
          prompt:
            "A tide is modelled for one 12-hour cycle. Find the two times when the water depth is $2$ metres.",
          latex: "h(t)=3+2\\cos\\left(\\frac{\\pi t}{6}\\right),\\qquad 0\\le t\\le12",
          answer: "4,8",
          acceptedAnswers: ["t=4,8", "t = 4, 8", "4 hours, 8 hours", "{4,8}", "{4, 8}"],
          hint: "Set the model equal to 2, isolate cosine, then convert the angle solutions back to time.",
          explanation:
            "Setting $h=2$ gives $\\cos(\\pi t/6)=-1/2$. Over one cycle the corresponding angles are $2\\pi/3$ and $4\\pi/3$. Thus $t=4$ or $t=8$ hours.",
          difficulty: 4,
          diagnosticIntent:
            "Reveals whether the student can translate a contextual threshold into a trigonometric equation and then return to the original variable.",
          taskType: "synthesis",
        }),
        qualityChoice({
          id: "y11adv-trig-eq-qm8",
          prompt:
            "A student lists only $x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$ for $\\tan x=1$ on $0\\le x\\le3\\pi$. Which assessment is correct?",
          latex: "",
          answer: "D",
          choices: [
            "The list is complete because tangent has two solutions per interval.",
            "Remove $\\frac{5\\pi}{4}$ because it is outside the first revolution.",
            "Add $\\frac{7\\pi}{4}$ because tangent is positive in quadrant IV.",
            "Add $\\frac{9\\pi}{4}$ because tangent repeats every $\\pi$.",
          ],
          hint: "Generate the full tangent family, then stop only when the upper endpoint is exceeded.",
          explanation:
            "The tangent solutions are $x=\\pi/4+n\\pi$. The values in the interval are $\\pi/4$, $5\\pi/4$, and $9\\pi/4$. The student's list stops one period too early.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses whether the student treats a long domain as a complete periodic search rather than assuming a fixed two-solution pattern.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes every trigonometric equation has at most two solutions regardless of domain length.",
            B: "Incorrectly restricts the stated domain to one revolution.",
            C: "Uses sine-style quadrant reasoning and the wrong tangent sign.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-eq-qm9",
          prompt:
            "Find the value of $k$ for which the equation has exactly three distinct solutions on the closed interval.",
          latex: "\\sin x=k,\\qquad 0\\le x\\le2\\pi",
          answer: "0",
          acceptedAnswers: ["k=0", "k = 0", "0.0"],
          hint: "Ask when both endpoints represent the same sine value and are nevertheless distinct values of x.",
          explanation:
            "For $-1<k<1$ with $k\\ne0$, there are two solutions; for $k=\\pm1$, there is one. When $k=0$, the closed interval includes $x=0$, $\\pi$, and $2\\pi$, giving exactly three distinct solutions. Hence $k=0$.",
          difficulty: 5,
          diagnosticIntent:
            "Checks whether the student can classify a parameterised family while distinguishing equal function values from distinct domain points.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-trig-eq-qm10",
          prompt:
            "A rotating beacon has height $y$ metres after $t$ seconds. During the first cycle, find when it first reaches $y=4$ after passing its maximum height.",
          latex: "y=2+4\\sin\\left(\\frac{\\pi t}{3}\\right),\\qquad 0\\le t\\le6",
          answer: "5/2",
          acceptedAnswers: ["2.5", "t=5/2", "t = 5/2", "t=2.5", "2.5 seconds"],
          hint: "Solve the height equation, then use the phrase after passing the maximum to choose between the two times.",
          explanation:
            "Setting $y=4$ gives $\\sin(\\pi t/3)=1/2$, so $t=1/2$ or $t=5/2$. The maximum occurs when $\\pi t/3=\\pi/2$, at $t=3/2$. The first crossing after that maximum is therefore $t=5/2$ seconds.",
          difficulty: 5,
          diagnosticIntent:
            "Reveals whether the student can combine equation solving with phase order to select the contextually valid solution rather than report both crossings.",
          taskType: "synthesis",
        }),
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
        qualityAnswer({
          id: "y11adv-trig-id-qm1",
          prompt: "Simplify the expression on its stated domain.",
          latex: "\\frac{1-\\cos^2x}{\\sin x},\\qquad \\sin x\\ne0",
          answer: "sinx",
          acceptedAnswers: trigExpressionVariants("sinx"),
          hint: "Replace the numerator with its Pythagorean-identity equivalent before cancelling.",
          explanation:
            "The Pythagorean identity gives $1-\\cos^2x=\\sin^2x$. Therefore the quotient is $\\sin^2x/\\sin x=\\sin x$. The stated restriction makes the cancellation valid.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether the student can select a rearranged identity and cancel only after the denominator restriction is acknowledged.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-trig-id-qm2",
          prompt:
            "Which statement correctly classifies $\\sin x=\\cos x$?",
          latex: "",
          answer: "B",
          choices: [
            "It is an identity because both sides are trigonometric functions.",
            "It is an equation because it is true only for particular values of $x$.",
            "It is an identity because it is true at $x=\\pi/4$.",
            "It is neither an identity nor an equation because the functions differ.",
          ],
          hint: "An example where a statement is true does not show that it holds for every allowed value.",
          explanation:
            "At $x=\\pi/4$ the two sides agree, but at $x=0$ they are 0 and 1. The statement is therefore not true for every allowed $x$; it is an equation with particular solutions.",
          difficulty: 3,
          diagnosticIntent:
            "Targets the misconception that any true trigonometric statement, or any statement true at one example, is automatically an identity.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Classifies by the type of functions rather than universal validity.",
            C: "Uses a single confirming example as proof of an identity.",
            D: "Assumes an equation must have unlike expression types on its two sides.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-id-qm3",
          prompt:
            "Given the exact sine value and quadrant, evaluate the expression without first finding $x$.",
          latex: "\\sin x=\\frac35,\\quad x\\text{ is acute},\\qquad \\frac{1-\\sin^2x}{\\cos x}",
          answer: "4/5",
          acceptedAnswers: ["0.8", "\\frac45", "\\frac{4}{5}", "cosx", "\\cos x"],
          hint: "Use the Pythagorean identity to recognise the numerator, then determine the positive cosine value.",
          explanation:
            "Since $1-\\sin^2x=\\cos^2x$, the expression becomes $\\cos x$ on the stated acute domain. Also $\\cos x=\\sqrt{1-9/25}=4/5$, so the exact value is $4/5$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether the student can connect symbolic simplification with an exact-value constraint and use the quadrant to choose a sign.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-trig-id-qm4",
          prompt: "Rewrite the expression using only sine and cosine, then simplify.",
          latex: "\\tan x\\cos^2x",
          answer: "sinxcosx",
          acceptedAnswers: [
            "sinx*cosx",
            "sin(x)cos(x)",
            "\\sin x\\cos x",
            "\\sin(x)\\cos(x)",
          ],
          hint: "Replace tangent by sine over cosine and cancel one cosine factor.",
          explanation:
            "Using $\\tan x=\\sin x/\\cos x$, we get $(\\sin x/\\cos x)\\cos^2x$. Cancelling one cosine factor gives $\\sin x\\cos x$ wherever the original tangent is defined.",
          difficulty: 3,
          diagnosticIntent:
            "Checks execution of the quotient identity when one, rather than all, cosine factors cancels.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-trig-id-qm5",
          prompt:
            "Mina simplifies the expression by replacing $\\tan x$ first. Arlo replaces $1-\\sin^2x$ first. Which assessment is correct?",
          latex: "\\tan x\\left(1-\\sin^2x\\right)",
          answer: "C",
          choices: [
            "Only Mina can reach $\\sin x\\cos x$.",
            "Only Arlo can reach $\\sin x\\cos x$.",
            "Both methods are valid and reach $\\sin x\\cos x$.",
            "Neither method is valid because two identities cannot be combined.",
          ],
          hint: "Carry each proposed first step far enough to compare the resulting expression.",
          explanation:
            "Mina gets $(\\sin x/\\cos x)(1-\\sin^2x)$, then replaces the bracket by $\\cos^2x$. Arlo makes that replacement first. Both obtain $(\\sin x/\\cos x)\\cos^2x=\\sin x\\cos x$.",
          difficulty: 4,
          diagnosticIntent:
            "Assesses whether the student recognises two equivalent identity pathways instead of treating one memorised order as mandatory.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats quotient-identity substitution as the only valid first step.",
            B: "Treats Pythagorean substitution as the only valid first step.",
            D: "Assumes a simplification may use only one identity.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-id-qm6",
          prompt:
            "Find the constant $k$ that makes the statement an identity on the shared domain.",
          latex: "\\frac{1-\\cos^2x}{\\sin x}=k\\sin x,\\qquad \\sin x\\ne0",
          answer: "1",
          acceptedAnswers: ["k=1", "k = 1", "1.0"],
          hint: "Simplify the left side completely before comparing coefficients.",
          explanation:
            "The numerator is $\\sin^2x$, so the left side simplifies to $\\sin x$ for $\\sin x\\ne0$. Matching $\\sin x=k\\sin x$ throughout that domain requires $k=1$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses a routine simplification by requiring the student to infer a parameter that preserves universal equality.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-trig-id-qm7",
          prompt:
            "For integers $0\\le n\\le12$, how many substitutions $x=n\\pi/6$ make the quotient identity defined?",
          latex: "\\tan x=\\frac{\\sin x}{\\cos x}",
          answer: "11",
          acceptedAnswers: ["11 values", "eleven", "11.0"],
          hint: "The identity is undefined only when its cosine denominator is zero.",
          explanation:
            "Cosine is zero at $x=\\pi/2$ and $x=3\\pi/2$, corresponding to $n=3$ and $n=9$. Of the 13 integers from 0 through 12, exactly 2 are excluded, leaving 11 valid substitutions.",
          difficulty: 4,
          diagnosticIntent:
            "Checks systematic investigation of a bounded angle family while enforcing the domain restriction in the quotient identity.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-trig-id-qm8",
          prompt:
            "A student claims the simplification is an identity for every real $x$. Which diagnosis is correct?",
          latex: "\\frac{\\sin^2x+\\sin x\\cos x}{\\sin x}=\\sin x+\\cos x",
          answer: "D",
          choices: [
            "It is false because the numerator cannot be factorised.",
            "It is true for every real $x$ because the sine factors cancel.",
            "It is false whenever $\\cos x=0$.",
            "It is valid only where $\\sin x\\ne0$, because the original quotient is otherwise undefined.",
          ],
          hint: "Factor the numerator, but preserve the domain of the original denominator.",
          explanation:
            "The numerator factors as $\\sin x(\\sin x+\\cos x)$, so cancellation gives the right side when $\\sin x\\ne0$. At $\\sin x=0$ the original expression is undefined, so the equality is not an identity over every real $x$.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses cancellation that is algebraically correct on a restricted domain but overclaimed as a universal real-valued identity.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Fails to recognise the common sine factor in both numerator terms.",
            B: "Cancels correctly but discards the excluded values created by the denominator.",
            C: "Transfers the cosine restriction from the tangent quotient to a different denominator.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-id-qm9",
          prompt:
            "Given the relation, find the exact value of the product $\\sin x\\cos x$.",
          latex: "\\sin x+\\cos x=\\frac12",
          answer: "-3/8",
          acceptedAnswers: ["-0.375", "-\\frac38", "-\\frac{3}{8}", "-(3/8)"],
          hint: "Square the given sum and replace $\\sin^2x+\\cos^2x$ by 1.",
          explanation:
            "Squaring gives $\\sin^2x+2\\sin x\\cos x+\\cos^2x=1/4$. The Pythagorean terms sum to 1, so $1+2\\sin x\\cos x=1/4$ and the product is $-3/8$.",
          difficulty: 5,
          diagnosticIntent:
            "Requires transforming a linear trigonometric relation and using the Pythagorean identity to infer an otherwise hidden product.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-trig-id-qm10",
          prompt:
            "The statement is an identity for all real $x$. Find $a+b$.",
          latex: "a(1-\\cos^2x)+b\\cos^2x=2+\\sin^2x",
          answer: "5",
          acceptedAnswers: ["a+b=5", "a + b = 5", "5.0"],
          hint: "Rewrite both sides as a constant plus a coefficient of $\\sin^2x$.",
          explanation:
            "Using $1-\\cos^2x=\\sin^2x$ and $\\cos^2x=1-\\sin^2x$, the left side is $b+(a-b)\\sin^2x$. Matching $2+\\sin^2x$ gives $b=2$ and $a-b=1$, so $a=3$ and $a+b=5$.",
          difficulty: 5,
          diagnosticIntent:
            "Tests synthesis of identity rewriting and coefficient matching to determine two parameters from universal equality.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "trigonometric-identities-equations-exam-practice") {
    const examHeightGraph: import("../types").TrigGraphDiagram = {
      description:
        "Cosine height model over one eight-second cycle, starting at 5 metres when t is zero, crossing the midline of 3 metres at t equals 2, reaching 1 metre at t equals 4, and returning to 5 metres at t equals 8; the level h equals 2 is crossed twice.",
      functionType: "cos",
      equationLabel: "h = 3 + 2 cos(pi t/4)",
      xMin: "0",
      xMax: "8",
      yMin: 0,
      yMax: 6,
      keyPoints: [
        { x: "0", y: "5", label: "(0, 5)" },
        { x: "2", y: "3", label: "(2, 3)" },
        { x: "4", y: "1", label: "(4, 1)" },
        { x: "6", y: "3", label: "(6, 3)" },
        { x: "8", y: "5", label: "(8, 5)" },
      ],
      periodMarkers: [
        { x: "0", label: "0" },
        { x: "8", label: "8" },
      ],
    };
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
        formulaAnswer("y11adv-trig-mixed-g1", "Isolate the trigonometric function.", "2\\cos x+1=0", "-1/2", ["-0.5"]),
        formulaAnswer("y11adv-trig-mixed-g2", "Find the reference angle.", "\\cos x=\\frac12", "pi/3", ["\\pi/3", "π/3"]),
        exactAnswer("y11adv-trig-mixed-g3", "Complete the reciprocal identity.", "\\sec^2x-\\tan^2x=\\Box", "1", "Rearranging the Pythagorean reciprocal identity sec squared x equals 1 plus tan squared x leaves a difference of 1.", ["1.0", "one"]),
        practicalChoice("y11adv-trig-mixed-g4", "Choose the best first step for the expression.", "B", ["Set it equal to zero", "Rewrite tangent in terms of sine and cosine", "Use the tangent period", "Use a reference angle"], "Use the quotient identity when tangent appears in an expression.", "\\tan x\\cos x"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-mixed-i1", "Find the smaller solution.", "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", "2pi/3", ["2\\pi/3", "2π/3"]),
        formulaAnswer("y11adv-trig-mixed-i2", "Find the larger solution.", "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi", "4pi/3", ["4\\pi/3", "4π/3"]),
        practicalChoice("y11adv-trig-mixed-i3", "Choose the solution pair.", "D", ["$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$", "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$", "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$", "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$"], "Tangent is negative in quadrants II and IV, so use the pi-over-four reference angle in those quadrants.", "\\tan x=-1,\\quad 0\\le x\\le2\\pi"),
        exactAnswer("y11adv-trig-mixed-i4", "Simplify using a Pythagorean identity.", "1-\\cos^2x+\\sin^2x", "2sin^2x", "Replace 1 minus cosine squared x with sine squared x. Adding the second sine-squared term gives 2 sine squared x.", ["2sin^2(x)", "2\\sin^2x", "2\\sin^2(x)"]),
        formulaAnswer("y11adv-trig-mixed-i5", "Simplify the expression where it is defined.", "\\tan x\\cos x", "sinx", ["sin(x)", "\\sin x"]),
      ],
      commonMistakes: [
        { mistake: "Typing two radian solutions into one answer box.", fix: "Use separate smaller/larger solution questions or choose the labelled solution pair." },
        { mistake: "Forgetting to isolate the trig function before using exact values.", fix: "Rearrange the equation first." },
        { mistake: "Using identity simplification as though it proves a solution set.", fix: "Identities simplify expressions; equations need solutions in a domain." },
        { mistake: "Ignoring restrictions in quotient identities.", fix: "When using tangent as sine over cosine, remember $\\cos x\\ne0$." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-trig-mixed-qm1",
          prompt:
            "Which plan correctly treats the statement as an equation rather than an identity?",
          latex:
            "2\\sin^2x-\\sin x=0,\qquad 0\\le x\\le2\\pi",
          answer: "C",
          choices: [
            "Replace the left side by 1 because it contains sine squared.",
            "Divide by $\\sin x$ immediately and solve only $2\\sin x-1=0$.",
            "Factor as $\\sin x(2\\sin x-1)=0$ and solve both branches in the domain.",
            "Verify the statement at one angle and declare it true for every $x$.",
          ],
          hint:
            "An equation equal to zero calls for algebraic factorisation and every zero-product branch.",
          explanation:
            "The left side factorises to $\\sin x(2\\sin x-1)$. The zero-product rule gives $\\sin x=0$ or $\\sin x=1/2$, and both branches must be solved in the stated interval.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses identity-equation confusion and unsafe division while checking recognition of a zero-product structure.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Misapplies the Pythagorean identity to a lone squared ratio.",
            B: "Divides by a factor that may be zero and loses a solution branch.",
            D: "Treats one confirming substitution as proof of a universal identity.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-mixed-qm2",
          prompt:
            "Evaluate the reciprocal ratio at the related angle exactly.",
          latex: "\\sec\\left(\\frac{4\\pi}{3}\\right)",
          answer: "-2",
          acceptedAnswers: ["-2.0", "negative two", "\\frac{1}{-1/2}"],
          hint:
            "The angle is pi plus pi over three; find its cosine sign and value before taking the reciprocal.",
          explanation:
            "Since $4\\pi/3=\\pi+\\pi/3$, its cosine is $-\\cos(\\pi/3)=-1/2$. Secant is the reciprocal of cosine, so $\\sec(4\\pi/3)=-2$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks coordination of a related angle, quadrant sign, exact cosine, and reciprocal evaluation.",
          taskType: "procedural",
        }),
        qualityAnswer({
          id: "y11adv-trig-mixed-qm3",
          prompt:
            "Solve both factor branches and enter the number of distinct solutions in the closed interval.",
          latex:
            "\\cos x(2\\sin x+1)=0,\qquad 0\\le x\\le2\\pi",
          answer: "4",
          acceptedAnswers: ["4 solutions", "four", "4.0"],
          hint:
            "Solve $\\cos x=0$ and $\\sin x=-1/2$ separately, then check whether any values overlap.",
          explanation:
            "The cosine branch gives $\\pi/2,3\\pi/2$. The sine branch gives $7\\pi/6,11\\pi/6$. These four values are distinct and all lie in the closed interval.",
          difficulty: 3,
          diagnosticIntent:
            "Checks complete zero-product solving across two different trigonometric ratios and distinct-set counting.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-trig-mixed-qm4",
          prompt:
            "A student claims the equality holds for every real $x$. Which assessment is precise?",
          latex: "\\sec x\\cos x=1",
          answer: "B",
          choices: [
            "It is false for all real $x$ because secant and cosine are different functions.",
            "It holds where $\\cos x\\ne0$; at $x=\\pi/2+n\\pi$, secant is undefined.",
            "It holds only when $\\cos x=0$.",
            "It holds for every real $x$ because reciprocal factors always cancel.",
          ],
          hint:
            "Preserve the domain of the original reciprocal function before simplifying.",
          explanation:
            "Because $\\sec x=1/\\cos x$, the product is 1 whenever $\\cos x\\ne0$. At $x=\\pi/2+n\\pi$, secant is undefined, so the original left side has no value.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses silent domain extension after reciprocal cancellation and demands a precise identity statement.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Judges equivalence by the names of functions rather than their definitions.",
            C: "Reverses the domain condition for the cosine denominator.",
            D: "Cancels correctly but ignores the original undefined values.",
          },
        }),
        {
          ...qualityAnswer({
            id: "y11adv-trig-mixed-qm5",
            prompt:
              "During one cycle, find the first time after the initial maximum when the height is 2 metres.",
            latex:
              "h(t)=3+2\\cos\\left(\\frac{\\pi t}{4}\\right),\qquad 0\\le t\\le8",
            answer: "8/3",
            acceptedAnswers: [
              "\\frac83",
              "\\frac{8}{3}",
              "2.666...",
              "t=8/3",
              "8/3 seconds",
            ],
            hint:
              "Set the model equal to 2, solve cosine equals negative one half, and select the first crossing shown by the phase.",
            explanation:
              "Setting $h=2$ gives $\\cos(\\pi t/4)=-1/2$. The first angle after the maximum is $2\\pi/3$, so $\\pi t/4=2\\pi/3$ and $t=8/3$ seconds.",
            difficulty: 4,
            diagnosticIntent:
              "Translates a graph-supported context to an equation and uses phase order to select one of two crossings.",
            taskType: "synthesis",
          }),
          trigGraphDiagram: examHeightGraph,
        },
        qualityAnswer({
          id: "y11adv-trig-mixed-qm6",
          prompt:
            "Find $a+b$ so the statement is an identity on its original domain.",
          latex:
            "\\frac{a-b\\sin^2x}{\\cos x}=4\\cos x",
          answer: "8",
          acceptedAnswers: ["a+b=8", "a=4,b=4", "4+4=8", "8.0"],
          hint:
            "Write the right side over a cosine denominator, then replace cosine squared by one minus sine squared.",
          explanation:
            "The right side is $4\\cos^2x/\\cos x=4(1-\\sin^2x)/\\cos x$. Matching numerators gives $a=4$ and $b=4$, hence $a+b=8$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses an identity simplification through Pythagorean rewriting and coefficient matching.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-trig-mixed-qm7",
          prompt:
            "For each listed $k$, count the distinct solutions of the equation on the closed interval. Enter the total across the three equations.",
          latex:
            "\\sin x(2\\cos x-k)=0,\qquad k\\in\\{-2,0,2\\},\qquad 0\\le x\\le2\\pi",
          answer: "11",
          acceptedAnswers: ["11 solutions", "3+5+3=11", "eleven", "11.0"],
          hint:
            "For each parameter, take the union of the sine-zero branch and the corresponding cosine branch.",
          explanation:
            "For $k=-2$, the cosine solution overlaps the sine-zero branch, giving 3 values. For $k=0$ there are 5 values. For $k=2$ the overlap again gives 3. The total is $3+5+3=11$.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a parameterised zero-product family with feasibility, branch overlap, and closed-endpoint counting.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-trig-mixed-qm8",
          prompt:
            "A student solves the statement for a few angles and reports a finite solution set. Which diagnosis is correct?",
          latex: "\\sec^2x-\\tan^2x=1",
          answer: "D",
          choices: [
            "The student is correct because every trigonometric statement has isolated solutions.",
            "The statement is false because secant and tangent cannot occur together.",
            "The student should instead solve only $\\sec x=1$.",
            "This is an identity wherever secant and tangent are defined, so a finite solution list misclassifies the task.",
          ],
          hint:
            "Recognise the rearranged reciprocal Pythagorean identity before trying to solve for angles.",
          explanation:
            "The identity $\\sec^2x=1+\\tan^2x$ rearranges directly to the displayed statement. It is true for every $x$ with $\\cos x\\ne0$, not merely for a finite set of angles.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses equation-versus-identity misclassification in a reciprocal Pythagorean setting.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes all trigonometric equalities are finite-domain equations.",
            B: "Rejects a valid identity because it uses two named ratios.",
            C: "Takes an unjustified square-root or branch shortcut.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-mixed-qm9",
          prompt:
            "Respect the original denominator, simplify with an identity, solve, and enter the sum of all solutions.",
          latex:
            "\\frac{1-\\cos^2x}{\\sin x}=\\frac12,\qquad 0<x<2\\pi",
          answer: "pi",
          acceptedAnswers: ["\\pi", "π", "$\\pi$", "180 degrees"],
          hint:
            "On the original domain replace the numerator by sine squared, cancel one sine factor, and solve the resulting equation.",
          explanation:
            "The quotient simplifies to $\\sin x$ because the original denominator excludes sine zero. Solving $\\sin x=1/2$ gives $\\pi/6$ and $5\\pi/6$, whose sum is $\\pi$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises domain control, identity simplification, cancellation, exact equation solving, and aggregation.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-trig-mixed-qm10",
          prompt:
            "Use a difference-of-squares consequence of the reciprocal identity to find the second factor.",
          latex:
            "\\sec\\theta+\\tan\\theta=3,\qquad \\theta\\text{ is acute}",
          answer: "1/3",
          acceptedAnswers: [
            "\\frac13",
            "\\frac{1}{3}",
            "0.333...",
            "sec(theta)-tan(theta)=1/3",
          ],
          hint:
            "Factor $\\sec^2\\theta-\\tan^2\\theta=1$ into the product of a sum and difference.",
          explanation:
            "The identity gives $(\\sec\\theta+\\tan\\theta)(\\sec\\theta-\\tan\\theta)=1$. Since the first factor is 3, the second is $1/3$.",
          difficulty: 5,
          diagnosticIntent:
            "Connects a reciprocal Pythagorean identity to factorisation and reverse inference of an unseen expression.",
          taskType: "problem-solving",
        }),
      ],
    };
  }

  if (lesson.slug === "reciprocal-trig-ratios") {
    const reciprocalAngle: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing an angle of two pi over three in quadrant II with terminal point negative one half, square root of three over two; secant is the reciprocal of the displayed x-coordinate.",
      angleRadians: "2pi/3",
      quadrant: 2,
      referenceAngle: "pi/3",
      terminalPoint: {
        x: "-1/2",
        y: "sqrt(3)/2",
        label: "(-1/2, sqrt(3)/2)",
      },
      highlightRadius: true,
      showReferenceTriangle: true,
      notes: [
        "The x-coordinate is cosine, so its reciprocal gives secant.",
      ],
    };
    const reciprocalAxes: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle marking the five closed-interval axis angles: zero and two pi at the right-hand point, pi over two at the top, pi at the left, and three pi over two at the bottom.",
      angleRadians: "0, pi/2, pi, 3pi/2, 2pi",
      quadrant: "axis",
      terminalPoint: { x: "1", y: "0", label: "0 and 2pi" },
      symmetryPoints: [
        { x: "0", y: "1", label: "pi/2" },
        { x: "-1", y: "0", label: "pi" },
        { x: "0", y: "-1", label: "3pi/2" },
      ],
      highlightRadius: true,
      notes: [
        "Cosine is zero at the top and bottom points; sine is zero at the left and right points.",
      ],
    };
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
          "Use the reciprocal definition: sec(60°) = 1/cos(60°) = 1/(1/2) = 2.", [], "Use sec θ = 1/cos θ, then substitute the exact value of cos(60°)."),
        exactAnswer("y11adv-sec-g3", "Evaluate the exact value.", "\\csc(30°)", "2",
          "Use the reciprocal definition: csc(30°) = 1/sin(30°) = 1/(1/2) = 2.", [], "Use csc θ = 1/sin θ, then substitute the exact value of sin(30°)."),
        exactAnswer("y11adv-sec-g4", "Evaluate the exact value.", "\\cot(45°)", "1",
          "Use the reciprocal definition: cot(45°) = 1/tan(45°) = 1/1 = 1.", [], "Use cot θ = 1/tan θ, then substitute tan(45°) = 1."),
      ],
      independentPractice: [
        exactAnswer("y11adv-sec-i1", "Evaluate the exact value.", "\\csc(90°)", "1",
          "Since sin(90°) = 1, its reciprocal is csc(90°) = 1/sin(90°) = 1.", [], "Use csc θ = 1/sin θ, then sin(90°) = 1."),
        exactAnswer("y11adv-sec-i2", "Evaluate the exact value.", "\\sec(180°)", "-1",
          "Since cos(180°) = −1, its reciprocal is sec(180°) = 1/cos(180°) = −1.", ["-1", "−1"], "Use sec θ = 1/cos θ, then cos(180°) = −1."),
        exactAnswer("y11adv-sec-i3", "Evaluate the exact value.", "\\sec^2(60°)", "4",
          "First sec(60°) = 1/cos(60°) = 2, so squaring gives sec²(60°) = 4.", [], "Find sec(60°) first, then square it."),
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
        qualityChoice({
          id: "y11adv-sec-qm1",
          prompt:
            "Which statement correctly distinguishes a reciprocal identity from the quotient identity?",
          latex: "",
          answer: "A",
          choices: [
            "$\\sec\\theta=1/\\cos\\theta$, while $\\tan\\theta=\\sin\\theta/\\cos\\theta$.",
            "$\\sec\\theta=1/\\sin\\theta$, while $\\tan\\theta=\\cos\\theta/\\sin\\theta$.",
            "$\\csc\\theta=1/\\cos\\theta$, while $\\cot\\theta=\\sin\\theta/\\cos\\theta$.",
            "$\\cot\\theta=1/\\cos\\theta$, while $\\sec\\theta=\\cos\\theta/\\sin\\theta$.",
          ],
          hint:
            "Reciprocal means invert one ratio; quotient identities compare sine and cosine.",
          explanation:
            "Secant is the reciprocal of cosine, so $\\sec\\theta=1/\\cos\\theta$. Tangent is a quotient, $\\tan\\theta=\\sin\\theta/\\cos\\theta$. The other options swap these roles.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses confusion among reciprocal and quotient identities before numerical evaluation is attempted.",
          taskType: "analytical",
          distractorMisconceptions: {
            B: "Swaps both the secant reciprocal and tangent quotient.",
            C: "Interchanges secant with cosecant and tangent with cotangent.",
            D: "Treats cotangent as secant and gives secant a quotient definition.",
          },
        }),
        {
          ...qualityAnswer({
            id: "y11adv-sec-qm2",
            prompt:
              "Use the unit-circle coordinate to evaluate the reciprocal ratio exactly.",
            latex: "\\sec\\left(\\frac{2\\pi}{3}\\right)",
            answer: "-2",
            acceptedAnswers: ["-2.0", "negative two", "\\frac{1}{-1/2}"],
            hint:
              "Read cosine from the x-coordinate, then take its reciprocal without changing the sign.",
            explanation:
              "At $2\\pi/3$, the unit-circle x-coordinate is $-1/2$, so $\\cos(2\\pi/3)=-1/2$. Therefore $\\sec(2\\pi/3)=1/(-1/2)=-2$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks exact reciprocal evaluation from a visual coordinate while retaining the quadrant-II sign.",
            taskType: "procedural",
          }),
          unitCircleDiagram: reciprocalAngle,
        },
        qualityAnswer({
          id: "y11adv-sec-qm3",
          prompt:
            "Evaluate the reciprocal ratio directly from the given primary ratio.",
          latex: "\\sin\\theta=-\\frac35",
          answer: "-5/3",
          acceptedAnswers: [
            "-\\frac53",
            "-\\frac{5}{3}",
            "−5/3",
            "csc(theta)=-5/3",
          ],
          hint:
            "Cosecant is the multiplicative reciprocal of sine, including its sign.",
          explanation:
            "Because $\\csc\\theta=1/\\sin\\theta$, substituting $\\sin\\theta=-3/5$ gives $\\csc\\theta=1/(-3/5)=-5/3$, with the negative sign retained.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether a signed fractional trigonometric value is inverted correctly rather than merely negated.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-sec-qm4",
          prompt:
            "Which pair of reciprocal ratios is undefined at $\\theta=\\pi$?",
          latex: "",
          answer: "D",
          choices: [
            "$\\sec\\theta$ and $\\csc\\theta$",
            "$\\sec\\theta$ and $\\cot\\theta$",
            "$\\sec\\theta$ only",
            "$\\csc\\theta$ and $\\cot\\theta$",
          ],
          hint:
            "At pi, sine is zero and cosine is negative one; inspect the denominators.",
          explanation:
            "At $\\theta=\\pi$, $\\sin\\theta=0$ and $\\cos\\theta=-1$. Both $\\csc\\theta=1/\\sin\\theta$ and $\\cot\\theta=\\cos\\theta/\\sin\\theta$ are undefined, while secant is defined.",
          difficulty: 3,
          diagnosticIntent:
            "Checks domain reasoning from reciprocal denominators rather than the mistaken rule that a zero primary ratio gives zero.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes both named reciprocal functions share cosine as a denominator.",
            B: "Treats secant as undefined when cosine equals negative one.",
            C: "Looks only at cosine and overlooks both ratios with sine denominators.",
          },
        }),
        qualityAnswer({
          id: "y11adv-sec-qm5",
          prompt:
            "Use the identity and quadrant to find the signed tangent value.",
          latex:
            "\\sec^2\\theta=\\frac{25}{9},\\qquad \\theta\\text{ is in quadrant IV}",
          answer: "-4/3",
          acceptedAnswers: [
            "-\\frac43",
            "-\\frac{4}{3}",
            "−4/3",
            "tan(theta)=-4/3",
          ],
          hint:
            "First find tangent squared from $\\sec^2\\theta=1+\\tan^2\\theta$, then use the quadrant for the sign.",
          explanation:
            "The identity gives $\\tan^2\\theta=25/9-1=16/9$, so $\\tan\\theta=\\pm4/3$. Tangent is negative in quadrant IV, hence $\\tan\\theta=-4/3$.",
          difficulty: 4,
          diagnosticIntent:
            "Requires identity rearrangement, square-root branching, and independent quadrant sign selection.",
          taskType: "problem-solving",
        }),
        {
          ...qualityAnswer({
            id: "y11adv-sec-qm6",
            prompt:
              "Across the five axis angles, count all undefined entries in a table containing secant, cosecant, and cotangent. Enter the total.",
            latex:
              "\\theta\\in\\left\\{0,\\frac\\pi2,\\pi,\\frac{3\\pi}{2},2\\pi\\right\\}",
            answer: "8",
            acceptedAnswers: ["8 undefined entries", "2+3+3=8", "eight", "8.0"],
            hint:
              "Count secant zeros of cosine, then cosecant and cotangent zeros of sine.",
            explanation:
              "Secant is undefined at $\\pi/2$ and $3\\pi/2$, giving 2 entries. Cosecant and cotangent are each undefined at $0,\\pi,2\\pi$, giving 3 each. The total is $2+3+3=8$.",
            difficulty: 4,
            diagnosticIntent:
              "Investigates a bounded domain table and distinguishes cosine-denominator from sine-denominator restrictions.",
            taskType: "investigative",
          }),
          unitCircleDiagram: reciprocalAxes,
        },
        qualityAnswer({
          id: "y11adv-sec-qm7",
          prompt:
            "Use the reciprocal definition, quadrant, and Pythagorean relationship to find cosecant.",
          latex:
            "\\sec\\theta=-\\frac54,\\qquad \\theta\\text{ is in quadrant III}",
          answer: "-5/3",
          acceptedAnswers: [
            "-\\frac53",
            "-\\frac{5}{3}",
            "−5/3",
            "csc(theta)=-5/3",
          ],
          hint:
            "Convert secant to cosine, use a 3-4-5 relationship for sine, then apply the quadrant sign.",
          explanation:
            "Secant $-5/4$ gives cosine $-4/5$. In quadrant III sine is also negative, and $\\sin^2\\theta=1-16/25=9/25$, so $\\sin\\theta=-3/5$ and $\\csc\\theta=-5/3$.",
          difficulty: 4,
          diagnosticIntent:
            "Synthesises a reciprocal value, Pythagorean magnitude, quadrant signs, and a second reciprocal ratio.",
          taskType: "synthesis",
        }),
        qualityChoice({
          id: "y11adv-sec-qm8",
          prompt:
            "A student takes square roots of the identity and writes $\\sec\\theta-\\tan\\theta=1$. Which diagnosis is correct?",
          latex: "\\sec^2\\theta-\\tan^2\\theta=1",
          answer: "B",
          choices: [
            "The step is valid whenever both functions are positive.",
            "The square root of a difference is not the difference of square roots; the left side factors instead.",
            "The identity should contain cosecant instead of secant.",
            "The only error is that the right side should be negative one.",
          ],
          hint:
            "Compare $\\sqrt{a^2-b^2}$ with $a-b$, or factor the difference of squares.",
          explanation:
            "In general, $\\sqrt{a^2-b^2}\\ne a-b$. The identity factors as $(\\sec\\theta-\\tan\\theta)(\\sec\\theta+\\tan\\theta)=1$, which does not make either factor equal to 1.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses an invalid square-root distribution and links the correct algebra to a reciprocal identity.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Believes positive values make square roots distribute over subtraction.",
            C: "Replaces a valid secant-tangent identity with the other Pythagorean family.",
            D: "Changes the sign instead of addressing the invalid operation.",
          },
        }),
        qualityAnswer({
          id: "y11adv-sec-qm9",
          prompt:
            "Use both reciprocal Pythagorean identities to evaluate the expression.",
          latex:
            "\\frac{\\sec^2\\theta-1}{\\csc^2\\theta-1},\\qquad \\tan\\theta=\\frac1{\\sqrt3}",
          answer: "1/9",
          acceptedAnswers: [
            "\\frac19",
            "\\frac{1}{9}",
            "0.111...",
            "one ninth",
          ],
          hint:
            "Replace the numerator by tangent squared and the denominator by cotangent squared.",
          explanation:
            "The numerator is $\\tan^2\\theta=1/3$. The denominator is $\\cot^2\\theta=(\\sqrt3)^2=3$. Their quotient is $(1/3)/3=1/9$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises the two Pythagorean reciprocal identities with the tangent-cotangent reciprocal relationship.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-sec-qm10",
          prompt:
            "For each listed value of $k$, count the distinct solutions of $\\sec x=k$ on the closed interval. Enter the total across all four equations.",
          latex:
            "k\\in\\{-2,-1,1,2\\},\\qquad 0\\le x\\le2\\pi",
          answer: "7",
          acceptedAnswers: ["7 solutions", "2+1+2+2=7", "seven", "7.0"],
          hint:
            "Convert each equation to $\\cos x=1/k$ and treat the two included endpoints as distinct solutions.",
          explanation:
            "The values $k=-2,-1,1,2$ give respectively 2, 1, 2, and 2 cosine solutions on the closed interval. For $k=1$, both $0$ and $2\\pi$ count. The total is $2+1+2+2=7$.",
          difficulty: 5,
          diagnosticIntent:
            "Investigates a reciprocal-equation family while testing feasibility, extrema, and closed-interval endpoint multiplicity.",
          taskType: "investigative",
        }),
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
              acceptedAnswers: ["2.0", "two"],
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
              acceptedAnswers: ["4.0", "four"],
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
              acceptedAnswers: ["2.0", "two"],
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
              acceptedAnswers: ["1.0", "one"],
              hint: "Square your answers from parts (a) and (b), then subtract.",
              explanation: "csc²(30°) = 4 and cot²(30°) = 3, so 4 − 3 = 1. This confirms csc²θ − cot²θ = 1 (equivalently csc²θ = 1 + cot²θ).",
            },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "complementary-angle-identities") {
    const complementaryTriangle: import("../types").TriangleDiagram = {
      description:
        "Right triangle ABC with right angle at B, acute angle theta at A, and the complementary angle pi over two minus theta at C; the side opposite theta is adjacent to its complement.",
      vertices: {
        A: { x: 0, y: 0 },
        B: { x: 4, y: 0 },
        C: { x: 4, y: 3 },
      },
      angleLabels: {
        A: "\\theta",
        C: "\\frac{\\pi}{2}-\\theta",
      },
      sideLabels: {
        AB: "adjacent to \\theta",
        BC: "opposite \\theta",
        AC: "hypotenuse",
      },
      rightAngleAt: "B",
    };
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
          "The complement swaps sine to cosine, so sin(π/2 − π/3) = cos(π/3) = 1/2.",
          ["0.5", "\\frac{1}{2}"],
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
          "The complement swaps cosine to sine, so cos(90° − 30°) = sin(30°) = 1/2.",
          ["0.5", "\\frac{1}{2}"],
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
          "The complement swaps sine to cosine, so sin(π/2 − π/6) = cos(π/6) = √3/2.",
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
        {
          ...qualityChoice({
            id: "y11adv-cai-qm1",
            prompt:
              "In the right triangle, which equation correctly uses the same side ratio from the two complementary acute angles?",
            latex: "",
            answer: "A",
            choices: [
              "$\\sin\\theta=\\cos(\\frac{\\pi}{2}-\\theta)$",
              "$\\sin\\theta=-\\cos(\\frac{\\pi}{2}-\\theta)$",
              "$\\sin\\theta=\\sin(\\frac{\\pi}{2}-\\theta)$",
              "$\\sin\\theta=\\tan(\\frac{\\pi}{2}-\\theta)$",
            ],
            hint: "The side opposite theta is adjacent to the other acute angle.",
            explanation:
              "For angle $\\theta$, the ratio is opposite over hypotenuse. The same side is adjacent to $\\pi/2-\\theta$, so that ratio is cosine. Hence $\\sin\\theta=\\cos(\\pi/2-\\theta)$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks whether the student derives a co-function identity from side roles rather than recalling an isolated symbol swap.",
            taskType: "analytical",
            distractorMisconceptions: {
              B: "Adds a quadrant sign even though both triangle angles are acute.",
              C: "Keeps the function name instead of swapping opposite and adjacent roles.",
              D: "Uses opposite over adjacent instead of the shared hypotenuse ratio.",
            },
          }),
          triangleDiagram: complementaryTriangle,
        },
        qualityAnswer({
          id: "y11adv-cai-qm2",
          prompt: "Simplify the expression for acute $x$.",
          latex:
            "\\cos\\left(\\frac{\\pi}{2}-x\\right)+\\sin\\left(\\frac{\\pi}{2}-x\\right)",
          answer: "sinx+cosx",
          acceptedAnswers: [
            "cosx+sinx",
            "sin(x)+cos(x)",
            "\\sin x+\\cos x",
            "\\cos x+\\sin x",
          ],
          hint: "Apply the two complementary identities separately before adding.",
          explanation:
            "The cosine term becomes $\\sin x$, while the sine term becomes $\\cos x$. Therefore the expression simplifies to $\\sin x+\\cos x$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks coordinated application of both co-function identities within one expression.",
          taskType: "procedural",
        }),
        qualityAnswer({
          id: "y11adv-cai-qm3",
          prompt: "Evaluate the complementary tangent exactly.",
          latex: "\\tan\\left(\\frac{\\pi}{2}-\\frac{\\pi}{6}\\right)",
          answer: "sqrt(3)",
          acceptedAnswers: ["√3", "\\sqrt3", "\\sqrt{3}", "1/(sqrt(3)/3)"],
          hint: "Rewrite the tangent of a complement as cotangent, then use the exact tangent at pi over six.",
          explanation:
            "The co-function identity gives $\\tan(\\pi/2-\\pi/6)=\\cot(\\pi/6)$. Since $\\tan(\\pi/6)=1/\\sqrt3$, its reciprocal is $\\sqrt3$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether the student can apply the tangent-cotangent co-function identity and take the correct reciprocal exact value.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-cai-qm4",
          prompt:
            "A student writes $\\sin(\\frac{\\pi}{2}-x)=-\\cos x$, copying the sign change from $\\sin(\\pi-x)$. Which diagnosis is correct for acute $x$?",
          latex: "",
          answer: "D",
          choices: [
            "The student is correct because every changed angle changes the sign.",
            "The result should be $-\\sin x$ because the function name is unchanged.",
            "The result should be $\\cos x$ only when $x=\\pi/4$.",
            "A complement swaps sine and cosine without a sign change, so the result is $\\cos x$.",
          ],
          hint: "Distinguish a complement, which stays acute, from a supplementary quadrant-II angle.",
          explanation:
            "Both $x$ and $\\pi/2-x$ are acute, so their relevant ratios are positive. Complementary angles swap the opposite and adjacent roles, giving $\\sin(\\pi/2-x)=\\cos x$ with no negative sign.",
          difficulty: 3,
          diagnosticIntent:
            "Targets transfer of a supplementary-angle sign rule to a complementary-angle identity.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes any transformation of an angle reverses a trigonometric sign.",
            B: "Changes the sign but fails to apply the co-function swap.",
            C: "Treats the identity as an equation true only at one symmetric angle.",
          },
        }),
        qualityAnswer({
          id: "y11adv-cai-qm5",
          prompt:
            "For acute $x$, find $x$ from the complementary-angle equation.",
          latex: "\\sin\\left(\\frac{\\pi}{2}-x\\right)=\\frac{\\sqrt3}{2}",
          answer: "pi/6",
          acceptedAnswers: ["\\pi/6", "π/6", "30 degrees", "30°"],
          hint: "Convert the left side to cosine of x, then use an exact acute-angle value.",
          explanation:
            "The identity gives $\\cos x=\\sqrt3/2$. On the stated acute domain, the unique exact angle with this cosine value is $x=\\pi/6$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses co-function simplification by requiring recovery of an unknown acute angle from the transformed equation.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-cai-qm6",
          prompt:
            "Nadia first replaces the complementary sine; Eli first rewrites tangent as sine over cosine. State who has a valid method.",
          latex:
            "\\sin\\left(\\frac{\\pi}{2}-x\\right)\\tan x",
          answer: "both",
          acceptedAnswers: [
            "both methods",
            "Nadia and Eli",
            "both are valid",
            "both; sinx",
          ],
          hint: "Carry each proposed first step through to a common simplified expression.",
          explanation:
            "Nadia obtains $\\cos x\\tan x=\\sin x$. Eli writes tangent as $\\sin x/\\cos x$, then replaces the complementary sine by $\\cos x$ and cancels. Both methods give $\\sin x$ where tangent is defined.",
          difficulty: 4,
          diagnosticIntent:
            "Assesses recognition of two equivalent identity pathways and preservation of the original tangent domain.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-cai-qm7",
          prompt:
            "For integers $0\\le n\\le12$, how many values of $n$ make the expression equal to zero?",
          latex: "\\sin\\left(\\frac{\\pi}{2}-\\frac{n\\pi}{6}\\right)",
          answer: "2",
          acceptedAnswers: ["2 values", "n=3,9", "two", "2.0"],
          hint: "Use the complementary identity, then find when cosine is zero on the bounded list.",
          explanation:
            "The expression equals $\\cos(n\\pi/6)$. It is zero at $n\\pi/6=\\pi/2$ and $3\\pi/2$, corresponding to $n=3$ and $n=9$. Thus there are 2 values.",
          difficulty: 4,
          diagnosticIntent:
            "Uses a bounded discrete family to connect a co-function identity with periodic zero locations.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-cai-qm8",
          prompt:
            "On $0<x<\\pi/2$, when does $\\sin(\\frac{\\pi}{2}-x)=\\sin x$?",
          latex: "",
          answer: "B",
          choices: [
            "For every acute $x$",
            "Only at $x=\\frac{\\pi}{4}$",
            "Only at $x=\\frac{\\pi}{6}$",
            "Never, because sine and cosine cannot be equal",
          ],
          hint: "Use the co-function identity, then solve the resulting acute-angle equation.",
          explanation:
            "The equation becomes $\\cos x=\\sin x$, or $\\tan x=1$. On the acute interval the unique solution is $x=\\pi/4$. The co-function identity itself holds for every acute $x$, but the two sine values are equal only there.",
          difficulty: 5,
          diagnosticIntent:
            "Distinguishes an identity transformation from the separate equation obtained by setting the transformed value equal to sine x.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Confuses the universal co-function identity with equality of sine and cosine.",
            C: "Selects a familiar special angle without solving the transformed equation.",
            D: "Assumes distinct function names can never take the same value.",
          },
        }),
        qualityAnswer({
          id: "y11adv-cai-qm9",
          prompt:
            "For acute $x$, use the given sum to find the exact product.",
          latex:
            "\\sin x+\\cos x=\\frac75,\\qquad \\sin\\left(\\frac{\\pi}{2}-x\\right)\\cos\\left(\\frac{\\pi}{2}-x\\right)",
          answer: "12/25",
          acceptedAnswers: ["0.48", "\\frac{12}{25}", "12÷25", "12/25 square units"],
          hint: "Convert both complementary factors, then square the given sine-cosine sum.",
          explanation:
            "The product becomes $\\cos x\\sin x$. Squaring the given sum gives $49/25=\\sin^2x+\\cos^2x+2\\sin x\\cos x=1+2p$. Hence $p=(49/25-1)/2=12/25$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises both co-function identities with the Pythagorean identity to infer a product from an aggregate constraint.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-cai-qm10",
          prompt:
            "The statement is an identity for every acute $x$. Find $a-b$.",
          latex:
            "a\\sin\\left(\\frac{\\pi}{2}-x\\right)+b\\cos\\left(\\frac{\\pi}{2}-x\\right)=3\\sin x+5\\cos x",
          answer: "2",
          acceptedAnswers: ["a-b=2", "a - b = 2", "2.0"],
          hint: "Apply both co-function identities and match the sine and cosine coefficients.",
          explanation:
            "The left side becomes $a\\cos x+b\\sin x$. Matching coefficients with $3\\sin x+5\\cos x$ gives $b=3$ and $a=5$. Therefore $a-b=2$.",
          difficulty: 5,
          diagnosticIntent:
            "Requires coordinated co-function substitution and coefficient matching under an identity constraint.",
          taskType: "synthesis",
        }),
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
              explanation: "The complement swaps sine to cosine without changing sign, so sin(π/2 − x) = cos x.",
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
              explanation: "The complement swaps cosine to sine without changing sign, so cos(π/2 − x) = sin x.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Substitute and simplify the full expression.",
              latex: "",
              marks: 2,
              answer: "1",
              acceptedAnswers: ["1.0", "one"],
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
              acceptedAnswers: ["0.5", "\\frac{1}{2}"],
              hint: "Apply sin(π/2 − θ) = cos θ with θ = π/3.",
              explanation: "The complement swaps sine to cosine, so sin(π/2 − π/3) = cos(π/3) = 1/2.",
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
              explanation: "The complement swaps cosine to sine, so cos(π/2 − π/3) = sin(π/3) = √3/2.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find sin²(π/3) + cos²(π/3) using your answers from (a) and (b).",
              latex: "\\sin^2\\!\\left(\\frac{\\pi}{3}\\right)+\\cos^2\\!\\left(\\frac{\\pi}{3}\\right)",
              marks: 2,
              answer: "1",
              acceptedAnswers: ["1.0", "one"],
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

