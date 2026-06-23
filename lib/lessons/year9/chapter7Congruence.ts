// Year 9 Wave 8 — Chapter 7, congruence & similarity sections (ADR-Y9-001):
// congruent-triangles (path), congruence-in-proof (path), enlargement-similar-figures (core),
// similar-triangles (core), proving-similar-triangles (path). Full per-subtopic contract.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Match corresponding parts; use the congruence/similarity tests.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the tests.", explanation };
}

// ── congruent-triangles (path) ─────────────────────────────────────────────────────────
const congruentTriangles: Partial<ExplicitLesson> = {
  description: "Identify congruent triangles using SSS, SAS, AAS and RHS, and use corresponding parts.",
  learningIntention: "Recognise congruence and the four tests.",
  successCriteria: ["Know congruent means identical in size and shape.", "Identify the test (SSS/SAS/AAS/RHS).", "Use that SAS needs the included angle.", "Read off equal corresponding parts."],
  teaching: {
    paragraphs: [
      "Two triangles are CONGRUENT if they are identical in size and shape — one fits exactly on the other. Their corresponding sides and angles are EQUAL.",
      "There are four CONGRUENCE TESTS: SSS (three sides), SAS (two sides and the INCLUDED angle), AAS (two angles and a side), and RHS (right angle, hypotenuse and a side).",
      "SAS needs the angle BETWEEN the two sides; AAA is NOT a test (it only shows similarity).",
      "Once triangles are congruent, matching sides and angles are equal.",
    ],
    latexBlocks: ["\\text{Tests: SSS, SAS, AAS, RHS}", "\\text{congruent} \\Rightarrow \\text{equal corresponding parts}"],
  },
  workedExamples: [
    { title: "Three sides", questionLatex: "\\text{Three pairs of equal sides. Test?}", steps: [{ explanation: "Side-Side-Side.", latex: "\\text{SSS}" }], finalAnswerLatex: "\\text{SSS}" },
    { title: "Included angle", questionLatex: "\\text{Two sides and the angle between. Test?}", steps: [{ explanation: "Side-Angle-Side.", latex: "\\text{SAS}" }], finalAnswerLatex: "\\text{SAS}" },
    { title: "Corresponding side", questionLatex: "\\text{Congruent, } AB = 5. \\text{ Matching side?}", steps: [{ explanation: "Equal.", latex: "5" }], finalAnswerLatex: "5" },
  ],
  guidedPractice: [
    ans("y9-ct-g1", "Which test: three pairs of equal sides? (SSS/SAS/AAS/RHS)", "3 sides", "SSS", 2, "Three sides → SSS.", ["sss"]),
    ans("y9-ct-g2", "Which test: two sides and the included angle? (SSS/SAS/AAS/RHS)", "2 sides + incl angle", "SAS", 2, "SAS.", ["sas"]),
    ans("y9-ct-g3", "Which test: right angle, hypotenuse and one side? (SSS/SAS/AAS/RHS)", "right, hyp, side", "RHS", 3, "RHS.", ["rhs"]),
    mcq("y9-ct-g4", "Congruent figures are:", "A", ["identical in size and shape", "the same shape but different size", "always right-angled", "always equilateral"], 2, "Identical in size and shape."),
  ],
  independentPractice: [
    ans("y9-ct-i1", "Which test: two angles and a side? (SSS/SAS/AAS/RHS)", "2 angles + side", "AAS", 3, "AAS.", ["aas"]),
    ans("y9-ct-i2", "Congruent triangles, AB = 7. Find the matching side.", "AB=7", "7", 2, "Equal: 7.", []),
    mcq("y9-ct-i3", "For SAS, the angle must be:", "B", ["any angle", "the included angle", "a right angle", "the largest angle"], 3, "The included angle (between the two sides)."),
    ans("y9-ct-i4", "Which test uses a right angle, the hypotenuse and a side?", "RHS", "RHS", 2, "RHS.", ["rhs"]),
    mcq("y9-ct-i5", "Which is NOT a congruence test?", "C", ["SSS", "SAS", "AAA", "RHS"], 3, "AAA shows similarity, not congruence."),
  ],
  masteryQuiz: [
    ans("y9-ct-m1", "Which test: three pairs of equal sides?", "3 sides", "SSS", 2, "SSS.", ["sss"]),
    ans("y9-ct-m2", "Which test: two sides and the included angle?", "SAS", "SAS", 2, "SAS.", ["sas"]),
    ans("y9-ct-m3", "Which test: two angles and a corresponding side?", "AAS", "AAS", 2, "AAS.", ["aas"]),
    ans("y9-ct-m4", "Which test: right angle, hypotenuse and a side?", "RHS", "RHS", 2, "RHS.", ["rhs"]),
    mcq("y9-ct-m5", "Congruent triangles have corresponding parts that are:", "A", ["equal", "proportional", "supplementary", "different"], 2, "Equal."),
    ans("y9-ct-m6", "Congruent triangles, a side is 7 cm. Find the matching side.", "side 7", "7", 2, "7.", []),
    mcq("y9-ct-m7", "Which is NOT a valid congruence test?", "D", ["SSS", "AAS", "RHS", "AAA"], 3, "AAA is not a congruence test."),
    ans("y9-ct-m8", "Which test uses two sides with the angle between them?", "incl angle", "SAS", 2, "SAS.", ["sas"]),
    ans("y9-ct-m9", "Congruent triangles, an angle is 40°. Find the matching angle.", "angle 40", "40", 2, "40.", ["40°"]),
    mcq("y9-ct-m10", "RHS applies only to:", "B", ["equilateral triangles", "right-angled triangles", "isosceles triangles", "obtuse triangles"], 2, "Right-angled triangles."),
  ],
  masteryQuizPool: [
    ans("y9-ct-p1", "Two triangles share equal sides 5, 6, 7 with 5, 6, 7. Which test proves congruence?", "5,6,7", "SSS", 5, "Three equal sides → SSS.", ["sss"]),
    ans("y9-ct-p2", "Triangles with sides 8, 10 and the 40° angle between them match. Which test?", "8,10,40 incl", "SAS", 5, "Two sides + included angle → SAS.", ["sas"]),
    ans("y9-ct-p3", "Congruent triangles △ABC ≅ △DEF with AB = 9. Find DE.", "ABC≅DEF,AB=9", "9", 5, "DE corresponds to AB → 9.", []),
    ans("y9-ct-p4", "Right triangles with equal hypotenuse 13 and one leg 5 match. Which test?", "RHS 13,5", "RHS", 5, "Right angle, hypotenuse, side → RHS.", ["rhs"]),
    ans("y9-ct-p5", "△ABC ≅ △DEF and angle C = 55°. Find angle F.", "angle C=55", "55", 5, "F corresponds to C → 55.", ["55°"]),
    ans("y9-ct-p6", "Triangles with two angles 50°, 60° and a matching side. Which test?", "50,60 + side", "AAS", 5, "Two angles + a side → AAS.", ["aas"]),
    ans("y9-ct-p7", "An isosceles triangle is split by its axis of symmetry into two congruent triangles by which test (equal sides + included angle)?", "isosceles split", "SAS", 5, "Two equal sides + the included apex angle → SAS.", ["sas"]),
    ans("y9-ct-p8", "△ABC ≅ △DEF with BC = 12 and angle A = 90°. Find EF.", "BC=12", "12", 5, "EF corresponds to BC → 12.", []),
    ans("y9-ct-p9", "Two triangles have all three angles equal but no equal sides. Are they congruent? (yes/no)", "AAA", "no", 5, "AAA gives similarity, not congruence.", []),
    ans("y9-ct-p10", "Triangles with sides 6, 6 and included 70° match 6, 6 and 70°. Which test?", "6,6,70 incl", "SAS", 5, "SAS.", ["sas"]),
  ],
  commonMistakes: [
    { mistake: "Treating AAA as a congruence test.", fix: "AAA only shows similarity." },
    { mistake: "Using a non-included angle for SAS.", fix: "SAS needs the angle BETWEEN the two sides." },
    { mistake: "Thinking congruent parts are merely proportional.", fix: "They are equal." },
    { mistake: "Applying RHS to non-right triangles.", fix: "RHS needs a right angle." },
  ],
  masteryPassMark: 0.8,
};

