// Year 10 restructure — Wave 4 (Exponentials, Logarithms & Functions). Authors the deferred
// exp/log strand in Unit 3 plus function notation in Unit 10:
//   Unit 3: exponential-growth-decay (3G), introducing-logarithms (3H), logarithmic-scales (3I),
//           laws-of-logarithms (3J), solving-exponential-equations-logs (3K)
//   Unit 10: functions-notation (10A)
// Polynomials (10B-10H), parabola sketching (7C-7J) and transformations (10K) are deferred.
// Architecture untouched. Prose uses unicode super/subscripts (no raw ^ or _). Y10 audit:
// 3 worked examples + 4 commonMistakes + 4/5/10 + masteryPassMark 0.8.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Identify the rule first, then apply it.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Apply the rule, then check each option.", explanation };
}

// ── 3G Exponential Growth and Decay (path) ─────────────────────────────────────────────
const growthDecay: Partial<ExplicitLesson> = {
  description: "Model growth and decay by repeated multiplication using a growth factor (1 + r) or decay factor (1 − r).",
  learningIntention: "Use growth and decay factors to find values after repeated percentage change.",
  successCriteria: ["Write a growth factor as 1 + r and a decay factor as 1 − r.", "Apply A = P(1 + r)ⁿ for growth.", "Apply A = P(1 − r)ⁿ for decay.", "Distinguish a factor from a single percentage change."],
  teaching: {
    paragraphs: [
      "Growth and decay are REPEATED multiplication, not repeated addition. Increasing by 10% each year means multiplying by 1.10 each year — the GROWTH FACTOR. The factor is 1 + r, where r is the rate as a decimal (10% → 0.10 → factor 1.10).",
      "Over n years you multiply by the factor n times: A = P(1 + r)ⁿ. So $1000 growing 10% per year for 2 years becomes 1000 × 1.10² = 1000 × 1.21 = $1210 — more than the $1200 you would get by adding 10% twice, because the second year grows the larger amount.",
      "DECAY works the same way but the factor is 1 − r (you keep the part that remains). A 20% decrease multiplies by 0.80 each step: a $20 000 car depreciating 20% per year for 2 years is 20000 × 0.80² = 20000 × 0.64 = $12 800.",
      "The common slip is confusing the factor with the percentage: a 10% rise multiplies by 1.10 (not 0.10), and a 10% fall multiplies by 0.90 (not subtract 0.10 once). Keep 100% and add or remove the rate.",
    ],
    latexBlocks: ["\\text{growth: } A = P(1 + r)^n,\\quad \\text{factor } = 1 + r", "\\text{decay: } A = P(1 - r)^n,\\quad \\text{factor } = 1 - r", "1000 \\times 1.10^2 = 1210"],
  },
  workedExamples: [
    { title: "Compound growth", questionLatex: "\\text{\\$1000 grows 10\\% per year for 2 years. Find the amount.}", steps: [{ explanation: "Growth factor 1.10, applied twice.", latex: "1000 \\times 1.10^2 = 1000 \\times 1.21" }, { explanation: "Evaluate.", latex: "= \\$1210" }], finalAnswerLatex: "\\$1210" },
    { title: "Depreciation", questionLatex: "\\text{A \\$20\\,000 car loses 20\\% per year for 2 years. Find its value.}", steps: [{ explanation: "Decay factor 0.80, applied twice.", latex: "20000 \\times 0.80^2 = 20000 \\times 0.64" }, { explanation: "Evaluate.", latex: "= \\$12\\,800" }], finalAnswerLatex: "\\$12\\,800" },
    { title: "Finding a factor", questionLatex: "\\text{What is the growth factor for a 5\\% increase?}", steps: [{ explanation: "Keep 100% and add 5%.", latex: "1 + 0.05 = 1.05" }], finalAnswerLatex: "1.05" },
  ],
  guidedPractice: [
    mcq("y10-gd-g1", "What is the growth factor for a 10% increase?", "B", ["0.10", "1.10", "0.90", "10"], 2, "Keep 100% and add 10%: 1 + 0.10 = 1.10."),
    ans("y10-gd-g2", "$500 grows by 10% in one year. Find the new amount.", "500 \\times 1.10", "550", 2, "500 × 1.10 = $550.", ["$550"]),
    ans("y10-gd-g3", "What is the decay factor for a 20% decrease?", "1 - 0.20", "0.8", 2, "Keep 100% minus 20%: 1 − 0.20 = 0.80.", ["0.80"]),
    ans("y10-gd-g4", "$1000 grows 10% per year for 2 years. Find the amount.", "1000 \\times 1.10^2", "1210", 3, "1000 × 1.10² = 1000 × 1.21 = $1210.", ["$1210"]),
  ],
  independentPractice: [
    mcq("y10-gd-i1", "What is the decay factor for a 5% decrease?", "C", ["1.05", "0.05", "0.95", "5"], 2, "1 − 0.05 = 0.95."),
    ans("y10-gd-i2", "$2000 grows 5% in one year. Find the new amount.", "2000 \\times 1.05", "2100", 2, "2000 × 1.05 = $2100.", ["$2100"]),
    ans("y10-gd-i3", "A population of 1000 grows 10% per year for 2 years. Find the population.", "1000 \\times 1.10^2", "1210", 3, "1000 × 1.21 = 1210.", []),
    ans("y10-gd-i4", "$10 000 decays 10% per year for 2 years. Find the value.", "10000 \\times 0.90^2", "8100", 3, "10000 × 0.81 = $8100.", ["$8100"]),
    mcq("y10-gd-i5", "Growing by 100% means multiplying by:", "B", ["1", "2", "1.1", "100"], 2, "A 100% increase doubles the amount: factor 1 + 1 = 2."),
  ],
  masteryQuiz: [
    ans("y10-gd-m1", "What is the growth factor for an 8% increase?", "1 + 0.08", "1.08", 2, "1 + 0.08 = 1.08.", []),
    mcq("y10-gd-m2", "What is the decay factor for a 25% decrease?", "A", ["0.75", "1.25", "0.25", "25"], 2, "1 − 0.25 = 0.75."),
    ans("y10-gd-m3", "$1000 grows 20% per year for 2 years. Find the amount.", "1000 \\times 1.20^2", "1440", 3, "1000 × 1.44 = $1440.", ["$1440"]),
    ans("y10-gd-m4", "$5000 decays 20% in one year. Find the value.", "5000 \\times 0.80", "4000", 2, "5000 × 0.80 = $4000.", ["$4000"]),
    mcq("y10-gd-m5", "The formula A = P(1 + r)ⁿ models:", "B", ["decay", "growth", "a straight line", "depreciation"], 2, "1 + r is a growth factor, so this is exponential growth."),
    ans("y10-gd-m6", "200 grows by 50% in one year. Find the new amount.", "200 \\times 1.50", "300", 2, "200 × 1.50 = 300.", []),
    ans("y10-gd-m7", "$1000 grows 10% per year for 3 years. Find the amount.", "1000 \\times 1.10^3", "1331", 4, "1000 × 1.331 = $1331.", ["$1331"]),
    mcq("y10-gd-m8", "Multiplying by 0.9 each year represents:", "C", ["10% growth", "90% growth", "10% decay", "90% decay"], 3, "Factor 0.9 = 1 − 0.10, which is 10% decay each year."),
    ans("y10-gd-m9", "$8000 decays 50% per year for 2 years. Find the value.", "8000 \\times 0.50^2", "2000", 3, "8000 × 0.25 = $2000.", ["$2000"]),
    ans("y10-gd-m10", "What is the growth factor for a 100% increase?", "1 + 1", "2", 2, "1 + 1.00 = 2 (the amount doubles).", []),
  ],
  commonMistakes: [
    { mistake: "Using the rate as the factor, e.g. multiplying by 0.10 for a 10% rise.", fix: "Keep 100% and add: a 10% rise multiplies by 1.10." },
    { mistake: "Subtracting a percentage once instead of using a decay factor.", fix: "Multiply by (1 − r) each period: 20% decay is × 0.80 each time." },
    { mistake: "Adding the percentage twice instead of compounding.", fix: "Growth compounds: multiply by the factor n times, (1 + r)ⁿ." },
    { mistake: "Forgetting the factor for a fall is 1 − r, not −r.", fix: "A 10% fall multiplies by 0.90." },
  ],
  masteryPassMark: 0.8,
};

