// Year 9 Wave 5 — Chapter 4 (Linear Relationships) D6 challenge pools (Level-6 tier, post-mastery;
// ADR-Y9-001). 12 markable questions per section. Registered course-scoped in lib/challenges/index.ts
// (consolidating → Core; path → base + advanced; core → all 3). (gradient D6 lives in year9Wave1.ts.)

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — combine several steps.", explanation };
}
const xv = (n: string) => [n, `x=${n}`, `x = ${n}`];
const pt = (a: string) => [a, `(${a})`, a.replace(/[()\s]/g, "")];

// introducing-linear-relationships (consol)
export const introLinearY9Challenge: PracticeQuestion[] = [
  q("y9c-ilr-1", "For y = 2x − 3, find x when y = 7.", "y=2x-3,\\ y=7", "5", "2x − 3 = 7 → 2x = 10 → x = 5.", xv("5")),
  q("y9c-ilr-2", "For y = 3x + 2, find x when y = 20.", "y=3x+2,\\ y=20", "6", "3x = 18 → x = 6.", xv("6")),
  q("y9c-ilr-3", "x: 0,1,2 → y: 7,10,13. Find y when x = 10.", "\\text{rule}", "37", "Rule y = 3x + 7 → 37.", []),
  q("y9c-ilr-4", "For y = 5x − 1, find x when y = 24.", "y=5x-1,\\ y=24", "5", "5x = 25 → x = 5.", xv("5")),
  q("y9c-ilr-5", "For y = 100 − 4x, find x when y = 40.", "y=100-4x,\\ y=40", "15", "4x = 60 → x = 15.", xv("15")),
  q("y9c-ilr-6", "For y = 2x + 1, find y when x = −3.", "y=2x+1,\\ x=-3", "-5", "−6 + 1 = −5.", ["−5"]),
  q("y9c-ilr-7", "x: 1,2,3 → y: 5,9,13. Find the rate of change.", "\\text{rate}", "4", "Constant difference 4.", []),
  q("y9c-ilr-8", "For y = −3x + 10, find x when y = 1.", "y=-3x+10,\\ y=1", "3", "−3x = −9 → x = 3.", xv("3")),
  q("y9c-ilr-9", "For y = x/3 + 2, find y when x = 12.", "y=\\tfrac{x}{3}+2", "6", "4 + 2 = 6.", []),
  q("y9c-ilr-10", "For y = 4x − 7, find x when y = 13.", "y=4x-7,\\ y=13", "5", "4x = 20 → x = 5.", xv("5")),
  q("y9c-ilr-11", "A line through (0, 2) rises 5 for each unit of x. Find y when x = 4.", "y=5x+2", "22", "5(4) + 2 = 22.", []),
  q("y9c-ilr-12", "For y = 6 − 0.5x, find y when x = 8.", "y=6-0.5x", "2", "6 − 4 = 2.", []),
];

