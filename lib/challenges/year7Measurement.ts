import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 7 — Wave 1. D6 (Level-6) challenge pools, 12 per section, for the measurement cluster:
// perimeter (3 sections), area (4), volume (2). Registered course-scoped
// ("year-7-mathematics/<lesson>") in lib/challenges/index.ts; unlocked after mastery via the
// existing challenge flow (no new system). Auto-markable single-value / exact-pi answers. The seeder
// tags challenge questions as D6, so no per-item difficulty field is needed. Exponent notation is
// kept out of prose (cm^2 etc. written as unicode cm² or in the latex field) per the audit rule.

// Accepted-variant helper for exact-pi answers: adds pi / \pi spellings, no-space, and ascii-minus.
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

// ── Perimeter of polygons ─────────────────────────────────────────────────────────────────────
export const perimeterOfPolygonsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-pp-1", prompt: "A regular hexagon has perimeter 48 cm. Find the side length (cm).", latex: "P=6s", answer: "8", acceptedAnswers: [], hint: "Divide by 6 equal sides.", explanation: "48 ÷ 6 = 8 cm." },
  { id: "chal-y7-pp-2", prompt: "A regular pentagon has side 13 mm. Find its perimeter (mm).", latex: "P=5s", answer: "65", acceptedAnswers: [], hint: "Five equal sides.", explanation: "5 × 13 = 65 mm." },
  { id: "chal-y7-pp-3", prompt: "A rectangle has perimeter 50 cm and width 9 cm. Find its length (cm).", latex: "P=2(l+w)", answer: "16", acceptedAnswers: [], hint: "Half the perimeter is l + w.", explanation: "l = 25 − 9 = 16 cm." },
  { id: "chal-y7-pp-4", prompt: "An equilateral triangle and a square have equal perimeters. The triangle's side is 8 cm. Find the square's side (cm).", latex: "3(8)=4s", answer: "6", acceptedAnswers: [], hint: "Match the perimeters.", explanation: "Triangle perimeter 24; square side 24/4 = 6 cm." },
  { id: "chal-y7-pp-5", prompt: "A regular octagon has perimeter 100 cm. Find the side length (cm).", latex: "P=8s", answer: "12.5", acceptedAnswers: [], hint: "Eight equal sides.", explanation: "100 ÷ 8 = 12.5 cm." },
  { id: "chal-y7-pp-6", prompt: "An isosceles triangle has two equal sides of 17 cm and perimeter 45 cm. Find the base (cm).", latex: "45-2(17)", answer: "11", acceptedAnswers: [], hint: "Subtract the two equal sides.", explanation: "45 − 34 = 11 cm." },
  { id: "chal-y7-pp-7", prompt: "A regular polygon has side 7 cm and perimeter 84 cm. How many sides does it have?", latex: "84\\div7", answer: "12", acceptedAnswers: [], hint: "Perimeter ÷ side.", explanation: "84 ÷ 7 = 12 sides." },
  { id: "chal-y7-pp-8", prompt: "A rectangle has length triple its width and perimeter 64 cm. Find the width (cm).", latex: "2(w+3w)=64", answer: "8", acceptedAnswers: [], hint: "Perimeter = 8w.", explanation: "8w = 64, so w = 8 cm." },
  { id: "chal-y7-pp-9", prompt: "A square has the same perimeter as a 10 cm by 6 cm rectangle. Find the square's side (cm).", latex: "2(10+6)=4s", answer: "8", acceptedAnswers: [], hint: "Rectangle perimeter first.", explanation: "Rectangle perimeter 32; square side 32/4 = 8 cm." },
  { id: "chal-y7-pp-10", prompt: "A regular decagon (10 sides) has perimeter 95 cm. Find the side length (cm).", latex: "P=10s", answer: "9.5", acceptedAnswers: [], hint: "Ten equal sides.", explanation: "95 ÷ 10 = 9.5 cm." },
  { id: "chal-y7-pp-11", prompt: "A hexagon has sides 5, 8, 5, 8, 5, 8 cm. Find its perimeter (cm).", latex: "3(5)+3(8)", answer: "39", acceptedAnswers: [], hint: "Add all six sides.", explanation: "15 + 24 = 39 cm." },
  { id: "chal-y7-pp-12", prompt: "A regular polygon has perimeter 132 cm with sides of 11 cm. Find the number of sides.", latex: "132\\div11", answer: "12", acceptedAnswers: [], hint: "Perimeter ÷ side.", explanation: "132 ÷ 11 = 12 sides." },
];

