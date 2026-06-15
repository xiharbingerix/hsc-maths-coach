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
      "The second derivative is the derivative of the first derivative. It describes how the gradient is changing.",
      "If f''(x) is positive on an interval, the graph is concave up on that interval.",
      "If f''(x) is negative on an interval, the graph is concave down on that interval.",
      "A possible point of inflection occurs where f''(x) is zero or undefined, but this must be checked.",
      "A point of inflection requires a change in concavity. The condition f''(x) = 0 by itself is not enough.",
    ],
    latexBlocks: [
      "f''(x)>0\\Rightarrow \\text{concave up}",
      "f''(x)<0\\Rightarrow \\text{concave down}",
      "f''(x)=0\\Rightarrow \\text{possible point of inflection}",
      "\\text{point of inflection}\\Rightarrow \\text{concavity changes}",
    ],
  },
  [
    {
      title: "Concavity from a second derivative",
      questionLatex: "f''(x)=6x-12",
      steps: [
        { explanation: "Set the second derivative equal to zero to find the possible change point.", latex: "6x-12=0\\Rightarrow x=2" },
        { explanation: "Test either side of x = 2.", latex: "f''(1)<0,\\quad f''(3)>0" },
        { explanation: "The concavity changes from down to up.", latex: "\\text{inflection at }x=2" },
      ],
      finalAnswerLatex: "x=2",
    },
    {
      title: "No inflection despite f''(x) = 0",
      questionLatex: "f(x)=x^4",
      steps: [
        { explanation: "Differentiate twice.", latex: "f''(x)=12x^2" },
        { explanation: "The second derivative is zero at x = 0.", latex: "12x^2=0" },
        { explanation: "But f''(x) is positive on both sides of 0, so concavity does not change." },
      ],
      finalAnswerLatex: "\\text{No point of inflection at }x=0",
    },
    {
      title: "Concavity from a sign chart",
      questionLatex:
        "\\begin{array}{c|ccc}x&(-\\infty,1)&1&(1,\\infty)\\\\\\hline f''(x)&+&0&-\\end{array}",
      steps: [
        { explanation: "A positive second derivative means concave up." },
        { explanation: "A negative second derivative means concave down." },
        { explanation: "The sign changes at x = 1, so there is a point of inflection." },
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
      "Stationary points occur where the derivative is zero, provided the derivative exists.",
      "The second derivative test is quick when f'' is non-zero at the stationary point.",
      "If f'' is positive at the stationary point, the graph is concave up there and the point is a local minimum.",
      "If f'' is negative at the stationary point, the graph is concave down there and the point is a local maximum.",
      "If f'' is zero, the second derivative test is inconclusive. Use a first derivative sign test or another method.",
    ],
    latexBlocks: [
      "f'(a)=0\\Rightarrow \\text{stationary point candidate}",
      "f''(a)>0\\Rightarrow \\text{local minimum}",
      "f''(a)<0\\Rightarrow \\text{local maximum}",
      "f''(a)=0\\Rightarrow \\text{test inconclusive}",
    ],
  },
  [
    {
      title: "Classify using the second derivative",
      questionLatex: "f'(2)=0,\\quad f''(2)=5",
      steps: [
        { explanation: "The first derivative is zero, so x = 2 is stationary." },
        { explanation: "The second derivative is positive.", latex: "f''(2)>0" },
        { explanation: "A positive second derivative indicates a local minimum." },
      ],
      finalAnswerLatex: "\\text{Local minimum}",
    },
    {
      title: "Second derivative test is inconclusive",
      questionLatex: "f'(0)=0,\\quad f''(0)=0",
      steps: [
        { explanation: "The point is stationary because f'(0)=0." },
        { explanation: "The second derivative test cannot classify it because f''(0)=0." },
        { explanation: "Use a first derivative sign test or inspect higher information." },
      ],
      finalAnswerLatex: "\\text{Inconclusive from the second derivative test}",
    },
    {
      title: "Classify from first derivative signs",
      questionLatex:
        "\\begin{array}{c|ccc}x&x<1&1&x>1\\\\\\hline f'(x)&+&0&-\\end{array}",
      steps: [
        { explanation: "The derivative changes from positive to negative." },
        { explanation: "The graph increases then decreases." },
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
      "Curve sketching with calculus combines several features, not just one calculation.",
      "Intercepts locate where a graph meets the axes. Stationary points describe where the gradient is zero.",
      "First derivative signs describe increasing and decreasing intervals.",
      "Second derivative signs describe concavity and possible points of inflection.",
      "In this renderer, curve-sketch questions use descriptions and multiple-choice graph features rather than drawn sketches.",
    ],
    latexBlocks: [
      "f'(x)>0\\Rightarrow \\text{increasing}",
      "f'(x)<0\\Rightarrow \\text{decreasing}",
      "f''(x)>0\\Rightarrow \\text{concave up}",
      "f''(x)<0\\Rightarrow \\text{concave down}",
    ],
  },
  [
    {
      title: "Read a derivative sign chart",
      questionLatex:
        "\\begin{array}{c|ccc}x&x<1&1&x>1\\\\\\hline f'(x)&+&0&-\\end{array}",
      steps: [
        { explanation: "The graph increases before x = 1." },
        { explanation: "The graph decreases after x = 1." },
        { explanation: "This indicates a local maximum at x = 1." },
      ],
      finalAnswerLatex: "\\text{Local maximum at }x=1",
    },
    {
      title: "Match concavity and stationary information",
      questionLatex: "f'(2)=0,\\quad f''(2)>0",
      steps: [
        { explanation: "The derivative is zero, so x = 2 is stationary." },
        { explanation: "The second derivative is positive, so the graph is concave up there." },
      ],
      finalAnswerLatex: "\\text{Local minimum at }x=2",
    },
    {
      title: "Combine features",
      questionLatex:
        "\\text{A graph has x-intercepts }-1\\text{ and }3,\\text{ a local maximum at }x=0,\\text{ and is concave down near }x=0.",
      steps: [
        { explanation: "The graph crosses or touches the x-axis at the listed intercepts." },
        { explanation: "The local maximum means the graph rises then falls near x = 0." },
        { explanation: "Concave down near the maximum is consistent with a cap shape." },
      ],
      finalAnswerLatex: "\\text{Choose the description matching all features.}",
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
      "In kinematics, displacement s(t) gives position relative to an origin.",
      "Velocity is the derivative of displacement. Acceleration is the derivative of velocity, or the second derivative of displacement.",
      "A particle is momentarily at rest when its velocity is zero.",
      "Velocity has direction because it can be positive or negative. Speed is the magnitude of velocity and is never negative.",
      "Displacement is net change in position. Total distance counts the length travelled, including changes of direction.",
    ],
    latexBlocks: [
      "v(t)=s'(t)",
      "a(t)=v'(t)=s''(t)",
      "\\text{at rest}\\Rightarrow v(t)=0",
      "\\text{speed}=|v(t)|",
      "\\text{displacement}=s(b)-s(a)",
    ],
  },
  [
    {
      title: "Find velocity and acceleration",
      questionLatex: "s(t)=t^3-6t^2+9t",
      steps: [
        { explanation: "Velocity is the derivative of displacement.", latex: "v(t)=3t^2-12t+9" },
        { explanation: "Acceleration is the derivative of velocity.", latex: "a(t)=6t-12" },
      ],
      finalAnswerLatex: "v(t)=3t^2-12t+9,\\quad a(t)=6t-12",
    },
    {
      title: "Momentarily at rest",
      questionLatex: "v(t)=2t-8",
      steps: [
        { explanation: "At rest means velocity is zero.", latex: "2t-8=0" },
        { explanation: "Solve for time.", latex: "t=4" },
      ],
      finalAnswerLatex: "t=4",
    },
    {
      title: "Speed from velocity",
      questionLatex: "v(3)=-5\\text{ m/s}",
      steps: [
        { explanation: "Speed is the magnitude of velocity." },
        { explanation: "Take the absolute value.", latex: "|-5|=5" },
      ],
      finalAnswerLatex: "5\\text{ m/s}",
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
  optimisationLesson,
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
