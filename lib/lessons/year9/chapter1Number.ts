// Year 9 Wave 2 — Chapter 1 (Computation & Financial Maths), Number-review sections (ADR-Y9-001):
// computations-with-integers (1A), rational-numbers (1C), computation-with-fractions (1D),
// ratios-rates-best-buys (1E) — all consolidating. Full per-subtopic contract: teaching + 3 worked
// examples + 4 common mistakes + 4 guided / 5 independent / 10 mastery + 10 D5 masteryQuizPool
// (difficulty 5). D6 (12 each) in lib/challenges/year9Chapter1.ts. pathTag + stableSkillId +
// skillCheckpoints on the seed. Prose uses unicode superscripts (no raw ^ or _).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Work carefully, one step at a time.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about the rule before computing.", explanation };
}

// ── 1A computations-with-integers (consolidating) ──────────────────────────────────────
const computationsWithIntegers: Partial<ExplicitLesson> = {
  description: "Add, subtract, multiply and divide positive and negative integers, using order of operations.",
  learningIntention: "Compute confidently with negative numbers and apply order of operations.",
  successCriteria: ["Add and subtract integers including negatives.", "Multiply and divide with sign rules.", "Apply order of operations (BIDMAS).", "Evaluate powers of negatives."],
  teaching: {
    paragraphs: [
      "INTEGERS are the whole numbers and their negatives. Adding a negative moves left on the number line; subtracting a negative moves right, so subtracting a negative is the same as adding: 12 − (−5) = 12 + 5 = 17.",
      "For MULTIPLYING and DIVIDING, the SIGN RULE is: same signs give a positive, different signs give a negative. So −6 × −4 = 24, but −6 × 4 = −24.",
      "ORDER OF OPERATIONS (BIDMAS) still applies: Brackets, Indices, then Division/Multiplication (left to right), then Addition/Subtraction. So 2 + 3 × 4 = 2 + 12 = 14, not 20.",
      "A power of a negative needs brackets: (−4)² = (−4)(−4) = 16 (even power → positive), while (−2)³ = −8 (odd power → negative).",
    ],
    latexBlocks: ["12 - (-5) = 12 + 5 = 17", "(-)(-) = +,\\ (-)(+) = -", "(-4)^2 = 16,\\ (-2)^3 = -8"],
  },
  workedExamples: [
    { title: "Adding integers", questionLatex: "\\text{Evaluate } -7 + 3.", steps: [{ explanation: "Move 3 right from −7.", latex: "-4" }], finalAnswerLatex: "-4" },
    { title: "Multiplying negatives", questionLatex: "\\text{Evaluate } -6 \\times -4.", steps: [{ explanation: "Same signs → positive.", latex: "24" }], finalAnswerLatex: "24" },
    { title: "Subtracting a negative", questionLatex: "\\text{Evaluate } 12 - (-5).", steps: [{ explanation: "Subtracting a negative adds.", latex: "12 + 5 = 17" }], finalAnswerLatex: "17" },
  ],
  guidedPractice: [
    ans("y9-int-g1", "Evaluate −8 + 5.", "-8+5", "-3", 2, "Move 5 right from −8 → −3.", ["−3"]),
    ans("y9-int-g2", "Evaluate −3 × 7.", "-3\\times7", "-21", 2, "Different signs → negative.", ["−21"]),
    ans("y9-int-g3", "Evaluate −20 ÷ −4.", "-20\\div-4", "5", 2, "Same signs → positive.", []),
    mcq("y9-int-g4", "Two negative numbers multiplied give a result that is:", "A", ["positive", "negative", "zero", "either sign"], 2, "Same signs multiply to a positive."),
  ],
  independentPractice: [
    ans("y9-int-i1", "Evaluate −15 + (−6).", "-15+(-6)", "-21", 2, "Adding a negative: −15 − 6 = −21.", ["−21"]),
    ans("y9-int-i2", "Evaluate 9 − 14.", "9-14", "-5", 2, "9 − 14 = −5.", ["−5"]),
    ans("y9-int-i3", "Evaluate −5 × −5.", "-5\\times-5", "25", 2, "Same signs → positive 25.", []),
    ans("y9-int-i4", "Evaluate −18 ÷ 3.", "-18\\div3", "-6", 2, "Different signs → −6.", ["−6"]),
    ans("y9-int-i5", "Evaluate 2 + 3 × 4.", "2+3\\times4", "14", 3, "BIDMAS: 3×4 first = 12, +2 = 14.", []),
  ],
  masteryQuiz: [
    ans("y9-int-m1", "Evaluate −4 + (−9).", "-4+(-9)", "-13", 2, "−4 − 9 = −13.", ["−13"]),
    ans("y9-int-m2", "Evaluate 7 − (−3).", "7-(-3)", "10", 2, "7 + 3 = 10.", []),
    ans("y9-int-m3", "Evaluate −6 × 4.", "-6\\times4", "-24", 2, "Different signs → −24.", ["−24"]),
    ans("y9-int-m4", "Evaluate −24 ÷ −6.", "-24\\div-6", "4", 2, "Same signs → 4.", []),
    mcq("y9-int-m5", "Evaluate −(−5).", "B", ["−5", "5", "0", "−10"], 2, "The negative of −5 is 5."),
    ans("y9-int-m6", "Evaluate 10 − 2 × 3.", "10-2\\times3", "4", 3, "2×3 = 6 first, 10 − 6 = 4.", []),
    ans("y9-int-m7", "Evaluate −2 × −3 × −1.", "-2\\times-3\\times-1", "-6", 3, "(−2)(−3)=6, ×(−1) = −6.", ["−6"]),
    ans("y9-int-m8", "Evaluate (−4)².", "(-4)^2", "16", 3, "(−4)(−4) = 16.", []),
    ans("y9-int-m9", "Evaluate −100 ÷ 4.", "-100\\div4", "-25", 2, "Different signs → −25.", ["−25"]),
    mcq("y9-int-m10", "A negative divided by a negative is:", "A", ["positive", "negative", "zero", "undefined"], 2, "Same signs → positive."),
  ],
  masteryQuizPool: [
    ans("y9-int-p1", "Evaluate −3 + (−4) × 2.", "-3+(-4)\\times2", "-11", 5, "(−4)×2 = −8 first; −3 + (−8) = −11.", ["−11"]),
    ans("y9-int-p2", "Evaluate (−2)³.", "(-2)^3", "-8", 5, "(−2)(−2)(−2) = −8.", ["−8"]),
    ans("y9-int-p3", "Evaluate −5 − (−3 × 4).", "-5-(-3\\times4)", "7", 5, "−3×4 = −12; −5 − (−12) = 7.", []),
    ans("y9-int-p4", "Evaluate −20 ÷ (−2 − 3).", "-20\\div(-2-3)", "4", 5, "Denominator −5; −20 ÷ −5 = 4.", []),
    ans("y9-int-p5", "Evaluate (−3)² − (−4)².", "(-3)^2-(-4)^2", "-7", 5, "9 − 16 = −7.", ["−7"]),
    ans("y9-int-p6", "Evaluate −6 × (−2 + 5).", "-6\\times(-2+5)", "-18", 5, "Brackets 3; −6×3 = −18.", ["−18"]),
    ans("y9-int-p7", "Evaluate 2 − 3 × (−4).", "2-3\\times(-4)", "14", 5, "3×(−4) = −12; 2 − (−12) = 14.", []),
    ans("y9-int-p8", "Evaluate (−1)⁵ + (−1)⁴.", "(-1)^5+(-1)^4", "0", 5, "−1 + 1 = 0.", []),
    ans("y9-int-p9", "Evaluate −48 ÷ 6 ÷ (−2).", "-48\\div6\\div-2", "4", 5, "−48÷6 = −8; −8÷−2 = 4.", []),
    ans("y9-int-p10", "Evaluate −10 − 4 × (−2) + 3.", "-10-4\\times-2+3", "1", 5, "4×−2 = −8 → −10 −(−8) +3 = −10+8+3 = 1.", []),
  ],
  commonMistakes: [
    { mistake: "Treating subtracting a negative as subtracting.", fix: "12 − (−5) = 12 + 5." },
    { mistake: "Getting the sign wrong in multiplication/division.", fix: "Same signs → +, different signs → −." },
    { mistake: "Working left-to-right ignoring BIDMAS.", fix: "Do ×/÷ before +/−." },
    { mistake: "Writing −4² instead of (−4)².", fix: "(−4)² = 16; without brackets −4² = −16." },
  ],
  masteryPassMark: 0.8,
};

