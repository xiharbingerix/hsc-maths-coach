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
      "You already know the first derivative $f'(x)$ measures the gradient — how fast the function is rising or falling. The second derivative $f''(x)$ is simply the derivative of that: it measures how fast the gradient itself is changing. If you think of $f(x)$ as position and $f'(x)$ as velocity, then $f''(x)$ is the acceleration of the curve. Nothing new has been invented; you have just differentiated twice.",
      "Picture driving along a winding road. Concavity is about which way the road is bending, not whether you are going up or down. A road bending to make a valley — a smile shape, $\\cup$ — is concave up. A road bending to make a hill — a frown shape, $\\cap$ — is concave down. The key insight is that a $\\cup$ shape has a gradient that is increasing as you move right (it goes from steeply falling, to flat, to steeply rising), while a $\\cap$ shape has a gradient that is decreasing.",
      "That is exactly why the sign of $f''(x)$ tells you the concavity. If $f''(x)>0$ on an interval, then $f'(x)$ is increasing there — the gradient is climbing, so the curve curls upward into a $\\cup$ and is concave up. If $f''(x)<0$, then $f'(x)$ is decreasing — the gradient is falling away, so the curve curls downward into a $\\cap$ and is concave down. You are not memorising a rule; you are reading off whether the gradient is rising or falling.",
      "This is also where the most common confusion is dissolved. Concave up does not mean increasing. A curve can be falling steeply and still be concave up, as long as it is falling less and less steeply (its gradient, though negative, is rising toward zero). Increasing/decreasing is about the sign of $f'$; concave up/down is about the sign of $f''$. They are independent: a curve can be increasing-and-concave-down (rising but levelling off) or decreasing-and-concave-up (falling but flattening out).",
      "A point of inflection is a point where the concavity actually changes — where the road switches from bending one way to bending the other, from $\\cup$ to $\\cap$ or from $\\cap$ to $\\cup$. Since concavity is governed by the sign of $f''$, an inflection requires the sign of $f''$ to flip. The natural place to look is where $f''(x)=0$ (or where $f''$ is undefined), because a continuous quantity can only change sign by passing through zero.",
      "But — and this is the trap — $f''(x)=0$ on its own is not enough. It only tells you the curvature has momentarily flattened; the curve might curl right back the same way. The classic counterexample is $f(x)=x^4$. Here $f''(x)=12x^2$, which is zero at $x=0$, yet $12x^2$ is positive on both sides of $0$. The concavity stays up the whole time, so there is no inflection at the origin even though $f''=0$ there. The rule is: find where $f''=0$, then confirm $f''$ genuinely changes sign across that point.",
      "In context, the second derivative carries real meaning. If $P(x)$ is profit, $P'(x)$ is the marginal profit (extra profit per extra unit) and $P''(x)<0$ tells you that marginal profit is shrinking — each additional unit adds less than the last, even while total profit may still be rising. In exam questions this is the difference between a Band 4 answer ('profit is going down') and a Band 6 answer ('the rate at which profit grows is going down'). Read the second derivative as a statement about the rate, not the quantity.",
    ],
    latexBlocks: [
      "f''(x)=\\frac{d}{dx}\\big(f'(x)\\big)\\quad\\text{(rate of change of the gradient)}",
      "f''(x)>0\\Rightarrow f'\\text{ increasing}\\Rightarrow \\text{concave up }(\\cup)",
      "f''(x)<0\\Rightarrow f'\\text{ decreasing}\\Rightarrow \\text{concave down }(\\cap)",
      "\\text{point of inflection}\\Rightarrow f''=0\\text{ (or undefined) }\\textbf{and}\\text{ }f''\\text{ changes sign}",
    ],
  },
  [
    {
      title: "Concavity from a second derivative",
      questionLatex: "f''(x)=6x-12",
      steps: [
        { explanation: "An inflection can only occur where the curvature flattens, so first find where the second derivative is zero.", latex: "6x-12=0\\Rightarrow x=2" },
        { explanation: "Zero is not enough on its own — test a point on each side to see if the sign of f'' actually flips.", latex: "f''(1)=-6<0,\\quad f''(3)=6>0" },
        { explanation: "Negative then positive means the curve goes from concave down to concave up, so the concavity genuinely changes here.", latex: "\\cap\\ \\to\\ \\cup\\ \\text{at }x=2" },
      ],
      finalAnswerLatex: "\\text{Point of inflection at }x=2",
    },
    {
      title: "No inflection despite f''(x) = 0",
      questionLatex: "f(x)=x^4",
      steps: [
        { explanation: "Differentiate twice to get the concavity information.", latex: "f'(x)=4x^3,\\quad f''(x)=12x^2" },
        { explanation: "Solve f''=0 to find the candidate point where curvature flattens.", latex: "12x^2=0\\Rightarrow x=0" },
        { explanation: "Now test the sign on each side: 12x^2 is a square, so it is positive at x=-1 and at x=1. The sign does NOT flip — the curve stays concave up throughout.", latex: "f''(-1)=12>0,\\quad f''(1)=12>0" },
        { explanation: "Because there is no sign change, the f''=0 condition has failed the confirmation test, so there is no inflection." },
      ],
      finalAnswerLatex: "\\text{No point of inflection at }x=0\\ \\text{(}f''\\text{ does not change sign)}",
    },
    {
      title: "Concavity from a sign chart",
      questionLatex:
        "\\begin{array}{c|ccc}x&(-\\infty,1)&1&(1,\\infty)\\\\\\hline f''(x)&+&0&-\\end{array}",
      steps: [
        { explanation: "Read the chart to the left of x=1: f'' is positive, so the gradient is increasing and the curve is concave up.", latex: "f''>0\\Rightarrow \\cup" },
        { explanation: "Read it to the right of x=1: f'' is negative, so the gradient is decreasing and the curve is concave down.", latex: "f''<0\\Rightarrow \\cap" },
        { explanation: "The sign of f'' flips from + to 0 to -, so the concavity genuinely changes — this confirms a point of inflection at x=1." },
      ],
      finalAnswerLatex: "\\text{Concave up then concave down; point of inflection at }x=1",
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
    { mistake: "Confusing concave up with increasing.", fix: "Concavity describes how the gradient changes, not whether the function rises." },
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
      "A stationary point is a place where the curve momentarily stops rising or falling — the tangent is horizontal, so the gradient is zero. Algebraically that means $f'(a)=0$. But knowing the curve is flat at $x=a$ does not tell you what kind of flat: you could be at the bottom of a valley (a local minimum), the top of a hill (a local maximum), or on a flat shelf where the curve pauses and then carries on the same direction (a stationary point of inflection). Classifying the point means deciding which of these it is.",
      "The first idea is to watch what the gradient does either side of the point. Approaching a hilltop, the curve is rising ($f'>0$), flattens at the top ($f'=0$), then falls ($f'<0$) — so the gradient runs $+,\\,0,\\,-$. Approaching a valley floor it is the mirror image: falling, flat, then rising, so $-,\\,0,\\,+$. This is the first-derivative sign test, and it always works because it directly checks the shape of the curve through the point.",
      "There is a faster route when you are willing to compute the second derivative. Recall $f''$ measures concavity. At the bottom of a valley the curve must be concave up — a $\\cup$ — so $f''(a)>0$. At the top of a hill the curve must be concave down — a $\\cap$ — so $f''(a)<0$. So once you know the point is stationary, the sign of $f''$ alone settles it: positive means a $\\cup$ holding a minimum, negative means a $\\cap$ holding a maximum. This is the second-derivative test, and it is just the concavity idea applied at a flat point.",
      "It pays to see why the test works rather than memorise 'positive is minimum'. Think of $f'$ as a function in its own right. At a stationary point $f'(a)=0$. If $f''(a)>0$ then $f'$ is increasing through that zero, so $f'$ runs from negative (curve falling) up through $0$ to positive (curve rising) — falling then rising is exactly a minimum. If $f''(a)<0$ then $f'$ is decreasing through its zero, running positive to negative — rising then falling, a maximum. The second-derivative test is really the first-derivative sign test in disguise.",
      "That reasoning also exposes the test's blind spot. If $f''(a)=0$, then $f'$ is neither clearly increasing nor decreasing at $a$, and the test gives no verdict — it is inconclusive, not a statement that no stationary point exists. The point might still be a max, a min, or a shelf-like stationary point of inflection. The classic case is $f(x)=x^3$: here $f'(0)=0$ and $f''(0)=0$, and checking $f'=3x^2$ shows the gradient is positive on both sides, so the curve pauses but keeps rising — a stationary point of inflection. When $f''=0$, fall back on the first-derivative sign test.",
      "So the working method is: solve $f'(x)=0$ to find candidate points; then either compute $f''$ at each (quickest when it is clearly non-zero) or test the sign of $f'$ on both sides. Keep maximum/minimum (properties of a single point) distinct from increasing/decreasing (properties of an interval) — a common slip is to say 'the function has a maximum on this interval' when you mean it is decreasing there. In exams, state which test you used and show the sign evidence; an unjustified 'it's a minimum' will not earn the reasoning mark.",
    ],
    latexBlocks: [
      "f'(a)=0\\Rightarrow \\text{stationary point (candidate to classify)}",
      "f''(a)>0\\Rightarrow \\text{concave up }(\\cup)\\Rightarrow \\text{local minimum}",
      "f''(a)<0\\Rightarrow \\text{concave down }(\\cap)\\Rightarrow \\text{local maximum}",
      "f''(a)=0\\Rightarrow \\text{test inconclusive: use the sign of }f'\\text{ on each side}",
    ],
  },
  [
    {
      title: "Classify using the second derivative",
      questionLatex: "f'(2)=0,\\quad f''(2)=5",
      steps: [
        { explanation: "f'(2)=0 means the tangent is horizontal, so x=2 is a stationary point and we are entitled to classify it." },
        { explanation: "Check the sign of the second derivative — it is positive, so the curve is concave up (a cup shape) at x=2.", latex: "f''(2)=5>0\\Rightarrow \\cup" },
        { explanation: "A flat point sitting inside a cup is the bottom of a valley, so this is a local minimum." },
      ],
      finalAnswerLatex: "\\text{Local minimum at }x=2",
    },
    {
      title: "Second derivative test is inconclusive",
      questionLatex: "f'(0)=0,\\quad f''(0)=0",
      steps: [
        { explanation: "f'(0)=0 confirms x=0 is a stationary point, so there IS a flat point to classify." },
        { explanation: "But f''(0)=0 means the concavity is momentarily flat too — the second-derivative test gives no verdict, so we cannot conclude max or min from it.", latex: "f''(0)=0\\Rightarrow \\text{no sign to read}" },
        { explanation: "Inconclusive does not mean 'no stationary point' — it means switch tools. Check the sign of f' just left and just right of 0 to see whether the curve turns or merely pauses." },
      ],
      finalAnswerLatex: "\\text{Stationary point, but second-derivative test is inconclusive — use the sign of }f'",
    },
    {
      title: "Classify from first derivative signs",
      questionLatex:
        "\\begin{array}{c|ccc}x&x<1&1&x>1\\\\\\hline f'(x)&+&0&-\\end{array}",
      steps: [
        { explanation: "Read the gradient signs across x=1: positive, then zero, then negative.", latex: "+,\\ 0,\\ -" },
        { explanation: "A positive gradient means the curve is rising and a negative gradient means it is falling, so the curve rises up to x=1 then falls away." },
        { explanation: "Rising-then-falling with a flat top is exactly the shape of a hill, so x=1 is a local maximum — no need for f'' here." },
      ],
      finalAnswerLatex: "\\text{Local maximum at }x=1",
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
    { mistake: "Assuming f''(a)=0 means no stationary point.", fix: "The point may still be stationary; the second derivative test is just inconclusive." },
    { mistake: "Confusing maximum/minimum with increasing/decreasing.", fix: "Maximum/minimum describes a point; increasing/decreasing describes intervals." },
    { mistake: "Classifying a point before checking f'(a)=0.", fix: "Confirm the point is stationary first." },
    { mistake: "Ignoring the first derivative sign test.", fix: "Use f' signs when the second derivative test is inconclusive." },
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
      "Sketching a curve from calculus is like assembling a portrait from several clues. No single calculation gives you the shape; instead each tool reports on one feature, and the picture only becomes definite when you combine them. The skill being built here is not 'find the derivative' — you can already do that — but knowing which feature each piece of information pins down, and reading them together without contradiction.",
      "Start with the skeleton: the intercepts. The y-intercept is just $f(0)$, the height where the curve crosses the vertical axis. The x-intercepts are the solutions of $f(x)=0$, the places where the curve touches or crosses the horizontal axis. These anchor the curve in the plane before you worry about its bends.",
      "The first derivative supplies the up-and-down information. Where $f'(x)>0$ the gradient is positive, so the curve is rising as you move right (increasing); where $f'(x)<0$ it is falling (decreasing). The handover points, where $f'(x)=0$, are the stationary points you already know how to classify — a sign change of $f'$ from $+$ to $-$ marks a local maximum, and from $-$ to $+$ a local minimum.",
      "The second derivative supplies the bending information, which is independent of up-and-down. Where $f''(x)>0$ the curve is concave up, holding water like a $\\cup$; where $f''(x)<0$ it is concave down, shedding water like a $\\cap$. A place where $f''$ changes sign is a point of inflection, where the curve switches its bend. Crucially this is separate from rising/falling: a curve can be increasing and concave down (rising but levelling off) or decreasing and concave up (falling but flattening), so you must track both signs at once.",
      "The reason you combine them is that any one clue alone is ambiguous. Knowing only that there is a local maximum tells you nothing about whether the curve has crossed the x-axis or which way it ends; knowing only the concavity tells you nothing about height. A single isolated derivative value — say $f'(3)=2$ — is the weakest clue of all, because it describes the curve at one instant and says nothing about the rest. A defensible sketch is the one description consistent with the intercepts, the stationary points and their nature, the increasing/decreasing intervals, and the concavity simultaneously.",
      "In this digital course the curve-sketching questions are posed as descriptions and multiple-choice feature matching rather than freehand drawing, but the reasoning is identical to a paper sketch — and arguably more demanding, because you must hold the features in your head and reject any option that violates even one of them. The exam-transfer point is this: the marker rewards a sketch whose every part agrees with the calculus, so always cross-check a candidate description against every clue before committing to it.",
    ],
    latexBlocks: [
      "\\text{y-intercept }=f(0);\\quad \\text{x-intercepts solve }f(x)=0",
      "f'(x)>0\\Rightarrow \\text{increasing};\\quad f'(x)<0\\Rightarrow \\text{decreasing}",
      "f''(x)>0\\Rightarrow \\text{concave up }(\\cup);\\quad f''(x)<0\\Rightarrow \\text{concave down }(\\cap)",
      "\\text{a defensible sketch agrees with }\\textbf{every}\\text{ clue at once}",
    ],
  },
  [
    {
      title: "Read a derivative sign chart",
      questionLatex:
        "\\begin{array}{c|ccc}x&x<1&1&x>1\\\\\\hline f'(x)&+&0&-\\end{array}",
      steps: [
        { explanation: "Left of x=1 the gradient is positive, so the curve is rising as it approaches the point.", latex: "f'>0\\Rightarrow \\text{increasing}" },
        { explanation: "Right of x=1 the gradient is negative, so the curve falls away after the point.", latex: "f'<0\\Rightarrow \\text{decreasing}" },
        { explanation: "Rising up to a flat point and then falling is the shape of a hilltop, so the sign change + to - identifies a local maximum at x=1." },
      ],
      finalAnswerLatex: "\\text{Local maximum at }x=1",
    },
    {
      title: "Match concavity and stationary information",
      questionLatex: "f'(2)=0,\\quad f''(2)>0",
      steps: [
        { explanation: "f'(2)=0 fixes the horizontal location: x=2 is a stationary point." },
        { explanation: "f''(2)>0 fixes the bend: the curve is concave up, a cup, at that point.", latex: "f''(2)>0\\Rightarrow \\cup" },
        { explanation: "Combining the two clues, a flat point at the bottom of a cup is a valley floor, so this is a local minimum." },
      ],
      finalAnswerLatex: "\\text{Local minimum at }x=2",
    },
    {
      title: "Combine features",
      questionLatex:
        "\\text{A graph has x-intercepts }-1\\text{ and }3,\\text{ a local maximum at }x=0,\\text{ and is concave down near }x=0.",
      steps: [
        { explanation: "Place the skeleton first: the curve meets the x-axis at x=-1 and x=3, fixing two anchor points.", latex: "f(-1)=0,\\quad f(3)=0" },
        { explanation: "The local maximum at x=0 sits between those intercepts, so the curve rises to a peak there and turns back down." },
        { explanation: "Check the bend is consistent: concave down near x=0 is the cap shape a maximum must have, so the clues agree rather than conflict.", latex: "f''<0\\Rightarrow \\cap" },
        { explanation: "Choose the description that satisfies all three features together — intercepts at -1 and 3, a peak at x=0, and a cap shape there — and reject any option that violates even one." },
      ],
      finalAnswerLatex: "\\text{The description with x-intercepts }-1,3,\\text{ a peak at }x=0,\\text{ and concave down there.}",
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
    { mistake: "Confusing concave down with decreasing.", fix: "Concavity describes gradient change, while decreasing describes gradient sign." },
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
      "Optimisation is the art of finding the best possible value in a real situation — the largest area you can fence with a fixed length of wire, the price that brings in the most revenue, the can shape that uses the least metal. The mathematics is the same stationary-point machinery you have already met, but now the function does not arrive ready-made. The hard, mark-earning part is translating the words into a function to differentiate, and then deciding which answer the context actually allows.",
      "The quantity you are trying to make as large or as small as possible is called the objective function — it is the 'thing' the question optimises. Your first job is always to write it down. 'Maximum area' means the objective is area; 'minimum cost' means the objective is cost. Name it, give it a letter, and you have a target to aim the calculus at.",
      "Here is the obstacle that makes optimisation harder than ordinary curve work: the objective usually starts out depending on two quantities, and you can only differentiate a function of one variable. A rectangle's area $A=xy$ has both $x$ and $y$ in it. The way through is the constraint — the fixed condition in the problem. If the perimeter is $40$, then $2x+2y=40$, so $y=20-x$, and substituting gives $A=x(20-x)$, a function of $x$ alone. This step — use the constraint to eliminate one variable — is the heart of every optimisation question, and skipping it is the most common reason a solution collapses.",
      "Once the objective is in one variable, the calculus is familiar. A maximum or minimum of a smooth function occurs where the curve is momentarily flat, so solve $f'(x)=0$ to find the candidate values. Then confirm the nature of each candidate exactly as you would any stationary point: $f''<0$ means a $\\cap$, a maximum; $f''>0$ means a $\\cup$, a minimum. Confirming the nature matters — do not just assume the stationary point you found is the maximum the question wanted; a sign check or the second-derivative test is what justifies the claim.",
      "Then comes the step beginners forget: the domain. A side length cannot be negative, a number of items must be a whole positive count, $x$ in $A=x(20-x)$ only makes physical sense for $0\\le x\\le 20$. Calculus may hand you a stationary value, but if it falls outside the allowed range you must reject it. And on a closed practical domain the extreme value can occur at an endpoint rather than at a stationary point — so when the question restricts the variable, compare the value at the stationary point against the values at the endpoints, and take the genuine best of those.",
      "Finally, answer the question that was asked. If it wants the maximum area, the value $x=10$ is not the answer — you must substitute back to get $A=10\\times10=100$. Reporting the $x$-value when the optimal quantity was requested is a frequent and costly slip. Carry the units through too: '$100$ square metres', not bare '$100$'.",
      "So the full procedure, which transfers to any unfamiliar context, is: identify the objective, use the constraint to write it in one variable, note the domain, solve $f'(x)=0$, confirm the nature of each candidate, check candidates against the endpoints, then substitute back and state the answer with units. Memorise the shape of this routine, not any one example — exam optimisation questions deliberately dress it in unfamiliar scenarios.",
    ],
    latexBlocks: [
      "\\text{objective in two variables}\\xrightarrow{\\text{constraint}}\\text{one variable}\\rightarrow\\text{solve }f'(x)=0",
      "f''(a)<0\\Rightarrow \\cap\\Rightarrow \\text{maximum};\\quad f''(a)>0\\Rightarrow \\cup\\Rightarrow \\text{minimum}",
      "\\text{reject candidates outside the domain; check the endpoints on a closed domain}",
      "\\text{substitute the optimal }x\\text{ back into the objective; state the value with units}",
    ],
  },
  [
    {
      title: "Maximise area with a fixed perimeter",
      questionLatex:
        "\\text{A rectangle has perimeter }40\\text{ m. Let one side be }x\\text{ m.}",
      steps: [
        { explanation: "Use the constraint to remove the second variable: perimeter 40 means the two sides sum to 20, so the adjacent side is 20-x, giving the objective in one variable.", latex: "A=x(20-x)=20x-x^2" },
        { explanation: "Differentiate the area to find where it stops growing.", latex: "A'(x)=20-2x" },
        { explanation: "A maximum occurs at a flat point, so set the derivative to zero and solve.", latex: "20-2x=0\\Rightarrow x=10" },
        { explanation: "Confirm it is a maximum, not a minimum: A''(x)=-2<0 is a cap shape, so x=10 genuinely maximises the area (and it lies inside the sensible domain 0 to 20).", latex: "A''(x)=-2<0\\Rightarrow \\cap" },
      ],
      finalAnswerLatex: "\\text{Maximum area occurs when }x=10\\text{ m (a }10\\times10\\text{ square)}",
    },
    {
      title: "Minimum from a quadratic cost",
      questionLatex: "C(x)=x^2-8x+30",
      steps: [
        { explanation: "The objective is already in one variable, so differentiate the cost to find where it stops falling.", latex: "C'(x)=2x-8" },
        { explanation: "Minimum cost sits at a flat point, so set the derivative to zero and solve.", latex: "2x-8=0\\Rightarrow x=4" },
        { explanation: "Confirm it is a minimum rather than a maximum: the second derivative is positive, a cup shape, so x=4 is a genuine minimum.", latex: "C''(x)=2>0\\Rightarrow \\cup" },
      ],
      finalAnswerLatex: "\\text{Cost is minimised at }x=4",
    },
    {
      title: "Check a practical domain",
      questionLatex: "P(x)=x(12-x),\\quad 0\\le x\\le 12",
      steps: [
        { explanation: "Expand and differentiate the objective to locate its stationary point.", latex: "P(x)=12x-x^2,\\quad P'(x)=12-2x" },
        { explanation: "Set the derivative to zero to find the candidate.", latex: "12-2x=0\\Rightarrow x=6" },
        { explanation: "Now test the candidate against the domain: 6 lies inside the allowed range 0 to 12, so it is admissible and we keep it.", latex: "0\\le 6\\le 12\\ \\checkmark" },
        { explanation: "Because the domain is closed, also note the endpoints x=0 and x=12 give P=0, well below P(6)=36, so the stationary point really is the maximum and no endpoint beats it." },
      ],
      finalAnswerLatex: "\\text{Maximum at }x=6\\ \\text{(inside the domain; beats both endpoints)}",
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
      "Kinematics is where the abstract machinery of differentiation suddenly describes something you can watch happen: a particle moving along a line. The single idea that unlocks the whole topic is that the three quantities describing the motion — position, velocity, acceleration — are linked by differentiation. You are not learning new calculus here; you are recognising that the derivative you already know IS the rate of change of motion.",
      "Begin with displacement, written $s(t)$. It is the particle's position relative to a fixed origin at time $t$. The sign carries meaning: $s=+3$ might be three units to the right of the origin and $s=-3$ three units to the left. Displacement is a position, not a distance — it can be negative, and it can decrease.",
      "Velocity is the rate at which position changes, so it is the derivative of displacement: $v(t)=s'(t)$. This is exactly the 'gradient = rate of change' idea applied to a position-time graph — velocity is the gradient of the $s$-$t$ curve. The sign of velocity is the direction of travel: positive $v$ means the particle is moving in the positive direction (right), negative $v$ means it is moving in the negative direction (left).",
      "Acceleration is the rate at which velocity changes, so it is the derivative of velocity — and since velocity is already the derivative of displacement, acceleration is the second derivative of position: $a(t)=v'(t)=s''(t)$. This is the same nesting you saw with $f$, $f'$, $f''$, now wearing physical clothing. Reading the signs together is informative: if $v$ and $a$ have the same sign the particle is speeding up, and if they have opposite signs it is slowing down.",
      "The phrase 'momentarily at rest' has a precise meaning: the particle's velocity is instantaneously zero, $v(t)=0$. This is the kinematic version of a stationary point — at that instant the particle has stopped moving, even if only for a moment before reversing. A frequent error is to confuse this with being 'at the origin', which is $s(t)=0$. Those are different conditions: a particle can be at rest far from the origin, or flying through the origin at full speed. To find when a particle is at rest, set the velocity (not the position) to zero.",
      "Velocity and speed are not the same thing, and exams test the distinction deliberately. Velocity is signed — it tells you both how fast and which way. Speed is just how fast, the magnitude of velocity, $\\text{speed}=|v(t)|$, and it is never negative. A velocity of $-5$ m/s and a velocity of $+5$ m/s describe motion in opposite directions but the same speed of $5$ m/s. When a question asks for speed, take the absolute value; when it asks which way the particle is moving, read the sign of $v$.",
      "Finally, displacement and total distance differ whenever the particle changes direction. Displacement over an interval is the net change in position, $s(b)-s(a)$ — it can be small or even zero if the particle returns near its start. Total distance is the full length of the path travelled, counting every leg. If a particle runs from $s=0$ out to $s=5$ and back to $s=2$, its displacement is just $2$, but the distance travelled is $5+3=8$. To get total distance you must split the journey at the rest times (where $v=0$, the moments it turns around) and add the absolute changes in position over each leg.",
    ],
    latexBlocks: [
      "v(t)=s'(t)\\quad(\\text{velocity is the rate of change of position})",
      "a(t)=v'(t)=s''(t)\\quad(\\text{acceleration is the rate of change of velocity})",
      "\\text{momentarily at rest}\\Rightarrow v(t)=0\\quad(\\text{not }s(t)=0)",
      "\\text{speed}=|v(t)|\\ge 0;\\quad \\text{sign of }v=\\text{direction of motion}",
      "\\text{displacement}=s(b)-s(a);\\quad \\text{total distance sums }|\\text{change}|\\text{ over each leg}",
    ],
  },
  [
    {
      title: "Find velocity and acceleration",
      questionLatex: "s(t)=t^3-6t^2+9t",
      steps: [
        { explanation: "Velocity is the rate of change of position, so differentiate the displacement once.", latex: "v(t)=s'(t)=3t^2-12t+9" },
        { explanation: "Acceleration is the rate of change of velocity, so differentiate again — this is the second derivative of position.", latex: "a(t)=v'(t)=s''(t)=6t-12" },
      ],
      finalAnswerLatex: "v(t)=3t^2-12t+9,\\quad a(t)=6t-12",
    },
    {
      title: "Momentarily at rest",
      questionLatex: "v(t)=2t-8",
      steps: [
        { explanation: "Momentarily at rest means the velocity (not the position) is instantaneously zero, so set v(t)=0.", latex: "2t-8=0" },
        { explanation: "Solve for the time at which the particle stops.", latex: "t=4" },
      ],
      finalAnswerLatex: "\\text{At rest at }t=4",
    },
    {
      title: "Speed from velocity",
      questionLatex: "v(3)=-5\\text{ m/s}",
      steps: [
        { explanation: "The negative sign tells us the direction (moving in the negative direction), but speed ignores direction — it is the magnitude of velocity." },
        { explanation: "Take the absolute value to strip the sign and leave only how fast.", latex: "\\text{speed}=|v(3)|=|-5|=5" },
      ],
      finalAnswerLatex: "\\text{Speed }=5\\text{ m/s (moving in the negative direction)}",
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
    { mistake: "Confusing velocity and speed.", fix: "Velocity can be negative; speed is the magnitude." },
    { mistake: "Using displacement when total distance is required.", fix: "Split the interval at changes of direction and add distances." },
    { mistake: "Finding acceleration from displacement without differentiating twice.", fix: "Acceleration is s''(t)." },
    { mistake: "Thinking s(t)=0 means the particle is at rest.", fix: "At rest means v(t)=0." },
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
      "In an exam, applications-of-differentiation questions rarely announce which method they want. They describe a situation and leave you to recognise it. So the real skill this practice builds is not a new technique — you have every technique already — but diagnosis: reading the question to decide whether it is about concavity, classifying a stationary point, sketching, optimising, or motion, and then reaching for the matching tool. Mislabelling the situation is the single biggest source of lost marks, so slow down and identify what the derivative information actually represents before computing anything.",
      "The first derivative wears several hats, and naming the right one is half the battle. In a pure-function question $f'(x)$ is the gradient: $f'>0$ means increasing, $f'<0$ means decreasing, and $f'(x)=0$ flags a stationary point to be classified. In a motion question the very same derivative is velocity, $v=s'(t)$: its sign is the direction of travel and $v=0$ means momentarily at rest. Recognising that 'gradient is zero' and 'particle at rest' are the identical condition $f'=0$ in different costumes is exactly the transfer the exam rewards.",
      "The second derivative is just as versatile. As $f''$ it reports concavity — $f''>0$ a $\\cup$, $f''<0$ a $\\cap$ — and at a stationary point it doubles as the classification test: positive gives a minimum, negative gives a maximum. In motion it becomes acceleration, $a=s''(t)$, the rate at which velocity is changing. And the one trap that recurs across all of these is that $f''=0$ never confirms an inflection on its own; you must still check that $f''$ changes sign.",
      "Optimisation questions hide a fixed three-part shape no matter the scenario: build an objective function (using the constraint to get it into one variable), apply the derivative condition $f'(x)=0$ to find the candidate, then make a context check — is the candidate inside the domain, should you compare endpoints, does the question want the $x$-value or the optimal quantity, and what are the units? If you can spot 'this is an optimisation question', you can run this routine on a scenario you have never seen.",
      "Curve-sketching questions in this course ask you to match a description to a set of features rather than draw, but the discipline is the same: combine every clue — intercepts, stationary points and their nature, increasing/decreasing intervals, concavity — and reject any option that contradicts even one. A single isolated derivative value is weak evidence; the right answer is the one consistent with all the information at once.",
      "Above all, do not overclaim from incomplete information. If you are only told $f''(2)<0$, you may conclude the curve is concave down at $x=2$, but you may not conclude there is a maximum there unless you also know $f'(2)=0$. The Band 6 habit is to state precisely what each piece of derivative information licenses — and nothing more — then assemble those exact statements into the conclusion the question asks for.",
    ],
    latexBlocks: [
      "f'(x)=0:\\ \\text{stationary point (functions)} \\;=\\; \\text{at rest (motion)}",
      "f''(x)>0\\Rightarrow \\cup\\ \\text{(min at a stationary point)};\\quad f''(x)<0\\Rightarrow \\cap\\ \\text{(max)}",
      "v(t)=s'(t),\\quad a(t)=s''(t)",
      "\\text{optimise: objective }\\to\\text{ one variable }\\to f'(x)=0\\to\\text{ check domain, units, what's asked}",
    ],
  },
  [
    {
      title: "Mixed stationary and concavity information",
      questionLatex: "f'(2)=0,\\quad f''(2)<0",
      steps: [
        { explanation: "Diagnose the situation: f'(2)=0 licenses the statement that x=2 is a stationary point — and nothing more on its own." },
        { explanation: "f''(2)<0 licenses the statement that the curve is concave down (a cap) at x=2.", latex: "f''(2)<0\\Rightarrow \\cap" },
        { explanation: "Only by combining the two licensed statements — flat point inside a cap — can we conclude a local maximum; either clue alone would be overclaiming." },
      ],
      finalAnswerLatex: "\\text{Local maximum at }x=2",
    },
    {
      title: "Optimisation candidate",
      questionLatex: "P(x)=20x-x^2",
      steps: [
        { explanation: "Recognise this as optimisation: the objective is already in one variable, so differentiate it.", latex: "P'(x)=20-2x" },
        { explanation: "Apply the derivative condition — the optimum sits at a flat point, so set P'(x)=0 and solve.", latex: "20-2x=0\\Rightarrow x=10" },
        { explanation: "The question asks for the maximum value, not just where it occurs, so substitute the x-value back into the objective (and note P''=-2<0 confirms it is a maximum).", latex: "P(10)=20(10)-10^2=100" },
      ],
      finalAnswerLatex: "\\text{Maximum value }P_{\\max}=100\\text{ at }x=10",
    },
    {
      title: "Motion interpretation",
      questionLatex: "v(4)=0,\\quad a(4)<0",
      steps: [
        { explanation: "Diagnose this as a motion question: v(4)=0 means the velocity is instantaneously zero, so the particle is momentarily at rest at t=4 (this is the at-rest condition, not s=0)." },
        { explanation: "a(4)<0 means the acceleration is negative, so the velocity is decreasing through zero — the particle is about to move in the negative direction.", latex: "a=v'(t)<0\\Rightarrow v\\text{ decreasing}" },
        { explanation: "Read together: the particle pauses and then reverses into the negative direction, the kinematic analogue of a turning point in the position-time graph." },
      ],
      finalAnswerLatex: "\\text{Momentarily at rest at }t=4,\\text{ then turning to move in the negative direction}",
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
  optimisationLesson,
  kinematicsRatesChangeLesson,
  applicationsDifferentiationExamPracticeLesson,
];

// ---------------------------------------------------------------------------
// Band-6 depth: post-hoc masteryQuizPool + multiPartPractice assignment.
// The applicationLesson factory does not accept these fields, so they are
// attached here after construction. Pools are difficulty-ramped (1–5) with
// multiple numeric variants per sub-skill; D5 items chain 2+ sub-skills.
// Every derivative, stationary point and classification below is verified.
// ---------------------------------------------------------------------------

secondDerivativeConcavityLesson.masteryQuizPool = [
  { id: "appdiff-conc-p1", prompt: "f''(x)>0 on an interval means the graph is:", latex: "f''(x)>0", answer: "A", difficulty: 1, choices: [{ label: "A", text: "concave up" }, { label: "B", text: "concave down" }, { label: "C", text: "increasing" }, { label: "D", text: "decreasing" }], hint: "Sign of the second derivative.", explanation: "A positive second derivative means concave up." },
  { id: "appdiff-conc-p2", prompt: "f''(x)<0 on an interval means the graph is:", latex: "f''(x)<0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "concave up" }, { label: "B", text: "concave down" }, { label: "C", text: "increasing" }, { label: "D", text: "decreasing" }], hint: "Sign of the second derivative.", explanation: "A negative second derivative means concave down." },
  { id: "appdiff-conc-p3", prompt: "A point of inflection requires f''=0 AND that f'':", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "stays positive" }, { label: "B", text: "stays negative" }, { label: "C", text: "changes sign" }, { label: "D", text: "is undefined only" }], hint: "Concavity must actually change.", explanation: "f''=0 alone is not enough; the sign of f'' must change for an inflection." },
  { id: "appdiff-conc-p4", prompt: "Find the possible inflection x-value.", latex: "f''(x)=4x-8", answer: "2", difficulty: 2, acceptedAnswers: ["2"], hint: "Solve f''(x)=0.", explanation: "4x-8=0 gives x=2." },
  { id: "appdiff-conc-p5", prompt: "Find the possible inflection x-value.", latex: "f''(x)=6x+18", answer: "-3", difficulty: 2, acceptedAnswers: ["-3", "−3"], hint: "Solve f''(x)=0.", explanation: "6x+18=0 gives x=-3." },
  { id: "appdiff-conc-p6", prompt: "Find the possible inflection x-value.", latex: "f''(x)=2x-7", answer: "3.5", difficulty: 2, acceptedAnswers: ["7/2", "3.5"], hint: "Solve f''(x)=0.", explanation: "2x-7=0 gives x=3.5." },
  { id: "appdiff-conc-p7", prompt: "Find f''(2).", latex: "f''(x)=6x-5", answer: "7", difficulty: 2, acceptedAnswers: ["7"], hint: "Substitute x=2.", explanation: "f''(2)=6(2)-5=7." },
  { id: "appdiff-conc-p8", prompt: "For f(x)=x^3-3x+5, find f''(1).", latex: "f(x)=x^3-3x+5", answer: "6", difficulty: 3, acceptedAnswers: ["6"], hint: "f'(x)=3x^2-3, then differentiate again.", explanation: "f'(x)=3x^2-3, f''(x)=6x, so f''(1)=6." },
  { id: "appdiff-conc-p9", prompt: "For f(x)=x^3-3x+5, is the graph concave up or down at x=1? (up/down)", latex: "f(x)=x^3-3x+5", answer: "up", difficulty: 3, acceptedAnswers: ["Up", "concave up"], hint: "Find the sign of f''(1).", explanation: "f''(x)=6x, so f''(1)=6>0: concave up." },
  { id: "appdiff-conc-p10", prompt: "Does the sign chart confirm a point of inflection at x=-1? (yes/no)", latex: "\\begin{array}{c|ccc}x&x<-1&-1&x>-1\\\\\\hline f''(x)&-&0&+\\end{array}", answer: "yes", difficulty: 3, acceptedAnswers: ["Yes"], hint: "Does f'' change sign?", explanation: "f'' changes from negative to positive, so concavity changes: yes." },
  { id: "appdiff-conc-p11", prompt: "Does the sign chart confirm a point of inflection at x=2? (yes/no)", latex: "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f''(x)&+&0&+\\end{array}", answer: "no", difficulty: 3, acceptedAnswers: ["No"], hint: "Does f'' change sign?", explanation: "f'' stays positive on both sides: no sign change, so no inflection." },
  { id: "appdiff-conc-p12", prompt: "For f(x)=x^4, f''(x)=12x^2 is zero at x=0. Is there an inflection there? (yes/no)", latex: "f(x)=x^4", answer: "no", difficulty: 3, acceptedAnswers: ["No"], hint: "Check the sign of 12x^2 on each side.", explanation: "12x^2>0 on both sides of 0, so concavity does not change: no inflection." },
  { id: "appdiff-conc-p13", prompt: "A graph is increasing and concave down. Its gradient is positive but:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "becoming smaller" }, { label: "B", text: "becoming larger" }, { label: "C", text: "constant" }, { label: "D", text: "negative" }], hint: "Concave down means f' is decreasing.", explanation: "Increasing means f'>0; concave down means f' is decreasing, so the gradient becomes smaller." },
  { id: "appdiff-conc-p14", prompt: "The sign chart lists three intervals in order. Which one is concave up?", latex: "\\begin{array}{c|ccc}\\text{interval}&(-\\infty,0)&(0,4)&(4,\\infty)\\\\\\hline f''(x)&-&+&-\\end{array}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "the first" }, { label: "B", text: "the second" }, { label: "C", text: "the third" }, { label: "D", text: "all of them" }], hint: "Concave up where $f''>0$.", explanation: "$f''>0$ only on the second interval, $(0,4)$." },
  { id: "appdiff-conc-p15", prompt: "Find f''(3).", latex: "f''(x)=x^2-2x", answer: "3", difficulty: 3, acceptedAnswers: ["3"], hint: "Substitute x=3.", explanation: "f''(3)=9-6=3." },
  { id: "appdiff-conc-p16", prompt: "For f(x)=2x^3-9x^2, find the inflection x-value.", latex: "f(x)=2x^3-9x^2", answer: "1.5", difficulty: 4, acceptedAnswers: ["3/2", "1.5"], hint: "f''(x)=12x-18; set it to 0.", explanation: "f'(x)=6x^2-18x, f''(x)=12x-18=0 gives x=1.5; f'' changes sign there." },
  { id: "appdiff-conc-p17", prompt: "For f(x)=x^3-6x^2+5, find the inflection x-value.", latex: "f(x)=x^3-6x^2+5", answer: "2", difficulty: 4, acceptedAnswers: ["2"], hint: "f''(x)=6x-12.", explanation: "f'(x)=3x^2-12x, f''(x)=6x-12=0 gives x=2; sign changes, so inflection at x=2." },
  { id: "appdiff-conc-p18", prompt: "For f(x)=x^4-6x^2, find the positive inflection x-value.", latex: "f(x)=x^4-6x^2", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "f''(x)=12x^2-12.", explanation: "f'(x)=4x^3-12x, f''(x)=12x^2-12=0 gives x=±1; the positive value is x=1." },
  { id: "appdiff-conc-p19", prompt: "Find the larger of the two possible inflection x-values.", latex: "f''(x)=x^2-9", answer: "3", difficulty: 4, acceptedAnswers: ["3"], hint: "Solve x^2-9=0.", explanation: "x^2-9=0 gives x=±3; the larger value is 3." },
  { id: "appdiff-conc-p20", prompt: "f'' changes from positive to negative at x=5. The concavity there changes from:", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "up to down" }, { label: "B", text: "down to up" }, { label: "C", text: "increasing to decreasing" }, { label: "D", text: "no change" }], hint: "Positive f'' is concave up.", explanation: "Positive to negative f'' means concave up to concave down." },
  { id: "appdiff-conc-p21", prompt: "Find f''(0).", latex: "f''(x)=3x^2-6x+4", answer: "4", difficulty: 3, acceptedAnswers: ["4"], hint: "Substitute x=0.", explanation: "f''(0)=4." },
  { id: "appdiff-conc-p22", prompt: "For f(x)=x^3+3x^2-1, find f''(-2).", latex: "f(x)=x^3+3x^2-1", answer: "-6", difficulty: 4, acceptedAnswers: ["-6", "−6"], hint: "f''(x)=6x+6.", explanation: "f'(x)=3x^2+6x, f''(x)=6x+6, so f''(-2)=-12+6=-6." },
  { id: "appdiff-conc-p23", prompt: "Which conclusion is justified? f'(x)>0 both sides of x=2, f''<0 then 0 then >0 at x=2.", latex: "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&+&0&+\\\\f''(x)&-&0&+\\end{array}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "local maximum at x=2" }, { label: "B", text: "local minimum at x=2" }, { label: "C", text: "horizontal point of inflection at x=2" }, { label: "D", text: "no stationary point" }], hint: "f'=0 but f' does not change sign; f'' changes sign.", explanation: "f'(2)=0 with no sign change in f', and f'' changes sign: a horizontal (stationary) point of inflection." },
  { id: "appdiff-conc-p24", prompt: "For f(x)=x^3-12x, on which interval is the graph concave down? Give the upper bound (a number).", latex: "f(x)=x^3-12x", answer: "0", difficulty: 5, acceptedAnswers: ["0"], hint: "f''(x)=6x; concave down where f''<0.", explanation: "f''(x)=6x<0 for x<0, so the graph is concave down on $(-\\infty,0)$; the upper bound is 0." },
  { id: "appdiff-conc-p25", prompt: "For f(x)=x^4-4x^3, find the larger inflection x-value.", latex: "f(x)=x^4-4x^3", answer: "2", difficulty: 5, acceptedAnswers: ["2"], hint: "f''(x)=12x^2-24x=12x(x-2).", explanation: "f''(x)=12x^2-24x=12x(x-2)=0 gives x=0 and x=2, both with sign changes; the larger is x=2." },
  { id: "appdiff-conc-p26", prompt: "For f(x)=x^3-3x^2+2, find the inflection x-value.", latex: "f(x)=x^3-3x^2+2", answer: "1", difficulty: 5, acceptedAnswers: ["1"], hint: "f''(x)=6x-6.", explanation: "f'(x)=3x^2-6x, f''(x)=6x-6=0 gives x=1; f'' changes sign, so inflection at x=1." },
  { id: "appdiff-conc-p27", prompt: "A curve has f''(x)=6x-24. For what x is it concave up? Give the lower bound (a number).", latex: "f''(x)=6x-24", answer: "4", difficulty: 5, acceptedAnswers: ["4"], hint: "Concave up where 6x-24>0.", explanation: "6x-24>0 gives x>4, so concave up on $(4,\\infty)$; the lower bound is 4." },
  { id: "appdiff-conc-p28", prompt: "For f(x)=2x^3-3x^2-12x, find the inflection x-value.", latex: "f(x)=2x^3-3x^2-12x", answer: "0.5", difficulty: 5, acceptedAnswers: ["1/2", "0.5"], hint: "f''(x)=12x-6.", explanation: "f'(x)=6x^2-6x-12, f''(x)=12x-6=0 gives x=0.5; sign changes, so inflection at x=0.5." },
  { id: "appdiff-conc-p29", prompt: "f''(x)=12x^2 at a stationary point x=0. Why is this not automatically an inflection?", latex: "f''(x)=12x^2", answer: "B", difficulty: 4, choices: [{ label: "A", text: "f'' is negative" }, { label: "B", text: "f'' does not change sign" }, { label: "C", text: "f' is undefined" }, { label: "D", text: "the y-intercept is wrong" }], hint: "Check the sign of f'' on each side of 0.", explanation: "12x^2 is positive on both sides of 0, so there is no sign change and no inflection." },
  { id: "appdiff-conc-p30", prompt: "For f(x)=x^3, find f''(-1).", latex: "f(x)=x^3", answer: "-6", difficulty: 3, acceptedAnswers: ["-6", "−6"], hint: "f''(x)=6x.", explanation: "f''(x)=6x, so f''(-1)=-6: concave down for x<0." },
];

secondDerivativeConcavityLesson.multiPartPractice = [
  {
    id: "appdiff-conc-mp-1",
    prompt:
      "A curve is given by f(x)=x^3-6x^2+9x+1. Answer the parts about its concavity and inflection.",
    latex: "f(x)=x^3-6x^2+9x+1",
    answer: "12x-12",
    hint: "Differentiate twice, set f''=0, then substitute to find the inflection's y-value.",
    explanation:
      "(a) f'(x)=3x^2-12x+9 so f''(x)=6x-12. (b) f''(x)=0 gives x=2. (c) f(2)=8-24+18+1=3, so the inflection point is (2,3).",
    parts: [
      { key: "a", label: "(a)", prompt: "Find f''(x) at x=0 (a number).", latex: "f''(x)=6x-12", marks: 1, answer: "-12", acceptedAnswers: ["-12", "−12"], hint: "f''(x)=6x-12; substitute x=0.", explanation: "f'(x)=3x^2-12x+9, f''(x)=6x-12, so f''(0)=-12." },
      { key: "b", label: "(b)", prompt: "Find the x-coordinate of the point of inflection.", latex: "f''(x)=0", marks: 2, answer: "2", acceptedAnswers: ["2"], hint: "Solve 6x-12=0 and confirm a sign change.", explanation: "6x-12=0 gives x=2; f'' changes from negative to positive there, so it is an inflection." },
      { key: "c", label: "(c)", prompt: "Find the y-coordinate of the point of inflection.", latex: "f(2)", marks: 2, answer: "3", acceptedAnswers: ["3"], hint: "Substitute x=2 into f.", explanation: "f(2)=8-24+18+1=3, so the inflection is at (2,3)." },
    ],
  },
];

stationaryPointClassificationLesson.masteryQuizPool = [
  { id: "appdiff-stat-p1", prompt: "f'(a)=0 and f''(a)>0. The point is a:", latex: "f''(a)>0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Concave up at the stationary point.", explanation: "Positive f'' gives a local minimum." },
  { id: "appdiff-stat-p2", prompt: "f'(a)=0 and f''(a)<0. The point is a:", latex: "f''(a)<0", answer: "A", difficulty: 1, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Concave down at the stationary point.", explanation: "Negative f'' gives a local maximum." },
  { id: "appdiff-stat-p3", prompt: "f'(a)=0 and f''(a)=0. The second derivative test is:", latex: "f''(a)=0", answer: "C", difficulty: 2, choices: [{ label: "A", text: "a maximum" }, { label: "B", text: "a minimum" }, { label: "C", text: "inconclusive" }, { label: "D", text: "impossible" }], hint: "f''=0 gives no information.", explanation: "When f''=0 the second derivative test is inconclusive; use a first derivative sign test." },
  { id: "appdiff-stat-p4", prompt: "Find the stationary x-value.", latex: "f'(x)=2x-8", answer: "4", difficulty: 2, acceptedAnswers: ["4"], hint: "Solve f'(x)=0.", explanation: "2x-8=0 gives x=4." },
  { id: "appdiff-stat-p5", prompt: "Find the stationary x-value.", latex: "f'(x)=3x+12", answer: "-4", difficulty: 2, acceptedAnswers: ["-4", "−4"], hint: "Solve f'(x)=0.", explanation: "3x+12=0 gives x=-4." },
  { id: "appdiff-stat-p6", prompt: "Find f''(2).", latex: "f''(x)=6x-18", answer: "-6", difficulty: 2, acceptedAnswers: ["-6", "−6"], hint: "Substitute x=2.", explanation: "f''(2)=12-18=-6." },
  { id: "appdiff-stat-p7", prompt: "f' goes - 0 + across x=4. Classify x=4.", latex: "\\begin{array}{c|ccc}x&x<4&4&x>4\\\\\\hline f'(x)&-&0&+\\end{array}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Decreasing then increasing.", explanation: "f' changes - to +, so a local minimum." },
  { id: "appdiff-stat-p8", prompt: "f' goes + 0 - across x=1. Classify x=1.", latex: "\\begin{array}{c|ccc}x&x<1&1&x>1\\\\\\hline f'(x)&+&0&-\\end{array}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Increasing then decreasing.", explanation: "f' changes + to -, so a local maximum." },
  { id: "appdiff-stat-p9", prompt: "f' goes + 0 + across x=-1. Classify x=-1.", latex: "\\begin{array}{c|ccc}x&x<-1&-1&x>-1\\\\\\hline f'(x)&+&0&+\\end{array}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "No sign change in f'.", explanation: "f' is zero but does not change sign: a horizontal point of inflection." },
  { id: "appdiff-stat-p10", prompt: "For f(x)=x^2-8x+3, find the stationary x-value.", latex: "f(x)=x^2-8x+3", answer: "4", difficulty: 3, acceptedAnswers: ["4"], hint: "f'(x)=2x-8.", explanation: "f'(x)=2x-8=0 gives x=4." },
  { id: "appdiff-stat-p11", prompt: "For f(x)=x^2-8x+3, classify the stationary point.", latex: "f(x)=x^2-8x+3", answer: "B", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=2.", explanation: "f''(x)=2>0, so the stationary point is a local minimum." },
  { id: "appdiff-stat-p12", prompt: "For f(x)=12x-x^3, find the positive stationary x-value.", latex: "f(x)=12x-x^3", answer: "2", difficulty: 3, acceptedAnswers: ["2"], hint: "f'(x)=12-3x^2.", explanation: "f'(x)=12-3x^2=0 gives x^2=4, so x=±2; the positive value is 2." },
  { id: "appdiff-stat-p13", prompt: "For f(x)=x^3-3x, find the larger stationary x-value.", latex: "f(x)=x^3-3x", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "f'(x)=3x^2-3.", explanation: "f'(x)=3x^2-3=0 gives x=±1; the larger value is 1." },
  { id: "appdiff-stat-p14", prompt: "For f(x)=x^3-3x, classify the stationary point at x=1.", latex: "f(x)=x^3-3x", answer: "B", difficulty: 4, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=6x; evaluate at x=1.", explanation: "f''(x)=6x, f''(1)=6>0, so x=1 is a local minimum." },
  { id: "appdiff-stat-p15", prompt: "For f(x)=x^3-3x, classify the stationary point at x=-1.", latex: "f(x)=x^3-3x", answer: "A", difficulty: 4, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=6x; evaluate at x=-1.", explanation: "f''(-1)=-6<0, so x=-1 is a local maximum." },
  { id: "appdiff-stat-p16", prompt: "For f(x)=x^3, classify the stationary point at x=0.", latex: "f(x)=x^3", answer: "C", difficulty: 4, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(0)=0; check the sign of f' on each side.", explanation: "f'(x)=3x^2 is zero at x=0 but positive on both sides, so a horizontal point of inflection." },
  { id: "appdiff-stat-p17", prompt: "For f(x)=2x^3-3x^2, find the larger stationary x-value.", latex: "f(x)=2x^3-3x^2", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "f'(x)=6x^2-6x=6x(x-1).", explanation: "f'(x)=6x(x-1)=0 gives x=0 and x=1; the larger is 1." },
  { id: "appdiff-stat-p18", prompt: "For f(x)=2x^3-3x^2, classify the stationary point at x=0.", latex: "f(x)=2x^3-3x^2", answer: "A", difficulty: 4, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=12x-6; evaluate at x=0.", explanation: "f''(0)=-6<0, so x=0 is a local maximum." },
  { id: "appdiff-stat-p19", prompt: "Find f''(2).", latex: "f''(x)=6x-18", answer: "-6", difficulty: 2, acceptedAnswers: ["-6", "−6"], hint: "Substitute x=2.", explanation: "f''(2)=12-18=-6." },
  { id: "appdiff-stat-p20", prompt: "A student says f''(a)>0 means f is increasing at a. The correct statement is f'' describes:", latex: "\\text{Choose one}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "the y-intercept" }, { label: "B", text: "an asymptote" }, { label: "C", text: "concavity" }, { label: "D", text: "the domain" }], hint: "Increasing is about f', not f''.", explanation: "f'' describes concavity; increasing/decreasing is governed by f'." },
  { id: "appdiff-stat-p21", prompt: "For f(x)=x^2-6x+11, the stationary point is a minimum. Find its x-value.", latex: "f(x)=x^2-6x+11", answer: "3", difficulty: 3, acceptedAnswers: ["3"], hint: "f'(x)=2x-6.", explanation: "f'(x)=2x-6=0 gives x=3; f''=2>0 confirms a minimum." },
  { id: "appdiff-stat-p22", prompt: "For f(x)=5+4x-x^2, find the stationary x-value.", latex: "f(x)=5+4x-x^2", answer: "2", difficulty: 3, acceptedAnswers: ["2"], hint: "f'(x)=4-2x.", explanation: "f'(x)=4-2x=0 gives x=2." },
  { id: "appdiff-stat-p23", prompt: "For f(x)=5+4x-x^2, classify the stationary point.", latex: "f(x)=5+4x-x^2", answer: "A", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=-2.", explanation: "f''(x)=-2<0, so it is a local maximum." },
  { id: "appdiff-stat-p24", prompt: "For f(x)=x^3-12x+5, classify the stationary point at x=2.", latex: "f(x)=x^3-12x+5", answer: "B", difficulty: 5, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f'(x)=3x^2-12; classify with f''(x)=6x.", explanation: "f'(x)=3x^2-12=0 gives x=±2; f''(2)=12>0, so x=2 is a local minimum." },
  { id: "appdiff-stat-p25", prompt: "For f(x)=x^3-12x+5, the y-value of the local maximum is at x=-2. Find f(-2).", latex: "f(x)=x^3-12x+5", answer: "21", difficulty: 5, acceptedAnswers: ["21"], hint: "x=-2 is the local maximum; substitute.", explanation: "f(-2)=-8+24+5=21, the local maximum value." },
  { id: "appdiff-stat-p26", prompt: "For f(x)=x^4-2x^2, find the largest stationary x-value.", latex: "f(x)=x^4-2x^2", answer: "1", difficulty: 5, acceptedAnswers: ["1"], hint: "f'(x)=4x^3-4x=4x(x^2-1).", explanation: "f'(x)=4x(x-1)(x+1)=0 gives x=-1,0,1; the largest is 1." },
  { id: "appdiff-stat-p27", prompt: "For f(x)=x^4-2x^2, classify the stationary point at x=0.", latex: "f(x)=x^4-2x^2", answer: "A", difficulty: 5, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=12x^2-4; evaluate at x=0.", explanation: "f''(0)=-4<0, so x=0 is a local maximum." },
  { id: "appdiff-stat-p28", prompt: "For f(x)=x^3+3x^2-9x, find the larger stationary x-value.", latex: "f(x)=x^3+3x^2-9x", answer: "1", difficulty: 5, acceptedAnswers: ["1"], hint: "f'(x)=3x^2+6x-9=3(x+3)(x-1).", explanation: "f'(x)=3(x+3)(x-1)=0 gives x=-3 and x=1; the larger is 1." },
  { id: "appdiff-stat-p29", prompt: "For f(x)=x^3+3x^2-9x, classify the stationary point at x=-3.", latex: "f(x)=x^3+3x^2-9x", answer: "A", difficulty: 5, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=6x+6; evaluate at x=-3.", explanation: "f''(-3)=-18+6=-12<0, so x=-3 is a local maximum." },
  { id: "appdiff-stat-p30", prompt: "f'(2)=0 and the graph changes from increasing to decreasing at x=2. The point is a:", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Increasing to decreasing.", explanation: "A change from increasing to decreasing at a stationary point is a local maximum." },
];

stationaryPointClassificationLesson.multiPartPractice = [
  {
    id: "appdiff-stat-mp-1",
    prompt:
      "A curve is given by f(x)=x^3-3x^2-9x+5. Answer the parts about its stationary points.",
    latex: "f(x)=x^3-3x^2-9x+5",
    answer: "3",
    hint: "Solve f'(x)=0, then use f''(x)=6x-6 to classify, and substitute for the y-value.",
    explanation:
      "(a) f'(x)=3x^2-6x-9=3(x-3)(x+1), so x=3 and x=-1. (b) f''(x)=6x-6; f''(3)=12>0, so x=3 is a local minimum. (c) f(3)=27-27-27+5=-22.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the larger stationary x-value.", latex: "f'(x)=3x^2-6x-9", marks: 2, answer: "3", acceptedAnswers: ["3"], hint: "Factor 3(x-3)(x+1).", explanation: "f'(x)=3x^2-6x-9=3(x-3)(x+1)=0 gives x=3 and x=-1; the larger is 3." },
      { key: "b", label: "(b)", prompt: "At x=3, is the stationary point a maximum or a minimum? (maximum/minimum)", latex: "f''(x)=6x-6", marks: 2, answer: "minimum", acceptedAnswers: ["Minimum", "local minimum"], hint: "Check the sign of f''(3).", explanation: "f''(3)=12>0, so x=3 is a local minimum." },
      { key: "c", label: "(c)", prompt: "Find the y-coordinate of the stationary point at x=3.", latex: "f(3)", marks: 2, answer: "-22", acceptedAnswers: ["-22", "−22"], hint: "Substitute x=3 into f.", explanation: "f(3)=27-27-27+5=-22." },
    ],
  },
];

curveSketchingCalculusLesson.masteryQuizPool = [
  { id: "appdiff-curve-p1", prompt: "f'(x)>0 on an interval means the graph is:", latex: "f'(x)>0", answer: "A", difficulty: 1, choices: [{ label: "A", text: "increasing" }, { label: "B", text: "decreasing" }, { label: "C", text: "concave up" }, { label: "D", text: "concave down" }], hint: "Sign of the first derivative.", explanation: "Positive f' means increasing." },
  { id: "appdiff-curve-p2", prompt: "f'(x)<0 on an interval means the graph is:", latex: "f'(x)<0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "increasing" }, { label: "B", text: "decreasing" }, { label: "C", text: "concave up" }, { label: "D", text: "concave down" }], hint: "Sign of the first derivative.", explanation: "Negative f' means decreasing." },
  { id: "appdiff-curve-p3", prompt: "The y-intercept of y=f(x) is found by evaluating:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "f'(0)" }, { label: "B", text: "f''(0)" }, { label: "C", text: "f(0)" }, { label: "D", text: "the limiting sum" }], hint: "Set x=0.", explanation: "The y-intercept is f(0)." },
  { id: "appdiff-curve-p4", prompt: "f' goes + 0 - across x=3. The turning point is a:", latex: "\\begin{array}{c|ccc}x&x<3&3&x>3\\\\\\hline f'(x)&+&0&-\\end{array}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Increasing then decreasing.", explanation: "f' changes + to -, so a local maximum." },
  { id: "appdiff-curve-p5", prompt: "f' goes - 0 + across x=2. The turning point is a:", latex: "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&-&0&+\\end{array}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Decreasing then increasing.", explanation: "f' changes - to +, so a local minimum." },
  { id: "appdiff-curve-p6", prompt: "For y=x^2-6x+8, find the x-intercept that is smaller.", latex: "y=x^2-6x+8", answer: "2", difficulty: 3, acceptedAnswers: ["2"], hint: "Factor (x-2)(x-4).", explanation: "x^2-6x+8=(x-2)(x-4)=0 gives x=2 and x=4; the smaller is 2." },
  { id: "appdiff-curve-p7", prompt: "For y=x^2-6x+8, find the y-intercept.", latex: "y=x^2-6x+8", answer: "8", difficulty: 2, acceptedAnswers: ["8"], hint: "Set x=0.", explanation: "y(0)=8." },
  { id: "appdiff-curve-p8", prompt: "For y=x^2-6x+8, find the x-value of the minimum.", latex: "y=x^2-6x+8", answer: "3", difficulty: 3, acceptedAnswers: ["3"], hint: "y'(x)=2x-6.", explanation: "y'(x)=2x-6=0 gives x=3 (a minimum since y''=2>0)." },
  { id: "appdiff-curve-p9", prompt: "f'(0)=0 and f''(0)>0 with f(0)=-3. The point (0,-3) is a:", latex: "f'(0)=0,\\ f''(0)>0,\\ f(0)=-3", answer: "B", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "x-intercept" }, { label: "D", text: "point of inflection" }], hint: "Stationary and concave up.", explanation: "Stationary with positive f'' is a local minimum, at y=-3." },
  { id: "appdiff-curve-p10", prompt: "f' positive both sides of x=-1 with f'(-1)=0. The point is a:", latex: "\\begin{array}{c|ccc}x&x<-1&-1&x>-1\\\\\\hline f'(x)&+&0&+\\end{array}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "x-intercept" }], hint: "No sign change in f'.", explanation: "A stationary point with no sign change in f' is a horizontal point of inflection." },
  { id: "appdiff-curve-p11", prompt: "f'' changes from negative to positive at x=2. This is a:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "point of inflection" }, { label: "C", text: "x-intercept" }, { label: "D", text: "horizontal asymptote" }], hint: "Sign change in f''.", explanation: "A sign change in f'' is a point of inflection." },
  { id: "appdiff-curve-p12", prompt: "A curve is decreasing and concave up. Its gradient is negative and:", latex: "\\text{Choose one}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "becoming more negative" }, { label: "B", text: "zero" }, { label: "C", text: "positive" }, { label: "D", text: "becoming less negative" }], hint: "Concave up means f' is increasing.", explanation: "Decreasing means f'<0; concave up means f' is increasing, so the gradient becomes less negative." },
  { id: "appdiff-curve-p13", prompt: "For y=x^3-3x, find the larger x-value of a turning point.", latex: "y=x^3-3x", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "y'(x)=3x^2-3.", explanation: "y'(x)=3x^2-3=0 gives x=±1; the larger is 1." },
  { id: "appdiff-curve-p14", prompt: "For y=x^3-3x, find the smaller x-intercept (besides the origin) of the curve.", latex: "y=x^3-3x", answer: "-1.732", difficulty: 4, acceptedAnswers: ["-\\sqrt{3}", "-sqrt(3)", "−1.732", "-1.73"], hint: "x(x^2-3)=0.", explanation: "x^3-3x=x(x^2-3)=0 gives x=0 and x=±√3≈±1.732; the smaller is -√3." },
  { id: "appdiff-curve-p15", prompt: "A cubic has a local max at x=-2 and a local min at x=3. How many turning points does it have? (number)", latex: "\\text{Number}", answer: "2", difficulty: 3, acceptedAnswers: ["two"], hint: "Count the stationary turning points.", explanation: "A maximum and a minimum give 2 turning points." },
  { id: "appdiff-curve-p16", prompt: "A graph has f'(x)>0 and f''(x)<0 on an interval. It is:", latex: "\\text{Choose one}", answer: "D", difficulty: 4, choices: [{ label: "A", text: "decreasing and concave up" }, { label: "B", text: "decreasing and concave down" }, { label: "C", text: "increasing and concave up" }, { label: "D", text: "increasing and concave down" }], hint: "Read each sign separately.", explanation: "Positive f' is increasing; negative f'' is concave down." },
  { id: "appdiff-curve-p17", prompt: "For y=x^3-6x^2+9x, find the smaller turning-point x-value.", latex: "y=x^3-6x^2+9x", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "y'(x)=3x^2-12x+9=3(x-1)(x-3).", explanation: "y'(x)=3(x-1)(x-3)=0 gives x=1 and x=3; the smaller is 1." },
  { id: "appdiff-curve-p18", prompt: "For y=x^3-6x^2+9x, classify the turning point at x=1.", latex: "y=x^3-6x^2+9x", answer: "A", difficulty: 4, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "y''(x)=6x-12; evaluate at x=1.", explanation: "y''(1)=-6<0, so x=1 is a local maximum." },
  { id: "appdiff-curve-p19", prompt: "For y=x^3-6x^2+9x, find the y-value at the local minimum x=3.", latex: "y=x^3-6x^2+9x", answer: "0", difficulty: 4, acceptedAnswers: ["0"], hint: "Substitute x=3.", explanation: "y(3)=27-54+27=0." },
  { id: "appdiff-curve-p20", prompt: "A stationary point of f is at x=1; an inflection of f is at x=3. Which is necessarily true?", latex: "\\text{Choose one}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "f'(1)=0" }, { label: "B", text: "f(3)=0" }, { label: "C", text: "f'(3)=0" }, { label: "D", text: "f''(1)=0" }], hint: "Stationary means the first derivative is zero.", explanation: "A stationary point requires f'(1)=0." },
  { id: "appdiff-curve-p21", prompt: "For y=x^3-6x^2+9x, find the x-value of the point of inflection.", latex: "y=x^3-6x^2+9x", answer: "2", difficulty: 4, acceptedAnswers: ["2"], hint: "y''(x)=6x-12.", explanation: "y''(x)=6x-12=0 gives x=2; f'' changes sign, so an inflection at x=2." },
  { id: "appdiff-curve-p22", prompt: "For y=12x-x^3, find the positive turning-point x-value.", latex: "y=12x-x^3", answer: "2", difficulty: 4, acceptedAnswers: ["2"], hint: "y'(x)=12-3x^2.", explanation: "y'(x)=12-3x^2=0 gives x^2=4, so x=±2; the positive value is 2." },
  { id: "appdiff-curve-p23", prompt: "For y=12x-x^3, find the maximum value (at the positive turning point).", latex: "y=12x-x^3", answer: "16", difficulty: 5, acceptedAnswers: ["16"], hint: "The max is at x=2 (y''<0); substitute.", explanation: "y''(x)=-6x, y''(2)=-12<0, so x=2 is a maximum; y(2)=24-8=16." },
  { id: "appdiff-curve-p24", prompt: "For y=x^4-8x^2, find the largest turning-point x-value.", latex: "y=x^4-8x^2", answer: "2", difficulty: 5, acceptedAnswers: ["2"], hint: "y'(x)=4x^3-16x=4x(x^2-4).", explanation: "y'(x)=4x(x-2)(x+2)=0 gives x=-2,0,2; the largest is 2." },
  { id: "appdiff-curve-p25", prompt: "For y=x^4-8x^2, classify the turning point at x=0.", latex: "y=x^4-8x^2", answer: "A", difficulty: 5, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "y''(x)=12x^2-16; evaluate at x=0.", explanation: "y''(0)=-16<0, so x=0 is a local maximum." },
  { id: "appdiff-curve-p26", prompt: "For y=x^4-8x^2, find the minimum value (at the positive turning point x=2).", latex: "y=x^4-8x^2", answer: "-16", difficulty: 5, acceptedAnswers: ["-16", "−16"], hint: "Substitute x=2.", explanation: "y(2)=16-32=-16." },
  { id: "appdiff-curve-p27", prompt: "For y=2x^3-3x^2-12x, find the larger turning-point x-value.", latex: "y=2x^3-3x^2-12x", answer: "2", difficulty: 5, acceptedAnswers: ["2"], hint: "y'(x)=6x^2-6x-12=6(x-2)(x+1).", explanation: "y'(x)=6(x-2)(x+1)=0 gives x=2 and x=-1; the larger is 2." },
  { id: "appdiff-curve-p28", prompt: "For y=2x^3-3x^2-12x, classify the turning point at x=-1.", latex: "y=2x^3-3x^2-12x", answer: "A", difficulty: 5, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "y''(x)=12x-6; evaluate at x=-1.", explanation: "y''(-1)=-18<0, so x=-1 is a local maximum." },
  { id: "appdiff-curve-p29", prompt: "For y=2x^3-3x^2-12x, find the x-value of the point of inflection.", latex: "y=2x^3-3x^2-12x", answer: "0.5", difficulty: 5, acceptedAnswers: ["1/2", "0.5"], hint: "y''(x)=12x-6.", explanation: "y''(x)=12x-6=0 gives x=0.5; sign changes, so an inflection at x=0.5." },
  { id: "appdiff-curve-p30", prompt: "A curve has f'(x)<0 and f''(x)>0 on an interval. It is:", latex: "\\text{Choose one}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "increasing and concave down" }, { label: "B", text: "decreasing and concave up" }, { label: "C", text: "increasing and concave up" }, { label: "D", text: "decreasing and concave down" }], hint: "Read each sign separately.", explanation: "Negative f' is decreasing; positive f'' is concave up." },
];

curveSketchingCalculusLesson.multiPartPractice = [
  {
    id: "appdiff-curve-mp-1",
    prompt:
      "A curve is given by f(x)=x^3-3x^2-9x+2. Answer the parts to sketch its key features.",
    latex: "f(x)=x^3-3x^2-9x+2",
    answer: "2",
    hint: "Find f(0) for the y-intercept, solve f'(x)=0 for turning points, classify with f''.",
    explanation:
      "(a) f(0)=2 is the y-intercept. (b) f'(x)=3x^2-6x-9=3(x-3)(x+1)=0 gives x=-1 and x=3; the larger is 3. (c) f''(x)=6x-6; f''(3)=12>0, so x=3 is a local minimum.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the y-intercept of the curve.", latex: "f(0)", marks: 1, answer: "2", acceptedAnswers: ["2"], hint: "Set x=0.", explanation: "f(0)=2." },
      { key: "b", label: "(b)", prompt: "Find the larger stationary x-value.", latex: "f'(x)=3x^2-6x-9", marks: 2, answer: "3", acceptedAnswers: ["3"], hint: "Factor 3(x-3)(x+1).", explanation: "f'(x)=3(x-3)(x+1)=0 gives x=-1 and x=3; the larger is 3." },
      { key: "c", label: "(c)", prompt: "At x=3, is the turning point a maximum or a minimum? (maximum/minimum)", latex: "f''(x)=6x-6", marks: 2, answer: "minimum", acceptedAnswers: ["Minimum", "local minimum"], hint: "Check the sign of f''(3).", explanation: "f''(3)=12>0, so x=3 is a local minimum." },
    ],
  },
];

optimisationLesson.masteryQuizPool = [
  { id: "appdiff-opt-p1", prompt: "The quantity being maximised or minimised is called the:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "constraint" }, { label: "B", text: "objective function" }, { label: "C", text: "domain" }, { label: "D", text: "endpoint" }], hint: "It is the thing being optimised.", explanation: "The objective function is what we maximise or minimise." },
  { id: "appdiff-opt-p2", prompt: "At a maximum candidate, the second derivative is:", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "negative" }, { label: "B", text: "positive" }, { label: "C", text: "zero only" }, { label: "D", text: "undefined" }], hint: "Concave down at a maximum.", explanation: "f''(a)<0 indicates a local maximum." },
  { id: "appdiff-opt-p3", prompt: "Find the stationary x-value.", latex: "A(x)=x(20-x)", answer: "10", difficulty: 2, acceptedAnswers: ["10"], hint: "Expand then differentiate.", explanation: "A(x)=20x-x^2, A'(x)=20-2x=0 gives x=10." },
  { id: "appdiff-opt-p4", prompt: "Find the stationary x-value.", latex: "A(x)=x(18-x)", answer: "9", difficulty: 2, acceptedAnswers: ["9"], hint: "Expand then differentiate.", explanation: "A(x)=18x-x^2, A'(x)=18-2x=0 gives x=9." },
  { id: "appdiff-opt-p5", prompt: "Find the x-value that maximises R(x).", latex: "R(x)=40x-2x^2", answer: "10", difficulty: 2, acceptedAnswers: ["10"], hint: "R'(x)=40-4x.", explanation: "R'(x)=40-4x=0 gives x=10." },
  { id: "appdiff-opt-p6", prompt: "Find the x-value that minimises C(x).", latex: "C(x)=x^2-6x+20", answer: "3", difficulty: 2, acceptedAnswers: ["3"], hint: "C'(x)=2x-6.", explanation: "C'(x)=2x-6=0 gives x=3 (a minimum since C''=2>0)." },
  { id: "appdiff-opt-p7", prompt: "Find the x-value that minimises C(x).", latex: "C(x)=x^2-10x+40", answer: "5", difficulty: 2, acceptedAnswers: ["5"], hint: "C'(x)=2x-10.", explanation: "C'(x)=2x-10=0 gives x=5." },
  { id: "appdiff-opt-p8", prompt: "Find the minimum value of C(x).", latex: "C(x)=x^2-10x+40", answer: "15", difficulty: 3, acceptedAnswers: ["15"], hint: "Minimum at x=5; substitute.", explanation: "x=5 gives C(5)=25-50+40=15." },
  { id: "appdiff-opt-p9", prompt: "Find the x-value that maximises R(x).", latex: "R(x)=60x-3x^2", answer: "10", difficulty: 3, acceptedAnswers: ["10"], hint: "R'(x)=60-6x.", explanation: "R'(x)=60-6x=0 gives x=10." },
  { id: "appdiff-opt-p10", prompt: "A rectangle has perimeter 30 m and one side x. The area model A(x)=x(15-x) comes from the fact that adjacent sides add to: (number)", latex: "\\text{perimeter }=30", answer: "15", difficulty: 3, acceptedAnswers: ["15"], hint: "Half the perimeter.", explanation: "Two pairs of equal sides sum to the perimeter, so adjacent sides add to 30/2=15." },
  { id: "appdiff-opt-p11", prompt: "A candidate maximum is at x=-2 but the domain is x>=0. The candidate should be:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "rejected as outside the domain" }, { label: "B", text: "accepted automatically" }, { label: "C", text: "changed to +2" }, { label: "D", text: "ignored entirely" }], hint: "Respect the practical domain.", explanation: "A candidate outside the domain is rejected; check valid endpoints instead." },
  { id: "appdiff-opt-p12", prompt: "Find the maximum value of R(x).", latex: "R(x)=12x-x^2", answer: "36", difficulty: 3, acceptedAnswers: ["36"], hint: "Max at x=6; substitute.", explanation: "R'(x)=12-2x=0 gives x=6; R(6)=72-36=36." },
  { id: "appdiff-opt-p13", prompt: "Find the maximum area.", latex: "A(x)=x(16-x)", answer: "64", difficulty: 3, acceptedAnswers: ["64"], hint: "Max at x=8; substitute.", explanation: "A'(x)=16-2x=0 gives x=8; A(8)=8(8)=64." },
  { id: "appdiff-opt-p14", prompt: "C'(4)=0 and C''(4)>0. At x=4 the cost is a:", latex: "C'(4)=0,\\ C''(4)>0", answer: "B", difficulty: 3, choices: [{ label: "A", text: "maximum" }, { label: "B", text: "minimum" }, { label: "C", text: "point of inflection" }, { label: "D", text: "endpoint" }], hint: "Positive second derivative.", explanation: "Positive f'' at a stationary point gives a minimum." },
  { id: "appdiff-opt-p15", prompt: "Find the x-value that maximises P(x).", latex: "P(x)=x(30-2x)", answer: "7.5", difficulty: 4, acceptedAnswers: ["15/2", "7.5"], hint: "Expand: P=30x-2x^2.", explanation: "P(x)=30x-2x^2, P'(x)=30-4x=0 gives x=7.5." },
  { id: "appdiff-opt-p16", prompt: "A revenue model has R'(x)=100-4x on 0<=x<=40. Find the stationary x-value.", latex: "R'(x)=100-4x", answer: "25", difficulty: 4, acceptedAnswers: ["25"], hint: "Set R'(x)=0.", explanation: "100-4x=0 gives x=25, which lies inside the domain." },
  { id: "appdiff-opt-p17", prompt: "For A(x)=x(24-x), find the maximising x.", latex: "A(x)=x(24-x)", answer: "12", difficulty: 4, acceptedAnswers: ["12"], hint: "A=24x-x^2.", explanation: "A'(x)=24-2x=0 gives x=12." },
  { id: "appdiff-opt-p18", prompt: "Find the maximum area.", latex: "A(x)=x(24-x)", answer: "144", difficulty: 4, acceptedAnswers: ["144"], hint: "Max at x=12; substitute.", explanation: "A(12)=12(12)=144." },
  { id: "appdiff-opt-p19", prompt: "A rectangle has perimeter 40. Maximising area A=x(20-x) gives x equal to: (number)", latex: "A=x(20-x)", answer: "10", difficulty: 3, acceptedAnswers: ["10"], hint: "A'(x)=20-2x.", explanation: "A'(x)=20-2x=0 gives x=10 (a square of side 10)." },
  { id: "appdiff-opt-p20", prompt: "For the same rectangle (perimeter 40), find the maximum area.", latex: "A=x(20-x)", answer: "100", difficulty: 4, acceptedAnswers: ["100"], hint: "Substitute x=10.", explanation: "A(10)=10(10)=100, the maximum area." },
  { id: "appdiff-opt-p21", prompt: "A cylinder/box context: minimise C(x)=x^2-8x+30. Find the minimising x.", latex: "C(x)=x^2-8x+30", answer: "4", difficulty: 3, acceptedAnswers: ["4"], hint: "C'(x)=2x-8.", explanation: "C'(x)=2x-8=0 gives x=4." },
  { id: "appdiff-opt-p22", prompt: "For C(x)=x^2-8x+30, find the minimum value.", latex: "C(x)=x^2-8x+30", answer: "14", difficulty: 4, acceptedAnswers: ["14"], hint: "Substitute x=4.", explanation: "C(4)=16-32+30=14." },
  { id: "appdiff-opt-p23", prompt: "A farmer fences a rectangular paddock against a river (no fence on the river side) with 60 m of fencing. With width x and length 60-2x, the area is A=x(60-2x). Find the maximising width x.", latex: "A=x(60-2x)", answer: "15", difficulty: 5, acceptedAnswers: ["15"], hint: "A=60x-2x^2; A'(x)=60-4x.", explanation: "A'(x)=60-4x=0 gives x=15 m; A''=-4<0 confirms a maximum." },
  { id: "appdiff-opt-p24", prompt: "For that paddock (A=x(60-2x)), find the maximum area in square metres.", latex: "A=x(60-2x)", answer: "450", difficulty: 5, acceptedAnswers: ["450"], hint: "Substitute x=15.", explanation: "A(15)=15(60-30)=15(30)=450 m^2." },
  { id: "appdiff-opt-p25", prompt: "A box is made from a square of side 12 by cutting squares of side x from each corner. Its volume is $V(x)=x(12-2x)^2$. Find the x that maximises V (with 0<x<6).", latex: "V(x)=x(12-2x)^2", answer: "2", difficulty: 5, acceptedAnswers: ["2"], hint: "$V'(x)=(12-2x)^2+x\\cdot 2(12-2x)(-2)=(12-2x)(12-6x)$.", explanation: "V'(x)=(12-2x)(12-6x)=0 gives x=6 (rejected) or x=2; x=2 maximises V on 0<x<6." },
  { id: "appdiff-opt-p26", prompt: "For that box ($V(x)=x(12-2x)^2$), find the maximum volume.", latex: "V(x)=x(12-2x)^2", answer: "128", difficulty: 5, acceptedAnswers: ["128"], hint: "Substitute x=2.", explanation: "$V(2)=2(12-4)^2=2(8)^2=2(64)=128$." },
  { id: "appdiff-opt-p27", prompt: "Two numbers have a sum of 20. Their product is P=x(20-x). Find the x that maximises P.", latex: "P=x(20-x)", answer: "10", difficulty: 4, acceptedAnswers: ["10"], hint: "P'(x)=20-2x.", explanation: "P'(x)=20-2x=0 gives x=10; the numbers are 10 and 10." },
  { id: "appdiff-opt-p28", prompt: "A profit function is P(x)=-2x^2+80x-150. Find the x that maximises profit.", latex: "P(x)=-2x^2+80x-150", answer: "20", difficulty: 5, acceptedAnswers: ["20"], hint: "P'(x)=-4x+80.", explanation: "P'(x)=-4x+80=0 gives x=20; P''=-4<0 confirms a maximum." },
  { id: "appdiff-opt-p29", prompt: "For P(x)=-2x^2+80x-150, find the maximum profit.", latex: "P(x)=-2x^2+80x-150", answer: "650", difficulty: 5, acceptedAnswers: ["650"], hint: "Substitute x=20.", explanation: "P(20)=-2(400)+1600-150=-800+1600-150=650." },
  { id: "appdiff-opt-p30", prompt: "A student finds x=14 for a length but the domain is 0<=x<=10. The correct response is to:", latex: "\\text{Choose one}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "round x to 10" }, { label: "B", text: "use x=14 anyway" }, { label: "C", text: "reject it and compare valid endpoints" }, { label: "D", text: "ignore the domain" }], hint: "The candidate is outside the allowed domain.", explanation: "Reject the out-of-domain candidate and check the endpoints x=0 and x=10 for the optimum." },
];

optimisationLesson.multiPartPractice = [
  {
    id: "appdiff-opt-mp-1",
    prompt:
      "A rectangular enclosure is built against a wall, so fencing is needed on only three sides. There are 80 m of fencing. Let the two sides perpendicular to the wall each be x m, so the side parallel to the wall is 80-2x m. The area is A(x)=x(80-2x).",
    latex: "A(x)=x(80-2x)",
    answer: "20",
    hint: "Differentiate A, solve A'(x)=0, then substitute to find the maximum area.",
    explanation:
      "(a) A(x)=80x-2x^2, so A'(x)=80-4x. (b) A'(x)=0 gives x=20 m (A''=-4<0, a maximum). (c) A(20)=20(80-40)=20(40)=800 m^2.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find A'(x) at x=0 (a number).", latex: "A'(x)=80-4x", marks: 1, answer: "80", acceptedAnswers: ["80"], hint: "A(x)=80x-2x^2; differentiate and substitute x=0.", explanation: "A'(x)=80-4x, so A'(0)=80." },
      { key: "b", label: "(b)", prompt: "Find the value of x that maximises the area.", latex: "A'(x)=0", marks: 2, answer: "20", acceptedAnswers: ["20"], hint: "Solve 80-4x=0.", explanation: "80-4x=0 gives x=20 m; A''=-4<0 confirms a maximum." },
      { key: "c", label: "(c)", prompt: "Find the maximum area in square metres.", latex: "A(20)", marks: 2, answer: "800", acceptedAnswers: ["800"], hint: "Substitute x=20 into A.", explanation: "A(20)=20(80-40)=20(40)=800 m^2." },
    ],
  },
];

kinematicsRatesChangeLesson.masteryQuizPool = [
  { id: "appdiff-kin-p1", prompt: "Velocity is the derivative of:", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "displacement" }, { label: "B", text: "acceleration" }, { label: "C", text: "speed" }, { label: "D", text: "time" }], hint: "v=s'(t).", explanation: "Velocity is the derivative of displacement." },
  { id: "appdiff-kin-p2", prompt: "Acceleration is the derivative of:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "displacement" }, { label: "B", text: "velocity" }, { label: "C", text: "speed only" }, { label: "D", text: "time" }], hint: "a=v'(t).", explanation: "Acceleration is the derivative of velocity (the second derivative of displacement)." },
  { id: "appdiff-kin-p3", prompt: "A particle is momentarily at rest when:", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "s(t)=0" }, { label: "B", text: "a(t)=0" }, { label: "C", text: "v(t)=0" }, { label: "D", text: "t=0" }], hint: "Zero velocity.", explanation: "At rest means v(t)=0." },
  { id: "appdiff-kin-p4", prompt: "Find the time the particle is at rest.", latex: "v(t)=3t-12", answer: "4", difficulty: 2, acceptedAnswers: ["4"], hint: "Solve v(t)=0.", explanation: "3t-12=0 gives t=4." },
  { id: "appdiff-kin-p5", prompt: "Find the time the particle is at rest.", latex: "v(t)=5t-20", answer: "4", difficulty: 2, acceptedAnswers: ["4"], hint: "Solve v(t)=0.", explanation: "5t-20=0 gives t=4." },
  { id: "appdiff-kin-p6", prompt: "Find the speed when v=-7 m/s.", latex: "v=-7", answer: "7", difficulty: 2, acceptedAnswers: ["7", "7 m/s"], hint: "Speed is |v|.", explanation: "Speed=|-7|=7 m/s." },
  { id: "appdiff-kin-p7", prompt: "For s(t)=t^2+3t, find v(2).", latex: "s(t)=t^2+3t", answer: "7", difficulty: 3, acceptedAnswers: ["7"], hint: "v(t)=2t+3.", explanation: "v(t)=2t+3, so v(2)=7." },
  { id: "appdiff-kin-p8", prompt: "For v(t)=4t-5, find a(3).", latex: "v(t)=4t-5", answer: "4", difficulty: 3, acceptedAnswers: ["4"], hint: "a(t)=v'(t).", explanation: "a(t)=4, so a(3)=4 (constant acceleration)." },
  { id: "appdiff-kin-p9", prompt: "Find the displacement from t=0 to t=3 given s(0)=2, s(3)=11.", latex: "s(0)=2,\\ s(3)=11", answer: "9", difficulty: 3, acceptedAnswers: ["9"], hint: "Displacement is the change in position.", explanation: "s(3)-s(0)=11-2=9." },
  { id: "appdiff-kin-p10", prompt: "For s(t)=t^3, find a(2).", latex: "s(t)=t^3", answer: "12", difficulty: 3, acceptedAnswers: ["12"], hint: "v=3t^2, a=6t.", explanation: "v(t)=3t^2, a(t)=6t, so a(2)=12." },
  { id: "appdiff-kin-p11", prompt: "A velocity of -6 m/s corresponds to a speed of: (number, m/s)", latex: "v=-6", answer: "6", difficulty: 2, acceptedAnswers: ["6", "6 m/s"], hint: "Speed is |v|.", explanation: "Speed=|-6|=6 m/s; the sign only shows direction." },
  { id: "appdiff-kin-p12", prompt: "For v(t)=3t^2-6t+1, find a(0).", latex: "v(t)=3t^2-6t+1", answer: "-6", difficulty: 3, acceptedAnswers: ["-6", "−6"], hint: "a(t)=6t-6.", explanation: "a(t)=6t-6, so a(0)=-6." },
  { id: "appdiff-kin-p13", prompt: "If v changes sign from positive to negative, the particle:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "stops forever" }, { label: "B", text: "changes direction" }, { label: "C", text: "has zero displacement" }, { label: "D", text: "speeds up" }], hint: "A sign change in v.", explanation: "A change of sign in velocity means the particle reverses direction." },
  { id: "appdiff-kin-p14", prompt: "For s(t)=t^2-6t+5, find the time the particle is at rest.", latex: "s(t)=t^2-6t+5", answer: "3", difficulty: 4, acceptedAnswers: ["3"], hint: "v(t)=2t-6; set to 0.", explanation: "v(t)=2t-6=0 gives t=3." },
  { id: "appdiff-kin-p15", prompt: "For s(t)=t^3-6t^2+9t, find the first time the particle is at rest.", latex: "s(t)=t^3-6t^2+9t", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "v(t)=3t^2-12t+9=3(t-1)(t-3).", explanation: "v(t)=3(t-1)(t-3)=0 gives t=1 and t=3; the first is t=1." },
  { id: "appdiff-kin-p16", prompt: "For s(t)=t^3-6t^2+9t, find the second time the particle is at rest.", latex: "s(t)=t^3-6t^2+9t", answer: "3", difficulty: 4, acceptedAnswers: ["3"], hint: "v(t)=3(t-1)(t-3).", explanation: "The rest times are t=1 and t=3; the second is t=3." },
  { id: "appdiff-kin-p17", prompt: "For v(t)=t^2-5t+4, find the first time the particle is at rest.", latex: "v(t)=t^2-5t+4", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "Factor (t-1)(t-4).", explanation: "(t-1)(t-4)=0 gives t=1 and t=4; the first is t=1." },
  { id: "appdiff-kin-p18", prompt: "Find the speed when v(2)=-9.", latex: "v(2)=-9", answer: "9", difficulty: 3, acceptedAnswers: ["9", "9 m/s"], hint: "Speed is |v|.", explanation: "Speed=|-9|=9 m/s." },
  { id: "appdiff-kin-p19", prompt: "A particle moves from s=0 to s=5, then back to s=2. Find the total distance travelled.", latex: "\\text{0}\\to\\text{5}\\to\\text{2}", answer: "8", difficulty: 4, acceptedAnswers: ["8"], hint: "Add the distance of each leg.", explanation: "Forward 5 then back 3: total distance =5+3=8 (displacement is only 2)." },
  { id: "appdiff-kin-p20", prompt: "For the same motion (0 to 5 to 2), find the displacement.", latex: "\\text{0}\\to\\text{5}\\to\\text{2}", answer: "2", difficulty: 3, acceptedAnswers: ["2"], hint: "Net change in position.", explanation: "Final minus initial position =2-0=2." },
  { id: "appdiff-kin-p21", prompt: "Speed is correctly described as:", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "always negative" }, { label: "B", text: "the same as velocity" }, { label: "C", text: "including direction" }, { label: "D", text: "the magnitude of velocity" }], hint: "Speed has no sign.", explanation: "Speed is |v|, the magnitude of velocity." },
  { id: "appdiff-kin-p22", prompt: "For s(t)=t^3-3t^2, find a(3).", latex: "s(t)=t^3-3t^2", answer: "12", difficulty: 4, acceptedAnswers: ["12"], hint: "v=3t^2-6t, a=6t-6.", explanation: "v(t)=3t^2-6t, a(t)=6t-6, so a(3)=12." },
  { id: "appdiff-kin-p23", prompt: "For s(t)=t^3-6t^2+9t, the particle is at rest at t=1. Find its acceleration there.", latex: "s(t)=t^3-6t^2+9t", answer: "-6", difficulty: 5, acceptedAnswers: ["-6", "−6"], hint: "a(t)=6t-12; substitute t=1.", explanation: "v(t)=3t^2-12t+9, a(t)=6t-12, so a(1)=-6." },
  { id: "appdiff-kin-p24", prompt: "For s(t)=t^3-6t^2+9t, the particle is at rest at t=3. Find its acceleration there.", latex: "s(t)=t^3-6t^2+9t", answer: "6", difficulty: 5, acceptedAnswers: ["6"], hint: "a(t)=6t-12; substitute t=3.", explanation: "a(t)=6t-12, so a(3)=6." },
  { id: "appdiff-kin-p25", prompt: "For s(t)=t^3-6t^2+9t, find the displacement at the first rest time t=1.", latex: "s(t)=t^3-6t^2+9t", answer: "4", difficulty: 5, acceptedAnswers: ["4"], hint: "Substitute t=1 into s.", explanation: "s(1)=1-6+9=4." },
  { id: "appdiff-kin-p26", prompt: "For s(t)=2t^3-9t^2+12t, find the first time the particle is at rest.", latex: "s(t)=2t^3-9t^2+12t", answer: "1", difficulty: 5, acceptedAnswers: ["1"], hint: "v(t)=6t^2-18t+12=6(t-1)(t-2).", explanation: "v(t)=6(t-1)(t-2)=0 gives t=1 and t=2; the first is t=1." },
  { id: "appdiff-kin-p27", prompt: "For s(t)=2t^3-9t^2+12t, find the acceleration at t=2.", latex: "s(t)=2t^3-9t^2+12t", answer: "6", difficulty: 5, acceptedAnswers: ["6"], hint: "a(t)=12t-18; substitute t=2.", explanation: "v(t)=6t^2-18t+12, a(t)=12t-18, so a(2)=6." },
  { id: "appdiff-kin-p28", prompt: "A particle has v(t)=t^2-4. For t>=0, find the time it is at rest.", latex: "v(t)=t^2-4", answer: "2", difficulty: 5, acceptedAnswers: ["2"], hint: "t^2-4=0 with t>=0.", explanation: "t^2-4=0 gives t=2 (taking t>=0)." },
  { id: "appdiff-kin-p29", prompt: "For v(t)=t^2-4 (t>=0), find the acceleration at the rest time.", latex: "v(t)=t^2-4", answer: "4", difficulty: 5, acceptedAnswers: ["4"], hint: "a(t)=2t; the rest time is t=2.", explanation: "a(t)=2t, and the rest time is t=2, so a=4." },
  { id: "appdiff-kin-p30", prompt: "A velocity-time relationship gives v(t)=6-2t. The particle's acceleration is constant and equal to: (number)", latex: "v(t)=6-2t", answer: "-2", difficulty: 3, acceptedAnswers: ["-2", "−2"], hint: "a(t)=v'(t).", explanation: "a(t)=-2: a constant negative acceleration." },
];

kinematicsRatesChangeLesson.multiPartPractice = [
  {
    id: "appdiff-kin-mp-1",
    prompt:
      "A particle moves in a straight line with displacement s(t)=t^3-6t^2+9t metres, where t is in seconds and t>=0. Answer the parts about its motion.",
    latex: "s(t)=t^3-6t^2+9t",
    answer: "1",
    hint: "Differentiate for v(t), set v=0 for rest times, then differentiate again for acceleration.",
    explanation:
      "(a) $v(t)=3t^2-12t+9=3(t-1)(t-3)$, so the first rest time is t=1 s. (b) a(t)=6t-12, so a(1)=-6 m/s². (c) s(1)=1-6+9=4 m.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the first time (in seconds) the particle is at rest.", latex: "v(t)=3t^2-12t+9", marks: 2, answer: "1", acceptedAnswers: ["1"], hint: "Factor 3(t-1)(t-3) and set to zero.", explanation: "v(t)=3(t-1)(t-3)=0 gives t=1 and t=3; the first is t=1 s." },
      { key: "b", label: "(b)", prompt: "Find the acceleration (in m/s²) at t=1.", latex: "a(t)=6t-12", marks: 2, answer: "-6", acceptedAnswers: ["-6", "−6"], hint: "Differentiate v(t) and substitute t=1.", explanation: "a(t)=6t-12, so a(1)=6-12=-6 m/s²." },
      { key: "c", label: "(c)", prompt: "Find the displacement (in metres) at t=1.", latex: "s(1)", marks: 2, answer: "4", acceptedAnswers: ["4"], hint: "Substitute t=1 into s(t).", explanation: "s(1)=1-6+9=4 m." },
    ],
  },
];

applicationsDifferentiationExamPracticeLesson.masteryQuizPool = [
  { id: "appdiff-exam-p1", prompt: "f'(a)=0 and f''(a)>0 gives a:", latex: "f''(a)>0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Concave up.", explanation: "Positive f'' gives a local minimum." },
  { id: "appdiff-exam-p2", prompt: "f'(a)=0 and f''(a)<0 gives a:", latex: "f''(a)<0", answer: "A", difficulty: 1, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Concave down.", explanation: "Negative f'' gives a local maximum." },
  { id: "appdiff-exam-p3", prompt: "A particle is at rest when:", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "v(t)=0" }, { label: "B", text: "s(t)=0" }, { label: "C", text: "a(t)=0" }, { label: "D", text: "t=0" }], hint: "Zero velocity.", explanation: "At rest means v(t)=0." },
  { id: "appdiff-exam-p4", prompt: "Find the possible inflection x-value.", latex: "f''(x)=2x-6", answer: "3", difficulty: 2, acceptedAnswers: ["3"], hint: "Solve f''(x)=0.", explanation: "2x-6=0 gives x=3." },
  { id: "appdiff-exam-p5", prompt: "Find the x-value that maximises P(x).", latex: "P(x)=16x-x^2", answer: "8", difficulty: 2, acceptedAnswers: ["8"], hint: "P'(x)=16-2x.", explanation: "P'(x)=16-2x=0 gives x=8." },
  { id: "appdiff-exam-p6", prompt: "For s(t)=2t^2-3t, find v(2).", latex: "s(t)=2t^2-3t", answer: "5", difficulty: 3, acceptedAnswers: ["5"], hint: "v(t)=4t-3.", explanation: "v(t)=4t-3, so v(2)=5." },
  { id: "appdiff-exam-p7", prompt: "Find the minimum x-value candidate.", latex: "C'(x)=2x-14", answer: "7", difficulty: 2, acceptedAnswers: ["7"], hint: "Solve C'(x)=0.", explanation: "2x-14=0 gives x=7." },
  { id: "appdiff-exam-p8", prompt: "f' goes + 0 - across x=2. Classify x=2.", latex: "\\begin{array}{c|ccc}x&x<2&2&x>2\\\\\\hline f'(x)&+&0&-\\end{array}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "Increasing then decreasing.", explanation: "f' changes + to -, so a local maximum." },
  { id: "appdiff-exam-p9", prompt: "Find the x-value that maximises R(x).", latex: "R(x)=24x-2x^2", answer: "6", difficulty: 3, acceptedAnswers: ["6"], hint: "R'(x)=24-4x.", explanation: "R'(x)=24-4x=0 gives x=6." },
  { id: "appdiff-exam-p10", prompt: "For s(t)=t^3-3t^2, find a(3).", latex: "s(t)=t^3-3t^2", answer: "12", difficulty: 3, acceptedAnswers: ["12"], hint: "v=3t^2-6t, a=6t-6.", explanation: "v(t)=3t^2-6t, a(t)=6t-6, so a(3)=12." },
  { id: "appdiff-exam-p11", prompt: "A particle has v(t)<0. Its speed is:", latex: "\\text{Choose one}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "negative" }, { label: "B", text: "zero" }, { label: "C", text: "equal to acceleration" }, { label: "D", text: "the positive magnitude of velocity" }], hint: "Speed is |v|.", explanation: "Speed is the magnitude of velocity, always non-negative." },
  { id: "appdiff-exam-p12", prompt: "f'(2)=0 and f''(2)=0. The second derivative test is:", latex: "f'(2)=0,\\ f''(2)=0", answer: "D", difficulty: 3, choices: [{ label: "A", text: "a maximum" }, { label: "B", text: "a minimum" }, { label: "C", text: "no stationary point" }, { label: "D", text: "inconclusive" }], hint: "f''=0 gives no information.", explanation: "The second derivative test is inconclusive; use a first derivative sign test." },
  { id: "appdiff-exam-p13", prompt: "A curve has f'(x)<0 and f''(x)>0 on an interval. It is:", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "increasing and concave down" }, { label: "B", text: "decreasing and concave up" }, { label: "C", text: "increasing and concave up" }, { label: "D", text: "decreasing and concave down" }], hint: "Read each sign separately.", explanation: "Negative f' is decreasing; positive f'' is concave up." },
  { id: "appdiff-exam-p14", prompt: "For f(x)=x^2-10x+7, find the stationary x-value.", latex: "f(x)=x^2-10x+7", answer: "5", difficulty: 3, acceptedAnswers: ["5"], hint: "f'(x)=2x-10.", explanation: "f'(x)=2x-10=0 gives x=5." },
  { id: "appdiff-exam-p15", prompt: "Does the sign chart confirm a point of inflection at x=-2? (yes/no)", latex: "\\begin{array}{c|ccc}x&x<-2&-2&x>-2\\\\\\hline f''(x)&+&0&+\\end{array}", answer: "no", difficulty: 3, acceptedAnswers: ["No"], hint: "Does f'' change sign?", explanation: "No sign change in f'', so no inflection." },
  { id: "appdiff-exam-p16", prompt: "For f(x)=x^3-6x^2+9x-2, find the smaller stationary x-value.", latex: "f(x)=x^3-6x^2+9x-2", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "f'(x)=3x^2-12x+9=3(x-1)(x-3).", explanation: "f'(x)=3(x-1)(x-3)=0 gives x=1 and x=3; the smaller is 1." },
  { id: "appdiff-exam-p17", prompt: "For f(x)=x^3-6x^2+9x-2, classify the stationary point at x=1.", latex: "f(x)=x^3-6x^2+9x-2", answer: "A", difficulty: 4, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=6x-12; evaluate at x=1.", explanation: "f''(1)=-6<0, so x=1 is a local maximum." },
  { id: "appdiff-exam-p18", prompt: "For the box-with-no-lid problem A(x)=x(40-2x), find the x that maximises A.", latex: "A(x)=x(40-2x)", answer: "10", difficulty: 4, acceptedAnswers: ["10"], hint: "A=40x-2x^2; A'(x)=40-4x.", explanation: "A'(x)=40-4x=0 gives x=10." },
  { id: "appdiff-exam-p19", prompt: "For A(x)=x(40-2x), find the maximum value.", latex: "A(x)=x(40-2x)", answer: "200", difficulty: 4, acceptedAnswers: ["200"], hint: "Substitute x=10.", explanation: "A(10)=10(40-20)=10(20)=200." },
  { id: "appdiff-exam-p20", prompt: "For s(t)=t^3-6t^2+9t, find the first rest time.", latex: "s(t)=t^3-6t^2+9t", answer: "1", difficulty: 4, acceptedAnswers: ["1"], hint: "v(t)=3(t-1)(t-3).", explanation: "v(t)=3t^2-12t+9=3(t-1)(t-3)=0 gives t=1 and t=3; the first is t=1." },
  { id: "appdiff-exam-p21", prompt: "A candidate optimum lies outside the stated domain. The correct response is to:", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "reject it or compare valid endpoints" }, { label: "B", text: "always accept it" }, { label: "C", text: "change its sign" }, { label: "D", text: "ignore the objective" }], hint: "Respect the domain.", explanation: "Out-of-domain candidates are rejected; compare valid endpoints instead." },
  { id: "appdiff-exam-p22", prompt: "For v(t)=t^2-7t+12, find the first rest time.", latex: "v(t)=t^2-7t+12", answer: "3", difficulty: 4, acceptedAnswers: ["3"], hint: "Factor (t-3)(t-4).", explanation: "(t-3)(t-4)=0 gives t=3 and t=4; the first is t=3." },
  { id: "appdiff-exam-p23", prompt: "For f(x)=2x^3-3x^2-12x+1, find the larger stationary x-value.", latex: "f(x)=2x^3-3x^2-12x+1", answer: "2", difficulty: 5, acceptedAnswers: ["2"], hint: "f'(x)=6x^2-6x-12=6(x-2)(x+1).", explanation: "f'(x)=6(x-2)(x+1)=0 gives x=2 and x=-1; the larger is 2." },
  { id: "appdiff-exam-p24", prompt: "For f(x)=2x^3-3x^2-12x+1, classify the stationary point at x=2.", latex: "f(x)=2x^3-3x^2-12x+1", answer: "B", difficulty: 5, choices: [{ label: "A", text: "local maximum" }, { label: "B", text: "local minimum" }, { label: "C", text: "horizontal inflection" }, { label: "D", text: "no stationary point" }], hint: "f''(x)=12x-6; evaluate at x=2.", explanation: "f''(2)=18>0, so x=2 is a local minimum." },
  { id: "appdiff-exam-p25", prompt: "For s(t)=t^3-9t^2+24t, find the first rest time.", latex: "s(t)=t^3-9t^2+24t", answer: "2", difficulty: 5, acceptedAnswers: ["2"], hint: "v(t)=3t^2-18t+24=3(t-2)(t-4).", explanation: "v(t)=3(t-2)(t-4)=0 gives t=2 and t=4; the first is t=2." },
  { id: "appdiff-exam-p26", prompt: "For s(t)=t^3-9t^2+24t, find the acceleration at the first rest time t=2.", latex: "s(t)=t^3-9t^2+24t", answer: "-6", difficulty: 5, acceptedAnswers: ["-6", "−6"], hint: "a(t)=6t-18; substitute t=2.", explanation: "a(t)=6t-18, so a(2)=12-18=-6." },
  { id: "appdiff-exam-p27", prompt: "A revenue model R(x)=-x^2+50x has a maximum. Find the x that maximises it.", latex: "R(x)=-x^2+50x", answer: "25", difficulty: 4, acceptedAnswers: ["25"], hint: "R'(x)=-2x+50.", explanation: "R'(x)=-2x+50=0 gives x=25." },
  { id: "appdiff-exam-p28", prompt: "For R(x)=-x^2+50x, find the maximum revenue.", latex: "R(x)=-x^2+50x", answer: "625", difficulty: 5, acceptedAnswers: ["625"], hint: "Substitute x=25.", explanation: "R(25)=-625+1250=625." },
  { id: "appdiff-exam-p29", prompt: "For f(x)=x^3-3x^2+4, find the x-value of the point of inflection.", latex: "f(x)=x^3-3x^2+4", answer: "1", difficulty: 5, acceptedAnswers: ["1"], hint: "f''(x)=6x-6.", explanation: "f'(x)=3x^2-6x, f''(x)=6x-6=0 gives x=1; sign changes, so inflection at x=1." },
  { id: "appdiff-exam-p30", prompt: "A motion question asks for total distance after a direction change. The correct method is to:", latex: "\\text{Choose one}", answer: "D", difficulty: 4, choices: [{ label: "A", text: "use final displacement only" }, { label: "B", text: "use acceleration only" }, { label: "C", text: "ignore the turn" }, { label: "D", text: "split at rest times and add absolute changes in position" }], hint: "Distance counts every leg.", explanation: "Total distance splits the motion at rest times and sums the absolute changes in position." },
];

applicationsDifferentiationExamPracticeLesson.multiPartPractice = [
  {
    id: "appdiff-exam-mp-1",
    prompt:
      "A company's profit (in thousands of dollars) from producing x hundred items is P(x)=-x^2+24x-80, for 0<=x<=20. Answer the parts about maximising profit.",
    latex: "P(x)=-x^2+24x-80",
    answer: "12",
    hint: "Differentiate, solve P'(x)=0, then substitute for the maximum profit.",
    explanation:
      "(a) P'(x)=-2x+24. (b) P'(x)=0 gives x=12 (P''=-2<0, a maximum), inside the domain. (c) P(12)=-144+288-80=64, i.e. $64 thousand.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find P'(x) at x=0 (a number).", latex: "P'(x)=-2x+24", marks: 1, answer: "24", acceptedAnswers: ["24"], hint: "Differentiate P and substitute x=0.", explanation: "P'(x)=-2x+24, so P'(0)=24." },
      { key: "b", label: "(b)", prompt: "Find the value of x that maximises profit.", latex: "P'(x)=0", marks: 2, answer: "12", acceptedAnswers: ["12"], hint: "Solve -2x+24=0 and confirm it lies in 0<=x<=20.", explanation: "-2x+24=0 gives x=12; P''=-2<0 confirms a maximum and x=12 is inside the domain." },
      { key: "c", label: "(c)", prompt: "Find the maximum profit (in thousands of dollars).", latex: "P(12)", marks: 2, answer: "64", acceptedAnswers: ["64"], hint: "Substitute x=12 into P.", explanation: "P(12)=-144+288-80=64, i.e. $64 thousand." },
    ],
  },
];

export const applicationsDifferentiationOutline: LessonOutlineItem[] =
  applicationsDifferentiationLessons.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    status: item.status,
  }));
