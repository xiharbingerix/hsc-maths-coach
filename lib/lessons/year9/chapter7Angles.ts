// Year 9 Wave 8 — Chapter 7 (Properties of Geometrical Figures), angle sections (ADR-Y9-001):
// angles-and-triangles (consol), parallel-lines (consol), quadrilaterals-polygons (path).
// Full per-subtopic contract. Geometry answers are numeric (degrees) or short text.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import { applyYear9GeometryVisuals } from "../year9GeometryVisuals";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Use the angle facts for this figure.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the relevant angle fact.", explanation };
}
const deg = (a: string) => [a, `${a}°`, `${a} degrees`];

// ── angles-and-triangles (consolidating) ───────────────────────────────────────────────
const anglesTriangles: Partial<ExplicitLesson> = {
  description: "Use the angle sum of a triangle, the exterior-angle property and isosceles triangles.",
  learningIntention: "Find unknown angles in triangles.",
  successCriteria: ["Use the 180° angle sum.", "Use the exterior-angle property.", "Use isosceles base angles.", "Combine angle facts."],
  teaching: {
    paragraphs: [
      "The three angles of a TRIANGLE add to 180°. So if two angles are 50° and 60°, the third is 180 − 110 = 70°.",
      "An EXTERIOR angle of a triangle equals the SUM of the two opposite interior angles: an exterior angle next to interior angles 50° and 70° is 120°.",
      "An ISOSCELES triangle has two equal sides and two equal BASE ANGLES. An equilateral triangle has three 60° angles.",
      "A right angle is 90°; combine these facts to chase unknown angles.",
    ],
    latexBlocks: ["\\text{angle sum} = 180^\\circ", "\\text{exterior} = \\text{sum of two interior opposite}"],
  },
  workedExamples: [
    { title: "Third angle", questionLatex: "\\text{Two angles } 50^\\circ, 60^\\circ. \\text{ Third?}", steps: [{ explanation: "180 − 110.", latex: "70^\\circ" }], finalAnswerLatex: "70^\\circ" },
    { title: "Exterior angle", questionLatex: "\\text{Interior } 70^\\circ, 50^\\circ. \\text{ Exterior?}", steps: [{ explanation: "70 + 50.", latex: "120^\\circ" }], finalAnswerLatex: "120^\\circ" },
    { title: "Equilateral", questionLatex: "\\text{Each angle of an equilateral triangle?}", steps: [{ explanation: "180 ÷ 3.", latex: "60^\\circ" }], finalAnswerLatex: "60^\\circ" },
  ],
  guidedPractice: [
    ans("y9-at-g1", "A triangle has angles 40° and 80°. Find the third angle.", "40,80", "60", 2, "180 − 120 = 60.", deg("60")),
    ans("y9-at-g2", "A triangle has angles 90° and 30°. Find the third angle.", "90,30", "60", 2, "180 − 120 = 60.", deg("60")),
    ans("y9-at-g3", "How many degrees is a right angle?", "\\text{right angle}", "90", 2, "90°.", deg("90")),
    mcq("y9-at-g4", "The angles of a triangle add to:", "C", ["90°", "360°", "180°", "270°"], 2, "180°."),
  ],
  independentPractice: [
    ans("y9-at-i1", "A triangle has angles 45° and 45°. Find the third angle.", "45,45", "90", 2, "180 − 90 = 90.", deg("90")),
    ans("y9-at-i2", "A triangle has angles 100° and 30°. Find the third angle.", "100,30", "50", 2, "180 − 130 = 50.", deg("50")),
    ans("y9-at-i3", "Each angle of an equilateral triangle is:", "\\text{equilateral}", "60", 2, "60°.", deg("60")),
    ans("y9-at-i4", "An exterior angle next to interior angles 60° and 70° is:", "", "130", 3, "60 + 70 = 130.", deg("130")),
    mcq("y9-at-i5", "An isosceles triangle has:", "B", ["all sides different", "two equal base angles", "no equal angles", "a right angle always"], 2, "Two equal sides and two equal base angles."),
  ],
  masteryQuiz: [
    ans("y9-at-m1", "A triangle has angles 50° and 60°. Find the third angle.", "50,60", "70", 2, "70.", deg("70")),
    ans("y9-at-m2", "A triangle has angles 20° and 90°. Find the third angle.", "20,90", "70", 2, "70.", deg("70")),
    ans("y9-at-m3", "An isosceles triangle has an apex angle of 40°. Find each base angle.", "\\text{apex }40", "70", 3, "(180 − 40)/2 = 70.", deg("70")),
    ans("y9-at-m4", "An exterior angle next to interior angles 80° and 40° is:", "", "120", 3, "120.", deg("120")),
    mcq("y9-at-m5", "A straight angle is:", "C", ["90°", "60°", "180°", "360°"], 2, "180°."),
    ans("y9-at-m6", "A triangle has angles 33° and 77°. Find the third angle.", "33,77", "70", 2, "180 − 110 = 70.", deg("70")),
    ans("y9-at-m7", "Each angle of an equilateral triangle is:", "\\text{equilateral}", "60", 2, "60.", deg("60")),
    ans("y9-at-m8", "Find each base angle of a right-angled isosceles triangle.", "\\text{right isosceles}", "45", 3, "(180 − 90)/2 = 45.", deg("45")),
    ans("y9-at-m9", "A triangle has angles 110° and 35°. Find the third angle.", "110,35", "35", 2, "180 − 145 = 35.", deg("35")),
    mcq("y9-at-m10", "The exterior angle of a triangle equals:", "A", ["the sum of the two opposite interior angles", "the third interior angle", "90°", "half the angle sum"], 3, "Exterior = sum of two opposite interior angles."),
  ],
  masteryQuizPool: [
    ans("y9-at-p1", "An isosceles triangle has an apex angle of 50°. Find each base angle.", "\\text{apex }50", "65", 5, "(180 − 50)/2 = 65.", deg("65")),
    ans("y9-at-p2", "An exterior angle of a triangle is 130° and one opposite interior angle is 60°. Find the other.", "130,60", "70", 5, "130 − 60 = 70.", deg("70")),
    ans("y9-at-p3", "The angles of a triangle are in the ratio 1 : 2 : 3. Find the largest angle.", "1:2:3", "90", 5, "6 parts = 180 → 30°; largest = 3×30 = 90.", deg("90")),
    ans("y9-at-p4", "An isosceles triangle has a base angle of 75°. Find the apex angle.", "\\text{base }75", "30", 5, "180 − 2(75) = 30.", deg("30")),
    ans("y9-at-p5", "Two angles of a triangle are equal and the third is 80°. Find one equal angle.", "\\text{third }80", "50", 5, "(180 − 80)/2 = 50.", deg("50")),
    ans("y9-at-p6", "The angles of a triangle are x, x + 20 and x + 40. Find x.", "x,x+20,x+40", "40", 5, "3x + 60 = 180 → x = 40.", deg("40")),
    ans("y9-at-p7", "An exterior angle is 110°; the two opposite interior angles are equal. Find each.", "\\text{ext }110", "55", 5, "110/2 = 55.", deg("55")),
    ans("y9-at-p8", "A triangle has angles in the ratio 2 : 3 : 4. Find the smallest angle.", "2:3:4", "40", 5, "9 parts = 180 → 20°; smallest = 2×20 = 40.", deg("40")),
    ans("y9-at-p9", "An isosceles triangle has an apex of 90°. Find each base angle.", "\\text{apex }90", "45", 5, "(180 − 90)/2 = 45.", deg("45")),
    ans("y9-at-p10", "In a triangle, one angle is double the smallest and the third is 90°. Find the smallest.", "\\text{right, ratio}", "30", 5, "x + 2x + 90 = 180 → 3x = 90 → x = 30.", deg("30")),
  ],
  commonMistakes: [
    { mistake: "Using an angle sum other than 180°.", fix: "A triangle's angles total 180°." },
    { mistake: "Adding all three interior angles for an exterior angle.", fix: "Exterior = sum of the two OPPOSITE interior angles." },
    { mistake: "Forgetting base angles are equal.", fix: "An isosceles triangle has two equal base angles." },
    { mistake: "Splitting the apex instead of the remaining angle.", fix: "Base angle = (180 − apex)/2." },
  ],
  masteryPassMark: 0.8,
};

