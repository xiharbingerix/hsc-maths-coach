import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const radiansExactValuesUnitCircleLesson: ExplicitLesson = {
  id: "radians-exact-values-unit-circle",
  slug: "radians-exact-values-unit-circle",
  moduleSlug: "ma-t1-trigonometry-and-measure-of-angles",
  moduleTitle: "Trigonometry and Measure of Angles",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Radians, Exact Values, and the Unit Circle",
  description:
    "Use radians, exact trigonometric values, and the unit circle to interpret sine, cosine, tangent, and quadrant signs.",
  syllabusArea: "Trigonometric Functions",
  focus: "Trigonometric functions and graphs",
  status: "active",

  video: {
    title: "Radians, Exact Values, and the Unit Circle",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how radians, exact values, and the unit circle connect angles to sine, cosine, and tangent.",

  successCriteria: [
    "Convert common angles between degrees and radians.",
    "Use the unit circle to connect cosine with the x-coordinate and sine with the y-coordinate.",
    "Recall exact values for common angles.",
    "Determine the sign of sine, cosine, and tangent from the quadrant.",
    "Recognise where tangent is undefined.",
  ],

  teaching: {
    paragraphs: [
      "Radians measure angle using arc length compared with radius. A full turn is $2\\pi$ radians, so $180^\\circ=\\pi$ radians.",
      "To convert degrees to radians, multiply by $\\frac{\\pi}{180}$. To convert radians to degrees, multiply by $\\frac{180}{\\pi}$.",
      "On the unit circle, a point at angle $\\theta$ has coordinates $(\\cos\\theta,\\sin\\theta)$.",
      "This means $\\cos\\theta$ is the x-coordinate and $\\sin\\theta$ is the y-coordinate.",
      "Tangent is defined by $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$ when $\\cos\\theta\\ne0$.",
      "Quadrants determine signs. In quadrant II, sine is positive and cosine is negative.",
    ],
    latexBlocks: [
      "180^\\circ=\\pi\\text{ radians}",
      "\\theta^\\circ=\\theta\\times\\frac{\\pi}{180}",
      "(x,y)=(\\cos\\theta,\\sin\\theta)",
      "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta},\\quad \\cos\\theta\\ne0",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Convert to radians",
      questionLatex:
        "150^\\circ \\quad \\text{convert to radians and identify the quadrant.}",
      steps: [
        {
          explanation: "Multiply by $\\frac{\\pi}{180}$.",
          latex: "150^\\circ=150\\times\\frac{\\pi}{180}",
        },
        {
          explanation: "Simplify the fraction.",
          latex: "150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}",
        },
        {
          explanation: "Since $150^\\circ$ is between $90^\\circ$ and $180^\\circ$, it is in quadrant II.",
          latex: "\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi",
        },
      ],
      finalAnswerLatex: "\\frac{5\\pi}{6},\\quad \\text{quadrant II}",
    },
    {
      title: "Worked example 2: Exact values",
      questionLatex:
        "\\sin\\left(\\frac{\\pi}{3}\\right),\\quad \\cos(\\pi),\\quad \\tan\\left(\\frac{\\pi}{4}\\right)",
      steps: [
        {
          explanation: "Use the exact value for $\\frac{\\pi}{3}$.",
          latex: "\\sin\\left(\\frac{\\pi}{3}\\right)=\\frac{\\sqrt3}{2}",
        },
        {
          explanation: "At $\\pi$ radians, the unit circle point is $(-1,0)$.",
          latex: "\\cos(\\pi)=-1",
        },
        {
          explanation: "At $\\frac{\\pi}{4}$, sine and cosine are equal, so tangent is 1.",
          latex: "\\tan\\left(\\frac{\\pi}{4}\\right)=1",
        },
      ],
      finalAnswerLatex:
        "\\frac{\\sqrt3}{2},\\quad -1,\\quad 1",
    },
    {
      title: "Worked example 3: Signs from the unit circle",
      questionLatex:
        "\\text{Find the signs of }\\sin\\left(\\frac{5\\pi}{6}\\right)\\text{ and }\\cos\\left(\\frac{5\\pi}{6}\\right).",
      steps: [
        {
          explanation: "$\\frac{5\\pi}{6}$ lies in quadrant II.",
          latex: "\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi",
        },
        {
          explanation: "In quadrant II, y-values are positive.",
          latex: "\\sin\\left(\\frac{5\\pi}{6}\\right)>0",
        },
        {
          explanation: "In quadrant II, x-values are negative.",
          latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)<0",
        },
      ],
      finalAnswerLatex: "\\sin\\text{ is positive, }\\cos\\text{ is negative}",
    },
  ],

  guidedPractice: [
    {
      id: "radians-guided-1",
      prompt: "Convert to radians:",
      latex: "60^\\circ",
      answer: "pi/3",
      acceptedAnswers: ["\\pi/3", "π/3"],
      hint: "Multiply by $\\frac{\\pi}{180}$.",
      explanation: "$60^\\circ=60\\times\\frac{\\pi}{180}=\\frac{\\pi}{3}$.",
    },
    {
      id: "radians-guided-2",
      prompt: "Choose the correct quadrant for $\\frac{5\\pi}{6}$.",
      latex: "\\frac{5\\pi}{6}",
      answer: "B",
      choices: [
        { label: "A", text: "Quadrant I" },
        { label: "B", text: "Quadrant II" },
        { label: "C", text: "Quadrant III" },
        { label: "D", text: "Quadrant IV" },
      ],
      hint: "$\\frac{5\\pi}{6}=150^\\circ$.",
      explanation: "$150^\\circ$ lies in quadrant II, so option B is correct.",
    },
    {
      id: "radians-guided-3",
      prompt: "Evaluate exactly:",
      latex: "\\cos(\\pi)",
      answer: "-1",
      hint: "At $\\pi$, the unit circle point is $(-1,0)$.",
      explanation: "The x-coordinate at $\\pi$ is $-1$, so $\\cos(\\pi)=-1$.",
    },
    {
      id: "radians-guided-4",
      prompt: "Complete the unit circle coordinate rule:",
      latex: "(x,y)=(\\Box\\theta,\\sin\\theta)",
      answer: "cos",
      acceptedAnswers: ["cosine"],
      hint: "Cosine is the x-coordinate.",
      explanation: "On the unit circle, $(x,y)=(\\cos\\theta,\\sin\\theta)$.",
    },
  ],

  independentPractice: [
    {
      id: "radians-ind-1",
      prompt: "Convert to radians:",
      latex: "225^\\circ",
      answer: "5pi/4",
      acceptedAnswers: ["5\\pi/4", "5π/4"],
      hint: "Multiply by $\\frac{\\pi}{180}$ and simplify.",
      explanation: "$225^\\circ=\\frac{225\\pi}{180}=\\frac{5\\pi}{4}$.",
    },
    {
      id: "radians-ind-2",
      prompt: "Evaluate exactly:",
      latex: "\\sin\\left(\\frac{\\pi}{6}\\right)",
      answer: "1/2",
      acceptedAnswers: ["0.5"],
      hint: "Use the exact value table.",
      explanation: "$\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12$.",
    },
    {
      id: "radians-ind-3",
      prompt: "Evaluate exactly:",
      latex: "\\tan\\left(\\frac{\\pi}{4}\\right)",
      answer: "1",
      hint: "At $\\frac{\\pi}{4}$, sine and cosine are equal.",
      explanation: "$\\tan\\left(\\frac{\\pi}{4}\\right)=1$.",
    },
    {
      id: "radians-ind-4",
      prompt: "Choose the sign of $\\cos\\left(\\frac{4\\pi}{3}\\right)$.",
      latex: "\\frac{4\\pi}{3}",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
      ],
      hint: "$\\frac{4\\pi}{3}$ is in quadrant III.",
      explanation: "Cosine is negative in quadrant III.",
    },
    {
      id: "radians-ind-5",
      prompt: "Where is tangent undefined?",
      latex: "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}",
      answer: "A",
      choices: [
        { label: "A", text: "where $\\cos\\theta=0$" },
        { label: "B", text: "where $\\sin\\theta=0$" },
        { label: "C", text: "where $\\theta=0$ only" },
      ],
      hint: "A fraction is undefined when its denominator is zero.",
      explanation: "Tangent is undefined where $\\cos\\theta=0$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using $180$ instead of $\\pi$ when working in radians.",
      fix: "Remember $180^\\circ=\\pi$ radians.",
    },
    {
      mistake: "Mixing up sine and cosine on the unit circle.",
      fix: "The coordinate is $(\\cos\\theta,\\sin\\theta)$.",
    },
    {
      mistake: "Forgetting quadrant signs.",
      fix: "Use the quadrant before deciding whether an exact value is positive or negative.",
    },
    {
      mistake: "Assuming tangent is always defined.",
      fix: "Tangent is undefined when $\\cos\\theta=0$.",
    },
  ],

  masteryQuiz: [
    {
      id: "radians-mastery-1",
      prompt: "Convert to radians:",
      latex: "90^\\circ",
      answer: "pi/2",
      acceptedAnswers: ["\\pi/2", "π/2"],
      hint: "$90$ is half of $180$.",
      explanation: "$90^\\circ=\\frac{\\pi}{2}$.",
    },
    {
      id: "radians-mastery-2",
      prompt: "Convert to degrees:",
      latex: "\\frac{3\\pi}{2}",
      answer: "270",
      acceptedAnswers: ["270 degrees", "270°"],
      hint: "Multiply by $\\frac{180}{\\pi}$.",
      explanation: "$\\frac{3\\pi}{2}\\times\\frac{180}{\\pi}=270^\\circ$.",
    },
    {
      id: "radians-mastery-3",
      prompt: "Choose the unit-circle coordinate rule.",
      latex: "\\theta",
      answer: "C",
      choices: [
        { label: "A", text: "$(\\sin\\theta,\\cos\\theta)$" },
        { label: "B", text: "$(\\tan\\theta,\\sin\\theta)$" },
        { label: "C", text: "$(\\cos\\theta,\\sin\\theta)$" },
      ],
      hint: "Cosine is the x-coordinate.",
      explanation: "The unit circle point is $(\\cos\\theta,\\sin\\theta)$.",
    },
    {
      id: "radians-mastery-4",
      prompt: "Evaluate exactly:",
      latex: "\\sin\\left(\\frac{\\pi}{3}\\right)",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{\\sqrt3}{2}$" },
        { label: "B", text: "$\\frac12$" },
        { label: "C", text: "$\\frac{\\sqrt2}{2}$" },
        { label: "D", text: "$1$" },
      ],
      hint: "Use the exact value table.",
      explanation: "$\\sin\\left(\\frac{\\pi}{3}\\right)=\\frac{\\sqrt3}{2}$.",
    },
    {
      id: "radians-mastery-5",
      prompt: "Evaluate exactly:",
      latex: "\\cos\\left(\\frac{\\pi}{2}\\right)",
      answer: "0",
      hint: "At $\\frac{\\pi}{2}$, the unit circle point is $(0,1)$.",
      explanation: "$\\cos\\left(\\frac{\\pi}{2}\\right)=0$.",
    },
    {
      id: "radians-mastery-6",
      prompt: "Evaluate exactly:",
      latex: "\\tan(\\pi)",
      answer: "0",
      hint: "$\\sin(\\pi)=0$ and $\\cos(\\pi)=-1$.",
      explanation: "$\\tan(\\pi)=\\frac{0}{-1}=0$.",
    },
    {
      id: "radians-mastery-7",
      prompt: "Choose the sign of $\\sin\\left(\\frac{7\\pi}{6}\\right)$.",
      latex: "\\frac{7\\pi}{6}",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
      ],
      hint: "$\\frac{7\\pi}{6}$ is in quadrant III.",
      explanation: "Sine is negative in quadrant III.",
    },
    {
      id: "radians-mastery-8",
      prompt: "Choose the sign of $\\tan\\left(\\frac{5\\pi}{4}\\right)$.",
      latex: "\\frac{5\\pi}{4}",
      answer: "A",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
      ],
      hint: "In quadrant III, sine and cosine are both negative.",
      explanation: "A negative divided by a negative is positive.",
    },
    {
      id: "radians-mastery-9",
      prompt: "A rotating object turns through $\\frac{\\pi}{6}$ radians. What is this in degrees?",
      latex: "\\frac{\\pi}{6}",
      answer: "30",
      acceptedAnswers: ["30 degrees", "30°"],
      hint: "$\\pi$ radians is $180^\\circ$.",
      explanation: "$\\frac{\\pi}{6}=30^\\circ$.",
    },
    {
      id: "radians-mastery-10",
      prompt: "Which statement is correct for an angle in quadrant II?",
      latex: "\\text{Quadrant II}",
      answer: "A",
      choices: [
        { label: "A", text: "sine positive, cosine negative" },
        { label: "B", text: "sine negative, cosine positive" },
        { label: "C", text: "sine positive, cosine positive" },
      ],
      hint: "Quadrant II is above the x-axis and left of the y-axis.",
      explanation: "In quadrant II, y is positive and x is negative.",
    },
  ],

  masteryPassMark: 0.8,
};

