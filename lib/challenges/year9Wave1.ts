import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 9 Wave 1 validation sample — D6 (Level-6) challenge pools, 12 per section. Registered by
// lesson slug in lib/challenges/index.ts; unlocked after mastery via the existing challenge flow
// (no new system). Auto-markable (single values / exact-π expressions). The seeder tags challenge
// questions as D6, so no per-item difficulty field is needed (matches the existing registry style).

const pi = (s: string, exact: string) => Array.from(new Set([exact, s, s.replace(/π/g, "pi"), s.replace(/π/g, "\\pi")]));

export const simpleInterestY9Challenge: PracticeQuestion[] = [
  { id: "chal-y9-si-1", prompt: "$5000 is invested at 4% per year simple interest. How many years to earn $1000 interest?", latex: "I=Prn", answer: "5", acceptedAnswers: ["5 years"], hint: "n = I/(Pr).", explanation: "n = 1000/(5000×0.04) = 5." },
  { id: "chal-y9-si-2", prompt: "Option A: $2000 at 5% per year simple for 3 years. Option B: a flat $250. Which earns more interest? (A or B)", latex: "I=Prn", answer: "A", acceptedAnswers: ["option a"], hint: "Compute A's interest.", explanation: "A: 2000×0.05×3 = 300 > 250, so A." },
  { id: "chal-y9-si-3", prompt: "A principal earns $360 simple interest at 6% per year over 2 years. Find the principal.", latex: "I=Prn", answer: "3000", acceptedAnswers: ["$3000"], hint: "P = I/(rn).", explanation: "P = 360/(0.06×2) = 3000." },
  { id: "chal-y9-si-4", prompt: "$1500 grows to $1860 over 4 years of simple interest. Find the annual rate (%).", latex: "A=P+I", answer: "6", acceptedAnswers: ["6%", "0.06"], hint: "Find I first.", explanation: "I = 360, r = 360/(1500×4) = 0.06 = 6%." },
  { id: "chal-y9-si-5", prompt: "Find the simple interest on $8000 at 3.5% per year for 2.5 years.", latex: "I=Prn", answer: "700", acceptedAnswers: ["$700"], hint: "Multiply straight through.", explanation: "8000×0.035×2.5 = 700." },
  { id: "chal-y9-si-6", prompt: "Find the simple interest on $1200 at 1% per month for 9 months.", latex: "I=Prn", answer: "108", acceptedAnswers: ["$108"], hint: "Rate and n are both monthly.", explanation: "1200×0.01×9 = 108." },
  { id: "chal-y9-si-7", prompt: "At 10% per year simple interest, how many years for any principal to double?", latex: "I=P", answer: "10", acceptedAnswers: ["10 years"], hint: "Doubling means I = P.", explanation: "P = P×0.10×n → n = 10." },
  { id: "chal-y9-si-8", prompt: "$4000 over 5 years earns $1000 simple interest. Find the annual rate (%).", latex: "I=Prn", answer: "5", acceptedAnswers: ["5%", "0.05"], hint: "r = I/(Pn).", explanation: "r = 1000/(4000×5) = 0.05 = 5%." },
  { id: "chal-y9-si-9", prompt: "$6000 is borrowed at 7% per year simple for 3 years. Find the total to repay.", latex: "A=P+I", answer: "7260", acceptedAnswers: ["$7260"], hint: "A = P + Prn.", explanation: "I = 1260; A = 6000 + 1260 = 7260." },
  { id: "chal-y9-si-10", prompt: "Find the greater interest: $3000 at 4% for 5 years, or $3000 at 6% for 3 years. (give the amount)", latex: "I=Prn", answer: "600", acceptedAnswers: ["$600"], hint: "Compute both.", explanation: "600 vs 540 → the larger is 600." },
  { id: "chal-y9-si-11", prompt: "Find the simple interest on $2500 at 4.8% per year for 2 years.", latex: "I=Prn", answer: "240", acceptedAnswers: ["$240"], hint: "4.8% = 0.048.", explanation: "2500×0.048×2 = 240." },
  { id: "chal-y9-si-12", prompt: "An investment earns $90 per year simple interest on $1800. Find the annual rate (%).", latex: "I=Prn", answer: "5", acceptedAnswers: ["5%", "0.05"], hint: "r = (I per year)/P.", explanation: "90/1800 = 0.05 = 5%." },
];

