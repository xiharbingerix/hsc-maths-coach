import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function algAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Identify the algebraic method first, then apply it step by step.",
    explanation: `The answer is ${answer}.`,
  };
}

function algChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({
      label,
      text: choices[i],
    })),
    answer,
    hint: "Apply the algebraic rule, then check each option.",
    explanation,
  };
}

// ─── Lesson 1: Expanding Binomial Products ───────────────────────────────────

const expandingWorkedExamples: WorkedExample[] = [
  {
    title: "Expanding a single bracket",
    questionLatex: "\\text{Expand }3(x+4).",
    steps: [
      { explanation: "Multiply 3 by each term inside the bracket.", latex: "3\\times x=3x,\\quad 3\\times 4=12" },
      { explanation: "Write the expanded expression.", latex: "3(x+4)=3x+12" },
    ],
    finalAnswerLatex: "3x+12",
  },
  {
    title: "Expanding two brackets using FOIL",
    questionLatex: "\\text{Expand }(x+3)(x+5).",
    steps: [
      { explanation: "First: multiply the first term in each bracket.", latex: "x\\times x=x^2" },
      { explanation: "Outer: multiply the outer pair.", latex: "x\\times 5=5x" },
      { explanation: "Inner: multiply the inner pair.", latex: "3\\times x=3x" },
      { explanation: "Last: multiply the last terms.", latex: "3\\times 5=15" },
      { explanation: "Collect the x-terms.", latex: "x^2+5x+3x+15=x^2+8x+15" },
    ],
    finalAnswerLatex: "x^2+8x+15",
  },
  {
    title: "Expanding two brackets with a negative term",
    questionLatex: "\\text{Expand }(2x-1)(x+4).",
    steps: [
      { explanation: "First.", latex: "2x\\times x=2x^2" },
      { explanation: "Outer.", latex: "2x\\times 4=8x" },
      { explanation: "Inner — carry the negative sign.", latex: "-1\\times x=-x" },
      { explanation: "Last.", latex: "-1\\times 4=-4" },
      { explanation: "Collect the x-terms: 8x − x = 7x.", latex: "2x^2+8x-x-4=2x^2+7x-4" },
    ],
    finalAnswerLatex: "2x^2+7x-4",
  },
];

const expandingGuided: PracticeQuestion[] = [
  algAnswer("exp-bp-g1", "Expand 5(x + 3).", "5(x+3)", "5x + 15", ["5x+15"]),
  algChoice("exp-bp-g2", "Which is the correct expansion of (x + 2)(x + 6)?", "A",
    ["$x^2+8x+12$", "$x^2+6x+12$", "$x^2+8x+8$", "$x^2+12$"],
    "FOIL: x·x = x², x·6 + 2·x = 8x, 2·6 = 12. Result: x² + 8x + 12.",
    "(x+2)(x+6)"),
  algAnswer("exp-bp-g3", "What is the coefficient of x when (x + 4)(x + 5) is expanded?", "(x+4)(x+5)", "9", ["9"]),
  algChoice("exp-bp-g4", "Which is the correct expansion of (x − 3)(x + 2)?", "A",
    ["$x^2-x-6$", "$x^2+x-6$", "$x^2-x+6$", "$x^2-6$"],
    "FOIL: x·x = x², x·2 + (−3)·x = −x, (−3)·2 = −6. Result: x² − x − 6.",
    "(x-3)(x+2)"),
];

const expandingIndependent: PracticeQuestion[] = [
  algChoice("exp-bp-i1", "Which is the correct expansion of (x + 1)(x − 7)?", "A",
    ["$x^2-6x-7$", "$x^2-8x-7$", "$x^2-6x+7$", "$x^2+6x-7$"],
    "FOIL: x·x = x², x·(−7) + 1·x = −6x, 1·(−7) = −7. Result: x² − 6x − 7.",
    "(x+1)(x-7)"),
  algChoice("exp-bp-i2", "Which is the correct expansion of −3(x − 4)?", "A",
    ["$-3x+12$", "$-3x-12$", "$3x-12$", "$-3x-4$"],
    "Multiply −3 by x: −3x. Multiply −3 by −4: +12. Result: −3x + 12.",
    "-3(x-4)"),
  algAnswer("exp-bp-i3", "What is the coefficient of x when (2x + 3)(x − 4) is expanded?", "(2x+3)(x-4)", "-5", ["-5"]),
  algAnswer("exp-bp-i4", "What is the constant term when (x + 7)(x − 3) is expanded?", "(x+7)(x-3)", "-21", ["-21"]),
  algChoice("exp-bp-i5", "Which is the correct expansion of (3x + 1)(x − 5)?", "A",
    ["$3x^2-14x-5$", "$3x^2+14x-5$", "$3x^2-14x+5$", "$3x^2-5x-5$"],
    "FOIL: 3x·x = 3x², 3x·(−5) + 1·x = −14x, 1·(−5) = −5. Result: 3x² − 14x − 5.",
    "(3x+1)(x-5)"),
];

const expandingMistakes = [
  { mistake: "Forgetting to multiply the outside term by every term inside the bracket.", fix: "In 3(x + 4), multiply 3 by both x and 4 — not just the first term." },
  { mistake: "Losing the negative sign when expanding, e.g. writing (x − 3)(x + 2) = x² + x − 6.", fix: "In the inner product, −3 × x = −3x. The sign belongs to 3, so the x-terms give 2x − 3x = −x." },
  { mistake: "Adding instead of multiplying the last terms, e.g. writing 12 instead of 15 for (x + 3)(x + 5).", fix: "The last product is 3 × 5 = 15, not 3 + 5." },
  { mistake: "Forgetting to collect like terms, leaving the expansion with four terms.", fix: "After FOIL, always collect the two x-terms into one." },
];

