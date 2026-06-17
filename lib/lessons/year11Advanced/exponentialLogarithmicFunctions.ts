import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

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
          "An exponent records repeated multiplication. In 3^4, the base 3 is the factor being repeated and the exponent 4 tells you how many copies to multiply.",
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
        practicalChoice("y11adv-exp-index-g3", "Which radical form matches the fractional index?", "B", ["$x^2$", "$\\sqrt{x}$", "$\\frac{1}{x^2}$", "$2x$"], "An index of one half means square root.", "x^{\\frac{1}{2}}"),
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
        formulaAnswer("y11adv-exp-index-m1", "Simplify the index expression.", "x^2\\cdot x^5", "x^7", ["x^(7)"]),
        formulaAnswer("y11adv-exp-index-m2", "Evaluate the negative-index expression.", "4^{-1}", "1/4", ["0.25"]),
        practicalChoice("y11adv-exp-index-m3", "Which radical form matches the displayed expression?", "D", ["$x^3$", "$\\frac{1}{\\sqrt{x}}$", "$\\sqrt[3]{x}$", "$\\sqrt{x}$"], "An index of one half means square root.", "x^{\\frac{1}{2}}"),
        formulaAnswer("y11adv-exp-index-m4", "Simplify the expression using index laws.", "\\frac{m^8\\cdot m^2}{m^5}", "m^5", ["m^(5)"]),
        practicalChoice("y11adv-exp-index-m5", "Which statement describes the basic exponential graph?", "B", ["Decay with y-intercept 0", "Growth with horizontal asymptote y = 0", "Growth with horizontal asymptote x = 0", "Linear with y-intercept 3"], "The base is greater than 1, so it is growth, and the basic asymptote is y = 0.", "y=3^x"),
        formulaAnswer("y11adv-exp-index-m6", "Evaluate the exponential function at the given input.", "f(x)=2^x,\\quad x=5", "32"),
        practicalChoice("y11adv-exp-index-m7", "A student simplifies the product by multiplying the indices. Which option identifies the error?", "A", ["The indices should be added", "The bases should be added", "The answer should be zero", "The expression is logarithmic"], "Products with the same base use addition of indices.", "x^2\\cdot x^3=x^6"),
        practicalChoice("y11adv-exp-index-m8", "Which base would produce exponential decay?", "C", ["2", "5", "$\\frac{1}{2}$", "10"], "A base between 0 and 1 gives decay.", "y=a^x"),
        formulaAnswer("y11adv-exp-index-m9", "Simplify the expression using index laws.", "(2x^3)^2", "4x^6", ["4x^(6)"]),
        practicalChoice("y11adv-exp-index-m10", "Which feature belongs to the displayed basic exponential function?", "D", ["x-intercept 1", "vertical asymptote x = 0", "y-intercept 2", "y-intercept 1"], "At x = 0, the value is 1 for this basic exponential.", "y=\\left(\\frac{1}{2}\\right)^x"),
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
          "A logarithm answers one question: what exponent do I need? For example, log base 2 of 8 is 3 because 2^3 = 8.",
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
        practicalChoice("y11adv-exp-log-g4", "Which input is allowed for a logarithm in this course?", "D", ["0", "-5", "-1", "7"], "Logarithm inputs must be positive.", "\\log_a(x)"),
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
        practicalChoice("y11adv-exp-log-m1", "Which logarithmic statement matches the displayed exponential statement?", "C", ["$\\log_4 2=16$", "$\\log_2 16=4$", "$\\log_4 16=2$", "$\\log_{16}4=2$"], "The base is 4, the result is 16, and the exponent is 2.", "4^2=16"),
        formulaAnswer("y11adv-exp-log-m2", "Evaluate the logarithm by inspection.", "\\log_5 125", "3"),
        formulaAnswer("y11adv-exp-log-m3", "Evaluate the special logarithm value.", "\\log_9 9", "1"),
        practicalChoice("y11adv-exp-log-m4", "Which expression is equivalent using the product law?", "B", ["$\\log_3 6\\log_3 2$", "$\\log_3 6+\\log_3 2$", "$\\log_3(6+2)$", "$\\log_3 6-\\log_3 2$"], "A product becomes a sum.", "\\log_3(12)"),
        practicalChoice("y11adv-exp-log-m5", "Which expression is equivalent using the power law?", "A", ["$5\\log_2 x$", "$\\log_2(5x)$", "$\\log_2 x+5$", "$(\\log_2 x)^5$"], "The exponent moves to the front.", "\\log_2(x^5)"),
        formulaAnswer("y11adv-exp-log-m6", "Evaluate the logarithm by inspection.", "\\log_2\\left(\\frac{1}{8}\\right)", "-3"),
        practicalChoice("y11adv-exp-log-m7", "Which statement identifies the domain issue?", "D", ["The base is too large", "The logarithm value must be positive", "The input should be squared first", "The logarithm input must be positive"], "Logarithm inputs cannot be zero or negative.", "\\log_3(x-4)"),
        practicalChoice("y11adv-exp-log-m8", "Which statement correctly describes the natural logarithm?", "A", ["It is logarithm base e", "It is logarithm base 10", "It is the same as multiplying by n", "It is only used for negative inputs"], "Natural logarithm means base e.", "\\ln x"),
        practicalChoice("y11adv-exp-log-m9", "Which combined expression matches the displayed log expression?", "B", ["$\\log_2(8+4-2)$", "$\\log_2\\left(\\frac{8\\cdot4}{2}\\right)$", "$\\log_2(8\\cdot4\\cdot2)$", "$\\log_2\\left(\\frac{2}{8\\cdot4}\\right)$"], "Sums become products and subtraction becomes division.", "\\log_2 8+\\log_2 4-\\log_2 2"),
        formulaAnswer("y11adv-exp-log-m10", "Evaluate the combined logarithm by inspection.", "\\log_2 8+\\log_2 4-\\log_2 2", "4"),
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
        formulaAnswer("y11adv-exp-solve-m1", "Solve by matching bases.", "2^{x+1}=64", "5", ["x=5"]),
        formulaAnswer("y11adv-exp-solve-m2", "Solve the logarithmic equation.", "\\log_3 x=4", "81", ["x=81"]),
        formulaAnswer("y11adv-exp-solve-m3", "Solve the exponential equation by matching bases.", "4^{x}=\\frac{1}{16}", "-2", ["x=-2"]),
        practicalChoice("y11adv-exp-solve-m4", "Which exact solution form is correct?", "D", ["$x=\\log_7 2$", "$x=2\\log 7$", "$x=\\log_2 7$", "$x=\\log_2 50$"], "The log base matches the exponential base.", "2^x=50"),
        formulaAnswer("y11adv-exp-solve-m5", "Solve the logarithmic equation.", "\\log_2(x-3)=4", "19", ["x=19"]),
        formulaAnswer("y11adv-exp-solve-m6", "Solve after applying the quotient law.", "\\log_2(4x)-\\log_2 2=3", "4", ["x=4"]),
        practicalChoice("y11adv-exp-solve-m7", "Which option identifies the mistake?", "A", ["The exponents should be matched only after writing the same base", "The bases should be added", "The logarithm input is negative", "The answer must be zero"], "The right side must first be written with base 3.", "3^x=27"),
        practicalChoice("y11adv-exp-solve-m8", "Which reason explains why the displayed solution must be rejected?", "C", ["It is too large", "It is not an integer", "It makes the logarithm input non-positive", "It makes the base equal to 1"], "The input x - 5 must be positive.", "\\log_2(x-5)=3,\\quad x=4"),
        formulaAnswer("y11adv-exp-solve-m9", "Solve the equation using a logarithm law first.", "\\log_3 x+\\log_3 x=4", "9", ["x=9"]),
        practicalChoice("y11adv-exp-solve-m10", "Which approximate solution best matches the equation?", "B", ["About 1.50", "About 3.00", "About 6.00", "About 16.00"], "Since 4 cubed is 64, a value near 3 is reasonable.", "4^x=60"),
      ],
    };
  }

  if (lesson.slug === "exponential-logarithmic-modelling") {
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
        practicalChoice("y11adv-exp-model-i5", "Which interpretation is correct for the displayed continuous model?", "A", ["The amount decreases over time", "The amount doubles every hour", "The amount is always 0", "The starting amount is negative"], "The negative k-value means decay.", "C=40e^{-0.2t}"),
      ],
      commonMistakes: [
        { mistake: "Treating exponential change as repeated addition.", fix: "Use repeated multiplication by the growth or decay factor." },
        { mistake: "Calling a base below 1 growth.", fix: "Bases between 0 and 1 produce decay." },
        { mistake: "Ignoring context units.", fix: "State whether the output is dollars, people, grams, milligrams, or another unit." },
        { mistake: "Typing fragile logarithmic time solutions.", fix: "For non-clean time values, use a multiple-choice rounded answer in this interface." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-exp-model-m1", "A population starts at 1000 and doubles each year. Find the population after 3 years.", "P=1000(2)^t", "8000", ["8000 people", "8,000"]),
        practicalChoice("y11adv-exp-model-m2", "Which statement describes the model?", "C", ["Growth", "No change", "Decay", "Linear increase"], "The base is between 0 and 1.", "A=600(0.75)^t"),
        formulaAnswer("y11adv-exp-model-m3", "A sample halves every day. Find the amount remaining after three days.", "A_0=64\\text{ g}", "8", ["8 g", "8 grams"]),
        formulaAnswer("y11adv-exp-model-m4", "A compound-interest model is shown. Find the balance after the given number of years.", "A=2000(1.05)^2", "2205", ["2205.00", "$2205", "$2205.00", "$2,205", "$2,205.00", "2,205", "2,205.00"]),
        practicalChoice("y11adv-exp-model-m5", "Which continuous model represents decay?", "B", ["$A=500e^{0.03t}$", "$A=500e^{-0.03t}$", "$A=500(1.03)^t$", "$A=500+0.03t$"], "A negative k-value gives continuous decay.", "\\text{Continuous exponential models}"),
        formulaAnswer("y11adv-exp-model-m6", "A bacteria culture triples each hour. Find the time needed to reach the target amount.", "A=100(3)^t,\\quad A=2700", "3", ["3 hours"]),
        practicalChoice("y11adv-exp-model-m7", "Which option identifies the modelling error?", "A", ["A five percent increase should use a factor of 1.05", "The model should be logarithmic only", "The starting amount must be zero", "The base should be negative"], "Increasing by 5% means multiplying by 1.05 each period.", "\\text{Model used: }P=4000(0.05)^t"),
        practicalChoice("y11adv-exp-model-m8", "Which interpretation matches the half-life information?", "D", ["The amount increases by 10 every 5 hours", "The amount becomes zero after 5 hours", "The amount doubles every 5 hours", "The amount halves every 5 hours"], "Half-life is the time taken to halve.", "\\text{Half-life }=5\\text{ hours}"),
        practicalChoice("y11adv-exp-model-m9", "Which approximate time best matches the target value?", "C", ["About 2.0 hours", "About 4.0 hours", "About 6.6 hours", "About 12.0 hours"], "The solution needs logarithms and is between 6 and 7 hours.", "50=120e^{-0.13t}"),
        formulaAnswer("y11adv-exp-model-m10", "A medicine model is shown. Find the amount after the given time.", "M=80(0.5)^t,\\quad t=2", "20", ["20 mg"]),
      ],
    };
  }

  if (lesson.slug === "exponential-logarithmic-functions-exam-practice") {
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
        formulaAnswer("y11adv-exp-exam-i1", "Evaluate the negative-index expression. Give the exact fraction.", "3^{-2}", "1/9"),
        practicalChoice("y11adv-exp-exam-i2", "Which logarithmic statement matches the displayed exponential statement?", "D", ["$\\log_6 2=36$", "$\\log_2 36=6$", "$\\log_{36}6=2$", "$\\log_6 36=2$"], "The base is 6, the result is 36, and the exponent is 2.", "6^2=36"),
        practicalChoice("y11adv-exp-exam-i3", "Which expression uses the quotient law correctly?", "B", ["$\\log_4 12+\\log_4 3$", "$\\log_4 12-\\log_4 3$", "$\\log_4(12-3)$", "$\\log_4 12\\log_4 3$"], "A quotient becomes subtraction.", "\\log_4\\left(\\frac{12}{3}\\right)"),
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
        formulaAnswer("y11adv-exp-exam-m1", "Simplify the index expression.", "a^3\\cdot a^4", "a^7", ["a^(7)"]),
        formulaAnswer("y11adv-exp-exam-m2", "Evaluate the logarithm by inspection.", "\\log_2 16", "4"),
        formulaAnswer("y11adv-exp-exam-m3", "Evaluate the fractional-index expression.", "64^{\\frac{1}{2}}", "8"),
        practicalChoice("y11adv-exp-exam-m4", "Which statement is equivalent to the displayed logarithmic equation?", "C", ["$2^5=x$", "$x^2=5$", "$2^x=5$", "$5^x=2$"], "Convert logarithmic form to exponential form.", "\\log_2 5=x"),
        formulaAnswer("y11adv-exp-exam-m5", "Solve by matching bases.", "3^{x+1}=81", "3", ["x=3"]),
        practicalChoice("y11adv-exp-exam-m6", "Which expression correctly applies the product law?", "A", ["$\\log_2 5+\\log_2 8$", "$\\log_2 5\\log_2 8$", "$\\log_2(5+8)$", "$\\log_2 5-\\log_2 8$"], "A product inside the logarithm becomes a sum.", "\\log_2(40)"),
        practicalChoice("y11adv-exp-exam-m7", "Which option identifies the error in the displayed simplification?", "D", ["The base should be changed to 10", "The expression is linear", "The answer should be negative", "The indices should be subtracted, not divided"], "When dividing powers with the same base, subtract indices.", "\\frac{x^8}{x^2}=x^4"),
        practicalChoice("y11adv-exp-exam-m8", "Which statement correctly describes the logarithm domain?", "B", ["The output must be positive", "The input must be positive", "The base must be zero", "The exponent must be an integer"], "The input to a logarithm must be positive.", "\\log_a x"),
        formulaAnswer("y11adv-exp-exam-m9", "A bacteria model is shown. Find the amount at the given time.", "B=250(2)^t,\\quad t=4", "4000", ["4000 bacteria", "4,000"]),
        practicalChoice("y11adv-exp-exam-m10", "Which approximate time best matches the target in the compound-interest model?", "C", ["About 2.2 years", "About 5.0 years", "About 9.0 years", "About 18.0 years"], "Solving uses logarithms; doubling at 8% takes about 9 years.", "2P=P(1.08)^t"),
      ],
    };
  }

  if (lesson.slug === "graphing-exponential-logarithmic-functions") {
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
          "As x decreases without bound, 3^x approaches 0 but never reaches it.",
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
        formulaAnswer(
          "y11adv-exp-graph-m1",
          "Evaluate the exponential function at the given input.",
          "y=2^x,\\quad x=4",
          "16"
        ),
        practicalChoice(
          "y11adv-exp-graph-m2",
          "Which point is the y-intercept of the displayed exponential function?",
          "A",
          ["$(0,1)$", "$(1,0)$", "$(0,5)$", "$(5,0)$"],
          "Setting x=0 gives 5⁰=1, so the y-intercept is (0,1).",
          "y=5^x"
        ),
        practicalChoice(
          "y11adv-exp-graph-m3",
          "Which line is the horizontal asymptote of the displayed exponential function?",
          "B",
          ["$y=4$", "$y=0$", "$x=0$", "$x=4$"],
          "As x decreases without bound, 4^x approaches 0 but never reaches it.",
          "y=4^x"
        ),
        practicalChoice(
          "y11adv-exp-graph-m4",
          "Which point is the x-intercept of the displayed logarithmic function?",
          "C",
          ["$(0,1)$", "$(3,0)$", "$(1,0)$", "$(0,3)$"],
          "log₃1=0 since 3⁰=1, so the graph passes through (1,0).",
          "y=\\log_3 x"
        ),
        practicalChoice(
          "y11adv-exp-graph-m5",
          "Which describes the range of the displayed logarithmic function?",
          "A",
          ["All real numbers", "$y>0$", "$y\\geq0$", "$y\\geq1$"],
          "As x grows or approaches 0 from the right, log₂x takes any real value — positive, negative, or zero.",
          "y=\\log_2 x"
        ),
        formulaAnswer(
          "y11adv-exp-graph-m6",
          "Evaluate the exponential function at the given input.",
          "y=2^x,\\quad x=5",
          "32"
        ),
        practicalChoice(
          "y11adv-exp-graph-m7",
          "Which value best approximates the special constant e?",
          "D",
          ["2.314", "3.142", "1.618", "2.718"],
          "Euler's number e ≈ 2.718 is the base of the natural exponential and natural logarithm.",
          "e\\approx?"
        ),
        practicalChoice(
          "y11adv-exp-graph-m8",
          "Which transformation maps y=eˣ onto y=lnx?",
          "B",
          ["Reflection in $y=0$", "Reflection in $y=x$", "Rotation by 90°", "Reflection in $x=0$"],
          "Inverse functions swap x and y coordinates, which is geometrically a reflection in the line y=x.",
          "y=e^x\\longleftrightarrow y=\\ln x"
        ),
        practicalChoice(
          "y11adv-exp-graph-m9",
          "Which statement about the displayed function is TRUE?",
          "C",
          [
            "The domain is all real numbers",
            "The y-intercept is $(0,1)$",
            "$y=\\ln x$ is the inverse of $y=e^x$",
            "The horizontal asymptote is $y=0$",
          ],
          "ln x = logₑx and eˣ are inverses: each undoes the other.",
          "y=\\ln x"
        ),
        practicalChoice(
          "y11adv-exp-graph-m10",
          "Which statement about the displayed function is FALSE?",
          "D",
          [
            "The graph passes through $(1,0)$",
            "The vertical asymptote is $x=0$",
            "The function is increasing for $x>0$",
            "The domain includes all real numbers",
          ],
          "The domain of log₂x is x>0 only; it is undefined for x≤0.",
          "y=\\log_2 x"
        ),
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
              hint: "Substitute x=3 and evaluate 2³.",
              explanation: "2³ = 2×2×2 = 8.",
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
              hint: "Ask: 2 to what power gives 8?",
              explanation: "2³=8, so log₂8=3.",
            },
          ],
        },
      ],
    };
  }

  return null;
}
