import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 8 — Wave 1. D6 (Level-6) challenge pools, 12 per section, for linear-relationships (6
// sections) and pythagoras-theorem (6). Registered course-scoped ("year-8-mathematics/<lesson>") in
// lib/challenges/index.ts; unlocked after mastery via the existing challenge flow (no new system).
// Auto-markable single-value answers. The seeder tags challenge questions as D6, so no per-item
// difficulty field is needed. Exponents (none in prose here — squares written as unicode ²) would be
// wrapped in $...$. Negative answers carry a unicode-minus accepted variant.

const m = (a: string): string[] => (a.includes("-") ? [a.replace(/-/g, "−")] : []);

// ── Linear relationships: number patterns and rules ───────────────────────────────────────────
export const numberPatternsRulesChallenge: PracticeQuestion[] = [
  { id: "chal-y8-npr-1", prompt: "A pattern is 3, 7, 11, 15, ... Find the 10th term.", latex: "t_n=3+4(n-1)", answer: "39", acceptedAnswers: [], hint: "First term 3, common difference 4.", explanation: "3 + 9×4 = 39." },
  { id: "chal-y8-npr-2", prompt: "A rule is t = 5n − 2. Find the 8th term.", latex: "t=5n-2", answer: "38", acceptedAnswers: [], hint: "Substitute n = 8.", explanation: "5×8 − 2 = 38." },
  { id: "chal-y8-npr-3", prompt: "A pattern is 2, 5, 10, 17, ... (rule n² + 1). Find the 6th term.", latex: "t_n=n^2+1", answer: "37", acceptedAnswers: [], hint: "6² + 1.", explanation: "36 + 1 = 37." },
  { id: "chal-y8-npr-4", prompt: "A pattern increases by 6 each time and its 4th term is 25. Find the 1st term.", latex: "25-3(6)", answer: "7", acceptedAnswers: [], hint: "Step back three times.", explanation: "25 − 18 = 7." },
  { id: "chal-y8-npr-5", prompt: "For the rule t = 3n + 4, which term number equals 49?", latex: "3n+4=49", answer: "15", acceptedAnswers: [], hint: "Solve for n.", explanation: "3n = 45 → n = 15." },
  { id: "chal-y8-npr-6", prompt: "A pattern is 100, 92, 84, ... Find the 12th term.", latex: "t_n=100-8(n-1)", answer: "12", acceptedAnswers: [], hint: "Common difference −8.", explanation: "100 + 11×(−8) = 12." },
  { id: "chal-y8-npr-7", prompt: "The nth term is 2n². Find the 5th term.", latex: "t_n=2n^2", answer: "50", acceptedAnswers: [], hint: "2 × 5².", explanation: "2 × 25 = 50." },
  { id: "chal-y8-npr-8", prompt: "A linear pattern has 3rd term 11 and 7th term 31. Find the common difference.", latex: "\\tfrac{31-11}{7-3}", answer: "5", acceptedAnswers: [], hint: "Change in term ÷ change in n.", explanation: "20 / 4 = 5." },
  { id: "chal-y8-npr-9", prompt: "A pattern is 1, 4, 9, 16, ... Find the 9th term.", latex: "t_n=n^2", answer: "81", acceptedAnswers: [], hint: "Square numbers.", explanation: "9² = 81." },
  { id: "chal-y8-npr-10", prompt: "For the rule t = 40 − 3n, find n for the first negative term.", latex: "40-3n<0", answer: "14", acceptedAnswers: [], hint: "40 − 3n < 0.", explanation: "n > 13.3, so n = 14 (value −2)." },
  { id: "chal-y8-npr-11", prompt: "The triangular numbers are 1, 3, 6, 10, ... Find the 7th.", latex: "\\tfrac{n(n+1)}{2}", answer: "28", acceptedAnswers: [], hint: "n(n+1)/2.", explanation: "7×8/2 = 28." },
  { id: "chal-y8-npr-12", prompt: "Each term is double the previous plus 1, starting at 1: 1, 3, 7, 15, ... Find the 6th term.", latex: "t_{n+1}=2t_n+1", answer: "63", acceptedAnswers: [], hint: "Keep doubling and adding 1.", explanation: "1,3,7,15,31,63 → 63." },
];

// ── Linear relationships: coordinates and points ──────────────────────────────────────────────
export const coordinatesPointsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-cap-1", prompt: "Find the x-coordinate of the midpoint of (2, 4) and (8, 10).", latex: "\\tfrac{2+8}{2}", answer: "5", acceptedAnswers: [], hint: "Average the x-values.", explanation: "(2 + 8)/2 = 5." },
  { id: "chal-y8-cap-2", prompt: "Find the x-coordinate of the midpoint of (−3, 5) and (7, −1).", latex: "\\tfrac{-3+7}{2}", answer: "2", acceptedAnswers: [], hint: "Average the x-values.", explanation: "(−3 + 7)/2 = 2." },
  { id: "chal-y8-cap-3", prompt: "Point (−4, 6) lies in which quadrant? Answer 1, 2, 3 or 4.", latex: "(-4,6)", answer: "2", acceptedAnswers: [], hint: "Negative x, positive y.", explanation: "Second quadrant." },
  { id: "chal-y8-cap-4", prompt: "The midpoint of A and B is (3, 4) and A is (1, 2). Find the x-coordinate of B.", latex: "\\tfrac{1+x}{2}=3", answer: "5", acceptedAnswers: [], hint: "1 + x = 6.", explanation: "x = 5." },
  { id: "chal-y8-cap-5", prompt: "Find the distance from (0, 0) to (6, 8).", latex: "\\sqrt{6^2+8^2}", answer: "10", acceptedAnswers: [], hint: "Use Pythagoras.", explanation: "√(36 + 64) = 10." },
  { id: "chal-y8-cap-6", prompt: "A point on the x-axis has what y-coordinate?", latex: "y=?", answer: "0", acceptedAnswers: [], hint: "On the x-axis.", explanation: "y = 0." },
  { id: "chal-y8-cap-7", prompt: "Find the distance between (1, 2) and (4, 6).", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "Differences 3 and 4.", explanation: "√(9 + 16) = 5." },
  { id: "chal-y8-cap-8", prompt: "Reflect (3, −5) in the x-axis. Give the new y-coordinate.", latex: "(3,-5)", answer: "5", acceptedAnswers: [], hint: "The sign of y flips.", explanation: "New y = 5." },
  { id: "chal-y8-cap-9", prompt: "The midpoint of (a, 0) and (0, b) is (4, 3). Find a.", latex: "\\tfrac{a}{2}=4", answer: "8", acceptedAnswers: [], hint: "a/2 = 4.", explanation: "a = 8." },
  { id: "chal-y8-cap-10", prompt: "Point (−2, −7) lies in which quadrant? Answer 1, 2, 3 or 4.", latex: "(-2,-7)", answer: "3", acceptedAnswers: [], hint: "Both negative.", explanation: "Third quadrant." },
  { id: "chal-y8-cap-11", prompt: "Find the distance from (−3, 0) to (3, 0).", latex: "|3-(-3)|", answer: "6", acceptedAnswers: [], hint: "Along the x-axis.", explanation: "6 units." },
  { id: "chal-y8-cap-12", prompt: "Translate (5, 2) by (−3, +4) to get the image. Find the sum of the image's coordinates.", latex: "(5-3)+(2+4)", answer: "8", acceptedAnswers: [], hint: "Image is (2, 6).", explanation: "2 + 6 = 8." },
];

