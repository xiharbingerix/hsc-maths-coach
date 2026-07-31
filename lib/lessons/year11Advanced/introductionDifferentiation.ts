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
        practicalChoice("y11adv-id-roc-i3", "A graph is flat at a point. Which gradient is most appropriate at that point?", "A", ["0", "positive", "negative", "undefined"], "A flat point has a horizontal tangent, so its vertical change is zero for a small horizontal change and the local gradient is 0.", "\\text{Horizontal tangent}"),
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
        qualityAnswer({
          id: "y11adv-id-roc-qm1",
          prompt:
            "Find the average rate of change of f over the stated interval.",
          latex: "f(x)=x^2+2x,\\qquad 1\\le x\\le4",
          answer: "7",
          acceptedAnswers: ["7.0", "7 units per x", "m=7"],
          hint:
            "Calculate f(4) and f(1), then divide their difference by 4-1.",
          explanation:
            "The endpoint values are f(4)=16+8=24 and f(1)=1+2=3. Average rate of change is [f(4)-f(1)]/(4-1)=(24-3)/3=21/3=7. This is the gradient of the secant joining the two endpoint values.",
          difficulty: 3,
          diagnosticIntent:
            "Checks direct computation of an average rate from a function, including endpoint evaluation and denominator order.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-id-roc-qm2",
          prompt:
            "A student calculates the reciprocal rate shown. Which correction is mathematically valid?",
          latex:
            "\\text{distance: }30\\text{ km to }150\\text{ km};\\quad \\text{time: }1\\text{ h to }4\\text{ h};\\quad \\frac{4-1}{150-30}",
          answer: "B",
          choices: [
            "Keep the fraction because average speed is change in time divided by change in distance.",
            "Reverse the fraction: average speed is (150-30)/(4-1)=40 km/h.",
            "Add both distances and divide by the sum of the times.",
            "Use only the final distance, so the speed is 150/4 km/h.",
          ],
          hint:
            "The requested units are kilometres per hour, so distance change must be divided by time change.",
          explanation:
            "Average speed has units kilometres per hour, which requires change in distance divided by change in time. The distance change is 120 km and the time change is 3 h, so the average speed is 120/3=40 km/h. Option B corrects both the ratio and its units.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses inversion of input and output changes by using dimensional units as an independent check.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Defines the reciprocal quantity hours per kilometre instead of speed.",
            C: "Uses sums of readings rather than changes between endpoint readings.",
            D: "Treats cumulative position and clock time as though both began at zero.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-roc-qm3",
          prompt:
            "A liquid cools between the two recorded times. Find and interpret its average temperature rate.",
          latex: "T(2)=84^\\circ\\mathrm{C},\\qquad T(8)=48^\\circ\\mathrm{C}",
          answer: "-6 °C/min",
          acceptedAnswers: [
            "-6",
            "-6 degrees Celsius per minute",
            "decreases by 6 °C/min",
          ],
          hint:
            "Use final temperature minus initial temperature over final time minus initial time, retaining the sign.",
          explanation:
            "The temperature change is 48-84=-36 degrees Celsius over 8-2=6 minutes. Therefore the average rate is -36/6=-6 °C/min. The negative sign means the liquid's temperature decreases by 6 °C per minute on average.",
          difficulty: 3,
          diagnosticIntent:
            "Checks signed contextual rate calculation and interpretation with correct output-per-input units.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-id-roc-qm4",
          prompt:
            "A secant calculation gives the average rate below. Which conclusion is justified?",
          latex: "\\frac{f(5)-f(2)}{5-2}=4",
          answer: "D",
          choices: [
            "The instantaneous rate at x=3 must equal 4.",
            "The function must be linear for every real x.",
            "Every tangent between x=2 and x=5 has gradient 4.",
            "The output increases by 12 overall, with average rate 4 on this interval.",
          ],
          hint:
            "Separate what an endpoint secant guarantees from what would require local derivative information.",
          explanation:
            "The equation states that [f(5)-f(2)]/3=4, so f(5)-f(2)=12 and the secant's average gradient is 4. It does not determine any particular tangent gradient or prove the function is linear. Therefore only option D is guaranteed.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses confusion between an interval's secant gradient and instantaneous tangent gradients inside the interval.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assigns the average rate to an arbitrary interior point without derivative evidence.",
            B: "Infers a global linear function from one secant calculation.",
            C: "Assumes every local rate equals the interval average.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-roc-qm5",
          prompt:
            "The average rate of change over the interval is 12. Determine the parameter a.",
          latex: "f(x)=ax^2+1,\\qquad 1\\le x\\le3",
          answer: "a=3",
          acceptedAnswers: ["3", "a = 3", "3.0"],
          hint:
            "Evaluate f(3)-f(1), divide by 2, and solve the resulting equation.",
          explanation:
            "The endpoint change is (9a+1)-(a+1)=8a. Dividing by the interval width 3-1=2 gives average rate 4a. Since this equals 12, 4a=12 and a=3. Substitution confirms the endpoint outputs differ by 24 across two units.",
          difficulty: 4,
          diagnosticIntent:
            "Assesses reverse inference of a function parameter from a prescribed secant gradient.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-id-roc-qm6",
          prompt:
            "For every positive a, the average rate over the symmetric interval is 5. Determine k.",
          latex: "f(x)=x^2+kx,\\qquad -a\\le x\\le a,\\qquad a>0",
          answer: "k=5",
          acceptedAnswers: ["5", "k = 5", "5.0"],
          hint:
            "Calculate f(a)-f(-a); the even squared terms cancel across the symmetric endpoints.",
          explanation:
            "We have f(a)=a^2+ka and f(-a)=a^2-ka. Their difference is 2ka, while the interval width is 2a. The average rate is therefore (2ka)/(2a)=k for every a>0. Since the measured rate is 5, k=5.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates how symmetry cancels an even component and isolates the linear coefficient in an average rate.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-id-roc-qm7",
          prompt:
            "For s(t)=t cubed, compare the average velocities on [0,2] and [2,4]. Find the ratio later rate to earlier rate.",
          latex: "s(t)=t^3",
          answer: "7",
          acceptedAnswers: ["7.0", "7:1", "28/4=7"],
          hint:
            "Calculate each endpoint difference over its two-unit time interval before forming the ratio.",
          explanation:
            "On [0,2], the average velocity is (8-0)/2=4. On [2,4], it is (64-8)/2=56/2=28. The requested ratio is 28/4=7. Equal interval widths do not produce equal rates because the cubic steepens rapidly.",
          difficulty: 4,
          diagnosticIntent:
            "Probes comparison of average rates on equal-width intervals for a nonlinear position function.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-id-roc-qm8",
          prompt:
            "A student averages two neighbouring secant gradients and claims this must be f'(3). Which evaluation is correct?",
          latex: "f(1)=2,\\qquad f(3)=10,\\qquad f(5)=6",
          answer: "C",
          choices: [
            "The claim is correct: f'(3) is always the mean of the two secant gradients.",
            "The derivative must be 1 because the left and right secant gradients are 4 and -2.",
            "The three values do not determine f'(3); many smooth functions can pass through them with different tangent gradients.",
            "The derivative must be zero because f(3) is larger than the two recorded endpoint values.",
          ],
          hint:
            "Finite secants constrain endpoint changes but do not uniquely determine the local tangent between them.",
          explanation:
            "The left secant gradient is 4 and the right secant gradient is -2, but their average is not a derivative rule. Infinitely many smooth functions can pass through the three points while having different tangent gradients at x=3. Thus the local rate cannot be determined from these values alone.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses unjustified estimation of an instantaneous rate from sparse finite secants without a limiting process.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats averaging adjacent secants as an exact derivative theorem.",
            B: "Computes the proposed average but assumes it is uniquely determined local information.",
            D: "Infers a horizontal tangent from sampled values without knowing behaviour between them.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-roc-qm9",
          prompt:
            "Find the later time k when the average velocity from t=1 to t=k is zero.",
          latex: "s(t)=t^2-6t,\\qquad k>1",
          answer: "k=5",
          acceptedAnswers: ["5", "k = 5", "5 seconds"],
          hint:
            "Zero average velocity means s(k)=s(1); solve that equation and reject the endpoint root.",
          explanation:
            "Average velocity is [s(k)-s(1)]/(k-1). For it to be zero with k>1, the numerator must be zero. Since s(1)=1-6=-5, solve k^2-6k=-5, giving (k-1)(k-5)=0. The later time is k=5.",
          difficulty: 5,
          diagnosticIntent:
            "Combines a zero-rate condition, position equality, quadratic solving, and rejection of the repeated starting time.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-id-roc-qm10",
          prompt:
            "Two interval-average measurements determine the quadratic model. Find a+b.",
          latex:
            "V(t)=at^2+bt+100,\\quad \\mathrm{AROC}_{[0,2]}=10,\\quad \\mathrm{AROC}_{[2,4]}=18",
          answer: "8",
          acceptedAnswers: ["8.0", "a+b=8", "a=2,b=6"],
          hint:
            "Translate each average rate into an equation: 2a+b=10 and 6a+b=18.",
          explanation:
            "From [0,2], [V(2)-V(0)]/2=(4a+2b)/2=2a+b=10. From [2,4], [V(4)-V(2)]/2=(12a+2b)/2=6a+b=18. Subtracting gives 4a=8, so a=2 and then b=6. Hence a+b=8.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises two secant-rate conditions into a simultaneous system for a contextual quadratic model.",
          taskType: "synthesis",
        }),
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
        practicalChoice("y11adv-id-fp-i1", "Which first-principles setup matches the displayed function?", "D", ["$\\lim_{h\\to0}\\frac{(x+h)^2+x^2}{h}$", "$\\lim_{h\\to0}\\frac{x^2-(x+h)^2}{h}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{x}$", "$\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}$"], "First principles compares the new output f(x+h) with f(x), then divides that change by h before taking the limit.", "f(x)=x^2"),
        formulaAnswer("y11adv-id-fp-i2", "Simplify the difference quotient before taking the limit.", "\\frac{(x+h)^2-x^2}{h}", "2x+h", ["h+2x"]),
        formulaAnswer("y11adv-id-fp-i3", "Find the derivative from first principles after simplification.", "\\lim_{h\\to0}(2x+h)", "2x", ["f'(x)=2x"]),
        formulaAnswer("y11adv-id-fp-i4", "Use first principles to find the derivative of the linear function.", "g(x)=-4x+7", "-4", ["g'(x)=-4"]),
        practicalChoice("y11adv-id-fp-i5", "A student substitutes zero for h before simplifying. Which option identifies the problem?", "A", ["It creates division by zero in the difference quotient", "It changes the function into a reciprocal", "It finds the y-intercept", "It reflects the graph"], "Substituting h=0 immediately makes the denominator zero; simplify and cancel the common factor of h before evaluating the limit.", "\\frac{f(x+h)-f(x)}{h}"),
      ],
      commonMistakes: [
        { mistake: "Putting $f(x)-f(x+h)$ in the numerator.", fix: "Use new output minus original output: $f(x+h)-f(x)$." },
        { mistake: "Substituting $h=0$ too early.", fix: "Simplify and cancel the factor of $h$ before taking the limit." },
        { mistake: "Expanding $(x+h)^2$ as $x^2+h^2$.", fix: "Use $(x+h)^2=x^2+2xh+h^2$." },
        { mistake: "Thinking first principles is a separate kind of derivative.", fix: "First principles explains the same derivative used later by rules." },
      ],
      masteryQuiz: [
        qualityAnswer({
          id: "y11adv-id-fp-qm1",
          prompt:
            "Use the first-principles definition to find the derivative of the linear function.",
          latex: "f(x)=3x+2",
          answer: "f'(x)=3",
          acceptedAnswers: ["3", "f'(x) = 3", "dy/dx=3"],
          hint:
            "Substitute x+h into the whole function, subtract f(x), divide by h, and simplify before taking the limit.",
          explanation:
            "First principles gives [f(x+h)-f(x)]/h=[3(x+h)+2-(3x+2)]/h=3h/h=3 for h not equal to zero. Taking the limit as h approaches zero leaves f'(x)=3, the constant gradient of the linear function.",
          difficulty: 3,
          diagnosticIntent:
            "Checks execution of the complete first-principles process for a linear function rather than rule recall alone.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-id-fp-qm2",
          prompt:
            "Which expression correctly represents the secant-to-tangent limit for f'(x)?",
          latex: "f'(x)=\\lim_{h\\to0}\\;?",
          answer: "B",
          choices: [
            "[f(x)-f(x+h)]/h",
            "[f(x+h)-f(x)]/h",
            "[f(x+h)+f(x)]/h",
            "[f(h)-f(x)]/x",
          ],
          hint:
            "Use new output minus original output over the horizontal change h, preserving the order.",
          explanation:
            "The nearby point has coordinates (x+h,f(x+h)), so its vertical change from (x,f(x)) is f(x+h)-f(x) and its horizontal change is h. Therefore the secant gradient is [f(x+h)-f(x)]/h, and its limit is option B.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses reversed output subtraction, addition of outputs, and confusion between the increment h and the input x.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Reverses the vertical change while keeping a positive horizontal change.",
            C: "Adds endpoint outputs instead of calculating their change.",
            D: "Substitutes h as an independent input and divides by x rather than the increment.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-fp-qm3",
          prompt:
            "Use first principles to determine the derivative value at x=2.",
          latex: "f(x)=x^2",
          answer: "f'(2)=4",
          acceptedAnswers: ["4", "4.0", "gradient=4"],
          hint:
            "At x=2, simplify [(2+h)^2-4]/h before letting h approach zero.",
          explanation:
            "The difference quotient at x=2 is [(2+h)^2-2^2]/h=(4+4h+h^2-4)/h=(4h+h^2)/h=4+h. Taking h toward zero gives f'(2)=4. The cancellation must occur before the limit is evaluated.",
          difficulty: 3,
          diagnosticIntent:
            "Checks local first-principles calculation at a specified input, including expansion, cancellation, and limiting.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-id-fp-qm4",
          prompt:
            "A student substitutes h=0 into the unsimplified quotient and obtains 0/0. Which correction is valid?",
          latex:
            "f(x)=x^2,\\qquad \\frac{(x+h)^2-x^2}{h}",
          answer: "D",
          choices: [
            "Conclude that x squared has no derivative.",
            "Replace the denominator h by x.",
            "Cancel h directly from (x+h)^2 before expanding.",
            "Expand and factor the numerator, cancel h for h≠0, then take the limit.",
          ],
          hint:
            "A limit examines nearby non-zero h-values; simplify their common factor before h approaches zero.",
          explanation:
            "The form 0/0 signals that direct substitution is premature, not that the derivative fails. Expanding gives 2xh+h^2=h(2x+h). For nearby h not equal to zero, the quotient becomes 2x+h, whose limit is 2x. Thus option D gives the valid order.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses direct substitution into an indeterminate difference quotient before algebraic cancellation.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats an indeterminate form as proof that the derivative does not exist.",
            B: "Changes the definition's horizontal increment to avoid division by zero.",
            C: "Attempts cancellation across an unexpanded sum where h is not a factor of every term.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-fp-qm5",
          prompt:
            "The derivative at x=1 is 7. Use the first-principles structure to determine a.",
          latex: "f(x)=ax^2+3x",
          answer: "a=2",
          acceptedAnswers: ["2", "a = 2", "2.0"],
          hint:
            "The difference quotient simplifies to 2ax+ah+3; take the limit and then substitute x=1.",
          explanation:
            "Expanding f(x+h)-f(x) gives a(2xh+h^2)+3h. After dividing by h, the quotient is 2ax+ah+3, so f'(x)=2ax+3. At x=1, 2a+3=7, giving 2a=4 and therefore a=2.",
          difficulty: 4,
          diagnosticIntent:
            "Assesses parameter recovery by deriving and applying a first-principles gradient rather than quoting a rule.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-id-fp-qm6",
          prompt:
            "For f(x)=x² at x=3, calculate the secant-gradient expression and state the value it approaches as h tends to zero.",
          latex: "h\\in\\{1,0.1,0.01\\}",
          answer: "7, 6.1, 6.01; approaches 6",
          acceptedAnswers: [
            "approaches 6",
            "6",
            "the secant gradients 7, 6.1 and 6.01 tend to 6",
          ],
          hint:
            "At x=3 the difference quotient simplifies to 6+h; substitute the three positive h-values.",
          explanation:
            "For x=3, [(3+h)^2-9]/h=(6h+h^2)/h=6+h. The listed h-values give gradients 7, 6.1 and 6.01. As h becomes closer to zero, these secant gradients approach 6, the tangent gradient f'(3).",
          difficulty: 4,
          diagnosticIntent:
            "Investigates numerically how a sequence of secant gradients converges to an instantaneous gradient.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-id-fp-qm7",
          prompt:
            "Use first-principles symmetry to determine f'(a)+f'(-a) for every real a.",
          latex: "f(x)=x^2",
          answer: "0",
          acceptedAnswers: ["0.0", "f'(a)+f'(-a)=0", "the sum is zero"],
          hint:
            "First principles gives f'(x)=2x; evaluate this at the two symmetric inputs.",
          explanation:
            "The first-principles quotient for x^2 simplifies to 2x+h, so f'(x)=2x. Hence f'(a)=2a and f'(-a)=-2a. Adding the gradients at symmetric inputs gives 2a-2a=0 for every real a.",
          difficulty: 4,
          diagnosticIntent:
            "Probes the odd symmetry of the derivative that emerges from an even quadratic through first principles.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-id-fp-qm8",
          prompt:
            "A student reaches the correct final derivative using an invalid cancellation. Which critique identifies the flaw?",
          latex:
            "\\frac{h(2x+h)}{h}\\overset{?}{=}2x\\quad\\Rightarrow\\quad f'(x)=2x",
          answer: "A",
          choices: [
            "After cancelling h, the quotient is 2x+h; only the limit then removes the remaining h.",
            "The h factors cannot be cancelled for any non-zero h.",
            "The final derivative should be x because the original power is two.",
            "The limit should be taken as x approaches zero rather than h.",
          ],
          hint:
            "Cancellation removes the common factor outside the bracket, not the h term added inside the bracket.",
          explanation:
            "For h not equal to zero, h(2x+h)/h simplifies to the entire bracket 2x+h, not just 2x. The term h disappears only when the limit h→0 is taken. The student's final answer happens to be right, but option A identifies the invalid intermediate step.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses a lucky correct answer produced by dropping an additive term during factor cancellation.",
          taskType: "analytical",
          distractorMisconceptions: {
            B: "Forgets that limits use nearby non-zero h-values where cancellation is valid.",
            C: "Misstates the power rule and ignores the first-principles derivation.",
            D: "Confuses the increment tending to zero with the independent variable.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-fp-qm9",
          prompt:
            "Use first principles and the stated gradient to determine c.",
          latex: "f(x)=x^2+cx,\\qquad f'(2)=9",
          answer: "c=5",
          acceptedAnswers: ["5", "c = 5", "5.0"],
          hint:
            "The difference quotient simplifies to 2x+h+c; take its limit and evaluate at x=2.",
          explanation:
            "Expanding f(x+h)-f(x) gives 2xh+h^2+ch. Dividing by h yields 2x+h+c, whose limit is f'(x)=2x+c. The condition f'(2)=9 gives 4+c=9, so c=5.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises first-principles algebra with reverse parameter inference from a local gradient condition.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-id-fp-qm10",
          prompt:
            "A quadratic has the displayed first-principles numerator and value at zero. Reconstruct f(x).",
          latex:
            "f(x+h)-f(x)=h(6x+3h-4),\\qquad f(0)=5",
          answer: "f(x)=3x^2-4x+5",
          acceptedAnswers: [
            "3x^2-4x+5",
            "f(x) = 3x^2 - 4x + 5",
            "y=3x^2-4x+5",
          ],
          hint:
            "For Ax²+Bx+C the numerator is h(2Ax+Ah+B); match coefficients and use f(0).",
          explanation:
            "A quadratic Ax^2+Bx+C produces f(x+h)-f(x)=h(2Ax+Ah+B). Matching h(6x+3h-4) gives 2A=6 and A=3, consistently, with B=-4. Finally f(0)=C=5, so f(x)=3x^2-4x+5.",
          difficulty: 5,
          diagnosticIntent:
            "Reverses the entire first-principles numerator to reconstruct a quadratic's coefficients and constant.",
          taskType: "synthesis",
        }),
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
        practicalChoice("y11adv-id-poly-g3", "Which derivative correctly handles the constant term?", "A", ["$6x$", "$6x+5$", "$3x^2+5$", "$3x$"], "The power rule gives 6x from 3x squared, while the constant 5 differentiates to zero because it does not change.", "f(x)=3x^2+5"),
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
        qualityAnswer({
          id: "y11adv-id-poly-qm1",
          prompt: "Differentiate the polynomial term by term.",
          latex: "f(x)=4x^5-3x^2+7",
          answer: "20x^4-6x",
          acceptedAnswers: ["f'(x)=20x^4-6x", "20x^4 - 6x"],
          hint:
            "Multiply each non-constant coefficient by its exponent, then reduce that exponent by one.",
          explanation:
            "Apply the power rule separately to each term. The derivative of 4x^5 is 20x^4, the derivative of -3x^2 is -6x, and the constant 7 differentiates to zero. Therefore f'(x)=20x^4-6x.",
          difficulty: 3,
          diagnosticIntent:
            "Checks accurate term-by-term use of the power rule, including a negative coefficient and a constant term.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-id-poly-qm2",
          prompt:
            "Without expanding any additional expressions, which statement about the derivative must be true?",
          latex: "p(x)=-2x^4+5x^2-x+9",
          answer: "C",
          choices: [
            "The derivative has degree 4 and leading coefficient -2.",
            "The derivative has degree 3 and leading coefficient -2.",
            "The derivative has degree 3 and leading coefficient -8.",
            "The derivative has degree 5 and leading coefficient -8.",
          ],
          hint:
            "Track what the power rule does to the highest-degree term -2x^4.",
          explanation:
            "The highest-degree term controls the derivative's degree and leading coefficient. Differentiating -2x^4 gives -8x^3, so the derivative has degree 3 and leading coefficient -8. Lower-degree terms cannot change that leading term.",
          difficulty: 3,
          diagnosticIntent:
            "Tests structural understanding of how differentiation changes polynomial degree and the leading coefficient.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Leaves both the leading coefficient and exponent unchanged.",
            B: "Reduces the exponent but forgets to multiply by the original power.",
            D: "Increases the polynomial degree while multiplying the coefficient.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-poly-qm3",
          prompt: "Find the gradient of the curve at x=-1.",
          latex: "y=x^3-2x^2+4",
          answer: "7",
          acceptedAnswers: ["m=7", "y'(-1)=7", "7.0"],
          hint:
            "Differentiate first to obtain 3x^2-4x, then substitute x=-1 with its sign intact.",
          explanation:
            "The derivative is y'=3x^2-4x. At x=-1, the squared term contributes 3(-1)^2=3 and the linear term contributes -4(-1)=4. Hence the tangent gradient is 3+4=7.",
          difficulty: 3,
          diagnosticIntent:
            "Checks whether a student differentiates before substitution and handles a negative input correctly.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-id-poly-qm4",
          prompt:
            "A student writes the derivative shown. Which diagnosis identifies the error?",
          latex: "\\frac{d}{dx}(-3x^4+2x)=-12x^4+2",
          answer: "B",
          choices: [
            "The coefficient -3 should not have been multiplied by 4.",
            "The exponent on x should reduce from 4 to 3 after multiplying by 4.",
            "The derivative of 2x should be 2x rather than 2.",
            "Every term in a derivative must have a positive coefficient.",
          ],
          hint:
            "Compare the student's first term with the complete rule d(ax^n)/dx=anx^(n-1).",
          explanation:
            "The coefficient calculation -3 times 4=-12 is correct, but the power rule also reduces the exponent by one. Thus d(-3x^4)/dx=-12x^3, while d(2x)/dx=2. The correct derivative is -12x^3+2.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses partial power-rule use where the coefficient is updated but the exponent is not reduced.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Rejects the required multiplication by the original exponent.",
            C: "Treats a linear term as unchanged under differentiation.",
            D: "Assumes differentiation removes negative signs from coefficients.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-poly-qm5",
          prompt:
            "The curve has the stated tangent gradient at x=2. Determine a.",
          latex: "f(x)=ax^3-2x+5,\\qquad f'(2)=34",
          answer: "a=3",
          acceptedAnswers: ["3", "a = 3", "3.0"],
          hint:
            "Differentiate symbolically to get 3ax^2-2, then use the given derivative value.",
          explanation:
            "Differentiate to obtain f'(x)=3ax^2-2. At x=2 this becomes f'(2)=12a-2. The condition 12a-2=34 gives 12a=36, so a=3. Substitution confirms the gradient is 36-2=34.",
          difficulty: 4,
          diagnosticIntent:
            "Assesses reverse determination of a polynomial coefficient from a prescribed local gradient.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-id-poly-qm6",
          prompt:
            "Find the value of k for which the member of this family has a horizontal tangent at x=2.",
          latex: "f_k(x)=x^3-kx",
          answer: "k=12",
          acceptedAnswers: ["12", "k = 12", "12.0"],
          hint:
            "Differentiate the family and impose the horizontal-tangent condition f'_k(2)=0.",
          explanation:
            "Each member has derivative f'_k(x)=3x^2-k. A horizontal tangent at x=2 requires 3(2)^2-k=0, so 12-k=0 and k=12. Changing k shifts every derivative value by the same amount.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates how a parameter changes the derivative family and uses a geometric condition to select one member.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-id-poly-qm7",
          prompt:
            "The two polynomials have identical derivatives for every x. State the most specific relationship that must hold between f and g.",
          latex: "f'(x)=g'(x)\\quad\\text{for all real }x",
          answer: "They differ by a constant",
          acceptedAnswers: [
            "f(x)-g(x) is constant",
            "f=g+C",
            "f(x)=g(x)+C",
          ],
          hint:
            "Ask which kind of polynomial term disappears completely when differentiated.",
          explanation:
            "If f'(x)=g'(x), then the derivative of f(x)-g(x) is zero for every x. A polynomial with zero derivative everywhere is constant. Therefore f and g can have different vertical positions but must differ only by a constant.",
          difficulty: 4,
          diagnosticIntent:
            "Probes generalisation from examples to the invariant information lost when polynomials are differentiated.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-id-poly-qm8",
          prompt:
            "Which conclusion about the coefficients is forced by the derivative information?",
          latex: "f(x)=ax^4+bx^2+cx+d,\\qquad f'(x)=8x^3-6x+5",
          answer: "D",
          choices: [
            "a=8, b=-6, c=5 and d=0",
            "a=2, b=-6, c=5 and d=0",
            "a=2, b=-3, c=5 and d=5",
            "a=2, b=-3 and c=5, while d cannot be determined",
          ],
          hint:
            "Match 4a, 2b and c with the derivative coefficients, then consider what happens to d.",
          explanation:
            "Differentiating gives f'(x)=4ax^3+2bx+c. Matching coefficients yields 4a=8, 2b=-6 and c=5, so a=2, b=-3 and c=5. The constant d disappears under differentiation, so the derivative gives no information about it.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses whether students can reverse coefficient matching while recognising that differentiation loses the additive constant.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Copies derivative coefficients directly without reversing the power rule.",
            B: "Reverses the quartic coefficient but not the quadratic coefficient and invents d=0.",
            C: "Correctly reconstructs non-constant coefficients but treats the derivative's constant as d.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-poly-qm9",
          prompt:
            "Use the two gradient conditions to reconstruct the polynomial f.",
          latex:
            "f(x)=x^3+ax^2+bx+4,\\qquad f'(0)=1,\\qquad f'(1)=0",
          answer: "x^3-2x^2+x+4",
          acceptedAnswers: [
            "f(x)=x^3-2x^2+x+4",
            "x^3 - 2x^2 + x + 4",
            "a=-2,b=1",
          ],
          hint:
            "Differentiate first; f'(0) identifies b, and f'(1)=0 then determines a.",
          explanation:
            "Differentiation gives f'(x)=3x^2+2ax+b. The condition f'(0)=1 immediately gives b=1. Then f'(1)=0 gives 3+2a+1=0, so 2a=-4 and a=-2. Hence f(x)=x^3-2x^2+x+4.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises multiple derivative constraints to recover unknown coefficients in an original polynomial.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-id-poly-qm10",
          prompt:
            "A particle's position has the stated form. Use the three velocity measurements to determine s(t).",
          latex:
            "s(t)=at^3+bt^2+ct,\\qquad v(0)=3,\\quad v(1)=2,\\quad v(2)=7",
          answer: "t^3-2t^2+3t",
          acceptedAnswers: [
            "s(t)=t^3-2t^2+3t",
            "t^3 - 2t^2 + 3t",
            "a=1,b=-2,c=3",
          ],
          hint:
            "Differentiate to v(t)=3at^2+2bt+c; use v(0) first, then solve the remaining two equations.",
          explanation:
            "Velocity is v(t)=3at^2+2bt+c. From v(0)=3, c=3. The other conditions give 3a+2b=-1 and 12a+4b=4. Doubling the first and subtracting gives 6a=6, so a=1; then b=-2. Therefore s(t)=t^3-2t^2+3t.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises differentiation, contextual interpretation, and simultaneous equations to reconstruct a motion model.",
          taskType: "synthesis",
        }),
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
        qualityAnswer({
          id: "y11adv-id-tn-qm1",
          prompt: "Find the tangent gradient at x=1.",
          latex: "y=x^2+2x",
          answer: "4",
          acceptedAnswers: ["m=4", "y'(1)=4", "gradient 4"],
          hint: "Differentiate the curve first, then evaluate the derivative at x=1.",
          explanation: "The derivative is y'=2x+2, which gives the tangent gradient at any x-value. Substituting x=1 gives y'(1)=2(1)+2=4, so the tangent gradient is 4.",
          difficulty: 3,
          diagnosticIntent: "Checks the basic distinction between a curve equation and its local tangent gradient.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-id-tn-qm2",
          prompt: "Which equation is the tangent to the curve at the stated x-value?",
          latex: "y=x^2+1,\\qquad x=2",
          answer: "C",
          choices: ["y-2=5(x-1)", "y-5=-\\frac14(x-2)", "y-5=4(x-2)", "y=4x+5"],
          hint: "Use the original function for the point and the derivative for the gradient.",
          explanation: "At x=2 the point is (2,5), while y'=2x gives tangent gradient 4. Point-gradient form is therefore y-5=4(x-2), which is option C. The negative reciprocal belongs to the normal.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses confusion between point coordinates, tangent gradient, and normal gradient.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Swaps coordinate values and uses the wrong gradient.",
            B: "Uses the normal gradient instead of the tangent gradient.",
            D: "Uses the point's y-value as an intercept without point-gradient adjustment.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-tn-qm3",
          prompt: "Find the normal equation in point-gradient form.",
          latex: "y=x^2,\\qquad x=2",
          answer: "y-4=-(1/4)(x-2)",
          acceptedAnswers: ["y-4=-1/4(x-2)", "y=-x/4+9/2", "y = -0.25x + 4.5"],
          hint: "The point is (2,4); find tangent gradient 4, then take its negative reciprocal.",
          explanation: "The point on the curve is (2,4), and the tangent gradient is y'(2)=4. The perpendicular normal gradient is -1/4. Using point-gradient form gives y-4=-(1/4)(x-2).",
          difficulty: 3,
          diagnosticIntent: "Checks construction of a normal from a curve point and a negative-reciprocal gradient.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-id-tn-qm4",
          prompt: "A student says the tangent gradient is 9 because the point is (3,9). Which diagnosis is correct?",
          latex: "y=x^2,\\qquad (3,9)",
          answer: "B",
          choices: ["The x-coordinate 3 is always the gradient.", "The y-value locates the point; the derivative gives gradient 2(3)=6.", "The gradient is the negative reciprocal of 9.", "The gradient cannot be found from a formula."],
          hint: "Separate the role of f(3) from the role of f'(3).",
          explanation: "The original function gives f(3)=9, which is the point's height. Gradient comes from the derivative f'(x)=2x, so f'(3)=6. Option B correctly distinguishes function value from rate of change.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses use of a function value in place of its derivative value.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Substitutes the input directly as the gradient without differentiating.",
            C: "Applies the normal-gradient rule to the y-coordinate.",
            D: "Ignores the available differentiable function model.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-tn-qm5",
          prompt: "The tangent at x=1 is parallel to the line shown. Determine a.",
          latex: "f(x)=ax^2+1,\\qquad y=6x-4",
          answer: "a=3",
          acceptedAnswers: ["3", "a = 3", "3.0"],
          hint: "Parallel lines share gradient, so impose f'(1)=6.",
          explanation: "The comparison line has gradient 6. Since f'(x)=2ax, the curve's tangent gradient at x=1 is 2a. Parallelism requires 2a=6, hence a=3.",
          difficulty: 4,
          diagnosticIntent: "Assesses reverse parameter inference from a parallel-tangent condition.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-id-tn-qm6",
          prompt: "For the family of tangents at x=a, find the y-intercept in terms of a.",
          latex: "y=x^2",
          answer: "-a^2",
          acceptedAnswers: ["c=-a^2", "y-intercept=-a^2", "(0,-a^2)"],
          hint: "Build the tangent through (a,a squared) with gradient 2a, then set x=0.",
          explanation: "At x=a the point is (a,a^2) and the gradient is 2a. Thus y-a^2=2a(x-a), or y=2ax-a^2. Setting x=0 shows that every such tangent has y-intercept -a^2.",
          difficulty: 4,
          diagnosticIntent: "Investigates a parameterised family of tangent lines rather than one numerical case.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-id-tn-qm7",
          prompt: "Find the x-intercept of the normal at x=1.",
          latex: "y=x^2",
          answer: "3",
          acceptedAnswers: ["x=3", "(3,0)", "x-intercept 3"],
          hint: "Use point (1,1) and normal gradient -1/2, then set y=0.",
          explanation: "At x=1, the tangent gradient is 2 and the normal gradient is -1/2. The normal is y-1=-(1/2)(x-1). Setting y=0 gives -1=-(1/2)(x-1), so x-1=2 and x=3.",
          difficulty: 4,
          diagnosticIntent: "Combines derivative, perpendicular gradient, line equation, and intercept reasoning.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-id-tn-qm8",
          prompt: "Which statement correctly handles a horizontal tangent at x=a?",
          latex: "f'(a)=0",
          answer: "D",
          choices: ["The normal also has gradient 0.", "The normal has gradient -1/0, treated as zero.", "No normal exists.", "The tangent is horizontal and the normal is the vertical line x=a."],
          hint: "A line perpendicular to a horizontal line is vertical, so it has no finite gradient.",
          explanation: "A zero derivative makes the tangent horizontal. Its perpendicular normal is vertical through the same point, so its equation is x=a. The negative-reciprocal formula signals an undefined finite gradient rather than zero.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses misuse of the negative reciprocal when the tangent gradient is zero.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes perpendicular lines can share zero gradient.",
            B: "Treats division by zero as a numerical zero.",
            C: "Confuses absence of finite gradient with absence of a vertical line.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-tn-qm9",
          prompt: "Reconstruct the quadratic from its tangent and intercept information.",
          latex: "f(x)=ax^2+bx+c,\\quad f(0)=2,\\quad\\text{tangent at }x=1:\\ y=4x-1",
          answer: "3x^2-2x+2",
          acceptedAnswers: ["f(x)=3x^2-2x+2", "3x^2 - 2x + 2", "a=3,b=-2,c=2"],
          hint: "The tangent supplies both f(1)=3 and f'(1)=4; combine these with c=2.",
          explanation: "From f(0)=2, c=2. The tangent point at x=1 has y=3, so a+b+2=3 and a+b=1. Its gradient is 4, so 2a+b=4. Subtracting gives a=3 and then b=-2.",
          difficulty: 5,
          diagnosticIntent: "Synthesises point, gradient, and intercept conditions to reconstruct a curve.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-id-tn-qm10",
          prompt: "Find the x-coordinates of both points where tangents to the parabola pass through P.",
          latex: "y=x^2,\\qquad P=(0,-1)",
          answer: "-1, 1",
          acceptedAnswers: ["x=-1 and x=1", "{-1,1}", "±1"],
          hint: "The tangent at x=a is y=2ax-a squared; require it to pass through P.",
          explanation: "The tangent to y=x^2 at x=a is y=2ax-a^2. Passing through (0,-1) requires -1=-a^2, so a^2=1 and a=±1. Hence the two contact x-coordinates are -1 and 1.",
          difficulty: 5,
          diagnosticIntent: "Synthesises a tangent family with an external-point incidence condition.",
          taskType: "synthesis",
        }),
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
        formulaAnswer("y11adv-curve-g1", "For f(x)=x^3-3x, find the local maximum coordinate.", "", "(-1,2)", ["(-1, 2)"]),
        formulaAnswer("y11adv-curve-g2", "For f(x)=x^3-3x, state the interval where the function is decreasing.", "", "-1 < x < 1", ["(-1, 1)"]),
        practicalChoice("y11adv-curve-g3", "Which feature is confirmed when f''(x) changes sign at x=0?", "C", ["Local maximum", "Local minimum", "Point of inflection", "Vertical tangent"], "A sign change in f'' confirms a point of inflection.", "f''(x)=6x"),
        formulaAnswer("y11adv-curve-g4", "For $y=(x-2)^2-1$, give the local minimum coordinate.", "y=(x-2)^2-1", "(2,-1)", ["(2, -1)"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-curve-i1", "For f(x)=x^3-3x, state one interval where the function is increasing for x>0.", "", "x > 1", ["x>1", "(1, infinity)", "(1, \\infty)"]),
        formulaAnswer("y11adv-curve-i2", "For f(x)=x^3-3x, state the concavity for x<0.", "", "concave down", ["downward concavity"]),
        practicalChoice("y11adv-curve-i3", "A cubic has a local maximum at (-1,2), a local minimum at (1,-2), and f'' changes sign at x=0. Which feature belongs at x=0?", "B", ["Another local maximum", "A point of inflection", "An x-intercept only", "A vertical asymptote"], "The sign change in f'' gives an inflection point.", "\\text{Feature summary}"),
        formulaAnswer("y11adv-curve-i4", "For $y=(x-2)^2-1$, find the x-values of the intercepts. Give answers in ascending order, separated by a comma.", "", "1, 3", ["x=1,3", "1 and 3", "x=1 and x=3"]),
        practicalChoice("y11adv-curve-i5", "Which sequence is a sensible curve-sketching workflow?", "A", ["Intercepts, stationary points, derivative intervals, concavity", "Normal equation, area, volume, probability", "Only substitute x=0", "Only draw a shape from memory"], "A calculus sketch is built from exact features and interval information.", "\\text{Curve sketching workflow}"),
      ],
      commonMistakes: [
        { mistake: "Starting with a sketch before finding features.", fix: "Find intercepts, stationary points, intervals, and concavity first; the graph follows those features." },
        { mistake: "Calling f''(x)=0 an inflection point without checking signs.", fix: "Confirm that f'' changes sign across the candidate x-value." },
        { mistake: "Mixing up increasing intervals with concavity intervals.", fix: "Increasing/decreasing uses f'(x); concavity uses f''(x)." },
        { mistake: "Asking the typed answer to be a sketch.", fix: "Use exact features such as coordinates, intervals, and classifications for graded answers." },
      ],
      masteryQuiz: [
        qualityAnswer({
          id: "y11adv-curve-qm1",
          prompt: "Find and classify both stationary points.",
          latex: "f(x)=x^3-3x",
          answer: "local maximum (-1,2); local minimum (1,-2)",
          acceptedAnswers: ["max (-1,2), min (1,-2)", "(-1,2) maximum and (1,-2) minimum", "local max (-1, 2); local min (1, -2)"],
          hint: "Solve f'=0, substitute into f, then use the derivative sign sequence plus, minus, plus.",
          explanation: "The derivative is 3(x-1)(x+1), so stationary x-values are -1 and 1. Their coordinates are (-1,2) and (1,-2). The derivative signs are +,-,+, giving a local maximum first and a local minimum second.",
          difficulty: 3,
          diagnosticIntent: "Checks assembly of derivative roots, coordinates, and classifications into a feature summary.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-curve-qm2",
          prompt: "Which feature sequence matches the derivative signs from left to right?",
          latex: "f'(x):\\quad +\\quad 0\\quad -\\quad 0\\quad +",
          answer: "C",
          choices: ["Minimum then maximum", "Two horizontal inflections", "Maximum then minimum", "Inflection then vertical asymptote"],
          hint: "Translate each sign transition into rising or falling behaviour.",
          explanation: "The first change from positive to negative means the curve rises then falls, creating a local maximum. The second change from negative to positive means it falls then rises, creating a local minimum. Thus option C is correct.",
          difficulty: 3,
          diagnosticIntent: "Checks translation from a full first-derivative sign sequence to ordered graph features.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Reverses both sign-change classifications.",
            B: "Ignores that the derivative changes sign at both zeros.",
            D: "Introduces features not determined by first-derivative signs.",
          },
        }),
        qualityAnswer({
          id: "y11adv-curve-qm3",
          prompt: "State the vertex, x-intercepts, and range.",
          latex: "y=(x-2)^2-1",
          answer: "vertex (2,-1); x-intercepts 1 and 3; range y≥-1",
          acceptedAnswers: ["(2,-1); x=1,3; y>=-1", "vertex (2, -1), roots 1 and 3, range [-1,∞)", "minimum (2,-1); intercepts (1,0),(3,0); y\\ge-1"],
          hint: "Read the vertex from completed-square form, solve y=0, and use the upward opening.",
          explanation: "Completed-square form gives vertex (2,-1), and the positive squared coefficient makes it a minimum. Setting y=0 gives (x-2)^2=1, so x=1 or 3. Therefore the range is y≥-1.",
          difficulty: 3,
          diagnosticIntent: "Checks coherent assembly of algebraic and calculus-compatible features for a parabola.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-curve-qm4",
          prompt: "Which statement correctly separates monotonicity from concavity?",
          latex: "f'(x)<0,\\qquad f''(x)>0",
          answer: "B",
          choices: ["The graph is increasing and concave down.", "The graph is decreasing and concave up.", "The graph is decreasing and concave down.", "The graph has a local minimum at every point."],
          hint: "Use f' for increasing or decreasing and f'' independently for curvature.",
          explanation: "The negative first derivative means the function is decreasing, while the positive second derivative means its gradient is increasing and the graph is concave up. These properties can occur simultaneously, so option B is correct.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses conflation of first-derivative and second-derivative information.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Reverses both derivative interpretations.",
            C: "Uses the sign of f' to infer concavity.",
            D: "Applies a point classification across an entire interval without f'=0.",
          },
        }),
        qualityAnswer({
          id: "y11adv-curve-qm5",
          prompt: "The stationary points occur at x=-2 and x=2. Determine k.",
          latex: "f(x)=x^3-3kx,\\qquad k>0",
          answer: "k=4",
          acceptedAnswers: ["4", "k = 4", "4.0"],
          hint: "Solve f'(x)=3(x^2-k)=0 and compare the roots with plus or minus 2.",
          explanation: "The derivative is f'(x)=3x^2-3k=3(x^2-k). Its stationary x-values are ±√k. Matching these with -2 and 2 gives √k=2, hence k=4.",
          difficulty: 4,
          diagnosticIntent: "Assesses reverse parameter inference from the horizontal locations of curve features.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-curve-qm6",
          prompt: "Classify each stationary x-value using multiplicity and sign changes.",
          latex: "f'(x)=(x-1)^2(x+2)",
          answer: "minimum at x=-2; horizontal inflection at x=1",
          acceptedAnswers: ["x=-2 local min, x=1 HPOI", "min at -2 and stationary inflection at 1", "-2 minimum; 1 horizontal point of inflection"],
          hint: "The simple factor changes sign, while the squared factor does not.",
          explanation: "At x=-2, the simple factor x+2 changes the derivative from negative to positive, so there is a local minimum. At x=1, the squared factor touches zero without changing sign, so the curve keeps increasing through a horizontal inflection.",
          difficulty: 4,
          diagnosticIntent: "Investigates how derivative-root multiplicity shapes a curve sketch.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-curve-qm7",
          prompt: "State the increasing intervals and the inflection coordinate.",
          latex: "f'(x)=3(x-1)(x+1),\\qquad f''(x)=6x,\\qquad f(0)=0",
          answer: "increasing for x<-1 or x>1; inflection (0,0)",
          acceptedAnswers: ["increase (-∞,-1)∪(1,∞), POI (0,0)", "x<-1,x>1; point of inflection (0,0)", "increasing outside [-1,1]; inflection at the origin"],
          hint: "Use the sign of the factored first derivative, then combine f''(0)=0 with f(0).",
          explanation: "The first derivative is positive outside -1 and 1, so the function increases for x<-1 or x>1. The second derivative changes from negative to positive at x=0, and f(0)=0, so the inflection coordinate is (0,0).",
          difficulty: 4,
          diagnosticIntent: "Integrates first- and second-derivative evidence into a partial feature map.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-curve-qm8",
          prompt: "Which qualitative sketch description satisfies all the information?",
          latex: "f'(x)=3(x+1)(x-2),\\qquad f''(x)=6x-3",
          answer: "D",
          choices: ["Increasing everywhere with no turning points.", "A minimum at -1 followed by a maximum at 2.", "A maximum at -1, a minimum at 2, and no concavity change.", "A maximum at -1, a minimum at 2, with concavity changing at x=1/2."],
          hint: "Read stationary classifications from f' signs and the concavity change from the zero of f''.",
          explanation: "The first derivative is positive, then negative, then positive across -1 and 2, giving a maximum at -1 and minimum at 2. Since f''=0 at x=1/2 and changes sign there, the concavity also changes. Option D includes every feature.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses whether a student can reconcile stationary and concavity information in one sketch description.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Ignores both roots of the first derivative.",
            B: "Reverses the stationary classifications.",
            C: "Uses first-derivative features but discards second-derivative evidence.",
          },
        }),
        qualityAnswer({
          id: "y11adv-curve-qm9",
          prompt: "Find the coordinate of the local maximum.",
          latex: "f'(x)=3(x-2)(x+1),\\qquad f(0)=4,\\qquad f'(x)\\text{ is the derivative of a monic cubic}",
          answer: "(-1,15/2)",
          acceptedAnswers: ["(-1, 7.5)", "(-1,7.5)", "x=-1,y=15/2"],
          hint: "Reconstruct f by reversing f'=3x^2-3x-6 and use f(0)=4 before evaluating.",
          explanation: "Reversing the derivative gives f=x^3-(3/2)x^2-6x+C, and f(0)=4 gives C=4. The sign pattern makes x=-1 the maximum. Evaluating gives -1-3/2+6+4=15/2.",
          difficulty: 5,
          diagnosticIntent: "Synthesises derivative reconstruction, initial value, classification, and coordinate evaluation.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-curve-qm10",
          prompt: "Determine a and state all three stationary feature coordinates.",
          latex: "f(x)=x^4-2ax^2,\\qquad a>0,\\qquad\\text{local minima occur at }x=\\pm2",
          answer: "a=4; maximum (0,0); minima (-2,-16) and (2,-16)",
          acceptedAnswers: ["a=4, max (0,0), mins (±2,-16)", "4; local max (0,0); local min (-2,-16),(2,-16)", "a = 4; (0,0) max; (−2,−16),(2,−16) mins"],
          hint: "Factor f'=4x(x^2-a), match its nonzero roots, then evaluate f at all three roots.",
          explanation: "The stationary x-values are 0 and ±√a. Since the minima occur at ±2, a=4. Evaluating f=x^4-8x^2 gives f(0)=0 and f(±2)=16-32=-16. The sign pattern makes the centre a maximum and the outer points minima.",
          difficulty: 5,
          diagnosticIntent: "Synthesises parameter recovery, stationary classification, symmetry, and coordinate calculation for a quartic.",
          taskType: "synthesis",
        }),
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
        formulaAnswer("y11adv-id-exam-i4", "For f(x)=x^2-4x+1, state the interval where f is increasing.", "", "x > 2", ["x>2", "(2, infinity)", "(2, \\infty)"]),
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
        qualityAnswer({
          id: "y11adv-id-exam-qm1",
          prompt: "Find the average rate of change over the interval.",
          latex: "f(x)=x^2-2x,\\qquad 1\\le x\\le5",
          answer: "4",
          acceptedAnswers: ["m=4", "4 units per x", "4.0"],
          hint: "Evaluate f at both endpoints, then divide output change by the interval width.",
          explanation: "The endpoint values are f(1)=-1 and f(5)=15. Average rate of change is [15-(-1)]/(5-1)=16/4=4. This is the secant gradient across the interval, not a tangent gradient at one point.",
          difficulty: 3,
          diagnosticIntent: "Checks correct selection and execution of an average-rate method in a mixed setting.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-id-exam-qm2",
          prompt: "Which pairing of question type and method is correct?",
          latex: "\\text{average rate; tangent gradient; concavity}",
          answer: "B",
          choices: ["f' at one point; endpoint secant; sign of f", "endpoint secant; f' at one point; sign of f''", "first principles only; f''; sign of f'", "function value; negative reciprocal; roots of f"],
          hint: "Match each mathematical object to the derivative information it actually requires.",
          explanation: "Average rate uses an endpoint secant, tangent gradient uses f' evaluated at one point, and concavity uses the sign of f''. Option B makes all three distinctions correctly.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses method-selection errors across three closely related calculus tasks.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Swaps secant and tangent methods and uses the original function for concavity.",
            C: "Misassigns first and second derivative roles.",
            D: "Confuses values, perpendicular lines, and intercept equations with the requested methods.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-exam-qm3",
          prompt: "Find the tangent equation at x=2.",
          latex: "y=x^2-1",
          answer: "y=4x-5",
          acceptedAnswers: ["y - 3 = 4(x - 2)", "y=4x - 5", "4x-y-5=0"],
          hint: "Find the point from the original function and the gradient from the derivative.",
          explanation: "At x=2 the curve point is (2,3). The derivative y'=2x gives tangent gradient 4. Point-gradient form y-3=4(x-2) simplifies to y=4x-5.",
          difficulty: 3,
          diagnosticIntent: "Checks coordinated use of function value, derivative value, and line equation.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-id-exam-qm4",
          prompt: "A student uses f(2)=7 as the tangent gradient at x=2. Which correction is valid?",
          latex: "f(2)=7,\\qquad f'(2)=-3",
          answer: "C",
          choices: ["The gradient is 7 because it is the y-value.", "The gradient is 2 because it is the x-value.", "The point has y-value 7, but the tangent gradient is -3.", "The normal gradient is also -3."],
          hint: "Separate position on the curve from instantaneous rate of change.",
          explanation: "The equation f(2)=7 locates the point (2,7), while f'(2)=-3 gives the tangent's local gradient. These quantities have different roles, so option C is the valid correction.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses substitution into the original function when a derivative value is required.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses function height as local gradient.",
            B: "Uses the input itself as gradient.",
            D: "Assumes tangent and normal have equal gradients.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-exam-qm5",
          prompt: "Use the gradient condition to determine a.",
          latex: "f(x)=(ax+1)^2,\\qquad f'(0)=6",
          answer: "a=3",
          acceptedAnswers: ["3", "a = 3", "3.0"],
          hint: "The chain rule gives f'(x)=2a(ax+1); evaluate at zero.",
          explanation: "Differentiating gives f'(x)=2(ax+1)×a=2a(ax+1). At x=0 this becomes f'(0)=2a. The condition 2a=6 gives a=3.",
          difficulty: 4,
          diagnosticIntent: "Assesses parameter recovery through a chain-rule derivative condition.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-id-exam-qm6",
          prompt: "Find the average rate on the symmetric interval and compare it with f'(a).",
          latex: "f(x)=x^2,\\qquad [a-h,a+h],\\qquad h>0",
          answer: "2a; it equals f'(a)",
          acceptedAnswers: ["average rate=2a=f'(a)", "2a, same as the tangent gradient", "AROC 2a and f'(a)=2a"],
          hint: "Evaluate the two squared endpoints; their difference is a difference of squares.",
          explanation: "The output change is (a+h)^2-(a-h)^2=4ah and the input change is 2h. Their ratio is 2a. Since f'(x)=2x, f'(a)=2a as well, so the symmetric secant has the same gradient for every h>0.",
          difficulty: 4,
          diagnosticIntent: "Investigates a structural connection between symmetric secants and the tangent of a quadratic.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-id-exam-qm7",
          prompt: "Give the local maximum, local minimum, and point of inflection coordinates.",
          latex: "f(x)=x^3-3x^2",
          answer: "maximum (0,0); minimum (2,-4); inflection (1,-2)",
          acceptedAnswers: ["max (0,0), min (2,-4), POI (1,-2)", "(0,0) local max; (2,-4) local min; (1,-2) inflection", "maximum at origin, minimum (2,-4), inflection (1,-2)"],
          hint: "Use f'=3x(x-2) for stationary points and f''=6x-6 for inflection.",
          explanation: "The derivative roots are 0 and 2, with signs +,-,+, so (0,0) is a local maximum and (2,-4) a local minimum. Since f''=6x-6 changes sign at x=1 and f(1)=-2, the inflection is (1,-2).",
          difficulty: 4,
          diagnosticIntent: "Integrates stationary, classification, coordinate, and concavity work into one feature set.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-id-exam-qm8",
          prompt: "Which conclusion is fully justified by the information?",
          latex: "f(2)=3,\\qquad f'(2)=0,\\qquad f''(2)>0",
          answer: "A",
          choices: ["There is a local minimum at (2,3).", "There is an absolute minimum at (2,3).", "There is a local maximum at (2,3).", "There is a point of inflection at (2,3)."],
          hint: "Use the second derivative test, but distinguish local from global conclusions.",
          explanation: "The zero first derivative makes the point stationary and the positive second derivative makes it concave up there, so (2,3) is a local minimum. No global domain information is supplied, so an absolute minimum is not justified.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses overclaiming a global result from local derivative data.",
          taskType: "analytical",
          distractorMisconceptions: {
            B: "Promotes a local test to an absolute conclusion without global evidence.",
            C: "Reverses the second derivative classification.",
            D: "Treats positive second derivative as an inflection sign change.",
          },
        }),
        qualityAnswer({
          id: "y11adv-id-exam-qm9",
          prompt: "Reconstruct the monic cubic from its inflection tangent.",
          latex: "f(x)=x^3+ax^2+bx+c,\\qquad\\text{tangent at the inflection point }x=1:\\ y=-3x+5",
          answer: "x^3-3x^2+4",
          acceptedAnswers: ["f(x)=x^3-3x^2+4", "x^3 - 3x^2 + 4", "a=-3,b=0,c=4"],
          hint: "Use f''(1)=0, then take both the tangent's value and gradient at x=1.",
          explanation: "Since f''=6x+2a, inflection at x=1 gives a=-3. Then f'(1)=3+2a+b=-3 gives b=0. The tangent value is f(1)=2, so 1-3+c=2 and c=4.",
          difficulty: 5,
          diagnosticIntent: "Synthesises inflection, tangent-gradient, tangent-point, and coefficient information to reconstruct a cubic.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-id-exam-qm10",
          prompt: "Interpret the position curve: give the local maximum, local minimum, and inflection coordinates.",
          latex: "s(t)=t^3-6t^2+9t,\\qquad t\\ge0",
          answer: "maximum (1,4); minimum (3,0); inflection (2,2)",
          acceptedAnswers: ["local max (1,4), local min (3,0), POI (2,2)", "(1,4) max; (3,0) min; (2,2) inflection", "max at t=1,s=4; min at t=3,s=0; inflection t=2,s=2"],
          hint: "Factor velocity s'=3(t-1)(t-3), then use acceleration s''=6t-12.",
          explanation: "Velocity changes + to - at t=1 and - to + at t=3, giving local maximum s(1)=4 and local minimum s(3)=0. Acceleration changes sign at t=2, where s(2)=2, so the inflection is (2,2).",
          difficulty: 5,
          diagnosticIntent: "Synthesises motion interpretation with stationary-point and concavity analysis.",
          taskType: "synthesis",
        }),
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
            { key: "b", label: "(b)", prompt: "Find the x-value where concavity can change.", marks: 1, answer: "1/2", acceptedAnswers: ["0.5", "x=1/2", "x=0.5"], hint: "Set f''(x)=0.", explanation: "Set the second derivative equal to zero: 6x-3=0 gives 6x=3 and therefore x=1/2 as the concavity-change candidate." },
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
        formulaAnswer("y11adv-chain-g2", "Differentiate using the chain rule.", "(4x-1)^3", "12(4x-1)^2", ["y'=12(4x-1)^2"]),
        formulaAnswer("y11adv-chain-g3", "Differentiate using the chain rule.", "(x^2+2)^2", "4x(x^2+2)", ["4x(x^2+2)", "4x(x^2 + 2)"]),
        practicalChoice("y11adv-chain-g4", "Which is the correct derivative of $y = (3x+1)^4$?", "B", ["$4(3x+1)^3$", "$12(3x+1)^3$", "$3(3x+1)^3$", "$4(3x+1)^4$"], "The inner derivative is 3; multiply by the outer derivative $4(3x+1)^3$ to get $12(3x+1)^3$.", "y=(3x+1)^4"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-chain-i1", "Differentiate using the chain rule.", "(2x+5)^4", "8(2x+5)^3", ["y'=8(2x+5)^3"]),
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
        qualityAnswer({
          id: "y11adv-chain-qm1",
          prompt: "Differentiate using the chain rule.",
          latex: "y=(3x+2)^5",
          answer: "15(3x+2)^4",
          acceptedAnswers: ["y'=15(3x+2)^4", "dy/dx=15(3x+2)^4", "15(2+3x)^4"],
          hint: "Differentiate the outer fifth power, then multiply by the inner derivative 3.",
          explanation: "Treat 3x+2 as the inner function. The outer derivative is 5(3x+2)^4 and the inner derivative is 3. Multiplying them gives y'=5(3x+2)^4×3=15(3x+2)^4.",
          difficulty: 3,
          diagnosticIntent: "Checks direct application of the chain rule to a linear inner function.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-chain-qm2",
          prompt: "Which derivative correctly accounts for both layers of the composite function?",
          latex: "y=(x^2+1)^3",
          answer: "B",
          choices: ["3(x^2+1)^2", "6x(x^2+1)^2", "6x(x^2+1)^3", "3(2x+1)^2"],
          hint: "The outer derivative must be multiplied by the derivative of the complete inner expression x squared plus 1.",
          explanation: "The outer cubic contributes 3(x^2+1)^2, while the inner function x^2+1 contributes derivative 2x. Their product is 6x(x^2+1)^2, so option B includes both layers.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses omission or misplacement of the inner derivative in a quadratic composite.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Differentiates only the outer power and omits the inner derivative.",
            C: "Includes the inner derivative but fails to reduce the outer exponent.",
            D: "Differentiates inside the bracket before applying the outer power incorrectly.",
          },
        }),
        qualityAnswer({
          id: "y11adv-chain-qm3",
          prompt: "Find the tangent gradient at x=1.",
          latex: "y=(2x-1)^4",
          answer: "8",
          acceptedAnswers: ["m=8", "y'(1)=8", "gradient 8"],
          hint: "First find y'=8(2x-1)^3, then substitute x=1.",
          explanation: "The chain rule gives y'=4(2x-1)^3×2=8(2x-1)^3. At x=1 the bracket equals 1, so y'(1)=8(1)^3=8. The tangent therefore has positive gradient 8.",
          difficulty: 3,
          diagnosticIntent: "Checks chain-rule differentiation followed by evaluation of a local gradient.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-chain-qm4",
          prompt: "A student obtains the displayed derivative. Which diagnosis is correct?",
          latex: "y=(5x-2)^3,\\qquad y'=3(5x-2)^2",
          answer: "A",
          choices: ["The inner derivative 5 is missing.", "The outer exponent should remain 3.", "The bracket should become 5x-1.", "The derivative should be divided by 5."],
          hint: "Compare the result with dy/dx=(dy/du)(du/dx) for u=5x-2.",
          explanation: "The outer derivative 3(5x-2)^2 is correct but incomplete. Since the inner function has derivative 5, the chain rule requires multiplication by 5. The correct derivative is 15(5x-2)^2.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses the most common partial chain-rule response: differentiating only the outer layer.",
          taskType: "analytical",
          distractorMisconceptions: {
            B: "Rejects the required reduction of the outer exponent.",
            C: "Changes the inner expression instead of multiplying by its derivative.",
            D: "Uses reciprocal scaling rather than multiplication by the inner derivative.",
          },
        }),
        qualityAnswer({
          id: "y11adv-chain-qm5",
          prompt: "Use the derivative condition to determine a.",
          latex: "f(x)=(ax+1)^3,\\qquad f'(0)=12",
          answer: "a=4",
          acceptedAnswers: ["4", "a = 4", "4.0"],
          hint: "Differentiate to f'(x)=3a(ax+1)^2, then evaluate at zero.",
          explanation: "The chain rule gives f'(x)=3(ax+1)^2×a=3a(ax+1)^2. At x=0 the bracket is 1, so f'(0)=3a. Since 3a=12, the parameter is a=4.",
          difficulty: 4,
          diagnosticIntent: "Assesses reverse determination of an inner linear coefficient from a local derivative.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-chain-qm6",
          prompt: "Investigate the family and express the gradient at x=0 in terms of k.",
          latex: "F_k(x)=(kx+1)^2",
          answer: "2k",
          acceptedAnswers: ["F'_k(0)=2k", "gradient=2k", "m=2k"],
          hint: "Differentiate the whole family first, then set x=0 without choosing a numerical k.",
          explanation: "For any k, F'_k(x)=2(kx+1)×k=2k(kx+1). At x=0 this becomes F'_k(0)=2k. Thus doubling k doubles the local gradient, while a negative k reverses its sign.",
          difficulty: 4,
          diagnosticIntent: "Investigates how an inner scaling parameter controls the gradient of a composite family.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-chain-qm7",
          prompt: "Find every x-value where the tangent is horizontal.",
          latex: "y=(x^2-4x+5)^3",
          answer: "x=2",
          acceptedAnswers: ["2", "x = 2", "{2}"],
          hint: "Factor the derivative and decide which factors can actually equal zero.",
          explanation: "The derivative is y'=3(x^2-4x+5)^2(2x-4). The inner quadratic is (x-2)^2+1, so it is never zero. Therefore only 2x-4=0 can make the derivative zero, giving x=2.",
          difficulty: 4,
          diagnosticIntent: "Combines chain differentiation, factor analysis, and a horizontal-tangent condition.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-chain-qm8",
          prompt: "Which list contains all x-values where the derivative is zero?",
          latex: "y=(x^2-1)^4",
          answer: "D",
          choices: ["x=0 only", "x=-1 and x=1 only", "There are no such x-values.", "x=-1, x=0 and x=1"],
          hint: "Factor y'=8x(x^2-1)^3 and set each factor equal to zero.",
          explanation: "The chain rule gives y'=8x(x^2-1)^3. This product is zero when x=0 or when x^2-1=0, which gives x=-1 and x=1. Hence all three values in option D are required.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses incomplete zero-product reasoning after a chain-rule derivative has multiple factors.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses only the derivative of the inner function.",
            B: "Uses only the repeated outer factor and omits the inner derivative zero.",
            C: "Assumes an even outer power prevents the derivative from vanishing.",
          },
        }),
        qualityAnswer({
          id: "y11adv-chain-qm9",
          prompt: "The positive parameters are determined by two gradient measurements. Reconstruct f.",
          latex: "f(x)=(ax+b)^3,\\quad a>0,\\ b>0,\\quad f'(0)=12,\\quad f'(1)=27",
          answer: "(x+2)^3",
          acceptedAnswers: ["f(x)=(x+2)^3", "a=1,b=2", "(2+x)^3"],
          hint: "Use 3ab^2=12 and divide the second gradient equation by the first.",
          explanation: "The derivative is 3a(ax+b)^2. Thus 3ab^2=12 and 3a(a+b)^2=27. Their ratio gives (a+b)^2/b^2=9/4; positivity gives a+b=3b/2, so a=b/2. Substitution yields b=2 and a=1.",
          difficulty: 5,
          diagnosticIntent: "Synthesises chain-rule structure, a ratio of derivative conditions, and parameter reconstruction.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-chain-qm10",
          prompt: "Differentiate the nested composite function completely.",
          latex: "y=\\left[(x^2+1)^2+3\\right]^3",
          answer: "12x(x^2+1)[(x^2+1)^2+3]^2",
          acceptedAnswers: ["y'=12x(x^2+1)((x^2+1)^2+3)^2", "12x(x^2+1)((x^2+1)^2+3)^2", "12x(x^2+1)[3+(x^2+1)^2]^2"],
          hint: "Work from the outside inward: cubic, then square, then the quadratic x squared plus 1.",
          explanation: "Differentiate the outer cube to get 3[(x^2+1)^2+3]^2. The next layer contributes 2(x^2+1), and the innermost layer contributes 2x. Multiplying gives 12x(x^2+1)[(x^2+1)^2+3]^2.",
          difficulty: 5,
          diagnosticIntent: "Synthesises repeated chain-rule application across three nested functional layers.",
          taskType: "synthesis",
        }),
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
        practicalChoice("y11adv-stat-i2", "Classify the stationary point of f(x) = −x² + 4x + 1 at x = 2 using the first derivative test.", "A", ["Local maximum", "Local minimum", "Horizontal inflection", "Not a stationary point"], "f' changes from positive to negative at x=2, confirming a local maximum.", ""),
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
        qualityAnswer({
          id: "y11adv-stat-qm1",
          prompt: "Find the coordinates of the stationary point.",
          latex: "f(x)=x^2-4x+1",
          answer: "(2,-3)",
          acceptedAnswers: ["(2, -3)", "x=2,y=-3", "stationary point (2,-3)"],
          hint: "Solve f'(x)=0 for x, then substitute that value into the original function.",
          explanation: "The derivative is f'(x)=2x-4. Setting it equal to zero gives x=2. Substituting into the original function gives f(2)=4-8+1=-3, so the stationary point is (2,-3).",
          difficulty: 3,
          diagnosticIntent: "Checks the complete stationary-point process, including recovery of the y-coordinate.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-stat-qm2",
          prompt: "What classification follows from the derivative sign change?",
          latex: "f'(x):\\quad -\\ \\longrightarrow\\ 0\\ \\longrightarrow\\ +\\quad\\text{at }x=a",
          answer: "C",
          choices: ["Local maximum", "Horizontal point of inflection", "Local minimum", "No stationary point"],
          hint: "Translate the signs into falling to the left and rising to the right.",
          explanation: "A negative derivative means the curve is decreasing before x=a, while a positive derivative means it is increasing afterwards. The curve therefore falls then rises, so the stationary point is a local minimum.",
          difficulty: 3,
          diagnosticIntent: "Checks conceptual interpretation of a first-derivative sign diagram.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Reverses the sign-change pattern for maximum and minimum.",
            B: "Ignores that the derivative changes sign.",
            D: "Overlooks the zero derivative at the transition point.",
          },
        }),
        qualityAnswer({
          id: "y11adv-stat-qm3",
          prompt: "State all open intervals on which f is increasing.",
          latex: "f(x)=x^3-3x",
          answer: "x<-1 or x>1",
          acceptedAnswers: ["(-∞,-1)∪(1,∞)", "(-\\infty,-1)\\cup(1,\\infty)", "x < -1, x > 1"],
          hint: "Factor f'(x)=3(x-1)(x+1) and determine where this product is positive.",
          explanation: "The derivative is f'(x)=3x^2-3=3(x-1)(x+1). It is positive outside its roots -1 and 1 and negative between them. Therefore f is increasing for x<-1 or x>1.",
          difficulty: 3,
          diagnosticIntent: "Connects a factored derivative sign chart to intervals of increase.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-stat-qm4",
          prompt: "A student concludes that x=2 is a local maximum solely because f'(2)=0. Which evaluation is correct?",
          latex: "f'(2)=0",
          answer: "D",
          choices: ["The conclusion is always correct.", "It must instead be a local minimum.", "It must be a horizontal inflection.", "The information proves stationarity but not classification; signs on both sides are needed."],
          hint: "A zero derivative identifies a candidate, but different sign patterns produce different classifications.",
          explanation: "The equation f'(2)=0 establishes a stationary point only. A positive-to-negative change gives a maximum, negative-to-positive gives a minimum, and no sign change can give a horizontal inflection. Side signs are required.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses the false assumption that every zero derivative determines a maximum.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats stationarity as sufficient proof of a maximum.",
            B: "Substitutes one unsupported classification for another.",
            C: "Assumes no sign change without derivative evidence.",
          },
        }),
        qualityAnswer({
          id: "y11adv-stat-qm5",
          prompt: "The function has a stationary point at x=3. Determine a.",
          latex: "f(x)=x^2+ax+5",
          answer: "a=-6",
          acceptedAnswers: ["-6", "a = -6", "-6.0"],
          hint: "Differentiate and impose the condition f'(3)=0.",
          explanation: "The derivative is f'(x)=2x+a. A stationary point at x=3 requires f'(3)=6+a=0. Solving gives a=-6, which makes the quadratic's axis of symmetry x=3.",
          difficulty: 4,
          diagnosticIntent: "Assesses reverse determination of a polynomial parameter from stationarity.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-stat-qm6",
          prompt: "For k>0, classify both stationary points of the family.",
          latex: "f_k(x)=x^3-3k^2x",
          answer: "maximum at x=-k; minimum at x=k",
          acceptedAnswers: ["local max at -k and local min at k", "-k maximum, k minimum", "max x=-k; min x=k"],
          hint: "Factor f'_k(x)=3(x-k)(x+k) and track its signs across the two roots.",
          explanation: "The derivative 3(x-k)(x+k) is positive for x<-k, negative between -k and k, and positive for x>k. Thus the sign changes + to - at -k, giving a local maximum, and - to + at k, giving a local minimum.",
          difficulty: 4,
          diagnosticIntent: "Investigates how a parameter controls stationary locations while preserving their sign-change classifications.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-stat-qm7",
          prompt: "Classify the stationary point at x=0 using the first derivative test.",
          latex: "f(x)=x^3",
          answer: "horizontal point of inflection",
          acceptedAnswers: ["stationary point of inflection", "horizontal inflection", "HPOI"],
          hint: "Check the sign of f'(x)=3x^2 on both sides of zero.",
          explanation: "Although f'(0)=0, the derivative 3x^2 is positive for every nonzero x on both sides. The curve is increasing before and after zero, so there is no maximum or minimum; it is a horizontal point of inflection.",
          difficulty: 4,
          diagnosticIntent: "Distinguishes stationarity without a derivative sign change from turning points.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-stat-qm8",
          prompt: "Which classification of the two stationary x-values is correct?",
          latex: "f'(x)=(x+2)^2(x-1)",
          answer: "B",
          choices: ["Maximum at -2 and minimum at 1", "Horizontal inflection at -2 and minimum at 1", "Minimum at -2 and maximum at 1", "Horizontal inflections at both -2 and 1"],
          hint: "An even-multiplicity factor does not change sign; the linear factor does.",
          explanation: "At x=-2 the squared factor touches zero without changing sign, so f' stays negative and the point is a horizontal inflection. At x=1, f' changes from negative to positive, so that point is a local minimum.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses sign behaviour at derivative roots of different multiplicities.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes every leftmost stationary point is a maximum.",
            C: "Treats the repeated derivative root as a sign change and reverses the simple root.",
            D: "Assumes neither derivative root changes sign.",
          },
        }),
        qualityAnswer({
          id: "y11adv-stat-qm9",
          prompt: "Reconstruct the cubic from its derivative roots, leading derivative coefficient, and intercept.",
          latex: "f'(-1)=f'(2)=0,\\quad f'(x)\\text{ has leading coefficient }3,\\quad f(0)=4",
          answer: "x^3-(3/2)x^2-6x+4",
          acceptedAnswers: ["f(x)=x^3-1.5x^2-6x+4", "x^3-1.5x^2-6x+4", "x^3-\\frac32x^2-6x+4"],
          hint: "Build f'(x)=3(x+1)(x-2), then reverse the power rule and use f(0).",
          explanation: "The derivative is 3(x+1)(x-2)=3x^2-3x-6. Reversing the power rule gives f(x)=x^3-(3/2)x^2-6x+C. Since f(0)=4, C=4, producing the stated cubic.",
          difficulty: 5,
          diagnosticIntent: "Synthesises derivative-root structure, coefficient information, and an initial value to reconstruct a function.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-stat-qm10",
          prompt: "The vertical distance from the local maximum to the local minimum is 32. Determine a.",
          latex: "f(x)=x^3-3ax,\\qquad a>0",
          answer: "a=4",
          acceptedAnswers: ["4", "a = 4", "4.0"],
          hint: "The stationary x-values are plus or minus square root a; evaluate f at both and form their difference.",
          explanation: "Solving f'=3x^2-3a=0 gives x=±√a. The maximum value is f(-√a)=2a^(3/2), while the minimum is f(√a)=-2a^(3/2). Their distance is 4a^(3/2)=32, so a^(3/2)=8 and a=4.",
          difficulty: 5,
          diagnosticIntent: "Synthesises stationary analysis, parameterised function values, and a geometric distance condition.",
          taskType: "synthesis",
        }),
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
        qualityAnswer({
          id: "y11adv-conc-qm1",
          prompt: "Find the second derivative.",
          latex: "f(x)=2x^4-3x^2+5",
          answer: "24x^2-6",
          acceptedAnswers: ["f''(x)=24x^2-6", "24x^2 - 6", "6(4x^2-1)"],
          hint: "Differentiate the polynomial once, then differentiate the result a second time.",
          explanation: "The first derivative is f'(x)=8x^3-6x. Differentiating again gives f''(x)=24x^2-6. The constant vanished on the first differentiation and contributes nothing thereafter.",
          difficulty: 3,
          diagnosticIntent: "Checks accurate successive differentiation of a polynomial.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-conc-qm2",
          prompt: "Which conclusion is guaranteed on the interval?",
          latex: "f''(x)>0",
          answer: "B",
          choices: ["f is increasing.", "The gradient f' is increasing and f is concave up.", "f has a local minimum at every point.", "Every function value is positive."],
          hint: "The second derivative describes how the first derivative changes, not the sign of the original function.",
          explanation: "A positive second derivative means the gradient is increasing as x increases, so the curve is concave up. It does not guarantee that f' itself is positive, that f is increasing, or that every point is a minimum.",
          difficulty: 3,
          diagnosticIntent: "Distinguishes concavity from monotonicity, function sign, and stationary-point classification.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Confuses the sign of f'' with the sign of f'.",
            C: "Applies the stationary-point test without requiring f'=0.",
            D: "Confuses the second derivative with the sign of function values.",
          },
        }),
        qualityAnswer({
          id: "y11adv-conc-qm3",
          prompt: "Find the x-coordinate of the point of inflection.",
          latex: "f(x)=x^3-6x^2+9x",
          answer: "x=2",
          acceptedAnswers: ["2", "x = 2", "(2,-2)"],
          hint: "Find f''(x), set it equal to zero, and verify that its linear sign changes there.",
          explanation: "The derivatives are f'(x)=3x^2-12x+9 and f''(x)=6x-12. Solving f''(x)=0 gives x=2. Because this linear expression changes from negative to positive at 2, concavity changes and the inflection is confirmed.",
          difficulty: 3,
          diagnosticIntent: "Checks candidate calculation and sign-change confirmation for a cubic inflection point.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-conc-qm4",
          prompt: "What does the second derivative test establish at x=a?",
          latex: "f'(a)=0,\\qquad f''(a)<0",
          answer: "A",
          choices: ["A local maximum", "A local minimum", "A non-stationary inflection", "No conclusion"],
          hint: "At a stationary point, negative second derivative means the curve bends downward.",
          explanation: "The condition f'(a)=0 makes the point stationary. Since f''(a)<0, the graph is concave down there, so nearby values lie below the stationary height. Therefore x=a is a local maximum.",
          difficulty: 3,
          diagnosticIntent: "Checks correct use of both hypotheses in the second derivative test.",
          taskType: "analytical",
          distractorMisconceptions: {
            B: "Reverses the concavity classification.",
            C: "Ignores the stationary condition and the nonzero second derivative.",
            D: "Treats a decisive negative second derivative as inconclusive.",
          },
        }),
        qualityAnswer({
          id: "y11adv-conc-qm5",
          prompt: "The function has inflection points at x=-1 and x=1. Determine a.",
          latex: "f(x)=x^4+ax^2,\\qquad a<0",
          answer: "a=-6",
          acceptedAnswers: ["-6", "a = -6", "-6.0"],
          hint: "Use f''(x)=12x^2+2a and impose f''(1)=0.",
          explanation: "The second derivative is f''(x)=12x^2+2a. Requiring x=1 to be a zero gives 12+2a=0, so a=-6. Then f''=12(x^2-1), which changes sign at both -1 and 1, confirming the inflections.",
          difficulty: 4,
          diagnosticIntent: "Assesses reverse parameter inference from prescribed and verified inflection locations.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-conc-qm6",
          prompt: "Determine whether x=0 is an inflection point and justify the decision.",
          latex: "f(x)=x^4",
          answer: "No; f'' does not change sign",
          acceptedAnswers: ["no inflection at x=0", "no, f''=12x^2 is nonnegative on both sides", "not a point of inflection"],
          hint: "Find f'' and compare its sign immediately to the left and right of zero.",
          explanation: "Here f''(x)=12x^2, so f''(0)=0. However, f'' is positive on both sides of zero and the graph remains concave up. Since concavity does not change, x=0 is not an inflection point.",
          difficulty: 4,
          diagnosticIntent: "Investigates why a zero second derivative is only a candidate condition.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-conc-qm7",
          prompt: "State the intervals of concavity, using open intervals.",
          latex: "f(x)=x^4-6x^2",
          answer: "concave up for x<-1 or x>1; concave down for -1<x<1",
          acceptedAnswers: ["up: (-∞,-1)∪(1,∞); down: (-1,1)", "CU x<-1,x>1; CD -1<x<1", "concave up outside [-1,1], down between -1 and 1"],
          hint: "Factor f''(x)=12(x-1)(x+1) and make a three-interval sign chart.",
          explanation: "The second derivative is 12x^2-12=12(x-1)(x+1). It is positive outside the roots -1 and 1 and negative between them. Thus the graph is concave up for x<-1 or x>1 and concave down for -1<x<1.",
          difficulty: 4,
          diagnosticIntent: "Investigates a second-derivative sign chart across two inflection candidates.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-conc-qm8",
          prompt: "Which evaluation of the second derivative test is correct?",
          latex: "f'(a)=0,\\qquad f''(a)=0",
          answer: "D",
          choices: ["x=a must be a local maximum.", "x=a must be a local minimum.", "x=a must be a point of inflection.", "The test is inconclusive; another sign analysis is required."],
          hint: "Compare functions such as x fourth, negative x fourth, and x cubed at zero.",
          explanation: "When both derivatives vanish, different behaviours remain possible: x^4 has a minimum, -x^4 has a maximum, and x^3 has a horizontal inflection at zero. Therefore the second derivative test alone is inconclusive.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses overinterpretation of the degenerate second derivative test.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes zero second derivative means concave down.",
            B: "Assumes zero second derivative means concave up.",
            C: "Treats a candidate equation as proof of concavity change.",
          },
        }),
        qualityAnswer({
          id: "y11adv-conc-qm9",
          prompt: "Reconstruct f from its second derivative and the two initial conditions.",
          latex: "f''(x)=6x-12,\\qquad f'(0)=9,\\qquad f(0)=5",
          answer: "x^3-6x^2+9x+5",
          acceptedAnswers: ["f(x)=x^3-6x^2+9x+5", "x^3 - 6x^2 + 9x + 5", "5+9x-6x^2+x^3"],
          hint: "Reverse the power rule twice, introducing and then determining a constant each time.",
          explanation: "Reversing once gives f'(x)=3x^2-12x+C, and f'(0)=9 makes C=9. Reversing again gives f(x)=x^3-6x^2+9x+D, and f(0)=5 makes D=5.",
          difficulty: 5,
          diagnosticIntent: "Synthesises second-derivative information with two successive initial conditions to reconstruct a function.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-conc-qm10",
          prompt: "The two inflection points are four units apart horizontally. Determine a.",
          latex: "f(x)=x^4-2ax^2,\\qquad a>0",
          answer: "a=12",
          acceptedAnswers: ["12", "a = 12", "12.0"],
          hint: "Solve f''(x)=0 for the two symmetric x-values and equate their separation to 4.",
          explanation: "The second derivative is f''=12x^2-4a. Its sign-changing zeros are x=±√(a/3), whose separation is 2√(a/3). Setting this equal to 4 gives √(a/3)=2, so a/3=4 and a=12.",
          difficulty: 5,
          diagnosticIntent: "Synthesises parameterised concavity, symmetric inflection locations, and a geometric distance condition.",
          taskType: "synthesis",
        }),
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
        formulaAnswer("y11adv-pr-g2", "For the product rule applied to y = x²(x+3), find u' when u = x².", "u=x^2,\\quad u'=\\Box", "2x", ["u'=2x"]),
        formulaAnswer("y11adv-pr-g3", "For the product rule applied to y = x²(x+3), find v' when v = x+3.", "v=x+3,\\quad v'=\\Box", "1", ["v'=1"]),
        practicalChoice("y11adv-pr-g4", "Choose the simplified derivative of y = x²(x+3).", "A",
          ["$3x^2+6x$", "$2x(x+3)$ only", "$x^2+6x$", "$3x^2-6x$"],
          "Using u'v + uv' = 2x(x+3) + x² = 2x²+6x+x² = 3x²+6x.",
          "y=x^2(x+3)"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-pr-i1", "Find u' when u = x³.", "u=x^3,\\quad u'=\\Box", "3x^2", ["3x²"]),
        formulaAnswer("y11adv-pr-i2", "Find v' when v = 2x-5.", "v=2x-5,\\quad v'=\\Box", "2", ["v'=2"]),
        formulaAnswer("y11adv-pr-i3", "Evaluate the derivative of y = x(x+2) at x = 0.", "y=x(x+2),\\quad \\frac{dy}{dx}\\text{ at }x=0", "2", ["y'(0)=2"]),
        formulaAnswer("y11adv-pr-i4", "Evaluate the derivative of y = x(x+2) at x = 3.", "y=x(x+2),\\quad \\frac{dy}{dx}\\text{ at }x=3", "8", ["y'(3)=8"]),
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
        qualityAnswer({
          id: "y11adv-pr-qm1",
          prompt: "Differentiate using the product rule, then simplify.",
          latex: "y=x^2(x-3)",
          answer: "3x^2-6x",
          acceptedAnswers: ["dy/dx=3x^2-6x", "\\frac{dy}{dx}=3x^2-6x", "2x(x-3)+x^2"],
          hint: "Let u=x^2 and v=x-3, then form u'v+uv' before collecting terms.",
          explanation: "With u=x^2 and v=x-3, we have u'=2x and v'=1. The product rule gives y'=2x(x-3)+x^2(1). Expanding and combining produces 2x^2-6x+x^2=3x^2-6x.",
          difficulty: 3,
          diagnosticIntent: "Checks complete execution of both product-rule terms followed by accurate polynomial simplification.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-pr-qm2",
          prompt: "Which line is a correct unsimplified product-rule derivative?",
          latex: "y=(2x+1)(x^2-4)",
          answer: "B",
          choices: ["y'=2(2x)+(1)(x^2-4)", "y'=2(x^2-4)+(2x+1)(2x)", "y'=2(2x+1)(x^2-4)(2x)", "y'=2(x^2-4)-(2x+1)(2x)"],
          hint: "Differentiate one factor at a time while keeping the other factor unchanged, then add.",
          explanation: "For u=2x+1 and v=x^2-4, the derivatives are u'=2 and v'=2x. Therefore u'v+uv'=2(x^2-4)+(2x+1)(2x), which is option B. Each term retains one original factor.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses whether students can map two factors and their derivatives into the product-rule structure.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Pairs derivatives together and omits the original factor 2x+1.",
            C: "Multiplies both derivatives and both original factors into one term.",
            D: "Uses subtraction instead of the required sum of two contributions.",
          },
        }),
        qualityAnswer({
          id: "y11adv-pr-qm3",
          prompt: "Find the tangent gradient at x=1.",
          latex: "y=(x^2+1)(x-2)",
          answer: "0",
          acceptedAnswers: ["m=0", "y'(1)=0", "zero"],
          hint: "Use y'=2x(x-2)+(x^2+1), then substitute x=1 into both terms.",
          explanation: "The product rule gives y'=2x(x-2)+(x^2+1)(1). At x=1, this is 2(1)(-1)+(1+1)=-2+2=0. Hence the tangent is horizontal at the stated point.",
          difficulty: 3,
          diagnosticIntent: "Checks application of the product rule at a point, including cancellation between its two terms.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-pr-qm4",
          prompt: "A student obtains the displayed derivative. Which diagnosis is correct?",
          latex: "y=x^2(x+5),\\qquad y'=2x",
          answer: "C",
          choices: ["The derivative of x^2 should be x.", "The factors should have been divided rather than multiplied.", "The student differentiated both factors but omitted the unchanged factors and the required sum.", "The answer is correct because the derivative of x+5 is 1."],
          hint: "Write the full structure u'v+uv' and compare every factor with the student's expression.",
          explanation: "The derivative must be 2x(x+5)+x^2(1), not merely 2x times 1. The student has effectively multiplied u' and v' while discarding both original factors. The correct simplified derivative is 3x^2+10x.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses the common false rule (uv)'=u'v' and identifies precisely what information it loses.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Misstates the power rule for x squared.",
            B: "Confuses the product rule with the quotient rule.",
            D: "Uses one correct component to justify an incomplete derivative.",
          },
        }),
        qualityAnswer({
          id: "y11adv-pr-qm5",
          prompt: "The product has the stated derivative value at x=1. Determine a.",
          latex: "f(x)=(x+a)(x^2+1),\\qquad f'(1)=10",
          answer: "a=3",
          acceptedAnswers: ["3", "a = 3", "3.0"],
          hint: "Use f'(x)=(x^2+1)+(x+a)(2x), then substitute x=1.",
          explanation: "The product rule gives f'(x)=1(x^2+1)+(x+a)(2x). At x=1 this becomes 2+2(1+a)=4+2a. Setting 4+2a=10 gives 2a=6, so a=3.",
          difficulty: 4,
          diagnosticIntent: "Assesses reverse parameter inference from a local derivative condition on a product.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-pr-qm6",
          prompt: "Differentiate in product form and use simplification to explain why the middle terms cancel.",
          latex: "y=(x-1)(x^2+x+1)",
          answer: "3x^2",
          acceptedAnswers: ["y'=3x^2", "dy/dx=3x^2", "\\frac{dy}{dx}=3x^2"],
          hint: "Form (x^2+x+1)+(x-1)(2x+1), then expand only the second contribution.",
          explanation: "The product rule gives y'=(x^2+x+1)+(x-1)(2x+1). Expanding the second term gives 2x^2-x-1, so the x and constant terms cancel, leaving 3x^2. This agrees with the identity y=x^3-1.",
          difficulty: 4,
          diagnosticIntent: "Investigates equivalence between product-rule and expansion methods, with attention to structural cancellation.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-pr-qm7",
          prompt: "Find k so that this product has a horizontal tangent at x=3.",
          latex: "f(x)=x(x-k)",
          answer: "k=6",
          acceptedAnswers: ["6", "k = 6", "6.0"],
          hint: "Differentiate the product to obtain f'(x)=2x-k, then impose f'(3)=0.",
          explanation: "Using the product rule, f'(x)=1(x-k)+x(1)=2x-k. A horizontal tangent at x=3 requires f'(3)=6-k=0. Therefore k=6, and the two product-rule contributions cancel at that point.",
          difficulty: 4,
          diagnosticIntent: "Connects product differentiation to a geometric constraint and solves backwards for a model parameter.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-pr-qm8",
          prompt: "The values of two functions and their derivatives are known at x=2. What is the derivative of their product there?",
          latex: "u(2)=0,\\quad u'(2)=3,\\quad v(2)=-4,\\quad v'(2)=5",
          answer: "A",
          choices: ["-12", "15", "3", "0"],
          hint: "Evaluate u'v+uv' using the four local values; do not assume a zero factor makes the derivative zero.",
          explanation: "At x=2, (uv)'=u'v+uv'=3(-4)+0(5)=-12. Although the product itself is zero because u(2)=0, its derivative need not be zero: the first contribution records how u is changing while v is nonzero.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses confusion between a product's value and its derivative using abstract local function data.",
          taskType: "analytical",
          distractorMisconceptions: {
            B: "Multiplies the two derivative values u' and v'.",
            C: "Keeps only u' and ignores the value of the other factor.",
            D: "Assumes a zero product value forces a zero product derivative.",
          },
        }),
        qualityAnswer({
          id: "y11adv-pr-qm9",
          prompt: "The gradient conditions determine a and b up to order. Find the unordered pair {a,b}.",
          latex: "f(x)=(x+a)(x^2+bx),\\qquad f'(0)=2,\\qquad f'(1)=11",
          answer: "{1,2}",
          acceptedAnswers: ["{2,1}", "1 and 2", "a,b=1,2 in either order"],
          hint: "Expand or use the product rule to show f'(0)=ab and f'(1)=3+2(a+b)+ab.",
          explanation: "Expanding gives f=x^3+(a+b)x^2+abx, so f'=3x^2+2(a+b)x+ab. Thus ab=2, while 11=3+2(a+b)+2 gives a+b=3. The numbers with sum 3 and product 2 are 1 and 2.",
          difficulty: 5,
          diagnosticIntent: "Synthesises product differentiation, coefficient structure, and simultaneous symmetric conditions to recover parameters.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-pr-qm10",
          prompt: "Differentiate the parameterised product and state why the final derivative does not depend on k.",
          latex: "F_k(x)=(x-k)(x^2+kx+k^2)",
          answer: "3x^2",
          acceptedAnswers: ["F'_k(x)=3x^2", "F'(x)=3x^2", "dF/dx=3x^2"],
          hint: "Apply the product rule, then collect the x squared, x, and constant contributions separately.",
          explanation: "The product rule gives F'_k=(x^2+kx+k^2)+(x-k)(2x+k). The second term expands to 2x^2-kx-k^2, so all k-dependent terms cancel and F'_k=3x^2. Equivalently, the product is x^3-k^3.",
          difficulty: 5,
          diagnosticIntent: "Synthesises algebraic identity structure with the product rule to reveal parameter cancellation.",
          taskType: "synthesis",
        }),
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
            { key: "a", label: "(a)", prompt: "Find u' when u = x².", latex: "u=x^2", marks: 1, answer: "2x", acceptedAnswers: ["u'=2x"], hint: "Use the power rule on x².", explanation: "Applying the power rule to u=x² multiplies by 2 and reduces the exponent to 1, so u'=2x." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x + 3.", latex: "v=x+3", marks: 1, answer: "1", acceptedAnswers: ["v'=1"], hint: "Differentiate x+3 term by term.", explanation: "The derivative of x is 1 and the constant 3 differentiates to zero, so v'=1+0=1." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 1. The derivative is dy/dx = 3x² + 6x.", latex: "\\frac{dy}{dx}=3x^2+6x,\\quad x=1", marks: 2, answer: "9", acceptedAnswers: ["y'(1)=9"], hint: "Substitute x=1 into 3(1)²+6(1).", explanation: "Substituting x=1 into the completed derivative gives 3(1)²+6(1)=3+6=9, so the tangent gradient is 9." },
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
            { key: "a", label: "(a)", prompt: "Find u' when u = x.", latex: "u=x", marks: 1, answer: "1", acceptedAnswers: ["u'=1"], hint: "d/dx(x) = 1.", explanation: "The function u=x has constant gradient 1, so differentiating the linear factor gives u'=1." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x² − 1.", latex: "v=x^2-1", marks: 1, answer: "2x", acceptedAnswers: ["v'=2x"], hint: "Differentiate x²-1 term by term.", explanation: "The power rule gives 2x from x², while the constant -1 differentiates to zero; therefore v'=2x." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 2. The derivative is dy/dx = 3x² − 1.", latex: "\\frac{dy}{dx}=3x^2-1,\\quad x=2", marks: 2, answer: "11", acceptedAnswers: ["y'(2)=11"], hint: "Substitute x=2: 3(4)-1.", explanation: "Substituting x=2 gives 3(2²)-1=3(4)-1=12-1=11, so the tangent gradient at x=2 is 11." },
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
        formulaAnswer("y11adv-qr-g2", "For y = (x+1)/x, find u' when u = x+1.", "u=x+1,\\quad u'=\\Box", "1", ["u'=1"]),
        formulaAnswer("y11adv-qr-g3", "For y = (x+1)/x, find v' when v = x.", "v=x,\\quad v'=\\Box", "1", ["v'=1"]),
        formulaAnswer("y11adv-qr-g4", "Evaluate dy/dx = −1/x² at x = 1.", "\\frac{dy}{dx}=-\\frac{1}{x^2},\\quad x=1", "-1", ["−1"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-qr-i1", "For y = (x²+4)/x, find u' when u = x²+4.", "u=x^2+4,\\quad u'=\\Box", "2x", ["u'=2x"]),
        formulaAnswer("y11adv-qr-i2", "For y = (x²+4)/x, find v' when v = x.", "v=x,\\quad v'=\\Box", "1", ["v'=1"]),
        formulaAnswer("y11adv-qr-i3", "Evaluate d/dx[(x²+4)/x] at x = 1. The derivative is (x²−4)/x².", "\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]=\\frac{x^2-4}{x^2},\\quad x=1", "-3", ["−3"]),
        formulaAnswer("y11adv-qr-i4", "Evaluate d/dx[(x²+4)/x] at x = 2.", "\\frac{d}{dx}\\!\\left[\\frac{x^2+4}{x}\\right]=\\frac{x^2-4}{x^2},\\quad x=2", "0", ["y'(2)=0"]),
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
        qualityAnswer({
          id: "y11adv-qr-qm1",
          prompt: "Differentiate using the quotient rule and simplify the numerator.",
          latex: "y=\\frac{x^2+1}{x-1}",
          answer: "(x^2-2x-1)/(x-1)^2",
          acceptedAnswers: ["y'=(x^2-2x-1)/(x-1)^2", "\\frac{x^2-2x-1}{(x-1)^2}", "[2x(x-1)-(x^2+1)]/(x-1)^2"],
          hint: "Use u=x^2+1 and v=x-1 in (u'v-uv')/v^2.",
          explanation: "Here u'=2x and v'=1. The quotient rule gives [2x(x-1)-(x^2+1)]/(x-1)^2. Expanding the numerator produces 2x^2-2x-x^2-1=x^2-2x-1, with the denominator still squared.",
          difficulty: 3,
          diagnosticIntent: "Checks complete quotient-rule execution, subtraction brackets, and preservation of the squared denominator.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-qr-qm2",
          prompt: "Which expression is the correct unsimplified derivative?",
          latex: "y=\\frac{3x-2}{x^2+1}",
          answer: "C",
          choices: ["\\frac{3}{2x}", "\\frac{3(x^2+1)+(3x-2)(2x)}{(x^2+1)^2}", "\\frac{3(x^2+1)-(3x-2)(2x)}{(x^2+1)^2}", "\\frac{3(x^2+1)-(3x-2)(2x)}{x^2+1}"],
          hint: "Place u'v first, subtract uv', and square the entire original denominator.",
          explanation: "With u=3x-2 and v=x^2+1, u'=3 and v'=2x. Substitution into (u'v-uv')/v^2 gives [3(x^2+1)-(3x-2)(2x)]/(x^2+1)^2, which is option C.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses sign order and denominator-squaring errors in the quotient-rule template.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Divides the two derivatives instead of applying the quotient rule.",
            B: "Adds the uv' contribution instead of subtracting it.",
            D: "Builds the numerator correctly but fails to square the denominator.",
          },
        }),
        qualityAnswer({
          id: "y11adv-qr-qm3",
          prompt: "Find the tangent gradient at x=2.",
          latex: "y=\\frac{x+2}{x}",
          answer: "-1/2",
          acceptedAnswers: ["-0.5", "m=-1/2", "y'(2)=-1/2"],
          hint: "The derivative simplifies to -2/x^2; then substitute x=2.",
          explanation: "The quotient rule gives y'=[1(x)-(x+2)(1)]/x^2=-2/x^2. At x=2, y'(2)=-2/4=-1/2, so the tangent is decreasing with gradient one-half in magnitude.",
          difficulty: 3,
          diagnosticIntent: "Checks quotient differentiation at a point and exact simplification of a negative fractional gradient.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-qr-qm4",
          prompt: "A student obtains the displayed derivative. Which diagnosis is correct?",
          latex: "y=\\frac{x+3}{x-1},\\qquad y'=\\frac{4}{(x-1)^2}",
          answer: "B",
          choices: ["The denominator should not be squared.", "The two numerator contributions were subtracted in the reverse order, changing the sign.", "The derivatives of both linear expressions should be zero.", "The quotient rule always produces a positive derivative."],
          hint: "Compute (x-1)-(x+3) and compare its sign with the displayed numerator.",
          explanation: "The correct numerator is 1(x-1)-(x+3)(1)=x-1-x-3=-4. The student has effectively used uv'-u'v, reversing the required order and changing the sign. Thus y'=-4/(x-1)^2.",
          difficulty: 3,
          diagnosticIntent: "Diagnoses reversal of the quotient-rule numerator through a concrete sign error.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Rejects the required squared denominator.",
            C: "Treats non-constant linear functions as constants.",
            D: "Assumes a squared denominator forces the whole derivative to be positive.",
          },
        }),
        qualityAnswer({
          id: "y11adv-qr-qm5",
          prompt: "Use the derivative condition to determine a.",
          latex: "f(x)=\\frac{x+a}{x-1},\\qquad f'(2)=-5",
          answer: "a=4",
          acceptedAnswers: ["4", "a = 4", "4.0"],
          hint: "The quotient-rule numerator simplifies to (x-1)-(x+a)=-1-a.",
          explanation: "The derivative is f'(x)=[(x-1)-(x+a)]/(x-1)^2=(-1-a)/(x-1)^2. At x=2 the denominator is 1, so -1-a=-5. Therefore a=4.",
          difficulty: 4,
          diagnosticIntent: "Assesses reverse inference of a numerator parameter from a prescribed quotient gradient.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-qr-qm6",
          prompt: "Simplify before differentiating, then state the derivative with its valid domain.",
          latex: "f(x)=\\frac{x^3-x}{x}",
          answer: "2x, x≠0",
          acceptedAnswers: ["f'(x)=2x for x not equal to 0", "2x (x != 0)", "2x, x\\ne0"],
          hint: "Cancel the common factor x, but retain the exclusion inherited from the original denominator.",
          explanation: "For x not equal to zero, (x^3-x)/x=x^2-1, so f'(x)=2x. The cancellation does not define the original function at x=0; therefore the derivative statement is f'(x)=2x only for x≠0.",
          difficulty: 4,
          diagnosticIntent: "Investigates strategic simplification while preserving the original quotient's excluded input.",
          taskType: "investigative",
        }),
        qualityAnswer({
          id: "y11adv-qr-qm7",
          prompt: "Use the local function data to find the derivative of u/v at x=1.",
          latex: "u(1)=5,\\quad u'(1)=2,\\quad v(1)=-2,\\quad v'(1)=3",
          answer: "-19/4",
          acceptedAnswers: ["-4.75", "(u/v)'(1)=-19/4", "-19÷4"],
          hint: "Substitute the four values into [u'v-uv']/v^2, keeping the numerator order.",
          explanation: "At x=1, (u/v)'=[2(-2)-5(3)]/(-2)^2=(-4-15)/4=-19/4. The negative denominator value becomes positive when squared, while the numerator remains negative.",
          difficulty: 4,
          diagnosticIntent: "Applies the quotient rule to abstract local data and checks signed arithmetic independently of formulas for u and v.",
          taskType: "problem-solving",
        }),
        qualityChoice({
          id: "y11adv-qr-qm8",
          prompt: "Which derivative statement is fully correct, including the original domain?",
          latex: "f(x)=\\frac{x^2-1}{x-1}",
          answer: "D",
          choices: ["f'(x)=1 for every real x.", "f'(x)=2x for x≠1.", "f'(x)=1 only at x=1.", "f'(x)=1 for x≠1, and f' is undefined at x=1."],
          hint: "Factor and cancel for allowed inputs, but remember that cancellation cannot fill the original hole.",
          explanation: "For x≠1, f(x)=(x-1)(x+1)/(x-1)=x+1, so f'(x)=1. The original quotient is undefined at x=1, and therefore its derivative is also undefined there. Option D preserves both facts.",
          difficulty: 5,
          diagnosticIntent: "Diagnoses loss of domain restrictions after algebraic cancellation of a removable discontinuity.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Extends the simplified derivative across an input absent from the original function.",
            B: "Differentiates the numerator alone and ignores the quotient simplification.",
            C: "Assigns the derivative only at the excluded input.",
          },
        }),
        qualityAnswer({
          id: "y11adv-qr-qm9",
          prompt: "Use the function value and gradient conditions to reconstruct f.",
          latex: "f(x)=\\frac{ax+b}{x+1},\\qquad f(0)=3,\\qquad f'(0)=-1",
          answer: "(2x+3)/(x+1)",
          acceptedAnswers: ["f(x)=(2x+3)/(x+1)", "\\frac{2x+3}{x+1}", "a=2,b=3"],
          hint: "The first condition gives b; the quotient-rule derivative has numerator a-b.",
          explanation: "Since f(0)=b=3, the constant is fixed. The derivative is [a(x+1)-(ax+b)]/(x+1)^2=(a-b)/(x+1)^2. At x=0, a-b=-1, so a=2. Hence f(x)=(2x+3)/(x+1).",
          difficulty: 5,
          diagnosticIntent: "Synthesises a quotient's value and derivative conditions to reconstruct two unknown coefficients.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-qr-qm10",
          prompt: "Find the condition on a and b so that f'(x)=1 everywhere f is defined.",
          latex: "f(x)=\\frac{x^2+ax+b}{x-1}",
          answer: "a+b=-1",
          acceptedAnswers: ["a + b = -1", "b=-a-1", "a=-b-1"],
          hint: "Set the quotient-rule numerator equal to (x-1)^2 and compare constant terms.",
          explanation: "The quotient rule gives numerator (2x+a)(x-1)-(x^2+ax+b)=x^2-2x-a-b. For f'(x)=1, this must equal (x-1)^2=x^2-2x+1. Hence -a-b=1, or a+b=-1.",
          difficulty: 5,
          diagnosticIntent: "Synthesises quotient differentiation and polynomial identity matching to characterise an entire parameter family.",
          taskType: "synthesis",
        }),
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
            { key: "a", label: "(a)", prompt: "Find u' when u = x² + 4.", latex: "u=x^2+4", marks: 1, answer: "2x", acceptedAnswers: ["u'=2x"], hint: "Differentiate x²+4 term by term.", explanation: "The power rule gives 2x from x², while the constant 4 differentiates to zero, so u'=2x." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x.", latex: "v=x", marks: 1, answer: "1", acceptedAnswers: ["v'=1"], hint: "d/dx(x) = 1.", explanation: "The denominator function v=x is linear with constant gradient 1, so its derivative is v'=1." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 1. The derivative is dy/dx = (x² − 4)/x².", latex: "\\frac{dy}{dx}=\\frac{x^2-4}{x^2},\\quad x=1", marks: 2, answer: "-3", acceptedAnswers: ["−3", "y'(1)=-3"], hint: "Substitute x=1: (1−4)/1.", explanation: "Substitution gives (1²-4)/1²=(1-4)/1=-3, so the tangent gradient at x=1 is -3." },
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
            { key: "a", label: "(a)", prompt: "Find u' when u = x + 3.", latex: "u=x+3", marks: 1, answer: "1", acceptedAnswers: ["u'=1"], hint: "d/dx(x+3) = 1.", explanation: "The x term has derivative 1 and the constant 3 has derivative zero, so the numerator derivative is u'=1." },
            { key: "b", label: "(b)", prompt: "Find v' when v = x − 1.", latex: "v=x-1", marks: 1, answer: "1", acceptedAnswers: ["v'=1"], hint: "d/dx(x−1) = 1.", explanation: "The x term has derivative 1 and the constant -1 has derivative zero, so the denominator derivative is v'=1." },
            { key: "c", label: "(c)", prompt: "Evaluate dy/dx at x = 2. The derivative is dy/dx = −4/(x − 1)².", latex: "\\frac{dy}{dx}=-\\frac{4}{(x-1)^2},\\quad x=2", marks: 2, answer: "-4", acceptedAnswers: ["−4", "y'(2)=-4"], hint: "Substitute x=2: −4/(2−1)².", explanation: "At x=2 the denominator is (2-1)²=1, so -4/(2-1)²=-4 and the tangent gradient is -4." },
          ],
        },
      ],
    };
  }

  return null;
}
