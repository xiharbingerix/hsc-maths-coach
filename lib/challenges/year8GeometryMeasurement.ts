import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 8 — Wave 2. D6 (Level-6) challenge pools, 12 per section, for geometry-angles (5 sections),
// surface-area-of-solids (3) and volume-of-composite-solids (3). Registered course-scoped
// ("year-8-mathematics/<lesson>") in lib/challenges/index.ts; unlocked after mastery via the existing
// challenge flow (no new system). Auto-markable single-value / exact-pi answers. The seeder tags
// challenge questions as D6. Squares in prose are written as unicode ² (no raw ^).

const piv = (display: string): string[] => {
  const out = new Set<string>();
  for (const base of [display, display.replace(/π/g, "pi"), display.replace(/π/g, "\\pi")]) {
    out.add(base);
    out.add(base.replace(/\s/g, ""));
    out.add(base.replace(/−/g, "-"));
    out.add(base.replace(/−/g, "-").replace(/\s/g, ""));
  }
  return Array.from(out);
};

// ── Geometry: angles in triangles and quadrilaterals ──────────────────────────────────────────
export const anglesTrianglesQuadrilateralsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-atq-1", prompt: "A triangle has angles 2x, 3x and 4x. Find x (degrees).", latex: "2x+3x+4x=180", answer: "20", acceptedAnswers: [], hint: "9x = 180.", explanation: "x = 20°." },
  { id: "chal-y8-atq-2", prompt: "A quadrilateral has angles 80°, 95°, 100° and x. Find x (degrees).", latex: "360-275", answer: "85", acceptedAnswers: [], hint: "Sum is 360°.", explanation: "360 − 275 = 85°." },
  { id: "chal-y8-atq-3", prompt: "An exterior angle of a triangle is 130° and one interior opposite angle is 70°. Find the other (degrees).", latex: "130-70", answer: "60", acceptedAnswers: [], hint: "Exterior = sum of interior opposites.", explanation: "130 − 70 = 60°." },
  { id: "chal-y8-atq-4", prompt: "An isosceles triangle has an apex angle of 50°. Find each base angle (degrees).", latex: "(180-50)/2", answer: "65", acceptedAnswers: [], hint: "Base angles equal.", explanation: "130/2 = 65°." },
  { id: "chal-y8-atq-5", prompt: "A quadrilateral's angles are in the ratio 3:4:5:6. Find the largest (degrees).", latex: "18k=360", answer: "120", acceptedAnswers: [], hint: "18 parts make 360°.", explanation: "Each part 20°; 6×20 = 120°." },
  { id: "chal-y8-atq-6", prompt: "A triangle has angles x, x+30 and x+60. Find the largest (degrees).", latex: "3x+90=180", answer: "90", acceptedAnswers: [], hint: "Find x first.", explanation: "x = 30; largest = 90°." },
  { id: "chal-y8-atq-7", prompt: "Two angles of a triangle are 38° and 52°. Find the third (degrees).", latex: "180-38-52", answer: "90", acceptedAnswers: [], hint: "Sum is 180°.", explanation: "180 − 90 = 90°." },
  { id: "chal-y8-atq-8", prompt: "In a right triangle one acute angle is 4 times the other. Find the smaller acute angle (degrees).", latex: "x+4x=90", answer: "18", acceptedAnswers: [], hint: "The two acute angles sum to 90°.", explanation: "5x = 90 → x = 18°." },
  { id: "chal-y8-atq-9", prompt: "A quadrilateral has three equal angles and a fourth of 120°. Find each equal angle (degrees).", latex: "(360-120)/3", answer: "80", acceptedAnswers: [], hint: "Subtract 120, divide by 3.", explanation: "240/3 = 80°." },
  { id: "chal-y8-atq-10", prompt: "Find the exterior angle of an equilateral triangle (degrees).", latex: "180-60", answer: "120", acceptedAnswers: [], hint: "Interior is 60°.", explanation: "180 − 60 = 120°." },
  { id: "chal-y8-atq-11", prompt: "A triangle has angles (x+10), (x+20) and (x+30). Find x (degrees).", latex: "3x+60=180", answer: "40", acceptedAnswers: [], hint: "Sum is 180°.", explanation: "3x = 120 → x = 40°." },
  { id: "chal-y8-atq-12", prompt: "A quadrilateral has two right angles and the other two in the ratio 2:3. Find the larger of those two (degrees).", latex: "2k+3k=180", answer: "108", acceptedAnswers: [], hint: "The two remaining angles sum to 180°.", explanation: "5k = 180 → k = 36; 3×36 = 108°." },
];

