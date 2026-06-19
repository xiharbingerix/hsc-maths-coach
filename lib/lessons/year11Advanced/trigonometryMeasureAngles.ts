import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

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
    "y = sin x completes one full cycle from 0 to 2π. Its period is 2π.",
  "y11adv-graph-m2":
    "y = tan x has period π — half the period of sin and cos. After rotating half a turn, the ratio sin/cos repeats.",
  "y11adv-graph-m4":
    "The maximum value of y = sin x is 1, achieved at x = π/2 (the top of the unit circle).",
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
    "Amplitude = |a| = 7.",
  "y11adv-amp-m3":
    "Period = 2π/b = 2π/3.",
  "y11adv-amp-m4":
    "For y = 2 sin(πx), b = π. Period = 2π/π = 2.",
  "y11adv-amp-m5":
    "Maximum value = d + |a| = 0 + 5 = 5.",
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
    "Maximum value = d + |a| = 1 + 2 = 3.",
  "y11adv-shift-i1":
    "The vertical shift is d = −4 in y = 3 cos(2x) − 4.",
  "y11adv-shift-i2":
    "y = sin(x) + 2 has d = 2 and |a| = 1. Maximum = d + |a| = 2 + 1 = 3.",
  "y11adv-shift-i3":
    "Amplitude = |a| = 4 in y = 4 sin(x − π/3) + 1.",
  "y11adv-shift-i4":
    "Minimum = d − |a| = −3 − 2 = −5.",
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
      masteryQuizPool: [
        { id: "y11adv-trig-rad-p1", prompt: "Convert the angle to radians.", latex: "90^\\circ", answer: "pi/2", difficulty: 1, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Multiply by $\\frac{\\pi}{180}$ and cancel.", explanation: "$90\\times\\frac{\\pi}{180}=\\frac{\\pi}{2}$." },
        { id: "y11adv-trig-rad-p2", prompt: "Convert the angle to radians.", latex: "60^\\circ", answer: "pi/3", difficulty: 1, acceptedAnswers: ["\\pi/3", "π/3"], hint: "Multiply by $\\frac{\\pi}{180}$.", explanation: "$60\\times\\frac{\\pi}{180}=\\frac{\\pi}{3}$." },
        { id: "y11adv-trig-rad-p3", prompt: "Convert the angle to degrees.", latex: "\\frac{\\pi}{6}", answer: "30", difficulty: 1, acceptedAnswers: ["30 degrees", "30°"], hint: "Multiply by $\\frac{180}{\\pi}$.", explanation: "$\\frac{\\pi}{6}\\times\\frac{180}{\\pi}=30^\\circ$." },
        { id: "y11adv-trig-rad-p4", prompt: "Which exact value is correct?", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac12$" }, { label: "B", text: "$\\frac{\\sqrt2}{2}$" }, { label: "C", text: "$\\frac{\\sqrt3}{2}$" }, { label: "D", text: "$0$" }], hint: "Use the 30-60-90 triangle.", explanation: "$\\sin(\\pi/6)=\\frac12$." },
        { id: "y11adv-trig-rad-p5", prompt: "Convert the angle to degrees.", latex: "\\frac{3\\pi}{2}", answer: "270", difficulty: 2, acceptedAnswers: ["270 degrees", "270°"], hint: "Multiply by $\\frac{180}{\\pi}$.", explanation: "$\\frac{3\\pi}{2}\\times\\frac{180}{\\pi}=270^\\circ$." },
        { id: "y11adv-trig-rad-p6", prompt: "Convert the angle to radians.", latex: "135^\\circ", answer: "3pi/4", difficulty: 2, acceptedAnswers: ["3\\pi/4", "3π/4"], hint: "Cancel the common factor 45.", explanation: "$135\\times\\frac{\\pi}{180}=\\frac{3\\pi}{4}$." },
        { id: "y11adv-trig-rad-p7", prompt: "Find the arc length.", latex: "r=6,\\quad \\theta=\\frac{\\pi}{3}", answer: "2pi", difficulty: 2, acceptedAnswers: ["2\\pi", "2π"], hint: "$s=r\\theta$.", explanation: "$s=6\\times\\frac{\\pi}{3}=2\\pi$." },
        { id: "y11adv-trig-rad-p8", prompt: "Find the arc length.", latex: "r=8,\\quad \\theta=\\frac{\\pi}{4}", answer: "2pi", difficulty: 2, acceptedAnswers: ["2\\pi", "2π"], hint: "$s=r\\theta$.", explanation: "$s=8\\times\\frac{\\pi}{4}=2\\pi$." },
        { id: "y11adv-trig-rad-p9", prompt: "Which exact value is correct?", latex: "\\cos\\left(\\frac{\\pi}{4}\\right)", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\frac12$" }, { label: "B", text: "$\\frac{\\sqrt2}{2}$" }, { label: "C", text: "$\\frac{\\sqrt3}{2}$" }, { label: "D", text: "$1$" }], hint: "Use the 45-45-90 triangle.", explanation: "$\\cos(\\pi/4)=\\frac{\\sqrt2}{2}$." },
        { id: "y11adv-trig-rad-p10", prompt: "Find the sector area.", latex: "r=4,\\quad \\theta=\\frac{\\pi}{3}", answer: "8pi/3", difficulty: 3, acceptedAnswers: ["8\\pi/3", "8π/3"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times16\\times\\frac{\\pi}{3}=\\frac{8\\pi}{3}$." },
        { id: "y11adv-trig-rad-p11", prompt: "Find the sector area.", latex: "r=6,\\quad \\theta=\\frac{2\\pi}{3}", answer: "12pi", difficulty: 3, acceptedAnswers: ["12\\pi", "12π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times36\\times\\frac{2\\pi}{3}=12\\pi$." },
        { id: "y11adv-trig-rad-p12", prompt: "Convert the angle to radians.", latex: "300^\\circ", answer: "5pi/3", difficulty: 3, acceptedAnswers: ["5\\pi/3", "5π/3"], hint: "Cancel the common factor 60.", explanation: "$300\\times\\frac{\\pi}{180}=\\frac{5\\pi}{3}$." },
        { id: "y11adv-trig-rad-p13", prompt: "Which quadrant contains the angle?", latex: "\\frac{5\\pi}{6}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between a right angle and a half turn.", explanation: "$\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi$, so Q2." },
        { id: "y11adv-trig-rad-p14", prompt: "Which exact boundary value is correct?", latex: "\\sin(\\pi)", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$1$" }, { label: "B", text: "$-1$" }, { label: "C", text: "$0$" }, { label: "D", text: "$\\frac12$" }], hint: "At a half turn the y-coordinate is zero.", explanation: "$\\sin(\\pi)=0$." },
        { id: "y11adv-trig-rad-p15", prompt: "Find the angle $\\theta$ in radians.", latex: "s=2\\pi,\\quad r=8", answer: "pi/4", difficulty: 3, acceptedAnswers: ["\\pi/4", "π/4"], hint: "$\\theta=s/r$.", explanation: "$\\theta=\\frac{2\\pi}{8}=\\frac{\\pi}{4}$." },
        { id: "y11adv-trig-rad-p16", prompt: "A student uses degrees directly in $s=r\\theta$. Which option identifies the error?", latex: "s=r\\theta", answer: "D", difficulty: 4, choices: [{ label: "A", text: "The radius should be squared" }, { label: "B", text: "The sine value should be used" }, { label: "C", text: "The answer must be negative" }, { label: "D", text: "The angle must be converted to radians first" }], hint: "The formula needs $\\theta$ in radians.", explanation: "$s=r\\theta$ requires $\\theta$ in radians." },
        { id: "y11adv-trig-rad-p17", prompt: "Find the sector area.", latex: "r=2,\\quad \\theta=\\frac{2\\pi}{3}", answer: "4pi/3", difficulty: 4, acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times4\\times\\frac{2\\pi}{3}=\\frac{4\\pi}{3}$." },
        { id: "y11adv-trig-rad-p18", prompt: "Convert to radians first, then find the arc length.", latex: "r=6,\\quad \\theta=120^\\circ", answer: "4pi", difficulty: 4, acceptedAnswers: ["4\\pi", "4π"], hint: "Convert $120^\\circ=\\frac{2\\pi}{3}$ then $s=r\\theta$.", explanation: "$120^\\circ=\\frac{2\\pi}{3}$; $s=6\\times\\frac{2\\pi}{3}=4\\pi$." },
        { id: "y11adv-trig-rad-p19", prompt: "Find the radius.", latex: "A=9\\pi,\\quad \\theta=\\frac{\\pi}{2}", answer: "6", difficulty: 4, hint: "$r^2=\\frac{2A}{\\theta}$.", explanation: "$r^2=\\frac{2\\times9\\pi}{\\pi/2}=36$, so $r=6$." },
        { id: "y11adv-trig-rad-p20", prompt: "Which value is correct?", latex: "\\tan\\left(\\frac{\\pi}{3}\\right)", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$1$" }, { label: "B", text: "$\\frac{\\sqrt3}{3}$" }, { label: "C", text: "$\\sqrt3$" }, { label: "D", text: "$\\frac12$" }], hint: "$\\tan(\\pi/3)=\\frac{\\sqrt3/2}{1/2}$.", explanation: "$\\tan(\\pi/3)=\\sqrt3$." },
        { id: "y11adv-trig-rad-p21", prompt: "A sector has radius 6 and central angle $\\frac{\\pi}{3}$. Find its perimeter.", latex: "r=6,\\quad \\theta=\\frac{\\pi}{3}", answer: "12+2pi", difficulty: 5, acceptedAnswers: ["12+2\\pi", "12+2π"], hint: "Arc $s=r\\theta$, then $P=2r+s$.", explanation: "$s=6\\times\\frac{\\pi}{3}=2\\pi$; $P=2(6)+2\\pi=12+2\\pi$." },
        { id: "y11adv-trig-rad-p22", prompt: "A sector of radius 6 has area $6\\pi$. Find its central angle in radians.", latex: "A=6\\pi,\\quad r=6", answer: "pi/3", difficulty: 5, acceptedAnswers: ["\\pi/3", "π/3"], hint: "$\\theta=\\frac{2A}{r^2}$.", explanation: "$\\theta=\\frac{2\\times6\\pi}{36}=\\frac{\\pi}{3}$." },
        { id: "y11adv-trig-rad-p23", prompt: "An arc of length $5\\pi$ lies on a circle of radius 10. A second arc on the same circle subtends $\\frac{\\pi}{4}$. Find the total of the two arc lengths.", latex: "s_1=5\\pi,\\quad r=10,\\quad \\theta_2=\\frac{\\pi}{4}", answer: "7.5pi", difficulty: 5, acceptedAnswers: ["7.5\\pi", "7.5π", "15pi/2", "15\\pi/2"], hint: "Find $s_2=r\\theta_2$ then add to $s_1$.", explanation: "$s_2=10\\times\\frac{\\pi}{4}=2.5\\pi$; total $=5\\pi+2.5\\pi=7.5\\pi$." },
        { id: "y11adv-trig-rad-p24", prompt: "A sector of radius 4 has the same area as a sector of radius 8 and angle $\\frac{\\pi}{8}$. Find the angle of the radius-4 sector in radians.", latex: "A_8=\\frac12(8)^2\\cdot\\frac{\\pi}{8}", answer: "pi/2", difficulty: 5, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Find the area of the radius-8 sector, then solve $\\frac12(4)^2\\theta=A$.", explanation: "$A=\\frac12\\times64\\times\\frac{\\pi}{8}=4\\pi$. Then $\\frac12\\times16\\times\\theta=4\\pi$ gives $\\theta=\\frac{\\pi}{2}$." },
        { id: "y11adv-trig-rad-p25", prompt: "Evaluate using exact values.", latex: "2\\sin\\left(\\frac{\\pi}{6}\\right)+\\cos\\left(\\frac{\\pi}{3}\\right)", answer: "3/2", difficulty: 5, acceptedAnswers: ["1.5"], hint: "$\\sin(\\pi/6)=\\frac12$, $\\cos(\\pi/3)=\\frac12$.", explanation: "$2(\\frac12)+\\frac12=1+\\frac12=\\frac32$." },
        { id: "y11adv-trig-rad-p26", prompt: "A circle has radius 12. A sector of this circle has arc length $4\\pi$. Find the sector's area.", latex: "r=12,\\quad s=4\\pi", answer: "24pi", difficulty: 5, acceptedAnswers: ["24\\pi", "24π"], hint: "First find $\\theta=s/r$, then $A=\\frac12r^2\\theta$.", explanation: "$\\theta=\\frac{4\\pi}{12}=\\frac{\\pi}{3}$; $A=\\frac12\\times144\\times\\frac{\\pi}{3}=24\\pi$." },
        { id: "y11adv-trig-rad-p27", prompt: "Convert the angle to radians.", latex: "210^\\circ", answer: "7pi/6", difficulty: 3, acceptedAnswers: ["7\\pi/6", "7π/6"], hint: "Cancel the common factor 30.", explanation: "$210\\times\\frac{\\pi}{180}=\\frac{7\\pi}{6}$." },
        { id: "y11adv-trig-rad-p28", prompt: "Convert the angle to degrees.", latex: "\\frac{5\\pi}{6}", answer: "150", difficulty: 2, acceptedAnswers: ["150 degrees", "150°"], hint: "Multiply by $\\frac{180}{\\pi}$.", explanation: "$\\frac{5\\pi}{6}\\times\\frac{180}{\\pi}=150^\\circ$." },
        { id: "y11adv-trig-rad-p29", prompt: "Find the arc length.", latex: "r=10,\\quad \\theta=\\frac{2\\pi}{5}", answer: "4pi", difficulty: 3, acceptedAnswers: ["4\\pi", "4π"], hint: "$s=r\\theta$.", explanation: "$s=10\\times\\frac{2\\pi}{5}=4\\pi$." },
        { id: "y11adv-trig-rad-p30", prompt: "Which quadrant contains the angle?", latex: "\\frac{5\\pi}{3}", answer: "D", difficulty: 4, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between three-quarter turn and a full turn.", explanation: "$\\frac{3\\pi}{2}<\\frac{5\\pi}{3}<2\\pi$, so Q4." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trig-rad-mp1",
          prompt: "A sector of a circle has radius 9 cm and central angle $\\frac{\\pi}{3}$.",
          latex: "r=9,\\quad \\theta=\\frac{\\pi}{3}",
          answer: "3pi",
          hint: "Use $s=r\\theta$ for (a), $A=\\frac12r^2\\theta$ for (b), and $P=2r+s$ for (c).",
          explanation: "(a) $s=9\\times\\frac{\\pi}{3}=3\\pi$. (b) $A=\\frac12\\times81\\times\\frac{\\pi}{3}=\\frac{27\\pi}{2}$. (c) $P=18+3\\pi$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the arc length.", latex: "s=r\\theta", marks: 1, answer: "3pi", acceptedAnswers: ["3\\pi", "3π"], hint: "Substitute $r=9$, $\\theta=\\frac{\\pi}{3}$.", explanation: "$s=9\\times\\frac{\\pi}{3}=3\\pi$." },
            { key: "b", label: "(b)", prompt: "Find the sector area.", latex: "A=\\frac12r^2\\theta", marks: 2, answer: "27pi/2", acceptedAnswers: ["27\\pi/2", "27π/2", "13.5pi", "13.5\\pi"], hint: "Square the radius first.", explanation: "$A=\\frac12\\times81\\times\\frac{\\pi}{3}=\\frac{81\\pi}{6}=\\frac{27\\pi}{2}$." },
            { key: "c", label: "(c)", prompt: "Find the perimeter of the sector.", latex: "P=2r+s", marks: 1, answer: "18+3pi", acceptedAnswers: ["18+3\\pi", "18+3π"], hint: "Two radii plus the arc from (a).", explanation: "$P=2(9)+3\\pi=18+3\\pi$." },
          ],
        },
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
      masteryQuizPool: [
        { id: "y11adv-trig-circle-p1", prompt: "Which coordinate rule matches the unit circle?", latex: "\\theta", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$(\\cos\\theta,\\sin\\theta)$" }, { label: "B", text: "$(\\sin\\theta,\\cos\\theta)$" }, { label: "C", text: "$(\\tan\\theta,\\cos\\theta)$" }, { label: "D", text: "$(\\theta,\\sin\\theta)$" }], hint: "Cosine is the x-coordinate.", explanation: "The unit-circle point is $(\\cos\\theta,\\sin\\theta)$." },
        { id: "y11adv-trig-circle-p2", prompt: "State the period of the basic sine graph.", latex: "y=\\sin x", answer: "2pi", difficulty: 1, acceptedAnswers: ["2\\pi", "2π"], hint: "One full wave from 0 to $2\\pi$.", explanation: "Period of $y=\\sin x$ is $2\\pi$." },
        { id: "y11adv-trig-circle-p3", prompt: "State the period of the basic cosine graph.", latex: "y=\\cos x", answer: "2pi", difficulty: 1, acceptedAnswers: ["2\\pi", "2π"], hint: "Cosine repeats every full turn.", explanation: "Period of $y=\\cos x$ is $2\\pi$." },
        { id: "y11adv-trig-circle-p4", prompt: "State the starting value of the basic sine graph.", latex: "y=\\sin x,\\quad x=0", answer: "0", difficulty: 1, hint: "$\\sin 0=0$.", explanation: "$\\sin 0=0$, so the sine graph starts at the origin." },
        { id: "y11adv-trig-circle-p5", prompt: "Which quadrant contains the angle?", latex: "\\frac{4\\pi}{3}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between a half turn and three-quarter turn.", explanation: "$\\pi<\\frac{4\\pi}{3}<\\frac{3\\pi}{2}$, so Q3." },
        { id: "y11adv-trig-circle-p6", prompt: "State the period of the basic tangent graph.", latex: "y=\\tan x", answer: "pi", difficulty: 2, acceptedAnswers: ["\\pi", "π"], hint: "Tangent repeats every $\\pi$.", explanation: "Period of $y=\\tan x$ is $\\pi$." },
        { id: "y11adv-trig-circle-p7", prompt: "Which exact value is correct?", latex: "\\sin\\left(\\frac{7\\pi}{6}\\right)", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$\\frac12$" }, { label: "B", text: "$-\\frac12$" }, { label: "C", text: "$\\frac{\\sqrt3}{2}$" }, { label: "D", text: "$-\\frac{\\sqrt3}{2}$" }], hint: "Reference angle $\\pi/6$, sine negative in Q3.", explanation: "$\\sin(7\\pi/6)=-\\frac12$." },
        { id: "y11adv-trig-circle-p8", prompt: "Which signs are correct for the quadrant shown?", latex: "\\text{Quadrant III}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "Sine positive, cosine positive" }, { label: "B", text: "Sine positive, cosine negative" }, { label: "C", text: "Sine negative, cosine positive" }, { label: "D", text: "Sine negative, cosine negative" }], hint: "In Q3 both coordinates are negative.", explanation: "In Q3, $\\sin\\theta<0$ and $\\cos\\theta<0$." },
        { id: "y11adv-trig-circle-p9", prompt: "Which exact value is correct?", latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$-\\frac{\\sqrt3}{2}$" }, { label: "B", text: "$\\frac{\\sqrt3}{2}$" }, { label: "C", text: "$-\\frac12$" }, { label: "D", text: "$\\frac12$" }], hint: "Reference angle $\\pi/6$, cosine negative in Q2.", explanation: "$\\cos(5\\pi/6)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-trig-circle-p10", prompt: "State the first positive vertical asymptote of $y=\\tan x$.", latex: "y=\\tan x", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Where $\\cos x=0$ first.", explanation: "The first positive asymptote is $x=\\frac{\\pi}{2}$." },
        { id: "y11adv-trig-circle-p11", prompt: "Where is tangent undefined?", latex: "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Where cosine is zero" }, { label: "B", text: "Where sine is zero" }, { label: "C", text: "Where tangent is positive" }, { label: "D", text: "At any multiple of $\\pi$" }], hint: "Cosine is the denominator.", explanation: "Tangent is undefined where $\\cos\\theta=0$." },
        { id: "y11adv-trig-circle-p12", prompt: "Which graph starts at its maximum value?", latex: "x=0", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$y=\\sin x$" }, { label: "B", text: "$y=\\cos x$" }, { label: "C", text: "$y=\\tan x$" }, { label: "D", text: "$y=-\\sin x$" }], hint: "$\\cos 0=1$.", explanation: "Cosine starts at its maximum value 1 when $x=0$." },
        { id: "y11adv-trig-circle-p13", prompt: "Find the reference angle.", latex: "\\frac{5\\pi}{4}", answer: "pi/4", difficulty: 3, acceptedAnswers: ["\\pi/4", "π/4"], hint: "In Q3, reference $=\\theta-\\pi$.", explanation: "$\\frac{5\\pi}{4}-\\pi=\\frac{\\pi}{4}$." },
        { id: "y11adv-trig-circle-p14", prompt: "A student says tangent is undefined where sine is zero. Which option identifies the error?", latex: "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "Tangent is undefined where cosine is zero" }, { label: "B", text: "Tangent is never undefined" }, { label: "C", text: "Sine and cosine are always equal" }, { label: "D", text: "The reference angle should be doubled" }], hint: "Cosine is in the denominator.", explanation: "Tangent is undefined where $\\cos\\theta=0$, not where $\\sin\\theta=0$." },
        { id: "y11adv-trig-circle-p15", prompt: "Which feature belongs to the basic tangent graph?", latex: "y=\\tan x", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Range $[-1,1]$" }, { label: "B", text: "Period $2\\pi$" }, { label: "C", text: "Vertical asymptote at $x=\\frac{\\pi}{2}$" }, { label: "D", text: "Starting value 1" }], hint: "Tangent is undefined where cosine is zero.", explanation: "$y=\\tan x$ has a vertical asymptote at $x=\\frac{\\pi}{2}$." },
        { id: "y11adv-trig-circle-p16", prompt: "Which exact value is correct?", latex: "\\tan\\left(\\frac{2\\pi}{3}\\right)", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$\\sqrt3$" }, { label: "B", text: "$\\frac{\\sqrt3}{3}$" }, { label: "C", text: "$1$" }, { label: "D", text: "$-\\sqrt3$" }], hint: "Reference angle $\\pi/3$; tangent negative in Q2.", explanation: "$\\tan(2\\pi/3)=-\\sqrt3$." },
        { id: "y11adv-trig-circle-p17", prompt: "Which statement correctly describes the basic cosine graph?", latex: "y=\\cos x", answer: "D", difficulty: 4, choices: [{ label: "A", text: "Period $\\pi$, range all reals" }, { label: "B", text: "Period $\\pi$, range $[-1,1]$" }, { label: "C", text: "Period $2\\pi$, range all reals" }, { label: "D", text: "Period $2\\pi$, range $[-1,1]$" }], hint: "Cosine stays between $-1$ and 1.", explanation: "$y=\\cos x$ has period $2\\pi$ and range $[-1,1]$." },
        { id: "y11adv-trig-circle-p18", prompt: "Find the value, simplifying with the related-angle rule $\\cos(\\pi-\\theta)=-\\cos\\theta$.", latex: "\\cos\\left(\\frac{2\\pi}{3}\\right)", answer: "-1/2", difficulty: 5, acceptedAnswers: ["-0.5", "−1/2", "−0.5"], hint: "$\\frac{2\\pi}{3}=\\pi-\\frac{\\pi}{3}$, so $\\cos=-\\cos(\\pi/3)$.", explanation: "$\\cos(2\\pi/3)=-\\cos(\\pi/3)=-\\frac12$." },
        { id: "y11adv-trig-circle-p19", prompt: "Evaluate, reading both coordinates from the unit circle.", latex: "\\sin\\left(\\frac{5\\pi}{6}\\right)+\\cos\\left(\\frac{5\\pi}{6}\\right)", answer: "(1-sqrt(3))/2", difficulty: 5, acceptedAnswers: ["1/2-sqrt(3)/2", "(1-\\sqrt3)/2", "0.5-sqrt(3)/2"], hint: "$\\sin(5\\pi/6)=\\frac12$, $\\cos(5\\pi/6)=-\\frac{\\sqrt3}{2}$.", explanation: "$\\frac12+\\left(-\\frac{\\sqrt3}{2}\\right)=\\frac{1-\\sqrt3}{2}$." },
        { id: "y11adv-trig-circle-p20", prompt: "On $[0,2\\pi]$, give the larger angle where $\\cos x=0$.", latex: "\\cos x=0,\\quad x\\in[0,2\\pi]", answer: "3pi/2", difficulty: 5, acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "Cosine is zero at $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$.", explanation: "On $[0,2\\pi]$, $\\cos x=0$ at $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$; the larger is $\\frac{3\\pi}{2}$." },
        { id: "y11adv-trig-circle-p21", prompt: "How many solutions does $\\sin x=0$ have on $[0,2\\pi]$?", latex: "\\sin x=0,\\quad x\\in[0,2\\pi]", answer: "3", difficulty: 5, hint: "List the zeros of sine on the interval.", explanation: "$\\sin x=0$ at $x=0,\\pi,2\\pi$ — three solutions." },
        { id: "y11adv-trig-circle-p22", prompt: "Use $\\sin^2\\theta+\\cos^2\\theta=1$: if $\\cos\\theta=\\frac{3}{5}$ and $\\theta$ is in Q4, find $\\sin\\theta$.", latex: "\\cos\\theta=\\frac35,\\quad \\text{Q4}", answer: "-4/5", difficulty: 5, acceptedAnswers: ["-0.8", "−4/5", "−0.8"], hint: "$\\sin^2\\theta=1-\\frac{9}{25}$; sine negative in Q4.", explanation: "$\\sin^2\\theta=1-\\frac{9}{25}=\\frac{16}{25}$, so $\\sin\\theta=-\\frac45$ in Q4." },
        { id: "y11adv-trig-circle-p23", prompt: "Which exact value is correct?", latex: "\\cos\\left(\\frac{7\\pi}{6}\\right)", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$\\frac{\\sqrt3}{2}$" }, { label: "B", text: "$-\\frac12$" }, { label: "C", text: "$\\frac12$" }, { label: "D", text: "$-\\frac{\\sqrt3}{2}$" }], hint: "Reference angle $\\pi/6$; cosine negative in Q3.", explanation: "$\\cos(7\\pi/6)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-trig-circle-p24", prompt: "Which quadrant contains the angle?", latex: "\\frac{11\\pi}{6}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between three-quarter turn and a full turn.", explanation: "$\\frac{3\\pi}{2}<\\frac{11\\pi}{6}<2\\pi$, so Q4." },
        { id: "y11adv-trig-circle-p25", prompt: "State the maximum value of $y=\\sin x$.", latex: "y=\\sin x", answer: "1", difficulty: 1, hint: "Top of the unit circle.", explanation: "Maximum of $y=\\sin x$ is 1." },
        { id: "y11adv-trig-circle-p26", prompt: "Evaluate.", latex: "\\cos\\pi", answer: "-1", difficulty: 2, acceptedAnswers: ["−1"], hint: "Leftmost point of the unit circle.", explanation: "$\\cos\\pi=-1$." },
        { id: "y11adv-trig-circle-p27", prompt: "A student gives $y=\\tan x$ the range $[-1,1]$. Which option identifies the error?", latex: "y=\\tan x", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Tangent is never negative" }, { label: "B", text: "Tangent has no period" }, { label: "C", text: "Tangent has range all real numbers" }, { label: "D", text: "Tangent equals sine over sine" }], hint: "Tangent is unbounded.", explanation: "$y=\\tan x$ has range all real numbers, not $[-1,1]$." },
        { id: "y11adv-trig-circle-p28", prompt: "Find the reference angle.", latex: "\\frac{4\\pi}{3}", answer: "pi/3", difficulty: 3, acceptedAnswers: ["\\pi/3", "π/3"], hint: "In Q3, reference $=\\theta-\\pi$.", explanation: "$\\frac{4\\pi}{3}-\\pi=\\frac{\\pi}{3}$." },
        { id: "y11adv-trig-circle-p29", prompt: "Which exact value is correct?", latex: "\\sin\\left(\\frac{5\\pi}{3}\\right)", answer: "D", difficulty: 4, choices: [{ label: "A", text: "$\\frac{\\sqrt3}{2}$" }, { label: "B", text: "$\\frac12$" }, { label: "C", text: "$-\\frac12$" }, { label: "D", text: "$-\\frac{\\sqrt3}{2}$" }], hint: "Reference angle $\\pi/3$; sine negative in Q4.", explanation: "$\\sin(5\\pi/3)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-trig-circle-p30", prompt: "Evaluate.", latex: "\\sin\\frac{3\\pi}{2}", answer: "-1", difficulty: 2, acceptedAnswers: ["−1"], hint: "Bottom of the unit circle.", explanation: "$\\sin\\frac{3\\pi}{2}=-1$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-trig-circle-mp1",
          prompt: "Consider the angle $\\theta=\\frac{5\\pi}{6}$ on the unit circle.",
          latex: "\\theta=\\frac{5\\pi}{6}",
          answer: "pi/6",
          hint: "(a) Find the reference angle. (b) Read sine using the Q2 sign. (c) Read cosine using the Q2 sign.",
          explanation: "(a) reference $=\\pi-\\frac{5\\pi}{6}=\\frac{\\pi}{6}$. (b) $\\sin(5\\pi/6)=\\frac12$. (c) $\\cos(5\\pi/6)=-\\frac{\\sqrt3}{2}$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the reference angle.", latex: "\\pi-\\theta", marks: 1, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "In Q2, reference $=\\pi-\\theta$.", explanation: "$\\pi-\\frac{5\\pi}{6}=\\frac{\\pi}{6}$." },
            { key: "b", label: "(b)", prompt: "Find $\\sin\\left(\\frac{5\\pi}{6}\\right)$.", latex: "\\sin\\left(\\frac{5\\pi}{6}\\right)", marks: 1, answer: "1/2", acceptedAnswers: ["0.5"], hint: "Sine is positive in Q2; use the reference angle.", explanation: "$\\sin(5\\pi/6)=\\sin(\\pi/6)=\\frac12$." },
            { key: "c", label: "(c)", prompt: "Find $\\cos\\left(\\frac{5\\pi}{6}\\right)$.", latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)", marks: 2, answer: "-sqrt(3)/2", acceptedAnswers: ["-\\sqrt{3}/2", "−sqrt(3)/2", "-√3/2"], hint: "Cosine is negative in Q2.", explanation: "$\\cos(5\\pi/6)=-\\cos(\\pi/6)=-\\frac{\\sqrt3}{2}$." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "trigonometry-measure-angles-exam-practice") {
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
        formulaAnswer("y11adv-trig-exam-i1", "Convert the angle to degrees.", "\\frac{3\\pi}{4}", "135", ["135 degrees", "135°"]),
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
        formulaAnswer("y11adv-trig-exam-m1", "Convert the angle to radians.", "180^\\circ", "pi", ["\\pi", "π"]),
        formulaAnswer("y11adv-trig-exam-m2", "Convert the angle to degrees.", "\\frac{\\pi}{4}", "45", ["45 degrees", "45°"]),
        practicalChoice("y11adv-trig-exam-m3", "Which exact value is correct?", "A", ["$\\frac12$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$", "$1$"], "Use the 30-60-90 triangle.", "\\cos\\left(\\frac{\\pi}{3}\\right)"),
        formulaAnswer("y11adv-trig-exam-m4", "Find the arc length.", "r=5,\\quad \\theta=\\frac{2\\pi}{5}", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-trig-exam-m5", "Find the sector area.", "r=6,\\quad \\theta=\\frac{\\pi}{3}", "6pi", ["6\\pi", "6π"]),
        practicalChoice("y11adv-trig-exam-m6", "Which quadrant contains the angle?", "D", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between three quarters of a turn and one full turn.", "\\frac{5\\pi}{3}"),
        practicalChoice("y11adv-trig-exam-m7", "Which statement identifies the common tangent error?", "B", ["Tangent is undefined where sine is zero", "Tangent is undefined where cosine is zero", "Tangent has range [-1,1]", "Tangent has period 2pi"], "Tangent has cosine in the denominator.", "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}"),
        practicalChoice("y11adv-trig-exam-m8", "Which graph has starting value one?", "C", ["$y=\\sin x$", "$y=\\tan x$", "$y=\\cos x$", "$y=-\\cos x$"], "Cosine starts at 1 when x is zero.", "x=0"),
        practicalChoice("y11adv-trig-exam-m9", "Which exact value is correct?", "D", ["$\\frac{\\sqrt3}{2}$", "$-\\frac{\\sqrt2}{2}$", "$\\frac12$", "$-\\frac{\\sqrt3}{2}$"], "Use the reference angle and quadrant III cosine sign.", "\\cos\\left(\\frac{7\\pi}{6}\\right)"),
        formulaAnswer("y11adv-trig-exam-m10", "State the period of the basic tangent graph.", "y=\\tan x", "pi", ["\\pi", "π"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-trig-exam-pool1", prompt: "Convert the angle to radians.", latex: "180^\\circ", answer: "pi", difficulty: 1, acceptedAnswers: ["\\pi", "π"], hint: "A half turn is $\\pi$.", explanation: "$180\\times\\frac{\\pi}{180}=\\pi$." },
        { id: "y11adv-trig-exam-pool2", prompt: "Convert the angle to degrees.", latex: "\\frac{\\pi}{4}", answer: "45", difficulty: 1, acceptedAnswers: ["45 degrees", "45°"], hint: "Multiply by $\\frac{180}{\\pi}$.", explanation: "$\\frac{\\pi}{4}\\times\\frac{180}{\\pi}=45^\\circ$." },
        { id: "y11adv-trig-exam-pool3", prompt: "Which exact value is correct?", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac12$" }, { label: "B", text: "$\\frac{\\sqrt2}{2}$" }, { label: "C", text: "$\\frac{\\sqrt3}{2}$" }, { label: "D", text: "$1$" }], hint: "Use the 30-60-90 triangle.", explanation: "$\\cos(\\pi/3)=\\frac12$." },
        { id: "y11adv-trig-exam-pool4", prompt: "State the amplitude.", latex: "y=5\\sin(2x)+3", answer: "5", difficulty: 1, hint: "Amplitude $=|a|$.", explanation: "$|5|=5$." },
        { id: "y11adv-trig-exam-pool5", prompt: "Find the arc length.", latex: "r=5,\\quad \\theta=\\frac{2\\pi}{5}", answer: "2pi", difficulty: 2, acceptedAnswers: ["2\\pi", "2π"], hint: "$s=r\\theta$.", explanation: "$s=5\\times\\frac{2\\pi}{5}=2\\pi$." },
        { id: "y11adv-trig-exam-pool6", prompt: "Find the sector area.", latex: "r=6,\\quad \\theta=\\frac{\\pi}{3}", answer: "6pi", difficulty: 2, acceptedAnswers: ["6\\pi", "6π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times36\\times\\frac{\\pi}{3}=6\\pi$." },
        { id: "y11adv-trig-exam-pool7", prompt: "State the period.", latex: "y=\\cos(3x)-2", answer: "2pi/3", difficulty: 2, acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "$b=3$, period $=\\frac{2\\pi}{3}$." },
        { id: "y11adv-trig-exam-pool8", prompt: "Which graph has starting value 1?", latex: "x=0", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$y=\\sin x$" }, { label: "B", text: "$y=\\tan x$" }, { label: "C", text: "$y=\\cos x$" }, { label: "D", text: "$y=-\\cos x$" }], hint: "$\\cos 0=1$.", explanation: "Cosine starts at 1." },
        { id: "y11adv-trig-exam-pool9", prompt: "Which quadrant contains the angle?", latex: "\\frac{5\\pi}{3}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between three-quarter turn and a full turn.", explanation: "$\\frac{3\\pi}{2}<\\frac{5\\pi}{3}<2\\pi$, so Q4." },
        { id: "y11adv-trig-exam-pool10", prompt: "Which exact value is correct?", latex: "\\cos\\left(\\frac{7\\pi}{6}\\right)", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\sqrt3}{2}$" }, { label: "B", text: "$-\\frac{\\sqrt2}{2}$" }, { label: "C", text: "$\\frac12$" }, { label: "D", text: "$-\\frac{\\sqrt3}{2}$" }], hint: "Reference angle $\\pi/6$; cosine negative in Q3.", explanation: "$\\cos(7\\pi/6)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-trig-exam-pool11", prompt: "State the period.", latex: "y=\\sin(2x)+4", answer: "pi", difficulty: 3, acceptedAnswers: ["\\pi", "π"], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "$b=2$, period $=\\pi$." },
        { id: "y11adv-trig-exam-pool12", prompt: "State the maximum value.", latex: "y=4\\sin\\!\\left(x+\\frac{\\pi}{6}\\right)-1", answer: "3", difficulty: 3, hint: "Max $=d+|a|$.", explanation: "$-1+4=3$." },
        { id: "y11adv-trig-exam-pool13", prompt: "State the size of the phase shift.", latex: "y=\\sin\\!\\left(2x-\\frac{\\pi}{2}\\right)", answer: "pi/4", difficulty: 4, acceptedAnswers: ["\\pi/4", "π/4"], hint: "Phase shift $=-\\frac{c}{b}$; rewrite as $2(x-\\frac{\\pi}{4})$.", explanation: "$2x-\\frac{\\pi}{2}=2(x-\\frac{\\pi}{4})$, so shift size is $\\frac{\\pi}{4}$." },
        { id: "y11adv-trig-exam-pool14", prompt: "Convert to radians, then find the arc length.", latex: "r=9,\\quad \\theta=120^\\circ", answer: "6pi", difficulty: 4, acceptedAnswers: ["6\\pi", "6π"], hint: "$120^\\circ=\\frac{2\\pi}{3}$.", explanation: "$s=9\\times\\frac{2\\pi}{3}=6\\pi$." },
        { id: "y11adv-trig-exam-pool15", prompt: "A student says the amplitude of $y=3\\cos(2x)-1$ is 2. Identify the error.", latex: "y=3\\cos(2x)-1", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Amplitude is the period divided by 2" }, { label: "B", text: "Amplitude is $|a|=3$; $d=-1$ does not change it" }, { label: "C", text: "Amplitude is $|b|=2$" }, { label: "D", text: "Amplitude is $d=-1$" }], hint: "Amplitude $=|a|$.", explanation: "Amplitude $=|3|=3$; the vertical shift does not affect amplitude." },
        { id: "y11adv-trig-exam-pool16", prompt: "Find the sector area.", latex: "r=9,\\quad \\theta=\\frac{2\\pi}{3}", answer: "27pi", difficulty: 4, acceptedAnswers: ["27\\pi", "27π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times81\\times\\frac{2\\pi}{3}=27\\pi$." },
        { id: "y11adv-trig-exam-pool17", prompt: "State the minimum value.", latex: "y=2\\sin\\!\\left(3x-\\frac{\\pi}{2}\\right)+1", answer: "-1", difficulty: 4, acceptedAnswers: ["−1"], hint: "Min $=d-|a|$.", explanation: "$1-2=-1$." },
        { id: "y11adv-trig-exam-pool18", prompt: "For $y=2\\sin\\!\\left(3x-\\frac{\\pi}{2}\\right)+1$, find the phase shift size.", latex: "y=2\\sin\\!\\left(3x-\\frac{\\pi}{2}\\right)+1", answer: "pi/6", difficulty: 5, acceptedAnswers: ["\\pi/6", "π/6"], hint: "Factor: $3x-\\frac{\\pi}{2}=3(x-\\frac{\\pi}{6})$.", explanation: "Phase shift $=\\frac{\\pi/2}{3}=\\frac{\\pi}{6}$ to the right." },
        { id: "y11adv-trig-exam-pool19", prompt: "A sector of radius 5 has perimeter $10+2\\pi$. Find its central angle in radians.", latex: "r=5,\\quad P=10+2\\pi", answer: "2pi/5", difficulty: 5, acceptedAnswers: ["2\\pi/5", "2π/5"], hint: "Arc $=P-2r$, then $\\theta=s/r$.", explanation: "$s=(10+2\\pi)-10=2\\pi$; $\\theta=\\frac{2\\pi}{5}$." },
        { id: "y11adv-trig-exam-pool20", prompt: "Evaluate using exact values.", latex: "\\tan\\left(\\frac{\\pi}{3}\\right)\\times\\cos\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)/2", difficulty: 5, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "$\\tan(\\pi/3)=\\sqrt3$, $\\cos(\\pi/3)=\\frac12$.", explanation: "$\\sqrt3\\times\\frac12=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-trig-exam-pool21", prompt: "The graph $y=a\\cos(bx)$ has amplitude 4 and period $\\pi$. Find $a+b$ (with $a>0$).", latex: "\\text{amplitude }4,\\text{ period }\\pi", answer: "6", difficulty: 5, hint: "$a=4$; period $=\\frac{2\\pi}{b}=\\pi$ gives $b=2$.", explanation: "$a=4$, $b=2$, so $a+b=6$." },
        { id: "y11adv-trig-exam-pool22", prompt: "Find the range of $y=3\\sin(2x)-1$ as the upper bound value.", latex: "y=3\\sin(2x)-1", answer: "2", difficulty: 5, hint: "Maximum $=d+|a|$.", explanation: "Max $=-1+3=2$; the range is $[-4,2]$, upper bound 2." },
        { id: "y11adv-trig-exam-pool23", prompt: "Which exact value is correct?", latex: "\\sin\\left(\\frac{\\pi}{3}\\right)", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac12$" }, { label: "B", text: "$\\frac{\\sqrt2}{2}$" }, { label: "C", text: "$\\frac{\\sqrt3}{2}$" }, { label: "D", text: "$1$" }], hint: "Opposite to 60° is $\\sqrt3$.", explanation: "$\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-trig-exam-pool24", prompt: "State the period of the basic tangent graph.", latex: "y=\\tan x", answer: "pi", difficulty: 2, acceptedAnswers: ["\\pi", "π"], hint: "Half the sine period.", explanation: "Period of $y=\\tan x$ is $\\pi$." },
        { id: "y11adv-trig-exam-pool25", prompt: "Find the angle $\\theta$ in radians.", latex: "s=4\\pi,\\quad r=8", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "$\\theta=s/r$.", explanation: "$\\theta=\\frac{4\\pi}{8}=\\frac{\\pi}{2}$." },
        { id: "y11adv-trig-exam-pool26", prompt: "Convert the angle to radians.", latex: "225^\\circ", answer: "5pi/4", difficulty: 3, acceptedAnswers: ["5\\pi/4", "5π/4"], hint: "Cancel the common factor 45.", explanation: "$225\\times\\frac{\\pi}{180}=\\frac{5\\pi}{4}$." },
        { id: "y11adv-trig-exam-pool27", prompt: "State the amplitude.", latex: "y=-3\\sin(2x)+5", answer: "3", difficulty: 2, hint: "Amplitude $=|a|$.", explanation: "$|-3|=3$." },
        { id: "y11adv-trig-exam-pool28", prompt: "Which is the correct vertical asymptote of $y=\\tan x$ closest to and right of the origin?", latex: "y=\\tan x", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$x=\\pi$" }, { label: "B", text: "$x=\\frac{\\pi}{2}$" }, { label: "C", text: "$x=2\\pi$" }, { label: "D", text: "$x=\\frac{\\pi}{4}$" }], hint: "Where $\\cos x=0$ first.", explanation: "First positive asymptote is $x=\\frac{\\pi}{2}$." },
        { id: "y11adv-trig-exam-pool29", prompt: "Convert the angle to degrees.", latex: "\\frac{3\\pi}{4}", answer: "135", difficulty: 2, acceptedAnswers: ["135 degrees", "135°"], hint: "Multiply by $\\frac{180}{\\pi}$.", explanation: "$\\frac{3\\pi}{4}\\times\\frac{180}{\\pi}=135^\\circ$." },
        { id: "y11adv-trig-exam-pool30", prompt: "A sector has area $8\\pi$ and radius 4. Find its central angle in radians.", latex: "A=8\\pi,\\quad r=4", answer: "pi", difficulty: 5, acceptedAnswers: ["\\pi", "π"], hint: "$\\theta=\\frac{2A}{r^2}$.", explanation: "$\\theta=\\frac{2\\times8\\pi}{16}=\\pi$." },
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
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the amplitude.",
              latex: "\\text{amplitude}=|a|",
              marks: 1,
              answer: "2",
              acceptedAnswers: [],
              hint: "Amplitude = |a|. Read the coefficient of sin.",
              explanation: "a = 2, so amplitude = |2| = 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the period.",
              latex: "\\text{period}=\\frac{2\\pi}{b}",
              marks: 1,
              answer: "2pi/3",
              acceptedAnswers: ["2\\pi/3", "2π/3"],
              hint: "Period = 2π/b. Here b = 3.",
              explanation: "b = 3. Period = 2π/3.",
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
              explanation: "c = −π/2, b = 3. Phase shift = (π/2)/3 = π/6 to the right.",
            },
            {
              key: "d",
              label: "(d)",
              prompt: "State the maximum value of y.",
              latex: "\\text{max}=d+|a|",
              marks: 1,
              answer: "3",
              acceptedAnswers: [],
              hint: "Maximum = d + |a| = 1 + 2.",
              explanation: "d = 1, |a| = 2. Maximum = 1 + 2 = 3.",
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
        {
          ...formulaAnswer("y11adv-ev-m1", "Evaluate without a calculator.", "\\sin\\left(\\frac{\\pi}{6}\\right)", "1/2", ["0.5"]),
          hint: "Opposite to 30° is 1, hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-m2", "Evaluate without a calculator.", "\\cos\\left(\\frac{\\pi}{3}\\right)", "1/2", ["0.5"]),
          hint: "Adjacent to 60° is 1, hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-m3", "Evaluate without a calculator.", "\\sin\\left(\\frac{\\pi}{3}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2"]),
          hint: "Opposite to 60° is √3, hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-m4", "Evaluate without a calculator.", "\\cos\\left(\\frac{\\pi}{6}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2"]),
          hint: "Adjacent to 30° is √3, hypotenuse is 2.",
        },
        {
          ...formulaAnswer("y11adv-ev-m5", "Evaluate without a calculator.", "\\tan\\left(\\frac{\\pi}{3}\\right)", "sqrt(3)", ["\\sqrt{3}"]),
          hint: "Opposite to 60° is √3, adjacent is 1.",
        },
        {
          ...formulaAnswer("y11adv-ev-m6", "Evaluate without a calculator.", "\\sin\\left(\\frac{\\pi}{4}\\right)", "sqrt(2)/2", ["1/sqrt(2)", "\\sqrt{2}/2"]),
          hint: "Opposite is 1, hypotenuse is √2 in the 45-45-90 triangle.",
        },
        practicalChoice(
          "y11adv-ev-m7",
          "Which is the correct value of $\\cos\\!\\left(\\frac{\\pi}{4}\\right)$?",
          "A",
          ["$\\frac{\\sqrt{2}}{2}$", "$1$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$"],
          "cos(π/4) = adjacent/hypotenuse = 1/√2 = √2/2.",
          "\\cos\\left(\\frac{\\pi}{4}\\right)"
        ),
        {
          ...formulaAnswer("y11adv-ev-m8", "Evaluate without a calculator.", "2\\sin\\!\\left(\\frac{\\pi}{6}\\right)+\\cos\\!\\left(\\frac{\\pi}{3}\\right)", "3/2", []),
          hint: "Substitute sin(π/6) = 1/2 and cos(π/3) = 1/2, then compute 2(1/2) + 1/2.",
        },
        {
          ...formulaAnswer("y11adv-ev-m9", "Evaluate without a calculator.", "\\tan\\!\\left(\\frac{\\pi}{3}\\right)\\times\\cos\\!\\left(\\frac{\\pi}{3}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2"]),
          hint: "Substitute tan(π/3) = √3 and cos(π/3) = 1/2, then multiply.",
        },
        practicalChoice(
          "y11adv-ev-m10",
          "A student writes $\\sin\\!\\left(\\frac{\\pi}{3}\\right)=\\frac{1}{2}$. Identify the error.",
          "B",
          ["They used the wrong triangle", "They swapped $\\sin(\\frac{\\pi}{3})$ and $\\sin(\\frac{\\pi}{6})$", "They forgot to rationalise", "The hypotenuse should be √3"],
          "sin(π/3) = √3/2. The value 1/2 belongs to sin(π/6).",
          "\\sin\\left(\\frac{\\pi}{3}\\right)"
        ),
      ],
      masteryQuizPool: [
        { id: "y11adv-ev-p1", prompt: "Evaluate without a calculator.", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)", answer: "1/2", difficulty: 1, acceptedAnswers: ["0.5"], hint: "Opposite to 30° is 1, hypotenuse 2.", explanation: "$\\sin(\\pi/6)=\\frac12$." },
        { id: "y11adv-ev-p2", prompt: "Evaluate without a calculator.", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)", answer: "1/2", difficulty: 1, acceptedAnswers: ["0.5"], hint: "Adjacent to 60° is 1, hypotenuse 2.", explanation: "$\\cos(\\pi/3)=\\frac12$." },
        { id: "y11adv-ev-p3", prompt: "Evaluate without a calculator.", latex: "\\tan\\left(\\frac{\\pi}{4}\\right)", answer: "1", difficulty: 1, hint: "Opposite equals adjacent.", explanation: "$\\tan(\\pi/4)=\\frac11=1$." },
        { id: "y11adv-ev-p4", prompt: "Which value is correct?", latex: "\\cos\\left(\\frac{\\pi}{4}\\right)", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac{\\sqrt2}{2}$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\frac{\\sqrt3}{2}$" }, { label: "D", text: "$\\frac12$" }], hint: "Use the 45-45-90 triangle.", explanation: "$\\cos(\\pi/4)=\\frac{1}{\\sqrt2}=\\frac{\\sqrt2}{2}$." },
        { id: "y11adv-ev-p5", prompt: "Evaluate without a calculator.", latex: "\\sin\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)/2", difficulty: 2, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "Opposite to 60° is $\\sqrt3$.", explanation: "$\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ev-p6", prompt: "Evaluate without a calculator.", latex: "\\cos\\left(\\frac{\\pi}{6}\\right)", answer: "sqrt(3)/2", difficulty: 2, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "Adjacent to 30° is $\\sqrt3$.", explanation: "$\\cos(\\pi/6)=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ev-p7", prompt: "Evaluate without a calculator.", latex: "\\tan\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)", difficulty: 2, acceptedAnswers: ["\\sqrt{3}", "√3"], hint: "Opposite $\\sqrt3$, adjacent 1.", explanation: "$\\tan(\\pi/3)=\\sqrt3$." },
        { id: "y11adv-ev-p8", prompt: "Evaluate without a calculator.", latex: "\\sin\\left(\\frac{\\pi}{4}\\right)", answer: "sqrt(2)/2", difficulty: 2, acceptedAnswers: ["1/sqrt(2)", "\\sqrt{2}/2", "√2/2"], hint: "Opposite 1, hypotenuse $\\sqrt2$.", explanation: "$\\sin(\\pi/4)=\\frac{\\sqrt2}{2}$." },
        { id: "y11adv-ev-p9", prompt: "Evaluate without a calculator (rationalise).", latex: "\\tan\\left(\\frac{\\pi}{6}\\right)", answer: "sqrt(3)/3", difficulty: 3, acceptedAnswers: ["1/sqrt(3)", "\\sqrt{3}/3", "1/√3"], hint: "$\\tan(\\pi/6)=\\frac{\\sin}{\\cos}$, then rationalise.", explanation: "$\\tan(\\pi/6)=\\frac{1/2}{\\sqrt3/2}=\\frac{1}{\\sqrt3}=\\frac{\\sqrt3}{3}$." },
        { id: "y11adv-ev-p10", prompt: "Which value is correct?", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\sqrt3}{2}$" }, { label: "B", text: "$1$" }, { label: "C", text: "$\\frac{\\sqrt2}{2}$" }, { label: "D", text: "$\\frac12$" }], hint: "Adjacent to 60° is 1.", explanation: "$\\cos(\\pi/3)=\\frac12$." },
        { id: "y11adv-ev-p11", prompt: "Evaluate without a calculator.", latex: "\\sin^2\\!\\left(\\frac{\\pi}{3}\\right)+\\cos^2\\!\\left(\\frac{\\pi}{3}\\right)", answer: "1", difficulty: 3, hint: "Pythagorean identity.", explanation: "$\\left(\\frac{\\sqrt3}{2}\\right)^2+\\left(\\frac12\\right)^2=\\frac34+\\frac14=1$." },
        { id: "y11adv-ev-p12", prompt: "Evaluate without a calculator.", latex: "2\\cos\\!\\left(\\frac{\\pi}{3}\\right)+\\tan\\!\\left(\\frac{\\pi}{4}\\right)", answer: "2", difficulty: 3, hint: "$\\cos(\\pi/3)=\\frac12$, $\\tan(\\pi/4)=1$.", explanation: "$2(\\frac12)+1=1+1=2$." },
        { id: "y11adv-ev-p13", prompt: "A student writes $\\tan(\\frac{\\pi}{3})=1$. Identify the error.", latex: "\\tan\\left(\\frac{\\pi}{3}\\right)", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\tan(\\frac{\\pi}{3})$ is undefined" }, { label: "B", text: "$\\tan(\\frac{\\pi}{3})=\\frac12$" }, { label: "C", text: "$\\tan(\\frac{\\pi}{4})=1$, not $\\tan(\\frac{\\pi}{3})$" }, { label: "D", text: "$\\tan(\\frac{\\pi}{3})=\\frac{\\sqrt2}{2}$" }], hint: "$\\tan(\\pi/3)=\\sqrt3$.", explanation: "$\\tan(\\pi/3)=\\sqrt3\\approx1.73$; the value 1 belongs to $\\tan(\\pi/4)$." },
        { id: "y11adv-ev-p14", prompt: "Evaluate without a calculator.", latex: "2\\sin\\!\\left(\\frac{\\pi}{6}\\right)+\\cos\\!\\left(\\frac{\\pi}{3}\\right)", answer: "3/2", difficulty: 4, acceptedAnswers: ["1.5"], hint: "$\\sin(\\pi/6)=\\cos(\\pi/3)=\\frac12$.", explanation: "$2(\\frac12)+\\frac12=\\frac32$." },
        { id: "y11adv-ev-p15", prompt: "Evaluate without a calculator.", latex: "\\tan\\!\\left(\\frac{\\pi}{3}\\right)\\times\\cos\\!\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)/2", difficulty: 4, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "$\\tan(\\pi/3)=\\sqrt3$, $\\cos(\\pi/3)=\\frac12$.", explanation: "$\\sqrt3\\times\\frac12=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ev-p16", prompt: "Evaluate without a calculator.", latex: "\\sin\\!\\left(\\frac{\\pi}{6}\\right)\\cos\\!\\left(\\frac{\\pi}{3}\\right)+\\cos\\!\\left(\\frac{\\pi}{6}\\right)\\sin\\!\\left(\\frac{\\pi}{3}\\right)", answer: "1", difficulty: 4, hint: "This equals $\\sin(\\frac{\\pi}{6}+\\frac{\\pi}{3})=\\sin\\frac{\\pi}{2}$.", explanation: "$\\frac12\\cdot\\frac12+\\frac{\\sqrt3}{2}\\cdot\\frac{\\sqrt3}{2}=\\frac14+\\frac34=1$." },
        { id: "y11adv-ev-p17", prompt: "Evaluate without a calculator.", latex: "\\frac{\\sin(\\pi/3)}{\\cos(\\pi/6)}", answer: "1", difficulty: 4, hint: "Both equal $\\frac{\\sqrt3}{2}$.", explanation: "$\\frac{\\sqrt3/2}{\\sqrt3/2}=1$." },
        { id: "y11adv-ev-p18", prompt: "A student writes $\\cos(\\frac{\\pi}{4})=\\sqrt2$. Identify the error.", latex: "\\cos\\left(\\frac{\\pi}{4}\\right)", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\cos(\\frac{\\pi}{4})=1$" }, { label: "B", text: "$\\sqrt2$ is the hypotenuse; $\\cos(\\frac{\\pi}{4})=\\frac{1}{\\sqrt2}=\\frac{\\sqrt2}{2}$" }, { label: "C", text: "$\\cos(\\frac{\\pi}{4})=\\frac{\\sqrt3}{2}$" }, { label: "D", text: "The value is correct" }], hint: "Divide the leg by the hypotenuse.", explanation: "$\\cos(\\pi/4)=\\frac{1}{\\sqrt2}=\\frac{\\sqrt2}{2}$, not $\\sqrt2$." },
        { id: "y11adv-ev-p19", prompt: "Evaluate without a calculator.", latex: "4\\sin^2\\!\\left(\\frac{\\pi}{6}\\right)", answer: "1", difficulty: 5, hint: "$\\sin(\\pi/6)=\\frac12$, then square and multiply.", explanation: "$4\\times\\left(\\frac12\\right)^2=4\\times\\frac14=1$." },
        { id: "y11adv-ev-p20", prompt: "Evaluate without a calculator.", latex: "\\tan^2\\!\\left(\\frac{\\pi}{3}\\right)-\\tan^2\\!\\left(\\frac{\\pi}{4}\\right)", answer: "2", difficulty: 5, hint: "$\\tan(\\pi/3)=\\sqrt3$, $\\tan(\\pi/4)=1$.", explanation: "$(\\sqrt3)^2-(1)^2=3-1=2$." },
        { id: "y11adv-ev-p21", prompt: "Evaluate without a calculator.", latex: "\\frac{1}{\\cos^2(\\pi/3)}", answer: "4", difficulty: 5, hint: "$\\cos(\\pi/3)=\\frac12$.", explanation: "$\\frac{1}{(1/2)^2}=\\frac{1}{1/4}=4$." },
        { id: "y11adv-ev-p22", prompt: "Evaluate without a calculator.", latex: "\\sin\\!\\left(\\frac{\\pi}{4}\\right)\\cos\\!\\left(\\frac{\\pi}{4}\\right)", answer: "1/2", difficulty: 5, acceptedAnswers: ["0.5"], hint: "Both factors are $\\frac{\\sqrt2}{2}$.", explanation: "$\\frac{\\sqrt2}{2}\\cdot\\frac{\\sqrt2}{2}=\\frac{2}{4}=\\frac12$." },
        { id: "y11adv-ev-p23", prompt: "Evaluate without a calculator.", latex: "2\\sin\\!\\left(\\frac{\\pi}{3}\\right)\\cos\\!\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)/2", difficulty: 5, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "$\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$, $\\cos(\\pi/3)=\\frac12$.", explanation: "$2\\cdot\\frac{\\sqrt3}{2}\\cdot\\frac12=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ev-p24", prompt: "A right triangle has the 30° angle with hypotenuse 8. Find the side opposite the 30° angle.", latex: "\\text{hyp}=8,\\quad \\theta=\\frac{\\pi}{6}", answer: "4", difficulty: 5, hint: "opposite $=\\text{hyp}\\times\\sin(\\pi/6)$.", explanation: "opp $=8\\sin(\\pi/6)=8\\times\\frac12=4$." },
        { id: "y11adv-ev-p25", prompt: "A student writes $\\sin(\\frac{\\pi}{3})=\\frac12$. Identify the error.", latex: "\\sin\\left(\\frac{\\pi}{3}\\right)", answer: "B", difficulty: 4, choices: [{ label: "A", text: "They used the wrong triangle" }, { label: "B", text: "They swapped $\\sin(\\frac{\\pi}{3})$ and $\\sin(\\frac{\\pi}{6})$" }, { label: "C", text: "They forgot to rationalise" }, { label: "D", text: "The hypotenuse should be $\\sqrt3$" }], hint: "$\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$.", explanation: "$\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$; the value $\\frac12$ belongs to $\\sin(\\pi/6)$." },
        { id: "y11adv-ev-p26", prompt: "Which value is correct?", latex: "\\tan\\left(\\frac{\\pi}{6}\\right)", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\sqrt3$" }, { label: "B", text: "$\\frac{\\sqrt3}{3}$" }, { label: "C", text: "$1$" }, { label: "D", text: "$\\frac12$" }], hint: "Rationalise $\\frac{1}{\\sqrt3}$.", explanation: "$\\tan(\\pi/6)=\\frac{1}{\\sqrt3}=\\frac{\\sqrt3}{3}$." },
        { id: "y11adv-ev-p27", prompt: "Evaluate without a calculator.", latex: "\\cos^2\\!\\left(\\frac{\\pi}{4}\\right)", answer: "1/2", difficulty: 3, acceptedAnswers: ["0.5"], hint: "$\\cos(\\pi/4)=\\frac{\\sqrt2}{2}$.", explanation: "$\\left(\\frac{\\sqrt2}{2}\\right)^2=\\frac{2}{4}=\\frac12$." },
        { id: "y11adv-ev-p28", prompt: "Evaluate without a calculator.", latex: "\\sin\\!\\left(\\frac{\\pi}{6}\\right)+\\sin\\!\\left(\\frac{\\pi}{3}\\right)", answer: "(1+sqrt(3))/2", difficulty: 4, acceptedAnswers: ["1/2+sqrt(3)/2", "(1+\\sqrt3)/2"], hint: "$\\frac12+\\frac{\\sqrt3}{2}$.", explanation: "$\\frac12+\\frac{\\sqrt3}{2}=\\frac{1+\\sqrt3}{2}$." },
        { id: "y11adv-ev-p29", prompt: "Which value is correct?", latex: "\\sin\\left(\\frac{\\pi}{4}\\right)", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac12$" }, { label: "B", text: "$\\frac{\\sqrt3}{2}$" }, { label: "C", text: "$\\frac{\\sqrt2}{2}$" }, { label: "D", text: "$1$" }], hint: "45-45-90 triangle.", explanation: "$\\sin(\\pi/4)=\\frac{\\sqrt2}{2}$." },
        { id: "y11adv-ev-p30", prompt: "A right triangle has the 60° angle with adjacent side 5. Find the opposite side.", latex: "\\text{adj}=5,\\quad \\theta=\\frac{\\pi}{3}", answer: "5sqrt(3)", difficulty: 5, acceptedAnswers: ["5\\sqrt{3}", "5√3"], hint: "opposite $=\\text{adj}\\times\\tan(\\pi/3)$.", explanation: "opp $=5\\tan(\\pi/3)=5\\sqrt3$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-ev-mp1",
          prompt: "A right-angled triangle has a 30° angle and hypotenuse 12 cm.",
          latex: "\\theta=\\frac{\\pi}{6},\\quad \\text{hyp}=12",
          answer: "6",
          hint: "(a) opposite $=12\\sin(\\pi/6)$. (b) adjacent $=12\\cos(\\pi/6)$. (c) $\\tan$ of the 30° angle is opposite over adjacent.",
          explanation: "(a) opp $=12\\times\\frac12=6$. (b) adj $=12\\times\\frac{\\sqrt3}{2}=6\\sqrt3$. (c) $\\tan(\\pi/6)=\\frac{\\sqrt3}{3}$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the side opposite the 30° angle.", latex: "\\text{opp}=\\text{hyp}\\sin\\theta", marks: 1, answer: "6", hint: "$\\sin(\\pi/6)=\\frac12$.", explanation: "opp $=12\\times\\frac12=6$ cm." },
            { key: "b", label: "(b)", prompt: "Find the side adjacent to the 30° angle.", latex: "\\text{adj}=\\text{hyp}\\cos\\theta", marks: 2, answer: "6sqrt(3)", acceptedAnswers: ["6\\sqrt{3}", "6√3", "10.39", "10.4"], hint: "$\\cos(\\pi/6)=\\frac{\\sqrt3}{2}$.", explanation: "adj $=12\\times\\frac{\\sqrt3}{2}=6\\sqrt3\\approx10.39$ cm." },
            { key: "c", label: "(c)", prompt: "Find $\\tan\\left(\\frac{\\pi}{6}\\right)$ in rationalised form.", latex: "\\tan\\left(\\frac{\\pi}{6}\\right)", marks: 1, answer: "sqrt(3)/3", acceptedAnswers: ["\\sqrt{3}/3", "1/sqrt(3)", "√3/3"], hint: "opposite over adjacent, then rationalise.", explanation: "$\\tan(\\pi/6)=\\frac{6}{6\\sqrt3}=\\frac{1}{\\sqrt3}=\\frac{\\sqrt3}{3}$." },
          ],
        },
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
          ...formulaAnswer("y11adv-graph-i3", "State the period of the graph.", "y=\\tan x", "pi", ["\\pi", "π"]),
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
        {
          ...formulaAnswer("y11adv-graph-m1", "State the period of the graph.", "y=\\sin x", "2pi", ["2\\pi", "2π"]),
          hint: "One full wave of y = sin x spans from 0 to 2π.",
        },
        {
          ...formulaAnswer("y11adv-graph-m2", "State the period of the graph.", "y=\\tan x", "pi", ["\\pi", "π"]),
          hint: "Tangent repeats every π radians.",
        },
        practicalChoice(
          "y11adv-graph-m3",
          "Which graph has a y-intercept of 1?",
          "B",
          ["$y=\\sin x$", "$y=\\cos x$", "$y=\\tan x$", "$y=-\\sin x$"],
          "cos(0) = 1. Cosine starts at its maximum.",
          "x=0"
        ),
        {
          ...formulaAnswer("y11adv-graph-m4", "State the maximum value of the graph.", "y=\\sin x", "1", []),
          hint: "Sine reaches its highest point at the top of the unit circle.",
        },
        {
          ...formulaAnswer("y11adv-graph-m5", "Evaluate.", "\\cos\\pi", "-1", []),
          hint: "At x = π the cosine curve is at its minimum.",
        },
        {
          ...formulaAnswer("y11adv-graph-m6", "Evaluate.", "\\sin\\frac{3\\pi}{2}", "-1", []),
          hint: "At x = 3π/2 the sine curve is at its minimum.",
        },
        practicalChoice(
          "y11adv-graph-m7",
          "A student states that $y=\\tan x$ has range $[-1,1]$. Identify the error.",
          "C",
          ["Tangent is never negative", "Tangent has no period", "Tangent has range all real numbers, not $[-1,1]$", "Tangent equals sine divided by sine"],
          "Tangent = sin/cos and is unbounded. Its range is all real numbers.",
          "y=\\tan x"
        ),
        practicalChoice(
          "y11adv-graph-m8",
          "A student states that $y=\\tan x$ has period $2\\pi$. Identify the error.",
          "A",
          ["Tangent has period $\\pi$, not $2\\pi$", "Tangent has no period", "Period $2\\pi$ is correct for tangent", "Tangent has period $\\pi/2$"],
          "Tangent completes one cycle every π radians.",
          "y=\\tan x"
        ),
        {
          ...formulaAnswer("y11adv-graph-m9", "State the first positive vertical asymptote.", "y=\\tan x", "pi/2", ["\\pi/2", "π/2"]),
          hint: "Tangent is undefined where cos x = 0. The first positive angle where cos x = 0 is π/2.",
        },
        practicalChoice(
          "y11adv-graph-m10",
          "Which set gives all zeros of $y=\\sin x$ on $[0,2\\pi]$?",
          "D",
          ["$\\left\\{\\frac{\\pi}{2},\\,\\frac{3\\pi}{2}\\right\\}$", "$\\{0,\\,\\pi\\}$", "$\\left\\{\\frac{\\pi}{2},\\,\\pi,\\,\\frac{3\\pi}{2}\\right\\}$", "$\\{0,\\,\\pi,\\,2\\pi\\}$"],
          "sin x = 0 at x = 0, π, and 2π on [0, 2π].",
          "y=\\sin x,\\quad x\\in[0,2\\pi]"
        ),
      ],
      masteryQuizPool: [
        { id: "y11adv-graph-p1", prompt: "State the period of the graph.", latex: "y=\\sin x", answer: "2pi", difficulty: 1, acceptedAnswers: ["2\\pi", "2π"], hint: "One full wave from 0 to $2\\pi$.", explanation: "Period of $y=\\sin x$ is $2\\pi$." },
        { id: "y11adv-graph-p2", prompt: "State the period of the graph.", latex: "y=\\cos x", answer: "2pi", difficulty: 1, acceptedAnswers: ["2\\pi", "2π"], hint: "Cosine repeats every full turn.", explanation: "Period of $y=\\cos x$ is $2\\pi$." },
        { id: "y11adv-graph-p3", prompt: "State the period of the graph.", latex: "y=\\tan x", answer: "pi", difficulty: 1, acceptedAnswers: ["\\pi", "π"], hint: "Tangent repeats every $\\pi$.", explanation: "Period of $y=\\tan x$ is $\\pi$." },
        { id: "y11adv-graph-p4", prompt: "State the maximum value of the graph.", latex: "y=\\sin x", answer: "1", difficulty: 1, hint: "Top of the unit circle.", explanation: "Maximum of $y=\\sin x$ is 1." },
        { id: "y11adv-graph-p5", prompt: "Which graph has a y-intercept of 1?", latex: "x=0", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$y=\\sin x$" }, { label: "B", text: "$y=\\cos x$" }, { label: "C", text: "$y=\\tan x$" }, { label: "D", text: "$y=-\\sin x$" }], hint: "$\\cos 0=1$.", explanation: "Cosine starts at its maximum, so its y-intercept is 1." },
        { id: "y11adv-graph-p6", prompt: "Evaluate.", latex: "\\cos\\pi", answer: "-1", difficulty: 2, acceptedAnswers: ["−1"], hint: "At $x=\\pi$ cosine is at its minimum.", explanation: "$\\cos\\pi=-1$." },
        { id: "y11adv-graph-p7", prompt: "Evaluate.", latex: "\\sin\\frac{3\\pi}{2}", answer: "-1", difficulty: 2, acceptedAnswers: ["−1"], hint: "Bottom of the unit circle.", explanation: "$\\sin\\frac{3\\pi}{2}=-1$." },
        { id: "y11adv-graph-p8", prompt: "State the minimum value of the graph.", latex: "y=\\cos x", answer: "-1", difficulty: 2, acceptedAnswers: ["−1"], hint: "Cosine reaches $-1$ at $x=\\pi$.", explanation: "Minimum of $y=\\cos x$ is $-1$." },
        { id: "y11adv-graph-p9", prompt: "State the first positive vertical asymptote.", latex: "y=\\tan x", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Where $\\cos x=0$ first.", explanation: "First positive asymptote is $x=\\frac{\\pi}{2}$." },
        { id: "y11adv-graph-p10", prompt: "Evaluate.", latex: "\\cos\\frac{3\\pi}{2}", answer: "0", difficulty: 3, hint: "Bottom of the unit circle has x-coordinate 0.", explanation: "$\\cos\\frac{3\\pi}{2}=0$." },
        { id: "y11adv-graph-p11", prompt: "The first positive maximum of $y=\\sin x$ occurs at which x-value?", latex: "y=\\sin x", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Sine peaks a quarter turn in.", explanation: "$y=\\sin x$ has its first maximum at $x=\\frac{\\pi}{2}$." },
        { id: "y11adv-graph-p12", prompt: "Which set gives all zeros of $y=\\sin x$ on $[0,2\\pi]$?", latex: "y=\\sin x,\\quad x\\in[0,2\\pi]", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\left\\{\\frac{\\pi}{2},\\frac{3\\pi}{2}\\right\\}$" }, { label: "B", text: "$\\{0,\\pi\\}$" }, { label: "C", text: "$\\left\\{\\frac{\\pi}{2},\\pi,\\frac{3\\pi}{2}\\right\\}$" }, { label: "D", text: "$\\{0,\\pi,2\\pi\\}$" }], hint: "Sine is zero at multiples of $\\pi$.", explanation: "$\\sin x=0$ at $x=0,\\pi,2\\pi$." },
        { id: "y11adv-graph-p13", prompt: "A student states $y=\\tan x$ has range $[-1,1]$. Identify the error.", latex: "y=\\tan x", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Tangent is never negative" }, { label: "B", text: "Tangent has no period" }, { label: "C", text: "Tangent has range all real numbers" }, { label: "D", text: "Tangent equals sine over sine" }], hint: "Tangent is unbounded.", explanation: "$y=\\tan x$ has range all real numbers." },
        { id: "y11adv-graph-p14", prompt: "A student states $y=\\tan x$ has period $2\\pi$. Identify the error.", latex: "y=\\tan x", answer: "A", difficulty: 4, choices: [{ label: "A", text: "Tangent has period $\\pi$, not $2\\pi$" }, { label: "B", text: "Tangent has no period" }, { label: "C", text: "Period $2\\pi$ is correct" }, { label: "D", text: "Tangent has period $\\frac{\\pi}{2}$" }], hint: "Tangent repeats every half turn.", explanation: "$y=\\tan x$ has period $\\pi$." },
        { id: "y11adv-graph-p15", prompt: "Which graph reaches its minimum at $x=\\pi$?", latex: "x=\\pi", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$y=\\sin x$" }, { label: "B", text: "$y=\\cos x$" }, { label: "C", text: "$y=\\tan x$" }, { label: "D", text: "$y=-\\cos x$" }], hint: "$\\cos\\pi=-1$.", explanation: "$y=\\cos x$ reaches its minimum $-1$ at $x=\\pi$." },
        { id: "y11adv-graph-p16", prompt: "Where does $y=\\cos x$ first reach zero for $x>0$?", latex: "y=\\cos x", answer: "pi/2", difficulty: 4, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Cosine is zero a quarter turn in.", explanation: "$\\cos x=0$ first at $x=\\frac{\\pi}{2}$." },
        { id: "y11adv-graph-p17", prompt: "Which describes the basic sine graph?", latex: "y=\\sin x", answer: "D", difficulty: 4, choices: [{ label: "A", text: "Period $\\pi$, range all reals" }, { label: "B", text: "Period $\\pi$, range $[-1,1]$" }, { label: "C", text: "Period $2\\pi$, range all reals" }, { label: "D", text: "Period $2\\pi$, range $[-1,1]$" }], hint: "Sine waves between $-1$ and 1.", explanation: "$y=\\sin x$ has period $2\\pi$ and range $[-1,1]$." },
        { id: "y11adv-graph-p18", prompt: "How many vertical asymptotes does $y=\\tan x$ have on $[0,2\\pi]$?", latex: "y=\\tan x,\\quad x\\in[0,2\\pi]", answer: "2", difficulty: 5, hint: "Asymptotes where $\\cos x=0$.", explanation: "On $[0,2\\pi]$, $\\cos x=0$ at $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$ — two asymptotes." },
        { id: "y11adv-graph-p19", prompt: "On $[0,2\\pi]$, give the larger x-value where $y=\\cos x$ equals zero.", latex: "\\cos x=0,\\quad x\\in[0,2\\pi]", answer: "3pi/2", difficulty: 5, acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "Cosine is zero at $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$.", explanation: "The larger zero is $x=\\frac{3\\pi}{2}$." },
        { id: "y11adv-graph-p20", prompt: "How many solutions does $\\cos x=1$ have on $[0,2\\pi]$?", latex: "\\cos x=1,\\quad x\\in[0,2\\pi]", answer: "2", difficulty: 5, hint: "Cosine equals 1 at the start and after one full turn.", explanation: "$\\cos x=1$ at $x=0$ and $x=2\\pi$ — two solutions." },
        { id: "y11adv-graph-p21", prompt: "The graph $y=\\sin x$ is reflected to give $y=-\\sin x$. What is its value at $x=\\frac{\\pi}{2}$?", latex: "y=-\\sin x,\\quad x=\\frac{\\pi}{2}", answer: "-1", difficulty: 5, acceptedAnswers: ["−1"], hint: "$-\\sin(\\pi/2)=-1$.", explanation: "$-\\sin(\\pi/2)=-1$." },
        { id: "y11adv-graph-p22", prompt: "On $[0,2\\pi]$, how many times does $y=\\sin x$ equal $y=\\cos x$? (They are equal where $\\tan x=1$.)", latex: "\\sin x=\\cos x,\\quad x\\in[0,2\\pi]", answer: "2", difficulty: 5, hint: "$\\tan x=1$ at $\\frac{\\pi}{4}$ and $\\frac{5\\pi}{4}$.", explanation: "$\\sin x=\\cos x$ where $\\tan x=1$: at $\\frac{\\pi}{4}$ and $\\frac{5\\pi}{4}$ — two points." },
        { id: "y11adv-graph-p23", prompt: "Evaluate.", latex: "\\sin\\pi", answer: "0", difficulty: 2, hint: "Half turn, y-coordinate.", explanation: "$\\sin\\pi=0$." },
        { id: "y11adv-graph-p24", prompt: "State the maximum value.", latex: "y=\\cos x", answer: "1", difficulty: 1, hint: "Cosine peaks at $x=0$.", explanation: "Maximum of $y=\\cos x$ is 1." },
        { id: "y11adv-graph-p25", prompt: "Evaluate.", latex: "\\cos 0", answer: "1", difficulty: 1, hint: "Starting point of the unit circle.", explanation: "$\\cos 0=1$." },
        { id: "y11adv-graph-p26", prompt: "Which graph has range all real numbers?", latex: "\\text{range all reals}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$y=\\sin x$" }, { label: "B", text: "$y=\\cos x$" }, { label: "C", text: "$y=\\tan x$" }, { label: "D", text: "$y=2\\sin x$" }], hint: "Tangent is unbounded.", explanation: "Only $y=\\tan x$ has range all real numbers." },
        { id: "y11adv-graph-p27", prompt: "State the minimum value of the graph.", latex: "y=\\sin x", answer: "-1", difficulty: 1, acceptedAnswers: ["−1"], hint: "Sine bottoms out at $-1$.", explanation: "Minimum of $y=\\sin x$ is $-1$." },
        { id: "y11adv-graph-p28", prompt: "At which x-value does $y=\\sin x$ first reach its minimum on $[0,2\\pi]$?", latex: "y=\\sin x", answer: "3pi/2", difficulty: 3, acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "Bottom of the unit circle.", explanation: "$y=\\sin x$ reaches $-1$ at $x=\\frac{3\\pi}{2}$." },
        { id: "y11adv-graph-p29", prompt: "How many zeros does $y=\\tan x$ have on $[0,2\\pi]$?", latex: "y=\\tan x,\\quad x\\in[0,2\\pi]", answer: "3", difficulty: 5, hint: "Tangent is zero where $\\sin x=0$.", explanation: "$\\tan x=0$ where $\\sin x=0$: at $0,\\pi,2\\pi$ — three zeros." },
        { id: "y11adv-graph-p30", prompt: "Which graph passes through the origin and has period $2\\pi$?", latex: "\\text{origin, period }2\\pi", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$y=\\sin x$" }, { label: "B", text: "$y=\\cos x$" }, { label: "C", text: "$y=\\tan x$" }, { label: "D", text: "$y=\\cos x+1$" }], hint: "Sine starts at 0 with period $2\\pi$.", explanation: "$y=\\sin x$ passes through the origin and has period $2\\pi$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-graph-mp1",
          prompt: "Consider the basic graph $y=\\cos x$ on the interval $[0,2\\pi]$.",
          latex: "y=\\cos x,\\quad x\\in[0,2\\pi]",
          answer: "2pi",
          hint: "(a) State the period. (b) Evaluate at the half turn. (c) Count the zeros on the interval.",
          explanation: "(a) period $=2\\pi$. (b) $\\cos\\pi=-1$. (c) zeros at $\\frac{\\pi}{2},\\frac{3\\pi}{2}$ — two zeros.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the period.", latex: "y=\\cos x", marks: 1, answer: "2pi", acceptedAnswers: ["2\\pi", "2π"], hint: "Cosine repeats every full turn.", explanation: "Period $=2\\pi$." },
            { key: "b", label: "(b)", prompt: "Find the value of $y$ at $x=\\pi$.", latex: "\\cos\\pi", marks: 1, answer: "-1", acceptedAnswers: ["−1"], hint: "At $x=\\pi$ cosine is at its minimum.", explanation: "$\\cos\\pi=-1$." },
            { key: "c", label: "(c)", prompt: "How many times does the graph cross the x-axis on $[0,2\\pi]$?", latex: "\\cos x=0", marks: 2, answer: "2", hint: "Cosine is zero where $\\cos x=0$ on the interval.", explanation: "$\\cos x=0$ at $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$ — two crossings." },
          ],
        },
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
        practicalChoice("y11adv-rcon-i4", "How many radians are in a half turn?", "A", ["$\\pi$", "$2\\pi$", "$\\frac{\\pi}{2}$", "$\\frac{3\\pi}{2}$"], "A half turn is 180°. Use 180° = π.", "\\text{half turn}"),
        practicalChoice("y11adv-rcon-i5", "Which quadrant contains the angle?", "D", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between three quarter turns and a full turn.", "\\frac{5\\pi}{3}"),
      ],
      commonMistakes: [
        { mistake: "Saying 360° = π instead of 2π.", fix: "A full turn equals 2π radians; a half turn equals π." },
        { mistake: "Confusing quadrant boundaries — placing 2π/3 in Q1.", fix: "Check: 2π/3 ≈ 2.09 > π/2 ≈ 1.57, so it is in Q2." },
        { mistake: "Treating radian values like degree values without conversion.", fix: "Use the benchmark table to cross-check before computing." },
        { mistake: "Forgetting that π/6 = 30°, not 60°.", fix: "π/6 is the smallest common benchmark; π/3 = 60° is twice as large." },
      ],
      masteryQuiz: [
        formulaAnswer("y11adv-rcon-m1", "State the radian measure of one full turn.", "360^\\circ", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-rcon-m2", "State the radian measure of a right angle.", "90^\\circ", "pi/2", ["\\pi/2", "π/2"]),
        formulaAnswer("y11adv-rcon-m3", "State the radian measure of a half turn.", "180^\\circ", "pi", ["\\pi", "π"]),
        formulaAnswer("y11adv-rcon-m4", "State the radian measure of three quarter turns.", "270^\\circ", "3pi/2", ["3\\pi/2", "3π/2"]),
        practicalChoice("y11adv-rcon-m5", "Which quadrant contains the angle?", "B", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a right angle and a half turn.", "\\frac{5\\pi}{6}"),
        practicalChoice("y11adv-rcon-m6", "Which quadrant contains the angle?", "C", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between a half turn and three quarter turns.", "\\frac{4\\pi}{3}"),
        practicalChoice("y11adv-rcon-m7", "Which quadrant contains the angle?", "D", ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], "The angle is between three quarter turns and a full turn.", "\\frac{5\\pi}{3}"),
        practicalChoice("y11adv-rcon-m8", "Which angle marks the boundary between Q3 and Q4?", "C", ["$\\pi$", "$2\\pi$", "$\\frac{3\\pi}{2}$", "$\\frac{\\pi}{2}$"], "The Q3-Q4 boundary is three quarter turns.", "\\text{quadrant boundaries}"),
        practicalChoice("y11adv-rcon-m9", "Which statement about radians is correct?", "D", ["A full turn equals $\\pi$ radians", "A right angle equals $\\pi$ radians", "A half turn equals $2\\pi$ radians", "A full turn equals $2\\pi$ radians"], "Use 360° = 2π as the anchor fact.", "\\text{radian facts}"),
        practicalChoice("y11adv-rcon-m10", "A wheel rotates $3\\pi$ radians. How many complete turns does it make?", "B", ["$2$", "$1$", "$3$", "$\\frac{3}{2}$"], "One full turn is 2π. Divide: 3π ÷ 2π = 1.5, so 1 complete turn.", "3\\pi\\text{ radians}"),
      ],
      masteryQuizPool: [
        { id: "y11adv-rcon-p1", prompt: "State the radian measure of one full turn.", latex: "360^\\circ", answer: "2pi", difficulty: 1, acceptedAnswers: ["2\\pi", "2π"], hint: "Full turn benchmark.", explanation: "$360^\\circ=2\\pi$." },
        { id: "y11adv-rcon-p2", prompt: "State the radian measure of a right angle.", latex: "90^\\circ", answer: "pi/2", difficulty: 1, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Quarter turn.", explanation: "$90^\\circ=\\frac{\\pi}{2}$." },
        { id: "y11adv-rcon-p3", prompt: "State the radian measure of a half turn.", latex: "180^\\circ", answer: "pi", difficulty: 1, acceptedAnswers: ["\\pi", "π"], hint: "Half turn.", explanation: "$180^\\circ=\\pi$." },
        { id: "y11adv-rcon-p4", prompt: "State the degree equivalent of the angle.", latex: "\\frac{\\pi}{6}", answer: "30", difficulty: 1, acceptedAnswers: ["30 degrees", "30°"], hint: "Smallest common benchmark.", explanation: "$\\frac{\\pi}{6}=30^\\circ$." },
        { id: "y11adv-rcon-p5", prompt: "State the radian measure of three quarter turns.", latex: "270^\\circ", answer: "3pi/2", difficulty: 2, acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "Three quarters of $2\\pi$.", explanation: "$270^\\circ=\\frac{3\\pi}{2}$." },
        { id: "y11adv-rcon-p6", prompt: "State the degree equivalent of the angle.", latex: "\\frac{3\\pi}{2}", answer: "270", difficulty: 2, acceptedAnswers: ["270 degrees", "270°"], hint: "Three quarter turns.", explanation: "$\\frac{3\\pi}{2}=270^\\circ$." },
        { id: "y11adv-rcon-p7", prompt: "Which quadrant contains the angle?", latex: "\\frac{\\pi}{3}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between 0 and a right angle.", explanation: "$0<\\frac{\\pi}{3}<\\frac{\\pi}{2}$, so Q1." },
        { id: "y11adv-rcon-p8", prompt: "Which quadrant contains the angle?", latex: "\\frac{2\\pi}{3}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between a right angle and a half turn.", explanation: "$\\frac{\\pi}{2}<\\frac{2\\pi}{3}<\\pi$, so Q2." },
        { id: "y11adv-rcon-p9", prompt: "Which quadrant contains the angle?", latex: "\\frac{5\\pi}{4}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between a half turn and three quarter turns.", explanation: "$\\pi<\\frac{5\\pi}{4}<\\frac{3\\pi}{2}$, so Q3." },
        { id: "y11adv-rcon-p10", prompt: "Which quadrant contains the angle?", latex: "\\frac{5\\pi}{3}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between three quarter turns and a full turn.", explanation: "$\\frac{3\\pi}{2}<\\frac{5\\pi}{3}<2\\pi$, so Q4." },
        { id: "y11adv-rcon-p11", prompt: "How many radians are in a half turn?", latex: "\\text{half turn}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$\\frac{3\\pi}{2}$" }], hint: "$180^\\circ=\\pi$.", explanation: "A half turn is $\\pi$ radians." },
        { id: "y11adv-rcon-p12", prompt: "Which angle marks the boundary between Q3 and Q4?", latex: "\\text{quadrant boundaries}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$2\\pi$" }, { label: "C", text: "$\\frac{3\\pi}{2}$" }, { label: "D", text: "$\\frac{\\pi}{2}$" }], hint: "Three quarter turns.", explanation: "The Q3-Q4 boundary is $\\frac{3\\pi}{2}$." },
        { id: "y11adv-rcon-p13", prompt: "Which statement about radians is correct?", latex: "\\text{radian facts}", answer: "D", difficulty: 4, choices: [{ label: "A", text: "A full turn equals $\\pi$ radians" }, { label: "B", text: "A right angle equals $\\pi$ radians" }, { label: "C", text: "A half turn equals $2\\pi$ radians" }, { label: "D", text: "A full turn equals $2\\pi$ radians" }], hint: "Use $360^\\circ=2\\pi$.", explanation: "A full turn equals $2\\pi$ radians." },
        { id: "y11adv-rcon-p14", prompt: "A student says $\\frac{2\\pi}{3}$ is in Q1. Identify the error.", latex: "\\frac{2\\pi}{3}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$\\frac{2\\pi}{3}$ is in Q4" }, { label: "B", text: "$\\frac{2\\pi}{3}\\approx2.09>\\frac{\\pi}{2}$, so it is in Q2" }, { label: "C", text: "$\\frac{2\\pi}{3}$ is in Q3" }, { label: "D", text: "The student is correct" }], hint: "Compare with $\\frac{\\pi}{2}\\approx1.57$.", explanation: "$\\frac{2\\pi}{3}\\approx2.09$, which exceeds $\\frac{\\pi}{2}$ but is less than $\\pi$, so Q2." },
        { id: "y11adv-rcon-p15", prompt: "A wheel rotates $3\\pi$ radians. How many complete turns does it make?", latex: "3\\pi\\text{ radians}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$2$" }, { label: "B", text: "$1$" }, { label: "C", text: "$3$" }, { label: "D", text: "$\\frac32$" }], hint: "One full turn is $2\\pi$.", explanation: "$3\\pi\\div2\\pi=1.5$, so 1 complete turn." },
        { id: "y11adv-rcon-p16", prompt: "A wheel rotates $5\\pi$ radians. How many complete turns does it make?", latex: "5\\pi\\text{ radians}", answer: "2, with 1pi remaining", difficulty: 5, acceptedAnswers: ["2"], hint: "Divide by $2\\pi$: $5\\pi\\div2\\pi=2.5$.", explanation: "$5\\pi\\div2\\pi=2.5$, so 2 complete turns (and a half turn extra)." },
        { id: "y11adv-rcon-p17", prompt: "An angle of $\\frac{7\\pi}{6}$ is increased by $\\frac{\\pi}{3}$. Which quadrant is the new angle in?", latex: "\\frac{7\\pi}{6}+\\frac{\\pi}{3}", answer: "C", difficulty: 5, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "$\\frac{7\\pi}{6}+\\frac{2\\pi}{6}=\\frac{9\\pi}{6}=\\frac{3\\pi}{2}$ then check.", explanation: "$\\frac{7\\pi}{6}+\\frac{\\pi}{3}=\\frac{7\\pi}{6}+\\frac{2\\pi}{6}=\\frac{9\\pi}{6}=\\frac{3\\pi}{2}$, the Q3-Q4 boundary; the original is in Q3 and the result sits on the boundary, conventionally taken as the end of Q3." },
        { id: "y11adv-rcon-p18", prompt: "Express $\\frac{5\\pi}{2}$ as a coterminal angle in $[0,2\\pi)$.", latex: "\\frac{5\\pi}{2}", answer: "pi/2", difficulty: 5, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Subtract $2\\pi$.", explanation: "$\\frac{5\\pi}{2}-2\\pi=\\frac{5\\pi}{2}-\\frac{4\\pi}{2}=\\frac{\\pi}{2}$." },
        { id: "y11adv-rcon-p19", prompt: "A point moves $\\frac{11\\pi}{6}$ around a circle. Find the coterminal angle in $[0,2\\pi)$ after going a further $\\frac{\\pi}{2}$.", latex: "\\frac{11\\pi}{6}+\\frac{\\pi}{2}", answer: "pi/3", difficulty: 5, acceptedAnswers: ["\\pi/3", "π/3"], hint: "Add then subtract $2\\pi$ if needed.", explanation: "$\\frac{11\\pi}{6}+\\frac{3\\pi}{6}=\\frac{14\\pi}{6}=\\frac{7\\pi}{3}$; subtract $2\\pi=\\frac{6\\pi}{3}$ to get $\\frac{\\pi}{3}$." },
        { id: "y11adv-rcon-p20", prompt: "How many radians does a clock's minute hand turn through in 15 minutes?", latex: "\\text{15 minutes}", answer: "pi/2", difficulty: 5, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Full turn ($2\\pi$) is 60 minutes.", explanation: "$\\frac{15}{60}\\times2\\pi=\\frac{\\pi}{2}$." },
        { id: "y11adv-rcon-p21", prompt: "State the degree equivalent of the angle.", latex: "\\frac{\\pi}{4}", answer: "45", difficulty: 1, acceptedAnswers: ["45 degrees", "45°"], hint: "Benchmark.", explanation: "$\\frac{\\pi}{4}=45^\\circ$." },
        { id: "y11adv-rcon-p22", prompt: "State the degree equivalent of the angle.", latex: "2\\pi", answer: "360", difficulty: 1, acceptedAnswers: ["360 degrees", "360°"], hint: "Full turn.", explanation: "$2\\pi=360^\\circ$." },
        { id: "y11adv-rcon-p23", prompt: "Which quadrant contains the angle?", latex: "\\frac{5\\pi}{6}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between a right angle and a half turn.", explanation: "$\\frac{\\pi}{2}<\\frac{5\\pi}{6}<\\pi$, so Q2." },
        { id: "y11adv-rcon-p24", prompt: "Which quadrant contains the angle?", latex: "\\frac{4\\pi}{3}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "Between a half turn and three quarter turns.", explanation: "$\\pi<\\frac{4\\pi}{3}<\\frac{3\\pi}{2}$, so Q3." },
        { id: "y11adv-rcon-p25", prompt: "Which angle marks the boundary between Q1 and Q2?", latex: "\\text{quadrant boundaries}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$\\frac{\\pi}{2}$" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "$\\frac{3\\pi}{2}$" }, { label: "D", text: "$2\\pi$" }], hint: "A right angle.", explanation: "The Q1-Q2 boundary is $\\frac{\\pi}{2}$." },
        { id: "y11adv-rcon-p26", prompt: "A student says $360^\\circ=\\pi$. Identify the error.", latex: "360^\\circ", answer: "A", difficulty: 3, choices: [{ label: "A", text: "A full turn is $2\\pi$, not $\\pi$" }, { label: "B", text: "A full turn is $\\frac{\\pi}{2}$" }, { label: "C", text: "$360^\\circ=\\pi$ is correct" }, { label: "D", text: "$360^\\circ=\\frac{3\\pi}{2}$" }], hint: "$\\pi$ is a half turn.", explanation: "A full turn is $2\\pi$; $\\pi$ is a half turn." },
        { id: "y11adv-rcon-p27", prompt: "How many radians does a clock's minute hand turn through in 30 minutes?", latex: "\\text{30 minutes}", answer: "pi", difficulty: 4, acceptedAnswers: ["\\pi", "π"], hint: "Half of a full turn.", explanation: "$\\frac{30}{60}\\times2\\pi=\\pi$." },
        { id: "y11adv-rcon-p28", prompt: "Express $\\frac{9\\pi}{4}$ as a coterminal angle in $[0,2\\pi)$.", latex: "\\frac{9\\pi}{4}", answer: "pi/4", difficulty: 4, acceptedAnswers: ["\\pi/4", "π/4"], hint: "Subtract $2\\pi=\\frac{8\\pi}{4}$.", explanation: "$\\frac{9\\pi}{4}-\\frac{8\\pi}{4}=\\frac{\\pi}{4}$." },
        { id: "y11adv-rcon-p29", prompt: "Which statement is correct?", latex: "\\text{radian facts}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$\\frac{\\pi}{6}=60^\\circ$" }, { label: "B", text: "$\\frac{\\pi}{3}=30^\\circ$" }, { label: "C", text: "$\\frac{\\pi}{6}=30^\\circ$" }, { label: "D", text: "$\\frac{\\pi}{4}=60^\\circ$" }], hint: "Larger denominator gives the smaller angle.", explanation: "$\\frac{\\pi}{6}=30^\\circ$." },
        { id: "y11adv-rcon-p30", prompt: "A wheel rotates $4\\pi$ radians. How many complete turns does it make?", latex: "4\\pi\\text{ radians}", answer: "2", difficulty: 4, hint: "Divide by $2\\pi$.", explanation: "$4\\pi\\div2\\pi=2$ complete turns." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-rcon-mp1",
          prompt: "A wheel turns through an angle of $\\frac{7\\pi}{2}$ radians.",
          latex: "\\theta=\\frac{7\\pi}{2}",
          answer: "315",
          hint: "(a) Convert to degrees. (b) How many complete turns? (c) Find the coterminal angle in $[0,2\\pi)$.",
          explanation: "(a) $\\frac{7\\pi}{2}=630^\\circ$. (b) $\\frac{7\\pi}{2}\\div2\\pi=1.75$, so 1 complete turn. (c) $\\frac{7\\pi}{2}-2\\pi=\\frac{3\\pi}{2}$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Convert the angle to degrees.", latex: "\\frac{7\\pi}{2}\\times\\frac{180}{\\pi}", marks: 2, answer: "630", acceptedAnswers: ["630 degrees", "630°"], hint: "Multiply by $\\frac{180}{\\pi}$.", explanation: "$\\frac{7\\pi}{2}\\times\\frac{180}{\\pi}=7\\times90=630^\\circ$." },
            { key: "b", label: "(b)", prompt: "How many complete turns does the wheel make?", latex: "\\frac{7\\pi}{2}\\div2\\pi", marks: 1, answer: "1", hint: "Divide by $2\\pi$ and take the whole number.", explanation: "$\\frac{7\\pi}{2}\\div2\\pi=1.75$, so 1 complete turn." },
            { key: "c", label: "(c)", prompt: "Find the coterminal angle in $[0,2\\pi)$ (in radians).", latex: "\\frac{7\\pi}{2}-2\\pi", marks: 1, answer: "3pi/2", acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "Subtract $2\\pi=\\frac{4\\pi}{2}$.", explanation: "$\\frac{7\\pi}{2}-\\frac{4\\pi}{2}=\\frac{3\\pi}{2}$." },
          ],
        },
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
        formulaAnswer("y11adv-d2r-m1", "Convert the angle to radians.", "30^\\circ", "pi/6", ["\\pi/6", "π/6"]),
        formulaAnswer("y11adv-d2r-m2", "Convert the angle to radians.", "135^\\circ", "3pi/4", ["3\\pi/4", "3π/4"]),
        formulaAnswer("y11adv-d2r-m3", "Convert the angle to radians.", "300^\\circ", "5pi/3", ["5\\pi/3", "5π/3"]),
        formulaAnswer("y11adv-d2r-m4", "Convert the angle to radians.", "210^\\circ", "7pi/6", ["7\\pi/6", "7π/6"]),
        formulaAnswer("y11adv-d2r-m5", "Convert the angle to radians.", "360^\\circ", "2pi", ["2\\pi", "2π"]),
        practicalChoice("y11adv-d2r-m6", "A student converts 60° and writes $\\frac{\\pi}{2}$. What is the error?", "D", ["Used the wrong denominator on π", "Forgot to write the π symbol", "The answer should be a decimal", "Divided 180 by 60 instead of 60 by 180"], "60 × π/180 = π/3, not π/2.", "60^\\circ"),
        formulaAnswer("y11adv-d2r-m7", "Convert the angle to radians.", "225^\\circ", "5pi/4", ["5\\pi/4", "5π/4"]),
        formulaAnswer("y11adv-d2r-m8", "Convert the angle to radians.", "120^\\circ", "2pi/3", ["2\\pi/3", "2π/3"]),
        formulaAnswer("y11adv-d2r-m9", "Convert the angle to radians.", "75^\\circ", "5pi/12", ["5\\pi/12", "5π/12"]),
        practicalChoice("y11adv-d2r-m10", "Which is the correct radian equivalent of 270°?", "B", ["$\\pi$", "$\\frac{3\\pi}{2}$", "$\\frac{\\pi}{2}$", "$2\\pi$"], "270 × π/180 = 270π/180. HCF = 90: 3π/2.", "270^\\circ"),
      ],
      masteryQuizPool: [
        { id: "y11adv-d2r-p1", prompt: "Convert the angle to radians.", latex: "30^\\circ", answer: "pi/6", difficulty: 1, acceptedAnswers: ["\\pi/6", "π/6"], hint: "HCF of 30 and 180 is 30.", explanation: "$30\\times\\frac{\\pi}{180}=\\frac{\\pi}{6}$." },
        { id: "y11adv-d2r-p2", prompt: "Convert the angle to radians.", latex: "45^\\circ", answer: "pi/4", difficulty: 1, acceptedAnswers: ["\\pi/4", "π/4"], hint: "HCF 45.", explanation: "$45\\times\\frac{\\pi}{180}=\\frac{\\pi}{4}$." },
        { id: "y11adv-d2r-p3", prompt: "Convert the angle to radians.", latex: "60^\\circ", answer: "pi/3", difficulty: 1, acceptedAnswers: ["\\pi/3", "π/3"], hint: "HCF 60.", explanation: "$60\\times\\frac{\\pi}{180}=\\frac{\\pi}{3}$." },
        { id: "y11adv-d2r-p4", prompt: "Convert the angle to radians.", latex: "90^\\circ", answer: "pi/2", difficulty: 1, acceptedAnswers: ["\\pi/2", "π/2"], hint: "HCF 90.", explanation: "$90\\times\\frac{\\pi}{180}=\\frac{\\pi}{2}$." },
        { id: "y11adv-d2r-p5", prompt: "Convert the angle to radians.", latex: "135^\\circ", answer: "3pi/4", difficulty: 2, acceptedAnswers: ["3\\pi/4", "3π/4"], hint: "HCF 45.", explanation: "$135\\times\\frac{\\pi}{180}=\\frac{3\\pi}{4}$." },
        { id: "y11adv-d2r-p6", prompt: "Convert the angle to radians.", latex: "120^\\circ", answer: "2pi/3", difficulty: 2, acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "HCF 60.", explanation: "$120\\times\\frac{\\pi}{180}=\\frac{2\\pi}{3}$." },
        { id: "y11adv-d2r-p7", prompt: "Convert the angle to radians.", latex: "150^\\circ", answer: "5pi/6", difficulty: 2, acceptedAnswers: ["5\\pi/6", "5π/6"], hint: "HCF 30.", explanation: "$150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}$." },
        { id: "y11adv-d2r-p8", prompt: "Convert the angle to radians.", latex: "180^\\circ", answer: "pi", difficulty: 2, acceptedAnswers: ["\\pi", "π"], hint: "The 180s cancel.", explanation: "$180\\times\\frac{\\pi}{180}=\\pi$." },
        { id: "y11adv-d2r-p9", prompt: "Convert the angle to radians.", latex: "210^\\circ", answer: "7pi/6", difficulty: 3, acceptedAnswers: ["7\\pi/6", "7π/6"], hint: "HCF 30.", explanation: "$210\\times\\frac{\\pi}{180}=\\frac{7\\pi}{6}$." },
        { id: "y11adv-d2r-p10", prompt: "Convert the angle to radians.", latex: "225^\\circ", answer: "5pi/4", difficulty: 3, acceptedAnswers: ["5\\pi/4", "5π/4"], hint: "HCF 45.", explanation: "$225\\times\\frac{\\pi}{180}=\\frac{5\\pi}{4}$." },
        { id: "y11adv-d2r-p11", prompt: "Convert the angle to radians.", latex: "240^\\circ", answer: "4pi/3", difficulty: 3, acceptedAnswers: ["4\\pi/3", "4π/3"], hint: "HCF 60.", explanation: "$240\\times\\frac{\\pi}{180}=\\frac{4\\pi}{3}$." },
        { id: "y11adv-d2r-p12", prompt: "Convert the angle to radians.", latex: "300^\\circ", answer: "5pi/3", difficulty: 3, acceptedAnswers: ["5\\pi/3", "5π/3"], hint: "HCF 60.", explanation: "$300\\times\\frac{\\pi}{180}=\\frac{5\\pi}{3}$." },
        { id: "y11adv-d2r-p13", prompt: "Convert the angle to radians.", latex: "315^\\circ", answer: "7pi/4", difficulty: 3, acceptedAnswers: ["7\\pi/4", "7π/4"], hint: "HCF 45.", explanation: "$315\\times\\frac{\\pi}{180}=\\frac{7\\pi}{4}$." },
        { id: "y11adv-d2r-p14", prompt: "A student converts 60° and writes $\\frac{\\pi}{2}$. Identify the error.", latex: "60^\\circ", answer: "D", difficulty: 4, choices: [{ label: "A", text: "Used the wrong denominator on $\\pi$" }, { label: "B", text: "Forgot the $\\pi$ symbol" }, { label: "C", text: "The answer should be a decimal" }, { label: "D", text: "Divided 180 by 60 instead of 60 by 180" }], hint: "$60\\times\\frac{\\pi}{180}=\\frac{\\pi}{3}$.", explanation: "$60\\times\\frac{\\pi}{180}=\\frac{\\pi}{3}$, not $\\frac{\\pi}{2}$." },
        { id: "y11adv-d2r-p15", prompt: "Convert the angle to radians.", latex: "330^\\circ", answer: "11pi/6", difficulty: 4, acceptedAnswers: ["11\\pi/6", "11π/6"], hint: "HCF 30.", explanation: "$330\\times\\frac{\\pi}{180}=\\frac{11\\pi}{6}$." },
        { id: "y11adv-d2r-p16", prompt: "Convert the angle to radians.", latex: "75^\\circ", answer: "5pi/12", difficulty: 4, acceptedAnswers: ["5\\pi/12", "5π/12"], hint: "HCF 15.", explanation: "$75\\times\\frac{\\pi}{180}=\\frac{5\\pi}{12}$." },
        { id: "y11adv-d2r-p17", prompt: "Convert the angle to radians.", latex: "105^\\circ", answer: "7pi/12", difficulty: 4, acceptedAnswers: ["7\\pi/12", "7π/12"], hint: "HCF 15.", explanation: "$105\\times\\frac{\\pi}{180}=\\frac{7\\pi}{12}$." },
        { id: "y11adv-d2r-p18", prompt: "Convert the angle to radians.", latex: "20^\\circ", answer: "pi/9", difficulty: 4, acceptedAnswers: ["\\pi/9", "π/9"], hint: "HCF 20.", explanation: "$20\\times\\frac{\\pi}{180}=\\frac{\\pi}{9}$." },
        { id: "y11adv-d2r-p19", prompt: "Convert $36^\\circ$ to radians.", latex: "36^\\circ", answer: "pi/5", difficulty: 5, acceptedAnswers: ["\\pi/5", "π/5"], hint: "HCF of 36 and 180 is 36.", explanation: "$36\\times\\frac{\\pi}{180}=\\frac{\\pi}{5}$." },
        { id: "y11adv-d2r-p20", prompt: "The interior angle of a regular pentagon is 108°. Convert it to radians.", latex: "108^\\circ", answer: "3pi/5", difficulty: 5, acceptedAnswers: ["3\\pi/5", "3π/5"], hint: "HCF of 108 and 180 is 36.", explanation: "$108\\times\\frac{\\pi}{180}=\\frac{3\\pi}{5}$." },
        { id: "y11adv-d2r-p21", prompt: "Two angles are 50° and 70°. Convert their sum to radians.", latex: "50^\\circ+70^\\circ", answer: "2pi/3", difficulty: 5, acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "Add first: $120^\\circ$, then convert.", explanation: "$120^\\circ=120\\times\\frac{\\pi}{180}=\\frac{2\\pi}{3}$." },
        { id: "y11adv-d2r-p22", prompt: "The exterior angle of a regular hexagon is 60°. Convert it to radians.", latex: "60^\\circ", answer: "pi/3", difficulty: 5, acceptedAnswers: ["\\pi/3", "π/3"], hint: "Exterior angle $=\\frac{360}{6}$.", explanation: "$\\frac{360}{6}=60^\\circ=\\frac{\\pi}{3}$." },
        { id: "y11adv-d2r-p23", prompt: "Convert $15^\\circ$ to radians.", latex: "15^\\circ", answer: "pi/12", difficulty: 5, acceptedAnswers: ["\\pi/12", "π/12"], hint: "HCF 15.", explanation: "$15\\times\\frac{\\pi}{180}=\\frac{\\pi}{12}$." },
        { id: "y11adv-d2r-p24", prompt: "Convert the angle to radians.", latex: "360^\\circ", answer: "2pi", difficulty: 2, acceptedAnswers: ["2\\pi", "2π"], hint: "Cancel 180.", explanation: "$360\\times\\frac{\\pi}{180}=2\\pi$." },
        { id: "y11adv-d2r-p25", prompt: "Convert the angle to radians.", latex: "270^\\circ", answer: "3pi/2", difficulty: 3, acceptedAnswers: ["3\\pi/2", "3π/2"], hint: "HCF 90.", explanation: "$270\\times\\frac{\\pi}{180}=\\frac{3\\pi}{2}$." },
        { id: "y11adv-d2r-p26", prompt: "Which is the correct radian equivalent of 270°?", latex: "270^\\circ", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\pi$" }, { label: "B", text: "$\\frac{3\\pi}{2}$" }, { label: "C", text: "$\\frac{\\pi}{2}$" }, { label: "D", text: "$2\\pi$" }], hint: "HCF 90.", explanation: "$270\\times\\frac{\\pi}{180}=\\frac{3\\pi}{2}$." },
        { id: "y11adv-d2r-p27", prompt: "A student says $90^\\circ=\\frac{\\pi}{4}$. Identify the error.", latex: "90^\\circ", answer: "A", difficulty: 3, choices: [{ label: "A", text: "$90\\times\\frac{\\pi}{180}=\\frac{\\pi}{2}$, not $\\frac{\\pi}{4}$" }, { label: "B", text: "They forgot the $\\pi$" }, { label: "C", text: "The answer should be $\\frac{\\pi}{3}$" }, { label: "D", text: "The answer is correct" }], hint: "HCF of 90 and 180 is 90.", explanation: "$90\\times\\frac{\\pi}{180}=\\frac{\\pi}{2}$." },
        { id: "y11adv-d2r-p28", prompt: "Which is the correct radian equivalent of 240°?", latex: "240^\\circ", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac{2\\pi}{3}$" }, { label: "B", text: "$\\frac{5\\pi}{3}$" }, { label: "C", text: "$\\frac{4\\pi}{3}$" }, { label: "D", text: "$\\frac{7\\pi}{6}$" }], hint: "HCF 60.", explanation: "$240\\times\\frac{\\pi}{180}=\\frac{4\\pi}{3}$." },
        { id: "y11adv-d2r-p29", prompt: "Convert the angle to radians.", latex: "10^\\circ", answer: "pi/18", difficulty: 4, acceptedAnswers: ["\\pi/18", "π/18"], hint: "HCF 10.", explanation: "$10\\times\\frac{\\pi}{180}=\\frac{\\pi}{18}$." },
        { id: "y11adv-d2r-p30", prompt: "Convert the angle to radians.", latex: "144^\\circ", answer: "4pi/5", difficulty: 5, acceptedAnswers: ["4\\pi/5", "4π/5"], hint: "HCF of 144 and 180 is 36.", explanation: "$144\\times\\frac{\\pi}{180}=\\frac{4\\pi}{5}$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-d2r-mp1",
          prompt: "A regular polygon's angles are described in degrees and must be converted to radians.",
          latex: "\\text{angles in degrees}",
          answer: "pi/6",
          hint: "Convert each angle by multiplying by $\\frac{\\pi}{180}$ and simplifying.",
          explanation: "(a) $30^\\circ=\\frac{\\pi}{6}$. (b) $150^\\circ=\\frac{5\\pi}{6}$. (c) sum $=\\frac{\\pi}{6}+\\frac{5\\pi}{6}=\\pi$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Convert 30° to radians.", latex: "30\\times\\frac{\\pi}{180}", marks: 1, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "HCF 30.", explanation: "$30\\times\\frac{\\pi}{180}=\\frac{\\pi}{6}$." },
            { key: "b", label: "(b)", prompt: "Convert 150° to radians.", latex: "150\\times\\frac{\\pi}{180}", marks: 1, answer: "5pi/6", acceptedAnswers: ["5\\pi/6", "5π/6"], hint: "HCF 30.", explanation: "$150\\times\\frac{\\pi}{180}=\\frac{5\\pi}{6}$." },
            { key: "c", label: "(c)", prompt: "Find the sum of the two radian angles from (a) and (b).", latex: "\\frac{\\pi}{6}+\\frac{5\\pi}{6}", marks: 2, answer: "pi", acceptedAnswers: ["\\pi", "π"], hint: "Add the fractions over the common denominator 6.", explanation: "$\\frac{\\pi}{6}+\\frac{5\\pi}{6}=\\frac{6\\pi}{6}=\\pi$." },
          ],
        },
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
        formulaAnswer("y11adv-r2d-m1", "Convert the angle to degrees.", "\\frac{\\pi}{6}", "30", ["30 degrees", "30°"]),
        formulaAnswer("y11adv-r2d-m2", "Convert the angle to degrees.", "\\frac{2\\pi}{3}", "120", ["120 degrees", "120°"]),
        formulaAnswer("y11adv-r2d-m3", "Convert the angle to degrees.", "\\frac{5\\pi}{4}", "225", ["225 degrees", "225°"]),
        formulaAnswer("y11adv-r2d-m4", "Convert the angle to degrees.", "\\frac{11\\pi}{6}", "330", ["330 degrees", "330°"]),
        formulaAnswer("y11adv-r2d-m5", "Convert the angle to degrees.", "\\frac{3\\pi}{2}", "270", ["270 degrees", "270°"]),
        practicalChoice("y11adv-r2d-m6", "A student says $\\frac{\\pi}{3}=180^\\circ$. Identify the error.", "A", ["They used π = 180 but forgot to divide by 3", "They multiplied by π instead of dividing", "They forgot to cancel the π factors", "The answer should be negative"], "π/3 × 180/π = 180/3 = 60°, not 180°.", "\\frac{\\pi}{3}"),
        formulaAnswer("y11adv-r2d-m7", "Convert the angle to degrees.", "\\pi", "180", ["180 degrees", "180°"]),
        formulaAnswer("y11adv-r2d-m8", "Convert the angle to degrees.", "\\frac{7\\pi}{6}", "210", ["210 degrees", "210°"]),
        formulaAnswer("y11adv-r2d-m9", "Convert the angle to degrees.", "\\frac{5\\pi}{2}", "450", ["450 degrees", "450°"]),
        practicalChoice("y11adv-r2d-m10", "Which conversion gives 315°?", "C", ["$\\frac{5\\pi}{4}$", "$\\frac{11\\pi}{6}$", "$\\frac{7\\pi}{4}$", "$\\frac{4\\pi}{3}$"], "7π/4 × 180/π = 7 × 45 = 315°.", "315^\\circ"),
      ],
      masteryQuizPool: [
        { id: "y11adv-r2d-p1", prompt: "Convert the angle to degrees.", latex: "\\frac{\\pi}{6}", answer: "30", difficulty: 1, acceptedAnswers: ["30 degrees", "30°"], hint: "$180\\div6$.", explanation: "$\\frac{\\pi}{6}\\times\\frac{180}{\\pi}=30^\\circ$." },
        { id: "y11adv-r2d-p2", prompt: "Convert the angle to degrees.", latex: "\\frac{\\pi}{4}", answer: "45", difficulty: 1, acceptedAnswers: ["45 degrees", "45°"], hint: "$180\\div4$.", explanation: "$\\frac{\\pi}{4}\\times\\frac{180}{\\pi}=45^\\circ$." },
        { id: "y11adv-r2d-p3", prompt: "Convert the angle to degrees.", latex: "\\frac{\\pi}{3}", answer: "60", difficulty: 1, acceptedAnswers: ["60 degrees", "60°"], hint: "$180\\div3$.", explanation: "$\\frac{\\pi}{3}\\times\\frac{180}{\\pi}=60^\\circ$." },
        { id: "y11adv-r2d-p4", prompt: "Convert the angle to degrees.", latex: "\\frac{\\pi}{2}", answer: "90", difficulty: 1, acceptedAnswers: ["90 degrees", "90°"], hint: "$180\\div2$.", explanation: "$\\frac{\\pi}{2}\\times\\frac{180}{\\pi}=90^\\circ$." },
        { id: "y11adv-r2d-p5", prompt: "Convert the angle to degrees.", latex: "\\frac{2\\pi}{3}", answer: "120", difficulty: 2, acceptedAnswers: ["120 degrees", "120°"], hint: "$2\\times60$.", explanation: "$\\frac{2\\pi}{3}\\times\\frac{180}{\\pi}=120^\\circ$." },
        { id: "y11adv-r2d-p6", prompt: "Convert the angle to degrees.", latex: "\\frac{3\\pi}{4}", answer: "135", difficulty: 2, acceptedAnswers: ["135 degrees", "135°"], hint: "$3\\times45$.", explanation: "$\\frac{3\\pi}{4}\\times\\frac{180}{\\pi}=135^\\circ$." },
        { id: "y11adv-r2d-p7", prompt: "Convert the angle to degrees.", latex: "\\frac{5\\pi}{6}", answer: "150", difficulty: 2, acceptedAnswers: ["150 degrees", "150°"], hint: "$5\\times30$.", explanation: "$\\frac{5\\pi}{6}\\times\\frac{180}{\\pi}=150^\\circ$." },
        { id: "y11adv-r2d-p8", prompt: "Convert the angle to degrees.", latex: "\\pi", answer: "180", difficulty: 2, acceptedAnswers: ["180 degrees", "180°"], hint: "The $\\pi$ factors cancel.", explanation: "$\\pi\\times\\frac{180}{\\pi}=180^\\circ$." },
        { id: "y11adv-r2d-p9", prompt: "Convert the angle to degrees.", latex: "\\frac{7\\pi}{6}", answer: "210", difficulty: 3, acceptedAnswers: ["210 degrees", "210°"], hint: "$7\\times30$.", explanation: "$\\frac{7\\pi}{6}\\times\\frac{180}{\\pi}=210^\\circ$." },
        { id: "y11adv-r2d-p10", prompt: "Convert the angle to degrees.", latex: "\\frac{5\\pi}{4}", answer: "225", difficulty: 3, acceptedAnswers: ["225 degrees", "225°"], hint: "$5\\times45$.", explanation: "$\\frac{5\\pi}{4}\\times\\frac{180}{\\pi}=225^\\circ$." },
        { id: "y11adv-r2d-p11", prompt: "Convert the angle to degrees.", latex: "\\frac{4\\pi}{3}", answer: "240", difficulty: 3, acceptedAnswers: ["240 degrees", "240°"], hint: "$4\\times60$.", explanation: "$\\frac{4\\pi}{3}\\times\\frac{180}{\\pi}=240^\\circ$." },
        { id: "y11adv-r2d-p12", prompt: "Convert the angle to degrees.", latex: "\\frac{3\\pi}{2}", answer: "270", difficulty: 3, acceptedAnswers: ["270 degrees", "270°"], hint: "$3\\times90$.", explanation: "$\\frac{3\\pi}{2}\\times\\frac{180}{\\pi}=270^\\circ$." },
        { id: "y11adv-r2d-p13", prompt: "Convert the angle to degrees.", latex: "\\frac{5\\pi}{3}", answer: "300", difficulty: 3, acceptedAnswers: ["300 degrees", "300°"], hint: "$5\\times60$.", explanation: "$\\frac{5\\pi}{3}\\times\\frac{180}{\\pi}=300^\\circ$." },
        { id: "y11adv-r2d-p14", prompt: "A student says $\\frac{\\pi}{3}=180^\\circ$. Identify the error.", latex: "\\frac{\\pi}{3}", answer: "A", difficulty: 4, choices: [{ label: "A", text: "They used $\\pi=180$ but forgot to divide by 3" }, { label: "B", text: "They multiplied by $\\pi$ instead of dividing" }, { label: "C", text: "They forgot to cancel $\\pi$" }, { label: "D", text: "The answer should be negative" }], hint: "$\\frac{\\pi}{3}\\times\\frac{180}{\\pi}=60$.", explanation: "$\\frac{\\pi}{3}=\\frac{180}{3}=60^\\circ$, not $180^\\circ$." },
        { id: "y11adv-r2d-p15", prompt: "Convert the angle to degrees.", latex: "\\frac{7\\pi}{4}", answer: "315", difficulty: 4, acceptedAnswers: ["315 degrees", "315°"], hint: "$7\\times45$.", explanation: "$\\frac{7\\pi}{4}\\times\\frac{180}{\\pi}=315^\\circ$." },
        { id: "y11adv-r2d-p16", prompt: "Convert the angle to degrees.", latex: "\\frac{11\\pi}{6}", answer: "330", difficulty: 4, acceptedAnswers: ["330 degrees", "330°"], hint: "$11\\times30$.", explanation: "$\\frac{11\\pi}{6}\\times\\frac{180}{\\pi}=330^\\circ$." },
        { id: "y11adv-r2d-p17", prompt: "Convert the angle to degrees.", latex: "\\frac{5\\pi}{2}", answer: "450", difficulty: 4, acceptedAnswers: ["450 degrees", "450°"], hint: "$5\\times90$.", explanation: "$\\frac{5\\pi}{2}\\times\\frac{180}{\\pi}=450^\\circ$ — more than a full turn." },
        { id: "y11adv-r2d-p18", prompt: "Convert the angle to degrees.", latex: "\\frac{5\\pi}{12}", answer: "75", difficulty: 4, acceptedAnswers: ["75 degrees", "75°"], hint: "$\\frac{5\\times180}{12}$.", explanation: "$\\frac{5\\pi}{12}\\times\\frac{180}{\\pi}=\\frac{900}{12}=75^\\circ$." },
        { id: "y11adv-r2d-p19", prompt: "Convert $\\frac{7\\pi}{12}$ to degrees.", latex: "\\frac{7\\pi}{12}", answer: "105", difficulty: 5, acceptedAnswers: ["105 degrees", "105°"], hint: "$\\frac{7\\times180}{12}$.", explanation: "$\\frac{7\\pi}{12}\\times\\frac{180}{\\pi}=\\frac{1260}{12}=105^\\circ$." },
        { id: "y11adv-r2d-p20", prompt: "Two radian angles $\\frac{\\pi}{4}$ and $\\frac{\\pi}{6}$ are added. Convert the sum to degrees.", latex: "\\frac{\\pi}{4}+\\frac{\\pi}{6}", answer: "75", difficulty: 5, acceptedAnswers: ["75 degrees", "75°"], hint: "Convert each: $45^\\circ+30^\\circ$.", explanation: "$45^\\circ+30^\\circ=75^\\circ$." },
        { id: "y11adv-r2d-p21", prompt: "Convert $\\frac{2\\pi}{9}$ to degrees.", latex: "\\frac{2\\pi}{9}", answer: "40", difficulty: 5, acceptedAnswers: ["40 degrees", "40°"], hint: "$\\frac{2\\times180}{9}$.", explanation: "$\\frac{2\\pi}{9}\\times\\frac{180}{\\pi}=\\frac{360}{9}=40^\\circ$." },
        { id: "y11adv-r2d-p22", prompt: "A radian angle $\\frac{3\\pi}{4}$ is doubled. Convert the result to degrees.", latex: "2\\times\\frac{3\\pi}{4}", answer: "270", difficulty: 5, acceptedAnswers: ["270 degrees", "270°"], hint: "$2\\times\\frac{3\\pi}{4}=\\frac{3\\pi}{2}$.", explanation: "$\\frac{3\\pi}{2}=270^\\circ$." },
        { id: "y11adv-r2d-p23", prompt: "Convert $\\frac{\\pi}{5}$ to degrees.", latex: "\\frac{\\pi}{5}", answer: "36", difficulty: 5, acceptedAnswers: ["36 degrees", "36°"], hint: "$180\\div5$.", explanation: "$\\frac{\\pi}{5}\\times\\frac{180}{\\pi}=36^\\circ$." },
        { id: "y11adv-r2d-p24", prompt: "Convert the angle to degrees.", latex: "2\\pi", answer: "360", difficulty: 2, acceptedAnswers: ["360 degrees", "360°"], hint: "Full turn.", explanation: "$2\\pi\\times\\frac{180}{\\pi}=360^\\circ$." },
        { id: "y11adv-r2d-p25", prompt: "Which radian angle equals 315°?", latex: "315^\\circ", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\frac{5\\pi}{4}$" }, { label: "B", text: "$\\frac{11\\pi}{6}$" }, { label: "C", text: "$\\frac{7\\pi}{4}$" }, { label: "D", text: "$\\frac{4\\pi}{3}$" }], hint: "$\\frac{7\\pi}{4}=7\\times45$.", explanation: "$\\frac{7\\pi}{4}=315^\\circ$." },
        { id: "y11adv-r2d-p26", prompt: "A student multiplies $\\frac{\\pi}{3}$ by $\\frac{\\pi}{180}$ to convert to degrees. Identify the error.", latex: "\\frac{\\pi}{3}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "They should square the angle" }, { label: "B", text: "Radians to degrees uses $\\frac{180}{\\pi}$, not $\\frac{\\pi}{180}$" }, { label: "C", text: "They forgot the $\\pi$" }, { label: "D", text: "The method is correct" }], hint: "Use $\\frac{180}{\\pi}$ for radians to degrees.", explanation: "Radians to degrees: multiply by $\\frac{180}{\\pi}$." },
        { id: "y11adv-r2d-p27", prompt: "Which radian angle equals 120°?", latex: "120^\\circ", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$\\frac{2\\pi}{3}$" }, { label: "B", text: "$\\frac{3\\pi}{4}$" }, { label: "C", text: "$\\frac{5\\pi}{6}$" }, { label: "D", text: "$\\frac{4\\pi}{3}$" }], hint: "$\\frac{2\\pi}{3}=2\\times60$.", explanation: "$\\frac{2\\pi}{3}=120^\\circ$." },
        { id: "y11adv-r2d-p28", prompt: "Convert $\\frac{3\\pi}{10}$ to degrees.", latex: "\\frac{3\\pi}{10}", answer: "54", difficulty: 4, acceptedAnswers: ["54 degrees", "54°"], hint: "$\\frac{3\\times180}{10}$.", explanation: "$\\frac{3\\pi}{10}\\times\\frac{180}{\\pi}=\\frac{540}{10}=54^\\circ$." },
        { id: "y11adv-r2d-p29", prompt: "Convert the angle to degrees.", latex: "\\frac{7\\pi}{2}", answer: "630", difficulty: 4, acceptedAnswers: ["630 degrees", "630°"], hint: "$7\\times90$.", explanation: "$\\frac{7\\pi}{2}\\times\\frac{180}{\\pi}=630^\\circ$." },
        { id: "y11adv-r2d-p30", prompt: "Convert $\\frac{11\\pi}{12}$ to degrees.", latex: "\\frac{11\\pi}{12}", answer: "165", difficulty: 5, acceptedAnswers: ["165 degrees", "165°"], hint: "$\\frac{11\\times180}{12}$.", explanation: "$\\frac{11\\pi}{12}\\times\\frac{180}{\\pi}=\\frac{1980}{12}=165^\\circ$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-r2d-mp1",
          prompt: "An angle is given as $\\frac{7\\pi}{6}$ radians.",
          latex: "\\theta=\\frac{7\\pi}{6}",
          answer: "210",
          hint: "(a) Convert to degrees. (b) State the supplement in degrees. (c) Convert the supplement back to radians.",
          explanation: "(a) $\\frac{7\\pi}{6}=210^\\circ$. (b) supplement $=180-210=-30$, so use the reference past 180: $210-180=30^\\circ$ reference; the angle exceeds 180, so its 'excess over a half turn' is 30°. (c) $30^\\circ=\\frac{\\pi}{6}$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Convert the angle to degrees.", latex: "\\frac{7\\pi}{6}\\times\\frac{180}{\\pi}", marks: 1, answer: "210", acceptedAnswers: ["210 degrees", "210°"], hint: "$7\\times30$.", explanation: "$\\frac{7\\pi}{6}\\times\\frac{180}{\\pi}=210^\\circ$." },
            { key: "b", label: "(b)", prompt: "By how many degrees does the angle exceed a half turn (180°)?", latex: "210^\\circ-180^\\circ", marks: 1, answer: "30", acceptedAnswers: ["30 degrees", "30°"], hint: "Subtract 180 from the degree value.", explanation: "$210^\\circ-180^\\circ=30^\\circ$." },
            { key: "c", label: "(c)", prompt: "Convert that excess (30°) back to radians.", latex: "30\\times\\frac{\\pi}{180}", marks: 2, answer: "pi/6", acceptedAnswers: ["\\pi/6", "π/6"], hint: "Multiply by $\\frac{\\pi}{180}$.", explanation: "$30\\times\\frac{\\pi}{180}=\\frac{\\pi}{6}$." },
          ],
        },
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
        formulaAnswer("y11adv-arc-m1", "Find the arc length.", "r=5,\\quad \\theta=\\frac{\\pi}{5}", "pi", ["\\pi", "π"]),
        formulaAnswer("y11adv-arc-m2", "Find the arc length.", "r=7,\\quad \\theta=\\frac{2\\pi}{7}", "2pi", ["2\\pi", "2π"]),
        formulaAnswer("y11adv-arc-m3", "Find the angle $\\theta$ in radians.", "s=4\\pi,\\quad r=8", "pi/2", ["\\pi/2", "π/2"]),
        formulaAnswer("y11adv-arc-m4", "Find the angle $\\theta$ in radians.", "s=3\\pi,\\quad r=9", "pi/3", ["\\pi/3", "π/3"]),
        formulaAnswer("y11adv-arc-m5", "Convert the angle to radians first, then find the arc length.", "r=6,\\quad \\theta=90^\\circ", "3pi", ["3\\pi", "3π"]),
        practicalChoice("y11adv-arc-m6", "A student applies $s=6\\times 30$ and gets $s=180$. Identify the error.", "B", ["The radius should be squared", "The angle must be converted to radians before using $s=r\\theta$", "The formula should be $s=2r\\theta$", "The arc cannot be longer than the radius"], "s = rθ requires θ in radians. Convert 30° → π/6 first.", "r=6,\\quad \\theta=30^\\circ"),
        formulaAnswer("y11adv-arc-m7", "Find the arc length.", "r=10,\\quad \\theta=\\frac{2\\pi}{5}", "4pi", ["4\\pi", "4π"]),
        formulaAnswer("y11adv-arc-m8", "Find the angle $\\theta$ in radians.", "s=\\pi,\\quad r=3", "pi/3", ["\\pi/3", "π/3"]),
        formulaAnswer("y11adv-arc-m9", "Find the arc length.", "r=15,\\quad \\theta=\\frac{\\pi}{5}", "3pi", ["3\\pi", "3π"]),
        formulaAnswer("y11adv-arc-m10", "Find the angle $\\theta$ in radians.", "s=5\\pi,\\quad r=10", "pi/2", ["\\pi/2", "π/2"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-arc-p1", prompt: "Find the arc length.", latex: "r=3,\\quad \\theta=\\frac{\\pi}{3}", answer: "pi", difficulty: 1, acceptedAnswers: ["\\pi", "π"], hint: "$s=r\\theta$.", explanation: "$s=3\\times\\frac{\\pi}{3}=\\pi$." },
        { id: "y11adv-arc-p2", prompt: "Find the arc length.", latex: "r=8,\\quad \\theta=\\frac{\\pi}{2}", answer: "4pi", difficulty: 1, acceptedAnswers: ["4\\pi", "4π"], hint: "$s=r\\theta$.", explanation: "$s=8\\times\\frac{\\pi}{2}=4\\pi$." },
        { id: "y11adv-arc-p3", prompt: "Find the arc length.", latex: "r=5,\\quad \\theta=\\frac{\\pi}{5}", answer: "pi", difficulty: 1, acceptedAnswers: ["\\pi", "π"], hint: "$s=r\\theta$.", explanation: "$s=5\\times\\frac{\\pi}{5}=\\pi$." },
        { id: "y11adv-arc-p4", prompt: "Which formula gives arc length?", latex: "\\text{arc length}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$s=\\frac12r^2\\theta$" }, { label: "B", text: "$s=r\\theta$" }, { label: "C", text: "$s=2\\pi r$" }, { label: "D", text: "$s=r+\\theta$" }], hint: "Arc length is radius times angle.", explanation: "$s=r\\theta$ with $\\theta$ in radians." },
        { id: "y11adv-arc-p5", prompt: "Find the arc length.", latex: "r=4,\\quad \\theta=\\frac{3\\pi}{4}", answer: "3pi", difficulty: 2, acceptedAnswers: ["3\\pi", "3π"], hint: "$s=r\\theta$.", explanation: "$s=4\\times\\frac{3\\pi}{4}=3\\pi$." },
        { id: "y11adv-arc-p6", prompt: "Find the arc length.", latex: "r=12,\\quad \\theta=\\frac{\\pi}{6}", answer: "2pi", difficulty: 2, acceptedAnswers: ["2\\pi", "2π"], hint: "$s=r\\theta$.", explanation: "$s=12\\times\\frac{\\pi}{6}=2\\pi$." },
        { id: "y11adv-arc-p7", prompt: "Find the arc length.", latex: "r=7,\\quad \\theta=\\frac{2\\pi}{7}", answer: "2pi", difficulty: 2, acceptedAnswers: ["2\\pi", "2π"], hint: "$s=r\\theta$.", explanation: "$s=7\\times\\frac{2\\pi}{7}=2\\pi$." },
        { id: "y11adv-arc-p8", prompt: "Find the arc length.", latex: "r=10,\\quad \\theta=\\frac{2\\pi}{5}", answer: "4pi", difficulty: 2, acceptedAnswers: ["4\\pi", "4π"], hint: "$s=r\\theta$.", explanation: "$s=10\\times\\frac{2\\pi}{5}=4\\pi$." },
        { id: "y11adv-arc-p9", prompt: "Find the angle $\\theta$ in radians.", latex: "s=4\\pi,\\quad r=8", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "$\\theta=s/r$.", explanation: "$\\theta=\\frac{4\\pi}{8}=\\frac{\\pi}{2}$." },
        { id: "y11adv-arc-p10", prompt: "Find the angle $\\theta$ in radians.", latex: "s=3\\pi,\\quad r=9", answer: "pi/3", difficulty: 3, acceptedAnswers: ["\\pi/3", "π/3"], hint: "$\\theta=s/r$.", explanation: "$\\theta=\\frac{3\\pi}{9}=\\frac{\\pi}{3}$." },
        { id: "y11adv-arc-p11", prompt: "Find the angle $\\theta$ in radians.", latex: "s=\\pi,\\quad r=3", answer: "pi/3", difficulty: 3, acceptedAnswers: ["\\pi/3", "π/3"], hint: "$\\theta=s/r$.", explanation: "$\\theta=\\frac{\\pi}{3}$." },
        { id: "y11adv-arc-p12", prompt: "Convert the angle to radians first, then find the arc length.", latex: "r=6,\\quad \\theta=90^\\circ", answer: "3pi", difficulty: 3, acceptedAnswers: ["3\\pi", "3π"], hint: "$90^\\circ=\\frac{\\pi}{2}$.", explanation: "$s=6\\times\\frac{\\pi}{2}=3\\pi$." },
        { id: "y11adv-arc-p13", prompt: "Find the radius.", latex: "s=10\\pi,\\quad \\theta=\\frac{5\\pi}{3}", answer: "6", difficulty: 3, hint: "$r=s/\\theta$.", explanation: "$r=10\\pi\\div\\frac{5\\pi}{3}=10\\pi\\times\\frac{3}{5\\pi}=6$." },
        { id: "y11adv-arc-p14", prompt: "A student applies $s=6\\times30$ and gets 180. Identify the error.", latex: "r=6,\\quad \\theta=30^\\circ", answer: "B", difficulty: 4, choices: [{ label: "A", text: "The radius should be squared" }, { label: "B", text: "$\\theta$ must be converted to radians first" }, { label: "C", text: "The formula should be $s=2r\\theta$" }, { label: "D", text: "An arc cannot be longer than the radius" }], hint: "$s=r\\theta$ needs radians.", explanation: "Convert $30^\\circ\\to\\frac{\\pi}{6}$ first: $s=6\\times\\frac{\\pi}{6}=\\pi$." },
        { id: "y11adv-arc-p15", prompt: "Convert to radians first, then find the arc length.", latex: "r=9,\\quad \\theta=120^\\circ", answer: "6pi", difficulty: 4, acceptedAnswers: ["6\\pi", "6π"], hint: "$120^\\circ=\\frac{2\\pi}{3}$.", explanation: "$s=9\\times\\frac{2\\pi}{3}=6\\pi$." },
        { id: "y11adv-arc-p16", prompt: "Find the radius.", latex: "s=6\\pi,\\quad \\theta=\\frac{2\\pi}{3}", answer: "9", difficulty: 4, hint: "$r=s/\\theta$.", explanation: "$r=6\\pi\\div\\frac{2\\pi}{3}=6\\pi\\times\\frac{3}{2\\pi}=9$." },
        { id: "y11adv-arc-p17", prompt: "Find the arc length.", latex: "r=15,\\quad \\theta=\\frac{\\pi}{5}", answer: "3pi", difficulty: 4, acceptedAnswers: ["3\\pi", "3π"], hint: "$s=r\\theta$.", explanation: "$s=15\\times\\frac{\\pi}{5}=3\\pi$." },
        { id: "y11adv-arc-p18", prompt: "Convert to radians first, then find the arc length.", latex: "r=10,\\quad \\theta=144^\\circ", answer: "8pi", difficulty: 4, acceptedAnswers: ["8\\pi", "8π"], hint: "$144^\\circ=\\frac{4\\pi}{5}$.", explanation: "$s=10\\times\\frac{4\\pi}{5}=8\\pi$." },
        { id: "y11adv-arc-p19", prompt: "A wire of length $6\\pi$ cm is bent into an arc on a circle of radius 9 cm. Find the angle subtended in radians.", latex: "s=6\\pi,\\quad r=9", answer: "2pi/3", difficulty: 5, acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "$\\theta=s/r$.", explanation: "$\\theta=\\frac{6\\pi}{9}=\\frac{2\\pi}{3}$." },
        { id: "y11adv-arc-p20", prompt: "Two arcs on a circle of radius 6 subtend $\\frac{\\pi}{4}$ and $\\frac{\\pi}{2}$. Find the total arc length.", latex: "r=6,\\quad \\theta_1=\\frac{\\pi}{4},\\quad \\theta_2=\\frac{\\pi}{2}", answer: "9pi/2", difficulty: 5, acceptedAnswers: ["9\\pi/2", "9π/2", "4.5pi", "4.5\\pi"], hint: "Add the angles, then $s=r\\theta$.", explanation: "$\\theta_1+\\theta_2=\\frac{3\\pi}{4}$; $s=6\\times\\frac{3\\pi}{4}=\\frac{9\\pi}{2}$." },
        { id: "y11adv-arc-p21", prompt: "An arc of length $4\\pi$ subtends an angle of $\\frac{2\\pi}{3}$. Find the circumference of the full circle.", latex: "s=4\\pi,\\quad \\theta=\\frac{2\\pi}{3}", answer: "12pi", difficulty: 5, acceptedAnswers: ["12\\pi", "12π"], hint: "Find $r$, then $C=2\\pi r$.", explanation: "$r=4\\pi\\div\\frac{2\\pi}{3}=6$; $C=2\\pi(6)=12\\pi$." },
        { id: "y11adv-arc-p22", prompt: "A circle of radius 8 has an arc of length $6\\pi$. What fraction of the full circumference is the arc?", latex: "r=8,\\quad s=6\\pi", answer: "3/8", difficulty: 5, acceptedAnswers: ["0.375"], hint: "Full circumference $=16\\pi$; fraction $=\\frac{s}{C}$.", explanation: "$C=16\\pi$; $\\frac{6\\pi}{16\\pi}=\\frac{3}{8}$." },
        { id: "y11adv-arc-p23", prompt: "Find the arc length.", latex: "r=5,\\quad \\theta=\\frac{4\\pi}{5}", answer: "4pi", difficulty: 3, acceptedAnswers: ["4\\pi", "4π"], hint: "$s=r\\theta$.", explanation: "$s=5\\times\\frac{4\\pi}{5}=4\\pi$." },
        { id: "y11adv-arc-p24", prompt: "Find the angle $\\theta$ in radians.", latex: "s=5\\pi,\\quad r=10", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "$\\theta=s/r$.", explanation: "$\\theta=\\frac{5\\pi}{10}=\\frac{\\pi}{2}$." },
        { id: "y11adv-arc-p25", prompt: "Find the arc length.", latex: "r=6,\\quad \\theta=2\\pi", answer: "12pi", difficulty: 2, acceptedAnswers: ["12\\pi", "12π"], hint: "Full turn — this is the circumference.", explanation: "$s=6\\times2\\pi=12\\pi$." },
        { id: "y11adv-arc-p26", prompt: "Which is the arc length for $r=9$, $\\theta=\\frac{2\\pi}{3}$?", latex: "r=9,\\quad \\theta=\\frac{2\\pi}{3}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$3\\pi$" }, { label: "B", text: "$9\\pi$" }, { label: "C", text: "$6\\pi$" }, { label: "D", text: "$\\frac{2\\pi}{3}$" }], hint: "$s=r\\theta$.", explanation: "$s=9\\times\\frac{2\\pi}{3}=6\\pi$." },
        { id: "y11adv-arc-p27", prompt: "Find the radius.", latex: "s=2\\pi,\\quad \\theta=\\frac{\\pi}{4}", answer: "8", difficulty: 4, hint: "$r=s/\\theta$.", explanation: "$r=2\\pi\\div\\frac{\\pi}{4}=8$." },
        { id: "y11adv-arc-p28", prompt: "Find the angle $\\theta$ in radians.", latex: "s=8\\pi,\\quad r=12", answer: "2pi/3", difficulty: 4, acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "$\\theta=s/r$, simplify.", explanation: "$\\theta=\\frac{8\\pi}{12}=\\frac{2\\pi}{3}$." },
        { id: "y11adv-arc-p29", prompt: "Find the arc length.", latex: "r=20,\\quad \\theta=\\frac{\\pi}{10}", answer: "2pi", difficulty: 3, acceptedAnswers: ["2\\pi", "2π"], hint: "$s=r\\theta$.", explanation: "$s=20\\times\\frac{\\pi}{10}=2\\pi$." },
        { id: "y11adv-arc-p30", prompt: "A pendulum of length 50 cm swings through $\\frac{\\pi}{6}$. Find the arc length traced by the tip (in cm).", latex: "r=50,\\quad \\theta=\\frac{\\pi}{6}", answer: "25pi/3", difficulty: 5, acceptedAnswers: ["25\\pi/3", "25π/3"], hint: "$s=r\\theta$.", explanation: "$s=50\\times\\frac{\\pi}{6}=\\frac{50\\pi}{6}=\\frac{25\\pi}{3}$ cm." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-arc-mp1",
          prompt: "An arc of length $4\\pi$ cm lies on a circle and subtends an angle of $\\frac{2\\pi}{3}$ at the centre.",
          latex: "s=4\\pi,\\quad \\theta=\\frac{2\\pi}{3}",
          answer: "6",
          hint: "(a) Use $r=s/\\theta$. (b) Circumference $C=2\\pi r$. (c) A new arc on the same circle subtends $\\frac{\\pi}{6}$ — use $s=r\\theta$.",
          explanation: "(a) $r=4\\pi\\div\\frac{2\\pi}{3}=6$. (b) $C=2\\pi(6)=12\\pi$. (c) $s=6\\times\\frac{\\pi}{6}=\\pi$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the radius of the circle.", latex: "r=\\frac{s}{\\theta}", marks: 2, answer: "6", hint: "Divide arc length by angle.", explanation: "$r=4\\pi\\div\\frac{2\\pi}{3}=4\\pi\\times\\frac{3}{2\\pi}=6$." },
            { key: "b", label: "(b)", prompt: "Find the circumference of the full circle.", latex: "C=2\\pi r", marks: 1, answer: "12pi", acceptedAnswers: ["12\\pi", "12π"], hint: "$C=2\\pi r$ with the radius from (a).", explanation: "$C=2\\pi(6)=12\\pi$." },
            { key: "c", label: "(c)", prompt: "A second arc on the same circle subtends $\\frac{\\pi}{6}$. Find its length.", latex: "s=r\\theta", marks: 1, answer: "pi", acceptedAnswers: ["\\pi", "π"], hint: "Use the radius from (a).", explanation: "$s=6\\times\\frac{\\pi}{6}=\\pi$." },
          ],
        },
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
        formulaAnswer("y11adv-sector-m1", "Find the sector area.", "r=3,\\quad \\theta=\\frac{2\\pi}{3}", "3pi", ["3\\pi", "3π"]),
        formulaAnswer("y11adv-sector-m2", "Find the sector area.", "r=8,\\quad \\theta=\\frac{\\pi}{4}", "8pi", ["8\\pi", "8π"]),
        formulaAnswer("y11adv-sector-m3", "Find the radius.", "A=9\\pi,\\quad \\theta=\\frac{\\pi}{2}", "6", []),
        formulaAnswer("y11adv-sector-m4", "Find the radius.", "A=3\\pi,\\quad \\theta=\\frac{2\\pi}{3}", "3", []),
        formulaAnswer("y11adv-sector-m5", "Find the sector area.", "r=5,\\quad \\theta=\\frac{2\\pi}{5}", "5pi", ["5\\pi", "5π"]),
        formulaAnswer("y11adv-sector-m6", "Convert the angle to radians first, then find the sector area.", "r=6,\\quad \\theta=90^\\circ", "9pi", ["9\\pi", "9π"]),
        practicalChoice("y11adv-sector-m7", "A student computes $A=\\frac12\\times r\\times\\theta$ instead of $A=\\frac12r^2\\theta$. Identify the error.", "C", ["The ½ should be removed", "θ must be in degrees", "The radius should be squared", "The formula needs an extra factor of π"], "The correct formula is A = ½r²θ; r must be squared.", "A=\\frac12r^2\\theta"),
        formulaAnswer("y11adv-sector-m8", "Find the sector area.", "r=4,\\quad \\theta=\\frac{\\pi}{3}", "8pi/3", ["8\\pi/3", "8π/3"]),
        formulaAnswer("y11adv-sector-m9", "Find the perimeter of the sector.", "r=6,\\quad \\theta=\\frac{\\pi}{3}", "12+2pi", ["12+2\\pi", "12+2π"]),
        formulaAnswer("y11adv-sector-m10", "Find the angle $\\theta$ in radians.", "A=6\\pi,\\quad r=6", "pi/3", ["\\pi/3", "π/3"]),
      ],
      masteryQuizPool: [
        { id: "y11adv-sector-p1", prompt: "Find the sector area.", latex: "r=4,\\quad \\theta=\\frac{\\pi}{4}", answer: "2pi", difficulty: 1, acceptedAnswers: ["2\\pi", "2π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times16\\times\\frac{\\pi}{4}=2\\pi$." },
        { id: "y11adv-sector-p2", prompt: "Find the sector area.", latex: "r=6,\\quad \\theta=\\frac{\\pi}{3}", answer: "6pi", difficulty: 1, acceptedAnswers: ["6\\pi", "6π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times36\\times\\frac{\\pi}{3}=6\\pi$." },
        { id: "y11adv-sector-p3", prompt: "Which formula gives sector area?", latex: "\\text{sector area}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$A=\\frac12r^2\\theta$" }, { label: "B", text: "$A=r\\theta$" }, { label: "C", text: "$A=\\pi r^2$" }, { label: "D", text: "$A=\\frac12r\\theta$" }], hint: "Square the radius.", explanation: "$A=\\frac12r^2\\theta$ with $\\theta$ in radians." },
        { id: "y11adv-sector-p4", prompt: "Find the sector area.", latex: "r=2,\\quad \\theta=\\pi", answer: "2pi", difficulty: 1, acceptedAnswers: ["2\\pi", "2π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times4\\times\\pi=2\\pi$." },
        { id: "y11adv-sector-p5", prompt: "Find the sector area.", latex: "r=5,\\quad \\theta=\\frac{2\\pi}{5}", answer: "5pi", difficulty: 2, acceptedAnswers: ["5\\pi", "5π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times25\\times\\frac{2\\pi}{5}=5\\pi$." },
        { id: "y11adv-sector-p6", prompt: "Find the sector area.", latex: "r=4,\\quad \\theta=\\frac{\\pi}{2}", answer: "4pi", difficulty: 2, acceptedAnswers: ["4\\pi", "4π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times16\\times\\frac{\\pi}{2}=4\\pi$." },
        { id: "y11adv-sector-p7", prompt: "Find the sector area.", latex: "r=8,\\quad \\theta=\\frac{\\pi}{4}", answer: "8pi", difficulty: 2, acceptedAnswers: ["8\\pi", "8π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times64\\times\\frac{\\pi}{4}=8\\pi$." },
        { id: "y11adv-sector-p8", prompt: "Find the sector area.", latex: "r=3,\\quad \\theta=\\frac{2\\pi}{3}", answer: "3pi", difficulty: 2, acceptedAnswers: ["3\\pi", "3π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times9\\times\\frac{2\\pi}{3}=3\\pi$." },
        { id: "y11adv-sector-p9", prompt: "Find the radius.", latex: "A=9\\pi,\\quad \\theta=\\frac{\\pi}{2}", answer: "6", difficulty: 3, hint: "$r^2=\\frac{2A}{\\theta}$.", explanation: "$r^2=\\frac{18\\pi}{\\pi/2}=36$, $r=6$." },
        { id: "y11adv-sector-p10", prompt: "Find the radius.", latex: "A=12\\pi,\\quad \\theta=\\frac{2\\pi}{3}", answer: "6", difficulty: 3, hint: "$r^2=\\frac{2A}{\\theta}$.", explanation: "$r^2=\\frac{24\\pi}{2\\pi/3}=36$, $r=6$." },
        { id: "y11adv-sector-p11", prompt: "Find the radius.", latex: "A=3\\pi,\\quad \\theta=\\frac{2\\pi}{3}", answer: "3", difficulty: 3, hint: "$r^2=\\frac{2A}{\\theta}$.", explanation: "$r^2=\\frac{6\\pi}{2\\pi/3}=9$, $r=3$." },
        { id: "y11adv-sector-p12", prompt: "Find the angle $\\theta$ in radians.", latex: "A=6\\pi,\\quad r=6", answer: "pi/3", difficulty: 3, acceptedAnswers: ["\\pi/3", "π/3"], hint: "$\\theta=\\frac{2A}{r^2}$.", explanation: "$\\theta=\\frac{12\\pi}{36}=\\frac{\\pi}{3}$." },
        { id: "y11adv-sector-p13", prompt: "Convert to radians first, then find the sector area.", latex: "r=6,\\quad \\theta=60^\\circ", answer: "6pi", difficulty: 3, acceptedAnswers: ["6\\pi", "6π"], hint: "$60^\\circ=\\frac{\\pi}{3}$.", explanation: "$A=\\frac12\\times36\\times\\frac{\\pi}{3}=6\\pi$." },
        { id: "y11adv-sector-p14", prompt: "A student computes $A=\\frac12\\times r\\times\\theta$. Identify the error.", latex: "A=\\frac12r^2\\theta", answer: "C", difficulty: 4, choices: [{ label: "A", text: "The $\\frac12$ should be removed" }, { label: "B", text: "$\\theta$ must be in degrees" }, { label: "C", text: "The radius should be squared" }, { label: "D", text: "It needs an extra factor of $\\pi$" }], hint: "Square $r$ first.", explanation: "The formula is $A=\\frac12r^2\\theta$; $r$ must be squared." },
        { id: "y11adv-sector-p15", prompt: "Convert to radians first, then find the sector area.", latex: "r=6,\\quad \\theta=90^\\circ", answer: "9pi", difficulty: 4, acceptedAnswers: ["9\\pi", "9π"], hint: "$90^\\circ=\\frac{\\pi}{2}$.", explanation: "$A=\\frac12\\times36\\times\\frac{\\pi}{2}=9\\pi$." },
        { id: "y11adv-sector-p16", prompt: "Find the sector area.", latex: "r=4,\\quad \\theta=\\frac{\\pi}{3}", answer: "8pi/3", difficulty: 4, acceptedAnswers: ["8\\pi/3", "8π/3"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times16\\times\\frac{\\pi}{3}=\\frac{8\\pi}{3}$." },
        { id: "y11adv-sector-p17", prompt: "Find the perimeter of the sector.", latex: "r=6,\\quad \\theta=\\frac{\\pi}{3}", answer: "12+2pi", difficulty: 4, acceptedAnswers: ["12+2\\pi", "12+2π"], hint: "Arc $s=r\\theta$, then $P=2r+s$.", explanation: "$s=6\\times\\frac{\\pi}{3}=2\\pi$; $P=12+2\\pi$." },
        { id: "y11adv-sector-p18", prompt: "Find the perimeter of the sector.", latex: "r=3,\\quad \\theta=\\frac{2\\pi}{3}", answer: "6+2pi", difficulty: 4, acceptedAnswers: ["6+2\\pi", "6+2π"], hint: "Arc $s=r\\theta$, then $P=2r+s$.", explanation: "$s=3\\times\\frac{2\\pi}{3}=2\\pi$; $P=6+2\\pi$." },
        { id: "y11adv-sector-p19", prompt: "A sector has area $24\\pi$ and radius 12. Find its perimeter.", latex: "A=24\\pi,\\quad r=12", answer: "24+4pi", difficulty: 5, acceptedAnswers: ["24+4\\pi", "24+4π"], hint: "Find $\\theta=\\frac{2A}{r^2}$, then arc, then $P$.", explanation: "$\\theta=\\frac{48\\pi}{144}=\\frac{\\pi}{3}$; $s=12\\times\\frac{\\pi}{3}=4\\pi$; $P=24+4\\pi$." },
        { id: "y11adv-sector-p20", prompt: "A sector of radius 10 has arc length $5\\pi$. Find its area.", latex: "r=10,\\quad s=5\\pi", answer: "25pi", difficulty: 5, acceptedAnswers: ["25\\pi", "25π"], hint: "$\\theta=s/r$, then $A=\\frac12r^2\\theta$.", explanation: "$\\theta=\\frac{5\\pi}{10}=\\frac{\\pi}{2}$; $A=\\frac12\\times100\\times\\frac{\\pi}{2}=25\\pi$." },
        { id: "y11adv-sector-p21", prompt: "A sector has area $18\\pi$ and central angle $\\frac{\\pi}{4}$. Find its arc length.", latex: "A=18\\pi,\\quad \\theta=\\frac{\\pi}{4}", answer: "3pi", difficulty: 5, acceptedAnswers: ["3\\pi", "3π"], hint: "Find $r$ from area, then $s=r\\theta$.", explanation: "$r^2=\\frac{36\\pi}{\\pi/4}=144$, $r=12$; $s=12\\times\\frac{\\pi}{4}=3\\pi$." },
        { id: "y11adv-sector-p22", prompt: "A pizza slice (sector) has radius 15 cm and angle $\\frac{\\pi}{6}$. Find its area in cm².", latex: "r=15,\\quad \\theta=\\frac{\\pi}{6}", answer: "75pi/4", difficulty: 5, acceptedAnswers: ["75\\pi/4", "75π/4"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times225\\times\\frac{\\pi}{6}=\\frac{225\\pi}{12}=\\frac{75\\pi}{4}$ cm²." },
        { id: "y11adv-sector-p23", prompt: "Find the sector area.", latex: "r=10,\\quad \\theta=\\frac{\\pi}{5}", answer: "10pi", difficulty: 3, acceptedAnswers: ["10\\pi", "10π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times100\\times\\frac{\\pi}{5}=10\\pi$." },
        { id: "y11adv-sector-p24", prompt: "Find the angle $\\theta$ in radians.", latex: "A=4\\pi,\\quad r=4", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "$\\theta=\\frac{2A}{r^2}$.", explanation: "$\\theta=\\frac{8\\pi}{16}=\\frac{\\pi}{2}$." },
        { id: "y11adv-sector-p25", prompt: "Which gives the sector area for $r=6$, $\\theta=\\frac{2\\pi}{3}$?", latex: "r=6,\\quad \\theta=\\frac{2\\pi}{3}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$6\\pi$" }, { label: "B", text: "$24\\pi$" }, { label: "C", text: "$12\\pi$" }, { label: "D", text: "$3\\pi$" }], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times36\\times\\frac{2\\pi}{3}=12\\pi$." },
        { id: "y11adv-sector-p26", prompt: "Find the radius.", latex: "A=8\\pi,\\quad \\theta=\\pi", answer: "4", difficulty: 4, hint: "$r^2=\\frac{2A}{\\theta}$.", explanation: "$r^2=\\frac{16\\pi}{\\pi}=16$, $r=4$." },
        { id: "y11adv-sector-p27", prompt: "Find the perimeter of the sector.", latex: "r=5,\\quad \\theta=\\frac{2\\pi}{5}", answer: "10+2pi", difficulty: 4, acceptedAnswers: ["10+2\\pi", "10+2π"], hint: "Arc $s=r\\theta$, then $P=2r+s$.", explanation: "$s=5\\times\\frac{2\\pi}{5}=2\\pi$; $P=10+2\\pi$." },
        { id: "y11adv-sector-p28", prompt: "Find the sector area.", latex: "r=12,\\quad \\theta=\\frac{\\pi}{6}", answer: "12pi", difficulty: 3, acceptedAnswers: ["12\\pi", "12π"], hint: "$A=\\frac12r^2\\theta$.", explanation: "$A=\\frac12\\times144\\times\\frac{\\pi}{6}=12\\pi$." },
        { id: "y11adv-sector-p29", prompt: "Find the angle $\\theta$ in radians.", latex: "A=8\\pi,\\quad r=8", answer: "pi/4", difficulty: 4, acceptedAnswers: ["\\pi/4", "π/4"], hint: "$\\theta=\\frac{2A}{r^2}$.", explanation: "$\\theta=\\frac{16\\pi}{64}=\\frac{\\pi}{4}$." },
        { id: "y11adv-sector-p30", prompt: "A sector of radius 6 has the same area as a circle of radius 2. Find the sector's central angle in radians.", latex: "A_{\\text{circle}}=\\pi(2)^2", answer: "2pi/9", difficulty: 5, acceptedAnswers: ["2\\pi/9", "2π/9"], hint: "Circle area $=4\\pi$; solve $\\frac12(36)\\theta=4\\pi$.", explanation: "$4\\pi=18\\theta$ gives $\\theta=\\frac{4\\pi}{18}=\\frac{2\\pi}{9}$." },
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
              explanation: "s = 9 × 2π/3 = 6π.",
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
              explanation: "A = ½ × 81 × 2π/3 = 81π/3 = 27π.",
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
              explanation: "P = 2(9) + 6π = 18 + 6π.",
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
    const ucvPi: import("../types").UnitCircleDiagram = {
      description:
        "Unit circle showing the boundary angle θ = π (180°). The terminal point (−1, 0) is at the leftmost point of the circle on the negative x-axis. cos(π) = −1 and sin(π) = 0.",
      angleRadians: "π",
      angleDegrees: "180",
      terminalPoint: { x: "-1", y: "0", label: "(-1, 0)" },
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
        {
          ...formulaAnswer("y11adv-ucv-m1", "Evaluate using the unit circle.", "\\cos\\left(\\frac{\\pi}{6}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          hint: "cos(π/6) = x-coordinate at θ = π/6.",
        },
        {
          ...formulaAnswer("y11adv-ucv-m2", "Evaluate using the unit circle.", "\\sin\\left(\\frac{\\pi}{3}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          hint: "sin(π/3) = y-coordinate at θ = π/3.",
        },
        {
          ...formulaAnswer("y11adv-ucv-m3", "Evaluate using the unit circle.", "\\cos\\pi", "-1", []),
          unitCircleDiagram: ucvPi,
          hint: "At θ = π the terminal point is (−1, 0). Read the x-coordinate.",
        },
        {
          ...formulaAnswer("y11adv-ucv-m4", "Evaluate using $\\tan\\theta=\\sin\\theta/\\cos\\theta$.", "\\tan\\left(\\frac{\\pi}{4}\\right)", "1", []),
          hint: "sin(π/4) = cos(π/4) = √2/2. Their ratio is 1.",
        },
        {
          ...formulaAnswer("y11adv-ucv-m5", "Evaluate using the unit circle.", "\\cos\\left(\\frac{\\pi}{2}\\right)", "0", []),
          unitCircleDiagram: ucvPiOver2,
          hint: "At θ = π/2 the terminal point is (0, 1). Read the x-coordinate for cosine.",
        },
        practicalChoice(
          "y11adv-ucv-m6",
          "Which is the correct unit-circle point at $\\theta=\\frac{\\pi}{6}$?",
          "C",
          [
            "$\\left(\\frac{1}{2},\\,\\frac{\\sqrt{3}}{2}\\right)$",
            "$\\left(\\frac{\\sqrt{2}}{2},\\,\\frac{\\sqrt{2}}{2}\\right)$",
            "$\\left(\\frac{\\sqrt{3}}{2},\\,\\frac{1}{2}\\right)$",
            "$(0,\\,1)$",
          ],
          "At π/6: x = cos(π/6) = √3/2, y = sin(π/6) = 1/2. The point is (√3/2, 1/2).",
          "\\theta=\\frac{\\pi}{6}"
        ),
        {
          ...formulaAnswer("y11adv-ucv-m7", "Evaluate using the unit circle.", "\\cos 0", "1", []),
          hint: "The starting point on the unit circle is (1, 0). cos(0) = x-coordinate = 1.",
        },
        {
          ...formulaAnswer("y11adv-ucv-m8", "Evaluate using the unit circle.", "\\sin 0", "0", []),
          hint: "The starting point on the unit circle is (1, 0). sin(0) = y-coordinate = 0.",
        },
        practicalChoice(
          "y11adv-ucv-m9",
          "A student writes $\\sin\\!\\left(\\frac{\\pi}{6}\\right)=\\frac{\\sqrt{3}}{2}$. Identify the error.",
          "C",
          [
            "$\\sin\\!\\left(\\frac{\\pi}{6}\\right)=1$",
            "$\\frac{\\sqrt{3}}{2}$ is correct",
            "$\\sin\\!\\left(\\frac{\\pi}{6}\\right)=\\frac{1}{2}$; the value $\\frac{\\sqrt{3}}{2}$ belongs to $\\sin\\!\\left(\\frac{\\pi}{3}\\right)$",
            "$\\sin\\!\\left(\\frac{\\pi}{6}\\right)=\\frac{\\sqrt{2}}{2}$",
          ],
          "At π/6 the y-coordinate is 1/2. The value √3/2 is the y-coordinate at π/3 — the two angles are swapped.",
          "\\sin\\left(\\frac{\\pi}{6}\\right)"
        ),
        {
          ...formulaAnswer("y11adv-ucv-m10", "Evaluate without a calculator.", "2\\sin\\!\\left(\\frac{\\pi}{6}\\right)\\cos\\!\\left(\\frac{\\pi}{6}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          hint: "Substitute sin(π/6) = 1/2 and cos(π/6) = √3/2. Multiply: 2 × (1/2) × (√3/2).",
        },
      ],
      masteryQuizPool: [
        { id: "y11adv-ucv-p1", prompt: "Evaluate using the unit circle.", latex: "\\cos\\left(\\frac{\\pi}{6}\\right)", answer: "sqrt(3)/2", difficulty: 1, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "x-coordinate at $\\pi/6$.", explanation: "$\\cos(\\pi/6)=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucv-p2", prompt: "Evaluate using the unit circle.", latex: "\\sin\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)/2", difficulty: 1, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "y-coordinate at $\\pi/3$.", explanation: "$\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucv-p3", prompt: "Evaluate using the unit circle.", latex: "\\cos 0", answer: "1", difficulty: 1, hint: "Starting point $(1,0)$.", explanation: "$\\cos 0=1$." },
        { id: "y11adv-ucv-p4", prompt: "Evaluate using the unit circle.", latex: "\\sin 0", answer: "0", difficulty: 1, hint: "Starting point $(1,0)$.", explanation: "$\\sin 0=0$." },
        { id: "y11adv-ucv-p5", prompt: "Evaluate using the unit circle.", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)", answer: "1/2", difficulty: 2, acceptedAnswers: ["0.5"], hint: "y-coordinate at $\\pi/6$.", explanation: "$\\sin(\\pi/6)=\\frac12$." },
        { id: "y11adv-ucv-p6", prompt: "Evaluate using the unit circle.", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)", answer: "1/2", difficulty: 2, acceptedAnswers: ["0.5"], hint: "x-coordinate at $\\pi/3$.", explanation: "$\\cos(\\pi/3)=\\frac12$." },
        { id: "y11adv-ucv-p7", prompt: "Evaluate using the unit circle.", latex: "\\cos\\left(\\frac{\\pi}{2}\\right)", answer: "0", difficulty: 2, hint: "Top of the circle $(0,1)$.", explanation: "$\\cos(\\pi/2)=0$." },
        { id: "y11adv-ucv-p8", prompt: "Evaluate using the unit circle.", latex: "\\sin\\left(\\frac{\\pi}{2}\\right)", answer: "1", difficulty: 2, hint: "Top of the circle $(0,1)$.", explanation: "$\\sin(\\pi/2)=1$." },
        { id: "y11adv-ucv-p9", prompt: "Evaluate using the unit circle.", latex: "\\cos\\pi", answer: "-1", difficulty: 3, acceptedAnswers: ["−1"], hint: "Leftmost point $(-1,0)$.", explanation: "$\\cos\\pi=-1$." },
        { id: "y11adv-ucv-p10", prompt: "Evaluate using the unit circle.", latex: "\\sin\\frac{3\\pi}{2}", answer: "-1", difficulty: 3, acceptedAnswers: ["−1"], hint: "Bottom point $(0,-1)$.", explanation: "$\\sin\\frac{3\\pi}{2}=-1$." },
        { id: "y11adv-ucv-p11", prompt: "Evaluate using $\\tan\\theta=\\sin\\theta/\\cos\\theta$.", latex: "\\tan\\left(\\frac{\\pi}{4}\\right)", answer: "1", difficulty: 3, hint: "$\\sin(\\pi/4)=\\cos(\\pi/4)$.", explanation: "$\\tan(\\pi/4)=\\frac{\\sqrt2/2}{\\sqrt2/2}=1$." },
        { id: "y11adv-ucv-p12", prompt: "Which is the unit-circle point at $\\theta=\\frac{\\pi}{6}$?", latex: "\\theta=\\frac{\\pi}{6}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$\\left(\\frac12,\\frac{\\sqrt3}{2}\\right)$" }, { label: "B", text: "$\\left(\\frac{\\sqrt2}{2},\\frac{\\sqrt2}{2}\\right)$" }, { label: "C", text: "$\\left(\\frac{\\sqrt3}{2},\\frac12\\right)$" }, { label: "D", text: "$(0,1)$" }], hint: "x is cosine, y is sine.", explanation: "At $\\pi/6$: $(\\cos,\\sin)=(\\frac{\\sqrt3}{2},\\frac12)$." },
        { id: "y11adv-ucv-p13", prompt: "Which is the unit-circle point at $\\theta=\\frac{\\pi}{4}$?", latex: "\\theta=\\frac{\\pi}{4}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "$\\left(\\frac{\\sqrt3}{2},\\frac12\\right)$" }, { label: "B", text: "$\\left(\\frac{\\sqrt2}{2},\\frac{\\sqrt2}{2}\\right)$" }, { label: "C", text: "$\\left(\\frac12,\\frac{\\sqrt3}{2}\\right)$" }, { label: "D", text: "$(1,0)$" }], hint: "Both coordinates equal.", explanation: "At $\\pi/4$: $\\left(\\frac{\\sqrt2}{2},\\frac{\\sqrt2}{2}\\right)$." },
        { id: "y11adv-ucv-p14", prompt: "A student writes $\\sin(\\frac{\\pi}{6})=\\frac{\\sqrt3}{2}$. Identify the error.", latex: "\\sin\\left(\\frac{\\pi}{6}\\right)", answer: "C", difficulty: 4, choices: [{ label: "A", text: "$\\sin(\\frac{\\pi}{6})=1$" }, { label: "B", text: "$\\frac{\\sqrt3}{2}$ is correct" }, { label: "C", text: "$\\sin(\\frac{\\pi}{6})=\\frac12$; $\\frac{\\sqrt3}{2}$ belongs to $\\sin(\\frac{\\pi}{3})$" }, { label: "D", text: "$\\sin(\\frac{\\pi}{6})=\\frac{\\sqrt2}{2}$" }], hint: "y-coordinate at $\\pi/6$ is $\\frac12$.", explanation: "$\\sin(\\pi/6)=\\frac12$; the angles are swapped." },
        { id: "y11adv-ucv-p15", prompt: "Evaluate without a calculator.", latex: "2\\sin\\!\\left(\\frac{\\pi}{6}\\right)\\cos\\!\\left(\\frac{\\pi}{6}\\right)", answer: "sqrt(3)/2", difficulty: 4, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "$\\sin(\\pi/6)=\\frac12$, $\\cos(\\pi/6)=\\frac{\\sqrt3}{2}$.", explanation: "$2\\times\\frac12\\times\\frac{\\sqrt3}{2}=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucv-p16", prompt: "Evaluate using $\\tan\\theta=\\sin\\theta/\\cos\\theta$.", latex: "\\tan\\left(\\frac{\\pi}{6}\\right)", answer: "sqrt(3)/3", difficulty: 4, acceptedAnswers: ["1/sqrt(3)", "\\sqrt{3}/3", "1/√3"], hint: "$\\frac{1/2}{\\sqrt3/2}$ then rationalise.", explanation: "$\\tan(\\pi/6)=\\frac{1}{\\sqrt3}=\\frac{\\sqrt3}{3}$." },
        { id: "y11adv-ucv-p17", prompt: "Evaluate using $\\tan\\theta=\\sin\\theta/\\cos\\theta$.", latex: "\\tan\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)", difficulty: 4, acceptedAnswers: ["\\sqrt{3}", "√3"], hint: "$\\frac{\\sqrt3/2}{1/2}$.", explanation: "$\\tan(\\pi/3)=\\sqrt3$." },
        { id: "y11adv-ucv-p18", prompt: "Evaluate without a calculator.", latex: "\\sin^2\\!\\left(\\frac{\\pi}{4}\\right)+\\cos^2\\!\\left(\\frac{\\pi}{4}\\right)", answer: "1", difficulty: 5, hint: "Pythagorean identity.", explanation: "$\\left(\\frac{\\sqrt2}{2}\\right)^2+\\left(\\frac{\\sqrt2}{2}\\right)^2=\\frac12+\\frac12=1$." },
        { id: "y11adv-ucv-p19", prompt: "The unit-circle point at $\\theta=\\frac{\\pi}{3}$ has its x and y coordinates multiplied. Find the product.", latex: "\\cos\\!\\left(\\frac{\\pi}{3}\\right)\\sin\\!\\left(\\frac{\\pi}{3}\\right)", answer: "sqrt(3)/4", difficulty: 5, acceptedAnswers: ["\\sqrt{3}/4", "√3/4"], hint: "$\\frac12\\times\\frac{\\sqrt3}{2}$.", explanation: "$\\frac12\\times\\frac{\\sqrt3}{2}=\\frac{\\sqrt3}{4}$." },
        { id: "y11adv-ucv-p20", prompt: "Evaluate without a calculator.", latex: "\\cos^2\\!\\left(\\frac{\\pi}{6}\\right)-\\sin^2\\!\\left(\\frac{\\pi}{6}\\right)", answer: "1/2", difficulty: 5, acceptedAnswers: ["0.5"], hint: "$\\left(\\frac{\\sqrt3}{2}\\right)^2-\\left(\\frac12\\right)^2$.", explanation: "$\\frac34-\\frac14=\\frac12$." },
        { id: "y11adv-ucv-p21", prompt: "Find the distance from the origin to the unit-circle point at $\\theta=\\frac{\\pi}{3}$.", latex: "\\theta=\\frac{\\pi}{3}", answer: "1", difficulty: 5, hint: "Every point on the unit circle is distance 1 from the centre.", explanation: "All unit-circle points are at distance 1 from the origin." },
        { id: "y11adv-ucv-p22", prompt: "Evaluate without a calculator.", latex: "\\sin\\!\\left(\\frac{\\pi}{6}\\right)+\\cos\\!\\left(\\frac{\\pi}{3}\\right)+\\cos 0", answer: "2", difficulty: 5, hint: "$\\frac12+\\frac12+1$.", explanation: "$\\frac12+\\frac12+1=2$." },
        { id: "y11adv-ucv-p23", prompt: "Which is the unit-circle point at $\\theta=\\frac{\\pi}{2}$?", latex: "\\theta=\\frac{\\pi}{2}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$(0,1)$" }, { label: "B", text: "$(1,0)$" }, { label: "C", text: "$(-1,0)$" }, { label: "D", text: "$(0,-1)$" }], hint: "Top of the circle.", explanation: "At $\\pi/2$ the point is $(0,1)$." },
        { id: "y11adv-ucv-p24", prompt: "Evaluate using the unit circle.", latex: "\\sin\\pi", answer: "0", difficulty: 2, hint: "Leftmost point y-coordinate.", explanation: "$\\sin\\pi=0$." },
        { id: "y11adv-ucv-p25", prompt: "Which is the unit-circle point at $\\theta=\\frac{\\pi}{3}$?", latex: "\\theta=\\frac{\\pi}{3}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$\\left(\\frac{\\sqrt3}{2},\\frac12\\right)$" }, { label: "B", text: "$\\left(\\frac{\\sqrt2}{2},\\frac{\\sqrt2}{2}\\right)$" }, { label: "C", text: "$(0,1)$" }, { label: "D", text: "$\\left(\\frac12,\\frac{\\sqrt3}{2}\\right)$" }], hint: "x is cosine, y is sine.", explanation: "At $\\pi/3$: $(\\frac12,\\frac{\\sqrt3}{2})$." },
        { id: "y11adv-ucv-p26", prompt: "Evaluate.", latex: "\\cos\\frac{3\\pi}{2}", answer: "0", difficulty: 3, hint: "Bottom point $(0,-1)$ x-coordinate.", explanation: "$\\cos\\frac{3\\pi}{2}=0$." },
        { id: "y11adv-ucv-p27", prompt: "A student says the point at $\\theta=\\frac{\\pi}{4}$ is $(\\frac12,\\frac12)$. Identify the error.", latex: "\\theta=\\frac{\\pi}{4}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Both coordinates should be $\\frac{\\sqrt3}{2}$" }, { label: "B", text: "Both coordinates are $\\frac{\\sqrt2}{2}$, not $\\frac12$" }, { label: "C", text: "The point is $(1,1)$" }, { label: "D", text: "The point is correct" }], hint: "$\\cos(\\pi/4)=\\sin(\\pi/4)=\\frac{\\sqrt2}{2}$.", explanation: "At $\\pi/4$ both coordinates are $\\frac{\\sqrt2}{2}\\approx0.71$, not $\\frac12$." },
        { id: "y11adv-ucv-p28", prompt: "Evaluate without a calculator.", latex: "4\\sin\\!\\left(\\frac{\\pi}{6}\\right)\\cos 0", answer: "2", difficulty: 4, hint: "$\\sin(\\pi/6)=\\frac12$, $\\cos 0=1$.", explanation: "$4\\times\\frac12\\times1=2$." },
        { id: "y11adv-ucv-p29", prompt: "Evaluate using the unit circle.", latex: "\\sin\\!\\left(\\frac{\\pi}{4}\\right)", answer: "sqrt(2)/2", difficulty: 2, acceptedAnswers: ["\\sqrt{2}/2", "√2/2", "1/sqrt(2)"], hint: "y-coordinate at $\\pi/4$.", explanation: "$\\sin(\\pi/4)=\\frac{\\sqrt2}{2}$." },
        { id: "y11adv-ucv-p30", prompt: "Evaluate without a calculator.", latex: "\\cos\\!\\left(\\frac{\\pi}{3}\\right)+\\sin\\!\\left(\\frac{\\pi}{2}\\right)", answer: "3/2", difficulty: 4, acceptedAnswers: ["1.5"], hint: "$\\frac12+1$.", explanation: "$\\frac12+1=\\frac32$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-ucv-mp1",
          prompt: "Consider the unit-circle point at $\\theta=\\frac{\\pi}{3}$.",
          latex: "\\theta=\\frac{\\pi}{3}",
          answer: "1/2",
          hint: "(a) The x-coordinate is $\\cos\\theta$. (b) The y-coordinate is $\\sin\\theta$. (c) Tangent is $\\frac{\\sin\\theta}{\\cos\\theta}$.",
          explanation: "(a) $\\cos(\\pi/3)=\\frac12$. (b) $\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$. (c) $\\tan(\\pi/3)=\\sqrt3$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the x-coordinate of the point.", latex: "\\cos\\left(\\frac{\\pi}{3}\\right)", marks: 1, answer: "1/2", acceptedAnswers: ["0.5"], hint: "x-coordinate is cosine.", explanation: "$\\cos(\\pi/3)=\\frac12$." },
            { key: "b", label: "(b)", prompt: "Find the y-coordinate of the point.", latex: "\\sin\\left(\\frac{\\pi}{3}\\right)", marks: 1, answer: "sqrt(3)/2", acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "y-coordinate is sine.", explanation: "$\\sin(\\pi/3)=\\frac{\\sqrt3}{2}$." },
            { key: "c", label: "(c)", prompt: "Find $\\tan\\left(\\frac{\\pi}{3}\\right)$ using $\\frac{y}{x}$.", latex: "\\tan\\left(\\frac{\\pi}{3}\\right)=\\frac{y}{x}", marks: 2, answer: "sqrt(3)", acceptedAnswers: ["\\sqrt{3}", "√3"], hint: "Divide the y-coordinate by the x-coordinate.", explanation: "$\\tan(\\pi/3)=\\frac{\\sqrt3/2}{1/2}=\\sqrt3$." },
          ],
        },
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
        {
          ...formulaAnswer("y11adv-ucq-m1", "Evaluate using a reference angle.", "\\sin\\left(\\frac{2\\pi}{3}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          hint: "Reference angle of 2π/3 is π/3. Sine is positive in Q2.",
        },
        {
          ...formulaAnswer("y11adv-ucq-m2", "Evaluate using a reference angle.", "\\cos\\left(\\frac{5\\pi}{6}\\right)", "-sqrt(3)/2", ["-\\sqrt{3}/2", "-(√3)/2"]),
          unitCircleDiagram: ucqQ2a,
          hint: "Reference angle of 5π/6 is π/6. Cosine is negative in Q2.",
        },
        {
          ...formulaAnswer("y11adv-ucq-m3", "Find the reference angle.", "\\frac{5\\pi}{4}", "pi/4", ["\\pi/4", "π/4"]),
          unitCircleDiagram: ucqQ3d,
          hint: "5π/4 is in Q3. Reference angle = 5π/4 − π.",
        },
        {
          ...formulaAnswer("y11adv-ucq-m4", "Evaluate using a reference angle.", "\\tan\\left(\\frac{5\\pi}{4}\\right)", "1", []),
          hint: "Reference angle of 5π/4 is π/4. tan(π/4) = 1. Tangent is positive in Q3.",
        },
        {
          ...formulaAnswer("y11adv-ucq-m5", "Evaluate using a reference angle.", "\\cos\\left(\\frac{11\\pi}{6}\\right)", "sqrt(3)/2", ["\\sqrt{3}/2", "√3/2"]),
          hint: "Reference angle of 11π/6 is 2π − 11π/6 = π/6. Cosine is positive in Q4.",
        },
        {
          ...formulaAnswer("y11adv-ucq-m6", "Evaluate using a reference angle.", "\\sin\\left(\\frac{4\\pi}{3}\\right)", "-sqrt(3)/2", ["-\\sqrt{3}/2", "-(√3)/2"]),
          hint: "Reference angle of 4π/3 is π/3. Sine is negative in Q3.",
        },
        {
          ...formulaAnswer("y11adv-ucq-m7", "Evaluate using a reference angle.", "\\tan\\left(\\frac{2\\pi}{3}\\right)", "-sqrt(3)", ["-\\sqrt{3}", "-√3"]),
          hint: "Reference angle of 2π/3 is π/3. tan(π/3) = √3. Tangent is negative in Q2.",
        },
        practicalChoice(
          "y11adv-ucq-m8",
          "Why is $\\tan\\!\\left(\\frac{7\\pi}{6}\\right)$ positive?",
          "B",
          [
            "In Q3 tangent is always negative",
            "In Q3 both sin and cos are negative, so their ratio is positive",
            "$\\frac{7\\pi}{6}$ is in Q2 where tangent is positive",
            "$\\tan\\!\\left(\\frac{7\\pi}{6}\\right)=1$",
          ],
          "ASTC: in Q3 only tangent is positive. Because sin < 0 and cos < 0, their ratio sin/cos is (−)/(−) = positive.",
          "\\tan\\left(\\frac{7\\pi}{6}\\right)"
        ),
        {
          ...formulaAnswer("y11adv-ucq-m9", "Evaluate using a reference angle.", "\\sin\\left(\\frac{5\\pi}{3}\\right)", "-sqrt(3)/2", ["-\\sqrt{3}/2", "-(√3)/2"]),
          hint: "Reference angle of 5π/3 is 2π − 5π/3 = π/3. Sine is negative in Q4.",
        },
        {
          ...formulaAnswer("y11adv-ucq-m10", "Evaluate using the related-angle rule $\\sin(\\pi+\\theta)=-\\sin\\theta$.", "\\sin\\!\\left(\\pi+\\frac{\\pi}{6}\\right)", "-1/2", ["-0.5"]),
          hint: "sin(π + π/6) = −sin(π/6) = −(1/2) = −1/2. The rule adds a negative sign for Q3 angles.",
        },
      ],
      masteryQuizPool: [
        { id: "y11adv-ucq-p1", prompt: "Find the reference angle.", latex: "\\frac{5\\pi}{6}", answer: "pi/6", difficulty: 1, acceptedAnswers: ["\\pi/6", "π/6"], hint: "In Q2, reference $=\\pi-\\theta$.", explanation: "$\\pi-\\frac{5\\pi}{6}=\\frac{\\pi}{6}$." },
        { id: "y11adv-ucq-p2", prompt: "Find the reference angle.", latex: "\\frac{4\\pi}{3}", answer: "pi/3", difficulty: 1, acceptedAnswers: ["\\pi/3", "π/3"], hint: "In Q3, reference $=\\theta-\\pi$.", explanation: "$\\frac{4\\pi}{3}-\\pi=\\frac{\\pi}{3}$." },
        { id: "y11adv-ucq-p3", prompt: "Find the reference angle.", latex: "\\frac{7\\pi}{4}", answer: "pi/4", difficulty: 1, acceptedAnswers: ["\\pi/4", "π/4"], hint: "In Q4, reference $=2\\pi-\\theta$.", explanation: "$2\\pi-\\frac{7\\pi}{4}=\\frac{\\pi}{4}$." },
        { id: "y11adv-ucq-p4", prompt: "In which quadrant is sine positive but cosine negative?", latex: "\\text{ASTC}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "ASTC: S in Q2.", explanation: "In Q2 sine is positive and cosine is negative." },
        { id: "y11adv-ucq-p5", prompt: "Evaluate using a reference angle.", latex: "\\sin\\left(\\frac{2\\pi}{3}\\right)", answer: "sqrt(3)/2", difficulty: 2, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "Reference $\\pi/3$; sine positive in Q2.", explanation: "$\\sin(2\\pi/3)=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucq-p6", prompt: "Evaluate using a reference angle.", latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)", answer: "-sqrt(3)/2", difficulty: 2, acceptedAnswers: ["-\\sqrt{3}/2", "−sqrt(3)/2", "-√3/2"], hint: "Reference $\\pi/6$; cosine negative in Q2.", explanation: "$\\cos(5\\pi/6)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucq-p7", prompt: "Evaluate using a reference angle.", latex: "\\sin\\left(\\frac{7\\pi}{6}\\right)", answer: "-1/2", difficulty: 2, acceptedAnswers: ["-0.5", "−1/2"], hint: "Reference $\\pi/6$; sine negative in Q3.", explanation: "$\\sin(7\\pi/6)=-\\frac12$." },
        { id: "y11adv-ucq-p8", prompt: "Evaluate using a reference angle.", latex: "\\cos\\left(\\frac{4\\pi}{3}\\right)", answer: "-1/2", difficulty: 2, acceptedAnswers: ["-0.5", "−1/2"], hint: "Reference $\\pi/3$; cosine negative in Q3.", explanation: "$\\cos(4\\pi/3)=-\\frac12$." },
        { id: "y11adv-ucq-p9", prompt: "Evaluate using a reference angle.", latex: "\\cos\\left(\\frac{11\\pi}{6}\\right)", answer: "sqrt(3)/2", difficulty: 3, acceptedAnswers: ["\\sqrt{3}/2", "√3/2"], hint: "Reference $\\pi/6$; cosine positive in Q4.", explanation: "$\\cos(11\\pi/6)=\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucq-p10", prompt: "Evaluate using a reference angle.", latex: "\\sin\\left(\\frac{4\\pi}{3}\\right)", answer: "-sqrt(3)/2", difficulty: 3, acceptedAnswers: ["-\\sqrt{3}/2", "−sqrt(3)/2", "-√3/2"], hint: "Reference $\\pi/3$; sine negative in Q3.", explanation: "$\\sin(4\\pi/3)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucq-p11", prompt: "Evaluate using a reference angle.", latex: "\\tan\\left(\\frac{5\\pi}{4}\\right)", answer: "1", difficulty: 3, hint: "Reference $\\pi/4$; tangent positive in Q3.", explanation: "$\\tan(5\\pi/4)=1$." },
        { id: "y11adv-ucq-p12", prompt: "Evaluate using a reference angle.", latex: "\\tan\\left(\\frac{2\\pi}{3}\\right)", answer: "-sqrt(3)", difficulty: 3, acceptedAnswers: ["-\\sqrt{3}", "−sqrt(3)", "-√3"], hint: "Reference $\\pi/3$; tangent negative in Q2.", explanation: "$\\tan(2\\pi/3)=-\\sqrt3$." },
        { id: "y11adv-ucq-p13", prompt: "Evaluate using a reference angle.", latex: "\\sin\\left(\\frac{5\\pi}{3}\\right)", answer: "-sqrt(3)/2", difficulty: 3, acceptedAnswers: ["-\\sqrt{3}/2", "−sqrt(3)/2", "-√3/2"], hint: "Reference $\\pi/3$; sine negative in Q4.", explanation: "$\\sin(5\\pi/3)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucq-p14", prompt: "Why is $\\tan(\\frac{7\\pi}{6})$ positive?", latex: "\\tan\\left(\\frac{7\\pi}{6}\\right)", answer: "B", difficulty: 4, choices: [{ label: "A", text: "In Q3 tangent is always negative" }, { label: "B", text: "In Q3 both sin and cos are negative, so their ratio is positive" }, { label: "C", text: "$\\frac{7\\pi}{6}$ is in Q2" }, { label: "D", text: "$\\tan(\\frac{7\\pi}{6})=1$" }], hint: "ASTC: T in Q3.", explanation: "In Q3, $\\sin<0$ and $\\cos<0$, so $\\frac{\\sin}{\\cos}>0$." },
        { id: "y11adv-ucq-p15", prompt: "Evaluate using a reference angle.", latex: "\\cos\\left(\\frac{2\\pi}{3}\\right)", answer: "-1/2", difficulty: 4, acceptedAnswers: ["-0.5", "−1/2"], hint: "Reference $\\pi/3$; cosine negative in Q2.", explanation: "$\\cos(2\\pi/3)=-\\frac12$." },
        { id: "y11adv-ucq-p16", prompt: "Evaluate using a reference angle.", latex: "\\tan\\left(\\frac{7\\pi}{6}\\right)", answer: "sqrt(3)/3", difficulty: 4, acceptedAnswers: ["\\sqrt{3}/3", "1/sqrt(3)", "√3/3"], hint: "Reference $\\pi/6$; tangent positive in Q3.", explanation: "$\\tan(7\\pi/6)=\\tan(\\pi/6)=\\frac{\\sqrt3}{3}$." },
        { id: "y11adv-ucq-p17", prompt: "Evaluate using a reference angle.", latex: "\\cos\\left(\\frac{7\\pi}{4}\\right)", answer: "sqrt(2)/2", difficulty: 4, acceptedAnswers: ["\\sqrt{2}/2", "√2/2", "1/sqrt(2)"], hint: "Reference $\\pi/4$; cosine positive in Q4.", explanation: "$\\cos(7\\pi/4)=\\frac{\\sqrt2}{2}$." },
        { id: "y11adv-ucq-p18", prompt: "Using $\\sin(\\pi+\\theta)=-\\sin\\theta$, evaluate.", latex: "\\sin\\!\\left(\\pi+\\frac{\\pi}{6}\\right)", answer: "-1/2", difficulty: 5, acceptedAnswers: ["-0.5", "−1/2"], hint: "$-\\sin(\\pi/6)$.", explanation: "$\\sin(\\pi+\\pi/6)=-\\sin(\\pi/6)=-\\frac12$." },
        { id: "y11adv-ucq-p19", prompt: "Evaluate.", latex: "\\sin\\!\\left(\\frac{2\\pi}{3}\\right)+\\cos\\!\\left(\\frac{4\\pi}{3}\\right)", answer: "(sqrt(3)-1)/2", difficulty: 5, acceptedAnswers: ["sqrt(3)/2-1/2", "(\\sqrt3-1)/2"], hint: "$\\frac{\\sqrt3}{2}+\\left(-\\frac12\\right)$.", explanation: "$\\frac{\\sqrt3}{2}-\\frac12=\\frac{\\sqrt3-1}{2}$." },
        { id: "y11adv-ucq-p20", prompt: "Evaluate.", latex: "\\tan\\!\\left(\\frac{2\\pi}{3}\\right)\\times\\tan\\!\\left(\\frac{5\\pi}{4}\\right)", answer: "-sqrt(3)", difficulty: 5, acceptedAnswers: ["-\\sqrt{3}", "−sqrt(3)", "-√3"], hint: "$\\tan(2\\pi/3)=-\\sqrt3$, $\\tan(5\\pi/4)=1$.", explanation: "$-\\sqrt3\\times1=-\\sqrt3$." },
        { id: "y11adv-ucq-p21", prompt: "Evaluate.", latex: "\\sin^2\\!\\left(\\frac{4\\pi}{3}\\right)+\\cos^2\\!\\left(\\frac{4\\pi}{3}\\right)", answer: "1", difficulty: 5, hint: "Pythagorean identity holds for any angle.", explanation: "$\\sin^2\\theta+\\cos^2\\theta=1$ for all $\\theta$, so the value is 1." },
        { id: "y11adv-ucq-p22", prompt: "If $\\theta$ is in Q3 with reference angle $\\frac{\\pi}{6}$, find $\\cos\\theta$.", latex: "\\text{Q3, reference }\\frac{\\pi}{6}", answer: "-sqrt(3)/2", difficulty: 5, acceptedAnswers: ["-\\sqrt{3}/2", "−sqrt(3)/2", "-√3/2"], hint: "Cosine negative in Q3; $|\\cos(\\pi/6)|=\\frac{\\sqrt3}{2}$.", explanation: "$\\cos\\theta=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucq-p23", prompt: "Find the reference angle.", latex: "\\frac{5\\pi}{3}", answer: "pi/3", difficulty: 2, acceptedAnswers: ["\\pi/3", "π/3"], hint: "In Q4, reference $=2\\pi-\\theta$.", explanation: "$2\\pi-\\frac{5\\pi}{3}=\\frac{\\pi}{3}$." },
        { id: "y11adv-ucq-p24", prompt: "Evaluate using a reference angle.", latex: "\\sin\\left(\\frac{5\\pi}{6}\\right)", answer: "1/2", difficulty: 2, acceptedAnswers: ["0.5"], hint: "Reference $\\pi/6$; sine positive in Q2.", explanation: "$\\sin(5\\pi/6)=\\frac12$." },
        { id: "y11adv-ucq-p25", prompt: "In which quadrant is only cosine positive?", latex: "\\text{ASTC}", answer: "D", difficulty: 2, choices: [{ label: "A", text: "Quadrant I" }, { label: "B", text: "Quadrant II" }, { label: "C", text: "Quadrant III" }, { label: "D", text: "Quadrant IV" }], hint: "ASTC: C in Q4.", explanation: "In Q4 only cosine is positive." },
        { id: "y11adv-ucq-p26", prompt: "Find the reference angle.", latex: "\\frac{11\\pi}{6}", answer: "pi/6", difficulty: 3, acceptedAnswers: ["\\pi/6", "π/6"], hint: "In Q4, reference $=2\\pi-\\theta$.", explanation: "$2\\pi-\\frac{11\\pi}{6}=\\frac{\\pi}{6}$." },
        { id: "y11adv-ucq-p27", prompt: "A student says $\\cos(\\frac{5\\pi}{6})=\\frac{\\sqrt3}{2}$. Identify the error.", latex: "\\cos\\left(\\frac{5\\pi}{6}\\right)", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Reference angle is wrong" }, { label: "B", text: "Cosine is undefined here" }, { label: "C", text: "Cosine is negative in Q2, so $\\cos(\\frac{5\\pi}{6})=-\\frac{\\sqrt3}{2}$" }, { label: "D", text: "The answer is correct" }], hint: "Apply the Q2 sign.", explanation: "In Q2 cosine is negative: $\\cos(5\\pi/6)=-\\frac{\\sqrt3}{2}$." },
        { id: "y11adv-ucq-p28", prompt: "Evaluate using a reference angle.", latex: "\\tan\\left(\\frac{4\\pi}{3}\\right)", answer: "sqrt(3)", difficulty: 4, acceptedAnswers: ["\\sqrt{3}", "√3"], hint: "Reference $\\pi/3$; tangent positive in Q3.", explanation: "$\\tan(4\\pi/3)=\\tan(\\pi/3)=\\sqrt3$." },
        { id: "y11adv-ucq-p29", prompt: "Evaluate using a reference angle.", latex: "\\sin\\left(\\frac{11\\pi}{6}\\right)", answer: "-1/2", difficulty: 3, acceptedAnswers: ["-0.5", "−1/2"], hint: "Reference $\\pi/6$; sine negative in Q4.", explanation: "$\\sin(11\\pi/6)=-\\frac12$." },
        { id: "y11adv-ucq-p30", prompt: "Using $\\cos(\\pi-\\theta)=-\\cos\\theta$, evaluate.", latex: "\\cos\\!\\left(\\pi-\\frac{\\pi}{3}\\right)", answer: "-1/2", difficulty: 4, acceptedAnswers: ["-0.5", "−1/2"], hint: "$-\\cos(\\pi/3)$.", explanation: "$\\cos(\\pi-\\pi/3)=-\\cos(\\pi/3)=-\\frac12$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-ucq-mp1",
          prompt: "Consider the angle $\\theta=\\frac{4\\pi}{3}$.",
          latex: "\\theta=\\frac{4\\pi}{3}",
          answer: "pi/3",
          hint: "(a) Find the reference angle. (b) Apply the Q3 sign to sine. (c) Apply the Q3 sign to cosine.",
          explanation: "(a) reference $=\\frac{4\\pi}{3}-\\pi=\\frac{\\pi}{3}$. (b) $\\sin(4\\pi/3)=-\\frac{\\sqrt3}{2}$. (c) $\\cos(4\\pi/3)=-\\frac12$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the reference angle.", latex: "\\theta-\\pi", marks: 1, answer: "pi/3", acceptedAnswers: ["\\pi/3", "π/3"], hint: "In Q3, reference $=\\theta-\\pi$.", explanation: "$\\frac{4\\pi}{3}-\\pi=\\frac{\\pi}{3}$." },
            { key: "b", label: "(b)", prompt: "Find $\\sin\\left(\\frac{4\\pi}{3}\\right)$.", latex: "\\sin\\left(\\frac{4\\pi}{3}\\right)", marks: 2, answer: "-sqrt(3)/2", acceptedAnswers: ["-\\sqrt{3}/2", "−sqrt(3)/2", "-√3/2"], hint: "Sine is negative in Q3.", explanation: "$\\sin(4\\pi/3)=-\\sin(\\pi/3)=-\\frac{\\sqrt3}{2}$." },
            { key: "c", label: "(c)", prompt: "Find $\\cos\\left(\\frac{4\\pi}{3}\\right)$.", latex: "\\cos\\left(\\frac{4\\pi}{3}\\right)", marks: 1, answer: "-1/2", acceptedAnswers: ["-0.5", "−1/2"], hint: "Cosine is negative in Q3.", explanation: "$\\cos(4\\pi/3)=-\\cos(\\pi/3)=-\\frac12$." },
          ],
        },
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
    const m4Graph: import("../types").CartesianGraph = {
      description:
        "y = 2 sin(πx) on [0, 2] — one full period. b = π gives period 2π/π = 2.",
      xMin: 0, xMax: 2, yMin: -2.5, yMax: 2.5,
      xStep: 0.5, yStep: 1,
      sinusoidals: [
        { kind: "sin", a: 2, b: Math.PI, c: 0, d: 0, label: "y = 2sin(πx)", description: "Period 2: one complete wave from x = 0 to x = 2." },
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
        {
          ...formulaAnswer("y11adv-amp-m1", "State the period.", "y=\\sin(2x)", "pi", ["\\pi", "π"]),
          hint: "Period = 2π/b.",
        },
        {
          ...formulaAnswer("y11adv-amp-m2", "State the amplitude.", "y=7\\cos x", "7", []),
          hint: "Amplitude = |a|.",
        },
        {
          ...formulaAnswer("y11adv-amp-m3", "State the period.", "y=4\\sin(3x)", "2pi/3", ["2\\pi/3", "2π/3"]),
          hint: "Period = 2π/3.",
        },
        {
          ...formulaAnswer("y11adv-amp-m4", "The graph shows y = 2sin(πx). State the period.", "y=2\\sin(\\pi x)", "2", []),
          cartesianGraph: m4Graph,
          hint: "b = π. Period = 2π/π.",
        },
        {
          ...formulaAnswer("y11adv-amp-m5", "State the maximum value.", "y=5\\cos x", "5", []),
          hint: "Maximum = d + |a| = 0 + 5.",
        },
        {
          ...formulaAnswer("y11adv-amp-m6", "State the minimum value.", "y=-3\\sin(2x)", "-3", []),
          hint: "Minimum = d − |a| = 0 − 3.",
        },
        practicalChoice(
          "y11adv-amp-m7",
          "Which is the range of $y=4\\cos x$?",
          "D",
          ["$(0,4]$", "$[-1,1]$", "$[0,4]$", "$[-4,4]$"],
          "Amplitude = 4, so range = [−4, 4].",
          "y=4\\cos x"
        ),
        practicalChoice(
          "y11adv-amp-m8",
          "A student doubles $b$ and says the period doubles. Identify the error.",
          "A",
          ["Period halves when $b$ doubles: period $=2\\pi/b$", "The student is correct — period doubles", "Period is unaffected by $b$", "Period doubles only for cosine, not sine"],
          "Period = 2π/b. Doubling b halves the period, not doubles it.",
          "y=\\sin(bx)"
        ),
        {
          ...formulaAnswer("y11adv-amp-m9", "y = a sin(bx) has amplitude 2 and period π. Find b.", "\\text{amplitude }2,\\text{ period }\\pi", "2", []),
          hint: "Period = 2π/b = π. Solve for b.",
        },
        {
          ...formulaAnswer("y11adv-amp-m10", "State the period.", "y=3\\sin\\!\\left(\\frac{\\pi x}{2}\\right)", "4", []),
          hint: "b = π/2. Period = 2π ÷ (π/2) = 4.",
        },
      ],
      masteryQuizPool: [
        { id: "y11adv-amp-p1", prompt: "State the amplitude.", latex: "y=4\\cos x", answer: "4", difficulty: 1, hint: "Amplitude $=|a|$.", explanation: "$|4|=4$." },
        { id: "y11adv-amp-p2", prompt: "State the period.", latex: "y=\\sin(2x)", answer: "pi", difficulty: 1, acceptedAnswers: ["\\pi", "π"], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "$b=2$, period $=\\pi$." },
        { id: "y11adv-amp-p3", prompt: "State the amplitude.", latex: "y=7\\cos x", answer: "7", difficulty: 1, hint: "Amplitude $=|a|$.", explanation: "$|7|=7$." },
        { id: "y11adv-amp-p4", prompt: "State the period.", latex: "y=\\sin(3x)", answer: "2pi/3", difficulty: 1, acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "$b=3$, period $=\\frac{2\\pi}{3}$." },
        { id: "y11adv-amp-p5", prompt: "State the amplitude.", latex: "y=-3\\sin x", answer: "3", difficulty: 2, hint: "Amplitude $=|a|$.", explanation: "$|-3|=3$." },
        { id: "y11adv-amp-p6", prompt: "State the period.", latex: "y=\\cos(2x)", answer: "pi", difficulty: 2, acceptedAnswers: ["\\pi", "π"], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "$b=2$, period $=\\pi$." },
        { id: "y11adv-amp-p7", prompt: "State the maximum value.", latex: "y=5\\cos x", answer: "5", difficulty: 2, hint: "Max $=|a|$ (with $d=0$).", explanation: "Max $=5$." },
        { id: "y11adv-amp-p8", prompt: "State the minimum value.", latex: "y=-3\\sin(2x)", answer: "-3", difficulty: 2, acceptedAnswers: ["−3"], hint: "Min $=-|a|$ (with $d=0$).", explanation: "Min $=-3$." },
        { id: "y11adv-amp-p9", prompt: "State the period.", latex: "y=2\\sin(\\pi x)", answer: "2", difficulty: 3, hint: "$b=\\pi$; period $=\\frac{2\\pi}{\\pi}$.", explanation: "Period $=\\frac{2\\pi}{\\pi}=2$." },
        { id: "y11adv-amp-p10", prompt: "State the amplitude.", latex: "y=-5\\cos(3x)", answer: "5", difficulty: 3, hint: "Amplitude $=|a|$.", explanation: "$|-5|=5$." },
        { id: "y11adv-amp-p11", prompt: "State the period.", latex: "y=3\\sin\\!\\left(\\frac{\\pi x}{2}\\right)", answer: "4", difficulty: 3, hint: "$b=\\frac{\\pi}{2}$; period $=\\frac{2\\pi}{\\pi/2}$.", explanation: "Period $=2\\pi\\div\\frac{\\pi}{2}=4$." },
        { id: "y11adv-amp-p12", prompt: "Which is the range of $y=4\\cos x$?", latex: "y=4\\cos x", answer: "D", difficulty: 3, choices: [{ label: "A", text: "$(0,4]$" }, { label: "B", text: "$[-1,1]$" }, { label: "C", text: "$[0,4]$" }, { label: "D", text: "$[-4,4]$" }], hint: "Amplitude 4.", explanation: "Range $=[-4,4]$." },
        { id: "y11adv-amp-p13", prompt: "A student doubles $b$ and says the period doubles. Identify the error.", latex: "y=\\sin(bx)", answer: "A", difficulty: 4, choices: [{ label: "A", text: "Period halves when $b$ doubles: period $=\\frac{2\\pi}{b}$" }, { label: "B", text: "The student is correct" }, { label: "C", text: "Period is unaffected by $b$" }, { label: "D", text: "Period doubles only for cosine" }], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "Doubling $b$ halves the period." },
        { id: "y11adv-amp-p14", prompt: "$y=a\\sin(bx)$ has amplitude 2 and period $\\pi$. Find $b$.", latex: "\\text{amplitude }2,\\text{ period }\\pi", answer: "2", difficulty: 4, hint: "Period $=\\frac{2\\pi}{b}=\\pi$.", explanation: "$\\frac{2\\pi}{b}=\\pi$ gives $b=2$." },
        { id: "y11adv-amp-p15", prompt: "State the maximum value.", latex: "y=6\\sin(2x)", answer: "6", difficulty: 4, hint: "Max $=|a|$ with $d=0$.", explanation: "Max $=6$." },
        { id: "y11adv-amp-p16", prompt: "State the minimum value.", latex: "y=-7\\cos(3x)", answer: "-7", difficulty: 4, acceptedAnswers: ["−7"], hint: "Amplitude 7, so min $=-7$.", explanation: "Min $=-|a|=-7$." },
        { id: "y11adv-amp-p17", prompt: "State the period.", latex: "y=4\\cos\\!\\left(\\frac{x}{2}\\right)", answer: "4pi", difficulty: 4, acceptedAnswers: ["4\\pi", "4π"], hint: "$b=\\frac12$; period $=\\frac{2\\pi}{1/2}$.", explanation: "Period $=2\\pi\\div\\frac12=4\\pi$." },
        { id: "y11adv-amp-p18", prompt: "$y=a\\cos(bx)$ has amplitude 3 and period $\\frac{2\\pi}{5}$. Find $a\\times b$ (with $a>0$).", latex: "\\text{amplitude }3,\\text{ period }\\frac{2\\pi}{5}", answer: "15", difficulty: 5, hint: "$a=3$; $\\frac{2\\pi}{b}=\\frac{2\\pi}{5}$ gives $b=5$.", explanation: "$a=3$, $b=5$, so $a\\times b=15$." },
        { id: "y11adv-amp-p19", prompt: "$y=2\\sin(bx)$ completes 3 full cycles on $[0,2\\pi]$. Find $b$.", latex: "y=2\\sin(bx)", answer: "3", difficulty: 5, hint: "3 cycles on $2\\pi$ means period $=\\frac{2\\pi}{3}$.", explanation: "Period $=\\frac{2\\pi}{3}=\\frac{2\\pi}{b}$ gives $b=3$." },
        { id: "y11adv-amp-p20", prompt: "A wave $y=a\\sin(2x)$ has range $[-5,5]$. Find $a$ (with $a>0$).", latex: "\\text{range }[-5,5]", answer: "5", difficulty: 5, hint: "Amplitude equals the half-range.", explanation: "Range $[-5,5]$ means amplitude 5, so $a=5$." },
        { id: "y11adv-amp-p21", prompt: "The period of $y=\\sin(bx)$ is 6. Find $b$.", latex: "\\text{period }6", answer: "pi/3", difficulty: 5, acceptedAnswers: ["\\pi/3", "π/3"], hint: "$\\frac{2\\pi}{b}=6$.", explanation: "$b=\\frac{2\\pi}{6}=\\frac{\\pi}{3}$." },
        { id: "y11adv-amp-p22", prompt: "$y=a\\cos(bx)$ has amplitude 4 and a maximum at $y=4$ first reached at $x=0$, with period $\\pi$. Find $a+b$ (with $a>0$).", latex: "\\text{amplitude }4,\\text{ period }\\pi", answer: "6", difficulty: 5, hint: "$a=4$; period $\\pi$ gives $b=2$.", explanation: "$a=4$, $b=2$, so $a+b=6$." },
        { id: "y11adv-amp-p23", prompt: "State the amplitude.", latex: "y=2\\sin x", answer: "2", difficulty: 1, hint: "Amplitude $=|a|$.", explanation: "$|2|=2$." },
        { id: "y11adv-amp-p24", prompt: "State the period.", latex: "y=\\cos(4x)", answer: "pi/2", difficulty: 3, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Period $=\\frac{2\\pi}{4}$.", explanation: "Period $=\\frac{\\pi}{2}$." },
        { id: "y11adv-amp-p25", prompt: "Which is the range of $y=-2\\sin x$?", latex: "y=-2\\sin x", answer: "C", difficulty: 3, choices: [{ label: "A", text: "$[0,2]$" }, { label: "B", text: "$[-1,1]$" }, { label: "C", text: "$[-2,2]$" }, { label: "D", text: "$[2,-2]$" }], hint: "Amplitude $=|-2|=2$.", explanation: "Range $=[-2,2]$ (the reflection does not change the range)." },
        { id: "y11adv-amp-p26", prompt: "State the maximum value.", latex: "y=3\\cos x", answer: "3", difficulty: 2, hint: "Max $=|a|$ with $d=0$.", explanation: "Max $=3$." },
        { id: "y11adv-amp-p27", prompt: "A student says the amplitude of $y=-5\\cos x$ is $-5$. Identify the error.", latex: "y=-5\\cos x", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Amplitude is the period" }, { label: "B", text: "Amplitude is $|a|=5$, always non-negative" }, { label: "C", text: "Amplitude is $-1$" }, { label: "D", text: "The student is correct" }], hint: "Amplitude is an absolute value.", explanation: "Amplitude $=|-5|=5$, not $-5$." },
        { id: "y11adv-amp-p28", prompt: "State the period.", latex: "y=5\\sin(\\pi x)", answer: "2", difficulty: 3, hint: "$b=\\pi$; period $=\\frac{2\\pi}{\\pi}$.", explanation: "Period $=2$." },
        { id: "y11adv-amp-p29", prompt: "State the minimum value.", latex: "y=4\\sin x", answer: "-4", difficulty: 2, acceptedAnswers: ["−4"], hint: "Min $=-|a|$ with $d=0$.", explanation: "Min $=-4$." },
        { id: "y11adv-amp-p30", prompt: "$y=3\\sin\\!\\left(\\frac{2x}{3}\\right)$. Find its period.", latex: "y=3\\sin\\!\\left(\\frac{2x}{3}\\right)", answer: "3pi", difficulty: 5, acceptedAnswers: ["3\\pi", "3π"], hint: "$b=\\frac23$; period $=\\frac{2\\pi}{2/3}$.", explanation: "Period $=2\\pi\\div\\frac23=3\\pi$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-amp-mp1",
          prompt: "Consider the function $y=4\\sin(2x)$.",
          latex: "y=4\\sin(2x)",
          answer: "4",
          hint: "(a) Amplitude $=|a|$. (b) Period $=\\frac{2\\pi}{b}$. (c) Maximum $=|a|$ when $d=0$.",
          explanation: "(a) amplitude $=4$. (b) period $=\\frac{2\\pi}{2}=\\pi$. (c) maximum $=4$.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the amplitude.", latex: "|a|", marks: 1, answer: "4", hint: "Read the coefficient of sin.", explanation: "Amplitude $=|4|=4$." },
            { key: "b", label: "(b)", prompt: "State the period.", latex: "\\frac{2\\pi}{b}", marks: 2, answer: "pi", acceptedAnswers: ["\\pi", "π"], hint: "$b=2$.", explanation: "Period $=\\frac{2\\pi}{2}=\\pi$." },
            { key: "c", label: "(c)", prompt: "State the maximum value of $y$.", latex: "d+|a|", marks: 1, answer: "4", hint: "Here $d=0$.", explanation: "Maximum $=0+4=4$." },
          ],
        },
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
    const m4Graph: import("../types").CartesianGraph = {
      description:
        "y = 2 sin(x) + 3 on [0, 2π]. Midline y = 3, amplitude 2, range [1, 5].",
      xMin: 0, xMax: 2 * Math.PI, yMin: 0.5, yMax: 5.5,
      xStep: Math.PI / 2, yStep: 1,
      xAxisLabel: "x",
      lines: [{ kind: "linear", m: 0, b: 3, label: "midline y = 3" }],
      sinusoidals: [
        { kind: "sin", a: 2, b: 1, c: 0, d: 3, label: "y = 2sin(x) + 3", description: "Amplitude 2, midline y = 3, range [1, 5]." },
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
        {
          ...formulaAnswer("y11adv-shift-m1", "State the amplitude.", "y=-3\\sin(2x)+5", "3", []),
          hint: "Amplitude = |a| = |−3|.",
        },
        {
          ...formulaAnswer("y11adv-shift-m2", "State the period.", "y=\\cos(3x-\\pi)+1", "2pi/3", ["2\\pi/3", "2π/3"]),
          hint: "Period = 2π/b = 2π/3.",
        },
        {
          ...formulaAnswer("y11adv-shift-m3", "State the vertical shift.", "y=4\\sin(x+\\pi)-2", "-2", ["−2"]),
          hint: "Vertical shift d = −2.",
        },
        {
          ...formulaAnswer("y11adv-shift-m4", "The graph shows y = 2sin(x) + 3. State the minimum value.", "y=2\\sin x+3", "1", []),
          cartesianGraph: m4Graph,
          hint: "Read the lowest point. Minimum = d − |a| = 3 − 2.",
        },
        {
          ...formulaAnswer("y11adv-shift-m5", "State the size of the phase shift.", "y=\\sin\\!\\left(2x+\\frac{\\pi}{2}\\right)", "pi/4", ["\\pi/4", "π/4"]),
          hint: "Phase shift = −c/b = −(π/2)/2 = −π/4. Size = π/4.",
        },
        {
          ...formulaAnswer("y11adv-shift-m6", "State the maximum value.", "y=3\\cos x+2", "5", []),
          hint: "Maximum = d + |a| = 2 + 3.",
        },
        {
          ...formulaAnswer("y11adv-shift-m7", "State the minimum value.", "y=2\\sin\\!\\left(x+\\frac{\\pi}{6}\\right)-1", "-3", ["−3"]),
          hint: "Minimum = d − |a| = −1 − 2.",
        },
        practicalChoice(
          "y11adv-shift-m8",
          "A student reads $y=\\sin\\!\\left(x+\\frac{\\pi}{3}\\right)$ and says the phase shift is $\\frac{\\pi}{3}$ to the right because the sign is positive. Identify the error.",
          "B",
          [
            "The student forgot to include the period in the calculation",
            "Positive $c$ means shift LEFT; phase shift $=-c/b=-\\frac{\\pi}{3}$ (left)",
            "The phase shift should be $\\frac{\\pi}{6}$, not $\\frac{\\pi}{3}$",
            "The student is correct",
          ],
          "Phase shift = −c/b = −π/3. Negative result means left. Positive c always shifts left.",
          "y=\\sin\\!\\left(x+\\frac{\\pi}{3}\\right)"
        ),
        {
          ...formulaAnswer("y11adv-shift-m9", "State the period.", "y=5\\cos(\\pi x+\\tfrac{\\pi}{2})", "2", []),
          hint: "b = π. Period = 2π/π = 2.",
        },
        {
          ...formulaAnswer("y11adv-shift-m10", "State the maximum value of y.", "y=2\\sin\\!\\left(\\frac{\\pi x}{3}+\\frac{\\pi}{6}\\right)+1", "3", []),
          hint: "Maximum = d + |a| = 1 + 2.",
        },
      ],
      masteryQuizPool: [
        { id: "y11adv-shift-p1", prompt: "State the amplitude.", latex: "y=-3\\sin(2x)+5", answer: "3", difficulty: 1, hint: "Amplitude $=|a|$.", explanation: "$|-3|=3$." },
        { id: "y11adv-shift-p2", prompt: "State the vertical shift.", latex: "y=\\sin x+3", answer: "3", difficulty: 1, hint: "$d$ is the constant added.", explanation: "$d=3$." },
        { id: "y11adv-shift-p3", prompt: "State the period.", latex: "y=\\cos(3x-\\pi)+1", answer: "2pi/3", difficulty: 1, acceptedAnswers: ["2\\pi/3", "2π/3"], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "$b=3$, period $=\\frac{2\\pi}{3}$." },
        { id: "y11adv-shift-p4", prompt: "State the maximum value.", latex: "y=2\\sin x+1", answer: "3", difficulty: 1, hint: "Max $=d+|a|$.", explanation: "$1+2=3$." },
        { id: "y11adv-shift-p5", prompt: "State the vertical shift.", latex: "y=4\\sin(x+\\pi)-2", answer: "-2", difficulty: 2, acceptedAnswers: ["−2"], hint: "$d$ is the constant.", explanation: "$d=-2$." },
        { id: "y11adv-shift-p6", prompt: "State the amplitude.", latex: "y=4\\sin\\!\\left(x-\\frac{\\pi}{3}\\right)+1", answer: "4", difficulty: 2, hint: "Amplitude $=|a|$.", explanation: "$|4|=4$." },
        { id: "y11adv-shift-p7", prompt: "State the maximum value.", latex: "y=3\\cos x+2", answer: "5", difficulty: 2, hint: "Max $=d+|a|$.", explanation: "$2+3=5$." },
        { id: "y11adv-shift-p8", prompt: "State the minimum value.", latex: "y=2\\sin x-3", answer: "-5", difficulty: 2, acceptedAnswers: ["−5"], hint: "Min $=d-|a|$.", explanation: "$-3-2=-5$." },
        { id: "y11adv-shift-p9", prompt: "State the minimum value.", latex: "y=2\\sin x+3", answer: "1", difficulty: 3, hint: "Min $=d-|a|$.", explanation: "$3-2=1$." },
        { id: "y11adv-shift-p10", prompt: "State the size of the phase shift.", latex: "y=\\sin\\!\\left(2x+\\frac{\\pi}{2}\\right)", answer: "pi/4", difficulty: 3, acceptedAnswers: ["\\pi/4", "π/4"], hint: "Phase shift $=-\\frac{c}{b}$; size is the magnitude.", explanation: "$-\\frac{\\pi/2}{2}=-\\frac{\\pi}{4}$; size $\\frac{\\pi}{4}$." },
        { id: "y11adv-shift-p11", prompt: "State the maximum value.", latex: "y=3\\cos\\!\\left(x+\\frac{\\pi}{6}\\right)+2", answer: "5", difficulty: 3, hint: "Max $=d+|a|$.", explanation: "$2+3=5$." },
        { id: "y11adv-shift-p12", prompt: "State the minimum value.", latex: "y=2\\sin\\!\\left(x+\\frac{\\pi}{6}\\right)-1", answer: "-3", difficulty: 3, acceptedAnswers: ["−3"], hint: "Min $=d-|a|$.", explanation: "$-1-2=-3$." },
        { id: "y11adv-shift-p13", prompt: "A student reads $y=\\sin(x+\\frac{\\pi}{3})$ and says the phase shift is $\\frac{\\pi}{3}$ right. Identify the error.", latex: "y=\\sin\\!\\left(x+\\frac{\\pi}{3}\\right)", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Forgot the period in the calculation" }, { label: "B", text: "Positive $c$ means shift LEFT; phase shift $=-\\frac{\\pi}{3}$" }, { label: "C", text: "The shift should be $\\frac{\\pi}{6}$" }, { label: "D", text: "The student is correct" }], hint: "Phase shift $=-\\frac{c}{b}$.", explanation: "$-\\frac{\\pi/3}{1}=-\\frac{\\pi}{3}$ means left, not right." },
        { id: "y11adv-shift-p14", prompt: "State the period.", latex: "y=5\\cos\\!\\left(\\pi x+\\frac{\\pi}{2}\\right)", answer: "2", difficulty: 4, hint: "$b=\\pi$; period $=\\frac{2\\pi}{\\pi}$.", explanation: "Period $=2$." },
        { id: "y11adv-shift-p15", prompt: "State the maximum value.", latex: "y=2\\sin\\!\\left(\\frac{\\pi x}{3}+\\frac{\\pi}{6}\\right)+1", answer: "3", difficulty: 4, hint: "Max $=d+|a|$.", explanation: "$1+2=3$." },
        { id: "y11adv-shift-p16", prompt: "State the size of the phase shift.", latex: "y=\\cos\\!\\left(3x-\\frac{\\pi}{2}\\right)", answer: "pi/6", difficulty: 4, acceptedAnswers: ["\\pi/6", "π/6"], hint: "Factor: $3(x-\\frac{\\pi}{6})$.", explanation: "$-\\frac{-\\pi/2}{3}=\\frac{\\pi}{6}$ to the right; size $\\frac{\\pi}{6}$." },
        { id: "y11adv-shift-p17", prompt: "For $y=3\\sin\\!\\left(2x-\\frac{\\pi}{3}\\right)-1$, find the minimum value.", latex: "y=3\\sin\\!\\left(2x-\\frac{\\pi}{3}\\right)-1", answer: "-4", difficulty: 5, acceptedAnswers: ["−4"], hint: "Min $=d-|a|$.", explanation: "$-1-3=-4$." },
        { id: "y11adv-shift-p18", prompt: "For $y=2\\cos\\!\\left(\\pi x-\\frac{\\pi}{2}\\right)+3$, give the upper bound of its range.", latex: "y=2\\cos\\!\\left(\\pi x-\\frac{\\pi}{2}\\right)+3", answer: "5", difficulty: 5, hint: "Max $=d+|a|$.", explanation: "$3+2=5$; range $[1,5]$, upper bound 5." },
        { id: "y11adv-shift-p19", prompt: "A graph $y=a\\sin(x)+d$ has maximum 7 and minimum 1. Find $d$.", latex: "\\text{max }7,\\text{ min }1", answer: "4", difficulty: 5, hint: "$d$ is the midline: average of max and min.", explanation: "$d=\\frac{7+1}{2}=4$." },
        { id: "y11adv-shift-p20", prompt: "A graph $y=a\\sin(x)+d$ has maximum 7 and minimum 1. Find $a$ (with $a>0$).", latex: "\\text{max }7,\\text{ min }1", answer: "3", difficulty: 5, hint: "Amplitude is half the range.", explanation: "$a=\\frac{7-1}{2}=3$." },
        { id: "y11adv-shift-p21", prompt: "$y=5\\cos(2x-\\pi)+2$. Find the size of the phase shift.", latex: "y=5\\cos(2x-\\pi)+2", answer: "pi/2", difficulty: 5, acceptedAnswers: ["\\pi/2", "π/2"], hint: "Factor: $2(x-\\frac{\\pi}{2})$.", explanation: "$2x-\\pi=2(x-\\frac{\\pi}{2})$, so the shift size is $\\frac{\\pi}{2}$." },
        { id: "y11adv-shift-p22", prompt: "$y=3\\sin(x)+d$ has its lowest point at $y=-1$. Find $d$.", latex: "\\text{min }-1,\\quad a=3", answer: "2", difficulty: 5, hint: "Min $=d-|a|$, so $d=\\text{min}+|a|$.", explanation: "$-1=d-3$ gives $d=2$." },
        { id: "y11adv-shift-p23", prompt: "State the amplitude.", latex: "y=-3\\sin\\!\\left(2x+\\frac{\\pi}{4}\\right)", answer: "3", difficulty: 1, hint: "Amplitude $=|a|$.", explanation: "$|-3|=3$." },
        { id: "y11adv-shift-p24", prompt: "State the period.", latex: "y=2\\cos(2x)+1", answer: "pi", difficulty: 2, acceptedAnswers: ["\\pi", "π"], hint: "Period $=\\frac{2\\pi}{b}$.", explanation: "$b=2$, period $=\\pi$." },
        { id: "y11adv-shift-p25", prompt: "State the vertical shift.", latex: "y=3\\cos(2x)-2", answer: "-2", difficulty: 1, acceptedAnswers: ["−2"], hint: "$d$ is the constant.", explanation: "$d=-2$." },
        { id: "y11adv-shift-p26", prompt: "A student says $y=\\sin(2x+\\frac{\\pi}{2})$ has phase shift $\\frac{\\pi}{2}$. Identify the error.", latex: "y=\\sin\\!\\left(2x+\\frac{\\pi}{2}\\right)", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Phase shift is $\\pi$" }, { label: "B", text: "There is no phase shift" }, { label: "C", text: "Phase shift $=-\\frac{c}{b}=-\\frac{\\pi}{4}$, size $\\frac{\\pi}{4}$" }, { label: "D", text: "The student is correct" }], hint: "Divide by $b$.", explanation: "Phase shift $=-\\frac{\\pi/2}{2}=-\\frac{\\pi}{4}$; the size is $\\frac{\\pi}{4}$, not $\\frac{\\pi}{2}$." },
        { id: "y11adv-shift-p27", prompt: "State the maximum value.", latex: "y=4\\cos\\!\\left(x-\\frac{\\pi}{3}\\right)-1", answer: "3", difficulty: 3, hint: "Max $=d+|a|$.", explanation: "$-1+4=3$." },
        { id: "y11adv-shift-p28", prompt: "State the minimum value.", latex: "y=5\\sin(3x)+1", answer: "-4", difficulty: 3, acceptedAnswers: ["−4"], hint: "Min $=d-|a|$.", explanation: "$1-5=-4$." },
        { id: "y11adv-shift-p29", prompt: "State the size of the phase shift.", latex: "y=\\sin\\!\\left(x-\\frac{\\pi}{4}\\right)", answer: "pi/4", difficulty: 2, acceptedAnswers: ["\\pi/4", "π/4"], hint: "$b=1$; phase shift $=-\\frac{c}{b}$.", explanation: "$-\\frac{-\\pi/4}{1}=\\frac{\\pi}{4}$ right; size $\\frac{\\pi}{4}$." },
        { id: "y11adv-shift-p30", prompt: "$y=2\\cos(x)+d$ has range $[1,5]$. Find $d$.", latex: "\\text{range }[1,5]", answer: "3", difficulty: 4, hint: "$d$ is the midline.", explanation: "$d=\\frac{1+5}{2}=3$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-shift-mp1",
          prompt: "Consider the function $y=3\\sin\\!\\left(2x-\\frac{\\pi}{3}\\right)+1$.",
          latex: "y=3\\sin\\!\\left(2x-\\frac{\\pi}{3}\\right)+1",
          answer: "3",
          hint: "Identify $a=3$, $b=2$, $c=-\\frac{\\pi}{3}$, $d=1$, then apply the standard formulas.",
          explanation: "(a) amplitude $=3$. (b) period $=\\frac{2\\pi}{2}=\\pi$. (c) maximum $=1+3=4$.",
          parts: [
            { key: "a", label: "(a)", prompt: "State the amplitude.", latex: "|a|", marks: 1, answer: "3", hint: "Read the coefficient of sin.", explanation: "Amplitude $=|3|=3$." },
            { key: "b", label: "(b)", prompt: "State the period.", latex: "\\frac{2\\pi}{b}", marks: 1, answer: "pi", acceptedAnswers: ["\\pi", "π"], hint: "$b=2$.", explanation: "Period $=\\frac{2\\pi}{2}=\\pi$." },
            { key: "c", label: "(c)", prompt: "State the maximum value of $y$.", latex: "d+|a|", marks: 2, answer: "4", hint: "$d=1$, $|a|=3$.", explanation: "Maximum $=1+3=4$." },
          ],
        },
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
        qa("y11adv-rat-g1", "A ladder 14 m long leans against a wall at 30° to the ground. Find the height it reaches.", "\\sin 30^\\circ = h/14", "7", "sin 30° = ½. So h = 14 × ½.", "h = 14 sin 30° = 14 × ½ = 7 m."),
        practicalChoice("y11adv-rat-g2", "An angle measured downward from horizontal to an object below is called:", "C", ["angle of elevation", "azimuth", "angle of depression", "bearing"], "Elevation is upward; depression is downward. Both measured from horizontal."),
        qa("y11adv-rat-g3", "A pole 20 m tall stands 20 m from an observer on flat ground. Find the angle of elevation (in degrees).", "\\tan\\theta = 20/20 = 1", "45", "tan θ = opp/adj = 20/20 = 1. arctan 1 = 45°.", "tan θ = 20/20 = 1. θ = 45°."),
        qa("y11adv-rat-g4", "State the true bearing of due South.", "", "180", "South is directly opposite North. Starting from 000° (North), rotating 180° clockwise reaches South.", "Due South = 180°."),
      ],
      independentPractice: [
        qa("y11adv-rat-i1", "A rope 20 m long is attached to a stake and pulled taut at 30° above horizontal. How high above the ground is the other end?", "\\sin 30^\\circ = h/20", "10", "sin 30° = ½. h = 20 × ½.", "h = 20 sin 30° = 10 m."),
        qa("y11adv-rat-i2", "From the top of a 25 m cliff, the angle of depression to a boat is 45°. Find the horizontal distance from the cliff base to the boat.", "\\tan 45^\\circ = 25/d", "25", "tan 45° = 1, so d = 25/1 = 25 m.", "tan 45° = 25/d → d = 25 m."),
        qa("y11adv-rat-i3", "A rope is tied from the top of an 18 m wall to the ground. The rope makes 30° with the vertical wall. Find the rope length.", "\\sin 30^\\circ = 18/L \\Rightarrow L = 18/\\sin 30^\\circ", "36", "sin 30° = 18/L → L = 18 / (1/2) = 36 m.", "L = 18 / sin 30° = 18 / 0.5 = 36 m."),
        qa("y11adv-rat-i4", "A ship sails on a bearing of 110°. What is its back bearing?", "110^\\circ + 180^\\circ", "290", "110° < 180°, so add 180°: 110 + 180 = 290°.", "Back bearing = 110° + 180° = 290°."),
        practicalChoice("y11adv-rat-i5", "The compass bearing SE corresponds to which true bearing?", "B", ["045°", "135°", "225°", "315°"], "SE is halfway between S (180°) and E (90°). True bearing = 90 + 45 = 135°."),
      ],
      commonMistakes: [
        { mistake: "Using sin when cos is needed — forgetting which side is opposite and which is adjacent.", fix: "Label the triangle first: identify the angle, then label opposite (across from angle) and adjacent (next to angle, not hypotenuse)." },
        { mistake: "Confusing angle of elevation with angle of depression.", fix: "Elevation is measured upward from horizontal; depression is downward. Both use the same right-triangle setup — draw a diagram." },
        { mistake: "Writing bearings without three digits (e.g., 45° instead of 045°).", fix: "True bearings are always three digits: pad with leading zeros as needed. 45° → 045°." },
        { mistake: "Subtracting 180° from a bearing less than 180° to find the back bearing.", fix: "If the bearing is less than 180°, ADD 180°. If it is 180° or more, subtract 180°. Always check the result is between 000° and 360°." },
      ],
      masteryQuiz: [
        qa("y11adv-rat-m1", "A kite is attached to a 100 m string making 30° with the ground. How high is the kite?", "\\sin 30^\\circ = h/100", "50", "h = 100 × sin 30° = 100 × ½.", "h = 100 × ½ = 50 m."),
        qa("y11adv-rat-m2", "A flagpole's shadow and height are both 12 m. Find the angle of elevation of the sun (in degrees).", "\\tan\\theta = 12/12 = 1", "45", "tan θ = opp/adj = 12/12 = 1. arctan 1 = 45°.", "tan θ = 1 → θ = 45°."),
        practicalChoice("y11adv-rat-m3", "From 30 m away, the angle of elevation to a rooftop is 60°. Which value is closest to the height?", "D", ["17 m", "26 m", "30 m", "52 m"], "h = 30 tan 60° = 30√3 ≈ 51.96 m ≈ 52 m.", "h = 30\\tan 60^\\circ = 30\\sqrt{3} \\approx 52 \\text{ m}"),
        qa("y11adv-rat-m4", "A ship sails on a bearing of 350°. What is its back bearing?", "350^\\circ - 180^\\circ", "170", "350° ≥ 180°, so subtract 180°: 350 − 180 = 170°.", "Back bearing = 350° − 180° = 170°."),
        qa("y11adv-rat-m5", "A rope runs from the top of a 12 m building to the ground at 30° to the vertical. Find the rope length.", "\\sin 30^\\circ = 12/L \\Rightarrow L = 24", "24", "sin 30° = 12/L → L = 12 / sin 30° = 12 / 0.5.", "L = 12 / 0.5 = 24 m."),
        practicalChoice("y11adv-rat-m6", "The angle of elevation is measured:", "B", ["downward from horizontal", "upward from horizontal", "clockwise from north", "from the top of an object"], "Elevation is upward from horizontal to the observed object."),
        qa("y11adv-rat-m7", "State the true bearing of the compass direction N60°W.", "360^\\circ - 60^\\circ", "300", "N60°W means 60° west of north. Rotate 360° − 60° = 300° clockwise from north.", "True bearing = 360° − 60° = 300°."),
        practicalChoice("y11adv-rat-m8", "A 60 m rope makes 30° with the ground. What is the vertical height?", "B", ["25 m", "30 m", "40 m", "52 m"], "h = 60 sin 30° = 60 × ½ = 30 m.", "h = 60\\sin 30^\\circ = 30 \\text{ m}"),
        qa("y11adv-rat-m9", "A ship sails on a bearing of 220°. What is its back bearing?", "220^\\circ - 180^\\circ", "40", "220° ≥ 180°, so subtract: 220 − 180 = 40°.", "Back bearing = 220° − 180° = 40°."),
        practicalChoice("y11adv-rat-m10", "A rope of length 24 m makes 30° with the ground. What is the vertical height?", "A", ["12 m", "6 m", "24 m", "20 m"], "h = 24 sin 30° = 24 × ½ = 12 m.", "h = 24\\sin 30^\\circ = 12 \\text{ m}"),
      ],
      masteryQuizPool: [
        { id: "y11adv-rat-p1", prompt: "A ladder 14 m long leans at 30° to the ground. Find the height it reaches.", latex: "\\sin 30^\\circ=h/14", answer: "7", difficulty: 1, hint: "$\\sin 30^\\circ=\\frac12$.", explanation: "$h=14\\times\\frac12=7$ m." },
        { id: "y11adv-rat-p2", prompt: "A rope 20 m long is pulled taut at 30° above horizontal. How high is the far end?", latex: "\\sin 30^\\circ=h/20", answer: "10", difficulty: 1, hint: "$\\sin 30^\\circ=\\frac12$.", explanation: "$h=20\\times\\frac12=10$ m." },
        { id: "y11adv-rat-p3", prompt: "State the true bearing of due South.", latex: "\\text{due South}", answer: "180", difficulty: 1, acceptedAnswers: ["180 degrees", "180°"], hint: "Measured clockwise from North.", explanation: "Due South $=180^\\circ$." },
        { id: "y11adv-rat-p4", prompt: "An angle measured downward from horizontal to an object below is called:", latex: "\\text{angle type}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "angle of elevation" }, { label: "B", text: "azimuth" }, { label: "C", text: "angle of depression" }, { label: "D", text: "bearing" }], hint: "Downward from horizontal.", explanation: "Depression is measured downward from horizontal." },
        { id: "y11adv-rat-p5", prompt: "A pole 20 m tall stands 20 m from an observer. Find the angle of elevation in degrees.", latex: "\\tan\\theta=20/20", answer: "45", difficulty: 2, acceptedAnswers: ["45 degrees", "45°"], hint: "$\\tan\\theta=1$.", explanation: "$\\tan\\theta=1$, so $\\theta=45^\\circ$." },
        { id: "y11adv-rat-p6", prompt: "From a 25 m cliff, the angle of depression to a boat is 45°. Find the horizontal distance.", latex: "\\tan 45^\\circ=25/d", answer: "25", difficulty: 2, hint: "$\\tan 45^\\circ=1$.", explanation: "$d=25/1=25$ m." },
        { id: "y11adv-rat-p7", prompt: "A ship sails on a bearing of 110°. Find its back bearing.", latex: "110^\\circ+180^\\circ", answer: "290", difficulty: 2, acceptedAnswers: ["290 degrees", "290°"], hint: "$<180$, so add $180$.", explanation: "$110+180=290^\\circ$." },
        { id: "y11adv-rat-p8", prompt: "The compass bearing SE corresponds to which true bearing?", latex: "\\text{SE}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "045°" }, { label: "B", text: "135°" }, { label: "C", text: "225°" }, { label: "D", text: "315°" }], hint: "Halfway between S and E.", explanation: "SE $=90+45=135^\\circ$." },
        { id: "y11adv-rat-p9", prompt: "A kite is on a 100 m string at 30° to the ground. How high is the kite?", latex: "\\sin 30^\\circ=h/100", answer: "50", difficulty: 3, hint: "$h=100\\sin 30^\\circ$.", explanation: "$h=100\\times\\frac12=50$ m." },
        { id: "y11adv-rat-p10", prompt: "A rope runs from the top of a 12 m building to the ground at 30° to the vertical. Find the rope length.", latex: "\\sin 30^\\circ=12/L", answer: "24", difficulty: 3, hint: "$L=12/\\sin 30^\\circ$.", explanation: "$L=12/0.5=24$ m." },
        { id: "y11adv-rat-p11", prompt: "A ship sails on a bearing of 350°. Find its back bearing.", latex: "350^\\circ-180^\\circ", answer: "170", difficulty: 3, acceptedAnswers: ["170 degrees", "170°"], hint: "$\\geq180$, so subtract $180$.", explanation: "$350-180=170^\\circ$." },
        { id: "y11adv-rat-p12", prompt: "State the true bearing of N60°W.", latex: "\\text{N60°W}", answer: "300", difficulty: 3, acceptedAnswers: ["300 degrees", "300°"], hint: "$360-60$.", explanation: "N60°W $=360-60=300^\\circ$." },
        { id: "y11adv-rat-p13", prompt: "A flagpole's shadow and height are both 12 m. Find the angle of elevation of the sun in degrees.", latex: "\\tan\\theta=12/12", answer: "45", difficulty: 3, acceptedAnswers: ["45 degrees", "45°"], hint: "$\\tan\\theta=1$.", explanation: "$\\theta=45^\\circ$." },
        { id: "y11adv-rat-p14", prompt: "A student writes the back bearing of 100° as $100-180=-80$. Identify the error.", latex: "\\text{back bearing of }100^\\circ", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Back bearings do not exist below 180°" }, { label: "B", text: "They should multiply by 2" }, { label: "C", text: "For a bearing below 180°, ADD 180°: $100+180=280$" }, { label: "D", text: "The answer is correct" }], hint: "Add 180 when the bearing is below 180.", explanation: "$100+180=280^\\circ$ — add, not subtract, when below 180°." },
        { id: "y11adv-rat-p15", prompt: "From 30 m away, the angle of elevation to a rooftop is 60°. Find the height to the nearest metre.", latex: "h=30\\tan 60^\\circ", answer: "52", difficulty: 4, acceptedAnswers: ["52 metres", "52 m", "30√3"], hint: "$h=30\\tan 60^\\circ=30\\sqrt3$.", explanation: "$h=30\\sqrt3\\approx51.96\\approx52$ m." },
        { id: "y11adv-rat-p16", prompt: "A 60 m rope makes 30° with the ground. Find the vertical height.", latex: "h=60\\sin 30^\\circ", answer: "30", difficulty: 4, hint: "$\\sin 30^\\circ=\\frac12$.", explanation: "$h=60\\times\\frac12=30$ m." },
        { id: "y11adv-rat-p17", prompt: "A ship sails on a bearing of 220°. Find its back bearing.", latex: "220^\\circ-180^\\circ", answer: "40", difficulty: 4, acceptedAnswers: ["40 degrees", "40°"], hint: "$\\geq180$, subtract $180$.", explanation: "$220-180=40^\\circ$." },
        { id: "y11adv-rat-p18", prompt: "A 24 m ladder reaches 12 m up a wall. Find the angle it makes with the ground in degrees.", latex: "\\sin\\theta=12/24", answer: "30", difficulty: 4, acceptedAnswers: ["30 degrees", "30°"], hint: "$\\sin\\theta=\\frac12$.", explanation: "$\\sin\\theta=\\frac12$, so $\\theta=30^\\circ$." },
        { id: "y11adv-rat-p19", prompt: "A tower is 50 m tall. The angle of elevation to its top from a point is 45°. How far is the point from the base (in m)?", latex: "\\tan 45^\\circ=50/d", answer: "50", difficulty: 5, hint: "$\\tan 45^\\circ=1$.", explanation: "$d=50/1=50$ m." },
        { id: "y11adv-rat-p20", prompt: "A person walks 8 km North, then 6 km East. Find the straight-line distance from the start (in km).", latex: "d=\\sqrt{8^2+6^2}", answer: "10", difficulty: 5, hint: "Pythagoras.", explanation: "$d=\\sqrt{64+36}=\\sqrt{100}=10$ km." },
        { id: "y11adv-rat-p21", prompt: "From the top of a 40 m cliff the angle of depression to a buoy is 30°. Find the horizontal distance to the nearest metre.", latex: "\\tan 30^\\circ=40/d", answer: "69", difficulty: 5, acceptedAnswers: ["69 metres", "69 m", "40√3"], hint: "$d=40/\\tan 30^\\circ=40\\sqrt3$.", explanation: "$d=40\\sqrt3\\approx69.3\\approx69$ m." },
        { id: "y11adv-rat-p22", prompt: "A plane flies on a bearing of 075°, then turns to the reciprocal (back) bearing. What is the new bearing?", latex: "075^\\circ+180^\\circ", answer: "255", difficulty: 5, acceptedAnswers: ["255 degrees", "255°"], hint: "Below 180°, add 180.", explanation: "$75+180=255^\\circ$." },
        { id: "y11adv-rat-p23", prompt: "A guy wire from a 15 m pole reaches the ground 15 m from the base. Find the angle with the ground in degrees.", latex: "\\tan\\theta=15/15", answer: "45", difficulty: 3, acceptedAnswers: ["45 degrees", "45°"], hint: "$\\tan\\theta=1$.", explanation: "$\\theta=45^\\circ$." },
        { id: "y11adv-rat-p24", prompt: "State the true bearing of due West.", latex: "\\text{due West}", answer: "270", difficulty: 2, acceptedAnswers: ["270 degrees", "270°"], hint: "Three-quarter turn clockwise from North.", explanation: "Due West $=270^\\circ$." },
        { id: "y11adv-rat-p25", prompt: "The compass bearing NE corresponds to which true bearing?", latex: "\\text{NE}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "045°" }, { label: "B", text: "090°" }, { label: "C", text: "135°" }, { label: "D", text: "315°" }], hint: "Halfway between N and E.", explanation: "NE $=045^\\circ$." },
        { id: "y11adv-rat-p26", prompt: "A 100 m string holds a kite at 60° to the ground. Find the height to the nearest metre.", latex: "h=100\\sin 60^\\circ", answer: "87", difficulty: 4, acceptedAnswers: ["87 metres", "87 m", "50√3"], hint: "$h=100\\sin 60^\\circ=50\\sqrt3$.", explanation: "$h=50\\sqrt3\\approx86.6\\approx87$ m." },
        { id: "y11adv-rat-p27", prompt: "A ship sails on a bearing of 200°. Find its back bearing.", latex: "200^\\circ-180^\\circ", answer: "20", difficulty: 3, acceptedAnswers: ["20 degrees", "20°"], hint: "$\\geq180$, subtract $180$.", explanation: "$200-180=20^\\circ$." },
        { id: "y11adv-rat-p28", prompt: "The angle of elevation is measured:", latex: "\\text{elevation}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "downward from horizontal" }, { label: "B", text: "upward from horizontal" }, { label: "C", text: "clockwise from north" }, { label: "D", text: "from the top of an object" }], hint: "Upward to an object above.", explanation: "Elevation is upward from horizontal." },
        { id: "y11adv-rat-p29", prompt: "A ramp rises 3 m over a horizontal run of 4 m. Find the length of the ramp (in m).", latex: "L=\\sqrt{3^2+4^2}", answer: "5", difficulty: 3, hint: "Pythagoras.", explanation: "$L=\\sqrt{9+16}=5$ m." },
        { id: "y11adv-rat-p30", prompt: "A person walks 5 km on bearing 090° then 12 km on bearing 000°. Find the straight-line distance back to the start (in km).", latex: "d=\\sqrt{5^2+12^2}", answer: "13", difficulty: 5, hint: "The two legs are perpendicular; use Pythagoras.", explanation: "$d=\\sqrt{25+144}=\\sqrt{169}=13$ km." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-rat-mp1",
          prompt: "A ladder 20 m long leans against a vertical wall, making an angle of 30° with the ground.",
          latex: "\\text{Ladder length} = 20\\text{ m}, \\quad \\theta = 30^\\circ",
          answer: "10",
          hint: "Use sin for the height (opp/hyp) and cos for the base (adj/hyp). For part (c) change the angle to 45°.",
          explanation: "(a) h = 20 sin 30° = 10 m. (b) base = 20 cos 30° = 10√3 ≈ 17.3 m. (c) h at 45° = 20 sin 45° = 10√2 ≈ 14.1 m.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the height the ladder reaches up the wall.", marks: 1, answer: "10", hint: "sin 30° = h/20.", explanation: "h = 20 sin 30° = 20 × ½ = 10 m." },
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
          parts: [
            { key: "a", label: "(a)", prompt: "Find the straight-line distance from port to the ship (to 2 decimal places).", marks: 1, answer: "7.07", acceptedAnswers: ["7.07", "7.1", "5√2", "7"], hint: "Use Pythagoras: d = √(5²+5²).", explanation: "d = √(25+25) = √50 = 5√2 ≈ 7.07 km." },
            { key: "b", label: "(b)", prompt: "State the true bearing from port to the ship.", marks: 1, answer: "045", acceptedAnswers: ["045", "45"], hint: "The ship is equal distances N and E — halfway between N and E.", explanation: "Equal N and E displacements → bearing is NE = 045°." },
            { key: "c", label: "(c)", prompt: "State the back bearing from the ship to port.", marks: 1, answer: "225", hint: "045° + 180° = 225°.", explanation: "Back bearing = 045° + 180° = 225°." },
          ],
        },
      ],
    };
  }

  // ── Sine rule, cosine rule and area formula ───────────────────────────────
  if (lesson.slug === "sine-rule-cosine-rule") {
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
        qa("y11adv-nra-g1", "$a=6$, $b=4$, $C=30°$. Find the area of the triangle.", "\\text{Area}=\\tfrac{1}{2}(6)(4)\\sin 30^\\circ", "6", "Area = ½ × 6 × 4 × sin 30°. sin 30° = ½.", "Area = ½(6)(4)(½) = 6 sq units."),
        practicalChoice("y11adv-nra-g2", "You know two angles and one side (AAS). Which rule should you use to find the remaining sides?", "A", ["Sine rule", "Cosine rule", "Area formula", "Pythagoras"], "The sine rule a/sinA = b/sinB works directly with AAS information."),
        qa("y11adv-nra-g3", "In a triangle, $A=30°$, $B=90°$, $a=10$. Find side $b$ using the sine rule.", "b = \\frac{a\\sin B}{\\sin A} = \\frac{10\\times 1}{\\tfrac{1}{2}}", "20", "b = a sinB/sinA = 10×1÷(1/2) = 20.", "b = 10 × sin 90°/sin 30° = 10/(½) = 20."),
        practicalChoice("y11adv-nra-g4", "You know two sides and the angle between them (SAS). Which rule gives the third side?", "B", ["Sine rule", "Cosine rule", "Area formula", "Pythagoras"], "The cosine rule a² = b² + c² − 2bc cosA is designed for SAS situations."),
      ],
      independentPractice: [
        qa("y11adv-nra-i1", "$a=8$, $b=8$, $C=90°$. Find the area.", "\\text{Area}=\\tfrac{1}{2}(8)(8)\\sin 90^\\circ", "32", "sin 90° = 1. Area = ½ × 8 × 8 × 1.", "Area = ½(8)(8)(1) = 32 sq units."),
        qa("y11adv-nra-i2", "In a triangle, $A=30°$, $B=90°$, $a=12$. Find $b$.", "b = \\frac{12\\sin 90^\\circ}{\\sin 30^\\circ}", "24", "b = 12 × 1 ÷ ½ = 24.", "b = 12/sin 30° × sin 90° = 12/0.5 = 24."),
        practicalChoice("y11adv-nra-i3", "In triangle with $b=4$, $c=4$, $A=60°$, apply the cosine rule to find $a$. Which is correct?", "B", ["$a=8$", "$a=4$", "$a=2$", "$a=6$"], "a² = 16+16 − 2(16)(½) = 32−16 = 16. a = 4. Equilateral when b=c=a=4 and A=60°.", "a^2=b^2+c^2-2bc\\cos A"),
        qa("y11adv-nra-i4", "$a=10$, $b=6$, $C=30°$. Find the area.", "\\text{Area}=\\tfrac{1}{2}(10)(6)\\sin 30^\\circ", "15", "Area = ½ × 10 × 6 × ½.", "Area = ½(10)(6)(½) = 15 sq units."),
        practicalChoice("y11adv-nra-i5", "All three sides are known (SSS). Which rule can find an angle?", "B", ["Sine rule (directly)", "Cosine rule (rearranged)", "Area formula", "Pythagoras"], "Rearrange the cosine rule: cosA = (b²+c²−a²)/(2bc) to find any angle from three sides."),
      ],
      commonMistakes: [
        { mistake: "Using the sine rule when the SAS case requires the cosine rule.", fix: "If the angle given is between the two known sides, use the cosine rule. The sine rule needs an opposite angle-side pair." },
        { mistake: "Forgetting sin 90° = 1, making the cosine rule calculation harder than it needs to be.", fix: "When A = 90°, the cosine rule reduces to Pythagoras. Use a² = b² + c² directly." },
        { mistake: "Confusing the included angle with a non-included angle in the area formula.", fix: "Area = ½ab sinC requires C to be the angle between sides a and b — the included angle." },
        { mistake: "Setting up a/sinA = b/sinB with the wrong pair (side opposite a different angle).", fix: "Each side is always paired with the sine of its opposite angle. Label the triangle clearly before substituting." },
      ],
      masteryQuiz: [
        qa("y11adv-nra-m1", "$a=8$, $b=6$, $C=30°$. Find the area.", "\\text{Area}=\\tfrac{1}{2}(8)(6)\\sin 30^\\circ", "12", "Area = ½ × 8 × 6 × ½.", "Area = ½(8)(6)(½) = 12 sq units."),
        qa("y11adv-nra-m2", "$b=3$, $c=4$, $A=90°$. Find $a$ using the cosine rule.", "a^2=9+16-0=25", "5", "cos 90° = 0. a² = 9+16 = 25. a = 5.", "a = 5 (Pythagorean triple)."),
        qa("y11adv-nra-m3", "In triangle with $A=B=30°$, $a=8$. Find $b$ (the side opposite $B=30°$).", "\\frac{b}{\\sin B}=\\frac{a}{\\sin A}\\Rightarrow b=a", "8", "A = B, so a = b (isosceles triangle).", "Since A = B = 30°, the triangle is isosceles and a = b = 8."),
        practicalChoice("y11adv-nra-m4", "$A=60°$, $B=90°$, $a=9$. Which value of $b$ is closest?", "B", ["9 m", "10 m", "18 m", "12 m"], "b = 9/sin60° × sin90° = 9/(√3/2) = 18/√3 = 6√3 ≈ 10.4 m.", "b \\approx 10 \\text{ m}"),
        qa("y11adv-nra-m5", "$a=5$, $b=5$, $C=90°$. Find the area.", "\\text{Area}=\\tfrac{1}{2}(5)(5)\\sin 90^\\circ", "12.5", "Area = ½ × 5 × 5 × 1 = 12.5.", "Area = 12.5 sq units."),
        qa("y11adv-nra-m6", "$b=5$, $c=5$, $A=60°$. Use the cosine rule to find $a$.", "a^2=25+25-2(25)(\\tfrac{1}{2})=25", "5", "a² = 50 − 25 = 25. a = 5. Equilateral triangle.", "a = 5 (equilateral: all sides equal when b=c and A=60°)."),
        practicalChoice("y11adv-nra-m7", "$A=B=45°$, $C=90°$, $a=8$. Use the sine rule to find the hypotenuse $c$. Which is closest?", "B", ["8 m", "11 m", "16 m", "4 m"], "c = a sinC/sinA = 8×1/(1/√2) = 8√2 ≈ 11.3 m.", "c = 8\\sqrt{2} \\approx 11 \\text{ m}"),
        qa("y11adv-nra-m8", "$a=12$, $b=8$, $C=30°$. Find the area.", "\\text{Area}=\\tfrac{1}{2}(12)(8)\\sin 30^\\circ", "24", "Area = ½ × 12 × 8 × ½.", "Area = ½(12)(8)(½) = 24 sq units."),
        qa("y11adv-nra-m9", "$A=30°$, $B=90°$, $a=6$. Find $b$ using the sine rule.", "b=a\\sin B/\\sin A=6/(\\tfrac{1}{2})\\times 1", "12", "b = 6/sin30° × sin90° = 6/(½) = 12.", "b = 12."),
        practicalChoice("y11adv-nra-m10", "Three sides are given and you need an angle. Which rule should you use?", "B", ["Sine rule applied directly", "Cosine rule rearranged", "Area formula", "Pythagoras alone"], "Rearranging the cosine rule gives cosA = (b²+c²−a²)/(2bc), finding any angle from SSS."),
      ],
      masteryQuizPool: [
        { id: "y11adv-nra-p1", prompt: "$a=8$, $b=6$, $C=30°$. Find the area.", latex: "\\text{Area}=\\tfrac12(8)(6)\\sin 30^\\circ", answer: "12", difficulty: 1, hint: "$\\frac12ab\\sin C$.", explanation: "$\\frac12\\times8\\times6\\times\\frac12=12$." },
        { id: "y11adv-nra-p2", prompt: "$a=5$, $b=5$, $C=90°$. Find the area.", latex: "\\text{Area}=\\tfrac12(5)(5)\\sin 90^\\circ", answer: "12.5", difficulty: 1, hint: "$\\sin 90^\\circ=1$.", explanation: "$\\frac12\\times25\\times1=12.5$." },
        { id: "y11adv-nra-p3", prompt: "Which formula gives the area of a triangle from two sides and the included angle?", latex: "\\text{area}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$\\frac12ab\\sin C$" }, { label: "B", text: "$\\frac12bh$" }, { label: "C", text: "$ab\\cos C$" }, { label: "D", text: "$\\frac12ab\\cos C$" }], hint: "Sine of the included angle.", explanation: "Area $=\\frac12ab\\sin C$." },
        { id: "y11adv-nra-p4", prompt: "In a triangle with $A=B=30°$ and $a=8$, find $b$.", latex: "A=B\\Rightarrow a=b", answer: "8", difficulty: 1, hint: "Equal angles give equal opposite sides.", explanation: "$A=B$ so the triangle is isosceles: $b=a=8$." },
        { id: "y11adv-nra-p5", prompt: "$b=3$, $c=4$, $A=90°$. Find $a$ using the cosine rule.", latex: "a^2=b^2+c^2-2bc\\cos A", answer: "5", difficulty: 2, hint: "$\\cos 90^\\circ=0$.", explanation: "$a^2=9+16=25$, $a=5$." },
        { id: "y11adv-nra-p6", prompt: "$a=12$, $b=8$, $C=30°$. Find the area.", latex: "\\text{Area}=\\tfrac12(12)(8)\\sin 30^\\circ", answer: "24", difficulty: 2, hint: "$\\frac12ab\\sin C$.", explanation: "$\\frac12\\times12\\times8\\times\\frac12=24$." },
        { id: "y11adv-nra-p7", prompt: "$b=5$, $c=5$, $A=60°$. Use the cosine rule to find $a$.", latex: "a^2=25+25-2(25)\\cos 60^\\circ", answer: "5", difficulty: 2, hint: "$\\cos 60^\\circ=\\frac12$.", explanation: "$a^2=50-25=25$, $a=5$ (equilateral)." },
        { id: "y11adv-nra-p8", prompt: "$A=30°$, $B=90°$, $a=6$. Find $b$ using the sine rule.", latex: "b=a\\sin B/\\sin A", answer: "12", difficulty: 2, hint: "$\\sin 90^\\circ=1$, $\\sin 30^\\circ=\\frac12$.", explanation: "$b=6\\times1/\\frac12=12$." },
        { id: "y11adv-nra-p9", prompt: "$A=60°$, $B=90°$, $a=9$. Find $b$ to the nearest metre.", latex: "b=a\\sin B/\\sin A", answer: "10", difficulty: 3, acceptedAnswers: ["10 metres", "10 m", "6√3"], hint: "$b=9/\\sin 60^\\circ$.", explanation: "$b=9/(\\sqrt3/2)=6\\sqrt3\\approx10.4\\approx10$ m." },
        { id: "y11adv-nra-p10", prompt: "$A=B=45°$, $C=90°$, $a=8$. Find the hypotenuse $c$ to the nearest metre.", latex: "c=a\\sin C/\\sin A", answer: "11", difficulty: 3, acceptedAnswers: ["11 metres", "11 m", "8√2"], hint: "$c=8/\\sin 45^\\circ$.", explanation: "$c=8\\sqrt2\\approx11.3\\approx11$ m." },
        { id: "y11adv-nra-p11", prompt: "$a=7$, $b=10$, $C=90°$. Find the area.", latex: "\\text{Area}=\\tfrac12(7)(10)\\sin 90^\\circ", answer: "35", difficulty: 3, hint: "$\\sin 90^\\circ=1$.", explanation: "$\\frac12\\times7\\times10\\times1=35$." },
        { id: "y11adv-nra-p12", prompt: "$a=4$, $b=5$, $C=60°$. Find $c$ using the cosine rule (exact, as $\\sqrt{n}$ value of $n$).", latex: "c^2=16+25-2(20)\\cos 60^\\circ", answer: "21", difficulty: 3, hint: "$c^2=41-2(20)(\\frac12)$.", explanation: "$c^2=41-20=21$, so $c=\\sqrt{21}$; the value under the root is 21." },
        { id: "y11adv-nra-p13", prompt: "Three sides are given and you need an angle. Which rule applies?", latex: "\\text{SSS}", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Sine rule directly" }, { label: "B", text: "Cosine rule rearranged" }, { label: "C", text: "Area formula" }, { label: "D", text: "Pythagoras alone" }], hint: "SSS needs the cosine rule.", explanation: "Rearrange the cosine rule to find an angle from three sides." },
        { id: "y11adv-nra-p14", prompt: "$a=6$, $b=8$, $C=90°$. Find $c$ using the cosine rule.", latex: "c^2=36+64-2(48)\\cos 90^\\circ", answer: "10", difficulty: 4, hint: "$\\cos 90^\\circ=0$ reduces it to Pythagoras.", explanation: "$c^2=100$, $c=10$." },
        { id: "y11adv-nra-p15", prompt: "$a=6$, $b=8$, $C=90°$. Using the sine rule, find $\\sin A$ as a decimal (with $c=10$).", latex: "\\sin A=a\\sin C/c", answer: "0.6", difficulty: 4, hint: "$\\sin A=6\\times1/10$.", explanation: "$\\sin A=\\frac{6}{10}=0.6$." },
        { id: "y11adv-nra-p16", prompt: "$a=10$, $b=10$, $C=60°$. Find $c$ using the cosine rule.", latex: "c^2=100+100-2(100)\\cos 60^\\circ", answer: "10", difficulty: 4, hint: "$\\cos 60^\\circ=\\frac12$; equilateral.", explanation: "$c^2=200-100=100$, $c=10$." },
        { id: "y11adv-nra-p17", prompt: "$a=9$, $b=12$, $C=90°$. Find the area.", latex: "\\text{Area}=\\tfrac12(9)(12)", answer: "54", difficulty: 4, hint: "$\\sin 90^\\circ=1$.", explanation: "$\\frac12\\times9\\times12=54$." },
        { id: "y11adv-nra-p18", prompt: "$A=30°$, $B=90°$, $a=8$. Find angle $C$ in degrees.", latex: "A+B+C=180^\\circ", answer: "60", difficulty: 4, acceptedAnswers: ["60 degrees", "60°"], hint: "Angles sum to 180°.", explanation: "$C=180-30-90=60^\\circ$." },
        { id: "y11adv-nra-p19", prompt: "A triangle has sides 7, 8 and included angle 90°. Find the third side to 2 decimal places.", latex: "c^2=49+64", answer: "10.63", difficulty: 5, acceptedAnswers: ["10.63", "√113", "10.6"], hint: "$c=\\sqrt{49+64}=\\sqrt{113}$.", explanation: "$c=\\sqrt{113}\\approx10.63$." },
        { id: "y11adv-nra-p20", prompt: "$A=30°$, $B=90°$, $a=8$, and $b=16$. Find the area to the nearest square unit.", latex: "\\text{Area}=\\tfrac12ab\\sin C,\\; C=60^\\circ", answer: "55", difficulty: 5, acceptedAnswers: ["55", "56", "32√3"], hint: "$C=60°$; Area $=\\frac12(8)(16)\\sin 60^\\circ$.", explanation: "Area $=\\frac12\\times8\\times16\\times\\frac{\\sqrt3}{2}=32\\sqrt3\\approx55$." },
        { id: "y11adv-nra-p21", prompt: "In a triangle, $a=5$, $b=7$, $c=8$. Find $\\cos C$ as a fraction.", latex: "\\cos C=\\frac{a^2+b^2-c^2}{2ab}", answer: "1/7", difficulty: 5, acceptedAnswers: ["0.143", "0.14"], hint: "$\\cos C=\\frac{25+49-64}{2(5)(7)}$.", explanation: "$\\cos C=\\frac{10}{70}=\\frac17$." },
        { id: "y11adv-nra-p22", prompt: "A triangle has $a=6$, $C=90°$, area 24. Find $b$.", latex: "24=\\tfrac12(6)(b)", answer: "8", difficulty: 5, hint: "Area $=\\frac12ab\\sin 90^\\circ=\\frac12(6)b$.", explanation: "$24=3b$ gives $b=8$." },
        { id: "y11adv-nra-p23", prompt: "$a=10$, $b=6$, $C=30°$. Find the area.", latex: "\\text{Area}=\\tfrac12(10)(6)\\sin 30^\\circ", answer: "15", difficulty: 2, hint: "$\\frac12ab\\sin C$.", explanation: "$\\frac12\\times10\\times6\\times\\frac12=15$." },
        { id: "y11adv-nra-p24", prompt: "$A=45°$, $C=90°$, $a=5$. Find the hypotenuse to 2 decimal places.", latex: "c=a/\\sin A\\times\\sin C", answer: "7.07", difficulty: 4, acceptedAnswers: ["7.07", "5√2", "7.1"], hint: "$c=5/\\sin 45^\\circ$.", explanation: "$c=5\\sqrt2\\approx7.07$." },
        { id: "y11adv-nra-p25", prompt: "$b=4$, $c=4$, $A=90°$. Find $a$.", latex: "a^2=16+16", answer: "5.66", difficulty: 3, acceptedAnswers: ["5.66", "4√2", "5.7"], hint: "$a=\\sqrt{32}=4\\sqrt2$.", explanation: "$a=\\sqrt{32}=4\\sqrt2\\approx5.66$." },
        { id: "y11adv-nra-p26", prompt: "A student uses the sine rule on SAS data. Identify the error.", latex: "\\text{SAS}", answer: "C", difficulty: 4, choices: [{ label: "A", text: "Sine rule is correct for SAS" }, { label: "B", text: "Use Pythagoras" }, { label: "C", text: "SAS needs the cosine rule to find the third side" }, { label: "D", text: "SAS gives no triangle" }], hint: "Two sides and the included angle.", explanation: "SAS uses the cosine rule, not the sine rule, for the missing side." },
        { id: "y11adv-nra-p27", prompt: "$a=9$, $b=9$, $C=90°$. Find the area.", latex: "\\text{Area}=\\tfrac12(9)(9)", answer: "40.5", difficulty: 3, hint: "$\\sin 90^\\circ=1$.", explanation: "$\\frac12\\times9\\times9=40.5$." },
        { id: "y11adv-nra-p28", prompt: "Which information allows the sine rule to be applied directly?", latex: "\\text{rule choice}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Two angles and a side (AAS)" }, { label: "B", text: "Three sides (SSS)" }, { label: "C", text: "Two sides and the included angle (SAS)" }, { label: "D", text: "All three angles" }], hint: "Sine rule pairs a side with its opposite angle.", explanation: "AAS gives a side with its opposite angle, so the sine rule applies directly." },
        { id: "y11adv-nra-p29", prompt: "$a=3$, $b=4$, $C=90°$. Find the area.", latex: "\\text{Area}=\\tfrac12(3)(4)", answer: "6", difficulty: 2, hint: "$\\sin 90^\\circ=1$.", explanation: "$\\frac12\\times3\\times4=6$." },
        { id: "y11adv-nra-p30", prompt: "In a triangle, $a=2$, $b=3$, $c=4$. Find $\\cos A$ as a fraction.", latex: "\\cos A=\\frac{b^2+c^2-a^2}{2bc}", answer: "7/8", difficulty: 5, acceptedAnswers: ["0.875"], hint: "$\\cos A=\\frac{9+16-4}{2(3)(4)}$.", explanation: "$\\cos A=\\frac{21}{24}=\\frac78$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-nra-mp1",
          prompt: "In triangle $ABC$, $a=6$, $b=8$, $C=90°$.",
          latex: "a=6,\\; b=8,\\; C=90^\\circ",
          answer: "24",
          hint: "For (a) use the area formula. For (b) the cosine rule with cos 90°=0 reduces to Pythagoras. For (c) the sine rule gives sinA = a/c.",
          explanation: "(a) Area = ½(6)(8)(1) = 24. (b) c² = 36+64 = 100, c = 10. (c) sinA = 6/10 = 0.6.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the area of the triangle.", marks: 1, answer: "24", hint: "Area = ½ab sinC. sin 90° = 1.", explanation: "Area = ½(6)(8)(1) = 24 sq units." },
            { key: "b", label: "(b)", prompt: "Find side $c$ using the cosine rule.", marks: 2, answer: "10", hint: "a² = b² + c² − 2bc cosA with A=90°. cos 90° = 0.", explanation: "c² = 6²+8²−0 = 100. c = 10." },
            { key: "c", label: "(c)", prompt: "Using the sine rule, find $\\sin A$ as a decimal.", marks: 1, answer: "0.6", hint: "sinA/a = sinC/c = 1/10.", explanation: "sinA = a sinC/c = 6×1/10 = 0.6." },
          ],
        },
        {
          id: "y11adv-nra-mp2",
          prompt: "In triangle $ABC$, $A=30°$, $B=90°$, $a=8$.",
          latex: "A=30^\\circ,\\; B=90^\\circ,\\; a=8",
          answer: "60",
          hint: "Angles sum to 180°. Use the sine rule to find b. For area, use the two legs at the right angle.",
          explanation: "(a) C = 60°. (b) b = 16. (c) Area ≈ 55 sq units (32√3).",
          parts: [
            { key: "a", label: "(a)", prompt: "Find angle $C$.", marks: 1, answer: "60", hint: "A + B + C = 180°. 30 + 90 + C = 180.", explanation: "C = 180 − 30 − 90 = 60°." },
            { key: "b", label: "(b)", prompt: "Find side $b$ (the hypotenuse) using the sine rule.", marks: 2, answer: "16", hint: "b/sinB = a/sinA. sin 90°=1, sin 30°=½.", explanation: "b = a sinB/sinA = 8×1/(½) = 16." },
            { key: "c", label: "(c)", prompt: "Find the area to the nearest square unit.", marks: 1, answer: "55", acceptedAnswers: ["55", "56", "32√3", "55.4"], hint: "Area = ½ab sinC. C=60°, a=8, b=16.", explanation: "Area = ½(8)(16)sin60° = 64×(√3/2) = 32√3 ≈ 55.4 ≈ 55 sq units." },
          ],
        },
      ],
    };
  }

  // ── Ambiguous case of the sine rule ──────────────────────────────────────
  if (lesson.slug === "ambiguous-case-sine-rule") {
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
        qa("y11adv-amb-g1", "$A=30°$, $b=8$, $a=4$. Compute $b\\sin A$.", "b\\sin A = 8\\times\\tfrac{1}{2}", "4", "bsinA = 8 × sin30° = 8 × ½ = 4.", "b sinA = 8 × 0.5 = 4."),
        qa("y11adv-amb-g2", "$A=30°$, $b=8$, $a=3$. Since $a=3 < b\\sin A=4$, how many triangles exist?", "a < b\\sin A \\Rightarrow", "0", "a < threshold → no triangle possible.", "0 triangles: a is too short to reach the base."),
        qa("y11adv-amb-g3", "$A=30°$, $b=8$, $a=6$. Since $b\\sin A=4 < 6 < 8=b$, how many triangles exist?", "b\\sin A < a < b \\Rightarrow", "2", "Ambiguous case: a is between threshold and b.", "2 triangles: this is the ambiguous case."),
        qa("y11adv-amb-g4", "$A=30°$, $b=8$, $a=10$. Since $a=10 > b=8$, how many triangles exist?", "a > b \\Rightarrow", "1", "a > b means the swing can only reach in one direction.", "1 triangle: a exceeds b so only one position is possible."),
      ],
      independentPractice: [
        qa("y11adv-amb-i1", "$A=30°$, $b=12$, $a=6$. How many triangles? (Threshold $b\\sin A = 6$.)", "b\\sin A = 6,\\; a = b\\sin A \\Rightarrow", "1", "a = bsinA exactly → one right-angled triangle.", "1 triangle: a equals the threshold, giving exactly one (right-angled) triangle."),
        qa("y11adv-amb-i2", "$A=30°$, $b=12$, $a=4$. How many triangles?", "b\\sin A=6,\\; a=4 < 6 \\Rightarrow", "0", "a < threshold → no triangle.", "0 triangles: a < bsinA."),
        qa("y11adv-amb-i3", "$A=30°$, $b=12$, $a=8$. How many triangles?", "b\\sin A=6,\\; 6<8<12 \\Rightarrow", "2", "Threshold=6, a=8, b=12. Ambiguous case.", "2 triangles: bsinA < a < b."),
        qa("y11adv-amb-i4", "$A=30°$, $b=12$, $a=15$. How many triangles?", "a=15 > b=12 \\Rightarrow", "1", "a > b → one triangle.", "1 triangle: a exceeds b."),
        qa("y11adv-amb-i5", "In the ambiguous case, $B_1 = 50°$. Find $B_2$.", "B_2 = 180^\\circ - 50^\\circ", "130", "B₂ = 180° − B₁ = 180 − 50.", "B₂ = 130°."),
      ],
      commonMistakes: [
        { mistake: "Comparing a with b only, without computing bsinA first.", fix: "Always find the threshold bsinA before deciding. The comparison is a vs bsinA AND a vs b — both conditions are needed." },
        { mistake: "Assuming one triangle whenever a < b.", fix: "If a < b but a > bsinA, there are two triangles (ambiguous case). The threshold bsinA, not b itself, is the critical comparison." },
        { mistake: "Forgetting to check whether the second triangle is valid after finding B₂.", fix: "Check A + B₂ < 180°. If the sum reaches or exceeds 180°, the second triangle is impossible." },
        { mistake: "Only reporting one answer in the ambiguous case.", fix: "When bsinA < a < b, always report both triangles. State B₁ and B₂ = 180° − B₁, and find the corresponding angles C and sides c for each." },
      ],
      masteryQuiz: [
        qa("y11adv-amb-m1", "$A=30°$, $b=20$, $a=10$. Compute $b\\sin A$ then state the number of triangles.", "b\\sin A=10,\\; a=b\\sin A \\Rightarrow", "1", "bsinA = 20×½ = 10 = a → exactly one right-angled triangle.", "1 triangle."),
        qa("y11adv-amb-m2", "$A=30°$, $b=20$, $a=8$. How many triangles?", "b\\sin A=10,\\; a=8<10 \\Rightarrow", "0", "a=8 < bsinA=10 → no triangle.", "0 triangles."),
        qa("y11adv-amb-m3", "$A=30°$, $b=20$, $a=15$. How many triangles?", "b\\sin A=10,\\; 10<15<20 \\Rightarrow", "2", "10 < 15 < 20 → ambiguous case.", "2 triangles."),
        qa("y11adv-amb-m4", "$A=30°$, $b=20$, $a=22$. How many triangles?", "a=22 > b=20 \\Rightarrow", "1", "a > b → one triangle.", "1 triangle."),
        qa("y11adv-amb-m5", "$A=60°$, $b=8$, $a=7$. How many triangles? (Threshold $\\approx 6.93$.)", "b\\sin A=4\\sqrt{3}\\approx 6.93,\\; 6.93 < 7 < 8 \\Rightarrow", "2", "bsinA = 8sin60° = 4√3 ≈ 6.93. a=7 is between threshold and b.", "2 triangles: bsinA < a < b."),
        qa("y11adv-amb-m6", "$A=60°$, $b=8$, $a=5$. How many triangles?", "b\\sin A\\approx 6.93,\\; a=5 < 6.93 \\Rightarrow", "0", "a=5 < bsinA≈6.93 → no triangle.", "0 triangles."),
        qa("y11adv-amb-m7", "$A=60°$, $b=8$, $a=9$. How many triangles?", "a=9 > b=8 \\Rightarrow", "1", "a > b → one triangle.", "1 triangle."),
        qa("y11adv-amb-m8", "$A=60°$, $b=10$, $a=9$. How many triangles? (Threshold $\\approx 8.66$.)", "b\\sin A=5\\sqrt{3}\\approx 8.66,\\; 8.66 < 9 < 10 \\Rightarrow", "2", "bsinA = 10sin60° = 5√3 ≈ 8.66. a=9 is between threshold and b.", "2 triangles: ambiguous case."),
        qa("y11adv-amb-m9", "In the ambiguous case with $B_1=40°$, find $B_2$.", "B_2 = 180^\\circ - 40^\\circ", "140", "B₂ = 180° − 40° = 140°.", "B₂ = 140°."),
        practicalChoice("y11adv-amb-m10", "The ambiguous case arises only when:", "B", ["angle A is obtuse", "A is acute, a < b, and a > b sinA", "a > b and A is acute", "all three sides are known"], "The two-triangle case requires A to be acute, the given side a to be shorter than b but longer than the threshold bsinA.", ""),
      ],
      masteryQuizPool: [
        { id: "y11adv-amb-p1", prompt: "$A=30°$, $b=8$, $a=4$. Compute $b\\sin A$.", latex: "b\\sin A=8\\times\\tfrac12", answer: "4", difficulty: 1, hint: "$\\sin 30^\\circ=\\frac12$.", explanation: "$b\\sin A=8\\times0.5=4$." },
        { id: "y11adv-amb-p2", prompt: "$A=30°$, $b=20$, $a=10$. Compute $b\\sin A$.", latex: "b\\sin A=20\\times\\tfrac12", answer: "10", difficulty: 1, hint: "$\\sin 30^\\circ=\\frac12$.", explanation: "$b\\sin A=20\\times0.5=10$." },
        { id: "y11adv-amb-p3", prompt: "In the ambiguous case $B_1=50°$. Find $B_2$.", latex: "B_2=180^\\circ-B_1", answer: "130", difficulty: 1, acceptedAnswers: ["130 degrees", "130°"], hint: "$180-B_1$.", explanation: "$B_2=180-50=130^\\circ$." },
        { id: "y11adv-amb-p4", prompt: "Which condition gives exactly two triangles (A acute)?", latex: "\\text{SSA cases}", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$a<b\\sin A$" }, { label: "B", text: "$a=b\\sin A$" }, { label: "C", text: "$b\\sin A<a<b$" }, { label: "D", text: "$a\\geq b$" }], hint: "Between the threshold and $b$.", explanation: "$b\\sin A<a<b$ gives two triangles." },
        { id: "y11adv-amb-p5", prompt: "$A=30°$, $b=8$, $a=3$. How many triangles? (Threshold 4.)", latex: "a<b\\sin A", answer: "0", difficulty: 2, hint: "$a<$ threshold.", explanation: "$3<4$, so 0 triangles." },
        { id: "y11adv-amb-p6", prompt: "$A=30°$, $b=8$, $a=6$. How many triangles? (Threshold 4.)", latex: "b\\sin A<a<b", answer: "2", difficulty: 2, hint: "$4<6<8$.", explanation: "Ambiguous case: 2 triangles." },
        { id: "y11adv-amb-p7", prompt: "$A=30°$, $b=8$, $a=10$. How many triangles?", latex: "a\\geq b", answer: "1", difficulty: 2, hint: "$a>b$.", explanation: "$a>b$ gives 1 triangle." },
        { id: "y11adv-amb-p8", prompt: "$A=30°$, $b=12$, $a=6$. How many triangles? (Threshold 6.)", latex: "a=b\\sin A", answer: "1", difficulty: 2, hint: "$a=$ threshold.", explanation: "$a=b\\sin A$ gives 1 right-angled triangle." },
        { id: "y11adv-amb-p9", prompt: "$A=30°$, $b=20$, $a=15$. How many triangles? (Threshold 10.)", latex: "10<15<20", answer: "2", difficulty: 3, hint: "$b\\sin A<a<b$.", explanation: "$10<15<20$, so 2 triangles." },
        { id: "y11adv-amb-p10", prompt: "$A=30°$, $b=20$, $a=8$. How many triangles? (Threshold 10.)", latex: "a<b\\sin A", answer: "0", difficulty: 3, hint: "$8<10$.", explanation: "$8<10$, so 0 triangles." },
        { id: "y11adv-amb-p11", prompt: "$A=30°$, $b=20$, $a=22$. How many triangles?", latex: "a\\geq b", answer: "1", difficulty: 3, hint: "$a>b$.", explanation: "$22>20$, so 1 triangle." },
        { id: "y11adv-amb-p12", prompt: "In the ambiguous case $B_1=40°$. Find $B_2$.", latex: "B_2=180^\\circ-40^\\circ", answer: "140", difficulty: 3, acceptedAnswers: ["140 degrees", "140°"], hint: "$180-B_1$.", explanation: "$B_2=140^\\circ$." },
        { id: "y11adv-amb-p13", prompt: "$A=60°$, $b=8$, $a=7$. How many triangles? (Threshold $\\approx6.93$.)", latex: "6.93<7<8", answer: "2", difficulty: 4, hint: "$b\\sin A=4\\sqrt3\\approx6.93$.", explanation: "$6.93<7<8$, so 2 triangles." },
        { id: "y11adv-amb-p14", prompt: "$A=60°$, $b=8$, $a=5$. How many triangles? (Threshold $\\approx6.93$.)", latex: "a<b\\sin A", answer: "0", difficulty: 4, hint: "$5<6.93$.", explanation: "$5<6.93$, so 0 triangles." },
        { id: "y11adv-amb-p15", prompt: "$A=60°$, $b=8$, $a=9$. How many triangles?", latex: "a\\geq b", answer: "1", difficulty: 4, hint: "$9>8$.", explanation: "$a>b$, so 1 triangle." },
        { id: "y11adv-amb-p16", prompt: "$A=60°$, $b=10$, $a=9$. How many triangles? (Threshold $\\approx8.66$.)", latex: "8.66<9<10", answer: "2", difficulty: 4, hint: "$b\\sin A=5\\sqrt3\\approx8.66$.", explanation: "$8.66<9<10$, so 2 triangles." },
        { id: "y11adv-amb-p17", prompt: "A student assumes one triangle because $a<b$. Identify the error.", latex: "a<b", answer: "B", difficulty: 4, choices: [{ label: "A", text: "$a<b$ always means 0 triangles" }, { label: "B", text: "If $a>b\\sin A$ too, there are 2 triangles" }, { label: "C", text: "$a<b$ means 1 triangle always" }, { label: "D", text: "$a<b$ means a right triangle" }], hint: "The threshold $b\\sin A$ is the key comparison.", explanation: "When $b\\sin A<a<b$, there are two triangles, not one." },
        { id: "y11adv-amb-p18", prompt: "$A=30°$, $b=10$, $a=7$. Find $\\sin B$ to 2 decimal places. (Threshold 5.)", latex: "\\sin B=b\\sin A/a", answer: "0.71", difficulty: 5, acceptedAnswers: ["0.714", "5/7"], hint: "$\\sin B=\\frac{5}{7}$.", explanation: "$\\sin B=\\frac{10\\times0.5}{7}=\\frac{5}{7}\\approx0.71$." },
        { id: "y11adv-amb-p19", prompt: "$A=30°$, $b=12$, $a=8$. Find $\\sin B$ to 2 decimal places. (Threshold 6.)", latex: "\\sin B=b\\sin A/a", answer: "0.75", difficulty: 5, acceptedAnswers: ["3/4", "0.750"], hint: "$\\sin B=\\frac{6}{8}$.", explanation: "$\\sin B=\\frac{12\\times0.5}{8}=\\frac{6}{8}=0.75$." },
        { id: "y11adv-amb-p20", prompt: "In an ambiguous-case triangle, $A=40°$ and $B_1=75°$. For the second triangle, $B_2=105°$. Find $C_2$ in degrees.", latex: "C_2=180^\\circ-A-B_2", answer: "35", difficulty: 5, acceptedAnswers: ["35 degrees", "35°"], hint: "$C_2=180-40-105$.", explanation: "$C_2=180-40-105=35^\\circ$." },
        { id: "y11adv-amb-p21", prompt: "$A=50°$, $B_1=80°$. Is the second triangle ($B_2=100°$) valid? Enter the value of $A+B_2$ in degrees.", latex: "A+B_2", answer: "150", difficulty: 5, acceptedAnswers: ["150 degrees", "150°"], hint: "$50+100$. Valid if $<180$.", explanation: "$A+B_2=150°<180°$, so the second triangle is valid." },
        { id: "y11adv-amb-p22", prompt: "$A=70°$, $B_1=80°$. For the second triangle $B_2=100°$. Find $A+B_2$ in degrees, which decides validity.", latex: "A+B_2", answer: "170", difficulty: 5, acceptedAnswers: ["170 degrees", "170°"], hint: "$70+100$.", explanation: "$A+B_2=170°<180°$, so the second triangle is just valid." },
        { id: "y11adv-amb-p23", prompt: "$A=45°$, $b=10$, $a=6$. Compute $b\\sin A$ to 2 decimal places.", latex: "b\\sin A=10\\times\\tfrac{\\sqrt2}{2}", answer: "7.07", difficulty: 3, acceptedAnswers: ["7.07", "5√2", "7.1"], hint: "$\\sin 45^\\circ=\\frac{\\sqrt2}{2}$.", explanation: "$b\\sin A=10\\times0.707=7.07$." },
        { id: "y11adv-amb-p24", prompt: "$A=45°$, $b=10$, $a=6$. How many triangles? (Threshold $\\approx7.07$.)", latex: "a<b\\sin A", answer: "0", difficulty: 3, hint: "$6<7.07$.", explanation: "$6<7.07$, so 0 triangles." },
        { id: "y11adv-amb-p25", prompt: "$A=30°$, $b=14$, $a=7$. How many triangles? (Threshold 7.)", latex: "a=b\\sin A", answer: "1", difficulty: 3, hint: "$a=$ threshold.", explanation: "$a=7=b\\sin A$, so 1 right-angled triangle." },
        { id: "y11adv-amb-p26", prompt: "$A=30°$, $b=16$, $a=10$. How many triangles? (Threshold 8.)", latex: "8<10<16", answer: "2", difficulty: 4, hint: "$b\\sin A<a<b$.", explanation: "$8<10<16$, so 2 triangles." },
        { id: "y11adv-amb-p27", prompt: "Which statement about the ambiguous case is true?", latex: "\\text{ambiguous case}", answer: "B", difficulty: 4, choices: [{ label: "A", text: "It arises when A is obtuse" }, { label: "B", text: "It arises when A is acute, $b\\sin A<a<b$" }, { label: "C", text: "It arises when $a>b$" }, { label: "D", text: "It arises when all three sides are known" }], hint: "Two triangles need $b\\sin A<a<b$ with A acute.", explanation: "The ambiguous case needs A acute and $b\\sin A<a<b$." },
        { id: "y11adv-amb-p28", prompt: "In the ambiguous case $B_1=35°$. Find $B_2$.", latex: "B_2=180^\\circ-35^\\circ", answer: "145", difficulty: 2, acceptedAnswers: ["145 degrees", "145°"], hint: "$180-B_1$.", explanation: "$B_2=145^\\circ$." },
        { id: "y11adv-amb-p29", prompt: "$A=30°$, $b=12$, $a=4$. How many triangles? (Threshold 6.)", latex: "a<b\\sin A", answer: "0", difficulty: 2, hint: "$4<6$.", explanation: "$4<6$, so 0 triangles." },
        { id: "y11adv-amb-p30", prompt: "$A=30°$, $b=18$, $a=9$. How many triangles? (Threshold 9.)", latex: "a=b\\sin A", answer: "1", difficulty: 4, hint: "$a=$ threshold.", explanation: "$a=9=b\\sin A$, so exactly 1 right-angled triangle." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-amb-mp1",
          prompt: "In triangle $ABC$, $A=30°$, $b=10$, $a=7$.",
          latex: "A=30^\\circ,\\; b=10,\\; a=7",
          answer: "5",
          hint: "First find bsinA. Compare a with bsinA and b to count triangles. Then use the sine rule to find sinB.",
          explanation: "(a) bsinA = 5. (b) 5 < 7 < 10, so 2 triangles. (c) sinB = 5/7 ≈ 0.71.",
          parts: [
            { key: "a", label: "(a)", prompt: "Calculate $b\\sin A$.", marks: 1, answer: "5", hint: "b sinA = 10 × sin 30° = 10 × ½.", explanation: "b sinA = 10 × ½ = 5." },
            { key: "b", label: "(b)", prompt: "How many triangles are possible?", marks: 1, answer: "2", hint: "Compare a=7 with bsinA=5 and b=10.", explanation: "5 < 7 < 10, so bsinA < a < b → 2 triangles (ambiguous case)." },
            { key: "c", label: "(c)", prompt: "Find $\\sin B$ to 2 decimal places.", marks: 1, answer: "0.71", acceptedAnswers: ["0.71", "0.714", "5/7"], hint: "sinB = bsinA/a = 5/7.", explanation: "sinB = 5/7 ≈ 0.71." },
          ],
        },
        {
          id: "y11adv-amb-mp2",
          prompt: "In triangle $ABC$, $A=30°$, $b=10$, $a=5$.",
          latex: "A=30^\\circ,\\; b=10,\\; a=5",
          answer: "5",
          hint: "Find bsinA and compare with a. If a = bsinA, what angle does B take? Then find C.",
          explanation: "(a) bsinA = 5. (b) a = bsinA → 1 triangle (right angle at B). (c) C = 60°.",
          parts: [
            { key: "a", label: "(a)", prompt: "Calculate $b\\sin A$.", marks: 1, answer: "5", hint: "b sinA = 10 × sin 30°.", explanation: "b sinA = 10 × ½ = 5." },
            { key: "b", label: "(b)", prompt: "How many triangles are possible?", marks: 1, answer: "1", hint: "Compare a with bsinA.", explanation: "a = 5 = bsinA = 5. Exactly one triangle with a right angle at B." },
            { key: "c", label: "(c)", prompt: "Since $B=90°$, find angle $C$.", marks: 1, answer: "60", hint: "A + B + C = 180°.", explanation: "C = 180° − 30° − 90° = 60°." },
          ],
        },
      ],
    };
  }

  return null;
}