// ── Perimeter of composite shapes ─────────────────────────────────────────────────────────────
export const perimeterCompositeShapesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-pcs-1", prompt: "An L-shape is a 9 cm by 7 cm rectangle with a rectangular corner removed. Find its perimeter (cm).", latex: "2(9+7)", answer: "32", acceptedAnswers: [], hint: "A corner cut keeps the bounding-rectangle perimeter.", explanation: "The steps add back to the full 9×7 rectangle: 2(9+7) = 32 cm." },
  { id: "chal-y7-pcs-2", prompt: "A track is an 80 m by 50 m rectangle with a semicircle (diameter 50 m) on each short end. Find the perimeter (exact, m).", latex: "2(80)+\\pi(50)", answer: "160 + 50π", acceptedAnswers: piv("160 + 50π"), hint: "Two straights + two semicircles (= one full circle).", explanation: "160 + π(50) = 160 + 50π m." },
  { id: "chal-y7-pcs-3", prompt: "A 14 cm by 8 cm rectangle has a semicircle of diameter 8 cm attached to one 8 cm side. Find the total perimeter (exact, cm).", latex: "14+8+14+\\pi(4)", answer: "36 + 4π", acceptedAnswers: piv("36 + 4π"), hint: "Three rectangle sides + the arc (πr).", explanation: "14 + 8 + 14 + π(4) = 36 + 4π cm." },
  { id: "chal-y7-pcs-4", prompt: "A 6 cm square has a semicircle of diameter 6 cm removed from one side (the flat side replaced by the inward arc). Find the perimeter (exact, cm).", latex: "3(6)+\\pi(3)", answer: "18 + 3π", acceptedAnswers: piv("18 + 3π"), hint: "Three full sides + the arc (πr).", explanation: "18 + π(3) = 18 + 3π cm." },
  { id: "chal-y7-pcs-5", prompt: "A rectilinear shape has consecutive sides 10, 4, 6, 4, 4, 8 cm. Find its perimeter (cm).", latex: "10+4+6+4+4+8", answer: "36", acceptedAnswers: [], hint: "Add every side.", explanation: "10 + 4 + 6 + 4 + 4 + 8 = 36 cm." },
  { id: "chal-y7-pcs-6", prompt: "A quarter circle has radius 14 cm (two straight radii + the arc). Find its perimeter (exact, cm).", latex: "2(14)+\\tfrac14(2\\pi\\cdot14)", answer: "28 + 7π", acceptedAnswers: piv("28 + 7π"), hint: "Two radii + a quarter of the circumference.", explanation: "28 + (1/4)(28π) = 28 + 7π cm." },
  { id: "chal-y7-pcs-7", prompt: "A semicircle has diameter 20 cm. Find its perimeter (exact, cm).", latex: "\\pi(10)+20", answer: "20 + 10π", acceptedAnswers: piv("20 + 10π"), hint: "Half the circumference + the diameter.", explanation: "arc πr = 10π; + 20 → 20 + 10π cm." },
  { id: "chal-y7-pcs-8", prompt: "A 10 cm square has a 4 cm square notch cut into the middle of one side (in 4, across 4, out 4). Find the perimeter (cm).", latex: "40+2(4)", answer: "48", acceptedAnswers: [], hint: "A notch adds its two depth sides.", explanation: "The two 4 cm depth sides add 8: 40 + 8 = 48 cm." },
  { id: "chal-y7-pcs-9", prompt: "A 90° sector has radius 8 cm. Find its perimeter (exact, cm).", latex: "2(8)+\\tfrac14(2\\pi\\cdot8)", answer: "16 + 4π", acceptedAnswers: piv("16 + 4π"), hint: "Two radii + a quarter of the circumference.", explanation: "16 + (1/4)(16π) = 16 + 4π cm." },
  { id: "chal-y7-pcs-10", prompt: "A rectilinear shape has consecutive sides 12, 3, 5, 4, 7, 7 cm. Find its perimeter (cm).", latex: "12+3+5+4+7+7", answer: "38", acceptedAnswers: [], hint: "Add every side.", explanation: "12 + 3 + 5 + 4 + 7 + 7 = 38 cm." },
  { id: "chal-y7-pcs-11", prompt: "A shape is a 30 m by 20 m rectangle with a semicircle (diameter 20 m) on each short end. Find the perimeter (exact, m).", latex: "2(30)+\\pi(20)", answer: "60 + 20π", acceptedAnswers: piv("60 + 20π"), hint: "Two straights + one full circle of diameter 20.", explanation: "60 + π(20) = 60 + 20π m." },
  { id: "chal-y7-pcs-12", prompt: "A 120° sector has radius 9 cm. Find its perimeter (exact, cm).", latex: "2(9)+\\tfrac{120}{360}(2\\pi\\cdot9)", answer: "18 + 6π", acceptedAnswers: piv("18 + 6π"), hint: "Two radii + one-third of the circumference.", explanation: "18 + (1/3)(18π) = 18 + 6π cm." },
];

