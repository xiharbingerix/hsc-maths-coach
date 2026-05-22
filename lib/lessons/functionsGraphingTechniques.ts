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

export const reflectionsStretchesTranslationsLesson: ExplicitLesson = {
  id: "reflections-stretches-translations",
  slug: "reflections-stretches-translations",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Reflections, Stretches, and Translations",
  description:
    "Combine reflections, dilations, and translations when describing transformed functions.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Reflections, Stretches, and Translations",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to identify and describe combined transformations of functions clearly.",

  successCriteria: [
    "Identify reflections caused by negative signs inside or outside the function.",
    "Identify vertical dilations from coefficients outside the function.",
    "Identify horizontal dilations from coefficients inside the function.",
    "Describe vertical and horizontal translations accurately.",
    "Avoid common sign and scale-factor traps when transformations are combined.",
  ],

  teaching: {
    paragraphs: [
      "Transformations can be combined in a single function rule.",
      "A negative outside the function, such as $-f(x)$, reflects the graph in the x-axis because the output values change sign.",
      "A negative inside the function, such as $f(-x)$, reflects the graph in the y-axis because the input values change sign.",
      "A coefficient outside the function causes a vertical dilation. For example, $2f(x)$ doubles the output values.",
      "A coefficient inside the function causes a horizontal dilation. For example, $f(2x)$ gives a horizontal dilation by factor $\\frac{1}{2}$.",
      "Adding outside the function shifts the graph up or down. Adding or subtracting inside the function shifts the graph left or right.",
      "When describing a combined transformation, identify the inside changes, outside scale or reflection, and outside translation carefully.",
    ],
    latexBlocks: [
      "-f(x) \\quad \\Rightarrow \\quad \\text{reflection in the x-axis}",
      "f(-x) \\quad \\Rightarrow \\quad \\text{reflection in the y-axis}",
      "af(x) \\quad \\Rightarrow \\quad \\text{vertical dilation by factor }|a|",
      "f(ax) \\quad \\Rightarrow \\quad \\text{horizontal dilation by factor }\\frac{1}{|a|}",
      "f(x-a)+b \\quad \\Rightarrow \\quad \\text{right }a\\text{ and up }b",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Combined outside and inside transformations",
      questionLatex: "y=f(x) \\quad \\longrightarrow \\quad y=-2f(x-3)+5",
      steps: [
        {
          explanation: "The input $x-3$ shifts the graph right 3.",
          latex: "f(x-3) \\quad \\Rightarrow \\quad \\text{right }3",
        },
        {
          explanation:
            "The coefficient $-2$ outside reflects in the x-axis and vertically stretches by factor 2.",
          latex:
            "-2f(x) \\quad \\Rightarrow \\quad \\text{reflect in x-axis and vertical dilation by }2",
        },
        {
          explanation: "The $+5$ outside shifts the graph up 5.",
          latex: "+5 \\quad \\Rightarrow \\quad \\text{up }5",
        },
      ],
      finalAnswerLatex:
        "\\text{Right }3, \\text{ reflect in the x-axis, vertically stretch by }2, \\text{ then up }5.",
    },
    {
      title: "Worked example 2: Inside reflection and horizontal dilation",
      questionLatex: "y=f(x) \\quad \\longrightarrow \\quad y=f(-2x)+4",
      steps: [
        {
          explanation: "The negative inside reflects the graph in the y-axis.",
          latex: "f(-x) \\quad \\Rightarrow \\quad \\text{reflection in the y-axis}",
        },
        {
          explanation:
            "The coefficient 2 inside gives a horizontal dilation by reciprocal factor.",
          latex:
            "f(2x) \\quad \\Rightarrow \\quad \\text{horizontal dilation by factor }\\frac{1}{2}",
        },
        {
          explanation: "The $+4$ outside shifts the graph up 4.",
          latex: "+4 \\quad \\Rightarrow \\quad \\text{up }4",
        },
      ],
      finalAnswerLatex:
        "\\text{Reflect in the y-axis, horizontally dilate by factor }\\frac{1}{2}, \\text{ then up }4.",
    },
  ],

  guidedPractice: [
    {
      id: "rst-guided-1",
      prompt: "Choose the reflection.",
      latex: "y=-f(x)",
      answer: "A",
      choices: [
        { label: "A", text: "reflection in the x-axis" },
        { label: "B", text: "reflection in the y-axis" },
        { label: "C", text: "shift down 1" },
      ],
      hint: "The negative sign is outside the function.",
      explanation: "$-f(x)$ changes the sign of the outputs, so it reflects in the x-axis.",
    },
    {
      id: "rst-guided-2",
      prompt: "Choose the reflection.",
      latex: "y=f(-x)",
      answer: "B",
      choices: [
        { label: "A", text: "reflection in the x-axis" },
        { label: "B", text: "reflection in the y-axis" },
        { label: "C", text: "vertical stretch by 1" },
      ],
      hint: "The negative sign is inside the function.",
      explanation: "$f(-x)$ changes the input values, so it reflects in the y-axis.",
    },
    {
      id: "rst-guided-3",
      prompt: "Find the vertical dilation factor.",
      latex: "y=4f(x)",
      answer: "4",
      hint: "The coefficient outside the function changes vertical scale.",
      explanation: "$4f(x)$ gives a vertical dilation by factor 4.",
    },
    {
      id: "rst-guided-4",
      prompt: "Choose the horizontal scale factor.",
      latex: "y=f(3x)",
      answer: "B",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$\\frac{1}{3}$" },
        { label: "C", text: "$-3$" },
      ],
      hint: "The horizontal scale factor is the reciprocal of the inside coefficient.",
      explanation: "$f(3x)$ gives a horizontal dilation by factor $\\frac{1}{3}$.",
    },
  ],

  independentPractice: [
    {
      id: "rst-ind-1",
      prompt: "Choose the correct translation.",
      latex: "y=f(x-5)",
      answer: "A",
      choices: [
        { label: "A", text: "right 5" },
        { label: "B", text: "left 5" },
        { label: "C", text: "down 5" },
      ],
      hint: "$f(x-a)$ shifts right $a$.",
      explanation: "$f(x-5)$ shifts the graph right 5.",
    },
    {
      id: "rst-ind-2",
      prompt: "Choose the correct description.",
      latex: "y=-f(x)+2",
      answer: "C",
      choices: [
        { label: "A", text: "reflect in the y-axis, then up 2" },
        { label: "B", text: "shift down 2 only" },
        { label: "C", text: "reflect in the x-axis, then up 2" },
      ],
      hint: "The negative is outside the function.",
      explanation: "$-f(x)$ reflects in the x-axis, and $+2$ shifts up 2.",
    },
    {
      id: "rst-ind-3",
      prompt: "Choose the correct description.",
      latex: "y=f(-x)-3",
      answer: "B",
      choices: [
        { label: "A", text: "reflect in the x-axis, then down 3" },
        { label: "B", text: "reflect in the y-axis, then down 3" },
        { label: "C", text: "shift right 3" },
      ],
      hint: "The negative is inside the function.",
      explanation: "$f(-x)$ reflects in the y-axis, and $-3$ shifts down 3.",
    },
    {
      id: "rst-ind-4",
      prompt: "Find the vertical dilation factor.",
      latex: "y=\\frac{1}{2}f(x)",
      answer: "1/2",
      acceptedAnswers: ["0.5", "\\frac{1}{2}"],
      hint: "The coefficient outside the function is the vertical scale factor.",
      explanation: "The vertical dilation factor is $\\frac{1}{2}$.",
    },
    {
      id: "rst-ind-5",
      prompt: "Choose the correct mixed transformation.",
      latex: "y=3f(x+2)-1",
      answer: "A",
      choices: [
        { label: "A", text: "left 2, vertical stretch by 3, down 1" },
        { label: "B", text: "right 2, vertical stretch by 3, down 1" },
        { label: "C", text: "left 2, horizontal stretch by 3, up 1" },
      ],
      hint: "$x+2$ shifts left 2; the 3 is outside.",
      explanation: "The graph shifts left 2, stretches vertically by 3, and shifts down 1.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Saying $f(x-3)$ moves left instead of right.",
      fix: "$f(x-3)$ shifts the graph right 3.",
    },
    {
      mistake: "Confusing reflection in the x-axis and y-axis.",
      fix: "A negative outside reflects in the x-axis. A negative inside reflects in the y-axis.",
    },
    {
      mistake: "Confusing vertical and horizontal scale factors.",
      fix: "Outside coefficients affect vertical scale; inside coefficients affect horizontal scale.",
    },
    {
      mistake: "Ignoring transformation order.",
      fix: "Work through inside changes, reflections and dilations, then translations so no feature is missed.",
    },
  ],

  masteryQuiz: [
    {
      id: "rst-mastery-1",
      prompt: "Choose the transformation.",
      latex: "y=f(x)+7",
      answer: "A",
      choices: [
        { label: "A", text: "up 7" },
        { label: "B", text: "down 7" },
        { label: "C", text: "right 7" },
      ],
      hint: "The change is outside the function.",
      explanation: "$f(x)+7$ shifts the graph up 7.",
    },
    {
      id: "rst-mastery-2",
      prompt: "Choose the transformation.",
      latex: "y=f(-x)",
      answer: "B",
      choices: [
        { label: "A", text: "reflection in the x-axis" },
        { label: "B", text: "reflection in the y-axis" },
        { label: "C", text: "shift left 1" },
      ],
      hint: "The negative is inside the function.",
      explanation: "$f(-x)$ reflects in the y-axis.",
    },
    {
      id: "rst-mastery-3",
      prompt: "Find the vertical dilation factor.",
      latex: "y=5f(x)",
      answer: "5",
      hint: "The coefficient outside is the vertical dilation factor.",
      explanation: "$5f(x)$ gives a vertical dilation by factor 5.",
    },
    {
      id: "rst-mastery-4",
      prompt: "Choose the correct combined description.",
      latex: "y=-f(x-2)",
      answer: "C",
      choices: [
        { label: "A", text: "left 2 and reflect in y-axis" },
        { label: "B", text: "right 2 only" },
        { label: "C", text: "right 2 and reflect in x-axis" },
      ],
      hint: "$x-2$ shifts right 2; the negative outside reflects in the x-axis.",
      explanation: "$-f(x-2)$ shifts right 2 and reflects in the x-axis.",
    },
    {
      id: "rst-mastery-5",
      prompt: "Choose the correct combined description.",
      latex: "y=f(-2x)+1",
      answer: "A",
      choices: [
        { label: "A", text: "reflect in y-axis, horizontal dilation by $\\frac{1}{2}$, up 1" },
        { label: "B", text: "reflect in x-axis, vertical dilation by 2, up 1" },
        { label: "C", text: "shift right 2, up 1" },
      ],
      hint: "The negative and 2 are inside the function.",
      explanation: "$f(-2x)+1$ reflects in the y-axis, horizontally dilates by factor $\\frac{1}{2}$, and shifts up 1.",
    },
    {
      id: "rst-mastery-6",
      prompt: "Choose the correct combined description.",
      latex: "y=2f(x+4)-3",
      answer: "B",
      choices: [
        { label: "A", text: "right 4, vertical stretch by 2, down 3" },
        { label: "B", text: "left 4, vertical stretch by 2, down 3" },
        { label: "C", text: "left 4, horizontal stretch by 2, up 3" },
      ],
      hint: "$x+4$ shifts left 4.",
      explanation: "The graph shifts left 4, stretches vertically by 2, and shifts down 3.",
    },
    {
      id: "rst-mastery-7",
      prompt: "Choose the statement that avoids the sign trap.",
      latex: "y=f(x-6)",
      answer: "B",
      choices: [
        { label: "A", text: "The graph shifts left 6." },
        { label: "B", text: "The graph shifts right 6." },
        { label: "C", text: "The graph shifts down 6." },
      ],
      hint: "$f(x-a)$ shifts right $a$.",
      explanation: "$f(x-6)$ shifts right 6.",
    },
    {
      id: "rst-mastery-8",
      prompt: "Choose the correct scale factor.",
      latex: "y=f\\left(\\frac{x}{4}\\right)",
      answer: "C",
      choices: [
        { label: "A", text: "vertical dilation by factor 4" },
        { label: "B", text: "horizontal dilation by factor $\\frac{1}{4}$" },
        { label: "C", text: "horizontal dilation by factor 4" },
      ],
      hint: "Inside coefficient $\\frac{1}{4}$ gives horizontal factor 4.",
      explanation: "$f\\left(\\frac{x}{4}\\right)$ gives a horizontal dilation by factor 4.",
    },
    {
      id: "rst-mastery-9",
      prompt: "Choose the correct mixed transformation.",
      latex: "y=-3f(x+1)+2",
      answer: "A",
      choices: [
        { label: "A", text: "left 1, reflect in x-axis, vertical stretch by 3, up 2" },
        { label: "B", text: "right 1, reflect in y-axis, vertical stretch by 3, up 2" },
        { label: "C", text: "left 1, reflect in y-axis, horizontal stretch by 3, down 2" },
      ],
      hint: "The negative and 3 are outside the function.",
      explanation: "The graph shifts left 1, reflects in the x-axis, stretches vertically by 3, and shifts up 2.",
    },
    {
      id: "rst-mastery-10",
      prompt: "Choose the correct mixed transformation.",
      latex: "y=f(-x+2)",
      answer: "B",
      choices: [
        { label: "A", text: "right 2 only" },
        { label: "B", text: "reflect in the y-axis and shift right 2" },
        { label: "C", text: "reflect in the x-axis and shift up 2" },
      ],
      hint: "$-x+2=-(x-2)$.",
      explanation: "$f(-x+2)=f(-(x-2))$, so it reflects in the y-axis and shifts right 2.",
    },
  ],

  masteryPassMark: 0.8,
};

