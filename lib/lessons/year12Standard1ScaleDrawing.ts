// Year 12 Standard 1 — Unit 7 "Scale Drawing" — Wave 8 authored sections.
//
//   7A Ratios                       (scale-ratios)
//   7B Dividing a Quantity in a Ratio (scale-dividing-ratio)
//   7C Similarity and Scale Factors (similarity-scale-factors)
//   7E Plans and Elevations         (plans-and-elevations)
//
// 7D (scale-drawings-and-plans) keeps its existing override. Same pattern as Waves 1–7:
// Feynman teaching, 4/5/10 with EXACTLY 1/1/3 MCQs per section, authored cognitive-demand
// difficulty, markable answers. IDs unprefixed; `y12s1-` auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";
import type { TriangleDiagram } from "./types";

const UNIT = "scale-drawing";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  hint: string,
  explanation: string,
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    acceptedAnswers: [],
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

// Two similar right triangles can be suggested with one labelled triangle (right angle at A).
const tri = (
  description: string,
  sideLabels: TriangleDiagram["sideLabels"]
): TriangleDiagram => ({
  description,
  vertices: { A: { x: 80, y: 240 }, B: { x: 340, y: 240 }, C: { x: 80, y: 60 } },
  sideLabels,
  rightAngleAt: "A",
});