// ── Geometry: properties of polygons ──────────────────────────────────────────────────────────
export const propertiesOfPolygonsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-pop-1", prompt: "Find the interior angle sum of a pentagon (degrees).", latex: "(5-2)\\times180", answer: "540", acceptedAnswers: [], hint: "(n − 2) × 180.", explanation: "3 × 180 = 540°." },
  { id: "chal-y8-pop-2", prompt: "Find the interior angle sum of an octagon (degrees).", latex: "(8-2)\\times180", answer: "1080", acceptedAnswers: [], hint: "(n − 2) × 180.", explanation: "6 × 180 = 1080°." },
  { id: "chal-y8-pop-3", prompt: "Find each interior angle of a regular hexagon (degrees).", latex: "720/6", answer: "120", acceptedAnswers: [], hint: "Sum 720, divide by 6.", explanation: "120°." },
  { id: "chal-y8-pop-4", prompt: "Find each exterior angle of a regular pentagon (degrees).", latex: "360/5", answer: "72", acceptedAnswers: [], hint: "Exterior angles sum to 360°.", explanation: "72°." },
  { id: "chal-y8-pop-5", prompt: "A regular polygon has exterior angle 30°. How many sides?", latex: "360/30", answer: "12", acceptedAnswers: [], hint: "360 ÷ exterior.", explanation: "12 sides." },
  { id: "chal-y8-pop-6", prompt: "Find each interior angle of a regular octagon (degrees).", latex: "1080/8", answer: "135", acceptedAnswers: [], hint: "Sum 1080, divide by 8.", explanation: "135°." },
  { id: "chal-y8-pop-7", prompt: "Find the interior angle sum of a decagon (10 sides) (degrees).", latex: "(10-2)\\times180", answer: "1440", acceptedAnswers: [], hint: "8 × 180.", explanation: "1440°." },
  { id: "chal-y8-pop-8", prompt: "A regular polygon has interior angle 140°. How many sides?", latex: "360/(180-140)", answer: "9", acceptedAnswers: [], hint: "Exterior = 40°.", explanation: "360/40 = 9 sides." },
  { id: "chal-y8-pop-9", prompt: "Find the sum of the exterior angles of any polygon (degrees).", latex: "\\sum\\text{ext}", answer: "360", acceptedAnswers: [], hint: "It is constant.", explanation: "Always 360°." },
  { id: "chal-y8-pop-10", prompt: "Find each interior angle of a regular 9-sided polygon (degrees).", latex: "(7\\times180)/9", answer: "140", acceptedAnswers: [], hint: "Sum 1260, divide by 9.", explanation: "1260/9 = 140°." },
  { id: "chal-y8-pop-11", prompt: "Find the interior angle sum of a 12-sided polygon (degrees).", latex: "(12-2)\\times180", answer: "1800", acceptedAnswers: [], hint: "10 × 180.", explanation: "1800°." },
  { id: "chal-y8-pop-12", prompt: "A regular polygon has interior angle 150°. How many sides?", latex: "360/(180-150)", answer: "12", acceptedAnswers: [], hint: "Exterior = 30°.", explanation: "360/30 = 12 sides." },
];

// ── Geometry: congruent triangles ─────────────────────────────────────────────────────────────
export const congruentTrianglesChallenge: PracticeQuestion[] = [
  { id: "chal-y8-con-1", prompt: "Two congruent triangles: one has sides 5, 6, 7; the other has sides 6 and 7. Find its third side.", latex: "\\cong", answer: "5", acceptedAnswers: [], hint: "Congruent = identical.", explanation: "5." },
  { id: "chal-y8-con-2", prompt: "Congruent triangles share a 40° and a 75° angle. Find the third angle (degrees).", latex: "180-40-75", answer: "65", acceptedAnswers: [], hint: "Angle sum.", explanation: "180 − 115 = 65°." },
  { id: "chal-y8-con-3", prompt: "Which congruence test uses two sides and the included angle? Answer the abbreviation.", latex: "\\text{test}", answer: "SAS", acceptedAnswers: ["sas"], hint: "Side-Angle-Side.", explanation: "SAS." },
  { id: "chal-y8-con-4", prompt: "Two congruent triangles each have perimeter 24. Find the perimeter of the other.", latex: "\\cong", answer: "24", acceptedAnswers: [], hint: "Identical figures.", explanation: "24." },
  { id: "chal-y8-con-5", prompt: "A triangle has angles 50°, 60°, 70°. Find the largest angle of a congruent triangle (degrees).", latex: "\\max", answer: "70", acceptedAnswers: [], hint: "Same angles.", explanation: "70°." },
  { id: "chal-y8-con-6", prompt: "Which congruence test uses three equal sides? Answer the abbreviation.", latex: "\\text{test}", answer: "SSS", acceptedAnswers: ["sss"], hint: "Side-Side-Side.", explanation: "SSS." },
  { id: "chal-y8-con-7", prompt: "Which test proves congruent right triangles by hypotenuse and one side? Answer the abbreviation.", latex: "\\text{test}", answer: "RHS", acceptedAnswers: ["rhs"], hint: "Right angle-Hypotenuse-Side.", explanation: "RHS." },
  { id: "chal-y8-con-8", prompt: "Two congruent triangles each have area 18 cm². Find their combined area (cm²).", latex: "2\\times18", answer: "36", acceptedAnswers: [], hint: "Equal areas.", explanation: "36." },
  { id: "chal-y8-con-9", prompt: "A triangle has sides 8, 15, 17; a congruent triangle shows sides 15 and 17. Find the third side.", latex: "\\cong", answer: "8", acceptedAnswers: [], hint: "Identical.", explanation: "8." },
  { id: "chal-y8-con-10", prompt: "Which test uses two angles and a non-included side? Answer the abbreviation.", latex: "\\text{test}", answer: "AAS", acceptedAnswers: ["aas"], hint: "Angle-Angle-Side.", explanation: "AAS." },
  { id: "chal-y8-con-11", prompt: "Congruent triangles each have base 12 and height 5. Find the area of one (cm²).", latex: "\\tfrac12(12)(5)", answer: "30", acceptedAnswers: [], hint: "½ base × height.", explanation: "30 cm²." },
  { id: "chal-y8-con-12", prompt: "If triangle ABC is congruent to triangle DEF and AB = 9, find DE.", latex: "AB=DE", answer: "9", acceptedAnswers: [], hint: "Matching sides equal.", explanation: "9." },
];