const expandingMastery: PracticeQuestion[] = [
  algAnswer("exp-bp-m1", "Expand 4(x + 3).", "4(x+3)", "4x + 12", ["4x+12"]),
  algChoice("exp-bp-m2", "Which is the correct expansion of (x + 5)(x + 2)?", "A",
    ["$x^2+7x+10$", "$x^2+5x+10$", "$x^2+7x+7$", "$x^2+10$"],
    "FOIL: x² + 2x + 5x + 10 = x² + 7x + 10.",
    "(x+5)(x+2)"),
  algAnswer("exp-bp-m3", "What is the constant term when (x + 6)(x − 2) is expanded?", "(x+6)(x-2)", "-12", ["-12"]),
  algChoice("exp-bp-m4", "Which is the correct expansion of (x − 4)(x − 3)?", "A",
    ["$x^2-7x+12$", "$x^2+7x+12$", "$x^2-7x-12$", "$x^2-12$"],
    "FOIL: x² − 3x − 4x + 12 = x² − 7x + 12.",
    "(x-4)(x-3)"),
  algAnswer("exp-bp-m5", "What is the x-coefficient when (x + 9)(x − 4) is expanded?", "(x+9)(x-4)", "5", ["5"]),
  algChoice("exp-bp-m6", "Which is the correct expansion of (x + 3)(x − 3)?", "A",
    ["$x^2-9$", "$x^2+9$", "$x^2-6x-9$", "$x^2-3$"],
    "FOIL: x² − 3x + 3x − 9 = x² − 9. The middle terms cancel.",
    "(x+3)(x-3)"),
  algAnswer("exp-bp-m7", "Expand −2(x + 5). What is the constant term?", "-2(x+5)", "-10", ["-10"]),
  algChoice("exp-bp-m8", "Which is the correct expansion of (3x − 2)(2x + 5)?", "A",
    ["$6x^2+11x-10$", "$6x^2-11x-10$", "$6x^2+11x+10$", "$6x^2+15x-10$"],
    "FOIL: 6x² + 15x − 4x − 10 = 6x² + 11x − 10.",
    "(3x-2)(2x+5)"),
  algChoice("exp-bp-m9", "Which is the correct expansion of (x − 5)²?", "B",
    ["$x^2-25$", "$x^2-10x+25$", "$x^2+10x+25$", "$x^2-10x-25$"],
    "(x − 5)² = (x − 5)(x − 5). FOIL: x² − 5x − 5x + 25 = x² − 10x + 25.",
    "(x-5)^2"),
  algChoice("exp-bp-m10", "A student expands (x − 4)² and writes x² − 16. What is wrong?", "B",
    ["The sign of 16 is incorrect", "The middle term −8x was not included", "x² should be x", "The answer is correct"],
    "(x − 4)² = x² − 8x + 16. The middle term −8x appears from the inner and outer products.",
    "\\text{Identify the error in }(x-4)^2=x^2-16"),
];

// ─── Lesson 2: Factorising Algebraic Expressions ─────────────────────────────

const factorisingExpressionsWorkedExamples: WorkedExample[] = [
  {
    title: "Factorising a two-term expression",
    questionLatex: "\\text{Factorise }6x+12.",
    steps: [
      { explanation: "Find the HCF of 6x and 12. Both are divisible by 6.", latex: "\\text{HCF}=6" },
      { explanation: "Write 6 outside a bracket and divide each term by 6.", latex: "6x\\div 6=x,\\quad 12\\div 6=2" },
      { explanation: "Write the factorised form.", latex: "6x+12=6(x+2)" },
    ],
    finalAnswerLatex: "6(x+2)",
  },
  {
    title: "Factorising with a variable common factor",
    questionLatex: "\\text{Factorise }4x^2+8x.",
    steps: [
      { explanation: "The HCF includes the variable: both terms share a factor of 4x.", latex: "\\text{HCF}=4x" },
      { explanation: "Divide each term by 4x.", latex: "4x^2\\div 4x=x,\\quad 8x\\div 4x=2" },
      { explanation: "Write the factorised form.", latex: "4x^2+8x=4x(x+2)" },
    ],
    finalAnswerLatex: "4x(x+2)",
  },
  {
    title: "Factorising a three-term expression",
    questionLatex: "\\text{Factorise }3x^2-12x+9.",
    steps: [
      { explanation: "Find the HCF of 3x², 12x and 9. All are divisible by 3.", latex: "\\text{HCF}=3" },
      { explanation: "Divide each term by 3.", latex: "3x^2\\div 3=x^2,\\quad -12x\\div 3=-4x,\\quad 9\\div 3=3" },
      { explanation: "Write the factorised form.", latex: "3x^2-12x+9=3(x^2-4x+3)" },
    ],
    finalAnswerLatex: "3(x^2-4x+3)",
  },
];

const factorisingExpressionsGuided: PracticeQuestion[] = [
  algAnswer("fac-ex-g1", "What is the highest common factor of 8x and 12?", "\\text{HCF of }8x\\text{ and }12", "4", ["4"]),
  algChoice("fac-ex-g2", "Which is the correct factorisation of 6x + 18?", "A",
    ["$6(x+3)$", "$3(x+6)$", "$6(x+12)$", "$2(3x+9)$"],
    "The HCF of 6x and 18 is 6. Dividing: 6x ÷ 6 = x, 18 ÷ 6 = 3. Result: 6(x + 3).",
    "6x+18"),
  algChoice("fac-ex-g3", "Which is the correct factorisation of 4x² + 8x?", "A",
    ["$4x(x+2)$", "$4(x^2+2x)$", "$2x(2x+4)$", "$x(4x+8)$"],
    "The HCF is 4x. Dividing: 4x² ÷ 4x = x, 8x ÷ 4x = 2. Result: 4x(x + 2). Option B is not fully factorised.",
    "4x^2+8x"),
  algAnswer("fac-ex-g4", "When 5x² − 10x is factorised as 5x(□), what goes inside the bracket?", "5x^2-10x=5x(\\,\\square\\,)", "x − 2", ["x-2", "x − 2"]),
];

const factorisingExpressionsIndependent: PracticeQuestion[] = [
  algAnswer("fac-ex-i1", "What is the highest common factor of 15x and 25?", "\\text{HCF of }15x\\text{ and }25", "5", ["5"]),
  algChoice("fac-ex-i2", "Which is the correct factorisation of 3x² − 6x + 9?", "A",
    ["$3(x^2-2x+3)$", "$3x(x-2)+9$", "$3(x^2-6x+9)$", "$x(3x-6)+9$"],
    "The HCF is 3. Dividing all three terms by 3: x² − 2x + 3. Result: 3(x² − 2x + 3).",
    "3x^2-6x+9"),
  algChoice("fac-ex-i3", "Which is the correct factorisation of 6x³ + 9x²?", "A",
    ["$3x^2(2x+3)$", "$3x(2x^2+3x)$", "$6x^2(x+1.5)$", "$x^2(6x+9)$"],
    "The HCF is 3x². Dividing: 6x³ ÷ 3x² = 2x, 9x² ÷ 3x² = 3. Result: 3x²(2x + 3).",
    "6x^3+9x^2"),
  algAnswer("fac-ex-i4", "When 2x² − 8x is factorised as 2x(□), what goes inside the bracket?", "2x^2-8x=2x(\\,\\square\\,)", "x − 4", ["x-4", "x − 4"]),
  algChoice("fac-ex-i5", "A student factorises 10x + 15 as 5(2x + 10). What error did they make?", "A",
    ["The bracket should be (2x + 3) — 15 ÷ 5 = 3, not 10", "Nothing is wrong — 5 is a valid factor", "The HCF should be 10", "They should divide by 5x"],
    "5 × (2x + 10) = 10x + 50, which is wrong. 15 ÷ 5 = 3, so the correct factorisation is 5(2x + 3).",
    "\\text{Identify the error in }5(2x+10)"),
];

