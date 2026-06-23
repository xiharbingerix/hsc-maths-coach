// Year 9 Wave 6 — Chapter 5 (Length, Area, Surface Area & Volume), 2D-measurement sections
// (ADR-Y9-001): length-and-perimeter (consol), area (consol), composite-shapes-perimeter-area (core).
// Full per-subtopic contract. (circle-circumference-sector-perimeter was authored in Wave 1.)

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Identify the shape and the right formula first.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the formula for this shape.", explanation };
}
const cm = (a: string) => [a, `${a} cm`, `${a}cm`];
const cm2 = (a: string) => [a, `${a} cm²`, `${a}cm²`, `${a} cm^2`];

// ── length-and-perimeter (consolidating) ───────────────────────────────────────────────
const lengthPerimeter: Partial<ExplicitLesson> = {
  description: "Find the perimeter of rectangles, squares and triangles, and missing sides.",
  learningIntention: "Calculate perimeters of simple shapes.",
  successCriteria: ["Find the perimeter of a rectangle.", "Find the perimeter of a square and triangle.", "Use correct length units.", "Find a missing side from the perimeter."],
  teaching: {
    paragraphs: [
      "The PERIMETER is the total distance around the outside of a shape — add up all the side lengths.",
      "A rectangle with length 5 and width 3 has perimeter 5 + 3 + 5 + 3 = 16, or 2(l + w). A square of side 7 has perimeter 4 × 7 = 28.",
      "For a triangle, add the three sides: 3 + 4 + 5 = 12.",
      "Perimeter is a LENGTH, measured in units like cm or m.",
    ],
    latexBlocks: ["P_{\\text{rect}} = 2(l+w)", "P_{\\text{square}} = 4s"],
  },
  workedExamples: [
    { title: "Rectangle", questionLatex: "\\text{Rectangle } 5 \\times 3. \\text{ Perimeter?}", steps: [{ explanation: "2(5 + 3).", latex: "16" }], finalAnswerLatex: "16" },
    { title: "Square", questionLatex: "\\text{Square side } 7. \\text{ Perimeter?}", steps: [{ explanation: "4 × 7.", latex: "28" }], finalAnswerLatex: "28" },
    { title: "Triangle", questionLatex: "\\text{Triangle } 3,4,5. \\text{ Perimeter?}", steps: [{ explanation: "3 + 4 + 5.", latex: "12" }], finalAnswerLatex: "12" },
  ],
  guidedPractice: [
    ans("y9-lp-g1", "Find the perimeter of a 6 cm by 4 cm rectangle.", "6\\times4", "20", 2, "2(6 + 4) = 20.", cm("20")),
    ans("y9-lp-g2", "Find the perimeter of a square with side 5 cm.", "s=5", "20", 2, "4 × 5 = 20.", cm("20")),
    ans("y9-lp-g3", "Find the perimeter of a triangle with sides 6, 8 and 10 cm.", "6,8,10", "24", 2, "6 + 8 + 10 = 24.", cm("24")),
    mcq("y9-lp-g4", "Perimeter is the:", "A", ["total distance around", "space inside", "longest side", "diagonal"], 2, "Perimeter is the distance around the boundary."),
  ],
  independentPractice: [
    ans("y9-lp-i1", "Find the perimeter of a 10 cm by 2 cm rectangle.", "10\\times2", "24", 2, "2(10 + 2) = 24.", cm("24")),
    ans("y9-lp-i2", "Find the perimeter of a square with side 9 cm.", "s=9", "36", 2, "4 × 9 = 36.", cm("36")),
    ans("y9-lp-i3", "Find the perimeter of an equilateral triangle with side 7 cm.", "s=7", "21", 2, "3 × 7 = 21.", cm("21")),
    ans("y9-lp-i4", "Find the perimeter of an 8 cm by 8 cm square.", "8\\times8", "32", 2, "4 × 8 = 32.", cm("32")),
    mcq("y9-lp-i5", "Perimeter is measured in:", "B", ["square units", "units of length", "cubic units", "degrees"], 2, "It is a length."),
  ],
  masteryQuiz: [
    ans("y9-lp-m1", "Find the perimeter of a 5 cm by 3 cm rectangle.", "5\\times3", "16", 2, "16.", cm("16")),
    ans("y9-lp-m2", "Find the perimeter of a square with side 12 cm.", "s=12", "48", 2, "48.", cm("48")),
    ans("y9-lp-m3", "Find the perimeter of a triangle with sides 5, 12 and 13 cm.", "5,12,13", "30", 2, "30.", cm("30")),
    ans("y9-lp-m4", "Find the perimeter of a 9 cm by 6 cm rectangle.", "9\\times6", "30", 2, "2(9 + 6) = 30.", cm("30")),
    mcq("y9-lp-m5", "The perimeter of a regular pentagon with side s is:", "C", ["4s", "3s", "5s", "6s"], 2, "Five equal sides → 5s."),
    ans("y9-lp-m6", "Find the perimeter of a regular pentagon with side 4 cm.", "s=4", "20", 2, "5 × 4 = 20.", cm("20")),
    ans("y9-lp-m7", "Find the perimeter of an 11 cm by 4 cm rectangle.", "11\\times4", "30", 2, "2(11 + 4) = 30.", cm("30")),
    ans("y9-lp-m8", "Find the perimeter of a square with side 2.5 cm.", "s=2.5", "10", 2, "4 × 2.5 = 10.", cm("10")),
    ans("y9-lp-m9", "Find the perimeter of a triangle with sides 9, 12 and 15 cm.", "9,12,15", "36", 2, "36.", cm("36")),
    mcq("y9-lp-m10", "The perimeter of a rectangle is:", "A", ["2(l + w)", "l × w", "l + w", "4l"], 2, "P = 2(l + w)."),
  ],
  masteryQuizPool: [
    ans("y9-lp-p1", "A rectangle has perimeter 20 cm and width 4 cm. Find its length.", "P=20,w=4", "6", 5, "2(l + 4) = 20 → l = 6.", cm("6")),
    ans("y9-lp-p2", "A square has perimeter 36 cm. Find its side length.", "P=36", "9", 5, "36 ÷ 4 = 9.", cm("9")),
    ans("y9-lp-p3", "An L-shape is a 6×4 rectangle with a 2×2 square removed from a corner. Find its perimeter.", "\\text{L-shape}", "20", 5, "The L's outer edges still total 2(6 + 4) = 20.", cm("20")),
    ans("y9-lp-p4", "A rectangle has perimeter 30 cm and length 9 cm. Find its width.", "P=30,l=9", "6", 5, "2(9 + w) = 30 → w = 6.", cm("6")),
    ans("y9-lp-p5", "An isosceles triangle has two sides of 8 cm and a base of 5 cm. Find its perimeter.", "8,8,5", "21", 5, "8 + 8 + 5 = 21.", cm("21")),
    ans("y9-lp-p6", "A regular hexagon has perimeter 48 cm. Find its side length.", "P=48", "8", 5, "48 ÷ 6 = 8.", cm("8")),
    ans("y9-lp-p7", "A rectangle's length is twice its width and its perimeter is 36 cm. Find the width.", "l=2w,P=36", "6", 5, "2(2w + w) = 36 → 6w = 36 → w = 6.", cm("6")),
    ans("y9-lp-p8", "A square has perimeter 50 cm. Find its side length.", "P=50", "12.5", 5, "50 ÷ 4 = 12.5.", cm("12.5")),
    ans("y9-lp-p9", "A triangle has perimeter 30 cm with two sides 11 cm and 7 cm. Find the third side.", "P=30,11,7", "12", 5, "30 − 11 − 7 = 12.", cm("12")),
    ans("y9-lp-p10", "A rectangular field 50 m by 30 m is fenced. Find the length of fencing.", "50\\times30", "160", 5, "2(50 + 30) = 160 m.", ["160", "160 m"]),
  ],
  commonMistakes: [
    { mistake: "Adding only two sides of a rectangle.", fix: "Perimeter = 2(l + w), all four sides." },
    { mistake: "Multiplying length by width for perimeter.", fix: "That gives area, not perimeter." },
    { mistake: "Using the wrong number of sides.", fix: "Count every side of the shape." },
    { mistake: "Giving perimeter in square units.", fix: "Perimeter is a length (cm, m)." },
  ],
  masteryPassMark: 0.8,
};

