import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

function differentiationFeedback(prompt: string, answer: string) {
  if (prompt.includes("average rate") || prompt.includes("average velocity") || prompt.includes("gradient of the secant")) {
    return `Average rate of change is the steepness between two points: change in output divided by change in input. This secant gradient is ${answer}.`;
  }
  if (prompt.includes("Simplify the numerator")) {
    return `Expand carefully so the common factor of h becomes visible. This matters because first principles only lets h approach zero after that factor can cancel; the numerator simplifies to ${answer}.`;
  }
  if (prompt.includes("difference quotient")) {
    return `The difference quotient compares a nearby output with the original output, then divides by the small horizontal change h. Simplify before letting h shrink toward zero; this gives ${answer}.`;
  }
  if (prompt.includes("first principles")) {
    return `First principles starts with a secant gradient and shrinks the interval until it behaves like the tangent at one point. After simplifying and taking the limit, the derivative is ${answer}.`;
  }
  if (prompt.includes("chain rule") || prompt.includes("inner function") || prompt.includes("outer function")) {
    return `The chain rule applies to composite functions: multiply the outer derivative (evaluated at the inner function) by the inner derivative. For (expression)^n, bring down the power, reduce it by one, then multiply by the inner derivative. The result is ${answer}.`;
  }
  if (prompt.includes("stationary point") || prompt.includes("stationary")) {
    return `Stationary points occur where the derivative equals zero. Set f'(x) = 0 and solve for x, then find the y-value by substituting back into the original function. Use the first derivative test to classify each point. The result is ${answer}.`;
  }
  if (prompt.includes("inflection")) {
    return `A point of inflection occurs where f''(x) = 0 and f''(x) changes sign. Set f''(x) = 0 to find candidates, then confirm the sign change on either side. The result is ${answer}.`;
  }
  if (prompt.includes("f''") || prompt.includes("second derivative") || prompt.includes("concav")) {
    return `The second derivative is found by differentiating f'(x) once more. If f''(x) > 0, the graph is concave up; if f''(x) < 0, it is concave down. At a stationary point, the second derivative test classifies the point. The result is ${answer}.`;
  }
  if ((prompt.includes("increasing") || prompt.includes("decreasing")) && prompt.includes("interval")) {
    return `Find where f'(x) > 0 (increasing) or f'(x) < 0 (decreasing). Solve the resulting inequality to state the interval. The result is ${answer}.`;
  }
  if (prompt.includes("gradient") && prompt.includes("at x")) {
    return `Find the derivative using the chain rule for composite functions, then substitute the given x-value to evaluate the gradient at that point. The result is ${answer}.`;
  }
  if (prompt.includes("Differentiate")) {
    return `Differentiate term by term. For each power of x, multiply by the old power and reduce that power by 1; constants disappear because they do not change, giving ${answer}.`;
  }
  if (prompt.includes("Evaluate the derivative") || prompt.includes("derivative value")) {
    return `The derivative is the gradient function. Find it first if needed, then substitute the stated x-value to get the curve's local steepness, ${answer}.`;
  }
  if (prompt.includes("x-value where the tangent is horizontal")) {
    return `A horizontal tangent has gradient 0. Set the derivative equal to zero and solve for the x-value, giving ${answer}.`;
  }
  if (prompt.includes("point on the curve")) {
    return `A tangent or normal line must pass through the actual point on the curve. Substitute the given x-value into the original function to get ${answer}.`;
  }
  if (prompt.includes("normal gradient")) {
    return `A normal is perpendicular to the tangent, so use the negative reciprocal of the tangent gradient. This gives ${answer}.`;
  }
  if (prompt.includes("tangent gradient")) {
    return `The y-value tells you the point's height, but the derivative tells you the curve's local steepness. Evaluate the derivative at the stated x-value to get tangent gradient ${answer}.`;
  }
  if (prompt.includes("normal equation")) {
    return `Use the negative-reciprocal normal gradient and the point on the curve in point-gradient form. Simplifying that line gives ${answer}.`;
  }
  if (prompt.includes("tangent equation")) {
    return `Find the local gradient from the derivative, find the point from the original curve, then use point-gradient form. Simplifying gives ${answer}.`;
  }
  return `Choose the derivative step that matches the question, then keep gradient and function value separate. The result is ${answer}.`;
}

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const greaterThanMatch = answer.match(/^x > (-?\d+(?:\.\d+)?)$/);
  const lessThanMatch = answer.match(/^x < (-?\d+(?:\.\d+)?)$/);
  const boundedIntervalMatch = answer.match(/^(-?\d+(?:\.\d+)?) < x < (-?\d+(?:\.\d+)?)$/);
  const coordinateMatch = answer.match(/^\((-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)\)$/);
  const classificationVariants: Record<string, string[]> = {
    "local maximum": ["local max", "maximum", "max"],
    "local minimum": ["local min", "minimum", "min"],
    "point of inflection": ["inflection point", "inflection"],
    "concave up": ["concave upward", "upward concavity"],
    "concave down": ["concave downward", "downward concavity"],
  };
  const intervalVariants = [
    ...(greaterThanMatch
      ? [
        `${greaterThanMatch[1]} < x`,
        `${greaterThanMatch[1]}<x`,
        `x is greater than ${greaterThanMatch[1]}`,
        `(${greaterThanMatch[1]}, infinity)`,
        `(${greaterThanMatch[1]},\\infty)`,
        `(${greaterThanMatch[1]}, \\infty)`,
      ]
      : []),
    ...(lessThanMatch
      ? [
        `${lessThanMatch[1]} > x`,
        `${lessThanMatch[1]}>x`,
        `x is less than ${lessThanMatch[1]}`,
        `(-infinity, ${lessThanMatch[1]})`,
        `(-\\infty, ${lessThanMatch[1]})`,
        `(-\\infty,${lessThanMatch[1]})`,
      ]
      : []),
    ...(boundedIntervalMatch
      ? [
        `${boundedIntervalMatch[1]}<x<${boundedIntervalMatch[2]}`,
        `(${boundedIntervalMatch[1]}, ${boundedIntervalMatch[2]})`,
        `(${boundedIntervalMatch[1]},${boundedIntervalMatch[2]})`,
      ]
      : []),
    ...(coordinateMatch
      ? [
        `(${coordinateMatch[1]}, ${coordinateMatch[2]})`,
        `${coordinateMatch[1]},${coordinateMatch[2]}`,
        `${coordinateMatch[1]}, ${coordinateMatch[2]}`,
        `x=${coordinateMatch[1]},y=${coordinateMatch[2]}`,
        `x = ${coordinateMatch[1]}, y = ${coordinateMatch[2]}`,
      ]
      : []),
    ...(classificationVariants[answer.toLowerCase()] ?? []),
  ];

  return {
    ...baseFormulaAnswer(id, prompt, latex, answer, [
      ...acceptedAnswers,
      ...intervalVariants,
    ]),
    explanation: differentiationFeedback(prompt, answer),
  };
}

export function year11AdvancedIntroductionDifferentiationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "introduction-differentiation"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "rates-of-change-gradients") {
    return {
      ...base,
      description:
        "Use gradients and average rates of change to connect secants, tangents, tables, graphs, and contextual rates.",
      learningIntention:
        "Learn how average and instantaneous rates of change connect gradients, secants, tangents, and practical interpretation.",
      successCriteria: [
        "Calculate average rate of change from two function values.",
        "Find the gradient between two points on a curve.",
        "Interpret a secant gradient as an average rate of change.",
        "Recognise instantaneous rate of change as the limiting gradient of secants.",
        "Use tables to estimate gradients over intervals.",
        "Interpret positive, negative, and zero gradients in context.",
      ],
      teaching: {
        paragraphs: [
          "A gradient tells you steepness: how much the output changes for each one-unit change in the input. In a context, it answers a practical question such as how quickly height or volume is changing.",
          "Average rate of change uses two points. The straight line joining them is a secant, and its gradient summarises the change across the whole interval.",
          "Instantaneous rate of change asks for steepness at one point. A tangent captures the curve's local straight-line behaviour there, as though you zoomed in until the curve looked almost straight.",
          "You can imagine sliding the second secant point closer to the first. The secant gradients approach the tangent gradient, linking average change to instantaneous change.",
          "A positive gradient means the graph is increasing, a negative gradient means it is decreasing, and a zero gradient means it is momentarily flat.",
          "In context, units matter. If height is measured in metres and time in seconds, a rate of change is measured in metres per second.",
        ],
        latexBlocks: [
          "\\text{average rate of change}=\\frac{\\text{change in output}}{\\text{change in input}}",
          "\\frac{f(b)-f(a)}{b-a}",
          "m=\\frac{y_2-y_1}{x_2-x_1}",
          "\\text{instantaneous rate of change}=\\text{gradient of the tangent}",
        ],
      },
      workedExamples: [
        {
          title: "Average rate of change from function values",
          questionLatex:
            "f(1)=4,\\quad f(5)=20.\\quad \\text{Find the average rate of change from }x=1\\text{ to }x=5.",
          steps: [
            { explanation: "Use change in output divided by change in input.", latex: "\\frac{f(5)-f(1)}{5-1}" },
            { explanation: "Substitute the two function values.", latex: "\\frac{20-4}{5-1}=\\frac{16}{4}" },
            { explanation: "Simplify the gradient.", latex: "4" },
          ],
          finalAnswerLatex: "4",
        },
        {
          title: "Gradient from two points on a curve",
          questionLatex:
            "\\text{Find the gradient of the secant through }A(2,5)\\text{ and }B(6,17).",
          steps: [
            { explanation: "Use the gradient formula for two points.", latex: "m=\\frac{y_2-y_1}{x_2-x_1}" },
            { explanation: "Substitute the coordinates.", latex: "m=\\frac{17-5}{6-2}" },
            { explanation: "Simplify.", latex: "m=3" },
          ],
          finalAnswerLatex: "3",
        },
        {
          title: "Interpret a rate in context",
          questionLatex:
            "\\text{A water tank volume changes from }180\\text{ L to }132\\text{ L over }6\\text{ minutes.}",
          steps: [
            { explanation: "Find the average rate of change in volume.", latex: "\\frac{132-180}{6}=-8" },
            { explanation: "The negative sign means the volume is decreasing.", latex: "-8\\text{ L/min}" },
          ],
          finalAnswerLatex:
            "\\text{The tank is losing water at an average rate of }8\\text{ L/min.}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-id-roc-g1", "Find the average rate of change over the given interval.", "f(2)=7,\\quad f(6)=19", "3", ["3 units per x"]),
        formulaAnswer("y11adv-id-roc-g2", "Find the gradient of the secant through the two points.", "A(1,4),\\quad B(5,12)", "2", ["m=2"]),
        practicalChoice("y11adv-id-roc-g3", "Which statement best describes the gradient sign?", "B", ["The quantity is increasing", "The quantity is decreasing", "The quantity is constant", "The graph has no tangent"], "A negative gradient means the quantity is decreasing.", "m=-3"),
        practicalChoice("y11adv-id-roc-g4", "Which setup gives the average rate of change over the interval?", "C", ["$\\frac{f(6)+f(2)}{6+2}$", "$\\frac{6-2}{f(6)-f(2)}$", "$\\frac{f(6)-f(2)}{6-2}$", "$f(6)-f(2)$"], "Average rate of change is change in output divided by change in input.", "\\text{From }x=2\\text{ to }x=6"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-id-roc-i1", "Find the average rate of change over the given interval.", "f(0)=3,\\quad f(4)=27", "6", ["m=6"]),
        formulaAnswer("y11adv-id-roc-i2", "Use the table values to find the average rate of change from the first time to the last time.", "\\begin{array}{c|ccc}t&0&2&5\\\\ h(t)&40&34&10\\end{array}", "-6", ["-6 m/s", "-6 units per second"]),
        practicalChoice("y11adv-id-roc-i3", "A graph is flat at a point. Which gradient is most appropriate at that point?", "A", ["0", "positive", "negative", "undefined"], "A horizontal tangent has gradient 0.", "\\text{Horizontal tangent}"),
        formulaAnswer("y11adv-id-roc-i4", "Find the average rate of change for the height over the time interval.", "\\text{height changes from }1.2\\text{ m to }4.8\\text{ m in }3\\text{ s}", "1.2", ["1.2 m/s"]),
        practicalChoice("y11adv-id-roc-i5", "Which description matches a positive rate of change in this context?", "D", ["The tank is empty", "The volume is decreasing", "The volume is unchanged", "The volume is increasing"], "Positive rate of change means the output is increasing.", "\\frac{dV}{dt}>0"),
      ],
      commonMistakes: [
        { mistake: "Dividing change in input by change in output.", fix: "Average rate of change is output change divided by input change." },
        { mistake: "Ignoring the sign of a gradient.", fix: "The sign tells whether the quantity is increasing, decreasing, or flat." },
        { mistake: "Calling a secant gradient instantaneous.", fix: "A secant gradient is an average rate across an interval; a tangent gradient is instantaneous." },
        { mistake: "Dropping units in contextual rates.", fix: "Use output units divided by input units, such as metres per second." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-id-roc-m1", "Find the gradient of the secant through the two points.", "(2,9),\\quad (6,21)", "3", ["m=3"]),
        formulaAnswer("y11adv-id-roc-m2", "Find the average rate of change over the given interval.", "f(1)=8,\\quad f(4)=17", "3", ["3 units per x"]),
        practicalChoice("y11adv-id-roc-m3", "Which gradient sign matches a decreasing graph?", "B", ["Positive", "Negative", "Zero", "Cannot be decided"], "A decreasing graph has negative gradient.", "\\text{Decreasing graph}"),
        formulaAnswer("y11adv-id-roc-m4", "Use the table to find the average rate of change over the full interval. Give the exact fraction.", "\\begin{array}{c|ccc}x&1&3&7\\\\ y&10&18&30\\end{array}", "10/3"),
        practicalChoice("y11adv-id-roc-m5", "Which setup correctly calculates the average speed over the trip?", "A", ["$\\frac{150-30}{4-1}$", "$\\frac{4-1}{150-30}$", "$\\frac{150+30}{4+1}$", "$150-30$"], "Average rate uses change in distance divided by change in time.", "\\begin{array}{c|cc}t\\text{ hours}&1&4\\\\ d\\text{ km}&30&150\\end{array}"),
        formulaAnswer("y11adv-id-roc-m6", "Find the average rate at which the tank volume changes.", "\\text{Volume changes from }240\\text{ L to }168\\text{ L in }9\\text{ min}", "-8", ["-8 L/min", "-8 litres per minute"]),
        practicalChoice("y11adv-id-roc-m7", "A student says the average rate must be positive because both output values are positive. Which option identifies the error?", "C", ["Positive outputs always give positive rates", "The input values should be added", "The change in output can be negative", "The tangent gradient is always zero"], "Rate depends on the change in output, not just whether the outputs are positive.", "f(2)=15,\\quad f(5)=6"),
        practicalChoice("y11adv-id-roc-m8", "Which statement correctly connects the limiting idea to instantaneous rate of change?", "D", ["Use the secant through any two far apart points", "Average all y-values in the table", "Use the y-intercept", "Let the second point move closer to the first point"], "Instantaneous rate is approached by secants through closer and closer points.", "\\text{Gradient at one point}"),
        formulaAnswer("y11adv-id-roc-m9", "A cyclist's distance is recorded at two times. Find the average velocity.", "\\begin{array}{c|cc}t\\text{ s}&4&10\\\\ s\\text{ m}&18&45\\end{array}", "4.5", ["4.5 m/s"]),
        practicalChoice("y11adv-id-roc-m10", "Which interpretation is best for the displayed average rate?", "B", ["The height increases at 5 metres per second", "The height decreases at 5 metres per second on average", "The height is always negative", "The object is stationary"], "The negative rate means decreasing; the magnitude is 5.", "\\frac{h(8)-h(2)}{8-2}=-5\\text{ m/s}"),
      ],
      masteryQuizPool: [
        { id: "y11adv-id-roc-p1", prompt: "Find the average rate of change over the interval.", latex: "f(0)=2,\\quad f(4)=10", answer: "2", difficulty: 1, acceptedAnswers: ["m=2"], hint: "Use change in output over change in input.", explanation: "$\\frac{10-2}{4-0}=\\frac{8}{4}=2$." },
        { id: "y11adv-id-roc-p2", prompt: "Find the average rate of change over the interval.", latex: "f(1)=5,\\quad f(6)=20", answer: "3", difficulty: 1, acceptedAnswers: ["m=3"], hint: "Divide the output change by the input change.", explanation: "$\\frac{20-5}{6-1}=\\frac{15}{5}=3$." },
        { id: "y11adv-id-roc-p3", prompt: "Find the gradient of the secant through the two points.", latex: "(1,3),\\quad (5,15)", answer: "3", difficulty: 1, acceptedAnswers: ["m=3"], hint: "Use the gradient formula.", explanation: "$\\frac{15-3}{5-1}=\\frac{12}{4}=3$." },
        { id: "y11adv-id-roc-p4", prompt: "Find the gradient of the secant through the two points.", latex: "(2,4),\\quad (6,20)", answer: "4", difficulty: 1, acceptedAnswers: ["m=4"], hint: "Rise over run.", explanation: "$\\frac{20-4}{6-2}=\\frac{16}{4}=4$." },
        { id: "y11adv-id-roc-p5", prompt: "Which gradient sign matches an increasing graph?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Positive" }, { label: "B", text: "Negative" }, { label: "C", text: "Zero" }, { label: "D", text: "Undefined" }], hint: "Increasing means rising.", explanation: "An increasing graph has positive gradient." },
        { id: "y11adv-id-roc-p6", prompt: "Find the average rate of change over the interval.", latex: "f(2)=7,\\quad f(8)=25", answer: "3", difficulty: 2, acceptedAnswers: ["m=3"], hint: "Output change divided by input change.", explanation: "$\\frac{25-7}{8-2}=\\frac{18}{6}=3$." },
        { id: "y11adv-id-roc-p7", prompt: "Find the average rate of change. Give the value with its sign.", latex: "f(1)=12,\\quad f(5)=4", answer: "-2", difficulty: 2, acceptedAnswers: ["-2", "−2", "m=-2"], hint: "The output decreases, so expect a negative value.", explanation: "$\\frac{4-12}{5-1}=\\frac{-8}{4}=-2$." },
        { id: "y11adv-id-roc-p8", prompt: "Find the average rate at which the volume changes. Give the value with its sign.", latex: "\\text{Volume changes from }150\\text{ L to }90\\text{ L in }5\\text{ min}", answer: "-12", difficulty: 2, acceptedAnswers: ["-12", "−12", "-12 L/min"], hint: "Change in volume over time.", explanation: "$\\frac{90-150}{5}=\\frac{-60}{5}=-12$ L/min." },
        { id: "y11adv-id-roc-p9", prompt: "Use the table to find the average rate of change over the full interval. Give the value with its sign.", latex: "\\begin{array}{c|ccc}t&0&3&8\\\\ h&50&38&10\\end{array}", answer: "-5", difficulty: 2, acceptedAnswers: ["-5", "−5", "-5 m/s"], hint: "Use the first and last entries.", explanation: "$\\frac{10-50}{8-0}=\\frac{-40}{8}=-5$." },
        { id: "y11adv-id-roc-p10", prompt: "Which setup gives the average rate of change over the interval?", latex: "\\text{From }x=1\\text{ to }x=4", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac{f(4)+f(1)}{4+1}$" }, { label: "B", text: "$\\frac{4-1}{f(4)-f(1)}$" }, { label: "C", text: "$\\frac{f(4)-f(1)}{4-1}$" }, { label: "D", text: "$f(4)-f(1)$" }], hint: "Output change over input change.", explanation: "Average rate is $\\frac{f(4)-f(1)}{4-1}$." },
        { id: "y11adv-id-roc-p11", prompt: "Find the gradient of the secant through the two points. Give the value with its sign.", latex: "(-1,8),\\quad (3,-4)", answer: "-3", difficulty: 3, acceptedAnswers: ["-3", "−3", "m=-3"], hint: "Use $\\frac{y_2-y_1}{x_2-x_1}$ with care over signs.", explanation: "$\\frac{-4-8}{3-(-1)}=\\frac{-12}{4}=-3$." },
        { id: "y11adv-id-roc-p12", prompt: "Find the average velocity over the interval. Give the value in m/s.", latex: "\\begin{array}{c|cc}t\\text{ s}&3&9\\\\ s\\text{ m}&12&39\\end{array}", answer: "4.5", difficulty: 3, acceptedAnswers: ["4.5", "9/2", "4.5 m/s"], hint: "Change in displacement over change in time.", explanation: "$\\frac{39-12}{9-3}=\\frac{27}{6}=4.5$ m/s." },
        { id: "y11adv-id-roc-p13", prompt: "Use the table to find the average rate of change over the full interval. Give the exact fraction.", latex: "\\begin{array}{c|ccc}x&2&5&8\\\\ y&3&12&17\\end{array}", answer: "7/3", difficulty: 3, acceptedAnswers: ["7/3"], hint: "Use the first and last columns.", explanation: "$\\frac{17-3}{8-2}=\\frac{14}{6}=\\frac{7}{3}$." },
        { id: "y11adv-id-roc-p14", prompt: "A student claims the average rate is positive because both outputs are positive. Which option identifies the error?", latex: "f(2)=18,\\quad f(6)=6", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Positive outputs always give positive rates" }, { label: "B", text: "The input values should be added" }, { label: "C", text: "The change in output can be negative" }, { label: "D", text: "The tangent gradient is always zero" }], hint: "Compare the two outputs.", explanation: "The output falls from 18 to 6, so the change is negative and the rate is $\\frac{6-18}{6-2}=-3$." },
        { id: "y11adv-id-roc-p15", prompt: "Which statement connects the limiting idea to instantaneous rate of change?", latex: "\\text{Gradient at one point}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "Use the secant through any two far-apart points" }, { label: "B", text: "Average all $y$-values in the table" }, { label: "C", text: "Use the $y$-intercept" }, { label: "D", text: "Let the second point move closer to the first point" }], hint: "Instantaneous rate is a limit of secants.", explanation: "As the second point approaches the first, the secant gradient approaches the tangent gradient." },
        { id: "y11adv-id-roc-p16", prompt: "Find the average rate of change over the interval.", latex: "f(0)=3,\\quad f(9)=30", answer: "3", difficulty: 2, acceptedAnswers: ["m=3"], hint: "Output change over input change.", explanation: "$\\frac{30-3}{9-0}=\\frac{27}{9}=3$." },
        { id: "y11adv-id-roc-p17", prompt: "Find the gradient of the secant through the two points. Give the value with its sign.", latex: "(0,10),\\quad (4,2)", answer: "-2", difficulty: 2, acceptedAnswers: ["-2", "−2", "m=-2"], hint: "Rise over run.", explanation: "$\\frac{2-10}{4-0}=\\frac{-8}{4}=-2$." },
        { id: "y11adv-id-roc-p18", prompt: "Find the average rate at which the tank fills.", latex: "\\text{Volume changes from }20\\text{ L to }92\\text{ L in }8\\text{ min}", answer: "9", difficulty: 2, acceptedAnswers: ["9 L/min"], hint: "Change in volume over time.", explanation: "$\\frac{92-20}{8}=\\frac{72}{8}=9$ L/min." },
        { id: "y11adv-id-roc-p19", prompt: "Which interpretation matches the displayed average rate?", latex: "\\frac{h(7)-h(1)}{7-1}=-4\\text{ m/s}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The height increases at 4 m/s" }, { label: "B", text: "The height decreases at 4 m/s on average" }, { label: "C", text: "The height is always negative" }, { label: "D", text: "The object is stationary" }], hint: "The negative sign shows decrease.", explanation: "A negative rate of magnitude 4 means the height falls at an average of 4 m/s." },
        { id: "y11adv-id-roc-p20", prompt: "Find the average rate of change. Give the exact fraction.", latex: "f(1)=4,\\quad f(6)=11", answer: "7/5", difficulty: 3, acceptedAnswers: ["7/5", "1.4"], hint: "Output change over input change.", explanation: "$\\frac{11-4}{6-1}=\\frac{7}{5}$." },
        { id: "y11adv-id-roc-p21", prompt: "For the function, find the average rate of change from $x=1$ to $x=3$.", latex: "f(x)=x^2", answer: "4", difficulty: 4, acceptedAnswers: ["m=4"], hint: "Compute $f(1)$ and $f(3)$ first.", explanation: "$f(1)=1,\\ f(3)=9$, so $\\frac{9-1}{3-1}=\\frac{8}{2}=4$." },
        { id: "y11adv-id-roc-p22", prompt: "For the function, find the average rate of change from $x=2$ to $x=5$.", latex: "f(x)=x^2-x", answer: "6", difficulty: 4, acceptedAnswers: ["m=6"], hint: "Find $f(2)$ and $f(5)$.", explanation: "$f(2)=2,\\ f(5)=20$, so $\\frac{20-2}{5-2}=\\frac{18}{3}=6$." },
        { id: "y11adv-id-roc-p23", prompt: "For the function, find the average rate of change from $x=0$ to $x=4$. Give the value with its sign.", latex: "f(x)=10-x^2", answer: "-4", difficulty: 4, acceptedAnswers: ["-4", "−4", "m=-4"], hint: "Find $f(0)$ and $f(4)$.", explanation: "$f(0)=10,\\ f(4)=-6$, so $\\frac{-6-10}{4-0}=\\frac{-16}{4}=-4$." },
        { id: "y11adv-id-roc-p24", prompt: "A ball's height is $h(t)=20t-5t^2$. Find the average velocity from $t=0$ to $t=2$.", latex: "h(t)=20t-5t^2", answer: "10", difficulty: 4, acceptedAnswers: ["10 m/s", "m=10"], hint: "Find $h(0)$ and $h(2)$.", explanation: "$h(0)=0,\\ h(2)=40-20=20$, so $\\frac{20-0}{2-0}=10$ m/s." },
        { id: "y11adv-id-roc-p25", prompt: "Find the value of $k$ if the average rate of change of the points is 5.", latex: "(2,6),\\quad (5,k)", answer: "21", difficulty: 5, acceptedAnswers: ["k=21"], hint: "Set $\\frac{k-6}{5-2}=5$.", explanation: "$\\frac{k-6}{3}=5$ gives $k-6=15$, so $k=21$." },
        { id: "y11adv-id-roc-p26", prompt: "For the function, find the average rate of change from $x=1$ to $x=4$.", latex: "f(x)=x^3", answer: "21", difficulty: 5, acceptedAnswers: ["m=21"], hint: "Find $f(1)$ and $f(4)$, then divide by the input change.", explanation: "$f(1)=1,\\ f(4)=64$, so $\\frac{64-1}{4-1}=\\frac{63}{3}=21$." },
        { id: "y11adv-id-roc-p27", prompt: "A particle has position $s(t)=t^2-4t$. Find the average velocity from $t=1$ to $t=5$.", latex: "s(t)=t^2-4t", answer: "2", difficulty: 5, acceptedAnswers: ["2 m/s", "m=2"], hint: "Find $s(1)$ and $s(5)$.", explanation: "$s(1)=1-4=-3,\\ s(5)=25-20=5$, so $\\frac{5-(-3)}{5-1}=\\frac{8}{4}=2$ m/s." },
        { id: "y11adv-id-roc-p28", prompt: "The average rate of change of $f(x)=x^2$ from $x=2$ to $x=2+h$ simplifies to $4+h$. Find this average rate when $h=0.5$.", latex: "f(x)=x^2,\\quad\\frac{f(2+h)-f(2)}{h}=4+h", answer: "4.5", difficulty: 5, acceptedAnswers: ["9/2", "4.5"], hint: "Substitute $h=0.5$ into $4+h$.", explanation: "$4+0.5=4.5$." },
        { id: "y11adv-id-roc-p29", prompt: "Find $a$ if the secant through the points has gradient $-2$.", latex: "(a,7),\\quad (4,1)", answer: "1", difficulty: 5, acceptedAnswers: ["a=1"], hint: "Set $\\frac{1-7}{4-a}=-2$.", explanation: "$\\frac{-6}{4-a}=-2$ gives $4-a=3$, so $a=1$." },
        { id: "y11adv-id-roc-p30", prompt: "A tank empties so its volume is $V(t)=100-2t^2$ litres. Find the average rate of change of volume from $t=1$ to $t=3$. Give the value with its sign.", latex: "V(t)=100-2t^2", answer: "-8", difficulty: 5, acceptedAnswers: ["-8", "−8", "-8 L/min"], hint: "Find $V(1)$ and $V(3)$.", explanation: "$V(1)=98,\\ V(3)=82$, so $\\frac{82-98}{3-1}=\\frac{-16}{2}=-8$ L/min." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-id-roc-mp1",
          prompt: "A car's distance from a town is recorded. At $t=1$ h the distance is $30$ km and at $t=4$ h it is $150$ km.",
          latex: "\\begin{array}{c|cc}t\\text{ h}&1&4\\\\ d\\text{ km}&30&150\\end{array}",
          answer: "40",
          hint: "Use change in distance over change in time, then re-use that average speed.",
          explanation: "(a) Change in distance is $150-30=120$ km. (b) Average speed is $\\frac{120}{3}=40$ km/h. (c) In 2 hours at this speed the car travels $40\\times2=80$ km.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the change in distance over the interval (in km).", marks: 1, answer: "120", acceptedAnswers: ["120 km"], hint: "Subtract the earlier distance from the later distance.", explanation: "$150-30=120$ km." },
            { key: "b", label: "(b)", prompt: "Find the average speed over the interval (in km/h).", marks: 2, answer: "40", acceptedAnswers: ["40 km/h", "m=40"], hint: "Divide the distance change by the time change.", explanation: "$\\frac{120}{4-1}=\\frac{120}{3}=40$ km/h." },
            { key: "c", label: "(c)", prompt: "At that average speed, how far would the car travel in 2 hours (in km)?", marks: 1, answer: "80", acceptedAnswers: ["80 km"], hint: "Multiply the average speed by 2.", explanation: "$40\\times2=80$ km." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "derivatives-first-principles") {
    return {
      ...base,
      description:
        "Build the derivative from the difference quotient and use first principles for simple linear and quadratic functions.",
      learningIntention:
        "Learn how the derivative arises from the limiting gradient of secants and use first principles for simple functions.",
      successCriteria: [
        "Recognise the derivative as a gradient function.",
        "Identify the correct difference quotient setup.",
        "Explain the limit idea in first principles without lengthy notation.",
        "Use first principles to differentiate simple linear functions.",
        "Use first principles to differentiate $f(x)=x^2$.",
        "Interpret the derivative as an instantaneous rate of change.",
      ],
      teaching: {
        paragraphs: [
          "First principles builds a derivative from the gradient idea rather than dropping in a rule. Start with two nearby points on the curve and calculate the secant gradient between them.",
          "The second point is h units to the right, so its output is f(x + h). The difference quotient is new output minus original output, divided by the horizontal change h.",
          "Now shrink h toward zero. The secant becomes a better and better local model of the curve, so its gradient approaches the tangent gradient.",
          "Do not substitute h = 0 at the start because that divides by zero. Simplify first so a factor of h cancels, then let the remaining h approach zero.",
          "In this Year 11 introduction, the goal is to understand the setup and process before using faster derivative rules.",
        ],
        latexBlocks: [
          "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}",
          "\\text{difference quotient}=\\frac{f(x+h)-f(x)}{h}",
          "\\text{derivative}=\\text{gradient function}",
        ],
      },
      workedExamples: [
        {
          title: "Use first principles for a quadratic",
          questionLatex: "f(x)=x^2",
          steps: [
            { explanation: "Start with the first-principles definition.", latex: "f'(x)=\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}" },
            { explanation: "Expand and simplify the numerator.", latex: "(x+h)^2-x^2=x^2+2xh+h^2-x^2=2xh+h^2" },
            { explanation: "Factor and cancel the common factor.", latex: "\\frac{2xh+h^2}{h}=2x+h" },
            { explanation: "Let h approach zero.", latex: "f'(x)=2x" },
          ],
          finalAnswerLatex: "f'(x)=2x",
        },
        {
          title: "Use first principles for a linear function",
          questionLatex: "f(x)=3x+1",
          steps: [
            { explanation: "Find the difference quotient.", latex: "\\frac{f(x+h)-f(x)}{h}=\\frac{[3(x+h)+1]-(3x+1)}{h}" },
            { explanation: "Simplify the numerator.", latex: "\\frac{3x+3h+1-3x-1}{h}=\\frac{3h}{h}" },
            { explanation: "Cancel and take the limit.", latex: "f'(x)=3" },
          ],
          finalAnswerLatex: "f'(x)=3",
        },
        {
          title: "Choose the first-principles setup",
          questionLatex: "g'(x)=\\lim_{h\\to0}\\frac{g(x+h)-g(x)}{h}",
          steps: [
            { explanation: "The numerator must be the new function value minus the original function value.", latex: "g(x+h)-g(x)" },
            { explanation: "The denominator is the horizontal change.", latex: "h" },
          ],
          finalAnswerLatex: "\\lim_{h\\to0}\\frac{g(x+h)-g(x)}{h}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-id-fp-g1", "Which expression is the correct difference quotient?", "A", ["$\\frac{f(x+h)-f(x)}{h}$", "$\\frac{f(x)-f(h)}{x}$", "$\\frac{f(x+h)+f(x)}{h}$", "$f(x+h)-h$"], "The difference quotient uses new output minus original output, over h.", "\\text{First principles}"),
        practicalChoice("y11adv-id-fp-g2", "Which expanded expression belongs in the first-principles calculation?", "C", ["$x^2+h^2$", "$2xh+h^2$", "$x^2+2xh+h^2$", "$x^2-2xh+h^2$"], "Expand the square using the binomial pattern.", "(x+h)^2"),
        formulaAnswer("y11adv-id-fp-g3", "Use first principles to find the derivative of the linear function.", "f(x)=5x-2", "5", ["f'(x)=5"]),
        practicalChoice("y11adv-id-fp-g4", "What does the derivative represent at a point on the graph?", "B", ["The y-intercept", "The tangent gradient", "The average of all y-values", "The area under the curve"], "The derivative gives the instantaneous gradient at a point.", "\\text{Derivative at }x=a"),
      ],
      independentPractice: [
        practicalChoice("y11adv-id-fp-i1", "Which first-principles setup matches the displayed function?", "D", ["$\\lim_{h\\to0}\\frac{(x+h)^2+x^2}{h}$", "$\\lim_{h\\to0}\\frac{x^2-(x+h)^2}{h}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{x}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}$"], "Use f(x+h) minus f(x), divided by h.", "f(x)=x^2"),
        formulaAnswer("y11adv-id-fp-i2", "Simplify the difference quotient before taking the limit.", "\\frac{(x+h)^2-x^2}{h}", "2x+h", ["h+2x"]),
        formulaAnswer("y11adv-id-fp-i3", "Find the derivative from first principles after simplification.", "\\lim_{h\\to0}(2x+h)", "2x", ["f'(x)=2x"]),
        formulaAnswer("y11adv-id-fp-i4", "Use first principles to find the derivative of the linear function.", "g(x)=-4x+7", "-4", ["g'(x)=-4"]),
        practicalChoice("y11adv-id-fp-i5", "A student substitutes zero for h before simplifying. Which option identifies the problem?", "A", ["It creates division by zero in the difference quotient", "It changes the function into a reciprocal", "It finds the y-intercept", "It reflects the graph"], "The h in the denominator must cancel before the limit is taken.", "\\frac{f(x+h)-f(x)}{h}"),
      ],
      commonMistakes: [
        { mistake: "Putting $f(x)-f(x+h)$ in the numerator.", fix: "Use new output minus original output: $f(x+h)-f(x)$." },
        { mistake: "Substituting $h=0$ too early.", fix: "Simplify and cancel the factor of $h$ before taking the limit." },
        { mistake: "Expanding $(x+h)^2$ as $x^2+h^2$.", fix: "Use $(x+h)^2=x^2+2xh+h^2$." },
        { mistake: "Thinking first principles is a separate kind of derivative.", fix: "First principles explains the same derivative used later by rules." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-id-fp-m1", "Which expression is the correct first-principles definition?", "B", ["$\\lim_{h\\to0}\\frac{f(x)-f(x+h)}{h}$", "$\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$", "$\\lim_{h\\to0}\\frac{f(x+h)+f(x)}{h}$", "$\\lim_{x\\to0}\\frac{f(h)-f(x)}{x}$"], "Use f(x+h) minus f(x), divided by h.", "f'(x)"),
        formulaAnswer("y11adv-id-fp-m2", "Simplify the numerator for the first-principles calculation.", "(x+h)^2-x^2", "2xh+h^2", ["h(2x+h)", "h^2+2xh"]),
        formulaAnswer("y11adv-id-fp-m3", "Use first principles to find the derivative of the linear function.", "f(x)=2x+9", "2", ["f'(x)=2"]),
        formulaAnswer("y11adv-id-fp-m4", "Complete the simplified difference quotient.", "\\frac{(x+h)^2-x^2}{h}", "2x+h", ["h+2x"]),
        formulaAnswer("y11adv-id-fp-m5", "Use first principles to find the derivative.", "f(x)=x^2", "2x", ["f'(x)=2x"]),
        practicalChoice("y11adv-id-fp-m6", "Which setup is correct for the displayed function?", "C", ["$\\lim_{h\\to0}\\frac{3x+1-3(x+h)-1}{h}$", "$\\lim_{h\\to0}\\frac{3(x+h)+1+3x+1}{h}$", "$\\lim_{h\\to0}\\frac{[3(x+h)+1]-(3x+1)}{h}$", "$\\lim_{h\\to0}\\frac{3h+1}{x}$"], "Substitute x+h into the whole function, then subtract f(x).", "f(x)=3x+1"),
        practicalChoice("y11adv-id-fp-m7", "Which option identifies the expansion error?", "A", ["The middle term $2xh$ is missing", "The denominator should be x", "The limit should be infinity", "The derivative must be negative"], "The expansion of the square needs the middle term.", "(x+h)^2=x^2+h^2"),
        practicalChoice("y11adv-id-fp-m8", "Why does the limit idea use a very small h-value?", "D", ["To find the area under the graph", "To remove the x-values from the function", "To find the average of all gradients", "To make the secant gradient approach the tangent gradient"], "As h approaches zero, the second point moves closer to the first.", "\\text{First principles}"),
        formulaAnswer("y11adv-id-fp-m9", "After simplifying the difference quotient, find the derivative.", "\\frac{[4(x+h)-6]-(4x-6)}{h}", "4", ["f'(x)=4"]),
        practicalChoice("y11adv-id-fp-m10", "Which statement best interprets the result of a first-principles calculation?", "B", ["It gives only the y-intercept", "It gives the gradient function", "It gives the area between two curves", "It gives the midpoint of an interval"], "The derivative is a function that gives tangent gradients.", "f'(x)=2x"),
      ],
      masteryQuizPool: [
        { id: "y11adv-id-fp-p1", prompt: "Which expression is the correct difference quotient?", latex: "\\text{First principles}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{f(x+h)-f(x)}{h}$" }, { label: "B", text: "$\\frac{f(x)-f(h)}{x}$" }, { label: "C", text: "$\\frac{f(x+h)+f(x)}{h}$" }, { label: "D", text: "$f(x+h)-h$" }], hint: "New output minus original output, over $h$.", explanation: "The difference quotient is $\\frac{f(x+h)-f(x)}{h}$." },
        { id: "y11adv-id-fp-p2", prompt: "Use first principles to find the derivative of the linear function.", latex: "f(x)=4x+1", answer: "4", difficulty: 1, acceptedAnswers: ["f'(x)=4"], hint: "A linear function has constant gradient.", explanation: "The gradient of $4x+1$ is $4$, so $f'(x)=4$." },
        { id: "y11adv-id-fp-p3", prompt: "Use first principles to find the derivative of the linear function. Give the value with its sign.", latex: "f(x)=-3x+5", answer: "-3", difficulty: 1, acceptedAnswers: ["-3", "−3", "f'(x)=-3"], hint: "The gradient is the coefficient of $x$.", explanation: "The gradient of $-3x+5$ is $-3$, so $f'(x)=-3$." },
        { id: "y11adv-id-fp-p4", prompt: "What does the derivative represent at a point on the graph?", latex: "\\text{Derivative at }x=a", answer: "B", difficulty: 1, choices: [{ label: "A", text: "The $y$-intercept" }, { label: "B", text: "The tangent gradient" }, { label: "C", text: "The average of all $y$-values" }, { label: "D", text: "The area under the curve" }], hint: "It is an instantaneous gradient.", explanation: "The derivative gives the tangent gradient at the point." },
        { id: "y11adv-id-fp-p5", prompt: "Use first principles to find the derivative of the linear function.", latex: "f(x)=7x-2", answer: "7", difficulty: 1, acceptedAnswers: ["f'(x)=7"], hint: "The gradient is the coefficient of $x$.", explanation: "The gradient of $7x-2$ is $7$." },
        { id: "y11adv-id-fp-p6", prompt: "Simplify the numerator for the first-principles calculation.", latex: "(x+h)^2-x^2", answer: "2xh+h^2", difficulty: 2, acceptedAnswers: ["h(2x+h)", "h^2+2xh"], hint: "Expand $(x+h)^2$ first.", explanation: "$(x+h)^2-x^2=x^2+2xh+h^2-x^2=2xh+h^2$." },
        { id: "y11adv-id-fp-p7", prompt: "Which expanded expression belongs in the first-principles calculation for $(x+h)^2$?", latex: "(x+h)^2", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$x^2+h^2$" }, { label: "B", text: "$2xh+h^2$" }, { label: "C", text: "$x^2+2xh+h^2$" }, { label: "D", text: "$x^2-2xh+h^2$" }], hint: "Use the binomial pattern.", explanation: "$(x+h)^2=x^2+2xh+h^2$." },
        { id: "y11adv-id-fp-p8", prompt: "Simplify the difference quotient before taking the limit.", latex: "\\frac{(x+h)^2-x^2}{h}", answer: "2x+h", difficulty: 2, acceptedAnswers: ["h+2x"], hint: "Factor $h$ from the numerator, then cancel.", explanation: "$\\frac{2xh+h^2}{h}=2x+h$." },
        { id: "y11adv-id-fp-p9", prompt: "Find the derivative from first principles after simplification.", latex: "\\lim_{h\\to0}(2x+h)", answer: "2x", difficulty: 2, acceptedAnswers: ["f'(x)=2x"], hint: "Let $h$ approach zero.", explanation: "As $h\\to0$, $2x+h\\to2x$." },
        { id: "y11adv-id-fp-p10", prompt: "A student substitutes $h=0$ before simplifying. Which option identifies the problem?", latex: "\\frac{f(x+h)-f(x)}{h}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "It creates division by zero in the difference quotient" }, { label: "B", text: "It changes the function into a reciprocal" }, { label: "C", text: "It finds the $y$-intercept" }, { label: "D", text: "It reflects the graph" }], hint: "Look at the denominator.", explanation: "With $h=0$ the denominator is zero, so $h$ must cancel first." },
        { id: "y11adv-id-fp-p11", prompt: "Which first-principles setup matches the displayed function?", latex: "f(x)=x^2", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\lim_{h\\to0}\\frac{(x+h)^2+x^2}{h}$" }, { label: "B", text: "$\\lim_{h\\to0}\\frac{x^2-(x+h)^2}{h}$" }, { label: "C", text: "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{x}$" }, { label: "D", text: "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}$" }], hint: "Use $f(x+h)-f(x)$ over $h$.", explanation: "The correct setup is $\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}$." },
        { id: "y11adv-id-fp-p12", prompt: "After simplifying the difference quotient, find the derivative.", latex: "\\frac{[5(x+h)-2]-(5x-2)}{h}", answer: "5", difficulty: 3, acceptedAnswers: ["f'(x)=5"], hint: "Simplify the numerator and cancel $h$.", explanation: "Numerator is $5h$, so $\\frac{5h}{h}=5$." },
        { id: "y11adv-id-fp-p13", prompt: "Use first principles to find the derivative.", latex: "f(x)=x^2", answer: "2x", difficulty: 3, acceptedAnswers: ["f'(x)=2x"], hint: "Expand, simplify, then take the limit.", explanation: "$\\frac{(x+h)^2-x^2}{h}=2x+h\\to2x$." },
        { id: "y11adv-id-fp-p14", prompt: "Which setup is correct for the displayed function?", latex: "f(x)=3x+1", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\lim_{h\\to0}\\frac{3x+1-3(x+h)-1}{h}$" }, { label: "B", text: "$\\lim_{h\\to0}\\frac{3(x+h)+1+3x+1}{h}$" }, { label: "C", text: "$\\lim_{h\\to0}\\frac{[3(x+h)+1]-(3x+1)}{h}$" }, { label: "D", text: "$\\lim_{h\\to0}\\frac{3h+1}{x}$" }], hint: "Substitute $x+h$ into the whole function, then subtract $f(x)$.", explanation: "The correct numerator is $[3(x+h)+1]-(3x+1)$." },
        { id: "y11adv-id-fp-p15", prompt: "Why does the limit idea use a very small $h$-value?", latex: "\\text{First principles}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "To find the area under the graph" }, { label: "B", text: "To remove the $x$-values" }, { label: "C", text: "To find the average of all gradients" }, { label: "D", text: "To make the secant gradient approach the tangent gradient" }], hint: "Think about the secant becoming a tangent.", explanation: "As $h\\to0$, the secant gradient approaches the tangent gradient." },
        { id: "y11adv-id-fp-p16", prompt: "Use first principles to find the derivative of the linear function. Give the value with its sign.", latex: "f(x)=-6x", answer: "-6", difficulty: 2, acceptedAnswers: ["-6", "−6", "f'(x)=-6"], hint: "The gradient is the coefficient of $x$.", explanation: "The gradient of $-6x$ is $-6$." },
        { id: "y11adv-id-fp-p17", prompt: "Complete the simplified difference quotient.", latex: "\\frac{(x+h)^2-x^2}{h}", answer: "2x+h", difficulty: 2, acceptedAnswers: ["h+2x"], hint: "Cancel the common factor of $h$.", explanation: "$\\frac{2xh+h^2}{h}=2x+h$." },
        { id: "y11adv-id-fp-p18", prompt: "Which statement best interprets the result of a first-principles calculation?", latex: "f'(x)=2x", answer: "B", difficulty: 2, choices: [{ label: "A", text: "It gives only the $y$-intercept" }, { label: "B", text: "It gives the gradient function" }, { label: "C", text: "It gives the area between two curves" }, { label: "D", text: "It gives the midpoint of an interval" }], hint: "The derivative is a function.", explanation: "First principles produces the gradient function $f'(x)$." },
        { id: "y11adv-id-fp-p19", prompt: "Which option identifies the expansion error?", latex: "(x+h)^2=x^2+h^2", answer: "A", difficulty: 3, choices: [{ label: "A", text: "The middle term $2xh$ is missing" }, { label: "B", text: "The denominator should be $x$" }, { label: "C", text: "The limit should be infinity" }, { label: "D", text: "The derivative must be negative" }], hint: "Compare with the binomial expansion.", explanation: "$(x+h)^2=x^2+2xh+h^2$; the $2xh$ term is missing." },
        { id: "y11adv-id-fp-p20", prompt: "After simplifying the difference quotient, find the derivative. Give the value with its sign.", latex: "\\frac{[-2(x+h)+5]-(-2x+5)}{h}", answer: "-2", difficulty: 3, acceptedAnswers: ["-2", "−2", "f'(x)=-2"], hint: "Simplify the numerator and cancel $h$.", explanation: "Numerator is $-2h$, so $\\frac{-2h}{h}=-2$." },
        { id: "y11adv-id-fp-p21", prompt: "For $f(x)=x^2$, the simplified difference quotient is $2x+h$. Use $f'(x)=2x$ to find the gradient at $x=3$.", latex: "f(x)=x^2,\\quad f'(x)=2x", answer: "6", difficulty: 4, acceptedAnswers: ["f'(3)=6", "m=6"], hint: "Substitute $x=3$ into $2x$.", explanation: "$2(3)=6$." },
        { id: "y11adv-id-fp-p22", prompt: "Use first principles for $f(x)=x^2+1$ to find $f'(x)$.", latex: "f(x)=x^2+1", answer: "2x", difficulty: 4, acceptedAnswers: ["f'(x)=2x"], hint: "The constant $1$ cancels in the numerator.", explanation: "$\\frac{(x+h)^2+1-(x^2+1)}{h}=\\frac{2xh+h^2}{h}=2x+h\\to2x$." },
        { id: "y11adv-id-fp-p23", prompt: "Use first principles for $f(x)=2x^2$ to find $f'(x)$.", latex: "f(x)=2x^2", answer: "4x", difficulty: 5, acceptedAnswers: ["f'(x)=4x"], hint: "Factor the $2$ out of the expansion.", explanation: "$\\frac{2(x+h)^2-2x^2}{h}=\\frac{4xh+2h^2}{h}=4x+2h\\to4x$." },
        { id: "y11adv-id-fp-p24", prompt: "For $f(x)=x^2$, the simplified difference quotient at $x=4$ is $8+h$. Find this value when $h=0.1$.", latex: "f(x)=x^2,\\quad\\frac{f(4+h)-f(4)}{h}=8+h", answer: "8.1", difficulty: 4, acceptedAnswers: ["8.1"], hint: "Substitute $h=0.1$ into $8+h$.", explanation: "$8+0.1=8.1$." },
        { id: "y11adv-id-fp-p25", prompt: "Use first principles for $f(x)=3x^2$ to find $f'(x)$.", latex: "f(x)=3x^2", answer: "6x", difficulty: 4, acceptedAnswers: ["f'(x)=6x"], hint: "Factor the $3$ out of the expansion.", explanation: "$\\frac{3(x+h)^2-3x^2}{h}=\\frac{6xh+3h^2}{h}=6x+3h\\to6x$." },
        { id: "y11adv-id-fp-p26", prompt: "Use first principles for $f(x)=x^2-x$ to find $f'(x)$.", latex: "f(x)=x^2-x", answer: "2x-1", difficulty: 5, acceptedAnswers: ["f'(x)=2x-1"], hint: "Expand both terms carefully.", explanation: "$\\frac{[(x+h)^2-(x+h)]-(x^2-x)}{h}=\\frac{2xh+h^2-h}{h}=2x+h-1\\to2x-1$." },
        { id: "y11adv-id-fp-p27", prompt: "Use first principles for $f(x)=x^2$, then evaluate the derivative at $x=-2$. Give the value with its sign.", latex: "f(x)=x^2", answer: "-4", difficulty: 5, acceptedAnswers: ["-4", "−4", "f'(-2)=-4"], hint: "First find $f'(x)=2x$, then substitute.", explanation: "$f'(x)=2x$, so $f'(-2)=2(-2)=-4$." },
        { id: "y11adv-id-fp-p28", prompt: "Use first principles for $f(x)=x^2+3x$ to find $f'(x)$.", latex: "f(x)=x^2+3x", answer: "2x+3", difficulty: 5, acceptedAnswers: ["f'(x)=2x+3"], hint: "Expand the square and the linear term.", explanation: "$\\frac{[(x+h)^2+3(x+h)]-(x^2+3x)}{h}=\\frac{2xh+h^2+3h}{h}=2x+h+3\\to2x+3$." },
        { id: "y11adv-id-fp-p29", prompt: "Use first principles for $f(x)=4x^2$, then find the gradient at $x=1$.", latex: "f(x)=4x^2", answer: "8", difficulty: 5, acceptedAnswers: ["f'(1)=8", "m=8"], hint: "First show $f'(x)=8x$, then substitute $x=1$.", explanation: "$f'(x)=8x$, so $f'(1)=8$." },
        { id: "y11adv-id-fp-p30", prompt: "Use first principles for $f(x)=5x^2$ to find $f'(x)$.", latex: "f(x)=5x^2", answer: "10x", difficulty: 5, acceptedAnswers: ["f'(x)=10x"], hint: "Factor the $5$ out of the expansion.", explanation: "$\\frac{5(x+h)^2-5x^2}{h}=\\frac{10xh+5h^2}{h}=10x+5h\\to10x$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-id-fp-mp1",
          prompt: "Use first principles to differentiate $f(x)=x^2+2x$.",
          latex: "f(x)=x^2+2x",
          answer: "2x+2",
          hint: "Form the difference quotient, expand, cancel $h$, then take the limit.",
          explanation: "(a) $f(x+h)=(x+h)^2+2(x+h)=x^2+2xh+h^2+2x+2h$. (b) The simplified difference quotient is $2x+h+2$. (c) Letting $h\\to0$ gives $f'(x)=2x+2$, so $f'(1)=4$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find $f(x+h)-f(x)$. Enter the simplified numerator.", marks: 2, answer: "2xh+h^2+2h", acceptedAnswers: ["h^2+2xh+2h", "h(2x+h+2)"], hint: "Expand $(x+h)^2+2(x+h)$ and subtract $x^2+2x$.", explanation: "$x^2+2xh+h^2+2x+2h-(x^2+2x)=2xh+h^2+2h$." },
            { key: "b", label: "(b)", prompt: "Divide by $h$ and simplify the difference quotient.", marks: 1, answer: "2x+h+2", acceptedAnswers: ["2x+2+h"], hint: "Cancel the common factor of $h$.", explanation: "$\\frac{2xh+h^2+2h}{h}=2x+h+2$." },
            { key: "c", label: "(c)", prompt: "Take the limit as $h\\to0$ and find $f'(1)$.", marks: 1, answer: "4", acceptedAnswers: ["f'(1)=4"], hint: "$f'(x)=2x+2$; substitute $x=1$.", explanation: "$f'(x)=2x+2$, so $f'(1)=2(1)+2=4$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "differentiating-polynomial-functions") {
    return {
      ...base,
      description:
        "Use derivative notation and the power rule to differentiate polynomial functions and evaluate gradients at points.",
      learningIntention:
        "Learn how to differentiate polynomial functions using the power rule and interpret derivative values as gradients.",
      successCriteria: [
        "Use derivative notation such as $f'(x)$ and $\\frac{dy}{dx}$.",
        "Apply the power rule to polynomial terms.",
        "Differentiate constants correctly.",
        "Differentiate sums and differences term-by-term.",
        "Evaluate a derivative at a given x-value.",
        "Interpret derivative values as gradients or rates of change.",
      ],
      teaching: {
        paragraphs: [
          "A derivative is a gradient function: it tells you the local steepness of the original curve at any x-value. First principles explains where it comes from; rules make the calculation faster.",
          "For a power of x, the power rule brings the old power down as a multiplier and reduces the power by 1. The reduced power reflects how the steepness changes as x changes.",
          "A constant differentiates to zero because a flat constant value has no change and therefore no steepness.",
          "Differentiate a polynomial one term at a time and keep each sign attached to its term. Treat dy/dx and f'(x) as notation for the derivative, not as a fraction to cancel casually.",
          "After finding the derivative function, substitute an x-value to find the tangent gradient at that point. Do not substitute into the original function when the question asks for steepness.",
        ],
        latexBlocks: [
          "\\frac{d}{dx}(ax^n)=anx^{n-1}",
          "\\frac{d}{dx}(c)=0",
          "\\frac{d}{dx}\\left(4x^3-2x+7\\right)=12x^2-2",
          "f'(a)=\\text{gradient at }x=a",
        ],
      },
      workedExamples: [
        {
          title: "Differentiate a polynomial term-by-term",
          questionLatex: "f(x)=3x^4-5x^2+7x-9",
          steps: [
            { explanation: "Apply the power rule to the first term.", latex: "\\frac{d}{dx}(3x^4)=12x^3" },
            { explanation: "Differentiate the remaining variable terms.", latex: "\\frac{d}{dx}(-5x^2)=-10x,\\quad \\frac{d}{dx}(7x)=7" },
            { explanation: "The constant differentiates to zero.", latex: "\\frac{d}{dx}(-9)=0" },
          ],
          finalAnswerLatex: "f'(x)=12x^3-10x+7",
        },
        {
          title: "Evaluate a derivative at a point",
          questionLatex: "f(x)=x^3-4x,\\quad \\text{find }f'(2).",
          steps: [
            { explanation: "Differentiate first.", latex: "f'(x)=3x^2-4" },
            { explanation: "Substitute the x-value into the derivative.", latex: "f'(2)=3(2)^2-4" },
            { explanation: "Calculate the gradient.", latex: "f'(2)=8" },
          ],
          finalAnswerLatex: "8",
        },
        {
          title: "Recognise a constant-term error",
          questionLatex: "y=5x^2+6",
          steps: [
            { explanation: "Differentiate the variable term.", latex: "\\frac{d}{dx}(5x^2)=10x" },
            { explanation: "The constant term becomes zero, not 6.", latex: "\\frac{d}{dx}(6)=0" },
          ],
          finalAnswerLatex: "\\frac{dy}{dx}=10x",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-id-poly-g1", "Differentiate the polynomial function.", "f(x)=4x^3-2x+5", "12x^2-2", ["f'(x)=12x^2-2"]),
        formulaAnswer("y11adv-id-poly-g2", "Evaluate the derivative at the given x-value.", "f'(x)=6x-4,\\quad x=3", "14", ["f'(3)=14"]),
        practicalChoice("y11adv-id-poly-g3", "Which derivative correctly handles the constant term?", "A", ["$6x$", "$6x+5$", "$3x^2+5$", "$3x$"], "The constant 5 differentiates to zero.", "f(x)=3x^2+5"),
        practicalChoice("y11adv-id-poly-g4", "Which statement matches the derivative value?", "C", ["The graph is flat", "The graph is decreasing", "The graph is increasing", "The graph has no gradient"], "A positive derivative value means the graph is increasing at that point.", "f'(2)=7"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-id-poly-i1", "Differentiate the polynomial function.", "y=2x^4-3x^2+x-8", "8x^3-6x+1", ["dy/dx=8x^3-6x+1", "\\frac{dy}{dx}=8x^3-6x+1"]),
        formulaAnswer("y11adv-id-poly-i2", "Evaluate the derivative at the given x-value.", "f(x)=x^3+2x^2,\\quad x=1", "7", ["f'(1)=7"]),
        formulaAnswer("y11adv-id-poly-i3", "Differentiate the function.", "g(x)=-5x^3+4x-2", "-15x^2+4", ["g'(x)=-15x^2+4"]),
        practicalChoice("y11adv-id-poly-i4", "Which derivative shows the common coefficient error?", "D", ["$12x^3$", "$12x^2$", "$3x^4$", "$4x^2$"], "The correct derivative is 12x^2; 4x^2 forgot to multiply by the original power.", "f(x)=4x^3"),
        formulaAnswer("y11adv-id-poly-i5", "Find the gradient of the curve at the given x-value.", "y=x^2-6x+5,\\quad x=4", "2", ["m=2", "gradient 2"]),
      ],
      commonMistakes: [
        { mistake: "Keeping constants in the derivative.", fix: "A constant differentiates to zero." },
        { mistake: "Reducing the power but forgetting to multiply by the original power.", fix: "For $ax^n$, multiply by n and then reduce the power by one." },
        { mistake: "Substituting into the original function instead of the derivative.", fix: "Find $f'(x)$ first, then substitute the x-value." },
        { mistake: "Dropping negative signs.", fix: "Keep each sign attached to its term while differentiating." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-id-poly-m1", "Differentiate the polynomial function.", "f(x)=5x^2-3", "10x", ["f'(x)=10x"]),
        formulaAnswer("y11adv-id-poly-m2", "Differentiate the polynomial function.", "y=x^4-2x", "4x^3-2", ["dy/dx=4x^3-2", "\\frac{dy}{dx}=4x^3-2"]),
        formulaAnswer("y11adv-id-poly-m3", "Evaluate the derivative at the given x-value.", "f'(x)=8x+1,\\quad x=2", "17", ["f'(2)=17"]),
        formulaAnswer("y11adv-id-poly-m4", "Differentiate the function term-by-term.", "g(x)=3x^5-4x^3+9", "15x^4-12x^2", ["g'(x)=15x^4-12x^2"]),
        formulaAnswer("y11adv-id-poly-m5", "Find the gradient of the curve at the given point.", "y=x^3-3x,\\quad x=2", "9", ["m=9"]),
        practicalChoice("y11adv-id-poly-m6", "Which derivative is correct?", "B", ["$6x^3-4x+7$", "$6x^2-4$", "$2x^3-4$", "$6x^2-4x$"], "Differentiate term-by-term and drop the constant.", "f(x)=2x^3-4x+7"),
        practicalChoice("y11adv-id-poly-m7", "Which option identifies the mistake in the displayed derivative?", "C", ["The power should increase", "The constant should stay as 5", "The coefficient was not multiplied by the original power", "The derivative should be negative"], "The derivative of 7x^4 is 28x^3.", "\\frac{d}{dx}(7x^4)=7x^3"),
        practicalChoice("y11adv-id-poly-m8", "A derivative value is zero at a point. What does that tell you about the tangent there?", "A", ["It is horizontal", "It is vertical", "It must cross the y-axis", "It has gradient one"], "A zero derivative means a horizontal tangent.", "f'(a)=0"),
        formulaAnswer("y11adv-id-poly-m9", "Find the x-value where the tangent is horizontal.", "f(x)=x^2-6x+4", "3", ["x=3"]),
        formulaAnswer("y11adv-id-poly-m10", "Find the derivative value, then interpret its sign as a gradient.", "s(t)=2t^3-9t,\\quad t=2", "15", ["s'(2)=15", "15 positive"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-id-poly-p1", prompt: "Differentiate the polynomial function.", latex: "f(x)=4x^2", answer: "8x", difficulty: 1, acceptedAnswers: ["f'(x)=8x"], hint: "Bring the power down and reduce it by one.", explanation: "$\\frac{d}{dx}(4x^2)=8x$." },
        { id: "y11adv-id-poly-p2", prompt: "Differentiate the polynomial function.", latex: "f(x)=x^3", answer: "3x^2", difficulty: 1, acceptedAnswers: ["f'(x)=3x^2"], hint: "Power rule: multiply by the power, reduce by one.", explanation: "$\\frac{d}{dx}(x^3)=3x^2$." },
        { id: "y11adv-id-poly-p3", prompt: "Differentiate the polynomial function.", latex: "f(x)=6x-5", answer: "6", difficulty: 1, acceptedAnswers: ["f'(x)=6"], hint: "The constant differentiates to zero.", explanation: "$\\frac{d}{dx}(6x-5)=6$." },
        { id: "y11adv-id-poly-p4", prompt: "Differentiate the polynomial function.", latex: "f(x)=5x^2-3", answer: "10x", difficulty: 1, acceptedAnswers: ["f'(x)=10x"], hint: "Differentiate term by term; the constant vanishes.", explanation: "$\\frac{d}{dx}(5x^2-3)=10x$." },
        { id: "y11adv-id-poly-p5", prompt: "Which derivative correctly handles the constant term?", latex: "f(x)=3x^2+5", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$6x$" }, { label: "B", text: "$6x+5$" }, { label: "C", text: "$3x^2+5$" }, { label: "D", text: "$3x$" }], hint: "The constant differentiates to zero.", explanation: "$\\frac{d}{dx}(3x^2+5)=6x$." },
        { id: "y11adv-id-poly-p6", prompt: "Differentiate the polynomial function.", latex: "f(x)=4x^3-2x+5", answer: "12x^2-2", difficulty: 2, acceptedAnswers: ["f'(x)=12x^2-2"], hint: "Differentiate each term.", explanation: "$\\frac{d}{dx}(4x^3-2x+5)=12x^2-2$." },
        { id: "y11adv-id-poly-p7", prompt: "Differentiate the polynomial function.", latex: "y=x^4-2x", answer: "4x^3-2", difficulty: 2, acceptedAnswers: ["dy/dx=4x^3-2", "\\frac{dy}{dx}=4x^3-2"], hint: "Power rule term by term.", explanation: "$\\frac{dy}{dx}=4x^3-2$." },
        { id: "y11adv-id-poly-p8", prompt: "Differentiate the function. Give the value with its sign.", latex: "g(x)=-5x^3+4x-2", answer: "-15x^2+4", difficulty: 2, acceptedAnswers: ["g'(x)=-15x^2+4"], hint: "Keep each sign with its term.", explanation: "$\\frac{d}{dx}(-5x^3+4x-2)=-15x^2+4$." },
        { id: "y11adv-id-poly-p9", prompt: "Evaluate the derivative at the given $x$-value.", latex: "f'(x)=6x-4,\\quad x=3", answer: "14", difficulty: 2, acceptedAnswers: ["f'(3)=14"], hint: "Substitute $x=3$.", explanation: "$6(3)-4=18-4=14$." },
        { id: "y11adv-id-poly-p10", prompt: "Which derivative shows the common coefficient error?", latex: "f(x)=4x^3", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$12x^3$" }, { label: "B", text: "$12x^2$" }, { label: "C", text: "$3x^4$" }, { label: "D", text: "$4x^2$" }], hint: "Correct derivative is $12x^2$.", explanation: "$4x^2$ forgot to multiply by the original power; the correct derivative is $12x^2$." },
        { id: "y11adv-id-poly-p11", prompt: "Differentiate the function term by term.", latex: "g(x)=3x^5-4x^3+9", answer: "15x^4-12x^2", difficulty: 3, acceptedAnswers: ["g'(x)=15x^4-12x^2"], hint: "Apply the power rule to each term.", explanation: "$\\frac{d}{dx}(3x^5-4x^3+9)=15x^4-12x^2$." },
        { id: "y11adv-id-poly-p12", prompt: "Evaluate the derivative at the given $x$-value.", latex: "f(x)=x^3+2x^2,\\quad x=1", answer: "7", difficulty: 3, acceptedAnswers: ["f'(1)=7"], hint: "Differentiate first, then substitute.", explanation: "$f'(x)=3x^2+4x$, so $f'(1)=3+4=7$." },
        { id: "y11adv-id-poly-p13", prompt: "Find the gradient of the curve at the given $x$-value.", latex: "y=x^2-6x+5,\\quad x=4", answer: "2", difficulty: 3, acceptedAnswers: ["m=2", "gradient 2"], hint: "Differentiate, then substitute $x=4$.", explanation: "$\\frac{dy}{dx}=2x-6$, so at $x=4$ it is $8-6=2$." },
        { id: "y11adv-id-poly-p14", prompt: "Which option identifies the mistake in the displayed derivative?", latex: "\\frac{d}{dx}(7x^4)=7x^3", answer: "C", difficulty: 3, choices: [{ label: "A", text: "The power should increase" }, { label: "B", text: "The constant should stay as 5" }, { label: "C", text: "The coefficient was not multiplied by the original power" }, { label: "D", text: "The derivative should be negative" }], hint: "Apply the power rule fully.", explanation: "$\\frac{d}{dx}(7x^4)=28x^3$; the coefficient must be multiplied by 4." },
        { id: "y11adv-id-poly-p15", prompt: "Find the $x$-value where the tangent is horizontal.", latex: "f(x)=x^2-6x+4", answer: "3", difficulty: 3, acceptedAnswers: ["x=3"], hint: "Set $f'(x)=0$.", explanation: "$f'(x)=2x-6=0$ gives $x=3$." },
        { id: "y11adv-id-poly-p16", prompt: "Differentiate the polynomial function.", latex: "y=2x^4-3x^2+x-8", answer: "8x^3-6x+1", difficulty: 2, acceptedAnswers: ["dy/dx=8x^3-6x+1", "\\frac{dy}{dx}=8x^3-6x+1"], hint: "Differentiate each term.", explanation: "$\\frac{dy}{dx}=8x^3-6x+1$." },
        { id: "y11adv-id-poly-p17", prompt: "Evaluate the derivative at the given $x$-value.", latex: "f'(x)=8x+1,\\quad x=2", answer: "17", difficulty: 2, acceptedAnswers: ["f'(2)=17"], hint: "Substitute $x=2$.", explanation: "$8(2)+1=17$." },
        { id: "y11adv-id-poly-p18", prompt: "Find the gradient of the curve at the given point.", latex: "y=x^3-3x,\\quad x=2", answer: "9", difficulty: 3, acceptedAnswers: ["m=9"], hint: "Differentiate, then substitute.", explanation: "$\\frac{dy}{dx}=3x^2-3$, so at $x=2$ it is $12-3=9$." },
        { id: "y11adv-id-poly-p19", prompt: "A derivative value is zero at a point. What does that tell you about the tangent there?", latex: "f'(a)=0", answer: "A", difficulty: 2, choices: [{ label: "A", text: "It is horizontal" }, { label: "B", text: "It is vertical" }, { label: "C", text: "It must cross the $y$-axis" }, { label: "D", text: "It has gradient one" }], hint: "Zero gradient means flat.", explanation: "A zero derivative means a horizontal tangent." },
        { id: "y11adv-id-poly-p20", prompt: "Differentiate the polynomial function.", latex: "f(x)=2x^3-4x+7", answer: "6x^2-4", difficulty: 2, acceptedAnswers: ["f'(x)=6x^2-4"], hint: "Differentiate term by term and drop the constant.", explanation: "$\\frac{d}{dx}(2x^3-4x+7)=6x^2-4$." },
        { id: "y11adv-id-poly-p21", prompt: "Evaluate the derivative at the given $x$-value.", latex: "f(x)=x^3-4x,\\quad x=2", answer: "8", difficulty: 4, acceptedAnswers: ["f'(2)=8"], hint: "Differentiate first, then substitute.", explanation: "$f'(x)=3x^2-4$, so $f'(2)=12-4=8$." },
        { id: "y11adv-id-poly-p22", prompt: "Find the gradient of the curve at the given $x$-value. Give the value with its sign.", latex: "y=x^3-12x,\\quad x=1", answer: "-9", difficulty: 4, acceptedAnswers: ["-9", "−9", "m=-9"], hint: "Differentiate, then substitute $x=1$.", explanation: "$\\frac{dy}{dx}=3x^2-12$, so at $x=1$ it is $3-12=-9$." },
        { id: "y11adv-id-poly-p23", prompt: "Find both $x$-values where the tangent is horizontal. Give answers in ascending order, separated by a comma.", latex: "f(x)=x^3-3x", answer: "-1, 1", difficulty: 5, acceptedAnswers: ["x=-1,1", "-1 and 1", "x = -1, 1"], hint: "Set $f'(x)=0$.", explanation: "$f'(x)=3x^2-3=0$ gives $x=\\pm1$." },
        { id: "y11adv-id-poly-p24", prompt: "Find the derivative value $s'(2)$.", latex: "s(t)=2t^3-9t,\\quad t=2", answer: "15", difficulty: 4, acceptedAnswers: ["s'(2)=15"], hint: "Differentiate, then substitute $t=2$.", explanation: "$s'(t)=6t^2-9$, so $s'(2)=24-9=15$." },
        { id: "y11adv-id-poly-p25", prompt: "Evaluate the derivative at the given $x$-value.", latex: "f(x)=2x^4-x^2,\\quad x=1", answer: "6", difficulty: 4, acceptedAnswers: ["f'(1)=6"], hint: "Differentiate first.", explanation: "$f'(x)=8x^3-2x$, so $f'(1)=8-2=6$." },
        { id: "y11adv-id-poly-p26", prompt: "Find the positive $x$-value where the curve has gradient 0.", latex: "f(x)=x^3-27x", answer: "3", difficulty: 5, acceptedAnswers: ["x=3"], hint: "Set $f'(x)=0$ and take the positive solution.", explanation: "$f'(x)=3x^2-27=0$ gives $x^2=9$, so $x=3$." },
        { id: "y11adv-id-poly-p27", prompt: "Find the $x$-value where the curve $y=x^2-8x+1$ has the same gradient as the line $y=2x$.", latex: "y=x^2-8x+1", answer: "5", difficulty: 5, acceptedAnswers: ["x=5"], hint: "Set $\\frac{dy}{dx}=2$.", explanation: "$\\frac{dy}{dx}=2x-8=2$ gives $2x=10$, so $x=5$." },
        { id: "y11adv-id-poly-p28", prompt: "The curve $y=x^3-6x^2+9x$ has horizontal tangents at two $x$-values. Find the larger one.", latex: "y=x^3-6x^2+9x", answer: "3", difficulty: 5, acceptedAnswers: ["x=3"], hint: "Solve $\\frac{dy}{dx}=0$.", explanation: "$\\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)=0$ gives $x=1,3$; larger is $3$." },
        { id: "y11adv-id-poly-p29", prompt: "Find the value of $a$ if $f(x)=ax^2-4x$ has gradient 6 at $x=1$.", latex: "f(x)=ax^2-4x,\\quad f'(1)=6", answer: "5", difficulty: 5, acceptedAnswers: ["a=5"], hint: "$f'(x)=2ax-4$; set $f'(1)=6$.", explanation: "$2a-4=6$ gives $2a=10$, so $a=5$." },
        { id: "y11adv-id-poly-p30", prompt: "Differentiate, then evaluate the gradient of $y=x^3-3x^2+2$ at $x=3$.", latex: "y=x^3-3x^2+2,\\quad x=3", answer: "9", difficulty: 5, acceptedAnswers: ["m=9"], hint: "Differentiate, then substitute $x=3$.", explanation: "$\\frac{dy}{dx}=3x^2-6x$, so at $x=3$ it is $27-18=9$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-id-poly-mp1",
          prompt: "Consider the curve $f(x)=x^3-3x^2$.",
          latex: "f(x)=x^3-3x^2",
          answer: "3x^2-6x",
          hint: "Differentiate, then substitute the required $x$-values; solve $f'(x)=0$ for the horizontal tangent.",
          explanation: "(a) $f'(x)=3x^2-6x$. (b) $f'(1)=3-6=-3$. (c) $f'(x)=3x(x-2)=0$ gives $x=0$ or $x=2$; the positive value is $2$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find $f'(x)$.", marks: 1, answer: "3x^2-6x", acceptedAnswers: ["f'(x)=3x^2-6x"], hint: "Differentiate term by term.", explanation: "$\\frac{d}{dx}(x^3-3x^2)=3x^2-6x$." },
            { key: "b", label: "(b)", prompt: "Find the gradient of the curve at $x=1$. Give the value with its sign.", marks: 2, answer: "-3", acceptedAnswers: ["-3", "−3", "f'(1)=-3"], hint: "Substitute $x=1$ into $f'(x)$.", explanation: "$f'(1)=3(1)^2-6(1)=3-6=-3$." },
            { key: "c", label: "(c)", prompt: "Find the positive $x$-value where the tangent is horizontal.", marks: 1, answer: "2", acceptedAnswers: ["x=2"], hint: "Set $f'(x)=0$ and factorise.", explanation: "$3x^2-6x=3x(x-2)=0$ gives $x=0$ or $x=2$; the positive value is $2$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "tangents-normals-applications") {
    return {
      ...base,
      description:
        "Use derivatives to find tangent and normal gradients, then form equations of tangents and normals at points on curves.",
      learningIntention:
        "Learn how derivatives give tangent gradients and how normal gradients are used to form equations of tangents and normals.",
      successCriteria: [
        "Find the tangent gradient using the derivative.",
        "Find the point on the curve for a given x-value.",
        "Use point-gradient form to write a tangent equation.",
        "Find a normal gradient using the negative reciprocal.",
        "Write a normal equation through the same point.",
        "Interpret tangent and normal gradients in context.",
      ],
      teaching: {
        paragraphs: [
          "A tangent is the straight line that matches the curve's local behaviour at one point. Its gradient is the curve's instantaneous rate of change there.",
          "Use the derivative for the tangent gradient, but use the original function for the point's y-value. These are different jobs, and mixing them up is a common source of errors.",
          "A normal is perpendicular to the tangent. Its gradient is the negative reciprocal of the tangent gradient, provided the tangent gradient is not zero.",
          "Use point-gradient form to build the tangent or normal equation from a gradient and point.",
          "Near the point of contact, the tangent gives a useful straight-line approximation because it shares the curve's local direction.",
        ],
        latexBlocks: [
          "m_{\\text{tangent}}=f'(a)",
          "m_{\\text{normal}}=-\\frac{1}{m_{\\text{tangent}}}",
          "y-y_1=m(x-x_1)",
          "\\text{point on curve}=(a,f(a))",
        ],
      },
      workedExamples: [
        {
          title: "Find the tangent gradient",
          questionLatex: "y=x^2+3x,\\quad x=2",
          steps: [
            { explanation: "Differentiate the curve.", latex: "\\frac{dy}{dx}=2x+3" },
            { explanation: "Substitute the x-value.", latex: "m=2(2)+3=7" },
          ],
          finalAnswerLatex: "m_{\\text{tangent}}=7",
        },
        {
          title: "Find a tangent equation",
          questionLatex: "y=x^2-1,\\quad x=2",
          steps: [
            { explanation: "Find the point on the curve.", latex: "y=2^2-1=3\\Rightarrow (2,3)" },
            { explanation: "Find the tangent gradient.", latex: "\\frac{dy}{dx}=2x,\\quad m=4" },
            { explanation: "Use point-gradient form.", latex: "y-3=4(x-2)" },
          ],
          finalAnswerLatex: "y=4x-5",
        },
        {
          title: "Find a normal equation",
          questionLatex: "y=x^2-1,\\quad x=2",
          steps: [
            { explanation: "The tangent gradient is 4 from the previous calculation.", latex: "m_{\\text{tangent}}=4" },
            { explanation: "Use the negative reciprocal for the normal gradient.", latex: "m_{\\text{normal}}=-\\frac{1}{4}" },
            { explanation: "Use the same point on the curve.", latex: "y-3=-\\frac{1}{4}(x-2)" },
          ],
          finalAnswerLatex: "y-3=-\\frac{1}{4}(x-2)",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-id-tn-g1", "Find the tangent gradient at the given x-value.", "y=x^2+1,\\quad x=3", "6", ["m=6"]),
        formulaAnswer("y11adv-id-tn-g2", "Find the point on the curve at the given x-value.", "y=x^2-7,\\quad x=2", "(2,-3)", ["(2, -3)", "2,-3", "2, -3", "(2 , -3)"]),
        formulaAnswer("y11adv-id-tn-g3", "Find the normal gradient for the given tangent gradient.", "m_{\\text{tangent}}=4", "-1/4", ["-0.25"]),
        practicalChoice("y11adv-id-tn-g4", "Which equation is the tangent through the displayed point with the displayed gradient?", "A", ["$y-3=5(x-2)$", "$y+3=5(x-2)$", "$y-3=-\\frac{1}{5}(x-2)$", "$y=5x+2$"], "Use point-gradient form with the given point and gradient.", "(2,3),\\quad m=5"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-id-tn-i1", "Find the tangent gradient at the given x-value.", "y=2x^2-3x,\\quad x=1", "1", ["m=1"]),
        formulaAnswer("y11adv-id-tn-i2", "Find the tangent equation at the given point. Give your answer in the form $y=mx+c$.", "y=x^2,\\quad (2,4)", "y=4x-4", ["y = 4x - 4"]),
        formulaAnswer("y11adv-id-tn-i3", "Find the normal gradient at the given point.", "y=x^2,\\quad x=2", "-1/4", ["-0.25"]),
        formulaAnswer("y11adv-id-tn-i4", "Find the normal equation at the given point. Give your answer in the form $y=mx+c$.", "y=x^2,\\quad (2,4)", "y=-1/4x+9/2", ["y = -1/4x + 9/2"]),
        practicalChoice("y11adv-id-tn-i5", "Which statement correctly compares the tangent and normal?", "C", ["They always have the same gradient", "The normal gradient is the reciprocal", "Their gradients multiply to -1", "The tangent is always horizontal"], "Perpendicular non-zero gradients multiply to -1.", "m_{\\text{tangent}}\\ne0"),
      ],
      commonMistakes: [
        { mistake: "Using the original function value as the gradient.", fix: "Differentiate first; the derivative gives the tangent gradient." },
        { mistake: "Using a point not on the curve.", fix: "Substitute the x-value into the original function to find the point." },
        { mistake: "Using the reciprocal instead of the negative reciprocal for the normal.", fix: "The normal gradient is $-\\frac{1}{m}$." },
        { mistake: "Mixing up the tangent and normal equations.", fix: "Use the tangent gradient for the tangent and the normal gradient for the normal." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-id-tn-m1", "Find the tangent gradient at the given x-value.", "y=x^2+2x,\\quad x=1", "4", ["m=4"]),
        formulaAnswer("y11adv-id-tn-m2", "Find the point on the curve at the given x-value.", "y=x^2-7,\\quad x=2", "(2,-3)", ["(2, -3)", "2,-3", "2, -3", "(2 , -3)"]),
        formulaAnswer("y11adv-id-tn-m3", "Find the normal gradient for the given tangent gradient. Give the exact fraction.", "m_{\\text{tangent}}=-3", "1/3"),
        formulaAnswer("y11adv-id-tn-m4", "Find the tangent equation at the given point. Give your answer in the form $y=mx+c$.", "y=x^2+1,\\quad (2,5)", "y=4x-3", ["y = 4x - 3"]),
        formulaAnswer("y11adv-id-tn-m5", "Find the normal equation at the given point. Give your answer in the form $y=mx+c$.", "y=x^2+1,\\quad (2,5)", "y=-1/4x+11/2", ["y = -1/4x + 11/2"]),
        practicalChoice("y11adv-id-tn-m6", "Which equation uses the correct tangent gradient and point-gradient form?", "C", ["$y-4=2(x-2)$", "$y-2=4(x-4)$", "$y-4=4(x-2)$", "$y=4x+4$"], "The tangent gradient is 4 and the point is (2,4), so use y - 4 = 4(x - 2).", "y=x^2,\\quad (2,4),\\quad m=4"),
        practicalChoice("y11adv-id-tn-m7", "A student uses the y-value as the tangent gradient. Which option identifies the error?", "A", ["The derivative must be used for the gradient", "The point should be reflected", "The normal gradient equals the y-value", "The x-value must be zero"], "The tangent gradient comes from the derivative, not directly from the y-coordinate.", "y=x^2,\\quad (3,9)"),
        practicalChoice("y11adv-id-tn-m8", "Which statement is correct when the tangent gradient is zero?", "D", ["The normal gradient is also zero", "The tangent equation is impossible", "The tangent is vertical", "The tangent is horizontal"], "A zero tangent gradient gives a horizontal tangent.", "m_{\\text{tangent}}=0"),
        formulaAnswer("y11adv-id-tn-m9", "Find the tangent equation at the point on the curve. Give your answer in the form $y=mx+c$.", "y=x^2-2x,\\quad x=3", "y=4x-9", ["y = 4x - 9"]),
        formulaAnswer("y11adv-id-tn-m10", "Find the normal gradient at the point where the tangent gradient is shown.", "m_{\\text{tangent}}=\\frac{1}{2}", "-2", ["m=-2", "normal gradient -2"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-id-tn-p1", prompt: "Find the tangent gradient at the given $x$-value.", latex: "y=x^2+1,\\quad x=3", answer: "6", difficulty: 1, acceptedAnswers: ["m=6"], hint: "Differentiate, then substitute.", explanation: "$\\frac{dy}{dx}=2x$, so at $x=3$ it is $6$." },
        { id: "y11adv-id-tn-p2", prompt: "Find the tangent gradient at the given $x$-value.", latex: "y=x^2+2x,\\quad x=1", answer: "4", difficulty: 1, acceptedAnswers: ["m=4"], hint: "Differentiate, then substitute $x=1$.", explanation: "$\\frac{dy}{dx}=2x+2$, so at $x=1$ it is $4$." },
        { id: "y11adv-id-tn-p3", prompt: "Find the point on the curve at the given $x$-value.", latex: "y=x^2-7,\\quad x=2", answer: "(2,-3)", difficulty: 1, acceptedAnswers: ["(2, -3)", "2,-3", "2, -3"], hint: "Substitute $x=2$ into the original function.", explanation: "$y=2^2-7=-3$, so the point is $(2,-3)$." },
        { id: "y11adv-id-tn-p4", prompt: "Find the normal gradient for the given tangent gradient. Give the exact fraction.", latex: "m_{\\text{tangent}}=4", answer: "-1/4", difficulty: 1, acceptedAnswers: ["-0.25", "−1/4"], hint: "Use the negative reciprocal.", explanation: "$m_{\\text{normal}}=-\\frac{1}{4}$." },
        { id: "y11adv-id-tn-p5", prompt: "Find the normal gradient for the given tangent gradient. Give the exact fraction.", latex: "m_{\\text{tangent}}=2", answer: "-1/2", difficulty: 1, acceptedAnswers: ["-0.5", "−1/2"], hint: "Negative reciprocal.", explanation: "$m_{\\text{normal}}=-\\frac{1}{2}$." },
        { id: "y11adv-id-tn-p6", prompt: "Find the tangent gradient at the given $x$-value.", latex: "y=2x^2-3x,\\quad x=1", answer: "1", difficulty: 2, acceptedAnswers: ["m=1"], hint: "Differentiate, then substitute.", explanation: "$\\frac{dy}{dx}=4x-3$, so at $x=1$ it is $1$." },
        { id: "y11adv-id-tn-p7", prompt: "Find the point on the curve at the given $x$-value.", latex: "y=x^2-2x,\\quad x=3", answer: "(3,3)", difficulty: 2, acceptedAnswers: ["(3, 3)", "3,3", "3, 3"], hint: "Substitute $x=3$.", explanation: "$y=9-6=3$, so the point is $(3,3)$." },
        { id: "y11adv-id-tn-p8", prompt: "Find the normal gradient for the given tangent gradient. Give the exact fraction.", latex: "m_{\\text{tangent}}=-3", answer: "1/3", difficulty: 2, acceptedAnswers: ["0.333...", "1/3"], hint: "Negative reciprocal of a negative gradient is positive.", explanation: "$m_{\\text{normal}}=-\\frac{1}{-3}=\\frac{1}{3}$." },
        { id: "y11adv-id-tn-p9", prompt: "Find the tangent gradient at the given $x$-value. Give the value with its sign.", latex: "y=x^2-6x,\\quad x=1", answer: "-4", difficulty: 2, acceptedAnswers: ["-4", "−4", "m=-4"], hint: "Differentiate, then substitute $x=1$.", explanation: "$\\frac{dy}{dx}=2x-6$, so at $x=1$ it is $-4$." },
        { id: "y11adv-id-tn-p10", prompt: "Which statement correctly compares the tangent and normal?", latex: "m_{\\text{tangent}}\\ne0", answer: "C", difficulty: 2, choices: [{ label: "A", text: "They always have the same gradient" }, { label: "B", text: "The normal gradient is the reciprocal" }, { label: "C", text: "Their gradients multiply to $-1$" }, { label: "D", text: "The tangent is always horizontal" }], hint: "Perpendicular lines have gradients multiplying to $-1$.", explanation: "For perpendicular non-zero gradients, the product is $-1$." },
        { id: "y11adv-id-tn-p11", prompt: "Find the tangent equation at the given point. Give your answer in the form $y=mx+c$.", latex: "y=x^2,\\quad (2,4)", answer: "y=4x-4", difficulty: 3, acceptedAnswers: ["y = 4x - 4"], hint: "Gradient is $4$; use point-gradient form.", explanation: "$\\frac{dy}{dx}=2x=4$ at $x=2$; $y-4=4(x-2)$ gives $y=4x-4$." },
        { id: "y11adv-id-tn-p12", prompt: "Find the tangent equation at the given point. Give your answer in the form $y=mx+c$.", latex: "y=x^2+1,\\quad (2,5)", answer: "y=4x-3", difficulty: 3, acceptedAnswers: ["y = 4x - 3"], hint: "Gradient is $4$; use the point $(2,5)$.", explanation: "$y-5=4(x-2)$ gives $y=4x-3$." },
        { id: "y11adv-id-tn-p13", prompt: "Find the tangent equation at the point on the curve. Give your answer in the form $y=mx+c$.", latex: "y=x^2-2x,\\quad x=3", answer: "y=4x-9", difficulty: 3, acceptedAnswers: ["y = 4x - 9"], hint: "Find the point $(3,3)$ and gradient $4$.", explanation: "$\\frac{dy}{dx}=2x-2=4$; $y-3=4(x-3)$ gives $y=4x-9$." },
        { id: "y11adv-id-tn-p14", prompt: "Which equation uses the correct tangent gradient and point-gradient form?", latex: "y=x^2,\\quad (2,4),\\quad m=4", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$y-4=2(x-2)$" }, { label: "B", text: "$y-2=4(x-4)$" }, { label: "C", text: "$y-4=4(x-2)$" }, { label: "D", text: "$y=4x+4$" }], hint: "Use $y-y_1=m(x-x_1)$ with $(2,4)$ and $m=4$.", explanation: "$y-4=4(x-2)$ is correct." },
        { id: "y11adv-id-tn-p15", prompt: "A student uses the $y$-value as the tangent gradient. Which option identifies the error?", latex: "y=x^2,\\quad (3,9)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "The derivative must be used for the gradient" }, { label: "B", text: "The point should be reflected" }, { label: "C", text: "The normal gradient equals the $y$-value" }, { label: "D", text: "The $x$-value must be zero" }], hint: "Gradient comes from $f'(x)$.", explanation: "The tangent gradient is $f'(3)=6$, not the $y$-coordinate $9$." },
        { id: "y11adv-id-tn-p16", prompt: "Find the normal gradient for the given tangent gradient. Give the exact fraction.", latex: "m_{\\text{tangent}}=5", answer: "-1/5", difficulty: 2, acceptedAnswers: ["-0.2", "−1/5"], hint: "Negative reciprocal.", explanation: "$m_{\\text{normal}}=-\\frac{1}{5}$." },
        { id: "y11adv-id-tn-p17", prompt: "Find the normal gradient at the point where the tangent gradient is shown. Give the value with its sign.", latex: "m_{\\text{tangent}}=\\frac{1}{2}", answer: "-2", difficulty: 3, acceptedAnswers: ["-2", "−2", "m=-2"], hint: "Negative reciprocal of $\\frac{1}{2}$.", explanation: "$m_{\\text{normal}}=-\\frac{1}{1/2}=-2$." },
        { id: "y11adv-id-tn-p18", prompt: "Which statement is correct when the tangent gradient is zero?", latex: "m_{\\text{tangent}}=0", answer: "D", difficulty: 2, choices: [{ label: "A", text: "The normal gradient is also zero" }, { label: "B", text: "The tangent equation is impossible" }, { label: "C", text: "The tangent is vertical" }, { label: "D", text: "The tangent is horizontal" }], hint: "Zero gradient means flat.", explanation: "A zero tangent gradient gives a horizontal tangent." },
        { id: "y11adv-id-tn-p19", prompt: "Find the point on the curve at the given $x$-value.", latex: "y=x^2+3x,\\quad x=2", answer: "(2,10)", difficulty: 2, acceptedAnswers: ["(2, 10)", "2,10", "2, 10"], hint: "Substitute $x=2$.", explanation: "$y=4+6=10$, so the point is $(2,10)$." },
        { id: "y11adv-id-tn-p20", prompt: "Find the tangent gradient at the given $x$-value.", latex: "y=x^2+3x,\\quad x=2", answer: "7", difficulty: 2, acceptedAnswers: ["m=7"], hint: "Differentiate, then substitute.", explanation: "$\\frac{dy}{dx}=2x+3$, so at $x=2$ it is $7$." },
        { id: "y11adv-id-tn-p21", prompt: "Find the tangent equation at the given point. Give your answer in the form $y=mx+c$.", latex: "y=x^2-1,\\quad (3,8)", answer: "y=6x-10", difficulty: 4, acceptedAnswers: ["y = 6x - 10"], hint: "Gradient is $6$ at $x=3$.", explanation: "$\\frac{dy}{dx}=2x=6$; $y-8=6(x-3)$ gives $y=6x-10$." },
        { id: "y11adv-id-tn-p22", prompt: "Find the normal equation at the given point. Give your answer in the form $y=mx+c$.", latex: "y=x^2,\\quad (2,4)", answer: "y=-1/4x+9/2", difficulty: 4, acceptedAnswers: ["y = -1/4x + 9/2", "y=-0.25x+4.5"], hint: "Normal gradient is $-\\frac14$ through $(2,4)$.", explanation: "$y-4=-\\frac14(x-2)$ gives $y=-\\frac14 x+\\frac92$." },
        { id: "y11adv-id-tn-p23", prompt: "Find the $y$-intercept of the tangent to $y=x^2$ at $(2,4)$. Give the value with its sign.", latex: "y=x^2,\\quad (2,4)", answer: "-4", difficulty: 5, acceptedAnswers: ["-4", "−4", "(0,-4)", "c=-4"], hint: "Find the tangent $y=4x-4$, then set $x=0$.", explanation: "The tangent is $y=4x-4$; at $x=0$, $y=-4$." },
        { id: "y11adv-id-tn-p24", prompt: "Find the tangent equation at the point where $x=1$. Give your answer in the form $y=mx+c$.", latex: "y=x^2+2x,\\quad x=1", answer: "y=4x-1", difficulty: 4, acceptedAnswers: ["y = 4x - 1"], hint: "Point is $(1,3)$ and gradient is $4$.", explanation: "$\\frac{dy}{dx}=2x+2=4$; $y-3=4(x-1)$ gives $y=4x-1$." },
        { id: "y11adv-id-tn-p25", prompt: "Find the normal equation at the given point. Give your answer in the form $y=mx+c$.", latex: "y=x^2+1,\\quad (2,5)", answer: "y=-1/4x+11/2", difficulty: 4, acceptedAnswers: ["y = -1/4x + 11/2", "y=-0.25x+5.5"], hint: "Normal gradient is $-\\frac14$ through $(2,5)$.", explanation: "$y-5=-\\frac14(x-2)$ gives $y=-\\frac14 x+\\frac{11}{2}$." },
        { id: "y11adv-id-tn-p26", prompt: "Find the $x$-intercept of the tangent to $y=x^2-3$ at $(2,1)$. Give the exact fraction.", latex: "y=x^2-3,\\quad (2,1)", answer: "7/4", difficulty: 5, acceptedAnswers: ["7/4", "1.75"], hint: "Find the tangent $y=4x-7$, then set $y=0$.", explanation: "Gradient is $4$; $y-1=4(x-2)$ gives $y=4x-7$. Setting $y=0$: $x=\\frac74$." },
        { id: "y11adv-id-tn-p27", prompt: "The tangent to $y=x^2$ at $x=a$ has gradient $10$. Find $a$.", latex: "y=x^2,\\quad m=10", answer: "5", difficulty: 5, acceptedAnswers: ["a=5"], hint: "Set $2a=10$.", explanation: "$\\frac{dy}{dx}=2x=10$ gives $x=5$." },
        { id: "y11adv-id-tn-p28", prompt: "Find the $y$-intercept of the normal to $y=x^2$ at $(2,4)$. Give the exact fraction.", latex: "y=x^2,\\quad (2,4)", answer: "9/2", difficulty: 5, acceptedAnswers: ["9/2", "4.5", "(0,9/2)"], hint: "Normal is $y=-\\frac14 x+\\frac92$; set $x=0$.", explanation: "At $x=0$, $y=\\frac92$." },
        { id: "y11adv-id-tn-p29", prompt: "The tangent to $y=x^2-4x$ is horizontal at one point. Find its $x$-value.", latex: "y=x^2-4x", answer: "2", difficulty: 5, acceptedAnswers: ["x=2"], hint: "Set $\\frac{dy}{dx}=0$.", explanation: "$\\frac{dy}{dx}=2x-4=0$ gives $x=2$." },
        { id: "y11adv-id-tn-p30", prompt: "Find the tangent equation to $y=x^3$ at the point $(1,1)$. Give your answer in the form $y=mx+c$.", latex: "y=x^3,\\quad (1,1)", answer: "y=3x-2", difficulty: 5, acceptedAnswers: ["y = 3x - 2"], hint: "Gradient is $3x^2=3$ at $x=1$.", explanation: "$\\frac{dy}{dx}=3x^2=3$; $y-1=3(x-1)$ gives $y=3x-2$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-id-tn-mp1",
          prompt: "Consider the curve $y=x^2$ at the point where $x=3$.",
          latex: "y=x^2,\\quad x=3",
          answer: "(3,9)",
          hint: "Find the point, then the tangent gradient, then the tangent's $y$-intercept.",
          explanation: "(a) The point is $(3,9)$. (b) $\\frac{dy}{dx}=2x=6$ at $x=3$. (c) The tangent is $y-9=6(x-3)$, i.e. $y=6x-9$, so the $y$-intercept is $-9$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the $y$-coordinate of the point on the curve.", marks: 1, answer: "9", acceptedAnswers: ["y=9", "(3,9)"], hint: "Substitute $x=3$ into $y=x^2$.", explanation: "$y=3^2=9$." },
            { key: "b", label: "(b)", prompt: "Find the tangent gradient at this point.", marks: 1, answer: "6", acceptedAnswers: ["m=6"], hint: "Differentiate and substitute $x=3$.", explanation: "$\\frac{dy}{dx}=2x=6$ at $x=3$." },
            { key: "c", label: "(c)", prompt: "Find the $y$-intercept of the tangent line. Give the value with its sign.", marks: 2, answer: "-9", acceptedAnswers: ["-9", "−9", "(0,-9)", "c=-9"], hint: "Form $y-9=6(x-3)$ and set $x=0$.", explanation: "$y=6x-9$, so at $x=0$ the $y$-intercept is $-9$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "curve-sketching-calculus") {
    const curveFeatureGraph: import("../types").CartesianGraph = {
      description:
        "Feature map for f(x)=x^3-3x. The renderer does not draw smooth cubic curves in this lesson, so line segments approximate the curve while labelled points show the local maximum, point of inflection, and local minimum.",
      xMin: -3, xMax: 3, yMin: -4, yMax: 4,
      xStep: 1, yStep: 1,
      lineSegments: [
        { from: { x: -2.2, y: -4 }, to: { x: -1, y: 2 }, label: "increasing" },
        { from: { x: -1, y: 2 }, to: { x: 0, y: 0 }, label: "decreasing" },
        { from: { x: 0, y: 0 }, to: { x: 1, y: -2 }, label: "decreasing" },
        { from: { x: 1, y: -2 }, to: { x: 2.2, y: 4 }, label: "increasing" },
      ],
      points: [
        { x: -1, y: 2, label: "local max (-1, 2)" },
        { x: 0, y: 0, label: "inflection (0, 0)" },
        { x: 1, y: -2, label: "local min (1, -2)" },
      ],
    };
    const parabolaFeatureGraph: import("../types").CartesianGraph = {
      description:
        "Feature map for y=(x-2)^2-1, showing the x-intercepts, y-intercept, and local minimum. A parabola primitive is used because it is directly supported by the renderer.",
      xMin: -1, xMax: 5, yMin: -2, yMax: 8,
      xStep: 1, yStep: 1,
      parabolas: [
        { kind: "quadratic", a: 1, b: -4, c: 3, label: "y=(x-2)^2-1" },
      ],
      points: [
        { x: 1, y: 0, label: "x-intercept" },
        { x: 3, y: 0, label: "x-intercept" },
        { x: 0, y: 3, label: "y-intercept" },
        { x: 2, y: -1, label: "local min" },
      ],
    };

    return {
      ...base,
      description:
        "Combine intercepts, stationary points, increasing/decreasing intervals, concavity, and inflection points to describe a curve using calculus.",
      learningIntention:
        "Learn how to assemble derivative information into a calculus-informed graph description without relying on guesswork.",
      successCriteria: [
        "Find useful graph features: intercepts, stationary points, and inflection candidates.",
        "Use the sign of f'(x) to state increasing and decreasing intervals.",
        "Use the sign of f''(x) to state concavity intervals and confirm inflection points.",
        "Combine features into a concise graph description.",
      ],
      teaching: {
        paragraphs: [
          "Curve sketching with calculus is a feature-gathering process. You do not start by drawing; you first identify the points and intervals that control the shape.",
          "Find intercepts from the original function. Then solve f'(x) = 0 to locate stationary points and use derivative signs or the second derivative test to classify them.",
          "Increasing and decreasing intervals come from the sign of f'(x). Concavity and inflection points come from f''(x), with a sign change needed to confirm an inflection point.",
          "In this course, graph visuals mark key points and intervals. Smooth cubic and quartic curves are approximated with supported line segments and labelled points, so graded questions ask for exact features rather than a typed sketch.",
        ],
        latexBlocks: [
          "\\text{stationary points: }f'(x)=0",
          "f'(x)>0\\Rightarrow\\text{increasing};\\quad f'(x)<0\\Rightarrow\\text{decreasing}",
          "f''(x)>0\\Rightarrow\\text{concave up};\\quad f''(x)<0\\Rightarrow\\text{concave down}",
          "\\text{inflection: }f''(x)=0\\text{ and concavity changes}",
        ],
      },
      workedExamples: [
        {
          title: "Assemble cubic features",
          questionLatex: "f(x)=x^3-3x",
          cartesianGraph: curveFeatureGraph,
          steps: [
            { explanation: "Find stationary points.", latex: "f'(x)=3x^2-3=3(x-1)(x+1)\\Rightarrow x=-1,1" },
            { explanation: "Substitute into f(x).", latex: "f(-1)=2,\\quad f(1)=-2" },
            { explanation: "Use the first derivative signs.", latex: "f'(x)>0\\text{ on }x<-1\\text{ and }x>1;\\quad f'(x)<0\\text{ on }-1<x<1" },
            { explanation: "Use the second derivative for concavity.", latex: "f''(x)=6x\\Rightarrow \\text{inflection at }(0,0)" },
          ],
          finalAnswerLatex: "\\text{Local max }(-1,2),\\text{ local min }(1,-2),\\text{ inflection }(0,0)",
        },
        {
          title: "Use a feature checklist",
          questionLatex: "y=(x-2)^2-1",
          cartesianGraph: parabolaFeatureGraph,
          steps: [
            { explanation: "Find the vertex from the completed-square form.", latex: "(2,-1)" },
            { explanation: "Find x-intercepts by setting y=0.", latex: "(x-2)^2-1=0\\Rightarrow x=1,3" },
            { explanation: "Find the y-intercept.", latex: "y=(0-2)^2-1=3" },
            { explanation: "Classify the stationary point.", latex: "y''=2>0\\Rightarrow\\text{local minimum}" },
          ],
          finalAnswerLatex: "\\text{Local min }(2,-1),\\text{ x-intercepts }(1,0),(3,0),\\text{ y-intercept }(0,3)",
        },
        {
          title: "Read intervals from derivatives",
          questionLatex: "f'(x)=3(x-1)(x+1),\\quad f''(x)=6x",
          steps: [
            { explanation: "The derivative is positive outside the roots and negative between them.", latex: "\\text{Increasing: }x<-1\\text{ or }x>1;\\quad\\text{decreasing: }-1<x<1" },
            { explanation: "The second derivative changes from negative to positive at x=0.", latex: "\\text{Concave down for }x<0;\\quad\\text{concave up for }x>0" },
          ],
          finalAnswerLatex: "\\text{Increasing outside }[-1,1],\\text{ decreasing between, inflection at }x=0",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-curve-g1", "For f(x)=x^3-3x, find the local maximum coordinate.", "f'(x)=3x^2-3", "(-1,2)", ["(-1, 2)"]),
        formulaAnswer("y11adv-curve-g2", "For f(x)=x^3-3x, state the interval where the function is decreasing.", "f'(x)=3(x-1)(x+1)", "-1 < x < 1", ["(-1, 1)"]),
        practicalChoice("y11adv-curve-g3", "Which feature is confirmed when f''(x) changes sign at x=0?", "C", ["Local maximum", "Local minimum", "Point of inflection", "Vertical tangent"], "A sign change in f'' confirms a point of inflection.", "f''(x)=6x"),
        formulaAnswer("y11adv-curve-g4", "For $y=(x-2)^2-1$, give the local minimum coordinate.", "y=(x-2)^2-1", "(2,-1)", ["(2, -1)"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-curve-i1", "For f(x)=x^3-3x, state one interval where the function is increasing for x>0.", "f'(x)=3(x-1)(x+1)", "x > 1", ["x>1", "(1, infinity)", "(1, \\infty)"]),
        formulaAnswer("y11adv-curve-i2", "For f(x)=x^3-3x, state the concavity for x<0.", "f''(x)=6x", "concave down", ["downward concavity"]),
        practicalChoice("y11adv-curve-i3", "A cubic has a local maximum at (-1,2), a local minimum at (1,-2), and f'' changes sign at x=0. Which feature belongs at x=0?", "B", ["Another local maximum", "A point of inflection", "An x-intercept only", "A vertical asymptote"], "The sign change in f'' gives an inflection point.", "\\text{Feature summary}"),
        formulaAnswer("y11adv-curve-i4", "For $y=(x-2)^2-1$, find the x-values of the intercepts. Give answers in ascending order, separated by a comma.", "0=(x-2)^2-1", "1, 3", ["x=1,3", "1 and 3", "x=1 and x=3"]),
        practicalChoice("y11adv-curve-i5", "Which sequence is a sensible curve-sketching workflow?", "A", ["Intercepts, stationary points, derivative intervals, concavity", "Normal equation, area, volume, probability", "Only substitute x=0", "Only draw a shape from memory"], "A calculus sketch is built from exact features and interval information.", "\\text{Curve sketching workflow}"),
      ],
      commonMistakes: [
        { mistake: "Starting with a sketch before finding features.", fix: "Find intercepts, stationary points, intervals, and concavity first; the graph follows those features." },
        { mistake: "Calling f''(x)=0 an inflection point without checking signs.", fix: "Confirm that f'' changes sign across the candidate x-value." },
        { mistake: "Mixing up increasing intervals with concavity intervals.", fix: "Increasing/decreasing uses f'(x); concavity uses f''(x)." },
        { mistake: "Asking the typed answer to be a sketch.", fix: "Use exact features such as coordinates, intervals, and classifications for graded answers." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-curve-m1", "For f(x)=x^3-3x, give the local minimum coordinate.", "f'(x)=3x^2-3", "(1,-2)", ["(1, -2)"]),
        formulaAnswer("y11adv-curve-m2", "For f(x)=x^3-3x, state an interval where the function is concave up.", "f''(x)=6x", "x > 0", ["x>0", "(0, infinity)", "(0, \\infty)"]),
        formulaAnswer("y11adv-curve-m3", "For f(x)=x^3-3x, state an interval where the function is concave down.", "f''(x)=6x", "x < 0", ["x<0", "(-infinity, 0)", "(-\\infty, 0)"]),
        practicalChoice("y11adv-curve-m4", "Which classification matches f'(a)=0 and f''(a)<0?", "A", ["Local maximum", "Local minimum", "Point of inflection", "Increasing interval"], "A negative second derivative at a stationary point indicates a local maximum.", "f'(a)=0,\\quad f''(a)<0"),
        formulaAnswer("y11adv-curve-m5", "For f'(x)=3(x-2)(x+1), state the bounded interval where f is decreasing.", "f'(x)<0\\text{ between the roots}", "-1 < x < 2", ["(-1, 2)", "-1<x<2"]),
        practicalChoice("y11adv-curve-m6", "For f'(x)=3(x-2)(x+1), which interval is increasing?", "D", ["$-1<x<2$ only", "$x<2$ only", "$x>-1$ only", "$x<-1$ or $x>2$"], "The product is positive outside the two roots.", "f'(x)=3(x-2)(x+1)"),
        formulaAnswer("y11adv-curve-m7", "For f(x)=x^3-3x, find the x-coordinate of the point of inflection.", "f''(x)=6x", "0", ["x=0"]),
        practicalChoice("y11adv-curve-m8", "Which graph feature is most directly found by solving f'(x)=0?", "B", ["x-intercepts", "Stationary points", "y-intercept", "Domain"], "Stationary points occur where the derivative is zero.", "f'(x)=0"),
        formulaAnswer("y11adv-curve-m9", "For $y=(x-2)^2-1$, state the range feature from the local minimum.", "\\text{local minimum at }(2,-1)", "y >= -1", ["y>=-1", "y \\ge -1", "minimum y=-1", "minimum value -1"]),
        practicalChoice("y11adv-curve-m10", "A curve is increasing, then decreasing, then increasing again. What feature pattern does this suggest?", "C", ["Only one inflection point", "No stationary points", "A local maximum followed by a local minimum", "A vertical asymptote"], "The change from increasing to decreasing gives a local maximum; decreasing to increasing gives a local minimum.", "\\text{Sign of }f'\\text{: }+,-,+"),
      ],
      masteryQuizPool: [
        { id: "y11adv-curve-p1", prompt: "For $f(x)=x^3-3x$, give the local maximum coordinate.", latex: "f'(x)=3x^2-3", answer: "(-1,2)", difficulty: 1, acceptedAnswers: ["(-1, 2)"], hint: "Solve $f'(x)=0$ and use the left root.", explanation: "$f'(x)=0$ at $x=\\pm1$; $f(-1)=2$ gives the local max $(-1,2)$." },
        { id: "y11adv-curve-p2", prompt: "For $f(x)=x^3-3x$, give the local minimum coordinate.", latex: "f'(x)=3x^2-3", answer: "(1,-2)", difficulty: 1, acceptedAnswers: ["(1, -2)"], hint: "Use the right root and $f(1)$.", explanation: "$f(1)=-2$ gives the local min $(1,-2)$." },
        { id: "y11adv-curve-p3", prompt: "Which feature is confirmed when $f''(x)$ changes sign at $x=0$?", latex: "f''(x)=6x", answer: "C", difficulty: 1, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Local minimum" }, { label: "C", text: "Point of inflection" }, { label: "D", text: "Vertical tangent" }], hint: "A sign change in $f''$ confirms inflection.", explanation: "A sign change in $f''$ confirms a point of inflection." },
        { id: "y11adv-curve-p4", prompt: "For $y=(x-2)^2-1$, give the local minimum coordinate.", latex: "y=(x-2)^2-1", answer: "(2,-1)", difficulty: 1, acceptedAnswers: ["(2, -1)"], hint: "Read the vertex from completed-square form.", explanation: "The vertex is $(2,-1)$, a local minimum." },
        { id: "y11adv-curve-p5", prompt: "Which graph feature is most directly found by solving $f'(x)=0$?", latex: "f'(x)=0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$x$-intercepts" }, { label: "B", text: "Stationary points" }, { label: "C", text: "$y$-intercept" }, { label: "D", text: "Domain" }], hint: "Stationary means zero gradient.", explanation: "Stationary points occur where $f'(x)=0$." },
        { id: "y11adv-curve-p6", prompt: "For $f(x)=x^3-3x$, state the bounded interval where the function is decreasing.", latex: "f'(x)=3(x-1)(x+1)", answer: "-1 < x < 1", difficulty: 2, acceptedAnswers: ["(-1, 1)", "-1<x<1"], hint: "$f'(x)<0$ between the roots.", explanation: "The derivative is negative between $-1$ and $1$." },
        { id: "y11adv-curve-p7", prompt: "For $f(x)=x^3-3x$, state an interval where the function is increasing for $x>0$.", latex: "f'(x)=3(x-1)(x+1)", answer: "x > 1", difficulty: 2, acceptedAnswers: ["x>1", "(1, \\infty)"], hint: "$f'(x)>0$ outside the roots.", explanation: "For $x>1$ the derivative is positive, so $f$ is increasing." },
        { id: "y11adv-curve-p8", prompt: "For $f(x)=x^3-3x$, state an interval where the function is concave up.", latex: "f''(x)=6x", answer: "x > 0", difficulty: 2, acceptedAnswers: ["x>0", "(0, \\infty)"], hint: "$f''(x)>0$ for concave up.", explanation: "$f''(x)=6x>0$ when $x>0$." },
        { id: "y11adv-curve-p9", prompt: "For $f(x)=x^3-3x$, state an interval where the function is concave down.", latex: "f''(x)=6x", answer: "x < 0", difficulty: 2, acceptedAnswers: ["x<0", "(-\\infty, 0)"], hint: "$f''(x)<0$ for concave down.", explanation: "$f''(x)=6x<0$ when $x<0$." },
        { id: "y11adv-curve-p10", prompt: "Which classification matches $f'(a)=0$ and $f''(a)<0$?", latex: "f'(a)=0,\\quad f''(a)<0", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Local minimum" }, { label: "C", text: "Point of inflection" }, { label: "D", text: "Increasing interval" }], hint: "Negative $f''$ means concave down.", explanation: "A stationary point with $f''<0$ is a local maximum." },
        { id: "y11adv-curve-p11", prompt: "For $f(x)=x^3-3x$, find the $x$-coordinate of the point of inflection.", latex: "f''(x)=6x", answer: "0", difficulty: 3, acceptedAnswers: ["x=0"], hint: "Set $f''(x)=0$.", explanation: "$6x=0$ gives $x=0$, and the sign of $f''$ changes there." },
        { id: "y11adv-curve-p12", prompt: "For $f'(x)=3(x-2)(x+1)$, state the bounded interval where $f$ is decreasing.", latex: "f'(x)=3(x-2)(x+1)", answer: "-1 < x < 2", difficulty: 3, acceptedAnswers: ["(-1, 2)", "-1<x<2"], hint: "$f'(x)<0$ between the roots.", explanation: "The roots are $-1$ and $2$, with $f'<0$ between them." },
        { id: "y11adv-curve-p13", prompt: "For $f'(x)=3(x-2)(x+1)$, which interval is increasing?", latex: "f'(x)=3(x-2)(x+1)", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$-1<x<2$ only" }, { label: "B", text: "$x<2$ only" }, { label: "C", text: "$x>-1$ only" }, { label: "D", text: "$x<-1$ or $x>2$" }], hint: "The product is positive outside the roots.", explanation: "$f'>0$ for $x<-1$ or $x>2$." },
        { id: "y11adv-curve-p14", prompt: "A cubic has a local maximum at $(-1,2)$, a local minimum at $(1,-2)$, and $f''$ changes sign at $x=0$. Which feature belongs at $x=0$?", latex: "\\text{Feature summary}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Another local maximum" }, { label: "B", text: "A point of inflection" }, { label: "C", text: "An $x$-intercept only" }, { label: "D", text: "A vertical asymptote" }], hint: "A sign change in $f''$ gives inflection.", explanation: "The sign change in $f''$ produces a point of inflection." },
        { id: "y11adv-curve-p15", prompt: "Which sequence is a sensible curve-sketching workflow?", latex: "\\text{Curve sketching workflow}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Intercepts, stationary points, derivative intervals, concavity" }, { label: "B", text: "Normal equation, area, volume, probability" }, { label: "C", text: "Only substitute $x=0$" }, { label: "D", text: "Only draw a shape from memory" }], hint: "Gather features before drawing.", explanation: "A calculus sketch is built from exact features and intervals." },
        { id: "y11adv-curve-p16", prompt: "For $y=(x-2)^2-1$, find the $x$-values of the intercepts. Give answers in ascending order, separated by a comma.", latex: "0=(x-2)^2-1", answer: "1, 3", difficulty: 2, acceptedAnswers: ["x=1,3", "1 and 3", "x = 1, 3"], hint: "Set $y=0$ and solve.", explanation: "$(x-2)^2=1$ gives $x=1$ or $x=3$." },
        { id: "y11adv-curve-p17", prompt: "For $y=(x-2)^2-1$, find the $y$-intercept.", latex: "y=(x-2)^2-1,\\quad x=0", answer: "3", difficulty: 2, acceptedAnswers: ["(0,3)", "y=3"], hint: "Substitute $x=0$.", explanation: "$y=(0-2)^2-1=4-1=3$." },
        { id: "y11adv-curve-p18", prompt: "For $f(x)=x^3-3x$, state the concavity for $x<0$.", latex: "f''(x)=6x", answer: "concave down", difficulty: 2, acceptedAnswers: ["downward concavity", "concave downward"], hint: "Test the sign of $f''$.", explanation: "$f''(x)=6x<0$ for $x<0$, so concave down." },
        { id: "y11adv-curve-p19", prompt: "A curve is increasing, then decreasing, then increasing. Which pattern of features does this suggest?", latex: "\\text{Sign of }f': +,-,+", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Only one inflection point" }, { label: "B", text: "No stationary points" }, { label: "C", text: "A local maximum then a local minimum" }, { label: "D", text: "A vertical asymptote" }], hint: "Increasing to decreasing is a max; decreasing to increasing is a min.", explanation: "The pattern gives a local maximum followed by a local minimum." },
        { id: "y11adv-curve-p20", prompt: "For $y=(x-2)^2-1$, state the range feature from the local minimum.", latex: "\\text{local minimum at }(2,-1)", answer: "y >= -1", difficulty: 3, acceptedAnswers: ["y>=-1", "y \\ge -1", "minimum y=-1"], hint: "The lowest output is the minimum $y$-value.", explanation: "The minimum value is $-1$, so $y\\ge-1$." },
        { id: "y11adv-curve-p21", prompt: "For $f(x)=x^3-12x$, find the positive stationary $x$-value.", latex: "f(x)=x^3-12x", answer: "2", difficulty: 4, acceptedAnswers: ["x=2"], hint: "Solve $f'(x)=0$.", explanation: "$f'(x)=3x^2-12=0$ gives $x=\\pm2$; positive is $2$." },
        { id: "y11adv-curve-p22", prompt: "For $f(x)=x^3-12x$, find the $y$-value of the local minimum at $x=2$. Give the value with its sign.", latex: "f(x)=x^3-12x", answer: "-16", difficulty: 4, acceptedAnswers: ["-16", "−16", "y=-16"], hint: "Substitute $x=2$ into $f(x)$.", explanation: "$f(2)=8-24=-16$." },
        { id: "y11adv-curve-p23", prompt: "For $f(x)=x^3-6x^2$, find the $x$-coordinate of the point of inflection.", latex: "f(x)=x^3-6x^2", answer: "2", difficulty: 5, acceptedAnswers: ["x=2"], hint: "Set $f''(x)=0$.", explanation: "$f'(x)=3x^2-12x$, $f''(x)=6x-12=0$ gives $x=2$." },
        { id: "y11adv-curve-p24", prompt: "For $f(x)=x^4-2x^2$, find the positive $x$-value where the curve is concave up again (the larger inflection $x$-value).", latex: "f(x)=x^4-2x^2", answer: "0.577", difficulty: 4, acceptedAnswers: ["1/\\sqrt{3}", "0.58", "0.577"], hint: "Set $f''(x)=0$: $12x^2-4=0$.", explanation: "$f''(x)=12x^2-4=0$ gives $x^2=\\frac13$, so $x=\\frac{1}{\\sqrt3}\\approx0.577$." },
        { id: "y11adv-curve-p25", prompt: "For $f(x)=x^3-3x^2$, state the bounded interval where $f$ is decreasing.", latex: "f(x)=x^3-3x^2", answer: "0 < x < 2", difficulty: 4, acceptedAnswers: ["(0, 2)", "0<x<2"], hint: "$f'(x)=3x(x-2)<0$ between the roots.", explanation: "$f'(x)=3x^2-6x=3x(x-2)$ is negative on $0<x<2$." },
        { id: "y11adv-curve-p26", prompt: "For $f(x)=x^3-3x^2-9x$, find the larger stationary $x$-value.", latex: "f(x)=x^3-3x^2-9x", answer: "3", difficulty: 5, acceptedAnswers: ["x=3"], hint: "Solve $f'(x)=0$ and factorise.", explanation: "$f'(x)=3x^2-6x-9=3(x-3)(x+1)=0$ gives $x=3$ or $x=-1$; larger is $3$." },
        { id: "y11adv-curve-p27", prompt: "For $f(x)=x^3-3x^2-9x$, find the $y$-value at the local minimum $x=3$. Give the value with its sign.", latex: "f(x)=x^3-3x^2-9x", answer: "-27", difficulty: 5, acceptedAnswers: ["-27", "−27", "y=-27"], hint: "Substitute $x=3$.", explanation: "$f(3)=27-27-27=-27$." },
        { id: "y11adv-curve-p28", prompt: "For $f(x)=2x^3-3x^2-12x$, find the $x$-coordinate of the point of inflection.", latex: "f(x)=2x^3-3x^2-12x", answer: "0.5", difficulty: 5, acceptedAnswers: ["1/2", "x=0.5", "x=1/2"], hint: "Set $f''(x)=0$.", explanation: "$f'(x)=6x^2-6x-12$, $f''(x)=12x-6=0$ gives $x=\\frac12$." },
        { id: "y11adv-curve-p29", prompt: "For $f(x)=x^4-8x^2$, find the positive stationary $x$-value (not $x=0$).", latex: "f(x)=x^4-8x^2", answer: "2", difficulty: 5, acceptedAnswers: ["x=2"], hint: "Solve $f'(x)=4x^3-16x=0$.", explanation: "$4x(x^2-4)=0$ gives $x=0,\\pm2$; the positive non-zero value is $2$." },
        { id: "y11adv-curve-p30", prompt: "For $f(x)=x^4-8x^2$, find the $y$-value of the local minimum at $x=2$. Give the value with its sign.", latex: "f(x)=x^4-8x^2", answer: "-16", difficulty: 5, acceptedAnswers: ["-16", "−16", "y=-16"], hint: "Substitute $x=2$.", explanation: "$f(2)=16-32=-16$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-curve-mp1",
          prompt: "Consider the cubic $f(x)=x^3-3x$.",
          latex: "f(x)=x^3-3x",
          answer: "-1, 1",
          hint: "Solve $f'(x)=0$ for the stationary $x$-values, then use $f''$ for concavity and the inflection.",
          explanation: "(a) $f'(x)=3x^2-3=0$ gives $x=\\pm1$, so the local maximum is at $x=-1$. (b) $f(-1)=-1+3=2$. (c) $f''(x)=6x=0$ gives the point of inflection at $x=0$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the $x$-coordinate of the local maximum. Give the value with its sign.", marks: 1, answer: "-1", acceptedAnswers: ["-1", "−1", "x=-1"], hint: "Solve $f'(x)=0$; the local max is the left root.", explanation: "$f'(x)=3x^2-3=0$ gives $x=\\pm1$; the local max is at $x=-1$." },
            { key: "b", label: "(b)", prompt: "Find the $y$-coordinate of this local maximum.", marks: 2, answer: "2", acceptedAnswers: ["y=2", "f(-1)=2"], hint: "Substitute $x=-1$ into $f(x)$.", explanation: "$f(-1)=(-1)^3-3(-1)=-1+3=2$." },
            { key: "c", label: "(c)", prompt: "Find the $x$-coordinate of the point of inflection.", marks: 1, answer: "0", acceptedAnswers: ["x=0"], hint: "Set $f''(x)=0$.", explanation: "$f''(x)=6x=0$ gives $x=0$, where concavity changes." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "introduction-differentiation-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed assessment-style differentiation questions across rates, first principles, derivative rules, tangents, stationary points, concavity, and curve sketching features.",
      learningIntention:
        "Apply the full Introduction to Differentiation skill set to mixed school-assessment questions with clear setup, short answers, and interpretation.",
      successCriteria: [
        "Calculate average rates of change from values, tables, and contexts.",
        "Choose correct first-principles setups.",
        "Differentiate polynomial and simple composite functions accurately.",
        "Find tangent and normal gradients and equations.",
        "Classify stationary points and state increasing/decreasing intervals.",
        "Use second derivative information for concavity and inflection.",
        "Identify curve-sketching features from derivative information.",
      ],
      teaching: {
        paragraphs: [
          "Mixed differentiation questions become easier when you name the job first: average change, first principles, derivative rule, tangent or normal line, stationary point, concavity, or curve feature.",
          "Average rate uses two points and gives a secant gradient. Instantaneous rate uses the derivative at one point and gives the tangent gradient.",
          "First-principles questions are about shrinking an interval: simplify the nearby-point gradient before letting h approach zero.",
          "For polynomial derivatives, multiply by the old power and reduce the power by 1. For simple composite powers, multiply by the derivative of the inside as well.",
          "For tangent and normal equations, find the derivative, find the point, then use point-gradient form. For graph features, use f'(x) for stationary and increasing/decreasing information, and f''(x) for concavity and inflection information.",
          "Before answering, check whether the question wants a y-value, a gradient, a coordinate, an equation, or an interpretation. Those are related ideas, but they are not interchangeable.",
        ],
        latexBlocks: [
          "\\frac{f(b)-f(a)}{b-a}",
          "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}",
          "\\frac{d}{dx}(ax^n)=anx^{n-1}",
          "\\frac{d}{dx}[(g(x))^n]=n[g(x)]^{n-1}g'(x)",
          "y-y_1=m(x-x_1)",
          "m_{\\text{normal}}=-\\frac{1}{m_{\\text{tangent}}}",
          "f'(x)=0\\Rightarrow\\text{stationary candidate};\\quad f''\\text{ sign change}\\Rightarrow\\text{inflection}",
        ],
      },
      workedExamples: [
        {
          title: "Mixed rate, derivative, and tangent question",
          questionLatex: "f(1)=2,\\quad f(5)=18,\\quad g(x)=x^3-4x,\\quad x=2",
          steps: [
            { explanation: "Average rate of change for f uses two function values.", latex: "\\frac{18-2}{5-1}=4" },
            { explanation: "A derivative question for g starts by differentiating.", latex: "g'(x)=3x^2-4" },
            { explanation: "Evaluate the derivative to get the tangent gradient at x=2.", latex: "g'(2)=3(2)^2-4=8" },
          ],
          finalAnswerLatex: "\\text{Average rate }=4,\\quad g'(x)=3x^2-4,\\quad g'(2)=8",
        },
        {
          title: "Stationary points and curve features",
          questionLatex: "f(x)=x^3-3x",
          steps: [
            { explanation: "Find stationary x-values.", latex: "f'(x)=3x^2-3=0\\Rightarrow x=-1,1" },
            { explanation: "Find the coordinates.", latex: "f(-1)=2,\\quad f(1)=-2" },
            { explanation: "Classify using the second derivative.", latex: "f''(x)=6x,\\quad f''(-1)<0\\Rightarrow\\text{local max},\\quad f''(1)>0\\Rightarrow\\text{local min}" },
            { explanation: "Find concavity change.", latex: "f''(x)=0\\Rightarrow x=0\\text{, with sign change}" },
          ],
          finalAnswerLatex: "\\text{Local max }(-1,2),\\quad\\text{local min }(1,-2),\\quad\\text{inflection }(0,0)",
        },
        {
          title: "Tangent and normal in an assessment style",
          questionLatex: "y=x^2-2x,\\quad x=3",
          steps: [
            { explanation: "Find the point on the curve.", latex: "y=3^2-2(3)=3\\Rightarrow (3,3)" },
            { explanation: "Differentiate and evaluate the tangent gradient.", latex: "\\frac{dy}{dx}=2x-2,\\quad m_T=4" },
            { explanation: "Use the negative reciprocal for the normal gradient.", latex: "m_N=-\\frac14" },
            { explanation: "Use point-gradient form for the tangent.", latex: "y-3=4(x-3)\\Rightarrow y=4x-9" },
          ],
          finalAnswerLatex: "m_N=-\\frac14,\\quad y_{\\text{tangent}}=4x-9",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-id-exam-g1", "Find the average rate of change over the interval.", "f(2)=5,\\quad f(8)=23", "3", ["m=3"]),
        practicalChoice("y11adv-id-exam-g2", "Choose the correct first-principles setup.", "B", ["$\\lim_{h\\to0}\\frac{f(x)-f(x+h)}{h}$", "$\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$", "$\\lim_{h\\to0}\\frac{f(x+h)+f(x)}{h}$", "$\\lim_{h\\to0}\\frac{f(h)-f(x)}{x}$"], "Use new output minus original output over h.", "f'(x)"),
        formulaAnswer("y11adv-id-exam-g3", "Differentiate the polynomial function.", "f(x)=3x^3-2x+1", "9x^2-2", ["f'(x)=9x^2-2"]),
        formulaAnswer("y11adv-id-exam-g4", "Differentiate using the chain rule.", "y=(2x+1)^3", "6(2x+1)^2", ["dy/dx=6(2x+1)^2"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-id-exam-i1", "Find the average rate of change from the table.", "\\begin{array}{c|cc}x&0&4\\\\ f(x)&6&30\\end{array}", "6", ["m=6"]),
        formulaAnswer("y11adv-id-exam-i2", "Evaluate the derivative at the given x-value.", "f(x)=2x^2-5x,\\quad x=3", "7", ["f'(3)=7"]),
        formulaAnswer("y11adv-id-exam-i3", "Find the normal gradient for the given tangent gradient.", "m_{\\text{tangent}}=5", "-1/5", ["-0.2"]),
        formulaAnswer("y11adv-id-exam-i4", "For f(x)=x^2-4x+1, state the interval where f is increasing.", "f'(x)=2x-4", "x > 2", ["x>2", "(2, infinity)", "(2, \\infty)"]),
        practicalChoice("y11adv-id-exam-i5", "For f(x)=x^3-3x, f''(x)=6x. What is the concavity for x<0?", "D", ["Increasing", "Decreasing", "Concave up", "Concave down"], "For x<0, f''(x)<0, so the curve is concave down.", "f''(x)=6x"),
      ],
      commonMistakes: [
        { mistake: "Using average rate of change when the question asks for a tangent gradient.", fix: "Average rates use two points; tangent gradients use the derivative at one point." },
        { mistake: "Typing a long limit expression when a multiple-choice setup is enough.", fix: "For setup questions, choose the option matching $\\frac{f(x+h)-f(x)}{h}$." },
        { mistake: "Substituting into the original function when a derivative value is required.", fix: "Differentiate first, then substitute." },
        { mistake: "Using the tangent gradient for the normal.", fix: "For the normal, use the negative reciprocal of the tangent gradient." },
        { mistake: "Using f'' to decide increasing and decreasing intervals.", fix: "Use f'(x) for increasing/decreasing; use f''(x) for concavity." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-id-exam-m1", "Find the average rate of change over the interval.", "f(1)=4,\\quad f(5)=28", "6", ["m=6"]),
        practicalChoice("y11adv-id-exam-m2", "Choose the correct first-principles setup.", "D", ["$\\lim_{h\\to0}\\frac{(x+h)^2+x^2}{h}$", "$\\lim_{h\\to0}\\frac{x^2-(x+h)^2}{h}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{x}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}$"], "Use f(x+h) minus f(x), divided by h.", "f(x)=x^2"),
        formulaAnswer("y11adv-id-exam-m3", "Differentiate the polynomial function.", "y=4x^3-x+10", "12x^2-1", ["dy/dx=12x^2-1", "\\frac{dy}{dx}=12x^2-1"]),
        formulaAnswer("y11adv-id-exam-m4", "Find the normal gradient for the displayed tangent gradient.", "m_{\\text{tangent}}=-2", "1/2", ["0.5"]),
        formulaAnswer("y11adv-id-exam-m5", "Differentiate using the chain rule.", "y=(x^2+1)^3", "6x(x^2+1)^2", ["dy/dx=6x(x^2+1)^2"]),
        formulaAnswer("y11adv-id-exam-m6", "Find the tangent equation at the point on the curve. Give your answer in the form $y=mx+c$.", "y=x^2-1,\\quad x=2", "y=4x-5", ["y = 4x - 5"]),
        practicalChoice("y11adv-id-exam-m7", "For f(x)=x^3-3x, classify the stationary point at x=1.", "C", ["Local maximum", "Point of inflection", "Local minimum", "Not stationary"], "f''(1)=6>0, so the stationary point is a local minimum.", "f'(1)=0,\\quad f''(1)=6"),
        formulaAnswer("y11adv-id-exam-m8", "For f(x)=x^3-3x, state the interval where f is decreasing.", "f'(x)=3(x-1)(x+1)", "-1 < x < 1", ["(-1, 1)", "-1<x<1"]),
        practicalChoice("y11adv-id-exam-m9", "For f''(x)=6x, what curve-sketching feature occurs at x=0 when the sign changes?", "B", ["Local maximum", "Point of inflection", "Local minimum", "Horizontal asymptote"], "A sign change in f'' confirms a point of inflection.", "f''(x)=6x"),
        formulaAnswer("y11adv-id-exam-m10", "For f(x)=x^3-3x, give the local maximum coordinate.", "f'(x)=3x^2-3", "(-1,2)", ["(-1, 2)"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-id-exam-p1", prompt: "Find the average rate of change over the interval.", latex: "f(1)=4,\\quad f(5)=28", answer: "6", difficulty: 1, acceptedAnswers: ["m=6"], hint: "Output change over input change.", explanation: "$\\frac{28-4}{5-1}=\\frac{24}{4}=6$." },
        { id: "y11adv-id-exam-p2", prompt: "Differentiate the polynomial function.", latex: "f(x)=3x^3-2x+1", answer: "9x^2-2", difficulty: 1, acceptedAnswers: ["f'(x)=9x^2-2"], hint: "Differentiate term by term.", explanation: "$\\frac{d}{dx}(3x^3-2x+1)=9x^2-2$." },
        { id: "y11adv-id-exam-p3", prompt: "Find the normal gradient for the given tangent gradient. Give the exact fraction.", latex: "m_{\\text{tangent}}=5", answer: "-1/5", difficulty: 1, acceptedAnswers: ["-0.2", "−1/5"], hint: "Negative reciprocal.", explanation: "$m_{\\text{normal}}=-\\frac15$." },
        { id: "y11adv-id-exam-p4", prompt: "Choose the correct first-principles setup.", latex: "f'(x)", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\lim_{h\\to0}\\frac{f(x)-f(x+h)}{h}$" }, { label: "B", text: "$\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$" }, { label: "C", text: "$\\lim_{h\\to0}\\frac{f(x+h)+f(x)}{h}$" }, { label: "D", text: "$\\lim_{h\\to0}\\frac{f(h)-f(x)}{x}$" }], hint: "New output minus original output, over $h$.", explanation: "The correct setup is $\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$." },
        { id: "y11adv-id-exam-p5", prompt: "Evaluate the derivative at the given $x$-value.", latex: "f(x)=2x^2-5x,\\quad x=3", answer: "7", difficulty: 2, acceptedAnswers: ["f'(3)=7"], hint: "Differentiate, then substitute.", explanation: "$f'(x)=4x-5$, so $f'(3)=12-5=7$." },
        { id: "y11adv-id-exam-p6", prompt: "Differentiate using the chain rule.", latex: "y=(2x+1)^3", answer: "6(2x+1)^2", difficulty: 2, acceptedAnswers: ["dy/dx=6(2x+1)^2"], hint: "Multiply by the inner derivative $2$.", explanation: "$\\frac{dy}{dx}=3(2x+1)^2\\cdot2=6(2x+1)^2$." },
        { id: "y11adv-id-exam-p7", prompt: "Differentiate the polynomial function.", latex: "y=4x^3-x+10", answer: "12x^2-1", difficulty: 2, acceptedAnswers: ["dy/dx=12x^2-1", "\\frac{dy}{dx}=12x^2-1"], hint: "Differentiate term by term.", explanation: "$\\frac{dy}{dx}=12x^2-1$." },
        { id: "y11adv-id-exam-p8", prompt: "Find the normal gradient for the displayed tangent gradient. Give the exact fraction.", latex: "m_{\\text{tangent}}=-2", answer: "1/2", difficulty: 2, acceptedAnswers: ["0.5", "1/2"], hint: "Negative reciprocal of $-2$.", explanation: "$m_{\\text{normal}}=-\\frac{1}{-2}=\\frac12$." },
        { id: "y11adv-id-exam-p9", prompt: "For $f(x)=x^2-4x+1$, state the interval where $f$ is increasing.", latex: "f'(x)=2x-4", answer: "x > 2", difficulty: 2, acceptedAnswers: ["x>2", "(2, \\infty)"], hint: "$f'(x)>0$.", explanation: "$2x-4>0$ gives $x>2$." },
        { id: "y11adv-id-exam-p10", prompt: "Differentiate using the chain rule.", latex: "y=(x^2+1)^3", answer: "6x(x^2+1)^2", difficulty: 3, acceptedAnswers: ["dy/dx=6x(x^2+1)^2"], hint: "Inner derivative is $2x$.", explanation: "$\\frac{dy}{dx}=3(x^2+1)^2\\cdot2x=6x(x^2+1)^2$." },
        { id: "y11adv-id-exam-p11", prompt: "Find the tangent equation at the point on the curve. Give your answer in the form $y=mx+c$.", latex: "y=x^2-1,\\quad x=2", answer: "y=4x-5", difficulty: 3, acceptedAnswers: ["y = 4x - 5"], hint: "Point $(2,3)$ and gradient $4$.", explanation: "$\\frac{dy}{dx}=2x=4$; $y-3=4(x-2)$ gives $y=4x-5$." },
        { id: "y11adv-id-exam-p12", prompt: "For $f(x)=x^3-3x$, state the bounded interval where $f$ is decreasing.", latex: "f'(x)=3(x-1)(x+1)", answer: "-1 < x < 1", difficulty: 3, acceptedAnswers: ["(-1, 1)", "-1<x<1"], hint: "$f'(x)<0$ between the roots.", explanation: "The derivative is negative on $-1<x<1$." },
        { id: "y11adv-id-exam-p13", prompt: "For $f(x)=x^3-3x$, classify the stationary point at $x=1$.", latex: "f'(1)=0,\\quad f''(1)=6", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Point of inflection" }, { label: "C", text: "Local minimum" }, { label: "D", text: "Not stationary" }], hint: "$f''(1)>0$ means concave up.", explanation: "$f''(1)=6>0$, so the point is a local minimum." },
        { id: "y11adv-id-exam-p14", prompt: "For $f''(x)=6x$, what feature occurs at $x=0$ when the sign changes?", latex: "f''(x)=6x", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Point of inflection" }, { label: "C", text: "Local minimum" }, { label: "D", text: "Horizontal asymptote" }], hint: "A sign change in $f''$ confirms inflection.", explanation: "A sign change in $f''$ at $x=0$ gives a point of inflection." },
        { id: "y11adv-id-exam-p15", prompt: "Find the average rate of change from the table.", latex: "\\begin{array}{c|cc}x&0&4\\\\ f(x)&6&30\\end{array}", answer: "6", difficulty: 2, acceptedAnswers: ["m=6"], hint: "Output change over input change.", explanation: "$\\frac{30-6}{4-0}=\\frac{24}{4}=6$." },
        { id: "y11adv-id-exam-p16", prompt: "Differentiate using the chain rule.", latex: "y=(3x-2)^4", answer: "12(3x-2)^3", difficulty: 3, acceptedAnswers: ["dy/dx=12(3x-2)^3"], hint: "Inner derivative is $3$.", explanation: "$\\frac{dy}{dx}=4(3x-2)^3\\cdot3=12(3x-2)^3$." },
        { id: "y11adv-id-exam-p17", prompt: "For $f(x)=x^3-3x$, give the local maximum coordinate.", latex: "f'(x)=3x^2-3", answer: "(-1,2)", difficulty: 2, acceptedAnswers: ["(-1, 2)"], hint: "Use the left root and $f(-1)$.", explanation: "$f(-1)=2$ gives the local max $(-1,2)$." },
        { id: "y11adv-id-exam-p18", prompt: "For $f(x)=x^3-3x$, $f''(x)=6x$. What is the concavity for $x<0$?", latex: "f''(x)=6x", answer: "D", difficulty: 2, choices: [{ label: "A", text: "Increasing" }, { label: "B", text: "Decreasing" }, { label: "C", text: "Concave up" }, { label: "D", text: "Concave down" }], hint: "Test the sign of $f''$.", explanation: "For $x<0$, $f''(x)<0$, so concave down." },
        { id: "y11adv-id-exam-p19", prompt: "Evaluate the derivative at the given $x$-value.", latex: "f(x)=x^3+2x^2,\\quad x=1", answer: "7", difficulty: 2, acceptedAnswers: ["f'(1)=7"], hint: "Differentiate, then substitute.", explanation: "$f'(x)=3x^2+4x$, so $f'(1)=3+4=7$." },
        { id: "y11adv-id-exam-p20", prompt: "Find the tangent gradient at the given $x$-value.", latex: "y=x^2-2x,\\quad x=3", answer: "4", difficulty: 2, acceptedAnswers: ["m=4"], hint: "Differentiate, then substitute.", explanation: "$\\frac{dy}{dx}=2x-2$, so at $x=3$ it is $4$." },
        { id: "y11adv-id-exam-p21", prompt: "Differentiate using the chain rule, then find the gradient at $x=1$.", latex: "y=(x^2+4)^2,\\quad x=1", answer: "20", difficulty: 4, acceptedAnswers: ["m=20"], hint: "$\\frac{dy}{dx}=4x(x^2+4)$; substitute $x=1$.", explanation: "$\\frac{dy}{dx}=2(x^2+4)\\cdot2x=4x(x^2+4)$; at $x=1$ it is $4(5)=20$." },
        { id: "y11adv-id-exam-p22", prompt: "Find the tangent equation at the point on the curve. Give your answer in the form $y=mx+c$.", latex: "y=x^2-2x,\\quad x=3", answer: "y=4x-9", difficulty: 4, acceptedAnswers: ["y = 4x - 9"], hint: "Point $(3,3)$ and gradient $4$.", explanation: "$\\frac{dy}{dx}=2x-2=4$; $y-3=4(x-3)$ gives $y=4x-9$." },
        { id: "y11adv-id-exam-p23", prompt: "For $f(x)=x^3-6x^2+9x$, find the larger stationary $x$-value.", latex: "f(x)=x^3-6x^2+9x", answer: "3", difficulty: 5, acceptedAnswers: ["x=3"], hint: "Solve $f'(x)=0$.", explanation: "$f'(x)=3x^2-12x+9=3(x-1)(x-3)=0$ gives $x=1,3$; larger is $3$." },
        { id: "y11adv-id-exam-p24", prompt: "For $g(x)=x^3-4x$, find the tangent gradient at $x=2$.", latex: "g(x)=x^3-4x", answer: "8", difficulty: 4, acceptedAnswers: ["g'(2)=8", "m=8"], hint: "Differentiate, then substitute.", explanation: "$g'(x)=3x^2-4$, so $g'(2)=12-4=8$." },
        { id: "y11adv-id-exam-p25", prompt: "A particle has $s(t)=t^3-3t^2$. Find its velocity $s'(t)$ at $t=2$. Give the value with its sign.", latex: "s(t)=t^3-3t^2", answer: "0", difficulty: 4, acceptedAnswers: ["s'(2)=0"], hint: "$s'(t)=3t^2-6t$; substitute $t=2$.", explanation: "$s'(t)=3t^2-6t$, so $s'(2)=12-12=0$." },
        { id: "y11adv-id-exam-p26", prompt: "Find the $y$-intercept of the tangent to $y=x^2-2x$ at $x=3$. Give the value with its sign.", latex: "y=x^2-2x,\\quad x=3", answer: "-9", difficulty: 5, acceptedAnswers: ["-9", "−9", "(0,-9)", "c=-9"], hint: "Tangent is $y=4x-9$; set $x=0$.", explanation: "The tangent is $y=4x-9$, so the $y$-intercept is $-9$." },
        { id: "y11adv-id-exam-p27", prompt: "The tangent to $y=x^2$ at $x=a$ is parallel to $y=8x$. Find $a$.", latex: "y=x^2,\\quad m=8", answer: "4", difficulty: 5, acceptedAnswers: ["a=4"], hint: "Set $2a=8$.", explanation: "$\\frac{dy}{dx}=2x=8$ gives $x=4$." },
        { id: "y11adv-id-exam-p28", prompt: "For $f(x)=x^3-3x$, find the average rate of change from $x=0$ to $x=2$.", latex: "f(x)=x^3-3x", answer: "1", difficulty: 5, acceptedAnswers: ["m=1"], hint: "Find $f(0)$ and $f(2)$.", explanation: "$f(0)=0,\\ f(2)=8-6=2$, so $\\frac{2-0}{2-0}=1$." },
        { id: "y11adv-id-exam-p29", prompt: "Use first principles for $f(x)=x^2+x$ to find $f'(x)$.", latex: "f(x)=x^2+x", answer: "2x+1", difficulty: 5, acceptedAnswers: ["f'(x)=2x+1"], hint: "Expand $(x+h)^2+(x+h)$ and simplify.", explanation: "$\\frac{2xh+h^2+h}{h}=2x+h+1\\to2x+1$." },
        { id: "y11adv-id-exam-p30", prompt: "Find the value of $a$ if the curve $y=ax^2$ has gradient $12$ at $x=2$.", latex: "y=ax^2,\\quad \\frac{dy}{dx}=12\\text{ at }x=2", answer: "3", difficulty: 5, acceptedAnswers: ["a=3"], hint: "$\\frac{dy}{dx}=2ax$; set $4a=12$.", explanation: "$2a(2)=4a=12$ gives $a=3$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-id-exam-mp1",
          prompt: "A function has derivative information $f'(x)=3(x-1)(x+1)$ and $f''(x)=6x$. Also $f(1)=-2$.",
          latex: "f'(x)=3(x-1)(x+1),\\quad f''(x)=6x,\\quad f(1)=-2",
          answer: "(1,-2)",
          hint: "Use f'(x)=0 for stationary x-values, then use f''(1) to classify.",
          explanation:
            "The stationary x-values are x=-1 and x=1. Since f''(1)=6>0, the point at x=1 is a local minimum. With f(1)=-2, the coordinate is (1,-2).",
          parts: [
            { key: "a", label: "(a)", prompt: "State the positive stationary x-value.", marks: 1, answer: "1", acceptedAnswers: ["x=1"], hint: "Solve f'(x)=0 and choose the positive solution.", explanation: "3(x-1)(x+1)=0 gives x=-1 or x=1, so the positive stationary x-value is 1." },
            { key: "b", label: "(b)", prompt: "Classify the stationary point at x=1.", marks: 1, answer: "local minimum", acceptedAnswers: ["local min", "minimum", "min"], hint: "Use the sign of f''(1).", explanation: "f''(1)=6>0, so the stationary point is a local minimum." },
            { key: "c", label: "(c)", prompt: "Give the coordinate of this stationary point.", marks: 1, answer: "(1,-2)", acceptedAnswers: ["(1, -2)", "1,-2", "1, -2", "x=1,y=-2"], hint: "Use the given value f(1)=-2.", explanation: "The x-value is 1 and f(1)=-2, so the coordinate is (1,-2)." },
          ],
        },
        {
          id: "y11adv-id-exam-mp2",
          prompt: "A function has $f'(x)=3(x-2)(x+1)$ and $f''(x)=6x-3$.",
          latex: "f'(x)=3(x-2)(x+1),\\quad f''(x)=6x-3",
          answer: "-1 < x < 2",
          hint: "Use f'(x)<0 for decreasing, and solve f''(x)=0 for the concavity change.",
          explanation:
            "The derivative is negative between its roots, so the function is decreasing on -1<x<2. Also f''(x)=0 at x=1/2, where concavity changes from down to up.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the bounded interval where the function is decreasing.", marks: 1, answer: "-1 < x < 2", acceptedAnswers: ["-1<x<2", "(-1, 2)", "(-1,2)"], hint: "For this upward-opening quadratic derivative, f'(x)<0 between the roots.", explanation: "The roots are -1 and 2, and f'(x)<0 between them, so the decreasing interval is -1<x<2." },
            { key: "b", label: "(b)", prompt: "Find the x-value where concavity can change.", marks: 1, answer: "1/2", acceptedAnswers: ["0.5", "x=1/2", "x=0.5"], hint: "Set f''(x)=0.", explanation: "6x-3=0 gives x=1/2." },
            { key: "c", label: "(c)", prompt: "State the concavity for x>1/2.", marks: 1, answer: "concave up", acceptedAnswers: ["concave upward", "upward concavity"], hint: "Test a value greater than 1/2 in f''(x).", explanation: "For x>1/2, f''(x)=6x-3>0, so the function is concave up." },
          ],
        },
        {
          id: "y11adv-id-exam-mp3",
          prompt: "For a curve, $f'(a)=0$, $f''(a)<0$, and $f(a)=5$.",
          latex: "f'(a)=0,\\quad f''(a)<0,\\quad f(a)=5",
          answer: "local maximum",
          hint: "Use the second derivative test, then state the range feature near the point.",
          explanation:
            "Since f'(a)=0 and f''(a)<0, the curve has a local maximum at x=a. The y-value there is 5, so the nearby range feature is a peak value of 5.",
          parts: [
            { key: "a", label: "(a)", prompt: "Classify the stationary point at x=a.", marks: 1, answer: "local maximum", acceptedAnswers: ["local max", "maximum", "max"], hint: "A negative second derivative at a stationary point means the curve bends down.", explanation: "f''(a)<0 at a stationary point, so x=a is a local maximum." },
            { key: "b", label: "(b)", prompt: "State the y-value of this local maximum.", marks: 1, answer: "5", acceptedAnswers: ["y=5", "f(a)=5"], hint: "Use the given function value.", explanation: "The question gives f(a)=5, so the local maximum has y-value 5." },
            { key: "c", label: "(c)", prompt: "State the concavity at x=a.", marks: 1, answer: "concave down", acceptedAnswers: ["concave downward", "downward concavity"], hint: "Use the sign of f''(a).", explanation: "Since f''(a)<0, the curve is concave down at x=a." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "chain-rule-basics") {
    const chainRuleWorkedExampleGraph: import("../types").CartesianGraph = {
      description:
        "y = (x+1)² shown as a parabola with its tangent line at x = 0. The tangent touches the curve at (0, 1) with gradient 2, illustrating how the chain rule gives the local steepness of a composite function.",
      xMin: -2.5, xMax: 2.5, yMin: -0.5, yMax: 6,
      xStep: 1, yStep: 1,
      parabolas: [
        { kind: "quadratic", a: 1, b: 2, c: 1, label: "y = (x+1)²" },
      ],
      lines: [
        { kind: "linear", m: 2, b: 1, xMin: -0.8, xMax: 1.5, label: "tangent at x = 0, gradient = 2" },
      ],
      points: [
        { x: 0, y: 1, label: "(0, 1)" },
      ],
    };

    return {
      ...base,
      description:
        "Differentiate composite polynomial functions of the form (ax+b)^n and (ax²+bx+c)^n using the chain rule.",
      learningIntention:
        "Learn how the chain rule extends differentiation to composite functions by identifying the inner and outer functions.",
      successCriteria: [
        "Identify the inner and outer function in a composite expression such as $(ax + b)^n$.",
        "Apply dy/dx = (dy/du)(du/dx) to differentiate (ax + b)^n.",
        "Differentiate $(ax^2 + bx + c)^n$ using the chain rule.",
        "Evaluate a chain-rule derivative at a given x-value to find the gradient.",
      ],
      teaching: {
        paragraphs: [
          "A composite function is a function inside another function. For example, $y = (2x + 3)^4$ has an outer function $u^4$ and an inner function $u = 2x + 3$.",
          "The chain rule says: to differentiate a composite, multiply the outer derivative by the inner derivative. In symbols, dy/dx = (dy/du)(du/dx).",
          "For $(ax + b)^n$, the outer derivative is $n(ax + b)^{n−1}$ and the inner derivative is $a$. The result is $na(ax + b)^{n−1}$.",
          "For $(ax^2 + bx + c)^n$, the inner derivative is more complex: it is the derivative of the expression inside. Differentiate the bracket first, then multiply.",
          "After finding the derivative function, you can substitute any x-value to find the gradient of the curve at that point.",
        ],
        latexBlocks: [
          "\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}",
          "\\frac{d}{dx}[(ax+b)^n]=na(ax+b)^{n-1}",
          "\\frac{d}{dx}[(f(x))^n]=n[f(x)]^{n-1}\\cdot f'(x)",
          "\\text{gradient at }x=a: \\left.\\frac{dy}{dx}\\right|_{x=a}",
        ],
      },
      workedExamples: [
        {
          title: "Chain rule for (ax + b)^n",
          questionLatex: "y=(2x+3)^4",
          cartesianGraph: chainRuleWorkedExampleGraph,
          steps: [
            { explanation: "Identify the inner function u.", latex: "u=2x+3,\\quad \\frac{du}{dx}=2" },
            { explanation: "Differentiate the outer function with respect to u.", latex: "\\frac{dy}{du}=4u^3=4(2x+3)^3" },
            { explanation: "Apply the chain rule: multiply inner by outer derivative.", latex: "\\frac{dy}{dx}=4(2x+3)^3\\times 2" },
          ],
          finalAnswerLatex: "\\frac{dy}{dx}=8(2x+3)^3",
        },
        {
          title: "Chain rule with a quadratic inner function",
          questionLatex: "y=(x^2+1)^3",
          steps: [
            { explanation: "Identify the inner function and its derivative.", latex: "u=x^2+1,\\quad \\frac{du}{dx}=2x" },
            { explanation: "Differentiate the outer function.", latex: "\\frac{dy}{du}=3u^2=3(x^2+1)^2" },
            { explanation: "Multiply the two derivatives together.", latex: "\\frac{dy}{dx}=3(x^2+1)^2\\times 2x" },
          ],
          finalAnswerLatex: "\\frac{dy}{dx}=6x(x^2+1)^2",
        },
        {
          title: "Evaluate a chain-rule derivative at a point",
          questionLatex: "y=(3x-1)^2,\\quad \\text{find the gradient at }x=2.",
          steps: [
            { explanation: "Apply the chain rule: inner derivative is 3.", latex: "\\frac{dy}{dx}=2(3x-1)\\times 3=6(3x-1)" },
            { explanation: "Substitute x = 2.", latex: "\\frac{dy}{dx}\\bigg|_{x=2}=6(3(2)-1)=6(5)" },
          ],
          finalAnswerLatex: "30",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-chain-g1", "For $y = (5x+2)^3$, identify the inner function $u$.", "A", ["$u=5x+2$", "$u=x^3$", "$u=5x$", "$u=3x$"], "The inner function is the expression inside the bracket.", "y=(5x+2)^3"),
        formulaAnswer("y11adv-chain-g2", "Differentiate using the chain rule.", "(4x-1)^3", "12(4x-1)^2", ["12(4x-1)^2"]),
        formulaAnswer("y11adv-chain-g3", "Differentiate using the chain rule.", "(x^2+2)^2", "4x(x^2+2)", ["4x(x^2+2)", "4x(x^2 + 2)"]),
        practicalChoice("y11adv-chain-g4", "Which is the correct derivative of $y = (3x+1)^4$?", "B", ["$4(3x+1)^3$", "$12(3x+1)^3$", "$3(3x+1)^3$", "$4(3x+1)^4$"], "The inner derivative is 3; multiply by the outer derivative $4(3x+1)^3$ to get $12(3x+1)^3$.", "y=(3x+1)^4"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-chain-i1", "Differentiate using the chain rule.", "(2x+5)^4", "8(2x+5)^3", ["8(2x+5)^3"]),
        formulaAnswer("y11adv-chain-i2", "Differentiate using the chain rule.", "(x^2-3)^3", "6x(x^2-3)^2", ["6x(x^2-3)^2", "6x(x^2 - 3)^2"]),
        formulaAnswer("y11adv-chain-i3", "Find the gradient at the given x-value using the chain rule.", "y=(x+2)^3,\\quad x=-1", "3", ["gradient = 3", "m=3"]),
        practicalChoice("y11adv-chain-i4", "A student writes the derivative of $y = (5x-2)^3$ as $3(5x-2)^2$. What is missing?", "A", ["The inner derivative (factor of 5) was not multiplied in", "The power should be 2, not 3", "The sign should be negative", "The coefficient 3 is wrong"], "The chain rule requires multiplying by the inner derivative, which is 5 here.", "y=(5x-2)^3"),
        formulaAnswer("y11adv-chain-i5", "Differentiate using the chain rule.", "(3x^2-1)^2", "12x(3x^2-1)", ["12x(3x^2-1)", "12x(3x^2 - 1)"]),
      ],
      commonMistakes: [
        { mistake: "Forgetting to multiply by the inner derivative.", fix: "Always multiply the outer derivative by the derivative of the expression inside the bracket." },
        { mistake: "Applying the power rule directly without the chain rule factor.", fix: "For (2x+3)^4, the answer is 8(2x+3)^3, not 4(2x+3)^3." },
        { mistake: "Differentiating the inner function instead of multiplying by it.", fix: "Write out dy/du and du/dx separately before multiplying." },
        { mistake: "Confusing the inner function with the outer function.", fix: "The outer function acts on the bracket; the inner function is the expression inside." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-chain-m1", "Differentiate using the chain rule.", "(3x+2)^5", "15(3x+2)^4", ["15(3x+2)^4"]),
        formulaAnswer("y11adv-chain-m2", "Differentiate using the chain rule.", "(x^2+1)^4", "8x(x^2+1)^3", ["8x(x^2+1)^3", "8x(x^2 + 1)^3"]),
        formulaAnswer("y11adv-chain-m3", "Find the gradient at the given x-value using the chain rule.", "y=(2x-1)^3,\\quad x=1", "6", ["m=6", "gradient=6"]),
        practicalChoice("y11adv-chain-m4", "Which is the correct derivative of $y = (5x-3)^4$?", "C", ["$4(5x-3)^3$", "$5(5x-3)^3$", "$20(5x-3)^3$", "$20(5x-3)^4$"], "Inner derivative is 5; outer derivative is $4(5x-3)^3$; product is $20(5x-3)^3$.", "y=(5x-3)^4"),
        formulaAnswer("y11adv-chain-m5", "Differentiate using the chain rule.", "(2x+7)^3", "6(2x+7)^2", ["6(2x+7)^2"]),
        formulaAnswer("y11adv-chain-m6", "Differentiate using the chain rule.", "(x^2-1)^3", "6x(x^2-1)^2", ["6x(x^2-1)^2", "6x(x^2 - 1)^2"]),
        practicalChoice("y11adv-chain-m7", "A student writes the derivative of $y = (2x+1)^3$ as $3(2x+1)^2$. Which step is incomplete?", "B", ["The exponent should remain as 3", "The inner derivative (factor of 2) was not multiplied in", "The coefficient 3 is incorrect", "The base should be squared"], "Chain rule requires multiplying by the inner derivative, which is 2 for u = 2x+1.", "y=(2x+1)^3"),
        formulaAnswer("y11adv-chain-m8", "Find the gradient at the given x-value using the chain rule.", "y=(x^2+4)^2,\\quad x=1", "20", ["gradient=20", "m=20"]),
        formulaAnswer("y11adv-chain-m9", "Differentiate using the chain rule.", "(2x^2+3)^3", "12x(2x^2+3)^2", ["12x(2x^2+3)^2", "12x(2x^2 + 3)^2"]),
        practicalChoice("y11adv-chain-m10", "For $y = (3x-1)^4$, $dy/dx = 0$ at $x = 1/3$. What does this mean about the tangent there?", "C", ["The tangent is vertical", "The function is undefined at x = 1/3", "The tangent is horizontal", "The function is constant everywhere"], "A zero derivative means the tangent is horizontal at that point.", "y=(3x-1)^4"),
      ],
      masteryQuizPool: [
        { id: "y11adv-chain-p1", prompt: "For $y=(5x+2)^3$, identify the inner function $u$.", latex: "y=(5x+2)^3", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$u=5x+2$" }, { label: "B", text: "$u=x^3$" }, { label: "C", text: "$u=5x$" }, { label: "D", text: "$u=3x$" }], hint: "The inner function is inside the bracket.", explanation: "The inner function is the bracket $u=5x+2$." },
        { id: "y11adv-chain-p2", prompt: "Differentiate using the chain rule.", latex: "(4x-1)^3", answer: "12(4x-1)^2", difficulty: 1, acceptedAnswers: ["12(4x-1)^2"], hint: "Inner derivative is $4$.", explanation: "$3(4x-1)^2\\cdot4=12(4x-1)^2$." },
        { id: "y11adv-chain-p3", prompt: "Differentiate using the chain rule.", latex: "(2x+7)^3", answer: "6(2x+7)^2", difficulty: 1, acceptedAnswers: ["6(2x+7)^2"], hint: "Inner derivative is $2$.", explanation: "$3(2x+7)^2\\cdot2=6(2x+7)^2$." },
        { id: "y11adv-chain-p4", prompt: "Differentiate using the chain rule.", latex: "(3x+2)^5", answer: "15(3x+2)^4", difficulty: 1, acceptedAnswers: ["15(3x+2)^4"], hint: "Inner derivative is $3$.", explanation: "$5(3x+2)^4\\cdot3=15(3x+2)^4$." },
        { id: "y11adv-chain-p5", prompt: "Which is the correct derivative of $y=(3x+1)^4$?", latex: "y=(3x+1)^4", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$4(3x+1)^3$" }, { label: "B", text: "$12(3x+1)^3$" }, { label: "C", text: "$3(3x+1)^3$" }, { label: "D", text: "$4(3x+1)^4$" }], hint: "Multiply by the inner derivative $3$.", explanation: "$4(3x+1)^3\\cdot3=12(3x+1)^3$." },
        { id: "y11adv-chain-p6", prompt: "Differentiate using the chain rule.", latex: "(2x+5)^4", answer: "8(2x+5)^3", difficulty: 2, acceptedAnswers: ["8(2x+5)^3"], hint: "Inner derivative is $2$.", explanation: "$4(2x+5)^3\\cdot2=8(2x+5)^3$." },
        { id: "y11adv-chain-p7", prompt: "Differentiate using the chain rule.", latex: "(x^2+2)^2", answer: "4x(x^2+2)", difficulty: 2, acceptedAnswers: ["4x(x^2+2)", "4x(x^2 + 2)"], hint: "Inner derivative is $2x$.", explanation: "$2(x^2+2)\\cdot2x=4x(x^2+2)$." },
        { id: "y11adv-chain-p8", prompt: "Differentiate using the chain rule.", latex: "(x^2-3)^3", answer: "6x(x^2-3)^2", difficulty: 2, acceptedAnswers: ["6x(x^2-3)^2", "6x(x^2 - 3)^2"], hint: "Inner derivative is $2x$.", explanation: "$3(x^2-3)^2\\cdot2x=6x(x^2-3)^2$." },
        { id: "y11adv-chain-p9", prompt: "Differentiate using the chain rule.", latex: "(3x^2-1)^2", answer: "12x(3x^2-1)", difficulty: 2, acceptedAnswers: ["12x(3x^2-1)", "12x(3x^2 - 1)"], hint: "Inner derivative is $6x$.", explanation: "$2(3x^2-1)\\cdot6x=12x(3x^2-1)$." },
        { id: "y11adv-chain-p10", prompt: "Which is the correct derivative of $y=(5x-3)^4$?", latex: "y=(5x-3)^4", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$4(5x-3)^3$" }, { label: "B", text: "$5(5x-3)^3$" }, { label: "C", text: "$20(5x-3)^3$" }, { label: "D", text: "$20(5x-3)^4$" }], hint: "Inner derivative is $5$.", explanation: "$4(5x-3)^3\\cdot5=20(5x-3)^3$." },
        { id: "y11adv-chain-p11", prompt: "Find the gradient at the given $x$-value using the chain rule.", latex: "y=(2x-1)^3,\\quad x=1", answer: "6", difficulty: 3, acceptedAnswers: ["m=6", "gradient=6"], hint: "$\\frac{dy}{dx}=6(2x-1)^2$; substitute $x=1$.", explanation: "$\\frac{dy}{dx}=3(2x-1)^2\\cdot2=6(2x-1)^2$; at $x=1$ it is $6(1)=6$." },
        { id: "y11adv-chain-p12", prompt: "Find the gradient at the given $x$-value using the chain rule.", latex: "y=(x^2+4)^2,\\quad x=1", answer: "20", difficulty: 3, acceptedAnswers: ["m=20", "gradient=20"], hint: "$\\frac{dy}{dx}=4x(x^2+4)$; substitute $x=1$.", explanation: "$\\frac{dy}{dx}=2(x^2+4)\\cdot2x=4x(x^2+4)$; at $x=1$ it is $4(5)=20$." },
        { id: "y11adv-chain-p13", prompt: "Differentiate using the chain rule.", latex: "(2x^2+3)^3", answer: "12x(2x^2+3)^2", difficulty: 3, acceptedAnswers: ["12x(2x^2+3)^2", "12x(2x^2 + 3)^2"], hint: "Inner derivative is $4x$.", explanation: "$3(2x^2+3)^2\\cdot4x=12x(2x^2+3)^2$." },
        { id: "y11adv-chain-p14", prompt: "A student writes the derivative of $y=(5x-2)^3$ as $3(5x-2)^2$. What is missing?", latex: "y=(5x-2)^3", answer: "A", difficulty: 3, choices: [{ label: "A", text: "The inner derivative (factor of 5) was not multiplied in" }, { label: "B", text: "The power should be 2, not 3" }, { label: "C", text: "The sign should be negative" }, { label: "D", text: "The coefficient 3 is wrong" }], hint: "Chain rule needs the inner derivative.", explanation: "The factor of $5$ (the inner derivative) is missing; the answer is $15(5x-2)^2$." },
        { id: "y11adv-chain-p15", prompt: "Find the gradient at the given $x$-value using the chain rule.", latex: "y=(x+2)^3,\\quad x=-1", answer: "3", difficulty: 3, acceptedAnswers: ["m=3", "gradient=3"], hint: "$\\frac{dy}{dx}=3(x+2)^2$; substitute $x=-1$.", explanation: "$\\frac{dy}{dx}=3(x+2)^2$; at $x=-1$ it is $3(1)^2=3$." },
        { id: "y11adv-chain-p16", prompt: "Differentiate using the chain rule.", latex: "(x^2+1)^4", answer: "8x(x^2+1)^3", difficulty: 2, acceptedAnswers: ["8x(x^2+1)^3", "8x(x^2 + 1)^3"], hint: "Inner derivative is $2x$.", explanation: "$4(x^2+1)^3\\cdot2x=8x(x^2+1)^3$." },
        { id: "y11adv-chain-p17", prompt: "Differentiate using the chain rule.", latex: "(x^2-1)^3", answer: "6x(x^2-1)^2", difficulty: 2, acceptedAnswers: ["6x(x^2-1)^2", "6x(x^2 - 1)^2"], hint: "Inner derivative is $2x$.", explanation: "$3(x^2-1)^2\\cdot2x=6x(x^2-1)^2$." },
        { id: "y11adv-chain-p18", prompt: "A student writes the derivative of $y=(2x+1)^3$ as $3(2x+1)^2$. Which step is incomplete?", latex: "y=(2x+1)^3", answer: "B", difficulty: 2, choices: [{ label: "A", text: "The exponent should remain as 3" }, { label: "B", text: "The inner derivative (factor of 2) was not multiplied in" }, { label: "C", text: "The coefficient 3 is incorrect" }, { label: "D", text: "The base should be squared" }], hint: "Inner derivative of $2x+1$ is $2$.", explanation: "The factor of $2$ is missing; the answer is $6(2x+1)^2$." },
        { id: "y11adv-chain-p19", prompt: "Differentiate using the chain rule.", latex: "(4x+3)^2", answer: "8(4x+3)", difficulty: 2, acceptedAnswers: ["8(4x+3)"], hint: "Inner derivative is $4$.", explanation: "$2(4x+3)\\cdot4=8(4x+3)$." },
        { id: "y11adv-chain-p20", prompt: "For $y=(3x-1)^4$, $\\frac{dy}{dx}=0$ at $x=\\frac13$. What does this mean about the tangent there?", latex: "y=(3x-1)^4", answer: "C", difficulty: 3, choices: [{ label: "A", text: "The tangent is vertical" }, { label: "B", text: "The function is undefined at $x=\\frac13$" }, { label: "C", text: "The tangent is horizontal" }, { label: "D", text: "The function is constant everywhere" }], hint: "Zero gradient means flat.", explanation: "A zero derivative means a horizontal tangent." },
        { id: "y11adv-chain-p21", prompt: "Find the gradient at the given $x$-value using the chain rule.", latex: "y=(2x-3)^4,\\quad x=2", answer: "8", difficulty: 4, acceptedAnswers: ["m=8", "gradient=8"], hint: "$\\frac{dy}{dx}=8(2x-3)^3$; substitute $x=2$.", explanation: "$\\frac{dy}{dx}=4(2x-3)^3\\cdot2=8(2x-3)^3$; at $x=2$, $2x-3=1$, so $8(1)=8$." },
        { id: "y11adv-chain-p22", prompt: "Find the gradient at the given $x$-value using the chain rule. Give the value with its sign.", latex: "y=(x^2-3)^2,\\quad x=1", answer: "-8", difficulty: 4, acceptedAnswers: ["-8", "−8", "m=-8"], hint: "$\\frac{dy}{dx}=4x(x^2-3)$; substitute $x=1$.", explanation: "$\\frac{dy}{dx}=2(x^2-3)\\cdot2x=4x(x^2-3)$; at $x=1$ it is $4(-2)=-8$." },
        { id: "y11adv-chain-p23", prompt: "Find the gradient at the given $x$-value using the chain rule.", latex: "y=(x^2+1)^3,\\quad x=1", answer: "24", difficulty: 5, acceptedAnswers: ["m=24", "gradient=24"], hint: "$\\frac{dy}{dx}=6x(x^2+1)^2$; substitute $x=1$.", explanation: "$\\frac{dy}{dx}=3(x^2+1)^2\\cdot2x=6x(x^2+1)^2$; at $x=1$ it is $6(4)=24$." },
        { id: "y11adv-chain-p24", prompt: "Find the $x$-value where $y=(2x-6)^3$ has a horizontal tangent.", latex: "y=(2x-6)^3", answer: "3", difficulty: 4, acceptedAnswers: ["x=3"], hint: "$\\frac{dy}{dx}=6(2x-6)^2=0$ when $2x-6=0$.", explanation: "$\\frac{dy}{dx}=6(2x-6)^2=0$ gives $2x-6=0$, so $x=3$." },
        { id: "y11adv-chain-p25", prompt: "Differentiate using the chain rule, then find the gradient at $x=0$.", latex: "y=(x^2+2)^2,\\quad x=0", answer: "0", difficulty: 4, acceptedAnswers: ["m=0"], hint: "$\\frac{dy}{dx}=4x(x^2+2)$; substitute $x=0$.", explanation: "$\\frac{dy}{dx}=4x(x^2+2)$; at $x=0$ it is $0$." },
        { id: "y11adv-chain-p26", prompt: "Find the gradient at the given $x$-value using the chain rule.", latex: "y=(x^2-2x)^2,\\quad x=3", answer: "24", difficulty: 5, acceptedAnswers: ["m=24"], hint: "$\\frac{dy}{dx}=2(x^2-2x)(2x-2)$; substitute $x=3$.", explanation: "At $x=3$: $x^2-2x=3$ and $2x-2=4$, so $\\frac{dy}{dx}=2(3)(4)=24$." },
        { id: "y11adv-chain-p27", prompt: "Find the gradient of $y=(3x^2-2)^3$ at $x=1$.", latex: "y=(3x^2-2)^3,\\quad x=1", answer: "18", difficulty: 5, acceptedAnswers: ["m=18"], hint: "$\\frac{dy}{dx}=3(3x^2-2)^2\\cdot6x$; substitute $x=1$.", explanation: "At $x=1$: $3x^2-2=1$ and $6x=6$, so $\\frac{dy}{dx}=3(1)(6)=18$." },
        { id: "y11adv-chain-p28", prompt: "The tangent to $y=(x-1)^3$ is horizontal at one $x$-value. Find it.", latex: "y=(x-1)^3", answer: "1", difficulty: 5, acceptedAnswers: ["x=1"], hint: "$\\frac{dy}{dx}=3(x-1)^2=0$.", explanation: "$3(x-1)^2=0$ gives $x=1$." },
        { id: "y11adv-chain-p29", prompt: "Find the gradient of $y=(2x+1)^4$ at $x=0$.", latex: "y=(2x+1)^4,\\quad x=0", answer: "8", difficulty: 5, acceptedAnswers: ["m=8"], hint: "$\\frac{dy}{dx}=8(2x+1)^3$; substitute $x=0$.", explanation: "$\\frac{dy}{dx}=4(2x+1)^3\\cdot2=8(2x+1)^3$; at $x=0$ it is $8(1)=8$." },
        { id: "y11adv-chain-p30", prompt: "Find the value of $k$ if $y=(kx+1)^2$ has gradient $12$ at $x=0$.", latex: "y=(kx+1)^2,\\quad \\frac{dy}{dx}=12\\text{ at }x=0", answer: "6", difficulty: 5, acceptedAnswers: ["k=6"], hint: "$\\frac{dy}{dx}=2k(kx+1)$; at $x=0$ it is $2k$.", explanation: "$\\frac{dy}{dx}=2(kx+1)\\cdot k=2k(kx+1)$; at $x=0$ it is $2k=12$, so $k=6$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-chain-mp1",
          prompt: "Consider the composite function $y=(2x+1)^3$.",
          latex: "y=(2x+1)^3",
          answer: "2",
          hint: "Identify the inner derivative, differentiate, then evaluate at $x=1$.",
          explanation: "(a) The inner derivative is $\\frac{du}{dx}=2$. (b) $\\frac{dy}{dx}=6(2x+1)^2$. (c) At $x=1$, $2x+1=3$, so $\\frac{dy}{dx}=6(9)=54$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the inner derivative $\\frac{du}{dx}$ for $u=2x+1$.", marks: 1, answer: "2", acceptedAnswers: ["du/dx=2"], hint: "Differentiate $2x+1$.", explanation: "$\\frac{d}{dx}(2x+1)=2$." },
            { key: "b", label: "(b)", prompt: "The derivative is $\\frac{dy}{dx}=k(2x+1)^2$. Find the coefficient $k$.", marks: 1, answer: "6", acceptedAnswers: ["k=6"], hint: "$k$ = power times inner derivative.", explanation: "$\\frac{dy}{dx}=3(2x+1)^2\\cdot2=6(2x+1)^2$, so $k=6$." },
            { key: "c", label: "(c)", prompt: "Find the gradient at $x=1$.", marks: 2, answer: "54", acceptedAnswers: ["m=54"], hint: "Substitute $x=1$ into $6(2x+1)^2$.", explanation: "At $x=1$, $2x+1=3$, so $6(3)^2=6(9)=54$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "stationary-points-first-derivative-test") {
    const cubicCurvePoints = Array.from({ length: 81 }, (_, index) => {
      const x = -2.5 + (5 * index) / 80;
      return { x, y: x * x * x - 3 * x };
    });
    const cubicStatGraph: import("../types").CartesianGraph = {
      description:
        "Graph of f(x) = x³ − 3x. The local maximum at (−1, 2) and local minimum at (1, −2) are marked. The curve rises before x = −1, falls between x = −1 and x = 1, then rises again — matching the sign diagram of f'(x).",
      xMin: -2.5, xMax: 2.5, yMin: -3, yMax: 3,
      xStep: 1, yStep: 1,
      lineSegments: cubicCurvePoints.slice(1).map((point, index) => ({
        from: cubicCurvePoints[index],
        to: point,
      })),
      points: [
        { x: -1, y: 2, label: "Local max (−1, 2)" },
        { x: 1, y: -2, label: "Local min (1, −2)" },
      ],
    };

    return {
      ...base,
      description:
        "Find and classify stationary points of polynomial functions using f'(x) = 0 and the first derivative sign test.",
      learningIntention:
        "Learn how to locate stationary points, apply the first derivative test to classify them, and identify intervals of increase and decrease.",
      successCriteria: [
        "Find stationary points by solving f'(x) = 0.",
        "Construct a sign diagram for f'(x) around a stationary point.",
        "Classify stationary points as local maximum, local minimum, or horizontal inflection.",
        "State intervals where f is increasing or decreasing.",
      ],
      teaching: {
        paragraphs: [
          "A stationary point is a point on the curve where the tangent is horizontal, so the derivative equals zero there.",
          "To find stationary points: differentiate f(x) to get f'(x), set f'(x) = 0, and solve for x. Then substitute each x-value back into f(x) to find the y-coordinates.",
          "The first derivative test classifies each stationary point using a sign diagram. Choose x-values on each side of the stationary point and evaluate the sign of f'(x) there.",
          "If f'(x) changes from positive to negative (+ → 0 → −), the curve rises then falls: a local maximum. If it changes from negative to positive (− → 0 → +), the curve falls then rises: a local minimum. If the sign does not change, it is a horizontal point of inflection.",
          "A function is increasing on an interval where f'(x) > 0 and decreasing where f'(x) < 0.",
        ],
        latexBlocks: [
          "\\text{stationary points: solve }f'(x)=0",
          "\\text{local max: }f'(x)>0\\to0\\to f'(x)<0",
          "\\text{local min: }f'(x)<0\\to0\\to f'(x)>0",
          "\\text{increasing: }f'(x)>0;\\quad\\text{decreasing: }f'(x)<0",
        ],
      },
      workedExamples: [
        {
          title: "Find stationary points",
          questionLatex: "f(x)=x^3-3x",
          cartesianGraph: cubicStatGraph,
          steps: [
            { explanation: "Differentiate to get f'(x).", latex: "f'(x)=3x^2-3" },
            { explanation: "Set f'(x) = 0 and solve.", latex: "3x^2-3=0\\Rightarrow x^2=1\\Rightarrow x=\\pm1" },
            { explanation: "Find the y-coordinates.", latex: "f(-1)=2,\\quad f(1)=-2" },
          ],
          finalAnswerLatex: "\\text{Stationary points at }(-1,\\,2)\\text{ and }(1,\\,-2)",
        },
        {
          title: "Classify using a sign diagram",
          questionLatex: "f(x)=x^3-3x,\\quad f'(x)=3x^2-3",
          steps: [
            { explanation: "Test a value to the left of x = −1: try x = −2.", latex: "f'(-2)=3(4)-3=9>0\\;(\\text{positive})" },
            { explanation: "Test a value between the two stationary points: try x = 0.", latex: "f'(0)=-3<0\\;(\\text{negative})" },
            { explanation: "Test a value to the right of x = 1: try x = 2.", latex: "f'(2)=9>0\\;(\\text{positive})" },
            { explanation: "Apply the sign diagram: + → 0 → − at x = −1 means a local max; − → 0 → + at x = 1 means a local min.", latex: "\\text{Local max at }(-1,\\,2);\\quad\\text{Local min at }(1,\\,-2)" },
          ],
          finalAnswerLatex: "\\text{Local max }(-1,\\,2),\\quad\\text{Local min }(1,\\,-2)",
        },
        {
          title: "State intervals of increase and decrease",
          questionLatex: "f(x)=x^3-3x",
          steps: [
            { explanation: "f is increasing where f'(x) > 0: outside the stationary points.", latex: "x<-1\\text{ and }x>1" },
            { explanation: "f is decreasing where f'(x) < 0: between the stationary points.", latex: "-1<x<1" },
          ],
          finalAnswerLatex: "\\text{Increasing: }x<-1\\text{ or }x>1;\\quad\\text{Decreasing: }-1<x<1",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-stat-g1", "Find the x-value of the stationary point for the function.", "f(x)=x^2-4x+1", "2", ["x=2"]),
        formulaAnswer("y11adv-stat-g2", "Find the y-coordinate of the stationary point at x = 2.", "f(x)=x^2-4x+1", "-3", ["y=-3", "f(2)=-3"]),
        practicalChoice("y11adv-stat-g3", "For f(x)=x^2−4x+1, f'(1)=−2 and f'(3)=2. Classify the stationary point at x=2.", "C", ["Horizontal inflection", "Local maximum", "Local minimum", "Not a stationary point"], "f' goes from negative to positive at x=2, so it is a local minimum.", "\\text{Sign diagram at }x=2"),
        practicalChoice("y11adv-stat-g4", "On an interval where f'(x) > 0, what is true about f(x)?", "C", ["f is decreasing", "f has a stationary point", "f is increasing", "f has a local maximum"], "A positive derivative means the function is increasing on that interval.", "f'(x)>0"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-stat-i1", "Find the x-values of all stationary points for the function. Give answers in ascending order, separated by a comma.", "f(x)=x^3-3x", "-1, 1", ["x=-1,1", "x=-1 and x=1", "-1 and 1", "x = -1, 1"]),
        practicalChoice("y11adv-stat-i2", "Classify the stationary point of f(x) = −x² + 4x + 1 at x = 2 using the first derivative test.", "A", ["Local maximum", "Local minimum", "Horizontal inflection", "Not a stationary point"], "f' changes from positive to negative at x=2, confirming a local maximum.", "f'(x)=-2x+4,\\quad f'(1)=2,\\quad f'(3)=-2"),
        practicalChoice("y11adv-stat-i3", "For f(x)=x^3−3x, f'(−2)=9 > 0 and f'(0)=−3 < 0. Classify the stationary point at x=−1.", "C", ["Local minimum", "Horizontal inflection", "Local maximum", "Not classified from this information"], "f' changes from positive to negative at x=−1, so it is a local maximum.", "\\text{Sign at }x=-1"),
        formulaAnswer("y11adv-stat-i4", "State the interval where f(x) = x^2 − 4x + 1 is increasing.", "f(x)=x^2-4x+1", "x > 2", ["x>2", "x \\gt 2", "x \\geq 2"]),
        practicalChoice("y11adv-stat-i5", "For f(x)=x^3−6x^2+9x, stationary points are at x=1 and x=3. On 1 < x < 3, f'(x) < 0. What does this tell you?", "C", ["f is increasing on this interval", "There is an inflection at x=2", "f is decreasing on this interval", "Both stationary points are local maxima"], "A negative derivative on the interval means f is decreasing there.", "f'(x)<0\\text{ for }1<x<3"),
      ],
      commonMistakes: [
        { mistake: "Forgetting to substitute back into f(x) to find y-coordinates.", fix: "Once you have x, find f(x) to complete the coordinates of the stationary point." },
        { mistake: "Using the y-value instead of the derivative sign to classify.", fix: "Classification comes from the sign of f'(x) on each side, not from the height of the point." },
        { mistake: "Testing only one side of the stationary point in the sign diagram.", fix: "Always test values on both sides to determine whether the sign changes direction." },
        { mistake: "Calling every point where f'(x) = 0 a maximum or minimum.", fix: "If the sign of f'(x) does not change, the stationary point is a horizontal point of inflection." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-stat-m1", "Find the x-value of the stationary point for the function.", "f(x)=x^2+6x+5", "-3", ["x=-3"]),
        formulaAnswer("y11adv-stat-m2", "Find the y-coordinate of the stationary point at x = −3.", "f(x)=x^2+6x+5", "-4", ["y=-4", "f(-3)=-4"]),
        practicalChoice("y11adv-stat-m3", "For f(x)=x^2+6x+5, f'(−4)<0 and f'(−2)>0 at x=−3. Classify this stationary point.", "D", ["Local maximum", "Horizontal inflection", "Not a stationary point", "Local minimum"], "f' goes from negative to positive at x=−3, so it is a local minimum.", "\\text{Sign diagram at }x=-3"),
        formulaAnswer("y11adv-stat-m4", "Find the x-values of the stationary points for the function. Give answers in ascending order, separated by a comma.", "f(x)=2x^3-3x^2-12x", "-1, 2", ["x=-1,2", "x=-1 and x=2", "-1 and 2", "x = -1, 2"]),
        practicalChoice("y11adv-stat-m5", "On which interval is f(x) = −x² + 4x decreasing?", "A", ["$x>2$", "$x<2$", "All real x", "$x<0$"], "f'(x)=−2x+4 < 0 when x > 2, so f is decreasing there.", "f'(x)=-2x+4"),
        formulaAnswer("y11adv-stat-m6", "Find the y-value of the local maximum of f(x) = x^3 − 3x at x = −1.", "f(x)=x^3-3x,\\quad x=-1", "2", ["f(-1)=2", "y=2"]),
        practicalChoice("y11adv-stat-m7", "At x=1, f(x)=x^3−3x has a stationary point. f'(0)=−3<0 and f'(2)=9>0. Classify it.", "C", ["Local maximum", "Horizontal inflection", "Local minimum", "Global maximum"], "f' changes from negative to positive at x=1, so it is a local minimum.", "\\text{Sign diagram at }x=1"),
        formulaAnswer("y11adv-stat-m8", "State the interval where f(x) = x^3 − 3x is increasing for x > 0.", "f(x)=x^3-3x,\\quad x>0", "x > 1", ["x>1", "(1, \\infty)"]),
        formulaAnswer("y11adv-stat-m9", "Find the x-values of the stationary points for the function. Give answers in ascending order, separated by a comma.", "f(x)=-x^3+3x^2", "0, 2", ["x=0,2", "x=0 and x=2", "0 and 2", "x = 0, 2"]),
        practicalChoice("y11adv-stat-m10", "A curve is rising, reaches a peak, then falls. Which statement best describes the peak?", "B", ["The y-intercept of the curve", "A local maximum", "A local minimum", "A point of inflection"], "A peak where the curve stops rising and starts falling is a local maximum.", "\\text{Graph shape}"),
      ],
      masteryQuizPool: [
        { id: "y11adv-stat-p1", prompt: "Find the $x$-value of the stationary point for the function.", latex: "f(x)=x^2-4x+1", answer: "2", difficulty: 1, acceptedAnswers: ["x=2"], hint: "Set $f'(x)=0$.", explanation: "$f'(x)=2x-4=0$ gives $x=2$." },
        { id: "y11adv-stat-p2", prompt: "Find the $x$-value of the stationary point for the function. Give the value with its sign.", latex: "f(x)=x^2+6x+5", answer: "-3", difficulty: 1, acceptedAnswers: ["-3", "−3", "x=-3"], hint: "Set $f'(x)=0$.", explanation: "$f'(x)=2x+6=0$ gives $x=-3$." },
        { id: "y11adv-stat-p3", prompt: "Find the $y$-coordinate of the stationary point at $x=2$. Give the value with its sign.", latex: "f(x)=x^2-4x+1", answer: "-3", difficulty: 1, acceptedAnswers: ["-3", "−3", "y=-3", "f(2)=-3"], hint: "Substitute $x=2$ into $f(x)$.", explanation: "$f(2)=4-8+1=-3$." },
        { id: "y11adv-stat-p4", prompt: "On an interval where $f'(x)>0$, what is true about $f(x)$?", latex: "f'(x)>0", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$f$ is decreasing" }, { label: "B", text: "$f$ has a stationary point" }, { label: "C", text: "$f$ is increasing" }, { label: "D", text: "$f$ has a local maximum" }], hint: "Positive gradient means rising.", explanation: "A positive derivative means $f$ is increasing." },
        { id: "y11adv-stat-p5", prompt: "Find the $x$-value of the stationary point for the function.", latex: "f(x)=x^2-10x+3", answer: "5", difficulty: 1, acceptedAnswers: ["x=5"], hint: "Set $f'(x)=0$.", explanation: "$f'(x)=2x-10=0$ gives $x=5$." },
        { id: "y11adv-stat-p6", prompt: "Find the $x$-values of all stationary points. Give answers in ascending order, separated by a comma.", latex: "f(x)=x^3-3x", answer: "-1, 1", difficulty: 2, acceptedAnswers: ["x=-1,1", "-1 and 1", "x = -1, 1"], hint: "Solve $f'(x)=0$.", explanation: "$f'(x)=3x^2-3=0$ gives $x=\\pm1$." },
        { id: "y11adv-stat-p7", prompt: "Classify the stationary point of $f(x)=-x^2+4x+1$ at $x=2$ using the first derivative test.", latex: "f'(x)=-2x+4,\\quad f'(1)=2,\\quad f'(3)=-2", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Local minimum" }, { label: "C", text: "Horizontal inflection" }, { label: "D", text: "Not a stationary point" }], hint: "$f'$ changes from positive to negative.", explanation: "$f'$ goes $+\\to0\\to-$, so it is a local maximum." },
        { id: "y11adv-stat-p8", prompt: "State the interval where $f(x)=x^2-4x+1$ is increasing.", latex: "f(x)=x^2-4x+1", answer: "x > 2", difficulty: 2, acceptedAnswers: ["x>2", "(2, \\infty)"], hint: "$f'(x)>0$.", explanation: "$f'(x)=2x-4>0$ gives $x>2$." },
        { id: "y11adv-stat-p9", prompt: "For $f(x)=x^3-3x$, $f'(-2)=9>0$ and $f'(0)=-3<0$. Classify the stationary point at $x=-1$.", latex: "\\text{Sign at }x=-1", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Local minimum" }, { label: "B", text: "Horizontal inflection" }, { label: "C", text: "Local maximum" }, { label: "D", text: "Not classified" }], hint: "$f'$ changes from positive to negative.", explanation: "$f'$ goes $+\\to0\\to-$ at $x=-1$, a local maximum." },
        { id: "y11adv-stat-p10", prompt: "Find the $y$-coordinate of the stationary point at $x=-3$. Give the value with its sign.", latex: "f(x)=x^2+6x+5", answer: "-4", difficulty: 2, acceptedAnswers: ["-4", "−4", "y=-4", "f(-3)=-4"], hint: "Substitute $x=-3$.", explanation: "$f(-3)=9-18+5=-4$." },
        { id: "y11adv-stat-p11", prompt: "Find the $x$-values of the stationary points. Give answers in ascending order, separated by a comma.", latex: "f(x)=2x^3-3x^2-12x", answer: "-1, 2", difficulty: 3, acceptedAnswers: ["x=-1,2", "-1 and 2", "x = -1, 2"], hint: "Solve $f'(x)=0$ and factorise.", explanation: "$f'(x)=6x^2-6x-12=6(x-2)(x+1)=0$ gives $x=-1,2$." },
        { id: "y11adv-stat-p12", prompt: "Find the $x$-values of the stationary points. Give answers in ascending order, separated by a comma.", latex: "f(x)=-x^3+3x^2", answer: "0, 2", difficulty: 3, acceptedAnswers: ["x=0,2", "0 and 2", "x = 0, 2"], hint: "Solve $f'(x)=0$.", explanation: "$f'(x)=-3x^2+6x=-3x(x-2)=0$ gives $x=0,2$." },
        { id: "y11adv-stat-p13", prompt: "On which interval is $f(x)=-x^2+4x$ decreasing?", latex: "f'(x)=-2x+4", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$x>2$" }, { label: "B", text: "$x<2$" }, { label: "C", text: "All real $x$" }, { label: "D", text: "$x<0$" }], hint: "$f'(x)<0$.", explanation: "$-2x+4<0$ when $x>2$." },
        { id: "y11adv-stat-p14", prompt: "At $x=1$, $f(x)=x^3-3x$ has a stationary point. $f'(0)=-3<0$ and $f'(2)=9>0$. Classify it.", latex: "\\text{Sign diagram at }x=1", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Horizontal inflection" }, { label: "C", text: "Local minimum" }, { label: "D", text: "Global maximum" }], hint: "$f'$ changes from negative to positive.", explanation: "$f'$ goes $-\\to0\\to+$, a local minimum." },
        { id: "y11adv-stat-p15", prompt: "State the interval where $f(x)=x^3-3x$ is increasing for $x>0$.", latex: "f(x)=x^3-3x,\\quad x>0", answer: "x > 1", difficulty: 3, acceptedAnswers: ["x>1", "(1, \\infty)"], hint: "$f'(x)>0$ outside the roots.", explanation: "$f'(x)=3x^2-3>0$ for $x>1$." },
        { id: "y11adv-stat-p16", prompt: "Find the $y$-value of the local maximum of $f(x)=x^3-3x$ at $x=-1$.", latex: "f(x)=x^3-3x,\\quad x=-1", answer: "2", difficulty: 2, acceptedAnswers: ["f(-1)=2", "y=2"], hint: "Substitute $x=-1$.", explanation: "$f(-1)=-1+3=2$." },
        { id: "y11adv-stat-p17", prompt: "For $f(x)=x^2+6x+5$, $f'(-4)<0$ and $f'(-2)>0$ at $x=-3$. Classify this stationary point.", latex: "\\text{Sign diagram at }x=-3", answer: "D", difficulty: 2, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Horizontal inflection" }, { label: "C", text: "Not a stationary point" }, { label: "D", text: "Local minimum" }], hint: "$f'$ changes from negative to positive.", explanation: "$f'$ goes $-\\to0\\to+$, a local minimum." },
        { id: "y11adv-stat-p18", prompt: "For $f(x)=x^3-6x^2+9x$, stationary points are at $x=1$ and $x=3$. On $1<x<3$, $f'(x)<0$. What does this tell you?", latex: "f'(x)<0\\text{ for }1<x<3", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$f$ is increasing on this interval" }, { label: "B", text: "There is an inflection at $x=2$" }, { label: "C", text: "$f$ is decreasing on this interval" }, { label: "D", text: "Both stationary points are local maxima" }], hint: "Negative derivative means decreasing.", explanation: "$f'(x)<0$ means $f$ is decreasing on the interval." },
        { id: "y11adv-stat-p19", prompt: "Find the $x$-value of the stationary point for the function. Give the value with its sign.", latex: "f(x)=x^2+8x", answer: "-4", difficulty: 2, acceptedAnswers: ["-4", "−4", "x=-4"], hint: "Set $f'(x)=0$.", explanation: "$f'(x)=2x+8=0$ gives $x=-4$." },
        { id: "y11adv-stat-p20", prompt: "A curve is rising, reaches a peak, then falls. Which statement describes the peak?", latex: "\\text{Graph shape}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "The $y$-intercept of the curve" }, { label: "B", text: "A local maximum" }, { label: "C", text: "A local minimum" }, { label: "D", text: "A point of inflection" }], hint: "Rising then falling is a peak.", explanation: "The peak where the curve stops rising and starts falling is a local maximum." },
        { id: "y11adv-stat-p21", prompt: "Find the $y$-coordinate of the local minimum of $f(x)=x^3-3x$ at $x=1$. Give the value with its sign.", latex: "f(x)=x^3-3x,\\quad x=1", answer: "-2", difficulty: 4, acceptedAnswers: ["-2", "−2", "f(1)=-2", "y=-2"], hint: "Substitute $x=1$.", explanation: "$f(1)=1-3=-2$." },
        { id: "y11adv-stat-p22", prompt: "Find the larger stationary $x$-value of the function.", latex: "f(x)=x^3-6x^2+9x", answer: "3", difficulty: 4, acceptedAnswers: ["x=3"], hint: "Solve $f'(x)=0$ and factorise.", explanation: "$f'(x)=3x^2-12x+9=3(x-1)(x-3)=0$ gives $x=1,3$; larger is $3$." },
        { id: "y11adv-stat-p23", prompt: "Find the $y$-value of the local maximum of $f(x)=x^3-6x^2+9x$ at $x=1$.", latex: "f(x)=x^3-6x^2+9x,\\quad x=1", answer: "4", difficulty: 5, acceptedAnswers: ["f(1)=4", "y=4"], hint: "Substitute $x=1$.", explanation: "$f(1)=1-6+9=4$." },
        { id: "y11adv-stat-p24", prompt: "State the bounded interval where $f(x)=x^3-6x^2+9x$ is decreasing.", latex: "f(x)=x^3-6x^2+9x", answer: "1 < x < 3", difficulty: 4, acceptedAnswers: ["(1, 3)", "1<x<3"], hint: "$f'(x)=3(x-1)(x-3)<0$ between the roots.", explanation: "The derivative is negative between $x=1$ and $x=3$." },
        { id: "y11adv-stat-p25", prompt: "Find the stationary $x$-value of $f(x)=x^4-4x$ (only one real value).", latex: "f(x)=x^4-4x", answer: "1", difficulty: 4, acceptedAnswers: ["x=1"], hint: "Solve $f'(x)=4x^3-4=0$.", explanation: "$4x^3-4=0$ gives $x^3=1$, so $x=1$." },
        { id: "y11adv-stat-p26", prompt: "Find the negative stationary $x$-value of $f(x)=x^3-3x^2-9x$.", latex: "f(x)=x^3-3x^2-9x", answer: "-1", difficulty: 5, acceptedAnswers: ["x=-1"], hint: "Solve $f'(x)=0$ and factorise.", explanation: "$f'(x)=3x^2-6x-9=3(x-3)(x+1)=0$ gives $x=-1,3$; negative is $-1$." },
        { id: "y11adv-stat-p27", prompt: "Find the $y$-value of the local maximum of $f(x)=x^3-3x^2-9x$ at $x=-1$.", latex: "f(x)=x^3-3x^2-9x,\\quad x=-1", answer: "5", difficulty: 5, acceptedAnswers: ["f(-1)=5", "y=5"], hint: "Substitute $x=-1$.", explanation: "$f(-1)=-1-3+9=5$." },
        { id: "y11adv-stat-p28", prompt: "Find the value of $k$ if $f(x)=x^2-kx+3$ has a stationary point at $x=4$.", latex: "f(x)=x^2-kx+3", answer: "8", difficulty: 5, acceptedAnswers: ["k=8"], hint: "$f'(x)=2x-k$; set $f'(4)=0$.", explanation: "$f'(4)=8-k=0$ gives $k=8$." },
        { id: "y11adv-stat-p29", prompt: "Find the positive stationary $x$-value of $f(x)=2x^3-6x$.", latex: "f(x)=2x^3-6x", answer: "1", difficulty: 5, acceptedAnswers: ["x=1"], hint: "Solve $f'(x)=6x^2-6=0$.", explanation: "$6x^2-6=0$ gives $x^2=1$, so the positive value is $1$." },
        { id: "y11adv-stat-p30", prompt: "Find the $y$-value of the local minimum of $f(x)=2x^3-6x$ at $x=1$. Give the value with its sign.", latex: "f(x)=2x^3-6x,\\quad x=1", answer: "-4", difficulty: 5, acceptedAnswers: ["-4", "−4", "f(1)=-4", "y=-4"], hint: "Substitute $x=1$.", explanation: "$f(1)=2-6=-4$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-stat-mp1",
          prompt: "Consider the function $f(x)=x^2-6x+5$.",
          latex: "f(x)=x^2-6x+5",
          answer: "3",
          hint: "Solve $f'(x)=0$ for the stationary $x$-value, substitute for the $y$-value, then classify.",
          explanation: "(a) $f'(x)=2x-6=0$ gives $x=3$. (b) $f(3)=9-18+5=-4$. (c) Since the parabola opens upward, the stationary point is a local minimum.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the $x$-coordinate of the stationary point.", marks: 1, answer: "3", acceptedAnswers: ["x=3"], hint: "Set $f'(x)=0$.", explanation: "$f'(x)=2x-6=0$ gives $x=3$." },
            { key: "b", label: "(b)", prompt: "Find the $y$-coordinate of the stationary point. Give the value with its sign.", marks: 2, answer: "-4", acceptedAnswers: ["-4", "−4", "y=-4", "f(3)=-4"], hint: "Substitute $x=3$ into $f(x)$.", explanation: "$f(3)=9-18+5=-4$." },
            { key: "c", label: "(c)", prompt: "Classify the stationary point (local maximum or local minimum).", marks: 1, answer: "local minimum", acceptedAnswers: ["local min", "minimum", "min"], hint: "The coefficient of $x^2$ is positive.", explanation: "An upward-opening parabola has a local minimum at its vertex." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "second-derivative-concavity") {
    const concavityGraph: import("../types").CartesianGraph = {
      description:
        "Two parabolas showing opposite concavity. y = x² opens upward: f''(x) = 2 > 0, concave up. y = −x² opens downward: f''(x) = −2 < 0, concave down. Both share the vertex at the origin.",
      xMin: -2.5, xMax: 2.5, yMin: -5, yMax: 5,
      xStep: 1, yStep: 1,
      parabolas: [
        { kind: "quadratic", a: 1, b: 0, c: 0, label: "y = x², concave up (f'' = 2 > 0)" },
        { kind: "quadratic", a: -1, b: 0, c: 0, label: "y = −x², concave down (f'' = −2 < 0)" },
      ],
      points: [
        { x: 0, y: 0, label: "vertex" },
      ],
    };

    return {
      ...base,
      description:
        "Find the second derivative, determine concavity, locate and confirm points of inflection, and apply the second derivative test.",
      learningIntention:
        "Learn how the second derivative describes the curvature of a graph and how to use it to classify stationary points and find inflection points.",
      successCriteria: [
        "Find the second derivative f''(x) by differentiating f'(x).",
        "Determine concavity: f''(x) > 0 means concave up; f''(x) < 0 means concave down.",
        "Find x-coordinates of possible points of inflection by setting f''(x) = 0 and confirming a sign change.",
        "Apply the second derivative test to classify a stationary point.",
      ],
      teaching: {
        paragraphs: [
          "The second derivative f''(x) is found by differentiating f'(x) again. It measures how the gradient itself is changing.",
          "If f''(x) > 0, the gradient is increasing and the curve bends upward like a cup — this is called concave up. If f''(x) < 0, the gradient is decreasing and the curve bends downward like a dome — this is concave down.",
          "A point of inflection is where the concavity changes. To find candidates, set f''(x) = 0 and solve. Then confirm the sign of f''(x) changes on either side of that x-value.",
          "The second derivative test classifies a stationary point directly: if f'(a) = 0 and f''(a) > 0, then x = a is a local minimum; if f''(a) < 0, it is a local maximum; if f''(a) = 0, the test is inconclusive.",
          "This test is often faster than the sign diagram approach, but it fails when f''(a) = 0, in which case you must revert to the first derivative test.",
        ],
        latexBlocks: [
          "f''(x)=\\frac{d}{dx}[f'(x)]",
          "f''(x)>0\\Rightarrow\\text{concave up};\\quad f''(x)<0\\Rightarrow\\text{concave down}",
          "\\text{inflection candidates: }f''(x)=0\\text{ with sign change confirmed}",
          "f'(a)=0\\text{ and }f''(a)>0\\Rightarrow\\text{local min};\\quad f''(a)<0\\Rightarrow\\text{local max}",
        ],
      },
      workedExamples: [
        {
          title: "Find and interpret the second derivative",
          questionLatex: "f(x)=x^3-6x^2+9x",
          cartesianGraph: concavityGraph,
          steps: [
            { explanation: "Differentiate once to get f'(x).", latex: "f'(x)=3x^2-12x+9" },
            { explanation: "Differentiate again to get f''(x).", latex: "f''(x)=6x-12" },
            { explanation: "At x = 1: f''(1) = −6 < 0, so the curve is concave down.", latex: "f''(1)=6(1)-12=-6<0" },
            { explanation: "At x = 3: f''(3) = 6 > 0, so the curve is concave up.", latex: "f''(3)=6(3)-12=6>0" },
          ],
          finalAnswerLatex: "f''(x)=6x-12",
        },
        {
          title: "Apply the second derivative test",
          questionLatex: "f(x)=x^3-6x^2+9x,\\quad\\text{stationary points at }x=1\\text{ and }x=3",
          steps: [
            { explanation: "f''(1) = −6 < 0, so the stationary point at x = 1 is a local maximum.", latex: "f''(1)<0\\Rightarrow\\text{local max at }(1,\\,4)" },
            { explanation: "f''(3) = 6 > 0, so the stationary point at x = 3 is a local minimum.", latex: "f''(3)>0\\Rightarrow\\text{local min at }(3,\\,0)" },
          ],
          finalAnswerLatex: "\\text{Local max }(1,\\,4);\\quad\\text{Local min }(3,\\,0)",
        },
        {
          title: "Find and confirm a point of inflection",
          questionLatex: "f(x)=x^3-3x",
          steps: [
            { explanation: "Find f''(x).", latex: "f'(x)=3x^2-3,\\quad f''(x)=6x" },
            { explanation: "Set f''(x) = 0.", latex: "6x=0\\Rightarrow x=0" },
            { explanation: "Confirm a sign change: f''(−1) = −6 < 0 (concave down) and f''(1) = 6 > 0 (concave up).", latex: "\\text{Sign changes at }x=0\\Rightarrow\\text{inflection at }(0,\\,0)" },
          ],
          finalAnswerLatex: "\\text{Point of inflection at }(0,\\,0)",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-conc-g1", "Find f''(x) for the function.", "f(x)=x^3-6x^2+9x", "6x-12", ["f''(x)=6x-12"]),
        practicalChoice("y11adv-conc-g2", "For f(x)=x^3−6x^2+9x, f''(1)=−6 < 0. What does this tell you?", "B", ["There is an inflection point at x=1", "The stationary point at x=1 is a local maximum", "The function is decreasing at x=1", "f'(1)=0"], "f''(a) < 0 at a stationary point means local maximum.", "f''(1)=-6<0"),
        practicalChoice("y11adv-conc-g3", "On an interval where f''(x) > 0, the graph is:", "B", ["Decreasing", "Concave up", "Concave down", "Stationary"], "f''(x) > 0 means the gradient is increasing and the curve bends upward.", "f''(x)>0"),
        formulaAnswer("y11adv-conc-g4", "Determine the concavity of f(x) = x^2 + 3x − 2 by finding f''(x). State your conclusion.", "f(x)=x^2+3x-2", "concave up", ["always concave up", "f''(x)=2>0, concave up", "concave upward"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-conc-i1", "Find f''(x) for the function.", "f(x)=x^4-6x^2", "12x^2-12", ["f''(x)=12x^2-12"]),
        formulaAnswer("y11adv-conc-i2", "Set f''(x) = 0 and find the x-value(s) for the function.", "f(x)=x^3-3x", "0", ["x=0"]),
        practicalChoice("y11adv-conc-i3", "For f(x)=x^3−3x, f''(−1)=−6<0 and f''(1)=6>0. Which statement is correct?", "C", ["Both x=−1 and x=1 are inflection points", "The graph is concave up at x=−1", "The graph is concave down at x=−1", "f has no stationary points"], "f''(−1) < 0 means the curve is concave down at x = −1.", "f''(-1)=-6,\\;f''(1)=6"),
        practicalChoice("y11adv-conc-i4", "A curve has f''(x) < 0 throughout. Which description best matches its shape?", "D", ["It rises then falls", "It opens upward like a cup", "It has an inflection point", "It opens downward like an arch"], "f''(x) < 0 means concave down everywhere — the curve arches downward.", "f''(x)<0\\text{ for all }x"),
        formulaAnswer("y11adv-conc-i5", "Classify the stationary point of f(x) = x^3 − 6x^2 + 9x at x = 3 using the second derivative test.", "f(x)=x^3-6x^2+9x,\\quad x=3", "local minimum", ["local min", "minimum"]),
      ],
      commonMistakes: [
        { mistake: "Confusing concave up with concave down.", fix: "Concave up means the curve curves like a cup (f'' > 0); concave down means it curves like a dome (f'' < 0)." },
        { mistake: "Concluding an inflection point exists from f''(a) = 0 alone.", fix: "A sign change in f''(x) must be confirmed on either side. If f'' does not change sign, there is no inflection." },
        { mistake: "Using the second derivative test when f''(a) = 0.", fix: "If f''(a) = 0, the test is inconclusive. Revert to the first derivative test." },
        { mistake: "Differentiating f(x) twice by applying the power rule only once.", fix: "The second derivative requires differentiating f'(x) again, not squaring the first derivative." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-conc-m1", "Find f''(x) for the function.", "f(x)=2x^4-3x^2+5", "24x^2-6", ["f''(x)=24x^2-6"]),
        practicalChoice("y11adv-conc-m2", "For f(x)=x^3−6x^2+9x, f''(x)=6x−12. Where does f''(x) = 0?", "A", ["$x=2$", "$x=6$", "$x=3$", "$x=1$"], "6x−12=0 gives x=2.", "f''(x)=6x-12=0"),
        practicalChoice("y11adv-conc-m3", "At x=2 for f(x)=x^3−6x^2+9x, f''(x) changes from negative to positive. What is at x=2?", "C", ["Local maximum", "Local minimum", "Point of inflection", "Stationary point"], "A sign change in f'' (from negative to positive) confirms a point of inflection.", "f''\\text{ sign change at }x=2"),
        formulaAnswer("y11adv-conc-m4", "Classify the stationary point of f(x) = x^3 − 3x at x = 1 using the second derivative test.", "f(x)=x^3-3x,\\quad x=1", "local minimum", ["local min", "minimum"]),
        formulaAnswer("y11adv-conc-m5", "Find the x-coordinate of the point of inflection of f(x) = x^3 − 3x.", "f(x)=x^3-3x", "0", ["x=0"]),
        practicalChoice("y11adv-conc-m6", "Which statement correctly describes f''(x) > 0 on an interval?", "B", ["The graph is decreasing on that interval", "The graph is concave up (curves upward like a cup)", "The graph is concave down", "The graph has a maximum on that interval"], "f'' > 0 means the gradient is increasing and the curve bends upward.", "f''(x)>0"),
        formulaAnswer("y11adv-conc-m7", "Find the x-values where f''(x) = 0 for the function. Give answers in ascending order, separated by a comma.", "f(x)=x^4-6x^2", "-1, 1", ["x=-1,1", "x=-1 and x=1", "-1 and 1", "±1"]),
        practicalChoice("y11adv-conc-m8", "A curve has f'(a)=0 and f''(a)=5>0. What can you conclude about x=a?", "C", ["Local maximum", "Point of inflection", "Local minimum", "No conclusion is possible"], "f'' > 0 at a stationary point means the curve is concave up there — a local minimum.", "f'(a)=0,\\;f''(a)=5"),
        formulaAnswer("y11adv-conc-m9", "For what x-values is f(x) = x^3 − 6x^2 + 9x concave up?", "f(x)=x^3-6x^2+9x", "x > 2", ["x>2", "(2, \\infty)"]),
        practicalChoice("y11adv-conc-m10", "A student finds f''(x)=0 at x=3 and immediately concludes x=3 is an inflection point. Why might this be wrong?", "B", ["f''=0 always guarantees an inflection", "A sign change in f'' must be confirmed on each side", "The second derivative is always positive at inflection points", "f'(3) must also equal zero for an inflection"], "f''=0 is a necessary condition, but you must also confirm the sign of f'' changes across x=3.", "f''(3)=0"),
      ],
      masteryQuizPool: [
        { id: "y11adv-conc-p1", prompt: "Find $f''(x)$ for the function.", latex: "f(x)=x^3-6x^2+9x", answer: "6x-12", difficulty: 1, acceptedAnswers: ["f''(x)=6x-12"], hint: "Differentiate twice.", explanation: "$f'(x)=3x^2-12x+9$, $f''(x)=6x-12$." },
        { id: "y11adv-conc-p2", prompt: "Find $f''(x)$ for the function.", latex: "f(x)=x^3", answer: "6x", difficulty: 1, acceptedAnswers: ["f''(x)=6x"], hint: "Differentiate twice.", explanation: "$f'(x)=3x^2$, $f''(x)=6x$." },
        { id: "y11adv-conc-p3", prompt: "On an interval where $f''(x)>0$, the graph is:", latex: "f''(x)>0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Decreasing" }, { label: "B", text: "Concave up" }, { label: "C", text: "Concave down" }, { label: "D", text: "Stationary" }], hint: "$f''>0$ bends upward.", explanation: "$f''(x)>0$ means the curve is concave up." },
        { id: "y11adv-conc-p4", prompt: "Find $f''(x)$ for the function.", latex: "f(x)=2x^3+x", answer: "12x", difficulty: 1, acceptedAnswers: ["f''(x)=12x"], hint: "Differentiate twice.", explanation: "$f'(x)=6x^2+1$, $f''(x)=12x$." },
        { id: "y11adv-conc-p5", prompt: "For $f(x)=x^3-6x^2+9x$, $f''(1)=-6<0$. What does this tell you?", latex: "f''(1)=-6<0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "There is an inflection point at $x=1$" }, { label: "B", text: "The stationary point at $x=1$ is a local maximum" }, { label: "C", text: "The function is decreasing at $x=1$" }, { label: "D", text: "$f'(1)=0$" }], hint: "$f''<0$ at a stationary point means concave down.", explanation: "$f''<0$ at a stationary point indicates a local maximum." },
        { id: "y11adv-conc-p6", prompt: "Find $f''(x)$ for the function.", latex: "f(x)=x^4-6x^2", answer: "12x^2-12", difficulty: 2, acceptedAnswers: ["f''(x)=12x^2-12"], hint: "Differentiate twice.", explanation: "$f'(x)=4x^3-12x$, $f''(x)=12x^2-12$." },
        { id: "y11adv-conc-p7", prompt: "Find $f''(x)$ for the function.", latex: "f(x)=2x^4-3x^2+5", answer: "24x^2-6", difficulty: 2, acceptedAnswers: ["f''(x)=24x^2-6"], hint: "Differentiate twice.", explanation: "$f'(x)=8x^3-6x$, $f''(x)=24x^2-6$." },
        { id: "y11adv-conc-p8", prompt: "Set $f''(x)=0$ and find the $x$-value for the function.", latex: "f(x)=x^3-3x", answer: "0", difficulty: 2, acceptedAnswers: ["x=0"], hint: "$f''(x)=6x$.", explanation: "$f''(x)=6x=0$ gives $x=0$." },
        { id: "y11adv-conc-p9", prompt: "Where does $f''(x)=6x-12$ equal zero?", latex: "f''(x)=6x-12=0", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$x=2$" }, { label: "B", text: "$x=6$" }, { label: "C", text: "$x=3$" }, { label: "D", text: "$x=1$" }], hint: "Solve $6x-12=0$.", explanation: "$6x-12=0$ gives $x=2$." },
        { id: "y11adv-conc-p10", prompt: "A curve has $f''(x)<0$ throughout. Which description best matches its shape?", latex: "f''(x)<0\\text{ for all }x", answer: "D", difficulty: 2, choices: [{ label: "A", text: "It rises then falls" }, { label: "B", text: "It opens upward like a cup" }, { label: "C", text: "It has an inflection point" }, { label: "D", text: "It opens downward like an arch" }], hint: "$f''<0$ means concave down.", explanation: "$f''<0$ everywhere means the curve arches downward." },
        { id: "y11adv-conc-p11", prompt: "Classify the stationary point of $f(x)=x^3-3x$ at $x=1$ using the second derivative test.", latex: "f(x)=x^3-3x,\\quad x=1", answer: "local minimum", difficulty: 3, acceptedAnswers: ["local min", "minimum"], hint: "Check the sign of $f''(1)$.", explanation: "$f''(x)=6x$, so $f''(1)=6>0$, a local minimum." },
        { id: "y11adv-conc-p12", prompt: "Find the $x$-coordinate of the point of inflection of $f(x)=x^3-3x$.", latex: "f(x)=x^3-3x", answer: "0", difficulty: 3, acceptedAnswers: ["x=0"], hint: "Set $f''(x)=0$ and confirm a sign change.", explanation: "$f''(x)=6x=0$ gives $x=0$, with a sign change." },
        { id: "y11adv-conc-p13", prompt: "Find the $x$-values where $f''(x)=0$. Give answers in ascending order, separated by a comma.", latex: "f(x)=x^4-6x^2", answer: "-1, 1", difficulty: 3, acceptedAnswers: ["x=-1,1", "-1 and 1", "±1", "x = -1, 1"], hint: "$f''(x)=12x^2-12$.", explanation: "$12x^2-12=0$ gives $x^2=1$, so $x=\\pm1$." },
        { id: "y11adv-conc-p14", prompt: "A curve has $f'(a)=0$ and $f''(a)=5>0$. What can you conclude about $x=a$?", latex: "f'(a)=0,\\quad f''(a)=5", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Point of inflection" }, { label: "C", text: "Local minimum" }, { label: "D", text: "No conclusion is possible" }], hint: "$f''>0$ at a stationary point.", explanation: "$f''>0$ means concave up, so a local minimum." },
        { id: "y11adv-conc-p15", prompt: "At $x=2$ for $f(x)=x^3-6x^2+9x$, $f''(x)$ changes from negative to positive. What is at $x=2$?", latex: "f''\\text{ sign change at }x=2", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Local maximum" }, { label: "B", text: "Local minimum" }, { label: "C", text: "Point of inflection" }, { label: "D", text: "Stationary point" }], hint: "A sign change in $f''$ confirms inflection.", explanation: "The sign change in $f''$ confirms a point of inflection." },
        { id: "y11adv-conc-p16", prompt: "For what $x$-values is $f(x)=x^3-6x^2+9x$ concave up?", latex: "f(x)=x^3-6x^2+9x", answer: "x > 2", difficulty: 3, acceptedAnswers: ["x>2", "(2, \\infty)"], hint: "$f''(x)=6x-12>0$.", explanation: "$6x-12>0$ gives $x>2$." },
        { id: "y11adv-conc-p17", prompt: "Classify the stationary point of $f(x)=x^3-6x^2+9x$ at $x=3$ using the second derivative test.", latex: "f(x)=x^3-6x^2+9x,\\quad x=3", answer: "local minimum", difficulty: 3, acceptedAnswers: ["local min", "minimum"], hint: "Check the sign of $f''(3)$.", explanation: "$f''(3)=6(3)-12=6>0$, a local minimum." },
        { id: "y11adv-conc-p18", prompt: "Which statement correctly describes $f''(x)>0$ on an interval?", latex: "f''(x)>0", answer: "B", difficulty: 2, choices: [{ label: "A", text: "The graph is decreasing on that interval" }, { label: "B", text: "The graph is concave up (curves upward like a cup)" }, { label: "C", text: "The graph is concave down" }, { label: "D", text: "The graph has a maximum on that interval" }], hint: "$f''>0$ bends upward.", explanation: "$f''>0$ means concave up." },
        { id: "y11adv-conc-p19", prompt: "Determine the concavity of $f(x)=x^2+3x-2$. State your conclusion.", latex: "f(x)=x^2+3x-2", answer: "concave up", difficulty: 2, acceptedAnswers: ["always concave up", "concave upward"], hint: "$f''(x)=2>0$.", explanation: "$f''(x)=2>0$ everywhere, so concave up." },
        { id: "y11adv-conc-p20", prompt: "A student finds $f''(x)=0$ at $x=3$ and concludes $x=3$ is an inflection point. Why might this be wrong?", latex: "f''(3)=0", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$f''=0$ always guarantees an inflection" }, { label: "B", text: "A sign change in $f''$ must be confirmed on each side" }, { label: "C", text: "The second derivative is always positive at inflection points" }, { label: "D", text: "$f'(3)$ must also equal zero for an inflection" }], hint: "$f''=0$ is necessary but not sufficient.", explanation: "You must confirm $f''$ changes sign across $x=3$." },
        { id: "y11adv-conc-p21", prompt: "Find $f''(x)$, then evaluate it at $x=1$. Give the value with its sign.", latex: "f(x)=x^3-6x^2+9x,\\quad x=1", answer: "-6", difficulty: 4, acceptedAnswers: ["-6", "−6", "f''(1)=-6"], hint: "$f''(x)=6x-12$; substitute $x=1$.", explanation: "$f''(1)=6-12=-6$." },
        { id: "y11adv-conc-p22", prompt: "Find the $x$-coordinate of the point of inflection of $f(x)=x^3-6x^2$.", latex: "f(x)=x^3-6x^2", answer: "2", difficulty: 4, acceptedAnswers: ["x=2"], hint: "Set $f''(x)=0$.", explanation: "$f'(x)=3x^2-12x$, $f''(x)=6x-12=0$ gives $x=2$." },
        { id: "y11adv-conc-p23", prompt: "For what $x$-values is $f(x)=x^3-3x^2$ concave down?", latex: "f(x)=x^3-3x^2", answer: "x < 1", difficulty: 5, acceptedAnswers: ["x<1", "(-\\infty, 1)"], hint: "$f''(x)=6x-6<0$.", explanation: "$f''(x)=6x-6<0$ gives $x<1$." },
        { id: "y11adv-conc-p24", prompt: "Classify the stationary point of $f(x)=-x^3+3x$ at $x=1$ using the second derivative test.", latex: "f(x)=-x^3+3x,\\quad x=1", answer: "local maximum", difficulty: 4, acceptedAnswers: ["local max", "maximum"], hint: "Find $f''(1)$ and check its sign.", explanation: "$f''(x)=-6x$, so $f''(1)=-6<0$, a local maximum." },
        { id: "y11adv-conc-p25", prompt: "Find the larger $x$-value where $f(x)=x^4-6x^2$ is concave down ends (the positive boundary of the concave-down interval).", latex: "f(x)=x^4-6x^2", answer: "1", difficulty: 4, acceptedAnswers: ["x=1"], hint: "$f''(x)=12x^2-12$; concave down between the roots.", explanation: "$f''(x)=12x^2-12<0$ on $-1<x<1$; the positive boundary is $x=1$." },
        { id: "y11adv-conc-p26", prompt: "Find the $x$-coordinate of the point of inflection of $f(x)=2x^3-3x^2-12x$.", latex: "f(x)=2x^3-3x^2-12x", answer: "0.5", difficulty: 5, acceptedAnswers: ["1/2", "x=0.5", "x=1/2"], hint: "Set $f''(x)=0$.", explanation: "$f'(x)=6x^2-6x-12$, $f''(x)=12x-6=0$ gives $x=\\frac12$." },
        { id: "y11adv-conc-p27", prompt: "Find the value of $a$ if $f(x)=ax^3$ has $f''(1)=18$.", latex: "f(x)=ax^3,\\quad f''(1)=18", answer: "3", difficulty: 5, acceptedAnswers: ["a=3"], hint: "$f''(x)=6ax$; set $f''(1)=6a=18$.", explanation: "$f''(x)=6ax$, so $f''(1)=6a=18$ gives $a=3$." },
        { id: "y11adv-conc-p28", prompt: "For $f(x)=x^4-4x^3$, find the larger $x$-value of the two points of inflection.", latex: "f(x)=x^4-4x^3", answer: "2", difficulty: 5, acceptedAnswers: ["x=2"], hint: "$f''(x)=12x^2-24x=0$.", explanation: "$f''(x)=12x^2-24x=12x(x-2)=0$ gives $x=0,2$; larger is $2$." },
        { id: "y11adv-conc-p29", prompt: "Find $k$ if the point of inflection of $f(x)=x^3-kx^2$ is at $x=2$.", latex: "f(x)=x^3-kx^2", answer: "6", difficulty: 5, acceptedAnswers: ["k=6"], hint: "$f''(x)=6x-2k=0$ at $x=2$.", explanation: "$f''(x)=6x-2k$; setting $f''(2)=12-2k=0$ gives $k=6$." },
        { id: "y11adv-conc-p30", prompt: "For $f(x)=x^4-2x^2$, state the bounded interval where the curve is concave down.", latex: "f(x)=x^4-2x^2", answer: "-0.577 < x < 0.577", difficulty: 5, acceptedAnswers: ["-1/\\sqrt{3} < x < 1/\\sqrt{3}", "-0.58 < x < 0.58"], hint: "$f''(x)=12x^2-4<0$.", explanation: "$12x^2-4<0$ gives $x^2<\\frac13$, i.e. $-\\frac{1}{\\sqrt3}<x<\\frac{1}{\\sqrt3}$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-conc-mp1",
          prompt: "Consider the function $f(x)=x^3-6x^2+9x$.",
          latex: "f(x)=x^3-6x^2+9x",
          answer: "6x-12",
          hint: "Find $f''(x)$, solve $f''(x)=0$ for the inflection $x$-value, then use the sign of $f''$ to give the concave-up interval.",
          explanation: "(a) $f'(x)=3x^2-12x+9$, so $f''(x)=6x-12$. (b) $f''(x)=0$ gives $x=2$, the point of inflection. (c) $f''(x)>0$ when $x>2$, so the curve is concave up for $x>2$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find $f''(x)$.", marks: 1, answer: "6x-12", acceptedAnswers: ["f''(x)=6x-12"], hint: "Differentiate twice.", explanation: "$f'(x)=3x^2-12x+9$, $f''(x)=6x-12$." },
            { key: "b", label: "(b)", prompt: "Find the $x$-coordinate of the point of inflection.", marks: 1, answer: "2", acceptedAnswers: ["x=2"], hint: "Set $f''(x)=0$.", explanation: "$6x-12=0$ gives $x=2$." },
            { key: "c", label: "(c)", prompt: "State the interval where the curve is concave up.", marks: 2, answer: "x > 2", acceptedAnswers: ["x>2", "(2, \\infty)"], hint: "Solve $f''(x)>0$.", explanation: "$6x-12>0$ gives $x>2$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "product-rule") {
    return {
      ...base,
      description:
        "Differentiate products of two functions using the product rule dy/dx = u'v + uv'; identify when the rule is needed and evaluate derivatives at given x-values.",
      learningIntention:
        "Learn to apply the product rule to differentiate expressions of the form y = f(x)·g(x), distinguishing this from expanding before differentiating.",
      successCriteria: [
        "State the product rule: d/dx(uv) = u'v + uv'.",
        "Identify u and v correctly in a product expression.",
        "Differentiate each factor, then combine using the product rule.",
        "Evaluate a product-rule derivative at a given x-value.",
        "Recognise when the product rule is needed versus when expanding is simpler.",
      ],
      teaching: {
        paragraphs: [
          "The product rule applies when you need to differentiate a function that is written as a product of two separate functions.",
          "Name the first factor u and the second v. The rule states: the derivative of their product is u' times v, plus u times v'.",
          "Compute u' and v' first, then substitute into the formula u'v + uv'.",
          "Always check: could you expand the product first and then use the power rule? If yes, both methods give the same answer. The product rule is essential when at least one factor is not a simple polynomial, such as a trigonometric or exponential function.",
          "Evaluate by substituting the given x-value after finding the derivative expression.",
        ],
        latexBlocks: [
          "\\frac{d}{dx}(uv)=u'v+uv'",
          "\\text{Example: }y=x^2(x+3),\\quad u=x^2,\\;u'=2x,\\quad v=x+3,\\;v'=1",
          "\\frac{dy}{dx}=2x(x+3)+x^2\\cdot 1=2x^2+6x+x^2=3x^2+6x",
        ],
      },
      workedExamples: [
        {
          title: "Apply the product rule to y = x²(x + 3)",
          questionLatex: "y=x^2(x+3)",
          steps: [
            { explanation: "Let u = x² and v = x + 3.", latex: "u=x^2,\\quad v=x+3" },
            { explanation: "Differentiate each factor.", latex: "u'=2x,\\quad v'=1" },
            { explanation: "Apply the product rule u'v + uv'.", latex: "\\frac{dy}{dx}=2x(x+3)+x^2\\cdot 1" },
            { explanation: "Expand and simplify.", latex: "=2x^2+6x+x^2=3x^2+6x" },
          ],
          finalAnswerLatex: "\\frac{dy}{dx}=3x^2+6x",
        },
        {
          title: "Evaluate the product-rule derivative at a point",
          questionLatex: "y=x^2(x+3),\\quad\\text{find }\\frac{dy}{dx}\\text{ at }x=1",
          steps: [
            { explanation: "From the previous example, dy/dx = 3x² + 6x.", latex: "\\frac{dy}{dx}=3x^2+6x" },
            { explanation: "Substitute x = 1.", latex: "3(1)^2+6(1)=3+6=9" },
          ],
          finalAnswerLatex: "9",
        },
        {
          title: "Apply the product rule to y = x(x + 2)",
          questionLatex: "y=x(x+2)",
          steps: [
            { explanation: "Let u = x and v = x + 2.", latex: "u=x,\\quad v=x+2" },
            { explanation: "Differentiate each factor.", latex: "u'=1,\\quad v'=1" },
            { explanation: "Apply u'v + uv'.", latex: "\\frac{dy}{dx}=1\\cdot(x+2)+x\\cdot1=x+2+x=2x+2" },
          ],
          finalAnswerLatex: "\\frac{dy}{dx}=2x+2",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-pr-g1", "Choose the correct product rule formula.", "B",
          ["$\\dfrac{d}{dx}(uv)=u'v'$", "$\\dfrac{d}{dx}(uv)=u'v+uv'$", "$\\dfrac{d}{dx}(uv)=u+v$", "$\\dfrac{d}{dx}(uv)=u'v-uv'$"],
          "The product rule is: derivative of the first times the second, plus the first times derivative of the second.",
          "\\frac{d}{dx}(uv)"),
        formulaAnswer("y11adv-pr-g2", "For the product rule applied to y = x²(x+3), find u' when u = x².", "u=x^2,\\quad u'=\\Box", "2x"),
        formulaAnswer("y11adv-pr-g3", "For the product rule applied to y = x²(x+3), find v' when v = x+3.", "v=x+3,\\quad v'=\\Box", "1"),
        practicalChoice("y11adv-pr-g4", "Choose the simplified derivative of y = x²(x+3).", "A",
          ["$3x^2+6x$", "$2x(x+3)$ only", "$x^2+6x$", "$3x^2-6x$"],
          "Using u'v + uv' = 2x(x+3) + x² = 2x²+6x+x² = 3x²+6x.",
          "y=x^2(x+3)"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-pr-i1", "Find u' when u = x³.", "u=x^3,\\quad u'=\\Box", "3x^2", ["3x²"]),
        formulaAnswer("y11adv-pr-i2", "Find v' when v = 2x-5.", "v=2x-5,\\quad v'=\\Box", "2"),
        formulaAnswer("y11adv-pr-i3", "Evaluate the derivative of y = x(x+2) at x = 0.", "y=x(x+2),\\quad \\frac{dy}{dx}\\text{ at }x=0", "2"),
        formulaAnswer("y11adv-pr-i4", "Evaluate the derivative of y = x(x+2) at x = 3.", "y=x(x+2),\\quad \\frac{dy}{dx}\\text{ at }x=3", "8"),
        practicalChoice("y11adv-pr-i5", "Which function requires the product rule (cannot be simplified by expanding first)?", "C",
          ["$y=x^3+2x$", "$y=(x+1)^2$", "$y=x^2\\sin x$", "$y=x(x+3)$"],
          "When one factor is not a polynomial (such as sin x), the product cannot be expanded and the product rule is essential.",
          "\\text{Product rule needed?}"),
      ],
      commonMistakes: [
        { mistake: "Writing d/dx(uv) = u'v' (multiplying the two derivatives).", fix: "The product rule is u'v + uv'. Multiply each derivative by the other original factor." },
        { mistake: "Forgetting to include both terms u'v and uv'.", fix: "There are always two terms in the product rule. Check both are present before simplifying." },
        { mistake: "Swapping which derivative goes with which factor.", fix: "u' is always paired with v (the original second factor), and uv' pairs u (original first factor) with v'." },
        { mistake: "Differentiating u and v at the same time without labelling.", fix: "Write u and v explicitly, then write u' and v' before applying the formula." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-pr-m1", "Evaluate the derivative of y = x²(x-1) at x = 2.", "y=x^2(x-1),\\quad \\frac{dy}{dx}=3x^2-2x,\\quad x=2", "8"),
        formulaAnswer("y11adv-pr-m2", "Evaluate the derivative of y = 3x(x+1) at x = 0.", "y=3x(x+1),\\quad \\frac{dy}{dx}=6x+3,\\quad x=0", "3"),
        formulaAnswer("y11adv-pr-m3", "Evaluate the derivative of y = 3x(x+1) at x = 1.", "y=3x(x+1),\\quad \\frac{dy}{dx}=6x+3,\\quad x=1", "9"),
        formulaAnswer("y11adv-pr-m4", "Evaluate the derivative of y = x(x²-1) at x = 1.", "y=x(x^2-1),\\quad \\frac{dy}{dx}=3x^2-1,\\quad x=1", "2"),
        formulaAnswer("y11adv-pr-m5", "Evaluate the derivative of y = x²(2x-3) at x = 1.", "y=x^2(2x-3),\\quad \\frac{dy}{dx}=6x^2-6x,\\quad x=1", "0"),
        formulaAnswer("y11adv-pr-m6", "Evaluate the derivative of y = x(x+4) at x = 3.", "y=x(x+4),\\quad \\frac{dy}{dx}=2x+4,\\quad x=3", "10"),
        practicalChoice("y11adv-pr-m7", "A student differentiates y = x(x+3) and gets dy/dx = x+3. What is the error?", "C",
          ["The derivative of x is wrong", "The product rule formula is u'v'", "The second term uv' = x·1 was omitted", "The brackets should have been expanded first"],
          "The product rule needs both u'v and uv'. Here uv' = x·1 = x was omitted, so the answer should be (x+3)+x = 2x+3.",
          "y=x(x+3)"),
        formulaAnswer("y11adv-pr-m8", "Evaluate the derivative of y = x(x-2) at x = 4.", "y=x(x-2),\\quad \\frac{dy}{dx}=2x-2,\\quad x=4", "6"),
        formulaAnswer("y11adv-pr-m9", "Evaluate the derivative of y = x²(x+1) at x = 2.", "y=x^2(x+1),\\quad \\frac{dy}{dx}=3x^2+2x,\\quad x=2", "16"),
        practicalChoice("y11adv-pr-m10", "Which shows the correct first step for y = x(x²+1)?", "D",
          ["$u=x^2+1,\\;v=x$", "$\\frac{dy}{dx}=1\\cdot2x$", "$\\frac{dy}{dx}=x'\\cdot(x^2+1)'$", "$u'v+uv'=1\\cdot(x^2+1)+x\\cdot2x$"],
          "u=x, u'=1, v=x²+1, v'=2x. So u'v+uv' = (x²+1)+2x² = 3x²+1.",
          "y=x(x^2+1)"),
      ],
      masteryQuizPool: [
        { id: "y11adv-pr-p1", prompt: "Find $u'$ when $u=x^2$.", latex: "u=x^2", answer: "2x", difficulty: 1, acceptedAnswers: ["u'=2x"], hint: "Use the power rule.", explanation: "$\\frac{d}{dx}(x^2)=2x$." },
        { id: "y11adv-pr-p2", prompt: "Find $v'$ when $v=x+3$.", latex: "v=x+3", answer: "1", difficulty: 1, acceptedAnswers: ["v'=1"], hint: "Differentiate term by term.", explanation: "$\\frac{d}{dx}(x+3)=1$." },
        { id: "y11adv-pr-p3", prompt: "Find $u'$ when $u=x^3$.", latex: "u=x^3", answer: "3x^2", difficulty: 1, acceptedAnswers: ["u'=3x^2"], hint: "Use the power rule.", explanation: "$\\frac{d}{dx}(x^3)=3x^2$." },
        { id: "y11adv-pr-p4", prompt: "Choose the correct product rule formula.", latex: "\\frac{d}{dx}(uv)", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$u'v'$" }, { label: "B", text: "$u'v+uv'$" }, { label: "C", text: "$u+v$" }, { label: "D", text: "$u'v-uv'$" }], hint: "Two terms: $u'v$ plus $uv'$.", explanation: "The product rule is $u'v+uv'$." },
        { id: "y11adv-pr-p5", prompt: "Find $v'$ when $v=2x-5$.", latex: "v=2x-5", answer: "2", difficulty: 1, acceptedAnswers: ["v'=2"], hint: "Differentiate term by term.", explanation: "$\\frac{d}{dx}(2x-5)=2$." },
        { id: "y11adv-pr-p6", prompt: "Evaluate the derivative of $y=x(x+2)$ at $x=0$. The derivative is $2x+2$.", latex: "y=x(x+2),\\quad \\frac{dy}{dx}=2x+2,\\quad x=0", answer: "2", difficulty: 2, acceptedAnswers: ["dy/dx=2"], hint: "Substitute $x=0$.", explanation: "$2(0)+2=2$." },
        { id: "y11adv-pr-p7", prompt: "Evaluate the derivative of $y=x(x+2)$ at $x=3$. The derivative is $2x+2$.", latex: "y=x(x+2),\\quad \\frac{dy}{dx}=2x+2,\\quad x=3", answer: "8", difficulty: 2, acceptedAnswers: ["dy/dx=8"], hint: "Substitute $x=3$.", explanation: "$2(3)+2=8$." },
        { id: "y11adv-pr-p8", prompt: "Choose the simplified derivative of $y=x^2(x+3)$.", latex: "y=x^2(x+3)", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$3x^2+6x$" }, { label: "B", text: "$2x(x+3)$ only" }, { label: "C", text: "$x^2+6x$" }, { label: "D", text: "$3x^2-6x$" }], hint: "Use $u'v+uv'$.", explanation: "$2x(x+3)+x^2=2x^2+6x+x^2=3x^2+6x$." },
        { id: "y11adv-pr-p9", prompt: "Evaluate the derivative of $y=3x(x+1)$ at $x=1$. The derivative is $6x+3$.", latex: "y=3x(x+1),\\quad \\frac{dy}{dx}=6x+3,\\quad x=1", answer: "9", difficulty: 2, acceptedAnswers: ["dy/dx=9"], hint: "Substitute $x=1$.", explanation: "$6(1)+3=9$." },
        { id: "y11adv-pr-p10", prompt: "Which function requires the product rule (cannot be simplified by expanding first)?", latex: "\\text{Product rule needed?}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$y=x^3+2x$" }, { label: "B", text: "$y=(x+1)^2$" }, { label: "C", text: "$y=x^2\\sin x$" }, { label: "D", text: "$y=x(x+3)$" }], hint: "Look for a non-polynomial factor.", explanation: "$x^2\\sin x$ cannot be expanded, so the product rule is essential." },
        { id: "y11adv-pr-p11", prompt: "Evaluate the derivative of $y=x^2(x-1)$ at $x=2$. The derivative is $3x^2-2x$.", latex: "y=x^2(x-1),\\quad \\frac{dy}{dx}=3x^2-2x,\\quad x=2", answer: "8", difficulty: 3, acceptedAnswers: ["dy/dx=8"], hint: "Substitute $x=2$.", explanation: "$3(4)-2(2)=12-4=8$." },
        { id: "y11adv-pr-p12", prompt: "Evaluate the derivative of $y=x(x^2-1)$ at $x=1$. The derivative is $3x^2-1$.", latex: "y=x(x^2-1),\\quad \\frac{dy}{dx}=3x^2-1,\\quad x=1", answer: "2", difficulty: 3, acceptedAnswers: ["dy/dx=2"], hint: "Substitute $x=1$.", explanation: "$3(1)-1=2$." },
        { id: "y11adv-pr-p13", prompt: "Evaluate the derivative of $y=x^2(2x-3)$ at $x=1$. The derivative is $6x^2-6x$.", latex: "y=x^2(2x-3),\\quad \\frac{dy}{dx}=6x^2-6x,\\quad x=1", answer: "0", difficulty: 3, acceptedAnswers: ["dy/dx=0"], hint: "Substitute $x=1$.", explanation: "$6(1)-6(1)=0$." },
        { id: "y11adv-pr-p14", prompt: "A student differentiates $y=x(x+3)$ and gets $\\frac{dy}{dx}=x+3$. What is the error?", latex: "y=x(x+3)", answer: "C", difficulty: 3, choices: [{ label: "A", text: "The derivative of $x$ is wrong" }, { label: "B", text: "The product rule formula is $u'v'$" }, { label: "C", text: "The second term $uv'=x\\cdot1$ was omitted" }, { label: "D", text: "The brackets should have been expanded first" }], hint: "There are always two terms.", explanation: "$uv'=x$ was dropped; the answer is $(x+3)+x=2x+3$." },
        { id: "y11adv-pr-p15", prompt: "Evaluate the derivative of $y=x(x-2)$ at $x=4$. The derivative is $2x-2$.", latex: "y=x(x-2),\\quad \\frac{dy}{dx}=2x-2,\\quad x=4", answer: "6", difficulty: 3, acceptedAnswers: ["dy/dx=6"], hint: "Substitute $x=4$.", explanation: "$2(4)-2=6$." },
        { id: "y11adv-pr-p16", prompt: "Evaluate the derivative of $y=3x(x+1)$ at $x=0$. The derivative is $6x+3$.", latex: "y=3x(x+1),\\quad \\frac{dy}{dx}=6x+3,\\quad x=0", answer: "3", difficulty: 2, acceptedAnswers: ["dy/dx=3"], hint: "Substitute $x=0$.", explanation: "$6(0)+3=3$." },
        { id: "y11adv-pr-p17", prompt: "Evaluate the derivative of $y=x(x+4)$ at $x=3$. The derivative is $2x+4$.", latex: "y=x(x+4),\\quad \\frac{dy}{dx}=2x+4,\\quad x=3", answer: "10", difficulty: 2, acceptedAnswers: ["dy/dx=10"], hint: "Substitute $x=3$.", explanation: "$2(3)+4=10$." },
        { id: "y11adv-pr-p18", prompt: "Which shows the correct first step for $y=x(x^2+1)$ using the product rule?", latex: "y=x(x^2+1)", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$u=x^2+1,\\;v=x$" }, { label: "B", text: "$\\frac{dy}{dx}=1\\cdot2x$" }, { label: "C", text: "$\\frac{dy}{dx}=x'\\cdot(x^2+1)'$" }, { label: "D", text: "$u'v+uv'=1\\cdot(x^2+1)+x\\cdot2x$" }], hint: "$u=x,\\ v=x^2+1$.", explanation: "$u'v+uv'=(x^2+1)+2x^2=3x^2+1$." },
        { id: "y11adv-pr-p19", prompt: "Evaluate the derivative of $y=x^2(x+1)$ at $x=2$. The derivative is $3x^2+2x$.", latex: "y=x^2(x+1),\\quad \\frac{dy}{dx}=3x^2+2x,\\quad x=2", answer: "16", difficulty: 2, acceptedAnswers: ["dy/dx=16"], hint: "Substitute $x=2$.", explanation: "$3(4)+2(2)=12+4=16$." },
        { id: "y11adv-pr-p20", prompt: "Find $v'$ when $v=3x^2-x$.", latex: "v=3x^2-x", answer: "6x-1", difficulty: 2, acceptedAnswers: ["v'=6x-1"], hint: "Differentiate term by term.", explanation: "$\\frac{d}{dx}(3x^2-x)=6x-1$." },
        { id: "y11adv-pr-p21", prompt: "Use the product rule on $y=x^2(x+3)$, then evaluate $\\frac{dy}{dx}$ at $x=1$. The derivative is $3x^2+6x$.", latex: "y=x^2(x+3),\\quad \\frac{dy}{dx}=3x^2+6x,\\quad x=1", answer: "9", difficulty: 4, acceptedAnswers: ["dy/dx=9"], hint: "Substitute $x=1$.", explanation: "$3(1)+6(1)=9$." },
        { id: "y11adv-pr-p22", prompt: "Use the product rule on $y=x(x^2-1)$, then evaluate $\\frac{dy}{dx}$ at $x=2$. The derivative is $3x^2-1$.", latex: "y=x(x^2-1),\\quad \\frac{dy}{dx}=3x^2-1,\\quad x=2", answer: "11", difficulty: 4, acceptedAnswers: ["dy/dx=11"], hint: "Substitute $x=2$.", explanation: "$3(4)-1=11$." },
        { id: "y11adv-pr-p23", prompt: "Differentiate $y=x^2(x-4)$ using the product rule and give the simplified derivative.", latex: "y=x^2(x-4)", answer: "3x^2-8x", difficulty: 5, acceptedAnswers: ["dy/dx=3x^2-8x"], hint: "$u'v+uv'=2x(x-4)+x^2$.", explanation: "$2x(x-4)+x^2=2x^2-8x+x^2=3x^2-8x$." },
        { id: "y11adv-pr-p24", prompt: "Use the product rule on $y=2x(x^2+1)$, then evaluate $\\frac{dy}{dx}$ at $x=1$. The derivative is $6x^2+2$.", latex: "y=2x(x^2+1),\\quad \\frac{dy}{dx}=6x^2+2,\\quad x=1", answer: "8", difficulty: 4, acceptedAnswers: ["dy/dx=8"], hint: "Substitute $x=1$.", explanation: "$6(1)+2=8$." },
        { id: "y11adv-pr-p25", prompt: "Differentiate $y=x(2x-3)$ using the product rule and give the simplified derivative.", latex: "y=x(2x-3)", answer: "4x-3", difficulty: 4, acceptedAnswers: ["dy/dx=4x-3"], hint: "$u'v+uv'=(2x-3)+x\\cdot2$.", explanation: "$(2x-3)+2x=4x-3$." },
        { id: "y11adv-pr-p26", prompt: "Differentiate $y=x^2(x^2-1)$ using the product rule and give the simplified derivative.", latex: "y=x^2(x^2-1)", answer: "4x^3-2x", difficulty: 5, acceptedAnswers: ["dy/dx=4x^3-2x"], hint: "$u'v+uv'=2x(x^2-1)+x^2\\cdot2x$.", explanation: "$2x^3-2x+2x^3=4x^3-2x$." },
        { id: "y11adv-pr-p27", prompt: "Use the product rule on $y=x^2(x-1)$, then find the $x$-values where $\\frac{dy}{dx}=0$. Give the larger value.", latex: "y=x^2(x-1),\\quad \\frac{dy}{dx}=3x^2-2x", answer: "2/3", difficulty: 5, acceptedAnswers: ["x=2/3", "0.667"], hint: "Solve $3x^2-2x=x(3x-2)=0$.", explanation: "$x(3x-2)=0$ gives $x=0$ or $x=\\frac23$; larger is $\\frac23$." },
        { id: "y11adv-pr-p28", prompt: "Differentiate $y=x(x+1)(x+2)$ after expanding, and give the simplified derivative.", latex: "y=x(x+1)(x+2)", answer: "3x^2+6x+2", difficulty: 5, acceptedAnswers: ["dy/dx=3x^2+6x+2"], hint: "Expand to $x^3+3x^2+2x$ first.", explanation: "$y=x^3+3x^2+2x$, so $\\frac{dy}{dx}=3x^2+6x+2$." },
        { id: "y11adv-pr-p29", prompt: "Use the product rule on $y=x^3(x+2)$, then evaluate $\\frac{dy}{dx}$ at $x=1$. The derivative is $4x^3+6x^2$.", latex: "y=x^3(x+2),\\quad \\frac{dy}{dx}=4x^3+6x^2,\\quad x=1", answer: "10", difficulty: 5, acceptedAnswers: ["dy/dx=10"], hint: "Substitute $x=1$.", explanation: "$4(1)+6(1)=10$." },
        { id: "y11adv-pr-p30", prompt: "Differentiate $y=(x+1)(x-3)$ using the product rule and give the simplified derivative.", latex: "y=(x+1)(x-3)", answer: "2x-2", difficulty: 5, acceptedAnswers: ["dy/dx=2x-2"], hint: "$u'v+uv'=(x-3)+(x+1)$.", explanation: "$(x-3)+(x+1)=2x-2$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pr-mp1",
          prompt: "Apply the product rule to y = x²(x + 3).",
          latex: "y=x^2(x+3)",
          answer: "2x",
          hint: "Label u and v, differentiate each, then apply u'v + uv'.",
          explanation: "(a) u'=2x. (b) v'=1. (c) dy/dx=3x²+6x; at x=1 the value is 9.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find u' when u = x².", latex: "u=x^2", marks: 1, answer: "2x", hint: "Use the power rule on x².", explanation: "d/dx(x²) = 2x." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x + 3.", latex: "v=x+3", marks: 1, answer: "1", hint: "Differentiate x+3 term by term.", explanation: "d/dx(x+3) = 1." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 1. The derivative is dy/dx = 3x² + 6x.", latex: "\\frac{dy}{dx}=3x^2+6x,\\quad x=1", marks: 2, answer: "9", hint: "Substitute x=1 into 3(1)²+6(1).", explanation: "3(1)+6(1) = 3+6 = 9." },
          ],
        },
        {
          id: "y11adv-pr-mp2",
          prompt: "Apply the product rule to y = x(x² − 1).",
          latex: "y=x(x^2-1)",
          answer: "1",
          hint: "u=x, v=x²-1. Find u', v', apply u'v+uv', then evaluate at x=2.",
          explanation: "(a) u'=1. (b) v'=2x. (c) dy/dx=3x²-1; at x=2 the value is 11.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find u' when u = x.", latex: "u=x", marks: 1, answer: "1", hint: "d/dx(x) = 1.", explanation: "The derivative of x is 1." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x² − 1.", latex: "v=x^2-1", marks: 1, answer: "2x", hint: "Differentiate x²-1 term by term.", explanation: "d/dx(x²-1) = 2x." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 2. The derivative is dy/dx = 3x² − 1.", latex: "\\frac{dy}{dx}=3x^2-1,\\quad x=2", marks: 2, answer: "11", hint: "Substitute x=2: 3(4)-1.", explanation: "3(2²)-1 = 12-1 = 11." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "quotient-rule") {
    return {
      ...base,
      description:
        "Differentiate quotients of two functions using the quotient rule dy/dx = (u'v − uv')/v²; identify when the rule is needed and evaluate derivatives at given x-values.",
      learningIntention:
        "Learn to apply the quotient rule to differentiate expressions of the form y = f(x)/g(x), including evaluating the resulting derivative at specific x-values.",
      successCriteria: [
        "State the quotient rule: d/dx(u/v) = (u'v − uv')/v².",
        "Identify u and v in a rational function.",
        "Differentiate each part, then combine using the quotient rule.",
        "Evaluate a quotient-rule derivative at a given x-value.",
        "Recognise when the expression can be simplified before applying the rule.",
      ],
      teaching: {
        paragraphs: [
          "The quotient rule applies when you need to differentiate a fraction whose numerator and denominator are both functions of x.",
          "Name the numerator u and the denominator v. The rule is: u prime times v, minus u times v prime, all divided by v squared.",
          "The order in the numerator matters: it is u'v − uv' (not uv' − u'v). The denominator is always v².",
          "Check if the fraction can be simplified by cancellation before applying the rule. If it simplifies to a polynomial, use the power rule instead.",
          "Evaluate by substituting the given x-value into the derivative expression.",
        ],
        latexBlocks: [
          "\\frac{d}{dx}\\!\\left(\\frac{u}{v}\\right)=\\frac{u'v-uv'}{v^2}",
          "\\text{Example: }y=\\frac{x+1}{x},\\quad u=x+1,\\;u'=1,\\quad v=x,\\;v'=1",
          "\\frac{dy}{dx}=\\frac{1\\cdot x-(x+1)\\cdot1}{x^2}=\\frac{-1}{x^2}",
        ],
      },
      workedExamples: [
        {
          title: "Apply the quotient rule to y = (x+1)/x",
          questionLatex: "y=\\frac{x+1}{x}",
          steps: [
            { explanation: "Let u = x+1 and v = x.", latex: "u=x+1,\\quad v=x" },
            { explanation: "Differentiate each part.", latex: "u'=1,\\quad v'=1" },
            { explanation: "Apply the quotient rule.", latex: "\\frac{dy}{dx}=\\frac{1\\cdot x-(x+1)\\cdot1}{x^2}" },
            { explanation: "Simplify the numerator.", latex: "=\\frac{x-x-1}{x^2}=-\\frac{1}{x^2}" },
          ],
          finalAnswerLatex: "\\frac{dy}{dx}=-\\frac{1}{x^2}",
        },
        {
          title: "Evaluate the quotient-rule derivative at a point",
          questionLatex: "y=\\frac{x+1}{x},\\quad\\text{find }\\frac{dy}{dx}\\text{ at }x=1",
          steps: [
            { explanation: "From the previous example, dy/dx = −1/x².", latex: "\\frac{dy}{dx}=-\\frac{1}{x^2}" },
            { explanation: "Substitute x = 1.", latex: "-\\frac{1}{1^2}=-1" },
          ],
          finalAnswerLatex: "-1",
        },
        {
          title: "Apply the quotient rule to y = (x+3)/(x−1)",
          questionLatex: "y=\\frac{x+3}{x-1}",
          steps: [
            { explanation: "Let u = x+3 and v = x-1.", latex: "u=x+3,\\quad v=x-1" },
            { explanation: "Differentiate each part.", latex: "u'=1,\\quad v'=1" },
            { explanation: "Apply the quotient rule.", latex: "\\frac{dy}{dx}=\\frac{1\\cdot(x-1)-(x+3)\\cdot1}{(x-1)^2}" },
            { explanation: "Simplify the numerator.", latex: "=\\frac{x-1-x-3}{(x-1)^2}=-\\frac{4}{(x-1)^2}" },
          ],
          finalAnswerLatex: "\\frac{dy}{dx}=-\\frac{4}{(x-1)^2}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-qr-g1", "Choose the correct quotient rule formula.", "C",
          ["$\\dfrac{u'}{v'}$", "$\\dfrac{u'v'}{v^2}$", "$\\dfrac{u'v-uv'}{v^2}$", "$\\dfrac{uv'-u'v}{v^2}$"],
          "The quotient rule is (u'v − uv') ÷ v². The order in the numerator matters: u'v first, then subtract uv'.",
          "\\frac{d}{dx}\\!\\left(\\frac{u}{v}\\right)"),
        formulaAnswer("y11adv-qr-g2", "For y = (x+1)/x, find u' when u = x+1.", "u=x+1,\\quad u'=\\Box", "1"),
        formulaAnswer("y11adv-qr-g3", "For y = (x+1)/x, find v' when v = x.", "v=x,\\quad v'=\\Box", "1"),
        formulaAnswer("y11adv-qr-g4", "Evaluate dy/dx = −1/x² at x = 1.", "\\frac{dy}{dx}=-\\frac{1}{x^2},\\quad x=1", "-1", ["−1"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-qr-i1", "For y = (x²+4)/x, find u' when u = x²+4.", "u=x^2+4,\\quad u'=\\Box", "2x"),
        formulaAnswer("y11adv-qr-i2", "For y = (x²+4)/x, find v' when v = x.", "v=x,\\quad v'=\\Box", "1"),
        formulaAnswer("y11adv-qr-i3", "Evaluate d/dx[(x²+4)/x] at x = 1. The derivative is (x²−4)/x².", "\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]=\\frac{x^2-4}{x^2},\\quad x=1", "-3", ["−3"]),
        formulaAnswer("y11adv-qr-i4", "Evaluate d/dx[(x²+4)/x] at x = 2.", "\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]=\\frac{x^2-4}{x^2},\\quad x=2", "0"),
        practicalChoice("y11adv-qr-i5", "For y = (x+3)/(x−1), what does v² equal in the denominator of the quotient rule?", "B",
          ["$(x+3)^2$", "$(x-1)^2$", "$x^2$", "$(x+3)(x-1)$"],
          "v is the denominator x−1, so v² = (x−1)².",
          "y=\\frac{x+3}{x-1}"),
      ],
      commonMistakes: [
        { mistake: "Reversing the numerator to uv' − u'v instead of u'v − uv'.", fix: "Memorise the order: u'v comes first, then subtract uv'. A wrong sign here reverses the sign of the whole derivative." },
        { mistake: "Writing v instead of v² in the denominator.", fix: "The quotient rule always divides by v squared, not v." },
        { mistake: "Applying the quotient rule when the fraction simplifies first.", fix: "Try cancelling or splitting the fraction before using the rule. For example, (x²+x)/x = x+1, which needs only the power rule." },
        { mistake: "Forgetting that v' may require the chain rule when v is composite.", fix: "If v = (x+1)², then v' = 2(x+1), not 1." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-qr-m1", "Evaluate the derivative of y = (x+3)/(x−1) at x = 2. The derivative is −4/(x−1)².", "y=\\frac{x+3}{x-1},\\quad \\frac{dy}{dx}=-\\frac{4}{(x-1)^2},\\quad x=2", "-4", ["−4"]),
        formulaAnswer("y11adv-qr-m2", "Evaluate the derivative of y = x/(x+1) at x = 0. The derivative is 1/(x+1)².", "y=\\frac{x}{x+1},\\quad \\frac{dy}{dx}=\\frac{1}{(x+1)^2},\\quad x=0", "1"),
        formulaAnswer("y11adv-qr-m3", "For y = (2x+3)/(x+1), find u' when u = 2x+3.", "u=2x+3,\\quad u'=\\Box", "2"),
        formulaAnswer("y11adv-qr-m4", "Evaluate the derivative of y = (2x+3)/(x+1) at x = 0. The derivative is −1/(x+1)².", "y=\\frac{2x+3}{x+1},\\quad \\frac{dy}{dx}=-\\frac{1}{(x+1)^2},\\quad x=0", "-1", ["−1"]),
        formulaAnswer("y11adv-qr-m5", "Evaluate the derivative of y = (x+3)/(x−1) at x = 3.", "y=\\frac{x+3}{x-1},\\quad \\frac{dy}{dx}=-\\frac{4}{(x-1)^2},\\quad x=3", "-1", ["−1"]),
        formulaAnswer("y11adv-qr-m6", "Evaluate the derivative of y = x²/(x−1) at x = 2. The derivative is (x²−2x)/(x−1)².", "y=\\frac{x^2}{x-1},\\quad \\frac{dy}{dx}=\\frac{x^2-2x}{(x-1)^2},\\quad x=2", "0"),
        practicalChoice("y11adv-qr-m7", "A student differentiates y = (x+2)/(x−1) and gets dy/dx = 1/(x−1)². What was the error?", "B",
          ["The denominator should be (x−1) not (x−1)²", "The term −uv' = −(x+2)·1 was omitted from the numerator", "u' should be zero", "The quotient rule does not apply here"],
          "The quotient-rule numerator needs u'v − uv'. The student only kept u'v = (x−1) and dropped −uv' = −(x+2).",
          "y=\\frac{x+2}{x-1}"),
        formulaAnswer("y11adv-qr-m8", "Evaluate the derivative of y = (x+1)/x at x = 1.", "y=\\frac{x+1}{x},\\quad \\frac{dy}{dx}=-\\frac{1}{x^2},\\quad x=1", "-1", ["−1"]),
        practicalChoice("y11adv-qr-m9", "Which function can be differentiated without the quotient rule by simplifying first?", "A",
          ["$y=\\dfrac{x^2+3x}{x}$", "$y=\\dfrac{x+1}{x+2}$", "$y=\\dfrac{x^2}{x+1}$", "$y=\\dfrac{\\sin x}{x}$"],
          "(x²+3x)/x simplifies to x+3, a polynomial that needs only the power rule.",
          "\\text{Simplify first?}"),
        formulaAnswer("y11adv-qr-m10", "Evaluate the derivative of y = (x+2)/(x−1) at x = 2. The derivative is −3/(x−1)².", "y=\\frac{x+2}{x-1},\\quad \\frac{dy}{dx}=-\\frac{3}{(x-1)^2},\\quad x=2", "-3", ["−3"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-qr-p1", prompt: "Choose the correct quotient rule formula.", latex: "\\frac{d}{dx}\\!\\left(\\frac{u}{v}\\right)", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$\\frac{u'}{v'}$" }, { label: "B", text: "$\\frac{u'v'}{v^2}$" }, { label: "C", text: "$\\frac{u'v-uv'}{v^2}$" }, { label: "D", text: "$\\frac{uv'-u'v}{v^2}$" }], hint: "$u'v$ first, then subtract $uv'$, over $v^2$.", explanation: "The quotient rule is $\\frac{u'v-uv'}{v^2}$." },
        { id: "y11adv-qr-p2", prompt: "For $y=(x+1)/x$, find $u'$ when $u=x+1$.", latex: "u=x+1", answer: "1", difficulty: 1, acceptedAnswers: ["u'=1"], hint: "Differentiate $x+1$.", explanation: "$\\frac{d}{dx}(x+1)=1$." },
        { id: "y11adv-qr-p3", prompt: "For $y=(x+1)/x$, find $v'$ when $v=x$.", latex: "v=x", answer: "1", difficulty: 1, acceptedAnswers: ["v'=1"], hint: "Differentiate $x$.", explanation: "$\\frac{d}{dx}(x)=1$." },
        { id: "y11adv-qr-p4", prompt: "For $y=(2x+3)/(x+1)$, find $u'$ when $u=2x+3$.", latex: "u=2x+3", answer: "2", difficulty: 1, acceptedAnswers: ["u'=2"], hint: "Differentiate $2x+3$.", explanation: "$\\frac{d}{dx}(2x+3)=2$." },
        { id: "y11adv-qr-p5", prompt: "Evaluate $\\frac{dy}{dx}=-\\frac{1}{x^2}$ at $x=1$. Give the value with its sign.", latex: "\\frac{dy}{dx}=-\\frac{1}{x^2},\\quad x=1", answer: "-1", difficulty: 1, acceptedAnswers: ["-1", "−1"], hint: "Substitute $x=1$.", explanation: "$-\\frac{1}{1^2}=-1$." },
        { id: "y11adv-qr-p6", prompt: "For $y=(x^2+4)/x$, find $u'$ when $u=x^2+4$.", latex: "u=x^2+4", answer: "2x", difficulty: 2, acceptedAnswers: ["u'=2x"], hint: "Differentiate $x^2+4$.", explanation: "$\\frac{d}{dx}(x^2+4)=2x$." },
        { id: "y11adv-qr-p7", prompt: "Evaluate the derivative of $y=(x+1)/x$ at $x=1$. The derivative is $-1/x^2$. Give the value with its sign.", latex: "y=\\frac{x+1}{x},\\quad \\frac{dy}{dx}=-\\frac{1}{x^2},\\quad x=1", answer: "-1", difficulty: 2, acceptedAnswers: ["-1", "−1"], hint: "Substitute $x=1$.", explanation: "$-\\frac{1}{1}=-1$." },
        { id: "y11adv-qr-p8", prompt: "Evaluate the derivative of $y=x/(x+1)$ at $x=0$. The derivative is $1/(x+1)^2$.", latex: "y=\\frac{x}{x+1},\\quad \\frac{dy}{dx}=\\frac{1}{(x+1)^2},\\quad x=0", answer: "1", difficulty: 2, acceptedAnswers: ["dy/dx=1"], hint: "Substitute $x=0$.", explanation: "$\\frac{1}{(0+1)^2}=1$." },
        { id: "y11adv-qr-p9", prompt: "For $y=(x+3)/(x-1)$, what does $v^2$ equal in the denominator of the quotient rule?", latex: "y=\\frac{x+3}{x-1}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$(x+3)^2$" }, { label: "B", text: "$(x-1)^2$" }, { label: "C", text: "$x^2$" }, { label: "D", text: "$(x+3)(x-1)$" }], hint: "$v$ is the denominator.", explanation: "$v=x-1$, so $v^2=(x-1)^2$." },
        { id: "y11adv-qr-p10", prompt: "Evaluate $\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]$ at $x=2$. The derivative is $\\frac{x^2-4}{x^2}$.", latex: "\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]=\\frac{x^2-4}{x^2},\\quad x=2", answer: "0", difficulty: 2, acceptedAnswers: ["dy/dx=0"], hint: "Substitute $x=2$.", explanation: "$\\frac{4-4}{4}=0$." },
        { id: "y11adv-qr-p11", prompt: "Evaluate the derivative of $y=(x+3)/(x-1)$ at $x=2$. The derivative is $-4/(x-1)^2$. Give the value with its sign.", latex: "y=\\frac{x+3}{x-1},\\quad \\frac{dy}{dx}=-\\frac{4}{(x-1)^2},\\quad x=2", answer: "-4", difficulty: 3, acceptedAnswers: ["-4", "−4"], hint: "Substitute $x=2$.", explanation: "$-\\frac{4}{(2-1)^2}=-4$." },
        { id: "y11adv-qr-p12", prompt: "Evaluate the derivative of $y=(x+3)/(x-1)$ at $x=3$. The derivative is $-4/(x-1)^2$. Give the value with its sign.", latex: "y=\\frac{x+3}{x-1},\\quad \\frac{dy}{dx}=-\\frac{4}{(x-1)^2},\\quad x=3", answer: "-1", difficulty: 3, acceptedAnswers: ["-1", "−1"], hint: "Substitute $x=3$.", explanation: "$-\\frac{4}{(3-1)^2}=-\\frac{4}{4}=-1$." },
        { id: "y11adv-qr-p13", prompt: "Evaluate the derivative of $y=x^2/(x-1)$ at $x=2$. The derivative is $\\frac{x^2-2x}{(x-1)^2}$.", latex: "y=\\frac{x^2}{x-1},\\quad \\frac{dy}{dx}=\\frac{x^2-2x}{(x-1)^2},\\quad x=2", answer: "0", difficulty: 3, acceptedAnswers: ["dy/dx=0"], hint: "Substitute $x=2$.", explanation: "$\\frac{4-4}{1}=0$." },
        { id: "y11adv-qr-p14", prompt: "A student differentiates $y=(x+2)/(x-1)$ and gets $\\frac{dy}{dx}=1/(x-1)^2$. What was the error?", latex: "y=\\frac{x+2}{x-1}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The denominator should be $(x-1)$ not $(x-1)^2$" }, { label: "B", text: "The term $-uv'=-(x+2)\\cdot1$ was omitted" }, { label: "C", text: "$u'$ should be zero" }, { label: "D", text: "The quotient rule does not apply here" }], hint: "Check both numerator terms.", explanation: "The student dropped $-uv'=-(x+2)$; the numerator should be $(x-1)-(x+2)=-3$." },
        { id: "y11adv-qr-p15", prompt: "Which function can be differentiated without the quotient rule by simplifying first?", latex: "\\text{Simplify first?}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=\\dfrac{x^2+3x}{x}$" }, { label: "B", text: "$y=\\dfrac{x+1}{x+2}$" }, { label: "C", text: "$y=\\dfrac{x^2}{x+1}$" }, { label: "D", text: "$y=\\dfrac{\\sin x}{x}$" }], hint: "Look for a common factor to cancel.", explanation: "$\\frac{x^2+3x}{x}=x+3$, a polynomial needing only the power rule." },
        { id: "y11adv-qr-p16", prompt: "Evaluate the derivative of $y=(2x+3)/(x+1)$ at $x=0$. The derivative is $-1/(x+1)^2$. Give the value with its sign.", latex: "y=\\frac{2x+3}{x+1},\\quad \\frac{dy}{dx}=-\\frac{1}{(x+1)^2},\\quad x=0", answer: "-1", difficulty: 2, acceptedAnswers: ["-1", "−1"], hint: "Substitute $x=0$.", explanation: "$-\\frac{1}{(0+1)^2}=-1$." },
        { id: "y11adv-qr-p17", prompt: "Evaluate the derivative of $y=(x+1)/x$ at $x=2$. The derivative is $-1/x^2$. Give the exact fraction with its sign.", latex: "y=\\frac{x+1}{x},\\quad \\frac{dy}{dx}=-\\frac{1}{x^2},\\quad x=2", answer: "-1/4", difficulty: 2, acceptedAnswers: ["-1/4", "−1/4", "-0.25"], hint: "Substitute $x=2$.", explanation: "$-\\frac{1}{2^2}=-\\frac14$." },
        { id: "y11adv-qr-p18", prompt: "For $y=x^2/(x+2)$, find $u'$ when $u=x^2$.", latex: "u=x^2", answer: "2x", difficulty: 2, acceptedAnswers: ["u'=2x"], hint: "Differentiate $x^2$.", explanation: "$\\frac{d}{dx}(x^2)=2x$." },
        { id: "y11adv-qr-p19", prompt: "For $y=(x+1)^2/x$, find $v'$ when $v=x$.", latex: "v=x", answer: "1", difficulty: 2, acceptedAnswers: ["v'=1"], hint: "Differentiate $x$.", explanation: "$\\frac{d}{dx}(x)=1$." },
        { id: "y11adv-qr-p20", prompt: "Evaluate $\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]$ at $x=1$. The derivative is $\\frac{x^2-4}{x^2}$. Give the value with its sign.", latex: "\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]=\\frac{x^2-4}{x^2},\\quad x=1", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "Substitute $x=1$.", explanation: "$\\frac{1-4}{1}=-3$." },
        { id: "y11adv-qr-p21", prompt: "Evaluate the derivative of $y=(x+2)/(x-1)$ at $x=2$. The derivative is $-3/(x-1)^2$. Give the value with its sign.", latex: "y=\\frac{x+2}{x-1},\\quad \\frac{dy}{dx}=-\\frac{3}{(x-1)^2},\\quad x=2", answer: "-3", difficulty: 4, acceptedAnswers: ["-3", "−3"], hint: "Substitute $x=2$.", explanation: "$-\\frac{3}{(2-1)^2}=-3$." },
        { id: "y11adv-qr-p22", prompt: "Differentiate $y=(x+1)/x$ using the quotient rule and give the simplified derivative.", latex: "y=\\frac{x+1}{x}", answer: "-1/x^2", difficulty: 4, acceptedAnswers: ["dy/dx=-1/x^2", "-\\frac{1}{x^2}"], hint: "$\\frac{1\\cdot x-(x+1)\\cdot1}{x^2}$.", explanation: "$\\frac{x-x-1}{x^2}=-\\frac{1}{x^2}$." },
        { id: "y11adv-qr-p23", prompt: "Evaluate the derivative of $y=x/(x+2)$ at $x=0$. The derivative is $2/(x+2)^2$. Give the exact fraction.", latex: "y=\\frac{x}{x+2},\\quad \\frac{dy}{dx}=\\frac{2}{(x+2)^2},\\quad x=0", answer: "1/2", difficulty: 5, acceptedAnswers: ["1/2", "0.5"], hint: "Substitute $x=0$.", explanation: "$\\frac{2}{(0+2)^2}=\\frac{2}{4}=\\frac12$." },
        { id: "y11adv-qr-p24", prompt: "Differentiate $y=(x-1)/(x+1)$ using the quotient rule and give the simplified derivative.", latex: "y=\\frac{x-1}{x+1}", answer: "2/(x+1)^2", difficulty: 4, acceptedAnswers: ["dy/dx=2/(x+1)^2", "\\frac{2}{(x+1)^2}"], hint: "$\\frac{1\\cdot(x+1)-(x-1)\\cdot1}{(x+1)^2}$.", explanation: "$\\frac{(x+1)-(x-1)}{(x+1)^2}=\\frac{2}{(x+1)^2}$." },
        { id: "y11adv-qr-p25", prompt: "Evaluate the derivative of $y=(2x+3)/(x+1)$ at $x=1$. The derivative is $-1/(x+1)^2$. Give the exact fraction with its sign.", latex: "y=\\frac{2x+3}{x+1},\\quad \\frac{dy}{dx}=-\\frac{1}{(x+1)^2},\\quad x=1", answer: "-1/4", difficulty: 4, acceptedAnswers: ["-1/4", "−1/4", "-0.25"], hint: "Substitute $x=1$.", explanation: "$-\\frac{1}{(1+1)^2}=-\\frac14$." },
        { id: "y11adv-qr-p26", prompt: "Differentiate $y=(x+3)/(x-1)$ using the quotient rule and give the simplified derivative.", latex: "y=\\frac{x+3}{x-1}", answer: "-4/(x-1)^2", difficulty: 5, acceptedAnswers: ["dy/dx=-4/(x-1)^2", "-\\frac{4}{(x-1)^2}"], hint: "$\\frac{1\\cdot(x-1)-(x+3)\\cdot1}{(x-1)^2}$.", explanation: "$\\frac{(x-1)-(x+3)}{(x-1)^2}=-\\frac{4}{(x-1)^2}$." },
        { id: "y11adv-qr-p27", prompt: "Differentiate $y=x^2/(x-1)$ using the quotient rule and give the simplified derivative.", latex: "y=\\frac{x^2}{x-1}", answer: "(x^2-2x)/(x-1)^2", difficulty: 5, acceptedAnswers: ["dy/dx=(x^2-2x)/(x-1)^2", "\\frac{x^2-2x}{(x-1)^2}"], hint: "$\\frac{2x(x-1)-x^2\\cdot1}{(x-1)^2}$.", explanation: "$\\frac{2x^2-2x-x^2}{(x-1)^2}=\\frac{x^2-2x}{(x-1)^2}$." },
        { id: "y11adv-qr-p28", prompt: "Evaluate the derivative of $y=x^2/(x-1)$ at $x=3$. The derivative is $\\frac{x^2-2x}{(x-1)^2}$. Give the exact fraction.", latex: "y=\\frac{x^2}{x-1},\\quad \\frac{dy}{dx}=\\frac{x^2-2x}{(x-1)^2},\\quad x=3", answer: "3/4", difficulty: 5, acceptedAnswers: ["3/4", "0.75"], hint: "Substitute $x=3$.", explanation: "$\\frac{9-6}{(3-1)^2}=\\frac{3}{4}$." },
        { id: "y11adv-qr-p29", prompt: "Differentiate $y=(2x+1)/(x-3)$ using the quotient rule and give the simplified derivative.", latex: "y=\\frac{2x+1}{x-3}", answer: "-7/(x-3)^2", difficulty: 5, acceptedAnswers: ["dy/dx=-7/(x-3)^2", "-\\frac{7}{(x-3)^2}"], hint: "$\\frac{2(x-3)-(2x+1)\\cdot1}{(x-3)^2}$.", explanation: "$\\frac{2x-6-2x-1}{(x-3)^2}=-\\frac{7}{(x-3)^2}$." },
        { id: "y11adv-qr-p30", prompt: "Evaluate the derivative of $y=(2x+1)/(x-3)$ at $x=4$. The derivative is $-7/(x-3)^2$. Give the value with its sign.", latex: "y=\\frac{2x+1}{x-3},\\quad \\frac{dy}{dx}=-\\frac{7}{(x-3)^2},\\quad x=4", answer: "-7", difficulty: 5, acceptedAnswers: ["-7", "−7"], hint: "Substitute $x=4$.", explanation: "$-\\frac{7}{(4-3)^2}=-7$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-qr-mp1",
          prompt: "Apply the quotient rule to y = (x² + 4)/x.",
          latex: "y=\\frac{x^2+4}{x}",
          answer: "2x",
          hint: "u=x²+4, v=x. Find u' and v', apply (u'v−uv')/v², then evaluate at x=1.",
          explanation: "(a) u'=2x. (b) v'=1. (c) dy/dx=(x²−4)/x²; at x=1 the value is −3.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find u' when u = x² + 4.", latex: "u=x^2+4", marks: 1, answer: "2x", hint: "Differentiate x²+4 term by term.", explanation: "d/dx(x²+4) = 2x." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x.", latex: "v=x", marks: 1, answer: "1", hint: "d/dx(x) = 1.", explanation: "The derivative of x is 1." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 1. The derivative is dy/dx = (x² − 4)/x².", latex: "\\frac{dy}{dx}=\\frac{x^2-4}{x^2},\\quad x=1", marks: 2, answer: "-3", acceptedAnswers: ["-3", "−3"], hint: "Substitute x=1: (1−4)/1.", explanation: "(1²-4)/1² = −3." },
          ],
        },
        {
          id: "y11adv-qr-mp2",
          prompt: "Apply the quotient rule to y = (x + 3)/(x − 1).",
          latex: "y=\\frac{x+3}{x-1}",
          answer: "1",
          hint: "u=x+3, v=x−1. Find u' and v', apply (u'v−uv')/v², then evaluate at x=2.",
          explanation: "(a) u'=1. (b) v'=1. (c) dy/dx=−4/(x−1)²; at x=2 the value is −4.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find u' when u = x + 3.", latex: "u=x+3", marks: 1, answer: "1", hint: "d/dx(x+3) = 1.", explanation: "The derivative of x+3 is 1." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x − 1.", latex: "v=x-1", marks: 1, answer: "1", hint: "d/dx(x−1) = 1.", explanation: "The derivative of x−1 is 1." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 2. The derivative is dy/dx = −4/(x − 1)².", latex: "\\frac{dy}{dx}=-\\frac{4}{(x-1)^2},\\quad x=2", marks: 2, answer: "-4", acceptedAnswers: ["-4", "−4"], hint: "Substitute x=2: −4/(2−1)².", explanation: "−4/(1)² = −4." },
          ],
        },
      ],
    };
  }

  return null;
}