const factorisingExpressionsMistakes = [
  { mistake: "Choosing a factor that does not divide every term, e.g. writing 4x(x + 8x) for 4x² + 8x.", fix: "Divide every term by the HCF and check by expanding. 4x² ÷ 4x = x and 8x ÷ 4x = 2, so the bracket is (x + 2)." },
  { mistake: "Factorising partially, e.g. writing 2(2x² + 4x) instead of 4x(x + 2) for 4x² + 8x.", fix: "Check whether the expression inside the bracket shares any further factors. The HCF should be the largest possible factor." },
  { mistake: "Including the HCF inside the bracket as well as outside it.", fix: "Once the HCF is written outside the bracket, divide each original term by it. The HCF itself does not appear again inside." },
  { mistake: "Dividing only the first term by the HCF and leaving later terms unchanged.", fix: "Every term must be divided by the HCF. Check all terms in the bracket multiply back to the original expression." },
];

const factorisingExpressionsMastery: PracticeQuestion[] = [
  algAnswer("fac-ex-m1", "What is the HCF of 12x and 18?", "\\text{HCF of }12x\\text{ and }18", "6", ["6"]),
  algChoice("fac-ex-m2", "Which is the correct factorisation of 8x + 20?", "A",
    ["$4(2x+5)$", "$4(2x+20)$", "$2(4x+10)$", "$8(x+2.5)$"],
    "The HCF of 8x and 20 is 4. Dividing: 2x + 5. Result: 4(2x + 5).",
    "8x+20"),
  algChoice("fac-ex-m3", "Which is the correct factorisation of 5x² − 15x?", "A",
    ["$5x(x-3)$", "$5(x^2-3)$", "$x(5x-15)$", "$5x(x+3)$"],
    "The HCF is 5x. Dividing: x − 3. Result: 5x(x − 3).",
    "5x^2-15x"),
  algAnswer("fac-ex-m4", "When 7x + 21 is factorised as 7(□), what goes inside the bracket?", "7x+21=7(\\,\\square\\,)", "x + 3", ["x+3", "x + 3"]),
  algChoice("fac-ex-m5", "Which is the correct factorisation of 9x² + 12x?", "A",
    ["$3x(3x+4)$", "$3(3x^2+4x)$", "$x(9x+12)$", "$9x(x+\\frac{4}{3})$"],
    "The HCF is 3x. Dividing: 3x + 4. Result: 3x(3x + 4).",
    "9x^2+12x"),
  algAnswer("fac-ex-m6", "What is the HCF of 4x³ and 8x²?", "\\text{HCF of }4x^3\\text{ and }8x^2", "4x²", ["4x^2", "4x²"]),
  algChoice("fac-ex-m7", "Which is the correct factorisation of 2x² − 6x + 4?", "A",
    ["$2(x^2-3x+2)$", "$2(x^2-6x+4)$", "$2x(x-3)+4$", "$x(2x-6+4)$"],
    "The HCF of all three terms is 2. Dividing: x² − 3x + 2. Result: 2(x² − 3x + 2).",
    "2x^2-6x+4"),
  algChoice("fac-ex-m8", "Which expression cannot be factorised by removing a common factor other than 1?", "C",
    ["$6x+9$", "$x^2+5x$", "$x^2+3x+2$", "$4x^2-8x$"],
    "x² + 3x + 2 has terms with no shared factor: HCF of x², 3x and 2 is 1.",
    "\\text{Identify the expression with HCF}=1"),
  algAnswer("fac-ex-m9", "When 6x² − 9xy is factorised as 3x(□), what goes inside the bracket?", "6x^2-9xy=3x(\\,\\square\\,)", "2x − 3y", ["2x-3y", "2x − 3y"]),
  algChoice("fac-ex-m10", "A student factorises 12x² + 18x as 6(2x² + 3x). A second student gets 6x(2x + 3). Whose answer is fully factorised?", "B",
    ["First student — 6 is a valid factor", "Second student — 6x is the full HCF", "Both — any common factor is acceptable", "Neither — the HCF is 12x"],
    "The HCF of 12x² and 18x is 6x, so 6x(2x + 3) is fully factorised. The first student left a common x inside the bracket.",
    "\\text{Select the fully factorised form}"),
];

// ─── Lesson 3: Factorising Quadratic Trinomials ───────────────────────────────

const factorisingQuadraticsWorkedExamples: WorkedExample[] = [
  {
    title: "Factorising with two positive numbers",
    questionLatex: "\\text{Factorise }x^2+7x+12.",
    steps: [
      { explanation: "Find two numbers that multiply to 12 and add to 7.", latex: "3\\times 4=12,\\quad 3+4=7" },
      { explanation: "Write the factorised form using those numbers.", latex: "x^2+7x+12=(x+3)(x+4)" },
    ],
    finalAnswerLatex: "(x+3)(x+4)",
  },
  {
    title: "Factorising with opposite signs",
    questionLatex: "\\text{Factorise }x^2-x-6.",
    steps: [
      { explanation: "The product is −6 (negative), so the pair has opposite signs. The sum is −1.", latex: "(-3)\\times 2=-6,\\quad -3+2=-1" },
      { explanation: "Write the factorised form.", latex: "x^2-x-6=(x-3)(x+2)" },
    ],
    finalAnswerLatex: "(x-3)(x+2)",
  },
  {
    title: "Factorising with two negative numbers",
    questionLatex: "\\text{Factorise }x^2-5x+6.",
    steps: [
      { explanation: "The product is 6 (positive) and the sum is −5 (negative), so both numbers are negative.", latex: "(-2)\\times(-3)=6,\\quad -2+(-3)=-5" },
      { explanation: "Write the factorised form.", latex: "x^2-5x+6=(x-2)(x-3)" },
    ],
    finalAnswerLatex: "(x-2)(x-3)",
  },
];

