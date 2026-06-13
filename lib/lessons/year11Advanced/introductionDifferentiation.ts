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
  const intervalVariants = greaterThanMatch
    ? [
        `${greaterThanMatch[1]} < x`,
        `${greaterThanMatch[1]}<x`,
        `x is greater than ${greaterThanMatch[1]}`,
        `(${greaterThanMatch[1]}, infinity)`,
        `(${greaterThanMatch[1]},\\infty)`,
        `(${greaterThanMatch[1]}, \\infty)`,
      ]
    : [];

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
    };
  }

  if (lesson.slug === "introduction-differentiation-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed assessment-style differentiation questions involving rates, first principles, polynomial derivatives, tangents, and normals.",
      learningIntention:
        "Apply introductory differentiation skills to mixed school-assessment questions with clear setup, short answers, and interpretation.",
      successCriteria: [
        "Calculate average rates of change from values, tables, and contexts.",
        "Choose correct first-principles setups.",
        "Differentiate polynomial functions accurately.",
        "Evaluate derivatives at points.",
        "Find tangent and normal gradients and equations.",
        "Recognise common differentiation errors.",
      ],
      teaching: {
        paragraphs: [
          "Mixed differentiation questions become easier when you name the job first: average change, instantaneous gradient, derivative rule, tangent line, or normal line.",
          "Average rate uses two points and gives a secant gradient. Instantaneous rate uses the derivative at one point and gives the tangent gradient.",
          "First-principles questions are about shrinking an interval: simplify the nearby-point gradient before letting h approach zero.",
          "For polynomial derivatives, multiply by the old power and reduce the power by 1. For tangent and normal equations, find the derivative, find the point, then use point-gradient form.",
          "Before answering, check whether the question wants a y-value, a gradient, a coordinate, an equation, or an interpretation. Those are related ideas, but they are not interchangeable.",
        ],
        latexBlocks: [
          "\\frac{f(b)-f(a)}{b-a}",
          "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}",
          "\\frac{d}{dx}(ax^n)=anx^{n-1}",
          "y-y_1=m(x-x_1)",
          "m_{\\text{normal}}=-\\frac{1}{m_{\\text{tangent}}}",
        ],
      },
      workedExamples: [
        {
          title: "Mixed rate and derivative question",
          questionLatex: "f(1)=2,\\quad f(5)=18,\\quad g(x)=x^3-4x",
          steps: [
            { explanation: "Average rate of change for f uses two function values.", latex: "\\frac{18-2}{5-1}=4" },
            { explanation: "A derivative question for g starts by differentiating.", latex: "g'(x)=3x^2-4" },
          ],
          finalAnswerLatex: "\\text{Average rate }=4,\\quad g'(x)=3x^2-4",
        },
        {
          title: "Tangent equation in an assessment style",
          questionLatex: "y=x^2-2x,\\quad x=3",
          steps: [
            { explanation: "Find the point on the curve.", latex: "y=3^2-2(3)=3\\Rightarrow (3,3)" },
            { explanation: "Differentiate and evaluate the tangent gradient.", latex: "\\frac{dy}{dx}=2x-2,\\quad m=4" },
            { explanation: "Use point-gradient form.", latex: "y-3=4(x-3)" },
          ],
          finalAnswerLatex: "y=4x-9",
        },
        {
          title: "Recognise a first-principles setup",
          questionLatex: "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}",
          steps: [
            { explanation: "The numerator is the new output minus the original output.", latex: "f(x+h)-f(x)" },
            { explanation: "The denominator is the small change in input.", latex: "h" },
          ],
          finalAnswerLatex: "\\frac{f(x+h)-f(x)}{h}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-id-exam-g1", "Find the average rate of change over the interval.", "f(2)=5,\\quad f(8)=23", "3", ["m=3"]),
        practicalChoice("y11adv-id-exam-g2", "Choose the correct first-principles setup.", "B", ["$\\lim_{h\\to0}\\frac{f(x)-f(x+h)}{h}$", "$\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$", "$\\lim_{h\\to0}\\frac{f(x+h)+f(x)}{h}$", "$\\lim_{h\\to0}\\frac{f(h)-f(x)}{x}$"], "Use new output minus original output over h.", "f'(x)"),
        formulaAnswer("y11adv-id-exam-g3", "Differentiate the polynomial function.", "f(x)=3x^3-2x+1", "9x^2-2", ["f'(x)=9x^2-2"]),
        formulaAnswer("y11adv-id-exam-g4", "Find the normal gradient for the given tangent gradient.", "m_{\\text{tangent}}=5", "-1/5", ["-0.2"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-id-exam-i1", "Find the average rate of change from the table.", "\\begin{array}{c|cc}x&0&4\\\\ f(x)&6&30\\end{array}", "6", ["m=6"]),
        formulaAnswer("y11adv-id-exam-i2", "Evaluate the derivative at the given x-value.", "f(x)=2x^2-5x,\\quad x=3", "7", ["f'(3)=7"]),
        practicalChoice("y11adv-id-exam-i3", "Which option identifies the constant-term error?", "C", ["The derivative should use first principles only", "The derivative should be negative", "The constant should differentiate to zero", "The x-value should be substituted first"], "Constants differentiate to zero.", "\\frac{d}{dx}(4x^2+9)=8x+9"),
        formulaAnswer("y11adv-id-exam-i4", "Find the tangent equation at the point on the curve. Give your answer in the form $y=mx+c$.", "y=x^2+2,\\quad x=1", "y=2x+1", ["y = 2x + 1"]),
        practicalChoice("y11adv-id-exam-i5", "Which interpretation matches the derivative value in this context?", "A", ["The height is decreasing at 6 metres per second", "The height is increasing at 6 metres per second", "The average height is 6 metres", "The tangent is vertical"], "A negative derivative means the height is decreasing.", "h'(4)=-6\\text{ m/s}"),
      ],
      commonMistakes: [
        { mistake: "Using average rate of change when the question asks for a tangent gradient.", fix: "Average rates use two points; tangent gradients use the derivative at one point." },
        { mistake: "Typing a long limit expression when a multiple-choice setup is enough.", fix: "For setup questions, choose the option matching $\\frac{f(x+h)-f(x)}{h}$." },
        { mistake: "Substituting into the original function when a derivative value is required.", fix: "Differentiate first, then substitute." },
        { mistake: "Using the tangent gradient for the normal.", fix: "For the normal, use the negative reciprocal of the tangent gradient." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-id-exam-m1", "Find the average rate of change over the interval.", "f(1)=4,\\quad f(5)=28", "6", ["m=6"]),
        formulaAnswer("y11adv-id-exam-m2", "Differentiate the polynomial function.", "y=4x^3-x+10", "12x^2-1", ["dy/dx=12x^2-1", "\\frac{dy}{dx}=12x^2-1"]),
        formulaAnswer("y11adv-id-exam-m3", "Find the normal gradient for the displayed tangent gradient.", "m_{\\text{tangent}}=-2", "1/2", ["0.5"]),
        practicalChoice("y11adv-id-exam-m4", "Choose the correct first-principles setup.", "D", ["$\\lim_{h\\to0}\\frac{(x+h)^2+x^2}{h}$", "$\\lim_{h\\to0}\\frac{x^2-(x+h)^2}{h}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{x}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}$"], "Use f(x+h) minus f(x), divided by h.", "f(x)=x^2"),
        formulaAnswer("y11adv-id-exam-m5", "Evaluate the derivative at the given x-value.", "f(x)=x^3-5x,\\quad x=2", "7", ["f'(2)=7"]),
        formulaAnswer("y11adv-id-exam-m6", "Find the tangent equation at the point on the curve. Give your answer in the form $y=mx+c$.", "y=x^2-1,\\quad x=2", "y=4x-5", ["y = 4x - 5"]),
        practicalChoice("y11adv-id-exam-m7", "Which option identifies the differentiation error?", "B", ["The constant should stay as 3", "The derivative of x squared should be 2x", "The function should be integrated", "The x-value should be negative"], "The derivative of x^2 is 2x, not x.", "\\frac{d}{dx}(x^2+3)=x+3"),
        practicalChoice("y11adv-id-exam-m8", "Which statement correctly distinguishes the two rates?", "A", ["Average rate uses a secant; instantaneous rate uses a tangent", "Average rate uses a tangent; instantaneous rate uses a secant", "Both always use two far apart points", "Neither uses gradients"], "Average rate is a secant gradient; instantaneous rate is a tangent gradient.", "\\text{Rates of change}"),
        formulaAnswer("y11adv-id-exam-m9", "Find the normal equation at the point on the curve. Give your answer in the form $y=mx+c$.", "y=x^2,\\quad x=2", "y=-1/4x+9/2", ["y = -1/4x + 9/2"]),
        formulaAnswer("y11adv-id-exam-m10", "Use the table to find the average velocity over the time interval.", "\\begin{array}{c|cc}t\\text{ s}&2&8\\\\ s\\text{ m}&5&41\\end{array}", "6", ["6 m/s"]),
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
        "Identify the inner and outer function in a composite expression such as (ax + b)^n.",
        "Apply dy/dx = (dy/du)(du/dx) to differentiate (ax + b)^n.",
        "Differentiate (ax² + bx + c)^n using the chain rule.",
        "Evaluate a chain-rule derivative at a given x-value to find the gradient.",
      ],
      teaching: {
        paragraphs: [
          "A composite function is a function inside another function. For example, y = (2x + 3)^4 has an outer function u^4 and an inner function u = 2x + 3.",
          "The chain rule says: to differentiate a composite, multiply the outer derivative by the inner derivative. In symbols, dy/dx = (dy/du)(du/dx).",
          "For (ax + b)^n, the outer derivative is n(ax + b)^(n−1) and the inner derivative is a. The result is na(ax + b)^(n−1).",
          "For (ax² + bx + c)^n, the inner derivative is more complex: it is the derivative of the expression inside. Differentiate the bracket first, then multiply.",
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
        practicalChoice("y11adv-chain-g1", "For y = (5x+2)^3, identify the inner function u.", "A", ["$u=5x+2$", "$u=x^3$", "$u=5x$", "$u=3x$"], "The inner function is the expression inside the bracket.", "y=(5x+2)^3"),
        formulaAnswer("y11adv-chain-g2", "Differentiate using the chain rule.", "(4x-1)^3", "12(4x-1)^2", ["12(4x-1)^2"]),
        formulaAnswer("y11adv-chain-g3", "Differentiate using the chain rule.", "(x^2+2)^2", "4x(x^2+2)", ["4x(x^2+2)", "4x(x^2 + 2)"]),
        practicalChoice("y11adv-chain-g4", "Which is the correct derivative of y = (3x+1)^4?", "B", ["$4(3x+1)^3$", "$12(3x+1)^3$", "$3(3x+1)^3$", "$4(3x+1)^4$"], "The inner derivative is 3; multiply by the outer derivative 4(3x+1)^3 to get 12(3x+1)^3.", "y=(3x+1)^4"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-chain-i1", "Differentiate using the chain rule.", "(2x+5)^4", "8(2x+5)^3", ["8(2x+5)^3"]),
        formulaAnswer("y11adv-chain-i2", "Differentiate using the chain rule.", "(x^2-3)^3", "6x(x^2-3)^2", ["6x(x^2-3)^2", "6x(x^2 - 3)^2"]),
        formulaAnswer("y11adv-chain-i3", "Find the gradient at the given x-value using the chain rule.", "y=(x+2)^3,\\quad x=-1", "3", ["gradient = 3", "m=3"]),
        practicalChoice("y11adv-chain-i4", "A student writes the derivative of y = (5x-2)^3 as 3(5x-2)^2. What is missing?", "A", ["The inner derivative (factor of 5) was not multiplied in", "The power should be 2, not 3", "The sign should be negative", "The coefficient 3 is wrong"], "The chain rule requires multiplying by the inner derivative, which is 5 here.", "y=(5x-2)^3"),
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
        practicalChoice("y11adv-chain-m4", "Which is the correct derivative of y = (5x-3)^4?", "C", ["$4(5x-3)^3$", "$5(5x-3)^3$", "$20(5x-3)^3$", "$20(5x-3)^4$"], "Inner derivative is 5; outer derivative is 4(5x-3)^3; product is 20(5x-3)^3.", "y=(5x-3)^4"),
        formulaAnswer("y11adv-chain-m5", "Differentiate using the chain rule.", "(2x+7)^3", "6(2x+7)^2", ["6(2x+7)^2"]),
        formulaAnswer("y11adv-chain-m6", "Differentiate using the chain rule.", "(x^2-1)^3", "6x(x^2-1)^2", ["6x(x^2-1)^2", "6x(x^2 - 1)^2"]),
        practicalChoice("y11adv-chain-m7", "A student writes the derivative of y = (2x+1)^3 as 3(2x+1)^2. Which step is incomplete?", "B", ["The exponent should remain as 3", "The inner derivative (factor of 2) was not multiplied in", "The coefficient 3 is incorrect", "The base should be squared"], "Chain rule requires multiplying by the inner derivative, which is 2 for u = 2x+1.", "y=(2x+1)^3"),
        formulaAnswer("y11adv-chain-m8", "Find the gradient at the given x-value using the chain rule.", "y=(x^2+4)^2,\\quad x=1", "20", ["gradient=20", "m=20"]),
        formulaAnswer("y11adv-chain-m9", "Differentiate using the chain rule.", "(2x^2+3)^3", "12x(2x^2+3)^2", ["12x(2x^2+3)^2", "12x(2x^2 + 3)^2"]),
        practicalChoice("y11adv-chain-m10", "For y = (3x-1)^4, dy/dx = 0 at x = 1/3. What does this mean about the tangent there?", "C", ["The tangent is vertical", "The function is undefined at x = 1/3", "The tangent is horizontal", "The function is constant everywhere"], "A zero derivative means the tangent is horizontal at that point.", "y=(3x-1)^4"),
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
    };
  }

  return null;
}
