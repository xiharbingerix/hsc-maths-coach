// Year 9 Wave 8 — Chapter 7 (Properties of Geometrical Figures) D6 challenge pools (Level-6 tier,
// post-mastery; ADR-Y9-001). 12 markable questions per section. Registered course-scoped in
// lib/challenges/index.ts (consolidating → Core; core → all 3; path → base + advanced).

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — combine several geometric facts.", explanation };
}
const deg = (a: string) => [a, `${a}°`, `${a} degrees`];
const test = (t: string) => [t, t.toLowerCase()];

// angles-and-triangles (consol)
export const anglesTriY9Challenge: PracticeQuestion[] = [
  q("y9c-at-1", "An isosceles triangle has an apex of 50°. Find each base angle.", "apex 50", "65", "(180 − 50)/2 = 65.", deg("65")),
  q("y9c-at-2", "An exterior angle is 130°; one opposite interior angle is 60°. Find the other.", "ext 130, 60", "70", "130 − 60 = 70.", deg("70")),
  q("y9c-at-3", "Triangle angles are in ratio 1 : 2 : 3. Find the largest.", "1:2:3", "90", "6 parts = 180 → largest 3×30 = 90.", deg("90")),
  q("y9c-at-4", "An isosceles triangle has a base angle of 75°. Find the apex angle.", "base 75", "30", "180 − 150 = 30.", deg("30")),
  q("y9c-at-5", "Two angles are equal and the third is 80°. Find one equal angle.", "third 80", "50", "(180 − 80)/2 = 50.", deg("50")),
  q("y9c-at-6", "Triangle angles are x, x + 20, x + 40. Find x.", "x,x+20,x+40", "40", "3x + 60 = 180 → x = 40.", deg("40")),
  q("y9c-at-7", "An exterior angle is 110°; the two opposite interior angles are equal. Find each.", "ext 110 equal", "55", "110/2 = 55.", deg("55")),
  q("y9c-at-8", "Triangle angles are in ratio 2 : 3 : 4. Find the smallest.", "2:3:4", "40", "9 parts = 180 → smallest 2×20 = 40.", deg("40")),
  q("y9c-at-9", "An isosceles triangle has an apex of 90°. Find each base angle.", "apex 90", "45", "(180 − 90)/2 = 45.", deg("45")),
  q("y9c-at-10", "A right triangle has one angle double the smallest. Find the smallest.", "right, double", "30", "x + 2x + 90 = 180 → x = 30.", deg("30")),
  q("y9c-at-11", "A triangle has angles 35° and 65°. Find the third.", "35,65", "80", "180 − 100 = 80.", deg("80")),
  q("y9c-at-12", "An exterior angle is 140°; one opposite interior angle is 90°. Find the other.", "ext 140, 90", "50", "140 − 90 = 50.", deg("50")),
];

// parallel-lines (consol)
export const parallelLinesY9Challenge: PracticeQuestion[] = [
  q("y9c-pl-1", "On parallel lines, the co-interior angle with 75° has what vertically opposite angle?", "co-int then v.o.", "105", "Co-interior 105; vertically opposite = 105.", deg("105")),
  q("y9c-pl-2", "An alternate angle 3x equals 60°. Find x.", "3x=60", "20", "x = 20.", deg("20")),
  q("y9c-pl-3", "Co-interior relationship x + 50 = 180. Find x.", "x+50=180", "130", "x = 130.", deg("130")),
  q("y9c-pl-4", "A 40° angle's corresponding angle has what co-interior partner?", "corr then co-int", "140", "Corresponding 40; co-interior 180 − 40 = 140.", deg("140")),
  q("y9c-pl-5", "Two co-interior angles are equal. Find each.", "equal co-int", "90", "Sum 180, equal → 90.", deg("90")),
  q("y9c-pl-6", "An alternate angle 2x equals 70°. Find x.", "2x=70", "35", "x = 35.", deg("35")),
  q("y9c-pl-7", "A corresponding angle (x + 30)° equals 100°. Find x.", "x+30=100", "70", "x = 70.", deg("70")),
  q("y9c-pl-8", "An angle and its co-interior partner are in ratio 2 : 1. Find the larger.", "2:1 sum 180", "120", "3 parts = 180 → larger 2×60 = 120.", deg("120")),
  q("y9c-pl-9", "A 55° angle's alternate angle has what co-interior partner?", "alt then co-int", "125", "Alternate 55; co-interior 180 − 55 = 125.", deg("125")),
  q("y9c-pl-10", "Co-interior angles 3x and x. Find x.", "3x+x=180", "45", "4x = 180 → x = 45.", deg("45")),
  q("y9c-pl-11", "Find the co-interior angle with 35° on parallel lines.", "co-int 35", "145", "180 − 35 = 145.", deg("145")),
  q("y9c-pl-12", "Find the corresponding angle to 128° on parallel lines.", "corr 128", "128", "Equal: 128.", deg("128")),
];