const factorisingQuadraticsGuided: PracticeQuestion[] = [
  algAnswer("fac-qt-g1", "For x² + 8x + 15, find two numbers that multiply to 15 and add to 8.", "\\text{Find }p,q:\\quad p\\times q=15,\\quad p+q=8", "3 and 5", ["3,5", "5 and 3", "5,3"]),
  algChoice("fac-qt-g2", "Which is the correct factorisation of x² + 7x + 12?", "A",
    ["$(x+3)(x+4)$", "$(x+2)(x+6)$", "$(x+1)(x+12)$", "$(x+7)(x+1)$"],
    "Need p × q = 12 and p + q = 7. The pair 3 and 4 works: (x + 3)(x + 4).",
    "x^2+7x+12"),
  algChoice("fac-qt-g3", "Which is the correct factorisation of x² − 3x − 10?", "A",
    ["$(x-5)(x+2)$", "$(x+5)(x-2)$", "$(x-10)(x+1)$", "$(x-1)(x+10)$"],
    "Need p × q = −10, p + q = −3. The pair −5 and 2 works: (x − 5)(x + 2).",
    "x^2-3x-10"),
  algAnswer("fac-qt-g4", "In the factorisation of x² + 9x + 20, what is the larger of the two numbers used?", "x^2+9x+20", "5", ["5"]),
];

const factorisingQuadraticsIndependent: PracticeQuestion[] = [
  algChoice("fac-qt-i1", "Which is the correct factorisation of x² + 5x + 6?", "A",
    ["$(x+2)(x+3)$", "$(x+1)(x+6)$", "$(x+5)(x+1)$", "$(x+6)(x-1)$"],
    "Need p × q = 6, p + q = 5. The pair 2 and 3 works: (x + 2)(x + 3).",
    "x^2+5x+6"),
  algChoice("fac-qt-i2", "Which is the correct factorisation of x² − 6x + 8?", "A",
    ["$(x-2)(x-4)$", "$(x+2)(x+4)$", "$(x-8)(x+1)$", "$(x-2)(x+4)$"],
    "Product = 8 (positive), sum = −6 (negative): both numbers are negative. −2 and −4 work.",
    "x^2-6x+8"),
  algAnswer("fac-qt-i3", "In the factorisation (x + p)(x + q) of x² − 2x − 15, what is the value of p × q?", "x^2-2x-15", "-15", ["-15"]),
  algChoice("fac-qt-i4", "Which is the correct factorisation of x² + 2x − 15?", "A",
    ["$(x+5)(x-3)$", "$(x-5)(x+3)$", "$(x+15)(x-1)$", "$(x-15)(x+1)$"],
    "Need p × q = −15, p + q = 2. The pair 5 and −3 works: (x + 5)(x − 3).",
    "x^2+2x-15"),
  algChoice("fac-qt-i5", "The expression x² + 6x + k factorises as (x + 2)(x + q). What is k?", "C",
    ["$k=4$", "$k=6$", "$k=8$", "$k=12$"],
    "From x² + 6x + k = (x + 2)(x + q): 2 + q = 6 so q = 4, and k = 2 × 4 = 8.",
    "x^2+6x+k=(x+2)(x+q)"),
];

const factorisingQuadraticsMistakes = [
  { mistake: "Choosing numbers that multiply to c but do not add to b.", fix: "Always check both conditions: the pair must satisfy p × q = c AND p + q = b." },
  { mistake: "Getting the signs wrong, e.g. writing (x + 3)(x − 4) for x² − x − 12 instead of (x + 3)(x − 4)… wait — always substitute back to check.", fix: "Expand your answer by FOIL and check it matches the original expression before writing the final answer." },
  { mistake: "When c is positive and b is negative, using one positive and one negative number.", fix: "If the product c is positive, both numbers share the same sign. If b is also negative, both numbers must be negative." },
  { mistake: "Writing the larger or smaller number in the wrong bracket, e.g. (x + 12)(x + 1) instead of (x + 3)(x + 4) for x² + 7x + 12.", fix: "Any pair that satisfies both conditions is correct. Check that p × q = c and p + q = b, regardless of which bracket each number goes in." },
];

const factorisingQuadraticsMastery: PracticeQuestion[] = [
  algAnswer("fac-qt-m1", "What two numbers multiply to 10 and add to 7?", "p\\times q=10,\\quad p+q=7", "2 and 5", ["2,5", "5 and 2", "5,2"]),
  algChoice("fac-qt-m2", "Which is the correct factorisation of x² + 9x + 18?", "A",
    ["$(x+3)(x+6)$", "$(x+2)(x+9)$", "$(x+1)(x+18)$", "$(x+9)(x+9)$"],
    "Need p × q = 18, p + q = 9. The pair 3 and 6 works.",
    "x^2+9x+18"),
  algChoice("fac-qt-m3", "Which is the correct factorisation of x² − 4x − 12?", "A",
    ["$(x-6)(x+2)$", "$(x+6)(x-2)$", "$(x-4)(x-3)$", "$(x-12)(x+1)$"],
    "Need p × q = −12, p + q = −4. The pair −6 and 2 works.",
    "x^2-4x-12"),
  algAnswer("fac-qt-m4", "In the factorisation of x² + 11x + 30, what is the larger of the two numbers used?", "x^2+11x+30", "6", ["6"]),
  algChoice("fac-qt-m5", "Which is the correct factorisation of x² − 8x + 15?", "A",
    ["$(x-3)(x-5)$", "$(x+3)(x+5)$", "$(x-3)(x+5)$", "$(x-15)(x+1)$"],
    "Product = 15 (positive), sum = −8 (negative): both numbers negative. −3 and −5 work.",
    "x^2-8x+15"),
  algAnswer("fac-qt-m6", "What is the product p × q needed when factorising x² + x − 12?", "x^2+x-12", "-12", ["-12"]),
  algChoice("fac-qt-m7", "Which is the correct factorisation of x² − x − 20?", "A",
    ["$(x-5)(x+4)$", "$(x+5)(x-4)$", "$(x-20)(x+1)$", "$(x-4)(x+5)$"],
    "Need p × q = −20, p + q = −1. The pair −5 and 4 works.",
    "x^2-x-20"),
  algChoice("fac-qt-m8", "If x² + bx + 12 = (x + 3)(x + 4), what is b?", "C",
    ["$b=3$", "$b=4$", "$b=7$", "$b=12$"],
    "Expanding (x + 3)(x + 4) = x² + 7x + 12. So b = 7.",
    "x^2+bx+12=(x+3)(x+4)"),
  algChoice("fac-qt-m9", "The expression x² − kx + 8 factorises as (x − 4)(x − 2). What is k?", "C",
    ["$k=2$", "$k=4$", "$k=6$", "$k=8$"],
    "Expanding (x − 4)(x − 2) = x² − 6x + 8. So k = 6.",
    "x^2-kx+8=(x-4)(x-2)"),
  algChoice("fac-qt-m10", "Which expression CANNOT be factorised in the form (x + p)(x + q) with integer values of p and q?", "B",
    ["$x^2+7x+12$", "$x^2+5x+8$", "$x^2-3x-10$", "$x^2+6x+9$"],
    "For x² + 5x + 8: need p × q = 8 and p + q = 5. The only integer pairs for 8 are (1,8) sum 9 and (2,4) sum 6 — neither gives 5.",
    "\\text{Identify the unfactorisable expression}"),
];

