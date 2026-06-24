import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 7 — Wave 4. D6 (Level-6) challenge pools, 12 per section, for angles (5 sections) and
// ratios-and-rates (5). Registered course-scoped ("year-7-mathematics/<lesson>") in
// lib/challenges/index.ts; unlocked after mastery via the existing challenge flow (no new system).
// Auto-markable single-value answers. The seeder tags challenge questions as D6, so no per-item
// difficulty field is needed. Exponents (none expected here) would be wrapped in $...$ in prose.

const m = (a: string): string[] => (a.includes("-") ? [a.replace(/-/g, "−")] : []);

// ── Angles: types and relationships ───────────────────────────────────────────────────────────
export const angleTypesRelationshipsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-atr-1", prompt: "Two angles are complementary. One is 37°. Find the other (degrees).", latex: "a+b=90", answer: "53", acceptedAnswers: [], hint: "They add to 90°.", explanation: "90 − 37 = 53°." },
  { id: "chal-y7-atr-2", prompt: "Two angles are supplementary. One is 115°. Find the other (degrees).", latex: "a+b=180", answer: "65", acceptedAnswers: [], hint: "They add to 180°.", explanation: "180 − 115 = 65°." },
  { id: "chal-y7-atr-3", prompt: "Three angles at a point are 90°, 130° and x. Find x (degrees).", latex: "90+130+x=360", answer: "140", acceptedAnswers: [], hint: "Angles at a point sum to 360°.", explanation: "360 − 220 = 140°." },
  { id: "chal-y7-atr-4", prompt: "Two angles on a straight line are in the ratio 2:3. Find the larger angle (degrees).", latex: "2k+3k=180", answer: "108", acceptedAnswers: [], hint: "5 parts make 180°.", explanation: "Each part 36°; larger = 3×36 = 108°." },
  { id: "chal-y7-atr-5", prompt: "Vertically opposite angles: one is 3x and its partner is 75°. Find x.", latex: "3x=75", answer: "25", acceptedAnswers: [], hint: "Vertically opposite angles are equal.", explanation: "3x = 75 → x = 25." },
  { id: "chal-y7-atr-6", prompt: "An angle is twice its complement. Find the angle (degrees).", latex: "a=2(90-a)", answer: "60", acceptedAnswers: [], hint: "a = 2(90 − a).", explanation: "a = 180 − 2a → 3a = 180 → a = 60°." },
  { id: "chal-y7-atr-7", prompt: "Four angles at a point are equal. Find each (degrees).", latex: "4x=360", answer: "90", acceptedAnswers: [], hint: "360 ÷ 4.", explanation: "Each = 90°." },
  { id: "chal-y7-atr-8", prompt: "An angle is 40° more than its supplement. Find the larger angle (degrees).", latex: "a=(180-a)+40", answer: "110", acceptedAnswers: [], hint: "a = (180 − a) + 40.", explanation: "2a = 220 → a = 110°." },
  { id: "chal-y7-atr-9", prompt: "Angles on a straight line are x, 2x and 3x. Find x (degrees).", latex: "x+2x+3x=180", answer: "30", acceptedAnswers: [], hint: "6x = 180.", explanation: "x = 30°." },
  { id: "chal-y7-atr-10", prompt: "Two supplementary angles are equal. Find each (degrees).", latex: "2a=180", answer: "90", acceptedAnswers: [], hint: "They add to 180° and are equal.", explanation: "Each = 90°." },
  { id: "chal-y7-atr-11", prompt: "An angle's complement is 4 times the angle. Find the angle (degrees).", latex: "90-a=4a", answer: "18", acceptedAnswers: [], hint: "90 − a = 4a.", explanation: "90 = 5a → a = 18°." },
  { id: "chal-y7-atr-12", prompt: "Three angles at a point are in the ratio 1:2:3. Find the largest (degrees).", latex: "k+2k+3k=360", answer: "180", acceptedAnswers: [], hint: "6 parts make 360°.", explanation: "Each part 60°; largest = 3×60 = 180°." },
];