// ── Geometry: geometric reasoning ─────────────────────────────────────────────────────────────
export const geometricReasoningChallenge: PracticeQuestion[] = [
  { id: "chal-y8-gre-1", prompt: "In a triangle, x + 2x + 90 = 180. Find x (degrees).", latex: "3x+90=180", answer: "30", acceptedAnswers: [], hint: "3x = 90.", explanation: "x = 30°." },
  { id: "chal-y8-gre-2", prompt: "Two angles on a straight line are 3x and 2x. Find x (degrees).", latex: "5x=180", answer: "36", acceptedAnswers: [], hint: "Sum 180°.", explanation: "x = 36°." },
  { id: "chal-y8-gre-3", prompt: "Vertically opposite angles give 5x = 80. Find x.", latex: "5x=80", answer: "16", acceptedAnswers: [], hint: "Divide by 5.", explanation: "x = 16." },
  { id: "chal-y8-gre-4", prompt: "An isosceles triangle has base angles each 2x and apex 80°. Find x (degrees).", latex: "4x+80=180", answer: "25", acceptedAnswers: [], hint: "2(2x) + 80 = 180.", explanation: "4x = 100 → x = 25." },
  { id: "chal-y8-gre-5", prompt: "Angles at a point: 90 + x + 130 + 50 = 360. Find x (degrees).", latex: "x=360-270", answer: "90", acceptedAnswers: [], hint: "Sum 360°.", explanation: "x = 90°." },
  { id: "chal-y8-gre-6", prompt: "Co-interior angles x and (x + 40) sum to 180°. Find x (degrees).", latex: "2x+40=180", answer: "70", acceptedAnswers: [], hint: "2x + 40 = 180.", explanation: "x = 70°." },
  { id: "chal-y8-gre-7", prompt: "An exterior angle 3x equals the sum of interior opposites (x + 50). Find x.", latex: "3x=x+50", answer: "25", acceptedAnswers: [], hint: "2x = 50.", explanation: "x = 25." },
  { id: "chal-y8-gre-8", prompt: "On a straight line: x + (x + 20) + (x + 10) = 180. Find x (degrees).", latex: "3x+30=180", answer: "50", acceptedAnswers: [], hint: "3x = 150.", explanation: "x = 50°." },
  { id: "chal-y8-gre-9", prompt: "In a triangle, (2x + 10) + 3x + (x − 10) = 180. Find x (degrees).", latex: "6x=180", answer: "30", acceptedAnswers: [], hint: "6x = 180.", explanation: "x = 30°." },
  { id: "chal-y8-gre-10", prompt: "Find the reflex angle of 75° (degrees).", latex: "360-75", answer: "285", acceptedAnswers: [], hint: "360 − angle.", explanation: "285°." },
  { id: "chal-y8-gre-11", prompt: "Alternate angles on parallel lines are 4x and 60°. Find x.", latex: "4x=60", answer: "15", acceptedAnswers: [], hint: "Alternate angles equal.", explanation: "x = 15." },
  { id: "chal-y8-gre-12", prompt: "An angle bisector splits a 96° angle into two equal parts. Find each part (degrees).", latex: "96/2", answer: "48", acceptedAnswers: [], hint: "Halve it.", explanation: "48°." },
];