// ── Linear relationships: tables of values ────────────────────────────────────────────────────
export const tablesOfValuesChallenge: PracticeQuestion[] = [
  { id: "chal-y8-tov-1", prompt: "For y = 2x + 1, find y when x = 7.", latex: "y=2x+1", answer: "15", acceptedAnswers: [], hint: "Substitute.", explanation: "14 + 1 = 15." },
  { id: "chal-y8-tov-2", prompt: "For y = 3x − 5, find x when y = 10.", latex: "3x-5=10", answer: "5", acceptedAnswers: [], hint: "Solve for x.", explanation: "3x = 15 → x = 5." },
  { id: "chal-y8-tov-3", prompt: "A table follows y = 3x + 1. Find y when x = 10.", latex: "y=3x+1", answer: "31", acceptedAnswers: [], hint: "Substitute x = 10.", explanation: "30 + 1 = 31." },
  { id: "chal-y8-tov-4", prompt: "For y = −2x + 8, find y when x = 5.", latex: "y=-2x+8", answer: "-2", acceptedAnswers: m("-2"), hint: "Mind the sign.", explanation: "−10 + 8 = −2." },
  { id: "chal-y8-tov-5", prompt: "A table has (0,3), (1,5), (2,7). Find the gradient of the rule.", latex: "\\Delta y/\\Delta x", answer: "2", acceptedAnswers: [], hint: "y rises 2 per step.", explanation: "Gradient 2." },
  { id: "chal-y8-tov-6", prompt: "For y = x² − 1, find y when x = 4.", latex: "y=x^2-1", answer: "15", acceptedAnswers: [], hint: "Square first.", explanation: "16 − 1 = 15." },
  { id: "chal-y8-tov-7", prompt: "For y = 4x, find x when y = 28.", latex: "4x=28", answer: "7", acceptedAnswers: [], hint: "Divide by 4.", explanation: "x = 7." },
  { id: "chal-y8-tov-8", prompt: "A table has y-values 7, 10, 13, 16 for x = 1, 2, 3, 4 (rule y = 3x + 4). Find y when x = 0.", latex: "y=3x+4", answer: "4", acceptedAnswers: [], hint: "Find the rule, then x = 0.", explanation: "y = 4." },
  { id: "chal-y8-tov-9", prompt: "For y = 10 − x, find y when x = 13.", latex: "y=10-x", answer: "-3", acceptedAnswers: m("-3"), hint: "10 − 13.", explanation: "−3." },
  { id: "chal-y8-tov-10", prompt: "For y = 5x − 3, find x when y = 22.", latex: "5x-3=22", answer: "5", acceptedAnswers: [], hint: "5x = 25.", explanation: "x = 5." },
  { id: "chal-y8-tov-11", prompt: "A linear table has (2, 8) and (5, 20) and passes through the origin. Find y when x = 10.", latex: "y=4x", answer: "40", acceptedAnswers: [], hint: "Rule is y = 4x.", explanation: "4 × 10 = 40." },
  { id: "chal-y8-tov-12", prompt: "For y = ½x + 6, find y when x = 8.", latex: "y=\\tfrac12 x+6", answer: "10", acceptedAnswers: [], hint: "Half of 8, plus 6.", explanation: "4 + 6 = 10." },
];