// ─── Lesson 4: Difference of Two Squares ─────────────────────────────────────

const dotsWorkedExamples: WorkedExample[] = [
  {
    title: "Applying the rule to a simple expression",
    questionLatex: "\\text{Factorise }x^2-16.",
    steps: [
      { explanation: "Recognise x² = (x)² and 16 = (4)², with a minus sign between them.", latex: "x^2-16=(x)^2-(4)^2" },
      { explanation: "Apply the rule a² − b² = (a − b)(a + b) with a = x and b = 4.", latex: "=(x-4)(x+4)" },
    ],
    finalAnswerLatex: "(x-4)(x+4)",
  },
  {
    title: "Factorising when the coefficient of x² is a perfect square",
    questionLatex: "\\text{Factorise }9x^2-25.",
    steps: [
      { explanation: "Identify the square roots: 9x² = (3x)² and 25 = (5)².", latex: "9x^2-25=(3x)^2-(5)^2" },
      { explanation: "Apply the rule with a = 3x and b = 5.", latex: "=(3x-5)(3x+5)" },
    ],
    finalAnswerLatex: "(3x-5)(3x+5)",
  },
  {
    title: "Checking whether the rule applies",
    questionLatex: "\\text{Explain why }x^2+16\\text{ cannot be factorised using difference of two squares.}",
    steps: [
      { explanation: "The rule a² − b² = (a − b)(a + b) requires a subtraction sign.", latex: "x^2+16\\text{ uses addition, not subtraction}" },
      { explanation: "A sum of two squares does not factorise using this rule.", latex: "\\text{DOTS requires a minus sign}" },
    ],
    finalAnswerLatex: "x^2+16\\text{ cannot be factorised using DOTS.}",
  },
];

const dotsGuided: PracticeQuestion[] = [
  algAnswer("dots-g1", "Factorise x² − 25. What is the value of b where x² − 25 = (x − b)(x + b)?", "x^2-25=(x-b)(x+b)", "5", ["5"]),
  algChoice("dots-g2", "Which is the correct factorisation of x² − 36?", "A",
    ["$(x-6)(x+6)$", "$(x-6)^2$", "$(x-9)(x+4)$", "$(x-6)(x-6)$"],
    "36 = 6². Apply DOTS with a = x, b = 6: (x − 6)(x + 6). Both factors must have opposite signs.",
    "x^2-36"),
  algAnswer("dots-g3", "In the factorisation of 9x² − 4, what is a where 9x² = (a)²?", "9x^2=(a)^2", "3x", ["3x"]),
  algChoice("dots-g4", "Why can x² + 9 not be factorised using the difference of two squares?", "B",
    ["9 is not a perfect square", "There is no subtraction sign", "x is not a perfect square", "x² is an even power"],
    "The difference of two squares rule requires subtraction. x² + 9 uses addition.",
    "x^2+9"),
];

const dotsIndependent: PracticeQuestion[] = [
  algChoice("dots-i1", "Which is the correct factorisation of x² − 64?", "A",
    ["$(x-8)(x+8)$", "$(x-8)^2$", "$(x-32)(x+2)$", "$(x-4)(x+16)$"],
    "64 = 8². Apply DOTS: (x − 8)(x + 8).",
    "x^2-64"),
  algAnswer("dots-i2", "What is the square root of 25x²?", "\\sqrt{25x^2}", "5x", ["5x"]),
  algChoice("dots-i3", "Which is the correct factorisation of 25x² − 4?", "A",
    ["$(5x-2)(5x+2)$", "$(5x-4)(5x+4)$", "$(25x-2)(x+2)$", "$(5x-2)^2$"],
    "25x² = (5x)², 4 = (2)². Apply DOTS: (5x − 2)(5x + 2).",
    "25x^2-4"),
  algChoice("dots-i4", "Which expression can be factorised using difference of two squares?", "C",
    ["$x^2+16$", "$x^2-3$", "$4x^2-9$", "$x^2+4x-4$"],
    "4x² − 9: 4x² = (2x)², 9 = (3)², and there is a minus sign. DOTS applies: (2x − 3)(2x + 3).",
    "\\text{Identify the DOTS expression}"),
  algAnswer("dots-i5", "In the factorisation of 16x² − 1, what is the value of a where 16x² = (a)²?", "16x^2=(a)^2", "4x", ["4x"]),
];

const dotsMistakes = [
  { mistake: "Applying DOTS to a sum, writing x² + 25 = (x − 5)(x + 5).", fix: "The rule only works for DIFFERENCES. x² + 25 cannot be factorised using this identity." },
  { mistake: "Confusing difference of two squares with a perfect square, writing x² − 16 = (x − 4)².", fix: "(x − 4)² = x² − 8x + 16, which is not the same as x² − 16. DOTS gives two different factors: (x − 4)(x + 4)." },
  { mistake: "Treating a non-perfect square coefficient as if DOTS applies, e.g. writing 3x² − 12 = (√3 x − 2)(√3 x + 2) directly.", fix: "First remove the common factor: 3x² − 12 = 3(x² − 4), then apply DOTS to x² − 4 = (x − 2)(x + 2)." },
  { mistake: "Finding the square root of only the coefficient but not the variable, e.g. thinking 4x² = (4x)² rather than (2x)².", fix: "√(4x²) = √4 × √(x²) = 2x. Both the coefficient and the variable must be square-rooted." },
];