// ── 3H Introducing Logarithms (path) ───────────────────────────────────────────────────
const introLogs: Partial<ExplicitLesson> = {
  description: "Interpret a logarithm as the inverse of an exponential: the power a base must be raised to.",
  learningIntention: "Evaluate simple logarithms by answering 'what power gives this number?'.",
  successCriteria: ["State that log of x to base b is the power b is raised to, to give x.", "Evaluate logs of exact powers.", "Use that log of 1 is 0 and log of the base is 1.", "Connect logarithms to their exponential form."],
  teaching: {
    paragraphs: [
      "A logarithm answers an INVERSE question. Where an exponential asks 'what is 2³?', a logarithm asks 'what POWER of 2 gives 8?'. The answer is 3, written log₂8 = 3. In general, log of x to base b is the power b must be raised to in order to give x.",
      "Every log statement is just an exponential statement rewritten: log₂8 = 3 means exactly the same as 2³ = 8. Reading it as 'what power gives this number?' makes evaluation straightforward.",
      "So to find log₁₀1000, ask 'what power of 10 gives 1000?' — it is 3, because 10³ = 1000. And log₃9 = 2 because 3² = 9.",
      "Two facts fall out immediately: the log of 1 (to any base) is 0, because anything to the power 0 is 1; and the log of the base itself is 1, because b¹ = b. Logarithms are the inverse of exponentials.",
    ],
    latexBlocks: ["\\log_b x = y \\iff b^y = x", "\\log_2 8 = 3 \\text{ because } 2^3 = 8", "\\log_b 1 = 0,\\qquad \\log_b b = 1"],
  },
  workedExamples: [
    { title: "Evaluating a log", questionLatex: "\\text{Evaluate } \\log_2 8.", steps: [{ explanation: "Ask: what power of 2 gives 8?", latex: "2^3 = 8" }, { explanation: "So the log is 3.", latex: "\\log_2 8 = 3" }], finalAnswerLatex: "3" },
    { title: "Base 10", questionLatex: "\\text{Evaluate } \\log_{10} 1000.", steps: [{ explanation: "What power of 10 gives 1000?", latex: "10^3 = 1000" }], finalAnswerLatex: "3" },
    { title: "A different base", questionLatex: "\\text{Evaluate } \\log_3 9.", steps: [{ explanation: "What power of 3 gives 9?", latex: "3^2 = 9" }], finalAnswerLatex: "2" },
  ],
  guidedPractice: [
    mcq("y10-il-g1", "What does log₂8 ask?", "C", ["What is 2 × 8?", "What is 8 − 2?", "What power of 2 gives 8?", "What is 2 + 8?"], 2, "A logarithm asks for the power: what power of 2 gives 8? (It is 3.)"),
    ans("y10-il-g2", "Evaluate log₂16.", "\\log_2 16", "4", 2, "2⁴ = 16, so log₂16 = 4.", []),
    ans("y10-il-g3", "Evaluate log₁₀100.", "\\log_{10} 100", "2", 2, "10² = 100, so log₁₀100 = 2.", []),
    ans("y10-il-g4", "Evaluate log₃27.", "\\log_3 27", "3", 2, "3³ = 27, so log₃27 = 3.", []),
  ],
  independentPractice: [
    mcq("y10-il-i1", "Evaluate log₅25.", "B", ["5", "2", "3", "1"], 2, "5² = 25, so log₅25 = 2."),
    ans("y10-il-i2", "Evaluate log₂32.", "\\log_2 32", "5", 3, "2⁵ = 32, so log₂32 = 5.", []),
    ans("y10-il-i3", "Evaluate log₁₀10.", "\\log_{10} 10", "1", 2, "10¹ = 10, so the log of the base is 1.", []),
    ans("y10-il-i4", "Evaluate log₄16.", "\\log_4 16", "2", 2, "4² = 16, so log₄16 = 2.", []),
    ans("y10-il-i5", "Evaluate log₂1.", "\\log_2 1", "0", 2, "2⁰ = 1, so the log of 1 is 0.", []),
  ],
  masteryQuiz: [
    ans("y10-il-m1", "Evaluate log₃81.", "\\log_3 81", "4", 3, "3⁴ = 81, so log₃81 = 4.", []),
    mcq("y10-il-m2", "The log of a base to itself, log of a to base a, equals:", "B", ["0", "1", "a", "10"], 2, "b¹ = b, so log of the base is 1."),
    ans("y10-il-m3", "Evaluate log₁₀1000.", "\\log_{10} 1000", "3", 2, "10³ = 1000, so it is 3.", []),
    ans("y10-il-m4", "Evaluate log₂64.", "\\log_2 64", "6", 3, "2⁶ = 64, so log₂64 = 6.", []),
    mcq("y10-il-m5", "A logarithm is the inverse of:", "C", ["addition", "multiplication", "an exponential", "a square root"], 2, "Logarithms undo exponentials."),
    ans("y10-il-m6", "Evaluate log₅125.", "\\log_5 125", "3", 3, "5³ = 125, so it is 3.", []),
    ans("y10-il-m7", "Evaluate log₂4.", "\\log_2 4", "2", 2, "2² = 4, so it is 2.", []),
    mcq("y10-il-m8", "log₂8 = 3 because:", "A", ["2³ = 8", "2 × 3 = 8", "8 ÷ 2 = 3", "3² = 8"], 2, "The log equals the power: 2³ = 8."),
    ans("y10-il-m9", "Evaluate log₇49.", "\\log_7 49", "2", 2, "7² = 49, so it is 2.", []),
    ans("y10-il-m10", "Evaluate log₁₀1.", "\\log_{10} 1", "0", 2, "10⁰ = 1, so the log of 1 is 0.", []),
  ],
  commonMistakes: [
    { mistake: "Multiplying the base and number instead of finding a power.", fix: "A log asks 'what POWER of the base gives this number?'" },
    { mistake: "Thinking log of 1 is 1.", fix: "log of 1 is 0 (any base to the power 0 is 1)." },
    { mistake: "Confusing log₂8 with 2 × 8 or 8 ÷ 2.", fix: "log₂8 = 3 because 2³ = 8." },
    { mistake: "Forgetting log and exponential are inverses.", fix: "log_b x = y is the same statement as bʸ = x." },
  ],
  masteryPassMark: 0.8,
};

