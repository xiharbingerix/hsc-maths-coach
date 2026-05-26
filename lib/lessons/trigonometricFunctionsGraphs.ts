import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const radiansExactValuesUnitCircleLesson: ExplicitLesson = {
  id: "radians-exact-values-unit-circle",
  slug: "radians-exact-values-unit-circle",
  moduleSlug: "trigonometric-functions-graphs",
  moduleTitle: "Trigonometric Functions and Graphs",
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
  moduleSlug: "trigonometric-functions-graphs",
  moduleTitle: "Trigonometric Functions and Graphs",
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
      "Sine, cosine, and tangent graphs are periodic, which means their pattern repeats.",
      "The graph $y=\\sin x$ has period $2\\pi$ and range $-1\\le y\\le1$. It starts at $0$ when $x=0$.",
      "The graph $y=\\cos x$ also has period $2\\pi$ and range $-1\\le y\\le1$. It starts at $1$ when $x=0$.",
      "The graph $y=\\tan x$ has period $\\pi$. It starts at $0$ when $x=0$ and has vertical asymptotes where $\\cos x=0$.",
      "Key values help identify graph shape without needing to draw every point.",
    ],
    latexBlocks: [
      "y=\\sin x,\\quad \\text{period }2\\pi,\\quad -1\\le y\\le1",
      "y=\\cos x,\\quad \\text{period }2\\pi,\\quad -1\\le y\\le1",
      "y=\\tan x,\\quad \\text{period }\\pi",
      "\\cos x=0\\quad \\Rightarrow \\quad \\tan x\\text{ is undefined}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Key features of sine",
      questionLatex: "y=\\sin x,\\quad 0\\le x\\le2\\pi",
      steps: [
        {
          explanation: "The sine graph starts at zero.",
          latex: "\\sin(0)=0",
        },
        {
          explanation: "It reaches a maximum of 1 at $\\frac{\\pi}{2}$.",
          latex: "\\sin\\left(\\frac{\\pi}{2}\\right)=1",
        },
        {
          explanation: "It returns to zero at $\\pi$ and reaches a minimum at $\\frac{3\\pi}{2}$.",
          latex: "\\sin(\\pi)=0,\\quad \\sin\\left(\\frac{3\\pi}{2}\\right)=-1",
        },
        {
          explanation: "It completes one cycle at $2\\pi$.",
          latex: "\\sin(2\\pi)=0",
        },
      ],
      finalAnswerLatex:
        "\\text{Period }2\\pi,\\quad \\text{range }[-1,1]",
    },
    {
      title: "Worked example 2: Key features of cosine",
      questionLatex: "y=\\cos x,\\quad 0\\le x\\le2\\pi",
      steps: [
        {
          explanation: "The cosine graph starts at its maximum.",
          latex: "\\cos(0)=1",
        },
        {
          explanation: "It crosses the x-axis at $\\frac{\\pi}{2}$.",
          latex: "\\cos\\left(\\frac{\\pi}{2}\\right)=0",
        },
        {
          explanation: "It reaches a minimum at $\\pi$.",
          latex: "\\cos(\\pi)=-1",
        },
        {
          explanation: "It completes one cycle at $2\\pi$.",
          latex: "\\cos(2\\pi)=1",
        },
      ],
      finalAnswerLatex:
        "\\text{Period }2\\pi,\\quad \\text{range }[-1,1]",
    },
    {
      title: "Worked example 3: Tangent period and asymptotes",
      questionLatex: "y=\\tan x",
      steps: [
        {
          explanation: "The tangent graph repeats every $\\pi$.",
          latex: "\\tan(x+\\pi)=\\tan x",
        },
        {
          explanation: "Tangent is undefined where cosine is zero.",
          latex: "\\cos x=0",
        },
        {
          explanation: "The first vertical asymptotes around zero are at $\\pm\\frac{\\pi}{2}$.",
          latex: "x=-\\frac{\\pi}{2},\\quad x=\\frac{\\pi}{2}",
        },
      ],
      finalAnswerLatex:
        "\\text{Period }\\pi,\\quad \\text{asymptotes }x=\\frac{\\pi}{2}+k\\pi",
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
  moduleSlug: "trigonometric-functions-graphs",
  moduleTitle: "Trigonometric Functions and Graphs",
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
      "For $y=a\\sin(b(x-c))+d$ and $y=a\\cos(b(x-c))+d$, each constant changes a graph feature.",
      "The amplitude is $|a|$. It measures the distance from the midline to a maximum or minimum.",
      "The period is the length of one full cycle. For sine and cosine, the period is $\\frac{2\\pi}{|b|}$.",
      "The phase shift is $c$, which moves the graph left or right. The vertical shift is $d$.",
      "The midline is $y=d$. Tangent has no amplitude, and its period is $\\frac{\\pi}{|b|}$.",
    ],
    latexBlocks: [
      "y=a\\sin(b(x-c))+d",
      "\\text{amplitude}=|a|",
      "\\text{period for sine/cosine}=\\frac{2\\pi}{|b|}",
      "\\text{period for tangent}=\\frac{\\pi}{|b|}",
      "\\text{midline: }y=d",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Sine transformation",
      questionLatex: "y=3\\sin(2x)+1",
      steps: [
        { explanation: "Identify $a$ and $b$.", latex: "a=3,\\quad b=2" },
        { explanation: "Find the amplitude.", latex: "|a|=|3|=3" },
        { explanation: "Find the period.", latex: "\\frac{2\\pi}{|2|}=\\pi" },
        { explanation: "The vertical shift is $d=1$.", latex: "y=1" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }3,\\quad \\text{period }\\pi,\\quad \\text{vertical shift }1",
    },
    {
      title: "Worked example 2: Cosine transformation",
      questionLatex: "y=-2\\cos\\left(x-\\frac{\\pi}{3}\\right)+4",
      steps: [
        { explanation: "Identify the constants.", latex: "a=-2,\\quad b=1,\\quad c=\\frac{\\pi}{3},\\quad d=4" },
        { explanation: "Amplitude uses the absolute value of $a$.", latex: "|a|=|-2|=2" },
        { explanation: "Find the period.", latex: "\\frac{2\\pi}{|1|}=2\\pi" },
        { explanation: "The phase shift is right $\\frac{\\pi}{3}$ and the midline is $y=4$.", latex: "x\\mapsto x-\\frac{\\pi}{3},\\quad y=4" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }2,\\quad \\text{period }2\\pi,\\quad \\text{phase shift }\\frac{\\pi}{3}\\text{ right},\\quad \\text{midline }y=4",
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
  moduleSlug: "trigonometric-functions-graphs",
  moduleTitle: "Trigonometric Functions and Graphs",
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
      "Trigonometric equations often have more than one solution in a given domain.",
      "First isolate the trigonometric function. For example, $2\\sin x-1=0$ becomes $\\sin x=\\frac12$.",
      "Use exact values to find the reference angle, then use quadrant signs to find all solutions in the interval.",
      "Always check the domain. Unless degrees are specified, answers should be written in radians.",
      "Sine and cosine repeat every $2\\pi$, while tangent repeats every $\\pi$.",
    ],
    latexBlocks: [
      "2\\sin x-1=0\\quad \\Rightarrow\\quad \\sin x=\\frac12",
      "\\sin x>0\\quad \\text{in quadrants I and II}",
      "\\cos x<0\\quad \\text{in quadrants II and III}",
      "\\tan(x+\\pi)=\\tan x",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Solve a sine equation",
      questionLatex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "Isolate sine.", latex: "2\\sin x=1\\quad \\Rightarrow\\quad \\sin x=\\frac12" },
        { explanation: "Find the reference angle.", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12" },
        { explanation: "Sine is positive in quadrants I and II.", latex: "x=\\frac{\\pi}{6},\\quad x=\\frac{5\\pi}{6}" },
      ],
      finalAnswerLatex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6}",
    },
    {
      title: "Worked example 2: Solve a cosine equation",
      questionLatex: "\\cos x=-\\frac12,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "The reference angle is $\\frac{\\pi}{3}$.", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)=\\frac12" },
        { explanation: "Cosine is negative in quadrants II and III.", latex: "x=\\pi-\\frac{\\pi}{3},\\quad x=\\pi+\\frac{\\pi}{3}" },
        { explanation: "Simplify the solutions.", latex: "x=\\frac{2\\pi}{3},\\quad x=\\frac{4\\pi}{3}" },
      ],
      finalAnswerLatex: "x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}",
    },
    {
      title: "Worked example 3: Solve a tangent equation",
      questionLatex: "\\tan x=1,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "The reference angle is $\\frac{\\pi}{4}$.", latex: "\\tan\\left(\\frac{\\pi}{4}\\right)=1" },
        { explanation: "Tangent is positive in quadrants I and III.", latex: "x=\\frac{\\pi}{4},\\quad x=\\frac{5\\pi}{4}" },
        { explanation: "These are both in the domain.", latex: "0\\le x\\le2\\pi" },
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
  moduleSlug: "trigonometric-functions-graphs",
  moduleTitle: "Trigonometric Functions and Graphs",
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
      latex: "\\frac{\\sin x}{\\cos x}\\cos x",
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
  moduleSlug: "trigonometric-functions-graphs",
  moduleTitle: "Trigonometric Functions and Graphs",
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
      "Trigonometric functions can model repeating behaviour such as tides, daylight, Ferris wheel height, temperature, and motion.",
      "The midline represents the average value. In $y=a\\sin(b(t-c))+d$, the midline is $y=d$.",
      "The amplitude is half the distance between the maximum and minimum values.",
      "For sine and cosine models, the period is $\\frac{2\\pi}{|b|}$.",
      "Maximum and minimum values come from midline plus or minus amplitude, and units matter in context.",
    ],
    latexBlocks: [
      "y=a\\sin(b(t-c))+d",
      "\\text{amplitude}=|a|",
      "\\text{period}=\\frac{2\\pi}{|b|}",
      "\\text{maximum}=d+|a|,\\quad \\text{minimum}=d-|a|",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Tide model",
      questionLatex: "h(t)=2\\sin\\left(\\frac{\\pi}{6}t\\right)+3",
      steps: [
        { explanation: "Identify amplitude.", latex: "|a|=2" },
        { explanation: "Identify midline.", latex: "h=3" },
        { explanation: "Find the period.", latex: "\\frac{2\\pi}{\\pi/6}=12" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }2\\text{ m},\\quad \\text{midline }3\\text{ m},\\quad \\text{period }12\\text{ h}",
    },
    {
      title: "Worked example 2: Ferris wheel model",
      questionLatex: "h(t)=10\\cos\\left(\\frac{\\pi}{15}t\\right)+12",
      steps: [
        { explanation: "Amplitude is 10 and midline is 12.", latex: "|a|=10,\\quad d=12" },
        { explanation: "Find maximum and minimum height.", latex: "\\max=12+10=22,\\quad \\min=12-10=2" },
        { explanation: "Find the period.", latex: "\\frac{2\\pi}{\\pi/15}=30" },
      ],
      finalAnswerLatex:
        "\\text{maximum }22\\text{ m},\\quad \\text{minimum }2\\text{ m},\\quad \\text{period }30\\text{ s}",
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
      prompt: "Choose the correct unit for the period if $t$ is in hours.",
      latex: "t\\text{ in hours}",
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

export const mixedTrigonometricFunctionsExamPracticeLesson: ExplicitLesson = {
  id: "mixed-trigonometric-functions-exam-practice",
  slug: "mixed-trigonometric-functions-exam-practice",
  moduleSlug: "trigonometric-functions-graphs",
  moduleTitle: "Trigonometric Functions and Graphs",
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
      "Mixed exam questions often combine exact values, unit-circle signs, graph features, transformations, equations, identities, and modelling.",
      "The first step is to identify the skill being tested before calculating.",
      "For equation questions, always check the domain and give all solutions.",
      "For graph questions, connect amplitude, period, midline, asymptotes, and intercepts to the equation.",
      "For modelling questions, answer in context and include units where appropriate.",
    ],
    latexBlocks: [
      "\\text{identify skill}\\quad \\Rightarrow\\quad \\text{choose method}\\quad \\Rightarrow\\quad \\text{answer in context}",
      "\\sin^2x+\\cos^2x=1",
      "\\text{period}=\\frac{2\\pi}{|b|}",
      "2\\sin x-1=0\\quad \\Rightarrow\\quad \\sin x=\\frac12",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Equation with two solutions",
      questionLatex: "2\\sin x-1=0,\\quad 0\\le x\\le2\\pi",
      steps: [
        { explanation: "Isolate sine.", latex: "\\sin x=\\frac12" },
        { explanation: "Use the reference angle.", latex: "\\frac{\\pi}{6}" },
        { explanation: "Sine is positive in quadrants I and II.", latex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6}" },
      ],
      finalAnswerLatex: "x=\\frac{\\pi}{6},\\frac{5\\pi}{6}",
    },
    {
      title: "Worked example 2: Graph features",
      questionLatex: "y=3\\cos(2x)-1",
      steps: [
        { explanation: "Identify amplitude and period.", latex: "\\text{amplitude}=3,\\quad \\text{period}=\\frac{2\\pi}{2}=\\pi" },
        { explanation: "Identify midline.", latex: "y=-1" },
        { explanation: "Find maximum and minimum.", latex: "\\max=-1+3=2,\\quad \\min=-1-3=-4" },
      ],
      finalAnswerLatex:
        "\\text{amplitude }3,\\quad \\text{period }\\pi,\\quad \\text{midline }y=-1,\\quad \\max 2,\\quad \\min -4",
    },
    {
      title: "Worked example 3: Tide model",
      questionLatex: "h(t)=1.5\\sin\\left(\\frac{\\pi}{6}t\\right)+2.4",
      steps: [
        { explanation: "Amplitude is the tide variation from the average.", latex: "1.5\\text{ m}" },
        { explanation: "Midline is the average height.", latex: "2.4\\text{ m}" },
        { explanation: "Find the period.", latex: "\\frac{2\\pi}{\\pi/6}=12\\text{ h}" },
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
  mixedTrigonometricFunctionsExamPracticeLesson,
];