// graphing-lines-using-intercepts (path)
export const interceptsY9Challenge: PracticeQuestion[] = [
  q("y9c-gi-1", "Find the x-intercept of 3x − 4y = 12.", "3x-4y=12", "4", "y = 0 → 3x = 12 → x = 4.", []),
  q("y9c-gi-2", "Find the y-intercept of 3x − 4y = 12.", "3x-4y=12", "-3", "x = 0 → −4y = 12 → y = −3.", ["−3"]),
  q("y9c-gi-3", "Find the y-intercept of 2x + 5y = 20.", "2x+5y=20", "4", "x = 0 → 5y = 20 → y = 4.", []),
  q("y9c-gi-4", "Find the x-intercept of 5x − 2y = 20.", "5x-2y=20", "4", "y = 0 → 5x = 20 → x = 4.", []),
  q("y9c-gi-5", "Find the x-intercept of y = −2x + 10.", "y=-2x+10", "5", "0 = −2x + 10 → x = 5.", []),
  q("y9c-gi-6", "Find the y-intercept of 4x − 3y = 24.", "4x-3y=24", "-8", "x = 0 → −3y = 24 → y = −8.", ["−8"]),
  q("y9c-gi-7", "Find the x-intercept of x/2 + y/3 = 1.", "\\tfrac{x}{2}+\\tfrac{y}{3}=1", "2", "y = 0 → x/2 = 1 → x = 2.", []),
  q("y9c-gi-8", "Find the x-intercept of 6x + 4y = 24.", "6x+4y=24", "4", "y = 0 → 6x = 24 → x = 4.", []),
  q("y9c-gi-9", "Find the y-intercept of 6x + 4y = 24.", "6x+4y=24", "6", "x = 0 → 4y = 24 → y = 6.", []),
  q("y9c-gi-10", "Find the x-intercept of y = 3x − 12.", "y=3x-12", "4", "0 = 3x − 12 → x = 4.", []),
  q("y9c-gi-11", "Find the y-intercept of 7x + 2y = 14.", "7x+2y=14", "7", "x = 0 → 2y = 14 → y = 7.", []),
  q("y9c-gi-12", "Find the x-intercept of 2x − 3y = 18.", "2x-3y=18", "9", "y = 0 → 2x = 18 → x = 9.", []),
];

// lines-with-one-intercept (core)
export const linesOneInterceptY9Challenge: PracticeQuestion[] = [
  q("y9c-loi-1", "Write the equation of the horizontal line through (3, −2).", "(3,-2)", "y=-2", "y = −2.", ["y = −2"]),
  q("y9c-loi-2", "Write the equation of the vertical line through (5, 1).", "(5,1)", "x=5", "x = 5.", ["x = 5"]),
  q("y9c-loi-3", "Find the gradient of the line through (2, 4) and (7, 4).", "(2,4),(7,4)", "0", "Same y → gradient 0.", []),
  q("y9c-loi-4", "Write the equation of the line through (3, 1) and (3, 9).", "(3,1),(3,9)", "x=3", "Same x = 3 → vertical line x = 3.", ["x = 3"]),
  q("y9c-loi-5", "Where do x = 4 and y = −3 intersect? Give the point.", "x=4,y=-3", "(4,-3)", "(4, −3).", pt("4,-3")),
  q("y9c-loi-6", "State the gradient of the line x = 2.", "x=2", "undefined", "Vertical → undefined.", []),
  q("y9c-loi-7", "Write the equation of the y-axis.", "\\text{y-axis}", "x=0", "x = 0.", ["x = 0"]),
  q("y9c-loi-8", "Write the equation of the horizontal line through (0, −5).", "(0,-5)", "y=-5", "y = −5.", ["y = −5"]),
  q("y9c-loi-9", "Is the line through (−1, 2) and (5, 2) horizontal? (yes/no)", "(-1,2),(5,2)", "yes", "Same y → horizontal.", []),
  q("y9c-loi-10", "Write the equation of the x-axis.", "\\text{x-axis}", "y=0", "y = 0.", ["y = 0"]),
  q("y9c-loi-11", "The vertical line through (−3, 0) crosses the x-axis at x = ?", "x=-3", "-3", "x = −3.", ["−3"]),
  q("y9c-loi-12", "Where do y = 4 and x = 4 intersect? Give the point.", "y=4,x=4", "(4,4)", "(4, 4).", pt("4,4")),
];

