// Year 10 restructure — Wave 3 (Geometry & Circle Geometry). Authors hidden interim stubs in
// Unit 2 (geometrical-figures-circle-geometry): review-of-geometry (2A),
// congruence-quadrilaterals (2C), proving-similar-triangles (2E),
// further-angle-properties-circles (2H), intersecting-chords-secants-tangents (2J).
// Reasoning-first: angle relationships, congruence/similarity tests, circle theorems — not
// diagram extraction. Architecture untouched. Y10 audit: 3 worked examples + 4 commonMistakes
// + 4/5/10 + masteryPassMark 0.8.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Name the angle/shape relationship, then apply it.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Identify the relationship, then check each option.", explanation };
}
const deg = (n: string) => [n + "°", n + " degrees"];

// ── 2A Review of Geometry (core) ───────────────────────────────────────────────────────
const reviewOfGeometry: Partial<ExplicitLesson> = {
  description: "Use angle relationships — on a line, at a point, in triangles and quadrilaterals, and on parallel lines — to find unknown angles.",
  learningIntention: "Apply standard angle relationships to find unknown angles with reasons.",
  successCriteria: ["Use angles on a line (180°) and at a point (360°).", "Use the angle sum of a triangle (180°) and a quadrilateral (360°).", "Use vertically opposite, corresponding, alternate and co-interior angles.", "Give a reason for each step."],
  teaching: {
    paragraphs: [
      "Most geometry begins with a few angle facts you combine like clues. Angles on a straight line add to 180°; angles meeting at a point add to 360°; and vertically opposite angles (formed by two crossing lines) are equal.",
      "Inside shapes: the three angles of any triangle add to 180°, and the four angles of any quadrilateral add to 360°. So if you know all but one angle, you can find the missing one by subtracting.",
      "When a line crosses a pair of PARALLEL lines, three named pairs appear: corresponding angles are equal, alternate angles are equal, and co-interior (allied) angles are supplementary (add to 180°).",
      "Always pair an answer with a REASON — 'angles in a triangle sum to 180°', 'vertically opposite', 'co-interior angles on parallel lines'. The reason is what turns an answer into mathematics.",
    ],
    latexBlocks: ["\\text{straight line} = 180^\\circ,\\quad \\text{point} = 360^\\circ", "\\triangle = 180^\\circ,\\quad \\text{quadrilateral} = 360^\\circ", "\\text{parallel lines: corresponding = alternate; co-interior} = 180^\\circ"],
  },
  workedExamples: [
    { title: "Angles on a line", questionLatex: "\\text{Two angles on a straight line are } 110^\\circ \\text{ and } x. \\text{ Find } x.", steps: [{ explanation: "Angles on a line sum to 180°.", latex: "x = 180^\\circ - 110^\\circ = 70^\\circ" }], finalAnswerLatex: "70^\\circ" },
    { title: "Triangle angle sum", questionLatex: "\\text{A triangle has angles } 50^\\circ, 60^\\circ \\text{ and } x. \\text{ Find } x.", steps: [{ explanation: "Angles in a triangle sum to 180°.", latex: "x = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ" }], finalAnswerLatex: "70^\\circ" },
    { title: "Co-interior angles", questionLatex: "\\text{Co-interior angles on parallel lines are } 115^\\circ \\text{ and } x. \\text{ Find } x.", steps: [{ explanation: "Co-interior angles are supplementary.", latex: "x = 180^\\circ - 115^\\circ = 65^\\circ" }], finalAnswerLatex: "65^\\circ" },
  ],
  guidedPractice: [
    mcq("y10-rg-g1", "Angles on a straight line add up to:", "B", ["90°", "180°", "360°", "270°"], 1, "Angles on a straight line are supplementary — they sum to 180°."),
    ans("y10-rg-g2", "Two angles of a triangle are 50° and 60°. Find the third angle.", "50^\\circ, 60^\\circ", "70", 2, "Angles in a triangle sum to 180°: 180 − 50 − 60 = 70°.", deg("70")),
    ans("y10-rg-g3", "Find the angle vertically opposite a 75° angle.", "", "75", 1, "Vertically opposite angles are equal, so it is 75°.", deg("75")),
    ans("y10-rg-g4", "Three angles meet at a point: 120°, 150° and x. Find x.", "", "90", 2, "Angles at a point sum to 360°: 360 − 120 − 150 = 90°.", deg("90")),
  ],
  independentPractice: [
    mcq("y10-rg-i1", "On parallel lines cut by a transversal, alternate angles are:", "A", ["equal", "supplementary", "complementary", "always 90°"], 2, "Alternate angles on parallel lines are equal."),
    ans("y10-rg-i2", "A triangle has two angles of 40°. Find the third angle.", "40^\\circ, 40^\\circ", "100", 2, "180 − 40 − 40 = 100°.", deg("100")),
    ans("y10-rg-i3", "One angle on a straight line is 130°. Find the other.", "130^\\circ \\text{ on a line}", "50", 1, "Angles on a line sum to 180°: 180 − 130 = 50°.", deg("50")),
    ans("y10-rg-i4", "A quadrilateral has angles 90°, 90°, 100° and x. Find x.", "90^\\circ,90^\\circ,100^\\circ", "80", 3, "Angles in a quadrilateral sum to 360°: 360 − 90 − 90 − 100 = 80°.", deg("80")),
    ans("y10-rg-i5", "Co-interior angles on parallel lines are 70° and x. Find x.", "", "110", 3, "Co-interior angles are supplementary: 180 − 70 = 110°.", deg("110")),
  ],
  masteryQuiz: [
    ans("y10-rg-m1", "A right-angled triangle has another angle of 35°. Find the third angle.", "90^\\circ, 35^\\circ", "55", 2, "180 − 90 − 35 = 55°.", deg("55")),
    mcq("y10-rg-m2", "Angles at a point add up to:", "C", ["90°", "180°", "360°", "540°"], 1, "A full turn at a point is 360°."),
    ans("y10-rg-m3", "Find the angle vertically opposite a 110° angle.", "", "110", 1, "Vertically opposite angles are equal: 110°.", deg("110")),
    ans("y10-rg-m4", "An exterior angle of a triangle equals the sum of the two opposite interior angles. If those are 60° and 70°, find the exterior angle.", "60^\\circ + 70^\\circ", "130", 3, "Exterior angle = 60 + 70 = 130°.", deg("130")),
    mcq("y10-rg-m5", "Co-interior angles on parallel lines are:", "B", ["equal", "supplementary", "complementary", "vertically opposite"], 2, "Co-interior (allied) angles are supplementary — they sum to 180°."),
    ans("y10-rg-m6", "One angle on a straight line is 45°. Find the other.", "45^\\circ \\text{ on a line}", "135", 1, "180 − 45 = 135°.", deg("135")),
    ans("y10-rg-m7", "Find each angle of an equilateral triangle.", "\\text{equilateral}", "60", 2, "All three angles are equal and sum to 180°: 180 ÷ 3 = 60°.", deg("60")),
    mcq("y10-rg-m8", "On parallel lines, corresponding angles are:", "A", ["equal", "supplementary", "complementary", "always obtuse"], 2, "Corresponding angles on parallel lines are equal."),
    ans("y10-rg-m9", "A quadrilateral has angles 100°, 80°, 90° and x. Find x.", "100^\\circ,80^\\circ,90^\\circ", "90", 2, "360 − 100 − 80 − 90 = 90°.", deg("90")),
    ans("y10-rg-m10", "An isosceles triangle has an apex angle of 40°. Find each base angle.", "\\text{isosceles, apex } 40^\\circ", "70", 3, "The two equal base angles share 180 − 40 = 140°, so each is 70°.", deg("70")),
  ],
  commonMistakes: [
    { mistake: "Confusing angles on a line (180°) with angles at a point (360°).", fix: "A straight line is 180°; a full turn at a point is 360°." },
    { mistake: "Treating co-interior angles as equal.", fix: "Co-interior angles are supplementary (sum 180°); alternate and corresponding are equal." },
    { mistake: "Forgetting the triangle/quadrilateral angle sum.", fix: "Triangle = 180°, quadrilateral = 360°." },
    { mistake: "Stating an answer with no reason.", fix: "Always name the relationship used (e.g. 'vertically opposite')." },
  ],
  masteryPassMark: 0.8,
};