// ── Linear relationships: graphing ────────────────────────────────────────────────────────────
export const graphingLinearRelationshipsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-glr-1", prompt: "Find the y-intercept of y = 3x − 7.", latex: "y=3x-7", answer: "-7", acceptedAnswers: m("-7"), hint: "Value of y when x = 0.", explanation: "−7." },
  { id: "chal-y8-glr-2", prompt: "Find the x-intercept of y = 2x − 8 (the x-value where y = 0).", latex: "2x-8=0", answer: "4", acceptedAnswers: [], hint: "Set y = 0.", explanation: "x = 4." },
  { id: "chal-y8-glr-3", prompt: "Does (3, 5) lie on y = 2x − 1? Answer yes or no.", latex: "y=2x-1", answer: "yes", acceptedAnswers: ["y"], hint: "Substitute x = 3.", explanation: "2×3 − 1 = 5 ✓." },
  { id: "chal-y8-glr-4", prompt: "Find the y-intercept of y = −4x + 9.", latex: "y=-4x+9", answer: "9", acceptedAnswers: [], hint: "x = 0.", explanation: "9." },
  { id: "chal-y8-glr-5", prompt: "The line y = mx + 2 passes through (3, 11). Find m.", latex: "11=3m+2", answer: "3", acceptedAnswers: [], hint: "Solve for m.", explanation: "3m = 9 → m = 3." },
  { id: "chal-y8-glr-6", prompt: "Find the x-intercept of y = −x + 6.", latex: "-x+6=0", answer: "6", acceptedAnswers: [], hint: "Set y = 0.", explanation: "x = 6." },
  { id: "chal-y8-glr-7", prompt: "A line passes through (0, −3) and (4, 5). Find its gradient.", latex: "\\tfrac{5-(-3)}{4-0}", answer: "2", acceptedAnswers: [], hint: "Rise over run.", explanation: "8 / 4 = 2." },
  { id: "chal-y8-glr-8", prompt: "Does (−2, 7) lie on y = −3x + 1? Answer yes or no.", latex: "y=-3x+1", answer: "yes", acceptedAnswers: ["y"], hint: "Substitute x = −2.", explanation: "−3×(−2) + 1 = 7 ✓." },
  { id: "chal-y8-glr-9", prompt: "The line y = 2x + c passes through (5, 4). Find c.", latex: "4=10+c", answer: "-6", acceptedAnswers: m("-6"), hint: "Solve for c.", explanation: "c = −6." },
  { id: "chal-y8-glr-10", prompt: "Find the y-intercept of 2x + y = 10.", latex: "2x+y=10", answer: "10", acceptedAnswers: [], hint: "Set x = 0.", explanation: "y = 10." },
  { id: "chal-y8-glr-11", prompt: "Find the x-intercept of y = 3x + 12.", latex: "3x+12=0", answer: "-4", acceptedAnswers: m("-4"), hint: "Set y = 0.", explanation: "3x = −12 → x = −4." },
  { id: "chal-y8-glr-12", prompt: "A line has gradient 4 and passes through (2, 3). Find its y-intercept.", latex: "3=4(2)+c", answer: "-5", acceptedAnswers: m("-5"), hint: "Find c in y = 4x + c.", explanation: "3 = 8 + c → c = −5." },
];