// ── Angles: in triangles ──────────────────────────────────────────────────────────────────────
export const anglesInTrianglesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-ait-1", prompt: "A triangle has angles 47° and 68°. Find the third angle (degrees).", latex: "180-47-68", answer: "65", acceptedAnswers: [], hint: "Angles sum to 180°.", explanation: "180 − 115 = 65°." },
  { id: "chal-y7-ait-2", prompt: "An isosceles triangle has an apex angle of 40°. Find each base angle (degrees).", latex: "(180-40)/2", answer: "70", acceptedAnswers: [], hint: "The two base angles are equal.", explanation: "(180 − 40)/2 = 70°." },
  { id: "chal-y7-ait-3", prompt: "A right-angled triangle has one angle of 35°. Find the remaining angle (degrees).", latex: "180-90-35", answer: "55", acceptedAnswers: [], hint: "One angle is 90°.", explanation: "180 − 125 = 55°." },
  { id: "chal-y7-ait-4", prompt: "The angles of a triangle are in the ratio 2:3:4. Find the largest (degrees).", latex: "2k+3k+4k=180", answer: "80", acceptedAnswers: [], hint: "9 parts make 180°.", explanation: "Each part 20°; largest = 4×20 = 80°." },
  { id: "chal-y7-ait-5", prompt: "An exterior angle of a triangle is 120°. The two interior opposite angles are equal. Find each (degrees).", latex: "2x=120", answer: "60", acceptedAnswers: [], hint: "Exterior angle = sum of the two interior opposite.", explanation: "2x = 120 → x = 60°." },
  { id: "chal-y7-ait-6", prompt: "An equilateral triangle: find each angle (degrees).", latex: "180/3", answer: "60", acceptedAnswers: [], hint: "All three are equal.", explanation: "180 ÷ 3 = 60°." },
  { id: "chal-y7-ait-7", prompt: "A triangle has angles x, x + 20 and x + 40. Find x (degrees).", latex: "3x+60=180", answer: "40", acceptedAnswers: [], hint: "Sum to 180°.", explanation: "3x + 60 = 180 → x = 40°." },
  { id: "chal-y7-ait-8", prompt: "In an isosceles triangle each base angle is 52°. Find the apex angle (degrees).", latex: "180-2(52)", answer: "76", acceptedAnswers: [], hint: "Subtract the two base angles.", explanation: "180 − 104 = 76°." },
  { id: "chal-y7-ait-9", prompt: "A triangle has a right angle and the other two angles in the ratio 1:2. Find the larger of those two (degrees).", latex: "k+2k=90", answer: "60", acceptedAnswers: [], hint: "The two non-right angles sum to 90°.", explanation: "3k = 90 → k = 30; larger = 60°." },
  { id: "chal-y7-ait-10", prompt: "An exterior angle of a triangle is 145° and one interior opposite angle is 80°. Find the other interior opposite angle (degrees).", latex: "145-80", answer: "65", acceptedAnswers: [], hint: "Exterior = sum of interior opposites.", explanation: "145 − 80 = 65°." },
  { id: "chal-y7-ait-11", prompt: "The three angles of a triangle are 5x, 4x and 3x. Find the smallest (degrees).", latex: "12x=180", answer: "45", acceptedAnswers: [], hint: "12x = 180.", explanation: "x = 15; smallest = 3×15 = 45°." },
  { id: "chal-y7-ait-12", prompt: "Two angles of a triangle are 90° and 90°. Is this possible? Answer the third angle, or 0 if impossible.", latex: "180-90-90", answer: "0", acceptedAnswers: [], hint: "They already sum to 180°.", explanation: "90 + 90 = 180 leaves 0° — impossible as a triangle, so 0." },
];