// ── 2C Congruence and Quadrilaterals (core) ────────────────────────────────────────────
const congruenceQuadrilaterals: Partial<ExplicitLesson> = {
  description: "Choose congruence tests (SSS, SAS, ASA, RHS) and use congruence and quadrilateral properties to find equal sides and angles.",
  learningIntention: "Select the correct congruence test and apply congruence and quadrilateral properties.",
  successCriteria: ["Choose between SSS, SAS, ASA and RHS for given information.", "State that congruent figures have equal corresponding sides and angles.", "Use parallelogram, rectangle and rhombus properties.", "Recognise that equal angles alone (AAA) do not prove congruence."],
  teaching: {
    paragraphs: [
      "Two figures are CONGRUENT if they are identical in shape AND size — one fits exactly on the other. For triangles, four minimum sets of facts guarantee this: SSS (three sides), SAS (two sides and the INCLUDED angle), ASA (two angles and a side), and RHS (right angle, hypotenuse, one side).",
      "The included angle matters: SAS needs the angle BETWEEN the two known sides. Note that AAA (three equal angles) does NOT prove congruence — equal angles only fix the shape, not the size (that is similarity).",
      "Once triangles are congruent, every pair of CORRESPONDING sides and angles is equal. That is how congruence lets you find an unknown length or angle: match it to its partner in the other triangle.",
      "Special quadrilaterals have built-in equalities. A parallelogram has opposite sides equal, opposite angles equal, and diagonals that bisect each other; a rectangle adds four right angles; a rhombus has all four sides equal.",
    ],
    latexBlocks: ["\\text{Tests: SSS, SAS (included angle), ASA, RHS}", "\\text{Congruent} \\Rightarrow \\text{corresponding sides and angles equal}", "\\text{Parallelogram: opposite sides and angles equal; diagonals bisect}"],
  },
  workedExamples: [
    { title: "Choosing a test", questionLatex: "\\text{Two triangles share two sides and the angle between them. Which test?}", steps: [{ explanation: "Two sides and the INCLUDED angle.", latex: "\\text{SAS}" }], finalAnswerLatex: "\\text{SAS}" },
    { title: "Corresponding parts", questionLatex: "\\text{In congruent triangles a side matches one of length 8. Find that side.}", steps: [{ explanation: "Corresponding sides of congruent triangles are equal.", latex: "x = 8" }], finalAnswerLatex: "8" },
    { title: "Parallelogram property", questionLatex: "\\text{A parallelogram has an angle of } 70^\\circ. \\text{ Find the opposite angle.}", steps: [{ explanation: "Opposite angles of a parallelogram are equal.", latex: "70^\\circ" }], finalAnswerLatex: "70^\\circ" },
  ],
  guidedPractice: [
    mcq("y10-cq-g1", "Which test uses three pairs of equal sides?", "A", ["SSS", "SAS", "ASA", "RHS"], 1, "SSS = side-side-side: three equal sides."),
    ans("y10-cq-g2", "In congruent triangles, a side corresponds to one of 50 mm... an angle corresponds to one of 50°. Find that angle.", "\\text{congruent, corresponds to } 50^\\circ", "50", 2, "Corresponding angles of congruent triangles are equal: 50°.", deg("50")),
    mcq("y10-cq-g3", "Which test applies to right-angled triangles using the hypotenuse and one side?", "D", ["SSS", "SAS", "ASA", "RHS"], 2, "RHS = right angle, hypotenuse, side."),
    ans("y10-cq-g4", "A parallelogram has one side of length 12. Find the opposite side.", "\\text{parallelogram, side } 12", "12", 1, "Opposite sides of a parallelogram are equal: 12.", []),
  ],
  independentPractice: [
    mcq("y10-cq-i1", "Two triangles have two equal angles and the side BETWEEN them equal. Which test?", "C", ["SSS", "SAS", "ASA", "RHS"], 2, "Two angles and the included side is ASA."),
    ans("y10-cq-i2", "In congruent triangles a side corresponds to one of length 15. Find that side.", "\\text{congruent, corresponds to } 15", "15", 2, "Corresponding sides are equal: 15.", []),
    mcq("y10-cq-i3", "Which of these does NOT prove triangles congruent?", "D", ["SSS", "SAS", "RHS", "AAA"], 3, "AAA (three equal angles) fixes the shape but not the size — it proves similarity, not congruence."),
    ans("y10-cq-i4", "A parallelogram has an angle of 110°. Find the opposite angle.", "\\text{parallelogram, } 110^\\circ", "110", 2, "Opposite angles of a parallelogram are equal: 110°.", deg("110")),
    ans("y10-cq-i5", "Congruent triangles have an angle matching one of 65°. Find that angle.", "\\text{corresponds to } 65^\\circ", "65", 2, "Corresponding angles are equal: 65°.", deg("65")),
  ],
  masteryQuiz: [
    mcq("y10-cq-m1", "For SAS, the equal angle must be:", "B", ["any angle", "the angle between the two sides", "a right angle", "the largest angle"], 2, "SAS needs the INCLUDED angle — the one between the two known sides."),
    ans("y10-cq-m2", "A parallelogram has adjacent (co-interior) angles, one being 80°. Find the adjacent angle.", "\\text{parallelogram adjacent to } 80^\\circ", "100", 3, "Adjacent angles of a parallelogram are co-interior (supplementary): 180 − 80 = 100°.", deg("100")),
    mcq("y10-cq-m3", "Which test uses three pairs of equal sides?", "A", ["SSS", "SAS", "ASA", "RHS"], 1, "SSS = three equal sides."),
    ans("y10-cq-m4", "A rhombus has all sides equal to 6. Find its perimeter.", "\\text{rhombus, side } 6", "24", 2, "A rhombus has 4 equal sides: 4 × 6 = 24.", []),
    mcq("y10-cq-m5", "Congruent figures have equal:", "C", ["areas only", "angles only", "corresponding sides and angles", "perimeters only"], 2, "Congruent figures match in every corresponding side and angle."),
    ans("y10-cq-m6", "Find each angle of a rectangle.", "\\text{rectangle}", "90", 1, "A rectangle has four right angles: each is 90°.", deg("90")),
    mcq("y10-cq-m7", "RHS can only be used for:", "B", ["any triangle", "right-angled triangles", "equilateral triangles", "isosceles triangles"], 2, "RHS requires a right angle (plus hypotenuse and one side)."),
    ans("y10-cq-m8", "The diagonals of a parallelogram bisect each other. If half a diagonal is 5, find the full diagonal.", "\\text{half-diagonal } 5", "10", 3, "Bisect means cut in half, so the full diagonal is 2 × 5 = 10.", []),
    mcq("y10-cq-m9", "Three equal angles (AAA) prove that triangles are:", "C", ["congruent", "right-angled", "similar", "isosceles"], 3, "AAA fixes shape but not size, so it proves similarity, not congruence."),
    ans("y10-cq-m10", "A parallelogram has one angle of 60°. Find the opposite angle.", "\\text{parallelogram, } 60^\\circ", "60", 2, "Opposite angles of a parallelogram are equal: 60°.", deg("60")),
  ],
  commonMistakes: [
    { mistake: "Using AAA as a congruence test.", fix: "Equal angles only prove similarity; congruence needs a side (SSS, SAS, ASA, RHS)." },
    { mistake: "Using a non-included angle for SAS.", fix: "SAS needs the angle BETWEEN the two known sides." },
    { mistake: "Treating adjacent parallelogram angles as equal.", fix: "Opposite angles are equal; adjacent angles are supplementary." },
    { mistake: "Forgetting RHS needs a right angle.", fix: "RHS = right angle + hypotenuse + side; it is right-triangle only." },
  ],
  masteryPassMark: 0.8,
};