const dotsMastery: PracticeQuestion[] = [
  algAnswer("dots-m1", "What is √49?", "\\sqrt{49}", "7", ["7"]),
  algChoice("dots-m2", "Which is the correct factorisation of x² − 100?", "A",
    ["$(x-10)(x+10)$", "$(x-100)$", "$(x-50)(x+2)$", "$(x-10)^2$"],
    "100 = 10². Apply DOTS: (x − 10)(x + 10).",
    "x^2-100"),
  algAnswer("dots-m3", "Factorise x² − 81. What is b in the form (x − b)(x + b)?", "x^2-81=(x-b)(x+b)", "9", ["9"]),
  algChoice("dots-m4", "Which is the correct factorisation of 4x² − 25?", "A",
    ["$(2x-5)(2x+5)$", "$(4x-5)(x+5)$", "$(2x-5)^2$", "$(2x-25)(2x+1)$"],
    "4x² = (2x)², 25 = (5)². Apply DOTS: (2x − 5)(2x + 5).",
    "4x^2-25"),
  algChoice("dots-m5", "Which expression is a difference of two perfect squares?", "C",
    ["$x^2+4$", "$x^2-7$", "$9x^2-16$", "$x^2-2x+1$"],
    "9x² = (3x)² and 16 = (4)², with a minus sign. DOTS applies: (3x − 4)(3x + 4).",
    "\\text{Identify the DOTS expression}"),
  algAnswer("dots-m6", "In the expression 36x² − 1, what is a where 36x² = (a)²?", "36x^2=(a)^2", "6x", ["6x"]),
  algChoice("dots-m7", "A student writes x² − 49 = (x − 7)². Which statement identifies the error?", "B",
    ["49 is not a perfect square", "The two factors must have opposite signs: (x − 7)(x + 7)", "The exponent on x is wrong", "The answer is correct"],
    "(x − 7)² = x² − 14x + 49. DOTS gives (x − 7)(x + 7) = x² − 49.",
    "\\text{Identify the error}"),
  algChoice("dots-m8", "Which is the correct factorisation of 100x² − 9y²?", "A",
    ["$(10x-3y)(10x+3y)$", "$(10x-9y)(10x+y)$", "$(100x-3y)(x+3y)$", "$(10x-3y)^2$"],
    "100x² = (10x)², 9y² = (3y)². Apply DOTS: (10x − 3y)(10x + 3y).",
    "100x^2-9y^2"),
  algChoice("dots-m9", "Which is the correct fully factorised form of 2x² − 50?", "A",
    ["$2(x-5)(x+5)$", "$(2x-50)$", "$2(x-25)$", "$(2x-10)(x+5)$"],
    "First remove the common factor: 2(x² − 25). Then apply DOTS to x² − 25: 2(x − 5)(x + 5).",
    "2x^2-50"),
  algChoice("dots-m10", "Which step correctly begins the factorisation of 3x² − 12?", "A",
    ["Write $3(x^2-4)$, then apply DOTS to $(x^2-4)$", "Apply DOTS to $3x^2$ and $12$ separately", "Write $(3x-12)(x+1)$ directly", "Expand and then refactorise"],
    "3x² − 12 = 3(x² − 4) = 3(x − 2)(x + 2). Always remove common factors before applying DOTS.",
    "\\text{First step for }3x^2-12"),
];

// ─── Lesson 5: Algebraic Fractions ───────────────────────────────────────────

const algebraicFractionsWorkedExamples: WorkedExample[] = [
  {
    title: "Simplifying a basic algebraic fraction",
    questionLatex: "\\text{Simplify }\\frac{6x}{9}.",
    steps: [
      { explanation: "Find the HCF of 6x and 9, which is 3.", latex: "\\text{HCF}=3" },
      { explanation: "Divide numerator and denominator by 3.", latex: "\\frac{6x}{9}=\\frac{6x\\div 3}{9\\div 3}=\\frac{2x}{3}" },
    ],
    finalAnswerLatex: "\\frac{2x}{3}",
  },
  {
    title: "Simplifying by factorising the numerator",
    questionLatex: "\\text{Simplify }\\frac{x^2-9}{x+3},\\text{ stating any restriction.}",
    steps: [
      { explanation: "Factorise the numerator using difference of two squares.", latex: "x^2-9=(x-3)(x+3)" },
      { explanation: "Cancel the common factor (x + 3), provided x ≠ −3.", latex: "\\frac{(x-3)(x+3)}{x+3}=x-3,\\quad x\\ne -3" },
    ],
    finalAnswerLatex: "x-3,\\quad x\\ne -3",
  },
  {
    title: "Multiplying algebraic fractions",
    questionLatex: "\\text{Simplify }\\frac{2x}{5}\\times\\frac{15}{4x}.",
    steps: [
      { explanation: "Multiply the numerators together and the denominators together.", latex: "\\frac{2x\\times 15}{5\\times 4x}=\\frac{30x}{20x}" },
      { explanation: "Cancel the common factor 10x from numerator and denominator.", latex: "\\frac{30x}{20x}=\\frac{3}{2}" },
    ],
    finalAnswerLatex: "\\frac{3}{2}",
  },
];

const algebraicFractionsGuided: PracticeQuestion[] = [
  algAnswer("alg-fr-g1", "Simplify 8x/12. Give your answer as a simplified fraction.", "\\frac{8x}{12}", "2x/3", ["2x/3", "\\frac{2x}{3}"]),
  algChoice("alg-fr-g2", "Which is the simplified form of (x² − 4)/(x + 2)?", "A",
    ["$x-2$", "$x+2$", "$x^2-2$", "$x-4$"],
    "Factorise the numerator: x² − 4 = (x − 2)(x + 2). Cancel (x + 2): result is x − 2.",
    "\\frac{x^2-4}{x+2}"),
  algAnswer("alg-fr-g3", "For what value of x is the fraction (x + 5)/(x − 3) undefined?", "\\frac{x+5}{x-3}", "3", ["3"]),
  algChoice("alg-fr-g4", "Which is the simplified form of (3x/4) × (8/(9x))?", "A",
    ["$\\frac{2}{3}$", "$\\frac{1}{3}$", "$\\frac{3}{2}$", "$\\frac{4}{9}$"],
    "Multiply: (3x × 8)/(4 × 9x) = 24x/36x. Cancel 12x: 2/3.",
    "\\frac{3x}{4}\\times\\frac{8}{9x}"),
];

