import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function calcappChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  hint = "Identify the relevant formula or model before selecting an answer."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Choose the best option.}",
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint,
    explanation,
  };
}

function calcappTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Set up the relationship, differentiate or evaluate, then substitute the given values."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint,
    explanation,
  };
}

// ─── Lesson 1: Related Rates of Change ──────────────────────────────────────

const relatedRates: Partial<ExplicitLesson> = {
  description:
    "Use the chain rule to connect the rates of change of two related quantities with respect to time, solving geometric related-rate problems.",
  learningIntention:
    "Differentiate a geometric relationship with respect to time and use the chain rule to find an unknown rate.",
  successCriteria: [
    "Write the geometric relationship connecting two quantities.",
    "Differentiate both sides implicitly with respect to t using the chain rule.",
    "Substitute the given values after differentiating, not before.",
    "Identify the sign of the rate (positive for increasing, negative for decreasing).",
  ],
  teaching: {
    paragraphs: [
      "A related rate problem involves two or more quantities that both change with time. Because they are linked by a geometric formula, differentiating that formula with respect to t connects their rates.",
      "The key tool is the chain rule. For example, if $V = (4/3)\\pi r^3$, then differentiating both sides with respect to $t$ gives $dV/dt = 4\\pi r^2 \\cdot (dr/dt)$. The factor $dr/dt$ appears automatically from the chain rule.",
      "The method has three steps: (1) write the equation relating the quantities; (2) differentiate both sides with respect to t; (3) substitute known values and solve for the unknown rate.",
      "Always substitute the given values after differentiating. Substituting before differentiating will produce the wrong answer because it removes the variables that carry the rate information.",
    ],
    latexBlocks: [
      "V = \\frac{4}{3}\\pi r^3 \\;\\Rightarrow\\; \\frac{dV}{dt} = 4\\pi r^2\\,\\frac{dr}{dt}",
      "A = \\pi r^2 \\;\\Rightarrow\\; \\frac{dA}{dt} = 2\\pi r\\,\\frac{dr}{dt}",
      "x^2+y^2=c^2 \\;\\Rightarrow\\; 2x\\,\\frac{dx}{dt}+2y\\,\\frac{dy}{dt}=0",
    ],
  },
  workedExamples: [
    {
      title: "Expanding spherical balloon",
      questionLatex:
        "\\text{A spherical balloon is inflated so its radius increases at }0.5\\text{ cm/s. Find }dV/dt\\text{ when }r=4\\text{ cm.}",
      steps: [
        {
          explanation: "Write the volume formula for a sphere.",
          latex: "V = \\tfrac{4}{3}\\pi r^3",
        },
        {
          explanation: "Differentiate both sides with respect to t using the chain rule.",
          latex: "\\frac{dV}{dt} = 4\\pi r^2\\,\\frac{dr}{dt}",
        },
        {
          explanation: "Substitute r = 4 and dr/dt = 0.5.",
          latex: "\\frac{dV}{dt} = 4\\pi (16)(0.5) = 32\\pi\\text{ cm}^3/\\text{s}",
        },
      ],
      finalAnswerLatex: "32\\pi\\text{ cm}^3/\\text{s}",
    },
    {
      title: "Ladder sliding down a wall",
      questionLatex:
        "\\text{A 5 m ladder leans against a wall. Its foot slides away at 1 m/s. Find }dy/dt\\text{ when the foot is 3 m from the wall.}",
      steps: [
        {
          explanation: "Let x be the foot's distance from the wall and y be the height of the top. Then x² + y² = 25.",
          latex: "x^2 + y^2 = 25",
        },
        {
          explanation: "Differentiate both sides with respect to t.",
          latex: "2x\\,\\frac{dx}{dt} + 2y\\,\\frac{dy}{dt} = 0",
        },
        {
          explanation: "When x = 3: $y = \\sqrt{25-9} = 4$. Substitute x = 3, y = 4, $dx/dt = 1$.",
          latex: "2(3)(1) + 2(4)\\,\\frac{dy}{dt} = 0 \\;\\Rightarrow\\; \\frac{dy}{dt} = -\\tfrac{3}{4}\\text{ m/s}",
        },
      ],
      finalAnswerLatex: "-\\tfrac{3}{4}\\text{ m/s (top slides down)}",
    },
    {
      title: "Expanding circular ripple",
      questionLatex:
        "\\text{A circular ripple expands at }dr/dt = 2\\text{ cm/s. How fast is the area increasing when }r = 10\\text{ cm?}",
      steps: [
        {
          explanation: "Write the area formula for a circle.",
          latex: "A = \\pi r^2",
        },
        {
          explanation: "Differentiate with respect to t.",
          latex: "\\frac{dA}{dt} = 2\\pi r\\,\\frac{dr}{dt}",
        },
        {
          explanation: "Substitute r = 10 and dr/dt = 2.",
          latex: "\\frac{dA}{dt} = 2\\pi(10)(2) = 40\\pi\\text{ cm}^2/\\text{s}",
        },
      ],
      finalAnswerLatex: "40\\pi\\text{ cm}^2/\\text{s}",
    },
  ],
  guidedPractice: [
    calcappChoice(
      "y12e1-calcapp-rates-g1",
      "If $V = (4/3)\\pi r^3$, which expression gives $dV/dt$?",
      "A",
      [
        "$4\\pi r^2\\,dr/dt$",
        "$(4/3)\\pi r^2\\,dr/dt$",
        "$4\\pi r\\,dr/dt$",
        "$(4\\pi/3)\\,dr/dt$",
      ],
      "Apply the chain rule: $d/dt[(4/3)\\pi r^3] = 4\\pi r^2 \\cdot dr/dt$."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-g2",
      "A sphere's radius increases at 2 cm/s. Find dV/dt when r = 3 cm.",
      "V = \\tfrac{4}{3}\\pi r^3,\\quad r=3,\\quad dr/dt=2",
      "72\\pi",
      ["72\\pi \\text{ cm}^3/\\text{s}"],
      "dV/dt = 4\\pi r^2 \\cdot dr/dt = 4\\pi(9)(2) = 72\\pi\\text{ cm}^3/\\text{s}."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-g3",
      "A circle's radius increases at 3 cm/s. Find dA/dt when r = 5 cm.",
      "A = \\pi r^2,\\quad r=5,\\quad dr/dt=3",
      "30\\pi",
      ["30\\pi \\text{ cm}^2/\\text{s}"],
      "dA/dt = 2\\pi r \\cdot dr/dt = 2\\pi(5)(3) = 30\\pi\\text{ cm}^2/\\text{s}."
    ),
    calcappChoice(
      "y12e1-calcapp-rates-g4",
      "Which rule links dV/dt to dr/dt when V is a function of r?",
      "C",
      ["Product rule", "Quotient rule", "Chain rule", "Power rule"],
      "The chain rule gives d/dt[f(r)] = f'(r) · dr/dt, connecting the two rates."
    ),
  ],
  independentPractice: [
    calcappTyped(
      "y12e1-calcapp-rates-i1",
      "A sphere's radius decreases at 1 cm/s. Find dV/dt when r = 5 cm.",
      "V = \\tfrac{4}{3}\\pi r^3,\\quad r=5,\\quad dr/dt=-1",
      "-100\\pi",
      ["-100\\pi \\text{ cm}^3/\\text{s}"],
      "$dV/dt = 4\\pi r^2 \\cdot dr/dt = 4\\pi(25)(-1) = -100\\pi\\text{ cm}^3/\\text{s}$. The negative sign indicates the volume is decreasing."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-i2",
      "A 13 m ladder leans against a wall. The foot moves away at 2 m/s. Find dy/dt when the foot is 5 m from the wall.",
      "x^2+y^2=169,\\quad x=5,\\quad dx/dt=2",
      "-5/6",
      ["-\\tfrac{5}{6}", "-0.8\\overline{3}"],
      "When x = 5: y = \\sqrt{169-25} = 12. Differentiating: 2(5)(2) + 2(12)(dy/dt) = 0, so dy/dt = -20/24 = -5/6\\text{ m/s}."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-i3",
      "A square has side length increasing at 0.5 cm/s. Find dA/dt when s = 8 cm.",
      "A = s^2,\\quad s=8,\\quad ds/dt=0.5",
      "8",
      ["8 \\text{ cm}^2/\\text{s}"],
      "dA/dt = 2s \\cdot ds/dt = 2(8)(0.5) = 8\\text{ cm}^2/\\text{s}."
    ),
    calcappChoice(
      "y12e1-calcapp-rates-i4",
      "On the curve x² + y² = 25, when x = 3, y = 4 and dx/dt = 4, what is dy/dt?",
      "B",
      ["$3$", "$-3$", "$4$", "$-4$"],
      "Differentiating: 2(3)(4) + 2(4)(dy/dt) = 0, so 24 + 8(dy/dt) = 0, giving dy/dt = -3."
    ),
    calcappChoice(
      "y12e1-calcapp-rates-i5",
      "For the area of a circle $A = \\pi r^2$, which related rate formula is correct?",
      "B",
      [
        "$dA/dt = \\pi r\\,dr/dt$",
        "$dA/dt = 2\\pi r\\,dr/dt$",
        "$dA/dt = 2\\pi r$",
        "$dA/dt = \\pi(dr/dt)^2$",
      ],
      "Differentiating $A = \\pi r^2$ with respect to $t$ gives $dA/dt = 2\\pi r \\cdot dr/dt$."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Substituting numerical values before differentiating.",
      fix: "Differentiate both sides with respect to t first, then substitute the given values.",
    },
    {
      mistake: "Forgetting the chain rule factor dr/dt when differentiating a function of r with respect to t.",
      fix: "Every implicit derivative with respect to t requires a factor of the variable's own rate.",
    },
    {
      mistake: "Using the wrong sign for a decreasing quantity.",
      fix: "If a quantity is decreasing its rate is negative; check whether the context says increasing or decreasing.",
    },
    {
      mistake: "Not finding the missing variable (e.g. y from Pythagoras) before substituting.",
      fix: "Use the original equation to find any variable that is not directly given before substituting into the differentiated form.",
    },
  ],
  masteryQuiz: [
    calcappChoice(
      "y12e1-calcapp-rates-m1",
      "For $V = (4/3)\\pi r^3$, which expression equals $dV/dt$?",
      "A",
      [
        "$4\\pi r^2\\,dr/dt$",
        "$4\\pi r\\,dr/dt$",
        "$(4/3)r^2\\,dr/dt$",
        "$\\pi r^2\\,dr/dt$",
      ],
      "Chain rule applied to $(4/3)\\pi r^3$ gives $4\\pi r^2 \\cdot dr/dt$."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-m2",
      "A sphere's radius increases at 3 cm/s. Find dV/dt when r = 2 cm.",
      "",
      "48\\pi",
      ["48\\pi \\text{ cm}^3/\\text{s}"],
      "dV/dt = 4\\pi(4)(3) = 48\\pi\\text{ cm}^3/\\text{s}."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-m3",
      "Find dA/dt for a circle when r = 3 cm and dr/dt = 4 cm/s.",
      "A = \\pi r^2,\\quad r=3,\\quad dr/dt=4",
      "24\\pi",
      ["24\\pi \\text{ cm}^2/\\text{s}"],
      "dA/dt = 2\\pi(3)(4) = 24\\pi\\text{ cm}^2/\\text{s}."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-m4",
      "On x² + y² = 100, when x = 6, y = 8 and dx/dt = 5, find dy/dt.",
      "",
      "-15/4",
      ["-3.75", "-\\tfrac{15}{4}"],
      "2(6)(5) + 2(8)(dy/dt) = 0 \\Rightarrow 60 + 16(dy/dt) = 0 \\Rightarrow dy/dt = -15/4."
    ),
    calcappChoice(
      "y12e1-calcapp-rates-m5",
      "A square's side increases at 2 cm/s when s = 6 cm. What is dA/dt?",
      "A",
      ["$24$ cm²/s", "$12$ cm²/s", "$36$ cm²/s", "$6$ cm²/s"],
      "dA/dt = 2s \\cdot ds/dt = 2(6)(2) = 24\\text{ cm}^2/\\text{s}."
    ),
    calcappChoice(
      "y12e1-calcapp-rates-m6",
      "What is the chain rule's role in a related rates problem?",
      "A",
      [
        "It links one quantity's rate to another through their functional relationship",
        "It multiplies both sides of the equation by dt",
        "It applies only to trigonometric functions",
        "It allows dropping the constant when differentiating",
      ],
      "The chain rule dV/dt = (dV/dr)(dr/dt) is the mechanism that connects the two rates."
    ),
    calcappChoice(
      "y12e1-calcapp-rates-m7",
      "A balloon's volume grows at $10\\pi$ cm³/s. When $r = 5$ cm, $dr/dt$ equals:",
      "A",
      ["$0.1$ cm/s", "$10$ cm/s", "$0.4$ cm/s", "$2.5$ cm/s"],
      "10\\pi = 4\\pi(25)(dr/dt) \\Rightarrow dr/dt = 10/(100) = 0.1\\text{ cm/s}."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-m8",
      "A square has side s = 10 cm with ds/dt = 0.2 cm/s. Find dA/dt.",
      "A = s^2,\\quad s=10,\\quad ds/dt=0.2",
      "4",
      ["4 \\text{ cm}^2/\\text{s}"],
      "dA/dt = 2(10)(0.2) = 4\\text{ cm}^2/\\text{s}."
    ),
    calcappTyped(
      "y12e1-calcapp-rates-m9",
      "A circle has r = 7 cm and dr/dt = 1 cm/s. Find dA/dt.",
      "A = \\pi r^2,\\quad r=7,\\quad dr/dt=1",
      "14\\pi",
      ["14\\pi \\text{ cm}^2/\\text{s}"],
      "dA/dt = 2\\pi(7)(1) = 14\\pi\\text{ cm}^2/\\text{s}."
    ),
    calcappChoice(
      "y12e1-calcapp-rates-m10",
      "Why must values be substituted after differentiating in a related rates problem?",
      "A",
      [
        "Substituting before differentiating destroys the variable needed to carry the rate",
        "Differentiation requires all values to be unknown",
        "The chain rule only applies after substitution",
        "Substituting first is acceptable if the geometry is simple",
      ],
      "If you fix x = 3 before differentiating x² + y² = 25, the x-term vanishes and dx/dt disappears from the equation."
    ),
  ],
  masteryPassMark: 0.8,

  multiPartPractice: [
    {
      id: "calcapp-mp-1",
      prompt:
        "A 5 m ladder leans against a vertical wall. The base slides away from the wall at $1$ m/s. At the instant when the base is $3$ m from the wall:",
      latex: "x^2 + h^2 = 25",
      answer: "4",
      hint: "Use Pythagoras for part (a). Differentiate $x^2+h^2=25$ with respect to $t$ for part (b), then substitute values. Use the sign of $dh/dt$ for part (c).",
      explanation:
        "Part (a): $3^2+h^2=25$, so $h^2=16$ and $h=4$ m. Part (b): Differentiating: $2x\\frac{dx}{dt}+2h\\frac{dh}{dt}=0$. With $x=3$, $h=4$, $\\frac{dx}{dt}=1$: $6+8\\frac{dh}{dt}=0$, so $\\frac{dh}{dt}=-\\frac{3}{4}$ m/s. Part (c): $\\frac{dh}{dt}<0$, so the top is moving down.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "Find the height of the top of the ladder above the ground when the base is $3$ m from the wall.",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Use the Pythagorean relationship $x^2+h^2=25$ with $x=3$.",
          explanation:
            "$3^2+h^2=25 \\Rightarrow h^2=16 \\Rightarrow h=4$ m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "Find $\\frac{dh}{dt}$ at this instant, where $h$ is the height of the top of the ladder.",
          marks: 2,
          answer: "-3/4",
          acceptedAnswers: ["-0.75", "−3/4"],
          hint: "Differentiate $x^2+h^2=25$ with respect to $t$, then substitute $x=3$, $h=4$, $\\frac{dx}{dt}=1$.",
          explanation:
            "Differentiating: $2x\\frac{dx}{dt}+2h\\frac{dh}{dt}=0$. Substituting: $2(3)(1)+2(4)\\frac{dh}{dt}=0 \\Rightarrow \\frac{dh}{dt}=-\\frac{6}{8}=-\\frac{3}{4}$ m/s.",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "State whether the top of the ladder is moving up or down at this instant.",
          marks: 1,
          answer: "down",
          acceptedAnswers: ["downward", "downwards", "moving down", "moving downward"],
          hint: "Use the sign of $\\frac{dh}{dt}$ from part (b).",
          explanation:
            "$\\frac{dh}{dt}=-\\frac{3}{4}<0$, so $h$ is decreasing. The top of the ladder is moving down.",
        },
      ],
    },
  ],
  masteryQuizPool: [
    {
      id: "y12e1-relrates-pool-d5-1",
      prompt:
        "Given dy/dx = 3 and dx/dt = 2, use the chain rule to find dy/dt.",
      latex: "",
      answer: "6",
      acceptedAnswers: ["6 units/s"],
      hint: "Multiply the two rates.",
      explanation: "dy/dt = (dy/dx)(dx/dt) = 3 × 2 = 6.",
      difficulty: 5,
    },
  ],
};

