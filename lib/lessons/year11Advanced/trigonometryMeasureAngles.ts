import type { ExplicitLesson } from "../differentialCalculus";
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
    return {
      ...base,
      description:
        "Practise mixed assessment-style questions on radians, exact values, arc length, sector area, the unit circle, and basic trigonometric graphs.",
      learningIntention:
        "Apply angle-measure, exact-value, unit-circle, and trigonometric-graph skills to mixed assessment-style questions.",
      successCriteria: [
        "Convert common angles between degrees and radians.",
        "Use arc length and sector area formulas with radians.",
        "Evaluate exact trigonometric values using special triangles and quadrant signs.",
        "Use the unit-circle coordinate rule.",
        "Identify tangent undefined values and asymptotes.",
        "State basic sine, cosine, and tangent graph features.",
      ],
      teaching: {
        paragraphs: [
          "This exam-practice lesson mixes the skills from the unit. First identify whether the question is about angle conversion, arc length, sector area, exact values, the unit circle, or graph features.",
          "Keep exact answers in terms of pi where appropriate, and use radians for arc length and sector area formulas.",
          "For exact trigonometric values outside quadrant I, use the reference angle for the size and the quadrant for the sign.",
          "For graph questions, remember that sine and cosine have period $2\\pi$, while tangent has period $\\pi$ and vertical asymptotes.",
        ],
        latexBlocks: [
          "180^\\circ=\\pi",
          "s=r\\theta,\\quad A=\\frac12r^2\\theta",
          "(x,y)=(\\cos\\theta,\\sin\\theta)",
          "\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}",
          "y=\\sin x,\\ y=\\cos x:\\text{ period }2\\pi;\\quad y=\\tan x:\\text{ period }\\pi",
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

  return null;
}