// ── congruence-in-proof (path) ─────────────────────────────────────────────────────────
const congruenceInProof: Partial<ExplicitLesson> = {
  description: "Use a congruence to justify that corresponding sides and angles are equal.",
  learningIntention: "Apply proven congruence to deduce equal parts.",
  successCriteria: ["State which test proves a congruence.", "Deduce equal corresponding sides.", "Deduce equal corresponding angles.", "Use congruence to prove a property."],
  teaching: {
    paragraphs: [
      "Once two triangles are proved CONGRUENT, every pair of CORRESPONDING parts is equal — this is how we PROVE sides or angles equal.",
      "Choose the right test from the given information (SSS, SAS, AAS or RHS), then read off the matching parts. If △ABC ≅ △DEF, then AB = DE and angle A = angle D.",
      "This is the standard way to prove that, say, two sides of a figure are equal — show the triangles containing them are congruent.",
      "Always name corresponding vertices in the same order so matching parts line up.",
    ],
    latexBlocks: ["\\triangle ABC \\cong \\triangle DEF \\Rightarrow AB = DE,\\ \\angle A = \\angle D"],
  },
  workedExamples: [
    { title: "Equal side", questionLatex: "\\triangle ABC \\cong \\triangle DEF, BC = 8. \\text{ Find } EF.", steps: [{ explanation: "Corresponding.", latex: "8" }], finalAnswerLatex: "8" },
    { title: "Equal angle", questionLatex: "\\angle A = 50^\\circ. \\text{ Find } \\angle D.", steps: [{ explanation: "Corresponding.", latex: "50^\\circ" }], finalAnswerLatex: "50^\\circ" },
    { title: "Which test", questionLatex: "\\text{Given 2 sides + included angle, which test?}", steps: [{ explanation: "SAS.", latex: "\\text{SAS}" }], finalAnswerLatex: "\\text{SAS}" },
  ],
  guidedPractice: [
    ans("y9-cp-g1", "△ABC ≅ △DEF and BC = 8. Find EF.", "BC=8", "8", 2, "EF = BC = 8.", []),
    ans("y9-cp-g2", "△ABC ≅ △DEF and angle A = 50°. Find angle D.", "angle A=50", "50", 2, "50.", ["50°"]),
    mcq("y9-cp-g3", "In congruent triangles, corresponding parts are:", "A", ["equal", "proportional", "supplementary", "unrelated"], 2, "Equal."),
    ans("y9-cp-g4", "Given three equal sides, which test proves congruence?", "3 sides", "SSS", 2, "SSS.", ["sss"]),
  ],
  independentPractice: [
    ans("y9-cp-i1", "△ABC ≅ △DEF and AC = 10. Find DF.", "AC=10", "10", 2, "DF = AC = 10.", []),
    ans("y9-cp-i2", "△ABC ≅ △DEF and angle B = 70°. Find angle E.", "angle B=70", "70", 2, "70.", ["70°"]),
    mcq("y9-cp-i3", "To prove two sides equal, you show the triangles containing them are:", "B", ["similar", "congruent", "isosceles", "right-angled"], 3, "Congruent → corresponding sides equal."),
    ans("y9-cp-i4", "Given two sides and the included angle, which test?", "SAS", "SAS", 2, "SAS.", ["sas"]),
    mcq("y9-cp-i5", "Vertices should be named:", "C", ["in any order", "alphabetically", "in corresponding order", "largest first"], 3, "In corresponding order so parts match."),
  ],
  masteryQuiz: [
    ans("y9-cp-m1", "△ABC ≅ △DEF and AB = 6. Find DE.", "AB=6", "6", 2, "6.", []),
    ans("y9-cp-m2", "△ABC ≅ △DEF and angle C = 45°. Find angle F.", "angle C=45", "45", 2, "45.", ["45°"]),
    ans("y9-cp-m3", "Given three pairs of equal sides, which test?", "3 sides", "SSS", 2, "SSS.", ["sss"]),
    mcq("y9-cp-m4", "Congruent triangles let us conclude corresponding angles are:", "A", ["equal", "proportional", "complementary", "double"], 2, "Equal."),
    ans("y9-cp-m5", "△ABC ≅ △DEF and BC = 11. Find EF.", "BC=11", "11", 2, "11.", []),
    ans("y9-cp-m6", "Given two angles and a side, which test?", "AAS", "AAS", 2, "AAS.", ["aas"]),
    ans("y9-cp-m7", "△ABC ≅ △DEF and angle A = 90°. Find angle D.", "angle A=90", "90", 2, "90.", ["90°"]),
    mcq("y9-cp-m8", "To prove a triangle is isosceles you can show two triangles are congruent and so two sides are:", "A", ["equal", "perpendicular", "parallel", "halved"], 3, "Equal."),
    ans("y9-cp-m9", "△ABC ≅ △DEF and AC = 9. Find DF.", "AC=9", "9", 2, "9.", []),
    mcq("y9-cp-m10", "Given a right angle, hypotenuse and a side, which test?", "D", ["SSS", "SAS", "AAS", "RHS"], 2, "RHS."),
  ],
  masteryQuizPool: [
    ans("y9-cp-p1", "△ABC ≅ △DEF by SAS, with AB = 5, BC = 7. Find EF.", "SAS,BC=7", "7", 5, "EF corresponds to BC → 7.", []),
    ans("y9-cp-p2", "A kite is split into two congruent triangles; one has an angle of 35°. Find the matching angle.", "kite 35", "35", 5, "Corresponding angle = 35.", ["35°"]),
    ans("y9-cp-p3", "△ABC ≅ △DEF; angles A = 50°, B = 60°. Find angle F.", "A=50,B=60", "70", 5, "C = 180 − 110 = 70; F = C = 70.", ["70°"]),
    ans("y9-cp-p4", "An isosceles triangle proved by SAS has a base of 8. The matching base is:", "isosceles SAS base 8", "8", 5, "Corresponding base = 8.", []),
    ans("y9-cp-p5", "△PQR ≅ △STU with PQ = 12, QR = 9, PR = 15. Find SU (corresponds to PR).", "PR=15", "15", 5, "SU = PR = 15.", []),
    ans("y9-cp-p6", "Two triangles are congruent by AAS; one side is 6. The matching side is:", "AAS 6", "6", 5, "6.", []),
    ans("y9-cp-p7", "△ABC ≅ △DEF; angle D = 80°, angle E = 55°. Find angle C.", "D=80,E=55", "45", 5, "F = 180 − 135 = 45; C = F = 45.", ["45°"]),
    ans("y9-cp-p8", "A diagonal splits a parallelogram into two congruent triangles. A side of 10 matches a side of:", "parallelogram diag", "10", 5, "Corresponding side = 10.", []),
    ans("y9-cp-p9", "△ABC ≅ △DEF by RHS; the hypotenuse is 13. The matching hypotenuse is:", "RHS hyp 13", "13", 5, "13.", []),
    ans("y9-cp-p10", "Triangles proved congruent by SSS have sides 7, 24, 25. The longest matching side is:", "SSS 7,24,25", "25", 5, "Longest = 25.", []),
  ],
  commonMistakes: [
    { mistake: "Concluding equality before proving congruence.", fix: "Prove congruent first, then deduce equal parts." },
    { mistake: "Mismatching corresponding vertices.", fix: "Name vertices in corresponding order." },
    { mistake: "Choosing the wrong test for the given facts.", fix: "Match the given information to SSS/SAS/AAS/RHS." },
    { mistake: "Using similarity facts to claim equality.", fix: "Only congruence gives equal (not just proportional) parts." },
  ],
  masteryPassMark: 0.8,
};