// ── Angles: in quadrilaterals ─────────────────────────────────────────────────────────────────
export const anglesInQuadrilateralsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-aiq-1", prompt: "Three angles of a quadrilateral are 90°, 100° and 80°. Find the fourth (degrees).", latex: "360-90-100-80", answer: "90", acceptedAnswers: [], hint: "Angles sum to 360°.", explanation: "360 − 270 = 90°." },
  { id: "chal-y7-aiq-2", prompt: "The angles of a quadrilateral are in the ratio 1:2:3:4. Find the largest (degrees).", latex: "10k=360", answer: "144", acceptedAnswers: [], hint: "10 parts make 360°.", explanation: "Each part 36°; largest = 4×36 = 144°." },
  { id: "chal-y7-aiq-3", prompt: "A parallelogram has one angle of 65°. Find its adjacent angle (degrees).", latex: "180-65", answer: "115", acceptedAnswers: [], hint: "Co-interior angles in a parallelogram sum to 180°.", explanation: "180 − 65 = 115°." },
  { id: "chal-y7-aiq-4", prompt: "A quadrilateral has angles x, x, x and 120°. Find x (degrees).", latex: "3x+120=360", answer: "80", acceptedAnswers: [], hint: "Sum to 360°.", explanation: "3x = 240 → x = 80°." },
  { id: "chal-y7-aiq-5", prompt: "Find the size of each interior angle of a square (degrees).", latex: "360/4", answer: "90", acceptedAnswers: [], hint: "All four equal.", explanation: "360 ÷ 4 = 90°." },
  { id: "chal-y7-aiq-6", prompt: "Three angles of a quadrilateral are equal and the fourth is 150°. Find each of the equal angles (degrees).", latex: "3x+150=360", answer: "70", acceptedAnswers: [], hint: "3x + 150 = 360.", explanation: "3x = 210 → x = 70°." },
  { id: "chal-y7-aiq-7", prompt: "A kite has angles 110°, 80° and 80°. Find the fourth angle (degrees).", latex: "360-110-80-80", answer: "90", acceptedAnswers: [], hint: "Sum to 360°.", explanation: "360 − 270 = 90°." },
  { id: "chal-y7-aiq-8", prompt: "The four angles of a quadrilateral are x, 2x, 3x and 4x. Find the smallest (degrees).", latex: "10x=360", answer: "36", acceptedAnswers: [], hint: "10x = 360.", explanation: "x = 36°." },
  { id: "chal-y7-aiq-9", prompt: "A rhombus has one angle of 72°. Find the largest angle (degrees).", latex: "180-72", answer: "108", acceptedAnswers: [], hint: "Adjacent angles are supplementary.", explanation: "180 − 72 = 108°." },
  { id: "chal-y7-aiq-10", prompt: "Three angles of a quadrilateral sum to 250°. Find the fourth (degrees).", latex: "360-250", answer: "110", acceptedAnswers: [], hint: "Total is 360°.", explanation: "360 − 250 = 110°." },
  { id: "chal-y7-aiq-11", prompt: "A quadrilateral has angles 3x, 3x, 2x and 2x. Find x (degrees).", latex: "10x=360", answer: "36", acceptedAnswers: [], hint: "10x = 360.", explanation: "x = 36°." },
  { id: "chal-y7-aiq-12", prompt: "In a trapezium, two co-interior angles are 3x and x. Find x (degrees).", latex: "3x+x=180", answer: "45", acceptedAnswers: [], hint: "Co-interior angles sum to 180°.", explanation: "4x = 180 → x = 45°." },
];

// ── Angles: parallel lines and transversals ───────────────────────────────────────────────────
export const parallelLinesTransversalsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-plt-1", prompt: "Two parallel lines are cut by a transversal. One angle is 70°. Find its co-interior angle (degrees).", latex: "180-70", answer: "110", acceptedAnswers: [], hint: "Co-interior angles sum to 180°.", explanation: "180 − 70 = 110°." },
  { id: "chal-y7-plt-2", prompt: "Corresponding angles on parallel lines: one is 125°. Find the other (degrees).", latex: "x=125", answer: "125", acceptedAnswers: [], hint: "Corresponding angles are equal.", explanation: "Equal → 125°." },
  { id: "chal-y7-plt-3", prompt: "Alternate angles on parallel lines are 4x and 60°. Find x.", latex: "4x=60", answer: "15", acceptedAnswers: [], hint: "Alternate angles are equal.", explanation: "4x = 60 → x = 15." },
  { id: "chal-y7-plt-4", prompt: "Co-interior angles are x and 2x. Find x (degrees).", latex: "x+2x=180", answer: "60", acceptedAnswers: [], hint: "They sum to 180°.", explanation: "3x = 180 → x = 60°." },
  { id: "chal-y7-plt-5", prompt: "A transversal makes a 50° angle. Find the co-interior angle on the same side (degrees).", latex: "180-50", answer: "130", acceptedAnswers: [], hint: "Co-interior sum to 180°.", explanation: "180 − 50 = 130°." },
  { id: "chal-y7-plt-6", prompt: "Two angles are alternate and given as 2x + 10 and 80. Find x.", latex: "2x+10=80", answer: "35", acceptedAnswers: [], hint: "Alternate angles equal.", explanation: "2x + 10 = 80 → x = 35." },
  { id: "chal-y7-plt-7", prompt: "Corresponding angles are 3x and x + 50. Find x.", latex: "3x=x+50", answer: "25", acceptedAnswers: [], hint: "Set them equal.", explanation: "3x = x + 50 → 2x = 50 → x = 25." },
  { id: "chal-y7-plt-8", prompt: "A co-interior angle is 5 times the other. Find the smaller (degrees).", latex: "x+5x=180", answer: "30", acceptedAnswers: [], hint: "6x = 180.", explanation: "x = 30°." },
  { id: "chal-y7-plt-9", prompt: "Alternate angles are 7x and 4x + 33. Find x.", latex: "7x=4x+33", answer: "11", acceptedAnswers: [], hint: "Equal → solve.", explanation: "3x = 33 → x = 11." },
  { id: "chal-y7-plt-10", prompt: "A transversal crosses parallel lines; a co-interior pair is 2x + 20 and 3x. Find x (degrees).", latex: "2x+20+3x=180", answer: "32", acceptedAnswers: [], hint: "Sum to 180°.", explanation: "5x + 20 = 180 → 5x = 160 → x = 32°." },
  { id: "chal-y7-plt-11", prompt: "Corresponding angles are equal; one is 4x − 8 and the other 100. Find x.", latex: "4x-8=100", answer: "27", acceptedAnswers: [], hint: "4x − 8 = 100.", explanation: "4x = 108 → x = 27." },
  { id: "chal-y7-plt-12", prompt: "Two angles are co-interior and equal. Find each (degrees).", latex: "2x=180", answer: "90", acceptedAnswers: [], hint: "Equal and sum to 180°.", explanation: "Each = 90°." },
];