// ── 3I Logarithmic Scales (path) ───────────────────────────────────────────────────────
const logScales: Partial<ExplicitLesson> = {
  description: "Interpret base-10 logarithmic scales (Richter, pH, decibels), where each unit represents a factor of 10.",
  learningIntention: "Interpret base-10 log scales, where one unit change means a ten-fold change.",
  successCriteria: ["State that +1 on a base-10 log scale means ×10.", "Convert a difference in units to a multiplying factor.", "Read the log value of a power of 10.", "Explain why log scales are used for huge ranges."],
  teaching: {
    paragraphs: [
      "Some quantities span enormous ranges, so we measure them on a LOGARITHMIC scale where equal STEPS mean equal MULTIPLES. On a base-10 log scale, going up by 1 unit means the quantity is 10 times larger, not 1 unit larger.",
      "This makes differences easy to interpret as factors: a difference of 2 units means 10² = 100 times; a difference of 3 means 10³ = 1000 times. The Richter scale (earthquakes), pH (acidity) and decibels (sound) all work this way.",
      "So an earthquake of Richter 6 is 10 times stronger than one of Richter 5, and 100 times stronger than Richter 4. A solution of pH 3 is 100 times more acidic than pH 5 (a difference of 2 units).",
      "Reading a log value is the same as before: the position of 1000 on a base-10 log scale is 3, because 10³ = 1000. Log scales exist to compress huge ranges into manageable numbers.",
    ],
    latexBlocks: ["+1 \\text{ unit} \\Rightarrow \\times 10", "\\text{difference of } d \\text{ units} \\Rightarrow \\times 10^d", "\\text{position of } 1000 = \\log_{10} 1000 = 3"],
  },
  workedExamples: [
    { title: "One unit apart", questionLatex: "\\text{How many times stronger is Richter 5 than Richter 4?}", steps: [{ explanation: "+1 unit on a base-10 scale.", latex: "10^1 = 10 \\text{ times}" }], finalAnswerLatex: "10 \\text{ times}" },
    { title: "Several units apart", questionLatex: "\\text{A pH difference of 2 units means how many times more acidic?}", steps: [{ explanation: "Difference of 2 → 10².", latex: "10^2 = 100 \\text{ times}" }], finalAnswerLatex: "100 \\text{ times}" },
    { title: "Reading a log value", questionLatex: "\\text{Find } \\log_{10} 10000.", steps: [{ explanation: "What power of 10 gives 10000?", latex: "10^4 = 10000" }], finalAnswerLatex: "4" },
  ],
  guidedPractice: [
    mcq("y10-ls-g1", "On a base-10 log scale, going up 1 unit means the quantity is:", "B", ["1 more", "10 times larger", "2 times larger", "100 times larger"], 2, "Each unit on a base-10 log scale is a factor of 10."),
    ans("y10-ls-g2", "How many times stronger is a Richter 5 earthquake than a Richter 4?", "10^1", "10", 2, "A difference of 1 unit means 10 times.", ["10 times"]),
    ans("y10-ls-g3", "A pH difference of 2 units means how many times more acidic?", "10^2", "100", 3, "Difference of 2 → 10² = 100 times.", ["100 times"]),
    ans("y10-ls-g4", "Find log₁₀10000.", "\\log_{10} 10000", "4", 2, "10⁴ = 10000, so it is 4.", []),
  ],
  independentPractice: [
    mcq("y10-ls-i1", "How many times stronger is Richter 7 than Richter 5?", "C", ["2", "20", "100", "10"], 3, "Difference of 2 units → 10² = 100 times."),
    ans("y10-ls-i2", "A sound 1000 times louder is how many units higher on a base-10 scale?", "10^? = 1000", "3", 3, "1000 = 10³, so it is 3 units higher.", []),
    ans("y10-ls-i3", "Find log₁₀100000.", "\\log_{10} 100000", "5", 2, "10⁵ = 100000, so it is 5.", []),
    ans("y10-ls-i4", "A difference of 3 units on a base-10 log scale means how many times?", "10^3", "1000", 3, "10³ = 1000 times.", ["1000 times"]),
    mcq("y10-ls-i5", "Logarithmic scales are used mainly because they:", "A", ["compress very large ranges into small numbers", "make addition easier", "remove all decimals", "avoid negative numbers"], 3, "Log scales turn huge multiplicative ranges into manageable additive units."),
  ],
  masteryQuiz: [
    ans("y10-ls-m1", "How many times stronger is Richter 6 than Richter 3?", "10^3", "1000", 4, "Difference of 3 → 10³ = 1000 times.", ["1000 times"]),
    mcq("y10-ls-m2", "Going up 2 units on a base-10 log scale multiplies the quantity by:", "B", ["20", "100", "2", "200"], 2, "10² = 100."),
    ans("y10-ls-m3", "Find log₁₀1000000.", "\\log_{10} 1000000", "6", 2, "10⁶ = 1000000, so it is 6.", []),
    ans("y10-ls-m4", "A 10000-times change is how many units on a base-10 log scale?", "10^? = 10000", "4", 3, "10000 = 10⁴, so 4 units.", []),
    mcq("y10-ls-m5", "On a base-10 log scale, each step multiplies the quantity by:", "C", ["2", "5", "10", "100"], 2, "The base is 10, so each step is ×10."),
    ans("y10-ls-m6", "A pH 2 solution is how many times more acidic than pH 4?", "10^2", "100", 3, "Difference of 2 → 100 times.", ["100 times"]),
    ans("y10-ls-m7", "Find log₁₀10.", "\\log_{10} 10", "1", 2, "10¹ = 10, so it is 1.", []),
    mcq("y10-ls-m8", "A Richter increase of 1 corresponds to an amplitude change of:", "B", ["+1", "×10", "×2", "×100"], 2, "+1 Richter unit means 10 times the amplitude."),
    ans("y10-ls-m9", "A difference of 5 units on a base-10 log scale means how many times?", "10^5", "100000", 4, "10⁵ = 100000 times.", ["100000 times"]),
    ans("y10-ls-m10", "Find log₁₀1.", "\\log_{10} 1", "0", 2, "10⁰ = 1, so it is 0.", []),
  ],
  commonMistakes: [
    { mistake: "Treating each unit as +1 rather than ×10.", fix: "On a base-10 log scale, +1 unit means 10 times larger." },
    { mistake: "Adding the unit differences instead of using a power of 10.", fix: "A difference of d units is a factor of 10ᵈ." },
    { mistake: "Forgetting the scale is multiplicative.", fix: "Richter 6 vs 4 is 10² = 100 times, not 2 times." },
    { mistake: "Confusing the log value with the quantity.", fix: "log₁₀1000 = 3 is the position; the quantity is 1000." },
  ],
  masteryPassMark: 0.8,
};