// gradient-direct-proportion (path)
export const directPropY9Challenge: PracticeQuestion[] = [
  q("y9c-gdp-1", "y ∝ x and y = 21 when x = 7. Find y when x = 10.", "y=kx", "30", "k = 3; y = 30.", []),
  q("y9c-gdp-2", "5 pens cost $15 (cost ∝ number). Find the cost of 8 pens.", "C=kn", "24", "k = 3; 8 × 3 = $24.", ["$24"]),
  q("y9c-gdp-3", "y = kx, y = 40 when x = 8. Find x when y = 25.", "y=kx", "5", "k = 5; x = 25 ÷ 5 = 5.", []),
  q("y9c-gdp-4", "A car travels 180 km in 3 h. How far in 5 h?", "d=kt", "300", "k = 60; 5 × 60 = 300 km.", ["300 km"]),
  q("y9c-gdp-5", "y = kx through (4, 10). Find y when x = 6.", "y=kx", "15", "k = 2.5; 6 × 2.5 = 15.", []),
  q("y9c-gdp-6", "3 kg of apples cost $7.50. Find the cost of 5 kg.", "C=km", "12.50", "k = 2.5; 5 × 2.5 = $12.50.", ["$12.50", "12.5"]),
  q("y9c-gdp-7", "y = kx, y = 56 when x = 8. Find y when x = 11.", "y=kx", "77", "k = 7; 11 × 7 = 77.", []),
  q("y9c-gdp-8", "40 L of petrol cost $72. Find the cost of 25 L.", "C=kL", "45", "k = 1.8; 25 × 1.8 = $45.", ["$45"]),
  q("y9c-gdp-9", "y = kx, y = 100 when x = 25. Find k.", "y=kx", "4", "100 ÷ 25 = 4.", []),
  q("y9c-gdp-10", "A worker earns $96 for 8 hours. Find the pay for 5 hours.", "P=kh", "60", "k = 12; 5 × 12 = $60.", ["$60"]),
  q("y9c-gdp-11", "y = kx through (6, 15). Find y when x = 10.", "y=kx", "25", "k = 2.5; 10 × 2.5 = 25.", []),
  q("y9c-gdp-12", "y = kx, y = 72 when x = 9. Find x when y = 48.", "y=kx", "6", "k = 8; x = 48 ÷ 8 = 6.", []),
];

// gradient-intercept-form (core)
export const gradInterceptY9Challenge: PracticeQuestion[] = [
  q("y9c-gif-1", "Rearrange 2y = 4x + 6 and state the gradient.", "2y=4x+6", "2", "y = 2x + 3 → m = 2.", []),
  q("y9c-gif-2", "Rearrange x + y = 5 and state the gradient.", "x+y=5", "-1", "y = −x + 5 → m = −1.", ["−1"]),
  q("y9c-gif-3", "Rearrange 3x − y = 2 and state the gradient.", "3x-y=2", "3", "y = 3x − 2 → m = 3.", []),
  q("y9c-gif-4", "Rearrange 2y = 6x − 8 and state the y-intercept.", "2y=6x-8", "-4", "y = 3x − 4 → c = −4.", ["−4"]),
  q("y9c-gif-5", "Rearrange x + 2y = 6 and state the gradient.", "x+2y=6", "-0.5", "y = −0.5x + 3 → m = −0.5.", ["-1/2", "−0.5"]),
  q("y9c-gif-6", "Rearrange 4x + y = 9 and state the gradient.", "4x+y=9", "-4", "y = −4x + 9 → m = −4.", ["−4"]),
  q("y9c-gif-7", "Rearrange 6x − 2y = 10 and state the gradient.", "6x-2y=10", "3", "y = 3x − 5 → m = 3.", []),
  q("y9c-gif-8", "Rearrange 3y = 12x and state the gradient.", "3y=12x", "4", "y = 4x → m = 4.", []),
  q("y9c-gif-9", "Rearrange 2x − 2y = 8 and state the y-intercept.", "2x-2y=8", "-4", "y = x − 4 → c = −4.", ["−4"]),
  q("y9c-gif-10", "Rearrange 5x + y = 0 and state the gradient.", "5x+y=0", "-5", "y = −5x → m = −5.", ["−5"]),
  q("y9c-gif-11", "Rearrange y − 4 = 3x and state the y-intercept.", "y-4=3x", "4", "y = 3x + 4 → c = 4.", []),
  q("y9c-gif-12", "Rearrange x/2 + y = 4 and state the gradient.", "\\tfrac{x}{2}+y=4", "-0.5", "y = −0.5x + 4 → m = −0.5.", ["-1/2", "−0.5"]),
];