// ── Geometry: quadrilateral properties ────────────────────────────────────────────────────────
export const quadrilateralPropertiesChallenge: PracticeQuestion[] = [
  { id: "chal-y8-qpr-1", prompt: "A parallelogram has one angle of 70°. Find its adjacent angle (degrees).", latex: "180-70", answer: "110", acceptedAnswers: [], hint: "Adjacent angles are supplementary.", explanation: "110°." },
  { id: "chal-y8-qpr-2", prompt: "A rhombus diagonal bisects a 120° angle. Find each half (degrees).", latex: "120/2", answer: "60", acceptedAnswers: [], hint: "Bisect = halve.", explanation: "60°." },
  { id: "chal-y8-qpr-3", prompt: "Find the sum of the interior angles of any quadrilateral (degrees).", latex: "\\sum", answer: "360", acceptedAnswers: [], hint: "Constant.", explanation: "360°." },
  { id: "chal-y8-qpr-4", prompt: "A rectangle's diagonals are equal. One is 13. Find the other.", latex: "d_1=d_2", answer: "13", acceptedAnswers: [], hint: "Equal diagonals.", explanation: "13." },
  { id: "chal-y8-qpr-5", prompt: "A square has side 7. Find its perimeter.", latex: "4\\times7", answer: "28", acceptedAnswers: [], hint: "4 × side.", explanation: "28." },
  { id: "chal-y8-qpr-6", prompt: "A kite has angles 100°, 70°, 70° and x. Find x (degrees).", latex: "360-240", answer: "120", acceptedAnswers: [], hint: "Sum 360°.", explanation: "360 − 240 = 120°." },
  { id: "chal-y8-qpr-7", prompt: "A parallelogram has one angle 65°. Find the opposite angle (degrees).", latex: "\\text{opp equal}", answer: "65", acceptedAnswers: [], hint: "Opposite angles are equal.", explanation: "65°." },
  { id: "chal-y8-qpr-8", prompt: "A trapezium has a co-interior pair 110° and x. Find x (degrees).", latex: "180-110", answer: "70", acceptedAnswers: [], hint: "Co-interior sum 180°.", explanation: "70°." },
  { id: "chal-y8-qpr-9", prompt: "A rhombus has side 9. Find its perimeter.", latex: "4\\times9", answer: "36", acceptedAnswers: [], hint: "All sides equal.", explanation: "36." },
  { id: "chal-y8-qpr-10", prompt: "A rectangle is 8 by 6. Find the length of its diagonal.", latex: "\\sqrt{8^2+6^2}", answer: "10", acceptedAnswers: [], hint: "Use Pythagoras.", explanation: "√100 = 10." },
  { id: "chal-y8-qpr-11", prompt: "A parallelogram has adjacent angles 3x and x. Find the larger angle (degrees).", latex: "3x+x=180", answer: "135", acceptedAnswers: [], hint: "Adjacent angles sum to 180°.", explanation: "4x = 180 → x = 45; 3x = 135°." },
  { id: "chal-y8-qpr-12", prompt: "An isosceles trapezium has base angles of 65°. Find each top angle (degrees).", latex: "180-65", answer: "115", acceptedAnswers: [], hint: "Co-interior with the base angle.", explanation: "180 − 65 = 115°." },
];