// ── 3J Laws of Logarithms (path) ───────────────────────────────────────────────────────
const lawsOfLogs: Partial<ExplicitLesson> = {
  description: "Apply the product, quotient and power laws of logarithms to combine and evaluate log expressions.",
  learningIntention: "Use the log laws to combine, split and evaluate logarithmic expressions.",
  successCriteria: ["Use the product law: log x + log y = log(xy).", "Use the quotient law: log x − log y = log(x/y).", "Use the power law: log(xⁿ) = n log x.", "Use log of 1 = 0 and log of the base = 1."],
  teaching: {
    paragraphs: [
      "The log laws mirror the index laws, because logs are powers. ADDING logs MULTIPLIES the numbers: log x + log y = log(xy). So log₂4 + log₂8 = log₂32 = 5.",
      "SUBTRACTING logs DIVIDES the numbers: log x − log y = log(x ÷ y). So log₁₀20 − log₁₀2 = log₁₀10 = 1.",
      "A POWER inside a log comes out as a multiplier: log(xⁿ) = n log x. So log(x²) = 2 log x. This is the law that makes logs useful for solving exponential equations.",
      "Two base facts complete the toolkit: the log of the base is 1, and the log of 1 is 0. Combine the laws to simplify before evaluating, the same way you simplify with index laws.",
    ],
    latexBlocks: ["\\log x + \\log y = \\log(xy)", "\\log x - \\log y = \\log\\!\\left(\\tfrac{x}{y}\\right)", "\\log(x^n) = n\\log x"],
  },
  workedExamples: [
    { title: "Product law", questionLatex: "\\text{Evaluate } \\log_2 4 + \\log_2 8.", steps: [{ explanation: "Adding logs multiplies the numbers.", latex: "\\log_2(4 \\times 8) = \\log_2 32" }, { explanation: "2⁵ = 32.", latex: "= 5" }], finalAnswerLatex: "5" },
    { title: "Power law", questionLatex: "\\text{Write } \\log(x^2) \\text{ without a power.}", steps: [{ explanation: "Bring the power down.", latex: "\\log(x^2) = 2\\log x" }], finalAnswerLatex: "2\\log x" },
    { title: "Quotient law", questionLatex: "\\text{Evaluate } \\log_{10} 20 - \\log_{10} 2.", steps: [{ explanation: "Subtracting logs divides.", latex: "\\log_{10}(20 \\div 2) = \\log_{10} 10" }, { explanation: "10¹ = 10.", latex: "= 1" }], finalAnswerLatex: "1" },
  ],
  guidedPractice: [
    mcq("y10-ll-g1", "log x + log y equals:", "A", ["$\\log(xy)$", "$\\log(x+y)$", "$\\log x \\cdot \\log y$", "$\\log(x-y)$"], 2, "Adding logs multiplies the numbers: log x + log y = log(xy)."),
    ans("y10-ll-g2", "Evaluate log₂4 + log₂2.", "\\log_2 4 + \\log_2 2", "3", 3, "= log₂8 = 3 (since 2³ = 8).", []),
    ans("y10-ll-g3", "Evaluate log₃9 + log₃3.", "\\log_3 9 + \\log_3 3", "3", 3, "= log₃27 = 3 (since 3³ = 27).", []),
    ans("y10-ll-g4", "In log(x³) = n log x, what is n?", "\\log(x^3) = n\\log x", "3", 2, "The power law brings the index down: n = 3.", []),
  ],
  independentPractice: [
    mcq("y10-ll-i1", "log x − log y equals:", "B", ["$\\log(xy)$", "$\\log(x/y)$", "$\\log(x-y)$", "$\\tfrac{\\log x}{\\log y}$"], 2, "Subtracting logs divides the numbers: log(x/y)."),
    ans("y10-ll-i2", "Evaluate log₂16 − log₂2.", "\\log_2 16 - \\log_2 2", "3", 3, "= log₂8 = 3.", []),
    ans("y10-ll-i3", "Evaluate log₁₀50 + log₁₀2.", "\\log_{10} 50 + \\log_{10} 2", "2", 3, "= log₁₀100 = 2.", []),
    ans("y10-ll-i4", "In log(x⁵) = n log x, what is n?", "\\log(x^5)", "5", 2, "The power law gives n = 5.", []),
    ans("y10-ll-i5", "Evaluate log₅25 + log₅5.", "\\log_5 25 + \\log_5 5", "3", 3, "= log₅125 = 3.", []),
  ],
  masteryQuiz: [
    ans("y10-ll-m1", "Evaluate log₂8 + log₂4.", "\\log_2 8 + \\log_2 4", "5", 3, "= log₂32 = 5.", []),
    mcq("y10-ll-m2", "log(xⁿ) equals:", "C", ["$x \\log n$", "$\\log x + n$", "$n \\log x$", "$(\\log x)^n$"], 2, "The power law: log(xⁿ) = n log x."),
    ans("y10-ll-m3", "Evaluate log₁₀100 − log₁₀10.", "\\log_{10} 100 - \\log_{10} 10", "1", 3, "= log₁₀10 = 1.", []),
    ans("y10-ll-m4", "Evaluate log₃27 − log₃3.", "\\log_3 27 - \\log_3 3", "2", 3, "= log₃9 = 2.", []),
    mcq("y10-ll-m5", "The log of 1 (any base) is:", "A", ["0", "1", "the base", "undefined"], 2, "Any base to the power 0 is 1, so log of 1 is 0."),
    ans("y10-ll-m6", "Evaluate log₂32 − log₂4.", "\\log_2 32 - \\log_2 4", "3", 3, "= log₂8 = 3.", []),
    ans("y10-ll-m7", "In log(x⁴) = n log x, what is n?", "\\log(x^4)", "4", 2, "Power law: n = 4.", []),
    mcq("y10-ll-m8", "The log of the base to itself is:", "B", ["0", "1", "the base", "10"], 2, "b¹ = b, so log of the base is 1."),
    ans("y10-ll-m9", "Evaluate log₆4 + log₆9.", "\\log_6 4 + \\log_6 9", "2", 4, "= log₆36 = 2 (since 6² = 36).", []),
    ans("y10-ll-m10", "Evaluate log₁₀1000 − log₁₀100.", "\\log_{10} 1000 - \\log_{10} 100", "1", 3, "= log₁₀10 = 1.", []),
  ],
  commonMistakes: [
    { mistake: "Turning log x + log y into log(x + y).", fix: "Adding logs MULTIPLIES: log x + log y = log(xy)." },
    { mistake: "Turning log x − log y into log x ÷ log y.", fix: "Subtracting logs DIVIDES the numbers: log(x/y)." },
    { mistake: "Leaving a power inside the log.", fix: "Bring it down: log(xⁿ) = n log x." },
    { mistake: "Thinking log of 1 is 1.", fix: "log of 1 is 0; log of the base is 1." },
  ],
  masteryPassMark: 0.8,
};