// ── area (consolidating) ───────────────────────────────────────────────────────────────
const area: Partial<ExplicitLesson> = {
  description: "Find the area of rectangles, squares, triangles and parallelograms.",
  learningIntention: "Calculate areas of common shapes.",
  successCriteria: ["Find rectangle and square areas.", "Use ½bh for triangles.", "Use bh for parallelograms.", "Use square units."],
  teaching: {
    paragraphs: [
      "AREA is the space inside a shape, measured in SQUARE units (cm², m²).",
      "Rectangle: A = l × w (a 5 by 3 rectangle has area 15). Square: A = s² (side 7 → 49).",
      "Triangle: A = ½ × base × height (b = 6, h = 4 → 12). Parallelogram: A = base × height.",
      "Use the PERPENDICULAR height, not a slanted side, for triangles and parallelograms.",
    ],
    latexBlocks: ["A_{\\text{rect}} = lw,\\ A_{\\text{square}} = s^2", "A_{\\triangle} = \\tfrac12 bh"],
  },
  workedExamples: [
    { title: "Rectangle", questionLatex: "5 \\times 3 \\text{ rectangle. Area?}", steps: [{ explanation: "5 × 3.", latex: "15" }], finalAnswerLatex: "15" },
    { title: "Triangle", questionLatex: "b=6, h=4. \\text{ Area?}", steps: [{ explanation: "½ × 6 × 4.", latex: "12" }], finalAnswerLatex: "12" },
    { title: "Square", questionLatex: "\\text{Side } 7. \\text{ Area?}", steps: [{ explanation: "7².", latex: "49" }], finalAnswerLatex: "49" },
  ],
  guidedPractice: [
    ans("y9-ar-g1", "Find the area of an 8 cm by 4 cm rectangle.", "8\\times4", "32", 2, "32.", cm2("32")),
    ans("y9-ar-g2", "Find the area of a triangle with base 10 cm and height 6 cm.", "\\tfrac12(10)(6)", "30", 2, "½ × 60 = 30.", cm2("30")),
    ans("y9-ar-g3", "Find the area of a square with side 5 cm.", "s=5", "25", 2, "25.", cm2("25")),
    mcq("y9-ar-g4", "The area of a triangle is:", "B", ["bh", "½bh", "2bh", "b + h"], 2, "A = ½bh."),
  ],
  independentPractice: [
    ans("y9-ar-i1", "Find the area of a 12 cm by 5 cm rectangle.", "12\\times5", "60", 2, "60.", cm2("60")),
    ans("y9-ar-i2", "Find the area of a triangle with base 8 cm and height 5 cm.", "\\tfrac12(8)(5)", "20", 2, "½ × 40 = 20.", cm2("20")),
    ans("y9-ar-i3", "Find the area of a parallelogram with base 7 cm and height 4 cm.", "7\\times4", "28", 2, "28.", cm2("28")),
    ans("y9-ar-i4", "Find the area of a square with side 9 cm.", "s=9", "81", 2, "81.", cm2("81")),
    mcq("y9-ar-i5", "Area is measured in:", "C", ["units", "cubic units", "square units", "degrees"], 2, "Square units."),
  ],
  masteryQuiz: [
    ans("y9-ar-m1", "Find the area of a 6 cm by 7 cm rectangle.", "6\\times7", "42", 2, "42.", cm2("42")),
    ans("y9-ar-m2", "Find the area of a triangle with base 12 cm and height 10 cm.", "\\tfrac12(12)(10)", "60", 2, "60.", cm2("60")),
    ans("y9-ar-m3", "Find the area of a square with side 8 cm.", "s=8", "64", 2, "64.", cm2("64")),
    ans("y9-ar-m4", "Find the area of a parallelogram with base 9 cm and height 5 cm.", "9\\times5", "45", 2, "45.", cm2("45")),
    mcq("y9-ar-m5", "The area of a parallelogram is:", "A", ["base × height", "½ base × height", "side²", "2(b + h)"], 2, "A = bh."),
    ans("y9-ar-m6", "Find the area of a 15 cm by 4 cm rectangle.", "15\\times4", "60", 2, "60.", cm2("60")),
    ans("y9-ar-m7", "Find the area of a triangle with base 14 cm and height 6 cm.", "\\tfrac12(14)(6)", "42", 2, "½ × 84 = 42.", cm2("42")),
    ans("y9-ar-m8", "Find the area of a square with side 11 cm.", "s=11", "121", 2, "121.", cm2("121")),
    ans("y9-ar-m9", "Find the area of a parallelogram with base 10 cm and height 10 cm.", "10\\times10", "100", 2, "100.", cm2("100")),
    mcq("y9-ar-m10", "For a triangle you use the height that is:", "B", ["the longest side", "perpendicular to the base", "any side", "the hypotenuse"], 3, "Use the perpendicular height."),
  ],
  masteryQuizPool: [
    ans("y9-ar-p1", "Find the area of a trapezium with parallel sides 6 cm and 10 cm and height 4 cm.", "\\tfrac12(6+10)(4)", "32", 5, "½(6 + 10)(4) = 32.", cm2("32")),
    ans("y9-ar-p2", "A triangle has area 24 cm² and base 8 cm. Find its height.", "A=24,b=8", "6", 5, "24 = ½(8)h → h = 6.", cm("6")),
    ans("y9-ar-p3", "A rectangle has area 48 cm² and width 6 cm. Find its length.", "A=48,w=6", "8", 5, "48 ÷ 6 = 8.", cm("8")),
    ans("y9-ar-p4", "Find the area of a trapezium with parallel sides 5 cm and 9 cm and height 6 cm.", "\\tfrac12(5+9)(6)", "42", 5, "½(14)(6) = 42.", cm2("42")),
    ans("y9-ar-p5", "A square has area 49 cm². Find its side length.", "A=49", "7", 5, "√49 = 7.", cm("7")),
    ans("y9-ar-p6", "An L-shape is a 10×6 rectangle with a 4×3 rectangle removed. Find its area.", "60-12", "48", 5, "60 − 12 = 48.", cm2("48")),
    ans("y9-ar-p7", "A triangle has area 30 cm² and height 5 cm. Find its base.", "A=30,h=5", "12", 5, "30 = ½(b)(5) → b = 12.", cm("12")),
    ans("y9-ar-p8", "A rectangle 8×5 has a triangle (base 8, height 3) on top. Find the total area.", "40+12", "52", 5, "40 + 12 = 52.", cm2("52")),
    ans("y9-ar-p9", "A parallelogram has area 60 cm² and base 12 cm. Find its height.", "A=60,b=12", "5", 5, "60 ÷ 12 = 5.", cm("5")),
    ans("y9-ar-p10", "Find the area of a trapezium with parallel sides 8 cm and 12 cm and height 5 cm.", "\\tfrac12(8+12)(5)", "50", 5, "½(20)(5) = 50.", cm2("50")),
  ],
  commonMistakes: [
    { mistake: "Forgetting the ½ for a triangle.", fix: "A = ½bh." },
    { mistake: "Using a slant side as the height.", fix: "Use the perpendicular height." },
    { mistake: "Giving area in length units.", fix: "Area is in square units (cm²)." },
    { mistake: "Confusing area with perimeter.", fix: "Area is the space inside; perimeter is the boundary." },
  ],
  masteryPassMark: 0.8,
};