// ── 7A Ratios ────────────────────────────────────────────────────────────────────────
export function year12Standard1ScaleRatiosLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "scale-ratios") {
    return null;
  }
  return {
    description:
      "Understand a ratio as a comparison of quantities: simplify ratios, find equivalent ratios, and tell part-to-part from part-to-whole.",
    learningIntention:
      "Simplify and compare ratios, find equivalent ratios, and distinguish part-to-part from part-to-whole.",
    successCriteria: [
      "Read a ratio a : b as a comparison where order matters.",
      "Simplify a ratio by dividing by the highest common factor.",
      "Find a missing term in equivalent ratios.",
      "Distinguish part-to-part ratios from part-to-whole fractions.",
    ],
    teaching: {
      paragraphs: [
        "A ratio is a way of COMPARING quantities of the same kind — how much of one thing there is against another. Writing boys : girls = 2 : 3 says that for every 2 boys there are 3 girls. The order matters: 2 : 3 is not the same as 3 : 2, just as '2 boys to 3 girls' is different from '3 boys to 2 girls'.",
        "A ratio is NOT just a single fraction. 2 : 3 does not mean '2 out of 3' — it compares two PARTS, and there are 5 parts in total. This is the part-to-part versus part-to-whole trap: the fraction of the group that is boys is 2 out of (2 + 3) = 2/5, not 2/3. Add the parts to get the whole.",
        "Ratios simplify just like fractions — divide every term by a common factor. 12 : 18 both divide by 6 to give 2 : 3. Keep going until the terms share no common factor. Equivalent ratios are the same comparison scaled up or down: 2 : 3 = 4 : 6 = 8 : 12, all describing the same relationship.",
        "To find a missing term, work out the scale between the ratios. If 2 : 3 = ? : 12, the second term went from 3 to 12 (× 4), so the first goes 2 × 4 = 8, giving 8 : 12. Whatever you multiply one part by, you multiply the other by the same amount.",
      ],
      latexBlocks: [
        "a : b \\text{ compares two parts (order matters)}",
        "\\text{simplify by dividing each term by a common factor: } 12 : 18 = 2 : 3",
        "\\text{fraction of the whole} = \\frac{\\text{part}}{\\text{sum of parts}}",
      ],
    },
    workedExamples: [
      {
        title: "Simplify a ratio",
        questionLatex: "\\text{Simplify } 12 : 18.",
        steps: [
          { explanation: "Divide both terms by the HCF, 6.", latex: "12 \\div 6 : 18 \\div 6" },
          { explanation: "Write the simplified ratio.", latex: "= 2 : 3" },
        ],
        finalAnswerLatex: "2 : 3",
      },
      {
        title: "Fraction of the whole",
        questionLatex: "\\text{In the ratio boys : girls} = 2 : 3,\\ \\text{what fraction are boys?}",
        steps: [
          { explanation: "Total parts = 2 + 3.", latex: "5 \\text{ parts}" },
          { explanation: "Boys are 2 of the 5 parts.", latex: "\\frac{2}{5}" },
        ],
        finalAnswerLatex: "\\frac{2}{5}",
      },
    ],
    guidedPractice: [
      mcq("rat-g1", "A ratio is used to:", "B",
        ["measure a single quantity", "compare two or more quantities of the same kind", "add two quantities", "find an average"], 1,
        "Ratios are about comparison.",
        "A ratio compares two or more quantities of the same kind (e.g. boys to girls)."),
      ans("rat-g2", "Simplify the ratio 12 : 18.", "12 : 18", "2:3", 2,
        "Divide both terms by their HCF.", "12 and 18 both divide by 6: 12 : 18 = 2 : 3.",
        ["2 : 3"]),
      ans("rat-g3", "Simplify the ratio 10 : 15.", "10 : 15", "2:3", 2,
        "Divide both terms by 5.", "10 : 15 = 2 : 3 (dividing by 5).",
        ["2 : 3"]),
      ans("rat-g4", "Find the missing term: 2 : 3 = ? : 12.", "2 : 3 = \\,? : 12", "8", 2,
        "The second term ×4, so the first ×4.", "3 → 12 is × 4, so 2 × 4 = 8, giving 8 : 12."),
    ],
    independentPractice: [
      ans("rat-i1", "Simplify the ratio 20 : 30 : 50.", "20 : 30 : 50", "2:3:5", 2,
        "Divide all terms by 10.", "20 : 30 : 50 = 2 : 3 : 5 (dividing by 10).",
        ["2 : 3 : 5"]),
      mcq("rat-i2", "In a class the ratio boys : girls is 2 : 3. What fraction of the class are boys?", "C",
        ["2/3", "3/5", "2/5", "3/2"], 3,
        "Add the parts to find the whole.",
        "Total parts = 2 + 3 = 5, and boys are 2 parts, so 2/5. (2/3 is the part-to-part value, not part-to-whole.)"),
      ans("rat-i3", "Find the missing term: 3 : 5 = 9 : ?.", "3 : 5 = 9 : \\,?", "15", 3,
        "The first term ×3, so the second ×3.", "3 → 9 is × 3, so 5 × 3 = 15, giving 9 : 15."),
      ans("rat-i4", "Simplify the ratio 8 : 12.", "8 : 12", "2:3", 2,
        "Divide both terms by 4.", "8 : 12 = 2 : 3 (dividing by 4).",
        ["2 : 3"]),
      ans("rat-i5", "A class has 12 boys and 18 girls. Write the ratio of boys to girls in simplest form.", "12 : 18", "2:3", 3,
        "Form the ratio, then simplify.", "boys : girls = 12 : 18 = 2 : 3.",
        ["2 : 3"]),
    ],
    masteryQuiz: [
      ans("rat-m1", "Simplify the ratio 16 : 24.", "16 : 24", "2:3", 2,
        "Divide both terms by 8.", "16 : 24 = 2 : 3 (dividing by 8).",
        ["2 : 3"]),
      mcq("rat-m2", "A quantity is shared in the ratio 2 : 3. How many equal parts is it split into?", "C",
        ["2", "3", "5", "6"], 3,
        "Add the terms of the ratio.",
        "The total number of parts is 2 + 3 = 5."),
      ans("rat-m3", "Find the missing term: 4 : 7 = ? : 21.", "4 : 7 = \\,? : 21", "12", 3,
        "The second term ×3.", "7 → 21 is × 3, so 4 × 3 = 12, giving 12 : 21."),
      ans("rat-m4", "Simplify the ratio 25 : 100.", "25 : 100", "1:4", 3,
        "Divide both terms by 25.", "25 : 100 = 1 : 4 (dividing by 25).",
        ["1 : 4"]),
      mcq("rat-m5", "Why is the ratio 2 : 3 not the same as the fraction 2/3?", "B",
        ["because 2/3 is larger", "because a ratio compares two parts, while 2/3 is a part out of a whole of 3", "because ratios cannot be simplified", "because they are exactly the same"], 3,
        "Part-to-part vs part-to-whole.",
        "A ratio 2 : 3 compares two parts (whole = 5 parts); the fraction 2/3 means 2 out of a whole of 3. They describe different things."),
      ans("rat-m6", "Simplify the ratio 6 : 9 : 15.", "6 : 9 : 15", "2:3:5", 3,
        "Divide all terms by 3.", "6 : 9 : 15 = 2 : 3 : 5 (dividing by 3).",
        ["2 : 3 : 5"]),
      ans("rat-m7", "Find the missing term: 5 : 2 = 35 : ?.", "5 : 2 = 35 : \\,?", "14", 3,
        "The first term ×7.", "5 → 35 is × 7, so 2 × 7 = 14, giving 35 : 14."),
      mcq("rat-m8", "The ratio 3 : 4 and the ratio 4 : 3 are:", "B",
        ["the same ratio", "different, because order matters", "both equal to 1", "impossible to compare"], 3,
        "Order changes the comparison.",
        "Order matters in a ratio: 3 : 4 (3 of the first to 4 of the second) is different from 4 : 3."),
      ans("rat-m9", "Two quantities are in the ratio 1 : 4. What fraction of the total is the first quantity?", "\\frac{1}{1+4}", "1/5", 4,
        "Fraction = part ÷ sum of parts.", "Total parts = 1 + 4 = 5, so the first quantity is 1/5 of the total.",
        ["one fifth"]),
      ans("rat-m10", "Simplify the ratio 0.5 : 1.5.", "0.5 : 1.5", "1:3", 4,
        "Multiply both terms to clear decimals, then simplify.", "0.5 : 1.5 = 1 : 3 (×2 gives 1 : 3).",
        ["1 : 3"]),
    ],
    commonMistakes: [
      { mistake: "Reading 2 : 3 as the fraction 2/3.", fix: "A ratio compares parts; the fraction of the whole is part ÷ (sum of parts) = 2/5." },
      { mistake: "Ignoring the order of a ratio.", fix: "a : b is different from b : a — keep the quantities in the stated order." },
      { mistake: "Only partly simplifying.", fix: "Divide by the highest common factor until no common factor remains." },
      { mistake: "Scaling only one term to find a missing value.", fix: "Multiply both terms by the same number for an equivalent ratio." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 7B Dividing a Quantity in a Ratio ────────────────────────────────────────────────
export function year12Standard1ScaleDividingRatioLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "scale-dividing-ratio") {
    return null;
  }
  return {
    description:
      "Divide a quantity in a given ratio by finding the value of one part and sharing out the total.",
    learningIntention:
      "Share a total in a given ratio by finding the value of one part and multiplying out each share.",
    successCriteria: [
      "Add the terms of a ratio to find the total number of parts.",
      "Find the value of one part by dividing the total.",
      "Find each share by multiplying the part value by each term.",
      "Check that the shares add back to the original total.",
    ],
    teaching: {
      paragraphs: [
        "Sharing something in a ratio means splitting it into the right number of equal PARTS, then handing out the parts. The key first move is to add the ratio terms to see how many parts there are altogether. Splitting $60 in the ratio 2 : 3 means there are 2 + 3 = 5 parts in total.",
        "Next find what ONE part is worth by dividing the total by the number of parts. Here $60 ÷ 5 = $12 per part. Every share is then a whole number of those parts: the 2-part share is 2 × $12 = $24, and the 3-part share is 3 × $12 = $36.",
        "Always finish by CHECKING: the shares should add back to the total. $24 + $36 = $60 — correct. This catch-all check protects you from dividing by the wrong number of parts, which is the most common slip.",
        "The same recipe works for money, lengths, masses or anything else, and for ratios with three or more terms: add the parts, find one part, multiply out. Read carefully which share is wanted — the question may ask for the larger, the smaller, or a specific person's amount.",
      ],
      latexBlocks: [
        "\\text{total parts} = \\text{sum of the ratio terms}",
        "\\text{one part} = \\frac{\\text{total quantity}}{\\text{total parts}}",
        "\\text{each share} = (\\text{one part}) \\times (\\text{its ratio term})",
      ],
    },
    workedExamples: [
      {
        title: "Divide money in a ratio",
        questionLatex: "\\text{Divide \\$60 in the ratio } 2 : 3.",
        steps: [
          { explanation: "Total parts = 2 + 3 = 5; one part = 60 ÷ 5.", latex: "\\text{one part} = \\$12" },
          { explanation: "Shares are 2 and 3 parts.", latex: "2 \\times 12 = \\$24,\\ 3 \\times 12 = \\$36" },
        ],
        finalAnswerLatex: "\\$24 \\text{ and } \\$36",
      },
      {
        title: "A three-term ratio",
        questionLatex: "\\text{Divide \\$120 in the ratio } 1 : 2 : 3.\\ \\text{Find the largest share.}",
        steps: [
          { explanation: "Total parts = 1 + 2 + 3 = 6; one part = 120 ÷ 6.", latex: "\\text{one part} = \\$20" },
          { explanation: "Largest share is 3 parts.", latex: "3 \\times 20 = \\$60" },
        ],
        finalAnswerLatex: "\\$60",
      },
    ],
    guidedPractice: [
      mcq("divrat-g1", "To divide a quantity in a ratio, the first step is to:", "B",
        ["multiply the terms together", "add the terms to find the total number of parts", "subtract the terms", "divide the terms"], 1,
        "You need the total number of parts.",
        "First add the ratio terms to find the total number of equal parts."),
      ans("divrat-g2", "Divide $60 in the ratio 2 : 3. Find the larger share.", "60 \\div (2+3)", "36", 2,
        "One part = 60 ÷ 5 = 12; larger = 3 parts.", "Total parts = 5, one part = $12; larger share = 3 × 12 = $36.",
        ["$36"]),
      ans("divrat-g3", "Divide $60 in the ratio 2 : 3. Find the smaller share.", "60 \\div (2+3)", "24", 2,
        "One part = $12; smaller = 2 parts.", "One part = $12; smaller share = 2 × 12 = $24.",
        ["$24"]),
      ans("divrat-g4", "Divide $100 in the ratio 1 : 4. Find the larger share.", "100 \\div (1+4)", "80", 2,
        "One part = 100 ÷ 5 = 20; larger = 4 parts.", "Total parts = 5, one part = $20; larger share = 4 × 20 = $80.",
        ["$80"]),
    ],
    independentPractice: [
      ans("divrat-i1", "Divide $120 in the ratio 1 : 2 : 3. Find the largest share.", "120 \\div (1+2+3)", "60", 3,
        "One part = 120 ÷ 6 = 20; largest = 3 parts.", "Total parts = 6, one part = $20; largest = 3 × 20 = $60.",
        ["$60"]),
      mcq("divrat-i2", "A quantity of 50 is divided in the ratio 2 : 3. What is the value of one part?", "B",
        ["5", "10", "25", "50"], 3,
        "One part = total ÷ total parts.",
        "Total parts = 5, so one part = 50 ÷ 5 = 10."),
      ans("divrat-i3", "Divide 200 g of nuts in the ratio 3 : 5. Find the smaller amount (in g).", "200 \\div (3+5)", "75", 3,
        "One part = 200 ÷ 8 = 25 g; smaller = 3 parts.", "Total parts = 8, one part = 25 g; smaller = 3 × 25 = 75 g.",
        ["75 g"]),
      ans("divrat-i4", "Divide $90 in the ratio 4 : 5. Find the larger share.", "90 \\div (4+5)", "50", 3,
        "One part = 90 ÷ 9 = 10; larger = 5 parts.", "Total parts = 9, one part = $10; larger = 5 × 10 = $50.",
        ["$50"]),
      ans("divrat-i5", "Share 35 lollies in the ratio 2 : 5. Find the smaller share.", "35 \\div (2+5)", "10", 3,
        "One part = 35 ÷ 7 = 5; smaller = 2 parts.", "Total parts = 7, one part = 5; smaller = 2 × 5 = 10.",
        ["10 lollies"]),
    ],
    masteryQuiz: [
      ans("divrat-m1", "Divide $80 in the ratio 3 : 5. Find the larger share.", "80 \\div (3+5)", "50", 2,
        "One part = 80 ÷ 8 = 10; larger = 5 parts.", "Total parts = 8, one part = $10; larger = 5 × 10 = $50.",
        ["$50"]),
      mcq("divrat-m2", "When dividing a quantity in a ratio, the total number of parts is found by:", "B",
        ["multiplying the ratio terms", "adding the ratio terms", "subtracting the ratio terms", "squaring the ratio terms"], 3,
        "Add the terms.",
        "Add the ratio terms to get the total number of equal parts."),
      ans("divrat-m3", "Divide 240 in the ratio 1 : 2 : 5. Find the largest share.", "240 \\div (1+2+5)", "150", 3,
        "One part = 240 ÷ 8 = 30; largest = 5 parts.", "Total parts = 8, one part = 30; largest = 5 × 30 = 150."),
      ans("divrat-m4", "Divide $45 in the ratio 4 : 5. Find the smaller share.", "45 \\div (4+5)", "20", 3,
        "One part = 45 ÷ 9 = 5; smaller = 4 parts.", "Total parts = 9, one part = $5; smaller = 4 × 5 = $20.",
        ["$20"]),
      mcq("divrat-m5", "After dividing a quantity in a ratio, a good check is that the shares:", "B",
        ["are all equal", "add back to the original total", "are all whole numbers", "match the ratio terms exactly"], 3,
        "The parts must recombine to the whole.",
        "The shares should add back to the original total — if they do not, a step is wrong."),
      ans("divrat-m6", "Divide a 60 cm ribbon in the ratio 1 : 3. Find the longer piece (in cm).", "60 \\div (1+3)", "45", 3,
        "One part = 60 ÷ 4 = 15 cm; longer = 3 parts.", "Total parts = 4, one part = 15 cm; longer = 3 × 15 = 45 cm.",
        ["45 cm"]),
      ans("divrat-m7", "Divide $150 in the ratio 2 : 3. Find the larger share.", "150 \\div (2+3)", "90", 3,
        "One part = 150 ÷ 5 = 30; larger = 3 parts.", "Total parts = 5, one part = $30; larger = 3 × 30 = $90.",
        ["$90"]),
      mcq("divrat-m8", "Two people share $100 in the ratio 3 : 2. How much does the person with the 3-part share get?", "C",
        ["$40", "$50", "$60", "$66.67"], 3,
        "One part = 100 ÷ 5 = 20.",
        "Total parts = 5, one part = $20; the 3-part share = 3 × 20 = $60."),
      ans("divrat-m9", "Divide 500 mL of cordial mix in the ratio 2 : 3. Find the smaller amount (in mL).", "500 \\div (2+3)", "200", 4,
        "One part = 500 ÷ 5 = 100 mL; smaller = 2 parts.", "Total parts = 5, one part = 100 mL; smaller = 2 × 100 = 200 mL.",
        ["200 mL"]),
      ans("divrat-m10", "A $1000 profit is shared in the ratio 3 : 7. Find the larger share.", "1000 \\div (3+7)", "700", 4,
        "One part = 1000 ÷ 10 = 100; larger = 7 parts.", "Total parts = 10, one part = $100; larger = 7 × 100 = $700.",
        ["$700"]),
    ],
    commonMistakes: [
      { mistake: "Dividing by the wrong number of parts.", fix: "Add ALL the ratio terms first to get the total parts." },
      { mistake: "Forgetting to multiply the part value by the ratio term.", fix: "Each share = one part × its ratio term, not just one part." },
      { mistake: "Giving the wrong share (larger vs smaller).", fix: "Re-read which share is wanted and match it to its ratio term." },
      { mistake: "Not checking the answer.", fix: "Add the shares — they must equal the original total." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 7C Similarity and Scale Factors ──────────────────────────────────────────────────
export function year12Standard1SimilarityScaleFactorsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "similarity-scale-factors") {
    return null;
  }
  return {
    description:
      "Use scale factors with similar figures to find unknown sides, and scale areas by the square of the length scale factor.",
    learningIntention:
      "Find the scale factor between similar figures, find unknown sides, and scale areas by the square of the scale factor.",
    successCriteria: [
      "Recognise similar figures as the same shape with sides in a constant ratio.",
      "Find the scale factor between corresponding sides.",
      "Find an unknown side by multiplying by the scale factor.",
      "Scale an area by the square of the length scale factor.",
    ],
    teaching: {
      paragraphs: [
        "Two figures are SIMILAR if they have exactly the same shape but (usually) a different size — like a photo and its enlargement. Every length in one is the same number of times bigger than the matching length in the other. That fixed multiplier is the SCALE FACTOR.",
        "To find the scale factor, divide a length in the new figure by the matching length in the original. If a 4 cm side becomes 12 cm, the scale factor is 12 ÷ 4 = 3. Once you know it, finding any unknown side is a single multiplication: a 5 cm side enlarges to 5 × 3 = 15 cm.",
        "Here is the idea most students miss: lengths and AREAS do NOT scale by the same number. If lengths scale by a factor of k, areas scale by k². Double the lengths (k = 2) and the area becomes 2² = 4 times bigger, not twice. An enlargement with scale factor 3 multiplies area by 9.",
        "The intuition: area is length × length, so each of the two dimensions grows by k, and k × k = k². Always ask whether a question is about a LENGTH (use k) or an AREA (use k²). Similar is not the same as congruent — congruent figures are identical in size (scale factor 1).",
      ],
      latexBlocks: [
        "\\text{scale factor } k = \\frac{\\text{new length}}{\\text{original length}}",
        "\\text{new length} = k \\times \\text{original length}",
        "\\text{area scale factor} = k^2",
      ],
    },
    workedExamples: [
      {
        title: "Find an unknown side",
        questionLatex: "\\text{Two similar figures have scale factor 3. A 5 cm side enlarges to what?}",
        steps: [
          { explanation: "Multiply the side by the scale factor.", latex: "5 \\times 3 = 15 \\text{ cm}" },
        ],
        finalAnswerLatex: "15 \\text{ cm}",
      },
      {
        title: "Scaling an area",
        questionLatex: "\\text{Lengths are scaled by a factor of 2. By what factor does the area grow?}",
        steps: [
          { explanation: "Area scales by k².", latex: "2^2 = 4" },
        ],
        finalAnswerLatex: "4",
      },
    ],
    guidedPractice: [
      mcq("simsf-g1", "Two figures are 'similar' when they have:", "B",
        ["the same size only", "the same shape, with sides in the same ratio", "the same area", "no sides in common"], 1,
        "Same shape, possibly different size.",
        "Similar figures have the same shape, with all corresponding sides in the same ratio (the scale factor)."),
      ans("simsf-g2", "Two similar figures have scale factor 3. A 5 cm side enlarges to what length (in cm)?", "5 \\times 3", "15", 2,
        "Multiply by the scale factor.", "5 × 3 = 15 cm.",
        ["15 cm"]),
      ans("simsf-g3", "Two similar triangles have scale factor 2. A side of 7 cm maps to what length (in cm)?", "7 \\times 2", "14", 2,
        "Multiply by the scale factor.", "7 × 2 = 14 cm.",
        ["14 cm"]),
      ans("simsf-g4", "Using the triangles, a 4 cm side on the small triangle matches a 12 cm side on the large one. Find the scale factor.", "12 \\div 4", "3", 2,
        "Scale factor = new ÷ original.", "Scale factor = 12 ÷ 4 = 3.",
        [], { triangleDiagram: tri("Right triangle with a side labelled 4 (small) corresponding to 12 (enlarged), illustrating a scale factor of 3.", { AB: "4", BC: "12" }) }),
    ],
    independentPractice: [
      ans("simsf-i1", "A figure is enlarged by scale factor 4. A 6 cm side becomes what length (in cm)?", "6 \\times 4", "24", 2,
        "Multiply by the scale factor.", "6 × 4 = 24 cm.",
        ["24 cm"]),
      mcq("simsf-i2", "If the lengths of a figure are scaled by a factor of 3, the area is scaled by a factor of:", "C",
        ["3", "6", "9", "12"], 3,
        "Area scales by k².",
        "Area scales by the square of the length scale factor: 3² = 9."),
      ans("simsf-i3", "A large figure's side is 20 cm and the matching side on the similar smaller figure is 5 cm. Find the scale factor from small to large.", "20 \\div 5", "4", 3,
        "Scale factor = large ÷ small.", "20 ÷ 5 = 4.",
        ["4"]),
      ans("simsf-i4", "A shape with area 10 cm² is enlarged by length scale factor 2. Find the new area (in cm²).", "10 \\times 2^2", "40", 3,
        "New area = original × k².", "k² = 2² = 4, so new area = 10 × 4 = 40 cm².",
        ["40 cm²"]),
      ans("simsf-i5", "Two similar rectangles have scale factor 5. A 3 cm side maps to what length (in cm)?", "3 \\times 5", "15", 3,
        "Multiply by the scale factor.", "3 × 5 = 15 cm.",
        ["15 cm"]),
    ],
    masteryQuiz: [
      ans("simsf-m1", "A figure is enlarged by scale factor 3. An 8 cm side becomes what length (in cm)?", "8 \\times 3", "24", 2,
        "Multiply by the scale factor.", "8 × 3 = 24 cm.",
        ["24 cm"]),
      mcq("simsf-m2", "If lengths are scaled by a factor of 2, the area scale factor is:", "C",
        ["2", "3", "4", "8"], 3,
        "Square the length scale factor.",
        "Area scale factor = 2² = 4."),
      ans("simsf-m3", "A large side is 18 cm and the matching similar side is 6 cm. Find the scale factor from small to large.", "18 \\div 6", "3", 3,
        "Scale factor = large ÷ small.", "18 ÷ 6 = 3.",
        ["3"]),
      ans("simsf-m4", "A figure is enlarged by scale factor 10. A 2.5 cm side becomes what length (in cm)?", "2.5 \\times 10", "25", 3,
        "Multiply by the scale factor.", "2.5 × 10 = 25 cm.",
        ["25 cm"]),
      mcq("simsf-m5", "Figures that are exactly the same shape AND the same size are best described as:", "B",
        ["similar", "congruent", "proportional", "enlarged"], 3,
        "Same shape and same size.",
        "Same shape and same size means congruent (a scale factor of 1); 'similar' allows different sizes."),
      ans("simsf-m6", "A shape with area 7 cm² is enlarged by length scale factor 2. Find the new area (in cm²).", "7 \\times 2^2", "28", 3,
        "New area = original × k².", "k² = 4, so new area = 7 × 4 = 28 cm².",
        ["28 cm²"]),
      ans("simsf-m7", "Lengths are scaled by a factor of 4. By what factor is the area scaled?", "4^2", "16", 4,
        "Area scales by k².", "Area scale factor = 4² = 16."),
      mcq("simsf-m8", "To find a missing side in a pair of similar figures, you:", "B",
        ["add the scale factor", "multiply the matching side by the scale factor", "subtract the scale factor", "square the matching side"], 3,
        "Use the scale factor as a multiplier.",
        "Multiply the matching (corresponding) side by the scale factor."),
      ans("simsf-m9", "A shape has area 12 cm². It is enlarged with length scale factor 3. Find the new area (in cm²).", "12 \\times 3^2", "108", 4,
        "New area = original × k².", "k² = 3² = 9, so new area = 12 × 9 = 108 cm².",
        ["108 cm²"]),
      ans("simsf-m10", "Using the triangles, a triangle with sides 3, 4, 5 is enlarged by scale factor 4. Find the length of its longest side (in cm).", "5 \\times 4", "20", 4,
        "Multiply the longest side by the scale factor.", "Longest side = 5 × 4 = 20 cm.",
        ["20 cm"], { triangleDiagram: tri("Right triangle with sides 3, 4, 5; the side of 5 (hypotenuse) is enlarged by scale factor 4.", { AB: "4", AC: "3", BC: "5" }) }),
    ],
    commonMistakes: [
      { mistake: "Scaling area by k instead of k².", fix: "Area scales by the SQUARE of the length scale factor." },
      { mistake: "Dividing the wrong way for the scale factor.", fix: "Scale factor = new length ÷ original length (use the matching sides)." },
      { mistake: "Confusing similar with congruent.", fix: "Congruent = identical size (k = 1); similar allows different sizes." },
      { mistake: "Adding the scale factor to a side.", fix: "Multiply the side by the scale factor, not add it." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 7E Plans and Elevations ──────────────────────────────────────────────────────────
export function year12Standard1PlansAndElevationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "plans-and-elevations") {
    return null;
  }
  return {
    description:
      "Interpret plans and elevations as different views of one object, and use a scale to convert between drawing and real lengths.",
    learningIntention:
      "Identify plan and elevation views and convert between drawing and real lengths using a scale.",
    successCriteria: [
      "Identify the plan (top view), front elevation and side elevation of an object.",
      "Read a scale such as 1 : 100 as 1 unit on the drawing to 100 real units.",
      "Convert a drawing length to a real length using the scale.",
      "Convert a real length to a drawing length using the scale.",
    ],
    teaching: {
      paragraphs: [
        "A solid object cannot be shown truthfully in one flat picture, so builders and designers draw several VIEWS of it. The PLAN is the view looking straight DOWN from above (a bird's-eye view). The FRONT ELEVATION is the view looking at the front; a SIDE ELEVATION looks at the side. They are different views of the SAME object, and together they describe it fully.",
        "Because each view is the same object seen from a different direction, their measurements must agree where they share a dimension — the width on the plan matches the width on the front elevation, for example. A cube, seen from any of these directions, shows a square.",
        "Drawings are scaled down to fit on paper, and the SCALE tells you by how much. A scale of 1 : 100 means 1 unit on the drawing stands for 100 of the same units in real life — 1 cm on the plan is 100 cm (1 m) in reality. The scale is a ratio: drawing : real.",
        "To go from a DRAWING length to a REAL length, MULTIPLY by the scale number: at 1 : 100, a 5 cm line is 5 × 100 = 500 cm = 5 m. To go the other way, from REAL to DRAWING, DIVIDE: a real 6 m wall (600 cm) at 1 : 100 is 600 ÷ 100 = 6 cm on the plan. Keep the units consistent before converting.",
      ],
      latexBlocks: [
        "\\text{plan = top view};\\ \\text{front/side elevation = front/side view}",
        "\\text{scale } 1 : 100 \\Rightarrow 1 \\text{ drawing unit} = 100 \\text{ real units}",
        "\\text{real} = \\text{drawing} \\times \\text{scale};\\qquad \\text{drawing} = \\text{real} \\div \\text{scale}",
      ],
    },
    workedExamples: [
      {
        title: "Drawing length to real length",
        questionLatex: "\\text{At a scale of } 1 : 100,\\ \\text{a wall is 5 cm on the plan. Find the real length.}",
        steps: [
          { explanation: "Multiply the drawing length by 100.", latex: "5 \\times 100 = 500 \\text{ cm}" },
          { explanation: "Convert to metres.", latex: "= 5 \\text{ m}" },
        ],
        finalAnswerLatex: "5 \\text{ m}",
      },
      {
        title: "Real length to drawing length",
        questionLatex: "\\text{A real wall is 6 m. At scale } 1 : 100,\\ \\text{find its length on the plan.}",
        steps: [
          { explanation: "6 m = 600 cm; divide by 100.", latex: "600 \\div 100 = 6 \\text{ cm}" },
        ],
        finalAnswerLatex: "6 \\text{ cm}",
      },
    ],
    guidedPractice: [
      mcq("plev-g1", "The plan view of an object is the view from:", "A",
        ["directly above (looking down)", "the front", "the side", "below"], 1,
        "Plan = bird's-eye view.",
        "The plan is the view looking straight down on the object from above."),
      ans("plev-g2", "At a scale of 1 : 100, a wall is 5 cm on the plan. Find the real length in centimetres.", "5 \\times 100", "500", 2,
        "Real = drawing × scale.", "5 × 100 = 500 cm.",
        ["500 cm"]),
      ans("plev-g3", "At a scale of 1 : 100, a 5 cm plan length represents how many metres in real life?", "5 \\times 100 = 500\\text{ cm}", "5", 2,
        "500 cm = 5 m.", "5 × 100 = 500 cm = 5 m.",
        ["5 m"]),
      ans("plev-g4", "The view of an object looking at it from the front is called the front …", "\\text{front view}", "elevation", 2,
        "Front/side views are elevations.", "The front view is the front elevation.",
        ["front elevation"]),
    ],
    independentPractice: [
      ans("plev-i1", "At a scale of 1 : 200, a length is 4 cm on the drawing. Find the real length in metres.", "4 \\times 200 = 800\\text{ cm}", "8", 3,
        "Real = drawing × scale, then convert.", "4 × 200 = 800 cm = 8 m.",
        ["8 m"]),
      mcq("plev-i2", "A plan, a front elevation and a side elevation are:", "C",
        ["three different objects", "three copies of the same view", "different views of the same object", "always identical in shape"], 3,
        "Same object, different directions.",
        "They are different views of the same object (from above, the front and the side)."),
      ans("plev-i3", "A real wall is 6 m long. At a scale of 1 : 100, find its length on the drawing in centimetres.", "600 \\div 100", "6", 3,
        "Drawing = real ÷ scale (use cm).", "6 m = 600 cm; 600 ÷ 100 = 6 cm.",
        ["6 cm"]),
      ans("plev-i4", "At a scale of 1 : 50, a length is 3 cm on the drawing. Find the real length in centimetres.", "3 \\times 50", "150", 3,
        "Real = drawing × scale.", "3 × 50 = 150 cm.",
        ["150 cm"]),
      ans("plev-i5", "A real length is 10 m. At a scale of 1 : 250, find its length on the drawing in centimetres.", "1000 \\div 250", "4", 3,
        "Drawing = real ÷ scale (use cm).", "10 m = 1000 cm; 1000 ÷ 250 = 4 cm.",
        ["4 cm"]),
    ],
    masteryQuiz: [
      ans("plev-m1", "At a scale of 1 : 100, a 7 cm plan length represents how many metres in real life?", "7 \\times 100 = 700\\text{ cm}", "7", 2,
        "700 cm = 7 m.", "7 × 100 = 700 cm = 7 m.",
        ["7 m"]),
      mcq("plev-m2", "Looking straight down on a building from above gives its:", "A",
        ["plan", "front elevation", "side elevation", "cross-section"], 3,
        "Top-down view.",
        "Looking down from above gives the plan view."),
      ans("plev-m3", "A real wall is 12 m. At a scale of 1 : 100, find its drawing length in centimetres.", "1200 \\div 100", "12", 3,
        "Drawing = real ÷ scale (use cm).", "12 m = 1200 cm; 1200 ÷ 100 = 12 cm.",
        ["12 cm"]),
      ans("plev-m4", "At a scale of 1 : 500, a 3 cm drawing length represents how many metres in real life?", "3 \\times 500 = 1500\\text{ cm}", "15", 3,
        "Real = drawing × scale, then convert.", "3 × 500 = 1500 cm = 15 m.",
        ["15 m"]),
      mcq("plev-m5", "The view of an object looking at it from the side is the:", "C",
        ["plan", "front elevation", "side elevation", "top view"], 3,
        "Side view.",
        "The view from the side is the side elevation."),
      ans("plev-m6", "A real length is 16 m. At a scale of 1 : 200, find its drawing length in centimetres.", "1600 \\div 200", "8", 3,
        "Drawing = real ÷ scale (use cm).", "16 m = 1600 cm; 1600 ÷ 200 = 8 cm.",
        ["8 cm"]),
      ans("plev-m7", "At a scale of 1 : 50, a 6 cm drawing length represents how many metres in real life?", "6 \\times 50 = 300\\text{ cm}", "3", 4,
        "Real = drawing × scale, then convert.", "6 × 50 = 300 cm = 3 m.",
        ["3 m"]),
      mcq("plev-m8", "A scale of 1 : 100 means that 1 cm on the drawing represents:", "C",
        ["1 cm in real life", "10 cm in real life", "100 cm in real life", "1000 cm in real life"], 3,
        "Read the ratio drawing : real.",
        "A scale of 1 : 100 means 1 cm on the drawing represents 100 cm in real life."),
      ans("plev-m9", "A cube is viewed from directly above. What shape is its plan view?", "\\text{top view of a cube}", "square", 4,
        "Look down on a cube.", "From above, a cube shows a square, so its plan view is a square.",
        ["a square"]),
      ans("plev-m10", "At a scale of 1 : 1000, a 2.5 cm drawing length represents how many metres in real life?", "2.5 \\times 1000 = 2500\\text{ cm}", "25", 4,
        "Real = drawing × scale, then convert.", "2.5 × 1000 = 2500 cm = 25 m.",
        ["25 m"]),
    ],
    commonMistakes: [
      { mistake: "Mixing up plan and elevation.", fix: "Plan = top view; elevations = front/side views." },
      { mistake: "Multiplying when converting real to drawing (or vice versa).", fix: "Real = drawing × scale; drawing = real ÷ scale." },
      { mistake: "Forgetting to keep units consistent.", fix: "Convert to the same unit (e.g. cm) before applying the scale." },
      { mistake: "Treating the views as separate objects.", fix: "Plan and elevations are different views of one object and must agree on shared dimensions." },
    ],
    masteryPassMark: 0.8,
  };
}