// ── Perimeter problem solving ─────────────────────────────────────────────────────────────────
export const perimeterProblemSolvingChallenge: PracticeQuestion[] = [
  { id: "chal-y7-pps-1", prompt: "Fencing costs $12 per metre. A rectangular yard is 15 m by 9 m. Find the total cost ($).", latex: "12\\times2(15+9)", answer: "576", acceptedAnswers: [], hint: "Perimeter × rate.", explanation: "Perimeter 48 m; 48 × 12 = $576." },
  { id: "chal-y7-pps-2", prompt: "A square paddock has perimeter 200 m. Find its area (m²).", latex: "s=200/4", answer: "2500", acceptedAnswers: [], hint: "Find the side first.", explanation: "Side 50 m; area 50 × 50 = 2500 m²." },
  { id: "chal-y7-pps-3", prompt: "A rectangular field has perimeter 60 m and length 18 m. Find its area (m²).", latex: "w=30-18", answer: "216", acceptedAnswers: [], hint: "Width = 30 − 18.", explanation: "Width 12 m; area 18 × 12 = 216 m²." },
  { id: "chal-y7-pps-4", prompt: "A 72 cm wire is bent into a square. Find the area enclosed (cm²).", latex: "s=72/4", answer: "324", acceptedAnswers: [], hint: "Side = 72/4.", explanation: "Side 18 cm; area 18² = 324 cm²." },
  { id: "chal-y7-pps-5", prompt: "A 12 m by 8 m garden is bordered by a path so the outer rectangle is 14 m by 10 m. Find the outer perimeter (m).", latex: "2(14+10)", answer: "48", acceptedAnswers: [], hint: "Perimeter of the outer rectangle.", explanation: "2(14 + 10) = 48 m." },
  { id: "chal-y7-pps-6", prompt: "A regular hexagonal pen needs 90 m of fencing. Find the side length (m).", latex: "90/6", answer: "15", acceptedAnswers: [], hint: "Six equal sides.", explanation: "90 ÷ 6 = 15 m." },
  { id: "chal-y7-pps-7", prompt: "A 48 cm wire forms a rectangle that is twice as long as it is wide. Find the longer side (cm).", latex: "2(w+2w)=48", answer: "16", acceptedAnswers: [], hint: "Perimeter = 6w.", explanation: "6w = 48 → w = 8; length 2w = 16 cm." },
  { id: "chal-y7-pps-8", prompt: "Skirting board runs around a 5 m by 4 m room, leaving a 1 m doorway. Find the length needed (m).", latex: "2(5+4)-1", answer: "17", acceptedAnswers: [], hint: "Perimeter minus the doorway.", explanation: "18 − 1 = 17 m." },
  { id: "chal-y7-pps-9", prompt: "A triangular garden has sides 9 m, 12 m and 15 m. Fencing costs $8 per metre. Find the total cost ($).", latex: "8\\times(9+12+15)", answer: "288", acceptedAnswers: [], hint: "Perimeter × rate.", explanation: "Perimeter 36 m; 36 × 8 = $288." },
  { id: "chal-y7-pps-10", prompt: "A square has area 81 m². Find its perimeter (m).", latex: "P=4\\sqrt{81}", answer: "36", acceptedAnswers: [], hint: "Side = √area.", explanation: "Side 9 m; perimeter 36 m." },
  { id: "chal-y7-pps-11", prompt: "Two squares of side 6 cm are placed side by side forming a 12 cm by 6 cm rectangle. Find its perimeter (cm).", latex: "2(12+6)", answer: "36", acceptedAnswers: [], hint: "Perimeter of the combined rectangle.", explanation: "2(12 + 6) = 36 cm." },
  { id: "chal-y7-pps-12", prompt: "Two strands of wire run around a 100 m by 60 m field. Find the total wire needed (m).", latex: "2\\times2(100+60)", answer: "640", acceptedAnswers: [], hint: "Perimeter × 2 strands.", explanation: "Perimeter 320 m; × 2 = 640 m." },
];