// ── parallel-lines (consolidating) ─────────────────────────────────────────────────────
const parallelLines: Partial<ExplicitLesson> = {
  description: "Use corresponding, alternate and co-interior angles on parallel lines, and vertically opposite angles.",
  learningIntention: "Find angles formed by a transversal across parallel lines.",
  successCriteria: ["Use equal corresponding angles.", "Use equal alternate angles.", "Use co-interior angles summing to 180°.", "Use vertically opposite angles."],
  teaching: {
    paragraphs: [
      "When a TRANSVERSAL crosses PARALLEL lines: CORRESPONDING angles are EQUAL, and ALTERNATE angles are EQUAL.",
      "CO-INTERIOR (allied) angles ADD to 180°: if one is 110°, the co-interior angle is 70°.",
      "VERTICALLY OPPOSITE angles (where two lines cross) are EQUAL.",
      "Identify the relationship first, then either copy the angle (corresponding/alternate/vertically opposite) or subtract from 180° (co-interior).",
    ],
    latexBlocks: ["\\text{corresponding, alternate} = \\text{equal}", "\\text{co-interior} = 180^\\circ"],
  },
  workedExamples: [
    { title: "Corresponding", questionLatex: "\\text{Corresponding angle to } 70^\\circ?", steps: [{ explanation: "Equal.", latex: "70^\\circ" }], finalAnswerLatex: "70^\\circ" },
    { title: "Co-interior", questionLatex: "\\text{Co-interior angle with } 110^\\circ?", steps: [{ explanation: "180 − 110.", latex: "70^\\circ" }], finalAnswerLatex: "70^\\circ" },
    { title: "Alternate", questionLatex: "\\text{Alternate angle to } 65^\\circ?", steps: [{ explanation: "Equal.", latex: "65^\\circ" }], finalAnswerLatex: "65^\\circ" },
  ],
  guidedPractice: [
    ans("y9-pl-g1", "Find the corresponding angle to 80° on parallel lines.", "\\text{corr }80", "80", 2, "Equal: 80.", deg("80")),
    ans("y9-pl-g2", "Find the alternate angle to 50° on parallel lines.", "\\text{alt }50", "50", 2, "Equal: 50.", deg("50")),
    ans("y9-pl-g3", "Find the co-interior angle with 120° on parallel lines.", "\\text{co-int }120", "60", 2, "180 − 120 = 60.", deg("60")),
    mcq("y9-pl-g4", "Alternate angles on parallel lines are:", "A", ["equal", "supplementary", "complementary", "always 90°"], 2, "Equal."),
  ],
  independentPractice: [
    ans("y9-pl-i1", "Find the corresponding angle to 110° on parallel lines.", "\\text{corr }110", "110", 2, "110.", deg("110")),
    ans("y9-pl-i2", "Find the co-interior angle with 75° on parallel lines.", "\\text{co-int }75", "105", 3, "180 − 75 = 105.", deg("105")),
    ans("y9-pl-i3", "Find the alternate angle to 40° on parallel lines.", "\\text{alt }40", "40", 2, "40.", deg("40")),
    mcq("y9-pl-i4", "Co-interior angles on parallel lines add to:", "C", ["90°", "360°", "180°", "they are equal"], 2, "180°."),
    ans("y9-pl-i5", "Find the vertically opposite angle to 95°.", "\\text{v.o. }95", "95", 2, "Equal: 95.", deg("95")),
  ],
  masteryQuiz: [
    ans("y9-pl-m1", "Find the corresponding angle to 70°.", "\\text{corr }70", "70", 2, "70.", deg("70")),
    ans("y9-pl-m2", "Find the co-interior angle with 110°.", "\\text{co-int }110", "70", 2, "180 − 110 = 70.", deg("70")),
    ans("y9-pl-m3", "Find the alternate angle to 65°.", "\\text{alt }65", "65", 2, "65.", deg("65")),
    mcq("y9-pl-m4", "Corresponding angles on parallel lines are:", "A", ["equal", "supplementary", "complementary", "different"], 2, "Equal."),
    ans("y9-pl-m5", "Find the co-interior angle with 130°.", "\\text{co-int }130", "50", 2, "180 − 130 = 50.", deg("50")),
    ans("y9-pl-m6", "Find the vertically opposite angle to 120°.", "\\text{v.o. }120", "120", 2, "120.", deg("120")),
    ans("y9-pl-m7", "Find the alternate angle to 88°.", "\\text{alt }88", "88", 2, "88.", deg("88")),
    ans("y9-pl-m8", "Find the co-interior angle with 90°.", "\\text{co-int }90", "90", 2, "180 − 90 = 90.", deg("90")),
    ans("y9-pl-m9", "Find the corresponding angle to 35°.", "\\text{corr }35", "35", 2, "35.", deg("35")),
    mcq("y9-pl-m10", "Vertically opposite angles are:", "A", ["equal", "supplementary", "complementary", "always 180°"], 2, "Equal."),
  ],
  masteryQuizPool: [
    ans("y9-pl-p1", "A transversal makes a 75° angle; find the co-interior angle, then its vertically opposite angle.", "\\text{co-int then v.o.}", "105", 5, "Co-interior 180 − 75 = 105; vertically opposite = 105.", deg("105")),
    ans("y9-pl-p2", "Two parallel lines: an alternate angle to 3x is 60° and 3x = that angle. Find x.", "", "20", 5, "3x = 60 → x = 20.", deg("20")),
    ans("y9-pl-p3", "A co-interior angle relationship gives x + 50 = 180. Find x.", "", "130", 5, "x = 130.", deg("130")),
    ans("y9-pl-p4", "An angle of 40° has a corresponding angle, whose co-interior partner is what?", "\\text{corr then co-int}", "140", 5, "Corresponding = 40; its co-interior = 180 − 40 = 140.", deg("140")),
    ans("y9-pl-p5", "Two co-interior angles are equal. Find each.", "\\text{equal co-interior}", "90", 5, "They sum to 180 and are equal → 90 each.", deg("90")),
    ans("y9-pl-p6", "An alternate angle is 2x and equals 70°. Find x.", "", "35", 5, "2x = 70 → x = 35.", deg("35")),
    ans("y9-pl-p7", "A corresponding angle is (x + 30)° and equals 100°. Find x.", "", "70", 5, "x = 70.", deg("70")),
    ans("y9-pl-p8", "An angle and its co-interior partner are in the ratio 2 : 1. Find the larger.", "", "120", 5, "3 parts = 180 → 60; larger = 2×60 = 120.", deg("120")),
    ans("y9-pl-p9", "A transversal: one angle is 55°; find the alternate angle's co-interior partner.", "55", "125", 5, "Alternate = 55; co-interior = 180 − 55 = 125.", deg("125")),
    ans("y9-pl-p10", "Co-interior angles (3x) and (x) on parallel lines. Find x.", "", "45", 5, "4x = 180 → x = 45.", deg("45")),
  ],
  commonMistakes: [
    { mistake: "Treating co-interior angles as equal.", fix: "Co-interior angles add to 180°." },
    { mistake: "Treating alternate/corresponding as supplementary.", fix: "They are equal." },
    { mistake: "Applying the rules when lines aren't parallel.", fix: "These facts need parallel lines." },
    { mistake: "Confusing the angle positions.", fix: "Identify corresponding vs alternate vs co-interior first." },
  ],
  masteryPassMark: 0.8,
};

