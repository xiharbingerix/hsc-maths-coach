import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./differentialCalculus";

export const domainRangeFunctionNotationLesson: ExplicitLesson = {
  id: "domain-range-function-notation",
  slug: "domain-range-function-notation",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Domain, Range, and Function Notation",
  description:
    "Understand function notation, domain, range, and common restrictions from square roots, denominators, graphs, and contexts.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Domain, Range, and Function Notation",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to use function notation and identify domain and range from equations, graphs, and contexts.",

  successCriteria: [
    "Explain that a function maps inputs to outputs.",
    "Evaluate function values such as $f(2)$ and $f(x+1)$.",
    "Identify domain restrictions from square roots and denominators.",
    "Recognise range as the set of output values produced.",
    "Choose domain and range statements that match equations or graph features.",
  ],

  teaching: {
    paragraphs: [
      "A function is a rule that assigns each allowed input exactly one output.",
      "The domain is the set of input values that are allowed. The range is the set of output values produced.",
      "Function notation is a compact way to describe substitution. For example, $f(3)$ means substitute $x=3$ into the rule for $f(x)$.",
      "Some equations create restrictions. A square root needs the expression inside it to be non-negative, and a denominator cannot be zero.",
      "Graphs also show domain and range: read domain from left to right and range from bottom to top.",
      "In modelling, context can restrict the domain. For example, time or length is usually not negative.",
    ],
    latexBlocks: [
      "f(x)=2x^2-x+1",
      "f(3)=2(3)^2-3+1",
      "f(x+2)=2(x+2)^2-(x+2)+1",
      "\\sqrt{5-2x}\\text{ is defined when }5-2x\\ge 0",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Use function notation",
      questionLatex: "f(x)=2x^2-x+1. \\quad \\text{Find }f(3)\\text{ and }f(x+2).",
      steps: [
        {
          explanation: "Substitute $x=3$ into the function.",
          latex: "f(3)=2(3)^2-3+1",
        },
        {
          explanation: "Simplify the value.",
          latex: "f(3)=18-3+1=16",
        },
        {
          explanation: "For $f(x+2)$, replace every $x$ with $x+2$.",
          latex: "f(x+2)=2(x+2)^2-(x+2)+1",
        },
        {
          explanation: "Expand and simplify.",
          latex: "f(x+2)=2x^2+8x+8-x-2+1=2x^2+7x+7",
        },
      ],
      finalAnswerLatex: "f(3)=16, \\quad f(x+2)=2x^2+7x+7",
    },
    {
      title: "Worked example 2: Domain from a square root",
      questionLatex: "f(x)=\\sqrt{5-2x}. \\quad \\text{Find the domain.}",
      steps: [
        {
          explanation: "The expression inside the square root must be non-negative.",
          latex: "5-2x\\ge 0",
        },
        {
          explanation: "Solve the inequality.",
          latex: "-2x\\ge -5 \\quad \\Rightarrow \\quad x\\le \\frac{5}{2}",
        },
        {
          explanation: "State the domain.",
          latex: "x\\le \\frac{5}{2}",
        },
      ],
      finalAnswerLatex: "x\\le \\frac{5}{2}",
    },
    {
      title: "Worked example 3: Range from vertex form",
      questionLatex: "f(x)=(x-3)^2+2. \\quad \\text{Find the range.}",
      steps: [
        {
          explanation: "The squared term is always non-negative.",
          latex: "(x-3)^2\\ge 0",
        },
        {
          explanation: "The smallest value occurs when $x=3$.",
          latex: "f(3)=0+2=2",
        },
        {
          explanation: "The parabola opens upward, so the range starts at 2.",
          latex: "y\\ge 2",
        },
      ],
      finalAnswerLatex: "y\\ge 2",
    },
  ],

  guidedPractice: [
    {
      id: "domain-guided-1",
      prompt: "Evaluate the function:",
      latex: "f(x)=3x-5, \\quad f(4)=\\Box",
      answer: "7",
      hint: "Substitute $x=4$.",
      explanation: "$f(4)=3(4)-5=7$.",
    },
    {
      id: "domain-guided-2",
      prompt: "Complete the substitution:",
      latex: "f(x)=x^2+1, \\quad f(x+1)=(x+1)^2+\\Box",
      answer: "1",
      hint: "Replace $x$ with $x+1$, then keep the constant term.",
      explanation: "$f(x+1)=(x+1)^2+1$.",
    },
    {
      id: "domain-guided-3",
      prompt: "Choose the correct domain restriction.",
      latex: "f(x)=\\sqrt{x-4}",
      answer: "B",
      choices: [
        { label: "A", text: "$x\\le 4$" },
        { label: "B", text: "$x\\ge 4$" },
        { label: "C", text: "$x\\ne 4$" },
      ],
      hint: "The expression inside the square root must be at least zero.",
      explanation: "$x-4\\ge 0$, so $x\\ge 4$.",
    },
    {
      id: "domain-guided-4",
      prompt: "Choose the correct range.",
      latex: "f(x)=(x+2)^2-3",
      answer: "A",
      choices: [
        { label: "A", text: "$y\\ge -3$" },
        { label: "B", text: "$y\\le -3$" },
        { label: "C", text: "$x\\ge -3$" },
      ],
      hint: "This is an upward-opening parabola with minimum value $-3$.",
      explanation: "The range is $y\\ge -3$.",
    },
  ],

  independentPractice: [
    {
      id: "domain-ind-1",
      prompt: "Evaluate:",
      latex: "g(x)=x^2-4x, \\quad g(5)",
      answer: "5",
      hint: "Substitute $x=5$.",
      explanation: "$g(5)=25-20=5$.",
    },
    {
      id: "domain-ind-2",
      prompt: "Find:",
      latex: "f(x)=2x+3, \\quad f(x+2)",
      answer: "2x+7",
      acceptedAnswers: ["2x + 7"],
      hint: "Replace $x$ with $x+2$.",
      explanation: "$f(x+2)=2(x+2)+3=2x+7$.",
    },
    {
      id: "domain-ind-3",
      prompt: "Choose the correct domain.",
      latex: "h(x)=\\frac{1}{x-6}",
      answer: "C",
      choices: [
        { label: "A", text: "$x>6$" },
        { label: "B", text: "$x<6$" },
        { label: "C", text: "$x\\ne 6$" },
      ],
      hint: "A denominator cannot be zero.",
      explanation: "Since $x-6\\ne 0$, the domain is $x\\ne 6$.",
    },
    {
      id: "domain-ind-4",
      prompt: "Choose the correct domain.",
      latex: "p(x)=\\sqrt{9-x}",
      answer: "A",
      choices: [
        { label: "A", text: "$x\\le 9$" },
        { label: "B", text: "$x\\ge 9$" },
        { label: "C", text: "$x\\ne 9$" },
      ],
      hint: "Require $9-x\\ge 0$.",
      explanation: "$9-x\\ge 0$ gives $x\\le 9$.",
    },
    {
      id: "domain-ind-5",
      prompt: "A model gives the height of a ball after $t$ seconds. Choose the sensible contextual domain.",
      latex: "h(t)=-5t^2+20t+1",
      answer: "B",
      choices: [
        { label: "A", text: "$t<0$ only" },
        { label: "B", text: "$t\\ge 0$ while the ball is in the air" },
        { label: "C", text: "all negative values of $t$" },
      ],
      hint: "Time after launch is not negative.",
      explanation: "A contextual time domain starts at $t=0$ and ends when the model stops applying.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Confusing domain and range.",
      fix: "Domain is input values. Range is output values.",
    },
    {
      mistake: "Only substituting into one occurrence of x.",
      fix: "For $f(x+2)$, replace every $x$ in the function with $x+2$.",
    },
    {
      mistake: "Forgetting square root restrictions.",
      fix: "Set the expression inside the square root greater than or equal to zero.",
    },
    {
      mistake: "Forgetting denominator restrictions.",
      fix: "Set the denominator not equal to zero.",
    },
  ],

  masteryQuiz: [
    {
      id: "domain-mastery-1",
      prompt: "Evaluate:",
      latex: "f(x)=2x^2-3, \\quad f(2)",
      answer: "5",
      hint: "Substitute $x=2$.",
      explanation: "$f(2)=2(2)^2-3=5$.",
    },
    {
      id: "domain-mastery-2",
      prompt: "Find:",
      latex: "f(x)=x^2+4x, \\quad f(x+1)",
      answer: "x^2+6x+5",
      acceptedAnswers: ["x^2 + 6x + 5"],
      hint: "Substitute $x+1$ for every $x$.",
      explanation: "$f(x+1)=(x+1)^2+4(x+1)=x^2+6x+5$.",
    },
    {
      id: "domain-mastery-3",
      prompt: "Choose the correct meaning of domain.",
      latex: "\\text{Domain}",
      answer: "A",
      choices: [
        { label: "A", text: "allowed input values" },
        { label: "B", text: "output values produced" },
        { label: "C", text: "the y-intercept only" },
      ],
      hint: "Domain is about inputs.",
      explanation: "The domain is the set of allowed input values.",
    },
    {
      id: "domain-mastery-4",
      prompt: "Choose the correct domain.",
      latex: "f(x)=\\sqrt{x+2}",
      answer: "B",
      choices: [
        { label: "A", text: "$x\\le -2$" },
        { label: "B", text: "$x\\ge -2$" },
        { label: "C", text: "$x\\ne -2$" },
      ],
      hint: "Require $x+2\\ge 0$.",
      explanation: "$x+2\\ge 0$ gives $x\\ge -2$.",
    },
    {
      id: "domain-mastery-5",
      prompt: "Choose the correct domain restriction.",
      latex: "f(x)=\\frac{4}{x+1}",
      answer: "C",
      choices: [
        { label: "A", text: "$x>-1$" },
        { label: "B", text: "$x<-1$" },
        { label: "C", text: "$x\\ne -1$" },
      ],
      hint: "The denominator cannot be zero.",
      explanation: "$x+1\\ne 0$, so $x\\ne -1$.",
    },
    {
      id: "domain-mastery-6",
      prompt: "Choose the correct range.",
      latex: "f(x)=(x-4)^2+6",
      answer: "A",
      choices: [
        { label: "A", text: "$y\\ge 6$" },
        { label: "B", text: "$y\\le 6$" },
        { label: "C", text: "$x\\ge 6$" },
      ],
      hint: "The squared term is never negative.",
      explanation: "The minimum output is $6$, so the range is $y\\ge 6$.",
    },
    {
      id: "domain-mastery-7",
      prompt: "Choose the correct range.",
      latex: "f(x)=-(x+1)^2+3",
      answer: "B",
      choices: [
        { label: "A", text: "$y\\ge 3$" },
        { label: "B", text: "$y\\le 3$" },
        { label: "C", text: "$x\\le 3$" },
      ],
      hint: "This parabola opens downward.",
      explanation: "The maximum output is $3$, so the range is $y\\le 3$.",
    },
    {
      id: "domain-mastery-8",
      prompt: "Find the restricted value that must be excluded from the domain.",
      latex: "f(x)=\\frac{2x}{x-5}",
      answer: "5",
      hint: "Set the denominator equal to zero.",
      explanation: "$x-5=0$, so $x=5$ must be excluded.",
    },
    {
      id: "domain-mastery-9",
      prompt: "A cost model uses $n$ items. Choose the most sensible domain type.",
      latex: "C(n)=3n+20",
      answer: "B",
      choices: [
        { label: "A", text: "all real numbers" },
        { label: "B", text: "non-negative whole numbers" },
        { label: "C", text: "negative fractions only" },
      ],
      hint: "A number of items cannot be negative or fractional in this context.",
      explanation: "The domain should be non-negative whole numbers.",
    },
    {
      id: "domain-mastery-10",
      prompt: "Choose the correct statement.",
      latex: "f(4)=11",
      answer: "A",
      choices: [
        { label: "A", text: "When the input is 4, the output is 11." },
        { label: "B", text: "When the input is 11, the output is 4." },
        { label: "C", text: "The domain is only 11." },
      ],
      hint: "$f(4)$ is the output produced by input $4$.",
      explanation: "$f(4)=11$ means input $4$ produces output $11$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const graphTransformationsLesson: ExplicitLesson = {
  id: "graph-transformations",
  slug: "graph-transformations",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Graph Transformations",
  description:
    "Describe and interpret translations, reflections, and dilations of graphs using function notation.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Graph Transformations",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how changes to a function rule transform the graph of the function.",

  successCriteria: [
    "Describe vertical translations from $y=f(x)+a$.",
    "Describe horizontal translations from $y=f(x-a)$.",
    "Identify vertical dilations and reflections from $y=af(x)$.",
    "Identify horizontal dilations and reflections from $y=f(ax)$.",
    "Describe combined transformations clearly and avoid direction errors.",
  ],

  teaching: {
    paragraphs: [
      "A graph transformation moves or changes the graph of a function while keeping a connection to the original graph.",
      "Adding outside the function shifts the graph vertically. For example, $y=f(x)+5$ shifts the graph up 5 units.",
      "Changing the input shifts the graph horizontally. The expression $f(x-3)$ shifts the graph right 3 units.",
      "A coefficient outside the function changes the vertical scale. A negative coefficient outside reflects the graph in the x-axis.",
      "A coefficient inside the function changes the horizontal scale. This is often more fragile because the horizontal effect works in the opposite way students expect.",
      "When several transformations occur together, describe each feature carefully and connect it back to the original graph.",
    ],
    latexBlocks: [
      "y=f(x)+a \\quad \\Rightarrow \\quad \\text{vertical shift}",
      "y=f(x-a) \\quad \\Rightarrow \\quad \\text{shift right }a",
      "y=af(x) \\quad \\Rightarrow \\quad \\text{vertical dilation by factor }|a|",
      "y=f(ax) \\quad \\Rightarrow \\quad \\text{horizontal dilation by factor }\\frac{1}{|a|}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Translate a parabola",
      questionLatex:
        "y=x^2 \\quad \\longrightarrow \\quad y=(x-3)^2+5",
      steps: [
        {
          explanation: "The $x-3$ inside the brackets shifts the graph horizontally.",
          latex: "x-3 \\quad \\Rightarrow \\quad \\text{right }3",
        },
        {
          explanation: "The $+5$ outside the square shifts the graph vertically.",
          latex: "+5 \\quad \\Rightarrow \\quad \\text{up }5",
        },
        {
          explanation: "State the transformations clearly.",
          latex: "\\text{right }3, \\quad \\text{up }5",
        },
      ],
      finalAnswerLatex: "\\text{Translate right }3\\text{ units and up }5\\text{ units.}",
    },
    {
      title: "Worked example 2: Reflection, stretch, and translations",
      questionLatex:
        "y=x^2 \\quad \\longrightarrow \\quad y=-2(x+1)^2-4",
      steps: [
        {
          explanation: "The $x+1$ shifts the graph left 1.",
          latex: "x+1=x-(-1) \\quad \\Rightarrow \\quad \\text{left }1",
        },
        {
          explanation: "The coefficient $-2$ outside creates a reflection and vertical dilation.",
          latex: "-2 \\quad \\Rightarrow \\quad \\text{reflect in x-axis and stretch vertically by }2",
        },
        {
          explanation: "The $-4$ shifts the graph down 4.",
          latex: "-4 \\quad \\Rightarrow \\quad \\text{down }4",
        },
      ],
      finalAnswerLatex:
        "\\text{Left }1, \\text{ reflected in the x-axis, vertically stretched by }2, \\text{ down }4.",
    },
    {
      title: "Worked example 3: Match a transformation",
      questionLatex: "y=f(x-2)-1",
      steps: [
        {
          explanation: "The input change $x-2$ moves the graph right 2.",
          latex: "f(x-2) \\Rightarrow \\text{right }2",
        },
        {
          explanation: "The outside change $-1$ moves the graph down 1.",
          latex: "-1 \\Rightarrow \\text{down }1",
        },
      ],
      finalAnswerLatex: "\\text{right }2, \\quad \\text{down }1",
    },
  ],

  guidedPractice: [
    {
      id: "trans-guided-1",
      prompt: "Choose the correct vertical shift.",
      latex: "y=f(x)+4",
      answer: "A",
      choices: [
        { label: "A", text: "up 4" },
        { label: "B", text: "down 4" },
        { label: "C", text: "right 4" },
      ],
      hint: "The $+4$ is outside the function.",
      explanation: "$y=f(x)+4$ shifts the graph up 4.",
    },
    {
      id: "trans-guided-2",
      prompt: "Find the horizontal shift amount.",
      latex: "y=f(x-6)",
      answer: "6",
      hint: "$f(x-6)$ shifts the graph right 6.",
      explanation: "The shift amount is $6$ units to the right.",
    },
    {
      id: "trans-guided-3",
      prompt: "Choose the correct description.",
      latex: "y=-f(x)",
      answer: "B",
      choices: [
        { label: "A", text: "reflection in the y-axis" },
        { label: "B", text: "reflection in the x-axis" },
        { label: "C", text: "shift down 1" },
      ],
      hint: "A negative outside changes the output values.",
      explanation: "$y=-f(x)$ reflects the graph in the x-axis.",
    },
    {
      id: "trans-guided-4",
      prompt: "Choose the correct transformation.",
      latex: "y=3f(x)",
      answer: "A",
      choices: [
        { label: "A", text: "vertical dilation by factor 3" },
        { label: "B", text: "horizontal dilation by factor 3" },
        { label: "C", text: "shift up 3" },
      ],
      hint: "The coefficient is outside the function.",
      explanation: "$3f(x)$ multiplies all output values by 3.",
    },
  ],

  independentPractice: [
    {
      id: "trans-ind-1",
      prompt: "Choose the correct description.",
      latex: "y=(x-4)^2",
      answer: "A",
      choices: [
        { label: "A", text: "shift $y=x^2$ right 4" },
        { label: "B", text: "shift $y=x^2$ left 4" },
        { label: "C", text: "shift $y=x^2$ up 4" },
      ],
      hint: "$x-4$ means right 4.",
      explanation: "$y=(x-4)^2$ is $y=x^2$ shifted right 4.",
    },
    {
      id: "trans-ind-2",
      prompt: "Find the vertical shift.",
      latex: "y=(x+2)^2-7",
      answer: "-7",
      acceptedAnswers: ["down 7"],
      hint: "Look outside the squared bracket.",
      explanation: "The graph shifts down 7 units.",
    },
    {
      id: "trans-ind-3",
      prompt: "Choose the correct description.",
      latex: "y=-3f(x)",
      answer: "C",
      choices: [
        { label: "A", text: "shift left 3" },
        { label: "B", text: "horizontal dilation by factor 3 only" },
        { label: "C", text: "reflect in x-axis and vertically stretch by 3" },
      ],
      hint: "The negative and 3 are outside the function.",
      explanation: "$y=-3f(x)$ reflects in the x-axis and vertically stretches by factor 3.",
    },
    {
      id: "trans-ind-4",
      prompt: "Choose the correct transformation.",
      latex: "y=f(2x)",
      answer: "B",
      choices: [
        { label: "A", text: "horizontal dilation by factor 2" },
        { label: "B", text: "horizontal dilation by factor $\\frac{1}{2}$" },
        { label: "C", text: "vertical dilation by factor 2" },
      ],
      hint: "Inside coefficients affect horizontal scale by the reciprocal factor.",
      explanation: "$f(2x)$ gives a horizontal dilation by factor $\\frac{1}{2}$.",
    },
    {
      id: "trans-ind-5",
      prompt: "Choose the correct combined description.",
      latex: "y=2(x-1)^2+3",
      answer: "A",
      choices: [
        { label: "A", text: "right 1, vertical stretch by 2, up 3" },
        { label: "B", text: "left 1, vertical stretch by 2, up 3" },
        { label: "C", text: "right 1, horizontal stretch by 2, down 3" },
      ],
      hint: "Read the bracket, outside coefficient, and outside constant separately.",
      explanation: "The graph shifts right 1, stretches vertically by 2, and shifts up 3.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Thinking $f(x-3)$ shifts left 3.",
      fix: "$f(x-3)$ shifts the graph right 3.",
    },
    {
      mistake: "Missing the reflection from a negative outside.",
      fix: "$-f(x)$ reflects the graph in the x-axis.",
    },
    {
      mistake: "Calling $2f(x)$ a horizontal stretch.",
      fix: "A coefficient outside the function changes vertical scale.",
    },
    {
      mistake: "Forgetting that inside coefficients affect horizontal scale by the reciprocal.",
      fix: "$f(2x)$ gives a horizontal dilation by factor $\\frac{1}{2}$.",
    },
  ],

  masteryQuiz: [
    {
      id: "trans-mastery-1",
      prompt: "Choose the correct transformation.",
      latex: "y=f(x)-5",
      answer: "B",
      choices: [
        { label: "A", text: "up 5" },
        { label: "B", text: "down 5" },
        { label: "C", text: "right 5" },
      ],
      hint: "The change is outside the function.",
      explanation: "$f(x)-5$ shifts the graph down 5.",
    },
    {
      id: "trans-mastery-2",
      prompt: "Choose the correct transformation.",
      latex: "y=f(x+2)",
      answer: "A",
      choices: [
        { label: "A", text: "left 2" },
        { label: "B", text: "right 2" },
        { label: "C", text: "up 2" },
      ],
      hint: "$x+2$ shifts left 2.",
      explanation: "$f(x+2)$ shifts the graph left 2.",
    },
    {
      id: "trans-mastery-3",
      prompt: "Find the horizontal shift amount.",
      latex: "y=(x-8)^2",
      answer: "8",
      hint: "The graph shifts right 8.",
      explanation: "The horizontal shift amount is 8 units.",
    },
    {
      id: "trans-mastery-4",
      prompt: "Find the vertical shift.",
      latex: "y=(x+1)^2+6",
      answer: "6",
      acceptedAnswers: ["up 6"],
      hint: "Look outside the squared bracket.",
      explanation: "The graph shifts up 6 units.",
    },
    {
      id: "trans-mastery-5",
      prompt: "Choose the correct description.",
      latex: "y=-f(x)",
      answer: "A",
      choices: [
        { label: "A", text: "reflection in the x-axis" },
        { label: "B", text: "reflection in the y-axis" },
        { label: "C", text: "shift down 1" },
      ],
      hint: "The negative sign is outside the function.",
      explanation: "$y=-f(x)$ reflects in the x-axis.",
    },
    {
      id: "trans-mastery-6",
      prompt: "Choose the correct description.",
      latex: "y=f(-x)",
      answer: "B",
      choices: [
        { label: "A", text: "reflection in the x-axis" },
        { label: "B", text: "reflection in the y-axis" },
        { label: "C", text: "shift left 1" },
      ],
      hint: "A negative inside changes input values.",
      explanation: "$y=f(-x)$ reflects in the y-axis.",
    },
    {
      id: "trans-mastery-7",
      prompt: "Choose the correct transformation.",
      latex: "y=\\frac{1}{2}f(x)",
      answer: "C",
      choices: [
        { label: "A", text: "horizontal dilation by factor $\\frac{1}{2}$" },
        { label: "B", text: "shift down $\\frac{1}{2}$" },
        { label: "C", text: "vertical dilation by factor $\\frac{1}{2}$" },
      ],
      hint: "The coefficient is outside the function.",
      explanation: "The output values are multiplied by $\\frac{1}{2}$.",
    },
    {
      id: "trans-mastery-8",
      prompt: "Choose the correct transformation.",
      latex: "y=f\\left(\\frac{x}{3}\\right)",
      answer: "A",
      choices: [
        { label: "A", text: "horizontal dilation by factor 3" },
        { label: "B", text: "horizontal dilation by factor $\\frac{1}{3}$" },
        { label: "C", text: "vertical dilation by factor 3" },
      ],
      hint: "Inside coefficient is $\\frac{1}{3}$, so the horizontal factor is 3.",
      explanation: "$f\\left(\\frac{x}{3}\\right)$ stretches horizontally by factor 3.",
    },
    {
      id: "trans-mastery-9",
      prompt: "Choose the correct combined description.",
      latex: "y=-2(x-3)^2+5",
      answer: "B",
      choices: [
        { label: "A", text: "left 3, reflect in x-axis, vertical stretch by 2, up 5" },
        { label: "B", text: "right 3, reflect in x-axis, vertical stretch by 2, up 5" },
        { label: "C", text: "right 3, reflect in y-axis, vertical stretch by 2, down 5" },
      ],
      hint: "$x-3$ means right 3; $-2$ is outside.",
      explanation: "The graph shifts right 3, reflects in the x-axis, stretches vertically by 2, and shifts up 5.",
    },
    {
      id: "trans-mastery-10",
      prompt: "Choose the statement that avoids the common horizontal-shift trap.",
      latex: "y=f(x-4)",
      answer: "C",
      choices: [
        { label: "A", text: "The graph shifts left 4 because of the minus sign." },
        { label: "B", text: "The graph shifts down 4." },
        { label: "C", text: "The graph shifts right 4." },
      ],
      hint: "$f(x-a)$ shifts right $a$.",
      explanation: "$f(x-4)$ shifts the graph right 4.",
    },
  ],

  masteryPassMark: 0.8,
};

export const functionsGraphingTechniquesOutline: LessonOutlineItem[] = [
  {
    id: "domain-range-function-notation",
    slug: "domain-range-function-notation",
    title: "Domain, range, and function notation",
    description:
      "Use function notation and identify domain and range from equations, graphs, and contexts.",
    status: "active",
  },
  {
    id: "graph-transformations",
    slug: "graph-transformations",
    title: "Graph transformations",
    description:
      "Describe translations, reflections, and dilations using function notation.",
    status: "active",
  },
  {
    id: "reflections-stretches-translations",
    slug: "reflections-stretches-translations",
    title: "Reflections, Stretches, and Translations",
    description:
      "Combine reflections, dilations, and translations when sketching transformed functions.",
    status: "coming-soon",
  },
  {
    id: "intercepts-key-features",
    slug: "intercepts-key-features",
    title: "Intercepts and Key Features",
    description:
      "Identify intercepts, turning points, symmetry, and other features needed for accurate graph sketches.",
    status: "coming-soon",
  },
  {
    id: "asymptotes-reciprocal-graphs",
    slug: "asymptotes-reciprocal-graphs",
    title: "Asymptotes and Reciprocal-Style Graphs",
    description:
      "Recognise and sketch graphs with vertical and horizontal asymptotes.",
    status: "coming-soon",
  },
  {
    id: "solving-equations-inequalities-graphically",
    slug: "solving-equations-inequalities-graphically",
    title: "Solving Equations and Inequalities Graphically",
    description:
      "Use graphs to solve equations, inequalities, and compare functions.",
    status: "coming-soon",
  },
  {
    id: "modelling-with-functions",
    slug: "modelling-with-functions",
    title: "Modelling with Functions",
    description:
      "Use functions and graphs to model and interpret real-world relationships.",
    status: "coming-soon",
  },
  {
    id: "mixed-functions-graphing-exam-practice",
    slug: "mixed-functions-graphing-exam-practice",
    title: "Mixed Functions and Graphing Exam Practice",
    description:
      "Practise mixed exam-style questions involving function notation, transformations, features, asymptotes, and graphical solving.",
    status: "coming-soon",
  },
];

export const functionsGraphingTechniquesLessons = [
  domainRangeFunctionNotationLesson,
  graphTransformationsLesson,
];