// ── Area of rectangles and triangles ──────────────────────────────────────────────────────────
export const areaRectanglesTrianglesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-art-1", prompt: "A triangle has base 14 cm and area 56 cm². Find its height (cm).", latex: "A=\\tfrac12 bh", answer: "8", acceptedAnswers: [], hint: "h = 2A/b.", explanation: "56 = ½(14)h → h = 8 cm." },
  { id: "chal-y7-art-2", prompt: "A rectangle has area 96 cm² and length 12 cm. Find its width (cm).", latex: "A=lw", answer: "8", acceptedAnswers: [], hint: "w = A/l.", explanation: "96 ÷ 12 = 8 cm." },
  { id: "chal-y7-art-3", prompt: "A triangle has area 30 cm² and height 5 cm. Find its base (cm).", latex: "A=\\tfrac12 bh", answer: "12", acceptedAnswers: [], hint: "b = 2A/h.", explanation: "30 = ½ b(5) → b = 12 cm." },
  { id: "chal-y7-art-4", prompt: "A 15 cm by 8 cm rectangle and a triangle have equal areas. The triangle's base is 10 cm. Find its height (cm).", latex: "\\tfrac12(10)h=120", answer: "24", acceptedAnswers: [], hint: "Rectangle area first.", explanation: "Area 120; ½(10)h = 120 → h = 24 cm." },
  { id: "chal-y7-art-5", prompt: "Find the area of a right triangle with legs 9 cm and 12 cm (cm²).", latex: "\\tfrac12(9)(12)", answer: "54", acceptedAnswers: [], hint: "½ × leg × leg.", explanation: "½ × 9 × 12 = 54 cm²." },
  { id: "chal-y7-art-6", prompt: "A square has area 144 cm². Find its perimeter (cm).", latex: "P=4\\sqrt{144}", answer: "48", acceptedAnswers: [], hint: "Side = √area.", explanation: "Side 12 cm; perimeter 48 cm." },
  { id: "chal-y7-art-7", prompt: "A rectangle's length is twice its width and its area is 72 cm². Find the width (cm).", latex: "2w^2=72", answer: "6", acceptedAnswers: [], hint: "2w² = 72.", explanation: "w² = 36 → w = 6 cm." },
  { id: "chal-y7-art-8", prompt: "A triangle with base 16 cm has the same area as a 6 cm by 8 cm rectangle. Find its height (cm).", latex: "\\tfrac12(16)h=48", answer: "6", acceptedAnswers: [], hint: "Rectangle area 48.", explanation: "½(16)h = 48 → h = 6 cm." },
  { id: "chal-y7-art-9", prompt: "Find the area of a triangle with base 25 cm and height 8 cm (cm²).", latex: "\\tfrac12(25)(8)", answer: "100", acceptedAnswers: [], hint: "½ × base × height.", explanation: "½ × 25 × 8 = 100 cm²." },
  { id: "chal-y7-art-10", prompt: "A rectangle has perimeter 34 cm and length 10 cm. Find its area (cm²).", latex: "w=17-10", answer: "70", acceptedAnswers: [], hint: "Find the width first.", explanation: "Width 7 cm; area 10 × 7 = 70 cm²." },
  { id: "chal-y7-art-11", prompt: "A triangle has area 84 cm² and base 24 cm. Find its height (cm).", latex: "\\tfrac12(24)h=84", answer: "7", acceptedAnswers: [], hint: "12h = 84.", explanation: "½(24)h = 84 → h = 7 cm." },
  { id: "chal-y7-art-12", prompt: "A 12 cm by 10 cm rectangle is cut along a diagonal into two triangles. Find the area of one triangle (cm²).", latex: "\\tfrac12(120)", answer: "60", acceptedAnswers: [], hint: "Half the rectangle.", explanation: "120 ÷ 2 = 60 cm²." },
];