// ── Linear relationships: gradient as rate of change ──────────────────────────────────────────
export const gradientRateOfChangeChallenge: PracticeQuestion[] = [
  { id: "chal-y8-grc-1", prompt: "Find the gradient through (1, 2) and (4, 11).", latex: "\\tfrac{11-2}{4-1}", answer: "3", acceptedAnswers: [], hint: "Rise over run.", explanation: "9 / 3 = 3." },
  { id: "chal-y8-grc-2", prompt: "A tank fills at 5 L per minute. How many litres in 8 minutes?", latex: "5\\times8", answer: "40", acceptedAnswers: [], hint: "Rate × time.", explanation: "40 L." },
  { id: "chal-y8-grc-3", prompt: "Find the gradient through (0, 5) and (10, 25).", latex: "\\tfrac{25-5}{10}", answer: "2", acceptedAnswers: [], hint: "Rise over run.", explanation: "20 / 10 = 2." },
  { id: "chal-y8-grc-4", prompt: "A line falls 12 over a run of 3. Find the gradient.", latex: "\\tfrac{-12}{3}", answer: "-4", acceptedAnswers: m("-4"), hint: "A fall is negative.", explanation: "−12 / 3 = −4." },
  { id: "chal-y8-grc-5", prompt: "A car uses 8 L per 100 km. How many litres for 250 km?", latex: "\\tfrac{8}{100}\\times250", answer: "20", acceptedAnswers: [], hint: "Rate × distance.", explanation: "0.08 × 250 = 20 L." },
  { id: "chal-y8-grc-6", prompt: "Find the gradient through (−2, 3) and (2, 11).", latex: "\\tfrac{11-3}{2-(-2)}", answer: "2", acceptedAnswers: [], hint: "Rise over run.", explanation: "8 / 4 = 2." },
  { id: "chal-y8-grc-7", prompt: "A phone plan costs $0.10 per minute. Find the cost of 45 minutes ($).", latex: "0.10\\times45", answer: "4.5", acceptedAnswers: [], hint: "Rate × minutes.", explanation: "$4.50." },
  { id: "chal-y8-grc-8", prompt: "Find the gradient through (3, 7) and (3, 2).", latex: "\\text{run}=0", answer: "undefined", acceptedAnswers: ["no gradient"], hint: "What is the run?", explanation: "Run is 0 — gradient undefined." },
  { id: "chal-y8-grc-9", prompt: "A line rises 15 over a run of 5. Find the gradient.", latex: "\\tfrac{15}{5}", answer: "3", acceptedAnswers: [], hint: "Rise over run.", explanation: "3." },
  { id: "chal-y8-grc-10", prompt: "Temperature rises 3°C per hour from 12°C. Find the temperature after 5 hours (°C).", latex: "12+3(5)", answer: "27", acceptedAnswers: [], hint: "Start + rate × time.", explanation: "12 + 15 = 27." },
  { id: "chal-y8-grc-11", prompt: "Find the gradient through (1, 9) and (5, 1).", latex: "\\tfrac{1-9}{5-1}", answer: "-2", acceptedAnswers: m("-2"), hint: "Rise over run.", explanation: "−8 / 4 = −2." },
  { id: "chal-y8-grc-12", prompt: "A worker earns $90 for 6 hours. Find the rate ($/hour).", latex: "90/6", answer: "15", acceptedAnswers: [], hint: "Pay ÷ hours.", explanation: "$15/h." },
];

// ── Linear relationships: interpreting linear graphs ──────────────────────────────────────────
export const interpretingLinearGraphsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-ilg-1", prompt: "A cost line is cost = 5 + 2x (x = items). Find the cost of 10 items.", latex: "5+2(10)", answer: "25", acceptedAnswers: [], hint: "Substitute x = 10.", explanation: "5 + 20 = 25." },
  { id: "chal-y8-ilg-2", prompt: "A line falls from (0, 20) to (5, 0). Find its gradient.", latex: "\\tfrac{0-20}{5-0}", answer: "-4", acceptedAnswers: m("-4"), hint: "Rise over run.", explanation: "−20 / 5 = −4." },
  { id: "chal-y8-ilg-3", prompt: "A distance-time graph has gradient 60. What speed does it represent (km/h)?", latex: "\\text{gradient}=\\text{speed}", answer: "60", acceptedAnswers: [], hint: "Gradient = speed.", explanation: "60 km/h." },
  { id: "chal-y8-ilg-4", prompt: "A cost line is y = 4x + 15. The y-intercept is the fixed cost. Find it ($).", latex: "y=4x+15", answer: "15", acceptedAnswers: [], hint: "Value at x = 0.", explanation: "$15." },
  { id: "chal-y8-ilg-5", prompt: "A line through the origin has gradient 8. Find y when x = 7.", latex: "y=8x", answer: "56", acceptedAnswers: [], hint: "8 × 7.", explanation: "56." },
  { id: "chal-y8-ilg-6", prompt: "Lines y = 2x and y = x + 3 intersect. Find the x-coordinate of the intersection.", latex: "2x=x+3", answer: "3", acceptedAnswers: [], hint: "Set equal.", explanation: "2x = x + 3 → x = 3." },
  { id: "chal-y8-ilg-7", prompt: "A line is y = 100 − 20x. Find x when y = 0.", latex: "100-20x=0", answer: "5", acceptedAnswers: [], hint: "Set y = 0.", explanation: "20x = 100 → x = 5." },
  { id: "chal-y8-ilg-8", prompt: "A draining pool is V = 2000 − 50t. Find V when t = 30.", latex: "2000-50(30)", answer: "500", acceptedAnswers: [], hint: "Substitute t = 30.", explanation: "2000 − 1500 = 500." },
  { id: "chal-y8-ilg-9", prompt: "Lines y = 3x − 1 and y = x + 5 intersect. Find the x-coordinate.", latex: "3x-1=x+5", answer: "3", acceptedAnswers: [], hint: "Set equal.", explanation: "2x = 6 → x = 3." },
  { id: "chal-y8-ilg-10", prompt: "A taxi fare is F = 4 + 2d. Find d when F = 20.", latex: "4+2d=20", answer: "8", acceptedAnswers: [], hint: "Solve for d.", explanation: "2d = 16 → d = 8." },
  { id: "chal-y8-ilg-11", prompt: "A line rises from (2, 10) to (6, 30). Find the rate of change per unit.", latex: "\\tfrac{30-10}{6-2}", answer: "5", acceptedAnswers: [], hint: "Rise over run.", explanation: "20 / 4 = 5." },
  { id: "chal-y8-ilg-12", prompt: "A water level is y = 50 − 5x. After how many x is the level 0?", latex: "50-5x=0", answer: "10", acceptedAnswers: [], hint: "Set y = 0.", explanation: "5x = 50 → x = 10." },
];