// quadrilaterals-polygons (path)
export const polygonsY9Challenge: PracticeQuestion[] = [
  q("y9c-qp-1", "A regular polygon has an exterior angle of 36°. How many sides?", "ext 36", "10", "360 ÷ 36 = 10.", []),
  q("y9c-qp-2", "Find the interior angle of a regular dodecagon (12 sides).", "reg 12-gon", "150", "1800/12 = 150.", deg("150")),
  q("y9c-qp-3", "A regular polygon has an interior angle of 140°. How many sides?", "int 140", "9", "Exterior 40; 360 ÷ 40 = 9.", []),
  q("y9c-qp-4", "Three angles of a quadrilateral are equal and the fourth is 120°. Find each equal angle.", "quad one 120", "80", "(360 − 120)/3 = 80.", deg("80")),
  q("y9c-qp-5", "Find each exterior angle of a regular 15-sided polygon.", "15-gon ext", "24", "360 ÷ 15 = 24.", deg("24")),
  q("y9c-qp-6", "Find the angle sum of a 20-sided polygon.", "20-gon sum", "3240", "(20−2)×180 = 3240.", deg("3240")),
  q("y9c-qp-7", "A regular polygon has an interior angle of 144°. How many sides?", "int 144", "10", "Exterior 36; 360 ÷ 36 = 10.", []),
  q("y9c-qp-8", "A quadrilateral's angles are in ratio 1 : 2 : 3 : 4. Find the largest.", "1:2:3:4", "144", "10 parts = 360 → largest 4×36 = 144.", deg("144")),
  q("y9c-qp-9", "Find the interior angle of a regular nonagon (9 sides).", "reg 9-gon", "140", "1260/9 = 140.", deg("140")),
  q("y9c-qp-10", "A regular polygon has an exterior angle of 45°. Find its interior angle.", "ext 45", "135", "180 − 45 = 135.", deg("135")),
  q("y9c-qp-11", "Find the angle sum of a heptagon (7 sides).", "heptagon", "900", "(7−2)×180 = 900.", deg("900")),
  q("y9c-qp-12", "Find each exterior angle of a regular pentagon.", "reg pentagon ext", "72", "360 ÷ 5 = 72.", deg("72")),
];

// congruent-triangles (path)
export const congruentY9Challenge: PracticeQuestion[] = [
  q("y9c-ct-1", "Two triangles share equal sides 5, 6, 7. Which test proves congruence?", "5,6,7", "SSS", "Three equal sides → SSS.", test("SSS")),
  q("y9c-ct-2", "Triangles with sides 8, 10 and the 40° angle between them match. Which test?", "8,10,40 incl", "SAS", "Two sides + included angle → SAS.", test("SAS")),
  q("y9c-ct-3", "△ABC ≅ △DEF with AB = 9. Find DE.", "ABC≅DEF AB=9", "9", "DE = AB = 9.", []),
  q("y9c-ct-4", "Right triangles with equal hypotenuse 13 and one leg 5 match. Which test?", "RHS 13,5", "RHS", "Right angle, hypotenuse, side → RHS.", test("RHS")),
  q("y9c-ct-5", "△ABC ≅ △DEF and angle C = 55°. Find angle F.", "angle C=55", "55", "F = C = 55.", deg("55")),
  q("y9c-ct-6", "Triangles with two angles 50°, 60° and a matching side. Which test?", "50,60 + side", "AAS", "Two angles + a side → AAS.", test("AAS")),
  q("y9c-ct-7", "An isosceles triangle's axis of symmetry splits it into two congruent triangles by which test (equal sides + included angle)?", "isosceles split", "SAS", "Two equal sides + included apex angle → SAS.", test("SAS")),
  q("y9c-ct-8", "△ABC ≅ △DEF with BC = 12. Find EF.", "BC=12", "12", "EF = BC = 12.", []),
  q("y9c-ct-9", "Two triangles have all three angles equal but no equal sides. Congruent? (yes/no)", "AAA", "no", "AAA → similarity, not congruence.", []),
  q("y9c-ct-10", "Triangles with sides 6, 6 and included 70° match. Which test?", "6,6,70 incl", "SAS", "SAS.", test("SAS")),
  q("y9c-ct-11", "Triangles with two equal angles and a matching side. Which test?", "2 angles + side", "AAS", "AAS.", test("AAS")),
  q("y9c-ct-12", "Right triangles sharing the hypotenuse and one side. Which test?", "right hyp side", "RHS", "RHS.", test("RHS")),
];

