import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer } from "../questionHelpers";
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
          "A rate of change compares how much one quantity changes compared with another. In functions, this usually means change in output divided by change in input.",
          "The average rate of change over an interval is the gradient of the secant joining the two points on the graph.",
          "The instantaneous rate of change at one point is the gradient of the tangent at that point. In this introductory unit, think of it as what the secant gradient approaches as the two points get closer together.",
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
          "First principles builds differentiation from gradients. It starts with the average gradient between two nearby points on a function.",
          "The difference quotient compares the function value at $x+h$ with the function value at $x$, then divides by the horizontal change $h$.",
          "Taking the limit as $h$ approaches zero turns the secant gradient into the tangent gradient.",
          "For simple functions, algebraic simplification lets the $h$ in the denominator cancel before the limit is used.",
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
          "Once first principles has built the idea of a derivative, rules make differentiation faster.",
          "The power rule differentiates powers of x by multiplying by the power, then reducing the power by one.",
          "A constant differentiates to zero because it does not change as x changes.",
          "Polynomial functions are differentiated term-by-term. Keep signs attached to their terms.",
          "After finding the derivative function, substitute an x-value to find the gradient at a point.",
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
          "A tangent touches a curve at a point and has the same gradient as the curve at that point.",
          "The derivative gives the tangent gradient. If the point is not already given, substitute the x-value into the original function to find it.",
          "A normal is perpendicular to the tangent. Its gradient is the negative reciprocal of the tangent gradient, provided the tangent gradient is not zero.",
          "Use point-gradient form to build the tangent or normal equation from a gradient and point.",
          "In applications, a tangent line can approximate the curve near the point of contact.",
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
          "Mixed differentiation questions usually test whether you can identify the role of the derivative: gradient, rate of change, tangent, or normal.",
          "Average rate of change uses two points or two values. A derivative value gives instantaneous gradient at one point.",
          "First-principles questions often focus on the correct setup or simplification rather than long typed limit notation.",
          "For tangent and normal questions, find the derivative, find the point, then use point-gradient form.",
          "Check whether the question asks for a gradient, an equation, a coordinate, or an interpretation before answering.",
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

  return null;
}