export const gradientY9Challenge: PracticeQuestion[] = [
  { id: "chal-y9-gr-1", prompt: "Find the gradient of the line through (2, 3) and (5, 9).", latex: "(2,3),(5,9)", answer: "2", acceptedAnswers: [], hint: "Rise over run.", explanation: "6/3 = 2." },
  { id: "chal-y9-gr-2", prompt: "Are (0, 1), (2, 5) and (4, 9) collinear? (yes/no)", latex: "\\text{collinear?}", answer: "yes", acceptedAnswers: ["y"], hint: "Compare the gradients of each pair.", explanation: "Both gradients are 2, so yes." },
  { id: "chal-y9-gr-3", prompt: "Find the gradient of 4x − 2y = 6.", latex: "4x-2y=6", answer: "2", acceptedAnswers: [], hint: "Rearrange to y = mx + c.", explanation: "y = 2x − 3, so m = 2." },
  { id: "chal-y9-gr-4", prompt: "A line of gradient 3 passes through (1, 4). Find y when x = 5.", latex: "m=3", answer: "16", acceptedAnswers: [], hint: "y = 4 + 3(x−1).", explanation: "4 + 3×4 = 16." },
  { id: "chal-y9-gr-5", prompt: "What gradient is parallel to y = −3x + 1?", latex: "\\parallel", answer: "-3", acceptedAnswers: ["−3"], hint: "Parallel lines share a gradient.", explanation: "Parallel → gradient −3." },
  { id: "chal-y9-gr-6", prompt: "Points (k, 2) and (3, 8) have gradient 2. Find k.", latex: "m=2", answer: "0", acceptedAnswers: [], hint: "8 − 2 = 2(3 − k).", explanation: "6 = 2(3 − k) → 3 − k = 3 → k = 0." },
  { id: "chal-y9-gr-7", prompt: "What gradient is perpendicular to a line of gradient 2?", latex: "\\perp", answer: "-1/2", acceptedAnswers: ["−1/2", "-0.5", "−0.5"], hint: "Perpendicular gradients multiply to −1.", explanation: "−1/2, since 2 × (−1/2) = −1." },
  { id: "chal-y9-gr-8", prompt: "Find the gradient of the vertical line x = 4.", latex: "x=4", answer: "undefined", acceptedAnswers: ["no gradient"], hint: "What is the run?", explanation: "Run is 0, so the gradient is undefined." },
  { id: "chal-y9-gr-9", prompt: "The line through (1, 1) and (3, 7) is y = mx + c. Find c.", latex: "y=mx+c", answer: "-2", acceptedAnswers: ["−2"], hint: "Find m, then substitute a point.", explanation: "m = 3; 1 = 3(1) + c → c = −2." },
  { id: "chal-y9-gr-10", prompt: "A line rises 12 units over a run of 4. Find its gradient.", latex: "\\text{rise }12,\\text{ run }4", answer: "3", acceptedAnswers: [], hint: "rise/run.", explanation: "12/4 = 3." },
  { id: "chal-y9-gr-11", prompt: "Find the gradient of the line through (−2, 5) and (2, −3).", latex: "(-2,5),(2,-3)", answer: "-2", acceptedAnswers: ["−2"], hint: "Mind the signs.", explanation: "(−3 − 5)/(2 − (−2)) = −8/4 = −2." },
  { id: "chal-y9-gr-12", prompt: "A line through the origin has gradient 1/2. Find x when y = 3.", latex: "m=1/2", answer: "6", acceptedAnswers: [], hint: "y = x/2.", explanation: "3 = x/2 → x = 6." },
];