// ── enlargement-similar-figures (core) ─────────────────────────────────────────────────
const enlargementSimilar: Partial<ExplicitLesson> = {
  description: "Use scale factors to enlarge or reduce figures, and recognise similar figures.",
  learningIntention: "Work with scale factor and similarity.",
  successCriteria: ["Find a scale factor (image ÷ original).", "Enlarge a length by a scale factor.", "Reduce a length by a scale factor < 1.", "Know similar figures have equal angles."],
  teaching: {
    paragraphs: [
      "An ENLARGEMENT multiplies every length by a SCALE FACTOR (SF). SF = image ÷ original. If a length grows from 5 to 10, the scale factor is 2.",
      "To enlarge, MULTIPLY by the SF: a length of 4 enlarged by SF 3 becomes 12. A SF less than 1 gives a REDUCTION.",
      "SIMILAR figures have the SAME SHAPE: their angles are EQUAL and their sides are in the same ratio (the scale factor).",
      "So similarity keeps angles equal but allows the size to change.",
    ],
    latexBlocks: ["\\text{SF} = \\tfrac{\\text{image}}{\\text{original}}", "\\text{image} = \\text{SF} \\times \\text{original}"],
  },
  workedExamples: [
    { title: "Scale factor", questionLatex: "\\text{Image } 10, \\text{ original } 5. \\text{ SF?}", steps: [{ explanation: "10 ÷ 5.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Enlarge", questionLatex: "\\text{Enlarge } 4 \\text{ by SF } 3.", steps: [{ explanation: "4 × 3.", latex: "12" }], finalAnswerLatex: "12" },
    { title: "Reduce", questionLatex: "\\text{Reduce } 12 \\text{ by SF } \\tfrac12.", steps: [{ explanation: "12 × 0.5.", latex: "6" }], finalAnswerLatex: "6" },
  ],
  guidedPractice: [
    ans("y9-es-g1", "Image 12, original 4. Find the scale factor.", "12/4", "3", 2, "12 ÷ 4 = 3.", []),
    ans("y9-es-g2", "Enlarge a length of 5 by scale factor 2.", "5\\times2", "10", 2, "10.", []),
    ans("y9-es-g3", "Image 18, original 6. Find the scale factor.", "18/6", "3", 2, "3.", []),
    mcq("y9-es-g4", "Similar figures have angles that are:", "A", ["equal", "proportional", "supplementary", "doubled"], 2, "Equal angles."),
  ],
  independentPractice: [
    ans("y9-es-i1", "Image 20, original 5. Find the scale factor.", "20/5", "4", 2, "4.", []),
    ans("y9-es-i2", "Enlarge a length of 7 by scale factor 3.", "7\\times3", "21", 2, "21.", []),
    ans("y9-es-i3", "Reduce a length of 12 by scale factor 1/2.", "12\\times0.5", "6", 2, "6.", []),
    mcq("y9-es-i4", "The scale factor equals:", "B", ["original ÷ image", "image ÷ original", "image × original", "image − original"], 2, "image ÷ original."),
    ans("y9-es-i5", "Image 24, original 8. Find the scale factor.", "24/8", "3", 2, "3.", []),
  ],
  masteryQuiz: [
    ans("y9-es-m1", "Image 10, original 5. Find the scale factor.", "10/5", "2", 2, "2.", []),
    ans("y9-es-m2", "Enlarge a length of 6 by scale factor 4.", "6\\times4", "24", 2, "24.", []),
    ans("y9-es-m3", "Image 15, original 3. Find the scale factor.", "15/3", "5", 2, "5.", []),
    mcq("y9-es-m4", "Similar figures have the same:", "C", ["size", "perimeter", "shape", "area"], 2, "Same shape."),
    ans("y9-es-m5", "Reduce a length of 20 by scale factor 1/4.", "20\\times0.25", "5", 2, "5.", []),
    ans("y9-es-m6", "Image 18, original 6. Find the scale factor.", "18/6", "3", 2, "3.", []),
    ans("y9-es-m7", "Enlarge a length of 9 by scale factor 2.", "9\\times2", "18", 2, "18.", []),
    ans("y9-es-m8", "Image 20, original 5. Find the scale factor.", "20/5", "4", 2, "4.", []),
    mcq("y9-es-m9", "A scale factor less than 1 produces a:", "B", ["enlargement", "reduction", "rotation", "reflection"], 2, "Reduction."),
    ans("y9-es-m10", "Enlarge a length of 10 by scale factor 1.5.", "10\\times1.5", "15", 3, "15.", []),
  ],
  masteryQuizPool: [
    ans("y9-es-p1", "Two similar rectangles: one side goes 4 → 6. The other side is 8; find its image.", "4->6,8->?", "12", 5, "SF = 1.5; 8 × 1.5 = 12.", []),
    ans("y9-es-p2", "Similar figures have a linear scale factor of 3. By what factor does the area scale?", "area SF", "9", 5, "Area SF = (linear SF)² = 9.", []),
    ans("y9-es-p3", "A photo 6 cm wide is enlarged so the width becomes 15 cm. Find the scale factor.", "15/6", "2.5", 5, "15 ÷ 6 = 2.5.", []),
    ans("y9-es-p4", "A map scale factor reduces 200 cm to 4 cm. Find the scale factor.", "4/200", "0.02", 5, "4 ÷ 200 = 0.02 (1:50).", ["1/50"]),
    ans("y9-es-p5", "Two similar triangles: sides 3 → 12. The matching side to 5 is:", "3->12,5->?", "20", 5, "SF = 4; 5 × 4 = 20.", []),
    ans("y9-es-p6", "A figure has area 20 cm²; enlarged by linear SF 2, the new area is:", "area SF2", "80", 5, "20 × 2² = 80.", ["80 cm²"]),
    ans("y9-es-p7", "Similar rectangles: 5×8 and 15×?. Find the missing side.", "5x8,15x?", "24", 5, "SF = 3; 8 × 3 = 24.", []),
    ans("y9-es-p8", "A length of 9 is reduced by scale factor 2/3. Find the image.", "9\\times2/3", "6", 5, "9 × 2/3 = 6.", []),
    ans("y9-es-p9", "Similar figures with linear SF 5 — the area scale factor is:", "area SF5", "25", 5, "5² = 25.", []),
    ans("y9-es-p10", "An image side is 21 and the original is 7. Find the scale factor.", "21/7", "3", 5, "3.", []),
  ],
  commonMistakes: [
    { mistake: "Computing SF as original ÷ image.", fix: "SF = image ÷ original." },
    { mistake: "Scaling area by the linear factor.", fix: "Area scales by (SF)²." },
    { mistake: "Thinking similar means same size.", fix: "Similar = same shape, sizes related by the SF." },
    { mistake: "Adding the SF instead of multiplying.", fix: "Multiply lengths by the SF." },
  ],
  masteryPassMark: 0.8,
};

// ── similar-triangles (core) ───────────────────────────────────────────────────────────
const similarTriangles: Partial<ExplicitLesson> = {
  description: "Use equal angles and proportional sides of similar triangles to find unknown lengths.",
  learningIntention: "Find missing sides in similar triangles.",
  successCriteria: ["Know similar triangles have equal angles.", "Find the scale factor between triangles.", "Set up a proportion for a missing side.", "Solve the proportion."],
  teaching: {
    paragraphs: [
      "SIMILAR triangles have EQUAL angles and PROPORTIONAL sides. The ratio of matching sides is the SCALE FACTOR.",
      "If a side goes from 5 to 10, the scale factor is 2, so every other side also doubles: a side of 4 becomes 8.",
      "To find a missing side, set up a PROPORTION of matching sides and solve: 3/6 = 4/x gives x = 8.",
      "Match the sides carefully — smallest to smallest, largest to largest.",
    ],
    latexBlocks: ["\\tfrac{a}{a'} = \\tfrac{b}{b'} = \\text{SF}", "\\tfrac36 = \\tfrac4x \\Rightarrow x = 8"],
  },
  workedExamples: [
    { title: "Scale factor", questionLatex: "\\text{Sides } 5 \\to 10. \\text{ SF?}", steps: [{ explanation: "10 ÷ 5.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Missing side", questionLatex: "\\tfrac36 = \\tfrac4x. \\text{ Find } x.", steps: [{ explanation: "Cross-multiply.", latex: "x = 8" }], finalAnswerLatex: "8" },
    { title: "Use SF", questionLatex: "\\text{SF } 2, \\text{ side } 4. \\text{ Image?}", steps: [{ explanation: "4 × 2.", latex: "8" }], finalAnswerLatex: "8" },
  ],
  guidedPractice: [
    ans("y9-st-g1", "Similar triangles, scale factor 2, side 3. Find the matching side.", "SF2,side3", "6", 2, "3 × 2 = 6.", []),
    ans("y9-st-g2", "Matching sides 4 and 12. Find the scale factor.", "4->12", "3", 2, "12 ÷ 4 = 3.", []),
    ans("y9-st-g3", "Solve 2/4 = 3/x for the missing side x.", "2/4=3/x", "6", 3, "Cross-multiply: 2x = 12 → x = 6.", []),
    mcq("y9-st-g4", "Similar triangles have:", "A", ["equal angles", "equal sides", "a right angle", "the same area"], 2, "Equal angles."),
  ],
  independentPractice: [
    ans("y9-st-i1", "Similar triangles, scale factor 3, side 5. Find the matching side.", "SF3,side5", "15", 2, "15.", []),
    ans("y9-st-i2", "Matching sides 5 and 15. Find the scale factor.", "5->15", "3", 2, "3.", []),
    ans("y9-st-i3", "Solve 3/6 = 4/x for x.", "3/6=4/x", "8", 3, "3x = 24 → x = 8.", []),
    mcq("y9-st-i4", "Similar triangles have sides that are:", "B", ["equal", "proportional", "perpendicular", "unrelated"], 2, "Proportional."),
    ans("y9-st-i5", "Matching sides 6 and 18, another side 5. Find its image.", "6->18,5->?", "15", 3, "SF = 3; 5 × 3 = 15.", []),
  ],
  masteryQuiz: [
    ans("y9-st-m1", "Similar triangles, scale factor 2, side 7. Find the matching side.", "SF2,side7", "14", 2, "14.", []),
    ans("y9-st-m2", "Solve 2/6 = 5/x for x.", "2/6=5/x", "15", 3, "2x = 30 → x = 15.", []),
    ans("y9-st-m3", "Matching sides 4 and 20. Find the scale factor.", "4->20", "5", 2, "5.", []),
    mcq("y9-st-m4", "The usual test that two triangles are similar is:", "A", ["AA (two equal angles)", "SSS congruence", "RHS", "AAS"], 3, "Two equal angles (AA)."),
    ans("y9-st-m5", "Solve 3/9 = 2/x for x.", "3/9=2/x", "6", 3, "3x = 18 → x = 6.", []),
    ans("y9-st-m6", "Similar triangles, scale factor 3, side 8. Find the matching side.", "SF3,side8", "24", 2, "24.", []),
    ans("y9-st-m7", "Matching sides 5 and 10, another side 7. Find its image.", "5->10,7->?", "14", 3, "SF = 2; 7 × 2 = 14.", []),
    ans("y9-st-m8", "Solve 4/8 = 6/x for x.", "4/8=6/x", "12", 3, "4x = 48 → x = 12.", []),
    mcq("y9-st-m9", "Similar triangles always have:", "C", ["equal areas", "equal sides", "equal angles", "a right angle"], 2, "Equal angles."),
    ans("y9-st-m10", "Reduce by scale factor 1/2: a side of 10 becomes.", "10\\times0.5", "5", 2, "5.", []),
  ],
  masteryQuizPool: [
    ans("y9-st-p1", "A 2 m stick casts a 3 m shadow; a tree casts a 12 m shadow. Find the tree's height.", "2/3=h/12", "8", 5, "h = 12 × (2/3) = 8 m.", ["8 m"]),
    ans("y9-st-p2", "Similar triangles: 6/10 = 9/x. Find x.", "6/10=9/x", "15", 5, "6x = 90 → x = 15.", []),
    ans("y9-st-p3", "Two similar triangles have SF 2.5; a side of 4 maps to:", "SF2.5,4", "10", 5, "4 × 2.5 = 10.", []),
    ans("y9-st-p4", "Nested triangles (parallel line) give 4/6 = 6/x. Find x.", "4/6=6/x", "9", 5, "4x = 36 → x = 9.", []),
    ans("y9-st-p5", "A 1.5 m person casts a 2 m shadow; a pole casts an 8 m shadow. Find the pole's height.", "1.5/2=h/8", "6", 5, "h = 8 × 0.75 = 6 m.", ["6 m"]),
    ans("y9-st-p6", "Similar triangles: 5/15 = 7/x. Find x.", "5/15=7/x", "21", 5, "5x = 105 → x = 21.", []),
    ans("y9-st-p7", "Similar triangles with SF 4; the smaller has area... a side 3 maps to:", "SF4,3", "12", 5, "3 × 4 = 12.", []),
    ans("y9-st-p8", "Triangles: 8/12 = 10/x. Find x.", "8/12=10/x", "15", 5, "8x = 120 → x = 15.", []),
    ans("y9-st-p9", "A model is similar to the real object with SF 1/20; the real length is 100 m, so the model length is:", "SF1/20,100", "5", 5, "100 × (1/20) = 5 m.", ["5 m"]),
    ans("y9-st-p10", "Similar triangles: 9/6 = x/4. Find x.", "9/6=x/4", "6", 5, "6x = 36 → x = 6.", []),
  ],
  commonMistakes: [
    { mistake: "Matching the wrong pairs of sides.", fix: "Pair corresponding sides (by position/angle)." },
    { mistake: "Adding instead of scaling.", fix: "Multiply by the scale factor." },
    { mistake: "Inverting the proportion.", fix: "Keep matching sides in the same positions in the ratio." },
    { mistake: "Confusing similar with congruent.", fix: "Similar allows different sizes (proportional sides)." },
  ],
  masteryPassMark: 0.8,
};

// ── proving-similar-triangles (path) ───────────────────────────────────────────────────
const provingSimilar: Partial<ExplicitLesson> = {
  description: "Use the similarity tests (AA, SAS, SSS) to prove triangles similar and find lengths.",
  learningIntention: "Identify the similarity test and apply it.",
  successCriteria: ["Know AA needs two equal angles.", "Recognise the SAS and SSS similarity tests.", "Prove similar, then find a length.", "Distinguish similarity from congruence."],
  teaching: {
    paragraphs: [
      "Triangles are SIMILAR if they pass a similarity test: AA (two pairs of equal angles), SAS (two sides in the same ratio with the included angle equal), or SSS (all three sides in the same ratio).",
      "AA is the most common: showing just TWO equal angles is enough (the third must then match).",
      "Once similar, the sides are PROPORTIONAL, so you can find a missing length with a proportion.",
      "Unlike congruence, similarity allows the triangles to be different SIZES.",
    ],
    latexBlocks: ["\\text{Tests: AA, SAS, SSS (ratios)}", "\\text{similar} \\Rightarrow \\text{sides proportional}"],
  },
  workedExamples: [
    { title: "AA test", questionLatex: "\\text{Two pairs of equal angles. Test?}", steps: [{ explanation: "Angle-Angle.", latex: "\\text{AA}" }], finalAnswerLatex: "\\text{AA}" },
    { title: "How many angles", questionLatex: "\\text{AA needs how many equal angles?}", steps: [{ explanation: "Two.", latex: "2" }], finalAnswerLatex: "2" },
    { title: "Find a length", questionLatex: "\\text{Similar: } \\tfrac36 = \\tfrac5x. \\text{ Find } x.", steps: [{ explanation: "Cross-multiply.", latex: "10" }], finalAnswerLatex: "10" },
  ],
  guidedPractice: [
    ans("y9-ps-g1", "Two pairs of equal angles prove similarity by which test?", "AA", "AA", 2, "AA.", ["aa"]),
    mcq("y9-ps-g2", "Similar triangles must have angles that are:", "A", ["equal", "supplementary", "complementary", "right"], 2, "Equal."),
    ans("y9-ps-g3", "Similar triangles: 3/6 = 5/x. Find x.", "3/6=5/x", "10", 3, "3x = 30 → x = 10.", []),
    ans("y9-ps-g4", "How many equal angles does the AA test need?", "AA count", "2", 2, "Two.", []),
  ],
  independentPractice: [
    ans("y9-ps-i1", "Three pairs of sides in the same ratio prove similarity by which test?", "SSS ratio", "SSS", 3, "SSS similarity.", ["sss"]),
    ans("y9-ps-i2", "Similar triangles: 4/8 = 6/x. Find x.", "4/8=6/x", "12", 3, "4x = 48 → x = 12.", []),
    mcq("y9-ps-i3", "Two equal angles is enough for similarity because:", "B", ["sides are then equal", "the third angle must also match", "it implies a right angle", "it is the SAS test"], 3, "The third angle is forced, giving AAA."),
    ans("y9-ps-i4", "Two sides in ratio with the included angle equal proves similarity by which test?", "SAS sim", "SAS", 3, "SAS similarity.", ["sas"]),
    mcq("y9-ps-i5", "Similarity differs from congruence because the triangles may be:", "C", ["the same", "rotated only", "different sizes", "right-angled"], 2, "Different sizes."),
  ],
  masteryQuiz: [
    ans("y9-ps-m1", "Two pairs of equal angles prove similarity by which test?", "AA", "AA", 2, "AA.", ["aa"]),
    ans("y9-ps-m2", "Similar triangles: 2/6 = 4/x. Find x.", "2/6=4/x", "12", 3, "2x = 24 → x = 12.", []),
    ans("y9-ps-m3", "Three sides in the same ratio: which similarity test?", "SSS", "SSS", 3, "SSS.", ["sss"]),
    mcq("y9-ps-m4", "The AA test needs:", "B", ["one equal angle", "two equal angles", "three equal sides", "a right angle"], 2, "Two equal angles."),
    ans("y9-ps-m5", "Similar triangles: 5/10 = 6/x. Find x.", "5/10=6/x", "12", 3, "5x = 60 → x = 12.", []),
    ans("y9-ps-m6", "Two sides in ratio plus the included angle: which similarity test?", "SAS", "SAS", 3, "SAS.", ["sas"]),
    ans("y9-ps-m7", "Similar triangles: 3/9 = 4/x. Find x.", "3/9=4/x", "12", 3, "3x = 36 → x = 12.", []),
    mcq("y9-ps-m8", "Similar triangles have sides that are:", "A", ["proportional", "equal", "perpendicular", "unrelated"], 2, "Proportional."),
    ans("y9-ps-m9", "Similar triangles: 4/12 = 5/x. Find x.", "4/12=5/x", "15", 3, "4x = 60 → x = 15.", []),
    mcq("y9-ps-m10", "Which test proves similarity but NOT congruence?", "D", ["SSS sides equal", "RHS", "SAS sides equal", "AA"], 3, "AA proves similarity only."),
  ],
  masteryQuizPool: [
    ans("y9-ps-p1", "Two triangles share an angle and have a pair of parallel sides (equal corresponding angles). Which test proves similar?", "parallel, AA", "AA", 5, "Two equal angles → AA.", ["aa"]),
    ans("y9-ps-p2", "Prove similar then solve 6/9 = 8/x. Find x.", "6/9=8/x", "12", 5, "6x = 72 → x = 12.", []),
    ans("y9-ps-p3", "A triangle with a line parallel to one side creates a similar triangle; 4/10 = 6/x. Find x.", "4/10=6/x", "15", 5, "4x = 60 → x = 15.", []),
    ans("y9-ps-p4", "Similar triangles: 5/15 = 8/x. Find x.", "5/15=8/x", "24", 5, "5x = 120 → x = 24.", []),
    ans("y9-ps-p5", "Sides 4, 6, 8 and 6, 9, 12 — which similarity test (common ratio)?", "ratio 3:2", "SSS", 5, "All sides in ratio 2:3 → SSS.", ["sss"]),
    ans("y9-ps-p6", "Similar triangles: 7/21 = 5/x. Find x.", "7/21=5/x", "15", 5, "7x = 105 → x = 15.", []),
    ans("y9-ps-p7", "Two triangles have a 90° angle and another equal angle. Which test?", "right + angle", "AA", 5, "Two equal angles → AA.", ["aa"]),
    ans("y9-ps-p8", "Similar triangles: 9/12 = x/8. Find x.", "9/12=x/8", "6", 5, "12x = 72 → x = 6.", []),
    ans("y9-ps-p9", "Sides 3, 4 with included 50° and 6, 8 with included 50°: which test?", "SAS sim", "SAS", 5, "Two sides in ratio + included angle → SAS.", ["sas"]),
    ans("y9-ps-p10", "Similar triangles: 10/4 = x/6. Find x.", "10/4=x/6", "15", 5, "4x = 60 → x = 15.", []),
  ],
  commonMistakes: [
    { mistake: "Requiring three equal angles for AA.", fix: "Two equal angles is enough." },
    { mistake: "Treating similarity tests as congruence.", fix: "Similarity allows different sizes (ratios, not equality)." },
    { mistake: "Setting up the proportion upside down.", fix: "Keep corresponding sides in matching positions." },
    { mistake: "Using SAS without the included angle.", fix: "The equal angle must be between the two ratioed sides." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "congruent-triangles": congruentTriangles,
  "congruence-in-proof": congruenceInProof,
  "enlargement-similar-figures": enlargementSimilar,
  "similar-triangles": similarTriangles,
  "proving-similar-triangles": provingSimilar,
};

export function year9Chapter7CongruenceLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "properties-geometrical-figures") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