// congruence-in-proof (path)
export const congProofY9Challenge: PracticeQuestion[] = [
  q("y9c-cp-1", "△ABC ≅ △DEF by SAS with BC = 7. Find EF.", "SAS BC=7", "7", "EF = BC = 7.", []),
  q("y9c-cp-2", "A kite is split into two congruent triangles; one has a 35° angle. Find the matching angle.", "kite 35", "35", "35.", deg("35")),
  q("y9c-cp-3", "△ABC ≅ △DEF; angles A = 50°, B = 60°. Find angle F.", "A=50,B=60", "70", "C = 70; F = C = 70.", deg("70")),
  q("y9c-cp-4", "An isosceles triangle proved by SAS has a base of 8. Find the matching base.", "isosceles base 8", "8", "8.", []),
  q("y9c-cp-5", "△PQR ≅ △STU with PR = 15. Find SU.", "PR=15", "15", "SU = PR = 15.", []),
  q("y9c-cp-6", "Two triangles congruent by AAS; one side is 6. Find the matching side.", "AAS 6", "6", "6.", []),
  q("y9c-cp-7", "△ABC ≅ △DEF; angles D = 80°, E = 55°. Find angle C.", "D=80,E=55", "45", "F = 45; C = F = 45.", deg("45")),
  q("y9c-cp-8", "A diagonal splits a parallelogram into two congruent triangles; a side of 10 matches a side of:", "parallelogram diag", "10", "10.", []),
  q("y9c-cp-9", "△ABC ≅ △DEF by RHS; the hypotenuse is 13. Find the matching hypotenuse.", "RHS hyp 13", "13", "13.", []),
  q("y9c-cp-10", "Triangles congruent by SSS have sides 7, 24, 25. Find the longest matching side.", "SSS 7,24,25", "25", "25.", []),
  q("y9c-cp-11", "△ABC ≅ △DEF and angle B = 65°. Find angle E.", "angle B=65", "65", "65.", deg("65")),
  q("y9c-cp-12", "△ABC ≅ △DEF and AC = 14. Find DF.", "AC=14", "14", "DF = AC = 14.", []),
];

// enlargement-similar-figures (core)
export const enlargementY9Challenge: PracticeQuestion[] = [
  q("y9c-es-1", "Two similar rectangles: one side goes 4 → 6. The other side is 8; find its image.", "4->6,8->?", "12", "SF = 1.5; 8 × 1.5 = 12.", []),
  q("y9c-es-2", "Similar figures have linear scale factor 3. By what factor does the area scale?", "area SF", "9", "(linear SF)² = 9.", []),
  q("y9c-es-3", "A photo 6 cm wide is enlarged to 15 cm wide. Find the scale factor.", "15/6", "2.5", "15 ÷ 6 = 2.5.", []),
  q("y9c-es-4", "A map reduces 200 cm to 4 cm. Find the scale factor.", "4/200", "0.02", "4 ÷ 200 = 0.02.", ["1/50"]),
  q("y9c-es-5", "Two similar triangles: sides 3 → 12. The matching side to 5 is:", "3->12,5->?", "20", "SF = 4; 5 × 4 = 20.", []),
  q("y9c-es-6", "A figure has area 20 cm²; enlarged by linear SF 2, find the new area.", "area SF2", "80", "20 × 2² = 80.", ["80 cm²"]),
  q("y9c-es-7", "Similar rectangles 5×8 and 15×?. Find the missing side.", "5x8,15x?", "24", "SF = 3; 8 × 3 = 24.", []),
  q("y9c-es-8", "A length of 9 is reduced by scale factor 2/3. Find the image.", "9*2/3", "6", "9 × 2/3 = 6.", []),
  q("y9c-es-9", "Similar figures with linear SF 5 — the area scale factor is:", "area SF5", "25", "5² = 25.", []),
  q("y9c-es-10", "An image side is 21 and the original is 7. Find the scale factor.", "21/7", "3", "3.", []),
  q("y9c-es-11", "A length of 16 is reduced by scale factor 1/4. Find the image.", "16*1/4", "4", "16 × 1/4 = 4.", []),
  q("y9c-es-12", "A figure has area 7 cm²; enlarged by linear SF 2, find the new area.", "area 7 SF2", "28", "7 × 4 = 28.", ["28 cm²"]),
];