// ── 2E Proving Similar Triangles (path) ────────────────────────────────────────────────
const provingSimilarTriangles: Partial<ExplicitLesson> = {
  description: "Use similarity tests and the scale factor to identify similar triangles and find unknown sides.",
  learningIntention: "Establish similarity and use the scale factor to find unknown sides.",
  successCriteria: ["Use the equiangular (AAA) test for similarity.", "Find the scale factor between corresponding sides.", "Find an unknown side by multiplying by the scale factor.", "Distinguish similarity from congruence."],
  teaching: {
    paragraphs: [
      "Two triangles are SIMILAR when they have the same shape but (usually) a different size — one is an enlargement of the other. Every pair of corresponding sides is in the same ratio, and that ratio is the SCALE FACTOR.",
      "Three tests establish similarity: equiangular (AAA — all matching angles equal, and for triangles two equal pairs are enough), SAS with the two sides in equal ratio and the included angle equal, and SSS with all three sides in equal ratio.",
      "Once triangles are similar, find the scale factor by dividing a known new side by its matching original side. If a 4 cm side corresponds to 12 cm, the scale factor is 12 ÷ 4 = 3.",
      "Then any unknown side is one multiplication away: multiply the matching original side by the scale factor. Unlike congruence, similar triangles need NOT be the same size — only the same shape.",
    ],
    latexBlocks: ["\\text{scale factor} = \\frac{\\text{new side}}{\\text{matching original side}}", "\\text{Tests: equiangular (AAA), SAS ratio, SSS ratio}", "\\text{unknown side} = \\text{original} \\times \\text{scale factor}"],
  },
  workedExamples: [
    { title: "Scale factor then a side", questionLatex: "\\text{Similar triangles: 3 maps to 6, and 4 maps to } x. \\text{ Find } x.", steps: [{ explanation: "Scale factor = 6 ÷ 3 = 2.", latex: "k = 2" }, { explanation: "Multiply the matching side.", latex: "x = 4 \\times 2 = 8" }], finalAnswerLatex: "8" },
    { title: "Equiangular test", questionLatex: "\\text{Two triangles have two pairs of equal angles. Are they similar?}", steps: [{ explanation: "Two equal angle pairs force the third equal too (AAA).", latex: "\\text{equiangular}" }], finalAnswerLatex: "\\text{Yes — similar}" },
    { title: "Finding the scale factor", questionLatex: "\\text{A 5 cm side corresponds to 15 cm. Find the scale factor.}", steps: [{ explanation: "Divide new by original.", latex: "15 \\div 5 = 3" }], finalAnswerLatex: "3" },
  ],
  guidedPractice: [
    mcq("y10-ps-g1", "Which test establishes similar triangles from equal angles?", "A", ["Equiangular (AAA)", "SSS congruence", "RHS", "SAS congruence"], 2, "Equal corresponding angles (equiangular/AAA) prove similarity."),
    ans("y10-ps-g2", "Two triangles are similar with scale factor 2. A 5 cm side maps to what length?", "k=2,\\ \\text{side } 5", "10", 2, "5 × 2 = 10 cm.", ["10 cm"]),
    ans("y10-ps-g3", "Similar triangles: a 4 cm side corresponds to 12 cm. Find the scale factor.", "4 \\to 12", "3", 2, "12 ÷ 4 = 3.", []),
    ans("y10-ps-g4", "Similar triangles with scale factor 3. A 6 cm side maps to what length?", "k=3,\\ \\text{side } 6", "18", 2, "6 × 3 = 18 cm.", ["18 cm"]),
  ],
  independentPractice: [
    mcq("y10-ps-i1", "Similar (not congruent) triangles have:", "B", ["the same size and shape", "the same shape but possibly different size", "equal areas", "no equal angles"], 2, "Similar means same shape; the size may differ (congruent would be identical)."),
    ans("y10-ps-i2", "Scale factor 2: a 7 cm side maps to what length?", "k=2,\\ 7", "14", 2, "7 × 2 = 14 cm.", ["14 cm"]),
    ans("y10-ps-i3", "Similar triangles have sides 3, 4, 5 and 6, 8, x. Find x.", "3,4,5 \\sim 6,8,x", "10", 3, "Scale factor = 6 ÷ 3 = 2, so x = 5 × 2 = 10.", ["10 cm"]),
    ans("y10-ps-i4", "An 8 cm side corresponds to a 4 cm side. Find the scale factor (as a decimal).", "8 \\to 4", "0.5", 3, "4 ÷ 8 = 0.5 (a reduction).", ["1/2"]),
    ans("y10-ps-i5", "Scale factor 1/3: a 9 cm side maps to what length?", "k=\\tfrac{1}{3},\\ 9", "3", 3, "9 × 1/3 = 3 cm.", ["3 cm"]),
  ],
  masteryQuiz: [
    ans("y10-ps-m1", "Scale factor 4: a 5 cm side maps to what length?", "k=4,\\ 5", "20", 2, "5 × 4 = 20 cm.", ["20 cm"]),
    mcq("y10-ps-m2", "The SSS similarity test requires the three pairs of sides to be:", "B", ["equal", "in equal ratio", "perpendicular", "the same length"], 3, "SSS similarity needs the corresponding sides in EQUAL RATIO (not equal length)."),
    ans("y10-ps-m3", "A 5 cm side corresponds to 20 cm. Find the scale factor.", "5 \\to 20", "4", 2, "20 ÷ 5 = 4.", []),
    ans("y10-ps-m4", "Similar triangles with scale factor 3. A 7 cm side maps to what length?", "k=3,\\ 7", "21", 2, "7 × 3 = 21 cm.", ["21 cm"]),
    mcq("y10-ps-m5", "Three equal angles (AAA) prove triangles are:", "C", ["congruent", "right-angled", "similar", "isosceles"], 2, "AAA proves similarity."),
    ans("y10-ps-m6", "Scale factor 2.5: a 4 cm side maps to what length?", "k=2.5,\\ 4", "10", 3, "4 × 2.5 = 10 cm.", ["10 cm"]),
    ans("y10-ps-m7", "Similar triangles: 6 maps to 18 (scale factor 3). Another side 4 maps to what length?", "6 \\to 18,\\ 4 \\to x", "12", 3, "Scale factor 18 ÷ 6 = 3, so 4 × 3 = 12.", ["12 cm"]),
    mcq("y10-ps-m8", "Corresponding sides of similar triangles are:", "A", ["proportional", "equal", "perpendicular", "always whole numbers"], 2, "Corresponding sides of similar triangles are proportional (in the same ratio)."),
    ans("y10-ps-m9", "Scale factor 1/2: a 16 cm side maps to what length?", "k=\\tfrac{1}{2},\\ 16", "8", 3, "16 × 1/2 = 8 cm.", ["8 cm"]),
    ans("y10-ps-m10", "A 10 cm side corresponds to 15 cm. Find the scale factor (as a decimal).", "10 \\to 15", "1.5", 3, "15 ÷ 10 = 1.5.", ["3/2"]),
  ],
  commonMistakes: [
    { mistake: "Requiring equal sides for similarity.", fix: "Similarity needs sides in equal RATIO, not equal length." },
    { mistake: "Confusing similarity with congruence.", fix: "Similar = same shape (any size); congruent = identical size." },
    { mistake: "Dividing the wrong way for the scale factor.", fix: "Scale factor = new side ÷ matching original side." },
    { mistake: "Adding the scale factor instead of multiplying.", fix: "Multiply the original side by the scale factor." },
  ],
  masteryPassMark: 0.8,
};

