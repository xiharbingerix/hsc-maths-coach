import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { CartesianGraph } from "../types";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

function workingFunctionsFeedback(prompt: string, answer: string) {
  if (prompt.includes("Evaluate the displayed function")) {
    return `Function notation is an instruction to substitute the given input everywhere x appears. Use brackets around negative inputs before evaluating powers; this gives ${answer}.`;
  }
  if (
    prompt.includes("excluded from the domain") ||
    prompt.includes("excluded x-value")
  ) {
    return `A reciprocal function cannot use an input that makes its denominator zero. Set the denominator equal to zero and exclude that x-value, which gives ${answer}.`;
  }
  if (prompt.includes("vertical asymptote")) {
    return `A vertical asymptote occurs where the reciprocal denominator would be zero. Solve that denominator equation to find the vertical line ${answer}.`;
  }
  if (prompt.includes("horizontal asymptote")) {
    return `For a simple reciprocal function, the fraction shrinks towards zero as x moves far from the centre. The remaining vertical shift is the horizontal asymptote, so the answer is ${answer}.`;
  }
  if (prompt.includes("y-intercept")) {
    return `The y-intercept is where the graph crosses the y-axis, so use x = 0. Evaluating the function at zero gives ${answer}.`;
  }
  if (
    prompt.includes("zero") ||
    prompt.includes("x-intercept")
  ) {
    return `Zeros and x-intercepts occur where the output is zero. Set each factor or the full function equal to zero, then choose the requested solution; this gives ${answer}.`;
  }
  if (prompt.includes("absolute value") || prompt.includes("|")) {
    return `Absolute value measures distance from zero, so it is never negative. Work inside the absolute value first, then make the result positive if needed; this gives ${answer}.`;
  }
  if (prompt.includes("even") || prompt.includes("odd") || prompt.includes("symmetry")) {
    return `Even functions satisfy f(-x) = f(x) and have y-axis symmetry. Odd functions satisfy f(-x) = -f(x) and have origin symmetry. Applying the matching test gives ${answer}.`;
  }
  return `Identify whether the question asks for an output, a restriction, an intercept or an asymptote before calculating. Following that feature gives ${answer}.`;
}

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseFormulaAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: workingFunctionsFeedback(prompt, answer),
  };
}

function absoluteValueGraph(
  description: string,
  h: number,
  k: number,
  label: string
): CartesianGraph {
  return {
    description,
    xMin: -5,
    xMax: 5,
    yMin: -1,
    yMax: 7,
    xStep: 1,
    yStep: 1,
    lineSegments: [
      { from: { x: -5, y: Math.abs(-5 - h) + k }, to: { x: h, y: k } },
      { from: { x: h, y: k }, to: { x: 5, y: Math.abs(5 - h) + k } },
    ],
    points: [{ x: h, y: k, label }],
  };
}

function sampledCurveGraph(
  description: string,
  fn: (x: number) => number,
  points: CartesianGraph["points"]
): CartesianGraph {
  const curvePoints = Array.from({ length: 81 }, (_, index) => {
    const x = -3 + (6 * index) / 80;
    return { x, y: fn(x) };
  });

  return {
    description,
    xMin: -3,
    xMax: 3,
    yMin: -5,
    yMax: 5,
    xStep: 1,
    yStep: 1,
    lineSegments: curvePoints.slice(1).map((point, index) => ({
      from: curvePoints[index],
      to: point,
    })),
    points,
  };
}

function qa(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

export function year11AdvancedWorkingFunctionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "working-with-functions"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "function-notation-domain-range") {
    return {
      ...base,
      description:
        "Evaluate functions, handle negative inputs carefully, and identify domain and range restrictions from algebraic and table descriptions.",
      learningIntention:
        "Use function notation accurately and determine domain and range restrictions from algebraic rules, denominators, square roots, tables, and graph descriptions.",
      successCriteria: [
        "Evaluate function values using correct substitution and brackets.",
        "Identify domain restrictions caused by denominators and square roots.",
        "Read simple domain and range information from a table or graph description.",
        "Recognise common errors involving negative inputs, domain, and range.",
      ],
      teaching: {
        paragraphs: [
          "Function notation such as f(x) means the output produced when the input is x. Evaluating f(-2) means replacing every x with (-2), including brackets around the negative input.",
          "The domain is the set of allowed input values. Denominators cannot be zero, and square roots need the expression inside the root to be non-negative for real-valued functions.",
          "The range is the set of possible output values. In Year 11 Advanced, range can often be read from a table, a graph description, or a simple vertex description.",
          "A strong answer separates input restrictions from output behaviour. Do not list an excluded x-value as a range restriction.",
        ],
        latexBlocks: [
          "f(-2)=2(-2)^2-3(-2)+1",
          "\\text{For } g(x)=\\frac{1}{x-4},\\quad x\\neq 4",
          "\\text{For } h(x)=\\sqrt{x+3},\\quad x\\ge -3",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a function with a negative input",
          questionLatex: "f(x)=2x^2-3x+1,\\quad \\text{find } f(-2)",
          steps: [
            {
              explanation:
                "Replace every x with (-2). Brackets matter because the input is negative.",
              latex: "f(-2)=2(-2)^2-3(-2)+1",
            },
            {
              explanation: "Evaluate powers first, then multiplication and addition.",
              latex: "2(4)+6+1=15",
            },
          ],
          finalAnswerLatex: "f(-2)=15",
        },
        {
          title: "Find a rational function domain restriction",
          questionLatex: "g(x)=\\frac{1}{x-4}",
          steps: [
            {
              explanation:
                "The denominator cannot be zero, so set the denominator equal to zero to find the excluded value.",
              latex: "x-4=0",
            },
            {
              explanation: "Solve for the excluded input.",
              latex: "x=4",
            },
          ],
          finalAnswerLatex: "\\text{Domain: }x\\neq 4",
        },
        {
          title: "Read domain and range from a table",
          questionLatex:
            "\\begin{array}{c|ccccc}x&-2&-1&0&1&2\\\\ f(x)&4&1&0&1&4\\end{array}",
          steps: [
            {
              explanation:
                "The listed x-values are the inputs shown in the table.",
              latex: "\\{-2,-1,0,1,2\\}",
            },
            {
              explanation:
                "The distinct output values are 0, 1, and 4.",
              latex: "\\{0,1,4\\}",
            },
          ],
          finalAnswerLatex:
            "\\text{Domain }\\{-2,-1,0,1,2\\},\\quad \\text{range }\\{0,1,4\\}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-fn-g1", "Evaluate the displayed function at the given input.", "f(x)=2x^2-3x+1,\\quad f(-2)", "15", ["f(-2)=15"]),
        formulaAnswer("y11adv-fn-g2", "Which x-value is excluded from the domain of the displayed function?", "g(x)=\\frac{1}{x-4},\\quad x-4\\ne0", "4", ["x=4"]),
        practicalChoice("y11adv-fn-g3", "For the displayed square-root function, which domain is correct?", "B", ["x > 3", "x >= -3", "x <= -3", "x != -3"], "The expression under the square root must be non-negative.", "h(x)=\\sqrt{x+3}"),
        practicalChoice("y11adv-fn-g4", "A table has x-values -2, -1, 0, 1, 2 and outputs 4, 1, 0, 1, 4. Which range is correct?", "C", ["{-2,-1,0,1,2}", "{4,1,0,1,4}", "{0,1,4}", "All real numbers"], "The range uses distinct output values."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-fn-i1", "Evaluate the displayed function at the given input.", "p(x)=x^2-5x,\\quad p(-3)", "24", ["p(-3)=24"]),
        formulaAnswer("y11adv-fn-i2", "Which x-value is excluded from the domain of the displayed function?", "q(x)=\\frac{3}{x+2},\\quad x+2\\ne0", "-2", ["x=-2"]),
        practicalChoice("y11adv-fn-i3", "For the displayed square-root function, which domain is correct?", "D", ["x >= 5", "x != 5", "x < -5", "x <= 5"], "The expression 5 - x must be at least zero.", "r(x)=\\sqrt{5-x}"),
        practicalChoice("y11adv-fn-i4", "A graph description says the lowest y-value is -4 and the graph continues upward forever. Which range matches?", "A", ["y >= -4", "x >= -4", "y <= -4", "x != -4"], "Range describes output y-values."),
        formulaAnswer("y11adv-fn-i5", "Which x-value is excluded from the domain of the displayed function?", "f(x)=\\frac{x+1}{x-6},\\quad x-6\\ne0", "6", ["x=6"]),
      ],
      commonMistakes: [
        { mistake: "Substituting a negative input without brackets.", fix: "Use brackets, for example (-2)^2, so the sign is handled correctly." },
        { mistake: "Confusing domain and range.", fix: "Domain is input x-values; range is output y-values." },
        { mistake: "Allowing a denominator to equal zero.", fix: "Set the denominator not equal to zero and exclude that x-value." },
        { mistake: "Forgetting square-root restrictions.", fix: "For real-valued functions, the expression under a square root must be at least zero." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-fn-m1", "Evaluate the displayed function at the given input.", "f(x)=2x^2-3x+1,\\quad f(-1)", "6", ["f(-1)=6"]),
        formulaAnswer("y11adv-fn-m2", "Which x-value is excluded from the domain of the displayed function?", "g(x)=\\frac{1}{x-7},\\quad x-7\\ne0", "7", ["x=7"]),
        practicalChoice("y11adv-fn-m3", "For the displayed square-root function, which domain is correct?", "A", ["x >= 2", "x <= 2", "x != 2", "x > -2"], "x - 2 must be at least zero.", "h(x)=\\sqrt{x-2}"),
        practicalChoice("y11adv-fn-m4", "A table gives outputs 9, 4, 1, 0, 1. Which set could be the range?", "B", ["{-2,-1,0,1,2}", "{0,1,4,9}", "{9,4,1,0,1}", "All real numbers"], "Range records distinct output values."),
        formulaAnswer("y11adv-fn-m5", "Evaluate the displayed function at the given input.", "p(x)=x^2+4x,\\quad p(-5)", "5", ["p(-5)=5"]),
        practicalChoice("y11adv-fn-m6", "Which error would most likely give the wrong sign when evaluating the displayed function?", "C", ["Using $x=2$", "Writing the range first", "Not using brackets around -2", "Finding the y-intercept"], "Negative inputs should be substituted with brackets.", "f(-2)=3(-2)^2+(-2)"),
        formulaAnswer("y11adv-fn-m7", "Which x-value is excluded from the domain of the displayed function?", "q(x)=\\frac{x-3}{x+5},\\quad x+5\\ne0", "-5", ["x=-5"]),
        practicalChoice("y11adv-fn-m8", "A graph has outputs from -1 to 6 inclusive. Which range matches?", "D", ["-1 <= x <= 6", "x != 6", "y < -1", "-1 <= y <= 6"], "Range uses y-values."),
        formulaAnswer("y11adv-fn-m9", "Evaluate the displayed function at the given input.", "f(x)=4-x^2,\\quad f(3)", "-5", ["f(3)=-5"]),
        practicalChoice("y11adv-fn-m10", "For the displayed reciprocal function, the domain restriction is:", "A", ["x != -1", "x != 1", "y != -1", "x >= -1"], "The denominator x + 1 cannot be zero.", "y=\\frac{1}{x+1}"),
      ],
      masteryQuizPool: [
        { id: "y11adv-fn-p1", prompt: "Evaluate the displayed function.", latex: "f(x)=2x^2-3x+1,\\quad f(-1)", answer: "6", difficulty: 1, acceptedAnswers: ["f(-1)=6"], hint: "Substitute $x=-1$ with brackets.", explanation: "$2(-1)^2-3(-1)+1=2+3+1=6$." },
        { id: "y11adv-fn-p2", prompt: "Evaluate the displayed function.", latex: "f(x)=x^2+2x,\\quad f(3)", answer: "15", difficulty: 1, hint: "Substitute $x=3$.", explanation: "$3^2+2(3)=9+6=15$." },
        { id: "y11adv-fn-p3", prompt: "Evaluate the displayed function.", latex: "g(x)=5-2x,\\quad g(4)", answer: "-3", difficulty: 1, acceptedAnswers: ["-3", "−3"], hint: "Substitute $x=4$.", explanation: "$5-2(4)=5-8=-3$." },
        { id: "y11adv-fn-p4", prompt: "Which x-value is excluded from the domain of the displayed function?", latex: "g(x)=\\frac{1}{x-4},\\quad x-4\\ne0", answer: "4", difficulty: 1, acceptedAnswers: ["x=4"], hint: "Set the denominator to zero.", explanation: "$x-4=0$ gives $x=4$." },
        { id: "y11adv-fn-p5", prompt: "Which x-value is excluded from the domain of the displayed function?", latex: "g(x)=\\frac{3}{x+2},\\quad x+2\\ne0", answer: "-2", difficulty: 1, acceptedAnswers: ["-2", "−2", "x=-2"], hint: "Set the denominator to zero.", explanation: "$x+2=0$ gives $x=-2$." },
        { id: "y11adv-fn-p6", prompt: "Evaluate the displayed function.", latex: "p(x)=x^2-5x,\\quad p(-3)", answer: "24", difficulty: 2, acceptedAnswers: ["p(-3)=24"], hint: "Use brackets around $-3$.", explanation: "$(-3)^2-5(-3)=9+15=24$." },
        { id: "y11adv-fn-p7", prompt: "Evaluate the displayed function.", latex: "f(x)=4-x^2,\\quad f(3)", answer: "-5", difficulty: 2, acceptedAnswers: ["-5", "−5", "f(3)=-5"], hint: "Square first, then subtract.", explanation: "$4-3^2=4-9=-5$." },
        { id: "y11adv-fn-p8", prompt: "For the displayed square-root function, which domain is correct?", latex: "h(x)=\\sqrt{x-2}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$x\\ge 2$" }, { label: "B", text: "$x\\le 2$" }, { label: "C", text: "$x\\ne 2$" }, { label: "D", text: "$x> -2$" }], hint: "The inside of the root must be $\\ge 0$.", explanation: "$x-2\\ge 0$ gives $x\\ge 2$." },
        { id: "y11adv-fn-p9", prompt: "For the displayed square-root function, which domain is correct?", latex: "r(x)=\\sqrt{5-x}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$x\\ge 5$" }, { label: "B", text: "$x\\ne 5$" }, { label: "C", text: "$x< -5$" }, { label: "D", text: "$x\\le 5$" }], hint: "Need $5-x\\ge 0$.", explanation: "$5-x\\ge 0$ gives $x\\le 5$." },
        { id: "y11adv-fn-p10", prompt: "A table has outputs 9, 4, 1, 0, 1. Which set could be the range?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\{-2,-1,0,1,2\\}$" }, { label: "B", text: "$\\{0,1,4,9\\}$" }, { label: "C", text: "$\\{9,4,1,0,1\\}$" }, { label: "D", text: "all reals" }], hint: "Range uses distinct outputs.", explanation: "Distinct outputs are $\\{0,1,4,9\\}$." },
        { id: "y11adv-fn-p11", prompt: "Which x-value is excluded from the domain of the displayed function?", latex: "q(x)=\\frac{x-3}{x+5},\\quad x+5\\ne0", answer: "-5", difficulty: 3, acceptedAnswers: ["-5", "−5", "x=-5"], hint: "Only the denominator matters.", explanation: "$x+5=0$ gives $x=-5$." },
        { id: "y11adv-fn-p12", prompt: "A graph has outputs from $-1$ to 6 inclusive. Which range matches?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$-1\\le x\\le 6$" }, { label: "B", text: "$x\\ne 6$" }, { label: "C", text: "$y< -1$" }, { label: "D", text: "$-1\\le y\\le 6$" }], hint: "Range uses $y$-values.", explanation: "The outputs run from $-1$ to 6, so $-1\\le y\\le 6$." },
        { id: "y11adv-fn-p13", prompt: "Evaluate the displayed function.", latex: "f(x)=3x^2+x,\\quad f(-2)", answer: "10", difficulty: 3, hint: "Use brackets: $3(-2)^2+(-2)$.", explanation: "$3(4)-2=12-2=10$." },
        { id: "y11adv-fn-p14", prompt: "Which error most likely gives the wrong sign when evaluating the displayed function?", latex: "f(-2)=3(-2)^2+(-2)", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Using $x=2$" }, { label: "B", text: "Writing the range first" }, { label: "C", text: "Not using brackets around $-2$" }, { label: "D", text: "Finding the y-intercept" }], hint: "Negative inputs need brackets.", explanation: "Without brackets, $-2^2$ is read as $-4$ instead of $4$." },
        { id: "y11adv-fn-p15", prompt: "Find the y-intercept of the displayed function.", latex: "f(x)=x^2-4x+3,\\quad x=0", answer: "3", difficulty: 2, acceptedAnswers: ["(0,3)", "y=3"], hint: "Set $x=0$.", explanation: "$f(0)=0-0+3=3$." },
        { id: "y11adv-fn-p16", prompt: "Find the y-intercept of the displayed reciprocal function.", latex: "y=\\frac{1}{x+1},\\quad x=0", answer: "1", difficulty: 3, hint: "Set $x=0$.", explanation: "$y=\\frac{1}{0+1}=1$." },
        { id: "y11adv-fn-p17", prompt: "For the displayed reciprocal function, the domain restriction is:", latex: "y=\\frac{1}{x+1}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$x\\ne -1$" }, { label: "B", text: "$x\\ne 1$" }, { label: "C", text: "$y\\ne -1$" }, { label: "D", text: "$x\\ge -1$" }], hint: "Denominator cannot be zero.", explanation: "$x+1=0$ gives the excluded value $x=-1$." },
        { id: "y11adv-fn-p18", prompt: "Evaluate the displayed function.", latex: "p(x)=x^2+4x,\\quad p(-5)", answer: "5", difficulty: 3, acceptedAnswers: ["p(-5)=5"], hint: "Square first.", explanation: "$(-5)^2+4(-5)=25-20=5$." },
        { id: "y11adv-fn-p19", prompt: "A table lists inputs $-1,0,1$ and outputs $2,5,10$. Which set is the domain?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$\\{2,5,10\\}$" }, { label: "B", text: "$\\{-1,2,5\\}$" }, { label: "C", text: "$\\{0,5,10\\}$" }, { label: "D", text: "$\\{-1,0,1\\}$" }], hint: "Domain is the input set.", explanation: "The inputs are $\\{-1,0,1\\}$." },
        { id: "y11adv-fn-p20", prompt: "Which x-value is excluded from the domain of the displayed function?", latex: "f(x)=\\frac{x+1}{x-6},\\quad x-6\\ne0", answer: "6", difficulty: 3, acceptedAnswers: ["x=6"], hint: "Set the denominator to zero.", explanation: "$x-6=0$ gives $x=6$." },
        { id: "y11adv-fn-p21", prompt: "Evaluate the displayed function.", latex: "f(x)=2x^2-3x+1,\\quad f(-2)", answer: "15", difficulty: 4, acceptedAnswers: ["f(-2)=15"], hint: "Use brackets and evaluate the power first.", explanation: "$2(-2)^2-3(-2)+1=8+6+1=15$." },
        { id: "y11adv-fn-p22", prompt: "Find $f(-2)+f(2)$ for the displayed function.", latex: "f(x)=x^2-3x", answer: "8", difficulty: 4, hint: "Evaluate both, then add.", explanation: "$f(-2)=4+6=10$ and $f(2)=4-6=-2$, so the sum is $10+(-2)=8$." },
        { id: "y11adv-fn-p23", prompt: "Find the value of $a$ so that $a$ is excluded from the domain of the displayed function.", latex: "y=\\frac{1}{2x-6},\\quad 2x-6\\ne0", answer: "3", difficulty: 4, acceptedAnswers: ["x=3"], hint: "Solve $2x-6=0$.", explanation: "$2x-6=0$ gives $x=3$." },
        { id: "y11adv-fn-p24", prompt: "For the displayed square-root function, give the smallest value in the domain.", latex: "h(x)=\\sqrt{3x+12}", answer: "-4", difficulty: 4, acceptedAnswers: ["-4", "−4", "x=-4"], hint: "Need $3x+12\\ge 0$.", explanation: "$3x+12\\ge 0$ gives $x\\ge -4$; smallest value is $-4$." },
        { id: "y11adv-fn-p25", prompt: "A graph has lowest output $-4$ and rises without bound. Which range matches?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y\\ge -4$" }, { label: "B", text: "$x\\ge -4$" }, { label: "C", text: "$y\\le -4$" }, { label: "D", text: "$x\\ne -4$" }], hint: "Range uses $y$-values.", explanation: "Outputs start at $-4$ and increase, so $y\\ge -4$." },
        { id: "y11adv-fn-p26", prompt: "Find the y-intercept of the displayed reciprocal function.", latex: "y=\\frac{1}{x-2}+3,\\quad x=0", answer: "5/2", difficulty: 5, acceptedAnswers: ["2.5", "5/2"], hint: "Set $x=0$ and simplify.", explanation: "$y=\\frac{1}{0-2}+3=-\\frac{1}{2}+3=\\frac{5}{2}$." },
        { id: "y11adv-fn-p27", prompt: "Find $f(a)$ where $a$ is the excluded value of the displayed reciprocal function $g(x)=\\frac{1}{x-3}$, and $f(x)=x^2-1$.", latex: "g(x)=\\frac{1}{x-3},\\quad f(x)=x^2-1", answer: "8", difficulty: 5, hint: "First find the excluded $x$ of $g$, then evaluate $f$ there.", explanation: "$g$ excludes $x=3$. Then $f(3)=3^2-1=8$." },
        { id: "y11adv-fn-p28", prompt: "A function has domain $x\\ge 2$ and outputs that increase from 0. The point $(6,k)$ lies on $y=\\sqrt{x-2}$. Find $k$.", latex: "y=\\sqrt{x-2}", answer: "2", difficulty: 5, hint: "Substitute $x=6$.", explanation: "$\\sqrt{6-2}=\\sqrt{4}=2$." },
        { id: "y11adv-fn-p29", prompt: "For the displayed function, find the larger input giving output 0.", latex: "f(x)=x^2-5x+6,\\quad f(x)=0", answer: "3", difficulty: 5, hint: "Factorise to $(x-2)(x-3)$.", explanation: "$x^2-5x+6=(x-2)(x-3)=0$ gives $x=2,3$; larger is 3." },
        { id: "y11adv-fn-p30", prompt: "Two functions are excluded at the same x-value. For $\\frac{1}{x-h}$ and $\\frac{2}{x-h}$ the excluded value is $x=5$. Find $h$.", latex: "\\frac{1}{x-h},\\quad x=5", answer: "5", difficulty: 5, hint: "The excluded value is $x=h$.", explanation: "Both functions exclude $x=h$, and that equals 5, so $h=5$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-fn-mp1",
          prompt: "Consider the function $f(x)=\\frac{x+2}{x-4}$.",
          latex: "f(x)=\\frac{x+2}{x-4}",
          answer: "4",
          hint: "For (a) set the denominator to zero. For (b) substitute $x=0$. For (c) substitute the value from (a) into the numerator.",
          explanation: "(a) Excluded value $x=4$. (b) $f(0)=\\frac{2}{-4}=-\\frac{1}{2}$. (c) numerator at $x=4$ is $4+2=6$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the x-value excluded from the domain.", marks: 1, answer: "4", acceptedAnswers: ["x=4"], hint: "Set $x-4=0$.", explanation: "$x-4=0$ gives $x=4$." },
            { key: "b", label: "(b)", prompt: "Find the y-intercept value $f(0)$.", marks: 2, answer: "-1/2", acceptedAnswers: ["-0.5", "−0.5", "-1/2", "−1/2"], hint: "Substitute $x=0$.", explanation: "$f(0)=\\frac{0+2}{0-4}=\\frac{2}{-4}=-\\frac{1}{2}$." },
            { key: "c", label: "(c)", prompt: "Evaluate the numerator $x+2$ at the excluded x-value.", marks: 1, answer: "6", hint: "Use the value from (a).", explanation: "At $x=4$ the numerator is $4+2=6$ (the denominator is zero, so the function itself is undefined there)." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "linear-quadratic-cubic-functions") {
    return {
      ...base,
      description:
        "Compare linear, quadratic, and cubic functions using intercepts, roots, turning points, tables, and graph descriptions.",
      learningIntention:
        "Identify linear, quadratic, and cubic functions and interpret their key features from equations, factors, tables, and graph descriptions.",
      successCriteria: [
        "Recognise linear, quadratic, and cubic function families.",
        "Find roots or zeros from factorised forms.",
        "Interpret intercepts, turning points, and simple end behaviour.",
        "Match a function type to an equation, table, or graph description.",
      ],
      teaching: {
        paragraphs: [
          "Linear functions have a constant first difference and graph as straight lines. Quadratic functions have an x^2 term and graph as parabolas.",
          "Cubic functions have an x^3 term and can have up to three real zeros. Factorised forms make zeros easier to identify.",
          "An x-intercept occurs where y = 0. A y-intercept occurs where x = 0. These are different features and must not be swapped.",
          "Quadratic turning points describe a maximum or minimum. Cubic end behaviour can be described by what happens as x becomes very large positive or negative.",
        ],
        latexBlocks: [
          "\\text{linear: }f(x)=mx+b",
          "\\text{quadratic: }f(x)=a(x-r_1)(x-r_2)",
          "\\text{cubic: }f(x)=a(x-r_1)(x-r_2)(x-r_3)",
        ],
      },
      workedExamples: [
        {
          title: "Identify function type and key features",
          questionLatex: "f(x)=2x^2-8x+6",
          steps: [
            {
              explanation:
                "The highest power is x^2, so this is a quadratic function.",
              latex: "\\deg(f)=2",
            },
            {
              explanation:
                "A quadratic graph is a parabola. Since the coefficient of x^2 is positive, it opens upward.",
            },
          ],
          finalAnswerLatex: "\\text{Quadratic; upward-opening parabola.}",
        },
        {
          title: "Find roots from a factorised function",
          questionLatex: "g(x)=(x+2)(x-1)(x-4)",
          steps: [
            {
              explanation:
                "Zeros occur when any factor equals zero.",
              latex: "x+2=0,\\quad x-1=0,\\quad x-4=0",
            },
            {
              explanation: "Solve each equation.",
              latex: "x=-2,\\ 1,\\ 4",
            },
          ],
          finalAnswerLatex: "\\text{Zeros: }-2,\\ 1,\\ 4",
        },
        {
          title: "Match a table to a function type",
          questionLatex:
            "\\begin{array}{c|ccccc}x&-2&-1&0&1&2\\\\ y&-8&-1&0&1&8\\end{array}",
          steps: [
            {
              explanation:
                "The outputs match the pattern y = x^3.",
            },
            {
              explanation:
                "A cubic has opposite signs for negative and positive inputs when it is like x^3.",
              latex: "(-2)^3=-8,\\quad 2^3=8",
            },
          ],
          finalAnswerLatex: "\\text{Cubic function}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-lqc-g1", "Which function family does the displayed function belong to?", "A", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "The highest power of x is 1.", "f(x)=3x-5"),
        formulaAnswer("y11adv-lqc-g2", "Find the zeros of the displayed function. Enter the smaller zero.", "f(x)=(x-3)(x+2),\\quad (x-3)(x+2)=0", "-2", ["x=-2"]),
        practicalChoice("y11adv-lqc-g3", "A graph is a parabola opening upward with a lowest point. Which function type is most likely?", "B", ["Linear", "Quadratic", "Cubic", "Constant only"], "A parabola is the graph of a quadratic function."),
        formulaAnswer("y11adv-lqc-g4", "For the displayed function, enter the largest zero.", "g(x)=(x+1)(x-4)(x-6),\\quad (x+1)(x-4)(x-6)=0", "6", ["x=6"]),
      ],
      independentPractice: [
        practicalChoice("y11adv-lqc-i1", "A table has constant first differences of 4. Which function type is suggested?", "A", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "Constant first differences suggest a linear relationship."),
        formulaAnswer("y11adv-lqc-i2", "For the displayed function, give the positive x-intercept.", "f(x)=x^2-9,\\quad x^2-9=0", "3", ["x=3", "(3,0)"]),
        practicalChoice("y11adv-lqc-i3", "A cubic function has zeros at -2, 1 and 4. Which expression could represent it?", "C", ["(x-2)(x+1)(x+4)", "(x+2)(x+1)(x-4)", "(x+2)(x-1)(x-4)", "x^2-3x+4"], "A zero at r corresponds to a factor x - r."),
        formulaAnswer("y11adv-lqc-i4", "For the displayed function, find the y-intercept.", "f(x)=2x+7,\\quad f(0)=7", "7", ["(0,7)", "y=7"]),
        practicalChoice("y11adv-lqc-i5", "Which feature is a turning point of a quadratic?", "D", ["The x-value excluded from a denominator", "The slope of a line only", "A repeated table heading", "A maximum or minimum point"], "A quadratic has a vertex that is a maximum or minimum."),
      ],
      commonMistakes: [
        { mistake: "Treating every function as linear.", fix: "Check the highest power and the pattern in the table before choosing a method." },
        { mistake: "Confusing zeros with factors.", fix: "If x = r is a zero, then x - r is a factor." },
        { mistake: "Swapping x-intercepts and y-intercepts.", fix: "x-intercepts happen when y = 0; the y-intercept happens when x = 0." },
        { mistake: "Ignoring the sign of the leading coefficient.", fix: "For quadratics, the sign tells whether the parabola opens up or down." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-lqc-m1", "Which function family does the displayed function belong to?", "B", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "The highest power is x^2.", "f(x)=-2x^2+5"),
        practicalChoice("y11adv-lqc-m2", "Which function family does the displayed function belong to?", "C", ["Linear", "Quadratic", "Cubic", "Exponential"], "The highest power is x^3.", "f(x)=x^3-4x"),
        formulaAnswer("y11adv-lqc-m3", "For the displayed function, enter the larger zero.", "f(x)=(x-5)(x+1),\\quad (x-5)(x+1)=0", "5", ["x=5"]),
        formulaAnswer("y11adv-lqc-m4", "For the displayed function, enter the negative zero.", "g(x)=x^2-16,\\quad x^2-16=0", "-4", ["x=-4"]),
        practicalChoice("y11adv-lqc-m5", "A straight-line graph with y-intercept 3 is most likely:", "A", ["Linear", "Quadratic only", "Cubic only", "A reciprocal asymptote"], "Straight-line graphs are linear."),
        formulaAnswer("y11adv-lqc-m6", "For the displayed function, enter the smallest zero.", "h(x)=(x+2)(x-1)(x-4),\\quad (x+2)(x-1)(x-4)=0", "-2", ["x=-2"]),
        practicalChoice("y11adv-lqc-m7", "A table follows the displayed rule and sample values. Which function type is it?", "C", ["Linear", "Quadratic", "Cubic", "Reciprocal"], "The outputs match a cubic pattern.", "y=x^3,\\quad x=-2\\Rightarrow y=-8,\\quad x=2\\Rightarrow y=8"),
        formulaAnswer("y11adv-lqc-m8", "For the displayed function, find the x-intercept.", "f(x)=-3x+12,\\quad -3x+12=0", "4", ["x=4", "(4,0)"]),
        practicalChoice("y11adv-lqc-m9", "For the displayed function, the parabola opens:", "B", ["Upward", "Downward", "Sideways", "Not at all"], "The coefficient of x^2 is negative.", "f(x)=-x^2+6x-5"),
        practicalChoice("y11adv-lqc-m10", "A factor x + 3 means the matching zero is:", "D", ["3", "0", "x + 3", "-3"], "Set x + 3 = 0."),
      ],
      masteryQuizPool: [
        { id: "y11adv-lqc-p1", prompt: "Which family does the displayed function belong to?", latex: "f(x)=3x-5", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Linear" }, { label: "B", text: "Quadratic" }, { label: "C", text: "Cubic" }, { label: "D", text: "Reciprocal" }], hint: "Highest power of $x$ is 1.", explanation: "Degree 1 means linear." },
        { id: "y11adv-lqc-p2", prompt: "Which family does the displayed function belong to?", latex: "f(x)=-2x^2+5", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Linear" }, { label: "B", text: "Quadratic" }, { label: "C", text: "Cubic" }, { label: "D", text: "Reciprocal" }], hint: "Highest power is $x^2$.", explanation: "Degree 2 means quadratic." },
        { id: "y11adv-lqc-p3", prompt: "Which family does the displayed function belong to?", latex: "f(x)=x^3-4x", answer: "C", difficulty: 1, choices: [{ label: "A", text: "Linear" }, { label: "B", text: "Quadratic" }, { label: "C", text: "Cubic" }, { label: "D", text: "Exponential" }], hint: "Highest power is $x^3$.", explanation: "Degree 3 means cubic." },
        { id: "y11adv-lqc-p4", prompt: "For the displayed function, enter the smaller zero.", latex: "f(x)=(x-3)(x+2),\\quad (x-3)(x+2)=0", answer: "-2", difficulty: 1, acceptedAnswers: ["-2", "−2", "x=-2"], hint: "Set each factor to zero.", explanation: "Zeros are $3$ and $-2$; smaller is $-2$." },
        { id: "y11adv-lqc-p5", prompt: "For the displayed function, enter the larger zero.", latex: "f(x)=(x-5)(x+1),\\quad (x-5)(x+1)=0", answer: "5", difficulty: 2, acceptedAnswers: ["x=5"], hint: "Set each factor to zero.", explanation: "Zeros are $5$ and $-1$; larger is $5$." },
        { id: "y11adv-lqc-p6", prompt: "For the displayed function, enter the largest zero.", latex: "g(x)=(x+1)(x-4)(x-6),\\quad =0", answer: "6", difficulty: 2, acceptedAnswers: ["x=6"], hint: "Each factor gives a zero.", explanation: "Zeros are $-1,4,6$; largest is $6$." },
        { id: "y11adv-lqc-p7", prompt: "For the displayed function, enter the negative zero.", latex: "g(x)=x^2-16,\\quad x^2-16=0", answer: "-4", difficulty: 2, acceptedAnswers: ["-4", "−4", "x=-4"], hint: "Difference of squares.", explanation: "$x^2=16$ gives $x=\\pm 4$; the negative zero is $-4$." },
        { id: "y11adv-lqc-p8", prompt: "For the displayed function, enter the positive x-intercept.", latex: "f(x)=x^2-9,\\quad x^2-9=0", answer: "3", difficulty: 2, acceptedAnswers: ["x=3", "(3,0)"], hint: "$x^2=9$.", explanation: "$x=\\pm 3$; positive intercept is $3$." },
        { id: "y11adv-lqc-p9", prompt: "Find the y-intercept of the displayed function.", latex: "f(x)=2x+7,\\quad f(0)", answer: "7", difficulty: 2, acceptedAnswers: ["(0,7)", "y=7"], hint: "Set $x=0$.", explanation: "$f(0)=7$." },
        { id: "y11adv-lqc-p10", prompt: "Find the x-intercept of the displayed function.", latex: "f(x)=-3x+12,\\quad -3x+12=0", answer: "4", difficulty: 2, acceptedAnswers: ["x=4", "(4,0)"], hint: "Set $y=0$.", explanation: "$-3x+12=0$ gives $x=4$." },
        { id: "y11adv-lqc-p11", prompt: "A table has constant first differences of 4. Which family is suggested?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Linear" }, { label: "B", text: "Quadratic" }, { label: "C", text: "Cubic" }, { label: "D", text: "Reciprocal" }], hint: "Constant first differences.", explanation: "Constant first differences indicate a linear relationship." },
        { id: "y11adv-lqc-p12", prompt: "A cubic has zeros at $-2,1,4$. Which expression could represent it?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$(x-2)(x+1)(x+4)$" }, { label: "B", text: "$(x+2)(x+1)(x-4)$" }, { label: "C", text: "$(x+2)(x-1)(x-4)$" }, { label: "D", text: "$x^2-3x+4$" }], hint: "Zero $r$ gives factor $x-r$.", explanation: "Zeros $-2,1,4$ give factors $(x+2)(x-1)(x-4)$." },
        { id: "y11adv-lqc-p13", prompt: "For the displayed function, the parabola opens:", latex: "f(x)=-x^2+6x-5", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Upward" }, { label: "B", text: "Downward" }, { label: "C", text: "Sideways" }, { label: "D", text: "Not at all" }], hint: "Sign of the $x^2$ coefficient.", explanation: "The coefficient of $x^2$ is negative, so it opens downward." },
        { id: "y11adv-lqc-p14", prompt: "For the displayed function, enter the smallest zero.", latex: "h(x)=(x+2)(x-1)(x-4),\\quad =0", answer: "-2", difficulty: 3, acceptedAnswers: ["-2", "−2", "x=-2"], hint: "Each factor gives a zero.", explanation: "Zeros are $-2,1,4$; smallest is $-2$." },
        { id: "y11adv-lqc-p15", prompt: "Which feature is a turning point of a quadratic?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "An excluded denominator value" }, { label: "B", text: "The slope of a line only" }, { label: "C", text: "A repeated table heading" }, { label: "D", text: "A maximum or minimum point" }], hint: "The vertex of a parabola.", explanation: "A quadratic's vertex is a maximum or minimum turning point." },
        { id: "y11adv-lqc-p16", prompt: "A factor $x+3$ corresponds to which zero?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$3$" }, { label: "B", text: "$0$" }, { label: "C", text: "$x+3$" }, { label: "D", text: "$-3$" }], hint: "Set the factor to zero.", explanation: "$x+3=0$ gives $x=-3$." },
        { id: "y11adv-lqc-p17", prompt: "For the displayed function, enter the zero that is neither positive nor negative.", latex: "p(x)=x(x-3)(x+2),\\quad =0", answer: "0", difficulty: 3, acceptedAnswers: ["x=0"], hint: "One factor is $x$ itself.", explanation: "$x=0$ is a zero from the factor $x$." },
        { id: "y11adv-lqc-p18", prompt: "Which expression has zeros at $2$ and $-5$?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$(x+2)(x-5)$" }, { label: "B", text: "$(x-2)(x+5)$" }, { label: "C", text: "$(x-2)(x-5)$" }, { label: "D", text: "$(x+2)(x+5)$" }], hint: "Zero $r$ gives factor $x-r$.", explanation: "Zeros $2$ and $-5$ give $(x-2)(x+5)$." },
        { id: "y11adv-lqc-p19", prompt: "For the displayed function, enter the positive zero.", latex: "f(x)=x^2-2x-15,\\quad =0", answer: "5", difficulty: 4, acceptedAnswers: ["x=5"], hint: "Factorise to $(x-5)(x+3)$.", explanation: "$(x-5)(x+3)=0$ gives $5$ and $-3$; positive is $5$." },
        { id: "y11adv-lqc-p20", prompt: "For the displayed function, enter the sum of its two zeros.", latex: "f(x)=(x-7)(x+2),\\quad =0", answer: "5", difficulty: 4, hint: "Find each zero, then add.", explanation: "Zeros $7$ and $-2$; sum $=5$." },
        { id: "y11adv-lqc-p21", prompt: "A cubic crosses the x-axis at $-3,0,2$. Enter the number of x-intercepts.", latex: "\\text{Choose one}", answer: "3", difficulty: 3, hint: "Count the distinct crossings.", explanation: "Three distinct zeros give three x-intercepts." },
        { id: "y11adv-lqc-p22", prompt: "For the displayed quadratic, enter the y-intercept.", latex: "f(x)=x^2-4x+3,\\quad x=0", answer: "3", difficulty: 3, acceptedAnswers: ["(0,3)", "y=3"], hint: "Set $x=0$.", explanation: "$f(0)=3$." },
        { id: "y11adv-lqc-p23", prompt: "Which family fits the displayed sample values?", latex: "y=x^3,\\ x=-2\\Rightarrow -8,\\ x=2\\Rightarrow 8", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Linear" }, { label: "B", text: "Quadratic" }, { label: "C", text: "Cubic" }, { label: "D", text: "Reciprocal" }], hint: "Opposite signs for $\\pm x$.", explanation: "$y=x^3$ is cubic; outputs match $-8$ and $8$." },
        { id: "y11adv-lqc-p24", prompt: "For the displayed function, enter the product of its two zeros.", latex: "f(x)=(x-4)(x-3),\\quad =0", answer: "12", difficulty: 4, hint: "Find each zero, then multiply.", explanation: "Zeros $4$ and $3$; product $=12$." },
        { id: "y11adv-lqc-p25", prompt: "A parabola has x-intercepts $1$ and $5$. Enter the x-coordinate of its vertex (axis of symmetry).", latex: "\\text{midpoint of }1\\text{ and }5", answer: "3", difficulty: 5, hint: "The axis is midway between the intercepts.", explanation: "Midpoint of $1$ and $5$ is $\\frac{1+5}{2}=3$." },
        { id: "y11adv-lqc-p26", prompt: "A cubic $y=(x+1)(x-2)(x-4)$ has y-intercept value:", latex: "x=0", answer: "8", difficulty: 5, hint: "Set $x=0$ in each factor.", explanation: "$(0+1)(0-2)(0-4)=(1)(-2)(-4)=8$." },
        { id: "y11adv-lqc-p27", prompt: "A parabola with x-intercepts $-2$ and $6$ has axis of symmetry $x=?$", latex: "\\text{midpoint of }-2\\text{ and }6", answer: "2", difficulty: 5, hint: "Average the intercepts.", explanation: "$\\frac{-2+6}{2}=2$." },
        { id: "y11adv-lqc-p28", prompt: "For $f(x)=(x-2)(x+3)$, enter $f(0)$.", latex: "f(x)=(x-2)(x+3),\\quad x=0", answer: "-6", difficulty: 4, acceptedAnswers: ["-6", "−6"], hint: "Multiply the factors at $x=0$.", explanation: "$(0-2)(0+3)=(-2)(3)=-6$." },
        { id: "y11adv-lqc-p29", prompt: "A quadratic has a repeated zero at $x=4$. Which expression matches?", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$(x-4)(x+4)$" }, { label: "B", text: "$(x-4)^2$" }, { label: "C", text: "$x^2+16$" }, { label: "D", text: "$(x-4)(x-2)$" }], hint: "A repeated zero gives a squared factor.", explanation: "A double zero at $4$ gives $(x-4)^2$." },
        { id: "y11adv-lqc-p30", prompt: "A cubic passes through the origin and has zeros $0,3,-3$. Which expression matches?", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$x(x-3)(x+3)$" }, { label: "B", text: "$(x-3)(x+3)$" }, { label: "C", text: "$x(x-3)^2$" }, { label: "D", text: "$x^3+9$" }], hint: "Each zero $r$ gives factor $x-r$.", explanation: "Zeros $0,3,-3$ give $x(x-3)(x+3)$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-lqc-mp1",
          prompt: "Consider the cubic $f(x)=(x+1)(x-2)(x-4)$.",
          latex: "f(x)=(x+1)(x-2)(x-4)",
          answer: "-1",
          hint: "For (a) and (b) read the zeros from the factors. For (c) substitute $x=0$.",
          explanation: "(a) Smallest zero $-1$. (b) Largest zero $4$. (c) $f(0)=(1)(-2)(-4)=8$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Enter the smallest zero.", marks: 1, answer: "-1", acceptedAnswers: ["-1", "−1", "x=-1"], hint: "Set $x+1=0$.", explanation: "Zeros are $-1,2,4$; smallest is $-1$." },
            { key: "b", label: "(b)", prompt: "Enter the largest zero.", marks: 1, answer: "4", acceptedAnswers: ["x=4"], hint: "Set $x-4=0$.", explanation: "Largest zero is $4$." },
            { key: "c", label: "(c)", prompt: "Find the y-intercept value $f(0)$.", marks: 2, answer: "8", hint: "Substitute $x=0$ into each factor.", explanation: "$f(0)=(0+1)(0-2)(0-4)=(1)(-2)(-4)=8$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "polynomial-reciprocal-functions") {
    return {
      ...base,
      description:
        "Use degree, leading coefficient, roots, factors, reciprocal functions, and asymptotes to interpret polynomial and reciprocal graphs.",
      learningIntention:
        "Connect polynomial factors to roots and identify reciprocal function restrictions and asymptotes from algebraic rules.",
      successCriteria: [
        "Identify polynomial degree and leading coefficient from a rule.",
        "Use factors to determine zeros of a polynomial.",
        "Identify vertical asymptotes from reciprocal denominators.",
        "Match graph-feature descriptions to possible polynomial or reciprocal functions.",
      ],
      teaching: {
        paragraphs: [
          "A polynomial is built from powers of x with whole-number exponents, such as x^3 - 2x + 1. The degree is the highest power of x.",
          "Factors reveal roots. If a polynomial contains the factor x - 4, then x = 4 is a zero.",
          "A reciprocal function includes a variable in the denominator. Values that make the denominator zero are excluded from the domain and often create vertical asymptotes.",
          "For simple reciprocal functions such as y = 1/(x - h) + k, the vertical asymptote is x = h and the horizontal asymptote is y = k.",
        ],
        latexBlocks: [
          "p(x)=a(x-r_1)(x-r_2)\\Rightarrow \\text{zeros }r_1,r_2",
          "y=\\frac{1}{x-h}+k\\Rightarrow x=h\\text{ is a vertical asymptote, }y=k\\text{ is a horizontal asymptote}",
        ],
      },
      workedExamples: [
        {
          title: "Use factors to identify zeros",
          questionLatex: "p(x)=(x+3)(x-2)(x-5)",
          steps: [
            {
              explanation:
                "Set each factor equal to zero.",
              latex: "x+3=0,\\quad x-2=0,\\quad x-5=0",
            },
            {
              explanation: "Solve each simple equation.",
              latex: "x=-3,\\ 2,\\ 5",
            },
          ],
          finalAnswerLatex: "\\text{Zeros: }-3,\\ 2,\\ 5",
        },
        {
          title: "Identify a vertical asymptote",
          questionLatex: "g(x)=\\frac{1}{x-4}",
          steps: [
            {
              explanation:
                "The vertical asymptote occurs where the denominator would be zero.",
              latex: "x-4=0",
            },
            {
              explanation: "Solve for x.",
              latex: "x=4",
            },
          ],
          finalAnswerLatex: "\\text{Vertical asymptote: }x=4",
        },
        {
          title: "Choose a possible equation from features",
          questionLatex:
            "\\text{Zeros at }-2\\text{ and }3,\\quad \\text{vertical asymptote at }x=5",
          steps: [
            {
              explanation:
                "Zeros at -2 and 3 suggest numerator factors x + 2 and x - 3.",
              latex: "(x+2)(x-3)",
            },
            {
              explanation:
                "A vertical asymptote at x = 5 suggests denominator x - 5.",
              latex: "x-5",
            },
          ],
          finalAnswerLatex: "y=\\frac{(x+2)(x-3)}{x-5}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-poly-g1", "For the displayed function, enter the positive zero.", "p(x)=(x-4)(x+1),\\quad (x-4)(x+1)=0", "4", ["x=4"]),
        formulaAnswer("y11adv-poly-g2", "For the displayed reciprocal function, what is the vertical asymptote?", "g(x)=\\frac{1}{x-6},\\quad x-6=0", "x=6", ["6"]),
        practicalChoice("y11adv-poly-g3", "Which statement best describes the displayed function?", "C", ["It is linear", "It is reciprocal", "It is a degree 4 polynomial", "It has vertical asymptote $x=4$"], "The highest power is 4.", "p(x)=3x^4-2x+1"),
        practicalChoice("y11adv-poly-g4", "A reciprocal graph has vertical asymptote x = -2. Which denominator matches?", "A", ["x + 2", "x - 2", "x^2", "2x"], "x + 2 = 0 gives x = -2."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-poly-i1", "For the displayed function, enter the largest zero.", "p(x)=(x+5)(x-2)(x-7),\\quad (x+5)(x-2)(x-7)=0", "7", ["x=7"]),
        formulaAnswer("y11adv-poly-i2", "For the displayed reciprocal function, enter the vertical asymptote.", "y=\\frac{1}{x+3}-2,\\quad x+3=0", "x=-3", ["-3"]),
        formulaAnswer("y11adv-poly-i3", "For the displayed reciprocal function, enter the horizontal asymptote.", "y=\\frac{1}{x+3}-2,\\quad y=-2", "y=-2", ["-2"]),
        practicalChoice("y11adv-poly-i4", "A polynomial has zeros at -1 and 4. Which factor pair matches?", "B", ["(x-1)(x-4)", "(x+1)(x-4)", "(x-1)(x+4)", "(x+1)(x+4)"], "A zero at -1 gives x + 1, and a zero at 4 gives x - 4."),
        practicalChoice("y11adv-poly-i5", "Which feature is most associated with a simple reciprocal function?", "D", ["Constant first difference", "Always a parabola", "No domain restrictions", "A vertical asymptote"], "A reciprocal denominator creates a vertical asymptote."),
      ],
      commonMistakes: [
        { mistake: "Confusing a factor with a zero.", fix: "Set the factor equal to zero to find the zero." },
        { mistake: "Forgetting denominator restrictions.", fix: "Find the x-value that makes the denominator zero and exclude it." },
        { mistake: "Calling every curved graph a quadratic.", fix: "Check whether the rule is polynomial, reciprocal, or another function type." },
        { mistake: "Reversing horizontal shifts in reciprocal denominators.", fix: "For x - h in the denominator, the vertical asymptote is x = h." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-poly-m1", "For the displayed polynomial, the degree is:", "C", ["1", "2", "3", "8"], "The highest power of x is 3.", "p(x)=-2x^3+x-8"),
        formulaAnswer("y11adv-poly-m2", "For the displayed function, enter the negative zero.", "p(x)=(x-2)(x+6),\\quad (x-2)(x+6)=0", "-6", ["x=-6"]),
        formulaAnswer("y11adv-poly-m3", "For the displayed reciprocal function, enter the excluded x-value.", "g(x)=\\frac{1}{x-9},\\quad x-9\\ne0", "9", ["x=9"]),
        formulaAnswer("y11adv-poly-m4", "For the displayed reciprocal function, enter the horizontal asymptote.", "y=\\frac{1}{x-1}+5", "y=5", ["5"]),
        practicalChoice("y11adv-poly-m5", "Zeros at -2, 1 and 4 match which expression?", "B", ["(x-2)(x+1)(x+4)", "(x+2)(x-1)(x-4)", "(x-2)(x-1)(x+4)", "x^2+3x+2"], "Use factor x - r for zero r."),
        formulaAnswer("y11adv-poly-m6", "For the displayed reciprocal function, enter the vertical asymptote.", "y=\\frac{1}{x+8},\\quad x+8=0", "x=-8", ["-8"]),
        practicalChoice("y11adv-poly-m7", "Which function is reciprocal rather than polynomial?", "D", ["x^2 - 4", "3x^3 + 1", "x - 7", "1/(x - 4)"], "The variable appears in the denominator."),
        formulaAnswer("y11adv-poly-m8", "For the displayed function, enter the zero that is neither positive nor negative.", "p(x)=x(x-3)(x+2),\\quad x=0", "0", ["x=0"]),
        practicalChoice("y11adv-poly-m9", "For the displayed reciprocal function, the graph cannot cross which vertical line?", "A", ["x = 4", "x = -4", "y = 4", "y = 0"], "x = 4 is the vertical asymptote.", "y=\\frac{1}{x-4}"),
        practicalChoice("y11adv-poly-m10", "A factor x - 5 means the graph has an x-intercept at:", "C", ["(-5,0)", "(0,5)", "(5,0)", "(0,-5)"], "Set x - 5 = 0, so x = 5."),
      ],
      masteryQuizPool: [
        { id: "y11adv-poly-p1", prompt: "For the displayed polynomial, the degree is:", latex: "p(x)=-2x^3+x-8", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$1$" }, { label: "B", text: "$2$" }, { label: "C", text: "$3$" }, { label: "D", text: "$8$" }], hint: "Highest power of $x$.", explanation: "The highest power is $x^3$, so degree 3." },
        { id: "y11adv-poly-p2", prompt: "For the displayed function, enter the positive zero.", latex: "p(x)=(x-4)(x+1),\\quad =0", answer: "4", difficulty: 1, acceptedAnswers: ["x=4"], hint: "Set each factor to zero.", explanation: "Zeros $4$ and $-1$; positive is $4$." },
        { id: "y11adv-poly-p3", prompt: "For the displayed reciprocal function, enter the vertical asymptote.", latex: "g(x)=\\frac{1}{x-6},\\quad x-6=0", answer: "x=6", difficulty: 1, acceptedAnswers: ["6"], hint: "Where the denominator is zero.", explanation: "$x-6=0$ gives the asymptote $x=6$." },
        { id: "y11adv-poly-p4", prompt: "For the displayed function, enter the negative zero.", latex: "p(x)=(x-2)(x+6),\\quad =0", answer: "-6", difficulty: 2, acceptedAnswers: ["-6", "−6", "x=-6"], hint: "Set each factor to zero.", explanation: "Zeros $2$ and $-6$; negative is $-6$." },
        { id: "y11adv-poly-p5", prompt: "For the displayed reciprocal function, enter the excluded x-value.", latex: "g(x)=\\frac{1}{x-9},\\quad x-9\\ne0", answer: "9", difficulty: 1, acceptedAnswers: ["x=9"], hint: "Denominator cannot be zero.", explanation: "$x-9=0$ gives $x=9$." },
        { id: "y11adv-poly-p6", prompt: "For the displayed function, enter the largest zero.", latex: "p(x)=(x+5)(x-2)(x-7),\\quad =0", answer: "7", difficulty: 2, acceptedAnswers: ["x=7"], hint: "Each factor gives a zero.", explanation: "Zeros $-5,2,7$; largest is $7$." },
        { id: "y11adv-poly-p7", prompt: "For the displayed reciprocal function, enter the vertical asymptote.", latex: "y=\\frac{1}{x+3}-2,\\quad x+3=0", answer: "x=-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "Set the denominator to zero.", explanation: "$x+3=0$ gives $x=-3$." },
        { id: "y11adv-poly-p8", prompt: "For the displayed reciprocal function, enter the horizontal asymptote.", latex: "y=\\frac{1}{x+3}-2", answer: "y=-2", difficulty: 2, acceptedAnswers: ["-2", "−2"], hint: "The vertical shift gives the horizontal asymptote.", explanation: "The $-2$ shift gives $y=-2$." },
        { id: "y11adv-poly-p9", prompt: "A polynomial has zeros at $-1$ and $4$. Which factor pair matches?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$(x-1)(x-4)$" }, { label: "B", text: "$(x+1)(x-4)$" }, { label: "C", text: "$(x-1)(x+4)$" }, { label: "D", text: "$(x+1)(x+4)$" }], hint: "Zero $r$ gives factor $x-r$.", explanation: "Zeros $-1,4$ give $(x+1)(x-4)$." },
        { id: "y11adv-poly-p10", prompt: "Which feature is most associated with a simple reciprocal function?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "Constant first difference" }, { label: "B", text: "Always a parabola" }, { label: "C", text: "No domain restrictions" }, { label: "D", text: "A vertical asymptote" }], hint: "A denominator that can be zero.", explanation: "A reciprocal denominator creates a vertical asymptote." },
        { id: "y11adv-poly-p11", prompt: "Zeros at $-2,1,4$ match which expression?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$(x-2)(x+1)(x+4)$" }, { label: "B", text: "$(x+2)(x-1)(x-4)$" }, { label: "C", text: "$(x-2)(x-1)(x+4)$" }, { label: "D", text: "$x^2+3x+2$" }], hint: "Use $x-r$ for each zero.", explanation: "Zeros $-2,1,4$ give $(x+2)(x-1)(x-4)$." },
        { id: "y11adv-poly-p12", prompt: "For the displayed reciprocal function, enter the vertical asymptote.", latex: "y=\\frac{1}{x+8},\\quad x+8=0", answer: "x=-8", difficulty: 3, acceptedAnswers: ["-8", "−8"], hint: "Set the denominator to zero.", explanation: "$x+8=0$ gives $x=-8$." },
        { id: "y11adv-poly-p13", prompt: "Which function is reciprocal rather than polynomial?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$x^2-4$" }, { label: "B", text: "$3x^3+1$" }, { label: "C", text: "$x-7$" }, { label: "D", text: "$\\frac{1}{x-4}$" }], hint: "Variable in the denominator.", explanation: "$\\frac{1}{x-4}$ has the variable in the denominator." },
        { id: "y11adv-poly-p14", prompt: "For the displayed function, enter the zero that is neither positive nor negative.", latex: "p(x)=x(x-3)(x+2),\\quad x=0", answer: "0", difficulty: 3, acceptedAnswers: ["x=0"], hint: "The factor $x$ gives a zero.", explanation: "$x=0$ is a zero." },
        { id: "y11adv-poly-p15", prompt: "For the displayed reciprocal function, the graph cannot cross which vertical line?", latex: "y=\\frac{1}{x-4}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$x=4$" }, { label: "B", text: "$x=-4$" }, { label: "C", text: "$y=4$" }, { label: "D", text: "$y=0$" }], hint: "The vertical asymptote.", explanation: "$x=4$ is the vertical asymptote, which the graph never crosses." },
        { id: "y11adv-poly-p16", prompt: "A factor $x-5$ gives an x-intercept at:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$(-5,0)$" }, { label: "B", text: "$(0,5)$" }, { label: "C", text: "$(5,0)$" }, { label: "D", text: "$(0,-5)$" }], hint: "Set $x-5=0$.", explanation: "$x=5$ gives the x-intercept $(5,0)$." },
        { id: "y11adv-poly-p17", prompt: "For the displayed reciprocal function, enter the horizontal asymptote.", latex: "y=\\frac{1}{x-1}+5", answer: "y=5", difficulty: 3, acceptedAnswers: ["5"], hint: "The vertical shift.", explanation: "The $+5$ shift gives $y=5$." },
        { id: "y11adv-poly-p18", prompt: "Enter the leading coefficient of the displayed polynomial.", latex: "p(x)=4x^4-2x+1", answer: "4", difficulty: 2, hint: "Coefficient of the highest power.", explanation: "The $x^4$ term has coefficient $4$." },
        { id: "y11adv-poly-p19", prompt: "For the displayed function, enter the smallest zero.", latex: "p(x)=(x+3)(x-2)(x-5),\\quad =0", answer: "-3", difficulty: 3, acceptedAnswers: ["-3", "−3", "x=-3"], hint: "Each factor gives a zero.", explanation: "Zeros $-3,2,5$; smallest is $-3$." },
        { id: "y11adv-poly-p20", prompt: "For the displayed reciprocal function, enter the excluded x-value.", latex: "y=\\frac{2}{2x-10},\\quad 2x-10\\ne0", answer: "5", difficulty: 4, acceptedAnswers: ["x=5"], hint: "Solve $2x-10=0$.", explanation: "$2x-10=0$ gives $x=5$." },
        { id: "y11adv-poly-p21", prompt: "A polynomial of degree 3 can have at most how many real zeros?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$1$" }, { label: "B", text: "$2$" }, { label: "C", text: "$3$" }, { label: "D", text: "$6$" }], hint: "Degree limits the number of zeros.", explanation: "A degree-3 polynomial has at most 3 real zeros." },
        { id: "y11adv-poly-p22", prompt: "For the displayed reciprocal function, enter the vertical asymptote.", latex: "y=\\frac{1}{x-1}+5,\\quad x-1=0", answer: "x=1", difficulty: 3, acceptedAnswers: ["1"], hint: "Set the denominator to zero.", explanation: "$x-1=0$ gives $x=1$." },
        { id: "y11adv-poly-p23", prompt: "Which expression has a vertical asymptote at $x=-2$ and a horizontal asymptote at $y=3$?", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\frac{1}{x-2}+3$" }, { label: "B", text: "$\\frac{1}{x+2}+3$" }, { label: "C", text: "$\\frac{1}{x+2}-3$" }, { label: "D", text: "$\\frac{1}{x-3}+2$" }], hint: "Denominator gives vertical; shift gives horizontal.", explanation: "$x+2=0$ gives $x=-2$; the $+3$ shift gives $y=3$." },
        { id: "y11adv-poly-p24", prompt: "For $p(x)=(x-1)(x-2)(x-3)$, enter the number of x-intercepts.", latex: "\\text{Choose one}", answer: "3", difficulty: 3, hint: "Count the distinct zeros.", explanation: "Three distinct zeros give three x-intercepts." },
        { id: "y11adv-poly-p25", prompt: "A rational graph has zeros at $-2$ and $3$ and a vertical asymptote at $x=5$. Which numerator and denominator match?", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\frac{(x+2)(x-3)}{x-5}$" }, { label: "B", text: "$\\frac{(x-2)(x+3)}{x-5}$" }, { label: "C", text: "$\\frac{(x+2)(x-3)}{x+5}$" }, { label: "D", text: "$\\frac{(x-5)}{(x+2)(x-3)}$" }], hint: "Zeros come from the numerator; asymptote from the denominator.", explanation: "Zeros $-2,3$ give numerator $(x+2)(x-3)$; asymptote $x=5$ gives denominator $x-5$." },
        { id: "y11adv-poly-p26", prompt: "For $y=\\frac{1}{x-3}+k$, the horizontal asymptote is $y=4$. Find $k$.", latex: "y=\\frac{1}{x-3}+k,\\quad y=4", answer: "4", difficulty: 4, hint: "The shift equals the horizontal asymptote.", explanation: "The horizontal asymptote is $y=k$, so $k=4$." },
        { id: "y11adv-poly-p27", prompt: "For $y=\\frac{1}{x-h}$ with vertical asymptote $x=7$, find $h$.", latex: "y=\\frac{1}{x-h},\\quad x=7", answer: "7", difficulty: 4, hint: "The asymptote is $x=h$.", explanation: "$x-h=0$ at $x=h$, and that equals $7$, so $h=7$." },
        { id: "y11adv-poly-p28", prompt: "Enter the y-intercept value of the displayed reciprocal function.", latex: "y=\\frac{1}{x-2}+1,\\quad x=0", answer: "1/2", difficulty: 5, acceptedAnswers: ["0.5", "1/2"], hint: "Set $x=0$.", explanation: "$y=\\frac{1}{0-2}+1=-\\frac{1}{2}+1=\\frac{1}{2}$." },
        { id: "y11adv-poly-p29", prompt: "A degree-4 polynomial with positive leading coefficient and zeros $-1,1,2,3$ has y-intercept value:", latex: "p(x)=(x+1)(x-1)(x-2)(x-3),\\quad x=0", answer: "-6", difficulty: 5, acceptedAnswers: ["-6", "−6"], hint: "Substitute $x=0$.", explanation: "$(1)(-1)(-2)(-3)=-6$." },
        { id: "y11adv-poly-p30", prompt: "For $p(x)=x(x-4)$, enter the x-coordinate of the vertex (axis of symmetry).", latex: "\\text{midpoint of }0\\text{ and }4", answer: "2", difficulty: 5, hint: "The axis is midway between the zeros.", explanation: "Zeros $0$ and $4$; axis at $\\frac{0+4}{2}=2$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-poly-mp1",
          prompt: "Consider the reciprocal function $y=\\frac{1}{x-3}+2$.",
          latex: "y=\\frac{1}{x-3}+2",
          answer: "3",
          hint: "For (a) set the denominator to zero. For (b) the shift gives the horizontal asymptote. For (c) substitute $x=0$.",
          explanation: "(a) Vertical asymptote $x=3$. (b) Horizontal asymptote $y=2$. (c) $y=\\frac{1}{-3}+2=\\frac{5}{3}$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Enter the x-value of the vertical asymptote.", marks: 1, answer: "3", acceptedAnswers: ["x=3"], hint: "Set $x-3=0$.", explanation: "$x-3=0$ gives $x=3$." },
            { key: "b", label: "(b)", prompt: "Enter the y-value of the horizontal asymptote.", marks: 1, answer: "2", acceptedAnswers: ["y=2"], hint: "The vertical shift.", explanation: "The $+2$ shift gives $y=2$." },
            { key: "c", label: "(c)", prompt: "Find the y-intercept value (set $x=0$).", marks: 2, answer: "5/3", acceptedAnswers: ["1.67", "1.667", "5/3"], hint: "Substitute $x=0$.", explanation: "$y=\\frac{1}{0-3}+2=-\\frac{1}{3}+2=\\frac{5}{3}$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "absolute-value-functions") {
    const basicAbsGraph = absoluteValueGraph(
      "Graph of y = |x| with vertex at the origin and two straight arms forming a V-shape.",
      0,
      0,
      "vertex (0, 0)"
    );
    const shiftedAbsGraph = absoluteValueGraph(
      "Graph of y = |x - 2| + 1 with vertex at (2, 1), shifted right two units and up one unit.",
      2,
      1,
      "vertex (2, 1)"
    );

    return {
      ...base,
      description:
        "Evaluate, sketch and interpret absolute-value functions, including transformations of y = |x|.",
      learningIntention:
        "Understand absolute value as distance from zero and use it to evaluate, solve and identify features of simple V-shaped graphs.",
      successCriteria: [
        "Evaluate absolute-value expressions such as |x - a|.",
        "Identify the vertex and axis of symmetry of y = |x - a| + b.",
        "Solve simple absolute-value equations by considering both positive and negative cases.",
        "Match absolute-value rules to V-shaped graph features.",
      ],
      teaching: {
        paragraphs: [
          "Absolute value tells you distance from zero on the number line. That is why |3| = 3 and |-3| = 3: both numbers are three units from zero.",
          "The graph of y = |x| is a V-shape. It has vertex (0, 0), slopes down to the left of the vertex, and slopes up to the right.",
          "A function like y = |x - a| + b shifts the V-shape. The vertex moves to (a, b), so y = |x - 2| + 1 has vertex (2, 1).",
          "When solving |x - a| = c, remember there are usually two x-values because two points can be the same distance from a.",
        ],
        latexBlocks: [
          "|x|=\\begin{cases}x,&x\\ge0\\\\-x,&x<0\\end{cases}",
          "y=|x-a|+b\\Rightarrow \\text{vertex }(a,b)",
          "|x-a|=c\\Rightarrow x-a=c\\text{ or }x-a=-c",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate an absolute-value expression",
          questionLatex: "\\text{Find } |{-4}|+2",
          cartesianGraph: basicAbsGraph,
          steps: [
            { explanation: "Absolute value gives the distance from zero, so |-4| becomes 4.", latex: "|-4|=4" },
            { explanation: "Add the remaining 2 after evaluating the absolute value.", latex: "4+2=6" },
          ],
          finalAnswerLatex: "6",
        },
        {
          title: "Find the vertex of a shifted absolute-value graph",
          questionLatex: "y=|x-2|+1",
          cartesianGraph: shiftedAbsGraph,
          steps: [
            { explanation: "Compare the rule with y = |x - a| + b.", latex: "a=2,\\quad b=1" },
            { explanation: "The vertex is the point (a, b).", latex: "(2,1)" },
          ],
          finalAnswerLatex: "\\text{Vertex }(2,1)",
        },
        {
          title: "Solve a simple absolute-value equation",
          questionLatex: "|x-3|=5",
          steps: [
            { explanation: "The expression x - 3 can be 5 or -5 because both have absolute value 5.", latex: "x-3=5\\quad \\text{or}\\quad x-3=-5" },
            { explanation: "Solve both linear equations.", latex: "x=8\\quad \\text{or}\\quad x=-2" },
          ],
          finalAnswerLatex: "x=-2,\\ 8",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-abs-g1", "What does absolute value measure?", "B", ["Gradient from left to right", "Distance from zero", "The largest x-value", "The y-intercept only"], "Absolute value gives distance from zero, so it is never negative."),
        formulaAnswer("y11adv-abs-g2", "Evaluate the absolute value expression.", "|-7|", "7", ["|-7|=7"]),
        formulaAnswer("y11adv-abs-g3", "Find the vertex of the absolute-value function.", "y=|x-3|+2", "(3,2)", ["(3, 2)", "3,2", "3, 2", "vertex (3,2)", "vertex (3, 2)"]),
        formulaAnswer("y11adv-abs-g4", "Solve the absolute-value equation. Enter the positive solution.", "|x|=4", "4", ["x=4"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-abs-i1", "Evaluate the absolute value expression.", "|-5|+3", "8", ["|-5|+3=8"]),
        formulaAnswer("y11adv-abs-i2", "Find the vertex of the absolute-value function.", "y=|x+1|-4", "(-1,-4)", ["(-1, -4)", "-1,-4", "-1, -4", "vertex (-1,-4)", "vertex (-1, -4)"]),
        formulaAnswer("y11adv-abs-i3", "Solve the absolute-value equation. Enter the smaller solution.", "|x-2|=5", "-3", ["x=-3"]),
        practicalChoice("y11adv-abs-i4", "Which graph feature belongs to y = |x - 4|?", "C", ["A horizontal asymptote", "A cubic turning point", "Vertex at (4, 0)", "Vertex at (-4, 0)"], "For y = |x - a|, the vertex is (a, 0)."),
        formulaAnswer("y11adv-abs-i5", "Find the minimum value of the absolute-value function.", "y=|x-6|+2", "2", ["minimum=2", "min=2", "y=2"]),
      ],
      commonMistakes: [
        { mistake: "Leaving absolute values negative.", fix: "Absolute value is distance, so |negative number| becomes positive." },
        { mistake: "Reversing the horizontal shift in |x - a|.", fix: "The vertex of y = |x - a| + b is (a, b), not (-a, b)." },
        { mistake: "Giving only one solution to |x - a| = c.", fix: "Use both x - a = c and x - a = -c when c is positive." },
        { mistake: "Treating the V-shaped graph as a parabola.", fix: "Absolute-value graphs are made from straight-line arms, not a smooth quadratic curve." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-abs-m1", "Evaluate the absolute value expression.", "|-9|-2", "7", ["|-9|-2=7"]),
        formulaAnswer("y11adv-abs-m2", "Find the vertex of the absolute-value function.", "y=|x-5|-3", "(5,-3)", ["(5, -3)", "5,-3", "5, -3", "vertex (5,-3)", "vertex (5, -3)"]),
        practicalChoice("y11adv-abs-m3", "Which equation has vertex (-2, 1)?", "D", ["y=|x-2|+1", "y=|x+1|-2", "y=|x-1|-2", "y=|x+2|+1"], "A vertex at (-2, 1) matches y = |x - (-2)| + 1 = |x + 2| + 1."),
        formulaAnswer("y11adv-abs-m4", "Solve the absolute-value equation. Enter the larger solution.", "|x+3|=6", "3", ["x=3"]),
        formulaAnswer("y11adv-abs-m5", "Find the y-intercept of the absolute-value function.", "y=|x-2|+1,\\quad x=0", "3", ["(0,3)", "y=3"]),
        practicalChoice("y11adv-abs-m6", "Which statement about y = |x| is true?", "A", ["It has vertex (0, 0)", "It is negative for x < 0", "It has no y-intercept", "It is a cubic graph"], "The graph y = |x| has vertex at the origin."),
        formulaAnswer("y11adv-abs-m7", "Solve the absolute-value equation. Enter the smaller solution.", "|x-1|=4", "-3", ["x=-3"]),
        formulaAnswer("y11adv-abs-m8", "Find the axis of symmetry of the absolute-value function.", "y=|x+4|-1", "x=-4", ["-4"]),
        formulaAnswer("y11adv-abs-m9", "Find the minimum value of the absolute-value function.", "y=|x+2|-5", "-5", ["minimum=-5", "min=-5", "y=-5"]),
        practicalChoice("y11adv-abs-m10", "A student says y = |x - 3| has vertex (-3, 0). What is the error?", "B", ["They used the wrong y-intercept", "They reversed the horizontal shift", "They treated |-3| as 0", "They used a reciprocal asymptote"], "In y = |x - a|, the vertex x-value is a."),
      ],
      masteryQuizPool: [
        { id: "y11adv-abs-p1", prompt: "Evaluate the absolute-value expression.", latex: "|-7|", answer: "7", difficulty: 1, hint: "Distance from zero.", explanation: "$|-7|=7$." },
        { id: "y11adv-abs-p2", prompt: "Evaluate the absolute-value expression.", latex: "|-9|-2", answer: "7", difficulty: 1, hint: "Evaluate the absolute value first.", explanation: "$|-9|-2=9-2=7$." },
        { id: "y11adv-abs-p3", prompt: "Evaluate the absolute-value expression.", latex: "|-5|+3", answer: "8", difficulty: 1, hint: "Absolute value, then add.", explanation: "$5+3=8$." },
        { id: "y11adv-abs-p4", prompt: "Find the vertex of the absolute-value function.", latex: "y=|x-3|+2", answer: "(3,2)", difficulty: 2, acceptedAnswers: ["(3, 2)", "3,2", "3, 2"], hint: "Vertex is $(a,b)$ for $y=|x-a|+b$.", explanation: "$a=3,b=2$ gives vertex $(3,2)$." },
        { id: "y11adv-abs-p5", prompt: "Find the vertex of the absolute-value function.", latex: "y=|x+1|-4", answer: "(-1,-4)", difficulty: 2, acceptedAnswers: ["(-1, -4)", "-1,-4", "-1, -4"], hint: "Rewrite $x+1$ as $x-(-1)$.", explanation: "Vertex $(-1,-4)$." },
        { id: "y11adv-abs-p6", prompt: "Find the vertex of the absolute-value function.", latex: "y=|x-5|-3", answer: "(5,-3)", difficulty: 2, acceptedAnswers: ["(5, -3)", "5,-3", "5, -3"], hint: "Vertex is $(a,b)$.", explanation: "Vertex $(5,-3)$." },
        { id: "y11adv-abs-p7", prompt: "Solve the equation. Enter the positive solution.", latex: "|x|=4", answer: "4", difficulty: 1, acceptedAnswers: ["x=4"], hint: "Two points are 4 from zero.", explanation: "$x=4$ or $x=-4$; positive is $4$." },
        { id: "y11adv-abs-p8", prompt: "Solve the equation. Enter the smaller solution.", latex: "|x-2|=5", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3", "x=-3"], hint: "$x-2=\\pm 5$.", explanation: "$x-2=5$ or $-5$ gives $7$ or $-3$; smaller is $-3$." },
        { id: "y11adv-abs-p9", prompt: "Solve the equation. Enter the larger solution.", latex: "|x+3|=6", answer: "3", difficulty: 2, acceptedAnswers: ["x=3"], hint: "$x+3=\\pm 6$.", explanation: "$x+3=6$ or $-6$ gives $3$ or $-9$; larger is $3$." },
        { id: "y11adv-abs-p10", prompt: "Find the minimum value of the function.", latex: "y=|x-6|+2", answer: "2", difficulty: 2, acceptedAnswers: ["min=2", "y=2"], hint: "Minimum of $|\\cdot|$ is 0.", explanation: "The smallest $|x-6|$ is 0, so the minimum is $2$." },
        { id: "y11adv-abs-p11", prompt: "Find the minimum value of the function.", latex: "y=|x+2|-5", answer: "-5", difficulty: 2, acceptedAnswers: ["-5", "−5", "min=-5", "y=-5"], hint: "Minimum of $|\\cdot|$ is 0.", explanation: "The smallest $|x+2|$ is 0, so the minimum is $-5$." },
        { id: "y11adv-abs-p12", prompt: "Find the y-intercept of the function.", latex: "y=|x-2|+1,\\quad x=0", answer: "3", difficulty: 3, acceptedAnswers: ["(0,3)", "y=3"], hint: "Set $x=0$.", explanation: "$|0-2|+1=2+1=3$." },
        { id: "y11adv-abs-p13", prompt: "Find the axis of symmetry of the function.", latex: "y=|x+4|-1", answer: "x=-4", difficulty: 3, acceptedAnswers: ["-4", "−4"], hint: "The axis runs through the vertex.", explanation: "Vertex at $x=-4$, so axis is $x=-4$." },
        { id: "y11adv-abs-p14", prompt: "Which equation has vertex $(-2,1)$?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$y=|x-2|+1$" }, { label: "B", text: "$y=|x+1|-2$" }, { label: "C", text: "$y=|x-1|-2$" }, { label: "D", text: "$y=|x+2|+1$" }], hint: "Vertex is $(a,b)$ in $y=|x-a|+b$.", explanation: "$y=|x+2|+1=|x-(-2)|+1$ has vertex $(-2,1)$." },
        { id: "y11adv-abs-p15", prompt: "What does absolute value measure?", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Gradient left to right" }, { label: "B", text: "Distance from zero" }, { label: "C", text: "The largest x-value" }, { label: "D", text: "The y-intercept only" }], hint: "It is never negative.", explanation: "Absolute value is distance from zero." },
        { id: "y11adv-abs-p16", prompt: "Which graph feature belongs to $y=|x-4|$?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "A horizontal asymptote" }, { label: "B", text: "A cubic turning point" }, { label: "C", text: "Vertex at $(4,0)$" }, { label: "D", text: "Vertex at $(-4,0)$" }], hint: "Vertex is $(a,0)$.", explanation: "$y=|x-4|$ has vertex $(4,0)$." },
        { id: "y11adv-abs-p17", prompt: "Evaluate the absolute-value expression.", latex: "|3-8|", answer: "5", difficulty: 2, hint: "Work inside first.", explanation: "$|3-8|=|-5|=5$." },
        { id: "y11adv-abs-p18", prompt: "Evaluate the absolute-value expression.", latex: "2|{-3}|+1", answer: "7", difficulty: 3, hint: "Absolute value first, then multiply.", explanation: "$2(3)+1=7$." },
        { id: "y11adv-abs-p19", prompt: "Solve the equation. Enter the smaller solution.", latex: "|x-1|=4", answer: "-3", difficulty: 3, acceptedAnswers: ["-3", "−3", "x=-3"], hint: "$x-1=\\pm 4$.", explanation: "$x-1=4$ or $-4$ gives $5$ or $-3$; smaller is $-3$." },
        { id: "y11adv-abs-p20", prompt: "Which statement about $y=|x|$ is true?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "It has vertex $(0,0)$" }, { label: "B", text: "It is negative for $x<0$" }, { label: "C", text: "It has no y-intercept" }, { label: "D", text: "It is a cubic graph" }], hint: "Think about the V-shape.", explanation: "$y=|x|$ has its vertex at the origin." },
        { id: "y11adv-abs-p21", prompt: "Find the y-intercept of the function.", latex: "y=|x+3|-1,\\quad x=0", answer: "2", difficulty: 3, hint: "Set $x=0$.", explanation: "$|0+3|-1=3-1=2$." },
        { id: "y11adv-abs-p22", prompt: "Solve the equation. Enter the number of solutions.", latex: "|x-2|=0", answer: "1", difficulty: 3, hint: "Only zero distance.", explanation: "$|x-2|=0$ gives only $x=2$, so one solution." },
        { id: "y11adv-abs-p23", prompt: "Solve the equation. Enter the number of solutions.", latex: "|x+1|=-3", answer: "0", difficulty: 4, hint: "Absolute value is never negative.", explanation: "$|x+1|$ cannot equal $-3$, so there are no solutions." },
        { id: "y11adv-abs-p24", prompt: "Find the larger solution.", latex: "|2x-4|=6", answer: "5", difficulty: 4, acceptedAnswers: ["x=5"], hint: "$2x-4=\\pm 6$.", explanation: "$2x-4=6$ gives $x=5$; $2x-4=-6$ gives $x=-1$; larger is $5$." },
        { id: "y11adv-abs-p25", prompt: "The graph of $y=|x-a|+b$ has vertex $(3,-2)$ and passes through $(5,k)$. Find $k$.", latex: "y=|x-3|-2,\\quad x=5", answer: "0", difficulty: 5, hint: "Substitute $x=5$.", explanation: "$|5-3|-2=2-2=0$." },
        { id: "y11adv-abs-p26", prompt: "For $y=|x+1|-4$, find both x-intercepts and enter their sum.", latex: "|x+1|-4=0", answer: "-2", difficulty: 5, acceptedAnswers: ["-2", "−2"], hint: "$|x+1|=4$ gives two values.", explanation: "$x+1=\\pm 4$ gives $3$ and $-5$; sum $=-2$." },
        { id: "y11adv-abs-p27", prompt: "Find the smaller x-intercept of $y=|x-2|-3$.", latex: "|x-2|-3=0", answer: "-1", difficulty: 5, acceptedAnswers: ["-1", "−1", "x=-1"], hint: "$|x-2|=3$.", explanation: "$x-2=\\pm 3$ gives $5$ and $-1$; smaller is $-1$." },
        { id: "y11adv-abs-p28", prompt: "The vertex of $y=|x-h|+k$ is the minimum point. For $y=|x+5|+2$, enter the minimum value.", latex: "y=|x+5|+2", answer: "2", difficulty: 4, hint: "Minimum of $|\\cdot|$ is 0.", explanation: "The minimum value is $2$." },
        { id: "y11adv-abs-p29", prompt: "A student says $y=|x-3|$ has vertex $(-3,0)$. What is the error?", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Wrong y-intercept" }, { label: "B", text: "Reversed the horizontal shift" }, { label: "C", text: "Treated $|-3|$ as 0" }, { label: "D", text: "Used a reciprocal asymptote" }], hint: "Vertex x-value is $a$ in $|x-a|$.", explanation: "$y=|x-3|$ has vertex $(3,0)$, not $(-3,0)$." },
        { id: "y11adv-abs-p30", prompt: "For $y=|x-4|+1$, the point $(7,k)$ lies on the graph. Find $k$.", latex: "y=|x-4|+1,\\quad x=7", answer: "4", difficulty: 5, hint: "Substitute $x=7$.", explanation: "$|7-4|+1=3+1=4$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-abs-mp1",
          prompt: "Consider the absolute-value function $y=|x-2|-3$.",
          latex: "y=|x-2|-3",
          answer: "(2,-3)",
          hint: "For (a) read the vertex. For (b) solve $|x-2|=3$. For (c) substitute $x=0$.",
          explanation: "(a) Vertex $(2,-3)$. (b) x-intercepts at $-1$ and $5$. (c) $y$-intercept $|0-2|-3=-1$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Enter the x-coordinate of the vertex.", marks: 1, answer: "2", acceptedAnswers: ["x=2"], hint: "Vertex is $(a,b)$ for $y=|x-a|+b$.", explanation: "Vertex x-coordinate is $2$." },
            { key: "b", label: "(b)", prompt: "Find the larger x-intercept.", marks: 2, answer: "5", acceptedAnswers: ["x=5"], hint: "Solve $|x-2|=3$.", explanation: "$x-2=\\pm 3$ gives $5$ and $-1$; larger is $5$." },
            { key: "c", label: "(c)", prompt: "Find the y-intercept value (set $x=0$).", marks: 1, answer: "-1", acceptedAnswers: ["-1", "−1"], hint: "Substitute $x=0$.", explanation: "$|0-2|-3=2-3=-1$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "odd-even-functions") {
    const evenGraph = sampledCurveGraph(
      "Graph of y = x squared, showing matching points (-2, 4) and (2, 4) reflected across the y-axis.",
      (x) => x * x,
      [
        { x: -2, y: 4, label: "(-2, 4)" },
        { x: 2, y: 4, label: "(2, 4)" },
        { x: 0, y: 0, label: "y-axis symmetry" },
      ]
    );
    const oddGraph = sampledCurveGraph(
      "Graph of y = x cubed, showing points (-1, -1) and (1, 1) related by origin symmetry.",
      (x) => x * x * x,
      [
        { x: -1, y: -1, label: "(-1, -1)" },
        { x: 1, y: 1, label: "(1, 1)" },
        { x: 0, y: 0, label: "origin" },
      ]
    );

    return {
      ...base,
      description:
        "Identify even, odd and neither functions using algebraic tests and graph symmetry.",
      learningIntention:
        "Use f(-x) to classify functions as even, odd or neither, and connect the algebraic test to graph symmetry.",
      successCriteria: [
        "Use f(-x) = f(x) to identify even functions.",
        "Use f(-x) = -f(x) to identify odd functions.",
        "Recognise y-axis symmetry for even functions and origin symmetry for odd functions.",
        "Classify simple polynomial functions as even, odd or neither.",
      ],
      teaching: {
        paragraphs: [
          "Even and odd are symmetry labels for functions. They are not about whether the powers look visually even or odd in isolation; the whole function must pass the test.",
          "A function is even when f(-x) = f(x). Its graph has y-axis symmetry, so the left side mirrors the right side.",
          "A function is odd when f(-x) = -f(x). Its graph has origin symmetry, meaning a point (a, b) is matched by (-a, -b).",
          "Some functions are neither. If f(-x) is not the same as f(x) and not the negative of f(x), do not force a symmetry label.",
        ],
        latexBlocks: [
          "\\text{Even: }f(-x)=f(x)",
          "\\text{Odd: }f(-x)=-f(x)",
          "\\text{Even symmetry: y-axis;}\\quad \\text{odd symmetry: origin}",
        ],
      },
      workedExamples: [
        {
          title: "Classify an even function",
          questionLatex: "f(x)=x^2+1",
          cartesianGraph: evenGraph,
          steps: [
            { explanation: "Substitute -x into the function.", latex: "f(-x)=(-x)^2+1" },
            { explanation: "Simplify and compare with f(x).", latex: "x^2+1=f(x)" },
          ],
          finalAnswerLatex: "\\text{Even function}",
        },
        {
          title: "Classify an odd function",
          questionLatex: "g(x)=x^3",
          cartesianGraph: oddGraph,
          steps: [
            { explanation: "Substitute -x into the function.", latex: "g(-x)=(-x)^3" },
            { explanation: "Simplify and compare with -g(x).", latex: "-x^3=-g(x)" },
          ],
          finalAnswerLatex: "\\text{Odd function}",
        },
        {
          title: "Recognise a function that is neither",
          questionLatex: "h(x)=x^2+x",
          steps: [
            { explanation: "Substitute -x into the function.", latex: "h(-x)=(-x)^2+(-x)=x^2-x" },
            { explanation: "This is not h(x) and not -h(x).", latex: "x^2-x\\ne x^2+x,\\quad x^2-x\\ne -x^2-x" },
          ],
          finalAnswerLatex: "\\text{Neither even nor odd}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-sym-g1", "An even function has which graph symmetry?", "A", ["Symmetry about the y-axis", "Symmetry about the x-axis", "Symmetry about x = 1", "No possible symmetry"], "Even functions satisfy f(-x) = f(x), which gives y-axis symmetry."),
        practicalChoice("y11adv-sym-g2", "An odd function has which graph symmetry?", "C", ["Symmetry about the y-axis", "Symmetry about y = 1", "Symmetry about the origin", "Symmetry about the x-axis"], "Odd functions satisfy f(-x) = -f(x), which gives origin symmetry."),
        formulaAnswer("y11adv-sym-g3", "Classify the function as even, odd or neither.", "f(x)=x^2", "even", ["even function"]),
        formulaAnswer("y11adv-sym-g4", "Classify the function as even, odd or neither.", "f(x)=x^3", "odd", ["odd function"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-sym-i1", "Classify the function as even, odd or neither.", "f(x)=x^4+2", "even", ["even function"]),
        formulaAnswer("y11adv-sym-i2", "Classify the function as even, odd or neither.", "g(x)=x^3+x", "odd", ["odd function"]),
        formulaAnswer("y11adv-sym-i3", "Classify the function as even, odd or neither.", "h(x)=x^2+x", "neither", ["neither even nor odd", "neither odd nor even"]),
        practicalChoice("y11adv-sym-i4", "If a graph contains (2, 5) and is even, which point must also be on it?", "B", ["(2, -5)", "(-2, 5)", "(-2, -5)", "(5, 2)"], "Even symmetry reflects across the y-axis, changing x but not y."),
        practicalChoice("y11adv-sym-i5", "If a graph contains (3, -4) and is odd, which point must also be on it?", "C", ["(-3, -4)", "(3, 4)", "(-3, 4)", "(4, -3)"], "Origin symmetry changes both coordinates' signs."),
      ],
      commonMistakes: [
        { mistake: "Classifying from one term instead of the whole function.", fix: "Substitute -x into the entire function before deciding." },
        { mistake: "Confusing y-axis symmetry with origin symmetry.", fix: "Even means y-axis symmetry; odd means origin symmetry." },
        { mistake: "Thinking every function must be even or odd.", fix: "Many functions are neither when neither test works." },
        { mistake: "Forgetting to compare f(-x) with -f(x) for odd functions.", fix: "For odd functions, the whole output changes sign." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-sym-m1", "Classify the function as even, odd or neither.", "f(x)=x^6-3x^2", "even", ["even function"]),
        formulaAnswer("y11adv-sym-m2", "Classify the function as even, odd or neither.", "g(x)=2x^5-x", "odd", ["odd function"]),
        formulaAnswer("y11adv-sym-m3", "Classify the function as even, odd or neither.", "h(x)=x^3+1", "neither", ["neither even nor odd", "neither odd nor even"]),
        practicalChoice("y11adv-sym-m4", "Which condition defines an even function?", "A", ["f(-x)=f(x)", "f(-x)=-f(x)", "f(x)=0", "f(-x)=x"], "Even functions have the same output for x and -x."),
        practicalChoice("y11adv-sym-m5", "Which condition defines an odd function?", "B", ["f(-x)=f(x)", "f(-x)=-f(x)", "f(x)=x^2", "f(0)=1"], "Odd functions change sign when x changes to -x."),
        formulaAnswer("y11adv-sym-m6", "For the even function, find f(-4).", "f(4)=9", "9", ["f(-4)=9"]),
        formulaAnswer("y11adv-sym-m7", "For the odd function, find f(-2).", "f(2)=7", "-7", ["f(-2)=-7"]),
        practicalChoice("y11adv-sym-m8", "A graph contains (-1, -3) and (1, 3). Which symmetry does this suggest?", "C", ["Y-axis symmetry", "X-axis symmetry", "Origin symmetry", "No function symmetry"], "The coordinates both change sign, matching origin symmetry."),
        formulaAnswer("y11adv-sym-m9", "Classify the function as even, odd or neither.", "p(x)=x^4+x^2+5", "even", ["even function"]),
        formulaAnswer("y11adv-sym-m10", "Classify the function as even, odd or neither.", "q(x)=x^5+x^2", "neither", ["neither even nor odd", "neither odd nor even"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-sym-p1", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=x^2", answer: "even", difficulty: 1, acceptedAnswers: ["even function"], hint: "Check $f(-x)$.", explanation: "$f(-x)=x^2=f(x)$, so even." },
        { id: "y11adv-sym-p2", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=x^3", answer: "odd", difficulty: 1, acceptedAnswers: ["odd function"], hint: "Check $f(-x)$.", explanation: "$f(-x)=-x^3=-f(x)$, so odd." },
        { id: "y11adv-sym-p3", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=x^4+2", answer: "even", difficulty: 1, acceptedAnswers: ["even function"], hint: "Even powers and constants.", explanation: "$f(-x)=x^4+2=f(x)$, so even." },
        { id: "y11adv-sym-p4", prompt: "Classify the function as even, odd or neither.", latex: "g(x)=x^3+x", answer: "odd", difficulty: 2, acceptedAnswers: ["odd function"], hint: "All odd powers.", explanation: "$g(-x)=-x^3-x=-g(x)$, so odd." },
        { id: "y11adv-sym-p5", prompt: "Classify the function as even, odd or neither.", latex: "h(x)=x^2+x", answer: "neither", difficulty: 2, acceptedAnswers: ["neither even nor odd", "neither odd nor even"], hint: "Mixed even and odd terms.", explanation: "$h(-x)=x^2-x$, which is neither $h(x)$ nor $-h(x)$." },
        { id: "y11adv-sym-p6", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=x^6-3x^2", answer: "even", difficulty: 2, acceptedAnswers: ["even function"], hint: "All even powers.", explanation: "$f(-x)=x^6-3x^2=f(x)$, so even." },
        { id: "y11adv-sym-p7", prompt: "Classify the function as even, odd or neither.", latex: "g(x)=2x^5-x", answer: "odd", difficulty: 2, acceptedAnswers: ["odd function"], hint: "All odd powers.", explanation: "$g(-x)=-2x^5+x=-g(x)$, so odd." },
        { id: "y11adv-sym-p8", prompt: "Classify the function as even, odd or neither.", latex: "h(x)=x^3+1", answer: "neither", difficulty: 2, acceptedAnswers: ["neither even nor odd", "neither odd nor even"], hint: "Odd power plus constant.", explanation: "$h(-x)=-x^3+1$, which is neither $h(x)$ nor $-h(x)$." },
        { id: "y11adv-sym-p9", prompt: "An even function has which graph symmetry?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "About the y-axis" }, { label: "B", text: "About the x-axis" }, { label: "C", text: "About $x=1$" }, { label: "D", text: "No symmetry" }], hint: "$f(-x)=f(x)$.", explanation: "Even functions have y-axis symmetry." },
        { id: "y11adv-sym-p10", prompt: "An odd function has which graph symmetry?", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "About the y-axis" }, { label: "B", text: "About $y=1$" }, { label: "C", text: "About the origin" }, { label: "D", text: "About the x-axis" }], hint: "$f(-x)=-f(x)$.", explanation: "Odd functions have origin symmetry." },
        { id: "y11adv-sym-p11", prompt: "Which condition defines an even function?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$f(-x)=f(x)$" }, { label: "B", text: "$f(-x)=-f(x)$" }, { label: "C", text: "$f(x)=0$" }, { label: "D", text: "$f(-x)=x$" }], hint: "Same output for $x$ and $-x$.", explanation: "Even means $f(-x)=f(x)$." },
        { id: "y11adv-sym-p12", prompt: "Which condition defines an odd function?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$f(-x)=f(x)$" }, { label: "B", text: "$f(-x)=-f(x)$" }, { label: "C", text: "$f(x)=x^2$" }, { label: "D", text: "$f(0)=1$" }], hint: "Output changes sign.", explanation: "Odd means $f(-x)=-f(x)$." },
        { id: "y11adv-sym-p13", prompt: "If a graph contains $(2,5)$ and is even, which point must also lie on it?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$(2,-5)$" }, { label: "B", text: "$(-2,5)$" }, { label: "C", text: "$(-2,-5)$" }, { label: "D", text: "$(5,2)$" }], hint: "Even reflects across the y-axis.", explanation: "Even symmetry changes $x$ but not $y$: $(-2,5)$." },
        { id: "y11adv-sym-p14", prompt: "If a graph contains $(3,-4)$ and is odd, which point must also lie on it?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$(-3,-4)$" }, { label: "B", text: "$(3,4)$" }, { label: "C", text: "$(-3,4)$" }, { label: "D", text: "$(4,-3)$" }], hint: "Origin symmetry changes both signs.", explanation: "Odd symmetry maps $(3,-4)$ to $(-3,4)$." },
        { id: "y11adv-sym-p15", prompt: "For the even function, find $f(-4)$.", latex: "f(4)=9,\\quad f\\text{ even}", answer: "9", difficulty: 3, acceptedAnswers: ["f(-4)=9"], hint: "Even: $f(-x)=f(x)$.", explanation: "$f(-4)=f(4)=9$." },
        { id: "y11adv-sym-p16", prompt: "For the odd function, find $f(-2)$.", latex: "f(2)=7,\\quad f\\text{ odd}", answer: "-7", difficulty: 3, acceptedAnswers: ["-7", "−7", "f(-2)=-7"], hint: "Odd: $f(-x)=-f(x)$.", explanation: "$f(-2)=-f(2)=-7$." },
        { id: "y11adv-sym-p17", prompt: "Classify the function as even, odd or neither.", latex: "p(x)=x^4+x^2+5", answer: "even", difficulty: 2, acceptedAnswers: ["even function"], hint: "All even powers.", explanation: "$p(-x)=p(x)$, so even." },
        { id: "y11adv-sym-p18", prompt: "Classify the function as even, odd or neither.", latex: "q(x)=x^5+x^2", answer: "neither", difficulty: 3, acceptedAnswers: ["neither even nor odd", "neither odd nor even"], hint: "Mixed parity.", explanation: "$q(-x)=-x^5+x^2$, which is neither." },
        { id: "y11adv-sym-p19", prompt: "A graph contains $(-1,-3)$ and $(1,3)$. Which symmetry does this suggest?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Y-axis symmetry" }, { label: "B", text: "X-axis symmetry" }, { label: "C", text: "Origin symmetry" }, { label: "D", text: "No symmetry" }], hint: "Both coordinates change sign.", explanation: "Both signs flip, matching origin (odd) symmetry." },
        { id: "y11adv-sym-p20", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=5", answer: "even", difficulty: 2, acceptedAnswers: ["even function"], hint: "Constant for all $x$.", explanation: "$f(-x)=5=f(x)$, so even." },
        { id: "y11adv-sym-p21", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=x", answer: "odd", difficulty: 2, acceptedAnswers: ["odd function"], hint: "Check $f(-x)$.", explanation: "$f(-x)=-x=-f(x)$, so odd." },
        { id: "y11adv-sym-p22", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=|x|", answer: "even", difficulty: 3, acceptedAnswers: ["even function"], hint: "Absolute value of $-x$.", explanation: "$|-x|=|x|$, so $f(-x)=f(x)$ and it is even." },
        { id: "y11adv-sym-p23", prompt: "For an odd function, what is $f(0)$ (when defined)?", latex: "f(-0)=-f(0)", answer: "0", difficulty: 4, hint: "Set $x=0$ in $f(-x)=-f(x)$.", explanation: "$f(0)=-f(0)$ forces $f(0)=0$." },
        { id: "y11adv-sym-p24", prompt: "Classify the function as even, odd or neither.", latex: "g(x)=x^3-2x^5", answer: "odd", difficulty: 4, acceptedAnswers: ["odd function"], hint: "All odd powers.", explanation: "$g(-x)=-x^3+2x^5=-g(x)$, so odd." },
        { id: "y11adv-sym-p25", prompt: "The product of two odd functions is:", latex: "\\text{Choose one}", answer: "A", difficulty: 5, choices: [{ label: "A", text: "Even" }, { label: "B", text: "Odd" }, { label: "C", text: "Neither" }, { label: "D", text: "Always zero" }], hint: "Multiply two sign-flips.", explanation: "$(-)(-)=(+)$, so the product is even." },
        { id: "y11adv-sym-p26", prompt: "If $f$ is even and $f(3)=11$, find $f(-3)+f(3)$.", latex: "f\\text{ even},\\ f(3)=11", answer: "22", difficulty: 4, hint: "$f(-3)=f(3)$.", explanation: "$f(-3)=11$, so the sum is $22$." },
        { id: "y11adv-sym-p27", prompt: "If $f$ is odd and $f(5)=8$, find $f(-5)+f(5)$.", latex: "f\\text{ odd},\\ f(5)=8", answer: "0", difficulty: 4, hint: "$f(-5)=-f(5)$.", explanation: "$f(-5)=-8$, so $-8+8=0$." },
        { id: "y11adv-sym-p28", prompt: "The sum of an even and an odd function (both non-zero) is generally:", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "Even" }, { label: "B", text: "Odd" }, { label: "C", text: "Neither" }, { label: "D", text: "Always zero" }], hint: "Try $x^2+x$.", explanation: "Mixing parities (e.g. $x^2+x$) gives a function that is neither." },
        { id: "y11adv-sym-p29", prompt: "Classify the function as even, odd or neither.", latex: "f(x)=x^2-x^4+7", answer: "even", difficulty: 4, acceptedAnswers: ["even function"], hint: "All even powers.", explanation: "$f(-x)=f(x)$, so even." },
        { id: "y11adv-sym-p30", prompt: "The product of an even function and an odd function is:", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "Even" }, { label: "B", text: "Odd" }, { label: "C", text: "Neither" }, { label: "D", text: "Constant" }], hint: "Combine $(+)$ and $(-)$ sign behaviour.", explanation: "Even $\\times$ odd flips sign overall, giving an odd function." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-sym-mp1",
          prompt: "A function $f$ is known to be odd, with $f(2)=6$ and $f(4)=20$.",
          latex: "f\\text{ is odd},\\quad f(2)=6,\\ f(4)=20",
          answer: "-6",
          hint: "For (a) and (b) use $f(-x)=-f(x)$. For (c) recall the value an odd function must take at $0$.",
          explanation: "(a) $f(-2)=-6$. (b) $f(-4)=-20$. (c) $f(0)=0$ for any odd function.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find $f(-2)$.", marks: 1, answer: "-6", acceptedAnswers: ["-6", "−6"], hint: "$f(-x)=-f(x)$.", explanation: "$f(-2)=-f(2)=-6$." },
            { key: "b", label: "(b)", prompt: "Find $f(-4)$.", marks: 1, answer: "-20", acceptedAnswers: ["-20", "−20"], hint: "$f(-x)=-f(x)$.", explanation: "$f(-4)=-f(4)=-20$." },
            { key: "c", label: "(c)", prompt: "State the value of $f(0)$.", marks: 2, answer: "0", hint: "Set $x=0$ in $f(-x)=-f(x)$.", explanation: "$f(0)=-f(0)$ forces $f(0)=0$ for any odd function." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "working-with-functions-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed function notation, domain, range, roots, intercepts, polynomial features, reciprocal asymptotes, and common-error recognition.",
      learningIntention:
        "Apply function notation, domain and range, intercepts, roots, polynomial features, and reciprocal asymptotes in mixed assessment-style questions.",
      successCriteria: [
        "Evaluate functions and recognise substitution errors.",
        "Identify domain, range, intercepts, roots, factors, and asymptotes.",
        "Choose possible equations from graph-feature descriptions.",
        "Give concise answers that match the feature being asked for.",
      ],
      teaching: {
        paragraphs: [
          "Mixed function questions often combine algebraic rules with graph features. Start by deciding whether the question is asking about an input, an output, a restriction, or an intercept.",
          "For function notation, substitute carefully. For domain, look for denominators and square roots. For roots and intercepts, set y = 0 or x = 0 as needed.",
          "For polynomial questions, use factors and degree. For reciprocal questions, use denominator restrictions to identify vertical asymptotes.",
          "Assessment questions often test common errors, such as confusing roots with factors or domain with range.",
        ],
        latexBlocks: [
          "f(a)=\\text{output when }x=a",
          "x\\text{-intercepts: solve }f(x)=0",
          "\\frac{1}{x-h}+k\\Rightarrow x=h,\\ y=k\\text{ are asymptotes}",
        ],
      },
      workedExamples: [
        {
          title: "Combine substitution and error recognition",
          questionLatex: "f(x)=2x^2-3x+1,\\quad f(-2)",
          steps: [
            {
              explanation:
                "Use brackets around the negative input.",
              latex: "2(-2)^2-3(-2)+1",
            },
            {
              explanation:
                "The common wrong answer comes from treating $(-2)^2$ as -4.",
              latex: "8+6+1=15",
            },
          ],
          finalAnswerLatex: "f(-2)=15",
        },
        {
          title: "Identify a domain restriction and asymptote",
          questionLatex: "g(x)=\\frac{1}{x+5}-2",
          steps: [
            {
              explanation:
                "The denominator cannot be zero, so x + 5 cannot equal zero.",
              latex: "x+5=0\\Rightarrow x=-5",
            },
            {
              explanation:
                "The vertical asymptote is the excluded x-value.",
              latex: "x=-5",
            },
          ],
          finalAnswerLatex: "\\text{Domain: }x\\neq -5,\\quad \\text{vertical asymptote }x=-5",
        },
        {
          title: "Match roots to a possible equation",
          questionLatex: "\\text{Zeros at }-2,\\ 1,\\ 4",
          steps: [
            {
              explanation:
                "A zero at -2 gives factor x + 2.",
            },
            {
              explanation:
                "Zeros at 1 and 4 give factors x - 1 and x - 4.",
              latex: "(x+2)(x-1)(x-4)",
            },
          ],
          finalAnswerLatex: "f(x)=(x+2)(x-1)(x-4)",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-func-exam-g1", "Evaluate the displayed function at the given input.", "f(x)=x^2-4x+2,\\quad f(-1)", "7", ["f(-1)=7"]),
        formulaAnswer("y11adv-func-exam-g2", "For the displayed reciprocal function, enter the excluded x-value.", "g(x)=\\frac{1}{x+5},\\quad x+5\\ne0", "-5", ["x=-5"]),
        practicalChoice("y11adv-func-exam-g3", "A function has zeros at -2 and 3. Which expression could represent it?", "B", ["(x-2)(x-3)", "(x+2)(x-3)", "(x-2)(x+3)", "1/(x-3)"], "Zeros -2 and 3 match factors x + 2 and x - 3."),
        practicalChoice("y11adv-func-exam-g4", "A student says the range of a table is the listed x-values. What is the error?", "C", ["They found the y-intercept", "They found the vertical asymptote", "They confused domain and range", "They found the cubic degree"], "The listed x-values are the domain."),
      ],
      independentPractice: [
        formulaAnswer("y11adv-func-exam-i1", "Evaluate the displayed function at the given input.", "p(x)=3x^2+2x,\\quad p(-2)", "8", ["p(-2)=8"]),
        formulaAnswer("y11adv-func-exam-i2", "For the displayed reciprocal function, enter the vertical asymptote.", "y=\\frac{1}{x-4}+1,\\quad x-4=0", "x=4", ["4"]),
        formulaAnswer("y11adv-func-exam-i3", "For the displayed function, enter the larger zero.", "f(x)=(x+1)(x-5),\\quad (x+1)(x-5)=0", "5", ["x=5"]),
        practicalChoice("y11adv-func-exam-i4", "A graph has the displayed lowest point and continues upward. Which range is correct?", "D", ["x >= -3", "y <= -3", "x != -3", "y >= -3"], "The range is the set of output y-values.", "y=-3\\text{ is the lowest output}"),
        practicalChoice("y11adv-func-exam-i5", "Which feature belongs to the displayed reciprocal function?", "A", ["Vertical asymptote $x=2$", "Zero at $x=2$", "No domain restriction", "Quadratic turning point at $x=2$"], "The denominator restriction creates the vertical asymptote.", "y=\\frac{1}{x-2}"),
      ],
      commonMistakes: [
        { mistake: "Answering with a root when the question asks for a factor.", fix: "Translate carefully: zero r corresponds to factor x - r." },
        { mistake: "Using y-values when asked for domain.", fix: "Domain is about allowed x-values." },
        { mistake: "Forgetting brackets in function substitution.", fix: "Put negative inputs in brackets before evaluating powers." },
        { mistake: "Treating an asymptote as an intercept.", fix: "An asymptote is approached by the graph; it is not usually crossed as an intercept." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-func-exam-m1", "Evaluate the displayed function at the given input.", "f(x)=2x^2-3x+1,\\quad f(-2)", "15", ["f(-2)=15"]),
        formulaAnswer("y11adv-func-exam-m2", "For the displayed reciprocal function, enter the excluded x-value.", "g(x)=\\frac{1}{x-4},\\quad x-4\\ne0", "4", ["x=4"]),
        practicalChoice("y11adv-func-exam-m3", "For the displayed square-root function, which domain is correct?", "A", ["x >= -6", "x <= -6", "x != -6", "x >= 6"], "x + 6 must be at least zero.", "h(x)=\\sqrt{x+6}"),
        formulaAnswer("y11adv-func-exam-m4", "For the displayed function, enter the negative zero.", "f(x)=(x-2)(x+7),\\quad (x-2)(x+7)=0", "-7", ["x=-7"]),
        practicalChoice("y11adv-func-exam-m5", "A cubic function has zeros at -2, 1 and 4. Which expression could represent it?", "B", ["(x-2)(x+1)(x+4)", "(x+2)(x-1)(x-4)", "(x+2)(x+1)(x-4)", "x^2-3x+2"], "Use x - r for each zero r."),
        formulaAnswer("y11adv-func-exam-m6", "For the displayed reciprocal function, enter the horizontal asymptote.", "y=\\frac{1}{x+3}-2", "y=-2", ["-2"]),
        practicalChoice("y11adv-func-exam-m7", "In the displayed factorised function, the highlighted factor gives which x-intercept?", "C", ["(-6,0)", "(0,6)", "(6,0)", "(0,-6)"], "Set x - 6 = 0.", "f(x)=(x-6)(x+1),\\quad x-6=0"),
        formulaAnswer("y11adv-func-exam-m8", "For the displayed function, enter the positive x-intercept.", "f(x)=-x^2+9,\\quad -x^2+9=0", "3", ["x=3", "(3,0)"]),
        practicalChoice("y11adv-func-exam-m9", "A table lists inputs -1, 0, 1 and outputs 2, 5, 10. Which set is the domain?", "D", ["{2,5,10}", "{-1,2,5}", "{0,5,10}", "{-1,0,1}"], "Domain is the set of input x-values."),
        practicalChoice("y11adv-func-exam-m10", "Which common error would change the value of the displayed function for the negative input?", "A", ["Writing $-3^2$ instead of $(-3)^2$", "Finding the y-intercept", "Using the range first", "Factoring the denominator"], "Brackets are needed around a negative input.", "f(x)=x^2+2x,\\quad f(-3)"),
      ],
      masteryQuizPool: [
        { id: "y11adv-func-exam-p1", prompt: "Evaluate the displayed function.", latex: "f(x)=2x^2-3x+1,\\quad f(-2)", answer: "15", difficulty: 1, acceptedAnswers: ["f(-2)=15"], hint: "Use brackets.", explanation: "$2(4)+6+1=15$." },
        { id: "y11adv-func-exam-p2", prompt: "Evaluate the displayed function.", latex: "f(x)=x^2-4x+2,\\quad f(-1)", answer: "7", difficulty: 1, acceptedAnswers: ["f(-1)=7"], hint: "Use brackets.", explanation: "$1+4+2=7$." },
        { id: "y11adv-func-exam-p3", prompt: "For the displayed reciprocal function, enter the excluded x-value.", latex: "g(x)=\\frac{1}{x-4},\\quad x-4\\ne0", answer: "4", difficulty: 1, acceptedAnswers: ["x=4"], hint: "Denominator zero.", explanation: "$x=4$." },
        { id: "y11adv-func-exam-p4", prompt: "For the displayed reciprocal function, enter the excluded x-value.", latex: "g(x)=\\frac{1}{x+5},\\quad x+5\\ne0", answer: "-5", difficulty: 1, acceptedAnswers: ["-5", "−5", "x=-5"], hint: "Denominator zero.", explanation: "$x=-5$." },
        { id: "y11adv-func-exam-p5", prompt: "For the displayed function, enter the larger zero.", latex: "f(x)=(x+1)(x-5),\\quad =0", answer: "5", difficulty: 2, acceptedAnswers: ["x=5"], hint: "Each factor gives a zero.", explanation: "Zeros $-1,5$; larger is $5$." },
        { id: "y11adv-func-exam-p6", prompt: "For the displayed function, enter the negative zero.", latex: "f(x)=(x-2)(x+7),\\quad =0", answer: "-7", difficulty: 2, acceptedAnswers: ["-7", "−7", "x=-7"], hint: "Each factor gives a zero.", explanation: "Zeros $2,-7$; negative is $-7$." },
        { id: "y11adv-func-exam-p7", prompt: "Evaluate the displayed function.", latex: "p(x)=3x^2+2x,\\quad p(-2)", answer: "8", difficulty: 2, acceptedAnswers: ["p(-2)=8"], hint: "Use brackets.", explanation: "$3(4)-4=12-4=8$." },
        { id: "y11adv-func-exam-p8", prompt: "For the displayed reciprocal function, enter the vertical asymptote.", latex: "y=\\frac{1}{x-4}+1,\\quad x-4=0", answer: "x=4", difficulty: 2, acceptedAnswers: ["4"], hint: "Denominator zero.", explanation: "$x=4$." },
        { id: "y11adv-func-exam-p9", prompt: "For the displayed reciprocal function, enter the horizontal asymptote.", latex: "y=\\frac{1}{x+3}-2", answer: "y=-2", difficulty: 2, acceptedAnswers: ["-2", "−2"], hint: "The vertical shift.", explanation: "$y=-2$." },
        { id: "y11adv-func-exam-p10", prompt: "A function has zeros at $-2$ and $3$. Which expression could represent it?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$(x-2)(x-3)$" }, { label: "B", text: "$(x+2)(x-3)$" }, { label: "C", text: "$(x-2)(x+3)$" }, { label: "D", text: "$\\frac{1}{x-3}$" }], hint: "Zero $r$ gives factor $x-r$.", explanation: "Zeros $-2,3$ give $(x+2)(x-3)$." },
        { id: "y11adv-func-exam-p11", prompt: "For the displayed square-root function, which domain is correct?", latex: "h(x)=\\sqrt{x+6}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$x\\ge -6$" }, { label: "B", text: "$x\\le -6$" }, { label: "C", text: "$x\\ne -6$" }, { label: "D", text: "$x\\ge 6$" }], hint: "Inside the root $\\ge 0$.", explanation: "$x+6\\ge 0$ gives $x\\ge -6$." },
        { id: "y11adv-func-exam-p12", prompt: "A cubic has zeros at $-2,1,4$. Which expression could represent it?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$(x-2)(x+1)(x+4)$" }, { label: "B", text: "$(x+2)(x-1)(x-4)$" }, { label: "C", text: "$(x+2)(x+1)(x-4)$" }, { label: "D", text: "$x^2-3x+2$" }], hint: "Use $x-r$ for each zero.", explanation: "Zeros $-2,1,4$ give $(x+2)(x-1)(x-4)$." },
        { id: "y11adv-func-exam-p13", prompt: "For the displayed reciprocal function, enter the horizontal asymptote.", latex: "y=\\frac{1}{x+3}-2", answer: "y=-2", difficulty: 3, acceptedAnswers: ["-2", "−2"], hint: "The vertical shift.", explanation: "$y=-2$." },
        { id: "y11adv-func-exam-p14", prompt: "The factor $x-6$ gives which x-intercept?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$(-6,0)$" }, { label: "B", text: "$(0,6)$" }, { label: "C", text: "$(6,0)$" }, { label: "D", text: "$(0,-6)$" }], hint: "Set $x-6=0$.", explanation: "$x=6$ gives $(6,0)$." },
        { id: "y11adv-func-exam-p15", prompt: "For the displayed function, enter the positive x-intercept.", latex: "f(x)=-x^2+9,\\quad =0", answer: "3", difficulty: 3, acceptedAnswers: ["x=3", "(3,0)"], hint: "$x^2=9$.", explanation: "$x=\\pm 3$; positive is $3$." },
        { id: "y11adv-func-exam-p16", prompt: "A table lists inputs $-1,0,1$ and outputs $2,5,10$. Which set is the domain?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$\\{2,5,10\\}$" }, { label: "B", text: "$\\{-1,2,5\\}$" }, { label: "C", text: "$\\{0,5,10\\}$" }, { label: "D", text: "$\\{-1,0,1\\}$" }], hint: "Domain is inputs.", explanation: "Inputs are $\\{-1,0,1\\}$." },
        { id: "y11adv-func-exam-p17", prompt: "Which common error changes the value of the displayed function for the negative input?", latex: "f(x)=x^2+2x,\\quad f(-3)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Writing $-3^2$ instead of $(-3)^2$" }, { label: "B", text: "Finding the y-intercept" }, { label: "C", text: "Using the range first" }, { label: "D", text: "Factoring the denominator" }], hint: "Brackets matter.", explanation: "Without brackets $-3^2=-9$ instead of $9$." },
        { id: "y11adv-func-exam-p18", prompt: "Evaluate the displayed function.", latex: "f(x)=x^2+2x,\\quad f(-3)", answer: "3", difficulty: 3, hint: "Use brackets.", explanation: "$(-3)^2+2(-3)=9-6=3$." },
        { id: "y11adv-func-exam-p19", prompt: "For the displayed function, enter the smaller zero.", latex: "f(x)=x^2-x-12,\\quad =0", answer: "-3", difficulty: 4, acceptedAnswers: ["-3", "−3", "x=-3"], hint: "Factorise to $(x-4)(x+3)$.", explanation: "Zeros $4,-3$; smaller is $-3$." },
        { id: "y11adv-func-exam-p20", prompt: "For the displayed reciprocal function, the graph cannot cross which line?", latex: "y=\\frac{1}{x-2}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$x=2$" }, { label: "B", text: "$x=-2$" }, { label: "C", text: "$y=2$" }, { label: "D", text: "$x=0$" }], hint: "The vertical asymptote.", explanation: "$x=2$ is the vertical asymptote." },
        { id: "y11adv-func-exam-p21", prompt: "A graph has lowest output $-3$ and rises without bound. Which range is correct?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$x\\ge -3$" }, { label: "B", text: "$y\\le -3$" }, { label: "C", text: "$x\\ne -3$" }, { label: "D", text: "$y\\ge -3$" }], hint: "Range uses $y$.", explanation: "$y\\ge -3$." },
        { id: "y11adv-func-exam-p22", prompt: "Evaluate the displayed function.", latex: "f(x)=2x^2-3x+1,\\quad f(-1)", answer: "6", difficulty: 2, hint: "Use brackets.", explanation: "$2+3+1=6$." },
        { id: "y11adv-func-exam-p23", prompt: "For the displayed square-root function, give the smallest domain value.", latex: "h(x)=\\sqrt{2x-8}", answer: "4", difficulty: 4, acceptedAnswers: ["x=4"], hint: "Need $2x-8\\ge 0$.", explanation: "$2x-8\\ge 0$ gives $x\\ge 4$." },
        { id: "y11adv-func-exam-p24", prompt: "For $f(x)=(x-3)(x+2)$, enter $f(0)$.", latex: "f(x)=(x-3)(x+2),\\quad x=0", answer: "-6", difficulty: 4, acceptedAnswers: ["-6", "−6"], hint: "Multiply factors at $x=0$.", explanation: "$(-3)(2)=-6$." },
        { id: "y11adv-func-exam-p25", prompt: "A reciprocal graph has vertical asymptote $x=-1$ and horizontal asymptote $y=4$. Which equation matches?", latex: "\\text{Choose one}", answer: "B", difficulty: 5, choices: [{ label: "A", text: "$\\frac{1}{x-1}+4$" }, { label: "B", text: "$\\frac{1}{x+1}+4$" }, { label: "C", text: "$\\frac{1}{x+1}-4$" }, { label: "D", text: "$\\frac{1}{x-4}+1$" }], hint: "Denominator gives vertical; shift gives horizontal.", explanation: "$x+1=0$ gives $x=-1$; $+4$ gives $y=4$." },
        { id: "y11adv-func-exam-p26", prompt: "For $f(x)=2x^2-3x+1$, find $f(2)-f(0)$.", latex: "f(x)=2x^2-3x+1", answer: "2", difficulty: 5, hint: "Evaluate each, then subtract.", explanation: "$f(2)=8-6+1=3$ and $f(0)=1$; $3-1=2$." },
        { id: "y11adv-func-exam-p27", prompt: "A cubic with zeros $-1,2,3$ has y-intercept value:", latex: "f(x)=(x+1)(x-2)(x-3),\\quad x=0", answer: "6", difficulty: 5, hint: "Substitute $x=0$ into each factor.", explanation: "$(0+1)(0-2)(0-3)=(1)(-2)(-3)=6$." },
        { id: "y11adv-func-exam-p28", prompt: "For $g(x)=\\frac{x-1}{x+2}$, enter the excluded x-value.", latex: "g(x)=\\frac{x-1}{x+2}", answer: "-2", difficulty: 4, acceptedAnswers: ["-2", "−2", "x=-2"], hint: "Only the denominator matters.", explanation: "$x+2=0$ gives $x=-2$." },
        { id: "y11adv-func-exam-p29", prompt: "A parabola has x-intercepts $-1$ and $7$. Enter the x-coordinate of its axis of symmetry.", latex: "\\text{midpoint of }-1\\text{ and }7", answer: "3", difficulty: 5, hint: "Average the intercepts.", explanation: "$\\frac{-1+7}{2}=3$." },
        { id: "y11adv-func-exam-p30", prompt: "For $g(x)=\\frac{1}{x-h}$ with excluded value $x=8$, find $h$.", latex: "g(x)=\\frac{1}{x-h},\\quad x=8", answer: "8", difficulty: 5, hint: "Excluded value is $x=h$.", explanation: "$h=8$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-func-exam-mp1",
          prompt: "Consider $f(x)=x^2-2x-3$ and the reciprocal $g(x)=\\frac{1}{x-3}$.",
          latex: "f(x)=x^2-2x-3,\\quad g(x)=\\frac{1}{x-3}",
          answer: "-1",
          hint: "For (a) factorise $f$. For (b) take the larger root. For (c) find where $g$ is undefined.",
          explanation: "(a) Smaller zero $-1$. (b) Larger zero $3$. (c) $g$ is undefined at $x=3$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the smaller zero of $f(x)=0$.", marks: 2, answer: "-1", acceptedAnswers: ["-1", "−1", "x=-1"], hint: "Factorise to $(x-3)(x+1)$.", explanation: "$(x-3)(x+1)=0$ gives $3,-1$; smaller is $-1$." },
            { key: "b", label: "(b)", prompt: "Find the larger zero of $f(x)=0$.", marks: 1, answer: "3", acceptedAnswers: ["x=3"], hint: "The other factor.", explanation: "Larger zero is $3$." },
            { key: "c", label: "(c)", prompt: "Enter the x-value excluded from the domain of $g$.", marks: 1, answer: "3", acceptedAnswers: ["x=3"], hint: "Denominator zero.", explanation: "$x-3=0$ gives $x=3$." },
          ],
        },
      ],
    };
  }

  // ─── FA1 new lessons ────────────────────────────────────────────────────────

  if (lesson.slug === "algebraic-techniques") {
    return {
      ...base,
      description:
        "Apply index laws to positive, negative, zero and fractional indices; expand and simplify algebraic expressions; simplify algebraic fractions; expand and simplify surds; rationalise denominators using conjugates.",
      learningIntention:
        "Use index laws, surd laws and conjugate rationalisation to simplify algebraic expressions accurately.",
      successCriteria: [
        "Apply the index multiplication, division and power laws to simplify expressions.",
        "Evaluate expressions with zero, negative and fractional indices.",
        "Expand and simplify surd expressions by identifying like surd terms.",
        "Rationalise a denominator of the form 1/(√a ± √b) using the conjugate.",
      ],
      teaching: {
        paragraphs: [
          "Index laws tell you what happens when you multiply, divide or raise powers of the same base. The key idea is that an exponent is just counting how many times the base is multiplied. So $a^3 × a^2 = a^{3+2} = a^5$ — the five multiplications are added together.",
          "Negative and zero indices extend the pattern. $a^0 = 1$ for any non-zero base because dividing $a^n$ by $a^n$ gives 1. $a^{−n} = 1/a^n$ because it reverses the multiplication: $a^3 × a^{−3} = a^0 = 1$, so $a^{−3} = 1/a^3$.",
          "Surds are square roots that cannot be simplified to a whole number, such as √3 or √5. Like surds — those with the same number under the root — can be added or subtracted. For example, 2√3 + 5√3 = 7√3, just like 2x + 5x = 7x. Unlike surds such as √3 and √5 cannot be combined directly.",
          "To rationalise 1/(√a + √b), multiply the numerator and denominator by the conjugate (√a − √b). The denominator becomes (√a + √b)(√a − √b) = a − b, which is rational. Expand the numerator carefully and simplify.",
        ],
        latexBlocks: [
          "a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n}, \\quad (a^m)^n = a^{mn}",
          "a^0 = 1, \\quad a^{-n} = \\frac{1}{a^n}, \\quad a^{1/n} = \\sqrt[n]{a}",
          "\\frac{1}{\\sqrt{a}+\\sqrt{b}} = \\frac{\\sqrt{a}-\\sqrt{b}}{a-b} \\quad \\text{(conjugate rationalisation)}",
        ],
      },
      workedExamples: [
        {
          title: "Simplify using index laws",
          questionLatex: "\\text{Simplify } x^5 \\cdot x^{-3}",
          steps: [
            {
              explanation: "When multiplying same-base powers, add the indices.",
              latex: "x^5 \\cdot x^{-3} = x^{5+(-3)}",
            },
            {
              explanation: "Evaluate the sum of the indices.",
              latex: "x^{5-3} = x^2",
            },
          ],
          finalAnswerLatex: "x^2",
        },
        {
          title: "Expand and simplify a surd product",
          questionLatex: "\\text{Expand and simplify } (2+\\sqrt{3})(1-\\sqrt{3})",
          steps: [
            {
              explanation: "Expand each pair of terms using the distributive law.",
              latex: "2(1) + 2(-\\sqrt{3}) + \\sqrt{3}(1) + \\sqrt{3}(-\\sqrt{3})",
            },
            {
              explanation: "Simplify: (√3)² = 3 and collect rational and surd terms.",
              latex: "2 - 2\\sqrt{3} + \\sqrt{3} - 3 = -1 - \\sqrt{3}",
            },
          ],
          finalAnswerLatex: "-1 - \\sqrt{3}",
        },
        {
          title: "Rationalise a denominator using the conjugate",
          questionLatex: "\\text{Simplify } \\frac{1}{1+\\sqrt{5}}",
          steps: [
            {
              explanation: "Multiply numerator and denominator by the conjugate of the denominator.",
              latex: "\\frac{1}{1+\\sqrt{5}} \\times \\frac{1-\\sqrt{5}}{1-\\sqrt{5}}",
            },
            {
              explanation: "The denominator becomes (1)² − (√5)² = 1 − 5 = −4.",
              latex: "\\frac{1-\\sqrt{5}}{-4}",
            },
            {
              explanation: "Divide every term in the numerator by −4.",
              latex: "\\frac{\\sqrt{5}-1}{4}",
            },
          ],
          finalAnswerLatex: "\\frac{\\sqrt{5}-1}{4}",
        },
      ],
      guidedPractice: [
        qa("y11adv-alg-g1", "Simplify the expression using the index multiplication law.", "x^5 \\cdot x^{-3}", "x^2", "Add the indices: 5 + (−3).", "Multiplying same-base powers adds the indices: $x^5 · x^{−3} = x^{5+(−3)} = x^2$.", ["x^(2)"]),
        qa("y11adv-alg-g2", "Simplify the expression using the index power law.", "(a^2)^3", "a^6", "Multiply the indices: 2 × 3.", "Raising a power to a power multiplies the indices: $(a^2)^3 = a^{2×3} = a^6$.", ["a^(6)"]),
        practicalChoice("y11adv-alg-g3", "Which expression correctly simplifies $\\sqrt{12} + \\sqrt{3}$?", "C", ["$\\sqrt{15}$", "$2\\sqrt{3}$", "$3\\sqrt{3}$", "$\\sqrt{15+3}$"], "√12 = 2√3, so √12 + √3 = 2√3 + √3 = 3√3. Unlike surds cannot be combined under one root."),
        qa("y11adv-alg-g4", "Simplify $\\sqrt{12} + \\sqrt{3}$ to the form $a\\sqrt{3}$. What is $a$?", "\\sqrt{12} + \\sqrt{3} = a\\sqrt{3}", "3", "Write √12 as a multiple of √3 first: √12 = 2√3.", "√12 = √(4×3) = 2√3. So 2√3 + √3 = 3√3. The coefficient a = 3."),
      ],
      independentPractice: [
        qa("y11adv-alg-i1", "Simplify $x^0 \\cdot x^4$.", "x^0 \\cdot x^4", "x^4", "Any base to the power 0 equals 1.", "x^0 = 1, so x^0 · x^4 = 1 · x^4 = x^4.", ["x^(4)"]),
        qa("y11adv-alg-i2", "Expand $(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})$.", "(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})", "2", "Use the difference of two squares: (a+b)(a−b) = a² − b².", "(√5 + √3)(√5 − √3) = (√5)² − (√3)² = 5 − 3 = 2."),
        qa("y11adv-alg-i3", "Evaluate $8^{2/3}$.", "8^{2/3}", "4", "Write as $(8^{1/3})^2$ and find the cube root first.", "$8^{1/3}$ = ∛8 = 2, so $8^{2/3} = (8^{1/3})^2 = 2^2 = 4$."),
        practicalChoice("y11adv-alg-i4", "Simplify $3\\sqrt{2} \\times 2\\sqrt{2}$.", "C", ["$5\\sqrt{2}$", "$5\\sqrt{4}$", "$12$", "$6\\sqrt{2}$"], "Multiply integer parts (3 × 2 = 6) and surd parts (√2 × √2 = 2) separately: 6 × 2 = 12."),
        qa("y11adv-alg-i5", "Simplify $2\\sqrt{18}$ to the form $a\\sqrt{2}$. What is $a$?", "2\\sqrt{18} = a\\sqrt{2}", "6", "Write 18 = 9 × 2 to extract the perfect-square factor.", "√18 = √(9×2) = 3√2, so 2√18 = 2 × 3√2 = 6√2. The coefficient a = 6."),
      ],
      commonMistakes: [
        { mistake: "Adding indices when the bases are different (e.g., x² · y³ = xy⁵).", fix: "Index laws only apply when the bases are identical. x² · y³ cannot be simplified further." },
        { mistake: "Writing a^{−n} as −a^n instead of 1/a^n.", fix: "A negative index means the reciprocal, not a negative sign: a^{−n} = 1/a^n." },
        { mistake: "Adding unlike surds (e.g., √3 + √5 = √8).", fix: "Surds can only be added when they have the same value under the root, like 2√3 + 5√3 = 7√3." },
        { mistake: "Forgetting to apply the index to the coefficient in (2x³)², writing x^6 instead of 4x^6.", fix: "The index outside the bracket applies to every factor inside: (2x³)² = 2² · (x³)² = 4x^6." },
      ],
      masteryQuiz: [
        qa("y11adv-alg-m1", "Simplify $x^4 \\div x^{-2}$.", "x^4 \\div x^{-2}", "x^6", "Subtract indices when dividing: 4 − (−2).", "Dividing same-base powers subtracts indices: $x^4 ÷ x^{−2} = x^{4−(−2)} = x^6$.", ["x^(6)"]),
        qa("y11adv-alg-m2", "Evaluate $27^{1/3}$.", "27^{1/3}", "3", "$27^{1/3}$ is the cube root of 27.", "$27^{1/3}$ = ∛27 = 3, since 3³ = 27."),
        practicalChoice("y11adv-alg-m3", "Which expression is equal to $x^{-3}$?", "B", ["$x^3$", "$\\frac{1}{x^3}$", "$-x^3$", "$\\frac{3}{x}$"], "A negative index means the reciprocal: $x^{−3} = 1/x^3$."),
        qa("y11adv-alg-m4", "In the expansion $(1+\\sqrt{3})^2 = a + b\\sqrt{3}$, find $a$.", "(1+\\sqrt{3})^2 = a+b\\sqrt{3}", "4", "Expand using (p+q)² = p² + 2pq + q².", "(1+√3)² = 1 + 2√3 + (√3)² = 1 + 2√3 + 3 = 4 + 2√3. So a = 4."),
        qa("y11adv-alg-m5", "Simplify $\\sqrt{50} - \\sqrt{8}$ to the form $a\\sqrt{2}$. What is $a$?", "\\sqrt{50} - \\sqrt{8} = a\\sqrt{2}", "3", "√50 = 5√2, √8 = 2√2.", "√50 = √(25×2) = 5√2. √8 = √(4×2) = 2√2. 5√2 − 2√2 = 3√2. Coefficient a = 3."),
        practicalChoice("y11adv-alg-m6", "To rationalise $\\frac{1}{\\sqrt{5}-1}$, you multiply top and bottom by:", "B", ["$\\sqrt{5}-1$", "$\\sqrt{5}+1$", "$\\sqrt{5}-2$", "$\\frac{1}{\\sqrt{5}}$"], "The conjugate of (√5 − 1) is (√5 + 1). Their product is (√5)² − 1² = 4, which is rational."),
        qa("y11adv-alg-m7", "Simplify $(2x^3)^2$.", "(2x^3)^2", "4x^6", "Apply the index to both 2 and x³: 2² = 4, (x³)² = x^6.", "(2x³)² = 2² · (x³)² = 4x^6.", ["4x^(6)"]),
        qa("y11adv-alg-m8", "Simplify $(2\\sqrt{3})(3\\sqrt{3})$.", "(2\\sqrt{3})(3\\sqrt{3})", "18", "Multiply integer parts and surd parts separately.", "(2×3)(√3×√3) = 6 × 3 = 18."),
        qa("y11adv-alg-m9", "Simplify $x^{1/2} \\cdot x^{3/2}$.", "x^{1/2} \\cdot x^{3/2}", "x^2", "Add fractional indices: 1/2 + 3/2 = 2.", "x^{1/2} · x^{3/2} = x^{1/2 + 3/2} = x^{4/2} = x^2.", ["x^(2)"]),
        practicalChoice("y11adv-alg-m10", "Evaluate $16^{3/4}$.", "B", ["$4$", "$8$", "$12$", "$64$"], "16^{1/4} = ∜16 = 2 (since 2^4 = 16), so 16^{3/4} = (16^{1/4})^3 = 2^3 = 8.", "16^{3/4}"),
      ],
      masteryQuizPool: [
        { id: "y11adv-alg-p1", prompt: "Simplify the expression using the index multiplication law.", latex: "x^5 \\cdot x^{-3}", answer: "x^2", difficulty: 1, acceptedAnswers: ["x^(2)"], hint: "Add the indices.", explanation: "$x^{5+(-3)}=x^2$." },
        { id: "y11adv-alg-p2", prompt: "Simplify the expression using the power law.", latex: "(a^2)^3", answer: "a^6", difficulty: 1, acceptedAnswers: ["a^(6)"], hint: "Multiply the indices.", explanation: "$(a^2)^3=a^{6}$." },
        { id: "y11adv-alg-p3", prompt: "Simplify the expression.", latex: "x^0 \\cdot x^4", answer: "x^4", difficulty: 1, acceptedAnswers: ["x^(4)"], hint: "$x^0=1$.", explanation: "$1\\cdot x^4=x^4$." },
        { id: "y11adv-alg-p4", prompt: "Evaluate the expression.", latex: "27^{1/3}", answer: "3", difficulty: 1, hint: "Cube root.", explanation: "$\\sqrt[3]{27}=3$." },
        { id: "y11adv-alg-p5", prompt: "Simplify the expression.", latex: "x^4 \\div x^{-2}", answer: "x^6", difficulty: 2, acceptedAnswers: ["x^(6)"], hint: "Subtract the indices.", explanation: "$x^{4-(-2)}=x^6$." },
        { id: "y11adv-alg-p6", prompt: "Evaluate the expression.", latex: "8^{2/3}", answer: "4", difficulty: 2, hint: "Cube root, then square.", explanation: "$(\\sqrt[3]{8})^2=2^2=4$." },
        { id: "y11adv-alg-p7", prompt: "Which expression is equal to $x^{-3}$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$x^3$" }, { label: "B", text: "$\\frac{1}{x^3}$" }, { label: "C", text: "$-x^3$" }, { label: "D", text: "$\\frac{3}{x}$" }], hint: "Negative index means reciprocal.", explanation: "$x^{-3}=\\frac{1}{x^3}$." },
        { id: "y11adv-alg-p8", prompt: "Simplify $\\sqrt{12}+\\sqrt{3}$ to the form $a\\sqrt{3}$. Enter $a$.", latex: "\\sqrt{12}+\\sqrt{3}=a\\sqrt{3}", answer: "3", difficulty: 2, hint: "$\\sqrt{12}=2\\sqrt{3}$.", explanation: "$2\\sqrt{3}+\\sqrt{3}=3\\sqrt{3}$, so $a=3$." },
        { id: "y11adv-alg-p9", prompt: "Simplify $2\\sqrt{18}$ to the form $a\\sqrt{2}$. Enter $a$.", latex: "2\\sqrt{18}=a\\sqrt{2}", answer: "6", difficulty: 2, hint: "$\\sqrt{18}=3\\sqrt{2}$.", explanation: "$2\\times 3\\sqrt{2}=6\\sqrt{2}$, so $a=6$." },
        { id: "y11adv-alg-p10", prompt: "Expand $(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})$.", latex: "(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})", answer: "2", difficulty: 2, hint: "Difference of two squares.", explanation: "$(\\sqrt{5})^2-(\\sqrt{3})^2=5-3=2$." },
        { id: "y11adv-alg-p11", prompt: "Simplify $3\\sqrt{2}\\times 2\\sqrt{2}$.", latex: "3\\sqrt{2}\\times 2\\sqrt{2}", answer: "12", difficulty: 2, hint: "Multiply integer and surd parts.", explanation: "$6\\times 2=12$." },
        { id: "y11adv-alg-p12", prompt: "Simplify $(2\\sqrt{3})(3\\sqrt{3})$.", latex: "(2\\sqrt{3})(3\\sqrt{3})", answer: "18", difficulty: 2, hint: "Integer parts times surd parts.", explanation: "$6\\times 3=18$." },
        { id: "y11adv-alg-p13", prompt: "Simplify $x^{1/2}\\cdot x^{3/2}$.", latex: "x^{1/2}\\cdot x^{3/2}", answer: "x^2", difficulty: 3, acceptedAnswers: ["x^(2)"], hint: "Add fractional indices.", explanation: "$x^{1/2+3/2}=x^2$." },
        { id: "y11adv-alg-p14", prompt: "Simplify $(2x^3)^2$.", latex: "(2x^3)^2", answer: "4x^6", difficulty: 3, acceptedAnswers: ["4x^(6)"], hint: "Apply the index to both factors.", explanation: "$2^2(x^3)^2=4x^6$." },
        { id: "y11adv-alg-p15", prompt: "Simplify $\\sqrt{50}-\\sqrt{8}$ to the form $a\\sqrt{2}$. Enter $a$.", latex: "\\sqrt{50}-\\sqrt{8}=a\\sqrt{2}", answer: "3", difficulty: 3, hint: "$\\sqrt{50}=5\\sqrt{2}$, $\\sqrt{8}=2\\sqrt{2}$.", explanation: "$5\\sqrt{2}-2\\sqrt{2}=3\\sqrt{2}$, so $a=3$." },
        { id: "y11adv-alg-p16", prompt: "In the expansion $(1+\\sqrt{3})^2=a+b\\sqrt{3}$, find $a$.", latex: "(1+\\sqrt{3})^2=a+b\\sqrt{3}", answer: "4", difficulty: 3, hint: "Use $(p+q)^2$.", explanation: "$1+2\\sqrt{3}+3=4+2\\sqrt{3}$, so $a=4$." },
        { id: "y11adv-alg-p17", prompt: "To rationalise $\\frac{1}{\\sqrt{5}-1}$, multiply top and bottom by:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\sqrt{5}-1$" }, { label: "B", text: "$\\sqrt{5}+1$" }, { label: "C", text: "$\\sqrt{5}-2$" }, { label: "D", text: "$\\frac{1}{\\sqrt{5}}$" }], hint: "Use the conjugate.", explanation: "The conjugate of $\\sqrt{5}-1$ is $\\sqrt{5}+1$." },
        { id: "y11adv-alg-p18", prompt: "Evaluate $16^{3/4}$.", latex: "16^{3/4}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$4$" }, { label: "B", text: "$8$" }, { label: "C", text: "$12$" }, { label: "D", text: "$64$" }], hint: "Fourth root, then cube.", explanation: "$(16^{1/4})^3=2^3=8$, which is option B." },
        { id: "y11adv-alg-p19", prompt: "Evaluate the expression.", latex: "5^0", answer: "1", difficulty: 1, hint: "Any non-zero base to power 0.", explanation: "$5^0=1$." },
        { id: "y11adv-alg-p20", prompt: "Evaluate the expression.", latex: "2^{-3}", answer: "1/8", difficulty: 2, acceptedAnswers: ["0.125", "1/8"], hint: "Negative index is the reciprocal.", explanation: "$2^{-3}=\\frac{1}{2^3}=\\frac{1}{8}$." },
        { id: "y11adv-alg-p21", prompt: "Simplify $\\frac{x^7}{x^2}$.", latex: "\\frac{x^7}{x^2}", answer: "x^5", difficulty: 2, acceptedAnswers: ["x^(5)"], hint: "Subtract the indices.", explanation: "$x^{7-2}=x^5$." },
        { id: "y11adv-alg-p22", prompt: "In $(2-\\sqrt{3})(1-\\sqrt{3})$, enter the rational part of the answer.", latex: "(2-\\sqrt{3})(1-\\sqrt{3})", answer: "5", difficulty: 4, hint: "Expand: $2-2\\sqrt{3}-\\sqrt{3}+3$.", explanation: "$2+3-3\\sqrt{3}=5-3\\sqrt{3}$; rational part is $5$." },
        { id: "y11adv-alg-p23", prompt: "Rationalise $\\frac{1}{1+\\sqrt{5}}$. The result is $\\frac{\\sqrt{5}-1}{c}$. Enter $c$.", latex: "\\frac{1}{1+\\sqrt{5}}=\\frac{\\sqrt{5}-1}{c}", answer: "4", difficulty: 4, hint: "Denominator becomes $1-5=-4$, then simplify signs.", explanation: "Multiplying by the conjugate gives $\\frac{1-\\sqrt{5}}{-4}=\\frac{\\sqrt{5}-1}{4}$, so $c=4$." },
        { id: "y11adv-alg-p24", prompt: "Evaluate $9^{3/2}$.", latex: "9^{3/2}", answer: "27", difficulty: 4, hint: "Square root, then cube.", explanation: "$(\\sqrt{9})^3=3^3=27$." },
        { id: "y11adv-alg-p25", prompt: "Simplify $\\frac{(2x^2)^3}{4x}$. Enter the coefficient.", latex: "\\frac{(2x^2)^3}{4x}", answer: "2", difficulty: 5, hint: "Expand the top: $8x^6$.", explanation: "$(2x^2)^3=8x^6$; $\\frac{8x^6}{4x}=2x^5$; coefficient is $2$." },
        { id: "y11adv-alg-p26", prompt: "Simplify $\\frac{(2x^2)^3}{4x}$. Enter the power of $x$.", latex: "\\frac{(2x^2)^3}{4x}", answer: "5", difficulty: 5, hint: "$8x^6\\div 4x$.", explanation: "$\\frac{8x^6}{4x}=2x^5$; power is $5$." },
        { id: "y11adv-alg-p27", prompt: "In $(3+2\\sqrt{2})^2=a+b\\sqrt{2}$, find $a$.", latex: "(3+2\\sqrt{2})^2=a+b\\sqrt{2}", answer: "17", difficulty: 5, hint: "Use $(p+q)^2$ with $q=2\\sqrt{2}$.", explanation: "$9+12\\sqrt{2}+8=17+12\\sqrt{2}$, so $a=17$." },
        { id: "y11adv-alg-p28", prompt: "In $(3+2\\sqrt{2})^2=a+b\\sqrt{2}$, find $b$.", latex: "(3+2\\sqrt{2})^2=a+b\\sqrt{2}", answer: "12", difficulty: 5, hint: "The middle term is $2\\times 3\\times 2\\sqrt{2}$.", explanation: "$2(3)(2\\sqrt{2})=12\\sqrt{2}$, so $b=12$." },
        { id: "y11adv-alg-p29", prompt: "Rationalise $\\frac{6}{\\sqrt{3}}$ to the form $a\\sqrt{3}$. Enter $a$.", latex: "\\frac{6}{\\sqrt{3}}=a\\sqrt{3}", answer: "2", difficulty: 4, hint: "Multiply top and bottom by $\\sqrt{3}$.", explanation: "$\\frac{6\\sqrt{3}}{3}=2\\sqrt{3}$, so $a=2$." },
        { id: "y11adv-alg-p30", prompt: "Evaluate $\\left(\\frac{1}{4}\\right)^{-1/2}$.", latex: "\\left(\\frac{1}{4}\\right)^{-1/2}", answer: "2", difficulty: 5, hint: "Negative index flips; the half is a root.", explanation: "$\\left(\\frac{1}{4}\\right)^{-1/2}=4^{1/2}=2$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-alg-mp1",
          prompt: "Consider the surd expression $(2+\\sqrt{3})^2$, which expands to the form $a+b\\sqrt{3}$.",
          latex: "(2+\\sqrt{3})^2=a+b\\sqrt{3}",
          answer: "7",
          hint: "For (a) and (b) expand using $(p+q)^2=p^2+2pq+q^2$. For (c) multiply your $a$ and $b$.",
          explanation: "(a) $a=7$ (from $4+3$). (b) $b=4$ (from $2\\times 2\\times \\sqrt{3}$). (c) $a\\times b=28$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the rational part $a$.", marks: 2, answer: "7", hint: "$2^2+(\\sqrt{3})^2=4+3$.", explanation: "$(2+\\sqrt{3})^2=4+4\\sqrt{3}+3=7+4\\sqrt{3}$, so $a=7$." },
            { key: "b", label: "(b)", prompt: "Find the surd coefficient $b$.", marks: 1, answer: "4", hint: "Middle term $2\\times 2\\times \\sqrt{3}$.", explanation: "The middle term is $4\\sqrt{3}$, so $b=4$." },
            { key: "c", label: "(c)", prompt: "Find the product $a\\times b$.", marks: 1, answer: "28", hint: "Multiply your two answers.", explanation: "$7\\times 4=28$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "quadratic-equations-discriminant") {
    return {
      ...base,
      description:
        "Solve quadratic equations by factorisation, completing the square and the quadratic formula; define and evaluate the discriminant; use conditions on the discriminant to determine the nature of roots.",
      learningIntention:
        "Solve any quadratic equation and use the discriminant to predict whether roots are real, repeated or complex without solving.",
      successCriteria: [
        "Solve a quadratic by factorisation when integer factors exist.",
        "Apply the quadratic formula to solve any quadratic equation.",
        "Calculate the discriminant Δ = b² − 4ac from the equation ax² + bx + c = 0.",
        "Interpret Δ to state whether roots are two distinct real, one repeated, or no real solutions.",
      ],
      teaching: {
        paragraphs: [
          "A quadratic equation is any equation that can be written as ax² + bx + c = 0. Three methods exist: factorisation (fastest when integer factors exist), completing the square (always works and reveals the vertex form), and the quadratic formula (always works and is most direct).",
          "Factorisation: find two numbers that multiply to ac and add to b. Rewrite the middle term bx as the sum of those two numbers times x, then factor by grouping. For example, x² − 5x + 6 = 0 factors as (x−2)(x−3) = 0, giving x = 2 or x = 3.",
          "The quadratic formula always works: x = (−b ± √(b²−4ac)) / (2a). The expression under the root, b² − 4ac, is called the discriminant and written Δ. It controls how many real solutions exist without you needing to solve completely.",
          "If Δ > 0, the ± produces two distinct real roots. If Δ = 0, the ± vanishes and there is one repeated root x = −b/(2a). If Δ < 0, the square root is imaginary and there are no real roots.",
        ],
        latexBlocks: [
          "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          "\\Delta = b^2 - 4ac",
          "\\Delta > 0: \\text{ two distinct real roots}, \\quad \\Delta = 0: \\text{ one repeated root}, \\quad \\Delta < 0: \\text{ no real roots}",
        ],
      },
      workedExamples: [
        {
          title: "Solve by factorisation",
          questionLatex: "\\text{Solve } x^2 - 5x + 6 = 0",
          steps: [
            {
              explanation: "Find two numbers that multiply to 6 and add to −5: they are −2 and −3.",
              latex: "(x-2)(x-3) = 0",
            },
            {
              explanation: "Set each factor equal to zero and solve.",
              latex: "x = 2 \\quad \\text{or} \\quad x = 3",
            },
          ],
          finalAnswerLatex: "x = 2 \\text{ or } x = 3",
        },
        {
          title: "Evaluate the discriminant and state the nature of roots",
          questionLatex: "\\text{Find } \\Delta \\text{ for } 2x^2 - 4x + 5 = 0",
          steps: [
            {
              explanation: "Identify a = 2, b = −4, c = 5.",
              latex: "\\Delta = (-4)^2 - 4(2)(5) = 16 - 40",
            },
            {
              explanation: "Since Δ < 0, there are no real roots.",
              latex: "\\Delta = -24",
            },
          ],
          finalAnswerLatex: "\\Delta = -24 \\Rightarrow \\text{no real roots}",
        },
        {
          title: "Solve using the quadratic formula",
          questionLatex: "\\text{Solve } x^2 + 2x - 3 = 0",
          steps: [
            {
              explanation: "Identify a = 1, b = 2, c = −3. Compute the discriminant.",
              latex: "\\Delta = 4 + 12 = 16",
            },
            {
              explanation: "Substitute into the formula.",
              latex: "x = \\frac{-2 \\pm \\sqrt{16}}{2} = \\frac{-2 \\pm 4}{2}",
            },
            {
              explanation: "Evaluate each sign option.",
              latex: "x = 1 \\quad \\text{or} \\quad x = -3",
            },
          ],
          finalAnswerLatex: "x = 1 \\text{ or } x = -3",
        },
      ],
      guidedPractice: [
        qa("y11adv-quad-g1", "Solve $x^2 - 7x + 12 = 0$ by factorisation. Enter the smaller root.", "x^2 - 7x + 12 = 0", "3", "Find two numbers that multiply to 12 and add to −7.", "(x−3)(x−4) = 0 gives x = 3 or x = 4. The smaller root is 3."),
        qa("y11adv-quad-g2", "Compute the discriminant for $3x^2 - 5x + 2 = 0$.", "\\Delta = b^2 - 4ac,\\quad a=3,\\,b=-5,\\,c=2", "1", "Δ = (−5)² − 4(3)(2) = 25 − 24.", "Δ = 25 − 24 = 1."),
        practicalChoice("y11adv-quad-g3", "What does $\\Delta = 0$ indicate about the roots of a quadratic?", "C", ["Two distinct rational roots", "Two distinct irrational roots", "One repeated root", "No real roots"], "When Δ = 0, the ± term vanishes and there is exactly one root value x = −b/(2a) — a repeated or double root."),
        qa("y11adv-quad-g4", "Solve $x^2 - 2x - 8 = 0$ using the quadratic formula. Enter the positive root.", "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a},\\quad a=1,\\,b=-2,\\,c=-8", "4", "Δ = 4 + 32 = 36. Then x = (2 ± 6)/2.", "Δ = 36. x = (2 ± 6)/2 gives x = 4 or x = −2. The positive root is 4."),
      ],
      independentPractice: [
        qa("y11adv-quad-i1", "Solve $x^2 + 5x + 4 = 0$ by factorisation. Enter the larger (less negative) root.", "x^2 + 5x + 4 = 0", "-1", "Find two numbers that multiply to 4 and add to 5.", "(x+1)(x+4) = 0 gives x = −1 or x = −4. The larger root is −1.", ["-1", "−1"]),
        practicalChoice("y11adv-quad-i2", "The discriminant of $x^2 + 2x + 5 = 0$ is $\\Delta = 4 - 20 = -16$. This means:", "D", ["Two distinct rational roots", "One repeated root", "Two distinct irrational roots", "No real roots"], "Δ < 0 means the square root in the formula is imaginary — there are no real solutions."),
        qa("y11adv-quad-i3", "Compute $\\Delta$ for $x^2 - 6x + 9 = 0$.", "\\Delta = b^2 - 4ac,\\quad a=1,\\,b=-6,\\,c=9", "0", "Δ = 36 − 36.", "Δ = (−6)² − 4(1)(9) = 36 − 36 = 0. One repeated root."),
        qa("y11adv-quad-i4", "Solve $2x^2 + x - 3 = 0$ by factorisation. Enter the positive root.", "2x^2 + x - 3 = 0", "1", "Try (2x + a)(x + b) where ab = −3.", "(2x + 3)(x − 1) = 0 gives x = −3/2 or x = 1. The positive root is 1."),
        practicalChoice("y11adv-quad-i5", "For the roots of a quadratic to be rational, the discriminant must be:", "C", ["Negative", "Zero only", "A perfect square and non-negative", "Any positive number"], "Rational roots require √Δ to be a whole number. Δ must be a non-negative perfect square (Δ = 0 gives a rational double root; a positive perfect square gives two rational roots)."),
      ],
      commonMistakes: [
        { mistake: "Writing b² + 4ac instead of b² − 4ac for the discriminant.", fix: "The discriminant formula uses subtraction: Δ = b² − 4ac. Write out a, b, c before substituting." },
        { mistake: "Assuming negative roots mean Δ is negative.", fix: "The sign of Δ tells you how many roots exist — not whether the roots are positive or negative." },
        { mistake: "Writing the formula as x = (b ± √Δ)/(2a) instead of x = (−b ± √Δ)/(2a).", fix: "The quadratic formula has −b, not b. Check the sign of b before substituting." },
        { mistake: "Concluding that a repeated root means x = 0.", fix: "A double root occurs at x = −b/(2a), which is rarely zero unless b = 0." },
      ],
      masteryQuiz: [
        qa("y11adv-quad-m1", "Solve $x^2 - x - 6 = 0$ by factorisation. Enter the positive root.", "x^2 - x - 6 = 0", "3", "Find two numbers that multiply to −6 and add to −1.", "(x−3)(x+2) = 0. Roots: x = 3 or x = −2. Positive root is 3."),
        qa("y11adv-quad-m2", "Compute $\\Delta$ for $2x^2 + 3x + 5 = 0$.", "\\Delta = b^2 - 4ac,\\quad a=2,\\,b=3,\\,c=5", "-31", "Δ = 9 − 40.", "Δ = 3² − 4(2)(5) = 9 − 40 = −31.", ["-31", "−31"]),
        practicalChoice("y11adv-quad-m3", "A discriminant of $-31$ indicates the quadratic has:", "D", ["Two distinct rational roots", "One repeated root", "Two distinct irrational roots", "No real roots"], "Δ < 0 means no real roots — the formula would require the square root of a negative number."),
        qa("y11adv-quad-m4", "Solve $x^2 - 4x + 4 = 0$. Enter the repeated root.", "x^2 - 4x + 4 = (x-2)^2 = 0", "2", "Δ = 0 means one repeated root.", "x² − 4x + 4 = (x−2)² = 0, giving the repeated root x = 2."),
        qa("y11adv-quad-m5", "Solve $x^2 + 2x - 3 = 0$ using the formula. Enter the positive root.", "x = \\frac{-2 \\pm \\sqrt{4+12}}{2}", "1", "Δ = 16. Then x = (−2 ± 4)/2.", "Δ = 16. x = (−2 + 4)/2 = 1 or x = (−2 − 4)/2 = −3. Positive root is 1."),
        practicalChoice("y11adv-quad-m6", "For $3x^2 + 2x - 1 = 0$, why are the roots rational?", "C", ["$\\Delta < 0$", "$\\Delta$ is a negative perfect square", "$\\Delta = 4 + 12 = 16$, a perfect square", "$\\Delta = 4 - 12 = -8$"], "Δ = 4 + 12 = 16 = 4². A non-negative perfect square discriminant guarantees rational roots."),
        practicalChoice("y11adv-quad-m7", "When $\\Delta > 0$ but is not a perfect square, the roots are:", "C", ["Rational", "Equal", "Two distinct irrational real numbers", "Imaginary"], "Δ > 0 guarantees two distinct real roots. If Δ is not a perfect square, √Δ is irrational, making both roots irrational."),
        qa("y11adv-quad-m8", "Compute $b^2 - 4ac$ for $x^2 - 6x + 9 = 0$.", "b^2 - 4ac,\\quad a=1,\\,b=-6,\\,c=9", "0", "Δ = 36 − 36.", "Δ = (−6)² − 4(1)(9) = 36 − 36 = 0."),
        qa("y11adv-quad-m9", "Solve $x^2 - 5x = 0$ by factorisation. Enter the non-zero solution.", "x^2 - 5x = 0,\\quad x(x-5) = 0", "5", "Factor out x: x(x − 5) = 0.", "x(x − 5) = 0 gives x = 0 or x = 5. The non-zero solution is 5."),
        practicalChoice("y11adv-quad-m10", "Which equation has no real roots?", "C", ["$x^2-4=0$", "$x^2+4x+4=0$", "$x^2+4x+5=0$", "$x^2-4x+3=0$"], "For x² + 4x + 5 = 0: Δ = 16 − 20 = −4 < 0, so no real roots. The other equations have Δ ≥ 0."),
      ],
      masteryQuizPool: [
        { id: "y11adv-quad-p1", prompt: "Solve by factorisation. Enter the smaller root.", latex: "x^2-7x+12=0", answer: "3", difficulty: 1, hint: "Two numbers multiply to 12, add to $-7$.", explanation: "$(x-3)(x-4)=0$; roots $3,4$; smaller is $3$." },
        { id: "y11adv-quad-p2", prompt: "Solve by factorisation. Enter the positive root.", latex: "x^2-x-6=0", answer: "3", difficulty: 1, hint: "Multiply to $-6$, add to $-1$.", explanation: "$(x-3)(x+2)=0$; roots $3,-2$; positive is $3$." },
        { id: "y11adv-quad-p3", prompt: "Compute the discriminant.", latex: "\\Delta=b^2-4ac,\\quad 3x^2-5x+2=0", answer: "1", difficulty: 2, hint: "$a=3,b=-5,c=2$.", explanation: "$25-24=1$." },
        { id: "y11adv-quad-p4", prompt: "Compute the discriminant.", latex: "\\Delta=b^2-4ac,\\quad x^2-6x+9=0", answer: "0", difficulty: 2, hint: "$a=1,b=-6,c=9$.", explanation: "$36-36=0$." },
        { id: "y11adv-quad-p5", prompt: "What does $\\Delta=0$ indicate about the roots?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Two distinct rational roots" }, { label: "B", text: "Two distinct irrational roots" }, { label: "C", text: "One repeated root" }, { label: "D", text: "No real roots" }], hint: "The $\\pm$ term vanishes.", explanation: "$\\Delta=0$ gives one repeated root." },
        { id: "y11adv-quad-p6", prompt: "Solve using the formula. Enter the positive root.", latex: "x^2-2x-8=0", answer: "4", difficulty: 2, hint: "$\\Delta=4+32=36$.", explanation: "$x=\\frac{2\\pm 6}{2}$ gives $4,-2$; positive is $4$." },
        { id: "y11adv-quad-p7", prompt: "Compute the discriminant.", latex: "\\Delta=b^2-4ac,\\quad 2x^2+3x+5=0", answer: "-31", difficulty: 3, acceptedAnswers: ["-31", "−31"], hint: "$a=2,b=3,c=5$.", explanation: "$9-40=-31$." },
        { id: "y11adv-quad-p8", prompt: "A discriminant of $-31$ indicates the quadratic has:", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "Two rational roots" }, { label: "B", text: "One repeated root" }, { label: "C", text: "Two irrational roots" }, { label: "D", text: "No real roots" }], hint: "Sign of $\\Delta$.", explanation: "$\\Delta<0$ means no real roots." },
        { id: "y11adv-quad-p9", prompt: "Solve. Enter the repeated root.", latex: "x^2-4x+4=0", answer: "2", difficulty: 2, hint: "Perfect square $(x-2)^2$.", explanation: "$(x-2)^2=0$ gives the repeated root $2$." },
        { id: "y11adv-quad-p10", prompt: "Solve by factorisation. Enter the larger (less negative) root.", latex: "x^2+5x+4=0", answer: "-1", difficulty: 2, acceptedAnswers: ["-1", "−1"], hint: "Multiply to 4, add to 5.", explanation: "$(x+1)(x+4)=0$; roots $-1,-4$; larger is $-1$." },
        { id: "y11adv-quad-p11", prompt: "Solve by factorisation. Enter the positive root.", latex: "2x^2+x-3=0", answer: "1", difficulty: 3, hint: "$(2x+3)(x-1)$.", explanation: "Roots $-\\frac{3}{2}$ and $1$; positive is $1$." },
        { id: "y11adv-quad-p12", prompt: "For rational roots, the discriminant must be:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Negative" }, { label: "B", text: "Zero only" }, { label: "C", text: "A non-negative perfect square" }, { label: "D", text: "Any positive number" }], hint: "$\\sqrt{\\Delta}$ must be whole.", explanation: "A non-negative perfect square $\\Delta$ gives rational roots." },
        { id: "y11adv-quad-p13", prompt: "When $\\Delta>0$ but is not a perfect square, the roots are:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Rational" }, { label: "B", text: "Equal" }, { label: "C", text: "Two distinct irrational reals" }, { label: "D", text: "Imaginary" }], hint: "$\\sqrt{\\Delta}$ irrational.", explanation: "Two distinct irrational real roots." },
        { id: "y11adv-quad-p14", prompt: "Solve by factorisation. Enter the non-zero solution.", latex: "x^2-5x=0", answer: "5", difficulty: 2, hint: "Factor out $x$.", explanation: "$x(x-5)=0$ gives $0,5$; non-zero is $5$." },
        { id: "y11adv-quad-p15", prompt: "Which equation has no real roots?", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$x^2-4=0$" }, { label: "B", text: "$x^2+4x+4=0$" }, { label: "C", text: "$x^2+4x+5=0$" }, { label: "D", text: "$x^2-4x+3=0$" }], hint: "Find $\\Delta$ for each.", explanation: "$x^2+4x+5$ has $\\Delta=16-20=-4<0$." },
        { id: "y11adv-quad-p16", prompt: "Compute the discriminant.", latex: "\\Delta=b^2-4ac,\\quad x^2+2x+5=0", answer: "-16", difficulty: 3, acceptedAnswers: ["-16", "−16"], hint: "$a=1,b=2,c=5$.", explanation: "$4-20=-16$." },
        { id: "y11adv-quad-p17", prompt: "Solve. Enter the smaller root.", latex: "x^2+x-6=0", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "$(x+3)(x-2)$.", explanation: "Roots $-3,2$; smaller is $-3$." },
        { id: "y11adv-quad-p18", prompt: "Solve using the formula. Enter the positive root.", latex: "x^2+2x-3=0", answer: "1", difficulty: 3, hint: "$\\Delta=16$.", explanation: "$x=\\frac{-2\\pm 4}{2}$ gives $1,-3$; positive is $1$." },
        { id: "y11adv-quad-p19", prompt: "For how many real roots does $\\Delta>0$ give?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$0$" }, { label: "B", text: "$2$" }, { label: "C", text: "$1$" }, { label: "D", text: "$3$" }], hint: "Two sign options on $\\pm$.", explanation: "$\\Delta>0$ gives two distinct real roots." },
        { id: "y11adv-quad-p20", prompt: "Solve. Enter the repeated root.", latex: "x^2+10x+25=0", answer: "-5", difficulty: 3, acceptedAnswers: ["-5", "−5"], hint: "$(x+5)^2$.", explanation: "$(x+5)^2=0$ gives the repeated root $-5$." },
        { id: "y11adv-quad-p21", prompt: "Compute the discriminant.", latex: "\\Delta=b^2-4ac,\\quad 3x^2+2x-1=0", answer: "16", difficulty: 3, hint: "$a=3,b=2,c=-1$.", explanation: "$4+12=16$." },
        { id: "y11adv-quad-p22", prompt: "For $kx^2+4x+1=0$ to have a repeated root, find $k$.", latex: "\\Delta=16-4k=0", answer: "4", difficulty: 4, hint: "Set $\\Delta=0$.", explanation: "$16-4k=0$ gives $k=4$." },
        { id: "y11adv-quad-p23", prompt: "For $x^2-6x+c=0$ to have a repeated root, find $c$.", latex: "\\Delta=36-4c=0", answer: "9", difficulty: 4, hint: "Set $\\Delta=0$.", explanation: "$36-4c=0$ gives $c=9$." },
        { id: "y11adv-quad-p24", prompt: "Solve. Enter the product of the two roots of $x^2-7x+10=0$.", latex: "x^2-7x+10=0", answer: "10", difficulty: 4, hint: "Roots multiply to $c/a$.", explanation: "$(x-2)(x-5)=0$; product $2\\times 5=10$." },
        { id: "y11adv-quad-p25", prompt: "For $x^2+bx+9=0$ to have a repeated root with $b>0$, find $b$.", latex: "\\Delta=b^2-36=0,\\ b>0", answer: "6", difficulty: 5, hint: "$b^2=36$, take positive root.", explanation: "$b^2-36=0$ gives $b=6$ (taking $b>0$)." },
        { id: "y11adv-quad-p26", prompt: "The sum of the roots of $2x^2-8x+3=0$ is:", latex: "\\text{sum}=-\\frac{b}{a}", answer: "4", difficulty: 5, hint: "Sum of roots $=-b/a$.", explanation: "$-\\frac{-8}{2}=4$." },
        { id: "y11adv-quad-p27", prompt: "For $x^2+kx+4=0$ to have two distinct real roots, the smallest integer $k>0$ is:", latex: "\\Delta=k^2-16>0", answer: "5", difficulty: 5, hint: "Need $k^2>16$.", explanation: "$k^2>16$ means $k>4$; smallest integer is $5$." },
        { id: "y11adv-quad-p28", prompt: "Solve. Enter the larger root of $x^2-3x-10=0$.", latex: "x^2-3x-10=0", answer: "5", difficulty: 3, hint: "$(x-5)(x+2)$.", explanation: "Roots $5,-2$; larger is $5$." },
        { id: "y11adv-quad-p29", prompt: "The product of the roots of $3x^2-5x+2=0$ is:", latex: "\\text{product}=\\frac{c}{a}", answer: "2/3", difficulty: 5, acceptedAnswers: ["0.67", "0.667", "2/3"], hint: "Product of roots $=c/a$.", explanation: "$\\frac{2}{3}$." },
        { id: "y11adv-quad-p30", prompt: "For $x^2+bx+c=0$ with roots $2$ and $5$, find $c$.", latex: "\\text{product of roots}=c", answer: "10", difficulty: 4, hint: "$c$ equals the product of the roots.", explanation: "$2\\times 5=10$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-quad-mp1",
          prompt: "Consider the quadratic equation $2x^2-4x+5=0$.",
          latex: "2x^2-4x+5=0",
          answer: "-24",
          hint: "For (a) compute $\\Delta=b^2-4ac$ with $a=2,b=-4,c=5$. For (b) read off the nature of roots. For (c) compare with a related equation.",
          explanation: "(a) $\\Delta=16-40=-24$. (b) $\\Delta<0$, so no real roots. (c) $x^2-4x+4=0$ has $\\Delta=0$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Compute the discriminant $\\Delta$.", marks: 2, answer: "-24", acceptedAnswers: ["-24", "−24"], hint: "$(-4)^2-4(2)(5)$.", explanation: "$16-40=-24$." },
            { key: "b", label: "(b)", prompt: "How many real roots does the equation have?", marks: 1, answer: "0", hint: "Sign of $\\Delta$.", explanation: "$\\Delta<0$, so there are $0$ real roots." },
            { key: "c", label: "(c)", prompt: "For the related equation $x^2-4x+4=0$, compute its discriminant.", marks: 1, answer: "0", hint: "$(-4)^2-4(1)(4)$.", explanation: "$16-16=0$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "linear-functions") {
    return {
      ...base,
      description:
        "Use gradient-intercept, general and point-gradient forms of linear equations; find x- and y-intercepts; graph linear functions; identify parallel and perpendicular relationships; solve and graph linear inequalities.",
      learningIntention:
        "Write, interpret and solve linear equations and inequalities, and identify parallel and perpendicular lines from their equations.",
      successCriteria: [
        "Read the gradient and y-intercept from gradient-intercept form y = mx + c.",
        "Find x- and y-intercepts by substituting y = 0 and x = 0 respectively.",
        "State whether two lines are parallel or perpendicular using their gradients.",
        "Solve a linear inequality and correctly reverse the inequality sign when dividing by a negative.",
      ],
      teaching: {
        paragraphs: [
          "A linear function produces a straight-line graph because equal changes in x always produce equal changes in y. The gradient m measures how much y changes for each unit increase in x. A gradient of 3 means y increases by 3 every time x increases by 1.",
          "The three most useful equation forms are: gradient-intercept form y = mx + c (m is the gradient, c is the y-intercept), point-gradient form y − y₁ = m(x − x₁) (uses a known point and gradient), and general form ax + by + c = 0. You can convert between them algebraically.",
          "Parallel lines have exactly the same gradient. Perpendicular lines have gradients that multiply to −1: if one line has gradient m, the perpendicular gradient is −1/m (the negative reciprocal). For example, lines with gradients 2 and −1/2 are perpendicular.",
          "A linear inequality such as 3x − 5 > 1 is solved like an equation with one critical rule: when you multiply or divide both sides by a negative number, the inequality sign reverses. For example, −2x > 4 → x < −2.",
        ],
        latexBlocks: [
          "y = mx + c, \\quad m = \\frac{y_2-y_1}{x_2-x_1}",
          "y - y_1 = m(x - x_1) \\quad \\text{(point-gradient form)}",
          "\\text{Perpendicular gradients: } m_1 \\times m_2 = -1",
        ],
      },
      workedExamples: [
        {
          title: "Find gradient and y-intercept from general form",
          questionLatex: "\\text{Find gradient and y-intercept of } 3x - 2y + 6 = 0",
          steps: [
            {
              explanation: "Rearrange to gradient-intercept form by making y the subject.",
              latex: "-2y = -3x - 6",
            },
            {
              explanation: "Divide both sides by −2.",
              latex: "y = \\frac{3}{2}x + 3",
            },
          ],
          finalAnswerLatex: "m = \\tfrac{3}{2},\\quad \\text{y-intercept } (0,\\,3)",
        },
        {
          title: "Write a line through a point parallel to a given line",
          questionLatex: "\\text{Line through }(2,3)\\text{ parallel to }y=2x-1",
          steps: [
            {
              explanation: "Parallel lines share the same gradient, so m = 2.",
              latex: "m = 2",
            },
            {
              explanation: "Use point-gradient form with the known point (2, 3).",
              latex: "y - 3 = 2(x - 2)",
            },
            {
              explanation: "Expand and simplify.",
              latex: "y = 2x - 1",
            },
          ],
          finalAnswerLatex: "y = 2x - 1",
        },
        {
          title: "Solve a linear inequality",
          questionLatex: "\\text{Solve } 2x - 5 > 3",
          steps: [
            {
              explanation: "Add 5 to both sides.",
              latex: "2x > 8",
            },
            {
              explanation: "Divide both sides by 2 (positive, so the sign stays the same).",
              latex: "x > 4",
            },
          ],
          finalAnswerLatex: "x > 4",
        },
      ],
      guidedPractice: [
        qa("y11adv-lin-g1", "State the gradient of $y = 3x - 7$.", "y = 3x - 7", "3", "In y = mx + c, m is the gradient.", "The equation is in y = mx + c form with m = 3."),
        qa("y11adv-lin-g2", "Find the y-intercept of $2x + y - 5 = 0$ by setting $x = 0$.", "2x + y - 5 = 0,\\quad x = 0", "5", "Set x = 0 and solve for y.", "When x = 0: 0 + y − 5 = 0, so y = 5. The y-intercept is 5."),
        practicalChoice("y11adv-lin-g3", "A line has gradient 2. What is the gradient of a perpendicular line?", "D", ["$2$", "$-2$", "$\\frac{1}{2}$", "$-\\frac{1}{2}$"], "Perpendicular gradients multiply to −1: if m₁ = 2 then m₂ = −1/2."),
        qa("y11adv-lin-g4", "Find the x-intercept of $y = 4x - 8$ by setting $y = 0$.", "y = 4x - 8,\\quad y = 0", "2", "Set y = 0: 4x − 8 = 0.", "0 = 4x − 8 → 4x = 8 → x = 2."),
      ],
      independentPractice: [
        qa("y11adv-lin-i1", "Find the gradient of the line through $(1,\\,3)$ and $(3,\\,7)$.", "m = \\frac{7-3}{3-1}", "2", "Rise = 7 − 3 = 4. Run = 3 − 1 = 2.", "m = (7 − 3)/(3 − 1) = 4/2 = 2."),
        qa("y11adv-lin-i2", "Solve $3x + 5 > 11$. Enter in the form $x > ...$", "3x + 5 > 11", "x>2", "Subtract 5, then divide by 3.", "3x + 5 > 11 → 3x > 6 → x > 2.", ["x > 2"]),
        qa("y11adv-lin-i3", "State the y-intercept of $y = -3x + 9$.", "y = -3x + 9", "9", "In y = mx + c, c is the y-intercept.", "The constant term c = 9 gives the y-intercept."),
        practicalChoice("y11adv-lin-i4", "Which line is parallel to $y = -2x + 5$?", "B", ["$y=2x+5$", "$y=-2x-3$", "$y=\\frac{1}{2}x+5$", "$y=2x-5$"], "Parallel lines have the same gradient. Only y = −2x − 3 has gradient −2, matching y = −2x + 5."),
        qa("y11adv-lin-i5", "Find the x-intercept of $2x - 3y + 6 = 0$ by setting $y = 0$.", "2x - 3y + 6 = 0,\\quad y = 0", "-3", "Set y = 0: 2x + 6 = 0.", "When y = 0: 2x + 6 = 0 → 2x = −6 → x = −3.", ["-3", "−3"]),
      ],
      commonMistakes: [
        { mistake: "Dividing by a negative in an inequality without reversing the sign.", fix: "When multiplying or dividing both sides of an inequality by a negative number, always flip the inequality sign." },
        { mistake: "Confusing gradient m with y-intercept c in y = mx + c.", fix: "m is the coefficient of x (gradient); c is the constant term (y-intercept)." },
        { mistake: "Using m₂ = −m₁ for perpendicular lines instead of m₂ = −1/m₁.", fix: "Perpendicular gradients are negative reciprocals: m₁ × m₂ = −1, so m₂ = −1/m₁." },
        { mistake: "Substituting x = 0 to find the x-intercept instead of y = 0.", fix: "The x-intercept is where y = 0. Set y = 0 and solve for x. The y-intercept is where x = 0." },
      ],
      masteryQuiz: [
        qa("y11adv-lin-m1", "State the gradient of $y = -5x + 2$.", "y = -5x + 2", "-5", "In y = mx + c, m is the coefficient of x.", "The gradient is the coefficient of x, which is −5.", ["-5", "−5"]),
        qa("y11adv-lin-m2", "Find the y-intercept of $3x - y - 6 = 0$ by setting $x = 0$.", "3x - y - 6 = 0,\\quad x=0", "-6", "Set x = 0: −y − 6 = 0.", "When x = 0: −y − 6 = 0 → y = −6.", ["-6", "−6"]),
        qa("y11adv-lin-m3", "Find the gradient of the line through $(0,\\,4)$ and $(2,\\,0)$.", "m = \\frac{0-4}{2-0}", "-2", "Rise = 0 − 4 = −4. Run = 2 − 0 = 2.", "m = (0 − 4)/(2 − 0) = −4/2 = −2.", ["-2", "−2"]),
        practicalChoice("y11adv-lin-m4", "The gradient of a line perpendicular to $y = -3x + 1$ is:", "C", ["$-3$", "$3$", "$\\frac{1}{3}$", "$-\\frac{1}{3}$"], "m₁ × m₂ = −1. If m₁ = −3, then m₂ = −1/(−3) = 1/3."),
        qa("y11adv-lin-m5", "Solve $5 - 2x \\le 1$. Enter in the form $x \\ge ...$", "5 - 2x \\le 1", "x>=2", "Subtract 5, then divide by −2 and reverse the sign.", "5 − 2x ≤ 1 → −2x ≤ −4 → x ≥ 2 (sign reverses when dividing by −2).", ["x >= 2", "x≥2"]),
        qa("y11adv-lin-m6", "Find the x-intercept of $y = 2x + 6$ by setting $y = 0$.", "y = 2x + 6,\\quad y=0", "-3", "0 = 2x + 6, so 2x = −6.", "0 = 2x + 6 → 2x = −6 → x = −3.", ["-3", "−3"]),
        practicalChoice("y11adv-lin-m7", "Which form of a linear equation uses a known point $(x_1, y_1)$ and gradient $m$?", "B", ["$y=mx+c$", "$y-y_1=m(x-x_1)$", "$ax+by+c=0$", "$y=mx$"], "The point-gradient form y − y₁ = m(x − x₁) uses a known point and gradient directly without first finding the y-intercept."),
        qa("y11adv-lin-m8", "State the y-intercept of $y = 7 - 4x$.", "y = -4x + 7", "7", "The y-intercept is the constant term in y = mx + c form.", "Rewritten: y = −4x + 7. The y-intercept c = 7."),
        qa("y11adv-lin-m9", "Solve $3(x-1) > 6$. Enter in the form $x > ...$", "3(x-1) > 6", "x>3", "Divide both sides by 3, then add 1.", "3(x − 1) > 6 → x − 1 > 2 → x > 3.", ["x > 3"]),
        qa("y11adv-lin-m10", "Find the gradient of a line perpendicular to $y = \\frac{1}{3}x + 5$.", "m_1 = \\frac{1}{3},\\quad m_1 \\times m_2 = -1", "-3", "m₂ = −1/m₁ = −1/(1/3).", "m₂ = −1/(1/3) = −3.", ["-3", "−3"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-lin-p1", prompt: "State the gradient of the displayed line.", latex: "y=3x-7", answer: "3", difficulty: 1, hint: "Coefficient of $x$.", explanation: "Gradient is $3$." },
        { id: "y11adv-lin-p2", prompt: "State the gradient of the displayed line.", latex: "y=-5x+2", answer: "-5", difficulty: 1, acceptedAnswers: ["-5", "−5"], hint: "Coefficient of $x$.", explanation: "Gradient is $-5$." },
        { id: "y11adv-lin-p3", prompt: "State the y-intercept of the displayed line.", latex: "y=-3x+9", answer: "9", difficulty: 1, hint: "Constant term.", explanation: "y-intercept is $9$." },
        { id: "y11adv-lin-p4", prompt: "Find the y-intercept by setting $x=0$.", latex: "2x+y-5=0,\\quad x=0", answer: "5", difficulty: 1, hint: "Set $x=0$.", explanation: "$y-5=0$ gives $y=5$." },
        { id: "y11adv-lin-p5", prompt: "Find the x-intercept by setting $y=0$.", latex: "y=4x-8,\\quad y=0", answer: "2", difficulty: 2, hint: "$0=4x-8$.", explanation: "$4x=8$ gives $x=2$." },
        { id: "y11adv-lin-p6", prompt: "Find the gradient of the line through $(1,3)$ and $(3,7)$.", latex: "m=\\frac{7-3}{3-1}", answer: "2", difficulty: 2, hint: "Rise over run.", explanation: "$\\frac{4}{2}=2$." },
        { id: "y11adv-lin-p7", prompt: "Find the gradient of the line through $(0,4)$ and $(2,0)$.", latex: "m=\\frac{0-4}{2-0}", answer: "-2", difficulty: 2, acceptedAnswers: ["-2", "−2"], hint: "Rise over run.", explanation: "$\\frac{-4}{2}=-2$." },
        { id: "y11adv-lin-p8", prompt: "A line has gradient 2. What is the gradient of a perpendicular line?", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$2$" }, { label: "B", text: "$-2$" }, { label: "C", text: "$\\frac{1}{2}$" }, { label: "D", text: "$-\\frac{1}{2}$" }], hint: "Negative reciprocal.", explanation: "$m_2=-\\frac{1}{2}$." },
        { id: "y11adv-lin-p9", prompt: "Solve the inequality. Enter in the form $x>...$", latex: "3x+5>11", answer: "x>2", difficulty: 2, acceptedAnswers: ["x > 2"], hint: "Subtract 5, divide by 3.", explanation: "$3x>6$ gives $x>2$." },
        { id: "y11adv-lin-p10", prompt: "Which line is parallel to $y=-2x+5$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$y=2x+5$" }, { label: "B", text: "$y=-2x-3$" }, { label: "C", text: "$y=\\frac{1}{2}x+5$" }, { label: "D", text: "$y=2x-5$" }], hint: "Same gradient.", explanation: "Gradient $-2$ matches $y=-2x-3$." },
        { id: "y11adv-lin-p11", prompt: "Find the x-intercept by setting $y=0$.", latex: "2x-3y+6=0,\\quad y=0", answer: "-3", difficulty: 3, acceptedAnswers: ["-3", "−3"], hint: "$2x+6=0$.", explanation: "$2x=-6$ gives $x=-3$." },
        { id: "y11adv-lin-p12", prompt: "Find the y-intercept by setting $x=0$.", latex: "3x-y-6=0,\\quad x=0", answer: "-6", difficulty: 3, acceptedAnswers: ["-6", "−6"], hint: "$-y-6=0$.", explanation: "$y=-6$." },
        { id: "y11adv-lin-p13", prompt: "The gradient of a line perpendicular to $y=-3x+1$ is:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$-3$" }, { label: "B", text: "$3$" }, { label: "C", text: "$\\frac{1}{3}$" }, { label: "D", text: "$-\\frac{1}{3}$" }], hint: "Negative reciprocal of $-3$.", explanation: "$m_2=-\\frac{1}{-3}=\\frac{1}{3}$." },
        { id: "y11adv-lin-p14", prompt: "Solve the inequality. Enter in the form $x\\ge...$", latex: "5-2x\\le 1", answer: "x>=2", difficulty: 3, acceptedAnswers: ["x >= 2", "x≥2"], hint: "Divide by $-2$ and flip.", explanation: "$-2x\\le -4$ gives $x\\ge 2$." },
        { id: "y11adv-lin-p15", prompt: "Find the x-intercept by setting $y=0$.", latex: "y=2x+6,\\quad y=0", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "$0=2x+6$.", explanation: "$2x=-6$ gives $x=-3$." },
        { id: "y11adv-lin-p16", prompt: "Which form uses a known point and gradient directly?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$y=mx+c$" }, { label: "B", text: "$y-y_1=m(x-x_1)$" }, { label: "C", text: "$ax+by+c=0$" }, { label: "D", text: "$y=mx$" }], hint: "Point-gradient form.", explanation: "$y-y_1=m(x-x_1)$." },
        { id: "y11adv-lin-p17", prompt: "State the y-intercept of $y=7-4x$.", latex: "y=-4x+7", answer: "7", difficulty: 2, hint: "Constant term.", explanation: "y-intercept is $7$." },
        { id: "y11adv-lin-p18", prompt: "Solve the inequality. Enter in the form $x>...$", latex: "3(x-1)>6", answer: "x>3", difficulty: 3, acceptedAnswers: ["x > 3"], hint: "Divide by 3, then add 1.", explanation: "$x-1>2$ gives $x>3$." },
        { id: "y11adv-lin-p19", prompt: "Find the gradient of a line perpendicular to $y=\\frac{1}{3}x+5$.", latex: "m_1=\\frac{1}{3}", answer: "-3", difficulty: 3, acceptedAnswers: ["-3", "−3"], hint: "Negative reciprocal.", explanation: "$-\\frac{1}{1/3}=-3$." },
        { id: "y11adv-lin-p20", prompt: "Find the gradient of the line through $(2,5)$ and $(6,13)$.", latex: "m=\\frac{13-5}{6-2}", answer: "2", difficulty: 3, hint: "Rise over run.", explanation: "$\\frac{8}{4}=2$." },
        { id: "y11adv-lin-p21", prompt: "Convert $4x-2y+6=0$ to $y=mx+c$ and enter the gradient $m$.", latex: "4x-2y+6=0", answer: "2", difficulty: 4, hint: "Make $y$ the subject.", explanation: "$-2y=-4x-6$ gives $y=2x+3$; $m=2$." },
        { id: "y11adv-lin-p22", prompt: "Convert $4x-2y+6=0$ to $y=mx+c$ and enter the y-intercept $c$.", latex: "4x-2y+6=0", answer: "3", difficulty: 4, hint: "Make $y$ the subject.", explanation: "$y=2x+3$; $c=3$." },
        { id: "y11adv-lin-p23", prompt: "A line passes through $(2,3)$ parallel to $y=2x-1$. Enter its y-intercept.", latex: "y-3=2(x-2)", answer: "-1", difficulty: 4, acceptedAnswers: ["-1", "−1"], hint: "Use point-gradient with $m=2$.", explanation: "$y=2x-1$; y-intercept is $-1$." },
        { id: "y11adv-lin-p24", prompt: "A line through $(0,5)$ is perpendicular to $y=\\frac{1}{2}x+1$. Enter its gradient.", latex: "m_1=\\frac{1}{2}", answer: "-2", difficulty: 4, acceptedAnswers: ["-2", "−2"], hint: "Negative reciprocal.", explanation: "$m_2=-2$." },
        { id: "y11adv-lin-p25", prompt: "Two lines $y=3x+1$ and $y=3x-4$ are:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Parallel" }, { label: "B", text: "Perpendicular" }, { label: "C", text: "The same line" }, { label: "D", text: "Intersecting at $(0,0)$" }], hint: "Compare gradients.", explanation: "Same gradient $3$, different intercepts: parallel." },
        { id: "y11adv-lin-p26", prompt: "Find the x-coordinate where $y=2x+1$ meets $y=-x+7$.", latex: "2x+1=-x+7", answer: "2", difficulty: 5, hint: "Set the expressions equal.", explanation: "$3x=6$ gives $x=2$." },
        { id: "y11adv-lin-p27", prompt: "A line has gradient $-\\frac{2}{3}$ and passes through $(3,0)$. Enter its y-intercept.", latex: "y-0=-\\frac{2}{3}(x-3)", answer: "2", difficulty: 5, hint: "Substitute $x=0$.", explanation: "$y=-\\frac{2}{3}(0-3)=2$; y-intercept is $2$." },
        { id: "y11adv-lin-p28", prompt: "Solve the inequality. Enter in the form $x<...$", latex: "-3x+7>1", answer: "x<2", difficulty: 4, acceptedAnswers: ["x < 2"], hint: "Divide by $-3$ and flip.", explanation: "$-3x>-6$ gives $x<2$." },
        { id: "y11adv-lin-p29", prompt: "The line through $(1,2)$ and $(4,k)$ has gradient $3$. Find $k$.", latex: "\\frac{k-2}{4-1}=3", answer: "11", difficulty: 5, hint: "$\\frac{k-2}{3}=3$.", explanation: "$k-2=9$ gives $k=11$." },
        { id: "y11adv-lin-p30", prompt: "A line is perpendicular to $2x+5y-1=0$. Enter its gradient.", latex: "2x+5y-1=0", answer: "5/2", difficulty: 5, acceptedAnswers: ["2.5", "5/2"], hint: "First find the gradient of the given line.", explanation: "Given line: $y=-\\frac{2}{5}x+\\frac{1}{5}$, gradient $-\\frac{2}{5}$; perpendicular gradient is $\\frac{5}{2}$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-lin-mp1",
          prompt: "A line $\\ell$ has equation $3x-2y+12=0$.",
          latex: "3x-2y+12=0",
          answer: "3/2",
          hint: "For (a) rearrange to $y=mx+c$. For (b) set $y=0$. For (c) use the negative reciprocal of the gradient.",
          explanation: "(a) $y=\\frac{3}{2}x+6$, gradient $\\frac{3}{2}$. (b) x-intercept $-4$. (c) perpendicular gradient $-\\frac{2}{3}$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Enter the gradient of $\\ell$.", marks: 2, answer: "3/2", acceptedAnswers: ["1.5", "3/2"], hint: "Make $y$ the subject.", explanation: "$-2y=-3x-12$ gives $y=\\frac{3}{2}x+6$; gradient $\\frac{3}{2}$." },
            { key: "b", label: "(b)", prompt: "Find the x-intercept of $\\ell$ (set $y=0$).", marks: 1, answer: "-4", acceptedAnswers: ["-4", "−4"], hint: "$3x+12=0$.", explanation: "$3x+12=0$ gives $x=-4$." },
            { key: "c", label: "(c)", prompt: "Enter the gradient of a line perpendicular to $\\ell$.", marks: 1, answer: "-2/3", acceptedAnswers: ["-2/3", "−2/3", "-0.667", "-0.67"], hint: "Negative reciprocal of $\\frac{3}{2}$.", explanation: "Perpendicular gradient is $-\\frac{2}{3}$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "constructing-using-functions") {
    return {
      ...base,
      description:
        "Construct and use linear and quadratic functions as mathematical models; apply linear inequalities in context; solve simultaneous linear equations by substitution and elimination; interpret cost-revenue and break-even problems.",
      learningIntention:
        "Set up and solve linear models, simultaneous equations and break-even problems using function notation and algebraic methods.",
      successCriteria: [
        "Write a linear function from a word problem by identifying the rate (gradient) and fixed value (y-intercept).",
        "Solve simultaneous linear equations by substitution and by elimination.",
        "Set up and solve a break-even equation by equating revenue and cost functions.",
        "Interpret the gradient and y-intercept in the context of a practical model.",
      ],
      teaching: {
        paragraphs: [
          "A linear model links two quantities with a constant rate of change. If a cost increases by the same amount per unit, that relationship is linear: C = mn + c, where m is the cost per unit and c is the fixed cost. The gradient m is always the rate — the cost per item, the speed, the charge per hour.",
          "Simultaneous equations arise when two conditions must hold at the same time. Substitution: rearrange one equation to make one variable the subject, then substitute into the other. Elimination: add or subtract multiples of the equations to cancel one variable.",
          "A break-even point occurs when revenue equals cost: R = C. At this point, profit is zero. Setting R(n) = C(n) and solving gives the exact quantity where the business neither gains nor loses money.",
          "In modelling problems, identify the input (independent variable) and the output before writing the function. Confirm the gradient and intercept make sense in context — a negative gradient for cost per item would be unrealistic.",
        ],
        latexBlocks: [
          "C = mn + c \\quad \\text{(m = variable rate, c = fixed cost, n = quantity)}",
          "\\text{Break-even: } R(n) = C(n)",
          "\\text{Profit} = R(n) - C(n)",
        ],
      },
      workedExamples: [
        {
          title: "Build and use a linear cost model",
          questionLatex: "\\text{A car hire costs } \\$40 \\text{ plus } \\$0.25 \\text{ per km. Find the cost for 120 km.}",
          steps: [
            {
              explanation: "Identify the fixed cost ($40) and the variable rate ($0.25 per km).",
              latex: "C = 0.25n + 40",
            },
            {
              explanation: "Substitute n = 120.",
              latex: "C = 0.25(120) + 40 = 30 + 40 = 70",
            },
          ],
          finalAnswerLatex: "C = \\$70",
        },
        {
          title: "Solve simultaneous equations by elimination",
          questionLatex: "2x + y = 7, \\quad x - y = 2",
          steps: [
            {
              explanation: "Add both equations to eliminate y.",
              latex: "3x = 9 \\Rightarrow x = 3",
            },
            {
              explanation: "Substitute x = 3 into the first equation to find y.",
              latex: "2(3) + y = 7 \\Rightarrow y = 1",
            },
          ],
          finalAnswerLatex: "x = 3,\\quad y = 1",
        },
        {
          title: "Find the break-even quantity",
          questionLatex: "R = 15n,\\quad C = 8n + 210",
          steps: [
            {
              explanation: "Set revenue equal to cost.",
              latex: "15n = 8n + 210",
            },
            {
              explanation: "Solve for n.",
              latex: "7n = 210 \\Rightarrow n = 30",
            },
          ],
          finalAnswerLatex: "\\text{Break-even at } n = 30",
        },
      ],
      guidedPractice: [
        qa("y11adv-model-g1", "A cost model is $C = 5n + 20$ where $n$ is the number of items. Find $C$ when $n = 8$.", "C = 5n + 20,\\quad n = 8", "60", "Substitute n = 8.", "C = 5(8) + 20 = 40 + 20 = 60."),
        qa("y11adv-model-g2", "Solve the simultaneous equations by adding them. Enter the value of $x$.", "x + y = 10,\\quad x - y = 4", "7", "Add both equations to eliminate y: 2x = 14.", "Adding: 2x = 14 → x = 7."),
        practicalChoice("y11adv-model-g3", "Break-even occurs when:", "B", ["Revenue is greater than cost", "Revenue equals cost", "Cost is greater than revenue", "Revenue minus cost equals 100"], "Break-even is where R = C — the business makes zero profit."),
        qa("y11adv-model-g4", "Revenue $R = 12n$ and cost $C = 8n + 40$. Find the break-even quantity.", "12n = 8n + 40", "10", "Set R = C: 12n = 8n + 40. Solve for n.", "12n − 8n = 40 → 4n = 40 → n = 10."),
      ],
      independentPractice: [
        qa("y11adv-model-i1", "Find $n$ when $C = 36$ in the model $C = 3n + 15$.", "3n + 15 = 36", "7", "Subtract 15, then divide by 3.", "3n = 21 → n = 7."),
        qa("y11adv-model-i2", "Solve simultaneously by substitution. Enter the value of $y$.", "x + 2y = 8,\\quad x = y + 2", "2", "Substitute x = y + 2 into x + 2y = 8.", "(y + 2) + 2y = 8 → 3y = 6 → y = 2."),
        qa("y11adv-model-i3", "Revenue $R = 20n$, cost $C = 12n + 120$. Find the profit when $n = 20$.", "P = 20n - (12n+120),\\quad n=20", "40", "P = 8n − 120. Substitute n = 20.", "P = 8(20) − 120 = 160 − 120 = 40."),
        practicalChoice("y11adv-model-i4", "In a linear cost model $C = mn + c$, what does the y-intercept $c$ represent?", "C", ["Variable cost per unit", "Total cost for c items", "Fixed cost", "Break-even quantity"], "The y-intercept c is the cost when n = 0 — the fixed cost that applies regardless of quantity."),
        qa("y11adv-model-i5", "Solve simultaneously. Enter the value of $x$.", "2x + 3y = 12,\\quad x = 6 - y", "6", "Substitute x = 6 − y into 2x + 3y = 12.", "2(6 − y) + 3y = 12 → 12 + y = 12 → y = 0, x = 6."),
      ],
      commonMistakes: [
        { mistake: "Confusing the gradient (variable cost per unit) with the y-intercept (fixed cost) in linear models.", fix: "The gradient m tells you the rate per unit; the y-intercept c is the initial cost when zero units are produced." },
        { mistake: "Substituting incorrectly by not replacing every instance of the variable.", fix: "Replace every occurrence of the variable being substituted. Verify by substituting both values back into both original equations." },
        { mistake: "Setting profit to zero when finding break-even instead of setting R = C.", fix: "Break-even is where R − C = 0, which is the same as R = C. Setting them equal directly is the clearest method." },
        { mistake: "Treating break-even as a revenue or cost value rather than a quantity.", fix: "Solving R = C gives the break-even quantity n. Substitute n back to find the break-even revenue or cost if needed." },
      ],
      masteryQuiz: [
        qa("y11adv-model-m1", "A cost model is $C = 7n + 30$. Find $C$ when $n = 5$.", "C = 7n + 30,\\quad n = 5", "65", "Substitute n = 5.", "C = 7(5) + 30 = 35 + 30 = 65."),
        qa("y11adv-model-m2", "Solve the simultaneous equations by subtraction. Enter $y$.", "x + y = 9,\\quad x - y = 3", "3", "Subtract the second from the first: 2y = 6.", "Subtracting: 2y = 6 → y = 3."),
        qa("y11adv-model-m3", "Revenue $R = 15n$, cost $C = 9n + 48$. Find the break-even quantity.", "15n = 9n + 48", "8", "Set R = C. Solve 6n = 48.", "15n = 9n + 48 → 6n = 48 → n = 8."),
        practicalChoice("y11adv-model-m4", "In a linear cost model $C = mn + c$, the gradient $m$ represents:", "B", ["The fixed cost", "The variable cost per unit", "The break-even point", "The total revenue"], "The gradient m is how much cost changes for each additional unit — the variable (marginal) cost per unit."),
        qa("y11adv-model-m5", "Revenue $R = 10n$, cost $C = 4n + 60$. Find the profit when $n = 15$.", "P = R - C = 10n - (4n+60),\\quad n=15", "30", "P = 6n − 60. Substitute n = 15.", "P = 6(15) − 60 = 90 − 60 = 30."),
        qa("y11adv-model-m6", "Solve by elimination. Enter $y$.", "3x + y = 11,\\quad 2x - y = 4", "2", "Add both equations to eliminate y: 5x = 15, x = 3.", "Adding: 5x = 15 → x = 3. Sub into 3(3) + y = 11 → y = 2."),
        qa("y11adv-model-m7", "A plumber charges a $80 callout fee plus $45 per hour. Find the cost of a 3-hour job.", "C = 80 + 45 \\times 3", "215", "Cost = fixed fee + rate × hours.", "C = 80 + 45 × 3 = 80 + 135 = 215."),
        practicalChoice("y11adv-model-m8", "Two straight lines with different gradients will:", "C", ["Be parallel", "Have no intersection", "Intersect at exactly one point", "Have the same y-intercept"], "Different gradients mean the lines are not parallel, so they must cross at exactly one point."),
        qa("y11adv-model-m9", "Revenue $R = 25n$, cost $C = 15n + 80$. What is the minimum integer $n$ for profit?", "25n > 15n + 80", "9", "10n > 80 → n > 8. Smallest integer is 9.", "25n − 15n > 80 → 10n > 80 → n > 8. Smallest integer n = 9."),
        qa("y11adv-model-m10", "Solve simultaneously. Enter $x$.", "x = 2y,\\quad x + y = 12", "8", "Substitute x = 2y into x + y = 12: 3y = 12.", "2y + y = 12 → y = 4. x = 2(4) = 8."),
      ],
      masteryQuizPool: [
        { id: "y11adv-model-p1", prompt: "A cost model is $C=5n+20$. Find $C$ when $n=8$.", latex: "C=5n+20,\\quad n=8", answer: "60", difficulty: 1, hint: "Substitute $n=8$.", explanation: "$5(8)+20=60$." },
        { id: "y11adv-model-p2", prompt: "A cost model is $C=7n+30$. Find $C$ when $n=5$.", latex: "C=7n+30,\\quad n=5", answer: "65", difficulty: 1, hint: "Substitute $n=5$.", explanation: "$7(5)+30=65$." },
        { id: "y11adv-model-p3", prompt: "Solve by adding the equations. Enter $x$.", latex: "x+y=10,\\quad x-y=4", answer: "7", difficulty: 1, hint: "Add to eliminate $y$.", explanation: "$2x=14$ gives $x=7$." },
        { id: "y11adv-model-p4", prompt: "Break-even occurs when:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Revenue exceeds cost" }, { label: "B", text: "Revenue equals cost" }, { label: "C", text: "Cost exceeds revenue" }, { label: "D", text: "Revenue minus cost is 100" }], hint: "Zero profit.", explanation: "Break-even is $R=C$." },
        { id: "y11adv-model-p5", prompt: "Revenue $R=12n$ and cost $C=8n+40$. Find the break-even quantity.", latex: "12n=8n+40", answer: "10", difficulty: 2, hint: "Set $R=C$.", explanation: "$4n=40$ gives $n=10$." },
        { id: "y11adv-model-p6", prompt: "Find $n$ when $C=36$ in $C=3n+15$.", latex: "3n+15=36", answer: "7", difficulty: 2, hint: "Subtract 15, divide by 3.", explanation: "$3n=21$ gives $n=7$." },
        { id: "y11adv-model-p7", prompt: "Solve by substitution. Enter $y$.", latex: "x+2y=8,\\quad x=y+2", answer: "2", difficulty: 2, hint: "Substitute $x=y+2$.", explanation: "$(y+2)+2y=8$ gives $3y=6$, $y=2$." },
        { id: "y11adv-model-p8", prompt: "Revenue $R=20n$, cost $C=12n+120$. Find the profit when $n=20$.", latex: "P=20n-(12n+120),\\quad n=20", answer: "40", difficulty: 3, hint: "$P=8n-120$.", explanation: "$8(20)-120=40$." },
        { id: "y11adv-model-p9", prompt: "In $C=mn+c$, the y-intercept $c$ represents:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Variable cost per unit" }, { label: "B", text: "Total cost for $c$ items" }, { label: "C", text: "Fixed cost" }, { label: "D", text: "Break-even quantity" }], hint: "Cost when $n=0$.", explanation: "$c$ is the fixed cost." },
        { id: "y11adv-model-p10", prompt: "Solve. Enter $x$.", latex: "2x+3y=12,\\quad x=6-y", answer: "6", difficulty: 3, hint: "Substitute $x=6-y$.", explanation: "$2(6-y)+3y=12$ gives $y=0$, $x=6$." },
        { id: "y11adv-model-p11", prompt: "Solve by subtraction. Enter $y$.", latex: "x+y=9,\\quad x-y=3", answer: "3", difficulty: 2, hint: "Subtract the equations.", explanation: "$2y=6$ gives $y=3$." },
        { id: "y11adv-model-p12", prompt: "Revenue $R=15n$, cost $C=9n+48$. Find the break-even quantity.", latex: "15n=9n+48", answer: "8", difficulty: 2, hint: "Set $R=C$.", explanation: "$6n=48$ gives $n=8$." },
        { id: "y11adv-model-p13", prompt: "In $C=mn+c$, the gradient $m$ represents:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "The fixed cost" }, { label: "B", text: "The variable cost per unit" }, { label: "C", text: "The break-even point" }, { label: "D", text: "The total revenue" }], hint: "Rate of change.", explanation: "$m$ is the cost per unit." },
        { id: "y11adv-model-p14", prompt: "Revenue $R=10n$, cost $C=4n+60$. Find the profit when $n=15$.", latex: "P=6n-60,\\quad n=15", answer: "30", difficulty: 3, hint: "$P=R-C$.", explanation: "$6(15)-60=30$." },
        { id: "y11adv-model-p15", prompt: "Solve by elimination. Enter $y$.", latex: "3x+y=11,\\quad 2x-y=4", answer: "2", difficulty: 3, hint: "Add to eliminate $y$.", explanation: "$5x=15$ gives $x=3$; then $y=2$." },
        { id: "y11adv-model-p16", prompt: "A plumber charges a $80 callout plus $45 per hour. Find the cost of a 3-hour job.", latex: "C=80+45\\times 3", answer: "215", difficulty: 3, hint: "Fixed plus rate times hours.", explanation: "$80+135=215$." },
        { id: "y11adv-model-p17", prompt: "Two straight lines with different gradients will:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Be parallel" }, { label: "B", text: "Never meet" }, { label: "C", text: "Intersect at exactly one point" }, { label: "D", text: "Share a y-intercept" }], hint: "Not parallel.", explanation: "Different gradients cross once." },
        { id: "y11adv-model-p18", prompt: "Revenue $R=25n$, cost $C=15n+80$. Find the smallest integer $n$ giving a profit.", latex: "25n>15n+80", answer: "9", difficulty: 4, hint: "$10n>80$.", explanation: "$n>8$; smallest integer is $9$." },
        { id: "y11adv-model-p19", prompt: "Solve. Enter $x$.", latex: "x=2y,\\quad x+y=12", answer: "8", difficulty: 3, hint: "Substitute $x=2y$.", explanation: "$3y=12$ gives $y=4$; $x=8$." },
        { id: "y11adv-model-p20", prompt: "A taxi charges $4 flagfall plus $2 per km. Find the cost of a 12 km trip.", latex: "C=4+2\\times 12", answer: "28", difficulty: 3, hint: "Fixed plus rate times distance.", explanation: "$4+24=28$." },
        { id: "y11adv-model-p21", prompt: "Solve by elimination. Enter $x$.", latex: "2x+y=12,\\quad 2x-y=4", answer: "4", difficulty: 3, hint: "Add the equations to eliminate $y$.", explanation: "Adding: $4x=16$ gives $x=4$." },
        { id: "y11adv-model-p22", prompt: "A gym charges a $50 joining fee plus $20 per month. Find the total cost after 6 months.", latex: "C=50+20\\times 6", answer: "170", difficulty: 3, hint: "Fixed plus monthly times months.", explanation: "$50+120=170$." },
        { id: "y11adv-model-p23", prompt: "Revenue $R=18n$, cost $C=10n+96$. Find the break-even quantity.", latex: "18n=10n+96", answer: "12", difficulty: 3, hint: "Set $R=C$.", explanation: "$8n=96$ gives $n=12$." },
        { id: "y11adv-model-p24", prompt: "A line has gradient $5$ and passes through the origin. Find $y$ when $x=7$.", latex: "y=5x,\\quad x=7", answer: "35", difficulty: 2, hint: "Substitute.", explanation: "$5(7)=35$." },
        { id: "y11adv-model-p25", prompt: "Revenue $R=30n$, cost $C=18n+144$. Find the profit when $n=20$.", latex: "P=12n-144,\\quad n=20", answer: "96", difficulty: 4, hint: "$P=R-C$.", explanation: "$12(20)-144=240-144=96$." },
        { id: "y11adv-model-p26", prompt: "Two phone plans: A costs $30+0.10n$, B costs $20+0.20n$ ($n$ = minutes). Find the minutes $n$ where they cost the same.", latex: "30+0.10n=20+0.20n", answer: "100", difficulty: 5, hint: "Set the two costs equal.", explanation: "$10=0.10n$ gives $n=100$." },
        { id: "y11adv-model-p27", prompt: "A company's profit is $P=8n-200$. Find the break-even quantity ($P=0$).", latex: "8n-200=0", answer: "25", difficulty: 4, hint: "Set $P=0$.", explanation: "$8n=200$ gives $n=25$." },
        { id: "y11adv-model-p28", prompt: "Solve. Enter $x$.", latex: "3x-2y=4,\\quad x+2y=12", answer: "4", difficulty: 4, hint: "Add to eliminate $y$.", explanation: "Adding: $4x=16$ gives $x=4$." },
        { id: "y11adv-model-p29", prompt: "A linear model passes through $(2,11)$ and $(5,23)$. Find its rate (gradient).", latex: "m=\\frac{23-11}{5-2}", answer: "4", difficulty: 5, hint: "Rise over run.", explanation: "$\\frac{12}{3}=4$." },
        { id: "y11adv-model-p30", prompt: "Revenue $R=14n$, cost $C=6n+s$. Break-even is at $n=15$. Find $s$.", latex: "14(15)=6(15)+s", answer: "120", difficulty: 5, hint: "Substitute $n=15$ and solve for $s$.", explanation: "$210=90+s$ gives $s=120$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-model-mp1",
          prompt: "A small business sells items at $12 each. Its cost model is $C=8n+200$, where $n$ is the number of items.",
          latex: "R=12n,\\quad C=8n+200",
          answer: "50",
          hint: "For (a) set $R=C$. For (b) profit is $R-C$. For (c) substitute the chosen $n$ into the profit expression.",
          explanation: "(a) $12n=8n+200$ gives $n=50$. (b) $P=4n-200$. (c) at $n=80$, $P=4(80)-200=120$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the break-even quantity $n$.", marks: 2, answer: "50", hint: "Set revenue equal to cost.", explanation: "$12n=8n+200$ gives $4n=200$, $n=50$." },
            { key: "b", label: "(b)", prompt: "The profit is $P=an-200$. Find $a$.", marks: 1, answer: "4", hint: "$P=R-C=12n-(8n+200)$.", explanation: "$P=12n-8n-200=4n-200$, so $a=4$." },
            { key: "c", label: "(c)", prompt: "Find the profit when $n=80$.", marks: 1, answer: "120", hint: "Use $P=4n-200$.", explanation: "$P=4(80)-200=320-200=120$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "direct-inverse-variation") {
    return {
      ...base,
      description:
        "Model direct variation y = kx and inverse variation y = k/x; identify the constant of variation k; use the model to find unknown values; interpret graphs of direct and inverse variation.",
      learningIntention:
        "Identify, set up and use direct and inverse variation relationships to find unknown values.",
      successCriteria: [
        "Recognise direct variation y = kx and inverse variation y = k/x from given information.",
        "Calculate the constant of variation k from a known pair of values.",
        "Use the model to find unknown outputs or inputs.",
        "Distinguish between y = kx (line through origin) and a general linear function with non-zero y-intercept.",
      ],
      teaching: {
        paragraphs: [
          "In direct variation, y is always proportional to x — doubling x doubles y, halving x halves y. The relationship is y = kx, where k is the constant of variation. On a graph, y = kx is a straight line that passes through the origin.",
          "In inverse variation, y decreases as x increases and their product is always constant. The relationship is y = k/x. On a graph, y = k/x is a hyperbola passing through quadrants I and III when k > 0 — it never passes through the origin.",
          "To find k for direct variation, divide a known y-value by the corresponding x-value: k = y/x. For inverse variation, multiply: k = xy. Once k is known, substitute any new x or y to find the unknown.",
          "Direct variation y = kx always passes through (0, 0). A line like y = 3x + 5 is NOT direct variation because it has a y-intercept of 5. Do not confuse a proportional relationship with a general linear function.",
        ],
        latexBlocks: [
          "y = kx \\quad \\text{(direct variation — line through origin)}",
          "y = \\frac{k}{x} \\quad \\text{(inverse variation — hyperbola)}",
          "k = \\frac{y}{x} \\text{ for direct}, \\quad k = xy \\text{ for inverse}",
        ],
      },
      workedExamples: [
        {
          title: "Direct variation — find k and a missing value",
          questionLatex: "y \\propto x.\\text{ When } x=4,\\, y=12.\\text{ Find } y \\text{ when } x=7.",
          steps: [
            {
              explanation: "Find k by dividing the known y by the known x.",
              latex: "k = \\frac{12}{4} = 3",
            },
            {
              explanation: "Write the direct variation equation and substitute x = 7.",
              latex: "y = 3 \\times 7 = 21",
            },
          ],
          finalAnswerLatex: "y = 21",
        },
        {
          title: "Inverse variation — find k and a missing value",
          questionLatex: "y \\propto \\frac{1}{x}.\\text{ When } x=3,\\, y=8.\\text{ Find } y \\text{ when } x=6.",
          steps: [
            {
              explanation: "Find k by multiplying the known x and y values.",
              latex: "k = 3 \\times 8 = 24",
            },
            {
              explanation: "Write the inverse variation equation and substitute x = 6.",
              latex: "y = \\frac{24}{6} = 4",
            },
          ],
          finalAnswerLatex: "y = 4",
        },
        {
          title: "Choose the model before calculating",
          questionLatex: "\\text{A lamp's brightness }B\\text{ varies inversely with distance }d.\\text{ If }B=18\\text{ when }d=2,\\text{ find }B\\text{ when }d=6.",
          steps: [
            {
              explanation: "The word inversely means the product Bd stays constant, not the ratio B/d.",
              latex: "k = Bd = 18 \\times 2 = 36",
            },
            {
              explanation: "Use the inverse variation model with the new distance.",
              latex: "B = \\frac{36}{6} = 6",
            },
            {
              explanation: "The output is smaller because the distance increased; that checks the model choice.",
              latex: "d\\text{ triples, so }B\\text{ becomes one third as large}",
            },
          ],
          finalAnswerLatex: "B = 6",
        },
      ],
      guidedPractice: [
        qa("y11adv-var-g1", "If $y = kx$ and $y = 20$ when $x = 5$, find $k$.", "k = \\frac{y}{x} = \\frac{20}{5}", "4", "k = y/x.", "k = 20/5 = 4."),
        qa("y11adv-var-g2", "If $y = k/x$ and $y = 10$ when $x = 2$, find $k$.", "k = xy = 2 \\times 10", "20", "k = xy.", "k = 2 × 10 = 20."),
        practicalChoice("y11adv-var-g3", "The equation $y = 4x$ describes:", "B", ["Inverse variation with k = 4", "Direct variation with k = 4", "Quadratic variation", "A constant function"], "y = kx with k = 4 is direct variation. The graph is a line through the origin with gradient 4."),
        qa("y11adv-var-g4", "Using direct variation $y = 4x$, find $y$ when $x = 6$.", "y = 4 \\times 6", "24", "Substitute x = 6 directly.", "y = 4(6) = 24."),
      ],
      independentPractice: [
        qa("y11adv-var-i1", "If $y \\propto x$ and $y = 15$ when $x = 3$, find $y$ when $x = 8$.", "k = \\frac{15}{3} = 5,\\quad y = 5 \\times 8", "40", "Find k = 15/3 = 5, then y = 5 × 8.", "k = 5. y = 5 × 8 = 40."),
        qa("y11adv-var-i2", "If $y \\propto 1/x$ and $y = 6$ when $x = 4$, find $k$.", "k = xy = 4 \\times 6", "24", "k = xy.", "k = 4 × 6 = 24."),
        practicalChoice("y11adv-var-i3", "The graph of $y = k/x$ with $k > 0$ passes through which quadrants?", "B", ["I and II", "I and III", "II and IV", "I and IV"], "For k > 0, when x > 0 then y > 0 (quadrant I), and when x < 0 then y < 0 (quadrant III). The curve never passes through II or IV."),
        qa("y11adv-var-i4", "If $y = k/x$ and $k = 30$, find $y$ when $x = 5$.", "y = \\frac{30}{5}", "6", "Divide k by x.", "y = 30/5 = 6."),
        qa("y11adv-var-i5", "If $y \\propto x$ and $y = 56$ when $x = 7$, find $k$.", "k = \\frac{56}{7}", "8", "k = y/x.", "k = 56/7 = 8."),
      ],
      commonMistakes: [
        { mistake: "Confusing direct variation y = kx with a general linear function y = mx + c.", fix: "Direct variation always passes through (0, 0). If there is a non-zero y-intercept, it is not direct variation." },
        { mistake: "Computing k = x/y instead of k = y/x for direct variation.", fix: "From y = kx, isolate k by dividing both sides by x: k = y/x." },
        { mistake: "Computing k = y/x instead of k = xy for inverse variation.", fix: "From y = k/x, multiply both sides by x: k = xy." },
        { mistake: "Expecting the graph of y = k/x to pass through the origin.", fix: "The inverse variation curve never crosses the origin — the function is undefined at x = 0." },
      ],
      masteryQuiz: [
        qa("y11adv-var-m1", "If $y = kx$ and $y = 16$ when $x = 4$, find $k$.", "k = \\frac{16}{4}", "4", "k = y/x.", "k = 16/4 = 4."),
        qa("y11adv-var-m2", "If $y \\propto 1/x$ and $y = 4$ when $x = 5$, find $k$.", "k = xy = 5 \\times 4", "20", "k = xy.", "k = 5 × 4 = 20."),
        practicalChoice("y11adv-var-m3", "Which equation represents inverse variation between $y$ and $x$?", "C", ["$y=5x$", "$y=5x+2$", "$y=\\frac{5}{x}$", "$y=\\frac{x^2}{5}$"], "Inverse variation has the form y = k/x. Only y = 5/x matches this structure."),
        qa("y11adv-var-m4", "If $y = 3x$, find $y$ when $x = 11$.", "y = 3 \\times 11", "33", "Substitute x = 11.", "y = 3 × 11 = 33."),
        qa("y11adv-var-m5", "If $y = 20/x$, find $y$ when $x = 4$.", "y = \\frac{20}{4}", "5", "Divide 20 by 4.", "y = 20/4 = 5."),
        qa("y11adv-var-m6", "If $y \\propto x$ and $y = 42$ when $x = 6$, find $k$.", "k = \\frac{42}{6}", "7", "k = y/x.", "k = 42/6 = 7."),
        practicalChoice("y11adv-var-m7", "The graph of $y = kx$ (direct variation) always passes through:", "B", ["$(0,\\,k)$", "$(0,\\,0)$", "$(1,\\,0)$", "$(k,\\,1)$"], "When x = 0, y = k(0) = 0, so the graph always passes through the origin."),
        qa("y11adv-var-m8", "If $y \\propto 1/x$ and $y = 3$ when $x = 8$, find $y$ when $x = 6$.", "k = 8 \\times 3 = 24,\\quad y = \\frac{24}{6}", "4", "k = 24. Then y = 24/6.", "k = 8 × 3 = 24. y = 24/6 = 4."),
        qa("y11adv-var-m9", "If $y \\propto x$ and $y = 3$ when $x = 12$, find $y$ when $x = 20$.", "k = \\frac{3}{12} = \\frac{1}{4},\\quad y = \\frac{1}{4} \\times 20", "5", "k = 1/4. Then y = (1/4)(20).", "k = 3/12 = 1/4. y = (1/4)(20) = 5."),
        practicalChoice("y11adv-var-m10", "If $y$ doubles when $x$ doubles, the relationship is:", "C", ["Inverse variation", "Quadratic variation", "Direct variation", "Constant variation"], "In y = kx, doubling x doubles y — equal proportional increases define direct variation."),
      ],
      masteryQuizPool: [
        { id: "y11adv-var-p1", prompt: "If $y=kx$ and $y=20$ when $x=5$, find $k$.", latex: "k=\\frac{y}{x}=\\frac{20}{5}", answer: "4", difficulty: 1, hint: "$k=y/x$.", explanation: "$20/5=4$." },
        { id: "y11adv-var-p2", prompt: "If $y=k/x$ and $y=10$ when $x=2$, find $k$.", latex: "k=xy=2\\times 10", answer: "20", difficulty: 1, hint: "$k=xy$.", explanation: "$2\\times 10=20$." },
        { id: "y11adv-var-p3", prompt: "Using $y=4x$, find $y$ when $x=6$.", latex: "y=4\\times 6", answer: "24", difficulty: 1, hint: "Substitute.", explanation: "$4(6)=24$." },
        { id: "y11adv-var-p4", prompt: "The equation $y=4x$ describes:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Inverse variation, $k=4$" }, { label: "B", text: "Direct variation, $k=4$" }, { label: "C", text: "Quadratic variation" }, { label: "D", text: "A constant function" }], hint: "Form $y=kx$.", explanation: "$y=kx$ with $k=4$ is direct variation." },
        { id: "y11adv-var-p5", prompt: "If $y=kx$ and $y=16$ when $x=4$, find $k$.", latex: "k=\\frac{16}{4}", answer: "4", difficulty: 1, hint: "$k=y/x$.", explanation: "$16/4=4$." },
        { id: "y11adv-var-p6", prompt: "If $y\\propto x$ and $y=15$ when $x=3$, find $y$ when $x=8$.", latex: "k=\\frac{15}{3}=5", answer: "40", difficulty: 2, hint: "Find $k$, then substitute.", explanation: "$k=5$; $y=5\\times 8=40$." },
        { id: "y11adv-var-p7", prompt: "If $y\\propto 1/x$ and $y=6$ when $x=4$, find $k$.", latex: "k=xy=4\\times 6", answer: "24", difficulty: 2, hint: "$k=xy$.", explanation: "$24$." },
        { id: "y11adv-var-p8", prompt: "If $y=k/x$ and $k=30$, find $y$ when $x=5$.", latex: "y=\\frac{30}{5}", answer: "6", difficulty: 2, hint: "Divide.", explanation: "$30/5=6$." },
        { id: "y11adv-var-p9", prompt: "If $y\\propto x$ and $y=56$ when $x=7$, find $k$.", latex: "k=\\frac{56}{7}", answer: "8", difficulty: 2, hint: "$k=y/x$.", explanation: "$56/7=8$." },
        { id: "y11adv-var-p10", prompt: "The graph of $y=k/x$ with $k>0$ passes through which quadrants?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "I and II" }, { label: "B", text: "I and III" }, { label: "C", text: "II and IV" }, { label: "D", text: "I and IV" }], hint: "Sign of $y$ follows sign of $x$.", explanation: "For $k>0$, the hyperbola lies in quadrants I and III." },
        { id: "y11adv-var-p11", prompt: "Which equation represents inverse variation?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$y=5x$" }, { label: "B", text: "$y=5x+2$" }, { label: "C", text: "$y=\\frac{5}{x}$" }, { label: "D", text: "$y=\\frac{x^2}{5}$" }], hint: "Form $y=k/x$.", explanation: "$y=5/x$ is inverse variation." },
        { id: "y11adv-var-p12", prompt: "If $y=3x$, find $y$ when $x=11$.", latex: "y=3\\times 11", answer: "33", difficulty: 1, hint: "Substitute.", explanation: "$33$." },
        { id: "y11adv-var-p13", prompt: "If $y=20/x$, find $y$ when $x=4$.", latex: "y=\\frac{20}{4}", answer: "5", difficulty: 2, hint: "Divide.", explanation: "$5$." },
        { id: "y11adv-var-p14", prompt: "If $y\\propto x$ and $y=42$ when $x=6$, find $k$.", latex: "k=\\frac{42}{6}", answer: "7", difficulty: 2, hint: "$k=y/x$.", explanation: "$7$." },
        { id: "y11adv-var-p15", prompt: "The graph of $y=kx$ always passes through:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$(0,k)$" }, { label: "B", text: "$(0,0)$" }, { label: "C", text: "$(1,0)$" }, { label: "D", text: "$(k,1)$" }], hint: "Set $x=0$.", explanation: "$y=k(0)=0$, so it passes through the origin." },
        { id: "y11adv-var-p16", prompt: "If $y\\propto 1/x$ and $y=3$ when $x=8$, find $y$ when $x=6$.", latex: "k=24,\\quad y=\\frac{24}{6}", answer: "4", difficulty: 3, hint: "Find $k=xy$, then substitute.", explanation: "$k=24$; $y=24/6=4$." },
        { id: "y11adv-var-p17", prompt: "If $y\\propto x$ and $y=3$ when $x=12$, find $y$ when $x=20$.", latex: "k=\\frac{1}{4},\\quad y=\\frac{1}{4}\\times 20", answer: "5", difficulty: 3, hint: "$k=3/12$.", explanation: "$k=\\frac{1}{4}$; $y=5$." },
        { id: "y11adv-var-p18", prompt: "If $y$ doubles when $x$ doubles, the relationship is:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Inverse variation" }, { label: "B", text: "Quadratic variation" }, { label: "C", text: "Direct variation" }, { label: "D", text: "Constant variation" }], hint: "Proportional change.", explanation: "Doubling together is direct variation." },
        { id: "y11adv-var-p19", prompt: "If $y\\propto 1/x$ and $y=5$ when $x=4$, find $k$.", latex: "k=xy=4\\times 5", answer: "20", difficulty: 2, hint: "$k=xy$.", explanation: "$20$." },
        { id: "y11adv-var-p20", prompt: "Which describes $y=3x+5$?", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "Direct variation, $k=3$" }, { label: "B", text: "Inverse variation" }, { label: "C", text: "Direct variation, $k=5$" }, { label: "D", text: "Not direct variation (non-zero intercept)" }], hint: "Direct variation passes through the origin.", explanation: "The intercept $5$ means it is not direct variation." },
        { id: "y11adv-var-p21", prompt: "If $y\\propto 1/x$ and $y=2$ when $x=9$, find $y$ when $x=3$.", latex: "k=18,\\quad y=\\frac{18}{3}", answer: "6", difficulty: 3, hint: "Find $k=xy$.", explanation: "$k=18$; $y=18/3=6$." },
        { id: "y11adv-var-p22", prompt: "If $y\\propto x$ and the point $(4,10)$ lies on the graph, find $y$ when $x=10$.", latex: "k=\\frac{10}{4}=2.5", answer: "25", difficulty: 3, hint: "$k=2.5$.", explanation: "$y=2.5\\times 10=25$." },
        { id: "y11adv-var-p23", prompt: "For $y=k/x$, if $x$ triples, $y$ becomes:", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Three times larger" }, { label: "B", text: "Unchanged" }, { label: "C", text: "One third as large" }, { label: "D", text: "Nine times larger" }], hint: "Product $xy$ is constant.", explanation: "If $x$ triples, $y$ becomes one third to keep $xy$ constant." },
        { id: "y11adv-var-p24", prompt: "If $y\\propto x$ and $y=18$ when $x=2$, find $x$ when $y=63$.", latex: "k=9,\\quad 63=9x", answer: "7", difficulty: 4, hint: "Find $k=y/x$, then solve.", explanation: "$k=9$; $63=9x$ gives $x=7$." },
        { id: "y11adv-var-p25", prompt: "$P$ varies inversely with $V$. When $V=4$, $P=15$. Find $P$ when $V=10$.", latex: "k=PV=60,\\quad P=\\frac{60}{10}", answer: "6", difficulty: 4, hint: "$k=PV$.", explanation: "$k=60$; $P=60/10=6$." },
        { id: "y11adv-var-p26", prompt: "$y$ varies directly with $x$. Doubling $x$ and the new $y$ is 36. Find the original $y$.", latex: "\\text{new }y=2\\times\\text{old }y=36", answer: "18", difficulty: 5, hint: "Direct variation: doubling $x$ doubles $y$.", explanation: "If the doubled value is 36, the original $y$ is $18$." },
        { id: "y11adv-var-p27", prompt: "$y\\propto 1/x$. When $x=6$, $y=8$. Find $x$ when $y=12$.", latex: "k=48,\\quad 12=\\frac{48}{x}", answer: "4", difficulty: 5, hint: "$k=xy=48$.", explanation: "$12=48/x$ gives $x=4$." },
        { id: "y11adv-var-p28", prompt: "If $y\\propto x$ with $k=\\frac{3}{5}$, find $y$ when $x=25$.", latex: "y=\\frac{3}{5}\\times 25", answer: "15", difficulty: 4, hint: "Multiply.", explanation: "$\\frac{3}{5}\\times 25=15$." },
        { id: "y11adv-var-p29", prompt: "$y$ varies inversely with $x$. The points $(2,30)$ and $(x,12)$ are both on the graph. Find $x$.", latex: "k=60,\\quad 12=\\frac{60}{x}", answer: "5", difficulty: 5, hint: "$k=xy=60$.", explanation: "$12=60/x$ gives $x=5$." },
        { id: "y11adv-var-p30", prompt: "$y\\propto x$ and $y\\propto 1/z$, so $y=\\frac{kx}{z}$. When $x=4,z=2$, $y=10$. Find $k$.", latex: "10=\\frac{k(4)}{2}", answer: "5", difficulty: 5, hint: "Substitute and solve for $k$.", explanation: "$10=2k$ gives $k=5$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-var-mp1",
          prompt: "The variable $y$ varies inversely with $x$, and $y=8$ when $x=3$.",
          latex: "y=\\frac{k}{x},\\quad y=8\\text{ when }x=3",
          answer: "24",
          hint: "For (a) use $k=xy$. For (b) and (c) substitute into $y=k/x$ or solve for $x$.",
          explanation: "(a) $k=3\\times 8=24$. (b) $y=24/6=4$. (c) $2=24/x$ gives $x=12$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the constant of variation $k$.", marks: 1, answer: "24", hint: "$k=xy$.", explanation: "$k=3\\times 8=24$." },
            { key: "b", label: "(b)", prompt: "Find $y$ when $x=6$.", marks: 1, answer: "4", hint: "$y=k/x$.", explanation: "$y=24/6=4$." },
            { key: "c", label: "(c)", prompt: "Find $x$ when $y=2$.", marks: 2, answer: "12", hint: "Solve $2=24/x$.", explanation: "$2=24/x$ gives $x=12$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "circles-semicircles") {
    return {
      ...base,
      description:
        "Derive x² + y² = r² using the distance formula; graph circles centred at the origin; identify and graph upper and lower semicircles y = ±√(r² − x²); determine domain and range.",
      learningIntention:
        "Use the equation x² + y² = r² to describe circles and derive semicircle equations with correct domain and range.",
      successCriteria: [
        "Derive x² + y² = r² from the distance formula applied to a point (x, y) on a circle of radius r.",
        "Verify whether a point lies on a circle by substituting its coordinates.",
        "Write the equations of the upper and lower semicircles from a given circle equation.",
        "State the domain and range of a semicircle.",
      ],
      teaching: {
        paragraphs: [
          "A circle centred at the origin with radius r consists of all points (x, y) whose distance from (0, 0) equals r. Using the distance formula, the distance from (x, y) to the origin is √(x² + y²). Setting this equal to r and squaring both sides gives the circle equation x² + y² = r².",
          "To check whether a point lies on the circle, substitute its coordinates into x² + y² and compare the result with r². If x² + y² = r², the point is on the circle; if it is less, the point is inside; if it is greater, the point is outside.",
          "Rearranging the circle equation for y gives y² = r² − x², so y = ±√(r² − x²). The positive square root y = √(r² − x²) gives only the upper semicircle (y ≥ 0). The equation y = −√(r² − x²) gives only the lower semicircle (y ≤ 0). Neither equation alone is a full circle.",
          "Both semicircles have the same domain: −r ≤ x ≤ r (the expression under the root cannot be negative). The upper semicircle has range 0 ≤ y ≤ r; the lower has range −r ≤ y ≤ 0.",
        ],
        latexBlocks: [
          "x^2 + y^2 = r^2 \\quad \\text{(circle centred at origin, radius } r\\text{)}",
          "y = \\sqrt{r^2 - x^2} \\text{ (upper semicircle)}, \\quad y = -\\sqrt{r^2 - x^2} \\text{ (lower semicircle)}",
          "\\text{Domain: } -r \\le x \\le r, \\quad \\text{Range upper: } 0 \\le y \\le r",
        ],
      },
      workedExamples: [
        {
          title: "Derive the circle equation and verify a point",
          questionLatex: "\\text{Circle centre origin, radius 5. Does }(3,4)\\text{ lie on it?}",
          steps: [
            {
              explanation: "The circle equation is x² + y² = r² = 25.",
              latex: "x^2 + y^2 = 25",
            },
            {
              explanation: "Substitute (3, 4) and check.",
              latex: "3^2 + 4^2 = 9 + 16 = 25 \\checkmark",
            },
          ],
          finalAnswerLatex: "\\text{Yes — }(3,4)\\text{ lies on the circle.}",
        },
        {
          title: "State domain and range of a semicircle",
          questionLatex: "y = \\sqrt{25 - x^2}",
          steps: [
            {
              explanation: "The expression under the root must be non-negative: 25 − x² ≥ 0, so x² ≤ 25.",
              latex: "-5 \\le x \\le 5",
            },
            {
              explanation: "The square root is always non-negative, and its maximum is when x = 0.",
              latex: "0 \\le y \\le 5",
            },
          ],
          finalAnswerLatex: "\\text{Domain: }[-5,5],\\quad \\text{Range: }[0,5]",
        },
        {
          title: "Recover a missing coordinate using the circle condition",
          questionLatex: "\\text{A point }(x,8)\\text{ lies on }x^2+y^2=100\\text{ with }x<0.\\text{ Find }x.",
          steps: [
            {
              explanation: "Substitute the known y-value into the circle equation.",
              latex: "x^2 + 8^2 = 100",
            },
            {
              explanation: "Solve for the squared coordinate first.",
              latex: "x^2 = 100 - 64 = 36",
            },
            {
              explanation: "There are two square roots, so use the given sign condition x < 0.",
              latex: "x = -6",
            },
          ],
          finalAnswerLatex: "x = -6",
        },
      ],
      guidedPractice: [
        qa("y11adv-cir-g1", "A circle centred at the origin has radius 4. What is $r^2$ in its equation $x^2 + y^2 = r^2$?", "r^2 = 4^2", "16", "Square the radius.", "r² = 4² = 16, so the equation is x² + y² = 16."),
        practicalChoice("y11adv-cir-g2", "Does the point $(3,\\,4)$ lie on the circle $x^2 + y^2 = 25$?", "C", ["No, because $3+4 \\ne 25$", "No, because $9+4=13 \\ne 25$", "Yes, because $9+16=25$", "Yes, because $3+4=7<25$"], "Substitute: 3² + 4² = 9 + 16 = 25 = r². The point lies on the circle."),
        practicalChoice("y11adv-cir-g3", "The graph of $y = \\sqrt{r^2 - x^2}$ represents:", "C", ["A full circle", "The lower semicircle ($y \\le 0$)", "The upper semicircle ($y \\ge 0$)", "An ellipse"], "The square root always returns a non-negative value, so y ≥ 0 — this is only the upper half."),
        qa("y11adv-cir-g4", "For the upper semicircle $x^2 + y^2 = 36$, find $y$ when $x = 0$.", "y = \\sqrt{36 - 0^2}", "6", "y = √36.", "y = √(36 − 0) = √36 = 6."),
      ],
      independentPractice: [
        qa("y11adv-cir-i1", "Find the radius of the circle $x^2 + y^2 = 49$.", "r^2 = 49,\\quad r = \\sqrt{49}", "7", "Take the positive square root of 49.", "r = √49 = 7."),
        practicalChoice("y11adv-cir-i2", "What is the domain of $y = \\sqrt{9 - x^2}$?", "B", ["$x \\le 3$", "$-3 \\le x \\le 3$", "$x \\ge 0$", "All real numbers"], "9 − x² ≥ 0 → x² ≤ 9 → −3 ≤ x ≤ 3."),
        qa("y11adv-cir-i3", "Upper semicircle $x^2 + y^2 = 100$. Find $y$ when $x = 6$.", "y = \\sqrt{100 - 6^2} = \\sqrt{64}", "8", "Subtract 36 from 100, then take the square root.", "y = √(100 − 36) = √64 = 8."),
        qa("y11adv-cir-i4", "Lower semicircle: $y = -\\sqrt{25 - x^2}$. Find $y$ when $x = 3$.", "y = -\\sqrt{25 - 9} = -\\sqrt{16}", "-4", "y = −√16.", "y = −√(25 − 9) = −√16 = −4.", ["-4", "−4"]),
        qa("y11adv-cir-i5", "A circle centred at the origin passes through $(5,\\,12)$. Find $r$.", "r^2 = 5^2 + 12^2 = 25 + 144", "13", "r² = 25 + 144 = 169. Take the square root.", "r² = 25 + 144 = 169. r = √169 = 13."),
      ],
      commonMistakes: [
        { mistake: "Treating x² + y² = r² as x + y = r (confusing sum with sum of squares).", fix: "Each coordinate is squared before adding. (3, 4) on a circle of radius 5 satisfies 3² + 4² = 25, not 3 + 4 = 5." },
        { mistake: "Saying y = √(r² − x²) represents a full circle.", fix: "The √ sign always returns a non-negative value, so this equation gives only the upper semicircle." },
        { mistake: "Stating the domain of a semicircle as 0 ≤ x ≤ r instead of −r ≤ x ≤ r.", fix: "The semicircle exists for both positive and negative x. The domain is −r ≤ x ≤ r." },
        { mistake: "Confusing radius r with r² when writing the equation.", fix: "The equation uses r², not r. A circle of radius 5 has equation x² + y² = 25, not x² + y² = 5." },
      ],
      masteryQuiz: [
        qa("y11adv-cir-m1", "A circle has radius 3. What is $r^2$?", "r^2 = 3^2", "9", "Square the radius.", "r² = 9."),
        practicalChoice("y11adv-cir-m2", "Which point lies on $x^2 + y^2 = 25$?", "C", ["$(3,\\,5)$", "$(4,\\,4)$", "$(3,\\,4)$", "$(5,\\,5)$"], "Check (3, 4): 3² + 4² = 9 + 16 = 25 ✓. The others give 34, 32, and 50 respectively."),
        qa("y11adv-cir-m3", "Upper semicircle $x^2 + y^2 = 16$. Find $y$ when $x = 0$.", "y = \\sqrt{16 - 0}", "4", "y = √16.", "y = √16 = 4."),
        qa("y11adv-cir-m4", "Find the largest $x$-value in the domain of $y = \\sqrt{36 - x^2}$.", "-6 \\le x \\le 6", "6", "Domain is −6 ≤ x ≤ 6. Largest value is 6.", "36 − x² ≥ 0 → x² ≤ 36 → −6 ≤ x ≤ 6. Largest x = 6."),
        practicalChoice("y11adv-cir-m5", "The graph of $y = -\\sqrt{r^2 - x^2}$ is:", "C", ["Upper semicircle", "Full circle", "Lower semicircle", "Parabola"], "The negative sign gives y ≤ 0 — this is only the lower half of the circle."),
        qa("y11adv-cir-m6", "The point $(a,\\,0)$ with $a > 0$ lies on $x^2 + y^2 = 64$. Find $a$.", "a^2 + 0 = 64", "8", "a² = 64. Take the positive root.", "a² = 64 → a = 8."),
        qa("y11adv-cir-m7", "A circle centred at origin passes through $(6,\\,8)$. Find $r$.", "r^2 = 6^2 + 8^2 = 36 + 64", "10", "r² = 100. Take the square root.", "r² = 36 + 64 = 100. r = 10."),
        practicalChoice("y11adv-cir-m8", "What is the range of $y = \\sqrt{25 - x^2}$?", "B", ["$-5 \\le y \\le 5$", "$0 \\le y \\le 5$", "$y \\ge 0$", "All real numbers"], "The square root is non-negative and at most 5 (when x = 0). Range: 0 ≤ y ≤ 5."),
        qa("y11adv-cir-m9", "Does $(5,\\,5)$ lie on $x^2 + y^2 = 50$? Enter yes or no.", "5^2 + 5^2 = 25 + 25", "yes", "Check 25 + 25 against r².", "5² + 5² = 25 + 25 = 50 = r². Yes, the point lies on the circle."),
        qa("y11adv-cir-m10", "A circle passes through $(0,\\,11)$. Find its radius.", "r^2 = 0^2 + 11^2 = 121", "11", "r² = 0 + 121 = 121.", "r² = 0² + 11² = 121. r = √121 = 11."),
      ],
      masteryQuizPool: [
        { id: "y11adv-cir-p1", prompt: "A circle has radius 4. What is $r^2$ in $x^2+y^2=r^2$?", latex: "r^2=4^2", answer: "16", difficulty: 1, hint: "Square the radius.", explanation: "$4^2=16$." },
        { id: "y11adv-cir-p2", prompt: "A circle has radius 3. What is $r^2$?", latex: "r^2=3^2", answer: "9", difficulty: 1, hint: "Square the radius.", explanation: "$9$." },
        { id: "y11adv-cir-p3", prompt: "Find the radius of the circle.", latex: "x^2+y^2=49", answer: "7", difficulty: 1, hint: "$r=\\sqrt{49}$.", explanation: "$r=7$." },
        { id: "y11adv-cir-p4", prompt: "Does the point $(3,4)$ lie on $x^2+y^2=25$?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "No, since $3+4\\ne 25$" }, { label: "B", text: "No, since $9+4\\ne 25$" }, { label: "C", text: "Yes, since $9+16=25$" }, { label: "D", text: "Yes, since $3+4<25$" }], hint: "Substitute and compare with $r^2$.", explanation: "$3^2+4^2=25=r^2$, so it lies on the circle." },
        { id: "y11adv-cir-p5", prompt: "The graph of $y=\\sqrt{r^2-x^2}$ represents:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "A full circle" }, { label: "B", text: "The lower semicircle" }, { label: "C", text: "The upper semicircle" }, { label: "D", text: "An ellipse" }], hint: "The root is non-negative.", explanation: "$y\\ge 0$ gives the upper semicircle." },
        { id: "y11adv-cir-p6", prompt: "Upper semicircle $x^2+y^2=36$. Find $y$ when $x=0$.", latex: "y=\\sqrt{36-0}", answer: "6", difficulty: 2, hint: "$\\sqrt{36}$.", explanation: "$y=6$." },
        { id: "y11adv-cir-p7", prompt: "What is the domain of $y=\\sqrt{9-x^2}$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$x\\le 3$" }, { label: "B", text: "$-3\\le x\\le 3$" }, { label: "C", text: "$x\\ge 0$" }, { label: "D", text: "all reals" }], hint: "$9-x^2\\ge 0$.", explanation: "$x^2\\le 9$ gives $-3\\le x\\le 3$." },
        { id: "y11adv-cir-p8", prompt: "Upper semicircle $x^2+y^2=100$. Find $y$ when $x=6$.", latex: "y=\\sqrt{100-36}", answer: "8", difficulty: 3, hint: "$\\sqrt{64}$.", explanation: "$y=\\sqrt{64}=8$." },
        { id: "y11adv-cir-p9", prompt: "Lower semicircle $y=-\\sqrt{25-x^2}$. Find $y$ when $x=3$.", latex: "y=-\\sqrt{25-9}", answer: "-4", difficulty: 3, acceptedAnswers: ["-4", "−4"], hint: "$-\\sqrt{16}$.", explanation: "$y=-\\sqrt{16}=-4$." },
        { id: "y11adv-cir-p10", prompt: "A circle centred at the origin passes through $(5,12)$. Find $r$.", latex: "r^2=25+144", answer: "13", difficulty: 3, hint: "$r^2=25+144=169$.", explanation: "$r=\\sqrt{169}=13$." },
        { id: "y11adv-cir-p11", prompt: "Which point lies on $x^2+y^2=25$?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$(3,5)$" }, { label: "B", text: "$(4,4)$" }, { label: "C", text: "$(3,4)$" }, { label: "D", text: "$(5,5)$" }], hint: "Check $x^2+y^2$.", explanation: "$3^2+4^2=25$." },
        { id: "y11adv-cir-p12", prompt: "Upper semicircle $x^2+y^2=16$. Find $y$ when $x=0$.", latex: "y=\\sqrt{16-0}", answer: "4", difficulty: 2, hint: "$\\sqrt{16}$.", explanation: "$y=4$." },
        { id: "y11adv-cir-p13", prompt: "Find the largest $x$-value in the domain of $y=\\sqrt{36-x^2}$.", latex: "-6\\le x\\le 6", answer: "6", difficulty: 3, hint: "$x^2\\le 36$.", explanation: "$-6\\le x\\le 6$; largest is $6$." },
        { id: "y11adv-cir-p14", prompt: "The graph of $y=-\\sqrt{r^2-x^2}$ is:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Upper semicircle" }, { label: "B", text: "Full circle" }, { label: "C", text: "Lower semicircle" }, { label: "D", text: "Parabola" }], hint: "The sign forces $y\\le 0$.", explanation: "$y\\le 0$ gives the lower semicircle." },
        { id: "y11adv-cir-p15", prompt: "The point $(a,0)$ with $a>0$ lies on $x^2+y^2=64$. Find $a$.", latex: "a^2=64", answer: "8", difficulty: 3, hint: "$a=\\sqrt{64}$.", explanation: "$a=8$." },
        { id: "y11adv-cir-p16", prompt: "A circle passes through $(6,8)$. Find $r$.", latex: "r^2=36+64", answer: "10", difficulty: 3, hint: "$r^2=100$.", explanation: "$r=10$." },
        { id: "y11adv-cir-p17", prompt: "What is the range of $y=\\sqrt{25-x^2}$?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$-5\\le y\\le 5$" }, { label: "B", text: "$0\\le y\\le 5$" }, { label: "C", text: "$y\\ge 0$" }, { label: "D", text: "all reals" }], hint: "Non-negative, max at $x=0$.", explanation: "$0\\le y\\le 5$." },
        { id: "y11adv-cir-p18", prompt: "Does $(5,5)$ lie on $x^2+y^2=50$? Enter yes or no.", latex: "5^2+5^2=50", answer: "yes", difficulty: 2, hint: "Check $25+25$.", explanation: "$25+25=50$, so yes." },
        { id: "y11adv-cir-p19", prompt: "A circle passes through $(0,11)$. Find its radius.", latex: "r^2=0+121", answer: "11", difficulty: 2, hint: "$r=\\sqrt{121}$.", explanation: "$r=11$." },
        { id: "y11adv-cir-p20", prompt: "Find the smallest $x$-value in the domain of $y=\\sqrt{49-x^2}$.", latex: "-7\\le x\\le 7", answer: "-7", difficulty: 3, acceptedAnswers: ["-7", "−7"], hint: "$x^2\\le 49$.", explanation: "$-7\\le x\\le 7$; smallest is $-7$." },
        { id: "y11adv-cir-p21", prompt: "Where does the point $(2,3)$ lie relative to the circle $x^2+y^2=16$?", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "Inside the circle" }, { label: "B", text: "On the circle" }, { label: "C", text: "Outside the circle" }, { label: "D", text: "Cannot be determined" }], hint: "Compare $x^2+y^2$ with $16$.", explanation: "$4+9=13<16$, so the point is inside the circle." },
        { id: "y11adv-cir-p22", prompt: "Where does the point $(3,4)$ lie relative to the circle $x^2+y^2=16$?", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Inside the circle" }, { label: "B", text: "On the circle" }, { label: "C", text: "Outside the circle" }, { label: "D", text: "Cannot be determined" }], hint: "Compare $x^2+y^2$ with $16$.", explanation: "$9+16=25>16$, so the point is outside the circle." },
        { id: "y11adv-cir-p23", prompt: "Write the equation of the circle centred at the origin with radius 6. Enter the right-hand side $r^2$.", latex: "x^2+y^2=r^2", answer: "36", difficulty: 3, hint: "$r=6$.", explanation: "$r^2=36$." },
        { id: "y11adv-cir-p24", prompt: "Upper semicircle $x^2+y^2=169$. Find $y$ when $x=5$.", latex: "y=\\sqrt{169-25}", answer: "12", difficulty: 4, hint: "$\\sqrt{144}$.", explanation: "$y=\\sqrt{144}=12$." },
        { id: "y11adv-cir-p25", prompt: "A point on $x^2+y^2=100$ has $y=6$ and $x>0$. Find $x$.", latex: "x^2+36=100", answer: "8", difficulty: 5, hint: "$x^2=64$.", explanation: "$x^2=64$ gives $x=8$." },
        { id: "y11adv-cir-p26", prompt: "The lower semicircle $y=-\\sqrt{100-x^2}$ has range:", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$0\\le y\\le 10$" }, { label: "B", text: "$-10\\le y\\le 10$" }, { label: "C", text: "$-10\\le y\\le 0$" }, { label: "D", text: "$y\\ge 0$" }], hint: "Outputs are non-positive.", explanation: "$-10\\le y\\le 0$." },
        { id: "y11adv-cir-p27", prompt: "A circle has area equation $x^2+y^2=r^2$ and passes through $(7,24)$. Find $r$.", latex: "r^2=49+576", answer: "25", difficulty: 5, hint: "$r^2=625$.", explanation: "$r=\\sqrt{625}=25$." },
        { id: "y11adv-cir-p28", prompt: "Find the y-value where the upper semicircle $y=\\sqrt{r^2-x^2}$ of radius 5 meets the y-axis.", latex: "x=0,\\quad y=\\sqrt{25}", answer: "5", difficulty: 4, hint: "Set $x=0$.", explanation: "$y=\\sqrt{25}=5$." },
        { id: "y11adv-cir-p29", prompt: "A semicircle $y=\\sqrt{36-x^2}$ passes through $(x,0)$ with $x>0$. Find $x$.", latex: "0=\\sqrt{36-x^2}", answer: "6", difficulty: 5, hint: "Set $y=0$.", explanation: "$36-x^2=0$ gives $x=6$." },
        { id: "y11adv-cir-p30", prompt: "A circle of radius 10 has the point $(x,8)$ on it with $x<0$. Find $x$.", latex: "x^2+64=100,\\quad x<0", answer: "-6", difficulty: 5, acceptedAnswers: ["-6", "−6"], hint: "$x^2=36$, take the negative root.", explanation: "$x^2=36$ gives $x=-6$ (since $x<0$)." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-cir-mp1",
          prompt: "A circle is centred at the origin and passes through the point $(8,6)$.",
          latex: "x^2+y^2=r^2",
          answer: "10",
          hint: "For (a) use $r^2=x^2+y^2$. For (b) the domain of the upper semicircle is $-r\\le x\\le r$. For (c) substitute $x=0$ into the upper semicircle.",
          explanation: "(a) $r=\\sqrt{64+36}=10$. (b) Largest $x$ is $10$. (c) Upper semicircle at $x=0$ gives $y=10$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the radius $r$.", marks: 2, answer: "10", hint: "$r^2=8^2+6^2$.", explanation: "$r^2=64+36=100$, so $r=10$." },
            { key: "b", label: "(b)", prompt: "State the largest $x$-value in the domain of the upper semicircle.", marks: 1, answer: "10", hint: "Domain is $-r\\le x\\le r$.", explanation: "Largest $x$ is $r=10$." },
            { key: "c", label: "(c)", prompt: "Find the $y$-value of the upper semicircle when $x=0$.", marks: 1, answer: "10", hint: "$y=\\sqrt{r^2-0}$.", explanation: "$y=\\sqrt{100}=10$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "piecewise-defined-functions") {
    return {
      ...base,
      description:
        "Interpret and graph piecewise-defined functions; evaluate piecewise rules at specific inputs; determine domain, range and continuity; test for even or odd symmetry.",
      learningIntention:
        "Evaluate, interpret and classify piecewise-defined functions, including identifying continuity and symmetry.",
      successCriteria: [
        "Evaluate a piecewise function at a given input by selecting the correct rule.",
        "State the domain and range of a piecewise-defined function.",
        "Determine whether a piecewise function is continuous at a boundary point.",
        "Test whether a piecewise function is even, odd or neither using the f(−x) test.",
      ],
      teaching: {
        paragraphs: [
          "A piecewise-defined function uses different rules on different parts of its domain. Each rule applies only to the inputs in its specified interval. To evaluate f(a), find which interval contains a and use only that rule.",
          "Pay careful attention to strict inequalities (< or >) versus non-strict inequalities (≤ or ≥) at boundary values. The boundary value belongs to exactly one piece — whichever uses ≤ or ≥ at that value.",
          "A piecewise function is continuous if its pieces join without gaps or jumps. At each boundary value x = a, calculate the output from each piece: if both give the same value, the function is continuous there. If they differ, the function is discontinuous at x = a.",
          "To test for even or odd symmetry, apply the f(−x) test to every piece. If f(−x) = f(x) for all x in the domain, the function is even. If f(−x) = −f(x) for all x, it is odd. If neither condition holds for all x, the function is neither even nor odd.",
        ],
        latexBlocks: [
          "f(x) = \\begin{cases} g(x) & x < a \\\\ h(x) & x \\ge a \\end{cases}",
          "\\text{Even: } f(-x) = f(x) \\text{ for all } x \\quad \\text{Odd: } f(-x) = -f(x) \\text{ for all } x",
          "\\text{Continuous at } x=a \\text{ if output from each side equals } f(a)",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a piecewise function at two inputs",
          questionLatex: "f(x) = \\begin{cases} 2x & x < 0 \\\\ x^2+1 & x \\ge 0 \\end{cases}, \\quad f(3) \\text{ and } f(-2)",
          steps: [
            {
              explanation: "For f(3): x = 3 ≥ 0, so use the rule x² + 1.",
              latex: "f(3) = 3^2 + 1 = 10",
            },
            {
              explanation: "For f(−2): x = −2 < 0, so use the rule 2x.",
              latex: "f(-2) = 2(-2) = -4",
            },
          ],
          finalAnswerLatex: "f(3) = 10, \\quad f(-2) = -4",
        },
        {
          title: "Test continuity at a boundary",
          questionLatex: "f(x) = \\begin{cases} x+4 & x < 1 \\\\ 2x+3 & x \\ge 1 \\end{cases}",
          steps: [
            {
              explanation: "Evaluate the left-side rule as x approaches 1.",
              latex: "\\lim_{x \\to 1^-} (x+4) = 1+4 = 5",
            },
            {
              explanation: "Evaluate the right-side rule at x = 1.",
              latex: "f(1) = 2(1)+3 = 5",
            },
            {
              explanation: "Both sides give 5, so the function is continuous at x = 1.",
            },
          ],
          finalAnswerLatex: "\\text{Continuous at }x=1 \\text{ (both sides equal 5)}",
        },
        {
          title: "Test whether a piecewise function is odd",
          questionLatex: "f(x) = \\begin{cases} x^2 & x \\ge 0 \\\\ -x^2 & x < 0 \\end{cases}",
          steps: [
            {
              explanation: "Compute f(−x) using the appropriate piece for each region.",
              latex: "f(-x) = -(-x)^2 = -x^2 \\quad (\\text{when } {-x} < 0 \\text{, i.e. } x > 0)",
            },
            {
              explanation: "Compare f(−x) with −f(x). For x > 0: f(x) = x², so −f(x) = −x².",
              latex: "f(-x) = -x^2 = -f(x) \\checkmark",
            },
          ],
          finalAnswerLatex: "f \\text{ is odd}",
        },
      ],
      guidedPractice: [
        qa("y11adv-piece-g1", "Evaluate $f(3)$ for the displayed piecewise function.", "f(x) = \\begin{cases} 2x & x < 0 \\\\ x^2+1 & x \\ge 0 \\end{cases}", "10", "x = 3 ≥ 0, so use the rule x² + 1.", "Since 3 ≥ 0, use f(x) = x² + 1: f(3) = 9 + 1 = 10."),
        qa("y11adv-piece-g2", "Evaluate $f(-2)$ for the displayed piecewise function.", "f(x) = \\begin{cases} 2x & x < 0 \\\\ x^2+1 & x \\ge 0 \\end{cases}", "-4", "x = −2 < 0, so use the rule 2x.", "Since −2 < 0, use f(x) = 2x: f(−2) = 2(−2) = −4.", ["-4", "−4"]),
        practicalChoice("y11adv-piece-g3", "A piecewise function's pieces join without any gap or jump at the boundary. This means the function is:", "B", ["Discontinuous", "Continuous", "Undefined at the boundary", "Neither odd nor even"], "When output values from both sides of a boundary are equal, the function is continuous — its graph has no gap or jump."),
        practicalChoice("y11adv-piece-g4", "The function $f(x) = \\begin{cases} 1/x & x < -1 \\\\ x+2 & x > 1 \\end{cases}$ is not defined for:", "D", ["$x=-1$ only", "$x=1$ only", "$x=0$ only", "$-1 \\le x \\le 1$"], "The function is only defined for x < −1 and x > 1. Every value in the closed interval [−1, 1] is excluded from the domain."),
      ],
      independentPractice: [
        qa("y11adv-piece-i1", "Evaluate $f(2)$ for the displayed piecewise function.", "f(x) = \\begin{cases} x+5 & x \\le 2 \\\\ 3x-1 & x > 2 \\end{cases}", "7", "x = 2 satisfies x ≤ 2, so use x + 5.", "Since 2 ≤ 2, use f(x) = x + 5: f(2) = 2 + 5 = 7."),
        qa("y11adv-piece-i2", "Evaluate $f(4)$ for the displayed piecewise function.", "f(x) = \\begin{cases} x+5 & x \\le 2 \\\\ 3x-1 & x > 2 \\end{cases}", "11", "x = 4 > 2, so use 3x − 1.", "Since 4 > 2, use f(x) = 3x − 1: f(4) = 12 − 1 = 11."),
        practicalChoice("y11adv-piece-i3", "For $f(x) = \\begin{cases} x^2 & x \\ge 0 \\\\ -x^2 & x < 0 \\end{cases}$, we find $f(-x) = -f(x)$ for all $x$. The function is:", "B", ["Even", "Odd", "Neither", "Both even and odd"], "f(−x) = −f(x) is the defining condition for an odd function. The function has origin symmetry."),
        qa("y11adv-piece-i4", "Evaluate $f(-5)$ for the displayed function.", "f(x) = \\begin{cases} 3 & x < 0 \\\\ 0 & x = 0 \\\\ -3 & x > 0 \\end{cases}", "3", "x = −5 < 0, use the rule for negative x.", "Since −5 < 0, f(−5) = 3."),
        qa("y11adv-piece-i5", "Evaluate $f(5)$ for the displayed function.", "f(x) = \\begin{cases} x+3 & x < 2 \\\\ 7 & x \\ge 2 \\end{cases}", "7", "x = 5 ≥ 2, so use the constant rule.", "Since 5 ≥ 2, f(5) = 7."),
      ],
      commonMistakes: [
        { mistake: "Using the wrong piece when a boundary value can appear in two conditions.", fix: "Only one inequality at each boundary can include equality. The boundary belongs to the piece that uses ≤ or ≥ at that value." },
        { mistake: "Evaluating all pieces and combining or averaging the outputs.", fix: "Only one rule applies at each x-value. Find which interval contains x and apply that rule alone." },
        { mistake: "Assuming a piecewise function is always discontinuous.", fix: "A piecewise function is continuous if outputs match at every boundary. The piecewise form does not automatically mean discontinuous." },
        { mistake: "Applying the even/odd test to only one piece rather than checking all pieces.", fix: "f(−x) = ±f(x) must hold for every x in the domain — verify the test on both pieces and at boundary values." },
      ],
      masteryQuiz: [
        qa("y11adv-piece-m1", "Evaluate $f(-3)$ for the displayed function.", "f(x) = \\begin{cases} 2x+1 & x < 0 \\\\ x-3 & x \\ge 0 \\end{cases}", "-5", "x = −3 < 0, use 2x + 1.", "f(−3) = 2(−3) + 1 = −6 + 1 = −5.", ["-5", "−5"]),
        qa("y11adv-piece-m2", "Evaluate $f(0)$ for the displayed function.", "f(x) = \\begin{cases} 2x+1 & x < 0 \\\\ x-3 & x \\ge 0 \\end{cases}", "-3", "x = 0 ≥ 0, use x − 3.", "f(0) = 0 − 3 = −3.", ["-3", "−3"]),
        qa("y11adv-piece-m3", "Evaluate $f(3)$ for the displayed function.", "f(x) = \\begin{cases} x^2-1 & x \\le 3 \\\\ 2x+5 & x > 3 \\end{cases}", "8", "x = 3 satisfies x ≤ 3, use x² − 1.", "f(3) = 3² − 1 = 9 − 1 = 8."),
        qa("y11adv-piece-m4", "Evaluate $f(5)$ for the displayed function.", "f(x) = \\begin{cases} x^2-1 & x \\le 3 \\\\ 2x+5 & x > 3 \\end{cases}", "15", "x = 5 > 3, use 2x + 5.", "f(5) = 2(5) + 5 = 10 + 5 = 15."),
        practicalChoice("y11adv-piece-m5", "The function $f(x) = x^2$ satisfies $f(-x) = x^2 = f(x)$ for all $x$. It is:", "B", ["Odd", "Even", "Neither", "Piecewise only"], "f(−x) = (−x)² = x² = f(x) for all x confirms the function is even."),
        practicalChoice("y11adv-piece-m6", "The constant function $f(x) = 3$ for all $x$ satisfies $f(-x) = ?$", "B", ["$-3$", "$3$", "$0$", "Undefined"], "f(−x) = 3 = f(x) for all x. The constant function is even."),
        qa("y11adv-piece-m7", "For $f(x) = \\begin{cases} x+4 & x < 1 \\\\ 2x+3 & x \\ge 1 \\end{cases}$, find the common boundary value (from each side at $x = 1$).", "\\lim_{x \\to 1^-}(x+4)=5,\\quad f(1)=2(1)+3=5", "5", "Evaluate each piece at x = 1 and compare.", "Left: 1 + 4 = 5. Right: 2(1) + 3 = 5. Both equal 5, so f is continuous at x = 1. The common value is 5."),
        practicalChoice("y11adv-piece-m8", "Which piecewise rule is equivalent to $|x|$?", "B", ["$f(x)=\\begin{cases} -x & x \\ge 0 \\\\ x & x < 0 \\end{cases}$", "$f(x)=\\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}$", "$f(x)=x$ for all $x$", "$f(x)=x^2$ for all $x$"], "|x| returns x for non-negative inputs and −x for negative inputs. This matches option B."),
        qa("y11adv-piece-m9", "Evaluate $f(-7)$ for $f(x) = \\begin{cases} x & x > 0 \\\\ -x & x < 0 \\\\ 0 & x = 0 \\end{cases}$.", "f(x) = |x|", "7", "x = −7 < 0, so f(−7) = −(−7).", "Since −7 < 0, use f(x) = −x: f(−7) = −(−7) = 7."),
        practicalChoice("y11adv-piece-m10", "The domain of $f(x) = \\begin{cases} 1/(x-2) & x > 3 \\\\ x+1 & x \\le 1 \\end{cases}$ is:", "C", ["All real numbers", "$x \\ne 2$", "$x > 3$ or $x \\le 1$", "$1 < x < 3$"], "The function is defined only where x > 3 or x ≤ 1. The interval (1, 3] is not covered by either piece."),
      ],
      masteryQuizPool: [
        { id: "y11adv-piece-p1", prompt: "Evaluate $f(3)$ for the displayed function.", latex: "f(x)=\\begin{cases} 2x & x<0 \\\\ x^2+1 & x\\ge 0 \\end{cases}", answer: "10", difficulty: 1, hint: "$3\\ge 0$, use $x^2+1$.", explanation: "$3^2+1=10$." },
        { id: "y11adv-piece-p2", prompt: "Evaluate $f(-2)$ for the displayed function.", latex: "f(x)=\\begin{cases} 2x & x<0 \\\\ x^2+1 & x\\ge 0 \\end{cases}", answer: "-4", difficulty: 1, acceptedAnswers: ["-4", "−4"], hint: "$-2<0$, use $2x$.", explanation: "$2(-2)=-4$." },
        { id: "y11adv-piece-p3", prompt: "Evaluate $f(2)$ for the displayed function.", latex: "f(x)=\\begin{cases} x+5 & x\\le 2 \\\\ 3x-1 & x>2 \\end{cases}", answer: "7", difficulty: 1, hint: "$2\\le 2$, use $x+5$.", explanation: "$2+5=7$." },
        { id: "y11adv-piece-p4", prompt: "Evaluate $f(4)$ for the displayed function.", latex: "f(x)=\\begin{cases} x+5 & x\\le 2 \\\\ 3x-1 & x>2 \\end{cases}", answer: "11", difficulty: 2, hint: "$4>2$, use $3x-1$.", explanation: "$3(4)-1=11$." },
        { id: "y11adv-piece-p5", prompt: "Evaluate $f(-3)$ for the displayed function.", latex: "f(x)=\\begin{cases} 2x+1 & x<0 \\\\ x-3 & x\\ge 0 \\end{cases}", answer: "-5", difficulty: 2, acceptedAnswers: ["-5", "−5"], hint: "$-3<0$, use $2x+1$.", explanation: "$2(-3)+1=-5$." },
        { id: "y11adv-piece-p6", prompt: "Evaluate $f(0)$ for the displayed function.", latex: "f(x)=\\begin{cases} 2x+1 & x<0 \\\\ x-3 & x\\ge 0 \\end{cases}", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "$0\\ge 0$, use $x-3$.", explanation: "$0-3=-3$." },
        { id: "y11adv-piece-p7", prompt: "Evaluate $f(3)$ for the displayed function.", latex: "f(x)=\\begin{cases} x^2-1 & x\\le 3 \\\\ 2x+5 & x>3 \\end{cases}", answer: "8", difficulty: 2, hint: "$3\\le 3$, use $x^2-1$.", explanation: "$3^2-1=8$." },
        { id: "y11adv-piece-p8", prompt: "Evaluate $f(5)$ for the displayed function.", latex: "f(x)=\\begin{cases} x^2-1 & x\\le 3 \\\\ 2x+5 & x>3 \\end{cases}", answer: "15", difficulty: 2, hint: "$5>3$, use $2x+5$.", explanation: "$2(5)+5=15$." },
        { id: "y11adv-piece-p9", prompt: "Pieces join with no gap at a boundary. The function is:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Discontinuous" }, { label: "B", text: "Continuous" }, { label: "C", text: "Undefined there" }, { label: "D", text: "Neither odd nor even" }], hint: "Matching outputs.", explanation: "Equal outputs at the boundary means continuous." },
        { id: "y11adv-piece-p10", prompt: "For $f(x)=\\begin{cases} x^2 & x\\ge 0 \\\\ -x^2 & x<0 \\end{cases}$, since $f(-x)=-f(x)$, it is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Even" }, { label: "B", text: "Odd" }, { label: "C", text: "Neither" }, { label: "D", text: "Both" }], hint: "$f(-x)=-f(x)$ defines odd.", explanation: "It is odd." },
        { id: "y11adv-piece-p11", prompt: "Evaluate $f(-5)$ for the displayed function.", latex: "f(x)=\\begin{cases} 3 & x<0 \\\\ 0 & x=0 \\\\ -3 & x>0 \\end{cases}", answer: "3", difficulty: 2, hint: "$-5<0$.", explanation: "$f(-5)=3$." },
        { id: "y11adv-piece-p12", prompt: "Evaluate $f(5)$ for the displayed function.", latex: "f(x)=\\begin{cases} x+3 & x<2 \\\\ 7 & x\\ge 2 \\end{cases}", answer: "7", difficulty: 2, hint: "$5\\ge 2$, constant rule.", explanation: "$f(5)=7$." },
        { id: "y11adv-piece-p13", prompt: "The function $f(x)=x^2$ satisfies $f(-x)=f(x)$. It is:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Odd" }, { label: "B", text: "Even" }, { label: "C", text: "Neither" }, { label: "D", text: "Piecewise only" }], hint: "$f(-x)=f(x)$.", explanation: "Even." },
        { id: "y11adv-piece-p14", prompt: "The constant function $f(x)=3$ satisfies $f(-x)=?$", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$-3$" }, { label: "B", text: "$3$" }, { label: "C", text: "$0$" }, { label: "D", text: "Undefined" }], hint: "Constant for all $x$.", explanation: "$f(-x)=3$." },
        { id: "y11adv-piece-p15", prompt: "For $f(x)=\\begin{cases} x+4 & x<1 \\\\ 2x+3 & x\\ge 1 \\end{cases}$, find the common value at $x=1$.", latex: "\\lim_{x\\to 1^-}(x+4),\\ f(1)", answer: "5", difficulty: 3, hint: "Evaluate each piece at $x=1$.", explanation: "Both give $5$, so continuous; common value $5$." },
        { id: "y11adv-piece-p16", prompt: "Which piecewise rule equals $|x|$?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\begin{cases} -x & x\\ge 0 \\\\ x & x<0 \\end{cases}$" }, { label: "B", text: "$\\begin{cases} x & x\\ge 0 \\\\ -x & x<0 \\end{cases}$" }, { label: "C", text: "$x$ for all $x$" }, { label: "D", text: "$x^2$ for all $x$" }], hint: "Distance from zero.", explanation: "$|x|$ is $x$ for $x\\ge 0$ and $-x$ for $x<0$." },
        { id: "y11adv-piece-p17", prompt: "Evaluate $f(-7)$ for $f(x)=\\begin{cases} x & x>0 \\\\ -x & x<0 \\\\ 0 & x=0 \\end{cases}$.", latex: "f(x)=|x|", answer: "7", difficulty: 3, hint: "$-7<0$, use $-x$.", explanation: "$-(-7)=7$." },
        { id: "y11adv-piece-p18", prompt: "The function $\\begin{cases} 1/x & x<-1 \\\\ x+2 & x>1 \\end{cases}$ is undefined for:", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$x=-1$ only" }, { label: "B", text: "$x=1$ only" }, { label: "C", text: "$x=0$ only" }, { label: "D", text: "$-1\\le x\\le 1$" }], hint: "Which inputs no piece covers.", explanation: "No piece covers $[-1,1]$." },
        { id: "y11adv-piece-p19", prompt: "The domain of $\\begin{cases} 1/(x-2) & x>3 \\\\ x+1 & x\\le 1 \\end{cases}$ is:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "all reals" }, { label: "B", text: "$x\\ne 2$" }, { label: "C", text: "$x>3$ or $x\\le 1$" }, { label: "D", text: "$1<x<3$" }], hint: "Combine the two intervals.", explanation: "Defined only for $x>3$ or $x\\le 1$." },
        { id: "y11adv-piece-p20", prompt: "Evaluate $f(1)$ for $f(x)=\\begin{cases} 4x & x<1 \\\\ x^2 & x\\ge 1 \\end{cases}$.", latex: "f(x)=\\begin{cases} 4x & x<1 \\\\ x^2 & x\\ge 1 \\end{cases}", answer: "1", difficulty: 3, hint: "$1\\ge 1$, use $x^2$.", explanation: "$1^2=1$." },
        { id: "y11adv-piece-p21", prompt: "For $f(x)=\\begin{cases} x+a & x<2 \\\\ 3x & x\\ge 2 \\end{cases}$ to be continuous at $x=2$, find $a$.", latex: "2+a=6", answer: "4", difficulty: 4, hint: "Set left piece equal to right at $x=2$.", explanation: "$2+a=3(2)=6$ gives $a=4$." },
        { id: "y11adv-piece-p22", prompt: "For $f(x)=\\begin{cases} 2x+1 & x<3 \\\\ x+b & x\\ge 3 \\end{cases}$ to be continuous at $x=3$, find $b$.", latex: "2(3)+1=3+b", answer: "4", difficulty: 4, hint: "Match the pieces at $x=3$.", explanation: "$7=3+b$ gives $b=4$." },
        { id: "y11adv-piece-p23", prompt: "Is $f(x)=\\begin{cases} x+1 & x<1 \\\\ 3 & x\\ge 1 \\end{cases}$ continuous at $x=1$? Enter yes or no.", latex: "\\lim_{x\\to 1^-}(x+1),\\ f(1)=3", answer: "no", difficulty: 4, hint: "Compare the two outputs at $x=1$.", explanation: "Left gives $2$, right gives $3$; not equal, so no." },
        { id: "y11adv-piece-p24", prompt: "Evaluate $f(-1)+f(1)$ for $f(x)=\\begin{cases} -2x & x<0 \\\\ x+4 & x\\ge 0 \\end{cases}$.", latex: "f(-1),\\ f(1)", answer: "7", difficulty: 4, hint: "Evaluate each, then add.", explanation: "$f(-1)=2$ and $f(1)=5$; $2+5=7$." },
        { id: "y11adv-piece-p25", prompt: "For $f(x)=\\begin{cases} x^2 & x\\ge 0 \\\\ -x^2 & x<0 \\end{cases}$, find $f(-3)$.", latex: "f(x)=\\begin{cases} x^2 & x\\ge 0 \\\\ -x^2 & x<0 \\end{cases}", answer: "-9", difficulty: 4, acceptedAnswers: ["-9", "−9"], hint: "$-3<0$, use $-x^2$.", explanation: "$-(-3)^2=-9$." },
        { id: "y11adv-piece-p26", prompt: "For continuity of $f(x)=\\begin{cases} ax & x<2 \\\\ x+6 & x\\ge 2 \\end{cases}$ at $x=2$, find $a$.", latex: "2a=8", answer: "4", difficulty: 5, hint: "Match pieces at $x=2$.", explanation: "$2a=2+6=8$ gives $a=4$." },
        { id: "y11adv-piece-p27", prompt: "Evaluate $f(f(-1))$ for $f(x)=\\begin{cases} x+5 & x<0 \\\\ 2x & x\\ge 0 \\end{cases}$.", latex: "f(f(-1))", answer: "8", difficulty: 5, hint: "Find $f(-1)$ first, then apply $f$ again.", explanation: "$f(-1)=4$; then $f(4)=2(4)=8$." },
        { id: "y11adv-piece-p28", prompt: "A piecewise function has $f(x)=x^2$ for $0\\le x\\le 3$. Enter its maximum output on this interval.", latex: "0\\le x\\le 3", answer: "9", difficulty: 4, hint: "Largest output at the endpoint.", explanation: "$f(3)=9$ is the maximum on $[0,3]$." },
        { id: "y11adv-piece-p29", prompt: "Evaluate $f(f(3))$ for $f(x)=\\begin{cases} x-5 & x\\ge 2 \\\\ x+1 & x<2 \\end{cases}$.", latex: "f(f(3))", answer: "-1", difficulty: 5, acceptedAnswers: ["-1", "−1"], hint: "$f(3)=-2$, then apply $f$.", explanation: "$f(3)=3-5=-2$; $-2<2$, so $f(-2)=-2+1=-1$." },
        { id: "y11adv-piece-p30", prompt: "For $f(x)=\\begin{cases} x^2 & x\\le 1 \\\\ 2x-1 & x>1 \\end{cases}$, is it continuous at $x=1$? Enter yes or no.", latex: "1^2,\\ 2(1)-1", answer: "yes", difficulty: 5, hint: "Compare $1^2$ and $2(1)-1$.", explanation: "Both equal $1$, so yes, continuous." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-piece-mp1",
          prompt: "Consider $f(x)=\\begin{cases} 2x+1 & x<2 \\\\ x^2-1 & x\\ge 2 \\end{cases}$.",
          latex: "f(x)=\\begin{cases} 2x+1 & x<2 \\\\ x^2-1 & x\\ge 2 \\end{cases}",
          answer: "1",
          hint: "For (a) use $x<2$ piece. For (b) use $x\\ge 2$ piece. For (c) compare the two outputs at the boundary $x=2$.",
          explanation: "(a) $f(0)=1$. (b) $f(3)=8$. (c) at $x=2$: left rule gives $5$, right gives $3$, so it is discontinuous (enter 0).",
          parts: [
            { key: "a", label: "(a)", prompt: "Evaluate $f(0)$.", marks: 1, answer: "1", hint: "$0<2$, use $2x+1$.", explanation: "$2(0)+1=1$." },
            { key: "b", label: "(b)", prompt: "Evaluate $f(3)$.", marks: 1, answer: "8", hint: "$3\\ge 2$, use $x^2-1$.", explanation: "$3^2-1=8$." },
            { key: "c", label: "(c)", prompt: "Find the value of the right-hand piece $x^2-1$ at $x=2$.", marks: 2, answer: "3", hint: "Substitute $x=2$ into $x^2-1$.", explanation: "$2^2-1=3$. (The left rule would give $2(2)+1=5$, so the function jumps at $x=2$.)" },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "quadratic-inequalities") {
    return {
      ...base,
      description:
        "Solve quadratic inequalities by factorising to find roots, then using the parabola's sign to determine where the expression is positive or negative.",
      learningIntention:
        "Use the graph of a quadratic to identify where it is positive or negative, and express the solution to a quadratic inequality using correct notation.",
      successCriteria: [
        "Find the roots of a quadratic expression by factorisation.",
        "State that an upward parabola is negative between its roots and positive outside them.",
        "Solve and express the solution to a quadratic inequality such as ax² + bx + c < 0 or > 0.",
        "Identify the integer solutions in the solution set of a quadratic inequality.",
      ],
      teaching: {
        paragraphs: [
          "A quadratic inequality asks: for which values of x is the quadratic expression positive, negative, zero, or a mixture? The key is first to find the roots of f(x), then read the sign from the parabola.",
          "For an upward-opening parabola y = (x − a)(x − b) with a < b: the parabola dips below the x-axis between the roots. So f(x) < 0 for a < x < b, and f(x) > 0 for x < a or x > b.",
          "To solve a quadratic inequality: (1) rearrange so one side is 0; (2) factorise to find the roots; (3) reason about the parabola sign; (4) write the solution. For ≤ or ≥, include the roots.",
          "Check by substituting a value inside the claimed solution set. If the value makes the inequality true, the solution is correct.",
        ],
        latexBlocks: [
          "(x-a)(x-b) < 0 \\Rightarrow a < x < b \\quad (\\text{between the roots})",
          "(x-a)(x-b) > 0 \\Rightarrow x < a \\text{ or } x > b \\quad (\\text{outside the roots})",
        ],
      },
      workedExamples: [
        {
          title: "Solve a quadratic inequality (< 0)",
          questionLatex: "\\text{Solve } x^2 - 5x + 6 < 0",
          steps: [
            { explanation: "Factorise to find the roots.", latex: "x^2-5x+6=(x-2)(x-3)" },
            { explanation: "Roots at x = 2 and x = 3.", latex: "x=2 \\text{ or } x=3" },
            { explanation: "Upward parabola is negative between its roots.", latex: "x^2-5x+6 < 0 \\text{ for } 2 < x < 3" },
          ],
          finalAnswerLatex: "2 < x < 3",
        },
        {
          title: "Solve a quadratic inequality (> 0)",
          questionLatex: "\\text{Solve } x^2 - 5x + 6 > 0",
          steps: [
            { explanation: "Same roots: x = 2 and x = 3.", latex: "(x-2)(x-3) > 0" },
            { explanation: "Upward parabola is positive outside its roots.", latex: "x < 2 \\text{ or } x > 3" },
          ],
          finalAnswerLatex: "x < 2 \\text{ or } x > 3",
        },
        {
          title: "Find integers in the solution set",
          questionLatex: "\\text{Find all integers satisfying } x^2 - 5x + 4 < 0",
          steps: [
            { explanation: "Factorise: roots at x = 1 and x = 4.", latex: "(x-1)(x-4) < 0" },
            { explanation: "Solution: 1 < x < 4.", latex: "1 < x < 4" },
            { explanation: "Integers strictly between 1 and 4.", latex: "x \\in \\{2,\\,3\\}" },
          ],
          finalAnswerLatex: "x \\in \\{2,\\,3\\}",
        },
      ],
      guidedPractice: [
        qa("y11adv-qi-g1", "Solve $x^2-5x+6=0$. Enter the smaller root.", "x^2-5x+6=(x-2)(x-3)=0", "2", "Factorise as (x−2)(x−3)=0.", "x²−5x+6=(x−2)(x−3). Roots: x=2 and x=3. Smaller = 2."),
        qa("y11adv-qi-g2", "Solve $x^2-5x+6=0$. Enter the larger root.", "x^2-5x+6=(x-2)(x-3)=0", "3", "Roots are x=2 and x=3.", "Larger root = 3."),
        practicalChoice("y11adv-qi-g3", "Which values of $x$ satisfy $x^2-5x+6<0$?", "B", ["$x<2$ or $x>3$", "$2<x<3$", "$x<3$", "$x>2$"], "The upward parabola is below zero between its roots. So the solution is 2 < x < 3.", "x^2-5x+6<0"),
        practicalChoice("y11adv-qi-g4", "Which values of $x$ satisfy $x^2-5x+6>0$?", "A", ["$x<2$ or $x>3$", "$2<x<3$", "$x>3$ only", "$x<2$ only"], "The upward parabola is above zero outside its roots. So the solution is x < 2 or x > 3.", "x^2-5x+6>0"),
      ],
      independentPractice: [
        qa("y11adv-qi-i1", "Solve $x^2-4x+3=0$. Enter the smaller root.", "x^2-4x+3=(x-1)(x-3)=0", "1", "Factorise: (x−1)(x−3)=0.", "x²−4x+3=(x−1)(x−3). Roots: 1 and 3. Smaller = 1."),
        qa("y11adv-qi-i2", "Solve $x^2-4x+3=0$. Enter the larger root.", "x^2-4x+3=(x-1)(x-3)=0", "3", "The roots are x=1 and x=3.", "Larger root = 3."),
        practicalChoice("y11adv-qi-i3", "Solve $(x-1)(x-3)<0$.", "B", ["$x<1$ or $x>3$", "$1<x<3$", "$x>1$", "$x<3$"], "Negative between the roots 1 and 3. Solution: 1 < x < 3.", "(x-1)(x-3)<0"),
        practicalChoice("y11adv-qi-i4", "Solve $x(x-4)\\geq 0$.", "D", ["$0\\leq x\\leq 4$", "$x>4$", "$0<x<4$", "$x\\leq 0$ or $x\\geq 4$"], "Roots at 0 and 4. The upward parabola is non-negative on or outside the roots: x ≤ 0 or x ≥ 4.", "x(x-4)\\geq 0"),
        qa("y11adv-qi-i5", "Find the largest integer satisfying $x^2-5x+4<0$.", "(x-1)(x-4)<0 \\Rightarrow 1<x<4", "3", "Solution is 1 < x < 4. Integers strictly inside: 2 and 3.", "1 < x < 4. Integers: 2 and 3. Largest = 3."),
      ],
      commonMistakes: [
        { mistake: "Writing x < 2 or x < 3 instead of 2 < x < 3 for (x−2)(x−3) < 0.", fix: "The parabola is negative between the roots, not to the left of both. The correct solution is 2 < x < 3." },
        { mistake: "Forgetting to rearrange so one side is zero before factorising.", fix: "Always rewrite as f(x) > 0 or f(x) < 0 first. For example, x² > 3x becomes x²−3x > 0 = x(x−3) > 0." },
        { mistake: "Reversing the direction — writing outside the roots when the expression should be negative.", fix: "Draw a quick sketch. The upward parabola is below zero between the roots (for < 0) and above zero outside them (for > 0)." },
        { mistake: "Including endpoints when strict inequality (< or >) is used.", fix: "Strict inequalities exclude roots. Non-strict (≤ ≥) include them. Always check the inequality symbol." },
      ],
      masteryQuiz: [
        qa("y11adv-qi-m1", "Solve $x^2+x-6=0$. Enter the smaller root.", "x^2+x-6=(x+3)(x-2)=0", "-3", "Factorise: (x+3)(x−2)=0. Roots: −3 and 2.", "Smaller root = −3.", ["-3", "−3"]),
        qa("y11adv-qi-m2", "Solve $x^2+x-6=0$. Enter the larger root.", "x^2+x-6=(x+3)(x-2)=0", "2", "Roots are −3 and 2.", "Larger root = 2."),
        practicalChoice("y11adv-qi-m3", "Solve $(x+3)(x-2)>0$.", "A", ["$x<-3$ or $x>2$", "$-3<x<2$", "$x>2$", "$x<-3$"], "Positive outside the roots at −3 and 2. Solution: x < −3 or x > 2.", "(x+3)(x-2)>0"),
        practicalChoice("y11adv-qi-m4", "Solve $x^2+x-6<0$.", "B", ["$x<-3$ or $x>2$", "$-3<x<2$", "$x>-3$", "$x<2$"], "Negative between the roots at −3 and 2. Solution: −3 < x < 2.", "x^2+x-6<0"),
        qa("y11adv-qi-m5", "Solve $x^2-9=0$. Enter the smaller root.", "x^2-9=(x-3)(x+3)=0", "-3", "Difference of two squares: (x−3)(x+3)=0. Roots: 3 and −3.", "Smaller root = −3.", ["-3", "−3"]),
        practicalChoice("y11adv-qi-m6", "Solve $x^2\\leq 9$.", "C", ["$x\\leq 3$", "$x\\geq -3$", "$-3\\leq x\\leq 3$", "$x\\leq -3$ or $x\\geq 3$"], "x²−9≤0. Roots ±3. Non-strict inequality: between and including roots → −3 ≤ x ≤ 3.", "x^2\\leq 9"),
        qa("y11adv-qi-m7", "Solve $x^2-7x+6=0$. Enter the larger root.", "x^2-7x+6=(x-1)(x-6)=0", "6", "Factorise: (x−1)(x−6)=0. Roots 1 and 6.", "Larger root = 6."),
        practicalChoice("y11adv-qi-m8", "Solve $(x-2)^2>0$.", "B", ["All real $x$", "$x\\neq 2$", "$x>2$", "$x<2$"], "(x−2)²=0 only at x=2 and is positive everywhere else. Solution: all x except x=2.", "(x-2)^2>0"),
        practicalChoice("y11adv-qi-m9", "Solve $x^2+2x\\leq 0$.", "D", ["$x\\leq 0$", "$x\\geq -2$", "$x\\leq -2$ or $x\\geq 0$", "$-2\\leq x\\leq 0$"], "x(x+2)≤0. Roots 0 and −2. Non-strict, between and including: −2 ≤ x ≤ 0.", "x^2+2x\\leq 0"),
        qa("y11adv-qi-m10", "Find the largest integer satisfying $x^2-7x+6\\leq 0$.", "(x-1)(x-6)\\leq 0 \\Rightarrow 1\\leq x\\leq 6", "6", "Solution is 1 ≤ x ≤ 6. Largest integer = 6.", "1 ≤ x ≤ 6. Integers: 1, 2, 3, 4, 5, 6. Largest = 6."),
      ],
      masteryQuizPool: [
        { id: "y11adv-qi-p1", prompt: "Solve $x^2-5x+6=0$. Enter the smaller root.", latex: "x^2-5x+6=0", answer: "2", difficulty: 1, hint: "$(x-2)(x-3)$.", explanation: "Roots $2,3$; smaller is $2$." },
        { id: "y11adv-qi-p2", prompt: "Solve $x^2-5x+6=0$. Enter the larger root.", latex: "x^2-5x+6=0", answer: "3", difficulty: 1, hint: "$(x-2)(x-3)$.", explanation: "Larger root is $3$." },
        { id: "y11adv-qi-p3", prompt: "Solve $x^2-4x+3=0$. Enter the smaller root.", latex: "x^2-4x+3=0", answer: "1", difficulty: 1, hint: "$(x-1)(x-3)$.", explanation: "Roots $1,3$; smaller is $1$." },
        { id: "y11adv-qi-p4", prompt: "Which values satisfy $x^2-5x+6<0$?", latex: "x^2-5x+6<0", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$x<2$ or $x>3$" }, { label: "B", text: "$2<x<3$" }, { label: "C", text: "$x<3$" }, { label: "D", text: "$x>2$" }], hint: "Negative between the roots.", explanation: "Between roots $2$ and $3$: $2<x<3$." },
        { id: "y11adv-qi-p5", prompt: "Which values satisfy $x^2-5x+6>0$?", latex: "x^2-5x+6>0", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$x<2$ or $x>3$" }, { label: "B", text: "$2<x<3$" }, { label: "C", text: "$x>3$ only" }, { label: "D", text: "$x<2$ only" }], hint: "Positive outside the roots.", explanation: "Outside roots: $x<2$ or $x>3$." },
        { id: "y11adv-qi-p6", prompt: "Solve $(x-1)(x-3)<0$.", latex: "(x-1)(x-3)<0", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$x<1$ or $x>3$" }, { label: "B", text: "$1<x<3$" }, { label: "C", text: "$x>1$" }, { label: "D", text: "$x<3$" }], hint: "Negative between the roots.", explanation: "$1<x<3$." },
        { id: "y11adv-qi-p7", prompt: "Solve $x(x-4)\\ge 0$.", latex: "x(x-4)\\ge 0", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$0\\le x\\le 4$" }, { label: "B", text: "$x>4$" }, { label: "C", text: "$0<x<4$" }, { label: "D", text: "$x\\le 0$ or $x\\ge 4$" }], hint: "Non-negative outside the roots.", explanation: "Roots $0,4$: $x\\le 0$ or $x\\ge 4$." },
        { id: "y11adv-qi-p8", prompt: "Find the largest integer satisfying $x^2-5x+4<0$.", latex: "(x-1)(x-4)<0", answer: "3", difficulty: 3, hint: "Solution $1<x<4$.", explanation: "Integers $2,3$; largest is $3$." },
        { id: "y11adv-qi-p9", prompt: "Solve $x^2+x-6=0$. Enter the smaller root.", latex: "x^2+x-6=0", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "$(x+3)(x-2)$.", explanation: "Roots $-3,2$; smaller is $-3$." },
        { id: "y11adv-qi-p10", prompt: "Solve $x^2+x-6=0$. Enter the larger root.", latex: "x^2+x-6=0", answer: "2", difficulty: 2, hint: "$(x+3)(x-2)$.", explanation: "Larger root is $2$." },
        { id: "y11adv-qi-p11", prompt: "Solve $(x+3)(x-2)>0$.", latex: "(x+3)(x-2)>0", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$x<-3$ or $x>2$" }, { label: "B", text: "$-3<x<2$" }, { label: "C", text: "$x>2$" }, { label: "D", text: "$x<-3$" }], hint: "Positive outside the roots.", explanation: "$x<-3$ or $x>2$." },
        { id: "y11adv-qi-p12", prompt: "Solve $x^2+x-6<0$.", latex: "x^2+x-6<0", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$x<-3$ or $x>2$" }, { label: "B", text: "$-3<x<2$" }, { label: "C", text: "$x>-3$" }, { label: "D", text: "$x<2$" }], hint: "Negative between the roots.", explanation: "$-3<x<2$." },
        { id: "y11adv-qi-p13", prompt: "Solve $x^2-9=0$. Enter the smaller root.", latex: "x^2-9=0", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "$(x-3)(x+3)$.", explanation: "Roots $\\pm 3$; smaller is $-3$." },
        { id: "y11adv-qi-p14", prompt: "Solve $x^2\\le 9$.", latex: "x^2\\le 9", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$x\\le 3$" }, { label: "B", text: "$x\\ge -3$" }, { label: "C", text: "$-3\\le x\\le 3$" }, { label: "D", text: "$x\\le -3$ or $x\\ge 3$" }], hint: "$x^2-9\\le 0$.", explanation: "Between and including roots: $-3\\le x\\le 3$." },
        { id: "y11adv-qi-p15", prompt: "Solve $x^2-7x+6=0$. Enter the larger root.", latex: "x^2-7x+6=0", answer: "6", difficulty: 2, hint: "$(x-1)(x-6)$.", explanation: "Larger root is $6$." },
        { id: "y11adv-qi-p16", prompt: "Solve $(x-2)^2>0$.", latex: "(x-2)^2>0", answer: "B", difficulty: 3, choices: [{ label: "A", text: "all reals" }, { label: "B", text: "$x\\ne 2$" }, { label: "C", text: "$x>2$" }, { label: "D", text: "$x<2$" }], hint: "Zero only at $x=2$.", explanation: "Positive everywhere except $x=2$." },
        { id: "y11adv-qi-p17", prompt: "Solve $x^2+2x\\le 0$.", latex: "x^2+2x\\le 0", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$x\\le 0$" }, { label: "B", text: "$x\\ge -2$" }, { label: "C", text: "$x\\le -2$ or $x\\ge 0$" }, { label: "D", text: "$-2\\le x\\le 0$" }], hint: "$x(x+2)\\le 0$.", explanation: "Between and including roots $-2,0$: $-2\\le x\\le 0$." },
        { id: "y11adv-qi-p18", prompt: "Find the largest integer satisfying $x^2-7x+6\\le 0$.", latex: "(x-1)(x-6)\\le 0", answer: "6", difficulty: 3, hint: "Solution $1\\le x\\le 6$.", explanation: "Largest integer is $6$." },
        { id: "y11adv-qi-p19", prompt: "Solve $x^2-2x-8=0$. Enter the smaller root.", latex: "x^2-2x-8=0", answer: "-2", difficulty: 3, acceptedAnswers: ["-2", "−2"], hint: "$(x-4)(x+2)$.", explanation: "Roots $4,-2$; smaller is $-2$." },
        { id: "y11adv-qi-p20", prompt: "Solve $x^2-2x-8>0$.", latex: "x^2-2x-8>0", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$x<-2$ or $x>4$" }, { label: "B", text: "$-2<x<4$" }, { label: "C", text: "$x>4$" }, { label: "D", text: "$x<-2$" }], hint: "Positive outside roots $-2,4$.", explanation: "$x<-2$ or $x>4$." },
        { id: "y11adv-qi-p21", prompt: "How many integers satisfy $x^2-6x+5<0$?", latex: "(x-1)(x-5)<0", answer: "3", difficulty: 4, hint: "Solution $1<x<5$; count integers.", explanation: "Integers $2,3,4$: three of them." },
        { id: "y11adv-qi-p22", prompt: "Solve $2x^2-8\\ge 0$. Enter the smallest non-negative integer in the solution.", latex: "2x^2-8\\ge 0", answer: "2", difficulty: 4, hint: "$x^2\\ge 4$ gives $x\\le -2$ or $x\\ge 2$.", explanation: "Smallest non-negative integer satisfying is $2$." },
        { id: "y11adv-qi-p23", prompt: "Solve $x^2<4x$. Enter the largest integer in the solution.", latex: "x^2-4x<0", answer: "3", difficulty: 4, hint: "$x(x-4)<0$ gives $0<x<4$.", explanation: "Integers $1,2,3$; largest is $3$." },
        { id: "y11adv-qi-p24", prompt: "Solve $x^2-6x+9\\le 0$.", latex: "(x-3)^2\\le 0", answer: "C", difficulty: 4, choices: [{ label: "A", text: "all reals" }, { label: "B", text: "no solution" }, { label: "C", text: "$x=3$ only" }, { label: "D", text: "$x\\ge 3$" }], hint: "A square is $\\le 0$ only when it is $0$.", explanation: "$(x-3)^2\\le 0$ only at $x=3$." },
        { id: "y11adv-qi-p25", prompt: "Find the number of integers satisfying $x^2-9x+18\\le 0$.", latex: "(x-3)(x-6)\\le 0", answer: "4", difficulty: 5, hint: "Solution $3\\le x\\le 6$; count integers.", explanation: "Integers $3,4,5,6$: four of them." },
        { id: "y11adv-qi-p26", prompt: "Solve $x^2+4x+4>0$.", latex: "(x+2)^2>0", answer: "B", difficulty: 5, choices: [{ label: "A", text: "all reals" }, { label: "B", text: "$x\\ne -2$" }, { label: "C", text: "$x>-2$" }, { label: "D", text: "no solution" }], hint: "Zero only at $x=-2$.", explanation: "Positive everywhere except $x=-2$." },
        { id: "y11adv-qi-p27", prompt: "For $x^2-kx+0=0$, written $x(x-k)$, the inequality $x(x-k)<0$ has solution $0<x<5$. Find $k$.", latex: "x(x-k)<0\\Rightarrow 0<x<k", answer: "5", difficulty: 5, hint: "The upper boundary equals $k$.", explanation: "$0<x<k$ matches $0<x<5$, so $k=5$." },
        { id: "y11adv-qi-p28", prompt: "Solve $3-2x-x^2>0$. Enter the smaller boundary value.", latex: "3-2x-x^2>0", answer: "-3", difficulty: 5, acceptedAnswers: ["-3", "−3"], hint: "Factor $-(x+3)(x-1)$; the parabola opens down.", explanation: "$-(x+3)(x-1)>0$ gives $-3<x<1$; smaller boundary is $-3$." },
        { id: "y11adv-qi-p29", prompt: "Solve $x^2\\ge 5x-6$. Enter the smaller boundary root.", latex: "x^2-5x+6\\ge 0", answer: "2", difficulty: 5, hint: "Rearrange to $x^2-5x+6\\ge 0$.", explanation: "$(x-2)(x-3)\\ge 0$ gives $x\\le 2$ or $x\\ge 3$; smaller boundary is $2$." },
        { id: "y11adv-qi-p30", prompt: "Find the number of integers satisfying $x^2-1<0$.", latex: "x^2-1<0", answer: "1", difficulty: 4, hint: "Solution $-1<x<1$.", explanation: "Only integer strictly between is $0$: one integer." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-qi-mp1",
          prompt: "Let $f(x) = x^2 - 7x + 10$.",
          latex: "f(x) = x^2 - 7x + 10",
          answer: "2",
          hint: "Factorise f(x) to find the roots, then use the parabola sign for the inequality. Check f(3) to verify.",
          explanation: "(a) Smaller root = 2. (b) Larger root = 5. (c) f(3) = 9−21+10 = −2, confirming 3 is in the solution 2 < x < 5.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the smaller root of $f(x)=0$.", marks: 2, answer: "2", hint: "Factorise: (x−2)(x−5)=0.", explanation: "x²−7x+10=(x−2)(x−5). Roots: 2 and 5. Smaller = 2." },
            { key: "b", label: "(b)", prompt: "Find the larger root of $f(x)=0$.", marks: 1, answer: "5", hint: "The other factor gives x=5.", explanation: "Larger root = 5." },
            { key: "c", label: "(c)", prompt: "Evaluate $f(3)$.", marks: 1, answer: "-2", acceptedAnswers: ["-2", "−2"], hint: "Substitute x=3: f(3)=9−21+10.", explanation: "f(3)=9−21+10=−2. Since f(3)<0 and 2<3<5, this confirms the solution to f(x)<0 is 2<x<5." },
          ],
        },
        {
          id: "y11adv-qi-mp2",
          prompt: "Let $g(x) = x^2 - 2x - 3$.",
          latex: "g(x) = x^2 - 2x - 3",
          answer: "-1",
          hint: "Factorise g(x). The roots tell you where the parabola crosses zero. Then read the parabola sign.",
          explanation: "(a) Smaller root = −1. (b) Larger root = 3. (c) g(1) = 1−2−3 = −4, confirming 1 is in the solution −1 < x < 3.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the smaller root of $g(x)=0$.", marks: 2, answer: "-1", acceptedAnswers: ["-1", "−1"], hint: "Factorise: (x−3)(x+1)=0.", explanation: "g(x)=(x−3)(x+1). Roots: −1 and 3. Smaller = −1." },
            { key: "b", label: "(b)", prompt: "Find the larger root of $g(x)=0$.", marks: 1, answer: "3", hint: "x−3=0 gives x=3.", explanation: "Larger root = 3." },
            { key: "c", label: "(c)", prompt: "Evaluate $g(1)$.", marks: 1, answer: "-4", acceptedAnswers: ["-4", "−4"], hint: "Substitute x=1: g(1)=1−2−3.", explanation: "g(1)=1−2−3=−4. Since g(1)<0 and −1<1<3, this confirms the solution to g(x)<0 is −1<x<3." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "composite-functions") {
    return {
      ...base,
      description:
        "Form and evaluate composite functions f∘g; distinguish f(g(x)) from g(f(x)); find the domain of a composite function.",
      learningIntention:
        "Apply and interpret composite function notation, evaluate composites step by step, and determine when composition is defined.",
      successCriteria: [
        "Evaluate (f∘g)(a) by first computing g(a) then applying f to the result.",
        "Distinguish (f∘g)(x) from (g∘f)(x) and give an example where they differ.",
        "Write the rule for (f∘g)(x) as an algebraic expression.",
        "State the domain of f∘g by identifying which inputs are valid for both g and then f.",
      ],
      teaching: {
        paragraphs: [
          "A composite function applies two functions in sequence. The notation (f∘g)(x) — read as 'f of g of x' — means: substitute x into g first, then substitute the result into f. The right-hand function always goes first.",
          "To evaluate (f∘g)(2): find g(2) to get a number, then put that number into f. For example, if g(2) = 5 and f(5) = 13, then (f∘g)(2) = 13. Never apply f first — that gives (g∘f) instead.",
          "To write the algebraic rule for (f∘g)(x), substitute the entire expression g(x) in place of every x in the formula for f. For example, if f(x) = x² + 1 and g(x) = 2x − 3, then (f∘g)(x) = (2x − 3)² + 1 = 4x² − 12x + 10.",
          "The domain of f∘g is more restrictive than either function alone: the input x must be valid for g, and the output g(x) must also be valid for f. For example, if f(x) = √x and g(x) = x − 4, then f∘g requires x − 4 ≥ 0, giving domain x ≥ 4.",
        ],
        latexBlocks: [
          "(f \\circ g)(x) = f(g(x)) \\quad \\text{— apply } g \\text{ first, then } f",
          "\\text{Domain of } f \\circ g: \\{x \\in \\operatorname{dom}(g) : g(x) \\in \\operatorname{dom}(f)\\}",
          "f \\circ g \\neq g \\circ f \\text{ in general}",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a composite function from given values",
          questionLatex: "g(1)=2,\\quad f(2)=5.\\quad \\text{Find }(f\\circ g)(1).",
          steps: [
            {
              explanation: "Apply g first: substitute x = 1 into g.",
              latex: "g(1) = 2",
            },
            {
              explanation: "Use the output of g as the input to f.",
              latex: "f(g(1)) = f(2) = 5",
            },
          ],
          finalAnswerLatex: "(f\\circ g)(1) = 5",
        },
        {
          title: "Write the algebraic rule for a composite function",
          questionLatex: "f(x)=x^2+1,\\quad g(x)=2x-3.\\quad \\text{Find }(f\\circ g)(x).",
          steps: [
            {
              explanation: "Replace every x in f(x) with the expression g(x) = 2x − 3.",
              latex: "(f\\circ g)(x) = (2x-3)^2 + 1",
            },
            {
              explanation: "Expand (2x − 3)² = 4x² − 12x + 9, then add 1.",
              latex: "4x^2 - 12x + 9 + 1 = 4x^2 - 12x + 10",
            },
          ],
          finalAnswerLatex: "(f\\circ g)(x) = 4x^2 - 12x + 10",
        },
        {
          title: "Show that f∘g ≠ g∘f",
          questionLatex: "f(x)=x+2,\\quad g(x)=3x.\\quad \\text{Find }(f\\circ g)(x)\\text{ and }(g\\circ f)(x).",
          steps: [
            {
              explanation: "For (f∘g)(x): apply g first, then f.",
              latex: "(f\\circ g)(x) = f(3x) = 3x + 2",
            },
            {
              explanation: "For (g∘f)(x): apply f first, then g.",
              latex: "(g\\circ f)(x) = g(x+2) = 3(x+2) = 3x + 6",
            },
            {
              explanation: "The two expressions differ, confirming f∘g ≠ g∘f.",
            },
          ],
          finalAnswerLatex: "(f\\circ g)(x)=3x+2\\neq (g\\circ f)(x)=3x+6",
        },
      ],
      guidedPractice: [
        qa("y11adv-comp-g1", "Evaluate the inner function first. $f(x)=x^2+1$, $g(x)=2x-3$. Find $g(2)$.", "g(2) = 2(2)-3", "1", "Substitute x = 2 into g(x) = 2x − 3.", "g(2) = 2(2) − 3 = 4 − 3 = 1."),
        qa("y11adv-comp-g2", "Now find $(f\\circ g)(2)$ using $g(2)=1$ and $f(x)=x^2+1$.", "f(g(2)) = f(1) = 1^2+1", "2", "Substitute x = 1 into f(x) = x² + 1.", "f(1) = 1² + 1 = 2. So (f∘g)(2) = 2."),
        practicalChoice("y11adv-comp-g3", "The notation $(f\\circ g)(x)$ means:", "C", ["Apply $f$ first, then $g$", "Multiply $f(x)$ and $g(x)$", "Apply $g$ first, then $f$", "Add $f(x)$ and $g(x)$"], "f∘g means f of g of x — the right-hand function g is applied first, then f is applied to the result."),
        qa("y11adv-comp-g4", "$f(x)=2x+5$, $g(x)=x-3$. Evaluate $(f\\circ g)(4)$.", "g(4)=1,\\quad f(1)=2(1)+5", "7", "g(4) = 4 − 3 = 1. Then f(1) = 2(1) + 5.", "g(4) = 1. f(g(4)) = f(1) = 2 + 5 = 7."),
      ],
      independentPractice: [
        qa("y11adv-comp-i1", "$f(x)=x^2$, $g(x)=x+1$. Evaluate $(f\\circ g)(3)$.", "g(3)=4,\\quad f(4)=4^2", "16", "g(3) = 4, then f(4) = 4².", "g(3) = 4. f(4) = 16. So (f∘g)(3) = 16."),
        qa("y11adv-comp-i2", "$f(x)=x^2$, $g(x)=x+1$. Evaluate $(g\\circ f)(3)$.", "f(3)=9,\\quad g(9)=9+1", "10", "f(3) = 9, then g(9) = 9 + 1.", "f(3) = 9. g(9) = 10. So (g∘f)(3) = 10."),
        practicalChoice("y11adv-comp-i3", "$f(x)=x^2$, $g(x)=x+1$. From your answers above, $(f\\circ g)(3)=16$ and $(g\\circ f)(3)=10$. What does this show?", "B", ["$f\\circ g$ always equals $g\\circ f$", "Composition is generally not commutative — order matters", "Composite functions always give equal results", "The inner function always gives a larger output"], "The two compositions give different values (16 ≠ 10), confirming that order matters in composition."),
        qa("y11adv-comp-i4", "$f(x)=3x-1$, $g(x)=x^2$. Evaluate $(f\\circ g)(2)$.", "g(2)=4,\\quad f(4)=3(4)-1", "11", "g(2) = 4, then f(4) = 12 − 1.", "g(2) = 4. f(4) = 3(4) − 1 = 11."),
        qa("y11adv-comp-i5", "$f(x)=\\sqrt{x}$, $g(x)=x-4$. What is the minimum $x$-value in the domain of $f\\circ g$?", "x - 4 \\ge 0 \\Rightarrow x \\ge 4", "4", "For f(g(x)) = √(x−4) to be defined, x − 4 ≥ 0.", "f∘g = √(x−4). The square root requires x − 4 ≥ 0, so x ≥ 4. Minimum x is 4."),
      ],
      commonMistakes: [
        { mistake: "Evaluating f first and then g when computing (f∘g)(x).", fix: "For (f∘g)(x), always apply g first (the right-hand function). Then apply f to the output." },
        { mistake: "Confusing (f∘g)(x) with f(x) × g(x).", fix: "The ∘ symbol means composition — substituting g(x) into f — not multiplication." },
        { mistake: "Assuming (f∘g)(x) always equals (g∘f)(x).", fix: "Composition is generally not commutative. Always check both orders if asked." },
        { mistake: "Ignoring domain restrictions when composing functions.", fix: "The domain of f∘g requires x to be valid for g AND g(x) to be valid for f. Check both conditions." },
      ],
      masteryQuiz: [
        qa("y11adv-comp-m1", "$f(x)=x+3$, $g(x)=2x$. Evaluate $(f\\circ g)(5)$.", "g(5)=10,\\quad f(10)=10+3", "13", "g(5) = 10, then f(10) = 13.", "g(5) = 10. f(10) = 13."),
        qa("y11adv-comp-m2", "$f(x)=x+3$, $g(x)=2x$. Evaluate $(g\\circ f)(5)$.", "f(5)=8,\\quad g(8)=2(8)", "16", "f(5) = 8, then g(8) = 16.", "f(5) = 8. g(8) = 16."),
        practicalChoice("y11adv-comp-m3", "Is it always true that $(f\\circ g)(x) = (g\\circ f)(x)$?", "B", ["Yes — composition is commutative", "No — the two orders generally differ", "Yes — only when both functions are linear", "No — only when one function is a constant"], "Composition is not commutative in general. (f∘g)(5) = 13 ≠ 16 = (g∘f)(5) for the functions above."),
        qa("y11adv-comp-m4", "$f(x)=x^2-1$, $g(x)=x+2$. Evaluate $(f\\circ g)(1)$.", "g(1)=3,\\quad f(3)=9-1", "8", "g(1) = 3, then f(3) = 9 − 1.", "g(1) = 3. f(3) = 8."),
        qa("y11adv-comp-m5", "$f(x)=x^2-1$, $g(x)=x+2$. Evaluate $(g\\circ f)(1)$.", "f(1)=0,\\quad g(0)=0+2", "2", "f(1) = 0, then g(0) = 2.", "f(1) = 0. g(0) = 2."),
        qa("y11adv-comp-m6", "$f(x)=2x$, $g(x)=x+4$. Write $(f\\circ g)(x)$ in simplest form. Enter the constant term.", "f(g(x)) = 2(x+4) = 2x+8", "8", "f(x+4) = 2(x+4) = 2x + 8. Constant term is 8.", "(f∘g)(x) = 2(x+4) = 2x + 8. The constant term is 8."),
        qa("y11adv-comp-m7", "$f(x)=x^2$, $g(x)=3x$. Write $(g\\circ f)(x)$ in simplest form. Enter the coefficient of $x^2$.", "g(f(x)) = 3x^2", "3", "g(x²) = 3x². The coefficient is 3.", "(g∘f)(x) = g(x²) = 3x². Coefficient of x² is 3."),
        practicalChoice("y11adv-comp-m8", "$f(x)=\\frac{1}{x}$, $g(x)=x-1$. The domain of $f\\circ g$ excludes which value?", "B", ["$x=0$", "$x=1$", "$x=-1$", "$x=2$"], "f(g(x)) = 1/(x−1). The denominator is zero when x − 1 = 0, i.e. x = 1. So x = 1 is excluded."),
        qa("y11adv-comp-m9", "$f(x)=\\sqrt{x}$, $g(x)=4-x$. What is the largest $x$-value in the domain of $f\\circ g$?", "4-x \\ge 0 \\Rightarrow x \\le 4", "4", "Need 4 − x ≥ 0, so x ≤ 4. Largest x is 4.", "f∘g = √(4−x). Need 4 − x ≥ 0 → x ≤ 4. Largest x-value is 4."),
        qa("y11adv-comp-m10", "$f(x)=x+2$, $g(x)=x-2$. Find the constant term of $(f\\circ g)(x)$.", "f(g(x)) = f(x-2) = (x-2)+2 = x", "0", "f(x−2) = (x−2) + 2 = x. Constant term is 0.", "(f∘g)(x) = (x−2) + 2 = x. The constant term is 0."),
      ],
      masteryQuizPool: [
        { id: "y11adv-comp-p1", prompt: "$f(x)=x^2+1$, $g(x)=2x-3$. Find $g(2)$.", latex: "g(2)=2(2)-3", answer: "1", difficulty: 1, hint: "Substitute into $g$.", explanation: "$g(2)=1$." },
        { id: "y11adv-comp-p2", prompt: "$g(2)=1$, $f(x)=x^2+1$. Find $(f\\circ g)(2)$.", latex: "f(g(2))=f(1)", answer: "2", difficulty: 1, hint: "Apply $f$ to $1$.", explanation: "$f(1)=1^2+1=2$." },
        { id: "y11adv-comp-p3", prompt: "$f(x)=2x+5$, $g(x)=x-3$. Evaluate $(f\\circ g)(4)$.", latex: "g(4)=1,\\ f(1)", answer: "7", difficulty: 1, hint: "$g(4)=1$, then $f(1)$.", explanation: "$f(1)=2(1)+5=7$." },
        { id: "y11adv-comp-p4", prompt: "The notation $(f\\circ g)(x)$ means:", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "Apply $f$ first, then $g$" }, { label: "B", text: "Multiply $f(x)$ and $g(x)$" }, { label: "C", text: "Apply $g$ first, then $f$" }, { label: "D", text: "Add $f(x)$ and $g(x)$" }], hint: "Inner function first.", explanation: "$g$ is applied first." },
        { id: "y11adv-comp-p5", prompt: "$f(x)=x^2$, $g(x)=x+1$. Evaluate $(f\\circ g)(3)$.", latex: "g(3)=4,\\ f(4)", answer: "16", difficulty: 2, hint: "$g(3)=4$, then $f(4)$.", explanation: "$f(4)=16$." },
        { id: "y11adv-comp-p6", prompt: "$f(x)=x^2$, $g(x)=x+1$. Evaluate $(g\\circ f)(3)$.", latex: "f(3)=9,\\ g(9)", answer: "10", difficulty: 2, hint: "$f(3)=9$, then $g(9)$.", explanation: "$g(9)=10$." },
        { id: "y11adv-comp-p7", prompt: "$f(x)=3x-1$, $g(x)=x^2$. Evaluate $(f\\circ g)(2)$.", latex: "g(2)=4,\\ f(4)", answer: "11", difficulty: 2, hint: "$g(2)=4$, then $f(4)$.", explanation: "$f(4)=3(4)-1=11$." },
        { id: "y11adv-comp-p8", prompt: "$f(x)=\\sqrt{x}$, $g(x)=x-4$. Minimum $x$ in the domain of $f\\circ g$:", latex: "x-4\\ge 0", answer: "4", difficulty: 3, hint: "Need $x-4\\ge 0$.", explanation: "$x\\ge 4$; minimum is $4$." },
        { id: "y11adv-comp-p9", prompt: "$f(x)=x+3$, $g(x)=2x$. Evaluate $(f\\circ g)(5)$.", latex: "g(5)=10,\\ f(10)", answer: "13", difficulty: 2, hint: "$g(5)=10$, then $f(10)$.", explanation: "$f(10)=13$." },
        { id: "y11adv-comp-p10", prompt: "$f(x)=x+3$, $g(x)=2x$. Evaluate $(g\\circ f)(5)$.", latex: "f(5)=8,\\ g(8)", answer: "16", difficulty: 2, hint: "$f(5)=8$, then $g(8)$.", explanation: "$g(8)=16$." },
        { id: "y11adv-comp-p11", prompt: "Is $(f\\circ g)(x)=(g\\circ f)(x)$ always true?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Yes — composition commutes" }, { label: "B", text: "No — orders generally differ" }, { label: "C", text: "Yes — only for linear functions" }, { label: "D", text: "No — only for constants" }], hint: "Order matters.", explanation: "Composition is generally not commutative." },
        { id: "y11adv-comp-p12", prompt: "$f(x)=x^2-1$, $g(x)=x+2$. Evaluate $(f\\circ g)(1)$.", latex: "g(1)=3,\\ f(3)", answer: "8", difficulty: 2, hint: "$g(1)=3$, then $f(3)$.", explanation: "$f(3)=9-1=8$." },
        { id: "y11adv-comp-p13", prompt: "$f(x)=x^2-1$, $g(x)=x+2$. Evaluate $(g\\circ f)(1)$.", latex: "f(1)=0,\\ g(0)", answer: "2", difficulty: 2, hint: "$f(1)=0$, then $g(0)$.", explanation: "$g(0)=2$." },
        { id: "y11adv-comp-p14", prompt: "$f(x)=2x$, $g(x)=x+4$. Write $(f\\circ g)(x)=2x+8$. Enter the constant term.", latex: "f(g(x))=2(x+4)", answer: "8", difficulty: 3, hint: "Expand $2(x+4)$.", explanation: "$2x+8$; constant is $8$." },
        { id: "y11adv-comp-p15", prompt: "$f(x)=x^2$, $g(x)=3x$. Write $(g\\circ f)(x)=3x^2$. Enter the coefficient of $x^2$.", latex: "g(f(x))=3x^2", answer: "3", difficulty: 3, hint: "$g(x^2)=3x^2$.", explanation: "Coefficient is $3$." },
        { id: "y11adv-comp-p16", prompt: "$f(x)=\\frac{1}{x}$, $g(x)=x-1$. The domain of $f\\circ g$ excludes:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$x=0$" }, { label: "B", text: "$x=1$" }, { label: "C", text: "$x=-1$" }, { label: "D", text: "$x=2$" }], hint: "Denominator $x-1=0$.", explanation: "$f(g(x))=\\frac{1}{x-1}$ excludes $x=1$." },
        { id: "y11adv-comp-p17", prompt: "$f(x)=\\sqrt{x}$, $g(x)=4-x$. Largest $x$ in the domain of $f\\circ g$:", latex: "4-x\\ge 0", answer: "4", difficulty: 3, hint: "Need $4-x\\ge 0$.", explanation: "$x\\le 4$; largest is $4$." },
        { id: "y11adv-comp-p18", prompt: "$f(x)=x+2$, $g(x)=x-2$. Constant term of $(f\\circ g)(x)$:", latex: "f(g(x))=(x-2)+2", answer: "0", difficulty: 3, hint: "Simplify $(x-2)+2$.", explanation: "$(f\\circ g)(x)=x$; constant is $0$." },
        { id: "y11adv-comp-p19", prompt: "$f(x)=2x+1$, $g(x)=x^2$. Write $(f\\circ g)(x)=2x^2+1$. Enter the constant term.", latex: "f(g(x))=2x^2+1", answer: "1", difficulty: 3, hint: "$f(x^2)=2x^2+1$.", explanation: "Constant is $1$." },
        { id: "y11adv-comp-p20", prompt: "$f(x)=x-5$, $g(x)=x+5$. Evaluate $(f\\circ g)(7)$.", latex: "g(7)=12,\\ f(12)", answer: "7", difficulty: 2, hint: "$g(7)=12$, then $f(12)$.", explanation: "$f(12)=12-5=7$ (these are inverse functions)." },
        { id: "y11adv-comp-p21", prompt: "$f(x)=x^2+1$, $g(x)=2x-3$. Constant term of $(f\\circ g)(x)$ when expanded:", latex: "f(g(x))=(2x-3)^2+1", answer: "10", difficulty: 4, hint: "Expand $(2x-3)^2+1$.", explanation: "$4x^2-12x+9+1=4x^2-12x+10$; constant is $10$." },
        { id: "y11adv-comp-p22", prompt: "$f(x)=x^2+1$, $g(x)=2x-3$. Coefficient of $x$ in $(f\\circ g)(x)$:", latex: "f(g(x))=(2x-3)^2+1", answer: "-12", difficulty: 4, acceptedAnswers: ["-12", "−12"], hint: "Middle term of $(2x-3)^2$.", explanation: "$-12x$; coefficient is $-12$." },
        { id: "y11adv-comp-p23", prompt: "$f(x)=\\sqrt{x}$, $g(x)=x-9$. Evaluate $(f\\circ g)(25)$.", latex: "g(25)=16,\\ f(16)", answer: "4", difficulty: 3, hint: "$g(25)=16$, then $\\sqrt{16}$.", explanation: "$\\sqrt{16}=4$." },
        { id: "y11adv-comp-p24", prompt: "$f(x)=3x$, $g(x)=x+2$. Evaluate $(f\\circ g)(-1)$.", latex: "g(-1)=1,\\ f(1)", answer: "3", difficulty: 3, hint: "$g(-1)=1$, then $f(1)$.", explanation: "$f(1)=3$." },
        { id: "y11adv-comp-p25", prompt: "$f(x)=x^2$, $g(x)=x-3$. Solve $(f\\circ g)(x)=0$. Enter the value of $x$.", latex: "(x-3)^2=0", answer: "3", difficulty: 5, hint: "$(x-3)^2=0$.", explanation: "$x=3$." },
        { id: "y11adv-comp-p26", prompt: "$f(x)=2x-1$, $g(x)=3x$. Evaluate $(f\\circ g)(2)-(g\\circ f)(2)$.", latex: "(f\\circ g)(2),\\ (g\\circ f)(2)", answer: "2", difficulty: 5, hint: "Compute each composition at $2$.", explanation: "$(f\\circ g)(2)=2(6)-1=11$; $(g\\circ f)(2)=3(3)=9$; $11-9=2$." },
        { id: "y11adv-comp-p27", prompt: "$f(x)=x+a$, $g(x)=2x$. If $(f\\circ g)(3)=10$, find $a$.", latex: "(f\\circ g)(3)=6+a=10", answer: "4", difficulty: 5, hint: "$g(3)=6$, then $6+a=10$.", explanation: "$6+a=10$ gives $a=4$." },
        { id: "y11adv-comp-p28", prompt: "$f(x)=\\sqrt{x}$, $g(x)=x^2-7$. Evaluate $(f\\circ g)(4)$.", latex: "g(4)=9,\\ f(9)", answer: "3", difficulty: 4, hint: "$g(4)=9$, then $\\sqrt{9}$.", explanation: "$\\sqrt{9}=3$." },
        { id: "y11adv-comp-p29", prompt: "$f(x)=\\frac{1}{x-2}$, $g(x)=x+5$. The domain of $f\\circ g$ excludes which value?", latex: "\\text{Choose one}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "$x=2$" }, { label: "B", text: "$x=5$" }, { label: "C", text: "$x=-3$" }, { label: "D", text: "$x=0$" }], hint: "Need $g(x)-2\\ne 0$.", explanation: "$f(g(x))=\\frac{1}{x+3}$ excludes $x=-3$." },
        { id: "y11adv-comp-p30", prompt: "$f(x)=2x$, $g(x)=x-4$. Solve $(g\\circ f)(x)=0$. Enter $x$.", latex: "2x-4=0", answer: "2", difficulty: 5, hint: "$(g\\circ f)(x)=2x-4$.", explanation: "$2x-4=0$ gives $x=2$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-comp-mp1",
          prompt: "Let $f(x) = x^2 + 1$ and $g(x) = 2x - 3$.",
          latex: "f(x) = x^2 + 1, \\quad g(x) = 2x - 3",
          answer: "10",
          hint: "For (a): substitute g(x) into f and expand. For (b): substitute x = 2 step by step. For (c): substitute x = 2 into g first.",
          explanation: "(a) (f∘g)(x) = (2x−3)² + 1 = 4x² − 12x + 10. Constant = 10. (b) g(2) = 1, f(1) = 2. (c) f(2) = 5, g(5) = 7.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the constant term of $(f\\circ g)(x)$ when fully expanded.",
              marks: 2,
              answer: "10",
              hint: "Substitute g(x) = 2x − 3 for x in f(x) = x² + 1, then expand.",
              explanation: "(f∘g)(x) = (2x−3)² + 1 = 4x² − 12x + 9 + 1 = 4x² − 12x + 10. Constant term = 10.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Evaluate $(f\\circ g)(2)$.",
              marks: 1,
              answer: "2",
              hint: "g(2) = 1. Then find f(1).",
              explanation: "g(2) = 2(2) − 3 = 1. f(1) = 1² + 1 = 2.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Evaluate $(g\\circ f)(2)$.",
              marks: 1,
              answer: "7",
              hint: "f(2) = 5. Then find g(5).",
              explanation: "f(2) = 4 + 1 = 5. g(5) = 2(5) − 3 = 7.",
            },
          ],
        },
        {
          id: "y11adv-comp-mp2",
          prompt: "Let $f(x) = \\sqrt{x}$ and $g(x) = x - 9$.",
          latex: "f(x) = \\sqrt{x}, \\quad g(x) = x - 9",
          answer: "9",
          hint: "For (a): the square root requires x − 9 ≥ 0. For (b) and (c): substitute the x-value and simplify.",
          explanation: "(a) Domain: x ≥ 9. (b) (f∘g)(25) = √16 = 4. (c) (f∘g)(13) = √4 = 2.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the minimum $x$-value in the domain of $f\\circ g$.",
              marks: 1,
              answer: "9",
              hint: "For f(g(x)) = √(x−9) to be defined, x − 9 must be non-negative.",
              explanation: "x − 9 ≥ 0 → x ≥ 9. Minimum x-value is 9.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Evaluate $(f\\circ g)(25)$.",
              marks: 1,
              answer: "4",
              hint: "g(25) = 16. Then find √16.",
              explanation: "g(25) = 16. f(16) = √16 = 4.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Evaluate $(f\\circ g)(13)$.",
              marks: 1,
              answer: "2",
              hint: "g(13) = 4. Then find √4.",
              explanation: "g(13) = 4. f(4) = √4 = 2.",
            },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "completing-the-square") {
    return {
      ...base,
      description:
        "Rewrite quadratics in vertex form a(x − h)² + k; identify vertex and axis of symmetry; solve quadratic equations by completing the square.",
      learningIntention:
        "Complete the square to write any quadratic in vertex form and use this form to identify key features and solve equations.",
      successCriteria: [
        "Complete the square for x² + bx + c to write it as (x + h)² + k.",
        "Complete the square for ax² + bx + c with a ≠ 1 by first factoring out a.",
        "Read the vertex (h, k) and axis of symmetry x = h directly from vertex form.",
        "Solve a quadratic equation using the completed-square form.",
      ],
      teaching: {
        paragraphs: [
          "Any quadratic ax² + bx + c can be rewritten in vertex form a(x − h)² + k. This form is useful because the vertex (h, k) and axis of symmetry x = h are immediately visible — no differentiation needed.",
          "The key step is to complete the square. For x² + bx, add and subtract (b/2)² to create a perfect square trinomial: x² + bx = (x + b/2)² − (b/2)². For example, x² + 6x = (x + 3)² − 9.",
          "When a ≠ 1, factor out a from the first two terms before completing the square. For 2x² − 8x + 3: factor to get 2(x² − 4x) + 3. Complete the square inside the bracket: 2[(x−2)² − 4] + 3 = 2(x−2)² − 5.",
          "To solve a quadratic by completing the square: write it in the form (x − h)² = c, then take the square root of both sides: x − h = ±√c, giving x = h ± √c. This method always works, even when the quadratic does not factorise over the integers.",
        ],
        latexBlocks: [
          "x^2 + bx = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2",
          "ax^2 + bx + c = a(x-h)^2 + k, \\quad h = -\\frac{b}{2a}, \\quad k = c - \\frac{b^2}{4a}",
          "\\text{Vertex: }(h,\\,k), \\quad \\text{Axis of symmetry: } x = h",
        ],
      },
      workedExamples: [
        {
          title: "Complete the square for a monic quadratic",
          questionLatex: "\\text{Write } x^2 + 6x + 5 \\text{ in the form }(x+h)^2 + k.",
          steps: [
            {
              explanation: "Take half the coefficient of x: (6/2)² = 9. Add and subtract 9.",
              latex: "x^2 + 6x + 5 = (x^2 + 6x + 9) - 9 + 5",
            },
            {
              explanation: "The trinomial x² + 6x + 9 is the perfect square (x+3)².",
              latex: "(x+3)^2 - 4",
            },
          ],
          finalAnswerLatex: "(x+3)^2 - 4, \\quad \\text{vertex }(-3,\\,-4)",
        },
        {
          title: "Complete the square when a ≠ 1",
          questionLatex: "\\text{Write } 2x^2 - 8x + 3 \\text{ in the form }a(x-h)^2 + k.",
          steps: [
            {
              explanation: "Factor 2 from the first two terms.",
              latex: "2(x^2 - 4x) + 3",
            },
            {
              explanation: "Complete the square inside the bracket: (4/2)² = 4.",
              latex: "2[(x-2)^2 - 4] + 3",
            },
            {
              explanation: "Expand the factor of 2 and simplify.",
              latex: "2(x-2)^2 - 8 + 3 = 2(x-2)^2 - 5",
            },
          ],
          finalAnswerLatex: "2(x-2)^2 - 5, \\quad \\text{vertex }(2,\\,-5)",
        },
        {
          title: "Solve a quadratic by completing the square",
          questionLatex: "\\text{Solve } x^2 + 4x - 3 = 0",
          steps: [
            {
              explanation: "Complete the square: (4/2)² = 4. Add and subtract 4.",
              latex: "(x+2)^2 - 4 - 3 = 0",
            },
            {
              explanation: "Isolate the perfect square.",
              latex: "(x+2)^2 = 7",
            },
            {
              explanation: "Take the square root of both sides.",
              latex: "x + 2 = \\pm\\sqrt{7}",
            },
            {
              explanation: "Solve for x.",
              latex: "x = -2 \\pm \\sqrt{7}",
            },
          ],
          finalAnswerLatex: "x = -2 + \\sqrt{7} \\quad \\text{or} \\quad x = -2 - \\sqrt{7}",
        },
      ],
      guidedPractice: [
        qa("y11adv-cts-g1", "Complete the square for $x^2 + 4x + 1$. Find $k$ in $(x+2)^2 + k$.", "x^2 + 4x + 1 = (x+2)^2 + k", "-3", "Expand (x+2)² = x² + 4x + 4. Then k = 1 − 4.", "(x+2)² = x² + 4x + 4. So k = 1 − 4 = −3.", ["-3", "−3"]),
        qa("y11adv-cts-g2", "For $x^2 - 10x + 20 = (x-h)^2 + k$, find $h$.", "x^2 - 10x + 20 = (x-h)^2 + k", "5", "h = half the coefficient of x (with sign): −10/2 = −5, so h = 5.", "Half of −10 is −5, so we write (x−5)². Here h = 5."),
        practicalChoice("y11adv-cts-g3", "The vertex form $a(x-h)^2 + k$ directly reveals which features?", "C", ["The x-intercepts", "The y-intercept only", "The vertex and axis of symmetry", "The leading coefficient only"], "Reading off h and k gives the vertex (h, k) and axis x = h without any further calculation."),
        qa("y11adv-cts-g4", "Find the x-coordinate of the vertex of $f(x) = x^2 + 4x - 3$.", "f(x) = (x+2)^2 - 7,\\quad \\text{vertex at }x=?", "-2", "Complete the square: (x+2)² − 7. Vertex x-coordinate is −2.", "f(x) = (x+2)² − 4 − 3 = (x+2)² − 7. Vertex is (−2, −7). x-coordinate = −2.", ["-2", "−2"]),
      ],
      independentPractice: [
        qa("y11adv-cts-i1", "Find $k$ for $x^2 + 2x + 5 = (x+1)^2 + k$.", "x^2 + 2x + 5 = (x+1)^2 + k", "4", "Expand (x+1)² = x²+2x+1. Then k = 5 − 1.", "k = 5 − 1 = 4."),
        qa("y11adv-cts-i2", "Find the y-coordinate of the vertex of $f(x) = x^2 - 6x + 2$.", "f(x) = (x-3)^2 - 9 + 2 = (x-3)^2 - 7", "-7", "Complete the square: (x−3)² − 7. Vertex y-coordinate is −7.", "f(x) = (x−3)² − 9 + 2 = (x−3)² − 7. Vertex y-coordinate = −7.", ["-7", "−7"]),
        qa("y11adv-cts-i3", "Solve $x^2 + 2x - 8 = 0$ by completing the square. Enter the positive root.", "(x+1)^2 = 9,\\quad x = -1 \\pm 3", "2", "(x+1)² − 1 − 8 = 0 → (x+1)² = 9 → x = −1 ± 3.", "(x+1)² = 9 → x = −1 + 3 = 2 or x = −1 − 3 = −4. Positive root = 2."),
        practicalChoice("y11adv-cts-i4", "The axis of symmetry of $f(x) = a(x-h)^2 + k$ is:", "A", ["$x = h$", "$x = k$", "$x = -h$", "$x = -k$"], "The axis of symmetry is the vertical line through the vertex. The vertex is (h, k), so the axis is x = h."),
        qa("y11adv-cts-i5", "Find $k$ for $3x^2 - 12x + 7 = 3(x-2)^2 + k$.", "3(x-2)^2 = 3x^2-12x+12,\\quad k=7-12", "-5", "3(x−2)² = 3x² − 12x + 12. So k = 7 − 12.", "3(x−2)² = 3x² − 12x + 12. k = 7 − 12 = −5.", ["-5", "−5"]),
      ],
      commonMistakes: [
        { mistake: "Adding (b/2)² without subtracting it, changing the value of the expression.", fix: "Always add and subtract (b/2)² — or equivalently, complete the square and then adjust the constant to compensate." },
        { mistake: "Reading h as positive when the vertex form is (x + h)² + k, giving the wrong vertex sign.", fix: "The form is (x − h)², so if you see (x + 3)², that means x − (−3)², giving vertex x = −3, not x = 3." },
        { mistake: "Forgetting to multiply (b/2)² by a when a ≠ 1.", fix: "When factoring out a before completing the square, the adjustment inside the bracket is then multiplied by a when redistributed: a[(x−h)² − c] = a(x−h)² − ac." },
        { mistake: "Only taking the positive square root when solving (x−h)² = c.", fix: "Taking the square root gives ±√c. Both solutions must be considered: x = h + √c and x = h − √c." },
      ],
      masteryQuiz: [
        qa("y11adv-cts-m1", "Find $k$ for $x^2 + 8x + 7 = (x+4)^2 + k$.", "x^2+8x+7=(x+4)^2+k", "-9", "Expand (x+4)² = x²+8x+16. k = 7 − 16.", "k = 7 − 16 = −9.", ["-9", "−9"]),
        qa("y11adv-cts-m2", "State the x-coordinate of the vertex of $f(x) = (x-5)^2 + 3$.", "f(x)=(x-5)^2+3,\\quad \\text{vertex at }(h,k)", "5", "Read h directly: (x − h)² with h = 5.", "Vertex form (x−5)² + 3: h = 5, k = 3. Vertex x-coordinate = 5."),
        qa("y11adv-cts-m3", "Solve $x^2 - 6x - 7 = 0$ by completing the square. Enter the larger root.", "(x-3)^2 = 16,\\quad x = 3 \\pm 4", "7", "(x−3)² − 9 − 7 = 0 → (x−3)² = 16 → x = 7 or x = −1.", "(x−3)² = 16 → x = 3 + 4 = 7 or x = 3 − 4 = −1. Larger root = 7."),
        practicalChoice("y11adv-cts-m4", "In the form $a(x-h)^2 + k$ with $a < 0$, the parabola:", "B", ["Opens upward (minimum at vertex)", "Opens downward (maximum at vertex)", "Has no vertex", "Has two axes of symmetry"], "When a < 0 the squared term is always ≤ 0, so the vertex gives the maximum value of f."),
        qa("y11adv-cts-m5", "Find $k$ for $2x^2 + 4x + 9 = 2(x+1)^2 + k$.", "2(x+1)^2 = 2x^2+4x+2,\\quad k=9-2", "7", "2(x+1)² = 2x²+4x+2. k = 9 − 2.", "k = 9 − 2 = 7."),
        qa("y11adv-cts-m6", "Find the y-coordinate of the vertex of $f(x) = 3x^2 - 6x + 1$.", "3x^2-6x+1=3(x-1)^2-2,\\quad \\text{vertex }y=?", "-2", "3(x−1)² = 3x²−6x+3. k = 1 − 3 = −2.", "3x²−6x+1 = 3(x−1)² − 3 + 1 = 3(x−1)² − 2. Vertex y-coordinate = −2.", ["-2", "−2"]),
        practicalChoice("y11adv-cts-m7", "Which method is guaranteed to solve any quadratic equation?", "C", ["Factorisation over the integers", "Inspection only", "Completing the square", "Using the axis of symmetry only"], "Completing the square always works because every quadratic can be written in vertex form, and then (x−h)² = c can always be solved (with real solutions when c ≥ 0)."),
        qa("y11adv-cts-m8", "Solve $y = (x-3)^2 - 16 = 0$. Enter the smaller root.", "(x-3)^2=16,\\quad x=3\\pm 4", "-1", "(x−3) = ±4 → x = 7 or x = −1. Smaller root = −1.", "x = 3 − 4 = −1 or x = 3 + 4 = 7. Smaller root = −1.", ["-1", "−1"]),
        qa("y11adv-cts-m9", "Find $h$ for $4x^2 - 24x + 11 = 4(x-h)^2 + k$.", "h = \\frac{24}{2 \\times 4} = 3", "3", "h = coefficient of x ÷ (2a) = 24 ÷ 8 = 3.", "Factoring: 4(x² − 6x) + 11. Half of −6 is −3, so (x−3)². h = 3."),
        practicalChoice("y11adv-cts-m10", "The vertex form $a(x-h)^2 + k$ is useful for graphing because:", "A", ["It gives the vertex and axis of symmetry directly without calculus", "It shows the x-intercepts directly", "It always has integer coefficients", "It is the only form that shows the y-intercept"], "Reading (h, k) from vertex form gives the vertex and therefore the axis of symmetry — all without differentiation."),
      ],
      masteryQuizPool: [
        { id: "y11adv-cts-p1", prompt: "Find $k$ for $x^2+4x+1=(x+2)^2+k$.", latex: "x^2+4x+1=(x+2)^2+k", answer: "-3", difficulty: 1, acceptedAnswers: ["-3", "−3"], hint: "Expand $(x+2)^2$.", explanation: "$k=1-4=-3$." },
        { id: "y11adv-cts-p2", prompt: "Find $k$ for $x^2+2x+5=(x+1)^2+k$.", latex: "x^2+2x+5=(x+1)^2+k", answer: "4", difficulty: 1, hint: "Expand $(x+1)^2$.", explanation: "$k=5-1=4$." },
        { id: "y11adv-cts-p3", prompt: "Find $k$ for $x^2+8x+7=(x+4)^2+k$.", latex: "x^2+8x+7=(x+4)^2+k", answer: "-9", difficulty: 1, acceptedAnswers: ["-9", "−9"], hint: "Expand $(x+4)^2$.", explanation: "$k=7-16=-9$." },
        { id: "y11adv-cts-p4", prompt: "For $x^2-10x+20=(x-h)^2+k$, find $h$.", latex: "x^2-10x+20=(x-h)^2+k", answer: "5", difficulty: 2, hint: "Half the $x$ coefficient.", explanation: "$h=5$." },
        { id: "y11adv-cts-p5", prompt: "State the x-coordinate of the vertex of $f(x)=(x-5)^2+3$.", latex: "f(x)=(x-5)^2+3", answer: "5", difficulty: 1, hint: "Read $h$.", explanation: "Vertex x-coordinate is $5$." },
        { id: "y11adv-cts-p6", prompt: "Find the x-coordinate of the vertex of $f(x)=x^2+4x-3$.", latex: "f(x)=(x+2)^2-7", answer: "-2", difficulty: 2, acceptedAnswers: ["-2", "−2"], hint: "Complete the square.", explanation: "$(x+2)^2-7$; vertex x is $-2$." },
        { id: "y11adv-cts-p7", prompt: "Find the y-coordinate of the vertex of $f(x)=x^2-6x+2$.", latex: "f(x)=(x-3)^2-7", answer: "-7", difficulty: 2, acceptedAnswers: ["-7", "−7"], hint: "Complete the square.", explanation: "$(x-3)^2-7$; vertex y is $-7$." },
        { id: "y11adv-cts-p8", prompt: "Solve $x^2+2x-8=0$ by completing the square. Enter the positive root.", latex: "(x+1)^2=9", answer: "2", difficulty: 3, hint: "$(x+1)^2=9$.", explanation: "$x=-1\\pm 3$ gives $2,-4$; positive is $2$." },
        { id: "y11adv-cts-p9", prompt: "The axis of symmetry of $f(x)=a(x-h)^2+k$ is:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$x=h$" }, { label: "B", text: "$x=k$" }, { label: "C", text: "$x=-h$" }, { label: "D", text: "$x=-k$" }], hint: "Vertical line through the vertex.", explanation: "$x=h$." },
        { id: "y11adv-cts-p10", prompt: "Find $k$ for $3x^2-12x+7=3(x-2)^2+k$.", latex: "3(x-2)^2=3x^2-12x+12", answer: "-5", difficulty: 3, acceptedAnswers: ["-5", "−5"], hint: "$3(x-2)^2=3x^2-12x+12$.", explanation: "$k=7-12=-5$." },
        { id: "y11adv-cts-p11", prompt: "The vertex form directly reveals which features?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "The x-intercepts" }, { label: "B", text: "The y-intercept only" }, { label: "C", text: "The vertex and axis of symmetry" }, { label: "D", text: "The leading coefficient only" }], hint: "Read $h$ and $k$.", explanation: "Vertex $(h,k)$ and axis $x=h$." },
        { id: "y11adv-cts-p12", prompt: "Solve $x^2-6x-7=0$ by completing the square. Enter the larger root.", latex: "(x-3)^2=16", answer: "7", difficulty: 3, hint: "$(x-3)^2=16$.", explanation: "$x=3\\pm 4$ gives $7,-1$; larger is $7$." },
        { id: "y11adv-cts-p13", prompt: "Find $k$ for $2x^2+4x+9=2(x+1)^2+k$.", latex: "2(x+1)^2=2x^2+4x+2", answer: "7", difficulty: 3, hint: "$2(x+1)^2=2x^2+4x+2$.", explanation: "$k=9-2=7$." },
        { id: "y11adv-cts-p14", prompt: "Find the y-coordinate of the vertex of $f(x)=3x^2-6x+1$.", latex: "3x^2-6x+1=3(x-1)^2-2", answer: "-2", difficulty: 3, acceptedAnswers: ["-2", "−2"], hint: "Complete the square.", explanation: "$3(x-1)^2-2$; vertex y is $-2$." },
        { id: "y11adv-cts-p15", prompt: "In $a(x-h)^2+k$ with $a<0$, the parabola:", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Opens upward (minimum)" }, { label: "B", text: "Opens downward (maximum)" }, { label: "C", text: "Has no vertex" }, { label: "D", text: "Has two axes" }], hint: "Sign of $a$.", explanation: "$a<0$ opens downward; vertex is a maximum." },
        { id: "y11adv-cts-p16", prompt: "Which method always solves any quadratic?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Integer factorisation" }, { label: "B", text: "Inspection only" }, { label: "C", text: "Completing the square" }, { label: "D", text: "Axis of symmetry only" }], hint: "Always reaches vertex form.", explanation: "Completing the square always works." },
        { id: "y11adv-cts-p17", prompt: "Solve $(x-3)^2-16=0$. Enter the smaller root.", latex: "(x-3)^2=16", answer: "-1", difficulty: 3, acceptedAnswers: ["-1", "−1"], hint: "$x-3=\\pm 4$.", explanation: "$x=7$ or $-1$; smaller is $-1$." },
        { id: "y11adv-cts-p18", prompt: "Find $h$ for $4x^2-24x+11=4(x-h)^2+k$.", latex: "h=\\frac{24}{2\\times 4}", answer: "3", difficulty: 4, hint: "$h=\\frac{b}{2a}$ in magnitude.", explanation: "$h=24/8=3$." },
        { id: "y11adv-cts-p19", prompt: "State the x-coordinate of the vertex of $f(x)=(x+7)^2-2$.", latex: "f(x)=(x+7)^2-2", answer: "-7", difficulty: 2, acceptedAnswers: ["-7", "−7"], hint: "$(x-h)^2$ with $h=-7$.", explanation: "Vertex x is $-7$." },
        { id: "y11adv-cts-p20", prompt: "Find $k$ for $x^2-8x+10=(x-4)^2+k$.", latex: "x^2-8x+10=(x-4)^2+k", answer: "-6", difficulty: 3, acceptedAnswers: ["-6", "−6"], hint: "Expand $(x-4)^2$.", explanation: "$k=10-16=-6$." },
        { id: "y11adv-cts-p21", prompt: "Solve $x^2+4x-1=0$ by completing the square. The roots are $-2\\pm\\sqrt{c}$. Find $c$.", latex: "(x+2)^2=5", answer: "5", difficulty: 4, hint: "$(x+2)^2=5$.", explanation: "$c=5$." },
        { id: "y11adv-cts-p22", prompt: "Find the minimum value of $f(x)=x^2-6x+11$.", latex: "f(x)=(x-3)^2+2", answer: "2", difficulty: 4, hint: "Complete the square; minimum is $k$.", explanation: "$(x-3)^2+2$; minimum value is $2$." },
        { id: "y11adv-cts-p23", prompt: "Find the maximum value of $f(x)=-x^2+4x+1$.", latex: "f(x)=-(x-2)^2+5", answer: "5", difficulty: 5, hint: "Complete the square; maximum is $k$.", explanation: "$-(x-2)^2+5$; maximum value is $5$." },
        { id: "y11adv-cts-p24", prompt: "For $f(x)=2x^2-8x+3$ written $2(x-h)^2+k$, find $h$.", latex: "2(x^2-4x)+3", answer: "2", difficulty: 4, hint: "Half of 4 after factoring out 2.", explanation: "$h=2$." },
        { id: "y11adv-cts-p25", prompt: "For $f(x)=2x^2-8x+3$ written $2(x-2)^2+k$, find $k$.", latex: "2(x-2)^2=2x^2-8x+8", answer: "-5", difficulty: 5, acceptedAnswers: ["-5", "−5"], hint: "$2(x-2)^2=2x^2-8x+8$.", explanation: "$k=3-8=-5$." },
        { id: "y11adv-cts-p26", prompt: "Solve $x^2-2x-5=0$. The roots are $1\\pm\\sqrt{c}$. Find $c$.", latex: "(x-1)^2=6", answer: "6", difficulty: 5, hint: "$(x-1)^2=6$.", explanation: "$c=6$." },
        { id: "y11adv-cts-p27", prompt: "The graph $y=x^2+bx+9$ has vertex on the y-axis. Find $b$.", latex: "h=-\\frac{b}{2}=0", answer: "0", difficulty: 5, hint: "Vertex on the y-axis means $h=0$.", explanation: "$-\\frac{b}{2}=0$ gives $b=0$." },
        { id: "y11adv-cts-p28", prompt: "Find the x-coordinate of the minimum of $f(x)=x^2-10x+3$.", latex: "h=\\frac{10}{2}", answer: "5", difficulty: 4, hint: "$h=\\frac{-b}{2a}$.", explanation: "$h=5$." },
        { id: "y11adv-cts-p29", prompt: "For $f(x)=(x-4)^2+k$ the minimum value is $-1$. Find $k$.", latex: "f(x)=(x-4)^2+k", answer: "-1", difficulty: 4, acceptedAnswers: ["-1", "−1"], hint: "Minimum value equals $k$.", explanation: "$k=-1$." },
        { id: "y11adv-cts-p30", prompt: "$f(x)=x^2+6x+5$ in vertex form is $(x+3)^2+k$. Solve $f(x)=0$ and enter the larger root.", latex: "(x+3)^2=4", answer: "-1", difficulty: 5, acceptedAnswers: ["-1", "−1"], hint: "$(x+3)^2=4$.", explanation: "$x=-3\\pm 2$ gives $-1,-5$; larger is $-1$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-cts-mp1",
          prompt: "Let $f(x) = x^2 + 6x + 5$.",
          latex: "f(x) = x^2 + 6x + 5",
          answer: "-4",
          hint: "Complete the square by adding and subtracting (6/2)² = 9. The vertex is at (−3, −4). For (c), set f(x) = 0 and use the vertex form.",
          explanation: "(a) k = 5 − 9 = −4. (b) Vertex x = −3. (c) (x+3)² = 4 → x = −3 ± 2, roots −1 and −5. Larger = −1.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Complete the square to write $f(x) = (x+3)^2 + k$. Find $k$.",
              latex: "f(x) = (x+3)^2 + k",
              marks: 2,
              answer: "-4",
              acceptedAnswers: ["-4", "−4"],
              hint: "Expand (x+3)² = x²+6x+9. Then k = 5 − 9.",
              explanation: "(x+3)² = x²+6x+9. So f(x) = (x+3)² − 9 + 5 = (x+3)² − 4. k = −4.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the x-coordinate of the vertex.",
              marks: 1,
              answer: "-3",
              acceptedAnswers: ["-3", "−3"],
              hint: "The vertex is at (h, k) where the form is (x − h)².",
              explanation: "f(x) = (x+3)² − 4 = (x−(−3))² − 4. Vertex x = −3.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Solve $f(x) = 0$ using the completed-square form. Enter the larger root.",
              marks: 2,
              answer: "-1",
              acceptedAnswers: ["-1", "−1"],
              hint: "(x+3)² = 4 → x + 3 = ±2.",
              explanation: "(x+3)² − 4 = 0 → (x+3)² = 4 → x = −3 ± 2. Roots: −1 and −5. Larger = −1.",
            },
          ],
        },
        {
          id: "y11adv-cts-mp2",
          prompt: "Let $g(x) = 2x^2 - 8x + 3$.",
          latex: "g(x) = 2x^2 - 8x + 3",
          answer: "2",
          hint: "Factor 2 from the first two terms. Complete the square inside the bracket. For (c), look at the sign of a.",
          explanation: "(a) h = 2 (since 8/(2×2) = 2). (b) 2(x−2)² = 2x²−8x+8, so k = 3 − 8 = −5. (c) a = 2 > 0, so minimum.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Write $g(x) = 2(x-h)^2 + k$. Find $h$.",
              marks: 1,
              answer: "2",
              hint: "Factor out 2: g(x) = 2(x² − 4x) + 3. Half of 4 is 2.",
              explanation: "2(x² − 4x) + 3 = 2[(x−2)² − 4] + 3. So h = 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find $k$.",
              marks: 2,
              answer: "-5",
              acceptedAnswers: ["-5", "−5"],
              hint: "Expand 2[(x−2)² − 4] = 2(x−2)² − 8. Then add 3.",
              explanation: "g(x) = 2(x−2)² − 8 + 3 = 2(x−2)² − 5. k = −5.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Does the vertex give a minimum or maximum value of $g(x)$?",
              marks: 1,
              answer: "minimum",
              acceptedAnswers: ["minimum", "min"],
              hint: "Look at the sign of a in a(x−h)² + k.",
              explanation: "a = 2 > 0, so the parabola opens upward and the vertex is a minimum.",
            },
          ],
        },
      ],
    };
  }

  return null;
}