const algebraicFractionsIndependent: PracticeQuestion[] = [
  algAnswer("alg-fr-i1", "Simplify 10x²/(15x). Give your answer as a simplified expression.", "\\frac{10x^2}{15x}", "2x/3", ["2x/3", "\\frac{2x}{3}"]),
  algAnswer("alg-fr-i2", "For what value of x is (2x + 1)/(x + 4) undefined?", "\\frac{2x+1}{x+4}", "-4", ["-4"]),
  algChoice("alg-fr-i3", "Which is the simplified form of (x² − 25)/(x + 5)?", "A",
    ["$x-5$", "$x+5$", "$x-25$", "$x^2-5$"],
    "Factorise the numerator: x² − 25 = (x − 5)(x + 5). Cancel (x + 5): result is x − 5.",
    "\\frac{x^2-25}{x+5}"),
  algChoice("alg-fr-i4", "Which is the simplified form of (4x/7) ÷ (8x/21)?", "A",
    ["$\\frac{3}{2}$", "$\\frac{2}{3}$", "$\\frac{3x}{2}$", "$\\frac{8}{21}$"],
    "Dividing by 8x/21 is the same as multiplying by 21/(8x): (4x × 21)/(7 × 8x) = 84x/56x = 3/2.",
    "\\frac{4x}{7}\\div\\frac{8x}{21}"),
  algChoice("alg-fr-i5", "A student simplifies (x² + 3x)/x as x² + 3. What is the correct simplification?", "A",
    ["$x+3$", "$x^2+3$", "$x^2+3x$", "$3x$"],
    "Factorise the numerator: x(x + 3). Cancel the common x: result is x + 3, not x² + 3.",
    "\\frac{x^2+3x}{x}"),
];

const algebraicFractionsMistakes = [
  { mistake: "Cancelling terms instead of factors, e.g. simplifying (x² + 6)/6 to x².", fix: "Only cancel factors that divide every part of the numerator and denominator. 6 does not divide x², so cancellation is not valid here." },
  { mistake: "Forgetting to state the restriction when cancelling a factor containing x.", fix: "If (x + a) is cancelled, the original denominator was zero when x = −a. Always write x ≠ −a alongside the simplified result." },
  { mistake: "When multiplying fractions, adding the denominators instead of multiplying them.", fix: "Multiplying fractions means numerator × numerator and denominator × denominator. Addition of fractions requires common denominators." },
  { mistake: "Cancelling across addition or subtraction within the numerator, e.g. simplifying (x + 4)/4 to x.", fix: "Only a factor that multiplies the entire numerator can be cancelled. In (x + 4)/4, the 4 in the numerator is added, not multiplied." },
];

const algebraicFractionsMastery: PracticeQuestion[] = [
  algAnswer("alg-fr-m1", "Simplify 6x/10.", "\\frac{6x}{10}", "3x/5", ["3x/5", "\\frac{3x}{5}"]),
  algChoice("alg-fr-m2", "Which is the simplified form of (x² − 16)/(x + 4)?", "A",
    ["$x-4$", "$x+4$", "$x^2-4$", "$x-16$"],
    "x² − 16 = (x − 4)(x + 4). Cancel (x + 4): result is x − 4.",
    "\\frac{x^2-16}{x+4}"),
  algAnswer("alg-fr-m3", "For what value of x is (x − 2)/(x + 1) undefined?", "\\frac{x-2}{x+1}", "-1", ["-1"]),
  algChoice("alg-fr-m4", "Which is the simplified form of (2x/3) × (9/(4x))?", "A",
    ["$\\frac{3}{2}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$", "$6x$"],
    "Multiply: (2x × 9)/(3 × 4x) = 18x/12x = 3/2.",
    "\\frac{2x}{3}\\times\\frac{9}{4x}"),
  algAnswer("alg-fr-m5", "Simplify 15x²/(5x).", "\\frac{15x^2}{5x}", "3x", ["3x"]),
  algChoice("alg-fr-m6", "Which is the simplified form of (x² − x)/x?", "A",
    ["$x-1$", "$x^2-1$", "$x$", "$x-x$"],
    "Factorise the numerator: x(x − 1). Cancel the x: result is x − 1.",
    "\\frac{x^2-x}{x}"),
  algAnswer("alg-fr-m7", "For what value of x is 3x/(2x − 6) undefined?", "\\frac{3x}{2x-6}", "3", ["3"]),
  algChoice("alg-fr-m8", "Which is the fully simplified form of (x² − 9)/(x² + 6x + 9)?", "A",
    ["$\\frac{x-3}{x+3}$", "$\\frac{x+3}{x-3}$", "$x-3$", "$\\frac{x^2-9}{x^2+9}$"],
    "Numerator: (x − 3)(x + 3). Denominator: (x + 3)². Cancel one (x + 3): result is (x − 3)/(x + 3).",
    "\\frac{x^2-9}{x^2+6x+9}"),
  algChoice("alg-fr-m9", "Which is the simplified form of (3x + 6)/(x + 2)?", "A",
    ["$3$", "$3x$", "$x+2$", "$3x+3$"],
    "Factorise the numerator: 3(x + 2). Cancel (x + 2): result is 3.",
    "\\frac{3x+6}{x+2}"),
  algChoice("alg-fr-m10", "A student simplifies (x² + 5x)/(5x) as x². What is the correct simplification?", "A",
    ["$\\frac{x+5}{5}$", "$x^2$", "$x+1$", "$\\frac{x}{5}$"],
    "Factorise the numerator: x(x + 5). Cancel the x: (x + 5)/5. The student incorrectly cancelled the entire denominator 5x.",
    "\\frac{x^2+5x}{5x}"),
];

// ─── Main override function ───────────────────────────────────────────────────

