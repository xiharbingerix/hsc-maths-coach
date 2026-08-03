import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import {
  formatChoiceText,
  practicalChoice,
  formulaAnswer as baseFormulaAnswer,
} from "../questionHelpers";

type QualityTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

type QualityPracticeQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions?: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
};

function qualityAnswer({
  id,
  prompt,
  latex,
  answer,
  acceptedAnswers,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: string;
  acceptedAnswers: string[];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
  };
}

function qualityChoice({
  id,
  prompt,
  latex,
  answer,
  choices,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
  distractorMisconceptions,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: "A" | "B" | "C" | "D";
  choices: [string, string, string, string];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
    distractorMisconceptions,
  };
}

function exponentialLogarithmicFeedback(prompt: string, answer: string) {
  if (prompt.includes("negative-index")) {
    return `A negative index means reciprocal, not a negative value. Rewrite the matching positive power underneath 1, which gives ${answer}.`;
  }
  if (prompt.includes("fractional-index")) {
    return `A fractional index connects powers with roots. An exponent of one half means square root, so the expression evaluates to ${answer}.`;
  }
  if (prompt.includes("Simplify") && prompt.includes("index")) {
    return `Use index laws only after checking that the bases match. Multiplication adds indices, division subtracts them, and a power of a power multiplies them; this simplifies to ${answer}.`;
  }
  if (prompt.includes("power expression")) {
    return `A power raised to another power repeats the multiplication pattern, so multiply the indices. The simplified expression is ${answer}.`;
  }
  if (prompt.includes("Evaluate the expression")) {
    return `A non-zero base raised to power zero equals 1. The exponent records repeated multiplication, and zero repetitions leave the multiplicative starting point ${answer}.`;
  }
  if (prompt.includes("logarithm by inspection") || prompt.includes("special logarithm")) {
    return `A logarithm asks: what exponent on this base produces the input? Rewrite the input as a familiar power of the base to see that the needed exponent is ${answer}.`;
  }
  if (prompt.includes("combined logarithm")) {
    return `Use the log laws to translate addition into multiplication and subtraction into division. Then read the remaining logarithm as an exponent question to get ${answer}.`;
  }
  if (prompt.includes("applying the product law") || prompt.includes("using a logarithm law")) {
    return `Combine the logarithms first: addition of logs represents multiplication inside one logarithm. Convert that single logarithm to exponential form and solve to get ${answer}.`;
  }
  if (prompt.includes("applying the quotient law")) {
    return `Combine the logarithms first: subtraction of logs represents division inside one logarithm. Convert the result to exponential form and solve to get ${answer}.`;
  }
  if (prompt.includes("logarithmic equation") || prompt.includes("converting from logarithmic form")) {
    return `A logarithm tells you the exponent needed. Convert log base a of an expression equals b into a^b equals that expression, then solve and check the log input stays positive; this gives ${answer}.`;
  }
  if (prompt.includes("matching bases") || prompt.includes("Solve by matching bases")) {
    return `Rewrite both sides using the same base. Once the bases match, the exponents must match too, so solving the exponent equation gives ${answer}.`;
  }
  if (prompt.includes("time needed")) {
    return `Exponential change repeats multiplication each period. Compare the target with the starting value, then count how many growth-factor multiplications are needed; the time is ${answer}.`;
  }
  if (prompt.includes("half-lives") || prompt.includes("halves every")) {
    return `Each half-life multiplies the amount by one half. Apply that decay factor once for each elapsed half-life to get ${answer}.`;
  }
  if (prompt.includes("model") || prompt.includes("balance") || prompt.includes("population") || prompt.includes("amount after")) {
    return `An exponential model starts with an initial value and multiplies by the same factor each period. Substitute the time and keep full precision until the final step to get ${answer}.`;
  }
  if (prompt.includes("exponential function")) {
    return `In an exponential function, the variable is in the exponent. Substitute the input as the exponent and evaluate the repeated multiplication to get ${answer}.`;
  }
  return `Identify whether the expression needs an index law, an inverse logarithm step, or an exponential model. Following that structure gives ${answer}.`;
}

