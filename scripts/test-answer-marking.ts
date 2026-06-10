import { markTypedAnswer } from "../lib/answerMarking";

type TestCase = {
  name: string;
  userAnswer: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
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