// ── Pythagoras: right-angled triangles ────────────────────────────────────────────────────────
export const rightAngledTrianglesPythagorasChallenge: PracticeQuestion[] = [
  { id: "chal-y8-rtp-1", prompt: "A right triangle has legs 3 and 4. Find the hypotenuse.", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "3-4-5 triple.", explanation: "√25 = 5." },
  { id: "chal-y8-rtp-2", prompt: "A right triangle has legs 6 and 8. Find the hypotenuse.", latex: "\\sqrt{6^2+8^2}", answer: "10", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "√100 = 10." },
  { id: "chal-y8-rtp-3", prompt: "Is a triangle with sides 5, 12, 13 right-angled? Answer yes or no.", latex: "5^2+12^2=13^2", answer: "yes", acceptedAnswers: ["y"], hint: "Check 25 + 144 = 169.", explanation: "169 = 169 ✓." },
  { id: "chal-y8-rtp-4", prompt: "A right triangle has legs 9 and 12. Find the hypotenuse.", latex: "\\sqrt{9^2+12^2}", answer: "15", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "√225 = 15." },
  { id: "chal-y8-rtp-5", prompt: "Is a triangle with sides 7, 8, 11 right-angled? Answer yes or no.", latex: "7^2+8^2\\ne11^2", answer: "no", acceptedAnswers: ["n"], hint: "49 + 64 vs 121.", explanation: "113 ≠ 121 → no." },
  { id: "chal-y8-rtp-6", prompt: "A right triangle has hypotenuse 13 and one leg 5. Find the other leg.", latex: "\\sqrt{13^2-5^2}", answer: "12", acceptedAnswers: [], hint: "169 − 25.", explanation: "√144 = 12." },
  { id: "chal-y8-rtp-7", prompt: "A right triangle has legs 8 and 15. Find the hypotenuse.", latex: "\\sqrt{8^2+15^2}", answer: "17", acceptedAnswers: [], hint: "8-15-17 triple.", explanation: "√289 = 17." },
  { id: "chal-y8-rtp-8", prompt: "A right triangle has legs 10 and 24. Find the hypotenuse.", latex: "\\sqrt{10^2+24^2}", answer: "26", acceptedAnswers: [], hint: "Scale of 5-12-13.", explanation: "√676 = 26." },
  { id: "chal-y8-rtp-9", prompt: "Is a triangle with sides 9, 40, 41 right-angled? Answer yes or no.", latex: "9^2+40^2=41^2", answer: "yes", acceptedAnswers: ["y"], hint: "81 + 1600 = 1681.", explanation: "1681 = 41² ✓." },
  { id: "chal-y8-rtp-10", prompt: "A right triangle has hypotenuse 25 and one leg 7. Find the other leg.", latex: "\\sqrt{25^2-7^2}", answer: "24", acceptedAnswers: [], hint: "625 − 49.", explanation: "√576 = 24." },
  { id: "chal-y8-rtp-11", prompt: "A right triangle has legs 20 and 21. Find the hypotenuse.", latex: "\\sqrt{20^2+21^2}", answer: "29", acceptedAnswers: [], hint: "400 + 441.", explanation: "√841 = 29." },
  { id: "chal-y8-rtp-12", prompt: "A right triangle has hypotenuse 10 and one leg 6. Find the other leg.", latex: "\\sqrt{10^2-6^2}", answer: "8", acceptedAnswers: [], hint: "100 − 36.", explanation: "√64 = 8." },
];