// ── 3K Solving Exponential Equations Using Logs (path) ─────────────────────────────────
const solveExpLogs: Partial<ExplicitLesson> = {
  description: "Solve exponential equations by recognising the answer as a logarithm (the power that gives the number).",
  learningIntention: "Solve equations of the form base to the power x equals a number, using logarithms.",
  successCriteria: ["Recognise that the solution of an exponential equation is a logarithm.", "Take the log of both sides to solve.", "Evaluate the solution for exact powers.", "Know when logs are needed rather than inspection."],
  teaching: {
    paragraphs: [
      "To solve an equation with the unknown in the index — like 2ˣ = 8 — you are really asking 'what power of 2 gives 8?'. That is a LOGARITHM: the solution is x = log₂8 = 3.",
      "Formally, you take the LOGARITHM of both sides. For bˣ = n the solution is x = log of n to base b. When n is a neat power of b you can read it off: 10ˣ = 10000 gives x = log₁₀10000 = 4.",
      "So the routine is: write the equation as bˣ = n, then x = log_b n, and evaluate by asking what power of b gives n. For 5ˣ = 125, x = log₅125 = 3 because 5³ = 125.",
      "Logs are essential when the number is NOT a neat power of the base (then a calculator's log gives a decimal). In this course the numbers are exact powers, so each answer is a whole-number logarithm.",
    ],
    latexBlocks: ["b^x = n \\Rightarrow x = \\log_b n", "2^x = 8 \\Rightarrow x = \\log_2 8 = 3", "10^x = 10000 \\Rightarrow x = 4"],
  },
  workedExamples: [
    { title: "Solving with a log", questionLatex: "\\text{Solve } 2^x = 8.", steps: [{ explanation: "The solution is a logarithm.", latex: "x = \\log_2 8" }, { explanation: "2³ = 8.", latex: "x = 3" }], finalAnswerLatex: "x = 3" },
    { title: "Base 10", questionLatex: "\\text{Solve } 10^x = 10000.", steps: [{ explanation: "x = log₁₀10000.", latex: "10^4 = 10000" }], finalAnswerLatex: "x = 4" },
    { title: "Taking the log of both sides", questionLatex: "\\text{Solve } 5^x = 125.", steps: [{ explanation: "x = log₅125.", latex: "5^3 = 125" }], finalAnswerLatex: "x = 3" },
  ],
  guidedPractice: [
    mcq("y10-sl-g1", "To solve bˣ = n, you take the ___ of both sides.", "C", ["square root", "reciprocal", "logarithm", "derivative"], 3, "Taking the logarithm isolates the index: x = log_b n."),
    ans("y10-sl-g2", "Solve 2ˣ = 16.", "2^x = 16", "4", 2, "x = log₂16 = 4 (2⁴ = 16).", ["x=4"]),
    ans("y10-sl-g3", "Solve 10ˣ = 100000.", "10^x = 100000", "5", 3, "x = log₁₀100000 = 5.", ["x=5"]),
    ans("y10-sl-g4", "Solve 3ˣ = 27.", "3^x = 27", "3", 2, "x = log₃27 = 3 (3³ = 27).", ["x=3"]),
  ],
  independentPractice: [
    mcq("y10-sl-i1", "Solving 2ˣ = 8 with logs gives x =", "B", ["$\\log_8 2 = \\tfrac13$", "$\\log_2 8 = 3$", "$8 \\div 2 = 4$", "$2 \\times 8$"], 3, "x = log₂8 = 3, because 2³ = 8."),
    ans("y10-sl-i2", "Solve 5ˣ = 625.", "5^x = 625", "4", 3, "x = log₅625 = 4 (5⁴ = 625).", ["x=4"]),
    ans("y10-sl-i3", "Solve 10ˣ = 1000000.", "10^x = 1000000", "6", 3, "x = log₁₀1000000 = 6.", ["x=6"]),
    ans("y10-sl-i4", "Solve 2ˣ = 64.", "2^x = 64", "6", 2, "x = log₂64 = 6 (2⁶ = 64).", ["x=6"]),
    ans("y10-sl-i5", "Solve 7ˣ = 343.", "7^x = 343", "3", 3, "x = log₇343 = 3 (7³ = 343).", ["x=3"]),
  ],
  masteryQuiz: [
    ans("y10-sl-m1", "Solve 2ˣ = 32.", "2^x = 32", "5", 2, "x = log₂32 = 5 (2⁵ = 32).", ["x=5"]),
    mcq("y10-sl-m2", "Taking the log of both sides is most needed when:", "B", ["the equation is linear", "the base and number are not neat powers", "there is no unknown", "the index is 1"], 3, "Logs handle cases where you cannot read the power off directly."),
    ans("y10-sl-m3", "Solve 10ˣ = 10.", "10^x = 10", "1", 2, "x = log₁₀10 = 1.", ["x=1"]),
    ans("y10-sl-m4", "Solve 4ˣ = 256.", "4^x = 256", "4", 3, "x = log₄256 = 4 (4⁴ = 256).", ["x=4"]),
    mcq("y10-sl-m5", "The solution of bˣ = n is:", "A", ["$x = \\log_b n$", "$x = \\log_n b$", "$x = n \\div b$", "$x = b^n$"], 2, "x = log of n to base b."),
    ans("y10-sl-m6", "Solve 3ˣ = 243.", "3^x = 243", "5", 3, "x = log₃243 = 5 (3⁵ = 243).", ["x=5"]),
    ans("y10-sl-m7", "Solve 2ˣ = 128.", "2^x = 128", "7", 4, "x = log₂128 = 7 (2⁷ = 128).", ["x=7"]),
    mcq("y10-sl-m8", "Solving 10ˣ = 1000 gives x =", "C", ["100", "30", "3", "log₃10"], 2, "x = log₁₀1000 = 3, because 10³ = 1000."),
    ans("y10-sl-m9", "Solve 5ˣ = 3125.", "5^x = 3125", "5", 4, "x = log₅3125 = 5 (5⁵ = 3125).", ["x=5"]),
    ans("y10-sl-m10", "Solve 6ˣ = 216.", "6^x = 216", "3", 3, "x = log₆216 = 3 (6³ = 216).", ["x=3"]),
  ],
  commonMistakes: [
    { mistake: "Dividing the number by the base, e.g. 2ˣ = 8 → x = 4.", fix: "The solution is a logarithm: x = log₂8 = 3." },
    { mistake: "Writing log of b to base n instead of n to base b.", fix: "For bˣ = n, x = log of n to base b." },
    { mistake: "Forgetting what the log evaluates to.", fix: "Ask 'what power of the base gives the number?'." },
    { mistake: "Mis-identifying the power, e.g. 2⁶ = 128.", fix: "Check: 2⁷ = 128, so the index is 7." },
  ],
  masteryPassMark: 0.8,
};