// ── quadrilaterals-polygons (path) ─────────────────────────────────────────────────────
const quadrilateralsPolygons: Partial<ExplicitLesson> = {
  description: "Use the angle sum of quadrilaterals and polygons, including regular-polygon interior angles.",
  learningIntention: "Find angle sums and interior angles of polygons.",
  successCriteria: ["Use the 360° quadrilateral sum.", "Use (n − 2) × 180° for polygons.", "Find a regular polygon's interior angle.", "Use the exterior-angle relationship."],
  teaching: {
    paragraphs: [
      "The angles of a QUADRILATERAL add to 360°. So three angles of 90°, 90° and 100° leave a fourth of 80°.",
      "For any polygon with n sides, the interior angle SUM is (n − 2) × 180°. A pentagon (n = 5): 3 × 180 = 540°; a hexagon: 720°.",
      "A REGULAR polygon has equal angles, so each interior angle is the sum ÷ n: a regular hexagon has 720 ÷ 6 = 120°.",
      "The EXTERIOR angles of any polygon sum to 360°, so a regular polygon's exterior angle is 360 ÷ n.",
    ],
    latexBlocks: ["\\text{quad sum} = 360^\\circ", "\\text{sum} = (n-2)\\times180^\\circ"],
  },
  workedExamples: [
    { title: "Fourth angle", questionLatex: "\\text{Quad } 90^\\circ,90^\\circ,100^\\circ. \\text{ Fourth?}", steps: [{ explanation: "360 − 280.", latex: "80^\\circ" }], finalAnswerLatex: "80^\\circ" },
    { title: "Pentagon sum", questionLatex: "\\text{Angle sum of a pentagon?}", steps: [{ explanation: "(5 − 2)×180.", latex: "540^\\circ" }], finalAnswerLatex: "540^\\circ" },
    { title: "Regular hexagon", questionLatex: "\\text{Interior angle of a regular hexagon?}", steps: [{ explanation: "720 ÷ 6.", latex: "120^\\circ" }], finalAnswerLatex: "120^\\circ" },
  ],
  guidedPractice: [
    ans("y9-qp-g1", "The angles of a quadrilateral add to:", "\\text{quad sum}", "360", 2, "360°.", deg("360")),
    ans("y9-qp-g2", "Find the angle sum of a pentagon.", "\\text{pentagon}", "540", 2, "(5−2)×180 = 540.", deg("540")),
    ans("y9-qp-g3", "Find the angle sum of a hexagon.", "\\text{hexagon}", "720", 3, "(6−2)×180 = 720.", deg("720")),
    mcq("y9-qp-g4", "A quadrilateral's angles add to:", "C", ["180°", "270°", "360°", "540°"], 2, "360°."),
  ],
  independentPractice: [
    ans("y9-qp-i1", "A quadrilateral has angles 80°, 100° and 90°. Find the fourth.", "80,100,90", "90", 3, "360 − 270 = 90.", deg("90")),
    ans("y9-qp-i2", "Find the angle sum of an octagon.", "\\text{octagon}", "1080", 3, "(8−2)×180 = 1080.", deg("1080")),
    ans("y9-qp-i3", "Find the interior angle of a regular pentagon.", "\\text{reg pentagon}", "108", 3, "540 ÷ 5 = 108.", deg("108")),
    mcq("y9-qp-i4", "The interior angle sum of an n-sided polygon is:", "B", ["n × 180°", "(n − 2) × 180°", "360° ÷ n", "(n + 2) × 180°"], 3, "(n − 2) × 180°."),
    ans("y9-qp-i5", "Find the interior angle of a square.", "\\text{square}", "90", 2, "360 ÷ 4 = 90.", deg("90")),
  ],
  masteryQuiz: [
    ans("y9-qp-m1", "A quadrilateral has angles 70°, 110° and 90°. Find the fourth.", "70,110,90", "90", 3, "360 − 270 = 90.", deg("90")),
    ans("y9-qp-m2", "Find the angle sum of a pentagon.", "\\text{pentagon}", "540", 2, "540.", deg("540")),
    ans("y9-qp-m3", "Find the interior angle of a regular hexagon.", "\\text{reg hexagon}", "120", 3, "720 ÷ 6 = 120.", deg("120")),
    ans("y9-qp-m4", "Find the angle sum of a heptagon (7 sides).", "\\text{heptagon}", "900", 3, "(7−2)×180 = 900.", deg("900")),
    mcq("y9-qp-m5", "The exterior angles of any polygon sum to:", "A", ["360°", "180°", "(n−2)×180°", "720°"], 3, "360°."),
    ans("y9-qp-m6", "A quadrilateral has angles 120°, 60° and 100°. Find the fourth.", "120,60,100", "80", 3, "360 − 280 = 80.", deg("80")),
    ans("y9-qp-m7", "Find the interior angle of a regular octagon.", "\\text{reg octagon}", "135", 4, "1080 ÷ 8 = 135.", deg("135")),
    ans("y9-qp-m8", "Find the angle sum of a decagon (10 sides).", "\\text{decagon}", "1440", 3, "(10−2)×180 = 1440.", deg("1440")),
    ans("y9-qp-m9", "Find the interior angle of a regular pentagon.", "\\text{reg pentagon}", "108", 3, "108.", deg("108")),
    mcq("y9-qp-m10", "A regular polygon's interior angle equals:", "B", ["360° ÷ n", "the angle sum ÷ n", "(n − 2) × 180°", "180° − n"], 3, "Sum ÷ n."),
  ],
  masteryQuizPool: [
    ans("y9-qp-p1", "A regular polygon has an exterior angle of 36°. How many sides has it?", "\\text{ext }36", "10", 5, "360 ÷ 36 = 10.", []),
    ans("y9-qp-p2", "Find the interior angle of a regular dodecagon (12 sides).", "\\text{reg 12-gon}", "150", 5, "(10×180)/12 = 1800/12 = 150.", deg("150")),
    ans("y9-qp-p3", "A regular polygon has an interior angle of 140°. How many sides?", "\\text{int }140", "9", 5, "Exterior 40°; 360 ÷ 40 = 9.", []),
    ans("y9-qp-p4", "Three angles of a quadrilateral are equal and the fourth is 120°. Find each equal angle.", "\\text{quad, one }120", "80", 5, "(360 − 120)/3 = 80.", deg("80")),
    ans("y9-qp-p5", "A regular polygon has 15 sides. Find each exterior angle.", "\\text{15-gon ext}", "24", 5, "360 ÷ 15 = 24.", deg("24")),
    ans("y9-qp-p6", "Find the angle sum of a 20-sided polygon.", "\\text{20-gon}", "3240", 5, "(20−2)×180 = 3240.", deg("3240")),
    ans("y9-qp-p7", "A regular polygon's interior angle is 144°. How many sides?", "\\text{int }144", "10", 5, "Exterior 36°; 360 ÷ 36 = 10.", []),
    ans("y9-qp-p8", "A quadrilateral's angles are in the ratio 1 : 2 : 3 : 4. Find the largest.", "1:2:3:4", "144", 5, "10 parts = 360 → 36°; largest = 4×36 = 144.", deg("144")),
    ans("y9-qp-p9", "Find the interior angle of a regular nonagon (9 sides).", "\\text{reg 9-gon}", "140", 5, "(7×180)/9 = 1260/9 = 140.", deg("140")),
    ans("y9-qp-p10", "A regular polygon has an exterior angle of 45°. Find its interior angle.", "\\text{ext }45", "135", 5, "180 − 45 = 135.", deg("135")),
  ],
  commonMistakes: [
    { mistake: "Using 360° as the angle sum for every polygon.", fix: "Only quadrilaterals; use (n − 2) × 180° in general." },
    { mistake: "Forgetting to divide by n for a regular polygon.", fix: "Each interior angle = sum ÷ n." },
    { mistake: "Confusing interior and exterior angles.", fix: "Interior + exterior = 180° at each vertex." },
    { mistake: "Miscounting sides.", fix: "Set n correctly before applying the formula." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "angles-and-triangles": anglesTriangles,
  "parallel-lines": parallelLines,
  "quadrilaterals-polygons": quadrilateralsPolygons,
};

export function year9Chapter7AnglesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "properties-geometrical-figures") {
    return null;
  }
  const content = SECTIONS[lesson.slug];
  return content ? applyYear9GeometryVisuals(lesson.slug, content) : null;
}