export const circleY9Challenge: PracticeQuestion[] = [
  { id: "chal-y9-cc-1", prompt: "Find the perimeter of a semicircle of radius 7 (arc + diameter, exact).", latex: "\\text{semicircle}", answer: "7π + 14", acceptedAnswers: pi("7π+14", "7π + 14").concat(["14+7π"]), hint: "Half the circumference plus the diameter.", explanation: "arc = 7π, diameter = 14 → 7π + 14." },
  { id: "chal-y9-cc-2", prompt: "Two circles have radii 5 and 3. Find the difference in their circumferences (exact).", latex: "\\Delta C", answer: "4π", acceptedAnswers: pi("4π", "4π"), hint: "C = 2πr for each.", explanation: "10π − 6π = 4π." },
  { id: "chal-y9-cc-3", prompt: "Find the perimeter of a 90° sector of radius 10 (exact).", latex: "\\text{sector}", answer: "5π + 20", acceptedAnswers: pi("5π+20", "5π + 20").concat(["20+5π"]), hint: "Arc + two radii.", explanation: "arc = (1/4)20π = 5π; + 20 → 5π + 20." },
  { id: "chal-y9-cc-4", prompt: "A wheel of radius 0.25 m makes one full turn. How far does it travel (exact, metres)?", latex: "C=2\\pi r", answer: "π/2", acceptedAnswers: pi("π/2", "π/2").concat(["0.5π", "pi/2"]), hint: "Distance = circumference.", explanation: "2π(0.25) = 0.5π = π/2." },
  { id: "chal-y9-cc-5", prompt: "A circle has circumference 18π. Find its radius.", latex: "C=2\\pi r", answer: "9", acceptedAnswers: [], hint: "2πr = 18π.", explanation: "r = 9." },
  { id: "chal-y9-cc-6", prompt: "An arc of length 4π lies on a circle of radius 12. Find the sector angle (degrees).", latex: "\\text{arc}=\\tfrac{\\theta}{360}C", answer: "60", acceptedAnswers: ["60°"], hint: "Arc ÷ circumference = θ/360.", explanation: "C = 24π; 4π/24π = 1/6; ×360 = 60°." },
  { id: "chal-y9-cc-7", prompt: "Find the perimeter of a quarter circle of radius 6 (exact).", latex: "\\text{quarter}", answer: "3π + 12", acceptedAnswers: pi("3π+12", "3π + 12").concat(["12+3π"]), hint: "Arc + two radii.", explanation: "arc = 3π; + 12 → 3π + 12." },
  { id: "chal-y9-cc-8", prompt: "Two semicircles each of radius 4 are joined. Find the total arc length (exact).", latex: "2\\times\\text{arc}", answer: "8π", acceptedAnswers: pi("8π", "8π"), hint: "Each semicircle arc is πr... use 2πr/2.", explanation: "Each arc = 4π; total = 8π." },
  { id: "chal-y9-cc-9", prompt: "Find the circumference of a circle with diameter 16 (exact).", latex: "C=\\pi d", answer: "16π", acceptedAnswers: pi("16π", "16π"), hint: "C = πd.", explanation: "π(16) = 16π." },
  { id: "chal-y9-cc-10", prompt: "Find the arc length of a 120° sector of radius 9 (exact).", latex: "\\text{arc}", answer: "6π", acceptedAnswers: pi("6π", "6π"), hint: "(120/360) of 2πr.", explanation: "(1/3)18π = 6π." },
  { id: "chal-y9-cc-11", prompt: "An athletics track has two 100 m straights and two semicircular ends of radius 30 m. Find the total perimeter (exact, metres).", latex: "\\text{track}", answer: "200 + 60π", acceptedAnswers: pi("200+60π", "200 + 60π").concat(["60π+200"]), hint: "Two straights + two semicircles (= one full circle).", explanation: "200 + 2π(30) = 200 + 60π." },
  { id: "chal-y9-cc-12", prompt: "A wheel of radius 0.5 m makes 10 full turns. How far does it travel (exact, metres)?", latex: "10C", answer: "10π", acceptedAnswers: pi("10π", "10π"), hint: "One turn = circumference.", explanation: "Per turn 2π(0.5) = π; ×10 = 10π." },
];