// ── Pythagoras: finding the hypotenuse ────────────────────────────────────────────────────────
export const findingHypotenuseChallenge: PracticeQuestion[] = [
  { id: "chal-y8-fth-1", prompt: "Find the hypotenuse of a right triangle with legs 3 and 4.", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "3-4-5.", explanation: "5." },
  { id: "chal-y8-fth-2", prompt: "Find the hypotenuse with legs 5 and 12.", latex: "\\sqrt{5^2+12^2}", answer: "13", acceptedAnswers: [], hint: "5-12-13.", explanation: "13." },
  { id: "chal-y8-fth-3", prompt: "Find the hypotenuse with legs 6 and 8.", latex: "\\sqrt{6^2+8^2}", answer: "10", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "10." },
  { id: "chal-y8-fth-4", prompt: "Find the hypotenuse with legs 9 and 40.", latex: "\\sqrt{9^2+40^2}", answer: "41", acceptedAnswers: [], hint: "9-40-41.", explanation: "41." },
  { id: "chal-y8-fth-5", prompt: "Find the hypotenuse with legs 12 and 16.", latex: "\\sqrt{12^2+16^2}", answer: "20", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "20." },
  { id: "chal-y8-fth-6", prompt: "Find the hypotenuse with legs 7 and 24.", latex: "\\sqrt{7^2+24^2}", answer: "25", acceptedAnswers: [], hint: "7-24-25.", explanation: "25." },
  { id: "chal-y8-fth-7", prompt: "Find the hypotenuse with legs 20 and 15.", latex: "\\sqrt{20^2+15^2}", answer: "25", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "25." },
  { id: "chal-y8-fth-8", prompt: "Find the hypotenuse with legs 10 and 24.", latex: "\\sqrt{10^2+24^2}", answer: "26", acceptedAnswers: [], hint: "Scale of 5-12-13.", explanation: "26." },
  { id: "chal-y8-fth-9", prompt: "Find the hypotenuse with legs 18 and 24.", latex: "\\sqrt{18^2+24^2}", answer: "30", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "30." },
  { id: "chal-y8-fth-10", prompt: "Find the hypotenuse with legs 8 and 15.", latex: "\\sqrt{8^2+15^2}", answer: "17", acceptedAnswers: [], hint: "8-15-17.", explanation: "17." },
  { id: "chal-y8-fth-11", prompt: "A right isosceles triangle has legs of 6. Find the square of the hypotenuse.", latex: "6^2+6^2", answer: "72", acceptedAnswers: [], hint: "Add the two squares.", explanation: "36 + 36 = 72." },
  { id: "chal-y8-fth-12", prompt: "Find the hypotenuse with legs 11 and 60.", latex: "\\sqrt{11^2+60^2}", answer: "61", acceptedAnswers: [], hint: "11-60-61.", explanation: "61." },
];

// ── Pythagoras: finding a shorter side ────────────────────────────────────────────────────────
export const findingShorterSideChallenge: PracticeQuestion[] = [
  { id: "chal-y8-fss-1", prompt: "Hypotenuse 13, one leg 5. Find the other leg.", latex: "\\sqrt{13^2-5^2}", answer: "12", acceptedAnswers: [], hint: "169 − 25.", explanation: "12." },
  { id: "chal-y8-fss-2", prompt: "Hypotenuse 17, one leg 8. Find the other leg.", latex: "\\sqrt{17^2-8^2}", answer: "15", acceptedAnswers: [], hint: "289 − 64.", explanation: "15." },
  { id: "chal-y8-fss-3", prompt: "Hypotenuse 25, one leg 24. Find the other leg.", latex: "\\sqrt{25^2-24^2}", answer: "7", acceptedAnswers: [], hint: "625 − 576.", explanation: "7." },
  { id: "chal-y8-fss-4", prompt: "Hypotenuse 10, one leg 8. Find the other leg.", latex: "\\sqrt{10^2-8^2}", answer: "6", acceptedAnswers: [], hint: "100 − 64.", explanation: "6." },
  { id: "chal-y8-fss-5", prompt: "Hypotenuse 41, one leg 9. Find the other leg.", latex: "\\sqrt{41^2-9^2}", answer: "40", acceptedAnswers: [], hint: "1681 − 81.", explanation: "40." },
  { id: "chal-y8-fss-6", prompt: "Hypotenuse 15, one leg 12. Find the other leg.", latex: "\\sqrt{15^2-12^2}", answer: "9", acceptedAnswers: [], hint: "225 − 144.", explanation: "9." },
  { id: "chal-y8-fss-7", prompt: "Hypotenuse 26, one leg 10. Find the other leg.", latex: "\\sqrt{26^2-10^2}", answer: "24", acceptedAnswers: [], hint: "676 − 100.", explanation: "24." },
  { id: "chal-y8-fss-8", prompt: "Hypotenuse 29, one leg 20. Find the other leg.", latex: "\\sqrt{29^2-20^2}", answer: "21", acceptedAnswers: [], hint: "841 − 400.", explanation: "21." },
  { id: "chal-y8-fss-9", prompt: "Hypotenuse 5, one leg 3. Find the other leg.", latex: "\\sqrt{5^2-3^2}", answer: "4", acceptedAnswers: [], hint: "3-4-5.", explanation: "4." },
  { id: "chal-y8-fss-10", prompt: "Hypotenuse 37, one leg 12. Find the other leg.", latex: "\\sqrt{37^2-12^2}", answer: "35", acceptedAnswers: [], hint: "1369 − 144.", explanation: "35." },
  { id: "chal-y8-fss-11", prompt: "Hypotenuse 50, one leg 30. Find the other leg.", latex: "\\sqrt{50^2-30^2}", answer: "40", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "40." },
  { id: "chal-y8-fss-12", prompt: "Hypotenuse 20, one leg 16. Find the other leg.", latex: "\\sqrt{20^2-16^2}", answer: "12", acceptedAnswers: [], hint: "400 − 256.", explanation: "12." },
];