// ── Angles: problem solving ───────────────────────────────────────────────────────────────────
export const angleRelationshipsProblemSolvingChallenge: PracticeQuestion[] = [
  { id: "chal-y7-arp-1", prompt: "A clock shows 3:00. Find the angle between the hands (degrees).", latex: "3\\times30", answer: "90", acceptedAnswers: [], hint: "Each hour mark is 30°.", explanation: "3 × 30 = 90°." },
  { id: "chal-y7-arp-2", prompt: "A clock shows 4:00. Find the smaller angle between the hands (degrees).", latex: "4\\times30", answer: "120", acceptedAnswers: [], hint: "4 hour marks.", explanation: "4 × 30 = 120°." },
  { id: "chal-y7-arp-3", prompt: "An angle is bisected into two parts of (2x) and (x + 25). Find x.", latex: "2x=x+25", answer: "25", acceptedAnswers: [], hint: "A bisector makes equal halves.", explanation: "2x = x + 25 → x = 25." },
  { id: "chal-y7-arp-4", prompt: "The reflex angle for a 110° angle is what (degrees)?", latex: "360-110", answer: "250", acceptedAnswers: [], hint: "Reflex = 360 − angle.", explanation: "360 − 110 = 250°." },
  { id: "chal-y7-arp-5", prompt: "Two angles are supplementary and in the ratio 4:5. Find the smaller (degrees).", latex: "4k+5k=180", answer: "80", acceptedAnswers: [], hint: "9 parts make 180°.", explanation: "Each part 20°; smaller = 4×20 = 80°." },
  { id: "chal-y7-arp-6", prompt: "At 6:00 the clock hands point opposite ways. Find the angle between them (degrees).", latex: "6\\times30", answer: "180", acceptedAnswers: [], hint: "6 hour marks.", explanation: "6 × 30 = 180°." },
  { id: "chal-y7-arp-7", prompt: "An angle and its complement are in the ratio 1:5. Find the larger (degrees).", latex: "k+5k=90", answer: "75", acceptedAnswers: [], hint: "6 parts make 90°.", explanation: "Each part 15°; larger = 5×15 = 75°." },
  { id: "chal-y7-arp-8", prompt: "Three angles on a straight line are equal. Find each (degrees).", latex: "3x=180", answer: "60", acceptedAnswers: [], hint: "Sum to 180°.", explanation: "Each = 60°." },
  { id: "chal-y7-arp-9", prompt: "A turn of 3 right angles is how many degrees?", latex: "3\\times90", answer: "270", acceptedAnswers: [], hint: "Each right angle 90°.", explanation: "3 × 90 = 270°." },
  { id: "chal-y7-arp-10", prompt: "An angle is 30° less than twice its supplement. Find the angle (degrees).", latex: "a=2(180-a)-30", answer: "110", acceptedAnswers: [], hint: "a = 2(180 − a) − 30.", explanation: "a = 330 − 2a → 3a = 330 → a = 110°." },
  { id: "chal-y7-arp-11", prompt: "The angle between the hands of a clock at 2:00 is what (degrees)?", latex: "2\\times30", answer: "60", acceptedAnswers: [], hint: "2 hour marks.", explanation: "2 × 30 = 60°." },
  { id: "chal-y7-arp-12", prompt: "Two angles at a point are 4x, 5x and a right angle. Find x (degrees).", latex: "4x+5x+90=360", answer: "30", acceptedAnswers: [], hint: "Sum to 360°.", explanation: "9x = 270 → x = 30°." },
];