// ── Surface area of prisms ────────────────────────────────────────────────────────────────────
export const surfaceAreaPrismsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sap-1", prompt: "A cube has side 5. Find its surface area.", latex: "6\\times5^2", answer: "150", acceptedAnswers: [], hint: "6 × side².", explanation: "6 × 25 = 150." },
  { id: "chal-y8-sap-2", prompt: "A rectangular prism is 4 by 3 by 2. Find its surface area.", latex: "2(lw+lh+wh)", answer: "52", acceptedAnswers: [], hint: "2(12 + 8 + 6).", explanation: "2 × 26 = 52." },
  { id: "chal-y8-sap-3", prompt: "A cube has surface area 96. Find its side length.", latex: "\\sqrt{96/6}", answer: "4", acceptedAnswers: [], hint: "SA/6 = side².", explanation: "√16 = 4." },
  { id: "chal-y8-sap-4", prompt: "A rectangular prism is 10 by 5 by 2. Find its surface area.", latex: "2(50+20+10)", answer: "160", acceptedAnswers: [], hint: "2(lw + lh + wh).", explanation: "2 × 80 = 160." },
  { id: "chal-y8-sap-5", prompt: "A cube has side 10. Find its surface area.", latex: "6\\times10^2", answer: "600", acceptedAnswers: [], hint: "6 × 100.", explanation: "600." },
  { id: "chal-y8-sap-6", prompt: "A triangular prism has two triangular ends of area 6 each and rectangular faces totalling 40. Find the surface area.", latex: "2(6)+40", answer: "52", acceptedAnswers: [], hint: "Two ends + the rectangles.", explanation: "12 + 40 = 52." },
  { id: "chal-y8-sap-7", prompt: "A box is 6 by 4 by 5. Find its surface area.", latex: "2(24+30+20)", answer: "148", acceptedAnswers: [], hint: "2(lw + lh + wh).", explanation: "2 × 74 = 148." },
  { id: "chal-y8-sap-8", prompt: "A cube has surface area 150. Find its volume.", latex: "5^3", answer: "125", acceptedAnswers: [], hint: "Side 5.", explanation: "5³ = 125." },
  { id: "chal-y8-sap-9", prompt: "A rectangular prism is 8 by 8 by 2. Find its surface area.", latex: "2(64+16+16)", answer: "192", acceptedAnswers: [], hint: "2(64 + 16 + 16).", explanation: "2 × 96 = 192." },
  { id: "chal-y8-sap-10", prompt: "An open-top box (no lid) is 5 by 4 by 3. Find its surface area.", latex: "20+2(15)+2(12)", answer: "74", acceptedAnswers: [], hint: "Base + 4 sides, no top.", explanation: "20 + 30 + 24 = 74." },
  { id: "chal-y8-sap-11", prompt: "A cube has side 7. Find its surface area.", latex: "6\\times7^2", answer: "294", acceptedAnswers: [], hint: "6 × 49.", explanation: "294." },
  { id: "chal-y8-sap-12", prompt: "A rectangular prism is 12 by 3 by 1. Find its surface area.", latex: "2(36+12+3)", answer: "102", acceptedAnswers: [], hint: "2(36 + 12 + 3).", explanation: "2 × 51 = 102." },
];

// ── Surface area of cylinders ─────────────────────────────────────────────────────────────────
export const surfaceAreaCylindersChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sac-1", prompt: "A closed cylinder has radius 3 and height 5. Find its surface area (exact).", latex: "2\\pi r^2+2\\pi rh", answer: "48π", acceptedAnswers: piv("48π"), hint: "2πr² + 2πrh.", explanation: "18π + 30π = 48π." },
  { id: "chal-y8-sac-2", prompt: "A closed cylinder has radius 2 and height 10. Find its surface area (exact).", latex: "2\\pi r^2+2\\pi rh", answer: "48π", acceptedAnswers: piv("48π"), hint: "8π + 40π.", explanation: "48π." },
  { id: "chal-y8-sac-3", prompt: "Find the curved surface area of a cylinder with radius 5 and height 4 (exact).", latex: "2\\pi rh", answer: "40π", acceptedAnswers: piv("40π"), hint: "2πrh.", explanation: "40π." },
  { id: "chal-y8-sac-4", prompt: "A closed cylinder has radius 1 and height 9. Find its surface area (exact).", latex: "2\\pi+18\\pi", answer: "20π", acceptedAnswers: piv("20π"), hint: "2π + 18π.", explanation: "20π." },
  { id: "chal-y8-sac-5", prompt: "A closed cylinder has radius 4 and height 6. Find its surface area (exact).", latex: "32\\pi+48\\pi", answer: "80π", acceptedAnswers: piv("80π"), hint: "2π(16) + 2π(4)(6).", explanation: "80π." },
  { id: "chal-y8-sac-6", prompt: "Find the curved surface area of a cylinder with radius 7 and height 10 (exact).", latex: "2\\pi rh", answer: "140π", acceptedAnswers: piv("140π"), hint: "2πrh.", explanation: "140π." },
  { id: "chal-y8-sac-7", prompt: "A closed cylinder has radius 3 and height 7. Find its surface area (exact).", latex: "18\\pi+42\\pi", answer: "60π", acceptedAnswers: piv("60π"), hint: "18π + 42π.", explanation: "60π." },
  { id: "chal-y8-sac-8", prompt: "A closed cylinder has diameter 8 and height 5. Find its surface area (exact).", latex: "r=4", answer: "72π", acceptedAnswers: piv("72π"), hint: "Radius is 4.", explanation: "32π + 40π = 72π." },
  { id: "chal-y8-sac-9", prompt: "Find the curved surface area of a cylinder with radius 6 and height 6 (exact).", latex: "2\\pi rh", answer: "72π", acceptedAnswers: piv("72π"), hint: "2π(6)(6).", explanation: "72π." },
  { id: "chal-y8-sac-10", prompt: "A closed cylinder has radius 10 and height 1. Find its surface area (exact).", latex: "200\\pi+20\\pi", answer: "220π", acceptedAnswers: piv("220π"), hint: "2π(100) + 2π(10)(1).", explanation: "220π." },
  { id: "chal-y8-sac-11", prompt: "Find the combined area of the two circular ends of a cylinder with radius 5 (exact).", latex: "2\\pi r^2", answer: "50π", acceptedAnswers: piv("50π"), hint: "2 × πr².", explanation: "2π(25) = 50π." },
  { id: "chal-y8-sac-12", prompt: "A closed cylinder has radius 2 and height 2. Find its surface area (exact).", latex: "8\\pi+8\\pi", answer: "16π", acceptedAnswers: piv("16π"), hint: "8π + 8π.", explanation: "16π." },
];