// ── 1C rational-numbers (consolidating) ────────────────────────────────────────────────
const rationalNumbers: Partial<ExplicitLesson> = {
  description: "Understand rational numbers as fractions, convert between fractions and decimals, and compare them.",
  learningIntention: "Recognise rational numbers and convert/compare fractions and decimals.",
  successCriteria: ["State that a rational number can be written as a fraction a/b.", "Convert simple fractions to decimals and back.", "Compare and order rational numbers.", "Recognise terminating and recurring decimals."],
  teaching: {
    paragraphs: [
      "A RATIONAL NUMBER is any number that can be written as a fraction a/b of two integers (b ≠ 0). That includes whole numbers, fractions, and terminating or recurring decimals — e.g. 0.75 = 3/4 and 0.333… = 1/3.",
      "To convert a FRACTION to a DECIMAL, divide the numerator by the denominator: 3/4 = 3 ÷ 4 = 0.75. To go back, write the decimal over its place value and simplify: 0.6 = 6/10 = 3/5.",
      "Some fractions give TERMINATING decimals (1/4 = 0.25); others RECUR (1/3 = 0.333…). Both are still rational.",
      "To COMPARE rational numbers, put them in the same form (common denominator, or decimals): 3/5 = 0.6 is larger than 1/2 = 0.5.",
    ],
    latexBlocks: ["\\text{rational} = \\tfrac{a}{b},\\ b \\neq 0", "\\tfrac34 = 0.75,\\quad 0.6 = \\tfrac{3}{5}", "\\tfrac13 = 0.\\overline{3}\\ (\\text{recurring})"],
  },
  workedExamples: [
    { title: "Fraction to decimal", questionLatex: "\\text{Write } \\tfrac34 \\text{ as a decimal.}", steps: [{ explanation: "3 ÷ 4.", latex: "0.75" }], finalAnswerLatex: "0.75" },
    { title: "Decimal to fraction", questionLatex: "\\text{Write } 0.6 \\text{ as a simplified fraction.}", steps: [{ explanation: "6/10 then simplify.", latex: "\\tfrac{6}{10} = \\tfrac{3}{5}" }], finalAnswerLatex: "\\tfrac35" },
    { title: "Comparing", questionLatex: "\\text{Which is larger, } \\tfrac35 \\text{ or } \\tfrac12?", steps: [{ explanation: "0.6 vs 0.5.", latex: "\\tfrac35" }], finalAnswerLatex: "\\tfrac35" },
  ],
  guidedPractice: [
    ans("y9-rat-g1", "Write 1/2 as a decimal.", "\\tfrac12", "0.5", 2, "1 ÷ 2 = 0.5.", []),
    ans("y9-rat-g2", "Write 1/4 as a decimal.", "\\tfrac14", "0.25", 2, "1 ÷ 4 = 0.25.", []),
    ans("y9-rat-g3", "Write 0.5 as a simplified fraction.", "0.5", "1/2", 2, "5/10 = 1/2.", ["1 / 2"]),
    mcq("y9-rat-g4", "A rational number is one that can be written as:", "A", ["a fraction of two integers", "only a whole number", "only a decimal", "a square root"], 2, "Rational = a/b with integers a, b (b≠0)."),
  ],
  independentPractice: [
    ans("y9-rat-i1", "Write 3/5 as a decimal.", "\\tfrac35", "0.6", 2, "3 ÷ 5 = 0.6.", []),
    ans("y9-rat-i2", "Write 0.25 as a simplified fraction.", "0.25", "1/4", 3, "25/100 = 1/4.", ["1 / 4"]),
    ans("y9-rat-i3", "Write 7/10 as a decimal.", "\\tfrac{7}{10}", "0.7", 2, "7 ÷ 10 = 0.7.", []),
    mcq("y9-rat-i4", "1/3 as a decimal is:", "C", ["0.13", "0.3 exactly", "0.333… (recurring)", "3.0"], 3, "1 ÷ 3 = 0.333… recurring."),
    mcq("y9-rat-i5", "Which is larger: 0.7 or 3/5?", "A", ["0.7", "3/5", "they are equal", "cannot tell"], 3, "3/5 = 0.6 < 0.7."),
  ],
  masteryQuiz: [
    ans("y9-rat-m1", "Write 1/5 as a decimal.", "\\tfrac15", "0.2", 2, "1 ÷ 5 = 0.2.", []),
    ans("y9-rat-m2", "Write 0.75 as a simplified fraction.", "0.75", "3/4", 3, "75/100 = 3/4.", ["3 / 4"]),
    ans("y9-rat-m3", "Write 9/10 as a decimal.", "\\tfrac{9}{10}", "0.9", 2, "0.9.", []),
    mcq("y9-rat-m4", "Which of these is NOT rational?", "D", ["0.5", "3/4", "−2", "√2"], 4, "√2 cannot be written as a fraction of integers."),
    ans("y9-rat-m5", "Write 2/5 as a decimal.", "\\tfrac25", "0.4", 2, "2 ÷ 5 = 0.4.", []),
    ans("y9-rat-m6", "Write 0.2 as a simplified fraction.", "0.2", "1/5", 3, "2/10 = 1/5.", ["1 / 5"]),
    mcq("y9-rat-m7", "1/4 gives a decimal that is:", "A", ["terminating", "recurring", "irrational", "negative"], 3, "1/4 = 0.25 terminates."),
    ans("y9-rat-m8", "Write 4/5 as a decimal.", "\\tfrac45", "0.8", 2, "0.8.", []),
    mcq("y9-rat-m9", "Which is larger: 1/2 or 2/5?", "A", ["1/2", "2/5", "equal", "cannot tell"], 3, "0.5 > 0.4."),
    ans("y9-rat-m10", "Write 0.1 as a simplified fraction.", "0.1", "1/10", 2, "1/10.", ["1 / 10"]),
  ],
  masteryQuizPool: [
    ans("y9-rat-p1", "Write 5/8 as a decimal.", "\\tfrac58", "0.625", 5, "5 ÷ 8 = 0.625.", []),
    ans("y9-rat-p2", "Write 0.375 as a simplified fraction.", "0.375", "3/8", 5, "375/1000 = 3/8.", ["3 / 8"]),
    ans("y9-rat-p3", "Write 7/8 as a decimal.", "\\tfrac78", "0.875", 5, "7 ÷ 8 = 0.875.", []),
    ans("y9-rat-p4", "Order 0.6, 3/5, 0.55 — give the largest.", "\\text{order}", "0.6", 5, "3/5 = 0.6; 0.6 = 0.6 > 0.55, so 0.6 (= 3/5) is largest.", ["3/5"]),
    ans("y9-rat-p5", "Write 11/20 as a decimal.", "\\tfrac{11}{20}", "0.55", 5, "11 ÷ 20 = 0.55.", []),
    ans("y9-rat-p6", "Write 0.04 as a simplified fraction.", "0.04", "1/25", 5, "4/100 = 1/25.", ["1 / 25"]),
    ans("y9-rat-p7", "Which is larger: 5/8 or 0.62?", "\\text{compare}", "5/8", 5, "5/8 = 0.625 > 0.62.", ["0.625"]),
    ans("y9-rat-p8", "Write 2/3 as a decimal (recurring; give 3 d.p.).", "\\tfrac23", "0.667", 5, "0.666… ≈ 0.667 to 3 d.p.", ["0.666"]),
    ans("y9-rat-p9", "Write 1.25 as a simplified improper fraction.", "1.25", "5/4", 5, "1.25 = 125/100 = 5/4.", ["5 / 4"]),
    ans("y9-rat-p10", "Write 3/8 + 1/8 as a decimal.", "\\tfrac38+\\tfrac18", "0.5", 5, "4/8 = 1/2 = 0.5.", []),
  ],
  commonMistakes: [
    { mistake: "Thinking only fractions are rational.", fix: "Integers and terminating/recurring decimals are rational too." },
    { mistake: "Dividing denominator by numerator.", fix: "Fraction → decimal is numerator ÷ denominator." },
    { mistake: "Not simplifying a decimal-to-fraction result.", fix: "Reduce 6/10 to 3/5." },
    { mistake: "Calling √2 rational.", fix: "√2 is irrational — it isn't a fraction of integers." },
  ],
  masteryPassMark: 0.8,
};