// ── Ratios and rates: introduction to ratios ──────────────────────────────────────────────────
export const introductionToRatiosChallenge: PracticeQuestion[] = [
  { id: "chal-y7-itr-1", prompt: "Simplify the ratio 18:24. Give it as a:b with a the first number.", latex: "18:24", answer: "3:4", acceptedAnswers: [], hint: "Divide by the HCF 6.", explanation: "18:24 = 3:4." },
  { id: "chal-y7-itr-2", prompt: "Simplify the ratio 45:30.", latex: "45:30", answer: "3:2", acceptedAnswers: [], hint: "Divide by 15.", explanation: "45:30 = 3:2." },
  { id: "chal-y7-itr-3", prompt: "In the ratio 5:n equivalent to 20:28, find n.", latex: "5:n=20:28", answer: "7", acceptedAnswers: [], hint: "20 = 5 × 4.", explanation: "n = 28/4 = 7." },
  { id: "chal-y7-itr-4", prompt: "Express 40 cm to 1 m as a simplified ratio a:b.", latex: "40:100", answer: "2:5", acceptedAnswers: [], hint: "1 m = 100 cm.", explanation: "40:100 = 2:5." },
  { id: "chal-y7-itr-5", prompt: "Simplify the ratio 0.5:2.", latex: "0.5:2", answer: "1:4", acceptedAnswers: [], hint: "Multiply both by 2.", explanation: "0.5:2 = 1:4." },
  { id: "chal-y7-itr-6", prompt: "A ratio 3:5 has a total of 64. Find the value of one part.", latex: "8\\text{ parts}=64", answer: "8", acceptedAnswers: [], hint: "3 + 5 = 8 parts.", explanation: "64/8 = 8 per part." },
  { id: "chal-y7-itr-7", prompt: "Simplify the ratio 2.4:1.6.", latex: "2.4:1.6", answer: "3:2", acceptedAnswers: [], hint: "×10 then simplify.", explanation: "24:16 = 3:2." },
  { id: "chal-y7-itr-8", prompt: "Express 45 minutes to 1 hour as a simplified ratio a:b.", latex: "45:60", answer: "3:4", acceptedAnswers: [], hint: "1 hour = 60 min.", explanation: "45:60 = 3:4." },
  { id: "chal-y7-itr-9", prompt: "In the ratio 7:4, if the first quantity is 35, find the second.", latex: "7:4", answer: "20", acceptedAnswers: [], hint: "35 = 7 × 5.", explanation: "Second = 4 × 5 = 20." },
  { id: "chal-y7-itr-10", prompt: "Simplify the three-term ratio 12:18:30.", latex: "12:18:30", answer: "2:3:5", acceptedAnswers: [], hint: "Divide all by 6.", explanation: "2:3:5." },
  { id: "chal-y7-itr-11", prompt: "A ratio a:b = 2:3 and a = 14. Find b.", latex: "2:3", answer: "21", acceptedAnswers: [], hint: "14 = 2 × 7.", explanation: "b = 3 × 7 = 21." },
  { id: "chal-y7-itr-12", prompt: "Express the ratio 1/2 : 1/3 in whole numbers a:b.", latex: "\\tfrac12:\\tfrac13", answer: "3:2", acceptedAnswers: [], hint: "Multiply both by 6.", explanation: "3:2." },
];