// ── Area of parallelograms and trapeziums ─────────────────────────────────────────────────────
export const areaParallelogramsTrapezoidsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-apt-1", prompt: "A parallelogram has base 13 cm and height 6 cm. Find its area (cm²).", latex: "A=bh", answer: "78", acceptedAnswers: [], hint: "base × height.", explanation: "13 × 6 = 78 cm²." },
  { id: "chal-y7-apt-2", prompt: "A trapezium has parallel sides 8 cm and 12 cm and height 5 cm. Find its area (cm²).", latex: "A=\\tfrac12(a+b)h", answer: "50", acceptedAnswers: [], hint: "½(a + b)h.", explanation: "½(20)(5) = 50 cm²." },
  { id: "chal-y7-apt-3", prompt: "A parallelogram has area 90 cm² and base 15 cm. Find its height (cm).", latex: "h=A/b", answer: "6", acceptedAnswers: [], hint: "h = A/base.", explanation: "90 ÷ 15 = 6 cm." },
  { id: "chal-y7-apt-4", prompt: "A trapezium has area 60 cm² and parallel sides 7 cm and 13 cm. Find its height (cm).", latex: "\\tfrac12(20)h=60", answer: "6", acceptedAnswers: [], hint: "Sum of parallel sides is 20.", explanation: "10h = 60 → h = 6 cm." },
  { id: "chal-y7-apt-5", prompt: "A parallelogram has area 120 cm² and height 8 cm. Find its base (cm).", latex: "b=A/h", answer: "15", acceptedAnswers: [], hint: "b = A/height.", explanation: "120 ÷ 8 = 15 cm." },
  { id: "chal-y7-apt-6", prompt: "A trapezium has parallel sides 9 cm and 15 cm and height 10 cm. Find its area (cm²).", latex: "\\tfrac12(24)(10)", answer: "120", acceptedAnswers: [], hint: "½(a + b)h.", explanation: "½(24)(10) = 120 cm²." },
  { id: "chal-y7-apt-7", prompt: "A trapezium has area 84 cm², height 8 cm and one parallel side 6 cm. Find the other parallel side (cm).", latex: "\\tfrac12(6+b)8=84", answer: "15", acceptedAnswers: [], hint: "4(6 + b) = 84.", explanation: "6 + b = 21 → b = 15 cm." },
  { id: "chal-y7-apt-8", prompt: "A parallelogram and a 9 cm by 8 cm rectangle have equal areas. The parallelogram's base is 12 cm. Find its height (cm).", latex: "12h=72", answer: "6", acceptedAnswers: [], hint: "Rectangle area 72.", explanation: "12h = 72 → h = 6 cm." },
  { id: "chal-y7-apt-9", prompt: "A trapezium with parallel sides 5 cm and 11 cm has area 48 cm². Find its height (cm).", latex: "\\tfrac12(16)h=48", answer: "6", acceptedAnswers: [], hint: "Sum of parallel sides 16.", explanation: "8h = 48 → h = 6 cm." },
  { id: "chal-y7-apt-10", prompt: "A parallelogram has base 2.5 cm and height 4 cm. Find its area (cm²).", latex: "A=bh", answer: "10", acceptedAnswers: [], hint: "base × height.", explanation: "2.5 × 4 = 10 cm²." },
  { id: "chal-y7-apt-11", prompt: "A trapezium has parallel sides 14 cm and 6 cm and area 100 cm². Find its height (cm).", latex: "\\tfrac12(20)h=100", answer: "10", acceptedAnswers: [], hint: "Sum of parallel sides 20.", explanation: "10h = 100 → h = 10 cm." },
  { id: "chal-y7-apt-12", prompt: "A parallelogram has area 156 cm² and base 12 cm. Find its height (cm).", latex: "h=A/b", answer: "13", acceptedAnswers: [], hint: "h = A/base.", explanation: "156 ÷ 12 = 13 cm." },
];