// ─── Lesson 2: Exponential Growth and Decay ──────────────────────────────────

const exponentialGrowthDecay: Partial<ExplicitLesson> = {
  description:
    "Model exponential growth and decay using dN/dt = kN and Newton's Law of Cooling, finding the growth constant from data and evaluating the model at future times.",
  learningIntention:
    "Identify exponential growth or decay models, determine the constant k from given data, and use the model to predict future values.",
  successCriteria: [
    "State that $dN/dt = kN$ has the solution $N = N_0 e^{kt}$.",
    "Find k by substituting a known data point and solving for k.",
    "Distinguish growth (k > 0) from decay (k < 0).",
    "Apply Newton's Law of Cooling in the form $T = S + Ae^{kt}$ where $S$ is the ambient temperature.",
  ],
  teaching: {
    paragraphs: [
      "The differential equation $dN/dt = kN$ describes any quantity whose rate of change is proportional to the current amount. Its general solution is $N(t) = N_0 e^{kt}$, where $N_0$ is the initial value and $k$ is the growth constant.",
      "When k > 0 the quantity grows (population growth, compound interest). When k < 0 it decays (radioactive decay, drug concentration). The sign of k is determined by whether the quantity increases or decreases over time.",
      "To find $k$: substitute a known value at a specific time into $N = N_0 e^{kt}$ and solve for $k$ using logarithms.",
      "Newton's Law of Cooling uses $T(t) = S + (T_0 - S)e^{kt}$ where $S$ is the surrounding (ambient) temperature and $T_0$ is the initial temperature of the object. Here $k < 0$ for a cooling object.",
    ],
    latexBlocks: [
      "\\frac{dN}{dt} = kN \\;\\Rightarrow\\; N = N_0 e^{kt}",
      "\\text{Find }k:\\; N_1 = N_0 e^{k t_1} \\;\\Rightarrow\\; k = \\frac{1}{t_1}\\ln\\!\\left(\\frac{N_1}{N_0}\\right)",
      "T(t) = S + (T_0 - S)e^{kt}",
    ],
  },
  workedExamples: [
    {
      title: "Doubling population",
      questionLatex:
        "\\text{A colony of 1000 bacteria doubles every 2 hours. How many are there after 6 hours?}",
      steps: [
        {
          explanation: "Write the model and use the doubling condition to find k.",
          latex: "N = 1000\\,e^{kt},\\quad 2000 = 1000\\,e^{2k} \\;\\Rightarrow\\; k = \\tfrac{\\ln 2}{2}",
        },
        {
          explanation: "Evaluate N at t = 6.",
          latex: "N(6) = 1000\\,e^{3\\ln 2} = 1000 \\times 8 = 8000",
        },
      ],
      finalAnswerLatex: "8000\\text{ bacteria}",
    },
    {
      title: "Radioactive decay and half-life",
      questionLatex:
        "\\text{200 g of a radioactive substance decays to 50 g in 8 years. Find the half-life.}",
      steps: [
        {
          explanation: "Write the decay model and find k from the given data.",
          latex: "50 = 200\\,e^{8k} \\;\\Rightarrow\\; e^{8k} = \\tfrac{1}{4} \\;\\Rightarrow\\; k = -\\tfrac{\\ln 2}{4}",
        },
        {
          explanation: "The half-life is the time for N to halve: $t_{1/2} = \\ln 2 / |k|$.",
          latex: "t_{1/2} = \\frac{\\ln 2}{\\ln 2/4} = 4\\text{ years}",
        },
      ],
      finalAnswerLatex: "4\\text{ years}",
    },
    {
      title: "Newton's Law of Cooling",
      questionLatex:
        "\\text{An object at 80°C cools in a room at 20°C. After 5 min its temperature is 50°C. Find the temperature after 10 min.}",
      steps: [
        {
          explanation: "Write the cooling model with S = 20 and A = 80 - 20 = 60.",
          latex: "T(t) = 20 + 60\\,e^{kt}",
        },
        {
          explanation: "Substitute T(5) = 50 to find k.",
          latex: "50 = 20 + 60\\,e^{5k} \\;\\Rightarrow\\; e^{5k} = \\tfrac{1}{2} \\;\\Rightarrow\\; k = -\\tfrac{\\ln 2}{5}",
        },
        {
          explanation: "Evaluate T(10) using $(e^{5k})^2 = (1/2)^2 = 1/4$.",
          latex: "T(10) = 20 + 60\\cdot\\tfrac{1}{4} = 20 + 15 = 35^\\circ\\text{C}",
        },
      ],
      finalAnswerLatex: "35^\\circ\\text{C}",
    },
  ],
  guidedPractice: [
    calcappChoice(
      "y12e1-calcapp-expgd-g1",
      "The general solution to dN/dt = kN is:",
      "B",
      [
        "$N = N_0 + kt$",
        "$N = N_0 e^{kt}$",
        "$N = e^{kt}$",
        "$N = N_0 k t$",
      ],
      "Separating variables and integrating gives $N = N_0 e^{kt}$."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-g2",
      "500 bacteria double every 3 hours. Find the count after 9 hours.",
      "",
      "4000",
      ["4000 \\text{ bacteria}"],
      "N(9) = 500 \\times 2^{9/3} = 500 \\times 2^3 = 500 \\times 8 = 4000."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-g3",
      "100 g decays to 25 g in 10 years. Find the half-life in years.",
      "",
      "5",
      ["5 \\text{ years}"],
      "e^{10k} = 1/4 \\Rightarrow k = -\\ln 2/5. Half-life = \\ln 2 / (\\ln 2/5) = 5\\text{ years}."
    ),
    calcappChoice(
      "y12e1-calcapp-expgd-g4",
      "In T(t) = S + Ae^{kt}, what does S represent?",
      "B",
      [
        "The initial temperature of the object",
        "The ambient (surrounding) temperature",
        "The cooling constant",
        "The amplitude of temperature change",
      ],
      "$S$ is the temperature the object approaches as $t \\to \\infty$; it is the surrounding temperature."
    ),
  ],
  independentPractice: [
    calcappTyped(
      "y12e1-calcapp-expgd-i1",
      "200 bacteria triple every 4 hours. Find the count after 12 hours.",
      "",
      "5400",
      ["5400 \\text{ bacteria}"],
      "N(12) = 200 \\times 3^{12/4} = 200 \\times 3^3 = 200 \\times 27 = 5400."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-i2",
      "80 g decays to 10 g in 6 years. Find the half-life in years.",
      "",
      "2",
      ["2 \\text{ years}"],
      "e^{6k} = 1/8 \\Rightarrow k = -\\ln 2/2. Half-life = \\ln 2/(\\ln 2/2) = 2\\text{ years}."
    ),
    calcappChoice(
      "y12e1-calcapp-expgd-i3",
      "N = 300e^{0.1t}. What is N(10)?",
      "A",
      ["$300e$", "$600$", "$300$", "$3000$"],
      "N(10) = 300 e^{0.1 \\times 10} = 300 e^1 = 300e."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-i4",
      "An object at 70°C cools in a room at 10°C. After 3 min its temperature is 40°C. Find the temperature after 6 min.",
      "",
      "25",
      ["25^\\circ\\text{C}"],
      "40 = 10 + 60 e^{3k} \\Rightarrow e^{3k} = 1/2. T(6) = 10 + 60(e^{3k})^2 = 10 + 60/4 = 25^\\circ\\text{C}."
    ),
    calcappChoice(
      "y12e1-calcapp-expgd-i5",
      "In dN/dt = kN, a value k > 0 corresponds to:",
      "C",
      [
        "Decay",
        "Constant population",
        "Growth",
        "Periodic oscillation",
      ],
      "k > 0 means N grows without bound; k < 0 means N decays toward zero."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using N = N_0 + kt (linear model) instead of N = N_0 e^{kt} (exponential).",
      fix: "The differential equation dN/dt = kN implies multiplicative growth, not additive; the solution is exponential.",
    },
    {
      mistake: "Confusing the initial temperature T_0 with the ambient temperature S in Newton's Law of Cooling.",
      fix: "S is the room (ambient) temperature. A = T_0 - S is the initial temperature difference.",
    },
    {
      mistake: "Forgetting that k is negative for a cooling or decaying process.",
      fix: "If the quantity decreases over time, k < 0. Check by substituting a known data point.",
    },
    {
      mistake: "Solving for k without taking logarithms; multiplying or dividing instead.",
      fix: "To isolate k from e^{kt} = c, take the natural log of both sides: kt = ln c, so k = ln c / t.",
    },
  ],
  masteryQuiz: [
    calcappChoice(
      "y12e1-calcapp-expgd-m1",
      "Which differential equation describes exponential growth?",
      "B",
      [
        "$dN/dt = k$",
        "$dN/dt = kN$",
        "$dN/dt = kN^2$",
        "$dN/dt = k/N$",
      ],
      "Only $dN/dt = kN$ gives a solution proportional to $e^{kt}$."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-m2",
      "1000 bacteria triple every 2 hours. Find the count after 4 hours.",
      "",
      "9000",
      ["9000 \\text{ bacteria}"],
      "N(4) = 1000 \\times 3^{4/2} = 1000 \\times 9 = 9000."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-m3",
      "160 g decays to 20 g in 12 years. Find the half-life in years.",
      "",
      "4",
      ["4 \\text{ years}"],
      "e^{12k} = 1/8 \\Rightarrow k = -\\ln 2/4. Half-life = \\ln 2/(\\ln 2/4) = 4\\text{ years}."
    ),
    calcappChoice(
      "y12e1-calcapp-expgd-m4",
      "N_0 = 500, k = (ln 2)/3. What is N(6)?",
      "B",
      ["$1000$", "$2000$", "$4000$", "$500$"],
      "N(6) = 500 e^{(\\ln 2/3) \\cdot 6} = 500 e^{2\\ln 2} = 500 \\times 4 = 2000."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-m5",
      "An object at 90°C cools in a room at 30°C. After 4 min its temperature is 60°C. Find the temperature after 8 min.",
      "",
      "45",
      ["45^\\circ\\text{C}"],
      "60 = 30 + 60e^{4k} \\Rightarrow e^{4k} = 1/2. T(8) = 30 + 60(1/2)^2 = 30 + 15 = 45^\\circ\\text{C}."
    ),
    calcappChoice(
      "y12e1-calcapp-expgd-m6",
      "In N = N_0 e^{kt}, k = -0.2 means:",
      "B",
      [
        "Growth at 20% per unit time",
        "Decay at rate 0.2 per unit time",
        "No change",
        "Periodic variation",
      ],
      "A negative k means the exponent decreases with time, so N decays toward zero."
    ),
    calcappChoice(
      "y12e1-calcapp-expgd-m7",
      "The half-life of a substance measures:",
      "B",
      [
        "Time for the amount to double",
        "Time for the amount to halve",
        "The initial amount",
        "The rate constant k",
      ],
      "Half-life t_{1/2} satisfies N(t_{1/2}) = N_0/2, giving t_{1/2} = \\ln 2/|k|."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-m8",
      "Find N when t = 2 given N = 400 e^{-0.5t}.",
      "N = 400\\,e^{-0.5t},\\quad t=2",
      "400/e",
      ["400\\,e^{-1}", "400/e"],
      "N(2) = 400 e^{-1} = 400/e."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-m9",
      "Find t when N = 1600 given N = 200 \\cdot 2^t.",
      "",
      "3",
      ["t=3"],
      "2^t = 8 \\Rightarrow t = 3\\text{ hours}."
    ),
    calcappTyped(
      "y12e1-calcapp-expgd-m10",
      "A population doubles from 250 to 500 in 5 years. Find the growth rate k.",
      "",
      "\\frac{\\ln 2}{5}",
      ["\\ln(2)/5", "\\tfrac{\\ln 2}{5}"],
      "k = (1/5)\\ln 2 = \\ln 2/5."
    ),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-growth-pool-d5-1",
      prompt:
        "A population is modelled by P = 200 e^(0.5t). State the initial population (t = 0).",
      latex: "P = 200 e^{0.5t}",
      answer: "200",
      acceptedAnswers: ["P=200"],
      hint: "Substitute t = 0; e^0 = 1.",
      explanation: "At t = 0, P = 200 e^0 = 200.",
      difficulty: 5,
    },
    {
      id: "y12e1-growth-pool-d5-2",
      prompt:
        "A radioactive substance has a half-life of 4 years and decays as A = A₀ e^(−kt). Find the exact value of k.",
      latex: "A = A_0 e^{-kt}",
      answer: "(ln 2)/4",
      acceptedAnswers: ["ln2/4", "0.25 ln 2", "\\frac{\\ln 2}{4}"],
      hint: "Half-life means A = A₀/2 when t = 4.",
      explanation:
        "A₀/2 = A₀ e^(−4k) ⟹ e^(−4k) = 1/2 ⟹ 4k = ln 2 ⟹ k = (ln 2)/4.",
      difficulty: 5,
    },
    {
      id: "y12e1-growth-pool-d5-3",
      prompt:
        "An object cools according to T = 20 + 30 e^(−2t). Find the temperature it approaches as t → ∞.",
      latex: "T = 20 + 30 e^{-2t}",
      answer: "20",
      acceptedAnswers: ["20°C", "20 degrees"],
      hint: "As t → ∞, e^(−2t) → 0.",
      explanation: "e^(−2t) → 0, so T → 20.",
      difficulty: 5,
    },
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson 3: Simple Harmonic Motion Introduction ───────────────────────────

const simpleHarmonicMotion: Partial<ExplicitLesson> = {
  description:
    "Analyse the displacement, velocity, and acceleration of a particle in simple harmonic motion using x = a sin(nt + α), identifying amplitude, period, and maximum speed.",
  learningIntention:
    "Identify amplitude, period, and frequency from a SHM displacement equation and derive velocity and acceleration by differentiation.",
  successCriteria: [
    "State the amplitude a and frequency n from x = a sin(nt + α) or x = a cos(nt + α).",
    "Derive velocity by differentiating displacement: v = dx/dt.",
    "Derive acceleration by differentiating velocity: ẍ = d²x/dt².",
    "Verify that ẍ = -n²x (the defining property of SHM).",
    "State the maximum speed as |v|_max = an.",
  ],
  teaching: {
    paragraphs: [
      "Simple harmonic motion (SHM) describes oscillation about a central position. The displacement is x = a sin(nt + α) or x = a cos(nt + α), where a is the amplitude, n is the angular frequency and α is the phase.",
      "Differentiating displacement gives velocity: if x = a sin(nt + α) then v = an cos(nt + α). Differentiating again gives acceleration: ẍ = -an² sin(nt + α). Because x = a sin(nt + α), this simplifies to ẍ = -n²x.",
      "The defining property of SHM is ẍ = -n²x: acceleration is proportional to displacement and directed toward the centre. Any equation of this form describes SHM with angular frequency n.",
      "Key features: amplitude $a$ (maximum displacement from centre), period $T = 2\\pi/n$, maximum speed $|v|_{max} = an$ (reached when the particle passes through the centre where $x = 0$).",
    ],
    latexBlocks: [
      "x = a\\sin(nt+\\alpha),\\quad v = an\\cos(nt+\\alpha),\\quad \\ddot x = -an^2\\sin(nt+\\alpha) = -n^2 x",
      "\\text{Amplitude }= a,\\quad \\text{Period }= \\frac{2\\pi}{n},\\quad |v|_{\\max} = an",
      "\\text{SHM condition: }\\ddot x = -n^2 x",
    ],
  },
  workedExamples: [
    {
      title: "Amplitude, period and maximum speed",
      questionLatex: "x = 4\\sin(3t + \\pi/6)",
      steps: [
        {
          explanation: "Read off the amplitude and angular frequency.",
          latex: "a = 4,\\quad n = 3",
        },
        {
          explanation: "Calculate the period.",
          latex: "T = \\frac{2\\pi}{3}\\text{ s}",
        },
        {
          explanation: "Differentiate to find velocity.",
          latex: "v = 12\\cos(3t+\\pi/6)",
        },
        {
          explanation: "Maximum speed occurs when the cosine equals 1.",
          latex: "|v|_{\\max} = an = 12\\text{ m/s}",
        },
      ],
      finalAnswerLatex: "\\text{Amplitude }4,\\text{ period }\\tfrac{2\\pi}{3},\\text{ max speed }12",
    },
    {
      title: "Initial position and maximum speed for cosine motion",
      questionLatex: "x = 2\\cos(\\pi t)",
      steps: [
        {
          explanation: "Position at t = 0.",
          latex: "x(0) = 2\\cos 0 = 2\\text{ m}",
        },
        {
          explanation: "Differentiate to find velocity.",
          latex: "v = -2\\pi\\sin(\\pi t)",
        },
        {
          explanation: "Maximum speed.",
          latex: "|v|_{\\max} = 2\\pi\\text{ m/s}",
        },
      ],
      finalAnswerLatex: "x(0)=2,\\quad |v|_{\\max}=2\\pi",
    },
    {
      title: "Verifying the SHM property",
      questionLatex: "x = 3\\sin(2t)",
      steps: [
        {
          explanation: "Find the velocity and acceleration by differentiating.",
          latex: "v = 6\\cos(2t),\\quad \\ddot x = -12\\sin(2t)",
        },
        {
          explanation: "Express the acceleration in terms of x.",
          latex: "\\ddot x = -12\\sin(2t) = -4 \\cdot 3\\sin(2t) = -4x = -n^2 x\\quad(n=2)",
        },
        {
          explanation: "Period.",
          latex: "T = \\frac{2\\pi}{2} = \\pi\\text{ s}",
        },
      ],
      finalAnswerLatex: "\\ddot x = -4x\\text{ confirming SHM with }n=2",
    },
  ],
  guidedPractice: [
    calcappChoice(
      "y12e1-calcapp-shm-g1",
      "For x = 5 sin(4t), what is the amplitude?",
      "B",
      ["$4$", "$5$", "$20$", "$5/4$"],
      "The amplitude is the coefficient of the sine function: a = 5."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-g2",
      "For x = 3 sin(2t + π/3), find the period.",
      "",
      "\\pi",
      ["\\pi \\text{ s}"],
      "Period = 2\\pi/2 = \\pi\\text{ s}."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-g3",
      "For x = 4 cos(3t), find the maximum speed.",
      "",
      "12",
      ["12 \\text{ m/s}"],
      "|v|_{max} = an = 4 \\times 3 = 12\\text{ m/s}."
    ),
    calcappChoice(
      "y12e1-calcapp-shm-g4",
      "For x = a sin(nt), the acceleration is:",
      "C",
      [
        "$-na\\sin(nt)$",
        "$an\\cos(nt)$",
        "$-n^2 x$",
        "$n^2 x$",
      ],
      "$\\ddot x = -an^2\\sin(nt) = -n^2 x$. The acceleration is proportional to and opposite to displacement."
    ),
  ],
  independentPractice: [
    calcappTyped(
      "y12e1-calcapp-shm-i1",
      "For $x = 6\\sin(\\pi t/2)$, find the period.",
      "",
      "4",
      ["4 \\text{ s}"],
      "Period = 2\\pi/(\\pi/2) = 4\\text{ s}."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-i2",
      "For x = 5 sin(3t), find the maximum speed.",
      "",
      "15",
      ["15 \\text{ m/s}"],
      "|v|_{max} = 5 \\times 3 = 15\\text{ m/s}."
    ),
    calcappChoice(
      "y12e1-calcapp-shm-i3",
      "For x = 2 cos(4t), the velocity is:",
      "A",
      [
        "$-8\\sin(4t)$",
        "$8\\sin(4t)$",
        "$8\\cos(4t)$",
        "$-2\\sin(4t)$",
      ],
      "v = dx/dt = -2 \\times 4 \\sin(4t) = -8\\sin(4t)."
    ),
    calcappChoice(
      "y12e1-calcapp-shm-i4",
      "Which equation is the defining condition for SHM?",
      "A",
      [
        "$\\ddot x = -n^2 x$",
        "$\\ddot x = nx$",
        "$\\ddot x = -nx$",
        "$\\ddot x = n^2 x$",
      ],
      "SHM requires \\ddot x = -n^2 x: acceleration is proportional to and opposite to displacement."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-i5",
      "For x = 3 sin(2t), find the acceleration when t = π/4.",
      "",
      "-12",
      ["-12 \\text{ m/s}^2"],
      "\\ddot x = -12\\sin(2 \\times \\pi/4) = -12\\sin(\\pi/2) = -12\\text{ m/s}^2."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing the amplitude a with the angular frequency n in x = a sin(nt).",
      fix: "The amplitude is the coefficient in front of sine or cosine; n is the coefficient of t inside the function.",
    },
    {
      mistake: "Forgetting to multiply by n when differentiating x = a sin(nt).",
      fix: "The chain rule gives v = an cos(nt); missing the n factor is the most common error.",
    },
    {
      mistake: "Stating the period as n or 2π·n instead of 2π/n.",
      fix: "Period = 2π/n; larger n means faster oscillation and shorter period.",
    },
    {
      mistake: "Claiming the maximum speed equals the amplitude a.",
      fix: "Maximum speed is an (amplitude times angular frequency), not a alone.",
    },
  ],
  masteryQuiz: [
    calcappChoice(
      "y12e1-calcapp-shm-m1",
      "For x = 7 sin(5t), the amplitude is:",
      "B",
      ["$5$", "$7$", "$35$", "$7/5$"],
      "The amplitude is the coefficient a = 7."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-m2",
      "For x = 3 sin(4t), find the maximum velocity.",
      "",
      "12",
      ["12 \\text{ m/s}"],
      "|v|_{max} = 3 \\times 4 = 12\\text{ m/s}."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-m3",
      "For $x = 2\\cos(\\pi t)$, find the period.",
      "",
      "2",
      ["2 \\text{ s}"],
      "Period = 2\\pi/\\pi = 2\\text{ s}."
    ),
    calcappChoice(
      "y12e1-calcapp-shm-m4",
      "For x = 6 sin(2t), the acceleration is:",
      "B",
      [
        "$12\\cos(2t)$",
        "$-24\\sin(2t)$",
        "$-24\\cos(2t)$",
        "$12\\sin(2t)$",
      ],
      "v = 12\\cos(2t),\\quad \\ddot x = -24\\sin(2t) = -4 \\times 6\\sin(2t) = -4x."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-m5",
      "For x = 4 sin(3t + π/6), what is the amplitude?",
      "x = 4\\sin(3t+\\pi/6)",
      "4",
      ["4 \\text{ m}"],
      "The amplitude is the coefficient a = 4."
    ),
    calcappChoice(
      "y12e1-calcapp-shm-m6",
      "For x = a sin(nt), the period is:",
      "B",
      [
        "$2\\pi n$",
        "$2\\pi/n$",
        "$n/(2\\pi)$",
        "$a/n$",
      ],
      "Period T = 2\\pi/n; a larger n gives a shorter period."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-m7",
      "For x = 5 sin(2t), find the acceleration when x = 3.",
      "",
      "-12",
      ["-12 \\text{ m/s}^2"],
      "\\ddot x = -n^2 x = -4 \\times 3 = -12\\text{ m/s}^2."
    ),
    calcappChoice(
      "y12e1-calcapp-shm-m8",
      "The maximum speed of x = 3 cos(4t) is:",
      "C",
      ["$4$ m/s", "$3$ m/s", "$12$ m/s", "$7$ m/s"],
      "|v|_{max} = an = 3 \\times 4 = 12\\text{ m/s}."
    ),
    calcappChoice(
      "y12e1-calcapp-shm-m9",
      "Which condition is necessary for SHM?",
      "B",
      [
        "$\\dot x = -n^2 x$",
        "$\\ddot x = -n^2 x$",
        "$\\ddot x = n^2 x$",
        "$x$ is always positive",
      ],
      "SHM is defined by \\ddot x = -n^2 x; any displacement equation satisfying this is SHM."
    ),
    calcappTyped(
      "y12e1-calcapp-shm-m10",
      "For $x = 8\\sin(\\pi t/4)$, find the maximum speed.",
      "",
      "2\\pi",
      ["2\\pi \\text{ m/s}"],
      "|v|_{max} = 8 \\times \\pi/4 = 2\\pi\\text{ m/s}."
    ),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-shm-pool-d5-1",
      prompt:
        "A particle moves in simple harmonic motion with x = 5 cos(3t). Find its maximum speed.",
      latex: "x = 5\\cos(3t)",
      answer: "15",
      acceptedAnswers: ["15 units/s"],
      hint: "Maximum speed of x = a cos(nt) is a·n.",
      explanation:
        "v = −15 sin(3t), so the maximum speed is |a·n| = 5 × 3 = 15.",
      difficulty: 5,
    },
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson 4: Calculus Applications Exam Practice ───────────────────────────

const calcAppsExamPractice: Partial<ExplicitLesson> = {
  description:
    "Practise mixed HSC-style Extension 1 questions on related rates, exponential growth/decay and simple harmonic motion, selecting the correct model and applying it accurately.",
  learningIntention:
    "Identify which calculus application model a problem requires and solve it with correct method and notation.",
  successCriteria: [
    "Recognise whether a problem involves related rates, exponential growth/decay, or SHM.",
    "Set up the correct equation or model for the given context.",
    "Differentiate or evaluate the model to answer the question.",
    "State the answer with correct units and sign.",
  ],
  teaching: {
    paragraphs: [
      "HSC Extension 1 calculus application questions test three models: related rates (chain rule connecting two changing quantities), exponential growth/decay ($N = N_0 e^{kt}$ from $dN/dt = kN$), and simple harmonic motion (ẍ = -n²x).",
      "Reading the problem carefully and identifying which model applies is the most important first step. Keywords: 'rate of change of volume' → related rates; 'doubles every', 'decays to', 'cools to' → exponential model; 'oscillates', 'displacement' → SHM.",
      "For related rates: write the geometric equation, differentiate with respect to t, substitute last.",
      "For exponential models: write $N = N_0 e^{kt}$, find $k$ from a data point, then evaluate or solve for time.",
    ],
    latexBlocks: [
      "\\text{Related rates: }\\frac{dV}{dt} = f'(r)\\,\\frac{dr}{dt}",
      "\\text{Exponential: }N = N_0 e^{kt},\\; k = \\tfrac{1}{t}\\ln\\!\\left(\\tfrac{N}{N_0}\\right)",
      "\\text{SHM: }\\ddot x = -n^2 x,\\; |v|_{\\max} = an,\\; T = \\tfrac{2\\pi}{n}",
    ],
  },
  workedExamples: [
    {
      title: "Related rates — water rising in a conical tank",
      questionLatex:
        "\\text{Water fills a conical tank with height }h\\text{ m and radius }r = h/2\\text{ m at }\\pi\\text{ m}^3/\\text{min. Find }dh/dt\\text{ when }h = 2\\text{ m.}",
      steps: [
        {
          explanation: "Express V in terms of h alone using r = h/2.",
          latex: "V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi \\tfrac{h^2}{4} h = \\tfrac{\\pi h^3}{12}",
        },
        {
          explanation: "Differentiate with respect to t.",
          latex: "\\frac{dV}{dt} = \\frac{\\pi h^2}{4}\\,\\frac{dh}{dt}",
        },
        {
          explanation: "Substitute $dV/dt = \\pi$ and h = 2.",
          latex: "\\pi = \\frac{\\pi(4)}{4}\\,\\frac{dh}{dt} = \\pi\\,\\frac{dh}{dt} \\;\\Rightarrow\\; dh/dt = 1\\text{ m/min}",
        },
      ],
      finalAnswerLatex: "dh/dt = 1\\text{ m/min}",
    },
    {
      title: "Exponential growth — doubling population",
      questionLatex:
        "N = 1000\\,e^{kt}\\text{ and }N(5) = 2000.\\text{ Find }N(10).",
      steps: [
        {
          explanation: "Find k from the given data point.",
          latex: "2000 = 1000\\,e^{5k} \\;\\Rightarrow\\; e^{5k} = 2",
        },
        {
          explanation: "Evaluate N(10) using $(e^{5k})^2 = 4$.",
          latex: "N(10) = 1000\\,e^{10k} = 1000 \\times (e^{5k})^2 = 1000 \\times 4 = 4000",
        },
      ],
      finalAnswerLatex: "4000",
    },
    {
      title: "SHM — finding motion from initial conditions",
      questionLatex:
        "\\text{A particle satisfies }\\ddot x = -16x.\\text{ Initially }x=0\\text{ and }\\dot x = 12.\\text{ Write the displacement equation.}",
      steps: [
        {
          explanation: "SHM with n² = 16, so n = 4. Write x = A sin(4t + α).",
          latex: "n = 4,\\quad x = A\\sin(4t+\\alpha)",
        },
        {
          explanation: "At t = 0, x = 0: A sin α = 0, so α = 0.",
          latex: "\\alpha = 0 \\;\\Rightarrow\\; x = A\\sin(4t)",
        },
        {
          explanation: "At t = 0, ẋ = 12: 4A = 12, so A = 3.",
          latex: "v = 4A\\cos(4t) \\;\\Rightarrow\\; 4A = 12 \\;\\Rightarrow\\; A = 3",
        },
      ],
      finalAnswerLatex: "x = 3\\sin(4t)",
    },
  ],
  guidedPractice: [
    calcappChoice(
      "y12e1-calcapp-exam-g1",
      "V = 2h² + 3h. When h = 2, dV/dh equals:",
      "A",
      ["$11$", "$7$", "$8$", "$14$"],
      "dV/dh = 4h + 3. At h = 2: 4(2) + 3 = 11."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-g2",
      "A particle in SHM has ẍ = -9x and maximum speed 6 m/s. Find the amplitude.",
      "",
      "2",
      ["2 \\text{ m}"],
      "n = 3, so an = 6 \\Rightarrow a = 6/3 = 2\\text{ m}."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-g3",
      "Which model describes Newton's Law of Cooling?",
      "B",
      [
        "$N = N_0 + kt$",
        "$T = S + Ae^{kt}$",
        "$x = a\\sin(nt)$",
        "$V = V_0 e^{kt}$",
      ],
      "Newton's Law of Cooling gives $T = S + Ae^{kt}$ where $S$ is the ambient temperature."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-g4",
      "A population grows as $N = 600 e^{0.1t}$. Find $dN/dt$ when $t = 0$.",
      "",
      "60",
      ["60 \\text{ per unit time}"],
      "dN/dt = 60 e^{0} = 60."
    ),
  ],
  independentPractice: [
    calcappTyped(
      "y12e1-calcapp-exam-i1",
      "Water fills a tank with V = (1/3)\\pi h³ m³ at dV/dt = 9\\pi m³/s. Find dh/dt when h = 3 m.",
      "",
      "1",
      ["1 \\text{ m/s}"],
      "9\\pi = \\pi(9)(dh/dt) \\Rightarrow dh/dt = 1\\text{ m/s}."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-i2",
      "N = 1000 e^{kt} with N(5) = 2000. Find N(10).",
      "",
      "4000",
      ["4000"],
      "N(10) = 1000 \\times 4 = 4000."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-i3",
      "For x = 5 sin(2t), the maximum acceleration has magnitude:",
      "B",
      ["$10$", "$20$", "$25$", "$5$"],
      "|\\ddot x|_{max} = n^2 a = 4 \\times 5 = 20\\text{ m/s}^2."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-i4",
      "A circular plate expands with dr/dt = 0.3 cm/s. When r = 4 cm, dA/dt equals:",
      "A",
      [
        "$2.4\\pi$ cm²/s",
        "$4.8\\pi$ cm²/s",
        "$1.2\\pi$ cm²/s",
        "$0.6\\pi$ cm²/s",
      ],
      "dA/dt = 2\\pi r \\cdot dr/dt = 2\\pi(4)(0.3) = 2.4\\pi\\text{ cm}^2/\\text{s}."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-i5",
      "Which quantity is constant throughout the motion in SHM?",
      "C",
      ["Velocity", "Acceleration", "Amplitude", "Displacement"],
      "The amplitude a is constant; velocity and acceleration both vary with time and position."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the SHM formula for an exponential growth problem, or vice versa.",
      fix: "Check keywords: 'doubles/decays' → exponential model; 'oscillates/displacement' → SHM; 'two changing quantities linked geometrically' → related rates.",
    },
    {
      mistake: "In SHM, quoting maximum speed as a rather than an.",
      fix: "Maximum speed is an; the factor n comes from differentiating the displacement with the chain rule.",
    },
    {
      mistake: "In exponential decay problems, using a positive k when the quantity decreases.",
      fix: "If the quantity shrinks over time, k must be negative. Verify by checking that e^{kt} < 1 for t > 0.",
    },
    {
      mistake: "In related rates, substituting a constant value for r or h before differentiating.",
      fix: "Differentiate the full equation first, then substitute numerical values at the instant of interest.",
    },
  ],
  masteryQuiz: [
    calcappChoice(
      "y12e1-calcapp-exam-m1",
      "For a sphere V = (4/3)\\pi r³, dV/dt equals:",
      "B",
      [
        "$4\\pi r\\,dr/dt$",
        "$4\\pi r^2\\,dr/dt$",
        "$(4/3)r^2\\,dr/dt$",
        "$\\pi r^2\\,dr/dt$",
      ],
      "Chain rule: dV/dt = 4\\pi r^2 \\cdot dr/dt."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-m2",
      "N = 300 e^{-0.2t}. Find N when t = 5.",
      "",
      "300/e",
      ["300\\,e^{-1}", "300/e"],
      "N(5) = 300 e^{-0.2 \\times 5} = 300 e^{-1} = 300/e."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-m3",
      "For x = 6 sin(3t), find the maximum acceleration.",
      "",
      "54",
      ["54 \\text{ m/s}^2"],
      "|\\ddot x|_{max} = 9 \\times 6 = 54\\text{ m/s}^2."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-m4",
      "Newton's Law of Cooling satisfies:",
      "C",
      [
        "$dT/dt = k$",
        "$dT/dt = kT$",
        "$dT/dt = k(T-S)$",
        "$dT/dt = kT^2$",
      ],
      "The rate of cooling is proportional to the temperature difference between the object and surroundings."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-m5",
      "On x² + y² = 169, when x = 5, y = 12 and dx/dt = 3, find dy/dt.",
      "",
      "-5/4",
      ["-1.25", "-\\tfrac{5}{4}"],
      "30 + 24(dy/dt) = 0 \\Rightarrow dy/dt = -30/24 = -5/4."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-m6",
      "For x = 4 cos(5t), the speed at t = 0 is:",
      "A",
      ["$0$ m/s", "$20$ m/s", "$4$ m/s", "$5$ m/s"],
      "$v = -20\\sin(5t)$. At $t = 0$: $v = 0$, so the particle is momentarily at rest at the extreme position."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-m7",
      "100 mg decays to 50 mg in 3 years. Find k.",
      "",
      "-\\frac{\\ln 2}{3}",
      ["-\\ln(2)/3", "-\\tfrac{\\ln 2}{3}"],
      "k = \\ln(0.5)/3 = -\\ln 2/3."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-m8",
      "In a related rates problem, when should numerical values be substituted?",
      "B",
      [
        "Before differentiating",
        "After differentiating",
        "At the start of the problem",
        "Never",
      ],
      "Substituting before differentiating removes the variable and its rate, giving the wrong answer."
    ),
    calcappTyped(
      "y12e1-calcapp-exam-m9",
      "For x = 2 sin(6t), find the period.",
      "",
      "\\pi/3",
      ["\\tfrac{\\pi}{3} \\text{ s}"],
      "Period = 2\\pi/6 = \\pi/3\\text{ s}."
    ),
    calcappChoice(
      "y12e1-calcapp-exam-m10",
      "Which of these problems is best modelled by SHM?",
      "C",
      [
        "Coffee cooling to room temperature",
        "A population doubling every 5 years",
        "A mass on a spring oscillating about equilibrium",
        "Water filling a cylindrical tank",
      ],
      "SHM describes repeated oscillation about a fixed centre; the defining equation is \\ddot x = -n^2 x."
    ),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-calcapps-pool-d5-1",
      prompt: "Find the x-coordinate of the minimum of y = x² − 6x + 5.",
      latex: "y = x^2 - 6x + 5",
      answer: "3",
      acceptedAnswers: ["x=3"],
      hint: "The vertex of a parabola is at x = −b/(2a).",
      explanation: "x = −(−6)/(2·1) = 3.",
      difficulty: 5,
    },
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson builder ──────────────────────────────────────────────────────────

function calcAppsLesson(
  id: string,
  title: string,
  partial: Partial<ExplicitLesson>
): Partial<ExplicitLesson> {
  return {
    ...partial,
    id,
    slug: id,
    moduleSlug: "calculus-applications",
    moduleTitle: "Further Applications of Calculus",
    courseTitle: "Year 12 Mathematics Extension 1",
    syllabusArea: "Calculus",
    focus: "Further applications of calculus",
    status: "active",
    video: {
      title,
      url: "/videos/placeholder-lesson.mp4",
    },
    masteryPassMark: 0.8,
  };
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function year12Extension1CalculusApplicationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "calculus-applications") return undefined;

  switch (lesson.slug) {
    case "related-rates-of-change":
      return calcAppsLesson(
        "related-rates-of-change",
        "Related Rates of Change",
        relatedRates
      );
    case "newtons-law-cooling-growth-decay":
      return calcAppsLesson(
        "newtons-law-cooling-growth-decay",
        "Exponential Growth and Decay",
        exponentialGrowthDecay
      );
    case "simple-harmonic-motion-intro":
      return calcAppsLesson(
        "simple-harmonic-motion-intro",
        "Simple Harmonic Motion",
        simpleHarmonicMotion
      );
    case "calculus-applications-exam-practice":
      return calcAppsLesson(
        "calculus-applications-exam-practice",
        "Calculus Applications Exam Practice",
        calcAppsExamPractice
      );
    default:
      return undefined;
  }
}