// ── Ratios and rates: dividing quantities in a ratio ──────────────────────────────────────────
export const dividingQuantitiesInRatioChallenge: PracticeQuestion[] = [
  { id: "chal-y7-dqr-1", prompt: "Divide $80 in the ratio 3:5. Find the larger share ($).", latex: "3:5\\text{ of }80", answer: "50", acceptedAnswers: [], hint: "8 parts; larger = 5 parts.", explanation: "Each part $10; 5 × 10 = $50." },
  { id: "chal-y7-dqr-2", prompt: "Divide 120 in the ratio 1:2:3. Find the largest share.", latex: "1:2:3", answer: "60", acceptedAnswers: [], hint: "6 parts; largest = 3.", explanation: "Each part 20; 3 × 20 = 60." },
  { id: "chal-y7-dqr-3", prompt: "Divide $150 in the ratio 2:3. Find the smaller share ($).", latex: "2:3\\text{ of }150", answer: "60", acceptedAnswers: [], hint: "5 parts; smaller = 2.", explanation: "Each part $30; 2 × 30 = $60." },
  { id: "chal-y7-dqr-4", prompt: "Two people share $200 in the ratio 7:3. Find the difference in their shares ($).", latex: "(7-3)\\text{ parts}", answer: "80", acceptedAnswers: [], hint: "Difference = 4 parts.", explanation: "Each part $20; 4 × 20 = $80." },
  { id: "chal-y7-dqr-5", prompt: "Divide 360° in the ratio 2:3:4. Find the largest angle (degrees).", latex: "2:3:4\\text{ of }360", answer: "160", acceptedAnswers: [], hint: "9 parts; largest = 4.", explanation: "Each part 40°; 4 × 40 = 160°." },
  { id: "chal-y7-dqr-6", prompt: "A 56 cm rod is cut in the ratio 3:4. Find the longer piece (cm).", latex: "3:4\\text{ of }56", answer: "32", acceptedAnswers: [], hint: "7 parts; longer = 4.", explanation: "Each part 8 cm; 4 × 8 = 32 cm." },
  { id: "chal-y7-dqr-7", prompt: "Sweets are shared 5:7. The smaller share is 30. Find the total.", latex: "5\\text{ parts}=30", answer: "72", acceptedAnswers: [], hint: "Each part = 6; total = 12 parts.", explanation: "12 × 6 = 72." },
  { id: "chal-y7-dqr-8", prompt: "Divide $90 in the ratio 4:5. Find the larger share ($).", latex: "4:5\\text{ of }90", answer: "50", acceptedAnswers: [], hint: "9 parts; larger = 5.", explanation: "Each part $10; 5 × 10 = $50." },
  { id: "chal-y7-dqr-9", prompt: "A profit is split 2:3:5. The total is $1000. Find the middle share ($).", latex: "2:3:5\\text{ of }1000", answer: "300", acceptedAnswers: [], hint: "10 parts; middle = 3.", explanation: "Each part $100; 3 × 100 = $300." },
  { id: "chal-y7-dqr-10", prompt: "Two numbers are in the ratio 5:8 and the larger is 96. Find the smaller.", latex: "5:8,\\ \\text{larger}=96", answer: "60", acceptedAnswers: [], hint: "8 parts = 96.", explanation: "Each part 12; smaller = 5 × 12 = 60." },
  { id: "chal-y7-dqr-11", prompt: "A 1.2 kg mix is in the ratio 1:3 (sand:cement). Find the cement (grams).", latex: "1:3\\text{ of }1200", answer: "900", acceptedAnswers: [], hint: "4 parts; cement = 3.", explanation: "1.2 kg = 1200 g; each part 300 g; 3 × 300 = 900 g." },
  { id: "chal-y7-dqr-12", prompt: "Divide 84 in the ratio 3:4:5. Find the smallest share.", latex: "3:4:5\\text{ of }84", answer: "21", acceptedAnswers: [], hint: "12 parts; smallest = 3.", explanation: "Each part 7; 3 × 7 = 21." },
];

// ── Ratios and rates: rates and unit rates ────────────────────────────────────────────────────
export const ratesUnitRatesChallenge: PracticeQuestion[] = [
  { id: "chal-y7-rur-1", prompt: "5 kg of apples cost $12. Find the cost of 8 kg ($).", latex: "\\tfrac{12}{5}\\times8", answer: "19.2", acceptedAnswers: [], hint: "Find the cost per kg first.", explanation: "$2.40/kg × 8 = $19.20." },
  { id: "chal-y7-rur-2", prompt: "A car travels 240 km in 3 hours. Find its speed (km/h).", latex: "240/3", answer: "80", acceptedAnswers: [], hint: "Distance ÷ time.", explanation: "80 km/h." },
  { id: "chal-y7-rur-3", prompt: "A printer prints 90 pages in 6 minutes. Find the rate (pages/min).", latex: "90/6", answer: "15", acceptedAnswers: [], hint: "Pages ÷ minutes.", explanation: "15 pages/min." },
  { id: "chal-y7-rur-4", prompt: "12 identical pens cost $9. Find the cost of 20 pens ($).", latex: "\\tfrac{9}{12}\\times20", answer: "15", acceptedAnswers: [], hint: "Cost per pen first.", explanation: "$0.75 × 20 = $15." },
  { id: "chal-y7-rur-5", prompt: "A tap fills 45 L in 5 minutes. How long to fill 81 L (minutes)?", latex: "81\\div(45/5)", answer: "9", acceptedAnswers: [], hint: "Rate is 9 L/min.", explanation: "81 / 9 = 9 minutes." },
  { id: "chal-y7-rur-6", prompt: "A recipe uses 200 g flour for 8 muffins. How much for 20 muffins (grams)?", latex: "\\tfrac{200}{8}\\times20", answer: "500", acceptedAnswers: [], hint: "Per muffin first.", explanation: "25 g × 20 = 500 g." },
  { id: "chal-y7-rur-7", prompt: "A worker earns $76 for 8 hours. Find the hourly rate ($).", latex: "76/8", answer: "9.5", acceptedAnswers: [], hint: "Pay ÷ hours.", explanation: "$9.50/h." },
  { id: "chal-y7-rur-8", prompt: "Petrol costs $1.80/L. Find the cost of 35 L ($).", latex: "1.8\\times35", answer: "63", acceptedAnswers: [], hint: "Rate × litres.", explanation: "$63." },
  { id: "chal-y7-rur-9", prompt: "A machine makes 360 parts in 8 hours. How many in 5 hours?", latex: "\\tfrac{360}{8}\\times5", answer: "225", acceptedAnswers: [], hint: "Per hour first.", explanation: "45/h × 5 = 225." },
  { id: "chal-y7-rur-10", prompt: "Which is cheaper per litre: 2 L for $3.00 or 5 L for $7.00? Give the cheaper unit price ($/L).", latex: "\\min(3/2,7/5)", answer: "1.4", acceptedAnswers: [], hint: "Compare $1.50/L vs $1.40/L.", explanation: "7/5 = $1.40/L is cheaper." },
  { id: "chal-y7-rur-11", prompt: "A heart beats 72 times per minute. How many beats in 5 minutes?", latex: "72\\times5", answer: "360", acceptedAnswers: [], hint: "Rate × time.", explanation: "360 beats." },
  { id: "chal-y7-rur-12", prompt: "6 m of ribbon costs $4.20. Find the cost of 10 m ($).", latex: "\\tfrac{4.2}{6}\\times10", answer: "7", acceptedAnswers: [], hint: "Per metre first.", explanation: "$0.70 × 10 = $7." },
];