// ── Pythagoras: real contexts ─────────────────────────────────────────────────────────────────
export const pythagorasRealContextsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-prc-1", prompt: "A 13 m ladder reaches 12 m up a wall. Find the distance of its base from the wall (m).", latex: "\\sqrt{13^2-12^2}", answer: "5", acceptedAnswers: [], hint: "169 − 144.", explanation: "5 m." },
  { id: "chal-y8-prc-2", prompt: "A rectangle is 6 by 8. Find the length of its diagonal.", latex: "\\sqrt{6^2+8^2}", answer: "10", acceptedAnswers: [], hint: "6-8-10.", explanation: "10." },
  { id: "chal-y8-prc-3", prompt: "A TV screen is 16 wide and 12 tall. Find the diagonal (screen size).", latex: "\\sqrt{16^2+12^2}", answer: "20", acceptedAnswers: [], hint: "Scale of 4-3-5.", explanation: "20." },
  { id: "chal-y8-prc-4", prompt: "A ship sails 9 km east then 12 km north. Find its distance from the start (km).", latex: "\\sqrt{9^2+12^2}", answer: "15", acceptedAnswers: [], hint: "9-12-15.", explanation: "15 km." },
  { id: "chal-y8-prc-5", prompt: "A 17 m wire runs from the top of a 15 m pole to the ground. Find its distance from the base (m).", latex: "\\sqrt{17^2-15^2}", answer: "8", acceptedAnswers: [], hint: "289 − 225.", explanation: "8 m." },
  { id: "chal-y8-prc-6", prompt: "A rectangular field is 40 m by 30 m. Find the diagonal (m).", latex: "\\sqrt{40^2+30^2}", answer: "50", acceptedAnswers: [], hint: "Scale of 4-3-5.", explanation: "50 m." },
  { id: "chal-y8-prc-7", prompt: "A ramp rises 7 m over a horizontal distance of 24 m. Find the ramp length (m).", latex: "\\sqrt{7^2+24^2}", answer: "25", acceptedAnswers: [], hint: "7-24-25.", explanation: "25 m." },
  { id: "chal-y8-prc-8", prompt: "A kite string is 25 m and the kite is 24 m high. Find the horizontal distance (m).", latex: "\\sqrt{25^2-24^2}", answer: "7", acceptedAnswers: [], hint: "625 − 576.", explanation: "7 m." },
  { id: "chal-y8-prc-9", prompt: "A square paddock has side 9 m. Find the square of its diagonal (m²).", latex: "9^2+9^2", answer: "162", acceptedAnswers: [], hint: "Add the two squares.", explanation: "81 + 81 = 162." },
  { id: "chal-y8-prc-10", prompt: "A pole 6 m tall casts an 8 m shadow. Find the distance from the top of the pole to the shadow's tip (m).", latex: "\\sqrt{6^2+8^2}", answer: "10", acceptedAnswers: [], hint: "6-8-10.", explanation: "10 m." },
  { id: "chal-y8-prc-11", prompt: "Two roads meet at right angles; A is 60 m along one, B is 80 m along the other. Find the distance AB (m).", latex: "\\sqrt{60^2+80^2}", answer: "100", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "100 m." },
  { id: "chal-y8-prc-12", prompt: "A box base is 5 by 12. Find the diagonal of the base.", latex: "\\sqrt{5^2+12^2}", answer: "13", acceptedAnswers: [], hint: "5-12-13.", explanation: "13." },
];

