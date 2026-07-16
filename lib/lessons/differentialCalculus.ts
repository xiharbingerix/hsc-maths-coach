import type { NetworkDiagram } from "./types";
import type { Choice, DiagramFields } from "./diagramRegistry";

export type PracticeQuestionPart = {
  key: string;
  label: string;
  prompt: string;
  latex?: string;
  marks: number;
  answer: string;
  acceptedAnswers?: string[];
  hint?: string;
  explanation: string;
  working?: string[];
};

export type PracticeQuestion = {
  id: string;
  prompt: string;
  latex: string;
  /**
   * Optional difficulty (1 = easiest … 5 = hardest), used by the mastery-quiz
   * pool selector to fill each quiz slot with an appropriate difficulty.
   * Untagged questions are treated as mid difficulty.
   */
  difficulty?: number;
  solutionDiagram?: NetworkDiagram;
  answer: string;
  acceptedAnswers?: string[];
  /** Use semantic marking when equivalent prose cannot be covered fairly by strings. */
  responseType?: "short_explanation";
  modelSolution?: string;
  markingRubric?: string[];
  markingFeedbackOptions?: Array<{ key: string; text: string }>;
  choices?: Choice[];
  hint?: string;
  explanation?: string;
  parts?: PracticeQuestionPart[];
  steps?: Array<{
    prompt: string;
    latex: string;
    answer: string;
    acceptedAnswers?: string[];
    hint?: string;
    explanation: string;
  }>;
} & DiagramFields;

export type WorkedExampleStep = {
  explanation: string;
  latex?: string;
};

export type WorkedExample = {
  title: string;
  questionLatex: string;
  steps: WorkedExampleStep[];
  finalAnswerLatex: string;
} & DiagramFields;

export type ExplicitLesson = {
  id: string;
  slug: string;
  moduleSlug: string;
  moduleTitle: string;
  courseTitle: string;
  title: string;
  description: string;
  syllabusArea: string;
  focus: string;
  status: "active" | "coming-soon";
  /** Placement and traceability metadata for syllabus-alignment audits. */
  coursePlacement?: "year-11-assumed-knowledge" | "year-12";
  syllabusReferences?: string[];
  syllabusOutcomes?: string[];
  syllabusContent?: string[];
  /** HSC Section II-style multi-part questions seeded separately from the standard 4+5+10 sections. */
  multiPartPractice?: PracticeQuestion[];

  video: {
    title: string;
    url: string;
  };

  learningIntention: string;
  successCriteria: string[];

  teaching: {
    paragraphs: string[];
    latexBlocks: string[];
  };

  workedExamples: WorkedExample[];
  guidedPractice: PracticeQuestion[];
  independentPractice: PracticeQuestion[];
  commonMistakes: {
    mistake: string;
    fix: string;
  }[];

  masteryQuiz: PracticeQuestion[];
  /**
   * Optional larger bank (~30–40, difficulty-tagged) the mastery quiz draws
   * from. When present, each attempt selects a fresh set of `masteryQuiz.length`
   * questions ramped easy→hard via `buildMasteryQuiz`. When absent, the fixed
   * `masteryQuiz` array is used unchanged (backward compatible).
   */
  masteryQuizPool?: PracticeQuestion[];
  masteryPassMark: number;
};

export type LessonOutlineItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "active" | "coming-soon";
};

export const derivativeAsRateOfChangeLesson: ExplicitLesson = {
  id: "rate-of-change",
  slug: "rate-of-change",
  moduleSlug: "ma-c1-introduction-to-differentiation",
  moduleTitle: "Introduction to Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "The Derivative as Rate of Change",
  description:
    "Understand average rate of change, instantaneous rate of change, tangent gradients, derivative notation, signs, and units.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "The Derivative as Rate of Change",
    url: "https://www.youtube.com/embed/NRSmIE5MMBQ",
  },

  learningIntention:
    "Learn how to interpret the derivative as an instantaneous rate of change.",

  successCriteria: [
    "Explain that a rate of change compares how one quantity changes compared to another.",
    "Calculate average rate of change from two function values.",
    "Recognise average rate of change as the gradient of a secant line.",
    "Recognise instantaneous rate of change as the gradient of a tangent line.",
    "Interpret derivative notation such as $f'(x)$, $\\frac{dy}{dx}$, and $\\frac{ds}{dt}$.",
    "Use the sign and units of a derivative to interpret a contextual rate.",
  ],

  teaching: {
    paragraphs: [
      "A rate of change compares how fast one quantity changes against another. A car's speedometer is a rate of change: it answers how quickly distance is changing with time right now, not over the whole trip.",
      "Average rate of change looks across a whole interval. It is the change in output divided by the change in input, which on a graph is the gradient of the secant line joining the two points. A trip's average speed is exactly this idea: total distance divided by total time.",
      "Instantaneous rate of change looks at a single point. Picture the second point sliding closer and closer to the first: the secant joining them swings around and settles onto the tangent at that point, so the secant gradients approach one limiting value.",
      "That limiting value is the derivative. Writing the second point a small step $h$ from the first, the average-rate fraction $\\frac{f(x+h)-f(x)}{h}$ approaches $f'(x)$ as $h$ shrinks to zero. This is why the derivative equals the gradient of the tangent.",
      "The notation depends on the context: $f'(x)$, $\\frac{dy}{dx}$, and $\\frac{ds}{dt}$ all name the same instantaneous rate. The sign gives the direction, so a positive derivative means the quantity is increasing, a negative derivative means it is decreasing, and a zero derivative means it is momentarily not changing.",
      "Units come straight from the fraction. If displacement is measured in metres and time in seconds, then $\\frac{ds}{dt}$ is measured in metres per second.",
    ],
    latexBlocks: [
      "\\text{average rate of change}=\\frac{\\text{change in output}}{\\text{change in input}}",
      "\\frac{f(b)-f(a)}{b-a}",
      "\\text{instantaneous rate of change}=f'(a)",
      "f'(x)>0 \\Rightarrow \\text{increasing}, \\quad f'(x)<0 \\Rightarrow \\text{decreasing}, \\quad f'(x)=0 \\Rightarrow \\text{momentarily not changing}",
      "f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Average rate of change",
      questionLatex:
        "f(1)=3, \\quad f(5)=15. \\quad \\text{Find the average rate of change from }x=1\\text{ to }x=5.",
      steps: [
        {
          explanation: "Average rate of change is the change in output divided by the change in input, so form that fraction across the interval.",
          latex: "\\frac{f(5)-f(1)}{5-1}",
        },
        {
          explanation: "Substitute the two function values; the denominator is the change in input from 1 to 5.",
          latex: "\\frac{15-3}{5-1}=\\frac{12}{4}",
        },
        {
          explanation: "Simplify to get the gradient of the secant joining the two points.",
          latex: "3",
        },
        {
          explanation: "Interpret the result: across this interval the output rises 3 units for every 1 unit increase in the input.",
          latex: "\\text{average rate}=3",
        },
      ],
      finalAnswerLatex:
        "3, \\quad \\text{the output rises on average 3 units for each 1 unit increase in }x.",
    },
    {
      title: "Worked example 2: Instantaneous rate from a derivative",
      questionLatex:
        "s(t)=t^2+3t, \\quad s'(t)=2t+3. \\quad \\text{Find and interpret }s'(4).",
      steps: [
        {
          explanation: "$s'(4)$ means the instantaneous rate at $t=4$.",
          latex: "s'(4)=2(4)+3",
        },
        {
          explanation: "Evaluate the derivative value.",
          latex: "s'(4)=11",
        },
        {
          explanation: "Interpret the positive sign.",
          latex:
            "s'(4)>0 \\Rightarrow \\text{the displacement is increasing at }11\\text{ units per time unit}",
        },
      ],
      finalAnswerLatex:
        "s'(4)=11, \\quad \\text{so }s\\text{ is increasing at }11\\text{ units per time unit when }t=4.",
    },
    {
      title: "Worked example 3: Sign of a derivative",
      questionLatex:
        "h'(2)=-6\\text{ metres per second}. \\quad \\text{Interpret this rate.}",
      steps: [
        {
          explanation: "The negative sign means the quantity is decreasing.",
          latex: "h'(2)<0",
        },
        {
          explanation: "Use the magnitude and units in the interpretation.",
          latex: "6\\text{ metres per second}",
        },
      ],
      finalAnswerLatex:
        "\\text{At }t=2,\\text{ the height is decreasing at }6\\text{ metres per second.}",
    },
  ],

  guidedPractice: [
    {
      id: "roc-guided-1",
      prompt: "Identify the numerator for average rate of change:",
      latex: "f(2)=7, \\quad f(6)=19, \\quad \\frac{f(6)-f(2)}{6-2}",
      answer: "12",
      hint: "Find the change in output.",
      explanation: "$f(6)-f(2)=19-7=12$.",
    },
    {
      id: "roc-guided-2",
      prompt: "Find the average rate of change.",
      latex: "f(1)=4, \\quad f(5)=16",
      answer: "3",
      hint: "Use $\\frac{16-4}{5-1}$.",
      explanation: "$\\frac{16-4}{5-1}=\\frac{12}{4}=3$.",
    },
    {
      id: "roc-guided-3",
      prompt:
        "Choose the correct description. A: secant gradient. B: tangent gradient. C: y-intercept.",
      latex: "\\text{Instantaneous rate of change at one point}",
      answer: "B",
      choices: [
        { label: "A", text: "secant gradient" },
        { label: "B", text: "tangent gradient" },
        { label: "C", text: "y-intercept" },
      ],
      hint: "Instantaneous rate uses a tangent.",
      explanation:
        "Instantaneous rate of change is the gradient of the tangent at a point.",
    },
    {
      id: "roc-guided-4",
      prompt: "Complete the interpretation: $P'(3)>0$ means the quantity is ____.",
      latex: "P'(3)>0",
      answer: "A",
      acceptedAnswers: ["increasing"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Positive derivative means increasing.",
      explanation: "Since $P'(3)>0$, the quantity is increasing at that instant.",
    },
  ],

  independentPractice: [
    {
      id: "roc-ind-1",
      prompt: "Find the average rate of change.",
      latex: "f(0)=2, \\quad f(4)=18",
      answer: "4",
      hint: "Use change in output over change in input.",
      explanation: "$\\frac{18-2}{4-0}=4$.",
    },
    {
      id: "roc-ind-2",
      prompt: "Find the instantaneous rate at $t=3$.",
      latex: "",
      answer: "13",
      hint: "Substitute $t=3$.",
      explanation: "$s'(3)=5(3)-2=13$.",
    },
    {
      id: "roc-ind-3",
      prompt: "Complete the interpretation: $h'(5)=-4$ means height is ____.",
      latex: "h'(5)=-4\\text{ metres per second}",
      answer: "B",
      acceptedAnswers: ["decreasing"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Use the sign of the derivative.",
      explanation:
        "The height is decreasing at $4$ metres per second when $t=5$.",
    },
    {
      id: "roc-ind-4",
      prompt:
        "A displacement $s$ depends on time $t$. Choose the best notation for velocity.",
      latex: "s=s(t)",
      answer: "C",
      choices: [
        { label: "A", text: "$\\frac{dt}{ds}$" },
        { label: "B", text: "$s(t)$" },
        { label: "C", text: "$\\frac{ds}{dt}$" },
      ],
      hint: "Velocity is change in displacement over change in time.",
      explanation: "Velocity is $\\frac{ds}{dt}$.",
    },
    {
      id: "roc-ind-5",
      prompt: "Choose the correct units for $\\frac{ds}{dt}$.",
      latex: "s\\text{ is metres}, \\quad t\\text{ is seconds}",
      answer: "A",
      acceptedAnswers: ["metres per second", "m/s"],
      choices: [
        { label: "A", text: "metres per second" },
        { label: "B", text: "seconds per metre" },
        { label: "C", text: "metres" },
      ],
      hint: "Rate units are output units per input unit.",
      explanation:
        "$\\frac{ds}{dt}$ is measured in metres per second.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Mixing up average and instantaneous rate of change.",
      fix: "Average rate uses two points. Instantaneous rate uses a tangent at one point.",
    },
    {
      mistake: "Using change in input over change in output.",
      fix: "Average rate is change in output divided by change in input.",
    },
    {
      mistake: "Ignoring the sign of the derivative.",
      fix: "A negative derivative means the quantity is decreasing at that instant.",
    },
    {
      mistake: "Leaving off units in a context question.",
      fix: "Write rates as output units per input unit, such as metres per second.",
    },
  ],

  masteryQuiz: [
    {
      id: "roc-mastery-1",
      prompt: "Choose the best meaning of rate of change.",
      latex: "\\text{rate of change}",
      answer: "B",
      choices: [
        { label: "A", text: "the value of a quantity" },
        { label: "B", text: "how one quantity changes compared to another" },
        { label: "C", text: "only the highest point of a graph" },
      ],
      hint: "Rate compares two changes.",
      explanation:
        "A rate of change compares how one quantity changes compared to another.",
    },
    {
      id: "roc-mastery-2",
      prompt: "Find the average rate of change.",
      latex: "f(2)=5, \\quad f(6)=17",
      answer: "3",
      hint: "Use $\\frac{17-5}{6-2}$.",
      explanation: "$\\frac{17-5}{6-2}=3$.",
    },
    {
      id: "roc-mastery-3",
      prompt: "Average rate of change is the gradient of which line?",
      latex: "\\text{average rate of change}",
      answer: "A",
      choices: [
        { label: "A", text: "secant line" },
        { label: "B", text: "tangent line" },
        { label: "C", text: "vertical line" },
      ],
      hint: "Average rate joins two points.",
      explanation: "Average rate of change is the gradient of a secant line.",
    },
    {
      id: "roc-mastery-4",
      prompt: "Instantaneous rate of change is the gradient of which line?",
      latex: "\\text{instantaneous rate of change}",
      answer: "B",
      choices: [
        { label: "A", text: "secant line" },
        { label: "B", text: "tangent line" },
        { label: "C", text: "axis of symmetry" },
      ],
      hint: "Instantaneous rate is at one point.",
      explanation:
        "Instantaneous rate of change is the gradient of the tangent line.",
    },
    {
      id: "roc-mastery-5",
      prompt: "Evaluate the instantaneous rate at $t=2$.",
      latex: "",
      answer: "9",
      hint: "Substitute $t=2$.",
      explanation: "$s'(2)=4(2)+1=9$.",
    },
    {
      id: "roc-mastery-6",
      prompt: "Choose the derivative notation for rate of change of $y$ with respect to $x$.",
      latex: "y=y(x)",
      answer: "A",
      choices: [
        { label: "A", text: "$\\frac{dy}{dx}$" },
        { label: "B", text: "$\\frac{dx}{dy}$" },
        { label: "C", text: "$xy$" },
      ],
      hint: "Read $\\frac{dy}{dx}$ as change in y with respect to x.",
      explanation: "$\\frac{dy}{dx}$ is the rate of change of $y$ with respect to $x$.",
    },
    {
      id: "roc-mastery-7",
      prompt: "Complete the interpretation: $C'(8)>0$ means cost is ____.",
      latex: "C'(8)>0",
      answer: "A",
      acceptedAnswers: ["increasing"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Positive derivative means increasing.",
      explanation: "The cost is increasing at that instant.",
    },
    {
      id: "roc-mastery-8",
      prompt: "Choose the correct interpretation.",
      latex: "h'(2)=-6\\text{ metres per second}",
      answer: "B",
      choices: [
        { label: "A", text: "height is increasing at 6 metres per second" },
        { label: "B", text: "height is decreasing at 6 metres per second" },
        { label: "C", text: "height is equal to -6 metres" },
      ],
      hint: "A negative derivative means decreasing.",
      explanation:
        "$h'(2)=-6$ means height is decreasing at $6$ metres per second.",
    },
    {
      id: "roc-mastery-9",
      prompt: "A population model has $P'(4)=0$. Choose the best interpretation.",
      latex: "P'(4)=0",
      answer: "C",
      acceptedAnswers: ["momentarily not changing", "not changing"],
      choices: [
        { label: "A", text: "population is increasing quickly" },
        { label: "B", text: "population is decreasing quickly" },
        { label: "C", text: "population is momentarily not changing" },
      ],
      hint: "Zero derivative means zero instantaneous rate.",
      explanation: "The population is momentarily not changing when $t=4$.",
    },
    {
      id: "roc-mastery-10",
      prompt: "Find the average speed from the displacement values.",
      latex: "s(1)=10\\text{ m}, \\quad s(5)=30\\text{ m}",
      answer: "5",
      acceptedAnswers: ["5 m/s", "5 metres per second"],
      hint: "Use $\\frac{30-10}{5-1}$.",
      explanation:
        "$\\frac{30-10}{5-1}=5$, so the average speed is $5$ metres per second.",
    },
    {
      id: "roc-mastery-fp1",
      prompt: "Using first principles, which expression does $\\frac{f(a+h)-f(a)}{h}$ simplify to (before taking the limit)?",
      latex: "f(x)=x^2",
      answer: "B",
      choices: [
        { label: "A", text: "$2a$" },
        { label: "B", text: "$2a+h$" },
        { label: "C", text: "$2ah$" },
        { label: "D", text: "$a^2+h$" },
      ],
      hint: "Expand $(a+h)^2$ and cancel $a^2$.",
      explanation:
        "$(a+h)^2-a^2=2ah+h^2$. Dividing by $h$ gives $2a+h$. As $h\\to 0$, this gives $f'(a)=2a$.",
    },
    {
      id: "roc-mastery-fp2",
      prompt: "Using first principles, find $f'(3)$ for $f(x)=x^2$.",
      latex: "",
      answer: "C",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$9$" },
        { label: "C", text: "$6$" },
        { label: "D", text: "$3+h$" },
      ],
      hint: "Expand $(3+h)^2$, subtract $9$, divide by $h$, then let $h\\to 0$.",
      explanation:
        "$\\frac{(3+h)^2-9}{h}=\\frac{9+6h+h^2-9}{h}=\\frac{6h+h^2}{h}=6+h$. As $h\\to 0$, $f'(3)=6$.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: average rate of change from two values ──────────────
    {
      id: "rate-pool-1",
      prompt: "Find the average rate of change from $x = 1$ to $x = 3$.",
      latex: "f(x) = x^2",
      difficulty: 1,
      answer: "4",
      hint: "Average rate $= \\dfrac{f(3) - f(1)}{3 - 1}$.",
      explanation: "$\\dfrac{9 - 1}{2} = 4$.",
    },
    {
      id: "rate-pool-2",
      prompt: "Find the average rate of change from $x = 2$ to $x = 4$.",
      latex: "f(x) = x^2",
      difficulty: 1,
      answer: "6",
      hint: "Average rate $= \\dfrac{f(4) - f(2)}{4 - 2}$.",
      explanation: "$\\dfrac{16 - 4}{2} = 6$.",
    },
    {
      id: "rate-pool-3",
      prompt: "Find the average rate of change from $x = 0$ to $x = 5$.",
      latex: "f(x) = 2x + 1",
      difficulty: 1,
      answer: "2",
      hint: "For a straight line the average rate equals the gradient.",
      explanation: "$\\dfrac{11 - 1}{5} = 2$.",
    },
    {
      id: "rate-pool-4",
      prompt: "Find the average rate of change from $x = 0$ to $x = 2$.",
      latex: "f(x) = x^2",
      difficulty: 1,
      answer: "2",
      hint: "Average rate $= \\dfrac{f(2) - f(0)}{2 - 0}$.",
      explanation: "$\\dfrac{4 - 0}{2} = 2$.",
    },
    {
      id: "rate-pool-5",
      prompt: "Find the average rate of change from $x = 1$ to $x = 2$.",
      latex: "f(x) = x^3",
      difficulty: 1,
      answer: "7",
      hint: "Average rate $= \\dfrac{f(2) - f(1)}{2 - 1}$.",
      explanation: "$\\dfrac{8 - 1}{1} = 7$.",
    },
    {
      id: "rate-pool-6",
      prompt: "Find the average rate of change from $x = 1$ to $x = 4$.",
      latex: "f(x) = 3x",
      difficulty: 1,
      answer: "3",
      hint: "A straight line has constant average rate equal to its gradient.",
      explanation: "$\\dfrac{12 - 3}{3} = 3$.",
    },
    // ── Difficulty 2: average rate in context / mixed ─────────────────────
    {
      id: "rate-pool-7",
      prompt:
        "A particle's position (metres) is $s(t) = t^2$. Find its average velocity from $t = 1$ to $t = 3$ (m/s).",
      latex: "s(t) = t^2",
      difficulty: 2,
      answer: "4",
      acceptedAnswers: ["4 m/s"],
      hint: "Average velocity $= \\dfrac{s(3) - s(1)}{3 - 1}$.",
      explanation: "$\\dfrac{9 - 1}{2} = 4$ m/s.",
    },
    {
      id: "rate-pool-8",
      prompt: "Find the average rate of change from $x = 0$ to $x = 4$.",
      latex: "f(x) = x^2 - 2x",
      difficulty: 2,
      answer: "2",
      hint: "Average rate $= \\dfrac{f(4) - f(0)}{4 - 0}$.",
      explanation: "$\\dfrac{8 - 0}{4} = 2$.",
    },
    {
      id: "rate-pool-9",
      prompt: "Find the average rate of change from $x = 1$ to $x = 3$.",
      latex: "f(x) = x^2 + x",
      difficulty: 2,
      answer: "5",
      hint: "Average rate $= \\dfrac{f(3) - f(1)}{3 - 1}$.",
      explanation: "$\\dfrac{12 - 2}{2} = 5$.",
    },
    {
      id: "rate-pool-10",
      prompt:
        "A population is $P(t) = t^2$ (thousands). Find its average growth rate from $t = 2$ to $t = 5$.",
      latex: "P(t) = t^2",
      difficulty: 2,
      answer: "7",
      hint: "Average rate $= \\dfrac{P(5) - P(2)}{5 - 2}$.",
      explanation: "$\\dfrac{25 - 4}{3} = 7$.",
    },
    {
      id: "rate-pool-11",
      prompt: "Find the average rate of change from $x = 0$ to $x = 2$.",
      latex: "f(x) = 10 - x^2",
      difficulty: 2,
      answer: "-2",
      hint: "Average rate $= \\dfrac{f(2) - f(0)}{2 - 0}$; expect a negative value.",
      explanation: "$\\dfrac{6 - 10}{2} = -2$.",
    },
    {
      id: "rate-pool-12",
      prompt: "Find the average rate of change from $x = -1$ to $x = 1$.",
      latex: "f(x) = x^2",
      difficulty: 2,
      answer: "0",
      hint: "Compare $f(1)$ and $f(-1)$.",
      explanation: "$\\dfrac{1 - 1}{2} = 0$ (the curve is symmetric here).",
    },
    // ── Difficulty 3: instantaneous rate = derivative at a point ──────────
    {
      id: "rate-pool-13",
      prompt:
        "A particle has position $s(t) = t^2$. Find its instantaneous velocity at $t = 3$.",
      latex: "s(t) = t^2",
      difficulty: 3,
      answer: "6",
      hint: "$s'(t) = 2t$; substitute $t = 3$.",
      explanation: "$s'(t) = 2t$, so $s'(3) = 6$.",
    },
    {
      id: "rate-pool-14",
      prompt: "Find the instantaneous rate of change at $x = 4$.",
      latex: "f(x) = x^2",
      difficulty: 3,
      answer: "8",
      hint: "$f'(x) = 2x$; substitute $x = 4$.",
      explanation: "$f'(x) = 2x$, so $f'(4) = 8$.",
    },
    {
      id: "rate-pool-15",
      prompt: "Find the instantaneous rate of change at $t = 2$.",
      latex: "s(t) = t^3",
      difficulty: 3,
      answer: "12",
      hint: "$s'(t) = 3t^2$; substitute $t = 2$.",
      explanation: "$s'(t) = 3t^2$, so $s'(2) = 12$.",
    },
    {
      id: "rate-pool-16",
      prompt: "Find the instantaneous rate of change at $x = 1$.",
      latex: "f(x) = x^2 + 3x",
      difficulty: 3,
      answer: "5",
      hint: "$f'(x) = 2x + 3$; substitute $x = 1$.",
      explanation: "$f'(x) = 2x + 3$, so $f'(1) = 5$.",
    },
    {
      id: "rate-pool-17",
      prompt: "Find the instantaneous rate of change at $t = 1$.",
      latex: "s(t) = 5t^2",
      difficulty: 3,
      answer: "10",
      hint: "$s'(t) = 10t$; substitute $t = 1$.",
      explanation: "$s'(t) = 10t$, so $s'(1) = 10$.",
    },
    {
      id: "rate-pool-18",
      prompt: "Find the instantaneous rate of change at $x = 2$.",
      latex: "f(x) = x^2 - 6x",
      difficulty: 3,
      answer: "-2",
      hint: "$f'(x) = 2x - 6$; substitute $x = 2$.",
      explanation: "$f'(x) = 2x - 6$, so $f'(2) = -2$.",
    },
    // ── Difficulty 4: interpret sign and notation ─────────────────────────
    {
      id: "rate-pool-19",
      prompt: "If $f'(5) > 0$, the function at $x = 5$ is:",
      latex: "f'(5) > 0",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "A positive derivative means the tangent slopes upward.",
      explanation: "A positive derivative means the function is increasing there.",
    },
    {
      id: "rate-pool-20",
      prompt: "If $f'(2) < 0$, the function at $x = 2$ is:",
      latex: "f'(2) < 0",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "undefined" },
      ],
      hint: "A negative derivative means the tangent slopes downward.",
      explanation: "A negative derivative means the function is decreasing there.",
    },
    {
      id: "rate-pool-21",
      prompt: "If $f'(3) = 0$, the tangent to the curve at $x = 3$ is:",
      latex: "f'(3) = 0",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "horizontal" },
        { label: "B", text: "vertical" },
        { label: "C", text: "very steep" },
        { label: "D", text: "undefined" },
      ],
      hint: "Zero gradient means a flat tangent.",
      explanation: "A gradient of $0$ gives a horizontal tangent.",
    },
    {
      id: "rate-pool-22",
      prompt: "For a moving object, what does $\\frac{ds}{dt}$ represent?",
      latex: "\\frac{ds}{dt}",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "the velocity (rate of change of distance with time)" },
        { label: "B", text: "the total distance travelled" },
        { label: "C", text: "the acceleration" },
        { label: "D", text: "the average speed" },
      ],
      hint: "It is the rate of change of distance with respect to time.",
      explanation: "$\\frac{ds}{dt}$ is the instantaneous velocity.",
    },
    {
      id: "rate-pool-23",
      prompt: "The average rate of change between two points is the gradient of which line?",
      latex: "\\text{average rate of change}",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "a secant line" },
        { label: "B", text: "a tangent line" },
        { label: "C", text: "a normal line" },
        { label: "D", text: "a horizontal line" },
      ],
      hint: "It connects two points on the curve.",
      explanation: "The average rate of change is the gradient of the secant joining the two points.",
    },
    {
      id: "rate-pool-24",
      prompt: "The instantaneous rate of change at a point is the gradient of which line?",
      latex: "\\text{instantaneous rate of change}",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "a tangent line" },
        { label: "B", text: "a secant line" },
        { label: "C", text: "a chord" },
        { label: "D", text: "a normal line" },
      ],
      hint: "It touches the curve at a single point.",
      explanation: "The instantaneous rate of change is the gradient of the tangent.",
    },
    // ── Difficulty 5: contextual rates (multi-step) ───────────────────────
    {
      id: "rate-pool-25",
      prompt:
        "A particle has position $s(t) = t^2 - 4t$ metres. Find its velocity at $t = 3$ (m/s).",
      latex: "s(t) = t^2 - 4t",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["2 m/s"],
      hint: "Velocity is $s'(t) = 2t - 4$.",
      explanation: "$s'(t) = 2t - 4$, so $s'(3) = 2$ m/s.",
    },
    {
      id: "rate-pool-26",
      prompt:
        "A particle has position $s(t) = t^2 - 4t$. At what time is its velocity zero?",
      latex: "s(t) = t^2 - 4t",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["t=2", "2 s"],
      hint: "Set $s'(t) = 2t - 4 = 0$.",
      explanation: "$2t - 4 = 0 \\Rightarrow t = 2$.",
    },
    {
      id: "rate-pool-27",
      prompt:
        "A population is $P(t) = t^2$ (thousands). Find the instantaneous growth rate at $t = 5$.",
      latex: "P(t) = t^2",
      difficulty: 5,
      answer: "10",
      hint: "$P'(t) = 2t$; substitute $t = 5$.",
      explanation: "$P'(t) = 2t$, so $P'(5) = 10$ (thousand per unit time).",
    },
    {
      id: "rate-pool-28",
      prompt:
        "By how much does the average rate of change of $f(x) = x^2$ from $x = 2$ to $x = 4$ exceed the instantaneous rate at $x = 2$?",
      latex: "f(x) = x^2",
      difficulty: 5,
      answer: "2",
      hint: "Average rate is 6; instantaneous rate at $x = 2$ is $f'(2) = 4$.",
      explanation: "Average $= 6$, instantaneous $= 4$; the difference is $2$.",
    },
    {
      id: "rate-pool-29",
      prompt:
        "A particle has position $s(t) = 3t^2$ metres. Find its average speed over $0 \\le t \\le 2$ (m/s).",
      latex: "s(t) = 3t^2",
      difficulty: 5,
      answer: "6",
      acceptedAnswers: ["6 m/s"],
      hint: "Average speed $= \\dfrac{s(2) - s(0)}{2 - 0}$.",
      explanation: "$\\dfrac{12 - 0}{2} = 6$ m/s.",
    },
    {
      id: "rate-pool-30",
      prompt:
        "A car's position is $s(t) = t^2 + 2t$ metres. Find its velocity at $t = 4$ (m/s).",
      latex: "s(t) = t^2 + 2t",
      difficulty: 5,
      answer: "10",
      acceptedAnswers: ["10 m/s"],
      hint: "Velocity is $s'(t) = 2t + 2$.",
      explanation: "$s'(t) = 2t + 2$, so $s'(4) = 10$ m/s.",
    },
  ],

  masteryPassMark: 0.8,

  multiPartPractice: [
    {
      id: "roc-mp-1",
      prompt:
        "The displacement of a particle after $t$ seconds is $s(t) = t^3 - 6t^2 + 9t$ metres.",
      latex: "s(t) = t^3 - 6t^2 + 9t",
      answer: "-3",
      hint: "Find $v(t) = s'(t)$, then solve $v(t)=0$ for the rest times, then evaluate $v(2)$ and state its sign.",
      explanation:
        "Part (a): $v(t)=s'(t)=3t^2-12t+9$. At $t=2$: $v(2)=3(4)-12(2)+9=-3$ m/s. Part (b): $v(t)=3t^2-12t+9=3(t-1)(t-3)=0$, so $t=1$ or $t=3$. The smaller value is $t=1$. Part (c): $v(2)=-3<0$, so the velocity is negative.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the velocity of the particle at $t = 2$ seconds.",
          latex: "",
          marks: 1,
          answer: "-3",
          acceptedAnswers: ["−3"],
          hint: "Differentiate $s(t)$ to find $v(t)$, then substitute $t=2$.",
          explanation:
            "$v(t)=3t^2-12t+9$. At $t=2$: $v(2)=12-24+9=-3$ m/s.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "Find the smaller value of $t$ at which the particle is momentarily at rest.",
          marks: 2,
          answer: "1",
          acceptedAnswers: [],
          hint: "Set $v(t)=0$ and factorise $3t^2-12t+9$.",
          explanation:
            "$v(t)=3(t^2-4t+3)=3(t-1)(t-3)=0$, so $t=1$ or $t=3$. The smaller value is $t=1$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "State the sign of the velocity at $t = 2$: positive, negative, or zero.",
          marks: 1,
          answer: "negative",
          acceptedAnswers: ["negative direction", "in the negative direction", "decreasing"],
          hint: "Compare the value from part (a) with zero.",
          explanation:
            "$v(2)=-3<0$, so the velocity is negative. The particle is moving in the negative direction.",
        },
      ],
    },
  ],
};

export const differentiatingPolynomialTermsLesson: ExplicitLesson = {
  id: "differentiating-polynomial-terms",
  slug: "differentiating-polynomial-terms",
  moduleSlug: "ma-c1-introduction-to-differentiation",
  moduleTitle: "Introduction to Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Differentiating Polynomial Terms",
  description:
    "Learn how to differentiate polynomial terms using the power rule, with a focus on coefficients, powers, constants, and common mark-losing mistakes.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Differentiating Polynomial Terms",
    url: "https://www.youtube.com/embed/I8IM9P-2TRU",
  },

  learningIntention:
    "Learn how to differentiate polynomial terms using the power rule.",

  successCriteria: [
    "Identify the coefficient and power in a polynomial term.",
    "Apply the power rule correctly.",
    "Differentiate polynomial terms with positive and negative coefficients.",
    "Recognise that constants differentiate to zero.",
    "Avoid common coefficient, power, and sign errors.",
  ],

  teaching: {
    paragraphs: [
      "Differentiating a term means finding the slope of its curve. Last lesson you saw that the instantaneous rate of change at a point is the gradient of the tangent line there. For a curve that gradient is different at every point, so the derivative is itself a new function: a slope formula that tells you the steepness of the curve at any value of x.",
      "We could find that slope the slow way, using the limit definition from the previous lesson for every single function. The power rule is the shortcut that gives the same answer for any power of x without redoing the limit each time. To see where it comes from, take the concrete case y = x^2 and run the limit once.",
      "When you carry out that limit (worked example 1), the bracket (x+h)^2 expands to x^2 + 2xh + h^2, the x^2 terms cancel, an h divides out, and as h shrinks to zero you are left with 2x. Look at what happened to the exponent: the 2 came down to multiply, and the power dropped by one. The same expansion on x^n always leaves n*x^(n-1), and a coefficient just rides along untouched, which gives the power rule a*n*x^(n-1).",
      "This agrees with the straight lines you already know. The line y = ax has constant gradient a (rise over run), and the rule gives the same thing: d/dx(ax) = a*1*x^0 = a. A constant like y = 7 is a horizontal line with slope 0 everywhere, so its derivative is 0; its value never changes as x changes, so its rate of change is nothing.",
      "In NSW exams this is why a question can ask for the gradient of a curve, or the rate of change at a moment, just by asking you to differentiate and then substitute the x-value: the derivative's value at a point IS the slope of the curve there.",
    ],
    latexBlocks: [
      "f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}",
      "\\frac{d}{dx}\\left(x^2\\right)=\\lim_{h\\to 0}\\frac{(x+h)^2-x^2}{h}=\\lim_{h\\to 0}(2x+h)=2x",
      "\\frac{d}{dx}\\left(ax^n\\right)=anx^{n-1}",
      "\\frac{d}{dx}\\left(c\\right)=0",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: The slope of y = x^2 from first principles",
      questionLatex:
        "\\text{Use the limit definition to differentiate } y=x^2.",
      steps: [
        {
          explanation:
            "Start from the limit definition of the derivative used in the previous lesson, with f(x)=x^2. This measures the gradient of the tangent at x.",
          latex: "f'(x)=\\lim_{h\\to 0}\\frac{(x+h)^2-x^2}{h}",
        },
        {
          explanation:
            "Expand the squared bracket, since (x+h)(x+h)=x^2+2xh+h^2. We expand so the x^2 terms can be compared and cancelled.",
          latex: "=\\lim_{h\\to 0}\\frac{x^2+2xh+h^2-x^2}{h}",
        },
        {
          explanation:
            "The x^2 terms cancel, and every remaining term on top has a factor of h, so the h divides out. We can cancel because h is not yet zero.",
          latex: "=\\lim_{h\\to 0}\\frac{2xh+h^2}{h}=\\lim_{h\\to 0}(2x+h)",
        },
        {
          explanation:
            "Now let h shrink to zero. The leftover h vanishes, so the slope at any x is 2x. Notice the exponent 2 came down to multiply and the power dropped to one.",
          latex: "=2x",
        },
      ],
      finalAnswerLatex:
        "\\frac{d}{dx}\\left(x^2\\right)=2x \\quad \\text{the slope of } y=x^2 \\text{ at any value of } x",
    },
    {
      title: "Worked example 2: The power rule on one term",
      questionLatex:
        "\\text{Differentiate } y=4x^5 \\text{ and find the gradient at } x=1.",
      steps: [
        {
          explanation:
            "Use the shortcut the derivation gives: the power comes down to multiply the coefficient, so 5 multiplies 4.",
          latex: "4 \\times 5 = 20",
        },
        {
          explanation:
            "Reduce the power by one, because each differentiation drops the exponent by one.",
          latex: "x^{5-1}=x^4",
        },
        {
          explanation:
            "Combine these to get the derivative, which is the slope of the curve at any value of x.",
          latex: "\\frac{dy}{dx}=20x^4",
        },
        {
          explanation:
            "Substitute x=1 to read off the gradient of the curve at that point.",
          latex: "20(1)^4=20",
        },
      ],
      finalAnswerLatex:
        "\\frac{dy}{dx}=20x^4, \\quad \\text{so the curve has gradient } 20 \\text{ when } x=1.",
    },
    {
      title: "Worked example 3: A negative coefficient",
      questionLatex:
        "\\text{Differentiate } y=-3x^2 \\text{ and interpret the slope at } x=2.",
      steps: [
        {
          explanation:
            "Bring the power 2 down to multiply the coefficient, keeping the negative sign attached to the coefficient.",
          latex: "-3 \\times 2 = -6",
        },
        {
          explanation: "Reduce the power by one.",
          latex: "x^{2-1}=x",
        },
        {
          explanation:
            "Combine these to get the slope function for the curve.",
          latex: "\\frac{dy}{dx}=-6x",
        },
        {
          explanation:
            "At x=2 the gradient is negative, which means the curve is falling there as x increases.",
          latex: "-6(2)=-12",
        },
      ],
      finalAnswerLatex:
        "\\frac{dy}{dx}=-6x, \\quad \\text{a gradient of } -12 \\text{ at } x=2 \\text{, so the curve is decreasing there.}",
      cartesianGraph: {
        description:
          "y = -3x^2 is a downward-opening parabola with its highest point at the origin (0, 0). A tangent line y = -12x + 12 touches the curve at P(2, -12) and slopes steeply downhill, matching the negative gradient -12 found there.",
        xMin: -1,
        xMax: 4,
        yMin: -24,
        yMax: 6,
        xStep: 1,
        yStep: 4,
        parabolas: [{ kind: "quadratic", a: -3, b: 0, c: 0, label: "y = -3x²" }],
        lines: [
          { kind: "linear", m: -12, b: 12, xMin: 1, xMax: 3, label: "tangent at x = 2, gradient -12" },
        ],
        points: [{ x: 2, y: -12, label: "P(2, -12)" }],
      },
    },
  ],

  guidedPractice: [
    {
      id: "guided-1",
      prompt: "Complete the missing value:",
      latex: "",
      answer: "4",
      hint: "The missing value is the original power.",
      explanation:
        "The original power is $4$, so the coefficient becomes $6 \\times 4 = 24$.",
    },
    {
      id: "guided-2",
      prompt: "Complete the missing exponent:",
      latex: "",
      answer: "2",
      hint: "Reduce the original power by one.",
      explanation: "The original power is 3, so the new power is 2.",
    },
    {
      id: "guided-3",
      prompt: "Differentiate:",
      latex: "-2x^5",
      answer: "-10x^4",
      hint: "Keep the negative sign, multiply 2 by 5, then reduce the power.",
      explanation:
        "Using the power rule, $\\frac{d}{dx}\\left(-2x^5\\right)=-10x^4$.",
    },
    {
      id: "guided-4",
      prompt: "Complete the missing exponent:",
      latex: "",
      answer: "6",
      hint: "The new power is one less than the original power.",
      explanation:
        "Using the power rule, $\\frac{d}{dx}\\left(6x^7\\right)=42x^6$, so the missing exponent is $6$.",
    },
  ],

  independentPractice: [
    {
      id: "ind-1",
      prompt: "Differentiate:",
      latex: "3x^2",
      answer: "6x",
      hint: "Multiply by the power 2.",
      explanation: "$\\frac{d}{dx}\\left(3x^2\\right)=6x$.",
    },
    {
      id: "ind-2",
      prompt: "Differentiate:",
      latex: "8x^5",
      answer: "40x^4",
      hint: "Multiply 8 by 5, then reduce the power.",
      explanation: "$\\frac{d}{dx}\\left(8x^5\\right)=40x^4$.",
    },
    {
      id: "ind-3",
      prompt: "Differentiate:",
      latex: "-6x^3",
      answer: "-18x^2",
      hint: "Keep the negative sign attached to the term.",
      explanation: "$\\frac{d}{dx}\\left(-6x^3\\right)=-18x^2$.",
    },
    {
      id: "ind-4",
      prompt: "Differentiate:",
      latex: "11",
      answer: "0",
      hint: "A constant differentiates to zero.",
      explanation: "$\\frac{d}{dx}\\left(11\\right)=0$.",
    },
    {
      id: "ind-5",
      prompt:
        "A revenue model includes the term below. Find its marginal contribution.",
      latex: "-8x^3",
      answer: "-24x^2",
      hint: "Differentiate the term with respect to $x$.",
      explanation:
        "$\\frac{d}{dx}\\left(-8x^3\\right)=-24x^2$. This is a transfer use of the same power rule in a context.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to multiply by the power.",
      fix: "Students stop after lowering the power because that change is the most visible part of the rule. But the derivation shows the power also comes down to multiply: for $4x^5$ the coefficient becomes $4 \\times 5 = 20$.",
    },
    {
      mistake: "Reducing the coefficient instead of the power.",
      fix: "The coefficient and the exponent are both just numbers in the term, so under pressure it is easy to change the wrong one. Only the power reduces by 1; the coefficient is multiplied by the original power.",
    },
    {
      mistake: "Forgetting that constants differentiate to zero.",
      fix: "Students expect every term to turn into something, so leaving a constant in feels safer than removing it. A constant is a horizontal line with zero slope, so a constant like $-9$ has derivative $0$.",
    },
    {
      mistake: "Dropping negative signs.",
      fix: "Students focus on the coefficient-and-power arithmetic and treat the sign as separate, so it gets left behind. Keep the negative sign attached to the coefficient throughout, as in $-3x^2 \\to -6x$.",
    },
  ],

  masteryQuiz: [
    {
      id: "mastery-1",
      prompt: "Differentiate:",
      latex: "7x^3",
      answer: "A",
      choices: [
        { label: "A", text: "$21x^2$" },
        { label: "B", text: "$21x^3$" },
        { label: "C", text: "$7x^2$" },
        { label: "D", text: "$10x^2$" },
      ],
      hint: "Multiply 7 by 3.",
      explanation: "$\\frac{d}{dx}\\left(7x^3\\right)=21x^2$.",
    },
    {
      id: "mastery-2",
      prompt: "Differentiate:",
      latex: "-4x^5",
      answer: "B",
      choices: [
        { label: "A", text: "$20x^4$" },
        { label: "B", text: "$-20x^4$" },
        { label: "C", text: "$-20x^5$" },
        { label: "D", text: "$-4x^4$" },
      ],
      hint: "Keep the negative sign.",
      explanation: "$\\frac{d}{dx}\\left(-4x^5\\right)=-20x^4$.",
    },
    {
      id: "mastery-3",
      prompt: "Differentiate:",
      latex: "x^6",
      answer: "C",
      choices: [
        { label: "A", text: "$x^5$" },
        { label: "B", text: "$6x^6$" },
        { label: "C", text: "$6x^5$" },
        { label: "D", text: "$x^7$" },
      ],
      hint: "The coefficient of $x^6$ is $1$.",
      explanation: "$\\frac{d}{dx}\\left(x^6\\right)=6x^5$.",
    },
    {
      id: "mastery-4",
      prompt: "Differentiate:",
      latex: "3x^{-2}",
      answer: "B",
      choices: [
        { label: "A", text: "$6x^{-1}$" },
        { label: "B", text: "$-6x^{-3}$" },
        { label: "C", text: "$3x^{-3}$" },
        { label: "D", text: "$-2x^{-3}$" },
      ],
      hint: "Use the power rule and reduce the power by 1.",
      explanation: "For $3x^{-2}$, multiply by the power and then subtract 1 from the power: $3(-2)x^{-3}=-6x^{-3}$.",
    },
    {
      id: "mastery-5",
      prompt: "Differentiate:",
      latex: "-2x^4",
      answer: "A",
      choices: [
        { label: "A", text: "$-8x^3$" },
        { label: "B", text: "$8x^3$" },
        { label: "C", text: "$-8x^4$" },
        { label: "D", text: "$-2x^3$" },
      ],
      hint: "Keep the negative sign and reduce the power.",
      explanation: "$\\frac{d}{dx}\\left(-2x^4\\right)=-8x^3$.",
    },
    {
      id: "mastery-6",
      prompt: "Differentiate:",
      latex: "12x^2",
      answer: "D",
      choices: [
        { label: "A", text: "$12x$" },
        { label: "B", text: "$24x^2$" },
        { label: "C", text: "$14x$" },
        { label: "D", text: "$24x$" },
      ],
      hint: "Multiply the coefficient by the power.",
      explanation: "$\\frac{d}{dx}\\left(12x^2\\right)=24x$.",
    },
    {
      id: "mastery-7",
      prompt:
        "A height model contains the term below. Find the derivative of this term with respect to time.",
      latex: "5t^3",
      answer: "B",
      choices: [
        { label: "A", text: "$15t^3$" },
        { label: "B", text: "$15t^2$" },
        { label: "C", text: "$5t^2$" },
        { label: "D", text: "$8t^2$" },
      ],
      hint: "Use the power rule with variable $t$.",
      explanation: "$\\frac{d}{dt}\\left(5t^3\\right)=15t^2$.",
    },
    {
      id: "mastery-8",
      prompt: "Find the coefficient of $x^3$ in the derivative:",
      latex: "\\frac{d}{dx}\\left(-7x^4\\right)",
      answer: "-28",
      hint: "Multiply $-7$ by $4$.",
      explanation:
        "$\\frac{d}{dx}\\left(-7x^4\\right)=-28x^3$, so the missing coefficient is $-28$.",
    },
    {
      id: "mastery-9",
      prompt: "Choose the correct derivative.",
      latex: "\\frac{d}{dx}\\left(-x^5\\right)",
      answer: "B",
      choices: [
        { label: "A", text: "$5x^4$" },
        { label: "B", text: "$-5x^4$" },
        { label: "C", text: "$-x^4$" },
      ],
      hint: "The coefficient is $-1$.",
      explanation:
        "$\\frac{d}{dx}\\left(-x^5\\right)=-5x^4$, so option B is correct.",
    },
    {
      id: "mastery-10",
      prompt:
        "A model includes the term below. What is its instantaneous rate contribution?",
      latex: "-3t^6",
      answer: "C",
      choices: [
        { label: "A", text: "$18t^5$" },
        { label: "B", text: "$-18t^6$" },
        { label: "C", text: "$-18t^5$" },
        { label: "D", text: "$-3t^5$" },
      ],
      hint: "Differentiate the term with respect to $t$.",
      explanation:
        "$\\frac{d}{dt}\\left(-3t^6\\right)=-18t^5$. The negative sign stays attached to the derivative.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: single-term power rule ──────────────────────────────
    {
      id: "poly-terms-pool-1",
      prompt: "Differentiate:",
      latex: "y = x^4",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$4x^3$" },
        { label: "B", text: "$4x^4$" },
        { label: "C", text: "$x^3$" },
        { label: "D", text: "$3x^3$" },
      ],
      hint: "Bring the index down and reduce it by one.",
      explanation: "$\\frac{dy}{dx} = 4x^3$.",
    },
    {
      id: "poly-terms-pool-2",
      prompt: "Differentiate:",
      latex: "y = 5x^3",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$15x^2$" },
        { label: "B", text: "$5x^2$" },
        { label: "C", text: "$15x^3$" },
        { label: "D", text: "$8x^2$" },
      ],
      hint: "Multiply the coefficient by the index.",
      explanation: "Multiplying the coefficient by the index gives $15x^2$.",
    },
    {
      id: "poly-terms-pool-3",
      prompt: "Differentiate:",
      latex: "y = 2x^6",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$12x^5$" },
        { label: "B", text: "$2x^5$" },
        { label: "C", text: "$12x^6$" },
        { label: "D", text: "$8x^5$" },
      ],
      hint: "Multiply 2 by 6, then drop the index by one.",
      explanation: "$\\frac{dy}{dx} = 12x^5$.",
    },
    {
      id: "poly-terms-pool-4",
      prompt: "Differentiate:",
      latex: "y = x",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$x$" },
        { label: "C", text: "$0$" },
        { label: "D", text: "$2x$" },
      ],
      hint: "The derivative of $x$ is a constant.",
      explanation: "$\\frac{dy}{dx} = 1$.",
    },
    {
      id: "poly-terms-pool-5",
      prompt: "Differentiate:",
      latex: "y = 6x^2",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$12x$" },
        { label: "B", text: "$6x$" },
        { label: "C", text: "$12x^2$" },
        { label: "D", text: "$8x$" },
      ],
      hint: "Multiply the coefficient by the index.",
      explanation: "$\\frac{dy}{dx} = 12x$.",
    },
    {
      id: "poly-terms-pool-6",
      prompt: "Differentiate the constant:",
      latex: "y = 10",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$0$" },
        { label: "B", text: "$10$" },
        { label: "C", text: "$10x$" },
        { label: "D", text: "$1$" },
      ],
      hint: "A constant has zero gradient.",
      explanation: "The derivative of a constant is $0$.",
    },
    // ── Difficulty 2: negative coefficients / larger terms ────────────────
    {
      id: "poly-terms-pool-7",
      prompt: "Differentiate:",
      latex: "y = -3x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$-6x$" },
        { label: "B", text: "$6x$" },
        { label: "C", text: "$-3x$" },
        { label: "D", text: "$-6x^2$" },
      ],
      hint: "Keep the negative sign attached to the coefficient.",
      explanation: "$\\frac{dy}{dx} = -6x$.",
    },
    {
      id: "poly-terms-pool-8",
      prompt: "Differentiate:",
      latex: "y = -x^5",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$-5x^4$" },
        { label: "B", text: "$5x^4$" },
        { label: "C", text: "$-x^4$" },
        { label: "D", text: "$-5x^5$" },
      ],
      hint: "The coefficient is $-1$; multiply it by the index.",
      explanation: "$\\frac{dy}{dx} = -5x^4$.",
    },
    {
      id: "poly-terms-pool-9",
      prompt: "Differentiate:",
      latex: "y = 7x^4",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$28x^3$" },
        { label: "B", text: "$7x^3$" },
        { label: "C", text: "$28x^4$" },
        { label: "D", text: "$11x^3$" },
      ],
      hint: "Multiply 7 by 4.",
      explanation: "$\\frac{dy}{dx} = 28x^3$.",
    },
    {
      id: "poly-terms-pool-10",
      prompt: "Differentiate:",
      latex: "y = -8x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$-8$" },
        { label: "B", text: "$8$" },
        { label: "C", text: "$-8x$" },
        { label: "D", text: "$0$" },
      ],
      hint: "The derivative of $kx$ is $k$.",
      explanation: "$\\frac{dy}{dx} = -8$.",
    },
    {
      id: "poly-terms-pool-11",
      prompt: "Differentiate:",
      latex: "y = -4x^3",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$-12x^2$" },
        { label: "B", text: "$12x^2$" },
        { label: "C", text: "$-4x^2$" },
        { label: "D", text: "$-12x^3$" },
      ],
      hint: "Multiply $-4$ by 3.",
      explanation: "$\\frac{dy}{dx} = -12x^2$.",
    },
    {
      id: "poly-terms-pool-12",
      prompt: "Differentiate:",
      latex: "y = 9x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$18x$" },
        { label: "B", text: "$9x$" },
        { label: "C", text: "$18x^2$" },
        { label: "D", text: "$11x$" },
      ],
      hint: "Multiply the coefficient by the index.",
      explanation: "$\\frac{dy}{dx} = 18x$.",
    },
    // ── Difficulty 3: differentiate a term, then evaluate ─────────────────
    {
      id: "poly-terms-pool-13",
      prompt: "Given the function below, find $f'(2)$.",
      latex: "f(x) = x^3",
      difficulty: 3,
      answer: "12",
      hint: "$f'(x) = 3x^2$; substitute $x = 2$.",
      explanation: "$f'(x) = 3x^2$, so $f'(2) = 12$.",
    },
    {
      id: "poly-terms-pool-14",
      prompt: "Given the function below, find $f'(3)$.",
      latex: "f(x) = 4x^2",
      difficulty: 3,
      answer: "24",
      hint: "$f'(x) = 8x$; substitute $x = 3$.",
      explanation: "$f'(x) = 8x$, so $f'(3) = 24$.",
    },
    {
      id: "poly-terms-pool-15",
      prompt: "Given the function below, find $f'(1)$.",
      latex: "f(x) = 2x^4",
      difficulty: 3,
      answer: "8",
      hint: "$f'(x) = 8x^3$; substitute $x = 1$.",
      explanation: "$f'(x) = 8x^3$, so $f'(1) = 8$.",
    },
    {
      id: "poly-terms-pool-16",
      prompt: "Given the function below, find $f'(2)$.",
      latex: "f(x) = -3x^2",
      difficulty: 3,
      answer: "-12",
      hint: "$f'(x) = -6x$; substitute $x = 2$.",
      explanation: "$f'(x) = -6x$, so $f'(2) = -12$.",
    },
    {
      id: "poly-terms-pool-17",
      prompt: "Given the function below, find $f'(-1)$.",
      latex: "f(x) = 5x^3",
      difficulty: 3,
      answer: "15",
      hint: "$f'(x) = 15x^2$; substitute $x = -1$.",
      explanation: "$f'(x) = 15x^2$, so $f'(-1) = 15$.",
    },
    {
      id: "poly-terms-pool-18",
      prompt: "Given the function below, find $f'(2)$.",
      latex: "f(x) = x^5",
      difficulty: 3,
      answer: "80",
      hint: "$f'(x) = 5x^4$; substitute $x = 2$.",
      explanation: "$f'(x) = 5x^4$, so $f'(2) = 80$.",
    },
    // ── Difficulty 4: two-term expressions ────────────────────────────────
    {
      id: "poly-terms-pool-19",
      prompt: "Differentiate:",
      latex: "y = x^2 + 5x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$2x + 5$" },
        { label: "B", text: "$2x$" },
        { label: "C", text: "$x + 5$" },
        { label: "D", text: "$2x + 5x$" },
      ],
      hint: "Differentiate each term.",
      explanation: "$\\frac{dy}{dx} = 2x + 5$.",
    },
    {
      id: "poly-terms-pool-20",
      prompt: "Differentiate:",
      latex: "y = 3x^3 - 2x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$9x^2 - 2$" },
        { label: "B", text: "$9x^2 - 2x$" },
        { label: "C", text: "$3x^2 - 2$" },
        { label: "D", text: "$9x^3 - 2$" },
      ],
      hint: "The derivative of $-2x$ is $-2$.",
      explanation: "$\\frac{dy}{dx} = 9x^2 - 2$.",
    },
    {
      id: "poly-terms-pool-21",
      prompt: "Differentiate:",
      latex: "y = x^4 + 2x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$4x^3 + 4x$" },
        { label: "B", text: "$4x^3 + 2x$" },
        { label: "C", text: "$4x^3 + 4x^2$" },
        { label: "D", text: "$x^3 + 4x$" },
      ],
      hint: "Differentiate each term using the power rule.",
      explanation: "$\\frac{dy}{dx} = 4x^3 + 4x$.",
    },
    {
      id: "poly-terms-pool-22",
      prompt: "Differentiate:",
      latex: "y = 6x - x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$6 - 2x$" },
        { label: "B", text: "$6 - x$" },
        { label: "C", text: "$6x - 2x$" },
        { label: "D", text: "$-2x$" },
      ],
      hint: "The derivative of $6x$ is $6$.",
      explanation: "$\\frac{dy}{dx} = 6 - 2x$.",
    },
    {
      id: "poly-terms-pool-23",
      prompt: "Differentiate:",
      latex: "y = 2x^3 + 3x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$6x^2 + 6x$" },
        { label: "B", text: "$6x^2 + 3x$" },
        { label: "C", text: "$2x^2 + 6x$" },
        { label: "D", text: "$6x^2 + 6$" },
      ],
      hint: "Differentiate each term.",
      explanation: "$\\frac{dy}{dx} = 6x^2 + 6x$.",
    },
    {
      id: "poly-terms-pool-24",
      prompt: "Differentiate:",
      latex: "y = -x^3 + 4x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$-3x^2 + 4$" },
        { label: "B", text: "$3x^2 + 4$" },
        { label: "C", text: "$-3x^2 + 4x$" },
        { label: "D", text: "$-x^2 + 4$" },
      ],
      hint: "Keep the sign on the cubic term.",
      explanation: "$\\frac{dy}{dx} = -3x^2 + 4$.",
    },
    // ── Difficulty 5: solve / evaluate (multi-step) ───────────────────────
    {
      id: "poly-terms-pool-25",
      prompt: "Find the positive value of $x$ for which the gradient is 12.",
      latex: "f(x) = x^3",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Set $f'(x) = 3x^2$ equal to 12 and take the positive root.",
      explanation: "$3x^2 = 12 \\Rightarrow x^2 = 4 \\Rightarrow x = 2$ (positive).",
    },
    {
      id: "poly-terms-pool-26",
      prompt: "Find the value of $x$ for which the gradient is 8.",
      latex: "f(x) = 2x^2",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Set $f'(x) = 4x$ equal to 8.",
      explanation: "$4x = 8 \\Rightarrow x = 2$.",
    },
    {
      id: "poly-terms-pool-27",
      prompt: "Given the function below, find $f'(2)$.",
      latex: "f(x) = x^2 + 3x",
      difficulty: 5,
      answer: "7",
      hint: "$f'(x) = 2x + 3$; substitute $x = 2$.",
      explanation: "$f'(x) = 2x + 3$, so $f'(2) = 7$.",
    },
    {
      id: "poly-terms-pool-28",
      prompt: "Given the function below, find $f'(2)$.",
      latex: "f(x) = x^3 - x",
      difficulty: 5,
      answer: "11",
      hint: "$f'(x) = 3x^2 - 1$; substitute $x = 2$.",
      explanation: "$f'(x) = 3x^2 - 1$, so $f'(2) = 12 - 1 = 11$.",
    },
    {
      id: "poly-terms-pool-29",
      prompt: "Given the function below, find $f'(0)$.",
      latex: "f(x) = 5x^2 - 2x",
      difficulty: 5,
      answer: "-2",
      hint: "$f'(x) = 10x - 2$; substitute $x = 0$.",
      explanation: "$f'(x) = 10x - 2$, so $f'(0) = -2$.",
    },
    {
      id: "poly-terms-pool-30",
      prompt: "Find the positive value of $x$ for which the gradient is 24.",
      latex: "f(x) = 2x^3",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Set $f'(x) = 6x^2$ equal to 24.",
      explanation: "$6x^2 = 24 \\Rightarrow x^2 = 4 \\Rightarrow x = 2$ (positive).",
    },
  ],

  masteryPassMark: 0.8,
};

export const differentiatingPolynomialFunctionsLesson: ExplicitLesson = {
  id: "differentiating-polynomial-functions",
  slug: "differentiating-polynomial-functions",
  moduleSlug: "ma-c1-introduction-to-differentiation",
  moduleTitle: "Introduction to Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Differentiating Polynomial Functions",
  description:
    "Learn how to differentiate full polynomial functions term-by-term using correct derivative notation and simplification.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Differentiating Polynomial Functions",
    url: "https://www.youtube.com/embed/I8IM9P-2TRU",
  },

  learningIntention:
    "Learn how to differentiate polynomial functions by applying the power rule to each term.",

  successCriteria: [
    "Use derivative notation correctly, including $f'(x)$ and $\\frac{dy}{dx}$.",
    "Differentiate each term in a polynomial function.",
    "Simplify the derivative after differentiating.",
    "Correctly differentiate constant and linear terms.",
    "Avoid sign errors when differentiating negative terms.",
  ],

  teaching: {
    paragraphs: [
      "A polynomial function is several power-of-x terms added or subtracted, like 4x^5 - 3x^2 + 7x - 9. Last lesson the power rule gave you the slope function of a single term. The key idea here is that the slope of the whole curve at any x is just the sum of the slopes each term contributes, so the derivative is again a slope function, only this time built one term at a time.",
      "See it on a small case first. For f(x) = x^2 + 3, the x^2 part has slope 2x at every x (the result from the previous lesson), and the +3 is a flat horizontal piece with slope 0. Adding these, the curve's gradient is 2x + 0 = 2x. Graphically, sliding the whole parabola up by 3 does not tilt it anywhere, so its steepness is unchanged, which is exactly why the constant adds nothing to the slope.",
      "Two rules make this term-by-term approach legitimate. The sum and difference rule says the derivative of a sum is the sum of the derivatives, because the rise of the whole curve over a tiny run is just the rises of its parts added together. The constant-multiple rule says a number multiplying a term scales its slope by that same number, since stretching a graph vertically by a factor stretches every gradient by that factor. With those two facts, you simply apply the single-term power rule from last lesson, anx^(n-1), to each term in turn.",
      "The mistakes to guard against come from the simplest terms. A constant such as -9 differentiates to 0 because its graph is a horizontal line, and a horizontal line has zero slope: its value never changes as x changes, so its rate of change is nothing. A linear term like 7x differentiates to just 7, the constant gradient of that straight line. Keep each sign attached to its term before differentiating, or a -3x^2 quietly becomes +6x instead of -6x.",
      "In NSW exams this is the gateway skill. Once you have f'(x), substituting an x-value gives the gradient of the curve, and therefore the slope of the tangent, at that point. A question asking for a rate of change, or for the gradient of a tangent, is really just asking you to differentiate and then substitute.",
    ],
    latexBlocks: [
      "\\frac{d}{dx}\\left(ax^n\\right)=anx^{n-1} \\qquad \\frac{d}{dx}\\left(c\\right)=0",
      "\\frac{d}{dx}\\left(u(x)\\pm v(x)\\right)=\\frac{d}{dx}u(x)\\pm\\frac{d}{dx}v(x)",
      "f(x)=4x^5-3x^2+7x-9 \\;\\Rightarrow\\; f'(x)=20x^4-6x+7",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Differentiate a polynomial function",
      questionLatex: "f(x)=4x^5-3x^2+7x-9",
      steps: [
        {
          explanation:
            "By the sum and difference rule, the slope of the whole curve is the sum of the slopes of its terms, so differentiate each term separately and keep its + or - sign.",
          latex:
            "f'(x)=\\frac{d}{dx}\\left(4x^5\\right)-\\frac{d}{dx}\\left(3x^2\\right)+\\frac{d}{dx}\\left(7x\\right)-\\frac{d}{dx}\\left(9\\right)",
        },
        {
          explanation:
            "Apply the power rule to 4x^5: the exponent 5 comes down to multiply the coefficient, and the power drops by one.",
          latex: "\\frac{d}{dx}\\left(4x^5\\right)=4\\times 5\\,x^{4}=20x^4",
        },
        {
          explanation:
            "For -3x^2 the constant-multiple rule lets the -3 ride along and just scale the slope; the power rule brings the 2 down and drops the power.",
          latex: "\\frac{d}{dx}\\left(-3x^2\\right)=-3\\times 2\\,x=-6x",
        },
        {
          explanation:
            "The linear term 7x is a straight line of constant gradient 7, so it differentiates to 7; the constant -9 is a flat line with zero slope, so it contributes 0.",
          latex:
            "\\frac{d}{dx}\\left(7x\\right)=7, \\qquad \\frac{d}{dx}\\left(-9\\right)=0",
        },
        {
          explanation:
            "Add the four pieces. The result is the slope function: substitute any x into f'(x) to get the gradient of the curve there.",
          latex: "f'(x)=20x^4-6x+7",
        },
      ],
      finalAnswerLatex:
        "f'(x)=20x^4-6x+7 \\quad \\text{the gradient of the curve at any value of } x",
    },
    {
      title: "Worked example 2: Reading a gradient with dy/dx notation",
      questionLatex:
        "\\text{Differentiate } y=2x^4-5x^3+x-11 \\text{ and find the gradient at } x=1.",
      steps: [
        {
          explanation:
            "The function is written as y, so its slope function is written dy/dx. The sum and difference rule splits it into one derivative per term.",
          latex:
            "\\frac{dy}{dx}=\\frac{d}{dx}\\left(2x^4\\right)-\\frac{d}{dx}\\left(5x^3\\right)+\\frac{d}{dx}\\left(x\\right)-\\frac{d}{dx}\\left(11\\right)",
        },
        {
          explanation:
            "Apply the power rule to the two higher-power terms: bring each exponent down to multiply, then reduce the power by one.",
          latex:
            "\\frac{d}{dx}\\left(2x^4\\right)=8x^3, \\qquad \\frac{d}{dx}\\left(5x^3\\right)=15x^2",
        },
        {
          explanation:
            "The term x is a line of gradient 1, so it differentiates to 1; the constant -11 is flat, so its slope is 0.",
          latex:
            "\\frac{d}{dx}\\left(x\\right)=1, \\qquad \\frac{d}{dx}\\left(11\\right)=0",
        },
        {
          explanation:
            "Combine the pieces to get the slope function, then substitute x=1 to read off the gradient there. The negative value means the curve is falling at that point.",
          latex: "\\frac{dy}{dx}=8x^3-15x^2+1, \\quad \\text{at } x=1:\\;8-15+1=-6",
        },
      ],
      finalAnswerLatex:
        "\\frac{dy}{dx}=8x^3-15x^2+1, \\quad \\text{gradient } -6 \\text{ at } x=1 \\text{ (curve falling)}",
      cartesianGraph: {
        description:
          "The point P(1, -13) sits on the quartic y = 2x^4 - 5x^3 + x - 11. The tangent line y = -6x - 7 is drawn through P as a short segment; its downhill slope -6 is exactly the gradient dy/dx at x = 1, so the tangent shows the direction the curve is travelling there.",
        xMin: -0.5,
        xMax: 2.5,
        yMin: -22,
        yMax: -4,
        xStep: 0.5,
        yStep: 2,
        lineSegments: [
          { from: { x: 0, y: -7 }, to: { x: 2, y: -19 }, label: "tangent at x = 1, gradient -6" },
        ],
        points: [{ x: 1, y: -13, label: "P(1, -13)" }],
      },
    },
  ],

  guidedPractice: [
    {
      id: "poly-fn-guided-1",
      prompt: "Complete the derivative:",
      latex: "",
      answer: "12",
      hint: "Differentiate $3x^4$.",
      explanation:
        "$\\frac{d}{dx}\\left(3x^4\\right)=12x^3$, so $f'(x)=12x^3-4x$.",
    },
    {
      id: "poly-fn-guided-2",
      prompt: "Complete the derivative:",
      latex: "",
      answer: "-8",
      hint: "The derivative of $-8x$ is $-8$.",
      explanation: "$\\frac{dy}{dx}=30x^4+2x-8$.",
    },
    {
      id: "poly-fn-guided-3",
      prompt: "Complete the missing term:",
      latex: "",
      answer: "6x",
      hint: "Differentiate $3x^2$.",
      explanation:
        "$\\frac{d}{dx}\\left(3x^2\\right)=6x$, so $f'(x)=4x^3+6x$.",
    },
    {
      id: "poly-fn-guided-4",
      prompt:
        "Choose the correct next term in the derivative. A: $+5$, B: $+5x$, C: $0$.",
      latex: "f(x)=3x^4-2x^2+5x-9",
      answer: "A",
      choices: [
        { label: "A", text: "$+5$" },
        { label: "B", text: "$+5x$" },
        { label: "C", text: "$0$" },
      ],
      hint: "The derivative of $5x$ is a constant.",
      explanation:
        "$\\frac{d}{dx}(5x)=5$, so the next derivative term is $+5$. Option A is correct.",
    },
  ],

  independentPractice: [
    {
      id: "poly-fn-ind-1",
      prompt: "Differentiate:",
      latex: "f(x)=x^4+3x^2-7",
      answer: "4x^3+6x",
      hint: "Differentiate each term separately.",
      explanation: "$f'(x)=4x^3+6x$.",
    },
    {
      id: "poly-fn-ind-2",
      prompt: "Differentiate:",
      latex: "y=-2x^5+4x^3-9x",
      answer: "-10x^4+12x^2-9",
      hint: "Keep the negative sign on $-2x^5$.",
      explanation: "$\\frac{dy}{dx}=-10x^4+12x^2-9$.",
    },
    {
      id: "poly-fn-ind-3",
      prompt: "Differentiate:",
      latex: "f(x)=5x^6-3x^4+x^2-12",
      answer: "30x^5-12x^3+2x",
      hint: "The derivative of $-12$ is $0$.",
      explanation: "$f'(x)=30x^5-12x^3+2x$.",
    },
    {
      id: "poly-fn-ind-4",
      prompt: "Differentiate:",
      latex: "y=9x^3-4x^2+6",
      answer: "27x^2-8x",
      hint: "The derivative of $6$ is $0$.",
      explanation: "$\\frac{dy}{dx}=27x^2-8x$.",
    },
    {
      id: "poly-fn-ind-5",
      prompt:
        "A particle has displacement $s(t)$. Find the velocity function.",
      latex: "s(t)=-t^4+6t^2-3t+8",
      answer: "-4t^3+12t-3",
      hint: "Velocity is the derivative of displacement.",
      explanation:
        "$v(t)=s'(t)=-4t^3+12t-3$. The constant $8$ contributes $0$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Forgetting to differentiate every term.",
      fix: "Move through the function term-by-term from left to right.",
    },
    {
      mistake: "Forgetting that constants differentiate to zero.",
      fix: "A constant such as $5$ or $-12$ graphs as a horizontal line, and a horizontal line has zero slope, so its rate of change is $0$ and the term disappears in the derivative.",
    },
    {
      mistake: "Losing negative signs.",
      fix: "Keep the sign attached to the term before applying the power rule, otherwise $-3x^2$ becomes $+6x$ instead of $-6x$.",
    },
    {
      mistake: "Using the wrong notation.",
      fix: "Use $f'(x)$ when the function is written as $f(x)$, and $\\frac{dy}{dx}$ when it is written as $y$.",
    },
  ],

  masteryQuiz: [
    {
      id: "poly-fn-mastery-1",
      prompt: "Differentiate:",
      latex: "f(x)=2x^5-4x^2+3x-1",
      answer: "A",
      choices: [
        { label: "A", text: "$10x^4-8x+3$" },
        { label: "B", text: "$10x^4-8x$" },
        { label: "C", text: "$2x^4-4x+3$" },
        { label: "D", text: "$10x^5-8x+3$" },
      ],
      hint: "Differentiate each term and remember the constant becomes 0.",
      explanation: "$f'(x)=10x^4-8x+3$.",
    },
    {
      id: "poly-fn-mastery-2",
      prompt: "Differentiate:",
      latex: "y=-x^4+6x^3-2x",
      answer: "B",
      choices: [
        { label: "A", text: "$4x^3+18x^2-2$" },
        { label: "B", text: "$-4x^3+18x^2-2$" },
        { label: "C", text: "$-x^3+18x^2-2$" },
        { label: "D", text: "$-4x^3+18x^2-2x$" },
      ],
      hint: "The derivative of $-x^4$ is $-4x^3$.",
      explanation: "$\\frac{dy}{dx}=-4x^3+18x^2-2$.",
    },
    {
      id: "poly-fn-mastery-3",
      prompt: "Differentiate:",
      latex: "f(x)=7x^3-x^2+9",
      answer: "C",
      choices: [
        { label: "A", text: "$21x^2-2x+9$" },
        { label: "B", text: "$7x^2-2x$" },
        { label: "C", text: "$21x^2-2x$" },
        { label: "D", text: "$21x^3-2x$" },
      ],
      hint: "The derivative of $9$ is $0$.",
      explanation: "$f'(x)=21x^2-2x$.",
    },
    {
      id: "poly-fn-mastery-4",
      prompt: "Differentiate:",
      latex: "y=3x^6-5x^2+8x",
      answer: "D",
      choices: [
        { label: "A", text: "$18x^6-10x+8$" },
        { label: "B", text: "$18x^5-5x+8$" },
        { label: "C", text: "$18x^5-10x$" },
        { label: "D", text: "$18x^5-10x+8$" },
      ],
      hint: "Differentiate each term separately.",
      explanation: "$\\frac{dy}{dx}=18x^5-10x+8$.",
    },
    {
      id: "poly-fn-mastery-5",
      prompt: "Differentiate:",
      latex: "f(x)=-2x^4+x^3-11",
      answer: "A",
      choices: [
        { label: "A", text: "$-8x^3+3x^2$" },
        { label: "B", text: "$8x^3+3x^2$" },
        { label: "C", text: "$-8x^3+3x^2-11$" },
        { label: "D", text: "$-2x^3+3x^2$" },
      ],
      hint: "The derivative of $-11$ is $0$.",
      explanation: "$f'(x)=-8x^3+3x^2$.",
    },
    {
      id: "poly-fn-mastery-6",
      prompt: "Differentiate:",
      latex: "y=4x^4-2x^2+9",
      answer: "B",
      choices: [
        { label: "A", text: "$16x^3-4x+9$" },
        { label: "B", text: "$16x^3-4x$" },
        { label: "C", text: "$4x^3-2x$" },
        { label: "D", text: "$16x^4-4x$" },
      ],
      hint: "Differentiate each term, and remember the constant disappears.",
      explanation: "$\\frac{dy}{dx}=16x^3-4x$.",
    },
    {
      id: "poly-fn-mastery-7",
      prompt: "Find the gradient of the curve at $x=2$:",
      latex: "f(x)=x^3+2x^2",
      answer: "20",
      hint: "Find $f'(x)$, then substitute $x=2$.",
      explanation:
        "$f'(x)=3x^2+4x$, so $f'(2)=3(2)^2+4(2)=20$.",
    },
    {
      id: "poly-fn-mastery-8",
      prompt: "Find the derivative of the constant term:",
      latex: "P(x)=6x^3-4x+18",
      answer: "0",
      hint: "Constants do not change as $x$ changes.",
      explanation:
        "The derivative of any constant is $0$, so the constant term contributes nothing to $P'(x)$.",
    },
    {
      id: "poly-fn-mastery-9",
      prompt: "A displacement function is given. Find the velocity function.",
      latex: "s(t)=2t^3-5t^2+t",
      answer: "C",
      choices: [
        { label: "A", text: "$6t^2-10t$" },
        { label: "B", text: "$2t^2-5t+1$" },
        { label: "C", text: "$6t^2-10t+1$" },
        { label: "D", text: "$6t^3-10t+1$" },
      ],
      hint: "Velocity is the derivative of displacement.",
      explanation:
        "$v(t)=s'(t)=6t^2-10t+1$. This is a standard rate-of-change use of differentiation.",
    },
    {
      id: "poly-fn-mastery-10",
      prompt:
        "Choose the correct derivative. A: $-4x^3+6x-8$, B: $-4x^3+3x-8$, C: $4x^3+6x-8$.",
      latex: "f(x)=-x^4+3x^2-8x+5",
      answer: "A",
      choices: [
        { label: "A", text: "$-4x^3+6x-8$" },
        { label: "B", text: "$-4x^3+3x-8$" },
        { label: "C", text: "$4x^3+6x-8$" },
      ],
      hint: "Differentiate each term and keep the negative sign on $-x^4$.",
      explanation:
        "$f'(x)=-4x^3+6x-8$. The constant $5$ differentiates to $0$, so option A is correct.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). Each attempt draws a
  // fresh easy→hard set via buildMasteryQuiz, so retakes vary. All answers
  // SymPy-verified.
  masteryQuizPool: [
    // ── Difficulty 1: single-term power rule ──────────────────────────────
    {
      id: "poly-fn-pool-1",
      prompt: "Differentiate:",
      latex: "y = x^5",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$5x^4$" },
        { label: "B", text: "$5x^5$" },
        { label: "C", text: "$x^4$" },
        { label: "D", text: "$4x^4$" },
      ],
      hint: "Power rule: multiply by the index, then drop the index by one.",
      explanation: "$\\frac{dy}{dx} = 5x^4$.",
    },
    {
      id: "poly-fn-pool-2",
      prompt: "Differentiate:",
      latex: "y = x^8",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$8x^7$" },
        { label: "B", text: "$8x^8$" },
        { label: "C", text: "$x^7$" },
        { label: "D", text: "$7x^8$" },
      ],
      hint: "Bring the 8 down and reduce the index by one.",
      explanation: "$\\frac{dy}{dx} = 8x^7$.",
    },
    {
      id: "poly-fn-pool-3",
      prompt: "Differentiate:",
      latex: "y = 3x^2",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$6x$" },
        { label: "B", text: "$3x$" },
        { label: "C", text: "$6x^2$" },
        { label: "D", text: "$5x$" },
      ],
      hint: "Multiply the coefficient by the index.",
      explanation: "Multiplying the coefficient by the index gives $6x$.",
    },
    {
      id: "poly-fn-pool-4",
      prompt: "Differentiate:",
      latex: "y = 7x",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$7$" },
        { label: "B", text: "$7x$" },
        { label: "C", text: "$0$" },
        { label: "D", text: "$1$" },
      ],
      hint: "The derivative of $kx$ is the constant $k$.",
      explanation: "$\\frac{dy}{dx} = 7$.",
    },
    {
      id: "poly-fn-pool-5",
      prompt: "Differentiate:",
      latex: "y = x^{10}",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$10x^9$" },
        { label: "B", text: "$10x^{10}$" },
        { label: "C", text: "$x^9$" },
        { label: "D", text: "$9x^{10}$" },
      ],
      hint: "Bring the index down and subtract one from it.",
      explanation: "$\\frac{dy}{dx} = 10x^9$.",
    },
    {
      id: "poly-fn-pool-6",
      prompt: "Differentiate:",
      latex: "y = 4x^3",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$12x^2$" },
        { label: "B", text: "$4x^2$" },
        { label: "C", text: "$12x^3$" },
        { label: "D", text: "$7x^2$" },
      ],
      hint: "Multiply 4 by 3, then reduce the index.",
      explanation: "Multiplying the coefficient by the index gives $12x^2$.",
    },
    {
      id: "poly-fn-pool-7",
      prompt: "Differentiate the constant function:",
      latex: "y = 9",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$0$" },
        { label: "B", text: "$9$" },
        { label: "C", text: "$9x$" },
        { label: "D", text: "$1$" },
      ],
      hint: "A constant has a gradient of zero everywhere.",
      explanation: "The derivative of any constant is $0$.",
    },
    // ── Difficulty 2: polynomials (sums of terms) ─────────────────────────
    {
      id: "poly-fn-pool-8",
      prompt: "Differentiate:",
      latex: "y = x^2 + 3x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$2x + 3$" },
        { label: "B", text: "$2x$" },
        { label: "C", text: "$x + 3$" },
        { label: "D", text: "$2x + 3x$" },
      ],
      hint: "Differentiate each term separately.",
      explanation: "$\\frac{dy}{dx} = 2x + 3$.",
    },
    {
      id: "poly-fn-pool-9",
      prompt: "Differentiate:",
      latex: "y = x^3 - 5x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$3x^2 - 10x$" },
        { label: "B", text: "$3x^2 - 5x$" },
        { label: "C", text: "$x^2 - 10x$" },
        { label: "D", text: "$3x^2 - 10$" },
      ],
      hint: "Apply the power rule to each term.",
      explanation: "$\\frac{dy}{dx} = 3x^2 - 10x$.",
    },
    {
      id: "poly-fn-pool-10",
      prompt: "Differentiate:",
      latex: "y = 2x^3 + 4x - 1",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$6x^2 + 4$" },
        { label: "B", text: "$6x^2 + 4x$" },
        { label: "C", text: "$2x^2 + 4$" },
        { label: "D", text: "$6x^2 + 4 - 1$" },
      ],
      hint: "The $-1$ is a constant, so it differentiates to 0.",
      explanation: "$\\frac{dy}{dx} = 6x^2 + 4$.",
    },
    {
      id: "poly-fn-pool-11",
      prompt: "Differentiate:",
      latex: "y = 5x^4 - 2x^2 + 7",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$20x^3 - 4x$" },
        { label: "B", text: "$20x^3 - 4x + 7$" },
        { label: "C", text: "$20x^3 - 2x$" },
        { label: "D", text: "$5x^3 - 4x$" },
      ],
      hint: "Differentiate term by term; the constant disappears.",
      explanation: "$\\frac{dy}{dx} = 20x^3 - 4x$.",
    },
    {
      id: "poly-fn-pool-12",
      prompt: "Differentiate:",
      latex: "y = x^3 + x^2 + x + 1",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$3x^2 + 2x + 1$" },
        { label: "B", text: "$3x^2 + 2x$" },
        { label: "C", text: "$x^2 + x + 1$" },
        { label: "D", text: "$3x^2 + 2x + 1 + 1$" },
      ],
      hint: "Differentiate each term; $x$ becomes 1 and the constant becomes 0.",
      explanation: "$\\frac{dy}{dx} = 3x^2 + 2x + 1$.",
    },
    {
      id: "poly-fn-pool-13",
      prompt: "Differentiate:",
      latex: "y = 6x^2 - 9x + 2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$12x - 9$" },
        { label: "B", text: "$12x - 9x$" },
        { label: "C", text: "$6x - 9$" },
        { label: "D", text: "$12x - 9 + 2$" },
      ],
      hint: "Differentiate each term; the $+2$ vanishes.",
      explanation: "$\\frac{dy}{dx} = 12x - 9$.",
    },
    {
      id: "poly-fn-pool-14",
      prompt: "Differentiate:",
      latex: "y = 8x^3 - 6x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$24x^2 - 6$" },
        { label: "B", text: "$24x^2 - 6x$" },
        { label: "C", text: "$8x^2 - 6$" },
        { label: "D", text: "$24x^3 - 6$" },
      ],
      hint: "Multiply 8 by 3 for the leading term; the derivative of $-6x$ is $-6$.",
      explanation: "$\\frac{dy}{dx} = 24x^2 - 6$.",
    },
    // ── Difficulty 3: differentiate, then evaluate at a point ─────────────
    {
      id: "poly-fn-pool-15",
      prompt: "Given the function below, find $f'(3)$.",
      latex: "f(x) = x^2 - 4x",
      difficulty: 3,
      answer: "2",
      hint: "Differentiate to get $f'(x) = 2x - 4$, then substitute $x = 3$.",
      explanation: "$f'(x) = 2x - 4$, so $f'(3) = 6 - 4 = 2$.",
    },
    {
      id: "poly-fn-pool-16",
      prompt: "Given the function below, find $f'(2)$.",
      latex: "f(x) = 2x^3 + x",
      difficulty: 3,
      answer: "25",
      hint: "$f'(x) = 6x^2 + 1$; substitute $x = 2$.",
      explanation: "$f'(x) = 6x^2 + 1$, so $f'(2) = 24 + 1 = 25$.",
    },
    {
      id: "poly-fn-pool-17",
      prompt: "Given the function below, find $f'(2)$.",
      latex: "f(x) = x^3 - 2x^2 + x",
      difficulty: 3,
      answer: "5",
      hint: "$f'(x) = 3x^2 - 4x + 1$; substitute $x = 2$.",
      explanation: "$f'(x) = 3x^2 - 4x + 1$, so $f'(2) = 12 - 8 + 1 = 5$.",
    },
    {
      id: "poly-fn-pool-18",
      prompt: "Given the function below, find $f'(0)$.",
      latex: "f(x) = 5x^2 - 3x + 1",
      difficulty: 3,
      answer: "-3",
      hint: "$f'(x) = 10x - 3$; substitute $x = 0$.",
      explanation: "$f'(x) = 10x - 3$, so $f'(0) = -3$.",
    },
    {
      id: "poly-fn-pool-19",
      prompt: "Given the function below, find $f'(1)$.",
      latex: "f(x) = x^4 - x",
      difficulty: 3,
      answer: "3",
      hint: "$f'(x) = 4x^3 - 1$; substitute $x = 1$.",
      explanation: "$f'(x) = 4x^3 - 1$, so $f'(1) = 4 - 1 = 3$.",
    },
    {
      id: "poly-fn-pool-20",
      prompt: "Given the function below, find $f'(-1)$.",
      latex: "f(x) = 3x^2 + 2x - 5",
      difficulty: 3,
      answer: "-4",
      hint: "$f'(x) = 6x + 2$; substitute $x = -1$.",
      explanation: "$f'(x) = 6x + 2$, so $f'(-1) = -6 + 2 = -4$.",
    },
    {
      id: "poly-fn-pool-21",
      prompt: "Given the function below, find $f'(1)$.",
      latex: "f(x) = 4x^3 - 3x^2",
      difficulty: 3,
      answer: "6",
      hint: "$f'(x) = 12x^2 - 6x$; substitute $x = 1$.",
      explanation: "$f'(x) = 12x^2 - 6x$, so $f'(1) = 12 - 6 = 6$.",
    },
    // ── Difficulty 4: rewrite/expand first, or second derivative ──────────
    {
      id: "poly-fn-pool-22",
      prompt: "Expand first, then differentiate:",
      latex: "y = x(x + 3)",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$2x + 3$" },
        { label: "B", text: "$x^2 + 3$" },
        { label: "C", text: "$2x + 3x$" },
        { label: "D", text: "$x + 3$" },
      ],
      hint: "Expand to $x^2 + 3x$ before differentiating.",
      explanation: "$y = x^2 + 3x$, so $\\frac{dy}{dx} = 2x + 3$.",
    },
    {
      id: "poly-fn-pool-23",
      prompt: "Expand first, then differentiate:",
      latex: "y = (x + 1)(x - 2)",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$2x - 1$" },
        { label: "B", text: "$2x + 1$" },
        { label: "C", text: "$2x - 2$" },
        { label: "D", text: "$x^2 - x - 2$" },
      ],
      hint: "Expand to $x^2 - x - 2$ first.",
      explanation: "$y = x^2 - x - 2$, so $\\frac{dy}{dx} = 2x - 1$.",
    },
    {
      id: "poly-fn-pool-24",
      prompt: "Expand first, then differentiate:",
      latex: "y = (2x - 1)^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$8x - 4$" },
        { label: "B", text: "$4x - 2$" },
        { label: "C", text: "$8x - 1$" },
        { label: "D", text: "$2(2x - 1)$" },
      ],
      hint: "Expand to $4x^2 - 4x + 1$ first.",
      explanation: "$y = 4x^2 - 4x + 1$, so $\\frac{dy}{dx} = 8x - 4$.",
    },
    {
      id: "poly-fn-pool-25",
      prompt: "Find the second derivative:",
      latex: "f(x) = x^4",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$12x^2$" },
        { label: "B", text: "$4x^3$" },
        { label: "C", text: "$12x^3$" },
        { label: "D", text: "$24x$" },
      ],
      hint: "Differentiate once to get $f'(x) = 4x^3$, then again.",
      explanation: "$f'(x) = 4x^3$, so $f''(x) = 12x^2$.",
    },
    {
      id: "poly-fn-pool-26",
      prompt: "Find the second derivative:",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$6x - 6$" },
        { label: "B", text: "$3x^2 - 6x$" },
        { label: "C", text: "$6x - 3$" },
        { label: "D", text: "$6x$" },
      ],
      hint: "$f'(x) = 3x^2 - 6x$; differentiate again.",
      explanation: "$f'(x) = 3x^2 - 6x$, so $f''(x) = 6x - 6$.",
    },
    {
      id: "poly-fn-pool-27",
      prompt: "Expand first, then differentiate:",
      latex: "y = x^2(x - 4)",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$3x^2 - 8x$" },
        { label: "B", text: "$2x(x - 4)$" },
        { label: "C", text: "$3x^2 - 4$" },
        { label: "D", text: "$x^2 - 8x$" },
      ],
      hint: "Expand to $x^3 - 4x^2$ first.",
      explanation: "$y = x^3 - 4x^2$, so $\\frac{dy}{dx} = 3x^2 - 8x$.",
    },
    {
      id: "poly-fn-pool-28",
      prompt: "Expand first, then differentiate:",
      latex: "y = (x + 2)(x + 3)",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$2x + 5$" },
        { label: "B", text: "$2x + 6$" },
        { label: "C", text: "$x^2 + 5x + 6$" },
        { label: "D", text: "$2x + 5x$" },
      ],
      hint: "Expand to $x^2 + 5x + 6$ first.",
      explanation: "$y = x^2 + 5x + 6$, so $\\frac{dy}{dx} = 2x + 5$.",
    },
    // ── Difficulty 5: solve gradient conditions (multi-step) ──────────────
    {
      id: "poly-fn-pool-29",
      prompt: "Find the value of $x$ where the gradient is zero.",
      latex: "f(x) = x^2 - 6x",
      difficulty: 5,
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "Set $f'(x) = 0$ and solve.",
      explanation: "$f'(x) = 2x - 6 = 0 \\Rightarrow x = 3$.",
    },
    {
      id: "poly-fn-pool-30",
      prompt: "Find the positive value of $x$ where the gradient is zero.",
      latex: "f(x) = x^3 - 12x",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Solve $f'(x) = 3x^2 - 12 = 0$ and take the positive root.",
      explanation: "$3x^2 - 12 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = 2$ (positive).",
    },
    {
      id: "poly-fn-pool-31",
      prompt: "Find the gradient of the tangent at $x = 1$.",
      latex: "y = x^2 + 2x",
      difficulty: 5,
      answer: "4",
      hint: "Differentiate, then substitute $x = 1$.",
      explanation: "$\\frac{dy}{dx} = 2x + 2$, so at $x = 1$ the gradient is $4$.",
    },
    {
      id: "poly-fn-pool-32",
      prompt: "At which $x$-values is the gradient zero?",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 2$" },
        { label: "B", text: "$x = 2$ only" },
        { label: "C", text: "$x = 0$ and $x = 3$" },
        { label: "D", text: "$x = 3$ and $x = 6$" },
      ],
      hint: "Solve $f'(x) = 3x^2 - 6x = 0$ by factorising.",
      explanation: "$3x^2 - 6x = 3x(x - 2) = 0 \\Rightarrow x = 0$ or $x = 2$.",
    },
    {
      id: "poly-fn-pool-33",
      prompt: "Find the $x$-coordinate of the stationary point.",
      latex: "f(x) = 2x^2 - 8x + 1",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "At a stationary point $f'(x) = 0$.",
      explanation: "$f'(x) = 4x - 8 = 0 \\Rightarrow x = 2$.",
    },
    {
      id: "poly-fn-pool-34",
      prompt: "Find the value of $x$ at which the gradient equals 10.",
      latex: "f(x) = x^2",
      difficulty: 5,
      answer: "5",
      acceptedAnswers: ["x=5"],
      hint: "Set $f'(x) = 10$ and solve.",
      explanation: "$f'(x) = 2x = 10 \\Rightarrow x = 5$.",
    },
    {
      id: "poly-fn-pool-35",
      prompt: "Find the gradient of the tangent to the curve at $x = 2$.",
      latex: "y = x^3",
      difficulty: 5,
      answer: "12",
      hint: "Differentiate, then substitute $x = 2$.",
      explanation: "$\\frac{dy}{dx} = 3x^2$, so at $x = 2$ the gradient is $12$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const tangentsAndNormalsLesson: ExplicitLesson = {
  id: "tangents-and-normals",
  slug: "tangents-and-normals",
  moduleSlug: "ma-c1-introduction-to-differentiation",
  moduleTitle: "Introduction to Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Tangents and Normals",
  description:
    "Use derivatives to find gradients and equations of tangents and normals to curves.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Tangents and Normals",
    url: "https://www.youtube.com/embed/N4blOA66TF8",
  },

  learningIntention:
    "Learn how to use derivatives to find equations of tangents and normals to curves.",

  successCriteria: [
    "Find the gradient of a tangent by differentiating and substituting the given $x$-coordinate.",
    "Find the point on the curve by substituting the $x$-coordinate into the original function.",
    "Use point-gradient form to write the tangent equation.",
    "Find the normal gradient using $m_n=-\\frac{1}{m_t}$ when $m_t \\ne 0$.",
    "Use point-gradient form to write the normal equation.",
  ],

  teaching: {
    paragraphs: [
      "Picture a car driving along a curved road. At any instant it points in one direction, and the straight line in that direction is the tangent: the line that just touches the curve at the point and matches the curve's instantaneous direction there. The normal is the line at right angles to the tangent through the same point, like the kerb running straight across the road. As the road bends the tangent direction keeps changing, which is exactly why we use the derivative to pin it down at a chosen point.",
      "From the previous lessons, the derivative is the slope function of the curve: substitute one $x$-value and it returns the gradient of the curve at that point. That gradient is the steepness of the tangent, because the tangent is the line travelling in the curve's instantaneous direction there. So to get the tangent's gradient at $x=a$ you do not re-derive anything: differentiate once, then substitute $x=a$.",
      "Take the curve $y=x^2+3x$ at the point where $x=2$. Differentiating gives $\\frac{dy}{dx}=2x+3$, and substituting $x=2$ gives gradient $7$, so the tangent there rises $7$ units for every $1$ across. The point itself comes from the original curve: $y=2^2+3(2)=10$, so $P=(2,10)$. Both the tangent and the normal pass through this same $P$, so we find it once.",
      "Why is the normal's gradient the negative reciprocal of the tangent's? Take any line whose gradient is $m_t=\\frac{\\text{rise}}{\\text{run}}$, so its direction is the step (run, rise). Rotating that direction by 90 degrees turns the across-step into an up-step and the up-step into a backward across-step: (run, rise) becomes (-rise, run). The rotated line therefore goes 'run' up for every 'rise' it moves backward, a gradient of $\\frac{\\text{run}}{-\\text{rise}}=-\\frac{1}{m_t}$. Equivalently the two gradients multiply to $m_t\\,m_n=\\frac{\\text{rise}}{\\text{run}}\\times\\frac{-\\text{run}}{\\text{rise}}=-1$, which is the perpendicular-gradients rule from coordinate geometry.",
      "The method is just this geometry in order. Differentiate and substitute $x=a$ for the tangent gradient $m_t$; substitute $x=a$ into the original function for the point $P=(a,f(a))$; then write each line with the point-gradient form $y-y_1=m(x-x_1)$ from coordinate geometry, using $m_t$ for the tangent and $m_n=-\\frac{1}{m_t}$ for the normal (provided $m_t\\ne 0$). If you forget a step, rebuild it from the picture rather than memorising the list.",
    ],
    latexBlocks: [
      "m_t=\\left.\\frac{dy}{dx}\\right|_{x=a}, \\qquad P=(a,\\,f(a))",
      "(\\text{run},\\,\\text{rise})\\;\\to\\;(-\\text{rise},\\,\\text{run})\\quad\\Rightarrow\\quad m_n=\\frac{\\text{run}}{-\\text{rise}}=-\\frac{1}{m_t}",
      "m_t\\cdot m_n=-1\\quad(m_t\\ne 0)",
      "y-y_1=m(x-x_1)",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Tangent only",
      questionLatex:
        "y=x^2+3x \\quad \\text{at} \\quad x=2, \\quad \\text{find the equation of the tangent.}",
      steps: [
        {
          explanation:
            "The tangent's steepness is the curve's gradient at the point, and the derivative is the gradient function, so differentiate first.",
          latex: "\\frac{dy}{dx}=2x+3",
        },
        {
          explanation:
            "Substitute $x=2$ because we want the gradient at that one point, not everywhere; this number is the tangent's slope.",
          latex: "m_t=2(2)+3=7",
        },
        {
          explanation:
            "The tangent touches the curve at the point, so find the point's height from the original function (the derivative gives slope, not position).",
          latex: "y=2^2+3(2)=10 \\quad \\Rightarrow \\quad P=(2,10)",
        },
        {
          explanation:
            "Use the point-gradient form from coordinate geometry to build the straight line through $P$ with slope $7$.",
          latex: "y-10=7(x-2)",
        },
        {
          explanation:
            "Expand to slope-intercept form. This line just touches $y=x^2+3x$ at $(2,10)$ and runs in the curve's direction there.",
          latex: "y=7x-4",
        },
      ],
      finalAnswerLatex:
        "y=7x-4 \\quad \\text{(tangent touching the curve at } (2,10) \\text{)}",
    },
    {
      title: "Worked example 2: Tangent and normal",
      questionLatex:
        "y=x^2-4x+1 \\quad \\text{at} \\quad x=3, \\quad \\text{find the equations of the tangent and normal.}",
      cartesianGraph: {
        description:
          "y = x^2 - 4x + 1 is a parabola with vertex (2, -3). Its tangent y = 2x - 8 and its normal y = -1/2 x - 1/2 are both drawn through P(3, -2). The tangent just touches the curve and runs in its direction; the normal crosses it at right angles through the same point.",
        xMin: -0.5,
        xMax: 5.5,
        yMin: -5,
        yMax: 7,
        xStep: 1,
        yStep: 1,
        parabolas: [
          { kind: "quadratic", a: 1, b: -4, c: 1, label: "y = x² - 4x + 1" },
        ],
        lines: [
          { kind: "linear", m: 2, b: -8, xMin: 1.5, xMax: 5, label: "tangent: y = 2x - 8" },
          { kind: "linear", m: -0.5, b: -0.5, xMin: 0.5, xMax: 5.5, label: "normal: y = -½x - ½" },
        ],
        points: [{ x: 3, y: -2, label: "P(3, -2)" }],
      },
      steps: [
        {
          explanation:
            "Differentiate to get the gradient function; this gives the curve's slope at any $x$.",
          latex: "\\frac{dy}{dx}=2x-4",
        },
        {
          explanation:
            "Substitute $x=3$ to read off the gradient at that point, which is the tangent's slope.",
          latex: "m_t=2(3)-4=2",
        },
        {
          explanation:
            "Find where the tangent and normal touch the curve by substituting $x=3$ into the original function.",
          latex: "y=3^2-4(3)+1=-2 \\quad \\Rightarrow \\quad P=(3,-2)",
        },
        {
          explanation:
            "Use point-gradient form with $P$ and $m_t$ to write the tangent, the line touching the curve at $(3,-2)$.",
          latex: "y+2=2(x-3) \\quad \\Rightarrow \\quad y=2x-8",
        },
        {
          explanation:
            "The normal is perpendicular at $P$, so its gradient is the negative reciprocal $m_n=-\\frac{1}{2}$; put that through the same point $P$ to get the line crossing the curve at right angles.",
          latex:
            "y+2=-\\frac{1}{2}(x-3) \\quad \\Rightarrow \\quad y=-\\frac{1}{2}x-\\frac{1}{2}",
        },
      ],
      finalAnswerLatex:
        "\\text{Tangent: } y=2x-8, \\quad \\text{Normal: } y=-\\frac{1}{2}x-\\frac{1}{2} \\quad \\text{(meeting at right angles at } (3,-2) \\text{)}",
    },
  ],

  guidedPractice: [
    {
      id: "tan-norm-guided-1",
      prompt: "Find the derivative:",
      latex: "y=x^2+5x-1",
      answer: "2x+5",
      hint: "Differentiate each term.",
      explanation: "$\\frac{dy}{dx}=2x+5$.",
    },
    {
      id: "tan-norm-guided-2",
      prompt: "Find the tangent gradient at the given x-value:",
      latex: "y=x^2+5x-1, \\quad x=2",
      answer: "9",
      hint: "Use $\\frac{dy}{dx}=2x+5$, then substitute $x=2$.",
      explanation: "$m_t=2(2)+5=9$.",
    },
    {
      id: "tan-norm-guided-3",
      prompt: "Complete the normal gradient:",
      latex: "",
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "Use $m_n=-\\frac{1}{m_t}$.",
      explanation: "$m_n=-\\frac{1}{4}$.",
    },
    {
      id: "tan-norm-guided-4",
      prompt: "Complete the point-gradient equation for the tangent:",
      latex: "",
      answer: "9",
      hint: "Use the y-coordinate of the point.",
      explanation:
        "Point-gradient form is $y-y_1=m(x-x_1)$. With $P=(2,9)$ and $m=7$, the equation starts $y-9=7(x-2)$.",
    },
  ],

  independentPractice: [
    {
      id: "tan-norm-ind-1",
      prompt: "Find the tangent gradient:",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "4",
      hint: "Find $\\frac{dy}{dx}$, then the point on the curve.",
      explanation:
        "$\\frac{dy}{dx}=2x+2$, so $m_t=4$ and $P=(1,3)$. Therefore $y-3=4(x-1)$, so $y=4x-1$.",
    },
    {
      id: "tan-norm-ind-2",
      prompt: "Find the normal gradient:",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "The normal gradient is the negative reciprocal of the tangent gradient.",
      explanation:
        "$m_t=4$, so $m_n=-\\frac{1}{4}$ and $P=(1,3)$. Therefore $y-3=-\\frac{1}{4}(x-1)$, so $y=-\\frac{1}{4}x+\\frac{13}{4}$.",
    },
    {
      id: "tan-norm-ind-3",
      prompt: "Find the tangent gradient:",
      latex: "y=x^2-6x+5, \\quad x=2",
      answer: "-2",
      hint: "This tangent has a negative gradient.",
      explanation:
        "$\\frac{dy}{dx}=2x-6$, so $m_t=-2$ and $P=(2,-3)$. Therefore $y+3=-2(x-2)$, so $y=-2x+1$.",
    },
    {
      id: "tan-norm-ind-4",
      prompt: "Find the normal gradient:",
      latex: "f(x)=x^2-3x+2, \\quad x=4",
      answer: "-1/5",
      acceptedAnswers: ["-0.2"],
      hint: "Use $f'(x)$ for the tangent gradient.",
      explanation:
        "$f'(x)=2x-3$, so $m_t=5$, $m_n=-\\frac{1}{5}$, and $P=(4,6)$. Therefore $y-6=-\\frac{1}{5}(x-4)$, so $y=-\\frac{1}{5}x+\\frac{34}{5}$.",
    },
    {
      id: "tan-norm-ind-5",
      prompt:
        "A path is modelled by $f(x)$. Find the normal gradient at the given point.",
      latex: "f(x)=-x^2+4x+1, \\quad x=1",
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "Find the tangent gradient, then take the negative reciprocal.",
      explanation:
        "$f'(x)=-2x+4$, so $m_t=2$ at $x=1$ and $m_n=-\\frac{1}{2}$. The point is $(1,4)$, so $y-4=-\\frac{1}{2}(x-1)$ and $y=-\\frac{1}{2}x+\\frac{9}{2}$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Substituting into the original function to find the gradient.",
      fix: "Use the original function to find the point, but use the derivative to find the tangent gradient.",
    },
    {
      mistake: "Using the tangent gradient for the normal.",
      fix: "Both lines pass through the same point, so it is tempting to reuse the same slope, but they meet at right angles. Rotating the tangent 90 degrees swaps and negates rise and run, so the normal gradient is the negative reciprocal $m_n=-\\frac{1}{m_t}$.",
    },
    {
      mistake: "Forgetting that the tangent and normal pass through the same point.",
      fix: "Find $P=(a,f(a))$ first, then use that point for both equations.",
    },
    {
      mistake: "Making sign errors with negative reciprocals.",
      fix: "The negative reciprocal does two things: flip the fraction and flip the sign. Since $m_t=-2=\\frac{-2}{1}$ is negative, its reciprocal is $-\\frac{1}{2}$, and negating that gives $m_n=\\frac{1}{2}$.",
    },
  ],

  masteryQuiz: [
    {
      id: "tan-norm-mastery-1",
      prompt: "Find the derivative:",
      latex: "y=2x^3-5x+1",
      answer: "A",
      choices: [
        { label: "A", text: "$6x^2-5$" },
        { label: "B", text: "$6x^3-5$" },
        { label: "C", text: "$2x^2-5$" },
        { label: "D", text: "$6x^2-5x$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "Use the power rule on $2x^3$ and remember the derivative of $-5x$ is $-5$. Therefore $\\frac{dy}{dx}=6x^2-5$.",
    },
    {
      id: "tan-norm-mastery-2",
      prompt: "Find the tangent gradient at $x=-1$:",
      latex: "y=x^3+2x^2",
      answer: "-1",
      hint: "Substitute $x=-1$ into the derivative.",
      explanation: "Differentiate first: $y'=3x^2+4x$. At $x=-1$, $m_t=3(-1)^2+4(-1)=-1$.",
    },
    {
      id: "tan-norm-mastery-3",
      prompt: "Find the point on the curve when $x=2$:",
      latex: "y=2x^2-3x+5",
      answer: "(2,7)",
      acceptedAnswers: ["2,7", "2, 7", "(2, 7)"],
      hint: "Substitute $x=2$ into the original function.",
      explanation: "$y=2(2)^2-3(2)+5=7$, so the point is $(2,7)$.",
    },
    {
      id: "tan-norm-mastery-4",
      prompt: "Find $c$ in the tangent equation $y=6x+c$ at $x=1$.",
      latex: "y=x^3+3x",
      answer: "-2",
      hint: "Find the point on the curve, then substitute it into $y=6x+c$.",
      explanation: "At $x=1$, the point is $(1,4)$ and the derivative $y'=3x^2+3$ gives tangent gradient $6$. Substitute into $y=6x+c$: $4=6(1)+c$, so $c=-2$.",
    },
    {
      id: "tan-norm-mastery-5",
      prompt: "Find $c$ in the normal equation $y=\\frac{1}{2}x+c$ at $x=2$.",
      latex: "y=-x^2+2x+3",
      answer: "2",
      hint: "The normal passes through the same point as the tangent.",
      explanation:
        "The derivative is $y'=-2x+2$, so at $x=2$ the tangent gradient is $-2$ and the normal gradient is $\\frac{1}{2}$. The point is $(2,3)$, so $3=\\frac{1}{2}(2)+c$ and $c=2$.",
    },
    {
      id: "tan-norm-mastery-6",
      prompt: "Find the tangent gradient at $x=2$:",
      latex: "y=4x^3-x^2",
      answer: "44",
      hint: "Differentiate, then substitute $x=2$.",
      explanation: "$\\frac{dy}{dx}=12x^2-2x$, so the tangent gradient at $x=2$ is $12(2)^2-2(2)=44$.",
    },
    {
      id: "tan-norm-mastery-7",
      prompt: "Find the point on the curve when $x=-1$:",
      latex: "y=x^3-4x+2",
      answer: "(-1,5)",
      acceptedAnswers: ["-1,5", "-1, 5", "(-1, 5)"],
      hint: "Substitute $x=-1$ into the original function.",
      explanation: "$y=(-1)^3-4(-1)+2=5$, so the point is $(-1,5)$.",
    },
    {
      id: "tan-norm-mastery-8",
      prompt: "Find $c$ in the tangent equation $y=5x+c$ at $x=2$.",
      latex: "y=x^2+x+1",
      answer: "-3",
      hint: "Find the point on the curve, then use the given tangent equation.",
      explanation:
        "$\\frac{dy}{dx}=2x+1$, so the tangent gradient is $5$ at $x=2$. The point is $(2,7)$, so $7=5(2)+c$ and $c=-3$.",
    },
    {
      id: "tan-norm-mastery-9",
      prompt: "Find $c$ in the normal equation $y=-\\frac{1}{3}x+c$ at $x=1$.",
      latex: "y=x^3",
      answer: "4/3",
      acceptedAnswers: ["1.3333333333333333"],
      hint: "Use the negative reciprocal of the tangent gradient.",
      explanation:
        "For $y=x^3$, the tangent gradient at $x=1$ is $3$, so the normal gradient is $-\\frac{1}{3}$. The point is $(1,1)$, so $1=-\\frac{1}{3}+c$ and $c=\\frac{4}{3}$.",
    },
    {
      id: "tan-norm-mastery-10",
      prompt:
        "A temperature model is given. Find the tangent gradient at $t=3$.",
      latex: "T(t)=t^2-4t+10",
      answer: "2",
      hint: "The tangent gradient is $T'(3)$.",
      explanation:
        "$T'(t)=2t-4$, so $T'(3)=2$. At $t=3$, the temperature curve has gradient $2$.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: gradient of the tangent (differentiate + substitute) ─
    {
      id: "tan-norm-pool-1",
      prompt: "Find the gradient of the tangent to the curve at $x = 3$.",
      latex: "y = x^2",
      difficulty: 1,
      answer: "6",
      hint: "Differentiate, then substitute $x = 3$.",
      explanation: "$\\frac{dy}{dx} = 2x$, so at $x = 3$ the gradient is $6$.",
    },
    {
      id: "tan-norm-pool-2",
      prompt: "Find the gradient of the tangent to the curve at $x = 1$.",
      latex: "y = x^2",
      difficulty: 1,
      answer: "2",
      hint: "$\\frac{dy}{dx} = 2x$; substitute $x = 1$.",
      explanation: "At $x = 1$ the gradient is $2$.",
    },
    {
      id: "tan-norm-pool-3",
      prompt: "Find the gradient of the tangent to the curve at $x = 2$.",
      latex: "y = x^3",
      difficulty: 1,
      answer: "12",
      hint: "$\\frac{dy}{dx} = 3x^2$; substitute $x = 2$.",
      explanation: "$\\frac{dy}{dx} = 3x^2$, so at $x = 2$ the gradient is $12$.",
    },
    {
      id: "tan-norm-pool-4",
      prompt: "Find the gradient of the tangent to the curve at $x = 1$.",
      latex: "y = 2x^2",
      difficulty: 1,
      answer: "4",
      hint: "$\\frac{dy}{dx} = 4x$; substitute $x = 1$.",
      explanation: "$\\frac{dy}{dx} = 4x$, so at $x = 1$ the gradient is $4$.",
    },
    {
      id: "tan-norm-pool-5",
      prompt: "Find the gradient of the tangent to the curve at $x = 2$.",
      latex: "y = x^2 + x",
      difficulty: 1,
      answer: "5",
      hint: "$\\frac{dy}{dx} = 2x + 1$; substitute $x = 2$.",
      explanation: "$\\frac{dy}{dx} = 2x + 1$, so at $x = 2$ the gradient is $5$.",
    },
    {
      id: "tan-norm-pool-6",
      prompt: "Find the gradient of the tangent to the curve at $x = 0$.",
      latex: "y = x^2 - 4x",
      difficulty: 1,
      answer: "-4",
      hint: "$\\frac{dy}{dx} = 2x - 4$; substitute $x = 0$.",
      explanation: "$\\frac{dy}{dx} = 2x - 4$, so at $x = 0$ the gradient is $-4$.",
    },
    // ── Difficulty 2: point on the curve & gradients ──────────────────────
    {
      id: "tan-norm-pool-7",
      prompt: "Find the $y$-coordinate of the point on the curve where $x = 3$.",
      latex: "y = x^2",
      difficulty: 2,
      answer: "9",
      hint: "Substitute $x = 3$ into the original function.",
      explanation: "$y = 3^2 = 9$, so the point is $(3, 9)$.",
    },
    {
      id: "tan-norm-pool-8",
      prompt: "Find the $y$-coordinate of the point on the curve where $x = 2$.",
      latex: "y = x^2 + 1",
      difficulty: 2,
      answer: "5",
      hint: "Substitute $x = 2$ into the function.",
      explanation: "$y = 4 + 1 = 5$, so the point is $(2, 5)$.",
    },
    {
      id: "tan-norm-pool-9",
      prompt: "Find the $y$-coordinate of the point on the curve where $x = 2$.",
      latex: "y = x^3",
      difficulty: 2,
      answer: "8",
      hint: "Substitute $x = 2$ into the function.",
      explanation: "$y = 2^3 = 8$, so the point is $(2, 8)$.",
    },
    {
      id: "tan-norm-pool-10",
      prompt: "Find the gradient of the tangent to the curve at $x = 3$.",
      latex: "y = x^2 - 2x",
      difficulty: 2,
      answer: "4",
      hint: "$\\frac{dy}{dx} = 2x - 2$; substitute $x = 3$.",
      explanation: "$\\frac{dy}{dx} = 2x - 2$, so at $x = 3$ the gradient is $4$.",
    },
    {
      id: "tan-norm-pool-11",
      prompt: "Find the gradient of the tangent to the curve at $x = 2$.",
      latex: "y = 3x^2",
      difficulty: 2,
      answer: "12",
      hint: "$\\frac{dy}{dx} = 6x$; substitute $x = 2$.",
      explanation: "$\\frac{dy}{dx} = 6x$, so at $x = 2$ the gradient is $12$.",
    },
    {
      id: "tan-norm-pool-12",
      prompt: "Find the gradient of the tangent to the curve at $x = 1$.",
      latex: "y = x^2 - 5",
      difficulty: 2,
      answer: "2",
      hint: "$\\frac{dy}{dx} = 2x$; substitute $x = 1$.",
      explanation: "$\\frac{dy}{dx} = 2x$, so at $x = 1$ the gradient is $2$.",
    },
    // ── Difficulty 3: normal gradient = -1/m_t ────────────────────────────
    {
      id: "tan-norm-pool-13",
      prompt: "A tangent has gradient 2. Find the gradient of the normal.",
      latex: "",
      difficulty: 3,
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "The normal gradient is the negative reciprocal.",
      explanation: "$m_n = -\\frac{1}{2}$.",
    },
    {
      id: "tan-norm-pool-14",
      prompt: "A tangent has gradient 4. Find the gradient of the normal.",
      latex: "",
      difficulty: 3,
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "Take the negative reciprocal of 4.",
      explanation: "$m_n = -\\frac{1}{4}$.",
    },
    {
      id: "tan-norm-pool-15",
      prompt: "A tangent has gradient $-3$. Find the gradient of the normal.",
      latex: "",
      difficulty: 3,
      answer: "1/3",
      hint: "The negative reciprocal of $-3$ is positive.",
      explanation: "$m_n = -\\frac{1}{-3} = \\frac{1}{3}$.",
    },
    {
      id: "tan-norm-pool-16",
      prompt: "Find the gradient of the normal to the curve at $x = 1$.",
      latex: "y = x^2",
      difficulty: 3,
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "Tangent gradient is $2x = 2$; take its negative reciprocal.",
      explanation: "$m_t = 2$, so $m_n = -\\frac{1}{2}$.",
    },
    {
      id: "tan-norm-pool-17",
      prompt: "Find the gradient of the normal to the curve at $x = 2$.",
      latex: "y = x^2",
      difficulty: 3,
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "Tangent gradient is $2x = 4$; take its negative reciprocal.",
      explanation: "$m_t = 4$, so $m_n = -\\frac{1}{4}$.",
    },
    {
      id: "tan-norm-pool-18",
      prompt: "A tangent has gradient 5. Find the gradient of the normal.",
      latex: "",
      difficulty: 3,
      answer: "-1/5",
      acceptedAnswers: ["-0.2"],
      hint: "Take the negative reciprocal of 5.",
      explanation: "$m_n = -\\frac{1}{5}$.",
    },
    // ── Difficulty 4: equation of the tangent ─────────────────────────────
    {
      id: "tan-norm-pool-19",
      prompt: "Find the equation of the tangent at $x = 1$.",
      latex: "y = x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$y = 2x - 1$" },
        { label: "B", text: "$y = 2x + 1$" },
        { label: "C", text: "$y = 2x$" },
        { label: "D", text: "$y = x - 1$" },
      ],
      hint: "Point $(1, 1)$, gradient $2$; use point-gradient form.",
      explanation: "$y - 1 = 2(x - 1) \\Rightarrow y = 2x - 1$.",
    },
    {
      id: "tan-norm-pool-20",
      prompt: "Find the equation of the tangent at $x = 2$.",
      latex: "y = x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$y = 4x - 4$" },
        { label: "B", text: "$y = 4x + 4$" },
        { label: "C", text: "$y = 4x$" },
        { label: "D", text: "$y = 2x - 4$" },
      ],
      hint: "Point $(2, 4)$, gradient $4$.",
      explanation: "$y - 4 = 4(x - 2) \\Rightarrow y = 4x - 4$.",
    },
    {
      id: "tan-norm-pool-21",
      prompt: "Find the equation of the tangent at $x = 1$.",
      latex: "y = x^2 + 1",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$y = 2x$" },
        { label: "B", text: "$y = 2x + 1$" },
        { label: "C", text: "$y = 2x + 2$" },
        { label: "D", text: "$y = 2x - 1$" },
      ],
      hint: "Point $(1, 2)$, gradient $2$.",
      explanation: "$y - 2 = 2(x - 1) \\Rightarrow y = 2x$.",
    },
    {
      id: "tan-norm-pool-22",
      prompt: "Find the equation of the tangent at $x = 1$.",
      latex: "y = x^3",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$y = 3x - 2$" },
        { label: "B", text: "$y = 3x + 1$" },
        { label: "C", text: "$y = 3x$" },
        { label: "D", text: "$y = 3x - 1$" },
      ],
      hint: "Point $(1, 1)$, gradient $3$.",
      explanation: "$y - 1 = 3(x - 1) \\Rightarrow y = 3x - 2$.",
    },
    {
      id: "tan-norm-pool-23",
      prompt: "Find the equation of the tangent at $x = 3$.",
      latex: "y = x^2 - 2x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$y = 4x - 9$" },
        { label: "B", text: "$y = 4x + 9$" },
        { label: "C", text: "$y = 4x - 3$" },
        { label: "D", text: "$y = 4x - 12$" },
      ],
      hint: "Point $(3, 3)$, gradient $2(3) - 2 = 4$.",
      explanation: "$y - 3 = 4(x - 3) \\Rightarrow y = 4x - 9$.",
    },
    {
      id: "tan-norm-pool-24",
      prompt: "Find the equation of the tangent at $x = 1$.",
      latex: "y = 2x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$y = 4x - 2$" },
        { label: "B", text: "$y = 4x + 2$" },
        { label: "C", text: "$y = 4x$" },
        { label: "D", text: "$y = 2x - 2$" },
      ],
      hint: "Point $(1, 2)$, gradient $4x = 4$.",
      explanation: "$y - 2 = 4(x - 1) \\Rightarrow y = 4x - 2$.",
    },
    // ── Difficulty 5: normal equations / multi-step ───────────────────────
    {
      id: "tan-norm-pool-25",
      prompt: "Find the equation of the normal at $x = 1$.",
      latex: "y = x^2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$y = -\\dfrac{1}{2}x + \\dfrac{3}{2}$" },
        { label: "B", text: "$y = 2x - 1$" },
        { label: "C", text: "$y = -\\dfrac{1}{2}x - \\dfrac{3}{2}$" },
        { label: "D", text: "$y = -2x + 3$" },
      ],
      hint: "Point $(1, 1)$; normal gradient is $-\\tfrac{1}{2}$.",
      explanation: "$y - 1 = -\\tfrac{1}{2}(x - 1) \\Rightarrow y = -\\tfrac{1}{2}x + \\tfrac{3}{2}$.",
    },
    {
      id: "tan-norm-pool-26",
      prompt: "Find the value of $x$ where the tangent is horizontal.",
      latex: "y = x^2 - 3x",
      difficulty: 5,
      answer: "3/2",
      acceptedAnswers: ["1.5", "x=3/2", "x=1.5"],
      hint: "A horizontal tangent has gradient $0$; solve $2x - 3 = 0$.",
      explanation: "$2x - 3 = 0 \\Rightarrow x = \\tfrac{3}{2}$.",
    },
    {
      id: "tan-norm-pool-27",
      prompt: "Find the positive value of $x$ where the tangent is horizontal.",
      latex: "y = x^3 - 12x",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Solve $3x^2 - 12 = 0$ and take the positive root.",
      explanation: "$3x^2 - 12 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = 2$ (positive).",
    },
    {
      id: "tan-norm-pool-28",
      prompt: "At what value of $x$ does the tangent have gradient 6?",
      latex: "y = x^2",
      difficulty: 5,
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "Set $2x = 6$.",
      explanation: "$2x = 6 \\Rightarrow x = 3$.",
    },
    {
      id: "tan-norm-pool-29",
      prompt:
        "At what value of $x$ is the tangent parallel to the line $y = 6x + 1$?",
      latex: "y = x^2 + 2x",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Parallel lines have equal gradient; set $2x + 2 = 6$.",
      explanation: "$2x + 2 = 6 \\Rightarrow x = 2$.",
    },
    {
      id: "tan-norm-pool-30",
      prompt: "Find the equation of the tangent at $x = 2$.",
      latex: "y = x^3",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$y = 12x - 16$" },
        { label: "B", text: "$y = 12x + 16$" },
        { label: "C", text: "$y = 12x - 8$" },
        { label: "D", text: "$y = 3x - 16$" },
      ],
      hint: "Point $(2, 8)$, gradient $3(2)^2 = 12$.",
      explanation: "$y - 8 = 12(x - 2) \\Rightarrow y = 12x - 16$.",
    },
    // ── Difficulty 5 (genuine): reverse reasoning + geometry interaction,
    //    not "find the tangent/normal at x=k" (those live above at D1–D4) ──
    {
      id: "tan-norm-pool-31",
      prompt:
        "The tangent to $y = x^2$ at a point $P$ passes through $(0, -9)$. Find the positive $x$-coordinate of $P$.",
      latex: "y = x^2",
      difficulty: 5,
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "Let $P=(a, a^2)$. Write the tangent there, then make it pass through $(0,-9)$.",
      explanation:
        "At $P=(a,a^2)$ the tangent is $y = 2a x - a^2$. Passing through $(0,-9)$ gives $-9 = -a^2$, so $a^2 = 9$ and $a = 3$ (positive).",
    },
    {
      id: "tan-norm-pool-32",
      prompt:
        "The line $y = 5x + c$ is a tangent to the parabola $y = x^2 + x$. Find the value of $c$.",
      latex: "y = x^2 + x",
      difficulty: 5,
      answer: "-4",
      acceptedAnswers: ["c=-4", "−4"],
      hint: "A tangent meets the curve once: set them equal and require a repeated root (discriminant $=0$).",
      explanation:
        "$x^2 + x = 5x + c \\Rightarrow x^2 - 4x - c = 0$. A tangent gives a repeated root, so the discriminant is $0$: $16 + 4c = 0$, hence $c = -4$.",
    },
    {
      id: "tan-norm-pool-33",
      prompt:
        "The tangent to $y = x^2$ at the point $(2, 4)$ forms a triangle with the $x$-axis and $y$-axis. Find the area of that triangle.",
      latex: "y = x^2",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["2 units^2", "2 square units"],
      hint: "Find the tangent line, then its $x$- and $y$-intercepts; the area is half the product of the intercept lengths.",
      explanation:
        "Tangent at $(2,4)$: gradient $4$, so $y = 4x - 4$. The $x$-intercept is $(1,0)$ and the $y$-intercept is $(0,-4)$. Area $= \\tfrac12 \\times 1 \\times 4 = 2$.",
    },
    {
      // Reverse + geometry (replaces an earlier "normal meets parabola again" item
      // to avoid over-using the meets-again/double-root structure across the batch).
      id: "tan-norm-pool-34",
      prompt:
        "The tangent to $y = x^2$ is parallel to the line $y = 6x - 5$. Find the area of the triangle formed by this tangent and the coordinate axes.",
      latex: "y = x^2",
      difficulty: 5,
      answer: "27/4",
      acceptedAnswers: ["6.75", "27/4 units^2", "6.75 square units"],
      hint: "Parallel lines share a gradient: solve $2x = 6$ for the point of contact, write the tangent, then use its intercepts.",
      explanation:
        "Parallel to $y = 6x - 5$ means gradient $6$, so $2x = 6$ gives $x = 3$ and the point $(3, 9)$. The tangent is $y - 9 = 6(x - 3) \\Rightarrow y = 6x - 9$. Its intercepts are $(\\tfrac32, 0)$ and $(0, -9)$, so the area is $\\tfrac12 \\times \\tfrac32 \\times 9 = \\tfrac{27}{4}$.",
    },
  ],

  masteryPassMark: 0.8,

  multiPartPractice: [
    {
      id: "tan-norm-mp-1",
      prompt:
        "Consider the curve $y = x^3 - 2x + 1$ at the point where $x = 2$.",
      latex: "",
      answer: "10",
      hint: "Differentiate to find $f'(x)$, then substitute $x=2$ to find the tangent gradient. Use point-gradient form for the tangent equation.",
      explanation:
        "Part (a): $f'(x)=3x^2-2$, so the tangent gradient at $x=2$ is $3(4)-2=10$. Part (b): $f(2)=8-4+1=5$, giving point $(2,5)$. The tangent is $y-5=10(x-2)$, i.e. $y=10x-15$, so the $y$-intercept is $-15$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the gradient of the tangent to the curve at $x = 2$.",
          marks: 2,
          answer: "10",
          acceptedAnswers: [],
          hint: "Differentiate $f(x)=x^3-2x+1$ and substitute $x=2$.",
          explanation:
            "$f'(x)=3x^2-2$. At $x=2$: $f'(2)=3(4)-2=10$.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "Find the $y$-intercept of the tangent line at $x = 2$.",
          marks: 2,
          answer: "-15",
          acceptedAnswers: [],
          hint: "Find the point on the curve using $f(2)$, then write the tangent in $y=mx+c$ form.",
          explanation:
            "$f(2)=8-4+1=5$, so the tangent passes through $(2,5)$ with gradient $10$. Using point-gradient form: $y-5=10(x-2) \\Rightarrow y=10x-15$. The $y$-intercept is $-15$.",
        },
      ],
    },
    {
      id: "tan-norm-mp-2",
      prompt:
        "Consider the curve $y = x^2 - 5x + 4$ at the point where $x = 3$.",
      latex: "",
      answer: "1",
      hint: "Find the tangent gradient, the point on the curve, and use the negative reciprocal for the normal gradient.",
      explanation:
        "Part (a): $f'(x)=2x-5$, so at $x=3$ the tangent gradient is $1$. Part (b): $f(3)=9-15+4=-2$, so the point is $(3,-2)$. Part (c): The normal gradient is $-1$. The normal is $y+2=-(x-3) \\Rightarrow y=-x+1$, so the $y$-intercept is $1$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the gradient of the tangent at $x = 3$.",
          marks: 1,
          answer: "1",
          acceptedAnswers: [],
          hint: "Differentiate and substitute $x=3$.",
          explanation: "$f'(x)=2x-5$. At $x=3$: $f'(3)=6-5=1$.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the coordinates of the point on the curve at $x = 3$.",
          marks: 1,
          answer: "(3,-2)",
          acceptedAnswers: ["3,-2", "3, -2", "(3, -2)"],
          hint: "Substitute $x=3$ into the original function.",
          explanation: "$f(3)=9-15+4=-2$, so the point is $(3,-2)$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the $y$-intercept of the normal to the curve at $x = 3$.",
          marks: 2,
          answer: "1",
          acceptedAnswers: [],
          hint: "The normal gradient is $-\\frac{1}{m_t}$. Write the normal equation using point-gradient form.",
          explanation:
            "Tangent gradient is $1$, so normal gradient is $-1$. Normal through $(3,-2)$: $y+2=-(x-3) \\Rightarrow y=-x+1$. The $y$-intercept is $1$.",
        },
      ],
    },
    {
      id: "tan-norm-mp-3",
      prompt:
        "The curve $y = x^3 + kx + 2$ has a tangent with gradient $7$ at the point where $x = 1$.",
      latex: "",
      answer: "4",
      hint: "Differentiate to get $f'(x)$, substitute $x=1$, and set equal to the given gradient to find $k$. Then find the point and tangent equation.",
      explanation:
        "Part (a): $f'(x)=3x^2+k$. At $x=1$: $3+k=7$, so $k=4$. Part (b): $f(1)=1+4+2=7$, so the point is $(1,7)$. Part (c): Tangent through $(1,7)$ with gradient $7$: $y-7=7(x-1) \\Rightarrow y=7x$. The $y$-intercept is $0$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the value of $k$.",
          marks: 2,
          answer: "4",
          acceptedAnswers: [],
          hint: "Set $f'(1)=7$ and solve for $k$.",
          explanation:
            "$f'(x)=3x^2+k$. At $x=1$: $f'(1)=3+k=7$, so $k=4$.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "Find the coordinates of the point on the curve at $x = 1$.",
          marks: 1,
          answer: "(1,7)",
          acceptedAnswers: ["1,7", "1, 7", "(1, 7)"],
          hint: "Substitute $k=4$ and $x=1$ into $y=x^3+kx+2$.",
          explanation: "$y=1^3+4(1)+2=7$, so the point is $(1,7)$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "Find the $y$-intercept of the tangent to the curve at $x = 1$.",
          marks: 2,
          answer: "0",
          acceptedAnswers: [],
          hint: "Use point-gradient form with the point from (b) and the given gradient.",
          explanation:
            "Tangent through $(1,7)$ with gradient $7$: $y-7=7(x-1) \\Rightarrow y=7x-7+7=7x$. The $y$-intercept is $0$.",
        },
      ],
    },
  ],
};

export const stationaryPointsLesson: ExplicitLesson = {
  id: "stationary-points",
  slug: "stationary-points",
  moduleSlug: "ma-c1-introduction-to-differentiation",
  moduleTitle: "Introduction to Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Stationary Points",
  description:
    "Find stationary points by solving where the derivative is equal to zero.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Stationary Points",
    url: "https://www.youtube.com/embed/sex1k07fPdM",
  },

  learningIntention:
    "Learn how to find stationary points by solving $f'(x)=0$ and writing the results as coordinates.",

  successCriteria: [
    "Explain that a stationary point occurs where the tangent is horizontal.",
    "Recognise that a horizontal tangent has gradient $0$.",
    "Differentiate a polynomial function to find $f'(x)$ or $\\frac{dy}{dx}$.",
    "Solve $f'(x)=0$ to find possible $x$-values for stationary points.",
    "Substitute each $x$-value into the original function and write each stationary point as a coordinate.",
  ],

  teaching: {
    paragraphs: [
      "Picture walking along a curve as if it were a range of hills. As you climb toward a peak the ground rises beneath you; just past the top it starts to fall. Right at the very top, for a single instant, the ground is flat: you are neither climbing nor descending. A stationary point is exactly that spot on the curve, the momentarily flat instant where the graph changes between rising and falling. The bottom of a valley is the same idea turned upside down.",
      "We can pin down that flat instant using the derivative. From the rate-of-change lesson, $f'(x)$ is the curve's gradient, its instantaneous rate of change: where $f'(x)>0$ the $y$-value is rising, where $f'(x)<0$ it is falling, and where $f'(x)=0$ the $y$-value is momentarily not changing. The word stationary means not moving, so a stationary point must be a place where the rate of change is zero. That is why we hunt for where $f'(x)=0$: we are not memorising a rule, we are translating 'the curve is momentarily flat' into 'the gradient is zero'.",
      "Take a specific curve, the parabola $y=x^2-6x+5$. To the left of its lowest point the curve falls, so the gradient is negative; to the right it rises, so the gradient is positive. In between there is one instant where the gradient passes through zero, and that is the bottom of the parabola at $x=3$. If you laid a ruler against the curve there it would sit perfectly horizontal. Every stationary point works this way, whatever the function: a sign change in the gradient with a flat instant of zero gradient in the middle.",
      "To find that instant for any function, differentiate to get the gradient function $f'(x)$, then solve $f'(x)=0$ for the $x$-values where the gradient vanishes. But each such $x$ is only half a coordinate. The derivative reports the slope of the curve, not its height, so substituting $x$ back into $f'(x)$ would just return the gradient (zero again), not a $y$-value. The height of the point lives on the original curve, so the matching $y$ comes from $f(x)$, giving the full coordinate $(x, f(x))$.",
      "This is exactly why the most common slip, reading the $y$-value off the derivative, fails: $f'(x)$ outputs a gradient and never a height, so the $y$-coordinate must always come from the original function. In NSW exam questions, finding $f'(x)=0$ is the first move in almost every curve-sketching or optimisation problem. For now the goal is only to locate the stationary points; deciding whether each one is a maximum, a minimum, or something else comes in a later lesson.",
    ],
    latexBlocks: [
      "f'(x)=\\text{gradient of the curve}=\\text{instantaneous rate of change}",
      "f'(x)=0 \\quad \\Leftrightarrow \\quad \\text{curve momentarily flat (stationary)}",
      "\\text{solve } f'(x)=0 \\text{ for } x, \\quad \\text{then height } y=f(x)",
      "P=(x,\\; f(x)) \\quad \\text{height from } f(x), \\text{ not } f'(x)",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: One stationary point",
      questionLatex:
        "f(x)=x^2-6x+5 \\quad \\text{find the stationary point.}",
      cartesianGraph: {
        description:
          "y = x^2 - 6x + 5 is a parabola with its lowest point at (3, -4). A horizontal tangent y = -4 touches the curve there. To the left of x = 3 the curve falls (negative gradient), to the right it rises (positive gradient); at x = 3 the gradient is zero and the tangent lies flat.",
        xMin: 0,
        xMax: 6,
        yMin: -5,
        yMax: 6,
        xStep: 1,
        yStep: 1,
        parabolas: [
          { kind: "quadratic", a: 1, b: -6, c: 5, label: "y = x² - 6x + 5" },
        ],
        lines: [
          { kind: "linear", m: 0, b: -4, xMin: 1, xMax: 5, label: "horizontal tangent: y = -4" },
        ],
        points: [{ x: 3, y: -4, label: "(3, -4)" }],
      },
      steps: [
        {
          explanation:
            "A stationary point is where the gradient is zero, and the gradient is given by the derivative, so first find the gradient function.",
          latex: "f'(x)=2x-6",
        },
        {
          explanation:
            "The curve is momentarily flat exactly when its gradient is zero, so set the gradient function equal to $0$.",
          latex: "2x-6=0",
        },
        {
          explanation:
            "Solve for $x$ to locate where along the curve that flat instant sits.",
          latex: "2x=6 \\quad \\Rightarrow \\quad x=3",
        },
        {
          explanation:
            "So far $x=3$ is only the horizontal position. The derivative gives slope, not height, so substitute $x=3$ into the original $f(x)$ to find the $y$-value.",
          latex: "f(3)=3^2-6(3)+5=-4",
        },
        {
          explanation:
            "Pairing the two values gives the coordinate where the curve turns. As the graph shows, this is the lowest point of the parabola, where the tangent lies flat.",
          latex: "(3,-4)",
        },
      ],
      finalAnswerLatex:
        "(3,-4) \\quad \\text{(the curve's turning location)}",
    },
    {
      title: "Worked example 2: Two stationary points",
      questionLatex:
        "y=x^3-3x^2-9x+2 \\quad \\text{find the stationary points.}",
      steps: [
        {
          explanation:
            "Differentiate to get the gradient function; stationary points are wherever this equals zero.",
          latex: "\\frac{dy}{dx}=3x^2-6x-9",
        },
        {
          explanation:
            "Set the gradient to zero. This is a quadratic, so unlike the parabola it can flatten in more than one place.",
          latex: "3x^2-6x-9=0",
        },
        {
          explanation:
            "Factorise to find every $x$ where the gradient vanishes.",
          latex:
            "3(x^2-2x-3)=0 \\quad \\Rightarrow \\quad 3(x-3)(x+1)=0 \\quad \\Rightarrow \\quad x=3 \\text{ or } x=-1",
        },
        {
          explanation:
            "Each $x$ is only a horizontal location. Substitute each back into the original function, not the derivative, to find its height.",
          latex:
            "y(-1)=(-1)^3-3(-1)^2-9(-1)+2=7, \\quad y(3)=3^3-3(3)^2-9(3)+2=-25",
        },
        {
          explanation:
            "Write each as a coordinate: these are the two points where the curve momentarily turns from rising to falling and back.",
          latex: "(-1,7) \\quad \\text{and} \\quad (3,-25)",
        },
      ],
      finalAnswerLatex: "(-1,7), \\quad (3,-25)",
    },
  ],

  guidedPractice: [
    {
      id: "stationary-guided-1",
      prompt: "Find the derivative:",
      latex: "y=x^2-4x+1",
      answer: "2x-4",
      hint: "Differentiate term-by-term.",
      explanation: "$\\frac{dy}{dx}=2x-4$.",
    },
    {
      id: "stationary-guided-2",
      prompt: "Solve for the x-value of the stationary point:",
      latex: "y=x^2-4x+1",
      answer: "2",
      hint: "Set the derivative equal to $0$ and solve.",
      explanation: "$2x-4=0$, so $x=2$.",
    },
    {
      id: "stationary-guided-3",
      prompt: "Write the stationary point as a coordinate:",
      latex: "y=x^2-4x+1, \\quad x=2",
      answer: "(2,-3)",
      acceptedAnswers: ["2,-3", "2, -3", "(2, -3)"],
      hint: "Substitute $x=2$ into the original function.",
      explanation: "$y=2^2-4(2)+1=-3$, so the stationary point is $(2,-3)$.",
    },
    {
      id: "stationary-guided-4",
      prompt: "Complete the y-value for the stationary point:",
      latex: "",
      answer: "-4",
      hint: "Substitute into the original function, not the derivative.",
      explanation:
        "$f(3)=3^2-6(3)+5=-4$, so the stationary point would be $(3,-4)$.",
    },
  ],

  independentPractice: [
    {
      id: "stationary-ind-1",
      prompt: "Find the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "(4,-10)",
      acceptedAnswers: ["4,-10", "4, -10", "(4, -10)"],
      hint: "Differentiate, set the derivative equal to $0$, then substitute back into the original function.",
      explanation:
        "$\\frac{dy}{dx}=2x-8$, so $2x-8=0$ gives $x=4$. Then $y=4^2-8(4)+6=-10$, so the stationary point is $(4,-10)$.",
    },
    {
      id: "stationary-ind-2",
      prompt: "Find the smaller stationary x-value:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "1",
      hint: "This cubic has two solutions to $\\frac{dy}{dx}=0$.",
      explanation:
        "$\\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)$, so $x=1$ or $x=3$. Substituting into the original function gives $(1,5)$ and $(3,1)$.",
    },
    {
      id: "stationary-ind-3",
      prompt: "Find the stationary point:",
      latex: "y=-x^2+4x+1",
      answer: "(2,5)",
      acceptedAnswers: ["2,5", "2, 5", "(2, 5)"],
      hint: "Be careful with the negative sign when differentiating $-x^2$.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $-2x+4=0$ gives $x=2$. Then $y=-(2)^2+4(2)+1=5$, so the stationary point is $(2,5)$.",
    },
    {
      id: "stationary-ind-4",
      prompt: "Find the positive stationary x-value:",
      latex: "f(x)=x^3-12x+5",
      answer: "2",
      hint: "Use $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=3x^2-12=3(x-2)(x+2)$, so $x=-2$ or $x=2$. Then $f(-2)=21$ and $f(2)=-11$, so the stationary points are $(-2,21)$ and $(2,-11)$.",
    },
    {
      id: "stationary-ind-5",
      prompt:
        "A profit model is given. Find the stationary point coordinate.",
      latex: "P(x)=-x^2+14x-20",
      answer: "(7,29)",
      acceptedAnswers: ["7,29", "7, 29", "(7, 29)"],
      hint: "Solve $P'(x)=0$, then substitute into $P(x)$.",
      explanation:
        "$P'(x)=-2x+14$, so $x=7$. Then $P(7)=-49+98-20=29$, giving stationary point $(7,29)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Substituting into the derivative to find the y-value.",
      fix: "The derivative outputs a gradient, not a height, so it can never give a $y$-coordinate. Use the derivative to find $x$, then read the height off the original function $f(x)$.",
    },
    {
      mistake: "Forgetting to set the derivative equal to zero.",
      fix: "Stationary points occur where $f'(x)=0$.",
    },
    {
      mistake: "Writing only the x-value as the final answer.",
      fix: "A stationary point is a coordinate, so write it as $(x,y)$.",
    },
    {
      mistake: "Classifying the point too early.",
      fix: "For this lesson, only find the stationary point coordinates. Classification comes later.",
    },
  ],

  masteryQuiz: [
    {
      id: "stationary-mastery-1",
      prompt: "Differentiate:",
      latex: "y=x^3-3x^2-24x+4",
      answer: "B",
      choices: [
        { label: "A", text: "$3x^2-6x-24+4$" },
        { label: "B", text: "$3x^2-6x-24$" },
        { label: "C", text: "$x^2-6x-24$" },
        { label: "D", text: "$3x^3-6x-24$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "$\\frac{dy}{dx}=3x^2-6x-24$.",
    },
    {
      id: "stationary-mastery-2",
      prompt: "Find the smaller x-value where the derivative is zero:",
      latex: "3x^2-6x-24=0",
      answer: "-2",
      hint: "Factorise by taking out $3$ first.",
      explanation:
        "$3x^2-6x-24=3(x^2-2x-8)=3(x-4)(x+2)$, so $x=-2$ or $x=4$.",
    },
    {
      id: "stationary-mastery-3",
      prompt: "Find the y-value of the stationary point where $x=-2$.",
      latex: "y=x^3-3x^2-24x+4",
      answer: "32",
      hint: "Use the original function, not the derivative.",
      explanation: "$y=(-2)^3-3(-2)^2-24(-2)+4=32$.",
    },
    {
      id: "stationary-mastery-4",
      prompt: "Find the y-value of the stationary point where $x=4$.",
      latex: "y=x^3-3x^2-24x+4",
      answer: "-76",
      hint: "Use the original function again.",
      explanation: "$y=4^3-3(4)^2-24(4)+4=-76$.",
    },
    {
      id: "stationary-mastery-5",
      prompt: "Write the stationary point with the smaller x-value as a coordinate:",
      latex: "y=x^3-3x^2-24x+4",
      answer: "(-2,32)",
      acceptedAnswers: ["-2,32", "-2, 32", "(-2, 32)"],
      hint: "Pair each $x$-value with its matching $y$-value.",
      explanation:
        "The stationary points are $(-2,32)$ and $(4,-76)$.",
    },
    {
      id: "stationary-mastery-6",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-10x+3",
      answer: "(5,-22)",
      acceptedAnswers: ["5,-22", "5, -22", "(5, -22)"],
      hint: "Solve $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=2x-10$, so $x=5$. Then $f(5)=25-50+3=-22$, giving stationary point $(5,-22)$.",
    },
    {
      id: "stationary-mastery-7",
      prompt: "Find the positive stationary x-value:",
      latex: "y=x^3-12x+1",
      answer: "2",
      hint: "Differentiate and solve $y'=0$.",
      explanation:
        "$y'=3x^2-12=3(x-2)(x+2)$, so the stationary x-values are $x=-2$ and $x=2$.",
    },
    {
      id: "stationary-mastery-8",
      prompt: "Write the stationary point with positive x-value as a coordinate:",
      latex: "y=x^3-12x+1",
      answer: "(2,-15)",
      acceptedAnswers: ["2,-15", "2, -15", "(2, -15)"],
      hint: "Substitute each x-value into the original function.",
      explanation:
        "$y(-2)=17$ and $y(2)=-15$, so the stationary points are $(-2,17)$ and $(2,-15)$.",
    },
    {
      id: "stationary-mastery-9",
      prompt:
        "A profit model is given. Find the value of $x$ where the stationary profit occurs.",
      latex: "P(x)=-x^2+12x-5",
      answer: "6",
      hint: "Find $P'(x)$ and solve $P'(x)=0$.",
      explanation:
        "$P'(x)=-2x+12$. Solving $-2x+12=0$ gives $x=6$, so the stationary profit occurs when $x=6$.",
    },
    {
      id: "stationary-mastery-10",
      prompt:
        "Choose the correct statement about where stationary points occur.",
      latex: "\\text{Select the correct statement.}",
      answer: "B",
      choices: [
        { label: "A", text: "stationary points occur where $f(x)=0$" },
        { label: "B", text: "stationary points occur where $f'(x)=0$" },
        { label: "C", text: "stationary points occur where $f''(x)=0$" },
      ],
      hint: "A stationary point has a horizontal tangent.",
      explanation:
        "A horizontal tangent has gradient $0$, so stationary points occur where $f'(x)=0$. Option B is correct.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: solve f'(x)=0 for a quadratic (one x-value) ─────────
    {
      id: "stationary-pool-1",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = x^2 - 6x",
      difficulty: 1,
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "Set $\\frac{dy}{dx} = 2x - 6$ equal to $0$.",
      explanation: "$2x - 6 = 0 \\Rightarrow x = 3$.",
    },
    {
      id: "stationary-pool-2",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = x^2 + 4x",
      difficulty: 1,
      answer: "-2",
      acceptedAnswers: ["x=-2"],
      hint: "Solve $2x + 4 = 0$.",
      explanation: "$2x + 4 = 0 \\Rightarrow x = -2$.",
    },
    {
      id: "stationary-pool-3",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = x^2 - 10x",
      difficulty: 1,
      answer: "5",
      acceptedAnswers: ["x=5"],
      hint: "Solve $2x - 10 = 0$.",
      explanation: "$2x - 10 = 0 \\Rightarrow x = 5$.",
    },
    {
      id: "stationary-pool-4",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = x^2 + 2x",
      difficulty: 1,
      answer: "-1",
      acceptedAnswers: ["x=-1"],
      hint: "Solve $2x + 2 = 0$.",
      explanation: "$2x + 2 = 0 \\Rightarrow x = -1$.",
    },
    {
      id: "stationary-pool-5",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = 3x^2 - 12x",
      difficulty: 1,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Solve $6x - 12 = 0$.",
      explanation: "$6x - 12 = 0 \\Rightarrow x = 2$.",
    },
    {
      id: "stationary-pool-6",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = x^2 - 8x",
      difficulty: 1,
      answer: "4",
      acceptedAnswers: ["x=4"],
      hint: "Solve $2x - 8 = 0$.",
      explanation: "$2x - 8 = 0 \\Rightarrow x = 4$.",
    },
    // ── Difficulty 2: cubic with two stationary x-values ──────────────────
    {
      id: "stationary-pool-7",
      prompt: "At which $x$-values is the curve stationary?",
      latex: "y = x^3 - 3x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 1$ and $x = -1$" },
        { label: "B", text: "$x = 1$ only" },
        { label: "C", text: "$x = 0$ and $x = 3$" },
        { label: "D", text: "$x = 3$ and $x = -3$" },
      ],
      hint: "Solve $3x^2 - 3 = 0$.",
      explanation: "$3x^2 - 3 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$.",
    },
    {
      id: "stationary-pool-8",
      prompt: "At which $x$-values is the curve stationary?",
      latex: "y = x^3 - 12x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 2$ and $x = -2$" },
        { label: "B", text: "$x = 2$ only" },
        { label: "C", text: "$x = 0$ and $x = 4$" },
        { label: "D", text: "$x = 4$ and $x = -4$" },
      ],
      hint: "Solve $3x^2 - 12 = 0$.",
      explanation: "$3x^2 - 12 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$.",
    },
    {
      id: "stationary-pool-9",
      prompt: "At which $x$-values is the curve stationary?",
      latex: "y = x^3 - 3x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 2$" },
        { label: "B", text: "$x = 2$ only" },
        { label: "C", text: "$x = 0$ and $x = 3$" },
        { label: "D", text: "$x = 2$ and $x = -2$" },
      ],
      hint: "Factor $3x^2 - 6x = 3x(x - 2)$.",
      explanation: "$3x(x - 2) = 0 \\Rightarrow x = 0$ or $x = 2$.",
    },
    {
      id: "stationary-pool-10",
      prompt: "At which $x$-values is the curve stationary?",
      latex: "y = x^3 - 6x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 4$" },
        { label: "B", text: "$x = 4$ only" },
        { label: "C", text: "$x = 0$ and $x = 2$" },
        { label: "D", text: "$x = 2$ and $x = 4$" },
      ],
      hint: "Factor $3x^2 - 12x = 3x(x - 4)$.",
      explanation: "$3x(x - 4) = 0 \\Rightarrow x = 0$ or $x = 4$.",
    },
    {
      id: "stationary-pool-11",
      prompt: "At which $x$-values is the curve stationary?",
      latex: "y = 2x^3 - 6x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 1$ and $x = -1$" },
        { label: "B", text: "$x = 1$ only" },
        { label: "C", text: "$x = 0$ and $x = 1$" },
        { label: "D", text: "$x = 3$ and $x = -3$" },
      ],
      hint: "Solve $6x^2 - 6 = 0$.",
      explanation: "$6x^2 - 6 = 0 \\Rightarrow x^2 = 1 \\Rightarrow x = \\pm 1$.",
    },
    {
      id: "stationary-pool-12",
      prompt: "At which $x$-values is the curve stationary?",
      latex: "y = x^3 - 27x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 3$ and $x = -3$" },
        { label: "B", text: "$x = 3$ only" },
        { label: "C", text: "$x = 0$ and $x = 9$" },
        { label: "D", text: "$x = 9$ and $x = -9$" },
      ],
      hint: "Solve $3x^2 - 27 = 0$.",
      explanation: "$3x^2 - 27 = 0 \\Rightarrow x^2 = 9 \\Rightarrow x = \\pm 3$.",
    },
    // ── Difficulty 3: stationary point as a coordinate ────────────────────
    {
      id: "stationary-pool-13",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 - 4x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(2, -4)$" },
        { label: "B", text: "$(2, 4)$" },
        { label: "C", text: "$(-2, -4)$" },
        { label: "D", text: "$(2, 0)$" },
      ],
      hint: "Solve $2x - 4 = 0$, then substitute $x$ back into $y$.",
      explanation: "$x = 2$, $y = 4 - 8 = -4$, so the point is $(2, -4)$.",
    },
    {
      id: "stationary-pool-14",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 - 6x + 5",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(3, -4)$" },
        { label: "B", text: "$(3, 4)$" },
        { label: "C", text: "$(-3, -4)$" },
        { label: "D", text: "$(3, 5)$" },
      ],
      hint: "Solve $2x - 6 = 0$, then find $y$.",
      explanation: "$x = 3$, $y = 9 - 18 + 5 = -4$, so the point is $(3, -4)$.",
    },
    {
      id: "stationary-pool-15",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 + 2x - 3",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(-1, -4)$" },
        { label: "B", text: "$(1, -4)$" },
        { label: "C", text: "$(-1, 4)$" },
        { label: "D", text: "$(-1, -3)$" },
      ],
      hint: "Solve $2x + 2 = 0$, then find $y$.",
      explanation: "$x = -1$, $y = 1 - 2 - 3 = -4$, so the point is $(-1, -4)$.",
    },
    {
      id: "stationary-pool-16",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 - 2x + 1",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(1, 0)$" },
        { label: "B", text: "$(-1, 0)$" },
        { label: "C", text: "$(1, 1)$" },
        { label: "D", text: "$(0, 1)$" },
      ],
      hint: "Solve $2x - 2 = 0$, then find $y$.",
      explanation: "$x = 1$, $y = 1 - 2 + 1 = 0$, so the point is $(1, 0)$.",
    },
    {
      id: "stationary-pool-17",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 + 4x + 1",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(-2, -3)$" },
        { label: "B", text: "$(2, -3)$" },
        { label: "C", text: "$(-2, 3)$" },
        { label: "D", text: "$(-2, -1)$" },
      ],
      hint: "Solve $2x + 4 = 0$, then find $y$.",
      explanation: "$x = -2$, $y = 4 - 8 + 1 = -3$, so the point is $(-2, -3)$.",
    },
    {
      id: "stationary-pool-18",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = 2x^2 - 8x + 3",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(2, -5)$" },
        { label: "B", text: "$(2, 5)$" },
        { label: "C", text: "$(-2, -5)$" },
        { label: "D", text: "$(2, 3)$" },
      ],
      hint: "Solve $4x - 8 = 0$, then find $y$.",
      explanation: "$x = 2$, $y = 8 - 16 + 3 = -5$, so the point is $(2, -5)$.",
    },
    // ── Difficulty 4: minimum / maximum value at the stationary point ─────
    {
      id: "stationary-pool-19",
      prompt: "Find the minimum value of the function.",
      latex: "y = x^2 - 6x",
      difficulty: 4,
      answer: "-9",
      hint: "Stationary point at $x = 3$; substitute to find $y$.",
      explanation: "$x = 3$, $y = 9 - 18 = -9$. The minimum value is $-9$.",
    },
    {
      id: "stationary-pool-20",
      prompt: "Find the minimum value of the function.",
      latex: "y = x^2 - 4x + 7",
      difficulty: 4,
      answer: "3",
      hint: "Stationary point at $x = 2$; substitute to find $y$.",
      explanation: "$x = 2$, $y = 4 - 8 + 7 = 3$. The minimum value is $3$.",
    },
    {
      id: "stationary-pool-21",
      prompt: "Find the maximum value of the function.",
      latex: "y = -x^2 + 4x",
      difficulty: 4,
      answer: "4",
      hint: "Stationary point at $x = 2$; substitute to find $y$.",
      explanation: "$x = 2$, $y = -4 + 8 = 4$. The maximum value is $4$.",
    },
    {
      id: "stationary-pool-22",
      prompt: "Find the minimum value of the function.",
      latex: "y = x^2 + 6x + 5",
      difficulty: 4,
      answer: "-4",
      hint: "Stationary point at $x = -3$; substitute to find $y$.",
      explanation: "$x = -3$, $y = 9 - 18 + 5 = -4$. The minimum value is $-4$.",
    },
    {
      id: "stationary-pool-23",
      prompt: "Find the maximum value of the function.",
      latex: "y = -x^2 + 6x - 5",
      difficulty: 4,
      answer: "4",
      hint: "Stationary point at $x = 3$; substitute to find $y$.",
      explanation: "$x = 3$, $y = -9 + 18 - 5 = 4$. The maximum value is $4$.",
    },
    {
      id: "stationary-pool-24",
      prompt: "Find the minimum value of the function.",
      latex: "y = 3x^2 - 6x + 2",
      difficulty: 4,
      answer: "-1",
      hint: "Stationary point at $x = 1$; substitute to find $y$.",
      explanation: "$x = 1$, $y = 3 - 6 + 2 = -1$. The minimum value is $-1$.",
    },
    // ── Difficulty 5: cubic stationary points / multi-step ────────────────
    {
      id: "stationary-pool-25",
      prompt: "At which $x$-values is the curve stationary?",
      latex: "y = x^3 - 3x^2 + 2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 2$" },
        { label: "B", text: "$x = 2$ only" },
        { label: "C", text: "$x = 0$ and $x = 3$" },
        { label: "D", text: "$x = 1$ and $x = 2$" },
      ],
      hint: "Factor $3x^2 - 6x = 3x(x - 2)$.",
      explanation: "$3x(x - 2) = 0 \\Rightarrow x = 0$ or $x = 2$.",
    },
    {
      id: "stationary-pool-26",
      prompt: "How many stationary points does the curve have?",
      latex: "y = x^3 - 3x",
      difficulty: 5,
      answer: "2",
      hint: "Solve $3x^2 - 3 = 0$ and count the solutions.",
      explanation: "$x = \\pm 1$ — two stationary points.",
    },
    {
      id: "stationary-pool-27",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = x^3",
      difficulty: 5,
      answer: "0",
      acceptedAnswers: ["x=0"],
      hint: "Solve $3x^2 = 0$.",
      explanation: "$3x^2 = 0 \\Rightarrow x = 0$ (a horizontal point of inflection).",
    },
    {
      id: "stationary-pool-28",
      prompt: "Find the larger $x$-value at which the curve is stationary.",
      latex: "y = x^3 - 3x^2",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Solve $3x^2 - 6x = 0$ and take the larger root.",
      explanation: "$3x(x - 2) = 0 \\Rightarrow x = 0$ or $x = 2$; the larger is $2$.",
    },
    {
      id: "stationary-pool-29",
      prompt: "Find the larger $x$-value at which the curve is stationary.",
      latex: "y = 2x^3 - 6x^2",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Solve $6x^2 - 12x = 0$ and take the larger root.",
      explanation: "$6x(x - 2) = 0 \\Rightarrow x = 0$ or $x = 2$; the larger is $2$.",
    },
    {
      id: "stationary-pool-30",
      prompt: "Find the $x$-value of the stationary point.",
      latex: "y = x^2 - 12x + 1",
      difficulty: 5,
      answer: "6",
      acceptedAnswers: ["x=6"],
      hint: "Solve $2x - 12 = 0$.",
      explanation: "$2x - 12 = 0 \\Rightarrow x = 6$.",
    },
    // ── Difficulty 5 (genuine): parameter / constraint / modelling ────────
    {
      id: "stationary-pool-31",
      prompt:
        "The curve has a stationary point at $x = 2$. Find the value of $a$.",
      latex: "y = x^3 + ax^2 + 7",
      difficulty: 5,
      answer: "-3",
      acceptedAnswers: ["a=-3", "−3"],
      hint: "A stationary point satisfies $y'=0$. Differentiate, substitute $x=2$, then solve for $a$.",
      explanation:
        "$y'=3x^2+2ax$. At a stationary point $y'=0$, so at $x=2$: $3(4)+2a(2)=12+4a=0$, giving $a=-3$.",
    },
    {
      id: "stationary-pool-32",
      prompt: "For which values of $k$ does the curve have no stationary points?",
      latex: "y = x^3 + kx + 1",
      difficulty: 5,
      answer: "k>0",
      acceptedAnswers: ["k > 0", "0 < k", "0<k"],
      hint: "Stationary points need $y'=0$ to have a real solution. Examine $3x^2+k=0$.",
      explanation:
        "$y'=3x^2+k$. Setting $y'=0$ gives $x^2=-\\tfrac{k}{3}$, which has a real solution only when $-\\tfrac{k}{3}\\ge 0$, i.e. $k\\le 0$. So there are no stationary points when $k>0$.",
    },
    {
      id: "stationary-pool-33",
      prompt:
        "A ball's height (metres) after $t$ seconds is given below. Find the maximum height it reaches, in metres.",
      latex: "h(t) = -5t^2 + 30t + 2",
      difficulty: 5,
      answer: "47",
      acceptedAnswers: ["47 m", "47m"],
      hint: "The maximum occurs where $h'(t)=0$. Find that $t$, then substitute back into $h(t)$ to get the height.",
      explanation:
        "$h'(t)=-10t+30=0$ gives $t=3$ s. The maximum height is $h(3)=-5(9)+30(3)+2=-45+90+2=47$ m.",
    },
    {
      id: "stationary-pool-34",
      prompt: "The curve has a minimum value of $5$. Find the value of $c$.",
      latex: "y = x^2 - 8x + c",
      difficulty: 5,
      answer: "21",
      acceptedAnswers: ["c=21"],
      hint: "Find the $x$ of the stationary point, write the minimum $y$ in terms of $c$, then set it equal to $5$.",
      explanation:
        "$y'=2x-8=0$ gives $x=4$. The minimum value is $y(4)=16-32+c=c-16$. Setting $c-16=5$ gives $c=21$.",
    },
  ],

  masteryPassMark: 0.8,

  multiPartPractice: [
    {
      id: "stat-mp-1",
      prompt:
        "The curve $y = x^3 + ax + 6$ has a stationary point at $x = 1$.",
      latex: "y = x^3 + ax + 6",
      answer: "-3",
      hint: "Use $y'(1)=0$ to find $a$, then find the y-value and the other stationary x-value from $y'(x)=0$.",
      explanation:
        "Part (a): $y'=3x^2+a$. At $x=1$: $3+a=0$, so $a=-3$. Part (b): $y(1)=1-3+6=4$. Part (c): $y'=3x^2-3=3(x-1)(x+1)=0$, so $x=1$ or $x=-1$. The other stationary x-value is $-1$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the value of $a$.",
          latex: "",
          marks: 2,
          answer: "-3",
          acceptedAnswers: ["−3"],
          hint: "Differentiate $y$ and substitute $x=1$ into $y'(x)=0$.",
          explanation:
            "$y'=3x^2+a$. Setting $y'(1)=0$: $3(1)+a=0$, so $a=-3$.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "Find the y-coordinate of the stationary point at $x = 1$.",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Substitute $a=-3$ and $x=1$ into the original function.",
          explanation:
            "With $a=-3$: $y=x^3-3x+6$. At $x=1$: $y=1-3+6=4$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the x-value of the other stationary point.",
          marks: 2,
          answer: "-1",
          acceptedAnswers: ["−1"],
          hint: "Solve $y'(x)=0$ using the value of $a$ from part (a). One solution is $x=1$.",
          explanation:
            "$y'=3x^2-3=3(x^2-1)=3(x-1)(x+1)=0$, giving $x=1$ or $x=-1$. The other stationary x-value is $-1$.",
        },
      ],
    },
  ],
};

export const increasingDecreasingFunctionsLesson: ExplicitLesson = {
  id: "increasing-decreasing-functions",
  slug: "increasing-decreasing-functions",
  moduleSlug: "ma-c1-introduction-to-differentiation",
  moduleTitle: "Introduction to Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Increasing and Decreasing Functions",
  description:
    "Use the sign of the derivative to determine where a function is increasing or decreasing.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Increasing and Decreasing Functions",
    url: "https://www.youtube.com/embed/m_wx8WXBGnc",
  },

  learningIntention:
    "Learn how to use the sign of $f'(x)$ to determine intervals where a function is increasing or decreasing.",

  successCriteria: [
    "Explain that the derivative gives the gradient of the tangent.",
    "Use $f'(x)>0$ to identify intervals where a function is increasing.",
    "Use $f'(x)<0$ to identify intervals where a function is decreasing.",
    "Find critical values by solving $f'(x)=0$.",
    "Use test points or a sign table to state intervals clearly.",
  ],

  teaching: {
    paragraphs: [
      "Picture walking along a curve from left to right, the way you read a graph. On some stretches you head uphill and on others you head downhill. A function is increasing wherever its graph climbs as you move right, and decreasing wherever its graph falls. That single picture, uphill or downhill, is the whole idea of this lesson.",
      "You already measure steepness with gradient = rise over run. The line $y=2x$ climbs two units for every one step right, so its gradient is $+2$ and it is always increasing. The line $y=-3x$ drops three units for every step right, gradient $-3$, always decreasing. Notice it is the sign of the gradient, not its size, that tells you the direction: positive means climbing, negative means falling.",
      "A curve bends, so its steepness changes from point to point. The derivative $f'(x)$, which we built earlier as the gradient of the tangent, measures that steepness at each instant. The tangent points in the direction the curve is travelling, so the sign of $f'(x)$ reads straight off as direction of travel: where $f'(x)>0$ the tangent slopes up and the output rises as $x$ rises, and where $f'(x)<0$ the tangent slopes down and the output falls. That is why a positive derivative means increasing. It is the same uphill picture, now measured instant by instant.",
      "To turn a single instant into a whole interval, notice the gradient can only switch between climbing and falling by passing through flat. So the sign of $f'(x)$ can change only where $f'(x)=0$, the flat instants we called stationary points last lesson. Between two neighbouring stationary points the derivative keeps one sign the whole way, so the curve stays uphill the whole way or downhill the whole way. That is exactly why testing one point in each interval settles the direction for the entire interval.",
      "The most common slip is to test the sign of $f(x)$ instead of $f'(x)$. The height of the curve does not tell you which way it is heading: a curve can sit far above the axis while plunging downhill. Always read direction from the derivative's sign, never from the function's value. This lesson stops at stating where a function rises or falls; deciding whether a flat point is a peak or a trough is the next lesson.",
    ],
    latexBlocks: [
      "f'(x)>0 \\;\\Rightarrow\\; \\text{tangent slopes up} \\;\\Rightarrow\\; \\text{increasing (curve climbs)}",
      "f'(x)<0 \\;\\Rightarrow\\; \\text{tangent slopes down} \\;\\Rightarrow\\; \\text{decreasing (curve falls)}",
      "f'(x)=0 \\;\\Rightarrow\\; \\text{flat instant: the only place the sign can flip}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: A quadratic",
      questionLatex:
        "f(x)=x^2-4x+1 \\quad \\text{determine where the function is increasing and decreasing.}",
      cartesianGraph: {
        description:
          "The parabola y = x^2 - 4x + 1 has its lowest point (a flat instant) at the vertex (2, -3). A short tangent is drawn on the falling left side at (0, 1), where it slopes downhill (gradient -4), and another on the rising right side at (4, 1), where it slopes uphill (gradient 4). The tangent direction matches the direction the curve is travelling on each side.",
        xMin: -1,
        xMax: 5,
        yMin: -4,
        yMax: 7,
        xStep: 1,
        yStep: 1,
        parabolas: [
          { kind: "quadratic", a: 1, b: -4, c: 1, label: "y = x² - 4x + 1" },
        ],
        lines: [
          { kind: "linear", m: -4, b: 1, xMin: -0.7, xMax: 1, label: "tangent slopes down (falling)" },
          { kind: "linear", m: 4, b: -15, xMin: 3, xMax: 4.7, label: "tangent slopes up (rising)" },
        ],
        points: [
          { x: 0, y: 1, label: "falling here" },
          { x: 2, y: -3, label: "flat (x = 2)" },
          { x: 4, y: 1, label: "rising here" },
        ],
      },
      steps: [
        {
          explanation:
            "Direction depends on the sign of the slope, not on how high the curve sits, so first build the gradient function by differentiating.",
          latex: "f'(x)=2x-4",
        },
        {
          explanation:
            "The direction can only switch at a flat instant, so find where the tangent is horizontal by solving $f'(x)=0$. This one value is the only possible boundary, so it splits the line into $(-\\infty,2)$ and $(2,\\infty)$.",
          latex: "2x-4=0 \\quad \\Rightarrow \\quad x=2",
        },
        {
          explanation:
            "Inside each piece the sign of $f'(x)$ cannot change, so a single convenient test point speaks for the whole interval. Pick one value on each side of $x=2$.",
          latex: "f'(0)=-4<0, \\quad f'(3)=2>0",
        },
        {
          explanation:
            "Read the signs as direction of travel: a negative slope on the left means the curve is heading downhill, and a positive slope on the right means it is heading uphill.",
          latex:
            "\\text{decreasing on }(-\\infty,2), \\quad \\text{increasing on }(2,\\infty)",
        },
      ],
      finalAnswerLatex:
        "\\text{Decreasing on }(-\\infty,2), \\quad \\text{increasing on }(2,\\infty)",
    },
    {
      title: "Worked example 2: A cubic",
      questionLatex:
        "f(x)=x^3-3x^2 \\quad \\text{determine intervals of increase and decrease.}",
      steps: [
        {
          explanation:
            "Same idea, but a cubic can turn more than once, so start from the gradient function that gives the slope at every $x$.",
          latex: "f'(x)=3x^2-6x",
        },
        {
          explanation:
            "Find the flat instants where the direction can flip by solving $f'(x)=0$; factorising makes the two boundaries visible. These cut the number line into three intervals.",
          latex:
            "3x^2-6x=0 \\quad \\Rightarrow \\quad 3x(x-2)=0 \\quad \\Rightarrow \\quad x=0,2",
        },
        {
          explanation:
            "Three intervals means one test point in each, since the sign found there holds across that whole interval between flat instants.",
          latex: "f'(-1)=9>0, \\quad f'(1)=-3<0, \\quad f'(3)=9>0",
        },
        {
          explanation:
            "Translate the sign pattern into direction: uphill, then downhill, then uphill again.",
          latex:
            "\\text{increasing on }(-\\infty,0)\\cup(2,\\infty), \\quad \\text{decreasing on }(0,2)",
        },
      ],
      finalAnswerLatex:
        "\\text{Increasing on }(-\\infty,0)\\cup(2,\\infty), \\quad \\text{decreasing on }(0,2)",
    },
    {
      title: "Worked example 3: Reading a real model",
      questionLatex:
        "h(t)=t^3-6t^2+9t, \\;\\; 0\\le t\\le 4 \\quad \\text{(drone height in metres after $t$ seconds). When is it rising and when is it falling?}",
      steps: [
        {
          explanation:
            "Rising and falling are increasing and decreasing in disguise, so differentiate to get the rate the height is changing at each instant.",
          latex: "h'(t)=3t^2-12t+9",
        },
        {
          explanation:
            "The drone can only change between climbing and descending at a flat instant, so solve $h'(t)=0$; factorising exposes the turning times.",
          latex:
            "3t^2-12t+9=3(t-1)(t-3)=0 \\quad \\Rightarrow \\quad t=1,3",
        },
        {
          explanation:
            "Test one time in each interval of the domain; the sign there fixes the direction for the whole interval.",
          latex: "h'(0.5)>0, \\quad h'(2)=-3<0, \\quad h'(3.5)>0",
        },
        {
          explanation:
            "Interpret in context: a positive rate means height is growing, a negative rate means it is dropping.",
          latex:
            "\\text{rising on }(0,1)\\text{ and }(3,4), \\quad \\text{falling on }(1,3)",
        },
      ],
      finalAnswerLatex:
        "\\text{Rising on }(0,1)\\text{ and }(3,4), \\quad \\text{falling on }(1,3)",
    },
  ],

  guidedPractice: [
    {
      id: "inc-dec-guided-1",
      prompt: "Find the derivative:",
      latex: "f(x)=x^2-6x+2",
      answer: "2x-6",
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=2x-6$.",
    },
    {
      id: "inc-dec-guided-2",
      prompt: "Solve for the critical value:",
      latex: "f(x)=x^2-6x+2",
      answer: "3",
      hint: "Critical values occur where $f'(x)=0$.",
      explanation: "$2x-6=0$, so $x=3$.",
    },
    {
      id: "inc-dec-guided-3",
      prompt: "On $x<3$, is the function increasing or decreasing?",
      latex: "f'(x)=2x-6",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Negative derivative means decreasing, positive derivative means increasing.",
      explanation:
        "The function is decreasing on $(-\\infty,3)$ and increasing on $(3,\\infty)$.",
    },
    {
      id: "inc-dec-guided-4",
      prompt: "Fill in the missing sign in the sign table:",
      latex: "",
      answer: "-",
      hint: "Substitute $x=2$ into the derivative.",
      explanation:
        "$f'(2)=(2-1)(2-3)=-1$, so the sign on $(1,3)$ is negative.",
    },
  ],

  independentPractice: [
    {
      id: "inc-dec-ind-1",
      prompt: "For $x>3$, is the function increasing or decreasing?",
      latex: "y=x^2-6x+2",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Find the derivative sign on each side of the critical value $x=3$.",
      explanation:
        "$\\frac{dy}{dx}=2x-6$, so $x=3$. The derivative is negative before $3$ and positive after $3$, so the function is decreasing on $(-\\infty,3)$ and increasing on $(3,\\infty)$.",
    },
    {
      id: "inc-dec-ind-2",
      prompt: "For $1<x<3$, is the function increasing or decreasing?",
      latex: "y=x^3-6x^2+9x",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "The derivative factorises as $3(x-1)(x-3)$.",
      explanation:
        "$\\frac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)$. Testing intervals gives increasing on $(-\\infty,1)$ and $(3,\\infty)$, and decreasing on $(1,3)$.",
    },
    {
      id: "inc-dec-ind-3",
      prompt: "For $x>2$, is the function increasing or decreasing?",
      latex: "y=-x^2+4x-1",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Be careful with the negative leading coefficient.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $x=2$. The derivative is positive before $2$ and negative after $2$, so the function is increasing on $(-\\infty,2)$ and decreasing on $(2,\\infty)$.",
    },
    {
      id: "inc-dec-ind-4",
      prompt: "For $-1<x<3$, is the function increasing or decreasing?",
      latex: "f(x)=-x^3+3x^2+9x",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Use $f'(x)=-3(x-3)(x+1)$.",
      explanation:
        "$f'(x)=-3x^2+6x+9=-3(x-3)(x+1)$. Testing intervals gives decreasing on $(-\\infty,-1)$ and $(3,\\infty)$, and increasing on $(-1,3)$.",
    },
    {
      id: "inc-dec-ind-5",
      prompt:
        "A model has derivative below. For $-4<x<2$, is the original function increasing or decreasing?",
      latex: "f'(x)=-3(x-2)(x+4)",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "The negative leading factor reverses the usual outside-positive pattern.",
      explanation:
        "Testing intervals around $x=-4$ and $x=2$ gives signs $-,+,-$. Therefore the function is increasing on $(-4,2)$ and decreasing on $(-\\infty,-4)$ and $(2,\\infty)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using the original function to test signs.",
      fix: "The value of $f(x)$ is the curve's height, not its direction, and a curve can be high above the axis while still falling. Direction comes from steepness, so test the sign of $f'(x)$, not $f(x)$.",
    },
    {
      mistake: "Forgetting to split the number line at every critical value.",
      fix: "Each solution to $f'(x)=0$ creates a boundary for the sign table.",
    },
    {
      mistake: "Reversing the meaning of positive and negative derivative signs.",
      fix: "Anchor it to the uphill picture: a positive slope tilts up, so the output rises as $x$ rises. $f'(x)>0$ means increasing and $f'(x)<0$ means decreasing.",
    },
    {
      mistake: "Classifying stationary points in this lesson.",
      fix: "Only state intervals of increase and decrease here. Classification comes next.",
    },
  ],

  masteryQuiz: [
    {
      id: "inc-dec-mastery-1",
      prompt: "Find the derivative:",
      latex: "f(x)=x^3-12x+1",
      answer: "C",
      choices: [
        { label: "A", text: "$3x^2-12+1$" },
        { label: "B", text: "$x^2-12$" },
        { label: "C", text: "$3x^2-12$" },
        { label: "D", text: "$3x^3-12$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=3x^2-12$.",
    },
    {
      id: "inc-dec-mastery-2",
      prompt: "Find the positive critical value:",
      latex: "3x^2-12=0",
      answer: "2",
      hint: "Solve $x^2=4$.",
      explanation: "$3x^2-12=0$, so $x=-2$ or $x=2$.",
    },
    {
      id: "inc-dec-mastery-3",
      prompt: "On $-2<x<2$, is $f'(x)$ positive or negative?",
      latex: "(-\\infty,-2), \\quad (-2,2), \\quad (2,\\infty)",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
        { label: "C", text: "zero" },
      ],
      hint: "Substitute a test value into $f'(x)$ and check whether the derivative is positive or negative.",
      explanation: "$f'(-3)>0$, $f'(0)<0$, and $f'(3)>0$.",
    },
    {
      id: "inc-dec-mastery-4",
      prompt: "On $x<1$, is the function increasing or decreasing?",
      latex: "f'(x)=2x-2",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Choose a test value less than 1 and check the sign of the derivative.",
      explanation: "For $x<1$, a test value like $x=0$ gives $f'(0)=-2$, which is negative. A negative derivative means the function is decreasing.",
    },
    {
      id: "inc-dec-mastery-5",
      prompt: "On $x>3$, is the function increasing or decreasing?",
      latex: "f'(x)=x-3",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Choose a test value greater than 3 and check the sign of the derivative.",
      explanation: "For $x>3$, a test value like $x=4$ gives $f'(4)=1$, which is positive. A positive derivative means the function is increasing.",
    },
    {
      id: "inc-dec-mastery-6",
      prompt: "On $1<x<4$, is $f'(x)$ positive or negative?",
      latex: "f'(x)=(x-1)(x-4)",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
        { label: "C", text: "zero" },
      ],
      hint: "A positive quadratic factorisation is positive outside its roots.",
      explanation:
        "Testing intervals around $x=1$ and $x=4$ gives the sign pattern $+,-,+$.",
    },
    {
      id: "inc-dec-mastery-7",
      prompt: "On $x>4$, is the function increasing or decreasing?",
      latex: "f'(x)=(x-1)(x-4)",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Increasing means $f'(x)>0$.",
      explanation:
        "$f'(x)>0$ on $(-\\infty,1)$ and $(4,\\infty)$, so the function is increasing on those intervals.",
    },
    {
      id: "inc-dec-mastery-8",
      prompt: "On $1<x<4$, is the function increasing or decreasing?",
      latex: "f'(x)=(x-1)(x-4)",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Decreasing means $f'(x)<0$.",
      explanation:
        "$f'(x)<0$ on $(1,4)$, so the function is decreasing on that interval.",
    },
    {
      id: "inc-dec-mastery-9",
      prompt:
        "A height function has $h'(2)=-3$. Complete the sentence: at $t=2$, the height is ____.",
      latex: "h'(2)=-3",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "A negative derivative means the quantity is decreasing.",
      explanation:
        "Since $h'(2)<0$, the height is decreasing at $t=2$.",
    },
    {
      id: "inc-dec-mastery-10",
      prompt:
        "Choose the correct statement. A: $f$ is increasing on $(2,5)$. B: $f$ is decreasing on $(2,5)$. C: $f$ is stationary for every $x$ in $(2,5)$.",
      latex: "f'(x)<0 \\quad \\text{for }2<x<5",
      answer: "B",
      choices: [
        { label: "A", text: "$f$ is increasing on $(2,5)$" },
        { label: "B", text: "$f$ is decreasing on $(2,5)$" },
        { label: "C", text: "$f$ is stationary for every $x$ in $(2,5)$" },
      ],
      hint: "Negative derivative means decreasing.",
      explanation:
        "Since $f'(x)<0$ throughout $(2,5)$, the function is decreasing on that interval. Option B is correct.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: sign of f' at a point → increasing/decreasing ───────
    {
      id: "incdec-pool-1",
      prompt: "At $x = 2$ the gradient is $f'(2) = 4$. The function there is:",
      latex: "f(x) = x^2",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "A positive gradient means increasing.",
      explanation: "$f'(2) = 4 > 0$, so the function is increasing.",
    },
    {
      id: "incdec-pool-2",
      prompt: "At $x = -2$ the gradient is $f'(-2) = -4$. The function there is:",
      latex: "f(x) = x^2",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "A negative gradient means decreasing.",
      explanation: "$f'(-2) = -4 < 0$, so the function is decreasing.",
    },
    {
      id: "incdec-pool-3",
      prompt: "At $x = 1$, the function is:",
      latex: "f(x) = x^2 - 6x",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "Find $f'(1)$ where $f'(x) = 2x - 6$.",
      explanation: "$f'(1) = -4 < 0$, so it is decreasing.",
    },
    {
      id: "incdec-pool-4",
      prompt: "At $x = 5$, the function is:",
      latex: "f(x) = x^2 - 6x",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "Find $f'(5)$ where $f'(x) = 2x - 6$.",
      explanation: "$f'(5) = 4 > 0$, so it is increasing.",
    },
    {
      id: "incdec-pool-5",
      prompt: "At $x = 2$, the function is:",
      latex: "f(x) = x^3",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = 3x^2$ is positive for $x = 2$.",
      explanation: "$f'(2) = 12 > 0$, so it is increasing.",
    },
    {
      id: "incdec-pool-6",
      prompt: "At $x = 1$, the function is:",
      latex: "f(x) = -x^2",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = -2x$; evaluate at $x = 1$.",
      explanation: "$f'(1) = -2 < 0$, so it is decreasing.",
    },
    // ── Difficulty 2: critical value (solve f'(x)=0) ──────────────────────
    {
      id: "incdec-pool-7",
      prompt: "Find the critical value (where $f'(x) = 0$).",
      latex: "f(x) = x^2 - 4x",
      difficulty: 2,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Solve $2x - 4 = 0$.",
      explanation: "$2x - 4 = 0 \\Rightarrow x = 2$.",
    },
    {
      id: "incdec-pool-8",
      prompt: "Find the critical value (where $f'(x) = 0$).",
      latex: "f(x) = x^2 + 6x",
      difficulty: 2,
      answer: "-3",
      acceptedAnswers: ["x=-3"],
      hint: "Solve $2x + 6 = 0$.",
      explanation: "$2x + 6 = 0 \\Rightarrow x = -3$.",
    },
    {
      id: "incdec-pool-9",
      prompt: "Find the critical value (where $f'(x) = 0$).",
      latex: "f(x) = x^2 - 2x",
      difficulty: 2,
      answer: "1",
      acceptedAnswers: ["x=1"],
      hint: "Solve $2x - 2 = 0$.",
      explanation: "$2x - 2 = 0 \\Rightarrow x = 1$.",
    },
    {
      id: "incdec-pool-10",
      prompt: "Find the critical value (where $f'(x) = 0$).",
      latex: "f(x) = 2x^2 - 8x",
      difficulty: 2,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "Solve $4x - 8 = 0$.",
      explanation: "$4x - 8 = 0 \\Rightarrow x = 2$.",
    },
    {
      id: "incdec-pool-11",
      prompt: "Find the critical value (where $f'(x) = 0$).",
      latex: "f(x) = x^2 - x",
      difficulty: 2,
      answer: "1/2",
      acceptedAnswers: ["0.5", "x=1/2", "x=0.5"],
      hint: "Solve $2x - 1 = 0$.",
      explanation: "$2x - 1 = 0 \\Rightarrow x = \\tfrac{1}{2}$.",
    },
    {
      id: "incdec-pool-12",
      prompt: "Find the critical value (where $f'(x) = 0$).",
      latex: "f(x) = x^2 + 10x",
      difficulty: 2,
      answer: "-5",
      acceptedAnswers: ["x=-5"],
      hint: "Solve $2x + 10 = 0$.",
      explanation: "$2x + 10 = 0 \\Rightarrow x = -5$.",
    },
    // ── Difficulty 3: interval where a quadratic is increasing/decreasing ─
    {
      id: "incdec-pool-13",
      prompt: "For which values of $x$ is the function increasing?",
      latex: "f(x) = x^2 - 4x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x > 2$" },
        { label: "B", text: "$x < 2$" },
        { label: "C", text: "$x > 0$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "The parabola opens up with vertex at $x = 2$.",
      explanation: "$f'(x) = 2x - 4 > 0 \\Rightarrow x > 2$.",
    },
    {
      id: "incdec-pool-14",
      prompt: "For which values of $x$ is the function decreasing?",
      latex: "f(x) = x^2 - 4x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x < 2$" },
        { label: "B", text: "$x > 2$" },
        { label: "C", text: "$x < 0$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "Left of the vertex the parabola falls.",
      explanation: "$f'(x) = 2x - 4 < 0 \\Rightarrow x < 2$.",
    },
    {
      id: "incdec-pool-15",
      prompt: "For which values of $x$ is the function increasing?",
      latex: "f(x) = x^2 + 2x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x > -1$" },
        { label: "B", text: "$x < -1$" },
        { label: "C", text: "$x > 1$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "Vertex at $x = -1$; opens up.",
      explanation: "$f'(x) = 2x + 2 > 0 \\Rightarrow x > -1$.",
    },
    {
      id: "incdec-pool-16",
      prompt: "For which values of $x$ is the function increasing?",
      latex: "f(x) = -x^2 + 4x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x < 2$" },
        { label: "B", text: "$x > 2$" },
        { label: "C", text: "$x < 0$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "This parabola opens downward, so it rises to the left of its vertex.",
      explanation: "$f'(x) = -2x + 4 > 0 \\Rightarrow x < 2$.",
    },
    {
      id: "incdec-pool-17",
      prompt: "For which values of $x$ is the function decreasing?",
      latex: "f(x) = x^2 - 6x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x < 3$" },
        { label: "B", text: "$x > 3$" },
        { label: "C", text: "$x < 0$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "Vertex at $x = 3$; opens up.",
      explanation: "$f'(x) = 2x - 6 < 0 \\Rightarrow x < 3$.",
    },
    {
      id: "incdec-pool-18",
      prompt: "For which values of $x$ is the function increasing?",
      latex: "f(x) = x^2 + 8x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x > -4$" },
        { label: "B", text: "$x < -4$" },
        { label: "C", text: "$x > 4$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "Vertex at $x = -4$; opens up.",
      explanation: "$f'(x) = 2x + 8 > 0 \\Rightarrow x > -4$.",
    },
    // ── Difficulty 4: increasing/decreasing for a cubic at a point ────────
    {
      id: "incdec-pool-19",
      prompt: "At $x = 2$, the function is:",
      latex: "f(x) = x^3 - 3x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = 3x^2 - 3$; evaluate at $x = 2$.",
      explanation: "$f'(2) = 9 > 0$, so it is increasing.",
    },
    {
      id: "incdec-pool-20",
      prompt: "At $x = 0$, the function is:",
      latex: "f(x) = x^3 - 3x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = 3x^2 - 3$; evaluate at $x = 0$.",
      explanation: "$f'(0) = -3 < 0$, so it is decreasing.",
    },
    {
      id: "incdec-pool-21",
      prompt: "At $x = 1$, the function is:",
      latex: "f(x) = x^3 - 12x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = 3x^2 - 12$; evaluate at $x = 1$.",
      explanation: "$f'(1) = -9 < 0$, so it is decreasing.",
    },
    {
      id: "incdec-pool-22",
      prompt: "At $x = 3$, the function is:",
      latex: "f(x) = x^3 - 12x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = 3x^2 - 12$; evaluate at $x = 3$.",
      explanation: "$f'(3) = 15 > 0$, so it is increasing.",
    },
    {
      id: "incdec-pool-23",
      prompt: "At $x = 1$, the function is:",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = 3x^2 - 6x$; evaluate at $x = 1$.",
      explanation: "$f'(1) = -3 < 0$, so it is decreasing.",
    },
    {
      id: "incdec-pool-24",
      prompt: "At $x = 2$, the function is:",
      latex: "f(x) = x^3",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "stationary" },
        { label: "D", text: "constant" },
      ],
      hint: "$f'(x) = 3x^2$ is positive away from $0$.",
      explanation: "$f'(2) = 12 > 0$, so it is increasing.",
    },
    // ── Difficulty 5: intervals for cubics / multi-step ───────────────────
    {
      id: "incdec-pool-25",
      prompt: "On which interval is the function decreasing?",
      latex: "f(x) = x^3 - 3x",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$-1 < x < 1$" },
        { label: "B", text: "$x > 1$" },
        { label: "C", text: "$x < -1$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "It decreases between its two stationary points at $x = \\pm 1$.",
      explanation: "$f'(x) = 3x^2 - 3 < 0$ for $-1 < x < 1$.",
    },
    {
      id: "incdec-pool-26",
      prompt: "On which interval is the function decreasing?",
      latex: "f(x) = x^3 - 12x",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$-2 < x < 2$" },
        { label: "B", text: "$x > 2$" },
        { label: "C", text: "$x < -2$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "It decreases between its stationary points at $x = \\pm 2$.",
      explanation: "$f'(x) = 3x^2 - 12 < 0$ for $-2 < x < 2$.",
    },
    {
      id: "incdec-pool-27",
      prompt:
        "Below which value of $x$ is the function decreasing? Give the critical value.",
      latex: "f(x) = x^2 - 8x",
      difficulty: 5,
      answer: "4",
      acceptedAnswers: ["x=4"],
      hint: "It decreases for $x$ less than the vertex; find the vertex.",
      explanation: "$f'(x) = 2x - 8 = 0 \\Rightarrow x = 4$; it decreases for $x < 4$.",
    },
    {
      id: "incdec-pool-28",
      prompt: "For which values of $x$ is the function increasing?",
      latex: "f(x) = x^2 + 2x - 3",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$x > -1$" },
        { label: "B", text: "$x < -1$" },
        { label: "C", text: "$x > 1$" },
        { label: "D", text: "$x < 1$" },
      ],
      hint: "Vertex at $x = -1$; opens up.",
      explanation: "$f'(x) = 2x + 2 > 0 \\Rightarrow x > -1$.",
    },
    {
      id: "incdec-pool-29",
      prompt: "For which values of $x$ is the function decreasing?",
      latex: "f(x) = -x^2 + 6x",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$x > 3$" },
        { label: "B", text: "$x < 3$" },
        { label: "C", text: "$x > 0$" },
        { label: "D", text: "all $x$" },
      ],
      hint: "This parabola opens downward with vertex at $x = 3$.",
      explanation: "$f'(x) = -2x + 6 < 0 \\Rightarrow x > 3$.",
    },
    {
      id: "incdec-pool-30",
      prompt: "Is the function ever decreasing?",
      latex: "f(x) = x^3",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "never (it is non-decreasing everywhere)" },
        { label: "B", text: "for $x < 0$" },
        { label: "C", text: "for $x > 0$" },
        { label: "D", text: "always" },
      ],
      hint: "$f'(x) = 3x^2 \\ge 0$ for every $x$.",
      explanation: "$f'(x) = 3x^2 \\ge 0$ always, so the function never decreases.",
    },
  ],

  masteryPassMark: 0.8,
};

export const firstDerivativeTestLesson: ExplicitLesson = {
  id: "first-derivative-test",
  slug: "first-derivative-test",
  moduleSlug: "ma-c1-introduction-to-differentiation",
  moduleTitle: "Introduction to Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "First Derivative Test",
  description:
    "Classify stationary points by testing the sign of the first derivative on either side.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "First Derivative Test",
    url: "https://www.youtube.com/embed/Of1lkx9IXu4",
  },

  learningIntention:
    "Learn how to use the first derivative test to classify stationary points as local maxima or local minima.",

  successCriteria: [
    "Find stationary $x$-values by solving $f'(x)=0$.",
    "Use test points to determine the sign of $f'(x)$ around each stationary point.",
    "Identify a local maximum when $f'(x)$ changes from positive to negative.",
    "Identify a local minimum when $f'(x)$ changes from negative to positive.",
    "Find the coordinates of each stationary point and state its classification.",
  ],

  teaching: {
    paragraphs: [
      "The first derivative test uses the sign of $f'(x)$ around a stationary point.",
      "If $f'(x)$ changes from positive to negative, the function changes from increasing to decreasing, so there is a local maximum.",
      "If $f'(x)$ changes from negative to positive, the function changes from decreasing to increasing, so there is a local minimum.",
      "If $f'(x)$ does not change sign, the stationary point is not a local maximum or local minimum.",
      "This test builds directly on increasing and decreasing intervals.",
      "Always give the coordinates of the stationary point as well as the classification.",
    ],
    latexBlocks: [
      "+ \\; \\to \\; - \\quad \\Rightarrow \\quad \\text{local maximum}",
      "- \\; \\to \\; + \\quad \\Rightarrow \\quad \\text{local minimum}",
      "+ \\; \\to \\; + \\text{ or } - \\; \\to \\; - \\quad \\Rightarrow \\quad \\text{not a local maximum or minimum}",
      "f'(x)=0 \\quad \\Rightarrow \\quad \\text{test signs around the stationary point}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Classify one stationary point",
      questionLatex:
        "f(x)=x^2-6x+5 \\quad \\text{use the first derivative test to classify the stationary point.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "f'(x)=2x-6",
        },
        {
          explanation: "Solve $f'(x)=0$.",
          latex: "2x-6=0 \\quad \\Rightarrow \\quad x=3",
        },
        {
          explanation: "Test signs around $x=3$.",
          latex: "f'(0)=-6<0, \\quad f'(4)=2>0",
        },
        {
          explanation: "Classify using the sign change.",
          latex: "- \\; \\to \\; + \\quad \\Rightarrow \\quad \\text{local minimum}",
        },
        {
          explanation: "Find the coordinate.",
          latex: "f(3)=3^2-6(3)+5=-4",
        },
      ],
      finalAnswerLatex: "\\text{Local minimum at }(3,-4)",
    },
    {
      title: "Worked example 2: Classify two stationary points",
      questionLatex:
        "f(x)=x^3-3x^2-9x+2 \\quad \\text{use the first derivative test to classify the stationary points.}",
      steps: [
        {
          explanation: "Differentiate the function.",
          latex: "f'(x)=3x^2-6x-9",
        },
        {
          explanation: "Solve $f'(x)=0$.",
          latex:
            "3x^2-6x-9=0 \\quad \\Rightarrow \\quad 3(x-3)(x+1)=0 \\quad \\Rightarrow \\quad x=-1,3",
        },
        {
          explanation: "Test signs across the intervals.",
          latex: "f'(-2)>0, \\quad f'(0)<0, \\quad f'(4)>0",
        },
        {
          explanation: "Classify each stationary point.",
          latex:
            "x=-1: + \\to - \\Rightarrow \\text{local maximum}, \\quad x=3: - \\to + \\Rightarrow \\text{local minimum}",
        },
        {
          explanation: "Find the coordinates.",
          latex: "f(-1)=7, \\quad f(3)=-25",
        },
      ],
      finalAnswerLatex:
        "\\text{Local maximum at }(-1,7), \\quad \\text{local minimum at }(3,-25)",
    },
  ],

  guidedPractice: [
    {
      id: "fdt-guided-1",
      prompt: "Find the derivative:",
      latex: "f(x)=x^2-4x+1",
      answer: "2x-4",
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=2x-4$.",
    },
    {
      id: "fdt-guided-2",
      prompt: "Find the stationary x-value:",
      latex: "f(x)=x^2-4x+1",
      answer: "2",
      hint: "Solve $f'(x)=0$.",
      explanation: "$x=2$.",
    },
    {
      id: "fdt-guided-3",
      prompt: "Classify the stationary point:",
      latex: "f'(x)=2x-4, \\quad x=2",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A change from negative to positive gives a local minimum.",
      explanation: "$- \\to +$ means the stationary point is a local minimum.",
    },
    {
      id: "fdt-guided-4",
      prompt: "Complete the classification from the sign change:",
      latex: "f'(x): \\quad + \\to -",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A first-derivative sign change from positive to negative gives a local maximum.",
      explanation:
        "A change from positive to negative means the stationary point is a local maximum.",
    },
  ],

  independentPractice: [
    {
      id: "fdt-ind-1",
      prompt: "Classify the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "This quadratic opens upwards.",
      explanation:
        "$\\frac{dy}{dx}=2x-8$, so $x=4$. The sign changes from negative to positive, and $y(4)=-10$, so there is a local minimum at $(4,-10)$.",
    },
    {
      id: "fdt-ind-2",
      prompt: "Classify the stationary point:",
      latex: "y=-x^2+4x-1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "This quadratic opens downwards.",
      explanation:
        "$\\frac{dy}{dx}=-2x+4$, so $x=2$. The sign changes from positive to negative, and $y(2)=3$, so there is a local maximum at $(2,3)$.",
    },
    {
      id: "fdt-ind-3",
      prompt: "Classify the stationary point at $x=1$:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "The derivative is $3(x-1)(x-3)$.",
      explanation:
        "$\\frac{dy}{dx}=3(x-1)(x-3)$, so $x=1,3$. The signs are $+,-,+$, so there is a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "fdt-ind-4",
      prompt: "Classify the stationary point at $x=2$:",
      latex: "f(x)=x^3-12x+5",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the sign of $f'(x)=3(x-2)(x+2)$ on each side of $x=2$.",
      explanation:
        "$f'(x)=3(x-2)(x+2)$, so $x=-2,2$. The signs are $+,-,+$, so there is a local maximum at $(-2,21)$ and a local minimum at $(2,-11)$.",
    },
    {
      id: "fdt-ind-5",
      prompt:
        "A revenue model has one stationary point. Classify it.",
      latex: "R(x)=-x^2+10x+3",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the first derivative sign change around the stationary point.",
      explanation:
        "$R'(x)=-2x+10$, so $x=5$. The derivative changes from positive to negative, and $R(5)=28$, so there is a local maximum at $(5,28)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Classifying from the y-value instead of the derivative sign.",
      fix: "Use the sign change in $f'(x)$, not the size of the $y$-value.",
    },
    {
      mistake: "Forgetting to find the coordinates.",
      fix: "After classifying, substitute each stationary $x$-value into the original function.",
    },
    {
      mistake: "Reversing maximum and minimum sign changes.",
      fix: "$+ \\to -$ gives a local maximum, while $- \\to +$ gives a local minimum.",
    },
    {
      mistake: "Assuming every stationary point is a maximum or minimum.",
      fix: "If $f'(x)$ does not change sign, it is not a local maximum or local minimum.",
    },
  ],

  masteryQuiz: [
    {
      id: "fdt-mastery-1",
      prompt: "Differentiate:",
      latex: "f(x)=x^3-6x^2+9x+2",
      answer: "A",
      choices: [
        { label: "A", text: "$3x^2-12x+9$" },
        { label: "B", text: "$3x^2-12x+9+2$" },
        { label: "C", text: "$x^2-12x+9$" },
        { label: "D", text: "$3x^2-6x+9$" },
      ],
      hint: "Differentiate term-by-term.",
      explanation: "$f'(x)=3x^2-12x+9$.",
    },
    {
      id: "fdt-mastery-2",
      prompt: "Find the larger stationary x-value:",
      latex: "3x^2-12x+9=0",
      answer: "3",
      hint: "Factorise by taking out $3$ first.",
      explanation:
        "$3x^2-12x+9=3(x-1)(x-3)$, so $x=1$ or $x=3$.",
    },
    {
      id: "fdt-mastery-3",
      prompt: "On $1<x<3$, is $f'(x)$ positive or negative?",
      latex: "(-\\infty,1), \\quad (1,3), \\quad (3,\\infty)",
      answer: "B",
      choices: [
        { label: "A", text: "positive" },
        { label: "B", text: "negative" },
        { label: "C", text: "zero" },
      ],
      hint: "Substitute a test value into $f'(x)$ on the interval and check its sign.",
      explanation: "The sign pattern is $+,-,+$.",
    },
    {
      id: "fdt-mastery-4",
      prompt: "Find the stationary point coordinate for $x=3$:",
      latex: "f(x)=x^3-6x^2+9x+2",
      answer: "(3,2)",
      acceptedAnswers: ["3,2", "3, 2", "(3, 2)"],
      hint: "Substitute both $x$-values into the original function.",
      explanation: "$f(1)=6$ and $f(3)=2$, so the points are $(1,6)$ and $(3,2)$.",
    },
    {
      id: "fdt-mastery-5",
      prompt: "Classify the stationary point at $x=1$:",
      latex: "\\text{sign pattern } +,-,+ \\quad \\text{at } x=1,3",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "$+ \\to -$ gives a local maximum, and $- \\to +$ gives a local minimum.",
      explanation:
        "There is a local maximum at $(1,6)$ and a local minimum at $(3,2)$.",
    },
    {
      id: "fdt-mastery-6",
      prompt: "Classify the stationary point from the sign change:",
      latex: "f'(x): \\quad + \\to -",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "In the first derivative test, increasing then decreasing means a local maximum.",
      explanation:
        "A change in $f'(x)$ from positive to negative means the stationary point is a local maximum.",
    },
    {
      id: "fdt-mastery-7",
      prompt: "Classify the stationary point at $x=3$ from the sign pattern:",
      latex: "x=1,3 \\qquad f'(x): \\quad +,-,+",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Look at the sign change at each stationary x-value.",
      explanation:
        "At $x=1$, $f'(x)$ changes from positive to negative, giving a local maximum. At $x=3$, it changes from negative to positive, giving a local minimum.",
    },
    {
      id: "fdt-mastery-8",
      prompt: "Classify the stationary point at $x=1$:",
      latex: "f(x)=x^3-6x^2+9x+1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "The derivative factorises as $3(x-1)(x-3)$.",
      explanation:
        "$f'(x)=3x^2-12x+9=3(x-1)(x-3)$. The sign pattern is $+,-,+$, so the points are a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "fdt-mastery-9",
      prompt:
        "The derivative is positive on both sides of a stationary point at $x=0$. Choose the best classification.",
      latex: "f'(x): \\quad +,+",
      answer: "C",
      acceptedAnswers: [
        "not a local maximum or minimum",
        "not maximum or minimum",
        "not max or min",
      ],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A maximum or minimum needs a sign change in $f'(x)$.",
      explanation:
        "If $f'(x)$ does not change sign, the stationary point is not a local maximum or local minimum.",
    },
    {
      id: "fdt-mastery-10",
      prompt:
        "A profit function has a stationary point where $x=5$ and $P(5)=40$. The derivative changes from positive to negative. Complete the classification.",
      latex: "P'(x): \\quad + \\to -",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Positive to negative means a local maximum.",
      explanation:
        "The profit increases before $x=5$ and decreases after $x=5$, so there is a local maximum profit of $40$ at $x=5$.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: classify from a described sign change ───────────────
    {
      id: "fdt-pool-1",
      prompt:
        "If $f'(x)$ changes from positive to negative at $x = 2$, then $x = 2$ is a:",
      latex: "f'(x): + \\to -",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "horizontal asymptote" },
      ],
      hint: "Positive then negative means the curve rises then falls.",
      explanation: "A $+ \\to -$ change gives a local maximum.",
    },
    {
      id: "fdt-pool-2",
      prompt:
        "If $f'(x)$ changes from negative to positive at $x = 1$, then $x = 1$ is a:",
      latex: "f'(x): - \\to +",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "vertical asymptote" },
      ],
      hint: "Negative then positive means the curve falls then rises.",
      explanation: "A $- \\to +$ change gives a local minimum.",
    },
    {
      id: "fdt-pool-3",
      prompt:
        "The gradient is positive just left of $x = 3$ and negative just right. The point $x = 3$ is a:",
      latex: "f'(2.9) > 0,\\quad f'(3.1) < 0",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "none of these" },
      ],
      hint: "Rising then falling means a peak.",
      explanation: "Positive then negative gradient gives a local maximum.",
    },
    {
      id: "fdt-pool-4",
      prompt:
        "The gradient is negative just left of $x = -1$ and positive just right. The point $x = -1$ is a:",
      latex: "f'(-1.1) < 0,\\quad f'(-0.9) > 0",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "none of these" },
      ],
      hint: "Falling then rising means a trough.",
      explanation: "Negative then positive gradient gives a local minimum.",
    },
    {
      id: "fdt-pool-5",
      prompt:
        "At a stationary point $f'(x)$ is positive on both sides (no sign change). The point is:",
      latex: "f'(x): + \\to +",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "a stationary point of inflection (not a max or min)" },
        { label: "B", text: "a local maximum" },
        { label: "C", text: "a local minimum" },
        { label: "D", text: "impossible" },
      ],
      hint: "No sign change means it is neither a peak nor a trough.",
      explanation: "No sign change at a stationary point gives a horizontal point of inflection.",
    },
    {
      id: "fdt-pool-6",
      prompt: "At a local minimum, the sign of $f'(x)$ changes from:",
      latex: "\\text{local minimum}",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "negative to positive" },
        { label: "B", text: "positive to negative" },
        { label: "C", text: "positive to positive" },
        { label: "D", text: "zero to zero" },
      ],
      hint: "The curve falls into the minimum and rises out of it.",
      explanation: "A local minimum has $f'(x)$ changing from negative to positive.",
    },
    // ── Difficulty 2: classify the stationary point of a quadratic ────────
    {
      id: "fdt-pool-7",
      prompt: "Classify the stationary point.",
      latex: "f(x) = x^2 - 4x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "no stationary point" },
      ],
      hint: "An upward parabola has a minimum.",
      explanation: "The parabola opens up, so its stationary point is a local minimum.",
    },
    {
      id: "fdt-pool-8",
      prompt: "Classify the stationary point.",
      latex: "f(x) = -x^2 + 6x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "no stationary point" },
      ],
      hint: "A downward parabola has a maximum.",
      explanation: "The parabola opens down, so its stationary point is a local maximum.",
    },
    {
      id: "fdt-pool-9",
      prompt: "Classify the stationary point.",
      latex: "f(x) = x^2 + 2x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "no stationary point" },
      ],
      hint: "Positive leading coefficient → opens up.",
      explanation: "Opens up, so the stationary point is a local minimum.",
    },
    {
      id: "fdt-pool-10",
      prompt: "Classify the stationary point.",
      latex: "f(x) = -x^2 - 4x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "no stationary point" },
      ],
      hint: "Negative leading coefficient → opens down.",
      explanation: "Opens down, so the stationary point is a local maximum.",
    },
    {
      id: "fdt-pool-11",
      prompt: "Classify the stationary point.",
      latex: "f(x) = 2x^2 - 8x",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "no stationary point" },
      ],
      hint: "Positive leading coefficient → opens up.",
      explanation: "Opens up, so the stationary point is a local minimum.",
    },
    {
      id: "fdt-pool-12",
      prompt: "Classify the stationary point.",
      latex: "f(x) = 10 - x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "no stationary point" },
      ],
      hint: "The $-x^2$ term makes it open down.",
      explanation: "Opens down, so the stationary point is a local maximum.",
    },
    // ── Difficulty 3: stationary x-values of a cubic, and classification ──
    {
      id: "fdt-pool-13",
      prompt: "Find the stationary $x$-values.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 1$ and $x = -1$" },
        { label: "B", text: "$x = 1$ only" },
        { label: "C", text: "$x = 0$ and $x = 3$" },
        { label: "D", text: "$x = 3$ and $x = -3$" },
      ],
      hint: "Solve $3x^2 - 3 = 0$.",
      explanation: "$3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$.",
    },
    {
      id: "fdt-pool-14",
      prompt: "Find the stationary $x$-values.",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 2$" },
        { label: "B", text: "$x = 2$ only" },
        { label: "C", text: "$x = 0$ and $x = 3$" },
        { label: "D", text: "$x = 2$ and $x = -2$" },
      ],
      hint: "Factor $3x^2 - 6x = 3x(x - 2)$.",
      explanation: "$3x(x - 2) = 0 \\Rightarrow x = 0$ or $x = 2$.",
    },
    {
      id: "fdt-pool-15",
      prompt: "Find the stationary $x$-values.",
      latex: "f(x) = x^3 - 12x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 2$ and $x = -2$" },
        { label: "B", text: "$x = 2$ only" },
        { label: "C", text: "$x = 0$ and $x = 4$" },
        { label: "D", text: "$x = 4$ and $x = -4$" },
      ],
      hint: "Solve $3x^2 - 12 = 0$.",
      explanation: "$3x^2 - 12 = 0 \\Rightarrow x = \\pm 2$.",
    },
    {
      id: "fdt-pool-16",
      prompt: "Find the stationary $x$-values.",
      latex: "f(x) = x^3 - 6x^2",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 4$" },
        { label: "B", text: "$x = 4$ only" },
        { label: "C", text: "$x = 0$ and $x = 2$" },
        { label: "D", text: "$x = 2$ and $x = 4$" },
      ],
      hint: "Factor $3x^2 - 12x = 3x(x - 4)$.",
      explanation: "$3x(x - 4) = 0 \\Rightarrow x = 0$ or $x = 4$.",
    },
    {
      id: "fdt-pool-17",
      prompt: "Classify the stationary point at $x = 1$.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Check the sign of $f'(x) = 3x^2 - 3$ just left and right of $x = 1$.",
      explanation: "$f'$ changes from negative to positive at $x = 1$ → local minimum.",
    },
    {
      id: "fdt-pool-18",
      prompt: "Classify the stationary point at $x = -1$.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Check the sign of $f'(x) = 3x^2 - 3$ just left and right of $x = -1$.",
      explanation: "$f'$ changes from positive to negative at $x = -1$ → local maximum.",
    },
    // ── Difficulty 4: coordinates of the local max / min ──────────────────
    {
      id: "fdt-pool-19",
      prompt: "Find the local minimum point.",
      latex: "f(x) = x^2 - 4x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$(2, -4)$" },
        { label: "B", text: "$(2, 4)$" },
        { label: "C", text: "$(-2, -4)$" },
        { label: "D", text: "$(2, 0)$" },
      ],
      hint: "$x = 2$; substitute to find $y$.",
      explanation: "$x = 2$, $y = 4 - 8 = -4$, so the minimum is $(2, -4)$.",
    },
    {
      id: "fdt-pool-20",
      prompt: "Find the local maximum point.",
      latex: "f(x) = -x^2 + 6x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$(3, 9)$" },
        { label: "B", text: "$(3, -9)$" },
        { label: "C", text: "$(-3, 9)$" },
        { label: "D", text: "$(3, 6)$" },
      ],
      hint: "$x = 3$; substitute to find $y$.",
      explanation: "$x = 3$, $y = -9 + 18 = 9$, so the maximum is $(3, 9)$.",
    },
    {
      id: "fdt-pool-21",
      prompt: "Find the local minimum point.",
      latex: "f(x) = x^2 - 6x + 5",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$(3, -4)$" },
        { label: "B", text: "$(3, 4)$" },
        { label: "C", text: "$(-3, -4)$" },
        { label: "D", text: "$(3, 5)$" },
      ],
      hint: "$x = 3$; substitute to find $y$.",
      explanation: "$x = 3$, $y = 9 - 18 + 5 = -4$, so the minimum is $(3, -4)$.",
    },
    {
      id: "fdt-pool-22",
      prompt: "Find the local minimum point.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$(1, -2)$" },
        { label: "B", text: "$(-1, 2)$" },
        { label: "C", text: "$(1, 2)$" },
        { label: "D", text: "$(1, 0)$" },
      ],
      hint: "The local minimum is at $x = 1$; substitute to find $y$.",
      explanation: "$x = 1$, $y = 1 - 3 = -2$, so the minimum is $(1, -2)$.",
    },
    {
      id: "fdt-pool-23",
      prompt: "Find the local maximum point.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$(-1, 2)$" },
        { label: "B", text: "$(1, -2)$" },
        { label: "C", text: "$(-1, -2)$" },
        { label: "D", text: "$(-1, 0)$" },
      ],
      hint: "The local maximum is at $x = -1$; substitute to find $y$.",
      explanation: "$x = -1$, $y = -1 + 3 = 2$, so the maximum is $(-1, 2)$.",
    },
    {
      id: "fdt-pool-24",
      prompt: "Find the local minimum point.",
      latex: "f(x) = x^2 + 4x + 1",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$(-2, -3)$" },
        { label: "B", text: "$(2, -3)$" },
        { label: "C", text: "$(-2, 3)$" },
        { label: "D", text: "$(-2, -1)$" },
      ],
      hint: "$x = -2$; substitute to find $y$.",
      explanation: "$x = -2$, $y = 4 - 8 + 1 = -3$, so the minimum is $(-2, -3)$.",
    },
    // ── Difficulty 5: classify cubic stationary points / values ───────────
    {
      id: "fdt-pool-25",
      prompt: "Classify the stationary point at $x = 0$.",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Test the sign of $f'(x) = 3x^2 - 6x$ around $x = 0$.",
      explanation: "$f'(-1) = 9 > 0$ and $f'(1) = -3 < 0$: $+ \\to -$ → local maximum.",
    },
    {
      id: "fdt-pool-26",
      prompt: "Classify the stationary point at $x = 2$.",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Test the sign of $f'(x) = 3x^2 - 6x$ around $x = 2$.",
      explanation: "$f'(1) = -3 < 0$ and $f'(3) = 9 > 0$: $- \\to +$ → local minimum.",
    },
    {
      id: "fdt-pool-27",
      prompt: "Find the local minimum value (the $y$-value).",
      latex: "f(x) = x^3 - 3x",
      difficulty: 5,
      answer: "-2",
      hint: "The local minimum is at $x = 1$; find $f(1)$.",
      explanation: "$f(1) = 1 - 3 = -2$.",
    },
    {
      id: "fdt-pool-28",
      prompt: "Find the local maximum value (the $y$-value).",
      latex: "f(x) = x^3 - 3x",
      difficulty: 5,
      answer: "2",
      hint: "The local maximum is at $x = -1$; find $f(-1)$.",
      explanation: "$f(-1) = -1 + 3 = 2$.",
    },
    {
      id: "fdt-pool-29",
      prompt: "Find the minimum value of the function.",
      latex: "f(x) = x^2 - 8x + 1",
      difficulty: 5,
      answer: "-15",
      hint: "Stationary point at $x = 4$; substitute to find $y$.",
      explanation: "$x = 4$, $y = 16 - 32 + 1 = -15$.",
    },
    {
      id: "fdt-pool-30",
      prompt: "Find the maximum value of the function.",
      latex: "f(x) = -x^2 + 10x",
      difficulty: 5,
      answer: "25",
      hint: "Stationary point at $x = 5$; substitute to find $y$.",
      explanation: "$x = 5$, $y = -25 + 50 = 25$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const secondDerivativeTestLesson: ExplicitLesson = {
  id: "second-derivative-test",
  slug: "second-derivative-test",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Second Derivative Test",
  description:
    "Use the second derivative to classify stationary points as local maxima or local minima.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Second Derivative Test",
    url: "https://www.youtube.com/embed/QslLK2NJ-Js",
  },

  learningIntention:
    "Learn how to use the second derivative test to classify stationary points and write their coordinates.",

  successCriteria: [
    "Find stationary $x$-values by solving $f'(x)=0$.",
    "Find the second derivative $f''(x)$.",
    "Use $f''(x)>0$ to identify a local minimum at a stationary point.",
    "Use $f''(x)<0$ to identify a local maximum at a stationary point.",
    "Recognise that $f''(x)=0$ makes the second derivative test inconclusive.",
  ],

  teaching: {
    paragraphs: [
      "From the last two lessons, solving $f'(x)=0$ finds the flat instants on a curve, the stationary points. But a flat spot can be the bottom of a valley or the top of a hill, and finding it does not tell you which. This lesson answers that question by looking at the shape of the curve right around the flat point. If the curve is cupped there, bending upward like the inside of a bowl, the flat point sits at the bottom and is a local minimum. If the curve is capped, bending downward like an arch, the flat point sits at the top and is a local maximum. That bending has a name: concavity, concave up for a cup and concave down for a cap.",
      "Look at one specific curve, the parabola $y=x^2-6x+5$, which we already know is flat at $x=3$. The whole parabola curves upward on both sides like a bowl, so the flat point at the very bottom can only be a minimum. You can see it is a minimum from the cup shape alone, before doing any second-derivative algebra. Turn the bowl over, as in $y=-x^2+6x-5$, and the same flat point becomes the peak of an arch, a maximum. Cup holds a minimum, cap holds a maximum: that picture is the whole test.",
      "To measure cup versus cap with calculus, differentiate a second time. The second derivative $f''(x)$ is the derivative of $f'(x)$, so it measures how the slope itself is changing as you move right. Here is the reasoning that drives the test. At a stationary point the slope is zero. If $f''>0$ there, the slope is increasing, so it passes from negative (curve falling) up through zero to positive (curve rising); falling then rising is a trough, a minimum. If $f''<0$ there, the slope is decreasing, so it passes from positive to negative; rising then falling is a crest, a maximum. The sign test is not a rule to memorise, it is just a reading of which way the slope is turning.",
      "So the method is: solve $f'(x)=0$ to find the flat points, then evaluate $f''(x)$ at each one. A positive value means the slope is increasing into the point, the curve is concave up, and the point is a local minimum; a negative value means concave down and a local maximum. This is the same concavity you met when $f''$ was introduced, now aimed at a single flat point instead of a whole interval.",
      "The usual slip is to swap the two signs, pairing positive $f''$ with a maximum because positive sounds like a high point. Resist that by anchoring to the cup: a cup opens upward, it is concave up, $f''>0$, and the lowest part of a cup is a minimum. The other trap is the case $f''(a)=0$. This does not mean the point is flat-and-finished; it means the slope is not bending at that instant, so the cup-or-cap test simply gives no verdict. When that happens, fall back to the first-derivative test and check the sign of $f'$ just either side of the point. In NSW exam questions the second derivative test is the standard quick way to classify a stationary point once $f'(x)=0$ has been solved.",
    ],
    latexBlocks: [
      "f''(x)=\\frac{d}{dx}\\left(f'(x)\\right)=\\text{how fast the slope is changing}",
      "f''(a)>0 \\;\\Rightarrow\\; \\text{slope increasing} \\;\\Rightarrow\\; \\text{concave up (cup)} \\;\\Rightarrow\\; \\text{local minimum at }x=a",
      "f''(a)<0 \\;\\Rightarrow\\; \\text{slope decreasing} \\;\\Rightarrow\\; \\text{concave down (cap)} \\;\\Rightarrow\\; \\text{local maximum at }x=a",
      "f''(a)=0 \\;\\Rightarrow\\; \\text{not bending: test inconclusive, check the sign of }f'\\text{ either side}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: One stationary point",
      questionLatex:
        "f(x)=x^2-6x+5 \\quad \\text{use the second derivative test to classify the stationary point.}",
      cartesianGraph: {
        description:
          "y = x^2 - 6x + 5 is a parabola that opens upward like a cup, with its lowest point at (3, -4) where a horizontal tangent y = -4 touches it. Because the curve is cupped (concave up) on both sides of x = 3, the flat point at the bottom is a local minimum.",
        xMin: 0,
        xMax: 6,
        yMin: -5,
        yMax: 6,
        xStep: 1,
        yStep: 1,
        parabolas: [
          { kind: "quadratic", a: 1, b: -6, c: 5, label: "y = x² - 6x + 5 (a cup)" },
        ],
        lines: [
          { kind: "linear", m: 0, b: -4, xMin: 1, xMax: 5, label: "horizontal tangent: y = -4" },
        ],
        points: [{ x: 3, y: -4, label: "(3, -4) minimum" }],
      },
      steps: [
        {
          explanation:
            "Classifying a flat point needs the flat point first, and that is where the slope is zero, so start from the slope function.",
          latex: "f'(x)=2x-6",
        },
        {
          explanation:
            "Set the slope to zero to locate the stationary point.",
          latex: "2x-6=0 \\quad \\Rightarrow \\quad x=3",
        },
        {
          explanation:
            "To test cup versus cap, differentiate again; this measures how the slope is changing.",
          latex: "f''(x)=2",
        },
        {
          explanation:
            "Here $f''(3)=2>0$, so the slope is increasing through the flat point: it passes from negative to positive, which makes the curve concave up (a cup). A cup holds its lowest point, so this is a minimum.",
          latex: "f''(3)=2>0 \\quad \\Rightarrow \\quad \\text{concave up, minimum}",
        },
        {
          explanation:
            "The slope function gives no height, so read the $y$-value off the original curve to complete the coordinate. The graph confirms a cup with its base here.",
          latex: "f(3)=-4 \\quad \\Rightarrow \\quad \\text{local minimum at }(3,-4)",
        },
      ],
      finalAnswerLatex: "\\text{Local minimum at }(3,-4)",
    },
    {
      title: "Worked example 2: Two stationary points",
      questionLatex:
        "f(x)=x^3-3x^2-9x+2 \\quad \\text{use the second derivative test to classify the stationary points.}",
      steps: [
        {
          explanation:
            "Find the slope function so the flat points can be located.",
          latex: "f'(x)=3x^2-6x-9",
        },
        {
          explanation:
            "Set the slope to zero and factorise to find both stationary $x$-values.",
          latex:
            "3x^2-6x-9=0 \\quad \\Rightarrow \\quad 3(x-3)(x+1)=0 \\quad \\Rightarrow \\quad x=-1,3",
        },
        {
          explanation:
            "Differentiate again to measure how the slope is turning at each flat point.",
          latex: "f''(x)=6x-6",
        },
        {
          explanation:
            "At $x=-1$ the slope is decreasing ($f''<0$): rising then falling, a concave-down cap, so a maximum. At $x=3$ the slope is increasing ($f''>0$): falling then rising, a concave-up cup, so a minimum.",
          latex: "f''(-1)=-12<0 \\;(\\text{cap, max}), \\quad f''(3)=12>0 \\;(\\text{cup, min})",
        },
        {
          explanation:
            "Read each height off the original curve to write the full coordinates.",
          latex:
            "f(-1)=7, \\quad f(3)=-25 \\quad \\Rightarrow \\quad \\text{local maximum at }(-1,7), \\quad \\text{local minimum at }(3,-25)",
        },
      ],
      finalAnswerLatex:
        "\\text{Local maximum at }(-1,7), \\quad \\text{local minimum at }(3,-25)",
    },
    {
      title: "Worked example 3: When the test is inconclusive",
      questionLatex:
        "f(x)=x^4 \\quad \\text{use the second derivative test to classify the stationary point.}",
      steps: [
        {
          explanation:
            "Find the slope function and set it to zero to locate the flat point.",
          latex: "f'(x)=4x^3 \\quad \\Rightarrow \\quad 4x^3=0 \\quad \\Rightarrow \\quad x=0",
        },
        {
          explanation:
            "Differentiate again to test the concavity at the flat point.",
          latex: "f''(x)=12x^2",
        },
        {
          explanation:
            "Here $f''(0)=0$. The slope is not bending at that instant, so the cup-or-cap test gives no verdict: it is inconclusive, not a sign that the point is neither a max nor a min.",
          latex: "f''(0)=12(0)^2=0 \\quad \\Rightarrow \\quad \\text{inconclusive}",
        },
        {
          explanation:
            "Fall back to the first-derivative test and check the slope just either side. The slope is negative on the left and positive on the right, so the curve falls then rises: a trough, a minimum.",
          latex: "f'(-1)=-4<0, \\quad f'(1)=4>0 \\quad \\Rightarrow \\quad \\text{falls then rises}",
        },
      ],
      finalAnswerLatex: "\\text{Local minimum at }(0,0)",
    },
  ],

  guidedPractice: [
    {
      id: "sdt-guided-1",
      prompt: "Find the first derivative:",
      latex: "f(x)=x^2-4x+1",
      answer: "2x-4",
      hint: "Differentiate $f(x)$.",
      explanation: "$f'(x)=2x-4$.",
    },
    {
      id: "sdt-guided-2",
      prompt: "Find the stationary x-value:",
      latex: "f(x)=x^2-4x+1",
      answer: "2",
      hint: "Solve $f'(x)=0$.",
      explanation: "$x=2$.",
    },
    {
      id: "sdt-guided-3",
      prompt: "Use the second derivative to classify:",
      latex: "f'(x)=2x-4, \\quad x=2",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "$f''(2)>0$ means concave up.",
      explanation: "$f''(2)=2>0$, so the stationary point is a local minimum.",
    },
    {
      id: "sdt-guided-4",
      prompt: "Complete the second derivative:",
      latex: "",
      answer: "6x-12",
      hint: "Differentiate the first derivative.",
      explanation:
        "$f''(x)=6x-12$. This can then be evaluated at each stationary x-value.",
    },
  ],

  independentPractice: [
    {
      id: "sdt-ind-1",
      prompt: "Classify the stationary point:",
      latex: "y=x^2-8x+6",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Use $y''$: a positive second derivative gives a local minimum.",
      explanation:
        "$y'=2x-8$, so $x=4$. Since $y''=2>0$ and $y(4)=-10$, there is a local minimum at $(4,-10)$.",
    },
    {
      id: "sdt-ind-2",
      prompt: "Classify the stationary point:",
      latex: "y=-x^2+4x-1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "The second derivative is negative.",
      explanation:
        "$y'=-2x+4$, so $x=2$. Since $y''=-2<0$ and $y(2)=3$, there is a local maximum at $(2,3)$.",
    },
    {
      id: "sdt-ind-3",
      prompt: "Classify the stationary point at $x=3$:",
      latex: "y=x^3-6x^2+9x+1",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Evaluate $y''=6x-12$ at $x=3$; positive means local minimum.",
      explanation:
        "$y'=3x^2-12x+9=3(x-1)(x-3)$, so $x=1,3$. Since $y''=6x-12$, $y''(1)<0$ and $y''(3)>0$. The points are a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "sdt-ind-4",
      prompt: "Use the second derivative test:",
      latex: "f(x)=x^3",
      answer: "C",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Find $f'(x)$ and $f''(x)$, then evaluate at $x=0$.",
      explanation:
        "$f'(x)=3x^2$, so $x=0$. Since $f''(x)=6x$ and $f''(0)=0$, the second derivative test is inconclusive at $(0,0)$.",
    },
    {
      id: "sdt-ind-5",
      prompt:
        "A profit model has a stationary point at $x=4$. Use the second derivative test to classify it.",
      latex: "P(4)=48, \\quad P''(4)=-6",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A negative second derivative gives a local maximum.",
      explanation:
        "Since $P''(4)=-6<0$, the stationary point is a local maximum. With $P(4)=48$, the coordinate is $(4,48)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Using $f''(x)$ before finding stationary points.",
      fix: "First solve $f'(x)=0$, then evaluate $f''(x)$ at those $x$-values.",
    },
    {
      mistake: "Reversing the second derivative classifications.",
      fix: "It is tempting to pair positive $f''$ with a maximum because positive sounds like a high point, but $f''>0$ means concave up, a cup, and a cup holds its lowest point: a minimum. So $f''(x)>0$ gives a local minimum and $f''(x)<0$ gives a local maximum.",
    },
    {
      mistake: "Treating $f''(x)=0$ as a maximum or minimum.",
      fix: "When $f''(x)=0$ the slope is not bending at that instant, so the test gives no verdict; it is inconclusive. Fall back to checking the sign of $f'$ just either side of the point.",
    },
    {
      mistake: "Forgetting coordinates.",
      fix: "After classifying, substitute into the original function to find the $y$-value.",
    },
  ],

  masteryQuiz: [
    {
      id: "sdt-mastery-1",
      prompt: "Differentiate:",
      latex: "f(x)=2x^3-3x^2-12x+4",
      answer: "A",
      choices: [
        { label: "A", text: "$6x^2-6x-12$" },
        { label: "B", text: "$6x^2-6x-12+4$" },
        { label: "C", text: "$2x^2-6x-12$" },
        { label: "D", text: "$6x^3-6x-12$" },
      ],
      hint: "Find $f'(x)$.",
      explanation: "$f'(x)=6x^2-6x-12$.",
    },
    {
      id: "sdt-mastery-2",
      prompt: "Find the larger stationary x-value:",
      latex: "6x^2-6x-12=0",
      answer: "2",
      hint: "Factorise the quadratic.",
      explanation: "$6x^2-6x-12=6(x-2)(x+1)$, so $x=-1$ or $x=2$.",
    },
    {
      id: "sdt-mastery-3",
      prompt: "Find the second derivative:",
      latex: "f'(x)=6x^2-6x-12",
      answer: "A",
      choices: [
        { label: "A", text: "$12x-6$" },
        { label: "B", text: "$12x-6+4$" },
        { label: "C", text: "$6x-6$" },
        { label: "D", text: "$12x^2-6$" },
      ],
      hint: "Differentiate $f'(x)$.",
      explanation: "$f''(x)=12x-6$.",
    },
    {
      id: "sdt-mastery-4",
      prompt: "Evaluate the second derivative at $x=2$:",
      latex: "",
      answer: "18",
      hint: "Substitute each $x$-value into $f''(x)$.",
      explanation: "$f''(-1)=-18<0$ and $f''(2)=18>0$.",
    },
    {
      id: "sdt-mastery-5",
      prompt: "Classify the stationary point at $x=-1$:",
      latex: "f(-1)=11, \\quad f(2)=-16, \\quad f''(-1)<0, \\quad f''(2)>0",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "Negative second derivative gives a local maximum; positive gives a local minimum.",
      explanation:
        "There is a local maximum at $(-1,11)$ and a local minimum at $(2,-16)$.",
    },
    {
      id: "sdt-mastery-6",
      prompt: "Evaluate the second derivative at $x=2$:",
      latex: "f''(x)=6x-6",
      answer: "6",
      hint: "Substitute $x=2$ into $6x-6$.",
      explanation: "$f''(2)=6(2)-6=6$.",
    },
    {
      id: "sdt-mastery-7",
      prompt: "Classify the stationary point:",
      latex: "f''(2)=6",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A positive second derivative means concave up.",
      explanation:
        "Since $f''(2)=6>0$, the graph is concave up at the stationary point, so it is a local minimum.",
    },
    {
      id: "sdt-mastery-8",
      prompt: "Classify the stationary point:",
      latex: "f''(-1)=-12",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A negative second derivative means concave down.",
      explanation:
        "Since $f''(-1)=-12<0$, the graph is concave down at the stationary point, so it is a local maximum.",
    },
    {
      id: "sdt-mastery-9",
      prompt: "Complete the classification from the second derivative test:",
      latex: "f''(0)=0",
      answer: "C",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "The second derivative test does not decide when $f''(x)=0$.",
      explanation:
        "When $f''(0)=0$, the second derivative test is inconclusive. Another method, such as the first derivative test, is needed.",
    },
    {
      id: "sdt-mastery-10",
      prompt:
        "A profit function has a stationary point where $x=4$, $P(4)=120$, and $P''(4)<0$. Complete the classification.",
      latex: "P''(4)<0",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "inconclusive" },
      ],
      hint: "A negative second derivative gives a local maximum.",
      explanation:
        "Since $P''(4)<0$, the stationary point is a local maximum. The maximum profit value is $120$.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: classify from the sign of f''(x) ────────────────────
    {
      id: "sdt-pool-1",
      prompt:
        "At a stationary point, $f''(x) > 0$. The point is a:",
      latex: "f''(x) > 0",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Concave up ($f''>0$) means a minimum.",
      explanation: "$f''(x) > 0$ at a stationary point gives a local minimum.",
    },
    {
      id: "sdt-pool-2",
      prompt:
        "At a stationary point, $f''(x) < 0$. The point is a:",
      latex: "f''(x) < 0",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Concave down ($f''<0$) means a maximum.",
      explanation: "$f''(x) < 0$ at a stationary point gives a local maximum.",
    },
    {
      id: "sdt-pool-3",
      prompt:
        "At a stationary point, $f''(x) = 0$. The second derivative test is:",
      latex: "f''(x) = 0",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "inconclusive" },
        { label: "B", text: "a local maximum" },
        { label: "C", text: "a local minimum" },
        { label: "D", text: "impossible" },
      ],
      hint: "When $f''=0$ the test gives no information.",
      explanation: "$f''(x) = 0$ makes the second derivative test inconclusive.",
    },
    {
      id: "sdt-pool-4",
      prompt:
        "A stationary point has $f''(x) = 6$. Classify it.",
      latex: "f''(x) = 6",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Positive second derivative → minimum.",
      explanation: "$f'' = 6 > 0$, so it is a local minimum.",
    },
    {
      id: "sdt-pool-5",
      prompt:
        "A stationary point has $f''(x) = -4$. Classify it.",
      latex: "f''(x) = -4",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Negative second derivative → maximum.",
      explanation: "$f'' = -4 < 0$, so it is a local maximum.",
    },
    {
      id: "sdt-pool-6",
      prompt:
        "A stationary point has $f''(x) = 2$. Classify it.",
      latex: "f''(x) = 2",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "Positive second derivative → minimum.",
      explanation: "$f'' = 2 > 0$, so it is a local minimum.",
    },
    // ── Difficulty 2: find the second derivative ──────────────────────────
    {
      id: "sdt-pool-7",
      prompt: "Find the second derivative.",
      latex: "f(x) = x^3",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$6x$" },
        { label: "B", text: "$3x^2$" },
        { label: "C", text: "$6x^2$" },
        { label: "D", text: "$3x$" },
      ],
      hint: "Differentiate twice.",
      explanation: "$f'(x) = 3x^2$, so $f''(x) = 6x$.",
    },
    {
      id: "sdt-pool-8",
      prompt: "Find the second derivative.",
      latex: "f(x) = x^4",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$12x^2$" },
        { label: "B", text: "$4x^3$" },
        { label: "C", text: "$12x^3$" },
        { label: "D", text: "$24x$" },
      ],
      hint: "Differentiate twice.",
      explanation: "$f'(x) = 4x^3$, so $f''(x) = 12x^2$.",
    },
    {
      id: "sdt-pool-9",
      prompt: "Find the second derivative.",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$6x - 6$" },
        { label: "B", text: "$3x^2 - 6x$" },
        { label: "C", text: "$6x - 3$" },
        { label: "D", text: "$6x$" },
      ],
      hint: "$f'(x) = 3x^2 - 6x$; differentiate again.",
      explanation: "$f''(x) = 6x - 6$.",
    },
    {
      id: "sdt-pool-10",
      prompt: "Find the second derivative.",
      latex: "f(x) = 2x^3",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$12x$" },
        { label: "B", text: "$6x^2$" },
        { label: "C", text: "$12x^2$" },
        { label: "D", text: "$6x$" },
      ],
      hint: "$f'(x) = 6x^2$; differentiate again.",
      explanation: "$f''(x) = 12x$.",
    },
    {
      id: "sdt-pool-11",
      prompt: "Find the second derivative.",
      latex: "f(x) = x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$2x$" },
        { label: "C", text: "$x$" },
        { label: "D", text: "$0$" },
      ],
      hint: "$f'(x) = 2x$; differentiate again.",
      explanation: "$f''(x) = 2$.",
    },
    {
      id: "sdt-pool-12",
      prompt: "Find the second derivative.",
      latex: "f(x) = x^4 - x^2",
      difficulty: 2,
      answer: "A",
      choices: [
        { label: "A", text: "$12x^2 - 2$" },
        { label: "B", text: "$4x^3 - 2x$" },
        { label: "C", text: "$12x^2 - 2x$" },
        { label: "D", text: "$12x^3 - 2$" },
      ],
      hint: "$f'(x) = 4x^3 - 2x$; differentiate again.",
      explanation: "$f''(x) = 12x^2 - 2$.",
    },
    // ── Difficulty 3: evaluate f''(x) at a point ──────────────────────────
    {
      id: "sdt-pool-13",
      prompt: "Find $f''(2)$.",
      latex: "f(x) = x^3",
      difficulty: 3,
      answer: "12",
      hint: "$f''(x) = 6x$; substitute $x = 2$.",
      explanation: "$f''(x) = 6x$, so $f''(2) = 12$.",
    },
    {
      id: "sdt-pool-14",
      prompt: "Find $f''(0)$.",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 3,
      answer: "-6",
      hint: "$f''(x) = 6x - 6$; substitute $x = 0$.",
      explanation: "$f''(x) = 6x - 6$, so $f''(0) = -6$.",
    },
    {
      id: "sdt-pool-15",
      prompt: "Find $f''(1)$.",
      latex: "f(x) = x^4",
      difficulty: 3,
      answer: "12",
      hint: "$f''(x) = 12x^2$; substitute $x = 1$.",
      explanation: "$f''(x) = 12x^2$, so $f''(1) = 12$.",
    },
    {
      id: "sdt-pool-16",
      prompt: "Find $f''(1)$.",
      latex: "f(x) = 2x^3",
      difficulty: 3,
      answer: "12",
      hint: "$f''(x) = 12x$; substitute $x = 1$.",
      explanation: "$f''(x) = 12x$, so $f''(1) = 12$.",
    },
    {
      id: "sdt-pool-17",
      prompt: "Find $f''(2)$.",
      latex: "f(x) = x^3 - 6x^2",
      difficulty: 3,
      answer: "0",
      hint: "$f''(x) = 6x - 12$; substitute $x = 2$.",
      explanation: "$f''(x) = 6x - 12$, so $f''(2) = 0$.",
    },
    {
      id: "sdt-pool-18",
      prompt: "Find $f''(1)$.",
      latex: "f(x) = x^3 + x^2",
      difficulty: 3,
      answer: "8",
      hint: "$f''(x) = 6x + 2$; substitute $x = 1$.",
      explanation: "$f''(x) = 6x + 2$, so $f''(1) = 8$.",
    },
    // ── Difficulty 4: find a stationary point, then classify with f'' ─────
    {
      id: "sdt-pool-19",
      prompt:
        "Find and classify the stationary point of the function.",
      latex: "f(x) = x^2 - 4x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "minimum at $x = 2$" },
        { label: "B", text: "maximum at $x = 2$" },
        { label: "C", text: "minimum at $x = -2$" },
        { label: "D", text: "inflection at $x = 2$" },
      ],
      hint: "$f'(x) = 2x - 4 = 0$ gives $x = 2$; $f''(x) = 2 > 0$.",
      explanation: "$x = 2$ and $f'' = 2 > 0$, so it is a minimum at $x = 2$.",
    },
    {
      id: "sdt-pool-20",
      prompt:
        "Find and classify the stationary point of the function.",
      latex: "f(x) = -x^2 + 6x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "maximum at $x = 3$" },
        { label: "B", text: "minimum at $x = 3$" },
        { label: "C", text: "maximum at $x = -3$" },
        { label: "D", text: "inflection at $x = 3$" },
      ],
      hint: "$f'(x) = -2x + 6 = 0$ gives $x = 3$; $f''(x) = -2 < 0$.",
      explanation: "$x = 3$ and $f'' = -2 < 0$, so it is a maximum at $x = 3$.",
    },
    {
      id: "sdt-pool-21",
      prompt: "Classify the stationary point at $x = 1$ using $f''$.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "$f''(x) = 6x$; evaluate at $x = 1$.",
      explanation: "$f''(1) = 6 > 0$, so it is a local minimum.",
    },
    {
      id: "sdt-pool-22",
      prompt: "Classify the stationary point at $x = -1$ using $f''$.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "$f''(x) = 6x$; evaluate at $x = -1$.",
      explanation: "$f''(-1) = -6 < 0$, so it is a local maximum.",
    },
    {
      id: "sdt-pool-23",
      prompt: "Classify the stationary point at $x = 2$ using $f''$.",
      latex: "f(x) = x^3 - 12x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "$f''(x) = 6x$; evaluate at $x = 2$.",
      explanation: "$f''(2) = 12 > 0$, so it is a local minimum.",
    },
    {
      id: "sdt-pool-24",
      prompt: "Classify the stationary point at $x = -2$ using $f''$.",
      latex: "f(x) = x^3 - 12x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "$f''(x) = 6x$; evaluate at $x = -2$.",
      explanation: "$f''(-2) = -12 < 0$, so it is a local maximum.",
    },
    // ── Difficulty 5: multi-step / inconclusive cases ─────────────────────
    {
      id: "sdt-pool-25",
      prompt: "Classify the stationary point at $x = 2$ using $f''$.",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "local minimum" },
        { label: "B", text: "local maximum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "$f''(x) = 6x - 6$; evaluate at $x = 2$.",
      explanation: "$f''(2) = 6 > 0$, so it is a local minimum.",
    },
    {
      id: "sdt-pool-26",
      prompt: "Classify the stationary point at $x = 0$ using $f''$.",
      latex: "f(x) = x^3 - 3x^2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "point of inflection" },
        { label: "D", text: "not stationary" },
      ],
      hint: "$f''(x) = 6x - 6$; evaluate at $x = 0$.",
      explanation: "$f''(0) = -6 < 0$, so it is a local maximum.",
    },
    {
      id: "sdt-pool-27",
      prompt: "Classify the stationary point of the function.",
      latex: "f(x) = x^2 - 8x + 1",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "minimum" },
        { label: "B", text: "maximum" },
        { label: "C", text: "inflection" },
        { label: "D", text: "neither" },
      ],
      hint: "$f''(x) = 2 > 0$ everywhere.",
      explanation: "$f''(x) = 2 > 0$, so the stationary point is a minimum.",
    },
    {
      id: "sdt-pool-28",
      prompt:
        "At the stationary point $x = 0$, $f''(0) = 0$. What does the second derivative test conclude?",
      latex: "f(x) = x^3",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "inconclusive" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "local maximum" },
        { label: "D", text: "no stationary point" },
      ],
      hint: "$f''(0) = 0$, so the test gives no information (it is a point of inflection).",
      explanation: "$f''(0) = 0$, so the test is inconclusive.",
    },
    {
      id: "sdt-pool-29",
      prompt:
        "At the stationary point $x = 0$, evaluate $f''(0)$ for the function below.",
      latex: "f(x) = x^4",
      difficulty: 5,
      answer: "0",
      hint: "$f''(x) = 12x^2$; substitute $x = 0$ (the test will be inconclusive).",
      explanation: "$f''(x) = 12x^2$, so $f''(0) = 0$.",
    },
    {
      id: "sdt-pool-30",
      prompt:
        "Find the $x$-value where $f''(x) = 0$ (the point of inflection).",
      latex: "f(x) = x^3 - 6x^2 + 5",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2"],
      hint: "$f''(x) = 6x - 12$; solve $f''(x) = 0$.",
      explanation: "$6x - 12 = 0 \\Rightarrow x = 2$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const curveSketchingLesson: ExplicitLesson = {
  id: "curve-sketching",
  slug: "curve-sketching",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Curve Sketching with Derivatives",
  description:
    "Combine intercepts, stationary points, derivative signs, and concavity to sketch polynomial curves.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Curve Sketching with Derivatives",
    url: "https://www.youtube.com/embed/mt2BfYpaDgA",
  },

  learningIntention:
    "Learn how to combine intercepts, stationary points, derivative signs, and concavity to sketch key features of polynomial graphs.",

  successCriteria: [
    "Find intercepts where appropriate.",
    "Find $f'(x)$ and solve $f'(x)=0$ to locate stationary points.",
    "Find stationary point coordinates.",
    "Use first derivative signs or the second derivative to describe the graph shape.",
    "List key features clearly before sketching the curve.",
  ],

  teaching: {
    paragraphs: [
      "The big idea of this lesson is that the derivatives are shape-readers. Recall that $f'(x)$ is the slope of the curve at each point: where $f'(x)$ is positive the curve heads uphill, where it is negative the curve heads downhill, and where $f'(x)=0$ the curve flattens for an instant and turns. The second derivative $f''(x)$ then says how the curve bends, cupped upward or capped downward. Read together with the few points where the curve crosses the axes, the derivatives tell you the whole shape, so you can sketch a curve without plotting dozens of points.",
      "See it on a real curve, $f(x)=x^2-4x+3$. Its slope function is $f'(x)=2x-4$. Try one instance: at $x=1$, $f'(1)=-2$, negative, so the curve is heading downhill there; at $x=3$, $f'(3)=2$, positive, so it is climbing. Somewhere between, at $x=2$, the slope passes through zero and the curve flattens and turns: that is the bottom of the valley. Solving $f(x)=0$ gives the two places it cuts the $x$-axis, $(1,0)$ and $(3,0)$. Pin those few points and the shape draws itself.",
      "Each derivative test feeds the sketch for a reason worth recalling. We solve $f'(x)=0$ to find turning points because a turning point is exactly where the slope is momentarily zero. To decide whether such a point is a peak or a trough, look at $f''$: if $f''>0$ the slope is increasing, so it runs from negative (falling) up through zero to positive (rising), and falling-then-rising is a valley, a minimum. If $f''<0$ the slope is decreasing, rising-then-falling, a crest, a maximum. This is the cup-holds-a-minimum, cap-holds-a-maximum picture from the second derivative lesson, not a rule to memorise.",
      "The most common slip is to confuse $f(x)=0$ with $f'(x)=0$. Students mix them because both are 'solve something equals zero', but the two zeros do different jobs. $f(x)=0$ asks where the height is zero, so it locates where the curve crosses the $x$-axis. $f'(x)=0$ asks where the slope is zero, so it locates where the curve turns. A curve can cross the axis while still climbing steeply, and it can turn far above or below the axis, so these are genuinely different points: use $f(x)=0$ for intercepts and $f'(x)=0$ for turning points.",
      "So the routine is: find the intercepts, use $f'(x)$ for the turning points and for where the curve rises or falls, then use $f''(x)$ to classify each turn as a peak or trough, and finally describe the shape in words, rising, turning, falling, and bending, before drawing it. In NSW exam questions, 'sketch showing all key features' expects exactly this assembled picture rather than a plotted table of values.",
    ],
    latexBlocks: [
      "f(x)=0 \\;\\Rightarrow\\; x\\text{-intercepts (curve crosses the axis)} \\qquad f(0) \\;\\Rightarrow\\; y\\text{-intercept}",
      "f'(x)=0 \\;\\Rightarrow\\; \\text{turning points}; \\quad f'>0 \\text{ rising}, \\quad f'<0 \\text{ falling}",
      "f''>0 \\;\\Rightarrow\\; \\text{concave up (cup): minimum} \\qquad f''<0 \\;\\Rightarrow\\; \\text{concave down (cap): maximum}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Sketch a quadratic",
      questionLatex:
        "f(x)=x^2-4x+3 \\quad \\text{sketch the curve showing all key features.}",
      cartesianGraph: {
        description:
          "y = x^2 - 4x + 3 is an upward-opening parabola. It crosses the x-axis at (1, 0) and (3, 0), crosses the y-axis at (0, 3), and turns at its lowest point, the minimum (2, -1). The curve falls to the left of x = 2 and rises to the right.",
        xMin: 0,
        xMax: 4,
        yMin: -2,
        yMax: 4,
        xStep: 1,
        yStep: 1,
        parabolas: [
          { kind: "quadratic", a: 1, b: -4, c: 3, label: "y = x² - 4x + 3" },
        ],
        points: [
          { x: 1, y: 0, label: "(1, 0)" },
          { x: 3, y: 0, label: "(3, 0)" },
          { x: 0, y: 3, label: "(0, 3)" },
          { x: 2, y: -1, label: "(2, -1) minimum" },
        ],
      },
      steps: [
        {
          explanation:
            "Intercepts pin where the curve meets the axes, so start there. The x-intercepts are where the height is zero, $f(x)=0$, and the y-intercept is the height at $x=0$.",
          latex:
            "(x-1)(x-3)=0 \\Rightarrow x=1,3; \\qquad f(0)=3",
        },
        {
          explanation:
            "The curve turns where its slope is zero, so build the slope function and set it to zero. The height of that turning point comes from the original $f$, not from $f'$.",
          latex: "f'(x)=2x-4=0 \\Rightarrow x=2, \\qquad f(2)=-1",
        },
        {
          explanation:
            "Classify the turn by how the curve bends. Here $f''(2)=2>0$, so the slope is increasing through the flat point (it runs from negative up to positive): the curve is concave up, a cup, so $(2,-1)$ is a minimum.",
          latex: "f''(x)=2>0 \\Rightarrow \\text{concave up, minimum}",
        },
        {
          explanation:
            "Now describe the shape before drawing: an upward parabola that falls for $x<2$, flattens and turns at the minimum $(2,-1)$, then rises for $x>2$, passing through the intercepts $(1,0)$, $(3,0)$ and $(0,3)$.",
          latex:
            "(1,0),(3,0),\\;(0,3),\\;\\text{min }(2,-1),\\;\\text{opens up}",
        },
      ],
      finalAnswerLatex:
        "x\\text{-intercepts }(1,0),(3,0); \\quad y\\text{-intercept }(0,3); \\quad \\text{minimum }(2,-1); \\quad \\text{opens upward}",
    },
    {
      title: "Worked example 2: Sketch a cubic",
      questionLatex:
        "f(x)=x^3-3x^2 \\quad \\text{sketch the curve showing all key features.}",
      cartesianGraph: {
        description:
          "y = x^3 - 3x^2 rises to a local maximum at (0, 0), falls to a local minimum at (2, -4), then rises again, crossing the x-axis at (3, 0). It touches the x-axis at the origin (a repeated root) and cuts it at x = 3.",
        xMin: -1,
        xMax: 3.5,
        yMin: -6,
        yMax: 5,
        xStep: 1,
        yStep: 1,
        curves: [
          { kind: "cubic", a: 1, b: -3, c: 0, d: 0, xMin: -1, xMax: 3.4, color: "blue", label: "y = x³ - 3x²" },
        ],
        points: [
          { x: 0, y: 0, label: "(0, 0) maximum" },
          { x: 2, y: -4, label: "(2, -4) minimum" },
          { x: 3, y: 0, label: "(3, 0)" },
        ],
      },
      steps: [
        {
          explanation:
            "Find the intercepts first. Factorising gives $x^2(x-3)$, so $f(x)=0$ at $x=0$ and $x=3$; the y-intercept is $f(0)=0$.",
          latex: "x^3-3x^2=x^2(x-3) \\Rightarrow x=0,3",
        },
        {
          explanation:
            "The curve turns where the slope is zero, so set $f'(x)=0$. The heights of these turning points come from the original $f$.",
          latex:
            "f'(x)=3x(x-2)=0 \\Rightarrow x=0,2; \\quad f(0)=0,\\; f(2)=-4",
        },
        {
          explanation:
            "Classify each turn with $f''(x)=6x-6$. At $x=0$, $f''(0)=-6<0$: the slope is decreasing, the curve is concave down (a cap), so $(0,0)$ is a maximum. At $x=2$, $f''(2)=6>0$: the slope is increasing, concave up (a cup), so $(2,-4)$ is a minimum.",
          latex:
            "f''(0)=-6<0 \\Rightarrow \\text{max}, \\qquad f''(2)=6>0 \\Rightarrow \\text{min}",
        },
        {
          explanation:
            "Describe the shape: the curve rises to the local maximum $(0,0)$, falls to the local minimum $(2,-4)$, then rises again, cutting the $x$-axis at $(3,0)$.",
          latex:
            "\\text{max }(0,0),\\; \\text{min }(2,-4),\\; x\\text{-intercepts }(0,0),(3,0)",
        },
      ],
      finalAnswerLatex:
        "\\text{local maximum }(0,0); \\quad \\text{local minimum }(2,-4); \\quad x\\text{-intercepts }(0,0),(3,0)",
    },
  ],

  guidedPractice: [
    {
      id: "curve-guided-1",
      prompt: "Find the y-intercept value:",
      latex: "f(x)=x^2-5x+6",
      answer: "6",
      hint: "Solve $f(x)=0$ and find $f(0)$.",
      explanation: "$f(x)=(x-2)(x-3)$, so the $x$-intercepts are $2$ and $3$, and $f(0)=6$.",
    },
    {
      id: "curve-guided-2",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-5x+6",
      answer: "(5/2,-1/4)",
      acceptedAnswers: ["5/2,-1/4", "5/2, -1/4", "(5/2, -1/4)", "(2.5,-0.25)", "(2.5, -0.25)", "2.5,-0.25", "2.5, -0.25"],
      hint: "Solve $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=2x-5$, so $x=\\frac{5}{2}$. Then $f\\left(\\frac{5}{2}\\right)=-\\frac{1}{4}$.",
    },
    {
      id: "curve-guided-3",
      prompt: "Classify the stationary point:",
      latex: "f(x)=x^2-5x+6",
      answer: "B",
      acceptedAnswers: ["min"],
      choices: [
        { label: "A", text: "maximum" },
        { label: "B", text: "minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the second derivative or the opening direction to decide maximum or minimum.",
      explanation:
        "Key features are $x$-intercepts $(2,0)$ and $(3,0)$, $y$-intercept $(0,6)$, and minimum $\\left(\\frac{5}{2},-\\frac{1}{4}\\right)$.",
    },
    {
      id: "curve-guided-4",
      prompt: "Choose the correct classification.",
      latex: "f'(x)=2x-5",
      answer: "A",
      choices: [
        { label: "A", text: "minimum" },
        { label: "B", text: "maximum" },
        { label: "C", text: "neither" },
      ],
      hint: "Positive second derivative means concave up.",
      explanation:
        "Since $f''\\left(\\frac{5}{2}\\right)>0$, the stationary point is a minimum. Option A is correct.",
    },
  ],

  independentPractice: [
    {
      id: "curve-ind-1",
      prompt: "Find the stationary point:",
      latex: "y=x^2-2x-3",
      answer: "(1,-4)",
      acceptedAnswers: ["1,-4", "1, -4", "(1, -4)"],
      hint: "Find intercepts, then solve $y'=0$.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(3,0)$, the $y$-intercept is $(0,-3)$, and $y'=2x-2$ gives a minimum at $(1,-4)$.",
    },
    {
      id: "curve-ind-2",
      prompt: "Classify the stationary point at $x=-1$:",
      latex: "y=x^3-3x",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the derivative sign change around $x=-1$ to classify the point.",
      explanation:
        "$x$-intercepts are $(-\\sqrt{3},0)$, $(0,0)$, and $(\\sqrt{3},0)$. Since $y'=3x^2-3$, the stationary points are a local maximum at $(-1,2)$ and a local minimum at $(1,-2)$.",
    },
    {
      id: "curve-ind-3",
      prompt: "Find the maximum value:",
      latex: "y=-x^2+4x+5",
      answer: "9",
      hint: "The graph opens downward.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(5,0)$, the $y$-intercept is $(0,5)$, and $y'=-2x+4$ gives a maximum at $(2,9)$.",
    },
    {
      id: "curve-ind-4",
      prompt: "Find the local maximum point:",
      latex: "f(x)=x^3-6x^2+9x",
      answer: "(1,4)",
      acceptedAnswers: ["1,4", "1, 4", "(1, 4)"],
      hint: "Factorise for intercepts and use $f'(x)$ for stationary points.",
      explanation:
        "$f(x)=x(x-3)^2$, so the $x$-intercepts are $(0,0)$ and $(3,0)$. Since $f'(x)=3(x-1)(x-3)$, there is a local maximum at $(1,4)$ and a local minimum at $(3,0)$.",
    },
    {
      id: "curve-ind-5",
      prompt:
        "A curve sketching question asks for key features only. Find the maximum value.",
      latex: "f(x)=-x^2+6x-5",
      answer: "4",
      hint: "A downward-opening quadratic has a maximum at its stationary point.",
      explanation:
        "$f(x)=-(x-1)(x-5)$, so the x-intercepts are $(1,0)$ and $(5,0)$, and the y-intercept is $(0,-5)$. Since $f'(x)=-2x+6$, the stationary point is a maximum at $(3,4)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Sketching before finding key features.",
      fix: "Find intercepts and stationary points first, then sketch the general shape.",
    },
    {
      mistake: "Using $f'(x)=0$ to find intercepts.",
      fix: "These two zeros do different jobs: $f(x)=0$ finds where the height is zero, so the curve crosses the $x$-axis, while $f'(x)=0$ finds where the slope is zero, so the curve turns. Use $f(x)=0$ for $x$-intercepts and $f'(x)=0$ for stationary points.",
    },
    {
      mistake: "Forgetting the y-intercept.",
      fix: "Find the $y$-intercept by substituting $x=0$ into the original function.",
    },
    {
      mistake: "Drawing a graph that does not match the derivative information.",
      fix: "The derivatives describe the actual shape, so the sketch must obey them: the curve rises where $f'>0$, falls where $f'<0$, flattens at each stationary point, and bends as a cup where $f''>0$ and a cap where $f''<0$.",
    },
  ],

  masteryQuiz: [
    {
      id: "curve-mastery-1",
      prompt: "Find the y-intercept value:",
      latex: "f(x)=x^2-4x+3",
      answer: "3",
      hint: "Solve $f(x)=0$ and find $f(0)$.",
      explanation: "The intercepts are $(1,0)$, $(3,0)$, and $(0,3)$.",
    },
    {
      id: "curve-mastery-2",
      prompt: "Find the stationary point:",
      latex: "f(x)=x^2-4x+3",
      answer: "(2,-1)",
      acceptedAnswers: ["2,-1", "2, -1", "(2, -1)"],
      hint: "Solve $f'(x)=0$.",
      explanation: "$f'(x)=2x-4$, so $x=2$ and $f(2)=-1$.",
    },
    {
      id: "curve-mastery-3",
      prompt: "Classify the stationary point:",
      latex: "f''(x)=2, \\quad \\text{stationary point }(2,-1)",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "$f''(x)>0$ means concave up.",
      explanation: "Since $f''(2)>0$, the point $(2,-1)$ is a local minimum.",
    },
    {
      id: "curve-mastery-4",
      prompt: "For $x<2$, is the graph increasing or decreasing?",
      latex: "f'(x)=2x-4",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Check the sign of $f'(x)$ on the interval $x<2$.",
      explanation:
        "The graph is decreasing on $(-\\infty,2)$ and increasing on $(2,\\infty)$.",
    },
    {
      id: "curve-mastery-5",
      prompt: "Find the minimum value:",
      latex: "f(x)=x^2-4x+3",
      answer: "-1",
      hint: "Combine intercepts, stationary point, and shape.",
      explanation:
        "Use $x$-intercepts $(1,0)$ and $(3,0)$, $y$-intercept $(0,3)$, minimum $(2,-1)$, and the upward-opening shape.",
    },
    {
      id: "curve-mastery-6",
      prompt: "Find the maximum value:",
      latex: "y=-x^2+4x+5",
      answer: "9",
      hint: "Find intercepts and use $y'=0$ for the stationary point.",
      explanation:
        "$x$-intercepts are $(-1,0)$ and $(5,0)$, the $y$-intercept is $(0,5)$, and $y'=-2x+4$ gives a maximum at $(2,9)$.",
    },
    {
      id: "curve-mastery-7",
      prompt: "Classify the stationary point at $x=-1$:",
      latex: "y=x^3-3x",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use the derivative sign change around $x=-1$ to classify the point.",
      explanation:
        "$y'=3x^2-3=3(x-1)(x+1)$, so $x=-1,1$. The derivative changes $+,-,+$, giving a local maximum at $(-1,2)$ and a local minimum at $(1,-2)$.",
    },
    {
      id: "curve-mastery-8",
      prompt: "For $1<x<3$, is the graph increasing or decreasing?",
      latex: "f'(x)=3(x-1)(x-3)",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Check the sign of $f'(x)$ on the interval $1<x<3$.",
      explanation:
        "The sign pattern is $+,-,+$, so the function is increasing on $(-\\infty,1)$ and $(3,\\infty)$, and decreasing on $(1,3)$.",
    },
    {
      id: "curve-mastery-9",
      prompt:
        "Choose the best sketch description. A: downward parabola with a maximum. B: upward parabola with two x-intercepts and a minimum below the x-axis. C: cubic with two stationary points.",
      latex: "f(x)=x^2-2x-3",
      answer: "B",
      choices: [
        { label: "A", text: "downward parabola with a maximum" },
        { label: "B", text: "upward parabola with two x-intercepts and a minimum below the x-axis" },
        { label: "C", text: "cubic with two stationary points" },
      ],
      hint: "Check the leading coefficient and the stationary point.",
      explanation:
        "The leading coefficient is positive, so the parabola opens upward. It has x-intercepts at $x=-1$ and $x=3$, and a minimum at $(1,-4)$, so option B is correct.",
    },
    {
      id: "curve-mastery-10",
      prompt: "Find the local maximum point:",
      latex: "f(x)=x^3-6x^2+9x",
      answer: "(1,4)",
      acceptedAnswers: ["1,4", "1, 4", "(1, 4)"],
      hint: "Factorise for intercepts and use $f'(x)=0$ for stationary points.",
      explanation:
        "$f(x)=x(x-3)^2$, so the x-intercepts are $(0,0)$ and $(3,0)$. Since $f'(x)=3(x-1)(x-3)$, the stationary points are a local maximum at $(1,4)$ and a local minimum at $(3,0)$.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: intercepts ──────────────────────────────────────────
    {
      id: "sketch-pool-1",
      prompt: "Find the $y$-intercept.",
      latex: "y = x^2 - 4x + 3",
      difficulty: 1,
      answer: "3",
      hint: "Substitute $x = 0$.",
      explanation: "At $x = 0$, $y = 3$.",
    },
    {
      id: "sketch-pool-2",
      prompt: "Find the $y$-intercept.",
      latex: "y = x^3 - 2x + 5",
      difficulty: 1,
      answer: "5",
      hint: "Substitute $x = 0$.",
      explanation: "At $x = 0$, $y = 5$.",
    },
    {
      id: "sketch-pool-3",
      prompt: "Find the $x$-intercepts.",
      latex: "y = x^2 - 9",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 3$ and $x = -3$" },
        { label: "B", text: "$x = 9$" },
        { label: "C", text: "$x = 3$ only" },
        { label: "D", text: "none" },
      ],
      hint: "Solve $x^2 - 9 = 0$.",
      explanation: "$x^2 = 9 \\Rightarrow x = \\pm 3$.",
    },
    {
      id: "sketch-pool-4",
      prompt: "Find the $y$-intercept.",
      latex: "y = 2x^2 + 3x - 1",
      difficulty: 1,
      answer: "-1",
      hint: "Substitute $x = 0$.",
      explanation: "At $x = 0$, $y = -1$.",
    },
    {
      id: "sketch-pool-5",
      prompt: "Find the $y$-intercept.",
      latex: "y = (x - 2)(x + 3)",
      difficulty: 1,
      answer: "-6",
      hint: "Substitute $x = 0$: $(-2)(3)$.",
      explanation: "At $x = 0$, $y = (-2)(3) = -6$.",
    },
    {
      id: "sketch-pool-6",
      prompt: "Find the $x$-intercepts.",
      latex: "y = x^2 - 5x",
      difficulty: 1,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 5$" },
        { label: "B", text: "$x = 5$ only" },
        { label: "C", text: "$x = -5$ and $x = 0$" },
        { label: "D", text: "none" },
      ],
      hint: "Factor: $x(x - 5) = 0$.",
      explanation: "$x(x - 5) = 0 \\Rightarrow x = 0$ or $x = 5$.",
    },
    // ── Difficulty 2: stationary x-value ──────────────────────────────────
    {
      id: "sketch-pool-7",
      prompt: "Find the $x$-coordinate of the stationary point.",
      latex: "y = x^2 - 6x",
      difficulty: 2,
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "Solve $2x - 6 = 0$.",
      explanation: "$2x - 6 = 0 \\Rightarrow x = 3$.",
    },
    {
      id: "sketch-pool-8",
      prompt: "Find the $x$-coordinate of the stationary point.",
      latex: "y = x^2 + 4x",
      difficulty: 2,
      answer: "-2",
      acceptedAnswers: ["x=-2"],
      hint: "Solve $2x + 4 = 0$.",
      explanation: "$2x + 4 = 0 \\Rightarrow x = -2$.",
    },
    {
      id: "sketch-pool-9",
      prompt: "Find the $x$-coordinate of the stationary point.",
      latex: "y = x^2 - 2x",
      difficulty: 2,
      answer: "1",
      acceptedAnswers: ["x=1"],
      hint: "Solve $2x - 2 = 0$.",
      explanation: "$2x - 2 = 0 \\Rightarrow x = 1$.",
    },
    {
      id: "sketch-pool-10",
      prompt: "Find the $x$-coordinate of the stationary point.",
      latex: "y = 2x^2 - 4x",
      difficulty: 2,
      answer: "1",
      acceptedAnswers: ["x=1"],
      hint: "Solve $4x - 4 = 0$.",
      explanation: "$4x - 4 = 0 \\Rightarrow x = 1$.",
    },
    {
      id: "sketch-pool-11",
      prompt: "Find the $x$-coordinate of the stationary point.",
      latex: "y = x^2 + 8x",
      difficulty: 2,
      answer: "-4",
      acceptedAnswers: ["x=-4"],
      hint: "Solve $2x + 8 = 0$.",
      explanation: "$2x + 8 = 0 \\Rightarrow x = -4$.",
    },
    {
      id: "sketch-pool-12",
      prompt: "Find the $x$-coordinate of the stationary point.",
      latex: "y = x^2 - 10x",
      difficulty: 2,
      answer: "5",
      acceptedAnswers: ["x=5"],
      hint: "Solve $2x - 10 = 0$.",
      explanation: "$2x - 10 = 0 \\Rightarrow x = 5$.",
    },
    // ── Difficulty 3: stationary point coordinate ─────────────────────────
    {
      id: "sketch-pool-13",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 - 4x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(2, -4)$" },
        { label: "B", text: "$(2, 4)$" },
        { label: "C", text: "$(-2, -4)$" },
        { label: "D", text: "$(2, 0)$" },
      ],
      hint: "$x = 2$; substitute to find $y$.",
      explanation: "$x = 2$, $y = 4 - 8 = -4$, so $(2, -4)$.",
    },
    {
      id: "sketch-pool-14",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 - 2x - 3",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(1, -4)$" },
        { label: "B", text: "$(-1, -4)$" },
        { label: "C", text: "$(1, 4)$" },
        { label: "D", text: "$(1, -3)$" },
      ],
      hint: "$x = 1$; substitute to find $y$.",
      explanation: "$x = 1$, $y = 1 - 2 - 3 = -4$, so $(1, -4)$.",
    },
    {
      id: "sketch-pool-15",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 + 6x + 5",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(-3, -4)$" },
        { label: "B", text: "$(3, -4)$" },
        { label: "C", text: "$(-3, 4)$" },
        { label: "D", text: "$(-3, 5)$" },
      ],
      hint: "$x = -3$; substitute to find $y$.",
      explanation: "$x = -3$, $y = 9 - 18 + 5 = -4$, so $(-3, -4)$.",
    },
    {
      id: "sketch-pool-16",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = -x^2 + 4x",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(2, 4)$" },
        { label: "B", text: "$(2, -4)$" },
        { label: "C", text: "$(-2, 4)$" },
        { label: "D", text: "$(2, 0)$" },
      ],
      hint: "$x = 2$; substitute to find $y$.",
      explanation: "$x = 2$, $y = -4 + 8 = 4$, so $(2, 4)$.",
    },
    {
      id: "sketch-pool-17",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 - 8x + 10",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(4, -6)$" },
        { label: "B", text: "$(4, 6)$" },
        { label: "C", text: "$(-4, -6)$" },
        { label: "D", text: "$(4, 10)$" },
      ],
      hint: "$x = 4$; substitute to find $y$.",
      explanation: "$x = 4$, $y = 16 - 32 + 10 = -6$, so $(4, -6)$.",
    },
    {
      id: "sketch-pool-18",
      prompt: "Find the stationary point as a coordinate.",
      latex: "y = x^2 + 2x + 5",
      difficulty: 3,
      answer: "A",
      choices: [
        { label: "A", text: "$(-1, 4)$" },
        { label: "B", text: "$(1, 4)$" },
        { label: "C", text: "$(-1, -4)$" },
        { label: "D", text: "$(-1, 5)$" },
      ],
      hint: "$x = -1$; substitute to find $y$.",
      explanation: "$x = -1$, $y = 1 - 2 + 5 = 4$, so $(-1, 4)$.",
    },
    // ── Difficulty 4: shape and key features ──────────────────────────────
    {
      id: "sketch-pool-19",
      prompt: "Which way does the parabola open?",
      latex: "y = x^2 - 4x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "upward" },
        { label: "B", text: "downward" },
        { label: "C", text: "neither" },
        { label: "D", text: "sideways" },
      ],
      hint: "The coefficient of $x^2$ is positive.",
      explanation: "A positive leading coefficient means the parabola opens upward.",
    },
    {
      id: "sketch-pool-20",
      prompt: "Which way does the parabola open?",
      latex: "y = -x^2 + 3x",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "downward" },
        { label: "B", text: "upward" },
        { label: "C", text: "neither" },
        { label: "D", text: "sideways" },
      ],
      hint: "The coefficient of $x^2$ is negative.",
      explanation: "A negative leading coefficient means the parabola opens downward.",
    },
    {
      id: "sketch-pool-21",
      prompt: "As $x \\to \\infty$, what value does $y$ approach?",
      latex: "y = x^3",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$+\\infty$" },
        { label: "B", text: "$-\\infty$" },
        { label: "C", text: "$0$" },
        { label: "D", text: "$1$" },
      ],
      hint: "A positive cubic rises without bound to the right.",
      explanation: "As $x \\to \\infty$, $x^3 \\to +\\infty$.",
    },
    {
      id: "sketch-pool-22",
      prompt: "How many times does the graph cross the $x$-axis?",
      latex: "y = x^2 + 1",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "0 (never)" },
        { label: "B", text: "1" },
        { label: "C", text: "2" },
        { label: "D", text: "infinitely many" },
      ],
      hint: "Does $x^2 + 1 = 0$ have real solutions?",
      explanation: "$x^2 + 1 = 0$ has no real roots, so it never crosses the $x$-axis.",
    },
    {
      id: "sketch-pool-23",
      prompt: "How many $x$-intercepts does the graph have?",
      latex: "y = x^2 - 6x + 9",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "1 (a repeated root)" },
        { label: "B", text: "0" },
        { label: "C", text: "2" },
        { label: "D", text: "3" },
      ],
      hint: "$x^2 - 6x + 9 = (x - 3)^2$.",
      explanation: "$(x - 3)^2 = 0$ has the single repeated root $x = 3$.",
    },
    {
      id: "sketch-pool-24",
      prompt: "Where does the graph cross the $x$-axis?",
      latex: "y = x^2 - 4",
      difficulty: 4,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 2$ and $x = -2$" },
        { label: "B", text: "$x = 4$ only" },
        { label: "C", text: "$x = 0$" },
        { label: "D", text: "it does not cross" },
      ],
      hint: "Solve $x^2 - 4 = 0$.",
      explanation: "$x^2 = 4 \\Rightarrow x = \\pm 2$.",
    },
    // ── Difficulty 5: multi-step features ─────────────────────────────────
    {
      id: "sketch-pool-25",
      prompt: "Find the $x$-intercepts.",
      latex: "y = x^2 - 6x + 8",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 2$ and $x = 4$" },
        { label: "B", text: "$x = -2$ and $x = -4$" },
        { label: "C", text: "$x = 6$" },
        { label: "D", text: "$x = 8$" },
      ],
      hint: "Factor: $(x - 2)(x - 4)$.",
      explanation: "$(x - 2)(x - 4) = 0 \\Rightarrow x = 2$ or $x = 4$.",
    },
    {
      id: "sketch-pool-26",
      prompt: "How many stationary points does the curve have?",
      latex: "y = x^3 - 3x",
      difficulty: 5,
      answer: "2",
      hint: "Solve $3x^2 - 3 = 0$ and count.",
      explanation: "$x = \\pm 1$ — two stationary points.",
    },
    {
      id: "sketch-pool-27",
      prompt: "Find the minimum value of the function.",
      latex: "y = x^2 - 4x + 3",
      difficulty: 5,
      answer: "-1",
      hint: "Stationary point at $x = 2$; substitute.",
      explanation: "$x = 2$, $y = 4 - 8 + 3 = -1$.",
    },
    {
      id: "sketch-pool-28",
      prompt: "Find the $x$-intercepts.",
      latex: "y = x^2 + 2x - 8",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 2$ and $x = -4$" },
        { label: "B", text: "$x = -2$ and $x = 4$" },
        { label: "C", text: "$x = 8$" },
        { label: "D", text: "none" },
      ],
      hint: "Factor: $(x + 4)(x - 2)$.",
      explanation: "$(x + 4)(x - 2) = 0 \\Rightarrow x = -4$ or $x = 2$.",
    },
    {
      id: "sketch-pool-29",
      prompt: "Find the maximum value of the function.",
      latex: "y = -x^2 + 2x + 3",
      difficulty: 5,
      answer: "4",
      hint: "Stationary point at $x = 1$; substitute.",
      explanation: "$x = 1$, $y = -1 + 2 + 3 = 4$.",
    },
    {
      id: "sketch-pool-30",
      prompt: "Find the stationary $x$-values.",
      latex: "y = x^3 - 3x^2",
      difficulty: 5,
      answer: "A",
      choices: [
        { label: "A", text: "$x = 0$ and $x = 2$" },
        { label: "B", text: "$x = 2$ only" },
        { label: "C", text: "$x = 0$ and $x = 3$" },
        { label: "D", text: "$x = 3$" },
      ],
      hint: "Factor $3x^2 - 6x = 3x(x - 2)$.",
      explanation: "$3x(x - 2) = 0 \\Rightarrow x = 0$ or $x = 2$.",
    },
  ],

  masteryPassMark: 0.8,
};

export const optimisationLesson: ExplicitLesson = {
  id: "optimisation",
  slug: "optimisation",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Optimisation Problems",
  description:
    "Form objective functions and use derivatives to solve maximum and minimum problems.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Optimisation Problems",
    url: "https://www.youtube.com/embed/HsUY94Fjxao",
  },

  learningIntention:
    "Learn how to model and solve optimisation problems using derivatives, then interpret the answer in context.",

  successCriteria: [
    "Define variables clearly for an optimisation problem.",
    "Write the quantity to maximise or minimise as a function of one variable.",
    "Use constraints to simplify the objective function.",
    "Differentiate and solve $f'(x)=0$.",
    "Check whether the value gives a maximum or minimum and answer in context with units where relevant.",
  ],

  teaching: {
    paragraphs: [
      "Suppose you have $40$ cm of string and want to bend it into the rectangle with the largest possible area. A long thin rectangle encloses almost nothing; a short fat one is not much better; somewhere in between the area is as big as it can get. Optimisation is this everyday hunt for the best value: the largest area, the cheapest cost, the shortest distance. The key picture is that as you slide the shape from one extreme to the other, the quantity you care about climbs to a peak and then falls away, and the best value sits right at that peak.",
      "That peak is the same flat instant from the stationary-points lesson. Imagine graphing the area against the length: the graph rises to a high point and then comes back down, and right at the top it momentarily levels off. A curve that has levelled off has a horizontal tangent, and a horizontal tangent has gradient zero, so at the best value $f'(x)=0$. This is why every optimisation reduces to solving $f'(x)=0$: we are not following a ritual, we are locating the exact spot where the quantity stops rising and is about to fall, the flat top of the hill (or, for a smallest value, the flat bottom of the valley).",
      "Before we can differentiate we need one function of one variable, but real problems usually hand us two. For the string the area is $A=xy$, which has two unknowns, yet the fixed perimeter is a constraint that ties them together: $2x+2y=40$, so $y=20-x$. Substituting removes $y$ and leaves the area as a function of the single variable $x$, namely $A=x(20-x)=20x-x^2$. This substitution is the heart of modelling: use what is fixed to express the thing you want in terms of the one thing you can vary.",
      "Solving $A'(x)=20-2x=0$ gives $x=10$, but a solution of $f'(x)=0$ only tells you the curve is flat there, and flat can mean a peak, a trough, or neither. Not every stationary point is a maximum, so you must classify it. The quickest check is the second derivative: $A''(x)=-2$, which is negative, so the slope is decreasing through zero, passing from positive to negative. A slope that turns from rising to falling makes a crest, so this flat point is genuinely a maximum. Skipping this check is the classic error, and a minimum problem solved as though it were a maximum gives a confidently wrong answer.",
      "Two things finish the job. First respect the domain: here $x$ is a length, so $x>0$, and since $y=20-x$ must also be positive, the sensible range is $0<x<20$; a stationary point outside that range is not a valid answer. Second, return to the original context, because the question asked for dimensions, so report $10$ cm by $10$ cm rather than just $x=10$. In NSW exam questions optimisation is where modelling, differentiation and classification meet, and marks are lost far more often for skipping the classification or forgetting units than for the calculus itself.",
    ],
    latexBlocks: [
      "A=xy \\quad \\text{with constraint} \\quad 2x+2y=40 \\;\\Rightarrow\\; y=20-x",
      "A(x)=x(20-x)=20x-x^2",
      "A'(x)=20-2x=0 \\quad \\Rightarrow \\quad x=10",
      "A''(x)=-2<0 \\quad \\Rightarrow \\quad \\text{concave down, so } x=10 \\text{ gives a maximum}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Largest rectangle from a fixed perimeter",
      questionLatex:
        "\\text{A rectangle has perimeter }40\\text{ cm. Find the dimensions that maximise its area.}",
      steps: [
        {
          explanation:
            "The area depends on two sides, but the fixed perimeter links them. Write the constraint so one side can be expressed through the other.",
          latex: "2x+2y=40 \\quad \\Rightarrow \\quad y=20-x",
        },
        {
          explanation:
            "Substitute so the area becomes a function of the single variable $x$, since we can only differentiate with respect to one variable at a time.",
          latex: "A=xy=x(20-x)=20x-x^2",
        },
        {
          explanation:
            "The greatest area is the flat top of this curve, where the gradient is zero, so differentiate and solve $A'(x)=0$.",
          latex: "A'(x)=20-2x=0 \\quad \\Rightarrow \\quad x=10",
        },
        {
          explanation:
            "A zero gradient alone does not prove a maximum, so classify the point. $A''(x)=-2<0$ means the curve is concave down, a crest, confirming a maximum.",
          latex: "A''(x)=-2<0",
        },
        {
          explanation:
            "Return to the context: find the other side. Both sides are positive, so $x=10$ lies inside the valid domain $0<x<20$.",
          latex: "y=20-10=10",
        },
      ],
      finalAnswerLatex:
        "\\text{The area is greatest when the rectangle is }10\\text{ cm by }10\\text{ cm (a square), giving }100\\text{ cm}^2.",
      cartesianGraph: {
        description:
          "The area function A = x(20 - x) = 20x - x^2 is a downward-opening parabola crossing the x-axis at x = 0 and x = 20. It rises to a flat maximum turning point at (10, 100), where a horizontal tangent y = 100 touches it and the gradient A'(x) is zero, marking the largest possible area.",
        xMin: -1,
        xMax: 21,
        yMin: -10,
        yMax: 120,
        xStep: 2,
        yStep: 20,
        parabolas: [{ kind: "quadratic", a: -1, b: 20, c: 0, label: "A = 20x - x²" }],
        lines: [
          { kind: "linear", m: 0, b: 100, xMin: 4, xMax: 16, label: "horizontal tangent, gradient 0" },
        ],
        points: [{ x: 10, y: 100, label: "max (10, 100)" }],
      },
    },
    {
      title: "Worked example 2: Least fencing for a fixed area",
      questionLatex:
        "\\text{A rectangular garden must have an area of }100\\text{ m}^2. \\text{ Find the dimensions that use the least fencing.}",
      steps: [
        {
          explanation:
            "Let $x$ be the length in metres, so $x>0$. The fixed area fixes the width, giving the constraint that ties the two sides together.",
          latex: "xy=100 \\quad \\Rightarrow \\quad y=\\frac{100}{x}",
        },
        {
          explanation:
            "The fencing is the perimeter. Substitute the width so it becomes a function of the single variable $x$.",
          latex: "P=2x+2y=2x+\\frac{200}{x}",
        },
        {
          explanation:
            "The least fencing is the flat bottom of this curve, where the gradient is zero, so differentiate and solve $P'(x)=0$. Since $x$ is a length, we keep the positive root only.",
          latex: "P'(x)=2-\\frac{200}{x^2}=0 \\quad \\Rightarrow \\quad x^2=100 \\quad \\Rightarrow \\quad x=10",
        },
        {
          explanation:
            "Classify the stationary point. $P''(x)=\\dfrac{400}{x^3}$ is positive for $x>0$, so the curve is concave up, a trough, confirming a minimum.",
          latex: "P''(10)=\\frac{400}{1000}>0",
        },
        {
          explanation:
            "Interpret in context: find the width and state the dimensions with units.",
          latex: "y=\\frac{100}{10}=10",
        },
      ],
      finalAnswerLatex:
        "\\text{The fencing is least when the garden is }10\\text{ m by }10\\text{ m, using }40\\text{ m of fencing.}",
    },
  ],

  guidedPractice: [
    {
      id: "optimisation-guided-1",
      prompt: "Complete the missing constant:",
      latex: "2x+2y=40",
      answer: "20",
      hint: "Divide by $2$, then rearrange.",
      explanation: "$2x+2y=40$ gives $x+y=20$, so $y=20-x$.",
    },
    {
      id: "optimisation-guided-2",
      prompt: "Complete the area function coefficient:",
      latex: "",
      answer: "20",
      hint: "Substitute $y=20-x$ into $A=xy$.",
      explanation: "$A=x(20-x)=20x-x^2$.",
    },
    {
      id: "optimisation-guided-3",
      prompt: "Find the x-value that maximises the function:",
      latex: "A(x)=20x-x^2",
      answer: "10",
      hint: "Differentiate and solve $A'(x)=0$.",
      explanation: "$A'(x)=20-2x$, so $x=10$.",
    },
    {
      id: "optimisation-guided-4",
      prompt: "Find the other dimension:",
      latex: "x=10, \\quad y=20-x",
      answer: "10",
      hint: "Find the other dimension and include units.",
      explanation:
        "$y=20-10=10$, so the rectangle with maximum area is $10$ cm by $10$ cm.",
    },
  ],

  independentPractice: [
    {
      id: "optimisation-ind-1",
      prompt: "A rectangle has perimeter 60 cm. Find the side length that maximises area.",
      latex: "2x+2y=60, \\quad A=xy",
      answer: "15",
      hint: "Use $y=30-x$ and maximise $A=x(30-x)$.",
      explanation:
        "$A=x(30-x)=30x-x^2$, so $A'(x)=30-2x=0$ gives $x=15$ and $y=15$. The dimensions are $15$ cm by $15$ cm.",
    },
    {
      id: "optimisation-ind-2",
      prompt: "Find the value of x that maximises revenue:",
      latex: "R(x)=-x^2+50x",
      answer: "25",
      hint: "Solve $R'(x)=0$.",
      explanation:
        "$R'(x)=-2x+50$, so $x=25$. Since $R''(x)=-2<0$, this is a maximum and $R(25)=625$.",
    },
    {
      id: "optimisation-ind-3",
      prompt: "Find the minimum value of the function:",
      latex: "C(x)=x^2-12x+50",
      answer: "14",
      hint: "Find the stationary point and use $C''(x)>0$.",
      explanation:
        "$C'(x)=2x-12$, so $x=6$. Since $C''(x)=2>0$, this is a minimum and $C(6)=14$.",
    },
    {
      id: "optimisation-ind-4",
      prompt: "A profit model is given. Find the x-value that maximises profit.",
      latex: "P(x)=-3x^2+90x-200",
      answer: "15",
      hint: "Differentiate, solve $P'(x)=0$, then substitute into $P(x)$.",
      explanation:
        "$P'(x)=-6x+90$, so $x=15$. Since $P''(x)=-6<0$, profit is maximised. $P(15)=475$, so the maximum profit is $475$ when $x=15$.",
    },
    {
      id: "optimisation-ind-5",
      prompt:
        "A rectangular pen is built against a wall using $36$ m of fencing for three sides. Find the shorter side length.",
      latex: "2x+y=36, \\quad A=xy",
      answer: "9",
      hint: "Use $y=36-2x$ and maximise $A=x(36-2x)$.",
      explanation:
        "$A=36x-2x^2$, so $A'(x)=36-4x=0$ gives $x=9$. Then $y=18$, so the maximum area occurs with dimensions $9$ m by $18$ m.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Differentiating before forming a function of one variable.",
      fix: "You can only differentiate with respect to one variable, so use the constraint first to write the objective as $Q(x)$.",
    },
    {
      mistake: "Forgetting to answer in context.",
      fix: "State what the number means and include units where relevant.",
    },
    {
      mistake: "Assuming every stationary value is a maximum.",
      fix: "A zero gradient only means the curve is flat, which could be a peak, a trough, or neither, so classify it with the second derivative, the sign of $f'$ either side, or the context.",
    },
    {
      mistake: "Dropping restrictions from the problem.",
      fix: "Consider the domain, such as lengths being positive.",
    },
  ],

  masteryQuiz: [
    {
      id: "optimisation-mastery-1",
      prompt: "Complete the missing constant in $y=\\Box-x$:",
      latex: "2x+2y=48",
      answer: "24",
      hint: "Divide by $2$ first.",
      explanation: "$x+y=24$, so $y=24-x$.",
    },
    {
      id: "optimisation-mastery-2",
      prompt: "Find the coefficient of $x$ after writing the area as a function of $x$.",
      latex: "2x+2y=48, \\quad A=xy",
      answer: "24",
      hint: "Substitute into $A=xy$.",
      explanation: "$A=x(24-x)=24x-x^2$.",
    },
    {
      id: "optimisation-mastery-3",
      prompt: "Differentiate and solve $A'(x)=0$:",
      latex: "A(x)=24x-x^2",
      answer: "12",
      hint: "$A'(x)=24-2x$.",
      explanation: "$A'(x)=24-2x$, so $x=12$.",
    },
    {
      id: "optimisation-mastery-4",
      prompt: "Justify whether this is a maximum or minimum:",
      latex: "A''(x)=-2",
      answer: "A",
      acceptedAnswers: ["max"],
      choices: [
        { label: "A", text: "maximum" },
        { label: "B", text: "minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "A negative second derivative means the stationary value is a maximum.",
      explanation: "Since $A''(x)=-2<0$, the stationary value is a maximum.",
    },
    {
      id: "optimisation-mastery-5",
      prompt: "Find the other dimension when $x=12$.",
      latex: "y=24-x",
      answer: "12",
      hint: "Find $y$ and include units.",
      explanation: "$y=12$, so the rectangle with maximum area is $12$ cm by $12$ cm.",
    },
    {
      id: "optimisation-mastery-6",
      prompt: "Find the value of $x$ that maximises revenue:",
      latex: "R(x)=-2x^2+80x",
      answer: "20",
      hint: "Solve $R'(x)=0$.",
      explanation:
        "$R'(x)=-4x+80$. Solving $-4x+80=0$ gives $x=20$, and $R''(x)=-4<0$ confirms a maximum.",
    },
    {
      id: "optimisation-mastery-7",
      prompt: "Find the maximum revenue:",
      latex: "R(x)=-2x^2+80x",
      answer: "800",
      hint: "Substitute $x=20$ into $R(x)$.",
      explanation:
        "$R(20)=-2(20)^2+80(20)=800$, so the maximum revenue is $800$.",
    },
    {
      id: "optimisation-mastery-8",
      prompt: "Find the minimum value of the cost function:",
      latex: "C(x)=x^2-8x+30",
      answer: "14",
      hint: "Solve $C'(x)=0$, then substitute.",
      explanation:
        "$C'(x)=2x-8$, so $x=4$. Since $C''(x)=2>0$, this is a minimum, and $C(4)=14$.",
    },
    {
      id: "optimisation-mastery-9",
      prompt:
        "A rectangular pen is built against a wall with $50$ m of fencing for three sides. Find the shorter side length.",
      latex: "2x+y=50, \\quad A=xy",
      answer: "12.5",
      acceptedAnswers: ["25/2"],
      hint: "Use $y=50-2x$ and maximise $A=x(50-2x)$.",
      explanation:
        "$A=50x-2x^2$, so $A'(x)=50-4x=0$ gives $x=12.5$. Then $y=25$, so the maximum area occurs for dimensions $12.5$ m by $25$ m.",
    },
    {
      id: "optimisation-mastery-10",
      prompt:
        "Choose the best first step in a worded optimisation problem. A: Differentiate immediately. B: Define variables and form a function. C: Guess the maximum.",
      latex: "\\text{Optimisation process}",
      answer: "B",
      choices: [
        { label: "A", text: "Differentiate immediately" },
        { label: "B", text: "Define variables and form a function" },
        { label: "C", text: "Guess the maximum" },
      ],
      hint: "Most worded problems need a model before differentiation.",
      explanation:
        "Before differentiating, define variables, use constraints, and form the quantity to optimise as a function. Option B is correct.",
    },
  ],

  // Difficulty-tagged bank (1 = easiest … 5 = hardest). All answers verified.
  masteryQuizPool: [
    // ── Difficulty 1: x at the optimum of a quadratic objective ───────────
    {
      id: "opt-pool-1",
      prompt: "Find the value of $x$ that minimises the quantity.",
      latex: "P = x^2 - 6x",
      difficulty: 1,
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "Solve $P'(x) = 2x - 6 = 0$.",
      explanation: "$2x - 6 = 0 \\Rightarrow x = 3$.",
    },
    {
      id: "opt-pool-2",
      prompt: "Find the value of $x$ that maximises the quantity.",
      latex: "A = 10x - x^2",
      difficulty: 1,
      answer: "5",
      acceptedAnswers: ["x=5"],
      hint: "Solve $A'(x) = 10 - 2x = 0$.",
      explanation: "$10 - 2x = 0 \\Rightarrow x = 5$.",
    },
    {
      id: "opt-pool-3",
      prompt: "Find the value of $x$ that minimises the quantity.",
      latex: "P = x^2 - 8x + 20",
      difficulty: 1,
      answer: "4",
      acceptedAnswers: ["x=4"],
      hint: "Solve $2x - 8 = 0$.",
      explanation: "$2x - 8 = 0 \\Rightarrow x = 4$.",
    },
    {
      id: "opt-pool-4",
      prompt: "Find the value of $x$ that maximises the area.",
      latex: "A = x(12 - x)",
      difficulty: 1,
      answer: "6",
      acceptedAnswers: ["x=6"],
      hint: "Expand to $12x - x^2$, then solve $A' = 0$.",
      explanation: "$A = 12x - x^2$, $A' = 12 - 2x = 0 \\Rightarrow x = 6$.",
    },
    {
      id: "opt-pool-5",
      prompt: "Find the value of $x$ that minimises the cost.",
      latex: "C = x^2 - 10x + 30",
      difficulty: 1,
      answer: "5",
      acceptedAnswers: ["x=5"],
      hint: "Solve $2x - 10 = 0$.",
      explanation: "$2x - 10 = 0 \\Rightarrow x = 5$.",
    },
    {
      id: "opt-pool-6",
      prompt: "Find the value of $x$ that maximises the quantity.",
      latex: "P = -x^2 + 8x",
      difficulty: 1,
      answer: "4",
      acceptedAnswers: ["x=4"],
      hint: "Solve $-2x + 8 = 0$.",
      explanation: "$-2x + 8 = 0 \\Rightarrow x = 4$.",
    },
    // ── Difficulty 2: the optimal value of the objective ──────────────────
    {
      id: "opt-pool-7",
      prompt: "Find the maximum value of the area.",
      latex: "A = x(10 - x)",
      difficulty: 2,
      answer: "25",
      hint: "Maximum at $x = 5$; substitute back.",
      explanation: "$x = 5$, $A = 5 \\times 5 = 25$.",
    },
    {
      id: "opt-pool-8",
      prompt: "Find the maximum value of the area.",
      latex: "A = x(12 - x)",
      difficulty: 2,
      answer: "36",
      hint: "Maximum at $x = 6$; substitute back.",
      explanation: "$x = 6$, $A = 6 \\times 6 = 36$.",
    },
    {
      id: "opt-pool-9",
      prompt: "Find the minimum value of the quantity.",
      latex: "P = x^2 - 6x",
      difficulty: 2,
      answer: "-9",
      hint: "Minimum at $x = 3$; substitute back.",
      explanation: "$x = 3$, $P = 9 - 18 = -9$.",
    },
    {
      id: "opt-pool-10",
      prompt: "Find the maximum value of the area.",
      latex: "A = x(20 - x)",
      difficulty: 2,
      answer: "100",
      hint: "Maximum at $x = 10$; substitute back.",
      explanation: "$x = 10$, $A = 10 \\times 10 = 100$.",
    },
    {
      id: "opt-pool-11",
      prompt: "Find the maximum value of the quantity.",
      latex: "P = -x^2 + 8x",
      difficulty: 2,
      answer: "16",
      hint: "Maximum at $x = 4$; substitute back.",
      explanation: "$x = 4$, $P = -16 + 32 = 16$.",
    },
    {
      id: "opt-pool-12",
      prompt: "Find the minimum value of the quantity.",
      latex: "C = x^2 - 12x + 40",
      difficulty: 2,
      answer: "4",
      hint: "Minimum at $x = 6$; substitute back.",
      explanation: "$x = 6$, $C = 36 - 72 + 40 = 4$.",
    },
    // ── Difficulty 3: worded optimisation ─────────────────────────────────
    {
      id: "opt-pool-13",
      prompt: "Two positive numbers add to 10. Find their maximum product.",
      latex: "x + y = 10",
      difficulty: 3,
      answer: "25",
      hint: "Product $= x(10 - x)$; it is largest when $x = 5$.",
      explanation: "$5 \\times 5 = 25$.",
    },
    {
      id: "opt-pool-14",
      prompt: "Two positive numbers add to 12. Find their maximum product.",
      latex: "x + y = 12",
      difficulty: 3,
      answer: "36",
      hint: "Product $= x(12 - x)$; largest when $x = 6$.",
      explanation: "$6 \\times 6 = 36$.",
    },
    {
      id: "opt-pool-15",
      prompt:
        "A rectangle has a perimeter of 40 m. Find its maximum area, in m².",
      latex: "2l + 2w = 40",
      difficulty: 3,
      answer: "100",
      acceptedAnswers: ["100 m²"],
      hint: "A square gives the maximum area: $10 \\times 10$.",
      explanation: "Sides $10 \\times 10$ give area $100$ m².",
    },
    {
      id: "opt-pool-16",
      prompt:
        "A farmer has 100 m of fencing for a rectangular paddock. Find the maximum area, in m².",
      latex: "2l + 2w = 100",
      difficulty: 3,
      answer: "625",
      acceptedAnswers: ["625 m²"],
      hint: "Maximum area is a square: side $= 25$.",
      explanation: "$25 \\times 25 = 625$ m².",
    },
    {
      id: "opt-pool-17",
      prompt:
        "Two numbers add to 20. Find the minimum value of the sum of their squares.",
      latex: "x + y = 20",
      difficulty: 3,
      answer: "200",
      hint: "Minimise $x^2 + (20 - x)^2$; least when $x = 10$.",
      explanation: "$10^2 + 10^2 = 200$.",
    },
    {
      id: "opt-pool-18",
      prompt: "Find the value of $x$ that maximises $x - x^2$.",
      latex: "f(x) = x - x^2",
      difficulty: 3,
      answer: "1/2",
      acceptedAnswers: ["0.5", "x=1/2", "x=0.5"],
      hint: "Solve $1 - 2x = 0$.",
      explanation: "$1 - 2x = 0 \\Rightarrow x = \\tfrac{1}{2}$.",
    },
    // ── Difficulty 4: constraint substitution ─────────────────────────────
    {
      id: "opt-pool-19",
      prompt:
        "A rectangular yard backs onto a wall; 60 m of fencing covers the other three sides (two widths and one length). Find the maximum area, in m².",
      latex: "L + 2W = 60",
      difficulty: 4,
      answer: "450",
      acceptedAnswers: ["450 m²"],
      hint: "Area $= (60 - 2W)W$; maximise to get $W = 15$, $L = 30$.",
      explanation: "$W = 15$, $L = 30$, area $= 450$ m².",
    },
    {
      id: "opt-pool-20",
      prompt:
        "A rectangle backs onto a wall with 40 m of fencing for the other three sides. Find the maximum area, in m².",
      latex: "L + 2W = 40",
      difficulty: 4,
      answer: "200",
      acceptedAnswers: ["200 m²"],
      hint: "Area $= (40 - 2W)W$; maximise to get $W = 10$, $L = 20$.",
      explanation: "$W = 10$, $L = 20$, area $= 200$ m².",
    },
    {
      id: "opt-pool-21",
      prompt: "Two numbers differ by 6. Find the minimum value of their product.",
      latex: "y = x - 6",
      difficulty: 4,
      answer: "-9",
      hint: "Product $= x(x - 6)$; minimise.",
      explanation: "$x(x - 6)$ is least at $x = 3$: $3 \\times (-3) = -9$.",
    },
    {
      id: "opt-pool-22",
      prompt: "Given $x + y = 8$, find the maximum value of $xy$.",
      latex: "x + y = 8",
      difficulty: 4,
      answer: "16",
      hint: "$xy = x(8 - x)$; largest at $x = 4$.",
      explanation: "$4 \\times 4 = 16$.",
    },
    {
      id: "opt-pool-23",
      prompt:
        "A rectangular garden has a perimeter of 24 m. Find its maximum area, in m².",
      latex: "2l + 2w = 24",
      difficulty: 4,
      answer: "36",
      acceptedAnswers: ["36 m²"],
      hint: "A square ($6 \\times 6$) gives the maximum area.",
      explanation: "$6 \\times 6 = 36$ m².",
    },
    {
      id: "opt-pool-24",
      prompt: "Find the minimum value of the quantity.",
      latex: "C = x^2 - 12x + 40",
      difficulty: 4,
      answer: "4",
      hint: "Minimum at $x = 6$; substitute back.",
      explanation: "$x = 6$, $C = 36 - 72 + 40 = 4$.",
    },
    // ── Difficulty 5: harder context (cubic / rational / projectile) ──────
    {
      id: "opt-pool-25",
      prompt:
        "An open box is made by cutting squares of side $x$ from the corners of a 12 cm by 12 cm sheet and folding up. Find the value of $x$ (cm) that maximises the volume.",
      latex: "V = x(12 - 2x)^2",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["x=2", "2 cm"],
      hint: "Differentiate $V = x(12 - 2x)^2$; the valid root is the smaller one.",
      explanation:
        "$V'(x) = (12 - 2x)(12 - 6x) = 0$ gives $x = 2$ (since $x = 6$ collapses the box).",
    },
    {
      id: "opt-pool-26",
      prompt:
        "An open box is made by cutting squares of side $x$ from a 6 cm by 6 cm sheet. Find the value of $x$ (cm) that maximises the volume.",
      latex: "V = x(6 - 2x)^2",
      difficulty: 5,
      answer: "1",
      acceptedAnswers: ["x=1", "1 cm"],
      hint: "Differentiate $V = x(6 - 2x)^2$; take the valid (smaller) root.",
      explanation:
        "$V'(x) = (6 - 2x)(6 - 6x) = 0$ gives $x = 1$ (since $x = 3$ collapses the box).",
    },
    {
      id: "opt-pool-27",
      prompt:
        "The height of a ball is $h = 20t - 5t^2$ metres. Find the time (s) at which it reaches maximum height.",
      latex: "h = 20t - 5t^2",
      difficulty: 5,
      answer: "2",
      acceptedAnswers: ["2 s", "t=2"],
      hint: "Maximum height where $h'(t) = 20 - 10t = 0$.",
      explanation: "$20 - 10t = 0 \\Rightarrow t = 2$ s.",
    },
    {
      id: "opt-pool-28",
      prompt:
        "The height of a ball is $h = 20t - 5t^2$ metres. Find its maximum height, in metres.",
      latex: "h = 20t - 5t^2",
      difficulty: 5,
      answer: "20",
      acceptedAnswers: ["20 m"],
      hint: "Maximum at $t = 2$; substitute back.",
      explanation: "$t = 2$, $h = 40 - 20 = 20$ m.",
    },
    {
      id: "opt-pool-29",
      prompt:
        "Revenue is $R = p(100 - 2p)$, where $p$ is the price. Find the price that maximises revenue.",
      latex: "R = p(100 - 2p)",
      difficulty: 5,
      answer: "25",
      acceptedAnswers: ["p=25", "$25"],
      hint: "$R = 100p - 2p^2$; solve $R'(p) = 0$.",
      explanation: "$100 - 4p = 0 \\Rightarrow p = 25$.",
    },
    {
      id: "opt-pool-30",
      prompt:
        "The cost per item is $C = x + \\dfrac{400}{x}$ for $x > 0$. Find the value of $x$ that minimises it.",
      latex: "C = x + \\dfrac{400}{x}",
      difficulty: 5,
      answer: "20",
      acceptedAnswers: ["x=20"],
      hint: "$C'(x) = 1 - \\dfrac{400}{x^2} = 0$; take the positive root.",
      explanation: "$x^2 = 400 \\Rightarrow x = 20$ (positive).",
    },
    // ── Difficulty 5 (genuine): varied archetypes — endpoint, average cost,
    //    cubic model, geometric constraint (not "choose var → diff → solve") ──
    {
      id: "opt-pool-31",
      prompt:
        "Find the maximum value of the function on the closed interval $0 \\le x \\le 3$.",
      latex: "f(x) = x^3 - 3x",
      difficulty: 5,
      answer: "18",
      hint: "Compare the stationary value with the values at the interval endpoints $x=0$ and $x=3$.",
      explanation:
        "$f'(x)=3x^2-3=0$ gives $x=1$ (the $x=-1$ root is outside the interval). Candidates: $f(0)=0$, $f(1)=-2$, $f(3)=27-9=18$. The maximum on the interval is at the endpoint $x=3$, value $18$.",
    },
    {
      id: "opt-pool-32",
      prompt:
        "The total cost of making $x$ items is $C(x)=x^2+100x+1600$ dollars. The average cost per item is $\\frac{C(x)}{x}$. Find the value of $x$ that minimises the average cost.",
      latex: "A(x) = \\frac{C(x)}{x}",
      difficulty: 5,
      answer: "40",
      acceptedAnswers: ["x=40", "40 items"],
      hint: "First write the average cost $A(x)=x+100+\\dfrac{1600}{x}$, then minimise it.",
      explanation:
        "$A(x)=\\dfrac{x^2+100x+1600}{x}=x+100+\\dfrac{1600}{x}$. $A'(x)=1-\\dfrac{1600}{x^2}=0$ gives $x^2=1600$, so $x=40$ (positive).",
    },
    {
      id: "opt-pool-33",
      prompt:
        "The daily profit (in thousands of dollars) from making $x$ thousand items is $P(x)=-x^3+27x-10$, for $x \\ge 0$. Find the value of $x$ that maximises profit.",
      latex: "P(x) = -x^3 + 27x - 10",
      difficulty: 5,
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "Solve $P'(x)=0$ and keep the root with $x \\ge 0$; check it is a maximum.",
      explanation:
        "$P'(x)=-3x^2+27=0$ gives $x^2=9$, so $x=3$ (rejecting $x=-3$ as $x \\ge 0$). $P''(x)=-6x$, and $P''(3)=-18<0$, so $x=3$ is a maximum.",
    },
    {
      id: "opt-pool-34",
      prompt:
        "A rectangle in the first quadrant has one corner at the origin and the opposite corner on the line $y = 6 - 2x$. Find the maximum possible area of the rectangle.",
      latex: "y = 6 - 2x",
      difficulty: 5,
      answer: "4.5",
      acceptedAnswers: ["9/2", "4.5 units^2", "4.5 square units"],
      hint: "If the corner is at $(x, y)$ then the area is $A=xy=x(6-2x)$. Maximise it.",
      explanation:
        "$A=x(6-2x)=6x-2x^2$. $A'(x)=6-4x=0$ gives $x=\\tfrac{3}{2}$, so $y=6-3=3$ and the maximum area is $\\tfrac{3}{2}\\times 3=4.5$ square units.",
    },
  ],

  masteryPassMark: 0.8,
};

export const ratesOfChangeApplicationsLesson: ExplicitLesson = {
  id: "rates-of-change-applications",
  slug: "rates-of-change-applications",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Rates of Change Applications",
  description:
    "Interpret derivatives as instantaneous rates of change in applied contexts.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Rates of Change Applications",
    url: "https://www.youtube.com/embed/CwTqRSv2GiU",
  },

  learningIntention:
    "Learn how to differentiate contextual functions and interpret instantaneous rates of change with units.",

  successCriteria: [
    "Explain that the derivative represents an instantaneous rate of change.",
    "Differentiate a quantity written as a function of time or another variable.",
    "Substitute the given value into the derivative.",
    "Interpret positive, negative, and zero rates of change.",
    "Include appropriate units in contextual answers.",
  ],

  teaching: {
    paragraphs: [
      "Watch a tank fill with water. The level climbs quickly at first, then eases off as the tank nears full. At any single moment you can ask: how fast is the volume rising right now? That 'right now' rate is what a car's speedometer reports about distance. It does not tell you the average speed for the whole trip, it tells you the steepness of the quantity at this instant. A rate of change is the steepness of the quantity-versus-time graph at the moment you are looking at.",
      "Put numbers on it. Say the volume after $t$ minutes is $V(t)=40t-4t^2$ litres. Between $t=1$ and $t=3$ the level climbs from $36$ to $84$ litres, an average of $\\frac{84-36}{3-1}=24$ litres per minute. But that single figure blurs two whole minutes together, and the tank is not filling at a steady $24$ L/min throughout. To pin down the rate at one instant, say $t=1$, we have to look closer.",
      "Shrink the interval around $t=1$. From $t=1$ to $t=1.5$ the average is $30$ L/min; from $t=1$ to $t=1.1$ it is $31.6$ L/min. As the second instant slides toward $t=1$ these averages close in on a single value, $32$ L/min. This is the limiting argument from The Derivative as Rate of Change: the secant gradients over shrinking intervals approach the tangent gradient. The number they approach, $V'(1)=32$, is the instantaneous rate. The derivative captures the rate at the instant, not the average over an interval, and that is precisely why it equals the steepness of the graph at that point.",
      "Generalise. Write any changing quantity as $Q(t)$. Its derivative $Q'(t)$ is the instantaneous rate of change, so to find the rate at a particular moment you differentiate $Q(t)$ and then substitute that value of $t$. The sign reads off the direction: $Q'(t)>0$ means the quantity is increasing, $Q'(t)<0$ means it is decreasing, and $Q'(t)=0$ means it is momentarily not changing, which on the graph is where the curve levels off and turns.",
      "The most common slip is to use $Q(t)$ itself instead of $Q'(t)$. The amount present and how fast it is changing are different questions: a tank can hold a lot of water while its level is barely moving. A negative rate also does not mean a negative quantity, only that the quantity is falling at that instant. Units come straight from the fraction, so litres divided by minutes gives litres per minute. In exams these rates appear as velocity from displacement, growth from a population model, or cost from a revenue model, and full marks need the sign read correctly and the units attached.",
    ],
    latexBlocks: [
      "\\text{instantaneous rate}=Q'(t)=\\lim_{h\\to 0}\\frac{Q(t+h)-Q(t)}{h}",
      "v(t)=h'(t) \\quad \\text{(velocity is the rate of change of height)}",
      "Q'(t)>0 \\Rightarrow \\text{increasing}, \\quad Q'(t)<0 \\Rightarrow \\text{decreasing}, \\quad Q'(t)=0 \\Rightarrow \\text{momentarily not changing}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Velocity from height",
      questionLatex:
        "h(t)=-5t^2+20t+1 \\quad \\text{find and interpret the velocity at }t=2.",
      steps: [
        {
          explanation: "Velocity asks how fast the height is changing, and the rate of change of a quantity is its derivative, so velocity is the derivative of height.",
          latex: "v(t)=h'(t)",
        },
        {
          explanation: "Differentiate the height function term by term to get the rate function.",
          latex: "h'(t)=-10t+20",
        },
        {
          explanation: "Substitute $t=2$ to evaluate the rate at that instant, not over an interval.",
          latex: "h'(2)=-10(2)+20=0",
        },
        {
          explanation: "A velocity of $0$ m/s means the ball is momentarily at rest. It has stopped rising and is about to fall, so $t=2$ is the top of its flight, the apex, where the height-time graph momentarily flattens.",
          latex: "v=0\\text{ m/s (momentarily at rest at the apex)}",
        },
      ],
      finalAnswerLatex: "\\text{At }t=2\\text{ the velocity is }0\\text{ m/s: the ball is momentarily at rest at its highest point.}",
      cartesianGraph: {
        description:
          "The height-time graph h(t) = -5t^2 + 20t + 1 is a downward-opening parabola that rises to its apex at (2, 21). A horizontal tangent y = 21 touches the curve there; its zero slope is the instantaneous velocity h'(2) = 0, so the ball is momentarily at rest at the top of its flight.",
        xMin: -0.5,
        xMax: 4.5,
        yMin: -2,
        yMax: 24,
        xStep: 1,
        yStep: 4,
        parabolas: [{ kind: "quadratic", a: -5, b: 20, c: 1, label: "h(t) = -5t² + 20t + 1" }],
        lines: [
          { kind: "linear", m: 0, b: 21, xMin: 0.5, xMax: 3.5, label: "tangent at t = 2, velocity 0" },
        ],
        points: [{ x: 2, y: 21, label: "apex (2, 21)" }],
      },
    },
    {
      title: "Worked example 2: Interpreting a population rate",
      questionLatex:
        "P(t)=t^3-6t^2+20t+100 \\quad \\text{find and interpret }P'(3).",
      steps: [
        {
          explanation: "The rate at which the population is changing is its derivative, so differentiate the population model.",
          latex: "P'(t)=3t^2-12t+20",
        },
        {
          explanation: "Substitute $t=3$ to evaluate the rate at that instant.",
          latex: "P'(3)=3(3)^2-12(3)+20=11",
        },
        {
          explanation: "The rate is positive, so the population is increasing at $t=3$, and the value $11$ is measured in people per year because population is divided by time.",
          latex: "P'(3)=11>0",
        },
      ],
      finalAnswerLatex:
        "P'(3)=11, \\quad \\text{so at }t=3\\text{ the population is rising at }11\\text{ people per year.}",
    },
  ],

  guidedPractice: [
    {
      id: "rates-guided-1",
      prompt: "Identify the rate function:",
      latex: "s(t)=3t^2+2t",
      answer: "s'(t)",
      acceptedAnswers: ["ds/dt", "6t+2", "6t + 2"],
      hint: "The derivative gives the instantaneous rate of change.",
      explanation: "The rate function is $s'(t)$.",
    },
    {
      id: "rates-guided-2",
      prompt: "Differentiate:",
      latex: "s(t)=3t^2+2t",
      answer: "6t+2",
      hint: "Differentiate term-by-term.",
      explanation: "$s'(t)=6t+2$.",
    },
    {
      id: "rates-guided-3",
      prompt: "Find the rate value at $t=2$:",
      latex: "",
      answer: "14",
      hint: "Substitute $t=2$ and interpret the positive sign.",
      explanation: "$s'(2)=14$, so the quantity is increasing at $14$ units per time unit.",
    },
    {
      id: "rates-guided-4",
      prompt: "Complete the sentence: The height is ____.",
      latex: "h'(3)=-6 \\quad \\text{metres per second}",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "A negative derivative means decreasing.",
      explanation:
        "Since $h'(3)=-6$, the height is decreasing at $6$ metres per second when $t=3$.",
    },
  ],

  independentPractice: [
    {
      id: "rates-ind-1",
      prompt: "The height of an object is given. Find the velocity at $t=1$.",
      latex: "h(t)=-5t^2+15t+2",
      answer: "5 m/s",
      acceptedAnswers: ["5 metres per second", "5 meters per second"],
      hint: "Velocity is $h'(t)$.",
      explanation: "$h'(t)=-10t+15$, so $h'(1)=5$. The velocity is $5$ m/s.",
    },
    {
      id: "rates-ind-2",
      prompt: "Find the population rate value at $t=4$.",
      latex: "P(t)=2t^2+5t+100",
      answer: "21",
      hint: "Differentiate, then substitute $t=4$.",
      explanation: "$P'(t)=4t+5$, so $P'(4)=21$. The population is increasing at $21$ people per year.",
    },
    {
      id: "rates-ind-3",
      prompt: "Find the rate of change value when $x=10$.",
      latex: "R(x)=-x^2+40x",
      answer: "20",
      hint: "Use $R'(x)$.",
      explanation: "$R'(x)=-2x+40$, so $R'(10)=20$. Revenue is increasing at $20$ dollars per item.",
    },
    {
      id: "rates-ind-4",
      prompt: "Find the rate value at $t=3$.",
      latex: "Q(t)=-2t^2+8t+5",
      answer: "-4",
      hint: "A negative rate means the quantity is decreasing.",
      explanation: "$Q'(t)=-4t+8$, so $Q'(3)=-4$. The quantity is decreasing at $4$ units per second.",
    },
    {
      id: "rates-ind-5",
      prompt:
        "A tank volume is modelled by $V(t)$. At $t=4$, is the volume increasing or decreasing?",
      latex: "V(t)=-t^2+6t+20",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Differentiate, substitute $t=4$, then interpret the negative sign.",
      explanation:
        "$V'(t)=-2t+6$, so $V'(4)=-2$. The tank volume is decreasing at $2$ litres per minute when $t=4$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Giving only the derivative without substituting the given value.",
      fix: "After differentiating, substitute the specified value into the derivative.",
    },
    {
      mistake: "Forgetting units.",
      fix: "Rates need units such as metres per second, dollars per item, or people per year.",
    },
    {
      mistake: "Interpreting a negative rate as a negative quantity.",
      fix: "A negative rate describes direction, not amount: it means the quantity is decreasing at that instant, even when the quantity itself is still large and positive.",
    },
    {
      mistake: "Using the original function value as the rate.",
      fix: "The amount present and how fast it is changing are different questions. Q(t) is the amount; Q'(t) is the instantaneous rate, so differentiate first and use the derivative value.",
    },
  ],

  masteryQuiz: [
    {
      id: "rates-mastery-1",
      prompt: "A ball is thrown upward. Find and interpret the instantaneous velocity at $t = 3$.",
      latex: "h(t)=-4t^2+24t+3 \\quad \\text{(metres)}",
      answer: "momentarily not changing",
      acceptedAnswers: ["not changing", "stationary"],
      explanation: "v(t) = h'(t) = -8t + 24. At t = 3, h'(3) = 0, so the height is momentarily not changing — the ball is at its highest point.",
    },
    {
      id: "rates-mastery-2",
      prompt: "Find the rate at $t=2$:",
      latex: "",
      answer: "8",
      hint: "Substitute $t=2$.",
      explanation: "$h'(2)=8$.",
    },
    {
      id: "rates-mastery-3",
      prompt: "Complete the sentence: the height is ____.",
      latex: "h'(2)=8",
      answer: "A",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Positive rate means increasing.",
      explanation: "The height is increasing at $8$ m/s when $t=2$.",
    },
    {
      id: "rates-mastery-4",
      prompt: "Complete the sentence: the quantity is ____.",
      latex: "P'(5)=-12",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "A negative derivative means the quantity is decreasing.",
      explanation: "The quantity is decreasing at $12$ units per time unit.",
    },
    {
      id: "rates-mastery-5",
      prompt: "Interpret a zero rate:",
      latex: "Q'(3)=0",
      answer: "C",
      acceptedAnswers: ["not changing", "zero rate"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Zero rate means no instantaneous change at that moment.",
      explanation: "The quantity is momentarily not changing when $t=3$.",
    },
    {
      id: "rates-mastery-6",
      prompt: "Find and interpret the rate of change of $P$ at $t = 3$.",
      latex: "P(t)=t^3-6t^2+20t+100",
      answer: "increasing",
      acceptedAnswers: ["positive"],
      explanation: "P'(t) = 3t² - 12t + 20. P'(3) = 11 > 0, so P is increasing at t = 3.",
    },
    {
      id: "rates-mastery-7",
      prompt:
        "Choose the correct interpretation. A: decreasing. B: increasing. C: momentarily not changing.",
      latex: "P'(3)=11",
      answer: "B",
      choices: [
        { label: "A", text: "decreasing" },
        { label: "B", text: "increasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "A positive derivative means increasing.",
      explanation:
        "Since $P'(3)=11>0$, the quantity is increasing at $t=3$. Option B is correct.",
    },
    {
      id: "rates-mastery-8",
      prompt:
        "Complete the sentence for the displayed rate of change: the quantity is ____.",
      latex: "Q'(5)=0",
      answer: "C",
      acceptedAnswers: ["not changing", "zero rate"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
        { label: "C", text: "momentarily not changing" },
      ],
      hint: "Zero derivative means zero instantaneous rate.",
      explanation:
        "A derivative value of $0$ means the quantity is momentarily not changing at that instant.",
    },
    {
      id: "rates-mastery-9",
      prompt:
        "A tank has $V'(4)=-7$. What is the rate magnitude?",
      latex: "V'(4)=-7 \\text{ litres per minute}",
      answer: "7",
      hint: "A negative rate means decreasing.",
      explanation:
        "Since $V'(4)=-7$, the volume is decreasing at $7$ litres per minute.",
    },
    {
      id: "rates-mastery-10",
      prompt: "Find and interpret the marginal cost at $x = 8$ items.",
      latex: "C(x)=x^2-10x+60 \\quad \\text{(dollars)}",
      answer: "increasing",
      acceptedAnswers: ["positive", "going up"],
      explanation: "C'(x) = 2x - 10. C'(8) = 6 > 0, so the cost is increasing at x = 8, at 6 dollars per item.",
    },
  ],

  masteryPassMark: 0.8,
};

export const mixedExamPracticeLesson: ExplicitLesson = {
  id: "mixed-exam-practice",
  slug: "mixed-exam-practice",
  moduleSlug: "ma-c3-applications-of-differentiation",
  moduleTitle: "Applications of Differentiation",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Mixed Differential Calculus Exam Practice",
  description:
    "Practise mixed HSC-style differential calculus questions that combine skills, reasoning, and interpretation.",
  syllabusArea: "Calculus",
  focus: "Differential calculus",
  status: "active",

  video: {
    title: "Mixed Differential Calculus Exam Practice",
    url: "https://www.youtube.com/embed/SXKGKoPlCpc",
  },

  learningIntention:
    "Learn how to choose and combine differential calculus skills in mixed exam-style questions.",

  successCriteria: [
    "Identify whether a question is asking for a derivative, gradient, tangent, normal, stationary point, maximum or minimum, interval behaviour, or rate of change.",
    "Show clear working and define variables in worded problems.",
    "Use derivatives to support exam reasoning rather than only performing calculations.",
    "Include units where relevant and answer worded questions in context.",
    "Transfer known differential calculus skills to unfamiliar situations.",
  ],

  teaching: {
    paragraphs: [
      "Exam questions often combine multiple differential calculus skills.",
      "The first step is not always obvious from the wording, so begin by identifying what the question is really asking.",
      "A question may require a derivative, gradient, tangent, normal, stationary point, maximum or minimum, interval behaviour, or rate of change.",
      "In worded problems, define variables clearly and connect each calculation back to the context.",
      "Good exam responses show working, include units where relevant, and finish with a sentence that answers the question.",
      "Transfer means applying known skills in unfamiliar situations rather than waiting for a familiar template.",
    ],
    latexBlocks: [
      "\\text{read} \\quad \\Rightarrow \\quad \\text{identify the skill} \\quad \\Rightarrow \\quad \\text{choose a method}",
      "\\text{tangent gradient}=f'(a)",
      "f'(x)=0 \\quad \\Rightarrow \\quad \\text{stationary points or optimisation}",
      "\\frac{d}{dt}\\left(\\text{quantity}\\right) \\quad \\Rightarrow \\quad \\text{rate of change}",
    ],
  },

  workedExamples: [
    {
      title: "Worked example 1: Tangent and interpretation",
      questionLatex:
        "s(t)=t^3-6t^2+9t+2, \\quad t\\ge 0. \\quad \\text{a) Find }v(t). \\quad \\text{b) Find }v(2). \\quad \\text{c) Interpret the sign.}",
      steps: [
        {
          explanation: "Velocity is the derivative of displacement.",
          latex: "v(t)=s'(t)",
        },
        {
          explanation: "Differentiate the displacement function.",
          latex: "v(t)=3t^2-12t+9",
        },
        {
          explanation: "Substitute $t=2$.",
          latex: "v(2)=3(2)^2-12(2)+9=-3",
        },
        {
          explanation: "Interpret the negative sign in context.",
          latex:
            "v(2)<0 \\quad \\Rightarrow \\quad \\text{the particle is moving in the negative direction at }t=2",
        },
      ],
      finalAnswerLatex:
        "v(t)=3t^2-12t+9, \\quad v(2)=-3. \\quad \\text{The particle is moving in the negative direction at }t=2.",
    },
    {
      title: "Worked example 2: Stationary points and classification",
      questionLatex:
        "P(x)=-x^3+9x^2-15x+20, \\quad 0\\le x\\le 6. \\quad \\text{Find and classify stationary points in the domain.}",
      steps: [
        {
          explanation: "Differentiate the profit function.",
          latex: "P'(x)=-3x^2+18x-15",
        },
        {
          explanation: "Solve $P'(x)=0$.",
          latex:
            "-3x^2+18x-15=0 \\Rightarrow x^2-6x+5=0 \\Rightarrow x=1,5",
        },
        {
          explanation: "Both values are in the domain.",
          latex: "0\\le 1\\le 6, \\quad 0\\le 5\\le 6",
        },
        {
          explanation: "Use the second derivative to classify.",
          latex: "P''(x)=-6x+18, \\quad P''(1)=12>0, \\quad P''(5)=-12<0",
        },
        {
          explanation: "Find the coordinates.",
          latex: "P(1)=13, \\quad P(5)=45",
        },
      ],
      finalAnswerLatex:
        "\\text{Local minimum at }(1,13), \\quad \\text{local maximum at }(5,45).",
    },
    {
      title: "Worked example 3: Optimisation transfer",
      questionLatex:
        "\\text{A farmer has }60\\text{ m of fencing for a rectangular pen against a wall. Fencing is needed for three sides. Find the dimensions that maximise area.}",
      steps: [
        {
          explanation: "Define variables and write the fencing constraint.",
          latex: "2x+y=60",
        },
        {
          explanation: "Write the area in terms of one variable.",
          latex: "A=xy, \\quad y=60-2x \\Rightarrow A=x(60-2x)=60x-2x^2",
        },
        {
          explanation: "Differentiate and solve $A'(x)=0$.",
          latex: "A'(x)=60-4x, \\quad 60-4x=0 \\Rightarrow x=15",
        },
        {
          explanation: "Find the remaining dimension and check maximum.",
          latex: "y=60-2(15)=30, \\quad A''(x)=-4<0",
        },
        {
          explanation: "Answer in context.",
          latex: "\\text{two widths of }15\\text{ m and one length of }30\\text{ m}",
        },
      ],
      finalAnswerLatex:
        "\\text{The maximum area occurs when the pen is }15\\text{ m by }30\\text{ m.}",
    },
  ],

  guidedPractice: [
    {
      id: "mixed-guided-1",
      prompt: "Identify the calculus skill needed:",
      latex:
        "\\text{A question asks for the gradient of the curve }y=x^2+3x\\text{ at }x=2.",
      answer: "derivative",
      acceptedAnswers: ["differentiation", "differentiate", "differentiating"],
      hint: "Gradient of a curve at a point comes from the derivative.",
      explanation:
        "The skill needed is differentiation, because the derivative gives the tangent gradient at a point.",
    },
    {
      id: "mixed-guided-2",
      prompt: "Work through a tangent question in context:",
      latex:
        "h(t)=-t^2+6t+1. \\quad \\text{Find the gradient of the tangent when }t=2.",
      answer: "2",
      hint: "Find $h'(t)$, then substitute $t=2$.",
      explanation:
        "$h'(t)=-2t+6$, so $h'(2)=2$. The tangent gradient at $t=2$ is $2$.",
    },
    {
      id: "mixed-guided-3",
      prompt: "Classify the stationary point:",
      latex: "f'(x)=2x-8, \\quad f(4)=3",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Use $f'(x)=0$ and the sign of the derivative around $x=4$.",
      explanation:
        "$2x-8=0$ gives $x=4$. Since $f'(x)$ changes from negative to positive at $x=4$, there is a local minimum at $(4,3)$.",
    },
    {
      id: "mixed-guided-4",
      prompt: "Optimise using a constraint. Find $x$:",
      latex: "2x+y=30, \\quad A=xy",
      answer: "15/2",
      acceptedAnswers: ["7.5"],
      hint: "Use $y=30-2x$, then maximise $A=x(30-2x)$.",
      explanation:
        "$A=30x-2x^2$, so $A'(x)=30-4x=0$ gives $x=\\frac{15}{2}$. Then $y=15$.",
    },
  ],

  independentPractice: [
    {
      id: "mixed-ind-1",
      prompt: "Tangent and normal transfer: find the normal gradient.",
      latex: "y=x^2+2x, \\quad x=1",
      answer: "-1/4",
      acceptedAnswers: ["-0.25"],
      hint: "Find the tangent gradient, then use the negative reciprocal.",
      explanation:
        "$y'=2x+2$, so $m_t=4$ at $x=1$. The point is $(1,3)$ and $m_n=-\\frac{1}{4}$. Hence $y-3=-\\frac{1}{4}(x-1)$, so $y=-\\frac{1}{4}x+\\frac{13}{4}$.",
    },
    {
      id: "mixed-ind-2",
      prompt: "Find the rate value:",
      latex: "C(t)=2t^2+5t+100 \\quad \\text{dollars, find and interpret }C'(3).",
      answer: "17",
      hint: "Differentiate and substitute $t=3$.",
      explanation:
        "$C'(t)=4t+5$, so $C'(3)=17$. The cost is increasing at $17$ dollars per hour when $t=3$.",
    },
    {
      id: "mixed-ind-3",
      prompt: "Classify the stationary point:",
      latex: "f(x)=x^2-10x+8",
      answer: "B",
      acceptedAnswers: ["local min", "minimum", "min"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Find the stationary point, then use $f''$ or a derivative sign test to classify it.",
      explanation:
        "$f'(x)=2x-10$, so $x=5$. Since $f''(x)=2>0$ and $f(5)=-17$, there is a local minimum at $(5,-17)$.",
    },
    {
      id: "mixed-ind-4",
      prompt: "Optimisation word problem. Find one side length:",
      latex:
        "\\text{A rectangle has perimeter }32\\text{ cm. Find dimensions for maximum area.}",
      answer: "8",
      hint: "Let the sides be $x$ and $y$, then use $x+y=16$.",
      explanation:
        "$y=16-x$ and $A=x(16-x)=16x-x^2$. $A'(x)=16-2x=0$ gives $x=8$, so $y=8$. The maximum area occurs for an $8$ cm by $8$ cm rectangle.",
    },
    {
      id: "mixed-ind-5",
      prompt: "Curve-sketching key features. Find the minimum value:",
      latex: "f(x)=x^2-6x+8",
      answer: "-1",
      hint: "Find intercepts and the stationary point.",
      explanation:
        "$f(x)=(x-2)(x-4)$, so the $x$-intercepts are $(2,0)$ and $(4,0)$, and the $y$-intercept is $(0,8)$. Since $f'(x)=2x-6$, the minimum is at $(3,-1)$.",
    },
  ],

  commonMistakes: [
    {
      mistake: "Starting with differentiation without reading the question carefully.",
      fix: "First identify whether the question asks for a tangent, normal, stationary point, optimisation, interval behaviour, or rate.",
    },
    {
      mistake: "Leaving answers as raw calculations.",
      fix: "Write a final sentence that answers the question in context.",
    },
    {
      mistake: "Forgetting units in worded problems.",
      fix: "Include units for rates, lengths, areas, costs, and other contextual quantities.",
    },
    {
      mistake: "Mixing up function values and derivative values.",
      fix: "Use $f(x)$ for coordinates or quantities, and $f'(x)$ for gradients and rates.",
    },
  ],

  masteryQuiz: [
    {
      id: "mixed-mastery-1",
      prompt: "Find the tangent gradient in context at $t=2$:",
      latex: "s(t)=t^2+3t+1",
      answer: "7",
      hint: "Find the gradient and point at $t=2$.",
      explanation:
        "$s'(t)=2t+3$, so $s'(2)=7$. Also $s(2)=11$. The tangent is $s-11=7(t-2)$, so $s=7t-3$.",
    },
    {
      id: "mixed-mastery-2",
      prompt: "Find the normal gradient at the point where $x=3$.",
      latex: "y=x^2-4x+1",
      answer: "-1/2",
      acceptedAnswers: ["-0.5"],
      hint: "Find the tangent gradient, then use the negative reciprocal.",
      explanation:
        "$y'=2x-4$, so at $x=3$, $m_t=2$ and $m_n=-\\frac{1}{2}$. The point is $(3,-2)$, so $y+2=-\\frac{1}{2}(x-3)$ and $y=-\\frac{1}{2}x-\\frac{1}{2}$.",
    },
    {
      id: "mixed-mastery-3",
      prompt: "Find stationary point coordinates:",
      latex: "f(x)=x^2-8x+5",
      answer: "(4,-11)",
      acceptedAnswers: ["4,-11", "4, -11", "(4, -11)"],
      hint: "Solve $f'(x)=0$, then substitute into $f(x)$.",
      explanation:
        "$f'(x)=2x-8$, so $x=4$. Then $f(4)=16-32+5=-11$, giving stationary point $(4,-11)$.",
    },
    {
      id: "mixed-mastery-4",
      prompt: "For $1<x<3$, is the function increasing or decreasing?",
      latex: "f'(x)=3(x-1)(x-3)",
      answer: "B",
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Check the sign of $f'(x)$ on the interval $1<x<3$.",
      explanation:
        "The sign pattern is $+,-,+$, so the function is increasing on $(-\\infty,1)$ and $(3,\\infty)$, and decreasing on $(1,3)$.",
    },
    {
      id: "mixed-mastery-5",
      prompt: "Optimisation with a worded constraint. Find the shorter side length:",
      latex:
        "\\text{A pen against a wall uses }40\\text{ m of fencing for three sides. Find dimensions for maximum area.}",
      answer: "10",
      hint: "Use $2x+y=40$ and maximise $A=xy$.",
      explanation:
        "$y=40-2x$, so $A=x(40-2x)=40x-2x^2$. $A'(x)=40-4x=0$ gives $x=10$ and $y=20$. The maximum area occurs for dimensions $10$ m by $20$ m.",
    },
    {
      id: "mixed-mastery-6",
      prompt: "Complete the sentence: the height is ____.",
      latex: "h(t)=-5t^2+30t+2 \\quad \\text{metres. Interpret }h'(4).",
      answer: "B",
      acceptedAnswers: ["negative"],
      choices: [
        { label: "A", text: "increasing" },
        { label: "B", text: "decreasing" },
      ],
      hint: "Differentiate, substitute $t=4$, and interpret the sign.",
      explanation:
        "$h'(t)=-10t+30$, so $h'(4)=-10$. The height is decreasing at $10$ m/s when $t=4$.",
    },
    {
      id: "mixed-mastery-7",
      prompt: "Classify the stationary point at $x=1$:",
      latex: "f(x)=x^3-6x^2+9x+1",
      answer: "A",
      acceptedAnswers: ["local max", "maximum", "max"],
      choices: [
        { label: "A", text: "local maximum" },
        { label: "B", text: "local minimum" },
        { label: "C", text: "neither" },
      ],
      hint: "Find $f'(x)$ and use the derivative sign change around $x=1$.",
      explanation:
        "$f'(x)=3x^2-12x+9=3(x-1)(x-3)$, so $x=1,3$. The sign pattern is $+,-,+$, giving a local maximum at $(1,5)$ and a local minimum at $(3,1)$.",
    },
    {
      id: "mixed-mastery-8",
      prompt: "Find the minimum value:",
      latex: "f(x)=x^2-2x-3",
      answer: "-4",
      hint: "Find intercepts and the stationary point.",
      explanation:
        "$f(x)=(x-3)(x+1)$, so the x-intercepts are $(-1,0)$ and $(3,0)$, and the y-intercept is $(0,-3)$. Since $f'(x)=2x-2$, the minimum is at $(1,-4)$.",
    },
    {
      id: "mixed-mastery-9",
      prompt:
        "A profit model is given. Find the maximum profit value.",
      latex: "P(x)=-2x^2+80x-300",
      answer: "500",
      hint: "Solve $P'(x)=0$, then substitute into $P(x)$.",
      explanation:
        "$P'(x)=-4x+80$, so $x=20$. Since $P''(x)=-4<0$, this gives a maximum. $P(20)=500$, so the maximum profit is $500$ when $x=20$.",
    },
    {
      id: "mixed-mastery-10",
      prompt:
        "A question asks for the normal equation to a curve at a point. Choose the best plan.",
      latex: "\\text{Normal equation strategy}",
      answer: "B",
      choices: [
        { label: "A", text: "Set $f(x)=0$" },
        { label: "B", text: "Find the tangent gradient, use the negative reciprocal, then use point-gradient form" },
        { label: "C", text: "Find only the y-intercept" },
      ],
      hint: "Normals are perpendicular to tangents.",
      explanation:
        "To find a normal, first find the tangent gradient using the derivative. Then use the negative reciprocal for the normal gradient and substitute the point into point-gradient form. Option B is correct.",
    },
  ],

  masteryPassMark: 0.8,
};

export const differentialCalculusOutline: LessonOutlineItem[] = [
  {
    id: "rate-of-change",
    slug: "rate-of-change",
    title: "The derivative as rate of change",
    description:
      "Understand average rate of change, instantaneous rate of change, tangent gradients, and derivative notation.",
    status: "active",
  },
  {
    id: "differentiating-polynomial-terms",
    slug: "differentiating-polynomial-terms",
    title: "Differentiating polynomial terms",
    description:
      "Use the power rule to differentiate individual polynomial terms accurately.",
    status: "active",
  },
  {
    id: "differentiating-polynomial-functions",
    slug: "differentiating-polynomial-functions",
    title: "Differentiating polynomial functions",
    description:
      "Differentiate full polynomial expressions term-by-term and simplify the derivative.",
    status: "active",
  },
  {
    id: "tangents-and-normals",
    slug: "tangents-and-normals",
    title: "Tangents and normals",
    description:
      "Use derivatives to find gradients and equations of tangents and normals.",
    status: "active",
  },
  {
    id: "stationary-points",
    slug: "stationary-points",
    title: "Stationary points",
    description:
      "Solve derivative equations and find the coordinates of stationary points.",
    status: "active",
  },
  {
    id: "increasing-decreasing-functions",
    slug: "increasing-decreasing-functions",
    title: "Increasing and decreasing functions",
    description:
      "Use the sign of the derivative to determine where a function is increasing or decreasing.",
    status: "active",
  },
  {
    id: "first-derivative-test",
    slug: "first-derivative-test",
    title: "First derivative test",
    description:
      "Classify stationary points using sign changes in the first derivative.",
    status: "active",
  },
  {
    id: "second-derivative-test",
    slug: "second-derivative-test",
    title: "Second derivative test",
    description:
      "Use the second derivative to classify local maxima and minima.",
    status: "active",
  },
  {
    id: "curve-sketching",
    slug: "curve-sketching",
    title: "Curve sketching with derivatives",
    description:
      "Combine intercepts, stationary points, derivative signs, and concavity to sketch curves.",
    status: "active",
  },
  {
    id: "optimisation",
    slug: "optimisation",
    title: "Optimisation problems",
    description:
      "Form objective functions and use derivatives to solve maximum and minimum problems.",
    status: "active",
  },
  {
    id: "rates-of-change-applications",
    slug: "rates-of-change-applications",
    title: "Rates of change applications",
    description:
      "Interpret derivatives as rates of change in applied contexts.",
    status: "active",
  },
  {
    id: "mixed-exam-practice",
    slug: "mixed-exam-practice",
    title: "Mixed differential calculus exam practice",
    description:
      "Practise mixed HSC-style questions across the differential calculus unit.",
    status: "active",
  },
];

export const differentialCalculusLessons = [
  derivativeAsRateOfChangeLesson,
  differentiatingPolynomialTermsLesson,
  differentiatingPolynomialFunctionsLesson,
  tangentsAndNormalsLesson,
  stationaryPointsLesson,
  increasingDecreasingFunctionsLesson,
  firstDerivativeTestLesson,
  secondDerivativeTestLesson,
  curveSketchingLesson,
  optimisationLesson,
  ratesOfChangeApplicationsLesson,
  mixedExamPracticeLesson,
];