// ── Surface area of composite solids ──────────────────────────────────────────────────────────
export const surfaceAreaCompositeSolidsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sacs-1", prompt: "Two cubes of side 3 are glued face to face. Find the total surface area.", latex: "2(54)-2(9)", answer: "90", acceptedAnswers: [], hint: "Two cubes minus the two hidden faces.", explanation: "108 − 18 = 90." },
  { id: "chal-y8-sacs-2", prompt: "A closed box is 5 by 5 by 10. Find its surface area.", latex: "2(25+50+50)", answer: "250", acceptedAnswers: [], hint: "2(lw + lh + wh).", explanation: "2 × 125 = 250." },
  { id: "chal-y8-sacs-3", prompt: "An open-top cube has side 4 (5 faces). Find its surface area.", latex: "5\\times16", answer: "80", acceptedAnswers: [], hint: "5 faces.", explanation: "5 × 16 = 80." },
  { id: "chal-y8-sacs-4", prompt: "A cube of side 6 rests on the ground. Find the exposed surface area (5 faces).", latex: "5\\times36", answer: "180", acceptedAnswers: [], hint: "All but the base.", explanation: "5 × 36 = 180." },
  { id: "chal-y8-sacs-5", prompt: "A rectangular prism is 3 by 3 by 6. Find its surface area.", latex: "2(9+18+18)", answer: "90", acceptedAnswers: [], hint: "2(9 + 18 + 18).", explanation: "2 × 45 = 90." },
  { id: "chal-y8-sacs-6", prompt: "A cube of side 5 sits glued on top of another cube of side 5. Find the total surface area.", latex: "2(150)-2(25)", answer: "250", acceptedAnswers: [], hint: "Two cubes minus the two joined faces.", explanation: "300 − 50 = 250." },
  { id: "chal-y8-sacs-7", prompt: "Two cubes of side 2 are glued face to face. Find the total surface area.", latex: "2(24)-2(4)", answer: "40", acceptedAnswers: [], hint: "Two cubes minus 2 hidden faces.", explanation: "48 − 8 = 40." },
  { id: "chal-y8-sacs-8", prompt: "A cylinder has radius 3 and height 10. Find its surface area (exact).", latex: "2\\pi(9)+2\\pi(3)(10)", answer: "78π", acceptedAnswers: piv("78π"), hint: "18π + 60π.", explanation: "78π." },
  { id: "chal-y8-sacs-9", prompt: "A closed box is 10 by 10 by 2. Find its surface area.", latex: "2(100+20+20)", answer: "280", acceptedAnswers: [], hint: "2(100 + 20 + 20).", explanation: "2 × 140 = 280." },
  { id: "chal-y8-sacs-10", prompt: "A cube has side 8. Find its surface area.", latex: "6\\times8^2", answer: "384", acceptedAnswers: [], hint: "6 × 64.", explanation: "384." },
  { id: "chal-y8-sacs-11", prompt: "An open-top box (no lid) is 6 by 6 by 3. Find its surface area.", latex: "36+4(18)", answer: "108", acceptedAnswers: [], hint: "Base + 4 sides.", explanation: "36 + 72 = 108." },
  { id: "chal-y8-sacs-12", prompt: "A cube has side 4. Find its surface area.", latex: "6\\times4^2", answer: "96", acceptedAnswers: [], hint: "6 × 16.", explanation: "96." },
];

