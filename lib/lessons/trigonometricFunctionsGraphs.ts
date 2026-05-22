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
      answer: "sqrt(3)/2",
      acceptedAnswers: ["\\sqrt{3}/2", "sqrt3/2", "√3/2"],
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
    status: "coming-soon",
  },
  {
    id: "trigonometric-equations",
    slug: "trigonometric-equations",
    title: "Trigonometric Equations",
    description:
      "Solve trigonometric equations over specified domains using exact values, graphs, and symmetry.",
    status: "coming-soon",
  },
  {
    id: "trigonometric-identities-simplification",
    slug: "trigonometric-identities-simplification",
    title: "Trigonometric Identities and Simplification",
    description:
      "Use fundamental trigonometric identities to simplify expressions and support equation solving.",
    status: "coming-soon",
  },
  {
    id: "modelling-periodic-phenomena",
    slug: "modelling-periodic-phenomena",
    title: "Modelling Periodic Phenomena",
    description:
      "Use trigonometric functions to model periodic contexts such as tides, daylight, height, and motion.",
    status: "coming-soon",
  },
  {
    id: "mixed-trigonometric-functions-exam-practice",
    slug: "mixed-trigonometric-functions-exam-practice",
    title: "Mixed Trigonometric Functions Exam Practice",
    description:
      "Practise mixed exam-style questions involving radians, exact values, graphs, transformations, equations, identities, and modelling.",
    status: "coming-soon",
  },
];

export const trigonometricFunctionsGraphsLessons = [
  radiansExactValuesUnitCircleLesson,
  graphsSineCosineTangentLesson,
];