// ── Area of composite shapes ──────────────────────────────────────────────────────────────────
export const areaCompositeShapesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-acs-1", prompt: "An L-shape is a 10 cm by 8 cm rectangle with a 4 cm by 3 cm rectangle removed. Find its area (cm²).", latex: "80-12", answer: "68", acceptedAnswers: [], hint: "Big rectangle minus the cut.", explanation: "80 − 12 = 68 cm²." },
  { id: "chal-y7-acs-2", prompt: "A 12 cm square has a circle of radius 3 cm removed. Find the remaining area (exact, cm²).", latex: "144-\\pi(3)^2", answer: "144 − 9π", acceptedAnswers: piv("144 − 9π"), hint: "Square area minus πr².", explanation: "144 − 9π cm²." },
  { id: "chal-y7-acs-3", prompt: "A 14 cm by 6 cm rectangle has a triangle (base 6 cm, height 4 cm) attached to one end. Find the total area (cm²).", latex: "84+\\tfrac12(6)(4)", answer: "96", acceptedAnswers: [], hint: "Rectangle + triangle.", explanation: "84 + 12 = 96 cm²." },
  { id: "chal-y7-acs-4", prompt: "A 20 cm by 10 cm rectangle has a semicircle of radius 5 cm removed. Find the remaining area (exact, cm²).", latex: "200-\\tfrac12\\pi(5)^2", answer: "200 − 12.5π", acceptedAnswers: piv("200 − 12.5π"), hint: "Rectangle minus half a circle.", explanation: "200 − ½π(25) = 200 − 12.5π cm²." },
  { id: "chal-y7-acs-5", prompt: "Two rectangles measure 8 cm by 3 cm and 5 cm by 4 cm. Find their total area (cm²).", latex: "24+20", answer: "44", acceptedAnswers: [], hint: "Add the two areas.", explanation: "24 + 20 = 44 cm²." },
  { id: "chal-y7-acs-6", prompt: "A trapezium (parallel sides 10 cm and 6 cm, height 4 cm) sits on a 10 cm by 5 cm rectangle. Find the total area (cm²).", latex: "\\tfrac12(16)(4)+50", answer: "82", acceptedAnswers: [], hint: "Trapezium + rectangle.", explanation: "32 + 50 = 82 cm²." },
  { id: "chal-y7-acs-7", prompt: "A 16 cm by 12 cm rectangle has a 4 cm by 4 cm square hole. Find the remaining area (cm²).", latex: "192-16", answer: "176", acceptedAnswers: [], hint: "Rectangle minus the hole.", explanation: "192 − 16 = 176 cm²." },
  { id: "chal-y7-acs-8", prompt: "A square of side 10 cm has a quarter circle of radius 10 cm removed from one corner. Find the remaining area (exact, cm²).", latex: "100-\\tfrac14\\pi(10)^2", answer: "100 − 25π", acceptedAnswers: piv("100 − 25π"), hint: "Square minus a quarter circle.", explanation: "100 − ¼π(100) = 100 − 25π cm²." },
  { id: "chal-y7-acs-9", prompt: "A circle of radius 6 cm has a square of side 4 cm removed. Find the remaining area (exact, cm²).", latex: "\\pi(6)^2-16", answer: "36π − 16", acceptedAnswers: piv("36π − 16"), hint: "Circle minus square.", explanation: "36π − 16 cm²." },
  { id: "chal-y7-acs-10", prompt: "An arrow is a 10 cm by 4 cm rectangle with a triangle (base 8 cm, height 6 cm) on one end. Find the total area (cm²).", latex: "40+\\tfrac12(8)(6)", answer: "64", acceptedAnswers: [], hint: "Rectangle + triangle.", explanation: "40 + 24 = 64 cm²." },
  { id: "chal-y7-acs-11", prompt: "An 18 cm by 10 cm rectangle has two circles of radius 2 cm removed. Find the remaining area (exact, cm²).", latex: "180-2\\pi(2)^2", answer: "180 − 8π", acceptedAnswers: piv("180 − 8π"), hint: "Rectangle minus two πr² circles.", explanation: "180 − 2(4π) = 180 − 8π cm²." },
  { id: "chal-y7-acs-12", prompt: "A square of side 12 cm has a square of side 5 cm removed from a corner. Find the remaining area (cm²).", latex: "144-25", answer: "119", acceptedAnswers: [], hint: "Big square minus small square.", explanation: "144 − 25 = 119 cm²." },
];

// ── Area problem solving ──────────────────────────────────────────────────────────────────────
export const areaProblemSolvingChallenge: PracticeQuestion[] = [
  { id: "chal-y7-aps-1", prompt: "A 6 m by 4 m floor is tiled with 0.5 m square tiles. How many tiles are needed?", latex: "24\\div0.25", answer: "96", acceptedAnswers: [], hint: "Floor area ÷ tile area.", explanation: "24 ÷ 0.25 = 96 tiles." },
  { id: "chal-y7-aps-2", prompt: "A wall is 8 m by 3 m. One tin of paint covers 6 m². How many tins are needed?", latex: "24\\div6", answer: "4", acceptedAnswers: [], hint: "Wall area ÷ coverage.", explanation: "24 ÷ 6 = 4 tins." },
  { id: "chal-y7-aps-3", prompt: "A square garden has area 169 m². Find the length of fencing for its perimeter (m).", latex: "4\\sqrt{169}", answer: "52", acceptedAnswers: [], hint: "Side = √area.", explanation: "Side 13 m; perimeter 52 m." },
  { id: "chal-y7-aps-4", prompt: "Carpet costs $25 per m². A room is 5 m by 4 m. Find the total cost ($).", latex: "20\\times25", answer: "500", acceptedAnswers: [], hint: "Area × rate.", explanation: "20 × 25 = $500." },
  { id: "chal-y7-aps-5", prompt: "A triangular sail has base 4 m and height 9 m. Find its area (m²).", latex: "\\tfrac12(4)(9)", answer: "18", acceptedAnswers: [], hint: "½ × base × height.", explanation: "½ × 4 × 9 = 18 m²." },
  { id: "chal-y7-aps-6", prompt: "A rectangular field is 50 m by 30 m. Find its area in hectares (1 ha = 10000 m²).", latex: "1500\\div10000", answer: "0.15", acceptedAnswers: [], hint: "Area ÷ 10000.", explanation: "1500 ÷ 10000 = 0.15 ha." },
  { id: "chal-y7-aps-7", prompt: "A path has area 36 m² and width 2 m. Find its length (m).", latex: "36\\div2", answer: "18", acceptedAnswers: [], hint: "Length = area/width.", explanation: "36 ÷ 2 = 18 m." },
  { id: "chal-y7-aps-8", prompt: "Two coats of paint cover a 12 m² wall. One litre covers 8 m². How many litres are needed?", latex: "24\\div8", answer: "3", acceptedAnswers: [], hint: "Total area ÷ coverage.", explanation: "2 × 12 = 24 m²; 24 ÷ 8 = 3 litres." },
  { id: "chal-y7-aps-9", prompt: "A rectangular poster is 0.8 m by 0.5 m. Find its area (m²).", latex: "0.8\\times0.5", answer: "0.4", acceptedAnswers: [], hint: "length × width.", explanation: "0.8 × 0.5 = 0.4 m²." },
  { id: "chal-y7-aps-10", prompt: "A 9 m by 6 m floor is covered by 1.5 m square mats. How many mats are needed?", latex: "54\\div2.25", answer: "24", acceptedAnswers: [], hint: "Floor area ÷ mat area.", explanation: "54 ÷ 2.25 = 24 mats." },
  { id: "chal-y7-aps-11", prompt: "Grass seed covers 25 m² per bag. How many bags cover a 10 m by 10 m lawn?", latex: "100\\div25", answer: "4", acceptedAnswers: [], hint: "Lawn area ÷ coverage.", explanation: "100 ÷ 25 = 4 bags." },
  { id: "chal-y7-aps-12", prompt: "A rectangle has area 240 cm². A second rectangle has the same area and width 16 cm. Find the second rectangle's length (cm).", latex: "240\\div16", answer: "15", acceptedAnswers: [], hint: "Length = area/width.", explanation: "240 ÷ 16 = 15 cm." },
];