// ── Pythagoras: Pythagorean triples ───────────────────────────────────────────────────────────
export const pythagoreanTriplesChallenge: PracticeQuestion[] = [
  { id: "chal-y8-ptr-1", prompt: "Is 8, 15, 17 a Pythagorean triple? Answer yes or no.", latex: "8^2+15^2=17^2", answer: "yes", acceptedAnswers: ["y"], hint: "64 + 225 = 289.", explanation: "289 = 17² ✓." },
  { id: "chal-y8-ptr-2", prompt: "Scale the triple 3, 4, 5 by 6. Give the hypotenuse.", latex: "5\\times6", answer: "30", acceptedAnswers: [], hint: "Multiply the 5 by 6.", explanation: "30." },
  { id: "chal-y8-ptr-3", prompt: "Is 5, 6, 8 a Pythagorean triple? Answer yes or no.", latex: "5^2+6^2\\ne8^2", answer: "no", acceptedAnswers: ["n"], hint: "25 + 36 vs 64.", explanation: "61 ≠ 64 → no." },
  { id: "chal-y8-ptr-4", prompt: "The triple 5, 12, 13 is scaled to give a hypotenuse of 39. Find the scale factor.", latex: "39/13", answer: "3", acceptedAnswers: [], hint: "39 ÷ 13.", explanation: "3." },
  { id: "chal-y8-ptr-5", prompt: "Is 20, 21, 29 a Pythagorean triple? Answer yes or no.", latex: "20^2+21^2=29^2", answer: "yes", acceptedAnswers: ["y"], hint: "400 + 441 = 841.", explanation: "841 = 29² ✓." },
  { id: "chal-y8-ptr-6", prompt: "Find the missing number in the triple 9, 12, ?.", latex: "\\sqrt{9^2+12^2}", answer: "15", acceptedAnswers: [], hint: "Scale of 3-4-5.", explanation: "15." },
  { id: "chal-y8-ptr-7", prompt: "Scale the triple 7, 24, 25 by 2. Give the longest side.", latex: "25\\times2", answer: "50", acceptedAnswers: [], hint: "Double the 25.", explanation: "50." },
  { id: "chal-y8-ptr-8", prompt: "Is 6, 8, 10 a Pythagorean triple? Answer yes or no.", latex: "6^2+8^2=10^2", answer: "yes", acceptedAnswers: ["y"], hint: "Scale of 3-4-5.", explanation: "100 = 10² ✓." },
  { id: "chal-y8-ptr-9", prompt: "The two smaller numbers of a triple are 10 and 24. Find the largest.", latex: "\\sqrt{10^2+24^2}", answer: "26", acceptedAnswers: [], hint: "Scale of 5-12-13.", explanation: "26." },
  { id: "chal-y8-ptr-10", prompt: "Is 9, 40, 41 a Pythagorean triple? Answer yes or no.", latex: "9^2+40^2=41^2", answer: "yes", acceptedAnswers: ["y"], hint: "81 + 1600 = 1681.", explanation: "1681 = 41² ✓." },
  { id: "chal-y8-ptr-11", prompt: "A triple has legs 16 and 30. Find the hypotenuse.", latex: "\\sqrt{16^2+30^2}", answer: "34", acceptedAnswers: [], hint: "Scale of 8-15-17.", explanation: "34." },
  { id: "chal-y8-ptr-12", prompt: "Double the triple 8, 15, 17. Give the hypotenuse.", latex: "17\\times2", answer: "34", acceptedAnswers: [], hint: "Double the 17.", explanation: "34." },
];

// ── Pythagoras: distance between two points ───────────────────────────────────────────────────
export const distanceBetweenPointsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-dbp-1", prompt: "Find the distance between (0, 0) and (3, 4).", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "3-4-5.", explanation: "5." },
  { id: "chal-y8-dbp-2", prompt: "Find the distance between (1, 2) and (4, 6).", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "Differences 3 and 4.", explanation: "5." },
  { id: "chal-y8-dbp-3", prompt: "Find the distance between (−2, 1) and (1, 5).", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "Differences 3 and 4.", explanation: "5." },
  { id: "chal-y8-dbp-4", prompt: "Find the distance between (0, 0) and (5, 12).", latex: "\\sqrt{5^2+12^2}", answer: "13", acceptedAnswers: [], hint: "5-12-13.", explanation: "13." },
  { id: "chal-y8-dbp-5", prompt: "Find the distance between (2, 3) and (2, 3).", latex: "0", answer: "0", acceptedAnswers: [], hint: "Same point.", explanation: "0." },
  { id: "chal-y8-dbp-6", prompt: "Find the distance between (−3, −4) and (0, 0).", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "3-4-5.", explanation: "5." },
  { id: "chal-y8-dbp-7", prompt: "Find the distance between (1, 1) and (9, 7).", latex: "\\sqrt{8^2+6^2}", answer: "10", acceptedAnswers: [], hint: "Differences 8 and 6.", explanation: "√100 = 10." },
  { id: "chal-y8-dbp-8", prompt: "Find the distance between (6, 8) and (0, 0).", latex: "\\sqrt{6^2+8^2}", answer: "10", acceptedAnswers: [], hint: "6-8-10.", explanation: "10." },
  { id: "chal-y8-dbp-9", prompt: "Find the distance between (−5, 0) and (7, 0).", latex: "|7-(-5)|", answer: "12", acceptedAnswers: [], hint: "Along the x-axis.", explanation: "12." },
  { id: "chal-y8-dbp-10", prompt: "Find the distance between (3, 4) and (6, 8).", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "Differences 3 and 4.", explanation: "5." },
  { id: "chal-y8-dbp-11", prompt: "Find the distance between (0, 0) and (8, 15).", latex: "\\sqrt{8^2+15^2}", answer: "17", acceptedAnswers: [], hint: "8-15-17.", explanation: "17." },
  { id: "chal-y8-dbp-12", prompt: "Find the distance between (−1, −1) and (2, 3).", latex: "\\sqrt{3^2+4^2}", answer: "5", acceptedAnswers: [], hint: "Differences 3 and 4.", explanation: "5." },
];