export const graphsSineCosineTangentLesson: ExplicitLesson = {
  id: "graphs-sine-cosine-tangent",
  slug: "graphs-sine-cosine-tangent",
  moduleSlug: "ma-f2-further-graph-transformations-and-modelling",
  moduleTitle: "Further Graph Transformations and Modelling",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Graphs of Sine, Cosine, and Tangent",
  description:
    "Recognise the key features, periods, ranges, intercepts, and asymptotes of the basic sine, cosine, and tangent graphs.",
  syllabusArea: "Trigonometric Functions",
  focus: "Trigonometric functions and graphs",
  status: "active",

  video: {
    title: "Graphs of Sine, Cosine, and Tangent",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to identify the key features of the basic sine, cosine, and tangent graphs.",

  successCriteria: [
    "State the period and range of $y=\\sin x$.",
    "State the period and range of $y=\\cos x$.",
    "State the period of $y=\\tan x$.",
    "Identify key values for sine, cosine, and tangent graphs.",
    "Recognise where the tangent graph has vertical asymptotes.",
  ],

  teaching: {
    paragraphs: [
      "These three graphs are not shapes to memorise — they are pictures of what happens as a point travels around the unit circle. Recall the circle of radius $1$ centred at the origin: a point at angle $x$ sits at coordinates $(\\cos x,\\sin x)$. So $\\cos x$ is just the horizontal ($x$) coordinate of that point, and $\\sin x$ is its vertical ($y$) coordinate. The whole behaviour of the graphs comes from watching those two coordinates change as the point goes round and round.",
      "Start with $y=\\sin x$, the height of the moving point. At angle $0$ the point sits at the far right, $(1,0)$, so its height is $0$ — the graph starts on the axis. As the angle grows, the point climbs to the top of the circle at $x=\\frac{\\pi}{2}$, where the height is its largest, $1$. It then sinks back to $0$ at the bottom-left crossing $x=\\pi$, drops to its lowest, $-1$, at $x=\\frac{3\\pi}{2}$, and returns to $0$ at $x=2\\pi$. Because the height can never exceed the radius, the graph lives entirely between $-1$ and $1$: that is the range $[-1,1]$.",
      "One full revolution is $2\\pi$ radians, and after it the point is back exactly where it started — so the pattern of heights repeats every $2\\pi$. That repeat distance is the period. Saying 'the period is $2\\pi$' is not a separate fact to learn; it is simply the length of one trip around the circle. Every subsequent hump and dip is a carbon copy of the first.",
      "Now $y=\\cos x$ is the same story told with the horizontal coordinate. At angle $0$ the point is at the far right, so its $x$-coordinate is $1$ — that is why cosine starts at its maximum, not at zero. As the point rotates to the top at $\\frac{\\pi}{2}$ it sits directly above the origin, horizontal coordinate $0$; at $\\pi$ it is at the far left, coordinate $-1$; and so on. The cosine graph is identical in shape to the sine graph but shifted left by $\\frac{\\pi}{2}$, because the horizontal coordinate is always 'a quarter-turn ahead' of the vertical one. Same range $[-1,1]$, same period $2\\pi$.",
      "Tangent is built from the other two: $\\tan x=\\frac{\\sin x}{\\cos x}$, the height divided by the horizontal coordinate. This single definition explains every feature of its graph. Wherever $\\cos x=0$ — at $x=\\frac{\\pi}{2}$, $x=\\frac{3\\pi}{2}$, and so on — you are dividing by zero, so $\\tan x$ is undefined and the graph shoots off to a vertical asymptote there. Just before such a point the denominator is a tiny positive number, so the ratio blows up to $+\\infty$; just after, the denominator is tiny and negative, so it plunges from $-\\infty$. That is why tangent comes in separate climbing branches rather than one connected wave.",
      "Tangent also has a shorter period than sine and cosine: it repeats every $\\pi$, not every $2\\pi$. The reason is that rotating by half a turn sends the point to the diametrically opposite position, which negates *both* $\\sin x$ and $\\cos x$ — and the two minus signs cancel in the ratio, leaving $\\tan x$ unchanged. So $\\tan(x+\\pi)=\\tan x$. Its range is also different: since a small denominator makes the ratio arbitrarily large, tangent takes every real value, not just those between $-1$ and $1$.",
      "Two common slips are worth heading off now. First, sine and cosine have period $2\\pi$, not $\\pi$ — only tangent repeats every $\\pi$. Second, tangent is the one with vertical asymptotes and an unbounded range; sine and cosine are smooth, bounded waves with no asymptotes at all. Keeping the unit-circle picture in mind makes each of these obvious rather than something to recall.",
    ],
    latexBlocks: [
      "(\\cos x,\\ \\sin x)=\\text{horizontal and vertical coordinates of the point at angle }x\\text{ on the unit circle}",
      "y=\\sin x,\\quad \\text{period }2\\pi,\\quad -1\\le y\\le1",
      "y=\\cos x,\\quad \\text{period }2\\pi,\\quad -1\\le y\\le1\\quad(\\sin x\\text{ shifted left by }\\tfrac{\\pi}{2})",
      "\\tan x=\\frac{\\sin x}{\\cos x},\\quad \\text{period }\\pi,\\quad \\text{all real }y",
      "\\cos x=0\\ \\Rightarrow\\ \\tan x\\text{ undefined: vertical asymptote at }x=\\tfrac{\\pi}{2}+k\\pi",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Key features of sine",
      questionLatex: "y=\\sin x,\\quad 0\\le x\\le2\\pi",
      steps: [
        {
          explanation: "At $x=0$ the unit-circle point is at the far right, $(1,0)$, so its height — the value of sine — is $0$. The graph begins on the axis.",
          latex: "\\sin(0)=0",
        },
        {
          explanation: "A quarter-turn later the point is at the top of the circle, $(0,1)$, the highest it can go; that maximum height of $1$ is the peak of the graph.",
          latex: "\\sin\\left(\\frac{\\pi}{2}\\right)=1",
        },
        {
          explanation: "At $\\pi$ the point is at the far left $(-1,0)$ so the height is back to $0$; at $\\frac{3\\pi}{2}$ it is at the bottom $(0,-1)$, the lowest point, giving the minimum.",
          latex: "\\sin(\\pi)=0,\\quad \\sin\\left(\\frac{3\\pi}{2}\\right)=-1",
        },
        {
          explanation: "At $2\\pi$ the point has returned to its start, so the height is $0$ again and the whole pattern is about to repeat — one full revolution is one period.",
          latex: "\\sin(2\\pi)=0",
        },
      ],
      finalAnswerLatex:
        "\\text{Period }2\\pi,\\quad \\text{range }[-1,1]",
      cartesianGraph: {
        description: "One complete sine wave from zero to two pi, starting at zero, reaching one, returning to zero, reaching negative one, and returning to zero.",
        xMin: 0, xMax: 2 * Math.PI, yMin: -1.5, yMax: 1.5, xStep: Math.PI / 2, yStep: 0.5,
        xAxisLabel: "x (radians)",
        sinusoidals: [{ kind: "sin", a: 1, b: 1, c: 0, d: 0, label: "y = sin(x)", description: "The sine curve completes one wave from x equals zero to x equals two pi." }],
        points: [
          { x: 0, y: 0, label: "0" },
          { x: Math.PI / 2, y: 1, label: "pi/2" },
          { x: Math.PI, y: 0, label: "pi" },
          { x: 3 * Math.PI / 2, y: -1, label: "3pi/2" },
          { x: 2 * Math.PI, y: 0, label: "2pi" },
        ],
      },
    },
    {
      title: "Worked example 2: Key features of cosine",
      questionLatex: "y=\\cos x,\\quad 0\\le x\\le2\\pi",
      steps: [
        {
          explanation: "Cosine reads the horizontal coordinate. At $x=0$ the point is at the far right $(1,0)$, so the horizontal coordinate is $1$ — cosine starts at its maximum, unlike sine.",
          latex: "\\cos(0)=1",
        },
        {
          explanation: "A quarter-turn round, the point is directly above the origin at $(0,1)$, so its horizontal coordinate is $0$ — the graph crosses the axis here.",
          latex: "\\cos\\left(\\frac{\\pi}{2}\\right)=0",
        },
        {
          explanation: "At $\\pi$ the point is at the far left $(-1,0)$, so the horizontal coordinate is $-1$, the lowest cosine reaches.",
          latex: "\\cos(\\pi)=-1",
        },
        {
          explanation: "At $2\\pi$ the point is back at the far right, horizontal coordinate $1$ again, completing one period — the same shape as sine but started a quarter-turn earlier.",
          latex: "\\cos(2\\pi)=1",
        },
      ],
      finalAnswerLatex:
        "\\text{Period }2\\pi,\\quad \\text{range }[-1,1]",
      cartesianGraph: {
        description: "One complete cosine wave from zero to two pi, starting at one, crossing zero, reaching negative one, crossing zero again, and returning to one.",
        xMin: 0, xMax: 2 * Math.PI, yMin: -1.5, yMax: 1.5, xStep: Math.PI / 2, yStep: 0.5,
        xAxisLabel: "x (radians)",
        sinusoidals: [{ kind: "cos", a: 1, b: 1, c: 0, d: 0, label: "y = cos(x)", description: "The cosine curve completes one wave from x equals zero to x equals two pi." }],
        points: [
          { x: 0, y: 1, label: "0" },
          { x: Math.PI / 2, y: 0, label: "pi/2" },
          { x: Math.PI, y: -1, label: "pi" },
          { x: 3 * Math.PI / 2, y: 0, label: "3pi/2" },
          { x: 2 * Math.PI, y: 1, label: "2pi" },
        ],
      },
    },
    {
      title: "Worked example 3: Tangent period and asymptotes",
      questionLatex: "y=\\tan x",
      steps: [
        {
          explanation: "Rotating by half a turn negates both $\\sin x$ and $\\cos x$, and those two minus signs cancel in the ratio $\\frac{\\sin x}{\\cos x}$, so tangent repeats every $\\pi$ rather than every $2\\pi$.",
          latex: "\\tan(x+\\pi)=\\frac{-\\sin x}{-\\cos x}=\\tan x",
        },
        {
          explanation: "Since $\\tan x=\\frac{\\sin x}{\\cos x}$, wherever $\\cos x=0$ we would be dividing by zero, so tangent is undefined and the graph has a vertical asymptote there.",
          latex: "\\tan x=\\frac{\\sin x}{\\cos x},\\quad \\cos x=0",
        },
        {
          explanation: "Cosine first hits zero at $\\pm\\frac{\\pi}{2}$, so those are the asymptotes nearest the origin; the graph climbs steeply toward them on either side.",
          latex: "x=-\\frac{\\pi}{2},\\quad x=\\frac{\\pi}{2}",
        },
      ],
      finalAnswerLatex:
        "\\text{Period }\\pi,\\quad \\text{asymptotes }x=\\frac{\\pi}{2}+k\\pi",
      cartesianGraph: {
        description: "The basic tangent graph is drawn as separate increasing branches between its vertical asymptotes. It crosses the origin and repeats every pi radians.",
        xMin: -Math.PI, xMax: Math.PI, yMin: -4, yMax: 4, xStep: Math.PI / 2, yStep: 1,
        xAxisLabel: "x (radians)",
        sinusoidals: [{ kind: "tan", a: 1, b: 1, c: 0, d: 0, label: "y = tan(x)", description: "Separate tangent branches approach asymptotes at negative pi over two and pi over two." }],
        points: [{ x: 0, y: 0, label: "origin" }],
      },
    },
  ],

  guidedPractice: [
    {
      id: "trig-graphs-guided-1",
      prompt: "State the period:",
      latex: "y=\\sin x",
      answer: "2pi",
      acceptedAnswers: ["2\\pi", "2π"],
      hint: "The basic sine graph repeats every full turn.",
      explanation: "The period of $y=\\sin x$ is $2\\pi$.",
    },
    {
      id: "trig-graphs-guided-2",
      prompt: "Choose the graph that starts at $1$ when $x=0$.",
      latex: "x=0",
      answer: "B",
      choices: [
        { label: "A", text: "$y=\\sin x$" },
        { label: "B", text: "$y=\\cos x$" },
        { label: "C", text: "$y=\\tan x$" },
      ],
      hint: "Cosine is the x-coordinate on the unit circle.",
      explanation: "$\\cos(0)=1$, so option B is correct.",
    },
    {
      id: "trig-graphs-guided-3",
      prompt: "State the range:",
      latex: "y=\\sin x",
      answer: "[-1,1]",
      acceptedAnswers: ["-1<=y<=1", "-1≤y≤1", "-1 to 1"],
      hint: "The sine graph moves between its minimum and maximum.",
      explanation: "The range is $-1\\le y\\le1$.",
    },
    {
      id: "trig-graphs-guided-4",
      prompt: "State the period:",
      latex: "y=\\tan x",
      answer: "pi",
      acceptedAnswers: ["\\pi", "π"],
      hint: "The tangent graph repeats after half a full turn.",
      explanation: "The period of $y=\\tan x$ is $\\pi$.",
    },
  ],

  independentPractice: [
    {
      id: "trig-graphs-ind-1",
      prompt: "Choose the graph with range $[-1,1]$ and starting value $0$.",
      latex: "0\\le x\\le2\\pi",
      answer: "A",
      choices: [
        { label: "A", text: "$y=\\sin x$" },
        { label: "B", text: "$y=\\cos x$" },
        { label: "C", text: "$y=\\tan x$" },
      ],
      hint: "Sine starts at 0.",
      explanation: "$y=\\sin x$ starts at 0 and has range $[-1,1]$.",
    },
    {
      id: "trig-graphs-ind-2",
      prompt: "Find the first positive x-intercept:",
      latex: "y=\\cos x",
      answer: "pi/2",
      acceptedAnswers: ["\\pi/2", "π/2"],
      hint: "Solve $\\cos x=0$.",
      explanation: "The first positive x-intercept is $x=\\frac{\\pi}{2}$.",
    },
    {
      id: "trig-graphs-ind-3",
      prompt: "Choose the graph with vertical asymptotes.",
      latex: "\\text{Basic trig graphs}",
      answer: "C",
      choices: [
        { label: "A", text: "$y=\\sin x$" },
        { label: "B", text: "$y=\\cos x$" },
        { label: "C", text: "$y=\\tan x$" },
      ],
      hint: "Tangent is undefined where cosine is zero.",
      explanation: "$y=\\tan x$ has vertical asymptotes.",
    },
    {
      id: "trig-graphs-ind-4",
      prompt: "State the maximum value:",
      latex: "y=\\cos x",
      answer: "1",
      hint: "The cosine range is $[-1,1]$.",
      explanation: "The maximum value of $y=\\cos x$ is $1$.",
    },
    {
      id: "trig-graphs-ind-5",
      prompt: "Choose the correct statement.",
      latex: "y=\\tan x",
      answer: "B",
      choices: [
        { label: "A", text: "It has period $2\\pi$ and range $[-1,1]$." },
        { label: "B", text: "It has period $\\pi$ and vertical asymptotes." },
        { label: "C", text: "It starts at $1$ when $x=0$." },
      ],
      hint: "Compare tangent with sine and cosine.",
      explanation: "Tangent has period $\\pi$ and vertical asymptotes.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Saying sine and cosine have period $\\pi$.",
      fix: "The basic sine and cosine graphs have period $2\\pi$.",
    },
    {
      mistake: "Forgetting tangent has vertical asymptotes.",
      fix: "Tangent is undefined where $\\cos x=0$.",
    },
    {
      mistake: "Mixing up the starting values of sine and cosine.",
      fix: "$\\sin(0)=0$ and $\\cos(0)=1$.",
    },
    {
      mistake: "Giving tangent a range of $[-1,1]$.",
      fix: "The basic tangent graph has all real y-values.",
    },
  ],

  masteryQuiz: [
    {
      id: "trig-graphs-mastery-1",
      prompt: "State the period:",
      latex: "y=\\cos x",
      answer: "2pi",
      acceptedAnswers: ["2\\pi", "2π"],
      hint: "Cosine repeats after one full turn.",
      explanation: "The period is $2\\pi$.",
    },
    {
      id: "trig-graphs-mastery-2",
      prompt: "State the range:",
      latex: "y=\\cos x",
      answer: "[-1,1]",
      acceptedAnswers: ["-1<=y<=1", "-1≤y≤1", "-1 to 1"],
      hint: "Cosine moves between its minimum and maximum.",
      explanation: "The range is $-1\\le y\\le1$.",
    },
    {
      id: "trig-graphs-mastery-3",
      prompt: "Choose the graph with period $\\pi$.",
      latex: "\\text{Basic trig graphs}",
      answer: "C",
      choices: [
        { label: "A", text: "$y=\\sin x$" },
        { label: "B", text: "$y=\\cos x$" },
        { label: "C", text: "$y=\\tan x$" },
      ],
      hint: "Tangent repeats fastest among these three.",
      explanation: "The basic tangent graph has period $\\pi$.",
    },
    {
      id: "trig-graphs-mastery-4",
      prompt: "Find the y-value at $x=0$:",
      latex: "y=\\sin x",
      answer: "0",
      hint: "$\\sin(0)=0$.",
      explanation: "At $x=0$, $y=0$.",
    },
    {
      id: "trig-graphs-mastery-5",
      prompt: "Find the y-value at $x=0$:",
      latex: "y=\\cos x",
      answer: "1",
      hint: "$\\cos(0)=1$.",
      explanation: "At $x=0$, $y=1$.",
    },
    {
      id: "trig-graphs-mastery-6",
      prompt: "State the first positive vertical asymptote:",
      latex: "y=\\tan x",
      answer: "pi/2",
      acceptedAnswers: ["\\pi/2", "π/2"],
      hint: "Tangent is undefined where $\\cos x=0$.",
      explanation: "The first positive asymptote is $x=\\frac{\\pi}{2}$.",
    },
    {
      id: "trig-graphs-mastery-7",
      prompt: "Which statement is correct?",
      latex: "y=\\sin x",
      answer: "A",
      choices: [
        { label: "A", text: "It starts at 0 and has period $2\\pi$." },
        { label: "B", text: "It starts at 1 and has period $\\pi$." },
        { label: "C", text: "It has vertical asymptotes." },
      ],
      hint: "Compare sine with cosine and tangent.",
      explanation: "Sine starts at 0 and has period $2\\pi$.",
    },
    {
      id: "trig-graphs-mastery-8",
      prompt: "Which statement is correct?",
      latex: "y=\\cos x",
      answer: "B",
      choices: [
        { label: "A", text: "It starts at 0." },
        { label: "B", text: "It starts at 1." },
        { label: "C", text: "It has vertical asymptotes at $x=0$." },
      ],
      hint: "Evaluate $\\cos(0)$.",
      explanation: "$\\cos(0)=1$.",
    },
    {
      id: "trig-graphs-mastery-9",
      prompt: "A periodic graph repeats every $2\\pi$ and starts at 1. Which graph is it?",
      latex: "x=0",
      answer: "B",
      choices: [
        { label: "A", text: "$y=\\sin x$" },
        { label: "B", text: "$y=\\cos x$" },
        { label: "C", text: "$y=\\tan x$" },
      ],
      hint: "Cosine starts at its maximum.",
      explanation: "$y=\\cos x$ repeats every $2\\pi$ and starts at 1.",
    },
    {
      id: "trig-graphs-mastery-10",
      prompt: "Choose the correct range for $y=\\tan x$.",
      latex: "y=\\tan x",
      answer: "C",
      choices: [
        { label: "A", text: "$-1\\le y\\le1$" },
        { label: "B", text: "$0\\le y\\le1$" },
        { label: "C", text: "all real y-values" },
      ],
      hint: "Tangent is not bounded like sine and cosine.",
      explanation: "The tangent graph has all real y-values.",
    },
  ],

  masteryPassMark: 0.8,
};

export const amplitudePeriodPhaseVerticalShiftLesson: ExplicitLesson = {
  id: "amplitude-period-phase-vertical-shift",
  slug: "amplitude-period-phase-vertical-shift",
  moduleSlug: "ma-f2-further-graph-transformations-and-modelling",
  moduleTitle: "Further Graph Transformations and Modelling",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Amplitude, Period, Phase Shift, and Vertical Shift",
  description:
    "Identify amplitude, period, phase shift, vertical shift, and midline from transformed sine, cosine, and tangent functions.",
  syllabusArea: "Trigonometric Functions",
  focus: "Trigonometric functions and graphs",
  status: "active",

  video: {
    title: "Amplitude, Period, Phase Shift, and Vertical Shift",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how the constants in transformed trigonometric functions affect graph features.",

  successCriteria: [
    "Identify $a$, $b$, $c$, and $d$ in transformed sine and cosine functions.",
    "Find amplitude using $|a|$.",
    "Find period using $\\frac{2\\pi}{|b|}$ for sine and cosine.",
    "Identify phase shift, vertical shift, and midline.",
    "Recognise that tangent has no amplitude and period $\\frac{\\pi}{|b|}$.",
  ],

  teaching: {
    paragraphs: [
      "Every transformed wave you will meet this year is the plain $y=\\sin x$ or $y=\\cos x$ from the last lesson, then stretched, squashed, and slid by four constants. The full form is $y=a\\sin(b(x-c))+d$ (cosine works the same way). The skill is not memorising what each letter does — it is seeing *why* each one does it, because then you can read any graph straight off its equation and write any equation straight off a graph.",
      "Take $a$ first. Multiplying the whole sine by $a$ multiplies every height by $a$: a value that used to reach $1$ now reaches $a$, and a value of $-1$ becomes $-a$. So the wave is stretched vertically. The amplitude — the distance from the centre of the wave up to a peak (or down to a trough) — is therefore $|a|$. We take the absolute value because a distance cannot be negative; a negative $a$ simply flips the wave upside down (peaks become troughs) but the *size* of the swing is still $|a|$.",
      "Now $b$, the constant multiplying $x$ *inside* the function. This is the one students most often get backwards. The basic wave finishes one full cycle when its input runs through $2\\pi$. With $b$ inside, the input is $bx$, so the bracket reaches $2\\pi$ when $x$ only reaches $\\frac{2\\pi}{b}$ — the wave finishes sooner, squashed horizontally. That is why the period is $\\frac{2\\pi}{b}$, a division: a bigger $b$ packs more cycles into the same space, so each cycle is shorter. Writing the period as $2\\pi b$ is the classic error — it would make the wave stretch out as $b$ grows, the exact opposite of what happens.",
      "The constant $c$ slides the wave sideways. Inside the bracket we have $x-c$, and the wave does whatever it normally does when the *bracket* equals zero — which now happens at $x=c$ instead of $x=0$. So the entire graph is dragged right by $c$. A plus sign, $x+c$, sets the bracket to zero at $x=-c$, dragging it left. This horizontal slide is called the phase shift; it is why two waves of the same shape can be 'out of step'. (Watch the bracket: in $\\sin(2x-\\pi)$ the shift is not $\\pi$ — factor first to $\\sin(2(x-\\frac{\\pi}{2}))$, so the shift is $\\frac{\\pi}{2}$.)",
      "Finally $d$ raises or lowers the whole graph: adding $d$ to every output lifts the wave bodily by $d$ units. The line the wave now oscillates around — halfway between its peaks and troughs — is the midline $y=d$. This is why amplitude is measured from the midline, not from the $x$-axis: the maximum value is $d+|a|$ and the minimum is $d-|a|$, and only when $d=0$ does the peak height equal the amplitude.",
      "Tangent obeys the same four constants with two differences that follow from its shape. It has no peaks or troughs — it runs off to infinity — so it has no amplitude; the front multiplier $a$ just makes each branch steeper. And because the basic tangent already repeats every $\\pi$ (not $2\\pi$), its period is $\\frac{\\pi}{b}$, not $\\frac{2\\pi}{b}$. The horizontal and vertical slides from $c$ and $d$ work exactly as before, moving its branches and its centre line $y=d$.",
    ],
    latexBlocks: [
      "y=a\\sin(b(x-c))+d\\quad\\text{(and the same form with }\\cos\\text{)}",
      "\\text{amplitude}=|a|\\quad(\\text{distance midline}\\to\\text{peak; negative }a\\text{ flips the wave})",
      "\\text{period for sine/cosine}=\\frac{2\\pi}{|b|}\\quad(\\text{divide, not multiply})",
      "\\text{period for tangent}=\\frac{\\pi}{|b|},\\quad\\text{tangent has no amplitude}",
      "\\text{phase shift}=c\\ (\\text{right if }x-c),\\qquad \\text{midline: }y=d",
      "\\text{max}=d+|a|,\\qquad \\text{min}=d-|a|",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Sine transformation",
      questionLatex: "y=3\\sin(2x)+1",
      steps: [
        { explanation: "Match the equation to $y=a\\sin(bx)+d$: the front multiplier is $a$ and the number multiplying $x$ inside is $b$.", latex: "a=3,\\quad b=2,\\quad d=1" },
        { explanation: "Amplitude is the swing from the midline to a peak, which is the size of the front multiplier $|a|$.", latex: "|a|=|3|=3" },
        { explanation: "Because $b=2$ packs the input through $2\\pi$ in half the horizontal distance, divide $2\\pi$ by $|b|$ — the cycle is squashed, so the period shrinks.", latex: "\\frac{2\\pi}{|2|}=\\pi" },
        { explanation: "The $+1$ lifts the whole wave by one unit, so it now oscillates about the line $y=1$ rather than the $x$-axis.", latex: "\\text{midline }y=1" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }3,\\quad \\text{period }\\pi,\\quad \\text{vertical shift }1",
      cartesianGraph: {
        description: "The transformed sine graph has midline y equals 1, amplitude 3 and one complete period from zero to pi.",
        xMin: 0, xMax: Math.PI, yMin: -2.5, yMax: 4.5, xStep: Math.PI / 4, yStep: 1,
        xAxisLabel: "x (radians)",
        lines: [{ kind: "linear", m: 0, b: 1, label: "midline y = 1" }],
        sinusoidals: [{ kind: "sin", a: 3, b: 2, c: 0, d: 1, label: "y = 3sin(2x) + 1", description: "The sine wave oscillates three units above and below the midline y equals 1 and repeats after pi radians." }],
        points: [
          { x: 0, y: 1, label: "start" },
          { x: Math.PI / 4, y: 4, label: "maximum" },
          { x: 3 * Math.PI / 4, y: -2, label: "minimum" },
          { x: Math.PI, y: 1, label: "one period" },
        ],
      },
    },
    {
      title: "Worked example 2: Cosine transformation",
      questionLatex: "y=-2\\cos\\left(x-\\frac{\\pi}{3}\\right)+4",
      steps: [
        { explanation: "Read off the four constants from $y=a\\cos(b(x-c))+d$; the bracket is already factored, so $c$ is clear.", latex: "a=-2,\\quad b=1,\\quad c=\\frac{\\pi}{3},\\quad d=4" },
        { explanation: "Amplitude is the size of the swing, $|a|$; the negative sign only flips the cosine upside down, so it starts at a minimum instead of a maximum.", latex: "|a|=|-2|=2" },
        { explanation: "Since $b=1$, the input is unsquashed and the period is the standard $2\\pi$.", latex: "\\frac{2\\pi}{|1|}=2\\pi" },
        { explanation: "The bracket $x-\\frac{\\pi}{3}$ is zero at $x=\\frac{\\pi}{3}$, so the whole graph is dragged right by $\\frac{\\pi}{3}$; the $+4$ lifts the midline to $y=4$.", latex: "\\text{right }\\frac{\\pi}{3},\\quad \\text{midline }y=4" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }2,\\quad \\text{period }2\\pi,\\quad \\text{phase shift }\\frac{\\pi}{3}\\text{ right},\\quad \\text{midline }y=4",
      cartesianGraph: {
        description: "The transformed negative cosine graph starts at its minimum after a right shift of pi over three, oscillates around the midline y equals 4, and completes one period after two pi radians.",
        xMin: Math.PI / 3, xMax: 7 * Math.PI / 3, yMin: 1, yMax: 7, xStep: Math.PI / 2, yStep: 1,
        xAxisLabel: "x (radians)",
        lines: [{ kind: "linear", m: 0, b: 4, label: "midline y = 4" }],
        sinusoidals: [{ kind: "cos", a: -2, b: 1, c: Math.PI / 3, d: 4, label: "y = -2cos(x - pi/3) + 4", description: "The cosine curve is shifted right by pi over three and reflected, so it begins at its minimum value of 2." }],
        points: [
          { x: Math.PI / 3, y: 2, label: "shifted start" },
          { x: 4 * Math.PI / 3, y: 6, label: "maximum" },
          { x: 7 * Math.PI / 3, y: 2, label: "one period" },
        ],
      },
    },
    {
      title: "Worked example 3: Tangent transformation",
      questionLatex: "y=2\\tan(3x)+1",
      steps: [
        { explanation: "Tangent has no maximum or minimum, so it does not have an amplitude. The multiplier 2 makes each branch steeper instead.", latex: "a=2\\quad \\Rightarrow\\quad \\text{vertical stretch, not amplitude}" },
        { explanation: "A basic tangent graph repeats every $\\pi$. Dividing by $|b|=3$ gives the new period.", latex: "\\frac{\\pi}{|3|}=\\frac{\\pi}{3}" },
        { explanation: "Adding 1 slides the graph upwards. The centre line moves from $y=0$ to $y=1$.", latex: "d=1\\quad \\Rightarrow\\quad \\text{midline }y=1" },
      ],
      finalAnswerLatex:
        "\\text{no amplitude},\\quad \\text{period }\\frac{\\pi}{3},\\quad \\text{vertical stretch factor }2,\\quad \\text{midline }y=1",
      cartesianGraph: {
        description: "The transformed tangent graph is drawn as separate steep branches around the centre line y equals 1. The branches repeat every pi over three radians.",
        xMin: -Math.PI / 3, xMax: Math.PI / 3, yMin: -5, yMax: 7, xStep: Math.PI / 6, yStep: 2,
        xAxisLabel: "x (radians)",
        lines: [{ kind: "linear", m: 0, b: 1, label: "centre line y = 1" }],
        sinusoidals: [{ kind: "tan", a: 2, b: 3, c: 0, d: 1, label: "y = 2tan(3x) + 1", description: "Separate tangent branches cross the centre line y equals 1 and repeat every pi over three radians." }],
        points: [{ x: 0, y: 1, label: "centre" }],
      },
    },
  ],

  guidedPractice: [
    {
      id: "amp-guided-1",
      prompt: "Find the amplitude:",
      latex: "y=5\\sin x",
      answer: "5",
      hint: "Amplitude is $|a|$.",
      explanation: "Here $a=5$, so the amplitude is $5$.",
    },
    {
      id: "amp-guided-2",
      prompt: "Find the period:",
      latex: "y=\\sin(2x)",
      answer: "pi",
      acceptedAnswers: ["\\pi", "π"],
      hint: "Use $\\frac{2\\pi}{|b|}$.",
      explanation: "The period is $\\frac{2\\pi}{2}=\\pi$.",
    },
    {
      id: "amp-guided-3",
      prompt: "Find the midline:",
      latex: "y=2\\cos x-3",
      answer: "y=-3",
      acceptedAnswers: ["-3"],
      hint: "The midline is $y=d$.",
      explanation: "Here $d=-3$, so the midline is $y=-3$.",
    },
    {
      id: "amp-guided-4",
      prompt: "Choose the phase shift.",
      latex: "y=\\sin\\left(x-\\frac{\\pi}{4}\\right)",
      answer: "B",
      choices: [
        { label: "A", text: "left $\\frac{\\pi}{4}$" },
        { label: "B", text: "right $\\frac{\\pi}{4}$" },
        { label: "C", text: "up $\\frac{\\pi}{4}$" },
      ],
      hint: "$x-c$ shifts right by $c$.",
      explanation: "The graph is shifted right $\\frac{\\pi}{4}$.",
    },
  ],

  independentPractice: [
    {
      id: "amp-ind-1",
      prompt: "Find the amplitude:",
      latex: "y=-4\\sin x",
      answer: "4",
      hint: "Use $|-4|$.",
      explanation: "Amplitude is $|-4|=4$.",
    },
    {
      id: "amp-ind-2",
      prompt: "Find the period:",
      latex: "y=\\cos(3x)",
      answer: "2pi/3",
      acceptedAnswers: ["2\\pi/3", "2π/3"],
      hint: "Use $\\frac{2\\pi}{|3|}$.",
      explanation: "The period is $\\frac{2\\pi}{3}$.",
    },
    {
      id: "amp-ind-3",
      prompt: "Find the vertical shift:",
      latex: "y=2\\sin x+7",
      answer: "7",
      acceptedAnswers: ["up 7"],
      hint: "The vertical shift is $d$.",
      explanation: "Here $d=7$, so the graph shifts up $7$.",
    },
    {
      id: "amp-ind-4",
      prompt: "Find the period:",
      latex: "y=\\tan(2x)",
      answer: "pi/2",
      acceptedAnswers: ["\\pi/2", "π/2"],
      hint: "For tangent, use $\\frac{\\pi}{|b|}$.",
      explanation: "The period is $\\frac{\\pi}{2}$.",
    },
    {
      id: "amp-ind-5",
      prompt: "Choose the correct description.",
      latex: "y=-3\\cos(2x)+1",
      answer: "A",
      choices: [
        { label: "A", text: "amplitude $3$, period $\\pi$, midline $y=1$" },
        { label: "B", text: "amplitude $-3$, period $\\pi$, midline $y=1$" },
        { label: "C", text: "amplitude $3$, period $2\\pi$, midline $y=1$" },
      ],
      hint: "Amplitude is positive and period uses $b=2$.",
      explanation: "Amplitude is $3$, period is $\\pi$, and midline is $y=1$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using $a$ instead of $|a|$ for amplitude.",
      fix: "Amplitude is always non-negative, so $a=-2$ gives amplitude $2$.",
    },
    {
      mistake: "Thinking vertical shift changes amplitude.",
      fix: "Vertical shift moves the midline; amplitude is the distance from the midline.",
    },
    {
      mistake: "Using $\\frac{2\\pi}{b}$ without absolute value.",
      fix: "Use $\\frac{2\\pi}{|b|}$ so the period is positive.",
    },
    {
      mistake: "Saying tangent has amplitude.",
      fix: "Tangent has no maximum or minimum, so it has no amplitude.",
    },
  ],

  masteryQuiz: [
    {
      id: "amp-mastery-1",
      prompt: "Find the amplitude:",
      latex: "y=6\\sin x",
      answer: "6",
      hint: "Amplitude is $|a|$.",
      explanation: "Amplitude is $6$.",
    },
    {
      id: "amp-mastery-2",
      prompt: "Find the amplitude:",
      latex: "y=-5\\cos x",
      answer: "5",
      hint: "Amplitude is never negative.",
      explanation: "Amplitude is $|-5|=5$.",
    },
    {
      id: "amp-mastery-3",
      prompt: "Find the period:",
      latex: "y=\\sin(4x)",
      answer: "pi/2",
      acceptedAnswers: ["\\pi/2", "π/2"],
      hint: "Use $\\frac{2\\pi}{4}$.",
      explanation: "The period is $\\frac{\\pi}{2}$.",
    },
    {
      id: "amp-mastery-4",
      prompt: "Find the vertical shift:",
      latex: "y=\\cos x-2",
      answer: "-2",
      acceptedAnswers: ["down 2"],
      hint: "The vertical shift is $d$.",
      explanation: "The graph shifts down $2$.",
    },
    {
      id: "amp-mastery-5",
      prompt: "Find the midline:",
      latex: "y=4\\sin x+3",
      answer: "y=3",
      acceptedAnswers: ["3"],
      hint: "The midline is $y=d$.",
      explanation: "The midline is $y=3$.",
    },
    {
      id: "amp-mastery-6",
      prompt: "Choose the phase shift.",
      latex: "y=\\cos\\left(x+\\frac{\\pi}{6}\\right)",
      answer: "A",
      choices: [
        { label: "A", text: "left $\\frac{\\pi}{6}$" },
        { label: "B", text: "right $\\frac{\\pi}{6}$" },
        { label: "C", text: "up $\\frac{\\pi}{6}$" },
      ],
      hint: "$x+\\frac{\\pi}{6}=x-\\left(-\\frac{\\pi}{6}\\right)$.",
      explanation: "The graph shifts left $\\frac{\\pi}{6}$.",
    },
    {
      id: "amp-mastery-7",
      prompt: "Find the period:",
      latex: "y=\\tan(3x)",
      answer: "pi/3",
      acceptedAnswers: ["\\pi/3", "π/3"],
      hint: "For tangent, use $\\frac{\\pi}{|b|}$.",
      explanation: "The period is $\\frac{\\pi}{3}$.",
    },
    {
      id: "amp-mastery-8",
      prompt: "Choose the correct statement.",
      latex: "y=2\\tan x",
      answer: "B",
      choices: [
        { label: "A", text: "It has amplitude $2$." },
        { label: "B", text: "It has no amplitude." },
      ],
      hint: "Tangent has no maximum or minimum.",
      explanation: "Tangent has no amplitude.",
    },
    {
      id: "amp-mastery-9",
      prompt: "Choose the correct description.",
      latex: "y=2\\sin\\left(2\\left(x-\\frac{\\pi}{3}\\right)\\right)-1",
      answer: "C",
      choices: [
        { label: "A", text: "amplitude $2$, period $2\\pi$, midline $y=-1$" },
        { label: "B", text: "amplitude $1$, period $\\pi$, phase shift right $\\frac{\\pi}{3}$" },
        { label: "C", text: "amplitude $2$, period $\\pi$, phase shift right $\\frac{\\pi}{3}$" },
      ],
      hint: "Use $a=2$, $b=2$, $c=\\frac{\\pi}{3}$.",
      explanation: "Amplitude is $2$, period is $\\pi$, and phase shift is right $\\frac{\\pi}{3}$.",
    },
    {
      id: "amp-mastery-10",
      prompt: "Choose the correct midline and amplitude.",
      latex: "y=-3\\cos x+4",
      answer: "A",
      choices: [
        { label: "A", text: "midline $y=4$, amplitude $3$" },
        { label: "B", text: "midline $y=-3$, amplitude $4$" },
        { label: "C", text: "midline $y=4$, amplitude $-3$" },
      ],
      hint: "Amplitude is $|a|$ and midline is $y=d$.",
      explanation: "The midline is $y=4$ and the amplitude is $3$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const trigonometricEquationsLesson: ExplicitLesson = {
  id: "trigonometric-equations",
  slug: "trigonometric-equations",
  moduleSlug: "ma-f2-further-graph-transformations-and-modelling",
  moduleTitle: "Further Graph Transformations and Modelling",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Trigonometric Equations",
  description:
    "Solve trigonometric equations over specified domains using exact values, unit-circle signs, symmetry, and periods.",
  syllabusArea: "Trigonometric Functions",
  focus: "Trigonometric functions and graphs",
  status: "active",

  video: {
    title: "Trigonometric Equations",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to solve basic trigonometric equations in a given domain.",

  successCriteria: [
    "Isolate the trigonometric function before solving.",
    "Find a reference angle using exact values.",
    "Use unit-circle signs to choose the correct quadrants.",
    "List all solutions in the given interval.",
    "Use tangent's period $\\pi$ and sine/cosine period $2\\pi$ correctly.",
  ],

  teaching: {
    paragraphs: [
      "A trigonometric equation like $\\sin x=\\frac12$ almost never has a single answer, and understanding *why* is the whole skill. Picture the graph of $y=\\sin x$ and draw the horizontal line $y=\\frac12$ across it. Over one cycle that line cuts the wave twice — once on the way up, once on the way down — so there are two solutions per period, and more in every further period. Solving the equation means finding *all* the crossings inside the domain you are given, not just the first one your calculator hands you.",
      "Before anything else, get the trig function by itself. An equation such as $2\\sin x-1=0$ is not yet ready to solve; rearrange it to $\\sin x=\\frac12$ so you can ask the clean question 'which angles have this sine?'. This is the same isolation you would do for $2x-1=0$ — undo the surrounding arithmetic first.",
      "Now find one angle that works — the reference angle — using exact values. For $\\sin x=\\frac12$ the reference angle is $\\frac{\\pi}{6}$, because $\\sin\\frac{\\pi}{6}=\\frac12$. The reference angle is always taken from the *positive* value and is the acute angle in the first quadrant; the sign of the original equation tells you which quadrants the real solutions live in, not the reference angle itself.",
      "To find the second (and further) solutions, use the symmetry of the unit circle rather than guessing. Sine is the height, and a given height occurs at two points: one in the first quadrant at angle $\\theta$, and its mirror image across the vertical axis at $\\pi-\\theta$. So if $\\frac{\\pi}{6}$ is a solution of $\\sin x=\\frac12$, then $\\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}$ is the other one in $[0,2\\pi]$. Cosine (the horizontal coordinate) is instead mirrored top-to-bottom, giving its second solution at $2\\pi-\\theta$ or, for negative cosine, in quadrants II and III. Reading the quadrants off the sign — sine positive in I and II, cosine positive in I and IV, and so on — is faster and safer than memorising formulas.",
      "The period then generates every remaining solution. Sine and cosine repeat every $2\\pi$, so once you have the solutions in one cycle you add $2\\pi$ repeatedly until you leave the domain. Tangent repeats every $\\pi$ — half as often — so its solutions are spaced $\\pi$ apart, and a domain of length $2\\pi$ typically gives two tangent solutions, not four. Using the wrong period here is a common way to lose marks.",
      "Two final guards. First, check the domain at the end and discard any solution that falls outside it, and never stop at one answer when the graph shows the line crossing more than once — missing solutions is the single most frequent error in this topic. Second, mind the units: unless the question is stated in degrees, work and answer in radians, since a domain like $0\\le x\\le 2\\pi$ is a radian domain.",
    ],
    latexBlocks: [
      "\\text{isolate first: }2\\sin x-1=0\\ \\Rightarrow\\ \\sin x=\\tfrac12",
      "\\text{second solution: }\\sin\\ \\to\\ \\pi-\\theta;\\quad \\cos\\ \\to\\ 2\\pi-\\theta",
      "\\sin x>0\\text{ in I, II};\\quad \\cos x>0\\text{ in I, IV};\\quad \\tan x>0\\text{ in I, III}",
      "\\text{add the period to sweep the domain: }+2\\pi\\ (\\sin,\\cos),\\ +\\pi\\ (\\tan)",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Solve a sine equation",
      questionLatex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "Get sine alone first: add 1 and divide by 2, so the equation becomes the clean question 'which angles have sine equal to a half?'", latex: "2\\sin x=1\\quad \\Rightarrow\\quad \\sin x=\\frac12" },
        { explanation: "Use exact values to find one acute angle with this sine — the reference angle.", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12" },
        { explanation: "Since $\\frac12$ is positive, sine is positive in quadrants I and II; the height $\\frac12$ occurs at $\\frac{\\pi}{6}$ and at its mirror image $\\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}$, both inside $[0,2\\pi]$.", latex: "x=\\frac{\\pi}{6},\\quad x=\\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}" },
      ],
      finalAnswerLatex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6}",
    },
    {
      title: "Worked example 2: Solve a cosine equation",
      questionLatex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "Take the reference angle from the positive value $\\frac12$, ignoring the minus sign for now: $\\frac{\\pi}{3}$ is the acute angle whose cosine is a half.", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)=\\frac12" },
        { explanation: "The cosine is negative, and cosine (the horizontal coordinate) is negative on the left of the circle — quadrants II and III; build those angles by reflecting the reference angle about $\\pi$.", latex: "x=\\pi-\\frac{\\pi}{3},\\quad x=\\pi+\\frac{\\pi}{3}" },
        { explanation: "Simplify; both lie inside $[0,2\\pi]$, so both are kept.", latex: "x=\\frac{2\\pi}{3},\\quad x=\\frac{4\\pi}{3}" },
      ],
      finalAnswerLatex: "x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}",
    },
    {
      title: "Worked example 3: Solve a tangent equation",
      questionLatex: "\\tan x=1,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "Find the acute angle whose tangent is 1; sine and cosine are equal there, so the ratio is 1.", latex: "\\tan\\left(\\frac{\\pi}{4}\\right)=1" },
        { explanation: "Tangent repeats every $\\pi$, not $2\\pi$, so the next solution is just the first plus $\\pi$ — that lands it in quadrant III, where tangent is also positive.", latex: "x=\\frac{\\pi}{4},\\quad x=\\frac{\\pi}{4}+\\pi=\\frac{5\\pi}{4}" },
        { explanation: "Adding another $\\pi$ would give $\\frac{9\\pi}{4}>2\\pi$, outside the domain, so the two found are all of them.", latex: "0\\le x\\le2\\pi" },
      ],
      finalAnswerLatex: "x=\\frac{\\pi}{4},\\frac{5\\pi}{4}",
    },
  ],

  guidedPractice: [
    {
      id: "trig-eq-guided-1",
      prompt: "Isolate the trig function:",
      latex: "2\\sin x-1=0\\quad \\Rightarrow\\quad \\sin x=\\Box",
      answer: "1/2",
      acceptedAnswers: ["0.5"],
      hint: "Add 1, then divide by 2.",
      explanation: "$2\\sin x=1$, so $\\sin x=\\frac12$.",
    },
    {
      id: "trig-eq-guided-2",
      prompt: "Find the reference angle:",
      latex: "\\sin x=\\frac12",
      answer: "pi/6",
      acceptedAnswers: ["\\pi/6", "π/6"],
      hint: "Use exact values.",
      explanation: "The reference angle is $\\frac{\\pi}{6}$.",
    },
    {
      id: "trig-eq-guided-3",
      prompt: "Choose where cosine is negative.",
      latex: "\\cos x<0",
      answer: "B",
      choices: [
        { label: "A", text: "Quadrants I and IV" },
        { label: "B", text: "Quadrants II and III" },
        { label: "C", text: "Quadrants I and III" },
      ],
      hint: "Cosine is the x-coordinate.",
      explanation: "Cosine is negative on the left side of the unit circle.",
    },
    {
      id: "trig-eq-guided-4",
      prompt: "Choose the solutions.",
      latex: "\\tan x=1,\\quad 0\\le x\\le2\\pi",
      answer: "C",
      choices: [
        { label: "A", text: "$x=\\frac{\\pi}{4}$ only" },
        { label: "B", text: "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$" },
        { label: "C", text: "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$" },
      ],
      hint: "Tangent is positive in quadrants I and III.",
      explanation: "The solutions are $\\frac{\\pi}{4}$ and $\\frac{5\\pi}{4}$.",
    },
  ],

  independentPractice: [
    {
      id: "trig-eq-ind-1",
      prompt: "Find the smaller solution:",
      latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi",
      answer: "pi/6",
      acceptedAnswers: ["\\pi/6", "π/6"],
      hint: "Sine is positive in quadrant I first.",
      explanation: "The smaller solution is $\\frac{\\pi}{6}$.",
    },
    {
      id: "trig-eq-ind-2",
      prompt: "Find the larger solution:",
      latex: "\\sin x=\\frac12,\\quad 0\\le x\\le2\\pi",
      answer: "5pi/6",
      acceptedAnswers: ["5\\pi/6", "5π/6"],
      hint: "The second solution is in quadrant II.",
      explanation: "The larger solution is $\\frac{5\\pi}{6}$.",
    },
    {
      id: "trig-eq-ind-3",
      prompt: "Choose the solutions.",
      latex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi",
      answer: "B",
      choices: [
        { label: "A", text: "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$" },
        { label: "B", text: "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$" },
        { label: "C", text: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$" },
      ],
      hint: "Cosine is negative in quadrants II and III.",
      explanation: "The solutions are $\\frac{2\\pi}{3}$ and $\\frac{4\\pi}{3}$.",
    },
    {
      id: "trig-eq-ind-4",
      prompt: "Isolate the trig function:",
      latex: "3\\cos x+1=0\\quad \\Rightarrow\\quad \\cos x=\\Box",
      answer: "-1/3",
      hint: "Subtract 1, then divide by 3.",
      explanation: "$3\\cos x=-1$, so $\\cos x=-\\frac13$.",
    },
    {
      id: "trig-eq-ind-5",
      prompt: "Choose the correct period to use for tangent equations.",
      latex: "\\tan x=k",
      answer: "A",
      choices: [
        { label: "A", text: "$\\pi$" },
        { label: "B", text: "$2\\pi$" },
        { label: "C", text: "$\\frac{\\pi}{2}$" },
      ],
      hint: "The tangent pattern repeats every $\\pi$.",
      explanation: "Tangent has period $\\pi$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Giving only one solution.",
      fix: "Check all quadrants in the given domain.",
    },
    {
      mistake: "Ignoring the given domain.",
      fix: "Only list solutions that lie inside the interval in the question.",
    },
    {
      mistake: "Using degrees when radians are required.",
      fix: "Use radians unless the question specifically says degrees.",
    },
    {
      mistake: "Forgetting tangent's period is $\\pi$.",
      fix: "Tangent repeats every $\\pi$, not every $2\\pi$.",
    },
  ],

  masteryQuiz: [
    {
      id: "trig-eq-mastery-1",
      prompt: "Isolate the trig function:",
      latex: "2\\sin x+1=0\\quad \\Rightarrow\\quad \\sin x=\\Box",
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "Subtract 1, then divide by 2.",
      explanation: "$\\sin x=-\\frac12$.",
    },
    {
      id: "trig-eq-mastery-2",
      prompt: "Find the reference angle:",
      latex: "\\cos x=\\frac12",
      answer: "pi/3",
      acceptedAnswers: ["\\pi/3", "π/3"],
      hint: "Use exact values.",
      explanation: "The reference angle is $\\frac{\\pi}{3}$.",
    },
    {
      id: "trig-eq-mastery-3",
      prompt: "Choose where sine is negative.",
      latex: "\\sin x<0",
      answer: "C",
      choices: [
        { label: "A", text: "Quadrants I and II" },
        { label: "B", text: "Quadrants II and III" },
        { label: "C", text: "Quadrants III and IV" },
      ],
      hint: "Sine is the y-coordinate.",
      explanation: "Sine is negative below the x-axis.",
    },
    {
      id: "trig-eq-mastery-4",
      prompt: "Find the smaller solution:",
      latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi",
      answer: "pi/3",
      acceptedAnswers: ["\\pi/3", "π/3"],
      hint: "Cosine is positive in quadrant I first.",
      explanation: "The smaller solution is $\\frac{\\pi}{3}$.",
    },
    {
      id: "trig-eq-mastery-5",
      prompt: "Find the larger solution:",
      latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi",
      answer: "5pi/3",
      acceptedAnswers: ["5\\pi/3", "5π/3"],
      hint: "The second solution is in quadrant IV.",
      explanation: "The larger solution is $\\frac{5\\pi}{3}$.",
    },
    {
      id: "trig-eq-mastery-6",
      prompt: "Choose the solutions.",
      latex: "\\sin x=-\\frac12,\\quad 0\\le x\\le2\\pi",
      answer: "A",
      choices: [
        { label: "A", text: "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$" },
        { label: "B", text: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$" },
        { label: "C", text: "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$" },
      ],
      hint: "Sine is negative in quadrants III and IV.",
      explanation: "The solutions are $\\frac{7\\pi}{6}$ and $\\frac{11\\pi}{6}$.",
    },
    {
      id: "trig-eq-mastery-7",
      prompt: "Find the smaller solution:",
      latex: "\\tan x=-1,\\quad 0\\le x\\le2\\pi",
      answer: "3pi/4",
      acceptedAnswers: ["3\\pi/4", "3π/4"],
      hint: "Tangent is negative in quadrant II first.",
      explanation: "The smaller solution is $\\frac{3\\pi}{4}$.",
    },
    {
      id: "trig-eq-mastery-8",
      prompt: "Find the larger solution:",
      latex: "\\tan x=-1,\\quad 0\\le x\\le2\\pi",
      answer: "7pi/4",
      acceptedAnswers: ["7\\pi/4", "7π/4"],
      hint: "The second solution is one period later.",
      explanation: "The larger solution is $\\frac{7\\pi}{4}$.",
    },
    {
      id: "trig-eq-mastery-9",
      prompt: "Choose the solutions.",
      latex: "2\\cos x-1=0,\\quad 0\\le x\\le2\\pi",
      answer: "B",
      choices: [
        { label: "A", text: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$" },
        { label: "B", text: "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$" },
        { label: "C", text: "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$" },
      ],
      hint: "First solve $\\cos x=\\frac12$.",
      explanation: "The solutions are $\\frac{\\pi}{3}$ and $\\frac{5\\pi}{3}$.",
    },
    {
      id: "trig-eq-mastery-10",
      prompt: "Choose the best first step.",
      latex: "3\\sin x-2=0",
      answer: "A",
      choices: [
        { label: "A", text: "Isolate $\\sin x$." },
        { label: "B", text: "Add $2\\pi$ immediately." },
        { label: "C", text: "Change radians to degrees." },
      ],
      hint: "Solve algebraically before using the unit circle.",
      explanation: "The first step is to isolate the trigonometric function.",
    },
  ],

  masteryPassMark: 0.8,
};

export const trigonometricIdentitiesSimplificationLesson: ExplicitLesson = {
  id: "trigonometric-identities-simplification",
  slug: "trigonometric-identities-simplification",
  moduleSlug: "ma-t2-trigonometric-functions-and-identities",
  moduleTitle: "Trigonometric Functions and Identities",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Trigonometric Identities and Simplification",
  description:
    "Use core trigonometric identities to simplify expressions and choose useful rewriting strategies.",
  syllabusArea: "Trigonometric Functions",
  focus: "Trigonometric functions and graphs",
  status: "active",

  video: {
    title: "Trigonometric Identities and Simplification",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use core trigonometric identities to simplify expressions.",

  successCriteria: [
    "Recognise that identities are true for all allowed values.",
    "Use $\\sin^2x+\\cos^2x=1$.",
    "Use $\\tan x=\\frac{\\sin x}{\\cos x}$ where defined.",
    "Simplify expressions such as $1-\\sin^2x$ and $\\tan x\\cos x$.",
    "Notice restrictions when denominators are involved.",
  ],

  teaching: {
    paragraphs: [
      "A trigonometric identity is an equation that is true for all allowed values of the variable.",
      "The most important identity in this lesson is $\\sin^2x+\\cos^2x=1$.",
      "Another core identity is $\\tan x=\\frac{\\sin x}{\\cos x}$, where $\\cos x\\ne0$.",
      "Simplification usually means reducing the number of trig functions or rewriting everything in terms of sine and cosine.",
      "Choose an identity based on what appears in the expression. If you see $1-\\sin^2x$, think about rearranging the Pythagorean identity.",
    ],
    latexBlocks: [
      "\\sin^2x+\\cos^2x=1",
      "\\tan x=\\frac{\\sin x}{\\cos x},\\quad \\cos x\\ne0",
      "1-\\sin^2x=\\cos^2x",
      "1-\\cos^2x=\\sin^2x",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Use the Pythagorean identity",
      questionLatex: "\\sin^2x+\\cos^2x",
      steps: [
        {
          explanation: "Recognise the core identity.",
          latex: "\\sin^2x+\\cos^2x=1",
        },
      ],
      finalAnswerLatex: "1",
    },
    {
      title: "Worked example 2: Rewrite tangent",
      questionLatex: "\\tan x\\cos x",
      steps: [
        {
          explanation: "Replace tangent with sine over cosine.",
          latex: "\\tan x\\cos x=\\frac{\\sin x}{\\cos x}\\cos x",
        },
        {
          explanation: "Cancel the cosine factor where $\\cos x\\ne0$.",
          latex: "\\frac{\\sin x}{\\cos x}\\cos x=\\sin x",
        },
      ],
      finalAnswerLatex: "\\sin x",
    },
    {
      title: "Worked example 3: Rearrange the identity",
      questionLatex: "1-\\sin^2x",
      steps: [
        {
          explanation: "Start with the Pythagorean identity.",
          latex: "\\sin^2x+\\cos^2x=1",
        },
        {
          explanation: "Rearrange it.",
          latex: "\\cos^2x=1-\\sin^2x",
        },
      ],
      finalAnswerLatex: "\\cos^2x",
    },
  ],

  guidedPractice: [
    {
      id: "identity-guided-1",
      prompt: "Complete the identity:",
      latex: "\\sin^2x+\\cos^2x=\\Box",
      answer: "1",
      hint: "This is the core Pythagorean identity.",
      explanation: "$\\sin^2x+\\cos^2x=1$.",
    },
    {
      id: "identity-guided-2",
      prompt: "Rewrite tangent in terms of sine and cosine:",
      latex: "\\tan x=\\Box",
      answer: "sinx/cosx",
      acceptedAnswers: ["sin(x)/cos(x)", "\\sin x/\\cos x", "\\frac{\\sin x}{\\cos x}"],
      hint: "Tangent is sine divided by cosine.",
      explanation: "$\\tan x=\\frac{\\sin x}{\\cos x}$.",
    },
    {
      id: "identity-guided-3",
      prompt: "Simplify:",
      latex: "1-\\sin^2x",
      answer: "cos^2x",
      acceptedAnswers: ["cos^2(x)", "\\cos^2x", "\\cos^2(x)"],
      hint: "Rearrange $\\sin^2x+\\cos^2x=1$.",
      explanation: "$1-\\sin^2x=\\cos^2x$.",
    },
    {
      id: "identity-guided-4",
      prompt: "Choose the useful identity.",
      latex: "\\tan x\\cos x",
      answer: "B",
      choices: [
        { label: "A", text: "$\\sin^2x+\\cos^2x=1$" },
        { label: "B", text: "$\\tan x=\\frac{\\sin x}{\\cos x}$" },
      ],
      hint: "The expression contains tangent.",
      explanation: "Use $\\tan x=\\frac{\\sin x}{\\cos x}$.",
    },
  ],

  independentPractice: [
    {
      id: "identity-ind-1",
      prompt: "Simplify:",
      latex: "\\sin^2x+\\cos^2x",
      answer: "1",
      hint: "Use the Pythagorean identity.",
      explanation: "$\\sin^2x+\\cos^2x=1$.",
    },
    {
      id: "identity-ind-2",
      prompt: "Simplify:",
      latex: "\\tan x\\cos x",
      answer: "sinx",
      acceptedAnswers: ["sin(x)", "\\sin x"],
      hint: "Rewrite tangent first.",
      explanation: "$\\tan x\\cos x=\\frac{\\sin x}{\\cos x}\\cos x=\\sin x$.",
    },
    {
      id: "identity-ind-3",
      prompt: "Simplify:",
      latex: "1-\\cos^2x",
      answer: "sin^2x",
      acceptedAnswers: ["sin^2(x)", "\\sin^2x", "\\sin^2(x)"],
      hint: "Rearrange the Pythagorean identity.",
      explanation: "$1-\\cos^2x=\\sin^2x$.",
    },
    {
      id: "identity-ind-4",
      prompt: "Simplify:",
      latex: "\\frac{\\sin x}{\\cos x}",
      answer: "tanx",
      acceptedAnswers: ["tan(x)", "\\tan x"],
      hint: "Use the tangent identity.",
      explanation: "$\\frac{\\sin x}{\\cos x}=\\tan x$ where $\\cos x\\ne0$.",
    },
    {
      id: "identity-ind-5",
      prompt: "Choose the correct simplification.",
      latex: "1-\\sin^2x",
      answer: "C",
      choices: [
        { label: "A", text: "$\\sin^2x$" },
        { label: "B", text: "$1$" },
        { label: "C", text: "$\\cos^2x$" },
      ],
      hint: "Use $\\sin^2x+\\cos^2x=1$.",
      explanation: "$1-\\sin^2x=\\cos^2x$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Treating $\\sin^2x+\\cos^2x$ as $2$.",
      fix: "The identity says $\\sin^2x+\\cos^2x=1$.",
    },
    {
      mistake: "Confusing $1-\\sin^2x$ with $\\sin^2x$.",
      fix: "$1-\\sin^2x=\\cos^2x$.",
    },
    {
      mistake: "Cancelling trig functions incorrectly.",
      fix: "Rewrite carefully first, then cancel common factors only.",
    },
    {
      mistake: "Forgetting that $\\tan x=\\frac{\\sin x}{\\cos x}$.",
      fix: "Use the tangent identity when tangent appears with sine or cosine.",
    },
  ],

  masteryQuiz: [
    {
      id: "identity-mastery-1",
      prompt: "Complete the identity:",
      latex: "\\sin^2x+\\cos^2x=\\Box",
      answer: "1",
      hint: "This identity is true for all $x$.",
      explanation: "$\\sin^2x+\\cos^2x=1$.",
    },
    {
      id: "identity-mastery-2",
      prompt: "Choose the tangent identity.",
      latex: "\\tan x",
      answer: "B",
      choices: [
        { label: "A", text: "$\\frac{\\cos x}{\\sin x}$" },
        { label: "B", text: "$\\frac{\\sin x}{\\cos x}$" },
        { label: "C", text: "$\\sin x\\cos x$" },
      ],
      hint: "Tangent is sine over cosine.",
      explanation: "$\\tan x=\\frac{\\sin x}{\\cos x}$.",
    },
    {
      id: "identity-mastery-3",
      prompt: "Choose the equivalent expression.",
      latex: "\\cos^2x",
      answer: "A",
      choices: [
        { label: "A", text: "$1-\\sin^2x$" },
        { label: "B", text: "$1+\\sin^2x$" },
        { label: "C", text: "$\\sin^2x-1$" },
      ],
      hint: "Rearrange $\\sin^2x+\\cos^2x=1$.",
      explanation: "$\\cos^2x=1-\\sin^2x$.",
    },
    {
      id: "identity-mastery-4",
      prompt: "Simplify:",
      latex: "1-\\sin^2x",
      answer: "A",
      choices: [
        { label: "A", text: "$\\cos^2x$" },
        { label: "B", text: "$\\sin^2x$" },
        { label: "C", text: "$1+\\sin^2x$" },
        { label: "D", text: "$\\tan x$" },
      ],
      hint: "Use the Pythagorean identity.",
      explanation: "$1-\\sin^2x=\\cos^2x$.",
    },
    {
      id: "identity-mastery-5",
      prompt: "Simplify:",
      latex: "1-\\cos^2x",
      answer: "B",
      choices: [
        { label: "A", text: "$\\cos^2x$" },
        { label: "B", text: "$\\sin^2x$" },
        { label: "C", text: "$1+\\cos^2x$" },
        { label: "D", text: "$\\tan x$" },
      ],
      hint: "Rearrange the Pythagorean identity.",
      explanation: "$1-\\cos^2x=\\sin^2x$.",
    },
    {
      id: "identity-mastery-6",
      prompt: "Simplify:",
      latex: "\\tan x\\cos x",
      answer: "C",
      choices: [
        { label: "A", text: "$\\tan x$" },
        { label: "B", text: "$\\cos x$" },
        { label: "C", text: "$\\sin x$" },
        { label: "D", text: "$1$" },
      ],
      hint: "Rewrite tangent first.",
      explanation: "$\\tan x\\cos x=\\sin x$.",
    },
    {
      id: "identity-mastery-7",
      prompt: "Choose the best next step.",
      latex: "\\tan x\\sin x",
      answer: "A",
      choices: [
        { label: "A", text: "Rewrite $\\tan x$ as $\\frac{\\sin x}{\\cos x}$." },
        { label: "B", text: "Replace $\\tan x$ with $1$." },
        { label: "C", text: "Replace $\\sin x$ with $\\cos x$." },
      ],
      hint: "Use the tangent identity.",
      explanation: "The useful first step is rewriting tangent.",
    },
    {
      id: "identity-mastery-8",
      prompt: "Choose the correct statement.",
      latex: "\\sin^2x+\\cos^2x",
      answer: "C",
      choices: [
        { label: "A", text: "It equals $2$." },
        { label: "B", text: "It equals $\\tan x$." },
        { label: "C", text: "It equals $1$." },
      ],
      hint: "This is the core identity.",
      explanation: "$\\sin^2x+\\cos^2x=1$.",
    },
    {
      id: "identity-mastery-9",
      prompt: "Simplify:",
      latex: "\\tan x\\cos x",
      answer: "D",
      choices: [
        { label: "A", text: "$\\cos x$" },
        { label: "B", text: "$\\tan x$" },
        { label: "C", text: "$1$" },
        { label: "D", text: "$\\sin x$" },
      ],
      hint: "Cancel the common cosine factor.",
      explanation: "$\\frac{\\sin x}{\\cos x}\\cos x=\\sin x$ where $\\cos x\\ne0$.",
    },
    {
      id: "identity-mastery-10",
      prompt: "Choose the correct simplification.",
      latex: "\\sin^2x+1-\\sin^2x",
      answer: "B",
      choices: [
        { label: "A", text: "$\\sin^2x$" },
        { label: "B", text: "$1$" },
        { label: "C", text: "$\\cos^2x$" },
      ],
      hint: "The $\\sin^2x$ terms cancel.",
      explanation: "$\\sin^2x+1-\\sin^2x=1$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const modellingPeriodicPhenomenaLesson: ExplicitLesson = {
  id: "modelling-periodic-phenomena",
  slug: "modelling-periodic-phenomena",
  moduleSlug: "ma-f2-further-graph-transformations-and-modelling",
  moduleTitle: "Further Graph Transformations and Modelling",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Modelling Periodic Phenomena",
  description:
    "Interpret amplitude, midline, period, maximum, minimum, and units in trigonometric models of periodic contexts.",
  syllabusArea: "Trigonometric Functions",
  focus: "Trigonometric functions and graphs",
  status: "active",

  video: {
    title: "Modelling Periodic Phenomena",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to interpret trigonometric models in periodic real-world contexts.",

  successCriteria: [
    "Identify amplitude and midline from a model.",
    "Calculate period from $b$.",
    "Find maximum and minimum values using midline and amplitude.",
    "Interpret model parameters in context.",
    "Include appropriate units in contextual answers.",
  ],

  teaching: {
    paragraphs: [
      "Anything in the real world that rises and falls in a regular, repeating cycle — the tide, the height of a seat on a Ferris wheel, daily temperature, hours of daylight through the year — is exactly what a sine or cosine wave describes. Modelling these is not a new technique; it is the same $y=a\\sin(b(t-c))+d$ from the graphing lessons, with each constant now carrying a physical meaning you can point to in the situation. The variable is usually time $t$, and reading the model is just translating between the four numbers and four real quantities.",
      "The midline $d$ is the *average* level the quantity oscillates about — the still water level for a tide, the height of the centre of a Ferris wheel. It sits exactly halfway between the highest and lowest values, so you can recover it from a context by averaging: $d=\\frac{\\text{max}+\\text{min}}{2}$. Everything else swings symmetrically above and below this line.",
      "The amplitude $|a|$ is how far the quantity swings from that average up to its peak (equivalently, down to its trough). Because the high and low are symmetric about the midline, the amplitude is *half* the total range: $|a|=\\frac{\\text{max}-\\text{min}}{2}$. From these two facts together the extremes follow immediately — maximum $=d+|a|$, minimum $=d-|a|$ — which is why a tide of midline $3$ m and amplitude $2$ m runs between $1$ m and $5$ m.",
      "The period is how long one full cycle takes — 12 hours for a tide, 40 seconds for one rotation of a wheel — and it is fixed by $b$ through period $=\\frac{2\\pi}{b}$. In a modelling question you usually know the period from the context and must work *backwards* to find $b$: rearrange to $b=\\frac{2\\pi}{\\text{period}}$. For a wheel turning once every 40 seconds, $b=\\frac{2\\pi}{40}=\\frac{\\pi}{20}$. Resist the temptation to write $b$ equal to the period itself — the $2\\pi$ and the division are what convert 'one cycle per 40 seconds' into the right angular speed.",
      "When you *build* a model from scratch, the starting position chooses the function. If the cycle begins at a peak or a trough — like a wheel starting at the bottom — cosine fits naturally, because plain cosine starts at its maximum; a starting minimum just needs a negative coefficient, $-a$, to flip it to start at the bottom. If instead the cycle begins at the average level and heads upward, plain sine fits, since sine starts on its midline rising. Picking the function that already starts in the right place saves you from juggling a phase shift $c$.",
      "Throughout, keep the units attached and interpret what each answer means in the story. A 'maximum of 22 m' is a height above the ground, a 'period of 12 hours' is the time between successive high tides. Marks in exam modelling questions are won as much for the correct unit and interpretation as for the number, so always close the loop back to the context.",
    ],
    latexBlocks: [
      "h(t)=a\\sin(b(t-c))+d\\quad\\text{(or with }\\cos\\text{)}",
      "\\text{midline }d=\\frac{\\text{max}+\\text{min}}{2},\\qquad \\text{amplitude }|a|=\\frac{\\text{max}-\\text{min}}{2}",
      "\\text{maximum}=d+|a|,\\qquad \\text{minimum}=d-|a|",
      "\\text{period}=\\frac{2\\pi}{|b|}\\ \\Rightarrow\\ b=\\frac{2\\pi}{\\text{period}}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Tide model",
      questionLatex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3",
      steps: [
        { explanation: "The front coefficient is the amplitude: the tide swings 2 m above and below its average level.", latex: "|a|=2\\text{ m}" },
        { explanation: "The constant added on is the midline — the average (still-water) height the tide oscillates about.", latex: "d=3\\text{ m}" },
        { explanation: "Divide $2\\pi$ by $b=\\frac{\\pi}{6}$ to get the cycle length; dividing by a sixth of $\\pi$ multiplies by $\\frac{6}{\\pi}$, giving 12 hours between successive high tides.", latex: "\\frac{2\\pi}{\\pi/6}=2\\pi\\cdot\\frac{6}{\\pi}=12" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }2\\text{ m},\\quad \\text{midline }3\\text{ m},\\quad \\text{period }12\\text{ h}",
      cartesianGraph: {
        description: "The tide height follows one sine wave over twelve hours, moving two metres above and below the midline height of three metres.",
        xMin: 0, xMax: 12, yMin: 0, yMax: 6, xStep: 2, yStep: 1,
        xAxisLabel: "time (hours)", yAxisLabel: "height (m)",
        lines: [{ kind: "linear", m: 0, b: 3, label: "midline h = 3" }],
        sinusoidals: [{ kind: "sin", a: 2, b: Math.PI / 6, c: 0, d: 3, label: "h(t) = 2sin((pi/6)t) + 3", description: "The tide starts on its midline, reaches five metres, returns through the midline, falls to one metre and returns to the midline after twelve hours." }],
        points: [
          { x: 0, y: 3, label: "start" },
          { x: 3, y: 5, label: "maximum" },
          { x: 9, y: 1, label: "minimum" },
          { x: 12, y: 3, label: "one period" },
        ],
      },
    },
    {
      title: "Worked example 2: Ferris wheel model",
      questionLatex: "h(t)=10\\cos\\left(\\frac{\\pi}{15}t\\right)+12",
      steps: [
        { explanation: "Read off the swing and the average: the seat moves 10 m either side of the wheel's centre height of 12 m.", latex: "|a|=10,\\quad d=12" },
        { explanation: "The top of the ride is midline plus amplitude, the bottom is midline minus amplitude — so the seat travels between 2 m and 22 m above the ground.", latex: "\\max=12+10=22,\\quad \\min=12-10=2" },
        { explanation: "Divide $2\\pi$ by $b=\\frac{\\pi}{15}$: one full rotation takes 30 seconds.", latex: "\\frac{2\\pi}{\\pi/15}=2\\pi\\cdot\\frac{15}{\\pi}=30" },
      ],
      finalAnswerLatex:
        "\\text{maximum }22\\text{ m},\\quad \\text{minimum }2\\text{ m},\\quad \\text{period }30\\text{ s}",
      cartesianGraph: {
        description: "The Ferris wheel height follows one cosine wave over thirty seconds, starting at its maximum of twenty-two metres and oscillating around the midline height of twelve metres.",
        xMin: 0, xMax: 30, yMin: 0, yMax: 24, xStep: 5, yStep: 4,
        xAxisLabel: "time (seconds)", yAxisLabel: "height (m)",
        lines: [{ kind: "linear", m: 0, b: 12, label: "midline h = 12" }],
        sinusoidals: [{ kind: "cos", a: 10, b: Math.PI / 15, c: 0, d: 12, label: "h(t) = 10cos((pi/15)t) + 12", description: "The wheel starts at twenty-two metres, reaches two metres halfway through the rotation and returns to twenty-two metres after thirty seconds." }],
        points: [
          { x: 0, y: 22, label: "maximum" },
          { x: 15, y: 2, label: "minimum" },
          { x: 30, y: 22, label: "one rotation" },
        ],
      },
    },
    {
      title: "Worked example 3: Build a Ferris wheel model",
      questionLatex:
        "\\text{A Ferris wheel reaches }18\\text{ m at its highest point and }2\\text{ m at its lowest point. It completes one rotation every }40\\text{ s and starts at its lowest point. Build a model for height }h\\text{ after }t\\text{ seconds.}",
      steps: [
        { explanation: "The midline is the average of the highest and lowest heights. It is the centre height of the wheel.", latex: "\\text{midline}=\\frac{18+2}{2}=10" },
        { explanation: "The amplitude is half the distance from the minimum to the maximum. It measures how far the height moves above or below the midline.", latex: "\\text{amplitude}=\\frac{18-2}{2}=8" },
        { explanation: "One rotation takes 40 seconds, so choose b so that the cosine period is 40.", latex: "b=\\frac{2\\pi}{40}=\\frac{\\pi}{20}" },
        { explanation: "Cosine is convenient because the wheel starts at an extreme value. It starts at the minimum, so use negative cosine to begin 8 metres below the midline.", latex: "h(t)=10-8\\cos\\left(\\frac{\\pi}{20}t\\right)" },
      ],
      finalAnswerLatex:
        "h(t)=10-8\\cos\\left(\\frac{\\pi}{20}t\\right)",
      cartesianGraph: {
        description: "The Ferris wheel height follows one negative cosine wave over forty seconds. It starts at its minimum of two metres, rises to eighteen metres, and returns to two metres.",
        xMin: 0, xMax: 40, yMin: 0, yMax: 20, xStep: 5, yStep: 2,
        xAxisLabel: "time (seconds)", yAxisLabel: "height (m)",
        lines: [{ kind: "linear", m: 0, b: 10, label: "midline h = 10" }],
        sinusoidals: [{ kind: "cos", a: -8, b: Math.PI / 20, c: 0, d: 10, label: "h(t) = 10 - 8cos((pi/20)t)", description: "The negative cosine model begins eight metres below its midline, reaches its highest point after twenty seconds and completes one rotation after forty seconds." }],
        points: [
          { x: 0, y: 2, label: "start: minimum" },
          { x: 20, y: 18, label: "maximum" },
          { x: 40, y: 2, label: "one rotation" },
        ],
      },
    },
  ],

  guidedPractice: [
    {
      id: "model-guided-1",
      prompt: "Find the amplitude:",
      latex: "h(t)=4\\sin\\left(\\frac{\\pi}{8}t\\right)+10",
      answer: "4",
      hint: "Amplitude is $|a|$.",
      explanation: "The amplitude is $4$.",
    },
    {
      id: "model-guided-2",
      prompt: "Find the midline:",
      latex: "h(t)=4\\sin\\left(\\frac{\\pi}{8}t\\right)+10",
      answer: "10",
      acceptedAnswers: ["h=10", "y=10"],
      hint: "The midline is the vertical shift.",
      explanation: "The midline is $h=10$.",
    },
    {
      id: "model-guided-3",
      prompt: "Find the period:",
      latex: "h(t)=4\\sin\\left(\\frac{\\pi}{8}t\\right)+10",
      answer: "16",
      hint: "Use $\\frac{2\\pi}{\\pi/8}$.",
      explanation: "The period is $16$.",
    },
    {
      id: "model-guided-4",
      prompt: "Find the maximum value:",
      latex: "\\text{amplitude}=4,\\quad \\text{midline}=10",
      answer: "14",
      hint: "Maximum is midline plus amplitude.",
      explanation: "The maximum is $10+4=14$.",
    },
  ],

  independentPractice: [
    {
      id: "model-ind-1",
      prompt: "Find the amplitude:",
      latex: "T(t)=6\\cos\\left(\\frac{\\pi}{12}t\\right)+18",
      answer: "6",
      hint: "Amplitude is $|a|$.",
      explanation: "The amplitude is $6$ degrees.",
    },
    {
      id: "model-ind-2",
      prompt: "Find the period:",
      latex: "T(t)=6\\cos\\left(\\frac{\\pi}{12}t\\right)+18",
      answer: "24",
      hint: "Use $\\frac{2\\pi}{\\pi/12}$.",
      explanation: "The period is $24$ hours.",
    },
    {
      id: "model-ind-3",
      prompt: "Find the minimum value:",
      latex: "h(t)=10\\cos\\left(\\frac{\\pi}{15}t\\right)+12",
      answer: "2",
      hint: "Minimum is midline minus amplitude.",
      explanation: "The minimum is $12-10=2$.",
    },
    {
      id: "model-ind-4",
      prompt: "Choose what the midline usually represents in a model.",
      latex: "y=a\\sin(bt)+d",
      answer: "B",
      choices: [
        { label: "A", text: "the maximum value" },
        { label: "B", text: "the average value" },
        { label: "C", text: "the period" },
      ],
      hint: "The model oscillates around the midline.",
      explanation: "The midline represents the average value.",
    },
    {
      id: "model-ind-5",
      prompt: "Find the maximum height:",
      latex: "h(t)=1.5\\sin\\left(\\frac{\\pi}{6}t\\right)+2.4",
      answer: "3.9",
      acceptedAnswers: ["3.9 m", "3.9 metres", "3.9 meters"],
      hint: "Add amplitude to midline.",
      explanation: "The maximum is $2.4+1.5=3.9$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Confusing amplitude with maximum value.",
      fix: "Maximum is midline plus amplitude.",
    },
    {
      mistake: "Forgetting the midline when finding maximum or minimum.",
      fix: "Use $d+|a|$ and $d-|a|$.",
    },
    {
      mistake: "Using $b$ as the period.",
      fix: "For sine and cosine models, period is $\\frac{2\\pi}{|b|}$.",
    },
    {
      mistake: "Ignoring units in context.",
      fix: "Include units such as metres, hours, degrees, or seconds.",
    },
  ],

  masteryQuiz: [
    {
      id: "model-mastery-1",
      prompt: "Find the amplitude:",
      latex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3",
      answer: "2",
      hint: "Amplitude is $|a|$.",
      explanation: "The amplitude is $2$.",
    },
    {
      id: "model-mastery-2",
      prompt: "Find the midline:",
      latex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3",
      answer: "3",
      acceptedAnswers: ["h=3", "y=3"],
      hint: "The midline is $d$.",
      explanation: "The midline is $h=3$.",
    },
    {
      id: "model-mastery-3",
      prompt: "Find the maximum value:",
      latex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3",
      answer: "5",
      hint: "Add amplitude to midline.",
      explanation: "The maximum is $3+2=5$.",
    },
    {
      id: "model-mastery-4",
      prompt: "Find the period:",
      latex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3",
      answer: "12",
      hint: "Use $\\frac{2\\pi}{\\pi/6}$.",
      explanation: "The period is $12$.",
    },
    {
      id: "model-mastery-5",
      prompt: "Find the period:",
      latex: "D(t)=3\\cos\\left(\\frac{\\pi}{10}t\\right)+8",
      answer: "20",
      hint: "Use $\\frac{2\\pi}{\\pi/10}$.",
      explanation: "The period is $20$.",
    },
    {
      id: "model-mastery-6",
      prompt: "Find the minimum value:",
      latex: "D(t)=3\\cos\\left(\\frac{\\pi}{10}t\\right)+8",
      answer: "5",
      hint: "Midline minus amplitude.",
      explanation: "The minimum is $8-3=5$.",
    },
    {
      id: "model-mastery-7",
      prompt: "Choose what amplitude means in a tide model.",
      latex: "h(t)=a\\sin(bt)+d",
      answer: "A",
      choices: [
        { label: "A", text: "half the distance between high and low tide" },
        { label: "B", text: "the time for one cycle" },
        { label: "C", text: "the average height" },
      ],
      hint: "Amplitude is a vertical distance.",
      explanation: "Amplitude is half the distance between maximum and minimum.",
    },
    {
      id: "model-mastery-8",
      prompt: "If the variable $t$ is measured in the unit shown, choose the matching unit for the period.",
      latex: "t\\text{ measured in }\\mathrm{h}",
      answer: "B",
      choices: [
        { label: "A", text: "metres" },
        { label: "B", text: "hours" },
        { label: "C", text: "square units" },
      ],
      hint: "Period is measured in the input unit.",
      explanation: "If $t$ is in hours, the period is in hours.",
    },
    {
      id: "model-mastery-9",
      prompt: "A Ferris wheel model has midline $12$ m and amplitude $10$ m. Find the maximum height.",
      latex: "\\text{midline}=12,\\quad \\text{amplitude}=10",
      answer: "22",
      acceptedAnswers: ["22 m", "22 metres", "22 meters"],
      hint: "Add the amplitude.",
      explanation: "Maximum height is $12+10=22$ m.",
    },
    {
      id: "model-mastery-10",
      prompt: "Choose the best interpretation of $d$.",
      latex: "y=a\\cos(bt)+d",
      answer: "C",
      choices: [
        { label: "A", text: "amplitude" },
        { label: "B", text: "period" },
        { label: "C", text: "midline or average value" },
      ],
      hint: "$d$ is the vertical shift.",
      explanation: "$d$ gives the midline or average value.",
    },
  ],

  masteryPassMark: 0.8,
};

export const logarithmicScalesLesson: ExplicitLesson = {
  id: "logarithmic-scales",
  slug: "logarithmic-scales",
  moduleSlug: "ma-f2-further-graph-transformations-and-modelling",
  moduleTitle: "Further Graph Transformations and Modelling",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Logarithmic Scales",
  description:
    "Understand why logarithmic scales compress quantities that span many orders of magnitude, and model and solve problems involving decibels, the Richter scale, star magnitudes, and pH.",
  syllabusArea: "Functions",
  focus: "Further graph transformations and modelling",
  status: "active",
  video: {
    title: "Logarithmic Scales",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Learn why and how logarithmic scales are used to model quantities that range over many orders of magnitude.",
  successCriteria: [
    "Explain when a logarithmic scale is suitable (quantities spanning many orders of magnitude).",
    "Use the decibel formula $L=10\\log_{10}\\!\\frac{I}{I_0}$.",
    "Interpret equal steps on a log scale as equal multiplicative factors (e.g. +1 on Richter $=\\times 10$).",
    "Use $\\text{pH}=-\\log_{10}[\\text{H}^+]$ and convert both ways.",
    "Compare two quantities using the difference of their scale values.",
  ],
  teaching: {
    paragraphs: [
      "Some quantities range over an enormous span. Sound intensities from a whisper to a jet engine differ by a factor of over a trillion; earthquake amplitudes and acid concentrations are similar. Plotting such numbers on an ordinary (linear) axis is hopeless — the small values are crushed against zero. A logarithmic scale fixes this by recording the logarithm of the quantity instead of the quantity itself, so a huge multiplicative range becomes a small, evenly-spaced additive range.",
      "The defining feature of a log scale is that equal steps represent equal multiplying factors, not equal differences. On a base-10 log scale, moving up by 1 means the underlying quantity is $\\times 10$; moving up by 2 means $\\times 100$. This is exactly the behaviour of $\\log_{10}$: $\\log(10x)=\\log x+1$. So a log scale turns 'multiply by 10' into 'add 1', which is what makes vast ranges manageable. A log scale is the right choice precisely when a quantity is naturally compared by ratios rather than by differences.",
      "The decibel scale for sound uses $L=10\\log_{10}\\!\\dfrac{I}{I_0}$, where $I$ is the sound's intensity and $I_0=10^{-12}\\,\\text{W/m}^2$ is a fixed reference. The ratio $\\frac{I}{I_0}$ is taken first, then its logarithm, then $\\times 10$. Because of the $\\times 10$, here each factor of $10$ in intensity adds $10\\,\\text{dB}$, and a factor of $2$ adds about $3\\,\\text{dB}$ (since $10\\log 2\\approx 3$). To compare two sounds, subtract their levels: the difference depends only on the intensity ratio, $\\Delta L=10\\log_{10}\\!\\frac{I_2}{I_1}$.",
      "The Richter (seismic) scale works the same way: an earthquake's magnitude is $M=\\log_{10}\\!\\dfrac{A}{A_0}$, the logarithm of the ground-movement amplitude relative to a reference. Because there is no factor of 10 out the front, each whole number of magnitude is a full factor of $10$ in amplitude — a magnitude 7 quake has $10$ times the amplitude of a magnitude 6, and $100$ times that of a magnitude 5. Differences in magnitude translate to powers of ten in amplitude: an amplitude ratio of $10^{(M_2-M_1)}$.",
      "The pH scale measures acidity by $\\text{pH}=-\\log_{10}[\\text{H}^+]$, where $[\\text{H}^+]$ is the hydrogen-ion concentration. Two things are worth noting. First, each whole pH unit is a factor of $10$ in concentration, so pH 3 is ten times more acidic than pH 4 and a hundred times more acidic than pH 5. Second, the minus sign flips the direction: a higher $[\\text{H}^+]$ gives a lower pH, so smaller pH means more acidic. To go back from pH to concentration, reverse the formula: $[\\text{H}^+]=10^{-\\text{pH}}$.",
      "Star brightness uses a logarithmic 'magnitude' scale too, with the historical quirk that brighter stars have smaller magnitudes, and a difference of $5$ magnitudes corresponds to a brightness factor of exactly $100$. The common thread across all four scales is identical: a logarithm converts a quantity that varies multiplicatively over a vast range into a tidy additive scale, where you move between the scale value and the raw quantity using logs one way and powers of ten the other way.",
    ],
    latexBlocks: [
      "\\text{decibels: } L=10\\log_{10}\\frac{I}{I_0}, \\quad I_0=10^{-12}\\,\\text{W/m}^2",
      "\\Delta L=10\\log_{10}\\frac{I_2}{I_1} \\quad (+10\\,\\text{dB}\\Rightarrow \\times 10 \\text{ intensity})",
      "\\text{Richter: } M=\\log_{10}\\frac{A}{A_0}, \\quad \\frac{A_2}{A_1}=10^{(M_2-M_1)}",
      "\\text{pH}=-\\log_{10}[\\text{H}^+], \\quad [\\text{H}^+]=10^{-\\text{pH}}",
    ],
  },
  workedExamples: [
    {
      title: "Worked example 1: A decibel level",
      questionLatex:
        "\\text{A sound has intensity } I=10^{-6}\\,\\text{W/m}^2. \\text{ With } I_0=10^{-12}, \\text{ find the level } L.",
      steps: [
        { explanation: "Form the ratio and take its logarithm.", latex: "\\frac{I}{I_0}=\\frac{10^{-6}}{10^{-12}}=10^{6}" },
        { explanation: "Apply the decibel formula.", latex: "L=10\\log_{10}(10^{6})=10\\times 6=60\\,\\text{dB}" },
      ],
      finalAnswerLatex: "L=60\\,\\text{dB}",
    },
    {
      title: "Worked example 2: Comparing intensities",
      questionLatex:
        "\\text{Sound A is } 100 \\text{ times as intense as sound B. How many dB louder is A?}",
      steps: [
        { explanation: "The difference depends only on the intensity ratio.", latex: "\\Delta L=10\\log_{10}\\frac{I_A}{I_B}=10\\log_{10}(100)" },
        { explanation: "Evaluate.", latex: "=10\\times 2=20\\,\\text{dB}" },
      ],
      finalAnswerLatex: "A \\text{ is } 20\\,\\text{dB louder.}",
    },
    {
      title: "Worked example 3: Richter amplitude ratio",
      questionLatex:
        "\\text{How many times larger is the amplitude of a magnitude } 7 \\text{ quake than a magnitude } 5?",
      steps: [
        { explanation: "Amplitude ratio is ten to the power of the magnitude difference.", latex: "\\frac{A_2}{A_1}=10^{(7-5)}=10^{2}" },
        { explanation: "Evaluate.", latex: "=100" },
      ],
      finalAnswerLatex: "100 \\text{ times larger.}",
    },
    {
      title: "Worked example 4: pH both ways",
      questionLatex:
        "\\text{(a) Find the pH when } [\\text{H}^+]=10^{-4}. \\text{ (b) How many times more acidic is pH } 3 \\text{ than pH } 6?",
      steps: [
        { explanation: "Use $\\text{pH}=-\\log_{10}[\\text{H}^+]$.", latex: "\\text{pH}=-\\log_{10}(10^{-4})=-(-4)=4" },
        { explanation: "Each pH unit is a factor of 10 in $[\\text{H}^+]$; the gap is $6-3=3$ units.", latex: "\\text{factor}=10^{(6-3)}=10^{3}=1000" },
      ],
      finalAnswerLatex: "\\text{(a) pH}=4; \\quad \\text{(b) } 1000 \\text{ times more acidic.}",
    },
  ],
  guidedPractice: [
    {
      id: "logsc-guided-1",
      prompt: "A logarithmic scale is most useful when a quantity:",
      latex: "\\text{Choose one}",
      answer: "B",
      choices: [
        { label: "A", text: "Only takes small values" },
        { label: "B", text: "Ranges over many orders of magnitude (compared by ratios)" },
        { label: "C", text: "Is always negative" },
        { label: "D", text: "Changes by equal additive steps" },
      ],
      hint: "Think whisper-to-jet-engine ranges.",
      explanation:
        "Log scales suit quantities spanning many orders of magnitude, naturally compared by ratios.",
    },
    {
      id: "logsc-guided-2",
      prompt: "On a base-10 log scale, moving up by 1 unit multiplies the quantity by:",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$1$" },
        { label: "C", text: "$10$" },
        { label: "D", text: "$100$" },
      ],
      hint: "$\\log(10x)=\\log x+1$.",
      explanation: "Each $+1$ on a base-10 log scale is a factor of $10$.",
    },
    {
      id: "logsc-guided-3",
      prompt: "Find the pH when $[\\text{H}^+]=10^{-5}$.",
      latex: "\\text{pH}=-\\log_{10}(10^{-5})",
      answer: "5",
      hint: "$-\\log_{10}(10^{-5})$.",
      explanation: "$\\text{pH}=-(-5)=5$.",
    },
    {
      id: "logsc-guided-4",
      prompt:
        "Two earthquakes differ by 2 on the Richter scale. The larger amplitude is how many times the smaller?",
      latex: "10^{(M_2-M_1)}",
      answer: "100",
      hint: "$10^2$.",
      explanation: "$10^{2}=100$ times larger.",
    },
  ],
  independentPractice: [
    {
      id: "logsc-ind-1",
      prompt: "A sound has $I=10^{-4}\\,\\text{W/m}^2$. With $I_0=10^{-12}$, find $L$ in dB.",
      latex: "L=10\\log_{10}\\frac{10^{-4}}{10^{-12}}",
      answer: "80",
      hint: "Ratio is $10^{8}$.",
      explanation: "$L=10\\log_{10}(10^{8})=80\\,\\text{dB}$.",
    },
    {
      id: "logsc-ind-2",
      prompt: "If the pH is 2, the hydrogen-ion concentration $[\\text{H}^+]$ is:",
      latex: "[\\text{H}^+]=10^{-\\text{pH}}",
      answer: "A",
      choices: [
        { label: "A", text: "$10^{-2}$" },
        { label: "B", text: "$10^{2}$" },
        { label: "C", text: "$2$" },
        { label: "D", text: "$10^{-12}$" },
      ],
      hint: "$[\\text{H}^+]=10^{-\\text{pH}}$.",
      explanation: "$[\\text{H}^+]=10^{-2}$.",
    },
    {
      id: "logsc-ind-3",
      prompt:
        "Two earthquakes differ by 3 on the Richter scale. The amplitude ratio is:",
      latex: "10^{3}",
      answer: "1000",
      hint: "$10^3$.",
      explanation: "$10^{3}=1000$.",
    },
    {
      id: "logsc-ind-4",
      prompt: "An increase of $20\\,\\text{dB}$ means the sound intensity is multiplied by:",
      latex: "\\text{Choose one}",
      answer: "C",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$20$" },
        { label: "C", text: "$100$" },
        { label: "D", text: "$10$" },
      ],
      hint: "$20=10\\log_{10}(?)$.",
      explanation: "$20=10\\log_{10}(100)$, so intensity $\\times 100$.",
    },
    {
      id: "logsc-ind-5",
      prompt:
        "How many times more acidic is a solution of pH 4 than one of pH 7?",
      latex: "10^{(7-4)}",
      answer: "1000",
      hint: "$10^{3}$.",
      explanation: "Gap of 3 pH units $=10^{3}=1000$ times more acidic.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Treating a difference on a log scale as a difference in the quantity rather than a ratio.",
      fix: "A gap of $k$ units means the quantity is multiplied by $10^{k}$ (or the relevant base).",
    },
    {
      mistake: "Forgetting the factor of 10 in the decibel formula.",
      fix: "$L=10\\log_{10}\\frac{I}{I_0}$; a factor of 10 in intensity is $+10\\,\\text{dB}$, not $+1$.",
    },
    {
      mistake: "Getting the pH direction backwards.",
      fix: "Because of the minus sign, higher $[\\text{H}^+]$ gives lower pH — smaller pH is more acidic.",
    },
    {
      mistake: "Taking the logarithm of the raw quantity without forming the ratio to the reference.",
      fix: "Decibels and Richter use a ratio $\\frac{I}{I_0}$ or $\\frac{A}{A_0}$ inside the log.",
    },
  ],
  masteryQuiz: [
    {
      id: "logsc-m-1",
      prompt: "Moving up 2 units on a base-10 log scale multiplies the quantity by:",
      latex: "\\text{Choose one}",
      answer: "C",
      difficulty: 3,
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$20$" },
        { label: "C", text: "$100$" },
        { label: "D", text: "$4$" },
      ],
      hint: "$10^2$.",
      explanation: "$+2 \\Rightarrow \\times 10^2=\\times 100$.",
    },
    {
      id: "logsc-m-2",
      prompt: "A sound has $I=10^{-3}\\,\\text{W/m}^2$, $I_0=10^{-12}$. Find $L$.",
      latex: "10\\log_{10}(10^{9})",
      answer: "90",
      difficulty: 3,
      hint: "Ratio $10^9$.",
      explanation: "$L=10\\times 9=90\\,\\text{dB}$.",
    },
    {
      id: "logsc-m-3",
      prompt: "pH when $[\\text{H}^+]=10^{-9}$:",
      latex: "-\\log_{10}(10^{-9})",
      answer: "9",
      difficulty: 3,
      hint: "$-(-9)$.",
      explanation: "$\\text{pH}=9$.",
    },
    {
      id: "logsc-m-4",
      prompt:
        "An earthquake of magnitude 6 has amplitude how many times that of magnitude 3?",
      latex: "10^{(6-3)}",
      answer: "1000",
      difficulty: 4,
      hint: "$10^3$.",
      explanation: "$10^{3}=1000$.",
    },
    {
      id: "logsc-m-5",
      prompt: "An increase of $30\\,\\text{dB}$ corresponds to an intensity factor of:",
      latex: "30=10\\log_{10}(?)",
      answer: "1000",
      difficulty: 4,
      hint: "$30/10=3$, so $10^3$.",
      explanation: "$10^{3}=1000$.",
    },
    {
      id: "logsc-m-6",
      prompt:
        "Which solution is more acidic, pH 3 or pH 6, and by what factor?",
      latex: "\\text{Choose one}",
      answer: "A",
      difficulty: 4,
      choices: [
        { label: "A", text: "pH 3, by a factor of 1000" },
        { label: "B", text: "pH 6, by a factor of 1000" },
        { label: "C", text: "pH 3, by a factor of 3" },
        { label: "D", text: "They are equally acidic" },
      ],
      hint: "Lower pH is more acidic; gap is 3 units.",
      explanation: "pH 3 is more acidic by $10^{3}=1000$ times.",
    },
    {
      id: "logsc-m-7",
      prompt:
        "Why is a logarithmic scale suitable for sound intensity?",
      latex: "\\text{Choose one}",
      answer: "B",
      difficulty: 3,
      choices: [
        { label: "A", text: "Intensities are always negative" },
        { label: "B", text: "Intensities span an enormous range, compared by ratios" },
        { label: "C", text: "Intensity changes by equal additive steps" },
        { label: "D", text: "Sound is periodic" },
      ],
      hint: "Whisper to jet engine.",
      explanation: "The vast multiplicative range is tamed by a log scale.",
    },
    {
      id: "logsc-m-8",
      prompt:
        "A sound increases from $40\\,\\text{dB}$ to $70\\,\\text{dB}$. The intensity is multiplied by:",
      latex: "10^{(70-40)/10}",
      answer: "1000",
      difficulty: 5,
      hint: "$\\Delta L=30\\,\\text{dB}\\Rightarrow 10^{3}$.",
      explanation: "$\\Delta L=30$, so factor $=10^{30/10}=10^{3}=1000$.",
    },
    {
      id: "logsc-m-9",
      prompt:
        "Star A is 5 magnitudes brighter than star B (smaller magnitude). A is how many times brighter?",
      latex: "\\text{5 magnitudes}",
      answer: "100",
      difficulty: 5,
      hint: "A difference of 5 magnitudes is a factor of 100.",
      explanation: "By definition, 5 magnitudes $=\\times 100$ in brightness.",
    },
    {
      id: "logsc-m-10",
      prompt: "If $[\\text{H}^+]=10^{-3}$, the pH is:",
      latex: "-\\log_{10}(10^{-3})",
      answer: "3",
      difficulty: 3,
      hint: "$-(-3)$.",
      explanation: "$\\text{pH}=3$.",
    },
  ],
  masteryQuizPool: [
    { id: "logsc-p-1", prompt: "A log scale suits quantities that:", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Are always small" }, { label: "B", text: "Span many orders of magnitude" }, { label: "C", text: "Are negative" }, { label: "D", text: "Change additively" }], hint: "Orders of magnitude.", explanation: "Quantities spanning huge multiplicative ranges." },
    { id: "logsc-p-2", prompt: "$+1$ on a base-10 log scale means $\\times$", latex: "\\text{Choose one}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$1$" }, { label: "B", text: "$2$" }, { label: "C", text: "$10$" }, { label: "D", text: "$100$" }], hint: "$\\log(10x)=\\log x+1$.", explanation: "$\\times 10$." },
    { id: "logsc-p-3", prompt: "$+3$ on a base-10 log scale means $\\times$", latex: "10^3", answer: "1000", difficulty: 2, hint: "$10^3$.", explanation: "$\\times 1000$." },
    { id: "logsc-p-4", prompt: "pH when $[\\text{H}^+]=10^{-4}$:", latex: "-\\log_{10}(10^{-4})", answer: "4", difficulty: 1, hint: "$-(-4)$.", explanation: "$4$." },
    { id: "logsc-p-5", prompt: "pH when $[\\text{H}^+]=10^{-7}$:", latex: "-\\log_{10}(10^{-7})", answer: "7", difficulty: 1, hint: "$-(-7)$.", explanation: "$7$ (neutral)." },
    { id: "logsc-p-6", prompt: "pH when $[\\text{H}^+]=10^{-1}$:", latex: "-\\log_{10}(10^{-1})", answer: "1", difficulty: 2, hint: "$-(-1)$.", explanation: "$1$ (strongly acidic)." },
    { id: "logsc-p-7", prompt: "$[\\text{H}^+]$ when pH $=3$:", latex: "10^{-\\text{pH}}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$10^{3}$" }, { label: "B", text: "$10^{-3}$" }, { label: "C", text: "$3$" }, { label: "D", text: "$-3$" }], hint: "$10^{-3}$.", explanation: "$[\\text{H}^+]=10^{-3}$." },
    { id: "logsc-p-8", prompt: "$L$ for $I=10^{-6}$, $I_0=10^{-12}$:", latex: "10\\log_{10}(10^{6})", answer: "60", difficulty: 2, hint: "$10\\times 6$.", explanation: "$60\\,\\text{dB}$." },
    { id: "logsc-p-9", prompt: "$L$ for $I=10^{-4}$, $I_0=10^{-12}$:", latex: "10\\log_{10}(10^{8})", answer: "80", difficulty: 2, hint: "$10\\times 8$.", explanation: "$80\\,\\text{dB}$." },
    { id: "logsc-p-10", prompt: "$L$ for $I=10^{-2}$, $I_0=10^{-12}$:", latex: "10\\log_{10}(10^{10})", answer: "100", difficulty: 3, hint: "$10\\times 10$.", explanation: "$100\\,\\text{dB}$." },
    { id: "logsc-p-11", prompt: "Intensity ratio for $+10\\,\\text{dB}$:", latex: "10^{10/10}", answer: "10", difficulty: 2, hint: "$10^1$.", explanation: "$\\times 10$." },
    { id: "logsc-p-12", prompt: "Intensity ratio for $+20\\,\\text{dB}$:", latex: "10^{20/10}", answer: "100", difficulty: 3, hint: "$10^2$.", explanation: "$\\times 100$." },
    { id: "logsc-p-13", prompt: "Intensity ratio for $+40\\,\\text{dB}$:", latex: "10^{40/10}", answer: "10000", difficulty: 4, hint: "$10^4$.", explanation: "$\\times 10000$." },
    { id: "logsc-p-14", prompt: "Amplitude ratio for Richter magnitudes 5 and 7:", latex: "10^{2}", answer: "100", difficulty: 3, hint: "$10^{7-5}$.", explanation: "$100$." },
    { id: "logsc-p-15", prompt: "Amplitude ratio for Richter magnitudes 4 and 8:", latex: "10^{4}", answer: "10000", difficulty: 4, hint: "$10^{8-4}$.", explanation: "$10000$." },
    { id: "logsc-p-16", prompt: "Amplitude ratio for Richter magnitudes 2 and 5:", latex: "10^{3}", answer: "1000", difficulty: 3, hint: "$10^{5-2}$.", explanation: "$1000$." },
    { id: "logsc-p-17", prompt: "Which is more acidic?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "pH 2" }, { label: "B", text: "pH 8" }, { label: "C", text: "Equal" }, { label: "D", text: "Cannot tell" }], hint: "Lower pH = more acidic.", explanation: "pH 2 (lower pH)." },
    { id: "logsc-p-18", prompt: "Acidity factor between pH 2 and pH 5:", latex: "10^{3}", answer: "1000", difficulty: 4, hint: "$10^{5-2}$.", explanation: "pH 2 is $1000\\times$ more acidic." },
    { id: "logsc-p-19", prompt: "Acidity factor between pH 4 and pH 6:", latex: "10^{2}", answer: "100", difficulty: 3, hint: "$10^{6-4}$.", explanation: "$100\\times$." },
    { id: "logsc-p-20", prompt: "A jump from $50\\,\\text{dB}$ to $80\\,\\text{dB}$ multiplies intensity by:", latex: "10^{(80-50)/10}", answer: "1000", difficulty: 4, hint: "$\\Delta=30$, $10^3$.", explanation: "$1000$." },
    { id: "logsc-p-21", prompt: "A jump from $20\\,\\text{dB}$ to $60\\,\\text{dB}$ multiplies intensity by:", latex: "10^{(60-20)/10}", answer: "10000", difficulty: 5, hint: "$\\Delta=40$, $10^4$.", explanation: "$10000$." },
    { id: "logsc-p-22", prompt: "5 star magnitudes corresponds to a brightness factor of:", latex: "\\text{5 magnitudes}", answer: "100", difficulty: 4, hint: "By definition.", explanation: "$\\times 100$." },
    { id: "logsc-p-23", prompt: "On the Richter scale, $+1$ magnitude is an amplitude factor of:", latex: "10^{1}", answer: "10", difficulty: 2, hint: "$10^1$.", explanation: "$\\times 10$." },
    { id: "logsc-p-24", prompt: "Why does the decibel formula have a factor of 10?", latex: "\\text{Choose one}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "To make answers negative" }, { label: "B", text: "It scales bels into decibels, so $\\times 10$ intensity is $+10\\,\\text{dB}$" }, { label: "C", text: "Because $I_0=10$" }, { label: "D", text: "It has no effect" }], hint: "deci = one tenth.", explanation: "The $\\times 10$ converts bels to decibels; a factor of 10 in intensity is $+10\\,\\text{dB}$." },
    { id: "logsc-p-25", prompt: "$[\\text{H}^+]$ when pH $=6$:", latex: "10^{-\\text{pH}}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$10^{6}$" }, { label: "B", text: "$10^{-6}$" }, { label: "C", text: "$6$" }, { label: "D", text: "$-6$" }], hint: "$10^{-6}$.", explanation: "$[\\text{H}^+]=10^{-6}$." },
    { id: "logsc-p-26", prompt: "$L$ for $I=10^{-9}$, $I_0=10^{-12}$:", latex: "10\\log_{10}(10^{3})", answer: "30", difficulty: 3, hint: "ratio $10^3$.", explanation: "$30\\,\\text{dB}$." },
  ],
  multiPartPractice: [
    {
      id: "logsc-mp-1",
      prompt:
        "Sound intensity level is given by $L=10\\log_{10}\\dfrac{I}{I_0}$ with $I_0=10^{-12}\\,\\text{W/m}^2$.",
      latex: "L=10\\log_{10}\\frac{I}{I_0}",
      answer: "70",
      hint: "Form the ratio $\\frac{I}{I_0}$, then apply the formula; a factor change in intensity adds $10\\log_{10}(\\text{factor})$ dB.",
      explanation:
        "(a) For $I=10^{-5}$: $\\frac{I}{I_0}=10^{7}$, so $L=10\\times 7=70\\,\\text{dB}$. (b) A sound $1000\\times$ more intense is $10\\log_{10}(1000)=30\\,\\text{dB}$ louder. (c) Its level is $70+30=100\\,\\text{dB}$.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find $L$ for a sound of intensity $I=10^{-5}\\,\\text{W/m}^2$.", latex: "10\\log_{10}\\frac{10^{-5}}{10^{-12}}", marks: 2, answer: "70", acceptedAnswers: [], hint: "Ratio is $10^{7}$.", explanation: "$L=10\\times 7=70\\,\\text{dB}$." },
        { key: "b", label: "(b)", prompt: "A second sound is 1000 times more intense. By how many dB is it louder?", latex: "10\\log_{10}(1000)", marks: 2, answer: "30", acceptedAnswers: [], hint: "$10\\log_{10}(1000)$.", explanation: "$10\\times 3=30\\,\\text{dB}$." },
        { key: "c", label: "(c)", prompt: "Find the level of the second sound.", latex: "70+30", marks: 1, answer: "100", acceptedAnswers: [], hint: "Add the increase to part (a).", explanation: "$70+30=100\\,\\text{dB}$." },
      ],
    },
  ],
  masteryPassMark: 0.8,
};

export const mixedTrigonometricFunctionsExamPracticeLesson: ExplicitLesson = {
  id: "mixed-trigonometric-functions-exam-practice",
  slug: "mixed-trigonometric-functions-exam-practice",
  moduleSlug: "ma-f2-further-graph-transformations-and-modelling",
  moduleTitle: "Further Graph Transformations and Modelling",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Mixed Trigonometric Functions Exam Practice",
  description:
    "Practise mixed exam-style trigonometric questions involving exact values, graphs, equations, identities, and modelling.",
  syllabusArea: "Trigonometric Functions",
  focus: "Trigonometric functions and graphs",
  status: "active",

  video: {
    title: "Mixed Trigonometric Functions Exam Practice",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to choose and combine trigonometric skills in mixed exam-style questions.",

  successCriteria: [
    "Identify which trigonometric skill a question is testing.",
    "Use exact values and unit-circle signs accurately.",
    "Interpret graph features such as amplitude, period, and midline.",
    "Solve trigonometric equations within a domain.",
    "Interpret trigonometric models with units and context.",
  ],

  teaching: {
    paragraphs: [
      "An exam rarely tells you which trig skill a question wants — it just hands you an expression, a graph, or a worded scenario and expects you to recognise the type and reach for the right tool. This lesson is about that recognition. The four skills from this topic each have a tell-tale signature, and reading the signature first is what stops you from, say, trying to 'solve' a graph-features question or forgetting to find every root of an equation.",
      "If the question gives an equation with the unknown inside the trig function — something equal to a number, over a stated domain like $0\\le x\\le 2\\pi$ — it is an equation to *solve*. Isolate the trig function, find the reference angle from exact values, then use the quadrant signs and the period to list *every* solution in the domain. The recurring trap is stopping at the calculator's first answer: the graph of the function crosses the level line more than once per period, so there are almost always multiple solutions.",
      "If the question gives a function such as $y=3\\cos(2x)-1$ and asks about its shape, it is a *graph-features* question. Map each constant to its feature without solving anything: the front coefficient gives amplitude $|a|$, the inside coefficient gives period $\\frac{2\\pi}{|b|}$, the added constant gives midline $y=d$, and the extremes are $d\\pm|a|$. Remember period is $2\\pi$ divided by $b$ — a bigger $b$ means a shorter cycle.",
      "If the question is wrapped in a real-world story — tides, a Ferris wheel, temperature over a day — it is a *modelling* question, and the very same constants now carry physical meaning: amplitude is how far the quantity swings from its average, the midline is that average, and the period is the time for one cycle. Finish by answering in context with units, since a bare number rarely earns full marks here.",
      "A handful of questions test an *exact value* or a quick *identity*. Exact-value questions ($\\sin\\frac{\\pi}{3}$, $\\cos\\pi$) are answered straight from the unit circle. The identity you will lean on most is the Pythagorean one, $\\sin^2 x+\\cos^2 x=1$, which comes directly from the unit circle: the point $(\\cos x,\\sin x)$ lies on a circle of radius 1, so its coordinates satisfy $x^2+y^2=1$. That single identity lets you rewrite $1-\\sin^2 x$ as $\\cos^2 x$ and simplify expressions that look harder than they are.",
      "Across all four types, two habits protect your marks: work and answer in radians unless the question is in degrees, and always loop back to check your answer against the domain or the context. The skill being assessed at this stage is not any one calculation — it is choosing the right method quickly and carrying it through cleanly under time pressure.",
    ],
    latexBlocks: [
      "\\text{identify the type}\\ \\Rightarrow\\ \\text{equation / graph features / modelling / exact value}",
      "\\text{equation: isolate, reference angle, ALL solutions in domain}",
      "\\text{graph \\& model: amplitude }|a|,\\ \\text{period }\\tfrac{2\\pi}{|b|},\\ \\text{midline }d,\\ \\text{max/min }d\\pm|a|",
      "\\sin^2x+\\cos^2x=1\\quad(\\text{from }x^2+y^2=1\\text{ on the unit circle})",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Equation with two solutions",
      questionLatex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "The unknown sits inside a trig function set equal to a number over a domain, so this is an equation to solve — start by isolating sine.", latex: "\\sin x=\\frac12" },
        { explanation: "Find one acute angle with this sine from exact values; that is the reference angle.", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12" },
        { explanation: "The value is positive, so sine is positive in quadrants I and II; the second solution is the mirror image $\\pi-\\frac{\\pi}{6}$. Both lie in the domain, so do not stop at one.", latex: "x=\\frac{\\pi}{6},\\ \\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}" },
      ],
      finalAnswerLatex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6}",
    },
    {
      title: "Worked example 2: Graph features",
      questionLatex: "y=3\\cos(2x)-1",
      steps: [
        { explanation: "No domain and no story — this asks about the shape, so read features off the constants. The front 3 is the amplitude; the inside 2 squashes the cycle, so divide $2\\pi$ by 2 for the period.", latex: "\\text{amplitude}=3,\\quad \\text{period}=\\frac{2\\pi}{2}=\\pi" },
        { explanation: "The $-1$ added on lowers the whole wave, so it oscillates about the line $y=-1$.", latex: "\\text{midline }y=-1" },
        { explanation: "Extremes are midline plus or minus amplitude: the wave runs from $-1+3$ at the top to $-1-3$ at the bottom.", latex: "\\max=-1+3=2,\\quad \\min=-1-3=-4" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }3,\\quad \\text{period }\\pi,\\quad \\text{midline }y=-1,\\quad \\max 2,\\quad \\min -4",
    },
    {
      title: "Worked example 3: Tide model",
      questionLatex: "h(t)=1.5\\sin\\left(\\frac{\\pi}{6}t\\right)+2.4",
      steps: [
        { explanation: "This is a worded model, so read features in context: the front coefficient is how far the tide rises and falls from its average.", latex: "|a|=1.5\\text{ m}" },
        { explanation: "The added constant is the midline — the average (still-water) tide height.", latex: "d=2.4\\text{ m}" },
        { explanation: "Divide $2\\pi$ by $b=\\frac{\\pi}{6}$ to get the cycle length: 12 hours between successive high tides.", latex: "\\frac{2\\pi}{\\pi/6}=12\\text{ h}" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }1.5\\text{ m},\\quad \\text{midline }2.4\\text{ m},\\quad \\text{period }12\\text{ h}",
    },
  ],

  guidedPractice: [
    {
      id: "mixed-trig-guided-1",
      prompt: "Choose the skill needed:",
      latex: "\\sin\\left(\\frac{\\pi}{3}\\right)",
      answer: "A",
      choices: [
        { label: "A", text: "exact values" },
        { label: "B", text: "modelling" },
        { label: "C", text: "identity proof" },
      ],
      hint: "This asks for a known value.",
      explanation: "This is an exact values question.",
    },
    {
      id: "mixed-trig-guided-2",
      prompt: "Evaluate exactly:",
      latex: "\\cos(\\pi)",
      answer: "-1",
      hint: "Use the unit circle.",
      explanation: "$\\cos(\\pi)=-1$.",
    },
    {
      id: "mixed-trig-guided-3",
      prompt: "Find the amplitude:",
      latex: "y=-4\\sin(2x)+1",
      answer: "4",
      hint: "Amplitude is $|a|$.",
      explanation: "The amplitude is $4$.",
    },
    {
      id: "mixed-trig-guided-4",
      prompt: "Choose the first step:",
      latex: "2\\sin x-1=0",
      answer: "B",
      choices: [
        { label: "A", text: "Find the period" },
        { label: "B", text: "Isolate $\\sin x$" },
        { label: "C", text: "Use $\\tan x=\\frac{\\sin x}{\\cos x}$" },
      ],
      hint: "This is an equation-solving question.",
      explanation: "First isolate $\\sin x$.",
    },
  ],

  independentPractice: [
    {
      id: "mixed-trig-ind-1",
      prompt: "Evaluate exactly:",
      latex: "\\sin\\left(\\frac{\\pi}{6}\\right)",
      answer: "1/2",
      acceptedAnswers: ["0.5"],
      hint: "Use exact values.",
      explanation: "$\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12$.",
    },
    {
      id: "mixed-trig-ind-2",
      prompt: "Find the period:",
      latex: "y=2\\cos(3x)",
      answer: "2pi/3",
      acceptedAnswers: ["2\\pi/3", "2π/3"],
      hint: "Use $\\frac{2\\pi}{|b|}$.",
      explanation: "The period is $\\frac{2\\pi}{3}$.",
    },
    {
      id: "mixed-trig-ind-3",
      prompt: "Choose the solutions.",
      latex: "\\tan x=1,\\quad 0\\le x\\le2\\pi",
      answer: "C",
      choices: [
        { label: "A", text: "$x=\\frac{\\pi}{4}$ only" },
        { label: "B", text: "$x=\\frac{3\\pi}{4},\\frac{7\\pi}{4}$" },
        { label: "C", text: "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$" },
      ],
      hint: "Tangent is positive in quadrants I and III.",
      explanation: "The solutions are $\\frac{\\pi}{4}$ and $\\frac{5\\pi}{4}$.",
    },
    {
      id: "mixed-trig-ind-4",
      prompt: "Simplify:",
      latex: "1-\\sin^2x",
      answer: "cos^2x",
      acceptedAnswers: ["cos^2(x)", "\\cos^2x"],
      hint: "Use the Pythagorean identity.",
      explanation: "$1-\\sin^2x=\\cos^2x$.",
    },
    {
      id: "mixed-trig-ind-5",
      prompt: "A model has amplitude $5$ and midline $12$. Find the maximum value.",
      latex: "\\text{amplitude}=5,\\quad \\text{midline}=12",
      answer: "17",
      hint: "Maximum is midline plus amplitude.",
      explanation: "The maximum is $12+5=17$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Giving degrees when radians are required.",
      fix: "Use radians unless the question asks for degrees.",
    },
    {
      mistake: "Giving only one solution in a trig equation.",
      fix: "Use the domain and quadrant signs to find all solutions.",
    },
    {
      mistake: "Confusing amplitude and period.",
      fix: "Amplitude is vertical size; period is horizontal cycle length.",
    },
    {
      mistake: "Forgetting context or units in modelling questions.",
      fix: "Finish with units such as metres, hours, or degrees where relevant.",
    },
  ],

  masteryQuiz: [
    {
      id: "mixed-trig-mastery-1",
      prompt: "Choose the method needed.",
      latex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3",
      answer: "C",
      choices: [
        { label: "A", text: "exact value only" },
        { label: "B", text: "identity simplification" },
        { label: "C", text: "modelling interpretation" },
      ],
      hint: "This is a contextual model.",
      explanation: "This question needs modelling interpretation.",
    },
    {
      id: "mixed-trig-mastery-2",
      prompt: "Evaluate exactly:",
      latex: "\\tan\\left(\\frac{\\pi}{4}\\right)",
      answer: "1",
      hint: "Use exact values.",
      explanation: "$\\tan\\left(\\frac{\\pi}{4}\\right)=1$.",
    },
    {
      id: "mixed-trig-mastery-3",
      prompt: "Choose where cosine is negative.",
      latex: "\\cos x<0",
      answer: "B",
      choices: [
        { label: "A", text: "Quadrants I and IV" },
        { label: "B", text: "Quadrants II and III" },
        { label: "C", text: "Quadrants I and III" },
      ],
      hint: "Cosine is the x-coordinate.",
      explanation: "Cosine is negative in quadrants II and III.",
    },
    {
      id: "mixed-trig-mastery-4",
      prompt: "Find the amplitude:",
      latex: "y=-3\\cos(2x)-1",
      answer: "3",
      hint: "Amplitude is $|a|$.",
      explanation: "The amplitude is $3$.",
    },
    {
      id: "mixed-trig-mastery-5",
      prompt: "Find the period:",
      latex: "y=-3\\cos(2x)-1",
      answer: "pi",
      acceptedAnswers: ["\\pi", "π"],
      hint: "Use $\\frac{2\\pi}{2}$.",
      explanation: "The period is $\\pi$.",
    },
    {
      id: "mixed-trig-mastery-6",
      prompt: "Choose the solutions.",
      latex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
      answer: "A",
      choices: [
        { label: "A", text: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$" },
        { label: "B", text: "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$" },
        { label: "C", text: "$x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$" },
      ],
      hint: "First solve $\\sin x=\\frac12$.",
      explanation: "The solutions are $\\frac{\\pi}{6}$ and $\\frac{5\\pi}{6}$.",
    },
    {
      id: "mixed-trig-mastery-7",
      prompt: "Simplify:",
      latex: "\\tan x\\cos x",
      answer: "A",
      choices: [
        { label: "A", text: "$\\sin x$" },
        { label: "B", text: "$\\cos x$" },
        { label: "C", text: "$\\tan x$" },
        { label: "D", text: "$1$" },
      ],
      hint: "Rewrite tangent first.",
      explanation: "$\\tan x\\cos x=\\sin x$.",
    },
    {
      id: "mixed-trig-mastery-8",
      prompt: "A tide model has midline $2.4$ m and amplitude $1.5$ m. Find the minimum height.",
      latex: "\\text{midline}=2.4,\\quad \\text{amplitude}=1.5",
      answer: "0.9",
      acceptedAnswers: ["0.9 m", "0.9 metres", "0.9 meters"],
      hint: "Minimum is midline minus amplitude.",
      explanation: "The minimum is $2.4-1.5=0.9$ m.",
    },
    {
      id: "mixed-trig-mastery-9",
      prompt: "Find the smaller solution:",
      latex: "\\cos x=\\frac12,\\quad 0\\le x\\le2\\pi",
      answer: "pi/3",
      acceptedAnswers: ["\\pi/3", "π/3"],
      hint: "Cosine is positive in quadrant I first.",
      explanation: "The smaller solution is $\\frac{\\pi}{3}$.",
    },
    {
      id: "mixed-trig-mastery-10",
      prompt: "Choose the correct interpretation of period.",
      latex: "h(t)=1.5\\sin\\left(\\frac{\\pi}{6}t\\right)+2.4",
      answer: "B",
      choices: [
        { label: "A", text: "maximum height" },
        { label: "B", text: "time for one full cycle" },
        { label: "C", text: "average height" },
      ],
      hint: "Period is horizontal cycle length.",
      explanation: "The period is the time for one full cycle.",
    },
  ],

  masteryPassMark: 0.8,
};

export const trigonometricFunctionsGraphsOutline: LessonOutlineItem[] = [
  {
    id: "radians-exact-values-unit-circle",
    slug: "radians-exact-values-unit-circle",
    title: "Radians, exact values, and the unit circle",
    description:
      "Convert between degrees and radians, use exact values, and interpret sine, cosine, and tangent on the unit circle.",
    status: "active",
  },
  {
    id: "graphs-sine-cosine-tangent",
    slug: "graphs-sine-cosine-tangent",
    title: "Graphs of sine, cosine, and tangent",
    description:
      "Identify the periods, ranges, intercepts, and asymptotes of the basic trigonometric graphs.",
    status: "active",
  },
  {
    id: "amplitude-period-phase-vertical-shift",
    slug: "amplitude-period-phase-vertical-shift",
    title: "Amplitude, Period, Phase Shift, and Vertical Shift",
    description:
      "Describe and sketch transformed trigonometric graphs using amplitude, period, phase shift, and vertical shift.",
    status: "active",
  },
  {
    id: "trigonometric-equations",
    slug: "trigonometric-equations",
    title: "Trigonometric Equations",
    description:
      "Solve trigonometric equations over specified domains using exact values, graphs, and symmetry.",
    status: "active",
  },
  {
    id: "trigonometric-identities-simplification",
    slug: "trigonometric-identities-simplification",
    title: "Trigonometric Identities and Simplification",
    description:
      "Use fundamental trigonometric identities to simplify expressions and support equation solving.",
    status: "active",
  },
  {
    id: "modelling-periodic-phenomena",
    slug: "modelling-periodic-phenomena",
    title: "Modelling Periodic Phenomena",
    description:
      "Use trigonometric functions to model periodic contexts such as tides, daylight, height, and motion.",
    status: "active",
  },
  {
    id: "mixed-trigonometric-functions-exam-practice",
    slug: "mixed-trigonometric-functions-exam-practice",
    title: "Mixed Trigonometric Functions Exam Practice",
    description:
      "Practise mixed exam-style questions involving radians, exact values, graphs, transformations, equations, identities, and modelling.",
    status: "active",
  },
];

export const trigonometricFunctionsGraphsLessons = [
  radiansExactValuesUnitCircleLesson,
  graphsSineCosineTangentLesson,
  amplitudePeriodPhaseVerticalShiftLesson,
  trigonometricEquationsLesson,
  trigonometricIdentitiesSimplificationLesson,
  modellingPeriodicPhenomenaLesson,
  logarithmicScalesLesson,
  mixedTrigonometricFunctionsExamPracticeLesson,
];

// ---------------------------------------------------------------------------
// Band-6 depth: post-hoc masteryQuizPool + multiPartPractice assignment.
// Objects are mutable; attaching here keeps the lesson definitions above clean
// (same pattern integralCalculus.ts uses for masteryQuiz).
// ---------------------------------------------------------------------------

// === graphs-sine-cosine-tangent ===========================================
graphsSineCosineTangentLesson.masteryQuizPool = [
  { id: "gsct-p-1", prompt: "The period of $y=\\sin x$ is:", latex: "y=\\sin x", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$4\\pi$" }], hint: "One full sine wave.", explanation: "Sine repeats every $2\\pi$." },
  { id: "gsct-p-2", prompt: "The period of $y=\\cos x$ is:", latex: "y=\\cos x", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$\\frac{\\pi}{2}$" }, { label: "C", text: "$2\\pi$" }, { label: "D", text: "$3\\pi$" }], hint: "One full cosine wave.", explanation: "Cosine repeats every $2\\pi$." },
  { id: "gsct-p-3", prompt: "The period of $y=\\tan x$ is:", latex: "y=\\tan x", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$4\\pi$" }], hint: "Tangent repeats faster than sine.", explanation: "Tangent repeats every $\\pi$." },
  { id: "gsct-p-4", prompt: "The range of $y=\\sin x$ is:", latex: "y=\\sin x", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$0\\le y\\le1$" }, { label: "B", text: "$-1\\le y\\le1$" }, { label: "C", text: "all reals" }, { label: "D", text: "$-2\\le y\\le2$" }], hint: "Highest and lowest sine values.", explanation: "Sine stays between $-1$ and $1$." },
  { id: "gsct-p-5", prompt: "The range of $y=\\cos x$ is:", latex: "y=\\cos x", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$0\\le y\\le1$" }, { label: "B", text: "all reals" }, { label: "C", text: "$-1\\le y\\le1$" }, { label: "D", text: "$-\\pi\\le y\\le\\pi$" }], hint: "Highest and lowest cosine values.", explanation: "Cosine stays between $-1$ and $1$." },
  { id: "gsct-p-6", prompt: "The range of $y=\\tan x$ is:", latex: "y=\\tan x", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$-1\\le y\\le1$" }, { label: "B", text: "$0\\le y\\le1$" }, { label: "C", text: "$-\\pi\\le y\\le\\pi$" }, { label: "D", text: "all real numbers" }], hint: "Tangent has no maximum or minimum.", explanation: "Tangent takes every real value." },
  { id: "gsct-p-7", prompt: "Value of $\\sin x$ at $x=0$:", latex: "\\sin(0)", answer: "0", difficulty: 1, hint: "Sine starts at zero.", explanation: "$\\sin 0=0$.", acceptedAnswers: ["0.0"] },
  { id: "gsct-p-8", prompt: "Value of $\\cos x$ at $x=0$:", latex: "\\cos(0)", answer: "1", difficulty: 1, hint: "Cosine starts at its maximum.", explanation: "$\\cos 0=1$.", acceptedAnswers: ["1.0"] },
  { id: "gsct-p-9", prompt: "$\\sin x$ reaches its maximum of $1$ first (for $x>0$) at $x=$", latex: "\\sin x=1", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\pi}{2}$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{3\\pi}{2}$" }, { label: "D", text: "$2\\pi$" }], hint: "Quarter of the way through.", explanation: "$\\sin\\frac{\\pi}{2}=1$." },
  { id: "gsct-p-10", prompt: "$\\cos x$ reaches its minimum of $-1$ first (for $x>0$) at $x=$", latex: "\\cos x=-1", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\pi}{2}$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{3\\pi}{2}$" }, { label: "D", text: "$2\\pi$" }], hint: "Halfway through one cycle.", explanation: "$\\cos\\pi=-1$." },
  { id: "gsct-p-11", prompt: "Number of $x$-intercepts of $y=\\sin x$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=0", answer: "3", difficulty: 3, hint: "At $0$, $\\pi$ and $2\\pi$.", explanation: "$\\sin x=0$ at $x=0,\\pi,2\\pi$: three intercepts.", acceptedAnswers: ["three"] },
  { id: "gsct-p-12", prompt: "Number of $x$-intercepts of $y=\\cos x$ on $0\\le x\\le2\\pi$:", latex: "\\cos x=0", answer: "2", difficulty: 3, hint: "At $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$.", explanation: "$\\cos x=0$ at $x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$: two intercepts.", acceptedAnswers: ["two"] },
  { id: "gsct-p-13", prompt: "The tangent graph has vertical asymptotes where:", latex: "y=\\tan x", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\sin x=0$" }, { label: "B", text: "$\\tan x=1$" }, { label: "C", text: "$\\cos x=0$" }, { label: "D", text: "$x=0$" }], hint: "Tangent is $\\frac{\\sin x}{\\cos x}$.", explanation: "Tangent is undefined where $\\cos x=0$." },
  { id: "gsct-p-14", prompt: "First positive asymptote of $y=\\tan x$ is at $x=$", latex: "\\cos x=0", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{2}$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{\\pi}{4}$" }, { label: "D", text: "$2\\pi$" }], hint: "Where $\\cos x$ first equals zero.", explanation: "$\\cos\\frac{\\pi}{2}=0$, so the asymptote is at $\\frac{\\pi}{2}$." },
  { id: "gsct-p-15", prompt: "$\\sin x$ first reaches its minimum of $-1$ (for $x>0$) at $x=$", latex: "\\sin x=-1", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\pi}{2}$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{3\\pi}{2}$" }, { label: "D", text: "$2\\pi$" }], hint: "Three quarters through the cycle.", explanation: "$\\sin\\frac{3\\pi}{2}=-1$." },
  { id: "gsct-p-16", prompt: "Value of $\\cos x$ at $x=\\frac{\\pi}{2}$:", latex: "\\cos\\left(\\frac{\\pi}{2}\\right)", answer: "0", difficulty: 2, hint: "Cosine crosses the axis here.", explanation: "$\\cos\\frac{\\pi}{2}=0$.", acceptedAnswers: ["0.0"] },
  { id: "gsct-p-17", prompt: "Value of $\\sin x$ at $x=\\pi$:", latex: "\\sin(\\pi)", answer: "0", difficulty: 2, hint: "Sine returns to zero halfway.", explanation: "$\\sin\\pi=0$.", acceptedAnswers: ["0.0"] },
  { id: "gsct-p-18", prompt: "Maximum value of $y=\\cos x$:", latex: "y=\\cos x", answer: "1", difficulty: 2, hint: "Top of the cosine range.", explanation: "Maximum is $1$.", acceptedAnswers: ["1.0"] },
  { id: "gsct-p-19", prompt: "Minimum value of $y=\\sin x$:", latex: "y=\\sin x", answer: "-1", difficulty: 2, hint: "Bottom of the sine range.", explanation: "Minimum is $-1$.", acceptedAnswers: ["−1"] },
  { id: "gsct-p-20", prompt: "Over $0\\le x\\le2\\pi$, the number of vertical asymptotes of $y=\\tan x$ is:", latex: "y=\\tan x", answer: "2", difficulty: 3, hint: "Where $\\cos x=0$: $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$.", explanation: "Asymptotes at $x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$: two of them.", acceptedAnswers: ["two"] },
  { id: "gsct-p-21", prompt: "Which graph starts at its maximum when $x=0$?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$y=\\sin x$" }, { label: "B", text: "$y=\\cos x$" }, { label: "C", text: "$y=\\tan x$" }, { label: "D", text: "none of these" }], hint: "Which equals $1$ at $x=0$?", explanation: "$\\cos 0=1$, its maximum." },
  { id: "gsct-p-22", prompt: "Over $0\\le x\\le4\\pi$, how many complete cycles does $y=\\sin x$ make?", latex: "\\text{period }2\\pi", answer: "2", difficulty: 3, hint: "$4\\pi\\div2\\pi$.", explanation: "$\\frac{4\\pi}{2\\pi}=2$ cycles.", acceptedAnswers: ["two"] },
  { id: "gsct-p-23", prompt: "Over $0\\le x\\le2\\pi$, how many complete cycles does $y=\\tan x$ make?", latex: "\\text{period }\\pi", answer: "2", difficulty: 3, hint: "$2\\pi\\div\\pi$.", explanation: "Tangent has period $\\pi$, so $\\frac{2\\pi}{\\pi}=2$ cycles.", acceptedAnswers: ["two"] },
  { id: "gsct-p-24", prompt: "Which statement is TRUE about $y=\\tan x$?", latex: "y=\\tan x", answer: "D", difficulty: 3, choices: [{ label: "A", text: "It has amplitude $1$" }, { label: "B", text: "Its range is $-1\\le y\\le1$" }, { label: "C", text: "Its period is $2\\pi$" }, { label: "D", text: "It is undefined where $\\cos x=0$" }], hint: "Tangent has no max or min.", explanation: "Tangent has no amplitude, range all reals, period $\\pi$, and is undefined where $\\cos x=0$." },
  { id: "gsct-p-25", prompt: "The graph $y=\\cos x$ is identical to $y=\\sin x$ shifted left by:", latex: "\\cos x=\\sin\\left(x+c\\right)", answer: "A", difficulty: 4, choices: [{ label: "A", text: "$\\frac{\\pi}{2}$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{\\pi}{4}$" }, { label: "D", text: "$2\\pi$" }], hint: "$\\cos x=\\sin\\left(x+\\frac{\\pi}{2}\\right)$.", explanation: "Cosine is sine shifted left $\\frac{\\pi}{2}$." },
  { id: "gsct-p-26", prompt: "On $0\\le x\\le2\\pi$, count the values of $x$ where $\\sin x$ and $\\cos x$ are BOTH zero.", latex: "\\sin x=0\\text{ and }\\cos x=0", answer: "0", difficulty: 4, hint: "They are never zero at the same $x$.", explanation: "Sine zeros are $0,\\pi,2\\pi$; cosine zeros are $\\frac{\\pi}{2},\\frac{3\\pi}{2}$. No overlap, so $0$.", acceptedAnswers: ["zero", "none"] },
  { id: "gsct-p-27", prompt: "On $-2\\pi\\le x\\le2\\pi$, the number of $x$-intercepts of $y=\\sin x$ is:", latex: "\\sin x=0", answer: "5", difficulty: 4, hint: "Zeros at $-2\\pi,-\\pi,0,\\pi,2\\pi$.", explanation: "$\\sin x=0$ at $x=-2\\pi,-\\pi,0,\\pi,2\\pi$: five intercepts.", acceptedAnswers: ["five"] },
  { id: "gsct-p-28", prompt: "On $0\\le x\\le2\\pi$, the number of $x$-intercepts of $y=\\tan x$ (excluding asymptotes) is:", latex: "\\tan x=0", answer: "3", difficulty: 5, hint: "$\\tan x=0$ where $\\sin x=0$: at $0,\\pi,2\\pi$.", explanation: "Tangent is zero where $\\sin x=0$, i.e. $x=0,\\pi,2\\pi$: three intercepts within the interval.", acceptedAnswers: ["three"] },
  { id: "gsct-p-29", prompt: "On $0\\le x\\le2\\pi$, count the values of $x$ where the graphs $y=\\sin x$ and $y=\\cos x$ intersect.", latex: "\\sin x=\\cos x", answer: "2", difficulty: 5, hint: "$\\tan x=1$ at $\\frac{\\pi}{4}$ and $\\frac{5\\pi}{4}$.", explanation: "$\\sin x=\\cos x\\Rightarrow\\tan x=1$, giving $x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$: two intersections.", acceptedAnswers: ["two"] },
  { id: "gsct-p-30", prompt: "The lowest point on $y=\\sin x$ and the lowest point on $y=\\cos x$, over $0\\le x\\le2\\pi$, are how many radians apart in $x$?", latex: "\\text{min of }\\sin\\text{ vs min of }\\cos", answer: "A", difficulty: 5, choices: [{ label: "A", text: "$\\frac{\\pi}{2}$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{3\\pi}{2}$" }, { label: "D", text: "$2\\pi$" }], hint: "Sine min at $\\frac{3\\pi}{2}$, cosine min at $\\pi$.", explanation: "$\\sin x$ is least at $x=\\frac{3\\pi}{2}$ and $\\cos x$ at $x=\\pi$; the gap is $\\frac{3\\pi}{2}-\\pi=\\frac{\\pi}{2}$." },
];
// === amplitude-period-phase-vertical-shift ================================
amplitudePeriodPhaseVerticalShiftLesson.masteryQuizPool = [
  { id: "apps-p-1", prompt: "Amplitude of $y=3\\sin x$:", latex: "y=3\\sin x", answer: "3", difficulty: 1, hint: "Amplitude is $|a|$.", explanation: "$|3|=3$.", acceptedAnswers: ["3.0"] },
  { id: "apps-p-2", prompt: "Amplitude of $y=5\\cos(2x)$:", latex: "y=5\\cos(2x)", answer: "5", difficulty: 1, hint: "Amplitude is $|a|$.", explanation: "$|5|=5$.", acceptedAnswers: ["5.0"] },
  { id: "apps-p-3", prompt: "Amplitude of $y=-4\\sin x$:", latex: "y=-4\\sin x", answer: "4", difficulty: 2, hint: "Amplitude cannot be negative.", explanation: "$|-4|=4$.", acceptedAnswers: ["4.0"] },
  { id: "apps-p-4", prompt: "Period of $y=\\sin(2x)$:", latex: "\\frac{2\\pi}{|b|}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$2\\pi$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$4\\pi$" }], hint: "$\\frac{2\\pi}{2}$.", explanation: "$\\frac{2\\pi}{2}=\\pi$." },
  { id: "apps-p-5", prompt: "Period of $y=\\cos(4x)$:", latex: "\\frac{2\\pi}{|b|}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$2\\pi$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$\\frac{\\pi}{4}$" }], hint: "$\\frac{2\\pi}{4}$.", explanation: "$\\frac{2\\pi}{4}=\\frac{\\pi}{2}$." },
  { id: "apps-p-6", prompt: "Period of $y=\\sin(3x)$:", latex: "\\frac{2\\pi}{|b|}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{2\\pi}{3}$" }, { label: "B", text: "$\\frac{3\\pi}{2}$" }, { label: "C", text: "$3\\pi$" }, { label: "D", text: "$\\frac{\\pi}{3}$" }], hint: "$\\frac{2\\pi}{3}$.", explanation: "$\\frac{2\\pi}{3}$." },
  { id: "apps-p-7", prompt: "Midline of $y=\\sin x+4$:", latex: "y=\\sin x+4", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$y=0$" }, { label: "B", text: "$y=4$" }, { label: "C", text: "$y=1$" }, { label: "D", text: "$y=-4$" }], hint: "Midline is $y=d$.", explanation: "$d=4$, so midline $y=4$." },
  { id: "apps-p-8", prompt: "Vertical shift of $y=2\\cos x-3$:", latex: "y=2\\cos x-3", answer: "-3", difficulty: 2, hint: "The constant added at the end.", explanation: "$d=-3$.", acceptedAnswers: ["−3"] },
  { id: "apps-p-9", prompt: "Period of $y=\\tan(2x)$:", latex: "\\frac{\\pi}{|b|}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$\\frac{\\pi}{4}$" }], hint: "Tangent period is $\\frac{\\pi}{|b|}$.", explanation: "$\\frac{\\pi}{2}$." },
  { id: "apps-p-10", prompt: "Amplitude of $y=\\tan(3x)$:", latex: "y=\\tan(3x)", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$3$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\frac{\\pi}{3}$" }, { label: "D", text: "none — tangent has no amplitude" }], hint: "Tangent has no max or min.", explanation: "Tangent has no amplitude." },
  { id: "apps-p-11", prompt: "In $y=2\\sin(x-\\frac{\\pi}{4})$, the phase shift is:", latex: "y=2\\sin\\left(x-\\frac{\\pi}{4}\\right)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{4}$ right" }, { label: "B", text: "$\\frac{\\pi}{4}$ left" }, { label: "C", text: "$2$ right" }, { label: "D", text: "no shift" }], hint: "$x-c$ moves right by $c$.", explanation: "$x-\\frac{\\pi}{4}$ shifts the graph right $\\frac{\\pi}{4}$." },
  { id: "apps-p-12", prompt: "In $y=\\cos(x+\\frac{\\pi}{3})$, the phase shift is:", latex: "y=\\cos\\left(x+\\frac{\\pi}{3}\\right)", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{3}$ right" }, { label: "B", text: "$\\frac{\\pi}{3}$ left" }, { label: "C", text: "no shift" }, { label: "D", text: "$3$ left" }], hint: "$x+c$ moves left by $c$.", explanation: "$x+\\frac{\\pi}{3}$ shifts the graph left $\\frac{\\pi}{3}$." },
  { id: "apps-p-13", prompt: "Maximum value of $y=3\\sin x+2$:", latex: "d+|a|", answer: "5", difficulty: 3, hint: "Midline plus amplitude.", explanation: "$2+3=5$.", acceptedAnswers: ["5.0"] },
  { id: "apps-p-14", prompt: "Minimum value of $y=3\\sin x+2$:", latex: "d-|a|", answer: "-1", difficulty: 3, hint: "Midline minus amplitude.", explanation: "$2-3=-1$.", acceptedAnswers: ["−1"] },
  { id: "apps-p-15", prompt: "Amplitude of $y=\\frac{1}{2}\\cos x$:", latex: "y=\\tfrac12\\cos x", answer: "0.5", difficulty: 2, hint: "$|a|$.", explanation: "$\\left|\\frac12\\right|=0.5$.", acceptedAnswers: ["1/2", ".5"] },
  { id: "apps-p-16", prompt: "Period of $y=2\\sin\\left(\\frac{1}{2}x\\right)$:", latex: "\\frac{2\\pi}{|b|}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$4\\pi$" }], hint: "$\\frac{2\\pi}{1/2}$.", explanation: "$\\frac{2\\pi}{1/2}=4\\pi$." },
  { id: "apps-p-17", prompt: "A sine curve has amplitude $6$. What is the distance from its maximum to its minimum value?", latex: "\\text{max}-\\text{min}", answer: "12", difficulty: 3, hint: "That distance is twice the amplitude.", explanation: "Max $-$ min $=2|a|=12$." },
  { id: "apps-p-18", prompt: "In $y=a\\sin(b(x-c))+d$, the constant that does NOT affect period is:", latex: "y=a\\sin(b(x-c))+d", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$b$" }, { label: "B", text: "only $b$ affects period" }, { label: "C", text: "$a$, $c$ and $d$" }, { label: "D", text: "$d$" }], hint: "Period depends only on $b$.", explanation: "Only $b$ sets the period; $a$, $c$, $d$ do not." },
  { id: "apps-p-19", prompt: "A cosine graph has amplitude $4$ and midline $y=1$. Its maximum value is:", latex: "d+|a|", answer: "5", difficulty: 3, hint: "$1+4$.", explanation: "Max $=1+4=5$.", acceptedAnswers: ["5.0"] },
  { id: "apps-p-20", prompt: "A sine graph has amplitude $4$ and midline $y=1$. Its minimum value is:", latex: "d-|a|", answer: "-3", difficulty: 3, hint: "$1-4$.", explanation: "Min $=1-4=-3$.", acceptedAnswers: ["−3"] },
  { id: "apps-p-21", prompt: "A sine curve has period $\\pi$. What is its $b$ value (taking $b>0$)?", latex: "\\frac{2\\pi}{b}=\\pi", answer: "2", difficulty: 3, hint: "Solve $\\frac{2\\pi}{b}=\\pi$.", explanation: "$b=\\frac{2\\pi}{\\pi}=2$.", acceptedAnswers: ["2.0"] },
  { id: "apps-p-22", prompt: "A cosine curve has period $4\\pi$. What is its $b$ value (taking $b>0$)?", latex: "\\frac{2\\pi}{b}=4\\pi", answer: "0.5", difficulty: 4, hint: "Solve $\\frac{2\\pi}{b}=4\\pi$.", explanation: "$b=\\frac{2\\pi}{4\\pi}=\\frac12=0.5$.", acceptedAnswers: ["1/2", ".5"] },
  { id: "apps-p-23", prompt: "Maximum value of $y=-2\\cos x+5$:", latex: "d+|a|", answer: "7", difficulty: 4, hint: "Amplitude is $|-2|=2$; max is $d+|a|$.", explanation: "$|a|=2$, so max $=5+2=7$." },
  { id: "apps-p-24", prompt: "Minimum value of $y=-2\\cos x+5$:", latex: "d-|a|", answer: "3", difficulty: 4, hint: "Amplitude is $2$; min is $d-|a|$.", explanation: "Min $=5-2=3$.", acceptedAnswers: ["3.0"] },
  { id: "apps-p-25", prompt: "A sinusoid oscillates between a maximum of $10$ and a minimum of $2$. Its amplitude is:", latex: "\\frac{\\text{max}-\\text{min}}{2}", answer: "4", difficulty: 4, hint: "Amplitude $=\\frac{\\text{max}-\\text{min}}{2}$.", explanation: "$\\frac{10-2}{2}=4$.", acceptedAnswers: ["4.0"] },
  { id: "apps-p-26", prompt: "A sinusoid oscillates between a maximum of $10$ and a minimum of $2$. Its midline is $y=$", latex: "\\frac{\\text{max}+\\text{min}}{2}", answer: "6", difficulty: 4, hint: "Midline $=\\frac{\\text{max}+\\text{min}}{2}$.", explanation: "$\\frac{10+2}{2}=6$.", acceptedAnswers: ["6.0"] },
  { id: "apps-p-27", prompt: "A sine model oscillates between $20$ and $8$ with period $6$. Building $y=a\\sin(bx)+d$, the value of $a$ (amplitude) is:", latex: "a=\\frac{\\text{max}-\\text{min}}{2}", answer: "6", difficulty: 5, hint: "Amplitude is half the peak-to-trough distance.", explanation: "$a=\\frac{20-8}{2}=6$.", acceptedAnswers: ["6.0"] },
  { id: "apps-p-28", prompt: "A sinusoid has maximum $14$, minimum $4$, and period $8$. Reading off $y=a\\sin(b(x-c))+d$, the value of $d$ is:", latex: "d=\\frac{\\text{max}+\\text{min}}{2}", answer: "9", difficulty: 5, hint: "$d$ is the midline.", explanation: "$d=\\frac{14+4}{2}=9$.", acceptedAnswers: ["9.0"] },
  { id: "apps-p-29", prompt: "Over $0\\le x\\le2\\pi$, how many complete cycles does $y=\\sin(3x)$ make?", latex: "\\text{cycles}=\\frac{\\text{domain}}{\\text{period}}", answer: "3", difficulty: 5, hint: "Period is $\\frac{2\\pi}{3}$; divide $2\\pi$ by it.", explanation: "$\\frac{2\\pi}{2\\pi/3}=3$ cycles.", acceptedAnswers: ["three"] },
  { id: "apps-p-30", prompt: "A curve $y=a\\sin(b(x-c))+d$ has maximum $7$ at $x=\\frac{\\pi}{6}$, minimum $1$, and period $\\pi$. The value of $b$ (taking $b>0$) is:", latex: "\\frac{2\\pi}{b}=\\pi", answer: "2", difficulty: 5, hint: "Use the period equation; the max position is extra information.", explanation: "$\\frac{2\\pi}{b}=\\pi\\Rightarrow b=2$. (The amplitude is $3$ and $d=4$, but the question asks only for $b$.)", acceptedAnswers: ["2.0"] },
];
amplitudePeriodPhaseVerticalShiftLesson.multiPartPractice = [
  {
    id: "apps-mp-1",
    prompt:
      "A function is given by $y=4\\sin\\left(2\\left(x-\\frac{\\pi}{6}\\right)\\right)+3$.",
    latex: "y=4\\sin\\left(2\\left(x-\\frac{\\pi}{6}\\right)\\right)+3",
    answer: "4",
    hint: "Read $a$, $b$ and $d$ from the equation, then combine the midline with the amplitude for the maximum.",
    explanation:
      "(a) Amplitude $=|a|=4$. (b) Period $=\\frac{2\\pi}{|b|}=\\frac{2\\pi}{2}=\\pi$. (c) Maximum $=d+|a|=3+4=7$.",
    parts: [
      { key: "a", label: "(a)", prompt: "State the amplitude.", latex: "|a|", marks: 1, answer: "4", acceptedAnswers: ["4.0"], hint: "Amplitude is $|a|$.", explanation: "$|4|=4$." },
      { key: "b", label: "(b)", prompt: "The period equals $\\frac{2\\pi}{k}$. Find the integer $k$.", latex: "\\text{period}=\\frac{2\\pi}{k}", marks: 2, answer: "2", acceptedAnswers: ["2.0"], hint: "Period $=\\frac{2\\pi}{|b|}$ and $b=2$.", explanation: "Period $=\\frac{2\\pi}{2}=\\pi$, so $k=2$." },
      { key: "c", label: "(c)", prompt: "Find the maximum value of $y$.", latex: "d+|a|", marks: 2, answer: "7", acceptedAnswers: ["7.0"], hint: "Midline plus amplitude.", explanation: "$3+4=7$." },
    ],
  },
];

// === trigonometric-equations ==============================================
trigonometricEquationsLesson.masteryQuizPool = [
  { id: "trige-p-1", prompt: "First isolate the function: $2\\sin x-1=0$ gives $\\sin x=$", latex: "2\\sin x-1=0", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$1$" }, { label: "B", text: "$\\frac12$" }, { label: "C", text: "$2$" }, { label: "D", text: "$-\\frac12$" }], hint: "Add $1$, divide by $2$.", explanation: "$\\sin x=\\frac12$." },
  { id: "trige-p-2", prompt: "The reference angle for $\\sin x=\\frac12$ is:", latex: "\\sin x=\\frac12", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{\\pi}{6}$" }, { label: "B", text: "$\\frac{\\pi}{4}$" }, { label: "C", text: "$\\frac{\\pi}{3}$" }, { label: "D", text: "$\\frac{\\pi}{2}$" }], hint: "$\\sin\\frac{\\pi}{6}=\\frac12$.", explanation: "Reference angle is $\\frac{\\pi}{6}$." },
  { id: "trige-p-3", prompt: "Number of solutions of $\\sin x=\\frac12$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=\\frac12", answer: "2", difficulty: 2, hint: "Sine is positive in two quadrants.", explanation: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-4", prompt: "Number of solutions of $\\cos x=-\\frac12$ on $0\\le x\\le2\\pi$:", latex: "\\cos x=-\\frac12", answer: "2", difficulty: 2, hint: "Cosine is negative in two quadrants.", explanation: "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-5", prompt: "Number of solutions of $\\tan x=1$ on $0\\le x\\le2\\pi$:", latex: "\\tan x=1", answer: "2", difficulty: 2, hint: "Tangent is positive in quadrants I and III.", explanation: "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-6", prompt: "Number of solutions of $\\sin x=0$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=0", answer: "3", difficulty: 3, hint: "At $0$, $\\pi$ and $2\\pi$.", explanation: "$x=0,\\pi,2\\pi$: three solutions.", acceptedAnswers: ["three"] },
  { id: "trige-p-7", prompt: "Number of solutions of $\\cos x=0$ on $0\\le x\\le2\\pi$:", latex: "\\cos x=0", answer: "2", difficulty: 3, hint: "At $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$.", explanation: "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-8", prompt: "The smallest positive solution of $\\sin x=\\frac12$ is:", latex: "\\sin x=\\frac12", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\pi}{6}$" }, { label: "B", text: "$\\frac{5\\pi}{6}$" }, { label: "C", text: "$\\frac{\\pi}{3}$" }, { label: "D", text: "$\\frac{\\pi}{2}$" }], hint: "Quadrant I solution.", explanation: "$x=\\frac{\\pi}{6}$ is the smallest." },
  { id: "trige-p-9", prompt: "The two solutions of $\\sin x=\\frac12$ on $0\\le x\\le2\\pi$ are:", latex: "\\sin x=\\frac12", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{6},\\frac{7\\pi}{6}$" }, { label: "B", text: "$\\frac{\\pi}{3},\\frac{2\\pi}{3}$" }, { label: "C", text: "$\\frac{\\pi}{6},\\frac{5\\pi}{6}$" }, { label: "D", text: "$\\frac{\\pi}{6},\\frac{11\\pi}{6}$" }], hint: "Quadrants I and II.", explanation: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$." },
  { id: "trige-p-10", prompt: "The two solutions of $\\cos x=-\\frac12$ on $0\\le x\\le2\\pi$ are:", latex: "\\cos x=-\\frac12", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{3},\\frac{2\\pi}{3}$" }, { label: "B", text: "$\\frac{2\\pi}{3},\\frac{4\\pi}{3}$" }, { label: "C", text: "$\\frac{\\pi}{6},\\frac{5\\pi}{6}$" }, { label: "D", text: "$\\frac{\\pi}{3},\\frac{5\\pi}{3}$" }], hint: "Cosine negative in quadrants II and III.", explanation: "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$." },
  { id: "trige-p-11", prompt: "The reference angle for $\\cos x=\\frac{\\sqrt3}{2}$ is:", latex: "\\cos x=\\frac{\\sqrt3}{2}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\pi}{6}$" }, { label: "B", text: "$\\frac{\\pi}{4}$" }, { label: "C", text: "$\\frac{\\pi}{3}$" }, { label: "D", text: "$\\frac{\\pi}{2}$" }], hint: "$\\cos\\frac{\\pi}{6}=\\frac{\\sqrt3}{2}$.", explanation: "Reference angle is $\\frac{\\pi}{6}$." },
  { id: "trige-p-12", prompt: "Number of solutions of $\\cos x=\\frac{\\sqrt3}{2}$ on $0\\le x\\le2\\pi$:", latex: "\\cos x=\\frac{\\sqrt3}{2}", answer: "2", difficulty: 3, hint: "Cosine positive in quadrants I and IV.", explanation: "$x=\\frac{\\pi}{6},\\frac{11\\pi}{6}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-13", prompt: "Number of solutions of $\\sin x=-1$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=-1", answer: "1", difficulty: 3, hint: "Only at the minimum.", explanation: "$x=\\frac{3\\pi}{2}$ only: one solution.", acceptedAnswers: ["one"] },
  { id: "trige-p-14", prompt: "Number of solutions of $\\cos x=1$ on $0\\le x\\le2\\pi$:", latex: "\\cos x=1", answer: "2", difficulty: 3, hint: "At the endpoints $0$ and $2\\pi$.", explanation: "$x=0,2\\pi$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-15", prompt: "In which quadrants is $\\sin x>0$?", latex: "\\sin x>0", answer: "C", difficulty: 2, choices: [{ label: "A", text: "I and IV" }, { label: "B", text: "II and III" }, { label: "C", text: "I and II" }, { label: "D", text: "III and IV" }], hint: "Sine is the $y$-coordinate.", explanation: "Sine is positive in quadrants I and II." },
  { id: "trige-p-16", prompt: "In which quadrants is $\\cos x<0$?", latex: "\\cos x<0", answer: "B", difficulty: 2, choices: [{ label: "A", text: "I and II" }, { label: "B", text: "II and III" }, { label: "C", text: "I and IV" }, { label: "D", text: "III and IV" }], hint: "Cosine is the $x$-coordinate.", explanation: "Cosine is negative in quadrants II and III." },
  { id: "trige-p-17", prompt: "Number of solutions of $\\tan x=\\sqrt3$ on $0\\le x\\le2\\pi$:", latex: "\\tan x=\\sqrt3", answer: "2", difficulty: 3, hint: "Tangent positive in quadrants I and III.", explanation: "$x=\\frac{\\pi}{3},\\frac{4\\pi}{3}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-18", prompt: "The smallest positive solution of $\\tan x=\\sqrt3$ is:", latex: "\\tan x=\\sqrt3", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{6}$" }, { label: "B", text: "$\\frac{\\pi}{4}$" }, { label: "C", text: "$\\frac{\\pi}{3}$" }, { label: "D", text: "$\\frac{2\\pi}{3}$" }], hint: "$\\tan\\frac{\\pi}{3}=\\sqrt3$.", explanation: "$x=\\frac{\\pi}{3}$." },
  { id: "trige-p-19", prompt: "Solve $2\\cos x=\\sqrt3$ first: $\\cos x=$", latex: "2\\cos x=\\sqrt3", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\sqrt3$" }, { label: "B", text: "$\\frac12$" }, { label: "C", text: "$2\\sqrt3$" }, { label: "D", text: "$\\frac{\\sqrt3}{2}$" }], hint: "Divide both sides by $2$.", explanation: "$\\cos x=\\frac{\\sqrt3}{2}$." },
  { id: "trige-p-20", prompt: "Number of solutions of $2\\cos x=\\sqrt3$ on $0\\le x\\le2\\pi$:", latex: "2\\cos x=\\sqrt3", answer: "2", difficulty: 4, hint: "$\\cos x=\\frac{\\sqrt3}{2}$, positive in two quadrants.", explanation: "$x=\\frac{\\pi}{6},\\frac{11\\pi}{6}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-21", prompt: "Number of solutions of $\\sin x=\\frac{\\sqrt3}{2}$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=\\frac{\\sqrt3}{2}", answer: "2", difficulty: 3, hint: "Sine positive in quadrants I and II.", explanation: "$x=\\frac{\\pi}{3},\\frac{2\\pi}{3}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-22", prompt: "On $0\\le x\\le\\pi$, the number of solutions of $\\sin x=\\frac12$ is:", latex: "\\sin x=\\frac12,\\;0\\le x\\le\\pi", answer: "2", difficulty: 4, hint: "Both $\\frac{\\pi}{6}$ and $\\frac{5\\pi}{6}$ lie in $[0,\\pi]$.", explanation: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$ are both in $[0,\\pi]$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-23", prompt: "On $0\\le x\\le\\pi$, the number of solutions of $\\cos x=\\frac12$ is:", latex: "\\cos x=\\frac12,\\;0\\le x\\le\\pi", answer: "1", difficulty: 4, hint: "The quadrant-IV solution $\\frac{5\\pi}{3}$ is outside $[0,\\pi]$.", explanation: "Only $x=\\frac{\\pi}{3}$ lies in $[0,\\pi]$: one solution.", acceptedAnswers: ["one"] },
  { id: "trige-p-24", prompt: "Number of solutions of $\\tan x=0$ on $0\\le x\\le2\\pi$:", latex: "\\tan x=0", answer: "3", difficulty: 4, hint: "Tangent is zero where $\\sin x=0$.", explanation: "$x=0,\\pi,2\\pi$: three solutions.", acceptedAnswers: ["three"] },
  { id: "trige-p-25", prompt: "Number of solutions of $\\sin(2x)=0$ on $0\\le x\\le2\\pi$:", latex: "\\sin(2x)=0", answer: "5", difficulty: 5, hint: "Let $u=2x$, so $u$ ranges over $[0,4\\pi]$; $\\sin u=0$ at $0,\\pi,2\\pi,3\\pi,4\\pi$.", explanation: "$2x=0,\\pi,2\\pi,3\\pi,4\\pi$ gives $x=0,\\frac{\\pi}{2},\\pi,\\frac{3\\pi}{2},2\\pi$: five solutions.", acceptedAnswers: ["five"] },
  { id: "trige-p-26", prompt: "Number of solutions of $\\cos(2x)=1$ on $0\\le x\\le2\\pi$:", latex: "\\cos(2x)=1", answer: "3", difficulty: 5, hint: "Let $u=2x\\in[0,4\\pi]$; $\\cos u=1$ at $0,2\\pi,4\\pi$.", explanation: "$2x=0,2\\pi,4\\pi$ gives $x=0,\\pi,2\\pi$: three solutions.", acceptedAnswers: ["three"] },
  { id: "trige-p-27", prompt: "Number of solutions of $2\\sin x+1=0$ on $0\\le x\\le2\\pi$:", latex: "2\\sin x+1=0", answer: "2", difficulty: 4, hint: "$\\sin x=-\\frac12$, negative in quadrants III and IV.", explanation: "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-28", prompt: "Number of solutions of $\\sin x=\\cos x$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=\\cos x", answer: "2", difficulty: 5, hint: "Divide by $\\cos x$ to get $\\tan x=1$.", explanation: "$\\tan x=1$ gives $x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-29", prompt: "Number of solutions of $\\sin^2 x=1$ on $0\\le x\\le2\\pi$:", latex: "\\sin^2 x=1", answer: "2", difficulty: 5, hint: "$\\sin x=\\pm1$; each gives one solution in the interval.", explanation: "$\\sin x=1$ at $\\frac{\\pi}{2}$ and $\\sin x=-1$ at $\\frac{3\\pi}{2}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "trige-p-30", prompt: "Number of solutions of $2\\sin^2 x-\\sin x=0$ on $0\\le x\\le2\\pi$.", latex: "2\\sin^2 x-\\sin x=0", answer: "5", difficulty: 5, hint: "Factor: $\\sin x(2\\sin x-1)=0$, then solve each factor.", explanation: "$\\sin x=0$ gives $0,\\pi,2\\pi$; $\\sin x=\\frac12$ gives $\\frac{\\pi}{6},\\frac{5\\pi}{6}$. Total $5$ solutions.", acceptedAnswers: ["five"] },
];
trigonometricEquationsLesson.multiPartPractice = [
  {
    id: "trige-mp-1",
    prompt:
      "Consider the equation $2\\sin x+1=0$ over the domain $0\\le x\\le2\\pi$.",
    latex: "2\\sin x+1=0,\\quad 0\\le x\\le2\\pi",
    answer: "2",
    hint: "Isolate $\\sin x$, identify the reference angle from the exact value, then count solutions using the quadrant signs.",
    explanation:
      "(a) $2\\sin x=-1$, so $\\sin x=-\\frac12$. (b) The reference angle is $\\frac{\\pi}{6}$ (taken as $30^\\circ$), entered as $30$. (c) Sine is negative in quadrants III and IV, giving $x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$: $2$ solutions.",
    parts: [
      { key: "a", label: "(a)", prompt: "After isolating, $\\sin x$ equals a fraction $\\frac{p}{q}$. Type $\\sin x$ as a decimal.", latex: "2\\sin x+1=0", marks: 2, answer: "-0.5", acceptedAnswers: ["−0.5", "-1/2", "-.5"], hint: "Subtract $1$, divide by $2$.", explanation: "$\\sin x=-\\frac12=-0.5$." },
      { key: "b", label: "(b)", prompt: "Find the reference angle in degrees.", latex: "\\sin\\theta=\\frac12", marks: 1, answer: "30", acceptedAnswers: ["30°", "30 degrees"], hint: "$\\sin30^\\circ=\\frac12$.", explanation: "Reference angle is $30^\\circ$." },
      { key: "c", label: "(c)", prompt: "How many solutions does the equation have on $0\\le x\\le2\\pi$?", latex: "\\sin x=-\\frac12", marks: 2, answer: "2", acceptedAnswers: ["two"], hint: "Sine negative in two quadrants.", explanation: "$x=\\frac{7\\pi}{6},\\frac{11\\pi}{6}$: two solutions." },
    ],
  },
];

// === modelling-periodic-phenomena =========================================
modellingPeriodicPhenomenaLesson.masteryQuizPool = [
  { id: "modpp-p-1", prompt: "Tide height is $h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3$. The amplitude is:", latex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3", answer: "2", difficulty: 1, hint: "Amplitude is $|a|$.", explanation: "$|a|=2$ m.", acceptedAnswers: ["2.0"] },
  { id: "modpp-p-2", prompt: "For $h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3$, the midline is $h=$", latex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3", answer: "3", difficulty: 1, hint: "Midline is $d$.", explanation: "Midline $h=3$ m.", acceptedAnswers: ["3.0"] },
  { id: "modpp-p-3", prompt: "For $h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3$, the period is:", latex: "\\frac{2\\pi}{|b|}", answer: "12", difficulty: 2, hint: "$\\frac{2\\pi}{\\pi/6}$.", explanation: "$\\frac{2\\pi}{\\pi/6}=12$ hours.", acceptedAnswers: ["12.0"] },
  { id: "modpp-p-4", prompt: "For $h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3$, the maximum height is:", latex: "d+|a|", answer: "5", difficulty: 2, hint: "Midline plus amplitude.", explanation: "$3+2=5$ m.", acceptedAnswers: ["5.0"] },
  { id: "modpp-p-5", prompt: "For $h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3$, the minimum height is:", latex: "d-|a|", answer: "1", difficulty: 2, hint: "Midline minus amplitude.", explanation: "$3-2=1$ m.", acceptedAnswers: ["1.0"] },
  { id: "modpp-p-6", prompt: "A Ferris wheel: $h(t)=10\\cos\\left(\\frac{\\pi}{15}t\\right)+12$. The maximum height is:", latex: "d+|a|", answer: "22", difficulty: 2, hint: "$12+10$.", explanation: "Max $=12+10=22$ m.", acceptedAnswers: ["22.0"] },
  { id: "modpp-p-7", prompt: "For $h(t)=10\\cos\\left(\\frac{\\pi}{15}t\\right)+12$, the minimum height is:", latex: "d-|a|", answer: "2", difficulty: 2, hint: "$12-10$.", explanation: "Min $=12-10=2$ m.", acceptedAnswers: ["2.0"] },
  { id: "modpp-p-8", prompt: "For $h(t)=10\\cos\\left(\\frac{\\pi}{15}t\\right)+12$, the period is:", latex: "\\frac{2\\pi}{|b|}", answer: "30", difficulty: 3, hint: "$\\frac{2\\pi}{\\pi/15}$.", explanation: "$\\frac{2\\pi}{\\pi/15}=30$ s.", acceptedAnswers: ["30.0"] },
  { id: "modpp-p-9", prompt: "A temperature model has maximum $26^\\circ$C and minimum $14^\\circ$C. The amplitude is:", latex: "\\frac{\\text{max}-\\text{min}}{2}", answer: "6", difficulty: 3, hint: "Half the difference.", explanation: "$\\frac{26-14}{2}=6^\\circ$C.", acceptedAnswers: ["6.0"] },
  { id: "modpp-p-10", prompt: "A temperature model has maximum $26^\\circ$C and minimum $14^\\circ$C. The midline is:", latex: "\\frac{\\text{max}+\\text{min}}{2}", answer: "20", difficulty: 3, hint: "Average of max and min.", explanation: "$\\frac{26+14}{2}=20^\\circ$C.", acceptedAnswers: ["20.0"] },
  { id: "modpp-p-11", prompt: "A tide repeats every $12$ hours. Its $b$ value (taking $b>0$) is:", latex: "\\frac{2\\pi}{b}=12", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{3}$" }, { label: "B", text: "$\\frac{\\pi}{12}$" }, { label: "C", text: "$\\frac{\\pi}{6}$" }, { label: "D", text: "$12$" }], hint: "$b=\\frac{2\\pi}{\\text{period}}$.", explanation: "$b=\\frac{2\\pi}{12}=\\frac{\\pi}{6}$." },
  { id: "modpp-p-12", prompt: "A wave height $H(t)=1.5\\sin\\left(\\frac{\\pi}{4}t\\right)+2$. The amplitude is:", latex: "H(t)=1.5\\sin\\left(\\frac{\\pi}{4}t\\right)+2", answer: "1.5", difficulty: 2, hint: "$|a|$.", explanation: "Amplitude $=1.5$ m.", acceptedAnswers: ["1.50", "3/2"] },
  { id: "modpp-p-13", prompt: "For $H(t)=1.5\\sin\\left(\\frac{\\pi}{4}t\\right)+2$, the period is:", latex: "\\frac{2\\pi}{|b|}", answer: "8", difficulty: 3, hint: "$\\frac{2\\pi}{\\pi/4}$.", explanation: "$\\frac{2\\pi}{\\pi/4}=8$ s.", acceptedAnswers: ["8.0"] },
  { id: "modpp-p-14", prompt: "For $H(t)=1.5\\sin\\left(\\frac{\\pi}{4}t\\right)+2$, the maximum height is:", latex: "d+|a|", answer: "3.5", difficulty: 3, hint: "$2+1.5$.", explanation: "Max $=2+1.5=3.5$ m.", acceptedAnswers: ["3.50", "7/2"] },
  { id: "modpp-p-15", prompt: "Daylight hours follow $L(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+12$. Maximum daylight is:", latex: "d+|a|", answer: "14", difficulty: 3, hint: "$12+2$.", explanation: "Max $=12+2=14$ hours.", acceptedAnswers: ["14.0"] },
  { id: "modpp-p-16", prompt: "For $L(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+12$, minimum daylight is:", latex: "d-|a|", answer: "10", difficulty: 3, hint: "$12-2$.", explanation: "Min $=12-2=10$ hours.", acceptedAnswers: ["10.0"] },
  { id: "modpp-p-17", prompt: "What does the midline of a periodic model represent?", latex: "y=d", answer: "B", difficulty: 2, choices: [{ label: "A", text: "the maximum value" }, { label: "B", text: "the average (central) value" }, { label: "C", text: "the amplitude" }, { label: "D", text: "the period" }], hint: "It is halfway between max and min.", explanation: "The midline is the average value." },
  { id: "modpp-p-18", prompt: "A model has period $24$ hours. Its $b$ value (taking $b>0$) is:", latex: "\\frac{2\\pi}{b}=24", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{12}$" }, { label: "B", text: "$\\frac{\\pi}{24}$" }, { label: "C", text: "$\\frac{\\pi}{6}$" }, { label: "D", text: "$24$" }], hint: "$b=\\frac{2\\pi}{24}$.", explanation: "$b=\\frac{2\\pi}{24}=\\frac{\\pi}{12}$." },
  { id: "modpp-p-19", prompt: "A piston's displacement is $d(t)=5\\cos(4\\pi t)$. The period is:", latex: "\\frac{2\\pi}{|b|}", answer: "0.5", difficulty: 4, hint: "$\\frac{2\\pi}{4\\pi}$.", explanation: "$\\frac{2\\pi}{4\\pi}=0.5$ s.", acceptedAnswers: ["1/2", ".5"] },
  { id: "modpp-p-20", prompt: "For $d(t)=5\\cos(4\\pi t)$, the maximum displacement is:", latex: "d+|a|", answer: "5", difficulty: 3, hint: "Midline is $0$, amplitude $5$.", explanation: "Max $=0+5=5$.", acceptedAnswers: ["5.0"] },
  { id: "modpp-p-21", prompt: "A Ferris wheel reaches max $35$ m and min $3$ m. Its amplitude is:", latex: "\\frac{\\text{max}-\\text{min}}{2}", answer: "16", difficulty: 4, hint: "Half the difference.", explanation: "$\\frac{35-3}{2}=16$ m.", acceptedAnswers: ["16.0"] },
  { id: "modpp-p-22", prompt: "A Ferris wheel reaches max $35$ m and min $3$ m. The height of its centre (midline) is:", latex: "\\frac{\\text{max}+\\text{min}}{2}", answer: "19", difficulty: 4, hint: "Average of max and min.", explanation: "$\\frac{35+3}{2}=19$ m.", acceptedAnswers: ["19.0"] },
  { id: "modpp-p-23", prompt: "Tidal depth varies between $1.2$ m and $4.8$ m. The amplitude is:", latex: "\\frac{\\text{max}-\\text{min}}{2}", answer: "1.8", difficulty: 4, hint: "Half the range.", explanation: "$\\frac{4.8-1.2}{2}=1.8$ m.", acceptedAnswers: ["1.80", "9/5"] },
  { id: "modpp-p-24", prompt: "Tidal depth varies between $1.2$ m and $4.8$ m. The midline is:", latex: "\\frac{\\text{max}+\\text{min}}{2}", answer: "3", difficulty: 4, hint: "Average of the extremes.", explanation: "$\\frac{4.8+1.2}{2}=3$ m.", acceptedAnswers: ["3.0"] },
  { id: "modpp-p-25", prompt: "A blood-pressure model completes one cycle in $0.8$ s. How many cycles occur in $60$ s?", latex: "\\frac{60}{0.8}", answer: "75", difficulty: 5, hint: "Divide total time by the period.", explanation: "$\\frac{60}{0.8}=75$ cycles." },
  { id: "modpp-p-26", prompt: "A Ferris wheel completes one rotation every $40$ s. How many full rotations in $5$ minutes?", latex: "\\frac{300}{40}", answer: "7.5", difficulty: 5, hint: "$5$ min $=300$ s; divide by the period.", explanation: "$\\frac{300}{40}=7.5$ rotations.", acceptedAnswers: ["15/2"] },
  { id: "modpp-p-27", prompt: "A temperature model is $T(t)=8\\sin\\left(\\frac{\\pi}{12}(t-8)\\right)+18$. The maximum temperature is:", latex: "d+|a|", answer: "26", difficulty: 5, hint: "Max $=d+|a|$; the phase shift does not change the maximum value.", explanation: "Max $=18+8=26^\\circ$C." },
  { id: "modpp-p-28", prompt: "For $T(t)=8\\sin\\left(\\frac{\\pi}{12}(t-8)\\right)+18$, the period is:", latex: "\\frac{2\\pi}{|b|}", answer: "24", difficulty: 5, hint: "$\\frac{2\\pi}{\\pi/12}$; ignore the phase shift.", explanation: "$\\frac{2\\pi}{\\pi/12}=24$ hours.", acceptedAnswers: ["24.0"] },
  { id: "modpp-p-29", prompt: "A wheel's height is $h(t)=16\\sin\\left(\\frac{\\pi}{20}t\\right)+19$ (metres, $t$ in seconds). Its lowest point is reached when $\\sin=-1$. That lowest height is:", latex: "d-|a|", answer: "3", difficulty: 5, hint: "Min $=d-|a|$.", explanation: "Min $=19-16=3$ m." },
  { id: "modpp-p-30", prompt: "A signal $V(t)=A\\sin(bt)+D$ swings between $240$ and $200$. Half the difference between the extremes gives $A=$", latex: "A=\\frac{\\text{max}-\\text{min}}{2}", answer: "20", difficulty: 5, hint: "Amplitude is half the peak-to-trough swing.", explanation: "$A=\\frac{240-200}{2}=20$." },
];
modellingPeriodicPhenomenaLesson.multiPartPractice = [
  {
    id: "modpp-mp-1",
    prompt:
      "On a Ferris wheel, a rider's height in metres after $t$ seconds is $h(t)=12\\sin\\left(\\frac{\\pi}{30}t\\right)+15$.",
    latex: "h(t)=12\\sin\\left(\\frac{\\pi}{30}t\\right)+15",
    answer: "27",
    hint: "Identify $a$, $b$ and $d$, then use period $=\\frac{2\\pi}{|b|}$ and maximum $=d+|a|$.",
    explanation:
      "(a) Amplitude $=|a|=12$ m. (b) Period $=\\frac{2\\pi}{\\pi/30}=60$ s. (c) Maximum height $=d+|a|=15+12=27$ m.",
    parts: [
      { key: "a", label: "(a)", prompt: "State the amplitude in metres.", latex: "|a|", marks: 1, answer: "12", acceptedAnswers: ["12.0"], hint: "Amplitude is $|a|$.", explanation: "$|12|=12$ m." },
      { key: "b", label: "(b)", prompt: "Find the period in seconds.", latex: "\\frac{2\\pi}{|b|}", marks: 2, answer: "60", acceptedAnswers: ["60.0"], hint: "$\\frac{2\\pi}{\\pi/30}$.", explanation: "$\\frac{2\\pi}{\\pi/30}=60$ s." },
      { key: "c", label: "(c)", prompt: "Find the maximum height in metres.", latex: "d+|a|", marks: 2, answer: "27", acceptedAnswers: ["27.0"], hint: "Midline plus amplitude.", explanation: "$15+12=27$ m." },
    ],
  },
];

graphsSineCosineTangentLesson.multiPartPractice = [
  {
    id: "gsct-mp-1",
    prompt:
      "Consider the graphs of $y=\\sin x$, $y=\\cos x$ and $y=\\tan x$ on the domain $0\\le x\\le2\\pi$.",
    latex: "y=\\sin x,\\quad y=\\cos x,\\quad y=\\tan x",
    answer: "3",
    hint: "Use the standard zeros, the cosine-zero rule for tangent asymptotes, and the intersection condition $\\tan x=1$.",
    explanation:
      "(a) $\\sin x=0$ at $x=0,\\pi,2\\pi$, so there are $3$ $x$-intercepts. (b) $y=\\tan x$ has asymptotes where $\\cos x=0$, i.e. $x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$, so $2$ asymptotes. (c) $\\sin x=\\cos x$ gives $\\tan x=1$, so $x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$: $2$ intersection points.",
    parts: [
      { key: "a", label: "(a)", prompt: "How many $x$-intercepts does $y=\\sin x$ have on $0\\le x\\le2\\pi$?", latex: "\\sin x=0", marks: 2, answer: "3", acceptedAnswers: ["three"], hint: "Zeros at $0,\\pi,2\\pi$.", explanation: "$\\sin x=0$ at $x=0,\\pi,2\\pi$: three intercepts." },
      { key: "b", label: "(b)", prompt: "How many vertical asymptotes does $y=\\tan x$ have on $0\\le x\\le2\\pi$?", latex: "\\cos x=0", marks: 2, answer: "2", acceptedAnswers: ["two"], hint: "Asymptotes where $\\cos x=0$.", explanation: "$\\cos x=0$ at $x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$: two asymptotes." },
      { key: "c", label: "(c)", prompt: "How many times do $y=\\sin x$ and $y=\\cos x$ intersect on $0\\le x\\le2\\pi$?", latex: "\\sin x=\\cos x", marks: 2, answer: "2", acceptedAnswers: ["two"], hint: "Set $\\tan x=1$.", explanation: "$\\tan x=1$ gives $x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$: two intersections." },
    ],
  },
];

// === mixed-trigonometric-functions-exam-practice ==========================
mixedTrigonometricFunctionsExamPracticeLesson.masteryQuizPool = [
  { id: "mixtf-p-1", prompt: "Amplitude of $y=3\\cos(2x)-1$:", latex: "y=3\\cos(2x)-1", answer: "3", difficulty: 1, hint: "Amplitude is $|a|$.", explanation: "$|3|=3$.", acceptedAnswers: ["3.0"] },
  { id: "mixtf-p-2", prompt: "Period of $y=3\\cos(2x)-1$:", latex: "\\frac{2\\pi}{|b|}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$2\\pi$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$3\\pi$" }], hint: "$\\frac{2\\pi}{2}$.", explanation: "$\\frac{2\\pi}{2}=\\pi$." },
  { id: "mixtf-p-3", prompt: "Midline of $y=3\\cos(2x)-1$:", latex: "y=3\\cos(2x)-1", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$y=3$" }, { label: "B", text: "$y=0$" }, { label: "C", text: "$y=-1$" }, { label: "D", text: "$y=2$" }], hint: "Midline is $y=d$.", explanation: "$d=-1$." },
  { id: "mixtf-p-4", prompt: "Maximum of $y=3\\cos(2x)-1$:", latex: "d+|a|", answer: "2", difficulty: 2, hint: "$-1+3$.", explanation: "Max $=-1+3=2$.", acceptedAnswers: ["2.0"] },
  { id: "mixtf-p-5", prompt: "Minimum of $y=3\\cos(2x)-1$:", latex: "d-|a|", answer: "-4", difficulty: 2, hint: "$-1-3$.", explanation: "Min $=-1-3=-4$.", acceptedAnswers: ["−4"] },
  { id: "mixtf-p-6", prompt: "Number of solutions of $2\\sin x-1=0$ on $0\\le x\\le2\\pi$:", latex: "2\\sin x-1=0", answer: "2", difficulty: 2, hint: "$\\sin x=\\frac12$.", explanation: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "mixtf-p-7", prompt: "Reference angle for $\\cos x=\\frac12$:", latex: "\\cos x=\\frac12", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\pi}{6}$" }, { label: "B", text: "$\\frac{\\pi}{4}$" }, { label: "C", text: "$\\frac{\\pi}{3}$" }, { label: "D", text: "$\\frac{\\pi}{2}$" }], hint: "$\\cos\\frac{\\pi}{3}=\\frac12$.", explanation: "Reference angle $\\frac{\\pi}{3}$." },
  { id: "mixtf-p-8", prompt: "Which identity is correct?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\sin^2x+\\cos^2x=1$" }, { label: "B", text: "$\\sin^2x-\\cos^2x=1$" }, { label: "C", text: "$\\sin x+\\cos x=1$" }, { label: "D", text: "$\\tan^2x+1=\\sin x$" }], hint: "The Pythagorean identity.", explanation: "$\\sin^2x+\\cos^2x=1$." },
  { id: "mixtf-p-9", prompt: "Period of $y=\\tan(3x)$:", latex: "\\frac{\\pi}{|b|}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{3}$" }, { label: "B", text: "$\\frac{\\pi}{2}$" }, { label: "C", text: "$\\pi$" }, { label: "D", text: "$3\\pi$" }], hint: "Tangent period is $\\frac{\\pi}{|b|}$.", explanation: "$\\frac{\\pi}{3}$." },
  { id: "mixtf-p-10", prompt: "Tide model $h(t)=3\\sin\\left(\\frac{\\pi}{6}t\\right)+5$. The maximum height is:", latex: "d+|a|", answer: "8", difficulty: 3, hint: "$5+3$.", explanation: "Max $=5+3=8$ m.", acceptedAnswers: ["8.0"] },
  { id: "mixtf-p-11", prompt: "For $h(t)=3\\sin\\left(\\frac{\\pi}{6}t\\right)+5$, the period is:", latex: "\\frac{2\\pi}{|b|}", answer: "12", difficulty: 3, hint: "$\\frac{2\\pi}{\\pi/6}$.", explanation: "$\\frac{2\\pi}{\\pi/6}=12$ h.", acceptedAnswers: ["12.0"] },
  { id: "mixtf-p-12", prompt: "Number of solutions of $\\cos x=0$ on $0\\le x\\le2\\pi$:", latex: "\\cos x=0", answer: "2", difficulty: 3, hint: "At $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$.", explanation: "Two solutions.", acceptedAnswers: ["two"] },
  { id: "mixtf-p-13", prompt: "Number of $x$-intercepts of $y=\\cos x$ on $0\\le x\\le2\\pi$:", latex: "\\cos x=0", answer: "2", difficulty: 3, hint: "Where cosine crosses zero.", explanation: "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$: two intercepts.", acceptedAnswers: ["two"] },
  { id: "mixtf-p-14", prompt: "The two solutions of $\\tan x=1$ on $0\\le x\\le2\\pi$ are:", latex: "\\tan x=1", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{4},\\frac{3\\pi}{4}$" }, { label: "B", text: "$\\frac{\\pi}{4},\\frac{5\\pi}{4}$" }, { label: "C", text: "$\\frac{\\pi}{3},\\frac{4\\pi}{3}$" }, { label: "D", text: "$\\frac{\\pi}{4},\\frac{7\\pi}{4}$" }], hint: "Tangent positive in quadrants I and III.", explanation: "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$." },
  { id: "mixtf-p-15", prompt: "Amplitude of a model swinging between $9$ and $1$:", latex: "\\frac{\\text{max}-\\text{min}}{2}", answer: "4", difficulty: 3, hint: "Half the difference.", explanation: "$\\frac{9-1}{2}=4$.", acceptedAnswers: ["4.0"] },
  { id: "mixtf-p-16", prompt: "Midline of a model swinging between $9$ and $1$:", latex: "\\frac{\\text{max}+\\text{min}}{2}", answer: "5", difficulty: 3, hint: "Average of max and min.", explanation: "$\\frac{9+1}{2}=5$.", acceptedAnswers: ["5.0"] },
  { id: "mixtf-p-17", prompt: "Simplify $1-\\cos^2x$:", latex: "1-\\cos^2x", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\cos^2x$" }, { label: "B", text: "$\\tan^2x$" }, { label: "C", text: "$\\sin^2x$" }, { label: "D", text: "$1$" }], hint: "Rearrange the Pythagorean identity.", explanation: "$1-\\cos^2x=\\sin^2x$." },
  { id: "mixtf-p-18", prompt: "Period of $y=\\sin\\left(\\frac12 x\\right)$:", latex: "\\frac{2\\pi}{|b|}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$4\\pi$" }], hint: "$\\frac{2\\pi}{1/2}$.", explanation: "$\\frac{2\\pi}{1/2}=4\\pi$." },
  { id: "mixtf-p-19", prompt: "Number of solutions of $\\sin x=0$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=0", answer: "3", difficulty: 3, hint: "At $0$, $\\pi$, $2\\pi$.", explanation: "Three solutions.", acceptedAnswers: ["three"] },
  { id: "mixtf-p-20", prompt: "Vertical asymptotes of $y=\\tan x$ on $0\\le x\\le2\\pi$, count:", latex: "\\cos x=0", answer: "2", difficulty: 4, hint: "Where $\\cos x=0$.", explanation: "$x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$: two.", acceptedAnswers: ["two"] },
  { id: "mixtf-p-21", prompt: "A curve $y=a\\cos(bx)+d$ has max $10$ and min $4$. The value of $d$ is:", latex: "d=\\frac{\\text{max}+\\text{min}}{2}", answer: "7", difficulty: 4, hint: "Midline is the average.", explanation: "$d=\\frac{10+4}{2}=7$.", acceptedAnswers: ["7.0"] },
  { id: "mixtf-p-22", prompt: "For the same curve (max $10$, min $4$), the amplitude $|a|$ is:", latex: "|a|=\\frac{\\text{max}-\\text{min}}{2}", answer: "3", difficulty: 4, hint: "Half the difference.", explanation: "$|a|=\\frac{10-4}{2}=3$.", acceptedAnswers: ["3.0"] },
  { id: "mixtf-p-23", prompt: "Number of solutions of $2\\cos x+1=0$ on $0\\le x\\le2\\pi$:", latex: "2\\cos x+1=0", answer: "2", difficulty: 4, hint: "$\\cos x=-\\frac12$, negative in quadrants II and III.", explanation: "$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "mixtf-p-24", prompt: "Simplify $\\dfrac{\\sin x}{\\cos x}$:", latex: "\\frac{\\sin x}{\\cos x}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\tan x$" }, { label: "B", text: "$\\cot x$" }, { label: "C", text: "$1$" }, { label: "D", text: "$\\sin x\\cos x$" }], hint: "Definition of tangent.", explanation: "$\\frac{\\sin x}{\\cos x}=\\tan x$." },
  { id: "mixtf-p-25", prompt: "A wheel of period $48$ s completes how many rotations in $4$ minutes?", latex: "\\frac{240}{48}", answer: "5", difficulty: 5, hint: "$4$ min $=240$ s; divide by the period.", explanation: "$\\frac{240}{48}=5$ rotations.", acceptedAnswers: ["5.0"] },
  { id: "mixtf-p-26", prompt: "Number of solutions of $\\sin(2x)=0$ on $0\\le x\\le2\\pi$:", latex: "\\sin(2x)=0", answer: "5", difficulty: 5, hint: "Let $u=2x\\in[0,4\\pi]$; $\\sin u=0$ at $0,\\pi,2\\pi,3\\pi,4\\pi$.", explanation: "$x=0,\\frac{\\pi}{2},\\pi,\\frac{3\\pi}{2},2\\pi$: five solutions.", acceptedAnswers: ["five"] },
  { id: "mixtf-p-27", prompt: "Number of solutions of $\\sin x=\\cos x$ on $0\\le x\\le2\\pi$:", latex: "\\sin x=\\cos x", answer: "2", difficulty: 5, hint: "$\\tan x=1$.", explanation: "$x=\\frac{\\pi}{4},\\frac{5\\pi}{4}$: two solutions.", acceptedAnswers: ["two"] },
  { id: "mixtf-p-28", prompt: "For $y=4\\sin\\left(3\\left(x-\\frac{\\pi}{9}\\right)\\right)+2$, the maximum value is:", latex: "d+|a|", answer: "6", difficulty: 5, hint: "Max $=d+|a|$; the phase shift does not affect it.", explanation: "Max $=2+4=6$.", acceptedAnswers: ["6.0"] },
  { id: "mixtf-p-29", prompt: "For $y=4\\sin\\left(3\\left(x-\\frac{\\pi}{9}\\right)\\right)+2$, the number of complete cycles on $0\\le x\\le2\\pi$ is:", latex: "\\frac{\\text{domain}}{\\text{period}}", answer: "3", difficulty: 5, hint: "Period $=\\frac{2\\pi}{3}$; divide $2\\pi$ by it.", explanation: "Period $=\\frac{2\\pi}{3}$, so $\\frac{2\\pi}{2\\pi/3}=3$ cycles.", acceptedAnswers: ["three"] },
  { id: "mixtf-p-30", prompt: "Number of solutions of $\\cos^2x=\\frac14$ on $0\\le x\\le2\\pi$.", latex: "\\cos^2x=\\frac14", answer: "4", difficulty: 5, hint: "$\\cos x=\\pm\\frac12$; each value gives two solutions.", explanation: "$\\cos x=\\frac12$ gives $\\frac{\\pi}{3},\\frac{5\\pi}{3}$ and $\\cos x=-\\frac12$ gives $\\frac{2\\pi}{3},\\frac{4\\pi}{3}$: four solutions.", acceptedAnswers: ["four"] },
];
mixedTrigonometricFunctionsExamPracticeLesson.multiPartPractice = [
  {
    id: "mixtf-mp-1",
    prompt:
      "A sound wave is modelled by $y=6\\sin(2x)-1$, and separately the equation $2\\sin x-1=0$ is to be solved on $0\\le x\\le2\\pi$.",
    latex: "y=6\\sin(2x)-1,\\qquad 2\\sin x-1=0",
    answer: "6",
    hint: "Read amplitude and period from the model, then isolate and count solutions for the equation.",
    explanation:
      "(a) Amplitude $=|a|=6$. (b) Period $=\\frac{2\\pi}{2}=\\pi$. (c) $2\\sin x-1=0\\Rightarrow\\sin x=\\frac12$, giving $x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$: $2$ solutions.",
    parts: [
      { key: "a", label: "(a)", prompt: "State the amplitude of $y=6\\sin(2x)-1$.", latex: "|a|", marks: 1, answer: "6", acceptedAnswers: ["6.0"], hint: "Amplitude is $|a|$.", explanation: "$|6|=6$." },
      { key: "b", label: "(b)", prompt: "The period equals $\\frac{2\\pi}{k}$. Find the integer $k$.", latex: "\\text{period}=\\frac{2\\pi}{k}", marks: 2, answer: "2", acceptedAnswers: ["2.0"], hint: "$b=2$.", explanation: "Period $=\\frac{2\\pi}{2}=\\pi$, so $k=2$." },
      { key: "c", label: "(c)", prompt: "How many solutions does $2\\sin x-1=0$ have on $0\\le x\\le2\\pi$?", latex: "2\\sin x-1=0", marks: 2, answer: "2", acceptedAnswers: ["two"], hint: "$\\sin x=\\frac12$.", explanation: "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$: two solutions." },
    ],
  },
];
