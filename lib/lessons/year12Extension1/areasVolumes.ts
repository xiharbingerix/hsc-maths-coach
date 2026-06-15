import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function volChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Choose the best option.}",
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Identify whether the problem asks for area (subtract functions) or volume (square and multiply by π).",
    explanation,
  };
}

function volTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Set up the integral with correct limits, evaluate it, then multiply by π for volumes.",
    explanation,
  };
}

// ─── Lesson: Areas Between Curves and Volumes of Revolution ─────────────────

const areasAndVolumes: Partial<ExplicitLesson> = {
  description:
    "Calculate areas enclosed between two curves and volumes of solids formed by rotating a region about the x-axis or y-axis.",
  learningIntention:
    "Set up and evaluate definite integrals to find areas between curves and volumes of revolution about the x- or y-axis, including the region between two curves.",
  successCriteria: [
    "Find intersection points to determine the limits of integration for area between curves.",
    "Evaluate A = ∫[a to b] (f(x) − g(x)) dx when f(x) ≥ g(x) on [a, b].",
    "Apply V = π∫[a to b] [f(x)]² dx for volume of revolution about the x-axis.",
    "Apply V = π∫[a to b] ([f(x)]² − [g(x)]²) dx for volume between two curves rotated about the x-axis.",
  ],
  teaching: {
    paragraphs: [
      "When two curves f(x) and g(x) intersect at x = a and x = b, with f(x) ≥ g(x) on [a, b], the area enclosed between them is A = ∫[a to b] (f(x) − g(x)) dx. Always find the intersection points first — these give the limits of integration.",
      "A solid of revolution is formed by rotating a region about an axis. If the arc y = f(x) (with f(x) ≥ 0) is rotated about the x-axis from x = a to x = b, each cross-section is a disk of radius f(x), so the volume is V = π∫[a to b] [f(x)]² dx.",
      "When the region between two curves y = f(x) (outer) and y = g(x) (inner), with f(x) ≥ g(x) ≥ 0, is rotated about the x-axis, each cross-section is an annulus (washer). The volume is V = π∫[a to b] ([f(x)]² − [g(x)]²) dx.",
      "For rotation about the y-axis, rewrite x as a function of y: x = g(y), then V = π∫[c to d] [g(y)]² dy where c and d are the y-values at the boundary. The method is identical but the variable is y.",
    ],
    latexBlocks: [
      "A = \\int_a^b \\bigl(f(x)-g(x)\\bigr)\\,dx \\quad (f(x)\\ge g(x))",
      "V = \\pi\\int_a^b \\bigl[f(x)\\bigr]^2\\,dx \\quad \\text{(about x-axis)}",
      "V = \\pi\\int_a^b \\Bigl(\\bigl[f(x)\\bigr]^2 - \\bigl[g(x)\\bigr]^2\\Bigr)\\,dx \\quad \\text{(washer method)}",
      "V = \\pi\\int_c^d \\bigl[g(y)\\bigr]^2\\,dy \\quad \\text{(about y-axis)}",
    ],
  },
  workedExamples: [
    {
      title: "Area between y = x + 2 and y = x²",
      questionLatex:
        "\\text{Find the area of the region enclosed by }y=x+2\\text{ and }y=x^2.",
      steps: [
        {
          explanation: "Find the intersections by solving x + 2 = x².",
          latex: "x^2-x-2=0 \\;\\Rightarrow\\; (x-2)(x+1)=0 \\;\\Rightarrow\\; x=-1,\\;x=2",
        },
        {
          explanation: "Check which curve is on top on [−1, 2]. At x = 0: x+2 = 2 > x² = 0, so y = x+2 is above y = x².",
          latex: "A = \\int_{-1}^{2}\\bigl[(x+2)-x^2\\bigr]\\,dx",
        },
        {
          explanation: "Evaluate the integral.",
          latex:
            "A = \\left[\\frac{x^2}{2}+2x-\\frac{x^3}{3}\\right]_{-1}^{2} = \\left(2+4-\\frac{8}{3}\\right)-\\left(\\frac{1}{2}-2+\\frac{1}{3}\\right)",
        },
        {
          explanation: "Simplify each bracket and subtract.",
          latex: "= \\frac{10}{3}-\\left(-\\frac{7}{6}\\right) = \\frac{20}{6}+\\frac{7}{6} = \\frac{27}{6} = \\frac{9}{2}",
        },
      ],
      finalAnswerLatex: "A = \\dfrac{9}{2}\\text{ square units}",
    },
    {
      title: "Volume rotating y = √x about the x-axis",
      questionLatex:
        "\\text{Find the volume of the solid formed by rotating the arc }y=\\sqrt{x}\\text{ about the x-axis from }x=0\\text{ to }x=4.",
      steps: [
        {
          explanation: "Apply the volume formula with f(x) = √x.",
          latex: "V = \\pi\\int_0^4 \\bigl(\\sqrt{x}\\bigr)^2\\,dx = \\pi\\int_0^4 x\\,dx",
        },
        {
          explanation: "Evaluate the integral.",
          latex: "V = \\pi\\left[\\frac{x^2}{2}\\right]_0^4 = \\pi\\cdot\\frac{16}{2} = 8\\pi",
        },
      ],
      finalAnswerLatex: "V = 8\\pi\\text{ cubic units}",
    },
  ],
  guidedPractice: [
    volChoice(
      "y12e1-vol-g1",
      "Which formula gives the volume when y = f(x) ≥ 0 is rotated about the x-axis from x = a to x = b?",
      "C",
      [
        "V = ∫[a to b] f(x) dx",
        "V = 2π∫[a to b] x·f(x) dx",
        "V = π∫[a to b] [f(x)]² dx",
        "V = π∫[a to b] f(x) dx",
      ],
      "Each disk has radius f(x) and thickness dx; its volume is π[f(x)]²dx. Summing these gives V = π∫[f(x)]²dx."
    ),
    volTyped(
      "y12e1-vol-g2",
      "Find the volume when y = 3 is rotated about the x-axis from x = 0 to x = 4.",
      "V = \\pi\\int_0^4 9\\,dx = 9\\pi[x]_0^4",
      "36pi",
      ["36π", "36\\pi"],
      "V = π(9)(4) = 36π cubic units."
    ),
    volTyped(
      "y12e1-vol-g3",
      "Find the area enclosed between y = 4 and y = x² from x = −2 to x = 2.",
      "A = \\int_{-2}^{2}(4-x^2)\\,dx = \\left[4x-\\tfrac{x^3}{3}\\right]_{-2}^{2}",
      "32/3",
      ["32/3", "10.67", "10.666"],
      "(8 − 8/3) − (−8 + 8/3) = 16 − 16/3 = 32/3 square units."
    ),
    volChoice(
      "y12e1-vol-g4",
      "The area between y = 3x and y = x², from x = 0 to x = 3, equals:",
      "B",
      ["3", "9/2", "27/2", "9"],
      "∫₀³(3x − x²) dx = [3x²/2 − x³/3]₀³ = 27/2 − 9 = 9/2 square units."
    ),
  ],
  independentPractice: [
    volTyped(
      "y12e1-vol-i1",
      "Find the volume when y = 2x is rotated about the x-axis from x = 0 to x = 3.",
      "V = \\pi\\int_0^3 4x^2\\,dx = \\pi\\left[\\tfrac{4x^3}{3}\\right]_0^3",
      "36pi",
      ["36π", "36\\pi"],
      "V = π · 4·27/3 = π · 36 = 36π cubic units."
    ),
    volTyped(
      "y12e1-vol-i2",
      "Find the area enclosed between y = x and y = x² from x = 0 to x = 1.",
      "A = \\int_0^1 (x-x^2)\\,dx = \\left[\\tfrac{x^2}{2}-\\tfrac{x^3}{3}\\right]_0^1",
      "1/6",
      ["1/6", "0.1667", "0.167"],
      "1/2 − 1/3 = 3/6 − 2/6 = 1/6 square units."
    ),
    volChoice(
      "y12e1-vol-i3",
      "The volume when y = x² is rotated about the x-axis from x = 0 to x = 2 equals:",
      "D",
      ["8π", "4π", "16π/3", "32π/5"],
      "V = π∫₀²x⁴dx = π[x⁵/5]₀² = 32π/5 cubic units."
    ),
    volTyped(
      "y12e1-vol-i4",
      "Find the volume of the solid formed when the region between y = 2 (outer) and y = x (inner) is rotated about the x-axis from x = 0 to x = 2.",
      "V = \\pi\\int_0^2(4-x^2)\\,dx = \\pi\\left[4x-\\tfrac{x^3}{3}\\right]_0^2",
      "16pi/3",
      ["16π/3", "16\\pi/3"],
      "V = π(8 − 8/3) = π · 16/3 = 16π/3 cubic units."
    ),
    volChoice(
      "y12e1-vol-i5",
      "To find the area between y = 3x and y = x², the first step is:",
      "A",
      [
        "Solve 3x = x² to find the intersection points.",
        "Integrate 3x from 0 to 3.",
        "Multiply 3x by x².",
        "Differentiate 3x − x².",
      ],
      "Always find the intersection points first — these give the limits of integration for the area integral."
    ),
  ],
  masteryQuiz: [
    volChoice(
      "y12e1-vol-m1",
      "Which integral correctly computes the volume when y = f(x) ≥ 0 is rotated about the x-axis from a to b?",
      "B",
      [
        "∫[a to b] f(x) dx",
        "π∫[a to b] [f(x)]² dx",
        "2π∫[a to b] f(x) dx",
        "∫[a to b] [f(x)]² dx",
      ],
      "The disk at position x has radius f(x) so its area is π[f(x)]²; integrating gives V = π∫[f(x)]²dx."
    ),
    volTyped(
      "y12e1-vol-m2",
      "Find the volume when y = √x is rotated about the x-axis from x = 0 to x = 4.",
      "V = \\pi\\int_0^4 x\\,dx = \\pi\\left[\\tfrac{x^2}{2}\\right]_0^4",
      "8pi",
      ["8π", "8\\pi"],
      "V = π · 16/2 = 8π cubic units."
    ),
    volTyped(
      "y12e1-vol-m3",
      "Find the area enclosed between y = 3x and y = x².",
      "\\text{Intersections: }3x=x^2\\Rightarrow x=0,3.\\quad A=\\int_0^3(3x-x^2)\\,dx",
      "9/2",
      ["4.5", "9/2"],
      "A = [3x²/2 − x³/3]₀³ = 27/2 − 9 = 9/2 square units."
    ),
    volChoice(
      "y12e1-vol-m4",
      "To find the area between y = x + 2 and y = x², the limits of integration come from:",
      "C",
      [
        "Setting y = 0 in each function.",
        "Using x = 0 and x = 2.",
        "Solving x + 2 = x² to find x = −1 and x = 2.",
        "Choosing any convenient interval.",
      ],
      "Intersection points give the natural limits: x² = x + 2 → x = −1, 2."
    ),
    volTyped(
      "y12e1-vol-m5",
      "Find the volume when y = x is rotated about the x-axis from x = 0 to x = 3.",
      "V = \\pi\\int_0^3 x^2\\,dx = \\pi\\left[\\tfrac{x^3}{3}\\right]_0^3",
      "9pi",
      ["9π", "9\\pi"],
      "V = π · 27/3 = 9π cubic units."
    ),
    volChoice(
      "y12e1-vol-m6",
      "The volume when a region between y = f(x) (outer) and y = g(x) (inner) is rotated about the x-axis is:",
      "A",
      [
        "π∫([f(x)]² − [g(x)]²) dx",
        "π∫(f(x) − g(x))² dx",
        "π∫([f(x)] − [g(x)]) dx",
        "π∫([f(x)]² + [g(x)]²) dx",
      ],
      "Each washer has outer radius f(x) and inner radius g(x); area = π([f(x)]² − [g(x)]²)."
    ),
    volTyped(
      "y12e1-vol-m7",
      "Find the volume when y = √x is rotated about the x-axis from x = 1 to x = 4.",
      "V = \\pi\\int_1^4 x\\,dx = \\pi\\left[\\tfrac{x^2}{2}\\right]_1^4",
      "15pi/2",
      ["15π/2", "15\\pi/2", "7.5pi", "7.5π"],
      "V = π(16/2 − 1/2) = π · 15/2 = 15π/2 cubic units."
    ),
    volChoice(
      "y12e1-vol-m8",
      "In the region between y = 4 and y = x² from x = −2 to x = 2, which curve is the top boundary?",
      "A",
      ["y = 4", "y = x²", "They are equal throughout.", "Neither — they don't enclose a region."],
      "At any x in [−2, 2], 4 ≥ x², so y = 4 is the upper boundary."
    ),
    volTyped(
      "y12e1-vol-m9",
      "Find the volume when the region between y = 3 (outer) and y = x (inner) is rotated about the x-axis from x = 0 to x = 3.",
      "V = \\pi\\int_0^3(9-x^2)\\,dx = \\pi\\left[9x-\\tfrac{x^3}{3}\\right]_0^3",
      "18pi",
      ["18π", "18\\pi"],
      "V = π(27 − 9) = 18π cubic units."
    ),
    volChoice(
      "y12e1-vol-m10",
      "A student forgets to square f(x) when computing volume and writes V = π∫f(x) dx instead of V = π∫[f(x)]² dx. What will happen to the answer?",
      "B",
      [
        "The answer will be too large because squaring removes negatives.",
        "The answer will generally be wrong because the disk radius must be squared to give the disk area.",
        "The answer will be correct if f(x) is linear.",
        "The answer will be unchanged because π absorbs the error.",
      ],
      "Area of a disk = π r² — the radius f(x) must be squared. Omitting the square gives the wrong formula entirely."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Registry ────────────────────────────────────────────────────────────────

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "calculus-applications-volumes": areasAndVolumes,
};

export function year12Extension1AreasVolumesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-1") return undefined;
  if (unit.slug !== "calculus-applications") return undefined;
  return lessons[lesson.slug];
}
