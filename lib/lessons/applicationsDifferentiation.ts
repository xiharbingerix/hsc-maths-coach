import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";

function appChoice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Identify the calculus feature first, then match it to the graph or context."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
  };
}

function appNumber(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Set up the derivative information, then give the requested value only.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function applicationLesson(
  id: string,
  title: string,
  description: string,
  learningIntention: string,
  successCriteria: string[],
  teaching: ExplicitLesson["teaching"],
  workedExamples: WorkedExample[],
  guidedPractice: PracticeQuestion[],
  independentPractice: PracticeQuestion[],
  commonMistakes: ExplicitLesson["commonMistakes"],
  masteryQuiz: PracticeQuestion[]
): ExplicitLesson {
  return {
    id,
    slug: id,
    moduleSlug: "ma-c3-applications-of-differentiation",
    moduleTitle: "Applications of Differentiation",
    courseTitle: "Year 12 Mathematics Advanced",
    title,
    description,
    syllabusArea: "Calculus",
    focus: "Applications of differentiation",
    status: "active",
    video: {
      title,
      url: "/videos/placeholder-lesson.mp4",
    },
    learningIntention,
    successCriteria,
    teaching,
    workedExamples,
    guidedPractice,
    independentPractice,
    commonMistakes,
    masteryQuiz,
    masteryPassMark: 0.8,
  };
}

export const secondDerivativeConcavityLesson = applicationLesson(
  "second-derivative-concavity",
  "Second Derivative, Concavity and Points of Inflection",
  "Use the second derivative to determine concavity and test possible points of inflection.",
  "Interpret the second derivative as information about concavity and possible changes in curvature.",
  [
    "Use second derivative notation correctly.",
    "Determine concavity from the sign of f''(x).",
    "Identify possible points of inflection from f''(x) = 0 or where f'' is undefined.",
    "Confirm a point of inflection by checking a sign change in f''.",
    "Distinguish concavity from increasing and decreasing behaviour.",
    "Interpret second derivative information from tables and sign charts.",
  ],
  {
    paragraphs: [
      "You already know the gradient tells you which way a curve is heading: a positive gradient climbs, a negative gradient falls. Now ask a sharper question - is that gradient itself steady, speeding up, or slowing down? Take the parabola y = x^2 and walk along it from left to right. On the left its slope is steeply negative, then less steep, then flat at the bottom, then gently positive, then steeply positive. The slope is increasing the whole way across, and the curve answers by bending upward into the shape of a cup. That bending is what concavity measures: not which way the curve heads, but which way it curves.",
      "The tool that measures this bending is the second derivative, f''(x), which is just the derivative of f'(x). Since f'(x) is the gradient, its derivative f''(x) reports how fast the gradient is changing as you move right. This is why the sign of f'' fixes the shape. If f''(x) > 0 on an interval, the gradient is increasing there, and a slope that keeps rising has to swing the curve upward, so the curve is concave up - a valley or cup that would hold water, a smile. If f''(x) < 0, the gradient is decreasing, and a falling slope bends the curve the other way, so it is concave down - a dome or cap that water would run off, a frown. You never memorise which sign is which: positive f'' means the slope is on the way up, and an upward-trending slope cups the curve into a smile.",
      "A point of inflection is where the curve switches from one bend to the other, from cup to cap or cap to cup. For that switch to happen, f''(x) must change sign - exactly the way a turning point in the curve needs f'(x) to change sign. It is the same idea one level up: a sign change in f' marks where the curve stops climbing and starts to fall, and a sign change in f'' marks where the curve stops cupping upward and starts to cap over. Because a sign can only flip by passing through zero (or a break in the curve), you hunt for points where f''(x) = 0 or is undefined. But those are only candidates. f''(x) = 0 on its own proves nothing; you must confirm that the sign actually changes across the point.",
      "The trap to avoid is reading concave up as the same thing as increasing. They feel alike because both sound like 'going up,' but they answer different questions. Increasing is about the height of the curve and is read from the sign of f'; concave up is about the bend of the curve and is read from the sign of f''. A curve can be concave up while falling - look at the left half of y = x^2, dropping toward the origin yet still cupped like a smile - so the gradient there is negative while f'' stays positive. Decide direction from f', shape from f'', and never let one stand in for the other.",
      "In NSW exam questions the second derivative is the standard test for concavity and the routine way to locate and justify points of inflection, where writing f'' = 0 is never enough on its own - a change of sign must be shown.",
    ],
    latexBlocks: [
      "f''(x)=\\frac{d}{dx}\\big(f'(x)\\big) \\;\\Rightarrow\\; \\text{rate of change of the gradient}",
      "f''(x)>0 \\;\\Rightarrow\\; \\text{slope increasing} \\;\\Rightarrow\\; \\text{concave up (cup, smile)}",
      "f''(x)<0 \\;\\Rightarrow\\; \\text{slope decreasing} \\;\\Rightarrow\\; \\text{concave down (cap, frown)}",
      "f''(x)=0\\text{ or undefined} \\;\\Rightarrow\\; \\text{candidate only; inflection needs }f''\\text{ to change sign}",
    ],
  },
  [
    {
      title: "Concavity from a second derivative",
      questionLatex: "f''(x)=6x-12 \\quad \\text{find any point of inflection.}",
      steps: [
        {
          explanation:
            "The bend can only switch where f'' could change sign, so first find where f'' is zero - that is the only candidate.",
          latex: "6x-12=0 \\quad \\Rightarrow \\quad x=2",
        },
        {
          explanation:
            "A candidate is not a verdict. Test the sign of f'' just left and just right of x = 2 to see whether the bend really changes.",
          latex: "f''(1)=-6<0,\\quad f''(3)=6>0",
        },
        {
          explanation:
            "The sign of f'' flips from negative to positive, so the slope changes from decreasing to increasing and the curve turns from concave down (cap) to concave up (cup). A genuine change of concavity confirms the inflection.",
          latex: "\\text{cap}\\to\\text{cup at }x=2",
        },
      ],
      finalAnswerLatex: "\\text{Point of inflection at }x=2",
    },
    {
      title: "No inflection despite f''(x) = 0",
      questionLatex: "f(x)=x^4 \\quad \\text{is there a point of inflection at }x=0\\text{?}",
      steps: [
        {
          explanation: "Differentiate twice to get the concavity tool for this curve.",
          latex: "f'(x)=4x^3 \\quad \\Rightarrow \\quad f''(x)=12x^2",
        },
        {
          explanation: "Find the candidate by setting f'' to zero. It vanishes only at x = 0.",
          latex: "12x^2=0 \\quad \\Rightarrow \\quad x=0",
        },
        {
          explanation:
            "Now test the sign either side. The square makes 12x^2 positive for every x except 0, so f'' is positive on both sides. The slope is increasing before and after, so the curve stays concave up the whole way through - the bend never switches, so the candidate fails.",
          latex: "f''(-1)=12>0,\\quad f''(1)=12>0",
        },
      ],
      finalAnswerLatex: "\\text{No point of inflection at }x=0",
    },
    {
      title: "Concavity from a sign chart",
      questionLatex:
        "\\begin{array}{c|ccc}x&(-\\infty,1)&1&(1,\\infty)\\\\\\hline f''(x)&+&0&-\\end{array}",
      steps: [
        {
          explanation:
            "Read the chart as the shape of the curve. On (-infinity, 1) the second derivative is positive, so the slope is increasing and the curve is concave up, a cup.",
          latex: "f''>0 \\;\\Rightarrow\\; \\text{cup (smile)}",
        },
        {
          explanation:
            "On (1, infinity) the second derivative is negative, so the slope is decreasing and the curve is concave down, a cap.",
          latex: "f''<0 \\;\\Rightarrow\\; \\text{cap (frown)}",
        },
        {
          explanation:
            "At x = 1 the sign of f'' changes from + to -, so the bend switches from cup to cap. Picture a smile on the left joined onto a frown on the right; the join, where the concavity flips, is the point of inflection.",
          latex: "+\\,\\to\\,- \\;\\Rightarrow\\; \\text{inflection at }x=1",
        },
      ],
      finalAnswerLatex: "\\text{Concave up then concave down; inflection at }x=1",
    },
  ],
  [
    appChoice("appdiff-conc-g1", "What concavity is indicated?", "f''(x)>0\\text{ on an interval}", "A", ["Concave up", "Concave down", "Stationary only", "No gradient exists"], "A positive second derivative indicates concave up."),
    appChoice("appdiff-conc-g2", "What must be checked before confirming a point of inflection?", "f''(a)=0", "C", ["The y-intercept only", "Whether f(a)=0", "Whether concavity changes", "Whether the domain is all real numbers"], "A point of inflection needs a concavity change."),
    appNumber("appdiff-conc-g3", "Find the possible inflection x-value.", "f''(x)=4x-8", "2"),
    appChoice("appdiff-conc-g4", "Use the sign chart to identify the concavity change.", "\\begin{array}{c|ccc}x&x<0&0&x>0\\\\\\hline f''(x)&-&0&+\\end{array}", "B", ["Up to down", "Down to up", "No change", "Increasing to decreasing"], "The second derivative changes from negative to positive, so concavity changes from down to up."),
  ],
  [
    appNumber("appdiff-conc-i1", "Find the possible inflection x-value.", "f''(x)=3x+9", "-3"),
    appChoice("appdiff-conc-i2", "A profit function P(x) has P''(x)<0 on (0,100). Which conclusion is correct?", "P''(x)<0\\text{ on }(0,100)", "B", ["Profit is decreasing on $(0,100)$", "Marginal profit is decreasing on $(0,100)$", "Profit has a local minimum in $(0,100)$", "Marginal profit is zero on $(0,100)$"], "P''(x)<0 means the gradient P'(x) is decreasing. The marginal profit is decreasing over this interval."),
    appChoice("appdiff-conc-i3", "Does the information confirm a point of inflection at x = 2?", "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f''(x)&+&0&+\\end{array}", "C", ["Yes, because f''(2)=0", "Yes, because f'' is positive", "No, because concavity does not change", "No, because f'(2) is not shown"], "There is no sign change in f''."),
    appNumber("appdiff-conc-i4", "Find f''(2).", "f''(x)=6x-5", "7"),
    appChoice("appdiff-conc-i5", "Which graph description matches the sign of f''?", "\\begin{array}{c|cc}x&(-\\infty,3)&(3,\\infty)\\\\\\hline f''(x)&-&+\\end{array}", "D", ["Concave up everywhere", "Concave down everywhere", "Increasing then decreasing", "Concave down then concave up"], "The second derivative changes from negative to positive."),
  ],
  [
    { mistake: "Assuming f''(x)=0 automatically means an inflection point.", fix: "Check that f'' changes sign or that concavity changes." },
    { mistake: "Confusing concave up with increasing, because both sound like 'going up'.", fix: "Increasing is the curve's direction (sign of f'); concave up is its bend (sign of f''). A curve can be concave up while falling, as on the left of y = x^2." },
    { mistake: "Using f'(x) signs to decide concavity.", fix: "Use f''(x) signs for concavity." },
    { mistake: "Ignoring points where f'' is undefined.", fix: "Possible inflection points can also occur where f'' is undefined." },
  ],
  [
    appChoice("appdiff-conc-m1", "Find f''(1) and identify the concavity.", "f(x)=x^3-3x+5", "A", ["Concave up", "Concave down", "Cannot determine without more information", "Concave down only for $x>0$"], "f'(x)=3x^2-3, so f''(x)=6x. At x=1: f''(1)=6>0. The graph is concave up at x=1."),
    appNumber("appdiff-conc-m2", "Find the possible inflection x-value.", "f''(x)=10x-30", "3"),
    appChoice("appdiff-conc-m3", "Does the sign chart confirm a point of inflection?", "\\begin{array}{c|ccc}x&x<-1&-1&x>-1\\\\\\hline f''(x)&-&0&+\\end{array}", "A", ["Yes", "No", "Only if f'(-1)=0", "Only if f(-1)=0"], "The second derivative changes sign."),
    appChoice("appdiff-conc-m4", "Which statement identifies the error?", "f''(0)=0\\text{ and }f''(x)=12x^2", "C", ["The graph is concave down on both sides", "There must be a maximum", "There is no sign change in f''", "The first derivative is undefined"], "12x^2 is positive on both sides of 0, so f'' = 0 alone is insufficient."),
    appNumber("appdiff-conc-m5", "Find the second derivative value at x = 2.", "f''(x)=2x^2-6", "2"),
    appChoice("appdiff-conc-m6", "Which interval is concave up?", "\\begin{array}{c|ccc}x&(-\\infty,0)&(0,4)&(4,\\infty)\\\\\\hline f''(x)&-&+&-\\end{array}", "B", ["$(-\\infty,0)$", "$(0,4)$", "$(4,\\infty)$", "All intervals"], "Concave up occurs where f'' is positive."),
    appChoice("appdiff-conc-m7", "A graph is increasing and concave down. Which description is possible?", "\\text{Select A, B, C, or D.}", "D", ["Gradient is negative and becoming more negative", "Gradient is zero everywhere", "Gradient is positive and becoming larger", "Gradient is positive but becoming smaller"], "Increasing means positive gradient; concave down means the gradient is decreasing."),
    appNumber("appdiff-conc-m8", "Find the positive possible inflection x-value.", "f''(x)=x^2-9", "3", [], "The equation f''(x)=0 has x = -3 and x = 3, so the positive possible value is 3."),
    appChoice("appdiff-conc-m9", "A graph has f''(x) changing from positive to negative at x = 5. What happens there?", "\\text{Select A, B, C, or D.}", "A", ["Concavity changes from up to down", "The graph must have a local minimum", "The graph must be decreasing", "The y-intercept is 5"], "A sign change in f'' identifies a change in concavity."),
    appChoice("appdiff-conc-m10", "Which conclusion is justified by the table?", "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&+&0&+\\\\f''(x)&-&0&+\\end{array}", "C", ["Local maximum at x = 2", "Local minimum at x = 2", "Stationary point of inflection at x = 2", "No stationary point"], "The derivative is zero and f'' changes sign, while f' stays positive on both sides."),
  ]
);

export const stationaryPointClassificationLesson = applicationLesson(
  "stationary-point-classification",
  "Stationary Point Classification",
  "Classify stationary points using the second derivative test and first derivative sign test.",
  "Use derivative information to classify local maxima, local minima and stationary points of inflection.",
  [
    "Find stationary x-values from f'(x)=0 in clean cases.",
    "Use f''(x)>0 to identify a local minimum.",
    "Use f''(x)<0 to identify a local maximum.",
    "Recognise when f''(x)=0 is inconclusive.",
    "Use first derivative sign changes to classify stationary points.",
    "Identify stationary points of inflection from sign information.",
  ],
  {
    paragraphs: [
      "Solving f'(x)=0 finds the spots where a curve momentarily flattens, the stationary points. Classification answers the next question: is this flat spot the bottom of a valley, the top of a hill, or just a pause where the curve levels off and keeps going the same way? The picture to hold is the shape of the curve right around the flat point. A smile, a curve bending upward like the inside of a cup, cradles its lowest point, so that flat spot is a local minimum. A frown, a curve bending downward like an arch, holds its highest point, so that flat spot is a local maximum. Concave up is a smile and holds a minimum; concave down is a frown and holds a maximum.",
      "The second derivative measures cup versus cap, because f''(x) is the derivative of f'(x) and so reports how the slope itself is changing as you move right. Here is why its sign classifies the point. At a stationary point the slope is zero. If f''>0 there, the slope is increasing, so it passes from negative (curve falling) up through zero to positive (curve rising); falling then rising traces a valley, a minimum. If f''<0 there, the slope is decreasing, passing from positive to negative; rising then falling traces a hill, a maximum. The sign of f'' is not a rule to memorise, it is a reading of which way the curve is bending at the flat point.",
      "When f''(a)=0 the second derivative test gives no verdict, because zero is neither positive nor negative: the curve is not bending one definite way at that instant. This does not mean there is no stationary point. Fall back to the first-derivative sign table and read the sign of f' just to the left and just to the right of the point. If f' runs from positive to negative the curve rose then fell, a local maximum; from negative to positive it fell then rose, a local minimum; and if f' keeps the same sign on both sides the curve never turned, it only paused, which is a stationary point of inflection.",
      "Two slips are common. The first is swapping the signs, pairing positive f'' with a maximum because positive sounds like a high point; anchor instead to the smile, which opens upward, is concave up, has f''>0, and holds its lowest point, a minimum. The second is reading f''(a)=0 as no stationary point at all, when the point is still stationary and merely needs the sign table to classify. Keep maximum and minimum as descriptions of a single point, while increasing and decreasing describe whole intervals on either side of it.",
      "In NSW exam questions the second derivative test is the standard quick classification once f'(x)=0 is solved, and the first-derivative sign table is the expected fallback whenever f''=0 or f'' is awkward to evaluate.",
    ],
    latexBlocks: [
      "f'(a)=0 \\;\\Rightarrow\\; \\text{flat point at }x=a;\\ \\text{now classify it}",
      "f''(a)>0 \\;\\Rightarrow\\; \\text{slope increasing} \\;\\Rightarrow\\; \\text{concave up (smile)} \\;\\Rightarrow\\; \\text{local minimum}",
      "f''(a)<0 \\;\\Rightarrow\\; \\text{slope decreasing} \\;\\Rightarrow\\; \\text{concave down (frown)} \\;\\Rightarrow\\; \\text{local maximum}",
      "f''(a)=0 \\;\\Rightarrow\\; \\text{inconclusive: read }f'\\text{ either side} \\;(+\\!\\to\\!-\\ \\text{max},\\ -\\!\\to\\!+\\ \\text{min},\\ \\text{no change = stationary inflection})",
    ],
  },
  [
    {
      title: "Classify both stationary points by the second derivative",
      questionLatex:
        "f(x)=x^3-3x^2+4 \\quad \\text{classify the stationary points.}",
      steps: [
        {
          explanation:
            "Classifying flat points needs the flat points first, so start from the slope function and set it to zero.",
          latex: "f'(x)=3x^2-6x=3x(x-2)=0 \\quad \\Rightarrow \\quad x=0,\\ 2",
        },
        {
          explanation:
            "Differentiate again to measure how the slope is turning at each flat point.",
          latex: "f''(x)=6x-6",
        },
        {
          explanation:
            "At x=0 the slope is decreasing, so it runs from positive to negative: the curve rises then falls, a concave-down frown that holds a peak. So x=0 is a maximum.",
          latex: "f''(0)=-6<0 \\quad \\Rightarrow \\quad \\text{frown, local maximum}",
        },
        {
          explanation:
            "At x=2 the slope is increasing, running from negative to positive: the curve falls then rises, a concave-up smile that holds a trough. So x=2 is a minimum.",
          latex: "f''(2)=6>0 \\quad \\Rightarrow \\quad \\text{smile, local minimum}",
        },
        {
          explanation:
            "The slope function gives no height, so read the y-values off the original curve to finish the coordinates.",
          latex: "f(0)=4,\\quad f(2)=0",
        },
      ],
      finalAnswerLatex:
        "\\text{Local maximum at }(0,4),\\ \\text{local minimum at }(2,0)",
    },
    {
      title: "When f'' = 0: fall back to the sign table",
      questionLatex:
        "f(x)=x^4 \\quad \\text{classify the stationary point.}",
      steps: [
        {
          explanation:
            "Set the slope to zero to find the flat point.",
          latex: "f'(x)=4x^3=0 \\quad \\Rightarrow \\quad x=0",
        },
        {
          explanation:
            "Try the second derivative test first. It comes out zero, so the curve is not bending one definite way here and the test gives no verdict. This does not mean the point disappears.",
          latex: "f''(x)=12x^2,\\quad f''(0)=0 \\quad \\Rightarrow \\quad \\text{inconclusive}",
        },
        {
          explanation:
            "Fall back to the sign of f' just either side of x=0. It runs from negative to positive, so the curve falls then rises: a valley.",
          latex: "f'(-1)=-4<0,\\quad f'(1)=4>0 \\quad (-\\to+)",
        },
      ],
      finalAnswerLatex: "\\text{Local minimum at }(0,0)",
    },
    {
      title: "A stationary point that is only a pause",
      questionLatex:
        "f(x)=x^3 \\quad \\text{classify the stationary point.}",
      steps: [
        {
          explanation:
            "Locate the flat point, then notice the second derivative test is again inconclusive there.",
          latex: "f'(x)=3x^2=0 \\Rightarrow x=0;\\quad f''(0)=6(0)=0",
        },
        {
          explanation:
            "Read f' on both sides. It is positive on the left and positive on the right, so the slope never changes sign: the curve is rising before the flat point and still rising after it.",
          latex: "f'(-1)=3>0,\\quad f'(1)=3>0 \\quad (\\text{no sign change})",
        },
        {
          explanation:
            "Same sign on both sides means the curve only paused, it did not turn into a peak or a trough. That is a stationary point of inflection.",
        },
      ],
      finalAnswerLatex: "\\text{Stationary point of inflection at }(0,0)",
    },
  ],
  [
    appChoice("appdiff-stat-g1", "Classify the stationary point.", "f'(3)=0,\\quad f''(3)>0", "B", ["Local maximum", "Local minimum", "Stationary point of inflection", "No stationary point"], "Positive second derivative at a stationary point gives a local minimum."),
    appChoice("appdiff-stat-g2", "Classify the stationary point.", "f'(1)=0,\\quad f''(1)<0", "A", ["Local maximum", "Local minimum", "No stationary point", "Endpoint maximum only"], "Negative second derivative at a stationary point gives a local maximum."),
    appChoice("appdiff-stat-g3", "What does the second derivative test show?", "f'(0)=0,\\quad f''(0)=0", "D", ["Local maximum", "Local minimum", "No stationary point", "Inconclusive"], "When f'' is zero, the second derivative test is inconclusive."),
    appChoice("appdiff-stat-g4", "Use the first derivative signs to classify x = 4.", "\\begin{array}{c|ccc}x&x<4&4&x>4\\\\\\hline f'(x)&-&0&+\\end{array}", "B", ["Local maximum", "Local minimum", "Stationary point of inflection", "No stationary point"], "The derivative changes from negative to positive."),
  ],
  [
    appNumber("appdiff-stat-i1", "Find the stationary x-value.", "f'(x)=2x-8", "4", [], "Set f'(x)=0: 2x-8=0, so x=4."),
    appChoice("appdiff-stat-i2", "Classify the stationary point.", "f'(2)=0,\\quad f''(2)=-7", "A", ["Local maximum", "Local minimum", "Neither because f'' is non-zero", "Cannot be classified"], "A negative second derivative gives a local maximum."),
    appChoice("appdiff-stat-i3", "Which classification best fits this first-derivative sign information?", "\\begin{array}{c|ccc}x&x<-1&-1&x>-1\\\\\\hline f'(x)&+&0&+\\end{array}", "C", ["Local maximum", "Local minimum", "Stationary point of inflection", "Vertical asymptote"], "The derivative is zero but does not change sign, so this best fits a stationary point of inflection in this context."),
    appChoice("appdiff-stat-i4", "Which statement is correct?", "f'(a)=0,\\quad f''(a)=0", "C", ["There is definitely a maximum", "There is definitely a minimum", "More testing is needed", "There is no stationary point"], "The second derivative test is inconclusive."),
    appNumber("appdiff-stat-i5", "Find f''(2).", "f''(x)=6x-18", "-6", [], "Substitute x=2: f''(2)=6(2)-18=12-18=-6."),
  ],
  [
    { mistake: "Assuming f''(a)=0 means no stationary point.", fix: "f''(a)=0 only says the bending test gives no verdict, because zero is neither positive nor negative. The point is still stationary; read the sign of f' either side to classify it." },
    { mistake: "Pairing positive f'' with a maximum because positive sounds high.", fix: "Anchor to the smile: concave up opens upward, has f''>0, and cradles its lowest point, so positive f'' is a minimum." },
    { mistake: "Confusing maximum/minimum with increasing/decreasing.", fix: "Maximum and minimum describe a single point where the curve turns; increasing and decreasing describe the whole intervals on either side of it." },
    { mistake: "Classifying a point before checking f'(a)=0.", fix: "Concavity only classifies a point once it is flat, so confirm f'(a)=0 first; otherwise the second derivative is just measuring bending on a sloped piece of curve." },
    { mistake: "Ignoring the first derivative sign table.", fix: "When f''=0 or is awkward, the sign of f' just left and right still classifies the point: +to- is a maximum, -to+ a minimum, no change a stationary point of inflection." },
  ],
  [
    appChoice("appdiff-stat-m1", "Find and classify the stationary point.", "f(x)=x^2-8x+3", "B", ["Local maximum at $x=4$", "Local minimum at $x=4$", "Stationary point of inflection at $x=4$", "No stationary point"], "f'(x)=2x-8=0 gives x=4. Since f''(x)=2>0, the stationary point is a local minimum."),
    appChoice("appdiff-stat-m2", "Classify the stationary point.", "f'(-2)=0,\\quad f''(-2)=-4", "A", ["Local maximum", "Local minimum", "Inconclusive", "No stationary point"], "Negative f'' gives a local maximum."),
    appNumber("appdiff-stat-m3", "Find the stationary x-value.", "f'(x)=3x+12", "-4", [], "Set f'(x)=0: 3x+12=0, so x=-4."),
    appChoice("appdiff-stat-m4", "Use the sign chart to classify x = 2.", "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&-&0&+\\end{array}", "B", ["Local maximum", "Local minimum", "Stationary point of inflection", "No stationary point"], "The derivative changes from negative to positive."),
    appChoice("appdiff-stat-m5", "Use the sign chart to classify x = 0.", "\\begin{array}{c|ccc}x&x<0&0&x>0\\\\\\hline f'(x)&+&0&-\\end{array}", "A", ["Local maximum", "Local minimum", "Stationary point of inflection", "No stationary point"], "The derivative changes from positive to negative."),
    appChoice("appdiff-stat-m6", "Which conclusion is safest?", "f'(1)=0,\\quad f''(1)=0", "D", ["Local maximum", "Local minimum", "No stationary point", "Use another test"], "The second derivative test is inconclusive."),
    appChoice("appdiff-stat-m7", "A student says f''(a)>0 means the graph is increasing at a. Which option identifies the error?", "\\text{Select A, B, C, or D.}", "C", ["f'' controls the y-intercept", "f'' controls horizontal asymptotes", "f'' describes concavity, not increasing directly", "f'' cannot be positive"], "Increasing is about f'; concavity is about f''."),
    appNumber("appdiff-stat-m8", "Find the stationary x-value.", "f'(x)=x^2-9\\quad \\text{use the positive solution}", "3", [], "Set f'(x)=0: x^2-9=0 gives x=3 and x=-3. Using the positive solution, x=3."),
    appChoice("appdiff-stat-m9", "The derivative is zero at x = 1 and the graph changes from increasing to decreasing. What type of stationary point is this?", "\\text{Select A, B, C, or D.}", "A", ["Local maximum", "Local minimum", "Stationary point of inflection", "Endpoint"], "Increasing to decreasing gives a local maximum."),
    appChoice("appdiff-stat-m10", "The signs of f' are positive on both sides of x = 3, and f'(3)=0. Which classification best fits?", "\\text{Select A, B, C, or D.}", "C", ["Local maximum", "Local minimum", "Stationary point of inflection", "No tangent"], "A stationary point without a sign change in f' is a stationary point of inflection in this setting."),
  ]
);

export const curveSketchingCalculusLesson = applicationLesson(
  "curve-sketching-calculus",
  "Curve Sketching with Calculus",
  "Combine intercepts, stationary points, concavity and end behaviour to interpret curve sketches without drawing.",
  "Use calculus information to choose and justify graph features in curve-sketching questions.",
  [
    "Identify graph features from derivative sign charts.",
    "Combine stationary point and concavity information.",
    "Use intercepts and end behaviour to choose graph descriptions.",
    "Recognise local maxima, local minima and inflection behaviour from tables.",
    "Avoid drawing-dependent responses in digital questions.",
    "Select graph descriptions that match all given features.",
  ],
  {
    paragraphs: [
      "Picture the graph of a function as a landscape you walk across from left to right: a run of hills and valleys with rises, dips, and bends. Calculus hands you two instruments for reading that landscape without seeing the whole picture at once. The first derivative f'(x) is the slope you would feel underfoot, telling you uphill, downhill, or flat, and the second derivative f''(x) tells you whether that slope is steepening or easing off. A sign chart is simply a map of those two readings across the intervals between the special x-values, and from the map alone you can say where the curve rises, where it falls, and where it bends.",
      "See it on a real curve, y = x^2 - 4x + 3. Its slope function is f'(x) = 2x - 4. At x = 1 the slope is f'(1) = -2, negative, so you are walking downhill; at x = 3 it is f'(3) = 2, positive, so you are climbing; and between them, at x = 2, the slope passes through zero and the curve flattens. The bend never changes here because f''(x) = 2 is positive everywhere, so the slope is steepening the whole way and the curve cups upward. Written as a chart, f' reads minus, then zero, then plus, while f'' stays plus, and that one sign change in f' at x = 2 is the bottom of the valley.",
      "Why do the signs carry this much information? Because each derivative is a rate of change. f'(x) is the rate at which the height changes, so a positive f' means the height is going up and the curve rises, and a negative f' means it is falling. f''(x) is the rate at which the slope itself changes, so a positive f'' means the slope is growing and the curve bends upward into a cup, while a negative f'' means the slope is shrinking and the curve bends downward into a cap. None of this needs memorising: positive means 'on the way up' both times, once for height and once for slope.",
      "Reading a sign chart is reading these changes. Where f' keeps one sign across a whole interval, the curve simply rises or falls the entire way, with nothing to classify. The interesting points are where a sign flips. When f' goes from + to - the curve stops rising and starts falling, which is exactly a peak, a local maximum; when f' goes from - to + it stops falling and starts rising, a valley floor, a local minimum. One level up, when f'' flips sign the curve stops cupping one way and starts cupping the other, and that switch of bend is a point of inflection. The chart does not just list signs; each sign change is the curve doing something you can name.",
      "The trap to watch is reading concave down as the same thing as decreasing. They get confused because both sound like 'heading down', but they answer different questions. Decreasing is about the curve's direction and is read from the sign of f', while concave down is about its bend and is read from the sign of f''. A curve can fall while still curving upward like a cup: the left half of y = x^2 does exactly this, dropping toward the origin yet still smiling, so f' is negative there while f'' stays positive. Keep f'' > 0 tied to a cup or smile and f'' < 0 to a cap or frown, decide direction from f' and shape from f'', and never let one stand in for the other. In NSW exam questions a curve-sketch answer must agree with every row of the chart at once, so a description matching the stationary points but contradicting the concavity is wrong.",
    ],
    latexBlocks: [
      "f'(x)>0 \\;\\Rightarrow\\; \\text{rising} \\qquad f'(x)<0 \\;\\Rightarrow\\; \\text{falling}",
      "f''(x)>0 \\;\\Rightarrow\\; \\text{slope growing} \\;\\Rightarrow\\; \\text{concave up (cup, smile)}",
      "f''(x)<0 \\;\\Rightarrow\\; \\text{slope shrinking} \\;\\Rightarrow\\; \\text{concave down (cap, frown)}",
      "f'\\!:\\;+\\!\\to\\!-\\ \\text{local max},\\ \\ -\\!\\to\\!+\\ \\text{local min}; \\qquad f''\\text{ changes sign} \\;\\Rightarrow\\; \\text{inflection}",
    ],
  },
  [
    {
      title: "Read a derivative sign chart",
      questionLatex:
        "\\begin{array}{c|ccc}x&x<1&1&x>1\\\\\\hline f'(x)&+&0&-\\end{array}",
      steps: [
        {
          explanation:
            "On x < 1 the first derivative is positive. A positive slope means the height is going up, so the curve is rising on this whole interval.",
          latex: "f'>0 \\;\\Rightarrow\\; \\text{rising on }x<1",
        },
        {
          explanation:
            "On x > 1 the first derivative is negative. A negative slope means the height is going down, so the curve is falling on this whole interval.",
          latex: "f'<0 \\;\\Rightarrow\\; \\text{falling on }x>1",
        },
        {
          explanation:
            "The slope goes from + to - across x = 1, so the curve stops rising and starts falling. Rising then falling traces a peak, which is exactly a local maximum, not just an isolated zero of f'.",
          latex: "+\\to- \\;\\Rightarrow\\; \\text{peak (local maximum) at }x=1",
        },
      ],
      finalAnswerLatex: "\\text{Local maximum at }x=1",
    },
    {
      title: "Read both rows of a sign chart",
      questionLatex:
        "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&-&0&+\\\\f''(x)&+&+&+\\end{array}",
      steps: [
        {
          explanation:
            "Take the f' row first. The slope runs from - to + across x = 2, so the curve falls then rises. Falling then rising is a valley floor, a local minimum.",
          latex: "f'\\!:\\;-\\to+ \\;\\Rightarrow\\; \\text{local minimum at }x=2",
        },
        {
          explanation:
            "Now the f'' row. It is positive on every interval, so the slope is growing throughout and the curve is concave up the whole way, a cup.",
          latex: "f''>0 \\;\\Rightarrow\\; \\text{concave up (cup) throughout}",
        },
        {
          explanation:
            "Check the two rows agree before answering. A cup naturally cradles its lowest point, so a concave-up curve having its minimum at x = 2 is consistent: the picture is a smile bottoming out at x = 2.",
          latex: "\\text{cup holds its minimum} \\;\\Rightarrow\\; \\text{consistent}",
        },
      ],
      finalAnswerLatex:
        "\\text{Local minimum at }x=2,\\ \\text{concave up throughout (a cup)}",
    },
    {
      title: "Assemble the whole shape from sign charts",
      questionLatex:
        "f(x)=x^3-3x \\quad \\text{describe the shape from its sign charts.}",
      steps: [
        {
          explanation:
            "The curve turns where its slope is zero, so build f' and solve. The factored form shows two flat points.",
          latex: "f'(x)=3x^2-3=3(x-1)(x+1)=0 \\;\\Rightarrow\\; x=-1,\\,1",
        },
        {
          explanation:
            "Sign-chart f'. At x = -1 the slope flips + to -, so the curve rises then falls: a peak, a local maximum. At x = 1 it flips - to +, so the curve falls then rises: a valley, a local minimum.",
          latex:
            "\\begin{array}{c|ccccc}x&x<-1&-1&(-1,1)&1&x>1\\\\\\hline f'(x)&+&0&-&0&+\\end{array}",
        },
        {
          explanation:
            "Now the bend. f''(x) = 6x is negative for x < 0, so the curve is concave down (a cap) on the left, and positive for x > 0, so concave up (a cup) on the right. The sign of f'' flips at x = 0, so the bend switches there: a point of inflection.",
          latex: "f''(x)=6x \\;\\Rightarrow\\; \\text{cap for }x<0,\\ \\text{cup for }x>0,\\ \\text{inflection at }x=0",
        },
        {
          explanation:
            "The slope function gives no height, so read the y-values off the original f. Notice the readings agree: the cap region holds the maximum and the cup region holds the minimum.",
          latex: "f(-1)=2,\\quad f(0)=0,\\quad f(1)=-2",
        },
        {
          explanation:
            "Assemble it in order: the curve rises to a maximum at (-1, 2) while capped over, bends through the inflection at (0, 0), then drops to a minimum at (1, -2) while cupping upward, and rises again afterwards.",
          latex:
            "\\text{max }(-1,2)\\ \\to\\ \\text{inflection }(0,0)\\ \\to\\ \\text{min }(1,-2)",
        },
      ],
      finalAnswerLatex:
        "\\text{Local maximum }(-1,2),\\ \\text{inflection }(0,0),\\ \\text{local minimum }(1,-2);\\ \\text{concave down then up}",
    },
  ],
  [
    appChoice("appdiff-curve-g1", "Use the sign chart to identify the stationary point.", "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&-&0&+\\end{array}", "B", ["Local maximum", "Local minimum", "Point of discontinuity", "No stationary point"], "The graph decreases then increases."),
    appChoice("appdiff-curve-g2", "Which graph description matches the second derivative?", "f''(x)>0\\text{ for all }x", "A", ["Concave up everywhere", "Concave down everywhere", "Increasing everywhere", "Stationary everywhere"], "Positive second derivative means concave up."),
    appChoice("appdiff-curve-g3", "Which feature is needed to locate where the graph crosses the y-axis?", "\\text{Select A, B, C, or D.}", "C", ["f'(x)", "f''(x)", "f(0)", "The limiting sum"], "The y-intercept is f(0)."),
    appChoice("appdiff-curve-g4", "Which description matches the data?", "f'(1)=0,\\quad f''(1)<0", "D", ["Local minimum", "Increasing interval", "Point of inflection only", "Local maximum"], "A stationary point with negative second derivative is a local maximum."),
  ],
  [
    appChoice("appdiff-curve-i1", "Use the sign chart to choose the graph behaviour.", "\\begin{array}{c|ccc}x&x<-1&-1&x>-1\\\\\\hline f'(x)&+&0&+\\end{array}", "C", ["Local maximum", "Local minimum", "Stationary point without a turning point", "Vertical asymptote"], "The derivative stays positive on both sides but is zero at x = -1."),
    appChoice("appdiff-curve-i2", "Which graph feature matches f'' changing from negative to positive?", "\\text{Select A, B, C, or D.}", "B", ["Local maximum only", "Point of inflection", "x-intercept", "Horizontal asymptote"], "A sign change in f'' indicates a point of inflection."),
    appChoice("appdiff-curve-i3", "Which description uses all the calculus information?", "f'(0)=0,\\quad f''(0)>0,\\quad f(0)=-3", "A", ["Local minimum at y = -3", "Local maximum at y = -3", "x-intercept at -3", "Inflection at x = -3"], "The point is stationary and concave up, with y-value -3."),
    appChoice("appdiff-curve-i4", "A curve is decreasing and concave up. Which description is possible?", "\\text{Select A, B, C, or D.}", "D", ["Negative gradient becoming more negative", "Positive gradient becoming larger", "Zero gradient everywhere", "Negative gradient becoming less negative"], "Decreasing means negative gradient; concave up means the gradient is increasing."),
    appChoice("appdiff-curve-i5", "Which feature is not enough by itself to sketch a curve accurately?", "\\text{Select A, B, C, or D.}", "C", ["Intercepts", "Stationary points", "One isolated derivative value", "Concavity intervals"], "One derivative value gives only local information."),
  ],
  [
    { mistake: "Using only stationary points to choose a graph.", fix: "Also check intercepts, concavity and increasing/decreasing intervals." },
    { mistake: "Confusing concave down with decreasing, because both sound like 'heading down'.", fix: "Decreasing is the curve's direction (sign of f'); concave down is its bend (sign of f''). A curve can fall while still cupping upward, like the left half of y = x^2, so read direction from f' and shape from f''." },
    { mistake: "Ignoring y-values at stationary points.", fix: "A curve sketch needs both x-location and y-location when coordinates are available." },
    { mistake: "Drawing a sketch that contradicts the sign chart.", fix: "Every part of the sketch must match the derivative signs." },
  ],
  [
    appChoice("appdiff-curve-m1", "Use the sign chart to identify the turning point.", "\\begin{array}{c|ccc}x&x<3&3&x>3\\\\\\hline f'(x)&+&0&-\\end{array}", "A", ["Local maximum", "Local minimum", "Stationary point of inflection", "No stationary point"], "The graph increases then decreases."),
    appChoice("appdiff-curve-m2", "Which description matches the concavity chart?", "\\begin{array}{c|ccc}x&x<0&0&x>0\\\\\\hline f''(x)&+&0&-\\end{array}", "B", ["Concave down then up", "Concave up then down", "Increasing then decreasing", "No inflection possible"], "f'' changes from positive to negative."),
    appChoice("appdiff-curve-m3", "Which point type is indicated?", "f'(4)=0,\\quad f''(4)=8", "C", ["Local maximum", "Point of inflection only", "Local minimum", "x-intercept"], "Positive f'' at a stationary point gives a local minimum."),
    appChoice("appdiff-curve-m4", "Which graph description matches the information?", "f(0)=2,\\quad f'(0)=0,\\quad f''(0)<0", "D", ["Crosses the x-axis at 2", "Has a local minimum at y = 2", "Has no tangent at x = 0", "Has a local maximum at y = 2"], "The point is stationary, concave down, and has y-value 2."),
    appChoice("appdiff-curve-m5", "Which feature is shown by f'(x)<0 on an interval?", "\\text{Select A, B, C, or D.}", "A", ["The graph is decreasing", "The graph is concave down", "The graph is above the x-axis", "The graph has an inflection point"], "Negative first derivative means decreasing."),
    appChoice("appdiff-curve-m6", "Which feature is shown by f''(x)>0 on an interval?", "\\text{Select A, B, C, or D.}", "B", ["The graph is increasing", "The graph is concave up", "The graph crosses the y-axis", "The graph has a maximum"], "Positive second derivative means concave up."),
    appChoice("appdiff-curve-m7", "Which description is consistent with a local minimum?", "\\text{Select A, B, C, or D.}", "C", ["f' changes from positive to negative", "f'' is negative at the stationary point", "f' changes from negative to positive", "f'(x) is always positive"], "A local minimum has derivative sign changing from negative to positive."),
    appChoice("appdiff-curve-m8", "A curve has a stationary point at x = 1 and an inflection point at x = 3. Which statement is necessarily true?", "\\text{Select A, B, C, or D.}", "A", ["f'(1)=0", "f(3)=0", "f'(3)=0", "f''(1)=0"], "Stationary point means the first derivative is zero at that point."),
    appChoice("appdiff-curve-m9", "Which graph description matches both derivative rows?", "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&-&0&+\\\\f''(x)&+&+&+\\end{array}", "B", ["Local maximum and concave down", "Local minimum and concave up", "Stationary point of inflection", "No stationary point"], "f' changes from negative to positive and f'' is positive."),
    appChoice("appdiff-curve-m10", "A graph has f'(x)>0 and f''(x)<0 on an interval. Which description fits?", "\\text{Select A, B, C, or D.}", "D", ["Decreasing and concave up", "Decreasing and concave down", "Increasing and concave up", "Increasing and concave down"], "Positive f' means increasing; negative f'' means concave down."),
  ]
);

export const optimisationLesson = applicationLesson(
  "optimisation",
  "Optimisation",
  "Use differentiation to solve practical maximum and minimum problems with domain restrictions.",
  "Form objective functions and use derivatives to find practical maximum or minimum values.",
  [
    "Define variables and the quantity being optimised.",
    "Form an objective function in one variable.",
    "Identify domain restrictions from context.",
    "Use the derivative to find candidate maxima or minima.",
    "Check whether a candidate is appropriate in context.",
    "Interpret the final value with units.",
  ],
  {
    paragraphs: [
      "Optimisation problems ask for the best possible value, such as maximum area, maximum revenue or minimum cost.",
      "The quantity being maximised or minimised is called the objective function.",
      "Most optimisation questions require the objective function to be written in one variable before differentiating.",
      "Derivative tests identify candidates, but context and domain restrictions decide whether the answer is valid.",
      "Endpoints can matter in practical domains, especially when a variable is restricted.",
    ],
    latexBlocks: [
      "\\text{objective function}\\rightarrow \\text{differentiate}\\rightarrow \\text{solve }f'(x)=0",
      "f''(a)>0\\Rightarrow \\text{minimum candidate}",
      "f''(a)<0\\Rightarrow \\text{maximum candidate}",
      "\\text{Check domain and units before finalising.}",
    ],
  },
  [
    {
      title: "Maximise area with a fixed perimeter",
      questionLatex:
        "\\text{A rectangle has perimeter }40\\text{ m. Let one side be }x\\text{ m.}",
      steps: [
        { explanation: "The other side is 20 - x.", latex: "A=x(20-x)" },
        { explanation: "Differentiate the area function.", latex: "A'=20-2x" },
        { explanation: "Set the derivative to zero.", latex: "20-2x=0\\Rightarrow x=10" },
      ],
      finalAnswerLatex: "\\text{Maximum area occurs when }x=10\\text{ m}",
    },
    {
      title: "Minimum from a quadratic cost",
      questionLatex: "C(x)=x^2-8x+30",
      steps: [
        { explanation: "Differentiate the cost function.", latex: "C'(x)=2x-8" },
        { explanation: "Set C'(x)=0.", latex: "2x-8=0\\Rightarrow x=4" },
        { explanation: "The second derivative is positive, so this is a minimum.", latex: "C''(x)=2>0" },
      ],
      finalAnswerLatex: "x=4",
    },
    {
      title: "Check a practical domain",
      questionLatex: "P(x)=x(12-x),\\quad 0\\le x\\le 12",
      steps: [
        { explanation: "Differentiate the objective function.", latex: "P'(x)=12-2x" },
        { explanation: "The stationary value is x = 6.", latex: "12-2x=0\\Rightarrow x=6" },
        { explanation: "The candidate lies inside the domain, so it is valid." },
      ],
      finalAnswerLatex: "x=6",
    },
  ],
  [
    appChoice("appdiff-opt-g1", "Which quantity is being optimised?", "\\text{Find the maximum area of a rectangle.}", "A", ["Area", "Perimeter", "Side length only", "Gradient"], "The word maximum describes the area."),
    appNumber("appdiff-opt-g2", "Find the x-value of the stationary point.", "A(x)=x(20-x)", "10"),
    appChoice("appdiff-opt-g3", "Which second derivative result indicates a minimum?", "\\text{Select A, B, C, or D.}", "B", ["$f''(a)<0$", "$f''(a)>0$", "$f'(a)>0$", "$f(a)=0$"], "Positive second derivative indicates a local minimum."),
    appChoice("appdiff-opt-g4", "What should be checked before accepting an optimisation answer?", "\\text{practical context}", "D", ["Only the y-intercept", "Only whether x is an integer", "Only the graph colour", "Domain restrictions and units"], "Context restrictions decide whether the candidate is valid."),
  ],
  [
    appNumber("appdiff-opt-i1", "Find the x-value that maximises the function.", "R(x)=40x-2x^2", "10", [], "Differentiate: R'(x)=40-4x. Set equal to zero: 40-4x=0, so x=10."),
    appNumber("appdiff-opt-i2", "Find the x-value that minimises the function.", "C(x)=x^2-6x+20", "3", [], "Differentiate: C'(x)=2x-6. Set equal to zero: 2x-6=0, so x=3."),
    appChoice("appdiff-opt-i3", "A rectangle has perimeter 30 m and one side x. Which area model is correct?", "\\text{Select A, B, C, or D.}", "C", ["$A=x(30-x)$", "$A=2x(15-x)$", "$A=x(15-x)$", "$A=15x$"], "If perimeter is 30, the sum of adjacent sides is 15."),
    appChoice("appdiff-opt-i4", "A candidate maximum occurs at x = -2, but the domain is x >= 0. What should happen?", "\\text{Select A, B, C, or D.}", "A", ["Reject it as outside the domain", "Accept it automatically", "Change it to positive 2", "Ignore the domain"], "Practical domain restrictions matter."),
    appNumber("appdiff-opt-i5", "Find the maximum value.", "R(x)=12x-x^2", "36", [], "Differentiate: R'(x)=12-2x=0 gives x=6. Substitute back: R(6)=12(6)-36=72-36=36."),
  ],
  [
    { mistake: "Differentiating before forming a one-variable objective function.", fix: "Use constraints to write the objective in one variable first." },
    { mistake: "Ignoring domain restrictions.", fix: "Check whether the stationary candidate is allowed in context." },
    { mistake: "Reporting x when the question asks for the maximum value.", fix: "Substitute the x-value back into the objective function." },
    { mistake: "Assuming every stationary point is a maximum.", fix: "Use the second derivative, sign test or endpoints to classify it." },
  ],
  [
    appNumber("appdiff-opt-m1", "Find the x-value that maximises the function.", "A(x)=x(18-x)", "9"),
    appNumber("appdiff-opt-m2", "Find the minimum value of the function.", "C(x)=x^2-10x+40", "15"),
    appChoice("appdiff-opt-m3", "Which model represents the area?", "\\text{Perimeter }=50,\\text{ adjacent side }=x", "B", ["$A=x(50-x)$", "$A=x(25-x)$", "$A=2x(25-x)$", "$A=25-x$"], "Adjacent sides add to 25."),
    appNumber("appdiff-opt-m4", "Find the x-value of the maximum revenue.", "R(x)=60x-3x^2", "10"),
    appChoice("appdiff-opt-m5", "Which test indicates a local maximum at x = a?", "\\text{Select A, B, C, or D.}", "A", ["$f'(a)=0$ and $f''(a)<0$", "$f'(a)=0$ and $f''(a)>0$", "$f''(a)=0$ only", "$f(a)=0$ only"], "Negative second derivative at a stationary point indicates a local maximum."),
    appChoice("appdiff-opt-m6", "A student finds x = 14 for a length, but the problem states 0 <= x <= 10. Which response is correct?", "\\text{Select A, B, C, or D.}", "C", ["Round x to 10 automatically", "Use x = 14 because calculus found it", "Reject or compare valid endpoints", "Ignore the restriction"], "The candidate is outside the allowed domain."),
    appNumber("appdiff-opt-m7", "Find the maximum area.", "A(x)=x(16-x)", "64"),
    appChoice("appdiff-opt-m8", "A cost function has C'(4)=0 and C''(4)>0. What does x = 4 give?", "\\text{Select A, B, C, or D.}", "B", ["Maximum cost", "Minimum cost", "Point of inflection only", "No useful information"], "Positive second derivative at a stationary point indicates a minimum."),
    appNumber("appdiff-opt-m9", "A product model is P(x)=x(30-2x). Find the x-value that maximises P.", "P(x)=x(30-2x)", "15/2", ["7.5"]),
    appChoice("appdiff-opt-m10", "A revenue model has derivative R'(x)=100-4x on the domain 0 <= x <= 40. Which conclusion is correct?", "\\text{Select A, B, C, or D.}", "D", ["Maximum at x = 0", "Maximum at x = 40", "No maximum exists", "Stationary candidate at x = 25 is inside the domain"], "Solving R'(x)=0 gives x = 25, which is allowed by the domain."),
  ]
);

export const kinematicsRatesChangeLesson = applicationLesson(
  "kinematics-rates-change",
  "Kinematics and Rates of Change",
  "Use derivatives for displacement, velocity, acceleration and motion interpretation.",
  "Apply differentiation to motion problems involving displacement, velocity, acceleration, rest and speed.",
  [
    "Use v(t)=s'(t) for velocity.",
    "Use a(t)=v'(t)=s''(t) for acceleration.",
    "Find when a particle is momentarily at rest.",
    "Distinguish velocity from speed.",
    "Distinguish displacement from total distance in simple cases.",
    "Interpret signs of velocity and acceleration in context.",
  ],
  {
    paragraphs: [
      "Picture a particle sliding along a marked line, like a bead on a wire, with an origin scratched at zero. Its displacement s(t) is just where it sits relative to that origin at time t: positive means to one side, negative means the other, zero means back at the origin. Velocity is the everyday question of how fast that position is changing and which way it is heading. If the bead moves 3 units to the right each second it has velocity +3; if it drifts back toward the origin it has a negative velocity. So before any formula, velocity is speed plus a direction sign.",
      "Why is that velocity the derivative of s(t)? Take a short stretch of time h and measure the change in position, s(t+h) minus s(t), over that stretch. Dividing by h gives the average velocity across the interval, exactly the (change in position)/(change in time) idea from rates of change. Now shrink h toward zero: the interval closes onto the single instant t, and the average velocities settle on one limiting value. That limit is the instantaneous rate of change of position, and by definition it is the derivative s'(t). This is the whole reason v = s'(t): velocity is what average velocity becomes when the time interval collapses to a point.",
      "The graph makes this concrete. Draw the position-time graph, s against t. The velocity at any instant is the slope of that graph, because slope is rise over run and here that is change in position over change in time. A steep upward part of the graph means the particle is moving fast in the positive direction; a downward slope means it is heading back the negative way; a flat spot, where the slope is zero, means it is momentarily at rest. Acceleration asks the next question: how is that slope itself changing? It is the rate of change of velocity, so a = v'(t) = s''(t), and it measures how the position graph bends as the velocity speeds up or eases off.",
      "Two confusions are worth heading off. First, velocity carries a sign but speed does not: speed is the magnitude |v(t)|, so a velocity of -5 and a velocity of +5 are both a speed of 5, just in opposite directions. Second, s(t) = 0 does not mean the particle is at rest; it means the particle is at the origin, which it may be racing through at full speed. At rest is a statement about velocity, v(t) = 0, not about position. Keep direction and being-still tied to v, and position tied to s.",
      "In NSW exam questions you are routinely asked to find when a particle is at rest, which direction it is moving, when it changes direction, and to separate total distance travelled from net displacement, all of which come from reading the signs of v = s'(t) and a = s''(t).",
    ],
    latexBlocks: [
      "v(t)=\\lim_{h\\to 0}\\frac{s(t+h)-s(t)}{h}=s'(t)",
      "a(t)=v'(t)=s''(t)",
      "v(t)=0 \\;\\Rightarrow\\; \\text{momentarily at rest (slope of }s\\text{-}t\\text{ graph is zero)}",
      "\\text{speed}=|v(t)|,\\qquad \\text{displacement}=s(b)-s(a)",
    ],
  },
  [
    {
      title: "Velocity, acceleration and when the particle reverses",
      questionLatex: "s(t)=t^3-6t^2+9t,\\quad t\\ge 0",
      steps: [
        {
          explanation:
            "Velocity is the slope of the position-time graph, which is the derivative of s(t). Differentiate and factorise so the zeros are visible.",
          latex: "v(t)=s'(t)=3t^2-12t+9=3(t-1)(t-3)",
        },
        {
          explanation:
            "The particle is momentarily at rest where the slope is zero, so set v(t)=0. Two rest times drop out.",
          latex: "3(t-1)(t-3)=0 \\;\\Rightarrow\\; t=1 \\text{ or } t=3",
        },
        {
          explanation:
            "Read the sign of v to get direction. At t=0, v=9>0 so it starts moving in the positive direction; just after t=1, v is negative, so at t=1 the particle stops and reverses back toward the origin.",
          latex: "v(0)=9>0,\\quad v(2)=3(1)(-1)=-3<0",
        },
        {
          explanation:
            "Acceleration is the rate of change of velocity, the second derivative. Its sign tells you whether the velocity is rising or falling at an instant.",
          latex: "a(t)=v'(t)=s''(t)=6t-12",
        },
      ],
      finalAnswerLatex:
        "v(t)=3(t-1)(t-3),\\; a(t)=6t-12;\\; \\text{at rest and reversing at }t=1\\text{ and }t=3",
    },
    {
      title: "Interpreting the signs of velocity and acceleration",
      questionLatex: "v(t)=2t-8,\\quad \\text{describe the motion.}",
      steps: [
        {
          explanation:
            "Find where the velocity is zero, since that is the instant the particle is momentarily at rest.",
          latex: "2t-8=0 \\;\\Rightarrow\\; t=4",
        },
        {
          explanation:
            "Before t=4 the velocity is negative, so the particle is moving in the negative direction; after t=4 it is positive. So at t=4 the particle stops and reverses direction.",
          latex: "v(3)=-2<0,\\qquad v(5)=2>0",
        },
        {
          explanation:
            "At t=3 the velocity is -2, so its speed is the magnitude |-2|=2: it is moving at 2 units/s in the negative direction. The sign is direction, the magnitude is speed.",
          latex: "\\text{speed at }t=3=|v(3)|=2",
        },
        {
          explanation:
            "Acceleration is the derivative of velocity. It is a constant +2, meaning the velocity keeps increasing at 2 units/s each second, which is why the particle slows, stops, then speeds up the other way.",
          latex: "a(t)=v'(t)=2>0",
        },
      ],
      finalAnswerLatex:
        "\\text{At rest and reversing at }t=4;\\; a(t)=2>0\\text{ throughout}",
    },
    {
      title: "Total distance travelled versus displacement",
      questionLatex: "s(t)=t^2-4t,\\quad \\text{find displacement and distance for }0\\le t\\le 3.",
      steps: [
        {
          explanation:
            "Displacement is the net change in position, end minus start, so evaluate s at the two ends of the interval.",
          latex: "s(0)=0,\\quad s(3)=9-12=-3 \\;\\Rightarrow\\; \\text{displacement}=-3",
        },
        {
          explanation:
            "Distance can differ from displacement only if the particle turns around, so check for a rest point inside the interval by setting v(t)=0.",
          latex: "v(t)=2t-4=0 \\;\\Rightarrow\\; t=2 \\;(\\text{inside }0\\le t\\le 3)",
        },
        {
          explanation:
            "The particle reverses at t=2, so split the journey there and find the position at the turning point.",
          latex: "s(2)=4-8=-4",
        },
        {
          explanation:
            "Add the lengths of each leg as positive distances: from 0 to -4 is 4 units, from -4 to -3 is 1 unit. Total distance counts both, while displacement was only the net -3.",
          latex: "\\text{distance}=|-4-0|+|-3-(-4)|=4+1=5",
        },
      ],
      finalAnswerLatex:
        "\\text{displacement}=-3\\text{ units},\\quad \\text{total distance}=5\\text{ units}",
    },
  ],
  [
    appChoice("appdiff-kin-g1", "Which derivative gives velocity?", "s(t)\\text{ is displacement}", "A", ["$s'(t)$", "$s''(t)$", "$s(t)^2$", "$\\frac{1}{s(t)}$"], "Velocity is the derivative of displacement."),
    appChoice("appdiff-kin-g2", "Which derivative gives acceleration?", "s(t)\\text{ is displacement}", "C", ["$s'(t)$ only", "$s(t)$", "$s''(t)$", "$\\ln s(t)$"], "Acceleration is the second derivative of displacement."),
    appNumber("appdiff-kin-g3", "Find the time when the particle is at rest.", "v(t)=3t-12", "4"),
    appNumber("appdiff-kin-g4", "Find the speed when the velocity is -7 m/s.", "v=-7", "7", ["7 m/s"]),
  ],
  [
    appNumber("appdiff-kin-i1", "Find v(2).", "s(t)=t^2+3t", "7"),
    appNumber("appdiff-kin-i2", "Find a(3).", "v(t)=4t-5", "4"),
    appChoice("appdiff-kin-i3", "A velocity of -6 m/s means:", "\\text{Select A, B, C, or D.}", "B", ["Speed is -6 m/s", "Speed is 6 m/s with negative direction for velocity", "The particle is at rest", "Acceleration is negative"], "Speed is the magnitude of velocity."),
    appNumber("appdiff-kin-i4", "Find the displacement from t = 0 to t = 3.", "s(0)=2,\\quad s(3)=11", "9"),
    appChoice("appdiff-kin-i5", "Which condition means the particle is momentarily at rest?", "\\text{Select A, B, C, or D.}", "A", ["$v(t)=0$", "$s(t)=0$", "$a(t)=0$", "$t=0$"], "At rest means zero velocity."),
  ],
  [
    { mistake: "Confusing velocity and speed.", fix: "Velocity carries a direction sign; speed is the magnitude |v(t)|, so v=-5 and v=+5 are both a speed of 5." },
    { mistake: "Using displacement when total distance is required.", fix: "Displacement is the net change s(b)-s(a); for distance, split the interval wherever v(t)=0 and add the leg lengths as positive amounts." },
    { mistake: "Finding acceleration from displacement without differentiating twice.", fix: "Acceleration is the rate of change of velocity, so differentiate twice: a(t)=v'(t)=s''(t)." },
    { mistake: "Thinking s(t)=0 means the particle is at rest.", fix: "s(t)=0 only means the particle is at the origin, possibly passing through at speed; at rest is a statement about velocity, v(t)=0." },
  ],
  [
    appNumber("appdiff-kin-m1", "Find the first time the particle comes to rest.", "v(t)=t^2-5t+4", "1", [], "Set v(t)=0: (t-1)(t-4)=0 gives t=1 and t=4. The first rest time is t=1."),
    appNumber("appdiff-kin-m2", "Find a(2).", "s(t)=t^3", "12", [], "Differentiate twice: v(t)=3t^2, a(t)=6t. Substitute t=2: a(2)=6(2)=12."),
    appNumber("appdiff-kin-m3", "Find when the particle is at rest.", "v(t)=5t-20", "4", [], "The particle is at rest when v(t)=0. Solve: 5t-20=0, so t=4."),
    appChoice("appdiff-kin-m4", "Which statement correctly compares speed and velocity?", "\\text{Select A, B, C, or D.}", "D", ["Speed can be negative", "Velocity is always positive", "Speed includes direction", "Speed is the magnitude of velocity"], "Speed is |v|."),
    appNumber("appdiff-kin-m5", "Find the displacement over the interval.", "s(1)=4,\\quad s(5)=19", "15", [], "Displacement equals the change in position: s(5)-s(1)=19-4=15."),
    appChoice("appdiff-kin-m6", "If v(t) changes sign from positive to negative, what has happened?", "\\text{Select A, B, C, or D.}", "B", ["Acceleration is zero forever", "The particle changes direction", "Displacement must be zero", "Speed becomes negative"], "A sign change in velocity indicates a change of direction."),
    appNumber("appdiff-kin-m7", "Find the speed when v(2) = -9.", "v(2)=-9", "9", [], "Speed is the magnitude of velocity: |v(2)|=|-9|=9."),
    appNumber("appdiff-kin-m8", "Find a(0).", "v(t)=3t^2-6t+1", "-6"),
    appChoice("appdiff-kin-m9", "A particle moves from s=0 to s=5, then back to s=2. What is true?", "\\text{Select A, B, C, or D.}", "A", ["Distance travelled is greater than displacement", "Distance travelled equals 2", "Displacement equals 5", "Velocity is always positive"], "The particle travels 5 units forward and 3 units back, while displacement is 2."),
    appChoice("appdiff-kin-m10", "For s(t)=t^3-6t^2+9t, which rest times are correct?", "\\text{Select A, B, C, or D.}", "C", ["$t=0,2$", "$t=2$", "$t=1,3$", "$t=3,9$"], "Velocity is 3t^2 - 12t + 9, which is zero at t = 1 and t = 3."),
  ]
);

export const applicationsDifferentiationExamPracticeLesson = applicationLesson(
  "applications-differentiation-exam-practice",
  "Applications of Differentiation Exam Practice",
  "Practise mixed HSC-style applications involving concavity, stationary points, curve sketching, optimisation and motion.",
  "Select and apply the right differentiation application method in mixed HSC-style contexts.",
  [
    "Interpret first and second derivative information.",
    "Classify stationary points using derivative tests.",
    "Identify graph behaviour from derivative sign charts.",
    "Solve optimisation questions with domain awareness.",
    "Use velocity and acceleration relationships in motion contexts.",
    "Avoid overclaiming from incomplete derivative information.",
  ],
  {
    paragraphs: [
      "Mixed applications questions require careful identification of what the derivative information represents.",
      "The first derivative describes gradient, increasing/decreasing behaviour, velocity and stationary points.",
      "The second derivative describes concavity, acceleration and the second derivative test.",
      "Optimisation questions require an objective function, a derivative condition and a context check.",
      "Curve sketching questions in this course use descriptions and feature matching instead of drawn responses.",
    ],
    latexBlocks: [
      "f'(x)=0\\Rightarrow \\text{stationary candidate}",
      "f''(x)>0\\Rightarrow \\text{concave up or local minimum at a stationary point}",
      "f''(x)<0\\Rightarrow \\text{concave down or local maximum at a stationary point}",
      "v(t)=s'(t),\\quad a(t)=s''(t)",
    ],
  },
  [
    {
      title: "Mixed stationary and concavity information",
      questionLatex: "f'(2)=0,\\quad f''(2)<0",
      steps: [
        { explanation: "The first derivative is zero, so x = 2 is stationary." },
        { explanation: "The second derivative is negative, so the graph is concave down there." },
      ],
      finalAnswerLatex: "\\text{Local maximum}",
    },
    {
      title: "Optimisation candidate",
      questionLatex: "P(x)=20x-x^2",
      steps: [
        { explanation: "Differentiate the objective function.", latex: "P'(x)=20-2x" },
        { explanation: "Set the derivative equal to zero.", latex: "20-2x=0\\Rightarrow x=10" },
        { explanation: "Substitute to find the maximum value if needed.", latex: "P(10)=100" },
      ],
      finalAnswerLatex: "x=10,\\quad P_{\\max}=100",
    },
    {
      title: "Motion interpretation",
      questionLatex: "v(4)=0,\\quad a(4)<0",
      steps: [
        { explanation: "The velocity is zero, so the particle is momentarily at rest." },
        { explanation: "The negative acceleration describes how velocity is changing at that instant." },
      ],
      finalAnswerLatex: "\\text{Momentarily at rest with negative acceleration}",
    },
  ],
  [
    appChoice("appdiff-exam-g1", "Classify the stationary point.", "f'(1)=0,\\quad f''(1)>0", "B", ["Local maximum", "Local minimum", "No stationary point", "Endpoint only"], "Positive second derivative gives a local minimum."),
    appNumber("appdiff-exam-g2", "Find the possible inflection x-value.", "f''(x)=2x-6", "3"),
    appChoice("appdiff-exam-g3", "Which condition means a particle is at rest?", "\\text{Select A, B, C, or D.}", "A", ["$v(t)=0$", "$s(t)=0$", "$a(t)=0$", "$f''(t)=0$ only"], "At rest means zero velocity."),
    appNumber("appdiff-exam-g4", "Find the x-value that maximises the objective.", "P(x)=16x-x^2", "8"),
  ],
  [
    appChoice("appdiff-exam-i1", "Use the sign chart to classify x = 2.", "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&+&0&-\\end{array}", "A", ["Local maximum", "Local minimum", "Stationary point of inflection", "No stationary point"], "The derivative changes from positive to negative."),
    appChoice("appdiff-exam-i2", "Which graph behaviour matches f''(x)<0?", "\\text{Select A, B, C, or D.}", "B", ["Concave up", "Concave down", "Increasing", "Stationary"], "Negative second derivative means concave down."),
    appNumber("appdiff-exam-i3", "Find v(2).", "s(t)=2t^2-3t", "5"),
    appChoice("appdiff-exam-i4", "Which optimisation step is missing if a student differentiates a two-variable area formula immediately?", "\\text{Select A, B, C, or D.}", "C", ["Taking a second derivative first", "Drawing a graph", "Using the constraint to get one variable", "Changing all variables to time"], "Optimisation usually needs a one-variable objective function."),
    appNumber("appdiff-exam-i5", "Find the minimum x-value candidate.", "C'(x)=2x-14", "7"),
  ],
  [
    { mistake: "Using the wrong derivative for the feature requested.", fix: "Match f' to gradient and f'' to concavity or acceleration." },
    { mistake: "Assuming f''=0 confirms inflection.", fix: "Check for concavity change." },
    { mistake: "Ignoring context in optimisation.", fix: "Check domain, units and whether the question asks for x or the optimal value." },
    { mistake: "Confusing rest with being at the origin.", fix: "Rest means velocity is zero, not displacement is zero." },
  ],
  [
    appChoice("appdiff-exam-m1", "Classify the stationary point.", "f'(4)=0,\\quad f''(4)<0", "A", ["Local maximum", "Local minimum", "Inconclusive", "No stationary point"], "Negative second derivative at a stationary point gives a local maximum."),
    appChoice("appdiff-exam-m2", "Does this confirm a point of inflection?", "\\begin{array}{c|ccc}x&x<-2&-2&x>-2\\\\\\hline f''(x)&+&0&+\\end{array}", "B", ["Yes", "No", "Only if f'(-2)=0", "Only if f(-2)=0"], "There is no concavity change."),
    appNumber("appdiff-exam-m3", "Find the x-value that maximises the function.", "R(x)=24x-2x^2", "6"),
    appChoice("appdiff-exam-m4", "Which graph description matches the sign information?", "\\begin{array}{c|cc}x&x<1&x>1\\\\\\hline f'(x)&+&-\\\\f''(x)&-&-\\end{array}", "C", ["Increasing then decreasing, concave up", "Decreasing then increasing, concave down", "Increasing then decreasing, concave down", "Increasing everywhere, concave down"], "f' changes from positive to negative and f'' is negative."),
    appNumber("appdiff-exam-m5", "Find a(3).", "s(t)=t^3-3t^2", "12"),
    appChoice("appdiff-exam-m6", "A particle has v(t)<0. Which statement about speed is correct?", "\\text{Select A, B, C, or D.}", "D", ["Speed is negative", "Speed is zero", "Speed equals acceleration", "Speed is the positive magnitude of velocity"], "Speed is |v(t)|."),
    appChoice("appdiff-exam-m7", "A candidate optimum lies outside the stated domain. What is the correct response?", "\\text{Select A, B, C, or D.}", "A", ["Reject it or compare valid endpoints", "Always accept it", "Change its sign", "Ignore the objective function"], "The domain controls which values are allowed."),
    appChoice("appdiff-exam-m8", "Which conclusion follows from f'(2)=0 and f''(2)=0?", "\\text{Select A, B, C, or D.}", "D", ["Local maximum", "Local minimum", "No stationary point", "More testing is required"], "The second derivative test is inconclusive."),
    appChoice("appdiff-exam-m9", "A curve has f'(x)<0 and f''(x)>0 on an interval. Which description fits?", "\\text{Select A, B, C, or D.}", "B", ["Increasing and concave down", "Decreasing and concave up", "Increasing and concave up", "Decreasing and concave down"], "Negative f' means decreasing and positive f'' means concave up."),
    appChoice("appdiff-exam-m10", "A motion question asks for total distance after a change of direction. Which approach is correct?", "\\text{Select A, B, C, or D.}", "D", ["Use final displacement only", "Use acceleration only", "Ignore the turn", "Split at rest times and add absolute changes in position"], "Total distance must include each part of the journey, especially after direction changes."),
  ]
);

export const applicationsDifferentiationLessons = [
  secondDerivativeConcavityLesson,
  stationaryPointClassificationLesson,
  curveSketchingCalculusLesson,
  // "Optimisation" (optimisationLesson in this file) is intentionally omitted: it shared
  // id/slug "optimisation" with optimisationLesson in differentialCalculus.ts
  // ("Optimisation Problems"), which routing resolves first, so this copy was unreachable
  // dead content. The live optimisation lesson is the one in differentialCalculus.ts.
  kinematicsRatesChangeLesson,
  applicationsDifferentiationExamPracticeLesson,
];

export const applicationsDifferentiationOutline: LessonOutlineItem[] =
  applicationsDifferentiationLessons.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    status: item.status,
  }));