// ── 1D computation-with-fractions (consolidating) ──────────────────────────────────────
const computationWithFractions: Partial<ExplicitLesson> = {
  description: "Add, subtract, multiply and divide fractions, using common denominators and simplifying.",
  learningIntention: "Operate with fractions confidently and give answers in simplest form.",
  successCriteria: ["Add/subtract fractions using a common denominator.", "Multiply fractions (multiply across).", "Divide fractions (multiply by the reciprocal).", "Simplify the result."],
  teaching: {
    paragraphs: [
      "To ADD or SUBTRACT fractions they need the SAME denominator. 1/4 + 1/2 = 1/4 + 2/4 = 3/4. Find a common denominator, convert, then add the numerators.",
      "To MULTIPLY, just multiply across the tops and across the bottoms: 2/3 × 3/4 = 6/12 = 1/2. Simplify at the end (or cancel first).",
      "To DIVIDE, multiply by the RECIPROCAL (flip the second fraction): 1/2 ÷ 1/4 = 1/2 × 4/1 = 2.",
      "Always give the answer in SIMPLEST form by dividing top and bottom by their highest common factor.",
    ],
    latexBlocks: ["\\tfrac14 + \\tfrac12 = \\tfrac14 + \\tfrac24 = \\tfrac34", "\\tfrac23 \\times \\tfrac34 = \\tfrac{6}{12} = \\tfrac12", "\\tfrac12 \\div \\tfrac14 = \\tfrac12 \\times \\tfrac41 = 2"],
  },
  workedExamples: [
    { title: "Adding", questionLatex: "\\text{Evaluate } \\tfrac14 + \\tfrac12.", steps: [{ explanation: "Common denominator 4.", latex: "\\tfrac14 + \\tfrac24 = \\tfrac34" }], finalAnswerLatex: "\\tfrac34" },
    { title: "Multiplying", questionLatex: "\\text{Evaluate } \\tfrac23 \\times \\tfrac34.", steps: [{ explanation: "Multiply across, simplify.", latex: "\\tfrac{6}{12} = \\tfrac12" }], finalAnswerLatex: "\\tfrac12" },
    { title: "Dividing", questionLatex: "\\text{Evaluate } \\tfrac12 \\div \\tfrac14.", steps: [{ explanation: "Multiply by the reciprocal.", latex: "\\tfrac12 \\times \\tfrac41 = 2" }], finalAnswerLatex: "2" },
  ],
  guidedPractice: [
    ans("y9-fr-g1", "Evaluate 1/3 + 1/3.", "\\tfrac13+\\tfrac13", "2/3", 2, "Same denominator: 2/3.", ["2 / 3"]),
    ans("y9-fr-g2", "Evaluate 1/2 × 1/3.", "\\tfrac12\\times\\tfrac13", "1/6", 2, "Multiply across: 1/6.", ["1 / 6"]),
    ans("y9-fr-g3", "Evaluate 3/4 − 1/4.", "\\tfrac34-\\tfrac14", "1/2", 2, "2/4 = 1/2.", ["1 / 2", "2/4"]),
    mcq("y9-fr-g4", "To divide by a fraction you:", "B", ["multiply by it", "multiply by its reciprocal", "add it", "subtract it"], 2, "Dividing = multiplying by the reciprocal."),
  ],
  independentPractice: [
    ans("y9-fr-i1", "Evaluate 1/2 + 1/4.", "\\tfrac12+\\tfrac14", "3/4", 3, "2/4 + 1/4 = 3/4.", ["3 / 4"]),
    ans("y9-fr-i2", "Evaluate 2/3 × 3/5.", "\\tfrac23\\times\\tfrac35", "2/5", 3, "6/15 = 2/5.", ["2 / 5", "6/15"]),
    ans("y9-fr-i3", "Evaluate 3/4 ÷ 1/2.", "\\tfrac34\\div\\tfrac12", "3/2", 3, "3/4 × 2/1 = 6/4 = 3/2.", ["3 / 2", "1.5", "1 1/2"]),
    ans("y9-fr-i4", "Evaluate 5/6 − 1/3.", "\\tfrac56-\\tfrac13", "1/2", 3, "5/6 − 2/6 = 3/6 = 1/2.", ["1 / 2", "3/6"]),
    ans("y9-fr-i5", "Evaluate 2/5 × 10.", "\\tfrac25\\times10", "4", 3, "20/5 = 4.", []),
  ],
  masteryQuiz: [
    ans("y9-fr-m1", "Evaluate 1/4 + 1/4.", "\\tfrac14+\\tfrac14", "1/2", 2, "2/4 = 1/2.", ["1 / 2", "2/4"]),
    ans("y9-fr-m2", "Evaluate 1/3 × 3/4.", "\\tfrac13\\times\\tfrac34", "1/4", 3, "3/12 = 1/4.", ["1 / 4", "3/12"]),
    ans("y9-fr-m3", "Evaluate 1/2 ÷ 1/8.", "\\tfrac12\\div\\tfrac18", "4", 3, "1/2 × 8 = 4.", []),
    ans("y9-fr-m4", "Evaluate 5/8 − 1/8.", "\\tfrac58-\\tfrac18", "1/2", 2, "4/8 = 1/2.", ["1 / 2", "4/8"]),
    ans("y9-fr-m5", "Evaluate 2/3 + 1/6.", "\\tfrac23+\\tfrac16", "5/6", 3, "4/6 + 1/6 = 5/6.", ["5 / 6"]),
    mcq("y9-fr-m6", "The reciprocal of 3/5 is:", "A", ["5/3", "3/5", "−3/5", "5/5"], 3, "Flip it: 5/3."),
    ans("y9-fr-m7", "Evaluate 3/5 × 5.", "\\tfrac35\\times5", "3", 2, "15/5 = 3.", []),
    ans("y9-fr-m8", "Evaluate 7/10 − 1/5.", "\\tfrac{7}{10}-\\tfrac15", "1/2", 3, "7/10 − 2/10 = 5/10 = 1/2.", ["1 / 2", "5/10"]),
    ans("y9-fr-m9", "Evaluate 2/3 ÷ 4.", "\\tfrac23\\div4", "1/6", 3, "2/3 × 1/4 = 2/12 = 1/6.", ["1 / 6", "2/12"]),
    ans("y9-fr-m10", "Evaluate 1/2 + 1/3.", "\\tfrac12+\\tfrac13", "5/6", 3, "3/6 + 2/6 = 5/6.", ["5 / 6"]),
  ],
  masteryQuizPool: [
    ans("y9-fr-p1", "Evaluate 2/3 + 3/4.", "\\tfrac23+\\tfrac34", "17/12", 5, "8/12 + 9/12 = 17/12.", ["17 / 12", "1 5/12"]),
    ans("y9-fr-p2", "Evaluate 5/6 − 3/8.", "\\tfrac56-\\tfrac38", "11/24", 5, "20/24 − 9/24 = 11/24.", ["11 / 24"]),
    ans("y9-fr-p3", "Evaluate 3/4 × 8/9.", "\\tfrac34\\times\\tfrac89", "2/3", 5, "24/36 = 2/3.", ["2 / 3", "24/36"]),
    ans("y9-fr-p4", "Evaluate 5/6 ÷ 2/3.", "\\tfrac56\\div\\tfrac23", "5/4", 5, "5/6 × 3/2 = 15/12 = 5/4.", ["5 / 4", "1.25", "1 1/4"]),
    ans("y9-fr-p5", "Evaluate 1 1/2 + 2/3 (as an improper fraction).", "1\\tfrac12+\\tfrac23", "13/6", 5, "3/2 + 2/3 = 9/6 + 4/6 = 13/6.", ["13 / 6", "2 1/6"]),
    ans("y9-fr-p6", "Evaluate 7/8 − 1/2 + 1/4.", "\\tfrac78-\\tfrac12+\\tfrac14", "5/8", 5, "7/8 − 4/8 + 2/8 = 5/8.", ["5 / 8"]),
    ans("y9-fr-p7", "Evaluate (2/3)².", "(\\tfrac23)^2", "4/9", 5, "2²/3² = 4/9.", ["4 / 9"]),
    ans("y9-fr-p8", "Evaluate 3/5 of 25.", "\\tfrac35\\text{ of }25", "15", 5, "3/5 × 25 = 15.", []),
    ans("y9-fr-p9", "Evaluate 4/9 ÷ 2/3.", "\\tfrac49\\div\\tfrac23", "2/3", 5, "4/9 × 3/2 = 12/18 = 2/3.", ["2 / 3", "12/18"]),
    ans("y9-fr-p10", "Evaluate 1 − (1/4 + 1/3).", "1-(\\tfrac14+\\tfrac13)", "5/12", 5, "1/4 + 1/3 = 7/12; 1 − 7/12 = 5/12.", ["5 / 12"]),
  ],
  commonMistakes: [
    { mistake: "Adding numerators and denominators directly.", fix: "Use a common denominator first; only add numerators." },
    { mistake: "Finding a common denominator to multiply.", fix: "Multiplication multiplies across — no common denominator needed." },
    { mistake: "Forgetting to flip when dividing.", fix: "Divide = multiply by the reciprocal." },
    { mistake: "Leaving the answer unsimplified.", fix: "Reduce by the highest common factor." },
  ],
  masteryPassMark: 0.8,
};