// ── Ratios and rates: speed, distance, time ───────────────────────────────────────────────────
export const speedDistanceTimeChallenge: PracticeQuestion[] = [
  { id: "chal-y7-sdt-1", prompt: "A car travels at 60 km/h for 2.5 hours. Find the distance (km).", latex: "60\\times2.5", answer: "150", acceptedAnswers: [], hint: "Distance = speed × time.", explanation: "60 × 2.5 = 150 km." },
  { id: "chal-y7-sdt-2", prompt: "A runner covers 100 m in 12.5 s. Find the speed (m/s).", latex: "100/12.5", answer: "8", acceptedAnswers: [], hint: "Distance ÷ time.", explanation: "8 m/s." },
  { id: "chal-y7-sdt-3", prompt: "A train travels 330 km at 110 km/h. Find the time (hours).", latex: "330/110", answer: "3", acceptedAnswers: [], hint: "Time = distance ÷ speed.", explanation: "3 hours." },
  { id: "chal-y7-sdt-4", prompt: "A cyclist rides 45 km in 1.5 hours. Find the average speed (km/h).", latex: "45/1.5", answer: "30", acceptedAnswers: [], hint: "Distance ÷ time.", explanation: "30 km/h." },
  { id: "chal-y7-sdt-5", prompt: "Travelling at 80 km/h, how far in 45 minutes (km)?", latex: "80\\times0.75", answer: "60", acceptedAnswers: [], hint: "45 min = 0.75 h.", explanation: "80 × 0.75 = 60 km." },
  { id: "chal-y7-sdt-6", prompt: "A plane flies 1200 km in 1 h 30 min. Find the speed (km/h).", latex: "1200/1.5", answer: "800", acceptedAnswers: [], hint: "1.5 hours.", explanation: "1200 / 1.5 = 800 km/h." },
  { id: "chal-y7-sdt-7", prompt: "Walking at 5 km/h, how long to walk 12.5 km (hours)?", latex: "12.5/5", answer: "2.5", acceptedAnswers: [], hint: "Time = distance ÷ speed.", explanation: "2.5 hours." },
  { id: "chal-y7-sdt-8", prompt: "A car covers 90 km in 1 hour 12 minutes. Find the speed (km/h).", latex: "90/1.2", answer: "75", acceptedAnswers: [], hint: "1 h 12 min = 1.2 h.", explanation: "90 / 1.2 = 75 km/h." },
  { id: "chal-y7-sdt-9", prompt: "How far does a 25 m/s object travel in 8 seconds (m)?", latex: "25\\times8", answer: "200", acceptedAnswers: [], hint: "Speed × time.", explanation: "200 m." },
  { id: "chal-y7-sdt-10", prompt: "A 150 km trip takes 2 hours. Find the speed needed to do it in 1.5 hours (km/h).", latex: "150/1.5", answer: "100", acceptedAnswers: [], hint: "Distance ÷ new time.", explanation: "150 / 1.5 = 100 km/h." },
  { id: "chal-y7-sdt-11", prompt: "Convert 72 km/h to m/s.", latex: "72\\times\\tfrac{1000}{3600}", answer: "20", acceptedAnswers: [], hint: "÷ 3.6.", explanation: "72 / 3.6 = 20 m/s." },
  { id: "chal-y7-sdt-12", prompt: "Two towns are 240 km apart. A bus averages 60 km/h but stops for 1 hour. Find the total trip time (hours).", latex: "240/60+1", answer: "5", acceptedAnswers: [], hint: "Driving time + stop.", explanation: "4 + 1 = 5 hours." },
];

