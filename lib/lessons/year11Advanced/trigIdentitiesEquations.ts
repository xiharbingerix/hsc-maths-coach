import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../newCourseCatalog";
import { practicalChoice, formulaAnswer } from "../questionHelpers";
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
    };
  }

  return null;
}