// ── 1E ratios-rates-best-buys (consolidating) ──────────────────────────────────────────
const ratiosRatesBestBuys: Partial<ExplicitLesson> = {
  description: "Simplify ratios, work with rates and unit rates, and compare to find the best buy.",
  learningIntention: "Use ratios and rates to divide quantities and compare value.",
  successCriteria: ["Simplify a ratio.", "Divide a quantity in a given ratio.", "Find a unit rate.", "Compare unit prices to find the best buy."],
  teaching: {
    paragraphs: [
      "A RATIO compares quantities of the same kind, like 2 : 3. Simplify it by dividing both parts by their highest common factor: 6 : 9 = 2 : 3.",
      "To DIVIDE a quantity in a ratio, add the parts and share. To split $20 in the ratio 2 : 3: total 5 parts, each part $4, giving $8 and $12.",
      "A RATE compares quantities of DIFFERENT kinds, like km per hour or $ per kg. A UNIT RATE is the amount per 1: 150 km in 3 h = 50 km/h.",
      "For BEST BUYS, compare UNIT PRICES (price per unit). $6 for 2 kg is $3/kg; $10 for 4 kg is $2.50/kg — the second is better value.",
    ],
    latexBlocks: ["6 : 9 = 2 : 3", "\\$20 \\text{ in } 2:3 \\to \\$8, \\$12", "\\text{unit price} = \\text{price} \\div \\text{quantity}"],
  },
  workedExamples: [
    { title: "Simplify a ratio", questionLatex: "\\text{Simplify } 6 : 9.", steps: [{ explanation: "Divide both by 3.", latex: "2 : 3" }], finalAnswerLatex: "2 : 3" },
    { title: "Divide in a ratio", questionLatex: "\\text{Divide } \\$20 \\text{ in the ratio } 2 : 3.", steps: [{ explanation: "5 parts, each $4.", latex: "\\$8 \\text{ and } \\$12" }], finalAnswerLatex: "\\$8, \\$12" },
    { title: "Best buy", questionLatex: "\\$6/2\\text{kg vs } \\$10/4\\text{kg — better value?}", steps: [{ explanation: "$3/kg vs $2.50/kg.", latex: "\\$10/4\\text{kg}" }], finalAnswerLatex: "\\$10\\text{ for }4\\text{kg}" },
  ],
  guidedPractice: [
    ans("y9-rr-g1", "Simplify the ratio 4 : 8.", "4:8", "1:2", 2, "Divide both by 4.", ["1 : 2"]),
    ans("y9-rr-g2", "A car travels 120 km in 2 hours. Find the unit rate (km/h).", "120/2", "60", 2, "120 ÷ 2 = 60 km/h.", ["60 km/h"]),
    ans("y9-rr-g3", "Divide $30 in the ratio 1 : 2. Give the larger share.", "\\$30,\\ 1:2", "20", 2, "3 parts of $10; larger = $20.", ["$20"]),
    mcq("y9-rr-g4", "The best buy is the option with the:", "A", ["lowest unit price", "highest total price", "largest size", "smallest size"], 2, "Compare price per unit; lowest wins."),
  ],
  independentPractice: [
    ans("y9-rr-i1", "Simplify the ratio 10 : 15.", "10:15", "2:3", 2, "Divide both by 5.", ["2 : 3"]),
    ans("y9-rr-i2", "Find the unit price: $12 for 4 kg ($/kg).", "12/4", "3", 2, "12 ÷ 4 = $3/kg.", ["$3", "3/kg"]),
    ans("y9-rr-i3", "Divide $48 in the ratio 1 : 3. Give the smaller share.", "\\$48,\\ 1:3", "12", 3, "4 parts of $12; smaller = $12.", ["$12"]),
    ans("y9-rr-i4", "A printer does 90 pages in 3 minutes. Pages per minute?", "90/3", "30", 2, "90 ÷ 3 = 30.", []),
    mcq("y9-rr-i5", "$8 for 2 L or $15 for 5 L — better value?", "B", ["$8 for 2 L", "$15 for 5 L", "same", "cannot tell"], 3, "$4/L vs $3/L → 5 L is better."),
  ],
  masteryQuiz: [
    ans("y9-rr-m1", "Simplify the ratio 9 : 12.", "9:12", "3:4", 2, "Divide both by 3.", ["3 : 4"]),
    ans("y9-rr-m2", "150 km in 3 hours — unit rate (km/h)?", "150/3", "50", 2, "50 km/h.", ["50 km/h"]),
    ans("y9-rr-m3", "Divide $25 in the ratio 2 : 3. Larger share?", "\\$25,\\ 2:3", "15", 3, "5 parts of $5; 3×$5 = $15.", ["$15"]),
    ans("y9-rr-m4", "Unit price: $20 for 5 kg ($/kg).", "20/5", "4", 2, "$4/kg.", ["$4"]),
    mcq("y9-rr-m5", "A rate compares quantities that are:", "B", ["the same kind", "different kinds", "always equal", "always whole"], 2, "Rates compare different kinds (km per hour)."),
    ans("y9-rr-m6", "Simplify the ratio 20 : 4.", "20:4", "5:1", 2, "Divide both by 4.", ["5 : 1"]),
    ans("y9-rr-m7", "240 words in 4 minutes — words per minute?", "240/4", "60", 2, "60.", []),
    ans("y9-rr-m8", "Divide $60 in the ratio 1 : 5. Smaller share?", "\\$60,\\ 1:5", "10", 3, "6 parts of $10; smaller = $10.", ["$10"]),
    mcq("y9-rr-m9", "$9 for 3 kg or $20 for 5 kg — better value?", "A", ["$9 for 3 kg", "$20 for 5 kg", "same", "cannot tell"], 3, "$3/kg vs $4/kg → 3 kg is better."),
    ans("y9-rr-m10", "Unit price: $7.50 for 3 L ($/L).", "7.5/3", "2.5", 3, "7.50 ÷ 3 = $2.50/L.", ["$2.50", "2.50"]),
  ],
  masteryQuizPool: [
    ans("y9-rr-p1", "Divide $90 in the ratio 2 : 3 : 4. Give the largest share.", "\\$90,\\ 2:3:4", "40", 5, "9 parts of $10; 4×$10 = $40.", ["$40"]),
    ans("y9-rr-p2", "Simplify the ratio 18 : 24 : 30.", "18:24:30", "3:4:5", 5, "Divide all by 6.", ["3 : 4 : 5"]),
    ans("y9-rr-p3", "A 750 mL bottle costs $3. Find the unit price in $/L.", "\\$3/750\\text{mL}", "4", 5, "750 mL = 0.75 L; 3 ÷ 0.75 = $4/L.", ["$4", "4/L"]),
    ans("y9-rr-p4", "Concrete mixes cement:sand 1:4. How much sand for 2 kg cement?", "1:4", "8", 5, "Sand = 4 × 2 = 8 kg.", ["8 kg"]),
    ans("y9-rr-p5", "A car uses 24 L for 300 km. Find L per 100 km.", "24/300", "8", 5, "24 ÷ 300 × 100 = 8 L/100km.", ["8 L"]),
    ans("y9-rr-p6", "Best buy unit price: $11.20 for 1.4 kg ($/kg).", "11.2/1.4", "8", 5, "11.20 ÷ 1.4 = $8/kg.", ["$8"]),
    ans("y9-rr-p7", "Divide $84 in the ratio 3 : 4. Give the larger share.", "\\$84,\\ 3:4", "48", 5, "7 parts of $12; 4×$12 = $48.", ["$48"]),
    ans("y9-rr-p8", "A map scale is 1 : 50000. How many real metres is 3 cm?", "1:50000", "1500", 5, "3 cm × 50000 = 150000 cm = 1500 m.", ["1500 m"]),
    ans("y9-rr-p9", "Paint covers 12 m² per litre. Litres for 54 m²?", "54/12", "4.5", 5, "54 ÷ 12 = 4.5 L.", ["4.5 L"]),
    ans("y9-rr-p10", "If 5 pens cost $6, find the cost of 8 pens.", "\\text{unit rate}", "9.6", 5, "Each $1.20; 8 × 1.20 = $9.60.", ["$9.60", "9.60"]),
  ],
  commonMistakes: [
    { mistake: "Not dividing both parts of a ratio by the same number.", fix: "Divide every part by the common factor." },
    { mistake: "Forgetting to add the parts before sharing.", fix: "Total parts first, then size of one part." },
    { mistake: "Comparing total prices instead of unit prices.", fix: "Best buy compares price per unit." },
    { mistake: "Mixing up the order of a ratio.", fix: "Keep parts in the stated order (a : b)." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "computations-with-integers": computationsWithIntegers,
  "rational-numbers": rationalNumbers,
  "computation-with-fractions": computationWithFractions,
  "ratios-rates-best-buys": ratiosRatesBestBuys,
};

export function year9Chapter1NumberLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "computation-financial-maths") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
