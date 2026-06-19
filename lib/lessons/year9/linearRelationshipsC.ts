import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  if (/^-?\d{4,}$/.test(ans)) {
    autoVariants.push(ans.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(ans)) {
    autoVariants.push(`${ans}.0`);
  }
  if (/^-?\d*\.\d+$/.test(ans)) {
    autoVariants.push(`${ans}0`);
  }
  if (/^0\./.test(ans)) {
    autoVariants.push(ans.slice(1));
  }

  return {
    id,
    prompt,
    latex,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants])),
    hint: "Apply the relevant line equation technique, then rearrange carefully.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Consider the key rule taught in this lesson before choosing.",
    explanation,
  };
}

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
>;

const equationsOfLines: LessonContent = {
  description:
    "Find the equation of a line given gradient and y-intercept, gradient and a point, or two points. Rearrange between gradient-intercept form and general form.",
  learningIntention:
    "Determine the equation of a straight line from various given information, and convert between gradient-intercept form and general form.",
  successCriteria: [
    "Write the equation of a line directly when given the gradient m and y-intercept b.",
    "Use the point-gradient formula y − y₁ = m(x − x₁) to find the equation when given m and a point.",
    "Find the gradient from two points, then apply the point-gradient formula.",
    "Rearrange an equation from gradient-intercept form to general form ax + by + c = 0 with integer coefficients and a > 0.",
  ],
  teaching: {
    paragraphs: [
      "The gradient-intercept form y = mx + b identifies the gradient m and y-intercept b directly. Given these two values, write the equation immediately. For example, a line with gradient 4 and y-intercept −3 has equation y = 4x − 3 — no working is needed.",
      "If given the gradient m and a point (x₁, y₁), use the point-gradient formula: y − y₁ = m(x − x₁). Substitute the known gradient and coordinates, then expand and rearrange to the form y = mx + b. The formula works for any point on the line.",
      "If given two points, first find the gradient m = (y₂ − y₁)/(x₂ − x₁) by substituting the coordinates. Once you have m, apply the point-gradient formula using either of the two given points — you will reach the same equation either way.",
      "General form ax + by + c = 0 has integer coefficients with a > 0 and no common factors. To rearrange from y = mx + b: multiply every term by the denominator of any fraction to clear it, then move all terms to the left side so the right side equals zero. Check that a > 0; if not, multiply through by −1.",
    ],
    latexBlocks: [
      "y=mx+b",
      "y-y_1=m(x-x_1)",
      "m=\\frac{y_2-y_1}{x_2-x_1}",
    ],
  },
  workedExamples: [
    {
      title: "Equation from gradient and a point",
      questionLatex:
        "\\text{Find the equation of the line with gradient }3\\text{ passing through }(2,\\,1).",
      steps: [
        {
          explanation: "Substitute m = 3 and the point (2, 1) into the point-gradient formula.",
          latex: "y-1=3(x-2)",
        },
        {
          explanation: "Expand the right side.",
          latex: "y-1=3x-6",
        },
        {
          explanation: "Add 1 to both sides to get y = mx + b form.",
          latex: "y=3x-5",
        },
      ],
      finalAnswerLatex: "y=3x-5",
    } satisfies WorkedExample,
    {
      title: "Equation from two points",
      questionLatex:
        "\\text{Find the equation of the line through }(-1,\\,4)\\text{ and }(3,\\,-4).",
      steps: [
        {
          explanation: "Find the gradient using the two points.",
          latex: "m=\\frac{-4-4}{3-(-1)}=\\frac{-8}{4}=-2",
        },
        {
          explanation: "Substitute m = −2 and the point (−1, 4) into the point-gradient formula.",
          latex: "y-4=-2(x-(-1))\\;\\Rightarrow\\;y-4=-2(x+1)",
        },
        {
          explanation: "Expand and rearrange.",
          latex: "y-4=-2x-2\\;\\Rightarrow\\;y=-2x+2",
        },
      ],
      finalAnswerLatex: "y=-2x+2",
    } satisfies WorkedExample,
    {
      title: "Rearrange to general form",
      questionLatex:
        "\\text{Rearrange }y=\\dfrac{2}{3}x-4\\text{ to general form }ax+by+c=0.",
      steps: [
        {
          explanation: "Multiply every term by 3 to clear the fraction.",
          latex: "3y=2x-12",
        },
        {
          explanation: "Move all terms to the left side.",
          latex: "0=2x-3y-12",
        },
        {
          explanation: "Write with the left side on the right (general form, a > 0).",
          latex: "2x-3y-12=0",
        },
      ],
      finalAnswerLatex: "2x-3y-12=0",
    } satisfies WorkedExample,
  ],
  guidedPractice: [
    choice(
      "lrc-eol-g1",
      "A line has gradient 5 and y-intercept −2. Which equation describes it?",
      "B",
      ["$y = -2x + 5$", "$y = 5x - 2$", "$y = 5x + 2$", "$y = -5x - 2$"],
      "In y = mx + b, m is the gradient (5) and b is the y-intercept (−2), giving y = 5x − 2."
    ),
    choice(
      "lrc-eol-g2",
      "Which formula should you use when given the gradient and one point on the line?",
      "C",
      [
        "$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$",
        "$y = mx + b$",
        "$y - y_1 = m(x - x_1)$",
        "$ax + by + c = 0$",
      ],
      "The point-gradient formula y − y₁ = m(x − x₁) is used when you know the gradient m and a point (x₁, y₁)."
    ),
    answer(
      "lrc-eol-g3",
      "A line has gradient 3 and passes through (1, 5). Using y − y₁ = m(x − x₁), the equation simplifies to y = 3x + c. What is c?",
      "y-5=3(x-1)",
      "2",
      "y − 5 = 3(x − 1) → y − 5 = 3x − 3 → y = 3x + 2, so c = 2."
    ),
    answer(
      "lrc-eol-g4",
      "Two points are (0, 1) and (2, 7). What is the gradient of the line through these points?",
      "m=\\dfrac{7-1}{2-0}",
      "3",
      "(7 − 1)/(2 − 0) = 6/2 = 3."
    ),
  ],
  independentPractice: [
    answer(
      "lrc-eol-i1",
      "Find the equation of the line with gradient −4 and y-intercept 6. What is the y-intercept (the value of b)?",
      "y=-4x+b,\\quad b=?",
      "6",
      "Gradient m = −4 and y-intercept b = 6, so the equation is y = −4x + 6."
    ),
    answer(
      "lrc-eol-i2",
      "A line with gradient 2 passes through (3, 7). Its equation is y = 2x + c. What is c?",
      "y-7=2(x-3)",
      "1",
      "y − 7 = 2(x − 3) → y = 2x − 6 + 7 = 2x + 1, so c = 1."
    ),
    answer(
      "lrc-eol-i3",
      "Find the equation of the line through (0, −3) and (4, 5). What is the gradient?",
      "m=\\dfrac{5-(-3)}{4-0}",
      "2",
      "(5 − (−3))/(4 − 0) = 8/4 = 2."
    ),
    answer(
      "lrc-eol-i4",
      "The line through (0, −3) and (4, 5) has gradient 2. Its equation is y = 2x + c. What is c?",
      "y-(-3)=2(x-0)",
      "-3",
      "Using the point (0, −3): y − (−3) = 2(x − 0) → y = 2x − 3, so c = −3.",
      ["-3.0"]
    ),
    choice(
      "lrc-eol-i5",
      "Which of the following is the general form of y = 3x − 5?",
      "A",
      ["$3x - y - 5 = 0$", "$3x + y + 5 = 0$", "$y - 3x + 5 = 0$", "$-3x + y + 5 = 0$"],
      "Move all terms to the left: y = 3x − 5 → 0 = 3x − y − 5 → 3x − y − 5 = 0. Here a = 3 > 0."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing m and b in y = mx + b, e.g. writing y = bx + m.",
      fix: "m is always the coefficient of x (the gradient); b is the constant (the y-intercept).",
    },
    {
      mistake: "Using the wrong sign when substituting a negative x-coordinate into the point-gradient formula.",
      fix: "Write y − y₁ = m(x − x₁) and substitute carefully, keeping brackets around negative values.",
    },
    {
      mistake: "Forgetting to multiply the numerator when clearing fractions for general form.",
      fix: "Multiply every term on both sides by the denominator before rearranging.",
    },
    {
      mistake: "Leaving the general form with a < 0, e.g. writing −2x + y + 4 = 0.",
      fix: "If the coefficient of x is negative, multiply the entire equation by −1 so that a > 0.",
    },
  ],
  masteryQuiz: [
    answer(
      "lrc-eol-m1",
      "A line has gradient −3 and y-intercept 7. What is the gradient?",
      "y=-3x+7",
      "-3",
      "In y = mx + b, m = −3 is the gradient.",
      ["-3.0"]
    ),
    answer(
      "lrc-eol-m2",
      "A line with gradient 4 passes through (2, 3). Its equation is y = 4x + c. What is c?",
      "y-3=4(x-2)",
      "-5",
      "y − 3 = 4(x − 2) → y = 4x − 8 + 3 = 4x − 5, so c = −5.",
      ["-5.0"]
    ),
    choice(
      "lrc-eol-m3",
      "Which equation passes through both (0, 3) and (2, 7)?",
      "B",
      ["$y = 3x + 2$", "$y = 2x + 3$", "$y = 2x - 3$", "$y = 4x + 3$"],
      "Gradient = (7 − 3)/(2 − 0) = 2; y-intercept = 3 (from (0, 3)). Equation: y = 2x + 3."
    ),
    answer(
      "lrc-eol-m4",
      "Find the equation of the line through (1, −2) and (3, 4). What is the gradient?",
      "m=\\dfrac{4-(-2)}{3-1}",
      "3",
      "(4 − (−2))/(3 − 1) = 6/2 = 3."
    ),
    answer(
      "lrc-eol-m5",
      "The line through (1, −2) and (3, 4) has gradient 3. Its equation is y = 3x + c. What is c?",
      "y-(-2)=3(x-1)",
      "-5",
      "y + 2 = 3(x − 1) → y = 3x − 3 − 2 = 3x − 5, so c = −5.",
      ["-5.0"]
    ),
    answer(
      "lrc-eol-m6",
      "Rearrange y = 2x + 5 to general form ax + by + c = 0. What is c?",
      "2x-y+5=0",
      "5",
      "y = 2x + 5 → 0 = 2x − y + 5 → 2x − y + 5 = 0. Here c = 5."
    ),
    choice(
      "lrc-eol-m7",
      "Which is the correct general form of y = (1/2)x − 3?",
      "A",
      ["$x - 2y - 6 = 0$", "$x + 2y - 6 = 0$", "$2x - y - 3 = 0$", "$x - 2y + 6 = 0$"],
      "Multiply by 2: 2y = x − 6 → x − 2y − 6 = 0. Check: a = 1 > 0."
    ),
    answer(
      "lrc-eol-m8",
      "A line passes through (−2, 5) with gradient −1. Its equation is y = −x + c. What is c?",
      "y-5=-1(x-(-2))",
      "3",
      "y − 5 = −(x + 2) → y = −x − 2 + 5 = −x + 3, so c = 3."
    ),
    answer(
      "lrc-eol-m9",
      "Find the equation of the line through (2, −1) and (−2, 7). What is the y-intercept b?",
      "m=\\dfrac{7-(-1)}{-2-2}=-2,\\quad y=-2x+b",
      "3",
      "m = (7 − (−1))/(−2 − 2) = 8/(−4) = −2. Using (2, −1): −1 = −2(2) + b → b = 3."
    ),
    choice(
      "lrc-eol-m10",
      "What is the general form of y = −(3/4)x + 2?",
      "C",
      [
        "$3x - 4y + 8 = 0$",
        "$-3x + 4y - 8 = 0$",
        "$3x + 4y - 8 = 0$",
        "$3x - 4y - 8 = 0$",
      ],
      "Multiply by 4: 4y = −3x + 8 → 3x + 4y − 8 = 0. Check: a = 3 > 0."
    ),
  ],
};