// ── Volume of prisms ──────────────────────────────────────────────────────────────────────────
export const volumeOfPrismsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-vp-1", prompt: "A rectangular prism is 5 cm by 4 cm by 3 cm. Find its volume (cm³).", latex: "5\\times4\\times3", answer: "60", acceptedAnswers: [], hint: "l × w × h.", explanation: "5 × 4 × 3 = 60 cm³." },
  { id: "chal-y7-vp-2", prompt: "A cube has volume 125 cm³. Find its side length (cm).", latex: "\\sqrt[3]{125}", answer: "5", acceptedAnswers: [], hint: "Cube root.", explanation: "5³ = 125, so side 5 cm." },
  { id: "chal-y7-vp-3", prompt: "A triangular prism has cross-section area 12 cm² and length 10 cm. Find its volume (cm³).", latex: "12\\times10", answer: "120", acceptedAnswers: [], hint: "Cross-section × length.", explanation: "12 × 10 = 120 cm³." },
  { id: "chal-y7-vp-4", prompt: "A rectangular prism has volume 180 cm³ and a 6 cm by 5 cm base. Find its height (cm).", latex: "180\\div30", answer: "6", acceptedAnswers: [], hint: "Volume ÷ base area.", explanation: "180 ÷ 30 = 6 cm." },
  { id: "chal-y7-vp-5", prompt: "A triangular prism has a right-triangle cross-section (legs 6 cm and 8 cm) and length 10 cm. Find its volume (cm³).", latex: "\\tfrac12(6)(8)\\times10", answer: "240", acceptedAnswers: [], hint: "½ × leg × leg × length.", explanation: "24 × 10 = 240 cm³." },
  { id: "chal-y7-vp-6", prompt: "A cube has side 4 cm. Find its volume (cm³).", latex: "4^3", answer: "64", acceptedAnswers: [], hint: "side³.", explanation: "4³ = 64 cm³." },
  { id: "chal-y7-vp-7", prompt: "How many 1 cm cubes fit in an 8 cm by 5 cm by 2 cm box?", latex: "8\\times5\\times2", answer: "80", acceptedAnswers: [], hint: "That is the volume in cm³.", explanation: "8 × 5 × 2 = 80 cubes." },
  { id: "chal-y7-vp-8", prompt: "A prism has volume 96 cm³ and cross-section area 16 cm². Find its length (cm).", latex: "96\\div16", answer: "6", acceptedAnswers: [], hint: "Volume ÷ cross-section.", explanation: "96 ÷ 16 = 6 cm." },
  { id: "chal-y7-vp-9", prompt: "A 10 cm by 6 cm by 5 cm tank is half full. Find the volume of water (cm³).", latex: "\\tfrac12(10\\cdot6\\cdot5)", answer: "150", acceptedAnswers: [], hint: "Half the full volume.", explanation: "300 ÷ 2 = 150 cm³." },
  { id: "chal-y7-vp-10", prompt: "A cube has volume 216 cm³. Find its total surface area (cm²).", latex: "6s^2", answer: "216", acceptedAnswers: [], hint: "Find the side, then 6 × side².", explanation: "Side 6 cm; 6 × 36 = 216 cm²." },
  { id: "chal-y7-vp-11", prompt: "A triangular prism has cross-section area 9 cm² and volume 153 cm³. Find its length (cm).", latex: "153\\div9", answer: "17", acceptedAnswers: [], hint: "Volume ÷ cross-section.", explanation: "153 ÷ 9 = 17 cm." },
  { id: "chal-y7-vp-12", prompt: "Two cubes of side 3 cm are joined. Find the total volume (cm³).", latex: "2\\times3^3", answer: "54", acceptedAnswers: [], hint: "Twice one cube's volume.", explanation: "2 × 27 = 54 cm³." },
];