// ── Ratios and rates: scale drawings ──────────────────────────────────────────────────────────
export const scaleDrawingsChallenge: PracticeQuestion[] = [
  { id: "chal-y7-scd-1", prompt: "A map scale is 1:1000. A road is 5 cm on the map. Find its real length (m).", latex: "5\\times1000", answer: "50", acceptedAnswers: [], hint: "5000 cm = 50 m.", explanation: "5 × 1000 = 5000 cm = 50 m." },
  { id: "chal-y7-scd-2", prompt: "A scale is 1:50. A real wall is 6 m. Find its drawing length (cm).", latex: "600/50", answer: "12", acceptedAnswers: [], hint: "6 m = 600 cm.", explanation: "600 / 50 = 12 cm." },
  { id: "chal-y7-scd-3", prompt: "A model is built at scale 1:25. The model is 8 cm tall. Find the real height (cm).", latex: "8\\times25", answer: "200", acceptedAnswers: [], hint: "× 25.", explanation: "8 × 25 = 200 cm." },
  { id: "chal-y7-scd-4", prompt: "A map scale is 1:100000. Two towns are 7 cm apart on the map. Find the real distance (km).", latex: "7\\times100000", answer: "7", acceptedAnswers: [], hint: "700000 cm = 7 km.", explanation: "7 × 100000 cm = 700000 cm = 7 km." },
  { id: "chal-y7-scd-5", prompt: "A plan uses 1:20. A drawing measures 15 cm. Find the real length (cm).", latex: "15\\times20", answer: "300", acceptedAnswers: [], hint: "× 20.", explanation: "15 × 20 = 300 cm." },
  { id: "chal-y7-scd-6", prompt: "A scale is 1:200. A real distance is 50 m. Find the drawing length (cm).", latex: "5000/200", answer: "25", acceptedAnswers: [], hint: "50 m = 5000 cm.", explanation: "5000 / 200 = 25 cm." },
  { id: "chal-y7-scd-7", prompt: "A model car is 1:18. The real car is 4.5 m. Find the model length (cm).", latex: "450/18", answer: "25", acceptedAnswers: [], hint: "4.5 m = 450 cm.", explanation: "450 / 18 = 25 cm." },
  { id: "chal-y7-scd-8", prompt: "On a 1:500 plan, a garden is 4 cm long. Find the real length (m).", latex: "4\\times500", answer: "20", acceptedAnswers: [], hint: "2000 cm = 20 m.", explanation: "4 × 500 = 2000 cm = 20 m." },
  { id: "chal-y7-scd-9", prompt: "A drawing scale is 2 cm represents 5 m. Find the real length of a 9 cm line (m).", latex: "\\tfrac{5}{2}\\times9", answer: "22.5", acceptedAnswers: [], hint: "2 cm → 5 m.", explanation: "2.5 m per cm × 9 = 22.5 m." },
  { id: "chal-y7-scd-10", prompt: "A map is 1:25000. A trail is 12 cm. Find the real length (km).", latex: "12\\times25000", answer: "3", acceptedAnswers: [], hint: "300000 cm = 3 km.", explanation: "12 × 25000 = 300000 cm = 3 km." },
  { id: "chal-y7-scd-11", prompt: "A 1:40 plan shows a room 30 cm wide. Find the real width (m).", latex: "30\\times40", answer: "12", acceptedAnswers: [], hint: "1200 cm = 12 m.", explanation: "30 × 40 = 1200 cm = 12 m." },
  { id: "chal-y7-scd-12", prompt: "If 3 cm represents 15 km, find the scale as 1:n (give n).", latex: "\\tfrac{15\\text{ km}}{3\\text{ cm}}", answer: "500000", acceptedAnswers: [], hint: "15 km = 1500000 cm; ÷ 3.", explanation: "1500000 / 3 = 500000, so 1:500000." },
];
