import { parseStudentMath } from "../lib/mathInput/parseStudentMath";

const cases: [string, string][] = [
  ["1/2",           "\\frac{1}{2}"],
  ["-3/4",          "\\frac{-3}{4}"],
  ["x/2",           "\\frac{x}{2}"],
  ["pi/3",          "\\frac{\\pi}{3}"],
  ["sin(x)",        "\\sin(x)"],
  ["cos(theta)",    "\\cos(\\theta)"],
  ["sqrt(5)",       "\\sqrt{5}"],
  ["sqrt(x+1)",     "\\sqrt{x+1}"],
  ["x^2",           "x^{2}"],
  ["x^10",          "x^{10}"],
  ["x^(n+1)",       "x^{n+1}"],
  ["x^2+3x-1",      "x^{2}+3x-1"],
  ["(x+1)/(x-1)",   "\\frac{x+1}{x-1}"],
  ["(2x+3)/5",      "\\frac{2x+3}{5}"],
  ["x=3",           "x=3"],
  ["(3,4)",         "(3,4)"],
  // Intentionally NOT transformed — ambiguous exponent fraction
  ["x^2/3",         "x^{2}/3"],
  ["42",            "42"],
  ["2x+1",          "2x+1"],
];

let pass = 0;
let fail = 0;

for (const [input, expected] of cases) {
  const got = parseStudentMath(input);
  if (got === expected) {
    pass++;
  } else {
    fail++;
    console.log(`FAIL  input=${JSON.stringify(input)}`);
    console.log(`      got:      ${JSON.stringify(got)}`);
    console.log(`      expected: ${JSON.stringify(expected)}`);
  }
}

console.log(`\n${pass}/${cases.length} cases ${fail === 0 ? "PASSED ✓" : "FAILED"}`);
if (fail > 0) process.exit(1);