// ── Volume of cylinders ───────────────────────────────────────────────────────────────────────
export const volumeOfCylindersChallenge: PracticeQuestion[] = [
  { id: "chal-y7-vc-1", prompt: "A cylinder has radius 3 cm and height 10 cm. Find its volume (exact, cm³).", latex: "\\pi(3)^2(10)", answer: "90π", acceptedAnswers: piv("90π"), hint: "πr²h.", explanation: "π × 9 × 10 = 90π cm³." },
  { id: "chal-y7-vc-2", prompt: "A cylinder has radius 5 cm and height 4 cm. Find its volume (exact, cm³).", latex: "\\pi(5)^2(4)", answer: "100π", acceptedAnswers: piv("100π"), hint: "πr²h.", explanation: "π × 25 × 4 = 100π cm³." },
  { id: "chal-y7-vc-3", prompt: "A cylinder has diameter 8 cm and height 7 cm. Find its volume (exact, cm³).", latex: "\\pi(4)^2(7)", answer: "112π", acceptedAnswers: piv("112π"), hint: "Radius is 4.", explanation: "π × 16 × 7 = 112π cm³." },
  { id: "chal-y7-vc-4", prompt: "A cylinder has volume 36π cm³ and radius 3 cm. Find its height (cm).", latex: "\\pi(9)h=36\\pi", answer: "4", acceptedAnswers: [], hint: "Divide by 9π.", explanation: "9h = 36 → h = 4 cm." },
  { id: "chal-y7-vc-5", prompt: "A cylinder has volume 200π cm³ and height 8 cm. Find its radius (cm).", latex: "\\pi r^2(8)=200\\pi", answer: "5", acceptedAnswers: [], hint: "r² = 25.", explanation: "r² = 25 → r = 5 cm." },
  { id: "chal-y7-vc-6", prompt: "A cylinder has radius 2 cm and height 15 cm. Find its volume (exact, cm³).", latex: "\\pi(2)^2(15)", answer: "60π", acceptedAnswers: piv("60π"), hint: "πr²h.", explanation: "π × 4 × 15 = 60π cm³." },
  { id: "chal-y7-vc-7", prompt: "A cylinder has radius 6 cm and height 6 cm. Find its volume (exact, cm³).", latex: "\\pi(6)^2(6)", answer: "216π", acceptedAnswers: piv("216π"), hint: "πr²h.", explanation: "π × 36 × 6 = 216π cm³." },
  { id: "chal-y7-vc-8", prompt: "A cylinder has volume 48π cm³ and radius 4 cm. Find its height (cm).", latex: "\\pi(16)h=48\\pi", answer: "3", acceptedAnswers: [], hint: "Divide by 16π.", explanation: "16h = 48 → h = 3 cm." },
  { id: "chal-y7-vc-9", prompt: "A cylinder has radius 10 cm and height 2 cm. Find its volume (exact, cm³).", latex: "\\pi(10)^2(2)", answer: "200π", acceptedAnswers: piv("200π"), hint: "πr²h.", explanation: "π × 100 × 2 = 200π cm³." },
  { id: "chal-y7-vc-10", prompt: "A cylindrical can has diameter 10 cm and height 12 cm. Find its volume (exact, cm³).", latex: "\\pi(5)^2(12)", answer: "300π", acceptedAnswers: piv("300π"), hint: "Radius is 5.", explanation: "π × 25 × 12 = 300π cm³." },
  { id: "chal-y7-vc-11", prompt: "A cylinder has volume 175π cm³ and height 7 cm. Find its radius (cm).", latex: "\\pi r^2(7)=175\\pi", answer: "5", acceptedAnswers: [], hint: "r² = 25.", explanation: "r² = 25 → r = 5 cm." },
  { id: "chal-y7-vc-12", prompt: "Two cylinders have radius 3 cm with heights 4 cm and 6 cm. Find their total volume (exact, cm³).", latex: "\\pi(9)(4)+\\pi(9)(6)", answer: "90π", acceptedAnswers: piv("90π"), hint: "Add the two volumes.", explanation: "36π + 54π = 90π cm³." },
];
