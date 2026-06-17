import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CartesianGraph, CartesianPoint } from "../types";
import {
  practicalChoice,
  moneyAnswer as baseMoneyAnswer,
  linearAnswer as baseLinearAnswer,
} from "../questionHelpers";

function algebraicRelationshipsFeedback(prompt: string, answer: string) {
  const lowerPrompt = prompt.toLowerCase();

  if (
    lowerPrompt.includes("equal after how many") ||
    lowerPrompt.includes("equal at what") ||
    lowerPrompt.includes("find d when costs are equal") ||
    lowerPrompt.includes("are equal after how many")
  ) {
    return `When two models are equal, they describe the same output at the same input. Set the full expressions equal and solve for the input to get ${answer}.`;
  }
  if (lowerPrompt.includes("booking fee") && lowerPrompt.includes("per hour")) {
    return `Build the cost as fixed fee plus hourly rate times hours. That gives 30 + 15(4) = ${answer}.`;
  }
  if (lowerPrompt.includes("find the equal cost")) {
    return `At the intersection input, both models give the same output. Substitute the given input into either full model to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("write") ||
    lowerPrompt.includes("write the") ||
    lowerPrompt.includes("write c") ||
    lowerPrompt.includes("write s") ||
    lowerPrompt.includes("write v") ||
    lowerPrompt.includes("write f")
  ) {
    return `A linear model is starting value plus rate times input. Put the fixed amount on its own and multiply the repeating rate by the variable to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("equal cost") ||
    lowerPrompt.includes("find c") ||
    lowerPrompt.includes("find s") ||
    lowerPrompt.includes("find the cost") ||
    lowerPrompt.includes("find the fare")
  ) {
    return `The rule already describes the output from the input. Substitute the given input into the model and calculate the total to get ${answer}.`;
  }
  return `Identify the starting value, the rate and the input before calculating. Following the linear model gives ${answer}.`;
}

function linearAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseLinearAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: algebraicRelationshipsFeedback(prompt, answer),
  };
}

function moneyAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseMoneyAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: algebraicRelationshipsFeedback(prompt, answer),
  };
}

// Returns safe numeric formatting equivalents: integer "7" → ["7.0"],
// decimal "7.5" → ["7.50"]. Does not touch answers with letters/symbols.
function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^\d+$/.test(t)) return [`${t}.0`];
  if (/^\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

function algebraAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...numericFormatVariants(answer), ...acceptedAnswers])),
    hint: "Identify the model type first, then use the feature or calculation that matches the question.",
    explanation,
    cartesianGraph,
  };
}

function algebraChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint: "Look for the feature that defines the model before choosing an option.",
    explanation,
    cartesianGraph,
  };
}

function parabolaGraph(
  description: string,
  a: number,
  b: number,
  c: number,
  points: CartesianPoint[] = [],
  domain = { xMin: 0, xMax: 8, yMin: 0, yMax: 50, xStep: 1, yStep: 10 }
): CartesianGraph {
  return {
    description,
    ...domain,
    xAxisLabel: "input",
    yAxisLabel: "output",
    parabolas: [{ kind: "quadratic", a, b, c }],
    points,
  };
}

function curveGraph(
  description: string,
  branches: CartesianPoint[][],
  domain: Pick<CartesianGraph, "xMin" | "xMax" | "yMin" | "yMax" | "xStep" | "yStep">
): CartesianGraph {
  return {
    description,
    ...domain,
    points: branches.flat(),
    lineSegments: branches.flatMap((branch) =>
      branch.slice(1).map((point, index) => ({
        from: branch[index],
        to: point,
      }))
    ),
  };
}

const heightParabola = parabolaGraph(
  "Downward-opening height parabola for h equals negative 5 times t squared plus 20t plus 1.5, with maximum at 2 seconds.",
  -5,
  20,
  1.5,
  [{ x: 0, y: 1.5, label: "(0, 1.5)" }, { x: 2, y: 21.5, label: "maximum (2, 21.5)" }],
  { xMin: 0, xMax: 4.2, yMin: 0, yMax: 25, xStep: 1, yStep: 5 }
);

const revenueParabola = parabolaGraph(
  "Downward-opening revenue parabola for R equals negative 2p squared plus 40p, with maximum at p equals 10.",
  -2,
  40,
  0,
  [{ x: 10, y: 200, label: "maximum (10, 200)" }],
  { xMin: 0, xMax: 20, yMin: 0, yMax: 220, xStep: 5, yStep: 50 }
);

const costParabola = parabolaGraph(
  "Upward-opening cost parabola for C equals 3 times x minus 4 squared plus 120, with minimum at x equals 4.",
  3,
  -24,
  168,
  [{ x: 4, y: 120, label: "minimum (4, 120)" }],
  { xMin: 0, xMax: 8, yMin: 100, yMax: 180, xStep: 1, yStep: 20 }
);

const exponentialGrowthGraph = curveGraph(
  "Exponential growth curve for V equals 100 times 2 to the power of x, showing repeated doubling.",
  [[{ x: 0, y: 100 }, { x: 1, y: 200 }, { x: 2, y: 400 }, { x: 3, y: 800 }]],
  { xMin: 0, xMax: 3, yMin: 0, yMax: 850, xStep: 1, yStep: 200 }
);

const exponentialDecayGraph = curveGraph(
  "Exponential decay curve for V equals 80 times 0.5 to the power of x, showing repeated halving.",
  [[{ x: 0, y: 80 }, { x: 1, y: 40 }, { x: 2, y: 20 }, { x: 3, y: 10 }]],
  { xMin: 0, xMax: 4, yMin: 0, yMax: 90, xStep: 1, yStep: 20 }
);

const inverseVariationGraph = curveGraph(
  "Inverse variation curve for y equals 24 divided by x. The positive branch approaches but never reaches either axis.",
  [[{ x: 1, y: 24 }, { x: 2, y: 12 }, { x: 3, y: 8 }, { x: 4, y: 6 }, { x: 6, y: 4 }, { x: 8, y: 3 }]],
  { xMin: 0, xMax: 9, yMin: 0, yMax: 26, xStep: 1, yStep: 5 }
);
const reciprocalGraph = curveGraph(
  "Rectangular hyperbola y = 12/x. Branch in Q1 (positive x): as x increases y decreases toward 0. Branch in Q3 (negative x): as x decreases y approaches 0 from below. Asymptotes: x = 0 and y = 0.",
  [
    [{ x: 1, y: 12 }, { x: 2, y: 6 }, { x: 3, y: 4 }, { x: 4, y: 3 }, { x: 6, y: 2 }, { x: 12, y: 1 }],
    [{ x: -1, y: -12 }, { x: -2, y: -6 }, { x: -3, y: -4 }, { x: -4, y: -3 }, { x: -6, y: -2 }, { x: -12, y: -1 }],
  ],
  { xMin: -13, xMax: 13, yMin: -13, yMax: 13, xStep: 2, yStep: 2 }
);