// Returns safe numeric formatting equivalents: integer "7" → ["7.0"],
// "-3" → ["-3.0"], "0" → ["0.0"], decimal "7.5" → ["7.50"].
// Returns [] for fractions, algebraic expressions, or unit strings.
function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^-?\d+$/.test(t)) return [`${t}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseFormulaAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]),
    explanation: exponentialLogarithmicFeedback(prompt, answer),
  };
}

export function year11AdvancedExponentialLogarithmicLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "exponential-logarithmic-functions"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "index-laws-exponential-functions") {
    const decayGraph: import("../types").CartesianGraph = {
      description:
        "Decreasing exponential curve y equals one third to the power x, passing through negative one comma three, zero comma one, and one comma one third, and approaching the horizontal asymptote y equals zero from above.",
      xMin: -2,
      xMax: 4,
      yMin: -1,
      yMax: 10,
      showGrid: true,
      showAxisLabels: true,
      curves: [
        {
          kind: "exponential",
          base: 1 / 3,
          label: "y=(1/3)^x",
        },
      ],
      points: [
        { x: -1, y: 3, label: "(-1,3)" },
        { x: 0, y: 1, label: "(0,1)" },
        { x: 1, y: 1 / 3, label: "(1,1/3)" },
      ],
    };
    return {
      ...base,
      description:
        "Use index laws to simplify expressions and connect exponential functions with growth, decay, intercepts, and asymptotes.",
      learningIntention:
        "Learn how index laws support exponential functions, including growth, decay, negative indices, fractional indices, and basic graph features.",
      successCriteria: [
        "Simplify products, quotients, and powers using index laws.",
        "Evaluate expressions with zero and negative indices.",
        "Rewrite simple fractional indices using radicals.",
        "Identify exponential growth and decay from the base.",
        "Find the y-intercept of a basic exponential function.",
        "Recognise the horizontal asymptote of a basic exponential function.",
      ],
      teaching: {
        paragraphs: [
          "An exponent records repeated multiplication. In $3^4$, the base 3 is the factor being repeated and the exponent 4 tells you how many copies to multiply.",
          "Index laws are bookkeeping rules for that repetition. With the same base, multiplying joins the repeated factors, dividing removes factors, and raising a power to a power repeats the repetition.",
          "A zero index gives 1 for any non-zero base because all matching factors have cancelled. A negative index means the factors belong in the denominator, so it creates a reciprocal rather than a negative value.",
          "Fractional indices connect powers and roots. An exponent of one half asks for a square root because squaring that result returns the original value.",
          "An exponential function has the variable in the exponent, so its output changes by repeated multiplication. A base above 1 gives growth; a base between 0 and 1 gives decay.",
          "For a basic exponential graph, the y-intercept occurs at x = 0 and the horizontal asymptote is usually the x-axis.",
        ],
        latexBlocks: [
          "a^m a^n=a^{m+n}",
          "\\frac{a^m}{a^n}=a^{m-n}",
          "(a^m)^n=a^{mn}",
          "a^0=1,\\quad a^{-n}=\\frac{1}{a^n}",
          "x^{\\frac{1}{2}}=\\sqrt{x},\\quad x^{\\frac{m}{n}}=\\sqrt[n]{x^m}",
          "y=a^x,\\quad a>0,\\quad a\\ne1",
        ],
      },
      workedExamples: [
        {
          title: "Simplify an index expression",
          questionLatex: "\\frac{x^5\\cdot x^3}{x^2}",
          steps: [
            { explanation: "Add indices when multiplying powers with the same base.", latex: "x^5\\cdot x^3=x^8" },
            { explanation: "Subtract indices when dividing powers with the same base.", latex: "\\frac{x^8}{x^2}=x^6" },
          ],
          finalAnswerLatex: "x^6",
        },
        {
          title: "Evaluate a negative index",
          questionLatex: "2^{-3}",
          steps: [
            { explanation: "A negative index means take the reciprocal.", latex: "2^{-3}=\\frac{1}{2^3}" },
            { explanation: "Evaluate the positive power.", latex: "\\frac{1}{2^3}=\\frac{1}{8}" },
          ],
          finalAnswerLatex: "\\frac{1}{8}",
        },
        {
          title: "Rewrite a fractional index",
          questionLatex: "x^{\\frac{1}{2}}",
          steps: [
            { explanation: "An index of one half represents a square root.", latex: "x^{\\frac{1}{2}}=\\sqrt{x}" },
          ],
          finalAnswerLatex: "\\sqrt{x}",
        },
        {
          title: "Identify exponential graph features",
          questionLatex: "y=3^x",
          steps: [
            { explanation: "The base is greater than 1, so the graph shows growth.", latex: "3>1" },
            { explanation: "The y-intercept occurs when x is zero.", latex: "y=3^0=1" },
            { explanation: "The basic horizontal asymptote is the x-axis.", latex: "y=0" },
          ],
          finalAnswerLatex:
            "\\text{Growth, y-intercept }(0,1),\\text{ horizontal asymptote }y=0.",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-exp-index-g1", "Simplify the index expression.", "x^4\\cdot x^3", "x^7", ["x^(7)"]),
        formulaAnswer("y11adv-exp-index-g2", "Evaluate the negative-index expression.", "2^{-3}", "1/8", ["0.125"]),
        practicalChoice("y11adv-exp-index-g3", "Which radical form matches the fractional index?", "B", ["$x^2$", "$\\sqrt{x}$", "$\\frac{1}{x^2}$", "$2x$"], "An index of one half means the principal square root, because squaring that result returns x.", "x^{\\frac{1}{2}}"),
        practicalChoice("y11adv-exp-index-g4", "Which statement describes the displayed exponential function?", "A", ["Growth with y-intercept 1", "Decay with y-intercept 0", "Linear with gradient 2", "Growth with horizontal asymptote x = 0"], "The base is greater than 1 and any non-zero base to the power 0 is 1.", "y=2^x"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-exp-index-i1", "Simplify the index expression.", "\\frac{a^9}{a^4}", "a^5", ["a^(5)"]),
        formulaAnswer("y11adv-exp-index-i2", "Simplify the power expression.", "(x^3)^2", "x^6", ["x^(6)"]),
        formulaAnswer("y11adv-exp-index-i3", "Evaluate the expression.", "5^0", "1"),
        practicalChoice("y11adv-exp-index-i4", "Which description matches the displayed function?", "C", ["Growth with y-intercept 0", "Decay with horizontal asymptote x = 0", "Decay with y-intercept 1", "Linear decay"], "A base between 0 and 1 gives decay, and y = 1 when x = 0.", "y=\\left(\\frac{1}{3}\\right)^x"),
        formulaAnswer("y11adv-exp-index-i5", "Evaluate the exponential function at the given input.", "f(x)=4^x,\\quad x=\\frac{3}{2}", "8"),
      ],
      commonMistakes: [
        { mistake: "Multiplying indices when multiplying powers.", fix: "For the same base, multiply powers by adding the indices." },
        { mistake: "Treating a negative index as a negative number.", fix: "A negative index creates a reciprocal, not a negative value." },
        { mistake: "Forgetting that any non-zero base to power zero is 1.", fix: "Use $a^0=1$ for $a\\ne0$." },
        { mistake: "Calling all exponential functions growth.", fix: "Bases greater than 1 give growth; bases between 0 and 1 give decay." },
      ],
      masteryQuiz: [
        qualityAnswer({
          id: "y11adv-exp-index-qm1",
          prompt:
            "Simplify the expression to a single power of $x$, assuming $x\\ne0$.",
          latex: "\\frac{x^{-2}\\cdot x^5}{x}",
          answer: "x^2",
          acceptedAnswers: ["x²", "x^(2)", "x^2.0"],
          hint:
            "Add the numerator indices, then subtract the denominator index.",
          explanation:
            "For the same base, multiplication adds indices and division subtracts them. The resulting exponent is $-2+5-1=2$, so the expression simplifies to $x^2$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks coordinated use of negative, product, and quotient index laws in one symbolic expression.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-index-qm2",
          prompt:
            "A student writes $(x^2)^3=x^5$. Which diagnosis and correction are valid?",
          latex: "",
          answer: "B",
          choices: [
            "Add the indices because the powers are multiplied, giving $x^5$.",
            "Multiply the indices in a power of a power, giving $x^6$.",
            "Multiply the bases and keep the outer index, giving $3x^2$.",
            "Subtract the indices, giving $x^{-1}$.",
          ],
          hint:
            "A power of a power repeats the inner power the number of times stated outside.",
          explanation:
            "The expression means $x^2\\cdot x^2\\cdot x^2$, so the exponent is $2+2+2=6$. Equivalently, the power-of-a-power law multiplies the indices: $(x^2)^3=x^6$.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses confusion between product-of-powers and power-of-a-power laws.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Adds inner and outer indices instead of multiplying them.",
            C: "Treats the exponent as a coefficient and changes the base.",
            D: "Applies the quotient law despite there being no division.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-index-qm3",
          prompt:
            "Evaluate the fractional-index expression exactly.",
          latex: "27^{\\frac23}",
          answer: "9",
          acceptedAnswers: ["9.0", "nine", "3^2"],
          hint:
            "Take the cube root associated with the denominator, then square.",
          explanation:
            "The denominator 3 indicates a cube root and the numerator 2 indicates a square. Since $\\sqrt[3]{27}=3$, we obtain $27^{2/3}=3^2=9$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks interpretation of both numerator and denominator in a fractional index.",
          taskType: "procedural",
        }),
        {
          ...qualityChoice({
            id: "y11adv-exp-index-qm4",
            prompt:
              "Which description matches all three displayed graph features?",
            latex: "y=\\left(\\frac13\\right)^x",
            answer: "D",
            choices: [
              "Increasing, y-intercept 0, vertical asymptote $x=0$",
              "Decreasing, x-intercept 1, horizontal asymptote $y=1$",
              "Increasing, y-intercept 1, horizontal asymptote $y=0$",
              "Decreasing, y-intercept 1, horizontal asymptote $y=0$",
            ],
            hint:
              "Use the base to decide direction, substitute zero, and inspect the end behaviour.",
            explanation:
              "A base between 0 and 1 gives exponential decay, so the graph decreases. At $x=0$ the value is 1, and positive values approach but never reach the horizontal asymptote $y=0$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks coordinated interpretation of direction, intercept, and asymptote from an exponential graph.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Confuses a horizontal exponential asymptote with a vertical one and misreads the intercept.",
              B: "Treats a plotted point as an x-intercept and shifts the asymptote.",
              C: "Uses the correct intercept and asymptote but reverses decay to growth.",
            },
          }),
          cartesianGraph: decayGraph,
        },
        qualityAnswer({
          id: "y11adv-exp-index-qm5",
          prompt:
            "Find the integer $n$ that makes the identity true for all non-zero $x$.",
          latex: "\\frac{(x^n)^3}{x^4}=x^{11}",
          answer: "5",
          acceptedAnswers: ["n=5", "n = 5", "5.0"],
          hint:
            "Write the left side as $x^{3n-4}$, then equate exponents.",
          explanation:
            "The power-of-a-power and quotient laws give $x^{3n-4}=x^{11}$. Matching the exponents produces $3n-4=11$, so $3n=15$ and $n=5$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses routine simplification by requiring inference of an unknown index from an identity.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-exp-index-qm6",
          prompt:
            "Student A obtains $1/(4x^4)$; Student B obtains $x^4/4$. Enter the letter of the valid method.",
          latex: "(2x^{-2})^{-2}",
          answer: "B",
          acceptedAnswers: ["Student B", "student B", "b"],
          hint:
            "Apply the outer negative power to both the coefficient and the power of $x$.",
          explanation:
            "The coefficient becomes $2^{-2}=1/4$, while $(x^{-2})^{-2}=x^4$ because the indices multiply. Therefore the expression is $x^4/4$, so Student B is correct.",
          difficulty: 4,
          diagnosticIntent:
            "Compares two methods to reveal whether a negative outer index is distributed to every factor correctly.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-exp-index-qm7",
          prompt:
            "For the listed integer exponents, count how many values of $2^n$ are integers.",
          latex: "n\\in\\{-3,-2,-1,0,1,2,3\\}",
          answer: "4",
          acceptedAnswers: ["4 values", "four", "n=0,1,2,3", "4.0"],
          hint:
            "Negative exponents produce reciprocals; include the zero exponent.",
          explanation:
            "For $n=-3,-2,-1$, the values are proper fractions. For $n=0,1,2,3$, the values are $1,2,4,8$, all integers. Hence 4 listed exponents work.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a bounded exponent family and tests treatment of negative and zero indices.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-exp-index-qm8",
          prompt:
            "A positive base $a\\ne1$ satisfies the point condition. What is $a$?",
          latex: "y=a^x\\text{ passes through }(-2,16)",
          answer: "C",
          choices: ["$4$", "$\\frac12$", "$\\frac14$", "$-4$"],
          hint:
            "Substitute the point to obtain $a^{-2}=16$, then use the reciprocal meaning of a negative index.",
          explanation:
            "The point gives $a^{-2}=16$, so $1/a^2=16$ and $a^2=1/16$. Because an exponential base is positive, $a=1/4$.",
          difficulty: 5,
          diagnosticIntent:
            "Tests reverse inference of a decay base from a negative-input graph point.",
          taskType: "problem-solving",
          distractorMisconceptions: {
            A: "Ignores the negative input and solves $a^2=16$.",
            B: "Takes one reciprocal step but not the required square root.",
            D: "Allows a negative exponential base despite the stated condition.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-index-qm9",
          prompt:
            "Use index laws to solve the exponential equation without logarithms.",
          latex: "\\frac{(2^x)^3}{4^x}=32",
          answer: "5",
          acceptedAnswers: ["x=5", "x = 5", "5.0"],
          hint:
            "Rewrite every term with base 2 and simplify the exponent on the left.",
          explanation:
            "The numerator is $2^{3x}$ and $4^x=2^{2x}$, so the quotient is $2^{3x-2x}=2^x$. Since $32=2^5$, matching exponents gives $x=5$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises power, quotient, and matching-base reasoning in an uncued exponential equation.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-exp-index-qm10",
          prompt:
            "An exponential function has the form $f(x)=ca^x$ with $c>0$ and $a>0$. Use the two values to find $f(-1)$.",
          latex: "f(0)=3,\\qquad f(2)=12",
          answer: "3/2",
          acceptedAnswers: ["1.5", "\\frac32", "\\frac{3}{2}", "f(-1)=3/2"],
          hint:
            "Use $f(0)$ to find $c$, then use $f(2)$ to determine the positive base.",
          explanation:
            "Since $f(0)=c=3$, the second value gives $3a^2=12$, so $a^2=4$ and the positive base is $a=2$. Thus $f(-1)=3\\cdot2^{-1}=3/2$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises intercept information, reverse base inference, and a negative-index evaluation.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "logarithms-logarithm-laws") {
    return {
      ...base,
      description:
        "Interpret logarithms as inverse exponentials, convert forms, evaluate simple logs, and apply product, quotient, and power laws.",
      learningIntention:
        "Learn how logarithms reverse exponentials and how logarithm laws simplify products, quotients, and powers.",
      successCriteria: [
        "Convert between exponential and logarithmic form.",
        "Evaluate logarithms by inspection using powers.",
        "Use common logarithm and natural logarithm notation correctly.",
        "Apply product, quotient, and power logarithm laws.",
        "Use special values such as $\\log_a 1=0$ and $\\log_a a=1$.",
        "Recognise that logarithm inputs must be positive.",
      ],
      teaching: {
        paragraphs: [
          "A logarithm answers one question: what exponent do I need? For example, log base 2 of 8 is 3 because $2^3 = 8$.",
          "Exponentials and logarithms undo each other. Converting between the two forms is useful because one form often makes the hidden exponent easier to see.",
          "Log laws are index laws translated into logarithm language. Products become sums, quotients become differences, and powers move to the front as multipliers.",
          "There is no general law saying log(a + b) = log a + log b. Addition inside a logarithm does not represent repeated multiplication.",
          "The common logarithm uses base 10. The natural logarithm uses the special base e and is written ln.",
          "A logarithm input must be positive. Zero or negative inputs do not fit the exponent question for the real-valued logarithms used in this course.",
        ],
        latexBlocks: [
          "\\log_a x=y\\quad \\Longleftrightarrow \\quad a^y=x",
          "\\log_a(MN)=\\log_a M+\\log_a N",
          "\\log_a\\left(\\frac{M}{N}\\right)=\\log_a M-\\log_a N",
          "\\log_a(M^p)=p\\log_a M",
          "\\log_a 1=0,\\quad \\log_a a=1",
          "\\ln x=\\log_e x",
        ],
      },
      workedExamples: [
        {
          title: "Convert exponential form to logarithmic form",
          questionLatex: "2^5=32",
          steps: [
            { explanation: "The base stays the same.", latex: "2" },
            { explanation: "The exponent becomes the logarithm value.", latex: "5" },
            { explanation: "The result of the exponential becomes the logarithm input.", latex: "\\log_2 32=5" },
          ],
          finalAnswerLatex: "\\log_2 32=5",
        },
        {
          title: "Evaluate a logarithm by inspection",
          questionLatex: "\\log_3 81",
          steps: [
            { explanation: "Rewrite the input as a power of the base.", latex: "81=3^4" },
            { explanation: "The logarithm asks for the exponent.", latex: "\\log_3 81=4" },
          ],
          finalAnswerLatex: "4",
        },
        {
          title: "Use product and quotient laws",
          questionLatex: "\\log_2 8+\\log_2 4-\\log_2 2",
          steps: [
            { explanation: "Combine the sum as a product and the subtraction as a quotient.", latex: "\\log_2\\left(\\frac{8\\cdot4}{2}\\right)" },
            { explanation: "Simplify inside the logarithm.", latex: "\\log_2 16" },
            { explanation: "Evaluate by inspection.", latex: "\\log_2 16=4" },
          ],
          finalAnswerLatex: "4",
        },
        {
          title: "Use the power law",
          questionLatex: "\\log_5(x^3)",
          steps: [
            { explanation: "Move the power to the front as a multiplier.", latex: "\\log_5(x^3)=3\\log_5 x" },
          ],
          finalAnswerLatex: "3\\log_5 x",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-exp-log-g1", "Which logarithmic statement matches the displayed exponential statement?", "A", ["$\\log_2 32=5$", "$\\log_5 32=2$", "$\\log_{32}2=5$", "$\\log_2 5=32$"], "The base is 2, the result is 32, and the exponent is 5.", "2^5=32"),
        formulaAnswer("y11adv-exp-log-g2", "Evaluate the logarithm by inspection.", "\\log_4 64", "3"),
        practicalChoice("y11adv-exp-log-g3", "Which expression uses the product law correctly?", "C", ["$\\log_a(MN)=\\log_a M\\log_a N$", "$\\log_a(M+N)=\\log_a M+\\log_a N$", "$\\log_a(MN)=\\log_a M+\\log_a N$", "$\\log_a(MN)=M+N$"], "A product inside the logarithm becomes a sum of logarithms.", "\\log_a(MN)"),
        practicalChoice("y11adv-exp-log-g4", "Which input is allowed for a logarithm in this course?", "D", ["0", "-5", "-1", "7"], "Real logarithms require a strictly positive input, so 7 is allowed while zero and all three negative values are excluded.", "\\log_a(x)"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-exp-log-i1", "Evaluate the logarithm by inspection.", "\\log_2 128", "7"),
        practicalChoice("y11adv-exp-log-i2", "Which exponential statement matches the displayed logarithmic statement?", "B", ["$3^2=9$", "$3^4=81$", "$4^3=81$", "$81^4=3$"], "The base is 3, the logarithm value is 4, and the result is 81.", "\\log_3 81=4"),
        practicalChoice("y11adv-exp-log-i3", "Which expression is equivalent using the quotient law?", "A", ["$\\log_5 20-\\log_5 4$", "$\\log_5 20+\\log_5 4$", "$\\log_5 20\\log_5 4$", "$\\log_5(20-4)$"], "A quotient inside the logarithm becomes subtraction.", "\\log_5\\left(\\frac{20}{4}\\right)"),
        practicalChoice("y11adv-exp-log-i4", "Which expression uses the power law correctly?", "D", ["$\\log_2 x+4$", "$\\log_2(4x)$", "$(\\log_2 x)^4$", "$4\\log_2 x$"], "The power moves to the front as a multiplier.", "\\log_2(x^4)"),
        formulaAnswer("y11adv-exp-log-i5", "Evaluate the special logarithm value.", "\\log_7 1", "0"),
      ],
      commonMistakes: [
        { mistake: "Swapping the base and input when converting forms.", fix: "In $\\log_a x=y$, the matching exponential statement is $a^y=x$." },
        { mistake: "Using a log law on addition inside a logarithm.", fix: "Log laws apply to products, quotients, and powers, not general sums." },
        { mistake: "Forgetting that logarithm inputs must be positive.", fix: "Check that the input to the logarithm is greater than zero." },
        { mistake: "Treating $\\ln x$ as multiplication by n.", fix: "$\\ln x$ means logarithm base e." },
      ],
      masteryQuiz: [
        qualityAnswer({
          id: "y11adv-exp-log-qm1",
          prompt:
            "Evaluate the logarithm by rewriting its input as a power of the base.",
          latex: "\\log_3\\left(\\frac1{27}\\right)",
          answer: "-3",
          acceptedAnswers: ["-3.0", "negative three", "\\log_3(3^{-3})=-3"],
          hint:
            "Write one over twenty-seven as a negative power of 3.",
          explanation:
            "Since $27=3^3$, its reciprocal is $1/27=3^{-3}$. A logarithm asks for the exponent on the base, so $\\log_3(1/27)=-3$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks inverse exponential meaning with a reciprocal input and negative logarithm value.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-log-qm2",
          prompt:
            "A student writes $\\log_2(3+5)=\\log_2 3+\\log_2 5$. Which diagnosis is correct?",
          latex: "",
          answer: "D",
          choices: [
            "The rule is valid because logarithms distribute over every operation.",
            "The rule is valid only because both inputs are positive.",
            "The right side should use subtraction instead of addition.",
            "There is no logarithm law for a general sum; the product law applies to $\\log_2(3\\cdot5)$.",
          ],
          hint:
            "Recall which operation inside one logarithm becomes addition of two logarithms.",
          explanation:
            "The product law is $\\log_a(MN)=\\log_aM+\\log_aN$. It does not apply to $M+N$, so the student's split changes the value and is invalid.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses the common invention of a logarithm-of-a-sum law.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes logarithms distribute like multiplication over brackets.",
            B: "Confuses domain validity with algebraic equivalence.",
            C: "Substitutes the quotient law for an expression that is not a quotient.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-log-qm3",
          prompt:
            "Condense the expression to a single logarithm.",
          latex: "2\\log_2x-\\log_2y",
          answer: "log_2(x^2/y)",
          acceptedAnswers: [
            "\\log_2\\left(\\frac{x^2}{y}\\right)",
            "log2(x^2/y)",
            "log base 2 of x^2/y",
          ],
          hint:
            "Use the power law first, then turn subtraction into a quotient.",
          explanation:
            "The power law gives $2\\log_2x=\\log_2(x^2)$. Applying the quotient law then yields $\\log_2(x^2/y)$, for positive $x$ and $y$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks coordinated use of power and quotient laws while retaining input restrictions.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-log-qm4",
          prompt:
            "For which interval is the logarithm defined?",
          latex: "\\log_2\\big((x-1)(5-x)\\big)",
          answer: "B",
          choices: [
            "$x<1$ or $x>5$",
            "$1<x<5$",
            "$1\\le x\\le5$",
            "All real $x$ because the two factors may be negative",
          ],
          hint:
            "The entire product inside the logarithm must be strictly positive.",
          explanation:
            "The product $(x-1)(5-x)$ is positive only between its zeros 1 and 5. The endpoints make the input zero, so the domain is the open interval $1<x<5$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks compound logarithm-domain reasoning and strict exclusion of zero inputs.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses the sign pattern for $(x-1)(x-5)$ without noticing the reversed second factor.",
            C: "Allows zero as a logarithm input.",
            D: "Assumes possible negative factors make the product positive for every real input.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-log-qm5",
          prompt:
            "Find the valid positive base $b\\ne1$.",
          latex: "\\log_b\\left(\\frac1{16}\\right)=-2",
          answer: "4",
          acceptedAnswers: ["b=4", "b = 4", "4.0"],
          hint:
            "Convert to exponential form, then solve $b^{-2}=1/16$.",
          explanation:
            "The logarithmic statement is equivalent to $b^{-2}=1/16$. Thus $1/b^2=1/16$, so $b^2=16$. A logarithm base must be positive, hence $b=4$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses logarithm evaluation by requiring inference of an admissible base from a negative value.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-exp-log-qm6",
          prompt:
            "Evaluate the expression exactly by combining the logarithms before calculating.",
          latex: "\\log_2 12-\\log_2 3",
          answer: "2",
          acceptedAnswers: ["2.0", "two", "\\log_2 4"],
          hint:
            "Subtraction of same-base logarithms becomes one logarithm of a quotient.",
          explanation:
            "The quotient law gives $\\log_2(12/3)=\\log_2 4$. Since $2^2=4$, the exact value is 2; no decimal approximations are required.",
          difficulty: 4,
          diagnosticIntent:
            "Compares efficient exact combination with unnecessary separate decimal evaluation.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-exp-log-qm7",
          prompt:
            "For the listed integer values of $n$, count how many make the logarithm defined.",
          latex:
            "\\log_2\\big((n-1)(5-n)\\big),\\qquad -3\\le n\\le8",
          answer: "3",
          acceptedAnswers: ["3 values", "n=2,3,4", "three", "3.0"],
          hint:
            "Find the open real interval where the input is positive, then count integers inside it.",
          explanation:
            "The logarithm input is positive exactly when $1<n<5$. The integers in that open interval are $2,3,4$, so exactly 3 values from the stated range work.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a bounded integer family using a compound logarithm-domain condition.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-exp-log-qm8",
          prompt:
            "A student claims $(\\log_3x)^2=\\log_3(x^2)$. Which assessment is correct?",
          latex: "x>0",
          answer: "C",
          choices: [
            "The claim is the logarithm power law and is always valid.",
            "The claim is valid only when $x>1$.",
            "The power law gives $\\log_3(x^2)=2\\log_3x$, not the square of $\\log_3x$.",
            "The claim fails only because base 3 is too large.",
          ],
          hint:
            "Distinguish a power on the logarithm's input from a power on its output.",
          explanation:
            "The power law moves an input exponent to the front: $\\log_3(x^2)=2\\log_3x$. Squaring the logarithm value produces a different expression in general.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses confusion between an exponent inside a logarithm and squaring the logarithm output.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Misstates the power law as squaring the logarithm value.",
            B: "Treats an algebraic non-equivalence as a domain issue.",
            D: "Attributes the failure to the valid choice of logarithm base.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-log-qm9",
          prompt:
            "Combine the logarithms, solve, and reject any value outside the original domain.",
          latex: "\\log_2x+\\log_2(x-2)=3",
          answer: "4",
          acceptedAnswers: ["x=4", "x = 4", "4.0"],
          hint:
            "The domain requires $x>2$; combine the left side into a logarithm of a product.",
          explanation:
            "Combining gives $\\log_2(x(x-2))=3$, so $x(x-2)=8$. The quadratic gives $x=4$ or $x=-2$, but the original inputs require $x>2$, leaving $x=4$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises product-law manipulation, inverse form, quadratic solving, and domain rejection.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-exp-log-qm10",
          prompt:
            "Find $p+q$ in the condensed form, where $p$ and $q$ are positive.",
          latex:
            "2\\log_3x-\\frac12\\log_3y=\\log_3\\left(\\frac{x^p}{y^q}\\right)",
          answer: "5/2",
          acceptedAnswers: ["2.5", "\\frac52", "\\frac{5}{2}", "p+q=5/2"],
          hint:
            "Use each coefficient as the exponent on its logarithm input.",
          explanation:
            "The power law gives $\\log_3(x^2)-\\log_3(y^{1/2})$. Thus the quotient has $p=2$ and $q=1/2$, so $p+q=2+1/2=5/2$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises reverse coefficient interpretation with power and quotient logarithm laws.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "solving-exponential-logarithmic-equations") {
    return {
      ...base,
      description:
        "Solve exponential and logarithmic equations by matching bases, using logarithms, converting forms, and applying log laws.",
      learningIntention:
        "Learn how to solve exponential and logarithmic equations using matching bases, inverse operations, and logarithm laws.",
      successCriteria: [
        "Solve exponential equations by matching bases.",
        "Choose exact logarithmic solution forms when bases cannot be matched.",
        "Solve logarithmic equations by converting to exponential form.",
        "Apply one logarithm law before solving when needed.",
        "Recognise when a decimal solution is approximate.",
        "Check that logarithmic equation solutions keep inputs positive.",
      ],
      teaching: {
        paragraphs: [
          "When an unknown sits in an exponent, first ask whether both sides can be rewritten with the same base. If they can, equal bases force equal exponents.",
          "If the bases do not match neatly, use a logarithm to ask for the missing exponent directly. Keep full calculator precision until the final rounding step.",
          "For a logarithmic equation, reverse the logarithm by converting to exponential form. Log base a of an expression equals b means a^b equals that expression.",
          "Sometimes log laws come first: combine a sum of logs into a product or a difference of logs into a quotient before converting forms.",
          "Always check the final answer in the original logarithm. Every log input must remain positive.",
        ],
        latexBlocks: [
          "2^x=2^5\\Rightarrow x=5",
          "a^x=N\\Rightarrow x=\\log_a N",
          "\\log_a x=y\\Rightarrow a^y=x",
          "\\log_a M+\\log_a N=\\log_a(MN)",
        ],
      },
      workedExamples: [
        {
          title: "Solve by matching bases",
          questionLatex: "2^{x+1}=16",
          steps: [
            { explanation: "Rewrite the right side using base 2.", latex: "16=2^4" },
            { explanation: "Match the exponents.", latex: "x+1=4" },
            { explanation: "Solve for x.", latex: "x=3" },
          ],
          finalAnswerLatex: "x=3",
        },
        {
          title: "Solve using logarithms",
          questionLatex: "3^x=20",
          steps: [
            { explanation: "Use a logarithm because 20 is not a neat power of 3.", latex: "x=\\log_3 20" },
            { explanation: "A calculator gives an approximate value.", latex: "x\\approx2.73" },
          ],
          finalAnswerLatex: "x=\\log_3 20\\approx2.73",
        },
        {
          title: "Solve a logarithmic equation",
          questionLatex: "\\log_2 x=5",
          steps: [
            { explanation: "Convert to exponential form.", latex: "2^5=x" },
            { explanation: "Evaluate the power.", latex: "x=32" },
          ],
          finalAnswerLatex: "x=32",
        },
        {
          title: "Use a log law before solving",
          questionLatex: "\\log_2 x+\\log_2 4=5",
          steps: [
            { explanation: "Combine the logarithms using the product law.", latex: "\\log_2(4x)=5" },
            { explanation: "Convert to exponential form.", latex: "4x=2^5" },
            { explanation: "Solve for x.", latex: "x=8" },
          ],
          finalAnswerLatex: "x=8",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-exp-solve-g1", "Solve the exponential equation by matching bases.", "2^x=32", "5", ["x=5"]),
        practicalChoice("y11adv-exp-solve-g2", "Which exact solution form is correct?", "C", ["$x=\\log_5 3$", "$x=\\log_3 5$", "$x=\\log_3 20$", "$x=20\\log_3$"], "The base of the exponential becomes the log base.", "3^x=20"),
        formulaAnswer("y11adv-exp-solve-g3", "Solve the logarithmic equation.", "\\log_2 x=4", "16", ["x=16"]),
        formulaAnswer("y11adv-exp-solve-g4", "Solve after applying the product law.", "\\log_3 x+\\log_3 2=2", "9/2", ["4.5", "x=9/2", "x=4.5"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-exp-solve-i1", "Solve the exponential equation by matching bases.", "5^{x-1}=125", "4", ["x=4"]),
        formulaAnswer("y11adv-exp-solve-i2", "Solve the logarithmic equation.", "\\log_4 x=3", "64", ["x=64"]),
        practicalChoice("y11adv-exp-solve-i3", "Which approximate solution is most reasonable?", "A", ["About 2.10", "About 6.30", "About 0.48", "Exactly 20"], "A logarithmic solution is needed and the value is a little more than 2.", "3^x=9.5"),
        formulaAnswer("y11adv-exp-solve-i4", "Solve the equation by converting from logarithmic form.", "\\log_5(x+1)=2", "24", ["x=24"]),
        practicalChoice("y11adv-exp-solve-i5", "Which option identifies the invalid solution issue?", "B", ["The base must be negative", "A logarithm input would be negative", "The answer must be a fraction", "Both sides should be squared"], "Check that every logarithm input is positive.", "\\log_2(x-3)=1,\\quad x=1"),
      ],
      commonMistakes: [
        { mistake: "Matching bases when the bases are not actually the same.", fix: "Rewrite both sides with a common base first, or use logarithms." },
        { mistake: "Writing fragile logarithmic answers in many equivalent forms.", fix: "Use multiple choice for exact logarithmic-form answers in this course interface." },
        { mistake: "Forgetting to convert logarithmic equations back to exponential form.", fix: "Use $\\log_a x=y\\Rightarrow a^y=x$." },
        { mistake: "Ignoring domain restrictions after solving a log equation.", fix: "Check that each logarithm input is positive." },
      ],
      masteryQuiz: [
        qualityAnswer({
          id: "y11adv-exp-solve-qm1",
          prompt:
            "Solve the exponential equation by rewriting both sides with base 2.",
          latex: "8^{x-1}=4",
          answer: "5/3",
          acceptedAnswers: ["1.666...", "\\frac53", "\\frac{5}{3}", "x=5/3"],
          hint:
            "Write 8 as $2^3$ and 4 as $2^2$, then match exponents.",
          explanation:
            "Rewriting 8 and 4 with base 2 gives $2^{3(x-1)}=2^2$. Equal positive bases imply $3x-3=2$, so $3x=5$ and $x=5/3$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks matching-base solving when a linear expression must first be distributed in the exponent.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-solve-qm2",
          prompt:
            "A student claims $2^x=12$ gives $x=6$ by dividing by 2. Which correction is valid?",
          latex: "",
          answer: "C",
          choices: [
            "$x=10$ because 2 should be subtracted.",
            "$x=\\log_{12}2$ because the result becomes the log base.",
            "$x=\\log_2 12$, which lies between 3 and 4.",
            "$x=12^2$ because logarithms reverse division.",
          ],
          hint:
            "The unknown is an exponent, so use the inverse function with the original exponential base.",
          explanation:
            "Division does not isolate an exponent. Applying logarithm base 2 gives $x=\\log_2 12$. Since $2^3=8$ and $2^4=16$, this value must lie between 3 and 4.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses linear-equation treatment of an unknown exponent and checks magnitude estimation.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats the exponential equation as $2+x=12$.",
            B: "Swaps the logarithm base and input.",
            D: "Squares the input instead of applying the inverse logarithm.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-solve-qm3",
          prompt:
            "Solve by converting from logarithmic to exponential form.",
          latex: "\\log_3(2x-1)=2",
          answer: "5",
          acceptedAnswers: ["x=5", "x = 5", "5.0"],
          hint:
            "Convert the equation to $2x-1=3^2$, then solve the linear equation.",
          explanation:
            "Exponential form gives $2x-1=3^2=9$. Hence $2x=10$ and $x=5$; the input $2x-1=9$ is positive, so the solution is valid.",
          difficulty: 3,
          diagnosticIntent:
            "Checks inverse-form conversion, linear solving, and a basic logarithm-domain verification.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-solve-qm4",
          prompt:
            "Combining and solving produces candidates $x=5$ and $x=-1$. Which conclusion is correct?",
          latex: "\\log_2(x-1)+\\log_2(x-3)=3",
          answer: "B",
          choices: [
            "Both candidates are valid because they solve the quadratic.",
            "Only $x=5$ is valid because the original logarithm inputs require $x>3$.",
            "Only $x=-1$ is valid because logarithm values may be negative.",
            "Neither is valid because logarithmic equations cannot have integer solutions.",
          ],
          hint:
            "Check each candidate in both original logarithm inputs, not only in the combined quadratic.",
          explanation:
            "The original inputs require $x-1>0$ and $x-3>0$, so $x>3$. Although both numbers solve the derived quadratic, only $x=5$ satisfies the original domain.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses failure to test derived candidates against every original logarithm input.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes every root of a transformed equation is automatically valid.",
            C: "Confuses a negative logarithm value with a negative logarithm input.",
            D: "Invents a restriction that logarithmic solutions must be non-integers.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-solve-qm5",
          prompt:
            "The equation has solution $x=2$. Find the parameter $k$.",
          latex: "2^{x+k}=32",
          answer: "3",
          acceptedAnswers: ["k=3", "k = 3", "3.0"],
          hint:
            "Substitute the given solution and rewrite 32 as a power of 2.",
          explanation:
            "Substituting the prescribed solution $x=2$ gives $2^{2+k}=32=2^5$. Matching exponents yields $2+k=5$, so the required parameter is $k=3$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses exponential equation solving by inferring a parameter from a prescribed solution.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-exp-solve-qm6",
          prompt:
            "Solve exactly using a common base rather than decimal logarithms.",
          latex: "9^x=27",
          answer: "3/2",
          acceptedAnswers: ["1.5", "\\frac32", "\\frac{3}{2}", "x=3/2"],
          hint:
            "Write both 9 and 27 as powers of 3 before comparing exponents.",
          explanation:
            "Since $9=3^2$ and $27=3^3$, the equation becomes $3^{2x}=3^3$. Therefore $2x=3$ and $x=3/2$ exactly.",
          difficulty: 4,
          diagnosticIntent:
            "Checks selection of an efficient exact common-base method over premature decimal approximation.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-exp-solve-qm7",
          prompt:
            "For integers in the stated range, count how many make the logarithm defined and integer-valued.",
          latex: "\\log_2(n-1),\\qquad -3\\le n\\le6",
          answer: "3",
          acceptedAnswers: ["3 values", "n=2,3,5", "three", "3.0"],
          hint:
            "The positive input $n-1$ must be a power of 2 within the available range.",
          explanation:
            "The possible positive inputs are 1 through 5. The powers of 2 among them are $1,2,4$, corresponding to $n=2,3,5$. Thus 3 integers work.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a bounded integer family using both logarithm domain and integer-output conditions.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-exp-solve-qm8",
          prompt:
            "A student writes $2x-1=\\log 7$. Which correction is most precise?",
          latex: "3^{2x-1}=7",
          answer: "D",
          choices: [
            "The equation should be solved by dividing 7 by 3.",
            "The logarithm base must be 7, giving $2x-1=\\log_7 3$.",
            "The exponent equals 7 because logarithms are optional.",
            "The matching inverse is base 3: $2x-1=\\log_3 7$.",
          ],
          hint:
            "The base of the inverse logarithm must match the base of the exponential function.",
          explanation:
            "Applying logarithm base 3 to $3^{2x-1}=7$ gives $2x-1=\\log_3 7$. An unspecified common logarithm would need division by $\\log 3$ to be equivalent.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses omission of the exponential base when applying a logarithmic inverse.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats an exponential equation as a linear multiplication equation.",
            B: "Reverses the logarithm base and input.",
            C: "Equates an exponent directly with the exponential output.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-solve-qm9",
          prompt:
            "Solve by recognising and factorising a common exponential term.",
          latex: "2^x+2^{x+1}=48",
          answer: "4",
          acceptedAnswers: ["x=4", "x = 4", "4.0"],
          hint:
            "Rewrite $2^{x+1}$ as $2\\cdot2^x$ and factor out $2^x$.",
          explanation:
            "Using $2^{x+1}=2\\cdot2^x$, the left side is $2^x+2\\cdot2^x=3\\cdot2^x$. Thus $2^x=16=2^4$, so matching exponents gives $x=4$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises index rewriting, algebraic factorisation, and matching-base equation solving.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-exp-solve-qm10",
          prompt:
            "Combine the logarithms, solve the resulting quadratic, and apply the original domain.",
          latex: "\\log_2(x-2)+\\log_2(x+1)=2",
          answer: "3",
          acceptedAnswers: ["x=3", "x = 3", "3.0"],
          hint:
            "The domain is $x>2$; combine to a product equal to $2^2$.",
          explanation:
            "Combining gives $(x-2)(x+1)=4$, so $x^2-x-6=0$ and the candidates are $3$ and $-2$. The original inputs require $x>2$, leaving $x=3$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises a logarithm law, inverse conversion, quadratic solving, and domain filtering.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "exponential-logarithmic-modelling") {
    const halfLifeTable: import("../types").DataTableDiagram = {
      description:
        "Table of a 160 milligram sample measured every four hours over 24 hours, showing repeated halving from 160 to 2.5 milligrams.",
      columnHeaders: ["t (hours)", "A(t) (mg)"],
      values: [
        [0, 160],
        [4, 80],
        [8, 40],
        [12, 20],
        [16, 10],
        [20, 5],
        [24, 2.5],
      ],
    };
    return {
      ...base,
      description:
        "Use exponential and logarithmic models for growth, decay, compound interest, population change, half-life, and doubling time.",
      learningIntention:
        "Learn how exponential and logarithmic models describe realistic growth and decay situations, including half-life and doubling time.",
      successCriteria: [
        "Evaluate discrete exponential models at a given time.",
        "Identify growth or decay from the base or continuous growth parameter.",
        "Use $A=A_0b^t$ for practical growth and decay contexts.",
        "Recognise $A=A_0e^{kt}$ as a continuous exponential model.",
        "Solve clean doubling-time and half-life questions.",
        "Interpret model outputs in context with appropriate units.",
      ],
      teaching: {
        paragraphs: [
          "Use an exponential model when a quantity changes by the same multiplier over equal time periods. This is repeated multiplication, not repeated addition.",
          "The starting value tells you where the model begins. The base is the per-period multiplier: 1.04 means keep 100 percent and add 4 percent growth each period.",
          "A base above 1 gives growth. A base between 0 and 1 gives decay because each step keeps only a fraction of the previous amount.",
          "Continuous models use e, a special base approximately equal to 2.718. The natural logarithm ln undoes powers of e when you need to solve for time.",
          "Half-life is the time taken for a quantity to halve. Doubling time is the time taken for a quantity to double.",
          "Keep the model in context and round at the end. Populations, balances, medicine amounts, and radioactive samples need the right units and a sensible level of accuracy.",
        ],
        latexBlocks: [
          "A=A_0b^t",
          "A=A_0e^{kt}",
          "b>1\\Rightarrow \\text{growth},\\quad 0<b<1\\Rightarrow \\text{decay}",
          "k>0\\Rightarrow \\text{growth},\\quad k<0\\Rightarrow \\text{decay}",
          "e\\approx2.718,\\quad \\ln(e^x)=x",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a population model",
          questionLatex:
            "P=5000(1.04)^t,\\quad \\text{find }P\\text{ when }t=3.",
          steps: [
            { explanation: "Substitute the time into the model.", latex: "P=5000(1.04)^3" },
            { explanation: "Evaluate and round to the nearest person.", latex: "P\\approx5624" },
          ],
          finalAnswerLatex: "5624\\text{ people}",
        },
        {
          title: "Identify growth or decay",
          questionLatex: "M=120(0.85)^t",
          steps: [
            { explanation: "Check the base of the exponential model.", latex: "0.85<1" },
            { explanation: "A base between 0 and 1 gives decay.", latex: "\\text{decay}" },
          ],
          finalAnswerLatex: "\\text{Decay}",
        },
        {
          title: "Solve for time in a clean doubling case",
          questionLatex:
            "\\text{A bacteria culture starts at }300\\text{ cells and doubles each hour. Find the time to reach }2400\\text{ cells.}",
          steps: [
            { explanation: "Set up the doubling model.", latex: "A=300(2)^t" },
            { explanation: "Set the target amount.", latex: "2400=300(2)^t" },
            { explanation: "Divide by the starting amount and match powers.", latex: "8=2^t\\Rightarrow t=3" },
          ],
          finalAnswerLatex: "3\\text{ hours}",
        },
        {
          title: "Interpret half-life",
          questionLatex:
            "\\text{A medicine amount halves every }6\\text{ hours. It starts at }80\\text{ mg.}",
          steps: [
            { explanation: "After one half-life, the amount halves once.", latex: "80\\to40" },
            { explanation: "After two half-lives, it halves again.", latex: "40\\to20" },
          ],
          finalAnswerLatex:
            "\\text{After }12\\text{ hours, }20\\text{ mg remains.}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-exp-model-g1", "A savings account follows the displayed model. Find the balance after the given number of years.", "A=5000(1.1)^t,\\quad t=2", "6050", ["6050.00", "$6050", "$6050.00", "$6,050", "$6,050.00", "6,050", "6,050.00"]),
        practicalChoice("y11adv-exp-model-g2", "Which statement describes the model?", "B", ["Population growth", "Radioactive decay", "Linear decrease", "No change"], "The base is between 0 and 1, so it is decay.", "N=200(0.5)^t"),
        formulaAnswer("y11adv-exp-model-g3", "A bacteria culture doubles each hour. Find the time needed to reach the target amount.", "A=250(2)^t,\\quad A=2000", "3", ["3 hours"]),
        practicalChoice("y11adv-exp-model-g4", "Which statement describes the continuous model?", "A", ["Growth", "Decay", "No change", "A linear model"], "A positive k-value in a continuous model gives growth.", "A=1200e^{0.04t}"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-exp-model-i1", "A car value follows the displayed depreciation model. Find the value after the given number of years.", "V=20000(0.8)^t,\\quad t=2", "12800", ["12800.00", "$12800", "$12800.00", "12,800", "12,800.00", "$12,800", "$12,800.00"]),
        formulaAnswer("y11adv-exp-model-i2", "A medicine amount halves every four hours. Find the amount remaining after two half-lives.", "A_0=96\\text{ mg}", "24", ["24 mg"]),
        practicalChoice("y11adv-exp-model-i3", "Which model represents a population increasing by five percent each year?", "C", ["$P=3000(0.95)^t$", "$P=3000+1.05t$", "$P=3000(1.05)^t$", "$P=1.05(3000)^t$"], "A 5% yearly increase has growth factor 1.05.", "\\text{Initial population }3000"),
        practicalChoice("y11adv-exp-model-i4", "Which approximate time best matches the target amount?", "D", ["About 1.2 years", "About 3.0 years", "About 5.0 years", "About 7.3 years"], "Solving needs logarithms; the target is reached a little after 7 years.", "10000=6000(1.07)^t"),
        practicalChoice("y11adv-exp-model-i5", "Which interpretation is correct for the displayed continuous model?", "A", ["The amount decreases over time", "The amount doubles every hour", "The amount is always 0", "The starting amount is negative"], "The exponent coefficient is negative, so the factor $e^{-0.2t}$ decreases from 1 while the initial amount remains positive at 40.", "C=40e^{-0.2t}"),
      ],
      commonMistakes: [
        { mistake: "Treating exponential change as repeated addition.", fix: "Use repeated multiplication by the growth or decay factor." },
        { mistake: "Calling a base below 1 growth.", fix: "Bases between 0 and 1 produce decay." },
        { mistake: "Ignoring context units.", fix: "State whether the output is dollars, people, grams, milligrams, or another unit." },
        { mistake: "Typing fragile logarithmic time solutions.", fix: "For non-clean time values, use a multiple-choice rounded answer in this interface." },
      ],
      masteryQuiz: [
        qualityAnswer({
          id: "y11adv-exp-model-qm1",
          prompt:
            "Write the per-period multiplier for a quantity that grows by 12% each period.",
          latex: "",
          answer: "1.12",
          acceptedAnswers: ["112%", "1.120", "growth factor 1.12"],
          hint:
            "Retain the original 100 percent and add the 12 percent increase.",
          explanation:
            "A 12% increase keeps the original 100% and adds 12%, giving 112% of the previous amount. As a decimal multiplier, the growth factor is $1.12$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks translation from a percentage growth rate to an exponential multiplier.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-model-qm2",
          prompt:
            "A student models a 20% yearly decrease with $A=500(0.20)^t$. Which correction is valid?",
          latex: "",
          answer: "C",
          choices: [
            "Use $A=500(1.20)^t$ because every percentage uses 1 plus the rate.",
            "Use $A=500-0.20t$ because decreases must be linear.",
            "Use $A=500(0.80)^t$ because 80% of the amount remains each year.",
            "Use $A=0.80(500)^t$ because the initial value belongs in the base.",
          ],
          hint:
            "A decay factor records the proportion remaining, not the proportion removed.",
          explanation:
            "A 20% decrease leaves 80% of the previous amount, so the repeated multiplier is $0.80$. The correct model is $A=500(0.80)^t$.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses confusion between percentage loss and the proportion retained in a decay model.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses a growth multiplier for a decrease.",
            B: "Replaces repeated proportional change with constant subtraction.",
            D: "Swaps the roles of initial value and exponential base.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-model-qm3",
          prompt:
            "Evaluate the model after two periods and include the context unit.",
          latex: "P(t)=400(1.5)^t",
          answer: "900",
          acceptedAnswers: ["900 people", "P(2)=900", "900.0"],
          hint:
            "Substitute $t=2$ and square the growth factor before multiplying.",
          explanation:
            "Substituting $t=2$ gives $P(2)=400(1.5)^2=400(2.25)=900$. The model therefore predicts 900 people after two periods.",
          difficulty: 3,
          diagnosticIntent:
            "Checks direct evaluation of a discrete exponential growth model with contextual interpretation.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-model-qm4",
          prompt:
            "Which interpretation is supported by both parameters?",
          latex: "A(t)=1200e^{-0.06t}",
          answer: "B",
          choices: [
            "The initial amount is 0 and the quantity grows.",
            "The initial amount is 1200 and the quantity decays continuously.",
            "The initial amount is 1200 and exactly 6% is subtracted linearly each period.",
            "The amount doubles every 0.06 time units.",
          ],
          hint:
            "Evaluate at zero for the initial amount and inspect the sign of the continuous rate parameter.",
          explanation:
            "At $t=0$, the exponential factor is 1, so the initial amount is 1200. The negative coefficient in the exponent makes $e^{-0.06t}$ decrease continuously.",
          difficulty: 3,
          diagnosticIntent:
            "Checks joint interpretation of initial value and continuous growth-rate sign.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Treats the exponent value at zero as the whole model output.",
            C: "Confuses continuous exponential decay with constant linear subtraction.",
            D: "Interprets a negative rate coefficient as a doubling time.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-model-qm5",
          prompt:
            "The quantity follows $A(t)=200b^t$ with $b>0$. Use the later value to find the percentage growth rate per period.",
          latex: "A(2)=288",
          answer: "20",
          acceptedAnswers: ["20%", "20 percent", "rate=20%", "0.20"],
          hint:
            "Solve $200b^2=288$, choose the positive base, then convert $b-1$ to a percentage.",
          explanation:
            "The data give $b^2=288/200=1.44$, so the positive multiplier is $b=1.2$. This retains 100% and adds 20%, giving a 20% growth rate per period.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses a two-period model to infer the per-period multiplier and percentage rate.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-exp-model-qm6",
          prompt:
            "Plan E compounds at 10% annually. Plan L adds $100 each year to the same initial balance. After two years, by how many dollars does Plan E exceed Plan L?",
          latex: "E(t)=1000(1.10)^t,\\qquad L(t)=1000+100t",
          answer: "10",
          acceptedAnswers: ["$10", "10 dollars", "E exceeds L by 10", "10.0"],
          hint:
            "Evaluate both models at $t=2$ before taking the difference.",
          explanation:
            "After two years, $E(2)=1000(1.1)^2=1210$, while $L(2)=1000+200=1200$. Compound growth therefore exceeds linear growth by $10$.",
          difficulty: 4,
          diagnosticIntent:
            "Compares exponential and linear models with the same first-period increase.",
          taskType: "analytical",
        }),
        {
          ...qualityAnswer({
            id: "y11adv-exp-model-qm7",
            prompt:
              "At the listed four-hour observation times from 0 to 24 hours, count how many amounts are at least 20 mg.",
            latex: "A(t)=160(0.5)^{t/4}",
            answer: "4",
            acceptedAnswers: ["4 observations", "t=0,4,8,12", "four", "4.0"],
            hint:
              "Include the observation equal to the threshold and stop once repeated halving drops below it.",
            explanation:
              "The values at $t=0,4,8,12$ are $160,80,40,20$ mg, all at least 20. Later listed values are below 20, so 4 observations qualify.",
            difficulty: 4,
            diagnosticIntent:
              "Investigates a bounded half-life sequence with threshold inclusion and discrete observation times.",
            taskType: "investigative",
          }),
          dataTableDiagram: halfLifeTable,
        },
        qualityChoice({
          id: "y11adv-exp-model-qm8",
          prompt:
            "A student says the two models are exactly identical because both represent 5% growth. Which assessment is correct?",
          latex: "A=500(1.05)^t,\\qquad B=500e^{0.05t}",
          answer: "D",
          choices: [
            "They are identical because 1.05 equals $e^{0.05}$ exactly.",
            "They are identical only for positive integer times.",
            "Model B is linear because it contains $e$.",
            "They share the initial value but use different per-unit multipliers, since $e^{0.05}\\ne1.05$.",
          ],
          hint:
            "Compare the one-unit multipliers numerically or symbolically.",
          explanation:
            "Model A multiplies by exactly 1.05 per unit. Model B multiplies by $e^{0.05}\\approx1.05127$. They agree at $t=0$ but are not the same growth model.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses conflation of a discrete percentage rate with a continuous exponential parameter.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Assumes the continuous multiplier equals one plus its exponent exactly.",
            B: "Believes integer inputs remove the difference between unequal bases.",
            C: "Classifies a function by its named constant instead of variable placement.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-model-qm9",
          prompt:
            "A medicine starts at 80 mg and has a four-hour half-life. At $t=4$ hours, immediately after the first halving, a 20 mg dose is added. Find the amount at $t=8$ hours.",
          latex: "",
          answer: "30",
          acceptedAnswers: ["30 mg", "30 milligrams", "M(8)=30", "30.0"],
          hint:
            "Halve the initial amount to time 4, add the dose, then halve the new total over the next four hours.",
          explanation:
            "The initial 80 mg halves to 40 mg at $t=4$. Adding 20 mg gives 60 mg. One further half-life passes by $t=8$, leaving $60/2=30$ mg.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises piecewise exponential decay with an intervention that resets the amount.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-exp-model-qm10",
          prompt:
            "Find the exact doubling time and give a reasonable decimal approximation in years.",
          latex: "500(1.08)^t=1000",
          answer: "ln(2)/ln(1.08)",
          acceptedAnswers: [
            "\\frac{\\ln2}{\\ln1.08}",
            "ln 2 / ln 1.08",
            "about 9.01 years",
            "9.006 years",
            "t=ln(2)/ln(1.08)",
          ],
          hint:
            "Divide by the initial amount, then take logarithms of $1.08^t=2$.",
          explanation:
            "Dividing gives $1.08^t=2$. Taking natural logs yields $t\\ln(1.08)=\\ln2$, so $t=\\ln2/\\ln(1.08)\\approx9.01$ years.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises contextual target setup, logarithmic inversion, exact form, and numerical interpretation.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "exponential-logarithmic-functions-exam-practice") {
    const examLogGraph: import("../types").CartesianGraph = {
      description:
        "Increasing logarithmic curve y equals log base 5 of x, defined only to the right of the y-axis, passing through one comma zero and five comma one, and approaching the vertical asymptote x equals zero.",
      xMin: -2,
      xMax: 12,
      yMin: -3,
      yMax: 3,
      showGrid: true,
      showAxisLabels: true,
      curves: [{ kind: "logarithmic", base: 5, label: "y=log_5(x)" }],
      points: [
        { x: 1, y: 0, label: "(1,0)" },
        { x: 5, y: 1, label: "(5,1)" },
      ],
    };
    return {
      ...base,
      description:
        "Practise mixed assessment-style questions on index laws, logarithms, equations, models, graph features, and interpretation.",
      learningIntention:
        "Apply index, exponential, logarithmic, equation-solving, and modelling skills to mixed assessment-style questions.",
      successCriteria: [
        "Simplify index expressions accurately.",
        "Convert between exponential and logarithmic form.",
        "Apply logarithm laws in short expressions.",
        "Solve clean exponential and logarithmic equations.",
        "Evaluate exponential models in context.",
        "Interpret growth, decay, domain, intercepts, and asymptotes.",
      ],
      teaching: {
        paragraphs: [
          "Mixed questions become easier when you identify the job first: simplify powers, read a logarithm as an exponent question, solve for an exponent, evaluate a model, or interpret a graph.",
          "With powers, look for matching bases. With logarithms, remember that the log value is the exponent needed to rebuild the input.",
          "For equations, match bases when possible and use logarithms when the exponent cannot be exposed neatly. For models, identify the starting value, multiplier, and time unit before calculating.",
          "Graph questions usually test the base, y-intercept, horizontal asymptote, or logarithm domain. Check for growth versus decay and remember that a log input must be positive.",
        ],
        latexBlocks: [
          "a^m a^n=a^{m+n},\\quad \\frac{a^m}{a^n}=a^{m-n}",
          "\\log_a x=y\\Longleftrightarrow a^y=x",
          "\\log_a(MN)=\\log_a M+\\log_a N",
          "A=A_0b^t,\\quad A=A_0e^{kt}",
        ],
      },
      workedExamples: [
        {
          title: "Mixed index and logarithm question",
          questionLatex: "\\frac{x^6}{x^2},\\quad \\log_2 32",
          steps: [
            { explanation: "Use the division law for indices.", latex: "\\frac{x^6}{x^2}=x^4" },
            { explanation: "Evaluate the logarithm by inspection.", latex: "2^5=32\\Rightarrow \\log_2 32=5" },
          ],
          finalAnswerLatex: "x^4,\\quad 5",
        },
        {
          title: "Solve a clean logarithmic equation",
          questionLatex: "\\log_3(x-1)=3",
          steps: [
            { explanation: "Convert to exponential form.", latex: "x-1=3^3" },
            { explanation: "Solve for x.", latex: "x=28" },
          ],
          finalAnswerLatex: "x=28",
        },
        {
          title: "Evaluate a decay model",
          questionLatex:
            "\\text{A radioactive sample follows }A=160(0.5)^t.\\text{ Find }A\\text{ when }t=3.",
          steps: [
            { explanation: "Substitute the time into the model.", latex: "A=160(0.5)^3" },
            { explanation: "Evaluate.", latex: "A=20" },
          ],
          finalAnswerLatex: "20",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-exp-exam-g1", "Simplify the index expression.", "\\frac{x^9}{x^4}", "x^5", ["x^(5)"]),
        formulaAnswer("y11adv-exp-exam-g2", "Evaluate the logarithm by inspection.", "\\log_3 27", "3"),
        practicalChoice("y11adv-exp-exam-g3", "Which exact solution form is correct?", "A", ["$x=\\log_5 40$", "$x=\\log_{40}5$", "$x=40\\log 5$", "$x=5^{40}$"], "The log base matches the exponential base.", "5^x=40"),
        formulaAnswer("y11adv-exp-exam-g4", "A decay model is shown. Find the amount after the given time.", "A=120(0.5)^t,\\quad t=2", "30"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-exp-exam-i1", "Evaluate the negative-index expression. Give the exact fraction.", "3^{-2}", "1/9", ["\\frac19", "\\frac{1}{9}", "0.111..."]),
        practicalChoice("y11adv-exp-exam-i2", "Which logarithmic statement matches the displayed exponential statement?", "D", ["$\\log_6 2=36$", "$\\log_2 36=6$", "$\\log_{36}6=2$", "$\\log_6 36=2$"], "The base is 6, the result is 36, and the exponent is 2.", "6^2=36"),
        practicalChoice("y11adv-exp-exam-i3", "Which expression uses the quotient law correctly?", "B", ["$\\log_4 12+\\log_4 3$", "$\\log_4 12-\\log_4 3$", "$\\log_4(12-3)$", "$\\log_4 12\\log_4 3$"], "A quotient inside one logarithm becomes subtraction of same-base logarithms, so the numerator log comes first and the denominator log second.", "\\log_4\\left(\\frac{12}{3}\\right)"),
        formulaAnswer("y11adv-exp-exam-i4", "Solve the logarithmic equation.", "\\log_2(x+3)=5", "29", ["x=29"]),
        practicalChoice("y11adv-exp-exam-i5", "Which statement describes the displayed exponential graph?", "A", ["Decay with horizontal asymptote y = 0", "Growth with vertical asymptote x = 0", "Decay with y-intercept 0", "Linear with gradient one half"], "A base between 0 and 1 gives decay, and the basic horizontal asymptote is y = 0.", "y=\\left(\\frac{1}{2}\\right)^x"),
      ],
      commonMistakes: [
        { mistake: "Using ordinary arithmetic instead of index laws.", fix: "When bases match, use the relevant index law before calculating." },
        { mistake: "Forcing a typed logarithmic expression when many equivalent forms are possible.", fix: "Use multiple-choice exact log forms for non-clean exponential equations." },
        { mistake: "Applying log laws to sums inside a logarithm.", fix: "Product, quotient, and power laws do not turn a general sum into a sum of logs." },
        { mistake: "Ignoring the context in modelling questions.", fix: "Name whether the model represents growth, decay, half-life, doubling, balance, population, or amount." },
      ],
      masteryQuiz: [
        qualityAnswer({
          id: "y11adv-exp-exam-qm1",
          prompt:
            "Simplify the expression to a single power of $x$, assuming $x\\ne0$.",
          latex: "\\frac{(x^2)^3}{x^{-1}}",
          answer: "x^7",
          acceptedAnswers: ["x⁷", "x^(7)", "x^7.0"],
          hint:
            "Multiply the indices in the numerator, then subtract the negative denominator index.",
          explanation:
            "The power-of-a-power law makes the numerator $x^{2\\cdot3}=x^6$. Division subtracts indices, so $x^6/x^{-1}=x^{6-(-1)}=x^7$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks power-of-a-power and quotient laws with a negative denominator index.",
          taskType: "procedural",
        }),
        qualityAnswer({
          id: "y11adv-exp-exam-qm2",
          prompt:
            "Evaluate the logarithm exactly by inspection.",
          latex: "\\log_3\\left(\\frac19\\right)",
          answer: "-2",
          acceptedAnswers: ["-2.0", "negative two", "\\log_3(3^{-2})=-2"],
          hint:
            "Express one ninth as a negative power of 3.",
          explanation:
            "Because $1/9=3^{-2}$, the exponent required on base 3 to produce the input is $-2$. Therefore $\\log_3(1/9)=-2$.",
          difficulty: 3,
          diagnosticIntent:
            "Checks inverse exponential meaning for a reciprocal input in mixed practice.",
          taskType: "procedural",
        }),
        qualityChoice({
          id: "y11adv-exp-exam-qm3",
          prompt:
            "Which model correctly represents a quantity starting at 800 and decreasing by 7% each year?",
          latex: "",
          answer: "B",
          choices: [
            "$A=800(0.07)^t$",
            "$A=800(0.93)^t$",
            "$A=800(1.07)^t$",
            "$A=800-0.93t$",
          ],
          hint:
            "The decay multiplier is the proportion remaining after 7% is removed.",
          explanation:
            "A 7% decrease retains 93% each year, giving multiplier 0.93. Repeated proportional decay is therefore modelled by $A=800(0.93)^t$.",
          difficulty: 3,
          diagnosticIntent:
            "Diagnoses confusion among percentage loss, retained factor, growth factor, and linear change.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses the percentage removed as the remaining multiplier.",
            C: "Uses a growth factor instead of decay.",
            D: "Models proportional change as constant subtraction.",
          },
        }),
        {
          ...qualityChoice({
            id: "y11adv-exp-exam-qm4",
            prompt:
              "Which statement is consistent with every displayed graph feature?",
            latex: "y=\\log_5x",
            answer: "C",
            choices: [
              "Domain all real numbers, y-intercept $(0,1)$, horizontal asymptote $y=0$",
              "Domain $x\\ge0$, x-intercept $(5,0)$, vertical asymptote $x=1$",
              "Domain $x>0$, x-intercept $(1,0)$, vertical asymptote $x=0$",
              "Domain $x>1$, no intercept, horizontal asymptote $y=0$",
            ],
            hint:
              "Use the positive-input restriction, evaluate log base 5 of 1, and identify the boundary line.",
            explanation:
              "A real logarithm requires $x>0$. Since $\\log_5 1=0$, the x-intercept is $(1,0)$, and the graph approaches the domain boundary through the vertical asymptote $x=0$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks integrated logarithmic domain, intercept, and asymptote interpretation from a graph.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Transfers exponential graph features to the logarithmic graph.",
              B: "Includes zero in the domain and treats a plotted point as the intercept.",
              D: "Shifts the domain and assigns a horizontal instead of vertical asymptote.",
            },
          }),
          cartesianGraph: examLogGraph,
        },
        qualityAnswer({
          id: "y11adv-exp-exam-qm5",
          prompt:
            "The positive integer base $a$ gives the prescribed solution $x=3$. Find $a$.",
          latex: "a^{x+1}=81",
          answer: "3",
          acceptedAnswers: ["a=3", "a = 3", "3.0"],
          hint:
            "Substitute $x=3$, then solve $a^4=81$ under the positive-base condition.",
          explanation:
            "Substituting the prescribed solution $x=3$ makes the equation $a^4=81=3^4$. Since the base is a positive integer, the required value is $a=3$.",
          difficulty: 4,
          diagnosticIntent:
            "Reverses exponential equation solving to infer a base from a specified solution.",
          taskType: "problem-solving",
        }),
        qualityAnswer({
          id: "y11adv-exp-exam-qm6",
          prompt:
            "Solve exactly by choosing a common base rather than using decimal logarithms.",
          latex: "4^x=8",
          answer: "3/2",
          acceptedAnswers: ["1.5", "\\frac32", "\\frac{3}{2}", "x=3/2"],
          hint:
            "Write 4 and 8 as powers of 2, then equate exponents.",
          explanation:
            "Writing both sides with base 2 gives $2^{2x}=2^3$. Equal positive bases imply $2x=3$, so the exact solution is $x=3/2$.",
          difficulty: 4,
          diagnosticIntent:
            "Checks method selection for an exact equation that looks calculator-dependent but has a common base.",
          taskType: "analytical",
        }),
        qualityAnswer({
          id: "y11adv-exp-exam-qm7",
          prompt:
            "For the listed integers, count how many make the logarithm both defined and integer-valued.",
          latex: "\\log_2(x+4),\\qquad -3\\le x\\le12",
          answer: "5",
          acceptedAnswers: ["5 values", "x=-3,-2,0,4,12", "five", "5.0"],
          hint:
            "The inputs run from 1 to 16; identify the powers of 2 in that range.",
          explanation:
            "Integer logarithm values occur when $x+4$ is $1,2,4,8,$ or $16$. These correspond to $x=-3,-2,0,4,12$, so 5 integers qualify.",
          difficulty: 4,
          diagnosticIntent:
            "Investigates a bounded shifted logarithm family using domain and integer-output constraints.",
          taskType: "investigative",
        }),
        qualityChoice({
          id: "y11adv-exp-exam-qm8",
          prompt:
            "A student equates the inputs and obtains $x=1$. Which conclusion is correct?",
          latex: "\\log_2(x-1)=\\log_2(1-x)",
          answer: "D",
          choices: [
            "$x=1$ is valid because equal logs always have equal inputs.",
            "Every real $x$ works because the inputs are opposites.",
            "$x=0$ is the only valid solution.",
            "There is no real solution: at $x=1$ both inputs are zero, and the two positivity conditions cannot hold together.",
          ],
          hint:
            "Check the two original input inequalities before accepting the algebraic candidate.",
          explanation:
            "The first logarithm requires $x>1$, while the second requires $x<1$, so their domains never overlap. The candidate $x=1$ makes both inputs zero and is invalid.",
          difficulty: 5,
          diagnosticIntent:
            "Diagnoses automatic acceptance of an equal-input candidate without checking simultaneous logarithm domains.",
          taskType: "analytical",
          distractorMisconceptions: {
            A: "Uses injectivity without first establishing a shared domain.",
            B: "Treats opposite expressions as automatically equal inside logarithms.",
            C: "Chooses a symmetric value without testing either input.",
          },
        }),
        qualityAnswer({
          id: "y11adv-exp-exam-qm9",
          prompt:
            "An exponential population model $P(t)=200b^t$ satisfies the later value shown. Find $P(3)$.",
          latex: "P(2)=450,\\qquad b>0",
          answer: "675",
          acceptedAnswers: ["675 people", "P(3)=675", "675.0"],
          hint:
            "Infer the positive multiplier from $200b^2=450$, then advance one more period.",
          explanation:
            "The data give $b^2=450/200=2.25$, so the positive multiplier is $b=1.5$. Advancing the model gives $P(3)=200(1.5)^3=675$ people.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises reverse parameter inference and forward prediction in an exponential model.",
          taskType: "synthesis",
        }),
        qualityAnswer({
          id: "y11adv-exp-exam-qm10",
          prompt:
            "Use inverse functions, then solve the resulting quadratic. Enter both real solutions in increasing order.",
          latex: "\\log_2\\left(2^{x^2-1}\\right)=3",
          answer: "-2,2",
          acceptedAnswers: ["{-2,2}", "x=-2,2", "-2 and 2", "(-2, 2)"],
          hint:
            "Log base 2 undoes the base-2 exponential, leaving an equation in $x^2$.",
          explanation:
            "The inverse functions simplify the left side to $x^2-1$. Thus $x^2-1=3$, so $x^2=4$ and both real solutions are $x=-2$ and $x=2$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises inverse exponential-logarithmic structure with a two-branch algebraic equation.",
          taskType: "synthesis",
        }),
      ],
    };
  }

  if (lesson.slug === "graphing-exponential-logarithmic-functions") {
    const inversePairGraph: import("../types").CartesianGraph = {
      description:
        "Coordinate graph showing y equals 2 to the power x and y equals log base 2 of x as mirror-image curves across the dashed line y equals x; paired points two comma four and four comma two and the logarithmic point one eighth comma negative three are marked.",
      xMin: -2,
      xMax: 8,
      yMin: -4,
      yMax: 8,
      showGrid: true,
      showAxisLabels: true,
      lines: [{ kind: "linear", m: 1, b: 0, label: "y=x" }],
      curves: [
        { kind: "exponential", base: 2, label: "y=2^x" },
        { kind: "logarithmic", base: 2, label: "y=log_2(x)" },
      ],
      points: [
        { x: 2, y: 4, label: "(2,4)" },
        { x: 4, y: 2, label: "(4,2)" },
        { x: 0, y: 1, label: "(0,1)" },
        { x: 1, y: 0, label: "(1,0)" },
        { x: 1 / 8, y: -3, label: "(1/8,-3)" },
      ],
    };
    const exponentialThreeGraph: import("../types").CartesianGraph = {
      description:
        "Increasing exponential curve y equals 3 to the power x, passing through zero comma one, one comma three, and two comma nine, and approaching the horizontal asymptote y equals zero without crossing it.",
      xMin: -2,
      xMax: 3,
      yMin: -1,
      yMax: 12,
      showGrid: true,
      showAxisLabels: true,
      curves: [{ kind: "exponential", base: 3, label: "y=3^x" }],
      points: [
        { x: 0, y: 1, label: "(0,1)" },
        { x: 1, y: 3, label: "(1,3)" },
        { x: 2, y: 9, label: "(2,9)" },
      ],
    };
    const boundedExponentialGraph: import("../types").CartesianGraph = {
      description:
        "Exponential curve y equals 3 to the power x over integer x-values from negative two to four; negative inputs have fractional y-values, while the marked points from zero comma one through four comma eighty-one have integer y-values.",
      xMin: -2,
      xMax: 4,
      yMin: -1,
      yMax: 90,
      showGrid: true,
      showAxisLabels: true,
      curves: [{ kind: "exponential", base: 3, label: "y=3^x" }],
      points: [
        { x: 0, y: 1, label: "(0,1)" },
        { x: 1, y: 3, label: "(1,3)" },
        { x: 2, y: 9, label: "(2,9)" },
        { x: 3, y: 27, label: "(3,27)" },
        { x: 4, y: 81, label: "(4,81)" },
      ],
    };
    return {
      ...base,
      description:
        "Sketch and interpret y=aˣ and y=logₐx, identify their key features, and recognise y=eˣ and y=lnx as reflections in y=x.",
      learningIntention:
        "Learn the shape, intercepts, asymptotes, and domain of exponential and logarithmic graphs, and understand that y=eˣ and y=lnx are inverse functions reflected in y=x.",
      successCriteria: [
        "State the y-intercept, horizontal asymptote, domain, and range of y=aˣ.",
        "State the x-intercept, vertical asymptote, domain, and range of y=logₐx.",
        "Evaluate y=aˣ at given x-values.",
        "Evaluate y=logₐx at given x-values by inspection.",
        "Recognise e≈2.718 as the base of the natural exponential and natural logarithm.",
        "Explain why y=eˣ and y=lnx are reflections in y=x.",
      ],
      teaching: {
        paragraphs: [
          "The graph of y=aˣ (with a>1) rises steeply to the right and flattens toward the x-axis on the left. It always passes through (0,1) because any valid base raised to zero equals 1. The horizontal asymptote is y=0.",
          "The graph of y=logₐx is the mirror image of y=aˣ reflected in the diagonal line y=x. It always passes through (1,0) because logₐ1=0. Its domain is x>0 only, and the vertical asymptote is x=0.",
          "Inverse functions undo each other and their graphs are reflections in y=x. Because logₐ(aˣ)=x and aˡᵒᵍᵃˣ=x, the graphs y=aˣ and y=logₐx are reflections of each other in the line y=x.",
          "Euler's number e (approximately 2.718) is the special base where the natural exponential function y=eˣ is its own gradient function. The natural logarithm y=lnx means y=logₑx, and y=eˣ and y=lnx are reflections of each other in y=x.",
        ],
        latexBlocks: [
          "y=a^x:\\quad \\text{y-int }(0,1),\\quad \\text{asymptote }y=0,\\quad \\text{domain all reals}",
          "y=\\log_a x:\\quad \\text{x-int }(1,0),\\quad \\text{asymptote }x=0,\\quad \\text{domain }x>0",
          "y=a^x\\text{ and }y=\\log_a x\\text{ are reflections in }y=x",
          "e\\approx 2.718,\\quad \\ln x=\\log_e x",
        ],
      },
      workedExamples: [
        {
          title: "State the key features of y=2ˣ",
          questionLatex: "y=2^x",
          steps: [
            { explanation: "Find the y-intercept by setting x=0.", latex: "y=2^0=1\\quad\\Rightarrow\\quad (0,1)" },
            { explanation: "The base is greater than 1, so the graph is increasing.", latex: "2>1\\Rightarrow\\text{increasing}" },
            { explanation: "The graph approaches y=0 but never crosses it.", latex: "\\text{horizontal asymptote: }y=0" },
            { explanation: "State the domain and range.", latex: "\\text{domain: all reals},\\quad \\text{range: }y>0" },
          ],
          finalAnswerLatex:
            "\\text{y-intercept }(0,1),\\;\\text{asymptote }y=0,\\;\\text{domain all reals},\\;\\text{range }y>0.",
        },
        {
          title: "State the key features of y=log₂x",
          questionLatex: "y=\\log_2 x",
          steps: [
            { explanation: "Find the x-intercept by setting y=0.", latex: "\\log_2 x=0\\Rightarrow x=2^0=1\\quad\\Rightarrow\\quad (1,0)" },
            { explanation: "The domain is restricted to positive inputs.", latex: "\\text{domain: }x>0" },
            { explanation: "The graph has a vertical asymptote at x=0.", latex: "\\text{vertical asymptote: }x=0" },
            { explanation: "The range is all real numbers.", latex: "\\text{range: all reals}" },
          ],
          finalAnswerLatex:
            "\\text{x-intercept }(1,0),\\;\\text{asymptote }x=0,\\;\\text{domain }x>0,\\;\\text{range all reals.}",
        },
        {
          title: "Explain why y=eˣ and y=lnx are reflections in y=x",
          questionLatex: "y=e^x\\text{ and }y=\\ln x",
          steps: [
            { explanation: "Two functions are inverses when each undoes the other.", latex: "\\ln(e^x)=x\\quad\\text{and}\\quad e^{\\ln x}=x" },
            { explanation: "Inverse functions swap the roles of x and y.", latex: "(a,b)\\text{ on }y=e^x\\Rightarrow (b,a)\\text{ on }y=\\ln x" },
            { explanation: "Swapping coordinates is the same as reflecting in y=x.", latex: "\\text{Reflection line: }y=x" },
          ],
          finalAnswerLatex:
            "y=e^x\\text{ and }y=\\ln x\\text{ are reflections in }y=x\\text{ because they are inverse functions.}",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y11adv-exp-graph-g1",
          "Which line is the horizontal asymptote of the displayed exponential function?",
          "A",
          ["$y=0$", "$y=3$", "$x=0$", "$x=3$"],
          "As $x$ decreases without bound, $3^x$ approaches 0 but never reaches it.",
          "y=3^x"
        ),
        formulaAnswer(
          "y11adv-exp-graph-g2",
          "Evaluate the exponential function at the given input.",
          "y=2^x,\\quad x=0",
          "1"
        ),
        practicalChoice(
          "y11adv-exp-graph-g3",
          "Which line is the vertical asymptote of the displayed logarithmic function?",
          "C",
          ["$y=0$", "$x=2$", "$x=0$", "$y=2$"],
          "The domain of log₂x is x>0; the graph approaches but never reaches x=0.",
          "y=\\log_2 x"
        ),
        practicalChoice(
          "y11adv-exp-graph-g4",
          "Which line is the axis of reflection between the displayed inverse pair?",
          "B",
          ["$y=0$", "$y=x$", "$x=0$", "$y=-x$"],
          "Inverse functions swap x and y coordinates, which is a reflection in y=x.",
          "y=e^x\\text{ and }y=\\ln x"
        ),
      ],
      independentPractice: [
        formulaAnswer(
          "y11adv-exp-graph-i1",
          "Evaluate the exponential function at the given input.",
          "y=2^x,\\quad x=3",
          "8"
        ),
        practicalChoice(
          "y11adv-exp-graph-i2",
          "Which point is the x-intercept of the displayed logarithmic function?",
          "D",
          ["$(0,1)$", "$(5,0)$", "$(0,5)$", "$(1,0)$"],
          "Setting y=0 gives log₅x=0, so x=1; the x-intercept is (1,0).",
          "y=\\log_5 x"
        ),
        practicalChoice(
          "y11adv-exp-graph-i3",
          "Which describes the domain of the displayed logarithmic function?",
          "B",
          ["All real numbers", "$x>0$", "$x\\geq0$", "$x>1$"],
          "The input to a logarithm must be positive, so the domain is x>0.",
          "y=\\log_2 x"
        ),
        formulaAnswer(
          "y11adv-exp-graph-i4",
          "Evaluate the exponential function at the given input.",
          "y=e^x,\\quad x=0",
          "1"
        ),
        practicalChoice(
          "y11adv-exp-graph-i5",
          "Which describes the range of the displayed exponential function?",
          "C",
          ["All real numbers", "$y\\geq1$", "$y>0$", "$y\\geq0$"],
          "An exponential with positive base is always positive; the output is never zero or negative.",
          "y=2^x"
        ),
      ],
      commonMistakes: [
        { mistake: "Thinking y=aˣ has an x-intercept.", fix: "The graph of y=aˣ never touches the x-axis; y=0 is the horizontal asymptote, not an intercept." },
        { mistake: "Applying logarithm rules to negative or zero inputs.", fix: "The domain of y=logₐx is x>0 only; the function is undefined at x=0 and for negative x." },
        { mistake: "Confusing which asymptote belongs to which function.", fix: "y=aˣ has a horizontal asymptote (y=0); y=logₐx has a vertical asymptote (x=0)." },
        { mistake: "Treating e as just a calculator decimal.", fix: "e is an exact mathematical constant (the base where d/dx(eˣ)=eˣ); use e in exact answers rather than the decimal 2.718." },
      ],
      masteryQuiz: [
        {
          ...qualityAnswer({
            id: "y11adv-exp-graph-qm1",
            prompt:
              "The marked point lies on the exponential graph. Enter the corresponding point on its inverse logarithmic graph.",
            latex: "(3,8)\\text{ lies on }y=2^x",
            answer: "8,3",
            acceptedAnswers: ["(8,3)", "(8, 3)", "x=8,y=3", "8;3"],
            hint:
              "Inverse functions exchange the input and output coordinates.",
            explanation:
              "The inverse relation swaps every ordered pair. Therefore the exponential point $(3,8)$ corresponds to the logarithmic point $(8,3)$ on $y=\\log_2x$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks production of a reflected inverse coordinate rather than recognition of the reflection line alone.",
            taskType: "procedural",
          }),
          cartesianGraph: inversePairGraph,
        },
        {
          ...qualityChoice({
            id: "y11adv-exp-graph-qm2",
            prompt:
              "A student calls the x-axis an x-intercept of the displayed curve. Which diagnosis is correct?",
            latex: "y=3^x",
            answer: "B",
            choices: [
              "The student is correct because the curve reaches zero for negative $x$.",
              "The x-axis is the horizontal asymptote $y=0$; the exponential output remains positive.",
              "The x-axis is a vertical asymptote because $x=0$.",
              "The curve crosses the x-axis at $(1,0)$.",
            ],
            hint:
              "Distinguish a line approached indefinitely from a point actually reached.",
            explanation:
              "For every real $x$, $3^x>0$, so the graph has no x-intercept. As $x\\to-\\infty$, the values approach 0 without reaching it, making $y=0$ a horizontal asymptote.",
            difficulty: 3,
            diagnosticIntent:
              "Diagnoses confusion between an asymptote and an intercept on a positive exponential graph.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Assumes approaching zero eventually means attaining zero.",
              C: "Confuses the x-axis equation with a vertical line.",
              D: "Transfers the logarithmic intercept to the exponential graph.",
            },
          }),
          cartesianGraph: exponentialThreeGraph,
        },
        {
          ...qualityAnswer({
            id: "y11adv-exp-graph-qm3",
            prompt:
              "Use the marked point to determine the positive base $a$.",
            latex: "y=a^x\\text{ passes through }(2,9)",
            answer: "3",
            acceptedAnswers: ["a=3", "a = 3", "3.0"],
            hint:
              "Substitute the point to obtain $a^2=9$, then apply the positive-base condition.",
            explanation:
              "The point gives $9=a^2$. Although the algebraic square roots are $\\pm3$, an exponential base is positive, so the graph has base $a=3$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks reverse inference of an exponential base from a plotted coordinate and the base restriction.",
            taskType: "problem-solving",
          }),
          cartesianGraph: exponentialThreeGraph,
        },
        {
          ...qualityChoice({
            id: "y11adv-exp-graph-qm4",
            prompt:
              "Which explanation accounts for both marked points and the two different asymptotes?",
            latex: "y=2^x\\quad\\text{and}\\quad y=\\log_2x",
            answer: "C",
            choices: [
              "The curves are translations, so all coordinates stay in the same order.",
              "The curves are reflections in the x-axis, so only y-coordinates change sign.",
              "The functions are inverses reflected in $y=x$; coordinates and horizontal/vertical features swap.",
              "The functions are unrelated because their asymptotes have different orientations.",
            ],
            hint:
              "Track how $(2,4)$ becomes $(4,2)$ and how $y=0$ becomes $x=0$.",
            explanation:
              "Inverse functions swap x and y. Reflection in $y=x$ maps $(2,4)$ to $(4,2)$ and maps the exponential horizontal asymptote $y=0$ to the logarithmic vertical asymptote $x=0$.",
            difficulty: 3,
            diagnosticIntent:
              "Checks an integrated inverse-graph explanation using both coordinates and asymptote orientation.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Treats inverse graphs as translations with unchanged coordinate order.",
              B: "Uses the wrong reflection line and sign-change rule.",
              D: "Interprets swapped asymptotes as evidence against the inverse relationship.",
            },
          }),
          cartesianGraph: inversePairGraph,
        },
        {
          ...qualityAnswer({
            id: "y11adv-exp-graph-qm5",
            prompt:
              "The logarithmic graph contains the point shown. Find its valid base $b>1$.",
            latex: "\\left(\\frac18,-3\\right)\\text{ lies on }y=\\log_bx",
            answer: "2",
            acceptedAnswers: ["b=2", "b = 2", "2.0"],
            hint:
              "Convert the point statement to $b^{-3}=1/8$.",
            explanation:
              "The point means $\\log_b(1/8)=-3$, equivalently $b^{-3}=1/8$. Since $1/8=2^{-3}$ and $b>1$, the base is $b=2$.",
            difficulty: 4,
            diagnosticIntent:
              "Reverses logarithmic graph reading to infer a base from a negative-output coordinate.",
            taskType: "problem-solving",
          }),
          cartesianGraph: inversePairGraph,
        },
        qualityAnswer({
          id: "y11adv-exp-graph-qm6",
          prompt:
            "Let $f(x)=2^x$ and $g(x)=(1/2)^x$. Simplify the product $f(x)g(x)$ for every real $x$.",
          latex: "",
          answer: "1",
          acceptedAnswers: ["1.0", "one", "f(x)g(x)=1"],
          hint:
            "Rewrite one half to the power x as 2 to the power negative x.",
          explanation:
            "Since $(1/2)^x=2^{-x}$, the product is $2^x\\cdot2^{-x}=2^0=1$. The paired growth and decay graphs therefore have reciprocal y-values at each common x.",
          difficulty: 4,
          diagnosticIntent:
            "Compares growth and decay functions algebraically to identify a graph-wide invariant.",
          taskType: "analytical",
        }),
        {
          ...qualityAnswer({
            id: "y11adv-exp-graph-qm7",
            prompt:
              "For the listed integer x-values, count how many plotted points on the curve have an integer y-coordinate.",
            latex: "y=3^x,\\qquad -2\\le x\\le4",
            answer: "5",
            acceptedAnswers: ["5 points", "x=0,1,2,3,4", "five", "5.0"],
            hint:
              "Negative integer exponents give proper fractions; remember the zero exponent.",
            explanation:
              "For $x=-2,-1$, the y-values are proper fractions. For $x=0,1,2,3,4$, the values $1,3,9,27,81$ are integers, so 5 plotted points qualify.",
            difficulty: 4,
            diagnosticIntent:
              "Investigates a bounded set of exponential graph coordinates across negative, zero, and positive inputs.",
            taskType: "investigative",
          }),
          cartesianGraph: boundedExponentialGraph,
        },
        {
          ...qualityChoice({
            id: "y11adv-exp-graph-qm8",
            prompt:
              "A student says replacing $x$ by $-x$ maps $y=e^x$ onto $y=\\ln x$. Which diagnosis is correct?",
            latex: "",
            answer: "D",
            choices: [
              "The claim is correct because every inverse uses $-x$.",
              "The replacement reflects in $y=x$, producing the logarithm.",
              "The replacement translates the graph one unit left.",
              "The replacement gives $y=e^{-x}$, a y-axis reflection; the inverse $y=\\ln x$ comes from reflection in $y=x$.",
            ],
            hint:
              "Separate the transformation $f(-x)$ from the operation of swapping x and y.",
            explanation:
              "Replacing $x$ by $-x$ reflects $y=e^x$ in the y-axis and produces exponential decay $y=e^{-x}$. An inverse swaps coordinates, so $y=\\ln x$ is the reflection in $y=x$.",
            difficulty: 5,
            diagnosticIntent:
              "Diagnoses confusion between a horizontal reflection and the inverse-function reflection.",
            taskType: "analytical",
            distractorMisconceptions: {
              A: "Assumes inverse notation means negate the input.",
              B: "Assigns the wrong geometric effect to replacing x by negative x.",
              C: "Confuses reflection with horizontal translation.",
            },
          }),
          cartesianGraph: inversePairGraph,
        },
        qualityAnswer({
          id: "y11adv-exp-graph-qm9",
          prompt:
            "An exponential function $f(x)=ca^x$ has the two values shown and $c,a>0$. If $g=f^{-1}$, find $g(18)$.",
          latex: "f(0)=2,\\qquad f(2)=18",
          answer: "2",
          acceptedAnswers: ["g(18)=2", "g(18) = 2", "2.0"],
          hint:
            "The inverse reverses a known input-output pair; first identify which displayed value already gives output 18.",
          explanation:
            "The data explicitly give $f(2)=18$. An inverse reverses this pair, so $g(18)=2$. The values are also consistent with $f(x)=2\\cdot3^x$.",
          difficulty: 5,
          diagnosticIntent:
            "Synthesises exponential parameter information with inverse-function evaluation without unnecessary equation solving.",
          taskType: "synthesis",
        }),
        {
          ...qualityAnswer({
            id: "y11adv-exp-graph-qm10",
            prompt:
              "The reflected points and the origin form a triangle. Find its area in square units.",
            latex: "O=(0,0),\\qquad P=(2,4),\\qquad Q=(4,2)",
            answer: "6",
            acceptedAnswers: ["6 square units", "6 units^2", "6.0", "six"],
            hint:
              "Use one half the absolute determinant of the two position vectors from the origin.",
            explanation:
              "The area is $\\frac12|2\\cdot2-4\\cdot4|=\\frac12|4-16|=6$. The two non-origin points are paired by reflection in $y=x$.",
            difficulty: 5,
            diagnosticIntent:
              "Synthesises inverse-graph coordinate reflection with exact coordinate geometry.",
            taskType: "synthesis",
          }),
          cartesianGraph: inversePairGraph,
        },
      ],
      multiPartPractice: [
        {
          id: "y11adv-exp-graph-mp1",
          prompt: "Identify key features of the graph of $y = 2^x$.",
          latex: "y=2^x",
          answer: "1",
          hint: "Find the y-intercept by setting x=0, state the horizontal asymptote, then evaluate at x=3.",
          explanation:
            "(a) 2⁰=1, so the y-intercept is 1. (b) The graph approaches y=0 as x→−∞; the horizontal asymptote is y=0. (c) 2³=8.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the y-value of the y-intercept.",
              latex: "y=2^x\\text{ at }x=0",
              marks: 1,
              answer: "1",
              acceptedAnswers: ["1.0", "one"],
              hint: "Set x=0 and evaluate $2^0$.",
              explanation: "2⁰=1, so the y-intercept is (0,1) and the y-value is 1.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the equation of the horizontal asymptote.",
              latex: "y=2^x\\text{ as }x\\to-\\infty",
              marks: 1,
              answer: "y=0",
              acceptedAnswers: ["0", "y = 0"],
              hint: "What line does the graph approach but never cross as x becomes very negative?",
              explanation: "As x→−∞, 2ˣ→0 but never reaches it; the horizontal asymptote is y=0.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Evaluate y when x = 3.",
              latex: "y=2^3",
              marks: 1,
              answer: "8",
              acceptedAnswers: ["8.0", "eight"],
              hint: "Substitute x=3 and evaluate 2³.",
              explanation: "Substituting x=3 gives y=2³=2×2×2=8, so the plotted point is (3,8).",
            },
          ],
        },
        {
          id: "y11adv-exp-graph-mp2",
          prompt: "Identify key features of the graph of y = log₂x.",
          latex: "y=\\log_2 x",
          answer: "1",
          hint: "Find the x-intercept by setting y=0, state the vertical asymptote, then evaluate at x=8.",
          explanation:
            "(a) log₂1=0, so the x-intercept x-value is 1. (b) The graph approaches x=0 from the right but never reaches it; the vertical asymptote is x=0. (c) 2³=8, so log₂8=3.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the x-value of the x-intercept.",
              latex: "\\log_2 x=0",
              marks: 1,
              answer: "1",
              acceptedAnswers: ["1.0", "x=1"],
              hint: "Set y=0 and ask: 2 to what power gives 1?",
              explanation: "2⁰=1, so log₂1=0 and the x-intercept is at x=1.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the equation of the vertical asymptote.",
              latex: "y=\\log_2 x\\text{ as }x\\to0^+",
              marks: 1,
              answer: "x=0",
              acceptedAnswers: ["0", "x = 0"],
              hint: "The domain is x>0; what line can the graph never reach?",
              explanation: "log₂x is undefined at x=0; the graph has a vertical asymptote at x=0.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Evaluate y = log₂8.",
              latex: "\\log_2 8",
              marks: 1,
              answer: "3",
              acceptedAnswers: ["3.0", "three"],
              hint: "Ask: 2 to what power gives 8?",
              explanation: "Because 2³=8, the exponent requested by log₂8 is 3, giving the plotted point (8,3).",
            },
          ],
        },
      ],
    };
  }

  return null;
}
