import { markTypedAnswer } from "../lib/answerMarking";

type TestCase = {
  name: string;
  userAnswer: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
  prompt?: string;
  expected: boolean;
  matchedBy?: "exact" | "accepted" | "normalised";
};

const tests: TestCase[] = [
  { name: "exact match", userAnswer: "42", correctAnswer: "42", expected: true, matchedBy: "exact" },
  { name: "exact case insensitive", userAnswer: "MEDIAN", correctAnswer: "median", expected: true, matchedBy: "exact" },
  { name: "accepted answer", userAnswer: "local max", correctAnswer: "local maximum", acceptedAnswers: ["local max"], expected: true, matchedBy: "accepted" },
  { name: "fraction to decimal", userAnswer: "0.5", correctAnswer: "1/2", expected: true },
  { name: "fraction to percentage", userAnswer: "50%", correctAnswer: "1/2", expected: true },
  { name: "decimal to percentage", userAnswer: "75%", correctAnswer: "0.75", expected: true },
  { name: "percentage points with symbol", userAnswer: "20%", correctAnswer: "20", prompt: "Express this relative frequency as a percentage.", expected: true },
  { name: "percentage points with MathLive escape", userAnswer: "20\\%", correctAnswer: "20", prompt: "Express this relative frequency as a percentage.", expected: true },
  { name: "percentage points with word", userAnswer: "20 percent", correctAnswer: "20", prompt: "Express this relative frequency as a percentage.", expected: true },
  { name: "wrong scaled percentage", userAnswer: "2000%", correctAnswer: "20", prompt: "Express this relative frequency as a percentage.", expected: false },
  { name: "no percentage context", userAnswer: "20%", correctAnswer: "20", expected: false },
  { name: "input percentage is not output context", userAnswer: "2205%", correctAnswer: "2205", prompt: "Find the balance after 2 years at 5 percent p.a.", expected: false },
  { name: "equivalent fraction", userAnswer: "4/10", correctAnswer: "2/5", expected: true },
  { name: "repeating decimal is not approximated", userAnswer: "0.333", correctAnswer: "1/3", expected: false },
  { name: "explicit repeating approximation accepted", userAnswer: "0.333", correctAnswer: "1/3", acceptedAnswers: ["0.333"], expected: true, matchedBy: "accepted" },
  { name: "money dollar sign", userAnswer: "$1200", correctAnswer: "1200", expected: true },
  { name: "money thousands and cents", userAnswer: "$1,200.00", correctAnswer: "1200", expected: true },
  { name: "money trailing zero", userAnswer: "1200.50", correctAnswer: "1200.5", expected: true },
  { name: "money cents remain meaningful", userAnswer: "1200.50", correctAnswer: "1200.05", expected: false },
  { name: "linear unit ignored", userAnswer: "12 cm", correctAnswer: "12", expected: true },
  { name: "squared unit unicode ignored", userAnswer: "12 cm²", correctAnswer: "12 cm^2", expected: true },
  { name: "squared unit compact ignored", userAnswer: "12cm2", correctAnswer: "12 cm^2", expected: true },
  { name: "cubic unit ignored", userAnswer: "12m3", correctAnswer: "12 m^3", expected: true },
  { name: "no unit conversion", userAnswer: "100 cm", correctAnswer: "1 m", expected: false },
  { name: "degree symbol", userAnswer: "53°", correctAnswer: "53", expected: true },
  { name: "degree word", userAnswer: "53 degrees", correctAnswer: "53°", expected: true },
  { name: "coordinate punctuation", userAnswer: "3,4", correctAnswer: "(3, 4)", expected: true },
  { name: "coordinate labels", userAnswer: "x=3, y=4", correctAnswer: "(3,4)", expected: true },
  { name: "coordinate order preserved", userAnswer: "(4,3)", correctAnswer: "(3,4)", expected: false },
  { name: "gradient label optional", userAnswer: "2", correctAnswer: "m=2", expected: true },
  { name: "gradient label accepted from user", userAnswer: "m=2", correctAnswer: "2", expected: true },
  { name: "unknown variable not dropped from correct answer", userAnswer: "5", correctAnswer: "x=5", expected: false },
  { name: "user x label allowed for numeric answer", userAnswer: "x=5", correctAnswer: "5", expected: true },
  { name: "ratio words", userAnswer: "1 to 100", correctAnswer: "1:100", expected: true },
  { name: "ratio spacing", userAnswer: "2 : 3", correctAnswer: "2 to 3", expected: true },
  { name: "ratio order preserved", userAnswer: "3:2", correctAnswer: "2:3", expected: false },
  { name: "unicode minus", userAnswer: "−4", correctAnswer: "-4", expected: true },
  { name: "unicode vulgar fraction one-third", userAnswer: "⅓", correctAnswer: "1/3", expected: true },
  { name: "unicode vulgar fraction one-half", userAnswer: "½", correctAnswer: "1/2", expected: true },
  { name: "unicode vulgar fraction one-quarter", userAnswer: "¼", correctAnswer: "1/4", expected: true },
  { name: "unicode vulgar fraction three-quarters", userAnswer: "¾", correctAnswer: "3/4", expected: true },
  { name: "different number", userAnswer: "12", correctAnswer: "13", expected: false },
  { name: "algebra is not solved", userAnswer: "2(x+1)", correctAnswer: "2x+2", expected: false },
  { name: "unordered set is not reordered", userAnswer: "-3, -2", correctAnswer: "-2, -3", expected: false },

  // ── Unit variants ─────────────────────────────────────────────────────────
  { name: "min unit stripped", userAnswer: "5 min", correctAnswer: "5", expected: true },
  { name: "mins unit stripped", userAnswer: "5 mins", correctAnswer: "5", expected: true },
  { name: "minute unit stripped", userAnswer: "5 minute", correctAnswer: "5", expected: true },
  { name: "minutes unit stripped", userAnswer: "5 minutes", correctAnswer: "5", expected: true },
  { name: "min unit no space", userAnswer: "5min", correctAnswer: "5", expected: true },
  { name: "seconds unit stripped", userAnswer: "30 seconds", correctAnswer: "30", expected: true },
  { name: "sec unit stripped", userAnswer: "30 sec", correctAnswer: "30", expected: true },
  { name: "hours unit stripped", userAnswer: "2 hours", correctAnswer: "2", expected: true },
  { name: "hr unit stripped", userAnswer: "2 hr", correctAnswer: "2", expected: true },
  { name: "metres unit stripped", userAnswer: "3 metres", correctAnswer: "3", expected: true },
  { name: "meters unit stripped", userAnswer: "3 meters", correctAnswer: "3", expected: true },
  { name: "metre unit stripped", userAnswer: "3 metre", correctAnswer: "3", expected: true },
  { name: "meter unit stripped", userAnswer: "3 meter", correctAnswer: "3", expected: true },
  { name: "centimetres unit stripped", userAnswer: "12 centimetres", correctAnswer: "12", expected: true },
  { name: "centimeters unit stripped", userAnswer: "12 centimeters", correctAnswer: "12", expected: true },
  { name: "kilometres unit stripped", userAnswer: "5 kilometres", correctAnswer: "5", expected: true },
  { name: "AUD suffix stripped", userAnswer: "120 AUD", correctAnswer: "120", expected: true },
  { name: "dollar suffix stripped", userAnswer: "120 dollar", correctAnswer: "120", expected: true },
  { name: "dollars suffix stripped", userAnswer: "120 dollars", correctAnswer: "120", expected: true },
  { name: "dollar prefix and AUD suffix both stripped", userAnswer: "$120 AUD", correctAnswer: "120", expected: true },
  { name: "unit mismatch not accepted", userAnswer: "5 minutes", correctAnswer: "2", expected: false },

  // ── Trailing zeros and integer-as-decimal ─────────────────────────────────
  { name: "integer as decimal matches", userAnswer: "3.0", correctAnswer: "3", expected: true },
  { name: "decimal trailing zero matches", userAnswer: "7.50", correctAnswer: "7.5", expected: true },

  // ── Area unit variants ────────────────────────────────────────────────────
  { name: "area m^(2) stripped", userAnswer: "12.6 m^(2)", correctAnswer: "12.6", expected: true },
  { name: "area m^(2) compact stripped", userAnswer: "12.6m^(2)", correctAnswer: "12.6", expected: true },
  { name: "area cm^(2) stripped", userAnswer: "5 cm^(2)", correctAnswer: "5", expected: true },
  { name: "area square metres stripped", userAnswer: "12.6 square metres", correctAnswer: "12.6", expected: true },
  { name: "area square meters stripped", userAnswer: "12.6 square meters", correctAnswer: "12.6", expected: true },
  { name: "area square centimetres stripped", userAnswer: "5 square centimetres", correctAnswer: "5", expected: true },
  { name: "area square centimeters stripped", userAnswer: "5 square centimeters", correctAnswer: "5", expected: true },
  { name: "area m^2 no space stripped", userAnswer: "12.6m^2", correctAnswer: "12.6", expected: true },

  // ── Volume unit variants ──────────────────────────────────────────────────
  { name: "volume m^(3) stripped", userAnswer: "15 m^(3)", correctAnswer: "15", expected: true },
  { name: "volume m^(3) compact stripped", userAnswer: "15m^(3)", correctAnswer: "15", expected: true },
  { name: "volume cm^(3) stripped", userAnswer: "120 cm^(3)", correctAnswer: "120", expected: true },
  { name: "volume cubic metres stripped", userAnswer: "15 cubic metres", correctAnswer: "15", expected: true },
  { name: "volume cubic meters stripped", userAnswer: "15 cubic meters", correctAnswer: "15", expected: true },
  { name: "volume cubic centimetres stripped", userAnswer: "120 cubic centimetres", correctAnswer: "120", expected: true },
  { name: "volume cubic centimeters stripped", userAnswer: "120 cubic centimeters", correctAnswer: "120", expected: true },

  // ── Algebraic power notation equivalence ─────────────────────────────────
  { name: "x^(2) matches x^2", userAnswer: "x^(2)", correctAnswer: "x^2", expected: true },
  { name: "x^2 matches x^(2)", userAnswer: "x^2", correctAnswer: "x^(2)", expected: true },
  { name: "x² matches x^2", userAnswer: "x²", correctAnswer: "x^2", expected: true },
  { name: "x^2 matches x²", userAnswer: "x^2", correctAnswer: "x²", expected: true },
  { name: "y^(2) matches y^2", userAnswer: "y^(2)", correctAnswer: "y^2", expected: true },
  { name: "-18x^(2) matches -18x^2", userAnswer: "-18x^(2)", correctAnswer: "-18x^2", expected: true },
  { name: "x^(3) matches x^3", userAnswer: "x^(3)", correctAnswer: "x^3", expected: true },
  { name: "x^(2) does not match x^3", userAnswer: "x^(2)", correctAnswer: "x^3", expected: false },
  // Coefficient fraction forms are NOT auto-equivalent — use acceptedAnswers in content
  { name: "x/2 does not auto-match 0.5x", userAnswer: "x/2", correctAnswer: "0.5x", expected: false },
  { name: "0.5x does not auto-match x/2", userAnswer: "0.5x", correctAnswer: "x/2", expected: false },

  // ── Clock time 24-hour <-> am/pm equivalence ──────────────────────────────
  { name: "clock 14:30 = 2:30 pm", userAnswer: "2:30 pm", correctAnswer: "14:30", expected: true },
  { name: "clock 2:30 pm = 14:30", userAnswer: "14:30", correctAnswer: "2:30 pm", expected: true },
  { name: "clock 9:05 = 9:05 am", userAnswer: "9:05 am", correctAnswer: "9:05", expected: true },
  { name: "clock 00:15 = 12:15 am", userAnswer: "12:15 am", correctAnswer: "00:15", expected: true },
  { name: "clock 12:00 = 12:00 pm", userAnswer: "12:00 pm", correctAnswer: "12:00", expected: true },
  { name: "clock 12:30 am = 00:30", userAnswer: "12:30 am", correctAnswer: "00:30", expected: true },
  { name: "clock no meridiem does not convert", userAnswer: "2:30", correctAnswer: "14:30", expected: false },
  { name: "clock wrong time does not match", userAnswer: "3:30 pm", correctAnswer: "14:30", expected: false },

  // ── Pi constant: π / \pi / ASCII "pi" equivalence ─────────────────────────
  { name: "ascii pi matches unicode pi", userAnswer: "72pi", correctAnswer: "72π", expected: true },
  { name: "latex pi matches unicode pi", userAnswer: "72\\pi", correctAnswer: "72π", expected: true },
  { name: "spaced ascii pi matches unicode pi", userAnswer: "200 pi", correctAnswer: "200π", expected: true },
  { name: "ascii pi matches latex pi", userAnswer: "200pi", correctAnswer: "200\\pi", expected: true },
  { name: "wrong pi coefficient stays wrong", userAnswer: "73pi", correctAnswer: "72π", expected: false },
  { name: "pi substring not created inside words", userAnswer: "pizza", correctAnswer: "pi", expected: false },

  // ── Inequalities: ≤ / ≥ / \leq / \geq / ASCII equivalence ─────────────────
  { name: "ascii <= matches unicode ≤", userAnswer: "x<=4", correctAnswer: "x≤4", expected: true },
  { name: "ascii >= matches unicode ≥", userAnswer: "x >= -2", correctAnswer: "x≥-2", expected: true },
  { name: "latex \\leq matches unicode ≤", userAnswer: "x<=4", correctAnswer: "x\\leq4", expected: true },
  { name: "latex \\le matches unicode ≤", userAnswer: "x<=4", correctAnswer: "x\\le 4", expected: true },
  { name: "latex \\geq matches unicode ≥", userAnswer: "x>=2", correctAnswer: "x\\geq2", expected: true },
  { name: "strict < does not match ≤", userAnswer: "x<4", correctAnswer: "x≤4", expected: false },
  { name: "wrong inequality bound stays wrong", userAnswer: "x<=5", correctAnswer: "x≤4", expected: false },

  // ── Secondary LaTeX tokens in stored algebraic answers ────────────────────
  { name: "ascii -cos x + C matches latex", userAnswer: "-cos x + C", correctAnswer: "-\\cos x + C", expected: true },
  { name: "ascii sin x + C matches latex", userAnswer: "sin x + C", correctAnswer: "\\sin x + C", expected: true },
  { name: "ascii ln x + C matches latex", userAnswer: "ln x + C", correctAnswer: "\\ln x + C", expected: true },
  { name: "latex \\left \\right brackets stripped", userAnswer: "2(x+1)", correctAnswer: "2\\left(x+1\\right)", expected: true },
  { name: "latex \\times treated as *", userAnswer: "3*x", correctAnswer: "3\\times x", expected: true },
  { name: "wrong trig antiderivative stays wrong", userAnswer: "sin x + C", correctAnswer: "-\\cos x + C", expected: false },

  // ── Unordered solution sets (roots) ───────────────────────────────────────
  // Engages ONLY on explicit "or"/"and" connectives or a repeated same-variable
  // equals list — never on bare comma pairs or coordinates (guarded below).
  { name: "solution set or-connective is unordered", userAnswer: "x=1 or x=-4", correctAnswer: "x=-4,x=1", expected: true },
  { name: "solution set and-connective with bare numbers", userAnswer: "-4 and 1", correctAnswer: "x=1,x=-4", expected: true },
  { name: "solution set or-connective with bare numbers", userAnswer: "-4 or 4", correctAnswer: "x=-4,x=4", expected: true },
  { name: "solution set spaced equals or-connective", userAnswer: "x = 1 or x = -4", correctAnswer: "x=-4,x=1", expected: true },
  { name: "solution set matches via accepted variant", userAnswer: "x=4 or x=-5", correctAnswer: "4,-5", acceptedAnswers: ["x=-5,x=4"], expected: true },
  { name: "solution set wrong member stays wrong", userAnswer: "x=1 or x=5", correctAnswer: "x=-4,x=1", expected: false },
  { name: "solution set wrong size stays wrong", userAnswer: "x=1", correctAnswer: "x=-4,x=1", expected: false },
  { name: "solution set mixed variables not coerced", userAnswer: "x=1 or y=4", correctAnswer: "x=-4,x=1", expected: false },
  // Guards: the new comparator must NOT reorder coordinates or bare comma pairs.
  { name: "bare comma pair stays ordered (not a solution set)", userAnswer: "-4,1", correctAnswer: "1,-4", expected: false },
  { name: "coordinate stays ordered with solution-set change", userAnswer: "(4,3)", correctAnswer: "(3,4)", expected: false },

  // ── alg-fr-m7 marking coverage (Wave 2) ───────────────────────────────────
  // The unfactored denominator 3x/(2x-6) is also fully simplified; both forms
  // are accepted, but only when the required restriction is present.
  { name: "alg-fr-m7 unfactored denominator with spacing accepted", userAnswer: "3x/(2x - 6), x ≠ 3", correctAnswer: "3x/(2(x-3)), x≠3", acceptedAnswers: ["3x/(2x-6), x≠3", "3x/(2x-6), x != 3"], expected: true },
  { name: "alg-fr-m7 unfactored denominator with != accepted", userAnswer: "3x/(2x-6), x != 3", correctAnswer: "3x/(2(x-3)), x≠3", acceptedAnswers: ["3x/(2x-6), x≠3", "3x/(2x-6), x != 3"], expected: true },
  { name: "alg-fr-m7 missing restriction stays wrong", userAnswer: "3x/(2x-6)", correctAnswer: "3x/(2(x-3)), x≠3", acceptedAnswers: ["3x/(2x-6), x≠3", "3x/(2x-6), x != 3"], expected: false },
  { name: "alg-fr-m7 wrong restriction stays wrong", userAnswer: "3x/(2x-6), x≠0", correctAnswer: "3x/(2(x-3)), x≠3", acceptedAnswers: ["3x/(2x-6), x≠3", "3x/(2x-6), x != 3"], expected: false },

  // ── y8-aeq-ips-i1 canonical-answer anchor (urgent defect fix) ──────────────
  // "Does x = -3 satisfy -2x <= 5?" -> -2(-3) = 6, and 6 <= 5 is false, so NO.
  { name: "y8-aeq-ips-i1 NO is correct", userAnswer: "NO", correctAnswer: "NO", acceptedAnswers: ["No", "no"], expected: true },
  { name: "y8-aeq-ips-i1 YES is incorrect", userAnswer: "YES", correctAnswer: "NO", acceptedAnswers: ["No", "no"], expected: false },
];

let failures = 0;

for (const test of tests) {
  const result = markTypedAnswer(test);
  const matchedAsExpected =
    test.matchedBy === undefined || result.matchedBy === test.matchedBy;

  if (result.correct !== test.expected || !matchedAsExpected) {
    failures += 1;
    console.error(`FAIL: ${test.name}`);
    console.error(`  Expected correct=${test.expected}${test.matchedBy ? ` matchedBy=${test.matchedBy}` : ""}`);
    console.error(`  Received correct=${result.correct} matchedBy=${result.matchedBy}`);
  }
}

if (failures > 0) {
  console.error(`\nANSWER MARKING TESTS FAILED: ${failures}/${tests.length}`);
  process.exitCode = 1;
} else {
  console.log(`ANSWER MARKING TESTS PASSED: ${tests.length}/${tests.length}`);
}