export function year10AlgebraicTechniquesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-10-mathematics" || unit.slug !== "algebraic-techniques") {
    return null;
  }

  if (lesson.slug === "expanding-binomial-products") {
    return {
      description: "Expand single and double brackets using the distributive law and FOIL, and collect like terms.",
      learningIntention: "Expand algebraic expressions with one or two brackets using the distributive law and FOIL.",
      successCriteria: [
        "Use the distributive law to expand a single bracket.",
        "Use FOIL to expand the product of two brackets.",
        "Apply correct sign rules when negative terms are involved.",
        "Collect like terms to write the expanded result in simplest form.",
      ],
      teaching: {
        paragraphs: [
          "When a bracket is multiplied by a term outside it, every term inside is multiplied by that outside term. This is the distributive law.",
          "For two brackets multiplied together, use FOIL: First, Outer, Inner, Last. Multiply each pair in turn, then collect like terms.",
          "Sign rules are critical. A negative multiplied by a positive gives a negative, and two negatives give a positive.",
          "After FOIL, the two x-terms are like terms and must be added together. The constant terms are added separately.",
        ],
        latexBlocks: [
          "a(b+c)=ab+ac",
          "\\underbrace{(x+p)}_{\\text{First}}\\underbrace{(x+q)}_{\\text{Last}}=x^2+(p+q)x+pq",
          "\\text{e.g. }(x+3)(x+5)=x^2+8x+15",
        ],
      },
      workedExamples: expandingWorkedExamples,
      guidedPractice: expandingGuided,
      independentPractice: expandingIndependent,
      commonMistakes: expandingMistakes,
      masteryQuiz: expandingMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "factorising-expressions") {
    return {
      description: "Identify the highest common factor and use it to factorise two- and three-term algebraic expressions.",
      learningIntention: "Factorise algebraic expressions by taking out the highest common factor.",
      successCriteria: [
        "Find the HCF of the terms in an algebraic expression.",
        "Write the HCF outside a bracket and the remaining terms inside.",
        "Factorise expressions with numerical, variable, and combined common factors.",
        "Verify a factorisation by expanding back to the original expression.",
      ],
      teaching: {
        paragraphs: [
          "Factorising is the reverse of expanding. Instead of multiplying out brackets, you write the expression as a product of factors.",
          "The highest common factor (HCF) is the largest expression that divides every term. It may be a number, a variable, or a combination of both.",
          "To factorise, write the HCF outside the bracket. Inside the bracket, write what is left when each term is divided by the HCF.",
          "Always check by expanding: the factorised form should multiply back to the original expression.",
        ],
        latexBlocks: [
          "ab+ac=a(b+c)",
          "\\text{e.g. }4x^2+8x=4x(x+2)",
        ],
      },
      workedExamples: factorisingExpressionsWorkedExamples,
      guidedPractice: factorisingExpressionsGuided,
      independentPractice: factorisingExpressionsIndependent,
      commonMistakes: factorisingExpressionsMistakes,
      masteryQuiz: factorisingExpressionsMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "factorising-quadratics") {
    return {
      description: "Factorise monic quadratic trinomials of the form x² + bx + c using the product-sum method.",
      learningIntention: "Factorise monic quadratic trinomials by finding a pair of numbers with the correct product and sum.",
      successCriteria: [
        "Identify the pair of numbers needed using the product-sum method.",
        "Determine the signs of the number pair from the signs of b and c.",
        "Write the factorised form and verify it by expanding.",
        "Recognise when a quadratic trinomial cannot be factorised over the integers.",
      ],
      teaching: {
        paragraphs: [
          "A monic quadratic trinomial has the form x² + bx + c. To factorise it, find two numbers p and q such that p × q = c and p + q = b.",
          "Sign analysis: if c is positive, p and q share the same sign (both positive when b > 0, both negative when b < 0). If c is negative, p and q have opposite signs.",
          "Write the result as (x + p)(x + q). Expand to verify your factorisation is correct.",
        ],
        latexBlocks: [
          "x^2+bx+c=(x+p)(x+q)\\quad\\text{where }p+q=b\\text{ and }p\\times q=c",
          "\\text{e.g. }x^2+7x+12=(x+3)(x+4)\\quad\\text{since }3+4=7,\\ 3\\times4=12",
        ],
      },
      workedExamples: factorisingQuadraticsWorkedExamples,
      guidedPractice: factorisingQuadraticsGuided,
      independentPractice: factorisingQuadraticsIndependent,
      commonMistakes: factorisingQuadraticsMistakes,
      masteryQuiz: factorisingQuadraticsMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "difference-of-two-squares") {
    return {
      description: "Recognise expressions of the form a² − b² and apply the difference of two squares identity to factorise them.",
      learningIntention: "Identify and factorise expressions using the difference of two squares identity.",
      successCriteria: [
        "Recognise when an expression is a difference of two perfect squares.",
        "Apply a² − b² = (a − b)(a + b) to factorise expressions.",
        "Find the square root of algebraic and numerical terms.",
        "Identify when the rule does not apply, such as for sums of squares.",
      ],
      teaching: {
        paragraphs: [
          "When two perfect square terms are subtracted, the expression can be factorised using a² − b² = (a − b)(a + b).",
          "To use this rule, check two things: is there a subtraction sign between the terms, and are both terms perfect squares?",
          "Finding the square root: √(9x²) = 3x and √25 = 5, so 9x² − 25 = (3x − 5)(3x + 5).",
          "A sum of squares like x² + 16 cannot be factorised using this rule. The minus sign is essential.",
        ],
        latexBlocks: [
          "a^2-b^2=(a-b)(a+b)",
          "\\text{e.g. }9x^2-25=(3x)^2-(5)^2=(3x-5)(3x+5)",
          "\\text{Check: }(a-b)(a+b)=a^2+ab-ab-b^2=a^2-b^2\\checkmark",
        ],
      },
      workedExamples: dotsWorkedExamples,
      guidedPractice: dotsGuided,
      independentPractice: dotsIndependent,
      commonMistakes: dotsMistakes,
      masteryQuiz: dotsMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "algebraic-fractions") {
    return {
      description: "Simplify algebraic fractions by cancelling common factors, state restrictions, and multiply or divide simple algebraic fractions.",
      learningIntention: "Simplify algebraic fractions by factorising and cancelling common factors, and identify restrictions on the variable.",
      successCriteria: [
        "Simplify algebraic fractions by cancelling numerical and variable common factors.",
        "Factorise the numerator or denominator before cancelling.",
        "State the value of x excluded by a zero denominator.",
        "Multiply and divide simple algebraic fractions.",
      ],
      teaching: {
        paragraphs: [
          "An algebraic fraction is simplified by dividing both the numerator and denominator by their common factors. Only factors — not individual terms — can be cancelled.",
          "When a factor containing x is cancelled, the original fraction was undefined for the value of x that makes that factor zero. State this restriction.",
          "To multiply two fractions, multiply the numerators together and the denominators together, then simplify. To divide, multiply by the reciprocal of the second fraction.",
          "Before simplifying, factorise the numerator and denominator where possible. This makes common factors easier to identify.",
        ],
        latexBlocks: [
          "\\frac{ac}{bc}=\\frac{a}{b}\\quad(\\text{cancel factor }c,\\ c\\ne 0)",
          "\\frac{x^2-9}{x+3}=\\frac{(x-3)(x+3)}{x+3}=x-3,\\quad x\\ne -3",
          "\\frac{a}{b}\\times\\frac{c}{d}=\\frac{ac}{bd}\\qquad\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\times\\frac{d}{c}",
        ],
      },
      workedExamples: algebraicFractionsWorkedExamples,
      guidedPractice: algebraicFractionsGuided,
      independentPractice: algebraicFractionsIndependent,
      commonMistakes: algebraicFractionsMistakes,
      masteryQuiz: algebraicFractionsMastery,
      masteryPassMark: 0.8,
    };
  }

  return null;
}