// finding-equation-of-a-line (core)
export const findEqnY9Challenge: PracticeQuestion[] = [
  q("y9c-fel-1", "A line through (1, 4) and (3, 10). Find c.", "(1,4),(3,10)", "1", "m = 3; 4 = 3 + c → c = 1.", []),
  q("y9c-fel-2", "A line through (2, 3) and (4, 7). Find c.", "(2,3),(4,7)", "-1", "m = 2; 3 = 4 + c → c = −1.", ["−1"]),
  q("y9c-fel-3", "A line with gradient 2 through (3, 10). Find c.", "m=2,(3,10)", "4", "10 = 6 + c → c = 4.", []),
  q("y9c-fel-4", "A line through (0, −2) and (4, 6). Find the gradient.", "(0,-2),(4,6)", "2", "m = 8/4 = 2.", []),
  q("y9c-fel-5", "A line through (1, 1) and (4, 7). Find c.", "(1,1),(4,7)", "-1", "m = 2; 1 = 2 + c → c = −1.", ["−1"]),
  q("y9c-fel-6", "A line with gradient −3 through (2, 1). Find c.", "m=-3,(2,1)", "7", "1 = −6 + c → c = 7.", []),
  q("y9c-fel-7", "A line through (−1, 2) and (1, 6). Find the gradient.", "(-1,2),(1,6)", "2", "m = 4/2 = 2.", []),
  q("y9c-fel-8", "A line through (2, 5) and (5, 14). Find c.", "(2,5),(5,14)", "-1", "m = 3; 5 = 6 + c → c = −1.", ["−1"]),
  q("y9c-fel-9", "A line with gradient 0.5 through (4, 5). Find c.", "m=0.5,(4,5)", "3", "5 = 2 + c → c = 3.", []),
  q("y9c-fel-10", "A line through (0, 3) and (2, −1). Find the gradient.", "(0,3),(2,-1)", "-2", "m = (−1 − 3)/2 = −2.", ["−2"]),
  q("y9c-fel-11", "A line through (1, 5) and (3, 11). Find the gradient.", "(1,5),(3,11)", "3", "m = 6/2 = 3.", []),
  q("y9c-fel-12", "A line with gradient 4 through (1, 1). Find c.", "m=4,(1,1)", "-3", "1 = 4 + c → c = −3.", ["−3"]),
];

// linear-modelling (core)
export const linearModelY9Challenge: PracticeQuestion[] = [
  q("y9c-lm-1", "For C = 5n + 20, find n when C = 70.", "C=5n+20,\\ C=70", "10", "5n = 50 → n = 10.", []),
  q("y9c-lm-2", "A phone plan costs $30 plus $0.10/min. Find the cost of 100 minutes.", "C=0.1m+30", "40", "30 + 10 = $40.", ["$40"]),
  q("y9c-lm-3", "A taxi charges $4 plus $2/km. Find the cost of a 12 km trip.", "C=2k+4", "28", "24 + 4 = $28.", ["$28"]),
  q("y9c-lm-4", "For C = 4n + 12, find n when C = 60.", "C=4n+12,\\ C=60", "12", "4n = 48 → n = 12.", []),
  q("y9c-lm-5", "Water: V = 200 − 5t (litres, t min). Find V at t = 10.", "V=200-5t", "150", "200 − 50 = 150 L.", ["150 L"]),
  q("y9c-lm-6", "For V = 200 − 5t, find t when V = 0.", "V=200-5t,\\ V=0", "40", "5t = 200 → t = 40 min.", ["40 min"]),
  q("y9c-lm-7", "A gym charges $50 joining plus $20/month. Find the cost after 6 months.", "C=20m+50", "170", "120 + 50 = $170.", ["$170"]),
  q("y9c-lm-8", "For C = 20m + 50, find m when C = 250.", "C=20m+50,\\ C=250", "10", "20m = 200 → m = 10 months.", ["10 months"]),
  q("y9c-lm-9", "A candle: H = 24 − 2t (cm, t hours). Find H at t = 5.", "H=24-2t", "14", "24 − 10 = 14 cm.", ["14 cm"]),
  q("y9c-lm-10", "Car rental: $40/day plus $0.20/km. Find the cost for 3 days and 100 km.", "C=40d+0.2k", "140", "120 + 20 = $140.", ["$140"]),
  q("y9c-lm-11", "For C = 8n + 5, find n when C = 61.", "C=8n+5,\\ C=61", "7", "8n = 56 → n = 7.", []),
  q("y9c-lm-12", "A taxi charges $3 plus $2.50/km. Find the cost of a 6 km trip.", "C=2.5k+3", "18", "15 + 3 = $18.", ["$18"]),
];

