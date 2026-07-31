import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import {
  formatChoiceText,
  practicalChoice,
  formulaAnswer as baseFormulaAnswer,
} from "../questionHelpers";

type QualityTaskType =
  | "procedural"
  | "problem-solving"
  | "analytical"
  | "investigative"
  | "synthesis";

type QualityPracticeQuestion = PracticeQuestion & {
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions?: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
};

function qualityAnswer({
  id,
  prompt,
  latex,
  answer,
  acceptedAnswers,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
  sectorDiagram,
  triangleDiagram,
  trianglePairDiagram,
  unitCircleDiagram,
  trigGraphDiagram,
  cartesianGraph,
  bearingsDiagram,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: string;
  acceptedAnswers: string[];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
  sectorDiagram?: PracticeQuestion["sectorDiagram"];
  triangleDiagram?: PracticeQuestion["triangleDiagram"];
  trianglePairDiagram?: PracticeQuestion["trianglePairDiagram"];
  unitCircleDiagram?: PracticeQuestion["unitCircleDiagram"];
  trigGraphDiagram?: PracticeQuestion["trigGraphDiagram"];
  cartesianGraph?: PracticeQuestion["cartesianGraph"];
  bearingsDiagram?: PracticeQuestion["bearingsDiagram"];
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
    sectorDiagram,
    triangleDiagram,
    trianglePairDiagram,
    unitCircleDiagram,
    trigGraphDiagram,
    cartesianGraph,
    bearingsDiagram,
  };
}

function qualityChoice({
  id,
  prompt,
  latex,
  answer,
  choices,
  hint,
  explanation,
  difficulty,
  diagnosticIntent,
  taskType,
  distractorMisconceptions,
  sectorDiagram,
  triangleDiagram,
  trianglePairDiagram,
  unitCircleDiagram,
  trigGraphDiagram,
  cartesianGraph,
  bearingsDiagram,
}: {
  id: string;
  prompt: string;
  latex: string;
  answer: "A" | "B" | "C" | "D";
  choices: [string, string, string, string];
  hint: string;
  explanation: string;
  difficulty: 3 | 4 | 5;
  diagnosticIntent: string;
  taskType: QualityTaskType;
  distractorMisconceptions: Partial<
    Record<"A" | "B" | "C" | "D", string>
  >;
  sectorDiagram?: PracticeQuestion["sectorDiagram"];
  triangleDiagram?: PracticeQuestion["triangleDiagram"];
  trianglePairDiagram?: PracticeQuestion["trianglePairDiagram"];
  unitCircleDiagram?: PracticeQuestion["unitCircleDiagram"];
  trigGraphDiagram?: PracticeQuestion["trigGraphDiagram"];
  cartesianGraph?: PracticeQuestion["cartesianGraph"];
  bearingsDiagram?: PracticeQuestion["bearingsDiagram"];
}): QualityPracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    choices: (["A", "B", "C", "D"] as const).map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    hint,
    explanation,
    difficulty,
    diagnosticIntent,
    taskType,
    distractorMisconceptions,
    sectorDiagram,
    triangleDiagram,
    trianglePairDiagram,
    unitCircleDiagram,
    trigGraphDiagram,
    cartesianGraph,
    bearingsDiagram,
  };
}

function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^-?\d+$/.test(t)) return [`${t}.0`];
  if (/^-?\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

const TRIG_MEASURE_EXPLANATIONS: Record<string, string> = {
  // ── Radians and exact values ───────────────────────────────────────────────
  "y11adv-trig-rad-g1":
    "Multiply by π/180 and simplify: 60 × π/180 = π/3. The factor π/180 converts any degree measure to radians.",
  "y11adv-trig-rad-g2":
    "Multiply by 180/π and cancel: (3π/2) × (180/π) = 3 × 90 = 270°. The π factors cancel, leaving a pure degree value.",
  "y11adv-trig-rad-g3":
    "The arc length formula s = rθ requires θ in radians. Substituting: s = 6 × (π/3) = 2π. Keep the answer as an exact pi expression.",
  "y11adv-trig-rad-i1":
    "Multiply by π/180: 135 × π/180 = 3π/4. The common factor of 135 and 180 is 45, so both divide to give 3 and 4.",
  "y11adv-trig-rad-i2":
    "Multiply by 180/π: (5π/6) × (180/π) = 5 × 30 = 150°. The π cancels and 180 ÷ 6 = 30.",
  "y11adv-trig-rad-i3":
    "The sector area formula is A = ½r²θ with θ in radians. Substituting: A = ½ × 16 × (π/3) = 8π/3.",
  "y11adv-trig-rad-m1":
    "A right angle is exactly one quarter of a full turn. Since a full turn is 2π, a quarter turn is 2π/4 = π/2.",
  "y11adv-trig-rad-m2":
    "Multiply by 180/π and cancel: (π/6) × (180/π) = 180/6 = 30°. The π cancels cleanly.",
  "y11adv-trig-rad-m4":
    "Apply s = rθ with θ already in radians: s = 8 × (π/4) = 2π. The 4 in the denominator divides into 8.",
  "y11adv-trig-rad-m5":
    "Apply A = ½r²θ: A = ½ × 36 × (2π/3) = 18 × (2π/3) = 12π. Multiply before simplifying to avoid fraction errors.",
  "y11adv-trig-rad-m9":
    "Apply A = ½r²θ: A = ½ × 4 × (2π/3) = 2 × (2π/3) = 4π/3. Both the ½ and the r² = 4 combine to give the factor 2.",
  "y11adv-trig-rad-m10":
    "Multiply by π/180: 300 × π/180 = 5π/3. The common factor of 300 and 180 is 60, leaving 5 and 3.",

  // ── Unit circle and graphs ─────────────────────────────────────────────────
  "y11adv-trig-circle-g4":
    "The cosine graph traces the x-coordinate of a point moving around the unit circle. One full orbit is 2π radians, so the graph repeats — and the period is 2π.",
  "y11adv-trig-circle-i3":
    "On the unit circle the starting point at angle 0 is (1, 0). Since sine equals the y-coordinate and the y-coordinate is 0 there, sin(0) = 0.",
  "y11adv-trig-circle-i5":
    "Tangent is sine divided by cosine. Both sine and cosine reverse sign together after π radians, returning the ratio to its original value. The period of tangent is therefore π, half that of sine or cosine.",
  "y11adv-trig-circle-m3":
    "The sine graph traces the y-coordinate of a point travelling around the unit circle. One full orbit takes 2π radians, so the pattern repeats every 2π.",
  "y11adv-trig-circle-m9":
    "Tangent is undefined wherever cosine equals zero. The smallest positive angle where cosine is zero is π/2 — the point on the unit circle reaches the top of the circle, giving x-coordinate 0.",

  // ── Exact trig values — special triangles ─────────────────────────────────
  "y11adv-ev-g1":
    "From the 30-60-90 triangle: opposite to 30° is 1, hypotenuse is 2. sin(π/6) = opp/hyp = 1/2.",
  "y11adv-ev-g2":
    "From the 30-60-90 triangle: adjacent to 60° is 1, hypotenuse is 2. cos(π/3) = adj/hyp = 1/2.",
  "y11adv-ev-g3":
    "From the 45-45-90 triangle: opposite = adjacent = 1. tan(π/4) = opp/adj = 1/1 = 1.",
  "y11adv-ev-i1":
    "From the 30-60-90 triangle: opposite to 60° is √3, hypotenuse is 2. sin(π/3) = √3/2.",
  "y11adv-ev-i2":
    "From the 30-60-90 triangle: adjacent to 30° is √3, hypotenuse is 2. cos(π/6) = √3/2.",
  "y11adv-ev-i3":
    "tan(π/6) = sin(π/6)/cos(π/6) = (1/2)/(√3/2) = 1/√3. Rationalise: 1/√3 × √3/√3 = √3/3.",
  "y11adv-ev-i4":
    "From the 45-45-90 triangle: adjacent = 1, hypotenuse = √2. cos(π/4) = 1/√2 = √2/2.",
  "y11adv-ev-i5":
    "sin²(π/3) + cos²(π/3) = (√3/2)² + (1/2)² = 3/4 + 1/4 = 1. This is the Pythagorean identity.",
  "y11adv-ev-m1":
    "sin(π/6) = sin(30°) = 1/2. In the 30-60-90 triangle the side opposite 30° is 1 and the hypotenuse is 2.",
  "y11adv-ev-m2":
    "cos(π/3) = cos(60°) = 1/2. Adjacent to 60° is 1 and the hypotenuse is 2 in the 30-60-90 triangle.",
  "y11adv-ev-m3":
    "sin(π/3) = sin(60°) = √3/2. The side opposite 60° is √3 and the hypotenuse is 2.",
  "y11adv-ev-m4":
    "cos(π/6) = cos(30°) = √3/2. The side adjacent to 30° is √3 and the hypotenuse is 2.",
  "y11adv-ev-m5":
    "tan(π/3) = tan(60°) = opp/adj = √3/1 = √3. From the 30-60-90 triangle with opposite √3 and adjacent 1.",
  "y11adv-ev-m6":
    "sin(π/4) = sin(45°) = 1/√2 = √2/2. In the 45-45-90 triangle: opposite = 1, hypotenuse = √2.",
  "y11adv-ev-m8":
    "2sin(π/6) + cos(π/3) = 2(1/2) + (1/2) = 1 + 1/2 = 3/2.",
  "y11adv-ev-m9":
    "tan(π/3) × cos(π/3) = √3 × 1/2 = √3/2.",

  // ── Graphing sin, cos, tan ─────────────────────────────────────────────────
  "y11adv-graph-g1":
    "y = sin x has period 2π because one full wave completes from x = 0 to x = 2π — one full revolution of the unit circle.",
  "y11adv-graph-g3":
    "The cosine graph starts at y = 1 when x = 0 because cos(0) = 1. This is the y-intercept of y = cos x.",
  "y11adv-graph-g4":
    "y = tan x has period π because after half a revolution, sin and cos both change sign, so their ratio returns to its original value.",
  "y11adv-graph-i1":
    "y = cos x has the same period as y = sin x. Both repeat every 2π radians — one full revolution.",
  "y11adv-graph-i5":
    "After passing through (0, 0), the sine curve reaches zero again at x = π. The first positive x-intercept of y = sin x is π.",
  "y11adv-graph-m1":
    "Period = 2π/b. For y = sin(4x), b = 4, so the period is 2π/4 = π/2 — divide by b, never multiply.",
  "y11adv-graph-m2":
    "The tangent period is π/b, not 2π/b. For y = tan(2x), b = 2, so the period is π/2.",
  "y11adv-graph-m4":
    "For an unshifted graph the maximum equals the amplitude. y = 4sin(x) has amplitude 4, so the maximum is 4 — not 1.",
  "y11adv-graph-m5":
    "cos(π) = −1. At x = π the cosine curve is at its minimum, corresponding to the leftmost point (−1, 0) of the unit circle.",
  "y11adv-graph-m6":
    "sin(3π/2) = −1. At x = 3π/2 the sine curve is at its minimum, corresponding to the bottom of the unit circle.",
  "y11adv-graph-m9":
    "tan x is undefined where cos x = 0. The first positive value where cos x = 0 is x = π/2, so the first positive asymptote is x = π/2.",

  // ── Degrees and radians concept ───────────────────────────────────────────
  "y11adv-rcon-g2":
    "π/6 is the radian equivalent of 30°. Multiply 30 by π/180 to verify: 30π/180 = π/6. Memorise the benchmark table.",
  "y11adv-rcon-g4":
    "3π/2 = 3 × (π/2) = 3 × 90° = 270°. The factor π/2 = 90° is the key benchmark.",
  "y11adv-rcon-i1":
    "π/4 = 45°. Multiply 45 by π/180 to verify: 45π/180 = π/4. This is the 45-45-90 benchmark.",
  "y11adv-rcon-i3":
    "2π is one full turn. One full turn = 360°. So 2π = 360°.",
  "y11adv-rcon-m1":
    "One full turn is 360° = 2π radians. Memorise 2π as the benchmark for a complete revolution.",
  "y11adv-rcon-m2":
    "A right angle is 90° = π/2. It is one quarter of a full turn: 2π ÷ 4 = π/2.",
  "y11adv-rcon-m3":
    "A half turn is 180° = π. It is one half of a full turn: 2π ÷ 2 = π.",
  "y11adv-rcon-m4":
    "Three quarter turns: 270° = 3π/2. Three quarters of 2π: (3/4) × 2π = 3π/2.",

  // ── Converting degrees to radians ─────────────────────────────────────────
  "y11adv-d2r-g1":
    "Multiply 45 by π/180: 45π/180. Cancel the common factor 45: 1π/4 = π/4.",
  "y11adv-d2r-g2":
    "Multiply 90 by π/180: 90π/180. Cancel the common factor 90: 1π/2 = π/2.",
  "y11adv-d2r-g3":
    "Multiply 60 by π/180: 60π/180. Cancel the common factor 60: 1π/3 = π/3.",
  "y11adv-d2r-g4":
    "Multiply 180 by π/180: 180π/180 = π. The two 180s cancel completely.",
  "y11adv-d2r-i1":
    "Multiply 150 by π/180: 150π/180. The common factor of 150 and 180 is 30: 5π/6.",
  "y11adv-d2r-i2":
    "Multiply 240 by π/180: 240π/180. The common factor of 240 and 180 is 60: 4π/3.",
  "y11adv-d2r-i3":
    "Multiply 315 by π/180: 315π/180. The common factor of 315 and 180 is 45: 7π/4.",
  "y11adv-d2r-i4":
    "Multiply 270 by π/180: 270π/180. The common factor of 270 and 180 is 90: 3π/2.",
  "y11adv-d2r-i5":
    "Multiply 330 by π/180: 330π/180. The common factor of 330 and 180 is 30: 11π/6.",
  "y11adv-d2r-m1":
    "Multiply 30 by π/180: 30π/180. The common factor is 30: π/6.",
  "y11adv-d2r-m2":
    "Multiply 135 by π/180: 135π/180. The common factor is 45: 3π/4.",
  "y11adv-d2r-m3":
    "Multiply 300 by π/180: 300π/180. The common factor is 60: 5π/3.",
  "y11adv-d2r-m4":
    "Multiply 210 by π/180: 210π/180. The common factor is 30: 7π/6.",
  "y11adv-d2r-m5":
    "Multiply 360 by π/180: 360π/180. Cancel 180: 2π. A full turn is 2π.",
  "y11adv-d2r-m7":
    "Multiply 225 by π/180: 225π/180. The common factor is 45: 5π/4.",
  "y11adv-d2r-m8":
    "Multiply 120 by π/180: 120π/180. The common factor is 60: 2π/3.",
  "y11adv-d2r-m9":
    "Multiply 75 by π/180: 75π/180. The common factor is 15: 5π/12.",

  // ── Converting radians to degrees ─────────────────────────────────────────
  "y11adv-r2d-g1":
    "Multiply (π/4) by 180/π: the π factors cancel, giving 180/4 = 45°.",
  "y11adv-r2d-g2":
    "Multiply (π/2) by 180/π: the π factors cancel, giving 180/2 = 90°.",
  "y11adv-r2d-g3":
    "Multiply (5π/6) by 180/π: the π factors cancel, giving 5 × 30 = 150°.",
  "y11adv-r2d-g4":
    "Multiply 2π by 180/π: the π factors cancel, giving 2 × 180 = 360°.",
  "y11adv-r2d-i1":
    "Multiply (π/3) by 180/π: the π factors cancel, giving 180/3 = 60°.",
  "y11adv-r2d-i2":
    "Multiply (3π/4) by 180/π: the π factors cancel, giving 3 × 45 = 135°.",
  "y11adv-r2d-i3":
    "Multiply (4π/3) by 180/π: the π factors cancel, giving 4 × 60 = 240°.",
  "y11adv-r2d-i4":
    "Multiply (7π/4) by 180/π: the π factors cancel, giving 7 × 45 = 315°.",
  "y11adv-r2d-i5":
    "Multiply (5π/3) by 180/π: the π factors cancel, giving 5 × 60 = 300°.",
  "y11adv-r2d-m1":
    "Multiply (π/6) by 180/π: the π factors cancel, giving 180/6 = 30°.",
  "y11adv-r2d-m2":
    "Multiply (2π/3) by 180/π: the π factors cancel, giving 2 × 60 = 120°.",
  "y11adv-r2d-m3":
    "Multiply (5π/4) by 180/π: the π factors cancel, giving 5 × 45 = 225°.",
  "y11adv-r2d-m4":
    "Multiply (11π/6) by 180/π: the π factors cancel, giving 11 × 30 = 330°.",
  "y11adv-r2d-m5":
    "Multiply (3π/2) by 180/π: the π factors cancel, giving 3 × 90 = 270°.",
  "y11adv-r2d-m7":
    "Multiply π by 180/π: the π factors cancel completely, giving 180°.",
  "y11adv-r2d-m8":
    "Multiply (7π/6) by 180/π: the π factors cancel, giving 7 × 30 = 210°.",
  "y11adv-r2d-m9":
    "Multiply (5π/2) by 180/π: the π factors cancel, giving 5 × 90 = 450°. This is more than one full turn.",

  // ── Arc length ─────────────────────────────────────────────────────────────
  "y11adv-arc-g1":
    "Apply s = rθ: s = 3 × (π/3) = π. The 3 in the radius cancels the 3 in the denominator.",
  "y11adv-arc-g2":
    "Apply s = rθ: s = 8 × (π/2) = 4π. The 2 in the denominator divides into 8.",
  "y11adv-arc-g3":
    "Rearrange s = rθ to find θ: θ = s/r = 6π/9 = 2π/3. Simplify by cancelling the factor 3.",
  "y11adv-arc-g4":
    "Convert 60° to radians first: 60 × π/180 = π/3. Then s = rθ = 5 × (π/3) = 5π/3.",
  "y11adv-arc-i1":
    "Apply s = rθ: s = 4 × (3π/4) = 3π. The 4 in the radius cancels the 4 in the denominator.",
  "y11adv-arc-i2":
    "Apply s = rθ: s = 12 × (π/6) = 2π. The 6 in the denominator divides into 12.",
  "y11adv-arc-i3":
    "Rearrange s = rθ to find r: r = s/θ = 10π ÷ (5π/3) = 10π × 3/(5π) = 6.",
  "y11adv-arc-i4":
    "Convert 120° to radians: 120 × π/180 = 2π/3. Then s = 9 × (2π/3) = 6π.",
  "y11adv-arc-i5":
    "Rearrange s = rθ to find θ: θ = s/r = 3π/6 = π/2.",
  "y11adv-arc-m1":
    "Apply s = rθ: s = 5 × (π/5) = π. The 5 in the radius cancels the 5 in the denominator.",
  "y11adv-arc-m2":
    "Apply s = rθ: s = 7 × (2π/7) = 2π. The 7 in the radius cancels the 7 in the denominator.",
  "y11adv-arc-m3":
    "Rearrange s = rθ to find θ: θ = s/r = 4π/8 = π/2.",
  "y11adv-arc-m4":
    "Rearrange s = rθ to find θ: θ = s/r = 3π/9 = π/3.",
  "y11adv-arc-m5":
    "Convert 90° to radians: π/2. Then s = 6 × (π/2) = 3π.",
  "y11adv-arc-m7":
    "Apply s = rθ: s = 10 × (2π/5) = 4π. The 5 in the denominator divides into 10.",
  "y11adv-arc-m8":
    "Rearrange s = rθ to find θ: θ = s/r = π/3.",
  "y11adv-arc-m9":
    "Apply s = rθ: s = 15 × (π/5) = 3π. The 5 in the denominator divides into 15.",
  "y11adv-arc-m10":
    "Rearrange s = rθ to find θ: θ = s/r = 5π/10 = π/2.",

  // ── Sector area ────────────────────────────────────────────────────────────
  "y11adv-sector-g1":
    "Apply A = ½r²θ: A = ½ × 16 × (π/4) = 2π. The ½ and the 4 in the denominator combine: 16/(2×4) = 2.",
  "y11adv-sector-g2":
    "Apply A = ½r²θ: A = ½ × 36 × (π/3) = 6π. Compute ½ × 36 = 18, then 18 × (π/3) = 6π.",
  "y11adv-sector-g3":
    "Rearrange A = ½r²θ to find r: r² = 2A/θ = 2(9π)/(π/2) = 18π × (2/π) = 36. So r = 6.",
  "y11adv-sector-g4":
    "Arc length: s = rθ = 3 × (2π/3) = 2π. Perimeter = 2r + s = 6 + 2π.",
  "y11adv-sector-i1":
    "Apply A = ½r²θ: A = ½ × 25 × (2π/5) = 5π. Compute: ½ × 25 = 12.5, then 12.5 × (2π/5) = 5π.",
  "y11adv-sector-i2":
    "Apply A = ½r²θ: A = ½ × 16 × (π/2) = 4π. Compute: ½ × 16 = 8, then 8 × (π/2) = 4π.",
  "y11adv-sector-i3":
    "Rearrange A = ½r²θ: r² = 2A/θ = 2(12π)/(2π/3) = 24π × 3/(2π) = 36. So r = 6.",
  "y11adv-sector-i4":
    "Convert 60° to radians: π/3. Then A = ½ × 36 × (π/3) = 6π.",
  "y11adv-sector-i5":
    "Arc length: s = rθ = 6 × (π/3) = 2π. Perimeter = 2r + s = 12 + 2π.",
  "y11adv-sector-m1":
    "Apply A = ½r²θ: A = ½ × 9 × (2π/3) = 3π. Compute: ½ × 9 = 4.5, then 4.5 × (2π/3) = 3π.",
  "y11adv-sector-m2":
    "Apply A = ½r²θ: A = ½ × 64 × (π/4) = 8π. Compute: ½ × 64 = 32, then 32 × (π/4) = 8π.",
  "y11adv-sector-m3":
    "Rearrange A = ½r²θ: r² = 2A/θ = 2(9π)/(π/2) = 18π × (2/π) = 36. So r = 6.",
  "y11adv-sector-m4":
    "Rearrange A = ½r²θ: r² = 2A/θ = 2(3π)/(2π/3) = 6π × (3/(2π)) = 9. So r = 3.",
  "y11adv-sector-m5":
    "Apply A = ½r²θ: A = ½ × 25 × (2π/5) = 5π.",
  "y11adv-sector-m6":
    "Convert 90° to radians: π/2. Then A = ½ × 36 × (π/2) = 9π.",
  "y11adv-sector-m8":
    "Apply A = ½r²θ: A = ½ × 16 × (π/3) = 8π/3.",
  "y11adv-sector-m9":
    "Arc length: s = 6 × (π/3) = 2π. Perimeter = 2r + s = 2(6) + 2π = 12 + 2π.",
  "y11adv-sector-m10":
    "Rearrange A = ½r²θ: θ = 2A/r² = 2(6π)/36 = 12π/36 = π/3.",

  // ── Exam practice ─────────────────────────────────────────────────────────
  "y11adv-trig-exam-g1":
    "Multiply by π/180: 30 × π/180 = π/6. This is the smallest of the common exact radian angles.",
  "y11adv-trig-exam-g2":
    "Apply s = rθ: s = 3 × 2π = 6π. An angle of 2π is a full turn, so the arc is the full circumference: 2π × r.",
  "y11adv-trig-exam-i1":
    "Multiply by 180/π and cancel: (3π/4) × (180/π) = 3 × 45 = 135°. The π cancels and 180 ÷ 4 = 45.",
  "y11adv-trig-exam-i2":
    "Apply A = ½r²θ: A = ½ × 9 × (2π/3) = (9/2) × (2π/3) = 3π. Multiply the fractions carefully before simplifying.",
  "y11adv-trig-exam-i5":
    "Tangent is undefined where cosine is zero. The first positive angle where cosine is zero is π/2, so the first vertical asymptote is at x = π/2.",
  "y11adv-trig-exam-m1":
    "A half turn is the benchmark conversion: 180° = π radians. Multiply by π/180 and cancel to confirm: 180 × π/180 = π.",
  "y11adv-trig-exam-m2":
    "Multiply by 180/π: (π/4) × (180/π) = 180/4 = 45°. This is the angle in the 45-45-90 triangle.",
  "y11adv-trig-exam-m4":
    "Apply s = rθ: s = 5 × (2π/5) = 2π. The 5 in the radius cancels the 5 in the denominator of the angle.",
  "y11adv-trig-exam-m5":
    "Apply A = ½r²θ: A = ½ × 36 × (π/3) = 18 × (π/3) = 6π. The 18 divided by 3 gives 6.",
  "y11adv-trig-exam-m10":
    "Tangent repeats every π radians because after half a turn the sine and cosine values both reverse sign, restoring the ratio to its original value. Its period is half that of sine and cosine.",
  "y11adv-trig-exam-n1":
    "Amplitude = |a|. In y = 3cos(2x) − 1, a = 3, so amplitude = |3| = 3. The vertical shift d = −1 raises or lowers the midline but does not change amplitude.",
  "y11adv-trig-exam-n2":
    "Period = 2π/b. In y = sin(2x) + 4, b = 2, so period = 2π/2 = π. The vertical shift d = 4 does not affect the period.",
  "y11adv-trig-exam-p1":
    "Amplitude = |a|. In y = 5sin(2x) + 3, a = 5, so amplitude = |5| = 5. The vertical shift d = 3 does not affect amplitude.",
  "y11adv-trig-exam-p2":
    "Period = 2π/b. In y = cos(3x) − 2, b = 3, so period = 2π/3. The vertical shift d = −2 does not affect the period.",
  "y11adv-trig-exam-p3":
    "Maximum = d + |a| = −1 + 4 = 3. The amplitude |a| = 4 and midline d = −1, so the wave crests 4 units above −1.",
  "y11adv-trig-exam-p4":
    "Phase shift = −c/b. Rewrite 2x − π/2 = 2(x − π/4), so the graph shifts π/4 to the right. The size of the phase shift is π/4.",

  // ── Unit circle — exact values (Q1 and axes) ──────────────────────────────
  "y11adv-ucv-g1":
    "On the unit circle the point at angle θ is (cos θ, sin θ). At θ = π/6 the x-coordinate is cos(π/6) = √3/2.",
  "y11adv-ucv-g2":
    "The y-coordinate at θ = π/3 is sin(π/3). From the 30-60-90 triangle, sin(π/3) = √3/2.",
  "y11adv-ucv-g3":
    "At θ = π/4, cos(π/4) = sin(π/4) = √2/2. The unit-circle point is (√2/2, √2/2) — both coordinates are equal.",
  "y11adv-ucv-i1":
    "The unit-circle point at π/6 is (cos(π/6), sin(π/6)) = (√3/2, 1/2). The y-coordinate (sine) is 1/2.",
  "y11adv-ucv-i2":
    "At θ = π/2 the terminal point reaches the top of the circle: (0, 1). The y-coordinate gives sin(π/2) = 1.",
  "y11adv-ucv-i3":
    "At θ = π the terminal point is the leftmost point: (−1, 0). The x-coordinate gives cos(π) = −1.",
  "y11adv-ucv-i4":
    "At θ = 3π/2 the terminal point is at the bottom: (0, −1). sin(3π/2) = −1 (y-coordinate).",
  "y11adv-ucv-m1":
    "cos(π/6) is the x-coordinate at θ = π/6. From the 30-60-90 triangle, the adjacent side over hypotenuse is √3/2.",
  "y11adv-ucv-m2":
    "sin(π/3) is the y-coordinate at θ = π/3. From the 30-60-90 triangle, the opposite over hypotenuse is √3/2.",
  "y11adv-ucv-m3":
    "At θ = π the terminal point is (−1, 0). cos(π) = −1 (x-coordinate) and sin(π) = 0 (y-coordinate).",
  "y11adv-ucv-m4":
    "tan(π/4) = sin(π/4)/cos(π/4) = (√2/2)/(√2/2) = 1. On the unit circle, tangent = y/x.",
  "y11adv-ucv-m5":
    "At θ = π/2 the terminal point is (0, 1). cos(π/2) = 0 (x-coordinate). sin(π/2) = 1 (y-coordinate).",
  "y11adv-ucv-m7":
    "cos(0) is the x-coordinate at the starting point (1, 0) on the unit circle. cos(0) = 1.",
  "y11adv-ucv-m8":
    "sin(0) is the y-coordinate at the starting point (1, 0) on the unit circle. sin(0) = 0.",
  "y11adv-ucv-m10":
    "2 sin(π/6) cos(π/6) = 2 × (1/2) × (√3/2) = √3/2. Substitute the exact values and multiply step by step.",

  // ── Amplitude and period ─────────────────────────────────────────────────────
  "y11adv-amp-g1":
    "Amplitude is |a| in y = a cos(x). Here a = 4, so amplitude = |4| = 4.",
  "y11adv-amp-g2":
    "Period = 2π/b = 2π/3. For y = sin(bx), a larger b compresses the wave horizontally, giving a shorter period.",
  "y11adv-amp-g3":
    "Amplitude is |a|, always non-negative. y = −3 sin(x) has a = −3, so amplitude = |−3| = 3. The negative sign reflects the graph but does not reduce the amplitude.",
  "y11adv-amp-i1":
    "Period = 2π/b = 2π/2 = π. Doubling b halves the period.",
  "y11adv-amp-i2":
    "Amplitude = |a| = |−5| = 5. The negative reflects the wave; amplitude is always the absolute value.",
  "y11adv-amp-i3":
    "The graph shows y = 3 cos(2x). Read the amplitude: the wave oscillates between −3 and 3, so amplitude = 3. Verify: |a| = |3| = 3.",
  "y11adv-amp-i4":
    "Maximum value of y = a sin(x) (with d = 0) equals |a| = 4.",
  "y11adv-amp-m1":
    "Period = 2π/b = 2π/2 = π.",
  "y11adv-amp-m2":
    "Amplitude = |a|, which is never negative. For y = −6cos(3x), a = −6, so the amplitude is |−6| = 6.",
  "y11adv-amp-m3":
    "Period = 2π/b = 2π/3.",
  "y11adv-amp-m4":
    "For y = 2 sin(πx), b = π. Period = 2π/π = 2.",
  "y11adv-amp-m5":
    "Maximum = |a| for an unshifted graph. y = −5sin(x) is reflected, but its maximum is still |−5| = 5 — the reflection moves where the peak occurs, not its height.",
  "y11adv-amp-m6":
    "Minimum value = d − |a| = 0 − 3 = −3.",
  "y11adv-amp-m9":
    "Amplitude = |a| = 2 and period = π. Period = 2π/b, so b = 2π/π = 2.",
  "y11adv-amp-m10":
    "For y = 3 sin(πx/2), b = π/2. Period = 2π/(π/2) = 2π × 2/π = 4.",

  // ── Trig graph transformations ─────────────────────────────────────────────
  "y11adv-shift-g1":
    "Vertical shift is d in y = sin(x) + d. Here d = 3.",
  "y11adv-shift-g2":
    "y = cos(x − π/4) is cos(x + (−π/4)), so c = −π/4, b = 1. Phase shift = −c/b = −(−π/4)/1 = π/4 right.",
  "y11adv-shift-g3":
    "The midline is y = 1 and the amplitude is 2, so the crest lies 2 units above the midline. Maximum value = d + |a| = 1 + 2 = 3.",
  "y11adv-shift-i1":
    "The vertical shift is d = −4 in y = 3 cos(2x) − 4.",
  "y11adv-shift-i2":
    "y = sin(x) + 2 has d = 2 and |a| = 1. Maximum = d + |a| = 2 + 1 = 3.",
  "y11adv-shift-i3":
    "Amplitude = |a| = 4 in y = 4 sin(x − π/3) + 1.",
  "y11adv-shift-i4":
    "The midline is y = −3 and the amplitude is 2, so the trough lies 2 units below the midline. Minimum = d − |a| = −3 − 2 = −5.",
  "y11adv-shift-m1":
    "Amplitude = |a| = |−3| = 3.",
  "y11adv-shift-m2":
    "Period = 2π/b = 2π/3.",
  "y11adv-shift-m3":
    "Vertical shift d = −2.",
  "y11adv-shift-m4":
    "Minimum = d − |a| = 3 − 2 = 1.",
  "y11adv-shift-m5":
    "Phase shift = −c/b = −(π/2)/2 = −π/4. The magnitude is π/4.",
  "y11adv-shift-m6":
    "Maximum = d + |a| = 2 + 3 = 5.",
  "y11adv-shift-m7":
    "Minimum = d − |a| = −1 − 2 = −3.",
  "y11adv-shift-m9":
    "Period = 2π/π = 2.",
  "y11adv-shift-m10":
    "Maximum = d + |a| = 1 + 2 = 3.",

  // ── Unit circle — all quadrants ────────────────────────────────────────────
  "y11adv-ucq-g1":
    "π/2 < 5π/6 < π, so 5π/6 is in Q2. The reference angle is π − 5π/6 = π/6.",
  "y11adv-ucq-g2":
    "π < 7π/6 < 3π/2 (Q3). The reference angle is the acute angle measured back to the x-axis: 7π/6 − π = π/6.",
  "y11adv-ucq-g4":
    "3π/2 < 7π/4 < 2π (Q4). The reference angle is 2π − 7π/4 = π/4.",
  "y11adv-ucq-i1":
    "Reference angle for 5π/6: π − 5π/6 = π/6. In Q2 sine is positive. |sin(π/6)| = 1/2, so sin(5π/6) = 1/2.",
  "y11adv-ucq-i2":
    "Reference angle for 4π/3: 4π/3 − π = π/3. In Q3 cosine is negative. |cos(π/3)| = 1/2, so cos(4π/3) = −1/2.",
  "y11adv-ucq-i3":
    "Reference angle for 7π/6: π/6. In Q3 tangent is positive (sin and cos both negative, ratio positive). |tan(π/6)| = √3/3, so tan(7π/6) = √3/3.",
  "y11adv-ucq-i4":
    "Reference angle for 7π/4: 2π − 7π/4 = π/4. In Q4 cosine is positive. |cos(π/4)| = √2/2, so cos(7π/4) = √2/2.",
  "y11adv-ucq-m1":
    "Reference angle for 2π/3: π − 2π/3 = π/3. In Q2 sine is positive. |sin(π/3)| = √3/2, so sin(2π/3) = √3/2.",
  "y11adv-ucq-m2":
    "Reference angle for 5π/6: π/6. In Q2 cosine is negative. |cos(π/6)| = √3/2, so cos(5π/6) = −√3/2.",
  "y11adv-ucq-m3":
    "π < 5π/4 < 3π/2 (Q3). The reference angle is 5π/4 − π = π/4.",
  "y11adv-ucq-m4":
    "Reference angle for 5π/4: π/4. In Q3 tangent is positive. |tan(π/4)| = 1, so tan(5π/4) = 1.",
  "y11adv-ucq-m5":
    "Reference angle for 11π/6: 2π − 11π/6 = π/6. In Q4 cosine is positive. |cos(π/6)| = √3/2, so cos(11π/6) = √3/2.",
  "y11adv-ucq-m6":
    "Reference angle for 4π/3: π/3. In Q3 sine is negative. |sin(π/3)| = √3/2, so sin(4π/3) = −√3/2.",
  "y11adv-ucq-m7":
    "Reference angle for 2π/3: π/3. In Q2 tangent is negative (sine positive, cosine negative). |tan(π/3)| = √3, so tan(2π/3) = −√3.",
  "y11adv-ucq-m9":
    "Reference angle for 5π/3: 2π − 5π/3 = π/3. In Q4 sine is negative. |sin(π/3)| = √3/2, so sin(5π/3) = −√3/2.",
  "y11adv-ucq-m10":
    "sin(π + θ) = −sin θ. So sin(π + π/6) = −sin(π/6) = −1/2. The angle π + π/6 is in Q3 where sine is negative.",
};

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
) {
  const q = baseFormulaAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]);
  const explanation =
    TRIG_MEASURE_EXPLANATIONS[id] ??
    `Identify whether the question needs a conversion, a formula, or an exact-value recall, then follow through to get ${answer}.`;
  return { ...q, explanation };
}

export function year11AdvancedTrigonometryMeasureLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-advanced" ||
    unit.slug !== "trigonometry-measure-angles"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "radians-exact-trigonometric-values") {
    return {
      ...base,
      description:
        "Convert between degrees and radians, use arc length and sector area, and evaluate benchmark exact trigonometric values.",
      learningIntention:
        "Learn how radians measure angles, how to convert between angle units, and how exact trigonometric values arise from special triangles.",
      successCriteria: [
        "Convert common angles from degrees to radians.",
        "Convert common angles from radians to degrees.",
        "Use $s=r\\theta$ to find arc length when theta is in radians.",
        "Use $A=\\frac12r^2\\theta$ to find sector area when theta is in radians.",
        "Evaluate exact trigonometric values from special triangles.",
        "Identify exact values at quadrant boundaries.",
      ],
      teaching: {
        paragraphs: [
          "A radian measures angle using the relationship between arc length and radius. One full turn is $2\\pi$ radians.",
          "A half turn is $\\pi$ radians, and a right angle is $\\frac{\\pi}{2}$ radians.",
          "To convert degrees to radians, multiply by $\\frac{\\pi}{180}$. To convert radians to degrees, multiply by $\\frac{180}{\\pi}$.",
          "The formulas for arc length and sector area use radians. If the angle is given in degrees, convert it first.",
          "Exact trigonometric values for $\\frac{\\pi}{6}$, $\\frac{\\pi}{4}$, and $\\frac{\\pi}{3}$ come from the 30-60-90 and 45-45-90 triangles.",
          "Quadrant-boundary angles such as $0$, $\\frac{\\pi}{2}$, $\\pi$, and $2\\pi$ have exact values that can be read from the axes.",
        ],
        latexBlocks: [
          "360^\\circ=2\\pi,\\quad 180^\\circ=\\pi,\\quad 90^\\circ=\\frac{\\pi}{2}",
          "\\theta\\text{ radians}=\\theta^\\circ\\times\\frac{\\pi}{180}",
          "\\theta^\\circ=\\theta\\text{ radians}\\times\\frac{180}{\\pi}",
          "s=r\\theta",
          "A=\\frac12r^2\\theta",
          "\\sin\\left(\\frac{\\pi}{6}\\right)=\\frac12,\\quad \\sin\\left(\\frac{\\pi}{4}\\right)=\\frac{\\sqrt2}{2},\\quad \\sin\\left(\\frac{\\pi}{3}\\right)=\\frac{\\sqrt3}{2}",
        ],
      },
      workedExamples: [
        {
          title: "Convert to radians and identify the quadrant",
          questionLatex:
            "150^\\circ\\quad \\text{convert to radians and identify the quadrant.}",
          steps: [
            { explanation: "Multiply by the degree-to-radian conversion factor.", latex: "150^\\circ\\times\\frac{\\pi}{180}" },
            { explanation: "Simplify the fraction.", latex: "\\frac{150\\pi}{180}=\\frac{5\\pi}{6}" },
            { explanation: "The angle lies between a right angle and a half turn.", latex: "\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi" },
          ],
          finalAnswerLatex: "\\frac{5\\pi}{6},\\quad \\text{quadrant II}",
        },
        {
          title: "Evaluate an exact value using a special triangle",
          questionLatex: "\\sin\\left(\\frac{\\pi}{3}\\right)",
          steps: [
            { explanation: "Use the 30-60-90 triangle.", latex: "\\frac{\\pi}{3}=60^\\circ" },
            { explanation: "For this angle, sine is opposite over hypotenuse.", latex: "\\sin\\left(\\frac{\\pi}{3}\\right)=\\frac{\\sqrt3}{2}" },
          ],
          finalAnswerLatex: "\\frac{\\sqrt3}{2}",
        },
        {
          title: "Find arc length",
          questionLatex: "r=8,\\quad \\theta=\\frac{\\pi}{4}",
          steps: [
            { explanation: "Use the arc length formula with theta in radians.", latex: "s=r\\theta" },
            { explanation: "Substitute the values.", latex: "s=8\\cdot\\frac{\\pi}{4}" },
            { explanation: "Simplify.", latex: "s=2\\pi" },
          ],
          finalAnswerLatex: "2\\pi",
        },
        {
          title: "Find sector area",
          questionLatex: "r=6,\\quad \\theta=\\frac{2\\pi}{3}",
          steps: [
            { explanation: "Use the sector area formula with theta in radians.", latex: "A=\\frac12r^2\\theta" },
            { explanation: "Substitute the radius and angle.", latex: "A=\\frac12(6)^2\\cdot\\frac{2\\pi}{3}" },
            { explanation: "Simplify.", latex: "A=12\\pi" },
          ],
          finalAnswerLatex: "12\\pi",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-trig-rad-g1", "Convert the angle to radians.", "60^\\circ", "pi/3", ["\\pi/3", "π/3"]),
        formulaAnswer("y11adv-trig-rad-g2", "Convert the angle to degrees.", "\\frac{3\\pi}{2}", "270", ["270 degrees", "270°"]),
        formulaAnswer("y11adv-trig-rad-g3", "Find the arc length.", "r=6,\\quad \\theta=\\frac{\\pi}{3}", "2pi", ["2\\pi", "2π"]),
        practicalChoice("y11adv-trig-rad-g4", "Which exact value is correct?", "C", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$1$"], "Use the 30-60-90 triangle exact values.", "\\sin\\left(\\frac{\\pi}{3}\\right)"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-rad-i1", "Convert the angle to radians.", "135^\\circ", "3pi/4", ["3\\pi/4", "3π/4"]),
        formulaAnswer("y11adv-trig-rad-i2", "Convert the angle to degrees.", "\\frac{5\\pi}{6}", "150", ["150 degrees", "150°"]),
        formulaAnswer("y11adv-trig-rad-i3", "Find the sector area.", "r=4,\\quad \\theta=\\frac{\\pi}{3}", "8pi/3", ["8\\pi/3", "8π/3"]),
        practicalChoice("y11adv-trig-rad-i4", "Which exact value is correct?", "B", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$1$"], "Use the 45-45-90 triangle exact values.", "\\cos\\left(\\frac{\\pi}{4}\\right)"),
        practicalChoice("y11adv-trig-rad-i5", "Why must theta be in radians for the displayed formula?", "A", ["Radians connect arc length directly to radius", "Degrees always make the area zero", "Radians are only used for triangles", "The radius must be one"], "The formula s = r theta is derived from the radian definition.", "s=r\\theta"),
      ],
      commonMistakes: [
        { mistake: "Using degree values directly in arc length or sector area formulas.", fix: "Convert the angle to radians before using $s=r\\theta$ or $A=\\frac12r^2\\theta$." },
        { mistake: "Forgetting that a full turn is $2\\pi$ radians.", fix: "Use $360^\\circ=2\\pi$ as the anchor conversion." },
        { mistake: "Swapping the exact sine values for $\\frac{\\pi}{6}$ and $\\frac{\\pi}{3}$.", fix: "Use the 30-60-90 triangle: sine is smaller at $\\frac{\\pi}{6}$ and larger at $\\frac{\\pi}{3}$." },
        { mistake: "Leaving answers in decimal form when an exact pi expression is expected.", fix: "Keep pi in the answer unless the question asks for a decimal." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-trig-rad-m1", "Convert the angle to radians.", "90^\\circ", "pi/2", ["\\pi/2", "π/2"]),
        formulaAnswer("y11adv-trig-rad-m2", "Convert the angle to degrees.", "\\frac{\\pi}{6}", "30", ["30 degrees", "30°"]),
        practicalChoice("y11adv-trig-rad-m3", "Which exact value is correct?", "A", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$0$"], "Use the 30-60-90 triangle exact values.", "\\sin\\left(\\frac{\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-rad-m4", "Find the arc length.", "r=8,\\quad \\theta=\\frac{\\pi}{4}", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-trig-rad-m5", "Find the sector area.", "r=6,\\quad \\theta=\\frac{2\\pi}{3}", "12pi", ["12\\pi", "12π"]),
        practicalChoice("y11adv-trig-rad-m6", "Which quadrant contains the angle?", "B", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a right angle and a half turn.", "\\frac{5\\pi}{6}"),
        practicalChoice("y11adv-trig-rad-m7", "A student uses the angle in degrees directly in the arc length formula. Which option identifies the error?", "D", ["The radius should be squared", "The sine value should be used", "The answer must be negative", "The angle must be converted to radians first"], "The formula s = r theta requires theta in radians.", "s=r\\theta"),
        practicalChoice("y11adv-trig-rad-m8", "Which exact boundary value is correct?", "C", ["$1$", "$-1$", "$0$", "$\\frac12$"], "At a half turn, the y-coordinate is zero.", "\\sin(\\pi)"),
        formulaAnswer("y11adv-trig-rad-m9", "Find the sector area.", "r=2,\\quad \\theta=\\frac{2\\pi}{3}", "4pi/3", ["4\\pi/3", "4π/3"]),
        formulaAnswer("y11adv-trig-rad-m10", "Convert the angle to radians.", "300^\\circ", "5pi/3", ["5\\pi/3", "5π/3"]),
      ],
    };
  }

  if (lesson.slug === "unit-circle-trigonometric-graphs") {
    return {
      ...base,
      description:
        "Use the unit circle, quadrant signs, reference angles, and graph features of sine, cosine, and tangent.",
      learningIntention:
        "Learn how the unit circle gives trigonometric values and how the basic sine, cosine, and tangent graphs behave.",
      successCriteria: [
        "Use $(\\cos\\theta,\\sin\\theta)$ as the unit-circle coordinate rule.",
        "Use tangent as $\\frac{\\sin\\theta}{\\cos\\theta}$ where defined.",
        "Identify quadrant signs for sine, cosine, and tangent.",
        "Use reference angles to evaluate exact values in other quadrants.",
        "State the period, range, and starting value of sine and cosine graphs.",
        "Recognise tangent's period, range, and vertical asymptotes.",
      ],
      teaching: {
        paragraphs: [
          "On the unit circle, the point at angle theta has x-coordinate cosine and y-coordinate sine.",
          "Tangent is sine divided by cosine, so tangent is undefined when cosine is zero.",
          "Quadrant signs can be remembered using ASTC: all positive in quadrant I, sine positive in quadrant II, tangent positive in quadrant III, and cosine positive in quadrant IV.",
          "A reference angle is the acute angle made with the x-axis. It gives the size of the exact value; the quadrant gives the sign.",
          "The basic sine and cosine graphs have period $2\\pi$ and range $[-1,1]$. Sine starts at 0, while cosine starts at 1.",
          "The basic tangent graph has period $\\pi$, all real y-values, and vertical asymptotes where cosine is zero.",
        ],
        latexBlocks: [
          "(x,y)=(\\cos\\theta,\\sin\\theta)",
          "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta},\\quad \\cos\\theta\\ne0",
          "\\text{ASTC: I all, II sine, III tangent, IV cosine}",
          "y=\\sin x:\\quad \\text{period }2\\pi,\\quad \\text{range }[-1,1],\\quad y(0)=0",
          "y=\\cos x:\\quad \\text{period }2\\pi,\\quad \\text{range }[-1,1],\\quad y(0)=1",
          "y=\\tan x:\\quad \\text{period }\\pi,\\quad \\text{asymptotes }x=\\frac{\\pi}{2}+k\\pi",
        ],
      },
      workedExamples: [
        {
          title: "Identify quadrant signs",
          questionLatex: "\\theta=\\frac{5\\pi}{6}",
          steps: [
            { explanation: "Compare the angle with quadrant boundaries.", latex: "\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi" },
            { explanation: "The angle is in quadrant II.", latex: "\\text{quadrant II}" },
            { explanation: "In quadrant II, sine is positive and cosine is negative.", latex: "\\sin\\theta>0,\\quad \\cos\\theta<0" },
          ],
          finalAnswerLatex: "\\text{quadrant II; sine positive, cosine negative}",
        },
        {
          title: "Evaluate using a reference angle",
          questionLatex: "\\cos\\left(\\frac{5\\pi}{6}\\right)",
          steps: [
            { explanation: "The reference angle is one sixth of pi.", latex: "\\pi-\\frac{5\\pi}{6}=\\frac{\\pi}{6}" },
            { explanation: "Cosine has magnitude root three over two at this reference angle.", latex: "\\left|\\cos\\left(\\frac{5\\pi}{6}\\right)\\right|=\\frac{\\sqrt3}{2}" },
            { explanation: "Cosine is negative in quadrant II.", latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)=-\\frac{\\sqrt3}{2}" },
          ],
          finalAnswerLatex: "-\\frac{\\sqrt3}{2}",
        },
        {
          title: "State cosine graph features",
          questionLatex: "y=\\cos x",
          steps: [
            { explanation: "The basic cosine graph repeats every full turn.", latex: "\\text{period}=2\\pi" },
            { explanation: "Cosine values run from -1 to 1.", latex: "\\text{range}=[-1,1]" },
            { explanation: "At zero, cosine starts at its maximum.", latex: "\\cos 0=1" },
          ],
          finalAnswerLatex: "\\text{period }2\\pi,\\quad \\text{range }[-1,1],\\quad y(0)=1",
        },
        {
          title: "Find tangent asymptotes",
          questionLatex: "y=\\tan x",
          steps: [
            { explanation: "Tangent is undefined where cosine is zero.", latex: "\\cos x=0" },
            { explanation: "The first two positive angles where cosine is zero are shown.", latex: "x=\\frac{\\pi}{2},\\quad x=\\frac{3\\pi}{2}" },
          ],
          finalAnswerLatex: "x=\\frac{\\pi}{2},\\quad x=\\frac{3\\pi}{2}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-trig-circle-g1", "Which coordinate rule matches the unit circle?", "C", ["$(\\sin\\theta,\\cos\\theta)$", "$(\\tan\\theta,\\sin\\theta)$", "$(\\cos\\theta,\\sin\\theta)$", "$(\\cos\\theta,\\tan\\theta)$"], "Cosine is the x-coordinate and sine is the y-coordinate.", "\\theta"),
        practicalChoice("y11adv-trig-circle-g2", "Which quadrant contains the angle?", "B", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a right angle and a half turn.", "\\frac{5\\pi}{6}"),
        practicalChoice("y11adv-trig-circle-g3", "Which exact value is correct?", "A", ["$-\\frac{\\sqrt3}{2}$", "$\\frac{\\sqrt3}{2}$", "$-\\frac12$", "$\\frac12$"], "Use the reference angle and quadrant II cosine sign.", "\\cos\\left(\\frac{5\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-circle-g4", "State the period of the basic cosine graph.", "y=\\cos x", "2pi", ["2\\pi", "2π"]),
      ],
      independentPractice: [
        practicalChoice("y11adv-trig-circle-i1", "Which signs are correct in the quadrant shown?", "D", ["Sine positive, cosine positive", "Sine positive, cosine negative", "Sine negative, cosine positive", "Sine negative, cosine negative"], "In quadrant III, both coordinates are negative.", "\\text{Quadrant III}"),
        practicalChoice("y11adv-trig-circle-i2", "Which exact value is correct?", "B", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant III sine sign.", "\\sin\\left(\\frac{7\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-circle-i3", "State the starting value of the basic sine graph.", "y=\\sin x,\\quad x=0", "0"),
        practicalChoice("y11adv-trig-circle-i4", "Where is tangent undefined?", "A", ["Where cosine is zero", "Where sine is zero", "Where tangent is positive", "Where x is any multiple of pi"], "Tangent is sine divided by cosine.", "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}"),
        formulaAnswer("y11adv-trig-circle-i5", "State the period of the basic tangent graph.", "y=\\tan x", "pi", ["\\pi", "π"]),
      ],
      commonMistakes: [
        { mistake: "Swapping sine and cosine coordinates on the unit circle.", fix: "Use $(\\cos\\theta,\\sin\\theta)$." },
        { mistake: "Using the reference angle sign without checking the quadrant.", fix: "Find the magnitude from the reference angle, then apply the quadrant sign." },
        { mistake: "Giving tangent the same range as sine and cosine.", fix: "Tangent has all real y-values." },
        { mistake: "Forgetting tangent is undefined where cosine is zero.", fix: "Use $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$ and check the denominator." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-trig-circle-m1", "Which coordinate rule matches the unit circle?", "A", ["$(\\cos\\theta,\\sin\\theta)$", "$(\\sin\\theta,\\cos\\theta)$", "$(\\tan\\theta,\\cos\\theta)$", "$(\\theta,\\sin\\theta)$"], "Cosine is the x-coordinate and sine is the y-coordinate.", "\\theta"),
        practicalChoice("y11adv-trig-circle-m2", "Which quadrant contains the angle?", "C", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a half turn and three quarters of a turn.", "\\frac{4\\pi}{3}"),
        formulaAnswer("y11adv-trig-circle-m3", "State the period of the basic sine graph.", "y=\\sin x", "2pi", ["2\\pi", "2π"]),
        practicalChoice("y11adv-trig-circle-m4", "Which exact value is correct?", "B", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant III sine sign.", "\\sin\\left(\\frac{7\\pi}{6}\\right)"),
        practicalChoice("y11adv-trig-circle-m5", "Which exact value is correct?", "D", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant II cosine sign.", "\\cos\\left(\\frac{5\\pi}{6}\\right)"),
        practicalChoice("y11adv-trig-circle-m6", "Which feature belongs to the basic tangent graph?", "C", ["Range $[-1,1]$", "Period $2\\pi$", "Vertical asymptote at $x=\\frac{\\pi}{2}$", "Starting value 1"], "Tangent is undefined where cosine is zero.", "y=\\tan x"),
        practicalChoice("y11adv-trig-circle-m7", "A student says tangent is undefined where sine is zero. Which option identifies the error?", "A", ["Tangent is undefined where cosine is zero", "Tangent is never undefined", "Sine and cosine are always equal", "The reference angle should be doubled"], "Tangent has cosine in the denominator.", "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}"),
        practicalChoice("y11adv-trig-circle-m8", "Which graph starts at its maximum value?", "B", ["$y=\\sin x$", "$y=\\cos x$", "$y=\\tan x$", "$y=-\\sin x$"], "Cosine starts at 1 when x is zero.", "x=0"),
        formulaAnswer("y11adv-trig-circle-m9", "State the first positive vertical asymptote of the basic tangent graph.", "y=\\tan x", "pi/2", ["\\pi/2", "π/2"]),
        practicalChoice("y11adv-trig-circle-m10", "Which statement correctly describes the basic cosine graph?", "D", ["Period pi and range all real values", "Period pi and range [-1,1]", "Period 2pi and range all real values", "Period 2pi and range [-1,1]"], "The basic cosine graph repeats every full turn and stays between -1 and 1.", "y=\\cos x"),
      ],
    };
  }

  if (lesson.slug === "trigonometry-measure-angles-exam-practice") {
    const examCurve: import("../types").CartesianGraph = {
      description:
        "An unlabelled sinusoidal curve on 0 to 2 pi has midline y equals 1, maximum 3, minimum negative 1, starts at the midline rising, and completes two cycles.",
      xMin: 0,
      xMax: 2 * Math.PI,
      yMin: -1.5,
      yMax: 3.5,
      xStep: Math.PI / 2,
      yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        {
          kind: "sin",
          a: 2,
          b: 2,
          c: 0,
          d: 1,
          description: "The unlabelled curve used for equation reconstruction.",
        },
      ],
    };
    const reverseFeatureCurve: import("../types").CartesianGraph = {
      description:
        "A sinusoidal curve has maximum 5, minimum negative 3, period pi, and crosses its midline upward at the origin.",
      xMin: 0,
      xMax: 2 * Math.PI,
      yMin: -3.5,
      yMax: 5.5,
      xStep: Math.PI / 2,
      yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        {
          kind: "sin",
          a: 4,
          b: 2,
          c: 0,
          d: 1,
          description:
            "The curve crosses y equals 1 upward at x equals 0 and repeats every pi.",
        },
      ],
    };
    const examMultipartGraph: import("../types").CartesianGraph = {
      description:
        "The graph of y equals 2 sine of 3x minus pi over 2 plus 1 has amplitude 2, period 2 pi over 3, midline y equals 1, a right phase shift of pi over 6, and maximum 3.",
      xMin: 0,
      xMax: (4 * Math.PI) / 3,
      yMin: -1.5,
      yMax: 3.5,
      xStep: Math.PI / 6,
      yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        {
          kind: "sin",
          a: 2,
          b: 3,
          c: -Math.PI / 2,
          d: 1,
          label: "y=2\\sin(3x-\\pi/2)+1",
          description:
            "Two complete cycles of the transformed sine curve.",
        },
      ],
    };
    return {
      ...base,
      description:
        "Practise mixed assessment-style questions covering all v2 unit skills: radians, exact values, arc length, sector area, the unit circle, basic trigonometric graphs, amplitude, period, phase shift, and vertical shift.",
      learningIntention:
        "Apply all trigonometry and measure of angles skills — from radian conversion to graph transformations — to mixed assessment-style questions.",
      successCriteria: [
        "Convert common angles between degrees and radians.",
        "Use arc length and sector area formulas with radians.",
        "Evaluate exact trigonometric values using special triangles and quadrant signs.",
        "Use the unit-circle coordinate rule.",
        "Identify tangent undefined values and asymptotes.",
        "State basic sine, cosine, and tangent graph features.",
        "State the amplitude and period of $y=a\\sin(bx)$ or $y=a\\cos(bx)$.",
        "State the phase shift and vertical shift of $y=a\\sin(bx+c)+d$.",
        "Find the maximum and minimum values of a transformed sinusoidal.",
      ],
      teaching: {
        paragraphs: [
          "This exam-practice lesson mixes all skills from the unit. First identify whether the question is about angle conversion, arc length, sector area, exact values, the unit circle, basic graph features, or transformed graphs.",
          "Keep exact answers in terms of pi where appropriate, and use radians for arc length and sector area formulas.",
          "For exact trigonometric values outside quadrant I, use the reference angle for the size and the quadrant for the sign (ASTC).",
          "For basic graph questions: sine and cosine have period $2\\pi$, tangent has period $\\pi$ and vertical asymptotes at $x=\\frac{\\pi}{2}+k\\pi$.",
          "For transformed sinusoidals $y=a\\sin(bx+c)+d$: amplitude is $|a|$, period is $\\frac{2\\pi}{b}$, phase shift is $-\\frac{c}{b}$ (positive $c$ shifts left), and vertical shift is $d$. Maximum is $d+|a|$, minimum is $d-|a|$.",
        ],
        latexBlocks: [
          "180^\\circ=\\pi",
          "s=r\\theta,\\quad A=\\frac12r^2\\theta",
          "(x,y)=(\\cos\\theta,\\sin\\theta)",
          "y=\\sin x,\\ y=\\cos x:\\text{ period }2\\pi;\\quad y=\\tan x:\\text{ period }\\pi",
          "y=a\\sin(bx+c)+d:\\quad\\text{amp}=|a|,\\quad\\text{period}=\\frac{2\\pi}{b},\\quad\\text{phase shift}=-\\frac{c}{b}",
          "\\text{max}=d+|a|,\\quad\\text{min}=d-|a|",
        ],
      },
      workedExamples: [
        {
          title: "Mixed conversion and exact value",
          questionLatex: "120^\\circ,\\quad \\sin\\left(\\frac{2\\pi}{3}\\right)",
          steps: [
            { explanation: "Convert the angle to radians.", latex: "120^\\circ=120\\times\\frac{\\pi}{180}=\\frac{2\\pi}{3}" },
            { explanation: "Use the reference angle and quadrant II sine sign.", latex: "\\sin\\left(\\frac{2\\pi}{3}\\right)=\\frac{\\sqrt3}{2}" },
          ],
          finalAnswerLatex: "\\frac{2\\pi}{3},\\quad \\frac{\\sqrt3}{2}",
        },
        {
          title: "Arc length in an assessment context",
          questionLatex: "r=9,\\quad \\theta=\\frac{2\\pi}{3}",
          steps: [
            { explanation: "Use the arc length formula.", latex: "s=r\\theta" },
            { explanation: "Substitute and simplify.", latex: "s=9\\cdot\\frac{2\\pi}{3}=6\\pi" },
          ],
          finalAnswerLatex: "6\\pi",
        },
        {
          title: "Graph feature check",
          questionLatex: "y=\\tan x",
          steps: [
            { explanation: "The tangent graph repeats every pi.", latex: "\\text{period}=\\pi" },
            { explanation: "The first positive vertical asymptote occurs where cosine is zero.", latex: "x=\\frac{\\pi}{2}" },
          ],
          finalAnswerLatex: "\\text{period }\\pi,\\quad \\text{asymptote }x=\\frac{\\pi}{2}",
        },
        {
          title: "Full feature summary from one transformed equation",
          questionLatex: "y=3\\cos\\!\\left(2x+\\frac{\\pi}{2}\\right)-1",
          steps: [
            { explanation: "Identify a, b, c, d.", latex: "a=3,\\quad b=2,\\quad c=\\frac{\\pi}{2},\\quad d=-1" },
            { explanation: "Amplitude = |a|.", latex: "\\text{amplitude}=|3|=3" },
            { explanation: "Period = 2π/b.", latex: "\\text{period}=\\frac{2\\pi}{2}=\\pi" },
            { explanation: "Phase shift = −c/b. Positive c shifts left.", latex: "\\text{phase shift}=-\\frac{\\pi/2}{2}=-\\frac{\\pi}{4}\\text{ (left }\\tfrac{\\pi}{4}\\text{)}" },
            { explanation: "Range = [d − |a|, d + |a|].", latex: "[-1-3,\\,-1+3]=[-4,\\,2]" },
          ],
          finalAnswerLatex: "\\text{amp }3,\\;\\text{period }\\pi,\\;\\text{shift left }\\tfrac{\\pi}{4},\\;\\text{range }[-4,2]",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-trig-exam-g1", "Convert the angle to radians.", "30^\\circ", "pi/6", ["\\pi/6", "π/6"]),
        formulaAnswer("y11adv-trig-exam-g2", "Find the arc length.", "r=3,\\quad \\theta=2\\pi", "6pi", ["6\\pi", "6π"]),
        practicalChoice("y11adv-trig-exam-g3", "Which exact value is correct?", "B", ["$\\frac12$", "$-\\frac12$", "$\\frac{\\sqrt2}{2}$", "$-\\frac{\\sqrt2}{2}$"], "Use the reference angle and quadrant III sine sign.", "\\sin\\left(\\frac{7\\pi}{6}\\right)"),
        practicalChoice("y11adv-trig-exam-g4", "Which graph feature is correct?", "D", ["Sine has period pi", "Cosine has range all real values", "Tangent has range [-1,1]", "Tangent has period pi"], "The basic tangent graph repeats every pi.", "\\text{Basic trigonometric graphs}"),
      ],
      independentPractice: [
        formulaAnswer("y11adv-trig-exam-i1", "Convert the angle to degrees.", "\\frac{7\\pi}{12}", "105", ["105 degrees", "105°"]),
        formulaAnswer("y11adv-trig-exam-i2", "Find the sector area.", "r=3,\\quad \\theta=\\frac{2\\pi}{3}", "3pi", ["3\\pi", "3π"]),
        practicalChoice("y11adv-trig-exam-i3", "Which coordinate rule is correct?", "A", ["$(\\cos\\theta,\\sin\\theta)$", "$(\\sin\\theta,\\cos\\theta)$", "$(\\tan\\theta,\\sin\\theta)$", "$(\\theta,\\tan\\theta)$"], "On the unit circle, cosine is x and sine is y.", "\\theta"),
        practicalChoice("y11adv-trig-exam-i4", "Which sign pattern is correct?", "C", ["Sine positive, cosine positive", "Sine positive, cosine negative", "Sine negative, cosine positive", "Sine negative, cosine negative"], "In quadrant IV, y is negative and x is positive.", "\\text{Quadrant IV}"),
        formulaAnswer("y11adv-trig-exam-i5", "State the first positive vertical asymptote of the tangent graph.", "y=\\tan x", "pi/2", ["\\pi/2", "π/2"]),
      ],
      commonMistakes: [
        { mistake: "Forgetting to convert degrees to radians before using circular-measure formulas.", fix: "Use radians in $s=r\\theta$ and $A=\\frac12r^2\\theta$." },
        { mistake: "Using the reference angle but forgetting the quadrant sign.", fix: "Reference angles give magnitude; quadrant signs give positive or negative." },
        { mistake: "Mixing up sine and cosine on the unit circle.", fix: "The unit-circle point is $(\\cos\\theta,\\sin\\theta)$." },
        { mistake: "Giving tangent the same period and range as sine and cosine.", fix: "Tangent has period $\\pi$ and all real y-values." },
        { mistake: "Writing period $=b\\times2\\pi$ instead of $\\frac{2\\pi}{b}$.", fix: "Period is DIVIDED by $b$. Larger $b$ gives a shorter period." },
        { mistake: "Including the vertical shift $d$ in the amplitude.", fix: "Amplitude $=|a|$. Vertical shift raises the midline but does not change $|a|$." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-trig-exam-qm1",
          prompt:
            "A sector has radius 3 cm and central angle $120^\\circ$. A student converts the angle to $2\\pi/3$ but states the sector area is $2\\pi$ cm². Which response is correct?",
          latex: "\\text{audit the complete calculation}",
          answer: "C",
          choices: [
            "The answer is correct",
            "The conversion is wrong; $120^\\circ=\\pi/3$",
            "The conversion is correct, but the area is $\\frac12(3^2)(2\\pi/3)=3\\pi$",
            "The area is $6\\pi$ because the radius should not be squared",
          ],
          hint:
            "Check the degree-to-radian conversion and the radius-squared factor separately.",
          explanation:
            "The conversion $120^\\circ=2\\pi/3$ is correct. Applying $A=\\frac12r^2\\theta$ gives $A=\\frac12(9)(2\\pi/3)=3\\pi$ cm². The student's $2\\pi$ loses part of the radius-squared factor, so option C gives the correct diagnosis and value.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks whether a learner can audit a multi-step circular-measure solution rather than merely recall one formula.",
          distractorMisconceptions: {
            A: "Accepts the stated result without checking the radius-squared substitution.",
            B: "Halves the correct radian conversion.",
            D: "Uses an arc-length-style radius factor in the area formula.",
          },
          sectorDiagram: {
            description:
              "A sector of a circle with radius 3 centimetres and central angle 120 degrees, equivalent to two pi over three radians.",
            angleDegrees: 120,
            radiusLabel: "r=3\\text{ cm}",
            angleLabel: "120^\\circ",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-exam-qm2",
          prompt:
            "The unit-circle point has angle $5\\pi/6$. Find the exact value of $x+y$ for its coordinates $(x,y)$.",
          latex: "\\text{give an exact value}",
          answer: "(1-sqrt(3))/2",
          acceptedAnswers: [
            "(1-\\sqrt3)/2",
            "$\\frac{1-\\sqrt{3}}2$",
            "1/2-sqrt(3)/2",
          ],
          hint:
            "Use the reference angle $\\pi/6$ and the coordinate signs in quadrant II.",
          explanation:
            "At $5\\pi/6$, the unit-circle coordinates are $(\\cos5\\pi/6,\\sin5\\pi/6)=(-\\sqrt3/2,1/2)$. Therefore $x+y=-\\sqrt3/2+1/2=(1-\\sqrt3)/2$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Tests exact coordinate recovery with quadrant signs and a short symbolic combination.",
          unitCircleDiagram: {
            description:
              "A unit-circle point in quadrant II at angle five pi over six, with its coordinates labelled x and y.",
            angleRadians: "\\frac{5\\pi}{6}",
            terminalPoint: { x: "-√3/2", y: "1/2", label: "(x,y)" },
            quadrant: 2,
            showReferenceTriangle: true,
            highlightRadius: true,
          },
        }),
        qualityChoice({
          id: "y11adv-trig-exam-qm3",
          prompt:
            "Which equation matches the displayed unlabelled sinusoidal curve?",
          latex: "0\\le x\\le2\\pi",
          answer: "B",
          choices: [
            "$y=2\\sin x+1$",
            "$y=2\\sin(2x)+1$",
            "$y=2\\cos(2x)+1$",
            "$y=\\sin(2x)+1$",
          ],
          hint:
            "Read amplitude and midline from the extrema, period from the number of cycles, and the starting direction from x equals zero.",
          explanation:
            "The extrema 3 and $-1$ give amplitude 2 and midline 1. Two cycles on $[0,2\\pi]$ give period $\\pi$, hence $b=2$. The curve starts at the midline and rises, selecting sine rather than cosine. Therefore option B is $y=2\\sin(2x)+1$.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Requires reconstructing a transformed equation from several independent graphical features.",
          distractorMisconceptions: {
            A: "Reads amplitude and midline but misses the halved period.",
            C: "Uses cosine despite the upward midline start.",
            D: "Reads period and midline but loses the vertical stretch.",
          },
          cartesianGraph: examCurve,
        }),
        qualityAnswer({
          id: "y11adv-trig-exam-qm4",
          prompt:
            "A circle has radius 6 cm and an arc of length $4\\pi$ cm. Find the central angle in radians and the sector area, in that order.",
          latex: "\\text{state }\\theta\\text{, then }A",
          answer: "2pi/3,12pi",
          acceptedAnswers: [
            "2\\pi/3,12\\pi",
            "theta=2pi/3; area=12pi",
            "2π/3 radians,12π cm^2",
          ],
          hint:
            "First rearrange $s=r\\theta$. Then use either the sector formula or $A=rs/2$.",
          explanation:
            "From $s=r\\theta$, $\\theta=4\\pi/6=2\\pi/3$. The area is $\\frac12r^2\\theta=\\frac12(36)(2\\pi/3)=12\\pi$ cm². Equivalently, $A=rs/2=6(4\\pi)/2=12\\pi$.",
          difficulty: 3,
          taskType: "synthesis",
          diagnosticIntent:
            "Links inverse arc-length reasoning with an exact sector-area calculation from the same circular data.",
          sectorDiagram: {
            description:
              "A circle sector with radius 6 centimetres, arc length 4 pi centimetres, and unknown central angle theta.",
            angleDegrees: 120,
            radiusLabel: "r=6\\text{ cm}",
            angleLabel: "\\theta",
            arcLabel: "s=4\\pi\\text{ cm}",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-exam-qm5",
          prompt:
            "A sinusoid $y=a\\sin(bx)+d$ has $a>0$, $b>0$, maximum 5, minimum $-3$, period $\\pi$, and crosses its midline upward at $x=0$. Find $a+b+d$.",
          latex: "y=a\\sin(bx)+d",
          answer: "7",
          acceptedAnswers: ["a=4,b=2,d=1; sum=7", "4+2+1", "seven"],
          hint:
            "Use the extrema for amplitude and midline, then use $2\\pi/b$ for the period.",
          explanation:
            "The amplitude is $(5-(-3))/2=4$, so $a=4$. The midline is $(5+(-3))/2=1$, so $d=1$. Period $\\pi$ gives $2\\pi/b=\\pi$, hence $b=2$. The upward origin crossing is consistent with positive sine, and $a+b+d=7$.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Requires reverse inference of three sinusoidal parameters from extrema, period, and orientation.",
          cartesianGraph: reverseFeatureCurve,
        }),
        qualityChoice({
          id: "y11adv-trig-exam-qm6",
          prompt:
            "Mina evaluates $\\sin(5\\pi/6)+\\cos(4\\pi/3)$ using unit-circle coordinates. Theo uses reference angles and quadrant signs. Whose method is valid?",
          latex: "\\sin\\frac{5\\pi}{6}+\\cos\\frac{4\\pi}{3}",
          answer: "C",
          choices: ["Mina only", "Theo only", "Both methods", "Neither method"],
          hint:
            "Both representations encode the same exact sine and cosine values. Evaluate each chain before judging it.",
          explanation:
            "Unit-circle coordinates give $\\sin(5\\pi/6)=1/2$ and $\\cos(4\\pi/3)=-1/2$. Reference angles with quadrant signs give the same pair. Both methods therefore obtain a total of 0 and are valid.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Assesses equivalence between coordinate and reference-angle strategies for exact values across different quadrants.",
          distractorMisconceptions: {
            A: "Rejects a valid reference-angle method.",
            B: "Rejects a valid unit-circle coordinate method.",
            D: "Fails to recognise either representation as a complete exact-value method.",
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-exam-qm7",
          prompt:
            "A point starts at $(5,0)$ on a circle of radius 5 centred at the origin and travels counterclockwise through arc length $5\\pi/2$. Find its final coordinates.",
          latex: "\\text{counterclockwise circular motion}",
          answer: "0,5",
          acceptedAnswers: ["(0,5)", "x=0,y=5", "0,5 units"],
          hint:
            "Convert arc length to angular displacement using $\\theta=s/r$, then apply the unit-circle coordinate rule scaled by radius 5.",
          explanation:
            "The angular displacement is $\\theta=(5\\pi/2)/5=\\pi/2$. Starting on the positive x-axis and rotating counterclockwise by $\\pi/2$ reaches the positive y-axis. Scaling $(\\cos\\theta,\\sin\\theta)$ by 5 gives $(0,5)$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines arc-length inversion, rotation direction, and scaled unit-circle coordinates.",
          sectorDiagram: {
            description:
              "A radius-5 circle with a point starting on the positive x-axis and travelling counterclockwise through a quarter-turn arc of length 5 pi over 2.",
            angleDegrees: 90,
            radiusLabel: "r=5",
            angleLabel: "\\theta",
            arcLabel: "s=\\frac{5\\pi}{2}",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-exam-qm8",
          prompt:
            "For $f_n(x)=3\\sin(nx-\\pi/2)+1$, where $n$ is an integer satisfying $1\\le n\\le8$, find the sum of all $n$ for which $x=\\pi/2$ is a maximum point.",
          latex: "\\text{bounded transformed-graph family}",
          answer: "8",
          acceptedAnswers: ["n=2,6; sum=8", "2+6=8", "eight"],
          hint:
            "At a maximum, the sine input equals $\\pi/2$ modulo $2\\pi$. Substitute $x=\\pi/2$ and solve the bounded congruence.",
          explanation:
            "A maximum requires $n\\pi/2-\\pi/2=\\pi/2+2k\\pi$. Thus $(n-1)\\pi/2=\\pi/2+2k\\pi$, so $n=2+4k$. Within $1\\le n\\le8$, the values are 2 and 6, whose sum is 8.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Tests systematic filtering of a bounded transformation-parameter family using periodic phase conditions.",
          trigGraphDiagram: {
            description:
              "A generic transformed sine family f sub n with midline 1, amplitude 3, variable frequency n, and the test location x equals pi over 2 marked.",
            functionType: "sin",
            equationLabel: "f_n(x)=3\\sin(nx-\\pi/2)+1",
            xMin: "0",
            xMax: "2pi",
            yMin: -2.5,
            yMax: 4.5,
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-exam-qm9",
          prompt:
            "A sector has arc length $6\\pi$ cm and area $18\\pi$ cm². Find its exact perimeter, including the two radii.",
          latex: "\\text{reverse sector design}",
          answer: "12+6pi",
          acceptedAnswers: ["12+6\\pi", "$12+6\\pi$", "6pi+12 cm"],
          hint:
            "Use $A=rs/2$ to recover the radius from area and arc length, then add the arc and two radii.",
          explanation:
            "For a sector, $A=rs/2$, so $18\\pi=r(6\\pi)/2=3\\pi r$ and $r=6$ cm. The perimeter is the arc plus two radii: $6\\pi+2(6)=12+6\\pi$ cm.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires reverse inference from linked circular measures and distinction between arc length and full sector perimeter.",
          sectorDiagram: {
            description:
              "A circle sector with unknown radius, arc length 6 pi centimetres, area 18 pi square centimetres, and perimeter to be found.",
            angleDegrees: 180,
            radiusLabel: "r",
            arcLabel: "s=6\\pi\\text{ cm}",
            angleLabel: "\\theta",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-trig-exam-qm10",
          prompt:
            "A sector of radius 6 has arc length $4\\pi$. A sinusoid $y=3\\sin(bx+c)+1$ has period equal to the sector angle in radians and its first upward midline crossing is at one quarter of that angle. Using the value of $c$ with smallest absolute value, find $b+c$.",
          latex: "\\text{link circular measure and phase}",
          answer: "3-pi/2",
          acceptedAnswers: ["3-\\pi/2", "$3-\\frac\\pi2$", "b=3,c=-pi/2"],
          hint:
            "Find the sector angle, use it as the sinusoid's period to determine b, then impose a zero sine input at the stated upward crossing.",
          explanation:
            "The sector angle is $\\theta=s/r=4\\pi/6=2\\pi/3$. Setting the sinusoid's period $2\\pi/b$ equal to $2\\pi/3$ gives $b=3$. The crossing is at $x=\\theta/4=\\pi/6$ and must have input 0, so $3(\\pi/6)+c=0$ gives $c=-\\pi/2$. Hence $b+c=3-\\pi/2$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates arc-length inversion, period reconstruction, and a directional phase condition across two representations.",
          sectorDiagram: {
            description:
              "A circle sector of radius 6 with arc length 4 pi and unknown central angle theta, which will become a sinusoidal period.",
            angleDegrees: 120,
            radiusLabel: "r=6",
            arcLabel: "s=4\\pi",
            angleLabel: "\\theta",
            showFullCircle: true,
          },
        }),
      ],
      multiPartPractice: [
        {
          id: "y11adv-trig-exam-mp1",
          prompt: "For the sinusoidal $y=2\\sin\\!\\left(3x-\\frac{\\pi}{2}\\right)+1$, state each feature.",
          latex: "y=2\\sin\\!\\left(3x-\\frac{\\pi}{2}\\right)+1",
          answer: "see parts",
          hint: "Identify a = 2, b = 3, c = −π/2, d = 1. Then apply the standard formulas.",
          explanation:
            "(a) amplitude = |a| = 2. (b) period = 2π/b = 2π/3. (c) phase shift = −c/b = −(−π/2)/3 = π/6 (right). (d) maximum = d + |a| = 1 + 2 = 3.",
          cartesianGraph: examMultipartGraph,
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the amplitude.",
              latex: "\\text{amplitude}=|a|",
              marks: 1,
              answer: "2",
              acceptedAnswers: ["amplitude 2", "2.0"],
              hint: "Amplitude is the absolute value of the outside sine coefficient.",
              explanation: "The outside coefficient is a = 2, so the amplitude is |a| = |2| = 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the period.",
              latex: "\\text{period}=\\frac{2\\pi}{b}",
              marks: 1,
              answer: "2pi/3",
              acceptedAnswers: ["2\\pi/3", "2π/3"],
              hint: "Read b = 3 from the coefficient of x, then use period = 2π/b.",
              explanation: "The horizontal coefficient is b = 3. Therefore the period is 2π/b = 2π/3.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "State the size of the phase shift.",
              latex: "\\text{phase shift}=-\\frac{c}{b}",
              marks: 1,
              answer: "pi/6",
              acceptedAnswers: ["\\pi/6", "π/6"],
              hint: "Phase shift = −c/b = −(−π/2)/3. Simplify the double negative.",
              explanation: "Here c = −π/2 and b = 3. Thus −c/b = (π/2)/3 = π/6, so the graph shifts π/6 to the right.",
            },
            {
              key: "d",
              label: "(d)",
              prompt: "State the maximum value of y.",
              latex: "\\text{max}=d+|a|",
              marks: 1,
              answer: "3",
              acceptedAnswers: ["maximum 3", "y=3"],
              hint: "Add the amplitude to the midline value d = 1.",
              explanation: "The midline is d = 1 and the amplitude is |a| = 2. Therefore the maximum is d + |a| = 1 + 2 = 3.",
            },
          ],
        },
      ],
    };
  }

  // ── PHASE 2A v2 SLOTS ───────────────────────────────────────────────────────

  if (lesson.slug === "exact-trig-values-special-triangles") {
    const tri3060: import("../types").TriangleDiagram = {
      description:
        "Right triangle with the 30-degree angle at B (bottom-right), the 60-degree angle at A (top-left), and the right angle at C (bottom-left). The vertical side AC is labelled 1, the horizontal side BC is labelled √3, and the hypotenuse AB is labelled 2.",
      vertices: { A: { x: 80, y: 40 }, C: { x: 80, y: 230 }, B: { x: 330, y: 230 } },
      rightAngleAt: "C",
      sideLabels: { AC: "1", BC: "\\sqrt{3}", AB: "2" },
      angleLabels: { A: "60\\degree\\,(\\frac{\\pi}{3})", B: "30\\degree\\,(\\frac{\\pi}{6})" },
    };
    const tri4545: import("../types").TriangleDiagram = {
      description:
        "Right isosceles triangle with 45-degree angles at A (top-left) and B (bottom-right), and the right angle at C (bottom-left). Both legs AC and BC are labelled 1 and the hypotenuse AB is labelled √2.",
      vertices: { A: { x: 80, y: 40 }, C: { x: 80, y: 230 }, B: { x: 330, y: 230 } },
      rightAngleAt: "C",
      sideLabels: { AC: "1", BC: "1", AB: "\\sqrt{2}" },
      angleLabels: { A: "45\\degree\\,(\\frac{\\pi}{4})", B: "45\\degree\\,(\\frac{\\pi}{4})" },
    };
    return {
      ...base,
      description:
        "Derive and recall exact sin, cos, and tan values for π/6, π/4, and π/3 using the 30-60-90 and 45-45-90 special triangles.",
      learningIntention:
        "Use the two special right triangles to derive and memorise exact trigonometric values for the angles 30°, 45°, and 60°.",
      successCriteria: [
        "Use SOHCAHTOA to read sin, cos, and tan from the 30-60-90 triangle.",
        "Use SOHCAHTOA to read sin, cos, and tan from the 45-45-90 triangle.",
        "Recall all nine exact values without a calculator.",
        "Apply exact values to evaluate trigonometric expressions.",
      ],
      teaching: {
        paragraphs: [
          "The 30-60-90 triangle has sides in the ratio 1 : √3 : 2. With the right angle at C, angle A = 60° (π/3) and angle B = 30° (π/6). The side opposite each angle gives the sine, the adjacent side gives the cosine, and their ratio gives the tangent.",
          "The 45-45-90 triangle is isosceles with equal legs of length 1 and hypotenuse √2. Both non-right angles equal 45° (π/4).",
          "Mnemonic for the values under the root (over 2): sin(30°) = √1/2 = 1/2, sin(45°) = √2/2, sin(60°) = √3/2. Cosine runs in the opposite order.",
          "Rationalise √3/3 when the answer to tan(π/6) is requested in simplified form: 1/√3 = √3/3.",
        ],
        latexBlocks: [
          "\\text{30-60-90: sides }1,\\,\\sqrt{3},\\,2",
          "\\sin\\tfrac{\\pi}{6}=\\tfrac{1}{2},\\quad\\cos\\tfrac{\\pi}{6}=\\tfrac{\\sqrt{3}}{2},\\quad\\tan\\tfrac{\\pi}{6}=\\tfrac{1}{\\sqrt{3}}=\\tfrac{\\sqrt{3}}{3}",
          "\\sin\\tfrac{\\pi}{3}=\\tfrac{\\sqrt{3}}{2},\\quad\\cos\\tfrac{\\pi}{3}=\\tfrac{1}{2},\\quad\\tan\\tfrac{\\pi}{3}=\\sqrt{3}",
          "\\text{45-45-90: sides }1,\\,1,\\,\\sqrt{2}",
          "\\sin\\tfrac{\\pi}{4}=\\cos\\tfrac{\\pi}{4}=\\tfrac{\\sqrt{2}}{2}=\\tfrac{1}{\\sqrt{2}},\\quad\\tan\\tfrac{\\pi}{4}=1",
        ],
      },
      workedExamples: [
        {
          title: "Derive exact values from the 30-60-90 triangle",
          questionLatex: "\\text{Find }\\sin,\\cos,\\tan\\text{ for }\\tfrac{\\pi}{6}\\text{ and }\\tfrac{\\pi}{3}.",
          triangleDiagram: tri3060,
          steps: [
            { explanation: "Label the sides from the angle at B (30° = π/6): opp = AC = 1, adj = BC = √3, hyp = AB = 2.", latex: "\\sin\\tfrac{\\pi}{6}=\\tfrac{1}{2},\\quad\\cos\\tfrac{\\pi}{6}=\\tfrac{\\sqrt{3}}{2},\\quad\\tan\\tfrac{\\pi}{6}=\\tfrac{1}{\\sqrt{3}}=\\tfrac{\\sqrt{3}}{3}" },
            { explanation: "From the angle at A (60° = π/3): opp = BC = √3, adj = AC = 1, hyp = AB = 2.", latex: "\\sin\\tfrac{\\pi}{3}=\\tfrac{\\sqrt{3}}{2},\\quad\\cos\\tfrac{\\pi}{3}=\\tfrac{1}{2},\\quad\\tan\\tfrac{\\pi}{3}=\\tfrac{\\sqrt{3}}{1}=\\sqrt{3}" },
          ],
          finalAnswerLatex: "\\sin\\tfrac{\\pi}{6}=\\tfrac{1}{2},\\;\\cos\\tfrac{\\pi}{6}=\\tfrac{\\sqrt{3}}{2},\\;\\tan\\tfrac{\\pi}{6}=\\tfrac{\\sqrt{3}}{3};\\quad\\sin\\tfrac{\\pi}{3}=\\tfrac{\\sqrt{3}}{2},\\;\\cos\\tfrac{\\pi}{3}=\\tfrac{1}{2},\\;\\tan\\tfrac{\\pi}{3}=\\sqrt{3}",
        },
        {
          title: "Derive exact values from the 45-45-90 triangle",
          questionLatex: "\\text{Find }\\sin,\\cos,\\tan\\text{ for }\\tfrac{\\pi}{4}.",
          triangleDiagram: tri4545,
          steps: [
            { explanation: "From angle A (or B), 45°: opp = 1, adj = 1, hyp = √2.", latex: "\\sin\\tfrac{\\pi}{4}=\\tfrac{1}{\\sqrt{2}}=\\tfrac{\\sqrt{2}}{2},\\quad\\cos\\tfrac{\\pi}{4}=\\tfrac{1}{\\sqrt{2}}=\\tfrac{\\sqrt{2}}{2}" },
            { explanation: "Tangent is opposite over adjacent.", latex: "\\tan\\tfrac{\\pi}{4}=\\tfrac{1}{1}=1" },
          ],
          finalAnswerLatex: "\\sin\\tfrac{\\pi}{4}=\\cos\\tfrac{\\pi}{4}=\\tfrac{\\sqrt{2}}{2},\\quad\\tan\\tfrac{\\pi}{4}=1",
        },
        {
          title: "Evaluate a trigonometric expression using exact values",
          questionLatex: "2\\cos\\tfrac{\\pi}{3}+\\tan\\tfrac{\\pi}{4}",
          steps: [
            { explanation: "Substitute the exact values.", latex: "2\\cdot\\tfrac{1}{2}+1" },
            { explanation: "Simplify.", latex: "=1+1=2" },
          ],
          finalAnswerLatex: "2",
        },
      ],
      guidedPractice: [
        {
          ...formulaAnswer("y11adv-ev-g1", "Evaluate without a calculator.", "\\sin\\left(\\frac{\\pi}{6}\\right)", "1/2", ["0.5"]),
          hint: "Use the 30-60-90 triangle. The side opposite 30° is 1 and the hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-g2", "Evaluate without a calculator.", "\\cos\\left(\\frac{\\pi}{3}\\right)", "1/2", ["0.5"]),
          hint: "Use the 30-60-90 triangle. The side adjacent to 60° is 1 and the hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-g3", "Evaluate without a calculator.", "\\tan\\left(\\frac{\\pi}{4}\\right)", "1", []),
          hint: "Use the 45-45-90 triangle. Opposite and adjacent are equal, so the ratio is 1.",
        },
        practicalChoice(
          "y11adv-ev-g4",
          "A student writes $\\tan\\!\\left(\\frac{\\pi}{3}\\right)=1$. Identify the error.",
          "C",
          ["$\\tan(\\frac{\\pi}{3})$ is undefined", "$\\tan(\\frac{\\pi}{3})=\\frac{1}{2}$", "$\\tan(\\frac{\\pi}{4})=1$, not $\\tan(\\frac{\\pi}{3})$", "$\\tan(\\frac{\\pi}{3})=\\frac{\\sqrt{2}}{2}$"],
          "tan(π/3) = √3 ≈ 1.73. The value 1 belongs to tan(π/4).",
          "\\tan\\left(\\frac{\\pi}{3}\\right)"
        ),
      ],
      independentPractice: [
        {
          ...formulaAnswer("y11adv-ev-i1", "Evaluate without a calculator.", "\\sin\\left(\\frac{\\pi}{3}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          hint: "From the 30-60-90 triangle, opposite to 60° is √3 and hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-i2", "Evaluate without a calculator.", "\\cos\\left(\\frac{\\pi}{6}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          hint: "From the 30-60-90 triangle, adjacent to 30° is √3 and hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-i3", "Evaluate without a calculator.", "\\tan\\left(\\frac{\\pi}{6}\\right)", "sqrt(3)/3", ["1/sqrt(3)", "\\sqrt{3}/3", "1/√3"]),
          hint: "tan(π/6) = sin(π/6)/cos(π/6). Then rationalise the denominator.",
        },
        {
          ...formulaAnswer("y11adv-ev-i4", "Evaluate without a calculator.", "\\cos\\left(\\frac{\\pi}{4}\\right)", "sqrt(2)/2", ["1/sqrt(2)", "\\sqrt{2}/2", "√2/2"]),
          hint: "From the 45-45-90 triangle, adjacent is 1 and hypotenuse is √2.",
        },
        {
          ...formulaAnswer("y11adv-ev-i5", "Evaluate without a calculator.", "\\sin^2\\!\\left(\\frac{\\pi}{3}\\right)+\\cos^2\\!\\left(\\frac{\\pi}{3}\\right)", "1", []),
          hint: "Substitute the exact values, square them, then add. You should recognise this as the Pythagorean identity.",
        },
      ],
      commonMistakes: [
        { mistake: "Swapping sin(π/6) and sin(π/3) — writing sin(π/3) = 1/2.", fix: "sin(π/3) = √3/2 (larger angle, larger sine). Mnemonic: √1, √2, √3 over 2 for 30°, 45°, 60°." },
        { mistake: "Writing tan(π/4) = √2.", fix: "tan(π/4) = opp/adj = 1/1 = 1 in the 45-45-90 triangle. √2 is the hypotenuse, not the tangent." },
        { mistake: "Leaving tan(π/6) as 1/√3 without rationalising.", fix: "Multiply numerator and denominator by √3: 1/√3 = √3/3." },
        { mistake: "Confusing cos(π/4) = √2 with the correct value √2/2.", fix: "The hypotenuse is √2; dividing the leg 1 by √2 gives 1/√2 = √2/2." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-est-qm1",
          prompt:
            "In a $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle with side ratio $1:\\sqrt3:2$, which quotient gives $\\sin(\\pi/3)$?",
          latex: "\\sin\\left(\\frac{\\pi}{3}\\right)",
          choices: ["$\\dfrac{1}{2}$", "$\\dfrac{\\sqrt3}{2}$", "$\\sqrt3$", "$\\dfrac{2}{\\sqrt3}$"],
          answer: "B",
          hint: "For the 60-degree angle, identify the opposite side and divide it by the hypotenuse.",
          explanation:
            "At the $60^\\circ$ angle, the opposite side has length $\\sqrt3$ and the hypotenuse has length 2. Therefore $\\sin(\\pi/3)=\\text{opposite}/\\text{hypotenuse}=\\sqrt3/2$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks whether the learner derives an exact value from labelled side roles rather than recalling an ungrounded table entry.",
          distractorMisconceptions: {
            A: "Uses the side opposite 30 degrees instead of the side opposite 60 degrees.",
            C: "Forms opposite over adjacent, which is tangent rather than sine.",
            D: "Reverses the sine ratio to hypotenuse over opposite.",
          },
          triangleDiagram: tri3060,
        }),
        qualityAnswer({
          id: "y11adv-est-qm2",
          prompt: "Evaluate exactly without a calculator.",
          latex: "2\\cos\\left(\\frac{\\pi}{6}\\right)-\\sin\\left(\\frac{\\pi}{3}\\right)",
          answer: "sqrt(3)/2",
          acceptedAnswers: ["\\sqrt{3}/2", "√3/2", "$\\frac{\\sqrt3}{2}$"],
          hint: "Substitute both exact values before combining their like radical terms.",
          explanation:
            "Both values come from the 30-60-90 triangle: $\\cos(\\pi/6)=\\sqrt3/2$ and $\\sin(\\pi/3)=\\sqrt3/2$. Hence $2(\\sqrt3/2)-\\sqrt3/2=\\sqrt3/2$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks accurate recall and simplification of a short exact-value expression with like radicals.",
        }),
        qualityChoice({
          id: "y11adv-est-qm3",
          prompt:
            "A student obtains $\\tan(\\pi/6)=1/\\sqrt3$ and then writes $\\tan(\\pi/6)=\\sqrt3$. Which correction is valid?",
          latex: "\\frac{1}{\\sqrt3}",
          choices: [
            "$\\tan(\\pi/6)=\\sqrt3$ because only the numerator changes",
            "$\\tan(\\pi/6)=\\dfrac13$ because the denominator is squared",
            "$\\tan(\\pi/6)=\\dfrac{\\sqrt3}{3}$ because numerator and denominator are multiplied by $\\sqrt3$",
            "$\\tan(\\pi/6)=\\dfrac{\\sqrt2}{2}$ because all special-triangle values have denominator 2",
          ],
          answer: "C",
          hint: "Rationalising must multiply the numerator and denominator by the same non-zero value.",
          explanation:
            "Multiplying both parts of $1/\\sqrt3$ by $\\sqrt3$ gives $\\sqrt3/(\\sqrt3\\cdot\\sqrt3)=\\sqrt3/3$. Changing only the numerator does not preserve the value of the fraction.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses an invalid rationalisation step rather than merely asking for the memorised tangent value.",
          distractorMisconceptions: {
            A: "Changes only the numerator and therefore changes the fraction's value.",
            B: "Squares the denominator without applying the same factor to the numerator.",
            D: "Transfers the 45-degree sine or cosine value to a 30-degree tangent.",
          },
        }),
        qualityAnswer({
          id: "y11adv-est-qm4",
          prompt:
            "Find the real number $a$ that makes the equation true.",
          latex: "a\\sin\\left(\\frac{\\pi}{6}\\right)+\\cos\\left(\\frac{\\pi}{3}\\right)=\\frac52",
          answer: "4",
          acceptedAnswers: ["4.0", "a=4", "$a=4$"],
          hint: "Replace both trigonometric values by one half, then solve the resulting linear equation.",
          explanation:
            "Since $\\sin(\\pi/6)=\\cos(\\pi/3)=1/2$, the equation becomes $a/2+1/2=5/2$. Subtracting $1/2$ gives $a/2=2$, so $a=4$.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks reverse use of exact values inside a simple parameter equation rather than direct evaluation alone.",
        }),
        qualityAnswer({
          id: "y11adv-est-qm5",
          prompt: "Evaluate exactly and simplify fully.",
          latex: "\\frac{\\sin(\\pi/3)-\\cos(\\pi/3)}{\\sin(\\pi/6)+\\cos(\\pi/6)}",
          answer: "2-sqrt(3)",
          acceptedAnswers: ["2-\\sqrt{3}", "2−√3", "$2-\\sqrt3$"],
          hint: "Substitute the four exact values, cancel the common halves, and rationalise the resulting quotient.",
          explanation:
            "Substitution gives $(\\sqrt3-1)/(1+\\sqrt3)$. Multiplying by $(\\sqrt3-1)/(\\sqrt3-1)$ produces $(\\sqrt3-1)^2/(3-1)=(4-2\\sqrt3)/2=2-\\sqrt3$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines four exact values with fraction simplification, conjugate rationalisation, and radical algebra.",
        }),
        qualityChoice({
          id: "y11adv-est-qm6",
          prompt:
            "Mia finds $\\tan(\\pi/6)$ directly from a $30$-$60$-$90$ triangle as $1/\\sqrt3$. Noah uses $\\sin(\\pi/6)/\\cos(\\pi/6)$. Which assessment is correct?",
          latex: "\\frac{1}{\\sqrt3}=\\frac{\\sin(\\pi/6)}{\\cos(\\pi/6)}",
          choices: [
            "Only Mia is correct because tangent cannot be written using sine and cosine",
            "Only Noah is correct because a triangle quotient cannot contain a surd",
            "Both are correct and simplify to $\\dfrac{\\sqrt3}{3}$",
            "Neither is correct because $\\tan(\\pi/6)=1$",
          ],
          answer: "C",
          hint: "Evaluate Noah's quotient and rationalise both representations before comparing them.",
          explanation:
            "Mia has opposite over adjacent, $1/\\sqrt3$. Noah obtains $(1/2)/(\\sqrt3/2)=1/\\sqrt3$. Both are valid and rationalise to $\\sqrt3/3$.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks equivalence of geometric and identity-based derivations instead of privileging one memorised method.",
          distractorMisconceptions: {
            A: "Rejects the valid identity tangent equals sine divided by cosine.",
            B: "Rejects a valid surd ratio from a special triangle.",
            D: "Transfers the 45-degree tangent value to 30 degrees.",
          },
          triangleDiagram: tri3060,
        }),
        qualityAnswer({
          id: "y11adv-est-qm7",
          prompt:
            "A $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle has side lengths $k$, $k\\sqrt3$, and $2k$. Its area is $8\\sqrt3$ square units. Find its exact perimeter.",
          latex: "\\frac12(k)(k\\sqrt3)=8\\sqrt3",
          answer: "12+4sqrt(3)",
          acceptedAnswers: ["12+4\\sqrt{3}", "4sqrt(3)+12", "12+4√3", "$12+4\\sqrt3$"],
          hint: "Use the two perpendicular legs to find the positive scale factor $k$, then add all three sides.",
          explanation:
            "The area equation is $k^2\\sqrt3/2=8\\sqrt3$, so $k^2=16$ and the positive scale is $k=4$. The perimeter is $k+k\\sqrt3+2k=3k+k\\sqrt3=12+4\\sqrt3$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Uses the special-triangle ratio in reverse through area, a square root, and a final perimeter synthesis.",
          triangleDiagram: {
            ...tri3060,
            description:
              "A 30-60-90 right triangle with legs k and k square root three, hypotenuse 2k, and total area eight square root three.",
            sideLabels: { AC: "k", BC: "k\\sqrt3", AB: "2k" },
          },
        }),
        qualityAnswer({
          id: "y11adv-est-qm8",
          prompt:
            "For integers $1\\le n\\le40$, define $E_n=n\\sin(\\pi/6)+\\cos(\\pi/3)$. How many values of $n$ make $E_n$ a positive integer multiple of 5?",
          latex: "E_n=n\\sin\\left(\\frac{\\pi}{6}\\right)+\\cos\\left(\\frac{\\pi}{3}\\right)",
          answer: "4",
          acceptedAnswers: ["4.0", "four", "4 values"],
          hint: "Simplify $E_n$ to $(n+1)/2$, then translate the multiple-of-five condition into a congruence for $n$.",
          explanation:
            "Exact substitution gives $E_n=(n+1)/2$. This is a multiple of 5 when $n+1$ is divisible by 10, so $n\\equiv9\\pmod{10}$. In the stated range the values are $9,19,29,39$, giving 4.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded family to connect exact trigonometric values, integrality, divisibility, and systematic counting.",
        }),
        qualityAnswer({
          id: "y11adv-est-qm9",
          prompt:
            "Two right triangles each have hypotenuse 12. Their chosen acute angles are $\\pi/4$ and $\\pi/6$. Find the exact area of the first triangle minus the area of the second.",
          latex: "A(\\theta)=\\frac12(12\\sin\\theta)(12\\cos\\theta)",
          answer: "36-18sqrt(3)",
          acceptedAnswers: ["36-18\\sqrt{3}", "36−18√3", "18(2-sqrt(3))", "18(2-\\sqrt3)"],
          hint: "For each triangle, express the perpendicular legs as $12\\sin\\theta$ and $12\\cos\\theta$.",
          explanation:
            "The area is $72\\sin\\theta\\cos\\theta$. At $\\pi/4$ this is $72(\\sqrt2/2)^2=36$. At $\\pi/6$ it is $72(1/2)(\\sqrt3/2)=18\\sqrt3$. The requested difference is $36-18\\sqrt3$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Builds and compares two triangle-area models using several exact values and radical simplification.",
          trianglePairDiagram: {
            description:
              "Two right triangles, each with hypotenuse 12; the left has chosen acute angle pi over four and the right has chosen acute angle pi over six.",
            left: {
              ...tri4545,
              description:
                "Right isosceles triangle with hypotenuse 12 and both legs 6 square root two.",
              sideLabels: { AC: "6\\sqrt2", BC: "6\\sqrt2", AB: "12" },
            },
            right: {
              ...tri3060,
              description:
                "30-60-90 right triangle with chosen 30-degree angle, hypotenuse 12, opposite leg 6, and adjacent leg 6 square root three.",
              sideLabels: { AC: "6", BC: "6\\sqrt3", AB: "12" },
            },
            leftCaption: "\\theta=\\frac{\\pi}{4}",
            rightCaption: "\\theta=\\frac{\\pi}{6}",
            relationLabel: "\\text{same hypotenuse}",
          },
        }),
        qualityAnswer({
          id: "y11adv-est-qm10",
          prompt:
            "Real numbers $x$ and $y$ satisfy the system below. Find $xy$.",
          latex: "\\begin{aligned}x\\sin(\\pi/6)+y\\cos(\\pi/6)&=2+\\sqrt3\\\\x\\cos(\\pi/6)-y\\sin(\\pi/6)&=2\\sqrt3-1\\end{aligned}",
          answer: "8",
          acceptedAnswers: ["8.0", "xy=8", "$xy=8$"],
          hint: "Replace the exact trigonometric values first; the resulting two linear equations determine $x$ and $y$.",
          explanation:
            "Substitution gives $x+\\sqrt3y=4+2\\sqrt3$ and $\\sqrt3x-y=4\\sqrt3-2$. Solving yields $x=4$ and $y=2$, so $xy=8$. Substitution back into both original equations verifies the pair.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Integrates exact values with a two-equation algebraic system and requires verification of the inferred parameters.",
        }),
      ],
    };
  }

  if (lesson.slug === "graphing-sin-cos-tan") {
    const sinGraph: import("../types").TrigGraphDiagram = {
      description:
        "The sine curve for 0 ≤ x ≤ 2π starts at the origin, rises to a maximum of 1 at x = π/2, returns to zero at x = π, falls to a minimum of −1 at x = 3π/2, and returns to zero at x = 2π.",
      functionType: "sin",
      equationLabel: "y = sin(x)",
      xMin: "0",
      xMax: "2pi",
      yMin: -1.5,
      yMax: 1.5,
      keyPoints: [
        { x: "0", y: "0", label: "(0, 0)" },
        { x: "pi/2", y: "1", label: "(pi/2, 1)" },
        { x: "pi", y: "0", label: "(pi, 0)" },
        { x: "3pi/2", y: "-1", label: "(3pi/2, -1)" },
        { x: "2pi", y: "0", label: "(2pi, 0)" },
      ],
      periodMarkers: [{ x: "0", label: "0" }, { x: "2pi", label: "2pi" }],
    };
    const cosGraph: import("../types").TrigGraphDiagram = {
      description:
        "The cosine curve for 0 ≤ x ≤ 2π starts at a maximum of 1 when x = 0, falls to zero at x = π/2, reaches a minimum of −1 at x = π, returns to zero at x = 3π/2, and reaches 1 again at x = 2π.",
      functionType: "cos",
      equationLabel: "y = cos(x)",
      xMin: "0",
      xMax: "2pi",
      yMin: -1.5,
      yMax: 1.5,
      keyPoints: [
        { x: "0", y: "1", label: "(0, 1)" },
        { x: "pi/2", y: "0", label: "(pi/2, 0)" },
        { x: "pi", y: "-1", label: "(pi, -1)" },
        { x: "3pi/2", y: "0", label: "(3pi/2, 0)" },
        { x: "2pi", y: "1", label: "(2pi, 1)" },
      ],
      periodMarkers: [{ x: "0", label: "0" }, { x: "2pi", label: "2pi" }],
    };
    const tanGraph: import("../types").TrigGraphDiagram = {
      description:
        "The tangent curve on [0, 2π] has two branches. Each branch passes through zero, rising steeply toward vertical asymptotes at x = π/2 and x = 3π/2. Zeros occur at x = 0, π, and 2π.",
      functionType: "tan",
      equationLabel: "y = tan(x)",
      xMin: "0",
      xMax: "2pi",
      yMin: -3.5,
      yMax: 3.5,
      keyPoints: [
        { x: "0", y: "0", label: "(0, 0)" },
        { x: "pi", y: "0", label: "(pi, 0)" },
        { x: "2pi", y: "0", label: "(2pi, 0)" },
      ],
      asymptotes: [
        { x: "pi/2", label: "x = pi/2" },
        { x: "3pi/2", label: "x = 3pi/2" },
      ],
      periodMarkers: [{ x: "0", label: "0" }, { x: "pi", label: "pi" }, { x: "2pi", label: "2pi" }],
    };
    return {
      ...base,
      description:
        "State and apply the period, range, starting value, zeros, maxima, minima, and asymptotes of y = sin x, y = cos x, and y = tan x.",
      learningIntention:
        "Describe and compare the key features of the three basic trigonometric graphs using radians.",
      successCriteria: [
        "State the period, range, and y-intercept of y = sin x and y = cos x.",
        "State the period, range, and asymptote positions of y = tan x.",
        "Locate zeros, maxima, and minima of y = sin x and y = cos x on [0, 2π].",
        "State where y = tan x is undefined.",
      ],
      teaching: {
        paragraphs: [
          "y = sin x starts at 0, reaches a maximum of 1 at x = π/2, returns to 0 at x = π, reaches a minimum of −1 at x = 3π/2, and completes one period at x = 2π.",
          "y = cos x starts at 1, falls to 0 at x = π/2, reaches a minimum of −1 at x = π, returns to 0 at x = 3π/2, and completes one period at x = 2π.",
          "Both y = sin x and y = cos x have period 2π and range [−1, 1].",
          "y = tan x is defined as sin x / cos x. It is undefined wherever cos x = 0, giving vertical asymptotes at x = π/2 + kπ for any integer k. Its period is π and its range is all real numbers.",
        ],
        latexBlocks: [
          "y=\\sin x:\\quad\\text{period }2\\pi,\\quad\\text{range }[-1,1],\\quad y(0)=0",
          "y=\\cos x:\\quad\\text{period }2\\pi,\\quad\\text{range }[-1,1],\\quad y(0)=1",
          "y=\\tan x:\\quad\\text{period }\\pi,\\quad\\text{range }\\mathbb{R},\\quad\\text{asymptotes }x=\\tfrac{\\pi}{2}+k\\pi",
          "\\text{Zeros of }\\sin x\\text{ on }[0,2\\pi]:\\;x=0,\\,\\pi,\\,2\\pi",
          "\\text{Zeros of }\\cos x\\text{ on }[0,2\\pi]:\\;x=\\tfrac{\\pi}{2},\\,\\tfrac{3\\pi}{2}",
        ],
      },
      workedExamples: [
        {
          title: "Key points of y = sin x on [0, 2π]",
          questionLatex: "y=\\sin x,\\quad 0\\le x\\le 2\\pi",
          trigGraphDiagram: sinGraph,
          steps: [
            { explanation: "The curve starts at the origin.", latex: "(0,0)" },
            { explanation: "Maximum at x = π/2.", latex: "\\left(\\tfrac{\\pi}{2},1\\right)" },
            { explanation: "Zero, minimum, then back to zero.", latex: "(\\pi,0),\\;\\left(\\tfrac{3\\pi}{2},-1\\right),\\;(2\\pi,0)" },
          ],
          finalAnswerLatex: "\\text{Period }2\\pi,\\text{ range }[-1,1],\\;y(0)=0",
        },
        {
          title: "Key features of y = cos x",
          questionLatex: "y=\\cos x",
          trigGraphDiagram: cosGraph,
          steps: [
            { explanation: "Cosine starts at its maximum.", latex: "y(0)=1" },
            { explanation: "Period and range match sine.", latex: "\\text{period }2\\pi,\\quad\\text{range }[-1,1]" },
            { explanation: "Zeros at x = π/2 and x = 3π/2.", latex: "\\cos\\tfrac{\\pi}{2}=0,\\quad\\cos\\tfrac{3\\pi}{2}=0" },
          ],
          finalAnswerLatex: "\\text{Period }2\\pi,\\text{ range }[-1,1],\\;y(0)=1,\\;\\text{zeros at }\\tfrac{\\pi}{2}\\text{ and }\\tfrac{3\\pi}{2}",
        },
        {
          title: "Key features of y = tan x",
          questionLatex: "y=\\tan x",
          trigGraphDiagram: tanGraph,
          steps: [
            { explanation: "Tangent is undefined where cos x = 0.", latex: "\\text{asymptotes: }x=\\tfrac{\\pi}{2},\\;x=\\tfrac{3\\pi}{2}" },
            { explanation: "Period is π (half that of sin and cos).", latex: "\\text{period }=\\pi" },
            { explanation: "Range is all real numbers.", latex: "\\text{range }=\\mathbb{R}" },
          ],
          finalAnswerLatex: "\\text{Period }\\pi,\\text{ range }\\mathbb{R},\\;\\text{asymptotes at }x=\\tfrac{\\pi}{2}+k\\pi",
        },
      ],
      guidedPractice: [
        {
          ...formulaAnswer("y11adv-graph-g1", "State the period of the graph.", "y=\\sin x", "2pi", ["2\\pi", "2π"]),
          hint: "One complete wave of y = sin x takes from x = 0 to x = 2π.",
        },
        practicalChoice(
          "y11adv-graph-g2",
          "Which range is correct for $y=\\cos x$?",
          "A",
          ["$[-1,1]$", "$(0,1]$", "All real numbers", "$[-\\pi,\\pi]$"],
          "Cosine values are bounded between −1 and 1 inclusive.",
          "y=\\cos x"
        ),
        {
          ...formulaAnswer("y11adv-graph-g3", "State the y-intercept of the graph.", "y=\\cos x", "1", []),
          trigGraphDiagram: cosGraph,
          hint: "Read the y-value when x = 0 from the graph.",
        },
        {
          ...formulaAnswer("y11adv-graph-g4", "State the period of the graph.", "y=\\tan x", "pi", ["\\pi", "π"]),
          hint: "Tangent repeats every half turn. Count the distance between identical-looking parts of the curve.",
        },
      ],
      independentPractice: [
        {
          ...formulaAnswer("y11adv-graph-i1", "State the period of the graph.", "y=\\cos x", "2pi", ["2\\pi", "2π"]),
          hint: "Cosine has the same period as sine.",
        },
        practicalChoice(
          "y11adv-graph-i2",
          "Which statement correctly describes $y=\\sin x$?",
          "C",
          ["Starts at 1, period $2\\pi$, range $[-1,1]$", "Starts at 0, period $\\pi$, range $[-1,1]$", "Starts at 0, period $2\\pi$, range $[-1,1]$", "Starts at 0, period $2\\pi$, range all reals"],
          "y = sin x starts at 0 (not 1), has period 2π, and range [−1,1].",
          "y=\\sin x"
        ),
        {
          ...formulaAnswer("y11adv-graph-i3", "State the horizontal distance between consecutive vertical asymptotes.", "y=\\tan x", "pi", ["\\pi", "π"]),
          trigGraphDiagram: tanGraph,
          hint: "Read the distance between two consecutive asymptotes or identical-looking branches.",
        },
        practicalChoice(
          "y11adv-graph-i4",
          "Where does $y=\\cos x$ equal zero on $[0,2\\pi]$?",
          "D",
          ["$x=0$ and $x=\\pi$", "$x=\\pi$ only", "$x=0,\\,\\pi,\\,2\\pi$", "$x=\\tfrac{\\pi}{2}$ and $x=\\tfrac{3\\pi}{2}$"],
          "Cosine is zero at the top and bottom of the unit circle: x = π/2 and x = 3π/2.",
          "y=\\cos x"
        ),
        {
          ...formulaAnswer("y11adv-graph-i5", "State the first positive x-intercept of the graph.", "y=\\sin x", "pi", ["\\pi", "π"]),
          hint: "After x = 0, the sine curve returns to zero at x = π.",
        },
      ],
      commonMistakes: [
        { mistake: "Stating that y = tan x has period 2π.", fix: "Tangent has period π — half that of sine and cosine." },
        { mistake: "Stating that y = tan x has range [−1, 1].", fix: "Tangent has no maximum or minimum; its range is all real numbers." },
        { mistake: "Confusing the starting values: saying y = sin x starts at 1.", fix: "sin(0) = 0; cos(0) = 1. Cosine starts at 1." },
        { mistake: "Locating the zeros of cos x at x = 0 and x = π.", fix: "cos(0) = 1 and cos(π) = −1. Cosine is zero at x = π/2 and x = 3π/2." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-graph-qm1",
          prompt:
            "A parent trigonometric graph passes through the origin, reaches a maximum at $x=\\frac{\\pi}{2}$, and first returns to the $x$-axis at $x=\\pi$. Which function is it?",
          latex: "0\\le x\\le 2\\pi",
          answer: "A",
          choices: [
            "$y=\\sin x$",
            "$y=\\cos x$",
            "$y=\\tan x$",
            "There is not enough information",
          ],
          hint:
            "Compare the starting value and first turning point with the five key points of sine and cosine.",
          explanation:
            "The sine graph starts at $(0,0)$, rises to $(\\frac{\\pi}{2},1)$, and returns to zero at $x=\\pi$. Cosine starts at 1, while tangent has no maximum. Therefore the function is $y=\\sin x$.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks whether the learner can identify a parent graph from a linked set of features rather than from its equation.",
          distractorMisconceptions: {
            B: "Confuses the sine and cosine starting values.",
            C: "Recognises the origin but ignores that tangent has no maximum.",
            D: "Does not combine multiple graph features to identify a unique parent function.",
          },
          trigGraphDiagram: sinGraph,
        }),
        qualityAnswer({
          id: "y11adv-graph-qm2",
          prompt:
            "List every zero of the cosine graph on the closed interval shown.",
          latex: "y=\\cos x,\\qquad 0\\le x\\le 2\\pi",
          answer: "pi/2,3pi/2",
          acceptedAnswers: [
            "3pi/2,pi/2",
            "{pi/2,3pi/2}",
            "\\frac{\\pi}{2},\\frac{3\\pi}{2}",
            "x=pi/2,3pi/2",
          ],
          hint:
            "Zeros are the points where the curve crosses the horizontal axis; check the quarter-turn and three-quarter-turn positions.",
          explanation:
            "The cosine graph crosses the $x$-axis twice in one complete cycle: at $x=\\frac{\\pi}{2}$ and $x=\\frac{3\\pi}{2}$. Both endpoints have cosine value 1, so neither is included.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks accurate extraction of all zeros from a parent cosine graph, including endpoint checking.",
          trigGraphDiagram: cosGraph,
        }),
        qualityChoice({
          id: "y11adv-graph-qm3",
          prompt:
            "A student says the tangent graph is continuous on $[0,2\\pi]$ because it crosses the $x$-axis at $0$, $\\pi$, and $2\\pi$. Which response best diagnoses the claim?",
          latex: "y=\\tan x",
          answer: "C",
          choices: [
            "The claim is correct because every zero joins two branches.",
            "The graph is discontinuous only at $x=\\pi$.",
            "The graph has vertical asymptotes at $x=\\frac{\\pi}{2}$ and $x=\\frac{3\\pi}{2}$.",
            "The graph has endpoints, so continuity cannot be discussed.",
          ],
          hint:
            "Zeros tell you where the graph meets the axis; they do not tell you where the function is undefined.",
          explanation:
            "Since $\\tan x=\\frac{\\sin x}{\\cos x}$, tangent is undefined wherever $\\cos x=0$. On this interval that occurs at $x=\\frac{\\pi}{2}$ and $x=\\frac{3\\pi}{2}$, producing vertical asymptotes and breaking continuity.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests whether the learner distinguishes zeros from undefined points and can use the quotient definition to diagnose discontinuity.",
          distractorMisconceptions: {
            A: "Treats x-intercepts as evidence that separate tangent branches join.",
            B: "Mistakes a tangent zero for an undefined point.",
            D: "Confuses continuity on a closed interval with the existence of endpoints.",
          },
          trigGraphDiagram: tanGraph,
        }),
        qualityAnswer({
          id: "y11adv-graph-qm4",
          prompt:
            "A parent trigonometric function has range $[-1,1]$, satisfies $f(0)=1$, and satisfies $f(\\pi)=-1$. Identify $f(x)$.",
          latex: "f:\\mathbb{R}\\to[-1,1]",
          answer: "cos x",
          acceptedAnswers: ["cos(x)", "y=cos x", "f(x)=cos x", "\\cos x"],
          hint:
            "Use the starting value to separate sine from cosine, then use the bounded range to rule out tangent.",
          explanation:
            "Both sine and cosine have range $[-1,1]$, but only cosine starts at 1. The check $\\cos\\pi=-1$ confirms the second feature, so $f(x)=\\cos x$.",
          difficulty: 3,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires synthesising range and sampled-value information to reconstruct the unique parent function.",
          trigGraphDiagram: cosGraph,
        }),
        qualityAnswer({
          id: "y11adv-graph-qm5",
          prompt:
            "Find every $x$ in the interval for which the sine and cosine parent graphs have the same height.",
          latex: "\\sin x=\\cos x,\\qquad 0\\le x\\le 2\\pi",
          answer: "pi/4,5pi/4",
          acceptedAnswers: [
            "5pi/4,pi/4",
            "{pi/4,5pi/4}",
            "\\frac{\\pi}{4},\\frac{5\\pi}{4}",
            "x=pi/4,5pi/4",
          ],
          hint:
            "Where cosine is nonzero, divide by $\\cos x$ and solve $\\tan x=1$. Then check the points where cosine is zero.",
          explanation:
            "At any solution, $\\cos x\\ne0$, so division gives $\\tan x=1$. The reference angle is $\\frac{\\pi}{4}$ and tangent is positive in quadrants I and III. Hence $x=\\frac{\\pi}{4}$ and $x=\\frac{5\\pi}{4}$. At the two excluded cosine zeros, sine is not zero, so no solution was lost.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks comparison of two parent graphs through an equivalent equation, quadrant reasoning, and validation of a division step.",
        }),
        qualityChoice({
          id: "y11adv-graph-qm6",
          prompt:
            "Jada locates tangent's vertical asymptotes by solving $\\cos x=0$. Minh locates them halfway between consecutive tangent zeros. On $[0,2\\pi]$, whose method is valid?",
          latex: "y=\\tan x",
          answer: "C",
          choices: [
            "Jada only",
            "Minh only",
            "Both methods",
            "Neither method",
          ],
          hint:
            "Compare the zeros $0,\\pi,2\\pi$ with the points where the denominator in $\\tan x=\\frac{\\sin x}{\\cos x}$ vanishes.",
          explanation:
            "Jada's method gives $x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$ because tangent is undefined where cosine is zero. These values are also exactly halfway between the consecutive tangent zeros $0,\\pi,2\\pi$, so Minh's graphical pattern is valid as well.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Assesses whether the learner can reconcile an algebraic definition with a structural pattern in the tangent graph.",
          distractorMisconceptions: {
            A: "Accepts the quotient definition but does not recognise the midpoint pattern.",
            B: "Recognises a graph pattern but rejects the defining quotient.",
            D: "Does not connect tangent zeros, cosine zeros, and vertical asymptotes.",
          },
          trigGraphDiagram: tanGraph,
        }),
        qualityAnswer({
          id: "y11adv-graph-qm7",
          prompt:
            "How many distinct values of $x$ in the interval make at least one of the three parent functions equal to zero?",
          latex: "\\sin x=0\\;\\text{or}\\;\\cos x=0\\;\\text{or}\\;\\tan x=0,\\qquad 0\\le x\\le2\\pi",
          answer: "5",
          acceptedAnswers: ["5 values", "five"],
          hint:
            "Form the union of the three zero sets. Remember that every tangent zero is also a sine zero.",
          explanation:
            "Sine and tangent are zero at $0,\\pi,2\\pi$. Cosine is zero at $\\frac{\\pi}{2},\\frac{3\\pi}{2}$. Combining the sets without double-counting gives five distinct values.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires combining three graph-feature sets while recognising overlap instead of double-counting shared zeros.",
        }),
        qualityAnswer({
          id: "y11adv-graph-qm8",
          prompt:
            "For $x_n=\\frac{n\\pi}{8}$ with integer $0\\le n\\le32$, how many values of $n$ make $\\sin x_n$ and $\\cos x_n$ equal?",
          latex: "\\sin x_n=\\cos x_n",
          answer: "4",
          acceptedAnswers: ["4 values", "four"],
          hint:
            "First solve $\\sin x=\\cos x$ generally, then determine which solutions lie on the stated grid.",
          explanation:
            "Equality occurs when $x=\\frac{\\pi}{4}+k\\pi$. Setting $\\frac{n\\pi}{8}=\\frac{\\pi}{4}+k\\pi$ gives $n=2+8k$. Within $0\\le n\\le32$, the valid indices are $2,10,18,26$, so there are four.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Tests systematic investigation of a finite angular grid using a general intersection pattern and boundary filtering.",
        }),
        qualityAnswer({
          id: "y11adv-graph-qm9",
          prompt:
            "Two oscillating signals are modelled by $s(x)=\\sin x$ and $c(x)=\\cos x$. Find the sum of all times in the interval when the signals have equal values.",
          latex: "0\\le x\\le4\\pi",
          answer: "7pi",
          acceptedAnswers: ["7\\pi", "$7\\pi$", "7 pi"],
          hint:
            "The equality repeats every $\\pi$. List every solution in the interval before adding them.",
          explanation:
            "The signals are equal when $x=\\frac{\\pi}{4}+k\\pi$. In $[0,4\\pi]$ the times are $\\frac{\\pi}{4},\\frac{5\\pi}{4},\\frac{9\\pi}{4},\\frac{13\\pi}{4}$. Their sum is $\\frac{28\\pi}{4}=7\\pi$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires extending a parent-graph intersection pattern over multiple periods and aggregating all valid solutions.",
        }),
        qualityAnswer({
          id: "y11adv-graph-qm10",
          prompt:
            "Find the sum of all $x$-values in the interval for which $|\\sin x|$ and $|\\cos x|$ are equal.",
          latex: "|\\sin x|=|\\cos x|,\\qquad 0\\le x\\le2\\pi",
          answer: "4pi",
          acceptedAnswers: ["4\\pi", "$4\\pi$", "4 pi"],
          hint:
            "Square both sides, or use symmetry to find where the magnitudes are equal in every quadrant.",
          explanation:
            "Squaring gives $\\sin^2x=\\cos^2x$, so $\\tan^2x=1$ at all solutions. In one cycle these are $\\frac{\\pi}{4},\\frac{3\\pi}{4},\\frac{5\\pi}{4},\\frac{7\\pi}{4}$. Their sum is $\\frac{16\\pi}{4}=4\\pi$.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Assesses symmetry, absolute-value interpretation, complete solution enumeration, and exact aggregation across one cycle.",
        }),
      ],
    };
  }

  // ── PHASE 1 v2 SLOTS ────────────────────────────────────────────────────────

  if (lesson.slug === "degrees-and-radians-concept") {
    return {
      ...base,
      description:
        "Understand what a radian is, learn the benchmark radian-degree equivalences, and identify quadrants using radian boundaries.",
      learningIntention:
        "Learn what a radian measures, how the benchmark angles map between degrees and radians, and how to place a radian angle in the correct quadrant.",
      successCriteria: [
        "Explain that a radian is the angle subtended when the arc equals the radius.",
        "State that one full turn equals $2\\pi$ radians.",
        "Recall benchmark equivalences: $0,\\frac{\\pi}{6},\\frac{\\pi}{4},\\frac{\\pi}{3},\\frac{\\pi}{2},\\pi,\\frac{3\\pi}{2},2\\pi$.",
        "Identify the quadrant of an angle given in radians using the boundaries $\\frac{\\pi}{2}$, $\\pi$, $\\frac{3\\pi}{2}$.",
      ],
      teaching: {
        paragraphs: [
          "A radian is defined by placing an arc equal in length to the radius: the angle at the centre is then exactly 1 radian.",
          "Because the full circumference is $2\\pi r$, it takes $2\\pi$ radii to wrap around, so a full turn is $2\\pi$ radians.",
          "The four key benchmarks to memorise: $90^\\circ=\\frac{\\pi}{2}$, $180^\\circ=\\pi$, $270^\\circ=\\frac{3\\pi}{2}$, $360^\\circ=2\\pi$.",
          "To identify the quadrant of an angle $\\theta$ in radians: Q1 if $0<\\theta<\\frac{\\pi}{2}$; Q2 if $\\frac{\\pi}{2}<\\theta<\\pi$; Q3 if $\\pi<\\theta<\\frac{3\\pi}{2}$; Q4 if $\\frac{3\\pi}{2}<\\theta<2\\pi$.",
        ],
        latexBlocks: [
          "360^\\circ=2\\pi,\\quad 180^\\circ=\\pi,\\quad 90^\\circ=\\frac{\\pi}{2},\\quad 270^\\circ=\\frac{3\\pi}{2}",
          "\\frac{\\pi}{6}=30^\\circ,\\quad \\frac{\\pi}{4}=45^\\circ,\\quad \\frac{\\pi}{3}=60^\\circ,\\quad \\frac{2\\pi}{3}=120^\\circ,\\quad \\frac{3\\pi}{4}=135^\\circ,\\quad \\frac{5\\pi}{6}=150^\\circ",
          "\\text{Q1: }0<\\theta<\\tfrac{\\pi}{2},\\quad \\text{Q2: }\\tfrac{\\pi}{2}<\\theta<\\pi,\\quad \\text{Q3: }\\pi<\\theta<\\tfrac{3\\pi}{2},\\quad \\text{Q4: }\\tfrac{3\\pi}{2}<\\theta<2\\pi",
        ],
      },
      workedExamples: [
        {
          title: "Why a full turn equals 2π radians",
          questionLatex: "\\text{Explain why }360^\\circ=2\\pi\\text{ radians.}",
          steps: [
            { explanation: "The circumference of a circle of radius r is 2πr.", latex: "C=2\\pi r" },
            { explanation: "One radian places an arc of length r, so the circle contains 2π such arcs.", latex: "\\text{arcs}=\\frac{2\\pi r}{r}=2\\pi" },
            { explanation: "Each arc subtends 1 radian, so one full turn subtends 2π radians.", latex: "360^\\circ=2\\pi\\text{ radians}" },
          ],
          finalAnswerLatex: "360^\\circ=2\\pi\\text{ radians}",
          sectorDiagram: {
            description:
              "A full circle of radius r with circumference 2 pi r, showing that the boundary contains 2 pi consecutive radius-length arcs and therefore subtends 2 pi radians.",
            angleDegrees: 360,
            radiusLabel: "r",
            angleLabel: "2\\pi\\text{ radians}",
            arcLabel: "2\\pi r",
            showFullCircle: true,
          },
        },
        {
          title: "Recall benchmark angles",
          questionLatex: "\\text{State the radian equivalents of }90^\\circ,\\ 180^\\circ,\\ 270^\\circ,\\ 360^\\circ.",
          steps: [
            { explanation: "Divide 2π into four equal parts for each quarter turn.", latex: "90^\\circ=\\frac{2\\pi}{4}=\\frac{\\pi}{2}" },
            { explanation: "Two quarter turns is a half turn.", latex: "180^\\circ=\\frac{2\\pi}{2}=\\pi" },
            { explanation: "Three quarter turns.", latex: "270^\\circ=\\frac{3\\times2\\pi}{4}=\\frac{3\\pi}{2}" },
            { explanation: "A full turn.", latex: "360^\\circ=2\\pi" },
          ],
          finalAnswerLatex: "\\frac{\\pi}{2},\\ \\pi,\\ \\frac{3\\pi}{2},\\ 2\\pi",
        },
        {
          title: "Identify the quadrant of a radian angle",
          questionLatex: "\\frac{7\\pi}{4}",
          steps: [
            { explanation: "Compare with the quadrant boundaries.", latex: "\\frac{3\\pi}{2}<\\frac{7\\pi}{4}<2\\pi" },
            { explanation: "Convert boundaries to check: 3π/2 = 1.5π, 7π/4 = 1.75π, 2π = 2π.", latex: "1.5\\pi<1.75\\pi<2\\pi\\quad\\checkmark" },
            { explanation: "The angle lies in the fourth quadrant.", latex: "\\text{Quadrant IV}" },
          ],
          finalAnswerLatex: "\\text{Quadrant IV}",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-rcon-g1", "Which quadrant contains the angle?", "A", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between 0 and a right angle.", "\\frac{\\pi}{3}"),
        formulaAnswer("y11adv-rcon-g2", "State the degree equivalent of the angle.", "\\frac{\\pi}{6}", "30", ["30 degrees", "30°"]),
        practicalChoice("y11adv-rcon-g3", "Which quadrant contains the angle?", "B", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a right angle and a half turn.", "\\frac{2\\pi}{3}"),
        formulaAnswer("y11adv-rcon-g4", "State the degree equivalent of the angle.", "\\frac{3\\pi}{2}", "270", ["270 degrees", "270°"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-rcon-i1", "State the degree equivalent of the angle.", "\\frac{\\pi}{4}", "45", ["45 degrees", "45°"]),
        practicalChoice("y11adv-rcon-i2", "Which quadrant contains the angle?", "C", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a half turn and three quarter turns.", "\\frac{5\\pi}{4}"),
        formulaAnswer("y11adv-rcon-i3", "State the degree equivalent of the angle.", "2\\pi", "360", ["360 degrees", "360°"]),
        practicalChoice("y11adv-rcon-i4", "How many radians are in a half turn?", "A", ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$\\frac{3\\pi}{2}$"], "A full turn is $2\\pi$ radians, so a half turn is half of that measure: $\\tfrac12(2\\pi)=\\pi$ radians. This is the same angle as $180^\\circ$.", "\\text{half turn}"),
        practicalChoice("y11adv-rcon-i5", "Which quadrant contains the angle?", "D", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between three quarter turns and a full turn.", "\\frac{5\\pi}{3}"),
      ],
      commonMistakes: [
        { mistake: "Saying 360° = π instead of 2π.", fix: "A full turn equals 2π radians; a half turn equals π." },
        { mistake: "Confusing quadrant boundaries — placing 2π/3 in Q1.", fix: "Check: 2π/3 ≈ 2.09 > π/2 ≈ 1.57, so it is in Q2." },
        { mistake: "Treating radian values like degree values without conversion.", fix: "Use the benchmark table to cross-check before computing." },
        { mistake: "Forgetting that π/6 = 30°, not 60°.", fix: "π/6 is the smallest common benchmark; π/3 = 60° is twice as large." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-rcon-qm1",
          prompt:
            "On one circle, an arc of length 4 cm is cut from radius 4 cm. On another, an arc of length 10 cm is cut from radius 10 cm. Which statement about the central angles is correct?",
          latex: "\\theta=\\frac{s}{r}",
          choices: [
            "Both central angles measure $1$ radian",
            "The central angles measure $4$ and $10$ radians",
            "The central angles measure $\\tfrac14$ and $\\tfrac1{10}$ radians",
            "The larger circle has the larger central angle",
          ],
          answer: "A",
          hint: "Compare the ratio of subtended arc to radius in each case.",
          explanation:
            "Radian measure is the ratio $\\theta=s/r$. For the first circle, $\\theta=4/4=1$; for the second, $\\theta=10/10=1$. Equal arc-to-radius ratios produce equal central angles even though the circles and arcs have different sizes.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks whether students understand a radian as a dimensionless arc-to-radius ratio rather than a fixed length.",
          distractorMisconceptions: {
            B: "Uses arc length directly as the angle and ignores radius.",
            C: "Inverts the radian ratio to use radius divided by arc.",
            D: "Assumes a larger radius automatically creates a larger angle.",
          },
        }),
        qualityAnswer({
          id: "y11adv-rcon-qm2",
          prompt:
            "Find the smallest positive angle coterminal with $\\dfrac{13\\pi}{6}$.",
          latex: "\\theta=\\frac{13\\pi}{6}",
          answer: "pi/6",
          acceptedAnswers: ["\\pi/6", "$\\frac{\\pi}{6}$", "π/6"],
          hint: "Remove one full turn, written with denominator 6.",
          explanation:
            "One full turn is $2\\pi=12\\pi/6$. Subtracting it does not change the terminal ray: $13\\pi/6-12\\pi/6=\\pi/6$. This result is positive and below $2\\pi$, so it is the smallest positive coterminal angle.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks whether students use full turns to reduce an angle instead of treating its unreduced numerator as a quadrant label.",
        }),
        qualityChoice({
          id: "y11adv-rcon-qm3",
          prompt: "Which quadrant contains $\\dfrac{5\\pi}{8}$?",
          latex: "\\theta=\\frac{5\\pi}{8}",
          choices: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
          answer: "B",
          hint: "Express the nearest quadrant boundaries with denominator 8.",
          explanation:
            "A right angle is $\\pi/2=4\\pi/8$ and a half turn is $\\pi=8\\pi/8$. Since $4\\pi/8<5\\pi/8<8\\pi/8$, the terminal ray lies strictly between the positive $y$-axis and negative $x$-axis, in Quadrant II.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks exact fraction comparison against quadrant boundaries without relying on decimal conversion.",
          distractorMisconceptions: {
            A: "Compares only the numerator with the denominator and places the angle before a right angle.",
            C: "Treats $\\pi/2$ as the start of Quadrant III rather than Quadrant II.",
            D: "Reads the fraction as being close to a full turn.",
          },
        }),
        qualityAnswer({
          id: "y11adv-rcon-qm4",
          prompt:
            "A shaft rotates through $\\dfrac{17\\pi}{4}$ radians and then stops. How many full revolutions has it completed before reaching its final position?",
          latex: "\\theta=\\frac{17\\pi}{4}",
          answer: "2",
          acceptedAnswers: ["2.0", "two", "2 full revolutions"],
          hint: "Write one full revolution with denominator 4 and separate the remainder.",
          explanation:
            "One revolution is $2\\pi=8\\pi/4$. Dividing $17\\pi/4$ into full turns gives $17\\pi/4=2(8\\pi/4)+\\pi/4$. The shaft therefore completes 2 full revolutions and then continues through another $\\pi/4$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Distinguishes the number of completed revolutions from the non-integer total number of turns.",
        }),
        qualityAnswer({
          id: "y11adv-rcon-qm5",
          prompt:
            "An arc of length 12 cm on a circle of radius 8 cm subtends the same central angle as an arc of length 21 cm on a second circle. Find the second circle's radius in centimetres.",
          latex: "\\frac{12}{8}=\\frac{21}{R}",
          answer: "14",
          acceptedAnswers: ["14.0", "14 cm", "R=14"],
          hint: "Equal central angles mean equal arc-to-radius ratios.",
          explanation:
            "The first central angle is $12/8=3/2$ radians. For the second circle, $21/R=3/2$. Cross-multiplying gives $42=3R$, so $R=14$ cm. The arc is longer because the radius is larger, while the angle remains unchanged.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests transfer of the radian definition to infer an unknown radius from equal central angles.",
        }),
        qualityChoice({
          id: "y11adv-rcon-qm6",
          prompt:
            "A student places $\\dfrac{11\\pi}{8}$ in Quadrant II because it is less than $2\\pi$. Which response correctly diagnoses the claim?",
          latex: "\\theta=\\frac{11\\pi}{8}",
          choices: [
            "It is in Quadrant I because $11<16$",
            "It is in Quadrant II because every angle below $2\\pi$ is in the upper half-plane",
            "It is in Quadrant III because $\\pi<\\tfrac{11\\pi}{8}<\\tfrac{3\\pi}{2}$",
            "It is in Quadrant IV because it is greater than $\\pi$",
          ],
          answer: "C",
          hint: "Being below one full turn is not enough; compare with both adjacent boundaries.",
          explanation:
            "Using denominator 8, the relevant boundaries are $\\pi=8\\pi/8$ and $3\\pi/2=12\\pi/8$. Since $8\\pi/8<11\\pi/8<12\\pi/8$, the angle lies in Quadrant III. The student's comparison with $2\\pi$ only locates it somewhere before a full turn.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses the misconception that comparison with a full turn alone determines the quadrant.",
          distractorMisconceptions: {
            A: "Compares bare numerator and denominator without using angular boundaries.",
            B: "Treats the entire interval from zero to a full turn as the upper half-plane.",
            D: "Uses only the lower boundary $\\pi$ and ignores the upper boundary.",
          },
        }),
        qualityAnswer({
          id: "y11adv-rcon-qm7",
          prompt:
            "Starting on the positive $x$-axis, a pointer rotates $\\dfrac{19\\pi}{6}$ counterclockwise and then $\\dfrac{5\\pi}{3}$ clockwise. On which axis does it finish?",
          latex: "\\frac{19\\pi}{6}-\\frac{5\\pi}{3}",
          answer: "negative y-axis",
          acceptedAnswers: [
            "the negative y-axis",
            "-y-axis",
            "negative y axis",
            "at 3pi/2",
          ],
          hint: "Treat clockwise rotation as negative, combine the angles, then identify the boundary.",
          explanation:
            "The net rotation is $19\\pi/6-5\\pi/3=19\\pi/6-10\\pi/6=9\\pi/6=3\\pi/2$. An angle of $3\\pi/2$ terminates on the negative $y$-axis, so it is on a boundary rather than inside Quadrant III or IV.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Checks signed combination of rotations and recognition that quadrant boundaries are not quadrants.",
        }),
        qualityAnswer({
          id: "y11adv-rcon-qm8",
          prompt:
            "For integers $0\\le n\\le11$, let $\\theta_n=\\dfrac{(2n+1)\\pi}{6}$. How many of these twelve angles have terminal rays in Quadrant II?",
          latex: "\\theta_n=\\frac{(2n+1)\\pi}{6},\\qquad 0\\le n\\le11",
          answer: "2",
          acceptedAnswers: ["2.0", "two", "2 angles"],
          hint: "Solve the Quadrant II inequality for one turn, then account for the repeated second turn.",
          explanation:
            "Quadrant II requires $\\pi/2<\\theta_n<\\pi$. In the first turn this gives $3<2n+1<6$, so $n=2$ and $\\theta_2=5\\pi/6$. The list spans two full turns, and $n=8$ gives the coterminal angle $17\\pi/6$. Therefore exactly 2 listed angles finish in Quadrant II.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded family to test systematic case analysis, periodicity, and exclusion of axis boundaries.",
        }),
        qualityAnswer({
          id: "y11adv-rcon-qm9",
          prompt:
            "Two externally touching wheels roll without slipping. A wheel of radius 4 cm turns $\\dfrac{13\\pi}{4}$ counterclockwise. A wheel of radius 5 cm starts on the positive $x$-axis and turns through the same contact distance in the opposite direction. In which quadrant does its marker finish?",
          latex: "4\\left(\\frac{13\\pi}{4}\\right)=5\\lvert\\phi\\rvert",
          answer: "Quadrant III",
          acceptedAnswers: ["III", "Q3", "quadrant 3", "third quadrant"],
          hint: "Equal contact distances give $r_1|\\theta_1|=r_2|\\theta_2|$; then reduce the signed angle.",
          explanation:
            "The contact distance is $4(13\\pi/4)=13\\pi$ cm, so the second wheel turns through magnitude $13\\pi/5$. Its direction is clockwise, giving $\\phi=-13\\pi/5$. Adding two full turns gives the coterminal angle $-13\\pi/5+20\\pi/5=7\\pi/5$, which lies in Quadrant III.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Transfers radian measure into a linked-rotation model requiring scale, direction, coterminality, and quadrant reasoning.",
        }),
        qualityAnswer({
          id: "y11adv-rcon-qm10",
          prompt:
            "An angle $\\theta$ satisfies $0<\\theta<2\\pi$ and lies in Quadrant IV. If $2\\theta$ is coterminal with $\\dfrac{5\\pi}{3}$, find $\\theta$.",
          latex: "2\\theta=\\frac{5\\pi}{3}+2k\\pi",
          answer: "11pi/6",
          acceptedAnswers: [
            "11\\pi/6",
            "$\\frac{11\\pi}{6}$",
            "11π/6",
          ],
          hint: "List the solutions produced by full-turn adjustments, then use the quadrant condition.",
          explanation:
            "Coterminality gives $2\\theta=5\\pi/3+2k\\pi$, so $\\theta=5\\pi/6+k\\pi$. Within $0<\\theta<2\\pi$, the possibilities are $5\\pi/6$ and $11\\pi/6$. The first is in Quadrant II, while $11\\pi/6$ is in Quadrant IV. Hence $\\theta=11\\pi/6$.",
          difficulty: 5,
          taskType: "problem-solving",
          diagnosticIntent:
            "Requires generating all bounded coterminal solutions and using a quadrant constraint to select the valid angle.",
        }),
      ],
    };
  }

  if (lesson.slug === "converting-degrees-radians") {
    return {
      ...base,
      description:
        "Multiply by π/180 to convert any degree measure to an exact radian fraction and simplify by cancelling common factors.",
      learningIntention:
        "Apply the degree-to-radian conversion rule and simplify the resulting fraction by cancelling the highest common factor.",
      successCriteria: [
        "State the rule: multiply degrees by $\\frac{\\pi}{180}$.",
        "Cancel common factors to express the result as a simplified fraction of $\\pi$.",
        "Convert any of the common angles: 30°, 45°, 60°, 90°, 120°, 135°, 150°, 180°, 210°, 225°, 240°, 270°, 300°, 315°, 330°, 360°.",
      ],
      teaching: {
        paragraphs: [
          "To convert degrees to radians, multiply by the factor $\\frac{\\pi}{180}$.",
          "Simplify the fraction by finding the highest common factor (HCF) of the degree value and 180, then cancel.",
          "For 45°: HCF(45, 180) = 45, so $45\\times\\frac{\\pi}{180}=\\frac{45\\pi}{180}=\\frac{\\pi}{4}$.",
          "For 150°: HCF(150, 180) = 30, so $150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}$.",
        ],
        latexBlocks: [
          "\\theta^\\circ\\longrightarrow\\theta^\\circ\\times\\frac{\\pi}{180}",
          "45^\\circ=\\frac{\\pi}{4},\\quad 60^\\circ=\\frac{\\pi}{3},\\quad 90^\\circ=\\frac{\\pi}{2},\\quad 120^\\circ=\\frac{2\\pi}{3},\\quad 135^\\circ=\\frac{3\\pi}{4}",
          "150^\\circ=\\frac{5\\pi}{6},\\quad 180^\\circ=\\pi,\\quad 210^\\circ=\\frac{7\\pi}{6},\\quad 225^\\circ=\\frac{5\\pi}{4},\\quad 270^\\circ=\\frac{3\\pi}{2}",
          "240^\\circ=\\frac{4\\pi}{3},\\quad 300^\\circ=\\frac{5\\pi}{3},\\quad 315^\\circ=\\frac{7\\pi}{4},\\quad 330^\\circ=\\frac{11\\pi}{6},\\quad 360^\\circ=2\\pi",
        ],
      },
      workedExamples: [
        {
          title: "Convert 120° to radians",
          questionLatex: "120^\\circ",
          steps: [
            { explanation: "Multiply by the conversion factor.", latex: "120^\\circ\\times\\frac{\\pi}{180}" },
            { explanation: "Find HCF(120, 180) = 60 and cancel.", latex: "\\frac{120\\pi}{180}=\\frac{2\\pi}{3}" },
          ],
          finalAnswerLatex: "\\frac{2\\pi}{3}",
          sectorDiagram: {
            description:
              "A circle sector with central angle 120 degrees, equivalently two pi over three radians, showing an arc of length two pi r over three on radius r.",
            angleDegrees: 120,
            radiusLabel: "r",
            angleLabel: "120^\\circ=\\frac{2\\pi}{3}",
            arcLabel: "\\frac{2\\pi r}{3}",
            showFullCircle: true,
          },
        },
        {
          title: "Convert 225° to radians",
          questionLatex: "225^\\circ",
          steps: [
            { explanation: "Multiply by the conversion factor.", latex: "225^\\circ\\times\\frac{\\pi}{180}" },
            { explanation: "Find HCF(225, 180) = 45 and cancel.", latex: "\\frac{225\\pi}{180}=\\frac{5\\pi}{4}" },
          ],
          finalAnswerLatex: "\\frac{5\\pi}{4}",
        },
        {
          title: "Convert 210° to radians",
          questionLatex: "210^\\circ",
          steps: [
            { explanation: "Multiply by the conversion factor.", latex: "210^\\circ\\times\\frac{\\pi}{180}" },
            { explanation: "Find HCF(210, 180) = 30 and cancel.", latex: "\\frac{210\\pi}{180}=\\frac{7\\pi}{6}" },
          ],
          finalAnswerLatex: "\\frac{7\\pi}{6}",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-d2r-g1", "Convert the angle to radians.", "45^\\circ", "pi/4", ["\\pi/4", "π/4"]),
        formulaAnswer("y11adv-d2r-g2", "Convert the angle to radians.", "90^\\circ", "pi/2", ["\\pi/2", "π/2"]),
        formulaAnswer("y11adv-d2r-g3", "Convert the angle to radians.", "60^\\circ", "pi/3", ["\\pi/3", "π/3"]),
        formulaAnswer("y11adv-d2r-g4", "Convert the angle to radians.", "180^\\circ", "pi", ["\\pi", "π"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-d2r-i1", "Convert the angle to radians.", "150^\\circ", "5pi/6", ["5\\pi/6", "5π/6"]),
        formulaAnswer("y11adv-d2r-i2", "Convert the angle to radians.", "240^\\circ", "4pi/3", ["4\\pi/3", "4π/3"]),
        formulaAnswer("y11adv-d2r-i3", "Convert the angle to radians.", "315^\\circ", "7pi/4", ["7\\pi/4", "7π/4"]),
        formulaAnswer("y11adv-d2r-i4", "Convert the angle to radians.", "270^\\circ", "3pi/2", ["3\\pi/2", "3π/2"]),
        formulaAnswer("y11adv-d2r-i5", "Convert the angle to radians.", "330^\\circ", "11pi/6", ["11\\pi/6", "11π/6"]),
      ],
      commonMistakes: [
        { mistake: "Multiplying by 180/π instead of π/180 when converting from degrees.", fix: "Degrees × π/180 gives radians; radians × 180/π gives degrees." },
        { mistake: "Forgetting to simplify the fraction — leaving 60π/180 instead of π/3.", fix: "Always cancel the HCF of the degree number and 180." },
        { mistake: "Confusing the conversion for 30° and 60°.", fix: "30° = π/6 (smallest); 60° = π/3 (double). Check: 30 × π/180 = π/6." },
        { mistake: "Giving a decimal answer instead of an exact fraction.", fix: "Keep π in the answer; only compute a decimal if asked." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-d2r-qm1",
          prompt: "Which exact radian measure is equivalent to $-150^\\circ$?",
          latex: "-150^\\circ\\times\\frac{\\pi}{180}",
          choices: [
            "$-\\dfrac{5\\pi}{6}$",
            "$\\dfrac{5\\pi}{6}$",
            "$-\\dfrac{6\\pi}{5}$",
            "$-\\dfrac{5\\pi}{3}$",
          ],
          answer: "A",
          hint: "Preserve the direction sign and simplify $150/180$.",
          explanation:
            "Multiply by $\\pi/180$: $-150^\\circ\\times\\pi/180=-150\\pi/180$. Dividing numerator and denominator by 30 gives $-5\\pi/6$. The negative sign remains because the original rotation is clockwise.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks whether students preserve a negative rotation and simplify the degree-to-radian ratio in the correct orientation.",
          distractorMisconceptions: {
            B: "Drops the clockwise direction sign during conversion.",
            C: "Inverts the simplified fraction.",
            D: "Uses 90 rather than 180 in the conversion denominator.",
          },
        }),
        qualityAnswer({
          id: "y11adv-d2r-qm2",
          prompt: "Convert $72^\\circ$ to an exact radian measure.",
          latex: "72^\\circ",
          answer: "2pi/5",
          acceptedAnswers: ["2\\pi/5", "$\\frac{2\\pi}{5}$", "2π/5"],
          hint: "Multiply by $\\pi/180$ and divide 72 and 180 by their highest common factor.",
          explanation:
            "The conversion is $72\\pi/180$. The highest common factor of 72 and 180 is 36, so $72/180=2/5$. Therefore $72^\\circ=2\\pi/5$ radians in simplified exact form.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks accurate use of the conversion factor and simplification for a non-standard benchmark angle.",
        }),
        qualityChoice({
          id: "y11adv-d2r-qm3",
          prompt:
            "A student converts $140^\\circ$ to $\\dfrac{7\\pi}{8}$ after saying they divided both 140 and 180 by 20. Which correction identifies the error?",
          latex: "\\frac{140\\pi}{180}",
          choices: [
            "The denominator is 9 because $180\\div20=9$, so the result is $\\dfrac{7\\pi}{9}$",
            "The numerator is 6 because $140\\div20=6$",
            "The conversion factor should have been $\\dfrac{180}{\\pi}$",
            "The fraction should be replaced by a decimal radian value",
          ],
          answer: "A",
          hint: "Check both divisions in the student's claimed cancellation.",
          explanation:
            "Multiplying by $\\pi/180$ is correct, and 20 is the highest common factor. However, $180\\div20=9$, not 8, while $140\\div20=7$. The correctly simplified exact result is therefore $7\\pi/9$.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses an arithmetic cancellation error without misidentifying the conversion method itself.",
          distractorMisconceptions: {
            B: "Makes a second division error in the numerator.",
            C: "Uses the radians-to-degrees factor for a degree input.",
            D: "Assumes an exact pi fraction is less valid than a decimal.",
          },
        }),
        qualityAnswer({
          id: "y11adv-d2r-qm4",
          prompt:
            "Convert the unreduced rotation $495^\\circ$ to an exact radian measure. Do not replace it by a coterminal angle.",
          latex: "495^\\circ",
          answer: "11pi/4",
          acceptedAnswers: ["11\\pi/4", "$\\frac{11\\pi}{4}$", "11π/4"],
          hint: "Convert the complete stated rotation, including the part beyond one full turn.",
          explanation:
            "Using the full rotation gives $495\\pi/180$. The highest common factor of 495 and 180 is 45, so the fraction simplifies to $11\\pi/4$. Reducing to a coterminal angle would change the stated amount of rotation.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Distinguishes conversion of a rotation's full measure from reduction to a coterminal terminal angle.",
        }),
        qualityAnswer({
          id: "y11adv-d2r-qm5",
          prompt:
            "An integer angle $d^\\circ$ converts exactly to $\\dfrac{7\\pi}{15}$ radians. Find $d$.",
          latex: "\\frac{d\\pi}{180}=\\frac{7\\pi}{15}",
          answer: "84",
          acceptedAnswers: ["84.0", "84 degrees", "84°", "d=84"],
          hint: "Equate the degree-to-radian expression with the supplied exact fraction and cancel $\\pi$.",
          explanation:
            "The conversion rule gives $d\\pi/180=7\\pi/15$. Cancelling $\\pi$ and multiplying by 180 gives $d=180(7/15)$. Since $180/15=12$, $d=12\\times7=84^\\circ$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests reverse inference from an exact radian fraction while preserving the structure of the conversion rule.",
        }),
        qualityChoice({
          id: "y11adv-d2r-qm6",
          prompt:
            "Mina converts $210^\\circ$ by simplifying $210\\pi/180$ to $7\\pi/6$. Ravi writes $210^\\circ=180^\\circ+30^\\circ$ and obtains $\\pi+\\pi/6=7\\pi/6$. Which evaluation is correct?",
          latex: "210^\\circ",
          choices: [
            "Only Mina is correct because splitting an angle changes its measure",
            "Only Ravi is correct because the conversion factor cannot be used above $180^\\circ$",
            "Both are correct; they use equivalent multiplicative and additive reasoning",
            "Neither is correct because a radian answer must be a decimal",
          ],
          answer: "C",
          hint: "Check whether degree and radian measures both preserve angle addition.",
          explanation:
            "Mina correctly applies $\\pi/180$ and simplifies by 30. Ravi also uses valid angle addition: $180^\\circ$ becomes $\\pi$ and $30^\\circ$ becomes $\\pi/6$. Both methods give the same exact measure $7\\pi/6$.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks whether students can compare two valid representations rather than assuming there is only one acceptable method.",
          distractorMisconceptions: {
            A: "Rejects the additive structure of angle measure.",
            B: "Invents a range restriction on the conversion factor.",
            D: "Treats exact radian form as invalid unless decimalised.",
          },
        }),
        qualityAnswer({
          id: "y11adv-d2r-qm7",
          prompt:
            "A platform rotates $735^\\circ$ counterclockwise and then $210^\\circ$ clockwise. Express its net signed rotation in exact radians.",
          latex: "735^\\circ-210^\\circ",
          answer: "35pi/12",
          acceptedAnswers: ["35\\pi/12", "$\\frac{35\\pi}{12}$", "35π/12"],
          hint: "Combine the signed degree rotations before converting the resulting measure.",
          explanation:
            "Clockwise rotation is negative, so the net angle is $735^\\circ-210^\\circ=525^\\circ$. Converting gives $525\\pi/180$. Dividing numerator and denominator by 15 produces the exact result $35\\pi/12$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines signed rotational reasoning with exact conversion and simplification beyond one full turn.",
        }),
        qualityAnswer({
          id: "y11adv-d2r-qm8",
          prompt:
            "For integers $1\\le n\\le24$, convert $15n^\\circ$ to radians and simplify. For how many values of $n$ does the coefficient of $\\pi$ have denominator 4?",
          latex: "15n^\\circ=\\frac{n\\pi}{12}",
          answer: "4",
          acceptedAnswers: ["4.0", "four", "4 values"],
          hint: "The reduced denominator of $n/12$ is 4 exactly when the common factor with 12 is 3.",
          explanation:
            "Since $15n^\\circ=n\\pi/12$, the reduced denominator is $12/\\gcd(n,12)$. It equals 4 when $\\gcd(n,12)=3$. Between 1 and 24 this occurs for $n=3,9,15,21$, so there are 4 values.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded family to connect exact conversion, fraction reduction, divisibility, and systematic case counting.",
        }),
        qualityAnswer({
          id: "y11adv-d2r-qm9",
          prompt:
            "A point on the end of an 8 cm rotating arm moves $150^\\circ$ counterclockwise, then $75^\\circ$ clockwise along the same circular path. Find the exact total distance travelled by the point.",
          latex: "s=r\\theta",
          answer: "10pi",
          acceptedAnswers: ["10\\pi", "10π", "10 pi", "10π cm", "10 pi cm"],
          hint: "Total distance adds both travelled angle magnitudes; it is not based on the net rotation.",
          explanation:
            "The point travels through a total angular distance of $150^\\circ+75^\\circ=225^\\circ$, despite the direction change. Converting gives $225^\\circ=5\\pi/4$. Hence $s=r\\theta=8(5\\pi/4)=10\\pi$ cm.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Transfers degree conversion into arc length while distinguishing total path distance from net angular displacement.",
        }),
        qualityAnswer({
          id: "y11adv-d2r-qm10",
          prompt:
            "A faulty converter multiplies a positive degree angle $x^\\circ$ by $\\pi/200$ instead of $\\pi/180$. For $0<x\\le360$, the faulty result is exactly $\\pi/12$ less than the correct result. Find $x$.",
          latex: "\\frac{x\\pi}{180}-\\frac{x\\pi}{200}=\\frac{\\pi}{12}",
          answer: "150",
          acceptedAnswers: ["150.0", "150 degrees", "150°", "x=150"],
          hint: "Model the difference between the two conversion factors, then cancel $\\pi$.",
          explanation:
            "The difference is $x\\pi(1/180-1/200)=x\\pi/1800$. Setting this equal to $\\pi/12$ and cancelling $\\pi$ gives $x/1800=1/12$. Therefore $x=150^\\circ$, which lies in the stated interval.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires constructing and solving an error model from competing conversion factors rather than performing a direct conversion.",
        }),
      ],
    };
  }

  if (lesson.slug === "converting-radians-degrees") {
    return {
      ...base,
      description:
        "Multiply by 180/π to convert any radian measure to degrees — the π factors cancel, leaving a whole-number multiple to compute.",
      learningIntention:
        "Apply the radian-to-degree conversion rule, cancel π from the fraction, and obtain the degree value.",
      successCriteria: [
        "State the rule: multiply radians by $\\frac{180}{\\pi}$.",
        "Cancel the $\\pi$ factors and simplify to obtain a pure degree value.",
        "Convert any standard radian fraction back to degrees.",
      ],
      teaching: {
        paragraphs: [
          "To convert radians to degrees, multiply by $\\frac{180}{\\pi}$.",
          "The $\\pi$ in the radian measure and the $\\pi$ in the denominator cancel, leaving $\\frac{n\\times 180}{d}$ where the original angle was $\\frac{n\\pi}{d}$.",
          "For $\\frac{\\pi}{3}$: $\\frac{\\pi}{3}\\times\\frac{180}{\\pi}=\\frac{180}{3}=60^\\circ$.",
          "For $\\frac{5\\pi}{6}$: $\\frac{5\\pi}{6}\\times\\frac{180}{\\pi}=5\\times 30=150^\\circ$.",
        ],
        latexBlocks: [
          "\\theta\\text{ rad}\\longrightarrow\\theta\\times\\frac{180}{\\pi}",
          "\\frac{\\pi}{6}=30^\\circ,\\quad \\frac{\\pi}{4}=45^\\circ,\\quad \\frac{\\pi}{3}=60^\\circ,\\quad \\frac{\\pi}{2}=90^\\circ,\\quad \\frac{2\\pi}{3}=120^\\circ",
          "\\frac{3\\pi}{4}=135^\\circ,\\quad \\frac{5\\pi}{6}=150^\\circ,\\quad \\pi=180^\\circ,\\quad \\frac{7\\pi}{6}=210^\\circ,\\quad \\frac{5\\pi}{4}=225^\\circ",
          "\\frac{4\\pi}{3}=240^\\circ,\\quad \\frac{3\\pi}{2}=270^\\circ,\\quad \\frac{5\\pi}{3}=300^\\circ,\\quad \\frac{7\\pi}{4}=315^\\circ,\\quad \\frac{11\\pi}{6}=330^\\circ",
        ],
      },
      workedExamples: [
        {
          title: "Convert 2π/3 to degrees",
          questionLatex: "\\frac{2\\pi}{3}",
          steps: [
            { explanation: "Multiply by the conversion factor.", latex: "\\frac{2\\pi}{3}\\times\\frac{180}{\\pi}" },
            { explanation: "Cancel the π factors.", latex: "\\frac{2\\times180}{3}" },
            { explanation: "Simplify.", latex: "=\\frac{360}{3}=120^\\circ" },
          ],
          finalAnswerLatex: "120^\\circ",
          sectorDiagram: {
            description:
              "A circle sector showing the same central angle labelled both two pi over three radians and 120 degrees, with a radius r and matching arc.",
            angleDegrees: 120,
            radiusLabel: "r",
            angleLabel: "\\frac{2\\pi}{3}=120^\\circ",
            arcLabel: "\\frac{2\\pi r}{3}",
            showFullCircle: true,
          },
        },
        {
          title: "Convert 5π/4 to degrees",
          questionLatex: "\\frac{5\\pi}{4}",
          steps: [
            { explanation: "Multiply by the conversion factor.", latex: "\\frac{5\\pi}{4}\\times\\frac{180}{\\pi}" },
            { explanation: "Cancel π and compute 180 ÷ 4 = 45.", latex: "5\\times 45=225^\\circ" },
          ],
          finalAnswerLatex: "225^\\circ",
        },
        {
          title: "Convert 7π/6 to degrees",
          questionLatex: "\\frac{7\\pi}{6}",
          steps: [
            { explanation: "Multiply by the conversion factor.", latex: "\\frac{7\\pi}{6}\\times\\frac{180}{\\pi}" },
            { explanation: "Cancel π and compute 180 ÷ 6 = 30.", latex: "7\\times 30=210^\\circ" },
          ],
          finalAnswerLatex: "210^\\circ",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-r2d-g1", "Convert the angle to degrees.", "\\frac{\\pi}{4}", "45", ["45 degrees", "45°"]),
        formulaAnswer("y11adv-r2d-g2", "Convert the angle to degrees.", "\\frac{\\pi}{2}", "90", ["90 degrees", "90°"]),
        formulaAnswer("y11adv-r2d-g3", "Convert the angle to degrees.", "\\frac{5\\pi}{6}", "150", ["150 degrees", "150°"]),
        formulaAnswer("y11adv-r2d-g4", "Convert the angle to degrees.", "2\\pi", "360", ["360 degrees", "360°"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-r2d-i1", "Convert the angle to degrees.", "\\frac{\\pi}{3}", "60", ["60 degrees", "60°"]),
        formulaAnswer("y11adv-r2d-i2", "Convert the angle to degrees.", "\\frac{3\\pi}{4}", "135", ["135 degrees", "135°"]),
        formulaAnswer("y11adv-r2d-i3", "Convert the angle to degrees.", "\\frac{4\\pi}{3}", "240", ["240 degrees", "240°"]),
        formulaAnswer("y11adv-r2d-i4", "Convert the angle to degrees.", "\\frac{7\\pi}{4}", "315", ["315 degrees", "315°"]),
        formulaAnswer("y11adv-r2d-i5", "Convert the angle to degrees.", "\\frac{5\\pi}{3}", "300", ["300 degrees", "300°"]),
      ],
      commonMistakes: [
        { mistake: "Multiplying by π/180 instead of 180/π when converting from radians.", fix: "Radians → degrees: multiply by 180/π." },
        { mistake: "Forgetting that π cancels — treating π/3 as if it is just 1/3.", fix: "Write (π/3) × (180/π) and explicitly cancel the π symbols first." },
        { mistake: "Getting π/6 and π/3 backwards: saying π/6 = 60° and π/3 = 30°.", fix: "π/6 = 180/6 = 30°; π/3 = 180/3 = 60°. The larger denominator gives the smaller angle." },
        { mistake: "Leaving the answer as a fraction of π instead of a pure degree value.", fix: "After cancelling π, the result is a plain number of degrees." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-r2d-qm1",
          prompt: "Which degree measure is equivalent to $-\\dfrac{7\\pi}{12}$ radians?",
          latex: "-\\frac{7\\pi}{12}\\times\\frac{180}{\\pi}",
          choices: ["$-105^\\circ$", "$105^\\circ$", "$-84^\\circ$", "$-210^\\circ$"],
          answer: "A",
          hint: "Cancel $\\pi$, simplify $180/12$, and preserve the direction sign.",
          explanation:
            "Multiplying by $180/\\pi$ gives $-(7\\pi/12)(180/\\pi)=-7(15)=-105^\\circ$. The negative sign is retained because the original angle represents a clockwise rotation.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks whether students cancel pi correctly, simplify the scale factor, and preserve a negative rotation.",
          distractorMisconceptions: {
            B: "Drops the clockwise direction sign.",
            C: "Uses an incorrect value for 180 divided by 12.",
            D: "Doubles the converted magnitude.",
          },
        }),
        qualityAnswer({
          id: "y11adv-r2d-qm2",
          prompt: "Convert $\\dfrac{13\\pi}{10}$ radians to degrees.",
          latex: "\\frac{13\\pi}{10}",
          answer: "234",
          acceptedAnswers: ["234.0", "234 degrees", "234°"],
          hint: "Cancel $\\pi$ and calculate $13(180/10)$.",
          explanation:
            "Multiplying by $180/\\pi$ cancels the $\\pi$ factors: $(13\\pi/10)(180/\\pi)=13(18)$. Since $13\\times18=234$, the angle is $234^\\circ$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks accurate conversion of a non-benchmark radian fraction to a whole-number degree measure.",
        }),
        qualityChoice({
          id: "y11adv-r2d-qm3",
          prompt:
            "A student converts $\\dfrac{7\\pi}{12}$ radians to $95^\\circ$ after writing $180\\div12=15$. Which correction identifies the error?",
          latex: "\\frac{7\\pi}{12}\\times\\frac{180}{\\pi}",
          choices: [
            "The final multiplication is wrong: $7\\times15=105$, not 95",
            "The cancellation is wrong because the $\\pi$ factors cannot cancel",
            "The conversion factor should be $\\dfrac{\\pi}{180}$",
            "The answer must retain a factor of $\\pi$",
          ],
          answer: "A",
          hint: "The student's scale factor is correct; check the remaining arithmetic.",
          explanation:
            "The setup and cancellation are both valid, and $180/12=15$. The error occurs only in the last multiplication: $7\\times15=105$. Therefore $7\\pi/12$ radians equals $105^\\circ$.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Distinguishes a final arithmetic error from incorrect conversion, cancellation, or answer-format methods.",
          distractorMisconceptions: {
            B: "Treats the common pi factor as non-cancellable.",
            C: "Uses the degrees-to-radians factor in the reverse direction.",
            D: "Assumes degree answers should still contain pi.",
          },
        }),
        qualityAnswer({
          id: "y11adv-r2d-qm4",
          prompt:
            "Convert the complete rotation $\\dfrac{17\\pi}{6}$ radians to degrees. Do not replace it by a coterminal angle.",
          latex: "\\frac{17\\pi}{6}",
          answer: "510",
          acceptedAnswers: ["510.0", "510 degrees", "510°"],
          hint: "Convert the full coefficient before considering where the rotation finishes.",
          explanation:
            "The conversion is $(17\\pi/6)(180/\\pi)=17(30)=510^\\circ$. Although this rotation is coterminal with $150^\\circ$, the question asks for the complete amount of rotation, so $510^\\circ$ is required.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Distinguishes conversion of a full rotation measure from reduction to its terminal angle.",
        }),
        qualityAnswer({
          id: "y11adv-r2d-qm5",
          prompt:
            "The radian angle $\\dfrac{a\\pi}{14}$ converts exactly to $270^\\circ$, where $a$ is a positive integer. Find $a$.",
          latex: "\\frac{a\\pi}{14}\\times\\frac{180}{\\pi}=270",
          answer: "21",
          acceptedAnswers: ["21.0", "a=21", "a = 21"],
          hint: "Cancel $\\pi$ and solve the resulting linear equation for $a$.",
          explanation:
            "After cancellation, $180a/14=270$. Multiplying by 14 and dividing by 180 gives $a=270(14)/180=21$. Indeed, $21\\pi/14=3\\pi/2$, which converts to $270^\\circ$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests reverse use of the conversion relationship to reconstruct an unknown radian coefficient.",
        }),
        qualityChoice({
          id: "y11adv-r2d-qm6",
          prompt:
            "Leila converts $\\dfrac{11\\pi}{6}$ using $(11\\pi/6)(180/\\pi)=330^\\circ$. Noah writes $11\\pi/6=2\\pi-\\pi/6$ and obtains $360^\\circ-30^\\circ=330^\\circ$. Which evaluation is correct?",
          latex: "\\frac{11\\pi}{6}",
          choices: [
            "Only Leila is correct because subtraction cannot be used with angle measures",
            "Only Noah is correct because the conversion factor fails in Quadrant IV",
            "Both are correct; they use equivalent multiplicative and benchmark reasoning",
            "Neither is correct because the result should contain $\\pi$",
          ],
          answer: "C",
          hint: "Check whether angle subtraction is preserved between radian and degree units.",
          explanation:
            "Leila correctly applies the general conversion factor. Noah also uses the valid identity $11\\pi/6=2\\pi-\\pi/6$ and converts the two benchmarks. Both methods preserve the angle and give $330^\\circ$.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks evaluation of two valid methods instead of enforcing one procedural route.",
          distractorMisconceptions: {
            A: "Rejects the additive structure of angle measure.",
            B: "Invents a quadrant restriction on the conversion factor.",
            D: "Retains pi in a degree answer after conversion.",
          },
        }),
        qualityAnswer({
          id: "y11adv-r2d-qm7",
          prompt:
            "A pointer rotates $\\dfrac{17\\pi}{9}$ counterclockwise and then $\\dfrac{5\\pi}{6}$ clockwise. Express its net signed rotation in degrees.",
          latex: "\\frac{17\\pi}{9}-\\frac{5\\pi}{6}",
          answer: "190",
          acceptedAnswers: ["190.0", "190 degrees", "190°"],
          hint: "Combine the signed radian rotations exactly before converting.",
          explanation:
            "Using denominator 18, the net rotation is $34\\pi/18-15\\pi/18=19\\pi/18$. Multiplying by $180/\\pi$ gives $19(10)=190^\\circ$. The result is positive, so the net direction is counterclockwise.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines signed fraction arithmetic with exact radian-to-degree conversion.",
        }),
        qualityAnswer({
          id: "y11adv-r2d-qm8",
          prompt:
            "For integers $1\\le n\\le48$, let $\\theta_n=\\dfrac{n\\pi}{24}$. How many values of $n$ convert to a whole-number degree measure strictly between $90^\\circ$ and $270^\\circ$?",
          latex: "\\theta_n=\\frac{n\\pi}{24}",
          answer: "11",
          acceptedAnswers: ["11.0", "eleven", "11 values"],
          hint: "Convert symbolically, impose the interval, then apply the whole-number condition.",
          explanation:
            "Conversion gives $\\theta_n=180n/24=15n/2$ degrees, which is a whole number exactly when $n$ is even. The strict interval gives $12<n<36$. The even integers $14,16,\\ldots,34$ form 11 valid values.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded family to combine symbolic conversion, parity, strict inequalities, and systematic counting.",
        }),
        qualityAnswer({
          id: "y11adv-r2d-qm9",
          prompt:
            "A disk rotates counterclockwise at $\\dfrac{7\\pi}{12}$ radians per second for 9 seconds, then clockwise at $\\dfrac{5\\pi}{18}$ radians per second for 6 seconds. Find its net signed rotation in degrees.",
          latex: "9\\left(\\frac{7\\pi}{12}\\right)-6\\left(\\frac{5\\pi}{18}\\right)",
          answer: "645",
          acceptedAnswers: ["645.0", "645 degrees", "645°"],
          hint: "Find each signed angular displacement, combine them in radians, then convert.",
          explanation:
            "The first displacement is $21\\pi/4$ and the clockwise displacement is $5\\pi/3$. Their signed difference is $21\\pi/4-5\\pi/3=43\\pi/12$. Converting gives $(43\\pi/12)(180/\\pi)=43(15)=645^\\circ$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates angular rate, elapsed time, direction, fraction arithmetic, and unit conversion in a linked model.",
        }),
        qualityAnswer({
          id: "y11adv-r2d-qm10",
          prompt:
            "A faulty converter multiplies a positive radian angle $x$ by $200/\\pi$ instead of $180/\\pi$. For $0<x\\le2\\pi$, its result is $30^\\circ$ greater than the correct result. Find $x$.",
          latex: "\\frac{200x}{\\pi}-\\frac{180x}{\\pi}=30",
          answer: "3pi/2",
          acceptedAnswers: ["3\\pi/2", "$\\frac{3\\pi}{2}$", "3π/2"],
          hint: "Model the difference between the faulty and correct conversion factors.",
          explanation:
            "The excess is $x(200/\\pi-180/\\pi)=20x/\\pi$. Setting $20x/\\pi=30$ gives $20x=30\\pi$, so $x=3\\pi/2$. This lies within the stated positive interval.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires constructing and solving a calibration-error model from two radian-to-degree factors.",
        }),
      ],
    };
  }

  if (lesson.slug === "arc-length-radian-measure") {
    return {
      ...base,
      description:
        "Apply s = rθ to find arc lengths, radii, and angles — converting degree angles to radians first when needed.",
      learningIntention:
        "Use s = rθ (with θ in radians) to find any one of s, r, or θ when the other two are given.",
      successCriteria: [
        "State the arc length formula $s=r\\theta$ and name the required unit for $\\theta$.",
        "Find the arc length when $r$ and $\\theta$ are given.",
        "Rearrange $s=r\\theta$ to find $r$ or $\\theta$.",
        "Convert a degree angle to radians before applying the formula.",
      ],
      teaching: {
        paragraphs: [
          "The arc length formula is $s=r\\theta$, where $s$ is the arc length, $r$ is the radius, and $\\theta$ is the central angle in radians.",
          "If $\\theta$ is given in degrees, convert it to radians first using $\\theta\\text{ rad}=\\theta^\\circ\\times\\frac{\\pi}{180}$.",
          "To find the radius: $r=\\frac{s}{\\theta}$. To find the angle: $\\theta=\\frac{s}{r}$.",
          "Exact answers are expected unless the question asks for a decimal.",
        ],
        latexBlocks: [
          "s=r\\theta\\quad(\\theta\\text{ in radians})",
          "r=\\frac{s}{\\theta},\\quad \\theta=\\frac{s}{r}",
        ],
      },
      workedExamples: [
        {
          title: "Find arc length",
          questionLatex: "r=6,\\quad \\theta=\\frac{\\pi}{3}",
          steps: [
            { explanation: "Use the arc length formula.", latex: "s=r\\theta" },
            { explanation: "Substitute the values.", latex: "s=6\\times\\frac{\\pi}{3}" },
            { explanation: "Simplify by cancelling.", latex: "s=2\\pi" },
          ],
          finalAnswerLatex: "s=2\\pi",
        },
        {
          title: "Find the radius",
          questionLatex: "s=8\\pi,\\quad \\theta=\\frac{2\\pi}{3}",
          steps: [
            { explanation: "Rearrange the formula for r.", latex: "r=\\frac{s}{\\theta}" },
            { explanation: "Substitute.", latex: "r=\\frac{8\\pi}{\\frac{2\\pi}{3}}=8\\pi\\times\\frac{3}{2\\pi}" },
            { explanation: "Cancel π and simplify.", latex: "r=\\frac{24}{2}=12" },
          ],
          finalAnswerLatex: "r=12",
        },
        {
          title: "Convert degrees first, then find arc length",
          questionLatex: "r=10,\\quad \\theta=36^\\circ",
          steps: [
            { explanation: "Convert the angle to radians.", latex: "36^\\circ\\times\\frac{\\pi}{180}=\\frac{\\pi}{5}" },
            { explanation: "Apply s = rθ.", latex: "s=10\\times\\frac{\\pi}{5}=2\\pi" },
          ],
          finalAnswerLatex: "s=2\\pi",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-arc-g1", "Find the arc length.", "r=3,\\quad \\theta=\\frac{\\pi}{3}", "pi", ["\\pi", "π"]),
        formulaAnswer("y11adv-arc-g2", "Find the arc length.", "r=8,\\quad \\theta=\\frac{\\pi}{2}", "4pi", ["4\\pi", "4π"]),
        formulaAnswer("y11adv-arc-g3", "Find the angle $\\theta$ in radians.", "s=6\\pi,\\quad r=9", "2pi/3", ["2\\pi/3", "2π/3"]),
        formulaAnswer("y11adv-arc-g4", "Convert the angle to radians first, then find the arc length.", "r=5,\\quad \\theta=60^\\circ", "5pi/3", ["5\\pi/3", "5π/3"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-arc-i1", "Find the arc length.", "r=4,\\quad \\theta=\\frac{3\\pi}{4}", "3pi", ["3\\pi", "3π"]),
        formulaAnswer("y11adv-arc-i2", "Find the arc length.", "r=12,\\quad \\theta=\\frac{\\pi}{6}", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-arc-i3", "Find the radius.", "s=10\\pi,\\quad \\theta=\\frac{5\\pi}{3}", "6", []),
        formulaAnswer("y11adv-arc-i4", "Convert the angle to radians first, then find the arc length.", "r=9,\\quad \\theta=120^\\circ", "6pi", ["6\\pi", "6π"]),
        formulaAnswer("y11adv-arc-i5", "Find the angle $\\theta$ in radians.", "s=3\\pi,\\quad r=6", "pi/2", ["\\pi/2", "π/2"]),
      ],
      commonMistakes: [
        { mistake: "Using a degree value directly in s = rθ without converting to radians first.", fix: "The formula requires θ in radians. Convert degrees × π/180 before substituting." },
        { mistake: "Dividing s by r and leaving the answer as a fraction that doesn't simplify to a clean radian value.", fix: "Check whether the arc length contains a π factor — if so, the answer will be a fraction of π." },
        { mistake: "Confusing which variable to isolate when finding r or θ.", fix: "Write out s = rθ, then divide both sides by the known variable." },
        { mistake: "Rounding an exact answer prematurely.", fix: "Keep π in the answer unless asked to give a decimal." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-alen-qm1",
          prompt:
            "A sector has radius 9 cm and central angle $\\dfrac{4\\pi}{9}$ radians. What is its arc length?",
          latex: "s=r\\theta",
          choices: ["$\\dfrac{4\\pi}{9}$ cm", "$4\\pi$ cm", "$36\\pi$ cm", "$720$ cm"],
          answer: "B",
          hint: "The angle is already in radians, so substitute it directly into $s=r\\theta$.",
          explanation:
            "Using $s=r\\theta$, the arc length is $9(4\\pi/9)=4\\pi$ cm. The factor of 9 cancels the denominator; no degree conversion is needed because the supplied angle is already in radians.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks direct use of the radian arc-length formula and whether the learner simplifies an exact product correctly.",
          distractorMisconceptions: {
            A: "Reports the angle itself and omits the radius factor.",
            C: "Multiplies by the numerator but does not divide by the denominator.",
            D: "Converts to 80 degrees and then incorrectly uses the degree value in the radian formula.",
          },
          sectorDiagram: {
            description:
              "A circle sector with radius 9 centimetres, central angle four pi over nine radians, and unknown arc length s.",
            angleDegrees: 80,
            radiusLabel: "r=9\\text{ cm}",
            angleLabel: "\\frac{4\\pi}{9}",
            arcLabel: "s",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-alen-qm2",
          prompt:
            "An arc has length $\\dfrac{15\\pi}{2}$ cm and subtends $\\dfrac{5\\pi}{6}$ radians at the centre. Find the radius in centimetres.",
          latex: "r=\\frac{s}{\\theta}",
          answer: "9",
          acceptedAnswers: ["9.0", "9 cm", "9 centimetres"],
          hint: "Rearrange $s=r\\theta$ for the radius before substituting the two exact values.",
          explanation:
            "Rearranging gives $r=s/\\theta$. Hence $r=(15\\pi/2)\\div(5\\pi/6)=(15\\pi/2)(6/5\\pi)=9$ cm. Both the factor of $\\pi$ and the common numerical factors cancel.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks correct rearrangement of the arc-length formula and exact division by a fractional radian measure.",
          sectorDiagram: {
            description:
              "A circle sector with unknown radius, central angle five pi over six radians, and arc length fifteen pi over two centimetres.",
            angleDegrees: 150,
            radiusLabel: "r",
            angleLabel: "\\frac{5\\pi}{6}",
            arcLabel: "s=\\frac{15\\pi}{2}\\text{ cm}",
            showFullCircle: true,
          },
        }),
        qualityChoice({
          id: "y11adv-alen-qm3",
          prompt:
            "For a sector of radius 12 cm and central angle $75^\\circ$, a student writes $s=12(75)=900$ cm. Which correction identifies the error and gives the exact arc length?",
          latex: "r=12,\\quad \\theta=75^\\circ",
          choices: [
            "Square the radius: $s=12^2(75)=10800$ cm",
            "Use the full circumference: $s=2\\pi(12)=24\\pi$ cm",
            "Convert $75^\\circ=\\dfrac{5\\pi}{12}$, then $s=12\\left(\\dfrac{5\\pi}{12}\\right)=5\\pi$ cm",
            "Divide by the angle: $s=\\dfrac{12}{75}=\\dfrac{4}{25}$ cm",
          ],
          answer: "C",
          hint: "The formula $s=r\\theta$ requires the central angle to be measured in radians.",
          explanation:
            "The student's substitution uses degrees where radians are required. Since $75^\\circ(\\pi/180)=5\\pi/12$, the correct length is $s=12(5\\pi/12)=5\\pi$ cm. The radius is neither squared nor divided by the angle.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses the common degree-versus-radian error and requires evaluation of the corrected exact calculation.",
          distractorMisconceptions: {
            A: "Confuses arc length with a formula involving radius squared.",
            B: "Uses the entire circumference instead of the stated fraction of a turn.",
            D: "Reverses the multiplicative relationship between radius, angle, and arc length.",
          },
          sectorDiagram: {
            description:
              "A circle sector with radius 12 centimetres, central angle 75 degrees, and unknown arc length s.",
            angleDegrees: 75,
            radiusLabel: "r=12\\text{ cm}",
            angleLabel: "75^\\circ",
            arcLabel: "s",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-alen-qm4",
          prompt:
            "A circle of radius 14 cm contains an arc of length $7\\pi$ cm. Find the central angle in degrees.",
          latex: "\\theta=\\frac{s}{r}",
          answer: "90",
          acceptedAnswers: ["90.0", "90 degrees", "90°"],
          hint: "Find the angle in radians from $\\theta=s/r$, then convert it to degrees.",
          explanation:
            "First, $\\theta=s/r=7\\pi/14=\\pi/2$ radians. Converting gives $(\\pi/2)(180/\\pi)=90^\\circ$. The division by the radius produces a radian measure before the final unit conversion.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks a two-stage reverse calculation from arc length to a radian angle and then to degrees.",
          sectorDiagram: {
            description:
              "A not-to-scale circle sector with radius 14 centimetres, arc length seven pi centimetres, and unknown central angle theta.",
            angleDegrees: 72,
            radiusLabel: "r=14\\text{ cm}",
            angleLabel: "\\theta",
            arcLabel: "s=7\\pi\\text{ cm}",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-alen-qm5",
          prompt:
            "Two concentric circular paths subtend the same central angle. The inner path has radius 6 m and curved length $5\\pi$ m; the outer path has curved length $15\\pi$ m. Find the outer radius in metres.",
          latex: "\\frac{s_{\\text{outer}}}{s_{\\text{inner}}}=\\frac{R}{6}",
          answer: "18",
          acceptedAnswers: ["18.0", "18 m", "18 metres"],
          hint: "Because both paths share the same angle, their curved lengths are proportional to their radii.",
          explanation:
            "For the shared angle $\\theta$, $5\\pi=6\\theta$ and $15\\pi=R\\theta$. Dividing the equations gives $15\\pi/(5\\pi)=R/6$, so $3=R/6$ and $R=18$ m. The unknown angle need not be calculated separately.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests proportional reasoning from $s=r\\theta$ across linked paths rather than isolated formula substitution.",
        }),
        qualityChoice({
          id: "y11adv-alen-qm6",
          prompt:
            "A sector has radius 8 cm and central angle $135^\\circ$. Nina converts to $3\\pi/4$ radians and uses $s=r\\theta$. Omar takes $135/360$ of the circumference $2\\pi r$. Which assessment is correct?",
          latex: "8\\left(\\frac{3\\pi}{4}\\right)=\\frac{135}{360}(2\\pi\\cdot8)",
          choices: [
            "Only Nina is correct; the circumference method cannot be used for an arc",
            "Only Omar is correct; $s=r\\theta$ cannot begin with a degree angle",
            "Both are correct and each gives $6\\pi$ cm",
            "Neither is correct; the exact length is $3\\pi$ cm",
          ],
          answer: "C",
          hint: "Evaluate each expression and decide whether the two methods represent the same fraction of a turn.",
          explanation:
            "Nina correctly converts $135^\\circ$ to $3\\pi/4$, giving $8(3\\pi/4)=6\\pi$ cm. Omar uses the equivalent fraction-of-circumference model: $(135/360)(16\\pi)=6\\pi$ cm. Both methods encode the same geometry.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks whether learners can connect and validate the radian formula and fraction-of-circumference method.",
          distractorMisconceptions: {
            A: "Rejects a valid fraction-of-circumference representation.",
            B: "Overlooks that Nina converts the angle before applying the radian formula.",
            D: "Halves the correct result, commonly by using pi r as the full circumference.",
          },
          sectorDiagram: {
            description:
              "A circle sector with radius 8 centimetres, central angle 135 degrees, and unknown arc length s.",
            angleDegrees: 135,
            radiusLabel: "r=8\\text{ cm}",
            angleLabel: "135^\\circ",
            arcLabel: "s",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-alen-qm7",
          prompt:
            "A sweeping arm traces two concentric circular paths with radii 14 cm and 8 cm through the same angle. The outer traced distance exceeds the inner traced distance by $5\\pi$ cm. Find the angle in degrees.",
          latex: "14\\theta-8\\theta=5\\pi",
          answer: "150",
          acceptedAnswers: ["150.0", "150 degrees", "150°"],
          hint: "Express both traced distances with $s=r\\theta$, subtract, and then convert the resulting angle.",
          explanation:
            "The difference is $(14-8)\\theta=6\\theta$. Thus $6\\theta=5\\pi$, so $\\theta=5\\pi/6$ radians. Converting gives $(5\\pi/6)(180/\\pi)=150^\\circ$. The shared angle links the two paths.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires constructing a difference model for two related arcs and converting the inferred angle to degrees.",
        }),
        qualityAnswer({
          id: "y11adv-alen-qm8",
          prompt:
            "For integers $1\\le n\\le35$, a circle has radius 12 cm and central angle $\\theta_n=\\dfrac{n\\pi}{18}$. How many values of $n$ make $s_n=12\\theta_n$ a whole-number multiple of $\\pi$ strictly between $4\\pi$ cm and $16\\pi$ cm?",
          latex: "s_n=12\\left(\\frac{n\\pi}{18}\\right)",
          answer: "5",
          acceptedAnswers: ["5.0", "five", "5 values"],
          hint: "Simplify $s_n$ first, then combine the divisibility condition with the strict interval.",
          explanation:
            "Here $s_n=2n\\pi/3$, so its coefficient of $\\pi$ is a whole number exactly when $n$ is divisible by 3. The strict bounds give $6<n<24$. The valid multiples are $9,12,15,18,21$, giving 5 values.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded family to combine an arc-length model, divisibility, strict inequalities, and systematic counting.",
        }),
        qualityAnswer({
          id: "y11adv-alen-qm9",
          prompt:
            "A cord does not slip on a pulley of radius $\\dfrac{6}{25}$ m. Taking clockwise rotation as negative, the pulley turns $\\dfrac{35\\pi}{6}$ radians clockwise and then $\\dfrac{11\\pi}{4}$ radians anticlockwise. Find the net signed displacement of the cord in metres.",
          latex: "s=\\frac{6}{25}\\left(-\\frac{35\\pi}{6}+\\frac{11\\pi}{4}\\right)",
          answer: "-37pi/50",
          acceptedAnswers: ["-37\\pi/50", "$-\\frac{37\\pi}{50}$", "-0.74pi", "-0.74\\pi"],
          hint: "Combine the rotations with their signs before multiplying the net angle by the pulley radius.",
          explanation:
            "The net angle is $-35\\pi/6+11\\pi/4=(-70+33)\\pi/12=-37\\pi/12$. With no slipping, the signed cord displacement is $r\\theta=(6/25)(-37\\pi/12)=-37\\pi/50$ m.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates direction, exact fraction arithmetic, rotational motion, and the no-slip arc-length model.",
        }),
        qualityAnswer({
          id: "y11adv-alen-qm10",
          prompt:
            "A circular route has radius $r$ metres, central angle $\\theta$ radians, and length $\\dfrac{20\\pi}{3}$ metres. Increasing the radius by 2 m and decreasing the angle by $\\dfrac{\\pi}{6}$ leaves the route length unchanged. Find the original radius.",
          latex: "r\\theta=\\frac{20\\pi}{3},\\quad (r+2)\\left(\\theta-\\frac{\\pi}{6}\\right)=\\frac{20\\pi}{3}",
          answer: "8",
          acceptedAnswers: ["8.0", "8 m", "8 metres"],
          hint: "Subtract the equal-length equations to relate $\\theta$ and $r$, then use the original length condition.",
          explanation:
            "Since both products equal the same length, expansion and cancellation give $-r\\pi/6+2\\theta-\\pi/3=0$, so $\\theta=\\pi(r+2)/12$. Substituting into $r\\theta=20\\pi/3$ gives $r(r+2)=80$, hence $(r-8)(r+10)=0$. A radius is positive, so $r=8$ m.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires forming and solving two linked arc-length constraints, then rejecting the non-physical algebraic root.",
        }),
      ],
    };
  }

  if (lesson.slug === "sector-area-radian-measure") {
    return {
      ...base,
      description:
        "Apply A = ½r²θ to find sector areas, radii, and angles, and calculate the perimeter of a sector using P = 2r + s.",
      learningIntention:
        "Use A = ½r²θ (with θ in radians) to find any one of A, r, or θ, and combine with s = rθ to find the perimeter of a sector.",
      successCriteria: [
        "State the sector area formula $A=\\frac12r^2\\theta$ and the required unit for $\\theta$.",
        "Find the sector area when $r$ and $\\theta$ are given.",
        "Rearrange $A=\\frac12r^2\\theta$ to find $r$ or $\\theta$.",
        "Calculate the perimeter of a sector using $P=2r+s$.",
        "Convert a degree angle to radians before applying the formula.",
      ],
      teaching: {
        paragraphs: [
          "The sector area formula is $A=\\frac12r^2\\theta$, where $\\theta$ is in radians.",
          "The $\\frac12$ and the $r^2$ both matter: square $r$ before multiplying by $\\theta$.",
          "The perimeter of a sector is the two straight radii plus the arc: $P=2r+s=2r+r\\theta$.",
          "If $\\theta$ is given in degrees, convert to radians first.",
        ],
        latexBlocks: [
          "A=\\frac12r^2\\theta\\quad(\\theta\\text{ in radians})",
          "r^2=\\frac{2A}{\\theta},\\quad \\theta=\\frac{2A}{r^2}",
          "P=2r+s=2r+r\\theta",
        ],
      },
      workedExamples: [
        {
          title: "Find sector area",
          questionLatex: "r=6,\\quad \\theta=\\frac{\\pi}{3}",
          steps: [
            { explanation: "Use the sector area formula.", latex: "A=\\frac12r^2\\theta" },
            { explanation: "Substitute r = 6 and θ = π/3.", latex: "A=\\frac12\\times36\\times\\frac{\\pi}{3}" },
            { explanation: "Simplify: ½ × 36 = 18, then 18 × π/3 = 6π.", latex: "A=6\\pi" },
          ],
          finalAnswerLatex: "A=6\\pi",
        },
        {
          title: "Find the radius",
          questionLatex: "A=9\\pi,\\quad \\theta=\\frac{\\pi}{2}",
          steps: [
            { explanation: "Rearrange the formula for r².", latex: "r^2=\\frac{2A}{\\theta}" },
            { explanation: "Substitute and simplify.", latex: "r^2=\\frac{2\\times9\\pi}{\\frac{\\pi}{2}}=\\frac{18\\pi\\times2}{\\pi}=36" },
            { explanation: "Take the positive root.", latex: "r=6" },
          ],
          finalAnswerLatex: "r=6",
        },
        {
          title: "Find the perimeter of a sector",
          questionLatex: "r=5,\\quad \\theta=\\frac{2\\pi}{5}",
          steps: [
            { explanation: "Find the arc length.", latex: "s=r\\theta=5\\times\\frac{2\\pi}{5}=2\\pi" },
            { explanation: "Add the two radii.", latex: "P=2r+s=10+2\\pi" },
          ],
          finalAnswerLatex: "P=10+2\\pi",
        },
      ],
      guidedPractice: [
        formulaAnswer("y11adv-sector-g1", "Find the sector area.", "r=4,\\quad \\theta=\\frac{\\pi}{4}", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-sector-g2", "Find the sector area.", "r=6,\\quad \\theta=\\frac{\\pi}{3}", "6pi", ["6\\pi", "6π"]),
        formulaAnswer("y11adv-sector-g3", "Find the radius.", "A=9\\pi,\\quad \\theta=\\frac{\\pi}{2}", "6", []),
        formulaAnswer("y11adv-sector-g4", "Find the perimeter of the sector.", "r=3,\\quad \\theta=\\frac{2\\pi}{3}", "6+2pi", ["6+2\\pi", "6+2π"]),
      ],
      independentPractice: [
        formulaAnswer("y11adv-sector-i1", "Find the sector area.", "r=5,\\quad \\theta=\\frac{2\\pi}{5}", "5pi", ["5\\pi", "5π"]),
        formulaAnswer("y11adv-sector-i2", "Find the sector area.", "r=4,\\quad \\theta=\\frac{\\pi}{2}", "4pi", ["4\\pi", "4π"]),
        formulaAnswer("y11adv-sector-i3", "Find the radius.", "A=12\\pi,\\quad \\theta=\\frac{2\\pi}{3}", "6", []),
        formulaAnswer("y11adv-sector-i4", "Convert the angle to radians first, then find the sector area.", "r=6,\\quad \\theta=60^\\circ", "6pi", ["6\\pi", "6π"]),
        formulaAnswer("y11adv-sector-i5", "Find the perimeter of the sector.", "r=6,\\quad \\theta=\\frac{\\pi}{3}", "12+2pi", ["12+2\\pi", "12+2π"]),
      ],
      commonMistakes: [
        { mistake: "Using r instead of r² in the formula — writing ½rθ instead of ½r²θ.", fix: "Square the radius first, then multiply by ½ and θ." },
        { mistake: "Using a degree value directly in A = ½r²θ.", fix: "Convert θ to radians before substituting." },
        { mistake: "Finding sector area when asked for perimeter of the sector.", fix: "Perimeter = 2r + arc length. Use s = rθ to find the arc first." },
        { mistake: "Taking r² = A/θ instead of r² = 2A/θ when rearranging.", fix: "Start from A = ½r²θ: multiply both sides by 2 before dividing by θ." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-sarea-qm1",
          prompt:
            "A sector has radius 6 cm and central angle $\\dfrac{5\\pi}{6}$ radians. What is its exact area?",
          latex: "A=\\frac12r^2\\theta",
          choices: ["$5\\pi$ cm$^2$", "$15\\pi$ cm$^2$", "$30\\pi$ cm$^2$", "$36\\pi$ cm$^2$"],
          answer: "B",
          hint: "Square the radius before multiplying by one half and the radian angle.",
          explanation:
            "Using $A=\\frac12r^2\\theta$, the area is $\\frac12(6^2)(5\\pi/6)=18(5\\pi/6)=15\\pi$ cm$^2$. The angle is already in radians, so no conversion is required.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks direct use of the sector-area formula, including the squared radius and exact simplification.",
          distractorMisconceptions: {
            A: "Uses the radius rather than its square.",
            C: "Omits the factor of one half.",
            D: "Squares the radius but then drops both the angle and the factor of one half.",
          },
          sectorDiagram: {
            description:
              "A circle sector with radius 6 centimetres, central angle five pi over six radians, and unknown area A.",
            angleDegrees: 150,
            radiusLabel: "r=6\\text{ cm}",
            angleLabel: "\\frac{5\\pi}{6}",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-sarea-qm2",
          prompt:
            "A sector has area $\\dfrac{49\\pi}{4}$ cm$^2$ and central angle $\\dfrac{\\pi}{2}$ radians. Find its radius in centimetres.",
          latex: "r^2=\\frac{2A}{\\theta}",
          answer: "7",
          acceptedAnswers: ["7.0", "7 cm", "7 centimetres"],
          hint: "Rearrange for $r^2$, simplify the exact quotient, and take the positive square root.",
          explanation:
            "From $r^2=2A/\\theta$, $r^2=(49\\pi/2)\\div(\\pi/2)=49$. Therefore $r=7$ cm; the negative root is rejected because a geometric radius must be positive.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks rearrangement for a squared unknown, exact fraction division, and selection of the physical root.",
          sectorDiagram: {
            description:
              "A circle sector with unknown radius, central angle pi over two radians, and area forty-nine pi over four square centimetres.",
            angleDegrees: 90,
            radiusLabel: "r",
            angleLabel: "\\frac{\\pi}{2}",
            showFullCircle: true,
          },
        }),
        qualityChoice({
          id: "y11adv-sarea-qm3",
          prompt:
            "For a sector of radius 10 cm and central angle $72^\\circ$, a student writes $A=\\frac12(10^2)(72)=3600$ cm$^2$. Which correction identifies the error and gives the exact area?",
          latex: "r=10,\\quad \\theta=72^\\circ",
          choices: [
            "Replace $r^2$ by $r$: $A=\\frac12(10)(72)=360$ cm$^2$",
            "Use the whole-circle area: $A=\\pi(10^2)=100\\pi$ cm$^2$",
            "Convert $72^\\circ=\\dfrac{2\\pi}{5}$, then $A=\\frac12(10^2)\\left(\\dfrac{2\\pi}{5}\\right)=20\\pi$ cm$^2$",
            "Convert the radius to radians, then use $A=\\frac12(10)(72)$",
          ],
          answer: "C",
          hint: "The sector-area formula requires the central angle, not the radius, to be expressed in radians.",
          explanation:
            "The student has substituted a degree value into a radian formula. Since $72^\\circ(\\pi/180)=2\\pi/5$, the correct area is $\\frac12(100)(2\\pi/5)=20\\pi$ cm$^2$.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses degree substitution in a radian formula and requires evaluation of the fully corrected method.",
          distractorMisconceptions: {
            A: "Removes the required square on the radius while retaining the degree error.",
            B: "Uses the entire circle rather than the stated sector.",
            D: "Treats the linear radius as the quantity requiring angular-unit conversion.",
          },
          sectorDiagram: {
            description:
              "A circle sector with radius 10 centimetres, central angle 72 degrees, and unknown area A.",
            angleDegrees: 72,
            radiusLabel: "r=10\\text{ cm}",
            angleLabel: "72^\\circ",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-sarea-qm4",
          prompt:
            "Find the exact perimeter of a sector with radius 4 cm and central angle $\\dfrac{3\\pi}{4}$ radians.",
          latex: "P=2r+r\\theta",
          answer: "8+3pi",
          acceptedAnswers: ["8+3\\pi", "8+3π", "3pi+8", "3\\pi+8", "$8+3\\pi$"],
          hint: "Find the curved length $r\\theta$, then add the two straight radii.",
          explanation:
            "The curved boundary has length $s=r\\theta=4(3\\pi/4)=3\\pi$ cm. A sector perimeter also includes two radii, so $P=2(4)+3\\pi=8+3\\pi$ cm.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks coordination of arc length and straight radii rather than confusing sector perimeter with area.",
          sectorDiagram: {
            description:
              "A circle sector with radius 4 centimetres, central angle three pi over four radians, and unknown perimeter.",
            angleDegrees: 135,
            radiusLabel: "r=4\\text{ cm}",
            angleLabel: "\\frac{3\\pi}{4}",
            arcLabel: "s",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-sarea-qm5",
          prompt:
            "A sector has radius $2k$ cm, central angle $\\dfrac{3\\pi}{8}$ radians, and area $27\\pi$ cm$^2$. Find the positive value of $k$.",
          latex: "27\\pi=\\frac12(2k)^2\\left(\\frac{3\\pi}{8}\\right)",
          answer: "6",
          acceptedAnswers: ["6.0", "k=6", "$k=6$"],
          hint: "Substitute the algebraic radius, simplify the constants, and solve the resulting equation in $k^2$.",
          explanation:
            "Substitution gives $27\\pi=\\frac12(4k^2)(3\\pi/8)=3\\pi k^2/4$. Hence $k^2=36$. The radius $2k$ is positive, so the relevant solution is $k=6$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests reverse parameter inference through a squared radius and interpretation of the positive geometric solution.",
          sectorDiagram: {
            description:
              "A circle sector with radius 2k centimetres, central angle three pi over eight radians, and area 27 pi square centimetres.",
            angleDegrees: 67.5,
            radiusLabel: "r=2k\\text{ cm}",
            angleLabel: "\\frac{3\\pi}{8}",
            showFullCircle: true,
          },
        }),
        qualityChoice({
          id: "y11adv-sarea-qm6",
          prompt:
            "A sector has radius 12 cm and central angle $150^\\circ$. Rina converts to $5\\pi/6$ radians and uses $A=\\frac12r^2\\theta$. Kai takes $150/360$ of the circle area $\\pi r^2$. Which assessment is correct?",
          latex: "\\frac12(12^2)\\left(\\frac{5\\pi}{6}\\right)=\\frac{150}{360}\\pi(12^2)",
          choices: [
            "Only Rina is correct; fractions of a circle cannot be used for area",
            "Only Kai is correct; the radian formula cannot be used after converting degrees",
            "Both are correct and each gives $60\\pi$ cm$^2$",
            "Neither is correct; the area is $120\\pi$ cm$^2$",
          ],
          answer: "C",
          hint: "Evaluate both expressions and compare the radian angle with the corresponding fraction of a full turn.",
          explanation:
            "Rina obtains $\\frac12(144)(5\\pi/6)=60\\pi$ cm$^2$. Kai uses $150/360=5/12$ of $144\\pi$, which is also $60\\pi$ cm$^2$. The two methods are equivalent representations of the same sector.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks whether learners can connect and validate radian and fraction-of-circle sector-area methods.",
          distractorMisconceptions: {
            A: "Rejects the valid fraction-of-circle area model.",
            B: "Rejects the valid radian formula even after the required conversion.",
            D: "Omits the factor of one half in the radian calculation.",
          },
          sectorDiagram: {
            description:
              "A circle sector with radius 12 centimetres, central angle 150 degrees, and unknown area A.",
            angleDegrees: 150,
            radiusLabel: "r=12\\text{ cm}",
            angleLabel: "150^\\circ",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-sarea-qm7",
          prompt:
            "A sector initially has radius 5 cm and central angle $\\dfrac{4\\pi}{5}$. It is redesigned to keep the same area while its angle becomes $\\dfrac{\\pi}{5}$. Find the exact perimeter of the redesigned sector.",
          latex: "\\frac12(5^2)\\left(\\frac{4\\pi}{5}\\right)=\\frac12R^2\\left(\\frac{\\pi}{5}\\right)",
          answer: "20+2pi",
          acceptedAnswers: ["20+2\\pi", "20+2π", "2pi+20", "2\\pi+20", "$20+2\\pi$"],
          hint: "Use equal areas to find the new radius first, then add its curved boundary and two radii.",
          explanation:
            "The original area is $10\\pi$ cm$^2$. Equal areas give $10\\pi=\\frac12R^2(\\pi/5)$, so $R^2=100$ and $R=10$. The new arc is $10(\\pi/5)=2\\pi$, hence the perimeter is $20+2\\pi$ cm.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Links area invariance, inverse angle-radius scaling, a positive square root, arc length, and perimeter.",
          sectorDiagram: {
            description:
              "The redesigned circle sector, with unknown radius R, central angle pi over five radians, and the same area as the original radius-five sector.",
            angleDegrees: 36,
            radiusLabel: "R",
            angleLabel: "\\frac{\\pi}{5}",
            arcLabel: "s",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-sarea-qm8",
          prompt:
            "For integers $1\\le n\\le40$, let a sector have radius 6 cm and angle $\\theta_n=\\dfrac{n\\pi}{24}$. How many values of $n$ make its area a whole-number multiple of $\\pi$ strictly between $6\\pi$ cm$^2$ and $24\\pi$ cm$^2$?",
          latex: "A_n=\\frac12(6^2)\\left(\\frac{n\\pi}{24}\\right)",
          answer: "5",
          acceptedAnswers: ["5.0", "five", "5 values"],
          hint: "Simplify $A_n$ first, then combine the divisibility condition with the strict area bounds.",
          explanation:
            "The area is $A_n=3n\\pi/4$, so its coefficient of $\\pi$ is a whole number exactly when $n$ is divisible by 4. The strict bounds give $8<n<32$. Thus $n=12,16,20,24,28$, giving 5 values.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded family to combine sector modelling, divisibility, strict inequalities, and systematic counting.",
          sectorDiagram: {
            description:
              "A representative circle sector from a family, with radius 6 centimetres and variable central angle n pi over twenty-four radians.",
            angleDegrees: 60,
            radiusLabel: "r=6\\text{ cm}",
            angleLabel: "\\frac{n\\pi}{24}",
            showFullCircle: true,
          },
        }),
        qualityAnswer({
          id: "y11adv-sarea-qm9",
          prompt:
            "A windscreen wiper blade spans radii from $\\dfrac15$ m to $\\dfrac{13}{20}$ m and sweeps through $\\dfrac{5\\pi}{6}$ radians. Assuming complete coverage between the two arcs, find the exact area swept in square metres.",
          latex: "A=\\frac12\\left[\\left(\\frac{13}{20}\\right)^2-\\left(\\frac15\\right)^2\\right]\\frac{5\\pi}{6}",
          answer: "51pi/320",
          acceptedAnswers: ["51\\pi/320", "51π/320", "$\\frac{51\\pi}{320}$", "\\frac{51\\pi}{320}"],
          hint: "Subtract the inner sector area from the outer sector area before simplifying the exact fractions.",
          explanation:
            "The squared-radius difference is $169/400-1/25=153/400$. Therefore the swept area is $\\frac12(153/400)(5\\pi/6)=765\\pi/4800=51\\pi/320$ m$^2$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Models an annular sweep by combining two sector areas and exact rational arithmetic in context.",
        }),
        qualityAnswer({
          id: "y11adv-sarea-qm10",
          prompt:
            "A sector has perimeter 20 cm and area 24 cm$^2$. Find the sum of all possible positive radii, given that each corresponding central angle must be positive.",
          latex: "r(2+\\theta)=20,\\quad \\frac12r^2\\theta=24",
          answer: "10",
          acceptedAnswers: ["10.0", "10 cm", "10 centimetres"],
          hint: "Use the perimeter equation to express $\\theta$ in terms of $r$, then substitute into the area equation.",
          explanation:
            "From $r(2+\\theta)=20$, $\\theta=20/r-2$. Substitution gives $\\frac12r^2(20/r-2)=24$, so $r^2-10r+24=0$. Thus $r=4$ or $6$; their angles are $3$ and $4/3$ radians, both positive. The radius sum is $10$ cm.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires forming linked perimeter-area constraints, solving a quadratic, and validating both geometric solutions.",
          sectorDiagram: {
            description:
              "A not-to-scale circle sector with unknown radius r, unknown positive central angle theta, perimeter 20 centimetres, and area 24 square centimetres.",
            angleDegrees: 70,
            radiusLabel: "r",
            angleLabel: "\\theta",
            arcLabel: "s",
            showFullCircle: true,
          },
        }),
      ],
      multiPartPractice: [
        {
          id: "y11adv-sector-mp1",
          prompt: "A sector has radius 9 cm and central angle $\\frac{2\\pi}{3}$.",
          latex: "r=9,\\quad \\theta=\\frac{2\\pi}{3}",
          answer: "see parts",
          hint: "Use s = rθ for parts (a) and (c), and A = ½r²θ for part (b).",
          explanation:
            "(a) s = 9 × 2π/3 = 6π. (b) A = ½ × 81 × 2π/3 = 27π. (c) P = 2(9) + 6π = 18 + 6π.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the arc length.",
              latex: "s=r\\theta",
              marks: 1,
              answer: "6pi",
              acceptedAnswers: ["6\\pi", "6π"],
              hint: "Substitute r = 9 and θ = 2π/3 into s = rθ.",
              explanation:
                "The angle is already in radians, so $s=r\\theta=9(2\\pi/3)=6\\pi$ cm. The factor of 9 simplifies with the denominator 3.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the sector area.",
              latex: "A=\\frac12r^2\\theta",
              marks: 1,
              answer: "27pi",
              acceptedAnswers: ["27\\pi", "27π"],
              hint: "Substitute r = 9 and θ = 2π/3 into A = ½r²θ.",
              explanation:
                "Square the radius first: $A=\\frac12(9^2)(2\\pi/3)=\\frac12(81)(2\\pi/3)=27\\pi$ cm$^2$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the perimeter of the sector.",
              latex: "P=2r+s",
              marks: 1,
              answer: "18+6pi",
              acceptedAnswers: ["18+6\\pi", "18+6π"],
              hint: "Perimeter = 2 radii + arc length from part (a).",
              explanation:
                "The boundary contains two radii and the arc from part (a), so $P=2(9)+6\\pi=18+6\\pi$ cm.",
            },
          ],
        },
      ],
    };
  }

  // ── PHASE 2B v2 SLOTS ───────────────────────────────────────────────────────

  if (lesson.slug === "exact-trig-values-unit-circle") {
    const ucvPiOver6: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the terminal point at θ = π/6 (30°). The angle is in Q1, and the terminal point is at (√3/2, 1/2). The x-coordinate is cos(π/6) = √3/2 and the y-coordinate is sin(π/6) = 1/2.",
      angleRadians: "π/6",
      angleDegrees: "30",
      terminalPoint: { x: "√3/2", y: "1/2", label: "(√3/2, 1/2)" },
      quadrant: 1,
      showReferenceTriangle: true,
      highlightRadius: true,
    };
    const ucvPiOver3: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the terminal point at θ = π/3 (60°). The angle is in Q1, and the terminal point is at (1/2, √3/2). The x-coordinate is cos(π/3) = 1/2 and the y-coordinate is sin(π/3) = √3/2.",
      angleRadians: "π/3",
      angleDegrees: "60",
      terminalPoint: { x: "1/2", y: "√3/2", label: "(1/2, √3/2)" },
      quadrant: 1,
      showReferenceTriangle: true,
      highlightRadius: true,
    };
    const ucvPiOver2: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the boundary angle θ = π/2 (90°). The terminal point (0, 1) is at the top of the circle on the positive y-axis. cos(π/2) = 0 and sin(π/2) = 1.",
      angleRadians: "π/2",
      angleDegrees: "90",
      terminalPoint: { x: "0", y: "1", label: "(0, 1)" },
      quadrant: "axis",
      highlightRadius: true,
    };
    const ucvPiOver4: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the terminal point at θ = π/4 (45°). The angle is in Q1, and the terminal point is at (√2/2, √2/2). Both coordinates are equal: cos(π/4) = sin(π/4) = √2/2.",
      angleRadians: "π/4",
      angleDegrees: "45",
      terminalPoint: { x: "√2/2", y: "√2/2", label: "(√2/2, √2/2)" },
      quadrant: 1,
      showReferenceTriangle: true,
      highlightRadius: true,
    };
    const ucvThreePiOver2: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the boundary angle theta equals three pi over two. The terminal point (0, -1) lies on the negative y-axis.",
      angleRadians: "3π/2",
      angleDegrees: "270",
      terminalPoint: { x: "0", y: "-1", label: "(0, -1)" },
      quadrant: "axis",
      highlightRadius: true,
    };
    return {
      ...base,
      description:
        "Use the unit-circle rule (cos θ, sin θ) to read exact trigonometric values at common Q1 and axis angles.",
      learningIntention:
        "Learn that the terminal point on the unit circle at angle θ has coordinates (cos θ, sin θ), and apply this to read exact values at π/6, π/4, π/3, π/2, π, 3π/2, and 2π.",
      successCriteria: [
        "State the unit-circle coordinate rule: the terminal point at θ is (cos θ, sin θ).",
        "Explain why cos θ is the x-coordinate and sin θ is the y-coordinate.",
        "Read exact values of sin, cos, and tan at π/6, π/4, π/3 from the unit circle.",
        "State the coordinates at boundary angles 0, π/2, π, 3π/2, and 2π.",
        "Evaluate tan θ = sin θ / cos θ using unit-circle coordinates.",
      ],
      teaching: {
        paragraphs: [
          "Place a point on the circle of radius 1 centred at the origin. As the angle θ is measured anticlockwise from the positive x-axis, the point moves to position (cos θ, sin θ).",
          "This is the unit-circle rule: the x-coordinate is always cos θ and the y-coordinate is always sin θ.",
          "At Q1 angles π/6, π/4, π/3 the coordinates come directly from the 30-60-90 and 45-45-90 triangles.",
          "At the boundary angles: θ = 0 gives (1, 0); π/2 gives (0, 1); π gives (−1, 0); 3π/2 gives (0, −1); 2π returns to (1, 0).",
          "Tangent is the ratio of the two coordinates: tan θ = sin θ / cos θ = y/x. It is undefined when the x-coordinate is 0.",
        ],
        latexBlocks: [
          "(\\cos\\theta,\\,\\sin\\theta)\\quad\\text{unit-circle point at }\\theta",
          "\\cos\\theta=x\\text{-coordinate},\\quad\\sin\\theta=y\\text{-coordinate}",
          "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}=\\frac{y}{x},\\quad x\\ne0",
          "\\theta=0:\\,(1,0);\\;\\frac{\\pi}{2}:\\,(0,1);\\;\\pi:\\,(-1,0);\\;\\frac{3\\pi}{2}:\\,(0,-1)",
          "\\tfrac{\\pi}{6}:\\,(\\tfrac{\\sqrt{3}}{2},\\tfrac{1}{2});\\quad\\tfrac{\\pi}{4}:\\,(\\tfrac{\\sqrt{2}}{2},\\tfrac{\\sqrt{2}}{2});\\quad\\tfrac{\\pi}{3}:\\,(\\tfrac{1}{2},\\tfrac{\\sqrt{3}}{2})",
        ],
      },
      workedExamples: [
        {
          title: "Read cos and sin from the unit circle at θ = π/3",
          questionLatex: "\\theta=\\frac{\\pi}{3}",
          unitCircleDiagram: ucvPiOver3,
          steps: [
            { explanation: "The terminal point on the unit circle at any angle θ is (cos θ, sin θ).", latex: "\\text{point}=(\\cos\\theta,\\,\\sin\\theta)" },
            { explanation: "From the 30-60-90 triangle, the adjacent side over hypotenuse gives cos(π/3).", latex: "\\cos\\tfrac{\\pi}{3}=\\tfrac{1}{2}" },
            { explanation: "The opposite side over hypotenuse gives sin(π/3).", latex: "\\sin\\tfrac{\\pi}{3}=\\tfrac{\\sqrt{3}}{2}" },
          ],
          finalAnswerLatex: "\\left(\\tfrac{1}{2},\\,\\tfrac{\\sqrt{3}}{2}\\right)",
        },
        {
          title: "Read the coordinates at boundary angle θ = π/2",
          questionLatex: "\\theta=\\frac{\\pi}{2}",
          unitCircleDiagram: ucvPiOver2,
          steps: [
            { explanation: "A quarter turn places the terminal point at the top of the circle.", latex: "\\text{point}=(0,\\,1)" },
            { explanation: "The x-coordinate gives cos(π/2) = 0.", latex: "\\cos\\tfrac{\\pi}{2}=0" },
            { explanation: "The y-coordinate gives sin(π/2) = 1.", latex: "\\sin\\tfrac{\\pi}{2}=1" },
            { explanation: "tan(π/2) = sin/cos = 1/0 — the denominator is zero.", latex: "\\tan\\tfrac{\\pi}{2}=\\text{undefined}" },
          ],
          finalAnswerLatex: "(0,\\,1);\\quad\\cos\\tfrac{\\pi}{2}=0,\\;\\sin\\tfrac{\\pi}{2}=1,\\;\\tan\\tfrac{\\pi}{2}\\text{ undefined}",
        },
        {
          title: "Read cos and sin at θ = π/4, then evaluate tan",
          questionLatex: "\\theta=\\frac{\\pi}{4}",
          unitCircleDiagram: ucvPiOver4,
          steps: [
            { explanation: "From the 45-45-90 triangle, both legs equal 1 and the hypotenuse is √2.", latex: "\\cos\\tfrac{\\pi}{4}=\\sin\\tfrac{\\pi}{4}=\\tfrac{\\sqrt{2}}{2}" },
            { explanation: "The terminal point has equal coordinates.", latex: "\\left(\\tfrac{\\sqrt{2}}{2},\\,\\tfrac{\\sqrt{2}}{2}\\right)" },
            { explanation: "tan(π/4) = y/x = (√2/2)/(√2/2) = 1.", latex: "\\tan\\tfrac{\\pi}{4}=1" },
          ],
          finalAnswerLatex: "\\left(\\tfrac{\\sqrt{2}}{2},\\,\\tfrac{\\sqrt{2}}{2}\\right);\\quad\\tan\\tfrac{\\pi}{4}=1",
        },
      ],
      guidedPractice: [
        {
          ...formulaAnswer("y11adv-ucv-g1", "Evaluate using the unit-circle rule: cos θ is the x-coordinate.", "\\cos\\left(\\frac{\\pi}{6}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          unitCircleDiagram: ucvPiOver6,
          hint: "The terminal point at π/6 is (cos(π/6), sin(π/6)). Read the x-coordinate.",
        },
        {
          ...formulaAnswer("y11adv-ucv-g2", "Evaluate using the unit-circle rule: sin θ is the y-coordinate.", "\\sin\\left(\\frac{\\pi}{3}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          unitCircleDiagram: ucvPiOver3,
          hint: "The terminal point at π/3 is (1/2, √3/2). Read the y-coordinate.",
        },
        {
          ...formulaAnswer("y11adv-ucv-g3", "Evaluate using the unit-circle rule.", "\\sin\\left(\\frac{\\pi}{4}\\right)", "sqrt(2)/2", ["1/sqrt(2)", "\\sqrt{2}/2", "√2/2"]),
          unitCircleDiagram: ucvPiOver4,
          hint: "The terminal point at π/4 has equal x and y coordinates. Read the y-coordinate for sine.",
        },
        practicalChoice(
          "y11adv-ucv-g4",
          "A student writes the unit-circle coordinate rule as $(\\sin\\theta,\\,\\cos\\theta)$. Identify the error.",
          "B",
          [
            "$\\sin\\theta$ and $\\cos\\theta$ are always equal on the unit circle",
            "The order is reversed — the correct rule is $(\\cos\\theta,\\,\\sin\\theta)$",
            "The formula only works in quadrant I",
            "$\\tan\\theta$ should replace $\\cos\\theta$",
          ],
          "The unit-circle point is (x, y) = (cos θ, sin θ): cosine is the x-coordinate and sine is the y-coordinate — not the reverse.",
          "(\\sin\\theta,\\,\\cos\\theta)"
        ),
      ],
      independentPractice: [
        {
          ...formulaAnswer("y11adv-ucv-i1", "The unit-circle point at θ = π/6 is (cos θ, sin θ). Evaluate sin(π/6).", "\\sin\\left(\\frac{\\pi}{6}\\right)", "1/2", ["0.5"]),
          unitCircleDiagram: ucvPiOver6,
          hint: "Read the y-coordinate of the terminal point at θ = π/6.",
        },
        {
          ...formulaAnswer("y11adv-ucv-i2", "The terminal point at θ = π/2 is (0, 1). Evaluate sin(π/2).", "\\sin\\left(\\frac{\\pi}{2}\\right)", "1", []),
          unitCircleDiagram: ucvPiOver2,
          hint: "At θ = π/2 the point is at the top of the circle: (0, 1). The y-coordinate gives sin(π/2).",
        },
        {
          ...formulaAnswer("y11adv-ucv-i3", "Evaluate using the unit circle.", "\\cos\\pi", "-1", []),
          hint: "At θ = π the point is at (−1, 0). The x-coordinate gives cos(π).",
        },
        {
          ...formulaAnswer("y11adv-ucv-i4", "Evaluate using the unit circle.", "\\sin\\frac{3\\pi}{2}", "-1", []),
          hint: "At θ = 3π/2 the point is at the bottom of the circle: (0, −1). The y-coordinate gives sin(3π/2).",
        },
        practicalChoice(
          "y11adv-ucv-i5",
          "Which coordinate pair is the unit-circle point at $\\theta=\\frac{\\pi}{3}$?",
          "B",
          [
            "$\\left(\\frac{\\sqrt{3}}{2},\\,\\frac{1}{2}\\right)$",
            "$\\left(\\frac{1}{2},\\,\\frac{\\sqrt{3}}{2}\\right)$",
            "$\\left(\\frac{\\sqrt{2}}{2},\\,\\frac{\\sqrt{2}}{2}\\right)$",
            "$(0,\\,1)$",
          ],
          "At θ = π/3: x = cos(π/3) = 1/2 and y = sin(π/3) = √3/2. The point is (1/2, √3/2).",
          "\\theta=\\frac{\\pi}{3}"
        ),
      ],
      commonMistakes: [
        { mistake: "Writing the unit-circle point as (sin θ, cos θ) instead of (cos θ, sin θ).", fix: "Cosine is always the x-coordinate and sine is always the y-coordinate. x comes before y, and cosine comes before sine." },
        { mistake: "Reading sin(π/6) = √3/2 instead of 1/2.", fix: "The terminal point at π/6 is (√3/2, 1/2). Sine = y-coordinate = 1/2. The value √3/2 is sin(π/3)." },
        { mistake: "Saying tan(π/2) = 0 because sin(π/2) = 1.", fix: "tan(π/2) = sin(π/2)/cos(π/2) = 1/0. Division by zero is undefined, not zero." },
        { mistake: "Forgetting the boundary-angle coordinates.", fix: "Memorise the four axis points: (1,0), (0,1), (−1,0), (0,−1) at θ = 0, π/2, π, 3π/2." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-ucv2-qm1",
          prompt:
            "A terminal point has coordinates $\\left(\\dfrac{\\sqrt3}{2},\\dfrac12\\right)$. Which statement correctly reads its trigonometric values?",
          latex: "(x,y)=(\\cos\\theta,\\sin\\theta)",
          choices: [
            "$\\cos\\theta=\\dfrac12$ and $\\sin\\theta=\\dfrac{\\sqrt3}{2}$",
            "$\\cos\\theta=\\dfrac{\\sqrt3}{2}$ and $\\sin\\theta=\\dfrac12$",
            "$\\tan\\theta=\\dfrac{\\sqrt3}{2}$",
            "$\\cos\\theta=\\sin\\theta$",
          ],
          answer: "B",
          hint: "Match the first coordinate with cosine and the second coordinate with sine.",
          explanation:
            "The coordinate rule is $(x,y)=(\\cos\\theta,\\sin\\theta)$. Therefore the first coordinate gives $\\cos\\theta=\\sqrt3/2$ and the second gives $\\sin\\theta=1/2$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks the ordered-coordinate meaning of cosine and sine rather than recognition of an angle label alone.",
          distractorMisconceptions: {
            A: "Reverses the cosine and sine coordinate order.",
            C: "Treats an individual coordinate as tangent instead of forming y over x.",
            D: "Transfers the equal-coordinate property of the 45-degree point.",
          },
          unitCircleDiagram: ucvPiOver6,
        }),
        qualityAnswer({
          id: "y11adv-ucv2-qm2",
          prompt:
            "The terminal point for angle $\\theta$ is $\\left(\\dfrac{\\sqrt2}{2},\\dfrac{\\sqrt2}{2}\\right)$. Evaluate $\\tan\\theta$ exactly.",
          latex: "\\tan\\theta=\\frac{y}{x}",
          answer: "1",
          acceptedAnswers: ["1.0", "1/1", "$1$"],
          hint: "Divide the y-coordinate by the x-coordinate and simplify the equal factors.",
          explanation:
            "Tangent is the coordinate ratio $y/x$. Here the coordinates are equal and non-zero, so $\\tan\\theta=(\\sqrt2/2)/(\\sqrt2/2)=1$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks use of the coordinate ratio for tangent and simplification when the coordinates are equal.",
          unitCircleDiagram: ucvPiOver4,
        }),
        qualityChoice({
          id: "y11adv-ucv2-qm3",
          prompt:
            "At $\\theta=\\pi/2$, a student says $\\tan\\theta=0$ because the terminal point lies on an axis. Which correction is valid?",
          latex: "(\\cos\\theta,\\sin\\theta)=(0,1)",
          choices: [
            "$\\tan\\theta=0$ because every axis point has zero tangent",
            "$\\tan\\theta=1$ because the y-coordinate is 1",
            "$\\tan\\theta$ is undefined because $y/x=1/0$",
            "$\\tan\\theta=-1$ because the x-coordinate is not positive",
          ],
          answer: "C",
          hint: "Use $\\tan\\theta=y/x$ and inspect the denominator at the top axis point.",
          explanation:
            "At $\\pi/2$ the terminal point is $(0,1)$, so $\\tan\\theta=y/x=1/0$. Division by zero is undefined; the fact that the point lies on an axis does not make every ratio zero.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses confusion between a zero coordinate and a zero ratio, with explicit attention to division by zero.",
          distractorMisconceptions: {
            A: "Generalises incorrectly that all axis points have zero tangent.",
            B: "Uses the numerator alone and ignores the zero denominator.",
            D: "Assigns a sign from axis location without evaluating the coordinate ratio.",
          },
          unitCircleDiagram: ucvPiOver2,
        }),
        qualityAnswer({
          id: "y11adv-ucv2-qm4",
          prompt:
            "For $0\\le\\theta<2\\pi$, the terminal point is $(0,-1)$. Find $\\theta$ in radians.",
          latex: "(\\cos\\theta,\\sin\\theta)=(0,-1)",
          answer: "3pi/2",
          acceptedAnswers: ["3\\pi/2", "$\\frac{3\\pi}{2}$", "1.5pi", "270 degrees", "270°"],
          hint: "Locate the negative y-axis point and measure its anticlockwise angle from the positive x-axis.",
          explanation:
            "The point $(0,-1)$ is at the bottom of the circle on the negative y-axis. The anticlockwise angle from the positive x-axis is three quarters of a turn, so $\\theta=3\\pi/2$.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks reverse interpretation from an axis coordinate to its unique angle in a stated interval.",
          unitCircleDiagram: ucvThreePiOver2,
        }),
        qualityAnswer({
          id: "y11adv-ucv2-qm5",
          prompt:
            "A first-quadrant point has coordinates $(k,\\sqrt3k)$ and lies on the circle $x^2+y^2=1$. Find $k$.",
          latex: "k^2+(\\sqrt3k)^2=1",
          answer: "1/2",
          acceptedAnswers: ["0.5", "\\frac12", "$\\frac{1}{2}$", "one half"],
          hint: "Substitute both coordinates into $x^2+y^2=1$, then choose the sign consistent with quadrant I.",
          explanation:
            "The circle equation gives $k^2+3k^2=1$, so $4k^2=1$ and $k=\\pm1/2$. In quadrant I both coordinates are positive, hence $k=1/2$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Combines the unit-circle constraint with a coordinate parameter and requires selection of the quadrant-consistent root.",
          unitCircleDiagram: {
            description:
              "A first-quadrant unit-circle point labelled P equals open parenthesis k comma square root three k close parenthesis.",
            angleRadians: "\\theta",
            terminalPoint: { x: "k", y: "√3k", label: "(k, √3k)" },
            quadrant: 1,
            showReferenceTriangle: true,
            highlightRadius: true,
          },
        }),
        qualityChoice({
          id: "y11adv-ucv2-qm6",
          prompt:
            "Ari reads the point at $\\pi/3$ as $(1/2,\\sqrt3/2)$ and calculates tangent as $y/x=\\sqrt3$. Bea uses $\\sin(\\pi/3)/\\cos(\\pi/3)$. Which assessment is correct?",
          latex: "\\frac{y}{x}=\\frac{\\sin\\theta}{\\cos\\theta}",
          choices: [
            "Only Ari is correct because tangent must be read from coordinates",
            "Only Bea is correct because coordinate division reverses x and y",
            "Both are correct and each gives $\\sqrt3$",
            "Neither is correct because tangent is the x-coordinate",
          ],
          answer: "C",
          hint: "Substitute the same sine and cosine coordinates into both proposed ratios.",
          explanation:
            "Ari obtains $(\\sqrt3/2)/(1/2)=\\sqrt3$. Bea uses exactly the same ratio because $y=\\sin\\theta$ and $x=\\cos\\theta$. Both methods are equivalent.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks equivalence between coordinate slope and the sine-over-cosine definition of tangent.",
          distractorMisconceptions: {
            A: "Rejects the equivalent sine-over-cosine definition.",
            B: "Reverses the tangent ratio to x over y.",
            D: "Confuses tangent with an individual coordinate.",
          },
          unitCircleDiagram: ucvPiOver3,
        }),
        qualityAnswer({
          id: "y11adv-ucv2-qm7",
          prompt:
            "Let $P=\\left(\\dfrac{\\sqrt3}{2},\\dfrac12\\right)$ and $Q=\\left(\\dfrac12,\\dfrac{\\sqrt3}{2}\\right)$. Find the exact distance $PQ$.",
          latex: "PQ=\\sqrt{(x_Q-x_P)^2+(y_Q-y_P)^2}",
          answer: "(sqrt(6)-sqrt(2))/2",
          acceptedAnswers: ["(\\sqrt6-\\sqrt2)/2", "\\frac{\\sqrt6-\\sqrt2}{2}", "(sqrt(2)/2)(sqrt(3)-1)", "\\frac{\\sqrt2}{2}(\\sqrt3-1)"],
          hint: "The coordinate differences are opposites, so their squares are equal before taking the square root.",
          explanation:
            "The differences are $(1-\\sqrt3)/2$ and $(\\sqrt3-1)/2$. Thus $PQ=\\sqrt{2(\\sqrt3-1)^2/4}=(\\sqrt2/2)(\\sqrt3-1)=(\\sqrt6-\\sqrt2)/2$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Connects two benchmark terminal coordinates with exact coordinate geometry and radical simplification.",
        }),
        qualityAnswer({
          id: "y11adv-ucv2-qm8",
          prompt:
            "For integers $0\\le n\\le12$, define $P_n=(\\cos(n\\pi/24),\\sin(n\\pi/24))$. How many values of $n$ make both coordinates members of $\\{0,\\tfrac12,\\tfrac{\\sqrt2}{2},\\tfrac{\\sqrt3}{2},1\\}$?",
          latex: "P_n=\\left(\\cos\\frac{n\\pi}{24},\\sin\\frac{n\\pi}{24}\\right)",
          answer: "5",
          acceptedAnswers: ["5.0", "five", "5 values"],
          hint: "Within the first quadrant, identify which multiples of pi over twenty-four are standard benchmark angles.",
          explanation:
            "The benchmark angles in $[0,\\pi/2]$ are $0,\\pi/6,\\pi/4,\\pi/3,\\pi/2$. They correspond to $n=0,4,6,8,12$, respectively, so there are 5 valid values.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded angle family to distinguish benchmark coordinate pairs from non-standard first-quadrant points.",
        }),
        qualityAnswer({
          id: "y11adv-ucv2-qm9",
          prompt:
            "Find the exact area enclosed by $O=(0,0)$, $P=\\left(\\dfrac{\\sqrt3}{2},\\dfrac12\\right)$, and $Q=\\left(\\dfrac12,\\dfrac{\\sqrt3}{2}\\right)$.",
          latex: "A=\\frac12\\left|x_Py_Q-y_Px_Q\\right|",
          answer: "1/4",
          acceptedAnswers: ["0.25", "\\frac14", "$\\frac{1}{4}$", "one quarter"],
          hint: "Use the determinant area formula with O at the origin, then simplify the products.",
          explanation:
            "With $O$ at the origin, the determinant gives twice the signed area: $x_Py_Q-y_Px_Q=3/4-1/4=1/2$. Taking the absolute value and halving gives $A=1/4$ square unit.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Uses two unit-circle coordinate pairs as inputs to an exact determinant-area calculation.",
        }),
        qualityAnswer({
          id: "y11adv-ucv2-qm10",
          prompt:
            "A first-quadrant point $P=(x,y)$ satisfies $x^2+y^2=1$ and $x-y=\\dfrac{\\sqrt3-1}{2}$. Find the exact value of $xy$.",
          latex: "(x-y)^2=x^2+y^2-2xy",
          answer: "sqrt(3)/4",
          acceptedAnswers: ["\\sqrt3/4", "\\frac{\\sqrt3}{4}", "√3/4", "$\\frac{\\sqrt3}{4}$"],
          hint: "Square the given difference and use $x^2+y^2=1$ to isolate the product.",
          explanation:
            "Squaring gives $(x-y)^2=(\\sqrt3-1)^2/4=1-\\sqrt3/2$. Since $(x-y)^2=1-2xy$, we get $2xy=\\sqrt3/2$, hence $xy=\\sqrt3/4$.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires transforming a coordinate constraint to infer a product without solving for each coordinate separately.",
        }),
      ],
    };
  }

  if (lesson.slug === "unit-circle-all-quadrants") {
    const ucqQ2a: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 5π/6 in Q2. The reference angle π/6 is the acute angle between the terminal ray and the negative x-axis. The terminal point (−√3/2, 1/2) is labelled. In Q2 cosine is negative and sine is positive.",
      angleRadians: "5π/6",
      angleDegrees: "150",
      terminalPoint: { x: "-√3/2", y: "1/2", label: "(-√3/2, 1/2)" },
      quadrant: 2,
      referenceAngle: "π/6",
      showReferenceTriangle: true,
    };
    const ucqQ3a: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 7π/6 in Q3. The reference angle π/6 is the acute angle to the nearest x-axis. The terminal point (−√3/2, −1/2) is labelled. In Q3 both cosine and sine are negative, so tangent is positive.",
      angleRadians: "7π/6",
      angleDegrees: "210",
      terminalPoint: { x: "-√3/2", y: "-1/2", label: "(-√3/2, -1/2)" },
      quadrant: 3,
      referenceAngle: "π/6",
      showReferenceTriangle: true,
    };
    const ucqQ4a: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 5π/3 in Q4. The reference angle π/3 is marked. The terminal point (1/2, −√3/2) is labelled. In Q4 cosine is positive and sine is negative, so tangent is negative.",
      angleRadians: "5π/3",
      angleDegrees: "300",
      terminalPoint: { x: "1/2", y: "-√3/2", label: "(1/2, -√3/2)" },
      quadrant: 4,
      referenceAngle: "π/3",
      showReferenceTriangle: true,
    };
    const ucqQ4b: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 11 pi over 6 in quadrant four. Its reference angle pi over 6 is measured to the positive x-axis, and the terminal point is (square root three over two, negative one half).",
      angleRadians: "11π/6",
      angleDegrees: "330",
      terminalPoint: { x: "√3/2", y: "-1/2", label: "(√3/2, -1/2)" },
      quadrant: 4,
      referenceAngle: "π/6",
      showReferenceTriangle: true,
    };
    const ucqQ2b: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 5π/6 in Q2 with the reference angle π/6 marked at the x-axis.",
      angleRadians: "5π/6",
      angleDegrees: "150",
      terminalPoint: { x: "-√3/2", y: "1/2", label: "(-√3/2, 1/2)" },
      quadrant: 2,
      referenceAngle: "π/6",
    };
    const ucqQ3b: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 7π/6 in Q3. The reference angle π/6 is the acute angle to the nearest x-axis.",
      angleRadians: "7π/6",
      angleDegrees: "210",
      terminalPoint: { x: "-√3/2", y: "-1/2", label: "(-√3/2, -1/2)" },
      quadrant: 3,
      referenceAngle: "π/6",
    };
    const ucqQ3c: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 4π/3 in Q3. The reference angle π/3 is marked. The terminal point (−1/2, −√3/2) is labelled.",
      angleRadians: "4π/3",
      angleDegrees: "240",
      terminalPoint: { x: "-1/2", y: "-√3/2", label: "(-1/2, -√3/2)" },
      quadrant: 3,
      referenceAngle: "π/3",
    };
    const ucqQ3d: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the angle 5π/4 in Q3. The reference angle π/4 is marked. The terminal point (−√2/2, −√2/2) is labelled.",
      angleRadians: "5π/4",
      angleDegrees: "225",
      terminalPoint: { x: "-√2/2", y: "-√2/2", label: "(-√2/2, -√2/2)" },
      quadrant: 3,
      referenceAngle: "π/4",
    };
    return {
      ...base,
      description:
        "Use reference angles and ASTC to evaluate exact sin, cos, and tan values for angles in all four quadrants.",
      learningIntention:
        "Apply the three-step method — identify quadrant, find reference angle, apply ASTC sign — to evaluate exact trigonometric values in Q2, Q3, and Q4.",
      successCriteria: [
        "State the ASTC rule: All positive in Q1, Sine in Q2, Tangent in Q3, Cosine in Q4.",
        "Find the reference angle for any angle in Q2, Q3, or Q4.",
        "Evaluate exact sin, cos, and tan in all quadrants using the reference angle and ASTC sign.",
        "Explain why tan is positive in Q3 even though sin and cos are both negative.",
        "Apply related-angle rules: sin(π − θ) = sin θ; sin(π + θ) = −sin θ; sin(2π − θ) = −sin θ.",
      ],
      teaching: {
        paragraphs: [
          "ASTC tells you which ratios are positive in each quadrant: All in Q1, Sine in Q2, Tangent in Q3, Cosine in Q4.",
          "The reference angle is the acute angle between the terminal ray and the nearest x-axis. It determines the magnitude of the value.",
          "To find the reference angle: Q2 — use π − θ; Q3 — use θ − π; Q4 — use 2π − θ.",
          "In Q3 both sin and cos are negative. Their ratio tan = sin/cos = (−)/(−) = positive, so tangent is positive in Q3.",
          "Related-angle rules summarise the sign changes: sin(π − θ) = +sin θ; sin(π + θ) = −sin θ; sin(2π − θ) = −sin θ.",
        ],
        latexBlocks: [
          "\\text{ASTC: Q1 all, Q2 sin, Q3 tan, Q4 cos}",
          "\\text{Q2: ref}=\\pi-\\theta;\\quad\\text{Q3: ref}=\\theta-\\pi;\\quad\\text{Q4: ref}=2\\pi-\\theta",
          "\\sin(\\pi-\\theta)=\\sin\\theta,\\quad\\cos(\\pi-\\theta)=-\\cos\\theta",
          "\\sin(\\pi+\\theta)=-\\sin\\theta,\\quad\\cos(\\pi+\\theta)=-\\cos\\theta",
          "\\sin(2\\pi-\\theta)=-\\sin\\theta,\\quad\\cos(2\\pi-\\theta)=\\cos\\theta",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate cos(5π/6)",
          questionLatex: "\\cos\\left(\\frac{5\\pi}{6}\\right)",
          unitCircleDiagram: ucqQ2a,
          steps: [
            { explanation: "5π/6 is between π/2 and π — it is in Q2.", latex: "\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi\\implies\\text{Q2}" },
            { explanation: "Reference angle: π − 5π/6 = π/6.", latex: "\\text{ref}=\\pi-\\frac{5\\pi}{6}=\\frac{\\pi}{6}" },
            { explanation: "The magnitude is |cos(π/6)| = √3/2.", latex: "\\left|\\cos\\frac{\\pi}{6}\\right|=\\frac{\\sqrt{3}}{2}" },
            { explanation: "Cosine is negative in Q2 (ASTC: only sine positive in Q2).", latex: "\\cos\\frac{5\\pi}{6}=-\\frac{\\sqrt{3}}{2}" },
          ],
          finalAnswerLatex: "-\\frac{\\sqrt{3}}{2}",
        },
        {
          title: "Evaluate sin(7π/6)",
          questionLatex: "\\sin\\left(\\frac{7\\pi}{6}\\right)",
          unitCircleDiagram: ucqQ3a,
          steps: [
            { explanation: "7π/6 is between π and 3π/2 — it is in Q3.", latex: "\\pi<\\frac{7\\pi}{6}<\\frac{3\\pi}{2}\\implies\\text{Q3}" },
            { explanation: "Reference angle: 7π/6 − π = π/6.", latex: "\\text{ref}=\\frac{7\\pi}{6}-\\pi=\\frac{\\pi}{6}" },
            { explanation: "The magnitude is |sin(π/6)| = 1/2.", latex: "\\left|\\sin\\frac{\\pi}{6}\\right|=\\frac{1}{2}" },
            { explanation: "Sine is negative in Q3 (ASTC: only tangent positive in Q3).", latex: "\\sin\\frac{7\\pi}{6}=-\\frac{1}{2}" },
          ],
          finalAnswerLatex: "-\\frac{1}{2}",
        },
        {
          title: "Evaluate tan(5π/3)",
          questionLatex: "\\tan\\left(\\frac{5\\pi}{3}\\right)",
          unitCircleDiagram: ucqQ4a,
          steps: [
            { explanation: "5π/3 is between 3π/2 and 2π — it is in Q4.", latex: "\\frac{3\\pi}{2}<\\frac{5\\pi}{3}<2\\pi\\implies\\text{Q4}" },
            { explanation: "Reference angle: 2π − 5π/3 = π/3.", latex: "\\text{ref}=2\\pi-\\frac{5\\pi}{3}=\\frac{\\pi}{3}" },
            { explanation: "The magnitude is |tan(π/3)| = √3.", latex: "\\left|\\tan\\frac{\\pi}{3}\\right|=\\sqrt{3}" },
            { explanation: "Tangent is negative in Q4 (ASTC: only cosine positive in Q4).", latex: "\\tan\\frac{5\\pi}{3}=-\\sqrt{3}" },
          ],
          finalAnswerLatex: "-\\sqrt{3}",
        },
      ],
      guidedPractice: [
        {
          ...formulaAnswer("y11adv-ucq-g1", "Find the reference angle for the given angle.", "\\frac{5\\pi}{6}", "pi/6", ["\\pi/6", "π/6"]),
          unitCircleDiagram: ucqQ2b,
          hint: "5π/6 is in Q2. Reference angle = π − 5π/6.",
        },
        {
          ...formulaAnswer("y11adv-ucq-g2", "Find the reference angle for the given angle.", "\\frac{7\\pi}{6}", "pi/6", ["\\pi/6", "π/6"]),
          unitCircleDiagram: ucqQ3b,
          hint: "7π/6 is in Q3. Reference angle = 7π/6 − π.",
        },
        practicalChoice(
          "y11adv-ucq-g3",
          "Evaluate $\\cos\\!\\left(\\frac{2\\pi}{3}\\right)$.",
          "B",
          [
            "$\\frac{1}{2}$",
            "$-\\frac{1}{2}$",
            "$\\frac{\\sqrt{3}}{2}$",
            "$-\\frac{\\sqrt{3}}{2}$",
          ],
          "Reference angle of 2π/3 is π − 2π/3 = π/3. |cos(π/3)| = 1/2. Cosine is negative in Q2 → −1/2.",
          "\\cos\\left(\\frac{2\\pi}{3}\\right)"
        ),
        {
          ...formulaAnswer("y11adv-ucq-g4", "Find the reference angle for the given angle.", "\\frac{7\\pi}{4}", "pi/4", ["\\pi/4", "π/4"]),
          hint: "7π/4 is in Q4. Reference angle = 2π − 7π/4.",
        },
      ],
      independentPractice: [
        {
          ...formulaAnswer("y11adv-ucq-i1", "Evaluate using a reference angle.", "\\sin\\left(\\frac{5\\pi}{6}\\right)", "1/2", ["0.5"]),
          unitCircleDiagram: ucqQ2b,
          hint: "Reference angle of 5π/6 is π/6. Sine is positive in Q2.",
        },
        {
          ...formulaAnswer("y11adv-ucq-i2", "Evaluate using a reference angle.", "\\cos\\left(\\frac{4\\pi}{3}\\right)", "-1/2", ["-0.5"]),
          unitCircleDiagram: ucqQ3c,
          hint: "Reference angle of 4π/3 is π/3. Cosine is negative in Q3.",
        },
        {
          ...formulaAnswer("y11adv-ucq-i3", "Evaluate using a reference angle.", "\\tan\\left(\\frac{7\\pi}{6}\\right)", "sqrt(3)/3", ["1/sqrt(3)", "\\sqrt{3}/3"]),
          hint: "Reference angle of 7π/6 is π/6. Tangent is positive in Q3.",
        },
        {
          ...formulaAnswer("y11adv-ucq-i4", "Evaluate using a reference angle.", "\\cos\\left(\\frac{7\\pi}{4}\\right)", "sqrt(2)/2", ["\\sqrt{2}/2", "1/sqrt(2)"]),
          hint: "Reference angle of 7π/4 is π/4. Cosine is positive in Q4.",
        },
        practicalChoice(
          "y11adv-ucq-i5",
          "A student evaluates $\\sin\\!\\left(\\frac{5\\pi}{6}\\right)=-\\frac{1}{2}$. Identify the error.",
          "B",
          [
            "The reference angle should be $\\frac{\\pi}{4}$, not $\\frac{\\pi}{6}$",
            "In Q2 sine is positive, so $\\sin\\!\\left(\\frac{5\\pi}{6}\\right)=\\frac{1}{2}$",
            "$\\frac{5\\pi}{6}$ is in Q3, not Q2",
            "$\\sin\\!\\left(\\frac{5\\pi}{6}\\right)=\\frac{\\sqrt{3}}{2}$",
          ],
          "5π/6 is in Q2 (between π/2 and π). ASTC: sine is positive in Q2, so the answer is +1/2, not −1/2.",
          "\\sin\\left(\\frac{5\\pi}{6}\\right)"
        ),
      ],
      commonMistakes: [
        { mistake: "Measuring the reference angle from the y-axis instead of the x-axis.", fix: "The reference angle is always the acute angle between the terminal ray and the nearest part of the x-axis, not the y-axis." },
        { mistake: "Applying the Q1 magnitude without adjusting the sign.", fix: "Use ASTC to determine the sign in the given quadrant, then attach that sign to the Q1 magnitude." },
        { mistake: "Saying tan is negative in Q3 because sin and cos are both negative.", fix: "Negative divided by negative is positive. tan = sin/cos, so tan is positive in Q3 — this is what ASTC tells you." },
        { mistake: "Confusing which formula gives the reference angle in each quadrant.", fix: "Q2: ref = π − θ. Q3: ref = θ − π. Q4: ref = 2π − θ. In each case the result should be acute (between 0 and π/2)." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-ucqa-qm1",
          prompt:
            "Which evaluation of $\\cos(5\\pi/6)$ correctly combines its reference angle and quadrant sign?",
          latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)",
          choices: [
            "$\\dfrac{\\sqrt3}{2}$ because the reference angle is $\\pi/6$",
            "$-\\dfrac{\\sqrt3}{2}$ because cosine is negative in quadrant II",
            "$-\\dfrac12$ because the angle is measured from the negative x-axis",
            "$\\dfrac12$ because sine is positive in quadrant II",
          ],
          answer: "B",
          hint: "Find the QII reference angle, use the cosine magnitude at that angle, then apply the QII sign.",
          explanation:
            "The reference angle is $\\pi-5\\pi/6=\\pi/6$, so the cosine magnitude is $\\sqrt3/2$. Cosine is negative in quadrant II, giving $\\cos(5\\pi/6)=-\\sqrt3/2$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks the complete reference-angle process: quadrant, benchmark magnitude, and sign.",
          distractorMisconceptions: {
            A: "Uses the correct magnitude but omits the quadrant-II sign.",
            C: "Uses the sine magnitude for the pi-over-six reference angle.",
            D: "Transfers sine's positive quadrant-II sign and magnitude to cosine.",
          },
          unitCircleDiagram: ucqQ2a,
        }),
        qualityAnswer({
          id: "y11adv-ucqa-qm2",
          prompt: "Find the reference angle.",
          latex: "\\theta=\\frac{11\\pi}{6}",
          answer: "pi/6",
          acceptedAnswers: ["\\pi/6", "π/6", "$\\frac{\\pi}{6}$", "30 degrees", "30°"],
          hint: "The angle is in quadrant IV, so subtract it from one full turn.",
          explanation:
            "For a quadrant-IV angle the reference angle is $2\\pi-\\theta$. Therefore $2\\pi-11\\pi/6=12\\pi/6-11\\pi/6=\\pi/6$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks selection and execution of the quadrant-IV reference-angle construction.",
          unitCircleDiagram: ucqQ4b,
        }),
        qualityChoice({
          id: "y11adv-ucqa-qm3",
          prompt:
            "A student writes $\\sin(4\\pi/3)=\\sqrt3/2$ because the reference angle is $\\pi/3$. Which correction is valid?",
          latex: "\\sin\\left(\\frac{4\\pi}{3}\\right)",
          choices: [
            "The magnitude is wrong; it should be $1/2$",
            "The answer is correct because reference angles preserve every sign",
            "The magnitude is correct but sine is negative in quadrant III, so the value is $-\\sqrt3/2$",
            "The angle lies in quadrant IV, where sine is positive",
          ],
          answer: "C",
          hint: "Keep the benchmark magnitude separate from the sign determined by the quadrant.",
          explanation:
            "The reference angle is indeed $\\pi/3$, giving magnitude $\\sqrt3/2$. However, $4\\pi/3$ lies in quadrant III, where the y-coordinate and sine are negative, so the value is $-\\sqrt3/2$.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses the common mistake of carrying a first-quadrant magnitude across without applying the new sign.",
          distractorMisconceptions: {
            A: "Uses the cosine magnitude associated with a pi-over-three reference angle.",
            B: "Assumes reference angles preserve sign as well as magnitude.",
            D: "Misclassifies four pi over three as a quadrant-IV angle and reverses its sign rule.",
          },
          unitCircleDiagram: ucqQ3c,
        }),
        qualityAnswer({
          id: "y11adv-ucqa-qm4",
          prompt:
            "For $0\\le\\theta<2\\pi$, the terminal point is $\\left(-\\dfrac{\\sqrt2}{2},-\\dfrac{\\sqrt2}{2}\\right)$. Find $\\theta$.",
          latex: "(\\cos\\theta,\\sin\\theta)=\\left(-\\frac{\\sqrt2}{2},-\\frac{\\sqrt2}{2}\\right)",
          answer: "5pi/4",
          acceptedAnswers: ["5\\pi/4", "$\\frac{5\\pi}{4}$", "225 degrees", "225°"],
          hint: "Equal coordinate magnitudes give a pi-over-four reference angle; use the signs to choose the quadrant.",
          explanation:
            "Both coordinates are negative, so the point is in quadrant III. Equal magnitudes give reference angle $\\pi/4$. Hence $\\theta=\\pi+\\pi/4=5\\pi/4$.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Checks reverse inference from signed terminal coordinates to a unique angle in the specified interval.",
          unitCircleDiagram: ucqQ3d,
        }),
        qualityAnswer({
          id: "y11adv-ucqa-qm5",
          prompt:
            "For $0\\le\\theta<2\\pi$, $\\sin\\theta=-\\dfrac12$ and $\\cos\\theta<0$. Find $\\theta$.",
          latex: "\\sin\\theta=-\\frac12,\\quad \\cos\\theta<0",
          answer: "7pi/6",
          acceptedAnswers: ["7\\pi/6", "$\\frac{7\\pi}{6}$", "210 degrees", "210°"],
          hint: "The sine magnitude gives a pi-over-six reference angle; combine both signs to identify the quadrant.",
          explanation:
            "The magnitude $|\\sin\\theta|=1/2$ gives reference angle $\\pi/6$. Negative sine places the point in QIII or QIV, while negative cosine selects QIII. Thus $\\theta=\\pi+\\pi/6=7\\pi/6$.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Combines an exact magnitude with two sign constraints to identify a unique all-quadrant angle.",
          unitCircleDiagram: ucqQ3b,
        }),
        qualityChoice({
          id: "y11adv-ucqa-qm6",
          prompt:
            "Leah finds $\\tan(7\\pi/6)$ from its $\\pi/6$ reference angle and the QIII sign. Max divides the terminal coordinates $(-1/2)/(-\\sqrt3/2)$. Which assessment is correct?",
          latex: "\\tan\\left(\\frac{7\\pi}{6}\\right)",
          choices: [
            "Only Leah is correct because coordinate division cannot be used outside quadrant I",
            "Only Max is correct because ASTC gives signs but not magnitudes",
            "Both are correct and each gives $\\dfrac{\\sqrt3}{3}$",
            "Neither is correct because tangent is negative in quadrant III",
          ],
          answer: "C",
          hint: "Evaluate the coordinate quotient and compare it with the signed reference-angle value.",
          explanation:
            "Leah uses $|\\tan(\\pi/6)|=\\sqrt3/3$ and the positive QIII tangent sign. Max obtains $(-1/2)/(-\\sqrt3/2)=1/\\sqrt3=\\sqrt3/3$. Both methods agree.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Checks equivalence of ASTC/reference-angle reasoning and direct signed-coordinate division.",
          distractorMisconceptions: {
            A: "Incorrectly restricts coordinate ratios to quadrant I.",
            B: "Incorrectly claims reference angles cannot determine magnitude.",
            D: "Treats a negative divided by a negative as negative.",
          },
          unitCircleDiagram: ucqQ3a,
        }),
        qualityAnswer({
          id: "y11adv-ucqa-qm7",
          prompt:
            "Find the exact area enclosed by $O=(0,0)$, $P=\\left(-\\dfrac{\\sqrt3}{2},\\dfrac12\\right)$, and $Q=\\left(-\\dfrac{\\sqrt3}{2},-\\dfrac12\\right)$.",
          latex: "A=\\frac12\\left|x_Py_Q-y_Px_Q\\right|",
          answer: "sqrt(3)/4",
          acceptedAnswers: ["\\sqrt3/4", "\\frac{\\sqrt3}{4}", "√3/4", "$\\frac{\\sqrt3}{4}$"],
          hint: "Use the determinant area formula with O at the origin and retain the signs of both y-coordinates.",
          explanation:
            "The determinant is $x_Py_Q-y_Px_Q=\\sqrt3/4-(-\\sqrt3/4)=\\sqrt3/2$. Halving its absolute value gives area $\\sqrt3/4$ square unit.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Uses symmetric QII and QIII terminal coordinates in an exact signed-coordinate area calculation.",
        }),
        qualityAnswer({
          id: "y11adv-ucqa-qm8",
          prompt:
            "For integers $0\\le n\\le24$, let $\\theta_n=n\\pi/6$. How many values of $n$ make $\\tan\\theta_n$ defined and strictly positive?",
          latex: "\\theta_n=\\frac{n\\pi}{6}",
          answer: "8",
          acceptedAnswers: ["8.0", "eight", "8 values"],
          hint: "Classify one full cycle first, exclude axis angles, then account for repetition through four pi.",
          explanation:
            "Tangent is positive in QI and QIII. For $n=0,\\ldots,12$, the valid residues are $1,2,7,8$; the same pattern repeats for $n=13,\\ldots,24$. Thus $n=1,2,7,8,13,14,19,20$, giving 8 values.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Uses a bounded periodic family to combine quadrant signs, undefined axis cases, and systematic counting.",
        }),
        qualityAnswer({
          id: "y11adv-ucqa-qm9",
          prompt:
            "A terminal point starts at angle $5\\pi/6$ and is rotated anticlockwise by $\\pi/2$. Find the exact sum of the new point's coordinates.",
          latex: "\\frac{5\\pi}{6}+\\frac{\\pi}{2}=\\frac{4\\pi}{3}",
          answer: "-(1+sqrt(3))/2",
          acceptedAnswers: ["-(1+\\sqrt3)/2", "\\frac{-1-\\sqrt3}{2}", "(-1-sqrt(3))/2", "-(sqrt(3)+1)/2"],
          hint: "Find the new angle first, then use its reference angle and quadrant to write both coordinates.",
          explanation:
            "The new angle is $5\\pi/6+\\pi/2=4\\pi/3$. Its QIII coordinates are $(-1/2,-\\sqrt3/2)$, so their sum is $-(1+\\sqrt3)/2$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Links angular motion, exact reference-angle coordinates, quadrant signs, and symbolic combination.",
          unitCircleDiagram: ucqQ2a,
        }),
        qualityAnswer({
          id: "y11adv-ucqa-qm10",
          prompt:
            "For $0\\le\\theta<2\\pi$, suppose $|\\sin\\theta|=\\dfrac12$ and $\\tan\\theta<0$. Find the sum of all possible values of $\\theta$.",
          latex: "|\\sin\\theta|=\\frac12,\\quad \\tan\\theta<0",
          answer: "8pi/3",
          acceptedAnswers: ["8\\pi/3", "$\\frac{8\\pi}{3}$", "480 degrees", "480°"],
          hint: "List all angles with pi-over-six reference angle, then keep only quadrants where tangent is negative.",
          explanation:
            "The sine magnitude gives candidates $\\pi/6,5\\pi/6,7\\pi/6,11\\pi/6$. Tangent is negative in QII and QIV, leaving $5\\pi/6$ and $11\\pi/6$. Their sum is $16\\pi/6=8\\pi/3$.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires generating a complete solution family, filtering it by a second sign condition, and aggregating the results.",
        }),
      ],
    };
  }

  // ── PHASE 3 v2 SLOTS ────────────────────────────────────────────────────────

  if (lesson.slug === "trig-graph-amplitude-period") {
    const we1Graph: import("../types").CartesianGraph = {
      description:
        "y = 3 sin(x) on [0, 2π]. The wave oscillates between −3 and 3 — amplitude 3. The shape is identical to y = sin(x) but vertically stretched by a factor of 3.",
      xMin: 0, xMax: 2 * Math.PI, yMin: -3.5, yMax: 3.5,
      xStep: Math.PI / 2, yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        { kind: "sin", a: 1, b: 1, c: 0, d: 0, label: "y = sin(x)", description: "Base sine curve for comparison — amplitude 1." },
        { kind: "sin", a: 3, b: 1, c: 0, d: 0, label: "y = 3sin(x)", description: "Amplitude 3: maximum 3, minimum −3, same period 2π." },
      ],
    };
    const we2Graph: import("../types").CartesianGraph = {
      description:
        "y = cos(2x) on [0, 2π]. Two full cycles are shown because b = 2 halves the period to π. Key points: (0,1), (π/4,0), (π/2,−1), (3π/4,0), (π,1).",
      xMin: 0, xMax: 2 * Math.PI, yMin: -1.5, yMax: 1.5,
      xStep: Math.PI / 4, yStep: 0.5,
      xAxisLabel: "x",
      sinusoidals: [
        { kind: "cos", a: 1, b: 2, c: 0, d: 0, label: "y = cos(2x)", description: "Period π: two complete waves fit between 0 and 2π." },
      ],
    };
    const we3Graph: import("../types").CartesianGraph = {
      description:
        "y = −2 sin(3x) on [0, 2π/3] — one full period. Amplitude 2 (reflected), period 2π/3. The graph starts at 0 and immediately falls to its minimum of −2 (reflection of y = 2 sin(3x)).",
      xMin: 0, xMax: (2 * Math.PI) / 3, yMin: -2.5, yMax: 2.5,
      xStep: Math.PI / 6, yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        { kind: "sin", a: -2, b: 3, c: 0, d: 0, label: "y = −2sin(3x)", description: "Amplitude 2, reflected: starts at 0, minimum −2, maximum 2, period 2π/3." },
      ],
    };
    const i3Graph: import("../types").CartesianGraph = {
      description:
        "y = 3 cos(2x) on [0, π] — one full period. The wave oscillates between −3 and 3.",
      xMin: 0, xMax: Math.PI, yMin: -3.5, yMax: 3.5,
      xStep: Math.PI / 4, yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        { kind: "cos", a: 3, b: 2, c: 0, d: 0, label: "y = 3cos(2x)", description: "Amplitude 3, period π." },
      ],
    };
    const featureGraph: import("../types").CartesianGraph = {
      description:
        "An unlabelled sinusoidal curve on 0 to pi starts at the origin and rises. It passes through the key points (pi/4, 2), (pi/2, 0), (3pi/4, -2), and (pi, 0).",
      xMin: 0,
      xMax: Math.PI,
      yMin: -2.5,
      yMax: 2.5,
      xStep: Math.PI / 4,
      yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        {
          kind: "sin",
          a: 2,
          b: 2,
          c: 0,
          d: 0,
          description: "The unlabelled curve used in the question.",
        },
      ],
    };
    const methodComparisonGraph: import("../types").CartesianGraph = {
      description:
        "The graph of y = 5 cos(6x) shows consecutive crests at x = 0 and x = pi/3, with one complete wave between them.",
      xMin: 0,
      xMax: (2 * Math.PI) / 3,
      yMin: -5.5,
      yMax: 5.5,
      xStep: Math.PI / 6,
      yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        {
          kind: "cos",
          a: 5,
          b: 6,
          c: 0,
          d: 0,
          label: "y = 5cos(6x)",
          description: "The curve named in the question.",
        },
      ],
    };
    const simultaneousMaximaGraph: import("../types").CartesianGraph = {
      description:
        "Two labelled sinusoidal curves are drawn on 0 to 4pi. Their shared crest positions can be identified by comparing the repeating waves.",
      xMin: 0,
      xMax: 4 * Math.PI,
      yMin: -1.5,
      yMax: 1.5,
      xStep: Math.PI / 2,
      yStep: 0.5,
      xAxisLabel: "x",
      sinusoidals: [
        {
          kind: "sin",
          a: 1,
          b: 2,
          c: 0,
          d: 0,
          label: "f(x) = sin(2x)",
          description: "The first curve named in the question.",
        },
        {
          kind: "cos",
          a: -1,
          b: 4,
          c: 0,
          d: 0,
          label: "g(x) = -cos(4x)",
          description: "The second curve named in the question.",
        },
      ],
    };
    const ferrisWheelHeightGraph: import("../types").CartesianGraph = {
      description:
        "The displacement of a Ferris-wheel seat from the wheel centre is drawn over eight minutes. It starts at zero and completes three full oscillations between -12 and 12.",
      xMin: 0,
      xMax: 8,
      yMin: -13,
      yMax: 13,
      xStep: 1,
      yStep: 4,
      xAxisLabel: "time (minutes)",
      yAxisLabel: "displacement (metres)",
      sinusoidals: [
        {
          kind: "sin",
          a: 12,
          b: (3 * Math.PI) / 4,
          c: 0,
          d: 0,
          label: "h(t) = 12sin(bt)",
          description: "The displacement model stated in the question.",
        },
      ],
    };
    return {
      ...base,
      description:
        "Identify the amplitude and period of y = a sin(bx) and y = a cos(bx), and apply the formulas amplitude = |a| and period = 2π/b.",
      learningIntention:
        "Learn how the constants a and b in y = a sin(bx) control the vertical size (amplitude) and horizontal spacing (period) of the wave.",
      successCriteria: [
        "State the amplitude of y = a sin(bx) as |a|.",
        "State the period of y = sin(bx) or y = cos(bx) as $\\frac{2\\pi}{b}$.",
        "Explain why a negative value of a reflects the graph without changing the amplitude.",
        "State the maximum and minimum values of y = a sin(bx) + d.",
        "Find b given a required period.",
      ],
      teaching: {
        paragraphs: [
          "The amplitude of y = a sin(bx) is |a|. It measures the maximum displacement from the midline. A negative a reflects the graph but does not change the amplitude.",
          "The period of y = sin(bx) or y = cos(bx) is 2π/b. A larger b means the wave completes a cycle in less horizontal space — a shorter period.",
          "For y = sin(x) the period is 2π and the amplitude is 1. For y = 3 sin(2x) the amplitude is 3 and the period is 2π/2 = π.",
          "The maximum value of y = a sin(bx) is |a| and the minimum is −|a| (when d = 0).",
        ],
        latexBlocks: [
          "\\text{amplitude}=|a|",
          "\\text{period}=\\frac{2\\pi}{b}",
          "\\text{range}=[-|a|,\\,|a|]",
          "\\text{max}=|a|,\\quad\\text{min}=-|a|",
        ],
      },
      workedExamples: [
        {
          title: "Amplitude: y = 3 sin(x)",
          questionLatex: "y=3\\sin x",
          cartesianGraph: we1Graph,
          steps: [
            { explanation: "Identify a and b.", latex: "a=3,\\quad b=1" },
            { explanation: "Amplitude is |a|.", latex: "\\text{amplitude}=|3|=3" },
            { explanation: "Period is unchanged: b = 1.", latex: "\\text{period}=\\frac{2\\pi}{1}=2\\pi" },
            { explanation: "Range stretches from −3 to 3.", latex: "\\text{range}=[-3,3]" },
          ],
          finalAnswerLatex: "\\text{amp }3,\\;\\text{period }2\\pi\\\\\\text{range }[-3,3]",
        },
        {
          title: "Period: y = cos(2x)",
          questionLatex: "y=\\cos(2x)",
          cartesianGraph: we2Graph,
          steps: [
            { explanation: "Identify b = 2.", latex: "b=2" },
            { explanation: "Period = 2π/b.", latex: "\\text{period}=\\frac{2\\pi}{2}=\\pi" },
            { explanation: "Amplitude is unchanged: |a| = |1| = 1.", latex: "\\text{amplitude}=1" },
            { explanation: "Key points compress to fit in [0, π]: zero at π/4 and 3π/4, maximum at 0 and π.", latex: "\\text{zeros at }\\frac{\\pi}{4},\\,\\frac{3\\pi}{4}" },
          ],
          finalAnswerLatex: "\\text{amplitude }1,\\quad\\text{period }\\pi",
        },
        {
          title: "Both effects: y = −2 sin(3x)",
          questionLatex: "y=-2\\sin(3x)",
          cartesianGraph: we3Graph,
          steps: [
            { explanation: "Identify a = −2 and b = 3.", latex: "a=-2,\\quad b=3" },
            { explanation: "Amplitude is |a| — ignore the sign.", latex: "\\text{amplitude}=|-2|=2" },
            { explanation: "Period = 2π/b.", latex: "\\text{period}=\\frac{2\\pi}{3}" },
            { explanation: "Negative a reflects the graph: the curve opens downward first, going to −2 before reaching 2.", latex: "\\text{reflected: falls to }-2\\text{ first}" },
          ],
          finalAnswerLatex: "\\text{amp }2,\\;\\text{period }\\tfrac{2\\pi}{3}\\\\\\text{reflected}",
        },
      ],
      guidedPractice: [
        {
          ...formulaAnswer("y11adv-amp-g1", "State the amplitude.", "y=4\\cos x", "4", []),
          hint: "Amplitude = |a|. Read the coefficient of cos.",
        },
        {
          ...formulaAnswer("y11adv-amp-g2", "State the period.", "y=\\sin(3x)", "2pi/3", ["2\\pi/3", "2π/3"]),
          hint: "Period = 2π/b. Identify b = 3, then divide.",
        },
        {
          ...formulaAnswer("y11adv-amp-g3", "State the amplitude.", "y=-3\\sin x", "3", []),
          hint: "Amplitude = |a|. The negative sign causes reflection but does not change the amplitude.",
        },
        practicalChoice(
          "y11adv-amp-g4",
          "What is the period of $y=\\cos(4x)$?",
          "D",
          ["$8\\pi$", "$2\\pi$", "$4\\pi$", "$\\frac{\\pi}{2}$"],
          "Period = 2π/b = 2π/4 = π/2. Larger b gives a shorter period.",
          "y=\\cos(4x)"
        ),
      ],
      independentPractice: [
        {
          ...formulaAnswer("y11adv-amp-i1", "State the period.", "y=\\sin(2x)", "pi", ["\\pi", "π"]),
          hint: "Period = 2π/b = 2π/2.",
        },
        {
          ...formulaAnswer("y11adv-amp-i2", "State the amplitude.", "y=-5\\cos x", "5", []),
          hint: "Amplitude = |a| = |−5|.",
        },
        {
          ...formulaAnswer("y11adv-amp-i3", "The graph shows y = 3cos(2x). State the amplitude.", "y=3\\cos(2x)", "3", []),
          cartesianGraph: i3Graph,
          hint: "Read the maximum y-value from the graph.",
        },
        {
          ...formulaAnswer("y11adv-amp-i4", "State the maximum value.", "y=4\\sin x", "4", []),
          hint: "Maximum value = |a| (when d = 0).",
        },
        practicalChoice(
          "y11adv-amp-i5",
          "A student says $y=\\sin(3x)$ has period $6\\pi$. Identify the error.",
          "B",
          [
            "The student used the correct formula but made an arithmetic error",
            "Period $=2\\pi/b=2\\pi/3$, not $6\\pi$. The student multiplied instead of dividing",
            "The period of $y=\\sin(3x)$ is actually $3\\pi$",
            "There is no error — $6\\pi$ is correct",
          ],
          "Period = 2π/b = 2π/3. The student wrote 2π × b instead of 2π ÷ b.",
          "y=\\sin(3x)"
        ),
      ],
      commonMistakes: [
        { mistake: "Writing period = 2πb instead of 2π/b.", fix: "Period is divided by b, not multiplied. Bigger b means faster oscillation, so the period gets SHORTER." },
        { mistake: "Writing amplitude = a including the sign — e.g. −3 for y = −3sin(x).", fix: "Amplitude = |a|, always non-negative. y = −3sin(x) has amplitude 3." },
        { mistake: "Thinking y = sin(πx) has period π because b = π.", fix: "Period = 2π/π = 2, not π. Always divide 2π by b." },
        { mistake: "Confusing amplitude change with vertical shift.", fix: "Amplitude stretches the wave; vertical shift moves the midline. y = 3sin(x) still has midline y = 0." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-amp-qm1",
          prompt:
            "A student says $y=-4\\cos(3x)$ has amplitude $-4$ and period $6\\pi$. Which correction is complete?",
          latex: "y=-4\\cos(3x)",
          answer: "A",
          choices: [
            "Amplitude $4$ and period $\\frac{2\\pi}{3}$",
            "Amplitude $-4$ and period $\\frac{2\\pi}{3}$",
            "Amplitude $4$ and period $6\\pi$",
            "Amplitude $3$ and period $\\frac{\\pi}{2}$",
          ],
          hint:
            "Treat the vertical coefficient with an absolute value, and divide $2\\pi$ by the coefficient of $x$.",
          explanation:
            "Amplitude is $|a|=|-4|=4$; the negative sign reflects the curve but cannot make amplitude negative. The period is $\\frac{2\\pi}{b}=\\frac{2\\pi}{3}$, so the student also multiplied by $b$ instead of dividing.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses the two independent misconceptions of signed amplitude and multiplying rather than dividing when finding period.",
          distractorMisconceptions: {
            B: "Corrects the period but retains a signed amplitude.",
            C: "Corrects the amplitude but retains the multiply-by-b period error.",
            D: "Uses the horizontal coefficient as amplitude and applies an unrelated period.",
          },
        }),
        qualityAnswer({
          id: "y11adv-amp-qm2",
          prompt:
            "State the amplitude and period, in that order, of the function.",
          latex: "y=-3\\cos(4x)",
          answer: "3,pi/2",
          acceptedAnswers: [
            "3,\\pi/2",
            "(3,pi/2)",
            "amplitude 3, period pi/2",
            "3 and pi/2",
          ],
          hint:
            "Read $a$ and $b$ separately: amplitude is $|a|$ and period is $2\\pi/b$.",
          explanation:
            "Here $a=-3$ and $b=4$. Therefore the amplitude is $|-3|=3$, while the period is $\\frac{2\\pi}{4}=\\frac{\\pi}{2}$. The sign of $a$ affects orientation, not either requested magnitude.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks coordinated use of both defining formulas without confusing the vertical and horizontal coefficients.",
        }),
        qualityChoice({
          id: "y11adv-amp-qm3",
          prompt:
            "Which equation matches the displayed unlabelled curve?",
          latex: "0\\le x\\le\\pi",
          answer: "A",
          choices: [
            "$y=2\\sin(2x)$",
            "$y=2\\sin\\left(\\frac{x}{2}\\right)$",
            "$y=-2\\sin(2x)$",
            "$y=\\sin(2x)$",
          ],
          hint:
            "Use the maximum height for $|a|$, the direction from the origin for the sign, and the length of one wave for the period.",
          explanation:
            "The curve ranges from $-2$ to $2$, so its amplitude is 2. It starts at the origin and rises, ruling out the reflected option. One complete wave occupies $\\pi$, so $b=2$. Thus $y=2\\sin(2x)$.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests reconstruction of an equation from visual amplitude, orientation, and period rather than coefficient reading.",
          distractorMisconceptions: {
            B: "Inverts the horizontal coefficient and therefore assigns a much longer period.",
            C: "Reads the amplitude and period but reverses the initial direction.",
            D: "Reads the period but ignores the vertical scale.",
          },
          cartesianGraph: featureGraph,
        }),
        qualityAnswer({
          id: "y11adv-amp-qm4",
          prompt:
            "A controller is modelled by $y=a\\sin(bx)$ with $a>0$ and $b>0$. Its range is $[-7,7]$ and it repeats every $\\frac{5\\pi}{2}$ units. Find $ab$.",
          latex: "y=a\\sin(bx)",
          answer: "28/5",
          acceptedAnswers: ["5.6", "\\frac{28}{5}", "ab=28/5", "$\\frac{28}{5}$"],
          hint:
            "The range determines $a$. Then solve $2\\pi/b=5\\pi/2$ for $b$ before multiplying.",
          explanation:
            "The symmetric range gives amplitude $a=7$. From $\\frac{2\\pi}{b}=\\frac{5\\pi}{2}$, cross-multiplication gives $4=5b$, so $b=\\frac45$. Hence $ab=7\\cdot\\frac45=\\frac{28}{5}$.",
          difficulty: 3,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires combining range and period information to infer both parameters of an unshifted sinusoidal model.",
        }),
        qualityAnswer({
          id: "y11adv-amp-qm5",
          prompt:
            "The function $y=a\\sin(bx)$ has $a>0$, maximum value $6$, and exactly five complete cycles on $0\\le x\\le4\\pi$. Find $a+b$.",
          latex: "y=a\\sin(bx)",
          answer: "17/2",
          acceptedAnswers: ["8.5", "\\frac{17}{2}", "a+b=17/2", "$\\frac{17}{2}$"],
          hint:
            "The maximum gives $a$. Five cycles across a width of $4\\pi$ determine the period, then determine $b$.",
          explanation:
            "Since the midline is zero and $a>0$, the maximum gives $a=6$. Five cycles in width $4\\pi$ means period $T=\\frac{4\\pi}{5}$. Thus $b=\\frac{2\\pi}{T}=\\frac52$, and $a+b=6+\\frac52=\\frac{17}{2}$.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Tests reverse inference of two coefficients from a vertical extremum and a cycle count over a finite interval.",
        }),
        qualityChoice({
          id: "y11adv-amp-qm6",
          prompt:
            "For $y=5\\cos(6x)$, Lena calculates $2\\pi/6$. Omar reads the horizontal distance between consecutive crests. Whose method correctly finds the period?",
          latex: "y=5\\cos(6x)",
          answer: "C",
          choices: [
            "Lena only",
            "Omar only",
            "Both methods",
            "Neither method",
          ],
          hint:
            "A period can be obtained from the equation or measured between equivalent positions on consecutive cycles.",
          explanation:
            "Lena's coefficient method gives $T=\\frac{2\\pi}{6}=\\frac{\\pi}{3}$. The displayed consecutive crests occur at $x=0$ and $x=\\frac{\\pi}{3}$, so Omar measures the same horizontal distance. Both methods are valid.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Assesses whether algebraic and graphical definitions of period are recognised as equivalent evidence.",
          distractorMisconceptions: {
            A: "Accepts only the formula and does not recognise equivalent positions on a graph.",
            B: "Accepts graph reading but rejects the coefficient formula.",
            D: "Does not connect the horizontal coefficient or consecutive crests with period.",
          },
          cartesianGraph: methodComparisonGraph,
        }),
        qualityAnswer({
          id: "y11adv-amp-qm7",
          prompt:
            "Find the sum of all $x$-values in the interval where both functions attain their maximum value at the same time.",
          latex: "f(x)=\\sin(2x),\\quad g(x)=-\\cos(4x),\\quad 0\\le x\\le4\\pi",
          answer: "7pi",
          acceptedAnswers: ["7\\pi", "$7\\pi$", "7 pi"],
          hint:
            "Write a repeating formula for the maxima of each function, then keep the common values in the interval.",
          explanation:
            "$f$ is maximal when $x=\\frac\\pi4+k\\pi$. The reflected cosine $g$ is maximal when $x=\\frac\\pi4+\\frac{m\\pi}{2}$. Common maxima occur for even $m$, giving $\\frac\\pi4,\\frac{5\\pi}{4},\\frac{9\\pi}{4},\\frac{13\\pi}{4}$. Their sum is $7\\pi$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires coordinating two different periods and a reflection to identify and aggregate simultaneous extrema.",
          cartesianGraph: simultaneousMaximaGraph,
        }),
        qualityAnswer({
          id: "y11adv-amp-qm8",
          prompt:
            "For the family $f_n(x)=\\sin(nx)$, where $n$ is an integer satisfying $1\\le n\\le14$, find the sum of all $n$ for which $f_n$ completes an even whole number of cycles on $0\\le x\\le3\\pi$.",
          latex: "f_n(x)=\\sin(nx)",
          answer: "24",
          acceptedAnswers: ["n=4,8,12; sum=24", "4+8+12=24", "twenty-four"],
          hint:
            "The number of cycles is interval width divided by period: $3\\pi/(2\\pi/n)=3n/2$. Impose the even-integer condition.",
          explanation:
            "The cycle count is $\\frac{3n}{2}$. For this to be an even integer, $3n$ must be divisible by 4. Since 3 and 4 are coprime, $n$ must be a multiple of 4. The valid values are $4,8,12$, whose sum is $24$.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Tests systematic classification of a bounded parameter family through period, divisibility, and completeness conditions.",
        }),
        qualityAnswer({
          id: "y11adv-amp-qm9",
          prompt:
            "A Ferris-wheel seat has displacement from the wheel centre $h(t)=12\\sin(bt)$ metres, where $t$ is in minutes and $b>0$. It completes three revolutions in eight minutes. Find $b$ and the total vertical distance travelled in those eight minutes.",
          latex: "h(t)=12\\sin(bt)",
          answer: "3pi/4,144",
          acceptedAnswers: [
            "b=3pi/4, distance=144",
            "3\\pi/4,144 m",
            "b=\\frac{3\\pi}{4}; 144 metres",
          ],
          hint:
            "Three revolutions determine the period. During one full sine cycle, track the vertical travel from centre to top, bottom, and back to centre.",
          explanation:
            "Three cycles in eight minutes give $T=\\frac83$, so $b=\\frac{2\\pi}{T}=\\frac{3\\pi}{4}$. In one cycle the displacement travels $0\\to12\\to0\\to-12\\to0$, a total of 48 m. Across three cycles the distance is $3\\cdot48=144$ m.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates period inference with interpretation of total vertical travel, distinguishing distance from net displacement.",
          cartesianGraph: ferrisWheelHeightGraph,
        }),
        qualityAnswer({
          id: "y11adv-amp-qm10",
          prompt:
            "A design uses $y=a\\cos(bx)$, where $a$ and $b$ are positive integers. The product of the range width and the period is $12\\pi$, and $a+b=16$. Find $ab$.",
          latex: "y=a\\cos(bx)",
          answer: "48",
          acceptedAnswers: ["a=12,b=4,ab=48", "12 times 4", "forty-eight"],
          hint:
            "The range width is $2a$ and the period is $2\\pi/b$. Use their product to relate $a$ and $b$.",
          explanation:
            "Range width times period is $(2a)(2\\pi/b)=4\\pi a/b$. Setting this equal to $12\\pi$ gives $a=3b$. Then $a+b=16$ becomes $4b=16$, so $b=4$ and $a=12$. Therefore $ab=48$.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires translating two graph invariants into simultaneous parameter constraints and solving an integer design problem.",
        }),
      ],
    };
  }

  if (lesson.slug === "trig-graph-transformations") {
    const we1Graph: import("../types").CartesianGraph = {
      description:
        "y = 2 sin(x + π/3) + 1 on [0, 2π]. Amplitude 2, midline y = 1, range [−1, 3]. The curve is shifted left by π/3 compared to y = 2 sin(x) + 1.",
      xMin: 0, xMax: 2 * Math.PI, yMin: -1.5, yMax: 3.5,
      xStep: Math.PI / 2, yStep: 1,
      xAxisLabel: "x",
      lines: [{ kind: "linear", m: 0, b: 1, label: "midline y = 1" }],
      sinusoidals: [
        { kind: "sin", a: 2, b: 1, c: Math.PI / 3, d: 1, label: "y = 2sin(x + π/3) + 1", description: "Amplitude 2, phase shift −π/3 (left), midline y = 1, range [−1, 3]." },
      ],
    };
    const we2Graph: import("../types").CartesianGraph = {
      description:
        "y = 3 cos(2x − π/2) on [0, π] — one full period. Amplitude 3, period π, phase shift π/4 right. Range [−3, 3].",
      xMin: 0, xMax: Math.PI, yMin: -3.5, yMax: 3.5,
      xStep: Math.PI / 4, yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        { kind: "cos", a: 3, b: 2, c: -Math.PI / 2, d: 0, label: "y = 3cos(2x − π/2)", description: "Amplitude 3, period π, phase shift π/4 right." },
      ],
    };
    const we3Graph: import("../types").CartesianGraph = {
      description:
        "y = −sin(x) + 2 on [0, 2π]. Amplitude 1 (reflected), midline y = 2, range [1, 3]. The curve starts at the midline y = 2 and immediately falls.",
      xMin: 0, xMax: 2 * Math.PI, yMin: 0.5, yMax: 3.5,
      xStep: Math.PI / 2, yStep: 1,
      xAxisLabel: "x",
      lines: [{ kind: "linear", m: 0, b: 2, label: "midline y = 2" }],
      sinusoidals: [
        { kind: "sin", a: -1, b: 1, c: 0, d: 2, label: "y = −sin(x) + 2", description: "Reflected sine, midline y = 2, range [1, 3]." },
      ],
    };
    const i2Graph: import("../types").CartesianGraph = {
      description:
        "y = sin(x) + 2 on [0, 2π]. Midline y = 2, amplitude 1, range [1, 3].",
      xMin: 0, xMax: 2 * Math.PI, yMin: 0.5, yMax: 3.5,
      xStep: Math.PI / 2, yStep: 1,
      xAxisLabel: "x",
      lines: [{ kind: "linear", m: 0, b: 2, label: "midline y = 2" }],
      sinusoidals: [
        { kind: "sin", a: 1, b: 1, c: 0, d: 2, label: "y = sin(x) + 2", description: "Amplitude 1, midline y = 2, range [1, 3]." },
      ],
    };
    const transformedFeatureGraph: import("../types").CartesianGraph = {
      description:
        "An unlabelled sinusoidal curve on 0 to 2pi passes through the key points (0, -1), (pi/2, 1), (pi, 3), (3pi/2, 1), and (2pi, -1).",
      xMin: 0,
      xMax: 2 * Math.PI,
      yMin: -1.5,
      yMax: 3.5,
      xStep: Math.PI / 2,
      yStep: 1,
      xAxisLabel: "x",
      sinusoidals: [
        {
          kind: "sin",
          a: 2,
          b: 1,
          c: -Math.PI / 2,
          d: 1,
          description: "The unlabelled curve used in the question.",
        },
      ],
    };
    const inferredCosineGraph: import("../types").CartesianGraph = {
      description:
        "An unlabelled cosine-shaped curve has maximum value 7, minimum value -1, and consecutive maxima at x = pi/6 and x = 5pi/6.",
      xMin: 0,
      xMax: Math.PI,
      yMin: -1.5,
      yMax: 7.5,
      xStep: Math.PI / 6,
      yStep: 1,
      xAxisLabel: "x",
      lines: [{ kind: "linear", m: 0, b: 3, label: "midline" }],
      sinusoidals: [
        {
          kind: "cos",
          a: 4,
          b: 3,
          c: -Math.PI / 2,
          d: 3,
          description: "The unlabelled transformed cosine curve.",
        },
      ],
    };
    const tideGraph: import("../types").CartesianGraph = {
      description:
        "A tide-height curve ranges from 2 metres to 8 metres, repeats every 12 hours, and crosses its 5-metre midline upward at t = 3 hours.",
      xMin: 0,
      xMax: 15,
      yMin: 1.5,
      yMax: 8.5,
      xStep: 3,
      yStep: 1,
      xAxisLabel: "time (hours)",
      yAxisLabel: "height (metres)",
      lines: [{ kind: "linear", m: 0, b: 5, label: "midline" }],
      sinusoidals: [
        {
          kind: "sin",
          a: 3,
          b: Math.PI / 6,
          c: -Math.PI / 2,
          d: 5,
          description: "The tide curve described in the question.",
        },
      ],
    };
    return {
      ...base,
      description:
        "Identify the amplitude, period, phase shift, and vertical shift of y = a sin(bx + c) + d, and state the new range.",
      learningIntention:
        "Learn how each constant in y = a sin(bx + c) + d transforms the basic sine or cosine graph: a controls amplitude, b controls period, c introduces a phase shift, and d shifts the midline.",
      successCriteria: [
        "State the amplitude, period, phase shift, and vertical shift from the equation y = a sin(bx + c) + d.",
        "Calculate the phase shift as $-c/b$ and state its direction.",
        "State the range as $[d-|a|,\\,d+|a|]$.",
        "State the maximum and minimum values.",
        "Identify the error when a positive c is said to shift the graph to the right.",
      ],
      teaching: {
        paragraphs: [
          "The general form y = a sin(bx + c) + d adds two new transformations to amplitude and period: a phase shift and a vertical shift.",
          "The vertical shift is d — it moves the midline from y = 0 to y = d. The range becomes [d − |a|, d + |a|].",
          "The phase shift is −c/b. A positive c shifts the graph LEFT; a negative c shifts it RIGHT. This surprises many students who expect the opposite.",
          "For y = sin(x + π/3), c = π/3 and b = 1, so phase shift = −(π/3)/1 = −π/3 — the graph shifts π/3 to the LEFT.",
          "For y = cos(2x − π/2), rewrite as cos(2x + (−π/2)): c = −π/2, b = 2, phase shift = −(−π/2)/2 = π/4 RIGHT.",
        ],
        latexBlocks: [
          "y=a\\sin(bx+c)+d",
          "\\text{amplitude}=|a|,\\quad\\text{period}=\\frac{2\\pi}{b}",
          "\\text{phase shift}=-\\frac{c}{b}",
          "\\text{vertical shift}=d,\\quad\\text{midline: }y=d",
          "\\text{range}=[d-|a|,\\,d+|a|]",
        ],
      },
      workedExamples: [
        {
          title: "Phase shift and vertical shift: y = 2sin(x + π/3) + 1",
          questionLatex: "y=2\\sin\\!\\left(x+\\frac{\\pi}{3}\\right)+1",
          cartesianGraph: we1Graph,
          steps: [
            { explanation: "Identify a, b, c, d.", latex: "a=2,\\;b=1,\\;c=\\frac{\\pi}{3},\\;d=1" },
            { explanation: "Amplitude and period.", latex: "|a|=2,\\quad\\text{period}=\\frac{2\\pi}{1}=2\\pi" },
            { explanation: "Phase shift = −c/b = −(π/3)/1. Negative means LEFT.", latex: "\\text{phase shift}=-\\frac{\\pi}{3}\\;(\\text{left})" },
            { explanation: "Vertical shift d = 1. Range = [d−|a|, d+|a|].", latex: "\\text{range}=[1-2,\\,1+2]=[-1,3]" },
          ],
          finalAnswerLatex: "\\text{amp }2,\\;\\text{period }2\\pi,\\;\\text{shift }-\\tfrac{\\pi}{3}\\text{ left}\\\\\\text{range }[-1,3]",
        },
        {
          title: "Right phase shift: y = 3cos(2x − π/2)",
          questionLatex: "y=3\\cos\\!\\left(2x-\\frac{\\pi}{2}\\right)",
          cartesianGraph: we2Graph,
          steps: [
            { explanation: "Rewrite to identify c: subtract becomes adding a negative.", latex: "3\\cos\\!\\left(2x+\\left(-\\frac{\\pi}{2}\\right)\\right)\\implies c=-\\frac{\\pi}{2}" },
            { explanation: "Amplitude = 3, period = 2π/2 = π.", latex: "|a|=3,\\quad\\text{period}=\\pi" },
            { explanation: "Phase shift = −c/b = −(−π/2)/2 = π/4. Positive means RIGHT.", latex: "\\text{phase shift}=+\\frac{\\pi}{4}\\;(\\text{right})" },
            { explanation: "No vertical shift. Range stays [−3, 3].", latex: "d=0,\\;\\text{range}=[-3,3]" },
          ],
          finalAnswerLatex: "\\text{amp }3,\\;\\text{period }\\pi,\\;\\text{shift }+\\tfrac{\\pi}{4}\\text{ right}\\\\\\text{range }[-3,3]",
        },
        {
          title: "Vertical shift and reflection: y = −sin(x) + 2",
          questionLatex: "y=-\\sin x+2",
          cartesianGraph: we3Graph,
          steps: [
            { explanation: "a = −1, b = 1, c = 0, d = 2.", latex: "a=-1,\\;b=1,\\;c=0,\\;d=2" },
            { explanation: "Amplitude = |a| = 1 (reflected).", latex: "|a|=1" },
            { explanation: "No phase shift. Vertical shift d = 2 moves midline to y = 2.", latex: "\\text{midline: }y=2" },
            { explanation: "Range = [d−|a|, d+|a|] = [1, 3].", latex: "\\text{range}=[2-1,\\,2+1]=[1,3]" },
          ],
          finalAnswerLatex: "\\text{amplitude }1\\text{ (reflected)},\\;\\text{range }[1,3]",
        },
      ],
      guidedPractice: [
        {
          ...formulaAnswer("y11adv-shift-g1", "State the vertical shift.", "y=\\sin x+3", "3", []),
          hint: "Vertical shift is d. Look for the constant added outside the trig function.",
        },
        {
          ...formulaAnswer("y11adv-shift-g2", "State the size of the phase shift.", "y=\\cos\\!\\left(x-\\frac{\\pi}{4}\\right)", "pi/4", ["\\pi/4", "π/4"]),
          hint: "Rewrite as cos(x + (−π/4)): c = −π/4, b = 1. Phase shift = −c/b = π/4.",
        },
        {
          ...formulaAnswer("y11adv-shift-g3", "State the maximum value.", "y=2\\sin x+1", "3", []),
          hint: "Maximum = d + |a| = 1 + 2.",
        },
        practicalChoice(
          "y11adv-shift-g4",
          "In $y=\\sin\\!\\left(x+\\frac{\\pi}{6}\\right)$, the graph shifts in which direction?",
          "B",
          ["Right by $\\frac{\\pi}{6}$", "Left by $\\frac{\\pi}{6}$", "Up by $\\frac{\\pi}{6}$", "Down by $\\frac{\\pi}{6}$"],
          "Phase shift = −c/b = −(π/6)/1 = −π/6. A negative phase shift means left.",
          "y=\\sin\\!\\left(x+\\frac{\\pi}{6}\\right)"
        ),
      ],
      independentPractice: [
        {
          ...formulaAnswer("y11adv-shift-i1", "State the vertical shift.", "y=3\\cos(2x)-4", "-4", ["−4"]),
          hint: "Vertical shift d = −4. The negative moves the midline down.",
        },
        {
          ...formulaAnswer("y11adv-shift-i2", "The graph shows y = sin(x) + 2. State the maximum value.", "y=\\sin x+2", "3", []),
          cartesianGraph: i2Graph,
          hint: "Read the highest point on the graph. Maximum = d + |a|.",
        },
        {
          ...formulaAnswer("y11adv-shift-i3", "State the amplitude.", "y=4\\sin\\!\\left(x-\\frac{\\pi}{3}\\right)+1", "4", []),
          hint: "Amplitude = |a|. The phase shift and vertical shift do not affect amplitude.",
        },
        {
          ...formulaAnswer("y11adv-shift-i4", "State the minimum value.", "y=2\\cos\\!\\left(x+\\frac{\\pi}{4}\\right)-3", "-5", ["−5"]),
          hint: "Minimum = d − |a| = −3 − 2.",
        },
        practicalChoice(
          "y11adv-shift-i5",
          "A student says $y=\\sin\\!\\left(x+\\frac{\\pi}{3}\\right)$ shifts the graph to the right. Identify the error.",
          "A",
          ["A positive $c$ shifts LEFT; the graph moves $\\frac{\\pi}{3}$ to the left", "The student is correct — positive $c$ shifts right", "There is no shift — only amplitude changes", "The shift is in the vertical direction, not horizontal"],
          "Phase shift = −c/b = −π/3 — negative, so the graph moves left. Positive c always means left shift.",
          "y=\\sin\\!\\left(x+\\frac{\\pi}{3}\\right)"
        ),
      ],
      commonMistakes: [
        { mistake: "Saying y = sin(x + c) shifts right because the constant is added.", fix: "Positive c shifts LEFT. Phase shift = −c/b. For y = sin(x + π/3), shift = −π/3 (left π/3)." },
        { mistake: "Taking phase shift = c instead of −c/b.", fix: "Divide by b as well. For y = sin(2x + π/2), shift = −(π/2)/2 = −π/4 (left π/4), not π/2." },
        { mistake: "Computing range as [d, d + |a|] instead of [d − |a|, d + |a|].", fix: "The wave goes |a| units BELOW the midline too. Range = [d − |a|, d + |a|]." },
        { mistake: "Including the sign in the amplitude — writing a = −3 instead of 3.", fix: "Amplitude = |a|. y = −3sin(x) has amplitude 3, not −3." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-shift-qm1",
          prompt:
            "A student says $y=2\\sin(3x+\\pi)+4$ is shifted left by $\\pi$ because the constant inside is positive. Which correction is complete?",
          latex: "y=2\\sin(3x+\\pi)+4",
          answer: "B",
          choices: [
            "Shift right by $\\pi$; midline $y=4$",
            "Shift left by $\\frac{\\pi}{3}$; midline $y=4$",
            "Shift left by $\\pi$; midline $y=2$",
            "Shift right by $\\frac{\\pi}{3}$; midline $y=-4$",
          ],
          hint:
            "Factor the horizontal coefficient, or calculate $-c/b$. The constant outside the sine sets the midline.",
          explanation:
            "The phase shift is $-c/b=-\\pi/3$, so the curve moves left by $\\frac{\\pi}{3}$, not by $\\pi$. The outside constant is $d=4$, so the midline is $y=4$. Option B corrects both features.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Diagnoses failure to divide the horizontal translation by b while separately checking vertical-shift interpretation.",
          distractorMisconceptions: {
            A: "Reverses the translation direction and does not divide by b.",
            C: "Does not divide by b and confuses amplitude with the midline.",
            D: "Divides by b but reverses both the horizontal and vertical directions.",
          },
        }),
        qualityAnswer({
          id: "y11adv-shift-qm2",
          prompt:
            "State, in order, the amplitude, period, phase shift, and midline of the function.",
          latex: "y=-3\\cos\\!\\left(2x+\\frac{\\pi}{2}\\right)-4",
          answer: "3,pi,pi/4 left,-4",
          acceptedAnswers: [
            "3,\\pi,left pi/4,y=-4",
            "amplitude 3; period pi; shift left pi/4; midline -4",
            "(3,pi,-pi/4,-4)",
          ],
          hint:
            "Identify $a,b,c,d$, then use $|a|$, $2\\pi/b$, and $-c/b$. State the direction of the signed phase shift.",
          explanation:
            "Here $a=-3$, $b=2$, $c=\\frac\\pi2$, and $d=-4$. Thus amplitude is 3, period is $\\pi$, and phase shift is $-\\frac{\\pi/2}{2}=-\\frac\\pi4$, meaning left by $\\frac\\pi4$. The midline is $y=-4$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Checks coordinated extraction of all four transformation features, including sign and division in the phase shift.",
        }),
        qualityChoice({
          id: "y11adv-shift-qm3",
          prompt:
            "Which equation matches the displayed unlabelled curve?",
          latex: "0\\le x\\le2\\pi",
          answer: "A",
          choices: [
            "$y=2\\sin\\left(x-\\frac{\\pi}{2}\\right)+1$",
            "$y=2\\sin\\left(x+\\frac{\\pi}{2}\\right)+1$",
            "$y=2\\sin\\left(x-\\frac{\\pi}{2}\\right)-1$",
            "$y=\\sin\\left(x-\\frac{\\pi}{2}\\right)+1$",
          ],
          hint:
            "Use the maximum and minimum for amplitude and midline, then use the starting position to determine the phase direction.",
          explanation:
            "The maximum 3 and minimum $-1$ give amplitude 2 and midline 1. At $x=0$ the curve is at its minimum, which matches $2\\sin(-\\pi/2)+1=-1$. Therefore the inside shift is $x-\\frac\\pi2$, giving option A.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Tests reconstruction of a transformed equation from vertical features and phase position on an unlabelled curve.",
          distractorMisconceptions: {
            B: "Uses the opposite phase direction, placing a maximum at the origin.",
            C: "Reads the phase and amplitude but assigns the wrong midline.",
            D: "Reads the phase and midline but ignores the vertical stretch.",
          },
          cartesianGraph: transformedFeatureGraph,
        }),
        qualityAnswer({
          id: "y11adv-shift-qm4",
          prompt:
            "State the range and midline, in that order, of the transformed function.",
          latex: "y=4\\sin(3x-\\pi)+2",
          answer: "[-2,6],y=2",
          acceptedAnswers: [
            "-2<=y<=6,midline y=2",
            "range [-2,6], midline 2",
            "[-2,6],2",
          ],
          hint:
            "The inside transformation does not affect vertical values. Use $d-|a|$ and $d+|a|$ around the midline $y=d$.",
          explanation:
            "The amplitude is 4 and the vertical shift is 2. Therefore the wave extends from $2-4=-2$ to $2+4=6$, so its range is $[-2,6]$. Its midline is the vertically shifted axis $y=2$.",
          difficulty: 3,
          taskType: "synthesis",
          diagnosticIntent:
            "Checks whether horizontal transformations are correctly separated from the vertical range and midline calculation.",
        }),
        qualityAnswer({
          id: "y11adv-shift-qm5",
          prompt:
            "A transformed cosine is written $y=a\\cos(b(x-h))+d$ with $a>0$ and $b>0$. It has maximum $7$, minimum $-1$, and consecutive maxima at $x=\\frac\\pi6$ and $x=\\frac{5\\pi}{6}$. Find $a+b+d$.",
          latex: "y=a\\cos(b(x-h))+d",
          answer: "10",
          acceptedAnswers: ["a=4,b=3,d=3; sum=10", "4+3+3", "ten"],
          hint:
            "Use the extrema for amplitude and midline. The distance between consecutive maxima is one period.",
          explanation:
            "The amplitude is $(7-(-1))/2=4$ and the midline is $(7+(-1))/2=3$, so $a=4$ and $d=3$. The period is $5\\pi/6-\\pi/6=2\\pi/3$, hence $b=2\\pi/(2\\pi/3)=3$. Thus $a+b+d=10$.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Requires reverse inference of vertical and horizontal parameters from extrema and consecutive equivalent graph positions.",
          cartesianGraph: inferredCosineGraph,
        }),
        qualityChoice({
          id: "y11adv-shift-qm6",
          prompt:
            "For $y=2\\sin(4x+\\pi)+5$, Jaya uses $-c/b=-\\pi/4$. Leon factors the inside as $4(x+\\pi/4)$. Whose method correctly identifies the phase shift?",
          latex: "y=2\\sin(4x+\\pi)+5",
          answer: "C",
          choices: [
            "Jaya only",
            "Leon only",
            "Both methods",
            "Neither method",
          ],
          hint:
            "A factored form $b(x-h)$ and the formula $-c/b$ should encode the same horizontal translation.",
          explanation:
            "Jaya obtains the signed shift $-\\pi/4$, meaning left by $\\pi/4$. Leon's factorisation $4(x+\\pi/4)$ displays the same left shift because the zero of the bracket is $x=-\\pi/4$. Both methods are correct.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Assesses equivalence between the phase-shift formula and factorisation of the transformed input.",
          distractorMisconceptions: {
            A: "Accepts the formula but does not recognise the factored horizontal translation.",
            B: "Accepts factorisation but rejects the equivalent parameter formula.",
            D: "Does not connect either representation with a left shift of pi over four.",
          },
        }),
        qualityAnswer({
          id: "y11adv-shift-qm7",
          prompt:
            "Design $y=a\\sin(bx+c)+d$ with $a>0$, $b>0$, amplitude $2$, period $\\pi$, midline $y=3$, and an upward midline crossing at $x=\\frac\\pi4$. Use the value of $c$ with smallest absolute value. State $(a,b,c,d)$.",
          latex: "y=a\\sin(bx+c)+d",
          answer: "2,2,-pi/2,3",
          acceptedAnswers: [
            "(2,2,-pi/2,3)",
            "a=2,b=2,c=-pi/2,d=3",
            "2,2,-\\pi/2,3",
          ],
          hint:
            "Amplitude and midline give $a,d$; period gives $b$. At an upward midline crossing, set the sine input equal to zero.",
          explanation:
            "Amplitude gives $a=2$, midline gives $d=3$, and $2\\pi/b=\\pi$ gives $b=2$. For an upward crossing at $x=\\pi/4$, require $2(\\pi/4)+c=0$, so the least-magnitude choice is $c=-\\pi/2$. The tuple is $(2,2,-\\pi/2,3)$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires constructing all four parameters from independent vertical, period, direction, and location constraints.",
        }),
        qualityAnswer({
          id: "y11adv-shift-qm8",
          prompt:
            "For $f_n(x)=3\\sin\\left(2x+\\frac{n\\pi}{4}\\right)-1$, where $n$ is an integer satisfying $1\\le n\\le18$, find the sum of all $n$ for which $x=0$ is a maximum point.",
          latex: "f_n(x)=3\\sin\\left(2x+\\frac{n\\pi}{4}\\right)-1",
          answer: "30",
          acceptedAnswers: ["n=2,10,18; sum=30", "2+10+18=30", "thirty"],
          hint:
            "At $x=0$, require the sine input to be $\\pi/2$ modulo $2\\pi$, then solve the resulting congruence for the bounded integers.",
          explanation:
            "At $x=0$, a maximum requires $\\sin(n\\pi/4)=1$, so $n\\pi/4=\\pi/2+2k\\pi$. Hence $n=2+8k$. Within the stated bounds the values are $2,10,18$, and their sum is $30$.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Tests systematic investigation of a bounded phase-parameter family using periodic congruence and endpoint filtering.",
        }),
        qualityAnswer({
          id: "y11adv-shift-qm9",
          prompt:
            "A tide ranges from $2$ m to $8$ m, repeats every $12$ hours, and first crosses its midline upward at $t=3$ hours. Find the sum of all times in $0\\le t\\le15$ when the tide is at its midline.",
          latex: "h(t)=d+a\\sin(b(t-c))",
          answer: "27",
          acceptedAnswers: ["3+9+15=27", "t=3,9,15; sum=27", "27 hours"],
          hint:
            "Build the model from amplitude, midline, period, and the upward crossing. Midline crossings occur every half-period.",
          explanation:
            "The model is $h(t)=5+3\\sin(\\frac\\pi6(t-3))$: midline 5, amplitude 3, period 12, and upward crossing at 3. Midline crossings occur every 6 hours, giving $t=3,9,15$ in the interval. Their sum is $27$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates model construction from contextual features with repeated-event enumeration over a bounded time interval.",
          cartesianGraph: tideGraph,
        }),
        qualityAnswer({
          id: "y11adv-shift-qm10",
          prompt:
            "A function $y=a\\sin(bx+c)+d$ has $a>0$, $b>0$, range $[-2,10]$, period $\\frac{4\\pi}{3}$, and a minimum at $x=\\frac\\pi9$. If $c$ is the smallest non-negative value satisfying these conditions, find $abc$.",
          latex: "y=a\\sin(bx+c)+d",
          answer: "12pi",
          acceptedAnswers: ["12\\pi", "$12\\pi$", "a=6,b=3/2,c=4pi/3"],
          hint:
            "Infer $a$ and $b$ from range and period. At the stated minimum, set the sine input equal to $3\\pi/2$ modulo $2\\pi$.",
          explanation:
            "The range gives $a=(10-(-2))/2=6$. The period gives $b=2\\pi/(4\\pi/3)=3/2$. At $x=\\pi/9$, $bx=\\pi/6$; a minimum needs $bx+c=3\\pi/2$, so the least non-negative $c=4\\pi/3$. Hence $abc=6(3/2)(4\\pi/3)=12\\pi$.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires reconstructing three transformation parameters and resolving a periodic phase constraint before aggregation.",
        }),
      ],
    };
  }

  // ── Helper for new applied lessons (inline explanation, no lookup table) ──
  function qa(
    id: string, prompt: string, latex: string, answer: string,
    hint: string, explanation: string, acceptedAnswers: string[] = []
  ): PracticeQuestion {
    return {
      id, prompt, latex, answer,
      acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
      hint, explanation,
    };
  }

  // ── Right-angle trig applications ─────────────────────────────────────────
  if (lesson.slug === "right-angle-trig-applications") {
    const ladderTriangle: import("../types").TriangleDiagram = {
      description:
        "A right triangle models a ladder against a vertical wall. The ladder is the 10-metre hypotenuse, the ground angle is 35 degrees, and the vertical height is h.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 5, y: 0 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels: { AC: "10\\text{ m}", BC: "h" },
      angleLabels: { A: "35^\\circ" },
      rightAngleAt: "B",
      highlightedSides: ["AC", "BC"],
    };
    const buildingTriangle: import("../types").TriangleDiagram = {
      description:
        "A right triangle from an observer's eye level to a building. The horizontal distance is 20 metres, the elevation angle is 45 degrees, and x is the height above eye level.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 5, y: 0 },
      },
      vertexLabels: { A: "eye", B: "level", C: "top" },
      sideLabels: { AB: "20\\text{ m}", BC: "x" },
      angleLabels: { A: "45^\\circ" },
      rightAngleAt: "B",
      highlightedSides: ["AB", "BC"],
    };
    const towerObservationPair: import("../types").TrianglePairDiagram = {
      description:
        "Two right-triangle models share the same tower height. The nearer observer sees 60 degrees from horizontal, the farther observer sees 30 degrees, and the observers are 20 metres apart on the same line.",
      left: {
        description:
          "Near-observer triangle with horizontal distance x, tower height h, and elevation angle 60 degrees.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 5, y: 0 },
        },
        sideLabels: { AB: "x", BC: "h" },
        angleLabels: { A: "60^\\circ" },
        rightAngleAt: "B",
      },
      right: {
        description:
          "Far-observer triangle with horizontal distance x plus 20, tower height h, and elevation angle 30 degrees.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 5, y: 0 },
        },
        sideLabels: { AB: "x+20", BC: "h" },
        angleLabels: { A: "30^\\circ" },
        rightAngleAt: "B",
      },
      leftCaption: "\\text{near observer}",
      rightCaption: "\\text{far observer}",
      relationLabel: "\\text{observers }20\\text{ m apart}",
    };
    const methodTriangle: import("../types").TriangleDiagram = {
      description:
        "A right triangle has horizontal adjacent side 20 metres, elevation angle 60 degrees, and unknown vertical height h.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 5, y: 0 },
      },
      sideLabels: { AB: "20\\text{ m}", BC: "h", AC: "L" },
      angleLabels: { A: "60^\\circ" },
      rightAngleAt: "B",
    };
    const droneTrianglePair: import("../types").TrianglePairDiagram = {
      description:
        "A horizontal-plan triangle and a vertical elevation triangle for a drone. Ground observers A and B are 120 metres apart; bearings to the ground projection P are 030 degrees and 330 degrees, and the elevation from A is 30 degrees.",
      left: {
        description:
          "Horizontal plan with A and B 120 metres apart and ground projection P north of the segment; the bearing geometry gives 60-degree interior angles at A and B.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 2.5, y: 0.4 },
        },
        vertexLabels: { A: "A", B: "B", C: "P" },
        sideLabels: { AB: "120\\text{ m}" },
        angleLabels: { A: "60^\\circ", B: "60^\\circ" },
      },
      right: {
        description:
          "Vertical right triangle from observer A to the drone above P, with horizontal distance AP marked x, height h, and elevation angle 30 degrees.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 5, y: 0 },
        },
        vertexLabels: { A: "A", B: "P", C: "drone" },
        sideLabels: { AB: "x", BC: "h" },
        angleLabels: { A: "30^\\circ" },
        rightAngleAt: "B",
      },
      leftCaption: "\\text{horizontal plan}",
      rightCaption: "\\text{vertical section}",
      relationLabel: "\\text{shared distance }AP=x",
    };
    const multipartLadderTriangle: import("../types").TriangleDiagram = {
      description:
        "A right triangle models a 20-metre ladder against a vertical wall. The ladder is the hypotenuse and makes a 30-degree angle with level ground.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 5, y: 0 },
      },
      sideLabels: {
        AB: "b",
        BC: "h",
        AC: "20\\text{ m}",
      },
      angleLabels: { A: "30^\\circ" },
      rightAngleAt: "B",
      highlightedSides: ["AB", "BC", "AC"],
    };
    const shipDisplacementTriangle: import("../types").TriangleDiagram = {
      description:
        "A plan-view right triangle shows a ship travelling 5 kilometres north and then 5 kilometres east. The diagonal d joins the port to the ship.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 0, y: 0 },
        C: { x: 5, y: 0 },
      },
      vertexLabels: { A: "port", B: "turn", C: "ship" },
      sideLabels: {
        AB: "5\\text{ km N}",
        BC: "5\\text{ km E}",
        AC: "d",
      },
      rightAngleAt: "B",
      highlightedSides: ["AB", "BC", "AC"],
    };
    return {
      ...base,
      description:
        "Apply SOH CAH TOA to multi-step 2D problems; interpret and calculate angles of elevation and depression; read and write true bearings and compass bearings.",
      learningIntention:
        "Use right-angle trigonometry to solve practical problems involving heights, distances, angles of elevation and depression, and compass directions.",
      successCriteria: [
        "Apply sin, cos, and tan to find unknown sides and angles in right-angled triangles.",
        "Identify angles of elevation and depression and set up the correct right-triangle diagram.",
        "Convert between true bearings (three-figure) and compass bearings.",
        "Find the back bearing of a given true bearing.",
      ],
      teaching: {
        paragraphs: [
          "SOH CAH TOA: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj. Given any angle and one side of a right triangle, you can find the remaining sides. Given two sides, you can find the angle using inverse trig.",
          "The angle of elevation is the angle measured upward from horizontal to an object above. The angle of depression is the angle measured downward from horizontal to an object below. Both form a right angle with the vertical, so the same SOH CAH TOA rules apply.",
          "A true bearing is measured clockwise from north and written with three digits: 000° (North), 090° (East), 180° (South), 270° (West). N45°E in compass notation equals a true bearing of 045°.",
          "The back bearing is the bearing of the return journey. Add or subtract 180°: if the forward bearing is less than 180°, add 180°; if it is 180° or more, subtract 180°.",
        ],
        latexBlocks: [
          "\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}}",
          "\\text{Back bearing} = \\text{forward bearing} \\pm 180^\\circ",
        ],
      },
      workedExamples: [
        {
          title: "Find height using angle of elevation",
          questionLatex: "\\text{A ladder 14 m long makes 30° with the ground. Find the height reached.}",
          steps: [
            { explanation: "Identify opp (height h) and hyp (14 m). Use sin.", latex: "\\sin 30^\\circ = \\frac{h}{14}" },
            { explanation: "Substitute sin 30° = ½.", latex: "h = 14 \\times \\tfrac{1}{2} = 7 \\text{ m}" },
          ],
          finalAnswerLatex: "h = 7 \\text{ m}",
        },
        {
          title: "Find horizontal distance using angle of depression",
          questionLatex: "\\text{From a 25 m cliff, angle of depression to a boat is 45°. Find horizontal distance.}",
          steps: [
            { explanation: "The depression angle equals the elevation angle from the boat. tan 45° = height / distance.", latex: "\\tan 45^\\circ = \\frac{25}{d}" },
            { explanation: "tan 45° = 1, so d = 25.", latex: "d = 25 \\text{ m}" },
          ],
          finalAnswerLatex: "d = 25 \\text{ m}",
        },
        {
          title: "Find back bearing",
          questionLatex: "\\text{A ship sails on a bearing of 110°. Find the back bearing.}",
          steps: [
            { explanation: "110° < 180°, so add 180°.", latex: "110^\\circ + 180^\\circ = 290^\\circ" },
          ],
          finalAnswerLatex: "\\text{Back bearing} = 290^\\circ",
        },
      ],
      guidedPractice: [
        qa("y11adv-rat-g1", "A ladder 14 m long leans against a wall at 30° to the ground. Find the height it reaches.", "", "7", "The height is opposite the ground angle and the ladder is the hypotenuse, so use sine. Evaluate 14 sin 30°.", "The height is opposite the 30° angle and the 14 m ladder is the hypotenuse. Therefore h = 14 sin 30° = 14 × ½ = 7 m.", ["7 m", "7.0"]),
        practicalChoice("y11adv-rat-g2", "An angle measured downward from horizontal to an object below is called:", "C", ["angle of elevation", "azimuth", "angle of depression", "bearing"], "Elevation is upward; depression is downward. Both measured from horizontal."),
        qa("y11adv-rat-g3", "A pole 20 m tall stands 20 m from an observer on flat ground. Find the angle of elevation (in degrees).", "", "45", "The opposite and adjacent sides are both 20 m, so tan θ = 20/20. Use inverse tangent to find θ.", "The pole height is opposite the elevation angle and the ground distance is adjacent. Thus tan θ = 20/20 = 1, and θ = tan⁻¹(1) = 45°.", ["45°", "45 degrees"]),
        qa("y11adv-rat-g4", "State the true bearing of due South.", "", "180", "True bearings are measured clockwise from north. South is a half-turn from north, so write the result using three figures.", "Starting at north, a clockwise half-turn of 180° points due south. Since a true bearing uses three figures, the required bearing is 180°.", ["180°", "180 degrees"]),
      ],
      independentPractice: [
        qa("y11adv-rat-i1", "A rope 20 m long is attached to a stake and pulled taut at 30° above horizontal. How high above the ground is the other end?", "", "10", "The vertical height is opposite the 30° angle and the taut rope is the hypotenuse, so use the sine ratio.", "With height h opposite the 30° angle and hypotenuse 20 m, sin 30° = h/20. Hence h = 20 sin 30° = 20 × ½ = 10 m.", ["10 m", "10.0"]),
        qa("y11adv-rat-i2", "From the top of a 25 m cliff, the angle of depression to a boat is 45°. Find the horizontal distance from the cliff base to the boat.", "", "25", "The angle of elevation from the boat equals the 45° angle of depression. Use tangent with height 25 m and horizontal distance d.", "The boat's angle of elevation is also 45°. In the right triangle, tan 45° = 25/d. Since tan 45° = 1, solving gives d = 25 m.", ["25 m", "25.0"]),
        qa("y11adv-rat-i3", "A rope is tied from the top of an 18 m wall to the ground. The rope makes 30° with the vertical wall. Find the rope length.", "", "12sqrt(3)", "Relative to the 30° angle at the top, the 18 m wall is adjacent and the rope is the hypotenuse, so use cosine.", "The 18 m wall is adjacent to the 30° angle and the rope length L is the hypotenuse. Thus cos 30° = 18/L, so L = 18/cos 30° = 12√3 m, approximately 20.78 m.", ["12√3", "12√3 m", "20.78 m"]),
        qa("y11adv-rat-i4", "A ship sails on a bearing of 110°. What is its back bearing?", "", "290", "A back bearing reverses the direction by 180°. Since 110° is below 180°, add 180° and retain three-figure notation.", "The reverse course is a half-turn from the forward course. Because 110° < 180°, add 180°: 110° + 180° = 290°. Therefore the back bearing is 290°.", ["290°", "290 degrees"]),
        practicalChoice("y11adv-rat-i5", "The compass bearing SE corresponds to which true bearing?", "B", ["045°", "135°", "225°", "315°"], "SE is halfway between S (180°) and E (90°). True bearing = 90 + 45 = 135°."),
      ],
      commonMistakes: [
        { mistake: "Using sin when cos is needed — forgetting which side is opposite and which is adjacent.", fix: "Label the triangle first: identify the angle, then label opposite (across from angle) and adjacent (next to angle, not hypotenuse)." },
        { mistake: "Confusing angle of elevation with angle of depression.", fix: "Elevation is measured upward from horizontal; depression is downward. Both use the same right-triangle setup — draw a diagram." },
        { mistake: "Writing bearings without three digits (e.g., 45° instead of 045°).", fix: "True bearings are always three digits: pad with leading zeros as needed. 45° → 045°." },
        { mistake: "Subtracting 180° from a bearing less than 180° to find the back bearing.", fix: "If the bearing is less than 180°, ADD 180°. If it is 180° or more, subtract 180°. Always check the result is between 000° and 360°." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-rat-qm1",
          prompt:
            "A 10 m ladder makes a $35^\\circ$ angle with level ground. Which equation correctly models the vertical height $h$ reached?",
          latex: "\\text{ladder against a vertical wall}",
          answer: "A",
          choices: [
            "$\\sin35^\\circ=\\frac{h}{10}$",
            "$\\cos35^\\circ=\\frac{h}{10}$",
            "$\\tan35^\\circ=\\frac{10}{h}$",
            "$\\sin35^\\circ=\\frac{10}{h}$",
          ],
          hint:
            "Relative to the ground angle, identify the vertical side and the ladder before choosing a trigonometric ratio.",
          explanation:
            "The height $h$ is opposite the $35^\\circ$ angle and the 10 m ladder is the hypotenuse. SOH gives $\\sin35^\\circ=h/10$, so option A uses both side roles correctly.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks whether a learner labels opposite and hypotenuse from a spatial model before selecting a ratio.",
          distractorMisconceptions: {
            B: "Treats the vertical height as adjacent to the ground angle.",
            C: "Uses tangent despite the given hypotenuse and reverses the ratio.",
            D: "Selects sine but reverses opposite over hypotenuse.",
          },
          triangleDiagram: ladderTriangle,
        }),
        qualityAnswer({
          id: "y11adv-rat-qm2",
          prompt:
            "An observer's eye level is $1.6$ m above flat ground. From 20 m horizontally away, the angle of elevation to the top of a building is $45^\\circ$. Find the building height.",
          latex: "\\tan45^\\circ=\\frac{H-1.6}{20}",
          answer: "21.6",
          acceptedAnswers: ["21.6 m", "21.60", "H=21.6", "$21.6\\text{ m}$"],
          hint:
            "First find the vertical rise above eye level, then add the observer's eye height.",
          explanation:
            "The rise above eye level is $20\\tan45^\\circ=20$ m. The question asks for height above the ground, so add the 1.6 m eye level: $H=20+1.6=21.6$ m.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Tests a standard tangent calculation together with the often-missed eye-height adjustment.",
          triangleDiagram: buildingTriangle,
        }),
        qualityChoice({
          id: "y11adv-rat-qm3",
          prompt:
            "A vessel travels from port on a true bearing of $035^\\circ$. A student gives $145^\\circ$ as the back bearing. Which response best diagnoses the error?",
          latex: "\\text{forward bearing }035^\\circ",
          answer: "A",
          choices: [
            "Add $180^\\circ$ to obtain $215^\\circ$",
            "The student's $145^\\circ$ is correct",
            "Reflect in north to obtain $325^\\circ$",
            "Keep the same bearing because the route is unchanged",
          ],
          hint:
            "The return direction is a half-turn from the forward ray, not a reflection in a compass axis.",
          explanation:
            "A back bearing points in the opposite direction, so it differs by $180^\\circ$. Since $035^\\circ<180^\\circ$, add: $035^\\circ+180^\\circ=215^\\circ$. The student's $145^\\circ$ does not make a straight-line reversal.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Distinguishes the half-turn definition of a back bearing from subtraction and mirror-image errors.",
          distractorMisconceptions: {
            B: "Accepts an incorrect subtraction-based bearing.",
            C: "Reflects the direction across north instead of reversing it.",
            D: "Confuses retracing a route with retaining the forward direction.",
          },
          bearingsDiagram: {
            description:
              "A compass diagram from port showing only the forward course ray at true bearing 035 degrees.",
            originLabel: "port",
            rays: [
              {
                bearing: 35,
                label: "forward course",
                showAngle: true,
              },
            ],
          },
        }),
        qualityAnswer({
          id: "y11adv-rat-qm4",
          prompt:
            "A hiker walks 6 km due east and then 8 km due north. State the straight-line distance and the three-figure bearing of the hiker from the start.",
          latex: "\\text{east }6\\text{ km},\\quad\\text{north }8\\text{ km}",
          answer: "10,037",
          acceptedAnswers: [
            "10 km,037 degrees",
            "10,37",
            "distance 10 km; bearing 037",
            "10 km on a bearing of 037°",
          ],
          hint:
            "Use Pythagoras for the resultant length. For the bearing, measure the angle east of north using $\\tan\\theta=6/8$.",
          explanation:
            "The displacement is $\\sqrt{6^2+8^2}=10$ km. The bearing angle satisfies $\\tan\\theta=6/8$, so $\\theta\\approx36.87^\\circ$. Measured clockwise from north and written with three digits, the bearing is $037^\\circ$.",
          difficulty: 3,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines perpendicular displacement with correct north-referenced bearing convention and rounding.",
          bearingsDiagram: {
            description:
              "Compass-component diagram from the starting point showing an 8 km north component, a 6 km east component, and the north-east resultant whose bearing is to be found.",
            originLabel: "start",
            rays: [
              { bearing: 0, label: "north component 8 km", length: 0.8 },
              { bearing: 90, label: "east component 6 km", length: 0.6 },
              { bearing: 36.87, label: "resultant", length: 1, showAngle: true },
            ],
          },
        }),
        qualityAnswer({
          id: "y11adv-rat-qm5",
          prompt:
            "Two observers are on the same straight level line from a tower and are 20 m apart. The nearer angle of elevation is $60^\\circ$ and the farther angle is $30^\\circ$. Find the exact tower height.",
          latex: "\\text{near and far observations of one tower}",
          answer: "10sqrt(3)",
          acceptedAnswers: ["10\\sqrt3", "$10\\sqrt{3}$", "10√3 m", "17.32 m"],
          hint:
            "Let the nearer horizontal distance be $x$. Write one tangent equation from each observer and equate the two expressions for height.",
          explanation:
            "$h=x\\sqrt3$ from the nearer observer and $h=(x+20)/\\sqrt3$ from the farther. Equating gives $3x=x+20$, so $x=10$. Therefore $h=10\\sqrt3$ m.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Requires building and solving two linked right-triangle models that share an unknown height.",
          trianglePairDiagram: towerObservationPair,
        }),
        qualityChoice({
          id: "y11adv-rat-qm6",
          prompt:
            "For a right triangle with adjacent side 20 m and angle $60^\\circ$, Priya finds $h=20\\tan60^\\circ$. Luca first finds the hypotenuse using cosine, then uses Pythagoras for $h$. Whose method is valid?",
          latex: "\\text{find the opposite side }h",
          answer: "C",
          choices: [
            "Priya only",
            "Luca only",
            "Both methods",
            "Neither method",
          ],
          hint:
            "Check whether each method uses enough known information and preserves the same right triangle.",
          explanation:
            "Priya obtains $h=20\\sqrt3$ directly. Luca finds $L=20/\\cos60^\\circ=40$, then $h=\\sqrt{40^2-20^2}=20\\sqrt3$. Both methods are valid and agree.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Assesses whether direct trigonometry and a longer cosine-plus-Pythagoras strategy are recognised as equivalent.",
          distractorMisconceptions: {
            A: "Rejects a valid indirect method because it uses an extra step.",
            B: "Rejects the direct tangent ratio despite known opposite-adjacent roles.",
            D: "Does not verify either complete chain of right-triangle reasoning.",
          },
          triangleDiagram: methodTriangle,
        }),
        qualityAnswer({
          id: "y11adv-rat-qm7",
          prompt:
            "A boat travels 12 km on a bearing of $060^\\circ$, then 12 km on a bearing of $120^\\circ$. Find its distance and three-figure bearing from the start.",
          latex: "\\text{two equal legs}",
          answer: "12sqrt(3),090",
          acceptedAnswers: [
            "12\\sqrt3 km,090 degrees",
            "20.78 km,090",
            "12√3,90",
            "distance 12sqrt(3); bearing 090",
          ],
          hint:
            "Resolve each leg into east and north components. The north components have equal magnitude and opposite signs.",
          explanation:
            "Each east component is $12\\sin60^\\circ=6\\sqrt3$, so they total $12\\sqrt3$ km. The north components are $12\\cos60^\\circ=6$ and $12\\cos120^\\circ=-6$, so they cancel. The resultant is due east: distance $12\\sqrt3$ km, bearing $090^\\circ$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines bearing components across two legs and requires interpretation of cancellation in the resultant direction.",
          bearingsDiagram: {
            description:
              "Compass diagram comparing the two equal route directions at bearings 060 degrees and 120 degrees; their north-south components oppose and their east components reinforce.",
            originLabel: "direction comparison",
            rays: [
              { bearing: 60, label: "first 12 km leg", showAngle: true },
              { bearing: 120, label: "second 12 km leg", showAngle: true },
              { bearing: 90, label: "resultant direction", length: 0.9 },
            ],
          },
        }),
        qualityAnswer({
          id: "y11adv-rat-qm8",
          prompt:
            "Two equal route legs of length $L$ use bearings $n^\\circ$ and $(180-n)^\\circ$, where $n$ is a multiple of 10 satisfying $10\\le n\\le80$. Find the sum of all $n$ for which the resultant distance exceeds $\\frac32L$.",
          latex: "\\text{two equal bearing legs}",
          answer: "260",
          acceptedAnswers: ["50+60+70+80=260", "n=50,60,70,80; sum=260", "two hundred sixty"],
          hint:
            "The north components cancel and the east components add. Solve $2\\sin n^\\circ>3/2$ on the bounded list.",
          explanation:
            "The condition is $2L\\sin n^\\circ>1.5L$, or $\\sin n^\\circ>0.75$. Among the listed multiples of 10, this holds for $50^\\circ,60^\\circ,70^\\circ,80^\\circ$. Their sum is $260$.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Tests systematic investigation of a bounded bearing family after deriving a general resultant expression.",
          bearingsDiagram: {
            description:
              "Compass comparison for a representative acute value of n, showing equal directions labelled n degrees and 180 minus n degrees symmetrically about east; the drawing illustrates the component structure and is not a particular case to measure.",
            originLabel: "direction comparison",
            rays: [
              { bearing: 40, label: "bearing n degrees", showAngle: true },
              { bearing: 140, label: "bearing (180-n) degrees", showAngle: true },
              { bearing: 90, label: "resultant", length: 0.9 },
            ],
          },
        }),
        qualityAnswer({
          id: "y11adv-rat-qm9",
          prompt:
            "Observers A and B are 120 m apart on an east-west line. The ground projection of a drone is on bearing $030^\\circ$ from A and $330^\\circ$ from B. The drone's angle of elevation from A is $30^\\circ$. Find its exact height.",
          latex: "\\text{horizontal plan followed by a vertical section}",
          answer: "40sqrt(3)",
          acceptedAnswers: ["40\\sqrt3", "$40\\sqrt{3}$", "40√3 m", "69.28 m"],
          hint:
            "Use the two bearings to determine the horizontal triangle first. Then use the elevation angle in a vertical right triangle.",
          explanation:
            "Each bearing ray makes a $60^\\circ$ interior angle with the east-west baseline, so the horizontal triangle is equilateral and $AP=120$ m. In the vertical section, $h=120\\tan30^\\circ=120/\\sqrt3=40\\sqrt3$ m.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates a bearing-based horizontal plan with a separate elevation triangle to determine a three-dimensional height.",
          trianglePairDiagram: droneTrianglePair,
        }),
        qualityAnswer({
          id: "y11adv-rat-qm10",
          prompt:
            "A route has two 12 km legs on bearings $\\alpha$ and $(180^\\circ-\\alpha)$. Its resultant is 18 km due east. Find the total north-south distance travelled, adding the magnitudes of the northward and southward components.",
          latex: "0^\\circ<\\alpha<90^\\circ",
          answer: "6sqrt(7)",
          acceptedAnswers: ["6\\sqrt7", "$6\\sqrt{7}$", "6√7 km", "15.87 km"],
          hint:
            "Use the east resultant to find $\\sin\\alpha$. Then find $\\cos\\alpha$ and add the magnitudes of the two north components.",
          explanation:
            "The east components give $24\\sin\\alpha=18$, so $\\sin\\alpha=3/4$. Hence $\\cos\\alpha=\\sqrt{1-9/16}=\\sqrt7/4$. Each north-south component has magnitude $12\\cos\\alpha=3\\sqrt7$ km, so the total is $6\\sqrt7$ km.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires reverse component inference, exact Pythagorean recovery of cosine, and distinction between net and total directional travel.",
          bearingsDiagram: {
            description:
              "Compass comparison showing equal route directions labelled alpha and 180 degrees minus alpha, symmetric about east, together with the due-east resultant; the ray positions are illustrative rather than values to measure.",
            originLabel: "direction comparison",
            rays: [
              { bearing: 40, label: "bearing alpha", showAngle: true },
              {
                bearing: 140,
                label: "bearing (180-alpha)",
                showAngle: true,
              },
              { bearing: 90, label: "18 km resultant", length: 0.75 },
            ],
          },
        }),
      ],
      multiPartPractice: [
        {
          id: "y11adv-rat-mp1",
          prompt: "A ladder 20 m long leans against a vertical wall, making an angle of 30° with the ground.",
          latex: "\\text{Ladder length} = 20\\text{ m}, \\quad \\theta = 30^\\circ",
          answer: "10",
          hint: "Use sin for the height (opp/hyp) and cos for the base (adj/hyp). For part (c) change the angle to 45°.",
          explanation: "(a) h = 20 sin 30° = 10 m. (b) base = 20 cos 30° = 10√3 ≈ 17.3 m. (c) h at 45° = 20 sin 45° = 10√2 ≈ 14.1 m.",
          triangleDiagram: multipartLadderTriangle,
          parts: [
            { key: "a", label: "(a)", prompt: "Find the height the ladder reaches up the wall.", marks: 1, answer: "10", acceptedAnswers: ["10 m", "10.0"], hint: "The height is opposite the 30° angle and the ladder is the hypotenuse, so use sine.", explanation: "The height is opposite the 30° angle and the ladder is the hypotenuse. Therefore h = 20 sin 30° = 20 × ½ = 10 m." },
            { key: "b", label: "(b)", prompt: "Find the horizontal distance from the wall to the base of the ladder (to the nearest metre).", marks: 2, answer: "17", acceptedAnswers: ["17", "17.3", "10√3", "17.32"], hint: "cos 30° = base/20. cos 30° = √3/2.", explanation: "base = 20 cos 30° = 20 × (√3/2) = 10√3 ≈ 17.3 m. To nearest metre: 17 m." },
            { key: "c", label: "(c)", prompt: "If the angle is changed to 45° (same 20 m ladder), find the new height to the nearest metre.", marks: 1, answer: "14", acceptedAnswers: ["14", "14.1", "10√2", "14.14"], hint: "sin 45° = 1/√2.", explanation: "h = 20 sin 45° = 20/√2 = 10√2 ≈ 14.1 m. To nearest metre: 14 m." },
          ],
        },
        {
          id: "y11adv-rat-mp2",
          prompt: "A ship sails 5 km due North from port, then 5 km due East.",
          latex: "\\text{North: 5 km, East: 5 km}",
          answer: "7.07",
          hint: "The path forms a right angle. Use Pythagoras for (a). The bearing from port heads NE, so it is 045°. The back bearing is 045° + 180°.",
          explanation: "(a) distance = √(5²+5²) = 5√2 ≈ 7.07 km. (b) bearing = 045°. (c) back bearing = 225°.",
          triangleDiagram: shipDisplacementTriangle,
          parts: [
            { key: "a", label: "(a)", prompt: "Find the straight-line distance from port to the ship (to 2 decimal places).", marks: 1, answer: "7.07", acceptedAnswers: ["7.07 km", "7.1", "5√2", "7"], hint: "The north and east legs are perpendicular, so use Pythagoras on the two 5 km displacements.", explanation: "The north and east displacements form perpendicular legs. By Pythagoras, d = √(5² + 5²) = √50 = 5√2 ≈ 7.071, which rounds to 7.07 km." },
            { key: "b", label: "(b)", prompt: "State the true bearing from port to the ship.", marks: 1, answer: "045", acceptedAnswers: ["045°", "45", "45°"], hint: "The ship is equal distances north and east, so its direction is halfway between north and east.", explanation: "The north and east displacements are equal, so the resultant points north-east. Measured clockwise from north and written with three figures, the true bearing is 045°." },
            { key: "c", label: "(c)", prompt: "State the back bearing from the ship to port.", marks: 1, answer: "225", acceptedAnswers: ["225°", "225 degrees"], hint: "A back bearing is a 180° reversal of the forward bearing.", explanation: "The return direction is a half-turn from 045°. Adding 180° gives 045° + 180° = 225°, so the back bearing from the ship to port is 225°." },
          ],
        },
      ],
    };
  }

  // ── Sine rule, cosine rule and area formula ───────────────────────────────
  if (lesson.slug === "sine-rule-cosine-rule") {
    const cosineSelectionTriangle: import("../types").TriangleDiagram = {
      description:
        "A non-right triangle has sides AB equal to 7 and AC equal to 10, with included angle A equal to 60 degrees. The unknown side BC is labelled x.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 1.8, y: 0.3 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels: { AB: "7", AC: "10", BC: "x" },
      angleLabels: { A: "60^\\circ" },
      highlightedSides: ["AB", "AC", "BC"],
    };
    const sineRuleTriangle: import("../types").TriangleDiagram = {
      description:
        "A non-right triangle has angle A equal to 30 degrees, angle B equal to 45 degrees, side BC opposite A equal to 5, and side AC opposite B labelled b.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 2, y: 0.4 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels: { BC: "5", AC: "b" },
      angleLabels: { A: "30^\\circ", B: "45^\\circ" },
      highlightedSides: ["BC", "AC"],
    };
    const areaErrorTriangle: import("../types").TriangleDiagram = {
      description:
        "A non-right triangle has adjacent sides of 8 and 11 with their included angle equal to 40 degrees.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 1.8, y: 0.3 },
      },
      sideLabels: { AB: "8", AC: "11" },
      angleLabels: { A: "40^\\circ" },
      highlightedSides: ["AB", "AC"],
    };
    const linkedSineTriangle: import("../types").TriangleDiagram = {
      description:
        "Triangle ABC has angle A equal to 30 degrees, angle B equal to 60 degrees, and side BC opposite A equal to 6. Sides AC and AB are labelled b and c.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 0 },
        C: { x: 5, y: 3 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels: { BC: "6", AC: "b", AB: "c" },
      angleLabels: { A: "30^\\circ", B: "60^\\circ" },
      rightAngleAt: "C",
      highlightedSides: ["BC", "AC", "AB"],
    };
    const isoscelesAreaTriangle: import("../types").TriangleDiagram = {
      description:
        "An isosceles triangle has equal sides AC and BC of length 5, base AB of length 6, and included apex angle C labelled theta.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 2.5, y: 0.4 },
      },
      sideLabels: { AB: "6", AC: "5", BC: "5" },
      angleLabels: { C: "\\theta" },
      highlightedSides: ["AB", "AC", "BC"],
    };
    const methodComparisonTriangle: import("../types").TriangleDiagram = {
      description:
        "A non-right triangle has two sides of 7 and 8 with their included angle equal to 60 degrees. The third side is labelled x.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 2, y: 0.3 },
      },
      sideLabels: { AB: "7", AC: "8", BC: "x" },
      angleLabels: { A: "60^\\circ" },
      highlightedSides: ["AB", "AC", "BC"],
    };
    const angleFamilyTriangle: import("../types").TriangleDiagram = {
      description:
        "A family of non-right triangles has two fixed sides of lengths 3 and 5 enclosing a variable angle C. The opposite third side is labelled c.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 2, y: 0.3 },
      },
      vertexLabels: { A: "C" },
      sideLabels: { AB: "3", AC: "5", BC: "c" },
      angleLabels: { A: "C" },
      highlightedSides: ["AB", "AC", "BC"],
    };
    const parcelTrianglePair: import("../types").TrianglePairDiagram = {
      description:
        "A quadrilateral parcel is split by a shared 10-unit diagonal into a 6-8-10 right triangle and a triangle with two sides of 10 enclosing 60 degrees.",
      left: {
        description:
          "The first triangular region has perpendicular sides 6 and 8 and shared diagonal 10.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 5, y: 0 },
        },
        sideLabels: { AB: "8", BC: "6", AC: "10" },
        rightAngleAt: "B",
      },
      right: {
        description:
          "The second triangular region has two sides of 10 with included angle 60 degrees.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 2.5, y: 0.4 },
        },
        sideLabels: { AB: "10", AC: "10" },
        angleLabels: { A: "60^\\circ" },
      },
      leftCaption: "\\text{region 1}",
      rightCaption: "\\text{region 2}",
      relationLabel: "\\text{shared diagonal }10",
    };
    const medianTrianglePair: import("../types").TrianglePairDiagram = {
      description:
        "A 13-14-15 triangle is paired with the half-triangle formed by the median to the side of length 14.",
      left: {
        description:
          "Triangle ABC has AB equal to 13, BC equal to 14, and AC equal to 15.",
        vertices: {
          A: { x: 1.6, y: 0.3 },
          B: { x: 0, y: 3 },
          C: { x: 5, y: 3 },
        },
        vertexLabels: { A: "A", B: "B", C: "C" },
        sideLabels: { AB: "13", BC: "14", AC: "15" },
      },
      right: {
        description:
          "Triangle ABM uses AB equal to 13, BM equal to 7 because M is the midpoint of BC, and median AM labelled m.",
        vertices: {
          A: { x: 1.6, y: 0.3 },
          B: { x: 0, y: 3 },
          C: { x: 2.5, y: 3 },
        },
        vertexLabels: { A: "A", B: "B", C: "M" },
        sideLabels: { AB: "13", BC: "7", AC: "m" },
      },
      leftCaption: "\\triangle ABC",
      rightCaption: "\\triangle ABM",
      relationLabel: "M\\text{ is the midpoint of }BC",
    };
    const designTriangle: import("../types").TriangleDiagram = {
      description:
        "A non-right triangle has adjacent sides x and x plus 2, their included angle is 60 degrees, and the opposite side is square root 19.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 2, y: 0.3 },
      },
      sideLabels: {
        AB: "x",
        AC: "x+2",
        BC: "\\sqrt{19}",
      },
      angleLabels: { A: "60^\\circ" },
      highlightedSides: ["AB", "AC", "BC"],
    };
    const multipartRightTriangle: import("../types").TriangleDiagram = {
      description:
        "Triangle ABC has perpendicular sides a equal to 6 and b equal to 8 enclosing angle C equal to 90 degrees; side c is unknown.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 0 },
        C: { x: 5, y: 3 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels: { BC: "a=6", AC: "b=8", AB: "c" },
      rightAngleAt: "C",
      highlightedSides: ["AB", "AC", "BC"],
    };
    const multipartAngleTriangle: import("../types").TriangleDiagram = {
      description:
        "Triangle ABC has angle A equal to 30 degrees, angle B equal to 90 degrees, side a opposite A equal to 8, and the remaining side and angle labels shown.",
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 5, y: 0 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels: { BC: "a=8", AC: "b", AB: "c" },
      angleLabels: { A: "30^\\circ" },
      rightAngleAt: "B",
      highlightedSides: ["AB", "AC", "BC"],
    };
    return {
      ...base,
      description:
        "Apply the sine rule and cosine rule to non-right-angled triangles; use the area formula Area = ½ab sinC; choose the correct rule for a given triangle.",
      learningIntention:
        "Select and apply the sine rule, cosine rule, or area formula to find unknown sides, angles, and areas of non-right-angled triangles.",
      successCriteria: [
        "State and apply the sine rule a/sinA = b/sinB = c/sinC to find unknown sides or angles.",
        "State and apply the cosine rule a² = b² + c² − 2bc cosA to find unknown sides or angles.",
        "Calculate the area of a triangle using Area = ½ab sinC.",
        "Choose the appropriate rule given AAS, ASS, SAS, or SSS information.",
      ],
      teaching: {
        paragraphs: [
          "The sine rule connects each side to the sine of its opposite angle: a/sinA = b/sinB = c/sinC. Use it when you know two angles and a side (AAS), or two sides and a non-included angle (ASS).",
          "The cosine rule connects three sides and one angle: a² = b² + c² − 2bc cosA. Use it when you know two sides and the included angle (SAS) or all three sides (SSS). When A = 90°, cos 90° = 0 and the rule reduces to Pythagoras.",
          "The area formula Area = ½ab sinC uses two sides and their included angle. It replaces base × height / 2 when the perpendicular height is not given directly.",
          "Decision guide: AAS → sine rule. SSS or SAS → cosine rule. Two sides + included angle + want area → area formula. Two sides + non-included angle → sine rule (but watch for the ambiguous case).",
        ],
        latexBlocks: [
          "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} \\quad \\text{(sine rule)}",
          "a^2 = b^2 + c^2 - 2bc\\cos A \\quad \\text{(cosine rule)}",
          "\\text{Area} = \\tfrac{1}{2}ab\\sin C",
        ],
      },
      workedExamples: [
        {
          title: "Sine rule — find a side (AAS)",
          questionLatex: "A=30^\\circ,\\; B=90^\\circ,\\; a=10.\\quad\\text{Find }b.",
          steps: [
            { explanation: "Set up the sine rule for sides a and b.", latex: "\\frac{b}{\\sin B} = \\frac{a}{\\sin A}" },
            { explanation: "Substitute and solve.", latex: "b = \\frac{10 \\times \\sin 90^\\circ}{\\sin 30^\\circ} = \\frac{10 \\times 1}{\\tfrac{1}{2}} = 20" },
          ],
          finalAnswerLatex: "b = 20",
        },
        {
          title: "Area formula — two sides and included angle",
          questionLatex: "a=10,\\; b=6,\\; C=30^\\circ.\\quad\\text{Find the area.}",
          steps: [
            { explanation: "Apply the area formula with the included angle C.", latex: "\\text{Area} = \\tfrac{1}{2}(10)(6)\\sin 30^\\circ" },
            { explanation: "sin 30° = ½.", latex: "= 30 \\times \\tfrac{1}{2} = 15 \\text{ sq units}" },
          ],
          finalAnswerLatex: "\\text{Area} = 15",
        },
        {
          title: "Cosine rule — find a side (SAS with right angle)",
          questionLatex: "b=3,\\; c=4,\\; A=90^\\circ.\\quad\\text{Find }a.",
          steps: [
            { explanation: "Apply the cosine rule. cos 90° = 0.", latex: "a^2 = 9 + 16 - 2(3)(4)\\cos 90^\\circ = 25 - 0 = 25" },
            { explanation: "Take the positive square root.", latex: "a = 5" },
          ],
          finalAnswerLatex: "a = 5",
        },
      ],
      guidedPractice: [
        qa("y11adv-nra-g1", "$a=6$, $b=4$, $C=30°$. Find the area of the triangle.", "", "6", "The given angle C is included between sides a and b, so substitute directly into the sine area formula.", "Using the included angle, Area = ½ab sin C = ½(6)(4)sin 30° = 12 × ½ = 6 square units.", ["6 square units", "6 units^2"]),
        practicalChoice("y11adv-nra-g2", "You know two angles and one side (AAS). Which rule should you use to find the remaining sides?", "A", ["Sine rule", "Cosine rule", "Area formula", "Pythagoras"], "The sine rule a/sinA = b/sinB works directly with AAS information."),
        qa("y11adv-nra-g3", "In a triangle, $A=30°$, $B=90°$, $a=10$. Find side $b$ using the sine rule.", "", "20", "Pair side a with angle A and side b with angle B, then rearrange the sine rule to make b the subject.", "The sine rule gives b/sin 90° = 10/sin 30°. Therefore b = 10 sin 90°/sin 30° = 10/(½) = 20.", ["b=20", "20 units"]),
        practicalChoice("y11adv-nra-g4", "You know two sides and the angle between them (SAS). Which rule gives the third side?", "B", ["Sine rule", "Cosine rule", "Area formula", "Pythagoras"], "The cosine rule a² = b² + c² − 2bc cosA is designed for SAS situations."),
      ],
      independentPractice: [
        qa("y11adv-nra-i1", "$a=8$, $b=8$, $C=90°$. Find the area.", "", "32", "The 90° angle is included between the two known sides, so use Area = ½ab sin C and recall sin 90° = 1.", "Area = ½(8)(8)sin 90° = 32 × 1 = 32 square units. This agrees with half the area of an 8 by 8 rectangle.", ["32 square units", "32 units^2"]),
        qa("y11adv-nra-i2", "In a triangle, $A=30°$, $B=90°$, $a=12$. Find $b$.", "", "24", "Use the known opposite pair a and A with the target pair b and B in the sine rule.", "From b/sin 90° = 12/sin 30°, b = 12 sin 90°/sin 30° = 12/(½) = 24.", ["b=24", "24 units"]),
        practicalChoice("y11adv-nra-i3", "In triangle with $b=4$, $c=4$, $A=60°$, apply the cosine rule to find $a$. Which is correct?", "B", ["$a=8$", "$a=4$", "$a=2$", "$a=6$"], "a² = 16+16 − 2(16)(½) = 32−16 = 16. a = 4. Equilateral when b=c=a=4 and A=60°.", ""),
        qa("y11adv-nra-i4", "$a=10$, $b=6$, $C=30°$. Find the area.", "", "15", "Sides a and b enclose angle C, so they can be substituted directly into Area = ½ab sin C.", "Area = ½(10)(6)sin 30° = 30 × ½ = 15 square units. The included angle is the angle required by the formula.", ["15 square units", "15 units^2"]),
        practicalChoice("y11adv-nra-i5", "All three sides are known (SSS). Which rule can find an angle?", "B", ["Sine rule (directly)", "Cosine rule (rearranged)", "Area formula", "Pythagoras"], "Rearrange the cosine rule: cosA = (b²+c²−a²)/(2bc) to find any angle from three sides."),
      ],
      commonMistakes: [
        { mistake: "Using the sine rule when the SAS case requires the cosine rule.", fix: "If the angle given is between the two known sides, use the cosine rule. The sine rule needs an opposite angle-side pair." },
        { mistake: "Forgetting sin 90° = 1, making the cosine rule calculation harder than it needs to be.", fix: "When A = 90°, the cosine rule reduces to Pythagoras. Use a² = b² + c² directly." },
        { mistake: "Confusing the included angle with a non-included angle in the area formula.", fix: "Area = ½ab sinC requires C to be the angle between sides a and b — the included angle." },
        { mistake: "Setting up a/sinA = b/sinB with the wrong pair (side opposite a different angle).", fix: "Each side is always paired with the sine of its opposite angle. Label the triangle clearly before substituting." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-nra-qm1",
          prompt:
            "Which method finds the unknown side $x$ from the displayed triangle without first finding another angle?",
          latex: "\\text{select the direct method}",
          answer: "B",
          choices: [
            "Sine rule using $\\frac{x}{\\sin60^\\circ}=\\frac7{\\sin A}$",
            "Cosine rule using $x^2=7^2+10^2-2(7)(10)\\cos60^\\circ$",
            "Area formula using $\\frac12(7)(10)\\sin60^\\circ$",
            "Pythagoras using $x^2=7^2+10^2$",
          ],
          hint:
            "Identify the information pattern: two sides and their included angle are known, while the third side is required.",
          explanation:
            "This is an SAS configuration, so the cosine rule directly links the two known sides, their included angle, and the opposite unknown side. Option B gives $x^2=49+100-70=79$. The sine rule lacks a known opposite pair, the area formula gives area rather than $x$, and the triangle is not right-angled.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks rule selection from the structure of a labelled triangle rather than from a memorised wording cue.",
          distractorMisconceptions: {
            A: "Uses the sine rule without a complete known side-opposite-angle pair.",
            C: "Selects a valid formula for the givens but one that does not produce the requested side.",
            D: "Treats an arbitrary included angle as a right angle.",
          },
          triangleDiagram: cosineSelectionTriangle,
        }),
        qualityAnswer({
          id: "y11adv-nra-qm2",
          prompt:
            "Use the sine rule to find the exact value of side $b$ in the displayed triangle.",
          latex: "\\text{give an exact value}",
          answer: "5sqrt(2)",
          acceptedAnswers: ["5\\sqrt2", "$5\\sqrt{2}$", "5√2", "7.071"],
          hint:
            "Pair side 5 with its opposite $30^\\circ$ angle and side $b$ with its opposite $45^\\circ$ angle.",
          explanation:
            "The sine rule gives $b/\\sin45^\\circ=5/\\sin30^\\circ$. Hence $b=5(\\sqrt2/2)/(1/2)=5\\sqrt2$. Pairing each side with its genuinely opposite angle is the essential setup step.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Tests accurate opposite-pair matching and exact-value simplification in a direct sine-rule calculation.",
          triangleDiagram: sineRuleTriangle,
        }),
        qualityChoice({
          id: "y11adv-nra-qm3",
          prompt:
            "For the displayed triangle, a student writes $K=\\frac12(8)(11)\\sin50^\\circ$. Which assessment is correct?",
          latex: "\\text{student area model}",
          answer: "B",
          choices: [
            "Correct, because $50^\\circ$ is complementary to the shown angle",
            "Incorrect; the included angle is $40^\\circ$, so use $K=44\\sin40^\\circ$",
            "Incorrect; use $K=44\\cos40^\\circ$",
            "Incorrect; area cannot be found without the third side",
          ],
          hint:
            "The sine area formula uses the angle physically enclosed by the two substituted sides.",
          explanation:
            "The sides 8 and 11 enclose the displayed $40^\\circ$ angle, so the correct model is $K=\\frac12(8)(11)\\sin40^\\circ=44\\sin40^\\circ$. A complementary angle cannot be substituted unless it is actually the included angle. Therefore option B identifies both the error and the repair.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Diagnoses confusion between an included angle and an invented complementary angle in the triangle area formula.",
          distractorMisconceptions: {
            A: "Assumes complementary angles are interchangeable inside sine.",
            C: "Substitutes cosine merely because the given angle is acute.",
            D: "Fails to recognise that two sides and their included angle determine area.",
          },
          triangleDiagram: areaErrorTriangle,
        }),
        qualityAnswer({
          id: "y11adv-nra-qm4",
          prompt:
            "For the displayed triangle, find side $c$ and the exact area, in that order.",
          latex: "\\text{state }c\\text{, then area}",
          answer: "12,18sqrt(3)",
          acceptedAnswers: [
            "12,18\\sqrt3",
            "c=12, area=18sqrt(3)",
            "12 and 18√3 square units",
          ],
          hint:
            "First find the third angle. Then use the sine rule for the hypotenuse and the area formula with two known sides.",
          explanation:
            "The third angle is $C=180^\\circ-30^\\circ-60^\\circ=90^\\circ$. The sine rule gives $c/\\sin90^\\circ=6/\\sin30^\\circ$, so $c=12$. Also $b=6\\sin60^\\circ/\\sin30^\\circ=6\\sqrt3$, hence the area is $\\frac12(6)(6\\sqrt3)=18\\sqrt3$ square units.",
          difficulty: 3,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines angle sum, sine-rule side recovery, and area calculation while preserving opposite-side notation.",
          triangleDiagram: linkedSineTriangle,
        }),
        qualityAnswer({
          id: "y11adv-nra-qm5",
          prompt:
            "The displayed isosceles triangle has equal sides 5 and base 6. Use the cosine rule followed by the sine area formula to find its exact area.",
          latex: "\\text{do not introduce a perpendicular height}",
          answer: "12",
          acceptedAnswers: ["12 square units", "12 units^2", "K=12"],
          hint:
            "Find the cosine of the included apex angle first, then obtain its positive sine from $\\sin^2\\theta+\\cos^2\\theta=1$.",
          explanation:
            "For the apex angle $\\theta$, the cosine rule gives $6^2=5^2+5^2-2(5)(5)\\cos\\theta$, so $\\cos\\theta=7/25$. As $\\theta$ is a triangle angle, $\\sin\\theta=24/25$. Therefore $K=\\frac12(5)(5)(24/25)=12$ square units.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Requires linking cosine-rule angle information to the sine area formula without defaulting to a height construction.",
          triangleDiagram: isoscelesAreaTriangle,
        }),
        qualityChoice({
          id: "y11adv-nra-qm6",
          prompt:
            "For the displayed triangle, Amira finds its area directly with $\\frac12(7)(8)\\sin60^\\circ$. Noah first finds the third side by cosine rule, then recovers the $60^\\circ$ angle by cosine rule and uses the area formula. Whose method is valid?",
          latex: "\\text{compare two complete methods}",
          answer: "C",
          choices: [
            "Amira only",
            "Noah only",
            "Both methods",
            "Neither method",
          ],
          hint:
            "A method may be inefficient and still valid. Check whether every step uses information from the same determined triangle.",
          explanation:
            "Amira's direct method is valid because the two sides and their included angle are already known. Noah's longer method is also valid: SAS determines the third side, and the cosine rule then recovers the same included angle before the area formula is used. Both chains are mathematically sound, although Amira's is more efficient.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Distinguishes mathematical validity from efficiency when comparing direct and redundant multi-step triangle methods.",
          distractorMisconceptions: {
            A: "Rejects a valid method solely because it contains unnecessary steps.",
            B: "Misses that the included-angle area formula already applies directly.",
            D: "Fails to recognise either valid use of the determined SAS triangle.",
          },
          triangleDiagram: methodComparisonTriangle,
        }),
        qualityAnswer({
          id: "y11adv-nra-qm7",
          prompt:
            "A quadrilateral parcel is split as shown. Find its exact total area.",
          latex: "\\text{sum the two triangular regions}",
          answer: "24+25sqrt(3)",
          acceptedAnswers: [
            "24+25\\sqrt3",
            "$24+25\\sqrt{3}$",
            "67.30 square units",
          ],
          hint:
            "Find each triangular area by the most efficient available method, then add rather than treating the parcel as one triangle.",
          explanation:
            "The 6-8-10 region is right-angled, so its area is $\\frac12(6)(8)=24$. The other region has sides 10 and 10 enclosing $60^\\circ$, so its area is $\\frac12(10)(10)\\sin60^\\circ=25\\sqrt3$. The parcel's total area is $24+25\\sqrt3$ square units.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines two locally selected area methods across a composite region joined by a shared diagonal.",
          trianglePairDiagram: parcelTrianglePair,
        }),
        qualityAnswer({
          id: "y11adv-nra-qm8",
          prompt:
            "Two sides of a triangle have lengths 3 and 5. Their included angle $C$ is a multiple of $30^\\circ$ satisfying $30^\\circ\\le C\\le150^\\circ$. Find the sum of all possible $C$ for which the third side has integer length.",
          latex: "\\text{investigate the five permitted angles}",
          answer: "120",
          acceptedAnswers: ["C=120 degrees; sum=120", "120°", "one hundred twenty"],
          hint:
            "Use the cosine rule for the third side squared and test the five allowed exact cosine values systematically.",
          explanation:
            "The third side satisfies $c^2=3^2+5^2-2(3)(5)\\cos C=34-30\\cos C$. At $30^\\circ,60^\\circ,90^\\circ,120^\\circ,150^\\circ$, the values are $34-15\\sqrt3,19,34,49,34+15\\sqrt3$. Only 49 is a perfect-square integer, so only $C=120^\\circ$ works and the required sum is 120.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Tests bounded systematic case analysis using exact cosine values and a valid integer-length criterion.",
          triangleDiagram: angleFamilyTriangle,
        }),
        qualityAnswer({
          id: "y11adv-nra-qm9",
          prompt:
            "Triangle $ABC$ has side lengths $AB=13$, $BC=14$, and $AC=15$. Point $M$ is the midpoint of $BC$. Use the cosine rule twice to find the exact median length $AM$.",
          latex: "\\text{find }AM",
          answer: "2sqrt(37)",
          acceptedAnswers: ["2\\sqrt37", "$2\\sqrt{37}$", "2√37", "12.17"],
          hint:
            "First find $\\cos B$ from the full triangle. Then use $BM=7$ and the same angle $B$ in triangle $ABM$.",
          explanation:
            "In $\\triangle ABC$, $\\cos B=(13^2+14^2-15^2)/(2\\cdot13\\cdot14)=5/13$. Since $M$ is the midpoint, $BM=7$. Applying cosine rule in $\\triangle ABM$ gives $AM^2=13^2+7^2-2(13)(7)(5/13)=148$, so $AM=\\sqrt{148}=2\\sqrt{37}$.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires transferring an inferred angle between nested triangles and coordinating two cosine-rule applications.",
          trianglePairDiagram: medianTrianglePair,
        }),
        qualityAnswer({
          id: "y11adv-nra-qm10",
          prompt:
            "The displayed triangle has adjacent sides $x$ and $x+2$, included angle $60^\\circ$, and opposite side $\\sqrt{19}$. Find its exact area.",
          latex: "x>0",
          answer: "15sqrt(3)/4",
          acceptedAnswers: [
            "15\\sqrt3/4",
            "$\\frac{15\\sqrt{3}}4$",
            "15√3÷4",
            "6.495",
          ],
          hint:
            "Use the cosine rule to determine the positive value of $x$, then substitute the adjacent sides into the sine area formula.",
          explanation:
            "The cosine rule gives $19=x^2+(x+2)^2-2x(x+2)\\cos60^\\circ=x^2+2x+4$. Thus $x^2+2x-15=0$, so $x=3$ because lengths are positive. The sides are 3 and 5, hence $K=\\frac12(3)(5)\\sin60^\\circ=15\\sqrt3/4$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines reverse side-parameter inference, physical root selection, and exact area calculation under linked constraints.",
          triangleDiagram: designTriangle,
        }),
      ],
      multiPartPractice: [
        {
          id: "y11adv-nra-mp1",
          prompt: "In triangle $ABC$, $a=6$, $b=8$, $C=90°$.",
          latex: "a=6,\\; b=8,\\; C=90^\\circ",
          answer: "24",
          hint: "For (a) use the area formula. For (b) the cosine rule with cos 90°=0 reduces to Pythagoras. For (c) the sine rule gives sinA = a/c.",
          explanation: "(a) Area = ½(6)(8)(1) = 24. (b) c² = 36+64 = 100, c = 10. (c) sinA = 6/10 = 0.6.",
          triangleDiagram: multipartRightTriangle,
          parts: [
            { key: "a", label: "(a)", prompt: "Find the area of the triangle.", marks: 1, answer: "24", acceptedAnswers: ["24 square units", "24 units^2"], hint: "Sides a and b enclose angle C, so use Area = ½ab sin C.", explanation: "The included angle is 90°, so Area = ½(6)(8)sin 90° = 24 square units." },
            { key: "b", label: "(b)", prompt: "Find side $c$ using the cosine rule.", marks: 2, answer: "10", acceptedAnswers: ["c=10", "10 units"], hint: "Write the cosine rule for side c, which is opposite the 90° angle C.", explanation: "The cosine rule gives c² = 6² + 8² - 2(6)(8)cos 90° = 100. Taking the positive square root gives c = 10." },
            { key: "c", label: "(c)", prompt: "Using the sine rule, find $\\sin A$ as a decimal.", marks: 1, answer: "0.6", acceptedAnswers: ["sin A=0.6", "3/5", "0.60"], hint: "Use the opposite pairs a with A and c with C in the sine rule.", explanation: "The sine rule gives sin A/a = sin C/c. Therefore sin A = 6 sin 90°/10 = 6/10 = 0.6." },
          ],
        },
        {
          id: "y11adv-nra-mp2",
          prompt: "In triangle $ABC$, $A=30°$, $B=90°$, $a=8$.",
          latex: "A=30^\\circ,\\; B=90^\\circ,\\; a=8",
          answer: "60",
          hint: "Angles sum to 180°. Use the sine rule to find b. For area, use the two legs at the right angle.",
          explanation: "(a) C = 60°. (b) b = 16. (c) Area ≈ 55 sq units (32√3).",
          triangleDiagram: multipartAngleTriangle,
          parts: [
            { key: "a", label: "(a)", prompt: "Find angle $C$.", marks: 1, answer: "60", acceptedAnswers: ["60°", "60 degrees"], hint: "Use the 180° angle sum for a triangle with the two given angles.", explanation: "Angles in a triangle sum to 180°, so C = 180° - 30° - 90° = 60°." },
            { key: "b", label: "(b)", prompt: "Find side $b$ (the hypotenuse) using the sine rule.", marks: 2, answer: "16", acceptedAnswers: ["b=16", "16 units"], hint: "Pair b with angle B and a with angle A in the sine rule.", explanation: "The sine rule gives b/sin 90° = 8/sin 30°. Hence b = 8(1)/(½) = 16." },
            { key: "c", label: "(c)", prompt: "Find the area to the nearest square unit.", marks: 1, answer: "55", acceptedAnswers: ["55", "56", "32√3", "55.4"], hint: "Area = ½ab sinC. C=60°, a=8, b=16.", explanation: "Area = ½(8)(16)sin60° = 64×(√3/2) = 32√3 ≈ 55.4 ≈ 55 sq units." },
          ],
        },
      ],
    };
  }

  // ── Ambiguous case of the sine rule ──────────────────────────────────────
  if (lesson.slug === "ambiguous-case-sine-rule") {
    const ssaDiagram = (
      description: string,
      angleA: string,
      sideA: string,
      sideB: string,
    ): import("../types").TriangleDiagram => ({
      description,
      vertices: {
        A: { x: 0, y: 3 },
        B: { x: 5, y: 3 },
        C: { x: 2, y: 0.4 },
      },
      vertexLabels: { A: "A", B: "B", C: "C" },
      sideLabels: { BC: sideA, AC: sideB },
      angleLabels: { A: angleA },
      highlightedSides: ["BC", "AC"],
    });
    const ssaPair = (
      description: string,
      angleA: string,
      sideA: string,
      sideB: string,
      firstAngleB: string,
      secondAngleB: string,
      relationLabel: string,
    ): import("../types").TrianglePairDiagram => ({
      description,
      left: {
        description:
          "First SSA candidate using the principal inverse-sine angle at B.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 2, y: 0.4 },
        },
        vertexLabels: { A: "A", B: "B", C: "C" },
        sideLabels: { BC: sideA, AC: sideB },
        angleLabels: { A: angleA, B: firstAngleB },
      },
      right: {
        description:
          "Second SSA candidate using the supplementary inverse-sine angle at B.",
        vertices: {
          A: { x: 0, y: 3 },
          B: { x: 5, y: 3 },
          C: { x: 4, y: 1.2 },
        },
        vertexLabels: { A: "A", B: "B", C: "C" },
        sideLabels: { BC: sideA, AC: sideB },
        angleLabels: { A: angleA, B: secondAngleB },
      },
      leftCaption: "\\text{principal candidate}",
      rightCaption: "\\text{supplementary candidate}",
      relationLabel,
    });
    const multipartAmbiguousDiagram = ssaPair(
      "Two possible triangles from A equal to 30 degrees, side a equal to 7, and side b equal to 10.",
      "30^\\circ",
      "a=7",
      "b=10",
      "B_1",
      "B_2",
      "B_1+B_2=180^\\circ",
    );
    const multipartBoundaryDiagram = ssaDiagram(
      "A boundary SSA triangle with A equal to 30 degrees, side b equal to 10, and side a equal to the perpendicular threshold 5.",
      "30^\\circ",
      "a=5",
      "b=10",
    );
    return {
      ...base,
      description:
        "Determine how many triangles exist given SSA; identify the ambiguous case condition bsinA < a < b; find both triangles when the ambiguous case applies.",
      learningIntention:
        "Apply a systematic test to SSA information to determine whether 0, 1, or 2 triangles are possible, and find both solutions when two triangles exist.",
      successCriteria: [
        "Compute the threshold bsinA and compare it with a to determine the number of triangles.",
        "State the four conditions: a < bsinA → 0; a = bsinA → 1; bsinA < a < b → 2; a ≥ b → 1.",
        "Find both values of angle B when the ambiguous case applies using B₂ = 180° − B₁.",
        "Verify the second triangle by confirming A + B₂ < 180°.",
      ],
      teaching: {
        paragraphs: [
          "When you are given two sides a, b and the non-included angle A (SSA), the triangle may not be unique. The side a must 'swing' from the end of b to meet the base — how many positions are possible depends on the length of a relative to b and the perpendicular height bsinA.",
          "The four cases (A acute, a opposite A, b the other given side): if a < bsinA — the side a is too short to reach the base — no triangle exists. If a = bsinA exactly — one right triangle. If bsinA < a < b — two triangles (the ambiguous case). If a ≥ b — one triangle.",
          "In the ambiguous case, use the sine rule to find sinB = bsinA/a. This gives one value B₁ = arcsin(bsinA/a). The second solution is B₂ = 180° − B₁. Both give valid triangles provided A + B₂ < 180°.",
          "Always check the second triangle: if A + B₂ ≥ 180°, the second triangle is impossible and only one solution exists.",
        ],
        latexBlocks: [
          "\\text{Threshold: } b\\sin A",
          "a < b\\sin A \\Rightarrow 0 \\text{ triangles}; \\quad a = b\\sin A \\Rightarrow 1; \\quad b\\sin A < a < b \\Rightarrow 2; \\quad a \\geq b \\Rightarrow 1",
          "\\sin B = \\frac{b\\sin A}{a}, \\quad B_2 = 180^\\circ - B_1",
        ],
      },
      workedExamples: [
        {
          title: "No triangle (a too short)",
          questionLatex: "A=30^\\circ,\\; b=8,\\; a=3.\\quad\\text{How many triangles?}",
          steps: [
            { explanation: "Find the threshold.", latex: "b\\sin A = 8\\sin 30^\\circ = 8 \\times \\tfrac{1}{2} = 4" },
            { explanation: "Compare: a = 3 < 4 = bsinA.", latex: "a < b\\sin A \\Rightarrow 0 \\text{ triangles}" },
          ],
          finalAnswerLatex: "0 \\text{ triangles possible}",
        },
        {
          title: "Two triangles (ambiguous case)",
          questionLatex: "A=30^\\circ,\\; b=8,\\; a=6.\\quad\\text{How many triangles?}",
          steps: [
            { explanation: "Threshold: bsinA = 4.", latex: "b\\sin A = 4" },
            { explanation: "Check: bsinA < a < b, i.e. 4 < 6 < 8.", latex: "\\Rightarrow 2 \\text{ triangles}" },
            { explanation: "In the second triangle, B₂ = 180° − B₁.", latex: "B_2 = 180^\\circ - B_1" },
          ],
          finalAnswerLatex: "2 \\text{ triangles possible}",
        },
        {
          title: "One triangle (a > b)",
          questionLatex: "A=30^\\circ,\\; b=8,\\; a=10.\\quad\\text{How many triangles?}",
          steps: [
            { explanation: "Since a = 10 > b = 8, the side is long enough to guarantee one solution.", latex: "a \\geq b \\Rightarrow 1 \\text{ triangle}" },
          ],
          finalAnswerLatex: "1 \\text{ triangle}",
        },
      ],
      guidedPractice: [
        qa("y11adv-amb-g1", "$A=30°$, $b=8$, $a=4$. Compute $b\\sin A$.", "", "4", "Substitute the given side b and angle A into the perpendicular-height threshold b sin A.", "The threshold is b sin A = 8 sin 30° = 8 × ½ = 4.", ["4 units", "4.0"]),
        qa("y11adv-amb-g2", "$A=30°$, $b=8$, $a=3$. Since $a=3 < b\\sin A=4$, how many triangles exist?", "", "0", "Compare side a with the perpendicular threshold. A side shorter than the threshold cannot reach the baseline.", "Because a = 3 is shorter than b sin A = 4, the swinging side cannot meet the base. Therefore no triangle exists.", ["0 triangles", "none"]),
        qa("y11adv-amb-g3", "$A=30°$, $b=8$, $a=6$. Since $b\\sin A=4 < 6 < 8=b$, how many triangles exist?", "", "2", "For acute A, the strict interval b sin A < a < b is the two-triangle ambiguous case.", "The inequalities 4 < 6 < 8 show that b sin A < a < b. The swinging side meets the baseline in two positions, so two triangles exist.", ["2 triangles", "two"]),
        qa("y11adv-amb-g4", "$A=30°$, $b=8$, $a=10$. Since $a=10 > b=8$, how many triangles exist?", "", "1", "When a is at least as long as b for an acute given angle, only one intersection position is possible.", "Here a = 10 exceeds b = 8, so the side cannot swing to a second valid position. Exactly one triangle exists.", ["1 triangle", "one"]),
      ],
      independentPractice: [
        qa("y11adv-amb-i1", "$A=30°$, $b=12$, $a=6$. How many triangles? (Threshold $b\\sin A = 6$.)", "", "1", "Equality with the perpendicular threshold is the tangent boundary between zero and two intersections.", "Since a = b sin A = 6, the swinging side touches the base in exactly one position and forms a right angle. One triangle exists.", ["1 triangle", "one"]),
        qa("y11adv-amb-i2", "$A=30°$, $b=12$, $a=4$. How many triangles?", "", "0", "Compute b sin A = 6, then compare the given side a with this minimum reaching length.", "The threshold is 12 sin 30° = 6. Since a = 4 < 6, the side is too short to reach the base, so zero triangles exist.", ["0 triangles", "none"]),
        qa("y11adv-amb-i3", "$A=30°$, $b=12$, $a=8$. How many triangles?", "", "2", "Compute the threshold and check both strict inequalities needed for the ambiguous interval.", "Here b sin A = 12 sin 30° = 6, and 6 < 8 < 12. Therefore b sin A < a < b and two triangles exist.", ["2 triangles", "two"]),
        qa("y11adv-amb-i4", "$A=30°$, $b=12$, $a=15$. How many triangles?", "", "1", "Compare a with b after confirming the given angle is acute.", "Because a = 15 is greater than b = 12, only the outward intersection is possible. The SSA data determine exactly one triangle.", ["1 triangle", "one"]),
        qa("y11adv-amb-i5", "In the ambiguous case, $B_1 = 50°$. Find $B_2$.", "", "130", "The two inverse-sine candidates are supplementary, so subtract the principal angle from 180°.", "The supplementary candidate is B₂ = 180° - B₁ = 180° - 50° = 130°. It must still be checked against angle A for validity.", ["130°", "130 degrees"]),
      ],
      commonMistakes: [
        { mistake: "Comparing a with b only, without computing bsinA first.", fix: "Always find the threshold bsinA before deciding. The comparison is a vs bsinA AND a vs b — both conditions are needed." },
        { mistake: "Assuming one triangle whenever a < b.", fix: "If a < b but a > bsinA, there are two triangles (ambiguous case). The threshold bsinA, not b itself, is the critical comparison." },
        { mistake: "Forgetting to check whether the second triangle is valid after finding B₂.", fix: "Check A + B₂ < 180°. If the sum reaches or exceeds 180°, the second triangle is impossible." },
        { mistake: "Only reporting one answer in the ambiguous case.", fix: "When bsinA < a < b, always report both triangles. State B₁ and B₂ = 180° − B₁, and find the corresponding angles C and sides c for each." },
      ],
      masteryQuiz: [
        qualityChoice({
          id: "y11adv-amb-qm1",
          prompt:
            "For $A=30^\\circ$, $b=10$, and $a=4$, how many triangles satisfy the SSA data?",
          latex: "\\text{classify the configuration}",
          answer: "A",
          choices: ["0", "1", "2", "Cannot be determined"],
          hint:
            "Find the perpendicular threshold $b\\sin A$ before comparing it with side $a$.",
          explanation:
            "The threshold is $b\\sin A=10\\sin30^\\circ=5$. Since $a=4<5$, the side opposite A is too short to reach the baseline. No triangle exists, so option A is correct.",
          difficulty: 3,
          taskType: "analytical",
          diagnosticIntent:
            "Checks classification from the geometric threshold rather than from the incomplete comparison between a and b.",
          distractorMisconceptions: {
            B: "Treats every SSA set as producing one triangle.",
            C: "Uses only a less than b and ignores that a is below the height threshold.",
            D: "Does not recognise that the threshold comparison completely determines this case.",
          },
          triangleDiagram: ssaDiagram(
            "An attempted SSA triangle with A equal to 30 degrees, side b equal to 10, and opposite side a equal to 4, which is shorter than the perpendicular threshold.",
            "30^\\circ",
            "a=4",
            "b=10",
          ),
        }),
        qualityAnswer({
          id: "y11adv-amb-qm2",
          prompt:
            "For $A=30^\\circ$, $b=10$, and $a=5$, state the number of triangles and angle $B$, in that order.",
          latex: "\\text{boundary case}",
          answer: "1,90",
          acceptedAnswers: ["1 triangle,90 degrees", "one,90°", "1; B=90"],
          hint:
            "Compare a with $b\\sin A$. Equality makes the swinging side perpendicular to the base.",
          explanation:
            "The threshold is $10\\sin30^\\circ=5$, exactly equal to $a$. Equality gives one tangent position, so there is one right triangle and the angle opposite side b is $B=90^\\circ$.",
          difficulty: 3,
          taskType: "procedural",
          diagnosticIntent:
            "Tests recognition of the equality boundary and its geometric right-angle consequence.",
          triangleDiagram: multipartBoundaryDiagram,
        }),
        qualityChoice({
          id: "y11adv-amb-qm3",
          prompt:
            "For $A=40^\\circ$, $b=12$, and $a=6$, a student says, “Because $a<b$, two triangles exist.” Which response is correct?",
          latex: "\\text{evaluate the claim}",
          answer: "B",
          choices: [
            "Correct; $a<b$ is sufficient",
            "Incorrect; $12\\sin40^\\circ\\approx7.71>6$, so no triangle exists",
            "Incorrect; exactly one triangle exists because $a$ is positive",
            "Two triangles exist only because $A$ is acute",
          ],
          hint:
            "The two-triangle condition needs both $a<b$ and $a>b\\sin A$.",
          explanation:
            "The missing check is the perpendicular threshold: $b\\sin A=12\\sin40^\\circ\\approx7.71$. Since $a=6$ is below that value, the swinging side cannot reach the base. Thus no triangle exists and option B correctly diagnoses the student's incomplete rule.",
          difficulty: 3,
          taskType: "problem-solving",
          diagnosticIntent:
            "Targets the common error of using only a less than b while omitting the minimum-height condition.",
          distractorMisconceptions: {
            A: "Uses only one of the two inequalities required for ambiguity.",
            C: "Assumes positive lengths automatically form a triangle.",
            D: "Treats an acute angle alone as sufficient for two solutions.",
          },
          triangleDiagram: ssaDiagram(
            "An attempted SSA triangle with A equal to 40 degrees, side b equal to 12, and side a equal to 6, below the perpendicular threshold.",
            "40^\\circ",
            "a=6",
            "b=12",
          ),
        }),
        qualityAnswer({
          id: "y11adv-amb-qm4",
          prompt:
            "For $A=30^\\circ$, $a=5$, and $b=5\\sqrt3$, find the two possible values of $B$ and the corresponding values of $C$. List smaller $B$ first.",
          latex: "\\text{state }(B_1,B_2;C_1,C_2)",
          answer: "60,120;90,30",
          acceptedAnswers: [
            "B=60 or120; C=90 or30",
            "(60°,120°;90°,30°)",
            "60,120,90,30",
          ],
          hint:
            "Use the sine rule to find $\\sin B$, then take both the principal and supplementary angles before applying the angle sum.",
          explanation:
            "The sine rule gives $\\sin B=(b\\sin A)/a=(5\\sqrt3\\cdot1/2)/5=\\sqrt3/2$. Hence $B_1=60^\\circ$ and $B_2=120^\\circ$. The corresponding third angles are $C_1=90^\\circ$ and $C_2=30^\\circ$, and both angle sums are valid.",
          difficulty: 3,
          taskType: "synthesis",
          diagnosticIntent:
            "Combines exact inverse-sine solutions with supplementary-angle recovery and paired angle-sum completion.",
          trianglePairDiagram: ssaPair(
            "Two valid exact SSA triangles with A equal to 30 degrees, side a equal to 5, and side b equal to 5 square root 3.",
            "30^\\circ",
            "a=5",
            "b=5\\sqrt3",
            "60^\\circ",
            "120^\\circ",
            "C_1=90^\\circ,\\ C_2=30^\\circ",
          ),
        }),
        qualityAnswer({
          id: "y11adv-amb-qm5",
          prompt:
            "For an SSA problem with $A=70^\\circ$, the sine rule gives $\\sin B=0.8$. State all valid values of $B$ to two decimal places and the number of triangles.",
          latex: "\\text{validate both inverse-sine candidates}",
          answer: "53.13,1",
          acceptedAnswers: [
            "B=53.13 degrees; 1 triangle",
            "53.1°,one",
            "53.130102,1",
          ],
          hint:
            "Find the principal and supplementary candidates, then test each using $A+B<180^\\circ$.",
          explanation:
            "The principal value is $B_1=\\sin^{-1}(0.8)\\approx53.13^\\circ$. The supplement is $B_2\\approx126.87^\\circ$, but $70^\\circ+126.87^\\circ>180^\\circ$, so it cannot belong to a triangle. Only $B=53.13^\\circ$ is valid, giving one triangle.",
          difficulty: 4,
          taskType: "analytical",
          diagnosticIntent:
            "Requires distinguishing algebraic inverse-sine candidates from geometrically valid triangle angles.",
          trianglePairDiagram: ssaPair(
            "Two inverse-sine candidates for B when A is 70 degrees; the supplementary candidate makes the angle sum exceed 180 degrees.",
            "70^\\circ",
            "a",
            "b",
            "53.13^\\circ",
            "126.87^\\circ",
            "70^\\circ+126.87^\\circ>180^\\circ",
          ),
        }),
        qualityChoice({
          id: "y11adv-amb-qm6",
          prompt:
            "For $A=30^\\circ$, $a=7$, and $b=10$, Mei uses $5<7<10$ to conclude two triangles. Omar calculates $\\sin B=5/7$, tests both inverse-sine angles, and also concludes two. Whose method is valid?",
          latex: "\\text{compare classification methods}",
          answer: "C",
          choices: ["Mei only", "Omar only", "Both methods", "Neither method"],
          hint:
            "One method uses the acute-angle threshold theorem; the other verifies both candidate angles directly.",
          explanation:
            "Mei correctly applies $b\\sin A<a<b$: $10\\sin30^\\circ=5$, so $5<7<10$ gives two triangles. Omar's sine-rule calculation produces a principal angle and a supplementary angle, and both pass the angle-sum check. Both methods are valid, so option C is correct.",
          difficulty: 4,
          taskType: "problem-solving",
          diagnosticIntent:
            "Assesses equivalence between geometric threshold classification and direct inverse-sine candidate validation.",
          distractorMisconceptions: {
            A: "Rejects a valid direct verification using the sine rule.",
            B: "Fails to recognise the complete threshold theorem for acute A.",
            D: "Does not connect either method to the same two valid configurations.",
          },
          trianglePairDiagram: multipartAmbiguousDiagram,
        }),
        qualityAnswer({
          id: "y11adv-amb-qm7",
          prompt:
            "In an SSA problem, $A=20^\\circ$ and the sine rule reduces to $\\sin B=\\frac12$. Find the sum of all valid corresponding values of angle $C$.",
          latex: "\\text{include every valid triangle}",
          answer: "140",
          acceptedAnswers: ["130+10=140", "C=130°,10°; sum=140°", "140 degrees"],
          hint:
            "Use both angles in $0^\\circ<B<180^\\circ$ whose sine is one half, then complete each triangle.",
          explanation:
            "The two candidates are $B=30^\\circ$ and $B=150^\\circ$. Both are valid because $20^\\circ+B<180^\\circ$. Their corresponding third angles are $130^\\circ$ and $10^\\circ$, whose sum is $140^\\circ$.",
          difficulty: 4,
          taskType: "synthesis",
          diagnosticIntent:
            "Requires enumerating both inverse-sine branches, validating them, and aggregating the linked third angles.",
          trianglePairDiagram: ssaPair(
            "Two valid candidate triangles with A equal to 20 degrees and B equal to either 30 degrees or 150 degrees.",
            "20^\\circ",
            "a",
            "b",
            "30^\\circ",
            "150^\\circ",
            "C_1=130^\\circ,\\ C_2=10^\\circ",
          ),
        }),
        qualityAnswer({
          id: "y11adv-amb-qm8",
          prompt:
            "Let $A=30^\\circ$, $b=12$, and let side $a=k$ be an integer satisfying $1\\le k\\le15$. Find the sum of all $k$ for which exactly two triangles exist.",
          latex: "\\text{bounded integer family}",
          answer: "45",
          acceptedAnswers: ["7+8+9+10+11=45", "k=7,8,9,10,11; sum=45", "forty-five"],
          hint:
            "Translate the two-triangle condition $b\\sin A<a<b$ into a strict integer interval for k.",
          explanation:
            "Here $b\\sin A=12\\sin30^\\circ=6$. Exactly two triangles require $6<k<12$, so the permitted integers are $7,8,9,10,11$. Their sum is $45$; the boundary values 6 and 12 each give only one triangle.",
          difficulty: 5,
          taskType: "investigative",
          diagnosticIntent:
            "Tests systematic enumeration from strict threshold inequalities, including correct exclusion of both boundary cases.",
          triangleDiagram: ssaDiagram(
            "A family of SSA triangles with fixed A equal to 30 degrees, fixed side b equal to 12, and opposite side a equal to an integer k.",
            "30^\\circ",
            "a=k",
            "b=12",
          ),
        }),
        qualityAnswer({
          id: "y11adv-amb-qm9",
          prompt:
            "For $A=45^\\circ$, $a=6$, and $b=3\\sqrt6$, two triangles exist. Find the exact sum of their areas.",
          latex: "\\text{sum both configurations}",
          answer: "27",
          acceptedAnswers: ["27 square units", "K1+K2=27", "27 units^2"],
          hint:
            "Find both B values, then both C values and sides c. Use $K=\\frac12bc\\sin A$ for each triangle.",
          explanation:
            "The sine rule gives $\\sin B=(3\\sqrt6\\sin45^\\circ)/6=\\sqrt3/2$, so $B=60^\\circ$ or $120^\\circ$ and $C=75^\\circ$ or $15^\\circ$. The corresponding sides are $c=3\\sqrt3+3$ and $c=3\\sqrt3-3$, with sum $6\\sqrt3$. Thus the area sum is $\\frac12(3\\sqrt6)(6\\sqrt3)\\sin45^\\circ=27$.",
          difficulty: 5,
          taskType: "synthesis",
          diagnosticIntent:
            "Integrates both ambiguous configurations, exact sine-rule side recovery, and aggregation of two linked areas.",
          trianglePairDiagram: ssaPair(
            "Two valid SSA triangles with A equal to 45 degrees, side a equal to 6, and side b equal to 3 square root 6.",
            "45^\\circ",
            "a=6",
            "b=3\\sqrt6",
            "60^\\circ",
            "120^\\circ",
            "C_1=75^\\circ,\\ C_2=15^\\circ",
          ),
        }),
        qualityAnswer({
          id: "y11adv-amb-qm10",
          prompt:
            "For an acute SSA family with fixed $A=30^\\circ$ and fixed side $b$, the open interval of side lengths $a$ that produces two triangles has width 4. Find the sum of the interval endpoints.",
          latex: "\\text{reverse-design the ambiguity interval}",
          answer: "12",
          acceptedAnswers: ["4+8=12", "endpoints 4 and 8; sum12", "twelve"],
          hint:
            "The two-triangle interval is $(b\\sin A,b)$. Express its width using $\\sin30^\\circ=1/2$.",
          explanation:
            "The interval is $(b\\sin30^\\circ,b)=(b/2,b)$, so its width is $b-b/2=b/2$. Given width 4, $b=8$. The endpoints are therefore 4 and 8, and their sum is $12$.",
          difficulty: 5,
          taskType: "analytical",
          diagnosticIntent:
            "Requires reversing the ambiguity condition to infer a fixed side from the geometry of its parameter interval.",
          triangleDiagram: ssaDiagram(
            "A variable SSA family with fixed A equal to 30 degrees, fixed side b, and side a ranging between the perpendicular threshold and b.",
            "30^\\circ",
            "b\\sin A<a<b",
            "b",
          ),
        }),
      ],
      multiPartPractice: [
        {
          id: "y11adv-amb-mp1",
          prompt: "In triangle $ABC$, $A=30°$, $b=10$, $a=7$.",
          latex: "A=30^\\circ,\\; b=10,\\; a=7",
          answer: "5",
          hint: "First find bsinA. Compare a with bsinA and b to count triangles. Then use the sine rule to find sinB.",
          explanation: "(a) bsinA = 5. (b) 5 < 7 < 10, so 2 triangles. (c) sinB = 5/7 ≈ 0.71.",
          trianglePairDiagram: multipartAmbiguousDiagram,
          parts: [
            { key: "a", label: "(a)", prompt: "Calculate $b\\sin A$.", marks: 1, answer: "5", acceptedAnswers: ["5 units", "5.0"], hint: "Substitute b = 10 and A = 30° into the perpendicular-height threshold.", explanation: "The threshold is b sin A = 10 sin 30° = 10 × ½ = 5." },
            { key: "b", label: "(b)", prompt: "How many triangles are possible?", marks: 1, answer: "2", acceptedAnswers: ["2 triangles", "two"], hint: "Compare a = 7 with both the threshold 5 and side b = 10.", explanation: "The strict inequalities 5 < 7 < 10 show that b sin A < a < b. Therefore two triangles are possible." },
            { key: "c", label: "(c)", prompt: "Find $\\sin B$ to 2 decimal places.", marks: 1, answer: "0.71", acceptedAnswers: ["0.714", "5/7", "0.7143"], hint: "Rearrange the sine rule to obtain sin B = b sin A/a.", explanation: "The sine rule gives sin B = b sin A/a = 5/7 ≈ 0.7143, which rounds to 0.71." },
          ],
        },
        {
          id: "y11adv-amb-mp2",
          prompt: "In triangle $ABC$, $A=30°$, $b=10$, $a=5$.",
          latex: "A=30^\\circ,\\; b=10,\\; a=5",
          answer: "5",
          hint: "Find bsinA and compare with a. If a = bsinA, what angle does B take? Then find C.",
          explanation: "(a) bsinA = 5. (b) a = bsinA → 1 triangle (right angle at B). (c) C = 60°.",
          triangleDiagram: multipartBoundaryDiagram,
          parts: [
            { key: "a", label: "(a)", prompt: "Calculate $b\\sin A$.", marks: 1, answer: "5", acceptedAnswers: ["5 units", "5.0"], hint: "Substitute b = 10 and A = 30° into b sin A.", explanation: "The perpendicular threshold is b sin A = 10 sin 30° = 10 × ½ = 5." },
            { key: "b", label: "(b)", prompt: "How many triangles are possible?", marks: 1, answer: "1", acceptedAnswers: ["1 triangle", "one"], hint: "Compare side a with the perpendicular threshold found in part (a).", explanation: "Here a = 5 equals b sin A = 5. Equality produces one tangent position, so exactly one right triangle exists." },
            { key: "c", label: "(c)", prompt: "Since $B=90°$, find angle $C$.", marks: 1, answer: "60", acceptedAnswers: ["60°", "60 degrees"], hint: "Use the 180° angle sum with A = 30° and B = 90°.", explanation: "Angles in a triangle sum to 180°, so C = 180° - 30° - 90° = 60°." },
          ],
        },
      ],
    };
  }

  return null;
}