export const interceptsKeyFeaturesLesson: ExplicitLesson = {
  id: "intercepts-key-features",
  slug: "intercepts-key-features",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Intercepts and Key Features",
  description:
    "Find intercepts, vertices, axes of symmetry, opening direction, and other key features for graph sketches.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Intercepts and Key Features",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to find intercepts and key features that support accurate graph sketches.",

  successCriteria: [
    "Find x-intercepts by setting $y=0$.",
    "Find y-intercepts by setting $x=0$.",
    "Identify the vertex and axis of symmetry from vertex form.",
    "Recognise whether a quadratic opens upward or downward.",
    "Use key features to describe and sketch graphs efficiently.",
  ],

  teaching: {
    paragraphs: [
      "Key features are the important points and properties that help you sketch or interpret a graph without plotting many points.",
      "An x-intercept occurs where the graph crosses the x-axis, so set $y=0$ and solve for $x$.",
      "A y-intercept occurs where the graph crosses the y-axis, so set $x=0$ and calculate $y$.",
      "For a quadratic in vertex form $y=a(x-h)^2+k$, the vertex is $(h,k)$ and the axis of symmetry is $x=h$.",
      "The sign of the leading coefficient tells you the opening direction. A positive quadratic opens upward and a negative quadratic opens downward.",
      "Intercepts, vertex, symmetry, and opening direction together give a strong sketch without needing a table of many values.",
    ],
    latexBlocks: [
      "x\\text{-intercepts: set }y=0",
      "y\\text{-intercept: set }x=0",
      "y=a(x-h)^2+k \\quad \\Rightarrow \\quad \\text{vertex }(h,k)",
      "\\text{axis of symmetry: }x=h",
      "a>0 \\Rightarrow \\text{opens up}, \\quad a<0 \\Rightarrow \\text{opens down}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Key features from vertex form",
      questionLatex: "y=(x-2)^2-9",
      steps: [
        {
          explanation: "Find the x-intercepts by setting $y=0$.",
          latex: "0=(x-2)^2-9",
        },
        {
          explanation: "Solve for $x$.",
          latex: "(x-2)^2=9 \\Rightarrow x-2=\\pm 3 \\Rightarrow x=-1,5",
        },
        {
          explanation: "Find the y-intercept by setting $x=0$.",
          latex: "y=(0-2)^2-9=4-9=-5",
        },
        {
          explanation: "Read the vertex and axis of symmetry from vertex form.",
          latex: "\\text{vertex }(2,-9), \\quad \\text{axis }x=2",
        },
      ],
      finalAnswerLatex:
        "x\\text{-intercepts }(-1,0),(5,0), \\quad y\\text{-intercept }(0,-5), \\quad \\text{vertex }(2,-9), \\quad \\text{axis }x=2",
    },
    {
      title: "Worked example 2: Key features from expanded form",
      questionLatex: "y=-x^2+4x+5",
      steps: [
        {
          explanation: "Find the x-intercepts by setting $y=0$.",
          latex: "0=-x^2+4x+5",
        },
        {
          explanation: "Factorise and solve.",
          latex: "0=-(x^2-4x-5)=-(x-5)(x+1) \\Rightarrow x=-1,5",
        },
        {
          explanation: "Find the y-intercept by setting $x=0$.",
          latex: "y=5",
        },
        {
          explanation: "Find the axis of symmetry halfway between the x-intercepts.",
          latex: "x=\\frac{-1+5}{2}=2",
        },
        {
          explanation: "Substitute $x=2$ to find the vertex.",
          latex: "y=-(2)^2+4(2)+5=9 \\Rightarrow (2,9)",
        },
      ],
      finalAnswerLatex:
        "x\\text{-intercepts }(-1,0),(5,0), \\quad y\\text{-intercept }(0,5), \\quad \\text{vertex }(2,9), \\quad \\text{axis }x=2",
    },
  ],

  guidedPractice: [
    {
      id: "features-guided-1",
      prompt: "Find the x-intercepts:",
      latex: "y=(x-3)(x+2)",
      answer: "-2,3",
      acceptedAnswers: ["3,-2", "x=-2,3", "x=3,-2", "-2 and 3", "3 and -2"],
      hint: "Set $y=0$ and use the factors.",
      explanation: "$0=(x-3)(x+2)$ gives $x=3$ or $x=-2$.",
    },
    {
      id: "features-guided-2",
      prompt: "Find the y-intercept value:",
      latex: "y=x^2-4x+7",
      answer: "7",
      hint: "Set $x=0$.",
      explanation: "When $x=0$, $y=7$.",
    },
    {
      id: "features-guided-3",
      prompt: "Choose the vertex.",
      latex: "y=(x-4)^2-6",
      answer: "B",
      choices: [
        { label: "A", text: "$(-4,-6)$" },
        { label: "B", text: "$(4,-6)$" },
        { label: "C", text: "$(4,6)$" },
      ],
      hint: "In $y=(x-h)^2+k$, the vertex is $(h,k)$.",
      explanation: "The vertex is $(4,-6)$.",
    },
    {
      id: "features-guided-4",
      prompt: "Choose the opening direction.",
      latex: "y=-2(x+1)^2+3",
      answer: "B",
      choices: [
        { label: "A", text: "opens upward" },
        { label: "B", text: "opens downward" },
      ],
      hint: "The coefficient of the squared term is negative.",
      explanation: "A negative leading coefficient means the parabola opens downward.",
    },
  ],

  independentPractice: [
    {
      id: "features-ind-1",
      prompt: "Find the x-intercepts:",
      latex: "y=(x-1)(x-5)",
      answer: "1,5",
      acceptedAnswers: ["5,1", "x=1,5", "x=5,1", "1 and 5", "5 and 1"],
      hint: "Set each factor equal to zero.",
      explanation: "The x-intercepts are $(1,0)$ and $(5,0)$.",
    },
    {
      id: "features-ind-2",
      prompt: "Find the axis of symmetry:",
      latex: "y=(x+3)^2+2",
      answer: "x=-3",
      acceptedAnswers: ["-3"],
      hint: "$x+3=x-(-3)$.",
      explanation: "The vertex is $(-3,2)$, so the axis of symmetry is $x=-3$.",
    },
    {
      id: "features-ind-3",
      prompt: "Find the y-intercept value:",
      latex: "y=x^2-6x+8",
      answer: "8",
      hint: "Set $x=0$.",
      explanation: "When $x=0$, $y=8$.",
    },
    {
      id: "features-ind-4",
      prompt: "Choose the correct key feature.",
      latex: "y=-(x-2)^2+4",
      answer: "A",
      choices: [
        { label: "A", text: "vertex $(2,4)$ and opens downward" },
        { label: "B", text: "vertex $(-2,4)$ and opens upward" },
        { label: "C", text: "vertex $(2,-4)$ and opens upward" },
      ],
      hint: "Read the vertex from vertex form and check the negative sign.",
      explanation: "The vertex is $(2,4)$ and the parabola opens downward.",
    },
    {
      id: "features-ind-5",
      prompt: "Choose the correct x-intercepts.",
      latex: "y=x^2-4x-5",
      answer: "B",
      choices: [
        { label: "A", text: "$x=1$ and $x=5$" },
        { label: "B", text: "$x=-1$ and $x=5$" },
        { label: "C", text: "$x=-5$ and $x=1$" },
      ],
      hint: "Factorise $x^2-4x-5$.",
      explanation: "$x^2-4x-5=(x-5)(x+1)$, so $x=5$ and $x=-1$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Finding the y-intercept by setting $y=0$.",
      fix: "For the y-intercept, set $x=0$.",
    },
    {
      mistake: "Finding x-intercepts by setting $x=0$.",
      fix: "For x-intercepts, set $y=0$ and solve.",
    },
    {
      mistake: "Reading $(x-h)^2$ as a shift left when it is right.",
      fix: "In $y=a(x-h)^2+k$, the vertex uses $h$, so $x-2$ gives vertex x-value 2.",
    },
    {
      mistake: "Forgetting that a negative leading coefficient opens downward.",
      fix: "If $a<0$ in $y=a(x-h)^2+k$, the parabola opens downward.",
    },
  ],

  masteryQuiz: [
    {
      id: "features-mastery-1",
      prompt: "Find the x-intercepts:",
      latex: "y=(x+4)(x-2)",
      answer: "-4,2",
      acceptedAnswers: ["2,-4", "x=-4,2", "x=2,-4", "-4 and 2", "2 and -4"],
      hint: "Set each factor equal to zero.",
      explanation: "The x-intercepts are $(-4,0)$ and $(2,0)$.",
    },
    {
      id: "features-mastery-2",
      prompt: "Find the y-intercept value:",
      latex: "y=-x^2+3x+10",
      answer: "10",
      hint: "Set $x=0$.",
      explanation: "When $x=0$, $y=10$.",
    },
    {
      id: "features-mastery-3",
      prompt: "Choose the correct x-intercepts.",
      latex: "y=x^2-9",
      answer: "A",
      choices: [
        { label: "A", text: "$x=-3$ and $x=3$" },
        { label: "B", text: "$x=0$ and $x=9$" },
        { label: "C", text: "$x=-9$ and $x=9$" },
      ],
      hint: "Use difference of two squares.",
      explanation: "$x^2-9=(x-3)(x+3)$, so $x=-3$ and $x=3$.",
    },
    {
      id: "features-mastery-4",
      prompt: "Choose the vertex.",
      latex: "y=(x-5)^2+1",
      answer: "B",
      choices: [
        { label: "A", text: "$(-5,1)$" },
        { label: "B", text: "$(5,1)$" },
        { label: "C", text: "$(5,-1)$" },
      ],
      hint: "Use $y=(x-h)^2+k$.",
      explanation: "The vertex is $(5,1)$.",
    },
    {
      id: "features-mastery-5",
      prompt: "Find the axis of symmetry:",
      latex: "y=(x-7)^2-3",
      answer: "x=7",
      acceptedAnswers: ["7"],
      hint: "The axis is $x=h$.",
      explanation: "The vertex is $(7,-3)$, so the axis is $x=7$.",
    },
    {
      id: "features-mastery-6",
      prompt: "Choose the vertex.",
      latex: "y=-(x+2)^2+6",
      answer: "A",
      choices: [
        { label: "A", text: "$(-2,6)$" },
        { label: "B", text: "$(2,6)$" },
        { label: "C", text: "$(-2,-6)$" },
      ],
      hint: "$x+2=x-(-2)$.",
      explanation: "The vertex is $(-2,6)$.",
    },
    {
      id: "features-mastery-7",
      prompt: "Choose the opening direction.",
      latex: "y=3(x-1)^2-4",
      answer: "A",
      choices: [
        { label: "A", text: "opens upward" },
        { label: "B", text: "opens downward" },
      ],
      hint: "The coefficient of the squared term is positive.",
      explanation: "Since $3>0$, the parabola opens upward.",
    },
    {
      id: "features-mastery-8",
      prompt: "Choose the correct key features.",
      latex: "y=-x^2+6x-5",
      answer: "C",
      choices: [
        { label: "A", text: "opens upward with y-intercept $-5$" },
        { label: "B", text: "opens downward with y-intercept $5$" },
        { label: "C", text: "opens downward with y-intercept $-5$" },
      ],
      hint: "Check the coefficient of $x^2$ and set $x=0$.",
      explanation: "The coefficient of $x^2$ is negative, and the y-intercept value is $-5$.",
    },
    {
      id: "features-mastery-9",
      prompt: "Choose the correct set of features.",
      latex: "y=(x-2)^2-1",
      answer: "B",
      choices: [
        { label: "A", text: "vertex $(-2,-1)$, axis $x=-2$, opens upward" },
        { label: "B", text: "vertex $(2,-1)$, axis $x=2$, opens upward" },
        { label: "C", text: "vertex $(2,1)$, axis $x=1$, opens downward" },
      ],
      hint: "Read vertex form directly.",
      explanation: "The vertex is $(2,-1)$, the axis is $x=2$, and the graph opens upward.",
    },
    {
      id: "features-mastery-10",
      prompt: "Choose the correct x-intercepts and y-intercept value.",
      latex: "y=x^2-2x-8",
      answer: "A",
      choices: [
        { label: "A", text: "$x=-2,4$ and y-intercept $-8$" },
        { label: "B", text: "$x=2,4$ and y-intercept $8$" },
        { label: "C", text: "$x=-4,2$ and y-intercept $-8$" },
      ],
      hint: "Factorise and then set $x=0$ for the y-intercept.",
      explanation: "$x^2-2x-8=(x-4)(x+2)$, so $x=4,-2$, and the y-intercept value is $-8$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const asymptotesReciprocalGraphsLesson: ExplicitLesson = {
  id: "asymptotes-reciprocal-graphs",
  slug: "asymptotes-reciprocal-graphs",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Asymptotes and Reciprocal-Style Graphs",
  description:
    "Identify vertical and horizontal asymptotes, domain, range, and transformations of reciprocal-style graphs.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Asymptotes and Reciprocal-Style Graphs",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to identify and interpret asymptotes in reciprocal-style graphs.",

  successCriteria: [
    "Explain what an asymptote represents on a reciprocal-style graph.",
    "Identify the vertical and horizontal asymptotes of $y=\\frac{a}{x-h}+k$.",
    "State the domain and range exclusions from the asymptotes.",
    "Describe transformations from the basic reciprocal graph $y=\\frac{1}{x}$.",
    "Avoid sign errors when reading $x-h$ and $+k$.",
  ],

  teaching: {
    paragraphs: [
      "An asymptote is a line that a graph approaches. In the basic reciprocal model, the graph gets closer and closer to the asymptote but does not cross it.",
      "The basic reciprocal graph $y=\\frac{1}{x}$ has vertical asymptote $x=0$ and horizontal asymptote $y=0$.",
      "For reciprocal-style graphs, vertical asymptotes often occur where the denominator is zero.",
      "Horizontal asymptotes describe the long-term behaviour of the graph as $x$ becomes very large or very negative.",
      "For $y=\\frac{a}{x-h}+k$, the vertical asymptote is $x=h$ and the horizontal asymptote is $y=k$.",
      "The domain excludes the x-value of the vertical asymptote. The range excludes the y-value of the horizontal asymptote.",
      "Transformations shift the asymptotes along with the graph, so the asymptotes are key features for sketching.",
    ],
    latexBlocks: [
      "y=\\frac{1}{x} \\quad \\Rightarrow \\quad x=0, \\; y=0",
      "y=\\frac{a}{x-h}+k",
      "\\text{vertical asymptote: }x=h",
      "\\text{horizontal asymptote: }y=k",
      "\\text{domain: }x\\ne h, \\quad \\text{range: }y\\ne k",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Asymptotes, domain, and range",
      questionLatex:
        "y=\\frac{1}{x-2}+3. \\quad \\text{Find the asymptotes, domain, and range.}",
      steps: [
        {
          explanation: "Compare the equation with $y=\\frac{a}{x-h}+k$.",
          latex: "h=2, \\quad k=3",
        },
        {
          explanation: "The vertical asymptote is $x=h$.",
          latex: "x=2",
        },
        {
          explanation: "The horizontal asymptote is $y=k$.",
          latex: "y=3",
        },
        {
          explanation: "Exclude the asymptote values from the domain and range.",
          latex: "\\text{domain }x\\ne 2, \\quad \\text{range }y\\ne 3",
        },
      ],
      finalAnswerLatex:
        "x=2, \\quad y=3, \\quad \\text{domain }x\\ne 2, \\quad \\text{range }y\\ne 3",
    },
    {
      title: "Worked example 2: Negative reciprocal transformation",
      questionLatex:
        "y=-\\frac{2}{x+1}-4. \\quad \\text{Identify the asymptotes and describe the transformation from }y=\\frac{1}{x}.",
      steps: [
        {
          explanation: "Rewrite the denominator to identify $h$.",
          latex: "x+1=x-(-1) \\quad \\Rightarrow \\quad h=-1",
        },
        {
          explanation: "Read the vertical and horizontal asymptotes.",
          latex: "x=-1, \\quad y=-4",
        },
        {
          explanation: "Use the coefficient $-2$ to describe reflection and dilation.",
          latex:
            "-2 \\quad \\Rightarrow \\quad \\text{reflection in x-axis and vertical dilation by }2",
        },
        {
          explanation: "Use $h$ and $k$ to describe translations.",
          latex: "\\text{left }1, \\quad \\text{down }4",
        },
      ],
      finalAnswerLatex:
        "x=-1, \\quad y=-4; \\quad \\text{left }1, \\text{ reflected in x-axis, vertically stretched by }2, \\text{ down }4",
    },
  ],

  guidedPractice: [
    {
      id: "asym-guided-1",
      prompt: "Identify $h$ from the denominator:",
      latex: "y=\\frac{1}{x-5}+2",
      answer: "5",
      hint: "Compare $x-5$ with $x-h$.",
      explanation: "Here $h=5$.",
    },
    {
      id: "asym-guided-2",
      prompt: "Identify $k$:",
      latex: "y=\\frac{3}{x+1}-4",
      answer: "-4",
      hint: "$k$ is the vertical shift outside the fraction.",
      explanation: "Here $k=-4$.",
    },
    {
      id: "asym-guided-3",
      prompt: "Find the vertical asymptote:",
      latex: "y=\\frac{1}{x-7}+3",
      answer: "x=7",
      acceptedAnswers: ["7"],
      hint: "Set the denominator equal to zero.",
      explanation: "$x-7=0$, so the vertical asymptote is $x=7$.",
    },
    {
      id: "asym-guided-4",
      prompt: "Find the horizontal asymptote:",
      latex: "y=\\frac{2}{x+4}-6",
      answer: "y=-6",
      acceptedAnswers: ["-6"],
      hint: "Use the value of $k$.",
      explanation: "The horizontal asymptote is $y=-6$.",
    },
  ],

  independentPractice: [
    {
      id: "asym-ind-1",
      prompt: "Find the vertical asymptote:",
      latex: "y=\\frac{1}{x-3}+5",
      answer: "x=3",
      acceptedAnswers: ["3"],
      hint: "Set $x-3=0$.",
      explanation: "The vertical asymptote is $x=3$.",
    },
    {
      id: "asym-ind-2",
      prompt: "Find the horizontal asymptote:",
      latex: "y=\\frac{4}{x+2}+1",
      answer: "y=1",
      acceptedAnswers: ["1"],
      hint: "Read the value of $k$.",
      explanation: "The horizontal asymptote is $y=1$.",
    },
    {
      id: "asym-ind-3",
      prompt: "Choose the correct asymptotes.",
      latex: "y=-\\frac{3}{x-6}-2",
      answer: "B",
      choices: [
        { label: "A", text: "$x=-6, \\; y=-2$" },
        { label: "B", text: "$x=6, \\; y=-2$" },
        { label: "C", text: "$x=6, \\; y=2$" },
      ],
      hint: "$x-6$ means the vertical asymptote is $x=6$.",
      explanation: "The asymptotes are $x=6$ and $y=-2$.",
    },
    {
      id: "asym-ind-4",
      prompt: "Choose the correct domain and range exclusions.",
      latex: "y=\\frac{1}{x+4}-3",
      answer: "A",
      choices: [
        { label: "A", text: "$x\\ne -4, \\; y\\ne -3$" },
        { label: "B", text: "$x\\ne -3, \\; y\\ne -4$" },
        { label: "C", text: "$x\\ne 4, \\; y\\ne 3$" },
      ],
      hint: "Domain excludes the vertical asymptote value; range excludes the horizontal asymptote value.",
      explanation: "The vertical asymptote is $x=-4$ and the horizontal asymptote is $y=-3$.",
    },
    {
      id: "asym-ind-5",
      prompt: "Choose the graph description.",
      latex: "y=\\frac{1}{x-2}+4",
      answer: "C",
      choices: [
        { label: "A", text: "basic reciprocal shifted left 2 and up 4" },
        { label: "B", text: "basic reciprocal shifted right 2 and down 4" },
        { label: "C", text: "basic reciprocal shifted right 2 and up 4" },
      ],
      hint: "$x-2$ shifts right 2 and $+4$ shifts up 4.",
      explanation: "The graph shifts right 2 and up 4.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Setting the vertical asymptote with the wrong sign.",
      fix: "For $x-h$, the vertical asymptote is $x=h$. For $x+1$, write it as $x-(-1)$.",
    },
    {
      mistake: "Confusing vertical and horizontal asymptotes.",
      fix: "Vertical asymptotes are written $x=...$ and horizontal asymptotes are written $y=...$.",
    },
    {
      mistake: "Saying the domain excludes the horizontal asymptote value.",
      fix: "Domain is about x-values, so it excludes the vertical asymptote value.",
    },
    {
      mistake: "Forgetting that range excludes the horizontal asymptote value.",
      fix: "Range is about y-values, so it excludes the horizontal asymptote value.",
    },
  ],

  masteryQuiz: [
    {
      id: "asym-mastery-1",
      prompt: "Find the vertical asymptote:",
      latex: "y=\\frac{1}{x-4}+2",
      answer: "x=4",
      acceptedAnswers: ["4"],
      hint: "Set the denominator equal to zero.",
      explanation: "The vertical asymptote is $x=4$.",
    },
    {
      id: "asym-mastery-2",
      prompt: "Find the horizontal asymptote:",
      latex: "y=\\frac{5}{x+3}-1",
      answer: "y=-1",
      acceptedAnswers: ["-1"],
      hint: "Read the value of $k$.",
      explanation: "The horizontal asymptote is $y=-1$.",
    },
    {
      id: "asym-mastery-3",
      prompt: "Choose the correct asymptotes.",
      latex: "y=\\frac{2}{x+5}+7",
      answer: "A",
      choices: [
        { label: "A", text: "$x=-5, \\; y=7$" },
        { label: "B", text: "$x=5, \\; y=7$" },
        { label: "C", text: "$x=-5, \\; y=-7$" },
      ],
      hint: "$x+5=x-(-5)$.",
      explanation: "The asymptotes are $x=-5$ and $y=7$.",
    },
    {
      id: "asym-mastery-4",
      prompt: "Find the excluded domain value:",
      latex: "y=\\frac{1}{x-9}-2",
      answer: "9",
      hint: "The domain excludes the vertical asymptote x-value.",
      explanation: "The vertical asymptote is $x=9$, so the domain excludes $9$.",
    },
    {
      id: "asym-mastery-5",
      prompt: "Find the excluded range value:",
      latex: "y=\\frac{3}{x+2}+6",
      answer: "6",
      hint: "The range excludes the horizontal asymptote y-value.",
      explanation: "The horizontal asymptote is $y=6$, so the range excludes $6$.",
    },
    {
      id: "asym-mastery-6",
      prompt: "Choose the correct domain and range.",
      latex: "y=-\\frac{1}{x-1}+4",
      answer: "B",
      choices: [
        { label: "A", text: "$x\\ne 4, \\; y\\ne 1$" },
        { label: "B", text: "$x\\ne 1, \\; y\\ne 4$" },
        { label: "C", text: "$x\\ne -1, \\; y\\ne -4$" },
      ],
      hint: "Use $h=1$ and $k=4$.",
      explanation: "The domain excludes $x=1$ and the range excludes $y=4$.",
    },
    {
      id: "asym-mastery-7",
      prompt: "Choose the transformation from $y=\\frac{1}{x}$.",
      latex: "y=\\frac{1}{x-3}-5",
      answer: "C",
      choices: [
        { label: "A", text: "left 3 and down 5" },
        { label: "B", text: "right 3 and up 5" },
        { label: "C", text: "right 3 and down 5" },
      ],
      hint: "$x-3$ shifts right 3; $-5$ shifts down 5.",
      explanation: "The graph shifts right 3 and down 5.",
    },
    {
      id: "asym-mastery-8",
      prompt: "Choose the correct behaviour.",
      latex: "y=\\frac{1}{x}+2",
      answer: "A",
      choices: [
        { label: "A", text: "The graph approaches $y=2$ for large positive or negative $x$." },
        { label: "B", text: "The graph approaches $x=2$ for large positive or negative $x$." },
        { label: "C", text: "The domain excludes $y=2$." },
      ],
      hint: "$+2$ gives the horizontal asymptote.",
      explanation: "The horizontal asymptote is $y=2$.",
    },
    {
      id: "asym-mastery-9",
      prompt: "Choose the correct mixed description.",
      latex: "y=-\\frac{2}{x+4}+1",
      answer: "B",
      choices: [
        { label: "A", text: "right 4, reflect in x-axis, vertical stretch by 2, up 1" },
        { label: "B", text: "left 4, reflect in x-axis, vertical stretch by 2, up 1" },
        { label: "C", text: "left 4, reflect in y-axis, horizontal stretch by 2, down 1" },
      ],
      hint: "$x+4$ shifts left 4; the $-2$ is outside the reciprocal part.",
      explanation: "The graph shifts left 4, reflects in the x-axis, vertically stretches by 2, and shifts up 1.",
    },
    {
      id: "asym-mastery-10",
      prompt: "Choose the correct asymptotes and exclusions.",
      latex: "y=\\frac{4}{x-2}-3",
      answer: "A",
      choices: [
        { label: "A", text: "$x=2$, $y=-3$; domain $x\\ne 2$, range $y\\ne -3$" },
        { label: "B", text: "$x=-2$, $y=3$; domain $x\\ne -2$, range $y\\ne 3$" },
        { label: "C", text: "$x=4$, $y=-3$; domain $x\\ne 4$, range $y\\ne -3$" },
      ],
      hint: "Use $h=2$ and $k=-3$.",
      explanation: "The vertical asymptote is $x=2$ and the horizontal asymptote is $y=-3$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const solvingEquationsInequalitiesGraphicallyLesson: ExplicitLesson = {
  id: "solving-equations-inequalities-graphically",
  slug: "solving-equations-inequalities-graphically",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Solving Equations and Inequalities Graphically",
  description:
    "Use intersections, x-intercepts, and graph position to solve equations and inequalities.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Solving Equations and Inequalities Graphically",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to solve equations and inequalities by interpreting intersections and graph position.",

  successCriteria: [
    "Explain that solutions to $f(x)=g(x)$ are x-values of intersection.",
    "Use x-intercepts to solve equations of the form $f(x)=0$.",
    "Identify where $f(x)>g(x)$ by finding where the graph of $f$ is above the graph of $g$.",
    "Identify where $f(x)<g(x)$ by finding where the graph of $f$ is below the graph of $g$.",
    "State inequality solutions as intervals.",
  ],

  teaching: {
    paragraphs: [
      "Solving an equation graphically means finding where two graphs intersect.",
      "The solutions to $f(x)=g(x)$ are the x-values of the intersection points, not the y-values.",
      "Solving $f(x)=0$ is a special case: it means finding the x-intercepts of the graph of $f$.",
      "Solving $f(x)>g(x)$ means finding where the graph of $f$ is above the graph of $g$.",
      "Solving $f(x)<g(x)$ means finding where the graph of $f$ is below the graph of $g$.",
      "Graphical solutions may be exact when intercepts or intersections are clear, or approximate from a sketch.",
      "Inequality answers are usually intervals rather than isolated points.",
    ],
    latexBlocks: [
      "f(x)=g(x) \\quad \\Rightarrow \\quad \\text{x-values of intersections}",
      "f(x)=0 \\quad \\Rightarrow \\quad \\text{x-intercepts of }y=f(x)",
      "f(x)>g(x) \\quad \\Rightarrow \\quad f\\text{ is above }g",
      "f(x)<g(x) \\quad \\Rightarrow \\quad f\\text{ is below }g",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Solve from x-intercepts",
      questionLatex:
        "\\text{Use the graph interpretation idea to solve }x^2-4=0.",
      steps: [
        {
          explanation: "Think of the equation as the x-intercepts of $y=x^2-4$.",
          latex: "y=x^2-4",
        },
        {
          explanation: "Set $y=0$ to find where the graph crosses the x-axis.",
          latex: "x^2-4=0",
        },
        {
          explanation: "Factorise and solve.",
          latex: "(x-2)(x+2)=0 \\quad \\Rightarrow \\quad x=-2,2",
        },
      ],
      finalAnswerLatex: "x=-2, \\quad x=2",
    },
    {
      title: "Worked example 2: Compare two graphs",
      questionLatex:
        "f(x)=x^2, \\quad g(x)=2x+3. \\quad \\text{Solve }f(x)=g(x)\\text{, then identify where }f(x)>g(x).",
      steps: [
        {
          explanation: "Set the functions equal to find intersections.",
          latex: "x^2=2x+3",
        },
        {
          explanation: "Rearrange and factorise.",
          latex: "x^2-2x-3=0 \\quad \\Rightarrow \\quad (x-3)(x+1)=0",
        },
        {
          explanation: "The intersection x-values are the equation solutions.",
          latex: "x=-1, \\quad x=3",
        },
        {
          explanation: "Test an interval to decide where $f$ is above $g$.",
          latex: "x=4: \\quad f(4)=16, \\quad g(4)=11, \\quad f(x)>g(x)",
        },
        {
          explanation:
            "Since the upward parabola is above the line outside the intersections, state the intervals.",
          latex: "x<-1 \\quad \\text{or} \\quad x>3",
        },
      ],
      finalAnswerLatex:
        "f(x)=g(x)\\text{ at }x=-1,3; \\quad f(x)>g(x)\\text{ for }x<-1\\text{ or }x>3",
    },
  ],

  guidedPractice: [
    {
      id: "graphsolve-guided-1",
      prompt: "The graphs intersect at $(-2,5)$ and $(4,1)$. Choose the equation solutions.",
      latex: "f(x)=g(x)",
      answer: "B",
      choices: [
        { label: "A", text: "$x=5$ and $x=1$" },
        { label: "B", text: "$x=-2$ and $x=4$" },
        { label: "C", text: "$x=-2$ and $x=5$" },
      ],
      hint: "Solutions are x-values of intersections.",
      explanation: "The solutions are $x=-2$ and $x=4$.",
    },
    {
      id: "graphsolve-guided-2",
      prompt: "Solve from x-intercepts:",
      latex: "y=(x-1)(x+3), \\quad y=0",
      answer: "-3,1",
      acceptedAnswers: ["1,-3", "x=-3,1", "x=1,-3", "-3 and 1", "1 and -3"],
      hint: "Set each factor equal to zero.",
      explanation: "The x-intercepts are $x=1$ and $x=-3$.",
    },
    {
      id: "graphsolve-guided-3",
      prompt: "Choose the meaning of $f(x)>g(x)$.",
      latex: "f(x)>g(x)",
      answer: "A",
      choices: [
        { label: "A", text: "the graph of $f$ is above the graph of $g$" },
        { label: "B", text: "the graph of $f$ is below the graph of $g$" },
        { label: "C", text: "the graphs have the same y-value only" },
      ],
      hint: "Greater y-values appear higher on the graph.",
      explanation: "$f(x)>g(x)$ means $f$ is above $g$.",
    },
    {
      id: "graphsolve-guided-4",
      prompt: "Choose the interval where $f(x)>g(x)$.",
      latex: "\\text{Intersections at }x=1,4; \\quad f\\text{ is above }g\\text{ between the intersections.}",
      answer: "B",
      choices: [
        { label: "A", text: "$x<1$ or $x>4$" },
        { label: "B", text: "$1<x<4$" },
        { label: "C", text: "$x=1$ and $x=4$ only" },
      ],
      hint: "Between the intersections means the interval from 1 to 4.",
      explanation: "The solution is $1<x<4$.",
    },
  ],

  independentPractice: [
    {
      id: "graphsolve-ind-1",
      prompt: "Solve from x-intercepts:",
      latex: "x^2-9=0",
      answer: "-3,3",
      acceptedAnswers: ["3,-3", "x=-3,3", "x=3,-3", "-3 and 3", "3 and -3"],
      hint: "Factorise $x^2-9$.",
      explanation: "$x^2-9=(x-3)(x+3)$, so $x=-3,3$.",
    },
    {
      id: "graphsolve-ind-2",
      prompt: "Solve $f(x)=g(x)$:",
      latex: "f(x)=x^2, \\quad g(x)=4",
      answer: "-2,2",
      acceptedAnswers: ["2,-2", "x=-2,2", "x=2,-2", "-2 and 2", "2 and -2"],
      hint: "Solve $x^2=4$.",
      explanation: "The graphs intersect when $x=-2$ and $x=2$.",
    },
    {
      id: "graphsolve-ind-3",
      prompt: "Choose where the quadratic is above the line.",
      latex: "f(x)=x^2, \\quad g(x)=x+2, \\quad \\text{intersections at }x=-1,2",
      answer: "A",
      choices: [
        { label: "A", text: "$x<-1$ or $x>2$" },
        { label: "B", text: "$-1<x<2$" },
        { label: "C", text: "$x=-1$ and $x=2$ only" },
      ],
      hint: "An upward parabola is above the line outside the intersection interval.",
      explanation: "$f(x)>g(x)$ for $x<-1$ or $x>2$.",
    },
    {
      id: "graphsolve-ind-4",
      prompt: "Choose the solution from the graph reading.",
      latex: "\\text{A graph crosses the x-axis at }x=-4\\text{ and }x=2.",
      answer: "C",
      choices: [
        { label: "A", text: "$y=-4$ and $y=2$" },
        { label: "B", text: "$x=-4$ only" },
        { label: "C", text: "$x=-4$ and $x=2$" },
      ],
      hint: "Solutions to $f(x)=0$ are x-intercepts.",
      explanation: "The solutions are $x=-4$ and $x=2$.",
    },
    {
      id: "graphsolve-ind-5",
      prompt: "A revenue graph $R(x)$ and cost graph $C(x)$ intersect at $x=20$ and $x=80$. Profit is positive when revenue is above cost between the intersections. Choose the profit-positive interval.",
      latex: "R(x)>C(x)",
      answer: "B",
      choices: [
        { label: "A", text: "$x<20$ or $x>80$" },
        { label: "B", text: "$20<x<80$" },
        { label: "C", text: "$x=20$ and $x=80$ only" },
      ],
      hint: "Revenue is above cost between the intersections.",
      explanation: "Profit is positive for $20<x<80$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Giving y-values instead of x-values as equation solutions.",
      fix: "Solutions to equations are the x-values where the relevant graphs meet.",
    },
    {
      mistake: "Solving $f(x)=0$ when the question asks $f(x)=g(x)$.",
      fix: "For $f(x)=g(x)$, find intersections between the two graphs.",
    },
    {
      mistake: "Reversing above and below for inequalities.",
      fix: "$f(x)>g(x)$ means $f$ is above $g$; $f(x)<g(x)$ means $f$ is below $g$.",
    },
    {
      mistake: "Forgetting that inequalities often have intervals.",
      fix: "Use interval notation or clear inequality statements between or outside intersection points.",
    },
  ],

  masteryQuiz: [
    {
      id: "graphsolve-mastery-1",
      prompt: "The graphs intersect at $(-1,3)$ and $(5,2)$. Choose the solutions to $f(x)=g(x)$.",
      latex: "f(x)=g(x)",
      answer: "B",
      choices: [
        { label: "A", text: "$x=3$ and $x=2$" },
        { label: "B", text: "$x=-1$ and $x=5$" },
        { label: "C", text: "$y=-1$ and $y=5$" },
      ],
      hint: "Use x-values of intersections.",
      explanation: "The solutions are $x=-1$ and $x=5$.",
    },
    {
      id: "graphsolve-mastery-2",
      prompt: "Solve from x-intercepts:",
      latex: "x^2-16=0",
      answer: "-4,4",
      acceptedAnswers: ["4,-4", "x=-4,4", "x=4,-4", "-4 and 4", "4 and -4"],
      hint: "Use difference of two squares.",
      explanation: "$x^2-16=(x-4)(x+4)$, so $x=-4,4$.",
    },
    {
      id: "graphsolve-mastery-3",
      prompt: "Solve $f(x)=g(x)$:",
      latex: "f(x)=x^2, \\quad g(x)=3x+4",
      answer: "-1,4",
      acceptedAnswers: ["4,-1", "x=-1,4", "x=4,-1", "-1 and 4", "4 and -1"],
      hint: "Solve $x^2=3x+4$.",
      explanation: "$x^2-3x-4=0=(x-4)(x+1)$, so $x=-1,4$.",
    },
    {
      id: "graphsolve-mastery-4",
      prompt: "Choose where $f(x)>g(x)$.",
      latex: "\\text{Intersections at }x=2,6; \\quad f\\text{ is above }g\\text{ for }2<x<6.",
      answer: "A",
      choices: [
        { label: "A", text: "$2<x<6$" },
        { label: "B", text: "$x<2$ or $x>6$" },
        { label: "C", text: "$x=2$ and $x=6$ only" },
      ],
      hint: "Use the interval where $f$ is above $g$.",
      explanation: "$f(x)>g(x)$ for $2<x<6$.",
    },
    {
      id: "graphsolve-mastery-5",
      prompt: "Choose where $f(x)<g(x)$.",
      latex: "\\text{Intersections at }x=-2,3; \\quad f\\text{ is below }g\\text{ outside the intersections.}",
      answer: "C",
      choices: [
        { label: "A", text: "$-2<x<3$" },
        { label: "B", text: "$x=-2$ and $x=3$ only" },
        { label: "C", text: "$x<-2$ or $x>3$" },
      ],
      hint: "Outside means to the left of $-2$ and to the right of $3$.",
      explanation: "$f(x)<g(x)$ for $x<-2$ or $x>3$.",
    },
    {
      id: "graphsolve-mastery-6",
      prompt: "Choose the correct inequality interval.",
      latex: "x^2-4<0",
      answer: "B",
      choices: [
        { label: "A", text: "$x<-2$ or $x>2$" },
        { label: "B", text: "$-2<x<2$" },
        { label: "C", text: "$x=-2$ and $x=2$" },
      ],
      hint: "$x^2-4$ is below the x-axis between its roots.",
      explanation: "$x^2-4<0$ for $-2<x<2$.",
    },
    {
      id: "graphsolve-mastery-7",
      prompt: "Choose the correct interpretation.",
      latex: "f(x)>g(x)",
      answer: "A",
      choices: [
        { label: "A", text: "$f$ is above $g$" },
        { label: "B", text: "$f$ is below $g$" },
        { label: "C", text: "$f$ and $g$ have no intersection" },
      ],
      hint: "Greater output values appear higher on the graph.",
      explanation: "$f(x)>g(x)$ means $f$ is above $g$.",
    },
    {
      id: "graphsolve-mastery-8",
      prompt: "Choose the correct equation to solve for intersections.",
      latex: "f(x)=x^2+1, \\quad g(x)=2x+4",
      answer: "C",
      choices: [
        { label: "A", text: "$x^2+1=0$" },
        { label: "B", text: "$2x+4=0$" },
        { label: "C", text: "$x^2+1=2x+4$" },
      ],
      hint: "Set the two function rules equal.",
      explanation: "Intersections satisfy $x^2+1=2x+4$.",
    },
    {
      id: "graphsolve-mastery-9",
      prompt: "Solve the graphical comparison equation:",
      latex: "x^2+1=2x+4",
      answer: "-1,3",
      acceptedAnswers: ["3,-1", "x=-1,3", "x=3,-1", "-1 and 3", "3 and -1"],
      hint: "Rearrange to one side and factorise.",
      explanation: "$x^2-2x-3=0=(x-3)(x+1)$, so $x=-1,3$.",
    },
    {
      id: "graphsolve-mastery-10",
      prompt: "A demand model $D(p)$ and supply model $S(p)$ intersect at $p=12$. Choose the meaning.",
      latex: "D(p)=S(p)",
      answer: "B",
      choices: [
        { label: "A", text: "The equilibrium output value is always 12." },
        { label: "B", text: "The equilibrium occurs at input value $p=12$." },
        { label: "C", text: "Demand is greater than supply for every value." },
      ],
      hint: "Equation solutions are input values.",
      explanation: "The intersection gives the input value $p=12$ where demand equals supply.",
    },
  ],

  masteryPassMark: 0.8,
};

export const modellingWithFunctionsLesson: ExplicitLesson = {
  id: "modelling-with-functions",
  slug: "modelling-with-functions",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Modelling with Functions",
  description:
    "Interpret functions as real-world models, including variables, domain, range, intercepts, turning points, and contextual meaning.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Modelling with Functions",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to interpret functions and graph features in real-world contexts.",

  successCriteria: [
    "Identify the input variable and output quantity in a model.",
    "Evaluate a function and interpret the result in context.",
    "Recognise contextual domain restrictions.",
    "Interpret intercepts, turning points, asymptotes, and intervals in context.",
    "Answer modelling questions with appropriate units and meaning.",
  ],

  teaching: {
    paragraphs: [
      "A function can model a real-world relationship between an input variable and an output quantity.",
      "The input is usually the independent variable, such as time, number of items, or price. The output is the quantity produced by the model.",
      "Context can restrict the domain. Time after launch, number of items, and physical lengths are usually not negative.",
      "The range can describe possible output values, such as possible heights, costs, temperatures, or populations.",
      "Intercepts, turning points, asymptotes, and intervals can all have contextual meaning.",
      "A model is only useful over a reasonable domain. Algebraic answers outside the context may need to be rejected.",
      "Before calculating, identify what the question is really asking: a value, an intercept, a maximum or minimum, a domain restriction, or an interpretation.",
    ],
    latexBlocks: [
      "h(t)=-5t^2+20t+1, \\quad t\\ge 0",
      "C(x)=2x+50, \\quad x\\ge 0",
      "\\text{input} \\rightarrow \\text{function rule} \\rightarrow \\text{output}",
      "\\text{contextual domain} \\quad \\Rightarrow \\quad \\text{reasonable input values}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Height model",
      questionLatex:
        "h(t)=-5t^2+20t+1, \\quad t\\ge 0. \\quad \\text{Find }h(0), \\text{ interpret it, and find when the ball hits the ground.}",
      steps: [
        {
          explanation: "Evaluate the initial height.",
          latex: "h(0)=-5(0)^2+20(0)+1=1",
        },
        {
          explanation: "Interpret the value in context.",
          latex: "h(0)=1 \\quad \\Rightarrow \\quad \\text{initial height is }1\\text{ metre}",
        },
        {
          explanation: "The ball hits the ground when height is zero.",
          latex: "-5t^2+20t+1=0",
        },
        {
          explanation: "Use the positive solution because $t\\ge 0$.",
          latex: "t=\\frac{20+\\sqrt{420}}{10}\\approx 4.05",
        },
      ],
      finalAnswerLatex:
        "h(0)=1\\text{ m}; \\quad \\text{the ball hits the ground at about }4.05\\text{ s}.",
    },
    {
      title: "Worked example 2: Cost model",
      questionLatex:
        "C(x)=2x+50, \\quad x\\ge 0. \\quad \\text{Identify the fixed cost, cost per item, and interpret }C(10).",
      steps: [
        {
          explanation: "The fixed cost is the y-intercept.",
          latex: "C(0)=50",
        },
        {
          explanation: "The coefficient of $x$ gives the cost per item.",
          latex: "2x \\quad \\Rightarrow \\quad \\$2\\text{ per item}",
        },
        {
          explanation: "Evaluate the cost at $x=10$.",
          latex: "C(10)=2(10)+50=70",
        },
        {
          explanation: "Interpret the result.",
          latex: "\\text{The cost of producing 10 items is }\\$70.",
        },
      ],
      finalAnswerLatex:
        "\\text{Fixed cost }\\$50, \\quad \\$2\\text{ per item}, \\quad C(10)=\\$70.",
    },
  ],

  guidedPractice: [
    {
      id: "model-guided-1",
      prompt: "Identify the input variable:",
      latex: "h(t)=-5t^2+12t+2",
      answer: "t",
      hint: "The input is the variable inside the brackets or function rule.",
      explanation: "The input variable is $t$, usually representing time in this context.",
    },
    {
      id: "model-guided-2",
      prompt: "Choose the output quantity.",
      latex: "C(x)=4x+30 \\quad \\text{models cost in dollars for }x\\text{ items.}",
      answer: "B",
      choices: [
        { label: "A", text: "number of items" },
        { label: "B", text: "cost in dollars" },
        { label: "C", text: "time in seconds" },
      ],
      hint: "The output is the value produced by $C(x)$.",
      explanation: "$C(x)$ gives the cost in dollars.",
    },
    {
      id: "model-guided-3",
      prompt: "Evaluate and interpret the model value:",
      latex: "C(x)=4x+30, \\quad C(5)=\\Box",
      answer: "50",
      hint: "Substitute $x=5$.",
      explanation: "$C(5)=4(5)+30=50$, so 5 items cost $50$.",
    },
    {
      id: "model-guided-4",
      prompt: "Choose the sensible contextual domain.",
      latex: "N(t)=100+8t \\quad \\text{where }t\\text{ is years after 2026.}",
      answer: "A",
      choices: [
        { label: "A", text: "$t\\ge 0$" },
        { label: "B", text: "$t<0$ only" },
        { label: "C", text: "all negative fractions only" },
      ],
      hint: "Years after a starting time are not negative.",
      explanation: "The sensible contextual domain is $t\\ge 0$.",
    },
  ],

  independentPractice: [
    {
      id: "model-ind-1",
      prompt: "Find the initial height:",
      latex: "h(t)=-5t^2+15t+2",
      answer: "2",
      hint: "Initial height is $h(0)$.",
      explanation: "$h(0)=2$, so the initial height is 2 metres.",
    },
    {
      id: "model-ind-2",
      prompt: "Find the fixed cost:",
      latex: "C(x)=7x+120",
      answer: "120",
      hint: "The fixed cost is $C(0)$.",
      explanation: "$C(0)=120$, so the fixed cost is $120$.",
    },
    {
      id: "model-ind-3",
      prompt: "Find the model value:",
      latex: "P(t)=500+20t, \\quad P(4)",
      answer: "580",
      hint: "Substitute $t=4$.",
      explanation: "$P(4)=500+20(4)=580$.",
    },
    {
      id: "model-ind-4",
      prompt: "Choose the value that does not make sense in context.",
      latex: "x\\text{ is the number of tickets sold.}",
      answer: "C",
      choices: [
        { label: "A", text: "$x=0$" },
        { label: "B", text: "$x=25$" },
        { label: "C", text: "$x=-3$" },
      ],
      hint: "A number of tickets cannot be negative.",
      explanation: "$x=-3$ does not make sense for tickets sold.",
    },
    {
      id: "model-ind-5",
      prompt: "Choose the contextual meaning of the maximum point.",
      latex: "h(t)\\text{ has a maximum at }(2,21).",
      answer: "B",
      choices: [
        { label: "A", text: "The object starts at 21 metres." },
        { label: "B", text: "The greatest height is 21 metres at 2 seconds." },
        { label: "C", text: "The object hits the ground at 2 seconds." },
      ],
      hint: "A maximum point gives the largest output value.",
      explanation: "The object reaches greatest height 21 metres at $t=2$ seconds.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Ignoring the contextual domain.",
      fix: "Check whether values like negative time, negative length, or fractional item counts make sense.",
    },
    {
      mistake: "Treating negative time or negative quantity as valid when it is not.",
      fix: "Reject algebraic answers that do not fit the context.",
    },
    {
      mistake: "Giving a number without units or context.",
      fix: "Say what the number represents, such as dollars, metres, people, or seconds.",
    },
    {
      mistake: "Solving the algebra but not answering the question asked.",
      fix: "Finish with a sentence that matches the wording of the problem.",
    },
  ],

  masteryQuiz: [
    {
      id: "model-mastery-1",
      prompt: "Identify the input variable:",
      latex: "T(d)=18-0.4d",
      answer: "d",
      hint: "The input variable is inside the function brackets.",
      explanation: "The input variable is $d$.",
    },
    {
      id: "model-mastery-2",
      prompt: "Evaluate:",
      latex: "C(x)=3x+25, \\quad C(8)",
      answer: "49",
      hint: "Substitute $x=8$.",
      explanation: "$C(8)=3(8)+25=49$.",
    },
    {
      id: "model-mastery-3",
      prompt: "Choose the correct interpretation.",
      latex: "C(8)=49",
      answer: "A",
      choices: [
        { label: "A", text: "8 items cost $49." },
        { label: "B", text: "49 items cost $8." },
        { label: "C", text: "The fixed cost is $8." },
      ],
      hint: "$x=8$ is the input and $49$ is the output.",
      explanation: "$C(8)=49$ means 8 items cost $49.",
    },
    {
      id: "model-mastery-4",
      prompt: "Find the y-intercept value and interpret it as the initial amount:",
      latex: "P(t)=250+12t",
      answer: "250",
      hint: "Set $t=0$.",
      explanation: "$P(0)=250$, so the initial amount is 250.",
    },
    {
      id: "model-mastery-5",
      prompt: "Choose the sensible domain.",
      latex: "h(t)=-5t^2+20t+2, \\quad t\\text{ is time after launch}",
      answer: "B",
      choices: [
        { label: "A", text: "$t<0$" },
        { label: "B", text: "$t\\ge 0$ while the ball is in the air" },
        { label: "C", text: "all real numbers forever" },
      ],
      hint: "Time after launch is not negative.",
      explanation: "The sensible domain starts at $t=0$ and ends when the model stops applying.",
    },
    {
      id: "model-mastery-6",
      prompt: "Choose the contextual meaning of the x-intercept.",
      latex: "h(t)=0",
      answer: "C",
      choices: [
        { label: "A", text: "the maximum height" },
        { label: "B", text: "the starting height only" },
        { label: "C", text: "the time when height is zero" },
      ],
      hint: "An x-intercept occurs when the output is zero.",
      explanation: "For a height model, $h(t)=0$ represents the time the object is at ground level.",
    },
    {
      id: "model-mastery-7",
      prompt: "Choose the contextual meaning of the turning point.",
      latex: "R(x)\\text{ has a maximum at }(30,900).",
      answer: "A",
      choices: [
        { label: "A", text: "Maximum revenue is $900 when $x=30$." },
        { label: "B", text: "Revenue is zero when $x=30$." },
        { label: "C", text: "The fixed cost is $900." },
      ],
      hint: "A maximum point gives the greatest output value.",
      explanation: "The maximum revenue is $900 at $x=30$.",
    },
    {
      id: "model-mastery-8",
      prompt: "Choose the feature that represents a long-term limiting value.",
      latex: "P(t)=\\frac{100}{t+1}+20",
      answer: "B",
      choices: [
        { label: "A", text: "vertical asymptote $t=-1$" },
        { label: "B", text: "horizontal asymptote $P=20$" },
        { label: "C", text: "x-intercept $t=20$" },
      ],
      hint: "Long-term behaviour is described by a horizontal asymptote.",
      explanation: "The model approaches $P=20$ in the long term.",
    },
    {
      id: "model-mastery-9",
      prompt: "A ticket revenue model is $R(n)=15n$. Find the revenue for 40 tickets.",
      latex: "R(40)",
      answer: "600",
      hint: "Substitute $n=40$.",
      explanation: "$R(40)=15(40)=600$, so revenue is $600$.",
    },
    {
      id: "model-mastery-10",
      prompt: "Choose the best next step before calculating.",
      latex: "\\text{A model question gives a function and asks for a contextual interpretation.}",
      answer: "B",
      choices: [
        { label: "A", text: "Ignore the variables and solve randomly." },
        { label: "B", text: "Identify the input, output, domain, and feature being asked about." },
        { label: "C", text: "Always find the x-intercepts first." },
      ],
      hint: "Good modelling starts by reading the context.",
      explanation: "Identify the variables, domain, and requested feature before calculating.",
    },
  ],

  masteryPassMark: 0.8,
};

export const mixedFunctionsGraphingExamPracticeLesson: ExplicitLesson = {
  id: "mixed-functions-graphing-exam-practice",
  slug: "mixed-functions-graphing-exam-practice",
  moduleSlug: "functions-graphing-techniques",
  moduleTitle: "Functions and Graphing Techniques",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Mixed Functions and Graphing Exam Practice",
  description:
    "Practise mixed exam-style questions involving function notation, domain, range, transformations, features, asymptotes, and graphical solving.",
  syllabusArea: "Functions",
  focus: "Graphing techniques",
  status: "active",

  video: {
    title: "Mixed Functions and Graphing Exam Practice",
    url: "/videos/placeholder-lesson.mp4",
  },

  learningIntention:
    "Learn how to choose and combine graphing techniques in mixed exam-style questions.",

  successCriteria: [
    "Identify whether a question is testing notation, domain, transformations, intercepts, asymptotes, or graphical solving.",
    "Select the correct method before calculating.",
    "Find key graph features accurately.",
    "Interpret graph features in context when required.",
    "Avoid vague descriptions by giving exact features, values, and intervals.",
  ],

  teaching: {
    paragraphs: [
      "Exam questions often combine several graphing skills in one prompt.",
      "A question may require function notation, domain and range, transformations, intercepts, asymptotes, graphical solving, or modelling interpretation.",
      "The first step is to identify the type of graph or feature being tested.",
      "Graphing questions often reward clear setup: state what you are finding, use the correct equation, and interpret the feature.",
      "Avoid long vague descriptions. Give exact intercepts, vertices, asymptotes, domains, ranges, and intervals where possible.",
      "Transfer means applying familiar graphing tools to wording or contexts that look unfamiliar.",
    ],
    latexBlocks: [
      "f(x)=0 \\quad \\Rightarrow \\quad x\\text{-intercepts}",
      "f(x)=g(x) \\quad \\Rightarrow \\quad \\text{intersections}",
      "y=a(x-h)^2+k \\quad \\Rightarrow \\quad \\text{vertex }(h,k)",
      "y=\\frac{a}{x-h}+k \\quad \\Rightarrow \\quad x=h, \\; y=k",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Quadratic key features",
      questionLatex:
        "f(x)=(x-2)^2-9. \\quad \\text{Find key features and describe the graph.}",
      steps: [
        {
          explanation: "Read the vertex and axis from vertex form.",
          latex: "\\text{vertex }(2,-9), \\quad \\text{axis }x=2",
        },
        {
          explanation: "Set $f(x)=0$ for x-intercepts.",
          latex: "(x-2)^2-9=0 \\Rightarrow x=-1,5",
        },
        {
          explanation: "Set $x=0$ for the y-intercept.",
          latex: "f(0)=4-9=-5",
        },
        {
          explanation: "The graph opens upward because the coefficient of the squared term is positive.",
          latex: "\\text{opens upward}",
        },
      ],
      finalAnswerLatex:
        "\\text{vertex }(2,-9), \\; x=-1,5, \\; y\\text{-intercept }-5, \\; \\text{opens upward}",
    },
    {
      title: "Worked example 2: Reciprocal graph features",
      questionLatex:
        "y=\\frac{1}{x-3}+2. \\quad \\text{Identify asymptotes, domain, and range.}",
      steps: [
        {
          explanation: "Compare with $y=\\frac{a}{x-h}+k$.",
          latex: "h=3, \\quad k=2",
        },
        {
          explanation: "State the asymptotes.",
          latex: "x=3, \\quad y=2",
        },
        {
          explanation: "Use asymptotes to state domain and range.",
          latex: "x\\ne 3, \\quad y\\ne 2",
        },
      ],
      finalAnswerLatex:
        "x=3, \\quad y=2, \\quad \\text{domain }x\\ne 3, \\quad \\text{range }y\\ne 2",
    },
    {
      title: "Worked example 3: Graphical solving",
      questionLatex:
        "f(x)=x^2, \\quad g(x)=x+6. \\quad \\text{Solve }f(x)=g(x).",
      steps: [
        {
          explanation: "Set the function rules equal.",
          latex: "x^2=x+6",
        },
        {
          explanation: "Rearrange and factorise.",
          latex: "x^2-x-6=0 \\Rightarrow (x-3)(x+2)=0",
        },
        {
          explanation: "State the x-values of intersection.",
          latex: "x=-2,3",
        },
      ],
      finalAnswerLatex: "x=-2, \\quad x=3",
    },
  ],

  guidedPractice: [
    {
      id: "mixed-fg-guided-1",
      prompt: "Choose the graphing skill needed.",
      latex: "\\text{Find the domain of }f(x)=\\sqrt{x-5}.",
      answer: "A",
      choices: [
        { label: "A", text: "square-root domain restriction" },
        { label: "B", text: "y-intercept only" },
        { label: "C", text: "trapezoidal rule" },
      ],
      hint: "A square root creates a domain restriction.",
      explanation: "Use $x-5\\ge 0$ to find the domain.",
    },
    {
      id: "mixed-fg-guided-2",
      prompt: "Choose the relevant method.",
      latex: "y=\\frac{1}{x-4}+1",
      answer: "C",
      choices: [
        { label: "A", text: "complete the square" },
        { label: "B", text: "differentiate" },
        { label: "C", text: "identify reciprocal asymptotes" },
      ],
      hint: "This is a reciprocal-style graph.",
      explanation: "Use $x=4$ and $y=1$ as asymptotes.",
    },
    {
      id: "mixed-fg-guided-3",
      prompt: "Find one key feature:",
      latex: "y=(x+2)^2-7",
      answer: "(-2,-7)",
      acceptedAnswers: ["-2,-7", "(-2, -7)"],
      hint: "Read the vertex from vertex form.",
      explanation: "The vertex is $(-2,-7)$.",
    },
    {
      id: "mixed-fg-guided-4",
      prompt: "Choose the transformation.",
      latex: "y=f(x-3)+2",
      answer: "B",
      choices: [
        { label: "A", text: "left 3 and up 2" },
        { label: "B", text: "right 3 and up 2" },
        { label: "C", text: "right 3 and down 2" },
      ],
      hint: "$f(x-3)$ shifts right 3.",
      explanation: "The graph shifts right 3 and up 2.",
    },
  ],

  independentPractice: [
    {
      id: "mixed-fg-ind-1",
      prompt: "Choose the correct domain.",
      latex: "f(x)=\\sqrt{8-x}",
      answer: "A",
      choices: [
        { label: "A", text: "$x\\le 8$" },
        { label: "B", text: "$x\\ge 8$" },
        { label: "C", text: "$x\\ne 8$" },
      ],
      hint: "Require $8-x\\ge 0$.",
      explanation: "$8-x\\ge 0$ gives $x\\le 8$.",
    },
    {
      id: "mixed-fg-ind-2",
      prompt: "Choose the transformation.",
      latex: "y=-2f(x+1)",
      answer: "C",
      choices: [
        { label: "A", text: "right 1, reflect in y-axis, vertical stretch by 2" },
        { label: "B", text: "left 1 only" },
        { label: "C", text: "left 1, reflect in x-axis, vertical stretch by 2" },
      ],
      hint: "$x+1$ shifts left 1; $-2$ is outside.",
      explanation: "The graph shifts left 1, reflects in the x-axis, and vertically stretches by 2.",
    },
    {
      id: "mixed-fg-ind-3",
      prompt: "Find the x-intercepts:",
      latex: "y=(x-6)(x+1)",
      answer: "-1,6",
      acceptedAnswers: ["6,-1", "x=-1,6", "x=6,-1", "-1 and 6", "6 and -1"],
      hint: "Set each factor equal to zero.",
      explanation: "The x-intercepts occur at $x=-1$ and $x=6$.",
    },
    {
      id: "mixed-fg-ind-4",
      prompt: "Find the vertical asymptote:",
      latex: "y=\\frac{3}{x+2}-5",
      answer: "x=-2",
      acceptedAnswers: ["-2"],
      hint: "Set $x+2=0$.",
      explanation: "The vertical asymptote is $x=-2$.",
    },
    {
      id: "mixed-fg-ind-5",
      prompt: "Solve the graphical comparison equation:",
      latex: "x^2=5x-6",
      answer: "2,3",
      acceptedAnswers: ["3,2", "x=2,3", "x=3,2", "2 and 3", "3 and 2"],
      hint: "Rearrange and factorise.",
      explanation: "$x^2-5x+6=0=(x-2)(x-3)$, so $x=2,3$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Confusing domain and range.",
      fix: "Domain is input values; range is output values.",
    },
    {
      mistake: "Reversing horizontal transformations.",
      fix: "$f(x-a)$ shifts right $a$, while $f(x+a)$ shifts left $a$.",
    },
    {
      mistake: "Mixing up x-intercepts and y-intercepts.",
      fix: "Set $y=0$ for x-intercepts and set $x=0$ for the y-intercept.",
    },
    {
      mistake: "Giving y-values instead of x-values for solutions.",
      fix: "Equation solutions are x-values of intersections or x-intercepts.",
    },
  ],

  masteryQuiz: [
    {
      id: "mixed-fg-mastery-1",
      prompt: "Choose the method needed.",
      latex: "f(x)=\\frac{1}{x-2}+4",
      answer: "B",
      choices: [
        { label: "A", text: "find a vertex" },
        { label: "B", text: "identify reciprocal asymptotes" },
        { label: "C", text: "find a derivative" },
      ],
      hint: "This is a reciprocal-style graph.",
      explanation: "Use reciprocal graph features and asymptotes.",
    },
    {
      id: "mixed-fg-mastery-2",
      prompt: "Choose the feature being found.",
      latex: "f(x)=0",
      answer: "A",
      choices: [
        { label: "A", text: "x-intercepts" },
        { label: "B", text: "y-intercept" },
        { label: "C", text: "horizontal asymptote" },
      ],
      hint: "Set the output equal to zero.",
      explanation: "$f(x)=0$ finds x-intercepts.",
    },
    {
      id: "mixed-fg-mastery-3",
      prompt: "Choose the correct graph type.",
      latex: "y=(x-1)^2+3",
      answer: "C",
      choices: [
        { label: "A", text: "reciprocal graph" },
        { label: "B", text: "linear graph" },
        { label: "C", text: "quadratic in vertex form" },
      ],
      hint: "The squared bracket is the clue.",
      explanation: "This is a quadratic in vertex form.",
    },
    {
      id: "mixed-fg-mastery-4",
      prompt: "Evaluate:",
      latex: "f(x)=2x^2-1, \\quad f(3)",
      answer: "17",
      hint: "Substitute $x=3$.",
      explanation: "$f(3)=2(3)^2-1=17$.",
    },
    {
      id: "mixed-fg-mastery-5",
      prompt: "Find the vertex:",
      latex: "y=(x+4)^2-2",
      answer: "(-4,-2)",
      acceptedAnswers: ["-4,-2", "(-4, -2)"],
      hint: "$x+4=x-(-4)$.",
      explanation: "The vertex is $(-4,-2)$.",
    },
    {
      id: "mixed-fg-mastery-6",
      prompt: "Find the horizontal asymptote:",
      latex: "y=\\frac{2}{x-7}-3",
      answer: "y=-3",
      acceptedAnswers: ["-3"],
      hint: "Read the value of $k$.",
      explanation: "The horizontal asymptote is $y=-3$.",
    },
    {
      id: "mixed-fg-mastery-7",
      prompt: "Choose the correct description.",
      latex: "y=-x^2+4x+1",
      answer: "B",
      choices: [
        { label: "A", text: "opens upward" },
        { label: "B", text: "opens downward" },
        { label: "C", text: "has vertical asymptote $x=4$" },
      ],
      hint: "Check the coefficient of $x^2$.",
      explanation: "The negative coefficient means the parabola opens downward.",
    },
    {
      id: "mixed-fg-mastery-8",
      prompt: "Choose the contextual interpretation.",
      latex: "C(12)=86",
      answer: "A",
      choices: [
        { label: "A", text: "12 items cost $86." },
        { label: "B", text: "86 items cost $12." },
        { label: "C", text: "The domain excludes 86." },
      ],
      hint: "$12$ is the input and $86$ is the output.",
      explanation: "$C(12)=86$ means 12 items cost $86.",
    },
    {
      id: "mixed-fg-mastery-9",
      prompt: "Solve the mixed graphing equation:",
      latex: "(x-1)^2-9=0",
      answer: "-2,4",
      acceptedAnswers: ["4,-2", "x=-2,4", "x=4,-2", "-2 and 4", "4 and -2"],
      hint: "Move 9 and take square roots.",
      explanation: "$(x-1)^2=9$, so $x-1=\\pm 3$, giving $x=-2,4$.",
    },
    {
      id: "mixed-fg-mastery-10",
      prompt: "Choose the correct combined feature statement.",
      latex: "y=\\frac{1}{x+1}-2",
      answer: "C",
      choices: [
        { label: "A", text: "vertical asymptote $x=1$, range $y\\ne 2$" },
        { label: "B", text: "vertical asymptote $x=-2$, range $y\\ne -1$" },
        { label: "C", text: "vertical asymptote $x=-1$, range $y\\ne -2$" },
      ],
      hint: "$x+1=x-(-1)$ and $k=-2$.",
      explanation: "The vertical asymptote is $x=-1$ and the range excludes $y=-2$.",
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
    status: "active",
  },
  {
    id: "intercepts-key-features",
    slug: "intercepts-key-features",
    title: "Intercepts and Key Features",
    description:
      "Identify intercepts, turning points, symmetry, and other features needed for accurate graph sketches.",
    status: "active",
  },
  {
    id: "asymptotes-reciprocal-graphs",
    slug: "asymptotes-reciprocal-graphs",
    title: "Asymptotes and Reciprocal-Style Graphs",
    description:
      "Recognise and sketch graphs with vertical and horizontal asymptotes.",
    status: "active",
  },
  {
    id: "solving-equations-inequalities-graphically",
    slug: "solving-equations-inequalities-graphically",
    title: "Solving Equations and Inequalities Graphically",
    description:
      "Use graphs to solve equations, inequalities, and compare functions.",
    status: "active",
  },
  {
    id: "modelling-with-functions",
    slug: "modelling-with-functions",
    title: "Modelling with Functions",
    description:
      "Use functions and graphs to model and interpret real-world relationships.",
    status: "active",
  },
  {
    id: "mixed-functions-graphing-exam-practice",
    slug: "mixed-functions-graphing-exam-practice",
    title: "Mixed Functions and Graphing Exam Practice",
    description:
      "Practise mixed exam-style questions involving function notation, transformations, features, asymptotes, and graphical solving.",
    status: "active",
  },
];

export const functionsGraphingTechniquesLessons = [
  domainRangeFunctionNotationLesson,
  graphTransformationsLesson,
  reflectionsStretchesTranslationsLesson,
  interceptsKeyFeaturesLesson,
  asymptotesReciprocalGraphsLesson,
  solvingEquationsInequalitiesGraphicallyLesson,
  modellingWithFunctionsLesson,
  mixedFunctionsGraphingExamPracticeLesson,
];