// ── 2H Further Angle Properties of Circles (path) ──────────────────────────────────────
const furtherAngleCircles: Partial<ExplicitLesson> = {
  description: "Apply circle theorems: angle at the centre, angle in a semicircle, angles in the same segment, and cyclic quadrilaterals.",
  learningIntention: "Use circle angle theorems to find unknown angles with reasons.",
  successCriteria: ["Use angle at the centre = twice the angle at the circumference (same arc).", "Use the angle in a semicircle = 90°.", "Use that angles in the same segment are equal.", "Use that opposite angles of a cyclic quadrilateral are supplementary."],
  teaching: {
    paragraphs: [
      "Circles have their own angle theorems, each a reliable rule. ANGLE AT THE CENTRE: the angle a chord subtends at the centre is TWICE the angle it subtends at the circumference, standing on the same arc. So a 40° angle at the circumference matches an 80° angle at the centre.",
      "ANGLE IN A SEMICIRCLE: an angle drawn at the circumference standing on a diameter is always 90° — a right angle in a semicircle.",
      "SAME SEGMENT: angles at the circumference standing on the same arc (in the same segment) are equal to each other.",
      "CYCLIC QUADRILATERAL: a four-sided figure with all vertices on the circle has OPPOSITE angles that are supplementary (add to 180°). As always, give the theorem name as your reason.",
    ],
    latexBlocks: ["\\angle\\text{centre} = 2 \\times \\angle\\text{circumference (same arc)}", "\\text{angle in a semicircle} = 90^\\circ", "\\text{cyclic quad: opposite angles} = 180^\\circ"],
  },
  workedExamples: [
    { title: "Centre and circumference", questionLatex: "\\text{An angle at the circumference is } 40^\\circ. \\text{ Find the angle at the centre (same arc).}", steps: [{ explanation: "Centre angle is twice the circumference angle.", latex: "2 \\times 40^\\circ = 80^\\circ" }], finalAnswerLatex: "80^\\circ" },
    { title: "Semicircle", questionLatex: "\\text{Find the angle in a semicircle (subtended by the diameter).}", steps: [{ explanation: "The angle in a semicircle is a right angle.", latex: "90^\\circ" }], finalAnswerLatex: "90^\\circ" },
    { title: "Cyclic quadrilateral", questionLatex: "\\text{A cyclic quadrilateral has an angle of } 110^\\circ. \\text{ Find the opposite angle.}", steps: [{ explanation: "Opposite angles are supplementary.", latex: "180^\\circ - 110^\\circ = 70^\\circ" }], finalAnswerLatex: "70^\\circ" },
  ],
  guidedPractice: [
    mcq("y10-fc-g1", "The angle in a semicircle is:", "C", ["45°", "60°", "90°", "180°"], 2, "An angle standing on the diameter (in a semicircle) is a right angle, 90°."),
    ans("y10-fc-g2", "The angle at the centre is 100°. Find the angle at the circumference standing on the same arc.", "\\angle\\text{centre}=100^\\circ", "50", 3, "Circumference angle is half the centre angle: 100 ÷ 2 = 50°.", deg("50")),
    ans("y10-fc-g3", "A cyclic quadrilateral has an angle of 95°. Find the opposite angle.", "\\text{cyclic quad } 95^\\circ", "85", 3, "Opposite angles are supplementary: 180 − 95 = 85°.", deg("85")),
    ans("y10-fc-g4", "Two angles stand on the same arc (same segment). One is 40°. Find the other.", "\\text{same segment } 40^\\circ", "40", 2, "Angles in the same segment are equal: 40°.", deg("40")),
  ],
  independentPractice: [
    mcq("y10-fc-i1", "The angle at the centre of a circle is ___ the angle at the circumference on the same arc.", "B", ["half", "twice", "equal to", "three times"], 2, "The centre angle is twice the circumference angle on the same arc."),
    ans("y10-fc-i2", "An angle at the circumference is 30°. Find the angle at the centre (same arc).", "\\angle\\text{circ}=30^\\circ", "60", 3, "Centre angle = 2 × 30 = 60°.", deg("60")),
    ans("y10-fc-i3", "A cyclic quadrilateral has an angle of 120°. Find the opposite angle.", "\\text{cyclic quad } 120^\\circ", "60", 3, "180 − 120 = 60°.", deg("60")),
    ans("y10-fc-i4", "In a semicircle, a triangle has the right angle plus a 35° angle. Find the third angle.", "\\text{semicircle, } 35^\\circ", "55", 4, "The semicircle angle is 90°, so the third is 180 − 90 − 35 = 55°.", deg("55")),
    ans("y10-fc-i5", "Angles in the same segment: one is 62°. Find the other.", "\\text{same segment } 62^\\circ", "62", 2, "Angles in the same segment are equal: 62°.", deg("62")),
  ],
  masteryQuiz: [
    ans("y10-fc-m1", "The angle at the centre is 140°. Find the angle at the circumference (same arc).", "\\angle\\text{centre}=140^\\circ", "70", 3, "140 ÷ 2 = 70°.", deg("70")),
    mcq("y10-fc-m2", "Opposite angles of a cyclic quadrilateral are:", "B", ["equal", "supplementary", "complementary", "all 90°"], 2, "Opposite angles of a cyclic quadrilateral sum to 180° (supplementary)."),
    ans("y10-fc-m3", "An angle at the circumference is 45°. Find the angle at the centre (same arc).", "\\angle\\text{circ}=45^\\circ", "90", 3, "2 × 45 = 90°.", deg("90")),
    ans("y10-fc-m4", "A cyclic quadrilateral has an angle of 88°. Find the opposite angle.", "\\text{cyclic quad } 88^\\circ", "92", 3, "180 − 88 = 92°.", deg("92")),
    mcq("y10-fc-m5", "The angle a chord subtends at the centre, compared with at the circumference (same arc), is:", "A", ["double", "half", "equal", "a quarter"], 3, "The centre angle is double the circumference angle on the same arc."),
    ans("y10-fc-m6", "Find the angle in a semicircle.", "\\text{semicircle}", "90", 2, "The angle in a semicircle is 90°.", deg("90")),
    ans("y10-fc-m7", "Angles in the same segment: one is 75°. Find the other.", "\\text{same segment } 75^\\circ", "75", 2, "Equal: 75°.", deg("75")),
    mcq("y10-fc-m8", "An angle standing on a diameter (in a semicircle) is:", "C", ["acute", "obtuse", "a right angle", "a straight angle"], 2, "It is a right angle, 90°."),
    ans("y10-fc-m9", "A cyclic quadrilateral has an angle of 70°. Find the opposite angle.", "\\text{cyclic quad } 70^\\circ", "110", 3, "180 − 70 = 110°.", deg("110")),
    ans("y10-fc-m10", "The angle at the centre is 160°. Find the angle at the circumference (same arc).", "\\angle\\text{centre}=160^\\circ", "80", 3, "160 ÷ 2 = 80°.", deg("80")),
  ],
  commonMistakes: [
    { mistake: "Halving when you should double (or vice versa).", fix: "Centre = 2 × circumference; circumference = ½ × centre." },
    { mistake: "Treating cyclic-quad opposite angles as equal.", fix: "They are supplementary (sum 180°)." },
    { mistake: "Forgetting the semicircle angle is 90°.", fix: "Any angle on a diameter at the circumference is a right angle." },
    { mistake: "Mixing 'same segment' with 'same arc at the centre'.", fix: "Same-segment circumference angles are equal; the centre angle is double." },
  ],
  masteryPassMark: 0.8,
};