// similar-triangles (core)
export const similarTriY9Challenge: PracticeQuestion[] = [
  q("y9c-st-1", "A 2 m stick casts a 3 m shadow; a tree casts a 12 m shadow. Find the tree's height.", "2/3=h/12", "8", "h = 12 × 2/3 = 8 m.", ["8 m"]),
  q("y9c-st-2", "Similar triangles: 6/10 = 9/x. Find x.", "6/10=9/x", "15", "6x = 90 → x = 15.", []),
  q("y9c-st-3", "Similar triangles with SF 2.5; a side of 4 maps to:", "SF2.5,4", "10", "4 × 2.5 = 10.", []),
  q("y9c-st-4", "Nested triangles (parallel line): 4/6 = 6/x. Find x.", "4/6=6/x", "9", "4x = 36 → x = 9.", []),
  q("y9c-st-5", "A 1.5 m person casts a 2 m shadow; a pole casts an 8 m shadow. Find the pole's height.", "1.5/2=h/8", "6", "h = 8 × 0.75 = 6 m.", ["6 m"]),
  q("y9c-st-6", "Similar triangles: 5/15 = 7/x. Find x.", "5/15=7/x", "21", "5x = 105 → x = 21.", []),
  q("y9c-st-7", "Similar triangles with SF 4; a side of 3 maps to:", "SF4,3", "12", "3 × 4 = 12.", []),
  q("y9c-st-8", "Similar triangles: 8/12 = 10/x. Find x.", "8/12=10/x", "15", "8x = 120 → x = 15.", []),
  q("y9c-st-9", "A model is similar with SF 1/20; the real length is 100 m. Find the model length.", "SF1/20,100", "5", "100 × 1/20 = 5 m.", ["5 m"]),
  q("y9c-st-10", "Similar triangles: 9/6 = x/4. Find x.", "9/6=x/4", "6", "6x = 36 → x = 6.", []),
  q("y9c-st-11", "Similar triangles with SF 3; a side of 9 maps to:", "SF3,9", "27", "9 × 3 = 27.", []),
  q("y9c-st-12", "Similar triangles: 6/9 = 4/x. Find x.", "6/9=4/x", "6", "6x = 36 → x = 6.", []),
];

// proving-similar-triangles (path)
export const provingSimilarY9Challenge: PracticeQuestion[] = [
  q("y9c-ps-1", "Two triangles have a pair of parallel sides giving equal corresponding angles. Which test proves similar?", "parallel AA", "AA", "Two equal angles → AA.", test("AA")),
  q("y9c-ps-2", "Prove similar, then solve 6/9 = 8/x. Find x.", "6/9=8/x", "12", "6x = 72 → x = 12.", []),
  q("y9c-ps-3", "A line parallel to one side gives 4/10 = 6/x. Find x.", "4/10=6/x", "15", "4x = 60 → x = 15.", []),
  q("y9c-ps-4", "Similar triangles: 5/15 = 8/x. Find x.", "5/15=8/x", "24", "5x = 120 → x = 24.", []),
  q("y9c-ps-5", "Sides 4, 6, 8 and 6, 9, 12 — which similarity test?", "ratio 2:3", "SSS", "All sides in ratio → SSS.", test("SSS")),
  q("y9c-ps-6", "Similar triangles: 7/21 = 5/x. Find x.", "7/21=5/x", "15", "7x = 105 → x = 15.", []),
  q("y9c-ps-7", "Two triangles have a 90° angle and another equal angle. Which test?", "right + angle", "AA", "Two equal angles → AA.", test("AA")),
  q("y9c-ps-8", "Similar triangles: 9/12 = x/8. Find x.", "9/12=x/8", "6", "12x = 72 → x = 6.", []),
  q("y9c-ps-9", "Sides 3, 4 (incl 50°) and 6, 8 (incl 50°): which test?", "SAS sim", "SAS", "Two sides in ratio + included angle → SAS.", test("SAS")),
  q("y9c-ps-10", "Similar triangles: 10/4 = x/6. Find x.", "10/4=x/6", "15", "4x = 60 → x = 15.", []),
  q("y9c-ps-11", "Similar triangles: 3/12 = 5/x. Find x.", "3/12=5/x", "20", "3x = 60 → x = 20.", []),
  q("y9c-ps-12", "Two pairs of equal angles. Which similarity test?", "2 angles", "AA", "AA.", test("AA")),
];