// ── composite-shapes-perimeter-area (core) ─────────────────────────────────────────────
const compositeShapes: Partial<ExplicitLesson> = {
  description: "Find the perimeter and area of composite shapes by splitting them into simple parts.",
  learningIntention: "Break composite shapes into simple shapes to measure them.",
  successCriteria: ["Split a composite shape into rectangles/triangles.", "Add areas of parts.", "Subtract a removed part.", "Combine to find the total."],
  teaching: {
    paragraphs: [
      "A COMPOSITE shape is made of simpler shapes. Find its area by SPLITTING it into rectangles and triangles, finding each area, and ADDING them.",
      "If a piece is REMOVED (a hole or notch), SUBTRACT that area. A 10×6 rectangle with a 3×2 rectangle cut out has area 60 − 6 = 54.",
      "A rectangle 8×5 with a triangle (base 8, height 3) on top has area 40 + 12 = 52.",
      "Work part by part, then combine — the same idea works for perimeter (add the outer edges).",
    ],
    latexBlocks: ["A_{\\text{composite}} = \\sum A_{\\text{parts}}", "60 - 6 = 54"],
  },
  workedExamples: [
    { title: "Subtract a hole", questionLatex: "10\\times6 \\text{ minus } 3\\times2.", steps: [{ explanation: "60 − 6.", latex: "54" }], finalAnswerLatex: "54" },
    { title: "Add a triangle", questionLatex: "8\\times5 \\text{ plus } \\triangle(b=8,h=3).", steps: [{ explanation: "40 + 12.", latex: "52" }], finalAnswerLatex: "52" },
    { title: "Subtract a triangle", questionLatex: "6\\times6 \\text{ minus } \\triangle(b=6,h=6).", steps: [{ explanation: "36 − 18.", latex: "18" }], finalAnswerLatex: "18" },
  ],
  guidedPractice: [
    ans("y9-cs-g1", "An 8×4 rectangle joined to a 2×4 rectangle. Find the total area.", "32+8", "40", 3, "32 + 8 = 40.", cm2("40")),
    ans("y9-cs-g2", "A 10×5 rectangle with a 2×2 square removed. Find the area.", "50-4", "46", 3, "50 − 4 = 46.", cm2("46")),
    ans("y9-cs-g3", "Two squares of side 3 cm and side 4 cm. Find the total area.", "9+16", "25", 2, "9 + 16 = 25.", cm2("25")),
    mcq("y9-cs-g4", "To find a composite area you:", "A", ["add (or subtract) the areas of the parts", "multiply the parts", "use only the largest part", "average the parts"], 2, "Add or subtract part areas."),
  ],
  independentPractice: [
    ans("y9-cs-i1", "A 12×6 rectangle with a 4×3 rectangle removed. Find the area.", "72-12", "60", 3, "72 − 12 = 60.", cm2("60")),
    ans("y9-cs-i2", "A 5×5 square with a triangle (base 5, height 4) on top. Find the total area.", "25+10", "35", 3, "25 + 10 = 35.", cm2("35")),
    ans("y9-cs-i3", "An L-shape: a 6×6 square with a 2×4 rectangle removed. Find the area.", "36-8", "28", 3, "36 − 8 = 28.", cm2("28")),
    ans("y9-cs-i4", "A 9×4 rectangle joined to a 3×4 rectangle. Find the total area.", "36+12", "48", 3, "36 + 12 = 48.", cm2("48")),
    mcq("y9-cs-i5", "When part of a shape is removed, you:", "B", ["add its area", "subtract its area", "ignore it", "double it"], 2, "Subtract the removed area."),
  ],
  masteryQuiz: [
    ans("y9-cs-m1", "A 10×6 rectangle with a 3×2 rectangle removed. Find the area.", "60-6", "54", 3, "60 − 6 = 54.", cm2("54")),
    ans("y9-cs-m2", "An 8×5 rectangle with a triangle (base 8, height 3) on top. Find the total area.", "40+12", "52", 3, "40 + 12 = 52.", cm2("52")),
    ans("y9-cs-m3", "Two rectangles 7×3 and 5×3. Find the total area.", "21+15", "36", 3, "21 + 15 = 36.", cm2("36")),
    ans("y9-cs-m4", "A 6×6 square with a triangle (base 6, height 6) removed. Find the area.", "36-18", "18", 3, "36 − 18 = 18.", cm2("18")),
    mcq("y9-cs-m5", "The first step with a composite shape is to:", "A", ["split it into simple shapes", "find the diagonal", "double the largest side", "use π"], 2, "Split into simple shapes."),
    ans("y9-cs-m6", "A 15×4 rectangle joined to a 5×4 rectangle. Find the total area.", "60+20", "80", 3, "60 + 20 = 80.", cm2("80")),
    ans("y9-cs-m7", "A 12×10 rectangle with a 6×5 rectangle removed. Find the area.", "120-30", "90", 3, "120 − 30 = 90.", cm2("90")),
    ans("y9-cs-m8", "A 4×4 square joined to a triangle (base 4, height 6). Find the total area.", "16+12", "28", 3, "16 + 12 = 28.", cm2("28")),
    ans("y9-cs-m9", "An L-shape: a 10×8 rectangle with a 4×4 square removed. Find the area.", "80-16", "64", 3, "80 − 16 = 64.", cm2("64")),
    mcq("y9-cs-m10", "Composite shapes are measured by treating them as:", "C", ["a single circle", "one big triangle", "a combination of simple shapes", "always a square"], 2, "A combination of simple shapes."),
  ],
  masteryQuizPool: [
    ans("y9-cs-p1", "A rectangle 12×8 with a semicircle (radius 4) removed. Find the area in terms of π.", "96-8\\pi", "96-8π", 5, "96 − ½π(4²) = 96 − 8π.", ["96 - 8π", "96-8pi"]),
    ans("y9-cs-p2", "An L-shape: 10×6 rectangle with a 4×3 corner removed. Find the perimeter.", "\\text{L-perimeter}", "32", 5, "Outer edges total 2(10 + 6) = 32 (the notch edges replace each other).", cm("32")),
    ans("y9-cs-p3", "A 20×10 rectangle with two 3×3 squares removed. Find the area.", "200-18", "182", 5, "200 − 2(9) = 182.", cm2("182")),
    ans("y9-cs-p4", "A trapezium (parallel sides 8 and 4, height 5) plus a 4×5 rectangle. Find the total area.", "30+20", "50", 5, "½(8 + 4)(5) = 30; + 20 = 50.", cm2("50")),
    ans("y9-cs-p5", "A 14×10 rectangle with a triangle (base 14, height 6) removed. Find the area.", "140-42", "98", 5, "140 − 42 = 98.", cm2("98")),
    ans("y9-cs-p6", "A square side 10 with a quarter-circle (radius 10) removed. Find the area in terms of π.", "100-25\\pi", "100-25π", 5, "100 − ¼π(10²) = 100 − 25π.", ["100 - 25π", "100-25pi"]),
    ans("y9-cs-p7", "Two triangles, each base 6 height 4, joined to a 6×5 rectangle. Find the total area.", "24+30", "54", 5, "2(½·6·4 = 12) = 24; + 30 = 54.", cm2("54")),
    ans("y9-cs-p8", "A 16×9 rectangle with a 9×9 square removed. Find the remaining area.", "144-81", "63", 5, "144 − 81 = 63.", cm2("63")),
    ans("y9-cs-p9", "A house-shape: a 6×4 rectangle with a triangle (base 6, height 3) roof. Find the total area.", "24+9", "33", 5, "24 + 9 = 33.", cm2("33")),
    ans("y9-cs-p10", "A 1 m by 2 m doorway is cut from a 5 m by 3 m wall. Find the wall area remaining.", "15-2", "13", 5, "15 − 2 = 13 m².", ["13", "13 m²"]),
  ],
  commonMistakes: [
    { mistake: "Adding when a part is removed.", fix: "Subtract a removed/hole area." },
    { mistake: "Double-counting an overlapping region.", fix: "Split into non-overlapping parts." },
    { mistake: "Using slant lengths as heights.", fix: "Use perpendicular heights for triangles." },
    { mistake: "Forgetting a part of the shape.", fix: "Account for every piece before adding." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "length-and-perimeter": lengthPerimeter,
  "area": area,
  "composite-shapes-perimeter-area": compositeShapes,
};

export function year9Chapter5MeasurementLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "length-area-surface-area-volume") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