// ── 2J Intersecting Chords, Secants and Tangents (path) ────────────────────────────────
const intersectingChords: Partial<ExplicitLesson> = {
  description: "Use the intersecting-chords product rule and tangent properties (equal tangents, tangent perpendicular to radius).",
  learningIntention: "Apply the intersecting-chords rule and tangent properties to find unknown lengths and angles.",
  successCriteria: ["Use a × b = c × d for two intersecting chords.", "Use that two tangents from an external point are equal.", "Use that a tangent is perpendicular to the radius at the point of contact.", "Solve for an unknown chord segment."],
  teaching: {
    paragraphs: [
      "When two chords cross inside a circle, the products of their segments are EQUAL: if one chord splits into a and b, and the other into c and d, then a × b = c × d. This lets you find a missing segment by solving the equation.",
      "For example, if one chord has segments 2 and 6, and the other has 3 and x, then 2 × 6 = 3 × x, so 12 = 3x and x = 4.",
      "Tangents have two key properties. Two tangents drawn from the SAME external point are equal in length. And a tangent meets the radius at the point of contact at a RIGHT ANGLE (90°).",
      "So: set up the product equation for crossing chords, or use the equal-tangent / perpendicular-radius facts for tangent problems. Name the property as your reason.",
    ],
    latexBlocks: ["a \\times b = c \\times d \\quad\\text{(intersecting chords)}", "2 \\times 6 = 3 \\times x \\Rightarrow x = 4", "\\text{tangents from a point are equal; tangent} \\perp \\text{radius}"],
  },
  workedExamples: [
    { title: "Intersecting chords", questionLatex: "\\text{Chords cross: segments } 2 \\text{ and } 6 \\text{ meet } 3 \\text{ and } x. \\text{ Find } x.", steps: [{ explanation: "Products of segments are equal.", latex: "2 \\times 6 = 3 \\times x" }, { explanation: "Solve.", latex: "12 = 3x \\Rightarrow x = 4" }], finalAnswerLatex: "4" },
    { title: "Equal tangents", questionLatex: "\\text{Two tangents from a point: one is } 7. \\text{ Find the other.}", steps: [{ explanation: "Tangents from an external point are equal.", latex: "7" }], finalAnswerLatex: "7" },
    { title: "Tangent and radius", questionLatex: "\\text{Find the angle between a tangent and the radius at the point of contact.}", steps: [{ explanation: "A tangent is perpendicular to the radius.", latex: "90^\\circ" }], finalAnswerLatex: "90^\\circ" },
  ],
  guidedPractice: [
    mcq("y10-ic-g1", "Two tangents drawn from the same external point are:", "A", ["equal in length", "perpendicular", "parallel", "always 5 cm"], 2, "Tangents from a common external point are equal in length."),
    ans("y10-ic-g2", "Intersecting chords: 2 × 8 = 4 × x. Find x.", "2 \\times 8 = 4 \\times x", "4", 3, "16 = 4x, so x = 4.", []),
    ans("y10-ic-g3", "Find the angle between a tangent and the radius at the point of contact.", "", "90", 2, "A tangent is perpendicular to the radius: 90°.", deg("90")),
    ans("y10-ic-g4", "Intersecting chords: 3 × 4 = 6 × x. Find x.", "3 \\times 4 = 6 \\times x", "2", 3, "12 = 6x, so x = 2.", []),
  ],
  independentPractice: [
    mcq("y10-ic-i1", "A tangent to a circle is perpendicular to the:", "B", ["chord", "radius at the point of contact", "diameter at the centre", "circumference"], 2, "A tangent meets the radius at the point of contact at 90°."),
    ans("y10-ic-i2", "Intersecting chords: 5 × 4 = 10 × x. Find x.", "5 \\times 4 = 10 \\times x", "2", 3, "20 = 10x, so x = 2.", []),
    ans("y10-ic-i3", "Two tangents from a point: one has length 9. Find the other.", "\\text{tangents, one } 9", "9", 2, "Tangents from a point are equal: 9.", []),
    ans("y10-ic-i4", "Intersecting chords: 6 × 6 = 9 × x. Find x.", "6 \\times 6 = 9 \\times x", "4", 3, "36 = 9x, so x = 4.", []),
    ans("y10-ic-i5", "Intersecting chords: 2 × 10 = 5 × x. Find x.", "2 \\times 10 = 5 \\times x", "4", 3, "20 = 5x, so x = 4.", []),
  ],
  masteryQuiz: [
    ans("y10-ic-m1", "Intersecting chords: 3 × 8 = 6 × x. Find x.", "3 \\times 8 = 6 \\times x", "4", 3, "24 = 6x, so x = 4.", []),
    mcq("y10-ic-m2", "For two intersecting chords, the products of the segments are:", "A", ["equal", "supplementary", "in ratio 2:1", "always 12"], 3, "a × b = c × d: the products are equal."),
    ans("y10-ic-m3", "Intersecting chords: 4 × 9 = 6 × x. Find x.", "4 \\times 9 = 6 \\times x", "6", 3, "36 = 6x, so x = 6.", []),
    ans("y10-ic-m4", "Two tangents from a point: one has length 12. Find the other.", "\\text{tangents, one } 12", "12", 2, "Tangents from a point are equal: 12.", []),
    mcq("y10-ic-m5", "A tangent and the radius at the point of contact form an angle of:", "C", ["45°", "60°", "90°", "180°"], 2, "A tangent is perpendicular to the radius: 90°."),
    ans("y10-ic-m6", "Intersecting chords: 5 × 6 = 10 × x. Find x.", "5 \\times 6 = 10 \\times x", "3", 3, "30 = 10x, so x = 3.", []),
    ans("y10-ic-m7", "Intersecting chords: 8 × 3 = 4 × x. Find x.", "8 \\times 3 = 4 \\times x", "6", 3, "24 = 4x, so x = 6.", []),
    mcq("y10-ic-m8", "Two tangents from an external point are:", "A", ["equal in length", "perpendicular to each other", "parallel", "of ratio 2:1"], 2, "They are equal in length."),
    ans("y10-ic-m9", "Intersecting chords: 2 × 12 = 8 × x. Find x.", "2 \\times 12 = 8 \\times x", "3", 4, "24 = 8x, so x = 3.", []),
    ans("y10-ic-m10", "Intersecting chords: 7 × 4 = 14 × x. Find x.", "7 \\times 4 = 14 \\times x", "2", 4, "28 = 14x, so x = 2.", []),
  ],
  commonMistakes: [
    { mistake: "Adding the chord segments instead of multiplying.", fix: "Use the PRODUCT rule: a × b = c × d." },
    { mistake: "Thinking tangents from a point have different lengths.", fix: "Two tangents from the same external point are equal." },
    { mistake: "Forgetting the tangent-radius right angle.", fix: "A tangent is perpendicular (90°) to the radius at the contact point." },
    { mistake: "Solving the product equation incorrectly.", fix: "Compute one product, then divide by the known segment." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "review-of-geometry": reviewOfGeometry,
  "congruence-quadrilaterals": congruenceQuadrilaterals,
  "proving-similar-triangles": provingSimilarTriangles,
  "further-angle-properties-circles": furtherAngleCircles,
  "intersecting-chords-secants-tangents": intersectingChords,
};

export function year10GeometryWave3LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "geometrical-figures-circle-geometry"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