// ── Volume of prisms (Year 8) ─────────────────────────────────────────────────────────────────
export const volumeOfPrismsY8Challenge: PracticeQuestion[] = [
  { id: "chal-y8-vop-1", prompt: "A rectangular prism is 5 by 4 by 3. Find its volume.", latex: "5\\times4\\times3", answer: "60", acceptedAnswers: [], hint: "l × w × h.", explanation: "60." },
  { id: "chal-y8-vop-2", prompt: "A triangular prism has cross-section area 15 and length 8. Find its volume.", latex: "15\\times8", answer: "120", acceptedAnswers: [], hint: "Cross-section × length.", explanation: "120." },
  { id: "chal-y8-vop-3", prompt: "A cube has volume 343. Find its side length.", latex: "\\sqrt[3]{343}", answer: "7", acceptedAnswers: [], hint: "Cube root.", explanation: "7³ = 343." },
  { id: "chal-y8-vop-4", prompt: "A trapezoidal prism has cross-section ½(6 + 10)×4 and length 5. Find its volume.", latex: "32\\times5", answer: "160", acceptedAnswers: [], hint: "Cross-section 32.", explanation: "32 × 5 = 160." },
  { id: "chal-y8-vop-5", prompt: "A rectangular prism has volume 240 and base 8 by 5. Find its height.", latex: "240/40", answer: "6", acceptedAnswers: [], hint: "Volume ÷ base area.", explanation: "240/40 = 6." },
  { id: "chal-y8-vop-6", prompt: "A triangular prism has a right-triangle cross-section (legs 6 and 8) and length 10. Find its volume.", latex: "\\tfrac12(6)(8)\\times10", answer: "240", acceptedAnswers: [], hint: "½ × leg × leg × length.", explanation: "24 × 10 = 240." },
  { id: "chal-y8-vop-7", prompt: "A prism has cross-section area 20 and volume 300. Find its length.", latex: "300/20", answer: "15", acceptedAnswers: [], hint: "Volume ÷ cross-section.", explanation: "15." },
  { id: "chal-y8-vop-8", prompt: "A cube has side 9. Find its volume.", latex: "9^3", answer: "729", acceptedAnswers: [], hint: "side³.", explanation: "729." },
  { id: "chal-y8-vop-9", prompt: "A rectangular prism is 12 by 10 by 5. Find its volume.", latex: "12\\times10\\times5", answer: "600", acceptedAnswers: [], hint: "l × w × h.", explanation: "600." },
  { id: "chal-y8-vop-10", prompt: "A prism with an L-shaped cross-section of area 18 has length 7. Find its volume.", latex: "18\\times7", answer: "126", acceptedAnswers: [], hint: "Cross-section × length.", explanation: "126." },
  { id: "chal-y8-vop-11", prompt: "A prism has volume 500 and length 25. Find its cross-section area.", latex: "500/25", answer: "20", acceptedAnswers: [], hint: "Volume ÷ length.", explanation: "20." },
  { id: "chal-y8-vop-12", prompt: "A triangular prism has cross-section ½(10)(6) and length 12. Find its volume.", latex: "30\\times12", answer: "360", acceptedAnswers: [], hint: "Cross-section 30.", explanation: "30 × 12 = 360." },
];

// ── Volume of cylinders (Year 8) ──────────────────────────────────────────────────────────────
export const volumeOfCylindersY8Challenge: PracticeQuestion[] = [
  { id: "chal-y8-voc-1", prompt: "A cylinder has radius 3 and height 10. Find its volume (exact).", latex: "\\pi(3)^2(10)", answer: "90π", acceptedAnswers: piv("90π"), hint: "πr²h.", explanation: "90π." },
  { id: "chal-y8-voc-2", prompt: "A cylinder has radius 5 and height 4. Find its volume (exact).", latex: "\\pi(5)^2(4)", answer: "100π", acceptedAnswers: piv("100π"), hint: "πr²h.", explanation: "100π." },
  { id: "chal-y8-voc-3", prompt: "A cylinder has diameter 8 and height 7. Find its volume (exact).", latex: "\\pi(4)^2(7)", answer: "112π", acceptedAnswers: piv("112π"), hint: "Radius is 4.", explanation: "112π." },
  { id: "chal-y8-voc-4", prompt: "A cylinder has volume 36π and radius 3. Find its height.", latex: "\\pi(9)h=36\\pi", answer: "4", acceptedAnswers: [], hint: "Divide by 9π.", explanation: "h = 4." },
  { id: "chal-y8-voc-5", prompt: "A cylinder has volume 200π and height 8. Find its radius.", latex: "\\pi r^2(8)=200\\pi", answer: "5", acceptedAnswers: [], hint: "r² = 25.", explanation: "r = 5." },
  { id: "chal-y8-voc-6", prompt: "A cylinder has radius 2 and height 15. Find its volume (exact).", latex: "\\pi(2)^2(15)", answer: "60π", acceptedAnswers: piv("60π"), hint: "πr²h.", explanation: "60π." },
  { id: "chal-y8-voc-7", prompt: "A cylinder has radius 6 and height 6. Find its volume (exact).", latex: "\\pi(6)^2(6)", answer: "216π", acceptedAnswers: piv("216π"), hint: "πr²h.", explanation: "216π." },
  { id: "chal-y8-voc-8", prompt: "A cylinder has volume 48π and radius 4. Find its height.", latex: "\\pi(16)h=48\\pi", answer: "3", acceptedAnswers: [], hint: "Divide by 16π.", explanation: "h = 3." },
  { id: "chal-y8-voc-9", prompt: "A cylinder has radius 10 and height 2. Find its volume (exact).", latex: "\\pi(10)^2(2)", answer: "200π", acceptedAnswers: piv("200π"), hint: "πr²h.", explanation: "200π." },
  { id: "chal-y8-voc-10", prompt: "A cylindrical can has diameter 10 and height 12. Find its volume (exact).", latex: "\\pi(5)^2(12)", answer: "300π", acceptedAnswers: piv("300π"), hint: "Radius is 5.", explanation: "300π." },
  { id: "chal-y8-voc-11", prompt: "A cylinder has volume 175π and height 7. Find its radius.", latex: "\\pi r^2(7)=175\\pi", answer: "5", acceptedAnswers: [], hint: "r² = 25.", explanation: "r = 5." },
  { id: "chal-y8-voc-12", prompt: "A cylinder has radius 1 and height 100. Find its volume (exact).", latex: "\\pi(1)^2(100)", answer: "100π", acceptedAnswers: piv("100π"), hint: "πr²h.", explanation: "100π." },
];