export function year12Standard2AlgebraicRelationshipsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    (course.slug !== "year-12-standard-2" &&
      course.slug !== "year-12-standard-1") ||
    unit.slug !== "algebraic-relationships"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "algebraic-relationships-revision") {
    return {
      ...base,
      description:
        "Consolidate Year 11 linear algebra: solve one- and two-step equations, substitute into formulas, identify gradient and y-intercept, and plot straight-line graphs from tables.",
      learningIntention:
        "Activate Year 11 linear algebra skills needed for Year 12 algebraic relationships — solving equations, substitution, and interpreting straight-line graphs.",
      successCriteria: [
        "Solve one- and two-step linear equations for an unknown.",
        "Substitute a given value into a formula and evaluate the result.",
        "Identify the gradient m and y-intercept b in y = mx + b and interpret them in context.",
        "Build a table of values for a linear rule and identify the relationship as linear.",
      ],
      teaching: {
        paragraphs: [
          "A linear equation can be solved by performing the same operation on both sides until the unknown is isolated. For two-step equations, undo addition/subtraction first, then multiplication/division.",
          "Substitution means replacing a variable with a known value to find an unknown. If y = 3x − 2 and x = 4, substitute to get y = 3(4) − 2 = 10. This skill is essential in every Year 12 topic — from exponential models to finance formulas.",
          "The equation y = mx + b describes a straight line. m is the gradient (rate of change — how much y changes when x increases by 1). b is the y-intercept (the value of y when x = 0). A positive m means the line rises; negative m means it falls.",
          "To check whether a relationship is linear, build a table of values and check that y changes by a constant amount each time x increases by 1 (constant first differences). Linear tables show equal jumps in y.",
        ],
        latexBlocks: [
          "y = mx + b\\quad(m = \\text{gradient},\\;b = y\\text{-intercept})",
          "\\text{gradient} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y_2 - y_1}{x_2 - x_1}",
          "\\text{Substitute: replace }x\\text{ with a number, then evaluate.}",
        ],
      },
      workedExamples: [
        {
          title: "Solve a linear equation and substitute",
          questionLatex:
            "\\text{(a) Solve }3x - 7 = 14\\text{. (b) Substitute the answer into }y = 2x - 3.",
          steps: [
            {
              explanation: "(a) Add 7 to both sides, then divide by 3.",
              latex:
                "3x = 21 \\implies x = 7",
            },
            {
              explanation: "(b) Substitute x = 7.",
              latex: "y = 2(7) - 3 = 14 - 3 = 11",
            },
          ],
          finalAnswerLatex: "x = 7;\\quad y = 11",
        },
        {
          title: "Gradient, y-intercept and x-intercept",
          questionLatex:
            "\\text{For }y = -2x + 6\\text{, state the gradient and y-intercept. Then find the x-intercept.}",
          steps: [
            {
              explanation: "Compare with y = mx + b: gradient m = −2, y-intercept b = 6.",
              latex: "m = -2,\\quad b = 6",
            },
            {
              explanation: "Set y = 0 to find the x-intercept.",
              latex: "0 = -2x + 6 \\implies 2x = 6 \\implies x = 3",
            },
          ],
          finalAnswerLatex:
            "m = -2,\\;b = 6;\\quad x\\text{-intercept} = 3",
        },
        {
          title: "Build a table and identify a linear rule",
          questionLatex:
            "\\text{A phone plan costs }\\$5\\text{ per month plus }\\$0.20\\text{ per minute. Build a table for }m = 0, 5, 10, 15\\text{ min and identify the rule.}",
          steps: [
            {
              explanation: "Cost C = 5 + 0.20m. Substitute each value.",
              latex:
                "m=0\\Rightarrow C=5,\\quad m=5\\Rightarrow C=6,\\quad m=10\\Rightarrow C=7,\\quad m=15\\Rightarrow C=8",
            },
            {
              explanation: "Each extra 5 minutes adds $1 → constant increase → linear relationship.",
              latex: "C = 0.20m + 5",
            },
          ],
          finalAnswerLatex: "C = 0.20m + 5",
        },
      ],
      guidedPractice: [
        algebraChoice(
          "y12s2-alr-g1",
          "Solve 4x − 3 = 13.",
          "C",
          ["x = 2.5", "x = 3", "x = 4", "x = 10"],
          "4x = 16 → x = 4."
        ),
        algebraAnswer(
          "y12s2-alr-g2",
          "y = 3x − 5. Find y when x = 4.",
          "y = 3(4) - 5",
          "7",
          "y = 12 − 5 = 7."
        ),
        algebraChoice(
          "y12s2-alr-g3",
          "For y = −3x + 5, the gradient is:",
          "A",
          ["−3", "5", "3", "−5"],
          "In y = mx + b, m is the gradient. Here m = −3."
        ),
        algebraAnswer(
          "y12s2-alr-g4",
          "y = 4x + 1. Find x when y = 13.",
          "13 = 4x + 1 \\implies 4x = 12",
          "3",
          "4x = 12 → x = 3."
        ),
      ],
      independentPractice: [
        algebraChoice(
          "y12s2-alr-i1",
          "Solve 2x + 9 = 21.",
          "C",
          ["x = 5", "x = 7", "x = 6", "x = 15"],
          "2x = 12 → x = 6."
        ),
        algebraAnswer(
          "y12s2-alr-i2",
          "y = −2x + 10. Find x when y = 0.",
          "0 = -2x + 10 \\implies 2x = 10",
          "5",
          "2x = 10 → x = 5 (the x-intercept)."
        ),
        algebraChoice(
          "y12s2-alr-i3",
          "A table of values: x = 0, 1, 2, 3 gives y = 3, 7, 11, 15. The rule is:",
          "B",
          ["y = 3x", "y = 4x + 3", "y = 3x + 4", "y = 7x"],
          "Each increase of 1 in x gives +4 in y (gradient 4). y-intercept = 3. Rule: y = 4x + 3."
        ),
        algebraAnswer(
          "y12s2-alr-i4",
          "y = 5x − 8. Find y when x = 3.",
          "y = 5(3) - 8",
          "7",
          "y = 15 − 8 = 7."
        ),
        algebraChoice(
          "y12s2-alr-i5",
          "The y-intercept of y = 6x − 4 is:",
          "B",
          ["6", "−4", "4", "−6"],
          "In y = mx + b, b = −4 is the y-intercept."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Solving 3x − 7 = 14 by subtracting 7 from both sides first.",
          fix: "The equation has −7 on the left. To undo subtraction, add 7 to both sides: 3x = 14 + 7 = 21, then x = 7.",
        },
        {
          mistake: "Reading m (gradient) as the y-intercept in y = mx + b.",
          fix: "In y = mx + b, m (the coefficient of x) is the gradient. b (the constant term added, not multiplied) is the y-intercept. In y = −3x + 5: gradient = −3, y-intercept = 5.",
        },
        {
          mistake: "Substituting incorrectly — replacing x with a number but forgetting the multiplication.",
          fix: "y = 2x − 3 with x = 4 means y = 2 × 4 − 3, not y = 24 − 3. Always use a multiplication sign or brackets when substituting.",
        },
        {
          mistake: "Concluding a table is linear without checking all first differences are equal.",
          fix: "Check every consecutive pair: y₁−y₀, y₂−y₁, y₃−y₂ must all be equal. If even one difference differs, the relationship is not linear.",
        },
      ],
      masteryQuiz: [
        algebraChoice(
          "y12s2-alr-m1",
          "Solve 5x + 3 = 28.",
          "C",
          ["x = 3", "x = 4", "x = 5", "x = 6"],
          "5x = 25 → x = 5."
        ),
        algebraAnswer(
          "y12s2-alr-m2",
          "y = 3x + 2. Find y when x = 5.",
          "y = 3(5) + 2",
          "17",
          "y = 15 + 2 = 17."
        ),
        algebraChoice(
          "y12s2-alr-m3",
          "The gradient of y = 4x − 9 is:",
          "A",
          ["4", "−9", "9", "−4"],
          "m = 4 in y = 4x − 9."
        ),
        algebraAnswer(
          "y12s2-alr-m4",
          "y = −x + 12. Find x when y = 4.",
          "4 = -x + 12 \\implies x = 8",
          "8",
          "x = 12 − 4 = 8."
        ),
        algebraChoice(
          "y12s2-alr-m5",
          "A taxi charges $3 flag fall plus $2/km. Cost for 7 km = ?",
          "C",
          ["$7", "$14", "$17", "$21"],
          "C = 3 + 2(7) = 3 + 14 = $17."
        ),
        algebraAnswer(
          "y12s2-alr-m6",
          "Solve 2(x − 3) = 10.",
          "2x - 6 = 10 \\implies 2x = 16",
          "8",
          "2x = 16 → x = 8."
        ),
        algebraChoice(
          "y12s2-alr-m7",
          "Table: x=0,1,2,3 → y=10,7,4,1. The gradient is:",
          "B",
          ["3", "−3", "10", "−10"],
          "y decreases by 3 each time x increases by 1: gradient = −3."
        ),
        algebraAnswer(
          "y12s2-alr-m8",
          "y = 2x + 7. Find y when x = 0.",
          "y = 2(0) + 7",
          "7",
          "y = 7. This is the y-intercept."
        ),
        algebraChoice(
          "y12s2-alr-m9",
          "Which equation has y-intercept 4 and gradient −1?",
          "B",
          ["y = 4x − 1", "y = −x + 4", "y = x − 4", "y = −4x + 1"],
          "y = −x + 4 has m = −1 and b = 4."
        ),
        algebraChoice(
          "y12s2-alr-m10",
          "y = 3x − 6 crosses the x-axis at:",
          "B",
          ["x = 3", "x = 2", "x = −2", "x = 6"],
          "0 = 3x − 6 → 3x = 6 → x = 2."
        ),
      ],
    };
  }

  if (lesson.slug === "linear-relationships-modelling") {
    return {
      ...base,
      description:
        "Build and interpret linear models from fixed costs, starting values, rates of change, tables, and practical equations.",
      learningIntention:
        "Use linear equations, tables, gradients, and intercepts to model practical situations.",
      successCriteria: [
        "Write a linear model from a fixed amount and constant rate.",
        "Interpret gradient as a rate of change in context.",
        "Interpret the intercept as a starting value or fixed cost when appropriate.",
        "Use a linear model or table to calculate and compare values.",
      ],
      teaching: {
        paragraphs: [
          "A linear model has a constant rate of change. In practical problems, this might be a fixed joining fee plus a weekly cost, a taxi flagfall plus a cost per kilometre, or a savings account growing by the same amount each week.",
          "The gradient is the rate of change. In the cost model below, the gradient 18 means the cost increases by 18 dollars each week.",
          "The intercept is the value when the input is 0. In a cost model, it often represents a fixed fee or starting amount.",
          "Tables can reveal linear patterns. If the output increases by the same amount whenever the input increases by 1, the relationship is linear.",
        ],
        latexBlocks: [
          "y=mx+b",
          "C=40+18w",
          "\\text{gradient}=\\frac{\\text{change in output}}{\\text{change in input}}",
          "\\text{linear model}=\\text{starting value}+\\text{rate}\\times\\text{input}",
        ],
      },
      workedExamples: [
        {
          title: "Build a linear model from a fixed fee and rate",
          questionLatex:
            "\\text{A gym charges }\\$40\\text{ plus }\\$18\\text{ per week.}",
          steps: [
            {
              explanation:
                "The fixed fee is paid when w = 0, so it is the intercept.",
              latex: "40",
            },
            {
              explanation:
                "The weekly cost is the gradient.",
              latex: "18w",
            },
          ],
          finalAnswerLatex: "C=40+18w",
        },
        {
          title: "Interpret gradient and intercept",
          questionLatex:
            "\\text{A phone plan is }C=25+0.12g\\text{, where }g\\text{ is extra GB.}",
          steps: [
            {
              explanation:
                "The intercept 25 is the base monthly cost before extra data.",
            },
            {
              explanation:
                "The gradient 0.12 is the cost per extra GB.",
            },
          ],
          finalAnswerLatex:
            "\\$25\\text{ base cost and }\\$0.12\\text{ per extra GB.}",
        },
        {
          title: "Use a linear model",
          questionLatex:
            "\\text{A hire cost is }C=35+12h.\\text{ Find the cost for }4\\text{ hours.}",
          steps: [
            {
              explanation:
                "Substitute h = 4 into the model.",
              latex: "C=35+12(4)",
            },
            {
              explanation: "Calculate the total cost.",
              latex: "C=83",
            },
          ],
          finalAnswerLatex: "\\$83",
        },
      ],
      guidedPractice: [
        linearAnswer("y12s2-lin-g1", "A gym charges a 40 dollar joining fee plus 18 dollars per week. Write a model for total cost C after w weeks.", "C=40+18w", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40", "c=18w+40"]),
        practicalChoice("y12s2-lin-g2", "A taxi fare is F = 6 + 2.40d. What does 6 represent?", "A", ["The fixed starting fare", "The cost per kilometre", "The distance travelled", "The total fare for 6 km"], "The intercept is the starting fare when d = 0."),
        moneyAnswer("y12s2-lin-g3", "A hire model is C = 35 + 12h. Find the cost for 3 hours.", "C=35+12h,\\quad h=3", "71"),
        practicalChoice("y12s2-lin-g4", "A table has costs 40, 58, 76, 94 for weeks 0, 1, 2, 3. What is the weekly increase?", "B", ["40 dollars", "18 dollars", "58 dollars", "94 dollars"], "The cost rises by 18 each week."),
      ],
      independentPractice: [
        linearAnswer("y12s2-lin-i1", "A bike hire costs 22 dollars plus 9 dollars per hour. Write the total cost C for h hours.", "C=22+9h", "C = 22 + 9h", ["C=22+9h", "c=22+9h", "C=9h+22", "c=9h+22"]),
        practicalChoice("y12s2-lin-i2", "In S = 120 + 25w for a savings plan, the gradient 25 represents:", "C", ["Starting savings", "Number of weeks", "Dollars saved per week", "Total savings after 25 weeks"], "The gradient is the weekly increase."),
        moneyAnswer("y12s2-lin-i3", "A taxi fare is F = 6 + 2.40d. Find the fare for 10 km.", "F=6+2.40d,\\quad d=10", "30"),
        linearAnswer("y12s2-lin-i4", "A water tank starts with 500 L and drains by 20 L each minute. Write V after t minutes.", "V=500-20t", "V = 500 - 20t", ["V=500-20t", "v=500-20t", "V=-20t+500", "v=-20t+500"]),
        practicalChoice("y12s2-lin-i5", "In V = 500 - 20t, what does the negative gradient mean?", "D", ["The tank starts empty", "Time is negative", "The model is quadratic", "The volume decreases by 20 L per minute"], "A negative gradient shows a decrease."),
      ],
      commonMistakes: [
        { mistake: "Confusing gradient and intercept.", fix: "The intercept is the starting value; the gradient is the rate of change." },
        { mistake: "Writing the fixed fee as the coefficient of the variable.", fix: "The fixed amount stands alone in the model." },
        { mistake: "Substituting into the wrong variable.", fix: "Match the input variable to the quantity in the question." },
        { mistake: "Ignoring units in interpretation.", fix: "State rates such as dollars per week, dollars per km, or litres per minute." },
      ],
      masteryQuiz: [
        linearAnswer("y12s2-lin-m1", "A gym charges 40 dollars plus 18 dollars per week. Write C after w weeks.", "", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40", "c=18w+40"]),
        practicalChoice("y12s2-lin-m2", "In C = 40 + 18w, the 40 represents:", "A", ["Joining fee", "Weekly cost", "Number of weeks", "Gradient only"], "It is the starting cost when w = 0."),
        practicalChoice("y12s2-lin-m3", "In C = 40 + 18w, the 18 represents:", "B", ["Joining fee", "Cost per week", "Total cost", "Number of weeks"], "The coefficient of w is the weekly rate."),
        moneyAnswer("y12s2-lin-m4", "A hire company charges a 30 dollar booking fee plus 15 dollars per hour. Find the cost for 4 hours.", "", "90"),
        linearAnswer("y12s2-lin-m5", "A savings account starts at 200 dollars and increases by 35 dollars per week. Write S after w weeks.", "", "S = 200 + 35w", ["S=200+35w", "s=200+35w", "S=35w+200"]),
        moneyAnswer("y12s2-lin-m6", "Using the savings rule shown, find S after 6 weeks.", "S=200+35w", "410"),
        practicalChoice("y12s2-lin-m7", "A table increases by the same amount each step. The relationship is likely:", "C", ["Quadratic", "Reciprocal", "Linear", "Random"], "Constant first difference suggests linear."),
        practicalChoice("y12s2-lin-m8", "A phone plan costs 25 dollars plus 0.12 dollars per extra GB. Which model matches the situation?", "B", ["C = 0.12 + 25g", "C = 25 + 0.12g", "C = 25g + 0.12", "C = 25 - 0.12g"], "The fixed cost is 25 and the extra cost is 0.12 per GB."),
        practicalChoice("y12s2-lin-m9", "For C = 40 + 18w, a total cost of 130 dollars means:", "B", ["4 weeks", "5 weeks", "6 weeks", "130 weeks"], "The 40 dollar starting cost is removed before comparing the weekly cost."),
        practicalChoice("y12s2-lin-m10", "Plan A is A = 25 + 10h and Plan B is B = 45 + 6h. Which plan is cheaper at h = 3?", "A", ["Plan A", "Plan B", "They are equal", "Neither can be compared"], "At 3 hours, Plan A costs less than Plan B."),
      ],
    };
  }

  if (lesson.slug === "quadratic-models") {
    return {
      ...base,
      description:
        "Recognise and interpret quadratic models including parabola shape, opening direction, vertex, intercepts, and practical context restrictions.",
      learningIntention:
        "Recognise a quadratic model from its equation or graph and explain what its important features mean in a practical context.",
      successCriteria: [
        "I can recognise a quadratic model from a squared variable or a parabolic graph.",
        "I can explain whether a parabola opens upwards or downwards.",
        "I can interpret a vertex as a maximum or minimum in context.",
        "I can use intercepts and context to decide which values make sense.",
      ],
      teaching: {
        paragraphs: [
          "A quadratic model is useful when a quantity bends rather than changing at a steady rate. Its graph is a parabola: a smooth curve with one turning point.",
          "The sign of the squared term tells you the broad story. A positive coefficient makes the graph open upwards and gives a minimum. A negative coefficient makes it open downwards and gives a maximum.",
          "The vertex is the turning point. In a real situation it might represent the highest point of a ball, the price that gives the greatest revenue, or the lowest operating cost.",
          "A model can produce mathematically valid values that do not make sense in context. For example, negative time is usually rejected even if it appears as an intercept.",
        ],
        latexBlocks: [
          "y=ax^2+bx+c",
          "a>0\\Rightarrow \\text{ opens upwards and has a minimum}",
          "a<0\\Rightarrow \\text{ opens downwards and has a maximum}",
          "\\text{Use the context to keep only meaningful inputs and outputs.}",
        ],
      },
      workedExamples: [
        {
          title: "Interpret the maximum height of a ball",
          questionLatex: "h=-5t^2+20t+1.5",
          steps: [
            { explanation: "The coefficient of t squared is negative, so the parabola opens downwards. That tells us the turning point is a maximum height.", latex: "a=-5<0" },
            { explanation: "The graph turns at t = 2 seconds. Read the height there because the question is about the maximum.", latex: "h(2)=-5(2)^2+20(2)+1.5=21.5" },
          ],
          finalAnswerLatex: "\\text{Maximum height }=21.5\\text{ m at }t=2\\text{ s}",
          cartesianGraph: heightParabola,
        },
        {
          title: "Use a revenue vertex",
          questionLatex: "R=-2p^2+40p",
          steps: [
            { explanation: "Revenue rises and then falls, so a downward-opening quadratic is sensible. The vertex gives the price with the greatest revenue.", latex: "R=-2p^2+40p" },
            { explanation: "The graph turns at p = 10. Evaluate the model there to find the maximum revenue.", latex: "R(10)=-2(10)^2+40(10)=200" },
          ],
          finalAnswerLatex: "\\text{Maximum revenue }=\\$200\\text{ when }p=\\$10",
          cartesianGraph: revenueParabola,
        },
        {
          title: "Read a minimum from vertex form",
          questionLatex: "C=3(x-4)^2+120",
          steps: [
            { explanation: "The squared part can never be negative. Its smallest value is zero, which happens when x = 4.", latex: "(x-4)^2\\geq 0" },
            { explanation: "When the squared part is zero, only 120 remains. That is the minimum cost.", latex: "C(4)=3(0)^2+120=120" },
          ],
          finalAnswerLatex: "\\text{Minimum cost }=\\$120\\text{ when }x=4",
          cartesianGraph: costParabola,
        },
      ],
      guidedPractice: [
        algebraChoice("y12s2-quad-g1", "Which equation is quadratic?", "C", ["y=4x+7", "y=30/x", "y=2x^2-5x+1", "y=5(1.2)^x"], "A quadratic equation contains a squared variable. Here x squared is the feature that separates the quadratic model from linear, inverse variation, and exponential models."),
        algebraChoice("y12s2-quad-g2", "The graph of R = -2p^2 + 40p is shown. What does its vertex represent?", "B", ["The starting revenue", "The maximum revenue", "A constant rate of change", "The minimum price"], "The graph opens downwards, so its turning point is the highest output. In this context the vertex represents the maximum revenue.", revenueParabola),
        algebraAnswer("y12s2-quad-g3", "For $C = 3(x - 4)^2 + 120$, state the value of $x$ that gives the minimum cost.", "x=4", "4", "The squared part is smallest when it equals zero. Set x - 4 = 0, so the minimum occurs at x = 4.", ["x=4"]),
        algebraAnswer("y12s2-quad-g4", "For h = -5t^2 + 20t + 1.5, find the height when t = 0.", "h(0)=1.5", "1.5", "At t = 0 the squared and linear terms both disappear. The remaining constant, 1.5, is the initial height.", ["1.5 m", "1.5m"]),
      ],
      independentPractice: [
        algebraChoice("y12s2-quad-i1", "Which graph shape belongs to a quadratic model?", "D", ["A straight line", "A circle", "A hyperbola", "A parabola"], "A quadratic graph is a parabola. It bends smoothly and has one turning point."),
        algebraAnswer("y12s2-quad-i2", "For $y = 2(x - 3)^2 + 5$, state the minimum value of $y$.", "y_{\\min}=5", "5", "The squared part is never negative, so its smallest value is zero. The graph therefore cannot go below 5.", ["y=5"]),
        algebraAnswer("y12s2-quad-i3", "For R = -p^2 + 12p, find R when p = 4.", "R(4)=-4^2+12(4)", "32", "The question asks for an output at a given input. Substitute p = 4 carefully: -(4 squared) + 48 = 32."),
        algebraChoice("y12s2-quad-i4", "A model for height gives t = -1 and t = 5 when the object is on the ground. Which time is meaningful after launch?", "C", ["Both times", "Neither time", "t = 5 only", "t = -1 only"], "The algebra can produce two roots, but the context decides which one is useful. A negative time is before launch, so keep t = 5 seconds."),
        algebraAnswer("y12s2-quad-i5", "For $P = -3(x - 6)^2 + 150$, state the maximum value of $P$.", "P_{\\max}=150", "150", "The negative coefficient makes the graph open downwards. The squared part is zero at the vertex, leaving the maximum output 150."),
      ],
      commonMistakes: [
        { mistake: "Treating a quadratic graph as if it has a constant gradient.", fix: "A straight line has a constant gradient. A parabola bends, so its rate of change varies as the input changes." },
        { mistake: "Calling every vertex a maximum.", fix: "Check the opening direction. An upward-opening parabola has a minimum; a downward-opening parabola has a maximum." },
        { mistake: "Using both roots without checking the context.", fix: "Roots can be mathematically correct but practically impossible. Reject values such as negative time when the situation starts at zero." },
        { mistake: "Reading the constant term as the vertex.", fix: "The constant term is the output when the input is zero. The vertex is the turning point, and it may be somewhere else." },
      ],
      masteryQuiz: [
        algebraChoice("y12s2-quad-m1", "Which feature proves that y = -4x^2 + 7x + 3 is quadratic?", "A", ["The x squared term", "The constant term", "The negative sign", "The number 7"], "A squared variable is the defining feature of a quadratic equation."),
        algebraAnswer("y12s2-quad-m2", "For h = -5t^2 + 20t + 1.5, state the maximum height.", "h=-5t^2+20t+1.5", "21.5", "The graph opens downwards, so the maximum occurs at the vertex. The axis of symmetry is t = 2, and substituting gives h = 21.5 metres.", ["21.5 m", "21.5m"], heightParabola),
        algebraAnswer("y12s2-quad-m3", "For $y = (x - 7)^2 + 4$, state the vertex as a coordinate.", "y=(x-7)^2+4", "(7,4)", "In vertex form, the squared bracket is zero when x = 7, and the remaining value is y = 4. So the vertex is (7, 4).", ["7,4", "7, 4", "(7, 4)"]),
        algebraChoice("y12s2-quad-m4", "A parabola opens upwards. What type of turning point does it have?", "B", ["Maximum", "Minimum", "Intercept only", "Constant gradient"], "An upward-opening parabola falls towards its turning point and rises after it, so the vertex is a minimum."),
        algebraAnswer("y12s2-quad-m5", "For $C = 2(x - 5)^2 + 90$, find the minimum cost.", "C_{\\min}=90", "90", "The squared part reaches its smallest value, zero, at x = 5. The model then leaves the minimum cost 90.", ["$90"]),
        algebraAnswer("y12s2-quad-m6", "For y = -x^2 + 10x, find y when x = 3.", "y(3)=-3^2+10(3)", "21", "Substitute x = 3 into both terms. The negative applies after squaring: -9 + 30 = 21."),
        algebraChoice("y12s2-quad-m7", "A quadratic profit model has roots x = 2 and x = 9. What do the roots represent?", "D", ["Maximum profits", "Constant rates", "Minimum costs", "Break-even inputs"], "At a root the output is zero. For a profit model, zero profit means break-even."),
        algebraAnswer("y12s2-quad-m8", "For $P = -4(x - 8)^2 + 300$, state the input that gives maximum profit.", "x=8", "8", "The negative coefficient makes the vertex a maximum. Vertex form shows that the squared bracket is zero at x = 8.", ["x=8"]),
        algebraChoice("y12s2-quad-m9", "A height model produces a root t = -0.4. Why is it usually rejected?", "C", ["Quadratics cannot have negative roots", "The graph must open upwards", "It represents a time before launch", "It is not an intercept"], "The root can be algebraically correct. It is rejected because negative time is outside the practical situation after launch."),
        algebraAnswer("y12s2-quad-m10", "For R = -2p^2 + 40p, find the maximum revenue.", "R(10)=200", "200", "The downward-opening graph has its maximum at the vertex p = 10. Substituting gives maximum revenue 200.", ["$200", "200 dollars"]),
        algebraChoice("y12s2-quad-m11", "A quadratic model R = -0.5x^2 + 8x gives revenue in dollars where x is items sold. At x = 20 the model gives R = -40. What is the practical limitation here?", "B", ["Quadratics cannot have two intercepts", "The model gives negative revenue, which is meaningless in this context", "The coefficient of x^2 must be positive", "x cannot exceed 10"], "The formula is mathematically valid at x = 20, but a negative revenue cannot occur in reality. The domain should be restricted to values where R ≥ 0, typically 0 ≤ x ≤ 16."),
        algebraChoice("y12s2-quad-m12", "Height h = -t^2 + 6t (metres) models a ball over time t (seconds). Which statement best explains a limitation for large t?", "D", ["The model has no turning point", "The leading coefficient must be positive", "Quadratic models cannot predict height", "The ball hits the ground at t = 6, so the model is invalid for t > 6"], "At t = 6, h = 0: the ball lands. Beyond this the formula gives negative height, which is physically impossible. A domain restriction 0 ≤ t ≤ 6 must be applied."),
      ],
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "reciprocal-relationships") {
    return {
      ...base,
      description:
        "Recognise y = k/x as a rectangular hyperbola, find k from a given point, evaluate and solve, and apply reciprocal relationships to practical inverse variation problems.",
      learningIntention:
        "Identify and use the reciprocal function y = k/x: sketch its shape, find k, evaluate y for given x, solve for x given y, and interpret practical inverse variation.",
      successCriteria: [
        "Recognise y = k/x as a rectangular hyperbola with asymptotes at x = 0 and y = 0.",
        "Determine whether branches lie in Q1/Q3 (k > 0) or Q2/Q4 (k < 0).",
        "Find k from a given point using k = x × y.",
        "Evaluate y for a given x, or solve for x given y, using y = k/x.",
        "Interpret a practical inverse variation relationship using the reciprocal model.",
      ],
      teaching: {
        paragraphs: [
          "The function y = k/x is called a rectangular hyperbola. It has two branches, one in each pair of opposite quadrants. The constant k determines which pair: if k > 0, the branches are in Q1 (x > 0, y > 0) and Q3 (x < 0, y < 0); if k < 0, the branches are in Q2 and Q4.",
          "Both axes are asymptotes. The graph approaches but never touches the x-axis (y = 0) or the y-axis (x = 0). As x gets very large, y gets very close to 0 but never reaches it.",
          "The key identity is xy = k. Every point on the curve satisfies this constant product. Given one point (x₁, y₁) on the curve, find k by computing k = x₁ × y₁. Use k to find any other (x, y) pair: y = k/x or x = k/y.",
          "Practical inverse variation arises when one quantity increases as another decreases in proportion. Classic examples: workers and time for a fixed job; speed and travel time for a fixed distance; pressure and volume of a gas.",
        ],
        latexBlocks: [
          "y = \\dfrac{k}{x},\\quad xy = k",
          "k = x_1 \\times y_1\\quad\\text{(from any point on the curve)}",
          "\\text{Asymptotes: }x = 0\\text{ (y-axis) and }y = 0\\text{ (x-axis)}",
          "\\text{k > 0: branches in Q1 and Q3}\\quad\\text{k < 0: branches in Q2 and Q4}",
        ],
      },
      workedExamples: [
        {
          title: "Build and evaluate a reciprocal table",
          questionLatex:
            "y = \\dfrac{12}{x}\\text{. (a) Complete the table for }x = 1, 2, 3, 4, 6\\text{. (b) State the asymptotes.}",
          cartesianGraph: reciprocalGraph,
          steps: [
            {
              explanation: "Substitute each x-value into y = 12/x.",
              latex:
                "x=1\\Rightarrow y=12,\\quad x=2\\Rightarrow y=6,\\quad x=3\\Rightarrow y=4,\\quad x=4\\Rightarrow y=3,\\quad x=6\\Rightarrow y=2",
            },
            {
              explanation: "State the asymptotes.",
              latex: "\\text{Asymptotes: }x=0\\text{ and }y=0.\\quad y\\to 0\\text{ as }x\\to\\infty.",
            },
          ],
          finalAnswerLatex:
            "y: 12, 6, 4, 3, 2;\\quad\\text{Asymptotes: }x=0,\\;y=0",
        },
        {
          title: "Find k from a given point",
          questionLatex:
            "\\text{A rectangular hyperbola passes through }(3, 8)\\text{. Find k and the equation. Then find y when }x = 6.",
          steps: [
            {
              explanation: "Use k = x × y with the given point.",
              latex: "k = 3 \\times 8 = 24\\implies y = \\dfrac{24}{x}",
            },
            {
              explanation: "Substitute x = 6.",
              latex: "y = \\dfrac{24}{6} = 4",
            },
          ],
          finalAnswerLatex:
            "k = 24;\\quad y = \\dfrac{24}{x};\\quad y = 4\\text{ when }x = 6",
        },
        {
          title: "Practical reciprocal: workers and hours",
          questionLatex:
            "\\text{A job requires 24 worker-hours. n workers each work }h = \\tfrac{24}{n}\\text{ hours. (a) Find h when }n = 6\\text{. (b) How many workers are needed so each works at most 3 hours?}",
          steps: [
            {
              explanation: "(a) Substitute n = 6.",
              latex: "h = \\dfrac{24}{6} = 4\\text{ hours}",
            },
            {
              explanation: "(b) h ≤ 3 means 24/n ≤ 3, so n ≥ 24/3 = 8.",
              latex: "n \\geq 8\\implies\\text{at least 8 workers are needed}",
            },
          ],
          finalAnswerLatex:
            "\\text{(a) }h = 4\\text{ hours};\\quad\\text{(b) at least 8 workers}",
        },
      ],
      guidedPractice: [
        algebraChoice(
          "y12s2-rec-g1",
          "The function y = k/x is best described as:",
          "B",
          [
            "A straight line through the origin",
            "A rectangular hyperbola with two branches",
            "A parabola opening upward",
            "An exponential growth curve",
          ],
          "y = k/x is a rectangular hyperbola — two smooth curves that never touch either axis.",
          reciprocalGraph
        ),
        algebraAnswer(
          "y12s2-rec-g2",
          "For y = 6/x, find y when x = 3.",
          "y = 6 \\div 3",
          "2",
          "Substitute x = 3: y = 6/3 = 2."
        ),
        algebraChoice(
          "y12s2-rec-g3",
          "A hyperbola passes through (2, 10). The value of k is:",
          "D",
          ["2", "5", "12", "20"],
          "k = x × y = 2 × 10 = 20."
        ),
        algebraAnswer(
          "y12s2-rec-g4",
          "y = 20/x. Find x when y = 5.",
          "x = 20 \\div 5",
          "4",
          "Rearrange: x = k/y = 20/5 = 4."
        ),
      ],
      independentPractice: [
        algebraChoice(
          "y12s2-rec-i1",
          "y = 12/x. Find y when x = 4.",
          "B",
          ["6", "3", "48", "16"],
          "y = 12/4 = 3."
        ),
        algebraAnswer(
          "y12s2-rec-i2",
          "A rectangular hyperbola passes through (3, 8). Find k.",
          "k = x \\times y = 3 \\times 8",
          "24",
          "k = xy = 3 × 8 = 24."
        ),
        algebraChoice(
          "y12s2-rec-i3",
          "y = −6/x has branches in which quadrants?",
          "B",
          ["Q1 and Q3", "Q2 and Q4", "Q1 and Q4", "All four quadrants"],
          "k = −6 < 0, so branches are in Q2 (x < 0, y > 0) and Q4 (x > 0, y < 0)."
        ),
        algebraAnswer(
          "y12s2-rec-i4",
          "y = 30/x. Find x when y = 6.",
          "x = 30 \\div 6",
          "5",
          "x = k/y = 30/6 = 5."
        ),
        algebraChoice(
          "y12s2-rec-i5",
          "For y = k/x with k > 0 and x > 0, as x increases, y:",
          "B",
          ["Increases toward infinity", "Decreases toward 0", "Stays constant at k", "Becomes negative"],
          "For k > 0 and increasing x, y = k/x decreases toward 0 (the x-axis asymptote)."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Treating y = k/x as a straight line.",
          fix: "y = k/x is a rectangular hyperbola — a curve with two branches, not a line. Only y = kx (no division) gives a straight line through the origin.",
        },
        {
          mistake: "Thinking the curve can touch or cross the axes.",
          fix: "Both axes are asymptotes. The curve gets closer and closer to both x = 0 and y = 0 but never reaches them. There is no x- or y-intercept.",
        },
        {
          mistake: "Forgetting to consider negative x and y values when sketching.",
          fix: "y = k/x has two branches. For k > 0, branch 2 is in Q3 where both x and y are negative. A complete sketch must show both branches.",
        },
        {
          mistake: "Rearranging y = k/x incorrectly to solve for x.",
          fix: "Starting from y = k/x, multiply both sides by x: xy = k, then divide both sides by y: x = k/y. Do not subtract or add k.",
        },
      ],
      masteryQuiz: [
        algebraChoice(
          "y12s2-rec-m1",
          "The asymptotes of y = k/x are:",
          "B",
          ["x = k and y = k", "x = 0 and y = 0", "x = 1 and y = 1", "y = x and y = −x"],
          "y = k/x approaches both axes but never touches them — asymptotes are x = 0 and y = 0."
        ),
        algebraAnswer(
          "y12s2-rec-m2",
          "y = 8/x. Find y when x = 2.",
          "y = 8 \\div 2",
          "4",
          "y = 8/2 = 4."
        ),
        algebraChoice(
          "y12s2-rec-m3",
          "A hyperbola passes through (4, 6). Its equation is:",
          "C",
          ["y = 1.5x", "y = 4x", "y = 24/x", "y = 6/x"],
          "k = 4 × 6 = 24, so y = 24/x."
        ),
        algebraAnswer(
          "y12s2-rec-m4",
          "y = 24/x. Find y when x = 8.",
          "y = 24 \\div 8",
          "3",
          "y = 24/8 = 3."
        ),
        algebraChoice(
          "y12s2-rec-m5",
          "y = k/x with k < 0. Where are the branches?",
          "B",
          ["Q1 and Q3", "Q2 and Q4", "Q1 and Q2", "Q3 and Q4"],
          "k < 0: for x > 0, y = k/x < 0 (Q4); for x < 0, y = k/x > 0 (Q2). Branches in Q2 and Q4."
        ),
        algebraAnswer(
          "y12s2-rec-m6",
          "A rectangular hyperbola passes through (5, 4). Find x when y = 10.",
          "k = 5 \\times 4 = 20\\implies x = 20 \\div 10",
          "2",
          "k = 20. x = k/y = 20/10 = 2."
        ),
        algebraChoice(
          "y12s2-rec-m7",
          "6 workers complete a job in 4 hours. If 8 workers share the job, each worker takes:",
          "B",
          ["4 hours", "3 hours", "6 hours", "2 hours"],
          "Total = 6 × 4 = 24 worker-hours. 8 workers: h = 24/8 = 3 hours."
        ),
        algebraAnswer(
          "y12s2-rec-m8",
          "y = 15/x. Find x when y = 3.",
          "x = 15 \\div 3",
          "5",
          "x = k/y = 15/3 = 5."
        ),
        algebraChoice(
          "y12s2-rec-m9",
          "Which x-value makes y undefined in y = k/x?",
          "A",
          ["x = 0", "x = k", "x = 1", "x = −k"],
          "Division by zero is undefined. y = k/0 is undefined, so x = 0 is excluded."
        ),
        algebraChoice(
          "y12s2-rec-m10",
          "As x → ∞, y = 12/x:",
          "C",
          ["Approaches 12", "Approaches ∞", "Approaches 0", "Becomes undefined"],
          "As x gets very large, 12/x gets very small — approaches 0 (the x-axis asymptote)."
        ),
      ],
    };
  }

  if (lesson.slug === "exponential-inverse-variation") {
    return {
      ...base,
      description:
        "Recognise and evaluate exponential growth and decay models and inverse variation models, and identify each type from tables, equations, and contexts.",
      learningIntention:
        "Recognise exponential and inverse variation models and use their defining patterns to make practical predictions.",
      successCriteria: [
        "I can recognise exponential growth or decay from repeated multiplication.",
        "I can evaluate a simple exponential model for a given input.",
        "I can recognise inverse variation from a constant product or an equation of the form y = k/x.",
        "I can distinguish linear, exponential, and inverse variation patterns in context.",
      ],
      teaching: {
        paragraphs: [
          "A linear model adds the same amount each step. An exponential model multiplies by the same factor each step, so its changes become larger during growth or smaller during decay.",
          "In V = ab^n, a is the starting value and b is the repeated multiplier. If b is greater than 1 the model grows. If b is between 0 and 1 the model decays.",
          "Inverse variation describes a trade-off. In y = k/x, the product xy stays constant. If one quantity doubles, the other halves.",
          "Recognition comes before calculation. Ask whether the pattern adds a constant amount, multiplies by a constant factor, or keeps a constant product.",
        ],
        latexBlocks: [
          "V=ab^n",
          "b>1\\Rightarrow \\text{ exponential growth}",
          "0<b<1\\Rightarrow \\text{ exponential decay}",
          "y=\\frac{k}{x}\\quad\\text{or}\\quad xy=k,\\;x\\ne 0",
        ],
      },
      workedExamples: [
        {
          title: "Recognise repeated doubling",
          questionLatex: "V=100(2)^n\\quad\\text{Find }V\\text{ when }n=3.",
          steps: [
            { explanation: "The value is multiplied by 2 each step, so this is exponential growth rather than a steady linear increase.", latex: "b=2>1" },
            { explanation: "Apply the repeated multiplier three times.", latex: "V=100(2)^3=800" },
          ],
          finalAnswerLatex: "V=800",
          cartesianGraph: exponentialGrowthGraph,
        },
        {
          title: "Use an inverse variation travel model",
          questionLatex: "t=\\frac{240}{v}\\quad\\text{Find }t\\text{ when }v=80.",
          steps: [
            { explanation: "For a fixed 240 km journey, speed and time trade off. A higher speed means a lower time, and their product stays 240.", latex: "tv=240" },
            { explanation: "Substitute the known speed into the denominator.", latex: "t=\\frac{240}{80}=3" },
          ],
          finalAnswerLatex: "t=3\\text{ hours}",
          cartesianGraph: inverseVariationGraph,
        },
        {
          title: "Classify patterns from a table",
          questionLatex: "\\begin{array}{c|cccc}x&1&2&3&4\\ A&5&8&11&14\\ B&3&6&12&24\\ C&24&12&8&6\\end{array}",
          steps: [
            { explanation: "A adds 3 each time, so it is linear. B multiplies by 2 each time, so it is exponential.", latex: "A:\\;+3\\qquad B:\\;\\times 2" },
            { explanation: "For C, multiply each output by its input. The product stays 24, so C is inverse variation.", latex: "1(24)=2(12)=3(8)=4(6)=24" },
          ],
          finalAnswerLatex: "A:\\text{ linear},\\quad B:\\text{ exponential},\\quad C:\\text{ inverse variation}",
        },
      ],
      guidedPractice: [
        algebraChoice("y12s2-expinv-g1", "Which model is exponential growth?", "B", ["y=5x+2", "y=80(1.05)^x", "y=60/x", "y=x^2-4"], "The variable is in the exponent and the repeated multiplier 1.05 is greater than 1. That makes the model exponential growth."),
        algebraAnswer("y12s2-expinv-g2", "For V = 80(0.5)^n, find V when n = 2.", "V=80(0.5)^2", "20", "The factor 0.5 means the value halves each step. After two halvings, 80 becomes 20.", [], exponentialDecayGraph),
        algebraAnswer("y12s2-expinv-g3", "For y = 36/x, find y when x = 9.", "y=\\frac{36}{9}", "4", "Inverse variation keeps the product xy equal to 36. Divide the constant 36 by the known input 9."),
        algebraChoice("y12s2-expinv-g4", "If x doubles in y = 50/x, what happens to y?", "C", ["It doubles", "It increases by 2", "It halves", "It stays the same"], "The product xy must stay 50. If x doubles, y must halve to keep that product unchanged."),
      ],
      independentPractice: [
        algebraAnswer("y12s2-expinv-i1", "For V = 200(1.1)^n, find V when n = 2.", "V=200(1.1)^2", "242", "The multiplier 1.1 is applied twice: 200 times 1.1 times 1.1 gives 242."),
        algebraChoice("y12s2-expinv-i2", "Which table pattern is exponential?", "B", ["Add 4 each step", "Multiply by 3 each step", "Keep xy constant", "Decrease by 7 each step"], "Exponential patterns use repeated multiplication. Multiplying by 3 each step is the defining clue."),
        algebraAnswer("y12s2-expinv-i3", "For xy = 72, find y when x = 8.", "y=\\frac{72}{8}", "9", "The product must stay 72. Divide 72 by 8 to find the matching y-value."),
        algebraChoice("y12s2-expinv-i4", "What kind of model is shown by the curve y = 24/x?", "D", ["Linear", "Quadratic", "Exponential", "Inverse variation"], "The model has the variable in the denominator and keeps xy constant. That is inverse variation.", inverseVariationGraph),
        algebraAnswer("y12s2-expinv-i5", "A quantity starts at 500 and decreases by 20% each period. Write the repeated multiplier.", "1-0.20", "0.8", "A 20% decrease leaves 80% of the previous value. As a decimal, the repeated multiplier is 0.8.", ["0.80", "80%"]),
      ],
      commonMistakes: [
        { mistake: "Calling every curved graph quadratic.", fix: "Look at the rule and the pattern. Quadratics contain a squared variable, exponentials use repeated multiplication, and inverse variation keeps a constant product." },
        { mistake: "Using 0.2 as the multiplier for a 20% decrease.", fix: "A 20% decrease leaves 80% behind. The decay multiplier is 1 - 0.20 = 0.80." },
        { mistake: "Adding the same amount in an exponential model.", fix: "Exponential models multiply by the same factor each step. The actual amount added changes as the value changes." },
        { mistake: "Forgetting the trade-off in inverse variation.", fix: "Keep the product constant. If one variable doubles, the other must halve." },
      ],
      masteryQuiz: [
        algebraChoice("y12s2-expinv-m1", "Which equation represents inverse variation?", "D", ["y=4x+1", "y=3x^2", "y=5(1.2)^x", "y=40/x"], "Inverse variation has the form y = k/x, so the product xy stays constant."),
        algebraAnswer("y12s2-expinv-m2", "For V = 150(2)^n, find V when n = 3.", "V=150(2)^3", "1200", "The model doubles the starting value three times: 150 times 8 equals 1200.", ["1,200"]),
        algebraChoice("y12s2-expinv-m3", "Which multiplier represents exponential decay?", "A", ["0.75", "1", "1.08", "3"], "A decay multiplier lies between 0 and 1. Multiplying by 0.75 keeps 75% each period."),
        algebraAnswer("y12s2-expinv-m4", "An inverse variation model has constant product xy = 96. Find y when x = 12.", "xy=96,\\quad x=12", "8", "Inverse variation keeps the product xy constant. Substitute x = 12 into 12y = 96, so y = 8."),
        algebraChoice("y12s2-expinv-m5", "A fixed job takes 6 hours with 4 workers. Assuming inverse variation, how long should it take with 8 workers?", "B", ["12 hours", "3 hours", "10 hours", "2 hours"], "Doubling the workers halves the time because workers times hours stays constant."),
        algebraAnswer("y12s2-expinv-m6", "For xy = 24, find x when y = 6.", "x=\\frac{24}{6}", "4", "The constant product is 24. Divide by the known y-value to find x.", [], inverseVariationGraph),
        algebraChoice("y12s2-expinv-m7", "A table has outputs 10, 15, 22.5, 33.75 as the input increases by 1. Which model fits?", "C", ["Linear decrease", "Inverse variation", "Exponential growth", "Quadratic with a minimum"], "Each output is multiplied by 1.5. Repeated multiplication identifies exponential growth."),
        algebraAnswer("y12s2-expinv-m8", "A value starts at 400 and decreases by 15% each year. State the decay multiplier.", "\\text{15% annual decrease}", "0.85", "A 15% decrease means 85% of the value remains each year. As a decimal multiplier, 85% is 0.85.", ["85%"]),
        algebraChoice("y12s2-expinv-m9", "For y = 60/x, why can x not equal zero?", "A", ["Division by zero is undefined", "The graph must be linear", "The product would be too large", "Zero is always negative"], "The rule requires division by x. Division by zero is undefined, so x = 0 is excluded."),
        algebraAnswer("y12s2-expinv-m10", "For V = 320(0.5)^n, find V when n = 3.", "V=320(0.5)^3", "40", "The value halves three times: 320 to 160 to 80 to 40."),
        algebraChoice("y12s2-expinv-m11", "A model for a city's population is $P = 50000 × 1.04^n$ where $n$ is years from now. Why would this model become unreliable for very large $n$?", "C", ["The base 1.04 is less than 2", "n cannot be a large number", "Resources and space limit real population growth, so constant 4% annual growth cannot continue indefinitely", "The starting population of 50 000 is too small"], "Exponential models assume a constant percentage growth rate. In practice, limited resources, disease, migration and other factors slow growth. The model is a useful short-term approximation but overestimates population for large n."),
        algebraChoice("y12s2-expinv-m12", "A radioactive decay model is $M = 200 × 0.9^t$ grams. Which is the best statement about a limitation of this model?", "B", ["The formula is undefined when t is large", "For very large t the model gives values too small to physically measure", "The decay multiplier must be greater than 1", "Exponential decay models can only be used for t ≤ 10"], "Mathematically the formula works for any t ≥ 0, but the mass it predicts eventually falls below the smallest measurable quantity. At that point the model no longer has practical meaning, even though the mathematics continues to produce values."),
      ],
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "simultaneous-equations-context") {
    return {
      ...base,
      description:
        "Solve and interpret pairs of practical models, including equal-cost points and option comparisons.",
      learningIntention:
        "Use simultaneous equations to find and interpret where two practical models are equal.",
      successCriteria: [
        "Recognise that an intersection means two models have the same value.",
        "Solve two linear models by setting them equal or using substitution.",
        "Interpret the solution in context with correct units.",
        "Choose which option is better before or after the intersection point.",
      ],
      teaching: {
        paragraphs: [
          "Simultaneous equations often compare two options, such as hire companies, phone plans, taxi fares, or savings plans.",
          "The solution is the point where both models are true at the same time. On a graph, this is the intersection point.",
          "For two cost models, the intersection tells when the costs are equal. Before or after that point, one option may be cheaper.",
          "Always interpret both values in context. For the solution shown below, the options cost the same after 6 hours at 120 dollars.",
        ],
        latexBlocks: [
          "A=30+15h,\\quad B=60+10h",
          "\\text{equal cost: }30+15h=60+10h",
          "h=6,\\quad C=120",
          "\\text{intersection}=(\\text{input},\\text{common output})",
        ],
      },
      workedExamples: [
        {
          title: "Find when two hire companies cost the same",
          questionLatex:
            "A=30+15h,\\quad B=60+10h",
          steps: [
            {
              explanation: "Set the two costs equal.",
              latex: "30+15h=60+10h",
            },
            {
              explanation: "Solve for h.",
              latex: "5h=30\\Rightarrow h=6",
            },
            {
              explanation: "Substitute h = 6 into either model.",
              latex: "A=30+15(6)=120",
            },
          ],
          finalAnswerLatex: "\\text{Equal after }6\\text{ hours at }\\$120.",
        },
        {
          title: "Solve a contextual pair",
          questionLatex:
            "\\text{A savings balance is }S=200+30w.\\text{ A second is }T=80+50w.",
          steps: [
            {
              explanation: "Set the balances equal.",
              latex: "200+30w=80+50w",
            },
            {
              explanation: "Solve for w.",
              latex: "120=20w\\Rightarrow w=6",
            },
          ],
          finalAnswerLatex: "\\text{The balances are equal after }6\\text{ weeks.}",
        },
        {
          title: "Choose the cheaper option after the intersection",
          questionLatex:
            "A=30+15h,\\quad B=60+10h,\\quad h=8",
          steps: [
            {
              explanation: "Calculate each cost at 8 hours.",
              latex: "A=30+15(8)=150,\\quad B=60+10(8)=140",
            },
            {
              explanation: "The smaller cost is cheaper.",
            },
          ],
          finalAnswerLatex: "\\text{Company B is cheaper at }8\\text{ hours.}",
        },
      ],
      guidedPractice: [
        linearAnswer("y12s2-sim-g1", "Two hire companies are A = 30 + 15h and B = 60 + 10h. After how many hours are the costs equal?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
        moneyAnswer("y12s2-sim-g2", "For A = 30 + 15h, find the equal cost when h = 6.", "A=30+15h,\\quad h=6", "120"),
        practicalChoice("y12s2-sim-g3", "On a graph of two hire cost models, the intersection represents:", "B", ["The highest cost always", "The input where both costs are equal", "The fixed fee only", "The gradient of the first line"], "The intersection is where both models have the same value."),
        practicalChoice("y12s2-sim-g4", "Two hire company models are shown. Which company is cheaper at the given time?", "D", ["A, because 15 is bigger", "They are equal", "Neither can be calculated", "B, because $B=140$ and $A=150$"], "Substitution shows B has the smaller cost.", "A=30+15h,\\quad B=60+10h,\\quad h=8"),
      ],
      independentPractice: [
        linearAnswer("y12s2-sim-i1", "Taxi A costs A = 6 + 2d and Taxi B costs B = 12 + 1.5d. Find d when costs are equal.", "6+2d=12+1.5d", "12", ["12 km", "12km"]),
        moneyAnswer("y12s2-sim-i2", "Using Taxi A: A = 6 + 2d, find the equal cost when d = 12.", "A=6+2d,\\quad d=12", "30"),
        linearAnswer("y12s2-sim-i3", "Plans P = 25 + 3g and Q = 40 + g are equal at what value of g?", "25+3g=40+g", "7.5", ["7.5 GB", "7.5GB"]),
        practicalChoice("y12s2-sim-i4", "If the solution is (6, 120) for hire time and cost, what does 120 mean?", "A", ["The common cost in dollars", "The number of hours", "The gradient", "The fixed fee"], "The output coordinate is the common cost."),
        practicalChoice("y12s2-sim-i5", "A student solves only A = 30 + 15h and never uses B = 60 + 10h. What is missing?", "C", ["A table", "A quadratic term", "The comparison with the second model", "A unit conversion"], "A simultaneous-equations question needs both models."),
      ],
      commonMistakes: [
        { mistake: "Substituting a value into only one model and calling it the intersection.", fix: "At an intersection, both models must have the same output." },
        { mistake: "Mixing up the input and output in the solution.", fix: "Interpret the x-value as the input and the y-value as the common value." },
        { mistake: "Choosing the wrong option after the intersection.", fix: "Substitute the given input into both models and compare outputs." },
        { mistake: "Forgetting context units.", fix: "State hours, kilometres, dollars, weeks, or GB as appropriate." },
      ],
      masteryQuiz: [
        linearAnswer("y12s2-sim-m1", "Hire costs A = 30 + 15h and B = 60 + 10h are equal after how many hours?", "A=30+15h,\\quad B=60+10h", "6", ["6 h", "6 hours"]),
        moneyAnswer("y12s2-sim-m2", "Hire models A = 30 + 15h and B = 60 + 10h are equal at h = 6. Find the equal cost.", "A=30+15h,\\quad B=60+10h,\\quad h=6", "120"),
        linearAnswer("y12s2-sim-m3", "Phone plans P = 20 + 4g and Q = 50 + g are equal at what g?", "P=20+4g,\\quad Q=50+g", "10", ["10 GB", "10GB"]),
        moneyAnswer("y12s2-sim-m4", "Using the phone plan shown, find the equal cost when g = 10.", "P=20+4g", "60"),
        practicalChoice("y12s2-sim-m5", "The intersection of two cost lines means:", "B", ["Both gradients are zero", "Both costs are equal", "The cheaper option is impossible", "The y-intercept is negative"], "The outputs are the same at the intersection."),
        practicalChoice("y12s2-sim-m6", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 4?", "A", ["A", "B", "They are equal", "Neither has a cost"], "A = 90 and B = 100."),
        practicalChoice("y12s2-sim-m7", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 8?", "C", ["A", "They are equal", "B", "Both are free"], "A = 150 and B = 140."),
        linearAnswer("y12s2-sim-m8", "Savings S = 200 + 30w and T = 80 + 50w are equal at what w?", "S=200+30w,\\quad T=80+50w", "6", ["6 weeks", "6weeks"]),
        practicalChoice("y12s2-sim-m9", "Which setup finds when A = 30 + 15h and B = 60 + 10h have equal cost?", "B", ["30 + 15h = h", "30 + 15h = 60 + 10h", "30 + 60 = 15h + 10h", "15h = 10h"], "Equal cost means setting the two full cost expressions equal."),
        practicalChoice("y12s2-sim-m10", "For A = 30 + 15h and B = 60 + 10h, the costs are equal at h = 6. Which option is cheaper for h greater than 6?", "C", ["A, because it has the smaller fixed fee", "They stay equal forever", "B, because it has the smaller hourly rate", "Neither, because h cannot exceed 6"], "After the intersection, the model with the smaller hourly rate grows more slowly."),
      ],
    };
  }

  if (lesson.slug === "linear-inequalities-modelling") {
    return {
      ...base,
      description:
        "Solve linear inequalities, represent solutions on a number line, and interpret inequality constraints in practical budgeting and threshold contexts.",
      learningIntention:
        "Use inequalities to express practical constraints and find the range of input values that satisfy them.",
      successCriteria: [
        "Solve a linear inequality by isolating the variable, remembering to reverse the sign when multiplying or dividing by a negative number.",
        "Represent inequality solutions on a number line using open and closed circles.",
        "Interpret an inequality answer in a practical context such as a budget limit or minimum profit.",
        "Write an inequality from a word problem and identify the meaning of the solution set.",
      ],
      teaching: {
        paragraphs: [
          "An inequality is like an equation but uses <, ≤, >, or ≥ instead of =. Solving one means finding all values of the variable that make it true.",
          "The key rule: if you multiply or divide both sides by a negative number, reverse the inequality sign. Adding or subtracting never changes the sign.",
          "On a number line, use an open circle ○ for strict inequalities (< or >) and a closed circle ● for ≤ or ≥. Shade in the direction of the solution.",
          "Practical contexts: a budget constraint means total spending must be less than or equal to the limit; a profit threshold means revenue minus cost must exceed the target.",
        ],
        latexBlocks: [
          "3x+5\\le20\\implies 3x\\le15\\implies x\\le5",
          "-2x>8\\implies x<-4\\;(\\text{sign reverses})",
          "\\text{Number line: }\\bullet\\!\\!\\!-\\!\\!\\!-\\!\\!\\!-\\text{ for }\\le,\\quad \\circ\\!\\!\\!-\\!\\!\\!-\\text{ for }<",
        ],
      },
      workedExamples: [
        {
          title: "Solve a budget inequality",
          questionLatex:
            "\\text{A student can spend at most }\\$50.\\text{ Books cost }\\$8\\text{ each; she already paid }\\$10\\text{ for a bag. Find the max number of books.}",
          steps: [
            {
              explanation: "Write the inequality.",
              latex: "10+8b\\le50",
            },
            {
              explanation: "Subtract 10 from both sides.",
              latex: "8b\\le40",
            },
            {
              explanation: "Divide by 8.",
              latex: "b\\le5",
            },
          ],
          finalAnswerLatex: "b\\le5\\text{ (at most 5 books)}",
        },
        {
          title: "Solve an inequality with sign reversal",
          questionLatex:
            "-3x+6>12",
          steps: [
            {
              explanation: "Subtract 6 from both sides.",
              latex: "-3x>6",
            },
            {
              explanation: "Divide by −3 and reverse the sign.",
              latex: "x<-2",
            },
          ],
          finalAnswerLatex: "x<-2",
        },
      ],
      guidedPractice: [
        algebraAnswer("y12s2-ineq-g1", "Solve 2x + 3 ≤ 11.", "2x+3\\le11", "x≤4", "Subtract 3: 2x ≤ 8. Divide by 2: x ≤ 4."),
        algebraAnswer("y12s2-ineq-g2", "Solve 5x − 2 > 13.", "5x-2>13", "x>3", "Add 2: 5x > 15. Divide by 5: x > 3."),
        practicalChoice("y12s2-ineq-g3", "When solving −4x < 20, which is the correct answer?", "B", ["x < −5", "x > −5", "x < 5", "x > 5"], "Dividing by −4 reverses the inequality: x > 20/4 = 5 — wait, 20/4 = 5 and dividing negative gives x > −5."),
        practicalChoice("y12s2-ineq-g4", "A budget inequality gives h ≤ 6. In a hire context, this means:", "A", ["At most 6 hours can be hired", "Exactly 6 hours must be hired", "At least 6 hours are needed", "6 dollars is the fixed fee"], "≤ means up to and including 6."),
      ],
      independentPractice: [
        algebraAnswer("y12s2-ineq-i1", "Solve 3x + 7 ≤ 22.", "3x+7\\le22", "x≤5", "Subtract 7: 3x ≤ 15. Divide by 3: x ≤ 5."),
        algebraAnswer("y12s2-ineq-i2", "Solve −2x + 4 ≥ 10.", "-2x+4\\ge10", "x≤−3", "Subtract 4: −2x ≥ 6. Divide by −2 and reverse: x ≤ −3.", ["x ≤ -3", "x≤-3"]),
        algebraAnswer("y12s2-ineq-i3", "A phone plan lets you use at most 15 GB. If you already used 6 GB, write an inequality for the remaining data r.", "6+r\\le15", "r≤9", "6 + r ≤ 15 gives r ≤ 9 GB remaining."),
        practicalChoice("y12s2-ineq-i4", "Profit P = 5n − 80. For P > 0, find the minimum n.", "C", ["n > 5", "n > 10", "n > 16", "n > 80"], "5n − 80 > 0 → 5n > 80 → n > 16."),
        practicalChoice("y12s2-ineq-i5", "Which number line correctly shows x > 3?", "A", ["Open circle at 3, shading to the right", "Closed circle at 3, shading to the right", "Open circle at 3, shading to the left", "Closed circle at 3, shading to the left"], "Strict inequality > uses an open circle, and shading goes in the direction where values are larger."),
      ],
      commonMistakes: [
        { mistake: "Not reversing the inequality sign when dividing by a negative.", fix: "Whenever you multiply or divide both sides by a negative number, flip <, ≤, >, ≥." },
        { mistake: "Using a closed circle for strict inequalities.", fix: "Use ○ for < and >, and ● for ≤ and ≥ on a number line." },
        { mistake: "Writing the wrong direction on the number line.", fix: "x > 3 shades to the right; x < 3 shades to the left." },
        { mistake: "Solving correctly but not interpreting in context.", fix: "State what the answer means: 'at most 5 books', 'at least 16 items', etc." },
      ],
      masteryQuiz: [
        algebraAnswer("y12s2-ineq-m1", "Solve 4x − 1 ≤ 15.", "4x-1\\le15", "x≤4", "Add 1: 4x ≤ 16. Divide by 4: x ≤ 4."),
        algebraAnswer("y12s2-ineq-m2", "Solve −x + 5 > 2.", "-x+5>2", "x<3", "Subtract 5: −x > −3. Divide by −1 and reverse: x < 3."),
        practicalChoice("y12s2-ineq-m3", "A profit model P = 8n − 64. The minimum number of units for profit (P > 0) is:", "C", ["n > 6", "n > 7", "n > 8", "n > 64"], "8n > 64 → n > 8."),
        algebraAnswer("y12s2-ineq-m4", "Solve 6 − 2x ≥ 0.", "6-2x\\ge0", "x≤3", "−2x ≥ −6. Divide by −2 and reverse: x ≤ 3."),
        practicalChoice("y12s2-ineq-m5", "A student solves 2x > 10 and writes x > 2. What went wrong?", "B", ["Nothing; x > 2 is correct", "She divided by 5, not by 2. x > 5 is correct.", "She reversed the sign", "She forgot to add 10"], "2x > 10 → x > 5. Dividing 10 by 2 gives 5, not 2."),
        algebraAnswer("y12s2-ineq-m6", "A budget: 15 + 4n ≤ 55. Find the maximum n.", "15+4n\\le55", "n≤10", "4n ≤ 40. n ≤ 10."),
        practicalChoice("y12s2-ineq-m7", "The solution x ≤ 5 means:", "A", ["All values up to and including 5", "Only the value 5", "All values greater than 5", "All negative values"], "≤ includes 5 and all smaller values."),
        algebraAnswer("y12s2-ineq-m8", "Solve 3 − 5x < 28.", "3-5x<28", "x>−5", "−5x < 25. Divide by −5 and reverse: x > −5.", ["x > -5", "x>-5"]),
        practicalChoice("y12s2-ineq-m9", "Which inequality represents 'earn at least 200 dollars from selling n items at 12 dollars each'?", "C", ["12n < 200", "12n = 200", "12n ≥ 200", "12 ≥ 200n"], "'At least' means ≥."),
        practicalChoice("y12s2-ineq-m10", "A rental inequality gives t ≤ 4. The maximum rental time is:", "A", ["4 hours", "Less than 4 hours", "More than 4 hours", "Exactly 4 hours if positive"], "≤ means up to and including 4 hours."),
      ],
    };
  }

  if (lesson.slug === "working-with-formulae-substitution") {
    return {
      ...base,
      description:
        "Substitute values into literal equations from science, finance, and measurement contexts, and rearrange simple formulas to find a target variable.",
      learningIntention:
        "Use substitution and simple rearrangement to find unknown quantities from practical formulas.",
      successCriteria: [
        "Substitute given values into a formula and evaluate the result.",
        "Rearrange a simple formula to make a different variable the subject.",
        "Apply formulas from finance (compound interest, depreciation) and measurement (area, speed, density).",
        "Check units and reasonableness after substitution.",
      ],
      teaching: {
        paragraphs: [
          "Many practical problems give you a formula and ask you to find one value when others are known. Substitute the given values and simplify.",
          "To make a variable the subject, use inverse operations: if the variable is multiplied by a number, divide both sides; if it is added, subtract both sides.",
          "Common HSC formulas: compound interest $A = P(1 + r)^n$, speed S = D/T, density D = M/V, area A = lw or A = (1/2)bh, BMI = mass/height².",
          "Always include units in the final answer. The formula gives a number; the context gives the unit.",
        ],
        latexBlocks: [
          "A=P(1+r)^n",
          "S=\\frac{D}{T}\\implies D=S\\times T\\implies T=\\frac{D}{S}",
          "\\text{BMI}=\\frac{m}{h^2},\\quad D=\\frac{M}{V}",
        ],
      },
      workedExamples: [
        {
          title: "Substitute into compound interest",
          questionLatex:
            "A=P(1+r)^n.\\;P=2000,\\;r=0.05,\\;n=3.",
          steps: [
            {
              explanation: "Substitute the values.",
              latex: "A=2000(1.05)^3",
            },
            {
              explanation: "Evaluate (1.05)³ = 1.157625.",
              latex: "A=2000\\times1.157625=2315.25",
            },
          ],
          finalAnswerLatex: "A=\\$2315.25",
        },
        {
          title: "Rearrange to find time",
          questionLatex:
            "S=\\frac{D}{T}.\\;\\text{Find }T\\text{ when }S=60\\text{ km/h, }D=150\\text{ km.}",
          steps: [
            {
              explanation: "Rearrange: T = D/S.",
              latex: "T=\\frac{150}{60}=2.5",
            },
          ],
          finalAnswerLatex: "T=2.5\\text{ h}",
        },
      ],
      guidedPractice: [
        algebraAnswer("y12s2-form-g1", "Using A = P(1 + r)^n with P = 1000, r = 0.04, n = 2, find A.", "A=1000(1.04)^2", "1081.60", "A = 1000 × 1.0816 = 1081.60.", ["$1081.60", "1081.6"]),
        algebraAnswer("y12s2-form-g2", "Speed S = D/T. Find D when S = 80 km/h and T = 3 h.", "D=S\\times T=80\\times3", "240", "D = 80 × 3 = 240 km.", ["240 km"]),
        practicalChoice("y12s2-form-g3", "To make D the subject in S = D/T:", "B", ["Divide both sides by D", "Multiply both sides by T", "Subtract T from both sides", "Square both sides"], "D = S × T. Multiply both sides by T."),
        practicalChoice("y12s2-form-g4", "BMI = mass/height². A person is 70 kg and 1.75 m. Their BMI is:", "C", ["40.0", "28.6", "22.9", "17.5"], "BMI = 70/1.75² = 70/3.0625 ≈ 22.9."),
      ],
      independentPractice: [
        algebraAnswer("y12s2-form-i1", "Compound interest: A = P(1 + r)^n. Find A when P = 5000, r = 0.06, n = 4.", "A=5000(1.06)^4", "6312.38", "A = 5000 × 1.2625 ≈ 6312.38.", ["$6312.38", "6312.4"]),
        algebraAnswer("y12s2-form-i2", "Density D = M/V. Find M when D = 3 g/cm³ and V = 40 cm³.", "M=D\\times V=3\\times40", "120", "M = 3 × 40 = 120 g.", ["120 g"]),
        algebraAnswer("y12s2-form-i3", "Rearrange A = lw to make l the subject.", "l=\\frac{A}{w}", "l=A/w", "Divide both sides by w: l = A/w.", ["l = A/w", "A/w"]),
        practicalChoice("y12s2-form-i4", "Using $V = P(1 − r)^n$ for depreciation with $P = 18000$, $r = 0.15$, $n = 3$:", "B", ["\\$10935", "\\$11054.63", "\\$11000", "\\$15300"], "V = 18000 × (0.85)³ = 18000 × 0.614125 ≈ 11054.25 ≈ $11054."),
        algebraAnswer("y12s2-form-i5", "Speed S = D/T. A car travels 270 km at 90 km/h. Find the time T.", "T=\\frac{270}{90}", "3", "T = 270/90 = 3 h.", ["3 h", "3 hours"]),
      ],
      commonMistakes: [
        { mistake: "Substituting into the wrong variable.", fix: "Label each given value with its variable letter before substituting." },
        { mistake: "Not rearranging before substituting a missing variable.", fix: "If the target variable is not the subject, rearrange first, then substitute." },
        { mistake: "Forgetting to apply the exponent in compound interest.", fix: "Use (1 + r)^n. The exponent is n periods, not 1 + r × n." },
        { mistake: "Dropping units from the final answer.", fix: "The formula gives a number. State the unit: dollars, km/h, g, etc." },
      ],
      masteryQuiz: [
        algebraAnswer("y12s2-form-m1", "Find A using A = P(1 + r)^n with P = 3000, r = 0.05, n = 2.", "A=3000(1.05)^2", "3307.50", "A = 3000 × 1.1025 = 3307.50.", ["$3307.50", "3307.5"]),
        algebraAnswer("y12s2-form-m2", "Speed formula S = D/T. Find T when S = 75 km/h and D = 225 km.", "T=\\frac{225}{75}", "3", "T = 225 ÷ 75 = 3 h.", ["3 h", "3 hours"]),
        practicalChoice("y12s2-form-m3", "Density D = M/V. To find V when D and M are known:", "B", ["V = M × D", "V = M / D", "V = D / M", "V = M + D"], "Rearrange D = M/V: V = M/D."),
        algebraAnswer("y12s2-form-m4", "Find density D when M = 90 g and V = 30 cm³.", "D=\\frac{90}{30}", "3", "D = 90/30 = 3 g/cm³.", ["3 g/cm³", "3g/cm3"]),
        practicalChoice("y12s2-form-m5", "$A = P(1 + r)^n$. Which value is the principal?", "A", ["P", "A", "r", "n"], "P is the initial amount invested or borrowed."),
        algebraAnswer("y12s2-form-m6", "Rearrange A = (1/2)bh for b.", "b=\\frac{2A}{h}", "b=2A/h", "Multiply both sides by 2: 2A = bh. Divide by h: b = 2A/h.", ["b = 2A/h", "2A/h"]),
        algebraAnswer("y12s2-form-m7", "Depreciation V = P(1 − r)^n. P = 20000, r = 0.10, n = 2. Find V.", "V=20000(0.90)^2", "16200", "V = 20000 × 0.81 = 16200.", ["$16200", "16200.00"]),
        practicalChoice("y12s2-form-m8", "BMI = m/h². A person of mass 80 kg and height 1.6 m has BMI:", "C", ["40", "32.5", "31.25", "50"], "BMI = 80/1.6² = 80/2.56 = 31.25."),
        algebraAnswer("y12s2-form-m9", "Find S when D = 300 km and T = 2.5 h.", "S=\\frac{300}{2.5}", "120", "S = 300/2.5 = 120 km/h.", ["120 km/h"]),
        practicalChoice("y12s2-form-m10", "A compound interest calculation gives $A = 2000(1.03)^5$. The interest earned is:", "B", ["The value of A", "A minus 2000", "2000 times 5 times 3 percent", "5 percent of 2000"], "Interest earned = A − P = A − 2000."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise HSC-style algebra modelling questions using linear, quadratic, exponential, inverse variation, and simultaneous-equation models in practical contexts.",
    learningIntention:
      "Apply algebraic models to practical exam-style contexts involving costs, savings, growth, inverse trade-offs, revenue, and option comparisons.",
    successCriteria: [
      "Construct and interpret linear models from fixed costs and rates.",
      "Recognise and interpret quadratic, exponential, and inverse variation models.",
      "Solve and interpret simultaneous equations in context.",
      "Check units, context restrictions, and reasonableness.",
    ],
    teaching: {
      paragraphs: [
        "Algebraic Relationships questions usually start with a real situation and ask you to build, use, compare, or interpret a model.",
        "Linear models add the same amount each step. Quadratic graphs bend through a turning point, exponential models multiply by a repeated factor, and inverse variation models keep a product constant.",
        "Simultaneous equations are useful when two models describe two options. The solution tells where the options have the same value.",
        "For exam responses, keep typed answers short: an equation, a value, a coordinate, or a labelled multiple-choice conclusion.",
      ],
      latexBlocks: [
        "y=mx+b",
        "V=200(1.1)^n",
        "y=\\frac{k}{x}",
        "\\text{intersection: model A} = \\text{model B}",
      ],
    },
    workedExamples: [
      {
        title: "Construct and use a cost model",
        questionLatex:
          "\\text{A gym charges }\\$40\\text{ plus }\\$18\\text{ per week.}",
        steps: [
          {
            explanation: "Write the model from fixed fee plus weekly rate.",
            latex: "C=40+18w",
          },
          {
            explanation: "For 5 weeks, substitute w = 5.",
            latex: "C=40+18(5)=130",
          },
        ],
        finalAnswerLatex: "\\$130",
      },
      {
        title: "Recognise and use an exponential model",
        questionLatex:
          "V=200(1.1)^n,\\quad n=2",
        steps: [
          {
            explanation: "The factor 1.1 is repeated multiplication, so this is exponential growth rather than a steady increase.",
            latex: "1.1>1",
          },
          {
            explanation: "Apply the growth factor twice because n = 2.",
            latex: "V=200(1.1)^2=242",
          },
        ],
        finalAnswerLatex: "V=242",
      },
      {
        title: "Compare two options",
        questionLatex:
          "A=30+15h,\\quad B=60+10h",
        steps: [
          {
            explanation: "Set the models equal.",
            latex: "30+15h=60+10h",
          },
          {
            explanation: "Solve for h.",
            latex: "h=6",
          },
        ],
        finalAnswerLatex: "\\text{Equal after }6\\text{ hours.}",
      },
    ],
    guidedPractice: [
      linearAnswer("y12s2-alg-exam-g1", "A gym charges 40 dollars plus 18 dollars per week. Write the cost model C after w weeks.", "C=40+18w", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40"]),
      moneyAnswer("y12s2-alg-exam-g2", "Using C = 40 + 18w, find the cost after 5 weeks.", "C=40+18w,\\quad w=5", "130"),
      algebraAnswer("y12s2-alg-exam-g3", "For inverse variation xy = 48, find y when x = 6.", "y=\\frac{48}{6}", "8", "Inverse variation keeps the product xy constant. Divide 48 by 6 to get the matching y-value."),
      linearAnswer("y12s2-alg-exam-g4", "Costs A = 30 + 15h and B = 60 + 10h are equal after how many hours?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
    ],
    independentPractice: [
      practicalChoice("y12s2-alg-exam-i1", "In C = 25 + 0.12g for a phone plan, 0.12 represents:", "B", ["Base cost", "Cost per extra GB", "Total data", "Number of months"], "The coefficient of g is the rate per GB."),
      linearAnswer("y12s2-alg-exam-i2", "A taxi charges 6 dollars plus 2.40 dollars per km. Write F for d km.", "F=6+2.40d", "F = 6 + 2.40d", ["F=6+2.40d", "f=6+2.40d", "F=2.40d+6", "F=6+2.4d"]),
      moneyAnswer("y12s2-alg-exam-i3", "Using F = 6 + 2.40d, find the fare for 10 km.", "F=6+2.40d,\\quad d=10", "30"),
      practicalChoice("y12s2-alg-exam-i4", "A graph has vertex (3, 45) in a revenue model that opens downward. What does 45 represent?", "C", ["Initial cost", "Time", "Maximum revenue", "Gradient"], "The y-value of a downward vertex is the maximum."),
      practicalChoice("y12s2-alg-exam-i5", "Two models are equal at (6, 120). In a hire context, 6 represents:", "A", ["Hours", "Dollars", "Gradient", "Initial fee"], "The input coordinate is hours."),
    ],
    commonMistakes: [
      { mistake: "Confusing the meaning of gradient and intercept.", fix: "Gradient is rate; intercept is starting value or fixed amount." },
      { mistake: "Treating a non-linear model as if it has a constant rate.", fix: "Look for powers, curves, or changing first differences." },
      { mistake: "Solving two models but not interpreting the result.", fix: "State what the input and output mean in context." },
      { mistake: "Accepting impossible context values.", fix: "Reject negative time, length, or cost when the context makes them impossible." },
    ],
    masteryQuiz: [
      linearAnswer("y12s2-alg-exam-m1", "A hire company charges 35 dollars plus 12 dollars per hour. Write C for h hours.", "", "C = 35 + 12h", ["C=35+12h", "c=35+12h", "C=12h+35"]),
      moneyAnswer("y12s2-alg-exam-m2", "Using the cost model shown, find C when h = 4.", "C=35+12h", "83"),
      practicalChoice("y12s2-alg-exam-m3", "In S = 120 + 25w, the 120 is:", "A", ["Starting savings", "Weekly increase", "Number of weeks", "Gradient only"], "It is the value when w = 0."),
      algebraChoice("y12s2-alg-exam-m4", "Which model represents exponential decay?", "C", ["y=4x+2", "y=30/x", "y=120(0.8)^x", "y=x^2-5"], "The variable is in the exponent and the repeated multiplier 0.8 lies between 0 and 1. That means the model decays."),
      algebraAnswer("y12s2-alg-exam-m5", "For inverse variation xy = 72, find y when x = 9.", "y=\\frac{72}{9}", "8", "Inverse variation keeps xy equal to 72. Divide the constant product by the known x-value."),
      practicalChoice("y12s2-alg-exam-m6", "A curved graph with changing rate is:", "B", ["Linear", "Non-linear", "Always impossible", "A fixed fee"], "Curved graphs are non-linear."),
      linearAnswer("y12s2-alg-exam-m7", "Models A = 30 + 15h and B = 60 + 10h are equal at what h?", "A=30+15h,\\quad B=60+10h", "6", ["6 h", "6 hours"]),
      practicalChoice("y12s2-alg-exam-m8", "A hire cost follows C = 35 + 12h. If the total cost is 107 dollars, what is h?", "C", ["4 hours", "5 hours", "6 hours", "7 hours"], "Reverse the model by removing the fixed cost, then dividing by the hourly rate."),
      practicalChoice("y12s2-alg-exam-m9", "Which setup finds when A = 30 + 15h and B = 60 + 10h are equal?", "A", ["30 + 15h = 60 + 10h", "30 + 15h = 8", "60 + 10h = 120h", "30 + 60 = h"], "Equal outputs are found by setting the two expressions equal."),
      practicalChoice("y12s2-alg-exam-m10", "A height model gives t = -1 and t = 5 when the object is on the ground. Which conclusion is best?", "B", ["Use -1 second as the landing time", "Use 5 seconds as the practical landing time", "Use both because time can be negative", "Reject both because the graph is curved"], "The negative time is not practical, so the positive time is the meaningful landing time."),
    ],
  };
}