// midpoint-length-segment (core)
export const midpointY9Challenge: PracticeQuestion[] = [
  q("y9c-ml-1", "Find the midpoint of (−2, 3) and (4, −1). Give the point.", "(-2,3),(4,-1)", "(1,1)", "((−2+4)/2, (3−1)/2) = (1, 1).", pt("1,1")),
  q("y9c-ml-2", "Find the length from (1, 1) to (4, 5).", "(1,1)-(4,5)", "5", "√(9 + 16) = 5.", []),
  q("y9c-ml-3", "Find the length from (−1, −1) to (2, 3).", "(-1,-1)-(2,3)", "5", "√(9 + 16) = 5.", []),
  q("y9c-ml-4", "Find the midpoint of (3, 5) and (7, 11). Give the point.", "(3,5),(7,11)", "(5,8)", "(5, 8).", pt("5,8")),
  q("y9c-ml-5", "Find the length from (2, 1) to (10, 7).", "(2,1)-(10,7)", "10", "√(64 + 36) = 10.", []),
  q("y9c-ml-6", "The midpoint of A and B is (4, 5); A is (2, 3). Find B.", "M=(4,5),A=(2,3)", "(6,7)", "B = (2·4 − 2, 2·5 − 3) = (6, 7).", pt("6,7")),
  q("y9c-ml-7", "Find the length from (−3, 0) to (0, 4).", "(-3,0)-(0,4)", "5", "√(9 + 16) = 5.", []),
  q("y9c-ml-8", "Find the midpoint of (0, 0) and (−6, 8). Give the point.", "(0,0),(-6,8)", "(-3,4)", "(−3, 4).", pt("-3,4")),
  q("y9c-ml-9", "Find the length from (0, 0) to (7, 24).", "(0,0)-(7,24)", "25", "√(49 + 576) = 25.", []),
  q("y9c-ml-10", "Find the length from (1, 2) to (1, 10).", "(1,2)-(1,10)", "8", "Same x; |10 − 2| = 8.", []),
  q("y9c-ml-11", "Find the midpoint of (−4, −2) and (2, 6). Give the point.", "(-4,-2),(2,6)", "(-1,2)", "(−1, 2).", pt("-1,2")),
  q("y9c-ml-12", "Find the length from (−2, −3) to (1, 1).", "(-2,-3)-(1,1)", "5", "√(9 + 16) = 5.", []),
];