const parallelPerpendicularLines: LessonContent = {
  description:
    "Identify parallel and perpendicular lines using their gradients, and find the equation of a line parallel or perpendicular to a given line through a given point.",
  learningIntention:
    "Use the gradient conditions for parallel and perpendicular lines to find equations of related lines.",
  successCriteria: [
    "State that parallel lines have equal gradients (m₁ = m₂).",
    "State that perpendicular lines have gradients whose product is −1 (m₁ × m₂ = −1).",
    "Find the perpendicular gradient using m₂ = −1/m₁ (the negative reciprocal).",
    "Find the equation of a line parallel or perpendicular to a given line through a given point using the point-gradient formula.",
  ],
  teaching: {
    paragraphs: [
      "Parallel lines never intersect and have the SAME gradient. If y = 3x + 2 is one line, any line y = 3x + b (with any b ≠ 2) is parallel to it. Changing b shifts the line up or down without changing its slope, so the lines remain parallel.",
      "Perpendicular lines intersect at a right angle (90°). Their gradients multiply to −1: m₁ × m₂ = −1, so m₂ = −1/m₁. The perpendicular gradient is the negative reciprocal of the original — flip the fraction and change the sign. For example, if m₁ = 2 then m₂ = −1/2.",
      "To find the equation of a line parallel to y = mx + b through point (x₁, y₁): keep the same gradient m, substitute into the point-gradient formula y − y₁ = m(x − x₁), then rearrange to y = mx + b.",
      "To find the equation of a line perpendicular to y = mx + b through point (x₁, y₁): first calculate the perpendicular gradient m₂ = −1/m, then substitute m₂ and the point into the point-gradient formula y − y₁ = m₂(x − x₁) and rearrange.",
    ],
    latexBlocks: [
      "\\text{parallel: }m_1=m_2",
      "\\text{perpendicular: }m_1\\times m_2=-1",
      "m_2=-\\frac{1}{m_1}",
    ],
  },
  workedExamples: [
    {
      title: "Line parallel to a given line",
      questionLatex:
        "\\text{Find the equation of the line parallel to }y=2x+5\\text{ through }(3,\\,1).",
      steps: [
        {
          explanation: "Parallel lines have the same gradient, so m = 2.",
          latex: "m=2",
        },
        {
          explanation: "Substitute m = 2 and the point (3, 1) into the point-gradient formula.",
          latex: "y-1=2(x-3)",
        },
        {
          explanation: "Expand and rearrange.",
          latex: "y-1=2x-6\\;\\Rightarrow\\;y=2x-5",
        },
      ],
      finalAnswerLatex: "y=2x-5",
    } satisfies WorkedExample,
    {
      title: "Line perpendicular to a given line",
      questionLatex:
        "\\text{Find the equation of the line perpendicular to }y=3x-4\\text{ through }(3,\\,2).",
      steps: [
        {
          explanation: "The gradient of the given line is 3. The perpendicular gradient is the negative reciprocal.",
          latex: "m_2=-\\frac{1}{3}",
        },
        {
          explanation: "Substitute m₂ = −1/3 and the point (3, 2) into the point-gradient formula.",
          latex: "y-2=-\\frac{1}{3}(x-3)",
        },
        {
          explanation: "Expand and rearrange.",
          latex: "y-2=-\\frac{x}{3}+1\\;\\Rightarrow\\;y=-\\frac{1}{3}x+3",
        },
      ],
      finalAnswerLatex: "y=-\\dfrac{1}{3}x+3",
    } satisfies WorkedExample,
    {
      title: "Verify two lines are perpendicular",
      questionLatex:
        "\\text{Show that }y=4x+1\\text{ and }y=-\\dfrac{1}{4}x+3\\text{ are perpendicular.}",
      steps: [
        {
          explanation: "Identify the gradients of the two lines.",
          latex: "m_1=4,\\quad m_2=-\\frac{1}{4}",
        },
        {
          explanation: "Multiply the gradients together.",
          latex: "m_1\\times m_2=4\\times\\left(-\\frac{1}{4}\\right)=-1",
        },
        {
          explanation: "Since the product of the gradients is −1, the lines are perpendicular.",
          latex: "m_1\\times m_2=-1\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{The lines are perpendicular since }m_1\\times m_2=-1.",
    } satisfies WorkedExample,
  ],
  guidedPractice: [
    choice(
      "lrc-ppl-g1",
      "Which gradient is parallel to a line with gradient 4?",
      "B",
      ["$-4$", "$4$", "$\\dfrac{1}{4}$", "$-\\dfrac{1}{4}$"],
      "Parallel lines have equal gradients. A line parallel to gradient 4 also has gradient 4."
    ),
    choice(
      "lrc-ppl-g2",
      "Which gradient is perpendicular to a line with gradient 4?",
      "D",
      ["$4$", "$-4$", "$\\dfrac{1}{4}$", "$-\\dfrac{1}{4}$"],
      "The perpendicular gradient is the negative reciprocal: m₂ = −1/4."
    ),
    answer(
      "lrc-ppl-g3",
      "A line perpendicular to y = 5x + 2 has gradient m = −1/5. Express this as a decimal.",
      "m_2=-\\dfrac{1}{5}",
      "-0.2",
      "−1/5 = −0.2.",
      ["-1/5", "-.2"]
    ),
    answer(
      "lrc-ppl-g4",
      "A line parallel to y = −3x + 1 passes through (0, 4). What is its y-intercept?",
      "y=-3x+b,\\text{ through }(0,4)",
      "4",
      "Parallel lines have the same gradient m = −3. The point (0, 4) gives y-intercept b = 4 directly."
    ),
  ],
  independentPractice: [
    answer(
      "lrc-ppl-i1",
      "Find the gradient of a line perpendicular to y = 2x − 3. Give your answer as a decimal.",
      "m_2=-\\dfrac{1}{2}",
      "-0.5",
      "The perpendicular gradient is −1/2 = −0.5.",
      ["-1/2", "-.5"]
    ),
    answer(
      "lrc-ppl-i2",
      "A line parallel to y = 4x − 1 passes through (1, 3). Its equation is y = 4x + c. What is c?",
      "y-3=4(x-1)",
      "-1",
      "y − 3 = 4(x − 1) → y = 4x − 4 + 3 = 4x − 1, so c = −1.",
      ["-1.0"]
    ),
    answer(
      "lrc-ppl-i3",
      "A line perpendicular to y = 2x + 3 passes through (2, 1). Its equation is y = (−1/2)x + c. What is c?",
      "y-1=-\\dfrac{1}{2}(x-2)",
      "2",
      "y − 1 = −(1/2)(x − 2) → y = −x/2 + 1 + 1 = −x/2 + 2, so c = 2."
    ),
    choice(
      "lrc-ppl-i4",
      "Which equation is parallel to y = −2x + 7?",
      "C",
      ["$y = 2x + 7$", "$y = \\dfrac{1}{2}x + 7$", "$y = -2x - 3$", "$y = -\\dfrac{1}{2}x + 7$"],
      "Parallel lines share the same gradient. Only y = −2x − 3 has gradient −2."
    ),
    answer(
      "lrc-ppl-i5",
      "Do the lines y = 3x + 1 and y = (−1/3)x + 4 intersect at right angles? Multiply their gradients. What is the product?",
      "3\\times\\left(-\\dfrac{1}{3}\\right)",
      "-1",
      "3 × (−1/3) = −1. Since the product equals −1, the lines are perpendicular (right angles).",
      ["-1.0"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the same gradient for perpendicular lines (confusing parallel and perpendicular).",
      fix: "Parallel lines share the same gradient; perpendicular lines use the negative reciprocal.",
    },
    {
      mistake: "Taking the reciprocal without changing the sign: m₁ = 2 so m₂ = 1/2.",
      fix: "The perpendicular gradient is the NEGATIVE reciprocal: m₂ = −1/m₁. Both steps — flip and negate — are required.",
    },
    {
      mistake: "Assuming a line perpendicular to y = 3 has gradient −1/3.",
      fix: "y = 3 is a horizontal line with gradient 0. A line perpendicular to it is vertical (undefined gradient), not −1/3.",
    },
    {
      mistake: "Using the original gradient instead of the perpendicular gradient in the point-gradient formula.",
      fix: "Calculate m₂ = −1/m₁ first, then substitute m₂ — not m₁ — into y − y₁ = m₂(x − x₁).",
    },
  ],
  masteryQuiz: [
    choice(
      "lrc-ppl-m1",
      "Which pair of gradients describes perpendicular lines?",
      "C",
      ["$3$ and $3$", "$2$ and $-2$", "$5$ and $-\\dfrac{1}{5}$", "$-3$ and $-\\dfrac{1}{3}$"],
      "Perpendicular gradients multiply to −1. 5 × (−1/5) = −1 ✓. Option D gives (−3)(−1/3) = +1, not −1, so it is not perpendicular."
    ),
    answer(
      "lrc-ppl-m2",
      "Find the gradient of a line perpendicular to y = −4x + 2. Give your answer as a fraction (e.g. 1/4).",
      "m_2=-\\dfrac{1}{-4}=\\dfrac{1}{4}",
      "1/4",
      "m₂ = −1/(−4) = 1/4.",
      ["0.25"]
    ),
    choice(
      "lrc-ppl-m3",
      "Which equation is parallel to y = −2x + 7 and passes through (0, 1)?",
      "A",
      ["$y = -2x + 1$", "$y = 2x + 1$", "$y = -2x + 7$", "$y = \\dfrac{1}{2}x + 1$"],
      "Parallel to y = −2x + 7 means gradient −2. Through (0, 1) means y-intercept 1. Equation: y = −2x + 1."
    ),
    answer(
      "lrc-ppl-m4",
      "Find the equation of the line parallel to y = 3x − 2 through (2, 8). What is the y-intercept b?",
      "y-8=3(x-2)",
      "2",
      "y − 8 = 3(x − 2) → y = 3x − 6 + 8 = 3x + 2, so b = 2."
    ),
    answer(
      "lrc-ppl-m5",
      "Find the equation of the line perpendicular to y = 4x − 1 through (4, 3). What is the y-intercept b?",
      "y-3=-\\dfrac{1}{4}(x-4)",
      "4",
      "m₂ = −1/4. y − 3 = −(1/4)(x − 4) → y = −x/4 + 1 + 3 = −x/4 + 4, so b = 4."
    ),
    choice(
      "lrc-ppl-m6",
      "Are y = 2x + 3 and y = −(1/2)x + 5 parallel, perpendicular, or neither?",
      "B",
      ["Parallel", "Perpendicular", "Neither", "The same line"],
      "Gradients are 2 and −1/2. Product = 2 × (−1/2) = −1, so the lines are perpendicular."
    ),
    answer(
      "lrc-ppl-m7",
      "A line perpendicular to y = (1/2)x + 3 passes through (1, 0). What is its y-intercept b?",
      "y-0=-2(x-1)",
      "2",
      "m₂ = −1/(1/2) = −2. y − 0 = −2(x − 1) → y = −2x + 2, so b = 2."
    ),
    answer(
      "lrc-ppl-m8",
      "The line y = mx + b is parallel to y = −5x + 3. What is m?",
      "\\text{parallel: }m_1=m_2",
      "-5",
      "Parallel lines have equal gradients. So m = −5.",
      ["-5.0"]
    ),
    choice(
      "lrc-ppl-m9",
      "Which equation is perpendicular to y = 3x + 1 and passes through (3, 2)?",
      "D",
      [
        "$y = 3x - 7$",
        "$y = -3x + 11$",
        "$y = \\dfrac{1}{3}x + 1$",
        "$y = -\\dfrac{1}{3}x + 3$",
      ],
      "Perpendicular gradient m₂ = −1/3. y − 2 = −(1/3)(x − 3) → y = −x/3 + 1 + 2 = −x/3 + 3."
    ),
    answer(
      "lrc-ppl-m10",
      "Two lines have gradients m₁ = −2/3 and m₂. For them to be perpendicular, what must m₂ equal? Give as a fraction.",
      "m_1\\times m_2=-1,\\quad m_1=-\\dfrac{2}{3}",
      "3/2",
      "m₂ = −1/m₁ = −1/(−2/3) = 3/2.",
      ["1.5"]
    ),
  ],
};

const lessons: Record<string, LessonContent> = {
  "equations-of-lines": equationsOfLines,
  "parallel-perpendicular-lines": parallelPerpendicularLines,
};

export function year9LinearRelationshipsCLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-9-mathematics", "year-9-mathematics-advanced"].includes(course.slug) ||
    unit.slug !== "linear-relationships-c"
  ) {
    return null;
  }
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