// ── Volume of composite solids ────────────────────────────────────────────────────────────────
export const volumeOfCompositeSolidsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-vcs-1", prompt: "Two cubes of side 3 are joined. Find the total volume.", latex: "2(3^3)", answer: "54", acceptedAnswers: [], hint: "Two cube volumes.", explanation: "54." },
  { id: "chal-y8-vcs-2", prompt: "A 5 by 5 by 10 prism has a 5 by 5 by 2 piece removed. Find the remaining volume.", latex: "250-50", answer: "200", acceptedAnswers: [], hint: "Subtract the removed block.", explanation: "200." },
  { id: "chal-y8-vcs-3", prompt: "A cube of side 4 has a 2 by 2 by 2 cube removed. Find the remaining volume.", latex: "64-8", answer: "56", acceptedAnswers: [], hint: "64 − 8.", explanation: "56." },
  { id: "chal-y8-vcs-4", prompt: "A 10 by 5 by 4 box has a 5 by 5 by 4 box removed. Find the remaining volume.", latex: "200-100", answer: "100", acceptedAnswers: [], hint: "200 − 100.", explanation: "100." },
  { id: "chal-y8-vcs-5", prompt: "A pipe is a cylinder radius 2, height 10 with a cylinder radius 1, height 10 removed. Find the volume (exact).", latex: "40\\pi-10\\pi", answer: "30π", acceptedAnswers: piv("30π"), hint: "Outer minus inner.", explanation: "40π − 10π = 30π." },
  { id: "chal-y8-vcs-6", prompt: "An L-solid is a 6 by 4 by 2 block plus a 2 by 4 by 3 block. Find the total volume.", latex: "48+24", answer: "72", acceptedAnswers: [], hint: "Add the two volumes.", explanation: "48 + 24 = 72." },
  { id: "chal-y8-vcs-7", prompt: "An 8 by 8 by 8 cube has an 8 by 8 by 3 slab removed. Find the remaining volume.", latex: "512-192", answer: "320", acceptedAnswers: [], hint: "512 − 192.", explanation: "320." },
  { id: "chal-y8-vcs-8", prompt: "A cylinder radius 5 height 4 sits on a cylinder radius 5 height 6. Find the total volume (exact).", latex: "100\\pi+150\\pi", answer: "250π", acceptedAnswers: piv("250π"), hint: "Add the two volumes.", explanation: "250π." },
  { id: "chal-y8-vcs-9", prompt: "A 12 by 6 by 5 box has a 6 by 6 by 5 notch removed. Find the remaining volume.", latex: "360-180", answer: "180", acceptedAnswers: [], hint: "360 − 180.", explanation: "180." },
  { id: "chal-y8-vcs-10", prompt: "Two cylinders of radius 3 (heights 4 and 8) are joined. Find the total volume (exact).", latex: "36\\pi+72\\pi", answer: "108π", acceptedAnswers: piv("108π"), hint: "Add the volumes.", explanation: "36π + 72π = 108π." },
  { id: "chal-y8-vcs-11", prompt: "A cube of side 10 has a cylinder of radius 2, height 10 drilled through it. Find the remaining volume (exact).", latex: "1000-40\\pi", answer: "1000 − 40π", acceptedAnswers: piv("1000 − 40π"), hint: "Cube minus the cylinder.", explanation: "1000 − 40π." },
  { id: "chal-y8-vcs-12", prompt: "A cube has side 7. Find its volume.", latex: "7^3", answer: "343", acceptedAnswers: [], hint: "side³.", explanation: "343." },
];