// perpendicular-parallel-lines (path)
export const perpParallelY9Challenge: PracticeQuestion[] = [
  q("y9c-pp-1", "State the gradient of a line perpendicular to y = (2/3)x.", "\\perp y=\\tfrac23x", "-3/2", "Negative reciprocal of 2/3.", ["−3/2", "-1.5"]),
  q("y9c-pp-2", "Are y = 2x + 1 and y = −0.5x + 4 perpendicular? (yes/no)", "perp?", "yes", "2 × (−0.5) = −1.", []),
  q("y9c-pp-3", "State the gradient of a line perpendicular to y = (3/4)x.", "\\perp y=\\tfrac34x", "-4/3", "Negative reciprocal of 3/4.", ["−4/3"]),
  q("y9c-pp-4", "A line is parallel to 2x + y = 5. State its gradient.", "\\parallel 2x+y=5", "-2", "y = −2x + 5 → m = −2.", ["−2"]),
  q("y9c-pp-5", "A line is perpendicular to y = −4x + 1. State its gradient.", "\\perp y=-4x+1", "1/4", "Negative reciprocal of −4.", ["0.25"]),
  q("y9c-pp-6", "Are 3x − y = 1 and x + 3y = 6 perpendicular? (yes/no)", "perp?", "yes", "Gradients 3 and −1/3; product −1.", []),
  q("y9c-pp-7", "State the gradient of a line perpendicular to y = (5/2)x.", "\\perp y=\\tfrac52x", "-2/5", "Negative reciprocal of 5/2.", ["−2/5", "-0.4"]),
  q("y9c-pp-8", "A line parallel to y = −x + 2 passes through (0, 7). State its gradient.", "\\parallel y=-x+2", "-1", "Same gradient −1.", ["−1"]),
  q("y9c-pp-9", "Are y = 3x and y = 3x + 1 the same line? (yes/no)", "same?", "no", "Parallel but different intercepts.", []),
  q("y9c-pp-10", "State the gradient of a line perpendicular to y = 6x.", "\\perp y=6x", "-1/6", "Negative reciprocal of 6.", ["−1/6"]),
  q("y9c-pp-11", "State the gradient of a line perpendicular to y = −x.", "\\perp y=-x", "1", "Negative reciprocal of −1.", []),
  q("y9c-pp-12", "A line is parallel to 4x − 2y = 6. State its gradient.", "\\parallel 4x-2y=6", "2", "y = 2x − 3 → m = 2.", []),
];

// graphical-solutions-simultaneous (path)
export const graphSimY9Challenge: PracticeQuestion[] = [
  q("y9c-gs-1", "Solve graphically: y = x + 1 and y = 2x − 1. Find x.", "y=x+1,y=2x-1", "2", "x + 1 = 2x − 1 → x = 2.", xv("2")),
  q("y9c-gs-2", "Solve: y = 2x and y = x + 3. Find x.", "y=2x,y=x+3", "3", "2x = x + 3 → x = 3.", xv("3")),
  q("y9c-gs-3", "Solve: y = 3x − 2 and y = x + 4. Find x.", "y=3x-2,y=x+4", "3", "3x − 2 = x + 4 → 2x = 6 → x = 3.", xv("3")),
  q("y9c-gs-4", "Solve: y = x + 1 and y = 2x − 1, then give y.", "\\text{give }y", "3", "x = 2 → y = 3.", []),
  q("y9c-gs-5", "Solve: y = 4x and y = 2x + 6. Find x.", "y=4x,y=2x+6", "3", "4x = 2x + 6 → 2x = 6 → x = 3.", xv("3")),
  q("y9c-gs-6", "How many solutions do y = 2x + 1 and y = 2x + 5 have?", "parallel", "0", "Parallel → no solution.", ["none"]),
  q("y9c-gs-7", "Solve: y = 5 − x and y = x + 1. Find x.", "y=5-x,y=x+1", "2", "5 − x = x + 1 → 2x = 4 → x = 2.", xv("2")),
  q("y9c-gs-8", "Solve: y = 3x and y = 12 − x. Find x.", "y=3x,y=12-x", "3", "3x = 12 − x → 4x = 12 → x = 3.", xv("3")),
  q("y9c-gs-9", "Solve: y = x and y = −x + 8. Find x.", "y=x,y=-x+8", "4", "x = −x + 8 → 2x = 8 → x = 4.", xv("4")),
  q("y9c-gs-10", "Solve: y = 2x − 3 and y = x + 2, then give y.", "\\text{give }y", "7", "x = 5; y = 7.", []),
  q("y9c-gs-11", "Solve: y = 4x − 1 and y = 2x + 5. Find x.", "y=4x-1,y=2x+5", "3", "4x − 1 = 2x + 5 → 2x = 6 → x = 3.", xv("3")),
  q("y9c-gs-12", "Solve: y = x + 4 and y = 3x. Find x.", "y=x+4,y=3x", "2", "x + 4 = 3x → 2x = 4 → x = 2.", xv("2")),
];