// ── 10A Functions and Notation (path) ──────────────────────────────────────────────────
const functionsNotation: Partial<ExplicitLesson> = {
  description: "Interpret function notation f(x) as an input-output rule, evaluate functions, and identify domain and range.",
  learningIntention: "Use function notation to evaluate outputs and find an input from a given output.",
  successCriteria: ["Read f(x) as the output of the function for input x.", "Evaluate f at a given value.", "Find the input that gives a required output.", "Identify the domain (inputs) and range (outputs)."],
  teaching: {
    paragraphs: [
      "A FUNCTION is a rule that turns each input into exactly one output — like a machine: put a number in, get a number out. Function notation names the machine: f(x) = 2x + 1 says 'the function f doubles its input and adds 1'.",
      "To EVALUATE, substitute the input for x. f(3) means 'the output when the input is 3': f(3) = 2(3) + 1 = 7. The number in the brackets is the input, not a multiplier.",
      "You can also run the machine BACKWARDS: given the output, find the input. If f(x) = 3x − 5 and f(x) = 10, solve 3x − 5 = 10 to get x = 5.",
      "The set of allowed inputs is the DOMAIN; the set of resulting outputs is the RANGE. Function notation is just a compact, precise way to describe this input-to-output mapping.",
    ],
    latexBlocks: ["f(x) = 2x + 1 \\Rightarrow f(3) = 2(3) + 1 = 7", "\\text{input} \\to f \\to \\text{output}", "\\text{domain = inputs},\\quad \\text{range = outputs}"],
  },
  workedExamples: [
    { title: "Evaluating a function", questionLatex: "\\text{If } f(x) = 2x + 1, \\text{ find } f(3).", steps: [{ explanation: "Substitute x = 3.", latex: "f(3) = 2(3) + 1" }, { explanation: "Evaluate.", latex: "= 7" }], finalAnswerLatex: "7" },
    { title: "A squaring function", questionLatex: "\\text{If } f(x) = x^2, \\text{ find } f(-2).", steps: [{ explanation: "Substitute and square.", latex: "f(-2) = (-2)^2 = 4" }], finalAnswerLatex: "4" },
    { title: "Finding the input", questionLatex: "\\text{If } f(x) = 3x - 5 \\text{ and } f(x) = 10, \\text{ find } x.", steps: [{ explanation: "Set the rule equal to 10.", latex: "3x - 5 = 10" }, { explanation: "Solve.", latex: "3x = 15 \\Rightarrow x = 5" }], finalAnswerLatex: "x = 5" },
  ],
  guidedPractice: [
    mcq("y10-fn-g1", "If f(x) = 2x + 1, what is f(3)?", "A", ["7", "6", "9", "5"], 2, "Substitute x = 3: 2(3) + 1 = 7."),
    ans("y10-fn-g2", "If f(x) = x + 5, find f(2).", "f(x)=x+5", "7", 1, "f(2) = 2 + 5 = 7.", []),
    ans("y10-fn-g3", "If f(x) = 3x, find f(4).", "f(x)=3x", "12", 2, "f(4) = 3 × 4 = 12.", []),
    ans("y10-fn-g4", "If f(x) = x², find f(5).", "f(x)=x^2", "25", 2, "f(5) = 5² = 25.", []),
  ],
  independentPractice: [
    mcq("y10-fn-i1", "f(x) notation means:", "C", ["f multiplied by x", "f plus x", "the output of function f for input x", "f to the power x"], 2, "f(x) is the output of the function f when the input is x."),
    ans("y10-fn-i2", "If f(x) = 2x − 1, find f(0).", "f(x)=2x-1", "-1", 2, "f(0) = 2(0) − 1 = −1.", ["−1"]),
    ans("y10-fn-i3", "If f(x) = x² + 1, find f(3).", "f(x)=x^2+1", "10", 3, "f(3) = 9 + 1 = 10.", []),
    ans("y10-fn-i4", "If f(x) = 4x and f(x) = 20, find x.", "f(x)=4x=20", "5", 3, "4x = 20, so x = 5.", ["x=5"]),
    ans("y10-fn-i5", "If f(x) = 10 − x, find f(7).", "f(x)=10-x", "3", 2, "f(7) = 10 − 7 = 3.", []),
  ],
  masteryQuiz: [
    ans("y10-fn-m1", "If f(x) = 2x + 3, find f(5).", "f(x)=2x+3", "13", 2, "f(5) = 2(5) + 3 = 13.", []),
    mcq("y10-fn-m2", "The set of inputs of a function is called the:", "B", ["range", "domain", "output", "image"], 2, "The domain is the set of allowed inputs."),
    ans("y10-fn-m3", "If f(x) = x² − 4, find f(3).", "f(x)=x^2-4", "5", 3, "f(3) = 9 − 4 = 5.", []),
    ans("y10-fn-m4", "If f(x) = 5x, find f(−2).", "f(x)=5x", "-10", 2, "f(−2) = 5 × (−2) = −10.", ["−10"]),
    mcq("y10-fn-m5", "If f(x) = 2x, then f(a) equals:", "C", ["2 + a", "a²", "2a", "a/2"], 3, "Substitute the input a: f(a) = 2a."),
    ans("y10-fn-m6", "If f(x) = x ÷ 2, find f(8).", "f(x)=x/2", "4", 2, "f(8) = 8 ÷ 2 = 4.", []),
    ans("y10-fn-m7", "If f(x) = 3x + 1 and f(x) = 10, find x.", "f(x)=3x+1=10", "3", 3, "3x + 1 = 10, so 3x = 9 and x = 3.", ["x=3"]),
    mcq("y10-fn-m8", "The set of outputs of a function is called the:", "A", ["range", "domain", "input", "variable"], 2, "The range is the set of outputs."),
    ans("y10-fn-m9", "If f(x) = x², find f(−3).", "f(x)=x^2", "9", 2, "f(−3) = (−3)² = 9.", []),
    ans("y10-fn-m10", "If f(x) = 7 − 2x, find f(2).", "f(x)=7-2x", "3", 2, "f(2) = 7 − 4 = 3.", []),
  ],
  commonMistakes: [
    { mistake: "Reading f(3) as f × 3.", fix: "f(3) means the output when the input is 3, not multiplication." },
    { mistake: "Forgetting to substitute everywhere x appears.", fix: "Replace every x with the input value before evaluating." },
    { mistake: "Mishandling negatives when squaring, e.g. f(−2) = −4 for f(x)=x².", fix: "(−2)² = 4: a negative squared is positive." },
    { mistake: "Confusing domain and range.", fix: "Domain = inputs; range = outputs." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "exponential-growth-decay": growthDecay,
  "introducing-logarithms": introLogs,
  "logarithmic-scales": logScales,
  "laws-of-logarithms": lawsOfLogs,
  "solving-exponential-equations-logs": solveExpLogs,
  "functions-notation": functionsNotation,
};

export function year10ExponentialsFunctionsWave4LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    !["indices-exponentials-logarithms", "functions-polynomials-graphs"].includes(unit.slug)
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
